## grupo 4 ['jm-medalla', 'jm-historia']
RESUMEN:
JM-MEDALLA (33,6 s; 6 planos: 5,4 / 6,8 / 6,3 / 5,9 / 4,1 / 5,0; año 1981→1982→1986→1983):
p1 premios/general: Van Allsburg cruza el escenario; la bibliotecaria del jurado habla en el atril y, con «1982», sale con la medalla; aplausos, confeti, salto. Corta en «Caldecott».
p2 premios/medalla: la medalla se posa («Medal»), tres estrellas («most important award»), destello; con «Four years later» el calendario pasa a 1986 y entra el segundo libro. Corta en «won (it again)».
p3 esquinas/general: una mano lleva la lupa al tren («a train»; nieva y hay vapor en la lámina) y, con «Christmas Eve», a la esquina: el perro y un «!» (gag 2). Corta en «and the word».
p4 carta/general: la señora lee junto a la nevera y del libro brota una hojita («a life of its own»); va a la mesa, deja libro y carta y escribe; bocadillo con «?». Corta en «and wanted».
p5 carta/sobre: la mano con la pluma entra, duda y traza el «?» («what Jumanji meant»), con su punto. Corta en «The answer».
p6 tablero/gema: un «?» dorado que se deshace con «nothing»; el disco se empaña, sale la hoja y con «jungle» vuelve el color, baja una liana y brotan hojas.

JM-HISTORIA (23,8 s; cartela 1995 de 1,3 s + 5 planos: 4,7 / 3,6 / 5,5 / 4,5 / 4,1):
p1 clase/caballete (AÑADIDO, vista libre): una mano dibuja una claqueta a lápiz; el número cuenta 1→14 a la vez que la barra (1981→1995) y la claqueta se cierra («14 years»); «!» («a problem»); la mano clava el libro fino: 32. Corta en «takes».
p2 guionistas/relojes: el guionista señala el reloj de 10, se vuelve al de 100 y salta la película que le pasa por los pies. Corta en «Almost».
p3 guionistas/general (1994): fichas al corcho, uno teclea, la otra encesta una bola; entra Van Allsburg con una hoja y la lanza: última ficha. Corta en «Alan».
p4 tablero/general en color (1969): el chico llega, mueve la ficha («A boy»), la meta se enciende y se lo traga en espiral («swallows… 1969»); queda una hoja de selva. Corta en «gives back».
p5 calendario/general: 26 hojas, 1969→1995 (barra y taco a la par); la caja de la repisa tiembla y lo devuelve adulto («26 years later»).

AVISOS:
ESTADO: módulo /home/user/varios/episodios/35-jumanji/borrador-escenas/escenas4.py terminado; generado en /home/user/varios/atomo/plato/escenas/_tmp_S4/. Medidas sin «!» ni «<» (salvo la cartela de 1,3 s), 5+5 cortes bien, hojas «sin errores en la página», «barrido sin errores». Sin commits.

SIN MIRAR: las hojas finales jm-medalla-2 (p6) y jm-historia-1/-2 no las abrí tras los últimos cambios; esos planos los vi en capturas sueltas intermedias (carpeta esc_S4/cap). No vi en imagen el «!» recolocado del caballete (historia p1) ni el confeti corregido de medalla p1.

PLANO AÑADIDO: jm-historia p1 no estaba en el reparto. La oración de 1,5–9,6 s daba un plano de 8,3 s; usé la vista libre taller/clase/caballete (primera vez en el episodio) y lo apunté en el Registro. La claqueta a lápiz, los números 14 y 32, el «!» y el libro los pinta la escena sobre la lámina en blanco (trazo: 0).

REPARTO (piezas que eché de menos):
- No hay «Alan»: el chico es EL.chico1JM y el adulto EL.tecnicoFX2JM, los dos con la misma paleta propia (gorra amarilla, jersey naranja) para que se lean como una persona nueva y no como el chico de jm-libro ni el técnico de jm-pelo.
- No hay presentador: quien entrega la medalla es EL.guionista2JM con paleta cambiada (pelo gris, rebeca granate).
- El remolino pinta al actor en un búfer propio (R.nuevo, con prev = R.usar) y lo gira y encoge.

AÑO: en medalla la barra vuelve de 1986 a 1983 en p4 («a couple of years later» tras 1981); en historia p3 marca 1994 con cartela 1995.

