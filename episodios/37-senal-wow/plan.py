"""Reparto del episodio 37 (La señal «Wow!»: setenta y dos segundos que nadie ha vuelto a oír) en escenas (escribe escenas.json). Una fila por
escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Siete decorados (guion.md): A la gran oreja en su campo de Ohio (de día, de noche, el derribo y el golf), B la sala del
  ordenador de 1977, C la mesa de Ehman con el listado, D el cielo (Sagitario, la nube de hidrógeno, el magnetar, los
  cometas), E otros telescopios (Nuevo México, Tasmania, California), F el archivo (garajes, tarjetas, Puerto Rico) y G
  hoy (el estudio de Atom con su oreja casera; un despacho de 1959).
- CUIDADO: nada de extraterrestres dibujados; la señal es un misterio abierto. Sin letras salvo «6EQUJ5» y «Wow!» del
  listado. Hilo de gags: la «gran oreja» casera de Atom (un embudo y un vaso) y el vecino de arriba.
- Los golpes son NOMBRES DE MARCAS de la misma escena.
- BANDA: Re lidio, 76 por minuto, motivo que sube a la cuarta aumentada.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 're', 'modo': 'lidio', 'tempo': 76, 'motivo': [0, 4, 6, 7, 11, 7, 6, 4]}
E = [
 ('wo-gancho', None, 1, 2, ['wow', 'camino'],
  ['C y A: el listado de papel continuo de cerca, una línea de ceros y unos, y de pronto «6EQUJ5»; un bolígrafo rojo la rodea y escribe «Wow!» (golpe); la gran oreja de noche bajo las estrellas.',
   'A, F y G: la gran oreja de día, con sus dos muros y el suelo brillante; voluntarios con termos y linternas; el listado que pasa; una pantalla de hoy con el ordenador de 1977 imitado.'],
  'misterio', ['wow+13.21']),
 ('wo-hola', None, 3, 3, ['hola'],
  ['G: Atom saluda en su estudio con su «gran oreja» casera (un embudo y un vaso) pegada al techo; solo se oye al vecino de arriba pasar la aspiradora.'],
  'curiosidad', []),
 ('wo-oreja', None, 4, 5, ['ohio', 'cinta'],
  ['A: un campo de Ohio en 1956, obreros y estudiantes con John Kraus (EL.krausWO) levantando los muros de metal.',
   'A y D: el telescopio entero desde el aire, más grande que tres campos de fútbol; la Tierra gira y el cielo pasa por delante como una cinta, y una estrella se cae de la cinta.'],
  'aventura', []),
 ('wo-voluntarios', None, 6, 6, ['voluntarios'],
  ['A: la caseta de los receptores al atardecer; voluntarios que llegan después del trabajo con un termo; un letrero de la caseta sin letras (icono de oreja).'],
  'aventura', []),
 ('wo-hidrogeno', None, 7, 8, ['cocconi', 'emisora'],
  ['G: un despacho de 1959 con dos físicos (EL.cocconiWO, EL.morrisonWO) ante una pizarra con un átomo de hidrógeno dibujado.',
   'D: una nube de hidrógeno en el espacio que «emite» en una sola raya del dial de una radio antigua; la aguja del dial se queda quieta en esa raya.'],
  'curiosidad', []),
 ('wo-noche', '1977', 9, 9, ['noche'],
  ['A y B: la gran oreja de noche, sin nadie; dentro, el ordenador grande como un escritorio y la impresora que escupe papel continuo, que llena la caja, el suelo y sale por la puerta.'],
  'suspense', []),
 ('wo-wow', None, 10, 11, ['listado', 'wow2'],
  ['C: la cocina de Ehman (EL.ehmanWO) con el listado desplegado en la mesa, columnas de unos y espacios; de pronto la línea 6EQUJ5.',
   'C: busca con qué marcar: un lápiz roto, un bolígrafo azul seco… y el rojo; rodea la línea y escribe «Wow!» (golpe).'],
  'asombro', ['wow2+5.58']),
 ('wo-escala', None, 12, 13, ['escala', 'curva'],
  ['C y G: la línea 6EQUJ5 con cada carácter convertido en una barra de altura distinta; la U llega hasta arriba (treinta veces).',
   'D y A: un punto del cielo que cruza el haz de la gran oreja mientras gira la Tierra; la curva sube y baja en setenta y dos segundos.'],
  'curiosidad', []),
 ('wo-sagitario', None, 14, 14, ['sagitario'],
  ['D: el dial con muchas emisoras naturales anchas como manchas y una sola raya fina en el hidrógeno; el cielo con Sagitario.'],
  'curiosidad', []),
 ('wo-segunda', None, 15, 17, ['receptores', 'dos', 'sesenta'],
  ['A: dos trompetillas gigantes en el campo, una al lado de la otra; la primera da un respingo y la segunda se queda esperando tres minutos (sin cara: se inclina).',
   'D: el cielo con dos puntos posibles marcados con un círculo cada uno.',
   'A: un calendario que pasa sesenta hojas mientras el telescopio escucha la misma franja; nada.'],
  'intriga', []),
 ('wo-busqueda', '1995', 18, 19, ['vla', 'caballero'],
  ['E: el conjunto de antenas del desierto de Nuevo México con Gray (EL.grayWO); una antena en Tasmania; las antenas del norte de California.',
   'D y E: Caballero (EL.caballeroWO) busca en un mapa de estrellas una parecida al Sol; dos telescopios la escuchan: nada.'],
  'aventura', []),
 ('wo-explicaciones', None, 20, 21, ['tierra', 'cometas'],
  ['D: un avión y un satélite cruzan el cielo con otro dibujo; un candado sobre la banda del hidrógeno (protegida).',
   'D: dos cometas con su nube pasan; aparecen en los dos receptores a la vez, y un tablero de «Wow!» que salta sin parar.'],
  'curiosidad', []),
 ('wo-golf', None, 22, 22, ['golf'],
  ['A y F: máquinas derriban los muros en 1998; un campo de golf y casas; una pelota rebota en la última plancha («tonk»); el listado en una caja gris de un archivo.'],
  'calma', []),
 ('wo-archivo', '2024', 23, 24, ['paginas', 'nube'],
  ['F: Marc Abel (EL.abelWO) fotografía montones de listados; el laboratorio de Puerto Rico con Méndez (EL.mendezWO) ante las fotos.',
   'D: una nube fría de hidrógeno que se enciende de golpe por el destello de un magnetar.'],
  'curiosidad', []),
 ('wo-programa', None, 25, 26, ['programa', 'cajas'],
  ['F: los listados fotografiados, uno a uno, medidos de nuevo en una pantalla de hoy: la curva vuelve a salir, cuatro veces más alta (golpe); al lado, el programa copiado a mano y la pantalla que imita el ordenador de 1977.',
   'F: un antiguo voluntario abre una caja del garaje y salen tarjetas perforadas como confeti; un gato duerme encima de otra; detrás, estanterías con miles de listados.'],
  'asombro', ['programa+11.83']),
 ('wo-unavez', None, 27, 29, ['unavez', 'posibles', 'cincuenta'],
  ['G: Atom con su oreja casera ante una pizarra: una sola marca, sin otra con la que compararla.',
   'D: tres caminos en el cielo: la nube, un signo de interrogación, y una luz lejana.',
   'F y G: un calendario de agosto de 2027 con un círculo; el equipo de Puerto Rico con montañas de papel.'],
  'calma', []),
 ('wo-cierre', None, 30, 31, ['nunca', 'final'],
  ['G y A: la pizarra de 1959 con su frase en iconos (un cero tachado); los voluntarios en el campo, de noche, escuchando.',
   'G: Atom vuelve a poner su oreja casera en el techo… y el vecino de arriba da un golpecito: tres. Se despide.'],
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
assert escenas[-1]['frase_fin'] == 31
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas')
