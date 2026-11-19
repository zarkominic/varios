"""Reparto del episodio 40 (Anticitera: la máquina de engranajes de hace dos mil años) en escenas (escribe escenas.json).
Una fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Siete decorados (guion.md): A el mar de Anticitera 1900–1901 (el caíque de los buzos, la isla, la marina), B el fondo y
  el naufragio, C el museo de Atenas (1902 y 2005), D el laboratorio de Price, E la máquina (la caja, las esferas, los
  engranajes por dentro), F el cielo y la Grecia antigua (taller, eclipse, Olimpia) y G hoy (el estudio de Atom con su
  mecanismo de cartón).
- CUIDADO: nada de muertes ni de buzos accidentados; los «cuerpos» del fondo son estatuas (sorpresa, no susto); nada de
  extraterrestres. Letras en pantalla: ninguna legible salvo los números de las esferas. Hilo de gags: el mecanismo de
  cartón de Atom, que se atasca hasta el final.
- Los golpes son NOMBRES DE MARCAS de la misma escena (o «marca+segundos»).
- BANDA: Fa lidio, 96 por minuto, motivo de engranaje.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'fa', 'modo': 'lidio', 'tempo': 96, 'motivo': [0, 2, 4, 6, 7, 4, 2, 7]}
E = [
 ('ak-gancho', None, 1, 2, ['maquina', 'nombre'],
  ['F, B y E: un cielo antiguo con un eclipse; el naufragio en el fondo; un buzo saca un terrón de bronce verde; dentro, engranajes que brillan (golpe en «gears»).',
   'E, B, D, C y F: la máquina reconstruida girando; buzos que ven siluetas; una radiografía con ruedas; el escáner entrando en el museo; atletas corriendo alrededor de una esfera.'],
  'misterio', ['maquina+12.6']),
 ('ak-hola', None, 3, 3, ['hola'],
  ['G: Atom saluda en su estudio junto a su mecanismo de cartón; gira la manivela y una rueda sale rodando por el suelo.'],
  'curiosidad', []),
 ('ak-buzos', '1900', 4, 5, ['tormenta', 'gente'],
  ['A: el caíque de los buzos de Simi en la tormenta; se refugia en la cala de Anticitera; Elias Stadiatis (EL.stadiatisAK) se pone la escafandra y baja.',
   'B y A: siluetas en el fondo; el buzo sube a toda prisa; el capitán Kontos (EL.kontosAK) baja y ve estatuas de bronce y mármol; una parece saludarle con el brazo.'],
  'aventura', []),
 ('ak-rescate', None, 6, 7, ['rescate', 'tesoros'],
  ['A y B: el barco de la marina griega junto al caíque; la bomba de aire a mano; buzos con escafandra de cobre suben estatuas con cuerdas; un pulpo se lleva el pañuelo de un buzo.',
   'A y B: en cubierta, estatuas, ánforas, vidrio y joyas; en un rincón, unos terrones verdes que nadie mira; mapa del barco antiguo camino de Roma.'],
  'aventura', []),
 ('ak-terron', '1902', 8, 9, ['stais', 'dudas'],
  ['C: el museo de Atenas en 1902; Valerios Stais (EL.staisAK) y su primo Spyridon miran un terrón con la lupa; la madera se parte y aparece una rueda dentada (zoom).',
   'C: unos estudiosos discuten ante la vitrina, unos asienten y otros niegan; el terrón vuelve a una caja; pasan los años sobre la vitrina (polvo, calendario).'],
  'intriga', []),
 ('ak-price', '1951', 10, 12, ['price', 'dientes', 'libro'],
  ['D: Derek de Solla Price (EL.priceAK) llega al museo; con Karakalos (EL.karakalosAK) pone el terrón ante la máquina de rayos gamma.',
   'D y G: las radiografías a contraluz con capas de ruedas; Price cuenta dientes con un lápiz, suena el teléfono y pierde la cuenta; Atom explica con dos ruedas de 20 y 40 dientes.',
   'D: el libro «Gears from the Greeks» sobre la mesa; unos colegas dudan, Price sonríe.'],
  'curiosidad', []),
 ('ak-escaner', '2005', 13, 15, ['escaner', 'letras', 'piezas'],
  ['C: el escáner de ocho toneladas entra por la puerta del museo con un centímetro de margen; los investigadores lo rodean.',
   'C y G: en la pantalla, las letras diminutas aparecen bajo la corrosión, como un manual; Atom mira con la lupa.',
   'C y E: los ochenta y dos fragmentos en una mesa; el engranaje más grande junto a una mano y, detrás, la rueda de doscientos veintitrés dientes.'],
  'asombro', []),
 ('ak-manivela', None, 16, 17, ['caja', 'esfera'],
  ['E y G: la caja de madera junto a una caja de zapatos; Atom gira la manivela y las fechas avanzan y retroceden.',
   'E: la esfera de delante con el zodiaco y el calendario; las agujas del Sol y de la Luna; la bolita de las fases que gira.'],
  'calma', []),
 ('ak-luna', None, 18, 19, ['truco', 'hiparco'],
  ['E y F: la Luna cruza el cielo deprisa y despacio; por dentro, los dos engranajes desplazados con la clavija en la ranura; Atom gira demasiado rápido y la bolita de la Luna se marea.',
   'F: el astrónomo Hiparco (EL.hiparcoAK) mira el cielo con sus instrumentos; su dibujo se convierte en ruedas de bronce.'],
  'calma', []),
 ('ak-espirales', None, 20, 21, ['meton', 'saros'],
  ['E: la parte de atrás con las dos espirales; la aguja de arriba recorre diecinueve años; las estaciones pasan junto a ella.',
   'E y F: la rueda de doscientos veintitrés dientes; astrónomos babilonios apuntan eclipses en tablillas (golpe en «Saros»).'],
  'asombro', ['saros+8.6']),
 ('ak-eclipses', None, 22, 23, ['marcas', 'juegos'],
  ['F y E: un eclipse de Sol sobre un templo; en la espiral, las marcas de los eclipses se encienden una a una.',
   'F y E: el estadio de Olimpia; en la esfera de los Juegos, unos atletas diminutos corren alrededor del dial.'],
  'asombro', []),
 ('ak-quien', None, 24, 26, ['corinto', 'ciceron', 'unica'],
  ['F: un mapa del Mediterráneo con Corinto, Siracusa y Rodas que se encienden; el taller de un artesano con limas y bronce.',
   'F: Cicerón (EL.ciceronAK) escribe; Arquímedes (EL.arquimedesAK) con su esfera; un general romano se la lleva; Posidonio (EL.posidonioAK) en Rodas.',
   'F y B: un horno funde bronce viejo para hacer cosas nuevas; la máquina hundida en el fondo, a salvo.'],
  'misterio', []),
 ('ak-planetas', '2021', 27, 28, ['planetas', 'agujeros'],
  ['G y E: la esfera de delante con los planetas de la época girando en anillos; una investigadora (EL.investigadoraAK) en Londres.',
   'G y E: el anillo del calendario con sus agujeros; dos físicos (EL.fisicoAK) cuentan con estadística; aparece una Luna en el anillo.'],
  'intriga', []),
 ('ak-atasco', None, 29, 30, ['simulacion', 'pregunta'],
  ['G y E: un ordenador simula los engranajes; los dientes irregulares chocan y la máquina se atasca; el mecanismo de cartón de Atom también.',
   'G: Atom ante un globo terráqueo de aula; la máquina como modelo para enseñar el cielo.'],
  'intriga', []),
 ('ak-cierre', None, 31, 33, ['siglos', 'misterio', 'final'],
  ['F: una línea del tiempo de mil cuatrocientos años hasta un reloj astronómico medieval.',
   'F: gente mirando el cielo durante siglos, tablillas y papiros; todo cabe dentro de una caja.',
   'G y A: la tormenta, los buzos y la mirada de Stais; Atom gira la manivela de su mecanismo de cartón y por fin gira; la Luna de cartón sale por la ventana.'],
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
assert escenas[-1]['frase_fin'] == 33
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas')
