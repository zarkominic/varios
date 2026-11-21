E = {}

# piezas comunes a las cuatro escenas (cada escena es una página aparte: se repiten dentro de cada cuerpo)
H = r'''
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const um = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const pal = (...a) => a.map(hex);
const K = hex('#1a1424'), BL = hex('#f6f6ee');
const suave = (u) => u * u * (3 - 2 * u);
// un fondo fijo: se pinta una vez en su búfer (prev = R.usar(b) … R.usar(prev))
const fijo = (pinta) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); } return b; }; };
// pega un búfer con transparencia (0) desplazado (dx, dy)
const pegar = (buf, dx = 0, dy = 0) => { const B = R.buf; dx = Math.round(dx); dy = Math.round(dy);
  for (let y = Math.max(0, dy); y < Math.min(180, 180 + dy); y++) { const sy = y - dy, f = y * 320, sf = sy * 320; for (let x = Math.max(0, dx); x < Math.min(320, 320 + dx); x++) { const c = buf[sf + x - dx]; if (c) B[f + x] = c; } } };
// degradado tramado (Bayer) entre bandas de color
const banda = (y0, y1, cols, x0 = 0, x1 = 319) => { const n = cols.length - 1; for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.floor(f), r = f - i; for (let x = x0; x <= x1; x++) R.pset(x, y, r > um(x, y) ? cols[Math.min(n, i + 1)] : cols[i]); } };
// nube de tres tonos (sombra, cuerpo, luz)
const nube3 = (cx, cy, w, [cS, cM, cL]) => { const bolas = [[0, 0, w * 0.32], [-w * 0.32, w * 0.06, w * 0.24], [w * 0.3, w * 0.05, w * 0.26], [-w * 0.1, -w * 0.12, w * 0.26], [w * 0.14, -w * 0.08, w * 0.22]];
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx), Math.round(cy + dy + 1), Math.round(r), cS);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx), Math.round(cy + dy - 1), Math.round(r * 0.88), cM);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx - 1), Math.round(cy + dy - 2), Math.round(r * 0.6), cL); };
// nubes a tres velocidades: [x0, y, ancho, velocidad]
const nubes = (t, lista, cols) => lista.forEach(([x0, y, w, v]) => nube3((((x0 + t * v) % 440) + 440) % 440 - 60, y, w, cols));
// gaviotas que cruzan (fuera de la zona de Atom y de la barra del año)
const aves = (t, n, y0, y1, k0 = 0, v0 = 7) => { for (let k = 0; k < n; k++) { const v = v0 + (k % 3) * 4, x = ((k * 97 + k0 + t * v) % 380) - 30, y = y0 + ((k * 37 + k0) % Math.max(1, y1 - y0)) + Math.round(Math.sin(t * 0.9 + k) * 3); if (x > 270 && y < 48) continue; R.gaviota(Math.round(x), y, t, k); } };
// olas en perspectiva: rayas de luz con su sombra, más largas cerca; vx: deriva
const olas = (t, y0, y1, n, cL, cS, vx = 0, k0 = 0, vy = 0) => { for (let k = 0; k < n; k++) {
  const d0 = hh(k, 1, k0), d = vy ? (d0 + t * vy) % 1 : d0, y = Math.round(y0 + (y1 - y0) * d * d), L = Math.round(2 + d * 8), x = Math.round(((hh(k, 2, k0) * 360 + t * vx * (0.3 + d)) % 360 + 360) % 360 - 20);
  if (Math.sin(t * 1.7 + k * 1.3) < -0.4) continue; R.rect(x, y, x + L, y, cL); if (d > 0.3) R.rect(x + 1, y + 1, x + L - 1, y + 1, cS); } };
// garza en vuelo (alas lentas)
const garza = (x, y, t, dir = -1) => { x = Math.round(x); y = Math.round(y); const a = Math.sin(t * 5) > 0, g = hex('#e8ecee'), gS = hex('#a8b4be');
  R.rect(x - 3, y, x + 3, y + 1, g); R.rect(x - 2, y + 1, x + 2, y + 1, gS); R.pset(x + 4 * dir, y - 1, g); R.pset(x + 5 * dir, y - 1, g); R.pset(x + 6 * dir, y - 1, hex('#e8b830')); R.pset(x - 4 * dir, y + 1, hex('#3a3a3a')); R.pset(x - 5 * dir, y + 1, hex('#3a3a3a'));
  if (a) { R.linea(x - 1, y - 1, x - 3, y - 5, g); R.linea(x + 1, y - 1, x + 3, y - 5, gS); } else { R.linea(x - 1, y + 2, x - 3, y + 5, gS); R.linea(x + 1, y + 2, x + 3, y + 5, g); } };
'''

# el bote de la Dauphine de perfil, con los remos que salen de la mano del remero (gancho y lenapes)
BOTE = r'''
const MAD = pal('#8a5a32', '#b07a46', '#5e3a1e', '#d8b07a', '#2a1a10');
const casco = (x, y, t, o = {}) => { const s = o.s ?? 1, dir = o.dir ?? 1, L = Math.round(26 * s), yy = y + Math.round(Math.sin(t * 2.2 + x * 0.05) * 0.8);
  for (let i = -L; i <= L; i++) { const u = i / L, top = yy - Math.round((4 + Math.pow(Math.abs(u), 3) * 4) * s) - (i * dir > L - 2 ? 2 : 0), bot = yy + Math.round((1 - u * u) * 3 * s), px = x + i * dir;
    for (let j = top; j <= bot; j++) { const q = j - top; R.pset(px, j, q === 0 || j === bot || Math.abs(i) === L ? MAD[4] : q === 1 ? MAD[3] : q === 2 ? MAD[1] : q % 3 === 0 ? MAD[2] : j > yy ? mez(MAD[0], MAD[2], 0.5) : (hh(i >> 2, j, 5) < 0.15 ? MAD[1] : MAD[0])); } }
  for (let i = -L + 3; i < L - 2; i += 9) { R.pset(x + i * dir, yy - Math.round(4 * s) + 1, hex('#e8d8b0')); }
  for (let i = -L + 2; i < L - 1; i++) if (hh(i, Math.floor(t * 5), 7) < 0.35) R.pset(x + i * dir, yy + Math.round((1 - (i / L) ** 2) * 3 * s) + 1, hex('#eef6f4'));
  return { yy, borda: yy - Math.round(4 * s), L }; };
// un remo: del puño (hx, hy) por el tolete (px, py) hasta el agua (yAgua); la pala salpica al entrar
const remo = (hx, hy, px, py, yAgua, t, k = 0, Lr = 16) => { const dx = px - hx, dy = py - hy, dd = Math.hypot(dx, dy) || 1; let ex = px + dx / dd * Lr, ey = py + Math.max(0.5, dy / dd) * Lr; if (ey > yAgua + 3) { const f = (yAgua + 3 - py) / (ey - py); ex = px + (ex - px) * f; ey = yAgua + 3; }
  R.linea(hx, hy, Math.round(ex), Math.round(ey), MAD[4]); R.linea(hx, hy - 1, Math.round(ex), Math.round(ey) - 1, MAD[1]); R.rect(Math.round(ex) - 1, Math.round(ey) - 1, Math.round(ex) + 1, Math.round(ey) + 1, MAD[3]); R.pset(Math.round(ex), Math.round(ey) + 1, MAD[4]);
  if (ey >= yAgua) for (let j = 0; j < 4; j++) if (hh(j, Math.floor(t * 8), k) < 0.6) R.pset(Math.round(ex) + j - 2, Math.round(yAgua) - (j % 2), hex('#eef6f4')); };
// un remero sentado en el bote: el actor (las piernas las tapa el casco) y su mano en el puño del remo
const remero = (def, x, yPies, t, o = {}) => { const fase = t * (o.vel ?? 6) + (o.f0 ?? 0), dir = o.dir ?? -1, px = x + (dir > 0 ? 18 : -4);
  const objetivo = [px - dir * (6 + Math.round(3 * Math.cos(fase))), yPies - 12 + Math.round(2 * Math.sin(fase))];
  const r = R.actor(def, x, yPies, t, { dir, sostiene: o.quieto ? true : objetivo, sonrisa: o.sonrisa, sorpresa: o.sorpresa, enfado: o.enfado });
  return { mano: r.mano, px, fase }; };
'''

