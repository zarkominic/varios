"""Reparto del episodio 36 (Tutankamón: los cuartos que nadie ha abierto) en escenas (escribe escenas.json). Una fila por
escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Siete decorados (guion.md): A el Valle de los Reyes en 1922, B dentro de la tumba (antecámara, cámara pintada,
  sarcófago cerrado), C El Cairo y Londres (1923–1939), D el escaneo y la copia, E los radares (y el busto de una reina),
  F la ladera sobre la tumba (rejilla de medidas, gravímetro, corte del monte, perforadora) y G hoy (el estudio de Atom).
- CUIDADO: la momia nunca se enseña (sarcófago cerrado, máscara, ajuar); la maldición, como invento de periódico, sin
  sustos; las anomalías son manchas en un corte del monte, no cuartos, hasta el final. Sin letras: números e iconos.
  Hilo de gags: el estetoscopio de Atom y su pared de papel pintado egipcio.
- Los golpes son NOMBRES DE MARCAS de la misma escena.
- BANDA: Fa menor, 88 por minuto, motivo con segunda aumentada.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'fa', 'modo': 'menor', 'tempo': 88, 'motivo': [0, 1, 4, 5, 7, 5, 4, 1]}
E = [
 ('tu-gancho', None, 1, 2, ['muro', 'camino'],
  ['B y F: la pared pintada de la cámara, de cerca, con una línea recta que asoma bajo la pintura (golpe); el monte en corte con la tumba dentro y una mancha oscura al lado; una broca pequeña que espera arriba.',
   'A, C, E y F: una vela que se acerca a un agujero en la roca; un vendedor de periódicos; tres radares en fila, cada uno con un icono distinto (✓, ✗, ?); unos científicos que miden el monte con un aparato en un trípode.'],
  'misterio', ['muro']),
 ('tu-hola', None, 3, 3, ['hola'],
  ['G: Atom saluda en su estudio, con papel pintado egipcio; pone un estetoscopio en la pared, da un golpecito… y desde el otro lado alguien devuelve el golpe.'],
  'curiosidad', []),
 ('tu-carter', '1922', 4, 5, ['carter', 'escalon'],
  ['A: el Valle de los Reyes al sol; Carter (EL.carterTU) con su sombrero mira montones de arena; lord Carnarvon (EL.carnarvonTU) cuenta billetes y suspira; un calendario con la última temporada.',
   'A: obreros retiran piedras de unas chozas antiguas; aparece un escalón, luego otro; una puerta con sellos; Carter la tapa y en la oficina del telégrafo la cinta de papel no se acaba (un burro se la empieza a comer).'],
  'aventura', []),
 ('tu-vela', None, 6, 6, ['vela'],
  ['A y B: Carter acerca una vela a un hueco en la segunda puerta; el aire de la tumba la apaga y la vuelve a encender; dentro, a la luz temblorosa, oro, estatuas, carros y cofres amontonados (golpe en «cosas maravillosas»).'],
  'asombro', ['vela']),
 ('tu-pequena', None, 7, 8, ['pequena', 'pintada'],
  ['B: el plano de la tumba con sus cuatro cuartos, pequeño al lado del de una tumba real grande; la antecámara abarrotada; obreros antiguos montan un panel de una capilla dorada al revés.',
   'B: la única sala pintada, con sus escenas (nuestras); un cofre al que un escriba antiguo le raspa un nombre y pinta otro (sin letras: cartuchos con iconos).'],
  'intriga', []),
 ('tu-maldicion', None, 9, 9, ['maldicion'],
  ['C: una calle de El Cairo en 1923 con vendedores de periódicos y un titular de miedo (un icono de momia de dibujo, sin sustos); un gato egipcio, muy digno, se sienta encima del periódico; Carter, ya mayor, en Londres, con su bastón.'],
  'curiosidad', []),
 ('tu-escaneo', '2015', 10, 11, ['copia', 'rayas'],
  ['D: colas de turistas en la tumba; un escáner que recorre la pared en un raíl; una impresora enorme en un taller; la copia junto a la casa de Carter.',
   'D: la pared escaneada bajo luz rasante: aparecen dos rectángulos rectos debajo de la pintura; un egiptólogo (EL.reevesTU) los repasa con el dedo.'],
  'curiosidad', []),
 ('tu-reina', None, 12, 13, ['reina', 'nefertiti'],
  ['F y E: el corte del monte: la tumba pequeña y, detrás, el contorno de una tumba más grande (en trazo azul, «según él»); el busto de una reina en una vitrina de museo (el nuestro).',
   'E: una ciudad antigua junto al río con un gran disco solar; un cincel que borra nombres en un templo; una corona de faraón que pasa de una cabeza a otra.'],
  'misterio', []),
 ('tu-radar', None, 14, 15, ['watanabe', 'eco'],
  ['E: un técnico japonés (EL.watanabeTU) pasa un radar de mano por la pared; una rueda de prensa con un 90 % gigante en la pantalla y flashes.',
   'E: un cañón con alguien que grita y el eco que vuelve; en un corte de roca, la onda baja, rebota en un cambio de material y vuelve; un reloj que mide el tiempo de ida y vuelta.'],
  'aventura', []),
 ('tu-turin', None, 16, 17, ['natgeo', 'turin'],
  ['E: otro equipo con otro radar en la misma pared; la pantalla queda plana: nada; dos marcadores, uno con ✓ y otro con ✗.',
   'E: un laboratorio de Turín con un radar más grande; los ecos «fantasma» salen de delante de la pared (una lata olvidada pita «¡cuarto!»); un sello de «caso cerrado» (icono) cae sobre una carpeta.'],
  'calma', []),
 ('tu-este', '2020', 18, 19, ['este', 'hawass'],
  ['F: la ladera sobre la tumba; un radar de carrito empujado por el monte; en el corte, junto a la tumba, aparece un espacio alargado paralelo al pasillo de entrada.',
   'F y E: un arqueólogo con sombrero (EL.hawassTU) niega con la cabeza; una carpeta que se queda a medio cerrar; el pasillo del corte se queda parpadeando con un «?».'],
  'misterio', []),
 ('tu-gravedad', '2026', 20, 21, ['gravedad', 'medidas'],
  ['F y G: una manzana que cae; la roca con un hueco y unas flechas de gravedad un poco más cortas encima; un gravímetro en su trípode: una pesa colgada de un muelle finísimo.',
   'F: una rejilla de puntos sobre la ladera, del tamaño de un departamento pequeño; científicos que miden punto a punto (un escarabajo pasa con su bola y la aguja tiembla); el mapa de colores con manchas de esquinas rectas junto a la pared norte (golpe).'],
  'asombro', ['medidas']),
 ('tu-dudas', None, 22, 22, ['escombro'],
  ['F: dos cortes iguales: uno con un cuarto vacío y otro con un pasillo lleno de cascotes; la balanza de densidad no distingue bien entre los dos; geofísicos que piden más datos.'],
  'calma', []),
 ('tu-agujero', None, 23, 24, ['agujero', 'pared'],
  ['F: una perforadora pequeña en lo alto de la ladera; una broca de ocho centímetros baja por el corte hacia la mancha; una camarita que cuelga de un cable (al llegar, un murciélago también mira).',
   'B: la pared pintada; un mazo que se acerca y se detiene; el aliento de los visitantes como nubecillas que manchan el yeso; el agujero pequeño, lejos de las pinturas.'],
  'suspense', []),
 ('tu-permiso', None, 25, 25, ['permiso'],
  ['E y F: una mesa oficial con un sello que aún no baja; un calendario de noviembre de 2026 que pasa días; la perforadora esperando bajo el sol.'],
  'calma', []),
 ('tu-medir', None, 26, 27, ['medir', 'familia'],
  ['G y F: cuatro aparatos en fila (radar de mano, radar de carrito, gravímetro y cámara) y cuatro respuestas distintas; un corte con escombro que engaña al radar y otro que engaña a la gravedad.',
   'F: el corte con varias posibilidades en trazo azul: un almacén, otra tumba de la familia, un pasillo sin terminar; el busto de la reina con un «?».'],
  'curiosidad', []),
 ('tu-cierre', None, 28, 29, ['vela2', 'final'],
  ['A y F: la vela de Carter en 1922 junto a la camarita de 2026: dos agujeros pequeños y dos luces.',
   'G: Atom hace un agujerito en una caja para mirar dentro con una linterna: dentro hay otra caja; se despide.'],
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
assert escenas[-1]['frase_fin'] == 29
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas')
