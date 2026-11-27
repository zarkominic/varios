"""Reparto del episodio 31 (GTA: el juego de Escocia que casi se cancela) en escenas (escribe
escenas.json). Una fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase],
ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Cinco decorados (guion.md): A Dundee 1987–1997 (la ciudad y la oficina de DMA), B Londres 1997 (la cámara de los
  Lores, la redacción, el quiosco), C Nueva York 1998–2013 (el loft de Rockstar, la tienda a medianoche, los tribunales),
  D la ciudad de juguete (vista desde arriba en 1997 y en 3D en 2001: INVENTADA, a nuestra manera) y E hoy.
- DERECHOS: nada del juego real (ni logo, ni portadas, ni personajes, ni interfaz, ni capturas, ni el estilo de sus
  portadas); los bichitos de Lemmings, a nuestra manera (no su diseño). La violencia del juego no se enseña.
  Hilo de gags: el coche de policía de juguete de Atom.
- Los golpes son NOMBRES DE MARCAS de la misma escena.
- BANDA: Mi mixolidio, 112 por minuto, motivo de calle y bajo eléctrico.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'mi', 'modo': 'mixolidio', 'tempo': 112, 'motivo': [0, 7, 10, 12, 10, 7, 5, 4]}
E = [
 ('gt-gancho', None, 1, 2, ['billete', 'camino'],
  ['E y D: una caja registradora que escupe billetes y una cifra que sube hasta 1.000.000.000 (golpe); corte a Dundee bajo la lluvia, un bichito verde de juguete en un escritorio; una papelera con un proyecto arrugado casi cancelado.',
   'A, B y C: chavales ante monitores de tubo en un polígono; un relaciones públicas con teléfono y puro; dos hermanos con chaqueta de cuero en Nueva York; una persecución de coches de juguete vista desde arriba; en el estudio, Atom pone en marcha un coche de policía de juguete que lo persigue por la mesa (gag 1).'],
  'intriga', ['billete']),
 ('gt-hola', None, 3, 3, ['hola'],
  ['E: Atom saluda en su estudio, con el coche de policía de juguete dando vueltas en la mesa.'],
  'curiosidad', []),
 ('gt-dundee', None, 4, 5, ['dundee', 'bichitos'],
  ['A (Dundee, finales de los ochenta): la ciudad gris junto al río Tay con su puente largo y la lluvia; un joven (Jones: pelo corto, jersey) monta ordenadores en una habitación.',
   'A (1991): la oficina de DMA con monitores de tubo; en una pantalla, bichitos de pelo verde que caminan hacia un precipicio y uno abre un paraguas; gente que se ríe ante la pantalla; un bichito de juguete en el escritorio se tira por el borde con paraguas (gag 2).'],
  'ternura', []),
 ('gt-dailly', None, 6, 7, ['dailly', 'estatuas'],
  ['A: un joven programador (Dailly: gafas, camiseta) dibuja un bichito píxel a píxel en una rejilla y se ríe; por la ventana, la calle de Dundee y el letrero (sin letras: un pez) de la antigua tienda de pescado frito de abajo.',
   'A (hoy): las estatuas de bronce de los bichitos trepando por una columna de piedra en un parque de Dundee, con niños que las miran; un camino que se bifurca hacia algo oscuro.'],
  'ternura', []),
 ('gt-diseno', '1995', 8, 9, ['diseno', 'boton'],
  ['A y D (1995): un documento de diseño en una mesa; la ciudad de juguete vista desde arriba con calles llenas de coches y gente; un muñequito sale de su coche y se sube a otro.',
   'D: un botón rojo gigante; lo pulsan y el muñequito cambia de coche (gag 3); un policía de juguete bosteza en su coche; los que lo prueban prefieren escapar.'],
  'curiosidad', []),
 ('gt-nombre', None, 10, 10, ['nombre'],
  ['C: un juzgado de Estados Unidos con un expediente (sin letras: un coche y una flecha); un mazo; en el estudio de DMA, los creadores se miran con media sonrisa.'],
  'curiosidad', []),
 ('gt-fallo', None, 11, 12, ['fallo', 'cancelar'],
  ['D: en el prototipo, los coches de policía de juguete se vuelven locos y persiguen al jugador, y hasta al camión de los helados (gag 4) (golpe); un programador (Penn: barba, gorra) se queda boquiabierto.',
   'A: una sala de reuniones con la editorial; un hombre de traje (BMG) señala una papelera; por teléfono, la oficina de Londres lo defiende y el proyecto vuelve a la mesa.'],
  'curiosidad', ['fallo']),
 ('gt-clifford', None, 13, 13, ['clifford'],
  ['B (Londres, 1997): un despacho con teléfonos; un relaciones públicas (Clifford: pelo canoso, traje) dibuja en una pizarra flechas hacia iconos de políticos y de periódicos.'],
  'intriga', []),
 ('gt-lores', '1997', 14, 15, ['lores', 'periodicos'],
  ['B (20 de mayo de 1997): una cámara parlamentaria con bancos rojos y lores con peluca y toga; uno se levanta y pregunta; un ministro responde.',
   'B: una redacción de periódico sensacionalista; titulares enormes (sin letras: un coche y un rayo); en el quiosco, los periódicos humean (gag 5).'],
  'intriga', []),
 ('gt-ventas', None, 16, 16, ['ventas'],
  ['B y D (finales de 1997): una tienda con cajas del juego (sin portada real: una caja con un coche) y un 18; un lord mira por encima del hombro de su hijo de doce años que juega a la demo (gag 6); colas de Navidad.'],
  'aventura', []),
 ('gt-houser', '1998', 17, 18, ['takeTwo', 'rockstar'],
  ['C (Nueva York, 1998): rascacielos; un apretón de manos en un despacho; dos hermanos ingleses (Sam y Dan Houser: chaqueta de cuero, gafas de sol) con discos y carteles de cine.',
   'C: un loft con ladrillo visto, guitarras en la pared y una estrella en la puerta (sin letras); el equipo celebra.'],
  'aventura', []),
 ('gt-north', None, 19, 19, ['north'],
  ['A y C: un avión entre Nueva York y Escocia; Edimburgo con su castillo; la oficina nueva con muchos más monitores; planos de una ciudad enorme en la pared.'],
  'aventura', []),
 ('gt-tresde', None, 20, 20, ['tresde'],
  ['D: la ciudad de juguete se levanta de golpe del mapa plano a tres dimensiones: calles, puentes, una radio que suena en un coche, gente que charla en la acera.'],
  'epico', []),
 ('gt-retraso', '2001', 21, 22, ['retraso', 'vice'],
  ['C (septiembre de 2001): el skyline de Nueva York de noche, con respeto (sin el atentado: las luces del homenaje); en la oficina, un calendario con una flecha que avanza semanas; una portada se borra y se rehace.',
   'D: la ciudad soleada de los ochenta con palmeras y luces de neón (2002) y luego una con tres ciudades (2004); colas en una tienda.'],
  'epico', []),
 ('gt-escondido', None, 23, 24, ['escondido', 'coffee'],
  ['E (2005): un disco brillante y, dentro, una caja cerrada con un candado y unos signos «18+»; unos aficionados con lupa.',
   'C: una tienda que retira cajas de una estantería; un sello de calificación (sin letras: «AO» como icono); un despacho con abogados y una carpeta.'],
  'suspense', []),
 ('gt-thompson', None, 25, 25, ['thompson'],
  ['C: un abogado (Thompson: traje, corbata) en un plató de tele y en un juzgado; en 2008, un tribunal de Florida con palmeras por la ventana; un mazo; las cajas de juegos siguen saliendo de la fábrica.'],
  'suspense', []),
 ('gt-cuatro', None, 26, 26, ['cuatro'],
  ['C (2008): una tienda a medianoche con una cola larguísima en la calle; un trofeo de récord (sin letras).'],
  'epico', []),
 ('gt-cinco', '2013', 27, 28, ['cinco', 'copias'],
  ['C (17 de septiembre de 2013): cajas que vuelan de las estanterías; una caja registradora que echa humo de tanto contar (gag 7); la cifra de mil millones (golpe).',
   'E: una montaña de cajas que crece hasta las nubes; una gráfica que sube.'],
  'epico', ['cinco']),
 ('gt-filtracion', None, 29, 29, ['filtracion'],
  ['E: un ordenador con una alarma y una carpeta que se escapa volando (2022); en diciembre de 2023, un contador de visitas que gira sin parar hasta noventa millones.'],
  'epico', []),
 ('gt-semana', None, 30, 30, ['semana'],
  ['E: repaso: un bichito, un botón rojo, un coche de policía loco, un periódico humeante; un calendario con el 19 de noviembre de 2026 marcado y una tienda que espera con las persianas medio bajadas.'],
  'cierre', []),
 ('gt-cierre', None, 31, 31, ['cierre'],
  ['E (el estudio de Atom): Atom se sube al coche de juguete… y ahora es él quien persigue al coche de policía (gag 8).'],
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
assert escenas[-1]['frase_fin'] == 31
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
