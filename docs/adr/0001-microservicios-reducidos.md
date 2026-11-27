# 0001. Microservicios reducidos

| Campo | Valor |
| --- | --- |
| Estado | Aceptado |
| Fecha | 2026-11-26 |
| Decisores | diego |
| Tarea | F0-T06 |
| Relacionados | [ADR 0002](0002-jwt-rs256-verificacion-distribuida.md), [modelo de amenazas](../threat-model/sistema.md), [requisitos ASVS](../security/requisitos.md) |

## Contexto

AsiST es una app de transporte compartido para la comunidad de la Universidad Santo Tomás (Tunja). El proyecto de grado ya se entregó como un servidor Express monolítico (`Servidor/`) y un cliente Expo (`Cliente/`). Esta etapa es una reescritura de práctica: el objetivo es aprender arquitectura distribuida y desarrollo seguro, no entregar rápido.

Estado del servidor actual:

- Módulos de usuarios, vehículos y viajes en un solo proceso y una sola base.
- Falta el flujo de reservas, el chat no está conectado y solo `/api/users` exige token.
- Hay fallas de seguridad conocidas (CORS abierto, chat sin autenticación, JWT con secreto compartido, DTO que acepta `rol`), listadas en los [requisitos](../security/requisitos.md#3-brechas-observadas-en-el-código-actual).

Fuerzas:

1. **Aprendizaje:** diego quiere practicar gateway, servicios independientes, base por servicio y mensajería.
2. **Tamaño:** una sola persona, a tiempo parcial, con un dominio pequeño. Demasiados servicios multiplican el costo sin enseñar nada nuevo.
3. **Consistencia:** aceptar una reserva y descontar un cupo debe ser atómico. Separar viajes y reservas en dos servicios obligaría a una saga solo para eso.
4. **Seguridad:** cada límite nuevo entre procesos es superficie de ataque y requiere autenticación, validación y modelo de amenazas.

## Decisión

AsiST se reconstruye como **microservicios reducidos**: un gateway y tres servicios de negocio, con una base por servicio y eventos en RabbitMQ.

| Pieza | Responsabilidad | Base |
| --- | --- | --- |
| `gateway` | Única entrada pública: enrutamiento por tabla, verificación de JWT, CORS, rate limit, id de correlación, proxy WebSocket. Sin lógica de negocio | ninguna |
| `auth-service` | Registro, login con correo institucional y contraseña, refresh, perfil, roles, bloqueo. Emite los JWT | `asist_auth` |
| `core-service` | Vehículos, viajes y reservas (cupos), juntos a propósito | `asist_core` |
| `chat-service` | Socket.IO, salas por viaje, historial | `asist_chat` |
| RabbitMQ | Exchange `asist.events` de tipo topic | — |

Reglas:

1. El cliente solo habla con el gateway.
2. Cada servicio es dueño de su base; ningún servicio lee ni escribe la base de otro.
3. Entre servicios se comunican por eventos con patrón outbox. Una llamada HTTP síncrona entre servicios es excepción y necesita su propio ADR. La lectura del JWKS de auth-service (ADR 0002) es la única excepción aprobada.
4. Los contratos de eventos y DTO viven en `packages/contracts` como esquemas Zod. Un cambio incompatible crea una versión nueva del evento (`booking.accepted.v2`).
5. Los consumidores son idempotentes: guardan el id de cada evento procesado.
6. Cada servicio tiene capas `domain`, `application`, `infrastructure` e `interfaces/http`, con dependencias solo hacia adentro y composición en `main.ts`.
7. La migración sigue el patrón strangler fig: el gateway enruta a `legacy/servidor` lo que aún no se ha migrado, y el legado se borra al cerrar la fase 3.
8. Todo vive en un monorepo con npm workspaces (`apps/`, `gateway/`, `services/`, `packages/`, `legacy/`, `infra/`, `docs/`).

## Alternativas consideradas

| Alternativa | Ventajas | Desventajas | Por qué no |
| --- | --- | --- | --- |
| **Monolito modular por capas** | Lo más simple de operar; transacciones locales; un despliegue | No practica gateway, base por servicio ni mensajería | Fue la recomendación para terminar el proyecto de grado; el objetivo ahora es aprender microservicios |
| **Microservicios finos** (usuarios, vehículos, viajes, reservas, chat, notificaciones por separado) | Máxima independencia; más práctica de sagas | Saga obligatoria para descontar cupos; muchos procesos, bases y contratos para una persona; más superficie de ataque | El costo crece más rápido que el aprendizaje; reservas y viajes comparten invariantes |
| **Servicios con base compartida** | Menos datos duplicados; consultas cruzadas fáciles | Acoplamiento por esquema; cualquier servicio comprometido lee todo | Rompe el principio de propiedad de datos que se quiere practicar y empeora la contención ante una intrusión |
| **Comunicación síncrona HTTP entre servicios** | Más fácil de depurar al inicio | Fallas en cascada; acoplamiento temporal | El patrón outbox con eventos enseña consistencia eventual y aísla fallas |

## Consecuencias

Positivas:

- Se practica el ciclo completo: gateway, servicios independientes, propiedad de datos, eventos, idempotencia y despliegue en contenedores.
- Un servicio comprometido solo ve su propia base (contención).
- `core-service` mantiene el descuento de cupos como una transacción local, sin saga.
- El gateway permite migrar ruta por ruta sin apagar la app.

Negativas y riesgos:

- **Consistencia eventual:** `core` y `chat` ven los cambios de usuarios y reservas con retraso. Un usuario bloqueado puede actuar unos segundos más en otros servicios (riesgo residual R2 del modelo de amenazas).
- **Datos replicados:** `core` mantiene `user_refs` (id, nombre, rol, bloqueado). Nunca se replican cédula, teléfono ni correo.
- **Operación más compleja:** cuatro procesos, RabbitMQ y tres bases. Se compensa con `docker-compose` en local, health checks, logs con id de correlación y DLQ (fases 1 y 5).
- **Más superficie:** cada límite nuevo (gateway → servicio, servicio → bus) necesita autenticación y validación. Por eso cada servicio verifica el JWT por su cuenta (ADR 0002) y valida los eventos que consume.

## Seguridad

| Aspecto | Efecto | Referencia |
| --- | --- | --- |
| Límites de confianza | Nuevos límites LC2 (gateway → servicios), LC3 (bus) y LC4 (bases) | Modelo de amenazas, sección 3 |
| Mínimo privilegio | Usuario de base y de bus por servicio | ASVS 1.2.2, 4.1.3; MQ-S1, DB-T1 |
| Validación en cada límite | Zod en HTTP, WebSocket y eventos | ASVS 5.1.3, 5.5.1; MQ-T1 |
| Superficie pública | Solo el gateway es accesible desde internet | ASVS 1.14.1; GW-I2 |
| Transición | El legado sigue expuesto detrás del gateway hasta la fase 3 | Modelo de amenazas, sección 6.5 |
