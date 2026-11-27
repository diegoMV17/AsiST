# Requisitos de seguridad de AsiST (OWASP ASVS nivel 2)

| Campo | Valor |
| --- | --- |
| Tarea | F0-T05 |
| Estado | Borrador para revisión de diego |
| Referencias | OWASP ASVS 4.0.3 nivel 2, OWASP API Security Top 10 (2023) |
| Alcance | gateway, auth-service, core-service, chat-service, RabbitMQ, bases MongoDB, cliente Expo, CI |
| Documentos relacionados | [Modelo de amenazas del sistema](../threat-model/sistema.md), ADR 0001 y ADR 0002 en `docs/adr/` |

## 1. Cómo usar este documento

Este documento es la lista de requisitos de seguridad que el sistema debe cumplir al terminar la migración. Cada requisito tiene un identificador ASVS, la pieza a la que aplica, cómo lo cumple AsiST y la fase del plan donde se implementa.

- Antes de implementar una tarea, el agente busca aquí los requisitos de las piezas que toca y los copia en el PR.
- Al cerrar una tarea, el PR cambia el estado del requisito a **Cumplido** y enlaza la prueba que lo demuestra.
- Un requisito solo cambia a **No aplica** o **Desviación** con una justificación escrita y la aprobación de diego.
- Se usa ASVS 4.0.3 porque el plan y las puertas de fase citan su numeración (V2 autenticación, V3 sesión, V4 control de acceso, V5 validación). ASVS 5.0 renumeró los capítulos; si el proyecto migra a 5.0, se hará en un ADR y con una tabla de equivalencias.

Estados posibles:

| Estado | Significado |
| --- | --- |
| Pendiente | Aplica y se implementa en la fase indicada |
| Cumplido | Implementado y con prueba o evidencia enlazada |
| Diferido | Aplica, pero depende de algo que hoy no existe (por ejemplo, un proveedor de correo); se registra como riesgo residual |
| Desviación | Se decidió cumplirlo de otra forma o no cumplirlo; requiere aprobación de diego |
| No aplica | La función que cubre el requisito no existe en AsiST |

Columna *Aplica a*: `GW` gateway, `AUTH` auth-service, `CORE` core-service, `CHAT` chat-service, `MQ` RabbitMQ, `DB` bases MongoDB, `APP` cliente Expo, `CI` repositorio y pipeline, `TODOS` todas las piezas de servidor.

## 2. Contexto que condiciona los requisitos

1. **Sin proveedor de correo.** La universidad no aprobó un proveedor, así que no hay verificación de correo, códigos OTP ni recuperación de contraseña por correo. La identidad se basa en el dominio institucional (`@usantoto.edu.co`, `@ustatunja.edu.co`) validado en el servidor y en la contraseña. El puerto `EmailVerifier` queda definido sin implementación.
2. **Cliente móvil, no navegador.** Los tokens viajan en la cabecera `Authorization: Bearer` y se guardan en `expo-secure-store`. No hay cookies de sesión, por lo que los controles de CSRF y de cookies no aplican mientras no exista un cliente web.
3. **Datos personales.** El sistema guarda nombre, apellido, teléfono, cédula, fecha de nacimiento, ciudad y correo. En Colombia son datos personales protegidos por la Ley 1581 de 2012; la cédula se trata como dato sensible para efectos de exposición y logs.
4. **Microservicios.** Hay superficie interna: tráfico gateway → servicios, eventos en RabbitMQ y una base por servicio. Los requisitos de comunicación entre componentes (V1, V9) aplican también a ese tráfico.

## 3. Brechas observadas en el código actual

Revisión rápida del servidor y el cliente en `develop` (commit `cbb4e88`). No es una auditoría completa; sirve para priorizar. El código legado se reemplaza en las fases 2 a 4 y no se corrige en su lugar (regla de strangler fig).

| # | Brecha | Evidencia | Requisito ASVS | Se cierra en |
| --- | --- | --- | --- | --- |
| B1 | El chat por REST no exige autenticación y toma `senderId` del body | `Servidor/src/trips/routes/trip.messages.ts` | 4.1.1, 4.2.1 | F4-T03, F4-T04 |
| B2 | CORS abierto (`cors()` y Socket.IO con `origin: "*"`) | `Servidor/src/app.ts`, `Servidor/src/index.ts` | 14.5.3 | F1-T04, F4-T05 |
| B3 | JWT HS256 con secreto compartido y sin validar `iss`/`aud`/algoritmo | `Servidor/src/middlewares/auth.middleware.ts` | 3.5.3, 6.4.1 | F2-T04, F2-T07 |
| B4 | Contraseñas con bcrypt de costo 10 | `Servidor/src/usuarios/repository/user.repository.mongo.ts` | 2.4.1, 2.4.4 | F2-T03 |
| B5 | Las respuestas de error devuelven el objeto `error` crudo y detalles internos (roles exigidos, configuración) | `user.routes.ts`, `auth.middleware.ts` | 7.4.1 | F1-T02, F2 |
| B6 | El DTO de edición acepta `rol`, `contraseña` y `correo` | `Servidor/src/usuarios/interfaces/user.dto.ts` | 4.1.2, 5.1.2 | F2-T06 |
| B7 | El registro responde distinto si el correo o la cédula ya existen (enumeración de cuentas) | `user.routes.ts` | 2.2.1 (anti-automatización) | F2-T06 (rate limit; ver riesgo residual R3 del modelo de amenazas) |
| B8 | Logs con `console.log` y `morgan('dev')`, sin redacción ni id de correlación | `Servidor/src/index.ts`, `Servidor/src/app.ts` | 7.1.1, 7.1.4 | F1-T02, F5-T03 |
| B9 | El cliente imprime el JWT en consola al iniciar sesión | cliente, flujo de login | 7.1.1, 8.2.2 | F0-T08 (agente A) |
| B10 | Sin rate limit, sin Helmet y sin límite de tamaño de body | `Servidor/src/app.ts` | 2.2.1, 14.4.x, 13.1.x | F1-T04 |
| B11 | Fechas de viaje como texto y cupos sin descuento atómico (no existe el flujo de reservas) | modelos de `trips` | 11.1.6 | F3-T03, F3-T06 |

