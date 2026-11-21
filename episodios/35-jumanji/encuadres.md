# Reparto de encuadres del ep35 (obligatorio). Vista = función/encuadre/cámara de jm-comun.js.
# Reglas: dentro de una escena una vista no se repite; en el episodio, como mucho dos veces y nunca en escenas vecinas.
# Los planos se cortan en la palabra; si una oración pide otro plano, se usa una vista LIBRE (lista al final), nunca una repetida.

## jm-gancho
- p1: taller/palabras/general — f1 «no significa nada»: la hoja de intentos, todo rayas, y un «?» que la escena pone encima ({ encuadre: 'palabras', intentos: 0.5 }; sin o.intentos la libreta sale en blanco; la J empieza en g.jDesde) [LO PINTA LA ESCENA: el «?» encima de la hoja]
- p2: casaJuego/salon/general — f1 el libro en blanco y negro: la lámina a lápiz del salón con el rinoceronte ({ encuadre: 'salon', rino: true })
- p3: cine/contador/general — f1 el contador sube hasta 2027 (GOLPE en «palabra»: al llegar) ({ encuadre: 'contador', cifra: 2027 }; o.cifra admite decimales para subir; o.gira 0–1 lo echa a rodar)
- p4: taller/casa/mesa — f2 el artista que dibuja de noche: la hoja y el flexo; vaho ({ encuadre: 'casa', camara: 'mesa', dibujo: 0.5 }; sin o.dibujo la hoja sale en blanco) [LO PINTA LA ESCENA: el vaho, con T.a_vaho(R, x, yBoca, t, dir): no es una opción del decorado; y la mano, con T.mano]
- p5: editorial/esquinas/esquina — f2 el perro blanco que se cuela ({ encuadre: 'esquinas', camara: 'esquina', asoma: 1 }; o.asoma 0→1 lo hace asomar)
- p6: keene/calle/esquina — f2 el pueblo y el letrero del zapato
- p7: keene/efectos/general — f2 el león hecho por computadora: la sala de pantallas

## jm-hola
- p1: hoy/estudio/general — f3 Atom saluda; tira los dados y una liana le quita el lápiz (gag 1) ({ encuadre: 'estudio', dados: [5, 3], lapiz: false }; o.dados y o.lapiz los lee hoyDelante; lapiz: false solo desde que la liana se lo lleva) [LO PINTA LA ESCENA: la tirada (en esta vista o.dados solo deja los dados parados o los quita con false; o.tira es de la cámara 'mesa') y la liana que se lleva el lápiz (PIEZAS_JM.liana desde [187, 5] y T.g_lapizMesa; o.lianas es otra cosa: las lianas que toman el cuarto)]

## jm-escultor
- p1: taller/mapa/general — f4 de Michigan a Rhode Island ({ encuadre: 'mapa', ruta: 1 }; o.ruta 0→1 traza la línea)
- p2: taller/taller/general — f4 el taller del escultor, de día
- p3: taller/clase/general — f4 da clases
- p4: taller/taller/banco — f5 cae la tarde y se apaga el radiador ({ encuadre: 'taller', camara: 'banco', frio: 1 }) [LO PINTA LA ESCENA: el radiador que se apaga: en la cámara 'banco' no sale el radiador (está en la general); aquí o.frio enfría la luz, anochece la ventana y enciende la lámpara]
- p5: taller/casa/general — f5 en casa, dibuja de noche; Lisa mira un dibujo
- p6: editorial/pasillo/general — f5 Lisa con la carpeta por el pasillo de editoriales

## jm-perro
- p1: editorial/despacho/general — f6 el editor mira los dibujos
- p2: editorial/despacho/mesa — f6 le tiende una pluma: que lo escriba él ({ encuadre: 'despacho', camara: 'mesa', dibujos: 5, pluma: [262, 150] }; o.pluma es la punta: la escena la mueve)
- p3: editorial/libro1979/general — f6 el niño persigue al perro por el jardín de setos ({ encuadre: 'libro1979', perro: [100, 140], perroDir: 1 }; sin o.perro no hay perro; la escena mueve su x)
- p4: editorial/esquinas/general — f6 el perro escondido en todos los libros (gag 2) ({ encuadre: 'esquinas', cuantos: 4 }; o.cuantos 0→4 los cerca uno a uno)

