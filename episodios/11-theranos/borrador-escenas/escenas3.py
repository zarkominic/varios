E = {}
E['th-lab'] = ('Dentro del laboratorio', '''// TH-LAB (frases 19–20). Seis planos: el laboratorio por dentro, con técnicos trabajando; la Edison pita, echa humo y
// escupe un papel en blanco, y un técnico corre a taparla con una sábana (gag); la rejilla de más de 200 pruebas, de
// las que la Edison solo hace unas pocas; los analizadores grandes de otras marcas trabajando sin parar; el tubo enorme
// que piden frente al tubito; y la gota que se diluye en agua.''', r'''
const a = (f) => en('falla', f), b = (f) => en('diluye', f);
const P2 = a(0.28), P3 = a(0.66), P4 = b(0), P5 = b(0.33), P6 = b(0.64);
const p1 = (t) => { T.laboratorio(R, t); R.actor(EL.tecnica, 60, 162, t, { dir: 1, quieto: true }); const u = (t * 0.15) % 1; R.actor(EL.tecnico, Math.round(lerp(120, 240, u)), 166, t, { dir: 1, anda: true }); R.actor(EL.erika, 200, 160, t, { dir: -1, quieto: true }); };
const p2 = (t) => { const hu = tramo(t, P2 + 0.3, P2 + 0.8), tapa = tramo(t, a(0.52), a(0.6));
  R.rect(0, 0, 319, 179, hex('#dde8e2')); R.rect(0, 120, 319, 179, hex('#c8d0d8')); R.rect(0, 120, 319, 122, T.C.metalL); T.edison(R, 160, 120, t, { s: 1.5, humo: tapa < 1 ? hu : 0, papel: tapa < 1 ? tramo(t, P2 + 1, P2 + 2) : 0, sabana: tapa });
  const x = Math.round(lerp(330, 210, tramo(t, a(0.44), a(0.52)))); R.actor(EL.tecnico, x, 168, t, { dir: -1, anda: tapa < 1 && x > 210, sorpresa: tapa < 1 }); if (tapa === 0 && x < 330) { R.rect(x - 14, 140, x + 2, 156, T.C.k); R.rect(x - 13, 141, x + 1, 155, hex('#f0f0f4')); } };
const p3 = (t) => T.rejillaPruebas(R, t, { u: tramo(t, P3 + 0.2, a(0.78)), marca: t > a(0.66) });
const p4 = (t) => { T.laboratorio(R, t, { sabanaEdison: 1 }); R.actor(EL.tecnica, 170, 164, t, { dir: 1, quieto: true }); const u = (t * 0.2) % 1; R.actor(EL.tecnico, Math.round(lerp(20, 180, u)), 168, t, { dir: 1, anda: true }); };
const p5 = (t) => T.tuboContraTubito(R, t);
const p6 = (t) => T.insertoDiluye(R, t, { u: tramo(t, P6 + 0.2, b(0.98)) });
const efectos = [[P2 + 0.3, 'aviso'], [P2 + 0.6, 'vapor'], [P2 + 1, 'papel'], [a(0.56), 'whoosh'], [a(0.66), 'brillo'], [P4 + 0.3, 'zumbido'], [P5 + 0.3, 'pop'], [P6 + 0.6, 'gluglu']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: 2014 });
''')

E['th-pajar'] = ('La aguja en el pajar', '''// TH-PAJAR (frase 21). Tres planos: vuelve el pajar, ahora más grande (el granjero se rasca la cabeza); en el tubo de
// agua, un técnico busca la sangre con una lupa (gag); y los resultados en la pantalla, que salen en rojo.''', r'''
const a = (f) => en('pajar', f);
const P2 = a(0.3), P3 = a(0.68);
const p1 = (t) => { T.pajar(R, t); R.actor(EL.brazel ?? EL.senor30, 200, 168, t, { dir: -1, dedo: true, sorpresa: true }); };
const p2 = (t) => T.insertoDiluye(R, t, { u: 1, lupa: tramo(t, P2, P2 + 1) });
const p3 = (t) => T.pantalla(R, t, { modo: 'resultados', rojos: tramo(t, P3 + 0.3, a(0.98)) });
const efectos = [[P2 + 0.4, 'whoosh'], [P3 + 0.6, 'aviso'], [a(0.95), 'aviso']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2014 });
''')

