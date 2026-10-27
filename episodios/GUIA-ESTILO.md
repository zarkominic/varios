# Estilo canónico: pixel chibi

> **Estándar mínimo:** todo episodio cumple `ESTANDAR.md`, escrito en piedra con el episodio 11 final como referencia (decorados con textura, sombreado y vida animada, movimiento con propósito en cada plano de 4–7 s, música continua, −14 LUFS, subtítulos limpios, entrega completa en el chat). El proceso está en la skill `.claude/skills/episodio-ask-atom/`.

**Aprobado el 23 de octubre de 2026** a partir de la muestra del puerto del Pireo. Es el estilo de los episodios a partir del 8.

- **Escena de referencia:** `atomo/plato/escenas/px-chibi-muestra.html`. Vídeo: `atomo/build/salida/muestra-chibi-pireo.mp4`.
- **Kit:** `atomo/plato/kits/pixel-chibi.js`. Incluye el reparto, las caras, los gestos, los bustos del público, las nubes, las gaviotas y los bocadillos.
- **Inspiración:** pixel art de lucha arcade redibujado en cabezón (el vídeo de referencia que trajo el usuario). Se toma el aspecto, no los personajes.

## Personajes

- **Cabezones:** la cabeza ocupa casi la mitad del cuerpo.
  - Miden unos 26–28 px de alto, en un lienzo de 320 × 180.
  - Siguen siendo pequeños, nunca primeros planos.
- **Dibujados píxel a píxel,** no por código. Cada personaje es una rejilla de letras con una cabeza y un cuerpo de 15 px de ancho, dibujados mirando a la derecha. `dir: -1` los voltea.
- **Colores:**
  - un tono de luz y uno de sombra por pieza (piel, pelo, túnica, manto);
  - contorno `#1c1222` limpio;
  - sin tramas ni ruido.
- **Detalle de un píxel:**
  - broche dorado de la capa, cinturón, pliegues de la túnica, tiras de las sandalias;
  - brillos del pelo, oreja, nariz de perfil, mejillas.
- **Caras expresivas:** ojos de 2 px, cejas y boca.
  - Gestos: normal, `habla`, `sonrisa`, `sorpresa` (ojos grandes y boca en «O»), `enfado`, `triste`.
  - Parpadean solos.
- **Gestos del cuerpo:** `dedo` (explica con el índice arriba), `brazos` (las dos manos abiertas arriba), `salto` (en píxeles, con polvo en el suelo).
  - `sorpresa` va solo en la cara: con las manos junto a la cabeza parecían orejas. `manos: true` las levanta igualmente.
- **El pelo nunca tapa la cara:** la regla de siempre.
- **Variantes sin dibujar de nuevo:** `pal` cambia letras, por ejemplo otro color de pelo (`H`/`h`) u otra túnica (`A`/`a`).
- **Personaje nuevo:** se dibuja una vez, con cabeza y cuerpo, y se añade a `ELENCO_CHIBI`. Calcular unos 20–30 min por personaje.

## Público y multitudes

- **Bustos de frente de 9 × 12** que asoman por encima de una borda, un muro o una grada. Hay cinco tipos:
  - joven de pelo rizado;
  - viejo calvo con barba;
  - mujer con velo y moño;
  - soldado con casco y penacho;
  - marinero con gorro.
- **Cada busto cambia de colores con `tela(luz, sombra, {…})`.** Nunca dos iguales seguidos.
- **Se mueven:** parpadean, ríen con la boca abierta (`rie`), saludan con la mano (`saluda`) y dan saltitos.
- **Nada de cabecitas redondas iguales:** se ven de baja calidad.

## Humor

Cada episodio lleva **6–8 gags cortos** (1–3 s), pegados a lo que dice la frase y sin quitarle protagonismo a la voz. En el episodio 8:
- en la crecida, uno sentado en un cesto se va río abajo saludando;
- un obrero resbala desde lo alto de la pirámide, aterriza mareado y levanta el pulgar;
- en la hambruna, un ladrón flaco roba una hogaza y el campesino sale detrás;
- a Hatshepsut se le cae la barba postiza y la corte aguanta la risa;
- los hijos de Ramsés corretean y él suda;
- un soldado francés tropieza con la piedra de Rosetta;
- el sacerdote que echa la sal estornuda y queda blanco.

