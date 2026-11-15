# Reparto de encuadres del ep36 (obligatorio). Vista = función/encuadre/cámara de tu-comun.js ('general' = sin o.camara).
# Reglas: dentro de una escena una vista no se repite; en el episodio, como mucho dos veces y nunca en escenas vecinas.
# Los planos se cortan en la palabra; si una oración de más de 7 s pide otro plano, se usa una vista LIBRE (lista al final), nunca una repetida.
# Las opciones (o.*) de cada vista están en la cabecera de su función: léelas antes de componer.

## tu-gancho
- p1: tumba/pintada/pared — f1 «puede no estar terminada»: la pared pintada, de cerca, con una raya recta que asoma (GOLPE en «muro») ({ encuadre: 'pintada', camara: 'pared', raya: 0 }; se anima o.raya 0→1 hasta el golpe; dintel en y 52, x 150–224)
- p2: ladera/corte/general — f1 «cuartos que nadie ha abierto»: el corte del monte con la tumba y una mancha al lado ({ encuadre: 'corte', anomalias: 0, broca: 0 }; se anima o.anomalias 0→1; o.anomalias 0→1 hace salir las manchas: la fuerte de geo.mancha [238, 88, 276, 128] y las dos débiles; epoca 2026 por omisión: la perforadora diminuta espera en la cumbre, geo.perforadora [256, 48])
- p3: ladera/perforadora/general — f1 «un agujero de unos ocho centímetros»: la perforadora pequeña espera arriba ({ encuadre: 'perforadora', broca: 0 }; con 0 el motor está arriba y quieto; si se quiere un amago, 0→0.1)
- p4: tumba/pasillo/hueco — f2 el arqueólogo que miró por un agujero con una vela ({ encuadre: 'pasillo', camara: 'hueco', abierta: 1, acerca: 0, oro: 0 }; se anima o.acerca 0→1, o.oro 0→0.6; la mano de Carter con la vela (PIEZAS_TU.vela) la pinta el decorado y llega a geo.vela [126, 104] con acerca 1)
- p5: cairo/calle/general — f2 los periódicos que inventaron una maldición ({ encuadre: 'calle', gente: 0.7 }) [LO PINTA LA ESCENA: el chaval que vende (ELENCO_TU.vendedorTU, ya con su pila de periódicos sin letras) en geo.vendedor [110, 154], gritando (R.icono «!»); si alza un ejemplar, PIEZAS_TU.periodico con icono 'piramide']
- p6: hoy/pizarra/general — f2 tres radares que no se pusieron de acuerdo (✓ ✗ ✗) ({ encuadre: 'pizarra', n: 3, respuestas: ['✓', '✗', '✗'], traza: 0 }; se anima o.traza 0→1; o.traza se anima con rampa: dibuja los tres radares de mano uno a uno y su respuesta al acabar cada uno)
- p7: ladera/gravimetro/general — f2 unos científicos que pesan un monte ({ encuadre: 'gravimetro', tiembla: 0 }) [LO PINTA LA ESCENA: los geofísicos (ELENCO_TU.geofisico1TU, geofisica2TU) de pie a la izquierda del trípode (x ≈ 118) y a la derecha del palo de la sombrilla (x ≈ 196), suelo 151]

## tu-hola
- p1: hoy/estudio/pared — f3 Atom saluda; pone el estetoscopio en la pared, da un golpecito y le devuelven el golpe (gag 1) ({ encuadre: 'estudio', camara: 'pared', golpe: 0 }; se anima o.golpe 0→1; o.golpe con rampa: los tres toques caen en 0,05, 0,35 y 0,65 y la lámina da un saltito en cada uno; con un valor quieto se congela) [LO PINTA LA ESCENA: el inserto no tiene sitio para actores (libre [0, 0]): la mano de Atom (T.mano) con la campana de PIEZAS_TU.estetoscopio apoyada en geo.punto [150, 92] y su golpecito antes del primer toque; el saludo, el Atom de la esquina]

