"""Reparto del episodio 20 (Los Juegos del Hambre: lo que hay que saber antes de Amanecer en la cosecha) en escenas
(escribe escenas.json). Una fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por
frase], ánimo, golpes).
- Estilo canónico pixel chibi y estándar mínimo (ESTANDAR.md): planos de 4–7 s con acción, detalle y gags; cada frase
  lleva uno o dos planos. Ningún encuadre se repite dentro de una escena y cada encuadre tiene dos cámaras.
- Cinco decorados (guion.md): A el Distrito 12, B el Capitolio, C la arena desde fuera (sala de control), D lo real,
  E hoy (cine y cuarto de fan).
- Los personajes se reconocen por sus atributos (ELENCO_JH), dibujados por nosotros, sin logos ni clips. Sin destripes
  del libro nuevo: solo la premisa, el reparto, el tráiler y lo que ya contaba la trilogía. **Sin muertes en pantalla:**
  los Juegos se ven desde fuera (maquetas, pantallas, el contador de tributos, cañones de luz que se apagan sin cuerpos).
  Hilo de gags: un pan con ojos que tiembla cada vez que oye «cosecha».
- La barra de tiempo va en Juegos, no en años (los libros no dan años): 10, 50, 74–75.
- BANDA: la del episodio (aprobada con el guion): Mi dórico, 92 por minuto, silbido propio de cuatro notas que sube y vuelve.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'mi', 'modo': 'dorico', 'tempo': 92, 'motivo': [0, 3, 5, 7, 5, 3, 2, 0]}
E = [
 # ── 0 · El gancho ──
 ('jh-gancho', None, 1, 2, ['antes', 'haymitch'],
  ['A: la plaza del Distrito 12 al amanecer, con el escenario de la cosecha y la pantalla del Capitolio; un chico de pelo oscuro (Haymitch joven) planta cara; en «beat the Capitol» la pantalla gigante chisporrotea y se apaga; en «made him pay» la sombra de una rosa blanca cae sobre él.',
   'E: el cine; Atom y el pan con ojos en sus butacas; en la pantalla, un sinsajo dorado y la silueta de Haymitch adulto con una petaca; en «November 20» un calendario con 11·20 dorado.'],
  'epico', ['capitolio']),
 ('jh-peligro', None, 3, 4, ['peligro', 'preguntas'],
  ['C: la sala de control de los Vigilantes; la maqueta de la arena se llena de 48 lucecitas, el doble que de costumbre; un vigilante cuenta con los dedos y se le acaban; un reloj de película marca 2:38.',
   'E (cuarto de fan): un tablero de corcho con hilo rojo: un broche, un apellido, una flecha y tres interrogaciones que se encienden una a una.'],
  'curiosidad', []),
 ('jh-hola', None, 5, 5, ['hola'],
  ['E (cine, otra cámara): Atom saluda; el pan con ojos se esconde tras la butaca al oír «Games».'],
  'curiosidad', []),
 # ── 1 · Lo que tienes que recordar ──
 ('jh-panem', '74', 6, 7, ['panem', 'castigo'],
  ['B y A: un mapa de Panem: el Capitolio de colores en las montañas y los doce distritos grises alrededor; trenes de mercancías que suben hacia la capital cargados de carbón, trigo y peces.',
   'A: la plaza del Distrito 12 el día de la cosecha; una urna de cristal con papeletas; los chicos en fila por edades; el pan con ojos se esconde dentro de la urna (gag 2).'],
  'aventura', []),
 ('jh-katniss', None, 8, 9, ['concurso', 'voluntaria'],
  ['B: el plató del Capitolio; una pantalla enorme con 24 retratos en cuadritos; público con pelucas aplaude; un cartel de audiencia sube.',
   'A: Katniss (trenza, chaqueta) da un paso al frente y levanta la mano; detrás, su hermana pequeña; Peeta a su lado; los dos levantan las manos juntas en el carro de fuego.'],
  'aventura', []),
 ('jh-mentor', None, 10, 11, ['mentor', 'aldea'],
  ['A (el tren): Haymitch adulto, despeinado, con una petaca, cae del sofá del vagón; luego se incorpora con una mirada lista.',
   'A (la Aldea de los Vencedores): casas grandes y vacías; Haymitch sale a buscar el periódico con gansos alrededor; un calendario del Capitolio que se repite.'],
  'aventura', []),
 ('jh-despues', None, 12, 12, ['llamas'],
  ['B: tres cuadros en la pared de un museo del Capitolio: una arena con un reloj, un sinsajo en llamas y el palacio de Snow con las ventanas apagadas.'],
  'aventura', []),
 # ── 2 · El orden de la historia ──
 ('jh-balada', '10', 13, 14, ['orden', 'balada'],
  ['E (cuarto de fan): cinco libros en una estantería que el pan con ojos reordena; una línea de tiempo con las marcas 10, 50, 74, 75.',
   'A (otra luz, antigua): un escenario de madera viejo; una chica con un vestido de colores canta con una guitarra; un joven rubio y elegante (Snow joven) la mira desde las gradas.'],
  'curiosidad', []),
 ('jh-cincuenta', '50', 15, 17, ['cincuenta', 'katniss', 'medio'],
  ['A: la misma plaza, ya con la urna de cristal; un chico de pelo oscuro y una chica rubia se miran; el contador «50» en la pantalla.',
   'E (cine): la línea de tiempo se ilumina hasta el 74; en la pantalla, la trenza y el broche de Katniss.',
   'C: la línea de tiempo en la pared de la sala de control: Snow a la izquierda, Katniss a la derecha y Haymitch en medio, con una lupa que se posa sobre él.'],
  'curiosidad', []),
 # ── 3 · Los Juegos de Haymitch ──
 ('jh-vasallaje', None, 18, 19, ['vasallaje', 'doble'],
  ['B: el despacho de Snow; un cofre con tarjetas sobre las que pone «25», «50», «75»; Snow abre la del 50 con guantes blancos.',
   'C: la maqueta de la arena se llena: 48 lucecitas en lugar de 24; los vigilantes se miran; el contador marca 48.'],
  'intriga', []),
 ('jh-cosecha', None, 20, 21, ['cosecha', 'cuatro'],
  ['A (el amanecer): Haymitch se despide en la puerta de su casa de una chica de pelo oscuro con plumas de colores (Lenore Dove) y de su madre y su hermano; un agente de la paz le hace señas.',
   'A (la plaza): la urna del 12 se desborda de papeletas (gag 2); suben al escenario cuatro chicos: dos chicos y dos chicas; el pan con ojos sale nadando entre papeletas.'],
  'intriga', []),
 ('jh-grabacion', None, 22, 23, ['contaron', 'campo'],
  ['A (casa de los vencedores, de noche): Katniss sentada ante una tele vieja con una cinta; en la pantalla, una arena preciosa de flores.',
   'C: la maqueta de la arena: en el borde, una pared invisible que brilla al recibir un golpe y devuelve una piedra que rebota; un vigilante se queda boquiabierto.'],
  'intriga', ['campo']),
 ('jh-arma', None, 24, 26, ['arma', 'ojo', 'bebe'],
  ['B: el despacho de Snow; Snow aprieta una rosa blanca hasta deshojarla mientras en una pantalla Haymitch gana.',
   'B (otra cámara): un ojo del Capitolio (una cámara) sigue a Haymitch por la plaza del 12; en el plató, el público se ríe de Snow y Snow sonríe sin ganas.',
   'A (el tren): Haymitch adulto sirve una copa; mira por la ventana a Katniss y Peeta; deja la copa sin beber.'],
  'intriga', []),
 # ── 4 · Quién es quién ──
 ('jh-reparto', None, 27, 28, ['zada', 'grace'],
  ['B (el plató de presentación): un foco ilumina a Haymitch joven (pelo oscuro, camisa remangada) y, a su lado, a Lenore Dove (plumas de colores en el pelo, collar); en la pantalla de fondo, sus siluetas.',
   'B: Maysilee Donner (rubia, coletas, vestido del pueblo) cruzada de brazos al otro lado; entre los dos, un hueco; un pájaro rosa de caramelo pasa volando.'],
  'epico', []),
 ('jh-capitolio', None, 29, 30, ['snow', 'plutarch'],
  ['B (el invernadero): Snow (pelo blanco, traje, rosa blanca) entre rosales; el pan estornuda (gag 4); Plutarch, con traje oscuro, toma notas; Effie joven se coloca la peluca rosa y un pájaro anida en ella (gag 3).',
   'C: Plutarch en la sala de control; gira un dial y en una pantalla aparece, por un instante, un sinsajo; lo tapa enseguida con la mano.'],
  'epico', []),
 ('jh-plato', None, 31, 32, ['caesar', 'ganadores'],
  ['B (el plató de las entrevistas): Caesar (pelo de color, sonrisa enorme, micrófono) entrevista a un tributo; Drusilla, la escolta, con un vestido rígido y un abanico.',
   'B (otra cámara): tres sillas de ganadores: Beetee con gafas y un cable, Wiress con una aguja de tejer y Mags con un anzuelo; un rótulo de «25 años antes» como reloj que gira hacia atrás.'],
  'epico', []),
 ('jh-vuelven', None, 33, 33, ['lawrence'],
  ['E (cine): en la pantalla, tres siluetas que se encienden: la trenza de Katniss, el pan de Peeta y la petaca de Haymitch; el pan con ojos salta en la butaca.'],
  'epico', []),
 # ── 5 · Las pistas ──
 ('jh-broche', None, 34, 35, ['pistas', 'broche'],
  ['E (cuarto de fan): el tablero de corcho; se enciende la primera chincheta: un broche dorado.',
   'A (el Quemador): un puesto de mercado; una vendedora le da el broche a Katniss; corte a un libro abierto con el broche dibujado y un «?» sobre él.'],
  'misterio', []),
 ('jh-madge', None, 36, 37, ['madge', 'simbolo'],
  ['A (la casa del alcalde): Madge (rubia, vestido blanco) le prende el broche a Katniss; en una foto antigua de la pared, Maysilee con el mismo broche.',
   'B: el broche pasa de mano en mano en una cadena de manos desde los Juegos 50 a los 74; el pan intenta cogerlo y un charlajo se lo lleva (gag 5); al final, el sinsajo en una pancarta de la rebelión.'],
  'misterio', ['simbolo']),
 ('jh-cancion', None, 38, 39, ['baird', 'arbol'],
  ['E (cuarto de fan): dos carnés con el apellido «Baird» se colocan uno junto al otro con un hilo rojo.',
   'A (el bosque): un árbol viejo junto a un lago al atardecer; unas notas de música pasan de una guitarra antigua a la voz de una chica con trenza; los sinsajos repiten la melodía.'],
  'misterio', []),
 ('jh-flecha', None, 40, 41, ['enemigo', 'punto'],
  ['A (el tren): Haymitch adulto le dice algo al oído a Katniss; ella asiente seria.',
   'C: la maqueta de la arena con su cúpula; una flecha con un cable vuela hacia el borde brillante; el campo de fuerza se resquebraja como un cristal, en el mismo punto donde 25 años antes rebotó la piedra de Haymitch.'],
  'misterio', ['enemigo']),
 ('jh-reloj', None, 42, 43, ['reloj', 'maquina'],
  ['C: la arena vista desde arriba es un reloj de doce sectores; Wiress señala con su aguja: tic, tac; las manecillas avanzan.',
   'C (otra cámara): la sala de control: Wiress joven con un destornillador; en la pantalla, engranajes; una pieza salta y los engranajes se paran.'],
  'misterio', []),
 # ── 6 · Lo real detrás de Panem ──
 ('jh-canal', None, 44, 45, ['real', 'canal'],
  ['D: una cortina se descorre y deja ver el mundo real: el pan con ojos se quita el disfraz de Panem.',
   'D (el salón): una mujer en un sofá cambia de canal; en la tele alterna un concurso con focos y un desierto con humo y soldados lejanos; el mando se queda sin pilas entre los dos canales (gag 6).'],
  'asombro', []),
 ('jh-minotauro', None, 46, 47, ['teseo', 'pan'],
  ['D (Creta): un laberinto de piedra visto desde arriba; un barco de vela negra llega con chicos y chicas; un joven con espada da un paso al frente.',
   'D (el circo romano): las gradas llenas; un emperador reparte panes desde el palco; el pan con ojos se esconde de la multitud.'],
  'asombro', []),
 ('jh-hume', None, 48, 48, ['hume'],
  ['D (una biblioteca del siglo XVIII): un filósofo con peluca blanca escribe a la luz de una vela; en la ventana, una multitud de figuritas y, en un balcón, tres figuras que las dirigen.'],
  'asombro', []),
 ('jh-sinsonte', None, 49, 49, ['sinsonte'],
  ['D (el bosque): un sinsonte gris en una rama imita una alarma de coche, una rana y, al final, la voz de Atom (gag 7); Atom se gira sorprendido.'],
  'asombro', []),
 ('jh-saludo', None, 50, 50, ['saludo'],
  ['D (una plaza con pancartas sin letras): manos que se levantan con tres dedos; unos agentes con casco miran; más manos se levantan.'],
  'asombro', []),
 ('jh-libros', None, 51, 52, ['libros', 'semana'],
  ['D (una librería): una torre de libros que crece hasta el techo; un contador de reproducciones sube a 109 millones en una pantalla de móvil.',
   'D (otra cámara): una cola de lectores que da la vuelta a la manzana; una caja de libros nuevos se vacía; un gráfico de barras: el libro nuevo, el doble de alto que la Balada.'],
  'asombro', []),
 # ── 7 · Qué ver antes ──
 ('jh-maraton', None, 53, 54, ['tarde', 'otra'],
  ['E (cuarto de fan): Atom y el pan en el sofá con una manta; en la tele, dos portadas sin letras (un sinsajo y una llama); un reloj de pared marca la tarde.',
   'E (otra cámara): ya de noche; la tercera portada (una serpiente y un pájaro); el pan se ha comido la mitad de sí mismo (gag 8).'],
  'calma', []),
 ('jh-lista', None, 55, 56, ['sinsajo', 'libro'],
  ['E (cuarto de fan): la estantería con las cajas de las películas en orden; Atom marca una lista con un lápiz.',
   'E (cine, de día): un libro cerrado con un lazo y una nota «después» sobre una butaca; las luces del cine se encienden.'],
  'calma', []),
 # ── 8 · El cierre ──
 ('jh-cierre', None, 57, 60, ['costo', 'borracho', 'distrito', 'pan'],
  ['A (la plaza, al amanecer): Haymitch joven de espaldas mira el escenario vacío; el broche brilla en el suelo.',
   'A (la Aldea de los Vencedores): Haymitch adulto en su porche con la petaca; da de comer a los gansos y sonríe a medias.',
   'E (cuarto de fan): un mapa de los doce distritos con chinchetas de colores que se van clavando; el pan señala el 12.',
   'E (cine): Atom.'],
  'cierre', []),
]

escenas = []
for id_, cartela, a, b, marcas, vis, animo, golpes in E:
    assert len(marcas) == len(vis) == b - a + 1, id_
    escenas.append({'id': id_, 'estilo': 'pixel', 'cartela': cartela, 'frase_ini': a, 'frase_fin': b,
                    'marcas': marcas, 'guion_visual': vis, 'animo': animo, 'golpes': golpes,
                    'empieza_con': 'cartela ' + cartela if cartela else 'corte desde la escena anterior',
                    'termina_con': '', 'produccion': ''})
assert [e['frase_ini'] for e in escenas][1:] == [e['frase_fin'] + 1 for e in escenas][:-1]
assert escenas[-1]['frase_fin'] == 60
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