E['ny-gancho'] = ('Gancho', '''// NY-GANCHO (frases 1–2), abril de 1524, cartela «1524». Cuatro planos:
// 1. el mapa del Atlántico: la ruta de La Dauphine avanza de Dieppe por Madeira hasta la bahía y cae la chincheta
//    («It's April 1524… La Dauphine»); corta en «Dauphine»;
// 2. el estrecho entre las dos colinas: La Dauphine llega, aferra las velas y echa el ancla en «anchors» (chof); los
//    marineros suben a las vergas; delfines; en «small boat» el bote sale de la sombra del casco remando hacia el hueco;
//    corta en «through»;
// 3. a ras de agua, detrás del bote: las dos colinas se apartan y se abre la bahía enorme («huge», brillo); Verrazzano,
//    de pie, levanta los brazos; dos garzas cruzan en «calm bay»; el humo de un poblado al fondo; corta en «Her»;
// 4. mar abierto: La Dauphine de cerca navegando al oeste; Verrazzano cruza la cubierta, saca el catalejo en «Giovanni»;
//    un marinero trepa a la jarcia y otro tira de un cabo; en «sea route» sale el bocadillo con el mapa: la flecha al
//    oeste se queda en el aire ante la pagoda y la «?» en «China».''', H + BOTE + r'''
const A = (f) => en('dauphine', f), B = (f) => en('capitan', f);
const P2 = A(0.33), P3 = A(0.714), P4 = B(0);
const ancla = A(0.39), sale = A(0.58), enorme = A(0.767), calma = A(0.844), bosque = A(0.938);
const gio = B(0.398), ruta = B(0.80), china = B(0.897);

// 1 · el mapa del Atlántico
const p1 = (t) => { T.mapaNY(R, t, { vista: 'atlantico', u: suave(tramo(t, 1.45, P2 - 0.45)) }); };

// 2 · el estrecho: la nao fondea y sale el bote
const p2 = (t) => {
  T.bahia1524(R, t, { encuadre: 'estrecho', viento: 0.25 });
  // delfines que saltan delante (vida del mar)
  for (const [t0, x0, y0] of [[P2 + 0.6, 150, 150], [P2 + 1.0, 176, 156], [ancla + 1.6, 206, 146]]) { const u = (t - t0) / 1.1; if (u < 0 || u > 1) continue; const x = Math.round(x0 + u * 26), y = Math.round(y0 - Math.sin(u * Math.PI) * 9), dl = hex('#5a6e82'), dlS = hex('#3a4a5a'), dlL = hex('#a8bccb');
    R.rect(x - 4, y, x + 4, y + 2, dl); R.rect(x - 3, y + 2, x + 3, y + 2, dlL); R.pset(x + 5, y + 1 + (u > 0.5 ? 1 : 0), dl); R.pset(x + 6, y + 1 + (u > 0.5 ? 1 : 0), dlS); R.pset(x, y - 1, dlS); R.pset(x - 5, y - 1 + (u > 0.5 ? 0 : 1), dlS); R.pset(x - 6, y - 2 + (u > 0.5 ? 0 : 1), dlS);
    if (u < 0.15 || u > 0.85) for (let j = -3; j <= 3; j++) if (hh(j, Math.floor(t * 9), 3) < 0.6) R.pset(x + j, y0 + 1 - (j & 1), hex('#eef6f4')); }
  const llega = suave(tramo(t, P2, ancla + 0.2)), leva = 1 - suave(tramo(t, ancla - 0.2, ancla + 1.2));
  const d = T.dauphine(R, Math.round(lerp(50, 72, llega)), 128, t, { ancla: true, leva, avanza: llega < 1, viento: 0.3 });
  // los marineros que suben por la jarcia a aferrar las velas (figuritas)
  for (let k = 0; k < 3; k++) { const u = tramo(t, ancla + k * 0.3, ancla + 1.6 + k * 0.3), x = d.x - 14 + k * 13, y = Math.round(d.cubierta - 2 - u * (22 - k * 3)); R.rect(x - 1, y - 4, x + 1, y, K); R.pset(x, y - 3, BL); R.pset(x, y - 2, BL); R.pset(x, y - 5, hex('#c8303a')); R.pset(x, y - 4, hex('#e8b890')); }
  // el bote: sale de detrás de la popa y rema hacia el hueco del estrecho, cada vez más pequeño
  const u = tramo(t, sale, P3 + 0.4);
  if (u > 0) { const x = Math.round(lerp(100, 164, u)), y = Math.round(lerp(140, 100, u)), s = lerp(1.7, 0.75, u), L = Math.round(10 * s), fase = t * 7, hb = Math.max(1, Math.round(1.6 * s));
    for (let k = 0; k < 3; k++) { const hx = x - L + 3 + k * Math.round(6 * s), c = k === 0 ? hex('#8a2a3a') : k === 1 ? hex('#e8dcc0') : hex('#4a5a7a'); R.rect(hx - 1, y - 2 - hb * 2, hx + hb - 1, y - 2, c); R.rect(hx - 1, y - 3 - hb * 3, hx + hb - 1, y - 3 - hb * 2, hex('#e8b890')); R.pset(hx - 1, y - 3 - hb * 3, K);
      if (k > 0) { const e = Math.round(Math.cos(fase + k) * 3 * s); R.linea(hx, y - 2, hx - 4 + e, y + 2, MAD[3]); R.pset(hx - 4 + e, y + 3, hex('#eef6f4')); } }
    R.rect(x - L, y - 2, x + L, y + 1, K); R.rect(x - L + 1, y - 1, x + L - 1, y, MAD[0]); R.rect(x - L + 1, y - 1, x + L - 1, y - 1, MAD[3]); R.pset(x + L + 1, y - 3, K);
    for (let k = 0; k < 6; k++) { const f = (k / 6 + t) % 1; R.pset(Math.round(x - L - f * 12 * s), y + Math.round(f * 2) + (k & 1), hex('#eef6f4')); } }
};

// 3 · a ras de agua, detrás del bote: las colinas se apartan y se abre la bahía
const CIE = pal('#3a78c4', '#4686ce', '#5694d6', '#68a4de', '#7cb2e4', '#94c2ea', '#b0d2ec', '#d4e4ea');
const fondo3 = fijo(() => {
  banda(0, 92, CIE);
  // la sierra azul lejana y la orilla de la bahía con el bosque y la isla larga
  for (let x = 0; x < 320; x++) { const s = 78 + Math.round(Math.sin(x * 0.03) * 3 + Math.sin(x * 0.11 + 1) * 1.5); for (let y = s; y <= 92; y++) R.pset(x, y, um(x, y) < 0.5 ? hex('#8ea8c6') : hex('#839ec0')); }
  for (let x = 0; x < 320; x++) { const s = 85 + Math.round(Math.sin(x * 0.05 + 2) * 2 + (x > 180 ? -2 : 0) + hh(x >> 2, 0, 3) * 1.5); for (let y = s; y <= 93; y++) R.pset(x, y, hh(x, y, 4) < 0.2 ? hex('#6e9a7a') : y === s ? hex('#5a8a6a') : hex('#42705a')); if (hh(x, 7, 5) < 0.05) R.pset(x, s, hex('#f0e8f0')); }
  banda(94, 179, pal('#c4dce6', '#9ec4da', '#7eaecc', '#6298be', '#5084ae', '#43749e', '#38648c'));
  for (let y = 94; y < 100; y++) for (let x = 0; x < 320; x++) if (hh(x, y, 6) < 0.25) R.pset(x, y, mez(R.pget(x, y), hex('#42705a'), 0.3));
});
// las dos colinas cercanas (Staten Island y Brooklyn), con su bosque de tres tonos, cornejos y ciclamores en flor
const colina = (izq) => fijo(() => {
  const ridge = (x) => { const v = izq ? x : 319 - x, f = Math.min(1, v / 168); return Math.round((izq ? 22 : 34) + Math.pow(f, 1.7) * 76 + Math.sin(v * 0.09) * 3); };
  const agua = (x) => { const v = izq ? x : 319 - x; return Math.round(104 + (168 - Math.min(168, v)) * 0.22); };
  const fin = (x) => (izq ? x <= 166 : x >= 154);
  const g = pal('#1e3a26', '#2c5032', '#3e6a3c', '#5a8a48', '#7aa858');
  for (let x = 0; x < 320; x++) if (fin(x)) for (let y = ridge(x); y <= agua(x); y++) R.pset(x, y, g[0]);
  for (let j = 0; j < 40; j++) for (let i = 0; i < 70; i++) { const cx = Math.round(i * 4.6 + hh(i, j, 11) * 4), cy = Math.round(j * 4.2 + hh(i, j, 12) * 3); if (!fin(cx) || cy < ridge(cx) - 1 || cy > agua(cx) - 4) continue;
    const r = 3 + Math.round(hh(i, j, 13) * 2), pino = hh(i, j, 14) < 0.12;
    if (pino) { R.poligono([[cx, cy - r - 4], [cx - r, cy + 2], [cx + r, cy + 2]], g[0]); R.poligono([[cx, cy - r - 3], [cx - r + 1, cy + 1], [cx, cy + 1]], g[1]); continue; }
    R.disco(cx, cy, r, g[1]); R.disco(cx - 1, cy - 1, r - 1, g[2]); R.disco(cx - 2, cy - 2, Math.max(1, r - 2), g[3]); if (r > 3) R.pset(cx - 2, cy - 3, g[4]);
    const fl = hh(i, j, 15); if (fl < 0.09) { const c = fl < 0.05 ? hex('#f4f0ea') : hex('#e88ab8'); R.rect(cx - 1, cy - 1, cx + 1, cy, c); R.pset(cx, cy - 2, c); } }
  // la orilla de rocas con percebes y la espuma, y el reflejo tramado en el agua
  for (let x = 0; x < 320; x++) { if (!fin(x)) continue; const y = agua(x); for (let k = -3; k <= 0; k++) R.pset(x, y + k, hh(x >> 1, k, 16) < 0.3 ? hex('#8a8478') : hh(x, k, 17) < 0.2 ? hex('#b8b0a0') : hex('#5e584e')); R.pset(x, y + 1, hex('#eef6f4'));
    for (let k = 2; k < 12; k++) if (um(x, y + k) < 0.55 - k * 0.04) R.pset(x, y + k + Math.round(Math.sin(k + x * 0.2)), mez(g[1], hex('#3a6488'), 0.45)); }
});
const colI = colina(true), colD = colina(false);
// la marisma del medio de la bahía, con sus juncos (fija)
const marisma3 = fijo(() => { for (let x = 112; x < 206; x++) { const s0 = 95 - Math.round(Math.sin((x - 112) / 94 * Math.PI) * 3); for (let y = s0; y <= 97; y++) R.pset(x, y, hh(x, y, 40) < 0.35 ? hex('#a8b068') : hex('#8a9a5a')); if (hh(x, 0, 41) < 0.4) R.pset(x, s0 - 1, hex('#6a7a42')); if (hh(x, 1, 41) < 0.15) R.pset(x, s0 - 2, hex('#5a6a3a')); } });
const p3 = (t) => {
  R.copiar(fondo3());
  // el sol y su camino de brillos en el agua
  R.disco(58, 30, 9, hex('#fff4c8')); R.disco(58, 30, 7, hex('#fffbe8'));
  for (let k = 0; k < 36; k++) { const d = hh(k, 1, 51), y = 96 + Math.round(d * d * 80), L = 1 + Math.round(d * 5), x = 58 + Math.round((hh(k, 2, 51) - 0.5) * (4 + d * 50)); if (Math.sin(t * 3 + k * 1.9) > 0) R.rect(x - L, y, x + L, y, hex('#fff8dc')); }
  nubes(t, [[20, 46, 34, 1.2], [180, 20, 54, 0.7], [250, 58, 24, 2]], pal('#a8bccf', '#e4eef4', '#ffffff'));
  pegar(marisma3());
  // el humo del poblado en la orilla lejana y dos canoas lejanas
  for (let k = 0; k < 18; k++) { const y = 84 - k * 2, x = 236 + Math.round(Math.sin(t * 1.3 + k * 0.5) * (k * 0.25) + k * 0.4); if (um(x, y) < 0.7 - k * 0.03) R.pset(x, y, hex('#d8dce0')); }
  for (let k = 0; k < 2; k++) { const x = Math.round(214 + k * 22 + Math.sin(t * 0.4 + k) * 6), y = 98 + k; R.rect(x - 3, y, x + 3, y, hex('#4a2e1a')); R.pset(x - 1, y - 1, hex('#8a5a3a')); R.pset(x + 1, y - 1, hex('#8a5a3a')); R.pset(x + 1, y - 2, hex('#e8c840')); }
  // las olas que vienen hacia nosotros (avanzamos)
  olas(t, 98, 179, 110, hex('#e4f0f6'), hex('#3a5e80'), 0, 31, 0.16);
  // una familia de patos que cruza
  for (let k = 0; k < 4; k++) { const x = Math.round(lerp(40, 120, tramo(t, P3, P4)) - k * 9), y = 124 + k, g = k ? 0 : 1; R.rect(x - 2 - g, y - 1, x + 2 + g, y, hex('#8a6a4a')); R.rect(x + 2 + g, y - 3 - g, x + 3 + g, y - 1, k ? hex('#a8845a') : hex('#2a6a4a')); R.pset(x + 4 + g, y - 2 - g, hex('#e8a030')); R.pset(x - 4 - g, y + 1, hex('#e4f0f6')); R.pset(x - 6 - g, y + 2, hex('#e4f0f6')); }
  aves(t, 3, 50, 70, 11);
  for (const [t0, y0, k] of [[calma - 0.3, 64, 0], [calma + 0.1, 70, 1]]) { const u = tramo(t, t0, P4 + 0.6); if (u > 0 && u < 1) garza(lerp(250 - k * 20, 70, u), y0 + Math.sin(t * 2 + k) * 2, t + k, -1); }
  // las colinas se apartan: el estrecho se abre en la bahía enorme
  const u = suave(tramo(t, P3 + 0.1, enorme + 0.8));
  pegar(colI(), -u * 96, u * 10); pegar(colD(), u * 96, u * 8);
  // el bote, de espaldas: los remeros a los lados con sus remos y Verrazzano de pie, que se asombra
  const y0 = 150 + Math.round(Math.sin(t * 2.3) * 1.2), f = t * 5.5, bate = Math.sin(f);
  const asombro = t > enorme - 0.1 && t < bosque + 0.2;
  const r1 = R.actor(EL.marinero, 106, y0 + 7, t, { dir: -1, sostiene: [101, y0 - 10 + Math.round(bate * 2)] });
  const r2 = R.actor(EL.marinero2, 200, y0 + 7, t, { dir: 1, sostiene: [219, y0 - 10 + Math.round(bate * 2)] });
  R.actor(EL.verrazzano, 134, y0 + 6, t, { dir: 1, brazos: asombro, sorpresa: t > enorme - 0.1 && t < calma, sonrisa: t >= calma, dedo: t > bosque + 0.2 });
  // la popa: espejo de tablas con el borde tallado, el codaste con el timón y el farol
  const pk = [[100, y0 - 3], [220, y0 - 3], [214, y0 + 14], [196, y0 + 26], [124, y0 + 26], [106, y0 + 14]];
  R.poligono(pk, K); R.poligono([[102, y0 - 2], [218, y0 - 2], [212, y0 + 13], [195, y0 + 25], [125, y0 + 25], [108, y0 + 13]], MAD[0]);
  for (let j = y0 + 3; j < y0 + 26; j += 4) for (let x = 100; x < 221; x++) if (R.pget(x, j) === MAD[0] || R.pget(x, j) === MAD[1]) R.pset(x, j, MAD[2]);
  for (let j = y0; j < y0 + 26; j++) for (let x = 104; x < 218; x++) { const c = R.pget(x, j); if (c === MAD[0] && hh(x >> 2, j, 9) < 0.14) R.pset(x, j, MAD[1]); }
  R.rect(100, y0 - 4, 220, y0 - 2, MAD[3]); R.rect(100, y0 - 5, 220, y0 - 5, K); for (let x = 106; x < 216; x += 8) R.pset(x, y0 - 3, hex('#8a6a20'));
  R.rect(157, y0 - 2, 163, 180, K); R.rect(158, y0 - 2, 162, 180, MAD[2]); R.rect(159, y0 - 2, 160, 180, MAD[1]); R.linea(160, y0 - 3, 170, y0 - 10, MAD[4]); R.linea(160, y0 - 4, 170, y0 - 11, MAD[1]);
  R.rect(186, y0 - 26, 187, y0 - 5, MAD[4]); { const lx = 186, ly = y0 - 30; R.rect(lx - 3, ly - 3, lx + 4, ly + 5, K); R.rect(lx - 2, ly - 2, lx + 3, ly + 4, hex('#3a3a3a')); R.rect(lx - 1, ly - 1, lx + 2, ly + 3, hex('#f0d080')); R.rect(lx - 3, ly - 4, lx + 4, ly - 4, hex('#8a6a20')); }
  // los remos a los lados: entran en el agua, empujan y salen, con la salpicadura
  for (const [r, lado] of [[r1, -1], [r2, 1]]) { const [hx, hy] = r.mano, bx = Math.round(hx + lado * (40 + bate * 8)), by = y0 + 12 + Math.round(Math.cos(f) * 5);
    R.linea(hx, hy, bx, by, K); R.linea(hx, hy + 1, bx, by + 1, K); R.linea(hx, hy - 1, bx, by - 1, MAD[1]); R.linea(hx, hy, bx, by, MAD[3]);
    R.rect(bx - 3, by - 1, bx + 3, by + 2, K); R.rect(bx - 2, by, bx + 2, by + 1, MAD[3]);
    if (Math.cos(f) > 0.2) for (let j = 0; j < 7; j++) if (hh(j, Math.floor(t * 8), lado + 2) < 0.7) R.pset(bx - 4 + j, by - 1 - (j % 3), hex('#eef6f4')); }
  // la estela que se abre hacia nosotros
  for (let k = 0; k < 18; k++) { const q = (k / 18 + t * 0.6) % 1, xl = Math.round(124 - q * 60), xr = Math.round(196 + q * 60), y = Math.round(y0 + 26 + q * 6); if (hh(k, Math.floor(t * 6), 4) < 0.7) { R.pset(xl, y, hex('#eef6f4')); R.pset(xr, y, hex('#eef6f4')); R.pset(xl + 1, y, hex('#c4d8e2')); R.pset(xr - 1, y, hex('#c4d8e2')); } }
};

// 4 · mar abierto: La Dauphine de cerca, el capitán y el bocadillo del mapa a China
const MAR = pal('#9cc4d8', '#7aaeca', '#5e98bc', '#4a84ac', '#3c729a', '#326288', '#2a5276');
const fondo4 = fijo(() => {
  banda(0, 104, CIE);
  for (let x = 0; x < 120; x++) { const s = 100 + Math.round(Math.sin(x * 0.06) * 1.5 + x * 0.02); for (let y = s; y <= 104; y++) R.pset(x, y, um(x, y) < 0.5 ? hex('#8ea8c6') : hex('#7e9cb8')); }
  banda(105, 179, MAR);
});
const p4 = (t) => {
  R.copiar(fondo4());
  nubes(t, [[10, 40, 46, 1.4], [150, 24, 60, 0.8], [250, 64, 30, 2.2], [330, 50, 36, 1.1]], pal('#a8bccf', '#e4eef4', '#ffffff'));
  olas(t, 106, 179, 110, hex('#d8eaf2'), hex('#2e5a7c'), 16, 41);
  aves(t, 4, 48, 80, 23, 10);
  const d = T.dauphine(R, 166, 152, t, { s: 2, dir: -1, viento: 0.55, avanza: true });
  const [b0, b1] = d.borda, cub = d.cubierta;
  // un marinero trepa por la jarcia; otro tira de un cabo en la popa
  const tira1 = Math.sin(t * 4 + 1.5) > 0, m1 = R.actor(EL.marinero, b0 - 6, cub, t, { dir: 1, sostiene: [b0 + 12, cub - (tira1 ? 18 : 11)] });
  R.linea(m1.mano[0], m1.mano[1], b0 + 26, cub - 52, hex('#c8b088')); R.linea(m1.mano[0], m1.mano[1], m1.mano[0] - 3, cub, hex('#c8b088'));
  const tira = Math.sin(t * 4) > 0;
  const m2 = R.actor(EL.marinero2, b1 - 14, cub, t, { dir: 1, sostiene: [b1 + 4, cub - (tira ? 16 : 10)] });
  R.linea(m2.mano[0], m2.mano[1], b1 + 6, cub - 46, hex('#c8b088')); R.linea(m2.mano[0], m2.mano[1], m2.mano[0] - 2, cub, hex('#c8b088'));
  // Verrazzano cruza la cubierta hacia la proa y se lleva el catalejo al ojo
  const an = tramo(t, P4 + 0.2, gio - 0.4), vx = Math.round(lerp(b1 - 40, b0 + 24, suave(an)));
  const cat = t > gio - 0.2, señala = t > china - 0.1;
  const v = R.actor(EL.verrazzano, vx, cub, t, { dir: an > 0 && an < 1 ? -1 : -1, anda: an > 0 && an < 1, sostiene: cat && !señala ? [vx - 2, cub - 19] : undefined, dedo: señala, sonrisa: t > gio + 0.6 && !señala, sorpresa: señala });
  if (cat && !señala) { const [hx, hy] = v.mano, L = Math.round(4 + 6 * tramo(t, gio - 0.2, gio + 0.2)); R.rect(hx - L - 2, hy - 2, hx + 1, hy, K); R.rect(hx - L - 1, hy - 1, hx, hy - 1, hex('#c8a040')); R.pset(hx - L - 2, hy - 1, hex('#e8e0b0')); R.rect(hx - 3, hy - 2, hx - 2, hy, hex('#7a5a20')); }
  d.delante();
  // el bocadillo: el mapa de la ruta a China, que se queda en el aire
  const e = tramo(t, ruta - 0.15, ruta + 0.25);
  if (e > 0) { const bx = 34, by = 26, w = 92, hgt = 50, ex = Math.round(w * (0.6 + 0.4 * e)), x0 = bx + Math.round((w - ex) / 2);
    for (const [k, r] of [[0, 2], [1, 3]]) R.disco(vx + 8 - k * 10, cub - 32 - k * 8, r, K), R.disco(vx + 8 - k * 10, cub - 32 - k * 8, r - 1, hex('#f2e6c4'));
    R.rect(x0 - 1, by - 1, x0 + ex + 1, by + hgt + 1, K); R.rect(x0, by, x0 + ex, by + hgt, hex('#e8d8b0')); R.rect(x0 + 2, by + 2, x0 + ex - 2, by + hgt - 2, hex('#f2e6c4'));
    if (e >= 1) { const pap = hex('#f2e6c4'), costa = hex('#7a5a3a'), mar = hex('#a8c8c8');
      for (let y = by + 3; y < by + hgt - 2; y++) for (let x = bx + 3; x < bx + w - 2; x++) { const c = x > bx + 58 + Math.round(Math.sin(y * 0.4) * 3); R.pset(x, y, c ? (um(x, y) < 0.5 ? mar : pap) : (hh(x >> 1, y >> 1, 21) < 0.08 ? hex('#6a8a4a') : hex('#e2cfa0'))); }
      for (let y = by + 3; y < by + hgt - 2; y++) R.pset(bx + 58 + Math.round(Math.sin(y * 0.4) * 3), y, costa);
      // el barquito, la flecha de trazos al oeste que se para en el aire, la pagoda lejana y la «?»
      const fx = bx + 72, fy = by + 26; R.rect(fx - 3, fy, fx + 3, fy + 1, hex('#5e3a1e')); R.linea(fx, fy - 5, fx, fy, K); R.rect(fx - 2, fy - 4, fx + 1, fy - 1, BL);
      const ll = Math.round(44 * tramo(t, ruta + 0.2, china - 0.05)); for (let k = 0; k < ll; k += 1) if ((k >> 2) % 2 === 0) R.pset(fx - 6 - k, fy - Math.round(k * 0.12), hex('#c8303a'));
      if (t > china - 0.05) { const ax = fx - 6 - 44, ay = fy - 5; R.linea(ax, ay, ax + 3, ay - 2, hex('#c8303a')); R.linea(ax, ay, ax + 3, ay + 2, hex('#c8303a'));
        const pg = bx + 8, py = by + 30; for (let k = 0; k < 3; k++) { R.rect(pg - 4 + k, py - k * 5, pg + 4 - k, py - k * 5 + 1, hex('#a83a2a')); R.rect(pg - 2 + k, py - k * 5 + 2, pg + 2 - k, py - k * 5 + 4, hex('#c8a060')); } R.pset(pg, py - 15, hex('#a83a2a'));
        const b = Math.round(Math.abs(Math.sin(t * 5)) * 2); R.icono('?', ax - 14, by + 6 - b, hex('#c8303a'), hex('#5a1a1a'), 2); } } }
};

const efectos = [[1.45, 'papel'], [P2 - 0.5, 'toc'], [ancla + 0.2, 'chof'], [sale + 0.1, 'ola'], [enorme, 'brillo'], [calma + 0.1, 'aldea'], [gio, 'golpecito'], [ruta, 'pop'], [china, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1524', efectos, año: 1524 });
''')

