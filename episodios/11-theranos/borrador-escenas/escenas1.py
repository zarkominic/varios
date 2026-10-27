E = {}
E['th-gancho'] = ('Gancho', '''// TH-GANCHO (frases 1–3), 2013, cartela «2013». Ocho planos:
// 1. la clienta entra por la puerta automática de la farmacia y va al rincón de Theranos; otros clientes compran;
// 2. se sienta en el sillón; la enfermera prepara la lanceta;  3. el pinchazo en el dedo, la gota y el tubito;
// 4. la promesa: de la gota salen decenas de pruebas;  5. la inventora del jersey negro junto a su máquina, «29»;
// 6. el contador sube hasta $9,000,000,000;  7. la enfermera mete el tubito en la nevera de transporte y un mensajero se
// lo lleva;  8. detrás de una puerta, en el laboratorio, el tubito acaba en las máquinas grandes de otras marcas (golpe).''', r'''
const a = (f) => en('farmacia', f), b = (f) => en('promesa', f), c = (f) => en('secreto', f);
const P2 = a(0.3), P3 = a(0.64), P4 = b(0), P5 = b(0.34), P6 = b(0.76), P7 = c(0), P8 = c(0.46);
const pica = a(0.69), recoge = a(0.78), veintinueve = b(0.47), jersey = b(0.64), otras = c(0.9);
const p1 = (t) => {
  const u = tramo(t, 1.7, P2 - 0.4);
  T.farmacia(R, t, { puerta: tramo(t, 1.3, 1.8) - tramo(t, P2 - 2, P2 - 1.4) });
  R.actor(EL.senora30, 252, 158, t, { dir: -1, quieto: true });
  R.actor(EL.enfermera, 196, 146, t, { dir: -1, sonrisa: u > 0.6, dedo: u > 0.75 && u < 1 });
  R.actor(EL.clienta, Math.round(lerp(4, 132, u)), 152, t, { dir: 1, anda: u > 0 && u < 1 });
  const v = tramo(t, 2.4, P2); R.actor(EL.senor30, Math.round(lerp(330, 210, v)), 170, t, { dir: -1, anda: v > 0 && v < 1 });
  if (v > 0) { const x = Math.round(lerp(330, 210, v)) - 8; R.rect(x, 162, x + 8, 167, T.C.k); R.rect(x + 1, 163, x + 7, 166, T.C.rojoW); }
};
const p2 = (t) => {
  T.farmacia(R, t); const v = tramo(t, P2 + 0.5, P3);
  R.actor(EL.clienta, 150, 134, t, { dir: 1, quieto: true, sonrisa: true }); T.sillonDelante(R, 150, 140);
  R.actor(EL.enfermera, 182, 146, t, { dir: -1, habla: Math.sin(t * 7) > 0 && t < P2 + 2, dedo: t > P3 - 2 });
  if (t > P3 - 2) { R.rect(179, 117, 183, 125, T.C.k); R.rect(180, 118, 182, 124, T.C.tealT); }   // la lanceta en la mano
  R.actor(EL.senor30, Math.round(lerp(-20, 330, v)), 172, t, { dir: 1, anda: true });
};
const p3 = (t) => T.insertoDedo(R, t, { pica: t < pica ? tramo(t, pica - 0.7, pica) : 1 + tramo(t, pica, pica + 0.8) * 0.8, gota: tramo(t, pica + 0.15, pica + 1.1), recoge: tramo(t, recoge - 0.2, P4 - 0.3) });
const p4 = (t) => T.promesa(R, t, { u: tramo(t, P4 + 0.2, b(0.32)) });
const p5 = (t) => {
  T.sede(R, t); R.rect(176, 132, 212, 158, T.C.k); R.rect(177, 133, 211, 158, T.C.blanco); T.edison(R, 194, 132, t, { s: 0.6 });
  R.actor(EL.holmes, 140, 158, t, { dir: 1, dedo: t > P5 + 1, sonrisa: true, habla: Math.sin(t * 6) > 0.2 });
  R.actor(EL.guardia, 266, 150, t, { dir: -1, quieto: true });
  const e = tramo(t, veintinueve, veintinueve + 0.4); if (e > 0) R.numero('29', 148, Math.round(lerp(140, 118, e)), { tam: 16, centro: true });
  if (t > jersey && t < jersey + 1.6 && Math.floor(t * 4) % 2) { R.rect(139, 130, 156, 159, T.C.amarilloT); R.actor(EL.holmes, 140, 158, t, { dir: 1, dedo: true, sonrisa: true }); }
};
const p6 = (t) => { T.sede(R, t); T.tinte(R, 0, 179, [20, 24, 40], 0.55); T.logoTheranos(R, 160, 48, 1.6, t); T.contador(R, t, 9e9 * tramo(t, P6 + 0.2, b(0.97)) ** 0.5, { y: 92 }); };
const p7 = (t) => {
  T.farmacia(R, t, { puerta: tramo(t, c(0.2), c(0.26)) });
  const u = tramo(t, P7 + 0.3, c(0.2)), w = tramo(t, c(0.22), P8 - 0.2);
  R.actor(EL.enfermera, 196, 146, t, { dir: 1, quieto: true });
  const cx = 212; if (w === 0) { R.rect(cx, 134, cx + 14, 146, T.C.k); R.rect(cx + 1, 135, cx + 13, 145, T.C.blanco); R.rect(cx, 132, cx + 14, 135, T.C.k); R.rect(cx + 1, 133, cx + 13, 134, hex('#3a6ac8')); }
  if (u < 1) T.tubito(R, Math.round(lerp(200, 218, u)), Math.round(lerp(124, 136, u)), 1, 1);
  R.actor(EL.clienta, Math.round(lerp(150, 20, tramo(t, P7 + 0.6, c(0.3)))), 156, t, { dir: -1, anda: t > P7 + 0.6 && t < c(0.3), sonrisa: true, dedo: t < P7 + 0.6 });
  const mx = Math.round(lerp(330, 220, tramo(t, P7 + 0.5, c(0.2))) - lerp(0, 230, w)); R.actor(EL.agente, mx, 160, t, { dir: w > 0 ? -1 : -1, anda: (t > P7 + 0.5 && t < c(0.2)) || (w > 0 && w < 1) });
  if (w > 0) { R.rect(mx - 10, 144, mx + 2, 154, T.C.k); R.rect(mx - 9, 145, mx + 1, 153, T.C.blanco); R.rect(mx - 9, 145, mx + 1, 146, hex('#3a6ac8')); }
};
const p8 = (t) => {
  T.laboratorio(R, t);
  const u = tramo(t, P8 + 0.4, c(0.75)); R.actor(EL.tecnico, Math.round(lerp(10, 176, u)), 160, t, { dir: 1, anda: u > 0 && u < 1 });
  if (u < 1) T.tubito(R, Math.round(lerp(10, 176, u)) + 14, 146, 1, 1);
  R.actor(EL.tecnica, 236, 162, t, { dir: -1, quieto: true });
  if (t > otras && Math.floor(t * 5) % 2) for (const x0 of [196, 256]) { R.rect(x0 - 2, 38, x0 + 58, 39, T.C.amarilloT); R.rect(x0 - 2, 141, x0 + 58, 142, T.C.amarilloT); R.rect(x0 - 2, 38, x0 - 1, 142, T.C.amarilloT); R.rect(x0 + 57, 38, x0 + 58, 142, T.C.amarilloT); }
  // la puerta que se cierra por delante, dejando el laboratorio a escondidas
  const cierra = tramo(t, E.duracion - 1.2, E.duracion - 0.3); if (cierra > 0) { const w = Math.round(cierra * 160); R.rect(0, 0, w, 179, T.C.metalS); R.rect(319 - w, 0, 319, 179, T.C.metalS); R.rect(w - 2, 0, w, 179, T.C.k); R.rect(319 - w, 0, 321 - w, 179, T.C.k); }
};
const efectos = [[1.35, 'puerta'], [pica, 'pop'], [recoge, 'gluglu'], [P4 + 0.3, 'brillo'], [veintinueve, 'pop'], [P6 + 0.3, 'tecleo'], [b(0.97), 'brillo'], [c(0.2), 'puerta'], [P8 + 0.2, 'zumbido'], [E.duracion - 0.4, 'cerrojo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8]], { cartela: '2013', efectos, año: 2013 });
''')

