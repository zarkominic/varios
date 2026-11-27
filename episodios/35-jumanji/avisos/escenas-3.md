## grupo 7 ['jm-nuevo', 'jm-taquilla']
RESUMEN:
Módulo: /home/user/varios/episodios/35-jumanji/borrador-escenas/escenas7.py (generado en atomo/plato/escenas/_tmp_S7). Medir: sin «!»; fundidos bien; hojas «sin errores en la página»; «barrido sin errores».

JM-NUEVO (38,3 s; cartela 2017; 7 planos, uno EXTRA):
1. cine/anuncio (0–5,2): la noticia; suben los pulgares abajo y se amontonan las burbujas. Corta en «Robin».
2. anuncio/vela (4,7 s): foto gris y velas; solo el cursor se aparta. Corta en «The writers».
3. keene/guionistas 2016 (6,3 s): caja con polvo en la mesa; uno sopla, el otro tose y «?»; pasa el chaval con el móvil. Corta en «what kid».
4. cine/salon 2017 (6,3 s): el chaval cruza con el móvil, le cae polvo del estante, mira («?») y sigue. Corta en «Nobody».
5. salon/estante (6,4 s): gag 7: tiembla, destello en «turns», cartucho en «cartridge»; polilla. Corta en «And».
6. EXTRA selva/claro (5,1 s): puerta de casa en la selva; el poste-flecha gira en «changes», las lianas se retiran, la puerta se cierra con candado. Corta en «Now».
7. selva/caida (4,2 s): cae el chaval, destello y otro cuerpo en «different body», tres corazones en «three lives».

JM-TAQUILLA (32,1 s; 6 planos):
1. cine/fachada 2017 rival (5,4 s): cola enorme de las estrellas; a la nuestra llega gente de 12 px. Corta en «But».
2. cine/calendario 2017→2018 (6,5 s): semanas tachadas, cae la hoja, fila de chibis con palomitas, contador de pared hasta 960. Corta antes de «In the jungle».
3. selva/cabana (3,8 s): la jugadora sube la escala y señala la tabla («!»). Corta en «carved».
4. cabana/tabla (4,8 s): una mano aparta el musgo y salen las rayas. Corta en «Two years».
5. sala/publico (4,6 s): entrada «2019» en una mano, público con gafas da un bote, contador 800. Corta en «Jumanji films».
6. contador/suma (6,9 s): 260+960+800 → 2027 con boom en «billion»; una mano deja el libro fino y el cronómetro marca «10».

AVISOS:
SIN MIRAR: las hojas de final/ no las he abierto. Vistos todos los planos en hojas anteriores (v2, v3) y los retoques posteriores en capturas sueltas. Único cambio sin ver: el polvo que cae en jm-nuevo p4, ahora más disperso.

FALLO DECORADO: selva 'caida': con o.cae = 0 devuelve cae: null (rompió un barrido en t=34,13). La escena lo evita arrancando la caída 0,5 s antes del corte y con una guarda.
FALLO DECORADO (leve): selva 'caida': la bruma en damero (y 92–110) se ve como rayitas junto a la ruina.

DESVÍOS DEL REPARTO:
- jm-nuevo lleva 7 planos, no 6: la frase 21 no cabía en tres. El EXTRA es selva/claro/general (cero usos antes), sin o.vidas, apuntado en el Registro. El archivo de encuadres no trae lista de vistas LIBRES: «libre» = cero usos.
- Tabla: o.graba se queda en 1; el descubrimiento lo hace un musgo pintado en la escena. La mano es T.mano sinManga, en mitad de la tabla (un brazo desde el borde pasaría de 45 px).
- El «tablero con polvo» de guionistas es PIEZAS_JM.cajaJuego con polvo.
- Barra del año en jm-nuevo: 2015, 2014, 2016, 2017 bajo la cartela 2017. En jm-taquilla: 2017, 2017→2018 (g.año), 2017, 2019.
- Salón: chaval: false y nino2017JM en su lugar (el mini de 12 px no se leía).
- Caída: no uso o.vidas; tres corazonVida s:2 en x 62–114, y 48–66.

PIEZAS QUE FALTAN (pintadas en la escena): gente de 12 px (e_figuraMini no se exporta: copiada), contador de latón de tres cifras (960 y 800), entrada «2019», cronómetro, puerta de casa, poste-flecha, lianas, musgo, palomitas, móvil, cursor. Ningún fondo local.

POSICIONES DE LAS QUE DEPENDO:
- guionistas: puestos x 96 y 222, suelo 145; caja en (158, 139); sueloDelante 176, x 274+.
- salon: suelo 162; estante del tablero x 150–172, y 66.
- claro: suelo 150; puerta x 106–134, y 100–150; poste x 168.
- fachada: cola en x 170 − 8·i, suelos 143–148.
- calendario: rejilla y = 81 + 10·j, x 119–202; contador x 24–91, y 109–130; fila en suelo 173–174.
- cabana: escala x 238, plataforma 118, tabla x 180–206.
- tabla: filas de rayas y 76 y 105, x 82–240.
- sala/publico: moqueta y 140–173 (entrada x 30–122; contador x 227–294, y 148–169).
- suma: zona libre de la derecha (cronómetro en (296, 84), «10» en x 262, libro en (278, 176)).