## tu-carter
- p1: valle/valle/general — f4 el Valle de los Reyes al sol, Carter excavando ({ encuadre: 'valle', luz: 'dia', epoca: 1922 }) [LO PINTA LA ESCENA: Carter (ELENCO_TU.carterTU) en libre [150, 270], hacia x 190–200, suelo 150, mirando a geo.arena [236, 136]; los obreros diminutos, el burrito, la vagoneta y la criba ya los pinta el decorado]
- p2: valle/tienda/general — f4 lord Carnarvon, cansado de pagar arena ({ encuadre: 'tienda', luz: 'dia', billetes: 0.3 }; se anima o.billetes 0.3→0.7; o.billetes es lo gastado: 0 fajo entero, 1 casi nada) [LO PINTA LA ESCENA: Carnarvon (ELENCO_TU.carnarvonTU) DETRÁS de la mesa con los pies en geo.detras 145 (asoma cabeza y hombros); Carter, si sale, en geo.libre [212, 272] o geo.libreIzq [40, 92], suelo 154]
- p3: valle/tienda/mesa — f4 los billetes que se acaban: una última temporada ({ encuadre: 'tienda', camara: 'mesa', billetes: 0.6, suma: 0.4, rodea: 0 }; se anima o.billetes 0.6→1, o.suma 0.4→1, o.rodea 0→1; o.suma 1 pone la doble raya y el 0 rojo; o.rodea rodea el 1922 del calendario de mesa, geo.calendario [238, 76]; el brazo con la pluma lo pinta el decorado mientras suma < 0,95)
- p4: valle/chozas/general — f5 retiran las chozas de obreros antiguos ({ encuadre: 'chozas', limpio: 0, escalones: 0 }; se anima o.limpio 0→1; o.limpio quita las piedras de los muretes, también los dos cuartos de delante de valleDelante)
- p5: valle/chozas/escalon — f5 aparece el escalón, luego otro ({ encuadre: 'chozas', camara: 'escalon', barre: 0.1, escalones: 0 }; se anima o.barre 0.1→1, o.escalones 0→1; o.barre lleva el borde de lo barrido de x 10 a x 300 con el brazo (manga '#d8c8a8' por omisión); o.escalones 0→1 hace asomar el segundo escalón de detrás, en la sombra, cuando lo barrido ya enseña el primero; con 0 no se ve ninguno detrás)
- p6: valle/escalera/sellos — f5 la puerta con los sellos intactos; Carter la vuelve a tapar ({ encuadre: 'escalera', camara: 'sellos', farol: 0.2 }; se anima o.farol 0.2→0.7; el farol barre de x 30 a x 290 y se para en el sello más claro, geo.sello [164, 92]) [LO PINTA LA ESCENA: el volver a tapar: este inserto no lee o.tapada (solo lo hace la general de 'escalera'); arena que cae desde arriba y sube por delante del enlucido en el último tercio del plano]
- p7: valle/telegrafo/cinta — f5 el telegrama a Carnarvon (gag 2: la cinta que no se acaba y el burro) ({ encuadre: 'telegrafo', camara: 'cinta', corre: 1, burro: 0 }; se anima o.corre 1→2, o.burro 0→1; o.burro hace entrar el morro por la derecha hasta la boca [268, 128] y mascar la cinta; o.corre es la velocidad de la cinta)

## tu-vela
- p1: tumba/pasillo/general — f6 la segunda puerta; Carter abre un hueco y acerca la vela ({ encuadre: 'pasillo', abierta: 0, oro: 0, vela: 1, llama: [170, 120] }; se anima o.abierta 0→1, o.oro 0→0.5; o.llama [x, y] sigue la llama de la vela de Carter, de unos [170, 120] a [220, 92]; mueve la luz con la vela; el hueco crece en geo.hueco [228, 84]) [LO PINTA LA ESCENA: Carter (ELENCO_TU.carterTU) en libre [40, 190], suelo 156, junto a la puerta, con PIEZAS_TU.vela en la mano; o.llama tiene que seguir su llama]
- p2: tumba/antecamara/general — f6 «cosas maravillosas» (GOLPE en «vela»; gag 3: la vela se apaga y se enciende) ({ encuadre: 'antecamara', vela: 1, oro: 0 }; se anima o.oro 0→1; o.oro 0→1 enciende los destellos del oro poco a poco, el golpe en «vela») [LO PINTA LA ESCENA: el apagón del gag 3: o.vela no sirve para eso (al bajarla sube la luz de fondo, 0,16 + (1 − vela) · 0,4, y con 0 queda el foco eléctrico blanco de 1923); un velo casi negro encima unos instantes, un hilo de humo abajo en medio (la llama entra por [160, 186]) y vuelve la luz]
- p3: tumba/antecamara/ajuar — f6 oro, estatuas, carros y cofres amontonados ({ encuadre: 'antecamara', camara: 'ajuar' }; sin opciones: el trono, el cofre pintado, la rueda de carro y el abanico con los brillos que corren solos; las estatuas guardianas solo salen en la general)

