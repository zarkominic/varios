"""Reparto del episodio 38 (El Mary Celeste: el barco que siguió navegando sin nadie) en escenas (escribe escenas.json). Una
fila por escena: (id, cartela, frase_ini, frase_fin, [marca por frase], [guion visual por frase], ánimo, golpes).
- Cada «frase» es un PÁRRAFO de 2–4 oraciones narrado como un cuento: 3 o 4 planos de 4–7 s, cortados en la palabra.
- Siete decorados (guion.md): A el astillero de 1861 y el muelle de Nueva York de 1872, B el Mary Celeste en el mar (las
  Azores, el Dei Gratia), C a bordo (cubierta, camarote, bodega), D Gibraltar (el Peñón, el puerto, el tribunal), E el
  laboratorio (2006 y 2026), F Haití en 1885 y los buceadores de 2001, y G hoy (el estudio de Atom con su barco en una
  botella; el escritorio de Conan Doyle en 1884).
- CUIDADO: nada de fantasmas, monstruos ni cadáveres; las diez personas desaparecen y se cuenta con respeto. Los mitos (el
  té caliente) se enseñan como adornos que se borran. Sin letras en pantalla salvo el nombre del barco en la popa.
  Hilo de gags: el barco en la botella de Atom.
- Los golpes son NOMBRES DE MARCAS de la misma escena (o «marca+segundos»).
- BANDA: Sol dórico, 84 por minuto, motivo que se mece como una ola.
"""
import json, os

