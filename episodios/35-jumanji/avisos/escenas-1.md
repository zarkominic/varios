## grupo 1 ['jm-gancho', 'jm-hola']
RESUMEN:
Módulo: /home/user/varios/episodios/35-jumanji/borrador-escenas/escenas1.py (generado en /home/user/varios/atomo/plato/escenas/_tmp_S1/). Medidas: gancho 5,8 / 4,2 / 5,7 / 5,2 / 3,5 / 3,5 / 3,6 s; hola 5,9 s. 6 cortes bien, hojas «sin errores en la página», «barrido sin errores».

JM-GANCHO (7 planos, reparto obligatorio, sin cartela; año 1981 → 2026 → 1979 → 1995):
- p1 taller/palabras (0–5,84): la mano escribe y tacha garabatos (intentos 0,42 → jDesde−0,03: la J no sale); en «anything» cae una nota amarilla con «?» rojo; en «sculptor» la mano baja y le da dos golpecitos. Corta en «for».
- p2 casaJuego/salon (–10,02): la lámina a lápiz; pestaña «32» en «thirty-two»; el rinoceronte se dibuja hasta «book» y resopla en «black and white». Corta en «Out».
- p3 cine/contador (–15,7): sube girando y se clava en 2027 en «billion» (onda, destellos, sigue la lluvia de monedas). Corta en el silencio tras «office».
- p4 taller/casa/mesa (–20,88): la mano dibuja el salón (dibujo 0,3 → 0,92) con lápiz negro; vaho desde abajo; tirita en «too cold».
- p5 editorial/esquinas/esquina (–24,4): el perro asoma el hocico en «white dog», se esconde y en «sneaks» se cuela; caen hojas del seto.
- p6 keene/calle/esquina (–27,92): el pintor llega con la esponja; tres vecinos se plantan y en «refused» levantan los brazos («!»); en «erase» el pintor la baja.
- p7 keene/efectos (–fin): corta en «lion»; un técnico señala la pantalla grande; desde «hair by hair» crece la melena (pelo hasta 0,85, sin punta: es de jm-pelo).
14 efectos en 31,5 s.

JM-HOLA (1 plano, hoy/estudio, 2026): Atom baja con los dados colgando, bota en «I'm Atom», los agita en «explain» y los tira (arco, dos botes, quedan 5 y 3); desde «always» baja la liana, en «about» engancha el lápiz, lo sube ante la ventana y se lo lleva; Atom da un respingo («!») y en «Let's find out» vuelve a su esquina. 5 efectos.

AVISOS:
SIN MIRAR EN LA HOJA FINAL: las tres hojas finales se regeneraron tras los últimos retoques y no las volví a abrir. Esos retoques (resoplido del rinoceronte en p2, lápiz colgado de la liana en hola) solo los vi en recortes de captura (gancho t=9,3; hola t=4,0 y 4,5). El resto de planos lo vi en la hoja anterior, idéntica salvo eso. No comprobado en imagen: el giro de vecino1JM al andar en p6 y las caras fijas de los dados colgados en hola.

DURACIONES: p5, p6 y p7 del gancho duran 3,5 / 3,5 / 3,6 s (por debajo de 4 s, sin marca «<»). El reparto pide cuatro planos en los 13,6 s de la frase 2; p4 empieza en el silencio tras «office» (15,7) y p5 entra 0,5 s antes de «a white dog».

NO ES FALLO DE DECORADO, pero conviene saberlo:
- editorial esquinas/esquina: con o.asoma 0,22 no se veía nada; el hocico se ve con 0,62 (no probé valores intermedios).
- El golpe «palabra» lo pone banda.cjs en la marca (0,5 s, al empezar la voz), no cuando el contador llega a 2027: allí va el efecto «campana».

DESVÍOS DEL ENCARGO:
- p4: vaho local (vahoGrande, tramado) en lugar de T.a_vaho. No probé T.a_vaho en pantalla: es una bocanada de 4 px de radio hecha para un chibi de perfil y el plano es cenital. Sale abajo a la izquierda (x ≈ 90–125, y 135–180); es discreto.
- p1 y p4: mano canónica sola (T.mano sinManga) con T.g_lapizGrande y sombra tramada, sin brazo. El primer intento con T.brazo dejaba 100–145 px de manga a la vista.
- p2: sin mano (la del lápiz es de jm-libro p6).
- hola: R.companero = () => {} y Atom pintado por la escena (patrón de nx-hola); acaba en (297, 24).

