"""Reparto del episodio 46 (Leto II: el hijo de Paul que eligió convertirse en monstruo para salvarnos) en escenas (escribe
escenas.json). Una fila por escena: (id, cartela, frase_ini, frase_fin, [marcas], [guion visual], ánimo, golpes).
- Canon del 43 y del 45: relato a lo Farid humanizado, ATOM EN ESCENA y 5 PAUSAS «fíjate» (frases 8, 15, 18, 22 y 26).
- Decorados: A el planeta de arena (du-comun.js), B la ciudadela (pa-comun.js, del 44), C Jacurutu y el trance, D el
  imperio de Leto 3.500 años después y E el puente (nuevos, lt-comun.js), F el estudio de las pausas (hm-comun.js).
- DERECHOS: nada de las películas; Leto gusano, diseño propio por el libro. Violencia nunca vista. Sin letras.
- BANDA: Fa lidio, 72, sampleada (flauta de pan solista), la celesta en los arpegios agudos.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'fa', 'modo': 'lidio', 'tempo': 72, 'motivo': [0, 4, 6, 7, 6, 4, 2, 0], 'sampleado': True,
         'paleta': {'solista': 'flauta_pan', 'metal': 'trompa', 'madera': 'fagot', 'aire': 'oboe'}}
E = [
 ('lt-gancho', None, 1, 3, ['giro', 'puente', 'leto'],
  ['E: el puente altísimo sobre el río al atardecer; un carro enorme avanza; golpe en «monster».',
   'E: la procesión, la gente en las barandillas; en el carro, el cuerpo largo de gusano con cara humana que mira el agua.',
   'A: el desierto; dos niños pelirrojos de la mano en una duna; Atom de luciérnaga los mira.'],
  'misterio', ['giro+2']),
 ('lt-aviso', None, 4, 4, ['aviso'],
  ['F: Atom con el cartel de destripes y dos libros gordos; dibuja un puente en la pizarra («guárdate esto»).'],
  'misterio', []),
 ('lt-gemelos', None, 5, 7, ['nueve', 'voces', 'alia'],
  ['B: los aposentos de noche; los dos gemelos pelirrojos; detrás, sombras de cientos de antepasados como siluetas de luz; Atom cuenta con los dedos y se le acaban (gag).',
   'B: Leto despierto en la cama; las voces como luces que le rodean; él cierra los ojos y elige.',
   'B: el salón del trono; Alia en el trono; una sombra gorda y oscura detrás de ella (el barón, sin cara); los gemelos la miran.'],
  'ternura', []),
 ('lt-nino', None, 8, 8, ['fijate1'],
  ['PAUSA: el trono congelado; Atom (al doble) saca a color un niño chibi cargando una mochila enorme con una casa encima.'],
  'ternura', []),
 ('lt-predicador', None, 9, 11, ['predicador', 'tigres', 'finge'],
  ['B: la plaza de Arrakeen; un predicador ciego con un paño en los ojos guiado por un muchacho; la gente escucha.',
   'A: de noche, junto a una roca, dos tigres enormes que acechan (sin ataque); los niños corren; Atom salta al ver un gatito (gag).',
   'A: Ghanima llorando sola en la arena; a lo lejos, una figurita pequeña que se aleja al desierto.'],
  'intriga', []),
 ('lt-sendero', None, 12, 14, ['trance', 'sendero', 'piel'],
  ['C: un sietch abandonado en la roca; Leto tumbado y una luz azul de especia; se hunde en la visión.',
   'C: el trance: miles de caminos de luz que se apagan uno a uno; uno solo, dorado, sigue encendido.',
   'A: Leto en la arena; las truchas de arena (manchas que se mueven) le suben por los brazos como un guante vivo; Atom toca una y se le pega a la mano (gag); Leto corre más rápido que el viento.'],
  'asombro', []),
 ('lt-futuro', None, 15, 15, ['fijate2'],
  ['PAUSA: la arena congelada; Atom (al doble) saca a color una balanza: una moneda hoy contra un cofre lejano; y un planeta con un reloj.'],
  'asombro', []),
 ('lt-precio', None, 16, 17, ['padre', 'alia2'],
  ['B: el predicador ciego y Leto frente a frente; el predicador toca la cara de su hijo; luego, entre la multitud, un destello y el predicador ya no está (sin violencia).',
   'B: Leto avanza al trono; Alia se levanta; una luz se apaga (de lejos); Leto, un niño, se sienta en el trono enorme.'],
  'suspense', ['padre+20']),
 ('lt-tranvia', None, 18, 18, ['fijate3'],
  ['PAUSA: el trono congelado; Atom (al doble) saca a color unas vías de tranvía con una palanca y un puentecito.'],
  'suspense', []),
 ('lt-dios', None, 19, 21, ['siglos', 'paz', 'diario'],
  ['D: Arrakis verde: bosques, ríos y lluvia; a Atom le cae una gota y se asombra (gag); al fondo, el Sareer, el último desierto.',
   'D: la Ciudadela del dios emperador; las guardianas con capa en filas; Leto gusano en su carro; Duncan a su lado.',
   'D: de noche, Leto escribe; un diario gordísimo; Atom intenta levantarlo y no puede (gag).'],
  'epico', []),
 ('lt-soledad', None, 22, 22, ['fijate4'],
  ['PAUSA: la noche congelada; Atom (al doble) saca a color una silla sola en una mesa larga y un grupo de amigos al otro lado; «2015».'],
  'calma', []),
 ('lt-puente', None, 23, 25, ['siona', 'hwi', 'cae'],
  ['D: el Sareer; Siona, joven y decidida, con un diario robado bajo el brazo; Leto la mira desde lejos.',
   'E: la boda: Hwi Noree con velo junto al carro; Atom con una pajarita torcida (gag); la procesión sale al puente.',
   'E: el puente se rompe en el centro (de lejos, polvo); el carro cae al río; salpicadura; luego, el río tranquilo con manchas de arena que se dispersan.'],
  'intriga', ['cae+4']),
 ('lt-reactancia', None, 26, 26, ['fijate5'],
  ['PAUSA: el río congelado; Atom (al doble) saca a color un cartel de «prohibido» y un pájaro que sale de una jaula abierta; «1966».'],
  'intriga', []),
 ('lt-cierre', None, 27, 29, ['dispersion', 'recuerdas', 'pregunta'],
  ['D y A: miles de truchas de arena con perlas de luz; el bosque se vuelve desierto; luego, naves diminutas que salen hacia las estrellas en todas direcciones.',
   'E: el puente del principio, vacío, al atardecer; un niño pelirrojo de nueve años en la orilla.',
   'F: Atom en su estudio borra el puente de la pizarra, mira a cámara y señala los comentarios.'],
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
