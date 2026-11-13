"""Borrador de escenas del ep34 (grupo S9): nx-sabemos, nx-cierre. Formato del 11."""
E = {}
COMUN = r'''
const K = hex('#17151d'), BL = hex('#f6f2ea'), ORO = hex('#ffd860'), OROL = hex('#fff4b8'), ROJO = hex('#d8402c'), PZ = T.PIEZAS_NX;
'''
E['nx-sabemos'] = ('Lo que sabemos', '''// NX-SABEMOS''', COMUN + r'''
const w1 = (s) => en('sabemos', (s - 0.9) / 12.585), w2 = (s) => en('roca2', (s - 14.513) / 11.762);
const P2 = w1(6.85), P3 = w1(13.75), P4 = w2(17.72), P5 = w2(21.62);
const p1 = (t) => { const o = { encuadre: 'sala', camara: 'tablilla', pequena: true, dibujo: 1 }; T.museo(R, t, o); T.museoDelante(R, t, o); };
const p2 = (t) => { const o = { encuadre: 'diluvio', camara: 'libros', cuantos: 3, tablilla: true, gente: 0.57 }; T.relato(R, t, o);
  R.actor(EL.turista1NX, 28, 178, t, { dir: 1 }); R.actor(EL.turista2NX, 112, 178, t, { dir: 1 }); R.actor(EL.pastorNX, 196, 178, t, { dir: -1 }); R.actor(EL.tecnicoNX, 238, 178, t, { dir: -1 });
  T.relatoDelante(R, t, o); };
const p3 = (t) => { const o = { encuadre: 'ladera', camara: 'cerca', epoca: 2026, hora: 'dia' }; T.ladera(R, t, o); T.laderaDelante(R, t, o); };
const p4 = (t) => { const o = { encuadre: 'corte', fase: 3 }; T.ladera(R, t, o); R.actor(EL.collins, 4, 74, t, { dir: 1 }); R.actor(EL.geologa3NX, 24, 74, t, { dir: 1 }); T.laderaDelante(R, t, o); };
const p5 = (t) => { const o = { encuadre: 'corte', plano: true, pasillos: 1, barras: 0 }; T.ladera(R, t, o); R.actor(EL.fundadorNX, 22, 74, t, { dir: 1 }); T.laderaDelante(R, t, o); };
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos: [], año: 2026 });
''')
E['nx-cierre'] = ('Cierre', '''// NX-CIERRE''', COMUN + r'''
const w = (s) => en('cierre', (s - 0.5) / 13.259);
const P2 = w(5.4), P3 = w(10.65);
const p1 = (t) => { const o = { encuadre: 'lista', camara: 'casillas', luz: 3 }; T.hoy(R, t, o); T.hoyDelante(R, t, o); };
const p2 = (t) => { const o = { encuadre: 'estudio', camara: 'mesa', mira: true }; T.hoy(R, t, o); T.g_barquito(R, 160, 109, 22, t, {}); T.hoyDelante(R, t, o); };
const p3 = (t) => { const o = { encuadre: 'estudio', pez: false }; T.hoy(R, t, o); const d = T.hoyDelante(R, t, o); T.g_barquito(R, d.agua[0], d.agua[1], 8, t, { pez: true }); };
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos: [], año: 2026 });
''')
