# Plastilina adulta: la misma plastilina, sin que parezca un programa infantil

La plastilina es el estilo base del canal. Al verla en las dos pruebas, la reacción fue «me gusta, pero es ligeramente infantil». El estilo se queda; hay que hacerlo más adulto. Se hace con una prueba A/B: las dos escenas de plastilina rehechas en versión adulta, para verlas junto a las de ahora.

- **Escenas nuevas:**
  - `atomo/plato/escenas/prueba-plastilina-adulta.html`: el guion de `ENCARGO.md`, de la persona al pelo.
  - `atomo/plato/escenas/cosmos-plastilina-adulta.html`: el guion de `ENCARGO-COSMOS.md`, de la persona a la Vía Láctea.
- **Carga:** `escena('prueba-plastilina-adulta', 'prueba')` y `escena('cosmos-plastilina-adulta', 'cosmos')`. Sus marcas ya están en `marcas-prueba.json` y `marcas-cosmos.json`.
- **Kits:** copia los de plastilina a `kits/plastilina-adulta.js`. No toques `prueba-plastilina.html`, `cosmos-plastilina.html` ni sus kits: son la versión A.
- **Igual que la versión A:** guion visual, marcas, encuadres, regla, `HUMANO.md` y todas las reglas del encargo (sin palabras, determinista, coste ≤ 5 s por fotograma dibujado, `paso: 1/12`).

## Qué la hace infantil ahora, y qué cambiar

La referencia es el stop-motion para adultos: Laika (*Coraline*, *Kubo*), Wes Anderson (*Fantastic Mr. Fox*, *Isle of Dogs*), *Mary and Max* o el *Pinocchio* de del Toro. La sensación que buscamos es la de una maqueta fotografiada en un plató de cine, no la de un juguete.

1. **Paleta.** Ahora es saturada y de colores de juguete: jersey naranja, órbitas verde menta con bolas amarillas, fondo lila y galaxia rosa.
   - Pasa a colores terrosos y apagados: ocres, arcillas, verdes oliva, azules pizarra, crema.
   - Un solo color de acento, el terracota o ámbar de Atom y de la marca de la regla.
   - Negros profundos y blancos que no queman.
   - El cielo y el espacio van en azul noche o carbón, nunca lila.
   - La galaxia lleva colores reales: núcleo cálido y brazos azulados con polvo oscuro.
2. **Luz.** Ahora es plana y suave, de programa infantil.
   - Pasa a luz de cine: una luz principal cálida y lateral, un contraluz frío que recorta las siluetas, sombras con densidad y una caída a negro en los bordes (viñeta).
   - Profundidad de campo corta, de objetivo macro, para que se lea como una maqueta pequeña fotografiada de verdad.
3. **Materiales.**
   - Mantén las huellas dactilares y las marcas de herramienta, pero más finas.
   - Menos brillo plástico, algo de polvo y fibras, y un poco de translucidez en la piel y en el Sol.
   - Grano de película suave.
4. **La persona.** Ahora es un muñeco sonriente con mofletes rosas, ojos de punto y jersey naranja.
   - Pasa a ser un adulto sereno: cara con párpados, cejas y una expresión neutra o curiosa, sin sonrisa fija ni mofletes.
   - Ropa de colores apagados, como un jersey de punto gris o mostaza oscuro y pantalón de tela.
   - Las proporciones de `HUMANO.md` no cambian.
5. **Atom.** Es el mismo personaje (núcleo y tres electrones en órbitas inclinadas), pero más refinado:
   - núcleo de arcillas terracota y crema;
   - órbitas de alambre fino o de plastilina oscura, no tubos gruesos de color menta;
   - electrones pequeños de color ámbar;
   - un brillo leve que late con `E.energia(t)`.

   Tiene que seguir reconociéndose de un vistazo.
6. **La regla.** Ahora es de cartulina con números gruesos de dibujos animados.
   - Pasa a ser una regla de madera o de latón modelada en plastilina, con los números grabados o pintados con una tipografía sobria (Google Fonts).
   - La potencia actual sigue viéndose grande en el móvil.
7. **Movimiento.**
   - Menos botes y rebotes.
   - El movimiento tiene peso, con aceleración y frenado suaves.
   - La cámara se mueve como un rig de control de movimiento, no a saltos de dibujo animado.
   - Los golpes de zoom siguen ahí, pero más secos y menos elásticos.
8. **Los puntos flojos de la versión A, que hay que arreglar aquí:**
   - **Ciudad (10³–10⁵):** era una cuadrícula uniforme. Haz una ciudad orgánica, con calles irregulares, un río y parques, en paleta apagada.
   - **Sistema solar (10¹³):** quedaba pequeño y vacío.
   - **Bulbo de la galaxia:** tenía forma de limón.

## Probar y entregar

- Captura las dos escenas con sus listas de tiempos (`ENCARGO.md` y `ENCARGO-COSMOS.md`).
- Comprueba las marcas y que no hay errores en la página, y pasa `guias-humano.py` sobre la persona.
- Entrega:
  - las rutas;
  - dos hojas de contacto en las que cada fotograma salga junto al mismo instante de la versión A;
  - el coste por fotograma;
  - los puntos flojos.
- No hagas commit.