## tu-pequena
- p1: tumba/plano/general — f7 la tumba de cuatro cuartos, pequeña para un rey ({ encuadre: 'plano', contar: 0, comparar: 0 }; se anima o.contar 0→4, o.comparar 0→1; primero contar enciende los cuatro cuartos con su número; después comparar desenrolla el plano rojo de la tumba grande y encoge el de Tutankamón a geo.tutChica, ya sin números)
- p2: tumba/plano/apretado — f7 más de cinco mil objetos apretados ({ encuadre: 'plano', camara: 'apretado', objetos: 0, cuenta: 0 }; se anima o.objetos 0→1, o.cuenta 0→1; las dos valen 1 por omisión: hay que darlas desde 0; el contador sube hasta 5000)
- p3: tumba/capillas/panel — f7 un panel de capilla montado al revés ({ encuadre: 'capillas', camara: 'panel', duda: 0 }; se anima o.duda 0→1; el panel ya está al revés; o.duda quita la mano derecha y saca la «?»)
- p4: tumba/mascara/sarcofago — f7 un entierro hecho con prisa (sarcófago cerrado) ({ encuadre: 'mascara', camara: 'sarcofago', vela: 1 }; el sarcófago CERRADO de cuarcita, la vela en el suelo, geo.vela [278, 147])
- p5: tumba/pintada/general — f8 la única sala pintada ({ encuadre: 'pintada', epoca: 2015 }; la cámara pintada entera, con su pasarela y luz eléctrica)
- p6: tumba/escriba/general — f8 objetos del ajuar con otro nombre ({ encuadre: 'escriba', cartucho: 'sol' }; el cofre del escriba en geo.cofre [150, 132]) [LO PINTA LA ESCENA: el escriba sentado junto al cofre (x ≈ 124, suelo 154) y el aprendiz en la piedra de moler (x ≈ 240); no hay escriba en ELENCO_TU: un chibi antiguo del elenco]
- p7: tumba/escriba/cartucho — f8 el nombre raspado y cambiado ({ encuadre: 'escriba', camara: 'cartucho', raspa: 0, pinta: 0 }; se anima o.raspa 0→1, o.pinta 0→1; primero raspa de izquierda a derecha; cuando llega a 1, pinta pone sol, ankh y cesta)

## tu-maldicion
- p1: cairo/hotel/ventana — f9 abril de 1923: Carnarvon muere de una infección (sobrio: una ventana que se apaga) ({ encuadre: 'hotel', camara: 'ventana', apaga: 0 }; se anima o.apaga 0→1; la lámpara se apaga, el cuarto queda azul y sale el reflejo de la luna; el telegrama ya está en el alféizar)
- p2: cairo/redaccion/periodico — f9 los periódicos se inventan la maldición (pirámide con «!», sin momias) ({ encuadre: 'redaccion', camara: 'periodico', titular: 0, copias: 0 }; se anima o.titular 0→1, o.copias 0→1; copias empieza cuando titular llega a 1, porque tapa el pictograma) [OJO: el pictograma del decorado (c_PICTO de c_picto, tu-comun.js l. 3372–3375; aquí, a escala 4, en geo.picto) no cumple aún la regla del episodio (pirámide con «!» y nada más); hay que corregirlo en el decorado antes de rodar este plano]
- p3: cairo/calle/vendedor — f9 el vendedor grita el titular; el gato se sienta encima (gag 4) ({ encuadre: 'calle', camara: 'vendedor', gato: 0 }; se anima o.gato 0→1; el gato anda, salta a la acera, da una vuelta y se sienta encima del periódico del suelo, x 244, y 170; con 1 se lame una pata) [LO PINTA LA ESCENA: el vendedor (ELENCO_TU.vendedorTU) en geo.vendedor [104, 166] gritando con R.icono «!»] [OJO: el periódico del suelo y el cartel de la pared usan el mismo pictograma c_picto, que hay que corregir en el decorado como en p2]
- p4: cairo/londres/puerta — f9 Carter, ya mayor, en Londres, en 1939 ({ encuadre: 'londres', camara: 'puerta', baston: false, hojas: 0.5, niebla: 0.4 }; con baston false no está apoyado en la jamba, porque lo lleva Carter) [LO PINTA LA ESCENA: Carter mayor (ELENCO_TU.carterMayorTU, ya con su bastón) en libre [20, 132], suelo 166, ante la puerta geo.puerta [142, 106, 192, 158]]

