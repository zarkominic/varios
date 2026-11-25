"""Reparto del episodio 48 (El tesoro de Beale: una fortuna escondida en tres páginas de números) en escenas (escribe
escenas.json). Una fila por escena: (id, cartela, frase_ini, frase_fin, [marcas], [guion visual], ánimo, golpes).
- Canon del 43 al 47: relato a lo Farid humanizado, ATOM EN ESCENA y 5 PAUSAS «fíjate» (frases 11, 15, 22, 25 y 28).
- Decorados: A Lynchburg 1820–1845, B el oeste 1817–1821, C el condado de Bedford, D el cuarto del amigo 1862–1885,
  E los buscadores 1898–1983 (nuevos, bl-comun.js) y F el estudio de las pausas (hm-comun.js).
- Nada morboso: el cementerio de 1983, de lejos (iglesia, valla, excavadora y coche del sheriff), sin tumbas. Sin letras,
  salvo los NÚMEROS de las hojas y las letras sueltas de la tira de Gillogly.
- BANDA: Re dórico, 84, instrumentos grabados (violonchelo solista), la celesta en los arpegios agudos.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 're', 'modo': 'dorico', 'tempo': 84, 'motivo': [0, 2, 3, 7, 9, 7, 5, 2], 'sampleado': True, 'biblioteca': 'real',
         'paleta': {'solista': 'chelo', 'metal': 'trompa', 'madera': 'clarinete', 'aire': 'flauta'}}
E = [
 ('bl-gancho', None, 1, 3, ['giro', 'folleto', 'clave'],
  ['C: el bosque de Bedford de noche, bajo la luna; en el suelo, entre hojas, una hoja vieja de papel cubierta de números; golpe en «números».',
   'A y D: un folleto amarillento sobre una mesa; se abre y salen columnas de números (71, 194, 38…); los números flotan sobre el bosque y caen como hojas hacia un punto del suelo; Atom de buscador con farol lo sigue.',
   'D: tres hojas de números en fila; la segunda se ilumina y se convierte en una lista de dibujos (lingotes, monedas, joyas, ollas de hierro); la primera y la tercera siguen a oscuras; al fondo, siluetas de descifradores con lupas que se rinden.'],
  'misterio', ['giro+4.7']),
 ('bl-aviso', None, 4, 4, ['pregunta'],
  ['F: Atom en su estudio coloca en la pizarra las tres hojas de números y una gran interrogación con una pluma de escribir («guárdate esta pregunta»).'],
  'misterio', []),
 ('bl-posada', '1820', 5, 6, ['beale', 'caja'],
  ['A: Lynchburg en invierno, almacenes de tabaco junto al río James con barcas; la posada con su chimenea; un forastero alto y moreno, elegante, charla con todos en el comedor; Morriss detrás del mostrador.',
   'A: el despacho de Morriss; Beale le entrega una caja de hierro con candado; Morriss la guarda en un armario; gag: Atom intenta abrirla con una horquilla y la horquilla se dobla en forma de interrogación.'],
  'intriga', []),
 ('bl-carta', None, 7, 8, ['carta', 'abre'],
  ['A: un cartero entrega una carta a Morriss; gag: Atom vigila el buzón mientras pasan las hojas del calendario de 1822 a 1832 y el buzón sigue vacío.',
   'A: Morriss, mayor, rompe el candado a la luz de una lámpara; dentro, dos cartas y tres hojas de números.'],
  'intriga', ['abre+11.3']),
 ('bl-oeste', '1817', 9, 10, ['oro', 'viaje'],
  ['B: las llanuras con una manada de búfalos y unos jinetes; luego el barranco al atardecer con el campamento y la cena al fuego; un hombre ve brillar algo entre las rocas (el brillo crece).',
   'B y C: una fila de mulas de carga con diez jinetes cruzando montes; luego la taberna de Buford en Bedford con los hombres fingiendo cazar; los picos de Otter al fondo.'],
  'asombro', ['oro+22.3']),
 ('bl-peso', None, 11, 11, ['fijate1'],
  ['PAUSA: la taberna congelada; Atom (al doble) saca a color una balanza con lingotes que pesa tanto como un coche pequeño, ollas de hierro llenas; gag: Atom intenta levantar una olla y se le estiran los brazos; «2921».'],
  'asombro', []),
 ('bl-hojas', None, 12, 13, ['tres', 'amigo'],
  ['A: la carta de Beale; tres hojas sobre la mesa de Morriss, cada una con su dibujo encima (un mapa, una olla, treinta siluetas); Morriss, ya viejo, las mira a la luz de la lámpara.',
   'A: Lynchburg en 1862 con soldados por la calle; Morriss entrega la caja a un hombre más joven sin rostro claro (de espaldas, con sombrero) en la puerta.'],
  'asombro', []),
 ('bl-cuarto', '1862', 14, 14, ['vela'],
  ['D: el cuarto del amigo de noche; la mesa con las tres hojas, una vela y una pila de libros; prueba uno, otro; abre por fin un pergamino grande (la Declaración, sin letras legibles).'],
  'curiosidad', []),
 ('bl-cifrado', None, 15, 15, ['fijate2'],
  ['PAUSA: el cuarto congelado; Atom (al doble) saca a color el pergamino con las palabras como bloques numerados (1, 2, 3…) y una flecha que va del número de la hoja a su bloque y saca la primera letra; gag: Atom cuenta con el dedo, estornuda y vuelve al 1.'],
  'curiosidad', []),
 ('bl-mensaje', None, 16, 17, ['mensaje', 'ruina'],
  ['D: letra a letra salen del papel unas formas luminosas que dibujan el bosque, la cámara de piedra a seis pies y las ollas; el amigo con la vela casi consumida, emocionado.',
   'D: el cuarto años después, vacío de muebles, con los papeles por todas partes; el amigo, mayor y cansado; su familia en la puerta.'],
  'curiosidad', []),
 ('bl-folleto', '1885', 18, 18, ['folleto'],
  ['D: una imprenta de Lynchburg; salen folletos amarillos; un letrero con un 50 en la ventana; luego, humo en una imprenta y un periódico en blanco (nadie lo cuenta).'],
  'curiosidad', []),
 ('bl-hart', '1898', 19, 19, ['medium'],
  ['E y C: una mesa a oscuras con un hombre en trance y dos hermanos; gag: Atom limpia con la manga una bola de cristal empañada; luego el bosque de noche junto a Goose Creek, faroles, palas y un roble; una semana después, Clayton solo con dinamita (solo un resplandor lejano y tierra volando, sin heridos).'],
  'aventura', []),
 ('bl-friedman', '1930', 20, 21, ['friedman', 'hammer'],
  ['E: el despacho de Friedman con máquinas de cifrar y alumnos en pupitres; Friedman con las hojas de Beale, se rinde y las reparte como ejercicio.',
   'E: un calendario de la semana que cambia de «real» a «engaño» (con iconos, sin letras); luego la sala de un ordenador enorme de 1970 con cintas y luces; sale una tira de papel y Hammer la levanta.'],
  'aventura', []),
 ('bl-casi', None, 22, 22, ['fijate3'],
  ['PAUSA: la sala del ordenador congelada; Atom (al doble) saca a color una máquina tragaperras de juguete que se queda a una fruta de ganar y un cerebro que se ilumina igual que con un premio; «2009».'],
  'aventura', []),
 ('bl-parsons', '1983', 23, 23, ['excavadora'],
  ['C y E: una excavadora amarilla junto a la valla de una iglesia blanca en el campo, de lejos y de día (sin tumbas a la vista); llega un coche del sheriff; gag: el detector de Atom pita por sus propios anillos y al final saca una percha.'],
  'aventura', []),
 ('bl-gillogly', '1980', 24, 24, ['tira'],
  ['E: un despacho de 1980 con un ordenador y papel continuo; la primera hoja de Beale y el pergamino; salen letras revueltas y, de pronto, la tira «a b f d e f g h i i j k l m m n o h p p» en grande; gag: Atom la canta y se calla de golpe.'],
  'suspense', ['tira+24.7']),
 ('bl-azar', None, 25, 25, ['fijate4'],
  ['PAUSA: la tira congelada; Atom (al doble) saca a color un bombo de letras que suelta letras revueltas y, al lado, una mano que elige números mirando el pergamino; «1 / 100 000 000 000 000».'],
  'suspense', []),
 ('bl-nickell', '1982', 26, 27, ['stampede', 'registros'],
  ['E: un investigador con lupa sobre las cartas de Beale; una manada que sale en estampida de una página; dos voces (dos bocadillos con garabatos) que se juntan en una sola silueta: Ward.',
   'A: el hotel Washington con un libro de registro; un hueco vacío en la fila de 1820; un retrato de Beale que se vuelve una silueta de papel recortado; la caja, el posadero y el amigo como muñecos de un teatrillo.'],
  'suspense', ['registros+2']),
 ('bl-detalles', None, 28, 28, ['fijate5'],
  ['PAUSA: el teatrillo congelado; Atom (al doble) saca a color una torre de piezas de detalles (1014, 6, 4) que parece más alta y más firme y, sin embargo, se tambalea; «1983».'],
  'suspense', []),
 ('bl-cierre', None, 29, 31, ['bedford', 'quien', 'pregunta'],
  ['C: el bosque de Bedford de día; un aficionado con detector entre los árboles; Atom guarda el folleto en el bolsillo.',
   'A: Lynchburg en 1885 de noche; una ventana con luz donde un hombre escribe números mirando un pergamino; luego, hoy, alguien en algún lugar de Virginia coge una pala.',
   'F: Atom en su estudio cierra el folleto, mira a cámara y señala los comentarios.'],
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
