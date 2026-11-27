# 0002. JWT RS256 y verificación distribuida

| Campo | Valor |
| --- | --- |
| Estado | Aceptado |
| Fecha | 2026-11-26 |
| Decisores | diego |
| Tarea | F0-T06 |
| Relacionados | [ADR 0001](0001-microservicios-reducidos.md), [modelo de amenazas](../threat-model/sistema.md), [requisitos ASVS](../security/requisitos.md) |

## Contexto

Con microservicios (ADR 0001), tres servicios y el gateway necesitan saber quién es el usuario y qué rol tiene. Hoy el servidor firma JWT con HS256 y un secreto compartido (`JWT_SECRET`), sin validar `iss`, `aud` ni el algoritmo, y sin refresh token.

Problemas de extender ese esquema a varios servicios:

- **Secreto compartido:** con HS256, quien puede verificar también puede firmar. Si cualquier servicio filtra el secreto, el atacante emite tokens de admin.
- **Confianza ciega en el gateway:** si solo el gateway verifica y pasa la identidad en una cabecera (`x-user-id`), cualquiera que llegue a un servicio sin pasar por el gateway, o que logre inyectar esa cabecera, se hace pasar por otro usuario.
- **Sin revocación:** un token largo robado sirve hasta que expira.

Restricciones:

- Sin proveedor de correo: la autenticación es solo correo institucional y contraseña.
- Cliente móvil: el token viaja en la cabecera `Authorization`, no en cookies.
- No hay bóveda de secretos ni HSM en este alcance.

## Decisión

1. **Solo auth-service firma.** Usa RS256 (RSA de 2048 bits o más) con la librería `jose`. La llave privada existe solo en auth-service, cargada desde una variable del proveedor de despliegue; nunca en el repositorio.
2. **Llave pública por JWKS.** auth-service publica `/.well-known/jwks.json` con cada llave identificada por `kid`. Durante una rotación hay dos llaves activas.
3. **Verificación distribuida.** El gateway **y cada servicio** verifican el token por su cuenta con `packages/security`, que descarga el JWKS y lo guarda en caché. Ningún servicio confía en una cabecera de identidad puesta por el gateway; el gateway borra esas cabeceras si llegan del cliente.
4. **Reglas de verificación**, todas obligatorias:
   - Algoritmo fijo `RS256`; se rechaza cualquier otro, incluido `none` y los HS.
   - `iss` igual a la URL configurada de auth-service.
   - `aud` igual a `asist-api`.
   - `exp` y `nbf` con tolerancia de reloj máxima de 30 segundos.
   - La llave solo sale del JWKS configurado; se ignoran `jku`, `x5u` y `jwk` de la cabecera del token.
5. **Contenido del token de acceso:** `sub` (id de usuario), `rol`, `iss`, `aud`, `iat`, `exp`, `jti`. Sin correo, cédula, teléfono ni nombre.
6. **Duraciones:** acceso de 15 minutos; refresh de 7 días.
7. **Refresh rotativo:** el refresh es un valor opaco de 256 bits, no un JWT. auth-service guarda solo su hash SHA-256 con su familia, dispositivo y fecha. Cada uso emite un par nuevo y marca el anterior como usado. Si llega un refresh ya usado, se revoca toda la familia (señal de robo). Cerrar sesión, cambiar contraseña y bloquear revocan familias.
8. **Bloqueo:** al bloquear un usuario, auth-service revoca sus refresh y publica `user.blocked`; core y chat lo marcan en sus réplicas y chat cierra sus sockets. El token de acceso vigente expira en 15 minutos como máximo.
9. **Chat:** el token va en el campo `auth` del handshake de Socket.IO, nunca en la query; se verifica igual que en HTTP.
10. **Cliente:** tokens solo en `expo-secure-store`; refresco automático al recibir 401.
11. **Transición:** mientras convivan legado y auth-service (fase 2), el gateway acepta solo tokens RS256 desde que `/api/auth/*` se enrute al servicio nuevo (F2-T10). Las sesiones HS256 viejas deben iniciar sesión otra vez.

## Alternativas consideradas

| Alternativa | Ventajas | Desventajas | Por qué no |
| --- | --- | --- | --- |
| **HS256 con secreto compartido** (lo actual) | Simple; un solo secreto | Todo verificador puede firmar; un servicio filtrado compromete a todos | Contradice el mínimo privilegio |
| **Solo el gateway verifica y pasa `x-user-id`** | Servicios más simples | Confianza total en la red interna; ASVS 14.5.4; una cabecera inyectada suplanta a cualquiera | Se quiere defensa en profundidad |
| **Tokens opacos con introspección en auth-service** | Revocación inmediata | Llamada síncrona a auth en cada petición; auth se vuelve punto único de falla | Contradice la regla de comunicación por eventos (ADR 0001) |
| **ES256 (curva elíptica)** | Firmas y llaves más pequeñas | Ninguna importante | RS256 es lo que pide el plan y es igual de seguro para este uso; se puede cambiar con otro ADR y rotación |
| **Proveedor externo (Auth0, Keycloak, Cognito)** | Funciones completas, MFA | Dependencia externa, costo, menos aprendizaje | El objetivo es practicar cómo se construye |

## Consecuencias

Positivas:

- Un servicio comprometido no puede emitir tokens: solo tiene la llave pública.
- Cada servicio sigue protegido aunque alguien llegue a él saltándose el gateway.
- No hay llamada síncrona a auth en cada petición; el JWKS se cachea.
- Un refresh robado se detecta al reutilizarse.

Negativas y riesgos:

- **Revocación no inmediata del acceso:** un token de acceso robado o de un usuario bloqueado sirve hasta 15 minutos (riesgo residual R2). Si hace falta, se agrega una lista de `jti` revocados en caché con otro ADR.
- **Dependencia del JWKS:** si auth-service no responde y la caché expira, los demás no pueden verificar. Mitigación: caché con duración larga, refresco en segundo plano y uso de la última copia válida.
- **Gestión de llaves:** hay que rotar la llave sin cerrar sesiones (runbook en F5-T05) y la llave privada vive en memoria del proceso (riesgo residual R7).
- **Llamada síncrona permitida:** la descarga del JWKS es la única llamada HTTP entre servicios aprobada por este ADR.

## Seguridad

| Aspecto | Referencia |
| --- | --- |
| Tokens firmados y resistentes a `alg: none`, sustitución de llave y manipulación | ASVS 3.5.3; GW-S1 |
| Cabeceras de proxy no confiables | ASVS 14.5.4; GW-S2 |
| Mecanismo de autenticación único | ASVS 1.2.3 |
| Gestión de llaves y rotación | ASVS 1.6.1, 6.4.1; AUTH-I3 |
| Refresh rotativo, revocación al cerrar sesión y al reutilizar | ASVS 3.2.2, 3.3.1; AUTH-S3 |
| Tokens fuera de la URL | ASVS 3.1.1 |
| Usuario bloqueado | AUTH-E2, CHAT-S2 |
