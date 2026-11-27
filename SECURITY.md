# Política de seguridad de AsiST

AsiST es una app de transporte compartido para la comunidad de la Universidad Santo Tomás (Tunja). Este documento explica cómo reportar una vulnerabilidad y qué prácticas sigue el proyecto.

## Versiones con soporte

El proyecto está en reescritura hacia microservicios. Solo reciben correcciones de seguridad:

| Rama | Soporte |
| --- | --- |
| `main` | Sí |
| `develop` | Sí |
| Otras ramas | No |

## Cómo reportar una vulnerabilidad

**No abras un issue público ni un PR que describa la vulnerabilidad.**

1. Usa el reporte privado de GitHub: pestaña **Security** del repositorio → **Report a vulnerability** (GitHub Private Vulnerability Reporting).
2. Incluye: componente afectado (cliente, gateway, servicio), versión o commit, pasos para reproducir, impacto estimado y, si la tienes, una propuesta de corrección.
3. No incluyas datos personales reales de usuarios ni credenciales válidas; usa datos de prueba.

### Qué puedes esperar

| Paso | Plazo objetivo |
| --- | --- |
| Acuse de recibo | 5 días hábiles |
| Evaluación inicial y severidad (CVSS 3.1) | 10 días hábiles |
| Corrección de hallazgos críticos o altos | 30 días |
| Corrección de hallazgos medios o bajos | 90 días |

Te avisaremos cuando la corrección esté publicada y, si quieres, te daremos crédito en las notas del cambio.

## Alcance

Dentro del alcance:

- El cliente móvil (`apps/mobile`, hoy `Cliente/`).
- El gateway y los servicios (`gateway/`, `services/`) y el servidor heredado (`legacy/servidor`, hoy `Servidor/`).
- Los paquetes compartidos (`packages/`) y la configuración de CI e infraestructura del repositorio.

Fuera del alcance:

- Servicios de terceros (MongoDB Atlas, GitHub, Expo) salvo por una mala configuración nuestra.
- Ataques de denegación de servicio, ingeniería social o acceso físico.
- Hallazgos de escáneres automáticos sin una prueba de impacto.

## Puerto seguro

Si investigas de buena fe, respetas esta política, no accedes ni modificas datos de otras personas y nos das tiempo razonable para corregir antes de divulgar, no emprenderemos acciones en tu contra.

## Prácticas de seguridad del proyecto

- Referencias: OWASP ASVS nivel 2 y OWASP API Security Top 10 (2023), aplicados en cada fase del ciclo de desarrollo (SSDLC).
- Todo PR usa la plantilla con checklist de seguridad y requiere revisión del propietario del código (`.github/CODEOWNERS`).
- CI ejecuta lint, tipos, pruebas, CodeQL, `npm audit --audit-level=high`, Gitleaks y Trivy.
- Los secretos solo viven en variables de entorno; `.env` nunca se versiona.
- Contraseñas con argon2id y JWT RS256 de vida corta con refresh rotativo y revocable.

## Si se expone un secreto

1. Revoca o rota el secreto de inmediato en el proveedor (Atlas, llave JWT, token).
2. Avisa al propietario del repositorio por el canal privado de arriba.
3. Reescribir el historial de git no basta: un secreto que llegó a GitHub se considera comprometido.
