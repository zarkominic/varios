"""Reparto del episodio 33 (Dune: el libro que nadie quería publicar) en escenas (escribe escenas.json). Una fila por
escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Seis decorados (guion.md): A Florence, Oregón (las dunas de 1957 y las de hoy), B la casa de Herbert (cuarto de
  trabajo, buzón, redacción), C el planeta de arena (NUESTRO: dos lunas, dunas, una silueta lejana), D las editoriales
  (pasillo de puertas, Chilton con sus manuales, imprenta, sala de premios), E el cine (estudio de París, plató de 1984,
  cine con marquesina sin letras, sala de subastas) y F hoy (el estudio de Atom, un campus de 1970).
- DERECHOS: nada de imágenes de las películas (actores, vestuario, naves, el diseño de sus gusanos) ni de las portadas
  del libro. Las películas, con marquesinas, taquillas y butacas. Sin letras: números, rayas e iconos.
  Hilo de gags: el reloj de arena, el montón de arena y la plantita de Atom.
- Los golpes son NOMBRES DE MARCAS de la misma escena.
- BANDA: Re dórico, 88 por minuto, motivo de desierto y de caravana.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 're', 'modo': 'dorico', 'tempo': 88, 'motivo': [0, 7, 5, 7, 10, 9, 7, 2]}
E = [
 ('du-gancho', None, 1, 2, ['rechazos', 'camino'],
  ['D y A: un libro con una duna en la tapa rebota contra veinte puertas que se cierran (golpe); una estantería de manuales con una llave inglesa en el lomo y, entre ellos, el libro; una hoja de reportaje sobre arena que el viento se lleva.',
   'A, D y E: un escritor en una avioneta sobre dunas; un editor que pone el libro en la estantería; un director ante un trono con un pintor de bigotes largos; otro director que se tapa la cara en una butaca; en el estudio, Atom gira su reloj de arena y la arena se sale (gag 1).'],
  'misterio', ['rechazos']),
 ('du-hola', None, 3, 3, ['hola'],
  ['F: Atom saluda en su estudio, con el reloj de arena y un montoncito de arena en la mesa.'],
  'curiosidad', []),
 ('du-florence', '1957', 4, 5, ['herbert', 'dunas'],
  ['B y A (1957): Herbert (barba, 36 años) ante su máquina de escribir con facturas en la mesa; un mapa de la costa de Oregón con un pueblo junto a un río.',
   'A: dunas enormes que avanzan con el viento sobre una carretera, unos pinos y una casa; hileras de hierba de playa plantada; Herbert en una avioneta mira hacia abajo y hace fotos.'],
  'aventura', []),
 ('du-carta', None, 6, 6, ['carta'],
  ['A y B: Herbert vuelve, vacía un zapato y sale un chorro de arena que no se acaba (gag 2); escribe una carta: en un globo de idea, una duna se traga una ciudad de juguete; el reportaje va a un cajón; notas que desbordan la mesa.'],
  'aventura', []),
 ('du-pregunta', None, 7, 8, ['leer', 'lawrence'],
  ['B: Herbert entre libros sobre desiertos, plantas y templos; un globo terráqueo que se vuelve todo arena; C: el planeta de arena aparece bajo dos lunas.',
   'B y C: una foto antigua de un oficial con turbante en camello (Lawrence, de lejos); un libro de montañas nevadas cuyas palabras (rayas) vuelan y caen sobre las dunas.'],
  'asombro', []),
 ('du-planeta', None, 9, 9, ['seis'],
  ['B y C: un calendario pasa seis años; Beverly escribe anuncios en su mesa mientras la torre de notas de Herbert crece más alta que él y se tambalea (gag 3); C: el planeta, un muchacho pequeño en una duna, una silueta enorme bajo la arena y un brillo anaranjado.'],
  'asombro', []),
 ('du-revista', None, 10, 10, ['revista'],
  ['D (1963): un quiosco con una revista de ciencia ficción (sin letras: un planeta en la portada); lectores que la leen en el autobús y en el sofá; una segunda entrega en 1965.'],
  'curiosidad', []),
 ('du-rechazos', None, 11, 12, ['no', 'error'],
  ['D: un manuscrito gordísimo que no cabe en el buzón; un pasillo de puertas de editoriales; el manuscrito sale y vuelve como un bumerán (gag 4); un contador que sube hasta 20; un editor con el libro abierto, confundido.',
   'D: otro editor, más prudente, escribe una carta de rechazo y se queda mirando el sobre, dudando; un calendario de diez años detrás.'],
  'intriga', []),
 ('du-chilton', '1965', 13, 14, ['chilton', 'sale'],
  ['D (Filadelfia): suena el teléfono del agente y la noticia llega a Herbert; la editorial con estanterías de manuales de coches (llave inglesa en el lomo); Lanier con la revista en la mano; un cheque con 7500; un manual con una máquina de alas (gag 5) (golpe).',
   'D: la imprenta; el libro con su precio 5.95; una pila pequeña en una librería que casi no baja; Lanier recoge su mesa en una caja.'],
  'curiosidad', ['chilton']),
 ('du-premios', None, 15, 15, ['premios'],
  ['D (1966): una sala de premios; dos trofeos (un bloque transparente con una nebulosa y un cohete plateado) en manos de Herbert; aplausos.'],
  'epico', []),
 ('du-lectores', None, 16, 17, ['lectores', 'veinte'],
  ['F (1968–1970): un campus con una mesa de libros; un catálogo grande con herramientas dibujadas; estudiantes que se pasan el libro; un globo terráqueo con una hoja verde.',
   'B (1972): Herbert cuelga la credencial del periódico y se sienta a escribir; cinco libros más que se apilan; un contador de ejemplares que sube.'],
  'calma', []),
 ('du-jodo', '1974', 18, 19, ['derechos', 'dali'],
  ['E (1972–1974): un contrato en una mesa de Hollywood que acaba en una oficina de París; Jodorowsky (pelo blanco alborotado, chaqueta) con los brazos abiertos ante una pared vacía.',
   'E: Dalí (bigotes largos) en un trono; a su lado, un reloj con taxímetro que corre mientras el productor suda (gag 6); fotos de un actor enorme con capa y de un cantante de rock; un disco con un prisma.'],
  'aventura', []),
 ('du-dibujos', None, 20, 21, ['dibujos', 'libro'],
  ['E: el estudio de París con cientos de dibujos colgados (nuestros: naves de colores, castillos raros); Moebius y Giger dibujando; el guion cae en la mesa como una guía de teléfonos y lo hace saltar todo (gag 7).',
   'E: la hucha vacía; puertas de estudios que se cierran; una cámara tapada con una sábana; el libro enorme de dibujos en una sala de subastas, 2021, con el mazo y una cifra que sube.'],
  'aventura', []),
 ('du-alien', None, 22, 22, ['alien'],
  ['E (1979): los mismos dibujantes ante otra mesa; la sombra de una nave oscura y un huevo (de lejos, nuestro); una estela que sale del libro de dibujos hacia una fila de pantallas de cine.'],
  'asombro', []),
 ('du-scott', None, 23, 23, ['scott'],
  ['E (1976–1981): el contrato llega a un productor italiano con puro; un director con gorra hace las maletas hacia una ciudad de lluvia y neones; un director joven de pelo alto recibe el encargo.'],
  'suspense', []),
 ('du-lynch', '1984', 24, 24, ['lynch'],
  ['E (1984): un plató enorme con decorados de cartón piedra; un cine con marquesina (sin letras) y butacas medio vacías; una balanza: 40 a un lado, 31 al otro; Lynch se tapa la cara; Herbert, en su butaca, sonríe.'],
  'suspense', []),
 ('du-adios', None, 25, 25, ['adios'],
  ['B (1986): el cuarto de trabajo de Herbert al atardecer, la máquina de escribir tapada, sus seis libros en la balda (con respeto); una claqueta con una telaraña.'],
  'ternura', []),
 ('du-villeneuve', '2021', 26, 27, ['villeneuve', 'desierto'],
  ['E: un adolescente leyendo el libro en su cama en 1980 y, corte, el mismo de adulto (Villeneuve: pelo gris, barba corta) con una claqueta; el libro que se parte en dos mitades.',
   'A y C: un equipo de rodaje con cámaras y sombrillas entre rocas rojas y dunas de verdad; un mapa con Jordania y Abu Dabi marcados.'],
  'epico', []),
 ('du-taquilla', None, 28, 29, ['taquilla', 'tres'],
  ['E: el cine lleno, colas en la taquilla; un contador que pasa de 400 y luego de 700; seis estatuillas doradas (golpe).',
   'E (2026): un calendario con el 18 de diciembre rodeado; tres carteles (sin letras: una, dos y tres lunas); una avioneta pequeña cruza el fondo.'],
  'epico', ['taquilla']),
 ('du-dunas', None, 30, 31, ['hoy', 'sistema'],
  ['A (hoy): las mismas dunas de Florence, ahora verdes de hierba; una señal con una planta tachada (icono); cuadrillas con una excavadora y voluntarios con palas quitan la hierba; la arena vuelve a moverse.',
   'A y C: una duna en corte con sus piezas (viento, arena, hierba, agua, animales) unidas por flechas; se quita una pieza y todas cambian; el planeta de arena al lado, igual.'],
  'calma', []),
 ('du-cierre', None, 32, 32, ['cierre'],
  ['F (el estudio de Atom): Atom planta una brizna de hierba en su montón de arena… y la hierba se queda con toda la mesa (gag 8); el libro, del tamaño de un planeta, en la ventana.'],
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
assert escenas[-1]['frase_fin'] == 32
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
