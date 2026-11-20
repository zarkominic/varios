"""Reparto del episodio 44 (Paul Atreides: por qué el héroe de Dune es el villano) en escenas (escribe escenas.json). Una
fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo, golpes).
- Canon del 43: relato hablado, ATOM EN ESCENA (atom-personaje.js: luciérnaga con cara, a escala chibi, al doble en las
  pausas) y 5 PAUSAS «fíjate» (frases 8, 15, 23, 34 y 38: el mundo en gris azulado, Atom a color explica).
- El detalle y el movimiento de siempre (ESTANDAR.md): planos de 4–7 s con acción, decorados con textura y vida.
- Decorados: A el planeta de arena (de du-comun.js, el NUESTRO del 33) y F el estudio de las pausas (de hm-comun.js); B la
  ciudadela de Arrakeen, C Caladan, D la conspiración y E el sietch Tabr (nuevos, pa-comun.js).
- DERECHOS: nada de las películas (ni actores, ni vestuario, ni naves, ni el diseño de sus gusanos: como mucho una silueta
  enorme y lejana que mueve la arena); personajes por sus atributos. Sin letras (solo números y símbolos).
- CUIDADO: la violencia nunca se ve (la guerra santa, con mapas y cifras; la quemapiedras, un destello de lejos; las
  muertes se cuentan).
- BANDA: Re dórico, 100 por minuto, motivo de desierto; cada ánimo se escucha con earshot antes de darlo por bueno.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 're', 'modo': 'dorico', 'tempo': 100, 'motivo': [0, 7, 5, 3, 2, 3, 5, 0], 'sampleado': True,
         'paleta': {'solista': 'shehnai', 'color': 'arpa', 'metal': 'trompa', 'aire': 'flauta', 'madera': 'clarinete'}}
E = [
 ('pa-gancho', None, 1, 2, ['giro', 'imagina'],
  ['A: el desierto al atardecer, dos lunas; una figura con capa en lo alto de una duna; detrás, un mar de estandartes; golpe en «villain».',
   'B y A: un mapa de estrellas que se enciende planeta a planeta (la guerra santa, solo luces); Atom de luciérnaga mira asustado.'],
  'misterio', ['giro+2.5']),
 ('pa-aviso', None, 3, 4, ['paul', 'aviso'],
  ['A: el joven Paul (atributos: pelo oscuro, destiltraje, capa) camina por la arena; Atom a escala chibi lo sigue.',
   'F: Atom en su estudio levanta el cartel de «destripes» (un ojo tapado) y señala un calendario con «18».'],
  'misterio', []),
 ('pa-caladan', None, 5, 7, ['caladan', 'arrakis', 'fremen'],
  ['C: el castillo de piedra sobre el mar con lluvia; el duque, Jessica y el niño en la ventana; Atom de luciérnaga se moja.',
   'A: la nave aterriza en la arena (forma propia); de noche, luces rojas en el horizonte (sin combate); dos figuras huyen por las dunas.',
   'A y E: la boca del sietch; Chani en lo alto de una roca; Atom con un destiltraje que gotea (gag); un ratón saltarín le sube a la cabeza (gag).'],
  'aventura', []),
 ('pa-profecia', None, 8, 8, ['fijate1'],
  ['PAUSA: el sietch congelado; Atom (al doble) saca a color un pergamino con un símbolo y un mapa con semillas que caen en muchos planetas.'],
  'aventura', []),
 ('pa-agua', None, 9, 10, ['agua', 'trono'],
  ['E: una copa azul brillante; Paul cae dormido; sus ojos se vuelven azules; sobre él, visiones: estandartes y planetas.',
   'B: el salón del trono: Paul de pie, Irulan a un lado; Chani se da la vuelta y sale al desierto; Atom la mira irse.'],
  'aventura', []),
 ('pa-emperador', None, 11, 14, ['doce', 'chani', 'cuenta', 'leyenda'],
  ['B: la ciudadela por fuera, enorme; el balcón sobre la multitud; Atom saluda y la multitud lo aclama (gag).',
   'B: las habitaciones: Chani junto a Paul, Irulan sola al otro lado del pasillo; una cuna vacía en un rincón.',
   'B: el mapa de estrellas de la sala: planetas que se apagan uno a uno; un contador con «61» enorme (sin letras).',
   'B: Paul se quita la corona; detrás de él, sacerdotes y fanáticos siguen levantando estandartes.'],
  'epico', []),
 ('pa-etiqueta', None, 15, 16, ['fijate2', 'campbell'],
  ['PAUSA: el balcón congelado; Atom (al doble) le pega en la frente a un busto de líder una etiqueta de aviso (un triángulo con «!»); sale a color una cinta de máquina de escribir «1984».',
   'F: un despacho editorial de 1969: un editor con gafas devuelve un manuscrito; Atom recoge las hojas; dos revistas con números «1965» y «1969».'],
  'epico', []),
 ('pa-conspira', None, 17, 21, ['grupos', 'irulan', 'ghola', 'hayt', 'scytale'],
  ['D: la sala secreta: una Reverenda Madre con capa negra, el tanque de especia del navegante (Atom empaña el cristal: gag) y un Tleilaxu bajito.',
   'B: la cocina de la ciudadela: Irulan echa unas gotas en un cuenco; Atom se lleva las manos a la cara.',
   'D: el laboratorio Tleilaxu: tanques de cultivo con siluetas; en uno, un hombre de pelo rizado con ojos de metal.',
   'B: Hayt delante del trono; Paul le pone una mano en el hombro; Atom de luciérnaga entre los dos.',
   'D: Scytale cambia de cara: una, otra y por un instante la de Atom (gag); Atom se toca la suya.'],
  'intriga', []),
 ('pa-trampa', None, 22, 23, ['carcel', 'fijate3'],
  ['A: Paul en el centro de un laberinto de caminos de luz sobre la arena; todos se oscurecen menos uno.',
   'PAUSA: el laberinto congelado; Atom (al doble) saca a color un banco con colas de gente y un rumor que corre en bocadillos; un año «1948».'],
  'suspense', []),
 ('pa-ciego', None, 24, 27, ['embarazo', 'quemapiedras', 'ley', 'alia'],
  ['B: Chani aparta el cuenco; luego, Chani con una mano en el vientre; Paul de espaldas, mirando por la ventana.',
   'A: la ciudad de noche; un destello blanco enorme en el horizonte (de lejos); Paul, con un paño en los ojos, camina sin tropezar; Atom le pasa la mano por delante y Paul la esquiva (gag).',
   'A: un camino de arena que se aleja; las huellas de un bastón; los Fremen se inclinan ante Paul.',
   'B: Alia (niña de mirada antigua) junto a Hayt; Hayt se lleva la mano a la frente, recordando.'],
  'suspense', ['quemapiedras+1.5']),
 ('pa-precio', None, 28, 33, ['parto', 'ciego', 'duncan', 'oferta', 'desierto', 'deja'],
  ['E: la cueva del sietch de lejos, con una luz cálida; Atom prepara una cuna, se da la vuelta y hay dos (gag).',
   'E: Paul a oscuras; el laberinto de luz se apaga entero.',
   'E: Hayt se detiene; sus ojos de metal brillan; de pronto sonríe como Duncan.',
   'E: Scytale tiende la mano con una promesa (una silueta de Chani de luz); Paul niega con la cabeza; de lejos, la luz de las cunas (sin armas).',
   'A: Paul se aleja solo por las dunas con un bastón; el viento le borra las huellas.',
   'B: el trono vacío; dos cunas; estandartes que siguen ondeando.'],
  'ternura', []),
 ('pa-poder', None, 34, 38, ['fijate4', 'pelota', 'herbert', 'errores', 'fijate5'],
  ['PAUSA en F: Atom (al doble) con un retrato de líder que se infla como un globo; salen a color «2009» y una lista de rasgos con iconos.',
   'F: una mano que aprieta una pelota en una pantalla; Atom aprieta la suya y se le escapa rebotando (gag); un medidor de «empatía» que baja.',
   'A: Paul en el desierto, pequeño; detrás, una multitud enorme que lo sigue con los ojos cerrados.',
   'F: Atom pone una ficha con un líder y, detrás, una fila de fichas que se multiplica.',
   'PAUSA: un camino del héroe en círculo (casa, don, vuelta) sobre la pizarra; Atom añade un tramo nuevo: «después»; dos fichas «Campbell».'],
  'calma', []),
 ('pa-cierre', None, 39, 41, ['huellas', 'parte3', 'pregunta'],
  ['A: el viento borra las huellas; en la ciudadela, Alia y Duncan junto a las dos cunas.',
   'A: una silueta enorme y lejana mueve la arena; Atom de luciérnaga, de cara al horizonte.',
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
assert escenas[-1]['frase_fin'] == 41
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas')
