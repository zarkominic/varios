"""Reparto del episodio 41 (Avengers: Doomsday, segunda parte: lo que Marvel ha enseñado desde agosto) en escenas (escribe
escenas.json). Una fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo,
golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Siete decorados (guion.md): A el búnker de Banner, B las ruinas de Wundagore, C el campo de batalla de los pósters,
  D el plató de rodaje, E la sala de los Vengadores y la de calificación, F el cine, G el estudio de Atom y H las viñetas
  de cómic (un estilo propio para lo que pasa en los cómics, para que nunca se confunda con la película).
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
 ('dd-encore', '2026', 4, 5, ['encore', 'otras'],
  ['F y G: el cartel de «Endgame Encore» en un cine; Joe Russo (EL) señala la pantalla: obligatorio.',
   'G y E: tres viñetas: Loki llama a la puerta de Peggy y Steve se asoma; la TVA con alarmas y universos que chocan; el martilleo de un taller que resulta ser Doom forjando su máscara.'],
  'suspense', []),
 ('dd-bunker', None, 6, 8, ['bunker', 'porque', 'mascara'],
  ['A: Banner graba un informe ante una cámara; la luz verde llena la sala; Hulk ruge; queda un símbolo verde en el suelo y su taza de café da vueltas.',
   'A y G: el búnker vacío; un interrogante sobre la máscara de Doom; Atom pone el reestreno en su televisor.',
   'H (viñeta de cómic): un Victor joven (EL) en una fragua de montaña, la máscara al rojo en las tenazas; se la acerca a la cara entre chispas (sin mostrar la cara herida).'],
  'suspense', []),
 ('dd-visionquest', None, 9, 10, ['vision', 'ultron'],
  ['B y G: la serie en la televisión de Atom; la montaña de Wundagore derrumbándose (recuerdo de 2022).',
   'G: Ultron (EL), calvo y con gafas, mira por una ventana con una memoria USB «J…» en la mano; Atom aparta esa escena a un lado.'],
  'misterio', []),
 ('dd-wanda', None, 11, 13, ['awaken', 'maximoff', 'cruzada'],
  ['B: la luz verde entre las piedras; Doom (EL) levanta las rocas con su poder, encuentra a Wanda (EL) y le habla (golpe en «awaken»); ella abre los ojos de golpe; fundido a negro.',
   'G y B: en la pared de Atom, tres fotos: Wanda, Pietro (de 2015) y Tommy corriendo; un hueco con un interrogante en el reparto.',
   'H (viñeta de cómic): el castillo de Latveria; Wanda con velo de novia, desorientada, y Doom a su lado; un calendario 2010–2012.'],
  'misterio', ['awaken']),
 ('dd-posters', None, 14, 15, ['posters', 'parejas'],
  ['C y G: once pósters que llegan uno a uno a la pared de Atom y encajan en una sola imagen: ciudad en ruinas, Centinelas en el humo, Doom en el centro; el último se cae dos veces.',
   'C: Thor con Steve; Sam con Cíclope; Magneto con Shuri; Profesor X con Mr. Fantastic.'],
  'epico', []),
 ('dd-parejas', None, 16, 17, ['resto', 'rondador'],
  ['C: Loki con Mística; Bucky con Shang-Chi; Ant-Man con el Guardián Rojo; la Mujer Invisible con Namor; Gambito con Yelena; la décima pareja, Rondador Nocturno con M\'Baku.',
   'C y G: Rondador Nocturno mayor, pelo blanco, espadas y abrigo largo, con un «2003» que se convierte en «2026»; un marco vacío con la silueta de la Bestia.'],
  'epico', []),
 ('dd-mascara', None, 18, 19, ['return', 'lema'],
  ['D: Downey (EL, de paisano) en el plató; recuerda su despedida; un teléfono que suena (Feige).',
   'D: la máscara de Doom en su soporte; Downey se la acerca: «New mask, same task»; un corazón dibujado en el aire.'],
  'asombro', []),
 ('dd-sue', None, 20, 21, ['imagenes', 'valeria'],
  ['D: peleas de ensayo (Yelena contra Mística, Shang-Chi contra Gambito); un grupo en el bosque de decorado; Sue Storm de negro con un destello azul.',
   'H (viñeta de cómic): Doom sostiene con cuidado una cuna con una bebé; un rótulo de 2002; Sue y Reed al fondo; el nombre «Valeria» en una cinta.'],
  'asombro', []),
 ('dd-anuncios', None, 22, 24, ['spot', 'equipos', 'japon'],
  ['E: Ant-Man mira a los Capitanes América y no sabe a cuál dirigirse; Steve abraza a Thor; Doom cruza al fondo.',
   'E y C: los cinco equipos pasan uno detrás de otro; un calendario arranca la hoja: un mes.',
   'E y G: Doom en un televisor japonés; dos directores (EL, los Russo) ante una pantalla envolvente; Reed detrás de Steve.'],
  'aventura', []),
 ('dd-etiqueta', None, 25, 26, ['panel', 'sangre'],
  ['E: la sala de proyección pequeña; un panel de padres mira la película y levanta tarjetas de la G a la R; un «1968» en el archivo.',
   'E: el sello de PG-13 que no marca hasta el tercer golpe; cuatro fichas de Vengadores con «sci-fi», y la nueva sin «sci-fi» y con dos palabras más.'],
  'curiosidad', []),
 ('dd-cifras', None, 27, 28, ['ventas', 'estreno'],
  ['F: el contador de entradas sube; un ejecutivo (EL) con «50 M$» en una pizarra; a Atom le salta una palomita del cubo cada vez que sube.',
   'F: un reloj de dos horas y media; un mapa con fechas por país (16, 17 y 18 de diciembre); la sala IMAX con el cartel de «Dune: Part Three» al lado.'],
  'asombro', []),
 ('dd-espera', None, 29, 31, ['trailer', 'paciencia', 'reparto'],
  ['G: la barra de carga del tráiler final otra vez al 99 %; el calendario del 16 y del 18 tachados; el tráiler de julio en la pared.',
   'G y D: Downey (EL) mira su reloj sin decir nada; «Patience, subjects».',
   'G: siluetas de Lobezno, Deadpool y Hulk con un interrogante; una página de registro con dos firmas.'],
  'intriga', []),
 ('dd-secret', None, 32, 34, ['sabemos', 'ochenta', 'dios'],
  ['C y B: Doom con Hulk en luz verde y Wanda despierta, frente a los héroes de tres mundos en la ciudad en ruinas.',
   'H (viñeta de cómic): un planeta extraño hecho de trozos; héroes y villanos traídos por una luz blanca, Hulk entre ellos; Doom levanta las manos y la luz pasa a él.',
   'H (viñeta de cómic): universos como burbujas que chocan y se rompen; Doom cose los pedazos en un mundo y se sienta en un trono; un calendario «2027».'],
  'epico', []),
 ('dd-cierre', None, 35, 35, ['final'],
  ['G: Atom se queda dormido delante del ordenador; el reloj de cuenta atrás sigue bajando; la barra de carga sigue en 99 %.'],
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