## 4. Requisitos por capítulo

### V1. Arquitectura, diseño y modelado de amenazas

| ID | Requisito (resumen) | Aplica a | Cómo se cumple en AsiST | Fase | Estado |
| --- | --- | --- | --- | --- | --- |
| 1.1.2 | Modelado de amenazas en cada cambio de diseño | TODOS | `docs/threat-model/sistema.md` y un archivo por servicio; regla en CLAUDE.md: endpoint, evento o flujo nuevo actualiza el modelo | F0, continuo | Pendiente |
| 1.1.4 | Documentar límites de confianza, componentes y flujos significativos | TODOS | Diagrama de flujo de datos y límites de confianza en el modelo de amenazas | F0-T05 | Pendiente |
| 1.2.1 | Cuentas del sistema operativo únicas y de bajo privilegio por componente | TODOS | Contenedores con usuario no root, una imagen por servicio | F6-T01 | Pendiente |
| 1.2.2 | La comunicación entre componentes está autenticada | GW, AUTH, CORE, CHAT, MQ, DB | Servicios verifican el JWT del usuario por su cuenta (no confían en el gateway); usuario propio por servicio en RabbitMQ y en Mongo | F2-T07, F1-T03, F6-T03 | Pendiente |
| 1.2.3 | Un único mecanismo de autenticación verificado | TODOS | Solo auth-service emite tokens; todos verifican con `packages/security` (ADR 0002) | F2-T07 | Pendiente |
| 1.4.1 | El control de acceso se aplica en puntos de confianza, nunca en el cliente | GW, AUTH, CORE, CHAT | Gateway hace control grueso (token válido); cada servicio decide sobre sus recursos. El cliente solo oculta pantallas | F2–F4 | Pendiente |
| 1.4.4 | Un único mecanismo de control de acceso reutilizado | AUTH, CORE, CHAT | Middleware de roles y helpers de propiedad en `packages/security` | F2-T07 | Pendiente |
| 1.5.1 | Requisitos de entrada y salida definidos por tipo de dato | TODOS | Esquemas Zod en `packages/contracts` para DTO y eventos; DTO de salida con lista blanca | F1, F2-T08 | Pendiente |
| 1.6.1 | Política explícita de gestión de llaves criptográficas | AUTH | Llave privada RS256 solo en auth-service, JWKS con `kid`, runbook de rotación | F2-T04, F5-T05 | Pendiente |
| 1.7.1 | Formato y enfoque de logs común en todo el sistema | TODOS | `packages/observability` con Pino, JSON y id de correlación | F1-T02 | Pendiente |
| 1.8.1 | Datos sensibles identificados y clasificados | TODOS | Clasificación en la sección 5 de este documento | F0-T05 | Pendiente |
| 1.9.1 | Comunicación cifrada entre componentes | GW, MQ, DB | TLS en internet y hacia Atlas y CloudAMQP; tráfico interno en red privada del proveedor (ver riesgo residual R5) | F6-T03 | Pendiente |
| 1.14.1 | Segregación de componentes con distinto nivel de confianza | TODOS | Solo el gateway es público; servicios, bus y bases en red privada | F6-T03 | Pendiente |

### V2. Autenticación

