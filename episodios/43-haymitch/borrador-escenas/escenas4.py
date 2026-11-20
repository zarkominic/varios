E = {}
E['hm-capitolio'] = ('El Capitolio', '''// sonda''', r'''
const T1 = [0, 5.42, 10.88, 17.30, 24.14, 31.22, 36.96, 43.64];
const fs = [
  (t) => { T.interior(R, t, { encuadre: 'tren', luz: 'dia' }); T.interiorDelante(R, t, { encuadre: 'tren' }); },
  (t) => { T.interior(R, t, { encuadre: 'tren', camara: 'ventana', luz: 'tarde' }); T.interiorDelante(R, t, { encuadre: 'tren', camara: 'ventana' }); },
  (t) => { T.capitolio(R, t, { encuadre: 'avenida' }); T.capitolioDelante(R, t, { encuadre: 'avenida' }); },
  (t) => { T.capitolio(R, t, { encuadre: 'avenida', camara: 'balcon' }); T.capitolioDelante(R, t, { encuadre: 'avenida', camara: 'balcon' }); },
  (t) => { T.capitolio(R, t, { encuadre: 'despacho', luz: 'noche' }); T.capitolioDelante(R, t, { encuadre: 'despacho', luz: 'noche' }); },
  (t) => { T.capitolio(R, t, { encuadre: 'despacho', camara: 'mesa', luz: 'noche', numero: '12', cofre: 0.6 }); T.capitolioDelante(R, t, { encuadre: 'despacho', camara: 'mesa', luz: 'noche', numero: '12', cofre: 0.6 }); },
  (t) => { T.capitolio(R, t, { encuadre: 'mapa' }); T.capitolioDelante(R, t, { encuadre: 'mapa' }); },
  (t) => { T.capitolio(R, t, { encuadre: 'museo', camara: 'cuadro' }); T.capitolioDelante(R, t, { encuadre: 'museo', camara: 'cuadro' }); },
];
T.rodar(E, R, T1.map((a, i) => [a, fs[i]]), { año: 50 });
''')
