"""Reparto del episodio 23 (Las tradiciones del año: de dónde vienen de verdad) en escenas (escribe escenas.json).
Una fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Cinco decorados (guion.md): A Año Nuevo, B el amor, C primavera y otoño, D las celebraciones, E hoy.
- Personajes reconocibles por sus atributos, dibujados por nosotros, sin logos ni letras. «Happy Birthday» solo se
  nombra: no suena ni se ve su letra. Hilo de gags: una uva con ojos que no se deja comer.
- Tono: respeto a la Pascua, Todos los Santos y San Valentín (la fe como fe, el folclore como folclore); nada morboso
  (la cachetada al rey sin violencia, el diablo de Jack como cuento).
- Los golpes son NOMBRES DE MARCAS de la misma escena.
- BANDA: La mayor, 108 por minuto, motivo de campanas de fiesta propio.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'la', 'modo': 'mayor', 'tempo': 108, 'motivo': [0, 4, 7, 12, 11, 7, 9, 7]}
E = [
 # ── 0 · El gancho ──
 ('tr-gancho', None, 1, 2, ['uvas', 'anzuelos'],
  ['A: la Puerta del Sol de noche el 31 de diciembre, con el reloj de la torre y la multitud; cada persona con su racimo; la bola baja y la gente se mete uvas en cada campanada; la uva con ojos salta del racimo de Atom y se escapa (gag 1); un periódico antiguo de Madrid con un «1894» y unas uvas dibujadas se enciende junto al «1909» tachado.',
   'E: el salón de Atom con un calendario gigante; tres estampas se iluminan una tras otra: un rey con corona y la mano de una cachetada (sin violencia, cómico), una carta con un corazón tras unos barrotes, y un pastel con velas junto a una montaña de monedas; el calendario pasa sus hojas saltándose diciembre.'],
  'asombro', ['uvas']),
 ('tr-hola', None, 3, 3, ['hola'],
  ['E: Atom saluda en el salón; la uva con ojos se esconde detrás del calendario.'],
  'curiosidad', []),
 # ── 1 · Año Nuevo ──
 ('tr-burla', None, 4, 4, ['burla'],
  ['A (Madrid, una casa burguesa de 1890): una familia elegante con copas de champán y un racimo de uvas a la francesa; en la calle, unos madrileños con gorra los imitan comiendo uvas de broma; corte a un viñedo de Alicante en 1909 con cajas de uvas que sobran y un cartel con una uva dorada (sin letras).'],
  'aventura', []),
 ('tr-campanadas', None, 5, 5, ['tele'],
  ['A (un salón con una tele de 1962): la familia frente a la tele en blanco y negro que muestra el reloj de la Puerta del Sol; corte a un mapa con uvas que aparecen en México y Filipinas; una chica come uvas debajo de la mesa; unos calzones rojos y amarillos en un tendedero y alguien que sale con una maleta a dar la vuelta a la cuadra, con un «?» encima.'],
  'aventura', []),
 ('tr-calendario', None, 6, 6, ['calendario'],
  ['A (el despacho de un recaudador inglés de 1752): un calendario de pared que pasa de marzo a enero; Julio César en un relieve romano con un calendario de piedra; una iglesia medieval con la Anunciación; el recaudador cambia la hoja del libro de cuentas a abril.'],
  'aventura', []),
 ('tr-babilonia', None, 7, 7, ['babilonia'],
  ['A (un templo de Babilonia con zigurat al fondo): el sacerdote le quita la corona al rey y le da una cachetada cómica (sin violencia, como de teatro), el rey se arrodilla y jura con la mano en alto, segunda cachetada y una lágrima: el sacerdote sonríe; la uva se esconde detrás del rey (gag 2).'],
  'aventura', ['babilonia']),
 # ── 2 · San Valentín ──
 ('tr-valentin', None, 8, 8, ['valentin'],
  ['E (el salón): el calendario pasa de enero a febrero y una lista de propósitos se arruga; corte a una iglesia romana del siglo tercero con dos santos de túnica (Roma y Terni) en vitrales sencillos, sin rostro detallado; un calendario litúrgico de 1969 con una casilla que se apaga suavemente.'],
  'ternura', []),
 ('tr-chaucer', None, 9, 9, ['chaucer'],
  ['B (el gabinete de Chaucer, siglo catorce): el poeta con capucha escribe con pluma junto a una ventana por la que entran pájaros que se emparejan en una rama; una estatua romana de lobos (Lupercales) con un «?» encima que se desvanece.'],
  'ternura', []),
 ('tr-orleans', '1415', 10, 10, ['orleans'],
  ['B (la Torre de Londres, una celda con ventana): un duque francés con jubón escribe un poema a la luz de una vela; el papel se dobla en forma de carta con un corazón; un calendario de rayas en la pared cuenta los años de cautiverio.'],
  'ternura', []),
 ('tr-tarjetas', None, 11, 11, ['correo'],
  ['B (una oficina de correos victoriana de 1840 y el taller de Esther Howland en Worcester): sellos de un penique (sin letras, un perfil y un «1»), un cartero con saca que se llena de tarjetas; Esther Howland y sus ayudantes recortan encaje de papel; una montaña de tarjetas que crece hasta el techo; la uva se pinta un corazón y se lo da a otra uva, que se va rodando (gag 3).'],
  'ternura', []),
 # ── 3 · Pascua ──
 ('tr-huevos', None, 12, 12, ['huevos'],
  ['C (una cocina rural con un gallinero): las gallinas ponen huevos que se acumulan en cestas durante la Cuaresma; en Pascua la familia cuece, pinta y regala huevos de colores; una iglesia con campanas al fondo, con respeto.'],
  'calma', []),
 ('tr-liebre', '1682', 13, 13, ['liebre'],
  ['C (un jardín alemán de 1682): una liebre esconde huevos de colores entre los arbustos y los niños los buscan; un erudito con peluca escribe en un libro; un barco cruza el océano hasta una granja de Pensilvania; la uva se esconde entre los huevos y la liebre la pinta de colores (gag 4).'],
  'calma', []),
 # ── 4 · Halloween ──
 ('tr-samhain', None, 14, 14, ['santos'],
  ['C (una aldea irlandesa al atardecer de otoño): una iglesia con velas por Todos los Santos; en una colina, una hoguera gaélica de fiesta con gente bailando; un estudioso del siglo diecinueve con bombín escribe en su cuaderno y dibuja una calavera que se borra (sin morbo).'],
  'misterio', []),
 ('tr-nabos', None, 15, 15, ['nabos'],
  ['C (la aldea irlandesa de noche): un niño talla una cara en un nabo y le mete una brasa; la leyenda de Jack como sombra chinesca (un tacaño y un diablillo cómico); un barco llega a América y el nabo se convierte en una calabaza naranja enorme; la uva se asusta de la linterna de nabo (gag 5).'],
  'misterio', []),
 ('tr-dulce', '1927', 16, 16, ['truco'],
  ['C (una calle inglesa antigua y luego una calle de Canadá en 1927 con nieve temprana): pobres con capa piden pastelitos de puerta en puerta; en Escocia gente disfrazada con máscaras de papel; en Canadá, niños disfrazados tocan una puerta y un periódico sale de la imprenta con una calabaza dibujada (sin letras).'],
  'misterio', []),
 ('tr-racion', None, 17, 17, ['guerra'],
  ['C (una calle de EE. UU.): en los años cuarenta, una cartilla de racionamiento y un frasco de azúcar casi vacío; después de la guerra, niños con disfraces de los cincuenta, una revista infantil y una tira cómica (sin letras), una tele que muestra una caricatura; un montón de monedas de diez mil millones.'],
  'misterio', []),
 # ── 5 · Los cumpleaños ──
 ('tr-velas', '1746', 18, 18, ['velas'],
  ['D (un salón alemán de 1746): un conde con peluca ante un pastel con una vela por cada año; una estatua de Artemisa con un «?» que se desvanece; Goethe en 1801 con su pastel de unas cincuenta velas encendidas; la uva sopla las velas y se le apagan todas menos una (gag 6).'],
  'curiosidad', []),
 ('tr-hill', '1893', 19, 19, ['hill'],
  ['D (un kínder de Louisville, Kentucky, en 1893): dos hermanas, una al piano y otra maestra, cantan con los niños que dan los buenos días; las notas se transforman en un pastel con velas (sin la letra de la canción).'],
  'curiosidad', []),
 ('tr-derechos', None, 20, 20, ['derechos'],
  ['D (un rodaje de cine y un juzgado de 2015): un director corta la escena cuando alguien canta en un pastel; una caja fuerte de una disquera con monedas que entran cada año (un «2» de millones); en el juzgado, un juez golpea el mazo y la caja se abre, las notas salen volando libres.'],
  'curiosidad', ['derechos']),
 # ── 6 · Las bodas ──
 ('tr-vestido', '1840', 21, 21, ['vestido'],
  ['D (la capilla real de 1840 y una iglesia de París de 1558): novias de distintas épocas con vestidos de colores; la reina Victoria de blanco con el príncipe Alberto; un sello de un penique que vuela de fondo; María Estuardo de blanco en París y una corte vestida de blanco de luto real (solemne).'],
  'ternura', []),
 ('tr-argolla', None, 22, 22, ['argolla'],
  ['D (un taller de joyero con una lámina anatómica): una mano con una argolla en el anular y una vena luminosa que va al corazón y se apaga; la lámina muestra que todos los dedos tienen venas; un mapa con Alemania y Rusia donde la argolla salta a la mano derecha.'],
  'ternura', []),
 # ── 7 · El cierre ──
 ('tr-moda', None, 23, 23, ['moda'],
  ['E (el salón de Atom): un álbum con estampas del viaje (las uvas, la tarjeta del preso, la liebre, el nabo, el pastel, el vestido) que se van colocando; una familia de chibis celebra junta alrededor de una mesa.'],
  'cierre', []),
 ('tr-cierre', None, 24, 24, ['cierre'],
  ['E (el salón de Atom a medianoche): el reloj marca casi las doce; Atom intenta comerse la uva y la uva se escapa otra vez (gag 7); confeti.'],
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
assert escenas[-1]['frase_fin'] == 24
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
