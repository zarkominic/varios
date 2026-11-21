E = {}

# ayudas comunes de las tres escenas (van al principio de cada cuerpo)
AYUDAS = r'''
const { rect, pset, linea, poligono, disco, halo, tone } = R;
const PR = R.PR, C = T.C, PZ = T.PIEZAS_TR, H = (s) => hex(s), RP = (...c) => c.map(hex);
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const sube = (a, b, t) => { const u = tramo(t, a, b); return u * u * (3 - 2 * u); };
// un fondo fijo se pinta una vez en su búfer y luego se copia
const capa = (fn) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); fn(); R.usar(prev); } R.copiar(b); }; };
// lo que se pinta en un búfer transparente y se pega encima (solo los píxeles pintados)
const capaT = (fn) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); fn(); R.usar(prev); } for (let i = 0; i < b.length; i++) if (b[i]) pset(i % 320, (i / 320) | 0, b[i]); }; };
// sombra chinesca: lo que pinta fn (en el búfer, alrededor de [ax, ay]) se pega en un color, a escala esc, en [bx, by]
const SB = R.nuevo();
const silueta = (fn, col, esc, ax, ay, bx, by, luz) => {
  SB.fill(0); const prev = R.usar(SB); fn(); R.usar(prev);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const c = SB[y * 320 + x]; if (!c) continue;
    const X = bx + (x - ax) * esc, Y = by + (y - ay) * esc, col2 = luz && luz(c) ? luz(c) : col; for (let a = 0; a < esc; a++) for (let b = 0; b < esc; b++) pset(X + a, Y + b, col2); }
};
// un fondo fijo con cielo: lo que se pinta con .cielo(fn) (nubes, aves) solo queda donde se ve el cielo
const fondoConCielo = (fnC, fnR) => { let B = null, M = null;
  const prep = () => { if (B) return; const A = R.nuevo(); let prev = R.usar(A); fnC(); R.usar(prev); B = A.slice(); prev = R.usar(B); fnR(); R.usar(prev); M = new Uint8Array(B.length); for (let i = 0; i < B.length; i++) M[i] = A[i] === B[i] ? 1 : 0; };
  return { fondo: () => { prep(); R.copiar(B); }, cielo: (fn) => { prep(); SB.fill(0); const prev = R.usar(SB); fn(); R.usar(prev); for (let i = 0; i < SB.length; i++) if (SB[i] && M[i]) pset(i % 320, (i / 320) | 0, SB[i]); } }; };
// nube de tres tonos (sombra, cuerpo, luz)
const nube = (x, y, w, c) => { x = Math.round(x); const B = [[0, 0, .24], [.26, -.1, .2], [.5, 0, .2], [-.24, .04, .15], [.72, .05, .13]];
  for (const [dx, dy, r] of B) disco(x + dx * w, y + dy * w + 1.5, r * w, c[0]);
  for (const [dx, dy, r] of B) disco(x + dx * w, y + dy * w, r * w - 0.6, c[1]);
  for (const [dx, dy, r] of B) disco(x + dx * w - 1, y + dy * w - 1.5, r * w * 0.55, c[2]); };
// pájaros en V que cruzan
const aves = (t, n, y0, v, col, k = 0) => { for (let i = 0; i < n; i++) { const x = Math.round(((i * 53 + k * 31 + t * v * (0.8 + 0.4 * hh(i, k))) % 380) - 30), y = Math.round(y0 + 14 * hh(i, k, 3) + 2 * Math.sin(t * 2 + i)), a = Math.sin(t * 9 + i * 2) > 0;
  pset(x, y, col); pset(x - 1, y - (a ? 1 : 0), col); pset(x + 1, y - (a ? 1 : 0), col); pset(x - 2, y - (a ? 2 : -1) + (a ? 0 : 0), col); pset(x + 2, y - (a ? 2 : -1), col); } };
// hojas de otoño que vuelan
const hojas = (t, n, x0, x1, y0, y1, v, k = 0) => { const cs = RP('#c8501a', '#e0902a', '#a83a1a', '#d8b03a'); for (let i = 0; i < n; i++) { const u = (t * v * (0.6 + 0.6 * hh(i, k)) + hh(i, k, 2)) % 1;
  const x = Math.round(x1 - (x1 - x0) * u + 6 * Math.sin(t * 3 + i)), y = Math.round(y0 + (y1 - y0) * (hh(i, k, 5) * 0.6 + u * 0.4) + 4 * Math.sin(t * 4 + i * 1.7)); const c = cs[i % 4]; pset(x, y, c); pset(x + 1, y, c); if (Math.sin(t * 6 + i) > 0) pset(x, y - 1, c); else pset(x + 1, y + 1, c); } };
// cielo tramado: degradado por la rampa (de arriba abajo) hasta hor
const cieloT = (hor, rp, y0 = 0) => { for (let y = y0; y < hor; y++) for (let x = 0; x < 320; x++) pset(x, y, tone(rp, (y - y0) / (hor - y0) * (rp.length - 1) + (hh(x >> 3, y >> 2) - 0.5) * 0.3, x, y)); };
const estrellas = (t, n, y1, k = 0) => { for (let i = 0; i < n; i++) { const x = Math.floor(hh(i, k, 7) * 320), y = Math.floor(hh(i, k, 8) * y1); if (x > 276 && y < 46) continue; const b = Math.sin(t * (1.5 + hh(i, k)) + i) > 0.3; pset(x, y, b ? H('#f6f0d8') : H('#8a8ab0')); } };
// bocanada de humo (un objeto que cambia de forma)
const puff = (x, y, u) => { if (u <= 0 || u >= 1) return; const r = 4 + u * 12, c = u < 0.5 ? H('#f0ece0') : H('#b8b4b0'); for (let i = 0; i < 7; i++) { const a = i * 0.9; disco(x + Math.cos(a) * r * 0.7, y + Math.sin(a) * r * 0.5, r * 0.45 * (1 - u * 0.6), i % 2 ? c : H('#d8d4cc')); } };
'''

