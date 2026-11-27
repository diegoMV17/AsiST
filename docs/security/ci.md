# Pipeline de CI y puertas de seguridad

Dos workflows corren en cada PR y push a `develop` y `main`:

| Workflow | Job (nombre del check) | Qué verifica | ¿Bloquea? |
| --- | --- | --- | --- |
| `CI` | `Calidad (<carpeta>)` | `npm ci`, lint, tipos (`npm run typecheck`) y pruebas | Sí |
| `CI` | `npm audit (<carpeta>)` | `npm audit` con nivel high, salvo excepciones aceptadas | Sí |
| `Seguridad` | `Gitleaks` | Secretos en todo el historial de git | Sí |
| `Seguridad` | `CodeQL` | SAST de JavaScript/TypeScript (`security-extended`) | Sí, por alertas en Code scanning |
| `Seguridad` | `Trivy` | Configuración insegura (Dockerfile, compose, IaC); vulnerabilidades solo como reporte | Sí (configuración) |
| `Seguridad` | `Revisión de dependencias` | Dependencias nuevas con avisos high/critical en el PR | Sí |

`Seguridad` también corre los lunes a las 06:00 (Bogotá) para detectar avisos nuevos sin cambios en el código.

## Paquetes

El job `Detectar paquetes` busca toda carpeta con `package.json` y `package-lock.json` propios y crea una entrada de la matriz por cada una. Un servicio nuevo entra al CI sin tocar los workflows. Cuando el monorepo use workspaces con un solo lockfile en la raíz, la matriz tendrá una única entrada (`.`).

Cada paquete debe definir los scripts `lint`, `typecheck` y `test`. Los paquetes heredados (`Servidor`, `Cliente`, `legacy/servidor`, variable `LEGACY_PACKAGES` en `ci.yml`) solo requieren `typecheck` hasta que se retiren en la fase 3.

## Excepciones de `npm audit`

`.github/npm-audit-allowlist.json` guarda los riesgos aceptados por carpeta. Cada entrada lleva `id` (GHSA), `package`, `reason` y `expires`. Al vencer, la excepción deja de contar y el check vuelve a fallar. Agregar o extender una excepción requiere aprobación de diego en el PR. El resumen del job muestra qué avisos están aceptados y cuáles excepciones ya no se usan.

## Endurecimiento de los workflows

- Permisos mínimos: `contents: read` por defecto; `security-events: write` solo en los jobs que suben SARIF.
- Acciones fijadas por SHA de commit (Dependabot las actualiza cada semana).
- `persist-credentials: false` en cada checkout y `npm ci --ignore-scripts` para no ejecutar scripts de instalación de terceros.
- Gitleaks se descarga en versión fija y se verifica su SHA-256; `--redact` evita imprimir secretos en el log.

## Pendiente para la fase 1

- Escaneo de imágenes con Trivy cuando existan los Dockerfile de los servicios.
- ZAP baseline contra el gateway levantado con `docker compose` en el CI.
