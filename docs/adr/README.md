# Registros de decisiones de arquitectura (ADR)

Un ADR deja por escrito una decisión de arquitectura, el contexto en que se tomó y sus consecuencias. Cualquier cambio a la arquitectura de AsiST necesita un ADR aprobado por diego **antes** de tocar código.

## Índice

| Número | Título | Estado | Fecha |
| --- | --- | --- | --- |
| [0001](0001-microservicios-reducidos.md) | Microservicios reducidos | Aceptado | 2026-11-26 |
| [0002](0002-jwt-rs256-verificacion-distribuida.md) | JWT RS256 y verificación distribuida | Aceptado | 2026-11-26 |

## Cómo escribir uno

1. Copia la plantilla de abajo en `docs/adr/NNNN-titulo-en-minusculas.md`, con el siguiente número libre.
2. Abre un PR con el estado **Propuesto**. El PR solo contiene el ADR.
3. Cuando diego lo aprueba, el estado pasa a **Aceptado** y se agrega al índice.
4. Un ADR aceptado no se edita para cambiar la decisión: se escribe uno nuevo que lo **reemplaza** y el viejo pasa a **Reemplazado por NNNN**.

Estados: Propuesto, Aceptado, Rechazado, Obsoleto, Reemplazado por NNNN.

## Plantilla

```markdown
# NNNN. Título

| Campo | Valor |
| --- | --- |
| Estado | Propuesto |
| Fecha | AAAA-MM-DD |
| Decisores | diego |
| Tarea | Fx-Tyy |
| Relacionados | ADR, modelo de amenazas, requisitos ASVS |

## Contexto

Qué problema hay y qué fuerzas empujan la decisión.

## Decisión

Qué se decide, en presente y en forma afirmativa.

## Alternativas consideradas

Cada opción con sus ventajas y desventajas, y por qué no se eligió.

## Consecuencias

Positivas, negativas y riesgos. Qué cambia en el código, en la operación y en la seguridad.

## Seguridad

Amenazas STRIDE y requisitos ASVS que la decisión afecta.
```