## tu-escaneo
- p1: valle/entrada/cola — f10 demasiadas visitas: la cola de turistas (2014) ({ encuadre: 'entrada', camara: 'cola', aliento: 0.3 }; esta cámara no lee o.cola ni o.epoca (siempre es hoy): los turistas no los pinta) [LO PINTA LA ESCENA: la cola de turistas chibi (p. ej. EL.turista1 y otros) de lado en geo.cola [30, 250], suelo 166, que avanza a ratos hacia la boca de la derecha; el aliento sale a y ≈ 141, a la altura de sus bocas]
- p2: escaneo/escaner/general — f10 el escáner en su raíl ante la pared ({ encuadre: 'escaner', pasada: 0.2 }; se anima o.pasada 0.2→0.8; el carro va de x 40 a x 252 y deja la malla azul; el cabezal sube y baja solo) [LO PINTA LA ESCENA: los técnicos, en libre [66, 268], suelo 170; el decorado no los dibuja]
- p3: escaneo/escaner/cabezal — f10 el detalle de décimas de milímetro ({ encuadre: 'escaner', camara: 'cabezal', barrido: 0 }; se anima o.barrido 0→1; la línea roja baja de y 6 a y 172 y la pantallita se llena)
- p4: escaneo/taller/impresora — f10 el taller de Madrid imprime la copia ({ encuadre: 'taller', camara: 'impresora', capas: 0 }; se anima o.capas 0→1; yeso blanco, relieve gris hasta 0,72 y el color al final)
- p5: escaneo/replica/general — f10 la copia junto a la casa de Carter, desde 2014 ({ encuadre: 'replica' }; sin opciones, siempre 2014: los turistas que bajan del autobús y entran ya los pinta el decorado)
- p6: escaneo/rasante/general — f11 Reeves estudia los escaneos ({ encuadre: 'rasante', luzRasante: 0, rectangulos: 0 }; se anima o.luzRasante 0→1, o.rectangulos 0→0.3) [LO PINTA LA ESCENA: Reeves (ELENCO_TU.reevesTU) en libre [96, 270], suelo 168]
- p7: escaneo/rasante/linea — f11 las líneas rectas bajo la pintura: dos puertas tapiadas ({ encuadre: 'rasante', camara: 'linea', dedo: 0, color: 0 }; se anima o.dedo 0→1; el dedo de Reeves repasa el dintel de x 60 a x 260; el brazo lo pinta el decorado; el inserto enseña UNA arista: las dos puertas juntas solo salen en la general con rectangulos 1)

## tu-reina
- p1: ladera/trazo/general — f12 la idea enorme: la tumba, entrada de otra más grande (trazo azul «según él») ({ encuadre: 'trazo', reeves: 1, traza: 0, anomalias: 0 }; se anima o.traza 0→1; o.traza dibuja el contorno azul a rayas en geo.grande [214, 72, 314, 150] con la mano y el lápiz siguiendo la punta; sin perforadora, porque no se da o.broca)
- p2: radares/museo/general — f12 Nefertiti, una reina; el museo de Berlín ({ encuadre: 'museo' }; sin opciones: la vitrina con el busto, los visitantes que pasan y el guarda que cabecea los pinta el decorado)
- p3: radares/museo/busto — f12 el busto (el nuestro); su tumba nunca encontrada ({ encuadre: 'museo', camara: 'busto', duda: 0 }; se anima o.duda 0→1; sale la «?» grande que flota)
- p4: tumba/pintada/general — f12 «podría estar detrás de esa pared» ({ encuadre: 'pintada', epoca: 2015 }; la pasarela, los focos y la barandilla de tumbaDelante; la pared norte en geo.pared [146, 50, 304, 148])
- p5: radares/amarna/general — f13 hace unos 3.350 años: la ciudad del disco solar ({ encuadre: 'amarna', disco: 0.4 }; se anima o.disco 0.4→1; por omisión 0,7; los rayos respiran solos) [LO PINTA LA ESCENA: los reyes en el balcón, ELENCO_TU.nefertitiTU y akenatonTU, suelo 96, R.actor x 186 y 203 (el pretil de radaresDelante les tapa los pies)]
- p6: radares/amarna/templo — f13 un solo dios; los sucesores borran sus nombres ({ encuadre: 'amarna', camara: 'templo', borra: 0, corona: 0 }; se anima o.borra 0→1; el cincel en la mano canónica raspa un cartucho y luego el otro; desde 0,7 las caras quedan en blanco)
- p7: tumba/mascara/general — f13 quizá reinó con otro nombre, justo antes de Tutankamón ({ encuadre: 'mascara', brillo: 0 }; se anima o.brillo 0→1; el reflejo cruza el cristal de la vitrina una vez; sin o.brillo pasa solo)