## jm-pregunta
- p1: casaJuego/cocina50/general — f7 el niño de los 50 y su juego aburrido
- p2: casaJuego/cocina50/billete — f7 gana un billete de juguete y bosteza (gag 3)
- p3: casaJuego/tablero/gema — f7 la pregunta: ¿y si todo fuera real? ({ encuadre: 'tablero', camara: 'gema', dentro: 0.5 }; o.dentro 0→1: se nubla y deja ver la hoja)
- p4: taller/casa/mesa — f8 dibuja un salón tranquilo y le pone un rinoceronte ({ encuadre: 'casa', camara: 'mesa', dibujo: 1, tema: 'rino' }; o.dibujo 0→1; el rinoceronte empieza en g.rinoDesde)
- p5: taller/palabras/papelera — f8 busca un nombre: bolas de papel ({ encuadre: 'palabras', camara: 'papelera', bola: 0.5 }; o.bola 0→1 es el vuelo de una bola; o.desde [x, y] de dónde sale)
- p6: taller/palabras/general — f8 la palabra con su J, rodeada ({ encuadre: 'palabras', intentos: 1 }; sin o.intentos la libreta sale en blanco)

## jm-libro
- p1: casaJuego/parque/arbol — f9 los hermanos encuentran la caja
- p2: casaJuego/salon/piano — f9 un león sobre el piano; toca una nota (gag 4) ({ encuadre: 'salon', camara: 'piano', nota: 1 }; o.nota 0→1: baja la pata, hunde la tecla y sale la corchea)
- p3: casaJuego/cocina/general — f9 monos en la cocina ({ encuadre: 'cocina', monos: 1 }; sin o.monos no sale ninguno; los dos de la mesa van en casaJuegoDelante)
- p4: casaJuego/pasillo/general — f9 el monzón y la estampida ({ encuadre: 'pasillo', estampida: 0.5 }; o.estampida 0→1; los rinocerontes van en casaJuegoDelante salvo rinosDetras: true) [LO PINTA LA ESCENA: el monzón: o.lluvia solo existe en 'salon']
- p5: casaJuego/tablero/general — f9 la regla: hasta que alguien llegue al final ({ encuadre: 'tablero', avance: 1 }; o.avance 0→1)
- p6: casaJuego/salon/general — f10 dibujado a lápiz: parece una foto de algo imposible ({ encuadre: 'salon', lluvia: 1, plantas: 1 }); una mano con el lápiz [LO PINTA LA ESCENA: la mano con el lápiz (T.mano)]
- p7: casaJuego/parque/general — f10 devuelven la caja al parque ({ encuadre: 'parque', caja: true }; sin o.caja no hay caja al pie del árbol)
- p8: casaJuego/ventana/general — f10 desde la ventana: dos niños se la llevan ({ encuadre: 'ventana', chicos: 0.5 }; o.chicos 0→1, o true en bucle; sin ella no salen)
- p9: casaJuego/ventana/folleto — f10 el folleto de instrucciones, en el suelo

## jm-medalla
- p1: editorial/premios/general — f11 la sala de premios de 1982
- p2: editorial/premios/medalla — f11 la medalla se posa en el libro; cuatro años después, otra ({ encuadre: 'premios', camara: 'medalla', medalla: 1, segunda: 1 }; o.medalla 0→1 y luego o.segunda 0→1)
- p3: editorial/esquinas/general — f11 el libro del tren en la nieve (lupa sobre el tren: { encuadre: 'esquinas', lupa: [50, 60] }; el libro del tren es el primero, g.laminas[0]; su perro está en [73, 83])
- p4: editorial/carta/general — f12 la señora que espera un bebé llama o escribe ({ encuadre: 'carta', suena: true } para el teléfono; la carta y el sobre salen por omisión en editorialDelante)
- p5: editorial/carta/sobre — f12 la carta con el signo de interrogación y el sonajero ({ encuadre: 'carta', camara: 'sobre', pregunta: 1 }; o.pregunta 0→1 lo traza; o.sonajero [x, y] lo coloca)
- p6: casaJuego/tablero/gema — f12 «nada: solo sonaba a selva» (la hoja dentro de la gema: { encuadre: 'tablero', camara: 'gema', dentro: 1 })