E['tr-samhain'] = ('Samhain', '''// TR-SAMHAIN (frase 14), sin cartela; cuatro planos:
// 1. en la cubierta de un velero al atardecer de otoño: los colonos alemanes con la liebre se van y, en «another tradition»,
//    suben la madre irlandesa y el niño con su linterna de nabo, que la levanta en «same trip» (1720 → 1847);
// 2. «Halloween» (731): el fresco de los santos; el sacerdote enciende las velas una a una en «All Saints' Day», llegan
//    dos aldeanas con su vela, y en «first of November» la hoja del 31 de octubre vuela y queda el 1 de noviembre;
// 3. «There really was» (800): la hoguera de Samhain en la colina; dos parejas bailan y un niño echa un tronco en «Gaelic
//    festival»: la llamarada sube en «Samhain»;
// 4. «the Celtic festival» (1880): el estudioso del bombín escribe en su gabinete; en su cuaderno se dibuja la hoguera y,
//    en «dead», una calavera de cuento; en «invented» sonríe y un colega entra con un libro; la goma la borra.''', AYUDAS + r'''
const a = (f) => en('santos', f);
const P2 = a(0.245), P3 = a(0.547), P4 = a(0.776);
// ── 1. la cubierta del velero en el Atlántico, al atardecer de otoño (fondo local) ──
const CIELO1 = RP('#262656', '#3e3a72', '#6a4a80', '#a85a72', '#e07a58', '#f4ac6a');
const NUBE1 = [RP('#5a3a62', '#8a5a7a', '#d8907a'), RP('#4a3a66', '#7a5a86', '#c08aa0'), RP('#6a4a6a', '#a87080', '#f0b08a')];
const fondoMar = capa(() => {
  cieloT(104, CIELO1); halo(64, 98, 30, RP('#e88a5a', '#f6b070'), 1.3); disco(64, 98, 9, H('#fff0b0')); disco(64, 98, 7, H('#fffad8'));
  for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) { const d = y - 100, gl = Math.exp(-(((x - 64) / (14 + d * 0.6)) ** 2));
    pset(x, y, tone(RP('#1e2a4a', '#2e3e66', '#4a5a86', '#8a7a9a', '#f0b878'), 2.2 - d * 0.02 + gl * 1.8 * (hh(x >> 1, y) > 0.4 ? 1 : 0.4), x, y)); }
  for (let k = 0; k < 90; k++) { const x = Math.floor(hh(k, 1) * 320), y = 102 + Math.floor(hh(k, 2) * 70); linea(x, y, x + 3 + (y - 100) / 8, y, H('#5a6a96')); }
});
const cubierta = capaT(() => {
  // la regala (borda) con sus balaustres y la tapa de la borda
  for (let y = 112; y < 132; y++) for (let x = 0; x < 320; x++) { const poste = x % 22 < 4; if (y < 116 || y > 127 || poste) pset(x, y, tone(PR.MADERA, (poste ? 2.4 : 2) - (y < 116 ? -0.8 : 0) + (x % 22 === 0 ? -1 : 0) + (hh(x >> 2, y) - 0.5) * 0.6, x, y)); }
  rect(0, 111, 319, 111, H('#2a1810')); rect(0, 116, 319, 116, H('#3a2414')); rect(0, 127, 319, 128, H('#3a2414'));
  // las tablas de cubierta con juntas, clavos y vetas
  for (let y = 129; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 129) / (4 + (y - 129) / 14)), junta = (y - 129) % Math.max(4, Math.round(4 + (y - 129) / 14)) === 0;
    const corte = (x + fila * 37) % 70 === 0; pset(x, y, junta || corte ? H('#3a2414') : tone(RP('#5a3a20', '#7a5030', '#9a6a40', '#b88a58'), 2 + (hh(x >> 3, fila) - 0.5) * 0.8 + (Math.sin(x * 0.3 + fila) > 0.85 ? -1 : 0), x, y)); }
  for (let k = 0; k < 40; k++) pset(Math.floor(hh(k, 9) * 320), 131 + Math.floor(hh(k, 10) * 48), H('#2a1810'));
  // el palo mayor con sus cabos y la vela recogida a medias
  rect(232, 0, 240, 132, H('#2a1810')); for (let y = 0; y < 132; y++) for (let x = 233; x < 240; x++) pset(x, y, tone(PR.MADERA, 1.6 + (x - 233) * 0.3 - (x === 234 ? -1 : 0), x, y));
  for (const [x1, y1] of [[318, 112], [300, 112], [170, 112], [190, 112]]) linea(236, 22, x1, y1, H('#3a2a1c'));
  poligono([[206, 18], [270, 18], [262, 76], [214, 70]], (x, y) => tone(RP('#8a7a68', '#c8b89a', '#e8dcc0', '#f6eedc'), 2.4 - (x - 206) / 64 * 1.2 + (y > 66 ? -0.6 : 0) + ((x + y) % 9 === 0 ? -0.7 : 0), x, y));
  linea(206, 18, 270, 18, H('#3a2a1c')); linea(214, 70, 262, 76, H('#6a5a48')); rect(204, 15, 274, 17, H('#4a3020'));
  for (let x = 214; x < 262; x += 8) linea(x, 18, x + 1, 72, H('#b8a88a'));
  // toneles, cajas, el rollo de cabo, sacos y el cubo
  for (const [x, y] of [[262, 160], [288, 162], [276, 140]]) { for (let j = -16; j <= 0; j++) for (let i = -10; i <= 10; i++) { if (Math.abs(i) > 10 - (Math.abs(j + 8) > 6 ? 1 : 0)) continue; pset(x + i, y + j, tone(PR.MADERA, 2.4 - i / 10 * 1.2 + (j === -13 || j === -3 ? -1.2 : 0), x + i, y + j)); }
    rect(x - 10, y - 16, x + 10, y - 16, H('#2a1810')); }
  for (const [x0, y0, w, hgt] of [[6, 140, 34, 24], [30, 124, 24, 16]]) { rect(x0, y0, x0 + w, y0 + hgt, H('#3a2414')); for (let y = y0 + 1; y < y0 + hgt; y++) for (let x = x0 + 1; x < x0 + w; x++) pset(x, y, tone(RP('#7a5a34', '#9a7448', '#b89062'), 1.4 + ((y - y0) % 6 === 0 ? -1 : 0) + (hh(x >> 2, y >> 2) - 0.5) * 0.5, x, y)); linea(x0, y0, x0 + w, y0 + hgt, H('#5a3a20')); }
  for (let r = 9; r > 1; r -= 2) R.anillo(128, 170, r, H(r % 4 === 1 ? '#c8b080' : '#8a7450'));
  disco(70, 172, 7, H('#8a7a5a')); disco(70, 170, 6, H('#b8a07a')); disco(80, 174, 6, H('#a08a64'));
  rect(212, 150, 222, 162, H('#3a2a20')); rect(213, 151, 221, 161, H('#6a6a72')); rect(213, 151, 221, 152, H('#9a9aa6'));
});
const p1 = (t) => {
  const dy = Math.round(2 * Math.sin(t * 1.3)), prev = R.buf;
  fondoMar(); if (dy) { const B = R.buf, cp = B.slice(); for (let y = 0; y < 180; y++) { const ys = Math.min(179, Math.max(0, y - dy)); B.set(cp.subarray(ys * 320, ys * 320 + 320), y * 320); } }
  // nubes a tres velocidades, el barco lejano y las gaviotas
  nube(((t * 3 + 40) % 380) - 40, 30 + dy, 40, NUBE1[0]); nube(((t * 5 + 180) % 380) - 40, 52 + dy, 30, NUBE1[1]); nube(((t * 8 + 110) % 380) - 40, 74 + dy, 22, NUBE1[2]);
  R.barco(150 - t * 2, 101 + dy, t, { esc: 0.35, dir: -1, silueta: 1, bandera: null });
  for (let k = 0; k < 14; k++) { const x = Math.floor((hh(k, 4) * 320 + t * 6) % 320), y = 104 + Math.floor(hh(k, 5) * 6) + dy; if (Math.sin(t * 3 + k) > 0.2) linea(x, y, x + 3, y, H('#f8d8a0')); }
  aves(t, 4, 40 + dy, 16, H('#2a2040'), 1);
  cubierta();
  const ola = Math.round(Math.sin(t * 1.3 + 1));   // la espuma que salta por la borda
  if (Math.sin(t * 1.3) > 0.92) for (let k = 0; k < 10; k++) pset(40 + k * 27 + (k % 3), 110 - (k % 4) + ola, H('#e8f0f8'));
  // los colonos alemanes con la liebre: se van por la izquierda («and in autumn»)
  const va = tramo(t, a(0.075), a(0.12)), xc = Math.round(lerp(78, -40, va));
  R.actor(EL.colonaPA, xc, 160, t, { dir: va > 0 ? -1 : 1, anda: va > 0 && va < 1, sonrisa: true, habla: t < a(0.05) && Math.sin(t * 7) > 0 });
  R.actor(EL.colonoPA, xc + 20, 162, t, { dir: va > 0 ? -1 : 1, anda: va > 0 && va < 1, dedo: va === 0 && t > 0.6 });
  PZ.liebre(R, Math.round(lerp(122, -10, tramo(t, a(0.06), a(0.11)))), 166, { t, salta: t > a(0.06) && t < a(0.11), dir: -1 });
  // el marinero que caza el cabo junto al palo
  const tira = Math.sin(t * 2.2) > 0 ? 1 : 0, m = R.actor(EL.irlandes, 244, 156, t, { dir: -1, sostiene: [242, 122 + tira * 4] });
  linea(m.mano[0], m.mano[1], 238, 40, H('#4a3a28'));
  // la madre irlandesa y el niño con la linterna de nabo suben por la escotilla («another tradition»)
  const sb = tramo(t, a(0.13), a(0.18)), xn = Math.round(lerp(330, 150, sb)), alza = t > a(0.19) ? 5 : 0;
  if (sb > 0) {
    R.actor(EL.irlandesa, xn + 26, 160, t, { dir: -1, anda: sb < 1, sonrisa: sb >= 1, dedo: t > a(0.2) });
    const nn = R.actor(EL.ninoIrlandes, xn, 164, t, { dir: -1, anda: sb < 1, sonrisa: t > a(0.19), sostiene: [xn - 4, 140 - alza] });
    linea(nn.mano[0], nn.mano[1], nn.mano[0] - 6, nn.mano[1] - 6, H('#5a3a1a')); halo(nn.mano[0] - 7, nn.mano[1] + 2, 14, RP('#a84a1a', '#e0802a'), 0.7);
    PZ.nabo(R, nn.mano[0] - 7, nn.mano[1] + 8, { luz: true, t });
  }
  hojas(t, t > a(0.11) ? 9 : 2, -10, 330, 40, 170, 0.35, 3);
};
// ── 2. el fresco de los santos con las velas de Todos los Santos (iglesia, vitral) ──
const VELAS = []; for (let i = 0; i < 14; i++) { const x = 50 + i * 16; if ([100, 160, 220].some((l) => Math.abs(l - x) < 6)) continue; VELAS.push(x); }
const xCura = (t) => Math.round(lerp(26, 262, tramo(t, a(0.255), a(0.37))));
const p2 = (t) => {
  T.amor(R, t, { encuadre: 'iglesia', camara: 'vitral' });
  // las velas de la repisa: se encienden cuando pasa el sacerdote
  const xc = xCura(t);
  for (const x of VELAS) { const enc = xc > x - 4 && t > a(0.255); if (enc) halo(x, 114, 11, RP('#a86a2a', '#d8a048', '#f8d070'), 0.9);
    rect(x - 3, 126, x + 3, 128, H('#3a2a1a')); rect(x - 2, 126, x + 2, 127, H('#a87a3a')); rect(x - 2, 116, x + 2, 125, H('#3a2a1a')); rect(x - 1, 117, x + 1, 125, H('#f4ead0')); pset(x - 1, 117, H('#fffaf0')); pset(x + 1, 124, H('#c8b898'));
    if (enc) { const f = Math.sin(t * 13 + x) > 0; rect(x - 1, 113, x + 1, 115, H('#ffb040')); pset(x, 112, H('#ffe08a')); pset(x + (f ? 1 : 0), 111, H('#fff6c0')); pset(x, 114, H('#fffad8')); } else pset(x, 115, H('#2a2a2a')); }
  // el calendario de la pared: la hoja del 31 de octubre vuela en «first of November»
  const vuela = tramo(t, a(0.448), a(0.5));
  PZ.calendario(R, 22, 112, { s: 2, mes: vuela > 0 ? 11 : 10, dia: vuela > 0 ? 1 : 31 });
  if (vuela > 0 && vuela < 1) PZ.hojaCalendario(R, Math.round(22 + vuela * 70), Math.round(108 - vuela * 40 + vuela * vuela * 90), { s: 2, mes: 10, dia: 31 });
  if (vuela > 0 && t < a(0.5) + 0.6 && Math.floor(t * 8) % 2) { for (const [dx, dy] of [[-22, -40], [22, -40], [-24, 0], [24, 0]]) pset(22 + dx, 92 + dy, H('#fff6c0')); }
  // las dos aldeanas llegan con su vela y miran a los santos en «All Saints' Day»
  const ll = tramo(t, a(0.27), a(0.33)), xl = Math.round(lerp(-30, 60, ll));
  for (const [def, dx, s] of [[EL.labriega, 0, 166], [EL.ninaCampo, 22, 168]]) { const q = R.actor(def, xl + dx, s, t, { dir: 1, anda: ll > 0 && ll < 1, sonrisa: t > a(0.32), sostiene: true });
    rect(q.mano[0] - 1, q.mano[1] - 5, q.mano[0], q.mano[1], H('#e8dcc0')); pset(q.mano[0], q.mano[1] - 7, H(Math.sin(t * 12 + dx) > 0 ? '#fff6c0' : '#ffb040')); pset(q.mano[0], q.mano[1] - 6, H('#ffd060')); halo(q.mano[0], q.mano[1] - 6, 5, RP('#c88a3a', '#f0c060'), 0.6); }
  // el sacerdote recorre la repisa con la candela y, en «moved», se vuelve y lo explica
  const anda = t > a(0.255) && t < a(0.37), vuelto = t > a(0.41);
  const cu = R.actor(EL.sacerdote, xc - 8, 166, t, { dir: vuelto ? -1 : 1, anda, sostiene: vuelto ? undefined : [xc + 6, 132], dedo: vuelto && t > a(0.42), habla: vuelto && Math.sin(t * 7) > 0 });
  if (!vuelto) { linea(cu.mano[0], cu.mano[1], cu.mano[0] + 2, cu.mano[1] - 9, H('#e8dcc0')); pset(cu.mano[0] + 2, cu.mano[1] - 10, H(Math.sin(t * 14) > 0 ? '#fff6c0' : '#ffb040')); halo(cu.mano[0] + 2, cu.mano[1] - 10, 5, RP('#c88a3a', '#f0c060'), 0.7); }
  // el humo del incienso que sube del pebetero del suelo
  rect(286, 150, 296, 166, H('#5a4a3a')); rect(284, 148, 298, 150, H('#8a7a5a')); for (let k = 0; k < 6; k++) { const u = (t * 0.4 + k / 6) % 1; disco(291 + Math.sin(t * 2 + k) * 3 * u, 146 - u * 50, 1 + u * 2.4, u < 0.5 ? H('#d8d0c4') : H('#b0a8a0')); }
};
// ── 3. la hoguera de Samhain en la colina (aldea, hoguera) ──
const p3 = (t) => {
  T.estaciones(R, t, { encuadre: 'aldea', camara: 'hoguera' });
  // la llamarada cuando cae el tronco («Samhain»)
  const ll = tramo(t, a(0.62), a(0.62) + 1.6), f = ll > 0 && ll < 1 ? Math.sin(ll * Math.PI) : 0;
  if (f > 0) { halo(160, 120, 70 * f + 10, RP('#a8401a', '#e07a2a', '#f8b040'), 0.9);
    for (let k = 0; k < 16; k++) { const x = 160 + (k - 8) * 3, hgt = (24 + 30 * hh(k, Math.floor(t * 12))) * f * (1 - Math.abs(k - 8) / 10); poligono([[x - 3, 142], [x + 3, 142], [x + Math.sin(t * 9 + k) * 2, 142 - hgt]], k % 3 ? H('#f8a030') : H('#fff0a0')); }
    for (let k = 0; k < 24; k++) { const u = (ll * 1.4 + hh(k, 1)) % 1; pset(Math.round(160 + (hh(k, 2) - 0.5) * 120 * u), Math.round(130 - u * 110), H(k % 2 ? '#fff0a0' : '#f8a030')); } }
  // las chispas de siempre que suben
  for (let k = 0; k < 12; k++) { const u = (t * 0.5 + hh(k, 3)) % 1; pset(Math.round(150 + hh(k, 4) * 20 + Math.sin(t * 3 + k) * 6), Math.round(96 - u * 70), H(u < 0.5 ? '#ffd060' : '#c86a2a')); }
  // dos parejas que bailan, a saltos y dando vueltas
  const ritmo = (k) => Math.abs(Math.sin(t * 5 + k)) * 3, gira = (k) => (Math.floor(t * 1.2 + k) % 2 ? 1 : -1);
  R.actor(EL.labriego, 64 + Math.round(6 * Math.sin(t * 2.4)), 162, t, { dir: gira(0), salto: ritmo(0), sonrisa: true, brazos: Math.sin(t * 5) > 0.3 });
  R.actor(EL.labriega, 96 - Math.round(6 * Math.sin(t * 2.4)), 164, t, { dir: -gira(0), salto: ritmo(1.5), sonrisa: true });
  R.actor(EL.irlandes, 204 + Math.round(5 * Math.sin(t * 2.4 + 1)), 164, t, { dir: gira(1), salto: ritmo(0.8), sonrisa: true });
  R.actor(EL.irlandesa, 234 - Math.round(5 * Math.sin(t * 2.4 + 1)), 162, t, { dir: -gira(1), salto: ritmo(2.2), sonrisa: true, brazos: Math.sin(t * 5 + 2) > 0.4 });
  // el niño trae un tronco y lo echa al fuego («Gaelic festival»)
  const va = tramo(t, P3 + 0.1, a(0.585)), lanza = tramo(t, a(0.585), a(0.62)), xn = Math.round(lerp(-20, 116, va));
  const nn = R.actor(EL.ninoCampo, xn, 170, t, { dir: 1, anda: va > 0 && va < 1, sostiene: lanza === 0 ? [xn + 16, 154] : undefined, brazos: lanza > 0 && lanza < 1, sonrisa: lanza >= 1, salto: lanza >= 1 ? Math.abs(Math.sin(t * 6)) * 2 : 0 });
  const tronco = (x, y, ang) => { const c = Math.cos(ang) * 6, s = Math.sin(ang) * 6; for (let k = -1; k <= 1; k++) linea(x - c, y - s + k, x + c, y + s + k, k ? H('#5a3a1c') : H('#8a5a2c')); pset(Math.round(x + c), Math.round(y + s), H('#c8a070')); };
  if (lanza === 0) tronco(nn.mano[0] + 2, nn.mano[1], 0.2); else if (lanza < 1) tronco(lerp(xn + 18, 160, lanza), lerp(152, 140, lanza) - Math.sin(lanza * Math.PI) * 26, lanza * 7);
  T.estacionesDelante(R, t, { encuadre: 'aldea', camara: 'hoguera' });
};
// ── 4. el gabinete del estudioso del XIX: el cuaderno con la calavera que se borra (chaucer, general) ──
const BX0 = 166, BY0 = 22, BX1 = 264, BY1 = 100;
const p4 = (t) => {
  T.amor(R, t, { encuadre: 'chaucer', camara: 'general' });
  const listo = t > a(0.89), borra = tramo(t, a(0.915), a(0.985));
  // el colega del bombín entra con un libro en «scholars»
  const co = tramo(t, a(0.86), a(0.93)), xco = Math.round(lerp(330, 214, co));
  const cq = R.actor(EL.burgues, xco, 152, t, { dir: -1, anda: co > 0 && co < 1, sostiene: co < 1 ? true : undefined, dedo: co >= 1, sonrisa: co >= 1, habla: co >= 1 && Math.sin(t * 7) > 0.2 });
  if (co < 1) { rect(cq.mano[0] - 5, cq.mano[1] - 2, cq.mano[0] + 1, cq.mano[1] + 4, H('#2a1810')); rect(cq.mano[0] - 4, cq.mano[1] - 1, cq.mano[0], cq.mano[1] + 3, H('#7a2a2a')); }
  // el estudioso detrás del pupitre: escribe, sonríe en «invented» y se sorprende cuando la goma borra
  const es = R.actor(EL.estudioso, 92, 147, t, { dir: 1, sostiene: [108, 138 + (Math.sin(t * 9) > 0 ? 1 : 0)], sonrisa: t > a(0.885) && borra < 0.3, sorpresa: borra > 0.3, habla: t < a(0.83) && Math.sin(t * 5) > 0.6 });
  linea(es.mano[0], es.mano[1], es.mano[0] + 5, es.mano[1] - 7, H('#f0ece0')); pset(es.mano[0] + 5, es.mano[1] - 7, H('#c8c0b0')); pset(es.mano[0] + 6, es.mano[1] - 8, H('#f6f2ea'));
  T.amorDelante(R, t, { encuadre: 'chaucer', camara: 'general' });
  // el bocadillo con la hoja del cuaderno
  const ab = sube(P4 + 0.6, P4 + 0.9, t);
  if (ab > 0) {
    for (const [x, y, r] of [[118, 118, 2], [126, 110, 3], [138, 102, 4]]) if (ab > 0.3) { disco(x, y, r + 1, C.k); disco(x, y, r, H('#f6f0e0')); }
    const x0 = Math.round(lerp(150, BX0, ab)), y0 = Math.round(lerp(96, BY0, ab));
    rect(x0 - 2, y0 - 2, BX1 + 2, BY1 + 2, C.k); rect(x0 - 1, y0 - 1, BX1 + 1, BY1 + 1, H('#6a5a48'));
    for (let y = y0; y <= BY1; y++) for (let x = x0; x <= BX1; x++) pset(x, y, (y - BY0) % 7 === 6 ? H('#c8d0e0') : x === BX0 + 10 ? H('#e09a9a') : tone(RP('#d8ccb0', '#eee4cc', '#f8f2e0'), 1.6 + (hh(x >> 2, y >> 2) - 0.5) * 0.6, x, y));
    rect(BX1 - 1, y0, BX1 + 1, BY1, H('#c8bca0'));
    if (ab >= 1) {
      // la hoguera con los bailarines (a lápiz): se dibuja en «Celtic festival»
      const tinta = H('#3a2a2a'), naranja = H('#d8701a'), dib = tramo(t, P4 + 0.9, a(0.825));
      const tr = [[[200, 92], [214, 70]], [[228, 92], [214, 70]], [[204, 92], [224, 92]], [[208, 86], [214, 76]], [[220, 86], [214, 78]]];
      tr.forEach(([[x1, y1], [x2, y2]], i) => { const u = Math.min(1, Math.max(0, dib * 6 - i)); if (u > 0) linea(x1, y1, lerp(x1, x2, u), lerp(y1, y2, u), i < 2 ? naranja : tinta); });
      if (dib > 0.4) for (let k = 0; k < 5; k++) { const x = 206 + k * 4, hgt = 8 + (k % 2) * 5 + (Math.sin(t * 8 + k) > 0 ? 2 : 0); linea(x, 88, x + 2, 88 - hgt, H(k % 2 ? '#e8a020' : '#d8501a')); linea(x + 2, 88 - hgt, x + 4, 88, H(k % 2 ? '#e8a020' : '#d8501a')); }
      for (const [i, x] of [[1, 184], [2, 244], [3, 254], [4, 176]]) if (dib * 5 > i) { const b = Math.sin(t * 5 + i) > 0 ? 1 : 0; disco(x, 76 - b, 2, tinta); linea(x, 79 - b, x, 86 - b, tinta); linea(x, 86 - b, x - 2, 92, tinta); linea(x, 86 - b, x + 2, 92, tinta); linea(x - 3, 80 - b * 3, x + 3, 80 - b * 3, tinta); }
      // la calavera de cuento («dead») que la goma borra después
      const cal = tramo(t, a(0.83), a(0.865));
      if (cal > 0) { const cx = 214, cy = 44, pinta = (x, y, c) => { if ((x - (BX0 + 30)) / 70 > cal) return; if (x < BX0 + 4 + borra * (BX1 - BX0)) { if (borra > 0 && x > BX0 + borra * (BX1 - BX0) - 6 && hh(x, y, Math.floor(t * 10)) < 0.25) pset(x, y, H('#9a8a7a')); return; } pset(x, y, c); };
        for (let y = -11; y <= 13; y++) for (let x = -12; x <= 12; x++) { const d = Math.hypot(x / 12, y / 11); const borde = (d > 0.86 && d <= 1 && y < 6) || (y >= 6 && y <= 13 && Math.abs(x) <= 7 && (Math.abs(x) === 7 || y === 13));
          const ojo = Math.hypot((Math.abs(x) - 5) / 3.4, (y - 1) / 3.6) < 1, nariz = y >= 5 && y <= 7 && Math.abs(x) <= 7 - y, diente = y >= 10 && y <= 12 && x % 3 === 0 && Math.abs(x) <= 6;
          if (borde || ojo || nariz || diente) pinta(cx + x, cy + y, tinta); else if (d <= 0.86 || (y >= 6 && y < 13 && Math.abs(x) < 7)) pinta(cx + x, cy + y, H('#fbf8ee')); } }
      // el lápiz que dibuja y la goma que borra
      if (dib < 1 || (cal > 0 && cal < 1)) { const lx = cal > 0 && cal < 1 ? 200 + cal * 28 : 196 + dib * 40, ly = cal > 0 && cal < 1 ? 36 + Math.sin(t * 20) * 6 : 78 + Math.sin(t * 18) * 8;
        linea(lx, ly, lx + 10, ly - 14, H('#e8b030')); linea(lx + 1, ly, lx + 11, ly - 14, H('#c88a20')); pset(lx, ly, tinta); rect(lx + 10, ly - 17, lx + 12, ly - 15, H('#e89090')); }
      if (borra > 0 && borra < 1) { const gx = Math.round(BX0 + borra * (BX1 - BX0)), gy = 44 + Math.round(Math.sin(t * 26) * 7); rect(gx - 7, gy - 5, gx + 7, gy + 5, C.k); rect(gx - 6, gy - 4, gx + 6, gy + 4, H('#e88a9a')); rect(gx - 6, gy - 4, gx + 6, gy - 3, H('#f6b8c0')); rect(gx - 6, gy + 1, gx + 6, gy + 4, H('#4a6ac8')); }
      if (t > a(0.885) && t < a(0.92) && Math.floor(t * 6) % 2) R.icono('!', 252, 28, H('#d8301a'), C.k, 2);
    }
  }
};
const efectos = [[0.4, 'ola'], [a(0.12), 'viento'], [a(0.195), 'brillo'], [a(0.25), 'campana'], [a(0.26), 'brillo'], [a(0.448), 'papel'], [P3 + 0.3, 'palmada'], [a(0.62), 'whoosh'], [P4 + 0.5, 'lapiz'], [a(0.84), 'lapiz'], [a(0.87), 'puerta'], [a(0.92), 'papel']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < a(0.12) ? 1720 : t < P2 ? 1847 : t < P3 ? 731 : t < P4 ? 800 : 1880) });
''')

