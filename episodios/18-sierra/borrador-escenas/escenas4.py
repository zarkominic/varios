E = {}
E['si-lago'] = ('Lago', '''// sonda''', r'''
const p1 = (t) => { const g = T.reino(R, t, { encuadre: 'lago' }); };
const p2 = (t) => { const g = T.reino(R, t, { encuadre: 'lago', camara: 'orilla' }); T.reinoDelante(R, t, { encuadre: 'lago', camara: 'orilla' }); };
const p3 = (t) => { const g = T.oficina(R, t, { encuadre: 'oficina', camara: 'ventana', epoca: 1984, celebra: Math.min(1, t / 14) }); };
T.rodar(E, R, [[0, p1], [3.6, p2], [7.76, p3]], { año: 1984 });
''')
E['si-goose'] = ('Goose', '''// sonda''', r'''
const p1 = (t) => { T.cuento(R, t, { encuadre: 'canciones', salto: Math.min(1, t / 5) }); };
const p2 = (t) => { T.cuento(R, t, { encuadre: 'canciones', camara: 'corro' }); };
T.rodar(E, R, [[0, p1], [8, p2]], { año: 1987 });
''')
E['si-rosella'] = ('Rosella', '''// sonda''', r'''
const p1 = (t) => { const g = T.cuento(R, t, { encuadre: 'alcoba' }); R.actor(EL.reyCuento, 30, 138, t, { dir: 1, quieto: true }); T.cuentoDelante(R, t, { encuadre: 'alcoba' }); };
const p2 = (t) => { T.reino(R, t, { encuadre: 'castillo', luz: 'noche' }); };
const p3 = (t) => { const g = T.estudio(R, t, { encuadre: 'mesa' }); T.tarjetaSonido(R, g.tarjeta[0], g.tarjeta[1], t, { musicos: Math.min(1, (t - 13) / 2) }); };
T.rodar(E, R, [[0, p1], [6.15, p2], [13.0, p3]], { año: 1988 });
''')