## jm-historia
- p1: keene/guionistas/relojes — f13 diez minutos frente a cien
- p2: keene/guionistas/general — f13 hubo que inventar casi todo: fichas en el corcho ({ encuadre: 'guionistas', fichas: 1 }; o.fichas 0→1 las va clavando)
- p3: casaJuego/tablero/general — f13 el niño al que el juego se traga en 1969 ({ encuadre: 'tablero', color: 1 }) [LO PINTA LA ESCENA: el niño y cómo se lo traga el juego]
- p4: cine/calendario/general — f13 veintiséis años: de 1969 a 1995 ({ encuadre: 'calendario', de: 1969, a: 1995, u: 1 }; o.u 0→1 arranca las 26 hojas)

## jm-keene
- p1: keene/plato/general — f14 Robin Williams llega al plató
- p2: keene/calle/general — f14 el pueblo de verdad, con el rodaje ({ encuadre: 'calle', rodaje: true })
- p3: keene/pared/general — f14 pintan el zapato en la pared ({ encuadre: 'pared', letrero: 0.5, lavable: true, andamio: true }; o.letrero 0→1; el andamio de delante va en keeneDelante)

## jm-pelo
- p1: keene/efectos/general — f15 los animales eran el otro problema
- p2: keene/plato/camara — f15 nadie había hecho un animal peludo creíble: un peluche ante la cámara [LO PINTA LA ESCENA: el peluche: el decorado solo trae la cámara y la claqueta (o.clac, o.escena, o.plano, o.toma)]
- p3: keene/efectos/pantalla — f15 la melena crece mechón a mechón (GOLPE en «pelo»; gag 5: el último, de punta) ({ encuadre: 'efectos', camara: 'pantalla', pelo: 1, punta: true }; o.pelo 0→1 y al final punta: true)
- p4: cine/sala/general — f15 el león, ya en la pantalla del cine ({ encuadre: 'sala', pantalla: 'selva' }) [LO PINTA LA ESCENA: el león sobre la pantalla (x 62–258, y 28–96): 'selva' pinta hojas, nuestro tablero y un dado, no un león]

## jm-estreno
- p1: cine/fachada/general — f16 diciembre de 1995, con nieve y cola ({ encuadre: 'fachada', epoca: 1995, cola: 1 }; sin o.cola no hay cola)
- p2: cine/sala/publico — f16 críticas tibias ({ encuadre: 'sala', camara: 'publico', criticos: true })
- p3: cine/contador/general — f16 de 65 a 260 ({ encuadre: 'contador', cifra: 260 }; la escena lleva o.cifra de 65 a 260)
- p4: cine/prensa/periodico — f16 el periódico: «zulú» y «muchos efectos»; cae el folleto de la isla ({ encuadre: 'prensa', camara: 'periodico', isla: 1 }; o.isla 0→1)
- p5: cine/prensa/general — f16 Williams, muy serio: una isla del Caribe

## jm-espacio
- p1: cine/tele/general — f17 la serie de dibujos
- p2: cine/tele/tienda — f17 el juego de mesa de verdad
- p3: selva/espacio/general — f17 la continuación: OTRO tablero, de hojalata, a la deriva entre planetas (NUESTRO: el decorado ya NO pinta una casa flotante ni un planeta con anillos, y la escena tampoco: eso sería la portada del libro real). Los dos chicos (chico1JM, chico2JM) de pie sobre el tablero en g.pie, o el cohetito que avanza; «la casa acaba en el espacio» se cuenta en el plano con la ventana del cuarto si hace falta, nunca con una casa flotando
- p4: cine/fachada/taquilla — f18 2005: casi nadie ({ encuadre: 'fachada', camara: 'taquilla', epoca: 2005 })
- p5: cine/sala/general — f18 la sala vacía ({ encuadre: 'sala', lleno: 0.05, pantalla: 'espacio' })
- p6: cine/calendario/caja — f18 nadie volvió a abrir la caja: polvo y telaraña

