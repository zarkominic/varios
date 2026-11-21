"""Reparto del episodio 45 (Victor von Doom: el villano que solo quería recuperar a su madre) en escenas (escribe
escenas.json). Una fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase],
ánimo, golpes).
- Canon del 43: relato hablado, ATOM EN ESCENA y 5 PAUSAS «fíjate» (frases 15, 18, 23, 26 y 33: el mundo en gris azulado,
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
 ('vd-gancho', None, 1, 2, ['giro', 'doom'],
  ['A: la montaña nevada de noche; un niño pequeño con abrigo mira una luz roja lejana entre las rocas; golpe en «hell».',
   'A: el castillo sobre la ciudad; en lo alto, una figura con armadura gris, capa verde y máscara de hierro; Atom de luciérnaga la mira.'],
  'misterio', ['giro+3']),
 ('vd-aviso', None, 3, 3, ['aviso'],
  ['F: Atom en su estudio alza el cartel de destripes (un ojo tapado) y señala un calendario con «18».'],
  'misterio', []),
 ('vd-nieve', None, 4, 8, ['campamento', 'mefisto', 'baron', 'abrigo', 'baul'],
  ['A: el campamento romaní en la montaña: carromatos, hogueras, un curandero atiende a un niño; una mujer con chal mira el fuego; Atom tirita con una bufanda larguísima (gag).',
   'A: la mujer con chal a solas; una luz roja con forma de mano se le acerca (Mefisto, sin cara); la luz se apaga; un bebé en una cuna.',
   'A: el castillo del barón; el curandero junto a una cama (de lejos); el barón señala; de noche, un hombre huye con un niño en brazos por la nieve.',
   'A: la tormenta; el padre envuelve al niño con su abrigo; amanece; un hombre mayor (Boris) llega con un farol.',
   'A: un carromato de noche; el niño abre un baúl a la luz de una vela; libros con símbolos; Atom abre otro y le sale una nube de polvo (gag).'],
  'ternura', []),
 ('vd-beca', None, 9, 11, ['leyenda', 'beca', 'reed'],
  ['A: el joven Victor con inventos caseros hace caer a dos soldados en la nieve; los niños del campamento lo miran admirados.',
   'A: el camino del pueblo; Victor se despide de Boris y de Valeria (pelo largo, chal); un barco en el mar.',
   'B: el campus; un grandullón simpático (Ben) saluda; un chico delgado con pelo castaño (Reed) le tiende la mano; Victor se da la vuelta.'],
  'aventura', []),
 ('vd-maquina', None, 12, 14, ['maquina', 'explota', 'culpa'],
  ['B: el laboratorio de noche: la máquina con antenas; Reed mira la pizarra y señala un número; Atom intenta corregirlo y la tiza se le parte (gag).',
   'B: Victor señala la puerta; Reed sale; Victor baja la palanca; destello blanco y humo (golpe), sin heridas a la vista.',
   'B: el pasillo de la universidad; Victor con una venda en la mejilla se va con su maleta; mira atrás, a Reed, con rabia.'],
  'suspense', ['explota+9']),
 ('vd-culpa', None, 15, 15, ['fijate1'],
  ['PAUSA: el pasillo congelado; Atom (al doble) saca a color una balanza: en un plato, una medalla («mío»); en el otro, un dedo que señala hacia fuera; «266» y «2004».'],
  'suspense', []),
 ('vd-mascara', None, 16, 17, ['tibet', 'ardiendo'],
  ['C: las montañas del Tíbet; Victor cae en la nieve; dos monjes con túnicas lo levantan; el monasterio con banderas.',
   'C: la forja: la máscara de hierro al rojo; Victor la sostiene y se la pone (sin ver la cara); vapor; Atom se prueba una máscara pequeña y solo ve con un ojo (gag).'],
  'misterio', []),
 ('vd-foco', None, 18, 18, ['fijate2'],
  ['PAUSA: la forja congelada; Atom (al doble) saca a color un foco de teatro que ilumina a un chibi con una camiseta; a su alrededor, pocas caras lo miran; «2000», «50 %» y «23 %».'],
  'misterio', []),
 ('vd-rey', None, 19, 22, ['trono', 'gobierna', 'cuatro', 'valeria'],
  ['A: Doom entra en la sala del trono de Latveria y se sienta; los estandartes verdes se despliegan.',
   'A: la plaza de la ciudad: mercado lleno, niños jugando; robots con la cara de Doom en las ventanas se giran a la vez cuando Atom saluda (gag).',
   'A: una pantalla en el castillo con cuatro siluetas azules con un «4»; Doom aprieta el puño; «1962».',
   'A: una luz verde y una figura con chal que se desvanece en el aire (el sacrificio, solo luz, de lejos); Doom de espaldas; «2003».'],
  'epico', []),
 ('vd-malo', None, 23, 23, ['fijate3'],
  ['PAUSA: el trono congelado; Atom (al doble) saca a color un espejo: dentro, el villano se ve con capa de héroe.'],
  'epico', []),
 ('vd-sanjuan', None, 24, 25, ['noche', 'mignola'],
  ['D: la noche de San Juan: un camino de luz entre rocas rojas; Doom avanza solo hacia una puerta enorme.',
   'D: Doom y un hechicero con capa roja (Strange, por atributos) juntos ante la puerta; una luz blanca con forma de mujer sube hacia arriba; «1989».'],
  'ternura', []),
 ('vd-duelo', None, 26, 26, ['fijate4'],
  ['PAUSA: el infierno congelado; Atom (al doble) saca a color un reloj de arena que no corre y una silla vacía junto a una ventana; «2022».'],
  'ternura', []),
 ('vd-dios', None, 27, 29, ['battleworld', 'pregunta', 'espejo'],
  ['E: Battleworld, el planeta cosido con trozos de mundos; Doom en un trono enorme con un halo; Atom se sienta en el trono y no le llegan los pies (gag).',
   'E: Reed (pelo con canas en las sienes) ante el trono; un «?» de luz entre los dos; Doom baja la cabeza.',
   'E: Doom sin máscara de espaldas ante un espejo (solo se ve el reflejo de lejos, sin cicatrices); Atom se busca cicatrices en el espejo (gag).'],
  'asombro', []),
 ('vd-emperador', None, 30, 32, ['hechicero', 'nina', 'testamento'],
  ['E: Doom con una capa de hechicero y un ojo de luz; el globo terráqueo con banderas verdes; «2024» y «2025».',
   'E: una luz cálida sobre una niña de pelo rubio dormida (sin heridas); Doom arrodillado ante una figura enorme y cósmica (el Tribunal, por atributos).',
   'E: la niña abre los ojos; Doom se vuelve polvo de luz; Atom lee el testamento y el pergamino se desenrolla hasta el suelo (gag).'],
  'intriga', []),
 ('vd-redencion', None, 33, 33, ['fijate5'],
  ['PAUSA: la luz congelada; Atom (al doble) saca a color un libro abierto con una línea que baja y luego sube.'],
  'calma', []),
 ('vd-cierre', None, 34, 36, ['infierno', 'cine', 'pregunta'],
  ['D: Doom en el infierno: rompe contratos que arden en el aire; un trono rojo vacío; una luz verde sube libre.',
   'A: la montaña nevada del principio; el niño con el abrigo mira la luz; un cine con «18».',
   'F: Atom en su estudio mira a cámara y señala los comentarios.'],
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
assert escenas[-1]['frase_fin'] == 36
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas')