## tu-radar
- p1: radares/pared/general — f14 Watanabe pasa el radar por las paredes (finales de 2015) ({ encuadre: 'pared', pasada: 0, radar: true, ayudante: true }; se anima o.pasada 0→1; el radar de mano va de x 152 a x 218 y devuelve radar [x, 140]) [LO PINTA LA ESCENA: Watanabe (ELENCO_TU.watanabeTU) con R.actor x = radar.x − 15 y la mano en [radar.x − 6, 140], suelo 162]
- p2: radares/prensa/general — f14 al día siguiente, la rueda de prensa del 90 % ({ encuadre: 'prensa', cifra: 0, flash: 1 }; se anima o.cifra 0→1; la pantalla sube de 0 a 90 % con la barra; los periodistas de espaldas y los flashes van en radaresDelante) [LO PINTA LA ESCENA: los de la mesa sentados detrás, suelo 140, en geo.asientos x 77, 113, 153, 193 y 229 (asoman cabeza y hombros)]
- p3: radares/prensa/publico — f14 flashes y periodistas ({ encuadre: 'prensa', camara: 'publico', flash: 1 })
- p4: radares/canon/general — f15 un grito en un cañón y el eco ({ encuadre: 'canon', boca: [80, 136], onda: 0, vuelve: 0 }; se anima o.onda 0→1, o.vuelve 0→1; primero onda hasta la pared de enfrente (destello en 1), luego vuelve, más débil, con la burbuja del eco) [LO PINTA LA ESCENA: el excursionista que grita, un chibi cualquiera (p. ej. EL.turista1 con o.habla) en x ≈ 70 sobre la repisa, suelo 150; o.boca a la altura de su boca]
- p5: radares/canon/roca — f15 la onda baja por la roca y rebota en el cambio de material ({ encuadre: 'canon', camara: 'roca', onda: 0, material: 'escombro' }; se anima o.onda 0→1; baja de 0 a 0,5, rebota con chispazo en y 124–139 y sube más débil de 0,5 a 1; el cronómetro corre de 0 a 60)
- p6: radares/pared/pantalla — f15 el tiempo de vuelta da la profundidad ({ encuadre: 'pared', camara: 'pantalla', eco: 0 }; se anima o.eco 0→1; salen las dos hipérbolas sobre la escala 0–3 m; pasado 0,7 se encienden en rojo y laten)

## tu-turin
- p1: radares/segundo/general — f16 unos meses después, el segundo equipo ({ encuadre: 'segundo' }; sin opciones: el carro de dos antenas, el ordenador con su radargrama plano y el sarcófago CERRADO delante) [LO PINTA LA ESCENA: el segundo equipo (ELENCO_TU.natgeoTU y otro técnico) en libre [86, 236], suelo 164]
- p2: radares/segundo/plana — f16 no encontró nada: ✓ y ✗ ({ encuadre: 'segundo', camara: 'plana', barrido: 0, marcas: 0 }; se anima o.barrido 0→1, o.marcas 0→2; las dos valen lo máximo por omisión: hay que darlas desde 0; marcas traza primero el ✓ verde y luego el ✗ rojo)
- p3: radares/turin/general — f17 2018: el tercero, el más completo, de Turín ({ encuadre: 'turin', pita: 0 }; la lata ya está olvidada en el saliente, x 214, y 119, pero sin pitar todavía) [LO PINTA LA ESCENA: el equipo de Turín (ELENCO_TU.porcelliTU) en libre [48, 268], suelo 158]
- p4: tumba/pintada/pared — f17 los ecos «fantasma» salen de delante de la pared (gag 5: la lata) ({ encuadre: 'pintada', camara: 'pared', raya: 0, rectangulos: 0 }) [LO PINTA LA ESCENA: esta vista no tiene lata ni ecos (eso es o.pita de radares/turin): PIEZAS_TU.lata en el suelo de losas DELANTE de la pared (suelo 172, p. ej. x ≈ 186, bajo la puerta escondida x 150–224) y los arcos de eco que salen de la lata, no de la pared]
- p5: radares/turin/carpeta — f17 no hay cuartos pegados: el caso, cerrado ({ encuadre: 'turin', camara: 'carpeta', cerrada: 0, sello: 0 }; se anima o.cerrada 0→1, o.sello 0→1; cerrada vale 1 por omisión: hay que empezar en 0; el sello solo deja el candado rojo si la carpeta ya está cerrada, así que empieza cuando cerrada llega a 1)
- p6: valle/entrada/general — f17 Egipto da el caso por cerrado ({ encuadre: 'entrada', cola: 0.4 }; la entrada no lee o.epoca (siempre es hoy); o.cola 0–1: cuántos turistas bajan por el sendero)

