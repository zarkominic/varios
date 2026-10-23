# Estilo canónico: pixel chibi

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
- **Gestos del cuerpo:** `dedo` (explica con el índice arriba), `brazos` o `sorpresa` (las dos manos abiertas arriba), `salto` (en píxeles, con polvo en el suelo).
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

## Fondos

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
- **Composición de escenario de juego:**
  - un suelo horizontal claro (el muelle, de y 132 a 146) donde se plantan los personajes, con los pies en y ≈ 145;
  - el decorado detrás;
  - el agua o el suelo de delante, abajo.
- **Decorados reutilizables:** el puerto, la plaza o un interior salen varias veces en un episodio, con cambios de luz, de gente o de objetos. Un decorado nuevo cuesta unas 1,5–2 h.

## Lo que no cambia

- **Atom** abajo a la izquierda, y la caja de Atom arriba a la derecha.
- **El formato del episodio:** los mapas con zoom, la barra de tiempo arriba a la izquierda, las cartelas con el año, y el orden de primero el mapa y la historia como causa y efecto (ver `GUIA-NARRATIVA.md`).
- **Sin palabras en pantalla:** solo números y símbolos («!», «?», «$»…).
- **Personajes pequeños:** sin primeros planos.
