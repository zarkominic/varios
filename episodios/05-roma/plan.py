"""Reparto del episodio 5 (v3) en escenas (escribe escenas.json). Una fila por escena:
(id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase]).
Pixel aventura con personajes pequeños (26–30 px) con contraluz y sombra, el mapa del Mediterráneo al empezar cada
acto y la barra de tiempo fija arriba a la izquierda con el año. Atom abajo a la izquierda.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
E = [
 ('rm-hola', None, 1, 1, ['hola'], ['Roma al atardecer desde una colina; la caja baja y Atom saluda.']),
 ('rm-salon', '476', 2, 3, ['corona', 'fuera'],
  ['Salón de mármol: el emperador niño se quita la corona y se la da a Odoacro, que la guarda en un cofre.',
   'Fuera, una calle: un panadero, un perro que duerme, gente que pasa.']),
 ('rm-pregunta', None, 4, 4, ['pregunta'], ['El chaval se encoge de hombros ante el trono vacío; «?» en la caja; el salón se funde en el mapa.']),
 ('rm-mapa', None, 5, 6, ['mapa', 'tiber'],
  ['El Mediterráneo: el mar se ilumina; luego la bota de Italia; zoom a Italia.',
   'El Tíber se dibuja, salen las siete colinas, zoom a Roma y la aldea al atardecer.']),
 ('rm-actos', None, 7, 7, ['actos'], ['La barra de tiempo se enciende: un rey, dos cónsules, un emperador; sube arriba con el marcador en 753.']),
 ('rm-loba', '753', 8, 8, ['loba'], ['El mapa con Roma como un punto; de noche, una loba encuentra a los gemelos junto al río.']),
 ('rm-aldea', None, 9, 10, ['aldea', 'reyes'],
  ['La aldea: barro, cabañas, una barca que sube el río con mercancía y vigías en las colinas.',
   'Reyes que se suceden en un trono de madera; al último lo echan a patadas y los romanos juran con la mano en alto.']),
 ('rm-consules', '509', 11, 12, ['consules', 'delegado'],
  ['El mapa con Roma diminuta; dos cónsules en pedestales con relojes de arena; uno levanta la mano y el otro la tacha.',
   'Se acaba la arena y cambian los dos; detrás de cada uno, una fila de legionarios.']),
 ('rm-italia', None, 13, 14, ['italia', 'cartago'],
  ['Mapa: la mancha roja se extiende por Italia; los vencidos se ponen la toga.',
   'Mapa: aparece Cartago en amarillo al otro lado del mar; espadas en la caja.']),
 ('rm-anibal', None, 15, 15, ['anibal'], ['Elefantes subiendo los Alpes nevados; luego en Cannas caen filas de legionarios; «50000».']),
 ('rm-gana', None, 16, 16, ['gana'], ['Una fila nueva de reclutas se levanta; mapa: el rojo rodea el Mediterráneo.']),
 ('rm-problema', None, 17, 17, ['problema'], ['Un general crece ante el Senado y su sombra lo tapa; sus soldados se giran hacia él y no hacia el templo.']),
 ('rm-rubicon', None, 18, 19, ['rubicon', 'idus'],
  ['César y sus legionarios cruzan el Rubicón; la línea de la ley se rompe.',
   'Senadores con puñales rodean a César; fundido rojo; «13» en la caja.']),
 ('rm-augusto', '27', 20, 21, ['augusto', 'emperador'],
  ['El mapa con la mancha alrededor del Mediterráneo; Octavio rechaza la corona de rey y se pone el laurel; «1» en la caja.',
   'El emperador en su trono; la ciudad en paz al atardecer; «200» en la caja.']),
 ('rm-cumbre', None, 22, 22, ['cumbre'], ['Mapa: el imperio llega a su máximo; cinco personas, una iluminada, «1/5».']),
 ('rm-obras', None, 23, 23, ['obras'], ['Una calzada que se traza sola, un acueducto que se levanta y el Panteón con su rayo de luz.']),
 ('rm-denario', None, 24, 24, ['denario'], ['El denario brilla y su barra sube a «95%».']),
 ('rm-trampa', '180', 25, 26, ['catch', 'trampa'],
  ['El mapa quieto con la frontera que brilla; legionarios cobran de un cofre que se vacía.',
   'Unas tijeras recortan la plata del denario y entra cobre; la barra baja a «50%».']),
 ('rm-subasta', None, 27, 27, ['subasta'], ['Un pretoriano con un mazo; dos ricos pujan; el ganador se sienta y desaparece cuando la caja llega a 0.']),
 ('rm-caos', None, 28, 29, ['caos', 'fronteras'],
  ['Bajo la tormenta, emperadores que pasan por el trono cada vez más deprisa; «20+».',
   'Mapa: flechas que empujan desde el norte y el este y manchas oscuras de epidemias.']),
 ('rm-vacia', None, 30, 31, ['moneda', 'hueca'],
  ['Un soldado muerde su moneda; los precios saltan 1, 10, 100; la barra a «5%».',
   'La moneda se vacía por dentro hasta quedar como un anillo.']),
 ('rm-partir', '284', 32, 32, ['partir'], ['Unas tijeras parten el mapa en dos; un gobernante a cada lado.']),
 ('rm-constantino', None, 33, 34, ['constantino', 'este'],
  ['Constantino con el escudo de la cruz; un barco se lleva la capital al este; «330».',
   'Mapa: el este se ilumina con monedas que fluyen; nubes de tormenta sobre el oeste.']),
 ('rm-hunos', None, 35, 35, ['hunos'], ['Mapa: flechas de los hunos desde las estepas empujan las de los germanos hacia el oeste; luego un oficial romano paga a guerreros germanos.']),
 ('rm-saqueo', '410', 36, 36, ['saqueo'], ['De noche, los godos entran por la puerta de Roma; «800»; luego barcos vándalos cargando oro.']),
 ('rm-corona', None, 37, 38, ['odoacro', 'nombre'],
  ['El salón del principio: Odoacro guarda la corona y un barco se la lleva al este.',
   'La villa junto al mar con el chaval jubilado; luego tres estatuas: Rómulo con la loba, Augusto y el chaval.']),
 ('rm-este', '1453', 39, 40, ['este', 'razones'],
  ['Mapa: el oeste se apaga y el este sigue encendido; el contador va de 476 a 1453.',
   'Cuatro empujan a la vez una columna (un legionario, un mercader, un enfermo y un senador) y cae.']),
 ('rm-cobre', None, 41, 41, ['cobre'], ['El denario pierde la plata año a año hasta ser cobre con una cara bonita.']),
 ('rm-hoy', None, 42, 42, ['hoy'], ['Una calle de hoy con la calzada debajo; un calendario con el 7 y el 8; una chica habla y le sale un laurel.']),
 ('rm-plata', None, 43, 43, ['plata'], ['De la moneda salen átomos que vuelan a un anillo y a un teléfono.']),
 ('rm-adios', None, 44, 44, ['adios'], ['Roma de noche; Atom en su caja con el «?».']),
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
