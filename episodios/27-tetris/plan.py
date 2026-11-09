"""Reparto del episodio 27 (Tetris: el juego que se escapó de la Unión Soviética) en escenas (escribe escenas.json).
Una fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Cinco decorados (guion.md): A Moscú 1984, B Occidente 1986–1988, C Moscú 1989, D la guerra de los cartuchos, E hoy.
- DERECHOS: nada del juego tal cual (ni el pozo de piezas de colores ni el logotipo): el de 1984, con corchetes de texto
  verde en pantalla negra; las piezas, como bloques sueltos de madera, de lejos o en sombra. Sin la Game Boy ni logos de
  Nintendo, Atari, Tengen o Mirrorsoft: una consola portátil gris genérica. Personas reales por sus atributos.
  Hilo de gags: en el estudio de Atom, las cosas encajan solas y la fila completa desaparece.
- Los golpes son NOMBRES DE MARCAS de la misma escena.
- BANDA: Sol menor, 108 por minuto, motivo propio de aire eslavo (nada de Korobeiniki).
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'sol', 'modo': 'menor', 'tempo': 108, 'motivo': [0, 3, 7, 8, 7, 3, 2, 0]}
E = [
 ('ts-gancho', None, 1, 2, ['laboratorio', 'carrera'],
  ['A (el centro de cálculo de Moscú en 1984, de noche y con nieve): un científico ante un terminal de pantalla verde donde caen piezas hechas de corchetes; corte a una moneda de un rublo que rueda por la mesa y se para; un mapa de Europa partido por una línea de alambre (el Telón de Acero).',
   'B, C y E: un télex que escupe cinta, un magnate de traje con teléfono, un hombre con maleta bajo la nieve de la Plaza Roja; en el estudio de Atom, unos libros caen del cielo y encajan solos en la estantería; cuando una balda se llena, desaparece (gag 1).'],
  'intriga', ['laboratorio']),
 ('ts-hola', None, 3, 3, ['hola'],
  ['E: Atom saluda en su estudio, junto a la estantería de los libros que encajan.'],
  'curiosidad', []),
 ('ts-centro', '1984', 4, 4, ['centro'],
  ['A (el centro de cálculo de la Academia de Ciencias): salas de ordenadores soviéticos con armarios de cinta, científicos con bata; Pázhitnov, joven con barba y gafas, juega en su mesa con un rompecabezas de madera de piezas de cinco cuadrados.'],
  'curiosidad', []),
 ('ts-corchetes', None, 5, 5, ['corchetes'],
  ['A: el terminal Elektronika 60 de cerca: piezas hechas de corchetes [ ] verdes que caen y encajan; una fila completa parpadea y desaparece; un cuaderno con «tetra» y una raqueta de tenis dibujadas (pictogramas, sin letras).'],
  'curiosidad', []),
 ('ts-disquetes', None, 6, 6, ['disquetes'],
  ['A: los compañeros se agolpan detrás del terminal; el café se queda frío en la mano del científico (gag 2); un estudiante joven en un ordenador de oficina; los disquetes pasan de mano en mano por pasillos y salen en un tren hacia el oeste sobre un mapa.'],
  'aventura', []),
 ('ts-estado', None, 7, 7, ['estado'],
  ['A: un sello rojo con una estrella cae sobre una carpeta; el disquete se queda en una caja con candado; un burócrata se rasca la cabeza ante un globo terráqueo.'],
  'intriga', []),
 ('ts-budapest', '1986', 8, 8, ['budapest'],
  ['B (una oficina de un instituto de Budapest): Stein, con traje y bigote, ve el juego en un ordenador; manda un télex a Moscú; la cinta del télex no deja de salir y llena la oficina (gag 3).'],
  'intriga', []),
 ('ts-maxwell', None, 9, 9, ['maxwell'],
  ['B (la torre de oficinas del magnate en Londres y una tienda de informática de EE. UU. en 1988): Stein estrecha la mano a un ejecutivo; el magnate, grande y con cejas pobladas, firma desde su despacho alto; en la tienda, la caja del juego con la Plaza Roja y cúpulas de cebolla (sin letras) en el escaparate.'],
  'intriga', []),
 ('ts-elorg', None, 10, 10, ['elorg'],
  ['C (el edificio gris de la agencia soviética): Bélikov, serio y con traje, apila papeles en su mesa; un contrato con una sola casilla marcada (un ordenador) y dos vacías (una consola de salón y una de bolsillo).'],
  'intriga', []),
 ('ts-reventa', None, 11, 11, ['reventa'],
  ['B: un mapa del mundo con flechas de contratos que saltan de Londres a EE. UU., a Japón y a una máquina recreativa; una torre de bloques de madera mal encajados que se tambalea y se cae.'],
  'intriga', []),
 ('ts-rogers', None, 12, 12, ['rogers'],
  ['E y B (una feria de Las Vegas en 1988 y una oficina de Tokio): Rogers, con bigote y camisa hawaiana, no suelta un ordenador de la feria; en Tokio, un ejecutivo le enseña en secreto una consola de bolsillo gris tapada con un paño.'],
  'aventura', []),
 ('ts-viaje', '1989', 13, 13, ['viaje'],
  ['C (Moscú en febrero de 1989): Rogers hace la maleta y todo encaja a la perfección menos el abrigo de invierno (gag 4); un avión sobre la nieve; Rogers con gorro de piel llama a la puerta de un edificio gris; un guardia lo mira con desconfianza.'],
  'suspense', []),
 ('ts-cartucho', None, 14, 14, ['cartucho'],
  ['C (la sala de reuniones con mesa larga): Bélikov frunce el ceño; Rogers saca un cartucho genérico de su bolsillo; el cartucho sobre la mesa bajo la lámpara; los soviéticos se miran sorprendidos.'],
  'suspense', ['cartucho']),
 ('ts-reuniones', None, 15, 15, ['reuniones'],
  ['C (la sala de reuniones de Elorg, varios días seguidos: la luz de la ventana cambia de mañana a noche): Rogers vuelve una y otra vez con su maletín; un ábaco y unas cuentas sobre la mesa; en una visita entra Pázhitnov, con barba y gafas, y los dos ríen hablando de juegos con un tablero de bloques de madera entre ellos.'],
  'aventura', []),
 ('ts-pasillos', None, 16, 16, ['pasillos'],
  ['C: un pasillo con tres puertas: en una, Stein; en otra, el hijo del magnate con su maletín; en la otra, Rogers; no se ven entre ellos; Rogers sale con un contrato firmado y sonríe bajo la nieve de la Plaza Roja de noche.'],
  'aventura', []),
 ('ts-tengen', None, 17, 17, ['tengen'],
  ['D (un almacén y un despacho de EE. UU.): cajas de cartuchos de otra empresa; el magnate grita por un teléfono rojo; un retrato oficial en una pared del Kremlin (sin rasgos reconocibles, de lejos).'],
  'epico', []),
 ('ts-juicio', None, 18, 18, ['juicio'],
  ['D (el juzgado de EE. UU. en junio de 1989): el juez da un golpe de mazo y las cajas de cartuchos de detrás se apilan en una fila perfecta (gag 5); unos operarios retiran cajas de una tienda; hoy, un cartucho en una vitrina de coleccionista.'],
  'epico', []),
 ('ts-bolsillo', None, 19, 19, ['bolsillo'],
  ['D (una juguetería de 1989): la consola portátil gris genérica en la caja con el juego; niños y adultos jugando en el autobús y en el sofá; un contador que sube hasta treinta y cinco millones.'],
  'epico', []),
 ('ts-sueldo', None, 20, 20, ['sueldo'],
  ['A (el centro de cálculo): Pázhitnov en su mesa con su nómina; una sola moneda rueda por la mesa, da vueltas y se para (gag 6); le traen un ordenador nuevo en una caja.'],
  'ternura', []),
 ('ts-tetriscompany', '1996', 21, 21, ['compania'],
  ['E (una oficina de EE. UU. en 1996): Pázhitnov y Rogers se dan la mano y brindan con dos tazas de café; un contrato con una firma; por la ventana, una ciudad soleada.'],
  'ternura', []),
 ('ts-cerebro', None, 22, 22, ['cerebro'],
  ['E: dentro de una cabeza dibujada como una estantería, filas con un hueco que parpadean y una fila que se completa y se ilumina como un premio.'],
  'asombro', []),
 ('ts-efecto', None, 23, 23, ['efecto'],
  ['E (el laboratorio del sueño de Harvard en 2000): voluntarios que juegan en ordenadores de la época; de noche, uno cierra los ojos en la cama y ve bloques que caen sobre la almohada (gag 7); una investigadora toma notas.'],
  'asombro', []),
 ('ts-gibson', '2023', 24, 24, ['gibson'],
  ['E (un salón de Oklahoma en 2023): un chico de trece años con cascos juega ante una tele vieja; la pantalla se congela; el chico se lleva las manos a la cabeza y grita de alegría.'],
  'asombro', []),
 ('ts-resumen', None, 25, 25, ['resumen'],
  ['E (el estudio de Atom): un repaso en una pizarra: el terminal de corchetes, el disquete, la oficina de Moscú; una fila de bloques se completa y desaparece.'],
  'cierre', []),
 ('ts-cierre', None, 26, 26, ['cierre'],
  ['E (el estudio de Atom): Atom intenta meter un libro más en la estantería llena y la balda entera desaparece (gag 8).'],
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
assert escenas[-1]['frase_fin'] == 26
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
