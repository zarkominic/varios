"""Reparto del episodio 12 (huracanes y tornados) en escenas (escribe escenas.json). Una fila por escena:
(id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo de la música, golpes).
- Estilo canónico pixel chibi y estándar mínimo (ESTANDAR.md): planos de 4–7 s con acción, detalle y gags.
- Ocho decorados (guion.md): A el aeródromo de Bryan (1943), B dentro del huracán y el ojo, C la máquina de calor,
  D Galveston (1900), E ojos en el cielo (órbita y sala de pronóstico), F el taller de Saffir, G las Grandes Llanuras y
  el laboratorio de Fujita en Chicago, H hoy (centro de huracanes, el P-3 por dentro y la costa de Destin). Más el mapa
  de papel de EE. UU. (ov-mapas.js).
- Ánimo (herramientas/banda.cjs): suspense, misterio, intriga, cierre. Golpes: la música se corta justo antes de esa
  marca y entra un golpe grave.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
E = [
 ('hu-gancho', '1943', 1, 3, ['leyenda', 'apuesta', 'ojo'],
  ['A: Bryan Field al amanecer de julio; avionetas amarillas AT-6; los pilotos británicos señalan la avioneta y se ríen.',
   'A: Duckworth mira la tormenta que asoma en el horizonte; levanta una copa: «?»; sube a la avioneta con el navegante.',
   'B: la avioneta entre muros de lluvia, sacudida; la taza del navegante flota (gag); de golpe, el ojo: sol arriba, el campo de Texas abajo; una gaviota (gag).'],
  'suspense', ['ojo']),
 ('hu-pregunta', None, 4, 4, ['pregunta'], ['B: el ojo visto desde arriba, el estadio de nubes girando; «?» y la avioneta pequeña que da vueltas dentro.'], 'misterio', []),
 ('hu-hola', None, 5, 5, ['hola'], ['B: la espiral del huracán desde lo alto; Atom se presenta.'], 'misterio', []),
 ('hu-calor', None, 6, 7, ['oceano', 'secreto'],
  ['C: el Atlántico tropical al sol; el termómetro marca «80°F» / «26,5°»; el vapor invisible sube (ondas de calor); el espejo del baño empañado.',
   'C: el aire sube, se enfría y nacen las gotas; cada gota suelta una chispa de calor; el aire sube más deprisa y aspira más mar.'], 'intriga', []),
 ('hu-motor', None, 8, 8, ['motor'],
  ['C: el huracán como un motor con pistones de nubes; una fila de centrales eléctricas frente a él: «×150»; un hilito de viento sale del motor.'], 'intriga', []),
 ('hu-giro', None, 9, 9, ['giro'],
  ['E: la Tierra girando desde la órbita; flechas de aire que se tuercen; la espiral antihoraria; la franja del ecuador sin tormentas.'], 'misterio', []),
 ('hu-ojo', None, 10, 11, ['calma', 'lavabo'],
  ['B: corte del ojo: aire que sube por las paredes y una parte que baja por el centro, calentándose; la columna de calma.',
   'C: un lavabo con un patito de goma que gira con el desagüe (gag); Atom se encoge de hombros.'], 'misterio', []),
 ('hu-galveston', '1900', 12, 13, ['galveston', 'cline'],
  ['D: Galveston en 1900: calle de casas victorianas, tranvía, puerto con veleros; la isla baja: «8,7 ft».',
   'D: la oficina meteorológica con la veleta y la bandera de aviso; Cline con el barómetro y un telegrama; recorre la playa avisando.'], 'suspense', []),
 ('hu-marea', None, 14, 14, ['marea'], ['D: de noche, el mar sube por la escala de mareas hasta «15 ft» y cruza la calle de lado a lado; vista lejana, sin víctimas.'], 'suspense', ['marea']),
 ('hu-muro', None, 15, 15, ['muro'],
  ['D: el muro de diecisiete pies frente al mar; casas subidas con gatos; un perro sube con la casa y baja por la escalera nueva (gag); la draga bombea arena.'], 'intriga', []),
 ('hu-cazadores', '1943', 16, 16, ['cazadores'],
  ['A: la avioneta aterriza en Bryan; vuelve a despegar con el oficial meteorológico; la copa con «?»; el emblema de los cazahuracanes.'], 'misterio', []),
 ('hu-tiros', '1960', 17, 17, ['tiros'],
  ['E: el TIROS-1 en órbita manda la primera foto de nubes; al año siguiente, un sucesor ve un remolino en alta mar antes que nadie.'], 'intriga', []),
 ('hu-nombres', None, 18, 18, ['nombres'],
  ['E: la sala de pronóstico; las listas de nombres en pictogramas; seis listas que giran; el cajón de los nombres retirados se cierra de golpe (gag).'], 'intriga', []),
 ('hu-saffir', '1971', 19, 20, ['saffir', 'categorias'],
  ['F: el taller de Saffir con casas de prueba en el banco de viento; Simpson llega con un mapa; la escala del 1 al 5.',
   'F: categoría 1: tejas que se levantan; categoría 5: la casa de prueba arrasada; una teja golpea una campanita (gag).'], 'intriga', []),
 ('hu-fujita', None, 21, 21, ['fujita'],
  ['G: Chicago: el laboratorio de Fujita con la mesa de fotos aéreas; su avioneta sobrevuela los destrozos y fotografía.'], 'intriga', []),
 ('hu-tamano', None, 22, 22, ['tamano'],
  ['G: comparación: el huracán de trescientas millas sobre el mapa y el tornado como un hilo; un calendario de dos semanas frente a un reloj de minutos.'], 'misterio', []),
 ('hu-llanuras', None, 23, 23, ['llanuras'],
  ['Mapa de EE. UU.: el aire húmedo del golfo que entra por debajo y el seco de las Rocosas por encima; G: la granja, la supercelda y una vaca que mira pasar un tornado lejano sin dejar de masticar (gag).'], 'intriga', []),
 ('hu-ivan', '2004', 24, 25, ['ivan', 'secuelas'],
  ['Mapa: la trayectoria de Iván llega a tierra y van saliendo chinchetas de tornados desde Florida hasta Pensilvania.',
   'G: el huracán se aleja y deja tornados pequeños detrás, como una cola; «2»?'], 'intriga', []),
 ('hu-silencio', '2026', 26, 27, ['nino', 'cizalla'],
  ['Mapa del mundo/océano: el Pacífico caliente en rojo; los vientos de altura que cruzan el Atlántico.',
   'C: una tormenta joven que intenta montar su motor y el viento de arriba la tuerce y la deshace.'], 'misterio', []),
 ('hu-isaias', None, 28, 29, ['isaias', 'destin'],
  ['H: el centro de huracanes: la pantalla con Isaías que se hace huracán; el calendario en «7».',
   'H: la costa de Destin de noche; el huracán llega; las luces de la costa se apagan barrio a barrio.'], 'suspense', ['destin']),
 ('hu-josephine', None, 30, 30, ['josephine'],
  ['Mapa: los Outer Banks; H: la carretera de la costa con el agua encima; luego la pantalla del centro de huracanes, tranquila: nada en 7 días.'], 'misterio', []),
 ('hu-kermit', None, 31, 31, ['kermit'],
  ['H: el P-3 Kermit despega (la rana de la cola da un saltito, gag); por dentro, pantallas; cruza la pared del ojo y suelta la sonda, que cae hasta el mar.'], 'cierre', []),
 ('hu-curiosidad', None, 32, 32, ['curiosidad'],
  ['B: la avioneta de 1943 y el P-3 de hoy vuelan juntos dentro del ojo; la gaviota vuelve al ala (gag); «?» → «✓».'], 'cierre', []),
 ('hu-adios', None, 33, 33, ['adios'], ['B: el ojo en calma desde arriba al atardecer; Atom.'], 'cierre', []),
]

escenas = []
for id_, cartela, a, b, marcas, vis, animo, golpes in E:
    assert len(marcas) == len(vis) == b - a + 1, id_
    escenas.append({'id': id_, 'estilo': 'pixel', 'cartela': cartela, 'frase_ini': a, 'frase_fin': b,
                    'marcas': marcas, 'guion_visual': vis, 'animo': animo, 'golpes': golpes,
                    'empieza_con': 'cartela ' + cartela if cartela else 'corte desde la escena anterior',
                    'termina_con': '', 'produccion': ''})
assert [e['frase_ini'] for e in escenas][1:] == [e['frase_fin'] + 1 for e in escenas][:-1]
assert escenas[-1]['frase_fin'] == 33
json.dump({'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas')
