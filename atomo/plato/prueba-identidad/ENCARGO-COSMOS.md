# Segunda prueba de identidad: de ti a la Vía Láctea en 11,6 s

La primera prueba (`ENCARGO.md`) solo cubría la mitad pequeña del episodio 3, de la persona al pelo. Esta cubre la mitad grande: la cámara sale de la persona y sube hasta la galaxia. Quedan cuatro estilos finalistas: **papel, cómic, plastilina y partículas**.

Cada versión es una escena del plató: `atomo/plato/escenas/cosmos-<estilo>.html`. Se carga con `escena('cosmos-<estilo>', 'cosmos')`, que lee `marcas-cosmos.json`. Valen todas las reglas de `atomo/plato/CONTRATO.md` y las de `ENCARGO.md` (sin palabras, determinista, 16:9, zona segura, recursos permitidos y coste).

## La voz y sus marcas (inglés, 11,58 s)

«Let's go back to you, and now, head up. · Seven jumps up, and you've vanished from view: this is the Earth. · Two more: the Sun. · Twelve more jumps: our galaxy, the Milky Way.»

| marca | s | palabra |
|---|---|---|
| `tu` | 1,20 | you |
| `arriba` | 2,02 | up |
| `siete` | 2,77 | Seven |
| `desaparecido` | 3,99 | vanished |
| `tierra` | 5,69 | Earth |
| `dos` | 6,53 | Two |
| `sol` | 6,95 | Sun |
| `doce` | 7,84 | Twelve |
| `galaxia` | 9,00 | galaxy |
| `lactea` | 9,66 | Milky (Way) |

- Lee los tiempos siempre con `E.marca(...)` y nunca los escribas a mano.
- Cada marca tiene su `<nombre>_fin`.
- La voz va de 0,5 s a 10,24 s. Desde ahí hasta 11,58 s, todo se asienta y queda quieto.

La voz está en `atomo/build/prueba-cosmos/voz-en.wav`, y las palabras con sus tiempos, en `palabras.json` de la misma carpeta.

## Guion visual (igual en todos los estilos)

1. **0 – `tu`, ya compuesto en t=0:**
   - Es la misma composición con la que empieza la primera prueba: la persona de pie, la regla de potencias de diez con el marcador en «10⁰ m» y Atom junto al hombro.
   - **La persona sigue `atomo/plato/HUMANO.md`.** Es lo primero que se va a mirar.
2. **`tu`:** Atom señala o mira a la persona, con un gesto pequeño.
3. **`arriba`:** Atom mira o sube hacia arriba. La regla deja ver las potencias positivas: se desliza o se amplía, como mejor encaje en el estilo.
4. **`siete` → `tierra`:** siete saltos ×10 hacia fuera, uno detrás de otro, con un golpe de alejamiento en cada uno.
   - Saltos: persona → casa y calle → barrio → ciudad → región → continente → la Tierra entera.
   - El marcador sube de 10⁰ a 10⁷ m.
   - La persona deja de verse hacia `desaparecido`.
   - El séptimo salto termina en `tierra`, con la Tierra completa en el plano.
5. **`dos` → `sol`:** dos saltos más.
   - La Tierra se encoge y pasa la Luna.
   - En `sol` entra el Sol, enorme, y la Tierra queda como un punto a su lado.
   - El marcador llega a 10⁹ m.
6. **`doce` → `lactea`:** doce saltos rápidos, cada vez más seguidos.
   - Saltos: Sol → órbitas del sistema solar → estrellas vecinas → campo de estrellas → la Vía Láctea en espiral, vista desde fuera.
   - El marcador llega a 10²¹ m.
   - En `lactea`, la galaxia está completa y una flecha o un punto diminuto (sin palabras) marca dónde estamos.
7. **Hasta el final:** todo se asienta y queda quieto.

**Atom está siempre en pantalla:**
- Es el narrador y tiene un tamaño constante en pantalla, como en la primera prueba.
- Se ve sobre cualquier fondo: el cielo, la Tierra o el Sol.
- Late con `E.energia(t)`.

**La regla** tiene que leerse en el móvil: la potencia actual se ve grande y clara en todo momento. Solo lleva números con potencias de diez y «m».

## Lo que toca a cada estilo

- **Papel:**
  - Corrige la persona de `kits/papel-prueba.js` y `prueba-papel.html` según `HUMANO.md`.
  - `prueba-mixta.html` usa el mismo kit: compruébala también.
  - Construye `cosmos-papel.html` con el mismo kit (paper stop-motion, `paso: 1/12`).
- **Cómic:**
  - Corrige la persona de `prueba-comic.html`. Ojo con el brazo que señala: el codo caía a la altura de la entrepierna.
  - Construye `cosmos-comic.html`.
- **Plastilina:**
  - Corrige la persona de `kits/plastilina-prueba.js` y `prueba-plastilina.html`.
  - Construye `cosmos-plastilina.html` (`paso: 1/12`; hasta 5 s por fotograma dibujado).
  - Los fondos de la Tierra, el Sol y las estrellas tienen que ser de plastilina, con el temblor del stop-motion, no fotos.
- **Partículas:** construye `cosmos-particulas.html`. Este estilo se hace de partículas de luz, todo él:
  - **Atom es el del canal.** Es el átomo narrador de partículas que sale en el avatar y el banner (`canal/avatar.png`, `canal/banner.png`), generado por `atomo/herramientas/canal.mjs` con `atomo/src/Atomo.jsx` y `atomo/src/formas/base.js`. Usa las mismas formas y los mismos colores (`C.proton`, `C.neutron`, `C.cian`).
  - **El motor de partículas en GPU y su acabado** (bokeh, estelas, curl noise) están en `estilos/01-particulas.html`.
  - **La persona está hecha de partículas,** como la de `prueba-fisica.html`, pero con las proporciones de `HUMANO.md`.
  - La Tierra, el Sol y la galaxia también son de partículas. La galaxia es donde este estilo tiene que lucirse.
  - Coste: ≤ 3 s por fotograma.

## Probar y entregar

```
node estilos/herramientas/capturar.mjs atomo/plato/escenas/cosmos-<estilo>.html 0,1.3,2.1,3.5,5.8,7.1,8.5,9.8,11.5 --formato 16:9 --salida <carpeta>
python3 atomo/herramientas/guias-humano.py <captura en t=0> <x_centro> <y_coronilla> <y_suela>
```

- Comprueba que no hay errores en la página y que cada golpe cae en su marca.
- Mide el coste por fotograma.
- Entrega:
  - las rutas de las escenas;
  - una hoja de contacto (`montage`) de la escena cósmica;
  - la persona con las guías de proporciones, antes y después;
  - el coste medido.
- No toques escenas ni kits de otros estilos.
- No hagas commit.