## jm-velas
- p1: keene/plato/general — f19 en Keene, mientras tanto: el rodaje se desmonta [LO PINTA LA ESCENA: el desmontaje: 'plato' no tiene opciones (sale siempre «a medio montar»)]
- p2: keene/calle/esquina — f19 el pintor va a lavar el letrero y los vecinos lo paran (gag 6) ({ encuadre: 'calle', camara: 'esquina', lavable: true, pintores: true }) [LO PINTA LA ESCENA: el lavado: en 'esquina' no existe o.lavado ni o.andamio (son de 'pared' general)]
- p3: keene/pared/general — f19 lo repasan con pintura de la buena ({ encuadre: 'pared', buena: 1 }; o.buena 0→1, de izquierda a derecha)
- p4: keene/pared/pie — f19 agosto de 2014, de noche: velas ({ encuadre: 'pared', camara: 'pie', velas: 12 }; o.velas va de 0 a 12, no de 0 a 1)
- p5: keene/calle/general — f19 los días siguientes: flores y notas ({ encuadre: 'calle', epoca: 2014 }) [LO PINTA LA ESCENA: las flores y las notas: o.flores solo existe en 'pared'/'pie'; 'calle' con 2014 solo cambia coches y aparcabicis]

## jm-nuevo
- p1: cine/anuncio/general — f20 se anuncia uno nuevo y sienta mal ({ encuadre: 'anuncio', enfado: 1 }; o.enfado 0→1)
- p2: cine/anuncio/vela — f20 Williams había muerto hacía un año
- p3: keene/guionistas/general — f20 los guionistas y el tablero lleno de polvo ({ encuadre: 'guionistas', epoca: 2016 }) [LO PINTA LA ESCENA: el tablero lleno de polvo: en 'guionistas' no hay tablero de juego (2016 trae pizarra blanca y portátiles)]
- p4: cine/salon/general — f21 nadie le hace caso al tablero
- p5: cine/salon/estante — f21 se pliega en un cartucho (gag 7; { encuadre: 'salon', camara: 'estante', cambio: 1 }; o.cambio 0→1: tiembla, destello y cartucho)
- p6: selva/caida/general — f21 ahora caes tú dentro, con otro cuerpo y tres vidas ({ encuadre: 'caida', cae: 0.5 }; o.cae 0→1; figura: false si la escena pone a su actor) [LO PINTA LA ESCENA: las tres vidas: o.vidas solo existe en selvaDelante de 'claro'; aquí, PIEZAS_JM.corazonVida]

## jm-taquilla
- p1: cine/fachada/general — f22 diciembre de 2017: al lado, la cola de las estrellas ({ encuadre: 'fachada', epoca: 2017, rival: true })
- p2: cine/calendario/general — f22 semana tras semana (hojas de semanas de 2017–2018) y la cifra 960 ({ encuadre: 'calendario', de: 2017, a: 2018, u: 1 }) [LO PINTA LA ESCENA: las hojas de semanas (el taco solo cuenta años: de 2017 a 2018 arranca UNA hoja) y la cifra 960 (o.cifra es de 'contador', no de 'calendario')]
- p3: selva/cabana/general — f22 en la selva, una cabaña en un árbol
- p4: selva/cabana/tabla — f22 un nombre grabado en la madera (rayas) ({ encuadre: 'cabana', camara: 'tabla', graba: 1 }; o.graba 0→1 abre las 18 rayas)
- p5: cine/sala/publico — f23 dos años después, otra (2019) [LO PINTA LA ESCENA: el año 2019: 'sala'/'publico' no tiene o.epoca (sus opciones: lleno, pantalla, gafas, susto, criticos)]
- p6: cine/contador/suma — f23 260 + 960 + 800: más de 2.000 (GOLPE en «suma») ({ encuadre: 'contador', camara: 'suma', cifras: [260, 960, 800], total: 1, totalCifra: 2027 }; sin o.total el total no aparece; sin totalCifra marca 2020)