E['ny-lenapes'] = ('Los lenapes', '''// NY-LENAPES (frases 3–4), 1524. Cuatro planos:
// 1. la cámara de popa de noche: Verrazzano escribe su carta a la luz de la vela; sella la carta en «France» (sello);
//    el farol se mece, el gato duerme en el banco; por las ventanas, la luna y una canoa con antorcha que pasa en
//    «Lenape»; corta en «paddle»;
// 2. la bahía de día: las canoas salen del poblado y de la playa hacia el bote; en «greet them» las de delante paran y
//    saludan con las palas en alto; los lenapes de la canoa de cerca levantan los brazos en «colorful feathers» y
//    Verrazzano saluda desde el bote; corta en «But»;
// 3. el bote de cerca: el viento del mar dobla los árboles de la orilla («strong wind», ráfaga), salta la espuma por la
//    proa; Verrazzano señala la nao en «Verrazzano hurries back» y los marineros reman fuerte; las canoas vuelven a la
//    orilla; corta en «sails»;
// 4. el mar al atardecer con la costa lejana: La Dauphine leva anclas y se va con las velas hinchadas; Verrazzano mira
//    atrás desde la popa, triste en «regret»; en «never knowing» la sombra dorada de los rascacielos de hoy asoma un
//    momento sobre la costa y se desvanece.''', H + BOTE + r'''
const A = (f) => en('canoas', f), B = (f) => en('viento', f);
const P2 = A(0.488), P3 = B(0), P4 = B(0.51);
const escribe = A(0.04), francia = A(0.205), lenape = A(0.343), saludan = A(0.681), plumas = A(0.867);
const racha = B(0.066), vuelve = B(0.299), barco = B(0.457), pena = B(0.672), nunca = B(0.811), detras = B(0.923);

// 1 · la cámara de popa, de noche
const VEN = [[46, 24, 108, 84], [129, 24, 191, 84], [212, 24, 274, 84]];
const camara = fijo(() => {
  const tb = pal('#5a3a22', '#6a4628', '#7a5432', '#4a2e1a');
  for (let x = 0; x < 320; x++) for (let y = 0; y < 180; y++) { const p = Math.floor(x / 9), c = tb[(p * 7) % 3]; R.pset(x, y, x % 9 === 0 ? tb[3] : hh(p, y >> 3, 1) < 0.1 && (x + y) % 5 === 0 ? tb[3] : c); }
  for (let y = 0; y < 180; y += 22) for (let x = 4; x < 320; x += 9) R.pset(x, y + 6, hex('#2a1a10'));
  // las vigas del techo
  R.rect(0, 0, 319, 4, hex('#3a2416')); for (const x of [0, 80, 160, 240]) { R.rect(x, 0, x + 12, 14, hex('#3a2416')); R.rect(x + 1, 0, x + 11, 12, hex('#5a3a22')); R.rect(x + 1, 12, x + 11, 13, hex('#2a1a10')); }
  R.rect(0, 14, 319, 18, hex('#3a2416')); R.rect(0, 15, 319, 16, hex('#6a4628'));
  // los marcos de las ventanas de popa y el banco con cojines rojos
  for (const [x0, y0, x1, y1] of VEN) { R.rect(x0 - 4, y0 - 4, x1 + 4, y1 + 4, hex('#2a1a10')); R.rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, hex('#8a6038')); R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, hex('#3a2416')); R.rect(x0 - 3, y0 - 3, x1 + 3, y0 - 3, hex('#b08050')); }
  R.rect(30, 90, 290, 110, hex('#2a1a10')); R.rect(31, 91, 289, 109, hex('#6a4628')); for (let x = 31; x < 289; x += 26) R.rect(x, 96, x + 1, 109, hex('#4a2e1a'));
  R.rect(34, 88, 286, 94, hex('#2a1a10')); R.rect(35, 88, 285, 92, hex('#a83030')); R.rect(35, 88, 285, 88, hex('#d84a4a')); for (let x = 40; x < 285; x += 22) R.pset(x, 90, hex('#e8c040'));
  // las estanterías: libros, un globo y un reloj de arena a la derecha; capa colgada y cartas enrolladas a la izquierda
  const SY = 22; R.rect(284, 40 + SY, 319, 42 + SY, hex('#2a1a10')); R.rect(284, 64 + SY, 319, 66 + SY, hex('#2a1a10')); R.rect(284, 40 + SY, 285, 66 + SY, hex('#2a1a10'));
  const lib = pal('#8a2a2a', '#2a4a7a', '#3a6a3a', '#a8782a', '#5a2a5a');
  for (let k = 0; k < 6; k++) { const x = 288 + k * 5, h0 = 12 + (k % 3) * 2; R.rect(x, 40 + SY - h0, x + 4, 39 + SY, K); R.rect(x + 1, 41 + SY - h0, x + 3, 39 + SY, lib[k % 5]); R.pset(x + 2, 43 + SY - h0, hex('#e8c040')); }
  R.disco(306, 56 + SY, 7, K); R.disco(306, 56 + SY, 6, hex('#5a8aa8')); R.rect(303, 52 + SY, 307, 55 + SY, hex('#a8885a')); R.rect(305, 57 + SY, 310, 60 + SY, hex('#a8885a')); R.rect(305, 63 + SY, 307, 64 + SY, hex('#c8a040'));
  R.rect(290, 62 + SY, 296, 63 + SY, hex('#c8a040')); R.poligono([[291, 50 + SY], [295, 50 + SY], [293, 56 + SY]], hex('#e8dcc0')); R.poligono([[291, 62 + SY], [295, 62 + SY], [293, 56 + SY]], hex('#e8dcc0')); R.rect(290, 49 + SY, 296, 49 + SY, hex('#c8a040'));
  for (let k = 0; k < 3; k++) { R.rect(288 + k * 9, 102, 295 + k * 9, 108, K); R.rect(289 + k * 9, 103, 294 + k * 9, 107, k === 1 ? hex('#3a5a3a') : hex('#7a4a2a')); }
  R.rect(6, 22, 8, 26, hex('#2a1a10')); R.poligono([[2, 26], [14, 26], [20, 70], [-4, 70]], hex('#2a3a5a')); R.poligono([[4, 28], [12, 28], [16, 66], [2, 66]], hex('#3a4a6a'));
  for (let k = 0; k < 3; k++) { R.rect(22 + k * 6, 112 - 30, 26 + k * 6, 112 - 2, K); R.rect(23 + k * 6, 112 - 29, 25 + k * 6, 112 - 3, hex('#e8d8b0')); R.rect(22 + k * 6, 112 - 31, 26 + k * 6, 112 - 30, hex('#c8a040')); }
  // el suelo de tablas y la alfombra
  for (let y = 136; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 136) / 5); R.pset(x, y, (y - 136) % 5 === 0 ? hex('#3a2416') : ((x + fila * 37) % 48 === 0 ? hex('#3a2416') : hh(x >> 3, fila, 2) < 0.2 ? hex('#7a5432') : hex('#6a4628'))); }
  R.poligono([[70, 150], [250, 150], [270, 176], [50, 176]], hex('#6a2a2a')); R.poligono([[76, 152], [244, 152], [262, 174], [58, 174]], hex('#8a3a32'));
  for (let x = 70; x < 252; x += 6) R.rect(x, 162, x + 2, 163, hex('#c8a040'));
  // la silla del capitán, alta, de terciopelo
  R.rect(140, 92, 166, 130, K); R.rect(141, 93, 165, 130, hex('#4a2e1a')); R.rect(144, 96, 162, 128, hex('#7a2a3a')); R.rect(145, 97, 150, 127, hex('#9a3a48')); R.disco(141, 92, 2, hex('#c8a040')); R.disco(165, 92, 2, hex('#c8a040'));
});
// la mesa por delante del capitán: tablero de roble con la carta, el mapa, el astrolabio, el tintero y la vela
const mesa = fijo(() => {
  R.poligono([[84, 116], [244, 116], [254, 132], [74, 132]], K); R.poligono([[86, 117], [242, 117], [251, 131], [77, 131]], hex('#8a5a32'));
  for (let y = 118; y < 131; y += 3) R.linea(80, y, 248, y, hex('#7a4e2a'));
  R.rect(74, 132, 254, 140, K); R.rect(75, 133, 253, 139, hex('#6a4426')); for (let x = 80; x < 250; x += 12) { R.rect(x, 135, x + 6, 137, hex('#5a3a20')); R.pset(x + 3, 136, hex('#c8a040')); }
  for (const x of [82, 240]) { R.rect(x, 140, x + 8, 168, K); R.rect(x + 1, 140, x + 7, 167, hex('#6a4426')); R.rect(x + 2, 140, x + 3, 167, hex('#8a5a32')); R.rect(x - 1, 150, x + 9, 153, K); R.rect(x, 151, x + 8, 152, hex('#8a5a32')); }
  R.rect(76, 168, 252, 171, hex('#2a1a10'));
  // el mapa con la costa y el compás de puntas
  R.poligono([[186, 118], [236, 118], [240, 129], [182, 129]], hex('#e2cfa0')); R.poligono([[188, 119], [234, 119], [237, 128], [185, 128]], hex('#f2e6c4'));
  for (let y = 119; y < 128; y++) R.pset(210 + Math.round(Math.sin(y * 0.8) * 3), y, hex('#7a5a3a')); for (let x = 213; x < 235; x += 3) R.pset(x + (x % 2), 122 + (x % 3), hex('#8ab0b8'));
  R.linea(196, 121, 200, 127, K); R.linea(196, 121, 203, 126, K); R.pset(196, 120, hex('#c8a040'));
  // el astrolabio de latón, de pie en su soporte
  R.disco(226, 108, 7, K); R.disco(226, 108, 6, hex('#c8a040')); R.disco(226, 108, 4, hex('#8a6a20')); R.disco(226, 108, 3, hex('#c8a040')); R.linea(221, 104, 231, 112, hex('#5a4010')); R.pset(224, 106, hex('#f8e8a0')); R.rect(224, 115, 228, 118, hex('#8a6a20')); R.rect(225, 100, 227, 101, hex('#8a6a20'));
  // el tintero y la barra de lacre
  R.rect(118, 113, 126, 121, K); R.rect(119, 114, 125, 120, hex('#2a2a3a')); R.rect(120, 114, 121, 117, hex('#5a5a7a')); R.rect(119, 112, 125, 113, hex('#c8a040'));
  R.rect(170, 124, 178, 125, hex('#c8303a')); R.pset(178, 124, hex('#f0a0a0'));
});
const p1 = (t) => {
  R.copiar(camara());
  // por las ventanas: la noche, la luna, la costa con las hogueras y la canoa con antorcha (recortado a cada hueco)
  const mece = Math.round(Math.sin(t * 0.9) * 2);
  for (const [x0, y0, x1, y1] of VEN) { R.recorte([x0, y0, x1, y1]);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const hor = 62 + mece; let c;
      if (y < hor) c = um(x, y) < (y - y0) / 50 ? hex('#26306a') : hex('#1a1f4a'); else if (y < hor + 4 && (x < 180 || x > 230)) c = hex('#141a30'); else c = um(x, y) < 0.5 ? hex('#1e2c52') : hex('#24365e');
      R.pset(x, y, c); }
    for (let k = 0; k < 14; k++) { const sx = x0 + Math.round(hh(k, x0, 1) * (x1 - x0)), sy = y0 + Math.round(hh(k, x0, 2) * 30); if (Math.sin(t * 3 + k * 2) > -0.3) R.pset(sx, sy, hex('#f0f0ff')); }
    if (x0 === 129) { R.disco(160, 38 + mece, 6, hex('#f4f0d8')); R.disco(162, 36 + mece, 2, hex('#d8d2b8')); for (let y = 66 + mece; y < y1; y += 2) { const w = 2 + Math.round(Math.sin(t * 4 + y) * 2); R.linea(160 - w, y, 160 + w, y, hex('#d8d8b0')); } }
    for (const fx of [70, 96, 240]) if (fx > x0 && fx < x1) { R.pset(fx, 63 + mece, Math.sin(t * 9 + fx) > 0 ? hex('#ffb040') : hex('#ff7020')); R.pset(fx, 64 + mece, hex('#c84a20')); }
    const u = tramo(t, lenape - 0.4, P2 + 0.4); if (u > 0 && u < 1) { const cx = Math.round(lerp(280, 40, u)), cy = 74 + mece; R.linea(cx - 9, cy, cx + 9, cy, hex('#0a0c18')); R.linea(cx - 8, cy + 1, cx + 8, cy + 1, hex('#0a0c18'));
      for (const dx of [-4, 3]) { R.linea(cx + dx, cy - 1, cx + dx, cy - 4, hex('#0a0c18')); R.pset(cx + dx, cy - 5, hex('#0a0c18')); R.pset(cx + dx + 1, cy - 6, hex('#3e9ad4')); }
      R.linea(cx + 8, cy - 1, cx + 8, cy - 6, hex('#3a2a1a')); R.pset(cx + 8, cy - 7, Math.sin(t * 12) > 0 ? hex('#ffd060') : hex('#ff8030')); R.pset(cx + 8, cy - 8, hex('#ff6020'));
      for (let k = 0; k < 8; k++) if (cy + 2 + k <= y1) R.pset(cx + 8 + Math.round(Math.sin(t * 5 + k) * 1.5), cy + 2 + k, hex('#c87830')); }
    R.recorte(null);
    // los emplomados de rombos
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if ((x - x0 + y - y0) % 10 === 0 || (x - x0 - (y - y0) + 200) % 10 === 0) R.pset(x, y, hex('#2a2a2a'));
    R.rect(Math.round((x0 + x1) / 2) - 1, y0, Math.round((x0 + x1) / 2), y1, hex('#3a2416')); R.rect(x0, Math.round((y0 + y1) / 2), x1, Math.round((y0 + y1) / 2) + 1, hex('#3a2416')); }
  // el gato del barco duerme en el banco y levanta la cabeza cuando pasa la canoa
  { const x = 66, y = 87, mira = t > lenape && t < P2 + 1, cola = Math.round(Math.sin(t * 3) * 2), ga = hex('#d87a2a'), gS = hex('#a8541a');
    R.rect(x - 7, y - 4, x + 6, y, K); R.rect(x - 6, y - 3, x + 5, y - 1, ga); R.rect(x - 6, y - 1, x + 5, y - 1, gS); for (let i = -5; i < 5; i += 3) R.pset(x + i, y - 3, gS);
    const hy = mira ? y - 8 : y - 5; R.rect(x + 3, hy, x + 9, hy + 4, K); R.rect(x + 4, hy + 1, x + 8, hy + 3, ga); R.pset(x + 4, hy - 1, K); R.pset(x + 8, hy - 1, K); R.pset(x + 6, hy + 2, mira ? hex('#40c040') : gS);
    R.linea(x - 7, y - 1, x - 11, y - 3 + cola, K); R.linea(x - 7, y - 2, x - 10, y - 4 + cola, ga); }
  // el farol que cuelga y se mece con el barco
  { const a = Math.sin(t * 1.1) * 0.18, lx = Math.round(250 + Math.sin(a) * 26), ly = Math.round(18 + Math.cos(a) * 26); R.linea(250, 18, lx, ly - 4, hex('#2a1a10'));
    R.rect(lx - 4, ly - 4, lx + 4, ly + 6, K); R.rect(lx - 3, ly - 3, lx + 3, ly + 5, hex('#f0c060')); R.rect(lx - 1, ly - 1, lx + 1, ly + 3, hex('#fff0b0')); R.rect(lx - 5, ly - 5, lx + 5, ly - 4, hex('#5a4a2a')); R.rect(lx - 3, ly + 6, lx + 3, ly + 7, hex('#5a4a2a')); }
  // Verrazzano en su silla: escribe, sella la carta en «France» y se vuelve a la ventana
  const sella = t > francia - 0.25 && t < francia + 0.45, mira = t > lenape - 0.1;
  const qx = 144 + ((t - escribe) * 9) % 22, qy = 118 + Math.round(Math.sin(t * 14) * 1);
  const v = R.actor(EL.verrazzano, 146, 124, t, { dir: mira ? -1 : 1, sostiene: mira ? undefined : sella ? [174, francia - t > 0 ? 112 : 117] : [Math.round(qx), qy], sonrisa: mira, sorpresa: t > lenape - 0.1 && t < lenape + 0.4 });
  pegar(mesa());
  // la carta: renglones que crecen a medida que escribe, y el sello rojo
  { R.poligono([[136, 119], [172, 119], [174, 130], [134, 130]], hex('#c8b890')); R.poligono([[137, 120], [171, 120], [172, 129], [135, 129]], hex('#f6eed8'));
    const renglones = Math.min(4, Math.floor(tramo(t, 0, francia - 0.3) * 4.99)); for (let r = 0; r < 4; r++) { const lleno = r < renglones ? 30 : r === renglones ? Math.round(((t - escribe) * 9) % 22) + 8 : 0; for (let k = 0; k < lleno; k++) if (hh(k, r, 3) < 0.75) R.pset(139 + k, 122 + r * 2, hex('#3a3050')); }
    if (t > francia) { R.disco(165, 127, 2, hex('#a82020')); R.pset(164, 126, hex('#e85050')); } }
  if (!mira && !sella) { const [hx, hy] = v.mano; R.linea(hx, hy, hx + 5, hy - 8, BL); R.linea(hx + 1, hy - 1, hx + 6, hy - 8, hex('#c8c0b0')); R.pset(hx + 6, hy - 9, BL); R.pset(hx - 1, hy + 1, K); }
  if (sella) { const [hx, hy] = v.mano; R.rect(hx - 1, hy - 6, hx + 1, hy, hex('#8a6a20')); R.rect(hx - 2, hy, hx + 2, hy + 1, hex('#c8a040')); }
  // la vela: llama que tiembla y luz cálida alrededor
  { const fl = Math.sin(t * 13) * 0.6 + Math.sin(t * 7.3) * 0.4, cx = 104, cy = 98; R.rect(101, 113, 107, 116, hex('#8a6a20')); R.rect(103, 104, 105, 113, hex('#f4ecd8')); R.pset(103, 104, hex('#d8d0b8'));
    R.disco(cx, cy + 2, 2, hex('#ff9030')); R.rect(cx - 1, cy - 2 + Math.round(fl), cx + 1, cy + 2, hex('#ffd060')); R.pset(cx, cy - 3 + Math.round(fl), hex('#fff0a0'));
    const Bf = R.buf, r0 = 74 + fl * 3; for (let y = Math.max(0, cy - 74); y < Math.min(180, cy + 74); y++) for (let x = Math.max(0, cx - 74); x < Math.min(320, cx + 74); x++) { const d = Math.hypot(x - cx, (y - cy) * 1.1); if (d < r0 && um(x, y) < (1 - d / r0) * 0.9) Bf[y * 320 + x] = mez(Bf[y * 320 + x], hex('#ffcf70'), 0.22); } }
};

// 2 · la bahía: las canoas salen a recibirlos
const p2 = (t) => {
  T.bahia1524(R, t, { encuadre: 'bahia', viento: 0.15 });
  // canoas lejanas que salen del poblado
  for (let k = 0; k < 6; k++) { const u = tramo(t, P2 - 1 + k * 0.35, saludan + 0.8 + k * 0.2), x = Math.round(lerp(116 + (k % 2) * 8, 150 + k * 22, suave(u))), y = Math.round(lerp(104 + k * 2, 112 + (k % 3) * 4, u)); T.canoa(R, x, y, t, { s: 0.45 + k * 0.03, n: 2, dir: 1, fase: k, rema: u < 1 }); }
  // canoas de en medio que llegan junto al bote y paran con las palas en alto
  for (let k = 0; k < 3; k++) { const u = tramo(t, P2 + k * 0.4, saludan + k * 0.3), x = Math.round(lerp(128 + k * 6, [214, 168, 226][k], suave(u))), y = [124, 136, 140][k]; T.canoa(R, x, y, t, { s: 0.8 + k * 0.1, n: 2 + (k % 2), dir: 1, fase: k * 2, rema: u < 1, alterna: k === 1 }); }
  // el bote de Verrazzano a la derecha, quieto, con los dos marineros
  const by = 156, bx = 262;
  const r1 = remero(EL.marinero2, bx - 2, by + 1, t, { dir: -1, quieto: true }), saluda = t > plumas - 0.3;
  const v = R.actor(EL.verrazzano, bx - 22, by - 1, t, { dir: -1, dedo: t > saludan, sonrisa: t > saludan, sorpresa: t > P2 + 0.3 && t < saludan });
  R.actor(EL.marinero, bx + 12, by + 1, t, { dir: -1, brazos: saluda, sonrisa: saluda });
  casco(bx, by, t, { s: 1.15, dir: -1 });
  remo(bx + 2, by - 9, bx - 2, by - 5, by + 1, t, 3);
  // la canoa de cerca: sale de la playa con dos lenapes que reman y, al llegar, saludan con los brazos en alto
  const u = tramo(t, P2 - 0.2, saludan - 0.1), cx = Math.round(lerp(118, 196, suave(u))), cy = 168, rema = u > 0 && u < 1, alza = t > plumas - 0.15;
  const fase = t * 6, pal1 = rema ? [cx - 22 + Math.round(Math.cos(fase) * 4), cy - 8 + Math.round(Math.sin(fase) * 2)] : true;
  const l1 = R.actor(EL.lenape, cx - 30, cy + 2, t, { dir: 1, sostiene: alza ? undefined : pal1, brazos: alza, sonrisa: t > saludan });
  const l2 = R.actor(EL.lenape2, cx + 2, cy + 2, t, { dir: 1, sostiene: alza ? undefined : rema ? [cx + 10 + Math.round(Math.cos(fase + 3) * 4), cy - 8 + Math.round(Math.sin(fase + 3) * 2)] : true, brazos: alza, sonrisa: t > saludan });
  T.canoa(R, cx, cy, t, { n: 0, s: 1.9, dir: 1, rema });
  if (!alza) for (const l of [l1, l2]) { const [hx, hy] = l.mano, ex = hx - 3, ey = rema ? cy + 3 : hy - 10; R.linea(hx, hy - 2, ex, ey, hex('#5a3a1e')); R.linea(hx + 1, hy - 2, ex + 1, ey, hex('#8a5a32')); R.rect(ex - 1, ey - 1, ex + 2, ey + 3, hex('#8a5a32')); R.rect(ex - 1, ey + 3, ex + 2, ey + 3, hex('#5a3a1e')); }
};

// 3 · el bote de cerca, con el viento: los árboles se doblan, la espuma salta y reman de vuelta a la nao
const fondo3 = fijo(() => {
  banda(0, 66, pal('#5a6e8e', '#64789a', '#7084a2', '#8090aa', '#94a2b4', '#a8b4c0'));
  for (let x = 0; x < 320; x++) { const s = 56 + Math.round(Math.sin(x * 0.04 + 1) * 4 + Math.sin(x * 0.13) * 1.5); for (let y = s; y <= 72; y++) R.pset(x, y, um(x, y) < 0.5 ? hex('#6a7e98') : hex('#607490')); }
  for (let x = 0; x < 320; x++) for (let y = 72; y <= 108; y++) R.pset(x, y, hh(x >> 1, y >> 1, 8) < 0.3 ? hex('#2a4a30') : hex('#1e3a26'));
  for (let x = 0; x < 320; x++) for (let y = 104; y <= 112; y++) R.pset(x, y, y === 104 ? hex('#a89870') : hh(x, y, 9) < 0.15 ? hex('#a89070') : hex('#c8b488'));
  banda(113, 179, pal('#7894a8', '#6a889e', '#5c7a92', '#4e6c86', '#42607a', '#38546e'));
});
const p3 = (t) => {
  R.copiar(fondo3());
  const w = 0.25 + 0.75 * tramo(t, racha - 0.3, racha + 0.4) * (0.82 + 0.18 * Math.sin(t * 5));
  nubes(t * (1 + w * 5), [[0, 22, 50, 6], [140, 12, 64, 4], [240, 40, 36, 9]], pal('#4a5a72', '#7a8aa0', '#a8b4c4'));
  // los árboles de la orilla que se doblan con el viento (troncos, copas de tres tonos y hojas que vuelan)
  const g = pal('#1e3a26', '#2c5032', '#3e6a3c', '#5a8a48', '#7aa858');
  for (let fila = 0; fila < 2; fila++) for (let k = 0; k < (fila ? 24 : 34); k++) {
    const sem = k + fila * 50, x = Math.round(k * (fila ? 14 : 9.6) + hh(sem, 1, 30) * 8 - 4), base = fila ? 106 : 92, esc = fila ? 1 : 0.62, hT = Math.round((16 + hh(sem, 2, 30) * 18) * esc + (fila ? 6 : 0)), sw = w * (fila ? 12 : 6) * (0.8 + 0.25 * Math.sin(t * 6 + k)) * (hT / 30);
    const tn = (c) => fila ? c : mez(c, hex('#6a7e98'), 0.35), pino = hh(sem, 4, 30) < 0.25;
    for (let j = 0; j < hT; j++) { const f = j / hT, xx = Math.round(x - sw * f * f); R.pset(xx, base - j, tn(hex('#3a2a1a'))); if (fila) R.pset(xx + 1, base - j, tn(hex('#5a4030'))); }
    const cx = Math.round(x - sw), cy = base - hT, r = Math.round((5 + hh(sem, 3, 30) * 3) * esc);
    if (pino) { for (let k2 = 0; k2 < 3; k2++) { const yy = cy + k2 * r, ww = r - 1 + k2 * 2, dx = Math.round(sw * 0.2 * (1 - k2 / 3)); R.poligono([[cx - dx, yy - r], [cx - ww - dx, yy + 2], [cx + ww - dx, yy + 2]], tn(g[0])); R.poligono([[cx - dx, yy - r + 1], [cx - ww + 2 - dx, yy + 1], [cx - dx, yy + 1]], tn(g[2])); } continue; }
    R.disco(cx, cy, r + 1, tn(g[0])); R.disco(cx + 3, cy + 2, r - 1, tn(g[0])); R.disco(cx - 1, cy - 1, r, tn(g[1])); R.disco(cx - 2, cy - 2, r - 2, tn(g[2])); R.disco(cx - 3, cy - 3, Math.max(1, r - 4), tn(g[3]));
    if (hh(sem, 5, 30) < 0.25) for (let q = 0; q < 4; q++) R.pset(cx - 3 + Math.round(hh(sem, q, 31) * 7), cy - 3 + Math.round(hh(sem, q, 32) * 6), hh(sem, 6, 30) < 0.5 ? hex('#f0e8f0') : hex('#e88ab8')); }
  // matas y troncos varados en la playa
  for (let k = 0; k < 12; k++) { const x = 6 + k * 27 + Math.round(hh(k, 1, 33) * 10); R.disco(x, 106, 3, g[1]); R.disco(x - 1, 105, 2, g[3]); }
  for (const x of [60, 206]) { R.rect(x, 109, x + 18, 111, hex('#6a5a44')); R.rect(x, 109, x + 18, 109, hex('#9a8a6a')); R.disco(x, 110, 2, hex('#5a4a34')); }
  for (let k = 0; k < 30; k++) { const v = 60 + (k % 4) * 20, x = Math.round(330 - ((k * 53 + t * v * (0.4 + w)) % 360)), y = Math.round(60 + (k * 29) % 70 + Math.sin(t * 4 + k) * 4); if (w > 0.4) { R.pset(x, y, k % 3 ? hex('#5a8a48') : hex('#a8b848')); R.pset(x + 1, y + (k & 1), hex('#3e6a3c')); } }
  // las canoas vuelven a la orilla
  for (let k = 0; k < 3; k++) T.canoa(R, Math.round(lerp(150 + k * 50, 60 + k * 50, tramo(t, P3, P4 + 0.4))), 117 + k * 2, t, { s: 0.55, n: 2, dir: -1, fase: k });
  olas(t, 114, 179, 70 + Math.round(w * 50), hex('#e8f0f4'), hex('#2e4a62'), -20 - w * 40, 51);
  // La Dauphine fondeada a la derecha (fuera de la zona de Atom)
  const d = T.dauphine(R, 312, 166, t, { s: 1.6, dir: -1, ancla: true, viento: 1 });
  // el bote: Verrazzano señala la nao; los dos marineros reman cada vez más fuerte
  const u = tramo(t, P3, P4 + 0.4), bx = Math.round(lerp(86, 168, u)), by = 164, vel = 5 + 5 * tramo(t, racha, vuelve), señala = t > vuelve;
  const v = R.actor(EL.verrazzano, bx - 32, by - 2, t, { dir: 1, dedo: señala, sorpresa: t > racha - 0.6 && t < vuelve, enfado: t > barco });
  const r1 = remero(EL.marinero, bx - 8, by + 1, t, { dir: -1, vel, enfado: t > racha }), r2 = remero(EL.marinero2, bx + 8, by + 1, t, { dir: -1, vel, f0: 0.4, sorpresa: t > racha && t < vuelve });
  const c = casco(bx, by, t, { s: 1.45, dir: 1 });
  remo(r1.mano[0], r1.mano[1], r1.px, c.borda, by + 1, t, 4); remo(r2.mano[0], r2.mano[1], r2.px, c.borda, by + 1, t, 5);
  // la espuma que salta por la proa con cada ráfaga
  const sp = (t * 1.3) % 1; if (w > 0.5 && sp < 0.5) for (let k = 0; k < 14; k++) { const a = hh(k, Math.floor(t * 1.3), 6), x = bx + 30 - Math.round(sp * 30 * a), y = by - 6 - Math.round(Math.sin(sp * Math.PI * 2) * 10 * a); R.pset(x, y, hex('#f4f8fa')); R.pset(x + 1, y + 1, hex('#c4d8e2')); }
};

// 4 · el mar al atardecer: La Dauphine se va; la ciudad que no llegará a ver
const TAR = pal('#33488c', '#465698', '#6462a2', '#8c6ea2', '#b87c98', '#dc928a', '#f0ac82', '#f8c890');
const fondo4 = fijo(() => {
  banda(0, 96, TAR);
  R.disco(60, 88, 11, hex('#fce0a0')); R.disco(60, 88, 9, hex('#fff0c8'));
  for (let x = 0; x < 320; x++) { const s = x < 196 ? 84 + Math.round(Math.sin(x * 0.05) * 3 + Math.sin(x * 0.17) * 1.2 + (x > 150 ? (x - 150) * 0.25 : 0)) : 97; for (let y = s; y <= 97; y++) R.pset(x, y, y === s ? hex('#a86a7a') : hh(x >> 1, y >> 1, 2) < 0.25 ? hex('#4e3e5e') : hh(x, y, 4) < 0.1 ? hex('#2e2240') : hex('#3a2c4a')); }
  for (let k = 0; k < 60; k++) { const x = Math.round(hh(k, 1, 90) * 190), s = 84 + Math.round(Math.sin(x * 0.05) * 3 + Math.sin(x * 0.17) * 1.2 + (x > 150 ? (x - 150) * 0.25 : 0)), r = 2 + Math.round(hh(k, 2, 90) * 2); if (s > 95) continue; R.disco(x, s, r, hex('#3a2c4a')); R.pset(x - 1, s - r, hex('#a86a7a')); R.pset(x, s - r, hex('#c8828a')); }
  for (let x = 0; x < 196; x++) if (hh(x, 9, 91) < 0.5) R.pset(x, 98, hex('#e8a888'));
  banda(98, 179, pal('#e8a888', '#c88a8a', '#9a7090', '#7a5a88', '#5e4a7a', '#4a3c6a'));
});
const p4 = (t) => {
  R.copiar(fondo4());
  nubes(t, [[30, 30, 50, 0.6], [190, 20, 70, 0.4], [280, 60, 30, 1]], pal('#8a5a7a', '#e89a8a', '#fcd0a0'));
  // el camino de luz del sol en el agua
  for (let k = 0; k < 40; k++) { const y = 99 + Math.round(hh(k, 1, 61) ** 1.5 * 78), L = 2 + Math.round((y - 98) / 12), x = 60 + Math.round((hh(k, 2, 61) - 0.5) * (8 + (y - 98) * 0.9)); if (Math.sin(t * 3 + k * 1.7) > 0) R.rect(x - L, y, x + L, y, k % 3 ? hex('#ffd890') : hex('#fff0c0')); }
  olas(t, 99, 179, 80, hex('#f0b89a'), hex('#3a2c5a'), 8, 71);
  // el humo de las hogueras del poblado, doblado por el viento
  for (const [hx, hy] of [[112, 86], [138, 90]]) for (let k = 0; k < 20; k++) { const x = hx + Math.round(k * 1.4 + Math.sin(t * 1.5 + k * 0.4) * 1.2), y = hy - k; if (um(x, y) < 0.7 - k * 0.03) R.pset(x, y, hex('#b8a0b0')); }
  // la ciudad que no verá: la sombra dorada de los rascacielos sobre la costa, un momento
  const g = 0.6 * tramo(t, nunca - 0.1, nunca + 0.7) * (1 - tramo(t, detras + 0.3, detras + 1.1));
  if (g > 0) { const oro = hex('#f8d890'), oroS = hex('#e8b870'); for (let k = 0; k < 16; k++) { const x0 = 12 + k * 10 + Math.round(hh(k, 1, 81) * 4), w = 6 + Math.round(hh(k, 2, 81) * 4), top = 88 - Math.round(12 + hh(k, 3, 81) * 34 + (k === 7 ? 18 : 0));
      for (let y = top; y < 92; y++) for (let x = x0; x < x0 + w; x++) if (um(x, y) < g) R.pset(x, y, (x === x0 || ((y - top) % 4 === 1 && (x - x0) % 2)) ? oroS : oro);
      if (k === 7) for (let y = top - 10; y < top; y++) if (um(x0 + 3, y) < g) R.pset(x0 + 3, y, oro); } }
  aves(t, 3, 50, 76, 13, 6);
  // La Dauphine leva anclas, suelta las velas y se va mar adentro, cada vez más pequeña
  const leva = suave(tramo(t, P4 + 0.1, P4 + 1.6)), va = suave(tramo(t, P4 + 1.0, E.duracion + 0.5)), s = lerp(1.8, 1.3, va);
  const d = T.dauphine(R, Math.round(lerp(140, 200, va)), 144, t, { s, dir: 1, viento: 0.9, leva, avanza: leva > 0.6 });
  // Verrazzano en la popa, mirando atrás, a la costa
  R.actor(EL.verrazzano, d.popa[0] - 4, d.castillo, t, { dir: -1, triste: t > pena - 0.3, dedo: t > P4 + 0.3 && t < pena - 0.5 });
  d.delante();
};

const efectos = [[escribe + 0.1, 'lapiz'], [francia, 'sello'], [lenape + 0.1, 'miau'], [P2 + 0.3, 'chof'], [saludan, 'aldea'], [plumas, 'palmada'], [racha, 'rafaga'], [racha + 1.2, 'ola'], [vuelve + 0.3, 'chof'], [P4 + 0.2, 'cuelga'], [P4 + 1.6, 'viento'], [nunca, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1524 });
''')

