"""Reparto del episodio 22 (La Navidad estuvo prohibida: los mitos que todos creen) en escenas (escribe escenas.json).
Una fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: dura unos 12–20 s y lleva 3 o 4 planos de 4–7 s,
  cortados en la palabra. Ningún encuadre se repite dentro de una escena.
- Cinco decorados (guion.md): A el siglo XVII, B Roma, C el siglo XIX, D la vuelta al mundo, E hoy y el cierre.
- Personajes reconocibles por sus atributos, dibujados por nosotros, sin logos ni marcas (KFC y Coca-Cola se nombran en la
  voz, pero en pantalla no salen sus logos: una cubeta roja y blanca sin letras, una botella sin etiqueta).
  Hilo de gags: un hombrecito de jengibre con ojos que siempre se escapa.
- Tono: respeto a las religiones; los puritanos son creyentes sinceros; la cabra de Gävle sin celebrar el vandalismo;
  la tregua de 1914 sin violencia en pantalla.
- Los golpes son NOMBRES DE MARCAS de la misma escena.
- BANDA: Sol mixolidio, 96 por minuto, motivo de campanillas propio.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'sol', 'modo': 'mixolidio', 'tempo': 96, 'motivo': [0, 4, 7, 9, 10, 9, 7, 4]}
E = [
 # ── 0 · El gancho ──
 ('nv-gancho', None, 1, 2, ['ilegal', 'massachusetts'],
  ['A: Canterbury, 1647, en Navidad: una calle de casas de entramado con nieve sucia; las tiendas abren con las contraventanas subidas; un alguacil puritano de sombrero alto clava un aviso sin letras con una cruz roja sobre un acebo; la galleta de jengibre con ojos se esconde detrás de un barril.',
   'A (otra cámara): Boston nevado, una casa de reunión de madera; un alguacil le extiende a un vecino con un pastel una multa con un «5» y una moneda; la galleta recibe otra multa diminuta (gag 2).'],
  'misterio', ['ilegal']),
 ('nv-hola', None, 3, 4, ['mitos', 'hola'],
  ['E: el salón de Atom en Navidad: árbol, chimenea, calcetines; sobre la mesa, cuatro pistas con un signo de interrogación cada una: un traje rojo, un calendario con el 25, un abeto en miniatura y unas notas musicales; un globo terráqueo que gira.',
   'E: Atom saluda; va a coger la galleta de jengibre del plato y la galleta salta y se escapa (gag 1).'],
  'curiosidad', []),
 # ── 1 · Cuando la Navidad era ilegal ──
 ('nv-puritanos', '1647', 5, 5, ['puritanos'],
  ['A (el Parlamento): una sala de bancos de madera con puritanos de negro y cuello blanco que leen la Biblia; un escribano tacha tres casillas de un calendario de pared (Navidad, Pascua, Pentecostés: un acebo, un huevo, una paloma) y marca un día libre al mes; aprendices con mandil celebran.'],
  'suspense', []),
 ('nv-motin', None, 6, 6, ['motin'],
  ['A (Canterbury, otra cámara): la gente de la calle se enfada al ver las tiendas abiertas; vuelan coles y ramas de acebo (sin heridos); luego, 1660: la corona vuelve, campanas, alguien cuelga una corona de acebo en una puerta.'],
  'suspense', []),
 ('nv-multa', None, 7, 7, ['multa'],
  ['A (Boston): un libro de leyes con un «5» y una cuenta de 22 rayas; un barco con la bandera real llega al puerto (1681) y el alguacil tacha la multa; corte a una calle de Escocia en los años 50 con gente yendo a trabajar en Navidad, con abrigos y fiambrera.'],
  'suspense', []),
 # ── 2 · Santa Claus ──
 ('nv-nicolas', None, 8, 8, ['nicolas'],
  ['B (Mira, siglo IV, una calle tardorromana de noche): un obispo con mitra y barba deja en secreto tres bolsitas de monedas por la ventana de una casa pobre; tres hermanas las encuentran.'],
  'ternura', []),
 ('nv-poema', '1823', 9, 9, ['poema'],
  ['C (una imprenta de Nueva York de 1823): sale un periódico con un poema sin firma; de las letras (sin letras legibles) sale volando un trineo con ocho renos que da una vuelta por la sala y baja por la chimenea; luego el estudio de un dibujante con barba (Nast) dibuja un Santa cada vez más gordo.'],
  'ternura', []),
 ('nv-rojo', None, 10, 10, ['rojo'],
  ['C (el estudio, otra cámara): un tendedero de postales antiguas con Santas de rojo, verde, marrón y azul; Santa se prueba los trajes de colores y la galleta le pasa el rojo (gag 3); en 1931, un cartel con un Santa rojo junto a una botella sin etiqueta se multiplica por toda la pared.'],
  'ternura', []),
 # ── 3 · ¿Por qué el 25 de diciembre? ──
 ('nv-calendario', '354', 11, 11, ['fecha'],
  ['B (un scriptorium romano): un calígrafo pinta un calendario de 12 columnas para un cristiano rico de toga; en la casilla del 25 se encienden dos símbolos a la vez: una estrella de Belén y un sol con rayos.'],
  'misterio', []),
 ('nv-teorias', None, 12, 12, ['teorias'],
  ['B (el templo del Sol): una balanza con dos platillos: en uno un sol, en el otro un calendario con el 25 de marzo y una flecha de nueve meses hasta el 25 de diciembre; la balanza no se decide y se queda temblando con un «?».'],
  'misterio', []),
 ('nv-saturnales', None, 13, 13, ['saturnales'],
  ['B (una calle romana en Saturnales): banquete en la calle, gente con gorros de fieltro, regalitos de barro; un calendario marca del 17 al 23; un sello rojo de «no probado» (un símbolo, sin letras) separa las Saturnales de un árbol de Navidad.'],
  'curiosidad', []),
 # ── 4 · El árbol, el muérdago y las canciones ──
 ('nv-lutero', None, 14, 14, ['lutero'],
  ['C (un bosque de abetos de Alsacia, 1521, de noche con nieve): un hombre con hábito y velas en un árbol aparece como un globo de pensamiento que se deshace en humo (la leyenda); luego dos guardas con farol y lanza vigilan los abetos y reciben unas monedas.'],
  'curiosidad', []),
 ('nv-grabado', None, 15, 15, ['grabado'],
  ['C (el castillo de Windsor, 1848): la reina Victoria con corona, el príncipe Alberto y sus hijos alrededor de un árbol con velas; el cuadro se vuelve un grabado de periódico; dos años después, la misma estampa en una revista americana y a la reina se le borra la corona.'],
  'curiosidad', []),
 ('nv-muerdago', None, 16, 16, ['muerdago'],
  ['C (bosque de robles): un druida de blanco corta muérdago con una hoz dorada; corte a una cocina inglesa del siglo XVIII donde dos criados se miran bajo una rama de muérdago; la galleta se pone debajo esperando un beso y le cae una baya en la cabeza (gag 4).'],
  'curiosidad', []),
 ('nv-jingle', None, 17, 17, ['jingle'],
  ['E (otra época): una carrera de trineos en la nieve de 1857 con cascabeles; corte a la cápsula Gemini 6A en órbita con la Tierra detrás: dentro, dos astronautas tocan una armónica diminuta y unos cascabeles; las notas flotan en gravedad cero.'],
  'asombro', []),
 ('nv-xmas', None, 18, 18, ['xmas'],
  ['C (un scriptorium medieval): un copista con pluma traza una gran letra griega ji dorada (una X) en un manuscrito iluminado; la X brilla.'],
  'curiosidad', []),
 # ── 5 · La vuelta al mundo ──
 ('nv-filipinas', None, 19, 19, ['calendario'],
  ['D: un calendario gigante que pasa las hojas hasta septiembre; una calle de Filipinas con faroles parol en forma de estrella de colores, un coro que canta villancicos y palmeras.'],
  'aventura', []),
 ('nv-gavle', None, 20, 20, ['gavle'],
  ['D (la plaza de Gävle, Suecia, de noche, nieve): una cabra de paja gigante con lazos rojos; una valla y un vigilante con termo; un resplandor naranja tras ella (sin mostrar a nadie quemándola); al final, obreros vuelven a levantarla.'],
  'aventura', []),
 ('nv-krampus', None, 21, 21, ['krampus'],
  ['D (una calle nevada de Austria): San Nicolás con mitra y báculo camina; detrás, un desfile de Krampus con cuernos y máscaras de madera talladas, cencerros y pelo; la galleta se esconde dentro de un zapato (gag 5).'],
  'aventura', []),
 ('nv-islandia', None, 22, 22, ['islandia'],
  ['D (una montaña de Islandia con auroras): trece muchachos traviesos bajan uno a uno por la ladera hacia una granja; un zapato en la ventana; un gato negro enorme de ojos amarillos asoma tras una colina.'],
  'aventura', []),
 ('nv-posadas', None, 23, 23, ['posadas'],
  ['D (una calle de México de noche): una procesión con velas y faroles de papel, niños vestidos de María y José llaman a una puerta; una piñata de siete picos; macetas de flor de Nochebuena; un señor con levita (Poinsett) se lleva una maceta en un barco.'],
  'aventura', []),
 ('nv-tio', None, 24, 24, ['tio'],
  ['D (una casa de Cataluña con chimenea): un tronco con cara sonriente, barretina roja y una manta; los niños le dan golpecitos con palos y cantan; con ayuda de un adulto, de debajo de la manta salen turrones y dulces, y la galleta sale entre ellos (gag 6).'],
  'aventura', []),
 ('nv-japon', None, 25, 25, ['japon'],
  ['D (una calle de Japón en Nochebuena con luces): una tienda de pollo frito con una cola larga de gente con abrigo; cubetas rojas y blancas sin letras; un calendario con «1974»; un Santa en la puerta (sin logos).'],
  'aventura', []),
 ('nv-playa', None, 26, 26, ['playa'],
  ['D (una playa de Australia, verano): Santa en chanclas y bañador rojo junto a una parrilla, surfistas, sombrillas; corte a los tejados de Italia de noche, con la luna: la Befana en escoba deja dulces en los calcetines y carbón de azúcar en uno.'],
  'aventura', []),
 # ── 6 · El cierre ──
 ('nv-festivo', None, 27, 27, ['festivo'],
  ['A (Boston, el mismo encuadre que al principio, ahora de 1870): la calle nevada llena de luces y coronas; el aviso con la multa se cae del poste y la gente celebra.'],
  'cierre', []),
 ('nv-tregua', '1914', 28, 28, ['tregua'],
  ['E (una tierra de nadie nevada en 1914, sin violencia ni heridos): soldados de los dos bandos con uniformes distintos salen de las trincheras, se dan la mano, cantan con una vela; algunos patean un balón.'],
  'cierre', ['tregua']),
 ('nv-cierre', None, 29, 29, ['cierre'],
  ['E (el salón de Atom): un álbum con estampas de todo el viaje (Canterbury, el poema, la ji dorada, la cabra, el Krampus, la posada, la trinchera); Atom intenta atrapar la galleta de jengibre y se le escapa otra vez (gag 7).'],
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
assert escenas[-1]['frase_fin'] == 29
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
