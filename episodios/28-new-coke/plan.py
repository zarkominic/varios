"""Reparto del episodio 28 (La New Coke: el día que Estados Unidos se rebeló por un refresco) en escenas (escribe
escenas.json). Una fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase],
ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Cinco decorados (guion.md): A Atlanta 1886, B la guerra de las colas, C el anuncio, D la rebelión, E hoy.
- DERECHOS: sin logotipos de Coca-Cola ni de Pepsi, sin su letra, sin la onda, sin la botella de contorno, sin jingles ni
  anuncios reales: botellas y latas genéricas de dos colores (rojo y azul) sin letras. Personas reales por sus atributos.
  Hilo de gags: la lata de Atom que suelta espuma.
- Los golpes son NOMBRES DE MARCAS de la misma escena.
- BANDA: Fa mayor, 116 por minuto, motivo alegre propio de los ochenta.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'fa', 'modo': 'mayor', 'tempo': 116, 'motivo': [0, 4, 7, 9, 7, 4, 2, 0]}
E = [
 ('nc-gancho', None, 1, 2, ['cambio', 'catas'],
  ['C y D: una rueda de prensa con una lata roja nueva bajo los focos; corte a una calle con gente que protesta con pancartas (pictogramas: una lata tachada, un corazón roto) y un calendario que pasa 79 hojas.',
   'A, B y E: una caja fuerte que se abre, dos vasos sin marca en una mesa de supermercado, una montaña de cartas y un teléfono que suena; en el estudio de Atom, la lata hace «pssst» y le salta la espuma a la cara (gag 1).'],
  'intriga', ['cambio']),
 ('nc-hola', None, 3, 3, ['hola'],
  ['E: Atom saluda en su estudio, todavía con espuma, junto a una lata genérica.'],
  'curiosidad', []),
 ('nc-pemberton', '1886', 4, 4, ['pemberton'],
  ['A (la farmacia de Atlanta en 1886): Pemberton, farmacéutico con bigote y chaleco, remueve un jarabe oscuro en un perol; en la fuente de soda, un dependiente sirve vasos con agua con gas; un contador de vasos marca 9; hojas y nueces en tarros.'],
  'misterio', []),
 ('nc-candler', None, 5, 5, ['candler'],
  ['A: Candler, de traje y pajarita, firma la compra; la cámara acorazada de un banco se abre despacio y dentro solo hay un papelito doblado (gag 2); dos siluetas se miran; hoy, la cámara en un museo con visitantes.'],
  'misterio', []),
 ('nc-botellas', None, 6, 6, ['botellas'],
  ['A: dos abogados con sombrero entran en el despacho de Candler; él les da un contrato a cambio de una moneda de un dólar; una cadena de botellas genéricas sale de la ciudad en carros y trenes por un mapa.'],
  'aventura', []),
 ('nc-intocable', None, 7, 7, ['intocable'],
  ['A y B: soldados que brindan con botellas genéricas, un anuncio navideño insinuado (sin letras), una familia en el porche en verano; un ejecutivo protege la caja fuerte con los brazos abiertos.'],
  'misterio', []),
 ('nc-reto', '1975', 8, 8, ['reto'],
  ['B (un supermercado de 1975): una mesa con dos vasos sin marca, A y B; una señora prueba, se le iluminan los ojos y señala el vaso azul; una cámara de tele lo graba; los vasos se cambian de sitio como los trileros (gag 3).'],
  'aventura', []),
 ('nc-cuota', None, 9, 9, ['cuota'],
  ['B (la sede de la empresa en Atlanta): una gráfica de dos líneas, roja que baja y azul que sube; en las estanterías del súper, las latas azules ocupan cada vez más sitio; suena una alarma en el despacho.'],
  'aventura', []),
 ('nc-goizueta', None, 10, 10, ['goizueta'],
  ['B: Goizueta, elegante, con gafas y traje oscuro, señala una pizarra; en el laboratorio, científicos con bata mezclan jarabes en probetas; una carpeta con un candado y un mapa de Kansas (pictograma).'],
  'aventura', []),
 ('nc-kansas', None, 11, 11, ['kansas'],
  ['B: un mapa de EE. UU. que se llena de puntos de catas; filas de vasos sin marca; un contador sube hasta 200000; un podio con la lata nueva en el primer puesto.'],
  'aventura', []),
 ('nc-anuncio', '1985', 12, 12, ['anuncio'],
  ['C (la rueda de prensa de Nueva York, abril de 1985): focos, cientos de periodistas con cámaras y micrófonos, un escenario con la lata nueva tapada; alguien tira del paño y se lleva también el mantel (gag 4).'],
  'epico', []),
 ('nc-pepsi', None, 13, 13, ['pepsi'],
  ['C (la oficina del rival): un ejecutivo de traje azul ríe con un periódico con una página entera (rayas, sin letras); los empleados salen de la oficina con globos azules y gorros de fiesta.'],
  'epico', []),
 ('nc-pregunta', None, 14, 14, ['pregunta'],
  ['C: Goizueta en el atril, seguro; los periodistas levantan la mano; un «?» enorme sobre la sala; Goizueta se queda callado y se ajusta las gafas.'],
  'intriga', []),
 ('nc-sotano', None, 15, 15, ['sotano'],
  ['D (un sótano de una casa de 1985): un hombre baja con otra caja de la lata vieja y la torre de cajas se tambalea (gag 6); en una tienda, el estante rojo se vacía mientras el nuevo queda lleno.'],
  'suspense', []),
 ('nc-quejas', None, 16, 16, ['quejas'],
  ['D (la centralita de la empresa): filas de teléfonos que suenan y saltan de la mesa (gag 5); operadoras con cascos; sacos de cartas que llegan; en los bocadillos, una foto de un abuelo con una botella.'],
  'suspense', []),
 ('nc-psiquiatra', None, 17, 17, ['psiquiatra'],
  ['D: un psiquiatra con barba escucha cintas con cascos y se quita las gafas, conmovido; una carta abierta sobre la mesa de Goizueta con un pájaro dodo dibujado (pictograma, sin letras).'],
  'suspense', []),
 ('nc-mullins', None, 18, 18, ['mullins'],
  ['D (Seattle y una calle de protesta): Mullins, con barba y gorra, habla por teléfono en un garaje lleno de pancartas; una manifestación con pancartas de pictogramas (lata tachada); un hombre vacía una lata nueva por una alcantarilla ante una cámara.'],
  'suspense', []),
 ('nc-ciegas', None, 19, 19, ['ciegas'],
  ['B: un manifestante con pancarta prueba dos vasos sin marca con los ojos vendados y elige el nuevo; se quita la venda y se queda de piedra; un «?» sobre la empresa.'],
  'intriga', []),
 ('nc-vuelta', None, 20, 20, ['vuelta'],
  ['C (otra rueda de prensa, julio de 1985): la lata roja de siempre vuelve al escenario con una banda; una tele de salón interrumpe una telenovela con un rótulo de última hora (sin letras: un icono de urgente); un senador habla en el Congreso.'],
  'asombro', ['vuelta']),
 ('nc-gracias', None, 21, 21, ['gracias'],
  ['D: la centralita, ahora con corazones en vez de quejas; los estantes rojos se llenan; la gráfica roja vuelve a subir por encima de la azul.'],
  'asombro', []),
 ('nc-truco', None, 22, 22, ['truco'],
  ['B: un tablero de detective con hilos rojos y la palabra «plan» en pictograma; un directivo canoso, con humor, se encoge de hombros y sonríe ante los periodistas.'],
  'curiosidad', []),
 ('nc-sorbos', None, 23, 23, ['sorbos'],
  ['E (el estudio de Atom): un sorbo pequeño con un azucarillo que brilla; luego una lata entera y un medidor de dulzor que se pasa de rosca; una venda sobre los ojos y una mesa de casa sin venda.'],
  'curiosidad', []),
 ('nc-escaner', '2004', 24, 24, ['escaner'],
  ['E (el laboratorio de neurociencia de Texas en 2004): un voluntario tumbado en el escáner bebe por un tubito; en la pantalla, dos cerebros: con vasos sin marca, igual; al ver la lata roja, una zona se ilumina como un árbol de Navidad (gag 7).'],
  'curiosidad', []),
 ('nc-recuerdo', None, 25, 25, ['recuerdo'],
  ['E: una lengua dibujada pequeña y un cerebro grande lleno de recuerdos (una feria, una Navidad, un abuelo con una botella); una mano cambia una etiqueta y los recuerdos tiemblan.'],
  'ternura', []),
 ('nc-leccion', None, 26, 26, ['leccion'],
  ['E (un aula de una escuela de negocios): un profesor señala una pizarra con la lata nueva y una X; los estudiantes toman notas; un corazón con una regla que no lo mide.'],
  'cierre', []),
 ('nc-cierre', None, 27, 27, ['cierre'],
  ['E (el estudio de Atom): Atom abre otra lata con muchísimo cuidado… y la espuma vuelve a saltar (gag 8).'],
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
assert escenas[-1]['frase_fin'] == 27
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
