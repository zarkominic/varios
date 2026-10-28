"""Reparto del episodio 13 (la física del fútbol americano) en escenas (escribe escenas.json). Una fila por escena:
(id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo de la música, golpes).
- Estilo canónico pixel chibi y estándar mínimo (ESTANDAR.md): planos de 4–7 s con acción, detalle y gags.
- Ocho decorados (guion.md): A West Point (1913), B Cedar Point (1913), C Washington y el campo de 1905, D el campo de
  1906, E el laboratorio del giro, F la fábrica de Ada (Ohio), G el estadio de la patada (Las Vegas cubierto y Denver
  con nieve), H el laboratorio del casco y el estadio de hoy. Más el mapa de papel de EE. UU. (ov-mapas.js).
- Sin marcas de la NFL ni escudos de equipos reales: colores genéricos y escudos inventados.
- Ánimo (herramientas/banda.cjs): suspense, misterio, intriga, cierre, asombro, aventura, curiosidad, calma, epico,
  ternura. Golpes: la música se corta justo antes de esa marca y entra un golpe grave.
- BANDA: la del episodio (se aprueba con el guion y su muestra): Re mayor, 112 por minuto, motivo de fanfarria de
  estadio (Re, Fa#, La, Re agudo, Do#, La, Si, La).
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 're', 'modo': 'mayor', 'tempo': 112, 'motivo': [0, 4, 7, 12, 11, 7, 9, 7]}
E = [
 ('fa-gancho', '1913', 1, 3, ['westpoint', 'mele', 'pase'],
  ['A: West Point en otoño, gradas de madera llenas de cadetes de gris, el Hudson detrás; salen los dos equipos; la mula del Ejército en la banda.',
   'C/A: una melé enorme, jugadores apilados empujando el balón gordo yarda a yarda; el polvo y el barro.',
   'A: Dorais retrocede y lanza; el balón gira en el aire en una curva larga; Rockne corre solo por la banda y lo atrapa; la mula se come el programa de un cadete (gag).'],
  'aventura', []),
 ('fa-gana', None, 4, 4, ['gana'],
  ['A: el marcador de madera «35 · 13»; sombreros al aire; periodistas con cámaras de fuelle; un repartidor de periódicos con la portada del pase (dibujo, sin letras).'],
  'aventura', ['gana']),
 ('fa-pregunta', None, 5, 5, ['pregunta'],
  ['H: un estadio de hoy de noche; el pase en espiral a cámara lenta; la punta del balón baja en mitad del vuelo; «600» y «?».'], 'curiosidad', []),
 ('fa-hola', None, 6, 6, ['hola'], ['H: el balón girando en primer plano sobre el césped del estadio vacío; Atom se presenta.'], 'curiosidad', []),
 ('fa-bruto', '1905', 7, 8, ['bruto', 'roosevelt'],
  ['C: el campo embarrado de 1905, la melé en cuña, jugadores sin casco que se levantan doloridos, un médico con maletín; el mapa: Columbia se apaga.',
   'C: la Casa Blanca por fuera; el despacho con Roosevelt de pie y los representantes de tres universidades; el osito con casco diminuto sobre el escritorio (gag).'],
  'intriga', []),
 ('fa-reglas', None, 9, 10, ['reglas', 'cochems'],
  ['C: un libro de reglas abierto con flechas nuevas dibujadas; una flecha hacia delante aparece por primera vez; una zona prohibida en el centro de la línea.',
   'D: Saint Louis, un campo de entrenamiento cerrado con vallas; Cochems hace practicar el pase a escondidas; un vecino curioso asoma por la valla.'],
  'intriga', []),
 ('fa-primero', '1906', 11, 11, ['primero'],
  ['Mapa: Saint Louis → Waukesha (Wisconsin). D: el primer pase cae al suelo y el rival recoge el balón; luego Robinson lanza y Schneider atrapa a veinte yardas; público de bombín.'],
  'aventura', []),
 ('fa-cedar', None, 12, 13, ['cedar', 'melon'],
  ['B: Cedar Point en verano de 1913; el hotel grande, la torre de socorrista; Dorais y Rockne con camisetas de socorrista se lanzan el balón en la arena entre turnos.',
   'B: primer plano del balón de rugby gordo; una mano no lo abarca y se le escurre.'],
  'aventura', []),
 ('fa-forma', None, 14, 15, ['forma', 'pato'],
  ['E: una fila de balones de distintas épocas, del gordo al estilizado; el de hoy corta el aire con líneas de viento.',
   'E: un balón lanzado sin giro da volteretas y frena; pasa sobre un estanque y un pato lo mira ofendido (gag).'],
  'curiosidad', []),
 ('fa-giro', None, 16, 16, ['giro'],
  ['E: el balón girando en el túnel de viento con un contador «600»; la peonza de la mesa girando a su lado; flecha del eje.'], 'curiosidad', []),
 ('fa-enigma', '2020', 17, 18, ['enigma', 'cabeceo'],
  ['E: la pizarra con la trayectoria y el balón con la punta arriba; «?»; el físico con dos colegas lo resuelven: «✓».',
   'E: el aire empuja la punta; el balón cabecea despacio alrededor de su trayectoria y la punta baja; la peonza cabecea al mismo ritmo (gag).'],
  'asombro', []),
 ('fa-deriva', None, 19, 19, ['deriva'],
  ['E/H: vista desde arriba de un pase largo: el de un diestro se curva un poco a la derecha, el de un zurdo a la izquierda; la Tierra girando: «4″».'], 'asombro', []),
 ('fa-ada', None, 20, 21, ['ada', 'cordones'],
  ['Mapa: Ada, Ohio. F: la calle del pueblo y la fábrica; dentro, cuatro paneles de cuero cortados; un cerdo en un cartel tacha su dibujo y aparece una vaca (pictogramas).',
   'F: la cadena: cortar, estampar, coser, dar la vuelta, poner los cordones, inflar; el gato de la fábrica juega con un cordón y se enreda (gag).'],
  'calma', []),
 ('fa-duke', None, 22, 23, ['duke', 'superbowl'],
  ['F: la estampa del balón (sin letras: una corona); recuerdo en sepia del niño recogepelotas en un estadio de los años veinte.',
   'F: se encienden las luces de la fábrica de noche; salen cajas de balones con dos escudos inventados; un camión parte de madrugada.'],
  'calma', []),
 ('fa-patada', None, 24, 25, ['patada', 'contacto'],
  ['G: el pateador corre hacia el balón sujeto por el compañero; el pie llega; congelado: «0,01 s».',
   'G: el balón se aplasta contra el pie y sale girando de punta a punta; «60 mph»; vuela hacia los postes.'],
  'suspense', []),
 ('fa-denver', None, 26, 26, ['denver'],
  ['G: el estadio abierto de Denver con las montañas nevadas detrás; el aire con menos puntitos que a nivel del mar; empieza a nevar y los puntitos se apiñan.'], 'suspense', []),
 ('fa-record', '2025', 27, 28, ['record', 'kballs'],
  ['Mapa: Las Vegas. G: el estadio cubierto; el balón del récord vuela «68» yardas entre los postes; la paloma del larguero se agacha (gag).',
   'G: el vestuario: una caja de balones con una «K» y numerados; el pateador los cepilla y los ablanda; en pretemporada, otro balón entra desde «69».'],
  'epico', ['record']),
 ('fa-choque', None, 29, 29, ['choque'],
  ['H: un liniero sale disparado; al lado, un coche pequeño avanzando muy despacio con una flecha de impulso igual.'], 'curiosidad', []),
 ('fa-casco', None, 30, 31, ['frenar', 'cascos'],
  ['H: la torre de caídas: un huevo con funda acolchada aterriza entero; el de al lado, sin funda, no tanto (gag); la gráfica de fuerza más baja y más larga.',
   'H: la vitrina de cascos, del cuero al plástico; un campo de entrenamiento con jugadores con la funda acolchada encima del casco.'],
  'curiosidad', []),
 ('fa-chips', '2026', 32, 33, ['chips', 'datos'],
  ['H: el balón y unas hombreras en corte, con el chip dentro «3 g»; las antenas del estadio; los puntos de los jugadores en una pantalla.',
   'H: la sala de datos: velocidades de los jugadores y la trayectoria de cada pase en pantallas; entrenadores mirando.'],
  'asombro', []),
 ('fa-superbowl', None, 34, 34, ['superbowl'],
  ['Mapa: Inglewood. H: el estadio de la Super Bowl de noche con su techo translúcido; el calendario «14» de febrero de «2027».'], 'epico', []),
 ('fa-cierre', None, 35, 36, ['cierre', 'siglo'],
  ['A/H: el pase de West Point de 1913 y un pase de hoy, uno junto al otro; los dos balones bajan la punta a la vez.',
   'H: el balón vuela recto sobre el estadio; los decorados del episodio pasan por debajo.'],
  'cierre', []),
 ('fa-adios', None, 37, 37, ['adios'], ['H: el balón aterriza en las manos que corren por la banda; Atom.'], 'cierre', []),
]

escenas = []
for id_, cartela, a, b, marcas, vis, animo, golpes in E:
    assert len(marcas) == len(vis) == b - a + 1, id_
    escenas.append({'id': id_, 'estilo': 'pixel', 'cartela': cartela, 'frase_ini': a, 'frase_fin': b,
                    'marcas': marcas, 'guion_visual': vis, 'animo': animo, 'golpes': golpes,
                    'empieza_con': 'cartela ' + cartela if cartela else 'corte desde la escena anterior',
                    'termina_con': '', 'produccion': ''})
assert [e['frase_ini'] for e in escenas][1:] == [e['frase_fin'] + 1 for e in escenas][:-1]
assert escenas[-1]['frase_fin'] == 37
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas')