E['tr-nabos'] = ('Los nabos', '''// TR-NABOS (frase 15), sin cartela; cuatro planos (la frase pide cuatro ideas: se apunta en avisos):
// 1. la aldea de noche (1800): en el muro, una calabaza encendida; en «turnips» se deshace en humo y queda un nabo;
//    GAG 5: la uva que paseaba por el muro ve la cara encendida, se asusta y sale corriendo; un niño pasa con su
//    linterna de nabo y la madre le saluda desde la puerta;
// 2. «In Ireland»: la mesa de la cocina de turba de cerca; una mano deja el nabo, otra talla la cara en «carved faces»,
//    la tapa salta, las tenazas meten la brasa en «ember» y la cara se enciende en «inside»; el gato mira;
// 3. «the legend»: sombra chinesca en la pared encalada, con el abuelo que cuenta y dos niños: Jack entra con su farol
//    («lantern of Jack»), cuenta monedas («miser»), sale el diablillo de cuento y Jack lo engaña: se queda colgado del
//    árbol («tricked the devil»);
// 4. «In America» (1850): el muelle con el barco atracado; la familia baja, el granjero enseña una calabaza («bigger
//    vegetable») y, en «pumpkin», el nabo del niño se convierte en una calabaza enorme.''', AYUDAS + r'''
const n = (f) => en('nabos', f);
const P2 = n(0.232), P3 = n(0.505), P4 = n(0.756);
// ── 1. la aldea de noche: la calabaza que era un nabo (aldea, general, noche) ──
const p1 = (t) => {
  const g = T.estaciones(R, t, { encuadre: 'aldea', camara: 'general', noche: 1 });
  // la madre en la puerta de su casa saluda al niño que pasa con su linterna
  R.actor(EL.irlandesa, 138, 134, t, { dir: 1, dedo: t > 0.8 && t < 3.2, sonrisa: true });
  const va = tramo(t, 0.2, P2), xn = Math.round(lerp(40, 190, va));
  const nn = R.actor(EL.ninoIrlandes, xn, 164, t, { dir: 1, anda: va > 0 && va < 1, sostiene: [xn + 18, 142] });
  linea(nn.mano[0], nn.mano[1], nn.mano[0] + 5, nn.mano[1] - 4, H('#5a3a1a')); halo(nn.mano[0] + 6, nn.mano[1] + 4, 12, RP('#7a3a1a', '#c86a2a'), 0.7); PZ.nabo(R, nn.mano[0] + 6, nn.mano[1] + 10, { luz: true, t });
  T.estacionesDelante(R, t, { encuadre: 'aldea', camara: 'general', noche: 1 });
  // en el muro de delante: la calabaza que, en «turnips», se convierte en nabo
  const cambia = n(0.17), cx = 278;
  halo(cx, 146, 26, RP('#5a2a1a', '#a8501a', '#e08a2a'), 0.8);
  if (t < cambia + 0.1) PZ.calabaza(R, cx, 158, { s: 2, luz: true, t }); else PZ.nabo(R, cx, 158, { s: 2, luz: true, t });
  puff(cx, 146, tramo(t, cambia - 0.05, cambia + 0.45));
  // GAG 5: la uva pasea por el muro, ve la cara encendida, se asusta y huye
  const susto = n(0.185), huye = tramo(t, susto + 0.45, P2 - 0.05);
  const ux = t < susto ? Math.round(lerp(226, 252, tramo(t, 0.6, susto - 0.2))) : Math.round(lerp(252, 196, huye));
  const uy = 157 - (t > susto && t < susto + 0.4 ? Math.round(Math.sin(tramo(t, susto, susto + 0.4) * Math.PI) * 8) : 0) + (huye > 0.55 ? Math.round((huye - 0.55) * 30) : 0);
  if (huye < 1) T.uva(R, ux, uy, t, { cara: t < susto ? 'normal' : 'susto', corre: (t > 0.6 && t < susto - 0.2) || huye > 0, dir: t < susto ? 1 : -1 });
  if (t > susto && t < susto + 0.7) R.icono('!', ux - 2, uy - 28, H('#f8e060'), C.k, 2);
  // las hojas que caen y el viento
  hojas(t, 6, 0, 320, 60, 170, 0.12, 4);
};
// ── 2. la mesa de la cocina de turba: el nabo tallado con su brasa (fondo local, de cerca) ──
const coc = capa(() => {
  // la pared encalada de piedra, más oscura de hollín junto al hogar
  for (let y = 0; y < 116; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y + (x >> 5) * 3) / 9), off = (fila % 2) * 11, junta = (y + (x >> 5) * 3) % 9 === 0 || (x + off) % 22 === 0;
    const hollin = Math.max(0, 1 - Math.hypot(x - 52, y - 40) / 110);
    pset(x, y, tone(RP('#5a5048', '#8a8070', '#c8bca4', '#e4dac4', '#f2ead8'), 3.3 - hollin * 2 - (junta ? 0.7 : 0) + (hh(x >> 1, y >> 1) - 0.5) * 0.5 - (y < 10 ? 1 : 0), x, y)); }
  // las vigas del techo
  for (let y = 0; y < 8; y++) for (let x = 0; x < 320; x++) pset(x, y, tone(PR.MADERA, 1.2 + (y === 7 ? -1 : 0) + (hh(x >> 3, 1) - 0.5) * 0.6, x, y));
  // el hogar: campana, boca, la turba encendida (se anima aparte) y la repisa con cacharros
  for (let y = 20; y < 118; y++) for (let x = 6; x < 98; x++) { if (y > 60 && x > 18 && x < 86) continue; const piedra = ((x >> 3) + (y >> 3)) % 2;
    pset(x, y, tone(RP('#3a3430', '#5a524a', '#7a7064', '#9a8e7e'), 1.8 + piedra * 0.6 + ((x & 7) === 0 || (y & 7) === 0 ? -1 : 0) + (hh(x, y) - 0.5) * 0.4, x, y)); }
  rect(18, 60, 86, 118, H('#140c08')); for (let y = 60; y < 118; y++) for (let x = 18; x < 86; x++) if (hh(x, y, 2) < 0.2) pset(x, y, H('#2a1a12'));
  rect(2, 54, 102, 58, H('#3a2414')); for (let x = 2; x < 103; x++) pset(x, 54, H('#7a5030'));
  // la repisa: candelero, jarra, platos y un manojo de hierbas
  rect(10, 44, 16, 53, H('#c8a040')); rect(12, 38, 14, 44, H('#f4ead0')); rect(30, 40, 40, 53, H('#2a2a3a')); rect(31, 41, 39, 52, H('#c87a4a')); rect(31, 41, 33, 52, H('#e8a070'));
  for (const x of [52, 66, 80]) { disco(x, 46, 6, H('#2a2a3a')); disco(x, 46, 5, H('#e8eef6')); R.anillo(x, 46, 3, H('#3a5aa8')); }
  // la grúa con el caldero
  linea(24, 64, 70, 64, H('#2a2a2a')); linea(24, 64, 24, 110, H('#2a2a2a')); linea(56, 64, 56, 84, H('#2a2a2a'));
  for (let y = 84; y < 100; y++) for (let x = 44; x < 69; x++) if (Math.hypot((x - 56) / 12, (y - 88) / 12) < 1) pset(x, y, tone(RP('#141414', '#2a2a2e', '#4a4a52', '#7a7a86'), 2 - (x - 44) / 12, x, y));
  // la ventana honda con la noche y la luna
  rect(186, 30, 240, 82, H('#3a3430')); rect(190, 34, 236, 78, H('#141a3a'));
  for (let y = 34; y < 78; y++) for (let x = 190; x < 236; x++) pset(x, y, tone(RP('#0e1230', '#1a2250', '#2a3a6a'), (y - 34) / 44 * 2, x, y));
  disco(222, 46, 6, H('#f6f0d8')); disco(224, 44, 5, H('#141a3a')); for (const [x, y] of [[198, 40], [206, 52], [196, 62], [230, 64], [214, 38]]) pset(x, y, H('#f6f0d8'));
  poligono([[190, 70], [204, 62], [216, 68], [236, 60], [236, 78], [190, 78]], H('#0a0e20'));
  rect(212, 34, 213, 78, H('#3a2a1a')); rect(190, 55, 236, 56, H('#3a2a1a')); rect(182, 82, 244, 86, H('#a89a84')); rect(182, 86, 244, 87, H('#5a5048'));
  for (let y = 30; y < 84; y++) for (let k = 0; k < 6; k++) pset(186 + k + Math.round(Math.sin(y * 0.3) * 1), y, H(k % 2 ? '#a83a2a' : '#c85a3a'));
  // el vasar con platos azules y tazas colgadas
  rect(254, 46, 320, 118, H('#3a2414')); for (let y = 48; y < 118; y++) for (let x = 256; x < 320; x++) pset(x, y, tone(PR.MADERA, 1.6 + (hh(x >> 2, y >> 4) - 0.5) * 0.6, x, y));
  for (const y of [66, 88, 110]) { rect(254, y, 320, y + 2, H('#5a3a20')); rect(254, y, 320, y, H('#9a6a40')); }
  for (const [y, n0] of [[64, 0], [86, 1]]) for (let k = 0; k < 4; k++) { const x = 264 + k * 15 + n0 * 4; disco(x, y - 8, 7, H('#2a2a3a')); disco(x, y - 8, 6, H('#e8eef6')); R.anillo(x, y - 8, 4, H('#3a5aa8')); disco(x, y - 8, 1.5, H('#3a5aa8')); }
  for (let k = 0; k < 4; k++) { const x = 262 + k * 15; rect(x, 92, x + 6, 100, H('#2a2a3a')); rect(x + 1, 93, x + 5, 99, H('#e8eef6')); rect(x + 1, 95, x + 5, 96, H('#3a5aa8')); }
  // el canto de la mesa y el tablero de cerca, con vetas, nudos y marcas de cuchillo
  rect(0, 116, 319, 119, H('#2a1810'));
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((y - 120) / 15), junta = (y - 120) % 15 === 0;
    pset(x, y, junta ? H('#2a1810') : tone(RP('#4a2c18', '#6a4024', '#8a5a34', '#a8784a', '#c8986a'), 2.6 + Math.sin(x * 0.05 + tabla * 2 + Math.sin(y * 0.4) * 0.6) * 0.5 + (hh(x >> 4, tabla) - 0.5) * 0.6 + (y > 170 ? -0.6 : 0), x, y)); }
  for (const [x, y] of [[40, 140], [246, 160], [290, 130]]) { R.anillo(x, y, 3, H('#4a2c18')); R.anillo(x, y, 1.5, H('#4a2c18')); }
  for (let k = 0; k < 12; k++) { const x = Math.floor(hh(k, 3) * 300), y = 124 + Math.floor(hh(k, 4) * 50); linea(x, y, x + 6, y + 2, H('#c8a070')); }
  // el cuenco con la pulpa sacada, cuchara, nabos sin tallar, las mondas y el saquito
  for (let y = 136; y < 156; y++) for (let x = 44; x < 96; x++) if (Math.hypot((x - 70) / 26, (y - 146) / 10) < 1) pset(x, y, tone(RP('#3a2414', '#7a5030', '#a87a50'), 2 - (x - 44) / 30, x, y));
  for (let y = 138; y < 145; y++) for (let x = 50; x < 90; x++) if (Math.hypot((x - 70) / 20, (y - 142) / 4) < 1) pset(x, y, tone(RP('#c8b8a0', '#e8dcc8', '#f6eedc'), 1.5 + hh(x, y), x, y));
  for (const [x, y] of [[262, 160], [294, 170]]) { for (let j = -10; j <= 10; j++) for (let i = -10; i <= 10; i++) { if (Math.hypot(i, j) > 10) continue; pset(x + i, y + j, j < -3 + Math.sin(i * 0.5) ? tone(RP('#3a1a3a', '#6a3a6a', '#9a6a9a', '#c8a0c8'), 2.2 - i / 10 - j / 20, x + i, y + j) : tone(RP('#8a7a68', '#c8bca4', '#ece4d0', '#fbf6ea'), 2.3 - i / 10, x + i, y + j)); }
    for (const dx of [-2, 0, 2]) linea(x + dx, y - 10, x + dx * 2, y - 16, H('#4a7a2a')); linea(x, y + 10, x + 1, y + 14, H('#c8bca4')); }
  for (let k = 0; k < 10; k++) { const x = 110 + Math.floor(hh(k, 6) * 120), y = 166 + Math.floor(hh(k, 7) * 10); linea(x, y, x + 4, y - 1, H(k % 2 ? '#8a5a9a' : '#e8e0c8')); }
  rect(228, 122, 252, 150, H('#3a2a1a')); for (let y = 123; y < 150; y++) for (let x = 229; x < 252; x++) pset(x, y, tone(RP('#7a6a4a', '#a8946a', '#c8b48a'), 1.4 + ((x + y) % 4 === 0 ? -0.8 : 0), x, y));
});
const NX = 160, NY = 170;   // el nabo grande: centro de abajo
const naboGrande = (t, cara, luz, tapa) => {
  const r = 22, cy = NY - r;
  if (luz > 0) halo(NX, cy, 34 + 6 * luz, RP('#6a3014', '#a8501a', '#e08a30'), 0.9 * luz);
  for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) { if (Math.hypot(x, y * 1.08) > r) continue; const arriba = y < -r * 0.25 + Math.sin(x * 0.4) * 2;
    if (tapa && y < -r * 0.55) continue;
    pset(NX + x, cy + y, arriba ? tone(RP('#3a1a3a', '#6a3a6a', '#9a6a9a', '#c8a0c8'), 2.2 - x / r * 0.9 - y / r * 0.4, NX + x, cy + y) : tone(RP('#8a7a68', '#c8bca4', '#ece4d0', '#fbf6ea'), 2.4 - x / r * 0.8 + (luz > 0 ? 0.3 : 0), NX + x, cy + y)); }
  for (let k = 0; k < 3; k++) linea(NX - 2 + k * 2, cy + r, NX - 3 + k * 3, cy + r + 4, H('#c8bca4'));
  if (tapa) { for (let x = -12; x <= 12; x++) pset(NX + x, cy - 12, H('#2a1410')); } else for (const [dx, h0] of [[-3, 5], [0, 7], [3, 5]]) rect(NX + dx, cy - r - h0, NX + dx + 1, cy - r, H('#4a7a2a'));
  // la cara tallada (cara 0–3: ojo, ojo, boca)
  const hueco = luz > 0 ? (Math.sin(t * 11) > -0.2 ? H('#fff0a0') : H('#f8b040')) : H('#1a0e08'), borde = luz > 0 ? H('#c86a1a') : H('#4a3020');
  if (cara > 0) poligono([[NX - 12, cy + 1], [NX - 7, cy - 8], [NX - 2, cy + 1]], hueco);
  if (cara > 1) poligono([[NX + 2, cy + 1], [NX + 7, cy - 8], [NX + 12, cy + 1]], hueco);
  if (cara > 2) { const m = Math.min(1, cara - 2); poligono([[NX - 13, cy + 6], [NX - 13 + 26 * m, cy + 6], [NX - 13 + 22 * m, cy + 13], [NX - 9, cy + 13]], hueco); for (let k = 0; k < 3; k++) if (m >= 1) rect(NX - 7 + k * 6, cy + 6, NX - 6 + k * 6, cy + 8, borde); }
  if (luz > 0) for (let k = 0; k < 6; k++) { const u = (t * 0.6 + k / 6) % 1; pset(Math.round(NX + Math.sin(k * 2 + t * 2) * 4), Math.round(cy - 14 - u * 20), H(u < 0.5 ? '#c8c0b8' : '#8a8480')); }
};
const p2 = (t) => {
  coc();
  // la turba que arde y el vapor del caldero
  for (let k = 0; k < 9; k++) { const x = 30 + k * 6, hgt = 6 + 6 * hh(k, Math.floor(t * 8)); rect(x - 2, 112, x + 3, 117, H('#3a2414')); poligono([[x - 2, 112], [x + 3, 112], [x + 1, 112 - hgt]], k % 2 ? H('#e07a2a') : H('#f8c050')); }
  halo(52, 110, 30, RP('#5a2a14', '#a84a1a'), 0.7);
  for (let k = 0; k < 5; k++) { const u = (t * 0.5 + k / 5) % 1; disco(56 + Math.sin(t * 2 + k) * 4, 82 - u * 26, 1.5 + u * 3, H(u < 0.5 ? '#e8e4dc' : '#b8b4ac')); }
  // la vela de la mesa
  halo(118, 122, 16, RP('#8a5a2a', '#c8903a'), 0.8); rect(114, 128, 122, 131, H('#8a6a3a')); rect(116, 116, 120, 128, H('#f4ead0')); pset(118, 114, H(Math.sin(t * 12) > 0 ? '#fff6c0' : '#ffb040')); rect(117, 112, 119, 113, H('#ffd060'));
  // el gato en la esquina de la mesa: mira y mueve la cola
  T.gato(R, 300, 128, t);
  // la mano izquierda deja el nabo y lo sujeta; la derecha talla y luego mete la brasa con las tenazas
  const deja = sube(P2 + 0.1, n(0.27), t), cara = t < n(0.35) ? 0 : t < n(0.365) ? 1 : t < n(0.38) ? 2 : 2 + tramo(t, n(0.38), n(0.41));
  const tapa = t > n(0.415), luz = tramo(t, n(0.455), n(0.475)), ny = Math.round(lerp(40, 0, deja));
  const yy = (k) => k + ny;
  // el nabo (sube desde abajo al principio)
  naboGrandeY(t, cara, luz, tapa, ny);
  if (tapa) { for (let y = -6; y <= 0; y++) for (let x = -12; x <= 12; x++) if (Math.hypot(x / 12, (y + 3) / 4) < 1) pset(204 + x, 176 + y, tone(RP('#3a1a3a', '#6a3a6a', '#9a6a9a'), 1.8 - x / 12, 204 + x, 168 + y)); rect(203, 166, 205, 171, H('#4a7a2a')); }
  T.brazo(R, 104, 198, 128, yy(160), '#5a6a3a', 1, { codo: [108, 180] });
  // la derecha: el cuchillo que talla (entra en «carved»), sale y vuelve con las tenazas y la brasa
  const talla = tramo(t, n(0.31), n(0.33)) - tramo(t, n(0.41), n(0.425)), tenaza = tramo(t, n(0.415), n(0.44)) - tramo(t, n(0.47), n(0.5));
  if (talla > 0) { const obj = t < n(0.365) ? [-7, -18] : t < n(0.38) ? [7, -18] : [0, -6], vib = Math.round(Math.sin(t * 30) * 2);
    const wx = Math.round(lerp(236, NX + obj[0] + 18, talla)) + vib, wy = Math.round(lerp(200, NY - 22 + obj[1] + 22, talla));
    T.brazo(R, 232, 200, wx, wy, '#5a6a3a', -1, { codo: [220, 182] });
    linea(wx - 13, wy - 1, wx - 22, wy - 4, H('#d8dce4')); linea(wx - 13, wy, wx - 22, wy - 3, H('#8a909a')); rect(wx - 12, wy - 2, wx - 9, wy + 1, H('#4a2c18')); }
  if (tenaza > 0) { const baja = tramo(t, n(0.44), n(0.455)), wx = Math.round(lerp(236, NX + 34, tenaza)), wy = Math.round(lerp(200, NY - 46, tenaza)) + Math.round(baja * 4);
    T.brazo(R, 240, 200, wx, wy, '#5a6a3a', -1, { codo: [226, 180] });
    const px = NX + 2, py = NY - 44 + Math.round(baja * 12); linea(wx - 12, wy - 1, px, py, H('#2a2a2e')); linea(wx - 12, wy + 1, px + 2, py + 2, H('#4a4a52'));
    if (baja < 1) { disco(px, py + 2, 3, H('#e05a1a')); pset(px, py + 1, H('#fff0a0')); halo(px, py + 2, 8, RP('#a84a1a', '#f08a2a'), 0.8); } }
};
// el nabo grande con desplazamiento vertical (cuando la mano lo deja en la mesa)
const SV = R.nuevo();
function naboGrandeY(t, cara, luz, tapa, dy) { if (!dy) return naboGrande(t, cara, luz, tapa); SV.fill(0); const prev = R.usar(SV); naboGrande(t, cara, luz, tapa); R.usar(prev); for (let i = 0; i < SV.length; i++) if (SV[i]) { const y = ((i / 320) | 0) + dy; if (y < 180) pset(i % 320, y, SV[i]); } }
// ── 3. la leyenda de Jack en sombra chinesca (fondo local) ──
const pared = capa(() => {
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 160) / 150, (y - 76) / 80), junta = (y + (x >> 4)) % 13 === 0 || (x + ((y / 13) | 0) * 9) % 26 === 0;
    pset(x, y, tone(RP('#1a1210', '#3a2a22', '#6a5040', '#a88a68', '#d8b888', '#f0d4a0'), 5 - d * 4.4 - (junta ? 0.5 : 0) + (hh(x >> 1, y >> 1) - 0.5) * 0.5, x, y)); }
  // grietas del encalado y las vigas
  for (const [x, y] of [[70, 40], [250, 110], [120, 120]]) { let cx = x, cy = y; for (let k = 0; k < 14; k++) { const nx = cx + (hh(k, x) - 0.4) * 4, ny = cy + 2; linea(cx, cy, nx, ny, H('#7a6450')); cx = nx; cy = ny; } }
  for (let y = 0; y < 10; y++) for (let x = 0; x < 320; x++) pset(x, y, tone(PR.MADERA, 0.6 + (y === 9 ? -0.6 : 0) + (hh(x >> 3, 2) - 0.5) * 0.5, x, y));
  for (const x of [40, 150, 260]) for (let y = 10; y < 16; y++) for (let k = 0; k < 10; k++) pset(x + k, y, tone(PR.MADERA, 0.8 + (k < 2 ? 0.6 : 0), x + k, y));
  // el manojo de hierbas colgado, la balda con jarras (en la penumbra)
  linea(20, 10, 20, 22, H('#2a2018')); for (let k = 0; k < 9; k++) linea(20, 22, 14 + k * 1.5, 40 + (k % 3) * 3, H(k % 2 ? '#3a5a2a' : '#5a7a3a'));
  rect(276, 92, 318, 94, H('#3a2414')); for (const x of [282, 296, 308]) { rect(x, 80, x + 8, 92, H('#2a2018')); rect(x + 1, 81, x + 7, 91, H('#6a4a3a')); }
  // el suelo de losas
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 150) / 10), junta = (y - 150) % 10 === 0 || (x + fila * 17) % 34 === 0; const d = Math.hypot((x - 160) / 170, (y - 170) / 40);
    pset(x, y, junta ? H('#1a1210') : tone(RP('#2a221c', '#4a3e34', '#6a5a4a', '#8a7660'), 3 - d * 2.2 + (hh(x >> 2, y >> 2) - 0.5) * 0.6, x, y)); }
  // el árbol de la leyenda (sombra fija en la pared) y la loma
  const S = H('#2a1a14');
  poligono([[0, 132], [60, 124], [140, 128], [220, 120], [320, 128], [320, 150], [0, 150]], S);
  rect(238, 70, 244, 124, S); for (const [x1, y1] of [[214, 52], [262, 48], [228, 40], [272, 70], [210, 76]]) { linea(241, 82, x1, y1, S); linea(242, 82, x1 + 1, y1, S); linea(241, 83, x1, y1 + 1, S); }
  for (const [x, y, r] of [[214, 50, 7], [262, 46, 8], [230, 38, 6], [272, 68, 6], [208, 74, 5], [246, 34, 6]]) disco(x, y, r, S);
});
const S = H('#2a1a14'), SOM = RP('#1a100c', '#2e1e16', '#4a3222', '#6a4a32');
const matiz = (c) => { const r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255, l = (r * 0.3 + g * 0.55 + b * 0.15) / 255;
  if (r > 150 && g < 90 && b < 90) return l > 0.3 ? H('#8a2a1a') : H('#6a1a12'); return SOM[Math.min(3, Math.floor(l * 4.2))]; };
const p3 = (t) => {
  pared();
  // Jack (el doble de grande) entra con su farol en «legend»
  const ja = tramo(t, P3 + 0.05, n(0.57)), jx = Math.round(lerp(-40, 70, ja)), levanta = t > n(0.575), monedas = t > n(0.645);
  const ri = t > n(0.705);
  silueta(() => R.actor(EL.jack, 20, 40, t, { dir: 1, anda: ja > 0 && ja < 1, sostiene: levanta ? [37, 18] : undefined, dedo: ri, sonrisa: ri }), S, 2, 20, 0, jx, 52, matiz);
  // su farol: en la sombra, solo la brasa encendida
  if (levanta) { const lx = jx + 38, ly = 52 + 30; halo(lx, ly, 14, RP('#a8501a', '#f0a040'), 0.9); rect(lx - 5, ly - 5, lx + 5, ly + 5, S); for (const [dx, dy] of [[-3, -2], [2, -2], [-2, 2], [0, 2], [2, 2]]) pset(lx + dx, ly + dy, H(Math.sin(t * 11) > 0 ? '#fff0a0' : '#f8a030')); }
  // el tacaño cuenta monedas («miser»): caen brillando
  if (monedas && t < n(0.7)) for (let k = 0; k < 4; k++) { const u = ((t - n(0.645)) * 1.6 + k * 0.25) % 1; const x = jx + 26 + k * 2, y = 100 + u * 24; disco(x, y, 2, H('#f0c040')); pset(x - 1, y - 1, H('#fff6c0')); }
  // el diablillo salta de detrás de la loma y, engañado, se queda colgado del árbol
  const sale = tramo(t, n(0.655), n(0.69)), trepa = tramo(t, n(0.71), n(0.735));
  if (sale > 0) {
    const dx = Math.round(lerp(196, 226, trepa)), dyb = Math.round(lerp(150 - sale * 30, 88, trepa)) + (trepa >= 1 ? Math.round(Math.sin(t * 16) * 1) : 0);
    silueta(() => R.actor(EL.diablillo, 120, 40, t, { dir: -1, salto: trepa > 0 && trepa < 1 ? 4 : 0, brazos: trepa >= 1, sorpresa: trepa >= 1 }), S, 2, 120, 0, dx + (trepa >= 1 ? Math.round(Math.sin(t * 20) * 2) : 0), dyb - 80, matiz);
    if (trepa >= 1 && Math.floor(t * 5) % 2) R.icono('!', dx + 34, dyb - 58, H('#f8e060'), C.k, 2);
  }
  // el abuelo que cuenta la historia y los dos niños que miran
  R.actor(EL.irlandes, 262, 176, t, { dir: -1, habla: Math.sin(t * 6) > 0, dedo: t > n(0.55) && t < n(0.62) || t > n(0.7) });
  R.actor(EL.ninoIrlandes, 70, 178, t, { dir: 1, sorpresa: sale > 0 && trepa < 1, sonrisa: trepa >= 1, salto: trepa >= 1 ? Math.abs(Math.sin(t * 7)) * 2 : 0 });
  R.actor(EL.ninaCampo, 94, 179, t, { dir: 1, sorpresa: sale > 0 && trepa < 1, sonrisa: trepa >= 1 || (ja > 0.6 && sale === 0) });
  // la linterna de nabo en el taburete, que da la luz
  rect(150, 162, 172, 166, H('#3a2414')); rect(152, 166, 154, 179, H('#2a1810')); rect(168, 166, 170, 179, H('#2a1810')); rect(150, 162, 172, 162, H('#7a5030'));
  halo(161, 150, 22, RP('#7a3a14', '#c8701e', '#f0a040'), 0.9); PZ.nabo(R, 161, 162, { s: 2, luz: true, t });
};
// ── 4. el muelle de América: el nabo se vuelve calabaza (fondo local) ──
const CIELO4 = RP('#2e2e5e', '#4a3e76', '#7a4e86', '#b8607a', '#e88a62', '#f6b878');
const muelle = fondoConCielo(() => cieloT(84, CIELO4), () => {
  // la orilla de enfrente: colinas con árboles de otoño, casas de tablas y la iglesia blanca
  for (let x = 0; x < 320; x++) { const yc = 70 + Math.round(6 * Math.sin(x * 0.02) + 3 * Math.sin(x * 0.07)); for (let y = yc; y < 92; y++) pset(x, y, tone(RP('#2a3a2a', '#3a4a2e', '#5a5a34'), 1.6 - (y - yc) * 0.05 + (hh(x >> 1, y >> 1) - 0.5), x, y)); }
  for (let k = 0; k < 70; k++) { const x = Math.floor(hh(k, 11) * 320), y = 72 + Math.floor(hh(k, 12) * 14); disco(x, y, 2 + hh(k, 13) * 2, H(['#c8501a', '#e0902a', '#a83a1a', '#d8b03a', '#7a8a3a'][k % 5])); pset(x - 1, y - 1, H('#f0c060')); }
  for (const [x, w, hgt, c] of [[150, 14, 10, '#e8e0cc'], [168, 12, 9, '#b84a3a'], [196, 16, 11, '#e8e0cc'], [230, 12, 8, '#8a9aa8'], [254, 14, 10, '#d8c8a0']]) {
    rect(x, 90 - hgt, x + w, 90, H(c)); for (let y = 90 - hgt; y < 90; y += 2) linea(x, y, x + w, y, H('#a89a84')); poligono([[x - 2, 90 - hgt], [x + w / 2, 90 - hgt - 6], [x + w + 2, 90 - hgt]], H('#3a2a2a')); rect(x + 3, 84, x + 5, 86, H('#f8d070')); }
  rect(118, 66, 132, 90, H('#ece6d8')); rect(118, 66, 120, 90, H('#c8c0b0')); poligono([[116, 66], [125, 58], [134, 66]], H('#4a3a3a')); rect(122, 46, 128, 58, H('#ece6d8')); poligono([[121, 46], [125, 34], [129, 46]], H('#4a3a3a')); rect(124, 80, 126, 90, H('#5a3a2a'));
  // el agua del puerto con el reflejo del cielo
  for (let y = 92; y < 140; y++) for (let x = 0; x < 320; x++) { const d = y - 92; pset(x, y, tone(RP('#1a2440', '#2a3a5e', '#4a5a80', '#8a7090', '#e09a70'), 2.4 - d * 0.03 + (Math.sin(x * 0.2 + d * 0.8) > 0.8 ? 1.2 : 0) + (hh(x >> 2, y) - 0.5) * 0.6, x, y)); }
  // el muelle: tablas, pilotes, noray, cabos, toneles, sacos y cajas
  for (let y = 136; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor(x / 12) + Math.floor((y - 136) / 22) * 5, junta = x % 12 === 0;
    pset(x, y, junta ? H('#2a1810') : tone(RP('#4a3020', '#6a4a30', '#8a6440', '#a88058'), 2 + (hh(tabla, 3) - 0.5) * 0.8 + (Math.sin(y * 0.5 + tabla) > 0.85 ? -1 : 0) + (y < 139 ? 1 : 0), x, y)); }
  rect(0, 135, 319, 136, H('#2a1810'));
  for (const x of [20, 110, 300]) { rect(x, 140, x + 8, 156, H('#2a1810')); rect(x + 1, 141, x + 7, 155, H('#5a3a24')); rect(x - 1, 138, x + 9, 141, H('#3a2414')); }
  for (let r = 7; r > 1; r -= 2) R.anillo(40, 166, r, H(r % 4 === 1 ? '#c8b080' : '#8a7450'));
  for (const [x, y] of [[292, 172], [306, 160]]) { for (let j = -16; j <= 0; j++) for (let i = -9; i <= 9; i++) { if (Math.abs(i) > 9 - (Math.abs(j + 8) > 6 ? 1 : 0)) continue; pset(x + i, y + j, tone(PR.MADERA, 2.4 - i / 9 * 1.2 + (j === -13 || j === -3 ? -1.2 : 0), x + i, y + j)); } }
  for (const [x, y] of [[10, 176], [24, 178]]) { disco(x, y - 6, 8, H('#6a5a40')); disco(x, y - 7, 7, H('#a8946a')); }
  // el carro del granjero lleno de calabazas
  rect(224, 128, 286, 148, H('#2a1810')); for (let y = 129; y < 148; y++) for (let x = 225; x < 286; x++) pset(x, y, tone(PR.MADERA, 1.8 + ((y - 129) % 6 === 0 ? -1 : 0), x, y));
  for (const x of [234, 276]) { disco(x, 152, 9, H('#2a1810')); disco(x, 152, 7, H('#7a5030')); for (let k = 0; k < 6; k++) linea(x, 152, x + Math.cos(k) * 7, 152 + Math.sin(k) * 7, H('#2a1810')); disco(x, 152, 2, H('#2a1810')); }
  for (const [x, y] of [[234, 130], [252, 130], [270, 130], [243, 122], [261, 122], [252, 115]]) PZ.calabaza(R, x, y, { tallada: false });
  for (const [x, y] of [[300, 146], [212, 154]]) PZ.calabaza(R, x, y, { tallada: false });
});
const p4 = (t) => {
  muelle.fondo();
  muelle.cielo(() => { nube(((t * 3 + 30) % 380) - 40, 26, 36, [H('#5a3a62'), H('#8a5a7a'), H('#d8907a')]); nube(((t * 6 + 200) % 380) - 40, 48, 26, [H('#4a3a66'), H('#7a5a86'), H('#c08aa0')]); nube(((t * 9 + 120) % 380) - 40, 64, 18, [H('#6a4a6a'), H('#a87080'), H('#f0b08a')]);
  aves(t, 5, 30, 18, H('#f6f0e8'), 2); });
  // el bote de remos que cruza el puerto y los brillos del agua
  const bx = Math.round(((t * 10) % 400) - 40); poligono([[bx - 8, 108], [bx + 8, 108], [bx + 6, 111], [bx - 6, 111]], H('#3a2414')); rect(bx - 1, 102, bx + 1, 107, H('#2a2030')); linea(bx - 6, 106 + (Math.sin(t * 4) > 0 ? 2 : 0), bx + 6, 109, H('#5a3a24'));
  for (let k = 0; k < 16; k++) { const x = Math.floor((hh(k, 4) * 320 + t * 4) % 320), y = 96 + Math.floor(hh(k, 5) * 40); if (Math.sin(t * 3 + k) > 0.3) linea(x, y, x + 3, y, H('#f0c8a0')); }
  // el barco atracado, con la pasarela
  R.barco(78, 128 + Math.round(Math.sin(t * 1.2)), t, { esc: 1.15, dir: 1, bandera: null, cabeceo: 0.5 });
  poligono([[112, 120], [122, 118], [156, 140], [146, 142]], (x, y) => tone(PR.MADERA, 2 + ((x + y) % 5 === 0 ? -1 : 0), x, y)); linea(112, 120, 146, 142, H('#2a1810'));
  // la familia baja del barco («In America») y va hacia el carro
  const baja = tramo(t, P4 + 0.1, n(0.82)), w2 = tramo(t, P4 + 0.6, n(0.85));
  const fx = (u, x0, x1) => Math.round(lerp(x0, x1, u)), fy = (u, y0) => Math.round(u < 0.4 ? lerp(y0 - 22, y0, u / 0.4) : y0);
  R.actor(EL.irlandes, fx(baja, 110, 146), fy(baja, 164), t, { dir: 1, anda: baja > 0 && baja < 1, sonrisa: baja >= 1, habla: baja >= 1 && t < n(0.9) && Math.sin(t * 6) > 0 });
  const xb = fx(w2, 112, 176), grande = t > n(0.965);
  const nb = R.actor(EL.ninoIrlandes, xb, fy(w2, 168), t, { dir: 1, anda: w2 > 0 && w2 < 1, sorpresa: t > n(0.84) && !grande, sonrisa: grande, salto: grande ? Math.abs(Math.sin(t * 7)) * 3 : 0, sostiene: grande ? undefined : [xb + 18, 146], brazos: grande });
  if (!grande) { halo(nb.mano[0] + 2, nb.mano[1] + 4, 10, RP('#7a3a1a', '#c86a2a'), 0.6); PZ.nabo(R, nb.mano[0] + 2, nb.mano[1] + 10, { luz: true, t }); }
  // el granjero enseña una calabaza («bigger vegetable»)
  const ens = t > n(0.82);
  const gq = R.actor(EL.colonoPA, 262, 160, t, { dir: -1, sostiene: ens && !grande ? [246, 140] : undefined, habla: ens && Math.sin(t * 7) > 0.2, sonrisa: true, dedo: grande });
  if (ens && !grande) PZ.calabaza(R, gq.mano[0], gq.mano[1] + 8, { tallada: false });
  // en «pumpkin»: el nabo se convierte en una calabaza enorme, tallada y encendida
  puff(xb + 30, 150, tramo(t, n(0.96), n(0.96) + 0.5));
  if (grande) { const e = sube(n(0.965), n(0.965) + 0.3, t); halo(214, 150, 40 * e, RP('#7a3a14', '#c86a1e', '#f0a040'), 0.9); PZ.calabaza(R, 214, 176, { s: Math.max(1, Math.round(3 * e)), luz: true, t }); }
  hojas(t, 4, 0, 320, 80, 170, 0.15, 6);
};
const efectos = [[n(0.17), 'pop'], [n(0.19), 'boing'], [n(0.26), 'golpecito'], [n(0.34), 'lapiz'], [n(0.415), 'pop'], [n(0.46), 'brillo'], [P3 + 0.3, 'whoosh'], [n(0.65), 'golpecito'], [n(0.66), 'boing'], [n(0.72), 'whoosh'], [P4 + 0.3, 'ola'], [n(0.97), 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < P4 ? 1800 : 1850) });
''')