## jm-open
- p1: selva/calle/general — f24 esta Navidad de 2026
- p2: cine/fachada/taquilla — f24 la última partida: la taquilla con adornos ({ encuadre: 'fachada', camara: 'taquilla', epoca: 2026 })
- p3: selva/calle/ventana — f24 el juego se escapa de su consola ({ encuadre: 'calle', camara: 'ventana', lianas: 1 }; o.lianas 0→1; las hojas de delante, en selvaDelante)
- p4: hoy/linea/general — f25 45 años, un tablero y un cartucho
- p5: hoy/linea/bucle — f25 vuelve justo al punto de partida
- p6: taller/casa/general — f25 el escultor que dibujaba de noche; por su ventana asoma una hoja [LO PINTA LA ESCENA: la hoja que asoma por la ventana (x 28–78, y 31–86): 'casa' solo tiene o.gato]

## jm-porque
- p1: hoy/hoyTaller/general — f26 Van Allsburg, hoy, lo explica
- p2: hoy/ojos/general — f26 un salón; un rinoceronte; nunca juntos ({ encuadre: 'ojos', mira: -1 }; o.mira va de −1 (el salón) a 1 (el rinoceronte); juntos: 0)
- p3: casaJuego/pasillo/baja — f26 cuando aparecen juntos ({ encuadre: 'pasillo', camara: 'baja', estampida: 0.5 }; sin o.estampida no pasan los rinocerontes)
- p4: hoy/ojos/juntos — f26 la cabeza no sabe con cuál quedarse
- p5: hoy/reglas/general — f27 las reglas: ni dejarlo, ni trampas, ni llamar ({ encuadre: 'reglas', tacha: 3 }; o.tacha va de 0 a 3, con decimales)
- p6: hoy/reglas/meta — f27 solo se arregla terminando ({ encuadre: 'reglas', camara: 'meta', avance: 1 }; o.avance 0→1)
- p7: hoy/estudio/mesa — f27 un cuento sobre acabar las cosas: la ficha de Atom llega al final ({ encuadre: 'estudio', camara: 'mesa', avance: 0→1 }: la ficha roja recorre el camino y con 1 queda en la meta; devuelve ficha y meta)

## jm-cierre
- p1: hoy/hoyTaller/esquina — f28 el perro blanco sigue escondido ({ encuadre: 'hoyTaller', camara: 'esquina', perro: 1 }; o.perro 0→1)
- p2: hoy/estudio/general — f28 Atom, entre lianas, abre las instrucciones: un rollo que no se acaba (gag 8) ({ encuadre: 'estudio', lianas: 1, rollo: 1 }; o.rollo 0→1 lo pinta hoyDelante)

