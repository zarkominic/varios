"""Reparto del episodio 49 (Göbekli Tepe: el templo que unos cazadores levantaron antes de inventar la agricultura) en
escenas (escribe escenas.json). Una fila por escena: (id, cartela, frase_ini, frase_fin, [marcas], [guion visual], ánimo,
golpes).
- Canon del 43 al 48: relato a lo Farid humanizado, ATOM EN ESCENA y 5 PAUSAS «fíjate» (frases 11, 13, 16, 20 y 24).
- Decorados: A la colina de Göbekli Tepe (1963, 1994, la excavación de hoy), B el recinto hace 11.600 años, C la cantera
  y el paisaje del Neolítico, D los arqueólogos (tienda de 1963, casa de la excavación, laboratorio del carbono 14),
  E lo que se cuenta hoy (salón con tele, la piedra del buitre, Karahan Tepe y Taş Tepeler) (nuevos, gb-comun.js) y
  F el estudio de las pausas (hm-comun.js).
- Nada morboso: ni cráneos ni tumbas a la vista; los enterramientos de 2026 se cuentan con el campo de excavación y unas
  etiquetas, no se enseñan. Sin letras, salvo números.
- BANDA: Mi mixolidio, 76, instrumentos grabados (corno inglés solista), la celesta en los arpegios agudos.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'mi', 'modo': 'mixolidio', 'tempo': 76, 'motivo': [0, 2, 4, 7, 10, 9, 7, 0], 'sampleado': True, 'biblioteca': 'real',
         'paleta': {'solista': 'corno_ingles', 'metal': 'trompa', 'madera': 'fagot', 'aire': 'flauta_pan'}}
E = [
 ('gb-gancho', None, 1, 3, ['promesa', 'cazador', 'internet'],
  ['B: al amanecer, una fila de cazadores con pieles tira de cuerdas y un pilar en T gigante se levanta; golpe en «Stonehenge»; al lado, en pequeño, la silueta de Stonehenge que se queda diminuta.',
   'B: de cerca, el cazador (tú) tirando de la cuerda de cuero con otros; el pilar con brazos, manos sobre el vientre y un zorro tallado; sin metal, sin ruedas.',
   'A y E: el cerro de hoy con su gran cubierta blanca; luego una pantalla de móvil con vídeos de «civilización perdida» (iconos: un ojo, una pirámide, un cometa) que se desliza.'],
  'asombro', ['promesa+3.66']),
 ('gb-aviso', None, 4, 4, ['pregunta'],
  ['F: Atom en su estudio coloca en la pizarra un pilar en T de juguete y una gran interrogación con una tiza («guárdate esta pregunta»).'],
  'asombro', []),
 ('gb-1963', '1963', 5, 6, ['prospeccion', 'campesinos'],
  ['A y D: 1963, un jeep y tres prospectores con sombrero recorren el cerro pelado con el moral solitario; uno apunta en su cuaderno mirando losas rotas (cree que son lápidas); la tienda de campo al pie.',
   'A: los años pasan (el moral crece, las estaciones cambian); un campesino ara con su tractor alrededor de las piedras y aparta una; gag: Atom ayuda a empujar una losa y el que resbala es él.'],
  'curiosidad', []),
 ('gb-schmidt', '1994', 7, 7, ['schmidt'],
  ['A: 1994, Klaus Schmidt (chibi, barba, sombrero de ala) sube al cerro, se agacha ante una losa, aparta la tierra y ve que es la cabeza de un pilar en T; se queda quieto; en un globo, el pilar entero bajo tierra.'],
  'curiosidad', []),
 ('gb-pilares', '1995', 8, 10, ['circulos', 'personas', 'zoo'],
  ['A y D: la excavación crece año a año (andamios, tamices, carretillas, trabajadores); aparecen los círculos de pilares con los dos centrales que se miran.',
   'B: de cerca, el pilar central con los brazos, las manos de dedos largos sobre el vientre, el cinturón y el taparrabos de zorro; gag: Atom imita la pose del zorro y se le queda torcida.',
   'B: recorrido por los relieves: zorros, jabalíes, serpientes en fila, escorpiones, grullas y buitres; ni trigo ni ovejas (iconos tachados).'],
  'epico', []),
 ('gb-peso', None, 11, 11, ['fijate1'],
  ['PAUSA: el recinto congelado; Atom (al doble) saca a color un pilar sobre troncos con palancas y una fila de gente que tira; «10 t»; gag: Atom llega con una carretilla y se le cae la rueda (la rueda llegará seis mil años después); luego la cantera con el pilar de 7 m tumbado.'],
  'epico', []),
 ('gb-fechas', None, 12, 12, ['carbon'],
  ['D: el laboratorio: una muestra de carbón entra en una máquina; sale el número «9500»; una línea del tiempo con Stonehenge y las pirámides que se alejan a la derecha.'],
  'calma', []),
 ('gb-carbono', None, 13, 13, ['fijate2'],
  ['PAUSA: el laboratorio congelado; Atom (al doble) saca un reloj de arena y una tarta: gag: parte la tarta por la mitad, y otra vez, y otra, hasta una miga («5730»).'],
  'calma', []),
 ('gb-cazadores', None, 14, 15, ['huesos', 'trigo'],
  ['C: la estepa hace 11.600 años: gacelas, uros y jabalíes; cazadores al acecho; mujeres que recogen espigas silvestres con hoces de sílex.',
   'C: los montes Karacadağ al fondo, volcánicos y oscuros; el trigo silvestre que se mece; una línea punteada que une las laderas con el cerro de los pilares.'],
  'calma', []),
 ('gb-banquete', None, 16, 16, ['fijate3'],
  ['PAUSA: el banquete congelado junto a los pilares; Atom (al doble) saca a color piedras de moler, un gran cuenco de piedra con papilla y unas espigas que se convierten en un campo sembrado; gag: Atom prueba la papilla y pone cara de que le falta sal.'],
  'calma', []),
 ('gb-tele', '2022', 17, 19, ['serie', 'buitre', 'basura'],
  ['E: un salón con una tele grande (sin marcas) que emite un documental de «civilización perdida»: un barco, hielo, una ciudad que se hunde; un espectador chibi en el sofá con palomitas.',
   'E: el pilar 43 de cerca: el buitre, el escorpión, las aves; unas líneas de constelaciones que se dibujan encima y un cometa que cae; luego se borran.',
   'D: una mesa de la excavación llena de puntas de flecha de sílex, piedras de moler y huesos de gacela, con sus etiquetas de números; una arqueóloga las ordena.'],
  'misterio', []),
 ('gb-patrones', None, 20, 20, ['fijate4'],
  ['PAUSA: el salón congelado; Atom (al doble) señala un enchufe que parece una cara y una nube que parece un animal; gag: la nube se convierte en un buitre, luego en un cometa y al final se parece a Atom.'],
  'misterio', []),
 ('gb-relleno', '2014', 21, 23, ['sospecha', 'capas', 'casas'],
  ['A: los recintos llenos de tierra hasta arriba; Schmidt imagina gente que echa tierra en una ceremonia (en un globo).',
   'A: un corte de la tierra con sus capas de colores; gotas de lluvia y barro que bajan de la ladera durante siglos (el tiempo corre); golpe en la revelación; gente que apuntala un pilar inclinado.',
   'A y D: 2026: la zona nueva al norte con edificios rectangulares (casas); un equipo de excavación con cuadrícula, etiquetas y cajas; gag: Atom limpia una losa con una brocha y desentierra su propio bocadillo.'],
  'intriga', ['capas+4']),
 ('gb-intencion', None, 24, 24, ['fijate5'],
  ['PAUSA: el corte de tierra congelado; Atom (al doble) saca dos libros: uno con una portada de película (una mano que entierra algo) y otro con una nube de lluvia; la balanza se inclina hacia la película aunque la lluvia pesa más.'],
  'intriga', []),
 ('gb-colinas', '2025', 25, 27, ['estatua', 'karahan', 'leopardo'],
  ['A: 2025, restauradores en un muro entre dos recintos; de la pared asoma una estatua humana de piedra tumbada boca arriba; todos se quedan mirando.',
   'E: Karahan Tepe: la sala tallada en la roca con los pilares que brotan del suelo y la cabeza humana en la pared; el pilar en T con cara; un mapa de las colinas de Taş Tepeler que se encienden una a una.',
   'E: la figura de una persona sentada sobre un leopardo; el cuenco de piedra con tres figuritas (zorro, jabalí, buitre); el relieve de Sayburç (un hombre entre dos leopardos y otro frente a un toro).'],
  'asombro', []),
 ('gb-cierre', None, 28, 29, ['pregunta', 'comentarios'],
  ['B y C: vuelta al principio: la fila que tira de la cuerda; el pilar ya de pie; alrededor nacen chozas, campos de trigo y humo de hogares (la aldea que nace del templo).',
   'F: Atom en su estudio pone su pilar de juguete junto a una espiga, mira a cámara y señala los comentarios.'],
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
assert escenas[-1]['frase_fin'] == 29
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas')