## tu-este
- p1: ladera/ladera/general — f18 «No del todo»: 2020, un radar desde la ladera ({ encuadre: 'ladera', epoca: 2020, carrito: 0 }; se anima o.carrito 0→0.6; sin o.carrito no se pinta el radar; devuelve carrito y asa [x − 14, y − 21]) [LO PINTA LA ESCENA: quien empuja el carrito (ELENCO_TU.eldamatyTU o un técnico) con la mano en geo.asa y los pies en round(140 − 0,12 · (x − 160))]
- p2: ladera/ladera/carrito — f18 el radar de carrito de Eldamaty ({ encuadre: 'ladera', camara: 'carrito', epoca: 2020, eco: 0 }; se anima o.eco 0→1; la sombra del técnico ya la pinta el decorado) [LO PINTA LA ESCENA: si sale, Eldamaty (ELENCO_TU.eldamatyTU) en libre [20, 150], suelo 158]
- p3: ladera/este/general — f18 al lado, no detrás ({ encuadre: 'este', pasillo: 0, duda: 0 }; se anima o.pasillo 0→1; la mancha alargada paralela al pasillo, en geo.espacio [70, 82, 160, 94], con las cotas 10 y 2)
- p4: ladera/este/radargrama — f18 un espacio alargado, paralelo al pasillo de entrada ({ encuadre: 'este', camara: 'radargrama', eco: 0 }; se anima o.eco 0→1)
- p5: ladera/permiso/general — f19 Hawass no se lo cree (el despacho oficial) ({ encuadre: 'permiso', carpeta: 0, sello: 0 }; se anima o.carpeta 0→1, o.sello 0→1; las dos van en laderaDelante: la carpeta se queda a medio cerrar y el sello baja un poco, duda y vuelve a subir) [LO PINTA LA ESCENA: Hawass (ELENCO_TU.hawassTU) DETRÁS de la mesa con los pies en y 135 (asoman cabeza y hombros)]
- p6: ladera/corte/general — f19 el pasillo del este se queda en el aire ({ encuadre: 'corte', pasillo: 1, anomalias: 0.4, broca: 0 }; el pasillo del este parpadea con un «?») [LO PINTA LA ESCENA: el «?» que parpadea sobre el pasillo]

## tu-gravedad
- p1: hoy/mesa/manzana — f20 la gravedad: todo lo que tiene masa tira (la manzana) ({ encuadre: 'mesa', camara: 'manzana', cae: 0 }; se anima o.cae 0→1; rueda hasta el filo hasta 0,12, cae con la flecha roja que crece y bota en la tarima; el gato la mira)
- p2: ladera/gravedad/general — f20 un cuarto vacío: menos roca ({ encuadre: 'gravedad', flechas: 1, hueco: 0 }; se anima o.hueco 0→1; hueco vale 1 por omisión: hay que empezar en 0; aparece el hueco cuadrado y menguan las tres flechas de encima) [LO PINTA LA ESCENA: un geofísico (ELENCO_TU.geofisico1TU) señalando, en libre [16, 66], suelo 162]
- p3: ladera/gravedad/flechas — f20 la gravedad un poquito más débil encima ({ encuadre: 'gravedad', camara: 'flechas', hueco: 0 }; se anima o.hueco 0→1)
- p4: ladera/gravimetro/muelle — f20 una pesa colgada de un muelle finísimo ({ encuadre: 'gravimetro', camara: 'muelle', hueco: 0, aguja: 0 }; se anima o.hueco 0→1, o.aguja 0→0.3; con hueco la pesa sube un pelo; o.aguja −1…1)
- p5: ladera/gravimetro/general — f21 más de mil doscientas medidas (gag 6: el escarabajo) ({ encuadre: 'gravimetro', escarabajo: 0, tiembla: 0 }; se anima o.escarabajo 0→1, o.tiembla 0→1→0; el escarabajo con su bola cruza de x 96 a x 236 en y 160; tiembla sube mientras pasa por delante del trípode, x ≈ 149–172, y baja al irse; las cifras del portátil bailan con tiembla)
- p6: ladera/mapa/general — f21 septiembre de 2026: el resultado ({ encuadre: 'mapa', rejilla: 0, manchas: 0 }; se anima o.rejilla 0→1, o.manchas 0→1; las dos valen 1 por omisión; primero la rejilla de 1.242 puntos en zigzag y, al acabar, las manchas)
- p7: ladera/mapa/esquinas — f21 manchas con esquinas rectas (GOLPE en «medidas») ({ encuadre: 'mapa', camara: 'esquinas', escuadra: 0 }; se anima o.escuadra 0→1; vale 1 por omisión; la escuadra se posa en cada esquina recta y pasado 0,6 sale la cota 35)
- p8: ladera/trazo/general — f21 al otro lado de la pared donde Reeves vio la puerta ({ encuadre: 'trazo', reeves: 1, traza: 1, anomalias: 0 }; se anima o.anomalias 0→1; el trazo azul de Reeves ya entero y las manchas del mapa que salen encima, al otro lado de la pared norte, geo.tumba.norte 214)

