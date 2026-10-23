"""Reparto del episodio 8 (antiguo Egipto) en escenas (escribe escenas.json). Una fila por escena: (id, cartela,
frase_ini, frase_fin, [marca por frase], [guion visual por frase]). Estilo canónico pixel chibi (GUIA-ESTILO.md): cinco
decorados que se repiten (A Nilo, B Guiza, C trono, D tumba, E Alejandría) más los mapas.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
E = [
 ('eg-hola', None, 1, 1, ['hola'], ['B: Guiza al atardecer con las pirámides terminadas; la caja baja y Atom saluda.']),
 ('eg-gancho', None, 2, 4, ['cleopatra', 'piensalo', 'pregunta'],
  ['Una línea de tiempo en el cielo del desierto: la pirámide (2560), Cleopatra (69) y la Luna con un cohete (1969); el marcador de Cleopatra queda más cerca de la Luna.',
   'B: Cleopatra de turista ante una pirámide vieja y gastada, mirándola con la boca abierta.',
   'A: el Nilo de lado a lado al amanecer; «?» en la caja.']),
 ('eg-mapa', None, 5, 5, ['mapa'], ['Mapa: zoom al noreste de África, todo desierto; el Nilo se dibuja de sur a norte en verde y azul.']),
 ('eg-crecida', None, 6, 6, ['crecida'], ['A: el río crece, cubre los campos y al retirarse deja barro negro brillante.']),
 ('eg-tierras', None, 7, 7, ['tierras'], ['Mapa cerca: la franja negra y verde del Nilo y a los lados el desierto rojo.']),
 ('eg-plan', None, 8, 8, ['plan'], ['A: el mismo río crece otra vez; en la caja un reloj y un sol: cada año a la misma hora.']),
 ('eg-escribas', None, 9, 11, ['sobra', 'escribas', 'nilometro'],
  ['A: sacos de grano que se apilan junto a los silos de adobe.',
   'A: un escriba sentado anota en un papiro; números en la caja.',
   'A: el nilómetro, unas escaleras dentro del río; el agua sube por las marcas y el escriba sube el impuesto.']),
 ('eg-narmer', '3100', 12, 13, ['narmer', 'formula'],
  ['C: Narmer con la corona blanca del sur recibe la roja del norte y se juntan en una doble corona.',
   'C: plano general: el faraón en su trono y una fila de escribas.']),
 ('eg-dios', None, 14, 14, ['dios'], ['C: el faraón con rayos de sol detrás; la gente se inclina.']),
 ('eg-imhotep', '2650', 15, 15, ['imhotep'], ['B: Imhotep mira cómo se apilan seis tumbas y forman la pirámide escalonada.']),
 ('eg-keops', '2560', 16, 16, ['keops'], ['B: la Gran Pirámide crece capa a capa y se reviste de blanco; «2000000» en la caja.']),
 ('eg-obreros', None, 17, 18, ['obreros', 'turnos'],
  ['B: el pueblo de los obreros: hornos de pan, jarras de cerveza, unos tiran de un bloque y a uno le entablillan una pierna.',
   'A → B: la crecida cubre los campos y los campesinos se van caminando hacia la obra.']),
 ('eg-sequia', '2181', 19, 20, ['sequia', 'rompe'],
  ['A: el río bajo, campos agrietados, un granero vacío y el faraón preocupado.',
   'Mapa: Egipto se parte en trozos de colores.']),
 ('eg-hicsos', '1650', 21, 22, ['carros', 'imperio'],
  ['A, orilla seca: unos invasores llegan en carros tirados por caballos y los egipcios se asustan.',
   'Mapa: el imperio se extiende de Nubia a Siria.']),
 ('eg-hatshepsut', None, 23, 23, ['hatshepsut'], ['C: Hatshepsut en el trono; se pone el nemes y la barba postiza.']),
 ('eg-akenaton', None, 24, 24, ['akenaton'], ['C: Akenatón bajo el disco del sol con rayos que acaban en manos; luego un cincel borra su nombre de la pared.']),
 ('eg-tutankamon', None, 25, 25, ['tutankamon'], ['C: un niño con la corona grande en un trono enorme; «9» y luego «19» en la caja.']),
 ('eg-ramses', '1259', 26, 26, ['ramses'], ['C: Ramsés con una fila de hijos que no acaba; luego un egipcio y un hitita se dan la mano.']),
 ('eg-momia', None, 27, 28, ['muerte', 'momia'],
  ['D: el taller de embalsamar; un sacerdote con máscara de chacal junto a la mesa.',
   'D: vendas, sal, los cuatro vasos y el gancho; el cerebro va a una cesta.']),
 ('eg-balanza', None, 29, 29, ['balanza'], ['D: la balanza con el corazón y la pluma; el monstruo espera con la boca abierta.']),
 ('eg-valle', '1157', 30, 31, ['valle', 'huelga'],
  ['B → D: ladrones salen de una pirámide con oro; luego el Valle de los Reyes con entradas de tumbas en la roca.',
   'D exterior: los obreros se sientan de brazos cruzados; «0» en la caja.']),
 ('eg-carter', '1922', 32, 32, ['carter'], ['D: un arqueólogo con una vela asoma por un agujero y brilla el oro; la máscara de Tutankamón.']),
 ('eg-crisis', '1177', 33, 33, ['crisis'], ['Mapa del Mediterráneo con fuegos que se encienden por todas partes; Egipto aguanta.']),
 ('eg-extranjeros', '332', 34, 34, ['extranjeros'], ['C: en el trono se suceden coronas extranjeras; luego E: Alejandría con el faro.']),
 ('eg-cleopatra', '30', 35, 36, ['cleopatra2', 'roma'],
  ['E: Cleopatra en su barco real en el puerto de Alejandría.',
   'E: llegan legionarios romanos con su estandarte del águila; la bandera cambia.']),
 ('eg-rio', None, 37, 37, ['rio'], ['A: el río crece y baja varias veces; los campesinos recogen y el escriba cuenta, una y otra vez.']),
 ('eg-rosetta', '1799', 38, 39, ['olvido', 'rosetta'],
  ['D: una pared de jeroglíficos que se apaga y se cubre de arena.',
   'A, orilla seca: soldados franceses desentierran una piedra; luego Champollion en su mesa con una vela; «1822» en la caja.']),
 ('eg-legado', None, 40, 40, ['legado'], ['C: un calendario con «365» y una hoja de papiro que se convierte en papel.']),
 ('eg-caliza', None, 41, 42, ['caliza', 'mar'],
  ['B: un bloque de la pirámide de cerca; en la piedra se ven conchitas fósiles.',
   'Bajo el mar hace 50 millones de años: bichitos con concha que caen al fondo y se hacen roca; luego la pirámide.']),
 ('eg-final', None, 43, 43, ['final'], ['B: la pirámide al atardecer con olas de mar dibujadas sobre su piedra.']),
 ('eg-adios', None, 44, 44, ['adios'], ['B de noche con estrellas; Atom en su caja con el «?».']),
]

escenas = []
for id_, cartela, a, b, marcas, vis in E:
    assert len(marcas) == len(vis) == b - a + 1, id_
    escenas.append({'id': id_, 'estilo': 'pixel', 'cartela': cartela, 'frase_ini': a, 'frase_fin': b,
                    'marcas': marcas, 'guion_visual': vis,
                    'empieza_con': 'cartela ' + cartela if cartela else 'corte desde la escena anterior',
                    'termina_con': '', 'produccion': ''})
assert [e['frase_ini'] for e in escenas][1:] == [e['frase_fin'] + 1 for e in escenas][:-1]
json.dump({'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas')
