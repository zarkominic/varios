E = {}
E['th-edison'] = ('La Edison', '''// TH-EDISON (frase 9). Cuatro planos: la caja Edison en su mesa, con la bombilla del inventor que se enciende encima; la
// sede de cristal con la máquina bajo una sábana y un guardia que pasea; la firma del acuerdo de confidencialidad (con
// el candado); y dos empleados que quieren hablar entre departamentos y una puerta de cristal que se cierra entre ellos.''', r'''
const a = (f) => en('edison', f);
const P2 = a(0.28), P3 = a(0.52), P4 = a(0.75);
const p1 = (t) => { R.rect(0, 0, 319, 179, hex('#e8ecf0')); R.rect(0, 130, 319, 179, T.C.metalL); R.rect(0, 130, 319, 131, T.C.metal); T.edison(R, 160, 130, t, { s: 1.4 }); const l = t > a(0.18); T.bombilla(R, 160, 40, l ? 1 : 0); if (l) for (let k = 0; k < 8; k++) { const g = k * Math.PI / 4 + t; R.linea(Math.round(160 + Math.cos(g) * 24), Math.round(40 + Math.sin(g) * 24), Math.round(160 + Math.cos(g) * 30), Math.round(40 + Math.sin(g) * 30), T.C.oro); } };
const p2 = (t) => { T.sede(R, t); T.edison(R, 120, 108, t, { s: 0.7, sabana: 1 }); const u = (t - P2) * 0.12 % 2, x = Math.round(u < 1 ? lerp(40, 270, u) : lerp(270, 40, u - 1)); R.actor(EL.guardia, x, 160, t, { dir: u < 1 ? 1 : -1, anda: true }); R.actor(EL.tecnica, 220, 150, t, { dir: -1, quieto: true }); };
const p3 = (t) => T.firmaPapel(R, t, { firma: tramo(t, P3 + 0.4, P4 - 0.3) });
const p4 = (t) => { T.sede(R, t); const c = tramo(t, P4 + 0.8, P4 + 1.6);
  R.actor(EL.tecnico, 150, 156, t, { dir: 1, habla: c < 1 && Math.sin(t * 7) > 0, dedo: c < 1 }); R.actor(EL.tecnica, 184, 156, t, { dir: -1, quieto: true, sorpresa: c >= 1 });
  const x = Math.round(lerp(220, 170, c)); R.rect(x, 120, x + 3, 160, T.C.metalL); R.rect(x + 3, 120, x + 30, 160, T.C.cristalO); for (let k = 0; k < 8; k++) R.pset(x + 8 + k, 126 + k * 2, T.C.blanco);
  R.actor(EL.guardia, 270, 162, t, { dir: -1, quieto: true }); R.pset(293, 72, T.C.rojo); };
const efectos = [[a(0.18), 'interruptor'], [P2 + 0.5, 'toc'], [P3 + 0.4, 'firma'], [P4 + 0.8, 'puerta'], [P4 + 1.6, 'cerrojo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2008 });
''')