E['th-tyler'] = ('Tyler y Erika', '''// TH-TYLER (frases 22–23). Ocho planos: Tyler y Erika en el laboratorio, ante la pantalla de controles que se pone en
// rojo; los números que no cuadran; Tyler junto a su abuelo, el consejero; escribe el correo y lo envía; llega la
// respuesta dura (el sobre rojo tiembla); Tyler sale de la sede con su caja bajo la mirada del guardia; su abuelo no le
// cree; y por la calle, un coche oscuro le sigue despacio.''', r'''
const a = (f) => en('tyler', f), b = (f) => en('detectives', f);
const P3 = a(0.4), P4 = a(0.72), P5 = b(0), P6 = b(0.24), P7 = b(0.46), P8 = b(0.7);
const p1 = (t) => { T.laboratorio(R, t, { rojo: t > a(0.18) }); R.actor(EL.tyler, 120, 162, t, { dir: 1, sorpresa: t > a(0.2) }); R.actor(EL.erika, 150, 162, t, { dir: -1, dedo: t > a(0.22) }); };
const p2 = (t) => T.pantalla(R, t, { modo: 'resultados', rojos: tramo(t, P2 + 0.2, P3 - 0.5) });
const p3 = (t) => { T.consejo(R, t); R.actor(EL.consejero, 130, 164, t, { dir: 1, sonrisa: true }); R.actor(EL.tyler, 160, 164, t, { dir: -1, sonrisa: true }); if (Math.sin(t * 3) > 0) { R.disco(150, 128, 2, T.C.rojo); R.disco(153, 128, 2, T.C.rojo); R.pset(151, 131, T.C.rojo); R.rect(149, 129, 154, 130, T.C.rojo); } };
const p4 = (t) => T.pantalla(R, t, { modo: 'correo', escribe: tramo(t, P4, P4 + 1.2), envia: tramo(t, P4 + 1.5, P5 - 0.2) });
const p5 = (t) => T.pantalla(R, t, { modo: 'respuesta' });
const p6 = (t) => { T.sede(R, t); const u = tramo(t, P6 + 0.2, P7 - 0.2), x = Math.round(lerp(150, 290, u)); R.actor(EL.tyler, x, 160, t, { dir: 1, anda: u > 0 && u < 1, triste: true }); R.rect(x + 10, 142, x + 24, 152, T.C.k); R.rect(x + 11, 143, x + 23, 151, T.C.ocre); R.actor(EL.guardia, 60, 156, t, { dir: 1, quieto: true }); };
const p7 = (t) => { T.consejo(R, t); R.actor(EL.consejero, 130, 164, t, { dir: 1, enfado: t > P7 + 1, habla: t > P7 + 1 && Math.sin(t * 6) > 0 }); R.actor(EL.tyler, 160, 164, t, { dir: -1, habla: t < P7 + 1 && Math.sin(t * 6) > 0, triste: t > P7 + 1.5 }); };
const p8 = (t) => { T.calle(R, t); const u = tramo(t, P8, E.duracion), x = Math.round(lerp(-10, 240, u)); R.actor(EL.tyler, x, 122, t, { dir: 1, anda: true }); T.cocheOscuro(R, Math.round(x - 70 + Math.sin(t) * 2), 160, t, { dir: 1 }); if (t > b(0.8)) R.icono('?', x + 3, 84, T.C.rojo, T.C.k); };
const efectos = [[a(0.18), 'aviso'], [P4 + 0.1, 'tecleo'], [P4 + 1.5, 'whoosh'], [P5 + 0.2, 'aviso'], [P6 + 0.2, 'puerta'], [P8 + 0.2, 'motor']];
T.rodar(E, R, [[0, p1], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8]], { efectos, año: 2014 });
''')