## Registro (cada grupo añade aquí una línea si cambia o añade una vista)
jm-escultor p3 (extra, entre taller y clase): taller/mapa/costa 'general' (la costa de cerca: la ruta llega a Providence y cae la chincheta)
jm-escultor p6 (extra, entre banco y casa): casaJuego/cocina/general SIN monos (su dibujo a lápiz: la cocina quieta, la mano con el lápiz abajo a la izquierda, la puerta que se entorna y una bola que rueda)
jm-perro p4 (extra, entre libro1979 y esquinas): editorial/libro1979/verja (el perro se cuela por la verja; el niño llega)
jm-nuevo p6 (EXTRA, entre estante y caida): selva/claro/general 'claro' (el claro con una puerta de casa en medio: las lianas se retiran, el poste de la flecha gira y la puerta se cierra; sin o.vidas)
jm-open p1: selva/calle/general (calle nevada 2026: niño señala el escaparate, madre, vecino con regalo)
jm-open p2: cine/fachada/taquilla 2026 (sale la tira de entradas, madre y niño entran, llega otra vecina)
jm-open p3: selva/calle/ventana (lianas 0→1: la consola vibra y brotan; gorrión huye)
jm-open p4: hoy/linea/general (traza 0→cartucho con liana+lápiz, «45», niño señala)
jm-open p5: hoy/linea/bucle (traza 0→1 con lápiz grande y liana; destello en la consola)
jm-open p6: taller/casa/general 1979 (escultor dibuja, Lisa con taza, hoja de selva por la ventana)
jm-medalla p1: editorial 'premios/general' (Van Allsburg cruza el escenario; el presentador sale del atril con la medalla; aplausos y confeti)
jm-medalla p2: editorial 'premios/medalla' (la medalla se posa, tres estrellas, destello; calendario a 1986 y segundo libro)
jm-medalla p3: editorial 'esquinas/general' con lupa (una mano lleva la lupa del tren al perro de la esquina; nieva en la lámina)
jm-medalla p4: editorial 'carta/general' (la señora lee junto a la nevera, va a la mesa y escribe; «?» en un bocadillo; gato)
jm-medalla p5: editorial 'carta/sobre' (la mano con la pluma traza el «?» en la carta; sonajero)
jm-medalla p6: casaJuego 'tablero/gema' (un «?» dorado que se deshace; el disco se empaña, sale la hoja, vuelve el color; liana y hojas)
jm-historia p1 (AÑADIDO, vista LIBRE, primera vez en el episodio): taller 'clase/caballete' (una mano dibuja a lápiz una claqueta, el número cuenta 1→14 y la claqueta se cierra; «!»; la mano clava el libro fino: 32)
jm-historia p2: keene 'guionistas/relojes' (el guionista entre los dos relojes; salta la película que le pasa por los pies)
jm-historia p3: keene 'guionistas/general' 1994 (fichas al corcho; bola a la papelera; Van Allsburg entra y lanza la última ficha)
jm-historia p4: casaJuego 'tablero/general' en color (el chico de 1969 arriba a la derecha; la meta se lo traga en espiral; queda una hoja)
jm-historia p5: cine 'calendario/general' 1969→1995 (26 hojas; la caja de la repisa lo devuelve adulto)
jm-nuevo p1: cine 'anuncio' (la noticia en la pantalla de 2015; suben los pulgares abajo y se amontonan las burbujas)
jm-nuevo p2: cine 'anuncio/vela' (la foto en gris con cinco velas; solo se aparta el cursor)
jm-nuevo p3: keene 'guionistas' epoca 2016 (dos guionistas tras la mesa, la caja del juego con polvo en el centro; el chaval pasa por delante a la derecha)
jm-nuevo p4: cine 'salon' epoca 2017 (el chaval con el móvil cruza de derecha a izquierda bajo el estante del tablero)
jm-nuevo p5: cine 'salon/estante' (el tablero tiembla, destello y cartucho; una polilla)
jm-nuevo p7: selva 'caida' (el jugador cae sobre el dosel, cambia de cuerpo; tres corazones grandes arriba a la izquierda)
jm-taquilla p1: cine 'fachada' epoca 2017 rival (noche; nuestra cola corta, gente de 12 px que llega; la cola de las estrellas a la derecha)
jm-taquilla p2: cine 'calendario' 2017→2018 (semanas tachadas en rojo, contador de latón 960 bajo la repisa, fila de chibis con palomitas que cruza por delante)
jm-taquilla p3: selva 'cabana' (la jugadora sube por la escala y señala la tabla)
jm-taquilla p4: selva 'cabana/tabla' graba 1 (un brazo aparta el musgo de las rayas)
jm-taquilla p5: cine 'sala/publico' lleno con gafas (abajo: la entrada «2019» en una mano y el contador 800 en el borde del escenario)
jm-taquilla p6: cine 'contador/suma' total 2027 (a la derecha: cronómetro «10» y el libro fino que deja una mano)
jm-keene p1: keene 'plato/general' (Williams llega con su guion; foco, director y ayudante)
jm-keene p2: keene 'calle/general' rodaje (vecinos, pájaros de la aguja, el pintor cruza con escalera y bote)
jm-keene p3: keene 'pared/general' lavable + andamio (el pintor pinta el zapato; vecinos abajo con «?»)
jm-pelo p1: keene 'efectos/general' (pantalla grande con el león pelado y error; técnico con peluche; «X»)
jm-pelo p2: keene 'plato/camara' (claqueta y peluche de león sujeto por una mano ante el objetivo)
jm-pelo p3: keene 'efectos/pantalla' (ventana de código, melena que crece, mechón de punta con cursor, monos)
jm-pelo p4: cine 'sala/general' (la escena pinta la película entera en la pantalla: selva, león con melena y monos)
jm-estreno p1: cine 'fachada/general' 1995 con cola (familia y vecina con vaho)
jm-estreno p2: cine 'sala/publico' criticos + susto (crítico de pie con bocadillo de estrellas; «$65»)
jm-estreno p3: cine 'contador/general' 65 → 260 (destello y globo terráqueo)
jm-estreno p4: cine 'prensa/periodico' (lápiz rojo subraya la máscara, chispas, cae el folleto)
jm-estreno p5: cine 'prensa/general' (Williams serio; «?» de los periodistas; bocadillo con isla)
jm-estreno p6: VISTA LIBRE NUEVA mapa 'mapa/caribe' = T.mapa(zoom 2.6, centro [-76, 24]) (Florida, Cuba, Bahamas y La Española pintadas por la escena; un lápiz dibuja la isla inventada; avión, chincheta y billetes)
jm-porque p2 (EXTRA, vista libre, entre hoyTaller y ojos; desplaza la numeración: ojos pasa a p3, pasillo/baja p4, juntos p5, reglas p6, meta p7, mesa p8): casaJuego 'cocina/alacena' a lápiz (un mono entre las latas; una mano con el lápiz negro lo remata; el segundo mono se descuelga)
jm-cierre p2 (EXTRA, segunda vez en el episodio, la otra es jm-libro p7; el estudio pasa a p3): casaJuego 'parque/general' EN COLOR (color: 1, hoy) con caja (un chaval llega por la senda, encuentra la caja al pie del árbol y la levanta)
jm-porque p1: hoy 'hoyTaller/general' (Van Allsburg mayor dibuja; el chaval entra con su «?»; bocadillo con sillón + rinoceronte)
jm-porque p3: hoy 'ojos/general' (los ojos van al salón, al rinoceronte y de uno a otro; filo amarillo en el recuadro mirado; aspa roja entre los dos; el ilustrador señala a la derecha)
jm-porque p4: casaJuego 'pasillo/baja' a lápiz (el ratón avisa con «!»; pasan las patas de dos rinocerontes)
jm-porque p5: hoy 'ojos/juntos' (unos ojos en el margen de arriba y un marco rojo: la mirada salta, intenta irse dos veces y una goma la devuelve)
jm-porque p6: hoy 'reglas/general' (la ficha da tres pasos; una mano con cera roja tacha puerta, dado y teléfono)
jm-porque p7: hoy 'reglas/meta' (la ficha llega a la meta; tres lianas arriba a la derecha se retiran; rayos y confeti)
jm-porque p8: hoy 'estudio/mesa' con avance (Atom baja y acompaña a la ficha roja por la espiral; entran los dados; tiembla la mesa y asoma la liana)
jm-cierre p1: hoy 'hoyTaller/esquina' (el lápiz negro y la mano terminan al perro blanco y se retiran; mariquita)
jm-cierre p3: hoy 'estudio/general' con lianas 1 y rollo 0→1 (Atom baja con el folleto, lo deja en el canto de la mesa y el rollo corre por el suelo; la caja junto a la mesa; «!»)
jm-espacio p1: cine 'tele/general' (dos niños tras el sofá miran la serie; uno llega corriendo; notas del altavoz)
jm-espacio p2: cine 'tele/tienda' (la niña señala nuestra caja; el autor llega con el libro nuevo y su etiqueta «2002»)
jm-espacio p3: selva 'espacio/general' (los dos chicos sobre el tablero de hojalata; las instrucciones se van flotando)
jm-espacio p4 (EXTRA, vista LIBRE, primera vez en el episodio): selva 'espacio/ventana' pasa 0→0,6 (el planeta a rayas pasa por la ventana; los chicos flotan)
jm-espacio p5: cine 'fachada/taquilla' 2005 (cartel y pictograma repintados con lo nuestro; un solo cliente, «?», paloma y hojas)
jm-espacio p6: cine 'sala/general' lleno 0,05 (la escena pinta nuestra película en la pantalla; balanza de latón con «=»; cola 3-2-1)
jm-espacio p7: cine 'calendario/caja' polvo 0→1 (un ratón olisquea la caja y estornuda; el año corre a 2016)
jm-velas p1: keene 'plato/general' (desmontaje: dos se llevan un bastidor, cajas, la ayudante con la lista; el pintor cruza por delante con cubo y esponja)
jm-velas p2: keene 'calle/esquina' lavable + pintores (el pintor frota la esquina del letrero con la esponja en un palo; los vecinos lo paran: «!» y corazón)
jm-velas p3: keene 'pared/general' buena 0→1 + andamio (vecinos a la derecha con el bote; baja el andamio, cae la tarde, apliques; el año cambia en el corte)
jm-velas p4: keene 'pared/pie' velas 0→12 (de noche: tres vecinos llegan con velas)
jm-velas p5: keene 'calle/general' 2014 (ramos, notas y velas al pie de la casa de los zapatos, x 118–176; vecinos y un chaval)
jm-pregunta p1: casaJuego 'cocina50/general' (1957, color: el niño llega, se sienta tras la mesa, mueve la ficha y bosteza; el sol se arrastra por el suelo)
jm-pregunta p2: casaJuego 'cocina50/billete' mano: false (ficha azul desde arriba que salta y se desinfla; la mano coge y suelta el billete; «X» roja)
jm-pregunta p3: casaJuego 'tablero/gema' a lápiz (un «?», la mano tira dos dados, el disco se empaña y brota una hoja VERDE en color; mariposa)
jm-pregunta p4: taller 'casa/mesa' tema rino (la mano con la barrita dibuja el salón y el rinoceronte; polvo y difuminado)
jm-pregunta p5: taller 'palabras/papelera' (Van Allsburg tira tres bolas, «?» y luego «!»; la luz del flexo llena el cuarto)
jm-pregunta p6: taller 'palabras/general' intentos →1 (la mano con el lápiz tacha, duda y escribe la J, las rayas y el círculo)
jm-libro p1: casaJuego 'parque/arbol' (Judy y Peter llegan por la izquierda; «!»; ella toca la caja)
jm-libro p2: casaJuego 'salon/piano' (los hermanos abajo a la izquierda, dados al suelo; el león se dibuja y toca una nota: corchea grande)
jm-libro p3: casaJuego 'cocina/general' monos 0→1 (hermanos a la derecha; plátano; relámpago y lluvia pintada por la escena)
jm-libro p4: casaJuego 'pasillo/general' estampida 0→1 (monzón pintado por la escena; hermanos a la izquierda con paraguas rojo que se vuelve; «!» en el jarrón)
jm-libro p5: casaJuego 'tablero/general' (restos de selva alrededor que la meta se traga; color solo al llegar la ficha, se va en «black and white»; barrita de lápiz en la tarima)
jm-libro p6: casaJuego 'salon/general' lluvia + plantas (la mano dibuja el rinoceronte desde abajo; destello; aparece el león)
jm-libro p7: casaJuego 'parque/general' (llegan por la izquierda con la caja gris, la dejan al pie del árbol y se van)
jm-libro p8: casaJuego 'ventana/general' chicos 0.1→0.97 (hermanos a la izquierda del banco; dos figuritas en color con la caja)
jm-libro p9: casaJuego 'ventana/folleto' pasos 0→1 (cae una hoja; «!» sobre el folleto)
