"""Reparto del episodio 7 (Halloween) en escenas (escribe escenas.json). Una fila por escena:
(id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase]).
El formato de los episodios 5 y 6, de noche: pixel aventura con personajes pequeños con contraluz, la barra de tiempo
fija arriba a la izquierda y Atom abajo a la izquierda.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
E = [
 ('hw-hola', None, 1, 1, ['hola'], ['Una calle de noche con calabazas encendidas en los porches; la caja baja y Atom saluda.']),
 ('hw-gancho', '31/10', 2, 4, ['puertas', 'mundo', 'pregunta'],
  ['Niños disfrazados (bruja, fantasma, vampiro, calabaza) llaman a una puerta y les dan caramelos.',
   'Mapa del mundo en pergamino: calabacitas que se encienden en Tokio, Madrid, Ciudad de México y Seúl.',
   'Una hoguera celta a la izquierda y un cuenco de caramelos a la derecha; «?» en la caja.']),
 ('hw-mapa', None, 5, 6, ['mapa', 'calendario'],
  ['Zoom del mapa a Irlanda, Escocia y Gales; viento y nieve.',
   'Una rueda del año partida en mitad luminosa (sol) y mitad oscura (luna); el marcador entra en la oscura.']),
 ('hw-samhain', None, 7, 8, ['samhain', 'puerta'],
  ['De noche, una colina con hogueras; el ganado baja; gente con capas alrededor del fuego.',
   'Un túmulo en la colina se abre con luz verde; figuras fantasmales pasean entre la gente.']),
 ('hw-ofrendas', None, 9, 10, ['comida', 'aviso'],
  ['Platos de comida en las puertas; aldeanos con máscaras caminan entre fantasmas, que no los reconocen.',
   'Un monje escribe a la luz de una vela siglos después; «?» en la caja.']),
 ('hw-santos', '835', 11, 12, ['iglesia', 'santos'],
  ['Una iglesia de piedra se levanta junto a la colina de las hogueras.',
   'Dentro, velas; en la caja, «1» y «2» de noviembre.']),
 ('hw-nombre', None, 13, 14, ['nombre', 'misma'],
  ['Una vidriera con santos con aureola; cae la noche sobre ella.',
   'Fantasmas que vuelven a pasear la misma noche, ahora bajo el campanario.']),
 ('hw-almas', None, 15, 16, ['almas', 'disfraces'],
  ['Una aldea medieval: gente pobre llama a las puertas y recibe pasteles redondos con una cruz.',
   'Niños escoceses disfrazados cantan en una puerta y reciben manzanas y monedas.']),
 ('hw-adivina', '1785', 17, 18, ['adivina', 'manzanas'],
   ['Una casa escocesa junto al fuego: nueces que saltan en las brasas; una chica se come una manzana ante un espejo y aparece una silueta.',
    'Niños pescan manzanas con la boca en un cubo de agua.']),
 ('hw-jack', None, 19, 20, ['jack', 'farol'],
  ['Jack engaña al diablo, que se queda subido a un árbol.',
   'Jack vaga de noche con un nabo tallado que brilla.']),
 ('hw-hambruna', '1845', 21, 21, ['hambruna'], ['Un campo de patatas se ennegrece; familias con hatillos suben a un barco; mapa del Atlántico con la ruta a Nueva York.']),
 ('hw-calabaza', None, 22, 22, ['calabaza'], ['Una granja americana: un nabo pequeñito junto a una calabaza enorme; una familia talla la calabaza y se enciende.']),
 ('hw-gamberros', None, 23, 23, ['gamberros'], ['Un pueblo de principios del siglo XX: gamberros arrancan una verja y pintan ventanas; luego un desfile infantil con farolillos.']),
 ('hw-truco', '1927', 24, 25, ['truco', 'industria'],
  ['Niños de gorra llaman a una puerta en 1927; luego una fábrica con cintas de caramelos.',
   'Una tienda llena de disfraces y caramelos; la caja registradora cuenta dólares.']),
 ('hw-monstruos', None, 26, 27, ['postales', 'cine'],
   ['Una postal antigua: una bruja en su escoba con un gato negro y la luna.',
    'Un cine de 1931 en blanco y negro: Drácula y Frankenstein en la pantalla; «1931» en la caja.']),
 ('hw-mundo', None, 28, 28, ['peliculas'], ['Una pantalla de cine con una calabaza; el mapa del mundo se llena de calabazas; una multitud disfrazada en Shibuya con una X.']),
 ('hw-francia', None, 29, 29, ['francia'], ['París de noche con escaparates de calabazas que se encienden en 1997 y se van apagando; luego una balanza entre una calabaza y una vela con flores.']),
 ('hw-muertos', None, 30, 32, ['otros', 'mexico', 'camino'],
  ['Mapa del mundo: brillan México, España, Filipinas y China.',
   'Un altar de muertos con cempasúchil, velas, calaveras de azúcar y papel picado; una familia sonríe.',
    'Un camino de pétalos naranjas va de la puerta al altar con la comida favorita; la familia sonríe.']),
 ('hw-cementerios', None, 33, 33, ['cementerios'], ['Un cementerio con flores; una familia filipina con velas junto a una tumba; farolillos chinos en un río.']),
 ('hw-oscuridad', None, 34, 35, ['oscuridad', 'sur'],
  ['Un globo con la noche que crece en el norte; un campo cosechado se oscurece.',
   'Pantalla partida: en el norte, hojas que caen; en el sur, flores que se abren.']),
 ('hw-dentro', None, 36, 37, ['ventana', 'dentro'],
  ['Una calabaza en una ventana; zoom hacia dentro.',
   'Dentro aparecen uno a uno: una hoguera, una iglesia, un nabo, un barco, una calabaza y un caramelo.']),
 ('hw-recuerdo', None, 38, 38, ['recuerdo'], ['Velas en las ventanas de un pueblo de noche; familias que miran fotos.']),
 ('hw-aire', None, 39, 40, ['aire', 'tallar'],
   ['Un campo de calabazas en verano al sol: átomos que flotan en el aire bajan a las hojas y la calabaza crece.',
    'De noche, un chico talla una calabaza; dentro, la vela; del humo salen átomos que vuelven al aire.']),
 ('hw-adios', None, 41, 41, ['adios'], ['La calle de las calabazas; Atom en su caja con el «?».']),
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
