E = {}
E['la-ahogado'] = ('Ahogado', '// sonda', r'''
const p1 = (t) => T.isla(R, t, { encuadre: 'muelle', camara: 'taberna' });
const p2 = (t) => T.isla(R, t, { encuadre: 'fondo' });
const p3 = (t) => T.isla(R, t, { encuadre: 'fondo', camara: 'cerca' });
T.rodar(E, R, [[0, p1], [6.8, p2], [11.7, p3]], { año: 1990 });
''')
E['la-imuse'] = ('iMUSE', '// sonda', r'''
const p1 = (t) => T.estudio(R, t, { encuadre: 'musica', anyo: 1990 });
const p2 = (t) => T.estudio(R, t, { encuadre: 'musica', camara: 'teclado' });
const p3 = (t) => { if (t < 12.5) T.isla(R, t, { encuadre: 'bosque' }); else T.isla(R, t, { encuadre: 'barcoFantasma', camara: 'cerca' }); };
T.rodar(E, R, [[0, p1], [5.0, p2], [9.95, p3]], { cartela: '1991', año: 1991 });
''')
E['la-tentaculo'] = ('Day of the Tentacle', '// sonda', r'''
const p1 = (t) => T.mansion(R, t, { encuadre: 'fachada', luz: 'dia', rebote: 0.5 });
const p2 = (t) => T.mansion(R, t, { encuadre: 'pasillo', luz: 'dia' });
const p3 = (t) => T.epocas(R, t, { encuadre: 'presente', camara: 'cerca' });
const p4 = (t) => T.epocas(R, t, { encuadre: 'triple' });
T.rodar(E, R, [[0, p1], [6.5, p2], [11.0, p3], [15.85, p4]], { cartela: '1993', año: 1993 });
''')