## tu-dudas
- p1: ladera/cortes/general — f22 no es una prueba: en el límite de los aparatos ({ encuadre: 'cortes' }; sin o.engana: los tres cortes con sus agujas que apenas se mueven en la banda gris)
- p2: ladera/cortes/aguja — f22 cuarto, escombro o roca agrietada ({ encuadre: 'cortes', camara: 'aguja', aguja: 0 }; se anima o.aguja 0→0.4; vale 0,3 por omisión; la aguja apenas asoma de la banda de ruido)
- p3: ladera/ladera/general — f22 geofísicos que piden más datos ({ encuadre: 'ladera', epoca: 2026 }; sin o.carrito: sin radar) [LO PINTA LA ESCENA: los geofísicos (ELENCO_TU.geofisico1TU, geofisica2TU) en libre [60, 300], pies en round(140 − 0,12 · (x − 160))]

## tu-agujero
- p1: ladera/perforadora/general — f23 perforar al menos un agujero de ocho centímetros ({ encuadre: 'perforadora', broca: 0 }; se anima o.broca 0→1; el motor baja, la broca gira, la máquina tiembla y sale polvo; devuelve punta)
- p2: ladera/corte/mancha — f23 la broca baja hasta la mancha más fuerte, al norte ({ encuadre: 'corte', camara: 'mancha', broca: 0, camarita: 0 }; se anima o.broca 0→1; broca vale 1 por omisión: empieza en 0)
- p3: ladera/perforadora/camarita — f23 la cámara diminuta baja (gag 7: el murciélago) ({ encuadre: 'perforadora', camara: 'camarita', baja: 0, gira: 0, murcielago: 0 }; se anima o.baja 0→1, o.gira 0→1, o.murcielago 0→1; baja vale 1 por omisión; luego el haz gira a la derecha y el murciélago de [272, 140] abre un ojo)
- p4: escaneo/replica/dentro — f24 ¿por qué no tirar la pared? La pared pintada más famosa ({ encuadre: 'replica', camara: 'dentro' }; sin opciones) [LO PINTA LA ESCENA: si hay visitantes, en libre [16, 236], suelo 168 (la barandilla va detrás; el cordón de la vitrina, delante)]
- p5: valle/entrada/cola — f24 el aliento de los visitantes daña el yeso ({ encuadre: 'entrada', camara: 'cola', aliento: 0 }; se anima o.aliento 0→1; las nubecillas suben de las bocas y la tumba se las traga) [LO PINTA LA ESCENA: los visitantes de la cola, como en tu-escaneo p1, en geo.cola [30, 250], suelo 166, con la boca a y ≈ 141]
- p6: tumba/plano/general — f24 un agujero pequeño, lejos de las pinturas ({ encuadre: 'plano', contar: 0, comparar: 0 }) [LO PINTA LA ESCENA: el agujero: el plano no lo dibuja; un puntito rojo con su circulito FUERA de la cámara pintada (geo.cuartos[2] = [72, 86]), al norte, arriba, la cámara pintada ocupa [48, 72, 96, 100] y su pared norte es y 72: p. ej. [72, 64], por encima del plano; comprobarlo en la hoja]

