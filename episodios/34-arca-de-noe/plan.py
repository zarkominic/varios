"""Reparto del episodio 34 (El Arca de Noé: el relato, las religiones y la roca con forma de barco) en escenas (escribe
escenas.json). Una fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase],
ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Seis decorados (guion.md): A Durupınar (la ladera en 1959, 1977 y 2026), B el relato (el barco, la lluvia, los
  animales, el mapa de los dos montes), C Londres (el Museo Británico en 1872 y 2014), D Mesopotamia, E otros diluvios
  (India, Grecia, el mar Negro en plano azul) y F hoy (el estudio de Atom, el despacho del geólogo, el laboratorio).
- CUIDADO: a Noé / Nuh NO se le dibuja en ninguna tradición (barcos, animales, lluvia, montañas, tablillas). Lo que dice
  el equipo de Durupınar va «según ellos», en plano azul. Sin letras: números, rayas e iconos.
  Hilo de gags: el barquito de papel y la pecera de Atom.
- Los golpes son NOMBRES DE MARCAS de la misma escena.
- BANDA: Sol menor, 84 por minuto, motivo de agua que sube y baja.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'sol', 'modo': 'menor', 'tempo': 84, 'motivo': [0, 3, 7, 8, 7, 3, 5, 0]}
E = [
 ('nx-gancho', None, 1, 2, ['roca', 'sorpresa'],
  ['A: la ladera con la forma de barco y el Ararat nevado; una regla la compara con un barco de madera (golpe); a un lado, un buscador que señala; al otro, un geólogo con su martillo que niega con la cabeza.',
   'C, B y F: una tablilla de arcilla que brilla; tres libros y una tablilla en fila; en el estudio, Atom pone un barquito de papel en su pecera y el pez lo mira con desconfianza (gag 1).'],
  'misterio', ['roca']),
 ('nx-hola', None, 3, 3, ['hola'],
  ['F: Atom saluda en su estudio, con la pecera y el barquito.'],
  'curiosidad', []),
 ('nx-foto', '1959', 4, 5, ['capitan', 'ararat'],
  ['A (1959): el capitán Durupınar en su mesa con fotos aéreas y una lupa; gira una foto hasta que la silueta queda derecha (gag 2).',
   'A: el mapa con la ladera y el Ararat a treinta kilómetros; el monte nevado; la expedición que sube con mulas; una revista abierta con la foto, que pasa de mano en mano.'],
  'aventura', []),
 ('nx-expedicion', None, 6, 6, ['expedicion'],
  ['A (1960): los expedicionarios miden, cavan, una pequeña explosión de polvo; cajas vacías; se van; la ladera queda sola y pasan las estaciones.'],
  'aventura', []),
 ('nx-relato', None, 7, 8, ['relato', 'lluvia'],
  ['B: un libro antiguo abierto; el gran barco de madera en construcción, con su medida en codos (300) junto a una regla.',
   'B: las parejas de animales en fila, con el caracol el último y todos esperándole (gag 3); la lluvia; el barco solo en el agua; la paloma con la hoja de olivo; el arcoíris.'],
  'calma', []),
 ('nx-montes', None, 9, 10, ['coran', 'judi'],
  ['B: tres libros sagrados, uno junto a otro, con sus símbolos (estrella, cruz, media luna); el barco sobre el agua, de lejos; un monte distinto al fondo.',
   'B: el mapa con dos montes señalados, el Ararat al norte y el Judi al sur, y una región entera sombreada entre ellos.'],
  'ternura', []),
 ('nx-smith', '1872', 11, 12, ['smith', 'tablilla'],
  ['C (1872): la sala del Museo Británico; George Smith limpia y ordena trozos de tablillas con un pincel.',
   'C: Smith lee una tablilla (golpe): sobre ella aparecen el barco, los animales y la paloma en dibujo de arcilla; salta, corre por la sala y empieza a quitarse la chaqueta; sus colegas le miran (gag 4).'],
  'asombro', ['tablilla']),
 ('nx-gilgamesh', None, 13, 13, ['gilgamesh'],
  ['C y D: la tablilla junto a un libro, con una línea de tiempo: la tablilla queda siglos antes; la sala de la conferencia, llena, con un señor de patillas en primera fila.'],
  'asombro', []),
 ('nx-finkel', None, 14, 14, ['finkel'],
  ['C (2014): Finkel, de barba blanca larga, con una tablilla pequeña como un móvil; D: el barco redondo de cuerda trenzada y betún, que gira como una peonza en el agua (gag 5).'],
  'asombro', []),
 ('nx-manu', None, 15, 15, ['manu'],
  ['E: la India: un pececillo en un cuenco, luego en un estanque, luego enorme, que remolca una barca hasta una montaña; Grecia: un cofre de madera que flota nueve soles y nueve lunas.'],
  'epico', []),
 ('nx-rios', None, 16, 17, ['rios', 'mundo'],
  ['D: una ciudad de adobe entre dos ríos; el río crece; el corte del suelo con una capa gruesa de lodo entre dos capas de casas.',
   'D y E: desde un tejado, el agua hasta el horizonte; el mar Negro en plano azul: el agua entra por un estrecho y lo llena (hipótesis, con un signo de interrogación).'],
  'curiosidad', []),
 ('nx-geologia', None, 18, 18, ['geologia'],
  ['F: el despacho del geólogo: un cilindro de hielo y un corte de rocas con sus capas, sin ninguna capa común; una balanza con un libro a un lado y una lupa al otro, en equilibrio.'],
  'calma', []),
 ('nx-wyatt', '1977', 19, 20, ['wyatt', 'fasold'],
  ['A (1977): Wyatt llega a la ladera con su mochila; enseña trozos de piedra y remaches; en un pueblo cercano (no en la roca), una gran piedra con un agujero; mide la roca con una cinta que se le acaba a la mitad (gag 6).',
   'A: el centro de visitantes con turistas; Fasold, con gorra de marino, mide con un aparato y se rasca la cabeza.'],
  'intriga', []),
 ('nx-articulo', None, 21, 21, ['articulo'],
  ['F y A: Fasold y el geólogo Collins firman un artículo; la ladera en corte: capas de roca plegadas en forma de cuenco alargado, que la erosión talla, y el barro de un deslizamiento que las rodea y dibuja el «barco»; el «remache» es una piedra rojiza; el «ancla», piedra volcánica.'],
  'suspense', []),
 ('nx-geologos', None, 22, 22, ['geologos'],
  ['F y A: una fila de geólogos, cada uno con su martillo, que asienten; la ladera sola otra vez… y un punto de luz que llega por el camino.'],
  'intriga', []),
 ('nx-radar', '2026', 23, 24, ['radar', 'segun'],
  ['A (2026): el equipo con un radar de suelo sobre ruedas; las ondas bajan y rebotan; el radar pita, todos corren… y era una hebilla (gag 7).',
   'A, «según ellos», en plano azul: bajo la forma, líneas rectas y ángulos como pasillos; bolsas de muestras de suelo dentro y fuera, con dos barras de distinta altura.'],
  'misterio', []),
 ('nx-madera', None, 25, 25, ['madera'],
  ['A: la perforadora baja veinte metros, con la marca de los nueve; sale un cilindro de tierra con unos trozos negros (golpe); una foto de los trozos sobre una mesa; el fundador del grupo los enseña; al lado, en un globo de idea, la hoguera de un pastor.'],
  'curiosidad', ['madera']),
 ('nx-confirmar', None, 26, 27, ['claro', 'falta'],
  ['F: un sello de «?» sobre una nota de prensa; una revista científica cerrada; un laboratorio vacío; el radar dibuja líneas rectas también en capas de roca.',
   'A y F: la lista de lo que haría falta, con casillas vacías: una excavación abierta, la madera con sus marcas bajo la lupa de alguien de fuera, tres laboratorios con sobres en camino, una revista; un calendario de 2027 con un permiso por sellar.'],
  'curiosidad', []),
 ('nx-sabemos', None, 28, 29, ['sabemos', 'roca2'],
  ['B y C: la tablilla, los libros y gente de muchos lugares que escucha el relato.',
   'A: la ladera al atardecer: a un lado el geólogo, al otro el equipo con su radar, y la roca en medio.'],
  'calma', []),
 ('nx-cierre', None, 30, 30, ['cierre'],
  ['F (el estudio de Atom): tres casillas (creer, decir, comprobar) con sus iconos; Atom mira su pecera: el pez va subido en el barquito de papel (gag 8).'],
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