E['th-consejo'] = ('El consejo', '''// TH-CONSEJO (frases 10–11). Seis planos: el dinero cae sobre la mesa de la sala del consejo, vacía; entran los
// consejeros famosos, mayores, y se sientan; llega un general con su medalla; ella presenta con un tubito; el gag de la
// pipeta: un consejero la mira por el lado equivocado y le cae una gota en la nariz; todos asienten, y la «?» que flota
// sobre la mesa se apaga sin que nadie la pregunte.''', r'''
const a = (f) => en('consejo', f), b = (f) => en('pipeta', f);
const P2 = a(0.2), P3 = a(0.55), P4 = a(0.917), P5 = b(0.22), P6 = b(0.63);
const SILLAS = [56, 100, 144, 188, 232];
const sentados = (t, quien, o = {}) => quien.forEach((d, k) => d && R.actor(d, SILLAS[k] + 1, 146, t, { dir: 1, quieto: true, ...(o[k] || {}) }));
const p1 = (t) => { T.consejo(R, t); T.consejoMesa(R, t, { dinero: tramo(t, 0.3, P2 - 0.2) }); };
const p2 = (t) => { T.consejo(R, t); const q = [EL.consejero, EL.consejeroCalvo, null, EL.consejero, EL.profesor];
  q.forEach((d, k) => { if (!d) return; const u = tramo(t, P2 + 0.4 + k * 0.9, P2 + 1.8 + k * 0.9); if (u >= 1) R.actor(d, SILLAS[k] + 1, 146, t, { dir: 1, quieto: true, sonrisa: true }); else if (u > 0) R.actor(d, Math.round(lerp(-20, SILLAS[k] + 1, u)), 164, t, { dir: 1, anda: true }); });
  T.consejoMesa(R, t, { dinero: 1 }); };
const p3 = (t) => { T.consejo(R, t); sentados(t, [EL.consejero, EL.consejeroCalvo, null, EL.consejero, EL.profesor]); const u = tramo(t, a(0.7), a(0.86));
  if (u < 1) R.actor(EL.general, Math.round(lerp(330, 145, u)), 164, t, { dir: -1, anda: true }); else R.actor(EL.general, 145, 146, t, { dir: 1, quieto: true }); T.consejoMesa(R, t, { dinero: 1 });
  if (u >= 1 && Math.sin(t * 6) > 0) R.pset(152, 130, T.C.oroL); };
const p4 = (t) => { T.consejo(R, t, { sillas: [56, 100, 188, 232] }); sentados(t, [EL.consejero, EL.consejeroCalvo, null, EL.general, EL.profesor]); T.consejoMesa(R, t, { dinero: 1 }); R.actor(EL.holmes, 278, 172, t, { dir: -1, dedo: true, habla: Math.sin(t * 6) > 0 }); T.tubito(R, 276, 150, 1, 1); };
const p5 = (t) => { T.consejo(R, t); sentados(t, [EL.consejeroCalvo, EL.consejero, null, EL.general, null]);
  const x = 145; R.actor(EL.consejero, x, 146, t, { dir: 1, quieto: true, sorpresa: t > b(0.45) });
  // la pipeta al revés: la punta hacia el ojo y la pera hacia fuera; a la mitad, le cae la gota en la nariz
  R.linea(x + 14, 127, x + 30, 115, T.C.k); R.linea(x + 15, 127, x + 31, 115, hex('#c8e8f8')); R.disco(x + 32, 113, 3, T.C.k); R.disco(x + 32, 113, 2, T.C.rojo); T.mano(R, x + 24, 121, 1, '#2a3460');
  const g = tramo(t, b(0.4), b(0.46)); if (g > 0 && g < 1) R.disco(Math.round(lerp(x + 14, x + 12, g)), Math.round(lerp(127, 131, g)), 1, T.C.sangre); if (g >= 1) R.pset(x + 12, 131, T.C.sangre);
  T.consejoMesa(R, t, { dinero: 1 }); };
const p6 = (t) => { T.consejo(R, t); const s = Math.floor(t * 2) % 2; sentados(t, [EL.consejero, EL.consejeroCalvo, EL.general, EL.consejero, EL.profesor], { 0: { sonrisa: true }, 1: { sonrisa: true, salto: s }, 2: { sonrisa: true }, 3: { sonrisa: true, salto: 1 - s }, 4: { sonrisa: true } });
  T.consejoMesa(R, t, { dinero: 1 }); const f = 1 - tramo(t, b(0.8), b(0.98)); if (f > 0.05 && Math.floor(t * 8) % (f < 0.4 ? 2 : 1) === 0) R.icono('?', 150, 86, T.C.rojo, T.C.k, 3); };
const efectos = [[0.4, 'papel'], [P2 + 0.4, 'puerta'], [P3 + 0.3, 'puerta'], [b(0.46), 'chof'], [b(0.8), 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: (t) => (t < P4 ? 2011 : 2012) });
''')

E['th-farmacias'] = ('Las farmacias', '''// TH-FARMACIAS (frase 12). Tres planos: en la farmacia de Palo Alto se descubre el rincón de Theranos (cae la tela) y la
// gente aplaude; en el mapa de EE. UU. cae la chincheta de Palo Alto; el mapa se acerca a Arizona y caen unas cuarenta
// chinchetas alrededor de Phoenix, una tras otra.''', r'''
const a = (f) => en('farmacias', f);
const P2 = a(0.33), P3 = a(0.62);
const p1 = (t) => { T.farmacia(R, t); const cae = tramo(t, a(0.12), a(0.2)); if (cae < 1) { const y = Math.round(lerp(92, 140, cae)); R.rect(90, y, 230, 140, hex('#c83a4a')); for (let x = 96; x < 230; x += 10) R.rect(x, y, x + 1, 140, hex('#a82a3a')); }
  [EL.holmes, EL.senor30, EL.clienta, EL.senora30, EL.chico].forEach((d, k) => R.actor(d, 70 + k * 40, 168, t, { dir: k ? -1 : 1, sonrisa: cae >= 1, brazos: cae >= 1 && Math.floor(t * 4 + k) % 2 === 0 })); };
const p2 = (t) => { const P = T.mapa(R, t); const [x, y] = P(T.LUGARES.paloAlto).map(Math.round); T.chincheta(R, x, y, t, T.C.rojo, { baja: tramo(t, P2 + 0.3, P2 + 0.8), pulso: true }); };
const p3 = (t) => { const P = T.mapa(R, t, { zoom: 1 }); T.FARMACIAS_AZ.forEach((ll, k) => { const [x, y] = P(ll).map(Math.round); T.chincheta(R, x, y, t, k % 3 ? T.C.tealT : T.C.verdeT, { baja: tramo(t, P3 + 0.5 + k * 0.08, P3 + 0.9 + k * 0.08) }); }); };
const efectos = [[a(0.14), 'whoosh'], [a(0.22), 'palmada'], [P2 + 0.8, 'golpecito'], ...Array.from({ length: 8 }, (_, k) => [P3 + 0.9 + k * 0.4, 'golpecito'])];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2013 });
''')

