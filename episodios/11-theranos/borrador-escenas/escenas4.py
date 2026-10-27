E = {}
E['th-juicio'] = ('El juicio', '''// TH-JUICIO (frases 30–31), 2022, cartela «2022». Seis planos: la sala del tribunal de San José, con el juez, el jurado
// y ella en la mesa de la defensa; el mazo que golpea; el veredicto en dos columnas (inversores: cuatro cargos; pacientes:
// ninguno); su condena en meses, con ella pequeñita delante; Balwani de pie ante el juez; y las dos condenas juntas.''', r'''
const a = (f) => en('veredicto', f), b = (f) => en('condena', f);
const P2 = a(0.33), P3 = a(0.58), P4 = b(0), P5 = b(0.36), P6 = b(0.7);
const sala = (t, o = {}) => { T.tribunal(R, t, { detras: (R, t) => R.actor(EL.juez, 152, 74, t, { dir: 1, quieto: true, habla: o.habla && Math.sin(t * 6) > 0 }) }); R.actor(EL.holmes, 70, 156, t, { dir: 1, quieto: true }); R.actor(EL.oficinista, 96, 156, t, { dir: 1, quieto: true }); if (o.balwani) R.actor(EL.balwani, 214, 158, t, { dir: -1, quieto: true }); T.tribunalDelante(R, t); };
const p1 = (t) => sala(t);
const p2 = (t) => T.mazo(R, t, { golpe: a(0.49) });
const p3 = (t) => T.veredicto(R, t, { u: tramo(t, P3 + 0.2, a(0.95)) });
const p4 = (t) => { T.condenas(R, t, { u: tramo(t, P4 + 0.2, b(0.3)) }); R.rect(0, 112, 319, 179, hex('#2a2e3a')); R.actor(EL.holmes, 20, 84, t, { dir: 1, quieto: true }); };
const p5 = (t) => sala(t, { balwani: true, habla: true });
const p6 = (t) => { T.condenas(R, t, { u: 1 }); R.actor(EL.holmes, 20, 84, t, { dir: 1, quieto: true }); R.actor(EL.balwani, 20, 140, t, { dir: 1, quieto: true }); };
const efectos = [[a(0.49), 'sello'], [P3 + 0.3, 'tic'], [P3 + 1, 'tic'], [P4 + 0.3, 'tecleo'], [P6 + 0.2, 'tecleo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { cartela: '2022', efectos, año: 2022 });
''')

E['th-prision'] = ('La prisión', '''// TH-PRISION (frase 32). El campo federal de Texas al amanecer: un coche oscuro llega por el camino hasta la entrada.''', r'''
const P2 = en('prision', 0.45);
const efectos = [[0.3, 'papel'], [P2 + 0.2, 'motor'], [E.duracion - 1, 'puerta']];
T.rodar(E, R, [[0, (t) => T.calendario(R, t, { u: tramo(t, 0.2, P2 - 0.8) })], [P2, (t) => T.prision(R, t, { coche: tramo(t, P2 + 0.2, E.duracion - 1.2) })]], { efectos, año: 2023 });
''')

E['th-documental'] = ('El documental', '''// TH-DOCUMENTAL (frase 33), 2026, cartela «2026». Dos planos: la cola del cine con el cartel de la película (un coche pasa
// por delante); y dentro, la pantalla con una cámara que la sigue a todas partes, y el público de espaldas.''', r'''
const a = (f) => en('documental', f);
const P2 = a(0.36), P3 = a(0.68);
const p1 = (t) => { T.cine(R, t); [EL.senor30, EL.senora30, EL.chico, EL.sudadera, EL.chica, EL.oficinista].forEach((d, k) => { const avanza = tramo(t, 2 + k * 0.4, 3 + k * 0.4); R.actor(d, 120 + k * 17 - Math.round(avanza * 6), 146, t, { dir: -1, anda: avanza > 0 && avanza < 1, habla: k === 1 && Math.sin(t * 5) > 0 }); }); T.cocheOscuro(R, Math.round(lerp(-60, 360, tramo(t, 2.6, P2))), 172, t, { dir: 1 }); };
const p2 = (t) => T.salaCine(R, t);
const p3 = (t) => T.visor(R, t, { dia: Math.min(34, Math.max(1, Math.round(tramo(t, P3, E.duracion - 1) * 34))) });
const efectos = [[2.6, 'motor'], [P2 + 0.2, 'whoosh'], [P3 + 0.2, 'bip']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { cartela: '2026', efectos, año: 2026 });
''')

E['th-hoy'] = ('Hoy', '''// TH-HOY (frase 34). Dos planos: desde la prisión sale una carta, que vuela como un pájaro; y Erika Cheung da una charla
// ante gente que empieza empresas: en la pantalla, la «?» que se convierte en «✓».''', r'''
const a = (f) => en('inocencia', f);
const P1b = a(0.3), P2 = a(0.62);
const p1 = (t) => T.prision(R, t, { carta: tramo(t, a(0.06), P1b) });
const p1b = (t) => { T.laboratorio(R, t, { rojo: true }); R.actor(EL.erika, 120, 162, t, { dir: 1, dedo: true, habla: Math.sin(t * 6) > 0 }); R.actor(EL.tyler, 92, 162, t, { dir: 1, quieto: true }); };
const p2 = (t) => { T.charla(R, t, { visto: t > a(0.66) }); R.actor(EL.erika, 196, 104, t, { dir: -1, habla: Math.sin(t * 6) > 0, dedo: t > a(0.6) }); };
const efectos = [[a(0.06), 'papel'], [P1b + 0.3, 'aviso'], [P2 + 0.2, 'palmada'], [a(0.7), 'brillo']];
T.rodar(E, R, [[0, p1], [P1b, p1b], [P2, p2]], { efectos, año: (t) => (t < P1b || t >= P2 ? 2026 : 2014) });
''')

