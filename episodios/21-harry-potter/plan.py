"""Reparto del episodio 21 (Harry Potter: lo que hay que saber antes de la serie de HBO) en escenas (escribe escenas.json).
Una fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo, golpes).
- Desde el 21 cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento (regla del usuario): cada párrafo dura
  unos 12–18 s y lleva 3 o 4 planos de 4–7 s, cortados en la palabra. Ningún encuadre se repite dentro de una escena.
- Cinco decorados (guion.md): A Privet Drive, B el callejón Diagon, C Hogwarts, D lo real, E hoy.
- Personajes reconocibles por sus atributos (ELENCO_HP), dibujados por nosotros, sin logos ni clips ni música de las
  películas. Hilo de gags: una snitch dorada con ojos que nunca se deja coger.
- Los golpes son NOMBRES DE MARCAS de la misma escena (en el 20, un golpe con otro nombre llenó de NaN la música).
- BANDA: Fa lidio, 104 por minuto, caja de música propia que sube como un hechizo.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'fa', 'modo': 'lidio', 'tempo': 104, 'motivo': [0, 4, 6, 7, 11, 9, 7, 4]}
E = [
 # ── 0 · El gancho ──
 ('hp-gancho', None, 1, 2, ['navidad', 'hbo'],
  ['A: Privet Drive en Nochebuena, nevando: las casas iguales con luces de Navidad; de la chimenea del número 4 salen volando cientos de cartas (gag 2) y la snitch con ojos sale entre ellas; un niño con gafas redondas y cicatriz se asoma a la ventana.',
   'E: el salón de la fan en Navidad: árbol, chimenea con calcetines, tele encendida; en la pantalla, un calendario 12·25 dorado y siete libros en fila que se iluminan uno a uno; ocho fichas de episodio caen sobre el primero.'],
  'asombro', ['navidad']),
 ('hp-hola', None, 3, 4, ['preguntas', 'hola'],
  ['E (otra cámara): un corcho con cuatro pistas: unas gafas, una lista de reparto sin letras, unas tijeras sobre un rollo de película y un signo de interrogación con una moto voladora; la snitch revolotea de una a otra.',
   'E: Atom saluda; la snitch se esconde detrás de él (gag 1).'],
  'curiosidad', []),
 # ── 1 · Qué es la serie ──
 ('hp-serie', '2026', 5, 5, ['nombre'],
  ['E (plató de rodaje): un estudio con una claqueta sin letras, focos, una cámara de cine; una guionista con libreta y un director detrás del monitor; en el monitor, el castillo.'],
  'aventura', []),
 ('hp-leavesden', None, 6, 6, ['estudio'],
  ['E (plató, otra cámara): naves del estudio en el campo inglés; dentro, un decorado del Gran Comedor a medio montar; un compositor con el pelo largo ante un piano y una orquesta de chibis; la snitch se posa en el atril.'],
  'aventura', []),
 ('hp-trailer', None, 7, 7, ['trailer'],
  ['E (salón): la tele enseña el expreso de Hogwarts rojo echando vapor, el sombrero seleccionador, un tablero de ajedrez gigante y un espejo de marco dorado; un contador de reproducciones sube hasta 277 millones.'],
  'aventura', []),
 ('hp-poster', None, 8, 8, ['poster'],
  ['C (el castillo de noche): un póster gigante con unas gafas redondas que reflejan el castillo iluminado; la snitch se mira en los cristales.'],
  'asombro', []),
 ('hp-coste', None, 9, 9, ['coste'],
  ['E (plató): una montaña de monedas de oro que crece junto a la cámara; un contable con gafas apunta cifras; un cartel con un 2 tachado y un reloj de arena: no habrá una temporada cada año.'],
  'aventura', []),
 # ── 2 · Quién es quién ──
 ('hp-tren', None, 10, 11, ['bajando', 'trio'],
  ['C (el andén de Hogsmeade de noche): el expreso llega con vapor; Harry baja del tren con su baúl y una lechuza blanca en la jaula.',
   'C (el vagón): Harry, Ron (pelo rojo, mancha en la nariz) y Hermione (pelo rizado, ya con la túnica puesta) en el compartimento; una rata dormida en el regazo de Ron; caramelos de todos los sabores.'],
  'epico', []),
 ('hp-hagrid', None, 12, 12, ['hagrid'],
  ['C (el lago de noche): Hagrid enorme con barba y un farol; las barcas cruzan el lago hacia el castillo iluminado; en la puerta, McGonagall con sombrero puntiagudo y túnica verde espera seria.'],
  'epico', []),
 ('hp-mesa', None, 13, 13, ['profesores'],
  ['C (el Gran Comedor): velas flotantes y techo de estrellas; en la mesa de los profesores, Dumbledore (barba blanca larga, gafas de media luna) sonríe, Snape (pelo negro, túnica negra) mira mal y Quirrell (turbante morado) se pone nervioso.'],
  'epico', []),
 ('hp-peeves', None, 14, 14, ['flitwick'],
  ['C (un aula de encantamientos): el profesor Flitwick, bajito, de pie sobre una pila de libros, hace flotar una pluma; por el pasillo pasa Peeves, un fantasma bromista con sombrero de campanillas, tirando tizas (gag 3); la snitch esquiva una.'],
  'epico', []),
 # ── 3 · Lo que la película se saltó ──
 ('hp-cortes', None, 15, 15, ['rodaron'],
  ['E (sala de montaje): una moviola con tiras de película; unas tijeras cortan un trozo con la silueta de Peeves y cae al suelo, donde hay más trozos; la snitch lo recoge.'],
  'curiosidad', []),
 ('hp-draco', None, 16, 16, ['tienda'],
  ['B (la tienda de túnicas): taburetes y una costurera con alfileres; Harry y un chico rubio pálido de pelo engominado (Draco) se prueban túnicas; por el escaparate se ve a Hagrid con un helado, y Draco lo señala con desprecio.'],
  'curiosidad', []),
 ('hp-banquete', None, 17, 17, ['sombrero'],
  ['C (el Gran Comedor, otra cámara): el sombrero seleccionador abre la boca y canta sobre un taburete; la snitch se tapa los oídos (gag 4); Dumbledore se levanta, abre los brazos (cuatro estrellitas de palabras sin sentido) y se vuelve a sentar.'],
  'curiosidad', []),
 ('hp-binns', None, 18, 18, ['binns'],
  ['C (un aula polvorienta): un profesor fantasma, viejo y transparente, sale flotando de la pared junto a la chimenea y da clase con una tiza; los alumnos se duermen sobre los pupitres.'],
  'curiosidad', []),
 ('hp-flauta', None, 19, 19, ['flauta'],
  ['C (la cabaña de Hagrid en Navidad, con nieve): Hagrid le da a Harry una flauta de madera tallada; corte a la torre más alta de noche: cuatro escobas con sus jinetes recogen una caja de la que asoma un bebé dragón verde que estornuda una chispa (gag 5).'],
  'curiosidad', []),
 ('hp-bosque', None, 20, 20, ['castigo'],
  ['C (el bosque prohibido de noche): Harry, Hermione, Neville (redondo, con su sapo) y Draco con farol detrás de Hagrid; entre los árboles aparecen tres centauros. Corte al campo de quidditch: Harry atrapa la snitch en un suspiro y Snape, de árbitro, frunce el ceño.'],
  'curiosidad', []),
 ('hp-pociones', None, 21, 21, ['acertijo'],
  ['C (una sala subterránea con fuego negro y morado): siete botellas de formas distintas en una mesa y un pergamino con un acertijo; Hermione lo lee y señala una botella pequeña. Primer plano: los ojos de Harry, verdes.'],
  'curiosidad', []),
 # ── 4 · Las pistas (con aviso de destripe) ──
 ('hp-aviso', None, 22, 23, ['aviso', 'moto'],
  ['E (salón): un cartel de aviso de destripe con un rayo, que tiembla; la snitch se tapa los ojos.',
   'A (Privet Drive de noche, la primera noche): una moto voladora gigante baja del cielo con Hagrid y un bebé en brazos; un gato atigrado en la tapia observa.'],
  'misterio', ['aviso']),
 ('hp-apagador', None, 24, 24, ['apagador'],
  ['A (Privet Drive de noche, otra cámara): un anciano de barba blanca hace clic con un aparato plateado y las farolas se apagan una a una, sus luces vuelan dentro del aparato. Corte al zoo: tras un cristal, una boa enorme le guiña un ojo a Harry.'],
  'misterio', []),
 ('hp-rata', None, 25, 25, ['rata'],
  ['C (la sala común de Gryffindor): Scabbers duerme en el bolsillo de Ron; la snitch la vigila con lupa y la rata abre un ojo (gag 6). Neville con su sapo junto a la chimenea mira una carta de su abuela.'],
  'misterio', []),
 ('hp-banco', None, 26, 26, ['banco'],
  ['B (el banco de los duendes): una vagoneta baja por raíles hacia una cámara acorazada con el número 713 (a_cifras); un duende con orejas puntiagudas abre la puerta y Hagrid saca un paquetito. Corte: Dumbledore ante un espejo de marco dorado con unos calcetines de lana en las manos; la snitch se pone uno de gorro (gag 7).'],
  'misterio', []),
 # ── 5 · Lo real detrás de la historia ──
 ('hp-tren90', '1990', 27, 27, ['tren'],
  ['D (un tren parado en el campo inglés, de día): una mujer joven de pelo largo mira por la ventanilla las vacas; sobre su cabeza aparece, como un globo, un niño con gafas; una lechuza pasa por la ventanilla (gag 8).'],
  'ternura', []),
 ('hp-cafes', None, 28, 28, ['cafes'],
  ['D (un café de Edimburgo): la mujer escribe a mano en una mesa junto a la ventana con un carrito de bebé al lado; luego, una pila de cartas de rechazo en un buzón que se desborda.'],
  'ternura', []),
 ('hp-imprenta', '1997', 29, 29, ['bloomsbury'],
  ['D (una imprenta pequeña): sale una pila de 500 libros de tapa dura; la mayoría van en cajas hacia una biblioteca; un editor americano cambia la portada de una piedra roja por otra.'],
  'ternura', []),
 ('hp-flamel', None, 30, 30, ['flamel'],
  ['D (París medieval): un escribano con capucha copia un libro en su puesto; una casa de piedra con el año 1407 (a_cifras); corte a un museo con una lápida antigua tras un cordón.'],
  'ternura', []),
 ('hp-subasta', None, 31, 31, ['subasta'],
  ['D (una sala de subastas): un martillo golpea; en la pantalla, 471.000 (a_cifras); detrás, una montaña de libros que crece hasta el techo.'],
  'ternura', []),
 # ── 6 · El cierre ──
 ('hp-preparado', None, 32, 32, ['preparado'],
  ['E (salón): Atom y la snitch en el sofá con una manta; en la tele, un castillo; sobre la mesa, un libro abierto con una piedra roja en la portada.'],
  'cierre', []),
 ('hp-cierre', None, 33, 34, ['detalles', 'casa'],
  ['C (el Gran Comedor vacío de noche): una lupa recorre la mesa y encuentra detalles: una moto en miniatura, un calcetín, una rata.',
   'E (salón): cuatro estandartes sin letras de colores (rojo, verde, amarillo, azul); Atom intenta atrapar la snitch y falla otra vez.'],
  'cierre', []),
]

escenas = []
for id_, cartela, a, b, marcas, vis, animo, golpes in E:
    assert len(marcas) == len(vis) == b - a + 1, id_
    assert all(g in marcas for g in golpes), (id_, golpes)
    escenas.append({'id': id_, 'estilo': 'pixel', 'cartela': cartela, 'frase_ini': a, 'frase_fin': b,
                    'marcas': marcas, 'guion_visual': vis, 'animo': animo, 'golpes': golpes,
                    'empieza_con': 'cartela ' + cartela if cartela else 'corte desde la escena anterior',
                    'termina_con': '', 'produccion': ''})
assert [e['frase_ini'] for e in escenas][1:] == [e['frase_fin'] + 1 for e in escenas][:-1]
assert escenas[-1]['frase_fin'] == 34
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
