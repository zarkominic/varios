"""Reparto del episodio 26 (Atari enterró sus juegos en el desierto) en escenas (escribe escenas.json).
Una fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Cinco decorados (guion.md): A Atari en 1982, B las tiendas, C el desierto, D la excavación, E hoy.
- SIN E.T. DIBUJADO ni logos: el juego se enseña con su cartucho genérico y pantallas inventadas al estilo de la consola
  (fosos, un teléfono, flores). Personas reales por sus atributos. Hilo de gags: un cartucho que se cae en un foso.
- Los golpes son NOMBRES DE MARCAS de la misma escena.
- BANDA: Mi mayor, 120 por minuto, motivo de arcade propio.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'mi', 'modo': 'mayor', 'tempo': 120, 'motivo': [0, 4, 7, 12, 7, 4, 0, 7]}
E = [
 ('at-gancho', None, 1, 2, ['entierro', 'pistas'],
  ['C (el vertedero de Alamogordo de noche en 1983): camiones que vuelcan cajas de cartuchos, una apisonadora y una hormigonera que las tapa; corte a 2014: una excavadora que levanta la tierra y un cartucho que asoma.',
   'E y A: un cronómetro de cinco semanas, una gráfica que se desploma, un diván de psicólogo; el cartucho del estudio de Atom rueda y cae en un foso que se abre en el suelo (gag 1).'],
  'intriga', ['entierro']),
 ('at-hola', None, 3, 3, ['hola'],
  ['E: Atom saluda junto a una consola vieja y una caja de cartuchos.'],
  'curiosidad', []),
 ('at-pong', '1972', 4, 4, ['pong'],
  ['A (un bar de California en 1972 y un salón de 1977): una máquina de Pong con dos rayas y una pelota y gente jugando; después, una familia con la consola nueva conectada a la tele y cartuchos en la mesa; un ejecutivo de traje firma la compra.'],
  'aventura', []),
 ('at-et', '1982', 5, 5, ['pelicula'],
  ['A y B: la cola de un cine de 1982 que da la vuelta a la manzana (cartel sin letras: una luna y una bicicleta en silueta); en las oficinas de Atari, unos ejecutivos firman con un maletín de dinero.'],
  'aventura', []),
 ('at-calendario', None, 6, 6, ['calendario'],
  ['A (las oficinas de Atari en 1982): un calendario gigante de julio a septiembre con el 1 de septiembre rodeado en rojo; un cronómetro; Warshaw, joven con pelo rizado, recibe el encargo.'],
  'aventura', []),
 ('at-warshaw', None, 7, 7, ['warshaw'],
  ['A (el despacho del programador de noche): Warshaw teclea en su terminal entre tazas de café; el calendario de la pared pierde hojas a toda velocidad (gag 2); en la pantalla de la tele, un juego inventado con fosos, un teléfono por piezas y flores.'],
  'aventura', []),
 ('at-millones', None, 8, 8, ['millones'],
  ['A y B: una fábrica de cartuchos que escupe cajas sin parar; un salón de Navidad de 1982 donde un niño abre el regalo, juega y en la tele el protagonista cae en un foso, sale y vuelve a caer (gag 3); cajas de devoluciones en una tienda.'],
  'curiosidad', []),
 ('at-defensa', None, 9, 9, ['defensa'],
  ['E: Warshaw de hoy, con barba, sonríe en un escenario; en la pantalla de la tele, el juego retocado por aficionados: el protagonista salta por encima de los fosos.'],
  'curiosidad', []),
 ('at-pacman', None, 10, 10, ['pacman'],
  ['B (un almacén): torres de cajas de cartuchos genéricos con un comecocos amarillo propio (no el de la marca) hasta el techo; un recuento: 12 millones de cajas frente a 10 millones de consolas.'],
  'curiosidad', []),
 ('at-chatarra', None, 11, 11, ['chatarra'],
  ['B (una tienda de juguetes de 1982): estanterías abarrotadas de cartuchos con portadas chillonas e iguales; un comprador duda con dos cajas en la mano; al lado, un ordenador personal con su teclado y una etiqueta de precio parecida.'],
  'curiosidad', []),
 ('at-derrumbe', '1983', 12, 12, ['derrumbe'],
  ['B (la misma tienda en 1984): cajas de rebajas; una etiqueta de precio baja de 30 a 1 y el cartucho se encoge de vergüenza (gag 4); una gráfica de barras que cae un 97 %.'],
  'suspense', ['derrumbe']),
 ('at-perdidas', None, 13, 13, ['perdidas'],
  ['A (la sala de juntas): ejecutivos serios ante una gráfica en rojo; una portada de revista con un hula hoop que rueda solo; un letrero de «se vende» en la puerta (sin letras: una flecha y una llave).'],
  'suspense', []),
 ('at-japon', None, 14, 14, ['japon'],
  ['B (una tienda de Tokio en 1983): una consola de cartuchos roja y blanca de Nintendo (genérica, sin logo) con cola de niños; un barco cruza el océano hacia América.'],
  'suspense', []),
 ('at-almacenes', None, 15, 15, ['almacenes'],
  ['A (un almacén de Atari): pasillos llenos de cajas, consolas y piezas con polvo; un gerente echa cuentas y señala un camión.'],
  'suspense', []),
 ('at-camiones', None, 16, 16, ['camiones'],
  ['C (el vertedero de Alamogordo en septiembre de 1983): camiones que llegan de El Paso, vuelcan cajas, la apisonadora pasa por encima y un cartucho salta y se escapa (gag 5); la hormigonera echa cemento.'],
  'misterio', []),
 ('at-nyt', None, 17, 17, ['periodico'],
  ['C (el pueblo de noche): un periódico sale de la imprenta con una foto del vertedero; unos chicos con linternas saltan la valla y rescatan cartuchos.'],
  'misterio', []),
 ('at-leyenda', None, 18, 18, ['leyenda'],
  ['E (pantallas de distintas épocas): una revista de los noventa, un foro de internet y un documental repiten la leyenda; el número de cartuchos crece de mil a millones como un globo.'],
  'misterio', []),
 ('at-nintendo', '1985', 19, 19, ['nintendo'],
  ['B (una tienda de Nueva York en 1985): la consola gris de Nintendo (genérica, sin logo) en un escaparate con un sello dorado de calidad (sin letras); familias que vuelven a comprar.'],
  'misterio', []),
 ('at-excavacion', '2014', 20, 20, ['excavacion'],
  ['D (el vertedero en 2014): carpas, cámaras de televisión y cientos de personas con camisetas retro; las excavadoras levantan capas de basura; Warshaw entre el público.'],
  'asombro', ['excavacion']),
 ('at-hallazgo', None, 21, 21, ['hallazgo'],
  ['D: la pala saca un cartucho todavía en su caja y todo el público hace «¡oh!» (gag 6); junto a él salen otros cartuchos, consolas y piezas.'],
  'asombro', []),
 ('at-arqueologos', None, 22, 22, ['arqueologos'],
  ['D (la carpa de los arqueólogos): pinceles, bolsas con etiquetas numeradas, un periódico de 1983 que sale entre la basura y fecha la capa.'],
  'asombro', []),
 ('at-heller', None, 23, 23, ['heller'],
  ['D: Heller, ya mayor, cuenta delante de las cámaras; un contador baja de «millones» a 728.000; mesas con 1.300 cartuchos ordenados; una subasta en una pantalla.'],
  'asombro', []),
 ('at-documental', None, 24, 24, ['documental'],
  ['A y E: una vitrina de museo con un cartucho iluminado; en una pantalla, el documental (sin título legible).'],
  'asombro', []),
 ('at-pauta', None, 25, 25, ['pauta'],
  ['E (la consulta de un psicoterapeuta en Silicon Valley): Warshaw escucha en un sillón a un paciente con una sudadera de videojuegos; en la mesa, un cartucho viejo.'],
  'cierre', []),
 ('at-cierre', None, 26, 26, ['cierre'],
  ['E (el estudio de Atom): Atom se asoma al foso para sacar el cartucho y se cae él (gag 7).'],
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