E['th-valor'] = ('Nueve mil millones', '''// TH-VALOR (frase 13), 2014, cartela «2014». Tres planos: en la sala del consejo el marcador sube hasta
// $9,000,000,000 mientras los inversores aplauden; la tarta partida por la mitad, con la mitad de ella en dorado; y la
// portada de revista con la silueta del jersey negro, en un quiosco por el que pasa la gente (golpe).''', r'''
const a = (f) => en('valor', f);
const P2 = a(0.37), P3 = a(0.72);
const p1 = (t) => { T.consejo(R, t); T.contador(R, t, 9e9 * tramo(t, 1.5, a(0.32)) ** 0.6, { y: 36 }); [EL.consejero, EL.consejeroCalvo, EL.general, EL.consejero, EL.profesor].forEach((d, k) => R.actor(d, [56, 100, 144, 188, 232][k] + 1, 146, t, { dir: 1, quieto: true, sonrisa: true, brazos: t > a(0.3) && Math.floor(t * 4 + k) % 2 === 0 })); T.consejoMesa(R, t, { dinero: 1 }); };
const p2 = (t) => { T.consejo(R, t); R.rect(98, 38, 222, 152, T.C.k); R.rect(100, 40, 220, 150, hex('#2a2e3a')); R.linea(110, 152, 100, 179, T.C.maderaS); R.linea(210, 152, 220, 179, T.C.maderaS); const u = tramo(t, P2 + 0.2, P2 + 1.2); for (let j = -44; j <= 44; j++) for (let i = -44; i <= 44; i++) { if (i * i + j * j > 1936) continue; const ang = Math.atan2(j, i); const mia = ang < -Math.PI / 2 + Math.PI * u && ang > -Math.PI / 2 - 0.0001 || (u >= 1 && i >= 0); R.pset(160 + i, 96 + j, i * i + j * j > 1820 ? T.C.k : mia ? T.C.oro : hex('#5a6270')); }
  R.rect(160, 52, 160, 140, T.C.k); R.actor(EL.holmes, 236, 164, t, { dir: -1, dedo: true, sonrisa: true }); R.actor(EL.consejero, 60, 164, t, { dir: 1, sonrisa: true, brazos: Math.floor(t * 3) % 2 === 0 }); R.numero('50%', 128, 104, { tam: 16, centro: true }); };
const p3 = (t) => { T.revista(R, t); };
const efectos = [[1.6, 'tecleo'], [a(0.32), 'brillo'], [a(0.33), 'palmada'], [P2 + 0.3, 'whoosh'], [P3 + 0.2, 'flash']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { cartela: '2014', efectos, año: 2014 });
''')