| ID | Requisito (resumen) | Aplica a | Cómo se cumple en AsiST | Fase | Estado |
| --- | --- | --- | --- | --- | --- |
| 2.1.1 | Contraseñas de al menos 12 caracteres | AUTH, APP | El plan fija 10 caracteres. **Queda como desviación hasta que diego decida** entre subir a 12 (cumple ASVS) o mantener 10 (ver sección 6) | F2-T05 | Desviación (por decidir) |
| 2.1.2 | Se permiten contraseñas de 64 caracteres o más; se rechazan las de más de 128 | AUTH, APP | Zod: `min` según 2.1.1, `max(128)` | F2-T05 | Pendiente |
| 2.1.3 | No se trunca la contraseña | AUTH | argon2id recibe la contraseña completa; prueba con 128 caracteres | F2-T03 | Pendiente |
| 2.1.4 | Se acepta cualquier carácter Unicode imprimible | AUTH | Sin listas de caracteres permitidos; normalización NFKC antes del hash | F2-T05 | Pendiente |
| 2.1.5 | El usuario puede cambiar su contraseña | AUTH, APP | Endpoint dedicado de cambio de contraseña (no por edición de perfil) | F2-T02 | Pendiente |
| 2.1.6 | El cambio exige la contraseña actual y la nueva | AUTH | Caso de uso `ChangePasswordUseCase` verifica la actual | F2-T02 | Pendiente |
| 2.1.7 | Se rechazan contraseñas filtradas o comunes | AUTH | Lista local de contraseñas comunes (por ejemplo, las 10.000 más usadas) empaquetada en el servicio; sin llamadas externas | F2-T05 | Pendiente |
| 2.1.8 | Medidor de fortaleza en el cliente | APP | Indicador en el formulario de registro y cambio de contraseña | F2-T11 | Pendiente |
| 2.1.9 | Sin reglas de composición (mayúscula, símbolo, etc.) | AUTH, APP | Solo longitud y lista de comunes | F2-T05 | Pendiente |
| 2.1.10 | Sin rotación periódica obligatoria | AUTH | No se implementa expiración de contraseñas | F2 | Pendiente |
| 2.1.11 | Se permite pegar y usar gestores de contraseñas | APP | Campos sin bloqueo de pegado; `textContentType` y `autoComplete` correctos | F2-T11 | Pendiente |
| 2.1.12 | El usuario puede ver la contraseña que escribe | APP | Botón mostrar/ocultar | F2-T11 | Pendiente |
| 2.2.1 | Controles contra fuerza bruta y relleno de credenciales | GW, AUTH | Rate limit de 5/min por IP y por correo en login; demora creciente por cuenta; mensajes genéricos | F1-T04, F2-T06 | Pendiente |
| 2.2.2 | Autenticadores débiles (SMS, correo) solo como factor secundario | AUTH | No se usan | — | No aplica |
| 2.2.3 | Notificación segura al usuario tras cambiar datos de autenticación | AUTH | Requiere un canal fuera de banda (correo). Mientras no exista, se registra el evento en auditoría y se muestra en la app en el siguiente inicio de sesión | F2 | Diferido |
| 2.4.1 | Contraseñas con función de derivación aprobada, con sal | AUTH | argon2id (memoria ≥ 19 MiB, t ≥ 2, p = 1, parámetros de OWASP); migración desde bcrypt al iniciar sesión | F2-T03 | Pendiente |
| 2.4.2 | Sal de al menos 32 bits, única por credencial | AUTH | La genera la librería `argon2` (16 bytes) | F2-T03 | Pendiente |
| 2.4.4 | bcrypt con costo suficiente | AUTH | Solo se valida bcrypt heredado una vez y se re-hashea con argon2id; nunca se crea bcrypt nuevo | F2-T03 | Pendiente |
| 2.5.1 | Secretos de activación o recuperación no se envían en claro | AUTH | No hay flujo de recuperación por correo | — | Diferido |
| 2.5.2 | Sin pistas de contraseña ni preguntas secretas | AUTH, APP | No se implementan | F2 | Pendiente |
| 2.5.3 | La recuperación no revela la contraseña actual | AUTH | Ver 2.5.6 | F2 | Pendiente |
| 2.5.4 | Sin cuentas compartidas ni por defecto (como `root` o `admin`) | AUTH, MQ, DB | El primer admin se crea con un script de un solo uso; RabbitMQ sin `guest`; Mongo con usuario por servicio | F1-T03, F2 | Pendiente |
| 2.5.6 | Recuperación de contraseña con un mecanismo seguro | AUTH | Sin correo no hay recuperación de autoservicio. Recuperación asistida: un admin marca la cuenta para restablecer, lo que revoca todas sus sesiones y genera un código de un solo uso y de vida corta que se entrega en persona. Requiere aprobación de diego (sección 6) | F2 | Diferido |
| 2.10.1 | Credenciales entre servicios no son secretos estáticos de larga vida | MQ, DB | Usuario y contraseña por servicio en RabbitMQ y Mongo, rotados según runbook. Es una desviación parcial aceptable a este tamaño; se documenta en riesgo residual R6 | F1-T03, F6-T03 | Desviación (propuesta) |
| 2.10.2 | Si se usan contraseñas de servicio, no son las de fábrica | MQ, DB | Sin `guest/guest`; contraseñas generadas | F1-T03 | Pendiente |
| 2.10.3 | Las contraseñas de servicio se guardan protegidas | MQ, DB | Variables del proveedor; `.env` local fuera de git | F1-T03, F6-T03 | Pendiente |
| 2.10.4 | Secretos y llaves no están en el código ni en el repositorio | CI, TODOS | Gitleaks en pre-commit y en CI; `.env.example` sin valores | F0-T03, F0-T07 | Pendiente |

### V3. Gestión de sesión

