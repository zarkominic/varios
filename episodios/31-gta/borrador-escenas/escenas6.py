# Borrador de escenas del ep31 (grupo S6): gt-houser, gt-north y gt-tresde, con el movimiento hecho.
E = {}

# utilidades del grupo S6: cada escena las lleva dentro (cada escena es su propia página)
AUX = r'''
const K = hex('#16121e'), BL = hex('#f6f2e6');
const PZ = T.PIEZAS_GT;
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
const P = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, c); };
const tin = (x, y, c, a) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; const p = R.pget(x, y); if (p) R.pset(x, y, mez(p, c, a)); };
const tinta = (x0, y0, x1, y1, c, a) => { for (let y = Math.max(0, Math.round(y0)); y <= Math.min(179, y1); y++) for (let x = Math.max(0, Math.round(x0)); x <= Math.min(319, x1); x++) tin(x, y, c, a); };
const ovalo = (cx, cy, rx, ry, a, c = K) => { cx = Math.round(cx); cy = Math.round(cy); const RY = Math.round(ry); for (let j = -RY; j <= RY; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) tin(x, cy + j, c, a); } };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const tono = (r, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return r[l < 0 ? 0 : l >= r.length ? r.length - 1 : l]; };
const rampa = (...cs) => cs.map(hex);
const CAPAS = {};
const capa = (k, dib) => { if (!CAPAS[k]) { const b = R.nuevo(), prev = R.usar(b); dib(); R.recorte(null); R.usar(prev); CAPAS[k] = b; } return CAPAS[k]; };
const pon = (k, dib) => R.copiar(capa(k, dib));
// pega solo lo pintado de una capa (las capas empiezan transparentes)
const ponDelante = (k, dib, y0 = 0, y1 = 179) => { const b = capa(k, dib); for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const c = b[y * 320 + x]; if (c) R.pset(x, y, c); } };
const suave = (u) => u * u * (3 - 2 * u);
const tr = (t, a, b) => suave(tramo(t, a, b));
// recorrido por fotogramas clave [t, x, suelo, dir]
const ruta = (t, kf) => { if (t < kf[0][0]) return { x: kf[0][1], s: kf[0][2], mv: false, d: kf[0][3] ?? 1 };
  for (let i = 0; i + 1 < kf.length; i++) if (t < kf[i + 1][0]) { const [t0, x0, s0] = kf[i], [t1, x1, s1] = kf[i + 1], u = (t - t0) / (t1 - t0);
    return { x: Math.round(lerp(x0, x1, u)), s: Math.round(lerp(s0, s1, u)), mv: x1 !== x0 || s1 !== s0, d: x1 < x0 ? -1 : x1 > x0 ? 1 : (kf[i + 1][3] ?? 1) }; }
  const f = kf[kf.length - 1]; return { x: f[1], s: f[2], mv: false, d: f[3] ?? 1 }; };
// zonas tranquilas: la de Atom y la barra del año
const quieta = (x, y) => (x >= 274 && y <= 47) || (x >= 16 && x <= 174 && y <= 16);
// cielo tramado (en un búfer)
const cieloBuf = (y0, y1, ram, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(ram, ((y - y0) / Math.max(1, y1 - y0)) * (ram.length - 1) + (h(x >> 3, y >> 2, k) - 0.5) * 0.3, x, y)); };
// nube de tres tonos (luz arriba, sombra abajo), con la base plana; nunca en las zonas tranquilas
const nube = (cx, cy, w, tonos) => { const [L, M, S] = tonos, hh = Math.max(3, Math.round(w * 0.42));
  const lob = [[-w * 0.5, hh * 0.15, w * 0.5], [w * 0.05, -hh * 0.35, w * 0.62], [w * 0.55, hh * 0.1, w * 0.45]];
  for (let y = Math.round(cy - hh * 1.5); y <= cy + Math.round(hh * 0.55); y++) for (let x = Math.round(cx - w * 1.05); x <= cx + w * 1.05; x++) {
    if (x < 0 || x > 319 || y < 0 || y > 179 || quieta(x, y)) continue;
    let d = 9; for (const [dx, dy, r] of lob) { const v = Math.hypot((x - cx - dx) / r, (y - cy - dy) / (r * 0.62)); if (v < d) d = v; }
    if (d >= 1) continue; const u = (y - (cy - hh * 1.4)) / (hh * 1.95) + (d - 0.7) * 0.25;
    R.pset(x, y, u < 0.42 + (b4(x, y) - 0.5) * 0.18 ? L : u < 0.78 + (b4(x, y) - 0.5) * 0.18 ? M : S); } };
const nubes = (t, lista, tonos) => { for (const [x0, y, w, v] of lista) { const span = 360 + w * 2.2, cx = (((x0 + t * v) % span) + span) % span - w * 1.1 - 20; nube(Math.round(cx), y, w, tonos); } };
const pajaros = (t, n, y0, v, k, col) => { for (let i = 0; i < n; i++) { const x = ((h(i, k, 1) * 420 + t * v * (0.8 + h(i, k, 2) * 0.4)) % 420) - 50, y = y0 + h(i, k, 3) * 16 + Math.sin(t * 1.3 + i) * 2, a = Math.floor(t * 6 + i * 1.7) % 2;
  if (quieta(x, y) || quieta(x + 2, y - 2)) continue; P(x, y, col); P(x - 1, y - a, col); P(x + 1, y - a, col); P(x - 2, y - 1 + a, col); P(x + 2, y - 1 + a, col); } };
// vapor o humo que sube: n bocanadas que crecen y se desvanecen
const vapor = (x, y, t, n, alto, col, k = 0, a = 0.55) => { for (let i = 0; i < n; i++) { const u = ((t * 0.5 + i / n + h(i, k, 4) * 0.2) % 1); ovalo(x + Math.sin(t * 1.7 + i * 2.3 + k) * 2.5 * u + u * 4, y - u * alto, 1.6 + u * 4, 1.2 + u * 3, a * (1 - u), col); } };
// la nota musical (5 × 6)
const nota = (x, y, c, s = K) => { x = Math.round(x); y = Math.round(y); for (let j = 0; j < 5; j++) { P(x + 3, y + j, c); P(x + 4, y + j, s); } P(x + 4, y, c); P(x + 5, y + 1, c); P(x + 5, y + 2, c); P(x + 1, y + 4, c); P(x + 2, y + 4, c); P(x + 1, y + 5, c); P(x + 2, y + 5, c); P(x + 3, y + 5, c); P(x, y + 5, s); P(x + 1, y + 6, s); P(x + 2, y + 6, s); };
// notas que salen de (x, y) y suben meciéndose; u0 0–1 las enciende
const notas = (t, x, y, n, k, cols, alto = 34, v = 0.6) => { for (let i = 0; i < n; i++) { const u = ((t * v + i / n) % 1); if (u > 0.92) continue; nota(x + Math.sin(t * 3 + i * 2.1) * 4 + u * (8 + h(i, k) * 10) * (i % 2 ? 1 : -1), y - u * alto, cols[i % cols.length]); } };
// caja con bisel
const caja3 = (x0, y0, x1, y1, base, luz, sombra) => { R.rect(x0, y0, x1, y1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, base); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, luz); R.rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, luz); R.rect(x1 - 1, y0 + 2, x1 - 1, y1 - 1, sombra); R.rect(x0 + 2, y1 - 1, x1 - 1, y1 - 1, sombra); };
const vetas = (x0, y0, x1, y1, veta, luz, k = 0, paso = 0.07) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = Math.sin(x * paso + Math.sin(y * 0.33 + k) * 1.8 + h(y >> 1, k, 3) * 2.4); if (v > 0.93) R.pset(x, y, veta); else if (luz && v < -0.96) R.pset(x, y, luz); } };
// ladrillo con su llaga desplazada en cada hilada
const ladrillos = (x0, y0, x1, y1, ram, mort, k = 0, bw = 7, bh = 4) => { for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / bh), off = fila % 2 ? bw >> 1 : 0;
  for (let x = x0; x <= x1; x++) { const jy = (y - y0) % bh, jx = (x - x0 + off) % bw; if (jy === bh - 1 || jx === bw - 1) R.pset(x, y, mort); else R.pset(x, y, tono(ram, 1.2 + (h(Math.floor((x - x0 + off) / bw), fila, k) - 0.5) * 1.6 + (jy === 0 ? 0.6 : 0) - (jx === bw - 2 ? 0.5 : 0), x, y)); } } };
// ventana con marco, cristal con su reflejo en diagonal y alféizar; o.luz (cálida), o.cruz (parteluz), o.cortina
const ventana = (x, y, w, hh, o = {}) => { const marco = o.marco ?? hex('#d8ccb0'), cr = o.cristal ?? hex('#2e3e5e'), cl = o.reflejo ?? hex('#5e7aa6');
  R.rect(x - 1, y - 1, x + w, y + hh, K); R.rect(x, y, x + w - 1, y + hh - 1, marco); R.rect(x + 1, y + 1, x + w - 2, y + hh - 2, o.luz ?? cr);
  if (!o.luz) { for (let j = 0; j < hh - 2; j++) for (let i = 0; i < w - 2; i++) if ((i + j) % 9 < 2 && i < (w - 2) * 0.7) R.pset(x + 1 + i, y + 1 + j, cl); }
  else for (let j = 0; j < hh - 2; j += 2) for (let i = (j >> 1) % 2; i < w - 2; i += 2) R.pset(x + 1 + i, y + 1 + j, mez(o.luz, BL, 0.25));
  if (o.cortina) { R.rect(x + 1, y + 1, x + 3, y + hh - 2, o.cortina); R.rect(x + w - 4, y + 1, x + w - 2, y + hh - 2, o.cortina); }
  if (o.cruz !== false) { R.rect(x + (w >> 1), y + 1, x + (w >> 1), y + hh - 2, marco); R.rect(x + 1, y + (hh >> 1), x + w - 2, y + (hh >> 1), marco); }
  R.rect(x - 2, y + hh, x + w + 1, y + hh + 1, o.alfeizar ?? marco); R.rect(x - 2, y + hh + 1, x + w + 1, y + hh + 1, mez(o.alfeizar ?? marco, K, 0.35)); };
// coche de perfil (46 px; x = el borde de atrás si dir 1), con ruedas que giran; o.taxi, o.radio (notas)
const cocheLado = (x, base, dir, col, t, o = {}) => { const C0 = hex(col), CL = mez(C0, BL, 0.4), CS = mez(C0, K, 0.3), CC = mez(C0, K, 0.55), GL = hex('#3a4a66'), GLL = hex('#8aa4c8');
  const X = (i) => Math.round(dir > 0 ? x + i : x + 45 - i), fila = (i0, i1, y, c) => { for (let i = i0; i <= i1; i++) P(X(i), y, c); };
  ovalo(x + 23, base, 25, 2, 0.4, K);
  for (let y = base - 13; y <= base - 3; y++) { const r = y === base - 13 ? 3 : y === base - 12 ? 1 : 0; fila(r, 45 - r, y, K); fila(r + 1, 44 - r, y, y <= base - 12 ? CL : y >= base - 5 ? CS : y === base - 8 ? CC : C0); }
  for (let y = base - 21; y <= base - 13; y++) { const k = base - 13 - y, a = 11 + Math.round(k * 0.55), b = 35 - Math.round(k * 0.9); fila(a, b, y, K); if (y > base - 21) fila(a + 1, b - 1, y, y === base - 20 ? CL : C0); }
  for (let y = base - 19; y <= base - 14; y++) { const k = base - 13 - y, a = 13 + Math.round(k * 0.55), b = 33 - Math.round(k * 0.9); fila(a, 22, y, (y + a) % 5 === 0 ? GLL : GL); fila(25, b, y, (y + 25) % 5 === 0 ? GLL : GL); }
  fila(23, 24, base - 18, C0); fila(23, 24, base - 15, C0);
  fila(24, 25, base - 10, CC); fila(28, 31, base - 11, CL);
  if (o.taxi) { fila(20, 26, base - 23, K); fila(21, 25, base - 22, hex('#fff2b0')); fila(19, 27, base - 21, K); for (let i = 3; i < 43; i += 4) P(X(i), base - 8, i % 8 ? K : BL); }
  P(X(44), base - 10, hex('#fff6c0')); P(X(44), base - 9, hex('#fff6c0')); P(X(1), base - 10, hex('#ff4a3a')); P(X(1), base - 9, hex('#c8282a'));
  fila(0, 6, base - 4, hex('#9aa0aa')); fila(39, 45, base - 4, hex('#9aa0aa'));
  for (const i of [10, 35]) { const cx = X(i), cy = base - 3; R.disco(cx, cy, 4, K); R.disco(cx, cy, 2, hex('#8a8e98')); const a = t * 9 * dir; P(cx + Math.round(Math.cos(a) * 2), cy + Math.round(Math.sin(a) * 2), K); P(cx, cy, hex('#d8dce4')); }
  if (o.radio) notas(t, X(30), base - 22, 3, 7, [hex('#ffd84a'), hex('#ff6ab0'), hex('#5af0f0')], 26); };
// el foco de una lámpara: luz suave hacia abajo
const halo = (cx, cy, r, a, c) => ovalo(cx, cy, r, r * 0.7, a, c);
'''