E['th-periodista'] = ('El periodista', '''// TH-PERIODISTA (frases 24–25), 2015, cartela «2015». Seis planos: en la redacción de Nueva York, el periodista escucha
// al teléfono y llena su libreta; tres viñetas con antiguos empleados que le llaman, uno tras otro; el gag del teléfono
// rojo de los abogados, que no para de sonar y que él tapa con una pila de periódicos (sigue dando saltitos); la
// rotativa; la portada con la caja y la gota; y por la calle, de mañana, un repartidor en bici lanza los periódicos.''', r'''
import { bici } from '/atomo/plato/escenas/ov-comun.js';
const a = (f) => en('carreyrou', f), b = (f) => en('portada', f);
const P2 = a(0.42), P3 = a(0.73), P4 = b(0.05), P5 = b(0.33), P6 = b(0.66);
const p1 = (t) => { T.redaccion(R, t); R.actor(EL.carreyrou, 120, 156, t, { dir: 1, quieto: true }); T.auricular(R, 133, 140, 1); T.redaccionMesa(R, t, { notas: tramo(t, 1.6, P2 - 0.4), cuelga: 1 }); };
const p2 = (t) => { T.vinetas(R, t); [EL.tyler, EL.erika, EL.tecnico].forEach((d, k) => { const on = t > P2 + k * 1.2; R.actor(d, 30 + k * 104, 128, t, { dir: 1, habla: on && Math.sin(t * 7 + k) > 0, quieto: true }); if (on) T.auricular(R, 43 + k * 104, 112, 1); }); };
const p3 = (t) => { T.redaccion(R, t); R.actor(EL.carreyrou, 120, 156, t, { dir: 1, quieto: true, enfado: t > P3 + 1.4 }); T.redaccionMesa(R, t, { notas: 1, abogados: true, tapa: tramo(t, P3 + 1.6, P3 + 2.4) }); };
const p4 = (t) => { T.rotativa(R, t, { u: tramo(t, P4, P5) }); R.actor(EL.oficinista, 232, 162, t, { dir: -1, quieto: true }); };
const p5 = (t) => T.portada(R, t, { abre: tramo(t, P5, P5 + 0.8) });
const p6 = (t) => { T.calle(R, t); const u = tramo(t, P6, E.duracion), x = Math.round(lerp(-30, 330, u)); bici(R, x, 150, t, { fondo: T.C.asfalto }); R.actor(EL.chico, x + 4, 140, t, { dir: 1, quieto: true });
  for (let k = 0; k < 3; k++) { const lanza = P6 + 1 + k * 1.6, v = tramo(t, lanza, lanza + 0.6); if (v <= 0) continue; const px = Math.round(lerp(-30, 330, tramo(lanza, P6, E.duracion)) + 10), qx = 60 + k * 86, yy = Math.round(lerp(130, 120, v) - Math.sin(v * Math.PI) * 14); R.rect(Math.round(lerp(px, qx, v)), yy, Math.round(lerp(px, qx, v)) + 6, yy + 3, T.C.k); R.rect(Math.round(lerp(px, qx, v)) + 1, yy + 1, Math.round(lerp(px, qx, v)) + 5, yy + 2, hex('#ece4d0')); } };
const efectos = [[0.2, 'ring'], [1.6, 'lapiz'], [P2 + 0.1, 'ring'], [P2 + 1.3, 'ring'], [P3 + 0.3, 'ring'], [P3 + 2.3, 'papel'], [P4 + 0.2, 'motor'], [P5 + 0.1, 'papel'], [P6 + 1.6, 'golpecito'], [P6 + 3.2, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { cartela: '2015', efectos, año: 2015 });
''')

