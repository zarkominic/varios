E = {}
E['wo-golf'] = ('Golf', '// prueba', r'''
const p1 = (t) => { T.oreja(R, t, { encuadre: 'golf', epoca: 1998 }); T.orejaDelante(R, t, { encuadre: 'golf', epoca: 1998 }); };
const p2 = (t) => { T.oreja(R, t, { encuadre: 'golf', camara: 'plancha', epoca: 2000, pelota: tramo(t, 5, 9) }); T.orejaDelante(R, t, { encuadre: 'golf', camara: 'plancha', epoca: 2000, pelota: tramo(t, 5, 9) }); };
const p3 = (t) => { T.archivo(R, t, { encuadre: 'garaje', camara: 'archivo' }); T.archivoDelante(R, t, { encuadre: 'garaje', camara: 'archivo' }); };
T.rodar(E, R, [[0, p1], [5, p2], [10.5, p3]], { año: 1998 });
''')
E['wo-archivo'] = ('Archivo', '// prueba', r'''
const p1 = (t) => { T.archivo(R, t, { encuadre: 'fotos', u: 0.3, flash: 0 }); T.archivoDelante(R, t, { encuadre: 'fotos' }); };
const p2 = (t) => { T.archivo(R, t, { encuadre: 'fotos', camara: 'laboratorio' }); T.archivoDelante(R, t, { encuadre: 'fotos', camara: 'laboratorio' }); };
const p3 = (t) => { T.oreja(R, t, { encuadre: 'golf', epoca: 2000 }); };
T.rodar(E, R, [[0, p1], [10, p2], [20, p3]], { cartela: '2024', año: 2024 });
''')