E['ny-pregunta'] = ('La pregunta', '''// NY-PREGUNTA (frases 5–6), de 1524 a hoy. Cuatro planos:
// 1. el plano antiguo de la bahía: la ruta de puntos del bote entra por el estrecho; el círculo del puerto se dibuja en
//    «best natural harbors» y cae la chincheta en la isla larga en «long»; corta en «hilly»;
// 2. Manhattan desde el aire, virgen: colinas, bosque y marismas; en «would grow» la cuadrícula de calles avanza de sur
//    a norte, salen las casas, los puentes y las torres, y el parque se queda verde (la barra del año sube a 2026);
//    canoas y luego ferris por los ríos; corta en «Today»;
// 3. la calle de hoy con todas las épocas: la gente que pasa; «8,000,000» sale en «8 million»; resaltan la piedra en
//    «stone» y el cristal en «glass»; corta en «how»;
// 4. desde el mirador de una torre, entre nubes: la ciudad se vuelve bosque y marisma en «forests and marshes» y vuelve
//    en «become New York City» (la turista hace la foto, flash); la «?» grande en «City?» y una sobre cada edificio
//    distinto en «why do its buildings look the way they do»; el niño señala.''', H + r'''
const A = (f) => en('puerto', f), B = (f) => en('hoy', f);
const P2 = A(0.5216), P3 = B(0), P4 = B(0.44);
const puerto = A(0.20), larga = A(0.43), crece = A(0.744), famosa = A(0.832);
const millones = B(0.058), piedra = B(0.308), cristal = B(0.343), bosques = B(0.543), ciudad = B(0.667), pregunta = B(0.7336), porque = B(0.815), edif = B(0.855);

// 1 · el plano de la bahía
const p1 = (t) => {
  const P = T.mapaNY(R, t, { vista: 'bahia', puerto: suave(tramo(t, puerto - 0.3, puerto + 0.9)) });
  const S = P.sitios ?? {}, e = S.estrecho ?? [166, 158], m = S.bahiaArriba ?? [140, 136], p = S.punta ?? [147, 120], ma = S.manhattan ?? [170, 66];
  // la ruta del bote, de puntos, que entra por el estrecho
  const u = tramo(t, 0.2, puerto + 0.6), pts = [e, m, p]; let quedan = u * 2;
  for (let i = 0; i < 2 && quedan > 0; i++) { const f = Math.min(1, quedan); quedan -= 1; const [ax, ay] = pts[i], [bx, by] = pts[i + 1], L = Math.hypot(bx - ax, by - ay); for (let k = 0; k <= L * f; k++) if (k % 4 < 2) R.pset(Math.round(ax + (bx - ax) * k / L), Math.round(ay + (by - ay) * k / L), hex('#2a4a8a')); }
  { const i = Math.min(1, Math.floor(u * 2)), f = Math.min(1, u * 2 - i), [ax, ay] = pts[i], [bx, by] = pts[i + 1], x = Math.round(ax + (bx - ax) * f), y = Math.round(ay + (by - ay) * f);
    R.rect(x - 3, y, x + 3, y + 1, hex('#5e3a1e')); R.pset(x - 1, y - 1, hex('#7a2a3a')); R.pset(x + 1, y - 1, hex('#c8bc9a')); R.pset(x + 2 + Math.round(Math.sin(t * 7)), y + 2, hex('#5e3a1e')); }
  T.chincheta(R, Math.round(ma[0]), Math.round(ma[1]) + 6, t, hex('#c8303a'), { baja: tramo(t, larga - 0.25, larga + 0.15), pulso: true });
};

// 2 · Manhattan desde el aire: de bosque a ciudad
const SX = 40, SY = 152, AX = 262, AY = -104, AL2 = AX * AX + AY * AY, NL = Math.sqrt(AL2), NX = -AY / NL, NY = AX / NL;
const geo = (x, y) => { const vx = x - SX, vy = y - SY, a = (vx * AX + vy * AY) / AL2, p = (vx * -AY + vy * AX) / NL; return [a, p]; };
const ancho = (a) => (a < 0.06 ? 3 + a / 0.06 * 10 : 13 + 3 * Math.sin(a * 9) + 1.5 * Math.sin(a * 41)) * (a > 0.9 ? Math.max(0.25, (1 - a) / 0.1) : 1);
const TIPO = new Uint8Array(320 * 180), AA = new Float32Array(320 * 180), PP = new Float32Array(320 * 180);
const aire = fijo(() => {
  const agua = pal('#4a7aa0', '#55869e', '#3e6e94'), bos = pal('#2c5032', '#3e6a3c', '#5a8a48', '#22402a'), mar = pal('#7a8a52', '#8a9a5a');
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const [a, p] = geo(x, y), w = ancho(a), i = y * 320 + x; AA[i] = a; PP[i] = p; let tipo;
    if (a > 0 && a < 1 && Math.abs(p) < w) tipo = 1; else if (p < -w - 30 - Math.max(0, -a) * 40 || (a < 0 && p < -50)) tipo = 2; else if (p > w + 13 && a > 0.0) tipo = 3; else tipo = 0; TIPO[i] = tipo;
    let c; if (tipo === 0) { c = agua[um(x, y) < 0.5 ? 0 : 1]; if (hh(x >> 2, y, 7) < 0.06) c = hex('#8ab4cc'); }
    else { const e = Math.sin(a * 37 + p * 0.2) * 0.5 + Math.sin(a * 13 + 1) * 0.5, n = hh(x >> 1, y >> 1, tipo), borde = tipo === 1 && Math.abs(p) > w - 2.5;
      c = borde && hh(x, y, 9) < 0.6 ? mar[n < 0.5 ? 0 : 1] : bos[3]; if (tipo === 2 && p > -w - 34) c = hh(x, y, 5) < 0.5 ? hex('#8a8478') : hex('#6a645a'); }
    // la bruma del horizonte
    if (y < 40) c = mez(c, hex('#c8d8e4'), Math.min(1, (40 - y) / 22)); if (y < 18) c = um(x, y) < (18 - y) / 18 ? hex('#d8e4ec') : hex('#c8d8e4');
    R.pset(x, y, c); }
  // las copas del bosque: discos de tres tonos, más claros en las lomas
  for (let j = 0; j < 62; j++) for (let i = 0; i < 112; i++) { const cx = Math.round(i * 2.9 + hh(i, j, 60) * 3), cy = Math.round(30 + j * 2.4 + hh(i, j, 61) * 2); if (cx > 319 || cy > 179) continue; const k = cy * 320 + cx; if (!TIPO[k]) continue; if (TIPO[k] === 2 && PP[k] > -ancho(AA[k]) - 34) continue; if (TIPO[k] === 1 && Math.abs(PP[k]) > ancho(AA[k]) - 2.5) continue;
    const loma = hh(cx >> 4, cy >> 4, 64) * 0.55 + hh(cx >> 3, cy >> 3, 65) * 0.45, r = 1 + Math.round(hh(i, j, 62) * 1.4), bru = cy < 40 ? (40 - cy) / 22 : 0, tn = (c) => bru > 0 ? mez(c, hex('#c8d8e4'), Math.min(1, bru)) : c;
    R.disco(cx, cy, r + 1, tn(bos[0])); R.disco(cx - 1, cy - 1, r, tn(loma > 0.5 ? bos[2] : bos[1])); if (loma > 0.75) R.pset(cx - 1, cy - 2, tn(hex('#7aa858'))); if (hh(i, j, 63) < 0.03) R.pset(cx, cy - 1, tn(hex('#f0e8f0'))); }
});
// las torres: [a, p, alto, ancho, color]
const TORRES = [[0.03, -4, 30, 6, 0], [0.045, 5, 40, 5, 1], [0.06, -1, 52, 7, 2], [0.075, 6, 26, 5, 0], [0.09, -7, 34, 6, 1], [0.1, 2, 44, 5, 2], [0.12, -3, 22, 6, 0],
  [0.33, 4, 28, 6, 0], [0.36, -6, 36, 5, 1], [0.38, 1, 58, 6, 2], [0.4, 7, 30, 5, 0], [0.42, -2, 46, 6, 1], [0.44, 5, 40, 5, 2], [0.46, -7, 26, 6, 0], [0.48, 0, 34, 5, 1]];
const TC = [pal('#c8b8a0', '#a89880', '#e8dcc8'), pal('#8a96a2', '#5e6a76', '#c8d2dc'), pal('#6aa0b8', '#3e6a80', '#b8dcea')];
const p2 = (t) => {
  R.copiar(aire());
  const Bf = R.buf, g = 1.08 * tramo(t, crece - 0.3, famosa + 0.3), ca = 1.08 * tramo(t, crece + 0.2, famosa + 0.9);
  const calle = hex('#b8b4a8'), tejados = pal('#a84a34', '#7a4a3a', '#8a8a90', '#c86a4a', '#5e5e6a', '#d8d0bc'), solar = hex('#b8a070');
  if (g > 0) for (let y = 30; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (TIPO[i] !== 1) continue; const a = AA[i], p = PP[i]; if (a > g) continue;
    const parque = a > 0.52 && a < 0.7 && Math.abs(p) < ancho(a) - 4; if (parque) { if (a > g - 0.02) Bf[i] = hex('#7aa858'); continue; }
    const s = a * NL, q = p + 40, esCalle = s % 4.2 < 1 || q % 7 < 1;
    let c = esCalle ? calle : a < ca ? tejados[Math.floor(hh(Math.floor(s / 4.2), Math.floor(q / 7), 3) * 6)] : solar;
    if (!esCalle && a < ca && (s % 4.2 < 1.8) && (q % 7 < 2)) c = mez(c, BL, 0.35); if (a > g - 0.015) c = hex('#e8dcb8'); Bf[i] = c; }
  // los puentes sobre el río del este
  const pu = tramo(t, famosa - 0.2, famosa + 0.5);
  for (const [k, a0] of [[0, 0.07], [1, 0.15], [2, 0.29]]) { const f = tramo(pu, k * 0.2, 0.6 + k * 0.2); if (f <= 0) continue; const w = ancho(a0), L = 16 * f;
    const p0 = w - 1, X = (pp) => SX + a0 * AX + pp * NX, Y = (pp) => SY + a0 * AY + pp * NY;
    R.linea(Math.round(X(p0)), Math.round(Y(p0)), Math.round(X(p0 + L)), Math.round(Y(p0 + L)), hex('#5e6a76')); R.linea(Math.round(X(p0)), Math.round(Y(p0)) - 1, Math.round(X(p0 + L)), Math.round(Y(p0 + L)) - 1, hex('#c8d2dc'));
    for (const pt of [p0 + 4, p0 + 12]) if (pt < p0 + L) { R.rect(Math.round(X(pt)), Math.round(Y(pt)) - 5, Math.round(X(pt)) + 1, Math.round(Y(pt)), hex('#8a6a5a')); } }
  // las torres que suben, de las de atrás a las de delante
  const tor = TORRES.map(([a, p, hT, w, c], k) => [SX + a * AX + p * NX, SY + a * AY + p * NY, hT, w, c, k]).sort((m, n) => m[1] - n[1]);
  for (const [bx, by, hT, w, c, k] of tor) { const f = suave(tramo(t, famosa + 0.1 + (k % 7) * 0.12, famosa + 0.7 + (k % 7) * 0.12)); if (f <= 0) continue; const h = Math.round(hT * f), x0 = Math.round(bx - w / 2), y1 = Math.round(by), C3 = TC[c];
    R.rect(x0, y1 - h, x0 + w, y1, K); R.rect(x0 + 1, y1 - h + 1, x0 + w - 1, y1, C3[0]); R.rect(x0 + w - 1, y1 - h + 1, x0 + w + 2, y1 - 1, C3[1]); R.rect(x0 + w, y1 - h + 2, x0 + w + 2, y1 - h + 2, C3[2]); R.rect(x0 + 1, y1 - h + 1, x0 + w - 1, y1 - h + 1, C3[2]);
    for (let y = y1 - h + 3; y < y1 - 1; y += 2) for (let x = x0 + 2; x < x0 + w - 1; x += 2) if (hh(x, y, k) < 0.6) R.pset(x, y, c === 2 ? hex('#d8f0fa') : hex('#5a5a6a'));
    if (c === 2 && hT > 50) R.linea(x0 + Math.round(w / 2), y1 - h, x0 + Math.round(w / 2), y1 - h - Math.round(8 * f), hex('#c8d2dc')); }
  // barcas: canoas al principio, ferris y barcos después, por los dos ríos
  for (let k = 0; k < 5; k++) { const lado = k % 2 ? 1 : -1, a = ((k * 0.21 + t * 0.012 * (k % 3 + 1)) % 1), pp = lado * (ancho(a) + 7 + (k % 3) * 3), x = Math.round(SX + a * AX + pp * NX), y = Math.round(SY + a * AY + pp * NY);
    if (y < 34) continue; if (t < crece) { R.rect(x - 2, y, x + 2, y, hex('#5a3a1e')); R.pset(x, y - 1, hex('#e8b890')); } else { R.rect(x - 3, y - 1, x + 3, y + 1, k % 2 ? hex('#e8783a') : BL); R.rect(x - 2, y - 2, x + 1, y - 2, hex('#5e6a76')); R.pset(x - 5, y + 1, hex('#eef6f4')); R.pset(x - 7, y + 2, hex('#eef6f4')); } }
  // sombras de nubes que pasan sobre la isla y nubecillas por delante
  for (const [k, v] of [[0, 9], [1, 6]]) { const cx = ((k * 170 + t * v) % 420) - 50, cy = 90 + k * 40; for (let y = cy - 14; y < cy + 14; y++) for (let x = Math.round(cx - 30); x < cx + 30; x++) if (x >= 0 && x < 320 && y >= 30 && y < 180 && ((x - cx) / 30) ** 2 + ((y - cy) / 14) ** 2 < 1 && um(x, y) < 0.5) Bf[y * 320 + x] = mez(Bf[y * 320 + x], hex('#1a2a3a'), 0.25); }
  aves(t, 3, 60, 120, 5, 14);
  nubes(t, [[260, 150, 40, -14], [60, 168, 30, -18]], pal('#b8c8d8', '#e8f0f4', '#ffffff'));
};

// 3 · la calle de hoy, con todas las épocas y mucha gente
const p3 = (t) => {
  const res = t > piedra - 0.1 ? (t > cristal - 0.05 ? 4 : 3) : undefined;
  T.hoy(R, t, { encuadre: 'capas', resalta: res });
  // la gente que pasa (cada uno a lo suyo)
  const gente = [[EL.neoyorquino, 1, -20, 0.9], [EL.oficinista, -1, 330, 0.75], [EL.neoyorquina, 1, 20, 0.6], [EL.oficinista2, -1, 280, 0.95], [EL.neoyorquino2, 1, 60, 1.1]];
  gente.forEach(([def, dir, x0, v], k) => { const x = Math.round(x0 + dir * (t - P3) * 22 * v), y = 152 + (k % 2) * 3; if (x < -20 || x > 330) return; R.actor(def, x, y, t, { dir, anda: true, habla: k === 2 && Math.sin(t * 6) > 0, sonrisa: k === 4 }); });
  // la vecina que baja la escalinata de su brownstone y saluda
  { const u = tramo(t, P3 + 0.6, millones + 1.4), x = Math.round(lerp(122, 104, u)), y = Math.round(lerp(114, 141, u)); R.actor(EL.vecina ?? EL.neoyorquina, x, Math.min(152, y + (u >= 1 ? 11 : 0)), t, { dir: -1, anda: u > 0 && u < 1, dedo: t > piedra && t < cristal + 0.8, sonrisa: t > millones }); }
  // el cliente del carrito que recoge su perrito caliente
  { const r = R.actor(EL.emigrante ?? EL.neoyorquino, 158, 152, t, { dir: -1, sostiene: t > millones + 0.6 ? [154, 136] : undefined, sonrisa: t > millones + 0.6 }); if (t > millones + 0.6) { const [hx, hy] = r.mano; R.rect(hx - 4, hy - 2, hx + 1, hy, hex('#e8b060')); R.rect(hx - 3, hy - 2, hx, hy - 2, hex('#c8402a')); } }
  // «8,000,000» en «8 million»
  const e = tramo(t, millones - 0.05, millones + 0.3), sa = 1 - tramo(t, piedra - 0.5, piedra - 0.1);
  if (e > 0 && sa > 0) R.numero('8,000,000', 160, Math.round(lerp(62, 50, e)), { tam: 16, centro: true });
};

// 4 · el mirador entre las nubes: la ciudad, el bosque que fue y las preguntas
const cielo4 = fijo(() => {
  banda(0, 56, pal('#5a94d0', '#6aa2d8', '#7eb0de', '#96c0e4', '#b4d2ea', '#cfe0ec'));
  // el agua del puerto y los dos ríos, al fondo
  for (let y = 46; y < 140; y++) for (let x = 0; x < 320; x++) R.pset(x, y, um(x, y) < 0.5 ? hex('#7ea4bc') : hex('#8cb0c6'));
  for (let x = 0; x < 320; x++) { const s = 44 + Math.round(Math.sin(x * 0.05) * 1.5); for (let y = s; y < 48; y++) R.pset(x, y, hex('#a8bccb')); }
  for (let y = 48; y < 140; y++) { const w = 60 + (y - 48) * 1.5, x0 = Math.round(160 - w), x1 = Math.round(160 + w); for (let x = x0 - 40; x < x0; x++) if (x >= 0) R.pset(x, y, mez(hex('#8a96a0'), hex('#c8d4dc'), Math.max(0, (70 - y) / 22))); for (let x = x1; x < x1 + 40; x++) if (x < 320) R.pset(x, y, mez(hex('#8a9690'), hex('#c8d4dc'), Math.max(0, (70 - y) / 22))); }
});
// la ciudad: filas de edificios con su azotea, de atrás a delante; los tres distintos van aparte
const ciudad4 = fijo(() => {
  const fila = (y0, n, hMax, k0, bru) => { for (let k = 0; k < n; k++) { const w = 6 + Math.round(hh(k, 1, k0) * 8), x = Math.round(-10 + k * (340 / n) + hh(k, 2, k0) * 6), h = 6 + Math.round(hh(k, 3, k0) ** 2 * hMax), y1 = y0 + Math.round(hh(k, 4, k0) * 6);
      const tipo = hh(k, 5, k0), c0 = tipo < 0.35 ? hex('#c8a890') : tipo < 0.6 ? hex('#a86a54') : tipo < 0.82 ? hex('#a8b0b8') : hex('#7aa8bc');
      const c = mez(c0, hex('#c8d4dc'), bru), cS = mez(c, K, 0.3), cL = mez(c, BL, 0.35);
      R.rect(x, y1 - h, x + w, y1, mez(K, hex('#c8d4dc'), bru * 0.8)); R.rect(x + 1, y1 - h + 1, x + w - 1, y1, c); R.rect(x + w - 2, y1 - h + 1, x + w - 1, y1, cS); R.rect(x + 1, y1 - h + 1, x + w - 1, y1 - h + 2, cL);
      for (let y = y1 - h + 4; y < y1; y += 3) for (let xx = x + 2; xx < x + w - 2; xx += 2) R.pset(xx, y, mez(hex('#3a4a5a'), hex('#c8d4dc'), bru));
      if (bru < 0.3 && hh(k, 6, k0) < 0.4) { const tx = x + 2, ty = y1 - h; R.rect(tx, ty - 5, tx + 3, ty - 2, hex('#7a5a3a')); R.pset(tx, ty - 1, K); R.pset(tx + 3, ty - 1, K); R.rect(tx, ty - 6, tx + 3, ty - 6, hex('#5a3a24')); } } };
  fila(62, 40, 14, 1, 0.6); fila(78, 34, 22, 2, 0.4); fila(96, 30, 30, 3, 0.2); fila(118, 26, 34, 4, 0.05); fila(140, 22, 26, 5, 0);
});
// el bosque y las marismas de 1524 en el mismo sitio
const bosque4 = fijo(() => {
  const bos = pal('#2c5032', '#3e6a3c', '#5a8a48', '#22402a', '#7aa858');
  for (let y = 46; y < 140; y++) { const w = 26 + (y - 46) * 0.9, rio = 8 + (y - 46) * 0.25; for (let x = 0; x < 320; x++) { const d = Math.abs(x - 160) + Math.sin(y * 0.3) * 2; let c;
    if (d > w && d < w + rio) c = um(x, y) < 0.5 ? hex('#5a8aaa') : hex('#6a98b4'); else if (d > w - 3 && d <= w || (d >= w + rio && d < w + rio + 3)) c = hh(x, y, 4) < 0.5 ? hex('#8a9a5a') : hex('#a8b068'); else c = bos[3];
    R.pset(x, y, c); } }
  for (let j = 0; j < 46; j++) for (let i = 0; i < 110; i++) { const cx = Math.round(i * 3 + hh(i, j, 70) * 3), cy = Math.round(48 + j * 2.1 + hh(i, j, 71) * 2); if (cy > 139) continue; const c0 = R.pget(cx, cy); if (c0 !== bos[3]) continue;
    const loma = hh(cx >> 4, cy >> 4, 72) * 0.6 + hh(cx >> 3, cy >> 3, 73) * 0.4, r = cy < 70 ? 1 : 2; R.disco(cx, cy, r, bos[0]); R.disco(cx - 1, cy - 1, Math.max(1, r - 1), loma > 0.5 ? bos[2] : bos[1]); if (loma > 0.8) R.pset(cx - 1, cy - 2, bos[4]); if (hh(i, j, 74) < 0.025) R.pset(cx, cy - 1, hex('#f0e8f0')); }
  for (let y = 46; y < 90; y++) for (let x = 0; x < 320; x++) R.pset(x, y, mez(R.pget(x, y), hex('#c8d4dc'), Math.max(0, (90 - y) / 52)));
});
// los tres edificios distintos (la tarta de boda, la aguja y la caja de cristal): [x, y base, ...]
const heroes = () => {
  // la tarta de boda en escalones
  const pt = hex('#d8c8a8'), ptS = hex('#a89878'), ptL = hex('#f0e4c8');
  [[60, 30, 128, 36], [64, 22, 92, 30], [67, 16, 72, 22], [70, 10, 56, 16]].forEach(([x, w, yb, h]) => { R.rect(x - 1, yb - h - 1, x + w + 1, yb, K); R.rect(x, yb - h, x + w, yb, pt); R.rect(x + w - 3, yb - h, x + w, yb, ptS); R.rect(x, yb - h, x + w, yb - h, ptL); for (let y = yb - h + 3; y < yb; y += 3) for (let xx = x + 2; xx < x + w - 3; xx += 2) R.pset(xx, y, hex('#5a5a6a')); });
  // la aguja art déco
  const ac = hex('#c8ccd4'), acS = hex('#8a909c'); R.rect(207, 50, 229, 130, K); R.rect(208, 51, 228, 130, ac); R.rect(224, 51, 228, 130, acS); for (let y = 54; y < 130; y += 3) for (let x = 210; x < 223; x += 2) R.pset(x, y, hex('#4a4a5a'));
  for (let k = 0; k < 4; k++) { const w = 9 - k * 2, y = 50 - k * 6; R.poligono([[218 - w, y], [218, y - 8], [218 + w, y]], K); R.poligono([[219 - w, y - 1], [218, y - 7], [217 + w, y - 1]], hex('#e0e4ec')); for (let x = 218 - w + 2; x < 218 + w - 1; x += 3) R.pset(x, y - 2, hex('#3a3a4a')); }
  R.linea(218, 26, 218, 18, hex('#e0e4ec')); R.pset(218, 17, BL);
  // la caja de cristal
  const cr = hex('#6aa0b8'), crS = hex('#3e6a80'), crL = hex('#b8dcea'); R.rect(245, 62, 271, 136, K); R.rect(246, 63, 270, 136, cr); R.rect(265, 63, 270, 136, crS); for (let y = 66; y < 136; y += 3) R.linea(246, y, 264, y, crS); for (let k = 0; k < 6; k++) R.linea(248 + k * 3, 64 + k * 10, 252 + k * 3, 64 + k * 10, crL);
};
const mirador = fijo(() => {
  // el pretil de piedra art déco y el suelo del mirador
  R.rect(0, 140, 319, 152, K); for (let x = 0; x < 320; x++) for (let y = 141; y < 152; y++) R.pset(x, y, y === 141 ? hex('#ece6d6') : y > 149 ? hex('#a89e88') : hh(x >> 1, y, 2) < 0.1 ? hex('#c8bea8') : hex('#d8d0bc'));
  for (let x = 6; x < 320; x += 16) { R.poligono([[x, 151], [x + 4, 144], [x + 8, 151]], hex('#b0a890')); R.poligono([[x + 1, 151], [x + 4, 146], [x + 7, 151]], hex('#ece6d6')); }
  for (let x = 0; x < 320; x += 8) { R.rect(x, 126, x, 140, hex('#5e6a76')); } R.rect(0, 125, 319, 126, hex('#8a96a2')); R.rect(0, 124, 319, 124, hex('#c8d2dc'));
  for (let y = 153; y < 180; y++) for (let x = 0; x < 320; x++) { const t0 = ((x >> 4) + ((y - 153) >> 3)) & 1; R.pset(x, y, (x % 16 === 0 || (y - 153) % 8 === 0) ? hex('#7a7468') : t0 ? hex('#b8b0a0') : hex('#a8a090')); }
  // una papelera y una maceta con su arbusto
  R.rect(286, 150, 298, 172, K); R.rect(287, 151, 297, 171, hex('#3a4a5a')); for (let x = 288; x < 297; x += 2) R.rect(x, 152, x, 170, hex('#5a6a7a'));
  R.rect(14, 156, 34, 172, K); R.rect(15, 157, 33, 171, hex('#a86a54')); R.disco(24, 150, 10, hex('#2c5032')); R.disco(22, 148, 8, hex('#3e6a3c')); R.disco(20, 146, 4, hex('#5a8a48'));
});
const p4 = (t) => {
  R.copiar(cielo4());
  nubes(t, [[30, 20, 40, 1.2], [200, 30, 50, 0.7]], pal('#b8c8d8', '#e8f0f4', '#ffffff'));
  const Bf = R.buf, cb = ciudad4(), bb = bosque4(), f = tramo(t, bosques - 0.3, bosques + 0.6) * (1 - tramo(t, ciudad - 0.1, ciudad + 0.8));
  for (let y = 18; y < 140; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x, c = cb[i]; if (c) Bf[i] = c; if (f > 0 && bb[i] && um(x, y) < f) Bf[i] = bb[i]; }
  if (f < 0.6) { heroes(); if (f > 0) for (let y = 10; y < 140; y++) for (let x = 50; x < 280; x++) if (um(x, y) < f) { const i = y * 320 + x; if (bb[i]) Bf[i] = bb[i]; else if (y < 56) Bf[i] = cielo4()[i]; } }
  // taxis por la calle de abajo y nubes que pasan por delante de la ciudad
  if (f < 0.5) for (let k = 0; k < 6; k++) { const x = Math.round(((k * 61 + t * (14 + k * 3)) % 340) - 10), y = 134 + (k % 2) * 3; R.rect(x, y, x + 3, y + 1, hex('#e8c030')); R.pset(x + 4, y + 1, hex('#fff0a0')); }
  nubes(t, [[80, 96, 44, -6], [300, 76, 36, -9], [180, 112, 30, -12]], pal('#c8d4e0', '#eef4f8', '#ffffff'));
  pegar(mirador());
  // la paloma del pretil, que picotea y se va
  { const x = 150 + Math.round(Math.sin(t * 0.7) * 6), y = 140, p = Math.sin(t * 9) > 0.6; R.rect(x - 2, y - 3, x + 2, y - 1, hex('#8a8a9a')); R.rect(x + 2, y - (p ? 3 : 5), x + 3, y - (p ? 2 : 4), hex('#6a6a7a')); R.pset(x + 3, y - (p ? 3 : 5), K); R.pset(x - 3, y - 2, hex('#5a5a6a')); R.pset(x, y, hex('#e8783a')); }
  // la turista que hace la foto (flash) y el niño que se asombra y señala
  const foto = t > pregunta - 0.6;
  const tu = R.actor(EL.neoyorquina, 92, 172, t, { dir: 1, sostiene: foto ? [114, 150] : undefined, sonrisa: t > ciudad, sorpresa: f > 0.5 });
  if (foto) { const [hx, hy] = tu.mano; R.rect(hx - 1, hy - 5, hx + 4, hy, K); R.rect(hx, hy - 4, hx + 3, hy - 1, hex('#3a3a4a')); R.pset(hx + 3, hy - 4, hex('#8ad0f0')); if (t > pregunta && t < pregunta + 0.25) { for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; R.linea(hx + 2, hy - 3, Math.round(hx + 2 + Math.cos(a) * 8), Math.round(hy - 3 + Math.sin(a) * 8), BL); } R.disco(hx + 2, hy - 3, 3, BL); } }
  const ni = tramo(t, P4 + 0.2, bosques - 0.4);
  R.actor(EL.neoyorquino2, Math.round(lerp(330, 200, ni)), 174, t, { dir: -1, anda: ni > 0 && ni < 1, sorpresa: f > 0.4, dedo: t > porque - 0.1, salto: t > edif + 0.6 && t < edif + 1.0 ? 3 : 0 });
  R.actor(EL.neoyorquino, 240, 166, t, { dir: -1, habla: t > porque && Math.sin(t * 7) > 0 });
  // las preguntas: la grande en «City?» y una sobre cada edificio distinto
  const q = (x, y, t0, esc) => { const e = tramo(t, t0, t0 + 0.2); if (e <= 0) return; const b = Math.round(Math.abs(Math.sin((t - t0) * 4)) * 2) - Math.round((1 - e) * 6); R.icono('?', x, y - b, hex('#e8b830'), hex('#3a2a10'), esc); };
  q(116, 26, pregunta - 0.1, 3); q(74, 40, edif - 0.1, 2); q(213, 2 + 24, B(0.885), 2); q(254, 44, B(0.928), 2);
};

const año = (t) => t < crece - 0.3 ? 1524 : t < P3 ? Math.round(lerp(1524, 2026, tramo(t, crece - 0.3, P3 - 0.4))) : 2026;
const efectos = [[0.3, 'papel'], [puerto, 'brillo'], [larga + 0.1, 'toc'], [crece, 'maquina'], [famosa + 0.3, 'whoosh'], [millones, 'pop'], [piedra, 'golpecito'], [cristal, 'brillo'], [bosques, 'viento'], [pregunta, 'flash'], [edif, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')

E['ny-hola'] = ('Hola', '''// NY-HOLA (frase 7), hoy. Un plano: el muelle del bajo Manhattan por la tarde, con el perfil de la ciudad; el ferry
// naranja cruza el río; un niño mira por los prismáticos de moneda, da un respingo en «Atom» y señala arriba, a Atom;
// una vecina echa migas a las palomas; un corredor pasa por delante; en «Let's find out» el niño da un salto y echa a
// correr hacia la ciudad.''', H + r'''
const A = (f) => en('hola', f);
const atom = A(0.037), vamos = A(0.797);
const p1 = (t) => {
  T.hoy(R, t, { encuadre: 'muelle', luz: 'tarde', ferry: Math.round(lerp(300, 40, t / E.duracion)) });
  // las palomas que picotean las migas
  for (let k = 0; k < 4; k++) { const x = 168 + k * 9 + Math.round(Math.sin(t * 0.8 + k) * 3), y = 164 + (k % 2) * 3, p = Math.sin(t * 8 + k * 2) > 0.5; R.rect(x - 2, y - 3, x + 2, y - 1, hex('#8a8a9a')); R.rect(x - 1, y - 2, x + 1, y - 2, hex('#a8a8b8')); R.rect(x + 2, y - (p ? 3 : 5), x + 3, y - (p ? 2 : 4), hex('#6a6a7a')); R.pset(x + 3, y - (p ? 3 : 5), K); R.pset(x - 3, y - 2, hex('#5a5a6a')); R.pset(x, y, hex('#e8783a')); }
  // las migas que caen de la mano de la vecina
  const ve = R.actor(EL.neoyorquina, 196, 162, t, { dir: -1, sostiene: [188, 146 + Math.round(Math.sin(t * 3) * 2)], sonrisa: true });
  for (let k = 0; k < 5; k++) { const f = ((t * 0.9 + k / 5) % 1), x = ve.mano[0] - 2 + (k % 3) - 1, y = Math.round(ve.mano[1] + f * 18); R.pset(x, y, hex('#e8d8a8')); }
  // el niño de los prismáticos
  const salta = t > vamos && t < vamos + 0.5, corre = tramo(t, vamos + 0.4, E.duracion);
  const nx = Math.round(lerp(46, 150, corre));
  R.actor(EL.neoyorquino2, nx, 160, t, { dir: 1, salto: salta ? 4 : t > atom - 0.05 && t < atom + 0.25 ? 2 : 0, sorpresa: t > atom - 0.05 && t < A(0.3), dedo: t > atom + 0.2 && t < vamos, sonrisa: t >= A(0.3), anda: corre > 0 && corre < 1 });
  // el corredor que pasa por delante
  const c = tramo(t, A(0.18), A(0.95)); R.actor(EL.neoyorquino, Math.round(lerp(330, -24, c)), 172, t, { dir: -1, anda: c > 0 && c < 1 });
};
const efectos = [[atom, 'brillo'], [A(0.18), 'ola'], [vamos + 0.05, 'boing']];
T.rodar(E, R, [[0, p1]], { efectos, año: 2026 });
''')