FALLO DECORADO: editorial premios/medalla: la medalla baja sola, sin mano ni cinta que la sujete (lo dejé con caída rápida).
FALLO DECORADO: editorial carta/general: quien está tras la mesa (sueloDetras 146) asoma solo la cabeza.

POSICIONES DE LAS QUE DEPENDO (si el decorado las mueve, se desincroniza):
- premios: suelo 121, atril x 93–116, Van Allsburg x 60→136.
- medalla: estrellas en x 84/112/140, y 60; fórmula del calendario 1982 + min(4, floor(segunda·8)) copiada para la barra.
- esquinas: lámina del tren x 29–78, y 33–87; tren [52,62]; perro [73,83]; mango de la lupa a (+28,+25) del centro.
- carta/general: con carta: false; señora de (258,160) a (134,146); mi carta x 150–162 y libro x 165–190, y 134–140, pintados tras Delante; gato (300,162).
- carta/sobre: trazado del «?» copiado de b_interrogacion (centro 154,98, escala 1,5; punto en 157,116).
- gema: centro (160,96); lianas x 196 y 228.
- caballete: lámina x 118–250, y 22–128.
- relojes: suelo 162, guionista x 152.
- guionistas: g.puestos y g.ficha (reserva [221,81]); papelera (268,136).
- tablero: g.gema; chico en (246,93).
- calendario: caja (62,90); adulto en x 82, suelo 164; año = 1969 + floor(u·26), igual que el decorado.

## grupo 5 ['jm-keene', 'jm-pelo', 'jm-estreno']
RESUMEN:
Módulo: /home/user/varios/episodios/35-jumanji/borrador-escenas/escenas5.py (generado en atomo/plato/escenas/_tmp_S5). Duraciones: keene 3.5/3.9/6.2; pelo 3.9/4.3/7.1/6.5; estreno 3.7/3.6/4.0/6.3/5.7/4.2. Fundidos bien, hojas «sin errores en la página», «barrido sin errores».

jm-keene (año 1994):
- p1 plato: Williams entra con el guion, se enciende el foco en «Robin», el director aplaude y él saluda con el guion en alto.
- p2 calle con rodaje (corta en «they chose a real one»): vecinos señalan, campana y pájaros en «Keene», el pintor cruza con escalera y bote.
- p3 pared (corta en «they painted»): el pintor pinta el zapato desde el andamio (0,85 en «shoe»), «?» de un vecino en «didn't exist», aplausos.

jm-pelo (1995):
- p1 efectos: la pantalla grande se enciende a 0,5 s con el león pelado y da error; un técnico trae un peluche, el otro responde «X».
- p2 cámara (corta en «almost nobody»): cierra la claqueta, una mano mete el peluche, lo menea en «believable» y se le dobla la cabeza en «computer».
- p3 pantalla (corta en «The effects crew»): ventana de código, la melena crece desde «grow»; gag 5: mechón de punta, el cursor lo aplasta y vuelve a saltar; monos en «and the monkeys».
- p4 sala (corta en «in Jumanji»): el león entra en la pantalla y ruge en «digital fur»; monos en lianas; madre e hijo pasmados en el pasillo.

jm-estreno (1995):
- p1 fachada: la cola crece, una familia llega con vaho y el chico salta.
- p2 público (corta en «lukewarm»): crítico con bocadillo de estrellas, bote del público en «It didn't matter», «$65».
- p3 contador (corta en «and took in»): 65 rueda y cae en 260 sobre la palabra; globo en «worldwide».
- p4 periódico (corta en «And some newspapers»): un lápiz rojo subraya la máscara en «Zulu», chispas en «effects», cae el folleto.
- p5 prensa (corta en «Robin Williams had»): «?» de los periodistas, Williams serio, bocadillo con isla en «island».
- p6 mapa (corta en «in the Caribbean»): un lápiz dibuja la isla en el mar, chincheta, avión y billetes en «book early».

