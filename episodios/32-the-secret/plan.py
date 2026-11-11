"""Reparto del episodio 32 (The Secret: los doce cofres de 1982) en escenas (escribe escenas.json). Una fila por escena:
(id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Seis decorados (guion.md): A Nueva York 1981–2005 (la editorial de Preiss y la cámara de cajas de seguridad),
  B el cuento (bosque antiguo, el barco de las hadas, la orilla del Nuevo Mundo), C Chicago 1983 (Grant Park),
  D Cleveland 2004 (el jardín griego), E Boston 2019 (el parque en obras y la ceremonia en Brooklyn) y F hoy (el estudio
  de Atom, el mapa de los doce puntos, un parque con señal de no excavar).
- DERECHOS: nada de las pinturas de Palencar ni de la portada del libro: los cuadros, nuestros y de lejos o en trozos.
  No se dan pistas nuevas. Hilo de gags: la maceta, la pala de juguete y el cofrecito de Atom.
- Los golpes son NOMBRES DE MARCAS de la misma escena.
- BANDA: Fa lidio, 96 por minuto, motivo de caja de música y de cuento.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'fa', 'modo': 'lidio', 'tempo': 96, 'motivo': [0, 7, 11, 12, 6, 7, 4, 2]}
E = [
 ('cf-gancho', None, 1, 2, ['cofres', 'camino'],
  ['F: un mapa de Norteamérica con doce puntos que se encienden y nueve que se apagan (golpe); una pala que cava en un parque de noche; un cofrecito de cerámica y una llave; un libro abierto con un cuadro y un poema.',
   'A, C, D y E: un editor con una pala; unos chavales en un parque de Chicago; un abogado cavando en un jardín griego; una excavadora que levanta trozos de cerámica; en el estudio, Atom cava en su maceta con una pala de juguete y saca una llavecita (gag 1).'],
  'misterio', ['cofres']),
 ('cf-hola', None, 3, 3, ['hola'],
  ['F: Atom saluda en su estudio, con la maceta y la llavecita en la mesa.'],
  'curiosidad', []),
 ('cf-preiss', None, 4, 5, ['preiss', 'libro'],
  ['A (Nueva York): la editorial de Preiss (barba, gafas) con mesas de dibujo, cómics y libros ilustrados; un periódico inglés con una liebre de oro (Masquerade, sin portada real).',
   'A: Preiss con dos escritores y un pintor ante caballetes; doce cuadros de fantasía (nuestros, de lejos) y doce hojas con versos; un dedo empareja un cuadro con un verso: el cuadro enseña una ciudad y el verso un punto.'],
  'asombro', []),
 ('cf-cuento', None, 6, 7, ['hadas', 'llave'],
  ['B: un bosque antiguo de cuento; un barco con hadas y criaturas mágicas que cruza el océano; cada grupo lleva una piedra preciosa que brilla; la orilla del Nuevo Mundo.',
   'A: un cofrecito de cerámica dentro de una caja de plástico transparente; dentro, una llave de cerámica; un sobre por correo; una caja de seguridad en un banco de Nueva York con doce piedras de colores.'],
  'asombro', []),
 ('cf-pala', '1981', 8, 9, ['pala', 'nadie'],
  ['A y F (1981): Preiss con una pala más alta que él que no cabe en el coche (gag 2); carreteras por el mapa; parques y jardines públicos al anochecer.',
   'A: Preiss en su mesa, sin apuntar nada; una libreta en blanco; un reloj de arena: el miedo a que lo resuelvan demasiado rápido.'],
  'misterio', []),
 ('cf-cartas', None, 10, 10, ['cartas'],
  ['A (1982–1983): montañas de cartas que llegan a la editorial; Preiss las lee y niega con la cabeza.'],
  'misterio', []),
 ('cf-chicago', '1983', 11, 12, ['torre', 'hoyo'],
  ['C (Chicago, verano de 1983): unos adolescentes con el libro; la torre antigua del agua; una sala de conciertos con dos nombres de compositores (iconos de notas) y una estatua de Lincoln.',
   'C: Grant Park con seis hoyos; llega una foto por correo… de tierra, y la giran del revés (gag 3); uno lanza la pala contra la pared del hoyo y suena «clonk»: la caja (gag 4) (golpe).'],
  'aventura', ['hoyo']),
 ('cf-esmeralda', None, 13, 13, ['esmeralda'],
  ['C y A: una esmeralda que brilla en una mano; un calendario que pasa hojas: veintiún años.'],
  'aventura', []),
 ('cf-zinn', None, 14, 14, ['zinn'],
  ['A y F (1997): gente buscando con mapas, bibliotecas y luego ordenadores; un abogado (Zinn: traje, gafas) al teléfono con Preiss.'],
  'curiosidad', []),
 ('cf-cleveland', '2004', 15, 16, ['pilar', 'jardin'],
  ['D (Cleveland, 2004): el jardín griego con columnas; un pilar con tres nombres grabados (sin letras legibles: tres medallones); Zinn y su amigo (Abrams) con palas y el cuidador del jardín.',
   'D: Zinn cava a la izquierda sin suerte; su amigo, a la derecha, toca la caja de plástico; una aguamarina.'],
  'curiosidad', []),
 ('cf-bonos', None, 17, 17, ['bonos'],
  ['A: la cámara de cajas de seguridad; Preiss abre la suya y salen volando bonos de ahorro olvidados (gag 5).'],
  'curiosidad', []),
 ('cf-adios', None, 18, 19, ['adios', 'familia'],
  ['A (2005): la editorial vacía al atardecer (Long Island se nombra, no se enseña); la libreta en blanco en la mesa; un mapa con nueve puntos que se apagan (con respeto: sin el accidente).',
   'A: cajas de mudanza; la familia (la viuda y dos hijas) guarda la caja de las piedras y la cierra con cuidado.'],
  'ternura', []),
 ('cf-tele', None, 20, 20, ['tele'],
  ['F (2018): un televisor con un programa de aventuras (genérico); un libro viejo en una subasta en línea cuyo precio sube a más de mil; mucha gente con palas.'],
  'intriga', []),
 ('cf-boston', '2019', 21, 22, ['krupat', 'pistas'],
  ['E (Boston, 2019): el parque del North End en obras, vallas, el campo de sóftbol con su base; Krupat (gafas, sudadera) mira desde la valla.',
   'E y F: una biblioteca con dos nombres grabados (medallones sin letras); un farol y una campana: Paul Revere; una flecha al North End.'],
  'epico', []),
 ('cf-excavadora', None, 23, 23, ['excavadora'],
  ['E: Krupat escribe un correo; la excavadora de un operario rompe trozos de plástico y cerámica (golpe); la cuchara levanta el cofre roto como un premio de feria (gag 6); suena el teléfono de Krupat.'],
  'epico', ['excavadora']),
 ('cf-peridoto', None, 24, 25, ['reloj', 'peridoto'],
  ['E: un trozo de cerámica con un reloj de sol pintado; el equipo de la tele cava otra vez y aparece la llave.',
   'E (Brooklyn): una sala con la familia Krupat (los padres y dos niños); la viuda y las hijas de Preiss les dan un peridoto; los hallazgos de Chicago y Cleveland sonríen.'],
  'epico', []),
 ('cf-nueve', None, 26, 26, ['nueve'],
  ['F: el mapa de Norteamérica con nueve interrogantes que saltan como palomitas (gag 7): Nueva York, Houston, Milwaukee, San Agustín, Nueva Orleans, Montreal, la isla de Roanoke, Charleston y San Francisco.'],
  'intriga', []),
 ('cf-permisos', None, 27, 28, ['permisos', 'charleston'],
  ['F: un parque con una señal de no excavar (icono, sin letras); un guarda de parques; un mazo y una ley (iconos).',
   'F (2025): un buscador en Charleston ante un muelle con un barco museo, con un cheque en blanco; un teléfono que no suena; un parque que cambia con edificios y una tormenta que pasa.'],
  'intriga', []),
 ('cf-porque', None, 29, 29, ['porque'],
  ['F: un cuadro, un poema y una ciudad que se superponen; un parque con gente paseando y, debajo, en corte, una cajita con una llave.'],
  'cierre', []),
 ('cf-cierre', None, 30, 30, ['cierre'],
  ['F (el estudio de Atom): Atom entierra su propio cofrecito en la maceta… y luego no recuerda dónde (gag 8).'],
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