| ID | Requisito (resumen) | Aplica a | Cómo se cumple en AsiST | Fase | Estado |
| --- | --- | --- | --- | --- | --- |
| 3.1.1 | Los tokens nunca van en la URL | GW, CHAT, APP | Solo cabecera `Authorization`; en Socket.IO, en `auth` del handshake, nunca en la query | F2, F4-T01 | Pendiente |
| 3.2.1 | Se emite un token nuevo al autenticarse | AUTH | Cada login crea una familia de refresh nueva | F2-T04 | Pendiente |
| 3.2.2 | Tokens con al menos 64 bits de entropía | AUTH | Refresh opaco de 256 bits (`crypto.randomBytes(32)`) | F2-T04 | Pendiente |
| 3.2.3 | Tokens guardados de forma segura en el cliente | APP | `expo-secure-store`; nunca AsyncStorage ni logs | F2-T11 | Pendiente |
| 3.2.4 | Tokens generados con algoritmos aprobados | AUTH | JWT RS256 con `jose`; refresh con CSPRNG | F2-T04 | Pendiente |
| 3.3.1 | Cerrar sesión y expirar invalidan el token | AUTH, APP | Logout revoca la familia de refresh; el acceso expira en 15 min (ver riesgo residual R2) | F2-T02 | Pendiente |
| 3.3.2 | Re-autenticación periódica | AUTH | Refresh de 7 días; al vencer, hay que iniciar sesión otra vez | F2-T04 | Pendiente |
| 3.3.3 | Opción de cerrar las demás sesiones tras cambiar la contraseña | AUTH, APP | El cambio de contraseña revoca todas las familias excepto la actual | F2-T02 | Pendiente |
| 3.3.4 | El usuario ve y cierra sus sesiones activas | AUTH, APP | Lista de familias de refresh (dispositivo, fecha) con opción de revocar | F2 | Pendiente |
| 3.5.2 | Se usan tokens de sesión, no secretos de API estáticos | AUTH | JWT de acceso corto + refresh rotativo | F2-T04 | Pendiente |
| 3.5.3 | Tokens sin estado firmados y protegidos contra manipulación, algoritmo `none` y sustitución de llave | AUTH, GW, CORE, CHAT | Validar firma, `alg` fijo `RS256`, `iss`, `aud`, `exp`, `nbf`; llave solo desde el JWKS configurado, nunca desde `jku`/`x5u`/`jwk` de la cabecera | F2-T07 | Pendiente |
| 3.7.1 | Sesión válida o re-autenticación antes de operaciones sensibles | AUTH | Cambiar contraseña exige la actual; acciones de admin exigen token emitido hace menos de 15 min | F2 | Pendiente |

Los requisitos 3.4.x (cookies) y 3.5.1 (revocar consentimientos OAuth) **no aplican**: no hay cookies ni OAuth de terceros.

### V4. Control de acceso

| ID | Requisito (resumen) | Aplica a | Cómo se cumple en AsiST | Fase | Estado |
| --- | --- | --- | --- | --- | --- |
| 4.1.1 | El control de acceso se aplica en el servidor de confianza | GW, AUTH, CORE, CHAT | Cada servicio verifica token y permisos; el gateway no es la única barrera | F2–F4 | Pendiente |
| 4.1.2 | El usuario no puede manipular los atributos usados para autorizar | AUTH, CORE, CHAT | Identidad y rol salen solo del token; `driverId`, `ownerId`, `passengerId`, `senderId` nunca del cliente; `rol` y `bloqueado` solo por endpoint de admin | F2-T06, F3, F4 | Pendiente |
| 4.1.3 | Mínimo privilegio | TODOS | Roles `pasajero`, `conductor`, `ambos`, `admin`; registro no puede pedir `admin`; servicios con usuario de base y de bus limitado a lo suyo | F2, F1-T03 | Pendiente |
| 4.1.5 | El control de acceso falla de forma segura | TODOS | Denegar por defecto; error en la verificación = 401/403, nunca pasar | F2-T07 | Pendiente |
| 4.2.1 | Protección contra IDOR/BOLA en lectura, edición y borrado | AUTH, CORE, CHAT | Toda consulta filtra por dueño o pertenencia; pruebas de "otro usuario no puede" por endpoint (OWASP API1) | F2–F4 | Pendiente |
| 4.2.2 | Protección anti-CSRF | — | Sin cookies; la autenticación es por cabecera Bearer. Se revisa si aparece un cliente web | — | No aplica |
| 4.3.1 | Las interfaces de administración usan MFA | AUTH | Sin correo ni SMS; TOTP para cuentas admin es viable sin proveedor externo. Propuesta en la sección 6 | F2 | Diferido |
| 4.3.2 | Listado de directorios y metadatos (`.git`, `.env`) no expuestos | GW | El gateway solo enruta prefijos de la tabla de rutas; 404 para todo lo demás | F1-T05 | Pendiente |
| 4.3.3 | Autorización adicional para funciones de alto valor | AUTH | Cambiar rol o bloquear exige rol `admin`, token reciente (3.7.1) y queda en auditoría | F2 | Pendiente |

### V5. Validación, desinfección y codificación