E['th-vuelta'] = ('Trece años después', '''// TH-VUELTA (frase 4). Hoy, 2026: el campo federal de Texas al amanecer; la cola del cine con el cartel del documental;
// todo se rebobina (la barra del año baja de 2026 a 2003, con destellos de la sede y de la farmacia); el cuarto de la
// residencia en 2003: la joven del cartel de la jeringa tachada se estremece (le daban miedo las agujas).''', r'''
const a = (f) => en('vuelta', f);
const P2 = a(0.25), P3 = a(0.52), P4 = a(0.74);
const p1 = (t) => { T.prision(R, t); };
const p2 = (t) => { T.cine(R, t); [EL.senor30, EL.senora30, EL.chico, EL.sudadera, EL.chica, EL.oficinista].forEach((d, k) => R.actor(d, 112 + k * 17 + Math.round(tramo(t, P2 + 1 + k * 0.3, P2 + 2 + k * 0.3) * -4), 146, t, { dir: -1, quieto: k % 2 === 0 })); T.cocheOscuro(R, Math.round(lerp(360, -60, tramo(t, P2, P3))), 172, t, { dir: -1 }); };
const p3 = (t) => { const u = tramo(t, P3, P4); const k = Math.floor(u * 4); [() => T.cine(R, t), () => T.sede(R, t), () => T.farmacia(R, t), () => T.stanford(R, t)][Math.min(3, k)](); T.rebobinar(R, t, 1); };
const p4 = (t) => { T.cuarto(R, t); const s = t > a(0.94); R.actor(EL.holmes, 118, 132, t, { dir: 1, quieto: true, sorpresa: s }); if (s) for (const [dx, dy] of [[-3, -16], [17, -16], [-4, -10], [18, -10]]) R.pset(118 + 7 + dx, 132 - 12 + dy, T.C.k); T.cuartoMesa(R, t, { dibujo: 0 }); };
const año = (t) => t < P3 ? 2026 : t < P4 ? Math.round(lerp(2026, 2003, tramo(t, P3, P4))) : 2003;
const efectos = [[P3, 'whoosh'], [P3 + 0.6, 'whoosh'], [P3 + 1.2, 'whoosh'], [a(0.94), 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')

E['th-hola'] = ('Hola', '''// TH-HOLA (frase 5): una gota de sangre enorme sobre fondo oscuro, que late; Atom se presenta.''', r'''
const efectos = [[0.3, 'brillo']];
T.rodar(E, R, [[0, (t) => T.gotaGigante(R, t)]], { efectos });
''')

E['th-stanford'] = ('Stanford', '''// TH-STANFORD (frases 6–7), 2003, cartela «2003». Seis planos:
// 1. el patio de Stanford con sus arcos y palmeras; pasan bicis; la estudiante de diecinueve años cruza con sus libros;
// 2. de noche, en su cuarto, dibuja un aparato que analiza una gota;  3. el gag del niño y la jeringa: en la consulta, el
// niño se esconde detrás de su madre al ver la aguja; la enfermera la guarda y le enseña una gota; él sonríe;
// 4. convence a su profesor en el camino; 5. sale de la facultad con una caja: lo deja;  6. el letrero nuevo de la
// empresa: una gota y una lupa que se juntan en el logotipo de Theranos.''', r'''
const a = (f) => en('idea', f), b = (f) => en('deja', f);
const P2 = a(0.38), P3 = a(0.7), P4 = b(0), P5 = b(0.355), P6 = b(0.71);
const p1 = (t) => { T.stanford(R, t); const u = tramo(t, 1.5, P2 - 0.3); R.actor(EL.holmes, Math.round(lerp(40, 180, u)), 150, t, { dir: 1, anda: u > 0 && u < 1 }); R.rect(Math.round(lerp(40, 180, u)) + 12, 136, Math.round(lerp(40, 180, u)) + 17, 140, hex('#3a5a8a'));
  R.actor(EL.chico, 250, 160, t, { dir: -1, quieto: true }); R.actor(EL.chica, 266, 160, t, { dir: -1, habla: Math.sin(t * 5) > 0 }); };
const p2 = (t) => { T.cuarto(R, t); R.actor(EL.holmes, 118, 132, t, { dir: 1, quieto: true, sonrisa: t > P2 + 2 }); T.cuartoMesa(R, t, { dibujo: tramo(t, P2 + 0.3, P3 - 0.4) }); };
const p3 = (t) => { T.farmacia(R, t, { rincon: false }); const guarda = a(0.9);
  R.actor(EL.senora30, 150, 158, t, { dir: 1, quieto: true }); const esc = t < guarda; R.actor(EL.chico, esc ? 136 : 168, 160, t, { dir: 1, sorpresa: esc, sonrisa: !esc, salto: !esc && t < guarda + 0.5 ? 2 : 0 });
  R.actor(EL.enfermera, 200, 158, t, { dir: -1, dedo: true });
  if (esc) { R.rect(176, 128, 196, 131, T.C.k); R.rect(177, 129, 195, 130, hex('#c8e8f8')); R.rect(170, 129, 176, 130, T.C.metalD); R.rect(196, 127, 199, 132, T.C.k); }   // la jeringa
  else { R.disco(196, 130, 3, T.C.sangreS); R.disco(196, 130, 2, T.C.sangre); } };
const p4 = (t) => { T.stanford(R, t, { tarde: true }); R.actor(EL.holmes, 140, 154, t, { dir: 1, habla: Math.sin(t * 6) > 0, dedo: t > P4 + 1.5 }); R.actor(EL.profesor, 164, 154, t, { dir: -1, quieto: true, sorpresa: t > P4 + 1 && t < P4 + 2.4, sonrisa: t > P4 + 2.4 }); };
const p5 = (t) => { T.stanford(R, t, { tarde: true }); const u = tramo(t, P5 + 0.2, P6 - 0.3); const x = Math.round(lerp(150, 330, u)); R.actor(EL.holmes, x, 150, t, { dir: 1, anda: u > 0 && u < 1 }); R.rect(x + 10, 132, x + 22, 142, T.C.k); R.rect(x + 11, 133, x + 21, 141, T.C.ocre); R.rect(x + 13, 130, x + 15, 133, hex('#3a5a8a')); };
const p6 = (t) => { T.sede(R, t, { descuelga: 0 }); const j = tramo(t, P6 + 0.6, b(0.86));
  if (j < 1) { const x1 = Math.round(lerp(90, 160, j)), x2 = Math.round(lerp(230, 160, j)); R.disco(x1, 46, 6, T.C.sangreS); R.disco(x1, 46, 5, T.C.sangre); T.lupa(R, x2, 46, 6); }
  R.actor(EL.holmes, 120, 158, t, { dir: 1, dedo: j >= 1, sonrisa: true }); R.actor(EL.tecnico, 200, 158, t, { dir: -1, quieto: true }); };
const efectos = [[P2 + 0.3, 'lapiz'], [a(0.9), 'boing'], [P5 + 0.2, 'puerta'], [b(0.86), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { cartela: '2003', efectos, año: (t) => (t < P5 ? 2003 : 2004) });
''')

E['th-jobs'] = ('Steve Jobs', '''// TH-JOBS (frase 8). Tres planos: el armario con diez jerséis negros iguales (gag: la percha que queda vacía); en el
// escenario, presenta su máquina en una pantalla gigante como si fuera un teléfono, con los flashes del público; y una
// caja Edison en el mostrador de una farmacia, con la gente que sonríe.''', r'''
const a = (f) => en('jobs', f);
const P2 = a(0.33), P3 = a(0.72);
const p1 = (t) => { T.armario(R, t, { abre: tramo(t, 0.4, 1.6) }); const saca = tramo(t, a(0.24), a(0.3)); if (saca > 0) { R.rect(46 + 9 * 24, 44, 62 + 9 * 24, 120, hex('#f4f2ee')); T.mano(R, 54 + 9 * 24, Math.round(lerp(80, 200, saca)), -1, '#1e1e28'); } };
const p2 = (t) => { T.plato(R, t); R.actor(EL.holmes, 140, 140, t, { dir: 1, dedo: true, habla: Math.sin(t * 6) > 0 });
  for (let k = 0; k < 4; k++) if (Math.sin(t * 3 + k * 1.7) > 0.93) { const x = 40 + k * 70; for (let r = 1; r < 5; r++) { R.pset(x + r, 160, T.C.blanco); R.pset(x - r, 160, T.C.blanco); R.pset(x, 160 + r, T.C.blanco); R.pset(x, 160 - r, T.C.blanco); } }
  for (let k = 0; k < 12; k++) { const x = 10 + k * 27; R.disco(x, 176, 8, T.C.k); R.disco(x, 175, 7, ['#2a2430', '#4a3a2a', '#c8a060', '#1e1a24'].map(hex)[k % 4]); } T.platoCamaras(R, t); };
const p3 = (t) => { T.farmacia(R, t); R.rect(176, 132, 212, 140, T.C.k); R.rect(177, 133, 211, 140, T.C.blanco); T.edison(R, 194, 132, t, { s: 0.5 }); R.actor(EL.clienta, 140, 158, t, { dir: 1, sonrisa: true, quieto: true }); R.actor(EL.senor30, 230, 160, t, { dir: -1, sonrisa: true }); R.actor(EL.chica, 110, 166, t, { dir: 1, anda: true }); };
const efectos = [[0.4, 'puerta'], [P2 + 0.4, 'flash'], [P2 + 1.6, 'flash'], [P3 + 0.3, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2004 });
''')
