"""Reparto del episodio 11 (Theranos) en escenas (escribe escenas.json). Una fila por escena:
(id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo de la música, golpes).
- Estilo canónico pixel chibi y estándar mínimo (ESTANDAR.md): planos de 4–7 s con acción, detalle y gags.
- Ocho decorados (guion.md): A la farmacia Walgreens (2013), B la ciencia de la gota, C Stanford (2003), D la sede de
  Theranos, E la sala del consejo, F el laboratorio, G la redacción del Wall Street Journal (2015), H hoy (tribunal,
  prisión y cine). Más el mapa de papel de EE. UU. (ov-mapas.js).
- Ánimo (herramientas/banda.cjs): suspense, misterio, intriga, cierre. Golpes: la música se corta justo antes de esa
  marca y entra un golpe grave.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
E = [
 ('th-gancho', '2013', 1, 3, ['farmacia', 'promesa', 'secreto'],
  ['A: la farmacia Walgreens de Palo Alto; la clienta se sienta; el pinchazo en el dedo y el tubito diminuto.',
   'A: la promesa: decenas de iconos de pruebas que salen de una gota; la joven del jersey negro; «9.000.000.000 $».',
   'F: detrás de una puerta, el laboratorio a escondidas: las máquinas grandes de otras marcas.'], 'suspense', ['secreto']),
 ('th-vuelta', None, 4, 4, ['vuelta'], ['H: la cola del cine con el cartel del documental; luego todo se rebobina hasta 2003.'], 'misterio', []),
 ('th-hola', None, 5, 5, ['hola'], ['B: una gota de sangre enorme sobre fondo oscuro; Atom se presenta.'], 'misterio', []),
 ('th-stanford', '2003', 6, 7, ['idea', 'deja'],
  ['C: el campus de Stanford; Holmes en su cuarto dibuja el aparato de una gota; el niño y la jeringa (gag).',
   'C: convence al profesor; la puerta de la facultad se cierra detrás de ella; el letrero de la empresa nueva.'], 'intriga', []),
 ('th-jobs', None, 8, 8, ['jobs'], ['D: el armario con diez jerséis negros iguales (gag); el escenario con la máquina como un iPhone.'], 'intriga', []),
 ('th-edison', None, 9, 9, ['edison'], ['D: la sede de cristal; la caja Edison bajo una sábana; guardias, tarjetas, puertas que se cierran.'], 'suspense', []),
 ('th-consejo', None, 10, 11, ['consejo', 'pipeta'],
  ['E: la sala del consejo con los hombres famosos, medallas y banderas; el dinero que entra.',
   'E: un consejero mira una pipeta por el lado equivocado (gag); nadie pregunta.'], 'intriga', []),
 ('th-farmacias', None, 12, 12, ['farmacias'], ['Mapa de EE. UU.: Palo Alto y luego unas cuarenta chinchetas en la zona de Phoenix.'], 'intriga', []),
 ('th-valor', '2014', 13, 13, ['valor'], ['E: el contador de la valoración sube hasta 9.000.000.000; la portada de revista con la silueta del jersey negro.'], 'intriga', ['valor_fin']),
 ('th-gota', None, 14, 15, ['tubos', 'moleculas'],
  ['B: el brazo, la aguja y los tubos; la cucharadita; las máquinas que cuentan moléculas de colores.',
   'B: cada prueba toma su parte; la molécula rara, como una aguja en un pajar.'], 'misterio', []),
 ('th-dedo', None, 16, 18, ['gota', 'azucar', 'resuelto'],
  ['B: la gota del dedo junto a la cucharadita: «÷100»; el líquido de los tejidos que se mezcla.',
   'B: el medidor de azúcar en casa con su gota; luego decenas de pruebas que no caben en una gota.',
   'D: la caja Edison con un lazo, como un regalo.'], 'misterio', []),
 ('th-lab', None, 19, 20, ['falla', 'diluye'],
  ['F: la Edison pita, echa humo y escupe un papel en blanco; un técnico la tapa con una sábana (gag).',
   'F: las máquinas comerciales enormes; la gota se diluye en un tubo grande de agua.'], 'suspense', []),
 ('th-pajar', None, 21, 21, ['pajar'], ['B/F: el técnico busca la sangre con una lupa en el tubo de agua (gag); los resultados en rojo.'], 'suspense', []),
 ('th-tyler', None, 22, 23, ['tyler', 'detectives'],
  ['F: Tyler y Erika ante los controles en rojo; Tyler escribe el correo.',
   'D: la respuesta; Tyler sale con su caja; un coche oscuro le sigue por la calle.'], 'suspense', []),
 ('th-periodista', '2015', 24, 25, ['carreyrou', 'portada'],
  ['G: la redacción; el periodista habla por teléfono con antiguos empleados; el teléfono de los abogados (gag).',
   'G: la rotativa imprime la portada con la gota; los periódicos salen.'], 'intriga', ['portada']),
 ('th-tele', None, 26, 26, ['tele'], ['D/F: Holmes en un plató de televisión; los inspectores con sus carpetas entran en el laboratorio.'], 'suspense', []),
 ('th-anula', None, 27, 27, ['anula'], ['Mapa de Arizona: las chinchetas; resultados que se tachan, uno de cada diez.'], 'suspense', []),
 ('th-cero', None, 28, 28, ['cero'], ['A: Walgreens cierra el rincón de Theranos; el contador gira como una tragaperras hasta 0 (gag).'], 'suspense', ['cero_fin']),
 ('th-sec', '2018', 29, 29, ['sec'], ['D: la sede vacía; se apagan las luces; el letrero se descuelga.'], 'misterio', []),
 ('th-juicio', '2022', 30, 31, ['veredicto', 'condena'],
  ['H: la sala del tribunal de San José; el jurado; el mazo.',
   'H: la sentencia; dos columnas: inversores «✓» y pacientes «X» para ella; Balwani.'], 'suspense', ['veredicto']),
 ('th-prision', None, 32, 32, ['prision'], ['H: el exterior del campo federal de Texas al amanecer; la verja.'], 'misterio', []),
 ('th-documental', '2026', 33, 33, ['documental'], ['H: el cine: la cola, el cartel y la pantalla con una cámara que sigue a alguien.'], 'misterio', []),
 ('th-hoy', None, 34, 34, ['inocencia'], ['H: una carta que sale de la prisión; Erika Cheung da una charla ante emprendedores.'], 'misterio', []),
 ('th-idea', None, 35, 36, ['idea2', 'problema'],
  ['B: pruebas de unas gotas que sí existen; un laboratorio de hoy que investiga.',
   'A: la clienta del principio con su papel de resultados; el «?».'], 'cierre', []),
 ('th-pruebas', None, 37, 38, ['prueba', 'milagro'],
  ['B: una balanza: la promesa y la prueba; la lupa sobre los datos.',
   'B: Atom y la gota de sangre hechas de átomos; «?» → «✓».'], 'cierre', []),
 ('th-adios', None, 39, 39, ['adios'], ['A: la farmacia de hoy, normal, con la gente que entra; Atom.'], 'cierre', []),
]

escenas = []
for id_, cartela, a, b, marcas, vis, animo, golpes in E:
    assert len(marcas) == len(vis) == b - a + 1, id_
    escenas.append({'id': id_, 'estilo': 'pixel', 'cartela': cartela, 'frase_ini': a, 'frase_fin': b,
                    'marcas': marcas, 'guion_visual': vis, 'animo': animo, 'golpes': golpes,
                    'empieza_con': 'cartela ' + cartela if cartela else 'corte desde la escena anterior',
                    'termina_con': '', 'produccion': ''})
assert [e['frase_ini'] for e in escenas][1:] == [e['frase_fin'] + 1 for e in escenas][:-1]
assert escenas[-1]['frase_fin'] == 39
json.dump({'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas')