| ID | Requisito (resumen) | Aplica a | Cómo se cumple en AsiST | Fase | Estado |
| --- | --- | --- | --- | --- | --- |
| 5.1.1 | Defensa contra contaminación de parámetros HTTP | GW, servicios | Zod rechaza arrays donde se espera un escalar; `query parser` simple de Express | F1–F4 | Pendiente |
| 5.1.2 | Protección contra asignación masiva | AUTH, CORE, CHAT | Zod `.strict()`; casos de uso reciben objetos construidos campo a campo (OWASP API3) | F2-T06, F3 | Pendiente |
| 5.1.3 | Toda entrada se valida con lista blanca | TODOS | Zod en HTTP, WebSocket y eventos consumidos | F1–F4 | Pendiente |
| 5.1.4 | Datos estructurados con tipos y esquema (fechas, ObjectId, rangos) | TODOS | `Date` en UTC, ObjectId validado antes de consultar, longitudes máximas en todo texto | F1–F4 | Pendiente |
| 5.1.5 | Redirecciones solo a destinos permitidos | GW | El gateway no redirige a URLs del cliente; destinos fijos por configuración | F1-T05 | Pendiente |
| 5.2.6 | Protección contra SSRF | GW | El proxy solo reenvía a la tabla de rutas; no hay URL de destino controlada por el usuario | F1-T05 | Pendiente |
| 5.3.3 | Codificación de salida según contexto (XSS) | APP, CHAT | React Native escapa texto por defecto; el chat se guarda y se devuelve como texto plano, sin HTML | F4-T03 | Pendiente |
| 5.3.4 | Consultas a la base protegidas contra inyección | AUTH, CORE, CHAT | Filtros de Mongo construidos a mano, nunca `req.body` o `req.query` directo; `sanitizeFilter` de Mongoose activo | F2–F4 | Pendiente |
| 5.3.6 | Protección contra inyección de JSON / JavaScript | TODOS | Sin `$where`, sin `eval`, sin construir JSON concatenando cadenas | F1–F4 | Pendiente |
| 5.5.1 | Objetos serializados con controles de integridad | MQ | Eventos validados con Zod al consumir; solo publican los servicios con permiso de escritura en el exchange | F2-T08 | Pendiente |
| 5.5.3 | Se evita deserializar datos no confiables de forma insegura | TODOS | Solo `JSON.parse` y Zod; nunca librerías de serialización de objetos | F1–F4 | Pendiente |

### V6. Criptografía almacenada

| ID | Requisito (resumen) | Aplica a | Cómo se cumple en AsiST | Fase | Estado |
| --- | --- | --- | --- | --- | --- |
| 6.1.1 | Datos personales regulados cifrados en reposo | DB | Cifrado en reposo de Atlas. La cédula se guarda completa solo en auth-service y nunca se replica a otros servicios | F6-T03 | Pendiente |
| 6.2.1 | Los módulos criptográficos fallan de forma segura | AUTH | Sin `try/catch` que convierta un fallo de verificación en éxito | F2 | Pendiente |
| 6.2.2 | Algoritmos y librerías probados, nada propio | AUTH | `jose`, `argon2`, `crypto` de Node | F2 | Pendiente |
| 6.2.5 | No se usan algoritmos inseguros (MD5, SHA-1, HS con secreto débil) | TODOS | Refresh guardado como SHA-256; JWT RS256 de 2048 bits o más | F2-T04 | Pendiente |
| 6.3.1 | Números aleatorios con CSPRNG | AUTH, CORE | `crypto.randomBytes`, `crypto.randomUUID` para ids de evento | F2 | Pendiente |
| 6.4.1 | Solución de gestión de secretos | AUTH, TODOS | Variables cifradas del proveedor de despliegue; llave privada nunca en el repositorio | F6-T03 | Pendiente |
| 6.4.2 | El material de llaves no se expone a la aplicación (bóveda o HSM) | AUTH | No hay HSM ni bóveda dedicada en este alcance. La llave privada vive solo en el proceso de auth-service | — | Desviación (propuesta) |

### V7. Manejo de errores y registro

