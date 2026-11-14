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