## grupo 8 ['jm-open']
RESUMEN:
jm-open (35,9 s; cartela 2026 de 1,3 s + 6 planos de 4,5 / 6,9 / 7,0 / 5,6 / 3,7 / 7,0 s; 6 cortes bien, --comprobar sin sospechas, barrido sin errores; año 2026 hasta p5 y 1979 en p6).
- p1 selva/calle/general (tras la cartela → «It arrives»): calle nevada; el niño corre al escaparate de juegos y lo señala en «Jumanji», con saltito; la madre llega y habla (vaho); un vecino cruza con un regalo; coches y copos delante.
- p2 cine/fachada/taquilla 2026 (corta en «It arrives», 5,78): madre y niño llegan a la taquilla; la tira de entradas sale en «Christmas… 2026»; el niño salta; la madre la recoge y van a la puerta; llega otra vecina en «final».
- p3 selva/calle/ventana (corta en «The idea», 12,65): la consola vibra (rayitas) y en «breaks free» brotan las lianas hasta llenar la ventana en «world»; un gorrión picotea en la repisa y huye volando.
- p4 hoy/linea/general (corta 0,4 s antes de «Notice»): una liana del techo con el lápiz dibuja la línea: mesa → tablero en «cardboard board» → cartucho en «cartridge», con destellos; el «45» sube en «45 years»; un niño entra, se sorprende y señala.
- p5 hoy/linea/bucle (corta en «an old console», 25,18): destello en la consola; el lápiz grande con su liana traza la vuelta y la flecha toca el nudo en «started» (chispas); la liana se retira.
- p6 taller/casa/general, 1979 (corta en «to the idea», 28,86): el escultor dibuja; Lisa entra con una taza; en «The jungle» asoman tres hojas de selva por la ventana (recortadas) y una vid baja por la pared; ella se vuelve y él también, sorprendidos y luego sonríen.
Efectos: 12 en 36 s (coche, pop, papel, zumbido, rafaga, whoosh, lapiz ×3, pop ×2, brillo, viento).

AVISOS:
Módulo: /home/user/varios/episodios/35-jumanji/borrador-escenas/escenas8.py (generado en /home/user/varios/atomo/plato/escenas/_tmp_S8/jm-open.html). Sin fallos de decorado. Sin fondos locales.
SIN MIRAR: las hojas finales (final/jm-open-1 y -2) se regeneraron tras los últimos ajustes y no las volví a abrir enteras; lo cambiado lo vi en capturas sueltas (p1 2,6 s; p3 hoja entera; p4 24,5 s; p6 32,0 y 34,2 s). No revisados tras el último ajuste: p2 (inicio adelantado) y p5 (corte movido a 25,18, liana que se retira por la derecha).
DECISIONES A REVISAR:
- p4: no hay chibi de Atom ni nadie previsto en 'hoy'; puse a nino2017JM (x 286, suelo 172) señalando, y la línea la dibuja una liana con el lápiz (enlaza con el gag 1). Si no convence el niño, se quita sin romper el plano.
- p5 dura 3,7 s (el corte va en «an old console» para que el cartucho se lea 1 s en p4).
- p6: la hoja se pinta sobre los junquillos de la ventana (se lee como que entra); R.recorte [29,32,77,85]. PIEZAS_JM.hojaSelva/liana usan R.rect y no respetan R.recorte: hoja y vid son propias de la escena (poligono/linea/pset).
- La madre y el niño pasan por delante de la taquilla y de los postes del cordón al ir a la puerta (no hay puerta que se abra: no entran, llegan a ella).
- R.tramo ya va suavizado (easeIO): no encadenar otro suavizado encima.
POSICIONES DE LAS QUE DEPENDE: calle: acera (actores en suelo 141 y 137), escaparate x 68–142, farola x 60. Taquilla: suelo 164, cliente x 80, ranura (116,141), puerta x 246–306. Ventana: consola (160,138), repisa y 136. Linea: g.nudos, g.ruta, g.punta; «45» en (150,138); liana desde (232,0). Bucle: g.punta, g.nudo, g.consola [262,146]; liana desde (319,60). Casa: ventana x 28–78, y 31–86; silla [136,156]; mano [158,141]; Lisa en x 96.
Registro de encuadres: añadidas 6 líneas «jm-open pN» (son las vistas asignadas, sin extras).