| ID | Requisito (resumen) | Aplica a | Cómo se cumple en AsiST | Fase | Estado |
| --- | --- | --- | --- | --- | --- |
| 7.1.1 | No se registran credenciales; los tokens solo como hash | TODOS, APP | Redacción en Pino de `authorization`, `password`, `contraseña`, `token`, `refreshToken`, `cedula` | F1-T02, F0-T08 | Pendiente |
| 7.1.2 | No se registran otros datos sensibles | TODOS | Se registra el id de usuario, no el correo ni la cédula | F1-T02 | Pendiente |
| 7.1.3 | Se registran los eventos de seguridad | AUTH, GW, servicios | Login exitoso y fallido, refresh reutilizado, 401/403, errores de validación, cambios de rol y bloqueo | F2, F5-T03 | Pendiente |
| 7.1.4 | Cada evento tiene datos para reconstruir la línea de tiempo | TODOS | Fecha UTC, servicio, id de correlación, id de usuario, ruta, resultado | F1-T02 | Pendiente |
| 7.2.1 | Se registran todas las decisiones de autenticación | AUTH | Sin guardar tokens ni contraseñas | F2 | Pendiente |
| 7.2.2 | Se registran las decisiones de control de acceso fallidas | TODOS | Middleware de autorización registra cada 403 | F2-T07 | Pendiente |
| 7.3.1 | Codificación de logs contra inyección | TODOS | Logs JSON (Pino escapa los valores) | F1-T02 | Pendiente |
| 7.3.3 | Logs protegidos contra acceso y modificación no autorizados | TODOS | Logs solo en el proveedor; acceso de diego | F6-T03 | Pendiente |
| 7.3.4 | Fuentes de tiempo sincronizadas y en UTC | TODOS | Hora del proveedor; timestamps ISO 8601 en UTC | F1-T02 | Pendiente |
| 7.4.1 | Mensaje genérico ante errores inesperados, con id para soporte | TODOS | Problem Details (RFC 9457) con `instance` = id de correlación; sin stack | F1-T02 | Pendiente |
| 7.4.2 | Manejo de excepciones consistente en todo el código | TODOS | Errores de dominio tipados que el middleware traduce a HTTP | F1-T02, F2 | Pendiente |
| 7.4.3 | Manejador de último recurso | TODOS | Middleware final de errores en Express y manejador de `unhandledRejection` | F1-T02 | Pendiente |

### V8. Protección de datos

| ID | Requisito (resumen) | Aplica a | Cómo se cumple en AsiST | Fase | Estado |
| --- | --- | --- | --- | --- | --- |
| 8.1.1 | Datos sensibles no se guardan en cachés del servidor | GW | `Cache-Control: no-store` en respuestas autenticadas | F1-T04 | Pendiente |
| 8.2.2 | Almacenamiento del cliente sin datos sensibles | APP | Tokens solo en `expo-secure-store`; TanStack Query sin persistencia de datos personales en disco | F2-T11 | Pendiente |
| 8.3.1 | Datos sensibles en cuerpo o cabeceras, nunca en la query | TODOS | Búsquedas por id; ni cédula ni correo en la URL | F2–F4 | Pendiente |
| 8.3.2 | El usuario puede exportar y borrar sus datos | AUTH, CORE, CHAT | Requerido por la Ley 1581 (derechos de habeas data). Borrado por evento `user.deleted` hacia los demás servicios. Fuera del plan actual; se propone como tarea nueva | — | Diferido |
| 8.3.4 | Inventario de datos sensibles y política de tratamiento | TODOS | Sección 5 de este documento | F0-T05 | Pendiente |
| 8.3.5 | Se audita el acceso a datos sensibles | AUTH | Auditoría cuando un admin consulta el perfil completo de otro usuario | F2 | Pendiente |
| 8.3.8 | Política de retención | CHAT, AUTH | Propuesta: mensajes de chat 6 meses después de terminar el viaje; logs 30 días. Requiere aprobación de diego | F4, F5 | Pendiente |

### V9. Comunicaciones

| ID | Requisito (resumen) | Aplica a | Cómo se cumple en AsiST | Fase | Estado |
| --- | --- | --- | --- | --- | --- |
| 9.1.1 | TLS para toda conexión del cliente, sin caída a HTTP | GW, APP | TLS terminado en el proveedor; la app de producción solo usa `https`/`wss` | F6-T03, F6-T05 | Pendiente |
| 9.1.2 | Configuración TLS actualizada y cifrados fuertes | GW | Configuración del proveedor; se verifica con un escaneo externo | F6-T04 | Pendiente |
| 9.1.3 | Solo TLS 1.2 y 1.3 | GW | Igual que 9.1.2 | F6-T04 | Pendiente |
| 9.2.1 | Conexiones del servidor con certificados de confianza | servicios, DB, MQ | `mongodb+srv` y `amqps` con validación de certificado activa | F6-T03 | Pendiente |
| 9.2.2 | TLS en todas las conexiones entrantes y salientes del servidor | servicios, DB, MQ | TLS hacia Atlas y CloudAMQP. El tráfico gateway → servicio en la red privada del proveedor va sin TLS: ver riesgo residual R5 | F6-T03 | Desviación (propuesta) |
| 9.2.5 | Se registran fallas de conexión TLS hacia el backend | servicios | Errores de conexión a Mongo y RabbitMQ en el log | F5-T03 | Pendiente |

### V10. Código malicioso

| ID | Requisito (resumen) | Aplica a | Cómo se cumple en AsiST | Fase | Estado |
| --- | --- | --- | --- | --- | --- |
| 10.2.1 | Sin conexiones no documentadas ni recolección de datos ocultas | APP, TODOS | Revisión de dependencias nuevas en el PR (CLAUDE.md, sección 3) | continuo | Pendiente |
| 10.2.2 | La app no pide permisos innecesarios | APP | Revisar permisos de Expo en `app.json` (ubicación, cámara) | F6-T05 | Pendiente |
| 10.3.2 | Protección de integridad de dependencias | CI | `package-lock.json`, `npm ci`, Dependabot y `npm audit` | F0-T07 | Pendiente |

### V11. Lógica de negocio

