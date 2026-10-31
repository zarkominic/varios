"""Reparto del episodio 17 (los tesoros perdidos: el oro de los templarios, el Santo Grial y el rollo de cobre) en escenas
(escribe escenas.json). Una fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por
frase], ánimo, golpes).
- Estilo canónico pixel chibi y estándar mínimo (ESTANDAR.md): planos de 4–7 s con acción, detalle y gags. Ningún
  encuadre se repite dentro de una escena y cada encuadre tiene dos cámaras (la general y otra más cerca).
- Ocho decorados (guion.md): A el Temple de París en 1307, B Ultramar, C el puerto, D la logia, E el Grial,
  F Rennes-le-Château, G el desierto y el taller, H hoy.
- Leyenda y hecho, siempre separados; los masones, con respeto; nada de violencia en imagen (la hoguera, de lejos y
  con humo). Sin letras: pergaminos, cartas y carteles con trazos y pictogramas. Un buscador de tesoros con su detector
  de metales (nuestro) acompaña a Atom de época en época: el hilo de gags.
- Ánimo (herramientas/banda.cjs): suspense, misterio, intriga, cierre, asombro, aventura, curiosidad, calma, epico,
  ternura. Golpes: la música se corta justo antes de esa marca y entra un golpe grave.
- BANDA: la del episodio (se aprueba con el guion y su muestra): Re menor, 90 por minuto, motivo de cantar medieval
  (Re, Fa, La, Sib, La, Fa, Mi, Re).
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 're', 'modo': 'menor', 'tempo': 90, 'motivo': [0, 3, 7, 8, 7, 3, 2, 0]}
E = [
 ('te-gancho', '1307', 1, 3, ['amanecer', 'presos', 'inventario'],
  ['A: París al amanecer, niebla y antorchas; soldados del rey llaman a la vez a la puerta de una casa del Temple; un caballero de manto blanco abre, con cara de sueño.',
   'A (otra cámara): caballeros detenidos en fila en el patio; un soldado con un rollo sellado; campanas al fondo.',
   'A (interior): la gran torre del Temple; soldados abren cofres y un escribano apunta sin parar; los cofres están casi vacíos.'],
  'suspense', ['presos']),
 ('te-pregunta', None, 4, 6, ['tesoro', 'cavando', 'cuales'],
  ['A: el rey Felipe IV en su salón, con su libro de cuentas, mira un cofre vacío con fastidio.',
   'H: hoy, un buscador de tesoros con su detector de metales pita en un campo junto a un castillo en ruinas… y saca una lata (gag 1).',
   'H (mesa): un mapa con tres marcas: una cruz templaria, una copa y un rollo de metal; un «?» sobre cada una.'],
  'aventura', []),
 ('te-hola', None, 7, 7, ['hola'], ['H: el buscador saluda a Atom con el casco y la pala; Atom se presenta.'], 'curiosidad', []),
 ('te-ultramar', '1120', 8, 10, ['jerusalen', 'templo', 'sello'],
  ['B: Jerusalén hacia 1120, murallas doradas al sol; unos pocos caballeros juran ante un altar; peregrinos llegan por un camino de polvo.',
   'B (otra cámara): la explanada del Templo con su gran cúpula; los caballeros instalan sus caballos en las cuadras.',
   'B (cerca): el sello de cera: dos caballeros montados en un solo caballo; el caballo pone cara de cansado.'],
  'aventura', []),
 ('te-banco', None, 11, 13, ['carta', 'ladron', 'banco'],
  ['A/B: un peregrino deja una bolsa de monedas en el mostrador de una casa del Temple y recibe una carta sellada.',
   'B (camino): un ladrón asalta al peregrino, abre la bolsa y solo encuentra la carta; se rasca la cabeza (gag 3); en la otra casa le pagan al peregrino.',
   'B: una casa del Temple que es castillo y banco: barcos en el puerto, rebaños, carros con sacos; un rey firma un préstamo.'],
  'curiosidad', []),
 ('te-rey', None, 14, 15, ['felipe', 'cartas'],
  ['A: el rey Felipe IV abre su libro de deudas y las páginas no se acaban (gag 2); frunce el ceño.',
   'A (otra cámara): mensajeros a caballo salen de París el 14 de septiembre con órdenes secretas selladas.'],
  'intriga', []),
 ('te-hoguera', None, 16, 17, ['papa', 'molay'],
  ['A: un salón con un tribunal; un papa con mitra deja caer un sello sobre un pergamino; caballeros cabizbajos.',
   'A: París al anochecer, de lejos: la isla del Sena con una columna de humo; la gente mira desde la orilla. Sin violencia.'],
  'calma', []),
 ('te-flota', None, 18, 20, ['hospitalarios', 'galeras', 'oido'],
  ['A: carros con cofres que pasan de caballeros de cruz roja a caballeros de cruz blanca (los hospitalarios).',
   'C: un tribunal de 1308; un templario habla y las palabras salen en un bocadillo con dieciocho barcos dibujados.',
   'C: el rumor pasa de boca en boca por un puerto y en cada bocadillo hay más barcos: dos, cinco, dieciocho (gag 4).'],
  'misterio', []),
 ('te-leyenda', None, 21, 23, ['rochelle', 'oak', 'cruz'],
  ['C: un puerto atlántico de noche con niebla; galeras que se alejan con velas con cruz roja, casi fantasmas.',
   'C (mapa): un mapa de papel: la flota dibujada salta a Escocia, a Portugal, a América; una chincheta en Nueva Escocia con un pozo.',
   'H: el buscador limpia una piedra vieja con una cruz tallada y mira a cámara con cara de «¿y si…?».'],
  'misterio', []),
 ('te-logia', '1717', 24, 26, ['taberna', 'canteros', 'ramsay'],
  ['D: una taberna de Londres en 1717: caballeros con peluca brindan alrededor de una mesa; un letrero con un ganso (sin letras).',
   'D (otra cámara): canteros medievales con escuadra y compás levantan una catedral; luego, los mismos gestos en un salón con suelo ajedrezado.',
   'D: un salón de París de 1736; un escocés con peluca habla ante masones con mandil; en una nube de pensamiento, cruzados a caballo.'],
  'calma', []),
 ('te-masones', None, 27, 29, ['alemania', 'orden', 'secreto'],
  ['D (cerca): una logia alemana a la luz de las velas; un hombre se pone un manto blanco con cruz roja; los demás asienten.',
   'H: un desfile de hoy de una orden masónica con mantos y sombreros de pluma (sin letras); un niño saluda.',
   'D: un cofre que se abre y dentro solo hay un sobre con un «?»; el buscador lo mira, confundido.'],
  'calma', []),
 ('te-perceval', '1190', 30, 32, ['chretien', 'sin-terminar', 'boron'],
  ['E: un scriptorium medieval; un poeta escribe a la luz de una vela; en un bocadillo, un joven caballero ve pasar un objeto que brilla.',
   'E (cerca): la última hoja del libro, a medio escribir; la pluma se queda quieta; la vela se apaga.',
   'E: otro poeta, en otra mesa, escribe su propio libro y dibuja una copa en una cena; la copa brilla.'],
  'asombro', []),
 ('te-castillo', None, 33, 34, ['wolfram', 'iglesias'],
  ['E: el castillo del Grial de Wolfram: una piedra luminosa en un altar, guardada por caballeros con manto blanco; una procesión con velas.',
   'E (otra cámara): una fila de copas en un mostrador que dicen ser el Grial; cuando el buscador elige una, aparece otra al final de la fila (gag 5).'],
  'asombro', []),
 ('te-valencia', None, 35, 36, ['agata', 'cerca'],
  ['E: la capilla de la catedral de Valencia; la copa de ágata roja en su vitrina, con asas de oro y perlas; un papa celebra misa.',
   'E (cerca): la copa de ágata de cerca, con la luz que la atraviesa; Atom la mira de lejos, sin tocar.'],
  'asombro', []),
 ('te-sauniere', '1885', 37, 39, ['llega', 'villa', 'misas'],
  ['F: Rennes-le-Château en su colina; un cura joven y pobre llega en un carro con su maleta.',
   'F (otra cámara): la villa con jardín y la torre de piedra; el cura pasea, satisfecho.',
   'F (cerca): el cura recibe montones de sobres por correo; el obispo, detrás, cuenta los sobres con cara seria.'],
  'curiosidad', []),
 ('te-corbu', None, 40, 41, ['hotel', 'pergaminos'],
  ['F: el hotel en la villa en los años cincuenta; el dueño habla con periodistas que apuntan; llega un autobús de turistas.',
   'F (cerca): una mesa con pergaminos llenos de trazos; una mano los mancha de té para que parezcan viejos.'],
  'curiosidad', []),
 ('te-queso', None, 42, 43, ['libros', 'prohibido'],
  ['H: una librería con montañas de libros y una película en un cine; colas de gente.',
   'F: el pueblo lleno de agujeros como un queso; el buscador sale de uno con el casco y el cartel de «prohibido cavar» (pictograma de pala tachada) le cae en la cabeza (gag 6).'],
  'curiosidad', []),
 ('te-qumran', '1952', 44, 46, ['cueva', 'oxidado', 'sierra'],
  ['G: las cuevas de Qumrán sobre el mar Muerto, al atardecer; arqueólogos con lámparas sacan de una cueva un rollo verdoso partido en dos.',
   'G (cerca): el rollo de cobre verde y quebradizo en una mesa; una mano los toca y cae un trocito.',
   'G (taller): un taller de Manchester de 1956; un ingeniero corta el rollo con una sierra muy fina en una máquina; las tiras se ponen en fila.'],
  'misterio', []),
 ('te-lista', None, 47, 49, ['lista', 'griego', 'toneladas'],
  ['G (cerca): las tiras puestas en orden: renglones de trazos (sin letras) con lingotes y monedas dibujados en el margen.',
   'G (cerca, otra luz): una lupa sobre una línea; aparecen letras griegas sueltas como símbolos dorados y un «?».',
   'G: una montaña de lingotes y vasijas que crece hasta llenar el plano; una balanza se rompe.'],
  'misterio', ['lista']),
 ('te-indicaciones', None, 50, 51, ['escalones', 'museo'],
  ['G: el buscador en el desierto lee «bajo los escalones que van hacia el este»; mira a su alrededor y hay escalones por todas partes (gag 7).',
   'H: el museo de Amán: las tiras del rollo en su vitrina; una niña las mira con la nariz pegada al cristal.'],
  'curiosidad', []),
 ('te-fenn', '2010', 52, 54, ['cofre', 'poema', 'aguas'],
  ['H: las montañas Rocosas; un hombre mayor con sombrero lleva un cofre de bronce por un sendero entre pinos.',
   'H (mesa): un libro con un poema (renglones sin letras) y cientos de buscadores con mochilas, mapas y prismáticos.',
   'H: una fuente termal que humea en la montaña y un río que se enfría; una flecha dibujada en el aire.'],
  'aventura', []),
 ('te-encontrado', None, 55, 56, ['encontrado', 'unico'],
  ['H: un estudiante con mochila encuentra el cofre entre las rocas; el detector del buscador pita por fin por algo de verdad… y el cofre ya tiene dueño (gag 8).',
   'H (otra cámara): el estudiante y el hombre mayor se dan la mano junto al cofre abierto, que brilla.'],
  'ternura', []),
 ('te-cierre', None, 57, 59, ['papel', 'escalon', 'adios'],
  ['B/H: la carta sellada de los templarios se convierte en un billete y luego en una tarjeta de hoy que paga en una tienda.',
   'H: el atardecer; el buscador se sienta en un escalón de piedra con su detector; el detector pita bajito.',
   'H: el buscador mira al este y sonríe; Atom.'],
  'cierre', []),
]

escenas = []
for id_, cartela, a, b, marcas, vis, animo, golpes in E:
    assert len(marcas) == len(vis) == b - a + 1, id_
    escenas.append({'id': id_, 'estilo': 'pixel', 'cartela': cartela, 'frase_ini': a, 'frase_fin': b,
                    'marcas': marcas, 'guion_visual': vis, 'animo': animo, 'golpes': golpes,
                    'empieza_con': 'cartela ' + cartela if cartela else 'corte desde la escena anterior',
                    'termina_con': '', 'produccion': ''})
assert [e['frase_ini'] for e in escenas][1:] == [e['frase_fin'] + 1 for e in escenas][:-1]
assert escenas[-1]['frase_fin'] == 59
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
