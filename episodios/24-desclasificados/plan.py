"""Reparto del episodio 24 (Los archivos desclasificados que parecen mentira) en escenas (escribe escenas.json).
Una fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Cinco decorados (guion.md): A la carrera espacial, B los animales espías, C los espías psíquicos, D la guerra de
  mentira, E hoy.
- Personajes reconocibles por sus atributos, dibujados por nosotros, sin logos ni letras. Hilo de gags: un gato espía
  con un micrófono que se cuela en cada historia.
- Nada morboso: ninguna bomba estalla en pantalla (el destello de la Luna es un dibujo en una pizarra o un «?»), ningún
  animal sufre, ninguna arma se dispara contra nadie (la bala rebota en el hielo, como gag).
- Los golpes son NOMBRES DE MARCAS de la misma escena.
- BANDA: Re dórico, 100 por minuto, motivo de espías propio.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 're', 'modo': 'dorico', 'tempo': 100, 'motivo': [0, 3, 7, 10, 9, 7, 6, 7]}
E = [
 # ── 0 · El gancho ──
 ('dc-gancho', None, 1, 2, ['luna', 'archivos'],
  ['E: el archivo de Atom de noche, con una carpeta con el sello rojo de secreto (un círculo y una raya, sin letras) que se abre; dentro, una pizarra de 1958 con la Luna y un cohete dibujado con tiza que va hacia ella y un «?» enorme; corte a la Luna llena real por la ventana del archivo; el gato espía (gris, con un micrófono en el collar) se sienta encima de la carpeta (gag 1).',
   'E: sobre la mesa de Atom, cinco carpetas se abren una tras otra con su dibujo: un gato con antena, una gallina, un ojo con ondas, un tanque de goma y un barco de hielo; un sello «secreto» cae sobre cada una y luego se levanta.'],
  'intriga', ['luna']),
 ('dc-hola', None, 3, 3, ['hola'],
  ['E: Atom saluda junto a la estantería de carpetas; el gato espía asoma por detrás de una caja.'],
  'curiosidad', []),
 # ── 1 · La Luna ──
 ('dc-sputnik', None, 4, 4, ['sputnik'],
  ['A (un patio de casa de los suburbios en octubre de 1957): una familia con un radio de onda corta mira el cielo nocturno; un puntito cruza las estrellas y el radio hace bip; corte a un despacho de la Fuerza Aérea con generales alrededor de un globo terráqueo y una Luna de maqueta.'],
  'asombro', []),
 ('dc-armour', '1958', 5, 5, ['armour'],
  ['A (el laboratorio de la Armour Research Foundation en Chicago, 1958): Reiffel con bata ante pizarras llenas de cálculos; un dibujo de la Luna con la línea del día y la noche y una nube de polvo que brilla al Sol; un joven Carl Sagan con jersey hace cuentas con una regla de cálculo; un telescopio por la ventana.'],
  'asombro', []),
 ('dc-secreto', None, 6, 6, ['cajon'],
  ['A (el laboratorio y luego una redacción de periódico del año 2000): el informe se mete en un cajón con candado y el polvo lo cubre; un biógrafo con gafas encuentra una solicitud vieja con un «!»; en 2000 Reiffel, ya mayor, habla con un periodista; en el observatorio, el gato mira la Luna por el telescopio al revés (gag 2).'],
  'asombro', []),
 # ── 2 · Los animales espías ──
 ('dc-gato', '1967', 7, 7, ['gato'],
  ['B (un taller de la CIA en los años sesenta): ingenieros con corbata y gafas ante un gato tranquilo; un micrófono diminuto, una pila y un cable que llega a la cola, en una mesa con lupas; corte a un parque europeo con dos hombres hablando en un banco y un gato que se acerca.'],
  'curiosidad', []),
 ('dc-memo', None, 8, 8, ['memo'],
  ['B (el parque y luego el taller): el gato se va detrás de una paloma y deja a los ingenieros de la furgoneta con los auriculares puestos (gag 3); una hoja de 1967 con casi todo tachado en negro, que sale de un sobre en 2001.'],
  'curiosidad', []),
 ('dc-paloma', None, 9, 9, ['paloma'],
  ['B (un laboratorio de los años cuarenta): Skinner con bata ante una jaula con palomas; dentro de la punta de una bomba de maqueta, una paloma picotea una pantallita con un barco; un oficial con gorra mira con cara de duda.'],
  'curiosidad', []),
 ('dc-pavo', None, 10, 10, ['peacock'],
  ['B (un campo alemán nevado en los cincuenta): una mina enorme, como un depósito de acero, enterrada a medias; unos técnicos británicos con abrigo miden el frío con un termómetro; un dibujo técnico muestra gallinas con comedero dentro de la mina; una gallina se sienta a empollar encima de la mina, muy tranquila (gag 4).'],
  'curiosidad', []),
 ('dc-inocentes', '2004', 11, 11, ['abril'],
  ['B (los Archivos Nacionales británicos en 2004): un calendario de pared marca el 1 de abril; un archivista abre una caja de expedientes; periodistas con libretas se ríen; el portavoz levanta la mano muy serio y un «!» aparece encima.'],
  'curiosidad', ['abril']),
 # ── 3 · Los espías psíquicos ──
 ('dc-sri', None, 12, 12, ['sri'],
  ['C (un laboratorio de los setenta en Stanford): Ingo Swann con camisa de cuello ancho, sentado en un cuarto aislado, dibuja con los ojos cerrados; al otro lado del cristal, dos científicos toman notas; un mapa del mundo con un «?» en un punto lejano.'],
  'misterio', []),
 ('dc-fortmeade', None, 13, 13, ['stargate'],
  ['C (una oficina militar de Fort Meade): mesas con lámparas, mapas con chinchetas y bocetos de bases, barcos y aviones; un vidente con los ojos cerrados dibuja… y le sale el gato espía (gag 5); un montón de billetes que crece hasta el «20».'],
  'misterio', []),
 ('dc-cierre95', '1995', 14, 14, ['revision'],
  ['C (la oficina en 1995 y luego un ordenador de 2017): unos expertos revisan carpetas y ponen una cruz; la oficina se apaga y la puerta se cierra; en 2017, una pantalla muestra miles de páginas que pasan solas.'],
  'misterio', []),
 # ── 4 · El Ejército Fantasma ──
 ('dc-fantasma', '1944', 15, 15, ['fantasma'],
  ['D (un barco de transporte y luego un campo de Francia en 1944): soldados con caballetes y pinceles bajan del barco; en el campo, un pintor dibuja un tanque en su cuaderno; un mapa con flechas que no llevan a nada.'],
  'aventura', []),
 ('dc-goma', None, 16, 16, ['goma'],
  ['D (el campo de noche): soldados inflan con bombas de pie un tanque de goma que crece hasta parecer de verdad; dos soldados levantan otro tanque como si fuera una lancha; un camión con un altavoz enorme suena; un operador de radio teclea; un soldado se apoya en un tanque y se desinfla un poco (gag 6).'],
  'aventura', []),
 ('dc-viersen', None, 17, 17, ['rin'],
  ['D (la orilla del Rin en marzo de 1945): en un lado, tanques de goma, hogueras y tiendas de mentira con soldados que van y vienen; a lo lejos, en otro punto del río, botes de verdad cruzan tranquilos; un mapa con dos flechas, una falsa y una real.'],
  'aventura', []),
 ('dc-medalla', None, 18, 18, ['medalla'],
  ['D (una sala del Capitolio en 2024 y un taller de arte): un archivo con un candado que se abre en 1996; un desfile de moda con vestidos elegantes y un cuadro de colores planos (sin firmas); tres veteranos muy mayores reciben una medalla de oro.'],
  'aventura', []),
 # ── 5 · El portaaviones de hielo ──
 ('dc-pyke', None, 19, 19, ['pyke'],
  ['D (un despacho de Londres en 1942): un mapa del Atlántico con submarinos y una zona sin aviones; Geoffrey Pyke, desaliñado y con barba, señala un iceberg dibujado que se convierte en un portaaviones; afuera, la lluvia de Londres.'],
  'epico', []),
 ('dc-pykrete', None, 20, 20, ['pykrete'],
  ['D (un taller frío y luego una sala de reuniones): mezclan agua y serrín en un molde y sale un bloque gris; un bloque de hielo normal se rompe de un martillazo y el de pykrete aguanta; Mountbatten con uniforme blanco deja un bloque en una bañera llena (solo la bañera, sin nadie dentro); en la sala de reuniones, la bala rebota en el bloque con un «pling» y el gato espía se esconde (gag 7).'],
  'epico', []),
 ('dc-patricia', '1943', 21, 21, ['patricia'],
  ['D (el lago Patricia en las Rocosas de Canadá): un barquito de hielo con un tejado de madera flota entre montañas nevadas; unos ingenieros con abrigo lo miran; pasan tres veranos (el sol, las hojas) y se va hundiendo poco a poco; al final, sus restos en el fondo, con un pez.'],
  'epico', []),
 # ── 6 · El cierre ──
 ('dc-pauta', None, 22, 22, ['pauta'],
  ['E (el archivo de Atom): las carpetas de todo el episodio se colocan en la mesa (la Luna, el gato, la gallina, el ojo, el tanque de goma, el barco de hielo); a cada una le cae un sello con una cara sonrojada; una reunión de mentira con un proyector en la pared.'],
  'cierre', []),
 ('dc-cierre', None, 23, 23, ['cierre'],
  ['E (el archivo de Atom a oscuras): Atom busca su micrófono con una linterna; el gato espía sale corriendo con el micrófono en la boca (gag 8).'],
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
assert escenas[-1]['frase_fin'] == 23
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