| ID | Requisito (resumen) | Aplica a | Cómo se cumple en AsiST | Fase | Estado |
| --- | --- | --- | --- | --- | --- |
| 11.1.1 | Los flujos se procesan en orden y sin saltar pasos | CORE | Máquina de estados de reserva y de viaje; transiciones no permitidas devuelven 409 | F3-T05 | Pendiente |
| 11.1.2 | Los flujos se procesan en tiempos realistas | CORE | No se puede reservar un viaje que ya salió ni crear uno en el pasado | F3-T03 | Pendiente |
| 11.1.3 | Límites por acción y por usuario | CORE, CHAT | Máximo de reservas pendientes por pasajero, viajes activos por conductor y mensajes por 10 s (OWASP API6) | F3, F4-T03 | Pendiente |
| 11.1.4 | Anti-automatización contra llamadas excesivas | GW | Rate limit global y por ruta en el gateway (OWASP API4) | F1-T04 | Pendiente |
| 11.1.5 | Límites de negocio validados | CORE | Cupos ≤ capacidad del vehículo; un conductor no reserva su propio viaje | F3-T03, F3-T05 | Pendiente |
| 11.1.6 | Sin condiciones de carrera (TOCTOU) | CORE | Descuento atómico con `findOneAndUpdate` y condición `cupos_disponibles > 0`; prueba concurrente | F3-T06 | Pendiente |
| 11.1.7 | Monitoreo de eventos inusuales | GW, AUTH | Alertas por picos de 401/403/5xx y por refresh reutilizado | F5-T03 | Pendiente |

### V12. Archivos y recursos

No hay carga de archivos en el alcance actual: **V12 no aplica**, salvo 12.6.1 (SSRF), que se cubre con 5.2.6 en el gateway. Si se agrega foto de perfil o de vehículo, se reabre este capítulo y el modelo de amenazas.

### V13. API y servicios web

| ID | Requisito (resumen) | Aplica a | Cómo se cumple en AsiST | Fase | Estado |
| --- | --- | --- | --- | --- | --- |
| 13.1.1 | Mismas codificaciones y parsers en todos los componentes | TODOS | UTF-8 y `express.json` con la misma configuración en gateway y servicios | F1 | Pendiente |
| 13.1.3 | Las URLs de la API no exponen datos sensibles | TODOS | Sin tokens, correos ni cédulas en rutas o query | F2–F4 | Pendiente |
| 13.1.4 | Autorización en la ruta y en el recurso | GW, servicios | Gateway: token y ruta; servicio: dueño o pertenencia del recurso (OWASP API1 y API5) | F2–F4 | Pendiente |
| 13.1.5 | Se rechazan tipos de contenido inesperados | GW, servicios | Solo `application/json`; 415 en otro caso | F1-T04 | Pendiente |
| 13.2.1 | Solo los métodos HTTP necesarios por ruta | TODOS | Rutas explícitas; 405 para el resto | F1–F4 | Pendiente |
| 13.2.2 | Validación de esquema JSON antes de procesar | TODOS | Zod antes del caso de uso | F1–F4 | Pendiente |
| 13.2.3 | Protección CSRF en servicios REST con cookies | — | Sin cookies | — | No aplica |
| 13.2.5 | Se verifica `Content-Type` de la petición | TODOS | Igual que 13.1.5 | F1-T04 | Pendiente |
| 13.2.6 | Cabeceras y cuerpo confiables y no modificados en tránsito | GW | TLS (V9); el gateway elimina cabeceras internas que llegan del cliente | F1-T04 | Pendiente |

Requisitos adicionales de API (OWASP API Security Top 10, 2023) que ASVS 4.0.3 no cubre de forma explícita:

| Riesgo | Cómo se cubre |
| --- | --- |
| API4 Consumo de recursos sin restricción | Body ≤ 100 kB, paginación ≤ 50, longitud máxima en todo texto, timeouts en el proxy (F5-T02), rate limit |
| API8 Configuración insegura | Helmet, CORS con lista blanca, sin cabecera `X-Powered-By`, errores sin stack |
| API9 Inventario de APIs | Tabla de rutas del gateway como fuente única; documentación en `docs/api/` |
| API10 Consumo inseguro de APIs | Los servicios validan con Zod los eventos que consumen, aunque vengan de otro servicio propio |

### V14. Configuración

