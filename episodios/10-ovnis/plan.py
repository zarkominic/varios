"""Reparto del episodio 10 (ovnis) en escenas (escribe escenas.json). Una fila por escena:
(id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo de la música, golpes).
- Estilo canónico pixel chibi (GUIA-ESTILO.md), con ambiente, gags y efectos.
- Seis decorados que se repiten: A el Pacífico (2004), B el monte Rainier (1947), C el rancho de Nuevo México, D Washington de noche
  (1952), E Nevada y la cabina al atardecer, F las oficinas (el Libro Azul y una sala de hoy). Más los mapas y la galaxia.
- Ánimo (herramientas/banda.cjs): suspense (bordón grave que crece y latido), misterio (caja de música y colchón),
  intriga (pulso suave), cierre (colchón cálido). Golpes: la música se corta justo antes de esa marca y entra un golpe grave.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
E = [
 ('ov-gancho', None, 1, 2, ['mar', 'objeto'],
  ['A: el Pacífico a mediodía; dos F/A-18 pasan; abajo el mar empieza a hervir en un círculo de espuma.',
   'A: sobre la espuma, el Tic Tac blanco; el caza baja en espiral y el objeto sube hacia él.'], 'suspense', ['objeto_fin']),
 ('ov-archivos', None, 3, 3, ['archivos'], ['F hoy: un cajón de archivador que se abre solo y deja salir luz; carpetas con «?» y con «✓».'], 'misterio', []),
 ('ov-hola', None, 4, 4, ['hola'], ['F: la sala de hoy de noche, con el ordenador encendido; Atom se presenta.'], 'misterio', []),
 ('ov-mapa', None, 5, 7, ['guerra', 'puntos', 'regla'],
  ['Mapa del mundo de 1947: EE. UU. y la URSS se miran; un hongo atómico pequeño con «?» sobre la URSS.',
   'Mapa de EE. UU.: se encienden cuatro puntos (Rainier, Roswell, Washington, Nevada) y, aparte, el portaaviones.',
   'Dos cielos en pantalla partida: una persona que mira arriba (ojo) y un despacho con un candado.'], 'intriga', []),
 ('ov-arnold', '1947', 8, 9, ['arnold', 'destellos'],
  ['B: la avioneta de Arnold sobre los bosques, el Rainier nevado al fondo; Arnold mira abajo buscando los restos.',
   'B: nueve destellos cruzan en fila delante de las montañas, ondulando; Arnold se gira.'], 'suspense', []),
 ('ov-cronometro', None, 10, 10, ['reloj'], ['B: el reloj del tablero en detalle; los destellos pasan del Rainier al Adams; «×2».'], 'suspense', []),
 ('ov-platillos', None, 11, 12, ['prensa', 'nadie'],
  ['B en tierra: Arnold explica con la mano un platillo que rebota; el periodista dibuja un plato con cúpula y Arnold se tapa la cara (gag).',
   'B al atardecer: la avioneta en el hangar y el cielo vacío sobre el Rainier; «?».'], 'misterio', []),
 ('ov-rancho', None, 13, 13, ['restos'],
  ['C: el rancho, el molino, las ovejas; Brazel recoge tiras brillantes; una oveja se queda con una en la boca (gag).'], 'intriga', []),
 ('ov-roswell', None, 14, 14, ['disco'],
  ['C: la base de Roswell, un periódico que vuela con un platillo dibujado; luego el general en su despacho con los restos y un globo.'], 'intriga', []),
 ('ov-mogul', None, 15, 16, ['mogul', 'sospecha'],
  ['C de noche: el tren de globos Mogul sube con su micrófono hacia las estrellas; «1994».',
   'C: Brazel en el porche mira el cielo estrellado; una estrella fugaz.'], 'misterio', []),
 ('ov-radar', '1952', 17, 18, ['radar', 'cazas'],
  ['D: la torre del aeropuerto de noche; la pantalla de radar verde barre y aparecen siete puntos sobre la ciudad.',
   'D: los cazas cruzan sobre el Capitolio; los puntos desaparecen y vuelven; el controlador da golpecitos a la pantalla (gag).'], 'suspense', []),
 ('ov-prensa52', None, 19, 20, ['rueda', 'libroazul'],
  ['D: la rueda de prensa con micrófonos y flashes; al fondo, un oficial joven niega con la cabeza.',
   'F: la oficina del Libro Azul en los cincuenta, con el mapa de chinchetas y el teléfono que suena.'], 'intriga', []),
 ('ov-area51', '1955', 21, 22, ['base', 'u2'],
  ['E: el lago seco de Nevada con calima; se levantan hangares y una torre; un cartel de prohibido el paso sin palabras.',
   'E: el U-2 despega y sube; cuando aterriza, un coche corre detrás por la pista (gag real); «×3».'], 'intriga', []),
 ('ov-cabina', None, 23, 24, ['atardecer', 'brillo'],
  ['E: la cabina de un avión de línea al atardecer; abajo las luces de los pueblos; arriba, un punto que brilla como una brasa; un pasajero vuelca el café (gag).',
   'E: plano de lado: el sol bajo alcanza las alas plateadas del U-2 muy arriba; el oficinista del Libro Azul cuelga el teléfono.'], 'suspense', ['atardecer_fin']),
 ('ov-secreto', None, 25, 25, ['sospecha2'], ['F: un sobre con un sello se guarda en un cajón con candado.'], 'misterio', []),
 ('ov-expedientes', '1969', 26, 28, ['informes', 'n701', 'cierre'],
  ['F: montañas de carpetas; se derrumban sobre el oficinista y asoma su mano con el café intacto (gag); «12618».',
   'F: de la montaña se separan unas pocas carpetas con «?»: «701».',
   'F: apagan la luz de la oficina; las carpetas con «?» quedan brillando en la oscuridad.'], 'misterio', []),
 ('ov-nyt', '2017', 29, 29, ['nyt'], ['F hoy: un periódico que cae en un portal y se abre con la imagen de un caza.'], 'intriga', []),
 ('ov-princeton', None, 30, 30, ['radar04'],
  ['A: el buque con su radar; en la pantalla, puntos que caen de «24 km» hasta el mar.'], 'suspense', []),
 ('ov-tictac', None, 31, 32, ['fravor', 'desaparece'],
  ['A: Fravor y Dietrich en sus cabinas; abajo el agua agitada y el Tic Tac; Fravor baja en espiral y el objeto le copia.',
   'A: el Tic Tac sale disparado y desaparece; Fravor gira la cabeza buscándolo y se rasca el casco (gag); en el radar reaparece lejos.'], 'suspense', ['fravor_fin']),
 ('ov-autentico', None, 33, 33, ['autentico'], ['F: el vídeo del Tic Tac en un monitor con un sello «✓»; al lado, una carpeta con «?».'], 'misterio', []),
 ('ov-2026', '2026', 34, 34, ['orden'],
  ['F: la sala de hoy; en el ordenador se descargan los archivos y la barra se queda en el 99 %; el gato se tumba en el teclado (gag).'], 'intriga', []),
 ('ov-triangulo', None, 35, 36, ['triangulo', 'nadie2'],
  ['Noche: una valla con focos; dos agentes miran arriba; un triángulo negro tapa las estrellas al pasar, sin ruido.',
   'Noche: el cielo vuelve a quedar estrellado y vacío; «?».'], 'suspense', ['triangulo_fin']),
 ('ov-cielo', None, 37, 38, ['explicados', 'pendientes'],
  ['Un cielo al atardecer en el que aparecen, uno a uno, el globo Mogul, el U-2 y Venus con un «✓».',
   'Tres huecos con «?»: los nueve destellos, las carpetas «701» y el Tic Tac.'], 'misterio', []),
 ('ov-galaxia', None, 39, 40, ['galaxia', 'investigador'],
  ['Zoom fuera desde la Tierra hasta la galaxia; las estrellas se encienden y alrededor de muchas aparecen planetas.',
   'F: la sala de hoy; alguien abre un archivo nuevo con una lupa.'], 'cierre', []),
 ('ov-adios', None, 41, 41, ['adios'], ['A al atardecer: el mar tranquilo, el portaaviones a lo lejos; Atom.'], 'cierre', []),
]

escenas = []
for id_, cartela, a, b, marcas, vis, animo, golpes in E:
    assert len(marcas) == len(vis) == b - a + 1, id_
    escenas.append({'id': id_, 'estilo': 'pixel', 'cartela': cartela, 'frase_ini': a, 'frase_fin': b,
                    'marcas': marcas, 'guion_visual': vis, 'animo': animo, 'golpes': golpes,
                    'empieza_con': 'cartela ' + cartela if cartela else 'corte desde la escena anterior',
                    'termina_con': '', 'produccion': ''})
assert [e['frase_ini'] for e in escenas][1:] == [e['frase_fin'] + 1 for e in escenas][:-1]
assert escenas[-1]['frase_fin'] == 41
json.dump({'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas')