E['th-tele'] = ('En la tele', '''// TH-TELE (frase 26). Tres planos: en el plató ella dice que el artículo se equivoca; los inspectores federales entran
// en el laboratorio con sus carpetas y los técnicos se apartan; y la puerta del laboratorio con la cadena, el candado y
// un «2» de los años sin poder dirigirlo.''', r'''
const a = (f) => en('tele', f);
const P2 = a(0.3), P3 = a(0.7);
const p1 = (t) => { T.plato(R, t); R.actor(EL.holmes, 103, 140, t, { dir: 1, quieto: true, habla: Math.sin(t * 6) > 0, dedo: t > a(0.2) }); R.actor(EL.periodista, 183, 140, t, { dir: -1, quieto: true }); T.platoCamaras(R, t); };
const p2 = (t) => { T.laboratorio(R, t); [EL.agente, EL.agenta].forEach((d, k) => { const u = tramo(t, P2 + 0.3 + k * 0.5, P2 + 2.4 + k * 0.5), x = Math.round(lerp(330, 150 + k * 30, u)); R.actor(d, x, 164, t, { dir: -1, anda: u < 1 }); R.rect(x - 4, 146, x + 2, 154, T.C.k); R.rect(x - 3, 147, x + 1, 153, T.C.ocre); });
  R.actor(EL.tecnico, Math.round(lerp(150, 60, tramo(t, P2 + 1.5, P2 + 3))), 160, t, { dir: -1, sorpresa: true }); R.actor(EL.erika, 40, 160, t, { dir: 1, quieto: true }); };
const p3 = (t) => { T.laboratorio(R, t); T.tinte(R, 0, 179, [30, 30, 40], 0.5); R.rect(100, 0, 220, 179, T.C.k); R.rect(102, 0, 218, 179, T.C.metalS); for (let k = 0; k < 14; k++) { const x = 102 + k * 9, y = 96 + Math.round(Math.sin(k * 0.5) * 4); R.disco(x, y, 3, T.C.k); R.disco(x, y, 2, T.C.metal); }
  const c = tramo(t, P3 + 0.2, P3 + 0.6); R.icono('candado', 150, Math.round(lerp(40, 98, c)), T.C.oro, T.C.k, 3); if (c >= 1) R.numero('2', 200, 80, { tam: 16, centro: true }); };
const efectos = [[P2 + 0.3, 'puerta'], [P2 + 1, 'toc'], [P3 + 0.2, 'cerrojo'], [P3 + 0.6, 'sello']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: (t) => (t < P3 ? 2015 : 2016) });
''')