# ───────────────────────────────────────── gt-houser ─────────────────────────────────────────
E['gt-houser'] = ('Los Houser', '''// GT-HOUSER (frases 17–18), cartela «1998». Cinco planos:
// 1. LOCAL una avenida de Nueva York en 1998, desde la acera: la torre de piedra escalonada, la de cristal, el edificio de
//    ladrillo con su escalera de incendios y los depósitos de agua; el ejecutivo de Take 2 cruza la acera con su maletín y
//    entra por la puerta giratoria en «Take 2» (la turista le hace una foto); en «Bought» para un taxi y en «BMG» baja el
//    ejecutivo de BMG con las cajas de juegos y va hacia la puerta; las palomas se van con el claxon.
// 2. el despacho con el cristal a Manhattan (nuevayork 'loft', cámara 'despacho'): en «video game division» el de BMG
//    desliza la pila de cajas sobre la mesa y se dan la mano; en «came two English brothers» entran Sam y Dan por la
//    derecha y en «worked there» el de BMG los presenta.
// 3. LOCAL el rincón de los hermanos (corta en «Sam»): discos, carteles de cine sin letras, la tele y el tocadiscos;
//    Sam saluda en «Sam», Dan en «Dan»; en «movies» se encienden las bombillas de los carteles y la tele; en «music» Sam
//    pone el disco y salen las notas.
// 4. el loft de día (nuevayork 'loft'; corta en «With a few colleagues»): entran dos compañeros con una caja y la
//    guitarra; en «label» Sam levanta un disco con la estrella; en «Rockstar Games» la estrella de la puerta brilla y todos
//    saltan.
// 5. LOCAL el rincón del local de ensayo (corta en «They wanted»): la puerta con la estrella, el amplificador y la
//    batería; en «games» Sam enseña la caja; en «band» Dan rasga la guitarra y la onda sale del amplificador; en «toy
//    company» llega a la balda de juguetes: el osito cae y salta la caja sorpresa.''', AUX + r'''
const TT = (f) => en('takeTwo', f), RK = (f) => en('rockstar', f);
const P2 = TT(0.3841), P3 = TT(0.7302), P4 = RK(0), P5 = RK(0.5879);

// ── 1 · LOCAL la avenida de Nueva York, 1998 ──
const CIE1 = rampa('#3c6abc', '#4a78c6', '#5c88d0', '#729ada', '#8eb0e4', '#aecaee', '#cadcf2');
const NUB1 = [hex('#ffffff'), hex('#dce6f2'), hex('#a8bad6')];
const PIEDRA = rampa('#6e6250', '#8a7c64', '#a8987c', '#c4b496', '#dccca8');
const fondo1 = () => cieloBuf(0, 120, CIE1, 1);
const ciudad1 = () => {
  const { rect, pset, linea, disco, poligono } = R;
  // el perfil lejano, azulado, con antenas
  for (let x = 0, k = 0; x < 320; k++) { const w = 9 + Math.floor(h(k, 1, 2) * 14), top = 62 + Math.floor(h(k, 2, 2) * 34);
    for (let y = top; y < 122; y++) for (let i = x; i < Math.min(320, x + w); i++) pset(i, y, (i - x) % 3 === 1 && (y - top) % 4 === 2 && h(i, y, 5) > 0.3 ? hex('#b2c4da') : i === x ? hex('#7c94b2') : hex('#90a6c2'));
    if (h(k, 3) > 0.6) rect(x + (w >> 1), top - 7, x + (w >> 1), top - 1, hex('#7c94b2')); x += w + 1; }
  // ── el edificio de ladrillo de la izquierda, con escalera de incendios ──
  ladrillos(0, 34, 80, 140, rampa('#6e3424', '#8a4430', '#a0523a', '#b46448'), hex('#5a2c20'), 3);
  rect(0, 30, 82, 35, hex('#c8b49a')); rect(0, 30, 82, 30, hex('#e4d4b8')); for (let x = 1; x < 82; x += 4) rect(x, 36, x + 1, 37, hex('#a89478')); rect(0, 38, 81, 38, hex('#5a2c20'));
  // el depósito de agua del tejado (debajo de la barra del año)
  rect(10, 18, 30, 29, K); for (let y = 19; y < 29; y++) for (let x = 11; x < 30; x++) pset(x, y, tono(rampa('#5a3a22', '#7a5434', '#946a44'), 1.5 + Math.sin(x * 1.3) * 0.6 - (x - 11) / 14, x, y)); rect(11, 21, 29, 21, hex('#3a3a40')); rect(11, 26, 29, 26, hex('#3a3a40'));
  poligono([[9, 18], [20, 12 + 6], [31, 18]], K); rect(12, 16, 28, 17, hex('#4a3a2a')); for (const x of [12, 19, 27]) rect(x, 29, x, 33, K);
  for (const [x, y] of [[8, 44], [32, 44], [56, 44], [8, 66], [32, 66], [56, 66], [8, 88], [32, 88], [56, 88]]) ventana(x, y, 14, 16, { marco: hex('#d8c8aa'), luz: h(x, y, 4) > 0.75 ? hex('#e8c878') : undefined, cortina: h(x, y, 6) > 0.6 ? hex('#a8384a') : undefined });
  rect(38, 72, 45, 77, hex('#c8ccd0')); rect(38, 72, 45, 72, BL); for (let x = 39; x < 45; x += 2) pset(x, 75, hex('#7a7e88'));   // un aparato de aire
  disco(16, 103, 3, hex('#3a8a3a')); rect(13, 104, 19, 106, hex('#a8543a'));   // una maceta
  // la escalera de incendios en zigzag
  for (const y of [61, 83, 105]) { rect(3, y, 72, y + 1, K); for (let x = 3; x <= 72; x += 3) rect(x, y - 6, x, y, K); rect(3, y - 6, 72, y - 6, K); }
  for (const [x0, y0, x1, y1] of [[58, 61, 70, 83], [10, 83, 22, 105]]) { linea(x0, y0, x1, y1, K); linea(x0 + 3, y0, x1 + 3, y1, K); for (let k = 2; k < 11; k += 3) linea(Math.round(lerp(x0, x1, k / 11)), Math.round(lerp(y0, y1, k / 11)), Math.round(lerp(x0, x1, k / 11)) + 3, Math.round(lerp(y0, y1, k / 11)), K); }
  // el bajo: la tienda de ultramarinos con su toldo verde a rayas
  rect(0, 108, 80, 140, hex('#3a2a22')); rect(2, 118, 60, 138, hex('#1e2a30'));
  for (let x = 4; x < 58; x += 4) { const c = [hex('#e87a20'), hex('#d8303a'), hex('#e8c830'), hex('#5aa83a')][(x >> 2) % 4]; for (let j = 0; j < 3; j++) { disco(x + 1, 134 - j * 3, 1, c); } rect(x - 1, 136, x + 3, 138, hex('#8a6a3a')); }
  for (let y = 120; y < 130; y += 3) rect(4, y, 56, y, hex('#3a4a54'));
  rect(64, 116, 77, 140, hex('#5a3a22')); rect(66, 118, 75, 138, hex('#7a5232')); pset(73, 128, hex('#e8c830'));
  for (let x = 0; x <= 80; x++) { const c = Math.floor(x / 5) % 2 ? hex('#2a7a3a') : BL; rect(x, 108, x, 115, c); pset(x, 116 + ((x % 5) < 3 ? 0 : -1), c); }
  rect(0, 107, 80, 107, K); for (let x = 0; x <= 80; x++) pset(x, 112, mez(Math.floor(x / 5) % 2 ? hex('#2a7a3a') : BL, K, 0.25));
  // ── la torre de piedra escalonada del centro ──
  const torre = (x0, x1, y0, y1, vent) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const lado = (x - x0) / (x1 - x0), pil = (x - x0) % 6;
      let v = pil === 0 ? 3.6 : pil === 1 ? 3.0 : 2.2; v -= lado * 1.3; if (vent && pil >= 2 && (y - y0) % 5 >= 1 && (y - y0) % 5 <= 3) { pset(x, y, h(x >> 1, (y / 5) | 0, 8) > 0.86 ? hex('#e8d08a') : tono(rampa('#232a3c', '#2e3a52', '#4a5c7a'), 1 + (1 - lado) * 0.8 - ((y - y0) % 5 === 1 ? 0.6 : 0), x, y)); continue; }
      pset(x, y, tono(PIEDRA, v, x, y)); }
    rect(x0 - 1, y0 - 2, x1 + 1, y0 - 1, hex('#d8a838')); rect(x0 - 1, y0 - 2, x1 + 1, y0 - 2, hex('#ffe08a')); for (let x = x0; x <= x1; x += 4) pset(x, y0, hex('#8a6a24')); };
  torre(92, 184, 66, 140, true); torre(102, 174, 46, 65, true); torre(114, 162, 32, 45, true);
  // la corona con sus escalones dorados y la aguja (por debajo de la barra del año)
  for (let k = 0; k < 4; k++) { const x0 = 124 + k * 4, x1 = 152 - k * 4, y0 = 31 - k * 3; for (let y = y0 - 2; y <= y0; y++) for (let x = x0; x <= x1; x++) pset(x, y, tono(PIEDRA, 3.3 - (x - x0) / (x1 - x0 + 1) * 1.4, x, y)); rect(x0, y0 - 3, x1, y0 - 3, hex('#d8a838')); }
  rect(137, 17, 139, 20, hex('#c4b496')); pset(138, 17, hex('#ffe08a'));
  for (const x of [104, 172]) { poligono([[x - 3, 46], [x, 40], [x + 3, 46]], hex('#d8a838')); pset(x, 42, hex('#ffe08a')); }   // remates dorados
  // el portal: marquesina de bronce y la puerta giratoria (sus hojas giran en cada fotograma)
  rect(96, 112, 180, 140, hex('#2a2420')); for (const x0 of [98, 156]) { rect(x0, 116, x0 + 22, 138, hex('#c8a060')); for (let y = 117; y < 138; y++) for (let x = x0 + 1; x < x0 + 22; x++) pset(x, y, tono(rampa('#a87a40', '#d8b070', '#f0d898'), 1.2 + (y - 117) / 20, x, y)); rect(x0 + 11, 116, x0 + 11, 138, hex('#5a4020')); disco(x0 + 6, 132, 3, hex('#3a7a3a')); rect(x0 + 4, 134, x0 + 8, 138, hex('#5a4a3a')); }
  rect(114, 106, 162, 111, hex('#3a2a20')); rect(114, 106, 162, 106, hex('#d8a838')); rect(114, 111, 162, 111, hex('#8a6a24')); for (let x = 116; x < 162; x += 5) pset(x, 108, hex('#ffe08a'));
  rect(126, 112, 150, 140, hex('#5a4020')); rect(127, 113, 149, 139, hex('#f0d898'));
  // ── la torre de cristal de la derecha ──
  for (let y = 48; y <= 140; y++) for (let x = 196; x <= 264; x++) { const m = (x - 196) % 7 === 0, f = (y - 48) % 5 === 0, ref = ((x - 196) + (y - 48) * 0.6) % 40;
    pset(x, y, m ? hex('#24406a') : f ? hex('#5a86b8') : ref < 9 ? tono(rampa('#5a88bc', '#7aa2d0', '#9ab8de'), 1 + ref / 9, x, y) : tono(rampa('#2e5488', '#3a6498', '#4a74a8'), 1.4 - (x - 196) / 60 + (y - 48) / 140, x, y)); }
  rect(214, 40, 246, 47, hex('#6a7484')); rect(214, 40, 246, 40, hex('#9aa4b4')); for (let x = 216; x < 246; x += 3) rect(x, 42, x, 46, hex('#4a5464')); rect(196, 47, 264, 47, hex('#9ab8de'));
  rect(196, 112, 264, 140, hex('#1e2a3a')); for (let x = 198; x < 264; x += 11) { rect(x, 114, x + 9, 139, hex('#8ab0d4')); rect(x + 1, 115, x + 8, 138, hex('#c8dcec')); pset(x + 2, 116, BL); }
  for (const x of [204, 252]) { rect(x - 4, 132, x + 4, 140, hex('#6a6a72')); disco(x, 126, 6, hex('#2a6a2a')); disco(x - 2, 124, 3, hex('#4a9a3a')); pset(x + 2, 122, hex('#7ac85a')); }
  // ── el edificio de caliza del fondo derecho, con su depósito de agua ──
  for (let y = 66; y <= 140; y++) for (let x = 264; x < 320; x++) pset(x, y, (y - 66) % 14 === 0 ? hex('#7a6e5a') : tono(rampa('#8a7e68', '#a4987e', '#bcb096'), 1.6 + Math.sin(x * 0.7) * 0.3, x, y));
  for (let y = 72; y < 108; y += 14) for (let x = 270; x < 318; x += 12) ventana(x, y, 7, 9, { marco: hex('#d4c8ae'), luz: h(x, y, 9) > 0.8 ? hex('#e8c878') : undefined, cruz: false });
  rect(288, 50, 306, 61, K); for (let y = 51; y < 61; y++) for (let x = 289; x < 306; x++) pset(x, y, tono(rampa('#5a3a22', '#7a5434', '#946a44'), 1.4 + Math.sin(x * 1.4) * 0.6, x, y)); rect(289, 54, 305, 54, hex('#3a3a40'));
  poligono([[287, 50], [297, 44 + 4], [307, 50]], K); for (const x of [289, 297, 305]) rect(x, 61, x, 65, K);
  // la boca del metro: barandilla verde y escalera
  rect(270, 124, 316, 140, hex('#2a3a30')); for (let x = 272; x < 316; x += 3) rect(x, 126, x, 132, hex('#3a6a4a')); rect(270, 124, 316, 125, hex('#4a8a5a')); for (let y = 134; y < 140; y += 2) rect(274, y, 312, y, hex('#6a6a6a'));
  for (const x of [272, 314]) { rect(x, 112, x, 124, hex('#2a4a34')); }
  // ── la acera, el bordillo y la calzada ──
  for (let y = 140; y <= 153; y++) for (let x = 0; x < 320; x++) pset(x, y, x % 18 === 0 || y === 146 ? hex('#8e8a84') : tono(rampa('#a8a49c', '#b8b4ac', '#c8c4bc'), 1.4 + (h(x >> 1, y, 11) - 0.5) * 0.9 - (y - 140) / 30, x, y));
  for (let i = 0; i < 26; i++) { const x = h(i, 1, 12) * 320, y = 141 + h(i, 2, 12) * 11; pset(x, y, hex('#8e8a84')); pset(x + 1, y, hex('#9a968e')); }
  rect(0, 153, 319, 154, hex('#d8d4cc')); rect(0, 155, 319, 155, hex('#5a5a60')); rect(0, 156, 319, 156, hex('#2e2e34'));
  for (let y = 157; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(rampa('#34363e', '#3e4048', '#4a4c54', '#56585e'), 1.6 + (h(x >> 1, y >> 1, 13) - 0.5) * 1.2 + (y - 157) / 40, x, y));
  for (let x = 4; x < 320; x += 24) rect(x, 167, x + 11, 167, hex('#d8d4c8'));
  for (let i = 0; i < 14; i++) { const x = h(i, 3, 14) * 320; rect(x, 160 + h(i, 4) * 16, x + 6 + h(i, 5) * 10, 160 + h(i, 4) * 16, hex('#2e3036')); }
  // la alcantarilla, la boca de riego y la papelera
  for (let j = -2; j <= 2; j++) rect(232 - 7 + Math.abs(j), 173 + j, 232 + 7 - Math.abs(j), 173 + j, hex('#26262c')); rect(228, 173, 236, 173, hex('#4a4a52'));
  rect(84, 140, 88, 151, hex('#c8282a')); rect(83, 140, 89, 141, hex('#e84a4a')); rect(82, 145, 90, 146, hex('#8a1a1a')); pset(85, 143, hex('#ff8a8a'));
  rect(176, 138, 183, 151, hex('#3a5a3a')); rect(175, 138, 184, 139, hex('#5a7a5a')); for (let y = 141; y < 151; y += 3) rect(177, y, 182, y, hex('#2a3a2a'));
};
// el carrito de los perritos calientes (delante del vendedor)
const carrito = (t) => { const { rect, disco, poligono } = R;
  rect(32, 128, 64, 146, K); rect(33, 129, 63, 145, hex('#c8ccd4')); rect(33, 129, 63, 130, BL); rect(33, 140, 63, 145, hex('#9aa0aa')); for (let x = 36; x < 62; x += 6) rect(x, 132, x + 3, 137, hex('#e8a040'));
  rect(46, 104, 47, 128, hex('#5a5a62')); for (let i = 0; i < 9; i++) { const c = i % 2 ? hex('#e8c830') : hex('#2a5ab8'); poligono([[47, 98], [30 + i * 4, 108], [34 + i * 4, 108]], c); } R.linea(30, 108, 66, 108, K);
  disco(38, 147, 3, K); disco(38, 147, 1, hex('#8a8e98')); disco(58, 147, 3, K); disco(58, 147, 1, hex('#8a8e98'));
  vapor(52, 127, t, 4, 16, BL, 2, 0.45); };
// las palomas que picotean y se van con el claxon
const palomas = (t, ve) => { for (let i = 0; i < 5; i++) { const x0 = 200 + i * 7 + h(i, 1) * 4, y0 = 149 + (i % 2) * 2, u = ve == null ? 0 : tramo(t, ve + i * 0.08, ve + 1.4 + i * 0.1);
  const x = x0 + u * (60 + i * 18), y = y0 - u * (90 + i * 10) + Math.sin(u * 9) * 3; if (quieta(x, y)) continue;
  const pic = u === 0 && Math.sin(t * 7 + i * 2) > 0.6; P(x, y - 2 + (pic ? 1 : 0), hex('#6a6e7a')); P(x + 1, y - 2 + (pic ? 1 : 0), hex('#4a8a7a'));
  if (u > 0) { const a = Math.floor(t * 12 + i) % 2; P(x - 1, y - 2 - a, hex('#9aa0aa')); P(x - 2, y - 3 + a, hex('#9aa0aa')); P(x, y - 1, hex('#7a7e8a')); }
  else { P(x - 1, y - 1, hex('#8a8e9a')); P(x, y - 1, hex('#9aa0aa')); P(x - 2, y - 1, hex('#6a6e7a')); P(x - 1, y, hex('#d86a4a')); P(x, y, hex('#d86a4a')); } } };
// la caja de cartón con los juegos (la llevan en brazos)
const cajaCarton = (x, y, w = 14, hh = 9) => { caja3(x, y, x + w, y + hh, hex('#c89a5a'), hex('#e0b878'), hex('#9a7038')); R.rect(x + 1, y + 3, x + w - 1, y + 3, hex('#d8c8a0')); for (let i = 0; i < 3; i++) { R.rect(x + 2 + i * 4, y - 3, x + 4 + i * 4, y, [hex('#e0a030'), hex('#3a6ad8'), hex('#d8303a')][i]); R.pset(x + 3 + i * 4, y - 2, BL); } };
const ENTRA = TT(0.1913), PARA = TT(0.2353), BAJA = TT(0.2657);
const p1 = (t) => {
  pon('h1cielo', fondo1);
  nubes(t, [[20, 58, 18, 3], [150, 40, 26, 5], [250, 74, 14, 2.5], [330, 26, 20, 4], [90, 90, 12, 2], [210, 52, 15, 3.5]], NUB1);
  pajaros(t, 4, 50, 18, 3, hex('#2a3448'));
  ponDelante('h1ciudad', ciudad1);
  // la luz de una nube que pasa por la torre de cristal
  { const cx = 150 + ((t * 16) % 180); for (let y = 50; y < 110; y++) for (let x = Math.max(197, cx - 8 - (y >> 2)); x <= Math.min(263, cx + 8 - (y >> 2)); x++) if ((x - 196) % 7) tin(x, y, hex('#d8e8f6'), 0.35); }
  // la bandera de la torre, que ondea
  R.rect(184, 88, 196, 88, hex('#4a4a52'));
  for (let i = 0; i < 14; i++) { const dy = Math.round(Math.sin(t * 6 - i * 0.6) * 1.2 * (i / 14)); for (let j = 0; j < 9; j++) { const c = i < 6 && j < 5 ? (h(i, j) > 0.7 && (i + j) % 2 ? BL : hex('#2a3a8a')) : (j % 2 ? BL : hex('#c8282a')); P(196 + i, 88 + j + dy, c); } }
  // el semáforo
  { R.rect(186, 96, 188, 153, hex('#2a3a2a')); R.rect(183, 94, 191, 113, K); R.rect(184, 95, 190, 112, hex('#3a4a3a')); const f = t % 6, c = f < 2.6 ? 0 : f < 5.4 ? 2 : 1;
    [hex('#ff3a3a'), hex('#ffc83a'), hex('#4aff7a')].forEach((col, k) => { R.disco(187, 99 + k * 6, 2, k === c ? col : mez(col, K, 0.75)); if (k === c) halo(187, 99 + k * 6, 4, 0.25, col); }); }
  // las farolas verdes del metro, encendidas
  for (const x of [272, 314]) { R.disco(x, 110, 3, hex('#3a8a4a')); R.disco(x, 109, 1, hex('#bff0c8')); }
  // la puerta giratoria: las hojas giran (más deprisa cuando entra alguien)
  { const giro = t * 1.4 + 3 * tr(t, ENTRA - 0.2, ENTRA + 0.8); for (let k = 0; k < 3; k++) { const a = giro + k * 2.094, x = Math.round(138 + Math.sin(a) * 10); R.rect(x, 114, x, 139, Math.cos(a) > 0 ? hex('#5a4020') : hex('#a8885a')); }
    R.rect(127, 113, 149, 113, hex('#5a4020')); }
  // el vendedor tras su carrito y la turista que hace fotos a la torre
  R.actor(EL.chico, 44, 142, t, { dir: 1, habla: t > 1.6 && t < 2.6 && Math.sin(t * 9) > 0 });
  carrito(t);
  const fot = t > ENTRA - 0.3 && t < ENTRA + 0.9;
  const tu = R.actor(EL.turista, 222, 150, t, { dir: -1, sostiene: t > 1.4 ? [214, 132] : undefined, sonrisa: t > ENTRA + 0.3 });
  if (tu.mano && t > 1.4) { const [mx, my] = tu.mano; R.rect(mx - 4, my - 3, mx + 1, my + 1, K); R.rect(mx - 3, my - 2, mx, my, hex('#3a3a44')); R.pset(mx - 3, my - 2, hex('#9ab0d0')); if (fot && t - ENTRA > -0.05 && t - ENTRA < 0.15) { halo(mx - 3, my - 2, 9, 0.7, BL); for (const [dx, dy] of [[-8, 0], [6, 0], [0, -7], [-6, -5], [4, -5]]) R.linea(mx - 3 + dx * 0.5, my - 2 + dy * 0.5, mx - 3 + dx, my - 2 + dy, BL); } }
  palomas(t, 2.55);
  // el ejecutivo de Take 2 cruza la acera y entra por la puerta giratoria
  if (t < ENTRA + 0.25) { const q = ruta(t, [[1.3, -18, 151, 1], [ENTRA - 0.35, 128, 151, 1], [ENTRA + 0.25, 132, 142, 1]]);
    const a = R.actor(EL.ejecutivo, q.x, q.s, t, { dir: 1, anda: q.mv, sostiene: [q.x + 14, q.s - 9] });
    if (a.mano) { const [mx, my] = a.mano; R.rect(mx - 2, my, mx + 6, my + 6, K); R.rect(mx - 1, my + 1, mx + 5, my + 5, hex('#5a3a22')); R.rect(mx - 1, my + 1, mx + 5, my + 1, hex('#8a5a32')); R.pset(mx + 2, my + 3, hex('#d8a838')); } }
  // un oficinista con su café pasa hacia la izquierda
  { const x = Math.round(lerp(336, -20, tramo(t, 1.3, 6.4))); const a = R.actor(EL.oficinista, x, 152, t, { dir: -1, anda: true, sostiene: true }); if (a.mano) { const [mx, my] = a.mano; R.rect(mx - 1, my - 4, mx + 2, my, BL); R.rect(mx - 1, my - 2, mx + 2, my - 2, hex('#2a5ab8')); vapor(mx, my - 5, t, 2, 6, BL, 5, 0.4); } }
  // el de BMG baja del taxi con la caja de juegos y va hacia la puerta
  if (t > BAJA) { const q = ruta(t, [[BAJA, 168, 156, -1], [BAJA + 0.3, 166, 151, -1], [P2, 120, 150, -1]]);
    const a = R.actor(EL.ejecutivoBMG, q.x, q.s, t, { dir: -1, anda: q.mv, sostiene: [q.x - 1, q.s - 12] }); if (a.mano) cajaCarton(a.mano[0] - 8, a.mano[1] - 6); }
  // el tráfico (por delante de la gente): un coche verde que va a la izquierda y el taxi que para
  { const x = lerp(330, -60, tramo(t, 1.3, 4.4)); cocheLado(x, 166, -1, '#3a7a5a', t); }
  { const u = tramo(t, 1.6, PARA), x = t < PARA ? lerp(-50, 150, 1 - (1 - u) * (1 - u)) : 150 + (t > P2 - 0.6 ? (t - P2 + 0.6) * 160 : 0); cocheLado(x, 176, 1, '#f0c020', t < PARA || t > P2 - 0.6 ? t : PARA, { taxi: true });
    if (t > 2.5 && t < 2.9) for (const k of [0, 1, 2]) R.linea(x + 48 + k * 2, 160 + k * 3 - 3, x + 52 + k * 3, 158 + k * 4 - 3, BL); }
  // la alcantarilla echa vapor
  vapor(232, 172, t, 5, 30, hex('#e8ecf2'), 9, 0.5);
};

// ── 2 · el despacho: la venta de la división de juegos ──
const G2 = { encuadre: 'loft', camara: 'despacho' };
const DESLIZA = TT(0.40), MANO = TT(0.4509), VIENEN = TT(0.5222), PRESENTA = TT(0.674);
const p2 = (t) => {
  T.nuevayork(R, t, G2);
  // Sam y Dan entran por la derecha
  const sm = ruta(t, [[VIENEN, 334, 156, -1], [VIENEN + 1.1, 276, 156, -1]]), dn = ruta(t, [[VIENEN + 0.3, 350, 156, -1], [VIENEN + 1.5, 296, 156, -1]]);
  const aprieta = t > MANO - 0.12 && t < MANO + 0.9, osc = aprieta ? Math.round(Math.sin(t * 22)) : 0;
  const empuja = t > DESLIZA - 0.2 && t < MANO - 0.15, bx = Math.round(lerp(176, 140, tr(t, DESLIZA, MANO - 0.2)));
  R.actor(EL.ejecutivo, 124, 147, t, { dir: 1, sostiene: aprieta ? [156, 132 + osc] : undefined, sonrisa: t > MANO, habla: t > P2 + 0.1 && t < DESLIZA && Math.sin(t * 9) > 0, sorpresa: t > DESLIZA + 0.1 && t < MANO - 0.2 });
  R.actor(EL.ejecutivoBMG, 188, 147, t, { dir: -1, sostiene: aprieta ? [160, 132 + osc] : empuja ? [bx + 12, 140] : undefined, dedo: t > PRESENTA - 0.1 && t < PRESENTA + 0.8, sonrisa: t > MANO });
  T.nuevayorkDelante(R, t, G2);
  // la pila de cajas de juego que se desliza sobre la mesa
  // la pila de cajas de juego, tumbadas: la división de juegos de BMG
  for (let k = 0; k < 4; k++) { const c = hex(['#3a6ad8', '#d8303a', '#3a8a4a', '#e0a030'][k]), y = 147 - k * 4, x = bx + (k % 2); R.rect(x - 1, y - 4, x + 19, y, K); R.rect(x, y - 3, x + 18, y - 1, c); R.rect(x, y - 3, x + 18, y - 3, mez(c, BL, 0.45)); R.rect(x + 14, y - 3, x + 17, y - 1, BL); R.pset(x + 15, y - 2, K); }
  R.icono('coche', bx + 5, 128, BL, K);
  if (aprieta && t < MANO + 0.5) for (const [dx, dy] of [[-7, -5], [8, -5], [0, -9], [-9, 2], [10, 2]]) { const u = tramo(t, MANO - 0.1, MANO + 0.5); R.linea(158 + dx * (0.5 + u * 0.4), 130 + dy * (0.5 + u * 0.4), 158 + dx * (1 + u * 0.4), 130 + dy * (1 + u * 0.4), hex('#fff0a0')); }
  R.actor(EL.samHouser, sm.x, sm.s, t, { dir: sm.mv ? -1 : -1, anda: sm.mv, sonrisa: t > PRESENTA, dedo: t > PRESENTA + 0.3 && t < PRESENTA + 0.9 });
  R.actor(EL.danHouser, dn.x, dn.s, t, { dir: -1, anda: dn.mv, sonrisa: t > PRESENTA + 0.2, habla: t > PRESENTA + 0.5 && Math.sin(t * 8) > 0 });
};

// ── 3 · LOCAL el rincón de los hermanos: discos, carteles de cine, la tele y el tocadiscos ──
const MOVIES = TT(0.9063), MUSIC = TT(0.9579), SAM = TT(0.7302), DAN = TT(0.7636);
const PARED3 = rampa('#1e3a3a', '#264646', '#2e5252', '#386060');
const fondo3 = () => {
  const { rect, pset, linea, disco, poligono } = R;
  for (let y = 0; y <= 112; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(PARED3, 1.7 + (h(x >> 2, y >> 2, 31) - 0.5) * 0.5 - (y < 18 ? 0.8 : 0) + (x > 274 ? -0.2 : 0), x, y));
  rect(0, 17, 319, 18, hex('#5a4a3a')); rect(0, 17, 319, 17, hex('#8a7458'));    // la moldura
  // el friso de madera de abajo
  for (let y = 96; y <= 118; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(rampa('#3a2416', '#4e3220', '#62402a'), 1.5 + Math.sin(x * 0.4 + Math.sin(y * 0.5) * 2) * 0.35, x, y));
  rect(0, 96, 319, 96, hex('#8a6a48')); for (let x = 6; x < 320; x += 26) { rect(x, 100, x + 20, 114, hex('#3a2416')); rect(x + 1, 101, x + 20, 114, hex('#5a3a24')); rect(x + 1, 101, x + 19, 101, hex('#7a5434')); }
  // el suelo de tablones y la alfombra
  for (let y = 119; y < 180; y++) for (let x = 0; x < 320; x++) { const tab = Math.floor((y - 119) / 6), j = (x + tab * 37) % 44; pset(x, y, (y - 119) % 6 === 0 || j === 0 ? hex('#4a2c18') : tono(rampa('#6a4224', '#7e5230', '#946240'), 1.4 + Math.sin(x * 0.12 + tab * 2 + Math.sin(x * 0.03) * 3) * 0.45, x, y)); }
  for (let y = 140; y < 174; y++) for (let x = 70; x < 252; x++) { const bx = Math.min(x - 70, 251 - x), by = Math.min(y - 140, 173 - y), b = Math.min(bx, by);
    pset(x, y, b < 2 ? hex('#3a1a24') : b < 5 ? ((x + y) % 4 < 2 ? hex('#d8a848') : hex('#8a2a34')) : tono(rampa('#5a1a26', '#7a2432', '#9a3040'), 1.2 + Math.sin(x * 0.3) * Math.sin(y * 0.4) * 0.8, x, y)); }
  for (let x = 72; x < 250; x += 3) { pset(x, 139, hex('#e8d8b0')); pset(x + 1, 174, hex('#e8d8b0')); }
  // la estantería de discos de la izquierda
  rect(4, 26, 74, 118, hex('#3a2216')); rect(6, 28, 72, 116, hex('#2a180e'));
  for (const y of [50, 72, 94, 116]) { rect(4, y, 74, y + 2, hex('#7a5434')); rect(4, y, 74, y, hex('#a07448')); }
  for (const [y0, y1] of [[29, 49], [52, 71], [74, 93], [96, 115]]) for (let x = 7; x < 72; x++) { if (h(x, y0, 3) > 0.92) continue; const c = [hex('#d8d0c0'), hex('#c8302a'), hex('#2a5ab8'), hex('#e8b830'), hex('#1e1e24'), hex('#3a8a4a'), hex('#e87a30'), hex('#8a3ab8')][Math.floor(h(x, y0, 4) * 8)]; const top = y0 + Math.floor(h(x, y0, 5) * 3); rect(x, top, x, y1, c); if (x % 2) pset(x, top, mez(c, BL, 0.4)); }
  // dos discos de frente en la balda
  const funda = (x, y, c, dib) => { rect(x, y, x + 16, y + 16, K); rect(x + 1, y + 1, x + 15, y + 15, hex(c)); dib(x + 8, y + 8); rect(x + 15, y + 2, x + 15, y + 15, mez(hex(c), K, 0.35)); };
  funda(12, 32, '#e8a040', (cx, cy) => { disco(cx, cy, 5, K); disco(cx, cy, 2, hex('#d8303a')); pset(cx, cy, K); });
  funda(46, 54, '#2a4a8a', (cx, cy) => { poligono([[cx, cy - 6], [cx + 2, cy - 1], [cx + 6, cy - 1], [cx + 3, cy + 2], [cx + 4, cy + 6], [cx, cy + 3], [cx - 4, cy + 6], [cx - 3, cy + 2], [cx - 6, cy - 1], [cx - 2, cy - 1]], hex('#f0d040')); });
  // la lámpara de lava sobre la estantería
  rect(56, 22, 64, 25, hex('#4a4a52')); poligono([[57, 22], [58, 10 + 7], [62, 10 + 7], [63, 22]], hex('#d84a8a')); rect(58, 16, 62, 17, hex('#4a4a52'));
  // los tres carteles de cine (sin letras), con su marco de bombillas
  const cartel = (x, y, dib) => { rect(x - 3, y - 3, x + 40, y + 58, hex('#2a2018')); rect(x - 2, y - 2, x + 39, y + 57, hex('#c8a050')); rect(x - 1, y - 1, x + 38, y + 56, hex('#6a4a24')); rect(x, y, x + 37, y + 55, K); dib(x + 1, y + 1, 36, 54); ovalo(x + 19, y + 60, 18, 2, 0.3, K); };
  cartel(86, 24, (x, y, w, hh) => { for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) pset(x + i, y + j, tono(rampa('#0e1430', '#18204a', '#24306a', '#3a4a8a'), j / hh * 3, x + i, y + j));
    disco(x + 24, y + 12, 7, hex('#f0e08a')); disco(x + 26, y + 10, 6, hex('#18204a')); for (let i = 0; i < w; i += 5) { const top = y + 26 + Math.floor(h(i, 1, 6) * 10); rect(x + i, top, x + i + 4, y + 44, K); for (let jj = top + 2; jj < y + 42; jj += 3) pset(x + i + 2, jj, h(i, jj) > 0.5 ? hex('#f0d060') : K); }
    rect(x, y + 44, x + w - 1, y + hh - 1, hex('#1a1a22')); rect(x + 8, y + 40, x + 26, y + 46, hex('#c8282a')); rect(x + 12, y + 37, x + 22, y + 40, hex('#c8282a')); disco(x + 12, y + 47, 2, K); disco(x + 23, y + 47, 2, K); rect(x + 26, y + 42, x + 26, y + 43, hex('#fff2b0')); });
  cartel(134, 24, (x, y, w, hh) => { for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) pset(x + i, y + j, tono(rampa('#f0a040', '#f07a48', '#e05a6a', '#a83a7a', '#5a2a6a'), j < 30 ? (1 - j / 30) * 3 + 0.5 : 4, x + i, y + j));
    disco(x + 18, y + 26, 9, hex('#ffe070')); for (let k = 0; k < 4; k++) rect(x + 8, y + 22 + k * 3, x + 28, y + 22 + k * 3, hex('#f07a48')); rect(x, y + 30, x + w - 1, y + 33, hex('#3a1a3a'));
    for (const [px, ph] of [[5, 24], [31, 30]]) { rect(x + px, y + 54 - ph, x + px + 1, y + 34, K); for (let k = -3; k <= 3; k++) R.linea(x + px, y + 54 - ph, x + px + k * 2, y + 54 - ph + 4 - Math.abs(k), K); }
    poligono([[x + 18, y + 34], [x + 4, y + hh - 1], [x + 32, y + hh - 1]], hex('#2a2a32')); rect(x + 17, y + 38, x + 18, y + 52, hex('#f0d040')); });
  cartel(182, 24, (x, y, w, hh) => { for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) pset(x + i, y + j, tono(rampa('#2a2a2a', '#5a5a5a', '#8a8a8a', '#bcbcbc'), 3 - j / hh * 2.6 + (h(i, j, 9) - 0.5) * 0.4, x + i, y + j));
    for (let k = 0; k < 2; k++) { const a = -1.1 + k * 0.5; for (let r = 0; r < 34; r++) pset(x + 10 + k * 16 + Math.round(Math.cos(a) * r * 0.4), y + 50 - Math.round(r), hex('#e8e8e8')); }
    for (let i = 0; i < w; i += 4) { const top = y + 30 + Math.floor(h(i, 2, 7) * 12); rect(x + i, top, x + i + 3, y + hh - 1, hex('#1a1a1a')); }
    poligono([[x + 18, y + 6], [x + 21, y + 13], [x + 28, y + 13], [x + 22, y + 17], [x + 25, y + 24], [x + 18, y + 20], [x + 11, y + 24], [x + 14, y + 17], [x + 8, y + 13], [x + 15, y + 13]], hex('#f0f0f0')); });
  // el mueble de la tele, con el vídeo y las cintas
  rect(232, 92, 276, 120, K); for (let y = 93; y < 120; y++) for (let x = 233; x < 276; x++) pset(x, y, tono(rampa('#4a2c18', '#5e3a22', '#74482a'), 1.5 + Math.sin(x * 0.5 + y * 0.1) * 0.4, x, y)); rect(233, 93, 275, 93, hex('#9a6a40'));
  rect(236, 98, 264, 104, hex('#2a2a30')); rect(238, 100, 252, 100, K); pset(260, 101, hex('#4aff7a')); for (let i = 0; i < 4; i++) { rect(236 + i * 7, 107, 241 + i * 7, 117, hex('#1a1a1e')); rect(237 + i * 7, 109, 240 + i * 7, 111, hex('#e8e4d8')); }
  rect(232, 62, 272, 92, K); rect(233, 63, 271, 91, hex('#3a3a42')); rect(233, 63, 271, 63, hex('#5a5a64')); rect(266, 70, 269, 71, hex('#5a5a64')); rect(266, 74, 269, 75, hex('#5a5a64')); R.linea(244, 62, 238, 52, hex('#8a8a92')); R.linea(256, 62, 262, 50, hex('#8a8a92'));
  // la planta y el perchero con la chupa de la derecha (lejos de la esquina de Atom)
  rect(290, 104, 304, 119, hex('#a8543a')); rect(290, 104, 304, 105, hex('#c8745a')); for (let k = 0; k < 9; k++) { const a = -2.6 + k * 0.4; R.linea(297, 104, 297 + Math.round(Math.cos(a) * (12 + (k % 3) * 4)), 104 + Math.round(Math.sin(a) * (14 + (k % 2) * 6)), k % 2 ? hex('#3a7a3a') : hex('#5a9a4a')); }
  rect(282, 56, 283, 119, hex('#3a2a20')); rect(279, 119, 286, 119, hex('#3a2a20')); rect(280, 58, 285, 58, hex('#3a2a20'));
  // el mueble bajo del tocadiscos con su altavoz
  rect(176, 130, 222, 148, K); for (let y = 131; y < 148; y++) for (let x = 177; x < 222; x++) pset(x, y, tono(rampa('#5a3a24', '#6e4a2e', '#845a38'), 1.5 + Math.sin(x * 0.3 + y * 0.2) * 0.4, x, y)); rect(177, 131, 221, 131, hex('#a07448'));
  rect(180, 136, 196, 146, hex('#3a2416')); rect(200, 136, 218, 146, hex('#3a2416')); pset(194, 141, hex('#c8a050')); pset(202, 141, hex('#c8a050'));
  rect(182, 124, 216, 130, K); rect(183, 125, 215, 129, hex('#c8c0b0')); rect(183, 125, 215, 125, BL); ovalo(196, 126, 10, 2, 0.6, K); rect(210, 122, 211, 126, hex('#8a8a92')); R.linea(211, 122, 204, 127, hex('#9a9aa2'));
  rect(224, 120, 236, 148, K); rect(225, 121, 235, 147, hex('#2a2a2e')); disco(230, 128, 3, hex('#4a4a52')); disco(230, 140, 5, hex('#4a4a52')); disco(230, 140, 2, hex('#1a1a1e'));
  // por el suelo: fundas sueltas, la funda de una guitarra y una caja de discos
  for (const [x, y, c] of [[30, 160, '#e8b830'], [44, 170, '#2a5ab8'], [262, 166, '#c8302a']]) { R.rect(x, y, x + 10, y + 6, K); R.rect(x + 1, y + 1, x + 9, y + 5, hex(c)); R.disco(x + 5, y + 3, 1, K); }
  { const cx = (u) => 270 + u * 40, cy = (u) => 166 - u * 22; for (let u = 0; u <= 1; u += 0.01) { const w = u < 0.45 ? 7 - u * 4 : u < 0.6 ? 5 : 4 - (u - 0.6) * 4; for (let d = -w; d <= w; d++) R.pset(Math.round(cx(u) + d * 0.48), Math.round(cy(u) + d * 0.88), Math.abs(d) > w - 1 ? K : d < -w / 3 ? hex('#3a3a46') : hex('#24242c')); }
    R.linea(280, 162, 306, 146, hex('#c8a050')); R.rect(284, 150, 288, 151, hex('#8a8a92')); }
};
const p3 = (t) => {
  pon('h3fondo', fondo3);
  // la lámpara de lava
  for (let k = 0; k < 3; k++) { const y = 21 - ((t * 1.6 + k * 1.7) % 4.5); R.disco(59 + (k % 2) * 2, Math.round(y), 1, hex('#ffd04a')); }
  // las bombillas de los carteles: se encienden en «movies» y corren
  const luces = t > MOVIES;
  for (const x0 of [86, 134, 182]) for (let i = 0; i < 22; i++) { const per = i < 6 ? [x0 - 3 + i * 8, 21] : i < 11 ? [x0 + 40 + 2, 21 + (i - 6) * 12] : i < 17 ? [x0 + 40 - (i - 11) * 8, 82] : [x0 - 3 - 2, 82 - (i - 17) * 12];
    const on = luces && (Math.floor(t * 8) + i) % 3 !== 0; R.pset(per[0], per[1], on ? hex('#fff0a0') : hex('#6a5a3a')); if (on) halo(per[0], per[1], 2, 0.25, hex('#ffe070')); }
  // la tele: apagada con su reflejo; en «movies», una persecución en blanco y negro
  if (t < MOVIES) { R.rect(236, 66, 266, 86, hex('#1a1e22')); R.linea(240, 68, 248, 68, hex('#4a5058')); R.linea(238, 70, 242, 70, hex('#4a5058')); }
  else { const u = t - MOVIES; for (let y = 66; y <= 86; y++) for (let x = 236; x <= 266; x++) R.pset(x, y, y > 80 ? hex('#4a4a4a') : y > 77 ? hex('#7a7a7a') : (x + Math.floor(u * 30)) % 9 < 2 && y > 70 ? hex('#5a5a5a') : hex('#9a9a9a'));
    for (let y = 66; y <= 86; y += 3) R.rect(236, y, 266, y, hex('#3a3a3a')); const cx = 236 + ((u * 22) % 36) - 6; R.rect(cx, 76, cx + 6, 79, K); R.rect(cx + 1, 74, cx + 4, 75, K); const px = cx - 9 + Math.sin(u * 7); R.rect(px, 76, px + 5, 79, hex('#d8d8d8')); R.pset(px + 2, 74, Math.floor(u * 6) % 2 ? hex('#ffffff') : K);
    halo(251, 76, 22, 0.12, hex('#c8d8f0')); }
  // Dan junto a los carteles; Sam junto al tocadiscos con el disco en la mano
  const pone = tr(t, MUSIC - 0.1, MUSIC + 0.35), puesto = t > MUSIC + 0.3;
  R.actor(EL.danHouser, 112, 152, t, { dir: t > DAN - 0.1 && t < DAN + 0.7 ? -1 : 1, dedo: (t > DAN && t < DAN + 0.6) || (t > MOVIES - 0.1 && t < MOVIES + 1.2), sonrisa: t > DAN, salto: t > DAN && t < DAN + 0.3 ? 2 : 0, habla: t > P3 + 0.1 && t < SAM && Math.sin(t * 8) > 0 });
  const s = R.actor(EL.samHouser, 156, 152, t, { dir: t > SAM - 0.05 && t < SAM + 0.6 ? -1 : 1, sonrisa: t > SAM, salto: t > SAM + 0.05 && t < SAM + 0.35 ? 2 : 0, dedo: t > SAM && t < SAM + 0.55,
    sostiene: t > SAM + 0.55 && !puesto ? [Math.round(lerp(176, 192, pone)), Math.round(lerp(132, 125, pone))] : undefined });
  if (s.mano && !puesto) { const [mx, my] = s.mano; R.disco(mx + 2, my - 3, 6, K); R.disco(mx + 2, my - 3, 5, hex('#2a2a30')); R.disco(mx + 2, my - 3, 2, hex('#e8b830')); R.pset(mx + 2, my - 3, K); R.pset(mx - 1, my - 6, hex('#6a6a72')); }
  if (puesto) { const a = t * 9; ovalo(196, 126, 9, 2, 1, hex('#1e1e24')); ovalo(196, 126, 3, 1, 1, hex('#e8b830')); R.pset(196 + Math.round(Math.cos(a) * 6), 126 + Math.round(Math.sin(a) * 1), hex('#6a6a72')); R.linea(211, 122, 202, 125, hex('#c8c8d0'));
    notas(t, 228, 120, 4, 3, [hex('#ffd84a'), hex('#ff6ab0'), hex('#5af0f0'), hex('#9aff6a')], 40, 0.7); }
};

// ── 4 · el loft de día: fundan la nueva marca ──
const G4 = { encuadre: 'loft' };
const COLEGAS = RK(0.0396), LABEL = RK(0.1904), NOMBRE = RK(0.4381);
const p4 = (t) => {
  T.nuevayork(R, t, G4);
  const fiesta = t > NOMBRE + 0.1, salto = (k) => fiesta && t < NOMBRE + 1.6 ? Math.max(0, Math.round(Math.sin((t - NOMBRE - k * 0.12) * 9) * 4)) : 0;
  // la estrella de la puerta brilla en «Rockstar Games»
  if (t > NOMBRE - 0.1) { const u = t - NOMBRE + 0.1, r = 6 + Math.min(10, u * 26), a0 = t * 2;
    halo(288, 74, 12, 0.35 * Math.max(0.3, 1 - u * 0.3), hex('#ffe070')); for (let k = 0; k < 8; k++) { const a = a0 + k * 0.785; R.linea(288 + Math.cos(a) * 9, 74 + Math.sin(a) * 9, 288 + Math.cos(a) * (9 + r), 74 + Math.sin(a) * (9 + r) * 0.9, hex('#fff0a0')); } }
  // la que trabaja en la mesa de la izquierda
  R.actor(EL.chica, 26, 152, t, { dir: 1, brazos: fiesta && t < NOMBRE + 1.4, salto: salto(3), sonrisa: fiesta, habla: !fiesta && Math.sin(t * 6) > 0.6 });
  // los dos compañeros entran por la izquierda: uno con la caja de discos, otro con la guitarra
  const c1 = ruta(t, [[COLEGAS - 0.3, -20, 156, 1], [COLEGAS + 1.6, 84, 156, 1]]), c2 = ruta(t, [[COLEGAS, -20, 156, 1], [COLEGAS + 1.9, 104, 156, 1]]);
  const a1 = R.actor(EL.sudadera, c1.x, c1.s, t, { dir: 1, anda: c1.mv, sostiene: fiesta ? undefined : true, brazos: fiesta && t < NOMBRE + 1.4, salto: salto(1), sonrisa: !c1.mv });
  if (a1.mano && !fiesta) cajaCarton(a1.mano[0] - 7, a1.mano[1] - 5);
  const a2 = R.actor(EL.oficinista2, c2.x, c2.s, t, { dir: 1, anda: c2.mv, sostiene: fiesta ? undefined : [c2.x + 14, c2.s - 14], brazos: fiesta && t < NOMBRE + 1.4, salto: salto(2), sonrisa: !c2.mv });
  if (a2.mano && !fiesta) { const [mx, my] = a2.mano; R.linea(mx - 2, my - 14, mx + 1, my + 2, hex('#3a2416')); R.linea(mx - 1, my - 14, mx + 2, my + 2, hex('#5a3a24')); R.rect(mx - 4, my - 17, mx - 1, my - 14, K); for (let j = 0; j < 7; j++) R.rect(mx - 2 + j * 0.2, my + 2 + j, mx + 6 - Math.abs(j - 3), my + 2 + j, j % 6 === 0 ? K : hex('#c8302a')); R.pset(mx + 2, my + 5, K); }
  // Sam y Dan desembalan en el centro; Sam levanta el disco de la estrella en «label»
  const levanta = t > LABEL - 0.1 && !fiesta;
  const d = R.actor(EL.danHouser, 176, 156, t, { dir: -1, sostiene: !fiesta && t < LABEL ? [168, 146] : undefined, sonrisa: t > LABEL, brazos: fiesta && t < NOMBRE + 1.4, salto: salto(0), dedo: t > LABEL + 0.4 && !fiesta });
  const s = R.actor(EL.samHouser, 134, 156, t, { dir: 1, sostiene: levanta ? [150, Math.round(lerp(140, 118, tr(t, LABEL - 0.1, LABEL + 0.35)))] : undefined, brazos: fiesta && t < NOMBRE + 1.4, salto: salto(1), sonrisa: t > LABEL, habla: !levanta && !fiesta && Math.sin(t * 7) > 0.2 });
  // la caja de la mudanza en el suelo, con los discos dentro
  caja3(150, 146, 168, 157, hex('#c89a5a'), hex('#e0b878'), hex('#9a7038')); R.rect(151, 149, 167, 149, hex('#d8c8a0')); for (let i = 0; i < 4; i++) R.rect(152 + i * 4, 143, 154 + i * 4, 146, [hex('#2a2a30'), hex('#e8b830'), hex('#2a2a30'), hex('#c8302a')][i]);
  if (d.mano && !fiesta && t < LABEL) { const [mx, my] = d.mano; R.rect(mx - 4, my - 6, mx + 4, my + 2, K); R.rect(mx - 3, my - 5, mx + 3, my + 1, hex('#3a6ad8')); R.disco(mx, my - 2, 2, K); }
  if (s.mano && levanta) { const [mx, my] = s.mano; R.disco(mx + 1, my - 5, 7, K); R.disco(mx + 1, my - 5, 6, hex('#1e1e24')); R.disco(mx + 1, my - 5, 4, hex('#2a2a32')); R.disco(mx + 1, my - 5, 3, hex('#d8a838')); R.pset(mx + 1, my - 7, hex('#fff0a0')); R.pset(mx, my - 5, hex('#fff0a0')); R.pset(mx + 2, my - 5, hex('#fff0a0')); R.pset(mx + 1, my - 4, hex('#fff0a0'));
    if (t > RK(0.3196) && t < RK(0.3196) + 0.5) for (const [dx, dy] of [[-9, -9], [10, -10], [0, -14]]) R.linea(mx + 1 + dx * 0.6, my - 5 + dy * 0.6, mx + 1 + dx, my - 5 + dy, hex('#fff0a0')); }
  T.nuevayorkDelante(R, t, G4);
  // el confeti de la fiesta (por delante)
  if (fiesta) for (let i = 0; i < 40; i++) { const u = (t - NOMBRE) * (0.6 + h(i, 2) * 0.5), x = 60 + h(i, 1) * 200 + Math.sin(t * 3 + i) * 6, y = 40 + u * 70 + h(i, 3) * 20 - 40 * Math.max(0, 0.6 - u); if (y > 170 || quieta(x, y)) continue; R.pset(Math.round(x), Math.round(y), [hex('#ffd84a'), hex('#ff6ab0'), hex('#5af0f0'), hex('#9aff6a'), BL][i % 5]); }
};

// ── 5 · LOCAL el local de ensayo: actitud de banda, no de juguetería ──
const JUEGOS = RK(0.6544), BANDA = RK(0.811), JUGUETE = RK(0.9128);
const fondo5 = () => {
  const { rect, pset, linea, disco, poligono } = R;
  // la pared de ladrillo pintado de oscuro
  ladrillos(0, 0, 267, 140, rampa('#2a2632', '#363140', '#423c4e', '#4e485a'), hex('#1e1a24'), 51, 9, 5);
  // la columna de hormigón de la derecha (la esquina de Atom, tranquila)
  for (let y = 0; y <= 140; y++) for (let x = 268; x < 320; x++) pset(x, y, tono(rampa('#3a3e4a', '#444856', '#4e5262', '#5a5e6e'), 1.8 - (x - 268) / 70 + (y > 60 ? (h(x >> 2, y >> 2, 52) - 0.5) * 0.6 : 0), x, y));
  rect(268, 0, 268, 140, hex('#2a2a34')); rect(269, 0, 269, 140, hex('#6a6e7e')); for (const y of [70, 120]) { rect(268, y, 319, y, hex('#363a46')); rect(268, y + 1, 319, y + 1, hex('#5e6272')); }
  // la tubería del techo
  rect(0, 22, 267, 25, hex('#4a4e5a')); rect(0, 22, 267, 22, hex('#7a7e8a')); rect(0, 25, 267, 25, hex('#2a2a34')); for (let x = 20; x < 267; x += 46) { rect(x, 20, x + 3, 27, hex('#5a5e6a')); rect(x, 20, x + 3, 20, hex('#8a8e9a')); }
  // la puerta metálica con la estrella dorada
  rect(184, 40, 238, 140, K); rect(185, 41, 237, 140, hex('#2a2e38'));
  for (let y = 44; y < 140; y++) for (let x = 188; x < 235; x++) pset(x, y, tono(rampa('#4a5462', '#5a6474', '#6a7486', '#7e889a'), 2.2 - (x - 188) / 40 + (y - 44) / 200, x, y));
  for (let x = 190; x < 234; x += 5) { pset(x, 46, hex('#9aa4b4')); pset(x, 137, hex('#9aa4b4')); } for (let y = 50; y < 136; y += 6) { pset(190, y, hex('#9aa4b4')); pset(232, y, hex('#9aa4b4')); }
  rect(188, 120, 234, 139, hex('#7a8494')); for (let x = 190; x < 234; x += 3) pset(x, 125 + (x % 2), hex('#9aa4b4')); rect(188, 120, 234, 120, hex('#aab4c4'));
  rect(196, 100, 228, 103, hex('#c8ccd4')); rect(196, 100, 228, 100, BL); rect(196, 103, 228, 103, hex('#6a7080'));
  rect(201, 50, 221, 62, K); rect(202, 51, 220, 61, hex('#3a4a5a')); for (let x = 204; x < 220; x += 4) rect(x, 51, x, 61, hex('#6a7a8a')); for (let y = 53; y < 61; y += 4) rect(202, y, 220, y, hex('#6a7a8a'));
  const estrella = (cx, cy, r, c, s) => { const pts = []; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r * 0.42 : r; pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); } poligono(pts.map(([x, y]) => [x + 1, y + 1]), s); poligono(pts, c); };
  estrella(211, 82, 12, hex('#e8b830'), hex('#6a4a10')); estrella(210, 81, 7, hex('#ffd860'), hex('#e8b830')); pset(207, 77, BL);
  // el cartelito verde de salida (un muñeco que corre)
  rect(201, 31, 221, 38, K); rect(202, 32, 220, 37, hex('#2a9a5a'));
  for (const [i, j] of [[0, 0], [1, 1], [0, 2], [-1, 3], [1, 3], [2, 2], [-1, 1]]) pset(211 + i, 33 + j, BL);
  // carteles de conciertos pegados (sin letras: un rayo, una estrella, una guitarra)
  const pega = (x, y, w, hh, c, dib) => { rect(x + 1, y + 1, x + w + 1, y + hh + 1, hex('#16121a')); rect(x, y, x + w, y + hh, hex(c)); for (let i = 0; i < w; i += 3) pset(x + i, y + hh, hex('#16121a')); dib(x, y, w, hh); rect(x + 2, y - 1, x + 6, y + 1, hex('#d8d0b0')); rect(x + w - 6, y - 1, x + w - 2, y + 1, hex('#d8d0b0')); };
  pega(118, 34, 28, 36, '#e8c830', (x, y) => poligono([[x + 17, y + 4], [x + 8, y + 19], [x + 14, y + 19], [x + 10, y + 32], [x + 21, y + 14], [x + 15, y + 14], [x + 19, y + 4]], K));
  pega(150, 46, 26, 34, '#c8302a', (x, y) => { poligono([[x + 13, y + 6], [x + 16, y + 14], [x + 24, y + 14], [x + 18, y + 19], [x + 20, y + 27], [x + 13, y + 22], [x + 6, y + 27], [x + 8, y + 19], [x + 2, y + 14], [x + 10, y + 14]], hex('#f6f2e6')); });
  pega(28, 28, 26, 34, '#3a6ad8', (x, y) => { disco(x + 13, y + 24, 6, K); disco(x + 13, y + 22, 5, K); rect(x + 12, y + 5, x + 14, y + 20, K); rect(x + 11, y + 4, x + 15, y + 7, K); disco(x + 13, y + 24, 2, hex('#3a6ad8')); });
  // el suelo del escenario, de tablones viejos, con cinta y cables
  for (let y = 141; y < 180; y++) for (let x = 0; x < 320; x++) { const tab = Math.floor((y - 141) / 5); pset(x, y, (y - 141) % 5 === 0 ? hex('#1e1610') : tono(rampa('#2e2218', '#3a2c20', '#4a382a', '#5a4634'), 1.6 + Math.sin(x * 0.09 + tab * 1.7) * 0.5 + (y - 141) / 50, x, y)); }
  rect(0, 140, 319, 140, hex('#16121a'));
  for (const [x, y] of [[148, 166], [196, 172]]) { linea(x - 4, y - 3, x + 4, y + 3, hex('#d8d0b0')); linea(x - 4, y + 3, x + 4, y - 3, hex('#d8d0b0')); }
  for (let x = 66; x < 190; x++) { const y = Math.round(160 + Math.sin(x * 0.07) * 6 + (x - 66) * 0.05); pset(x, y, K); pset(x, y + 1, hex('#2a2a30')); }
  rect(240, 168, 250, 174, BL); for (let y = 169; y < 174; y += 2) rect(242, y, 248, y, hex('#8a8a92'));   // la lista de canciones (rayas, sin letras)
  // el amplificador: cabezal y dos pantallas
  rect(12, 64, 66, 80, K); rect(13, 65, 65, 79, hex('#1e1e22')); rect(15, 67, 63, 74, hex('#c8a050')); for (let x = 19; x < 62; x += 6) { disco(x, 71, 2, K); pset(x, 70, hex('#5a5a62')); } disco(59, 77, 1, hex('#ff3a3a'));
  for (const y0 of [81, 111]) { rect(12, y0, 66, y0 + 29, K); rect(13, y0 + 1, 65, y0 + 28, hex('#26262c')); for (let y = y0 + 3; y < y0 + 27; y++) for (let x = 15; x < 64; x++) pset(x, y, (x + y) % 3 === 0 ? hex('#3a3a42') : (x - y) % 3 === 0 ? hex('#2e2e36') : hex('#202026'));
    rect(13, y0 + 1, 65, y0 + 1, hex('#d8d0c0')); rect(13, y0 + 28, 65, y0 + 28, hex('#d8d0c0')); rect(34, y0 + 4, 44, y0 + 6, hex('#c8a050')); }
  // la batería: bombo con la estrella, tom y platos
  disco(102, 121, 12, K); disco(102, 121, 11, hex('#e8e4d8')); disco(102, 121, 9, hex('#f6f2e6')); estrella(102, 121, 6, hex('#c8302a'), hex('#6a1a1a'));
  for (let a = 0; a < 6.28; a += 0.52) pset(102 + Math.round(Math.cos(a) * 11), 121 + Math.round(Math.sin(a) * 11), hex('#c8c8d0'));
  rect(90, 101, 102, 109, K); rect(91, 102, 101, 108, hex('#c8302a')); rect(91, 102, 101, 102, hex('#e86a5a')); rect(104, 103, 114, 110, K); rect(105, 104, 113, 109, hex('#c8302a')); rect(105, 104, 113, 104, hex('#e86a5a'));
  for (const x of [94, 110]) { linea(x, 132, x - 3, 141, hex('#8a8a92')); }
  for (const [x, y] of [[76, 98], [122, 94]]) { linea(x, y, x, 142, hex('#8a8a92')); linea(x, 142, x - 5, 142, hex('#8a8a92')); linea(x, 142, x + 5, 142, hex('#8a8a92')); }
  // la balda de juguetes de la derecha (lo de una juguetería)
  rect(250, 112, 318, 114, hex('#c8a070')); rect(250, 112, 318, 112, hex('#e8c898')); rect(250, 134, 318, 136, hex('#c8a070')); rect(250, 134, 318, 134, hex('#e8c898'));
  for (const x of [252, 316]) rect(x, 112, x + 1, 141, hex('#8a6a44'));
  for (let i = 0; i < 3; i++) { caja3(256 + i * 9, 126, 264 + i * 9, 133, [hex('#e8c830'), hex('#3a8a4a'), hex('#c8302a')][i], BL, hex('#5a4a3a')); R.numero(String(i + 1), 258 + i * 9, 132, { color: BL, sombra: false }); }
  // el cuadro eléctrico de la columna (por debajo de la esquina de Atom) y el extintor
  rect(282, 54, 304, 80, K); rect(283, 55, 303, 79, hex('#8a8e9a')); rect(283, 55, 303, 55, hex('#b4b8c4')); for (let y = 60; y < 76; y += 5) rect(286, y, 300, y + 2, hex('#5a5e6a')); rect(292, 80, 293, 112, hex('#5a5e6a')); rect(270, 84, 270, 112, hex('#5a5e6a'));
  // la funda de transporte (flight case) con esquinas de metal y las cajas de pizza encima
  caja3(160, 150, 206, 172, hex('#26262c'), hex('#4a4a54'), hex('#16161a')); for (const [x, y] of [[160, 150], [202, 150], [160, 168], [202, 168]]) { rect(x, y, x + 4, y + 4, hex('#a8acb8')); pset(x + 1, y + 1, BL); } rect(176, 158, 190, 160, hex('#a8acb8')); rect(181, 156, 185, 157, hex('#6a6e7a'));
  for (let k = 0; k < 3; k++) { rect(164 + k, 146 - k * 3, 196 + k, 149 - k * 3, K); rect(165 + k, 147 - k * 3, 195 + k, 148 - k * 3, hex('#e8dcc0')); rect(165 + k, 147 - k * 3, 195 + k, 147 - k * 3, BL); } R.disco(181, 141, 2, hex('#c8302a'));
  // el pie de micro con su cable
  linea(232, 108, 232, 160, hex('#6a6e7a')); linea(226, 160, 238, 160, hex('#6a6e7a')); linea(232, 108, 222, 102, hex('#6a6e7a')); rect(219, 99, 223, 103, K); rect(220, 100, 222, 102, hex('#5a5e6a')); for (let x = 232; x < 250; x++) pset(x, 160 + Math.round(Math.sin(x * 0.4) * 2) + 4, K);
  // el robot de cuerda
  rect(296, 120, 306, 133, K); rect(297, 121, 305, 132, hex('#9aa0b0')); rect(298, 123, 300, 125, hex('#ff4a4a')); rect(302, 123, 304, 125, hex('#ff4a4a')); rect(298, 128, 304, 129, K); rect(300, 116, 302, 120, K); pset(301, 115, hex('#ff4a4a'));
};
// la guitarra eléctrica roja (cuerpo de doble corte, mástil con trastes y pala); (x, y) el centro del cuerpo
const guitarra = (x, y) => { const { disco, rect, linea } = R; const RO = hex('#c8302a'), RL = hex('#f06a5a'), RS = hex('#8a1a1a');
  for (let k = 0; k < 2; k++) { linea(x - 4, y - 3 + k, x - 22, y - 15 + k, k ? hex('#5a3a24') : hex('#8a5a32')); } for (let i = 6; i < 18; i += 4) R.pset(x - 4 - i * 1.0, y - 3 - Math.round(i * 0.66), hex('#d8d0b0'));
  rect(x - 26, y - 19, x - 21, y - 15, K); rect(x - 25, y - 18, x - 22, y - 16, hex('#2a2a30')); R.pset(x - 25, y - 19, hex('#c8c8d0')); R.pset(x - 22, y - 19, hex('#c8c8d0'));
  disco(x, y, 6, K); disco(x + 4, y + 2, 5, K); disco(x - 3, y - 4, 3, K); disco(x, y, 5, RO); disco(x + 4, y + 2, 4, RO); disco(x - 3, y - 4, 2, RO); R.pset(x - 4, y - 5, RL); R.pset(x - 2, y - 3, RL); disco(x + 5, y + 4, 2, RS);
  rect(x - 2, y - 1, x + 3, y + 2, hex('#1e1e22')); rect(x - 1, y, x + 2, y, hex('#c8c8d0')); rect(x + 3, y + 3, x + 5, y + 4, BL); R.pset(x + 7, y + 1, hex('#d8a838')); };
// el osito y la caja sorpresa (se mueven)
const osito = (x, y, a) => { const { disco, rect } = R; const c = hex('#a8683a'), cs = hex('#7a4a28'); disco(x, y - 5, 5, K); disco(x, y - 5, 4, c); disco(x, y - 12, 4, K); disco(x, y - 12, 3, c); disco(x - 3, y - 15, 1, cs); disco(x + 3, y - 15, 1, cs); R.pset(x - 1, y - 12, K); R.pset(x + 1, y - 12, K); R.pset(x, y - 11, cs); disco(x, y - 5, 2, hex('#d8a878')); };
const p5 = (t) => {
  pon('h5fondo', fondo5);
  // la estrella de neón rosa del ladrillo, que parpadea
  { const on = Math.sin(t * 13) > -0.85 || t > BANDA, c = on ? hex('#ff6ad0') : hex('#5a2a4a'); for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * 2 * Math.PI / 5, b = -Math.PI / 2 + (k + 2) * 2 * Math.PI / 5; R.linea(78 + Math.cos(a) * 11, 48 + Math.sin(a) * 11, 78 + Math.cos(b) * 11, 48 + Math.sin(b) * 11, c); } if (on) halo(78, 48, 13, 0.18, hex('#ff6ad0')); }
  // la bombilla colgada que se mece (más con el golpe del amplificador)
  { const amp = 0.08 + 0.25 * Math.exp(-Math.max(0, t - BANDA) * 1.5) * (t > BANDA ? 1 : 0), a = Math.sin(t * 2.4) * amp, bx = Math.round(152 + Math.sin(a) * 22), by = Math.round(26 + Math.cos(a) * 22);
    R.linea(152, 26, bx, by, K); R.rect(bx - 1, by, bx + 1, by + 2, hex('#3a3a42')); R.disco(bx, by + 4, 2, hex('#fff2b0')); halo(bx, by + 6, 10, 0.2, hex('#ffe8a0')); }
  // la onda del amplificador en «band»: anillos que cruzan la sala
  if (t > BANDA) { const u = t - BANDA; for (let k = 0; k < 3; k++) { const r = (u - k * 0.18) * 190; if (r < 4 || r > 260) continue; for (let a = -0.9; a <= 0.9; a += 0.02) { const x = 66 + Math.cos(a) * r, y = 110 + Math.sin(a) * r * 0.55; if (!quieta(x, y)) tin(x, y, hex('#ffe070'), 0.6 * (1 - r / 260)); } } }
  // los altavoces laten
  { const lat = t > BANDA ? Math.round(Math.abs(Math.sin(t * 20)) * 2) : 0; for (const y0 of [81, 111]) for (const cx of [26, 52]) { R.disco(cx, y0 + 15, 8 + lat, hex('#2e2e36')); R.disco(cx, y0 + 15, 3, hex('#4a4a52')); } }
  // la caja sorpresa: salta en «toy company»
  { const u = tr(t, JUGUETE, JUGUETE + 0.25), x = 278; caja3(x - 6, 124, x + 6, 133, hex('#3a6ad8'), hex('#7aa0f0'), hex('#1e3a8a')); R.pset(x - 3, 128, hex('#e8c830')); R.pset(x + 2, 130, hex('#e8c830'));
    if (u > 0) { const top = Math.round(124 - u * 14 + Math.sin((t - JUGUETE) * 18) * 2 * Math.exp(-(t - JUGUETE) * 2)); for (let y = top + 4; y < 124; y += 2) { R.pset(x - 1, y, hex('#c8c8d0')); R.pset(x + 1, y + 1, hex('#c8c8d0')); } R.disco(x, top, 4, K); R.disco(x, top, 3, hex('#ff6a4a')); R.pset(x - 1, top - 1, K); R.pset(x + 1, top - 1, K); R.rect(x - 4, 122, x + 4, 123, hex('#1e3a8a')); } else R.rect(x - 6, 122, x + 6, 124, hex('#1e3a8a')); }
  // el osito: se cae de la balda y rebota en el suelo
  { const u = tramo(t, JUGUETE + 0.1, JUGUETE + 0.7); const x = Math.round(262 + u * 10), y = u <= 0 ? 112 : Math.round(112 + 46 * u * u - (u > 0.85 ? Math.sin((u - 0.85) * 20) * 3 : 0)); osito(x, y, 0); }
  // el pato de goma (se tambalea con la onda)
  { const w = t > JUGUETE ? Math.round(Math.sin(t * 16) * 1.5) : 0; R.disco(292 + w, 109, 3, hex('#f0d030')); R.disco(295 + w, 105, 2, hex('#f0d030')); R.pset(297 + w, 105, hex('#e87a20')); R.pset(296 + w, 104, K); }
  // Sam con la caja del juego; Dan con la guitarra eléctrica
  const banda = t > BANDA - 0.05;
  const s = R.actor(EL.samHouser, 90, 160, t, { dir: 1, sostiene: t > JUEGOS - 0.4 && !banda ? [104, 138] : undefined, brazos: banda && t < JUGUETE, salto: banda && t < JUGUETE ? Math.max(0, Math.round(Math.sin((t - BANDA) * 10) * 3)) : 0, habla: t < JUEGOS - 0.4 && Math.sin(t * 8) > 0, sonrisa: t > JUEGOS, sorpresa: t > JUGUETE + 0.2 && t < JUGUETE + 0.9 });
  if (s.mano && t > JUEGOS - 0.4 && !banda) PZ.cajaJuego(R, s.mano[0] + 2, s.mano[1] + 4, { color: '#e0a030' });
  const rasga = banda && t < JUGUETE + 1 ? Math.round(Math.sin(t * 26) * 2) : 0;
  const d = R.actor(EL.danHouser, 140, 160, t, { dir: 1, sostiene: [156, 145 + rasga], sonrisa: banda, habla: !banda && t > JUEGOS && Math.sin(t * 7) > 0.3, salto: banda && t < JUGUETE ? 1 : 0 });
  guitarra(d.mano ? d.mano[0] - 2 : 154, 147);
  if (banda && t < JUGUETE + 1.2) notas(t, 150, 132, 3, 11, [hex('#ffd84a'), hex('#ff6ab0'), hex('#5af0f0')], 30, 0.9);
  // el plato tiembla
  { const w = banda ? Math.round(Math.sin(t * 30) * 1) : 0; R.rect(116, 93 + w, 128, 94 + w, hex('#e8b830')); R.rect(118, 92 + w, 126, 92 + w, hex('#ffe08a')); R.rect(70, 97, 82, 98, hex('#e8b830')); }
};

const efectos = [[TT(0.06), 'claxon'], [ENTRA, 'flash'], [ENTRA + 0.25, 'puerta'], [PARA - 0.2, 'motor'], [MANO, 'palmada'], [VIENEN + 0.3, 'puerta'], [MOVIES, 'interruptor'], [MUSIC + 0.3, 'pop'],
  [COLEGAS + 0.2, 'puerta'], [NOMBRE, 'brillo'], [NOMBRE + 0.5, 'palmada'], [BANDA, 'boom'], [JUGUETE, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { cartela: '1998', efectos, año: 1998 });
''')

