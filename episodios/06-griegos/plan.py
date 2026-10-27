"""Reparto del episodio 6 (la antigua Grecia) en escenas (escribe escenas.json). Una fila por escena:
(id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase]).
El mismo formato que el episodio 5 v3: pixel aventura con personajes pequeños con contraluz y sombra, el mapa al empezar
cada acto, la barra de tiempo fija arriba a la izquierda y Atom abajo a la izquierda.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
E = [
 ('gr-hola', None, 1, 1, ['hola'], ['Atenas al atardecer con la Acrópolis; la caja baja y Atom saluda.']),
 ('gr-juicio', '399', 2, 4, ['juicio', 'socrates', 'veredicto'],
  ['El tribunal al aire libre: quinientos un ciudadanos en gradas; en medio, un hombre mayor.',
   'Sócrates, calvo y barbudo, con su capa raída, se encoge de hombros; «?» en la caja.',
   'Los jurados echan piedrecitas en dos urnas; en la caja, 280 contra 220.']),
 ('gr-pregunta', None, 5, 5, ['pregunta'], ['Sócrates solo, bajo las estrellas; «?»; la escena se funde en el mapa.']),
 ('gr-mapa', None, 6, 8, ['mapa', 'valles', 'mar'],
  ['El Mediterráneo; zoom al Egeo: la península de montañas y el mar de islas.',
   'Aparecen puntitos de ciudades por todos los valles e islas; «1000+» en la caja.',
   'Rutas de barcos y colonias por todo el Mediterráneo y el mar Negro; ranitas alrededor del mar.']),
 ('gr-alfabeto', '800', 9, 9, ['alfabeto'], ['Un puerto: un barco fenicio comercia; en una tablilla, signos fenicios, y se añaden las vocales que brillan.']),
 ('gr-olimpia', None, 10, 10, ['olimpia'], ['El estadio de Olimpia: corredores; dos soldados de ciudades rivales dejan las lanzas y se dan la mano.']),
 ('gr-esparta', None, 11, 11, ['esparta'], ['Esparta: un niño deja a su madre («7» en la caja) y se une a filas de chicos con escudos que entrenan.']),
 ('gr-atenas', '508', 12, 13, ['atenas', 'trampa'],
  ['El ágora de Atenas: comerciantes, barcos y gente que discute; en la colina, la asamblea levanta la mano para votar.',
   'Solo vota una parte: mujeres, esclavos y extranjeros quedan detrás de una línea; «1/10» en la caja.']),
 ('gr-persia', '490', 14, 14, ['persia'], ['Mapa: el Imperio persa, enorme, de Egipto a la India; Grecia, un rincón diminuto.']),
 ('gr-maraton', None, 15, 15, ['maraton'], ['Maratón: barcos persas en la playa, los hoplitas atenienses cargan; luego un corredor cruza el campo; «40».']),
 ('gr-termopilas', '480', 16, 16, ['termopilas'], ['Un paso estrecho entre la montaña y el mar: una fila de espartanos con escudos contra filas y filas persas; la caja cuenta 1, 2, 3 días.']),
 ('gr-plata', None, 17, 18, ['quema', 'plata'],
  ['De noche, la Acrópolis arde; en el mar, los atenienses miran desde sus barcos.',
   'La mina de plata: mineros, plata que brilla, monedas que se convierten en barcos; «200».']),
 ('gr-salamina', None, 19, 19, ['salamina'], ['Mapa del estrecho de Salamina: la flota persa entra y los barcos griegos la encierran; luego las ciudades griegas se unen con líneas.']),
 ('gr-liga', '479', 20, 21, ['liga', 'tesoro'],
  ['Mapa del Egeo: monedas de cada ciudad viajan a la isla de Delos.',
   'El tesoro se muda a Atenas; en la Acrópolis se levanta el Partenón; los aliados agachan la cabeza.']),
 ('gr-teatro', None, 22, 22, ['teatro'], ['Un teatro lleno con miles de personas; en el escenario, actores con máscaras de reír y de llorar.']),
 ('gr-ideas', None, 23, 23, ['ideas'], ['Hipócrates examina a un enfermo; un rayo de los dioses se tacha; filósofos que discuten bajo un pórtico.']),
 ('gr-democrito', None, 24, 24, ['democrito'], ['Demócrito corta una piedra por la mitad una y otra vez; zoom hasta un trozo que ya no se corta; aparece Atom y saluda.']),
 ('gr-socrates', None, 25, 25, ['socrates2'], ['En el ágora, Sócrates pregunta a un hombre rico, que se rasca la cabeza; los jóvenes escuchan; los poderosos fruncen el ceño.']),
 ('gr-guerra', '431', 26, 27, ['guerra', 'leon'],
  ['Mapa: Grecia se parte en dos bandos, Esparta en rojo y Atenas en azul.',
   'Un león y un tiburón; el ejército espartano en tierra y la flota ateniense en el mar; la gente se encierra tras los muros largos.']),
 ('gr-peste', None, 28, 28, ['peste'], ['La ciudad abarrotada; manchas oscuras de la peste; cae Pericles; «1/4».']),
 ('gr-sicilia', None, 29, 29, ['sicilia'], ['Mapa: la flota ateniense va a Sicilia y desaparece; «27» en la caja.']),
 ('gr-tiranos', '404', 30, 31, ['rinde', 'culpables'],
  ['Los espartanos derriban las murallas; treinta figuras oscuras; «1500».',
   'La asamblea furiosa señala; junto a Sócrates, dos alumnos se vuelven sombras.']),
 ('gr-cicuta', '399', 32, 32, ['cicuta'], ['La celda: los amigos abren la puerta; Sócrates niega, coge la copa y sigue hablando; la luz se apaga despacio.']),
 ('gr-macedonia', '338', 33, 34, ['macedonia', 'filipo'],
  ['Mapa: las ciudades griegas se apagan, agotadas; Macedonia crece en el norte.',
   'La falange macedonia con lanzas de seis metros avanza; «6»; los hoplitas griegos retroceden.']),
 ('gr-alejandro', None, 35, 36, ['cadena', 'alejandro'],
  ['Una cadena de maestros: Sócrates, Platón, Aristóteles y un chico, Alejandro.',
   'Mapa: la ruta de Alejandro de Macedonia a Egipto, Persia y la India; el imperio se colorea; «20», «32».']),
 ('gr-alejandria', None, 37, 38, ['lengua', 'biblioteca'],
  ['Mapa: el griego se extiende de Egipto a Afganistán.',
   'La biblioteca de Alejandría; Eratóstenes con un palo, su sombra y los rayos de sol; la Tierra con un ángulo.']),
 ('gr-roma', '146', 39, 39, ['roma'], ['Legionarios romanos se llevan estatuas griegas; romanos con toga leen rollos griegos y copian templos.']),
 ('gr-legado', None, 40, 40, ['legado'], ['Hoy: una urna de votar, un escenario, una antorcha olímpica, un triángulo de geometría y letras griegas.']),
 ('gr-mitos', None, 41, 41, ['mitos'], ['Zeus con su rayo en una nube, Hércules con su maza, el caballo de Troya, el barco de Ulises y una zapatilla con un ala.']),
 ('gr-final', None, 42, 44, ['platon', 'demo2', 'ranas'],
  ['Platón escribe rollos; luego un aula de hoy con alumnos levantando la mano.',
   'Demócrito pensando bajo las estrellas; átomos que bailan; «2000+».',
   'El mapa con ranitas alrededor del Mediterráneo que croan.']),
 ('gr-adios', None, 45, 45, ['adios'], ['Atenas de noche; Atom en su caja con el «?».']),
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