## tu-permiso
- p1: ladera/permiso/calendario — f25 el permiso del Consejo Supremo de Antigüedades; los días pasan ({ encuadre: 'permiso', camara: 'calendario', dias: 0, hoy: 20 }; se anima o.dias 0→1; los días se tachan en rojo hasta el 20, que queda rodeado en geo.dia [165, 94]; el sello sigue esperando en su balda)
- p2: valle/valle/general — f25 a mediados de noviembre: la perforadora espera en la terraza del valle (o.epoca 2026: geo.perforadora) ({ encuadre: 'valle', epoca: 2026, luz: 'dia' }; la perforadora ESPERANDO en la terraza, base geo.perforadora [242, 72], con la lona que se agita y la cinta de obra, el sendero asfaltado y los turistas)

## tu-medir
- p1: hoy/pizarra/general — f26 ¿por qué cinco estudios dan respuestas tan distintas? ({ encuadre: 'pizarra', n: 5, respuestas: ['✓', '✗', '✗', '?', '?'], traza: 0 }; se anima o.traza 0→1; radar de mano ×3, radar de carrito y gravímetro, uno a uno)
- p2: radares/canon/roca — f26 el radar ve cambios de material, no huecos ({ encuadre: 'canon', camara: 'roca', onda: 0, material: 'escombro' }; se anima o.onda 0→1; con 'escombro' rebota igual que con 'aire')
- p3: ladera/gravedad/flechas — f26 la gravedad ve masa que falta, no puertas ({ encuadre: 'gravedad', camara: 'flechas', hueco: 1 })
- p4: ladera/cortes/aguja — f26 cascotes, una grieta o yeso engañan: medir no es mirar ({ encuadre: 'cortes', camara: 'aguja', aguja: 0.2 }; se anima o.aguja 0.2→0.5)
- p5: ladera/trazo/posibles — f27 almacenes, otra tumba de la familia o un pasillo sin terminar ({ encuadre: 'trazo', camara: 'posibles', posibles: 0 }; se anima o.posibles 0→3; vale 3 por omisión; se encienden uno a uno el almacén, la tumba de las dos coronas y el pasillo)
- p6: radares/museo/busto — f27 puede que no sean de Nefertiti; no hay conclusión final ({ encuadre: 'museo', camara: 'busto', duda: 0 }; se anima o.duda 0→1)

## tu-cierre
- p1: ladera/luces/general — f28 hace ciento cuatro años, una vela; ahora una cámara ({ encuadre: 'luces', vela: 0, luz: 0 }; se anima o.vela 0→1, o.luz 0→1; primero la vela a la izquierda y luego la luz fría de la camarita a la derecha; aquí o.luz es un número y no cambia el tinte del grupo)
- p2: ladera/luces/cerca — f28 dos agujeros pequeños y dos luces ({ encuadre: 'luces', camara: 'cerca', vela: 1, luz: 0 }; se anima o.luz 0→1)
- p3: hoy/caja/general — f29 una reina perdida, o roca ({ encuadre: 'caja', agujero: 0, luz: 0 }; se anima o.agujero 0→1, o.luz 0→1) [LO PINTA LA ESCENA: la mano (T.mano) con PIEZAS_TU.linterna encendida apuntando a geo.agujero [151, 121]]
- p4: hoy/caja/dentro — f29 dentro de la caja, otra caja (gag 8) ({ encuadre: 'caja', camara: 'dentro', luz: 0, otra: 0 }; se anima o.luz 0→1, o.otra 0→1; primero el rayito de la linterna; en su círculo sale la otra caja con su agujerito)
- p5: hoy/estudio/general — f29 «cuando miren, aquí te lo contaré»: Atom se despide ({ encuadre: 'estudio' }; sin o.golpe: la pared quieta) [LO PINTA LA ESCENA: la despedida de Atom (el de la esquina); si sale alguien, en libre [212, 262] o libre2 [10, 88], suelo 162]

## Registro (cada grupo añade aquí una línea si cambia o añade una vista)

## Vistas LIBRES (sin usar; se pueden usar una vez si hace falta, apuntándolo en el Registro)
- cairo/hotel/general
- cairo/londres/general
- cairo/redaccion/general
- escaneo/taller/general
- hoy/mesa/general
- hoy/pizarra/final
- tumba/capillas/general
- valle/escalera/general
- valle/valle/arena
- valle/telegrafo/general