AVISOS:
LO INCÓMODO PRIMERO
- SIN REVISAR A FONDO: las hojas finales pasan sin errores, pero tras los últimos retoques solo miré capturas sueltas (keene 2,9 y 6,0; estreno 15,2, 23,9 y 25,0), no las cuatro hojas enteras otra vez.
- VISTA NUEVA: estreno p6. La oración de Williams dura 9,9 s y pedía un sexto plano; el archivo de encuadres NO trae la lista de vistas LIBRES. Usé T.mapa(zoom 2.6, centro [-76, 24], rosa [40, 78]) y lo apunté como «mapa/caribe». «fondo local parcial: jm-estreno plano 6»: el mapa solo trae Florida, así que la escena pinta Cuba, Bahamas, La Española y Jamaica con P().
- EL PELUCHE TIENE CARA (ojos de botón y nariz), contra la regla de «los objetos no llevan cara». Lo dejé porque es un muñeco de animal y sin cara no se lee; que decida el orquestador.
- GOLPE «pelo»: en banda.cjs cae en la marca, a 0,5 s de la escena (arranque de la frase), no en la melena. Lo acompaño en p1 con el encendido de la pantalla; el gag del mechón va en «which is why» (≈13,1 s).
- Cortes que no caen en frase: ningún reparto exacto dejaba todos los planos ≥ 3,5 s. Keene p1 mide 3,5 s; estreno p1 corta en «lukewarm» y el «$65» se dice sobre p2 (p3 abre ya en 65). Pelo p3 mide 7,1 s (bajo el límite de 7,2).
- Keene lleva año 1994 (el rodaje) entre dos escenas de 1995.

FALLOS DE DECORADO
- FALLO DECORADO: cine sala/general: 'selva' no deja quitar el tablero ni el dado que bota; pelo p4 repinta todo el rectángulo de la pantalla (fondo local dentro de la pantalla).
- FALLO DECORADO: cine sala/publico: el pulgar de los críticos no se lee a 640 px; añadí un crítico de pie con estrellas.
- keene pared/general con lavable: el zapato pálido se lee como silueta, justo.
- R.poligono no pinta su última fila: cuidado al tapar por bandas.

OTROS
- T.cineDelante se llama otra vez tras los actores en fachada, sala y prensa (cine() ya lo pinta una vez); no se nota doble.
- Brazos: siempre T.brazo; el de estreno p4 entra por abajo y el de p6 por la derecha.
- Efectos: keene 7, pelo 14, estreno 18.

POSICIONES DE LAS QUE DEPENDO
- plato: suelo 150, actores x 92–262.
- calle con rodaje: suelo 134, x 122–318; iglesia (222, 27).
- pared: g.andamio.x/y, g.xPinta; acera 160–162.
- efectos: suelo 145, puestos x 104 y 208; pantallaGrande.
- cámara: peluche x 256–295, y 62–100, sobre la claqueta.
- pantalla: g.pantalla, g.nuca, g.coronilla, g.punta; ventana de código x 200–272, y 46–100.
- sala: pantalla [62, 28, 258, 96], pasillo suelo 153.
- fachada: acera 153–155. Público: suelo 172. Prensa: suelo 142, Williams x 120, moderadora x 186.
- contador: globo en (160, 157).
- periódico: foto x 74–150; subrayado y 119.
- mapa: isla en (244, 78).

## grupo 6 ['jm-espacio', 'jm-velas']
RESUMEN:
Las dos escenas están generadas en atomo/plato/escenas/_tmp_S6/ desde /home/user/varios/episodios/35-jumanji/borrador-escenas/escenas6.py. Medidas: planos de 3,7–6,1 s, cortes «bien», hojas «sin errores en la página», «barrido sin errores».

JM-ESPACIO (7 planos; 1996 → 2002 → 2005 → 2016):
1. cine tele (0–3,66; corta en «game»): dos niños tras el sofá miran la serie; uno llega corriendo y botan; notas del altavoz.
2. cine tele/tienda (→7,65 «The two boys»): la niña señala nuestra caja; el autor llega con el libro nuevo (tapa azul con cohete) y la etiqueta «2002».
3. selva espacio (→11,89 «and this time»): los dos chicos sobre el tablero de hojalata; uno tira las instrucciones, que se van flotando; el otro señala el cohetito.
4. EXTRA selva espacio/ventana (→16,43 «That book»): el planeta a rayas pasa por la ventana; los chicos corren y flotan.
5. cine fachada/taquilla 2005 (→21,81 «In theaters»): un solo cliente saca su entrada, mira atrás y «?»; paloma y hojas secas.
6. cine sala vacía (→26,9 «For more»): nuestra película en la pantalla; la balanza de latón se queda en el fiel con «=»; cola 3-2-1 y el espectador se va.
7. cine calendario/caja (→fin): crece el polvo, un ratón olisquea la caja y estornuda; el año corre a 2016.

