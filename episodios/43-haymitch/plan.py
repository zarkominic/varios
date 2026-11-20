"""Reparto del episodio 43 (Haymitch: por qué el que ganó terminó destrozado) en escenas (escribe escenas.json). Una fila
por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo, golpes).
- Canon nuevo desde el 43: relato hablado, ATOM EN ESCENA (atom-personaje.js: luciérnaga con cara, a escala chibi, al
  doble en las pausas) y 5 PAUSAS «fíjate» (frases 13, 24, 27, 32 y 35: el mundo en gris azulado, Atom a color explica).
- El detalle y el movimiento de siempre (ESTANDAR.md): planos de 4–7 s con acción, decorados con textura y vida.
- Decorados: A el Distrito 12 y C el Capitolio y E la sala de control (de jh-comun.js, el ep20); B el prado del Covey y la
  casa de Haymitch, D la arena de los Juegos 50 y F el estudio de las pausas (nuevos, hm-comun.js).
- CUIDADO: la violencia nunca se ve (las muertes se cuentan, no se enseñan; la arena, por su paisaje y desde la sala de
  control); nada de imágenes ni música de las películas; personajes por sus atributos.
- BANDA: Mi menor, 74 por minuto, motivo melancólico; cada ánimo se escucha con earshot antes de darlo por bueno.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'mi', 'modo': 'menor', 'tempo': 74, 'motivo': [0, 3, 5, 7, 10, 7, 5, 3]}
E = [
 ('hm-gancho', None, 1, 2, ['gano', 'cumple'],
  ['D y A: la arena vacía al amanecer, el borde que brilla; luego la Aldea de los Vencedores con una ventana encendida y una botella en el alféizar; golpe en «took everything».',
   'B y A: Haymitch se despierta en su casa el día de su cumpleaños (una vela en un bollo); fuera, la plaza con la urna enorme; Atom de luciérnaga entra por la ventana.'],
  'misterio', ['gano+3.0']),
 ('hm-aviso', None, 3, 4, ['haymitch', 'aviso'],
  ['A: la Aldea de los Vencedores, veinticuatro años después: el Haymitch adulto (atributos) en el porche con la botella; Atom a escala chibi lo mira.',
   'F: Atom en su estudio levanta un cartel con el icono de «destripes» (un ojo tapado) y señala la puerta: «guárdalo para después».'],
  'misterio', []),
 ('hm-doce', None, 5, 9, ['familia', 'lenore', 'burdock', 'regalos', 'prado'],
  ['B: la casa de tablas: la madre en la cocina, Sid jugando; Haymitch carga cajas de botellas en la destilería de Hattie.',
   'B: el prado del Covey: Lenore Dove canta, las ocas alrededor; una oca persigue a Atom (gag).',
   'A: la boca de la mina; Burdock sale con la cara tiznada; Atom pone un cartelito con un arco y una flecha junto a su apellido (Everdeen).',
   'B: los regalos: el pedernal con el pájaro y la serpiente (chispa: gag); la bolsa de gominolas de colores, que Atom «se guarda» como electrón dorado.',
   'B: atardecer en el prado; ella señala el sol que se pone; el sol y una urna se superponen.'],
  'ternura', []),
 ('hm-cosecha', None, 10, 12, ['woodbine', 'protege', 'toma'],
  ['A: la plaza: la escolta saca una papeleta; un chico echa a correr hacia la alambrada (de espaldas, de lejos); el plano corta antes.',
   'A: Lenore Dove se lanza; Haymitch se pone delante con los brazos abiertos; la escolta lo señala.',
   'E y A: un cámara con claqueta; la cosecha se repite y en la pantalla Haymitch sube solo al escenario.'],
  'suspense', []),
 ('hm-toma', None, 13, 13, ['fijate1'],
  ['PAUSA: la plaza congelada; Atom (al doble) con la claqueta «toma 2» (gag); salen a color un libro de Hume y la pregunta «¿real o no real?» como dos tarjetas.'],
  'misterio', []),
 ('hm-capitolio', None, 14, 17, ['tributos', 'louella', 'doble', 'mentores'],
  ['C: el tren de lujo: los cuatro del 12 sentados (Maysilee, Wyatt, Louella y Haymitch); Atom de luciérnaga en la lámpara.',
   'C: la avenida del desfile de lejos (sin ver nada); Haymitch avanza hacia la tribuna de Snow y aplaude despacio; Snow se inclina.',
   'C: el centro de entrenamiento: una niña con la ropa de Louella, de espaldas, entre Vigilantes; Atom se sorprende.',
   'C: Wiress y Mags en el sofá; Effie, con un perchero de ropa, prueba tres pelucas sobre Atom (gag); Beetee dibuja un plano en una servilleta.'],
  'intriga', []),
 ('hm-plato', None, 18, 19, ['entrevista', 'plutarch'],
  ['C: el plató de Caesar: Haymitch, descarado, con los pies sobre la mesa; el público ríe; un marcador sube.',
   'C: Plutarch con su cámara le pasa un plano doblado; una cabina con teléfono: Haymitch habla, al otro lado el prado con las ocas.'],
  'intriga', []),
 ('hm-arena', None, 20, 23, ['arena', 'polen', 'deposito', 'maysilee'],
  ['D: el prado precioso de la arena; al tocar una flor sale un humo violeta; una botellita del Capitolio baja en paracaídas.',
   'E: en la sala de control, en la maqueta, se apagan dos luces del Distrito 12 (sin ver nada); quedan dos.',
   'D: Ampert le pasa el explosivo y se aleja; Haymitch baja solo al depósito y lo prende con el pedernal de Lenore Dove; el agua sale; las pantallas de la sala siguen encendidas.',
   'D: Maysilee con su cerbatana en una rama; ella y Haymitch se dan la mano; un piñón lanzado al borde vuelve rebotando.'],
  'epico', []),
 ('hm-borde', None, 24, 25, ['fijate2', 'hacha'],
  ['PAUSA: el borde de la arena congelado; Atom empuja el muro invisible y le devuelve el empujón (gag); sale a color la flecha de Katniss hacia el cielo de otra arena.',
   'D y E: pájaros que bajan (siluetas lejanas) hacia el bosque; la chica del 1 levanta el hacha; corte a la maqueta: el hacha vuelve por donde vino; el contador marca 1; golpe.'],
  'epico', ['hacha+4.5']),
 ('hm-emision', None, 26, 27, ['edita', 'fijate3'],
  ['E: la sala de montaje: en una pantalla, Haymitch saboteando; un Vigilante corta esa parte con unas tijeras de luz; en la otra, el chico egoísta.',
   'PAUSA: Atom junta las tres «tomas» (la cosecha repetida, la doble y la emisión) como tres cartas, y les pone encima el «¿real o no real?».'],
  'misterio', []),
 ('hm-precio', None, 28, 31, ['casa', 'gominola', 'amanecer', 'gira'],
  ['B: la casa de tablas, de lejos, con humo; Haymitch llega corriendo y se para (sin fuego en primer plano).',
   'B: el prado al amanecer; una bolsa de gominolas rojas en la hierba; Lenore Dove apoyada en él, de espaldas; las ocas quietas; el sol que sale.',
   'A: la casa grande de la Aldea de los Vencedores, vacía; Haymitch abre la primera botella; Atom de luciérnaga se apaga.',
   'C: la Gira de la Victoria: un escenario en otro distrito; Haymitch sonríe a la fuerza; Plutarch, con su cámara, le pone una mano en el hombro.'],
  'misterio', []),
 ('hm-culpa', None, 32, 36, ['fijate4', 'manual', 'nosolo', 'fijate5', 'botella'],
  ['PAUSA en F: la consulta de un psiquiatra de los años sesenta; Atom (al doble) con el reloj de arena; sale a color una ficha «1961».',
   'F: el manual (sin letras) que se abre; una lupa sobre una línea; el cerebro de juguete rueda (gag).',
   'F: tres viñetas pequeñas: un coche con una tirita, una cama de hospital vacía, una oficina con sillas vacías.',
   'PAUSA: Atom con una botella que se convierte en un paraguas que tapa la lluvia (la idea de calmar el dolor); un «1 de cada 3» en tres monigotes.',
   'A: Haymitch adulto en el porche; Atom se sienta a su lado y le pone una mano en el hombro.'],
  'calma', []),
 ('hm-cierre', None, 37, 40, ['prim', 'huevos', 'termino', 'pregunta'],
  ['A: la plaza 24 años después: una papeleta; Katniss se adelanta con los brazos abiertos, como hizo él.',
   'B: el prado: Katniss y Peeta le dan una cesta con huevos de oca; un huevo se mueve (gag); Atom se esconde detrás.',
   'B: el amanecer sobre el prado con las ocas; ya no hay urna; Atom suelta la gominola dorada que se guardó y se convierte en luz.',
   'F: Atom en su estudio mira a cámara y señala los comentarios.'],
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
assert escenas[-1]['frase_fin'] == 40
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas')