Piezas en `eg-comun.js`: `mareo`, `polvareda`, `trote`, `gotaSudor`, `pan`. Que nunca sea morboso.

## Fondos

**Nivel de detalle de referencia (aprobado el 25/10/2026): el gancho del episodio 10** (`atomo/plato/escenas/ov-gancho.html`, decorado `pacifico` en `ov-comun.js`). Todo decorado nuevo tiene que llegar a ese nivel:
- **Agua viva:**
  - olas en perspectiva, cada cresta con su largo, su altura y su sitio (nunca papel pintado);
  - borreguitos, vetas oscuras, sombras de nubes que pasan;
  - el camino del sol, con destellos que bailan.
- **Vida en el horizonte:** barcos con su estela y una luz que parpadea, delfines, gaviotas.
- **Planos que cambian:** general, plano medio (el caza grande de perfil con el piloto pequeño dentro) y cercano. El personaje sigue siendo pequeño: el plano medio se hace con el vehículo o el decorado, nunca con un primer plano de la cara.
- **Movimiento con intención:** lo que cruza la pantalla va a algún sitio (los cazas pasan, vuelven, bajan en espiral).

- **Planos de color con bandas:**
  - el cielo, en tres bandas;
  - las nubes, de tres tonos (sombra abajo, cuerpo, luz arriba) y moviéndose despacio;
  - el mar, en bandas con destellos que se desplazan.
- **Mucho detalle de objetos reales del lugar.** El Pireo lleva:
  - el trirreme con su ojo pintado, el espolón de bronce, las portillas, los remos, la vela recogida y el gallardete;
  - la estoa con el friso pintado de rojo y azul y el tejado de terracota;
  - las ánforas con asas y una banda de figuras negras, las cajas, los norays de hierro y la cuerda enrollada;
  - los veleros y la Acrópolis al fondo.
- **Todo se mueve un poco:** barcos que cabecean, banderas al viento, gaviotas, agua.
- **Nunca vacío:** cada decorado lleva su ambiente de serie (en `eg-comun.js`, se quita con una opción):
  - cielo: un halcón que planea y bandadas de golondrinas (de ibis al atardecer); de noche, estrellas fugaces;
  - río: ibis que cruzan, peces que saltan, un hipopótamo que asoma, libélulas, un ibis pescando, ocas;
  - desierto: rachas de viento con arena y una caravana de burros al fondo;
  - interiores: un gato que mueve la cola y bosteza, motas de polvo en la luz y, en las tumbas, una araña.
- **Composición de escenario de juego:**
  - un suelo horizontal claro (el muelle, de y 132 a 146) donde se plantan los personajes, con los pies en y ≈ 145;
  - el decorado detrás;
  - el agua o el suelo de delante, abajo.
- **Decorados reutilizables:** el puerto, la plaza o un interior salen varias veces en un episodio, con cambios de luz, de gente o de objetos. Un decorado nuevo cuesta unas 1,5–2 h.

## Lo que no cambia

- **Atom arriba a la derecha**, un 50 % más grande que en los episodios 1–7, y **solo**: sin caja, sin bocadillo, sin mensajes (decidido en el episodio 8: la caja no se entendía y el bocadillo se veía mal). Lo que se dice con números ya lo dice la voz. El sol de los cielos va en x ≈ 226 para no chocar con él.
- **El formato del episodio:** los mapas con zoom, la barra de tiempo arriba a la izquierda, las cartelas con el año, y el orden de primero el mapa y la historia como causa y efecto (ver `GUIA-NARRATIVA.md`).
- **Sin palabras en pantalla:** solo números y símbolos («!», «?», «$»…).
- **Personajes pequeños:** sin primeros planos.