| ID | Requisito (resumen) | Aplica a | Cómo se cumple en AsiST | Fase | Estado |
| --- | --- | --- | --- | --- | --- |
| 14.1.1 | Build seguro y repetible | CI | `npm ci` con lockfile; CI en cada PR | F0-T07 | Pendiente |
| 14.1.3 | Configuración del servidor endurecida | TODOS | Helmet, `trust proxy` solo para el gateway, `x-powered-by` desactivado | F1-T04 | Pendiente |
| 14.1.4 | Se puede redesplegar con scripts automatizados | CI | Dockerfiles, docker-compose y pipeline | F1-T03, F6 | Pendiente |
| 14.2.1 | Componentes actualizados y sin vulnerabilidades conocidas | CI | `npm audit --audit-level=high`, Dependabot, Trivy | F0-T07, F6-T01 | Pendiente |
| 14.2.2 | Se quitan funciones, ejemplos y documentación innecesarios | TODOS | Se borra `legacy/` al cerrar la fase 3; sin rutas de prueba en producción | F3-T09 | Pendiente |
| 14.2.4 | Dependencias de repositorios confiables | CI | Solo el registro de npm; justificar cada dependencia nueva en el PR | continuo | Pendiente |
| 14.2.5 | Inventario de componentes de terceros (SBOM) | CI | SBOM con Syft por versión | F6-T01 | Pendiente |
| 14.3.2 | Modo depuración desactivado en producción | TODOS | `NODE_ENV=production`; sin `morgan('dev')` | F6 | Pendiente |
| 14.3.3 | Las cabeceras no exponen versiones | GW | `x-powered-by` desactivado; Helmet | F1-T04 | Pendiente |
| 14.4.1 | `Content-Type` con charset en toda respuesta | TODOS | `application/json; charset=utf-8` | F1 | Pendiente |
| 14.4.3 | Content-Security-Policy | GW | Helmet con CSP restrictiva (la API no sirve HTML) | F1-T04 | Pendiente |
| 14.4.4 | `X-Content-Type-Options: nosniff` | GW | Helmet | F1-T04 | Pendiente |
| 14.4.5 | Strict-Transport-Security | GW | Helmet, activo solo con TLS | F6-T03 | Pendiente |
| 14.4.6 | Referrer-Policy | GW | Helmet `no-referrer` | F1-T04 | Pendiente |
| 14.4.7 | Protección contra framing | GW | Helmet `frame-ancestors 'none'` | F1-T04 | Pendiente |
| 14.5.1 | Solo métodos HTTP en uso | GW | Ver 13.2.1 | F1-T04 | Pendiente |
| 14.5.2 | La cabecera `Origin` no se usa para autenticar | GW | CORS solo restringe navegadores; la autenticación es siempre el JWT | F1-T04 | Pendiente |
| 14.5.3 | CORS con lista blanca estricta | GW, CHAT | Lista de orígenes por variable de entorno; nunca `*` en producción | F1-T04, F4-T05 | Pendiente |
| 14.5.4 | Las cabeceras añadidas por un proxy de confianza se autentican | GW, servicios | Los servicios no confían en cabeceras de identidad como `x-user-id`; verifican el JWT ellos mismos (ADR 0002). El gateway borra esas cabeceras si llegan del cliente | F2-T07 | Pendiente |

## 5. Clasificación de datos

| Dato | Clasificación | Servicio dueño | Reglas |
| --- | --- | --- | --- |
| Contraseña | Secreto | auth | Solo hash argon2id; nunca en logs, respuestas ni eventos |
| Refresh token | Secreto | auth | Solo hash SHA-256 en la base; en el cliente, `expo-secure-store` |
| Llave privada JWT | Secreto | auth | Variable del proveedor; nunca en el repositorio |
| Credenciales de Mongo y RabbitMQ | Secreto | cada servicio | Variables del proveedor; una por servicio |
| Cédula | Personal sensible | auth | No sale de auth-service; en respuestas, enmascarada (últimos 4 dígitos); nunca en logs ni en eventos |
| Teléfono, fecha de nacimiento | Personal | auth | Solo para el propio usuario y admin; nunca en eventos |
| Correo institucional | Personal | auth | No se replica en eventos; los demás servicios usan id y nombre |
| Nombre y apellido | Personal, visible a contrapartes | auth (réplica en `user_refs`) | Se replica en core y chat para mostrar conductor y pasajero |
| Placa y datos del vehículo | Personal, visible a contrapartes | core | Visible para pasajeros con reserva aceptada |
| Viajes y reservas | Interno | core | Visible según rol y pertenencia |
| Mensajes de chat | Personal | chat | Solo miembros de la sala; retención limitada (8.3.8) |
| Logs | Interno | todos | Sin secretos ni datos sensibles; retención 30 días |

## 6. Decisiones que necesitan a diego

1. **Longitud mínima de contraseña (2.1.1).** ASVS nivel 2 pide 12 caracteres y el plan fija 10. Recomendación: subir a 12, porque es un cambio de una constante y deja el requisito cumplido. Si se mantiene 10, el requisito queda como desviación aceptada.
2. **Recuperación de contraseña sin correo (2.5.6).** Recomendación: recuperación asistida por un admin con código de un solo uso entregado en persona, que revoca todas las sesiones. Alternativa: no ofrecer recuperación hasta tener correo.
3. **MFA para cuentas admin (4.3.1).** Recomendación: TOTP (aplicación autenticadora) solo para el rol admin; no necesita proveedor externo. Alternativa: diferirlo y aceptar el riesgo.
4. **Derechos de habeas data (8.3.2).** Recomendación: agregar una tarea en la fase 3 para exportar y borrar la cuenta, con un evento `user.deleted`.
5. **Desviaciones propuestas por tamaño del proyecto:** 2.10.1 (credenciales estáticas por servicio), 6.4.2 (sin bóveda o HSM) y 9.2.2 (tráfico interno sin TLS en la red privada). Cada una tiene su riesgo residual en el modelo de amenazas.
