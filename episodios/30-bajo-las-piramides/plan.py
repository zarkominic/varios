"""Reparto del episodio 30 (Bajo las pirámides: lo que dicen que hay y lo que se ha comprobado) en escenas (escribe
escenas.json). Una fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase],
ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Seis decorados (guion.md): A Giza hoy, B Italia 2025 (la conferencia), C «según ellos» (plano azul / holograma),
  D dentro de Keops, E Hawara (450 a. C. y 1888), F hoy (estudio de Atom, satélite, corte del suelo, redacción).
- LO QUE DICEN LOS ITALIANOS se dibuja SIEMPRE en el decorado C: trazo de plano azul o holograma, con su propio código
  visual (líneas cian sobre azul oscuro, rejilla, cotas sin letras), nunca como un decorado real. Lo comprobado, en el
  estilo de siempre. Personas reales por sus atributos; nada de burla: «no comprobado» no es «mentira».
  Hilo de gags: la pirámide de pisapapeles de Atom y su sala secreta.
- Los golpes son NOMBRES DE MARCAS de la misma escena.
- BANDA: Do menor, 88 por minuto, motivo de aire egipcio (segunda menor frigia).
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'do', 'modo': 'menor', 'tempo': 88, 'motivo': [0, 1, 3, 5, 7, 5, 3, 1]}
E = [
 ('gz-gancho', None, 1, 2, ['pozos', 'camino'],
  ['A y C: la meseta de Giza al atardecer con Kefrén en el centro; la imagen se vuelve plano azul y bajo la pirámide se dibujan ocho pozos con su espiral que bajan y bajan (golpe); signos de interrogación; corte a la cara norte de Keops con una cámara diminuta que asoma por una rendija.',
   'D, E y F: el pasillo de 2023 con su techo en tejado a la luz de una linterna; un viajero griego ante un laberinto de columnas; en el estudio de Atom, Atom levanta la punta de su pirámide de pisapapeles buscando una sala secreta: dentro, nada (gag 1).'],
  'misterio', ['pozos']),
 ('gz-hola', None, 3, 3, ['hola'],
  ['F: Atom saluda en su estudio, con la pirámide de pisapapeles en la mesa y una lupa.'],
  'curiosidad', []),
 ('gz-conferencia', '2025', 4, 4, ['conferencia'],
  ['B (Italia, 15 de marzo de 2025): una sala de conferencias pequeña con sillas, un público corto y una pantalla; en la mesa, tres hombres: un químico mayor de pelo blanco y gafas (Malanga), un ingeniero con barba corta y portátil (Biondi) y un investigador con chaqueta (Mei); en la pantalla, la pirámide vista desde un satélite; el plano azul sale al revés y lo giran (gag 2).'],
  'asombro', []),
 ('gz-salas', None, 5, 5, ['salas'],
  ['C (según ellos, en plano azul): el corte de Kefrén en líneas cian sobre azul oscuro, con rejilla; dentro y debajo, cinco salas que se encienden una a una, unidas por pasillos rectos; más abajo, ocho pozos huecos que bajan en vertical, y alrededor de cada uno una rampa en espiral que gira como la rosca de un tornillo.'],
  'asombro', []),
 ('gz-cubos', None, 6, 6, ['cubos'],
  ['C (según ellos): la cámara baja por los pozos, con una regla de cotas sin letras al lado (la pirámide pequeña arriba para la escala); al fondo, dos cubos enormes que se dibujan línea a línea; más abajo, estructuras que se pierden en la oscuridad.'],
  'asombro', []),
 ('gz-leyendas', None, 7, 7, ['leyendas'],
  ['C y F: el plano azul se llena de símbolos de leyenda (puertas, salas con columnas) junto a la Esfinge; un vidente de los años treinta (traje, corbata, ojos cerrados) junto a una Esfinge holográfica; corte a pantallas de móviles y teles del mundo con los dibujos azules.'],
  'asombro', []),
 ('gz-radar', None, 8, 8, ['radar'],
  ['F: un satélite de radar en órbita con su gran panel, sobre la Tierra de noche y con nubes; las ondas bajan hacia Giza y el eco vuelve; el satélite saca una trompetilla de oído enorme y la apunta a la pirámide (gag 3).'],
  'curiosidad', []),
 ('gz-vibra', None, 9, 9, ['vibra'],
  ['A y F: la pirámide de Kefrén vibra un poquito (ondas finas en el aire, arena que tiembla, viento); en el estudio, Atom da golpecitos en la pared buscando el hueco, suena hueco y detrás está el armario (gag 4).'],
  'curiosidad', []),
 ('gz-articulo', None, 10, 10, ['articulo'],
  ['F y C: una revista científica en una mesa (portada sin letras, con una pirámide en plano azul); el corte de Keops en plano azul con sus salas conocidas (la del Rey, la de la Reina, la Gran Galería) y otras más en otro color.'],
  'curiosidad', []),
 ('gz-mezcla', None, 11, 11, ['mezcla'],
  ['A: la Gran Pirámide de Keops de día; dos imágenes que se separan: a un lado el satélite, al otro unos científicos con cascos y cajas de detectores que entran por la puerta; de lo alto caen rayitas de luz (los muones) que atraviesan el cielo.'],
  'epico', []),
 ('gz-muones', None, 12, 12, ['muones'],
  ['F y D: los rayos cósmicos chocan con la atmósfera y nace una lluvia de puntitos de luz que atraviesa nubes, casas y piedra; dentro de la pirámide, unos pasan por el hueco y otros se paran en la roca; una placa se ilumina más donde hay vacío, como una radiografía.'],
  'epico', []),
 ('gz-vacio', '2017', 13, 13, ['vacio'],
  ['D (dentro de Keops): la Cámara de la Reina con placas de película y cajas de detectores en el suelo; investigadores japoneses y franceses con linternas frontales; fuera, detectores al pie de la pirámide; por encima de la Gran Galería se enciende un gran vacío alargado (golpe).'],
  'epico', ['vacio']),
 ('gz-rendija', None, 14, 14, ['rendija'],
  ['D: la cara norte de Keops con los grandes bloques en forma de tejado; andamio y técnicos; una cámara más fina que un lápiz entra por una rendija entre dos piedras; al otro lado, una nube de polvo antiguo la hace «estornudar» (gag 5).'],
  'epico', []),
 ('gz-pasillo', '2023', 15, 15, ['pasillo'],
  ['D: la imagen de la cámara: un pasillo vacío con el techo en tejado que se pierde en la oscuridad; corte a una rueda de prensa al pie de la pirámide con el ministro y la imagen en una pantalla; periodistas y cámaras.'],
  'epico', ['pasillo']),
 ('gz-osiris', None, 16, 16, ['osiris'],
  ['A: la calzada de Kefrén hacia la Esfinge; un corte del suelo con el pozo de Osiris y sus tres niveles: escaleras, sarcófagos de granito en salas de roca y, abajo, uno rodeado de agua y columnas; una regla de cotas: treinta metros, pequeña al lado de la pirámide.'],
  'epico', []),
 ('gz-ele', None, 17, 17, ['ele'],
  ['A: el cementerio de mastabas junto a Keops; un equipo japonés y egipcio empuja un carrito de radar de suelo; en la pantalla, una forma en L enterrada a pocos metros, rellena de arena, y una mancha más abajo con un signo de interrogación.'],
  'epico', []),
 ('gz-diez', None, 18, 18, ['diez'],
  ['F: un corte del suelo de Giza: el radar del satélite entra un poco en la arena y se para (una línea de diez metros), y la onda rebota y vuelve al satélite como una pelota (gag 6); Biondi, en un vídeo, levanta las manos.'],
  'intriga', []),
 ('gz-expertos', None, 19, 19, ['expertos'],
  ['F y C: un experto en radar con su carrito en un campo (Conyers: barba gris, sombrero); una arqueóloga ante pantallas de satélite (Parcak); el corte del suelo con la capa de agua subterránea a pocas decenas de metros; en el plano azul, los cubos del fondo se llenan de agua como una pecera (gag 7).'],
  'intriga', []),
 ('gz-hawass', None, 20, 20, ['hawass'],
  ['A y B: el antiguo ministro (sombrero de ala ancha, camisa vaquera) ante la pirámide, negando con el dedo; el suelo bajo la pirámide, roca maciza; corte a la sala de conferencias y a pantallas de vídeo, sin revista.'],
  'intriga', []),
 ('gz-retirada', '2026', 21, 21, ['retirada'],
  ['F (la redacción de una revista científica, agosto de 2026): editores con gafas revisan el artículo de 2022; un sello rojo (sin letras) cae sobre la portada; los autores, en otra mesa, niegan con la cabeza y siguen con sus papeles.'],
  'intriga', ['retirada']),
 ('gz-permiso', None, 22, 22, ['permiso'],
  ['F y A: una balanza con «no comprobado» y «mentira» en dos platillos distintos (iconos sin letras: una lupa y una cruz); una carpeta de solicitud que viaja a un despacho de El Cairo; una linterna que baja por un pozo de verdad.'],
  'intriga', []),
 ('gz-herodoto', None, 23, 23, ['herodoto'],
  ['E (hacia el 450 a. C.): un viajero griego (Heródoto: barba, túnica, sombrero de viaje, rollo bajo el brazo) cruza un gran lago en barca; aparece un edificio inmenso de piedra con patios y columnas; se queda con la boca abierta y compara con las pirámides al fondo.'],
  'aventura', []),
 ('gz-escalera', None, 24, 24, ['escalera'],
  ['E: dentro del laberinto, patios techados y pasillos con columnas; Heródoto recorre las salas de arriba con un guía; al llegar a una escalera que baja, un guardián le cierra la puerta en la cara y se le vuela el sombrero (gag 8); un cocodrilo sagrado pintado en la pared.'],
  'aventura', []),
 ('gz-petrie', None, 25, 25, ['petrie'],
  ['E (Hawara, 1888): la pirámide de adobe medio derruida; un arqueólogo británico (Petrie: barba, sombrero, ropa de campaña) con trabajadores y cestas descubre, bajo un lecho enorme de esquirlas de piedra, la huella de un edificio que se pierde a lo lejos.'],
  'aventura', []),
 ('gz-mataha', None, 26, 26, ['mataha'],
  ['E (2008): un equipo con aparatos de escaneo y cables sobre la base de Petrie; en una pantalla, una rejilla de muros enterrados en plano azul (según ellos), con un signo de interrogación grande.'],
  'aventura', []),
 ('gz-promesa', None, 27, 27, ['promesa'],
  ['F y D: Atom en su estudio, ante su pirámide de pisapapeles, imagina puertas escondidas; recuerdo del vacío de 2017 y del pasillo de 2023 que se encienden.'],
  'calma', []),
 ('gz-camino', None, 28, 28, ['camino'],
  ['F, D y C: dos caminos: a la izquierda, el pasillo de 2023 (medido, publicado, mirado con una cámara); a la derecha, los pozos azules (según ellos), con un signo de interrogación que no se va.'],
  'calma', []),
 ('gz-secretos', None, 29, 29, ['secretos'],
  ['A: Giza de noche con las estrellas; dos tipos de secretos: el pasillo iluminado y los pozos azules en holograma, uno al lado del otro; una linterna que espera en la entrada.'],
  'cierre', []),
 ('gz-cierre', None, 30, 30, ['cierre'],
  ['F (el estudio de Atom): Atom mete una linterna en su pirámide de pisapapeles y encuentra, por fin, algo: el lápiz que había perdido (gag 9).'],
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
assert escenas[-1]['frase_fin'] == 30
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