E['th-idea'] = ('La idea no era una locura', '''// TH-IDEA (frases 35–36). Cuatro planos: un laboratorio de hoy, luminoso, con pruebas de pocas gotas que sí existen para
// algunas cosas; el chip de cerca, con las gotitas que corren y tres resultados comprobados; la sábana que se levanta
// de la caja de la promesa y debajo solo hay una «?»; y la clienta del principio con su papel de resultados y una «?».''', r'''
const a = (f) => en('idea2', f), b = (f) => en('problema', f);
const P1b = a(0.3), P2 = a(0.62), P3 = b(0), P4 = b(0.5);
const p0 = (t) => { T.cuarto(R, t); R.actor(EL.holmes, 118, 132, t, { dir: 1, quieto: true }); T.cuartoMesa(R, t, { dibujo: 1 }); };
const p1 = (t) => { T.labHoy(R, t); R.actor(EL.tecnica, 90, 132, t, { dir: 1, quieto: true }); const u = (t * 0.12) % 1; R.actor(EL.tecnico, Math.round(lerp(300, 180, u)), 160, t, { dir: -1, anda: true }); };
const p2 = (t) => T.chipCerca(R, t, { u: tramo(t, P2 + 0.3, P3 - 0.5) });
const p3 = (t) => { T.plato(R, t); const l = tramo(t, b(0.28), b(0.38)); T.edison(R, 160, 130, t, { s: 1.2, sabana: 1 - l }); if (l >= 1) { R.rect(112, 90, 208, 130, hex('#3a4462')); R.icono('?', 150, 92, T.C.rojo, T.C.k, 4); }
  R.actor(EL.holmes, 70, 168, t, { dir: 1, dedo: l < 1, habla: l < 1 && Math.sin(t * 6) > 0 }); T.platoCamaras(R, t); };
const p4 = (t) => { T.farmacia(R, t, { rincon: false }); R.actor(EL.clienta, 150, 158, t, { dir: 1, quieto: true, triste: t > b(0.8) }); R.rect(166, 138, 178, 152, T.C.k); R.rect(167, 139, 177, 151, T.C.blanco); for (let k = 0; k < 4; k++) R.rect(169, 141 + k * 3, 175, 141 + k * 3, k === 2 ? T.C.rojo : hex('#9aa0ac')); if (t > b(0.76)) R.icono('?', 154, 116, T.C.rojo, T.C.k, 2); };
const efectos = [[P2 + 0.3, 'burbujas'], [b(0.3), 'whoosh'], [b(0.38), 'boing'], [b(0.76), 'pop']];
T.rodar(E, R, [[0, p0], [P1b, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < P1b ? 2003 : 2026) });
''')

E['th-pruebas'] = ('Las pruebas', '''// TH-PRUEBAS (frases 37–38). Cuatro planos: la balanza de la promesa y la prueba; una científica que comprueba los
// controles y les pone un «✓»; las estrellas que forjan los átomos (de eso estamos hechos Atom y la sangre); y la gota
// gigante, donde la «?» se vuelve «✓».''', r'''
import { balanza, forjaAtomos } from '/atomo/plato/escenas/ov-comun.js';
const a = (f) => en('prueba', f), b = (f) => en('milagro', f);
const P2 = a(0.5), P3 = b(0), P4 = b(0.55);
const p1 = (t) => balanza(R, t, { equilibrio: tramo(t, a(0.3), a(0.45)) });
const p2 = (t) => { T.laboratorio(R, t); R.actor(EL.erika, 130, 160, t, { dir: 1, dedo: t > a(0.9) }); T.lupa(R, 154, 128, 6); if (t > a(0.92)) T.visto(R, 140, 26, 3); };
const p3 = (t) => forjaAtomos(R, t, { u: tramo(t, P3, P4) });
const p4 = (t) => { T.gotaGigante(R, t); const v = t > b(0.95); if (v) T.visto(R, 216, 60, 3); else R.icono('?', 222, 56, T.C.rojo, T.C.k, 4); };
const efectos = [[0.4, 'toc'], [a(0.92), 'brillo'], [P3 + 0.2, 'zumbido'], [b(0.95), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2026 });
''')

E['th-adios'] = ('Adiós', '''// TH-ADIOS (frase 39). La farmacia de hoy, normal, con la gente que entra por la puerta automática y compra.''', r'''
const p1 = (t) => { T.farmacia(R, t, { rincon: false, puerta: tramo(t, 0.2, 0.6) - tramo(t, 3.4, 3.8) }); const u = tramo(t, 0.6, 3.6); R.actor(EL.senora30, Math.round(lerp(4, 120, u)), 156, t, { dir: 1, anda: u > 0 && u < 1 }); R.actor(EL.chico, Math.round(lerp(-12, 104, u)), 160, t, { dir: 1, anda: u > 0 && u < 1 }); R.actor(EL.enfermera, 220, 150, t, { dir: -1, sonrisa: true }); };
const efectos = [[0.2, 'puerta']];
T.rodar(E, R, [[0, p1]], { efectos, año: 2026 });
''')
