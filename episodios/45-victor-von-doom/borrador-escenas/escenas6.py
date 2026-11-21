E = {}
E['vd-rey'] = ('El rey', '// prueba', r'''
const a = (t) => { const o = { encuadre: 'trono' }; T.latveria(R, t, o); T.latveriaDelante(R, t, o); };
const b = (t) => { const o = { encuadre: 'doomstadt', camara: 'plaza', robots: 0 }; T.latveria(R, t, o); T.latveriaDelante(R, t, o); };
const c = (t) => { const o = { encuadre: 'doomstadt' }; T.latveria(R, t, o); T.latveriaDelante(R, t, o); };
const d = (t) => { const o = { encuadre: 'estudio', camara: 'mesa' }; T.estudio(R, t, o); T.estudioDelante(R, t, o); };
const e = (t) => { const o = { encuadre: 'estudio' }; T.estudio(R, t, o); T.estudioDelante(R, t, o); };
T.rodar(E, R, [[0, a], [5, b], [10, c], [15, d], [20, e]], {});
''')
