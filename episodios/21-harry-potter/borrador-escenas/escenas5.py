E = {}
E['hp-banquete'] = ('Banquete', '// prueba', r'''
const d = (o) => (t) => { T.hogwarts(R, t, o); T.hogwartsDelante(R, t, o); };
const x = (o) => (t) => { T.exterior(R, t, o); T.exteriorDelante(R, t, o); };
T.rodar(E, R, [[0, d({ encuadre: 'comedor' })], [4, d({ encuadre: 'comedor', camara: 'mesa' })], [8, d({ encuadre: 'aula' })], [12, d({ encuadre: 'aula', camara: 'pizarra' })], [16, d({ encuadre: 'sala' })]], { año: 1991 });
''')
E['hp-flauta'] = ('Flauta', '// prueba', r'''
const x = (o) => (t) => { T.exterior(R, t, o); T.exteriorDelante(R, t, o); };
T.rodar(E, R, [[0, x({ encuadre: 'cabana', camara: 'puerta' })], [4, x({ encuadre: 'cabana' })], [8, x({ encuadre: 'torre', camara: 'almenas', escobas: 1 })], [12, x({ encuadre: 'torre' })]], { año: 1991 });
''')
