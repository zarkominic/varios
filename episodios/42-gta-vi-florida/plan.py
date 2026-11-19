"""Reparto del episodio 42 (GTA VI: la Florida real detrás de Leonida) en escenas (escribe escenas.json). Una fila por
escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Ocho decorados (guion.md): A Vice City (Miami), B los Cayos, C Grassrivers (Everglades), D la tienda, el autoservicio y
  la piscina, E la redacción y el archivo, F el móvil vertical, G el interior (caña, Okeechobee, Panhandle, Britton Hill)
  y H el estudio de Atom.
- CUIDADO: nada de imágenes del juego ni logos; Leonida, Jason y Lucia dibujados por nosotros por sus atributos. Nada
  morboso (sin armas, atracos ni heridos). A las personas privadas no se las nombra ni se les ve la cara de cerca.
  Hilo de gags: la caja de la edición física que solo trae un código, y Atom recorriendo la Florida real con mochila.
- Los golpes son NOMBRES DE MARCAS de la misma escena (o «marca+segundos»).
- BANDA: Sol mayor, 116 por minuto, motivo de verano.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'sol', 'modo': 'mayor', 'tempo': 116, 'motivo': [0, 4, 7, 11, 12, 9, 7, 4]}
E = [
 ('lf-gancho', None, 1, 2, ['caiman', 'leonida'],
  ['D: la cámara de seguridad de una tienda de madrugada (hora en pantalla); un caimán pequeño entra y se pasea entre las neveras; golpe en «really happened»; un «2018» y un mapa de Florida.',
   'H, A y G: Atom abre la caja de la edición física (solo un código); Ocean Drive con neones; la carretera sobre el mar; Atom con mochila y un mapa de Florida con cuatro iconos: caimán, puente, titular y una montaña con interrogante.'],
  'asombro', ['caiman+6.0']),
 ('lf-hola', None, 3, 3, ['hola'],
  ['H: Atom saluda en su salón, con la barra de descarga en la tele.'],
  'curiosidad', []),
 ('lf-leonida', None, 4, 6, ['mapa', 'vicecity', 'cayos'],
  ['H: un mapa inventado de Leonida con seis regiones que se encienden una a una; fans dibujando mapas a mano con flechas a Florida.',
   'A: Ocean Drive al atardecer: hoteles pastel, neones que se encienden, patinadores, un descapotable que va despacio.',
   'B: la carretera sobre el mar de isla en isla, puentes largos; Atom en bici; un pelícano le roba el bocadillo; olas bravas al fondo.'],
  'aventura', []),
 ('lf-everglades', None, 7, 10, ['rio', 'caimanes', 'cocodrilo', 'recupera'],
  ['C: el río de hierba hasta el horizonte; el agua que corre despacio (flechas de hierba que se inclinan); una lancha de hélice; un libro de 1947.',
   'C: ojos de caimán asomando por todas partes; un contador que sube hasta 1,3 millones; un mapa con 67 condados que se llenan.',
   'C: un caimán y un cocodrilo en la misma orilla; Atom con las cartulinas U y V; los dientes de abajo del cocodrilo.',
   'C y H: una gráfica que baja y luego sube; un sello de «1987 recuperado»; un caimán que cruza un campo de golf.'],
  'calma', []),
 ('lf-caimanes', '2018', 11, 14, ['tienda', 'broma', 'wendys', 'piscina'],
  ['D: la tienda de madrugada por la cámara de seguridad; el caimán por los pasillos; llega el trampero de la agencia con su pértiga y se lo lleva.',
   'D y H: la escena de la cámara junto a una tele que muestra «un tráiler» dibujado por nosotros con el mismo encuadre; un signo igual que parpadea.',
   'D: el autoservicio de comida rápida de noche; un caimán pequeño entra por la ventanilla; el empleado salta hacia atrás (sin heridos); un «2015».',
   'D: un porche con mosquitera; el caimán la atraviesa como una jarra de refresco; cae en la piscina y el flotador de flamenco sale volando; un «2023».'],
  'intriga', []),
 ('lf-floridaman', None, 15, 17, ['titulares', 'ley', 'prensa'],
  ['E: una impresora escupe titulares que empiezan por «Florida Man» y llenan el suelo.',
   'E: el archivo público: cajones, un mostrador; cualquiera pide un papel y se lo dan; un rótulo «119».',
   'E: periodistas que reciben montones de fichas; un mapa de EE. UU. con otros estados que también encienden; una puerta que se abre y teléfonos que comparten.'],
  'curiosidad', []),
 ('lf-movil', '2017', 18, 20, ['verticales', 'puente', 'satira'],
  ['F: marcos de móvil en vertical que pasan como en una red social; corazones que suben.',
   'F: el MacArthur Causeway al atardecer, en vertical: un coche en marcha con una bailarina en el techo (de lejos); el mar y Miami Beach.',
   'H y A: un espejo de feria que deforma Ocean Drive; carteles con nombres cambiados.'],
  'aventura', []),
 ('lf-interior', None, 21, 23, ['ambrosia', 'kalaga', 'plana'],
  ['G: campos de caña con una refinería humeante y el dique del lago Okeechobee; luego un pueblo de playa algo viejo con una gasolinera.',
   'G: Atom con cuerda, piolet y bandera sube a Britton Hill y llega en tres pasos (golpe en «no mountains»); la placa de 345 pies.',
   'G: un corte de Florida como capas de roca caliza con conchas; el mar que baja; montes de Georgia al fondo; una montaña que aparece en el mapa de Leonida.'],
  'pastoral', ['kalaga+6.0']),
 ('lf-jason', None, 24, 25, ['jason', 'bonnie'],
  ['A y G: dos siluetas (Jason y Lucia, por sus atributos) en un coche junto al mar; una baraja con las cartas en contra; la puerta de una cárcel que se abre al sol.',
   'A: una foto en sepia de una pareja de los años treinta junto a un coche antiguo; un candado sobre un libro: sin destripes.'],
  'misterio', []),
 ('lf-hoy', '2023', 26, 28, ['camino', 'trailer', 'notas'],
  ['H: un calendario: diciembre de 2023, 2025 tachado, mayo de 2026 tachado, 19 de noviembre de 2026 con un círculo.',
   'H: un contador de visitas que sube a 90 millones; Atom abre la caja y solo hay un código; la sacude.',
   'H: la tele con un 99 enorme; Atom lo empuja para que llegue a 100; una gráfica de reservas con «estimación».'],
  'epico', []),
 ('lf-cierre', None, 29, 30, ['espejo', 'final'],
  ['A, C, D y G: el espejo de feria muestra un caimán en la tienda, el puente, el río de hierba, la impresora y la montaña que no está.',
   'H: Atom con el mando y la mochila al lado; el mapa de Florida en la pared, con todo tachado; la barra de descarga llega al 100 %.'],
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
assert escenas[-1]['frase_fin'] == 30
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas')