D = os.path.dirname(os.path.abspath(__file__))
BANDA = {'tono': 'sol', 'modo': 'dorico', 'tempo': 84, 'motivo': [0, 2, 3, 7, 9, 7, 3, 2]}
E = [
 ('mc-gancho', None, 1, 2, ['solo', 'camino'],
  ['B y C: el Mary Celeste con unas pocas velas, dando bandazos en un Atlántico gris; la cubierta vacía, el timón que gira solo; la carga y los víveres intactos (golpe en «no había nadie»).',
   'C, D, G y E: el camarote del capitán con el diario; los barriles en la bodega; el fiscal con su lupa en Gibraltar; una pluma de 1884; una maqueta que hace «fuuum».'],
  'misterio', ['solo']),
 ('mc-hola', None, 3, 3, ['hola'],
  ['G: Atom saluda en su estudio junto a un barco dentro de una botella; lo mira con lupa: la cubierta del barquito, vacía.'],
  'curiosidad', []),
 ('mc-amazon', None, 4, 5, ['amazon', 'nombre'],
  ['A: el astillero de la isla de Spencer en 1861: el casco en grada, carpinteros, la botadura; el barco en una tormenta y varado en la playa.',
   'A: el barco reparado en Nueva York; un pintor tapa «Amazon» en la popa y pinta «Mary Celeste»; la gaviota se mancha; Briggs (EL.briggsMC) en el muelle.'],
  'aventura', []),
 ('mc-familia', None, 6, 6, ['familia'],
  ['A: Briggs con Sarah (EL.sarahMC) y la pequeña Sophia (EL.sophiaMC) suben a bordo; Arthur (EL.arthurMC) se queda en el muelle de la mano de su abuela, y dice adiós.'],
  'aventura', []),
 ('mc-salida', '1872', 7, 8, ['salida', 'deigratia'],
  ['A: el muelle de Nueva York en noviembre de 1872: la cabria sube barriles a la bodega, uno se escapa rodando y un estibador corre detrás; el barco zarpa.',
   'A y B: ocho días después zarpa el Dei Gratia, con su capitán (EL.morehouseMC); los dos barcos en un mapa del Atlántico, separados.'],
  'calma', []),
 ('mc-hallazgo', None, 9, 10, ['vigia', 'abordo'],
  ['B: el vigía del Dei Gratia con su catalejo; el Mary Celeste a lo lejos, dando bandazos; banderas de señales sin respuesta.',
   'C: Deveau (EL.deveauMC) y Wright suben a bordo; la cubierta vacía, el agua en la bodega, la bomba desmontada, el hueco del bote (golpe).'],
  'suspense', ['abordo']),
 ('mc-abordo', None, 11, 12, ['ropa', 'nueve'],
  ['C: los baúles con la ropa seca, la despensa llena, los barriles; el diario abierto en el 25 de noviembre, con la isla de Santa María dibujada al margen.',
   'B: el barco solo, sin nadie al timón, avanzando nueve días sobre un mapa que se desenrolla.'],
  'misterio', []),
 ('mc-te', None, 13, 13, ['te'],
  ['C: el camarote; aparece una taza humeante recortada de un periódico… y la goma de Atom la borra.'],
  'curiosidad', []),
 ('mc-doyle', '1884', 14, 15, ['doyle', 'nombre2'],
  ['G: el escritorio de Conan Doyle (EL.doyleMC) en 1884, joven médico, escribiendo de noche; la revista impresa sin firma.',
   'G: Atom despega del barco las cosas que le pusieron después, una a una, como pegatinas.'],
  'curiosidad', []),
 ('mc-gibraltar', None, 16, 18, ['gibraltar', 'fiscal', 'juicio'],
  ['D: el Mary Celeste entra en la bahía de Gibraltar con tres marineros; el Peñón al fondo.',
   'D: el fiscal (EL.sollyfloodMC) con una lupa enorme ante la espada y los cortes de la proa.',
   'D: sopla y sale una nube de óxido que le hace estornudar; el tribunal paga a los salvadores, poco.'],
  'intriga', []),
 ('mc-teorias', None, 19, 20, ['piratas', 'fraude'],
  ['D y B: Atom tacha teorías en una pizarra con dibujos: un barco pirata, una pelea, y la carga intacta.',
   'G: más teorías tachadas: un contrato de seguro, un tentáculo, una tromba; el barco casi entero.'],
  'curiosidad', []),
 ('mc-pistas', None, 21, 23, ['varilla', 'probable', 'cabo'],
  ['C: la varilla de sondeo baja a la bodega y sale goteando; un pececito salta; la bomba desmontada; las escotillas abiertas; el hueco del bote.',
   'C y B: Briggs mide el agua, mira el horizonte con la isla cerca; todos al bote.',
   'B: el barco se aleja con el viento; un cabo roto en el agua (golpe); el horizonte vacío.'],
  'intriga', ['cabo']),
 ('mc-barriles', None, 24, 25, ['genova', 'vapor'],
  ['A y C: el puerto de Génova, los barriles descargados; nueve vacíos, de otra madera, con gotas que se escapan.',
   'E: el laboratorio de 2006 con la maqueta de la bodega y cubos de papel: «fuuum», llama azul, cubos intactos; la ceja del químico (EL.sellaMC), chamuscada.'],
  'asombro', []),
 ('mc-manchester', '2026', 26, 27, ['manchester', 'pudo'],
  ['E: el laboratorio de 2026 con la maqueta de madera; con frío, nada; con calor, la escotilla salta (EL.rowbothamMC, EL.mairMC).',
   'G: Atom con la maqueta y un signo de igual tachado: «pudo» no es «pasó».'],
  'asombro', []),
 ('mc-haiti', None, 28, 29, ['haiti', 'cussler'],
  ['F: el Mary Celeste viejo encalla a propósito en un arrecife de Haití en 1885; aguas turquesa.',
   'F: buceadores en 2001 con una lancha; un trozo de madera con anillos que sigue creciendo hasta 1894.'],
  'aventura', []),
 ('mc-cierre', None, 30, 31, ['entonces', 'final'],
  ['B: el bote con diez siluetas pequeñas que se aleja en la niebla, de lejos y con respeto; el diario con la última página en blanco.',
   'G: Atom borra de su pizarra el té, el monstruo y el pirata; el bote del barquito de la botella aparece flotando en su taza de té.'],
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
assert escenas[-1]['frase_fin'] == 31
json.dump({'banda': BANDA, 'escenas': escenas, 'lotes': []}, open(f'{D}/escenas.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas')