E['th-gota'] = ('Lo que cabe en una gota', '''// TH-GOTA (frases 14–15). Seis planos: el brazo con la goma y la aguja; los tubos que se llenan y la cucharadita al lado;
// en el laboratorio, la cinta lleva los tubos a las máquinas, que cuentan azúcar, colesterol, hierro y hormonas (iconos
// que saltan de los analizadores); la máquina que cuenta moléculas de colores; la molécula rara que casi no se ve; y el
// gag del pajar: un granjero diminuto busca la aguja con una lupa enorme.''', r'''
const a = (f) => en('tubos', f), b = (f) => en('moleculas', f);
const P2 = a(0.2), P2b = a(0.48), P3 = a(0.72), P4 = b(0), P5 = b(0.33), P6 = b(0.72);
const p1 = (t) => { T.farmacia(R, t, { rincon: false }); R.actor(EL.senor30, 150, 152, t, { dir: 1, quieto: true }); R.actor(EL.enfermera, 176, 152, t, { dir: -1, quieto: true }); T.mano(R, 166, 140, -1, '#4aa8a0'); R.rect(150, 140, 160, 141, T.C.k); R.actor(EL.chica, Math.round(lerp(-20, 330, (t * 0.06) % 1)), 172, t, { dir: 1, anda: true }); };
const p2 = (t) => T.insertoTubos(R, t, { tubos: tramo(t, P2 + 0.5, P2b - 0.3) * 3 });
const p2b = (t) => T.cucharaMesa(R, t);
const p3 = (t) => { T.laboratorio(R, t); R.actor(EL.tecnica, 150, 164, t, { dir: 1, quieto: true }); R.actor(EL.tecnico, 100, 162, t, { dir: 1, anda: true });
  const iconos = [['gota', T.C.sangre], ['pila', T.C.amarilloT], ['corona', T.C.oro], ['luna', T.C.tealT]]; iconos.forEach(([n, c], k) => { const u = tramo(t, a(0.82) + k * 0.6, a(0.82) + k * 0.6 + 1); if (u <= 0) return; const x = 210 + (k % 2) * 60, y = Math.round(lerp(40, 22, u)); R.rect(x - 6, y - 6, x + 8, y + 8, T.C.k); R.rect(x - 5, y - 5, x + 7, y + 7, T.C.blanco); R.icono(n, x - 2, y - 2, c, T.C.k); }); };
const p4 = (t) => T.insertoMoleculas(R, t, {});
const p5 = (t) => T.insertoMoleculas(R, t, { rara: true });
const p6 = (t) => { T.pajar(R, t); const u = (t - P6) * 0.25 % 2, x = Math.round(u < 1 ? lerp(80, 220, u) : lerp(220, 80, u - 1)); R.actor(EL.brazel ?? EL.senor30, x, 168, t, { dir: u < 1 ? 1 : -1, anda: true }); T.lupa(R, x + (u < 1 ? 22 : -8), 150, 7); };
const efectos = [[P2 + 0.5, 'gluglu'], [P2b + 0.2, 'golpecito'], [P3 + 0.3, 'zumbido'], [a(0.82), 'bip'], [a(0.88), 'bip'], [P4 + 0.2, 'burbujas'], [b(0.92), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P2b, p2b], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: 2014 });
''')

E['th-dedo'] = ('La gota del dedo', '''// TH-DEDO (frases 16–18). Cinco planos: la gota del dedo frente a la cucharadita, «÷100»; el dedo apretado, con el
// líquido de los tejidos que se cuela en la gota; el medidor de azúcar de casa con su número; las decenas de pruebas que
// hacen cola para entrar en una sola gota y rebotan (gag); y la caja Edison envuelta como un regalo.''', r'''
const a = (f) => en('gota', f), b = (f) => en('azucar', f), c = (f) => en('resuelto', f);
const P2 = a(0.5), P3 = b(0), P4 = b(0.36), P4b = b(0.72), P5 = c(0);
const p1 = (t) => T.gotaCuchara(R, t, { tejido: 0 });
const p2 = (t) => { T.insertoDedo(R, t, { gota: 1 }); const e = tramo(t, a(0.64), a(0.84)); for (let k = 0; k < 10; k++) { const ang = k * 0.63 + t * 0.6, r = 16 - e * 12; R.pset(Math.round(161 + Math.cos(ang) * r), Math.round(101 + Math.sin(ang) * r * 0.7), hex('#7ab8e0')); } if (e > 0.8) { R.disco(161, 101, 2, hex('#e87888')); R.pset(160, 100, T.C.blanco); } };
const p3 = (t) => { T.medidorAzucar(R, t, { valor: t < b(0.24) ? Math.floor(t * 20) % 100 : 98 }); R.rect(230, 100, 252, 128, T.C.k); R.rect(231, 101, 251, 127, T.C.blanco); for (let k = 0; k < 3; k++) R.linea(236 + k * 6, 98 - Math.round(((t * 8 + k * 5) % 14)), 238 + k * 6, 92 - Math.round(((t * 8 + k * 5) % 14)), T.C.grisL); };
const p4 = (t) => T.noCaben(R, t);
const p4b = (t) => { T.labHoy(R, t); [[EL.tecnica, 70], [EL.tecnico, 120], [EL.erika, 236]].forEach(([d, x], k) => { R.actor(d, x, 160, t, { dir: k === 2 ? -1 : 1, quieto: true }); if (Math.floor(t * 2 + k) % 3) R.icono('?', x + 4, 124, T.C.rojo, T.C.k); }); };
const p5 = (t) => { R.rect(0, 0, 319, 179, hex('#f4f0e8')); R.rect(0, 140, 319, 179, T.C.maderaL); R.rect(0, 140, 319, 142, T.C.madera); T.edison(R, 160, 140, t, { s: 1.2 }); T.lazo(R, 160, 140, t, 1.2); };
const efectos = [[0.4, 'pop'], [a(0.52), 'masca'], [P3 + 0.3, 'bip'], [b(0.24), 'bip'], [P4 + 0.5, 'boing'], [P4 + 2.1, 'boing'], [P5 + 0.2, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P4b, p4b], [P5, p5]], { efectos, año: 2014 });
''')