# ───────────────────────────────────────── gt-north ─────────────────────────────────────────
E['gt-north'] = ('Rockstar North', '''// GT-NORTH (frase 19), 1999. Tres planos:
// 1. LOCAL el avión sobre el Atlántico: Nueva York se queda pequeña a la izquierda y la costa de Escocia aparece a la
//    derecha con su faro y la bandera; el avión cruza de izquierda a derecha y empieza a bajar en «Scottish studio»;
//    una ballena sopla (gag pequeño), un carguero en el horizonte, gaviotas.
// 2. LOCAL Edimburgo (corta en «an industrial estate»): el castillo en su roca, los jardines y una terraza georgiana;
//    en «industrial estate in Dundee» llega la furgoneta de la mudanza desde la izquierda; el programador baja un monitor
//    y lo lleva a la puerta; en «Rockstar North» se enciende la estrella sobre la puerta; en «Edinburgh» el cañón del
//    castillo echa su bocanada de humo.
// 3. LOCAL la oficina nueva (corta en la pausa antes de «And there»): los planos azules de una ciudad enorme en la
//    pared y filas de monitores; en «started working» los monitores se encienden en ola; en «something huge» el
//    programador suelta el rollo y el plano se desenrolla por el suelo hasta salirse del cuadro.''', AUX + r'''
const N = (f) => en('north', f);
const P2 = N(0.3397), P3 = N(0.7609);

// ── 1 · LOCAL el avión sobre el Atlántico ──
const CIE = rampa('#3e70be', '#4c7ec6', '#5e8ece', '#74a0d8', '#8eb4e2', '#acc8ea', '#c8daf0');
const MAR = rampa('#7aa8d0', '#5a8cc0', '#4474aa', '#335f94', '#264c7c', '#1c3c66');
const NUBN = [hex('#ffffff'), hex('#dfe8f4'), hex('#aabcd8')];
const fondo1 = () => {
  const { rect, pset, linea, disco, poligono } = R;
  cieloBuf(0, 116, CIE, 21);
  for (let y = 117; y < 180; y++) for (let x = 0; x < 320; x++) { const v = (y - 117) / 63 * 4.5 + Math.sin(x * 0.21 + y * 1.7) * 0.35 + (h(x >> 2, y, 22) - 0.5) * 0.4; pset(x, y, tono(MAR, v, x, y)); }
  for (let i = 0; i < 160; i++) { const x = h(i, 1, 23) * 320, y = 118 + (h(i, 2, 23) ** 1.6) * 60, w = 1 + (y - 117) / 14; rect(x, y, x + w, y, hex('#9cc2e2')); }
  rect(0, 116, 319, 116, hex('#b8d0e8'));
  // Nueva York, pequeña en el horizonte de la izquierda
  for (let x = 2; x < 52; x += 3) { const hh = 4 + Math.floor(h(x, 3, 24) * 9) + (x === 23 ? 6 : 0); rect(x, 116 - hh, x + 2, 115, hex('#8aa0bc')); if (x === 23) rect(x + 1, 116 - hh - 3, x + 1, 116 - hh, hex('#8aa0bc')); }
  // la costa de Escocia a la derecha: colinas verdes, acantilado, una casita y el faro
  for (let x = 222; x < 320; x++) { const top = Math.round(104 - Math.sin((x - 222) * 0.05) * 8 - Math.sin((x - 222) * 0.13) * 3 - (x - 222) * 0.04); for (let y = top; y < 117; y++) pset(x, y, y > 112 ? tono(rampa('#5a5a50', '#6e6e62', '#86857a'), 1 + (h(x, y, 25) - 0.5), x, y) : tono(rampa('#3e6a3a', '#4e7e44', '#62924e', '#78a85c'), 2.6 - (y - top) / 4 + (h(x >> 1, y, 26) - 0.5) * 0.8, x, y)); }
  for (let x = 222; x < 320; x += 2) pset(x, 117, BL);
  rect(244, 99, 254, 104, hex('#e8e4d8')); poligono([[243, 99], [249, 95], [255, 99]], hex('#5a5a62')); pset(247, 101, hex('#3a4a5a')); pset(251, 101, hex('#3a4a5a'));
  rect(296, 76, 302, 98, BL); for (let y = 80; y < 98; y += 6) rect(296, y, 302, y + 2, hex('#c8302a')); rect(295, 72, 303, 76, hex('#3a3a42')); rect(297, 73, 301, 75, hex('#fff2b0')); rect(294, 71, 304, 71, K);
  rect(292, 98, 306, 100, hex('#5a5a62'));
};
const avion = (x, y, t) => { const { rect, pset, linea, poligono, disco } = R; x = Math.round(x); y = Math.round(y);
  const B0 = hex('#f2f2f6'), B1 = hex('#c8ccd8'), B2 = hex('#9ca2b4'), AZ = hex('#2a5ab8');
  // la estela de los motores
  for (let i = 4; i < 90; i++) { const a = 0.55 * (1 - i / 90); if (a > b4(x - i, y + 6) * 0.8) { tin(x - i, y + 6 + Math.sin(i * 0.2 + t * 3) * 0.6, BL, a); tin(x - i, y + 8, BL, a * 0.7); } }
  // el ala de detrás
  poligono([[x + 28, y + 4], [x + 40, y + 4], [x + 22, y - 6], [x + 18, y - 6]], B2);
  // el fuselaje
  const cy = y + 2;
  for (let i = 0; i < 72; i++) { const r = i < 14 ? 2.5 + i * 0.25 : i > 60 ? Math.max(1.5, 6 - (i - 60) * 0.42) : 6, top = Math.round(cy - r - (i < 14 ? (14 - i) * 0.35 : 0)), bot = Math.round(cy + r * 0.8);
    for (let yy = top; yy <= bot; yy++) P(x + i, yy, yy === top || yy === bot ? K : yy <= top + 2 ? B0 : yy >= bot - 2 ? B2 : B1);
    if (i > 10 && i < 64) { P(x + i, cy + 1, AZ); P(x + i, cy + 2, AZ); } if (i > 14 && i < 58 && i % 3 === 0) { P(x + i, cy - 2, hex('#2a3a5a')); P(x + i, cy - 3, hex('#4a5a7a')); } }
  // las ventanas de la cabina y la puerta
  rect(x + 63, cy - 3, x + 67, cy - 2, hex('#2a3a5a')); pset(x + 64, cy - 3, hex('#8aa4c8')); rect(x + 56, cy - 4, x + 57, cy + 2, B2);
  // la cola: deriva azul con una franja
  poligono([[x + 2, y - 6], [x + 16, y - 6], [x + 7, y - 20], [x + 1, y - 20]], K); poligono([[x + 3, y - 6], [x + 14, y - 6], [x + 7, y - 19], [x + 2, y - 19]], AZ); linea(x + 4, y - 13, x + 10, y - 13, BL); poligono([[x, y + 2], [x + 14, y + 2], [x + 2, y + 6]], B2);
  // el ala de delante con su motor
  poligono([[x + 26, y + 5], [x + 42, y + 5], [x + 26, y + 18], [x + 20, y + 18]], B1); linea(x + 26, y + 5, x + 20, y + 18, B0);
  rect(x + 26, y + 9, x + 36, y + 13, B2); rect(x + 26, y + 9, x + 36, y + 9, B0); rect(x + 35, y + 10, x + 36, y + 12, K);
  pset(x + 21, y + 18, Math.floor(t * 3) % 2 ? hex('#ff4040') : hex('#7a2020')); };
const NUBLEJ = [hex('#e8eef6'), hex('#c8d4e6'), hex('#a8b8d2')];
const BAJA = N(0.1597), BALLENA = 1.7;
const p1 = (t) => {
  pon('n1', fondo1);
  nubes(t, [[40, 104, 9, 1.5], [180, 100, 12, 2], [300, 106, 8, 1.2], [110, 96, 7, 1.2], [240, 92, 10, 1.6]], NUBLEJ);
  nubes(t, [[10, 70, 16, 4], [150, 58, 20, 5], [260, 78, 14, 3.5], [80, 38, 22, 6], [210, 30, 14, 5]], NUBN);
  // el carguero lejano con su humo
  { const x = 120 + t * 2; R.rect(x, 113, x + 16, 115, hex('#3a3a46')); R.rect(x + 2, 110, x + 6, 112, hex('#c8302a')); R.rect(x + 8, 111, x + 14, 112, hex('#5a6aa8')); vapor(x + 4, 109, t, 3, 10, hex('#c8ccd8'), 3, 0.4); }
  // el faro destella y la bandera de Escocia ondea en el mástil
  if (Math.floor(t * 1.6) % 2) { halo(299, 74, 7, 0.4, hex('#fff2b0')); R.linea(299, 74, 270, 66, hex('#fff2b0')); }
  R.rect(286, 80, 286, 98, hex('#4a4a52')); for (let i = 0; i < 10; i++) { const dy = Math.round(Math.sin(t * 6 - i * 0.7) * (i / 10)); for (let j = 0; j < 7; j++) { const d1 = Math.abs(j - i * 0.7), d2 = Math.abs(6 - j - i * 0.7); P(276 + i, 80 + j + dy, d1 < 1 || d2 < 1 ? BL : hex('#2a5ab8')); } }
  // las olas brillan
  for (let i = 0; i < 40; i++) { const x = (h(i, 1, 27) * 340 - t * 6 * (0.5 + h(i, 2))) % 340, y = 120 + h(i, 3, 27) ** 1.4 * 58; if (Math.sin(t * 3 + i) > 0.3) { P(x < 0 ? x + 340 : x, y, BL); P((x < 0 ? x + 340 : x) + 1, y, hex('#cfe2f2')); } }
  // la ballena: asoma el lomo y sopla
  { const u = tramo(t, BALLENA, BALLENA + 2.4); if (u > 0 && u < 1) { const a = Math.sin(u * Math.PI), bx = Math.round(84 + u * 14); for (let i = -18; i <= 18; i++) { const hh = Math.round(a * 7 * Math.sqrt(1 - (i / 18.5) ** 2)); for (let j = 0; j < hh; j++) P(bx + i, 156 - j, j === hh - 1 ? hex('#c8d4e2') : j === hh - 2 ? hex('#8aa0b8') : hex('#5e7088')); }
    if (a > 0.6) { P(bx + 12, 152, K); for (let i = 15; i <= 22; i++) { P(bx + i, 156 - Math.round(a * (i - 15) * 0.5), hex('#5e7088')); P(bx + i, 155 - Math.round(a * (i - 15) * 0.5), hex('#8aa0b8')); } }
    if (u > 0.2 && u < 0.85) { const s = tramo(u, 0.2, 0.85); for (let k = 0; k < 26; k++) { const ang = -Math.PI / 2 + (k - 12.5) * 0.09, r = Math.sin(s * Math.PI) * 26 * (0.55 + h(k, 2) * 0.45); P(bx - 6 + Math.cos(ang) * r * 0.7, 148 + Math.sin(ang) * r, k % 3 ? BL : hex('#cfe2f2')); P(bx - 5 + Math.cos(ang) * r * 0.7, 149 + Math.sin(ang) * r, hex('#cfe2f2')); } }
    for (let i = -22; i <= 22; i += 2) P(bx + i + Math.round(Math.sin(t * 6 + i)), 157, BL); } }
  pajaros(t, 3, 88, 14, 7, hex('#f6f6f6'));
  // el avión cruza de Nueva York a Escocia y empieza a bajar
  const u = tramo(t, 0, P2), x = lerp(-80, 196, u), y = 74 + 12 * tr(t, BAJA, P2) + Math.sin(t * 2.2) * 1.2;
  avion(x, y, t);
  // una nube cercana pasa por delante
  nubes(t, [[-60, 132, 18, 30]], NUBN);
};

// ── 2 · LOCAL Edimburgo: el castillo, los jardines y la oficina nueva ──
const PIE = rampa('#7a6448', '#94795a', '#ae926e', '#c4aa84', '#d6be98');
const ROCA = rampa('#2e2e36', '#3c3c46', '#4c4c58', '#5e5e6a');
const CAS = rampa('#6a6458', '#827a6c', '#9a9282', '#b0a896');
const fondo2 = () => {
  const { rect, pset, linea, disco, poligono } = R;
  cieloBuf(0, 100, rampa('#6a86ae', '#7a94b8', '#8ca2c2', '#9eb2cc', '#b2c2d6', '#c4d0de'), 41);
  // el casco viejo lejano a la derecha: tejados, chimeneas y una aguja
  for (let x = 170; x < 320; x += 1) { const top = 74 + Math.round(Math.sin(x * 0.3) * 2 + (h(x >> 3, 1, 42) * 10)); for (let y = top; y < 100; y++) pset(x, y, (x >> 3) % 2 ? hex('#7a8296') : hex('#6e768a')); if (h(x >> 3, 2, 42) > 0.7 && x % 8 === 3) rect(x, top - 4, x + 1, top, hex('#6a7084')); }
  for (let y = 46; y < 76; y++) { const w = Math.max(0, Math.round((y - 46) / 6)); rect(232 - w, y, 232 + w, y, hex('#6a7084')); }
  // la roca del castillo
  const perfil = (x) => 64 + Math.round(Math.sin(x * 0.05) * 4 + Math.sin(x * 0.17) * 2 + Math.max(0, (x - 150) * 0.6) + Math.max(0, (12 - x) * 1.2));
  for (let x = 0; x < 178; x++) { const top = perfil(x); for (let y = top; y < 116; y++) { const v = 2.3 - (y - top) / 22 + Math.sin(x * 0.4 + y * 0.2) * 0.4 + (h(x >> 1, y >> 1, 43) - 0.5) * 0.7; pset(x, y, tono(ROCA, v, x, y)); } }
  // las caras de la roca (facetas con luz), las grietas y el musgo de las repisas
  for (let i = 0; i < 26; i++) { const x0 = h(i, 1, 44) * 170, y0 = perfil(Math.round(x0)) + 3 + h(i, 2, 44) * 30, w = 6 + h(i, 3, 44) * 12, hh = 8 + h(i, 4, 44) * 14;
    poligono([[x0, y0], [x0 + w, y0 + 2], [x0 + w * 0.7, y0 + hh], [x0 - 2, y0 + hh * 0.7]], h(i, 5, 44) > 0.5 ? hex('#5e5e6a') : hex('#6c6c78')); linea(x0, y0, x0 + w, y0 + 2, hex('#8a8a96')); linea(x0 + w, y0 + 2, x0 + w * 0.7, y0 + hh, hex('#26262e')); }
  for (let i = 0; i < 40; i++) { const x = h(i, 1, 45) * 176, y = perfil(Math.round(x)) + 4 + h(i, 2, 45) * 46; linea(x, y, x + 2 + h(i, 3) * 3, y + 5, hex('#22222a')); }
  for (let i = 0; i < 34; i++) { const x = h(i, 1, 46) * 176, y = perfil(Math.round(x)) + 2 + h(i, 2, 46) * 44; for (let k = 0; k < 5; k++) pset(x + k, y - (k % 2), k % 2 ? hex('#4e6a3a') : hex('#3a5a30')); }
  // el castillo: muralla almenada, el palacio, la gran sala, el cuartel y la batería en media luna
  const muro = (x0, x1, y0, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, (y - y0) % 4 === 3 || (x + ((y - y0) >> 2) * 3) % 7 === 0 ? hex('#5a5448') : tono(CAS, 2.2 - (x - x0) / (x1 - x0 + 1) * 1.2 + (h(x, y, 45) - 0.5) * 0.5, x, y)); };
  const tejado = (x0, x1, y0, hh) => { for (let j = 0; j < hh; j++) rect(x0 + j, y0 - j, x1 - j, y0 - j, j === hh - 1 ? hex('#6a7084') : hex('#4a5062')); };
  muro(14, 168, 56, 70); for (let x = 14; x < 168; x += 4) rect(x, 53, x + 1, 55, hex('#9a9282'));
  muro(20, 46, 40, 56); tejado(20, 46, 39, 5); for (let x = 23; x < 44; x += 6) { rect(x, 44, x + 2, 48, hex('#2a2e3a')); pset(x, 44, hex('#5a6a8a')); }
  muro(56, 92, 36, 56); tejado(56, 92, 35, 6); for (let x = 60; x < 90; x += 7) { rect(x, 40, x + 3, 46, hex('#2a2e3a')); pset(x + 1, 41, hex('#7a8aaa')); } rect(62, 26, 64, 30, hex('#7a6e60')); rect(84, 26, 86, 30, hex('#7a6e60'));
  muro(98, 130, 30, 56); for (let x = 98; x < 131; x += 4) rect(x, 27, x + 1, 29, hex('#9a9282')); for (let y = 34; y < 54; y += 8) for (let x = 102; x < 128; x += 8) { rect(x, y, x + 3, y + 4, hex('#2a2e3a')); pset(x + 1, y + 1, hex('#7a8aaa')); }
  rect(118, 20, 124, 30, hex('#827a6c')); poligono([[117, 20], [121, 14 + 3], [125, 20]], hex('#4a5062'));
  for (let a = 0; a <= Math.PI; a += 0.02) { const x = Math.round(150 + Math.cos(a) * 18), y = Math.round(68 - Math.sin(a) * 6); rect(x, y - 10, x, y, tono(CAS, 1.8 + Math.cos(a) * 0.8, x, y)); } for (let x = 133; x < 168; x += 4) rect(x, 52 + Math.round(Math.abs(x - 150) / 6), x + 1, 53 + Math.round(Math.abs(x - 150) / 6), hex('#9a9282'));
  for (const x of [140, 152, 162]) { rect(x, 60, x + 4, 61, K); }
  // el mástil
  rect(108, 18, 108, 30, hex('#3a3a42'));
  // los jardines: árboles de tres tonos y la verja
  for (let k = 0; k < 14; k++) { const cx = 6 + k * 12 + h(k, 1, 46) * 6, cy = 112 + h(k, 2, 46) * 8, r = 9 + h(k, 3, 46) * 5;
    for (let y = Math.round(cy - r); y <= cy + r; y++) for (let x = Math.round(cx - r); x <= cx + r; x++) { const d = Math.hypot(x - cx, (y - cy) * 1.2) / r; if (d < 1 && h(x, y, 47) > d * 0.25) pset(x, y, tono(rampa('#1e3a22', '#2a4e2c', '#3a6438', '#4e7c44', '#6a9a54'), 3.4 - (y - cy + r) / (2 * r) * 3 - d * 0.6, x, y)); } }
  rect(0, 126, 168, 146, hex('#2a4a2c')); for (let y = 126; y < 146; y++) for (let x = 0; x < 168; x++) if (h(x, y, 48) > 0.6) pset(x, y, tono(rampa('#2a4a2c', '#3a6038', '#4a7444'), 1 + h(x, y, 49) * 1.6, x, y));
  for (let x = 0; x < 168; x += 3) { rect(x, 134, x, 147, K); pset(x, 133, hex('#c8a050')); } rect(0, 138, 167, 138, K); rect(0, 145, 167, 145, K);
  // la terraza georgiana de piedra arenisca
  for (let y = 68; y <= 150; y++) for (let x = 168; x < 320; x++) { const fila = Math.floor((y - 68) / 6), jx = (x + (fila % 2) * 7) % 14; pset(x, y, (y - 68) % 6 === 0 || jx === 0 ? hex('#7a6448') : tono(PIE, 2.6 - (x - 168) / 300 + (h(x >> 1, y, 50) - 0.5) * 0.7 + ((y - 68) % 6 === 1 ? 0.6 : 0), x, y)); }
  rect(168, 66, 319, 69, hex('#c4aa84')); rect(168, 66, 319, 66, hex('#e0c8a0')); for (let x = 170; x < 320; x += 4) pset(x, 70, hex('#7a6448'));
  for (const x of [184, 230, 280]) { rect(x, 54, x + 14, 66, hex('#94795a')); rect(x, 54, x + 14, 55, hex('#c4aa84')); for (let i = 0; i < 4; i++) { rect(x + 1 + i * 3, 50, x + 2 + i * 3, 54, hex('#b0583a')); } }
  rect(168, 100, 319, 102, hex('#c4aa84')); rect(168, 100, 319, 100, hex('#e0c8a0'));
  for (const x of [176, 200, 264, 290]) for (const y of [76, 106]) ventana(x, y, 12, y === 76 ? 18 : 20, { marco: hex('#e8dcc0'), cristal: hex('#26304a'), reflejo: hex('#6a7aa0'), luz: h(x, y, 51) > 0.7 ? hex('#e8c070') : undefined });
  for (const x of [176, 200, 264, 290]) for (const y of [76, 106]) { const hh = y === 76 ? 18 : 20; for (let j = 4; j < hh; j += 5) rect(x + 1, y + j, x + 10, y + j, hex('#e8dcc0')); }
  // la puerta negra con su montante de abanico y los escalones
  rect(230, 106, 252, 146, hex('#94795a')); for (let a = 0; a <= Math.PI; a += 0.02) for (let r = 0; r <= 10; r++) { const x = Math.round(241 + Math.cos(a) * r), y = Math.round(118 - Math.sin(a) * r); pset(x, y, r > 9 ? hex('#e8dcc0') : Math.round(a * 8) % 2 && r > 2 ? hex('#e8dcc0') : hex('#2a3044')); }
  rect(232, 118, 250, 146, K); rect(233, 119, 249, 146, hex('#1a1c24')); rect(234, 120, 240, 131, hex('#26283a')); rect(242, 120, 248, 131, hex('#26283a')); rect(234, 134, 240, 145, hex('#26283a')); rect(242, 134, 248, 145, hex('#26283a')); rect(233, 119, 249, 119, hex('#4a4e62')); disco(241, 132, 1, hex('#d8a838'));
  for (let k = 0; k < 3; k++) rect(226 - k * 2, 146 + k * 2, 256 + k * 2, 147 + k * 2, k % 2 ? hex('#a89070') : hex('#c4aa84'));
  // la verja del sótano
  for (let x = 168; x < 320; x += 3) { if (x > 222 && x < 260) continue; rect(x, 138, x, 150, K); pset(x, 137, hex('#5a5a62')); } rect(168, 142, 222, 142, K); rect(260, 142, 319, 142, K);
  // la acera de losas y la calle de adoquines
  for (let y = 146; y < 158; y++) for (let x = 0; x < 320; x++) { if (x > 167 && y < 152) continue; pset(x, y, x % 16 === 0 || y === 152 ? hex('#6a6a70') : tono(rampa('#8a8a90', '#9a9aa0', '#aaaab0'), 1.3 + (h(x >> 1, y, 52) - 0.5), x, y)); }
  rect(0, 157, 319, 158, hex('#c8c8cc'));
  for (let y = 159; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 159) / 4), jx = (x + (fila % 2) * 4) % 8, jy = (y - 159) % 4; pset(x, y, jx === 0 || jy === 3 ? hex('#26262c') : tono(rampa('#3e3e46', '#4e4e58', '#62626c', '#76767e'), 1.8 - (jy === 0 ? -0.8 : 0) - (jx === 7 ? 0.7 : 0) + (h(Math.floor((x + (fila % 2) * 4) / 8), fila, 53) - 0.5), x, y)); }
};
// la furgoneta de la mudanza (de perfil, mira a la derecha; x = la trasera)
const furgo = (x, base, t, para) => { const { rect, pset, disco } = R; x = Math.round(x);
  ovalo(x + 34, base, 36, 2, 0.4, K);
  rect(x, base - 36, x + 46, base - 6, K); rect(x + 1, base - 35, x + 45, base - 7, hex('#e8e8ec')); rect(x + 1, base - 35, x + 45, base - 34, BL); rect(x + 1, base - 9, x + 45, base - 7, hex('#b8bcc8')); rect(x + 1, base - 22, x + 45, base - 19, hex('#2a5ab8'));
  R.icono('X', x + 6, base - 32, hex('#c8ccd8'), BL); rect(x + 2, base - 34, x + 2, base - 8, hex('#c8ccd8'));
  for (let i = 0; i < 3; i++) { rect(x + 14 + i * 8, base - 31, x + 19 + i * 8, base - 26, hex('#c8a060')); }
  rect(x + 46, base - 28, x + 66, base - 6, K); rect(x + 47, base - 27, x + 63, base - 7, hex('#e8e8ec')); rect(x + 63, base - 18, x + 65, base - 7, hex('#e8e8ec')); rect(x + 52, base - 25, x + 62, base - 18, hex('#3a4a66')); rect(x + 53, base - 24, x + 55, base - 22, hex('#8aa4c8'));
  rect(x + 64, base - 12, x + 66, base - 10, hex('#fff2b0')); rect(x + 47, base - 9, x + 65, base - 7, hex('#b8bcc8'));
  for (const i of [12, 54]) { disco(x + i, base - 4, 5, K); disco(x + i, base - 4, 2, hex('#9aa0aa')); const a = (para ? 0 : t * 10); pset(x + i + Math.round(Math.cos(a) * 3), base - 4 + Math.round(Math.sin(a) * 3), K); }
  if (!para) vapor(x - 2, base - 6, t, 3, 8, hex('#c8ccd4'), 4, 0.5); };
const LLEGA = N(0.3498), PARADA = N(0.4574), NORTE = N(0.5263), CANON = N(0.713);
const p2 = (t) => {
  pon('n2', fondo2);
  nubes(t, [[30, 22, 18, 2.5], [170, 34, 22, 3.5], [260, 52, 12, 2], [110, 8, 10, 1.5]], [hex('#e8ecf2'), hex('#c4ccda'), hex('#9aa6bc')]);
  pajaros(t, 3, 40, 12, 11, hex('#e8ecf2'));
  // la bandera del castillo (el aspa de Escocia)
  for (let i = 0; i < 10; i++) { const dy = Math.round(Math.sin(t * 6 - i * 0.7) * (i / 10)); for (let j = 0; j < 7; j++) { const d1 = Math.abs(j - i * 0.7), d2 = Math.abs(6 - j - i * 0.7); P(109 + i, 18 + j + dy, d1 < 1 || d2 < 1 ? BL : hex('#2a5ab8')); } }
  // las chimeneas echan humo
  for (const [x, k] of [[188, 1], [236, 2], [286, 3]]) vapor(x, 49, t, 3, 14, hex('#c8ccd8'), k, 0.4);
  // la estrella sobre la puerta: se enciende en «Rockstar North»
  { const on = t > NORTE; const c = on ? hex('#ffd860') : hex('#7a6a40'); R.poligono([[241, 99], [243, 103], [247, 103], [244, 106], [245, 110], [241, 107], [237, 110], [238, 106], [235, 103], [239, 103]], c);
    if (on) { halo(241, 104, 10, 0.3 * (1 + Math.sin(t * 4) * 0.2), hex('#ffe070')); if (t < NORTE + 0.6) for (let k = 0; k < 8; k++) { const a = k * 0.785, r = 8 + (t - NORTE) * 20; R.linea(241 + Math.cos(a) * 8, 104 + Math.sin(a) * 8, 241 + Math.cos(a) * r, 104 + Math.sin(a) * r, hex('#fff0a0')); } } }
  // el cañón de la una: bocanada de humo en «Edinburgh»
  if (t > CANON) { const u = t - CANON; if (u < 0.18) { halo(146, 61, 7, 0.9, hex('#fff2b0')); R.disco(146, 61, 2, BL); } for (let k = 0; k < 6; k++) ovalo(144 - u * 18 - k * 4, 58 - u * 10 - k * 1.5, 4 + u * 8 + k * 1.5, 3 + u * 5 + k, Math.max(0, 0.85 - u * 0.4), k % 2 ? hex('#f2f2f6') : hex('#d8dce4')); }
  // una vecina con paraguas pasea por detrás de la verja
  { const x = Math.round(lerp(-16, 150, tramo(t, P2, P3))); R.actor(EL.vecina, x, 147, t, { dir: 1, anda: true }); R.poligono([[x - 4, 120], [x + 7, 113], [x + 18, 120]], hex('#c8302a')); R.linea(x + 7, 113, x + 7, 127, K); }
  // el programador baja el monitor de la furgoneta y lo lleva a la puerta
  const fx = t < PARADA ? lerp(-70, 140, 1 - (1 - tramo(t, LLEGA - 0.2, PARADA)) ** 2) : 140;
  if (t > PARADA + 0.2) { const q = ruta(t, [[PARADA + 0.2, 128, 152, 1], [CANON - 0.5, 226, 152, 1], [CANON - 0.1, 236, 147, 1]]);
    if (t < CANON) { const a = R.actor(EL.programadorNorth, q.x, q.s, t, { dir: 1, anda: q.mv, sostiene: [q.x + 12, q.s - 13], sonrisa: t > NORTE });
      if (a.mano) { const [mx, my] = a.mano; R.rect(mx - 5, my - 10, mx + 5, my, K); R.rect(mx - 4, my - 9, mx + 4, my - 1, hex('#d8ccb0')); R.rect(mx - 3, my - 8, mx + 2, my - 3, hex('#2a3a4a')); R.pset(mx - 2, my - 7, hex('#6a8aa8')); R.rect(mx - 2, my, mx + 2, my + 1, hex('#a89c80')); } } }
  // la puerta se abre cuando entra
  if (t > CANON - 0.15) { R.rect(233, 119, 249, 146, hex('#e8c878')); R.rect(233, 119, 236, 146, hex('#1a1c24')); halo(241, 140, 10, 0.25, hex('#ffe8a0')); }
  // un compañero con una caja de disquetes espera junto a la furgoneta y saluda al llegar
  if (t > PARADA + 0.4) { const a = R.actor(EL.jonesGT, 116, 152, t, { dir: 1, sostiene: true, sonrisa: t > NORTE, habla: t > NORTE + 0.4 && t < CANON && Math.sin(t * 8) > 0 }); if (a.mano) { const [mx, my] = a.mano; caja3(mx - 6, my - 7, mx + 5, my + 1, hex('#c89a5a'), hex('#e0b878'), hex('#9a7038')); for (let i = 0; i < 3; i++) R.rect(mx - 4 + i * 3, my - 9, mx - 3 + i * 3, my - 7, [hex('#2a2a30'), hex('#3a6ad8'), hex('#c8302a')][i]); } }
  furgo(fx, 174, t, t > PARADA);
};

// ── 3 · LOCAL la oficina nueva: muchos monitores y los planos de una ciudad enorme ──
const ENCIENDE = N(0.8004), ROLLO = N(0.9147);
const fondo3 = () => {
  const { rect, pset, linea, disco, poligono } = R;
  // la pared crema (y el techo de placas con fluorescentes, lejos de la barra del año y de Atom)
  for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(rampa('#a89c84', '#bcb098', '#cec2a8', '#dcd2bc'), 2.2 + (h(x >> 2, y >> 2, 61) - 0.5) * 0.5 - (y < 12 ? 1.4 : 0), x, y));
  rect(0, 12, 319, 13, hex('#8a7e68')); for (const x of [180, 228]) { rect(x, 3, x + 30, 7, hex('#e8eef4')); rect(x, 3, x + 30, 3, BL); rect(x, 7, x + 30, 7, hex('#a8b0bc')); }
  // la ventana de la izquierda: tejados de Edimburgo y el castillo con llovizna
  rect(4, 22, 38, 92, K); rect(5, 23, 37, 91, hex('#e8e4d8'));
  for (let y = 25; y < 90; y++) for (let x = 7; x < 36; x++) pset(x, y, y < 62 ? tono(rampa('#8a9ab4', '#9eacc2', '#b2becf'), (y - 25) / 18, x, y) : y < 74 ? hex('#5a6070') : tono(rampa('#6a5a4a', '#7a6a58'), 1 + h(x, y >> 2, 62), x, y));
  for (let x = 7; x < 36; x++) { const top = 60 - Math.round(Math.max(0, 6 - Math.abs(x - 20) * 0.6)); for (let y = top; y < 62; y++) pset(x, y, hex('#4a4e5a')); }
  rect(16, 50, 26, 54, hex('#5a5e6a')); for (let x = 16; x < 27; x += 2) pset(x, 49, hex('#5a5e6a')); rect(20, 46, 21, 49, hex('#5a5e6a'));
  for (let x = 7; x < 36; x += 4) { const top = 72 - Math.floor(h(x, 1, 63) * 6); rect(x, top, x + 3, 74, hex('#4a3e34')); rect(x + 1, top - 3, x + 1, top, hex('#3a3430')); }
  rect(5, 56, 37, 57, hex('#e8e4d8')); rect(20, 23, 21, 91, hex('#e8e4d8')); rect(2, 92, 40, 94, hex('#e8e4d8'));
  // los planos azules de la ciudad, chinchetas y notas
  const plano = (x0, y0, x1, y1, k) => { rect(x0 + 2, y0 + 2, x1 + 2, y1 + 2, hex('#8a7e68')); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, (x - x0) % 6 === 0 || (y - y0) % 6 === 0 ? hex('#3a6ab4') : tono(rampa('#1e4a96', '#2654a2', '#2e5eae'), 1.2 + (x - x0) / (x1 - x0) * 0.6, x, y));
    const W = hex('#e8f0fa'), L = hex('#9ab8e0');
    for (let x = x0 + 8; x < x1 - 4; x += 12 + (k % 3) * 2) linea(x, y0 + 4, x + (k % 2 ? 3 : -2), y1 - 4, W);
    for (let y = y0 + 8; y < y1 - 4; y += 11) linea(x0 + 4, y, x1 - 4, y + (k % 2 ? 2 : -1), W);
    for (let i = 0; i < 18; i++) { const bx = x0 + 6 + h(i, k, 64) * (x1 - x0 - 14), by = y0 + 6 + h(i, k + 1, 64) * (y1 - y0 - 12); rect(bx, by, bx + 3, by + 2, L); }
    return { W, L }; };
  plano(46, 20, 116, 90, 1); plano(124, 18, 200, 92, 2); plano(208, 24, 266, 86, 3);
  // en el plano grande: un río, un puente colgante y una isla
  for (let y = 20; y < 92; y++) { const x = Math.round(150 + Math.sin(y * 0.09) * 8); rect(x, y, x + 5, y, hex('#5a8ad0')); }
  linea(136, 56, 172, 56, hex('#ffffff')); for (let x = 140; x < 170; x += 4) linea(x, 56, x, 52 + Math.round(Math.abs(x - 155) / 5), hex('#e8f0fa'));
  // la rosa de los vientos (símbolo, sin letras)
  for (const [dx, dy] of [[0, -6], [6, 0], [0, 6], [-6, 0]]) linea(250, 76, 250 + dx, 76 + dy, hex('#e8f0fa')); pset(250, 69, hex('#ff6a5a'));
  for (const [x, y] of [[47, 21], [115, 21], [125, 19], [199, 19], [209, 25], [265, 25], [47, 89], [199, 91]]) { disco(x, y, 1, hex('#d8303a')); pset(x, y - 1, hex('#ff9a8a')); }
  for (const [x, y, c] of [[100, 72, '#f0e070'], [186, 76, '#f0a0c0'], [220, 30, '#a0e0a0']]) { rect(x, y, x + 9, y + 9, hex(c)); for (let j = 2; j < 8; j += 2) rect(x + 2, y + j, x + 7, y + j, mez(hex(c), K, 0.35)); }
  // la fuente de agua de la derecha (por debajo de la esquina de Atom)
  rect(290, 70, 306, 100, hex('#d8dce4')); rect(290, 70, 306, 71, BL); rect(288, 100, 308, 104, hex('#b8bcc8')); rect(294, 56, 302, 70, hex('#7aa8e0')); rect(295, 56, 297, 69, hex('#a8c8f0')); rect(293, 54, 303, 56, hex('#5a88c8'));
  rect(298, 80, 301, 82, hex('#3a6ad8')); rect(292, 84, 304, 86, hex('#9aa0aa'));
  // el suelo de moqueta en placas y la canaleta de cables
  for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) { const px = Math.floor(x / 20), py = Math.floor((y - 100) / 12); pset(x, y, (x % 20 === 0 || (y - 100) % 12 === 0) ? hex('#4a5060') : tono(rampa('#545a6c', '#5e6476', '#686e80'), 1.2 + ((px + py) % 2) * 0.6 + (h(x, y, 65) - 0.5) * 0.7, x, y)); }
  rect(0, 100, 319, 101, hex('#3a3e4a'));
  // dos filas de mesas largas (el tablero; los monitores van en cada fotograma)
  for (const [y, x0, x1] of [[110, 44, 280], [134, 20, 300]]) { rect(x0, y, x1, y + 3, K); rect(x0 + 1, y + 1, x1 - 1, y + 2, hex('#c8b898')); rect(x0 + 1, y + 1, x1 - 1, y + 1, hex('#e0d4b8')); }
  // las sillas de oficina de la fila de delante, una papelera con bolas de papel y una pila de cajas de disquetes
  for (const x of [52, 124, 196, 268]) { rect(x - 7, 148, x + 7, 160, K); rect(x - 6, 149, x + 6, 159, hex('#2a3a5a')); rect(x - 6, 149, x + 6, 149, hex('#4a5a7a')); rect(x - 1, 160, x + 1, 166, hex('#3a3a42')); linea(x - 7, 168, x + 7, 168, hex('#3a3a42')); for (const dx of [-7, 0, 7]) disco(x + dx, 169, 1, K); }
  rect(232, 162, 244, 176, K); rect(233, 163, 243, 175, hex('#7a7e88')); for (let x = 234; x < 243; x += 2) rect(x, 164, x, 174, hex('#5a5e68')); for (const [x, y] of [[236, 160], [240, 161], [246, 174], [226, 172]]) { disco(x, y, 2, BL); pset(x - 1, y, hex('#c8c8d0')); }
  for (let k = 0; k < 4; k++) caja3(14, 168 - k * 5, 34, 172 - k * 5, [hex('#3a6ad8'), hex('#c8302a'), hex('#e8c830'), hex('#2a2a30')][k], BL, K);
  // la caja de pizza y las tazas
  rect(250, 104, 268, 109, hex('#e8dcc0')); rect(250, 104, 268, 104, BL); disco(259, 106, 1, hex('#c8302a'));
};
// el monitor de tubo, de frente, con su pantalla (o.on, o.tipo)
const monitor = (x, y, t, on, tipo, k) => { const { rect, pset, linea } = R;
  rect(x - 9, y - 16, x + 9, y, K); rect(x - 8, y - 15, x + 8, y - 1, hex('#d8ccb0')); rect(x - 8, y - 15, x + 8, y - 15, hex('#ece4cc')); rect(x - 8, y - 2, x + 8, y - 1, hex('#a89c80')); rect(x - 3, y + 1, x + 3, y + 2, hex('#a89c80'));
  rect(x - 6, y - 13, x + 6, y - 4, on ? hex('#0e1a2a') : hex('#262a30'));
  if (!on) { pset(x - 4, y - 12, hex('#5a6070')); pset(x - 5, y - 11, hex('#5a6070')); return; }
  pset(x + 6, y - 2, hex('#4aff7a'));
  if (tipo === 0) for (let j = 0; j < 4; j++) { const w = 3 + Math.floor(h(j + Math.floor(t * 4), k, 66) * 8); rect(x - 5 + (j % 2) * 2, y - 12 + j * 2, x - 5 + w, y - 12 + j * 2, [hex('#5af07a'), hex('#e8e070'), hex('#7ab8ff')][j % 3]); }
  else if (tipo === 1) { const a = t * 1.5 + k; const pts = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([u, v]) => [x + Math.round((u * Math.cos(a) - v * Math.sin(a)) * 3), y - 7 + Math.round((u * Math.sin(a) + v * Math.cos(a)) * 1.2)]);
    for (let i = 0; i < 4; i++) { const [a0, b0] = pts[i], [a1, b1] = pts[(i + 1) % 4]; linea(a0, b0, a1, b1, hex('#7af0ff')); linea(a0, b0 - 4, a1, b1 - 4, hex('#7af0ff')); linea(a0, b0, a0, b0 - 4, hex('#7af0ff')); } }
  else { for (let j = -12; j <= -5; j++) for (let i = -5; i <= 5; i++) if ((i + 5) % 3 === 0 || (j + 12) % 3 === 0) pset(x + i, y + j, hex('#4a6a8a')); pset(x - 3 + Math.round(((t * 3) % 8)), y - 9, hex('#ff4a4a')); } };
const p3 = (t) => {
  pon('n3', fondo3);
  // la llovizna por la ventana
  R.recorte([7, 25, 35, 89]); for (let i = 0; i < 14; i++) { const x = 7 + h(i, 1, 67) * 30, y = 25 + ((h(i, 2, 67) * 70 + t * 90) % 70); R.linea(x, y, x - 1, y + 2, hex('#c8d4e4')); } R.recorte(null);
  // el fluorescente que parpadea
  if (Math.sin(t * 17) > 0.7) R.rect(228, 4, 258, 6, hex('#a8b0bc'));
  // las burbujas de la fuente
  for (let k = 0; k < 3; k++) { const y = 68 - ((t * 9 + k * 5) % 12); R.pset(297 + (k % 2) * 2, Math.round(y), BL); }
  // la fila de atrás: cabezas tras los monitores; la de delante: los monitores de cara
  const on = (i) => t > ENCIENDE + i * 0.08;
  const XS1 = [60, 92, 124, 156, 188, 220, 252], XS2 = [36, 72, 108, 144, 180, 216, 252, 284];
  XS1.forEach((x, i) => { if (i % 2 === 0) R.actor([EL.programadorNorth, EL.daillyGT, EL.chica, EL.sudadera][i % 4 === 0 ? (i >> 2) % 4 : 2], x + 6, 114, t, { dir: i % 3 ? -1 : 1, habla: on(i) && Math.sin(t * 9 + i) > 0.5 }); });
  R.rect(44, 113, 280, 120, hex('#a89878')); R.rect(44, 113, 280, 113, hex('#8a7a5e'));
  XS1.forEach((x, i) => monitor(x, 110, t, on(i), i % 3, i));
  XS2.forEach((x, i) => { if (i % 3 !== 1) R.actor([EL.oficinista2, EL.jonesGT, EL.chico, EL.vecina][i % 4], x + 8, 140, t, { dir: i % 2 ? -1 : 1, sorpresa: t > ROLLO + 0.1 && t < ROLLO + 1, brazos: i === 5 && t > ROLLO + 0.2 && t < ROLLO + 1.2, habla: on(i) && Math.sin(t * 8 + i * 2) > 0.6 }); });
  R.rect(20, 137, 300, 146, hex('#a89878')); R.rect(20, 137, 300, 137, hex('#8a7a5e')); for (let x = 30; x < 300; x += 36) R.rect(x, 146, x + 1, 152, K);
  XS2.forEach((x, i) => monitor(x, 134, t, on(i + 2), (i + 1) % 3, i + 9));
  // las teclas: tecleo cuando trabajan
  if (t > ENCIENDE) for (const x of XS2) R.rect(x - 5 + (Math.floor(t * 10 + x) % 3), 136, x - 4 + (Math.floor(t * 10 + x) % 3), 136, BL);
  // el rollo de planos: se desenrolla por el suelo en «something huge»
  const u = tramo(t, ROLLO, ROLLO + 1.3), rx = Math.round(lerp(116, 340, u * u * (3 - 2 * u)));
  if (t > ROLLO) { for (let x = 116; x < Math.min(320, rx); x++) for (let y = 162; y < 176; y++) R.pset(x, y, (x - 116) % 8 === 0 || (y - 162) % 5 === 0 ? hex('#e8f0fa') : hex('#2654a2')); R.rect(116, 176, Math.min(319, rx), 176, hex('#1a3a7a')); }
  const pn = R.actor(EL.programadorNorth, 96, 170, t, { dir: 1, sostiene: t < ROLLO ? [114, 160] : undefined, sorpresa: t > ROLLO + 0.3, brazos: t > ROLLO + 0.9, sonrisa: t < ROLLO, habla: t > P3 + 0.2 && t < ENCIENDE + 0.4 && Math.sin(t * 9) > 0 });
  if (t < ROLLO) { const [mx, my] = pn.mano ?? [114, 160]; R.rect(mx - 2, my - 3, mx + 12, my + 3, K); R.rect(mx - 1, my - 2, mx + 11, my + 2, hex('#3a6ab4')); R.rect(mx - 1, my - 2, mx + 11, my - 2, hex('#7aa0e0')); R.disco(mx + 12, my, 3, hex('#e8f0fa')); R.disco(mx + 12, my, 1, hex('#2654a2')); }
  else if (rx < 335) { R.disco(rx, 168, 7, K); R.disco(rx, 168, 6, hex('#3a6ab4')); R.disco(rx, 168, 3, hex('#e8f0fa')); R.pset(rx + Math.round(Math.cos(t * 12) * 2), 168 + Math.round(Math.sin(t * 12) * 2), hex('#2654a2')); }
};

const efectos = [[0.3, 'jet'], [BALLENA + 0.7, 'chof'], [LLEGA, 'motor'], [NORTE, 'brillo'], [CANON, 'boom'], [ENCIENDE, 'interruptor'], [ENCIENDE + 0.5, 'tecleo'], [ROLLO, 'papel']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1999 });
''')

