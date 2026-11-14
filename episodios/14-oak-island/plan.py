"""Reparto del episodio 14 (Oak Island, el Pozo del Dinero) en escenas (escribe escenas.json). Una fila por escena:
(id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo de la música, golpes).
- Estilo canónico pixel chibi y estándar mínimo (ESTANDAR.md): planos de 4–7 s con acción, detalle y gags.
- Ocho decorados (guion.md): A Oak Island en 1795, B el pozo en corte, C Smith's Cove, D Roosevelt (Nueva York 1909 y el
  barco en la niebla de 1939), E el gabinete de las teorías, F el laboratorio del agua (con el campo de 1878 y la orilla
  de 1897), G Michigan 1965, H Oak Island hoy. Más el mapa de papel de la costa atlántica (ov-mapas.js).
- Sin marcas en la imagen: ni History ni Reader's Digest (la revista, con portada inventada). Sin morbo ni «maldición».
- Ánimo (herramientas/banda.cjs): suspense, misterio, intriga, cierre, asombro, aventura, curiosidad, calma, epico,
  ternura. Golpes: la música se corta justo antes de esa marca y entra un golpe grave.
- BANDA: la del episodio (se aprueba con el guion y su muestra): Mi dórico, 96 por minuto, motivo de canción de
  marineros (Mi, Sol, La, Si, Do#, Si, La, Sol).
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'mi', 'modo': 'dorico', 'tempo': 96, 'motivo': [0, 3, 5, 7, 9, 7, 5, 3]}
E = [
 ('oi-gancho', '1795', 1, 3, ['bahia', 'hoyo', 'cavan'],
  ['A/mapa: la costa atlántica de Canadá y la bahía de Mahone con sus islas; el muchacho rema hacia una isla de robles con gaviotas.',
   'A: el claro, el hoyo redondo hundido en la tierra; la vieja polea cuelga de una rama del roble y cruje con el viento.',
   'B: los tres cavan; en corte, las losas de piedra y, cada diez pies, una plataforma de troncos; la gaviota roba el bocadillo de la cesta (gag).'],
  'misterio', []),
 ('oi-picos', None, 4, 5, ['picos', 'rinden'],
  ['B: un farol junto a la pared de arcilla del pozo, con marcas de pico; los tres se miran.',
   'A/B: suben agotados con la pala; pasan los años en la isla: botes, buscadores, una caldera de vapor humeando, un barco con un joven de traje en la proa.'],
  'aventura', []),
 ('oi-pregunta', None, 6, 6, ['pregunta'],
  ['B: el pozo en corte de arriba abajo, con el agua oscura al fondo y monedas que caen y desaparecen; «?».'], 'misterio', []),
 ('oi-hola', None, 7, 7, ['hola'], ['A: la orilla de la isla de hoy al atardecer, con la marea entrando; Atom se presenta.'], 'curiosidad', []),
 ('oi-onslow', '1803', 8, 9, ['onslow', 'coco'],
  ['B: la compañía llega en barcas, levanta una torre de madera con polea sobre el pozo; obreros con cubos y sogas.',
   'B: en corte, las capas que salen: carbón, masilla, fibra de coco; un obrero sostiene la fibra y mira alrededor: ni un cocotero, solo robles.'],
  'aventura', []),
 ('oi-piedra', None, 10, 11, ['piedra', 'descifra'],
  ['B: al fondo, a la luz del farol, sacan una piedra plana con símbolos tallados (sin letras: rayas, puntos y triángulos).',
   'D/E: un despacho de profesor con velas; una lupa sobre la piedra; los símbolos se convierten en un «40» y un «2.000.000» y luego se emborronan con un «?».'],
  'misterio', []),
 ('oi-inunda', None, 12, 14, ['inunda', 'cubos', 'salada'],
  ['B: anochece, se van a dormir; amanece y el pozo en corte está lleno de agua hasta muy arriba.',
   'B: cadena de cubos y una bomba de mano; cavan un segundo pozo al lado y también se llena; el obrero vacía un cubo y el agua vuelve a estar donde estaba (gag).',
   'B: un obrero prueba el agua con el dedo y pone cara de salado; un cangrejo pequeño asoma en el cubo.'],
  'suspense', ['inunda']),
 ('oi-truro', '1849', 15, 15, ['cadena'],
  ['B: un taladro de mano gigante sobre el pozo; la broca sube y en el trapo blanco aparecen astillas y tres eslabones dorados que brillan.'], 'intriga', []),
 ('oi-cove', None, 16, 18, ['cove', 'dique', 'trampa'],
  ['C: la playa con la marea baja; la arena chorrea agua; al cavar aparecen fibra de coco y canales de piedra en abanico; el cangrejo sale de un canal y se mete en otro (gag).',
   'C: levantan un dique de madera y piedras; llega una ola enorme de marea y se lo lleva.',
   'B/C: el corte de la isla con un túnel imaginario dibujado en línea de puntos del mar al pozo.'],
  'intriga', []),
 ('oi-roosevelt', '1909', 19, 21, ['roosevelt', 'campobello', 'vacio'],
  ['D: Nueva York, un despacho de abogados; el joven Roosevelt firma un papel con su parte de la compañía; mapa: de Nueva York a Nueva Escocia.',
   'D: una casa de veraneo roja junto al mar en Campobello; el Roosevelt niño con un libro de piratas en el porche.',
   'B: la expedición de 1909 con una perforadora de vapor; sacan muestras en tubos; recogen y se van en barco con las manos vacías.'],
  'aventura', []),
 ('oi-niebla', '1939', 22, 22, ['niebla'],
  ['D: la cubierta de un barco en una niebla espesa; el faro apenas se ve; al marinero se le vuela el sombrero (gag); el barco gira.'], 'misterio', []),
 ('oi-teorias', None, 23, 25, ['teorias', 'templarios', 'generacion'],
  ['E: el gabinete: del agujero en el suelo sale un loro pirata, un cofre, una corona, una pluma de escribir; un topo las va devolviendo al agujero (gag).',
   'E: un yelmo de templario y una caja de monedas del ejército británico salen también; el topo se rasca la cabeza.',
   'E: una fila de retratos de buscadores de distintas épocas, cada uno mirando su propio tesoro soñado en una burbuja.'],
  'curiosidad', []),
 ('oi-mareas', None, 26, 26, ['mareas'],
  ['B/A: el pozo en corte junto a la orilla: la marea sube y el agua del pozo sube a la vez; baja y baja; un reloj de sol y una luna que pasa.'], 'curiosidad', []),
 ('oi-pajita', None, 27, 28, ['pajita', 'anhidrita'],
  ['F: Atom en la mesa con un vaso de zumo y una pajita: el zumo de la pajita a la altura del vaso; al lado, el tanque de cristal con la isla en corte y el pozo que se llena hasta el nivel del mar.',
   'F: en el tanque, la roca blanca de anhidrita se va disolviendo con gotas y deja cuevas; un trozo de yeso en la mesa.'],
  'curiosidad', []),
 ('oi-esponja', None, 29, 30, ['esponja', 'bombas'],
  ['F: una esponja en un plato empapándose; flechitas de agua por las grietas del tanque.',
   'B: los buscadores bombean más deprisa y el agua entra más deprisa por abajo, con flechas que se hacen más gruesas cuanto más hondo.'],
  'curiosidad', []),
 ('oi-bueyes', '1878', 31, 31, ['bueyes'],
  ['F: un campo arado de la isla; los bueyes tiran del arado y de repente se les hunden las patas en un agujero; caras de sorpresa; la granjera se rasca la cabeza (gag, sin daño); un buscador dibuja un túnel y un geólogo, una cueva.'], 'curiosidad', []),
 ('oi-tinte', '1898', 32, 33, ['tinte', 'tunel'],
  ['B/F: echan un cubo de tinte rojo en el pozo; mapa de la isla: el rojo aparece en la orilla sur, no en Smith\'s Cove; un pez asoma teñido de rojo (gag).',
   'C/F: los buscadores dibujan un segundo túnel en su plano; al lado, en el tanque del laboratorio, el agua se cuela sola por las grietas de la roca.'],
  'asombro', ['tinte']),
 ('oi-sumidero', None, 34, 35, ['sumidero', 'abierto'],
  ['F: el corte de la roca: un sumidero que se abre solo; árboles que caen dentro y quedan en capas cada diez pies.',
   'C/B: la fibra de coco y los canales de piedra junto al sumidero, con un «?» que no se resuelve.'],
  'asombro', []),
 ('oi-lector', '1965', 36, 38, ['lector', 'blankenship', 'calzada'],
  ['G: la cocina de Michigan con nieve en la ventana; el niño Rick lee la revista (portada inventada) en la mesa; el gato se sienta encima de la página (gag).',
   'G/mapa: Miami, un constructor lee el mismo artículo; mapa: de Miami a Nueva Escocia; llega a la isla con su maleta.',
   'H: se construye la calzada de tierra desde la costa; pasa la primera excavadora por encima.'],
  'ternura', []),
 ('oi-lagina', None, 39, 40, ['programa', 'hermanos'],
  ['H: los dos hermanos ya mayores, con gorra, en la isla; un equipo de televisión con cámara (sin logotipos).',
   'H: Rick con una saca de Correos y Marty con planos de un pozo de gas; los dos sobre el mapa de la isla.'],
  'ternura', []),
 ('oi-hoy', '2026', 41, 42, ['gruas', 'monedas'],
  ['H: la excavación de hoy: una grúa enorme clava un tubo de acero más ancho que una persona; la pantalla de un escáner muestra el subsuelo.',
   'H: la mesa de los hallazgos: monedas antiguas, clavos hechos a mano, trozos de madera con etiquetas de laboratorio; al fondo, la granja de unos colonos de 1760 en un cuadro.'],
  'epico', []),
 ('oi-sigue', None, 43, 44, ['sigue', 'famoso'],
  ['H: el tubo sale vacío y chorreando; los técnicos se miran; al año siguiente vuelven los camiones por la calzada.',
   'A/H: del hoyo con polea de 1795 a la excavación de hoy, en un mismo encuadre que cambia.'],
  'epico', []),
 ('oi-cierre', None, 45, 47, ['roble', 'mar', 'quiza'],
  ['A: el claro de 1795 con el roble y la polea se desvanece; debajo, en corte, docenas de pozos y túneles.',
   'A: la isla desde el aire; la marea entra y sale; una barca de remos se acerca como la de 1795.',
   'A/B: el fondo del pozo en corte: un brillo dorado o una piedra, que no se llega a ver bien.'],
  'cierre', []),
 ('oi-adios', None, 48, 48, ['adios'], ['A: la orilla al atardecer, la polea balanceándose; Atom.'], 'cierre', []),
]

escenas = []
for id_, cartela, a, b, marcas, vis, animo, golpes in E:
    assert len(marcas) == len(vis) == b - a + 1, id_
    escenas.append({'id': id_, 'estilo': 'pixel', 'cartela': cartela, 'frase_ini': a, 'frase_fin': b,
                    'marcas': marcas, 'guion_visual': vis, 'animo': animo, 'golpes': golpes,
                    'empieza_con': 'cartela ' + cartela if cartela else 'corte desde la escena anterior',
                    'termina_con': '', 'produccion': ''})
assert [e['frase_ini'] for e in escenas][1:] == [e['frase_fin'] + 1 for e in escenas][:-1]
assert escenas[-1]['frase_fin'] == 48
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas')
