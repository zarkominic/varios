"""Reparto del episodio 25 (El manuscrito Voynich: el libro que nadie puede leer) en escenas (escribe escenas.json).
Una fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Cinco decorados (guion.md): A la biblioteca de Yale, B Praga y Roma, C los descifradores, D el laboratorio, E hoy.
- Las páginas del libro se reinterpretan en pixel (plantas, ruedas de estrellas, estanques, tarros), sin copiar páginas
  enteras; las figuras de los estanques, pequeñas y sin desnudos. Personas reales por sus atributos, sin logos ni letras
  legibles. Hilo de gags: la planta imposible de la maceta de Atom.
- Los golpes son NOMBRES DE MARCAS de la misma escena.
- BANDA: Si menor, 84 por minuto, motivo de manuscrito propio.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'si', 'modo': 'menor', 'tempo': 84, 'motivo': [0, 2, 3, 7, 5, 3, 2, 0]}
E = [
 ('vm-gancho', None, 1, 2, ['libro', 'pistas'],
  ['A: la sala de libros raros de Yale de noche, con la luz filtrada por el mármol; el libro abierto en su atril; las letras desconocidas de la página brillan y no se dejan leer; un sello de descifrado de la guerra y una pantalla de ordenador con un «?».',
   'A y E: pasan las pistas como en un tablero de detective: una moneda de oro con una corona, un microscopio, una etiqueta de librero; hilos rojos las unen y en el centro el libro con un «?».'],
  'misterio', ['libro']),
 ('vm-hola', None, 3, 3, ['hola'],
  ['E: Atom saluda en su estudio; en la maceta de la mesa crece una planta imposible (raíz de patas, hojas en espiral) (gag 1).'],
  'curiosidad', []),
 ('vm-pergamino', None, 4, 4, ['pergamino'],
  ['A (la mesa de estudio): el libro de cerca: el pergamino amarillento, las líneas de letras redondas que no existen en ningún alfabeto; Atom mira con lupa y las letras se mueven para no dejarse leer (gag 2); un recuento de signos (20–30) aparece al lado.'],
  'asombro', []),
 ('vm-dibujos', None, 5, 5, ['dibujos'],
  ['A (inserto de páginas): una planta con raíces como patas, una rueda de estrellas con signos del zodiaco, figuras pequeñas en estanques verdes unidos por tubos (sin desnudos), tarros de botica; las páginas pasan solas.'],
  'asombro', []),
 ('vm-pista', None, 6, 6, ['pista'],
  ['A: la biblioteca; sobre la mesa se despliega un mapa de Europa con hilos que van de Praga a Roma y a Nueva York; una lupa recorre el camino del libro.'],
  'asombro', []),
 ('vm-marci', '1665', 7, 7, ['marci'],
  ['B (el estudio de Marci en Praga en 1665): el médico escribe una carta a la luz de una vela, la dobla y la sella; la carta viaja a Roma; Kircher, jesuita con sotana entre jeroglíficos, la abre; un saco de 600 monedas de oro aparece como recuerdo.'],
  'aventura', []),
 ('vm-baresch', None, 8, 8, ['baresch'],
  ['B (el laboratorio de un alquimista de Praga hacia 1639): Baresch entre alambiques copia unas páginas; manda la copia a Roma; Kircher se rasca la cabeza.'],
  'aventura', []),
 ('vm-rodolfo', None, 9, 9, ['rodolfo'],
  ['B (el gabinete de curiosidades de Rodolfo II en Praga hacia 1610): relojes, un cocodrilo disecado colgado, astrolabios, alquimistas; el emperador paga una bolsa de monedas y el libro le hace una reverencia (gag 3); la primera página con luz ultravioleta deja ver una firma borrada.'],
  'aventura', []),
 ('vm-mondragone', '1912', 10, 10, ['voynich'],
  ['B (la villa Mondragone cerca de Roma en 1912): una sala de la villa con cajas de libros de los jesuitas; Wilfrid Voynich, librero con bigote, saca el libro de una caja y lo levanta con cara de tesoro.'],
  'aventura', []),
 ('vm-kraus', None, 11, 11, ['kraus'],
  ['B y A (Nueva York y Yale): una caja fuerte con el libro dentro; un cartel de precio que sube a 100.000 sin compradores; el libro llega a la biblioteca de Yale con su número 408 en la etiqueta.'],
  'aventura', []),
 ('vm-newbold', '1921', 12, 12, ['newbold'],
  ['C (el despacho de un profesor de Filadelfia en 1921): Newbold con su microscopio, al lado los periódicos que salen volando; en el ocular, unas marcas diminutas que parecen letras… y es una mosca (gag 4).'],
  'intriga', []),
 ('vm-manly', None, 13, 13, ['manly'],
  ['C (el mismo despacho, años después): Manly enseña con un puntero que las marcas son grietas de tinta seca; dos papeles con traducciones distintas del mismo párrafo se cruzan con una X.'],
  'intriga', []),
 ('vm-friedman', None, 14, 14, ['friedman'],
  ['C (una oficina de descifrado de los cuarenta): Friedman con gafas y su equipo pasan el texto a fichas; una máquina imprime una tira de papel infinita con un «?» al final (gag 5).'],
  'intriga', []),
 ('vm-carbono', '2009', 15, 15, ['carbono'],
  ['D (el laboratorio de radiocarbono de Arizona en 2009): pinzas que toman una muestra diminuta del borde del pergamino; el acelerador; en la pantalla, la franja 1404–1438.'],
  'curiosidad', ['carbono']),
 ('vm-fecha', None, 16, 16, ['fecha'],
  ['D: una línea del tiempo en la pared con Roger Bacon (muere en 1292) muy a la izquierda, el libro en 1404–1438 y una carabela de 1492 a la derecha; las teorías de Bacon y del fraude de Voynich se tachan.'],
  'curiosidad', []),
 ('vm-estadistica', None, 17, 17, ['estadistica'],
  ['D (la sala de ordenadores): una gráfica de frecuencias de palabras que se parece a la de los idiomas; las barras se ponen en fila como si bailaran (gag 6); cinco plumas con tintas distintas sobre la mesa.'],
  'curiosidad', []),
 ('vm-rarezas', None, 18, 18, ['rarezas'],
  ['D: una página proyectada con las palabras repetidas dos y tres veces seguidas marcadas en amarillo; letras que solo salen al principio y al final de las líneas, marcadas; dos montones de palabras distintos para plantas y estrellas.'],
  'curiosidad', []),
 ('vm-teorias', None, 19, 19, ['teorias'],
  ['A: tres carpetas sobre la mesa: un candado (código), un pueblo perdido (idioma), una máscara de teatro (fraude); se abren una tras otra.'],
  'misterio', []),
 ('vm-plantas', None, 20, 20, ['plantas'],
  ['A y E: dos botánicos comparan una página con un girasol de verdad; un mapa de América se ilumina y luego se apaga junto a la franja de 1404–1438.'],
  'misterio', []),
 ('vm-ia', None, 21, 21, ['ia'],
  ['E (una pantalla moderna): un programa de inteligencia artificial escupe palabras sueltas; los expertos las revisan y salen sellos de «no»; lo mismo con la propuesta de 2019.'],
  'misterio', []),
 ('vm-fraude', None, 22, 22, ['fraude'],
  ['A: cinco escribas del siglo quince en un taller con plumas, cada uno con su letra; una balanza: en un plato «galimatías», en el otro «libro de verdad», y queda igualada.'],
  'misterio', []),
 ('vm-reves', None, 23, 23, ['reves'],
  ['A y E: el libro rodeado de todas sus etiquetas (piel, fecha, cinco manos, Praga, Roma, Yale) y en el centro un «?»; la pantalla de Atom con el libro escaneado.'],
  'cierre', []),
 ('vm-cierre', None, 24, 24, ['cierre'],
  ['E (el estudio de Atom de noche): la planta de la maceta le pone una flor en la cabeza y vuelve a crecer (gag 7).'],
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
assert escenas[-1]['frase_fin'] == 24
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
