"""Reparto del episodio 41 (Avengers: Doomsday, segunda parte: lo que Marvel ha enseñado desde agosto) en escenas (escribe
escenas.json). Una fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo,
golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Siete decorados (guion.md): A el búnker de Banner, B las ruinas de Wundagore, C el campo de batalla de los pósters,
  D el plató de rodaje, E la sala de los Vengadores y la de calificación, F el cine y G el estudio de Atom.
- CUIDADO: héroes por sus atributos, dibujados por nosotros, sin logos ni clips; sin destripes ni filtraciones; nada de la
  muerte de Patrick Stewart (decisión del usuario en el 19). Hilo de gags: la barra de carga del tráiler final, que no acaba.
- Los golpes son NOMBRES DE MARCAS de la misma escena (o «marca+segundos»).
- BANDA: Re dórico, 108 por minuto, motivo de marcha.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 're', 'modo': 'dorico', 'tempo': 108, 'motivo': [0, 3, 5, 7, 10, 7, 5, 12]}
E = [
 ('dd-gancho', None, 1, 2, ['hulk', 'piezas'],
  ['A y B: luz verde y la voz de Doom en el búnker; Banner (EL) desaparece y Hulk ruge (golpe); Doom levanta rocas con su poder en Wundagore y Wanda abre los ojos.',
   'G, C, D y F: Atom ante la barra de carga del tráiler final (99 % y vuelta a empezar); piezas de puzle que caen sobre su mesa: dos escenas, once pósters, un plató, una etiqueta y un contador de entradas.'],
  'suspense', ['hulk']),
 ('dd-hola', None, 3, 3, ['hola'],
  ['G: Atom saluda en su estudio, con el reloj de cuenta atrás en la pared.'],
  'curiosidad', []),
 ('dd-bunker', '2026', 4, 7, ['encore', 'otras', 'bunker', 'porque'],
  ['F y G: el cartel de «Endgame Encore» en un cine; Joe Russo (EL) señala la pantalla: obligatorio.',
   'G y E: tres viñetas: Loki llama a la puerta de Peggy y Steve se asoma; la TVA con alarmas; el martilleo del taller resulta ser Doom forjando su máscara.',
   'A: Banner graba un informe ante una cámara; la luz verde llena la sala; Hulk ruge; queda un símbolo verde en el suelo y su taza de café da vueltas.',
   'A y G: el búnker vacío; un interrogante sobre la máscara de Doom; Atom pone el reestreno en su televisor (Disney+).'],
  'suspense', []),
 ('dd-visionquest', None, 8, 9, ['vision', 'ultron'],
  ['B y G: la serie en la televisión de Atom; la montaña de Wundagore derrumbándose (recuerdo de 2022).',
   'G: Ultron (EL), calvo y con gafas, mira por una ventana con una memoria USB «J…» en la mano; Atom aparta esa escena a un lado.'],
  'misterio', []),
 ('dd-wanda', None, 10, 11, ['awaken', 'maximoff'],
  ['B: la luz verde entre las piedras; Doom (EL) levanta las rocas con su poder, encuentra a Wanda (EL) y le habla (golpe en «awaken»); ella abre los ojos de golpe; fundido a negro.',
   'G y B: en la pared de Atom, tres fotos: Wanda, Pietro (de 2015, con un lazo negro discreto) y Tommy corriendo; un hueco con un interrogante en el reparto.'],
  'misterio', ['awaken']),
 ('dd-posters', None, 12, 13, ['posters', 'parejas'],
  ['C y G: once pósters que llegan uno a uno a la pared de Atom y encajan en una sola imagen: ciudad en ruinas, Centinelas en el humo, Doom en el centro; el último se cae dos veces.',
   'C: Thor con Steve; Sam con Cíclope; Magneto con Shuri; Profesor X con Mr. Fantastic.'],
  'epico', []),
 ('dd-parejas', None, 14, 15, ['resto', 'rondador'],
  ['C: Loki con Mística; Bucky con Shang-Chi; Ant-Man con el Guardián Rojo; la Mujer Invisible con Namor; Gambito con Yelena; la décima pareja, Rondador Nocturno con M\'Baku.',
   'C y G: Rondador Nocturno mayor, pelo blanco, espadas y abrigo largo, con un «2003» que se convierte en «2026»; un marco vacío con la silueta de la Bestia.'],
  'epico', []),
 ('dd-mascara', None, 16, 18, ['return', 'lema', 'imagenes'],
  ['D: el reactor de Iron Man en un soporte; Downey (EL, de paisano) en el plató; un teléfono que suena (Feige).',
   'D: la máscara de Doom en su soporte; Downey se la acerca: «New mask, same task»; un corazón dibujado en el aire.',
   'D: peleas de ensayo (Yelena contra Mística, Shang-Chi contra Gambito); un grupo en el bosque de decorado; Sue Storm de negro.'],
  'asombro', []),
 ('dd-anuncios', None, 19, 21, ['spot', 'equipos', 'japon'],
  ['E: Ant-Man mira a tres Capitanes América y no sabe a cuál dirigirse; Steve abraza a Thor; Doom cruza al fondo.',
   'E y C: los cinco equipos pasan uno detrás de otro; un calendario arranca la hoja: un mes.',
   'E y G: Doom en un televisor japonés; dos directores (EL, los Russo) ante una pantalla envolvente; Reed detrás de Steve.'],
  'aventura', []),
 ('dd-letras', None, 22, 23, ['panel', 'sistema'],
  ['E: la sala de proyección pequeña; un panel de padres mira la película y levanta tarjetas G, PG, PG-13 y R.',
   'E: un archivo con un «1968»; los estudios pagan; un cine con su letra en la marquesina; Atom con lupa sobre tres palabras.'],
  'curiosidad', []),
 ('dd-sangre', None, 24, 25, ['etiqueta', 'miedo'],
  ['E: el sello de PG-13 que no marca hasta el tercer golpe; cuatro fichas de Vengadores con «sci-fi», y la nueva sin «sci-fi» y con dos palabras más.',
   'E y G: Atom tapa media cara con un cojín, luego lo baja: las palabras dicen qué, no cuánto.'],
  'curiosidad', []),
 ('dd-entradas', None, 26, 27, ['ventas', 'pronto'],
  ['F: el contador de entradas sube; un ejecutivo (EL) con «50 M$» en una pizarra; siete de cada diez entradas van a la sala grande.',
   'F y G: una cola de fans con sus asientos en el plano de la sala; a Atom le salta una palomita del cubo cada vez que sube el contador.'],
  'asombro', []),
 ('dd-estreno', None, 28, 29, ['duracion', 'imax'],
  ['F: un reloj de dos horas y media; un mapa con fechas por país (16, 17 y 18 de diciembre).',
   'F: la sala IMAX con el cartel de «Dune: Part Three» y la de Doomsday al lado; tres semanas en el calendario.'],
  'asombro', []),
 ('dd-espera', None, 30, 32, ['trailer', 'paciencia', 'reparto'],
  ['G: la barra de carga del tráiler final otra vez al 99 %; el calendario del 16 y del 18 tachados; el tráiler de julio en la pared.',
   'G y D: Downey (EL) mira un reloj sin decir nada; «Patience, subjects».',
   'G: siluetas de Lobezno, Deadpool y Hulk con un interrogante; una página de guion con dos firmas.'],
  'intriga', []),
 ('dd-cierre', None, 33, 35, ['sabemos', 'secret', 'final'],
  ['C y B: Doom con Hulk encadenado en luz verde y Wanda despierta, frente a los héroes de tres mundos en la ciudad en ruinas.',
   'G: el calendario pasa a diciembre de 2027 con «Secret Wars».',
   'G: Atom se queda dormido delante del ordenador; el reloj de cuenta atrás sigue bajando; la barra de carga sigue en 99 %.'],
  'cierre', []),
]

escenas = []
for id_, cartela, a, b, marcas, vis, animo, golpes in E:
    assert len(marcas) == len(vis) == b - a + 1, id_
    assert all(g.split('+')[0] in marcas for g in golpes), (id_, golpes)
    escenas.append({'id': id_, 'estilo': 'pixel', 'cartela': cartela, 'frase_ini': a, 'frase_fin': b,
                    'marcas': marcas, 'guion_visual': vis, 'animo': animo, 'golpes': golpes,
                    'empieza_con': 'cartela ' + cartela if cartela else 'corte desde la escena anterior',
                    'termina_con': '', 'produccion': ''})
assert [e['frase_ini'] for e in escenas][1:] == [e['frase_fin'] + 1 for e in escenas][:-1]
assert escenas[-1]['frase_fin'] == 35
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas')
