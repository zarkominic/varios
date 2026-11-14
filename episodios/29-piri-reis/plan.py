"""Reparto del episodio 29 (El mapa de Piri Reis: la Antártida que no era y el Colón que sí) en escenas (escribe
escenas.json). Una fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase],
ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Cinco decorados (guion.md): A Estambul 1929, B el mar 1501–1511, C Galípoli 1513–1517, D Estados Unidos 1958–1968,
  E hoy.
- El mapa se dibuja a nuestra manera, en pixel (pergamino, costas a tinta, rosas de los vientos, barquitos, el pez de
  san Brandán), nunca calcado. Personas reales por sus atributos; nada de reírse de quien cree en el mito.
  Hilo de gags: el mapa de Atom que se enrolla solo.
- Los golpes son NOMBRES DE MARCAS de la misma escena.
- BANDA: Re dórico, 100 por minuto, motivo marinero propio.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 're', 'modo': 'dorico', 'tempo': 100, 'motivo': [0, 2, 3, 7, 9, 7, 3, 2]}
E = [
 ('pr-gancho', None, 1, 2, ['antartida', 'camino'],
  ['E y C: el pergamino de 1513 sobre una mesa a la luz de una lámpara; abajo, la costa se tuerce y una lupa la recorre; corte a un globo con la Antártida blanca; signos de interrogación; un platillo volante de juguete colgado de un hilo en una estantería; dentro del pergamino se ilumina el trazo del Caribe, y una carabela de tinta navega por él.',
   'B, A y D: una galera otomana en el mar, un marinero prisionero con un rollo de cartas, el pergamino doblado en una biblioteca de palacio, un profesor con gafas ante un mapa; en el estudio de Atom, Atom desenrolla un mapa y se le vuelve a enrollar solo (gag 1).'],
  'misterio', ['antartida']),
 ('pr-hola', None, 3, 3, ['hola'],
  ['E: Atom saluda en su estudio, con el mapa enrollado bajo el brazo y un globo terráqueo en la mesa.'],
  'curiosidad', []),
 ('pr-palacio', '1929', 4, 4, ['palacio'],
  ['A (Estambul, otoño de 1929): el palacio de Topkapı con sus cúpulas y chimeneas sobre el Bósforo; dentro, la biblioteca con estanterías, cofres y celosías; el director de los museos (traje, bigote blanco, sombrero de ala: en 1929 el fez ya estaba prohibido) y el estudioso alemán (gafas, traje de tres piezas) apartan libros polvorientos y encuentran un pergamino doblado.'],
  'misterio', []),
 ('pr-firma', None, 5, 5, ['firma'],
  ['A: despliegan el pergamino sobre una mesa larga y se sigue desplegando hasta el suelo (gag 2); costas, islas y barquitos pintados en varios colores; un experto con lupa (barba, gafas redondas) estudia la firma y la fecha.'],
  'misterio', []),
 ('pr-colon', None, 6, 6, ['colon'],
  ['A: la lupa se para sobre una nota y el experto se queda de piedra; una carabela de tinta y un rótulo sin letras con un barquito; corte a periódicos de 1929 que salen de la imprenta y pasan de mano en mano en varias ciudades.'],
  'misterio', []),
 ('pr-galipoli', None, 7, 7, ['galipoli'],
  ['C y B: el puerto de Galípoli junto al estrecho, con galeras y gaviotas; un niño (Piri) sube a bordo detrás de su tío Kemal Reis (barba negra, turbante, caftán rojo); en el mar, el tío le enseña las estrellas y una costa en el horizonte.'],
  'aventura', []),
 ('pr-captura', '1501', 8, 8, ['captura'],
  ['B (frente a la costa de España, 1501): la galera otomana alcanza unas naves españolas; en cubierta, un marinero prisionero (camisa de lino, barba rubia) enseña un rollo de cartas de navegación; una ráfaga se las lleva y Kemal Reis atrapa una al vuelo (gag 3).'],
  'aventura', []),
 ('pr-taller', None, 9, 9, ['taller'],
  ['C (el taller de Piri Reis en Galípoli, 1513): Piri, ya adulto (barba, turbante blanco, caftán azul), (ya capitán) rodeado de cartas desplegadas, tinteros, compases y una ventana al puerto; dibuja sobre la piel de gacela rosas de los vientos y barquitos.'],
  'aventura', []),
 ('pr-sultan', None, 10, 10, ['sultan'],
  ['C (el salón del sultán en Egipto, 1517): Piri hace una reverencia y entrega el mapa enrollado; el sultán (turbante alto, barba, caftán dorado) lo mira; luego el rollo entra en un cofre de la biblioteca, que se cubre de polvo y telarañas con el paso de los siglos; dos tercios del pergamino se borran y queda el oeste.'],
  'aventura', []),
 ('pr-fuentes', None, 11, 11, ['fuentes'],
  ['C: sobre la mesa de Piri, unas veinte cartas forman un rompecabezas: unas viejas y amarillas con un mundo redondo, una árabe con el océano Índico, cuatro con las costas de África y una con islas del Caribe; las piezas vuelan y encajan en el gran pergamino.'],
  'asombro', []),
 ('pr-caribe', None, 12, 12, ['caribe'],
  ['C y E: en el mapa, la isla de La Española de pie, de norte a sur; a su lado, la silueta de Japón en un mapa antiguo que se superpone; Colón (pelo canoso, capa) en la cubierta mira el horizonte convencido; un globo que gira hacia Asia.'],
  'asombro', []),
 ('pr-brasil', None, 13, 13, ['brasil'],
  ['B y C: una flota portuguesa con cruces rojas en las velas se desvía y ve una costa verde con palmeras; los barcos bajan por la costa hacia el sur; un piloto dibuja la costa en una carta, que llega a la mesa de Piri.'],
  'asombro', []),
 ('pr-brandan', None, 14, 14, ['brandan'],
  ['C: los dibujos del mapa cobran vida: loros que vuelan, barquitos con las velas desplegadas; dos monjes encienden un fuego sobre el lomo de un pez gigante, que se despierta y se sumerge (gag 4).'],
  'asombro', []),
 ('pr-hapgood', None, 15, 15, ['hapgood'],
  ['D (un aula de un college de New Hampshire en los años cincuenta): Hapgood (gafas, pelo blanco, chaqueta de tweed) reparte copias del mapa; los alumnos comparan con mapas modernos y papel de calco; el calco se desliza y la costa «encaja» con cualquier cosa (gag 5); abajo, la costa que se tuerce.'],
  'intriga', []),
 ('pr-carta', '1960', 16, 16, ['carta'],
  ['D: una base aérea con aviones de reconocimiento; un oficial (uniforme, gorra) escribe a máquina una carta; la carta llega al buzón del profesor; Hapgood la lee entusiasmado y la pone junto al mapa y a un perfil de la Antártida bajo el hielo.'],
  'intriga', []),
 ('pr-libro', None, 17, 17, ['libro'],
  ['D: una imprenta saca un libro con unas carabelas y un mapa en la portada (sin letras); en una librería, la gente lo hojea; una vitrina con un libro más antiguo y un retrato de un científico de pelo blanco despeinado (de espaldas, sin rasgos).'],
  'intriga', []),
 ('pr-daniken', None, 18, 18, ['daniken'],
  ['D y E: un escritor con gafas firma libros en una librería de 1968; una nave dibujada en la portada; en una tele de los setenta, un documental con el mapa y luces en el cielo; en una pantalla de hoy, vídeos con flechas rojas y círculos.'],
  'intriga', []),
 ('pr-hielo', '1820', 19, 19, ['hielo'],
  ['E: Hapgood junto a un globo cuya corteza resbala como la piel de una naranja; la Antártida bajo kilómetros de hielo y un cilindro de hielo sacado de un sondeo con sus capas como anillos; un barco de vela de 1820 entre témpanos avista la costa blanca; un avión con radar sobrevuela el hielo y en la pantalla aparece el perfil de la roca de debajo.'],
  'curiosidad', []),
 ('pr-drake', None, 20, 20, ['drake'],
  ['E: un globo con Sudamérica y la Antártida separados por un mar ancho y bravo (el paso de Drake); al lado, el mapa de 1513 donde la costa sigue sin mar en medio; un historiador (gafas, chaleco) compara los dos con una regla.'],
  'curiosidad', []),
 ('pr-pergamino', None, 21, 21, ['pergamino'],
  ['C: Piri Reis traza la costa de Sudamérica hacia el sur, llega al borde del pergamino y la tuerce hacia un lado (gag 6); en otro mapa de la época, una gran tierra austral imaginaria al sur del mundo.'],
  'curiosidad', ['pergamino']),
 ('pr-cerebro', None, 22, 22, ['cerebro'],
  ['E (el estudio de Atom): Atom mira por la ventana nubes que parecen formas (un barco, un pez); un enchufe en la pared; la costa torcida del mapa y, encima, la silueta de la Antártida que el cerebro «completa» con una línea de puntos.'],
  'calma', []),
 ('pr-pareidolia', None, 23, 23, ['pareidolia'],
  ['E: Atom ve un continente en una mancha de café sobre su mapa (gag 7); en una pizarra, una civilización perdida dibujada con castillos y barcos frente a un cartógrafo con el pergamino corto; Atom borra la civilización.'],
  'calma', []),
 ('pr-foto', None, 24, 24, ['foto'],
  ['C: Piri Reis en su taller con mapas de cuatro estilos distintos sobre la mesa (árabe, griego, portugués y español); por la ventana, barcos de varias banderas en el puerto; el mapa terminado a la luz de la tarde.'],
  'calma', []),
 ('pr-leccion', None, 25, 25, ['leccion'],
  ['E (la sala del museo de Topkapı, hoy): una vitrina en penumbra con el pergamino; un conservador con guantes blancos lo coloca con cuidado; visitantes que miran; un repaso: un barco pasa a otro barco, un prisionero entrega un rollo a un almirante.'],
  'cierre', []),
 ('pr-cierre', None, 26, 26, ['cierre'],
  ['E (el estudio de Atom): Atom desenrolla el mapa con muchísimo cuidado… y se enrolla otra vez, con él agarrado (gag 8).'],
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
assert escenas[-1]['frase_fin'] == 26
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