JM-VELAS (5 planos; 1995 → 2014):
1. keene plató (0–3,71 «had been»): desmontaje: dos se llevan un bastidor, cajas, la ayudante con la lista; el pintor cruza con cubo y esponja.
2. keene calle/esquina (→9,59 «and the same»): gag 6: moja la esponja, frota la esquina del letrero, los vecinos lo paran («!» y corazón).
3. keene pared (→15,36 «on the night»): lo repasa con pintura buena (buena 0→1), el vecino sujeta el bote; baja el andamio y cae la tarde.
4. keene pared/pie (→21,46 «Over»): de noche, tres vecinos llegan con velas; se encienden hasta 12. Sobrio.
5. keene calle 2014 (→fin): ramos, notas de rayas y velas al pie de la zapatería; una vecina deja un ramo y un chaval pega su nota.

AVISOS:
SIN MIRAR: las hojas finales no las abrí tras la última tanda de arreglos (sí la de jm-velas de la ronda anterior). Los cambios los comprobé con capturas sueltas de jm-espacio p2, p4 y p5 y de jm-velas p2 y p3. Las capturas no cubren la escena de después (jm-nuevo); las vistas no chocan según el registro.

FALLO DECORADO (derechos, los dos repintados en la escena):
- cine 'sala/general' con pantalla 'espacio': pinta una casa flotante y un planeta con anillos. Pinto nuestra película encima, con recorte [64, 29, 256, 95].
- cine 'fachada/taquilla' epoca 2005: el cartel (casa y planeta con anillo) y el pictograma de la entrada (planeta con anillo). Repinto el cartel en [24, 66, 70, 128] y el pictograma en [124, 69, 141, 79].

VISTA AÑADIDA: jm-espacio p4 = selva 'espacio/ventana' (libre, primera vez en el episodio), porque la oración duraba 8,3 s. Apuntada en el registro, como los otros 11 planos.

DECISIONES QUE CONVIENE REVISAR:
- jm-velas p3 se alarga hasta «on the night» (la vista 'pie' habría durado 7,8 s): la voz dice «August 2014» sobre el atardecer de la pared y el año cambia a 2014 en el corte.
- jm-velas p5: en 'calle/general' no se ve la pared del letrero; las flores y las notas van al pie de la zapatería (x 118–176, y 105–137).
- Años elegidos (no había datos): 1996, 2002 desde «In 2002», 2005 desde el corte de la taquilla, 2005→2016 en la caja; 1995 y 2014.
- Reparto usado como extras, por si se quiere cambiar: judyJM y peterJM (niños de 1996), tecnicoFX1JM (la mayor en la tienda y uno de los que cargan el bastidor), tecnicoFX2JM (el cliente y espectador de 2005), nino2017JM (el chaval de 2014).
- jm-velas p3 repite vista con jm-keene p3 (segunda vez, no vecinas); cambian la puesta en escena y la luz.

PIEZAS QUE FALTABAN (pintadas en la escena): cohetito, planeta a rayas y bandeja de hojalata en pequeño, balanza de latón, paloma, ratón, bastidor, cajas de cartón, cubo, palo con esponja, notas.

POSICIONES DE LAS QUE DEPENDO:
- cine: tele (detrás del sofá, suelo 160, x 96–140); tienda (suelo 170, caja en 150, 104); taquilla (suelo 166, cliente en x 76, ranura); sala (suelo 152, pantalla x 62–258, y 28–96; balanza en 244, 152); caja (repisa y 121, borde derecho de la caja en x ≈ 211).
- selva: espacio g.pie; ventana (suelo 158, hueco 96–224).
- keene: plato (suelo 150 y primer término 172); esquina (suelo 156, g.letrero); pared (g.andamio, g.xBuena, andamio [214, y], apliques x 112 y 196); pie (suelo 153–156, el orden de g.velas); calle (suelo 134–136).

Sin commits míos (el HEAD ya trae una versión intermedia de escenas6.py que no hice yo).