# ───────────────────────────────────────── gt-tresde ─────────────────────────────────────────
E['gt-tresde'] = ('La ciudad en 3D', '''// GT-TRESDE (frase 20), 2001: el momento épico. Tres planos:
// 1. la avenida de la ciudad de juguete (ciudad 'tresde', estilo 'nueva'): mientras la voz dice que la ciudad se veía
//    desde arriba, como un mapa, solo se ven las huellas pintadas en el suelo y el chaval las mira; en «put you inside
//    it» la ciudad se levanta en 3D de cerca a lejos, con polvo; él da un salto atrás y, en «entire city», levanta los
//    brazos; los pájaros se van.
// 2. el puente de noche (ciudad 'tresde', cámara 'puente'; corta en «in three dimensions»): una pareja pasea; en
//    «bridges» se encienden las luces del cable de torre a torre; en «radios in the cars» salen notas de los coches.
// 3. LOCAL una esquina de la ciudad de juguete en invierno (corta en «and people chatting»): un coche aparcado con la
//    radio puesta (las notas y la luz del dial), dos vecinos que charlan con sus bocadillos, un perro, el quiosco y el
//    diner; en «Grand Theft Auto 3» el letrero de bombillas del tejado se enciende con un 3.''', AUX + r'''
const D = (f) => en('tresde', f);
const P2 = D(0.4273), P3 = D(0.7164);

// ── 1 · la ciudad se levanta ──
const SUBE = D(0.2645), ENTERA = D(0.3684);
const p1 = (t) => {
  const lev = suave(tramo(t, SUBE, SUBE + 1.9));
  const G1 = { encuadre: 'tresde', estilo: 'nueva', levanta: lev };
  T.ciudad(R, t, G1);
  // los pájaros salen volando cuando se levanta
  if (t > SUBE) { const u = t - SUBE; for (let i = 0; i < 7; i++) { const x = 120 + i * 14 + u * (30 + i * 9) * (i % 2 ? 1 : -1), y = 120 - u * (40 + i * 6); if (!quieta(x, y) && y > 0) { const a = Math.floor(t * 10 + i) % 2; P(x, y, K); P(x - 1, y - a, K); P(x + 1, y - a, K); P(x - 2, y - 1 + a, K); P(x + 2, y - 1 + a, K); } } }
  // el chaval mira las huellas del suelo, da un salto atrás y levanta los brazos
  const mira = t < SUBE, atras = t > SUBE && t < SUBE + 0.5;
  const x = Math.round(150 - 10 * tr(t, SUBE, SUBE + 0.4));
  R.actor(EL.chico, x, 168, t, { dir: mira ? 1 : t > ENTERA ? (Math.floor(t * 1.2) % 2 ? 1 : -1) : -1, sorpresa: atras || (t > SUBE + 0.5 && t < ENTERA), brazos: t > ENTERA, salto: atras ? Math.round(Math.sin(tramo(t, SUBE, SUBE + 0.5) * Math.PI) * 5) : t > ENTERA ? Math.max(0, Math.round(Math.sin((t - ENTERA) * 8) * 3)) : 0, dedo: mira && t > D(0.1137) && t < D(0.167) + 0.4 });
  // una vecina que pasea con su perro se para a mirar
  { const q = ruta(t, [[0, 330, 170, -1], [SUBE, 224, 170, -1]]); R.actor(EL.vecina, q.x, q.s, t, { dir: -1, anda: q.mv, sorpresa: t > SUBE + 0.3 && t < ENTERA + 0.3, sonrisa: t > ENTERA + 0.3 });
    const px = q.x - 12, sal = t > SUBE && t < SUBE + 0.4 ? 3 : 0; R.rect(px, 163 - sal, px + 8, 166 - sal, hex('#a8683a')); R.rect(px - 2, 160 - sal, px + 1, 164 - sal, hex('#a8683a')); R.pset(px - 2, 161 - sal, K); R.rect(px + 1, 167 - sal, px + 1, 169 - sal, hex('#7a4a28')); R.rect(px + 7, 167 - sal, px + 7, 169 - sal, hex('#7a4a28')); R.pset(px + 9, 162 - sal + (Math.floor(t * 8) % 2), hex('#a8683a')); R.linea(px + 2, 161, q.x + 3, 152, hex('#c8302a')); }
  T.ciudadDelante(R, t, G1);
  // el destello al terminar de levantarse
  if (t > SUBE + 1.8 && t < SUBE + 2.3) { const a = 1 - tramo(t, SUBE + 1.8, SUBE + 2.3); tinta(0, 60, 319, 179, BL, 0.12 * a); }
};

// ── 2 · el puente de noche ──
const PUENTES = D(0.569), RADIOS = D(0.614);
const G2 = { encuadre: 'tresde', camara: 'puente' };
const cable = (x) => x < 84 ? 32 + (84 - x) * 0.68 : x > 236 ? 32 + (x - 236) * 0.68 : 77 - 45 * ((x - 160) / 76) ** 2;
const p2 = (t) => {
  T.ciudad(R, t, G2);
  // las luces del cable se encienden de torre a torre en «bridges»
  const u = tramo(t, PUENTES - 0.1, PUENTES + 0.7);
  for (let x = 2; x < 318; x += 5) { const orden = Math.abs(x - 160) / 160; const on = u > orden; const y = Math.round(cable(x)) + 1; if (quieta(x, y - 2)) continue;
    if (on) { const br = (Math.floor(t * 5) + x) % 7 ? hex('#fff2b0') : hex('#ffd060'); R.rect(x, y, x + 1, y + 1, br); tin(x - 1, y, hex('#ffe070'), 0.45); tin(x + 2, y + 1, hex('#ffe070'), 0.45); tin(x, y - 1, hex('#ffe070'), 0.35); tin(x + 1, y + 2, hex('#ffe070'), 0.35); } else R.pset(x, y, hex('#4a5078')); }
  if (u > 0 && u < 1) for (const s of [-1, 1]) { const x = Math.round(160 + s * u * 160), y = Math.round(cable(x)); R.disco(x, y + 1, 2, BL); }
  // las notas de las radios de los coches que cruzan
  if (t > RADIOS - 0.1) for (let q = 0; q < 5; q++) { const x = ((t * (26 + q * 6) + q * 70) % 360) - 20, k = (t * 0.9 + q * 0.37) % 1; nota(x + Math.sin(t * 4 + q) * 2, 80 - k * 18, [hex('#ffd84a'), hex('#ff6ab0'), hex('#5af0f0')][q % 3]); }
  // la pareja pasea charlando por el paseo
  const x = Math.round(lerp(70, 150, tramo(t, P2, P3)));
  R.actor(EL.chica, x, 166, t, { dir: 1, anda: true, habla: Math.sin(t * 2.5) > 0 && Math.sin(t * 9) > 0, sonrisa: t > PUENTES });
  R.actor(EL.sudadera, x + 17, 166, t, { dir: Math.sin(t * 2.5) > 0 ? -1 : 1, anda: true, habla: Math.sin(t * 2.5) <= 0 && Math.sin(t * 9) > 0, dedo: t > PUENTES + 0.1 && t < PUENTES + 0.9 });
  // un corredor pasa en sentido contrario
  { const cx = Math.round(lerp(300, -20, tramo(t, P2 + 0.4, P3))); R.actor(EL.oficinista2, cx, 172, t, { dir: -1, anda: true }); }
  T.ciudadDelante(R, t, G2);
};

// ── 3 · LOCAL la esquina con el coche de la radio ──
const PALAB = D(0.722), TRES = D(0.9585), GRAND = D(0.8967);
const fondo3 = () => {
  const { rect, pset, linea, disco, poligono } = R;
  cieloBuf(0, 70, rampa('#8a96aa', '#98a4b6', '#a8b2c2', '#b8c0cc', '#c8ced8'), 71);
  // los bloques del fondo (de juguete: colores planos con ventanas en rejilla y nieve en las cornisas)
  const bloque = (x0, x1, y0, c, cs, vent) => { for (let y = y0; y < 130; y++) for (let x = x0; x <= x1; x++) pset(x, y, x > x1 - 4 ? cs : tono([cs, c, mez(c, BL, 0.18)], 1.4 + (h(x >> 2, y >> 2, 72) - 0.5) * 0.5, x, y));
    rect(x0 - 1, y0 - 2, x1 + 1, y0, BL); for (let x = x0; x <= x1; x += 2) pset(x, y0 + 1, hex('#e8ecf2'));
    for (let y = y0 + 5; y < 112; y += 9) for (let x = x0 + 4; x < x1 - 6; x += 9) { rect(x, y, x + 5, y + 5, K); rect(x + 1, y + 1, x + 4, y + 4, h(x, y, vent) > 0.7 ? hex('#f0d078') : hex('#3a4a66')); pset(x + 1, y + 1, h(x, y, vent) > 0.7 ? hex('#fff2b0') : hex('#7a90b4')); rect(x, y + 6, x + 5, y + 6, hex('#e8ecf2')); } };
  bloque(-4, 70, 36, hex('#a85a42'), hex('#7a3e2e'), 1); bloque(72, 128, 58, hex('#6a7a96'), hex('#4a586e'), 2); bloque(130, 176, 30, hex('#c8a060'), hex('#8a6a3a'), 3); bloque(178, 262, 62, hex('#5a8a7a'), hex('#3e6658'), 4); bloque(264, 330, 72, hex('#b8607a'), hex('#84425a'), 5);
  // el letrero de bombillas del tejado (el 3 se enciende en cada fotograma) con su andamio
  rect(186, 22, 256, 56, K); rect(187, 23, 255, 55, hex('#2a2430')); for (let x = 190; x < 254; x += 8) rect(x, 56, x, 62, hex('#3a3440')); linea(190, 62, 254, 56, hex('#3a3440')); linea(190, 56, 254, 62, hex('#3a3440'));
  for (let x = 189; x < 254; x += 3) { pset(x, 24, hex('#6a5a3a')); pset(x, 53, hex('#6a5a3a')); }
  // el diner con su toldo rojo y blanco y el quiosco
  rect(0, 106, 70, 130, hex('#e8e0d0')); rect(4, 110, 66, 126, hex('#f0d890')); for (let x = 6; x < 66; x += 10) { rect(x, 110, x, 126, hex('#c8b070')); } for (let x = 8; x < 64; x += 12) rect(x, 118, x + 6, 120, hex('#c8302a'));
  for (let x = 0; x <= 70; x++) { const c = Math.floor(x / 6) % 2 ? hex('#c8302a') : BL; rect(x, 100, x, 106, c); pset(x, 107 + ((x % 6) < 3 ? 0 : -1), c); } rect(0, 99, 70, 99, BL); for (let x = 0; x <= 70; x += 2) pset(x, 98, hex('#e8ecf2'));
  rect(26, 88, 44, 97, K); rect(27, 89, 43, 96, hex('#ff6a8a')); R.icono('coche', 31, 89, BL, hex('#c8304a'));   // el rótulo del diner: una taza no, un coche de neón
  rect(84, 104, 120, 130, hex('#2a5a3a')); rect(84, 100, 122, 104, hex('#1e3a2a')); rect(84, 99, 122, 99, BL); for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) { const c = [hex('#e8c830'), hex('#3a6ad8'), hex('#c8302a'), hex('#e8e4d8')][(i + j) % 4]; rect(87 + i * 8, 106 + j * 11, 92 + i * 8, 114 + j * 11, c); rect(87 + i * 8, 106 + j * 11, 92 + i * 8, 106 + j * 11, mez(c, BL, 0.5)); }
  // la acera con nieve, la farola, la boca de riego y el buzón
  for (let y = 130; y < 151; y++) for (let x = 0; x < 320; x++) pset(x, y, x % 20 === 0 || y === 140 ? hex('#8a8e98') : tono(rampa('#a8acb4', '#b8bcc4', '#e0e4ec', '#f2f4f8'), 1.3 + (h(x >> 1, y, 73) - 0.5) * 0.9 + (y > 146 ? 1.2 : 0), x, y));
  for (let i = 0; i < 18; i++) { const x = h(i, 1, 74) * 320; ovalo(x, 149, 4 + h(i, 2) * 6, 2, 0.8, BL); }
  rect(0, 150, 319, 152, hex('#d8dce4')); rect(0, 153, 319, 153, hex('#5a5e68'));
  for (let y = 154; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(rampa('#3a3c44', '#464852', '#54565e', '#7a7e88'), 1.5 + (h(x >> 1, y >> 1, 75) - 0.5) * 1.1 + (y < 158 ? 1.2 : 0), x, y));
  for (let i = 0; i < 10; i++) { const y = 160 + i * 2; linea(0, y, 319, y + (i % 3) - 1, i % 2 ? hex('#5e626c') : hex('#34363e')); }
  rect(258, 92, 260, 150, hex('#2a3a2a')); rect(250, 86, 268, 92, hex('#2a3a2a')); rect(252, 92, 266, 94, hex('#fff2b0'));
  rect(286, 134, 300, 149, hex('#2a4a9a')); rect(286, 134, 300, 136, hex('#4a6aba')); rect(288, 140, 298, 140, K); rect(284, 133, 302, 133, BL);
  rect(70, 138, 75, 149, hex('#c8282a')); rect(69, 138, 76, 139, hex('#e84a4a')); rect(68, 142, 77, 143, hex('#8a1a1a')); rect(69, 136, 76, 137, BL);
};
// el coche aparcado, grande y de juguete, con la ventanilla bajada y la radio
const cocheRadio = (x, base, t, bote) => { const { rect, pset, disco, poligono } = R; const y = base - bote;
  const C0 = hex('#3a6ad8'), CL = hex('#7aa0f0'), CS = hex('#2a4aa0'), GL = hex('#2a3448');
  ovalo(x + 46, base + 1, 48, 3, 0.45, K);
  for (let j = 0; j < 18; j++) { const r = j < 2 ? 4 - j * 2 : 0; rect(x + r, y - 22 + j, x + 92 - r, y - 22 + j, j === 0 ? K : j < 3 ? CL : j > 14 ? CS : C0); } rect(x, y - 21, x, y - 6, K); rect(x + 92, y - 21, x + 92, y - 6, K); rect(x, y - 5, x + 92, y - 5, K);
  for (let j = 0; j < 16; j++) { rect(x + 22 + (15 - j) * 0.8, y - 38 + j, x + 70 - (15 - j) * 1.0, y - 38 + j, j === 0 ? K : CL); }
  // la ventanilla bajada: se ve el salpicadero con la radio encendida
  rect(x + 26, y - 35, x + 66, y - 23, GL); rect(x + 46, y - 35, x + 47, y - 23, C0);
  rect(x + 50, y - 28, x + 64, y - 23, hex('#1a1a22')); rect(x + 52, y - 27, x + 59, y - 25, hex('#5aff8a')); for (let i = 0; i < 3; i++) pset(x + 53 + i * 2, y - 26, hex('#1e5a2e')); disco(x + 62, y - 26, 1, hex('#c8c8d0'));
  halo(x + 56, y - 26, 8, 0.3, hex('#5aff8a'));
  R.recorte([x + 26, y - 35, x + 45, y - 23]); R.actor(EL.chico, x + 29, y - 6, t, { dir: 1, sonrisa: true, habla: Math.sin(t * 5) > 0.3 }); R.recorte(null);
  rect(x + 26, y - 23, x + 66, y - 22, C0);
  // tiradores, faros y parachoques
  rect(x + 36, y - 16, x + 41, y - 15, hex('#c8c8d0')); rect(x + 88, y - 18, x + 91, y - 14, hex('#fff6c0')); rect(x + 1, y - 18, x + 3, y - 14, hex('#ff3a3a')); rect(x - 2, y - 7, x + 10, y - 5, hex('#c8c8d0')); rect(x + 82, y - 7, x + 94, y - 5, hex('#c8c8d0'));
  for (const i of [20, 74]) { disco(x + i, base - 4, 8, K); disco(x + i, base - 4, 5, hex('#2a2a30')); disco(x + i, base - 4, 3, hex('#c8c8d0')); pset(x + i, base - 4, K); }
  for (let i = 4; i < 90; i += 3) pset(x + i, y - 22, BL); };
const p3 = (t) => {
  pon('t3', fondo3);
  // la nieve que cae
  for (let i = 0; i < 60; i++) { const x = (h(i, 1, 76) * 340 + Math.sin(t + i) * 6 - t * 4) % 340, y = (h(i, 2, 76) * 180 + t * (14 + h(i, 3) * 10)) % 180; if (!quieta(x, y)) P(x < 0 ? x + 340 : x, y, i % 3 ? BL : hex('#d8dce4')); }
  // el letrero de bombillas: el 3 se enciende de arriba abajo entre «Grand» y «3»
  { const T3 = ['###', '..#', '.##', '..#', '###'], u = tramo(t, GRAND, TRES);
    for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (T3[j][i] === '#') { const on = u > (j * 3 + i) / 15 || t > TRES; const cx = 208 + i * 8, cy = 28 + j * 6; R.disco(cx, cy, 2, on ? hex('#fff2b0') : hex('#5a4a3a')); if (on) halo(cx, cy, 4, 0.3, hex('#ffd860')); }
    for (let k = 0; k < 6; k++) { const on = (Math.floor(t * 6) + k) % 2 && t > TRES; R.disco(240, 28 + k * 5, 1, on ? hex('#ff6ad0') : hex('#5a3a4a')); R.disco(196, 28 + k * 5, 1, on ? hex('#5af0f0') : hex('#3a4a5a')); }
    if (t > TRES && t < TRES + 0.5) halo(220, 40, 30, 0.35 * (1 - tramo(t, TRES, TRES + 0.5)), hex('#fff2b0')); }
  // la luz del diner parpadea; el vapor de una alcantarilla
  vapor(150, 174, t, 4, 26, hex('#e8ecf2'), 5, 0.5);
  // los dos vecinos que charlan (bocadillos con símbolos) y el del perro
  const turno = Math.floor((t - P3) / 1.1) % 2;
  R.actor(EL.vecina, 30, 146, t, { dir: 1, habla: turno === 0 && Math.sin(t * 9) > 0, sonrisa: turno === 1, dedo: turno === 0 && t > PALAB + 0.5 && t < PALAB + 1.2 });
  R.actor(EL.oficinista, 50, 146, t, { dir: -1, habla: turno === 1 && Math.sin(t * 9) > 0, sonrisa: turno === 0 });
  if (t > PALAB) { const ic = ['coche', '!', '?', 'reloj'][Math.floor((t - P3) / 1.1) % 4]; R.bocadillo(turno === 0 ? 36 : 56, 118, { icono: ic }); }
  { const x = Math.round(lerp(320, 180, tramo(t, P3, TRES + 0.6))); R.actor(EL.chica, x, 147, t, { dir: -1, anda: x > 180 }); const px = x - 14; R.rect(px, 140, px + 8, 143, hex('#2a2a30')); R.rect(px - 2, 137, px + 1, 141, hex('#2a2a30')); R.pset(px - 2, 138, BL); R.rect(px + 1, 144, px + 1, 146, K); R.rect(px + 7, 144, px + 7, 146, K); R.pset(px + 9, 139 + (Math.floor(t * 8) % 2), hex('#2a2a30')); R.linea(px + 2, 138, x + 3, 132, hex('#c8302a')); }
  // el coche con la radio: bota al ritmo y echa notas
  const bote = Math.max(0, Math.round(Math.sin(t * 11) * 1.4));
  cocheRadio(118, 172, t, bote);
  notas(t, 168, 136, 5, 13, [hex('#ffd84a'), hex('#ff6ab0'), hex('#5af0f0'), hex('#9aff6a')], 44, 0.55);
  // un taxi pasa por delante
  { const x = lerp(-60, 330, tramo(t, P3 + 1.2, P3 + 3.6)); cocheLado(x, 179, 1, '#f0c020', t, { taxi: true }); }
};

const efectos = [[SUBE, 'avalancha'], [SUBE + 1.8, 'brillo'], [PUENTES, 'brillo'], [RADIOS, 'pop'], [P3 + 1.4, 'motor'], [TRES, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2001 });
''')
