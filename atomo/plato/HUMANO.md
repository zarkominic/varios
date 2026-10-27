# Proporciones de la persona

La persona de los vídeos se dibuja con estas proporciones en todos los estilos. Es estilizada (la cabeza algo más grande que en la realidad), pero el cuerpo bajo la barbilla sigue las medidas reales. En la prueba de identidad del 20 de octubre salió deforme en todos los estilos:
- cabezas de ¼ de la altura;
- piernas de solo un 38 % de la altura;
- con el brazo doblado, el codo caía a la altura de la entrepierna.

Por eso los brazos parecían larguísimos.

## Medidas

H es la altura total, de la coronilla a la suela. Cada línea se mide desde la coronilla, de pie y con los brazos colgando.

| línea | desde la coronilla |
|---|---|
| barbilla (la cabeza mide H/6) | 0,17 H |
| hombros | 0,21 H |
| codos y cintura | 0,40 H |
| muñecas y entrepierna | 0,53 H |
| puntas de los dedos (mitad del muslo) | 0,63 H |
| rodillas | 0,73 H |
| suelo | 1,00 H |

- **Las piernas miden casi la mitad de la altura** (de la entrepierna al suelo, 0,47 H). Nunca menos de 0,45 H.
- **Anchos:** hombros 0,25 H (algo menos de dos cabezas a lo ancho) y caderas 0,19 H.
- **Largos de cada tramo, que no cambian en ninguna postura:**
  - brazo, del hombro al codo: 0,18 H;
  - antebrazo, del codo a la muñeca: 0,14 H;
  - mano: 0,10 H, lo que mide la cara de la barbilla al pelo;
  - pie: 0,15 H.
- **En cualquier postura,** cuando la persona señala o saluda:
  - el brazo dobla por el codo y el codo queda a la altura de la cintura o por encima;
  - el brazo no se estira para llegar a algo: se mueve la persona o el objeto.
- **Margen:** los estilos caricaturescos (cómic, plastilina) pueden apartarse ±0,02 H en cada línea, pero no cambiar la cabeza ni las piernas.

## Cómo comprobarlo

Captura un fotograma con la persona de pie y pasa:

```
python3 atomo/herramientas/guias-humano.py <imagen> <x_centro> <y_coronilla> <y_suela> [--salida <png>]
```

El script dibuja estas líneas sobre la persona. Cada línea tiene que caer en su sitio: barbilla, hombros, codos con la cintura, muñecas con la entrepierna, dedos, rodillas y suelo. Para las posturas con el brazo doblado, mide los tramos del brazo con las mismas guías.