PIEZAS PINTADAS EN LA ESCENA: nota con «?» (p1), pestaña «32» y resoplido (p2), onda y destellos (p3), lápiz y migas en el margen (p5), bocadillos «!» (p6, hola), tirada de dados y halo del lápiz (hola). Sin fondos locales. Sin vistas nuevas: no añadí líneas a encuadres-ep35.md.

POSICIONES DE LAS QUE DEPENDO:
- palabras: g.punta y g.jDesde; nota en x 89–131, y 127–165.
- salon: rinoceronte centro 110, morro ≈ (157, 143).
- contador: ventanillas x 78–250, y 56–116; centro (158, 87).
- casa/mesa: g.punta.
- esquinas/esquina: margen libre x 252–319.
- calle/esquina: suelo 156–160; vecinos en x 112/138/164, pintor en 196.
- efectos: puestos (112, 145) y (208, 145).
- estudio: dados [125, 130], lápiz [187, 128], ancla de la liana [187, 5]; Atom en reposo (118, 80).

EFECTOS: no he oído «aviso» (p6, en «refused») ni «maquina» (p3); si desentonan, «pop» y «tecleo».

## grupo 2 ['jm-escultor', 'jm-perro']
RESUMEN:
Módulo: /home/user/varios/episodios/35-jumanji/borrador-escenas/escenas2.py (generado en atomo/plato/escenas/_tmp_S2/). Duraciones 3,7–6,2 s, fundidos bien, hojas «sin errores en la página», «barrido sin errores».

JM-ESCULTOR (cartela 1979 + 8 planos; 18 efectos en 38 s)
1. mapa (hasta «and» 6,55): sale «1949» y una mano clava la chincheta en Michigan en «Grand Rapids».
2. taller de día (corta en «moved»): deja un libro en el suelo, se sube a él («no plans to make books») y talla con el mazo en «studied sculpture».
3. EXTRA costa (corta en «he was making»): la furgoneta de mudanza llega a Providence por la línea de puntos, cae la chincheta en «Rhode Island» y sale «1979» en «late 70s».
4. clase (hasta fin de frase): entra con una escultura, la posa en la tarima en «teaching» y explica; una alumna levanta la mano.
5. banco (corta en «drew»): talla, o.frio sube, el radiador y el termómetro (pintados por la escena) se apagan en «went off», tirita con vaho y se va en «so he went home».
6. EXTRA su dibujo a lápiz, nuestra cocina (corta en «His wife»): la mano sombrea y se retira; en «where something…» la puerta se entorna y sale rodando una bola.
7. casa de noche (corta en «and she showed»): Lisa entra, los dibujos de la pared se encienden uno a uno en «thought», él le da una hoja.
8. pasillo de editoriales: Lisa con la carpeta llama a dos puertas y sigue; una señora con papeles cruza.

JM-PERRO (5 planos; 12 efectos en 24 s)
1. despacho (corta en «told him»): Lisa pasa un dibujo sobre la mesa; Lorraine lo levanta y se asombra en «drawings»; el autor espera.
2. mesa desde arriba (corta en «It came out»): salen los dibujos; la mano del editor tiende la pluma en «write», la del autor la coge y escribe rayas en «So he did».
3. lámina 1979 (corta en «a white»): el perro entra, se sienta, huye en «and it was about»; el niño lo persigue; el perro se para y mira atrás en «mischievous».
4. EXTRA verja (corta en «Ever since»): el perro se sienta en «Fritz», se cuela en «into», destellos; el niño llega tarde, «?».
5. esquinas, gag 2: se cercan los cuatro perritos en «hidden / somewhere / every / books»; la lupa sube por abajo para los dos últimos; el año corre de 1979 a 2026.

