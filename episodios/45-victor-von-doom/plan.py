"""Reparto del episodio 45 (Victor von Doom: el villano que solo quería recuperar a su madre) en escenas (escribe
escenas.json). Una fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase],
ánimo, golpes).
- Canon del 43: relato hablado, ATOM EN ESCENA y 6 PAUSAS «fíjate» (frases 15, 18, 21, 27, 30 y 36: el mundo en gris azulado,
  Atom a color explica).
- Narración humanizada (regla del 21/11/2026): párrafos que fluyen, sin afirmaciones cortas.
- Decorados: A Latveria, B la universidad, C el Tíbet, D el reino de Mefisto y E Battleworld (nuevos, vd-comun.js) y F
  el estudio de las pausas (de hm-comun.js).
- DERECHOS: nada de las películas ni de los cómics (ni viñetas, ni dibujos, ni logotipos); Doom por sus atributos
  (armadura gris, capa y capucha verdes, máscara de hierro). Sin letras (solo números y símbolos).
- CUIDADO: la violencia nunca se ve (el sacrificio de Valeria y las muertes se cuentan, con luz y de lejos); el infierno,
  estilizado y sin nada morboso.
- BANDA: Sol menor, 84 por minuto, sampleada (violín solista); sin campanitas.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'sol', 'modo': 'menor', 'tempo': 84, 'motivo': [0, 3, 7, 8, 7, 3, 2, 0], 'sampleado': True,
         'paleta': {'solista': 'violin', 'color': 'guitarra', 'metal': 'trompa', 'aire': 'flauta', 'madera': 'corno_ingles'}}
E = [
 ('vd-gancho', None, 1, 3, ['giro', 'nieve', 'doom'],
  ['A: la montaña nevada de noche; un niño pequeño con abrigo mira una luz roja lejana entre las rocas; golpe en «mother».',
   'A: la tormenta: un hombre lleva a un niño en brazos; antorchas lejanas; se para, se quita el abrigo y lo envuelve; Atom de luciérnaga tirita.',
   'A: el castillo sobre la ciudad; en lo alto, una figura con armadura gris, capa verde y máscara de hierro; Atom la mira.'],
  'misterio', ['giro+2']),
 ('vd-aviso', None, 4, 4, ['aviso'],
  ['F: Atom en su estudio alza el cartel de destripes (un ojo tapado), señala un calendario con «18» y cuelga un abrigo pequeño en el perchero («guárdate esto»).'],
  'misterio', []),
 ('vd-nieve', None, 5, 9, ['madre', 'baron', 'abrigo', 'baul', 'promesa'],
  ['A: el campamento romaní: carromatos, hogueras; una mujer con chal mira el fuego; una luz roja con forma de mano se le acerca (Mefisto, sin cara) y se apaga; una cuna; Atom tirita con una bufanda larguísima (gag).',
   'A: el castillo del barón: el curandero cruza la puerta; de noche, junto a una cama (de lejos), una vela que se consume; el barón señala.',
   'A: la tormenta; el padre envuelve al niño con su abrigo; amanece; el abrigo sobre la nieve.',
   'A: un carromato de noche; un hombre mayor (Boris) arropa al niño; luego el niño abre un baúl a la luz de una vela; libros con símbolos; Atom abre otro y le sale una nube de polvo (gag).',
   'A: el niño en la colina mira el castillo del barón con los puños apretados; detrás, una luz roja lejana.'],
  'ternura', []),
 ('vd-beca', None, 10, 11, ['beca', 'reed'],
  ['A y B: el joven Victor con inventos de chatarra hace caer a dos soldados en la nieve; se despide de Boris y de Valeria (pelo largo, chal); un barco en el mar.',
   'B: el campus; un chico delgado de pelo castaño (Reed) le tiende la mano; Victor se da la vuelta.'],
  'aventura', []),
 ('vd-maquina', None, 12, 14, ['maquina', 'explota', 'culpa'],
  ['B: el laboratorio de noche: la máquina con antenas; Reed mira la pizarra y señala un número; Atom intenta corregirlo y la tiza se le parte (gag).',
   'B: Victor señala la puerta; Reed sale; Victor baja la palanca; destello blanco y humo (golpe), sin heridas a la vista; una maleta en el pasillo.',
   'B: el pasillo; Victor, con una venda en la mejilla, mira atrás a Reed con rabia.'],
  'suspense', ['explota+3']),
 ('vd-culpa', None, 15, 15, ['fijate1'],
  ['PAUSA: el pasillo congelado; Atom (al doble) saca a color una balanza: en un plato, una medalla; en el otro, un dedo que señala fuera; «266» y «2004».'],
  'suspense', []),
 ('vd-mascara', None, 16, 17, ['tibet', 'ardiendo'],
  ['C: las montañas del Tíbet; Victor cae en la nieve; dos monjes con túnicas lo levantan; el monasterio con banderas.',
   'C: la forja: la máscara de hierro al rojo; Victor la sostiene y se la pone (sin ver la cara); vapor; Atom se prueba una máscara pequeña y solo ve con un ojo (gag).'],
  'misterio', []),
 ('vd-foco', None, 18, 18, ['fijate2'],
  ['PAUSA: la forja congelada; Atom (al doble) saca a color un foco de teatro que ilumina a un chibi con una camiseta; a su alrededor, pocas caras lo miran; «2000», «50 %» y «23 %».'],
  'misterio', []),
 ('vd-rey', None, 19, 20, ['trono', 'valeria'],
  ['A: Doom entra en la sala del trono y se sienta; la plaza: mercado lleno, niños jugando; robots con su cara en las ventanas se giran a la vez cuando Atom saluda (gag).',
   'A: una pantalla con cuatro siluetas azules con un «4» y «1962»; luego una luz verde y una figura con chal que se desvanece en el aire (el sacrificio, solo luz, de lejos); Doom de espaldas; «2003».'],
  'epico', []),
 ('vd-malo', None, 21, 21, ['fijate3'],
  ['PAUSA: el trono congelado; Atom (al doble) saca a color un espejo: dentro, el villano se ve con capa de héroe.'],
  'epico', []),
  ('vd-enemigos', None, 22, 26, ['espejo', 'familia', 'ironman', 'pantera', 'mefisto'],
  ['A: la sala de los enemigos en el castillo de Doom: pantallas en la pared; en la mayor, Reed (pelo castaño, uniforme azul); Doom de espaldas, mirándolo; al lado de Reed, siluetas de una familia.',
   'A: en las pantallas, los cuatro de azul con un «4»: un grandullón de roca naranja que se ríe, un chico en llamas que habla sin parar y una mujer rubia; Doom acerca la mano a la de ella.',
   'A: una pantalla muestra un castillo medieval (Camelot) con un caballero de armadura roja y dorada (por atributos) junto a un rey con corona; Doom con una hechicera de capa morada; «1981».',
   'A: una pantalla con una ciudad de torres de cristal en la selva y un rey de traje negro con orejas de felino (por atributos); un brillo de metal azul que se apaga; «2010».',
   'A: la última pantalla, roja, con una mano de luz (Mefisto, sin cara); al lado, un hechicero de capa roja; Doom aparta la mirada.'],
  'intriga', []),
 ('vd-espejos', None, 27, 27, ['fijate6'],
  ['PAUSA: la sala congelada; Atom (al doble) saca a color dos micrófonos: con uno canta un desconocido y Atom sonríe; con el otro canta un compañero y a Atom le sale una nube; «1988».'],
  'intriga', []),
('vd-sanjuan', None, 28, 29, ['noche', 'mignola'],
  ['D: la noche de San Juan: un camino de luz entre rocas rojas; Doom avanza solo hacia una puerta enorme; vuelve con las manos vacías.',
   'D: Doom y un hechicero con capa roja (por atributos) ante la puerta; una luz blanca con forma de mujer sube; «1989».'],
  'ternura', []),
 ('vd-duelo', None, 30, 30, ['fijate4'],
  ['PAUSA: el infierno congelado; Atom (al doble) saca a color un reloj de arena que no corre y una silla vacía junto a una ventana; «2022».'],
  'ternura', []),
 ('vd-dios', None, 31, 33, ['battleworld', 'pregunta', 'risa'],
  ['E: Battleworld, el planeta cosido con trozos de mundos; Doom en un trono enorme con un halo; Atom se sienta en el trono y no le llegan los pies (gag).',
   'E: Reed (canas en las sienes) ante el trono; un «?» de luz entre los dos; Doom baja la cabeza.',
   'E: Reed alza la mano con luz; Doom se quita la máscara de espaldas a cámara y se ríe (hombros que se agitan); Atom se quita su máscara pequeña y se ríe con él (gag).'],
  'asombro', []),
 ('vd-nina', None, 34, 35, ['mundo', 'tribunal'],
  ['E: el globo con banderas verdes; «2025»; un destello verde lejano en una batalla (sin heridas); una luz cálida sobre una niña rubia dormida.',
   'E: Doom arrodillado ante una figura enorme y cósmica (el Tribunal, por atributos); la niña abre los ojos; Doom se vuelve polvo de luz; Atom lee el testamento y el pergamino se desenrolla hasta el suelo (gag).'],
  'intriga', []),
 ('vd-redencion', None, 36, 36, ['fijate5'],
  ['PAUSA: la luz congelada; Atom (al doble) saca a color un libro abierto con una línea que baja y luego sube.'],
  'calma', []),
 ('vd-cierre', None, 37, 39, ['infierno', 'abrigo2', 'pregunta'],
  ['D: Doom en el infierno: rompe contratos que arden en el aire; un trono rojo; una luz verde sube libre.',
   'A: la montaña nevada del principio; el padre y el niño con el abrigo, de lejos; luego un cine con «18».',
   'F: Atom en su estudio descuelga el abrigo pequeño, mira a cámara y señala los comentarios.'],
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
assert escenas[-1]['frase_fin'] == 39
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas')