## grupo 9 ['jm-porque', 'jm-cierre']
RESUMEN:
jm-porque (36,0 s, 8 planos: 4,6/4,1/4,3/4,0/3,7/6,7/4,0/4,6; año 2026):
p1 hoyTaller: Van Allsburg dibuja; el chaval entra con «?» («why»); él levanta el lápiz y explica: bocadillo sillón + rinoceronte. Corta en «his drawings».
p2 (EXTRA) alacena a lápiz: una mano con lápiz negro garabatea junto a la puerta; en «never» aparece el segundo mono; caen latas. Corta en «We've all».
p3 ojos: mirada al salón («living room»), al rinoceronte («rhinoceros»), vaivén; aspa roja en «together»; el ilustrador señala y se encoge de hombros. Corta en «And when».
p4 pasillo/baja: el ratón avisa «!»; pasan las patas de dos rinocerontes. Corta en «and so».
p5 juntos: ojos + marco rojo saltan sillón/rinoceronte; en «look away» intentan irse dos veces y una goma los devuelve; al final abarcan los dos. Corta en «And there's».
p6 reglas: la ficha da 3 pasos; mano con cera roja tacha en «quit», «cheat», «call» (el teléfono vibra antes). Corta en «The only».
p7 meta: la ficha llega en «finish… started»; tres lianas se retiran; rayos y confeti. Corta en «seeing».
p8 mesa: Atom baja y acompaña a la ficha por la espiral; dados en «dressed up»; temblor y liana en «stampede»; llega a la meta y Atom vuelve a su esquina.

jm-cierre (13,9 s, 3 planos: 5,5/3,8/4,6; año 2026):
p1 esquina: lápiz y mano terminan al perro blanco («white dog… hiding») y se retiran; mariquita. Corta en «So now».
p2 (EXTRA) parque en color: el chaval llega, ve la caja en «box» («!», señala) y la levanta. Corta en «you can take».
p3 estudio con lianas (gag 8): la caja ya en casa; Atom baja con el folleto, lo deja en el canto en «But first»; desde «read» el rollo corre por el frente y el suelo; Atom lo sigue y «!».

Comprobado: ningún «!» ni «<»; fundidos sin ROTO; hojas «sin errores en la página»; «barrido sin errores». Efectos: 28 en jm-porque, 11 en jm-cierre.

AVISOS:
SIN MIRAR: las tres hojas de final/ se regeneraron tras los últimos arreglos y no las abrí; lo cambiado lo vi en capturas sueltas (p4 de jm-porque, caja y folleto de jm-cierre). La bajada del garabato de jm-porque p2 solo la vi a 6,3 s.

REPARTO CAMBIADO (dos extras, apuntados en encuadres-ep35.md): con las vistas del reparto, 0–13 s de jm-porque y 5,5–13,9 s de jm-cierre daban planos de más de 7,2 s.
- jm-porque p2: casaJuego 'cocina/alacena' (sin usos en el reparto ni en el registro). La numeración se desplaza: ojos p3, pasillo/baja p4, juntos p5, reglas p6, meta p7, mesa p8.
- jm-cierre p2: casaJuego 'parque/general' con color: 1 (segunda vez; la otra es jm-libro p7, no vecina). El estudio pasa a p3.

FALLO DECORADO: casaJuego 'pasillo/baja': con estampida, las panzas pasan por detrás de Atom y de las cifras del año.
FALLO DECORADO (menor): casaJuego 'cocina/alacena': el segundo mono aparece de golpe con monos > 0,5; lo tapo con la mano que garabatea y unas chispas.

FUNDIDOS: REVISAR en el corte al plano 4 de jm-porque (3 %): son las patas, que ya se mueven. Ningún ROTO.

DERECHOS: 'ojos/juntos' (rinoceronte en el salón) es composición del decorado y su autor pide revisarla; no la he tocado. En p5 añado unos ojos sueltos (iris y pupila, sin párpados) en el margen de la hoja: son la mirada del espectador de la lámina 'ojos', no la cara de un objeto.

ATOM: jm-comun fija a Atom en (297, 24) e ignora x, y. Las dos escenas sobrescriben R.companero para bajarlo (jm-porque p8, jm-cierre p3); en el resto llama al original. En jm-cierre se queda abajo al acabar el episodio.

EFECTOS: quité el «guau» de jm-cierre p1 (el perro dibujado no hace ningún gesto); va «brillo» con las chispas.

PIEZAS QUE ECHÉ DE MENOS: una cera o lápiz rojo grande (g_lapizGrande solo da amarillo o negro; la pinto en la escena y la sujeta T.mano); que los 'reglas' animen ellos la mano.

SIN FONDOS LOCALES.

POSICIONES DE LAS QUE DEPENDO:
- hoyTaller: pie (101, 162), hoja (125, 147), libre x ≈ 208.
- alacena: mono 2 en (262, 60).
- ojos: izqAhora/derAhora, recuadro de 76 × 58, centro entre recuadros (142, 104), libre x 290.
- pasillo/baja: ratonera (128, 46); los rinocerontes se ven con estampida ≈ 0,23–0,78.
- juntos: sillón ≈ (86, 120), rinoceronte ≈ (200, 118), margen de hoja y 24–36.
- reglas: círculos (108/160/212, 60), radio 19.
- meta: gema (246, 106).
- mesa: g.ficha y g.meta.
- esquina: g.punta y lapizLargo (78, −64).
- parque: caja (190, 153), suelo 152.
- estudio: rollo (146, 135), liana (187, 5), libre x ≈ 228.

Módulo: /home/user/varios/episodios/35-jumanji/borrador-escenas/escenas9.py. Generadas en /home/user/varios/atomo/plato/escenas/_tmp_S9/. Sin commits.