E['tr-dulce'] = ('Truco o trato', '''// TR-DULCE (frase 16), cartela «1927»; cuatro planos:
// 1. «Going door to door in costume» (1927): el porche de Canadá con nieve; la brujita, el fantasma y el gato llegan, la
//    brujita llama («costume»), la puerta se abre y la señora sale con el cuenco de dulces;
// 2. «In England» (1600): la calle de casas de entramado al anochecer; dos pobres con capa llegan a una puerta, la
//    señora sale y les da pastelitos en «little cakes»; en «praying for the dead» inclinan la cabeza y se enciende una vela;
// 3. «and in Scotland» (1890): un callejón de piedra de noche; dos disfrazados con máscaras de papel salen por la puerta
//    («went out»), dan un susto de broma en «disguise» (el gato huye) y llaman a la puerta de al lado;
// 4. «first appears in print» (1927): la calle de la imprenta; el chico de los periódicos sale con el periódico recién
//    impreso, los niños disfrazados corren a verlo y, en «1927», el periódico de la calabaza sale grande.''', AYUDAS + r'''
const d = (f) => en('truco', f);
const P2 = d(0.205), P3 = d(0.545), P4 = d(0.796);
// ── 1. el porche de 1927: llaman a la puerta (calle1927, puerta) ──
const p1 = (t) => {
  const o = { encuadre: 'calle1927', camara: 'puerta' };
  T.estaciones(R, t, o);
  // la puerta se abre hacia dentro: el recibidor con su lámpara, y la señora con el cuenco de dulces
  const abre = sube(d(0.11), d(0.14), t);
  if (abre > 0) { const xr = Math.round(lerp(167, 136, abre));
    for (let y = 54; y < 132; y++) for (let x = 130; x < 167; x++) pset(x, y, tone(RP('#7a4a2a', '#b8783a', '#e8b060', '#f8d890'), 2.6 - (y - 54) / 80 + ((x + y) % 7 === 0 ? -0.6 : 0), x, y));
    for (let y = 60; y < 132; y += 8) linea(136, y, 166, y + 3, H('#a8683a')); halo(150, 70, 12, RP('#e8a050', '#fff0b0'), 1);
    if (abre > 0.85) { const sq = R.actor(EL.irlandesa, 142, 134, t, { dir: 1, sonrisa: true, sostiene: [160, 118] }); for (let y = -3; y <= 0; y++) for (let x = -7; x <= 7; x++) if (Math.hypot(x / 7, (y + 1) / 3) < 1) pset(sq.mano[0] + x, sq.mano[1] + 2 + y, H(y < -1 ? '#e8e0d0' : '#b8b0a0')); PZ.pastelito(R, sq.mano[0] - 2, sq.mano[1], {}); }
    for (let y = 54; y < 132; y++) for (let x = 130; x < 130 + Math.round(37 * (1 - abre)) + 4; x++) pset(x, y, tone(RP('#3a1a12', '#6a2a1a', '#8a3a24'), 1.4 + (x === 130 ? -1 : 0) + (y % 26 === 0 ? -0.8 : 0), x, y)); }
  // los tres niños disfrazados llegan por el porche; la brujita llama con los nudillos («costume»)
  const llega = tramo(t, 1.35, d(0.05)), toc = t > d(0.055) && t < d(0.11);
  const xb = Math.round(lerp(-30, 104, llega));
  R.actor(EL.gato27, xb - 44, 150, t, { dir: 1, anda: llega > 0 && llega < 1, sorpresa: abre > 0.5 && t < d(0.16), sonrisa: t > d(0.16), salto: t > d(0.16) ? Math.abs(Math.sin(t * 7)) * 3 : 0 });
  R.actor(EL.fantasma27, xb - 22, 151, t, { dir: 1, anda: llega > 0 && llega < 1, brazos: t > d(0.16) });
  const bq = R.actor(EL.brujita27, xb, 150, t, { dir: 1, anda: llega > 0 && llega < 1, sostiene: toc ? [128, 118 + (Math.sin(t * 22) > 0 ? -2 : 1)] : undefined, sonrisa: abre > 0.6 });
  if (toc && Math.sin(t * 22) > 0.6) { R.icono('!', 122, 98, H('#f8e060'), C.k, 1); }
  T.estacionesDelante(R, t, o);
};
// ── 2. la calle inglesa de entramado, al anochecer (fondo local) ──
const CIELO2 = RP('#3a4a7a', '#5a6a96', '#8a8aa8', '#c8a0a0', '#f0b890');
const NUB2 = [RP('#6a6a8a', '#9a96ac', '#d8c0c0'), RP('#5a5a7a', '#8a88a0', '#c0b0b8'), RP('#7a6a80', '#b098a0', '#f0c8b0')];
const entramado = (x0, x1, y0, y1, k) => {
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) pset(x, y, tone(RP('#b8aa8c', '#d8ccb0', '#ece4cc', '#f6f0e0'), 2.3 + (hh(x >> 1, y >> 1, k) - 0.5) * 0.7 - (y > y1 - 4 ? 0.8 : 0), x, y));
  const V = H('#2e2018'), V2 = H('#4a3424');
  for (let x = x0; x <= x1; x += 14) { rect(x, y0, x + 2, y1, V); rect(x + 1, y0, x + 1, y1, V2); }
  for (const y of [y0, y1 - 2, Math.round((y0 + y1) / 2)]) { rect(x0, y, x1, y + 2, V); rect(x0, y + 1, x1, y + 1, V2); }
  for (let x = x0; x + 14 <= x1; x += 28) { linea(x + 2, y1 - 2, x + 14, Math.round((y0 + y1) / 2) + 2, V); linea(x + 3, y1 - 2, x + 15, Math.round((y0 + y1) / 2) + 2, V); }
};
const ventanaPlomo = (x0, y0, w, hgt, luz) => { rect(x0 - 2, y0 - 2, x0 + w + 2, y0 + hgt + 2, H('#2e2018'));
  for (let y = y0; y < y0 + hgt; y++) for (let x = x0; x < x0 + w; x++) pset(x, y, ((x - x0 + y - y0) % 5 === 0 || (x - x0 - (y - y0) + 50) % 5 === 0) ? H('#3a3030') : luz ? tone(RP('#c8802a', '#f0b850', '#fff0a0'), 1.4 + hh(x, y), x, y) : tone(RP('#3a4a6a', '#6a7a9a', '#a8b0c8'), 1 + hh(x, y), x, y));
  rect(x0 - 3, y0 + hgt + 2, x0 + w + 3, y0 + hgt + 3, H('#6a5a48')); };
const calleIng = fondoConCielo(() => cieloT(118, CIELO2), () => {
  // la torre de la iglesia y los tejados del fondo
  rect(232, 26, 252, 100, H('#6a6a7a')); for (let y = 26; y < 100; y++) for (let x = 233; x < 252; x++) pset(x, y, tone(RP('#4a4a5a', '#6a6a7a', '#8a8a98'), 1.4 + (x < 237 ? 0.6 : 0) + ((y % 6 === 0 || (x + (y >> 3) * 3) % 8 === 0) ? -0.6 : 0), x, y));
  for (let x = 232; x < 253; x += 4) rect(x, 22, x + 2, 26, H('#5a5a6a')); rect(239, 40, 245, 52, H('#2a2a3a'));
  for (let x = 0; x < 320; x++) { const yc = 86 + Math.round(4 * Math.sin(x * 0.09)); for (let y = yc; y < 100; y++) pset(x, y, tone(RP('#4a3e4a', '#5a4e58', '#6a5e66'), 1 + hh(x >> 2, y >> 2), x, y)); }
  // la casa de la izquierda: tejado de paja, piso volado de entramado
  poligono([[-6, 40], [60, 18], [126, 40]], (x, y) => tone(RP('#5a4a2a', '#8a703a', '#b89a58', '#d8bc78'), 2.4 - (y - 18) / 22 + ((x + y * 2) % 5 === 0 ? -1 : 0) + (hh(x >> 1, y) - 0.5) * 0.6, x, y));
  entramado(0, 120, 40, 76, 1); rect(0, 76, 112, 78, H('#2e2018'));
  entramado(0, 112, 78, 140, 2); ventanaPlomo(14, 50, 22, 16, true); ventanaPlomo(70, 50, 22, 16, false); ventanaPlomo(16, 96, 24, 18, true);
  rect(64, 98, 86, 140, H('#2e2018')); for (let y = 100; y < 140; y++) for (let x = 66; x < 85; x++) pset(x, y, tone(PR.MADERA, 1.6 + ((x - 66) % 5 === 0 ? -1 : 0), x, y)); pset(82, 120, H('#c8a040'));
  // la casa del medio, de dos pisos, donde llaman; su puerta (se abre aparte) en x 150–172
  poligono([[116, 46], [170, 16], [226, 46]], (x, y) => tone(RP('#3a2a2a', '#5a3a32', '#7a4a3e', '#9a5a48'), 2.2 - (y - 16) / 30 + ((y % 4 === 0) ? -0.8 : 0) + (((x >> 2) + (y >> 2)) % 2 ? 0.2 : 0), x, y));
  rect(196, 18, 204, 34, H('#6a3a2a')); for (let y = 18; y < 34; y += 3) linea(196, y, 204, y, H('#4a2414'));
  entramado(118, 222, 46, 82, 3); rect(122, 82, 218, 84, H('#2e2018')); entramado(124, 216, 84, 140, 4);
  ventanaPlomo(132, 56, 20, 16, true); ventanaPlomo(184, 56, 20, 16, true); ventanaPlomo(186, 100, 20, 18, false);
  rect(148, 102, 174, 140, H('#2e2018'));
  // el letrero del horno colgado (un pastel pintado, sin letras)
  rect(126, 90, 146, 91, H('#2e2018')); linea(130, 91, 130, 95, H('#2e2018')); linea(142, 91, 142, 95, H('#2e2018')); rect(128, 95, 144, 107, H('#5a3a20')); rect(129, 96, 143, 106, H('#e8d8a8')); PZ.pastelito(R, 136, 104, {});
  // la casa de la derecha, más baja, con toneles
  poligono([[216, 64], [268, 40], [326, 64]], (x, y) => tone(RP('#5a4a2a', '#8a703a', '#b89a58'), 2 - (y - 40) / 24 + ((x + y * 2) % 5 === 0 ? -1 : 0), x, y));
  entramado(222, 320, 64, 140, 5); ventanaPlomo(236, 78, 22, 16, true); ventanaPlomo(286, 78, 22, 16, false);
  rect(262, 104, 282, 140, H('#2e2018')); for (let y = 106; y < 140; y++) for (let x = 264; x < 281; x++) pset(x, y, tone(PR.MADERA, 1.4 + ((x - 264) % 4 === 0 ? -1 : 0), x, y));
  for (const x of [296, 310]) { for (let j = -14; j <= 0; j++) for (let i = -7; i <= 7; i++) pset(x + i, 150 + j, tone(PR.MADERA, 2.2 - i / 7 + (j === -11 || j === -3 ? -1.2 : 0), x + i, 150 + j)); }
  // los adoquines con el arroyo y los charcos
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 140) / (4 + (y - 140) / 12)), off = (fila % 2) * 4, junta = (x + off) % 9 === 0 || (y - 140) % Math.max(4, Math.round(4 + (y - 140) / 12)) === 0;
    pset(x, y, junta ? H('#2e2a2a') : tone(RP('#4a4648', '#6a6466', '#8a8284', '#a89ea0'), 2 + (hh((x + off) / 9 | 0, fila) - 0.5) * 1 - (y > 172 ? 0.6 : 0), x, y)); }
  for (let x = 0; x < 320; x++) { pset(x, 142, H('#3a3436')); }
  for (const [cx, cy, w] of [[60, 166, 18], [230, 172, 22]]) for (let y = -3; y <= 3; y++) for (let x = -w; x <= w; x++) if (Math.hypot(x / w, y / 3) < 1) pset(cx + x, cy + y, tone(RP('#3a4a6a', '#8a8aa8', '#f0b890'), 1 + (y < 0 ? 0.8 : 0) + hh(x, y) * 0.5, cx + x, cy + y));
});
const p2 = (t) => {
  calleIng.fondo();
  calleIng.cielo(() => { nube(((t * 3 + 60) % 380) - 40, 24, 34, NUB2[0]); nube(((t * 5 + 210) % 380) - 40, 50, 26, NUB2[1]); nube(((t * 8 + 140) % 380) - 40, 66, 18, NUB2[2]);
  aves(t, 5, 18, 14, H('#2a2a3a'), 5);
  for (const [x, y] of [[200, 18]]) for (let k = 0; k < 5; k++) { const u = (t * 0.4 + k / 5) % 1; disco(x + 3 + Math.sin(t + k) * 3 + u * 10, y - u * 18, 1 + u * 3, H(u < 0.5 ? '#c8c4c8' : '#a8a4b0')); } });
  // la puerta del medio se abre en «house to house» y sale la señora con los pastelitos
  const abre = sube(d(0.33), d(0.36), t), xp = Math.round(lerp(174, 154, abre));
  for (let y = 104; y < 140; y++) for (let x = 150; x < 173; x++) pset(x, y, x < xp ? tone(RP('#7a4a2a', '#c8803a', '#f0b860'), 1.6 + (140 - y) / 40, x, y) : tone(PR.MADERA, 1.5 + ((x - 150) % 5 === 0 ? -1 : 0), x, y));
  if (abre > 0) halo(160, 140, 20 * abre, RP('#a8602a', '#e8a050'), 0.6);
  const sale = tramo(t, d(0.35), d(0.38)), xs = Math.round(lerp(152, 174, sale));
  const da = (k) => tramo(t, d(0.4) + k * 0.25, d(0.4) + k * 0.25 + 0.45);
  const sq = sale > 0 ? R.actor(EL.labriega, xs, 152 + Math.round(sale * 6), t, { dir: -1, anda: sale < 1, sonrisa: true, sostiene: da(1) < 1 ? [xs - 4, 140] : undefined, dedo: da(1) >= 1 && t < d(0.48) }) : null;
  // los dos pobres llegan con su capa y su cuenco y piden
  const ll = tramo(t, P2 + 0.05, d(0.33)), reza = t > d(0.48);
  const p1x = Math.round(lerp(-40, 128, ll)), p2x = Math.round(lerp(-62, 104, ll));
  R.actor(EL.pobreCapa2, p2x, 162, t, { dir: 1, anda: ll > 0 && ll < 1, habla: ll >= 1 && !reza && Math.sin(t * 6) > 0.3, triste: reza, quieto: reza });
  R.actor(EL.pobreCapa, p1x, 160, t, { dir: 1, anda: ll > 0 && ll < 1, dedo: ll >= 1 && t < d(0.4), triste: reza, quieto: reza, sonrisa: da(0) >= 1 && !reza });
  // los pastelitos pasan de la mano de la señora a cada cuenco
  if (sq) for (let k = 0; k < 2; k++) { const u = da(k); if (u <= 0) { if (k === 0 || da(0) >= 1) PZ.pastelito(R, sq.mano[0], sq.mano[1] + 2, {}); break; }
    const tx = k === 0 ? p1x + 14 : p2x + 14, ty = k === 0 ? 140 : 142; PZ.pastelito(R, Math.round(lerp(sq.mano[0], tx, u)), Math.round(lerp(sq.mano[1] + 2, ty, u) - Math.sin(u * Math.PI) * 10), {}); }
  // «praying for the dead»: inclinan la cabeza y se enciende una vela encima
  if (reza) { const e = sube(d(0.48), d(0.5), t); halo(122, 112, 18 * e, RP('#a8783a', '#f0c060'), 0.8); if (e > 0.3) R.icono('vela', 116, 98, H('#fff0b0'), C.k, 2); }
  // la oca que cruza, las hojas y el perro que olisquea
  const ox = Math.round(330 - ((t - P2) * 14) % 380); rect(ox, 166, ox + 8, 171, H('#e8e4dc')); rect(ox - 3, 160, ox - 1, 167, H('#e8e4dc')); pset(ox - 4, 161, H('#e89030')); pset(ox - 2, 161, C.k); pset(ox + 2, 172 + (Math.sin(t * 8) > 0 ? 1 : 0), H('#e89030')); pset(ox + 5, 172 + (Math.sin(t * 8) > 0 ? 0 : 1), H('#e89030'));
  hojas(t, 7, 0, 320, 60, 175, 0.18, 7);
};
// ── 3. el callejón escocés de piedra, de noche (fondo local) ──
const piedraMuro = (x0, x1, y0, y1, k) => { for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { const fila = Math.floor((y - y0) / 6), off = (fila * 7) % 13, junta = (y - y0) % 6 === 0 || (x + off) % (11 + (fila % 3)) === 0;
  pset(x, y, junta ? H('#1e1e26') : tone(RP('#2e2e3a', '#44444e', '#5a5a64', '#72707a'), 1.8 + (hh((x + off) / 12 | 0, fila, k) - 0.5) * 1.2, x, y)); } };
const callejon = fondoConCielo(() => { cieloT(90, RP('#0a0e24', '#121a3a', '#1e2850', '#2e3a64'));
  for (let i = 0; i < 70; i++) { const x = Math.floor(hh(i, 21) * 320), y = Math.floor(hh(i, 22) * 80); if (x > 274 && y < 48) continue; pset(x, y, H(i % 3 ? '#8a8ab0' : '#f6f0d8')); }
  disco(236, 30, 9, H('#c8c0a0')); disco(236, 30, 8, H('#f6f0d8')); disco(233, 28, 2, H('#d8d0b8')); disco(239, 33, 1.5, H('#d8d0b8')); }, () => {
  // la casa alta de la izquierda con el hastial escalonado
  const hast = [[0, 36], [36, 36], [36, 30], [48, 30], [48, 24], [60, 24], [60, 18], [96, 18], [96, 24], [108, 24], [108, 30], [120, 30], [120, 36], [150, 36], [150, 146], [0, 146]];
  poligono(hast, H('#44444e')); R.recorte([0, 0, 150, 146]); piedraMuro(0, 151, 18, 146, 1); R.recorte(null);
  for (const [x, y] of [[36, 30], [48, 24], [60, 18], [96, 18], [108, 24], [120, 30]]) rect(x - 1, y - 1, x + 12, y + 1, H('#7a7a84'));
  for (const [x, y, luz] of [[16, 50, true], [110, 50, false], [16, 96, true]]) { rect(x - 2, y - 2, x + 22, y + 26, H('#8a8a90')); rect(x, y, x + 20, y + 24, luz ? H('#e8a040') : H('#1a2038'));
    if (luz) for (let yy = y; yy < y + 24; yy++) for (let xx = x; xx < x + 20; xx++) pset(xx, yy, tone(RP('#b86a20', '#e8a040', '#f8d080'), 1.2 + (yy - y) / 24 + hh(xx, yy) * 0.5, xx, yy));
    rect(x + 9, y, x + 10, y + 24, H('#3a2a20')); rect(x, y + 11, x + 20, y + 12, H('#3a2a20')); }
  rect(92, 96, 122, 146, H('#8a8a90')); rect(94, 98, 120, 146, H('#2a1a14'));
  // el callejón del medio con su arco y su farol
  for (let y = 40; y < 146; y++) for (let x = 150; x < 196; x++) pset(x, y, tone(RP('#0e1020', '#1a1c30', '#2a2c44'), 1 + (y - 40) / 106 + (hh(x >> 2, y >> 2) - 0.5) * 0.5, x, y));
  for (let x = 150; x < 196; x++) { const ya = 56 - Math.round(12 * Math.sin((x - 150) / 46 * Math.PI)); rect(x, 40, x, ya, H('#44444e')); pset(x, ya, H('#6a6a74')); }
  for (let y = 100; y < 146; y++) { const w = Math.round((y - 100) * 0.25); rect(162 - w, y, 184 + w, y, H('#26262e')); }
  // la casita de la derecha con tejado de pizarra y la puerta donde llaman
  poligono([[190, 72], [258, 40], [326, 72]], (x, y) => tone(RP('#1e2230', '#2e3444', '#40485a'), 1.6 - (y - 40) / 40 + ((y % 3 === 0) ? -0.7 : 0), x, y));
  rect(214, 50, 222, 64, H('#3a3a44')); rect(213, 49, 223, 50, H('#6a6a74')); piedraMuro(196, 320, 72, 146, 2);
  rect(232, 102, 256, 146, H('#7a7a84')); rect(234, 104, 254, 146, H('#5a2a20')); for (let y = 104; y < 146; y++) for (let x = 234; x < 254; x++) pset(x, y, tone(RP('#3a1a14', '#5a2a20', '#7a3a2a'), 1.4 + ((x - 234) % 5 === 0 ? -1 : 0), x, y)); pset(250, 124, H('#c8a040'));
  rect(276, 86, 304, 112, H('#8a8a90')); for (let y = 88; y < 110; y++) for (let x = 278; x < 302; x++) pset(x, y, tone(RP('#b86a20', '#e8a040', '#f8d080'), 1.2 + hh(x, y) * 0.8, x, y)); rect(289, 88, 290, 110, H('#3a2a20'));
  // los adoquines mojados
  for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 146) / 5), off = (fila % 2) * 5, junta = (x + off) % 10 === 0 || (y - 146) % 5 === 0;
    pset(x, y, junta ? H('#141420') : tone(RP('#24242e', '#34343e', '#4a4a56', '#6a6a7a'), 1.8 + (hh((x + off) / 10 | 0, fila) - 0.5) * 1.2 + (Math.abs(x - 160) < 20 && hh(x, y) > 0.7 ? 1 : 0), x, y)); }
  rect(0, 146, 320, 147, H('#5a5a66')); rect(92, 146, 122, 149, H('#6a6a74')); rect(232, 146, 256, 149, H('#6a6a74'));
});
const p3 = (t) => {
  callejon.fondo();
  callejon.cielo(() => { estrellas(t, 18, 80, 3); for (const [x, w, v, y] of [[40, 30, 3, 22], [200, 40, 6, 38], [120, 22, 10, 60]]) nube(((t * v + x) % 380) - 40, y, w, [H('#121630'), H('#22284a'), H('#3a4266')]);
  for (const x of [218]) for (let k = 0; k < 5; k++) { const u = (t * 0.35 + k / 5) % 1; disco(x + Math.sin(t + k) * 3 + u * 8, 46 - u * 16, 1 + u * 3, H(u < 0.5 ? '#5a5a6e' : '#3a3a50')); } });
  // la vecina en su ventana encendida (sombra con la vela)
  const vx = 22 + Math.round(Math.sin(t * 0.8) * 3); rect(vx, 104, vx + 8, 120, H('#5a3018')); disco(vx + 4, 102, 4, H('#5a3018'));
  // el farol del callejón y las linternas de nabo de los escalones
  halo(173, 64, 16, RP('#6a4a1a', '#c88a30'), 0.9); rect(170, 58, 176, 68, H('#2a2a2a')); rect(171, 60, 175, 66, H(Math.sin(t * 9) > -0.4 ? '#f8d070' : '#e8a040'));
  for (const x of [86, 262]) { halo(x, 140, 12, RP('#6a3014', '#c8601e'), 0.7); PZ.nabo(R, x, 148, { luz: true, t }); }
  // la puerta se abre en «went out»: salen los dos disfrazados con sus linternas, asustan de broma y llaman a la otra puerta
  const abre = sube(d(0.585), d(0.61), t);
  if (abre > 0) for (let y = 98; y < 146; y++) for (let x = 94; x < 94 + Math.round(26 * abre); x++) pset(x, y, tone(RP('#7a4a1a', '#c8802a', '#f0b850'), 1.4 + (146 - y) / 40, x, y));
  const sal = tramo(t, d(0.6), d(0.66)), sus = t > d(0.65) && t < d(0.7), va = tramo(t, d(0.7), d(0.765)), llama = t > d(0.765);
  const x1 = Math.round(lerp(98, 150, sal) + lerp(0, 74, va)), x2 = Math.round(lerp(100, 124, sal) + lerp(0, 74, va));
  for (const [def, x, s, k] of [[EL.disfrazado2, x2, 166, 1], [EL.disfrazado, x1, 164, 0]]) { if (sal <= 0 && k === 1) continue; if (sal <= 0) continue;
    const q = R.actor(def, x, s, t, { dir: 1, anda: (sal > 0 && sal < 1) || (va > 0 && va < 1), brazos: sus, salto: sus ? Math.abs(Math.sin(t * 8 + k)) * 4 : 0, sostiene: sus ? undefined : llama && k === 0 ? [232, 126 + (Math.sin(t * 20) > 0 ? -2 : 1)] : [x + 18, 146], sonrisa: true });
    if (!sus && !(llama && k === 0)) { linea(q.mano[0], q.mano[1], q.mano[0] + 4, q.mano[1] - 4, H('#5a3a1a')); halo(q.mano[0] + 5, q.mano[1] + 4, 10, RP('#7a3a1a', '#c86a2a'), 0.7); PZ.nabo(R, q.mano[0] + 5, q.mano[1] + 10, { luz: true, t }); } }
  // el gato negro que huye del susto
  const gh = tramo(t, d(0.655), d(0.72)), gx = Math.round(lerp(196, 330, gh)), gy = 160 - (gh > 0 && gh < 1 ? Math.round(Math.abs(Math.sin(gh * 12)) * 4) : 0);
  rect(gx, gy - 4, gx + 9, gy, H('#14141c')); rect(gx + 8, gy - 8, gx + 12, gy - 3, H('#14141c')); pset(gx + 8, gy - 9, H('#14141c')); pset(gx + 12, gy - 9, H('#14141c')); pset(gx + 11, gy - 6, H('#c8e040'));
  linea(gx, gy - 3, gx - 4, gy - (gh > 0 ? 10 : 6), H('#14141c')); for (const dx of [1, 4, 7, 9]) pset(gx + dx, gy + 1 + ((Math.floor(t * 10) + dx) % 2), H('#14141c'));
  if (gh > 0 && gh < 0.4) R.icono('!', gx + 4, gy - 22, H('#f8e060'), C.k, 1);
  if (llama && Math.sin(t * 20) > 0.6) R.icono('!', 226, 112, H('#f8e060'), C.k, 1);
};
// ── 4. la calle de la imprenta: el periódico de la calabaza (calle1927, general) ──
const p4 = (t) => {
  const o = { encuadre: 'calle1927', camara: 'general' };
  T.estaciones(R, t, o);
  // el chico de los periódicos sale de la imprenta («print») con el periódico en alto
  const sale = tramo(t, d(0.84), d(0.92)), xn = Math.round(lerp(184, 130, sale));
  const nq = t > d(0.83) ? R.actor(EL.ninoIrlandes, xn, 142, t, { dir: -1, anda: sale > 0 && sale < 1, sostiene: [xn - 2, 108], habla: sale >= 1 && Math.sin(t * 8) > 0, sonrisa: true }) : null;
  if (nq) PZ.periodico(R, nq.mano[0], nq.mano[1] + 4, { dibujo: 'calabaza', anio: 1927 });
  // los niños disfrazados vienen por la acera y se paran a mirarlo
  const vi = tramo(t, P4 + 0.1, d(0.9)), xv = Math.round(lerp(-30, 72, vi)), mira = t > d(0.91);
  R.actor(EL.brujita27, xv + 22, 143, t, { dir: 1, anda: vi > 0 && vi < 1, sorpresa: mira && t < d(0.95), brazos: t > d(0.95), sonrisa: t > d(0.95) });
  R.actor(EL.fantasma27, xv, 144, t, { dir: 1, anda: vi > 0 && vi < 1, salto: t > d(0.95) ? Math.abs(Math.sin(t * 7)) * 3 : 0 });
  // un vecino barre la nieve delante de su casa
  const bq = R.actor(EL.burgues, 248, 142, t, { dir: -1, sostiene: [236 + Math.round(Math.sin(t * 4) * 4), 132] }); linea(bq.mano[0], bq.mano[1] - 6, bq.mano[0] - 2, bq.mano[1] + 12, H('#7a5030')); for (let k = -3; k <= 3; k++) linea(bq.mano[0] - 2, bq.mano[1] + 12, bq.mano[0] - 2 + k, bq.mano[1] + 17, H('#c8a050'));
  T.estacionesDelante(R, t, o);
  // en «1927», el periódico sale grande desde abajo
  const g = sube(d(0.925), d(0.925) + 0.35, t);
  if (g > 0) { const y = Math.round(lerp(220, 126, g)) + Math.round(Math.sin(t * 2) * 1), x = 262; rect(x - 36, y - 74, x + 42, y + 6, H('#2a2018'));
    PZ.periodico(R, x, y, { s: 4, dibujo: 'calabaza', anio: 1927 }); if (g >= 1 && Math.floor(t * 6) % 3 === 0) for (const [dx, dy] of [[-44, -80], [44, -80], [-44, 4], [44, 4]]) { pset(x + dx, y + dy, H('#fff6c0')); pset(x + dx + 1, y + dy, H('#fff6c0')); } }
};
const efectos = [[d(0.06), 'toc'], [d(0.11), 'puerta'], [d(0.16), 'palmada'], [d(0.33), 'puerta'], [d(0.41), 'pop'], [d(0.49), 'campana'], [d(0.59), 'puerta'], [d(0.655), 'miau'], [d(0.77), 'toc'], [P4 + 0.2, 'maquina'], [d(0.84), 'puerta'], [d(0.925), 'papel']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1927', efectos, año: (t) => (t < P2 ? 1927 : t < P3 ? 1600 : t < P4 ? 1890 : 1927) });
''')
