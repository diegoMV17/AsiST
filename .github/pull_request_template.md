<!--
Plantilla obligatoria para todo PR de AsiST (F0-T04).
No pegues valores de .env, URIs de Mongo, llaves JWT ni tokens en este PR.
-->

## Tarea

- ID: <!-- p. ej. F2-T03 -->
- Fase:

## Qué cambia

<!-- Resumen breve del cambio y por qué. -->

## Requisitos ASVS cubiertos

<!-- Lista los requisitos OWASP ASVS nivel 2 que aplican, p. ej. V2.1.1 longitud mínima de contraseña. Si no aplica ninguno, explica por qué. -->

-

## Amenazas consideradas

<!-- STRIDE y OWASP API Security Top 10 (2023). Enlaza el modelo de amenazas actualizado en docs/threat-model/ si el PR crea un endpoint, evento o flujo nuevo. -->

-

## Cómo probarlo

<!-- Pasos, comandos y datos de prueba (nunca credenciales reales). -->

1.

## Dependencias nuevas

<!-- Por cada una: licencia, mantenimiento y alternativas consideradas. Escribe "Ninguna" si no hay. -->

## Checklist de seguridad

### Autenticación y autorización
- [ ] La identidad sale del token (`req.user.id`), nunca del body, la URL ni el cliente.
- [ ] Cada consulta filtra por dueño o pertenencia, y hay pruebas de "otro usuario no puede" (BOLA/BFLA).
- [ ] Ningún usuario puede cambiar `rol`, `contraseña`, `correo` ni `bloqueado` fuera del endpoint dedicado.
- [ ] Contraseñas con argon2id; JWT RS256 validando `iss`, `aud`, `exp` y algoritmo (si aplica).

### Entrada y datos
- [ ] Toda entrada (HTTP, WebSocket, eventos) se valida con Zod en modo estricto.
- [ ] No se pasan objetos del request directo a consultas de Mongo.
- [ ] Paginación con límite máximo, tamaño de body y longitud de textos acotados.
- [ ] Las respuestas usan DTO de salida con lista blanca (sin contraseñas, hashes, tokens ni cédula completa).

### Secretos, logs y errores
- [ ] No hay secretos en el código ni en el diff; `.env.example` sin valores reales.
- [ ] No hay `console.log`; los logs no contienen `authorization`, `password`, `contraseña`, `token` ni `cedula`.
- [ ] Los errores al cliente siguen RFC 9457 sin stack ni detalles internos.
- [ ] CORS con lista blanca y Helmet en servicios HTTP (si aplica).

### Arquitectura
- [ ] El servicio no lee ni escribe la base de otro servicio.
- [ ] Los contratos nuevos o cambiados están en `packages/contracts`; un cambio incompatible crea versión nueva del evento.
- [ ] Los consumidores de eventos son idempotentes.

### Verificación
- [ ] `npm run lint`, `npm run typecheck` y `npm test` en verde localmente.
- [ ] Checks de CI en verde: CI / Calidad, CI / npm audit, Seguridad / Gitleaks, Seguridad / CodeQL, Seguridad / Trivy.
- [ ] Cobertura ≥ 80 % en `domain` y `application` (si aplica).

### Revisión humana
- [ ] Este PR toca autenticación, autorización, criptografía o datos personales → requiere revisión de @diegoMV17.

<!-- Marca con [x] lo que cumple. Si algo no aplica, déjalo sin marcar y explica por qué debajo. -->
