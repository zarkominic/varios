# Prueba de identidad visual: los mismos 12 s en varios estilos

Queremos elegir la identidad visual del canal. Para compararlas bien, todas las versiones cuentan exactamente lo mismo, al mismo tiempo y con la misma voz. Cada una es una escena del plató: `atomo/plato/escenas/prueba-<estilo>.html`.

Valen todas las reglas de `atomo/plato/CONTRATO.md`; aquí se recuerdan las importantes. La única diferencia con el contrato es cómo se carga la escena: `escena('prueba-<estilo>', 'prueba')`, con el segundo argumento `'prueba'`, para que lea `marcas-prueba.json`.

## La voz y sus marcas (inglés, 12,07 s)

«Hi, I'm Atom, one of the tiny building blocks of everything, and I explain what school didn't teach you. · Four jumps down, and you reach the thickness of a hair. · A tenth of a millimeter.»

| marca | s | palabra |
|---|---|---|
| `hola` | 0,50 | Hi |
| `atom` | 1,26 | Atom |
| `bloques` | 2,58 | building (blocks) |
| `explico` | 4,60 | explain |
| `escuela` | 5,38 | school |
| `saltos` | 7,27 | jumps |
| `pelo` | 9,61 | hair |
| `decima` | 10,39 | tenth |
| `milimetro` | 10,83 | millimeter |

Lee los tiempos siempre con `E.marca('pelo')` y nunca los escribas a mano. Cada marca tiene su `<nombre>_fin`. La voz va de 0,5 s a 11,47 s, y de ahí hasta 12,07 s todo debe quedar quieto.

## Guion visual (igual en todos los estilos)

1. **0 – 0,5 s, ya compuesto en t=0:**
   - Una persona sencilla, de pie, a la izquierda del centro.
   - A la derecha, una regla vertical de potencias de diez con un marcador en «10⁰ m».
   - Atom, el narrador, flota junto al hombro de la persona.
2. **`hola`:** Atom saluda con un pequeño bote, o con un electrón que hace de mano si el estilo lo permite.
3. **`atom`:** Atom se presenta. Crece un poco, brilla y sus electrones aceleran. Es el momento de la identidad.
4. **`bloques`:** junto a Atom encajan otros átomos y forman una pequeña molécula o red: «soy una pieza de todo».
5. **`explico` / `escuela`:** aparece una pizarrita con una «?», que se convierte en «!» en `escuela`. No lleva palabras.
6. **`saltos` → `pelo`:** la cámara se zambulle en cuatro saltos ×10, uno detrás de otro, con un golpe de zoom cada uno.
   - Saltos: persona → mano → piel con vello → un pelo.
   - El marcador de la regla baja 10⁰ → 10⁻¹ → 10⁻² → 10⁻³ → 10⁻⁴ m.
   - El primer salto empieza en `saltos` y el cuarto termina justo en `pelo`, con los saltos repartidos entre las dos marcas.
7. **`pelo`:** un pelo llena el plano en vertical como un tronco grueso, con textura de cutícula, y Atom se ve diminuto a su lado.
8. **`decima` → `milimetro`:** una cota de lado a lado del pelo con el rótulo «10⁻⁴ m», completa en `milimetro`.
9. **Hasta el final:** todo se asienta y queda quieto.

## Reglas

- **Sin palabras en pantalla.** Solo números con potencias de diez («10⁻⁴ m», «10⁰ m»), «?» y «!». Nada de «0,1 mm» ni «0.1 mm»: el separador decimal cambia con el idioma.
- **Atom es siempre el mismo personaje en todos los estilos:** núcleo y tres electrones en órbitas inclinadas, dibujado en el estilo de la escena. Late con `E.energia(t)`.
- **16:9:** lo importante va dentro de x 100–1820 e y 60–1020, y nada clave por debajo de y≈880.
- **Recursos:** solo Google Fonts y three.js 0.170.0, con el import map de los demos. Nada más.
- **Determinista:** `dibujar(t)` pinta exactamente el instante t y todo el azar lleva semilla.
- **Coste:** ≤ 1 s por fotograma, salvo plastilina, que puede llegar a ≤ 5 s por fotograma dibujado. Los estilos stop-motion (papel, plastilina, mixta) usan `paso: 1/12`.
- **Material de partida:**
  - El demo aprobado de cada estilo en `estilos/` (`06-recortes-papel`, `08-isometrico`, `10-arcilla-3d`, `12-comic`, `14-dibujo-a-mano`, `16-fisica`, `17-pixel-art`, `19-art-deco`).
  - Para papel, isométrico y plastilina, los kits de `atomo/plato/kits/`.
  - Puedes reutilizar su código.
- **Calidad:** a la altura del demo de su estilo. Es una prueba para enamorar, no un boceto.

## Probar y entregar

```
node estilos/herramientas/capturar.mjs atomo/plato/escenas/prueba-<estilo>.html 0,1.3,2.8,5.5,7.6,8.4,9.7,11,12 --formato 16:9 --salida <carpeta>
```

- Captura sin `?captura` para ver la escena en bucle. Comprueba que no hay errores en la página y que cada golpe cae en su marca.
- Mide el coste por fotograma.
- Entrega la ruta de la escena, una hoja de contacto (`montage`) y el coste medido.
- No toques escenas que no sean tuyas ni los kits que usan otras escenas. Si necesitas cambiar un kit, cópialo.
- No hagas commit.
