"""Reparto del episodio 47 (Mary Shelley: la chica de dieciocho años que inventó a Frankenstein) en escenas (escribe
escenas.json). Una fila por escena: (id, cartela, frase_ini, frase_fin, [marcas], [guion visual], ánimo, golpes).
- Canon del 43 y del 45: relato a lo Farid humanizado, ATOM EN ESCENA y 5 PAUSAS «fíjate» (frases 11, 14, 18, 22 y 28).
- Decorados: A Londres 1797–1814, B el lago de Ginebra 1816, C el mundo del libro, D Londres 1818–1823, E Italia
  1818–1822 (nuevos, ms-comun.js) y F el estudio de las pausas (hm-comun.js).
- DERECHOS: nada de las películas; la criatura, por el libro. Violencia nunca vista; nada morboso. Sin letras.
- BANDA: Do menor, 66, instrumentos grabados (violonchelo solista), la celesta en los arpegios agudos.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'do', 'modo': 'menor', 'tempo': 66, 'motivo': [0, 3, 7, 8, 7, 3, 2, 0], 'sampleado': True, 'biblioteca': 'real',
         'paleta': {'solista': 'chelo', 'metal': 'trompa', 'madera': 'clarinete', 'aire': 'flauta'}}
E = [
 ('ms-gancho', None, 1, 3, ['giro', 'noche', 'mary'],
  ['B: el cuarto de Mary de noche con la lluvia en los cristales; golpe en «Frankenstein».',
   'B: la casa junto al lago bajo la tormenta; dentro, Mary en la cama con los ojos cerrados; sobre ella, como un sueño, la silueta de un estudiante arrodillado junto a una mesa, algo que se mueve y unos ojos amarillos que lo miran.',
   'B y F: Mary al despertar; Atom de luciérnaga junto a la vela; un calendario con el 1 de enero.'],
  'misterio', ['giro+2']),
 ('ms-aviso', None, 4, 4, ['dentro'],
  ['F: Atom en su estudio abre un libro viejo y dibuja en la pizarra dos ojos en la oscuridad («guárdate esto»).'],
  'misterio', []),
 ('ms-lapida', '1797', 5, 8, ['nace', 'tumba', 'casa', 'percy'],
  ['A: Londres en 1797; la casa de los Godwin; una cuna y un retrato de mujer en la pared.',
   'A: el cementerio de St Pancras; Mary niña con un libro junto a la lápida, sigue las letras con el dedo; gag: Atom intenta leer la lápida al revés.',
   'A: la biblioteca de los Godwin llena de visitas; Mary callada en un rincón, escuchando.',
   'A: Percy y Mary junto a la tumba; luego, una calle de Londres de madrugada y un carruaje que se va.'],
  'ternura', []),
 ('ms-bebe', '1815', 9, 10, ['vuelven', 'diario'],
  ['A: un cuarto pobre de alquiler en Londres; Mary con una cuna pequeña.',
   'A: de noche, Mary escribe en su diario junto a la chimenea; la cuna vacía (sin nada morboso).'],
  'calma', []),
 ('ms-suenos', None, 11, 11, ['fijate1'],
  ['PAUSA: el diario congelado; Atom (al doble) saca a color una nube de sueño con una figura que abraza a otra; «58».'],
  'calma', []),
 ('ms-lago', '1816', 12, 13, ['suiza', 'lluvia'],
  ['B: el lago de Ginebra; Villa Diodati en la colina y la casita de al lado; un barco; las montañas.',
   'B: la tormenta sobre el lago en junio; gag: a Atom se le da la vuelta el paraguas.'],
  'asombro', []),
 ('ms-volcan', None, 14, 14, ['fijate2'],
  ['PAUSA: la tormenta congelada; Atom (al doble) saca a color un volcán que estalla y una nube que da la vuelta al globo; nieve sobre un campo de maíz; «1815», «1816».'],
  'asombro', []),
 ('ms-juego', None, 15, 17, ['juego', 'nada', 'sueno'],
  ['B: el salón de Villa Diodati a la luz de las velas; Byron propone el juego; todos escriben; gag: Atom escribe y le sale un fantasma con sábana.',
   'B: por la mañana, en la mesa del desayuno, todos con sus hojas y Mary con la suya en blanco.',
   'B: de noche, Byron y Percy hablan junto a la chimenea; Mary en la cama sin dormir; la imagen del principio otra vez (la cosa que se mueve, los ojos amarillos); gag: Atom apaga la vela y se enciende otra.'],
  'asombro', ['sueno+3']),
 ('ms-galvani', None, 18, 18, ['fijate3'],
  ['PAUSA: el cuarto congelado; Atom (al doble) saca a color una mesa de laboratorio antiguo con una pila, cables y una rana de juguete que salta (gag: Atom salta también); «1780».'],
  'asombro', []),
 ('ms-criatura', None, 19, 21, ['novela', 'libro', 'imagina'],
  ['B: Mary escribe a la luz del día en un cuaderno; Percy lee por encima de su hombro.',
   'C: la cabaña en el bosque con la familia dentro; la criatura (por el libro: alta, pelo negro largo, piel amarillenta) escondida tras la pared, escuchando; aprende a leer.',
   'C: la buhardilla de Victor; la criatura abre los ojos; Victor huye; luego, en el bosque, la gente grita y la criatura se esconde (nada violento).'],
  'intriga', []),
 ('ms-rechazo', None, 22, 22, ['fijate4'],
  ['PAUSA: el bosque congelado; Atom (al doble) saca a color una pantalla antigua con tres figuras que se pasan una pelota y dejan fuera a una; un corazón agrietado; «2003».'],
  'intriga', []),
 ('ms-libro', '1818', 23, 25, ['victor', 'enero', 'teatro'],
  ['C: el hielo del Ártico; Victor y la criatura lejos uno del otro (el final del libro, sin violencia).',
   'D: una imprenta de 1818; tres tomos pequeños; un escaparate de librería; gag: a Atom se le caen los tres tomos.',
   'D: un teatro de Londres lleno; Mary en un palco; gag: Atom busca el nombre en el programa y solo hay una raya.'],
  'curiosidad', []),
 ('ms-precio', '1818', 26, 27, ['italia', 'mar'],
  ['E: Italia; la casa blanca junto al mar; Mary con su hijo pequeño; dos cunas vacías (sin nada morboso).',
   'E: el mar en tormenta, de lejos; un barquito de vela que se pierde; luego, Mary sola en la playa con su hijo de la mano.'],
  'calma', ['mar+6']),
 ('ms-escribir', None, 28, 29, ['fijate5', 'escribe'],
  ['PAUSA: la playa congelada; Atom (al doble) saca a color un cuaderno que se escribe solo y una caja de la que sale luz; «1986».',
   'E: Mary escribe junto a la ventana, años después; montones de libros; su hijo ya mayor; la vida vuelve a la casa.'],
  'calma', []),
 ('ms-cierre', '1831', 30, 32, ['1831', 'recuerdas', 'pregunta'],
  ['D: Mary, mayor, firma la nueva edición; despide al libro con una sonrisa.',
   'B: la noche del principio en el cuarto junto al lago, ya sin tormenta; los ojos amarillos en la oscuridad, ahora con luz cálida; luego, mil libros en mil idiomas.',
   'F: Atom en su estudio cierra el libro, mira a cámara y señala los comentarios.'],
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
