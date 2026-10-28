# El nivel en una página (para los agentes)

Resumen de `ESTANDAR.md` y `GUIA-ESTILO.md`. Si algo choca, mandan esos dos. El nivel mínimo es el episodio 11 final (`referencia-ep11-1.jpg` y `-2.jpg`). El usuario lo dijo así: «todo excelente; pero sobre todo el detalle de las escenas y movimiento», y «no por ahorrar tiempo bajarlo por ninguna circunstancia».

## Cada plano

- **Ritmo:** dura 4–7 s y tiene su propia composición: otro decorado, otro encuadre o un inserto. Un cambio de cámara sobre el mismo dibujo no cuenta.
- **Detalle:** textura (vetas, juntas, tramas), luz y sombra, brillos, objetos reales del lugar y la época, y tres términos de profundidad.
- **Nada liso:** ni paredes lisas, ni cielos de franjas planas (los cielos van tramados, con nubes de tres tonos a varias velocidades y pájaros). Los insertos van siempre sobre su decorado o sobre una mesa con objetos.
- **Vida de fondo animada:** gente pequeña, luces, pantallas, vapor, viento, agua, animales.
- **Acción con propósito, sincronizada con la voz inglesa:** empieza y acaba dentro del plano. Nadie se queda tieso.
- **Pantalla completa:** pinta los 320 × 180 px en cada fotograma. Un fondo fijo va en un búfer: `const prev = R.usar(b); …; R.usar(prev)`, nunca `R.usar()` a secas, porque eso rompe los fundidos.

## Los siete fallos que más suspendieron en el 12 (evítalos desde el primer borrador)

En el 12, la calidad suspendió 41 planos en la primera ronda y casi todos eran de estos siete tipos. Cada uno que dejas pasar
cuesta después una ronda de revisor, escéptico y pulido:

1. **Brazo «palo»:** una manga recta y lisa que entra desde el borde (en el 12, de hasta 85 × 4 px). Un brazo entra en
   diagonal, se ven como mucho 30–45 px, tiene 6–7 px de grosor que se estrecha hacia el puño, luz y sombra, dos pliegues,
   puño y su sombra; y no cruza por encima de lo que tiene delante. Si no cabe así, solo la mano cerca del borde.
   Desde el 13 está hecho: `T.brazo(R, x0, y0, x1, y1, manga, dir, { codo: [x, y] })` (con la mano canónica al final) y,
   para la mano sola, `T.mano(R, x, y, dir, manga, { sinManga: true })`. No se escribe un brazo propio en la escena.
2. **Composición repetida:** el mismo encuadre que otro plano de la escena o de la escena de al lado (boya y barco en el
   mar tres veces; la misma granja con otra luz). Cada plano: otro decorado, otro encuadre de verdad o un inserto.
3. **Zonas «casi lisas»:** no basta con no ser de un color. Un cielo en degradado con dos nubes, un mueble con cuatro
   rayas, un asfalto con rejilla tenue o una hierba de ruido uniforme suspenden. Cada zona grande lleva objetos y
   textura del lugar (nubes de tres tonos a tres velocidades y pájaros; vetas, tiradores, toalla; calzos, manchas,
   charcos, un carro; matas, surcos, balizas).
4. **Algo que se sale de su sitio:** trayectorias, tramas o cotas de un mapa que pisan el marco; agua caliente pintada sobre
   la tierra. Todo lo que va dentro de un mapa, una pantalla o una ventana se recorta a su hueco (`R.recorte`, con
   `linea`, `pset`, `poligono` o `disco`; `R.rect` no lo respeta).
5. **Orden de dibujo:** el perro pintado sobre la pierna, el mecánico delante del camión, un brazo sobre la jabonera, una
   tarjeta encima de la luna. Antes de dar un plano por hecho, pregúntate qué va delante de qué.
6. **Zona de Atom o barra del año ocupadas:** una palmera, un farol o un tejado detrás de Atom; flechas que cruzan el
   sol o el año. Sube la cámara o aparta el objeto.
7. **Algo que flota o está quieto:** un patito por encima del puño, una horquilla sin anclar, testigos tiesos todo el
   plano, un tornado que se lee como un triángulo liso. Lo que se coge va en la mano; lo que se ve, se mueve.

8. **Algo que no se lee:** el objeto que cuenta la frase (un chip, un cartel, una cifra, un balón lejos) se pierde en
   la hoja a 640 px. Es el fallo que más salió en el 13 (21 de 96). Lo importante del plano se ve sin buscarlo: más
   grande, más cerca, con contraste o con un filo claro.

En el 13, la calidad suspendió 47 de los 102 planos del borrador, con 96 fallos: algo que no se lee 21, quieto 15,
composición repetida 13, zonas casi lisas 13, brazos 11, orden de dibujo 6, letras 4. Son los que hay que mirar antes de
entregar un borrador.

Además: **efectos** con un presupuesto de un efecto por segundo como mucho y pocos rellenos (pop, brillo, whoosh); el 12
llevaba 595 en 532 s y sonaban el 75 % del tiempo.

## Reglas que no se rompen

- **Sin letras en pantalla:** solo números y símbolos (`R.numero`, `R.icono`).
- **Personajes pequeños:** el chibi de ~25 px, sin primeros planos. Una mano es siempre la canónica de 14 px (`T.mano`, o al final de `T.brazo`). El plano medio se hace con un vehículo o con el decorado. El pelo nunca tapa la cara.
- **Zonas tranquilas:** la de Atom (x 278–318, y 4–44) y la barra del año (x 20–170, y 0–14).
- **Orden de dibujo:**
  - lo que pasa por detrás de un mueble queda tapado por él;
  - lo que se ve por una ventana se recorta a su hueco, con `R.recorte`;
  - `R.rect` no respeta `R.recorte`: usa `pset`, `linea`, `poligono` o `disco`;
  - los coches y las multitudes van por delante de la gente.
- **Tono:** gags con máquinas, animales y objetos, nunca contra personas reales. Nada morboso.
- **Rendimiento:** como mucho ~3 recorridos de toda la pantalla por fotograma.
- **Efectos:** solo recetas de `NIVEL` en `atomo/herramientas/efectos.cjs`. `gluglu` es el pavo; para líquidos va `burbujas`.

## Cómo se trabaja (para gastar poco)

- **Lectura:** no leas enteros los documentos ni `th-comun.js` (5.200 líneas). Lee solo las funciones que te digan como modelo (con `grep -n` y `sed -n`).
- **Imágenes:** mira las hojas de `medir-planos.mjs --hoja` (640 × 360). La captura a 1920 × 1080 es solo para un detalle concreto.
- **Respuesta:** corta y estructurada (fallos, posiciones de las que dependes y rutas de las hojas finales). Sin redacción larga.
