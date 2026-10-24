"""Reparto del episodio 9 (Acción de Gracias y Black Friday) en escenas (escribe escenas.json). Una fila por escena:
(id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase]). Estilo canónico pixel chibi
(GUIA-ESTILO.md), con ambiente y gags. Cinco decorados que se repiten: A Plymouth (la colonia de 1621), B el comedor,
C la calle de compras (Nueva York, 1924–1939), D Filadelfia (años cincuenta) y E hoy (la tienda y el sofá), más los mapas.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
E = [
 ('ag-hola', None, 1, 1, ['hola'], ['B: el comedor con la cena de Acción de Gracias puesta; Atom saluda.']),
 ('ag-gancho', None, 2, 3, ['pavo', 'pregunta'],
  ['A: un peregrino persigue a un pavo salvaje por el bosque de otoño y se le escapa (gag); luego D: un policía con silbato en un atasco.',
   'La mesa de 1621 se transforma en una cola de compras: «?».']),
 ('ag-mapa', None, 4, 4, ['mapa'], ['Mapa: zoom del Atlántico a la costa de Nueva Inglaterra; aldeas wampanoag que se encienden por la costa.']),
 ('ag-mayflower', '1620', 5, 6, ['mayflower', 'invierno'],
  ['A en invierno: el Mayflower llega a una bahía helada; los pasajeros bajan con frío, sin casas.',
   'A en invierno: nieve; de las cabañas, la mitad de las ventanas se apagan.']),
 ('ag-squanto', None, 7, 9, ['squanto', 'viaje', 'maiz'],
  ['A en primavera: Tisquantum sale del bosque y saluda; los colonos, sorprendidos.',
   'Mapa del Atlántico: su viaje de ida (a España) y vuelta (por Inglaterra); su aldea, vacía.',
   'A: siembran maíz con un pescado en cada hoyo; un pescado salta y uno lo persigue (gag).']),
 ('ag-cena', '1621', 10, 11, ['cosecha', 'massasoit'],
  ['A en otoño: la cosecha de maíz y calabazas; ponen una mesa larga al aire libre.',
   'A: Massasoit llega con su gente, que son más que los colonos; traen ciervos.']),
 ('ag-pavo', None, 12, 13, ['aves', 'tarta'],
  ['A: la mesa con patos y gansos; un pavo asoma detrás de un árbol, mira y se va.',
   'A: una tarta de calabaza aparece y se tacha («✗»): no hay horno.']),
 ('ag-alianza', None, 14, 15, ['alianza', 'luto'],
  ['A: Massasoit y el gobernador se dan la mano; detrás, cada uno su peligro (enemigos, hambre).',
   'A al atardecer: la mesa vacía, hojas que caen; «50».']),
 ('ag-olvido', None, 16, 16, ['olvido'], ['B: el comedor con calendarios que cambian de fecha sin parar.']),
 ('ag-hale', None, 17, 18, ['hale', 'cartas'],
  ['B: Sarah Josepha Hale en su escritorio, con un corderito a su lado.',
   'B: escribe carta tras carta; un buzón que se desborda (gag); «17».']),
 ('ag-lincoln', '1863', 19, 19, ['lincoln'], ['B: Lincoln dice que sí; soldados de azul y de gris se sientan a la misma mesa.']),
 ('ag-porque', None, 20, 20, ['porque'], ['Granja: la gallina con su huevo, la vaca con su leche, tranquilas; el pavo suda (gag).']),
 ('ag-desfile', '1924', 21, 22, ['desfile', 'regla'],
  ['C: el desfile por la calle con globos gigantes y Santa Claus al final, en su trineo.',
   'C: los escaparates esperan; cuando pasa Santa se encienden las luces de Navidad.']),
 ('ag-dias', None, 23, 23, ['dias'], ['Calendario de noviembre y diciembre: cuanto antes cae el jueves, más casillas de compras.']),
 ('ag-1939', '1939', 24, 27, ['cinco', 'roosevelt', 'lio', 'congreso'],
  ['Calendario de noviembre de 1939 con cinco jueves; el último, el 30.',
   'C: Roosevelt arrastra el pavo del calendario una semana atrás.',
   'C: dos casas vecinas: una cena el jueves nuevo, la otra el viejo, y se miran por la ventana («?», gag); «23», «22», «3».',
   'Un mazo del Congreso: el cuarto jueves se queda marcado.']),
 ('ag-filadelfia', None, 28, 30, ['viernes', 'partido', 'atascos'],
  ['D: un policía de Filadelfia en un cruce, con su silbato.',
   'D: riadas de gente con paquetes y aficionados del Ejército y la Marina con bufandas.',
   'D: atasco de coches, un ladrón con un paquete; al policía le sale humo de la gorra (gag).']),
 ('ag-nombre', '1961', 31, 33, ['negro', 'gran', 'cuentas'],
  ['D: los policías miran el cielo, que se nubla en negro.',
   'D: un tendero cuelga una estrella dorada en el escaparate; el policía niega con la cabeza.',
   'E: un libro de cuentas pasa de números rojos a negros; «1980».']),
 ('ag-hoy', '2005', 34, 35, ['crece', 'cyber'],
  ['E: cola de madrugada ante la tienda; uno se duerme de pie y caen todos como fichas de dominó (gag).',
   'E: el sofá; alguien compra con el móvil y le llueven cajas.']),
 ('ag-mundo', None, 36, 36, ['mundo'], ['Mapa del Atlántico: puntos de oferta que se encienden en Europa y en México.']),
 ('ag-cadena', None, 37, 37, ['cadena'], ['Una cadena de seis viñetas: la cena, la pluma, la guerra, el desfile, el calendario y el silbato.']),
 ('ag-sueno', None, 38, 41, ['sueno', 'triptofano', 'cantidad', 'peregrino'],
  ['B: después de la cena, la familia bosteza en el sofá.',
   'Una molécula de triptófano hecha de átomos; un muslo de pavo y unos nuggets con el mismo número.',
   'B: la familia se queda dormida uno a uno.',
   'A: un peregrino dormido junto a la mesa de 1621.']),
 ('ag-adios', None, 42, 42, ['adios'], ['B de noche: la mesa recogida, la ventana con nieve; Atom.']),
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