AVISOS:
TRES PLANOS EXTRA fuera del reparto, apuntados en el Registro de encuadres-ep35.md. Sin ellos mapa, casa y libro1979 duraban 9–10 s o la ruta iba 5 s por delante de la voz. El archivo de encuadres no trae lista de vistas LIBRES: elegí vistas con 0 o 1 uso y no vecinas.
- jm-escultor p3: taller/mapa/costa (0 usos).
- jm-escultor p6: casaJuego/cocina/general sin monos (segundo uso; el otro es jm-libro p3). taller/casa/mesa ya tenía 2 usos.
- jm-perro p4: editorial/libro1979/verja (0 usos).

CAMBIOS RESPECTO AL REPARTO
- jm-escultor p1 va con ruta: 0: la llegada a Rhode Island se cuenta en la costa, cuando la voz lo dice.
- «Lisa mira un dibujo» ocupa todo el plano de casa; él dibujando «de noche» se cuenta en el plano extra de la cocina a lápiz.

AÑOS
- jm-escultor: 1949 en el mapa, 1972 en el taller (elegido por mí; no está en el guion), sube a 1979 en la costa.
- jm-perro p5: la barra corre de 1979 a 2026 («ever since»); la escena siguiente vuelve atrás. Si se prefiere fijo en 1979, es la opción año de T.rodar.

PINTADO POR LA ESCENA (ningún fondo local entero)
- jm-escultor p5: radiador (x 3–53, y 98–127), termómetro (x 51–61, y 58–96) y vaho reforzado: T.a_vaho solo apenas se veía.
- jm-escultor p6: la rendija de la puerta de la cocina (x 285–291, y 61–123), la cuña de luz y la bola.
- jm-perro p2: la pluma la pinta la escena (copia de b_pluma) y la del decorado se manda fuera con pluma: [400, 150], para dibujar la hoja en blanco (x 167–229, y 145–175) debajo.
- jm-perro p5: sin brazo en la lupa (serían ~80 px); entra por el borde de abajo con el mango fuera de cuadro.

PIEZAS QUE ECHÉ DE MENOS: un mazo, un libro de canto, una hoja suelta pequeña, una furgoneta de mapa, y carpetaJM tumbada o más pequeña (29×23 es más ancha que el chibi; Lisa la lleva medio tapada o apoyada en el suelo).

POSICIONES DE LAS QUE DEPENDO
- taller general: suelo 152, peana de la casa x 237–259. banco: suelo 134, punto de talla (215, 110), ventana x 0–46. clase: suelo 156–158, tarima y 128. casa: silla [136, 156], tablero [158, 141], dibujos de pared de A.md.
- mapa: g.michigan; costa: g.providence, recorte [24, 18, 296, 166].
- casaJuego cocina: puerta x 284–316, y 60–124; suelo 154.
- editorial: pasillo suelo 152, puertas en x 70 y 154; despacho suelo 158, sueloDetras 144, Lorraine en x 206; libro1979 suelo 140; verja suelo 158, hueco hacia x 148–152; esquinas, perros [130, 161] y [166, 162].

SIN COMPROBAR
- Reparto ajeno: EL.chica (alumna), EL.senora75 (pasillo) y EL.nino77 (el niño del libro) llevan respaldo con ??; no comprobé cuál de los dos pinta.
- No oí los efectos; todos son recetas de NIVEL.
- En la verja el perro pasa a o.perro (tras los barrotes) al colarse: en la hoja se lee, pero queda junto a la hoja derecha de la verja.

## grupo 3 ['jm-pregunta', 'jm-libro']
RESUMEN:
Módulo: /home/user/varios/episodios/35-jumanji/borrador-escenas/escenas3.py (generado en atomo/plato/escenas/_tmp_S3). Medidas: jm-pregunta 5,8 · 4,0 · 7,1 · 7,2 · 7,1 · 5,8 s (más la cartela); jm-libro 6,6 · 3,8 · 3,6 · 3,7 · 4,9 · 6,8 · 3,6 · 3,6 · 3,5 s. Sin «!» ni «<», 14 fundidos bien, --comprobar sin sospechas, barrido sin errores.

