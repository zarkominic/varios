"""Reparto del episodio 35 (Jumanji: la palabra que no significa nada) en escenas (escribe escenas.json). Una fila por
escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Seis decorados (guion.md): A Providence y Boston (taller del escultor, despacho del editor, sala de premios), B la casa
  del juego (NUESTRA, como a lápiz: salón con piano, cocina, parque), C Keene y el rodaje de 1995 (calle de ladrillo con
  el letrero del zapato, plató, puesto de efectos), D el cine (marquesina sin letras, taquilla, butacas, salón con
  consola y cartucho), E la selva del juego (NUESTRA) y F hoy (el estudio de Atom con su juego de mesa).
- DERECHOS: nada de imágenes de las películas (actores caracterizados, vestuario, el tablero de la película) ni de las
  ilustraciones del libro. Las películas, con marquesinas, taquillas y butacas. Sin letras: números, rayas e iconos.
  Hilo de gags: los dados de Atom; cada tirada deja algo de selva en el estudio.
- Los golpes son NOMBRES DE MARCAS de la misma escena.
- BANDA: La mayor, 104 por minuto, motivo de tambores y de aventura.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'la', 'modo': 'mayor', 'tempo': 104, 'motivo': [0, 4, 7, 9, 7, 4, 2, 0]}
E = [
 ('jm-gancho', None, 1, 2, ['palabra', 'camino'],
  ['B, A y D: una palabra hecha de fichas que no forma nada (un «?»); un escultor ante un libro pequeño en grises; un contador de taquilla que sube hasta dos mil millones (golpe).',
   'A, C: un artista que dibuja de noche bajo un flexo; un perro blanco que asoma por la esquina de un dibujo; una pared de ladrillo con un zapato pintado y un pueblo delante; un león de alambre en una pantalla.'],
  'misterio', ['palabra']),
 ('jm-hola', None, 3, 3, ['hola'],
  ['F: Atom saluda en su estudio, con un juego de mesa (nuestro) y dos dados; tira los dados y una liana baja del techo y le quita el lápiz.'],
  'curiosidad', []),
 ('jm-escultor', '1979', 4, 5, ['chris', 'noche'],
  ['A: un mapa con Michigan y Rhode Island; el taller de un escultor joven (EL.vanallsburg), esculturas a medio hacer, una clase de diseño.',
   'A, de noche: el taller frío (un radiador apagado, vaho); en casa, la mesa de dibujo bajo el flexo, dibujos a lápiz quietos y raros; Lisa (EL.lisa) mira uno, lo mete en una carpeta y sale con ella.'],
  'calma', []),
 ('jm-perro', None, 6, 6, ['editor'],
  ['A: el despacho del editor en Boston (EL.lorraine) con pilas de libros; mira los dibujos y le tiende una pluma: que lo escriba él; el libro de 1979: un niño persigue a un bull terrier blanco hasta un jardín de setos; el perro asoma en la esquina de varios dibujos, cada vez más escondido.'],
  'ternura', []),
 ('jm-pregunta', '1981', 7, 8, ['recuerdo', 'nombre'],
  ['B: un niño de los años cincuenta ante un juego de mesa: mueve una ficha, gana un billete de juguete y bosteza; sobre su cabeza, la pregunta: el tablero del que sale una hoja de verdad.',
   'A y B: Van Allsburg dibuja un salón tranquilo y le pone un rinoceronte; prueba palabras en un papel (rayas, no letras) hasta que una se queda, con una J grande.'],
  'curiosidad', []),
 ('jm-libro', None, 9, 10, ['hermanos', 'dibujo'],
  ['B (en grises, como a lápiz): dos hermanos encuentran una caja bajo un árbol del parque; en casa, cada tirada trae algo: un león sobre el piano (toca una nota), monos en la cocina, lluvia en el salón, rinocerontes por el pasillo.',
   'A y B: la mano que dibuja con lápiz y polvo, y el dibujo que parece una foto; los hermanos dejan la caja en el parque y, desde la ventana, ven a dos niños conocidos que se la llevan, con el folleto de instrucciones tirado en el suelo.'],
  'aventura', []),
 ('jm-medalla', None, 11, 12, ['medalla', 'senora'],
  ['A: una sala de premios en 1982: el libro recibe una medalla dorada; cuatro años después, otra medalla, junto a un tren de vapor en la nieve.',
   'A: Van Allsburg abre una carta; una señora embarazada con un signo de interrogación y una cuna; él se encoge de hombros: la palabra con un «?» encima y una hoja de selva.'],
  'epico', []),
 ('jm-historia', '1995', 13, 13, ['alan'],
  ['D y B: un libro fino junto a un rollo de película larguísimo; un reloj de diez minutos y otro de cien; guionistas que añaden hojas; un niño de 1969 ante el tablero (nuestro) y un adulto con barba que sale de él en 1995: el calendario pasa 26 hojas.'],
  'aventura', []),
 ('jm-keene', None, 14, 14, ['keene'],
  ['C: una estrella de cine (EL.williams, sin caracterizar) llega al plató con su guion; una calle de ladrillo de Nueva Inglaterra con su iglesia; pintores en un andamio pintan en la pared un zapato enorme.'],
  'aventura', []),
 ('jm-pelo', None, 15, 15, ['pelo'],
  ['C: el puesto de efectos: en la pantalla, un león de alambre; los técnicos teclean y la melena le crece pelo a pelo (golpe); el último pelo se queda de punta; unos monos de alambre esperan turno.'],
  'asombro', ['pelo']),
 ('jm-estreno', None, 16, 16, ['estreno'],
  ['D: el cine en diciembre de 1995, con nieve: marquesina sin letras, cola en la taquilla; críticos con el pulgar a medias; un niño pequeño se tapa los ojos; el contador de taquilla pasa de 65 a 260; un periódico con una máscara y chispas de «efectos»; Williams, muy serio ante un micrófono, y sobre él un bocadillo con una isla con palmera.'],
  'aventura', []),
 ('jm-espacio', None, 17, 18, ['zathura', 'caja'],
  ['D y B: un televisor con dibujos animados; un juego de mesa de cartón en una tienda; el libro de 2002: los dos niños abren la caja y encuentran otro tablero; la casa flota entre planetas.',
   'D: el cine en 2005, con la sala casi vacía y una taquilla sin cola; la caja del juego se cierra, coge polvo y telarañas; el calendario pasa de 2005 a 2017.'],
  'calma', []),
 ('jm-velas', None, 19, 19, ['letrero'],
  ['C: la pared de Keene: un pintor va a lavar el zapato con una esponja; los vecinos lo paran y él acaba repintándolo con un bote de pintura de la buena; de noche, en 2014, unas velas al pie de la pared; al día siguiente, flores y notas.'],
  'ternura', []),
 ('jm-nuevo', '2017', 20, 21, ['anuncio', 'cartucho'],
  ['D: un anuncio en una pantalla y una multitud con el pulgar hacia abajo; unos guionistas miran un tablero lleno de polvo; un niño de 2017 pasa de largo con su mando.',
   'D y E: de noche, en un salón, el tablero ignorado carraspea, se pliega y se vuelve un cartucho; la consola se enciende; un jugador cae dentro de la selva (nuestra) con otro cuerpo y tres corazones de vida.'],
  'intriga', []),
 ('jm-taquilla', None, 22, 23, ['estrellas', 'suma'],
  ['D y E: el cine en diciembre de 2017: al lado, una cola enorme hacia una marquesina con estrellas; semanas que pasan en el calendario y la cola de Jumanji que no se acaba; el contador llega a 960; en la selva, una cabaña en un árbol con una tabla grabada (rayas).',
   'D: otra marquesina, 2019, y el contador en 800; las tres taquillas se suman en una sola cifra: más de 2.000 millones (golpe); al lado, el libro fino y un reloj de diez minutos.'],
  'epico', ['suma']),
 ('jm-open', '2026', 24, 25, ['open', 'vuelta'],
  ['D: un calendario de diciembre de 2026 con adornos de Navidad; una consola vieja de la que salen lianas por la ventana hacia una calle nevada.',
   'F y A: una línea con dos objetos (el tablero de cartón y el cartucho en su consola vieja) que da la vuelta y vuelve al principio: la mesa de dibujo del escultor de noche; una calle tranquila, con selva a este lado.'],
  'aventura', []),
 ('jm-porque', None, 26, 27, ['choque', 'reglas'],
  ['B: un salón tranquilo (reloj, sillón, lámpara) y un rinoceronte (el nuestro) en la misma imagen; unos ojos de espectador que van de uno a otro sin poder parar.',
   'B y F: el tablero con sus reglas como iconos tachados: salir a medias, hacer trampas, llamar por teléfono; un camino de casillas que solo se cierra llegando al final.'],
  'curiosidad', []),
 ('jm-cierre', None, 28, 28, ['instrucciones'],
  ['A y F: Van Allsburg, ya mayor, dibuja y esconde al perro blanco en una esquina; Atom, con el estudio lleno de lianas, abre por fin las instrucciones: un rollo que no se acaba.'],
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
assert escenas[-1]['frase_fin'] == 28
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