E['th-anula'] = ('Resultados anulados', '''// TH-ANULA (frase 27). Tres planos: en la pantalla, filas de resultados que se tachan una tras otra; en el mapa de
// Arizona, la cifra de pruebas «175,000» sobre las chinchetas; y una «X» roja que tacha uno de cada diez resultados.''', r'''
const a = (f) => en('anula', f);
const P2 = a(0.32), P3 = a(0.66);
const p1 = (t) => { T.pantalla(R, t, { modo: 'resultados' }); const n = Math.round(tramo(t, 0.4, P2 - 0.3) * 9); for (let k = 0; k < n; k++) R.rect(50, 39 + k * 12, 240, 40 + k * 12, T.C.rojo); };
const az = (t) => { const P = T.mapa(R, t, { zoom: 1 }); T.FARMACIAS_AZ.forEach((ll, k) => { const [x, y] = P(ll).map(Math.round); T.chincheta(R, x, y, t, k % 3 ? T.C.tealT : T.C.verdeT); }); return P; };
const p2 = (t) => { az(t); const e = tramo(t, a(0.44), a(0.52)); if (e > 0) { R.rect(70, 20, 250, 48, T.C.k); R.rect(72, 22, 248, 46, hex('#f4f0e4')); R.numero(Math.round(175000 * e).toLocaleString('en-US'), 160, 42, { tam: 16, centro: true }); } };
const p3 = (t) => { T.laboratorio(R, t); T.tinte(R, 0, 179, [24, 26, 36], 0.6); R.rect(26, 60, 294, 108, T.C.corcho ?? hex('#a87a4a')); for (let k = 0; k < 10; k++) { const x = 34 + k * 26, y = 70; R.rect(x, y, x + 20, y + 30, T.C.k); R.rect(x + 1, y + 1, x + 19, y + 29, T.C.blanco); for (let l = 0; l < 4; l++) R.rect(x + 4, y + 6 + l * 6, x + 16, y + 6 + l * 6, hex('#9aa0ac')); }
  const u = tramo(t, a(0.78), a(0.84)); if (u > 0) { const x = 34 + 9 * 26; for (let i = 0; i < Math.round(30 * u); i++) { R.rect(x + i * 0.66, 70 + i, x + 3 + i * 0.66, 72 + i, T.C.rojo); R.rect(x + 18 - i * 0.66, 70 + i, x + 21 - i * 0.66, 72 + i, T.C.rojo); } } R.numero('1 : 10', 160, 140, { tam: 16, centro: true }); };
const efectos = [[0.5, 'lapiz'], [a(0.44), 'tecleo'], [a(0.79), 'sello']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2016 });
''')

E['th-cero'] = ('De cuatro mil quinientos millones a cero', '''// TH-CERO (frase 28). Dos planos: Walgreens cierra el rincón de Theranos (lo tapan con un panel y una «X») mientras una
// clienta mira; y el gag del marcador, que gira como una tragaperras desde $4,500,000,000 hasta $0 (golpe).''', r'''
const a = (f) => en('cero', f);
const P2 = a(0.5);
const p1 = (t) => { T.farmacia(R, t, { cerrado: t > 1.4 }); R.actor(EL.tecnico, 180, 160, t, { dir: -1, quieto: true }); R.actor(EL.clienta, 90, 162, t, { dir: 1, sorpresa: t > 1.6 }); };
const p2 = (t) => { T.consejo(R, t); T.consejoMesa(R, t, {}); T.tinte(R, 0, 179, [30, 20, 20], 0.35); const gira = t < a(0.95), v = t < a(0.74) ? 4.5e9 : t < a(0.97) ? 4.5e9 * (1 - tramo(t, a(0.74), a(0.97))) : 0;
  T.contador(R, t, gira ? Math.round(v / 1e8) * 1e8 : 0, { rueda: gira && t > a(0.76) ? 1 : 0, y: 50, rojo: !gira }); if (!gira) { for (let k = 0; k < 3; k++) R.disco(80 + k * 80, 150, 3, Math.floor(t * 6 + k) % 2 ? T.C.rojo : T.C.rojoS); } };
const efectos = [[1.4, 'sello'], [a(0.76), 'tic'], [a(0.82), 'tic'], [a(0.88), 'tic'], [a(0.97), 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: 2016 });
''')

E['th-sec'] = ('La acusación', '''// TH-SEC (frase 29), 2018, cartela «2018». Dos planos: la carpeta de la acusación con el sello de la balanza y el sello
// rojo que cae; y la sede vacía: se apagan las luces una a una y el letrero se descuelga.''', r'''
const a = (f) => en('sec', f);
const P2 = a(0.6);
const p1 = (t) => T.acusacion(R, t, { sello: tramo(t, a(0.52), a(0.58)) });
const p2 = (t) => T.sede(R, t, { apaga: tramo(t, P2 + 0.2, E.duracion - 1.4), descuelga: tramo(t, E.duracion - 1.6, E.duracion - 0.3) });
const efectos = [[a(0.56), 'sello'], [P2 + 0.6, 'interruptor'], [P2 + 1.4, 'interruptor'], [E.duracion - 0.5, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2]], { cartela: '2018', efectos, año: 2018 });
''')