JM-PREGUNTA (cartela 1981; año 1957 en p1–p2, 1981 después)
1. cocina50: el niño llega, se sienta tras la mesa, mira el reloj, mueve la ficha y bosteza estirándose.
2. billete (corta en «You moved»): la ficha azul salta, la mano coge el billete en «won», lo suelta, «X» roja en «real» y la ficha se desinfla con una nubecilla (gag 3).
3. meta a lápiz (corta en «So»): «?», la mano tira dos dados, el disco se empaña y brota una hoja verde en color; mariposa.
4. mesa (corta en «He picked»): la mano con la barrita dibuja el salón y, en «wild animals», el rinoceronte; polvo y difuminado.
5. papelera (corta en «And he needed»): tres bolas en «name», «far away», «English»; «!» en «jungle» y corre a la mesa.
6. libreta (corta en «Maybe»): tacha, duda, J en «with a J», rayas y círculo en «Jumanji».

JM-LIBRO (1981, lámina en grises)
1. parque/árbol: Judy y Peter llegan; «!» en «find»; ella toca la caja.
2. piano (corta en «Every»): tiran los dados, el león se dibuja y toca una nota (gag 4).
3. cocina (corta tras «piano»): monos de uno en uno, plátano, relámpago y lluvia en «monsoon».
4. pasillo (corta en «a stampede»): monzón, paraguas rojo que se vuelve, estampida por delante; «!» en el jarrón.
5. tablero (corta en «until»): la ficha llega, la meta se enciende en color y se traga los restos; el color se va en «black and white».
6. salón (corta en «pencil»): la mano dibuja el rinoceronte, difumina; destello en «photographs»; aparece el león.
7. parque (corta en «And he ended»): dejan la caja y se van.
8. ventana (corta en «park»): dos chicos se la llevan; Peter señala.
9. folleto (corta en «carry it off»): pasan las zapatillas, cae una hoja, «!».

AVISOS:
FALLO DECORADO: casaJuego 'ventana/general': los chicos (8–14 px, en gris y tras los reflejos) no se leen. La escena pinta encima dos figuritas en color con una copia de la senda ([[92,128]…[226,92]], retraso 0,07, alto 14→8); si el decorado cambia la senda, se descuadran.
FALLO DECORADO: cifras del año casi invisibles sobre fondo claro: casaJuego 'cocina50' (general y billete) y las láminas claras (piano, cocina, salón, folleto).
FALLO DECORADO (menor): casaJuego 'salon/general': o.rino 0–1 es un fundido de transparencia, no un dibujo que se llena; la mano «dibuja» sobre un rinoceronte que aparece entero.

Piezas que eché de menos:
- 'cocina50/billete': el billete es fijo, no se puede traer ni mover; el gag va con la mano, la «X» y la ficha.
- No hay receta de piano: la nota del león suena con «brillo».
- La estampida suena con «boom» y el relámpago con «trueno»; no los he oído.
- Pintados por la escena: el monzón (cocina y pasillo), el paraguas, la caja gris que llevan, los restos de selva del tablero, la corchea grande y la ficha azul desde arriba.

Decisiones que conviene revisar:
- La lluvia empieza en la cocina en «monsoon»: el corte al pasillo no se puede adelantar sin dejar la cocina por debajo de 3,5 s.
- El tablero (libro p5) aguanta hasta «pencil» para que la enumeración quepa en planos de 3,5 s o más; lleva el único acento de color de la escena.
- El año 1957 de pregunta p1–p2 es un supuesto: el guion solo dice «años cincuenta».
- En mi línea del registro de encuadres, pregunta p1 menciona un sol que se arrastra por el suelo: lo quité porque no se veía.
- Tres planos de jm-pregunta van a 7,1–7,2 s, al límite.

Posiciones de las que dependo:
- cocina50: niño tras la mesa en x 180, suelo 148; ficha roja en 138 + 12·mueve.
- billete: mano en (190, 132); casillas de abajo en y ≈ 157.
- gema: centro (160, 96).
- mesa: g.punta y rinoDesde; platillo (262, 92).
- papelera: o.desde [124, 124], boca (205, 122), actor en x 104.
- palabras: g.punta y jDesde.
- parque/árbol: suelo 164, caja desde x 139.
- piano: hueco x 10–54, nota desde (251, 114).
- cocina: suelo 154, libres x 212–280.
- pasillo: suelo 150, jarrón (208, 93).
- tablero: g.gema.
- salón: rinoceronte en x 70–156, y 118–160; león sobre el piano.
- parque: caja en (190, 153).
- ventana: banco y 135, hueco 76–244 × 28–132.
- folleto: x 98–222, y 94–148.