"""Reparto del episodio 39 (Roanoke: la colonia que desapareció y dejó una palabra) en escenas (escribe escenas.json). Una
fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Siete decorados (guion.md): A Inglaterra 1584–1588 (el estudio de Raleigh, Plymouth, el puerto de la Armada), B el mar y
  los bancos de arena (Outer Banks, la tormenta de 1590), C la isla de Roanoke en 1587 (la empalizada, las casitas, el
  poste), D los pueblos algonquinos (como en las acuarelas de John White), E Hatteras hoy (la excavación de Cape Creek),
  F el mapa y el laboratorio (el Museo Británico y el Sitio X) y G hoy (el estudio de Atom con la maqueta y las notas).
- CUIDADO: nada de muertes, esqueletos ni batallas; los pueblos algonquinos, con respeto y sin estereotipos; las teorías
  violentas, de lejos y como rumores. Letras en pantalla solo «CRO» y «CROATOAN» talladas. Hilo de gags: las notas
  dibujadas de Atom, que nadie entiende.
- Los golpes son NOMBRES DE MARCAS de la misma escena (o «marca+segundos»).
- BANDA: Mi mixolidio, 80 por minuto, motivo de balada antigua.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'mi', 'modo': 'mixolidio', 'tempo': 80, 'motivo': [0, 5, 7, 10, 7, 5, 4, 2]}
# pastoral (rk-familias): «Greensleeves», canción inglesa de la época (registrada en 1580), dominio público
BANDA['cita'] = {**json.load(open(os.path.join(D, 'greensleeves.json'))), 'negra': 0.75}
E = [
 ('rk-gancho', None, 1, 2, ['vuelta', 'camino'],
  ['B y C: los barcos de 1590 llegan a la isla; John White (EL.whiteRK) baja a tierra; la empalizada vacía; el poste con «CROATOAN» tallado (golpe en «no quedaba nadie»).',
   'A, D, B y E: una acuarela a medio pintar; una cuna; una flota en el horizonte; un corte de tronco con sus anillos; un imán que sale de la arena con escamas de hierro.'],
  'misterio', ['vuelta']),
 ('rk-hola', None, 3, 3, ['hola'],
  ['G: Atom saluda en su estudio junto a una maqueta de la empalizada; deja una nota con el dibujo de una taza y sale; nadie la entiende.'],
  'curiosidad', []),
 ('rk-raleigh', None, 4, 5, ['raleigh', 'islas'],
  ['A: el estudio de Raleigh (EL.raleighRK) con mapas y un globo; la pluma del sombrero le hace cosquillas; dos barcos salen hacia América; las islas de arena desde el mar.',
   'D y A: un pueblo algonquino junto al agua (canoas, nasas, maíz); Manteo (EL.manteoRK) y Wanchese (EL.wancheseRK) en la cubierta de un barco rumbo a Inglaterra.'],
  'aventura', []),
 ('rk-soldados', None, 6, 7, ['pintor', 'mal'],
  ['C y D: los soldados de 1585 levantan un fuerte de tierra; White pinta acuarelas de un pueblo con su caja de pinturas.',
   'C y B: la despensa vacía de los soldados; los barcos de Drake en el horizonte; los soldados suben a los botes y se van.'],
  'aventura', []),
 ('rk-familias', '1587', 8, 10, ['familias', 'piloto', 'quedan'],
  ['A: el puerto de Plymouth en 1587: familias con baúles, niños, gallinas; Eleanor (EL.eleanorRK) y Ananias Dare (EL.ananiasRK) suben a bordo; White las cuenta.',
   'B: en el timón, el piloto Fernandes (EL.fernandesRK) se cruza de brazos mientras los colonos señalan Chesapeake en el mapa; una gaviota se le posa en la gorra.',
   'C: los colonos arreglan las casitas de madera y tejado de juncos; Manteo hace de puente con los suyos.'],
  'pastoral', []),
 ('rk-virginia', None, 11, 12, ['virginia', 'justas'],
  ['C: la casita de los Dare; la cuna de Virginia, que se mece sola… y es un gato el que la mece; White escribe en su diario.',
   'C: el huerto seco, el granero casi vacío; los colonos rodean a White y le piden que vaya a Inglaterra.'],
  'ternura', []),
 ('rk-senal', None, 13, 14, ['senal', 'despedida'],
  ['G y C: Atom, en su maqueta, talla un nombre en un poste y luego una cruz encima; la cruz le sale torcida, la repite dos veces.',
   'C y B: White se despide de Eleanor con la niña en brazos en el embarcadero; el barco se aleja.'],
  'intriga', []),
 ('rk-armada', None, 15, 16, ['armada', 'piratas'],
  ['A: el puerto inglés con los barcos retenidos; en el horizonte, la Armada con sus velas en media luna.',
   'B: los dos barquitos de White; un barco pirata los alcanza; vuelven con las bodegas vacías; pasan las estaciones sobre el puerto.'],
  'epico', []),
 ('rk-regreso', '1590', 17, 19, ['regreso', 'croatoan', 'tormenta'],
  ['B y C: los barcos de 1590 frente a la isla; humo entre los árboles; marineros tocan la trompeta; silencio.',
   'C: las casas desmontadas, la empalizada; el árbol de la duna con «CRO»; el poste con «CROATOAN» (golpe); White busca la cruz y no la hay.',
   'B: White señala al sur, hacia Croatoan; llega la tormenta, el cabo del ancla se rompe, los barcos se van mar adentro.'],
  'suspense', ['croatoan']),
 ('rk-arboles', None, 20, 21, ['anillos', 'sequia'],
  ['G y B: Atom cuenta con la lupa los anillos de un corte de ciprés; los de 1587–1589 son finísimos; el tronco cruje como un suspiro; cipreses en el agua.',
   'D y C: un campo de maíz seco bajo el sol; colonos y vecinos se reparten en grupos con sus cestas.'],
  'curiosidad', []),
 ('rk-mapa', None, 22, 23, ['parche', 'sitiox'],
  ['F: la sala del Museo Británico; el mapa de White a contraluz: bajo el parche aparece un pequeño fuerte dibujado junto al estrecho de Albemarle.',
   'F: la orilla del estrecho en el Sitio X; arqueólogos con cuadrículas; aparecen unos trozos de cerámica inglesa.'],
  'curiosidad', []),
 ('rk-hatteras', '2026', 24, 26, ['hatteras', 'escamas', 'lawson'],
  ['E: la excavación junto a la ensenada de Hatteras; sobre la mesa, una empuñadura de espada, trozos de armas, una pizarra y un anillo.',
   'E: la arqueóloga (EL.arqueologaRK) pasa un imán por la criba: salen escamas de hierro (golpe)… y el clip de su tablilla y una moneda de 2025.',
   'D: en 1701, el viajero Lawson (EL.lawsonRK) escucha a la gente de Hatteras; un libro abierto; unos ojos grises.'],
  'asombro', ['escamas']),
 ('rk-objeto', None, 27, 29, ['objeto', 'dudas', 'piedras'],
  ['G y D: Atom con una espada de juguete en una balanza; al otro lado, una mazorca: se cambia de mano en mano.',
   'G: Atom con una tabla de ADN en blanco y un signo de interrogación; un rumor de Jamestown, de lejos, que se borra.',
   'G: piedras talladas con letras que se van llenando de florituras, hasta que una se rompe y es de yeso.'],
  'intriga', []),
 ('rk-cierre', None, 30, 32, ['entonces', 'perdida', 'final'],
  ['C, D y E: grupos de colonos se van con Manteo en canoas hacia el sur; años después, niños jugando en un pueblo de Croatoan.',
   'C: el poste con «CROATOAN» al atardecer: un mensaje claro; el barco de White lejos, que no vuelve.',
   'G: Atom vuelve a su estudio; su nota tiene ahora un dibujo claro: una flecha a la isla; levanta el imán y sonríe.'],
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
assert escenas[-1]['frase_fin'] == 32
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas')
