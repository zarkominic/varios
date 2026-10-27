# El nivel en una página (para los agentes)

Resumen de `ESTANDAR.md` y `GUIA-ESTILO.md`. Si algo choca, mandan esos dos. El nivel mínimo es el episodio 11 final (`referencia-ep11-1.jpg` y `-2.jpg`). El usuario lo dijo así: «todo excelente; pero sobre todo el detalle de las escenas y movimiento», y «no por ahorrar tiempo bajarlo por ninguna circunstancia».

## Cada plano

- **Ritmo:** dura 4–7 s y tiene su propia composición: otro decorado, otro encuadre o un inserto. Un cambio de cámara sobre el mismo dibujo no cuenta.
- **Detalle:** textura (vetas, juntas, tramas), luz y sombra, brillos, objetos reales del lugar y la época, y tres términos de profundidad.
- **Nada liso:** ni paredes lisas, ni cielos de franjas planas (los cielos van tramados, con nubes de tres tonos a varias velocidades y pájaros). Los insertos van siempre sobre su decorado o sobre una mesa con objetos.
- **Vida de fondo animada:** gente pequeña, luces, pantallas, vapor, viento, agua, animales.
- **Acción con propósito, sincronizada con la voz inglesa:** empieza y acaba dentro del plano. Nadie se queda tieso.
- **Pantalla completa:** pinta los 320 × 180 px en cada fotograma. Un fondo fijo va en un búfer: `const prev = R.usar(b); …; R.usar(prev)`, nunca `R.usar()` a secas, porque eso rompe los fundidos.

## Reglas que no se rompen

- **Sin letras en pantalla:** solo números y símbolos (`R.numero`, `R.icono`).
- **Personajes pequeños:** el chibi de ~25 px, sin primeros planos. Una mano es siempre la canónica de 14 px (`T.mano`). El plano medio se hace con un vehículo o con el decorado. El pelo nunca tapa la cara.
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
