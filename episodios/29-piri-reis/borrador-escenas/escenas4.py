E = {}
E['pr-sultan'] = ('El sultán', '// prueba', r'''
const p1 = (t) => { T.galipoli(R, t, { encuadre: 'cairo' }); R.actor(EL.selim, 153, 120, t, {}); T.galipoliDelante(R, t, { encuadre: 'cairo' }); };
const p2 = (t) => { T.galipoli(R, t, { encuadre: 'cairo', camara: 'trono', cofre: 0.5 }); R.actor(EL.selim, 154, 122, t, {}); T.galipoliDelante(R, t, { encuadre: 'cairo', camara: 'trono' }); };
const p3 = (t) => { T.estambul(R, t, { encuadre: 'biblioteca' }); T.estambulDelante(R, t, { encuadre: 'biblioteca' }); };
const p4 = (t) => { const r = T.pergamino(R, t, { vista: 'entero', borrado: tramo(t, 14, 16), ilumina: 'costa' }); };
T.rodar(E, R, [[0, p1], [4.82, p2], [8.76, p3], [13.74, p4]], { año: 1517 });
''')
E['pr-fuentes'] = ('Las fuentes', '// prueba', r'''
const p1 = (t) => { T.galipoli(R, t, { encuadre: 'taller', luz: 'tarde' }); R.actor(EL.piri, 200, 145, t, {}); T.galipoliDelante(R, t, { encuadre: 'taller', luz: 'tarde' }); };
const p2 = (t) => { const r = T.pergamino(R, t, { vista: 'caribe', camara: 'detalle' }); T.c_carta(R, 60, 60, 'portugues'); T.c_carta(R, 100, 60, 'colon'); T.c_carta(R, 140, 60, 'arabe'); T.c_carta(R, 180, 60, 'ptolomeo'); T.c_carta(R, 220, 60, 'vieja'); };
T.rodar(E, R, [[0, p1], [5.61, p2]], { año: 1513 });
''')
E['pr-caribe'] = ('El Caribe', '// prueba', r'''
const p1 = (t) => { const r = T.pergamino(R, t, { vista: 'caribe', ilumina: 'caribe' }); };
const p2 = (t) => { const r = T.hoy(R, t, { encuadre: 'despacho', camara: 'globo', gira: 0 }); T.hoyDelante(R, t, { encuadre: 'despacho', camara: 'globo' }); };
T.rodar(E, R, [[0, p1], [9.43, p2]], { año: 1513 });
''')
