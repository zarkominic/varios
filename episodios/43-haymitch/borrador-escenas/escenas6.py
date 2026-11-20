E = {}

E['hm-arena'] = ('La arena', '''// HM-ARENA (frases 20–23), Juegos 50, sin cartela. 14 planos:
// 1. el prado de la arena: Haymitch entra y se queda maravillado («beautiful»); Atom le sigue volando;
// 2. INSERTO el arroyo de cerca: la mano hunde el vaso; en «poison» el agua se vuelve violeta y Atom avisa; en «even the
//    water» lo vuelca;  3. las flores de cerca: toca la flor y sale el polen violeta; baja el paracaídas plateado
//    («what the Capitol sends») y lo coge;  4. la mesa de Snow de cerca: huele la rosa, sonríe en «wants» y en «owe» se
//    abre el cofre de lo que le deben; en la mesa, el paracaídas plateado en miniatura;  5. la maqueta en su cúpula: Atom rodea la luz dorada de
//    Wyatt, la moneda de las apuestas gira y la luz se apaga en «dies»;  6. el borde de la maqueta de cerca: sale polen
//    violeta de las flores de maqueta y otra luz dorada se apaga en «pollen»;  7. el mapa, el 12 de cerca: de cuatro chinchetas doradas
//    se apagan dos («only two») y saltan las figuritas de Haymitch y Maysilee;  8. INSERTO el suelo del bosque: la mano de
//    Ampert da el paquete en «explosive» y se retira;  9. el depósito: Haymitch baja solo por la escalera y ata la carga;
// 10. la tubería: el pedernal de Lenore Dove saca chispas, arde la mecha, Haymitch se va y el agua revienta («flood»);
// 11. la consola: los engranajes tiemblan con la alarma y en «keep running» siguen girando;  12. el bosque: Maysilee
//    en la rama con la cerbatana en la mano; el matorral se agita, escapan los pájaros, ella le llama y él la mira;  13. INSERTO las
//    manos se estrechan en «ally»; la de Haymitch coge un piñón en «noticed» y lo echa al aire;  14. el borde de lado: lanza el piñón, choca
//    con el campo invisible y vuelve a sus pies («throws back… mirror that bounces»). Último plano: hm-borde lo congela.''', r'''
const AT = T.AT, K = hex('#1a1424');
const lin = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (a, b, u) => { const A = [a & 255, (a >> 8) & 255, (a >> 16) & 255], B = [b & 255, (b >> 8) & 255, (b >> 16) & 255]; const c = A.map((v, i) => Math.round(v + (B[i] - v) * u)); return (0xff000000 | (c[2] << 16) | (c[1] << 8) | c[0]) >>> 0; };
const tono = (x, y, c, u) => { x = Math.round(x); y = Math.round(y); if (x < 0 || y < 0 || x > 319 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c, u)); };
const halo = (cx, cy, r, c, a) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d < 1) tono(cx + i, cy + j, c, a * (1 - d) * (1 - d)); } };
// las capas fijas de los insertos, en su búfer (se pintan una vez)
const CAPAS = {};
const capa = (k, f) => { if (!CAPAS[k]) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); CAPAS[k] = b; } R.copiar(CAPAS[k]); };
const MANGA_H = '#7a8aa0', MANGA_M = '#e88aa8', MANGA_A = '#6a7a72';
// ── piezas pequeñas que no están en el decorado ──
// el vaso de hojalata (vuelca: 0 derecho, 1 tumbado hacia la derecha); agua: color del agua dentro
const vaso = (x, y, vuelca, agua) => {
  const G = hex('#a8b0bc'), GL = hex('#e4e8f0'), GS = hex('#6a7280');
  if (vuelca < 0.5) {
    R.rect(x - 4, y - 9, x + 4, y, K); R.rect(x - 3, y - 8, x + 3, y - 1, G); R.rect(x - 3, y - 8, x - 2, y - 1, GL); R.rect(x + 2, y - 8, x + 3, y - 1, GS);
    R.rect(x - 3, y - 8, x + 3, y - 7, agua); R.pset(x - 1, y - 8, hex('#ffffff'));
    R.rect(x + 5, y - 7, x + 6, y - 3, K); R.pset(x + 5, y - 6, G); R.pset(x + 5, y - 5, G); R.pset(x + 5, y - 4, G);
  } else {
    R.rect(x - 2, y - 7, x + 8, y + 1, K); R.rect(x - 1, y - 6, x + 7, y, G); R.rect(x - 1, y - 6, x + 7, y - 5, GL); R.rect(x - 1, y - 1, x + 7, y, GS);
    R.rect(x + 7, y - 6, x + 8, y, agua); R.rect(x - 3, y - 5, x - 2, y - 2, K);
  }
};
// el paquete de Ampert: tres cartuchos envueltos en papel pardo, atados con cordel y con el cable de cobre enrollado
const paquete = (x, y, s = 1) => {
  const P1 = hex('#c89a5a'), P2 = hex('#9a6e3a'), P3 = hex('#e8c48a'), W = hex('#c8603a');
  const r = (a, b, c, d, col) => R.rect(Math.round(x + a * s), Math.round(y + b * s), Math.round(x + c * s), Math.round(y + d * s), col);
  r(-8, -7, 8, 5, K); r(-7, -6, 7, 4, P1);
  for (let i = -1; i <= 1; i++) { r(i * 5 - 2, -6, i * 5 + 2, 4, P1); r(i * 5 - 2, -6, i * 5 - 1, 4, P3); r(i * 5 + 2, -6, i * 5 + 2, 4, P2); }
  r(-7, -2, 7, -1, hex('#e8e0c8')); r(-7, -1, 7, -1, hex('#a89a7a'));
  for (let k = 0; k < 6; k++) R.pset(Math.round(x + (8 + Math.cos(k) * 2) * s), Math.round(y + (-6 - k * 0.6) * s), W);
  r(8, -8, 9, -7, hex('#e8b830'));
};
// el pedernal de Lenore Dove: la piedra gris y el eslabón de acero, con una plumita de colores atada
const pedernal = (x, y, t) => {
  R.rect(x - 3, y - 2, x + 2, y + 2, K); R.rect(x - 2, y - 1, x + 1, y + 1, hex('#8a8e96')); R.pset(x - 2, y - 1, hex('#c8ccd4'));
  R.rect(x + 2, y - 4, x + 6, y - 3, K); R.rect(x + 3, y - 4, x + 5, y - 4, hex('#c8ccd4'));
  const f = Math.round(Math.sin(t * 6) * 1);
  R.pset(x - 4, y - 3 + f, hex('#e8483a')); R.pset(x - 5, y - 4 + f, hex('#f0c840')); R.pset(x - 6, y - 5 + f, hex('#3a8ad8'));
};
// la cerbatana de Maysilee: un tubo fino de caña (len px), de la mano hacia dir
const cerbatana = (x, y, dir, len, inclina) => {
  const x1 = x + dir * len, y1 = y + inclina;
  R.linea(x, y - 1, x1, y1 - 1, K); R.linea(x, y + 1, x1, y1 + 1, K); R.linea(x, y, x1, y1, hex('#c8a85a'));
  R.pset(Math.round(x + dir * len * 0.5), Math.round(y + inclina * 0.5), hex('#8a6a30'));
};
// el piñón: escamas pardas
const pinon = (x, y, s = 1) => {
  const c = [hex('#5a3a1e'), hex('#8a5a2e'), hex('#b07a40')];
  for (let j = 0; j < 10 * s; j++) { const w = Math.round((3.2 - Math.abs(j - 4 * s) / (2.2 * s)) * s); for (let i = -w; i <= w; i++) R.pset(x + i, y - 5 * s + j, K); }
  for (let j = 1; j < 10 * s - 1; j++) { const w = Math.round((3.2 - Math.abs(j - 4 * s) / (2.2 * s)) * s) - 1; for (let i = -w; i <= w; i++) R.pset(x + i, y - 5 * s + j, c[(i + j * 2 + 9) % 3]); }
};
// una luz de tributo sobre la maqueta (encendida 1 → apagada 0)
const luzTributo = (x, y, t, on, c = hex('#ffd34a')) => {
  const lat = 0.85 + 0.15 * Math.sin(t * 5 + x);
  if (on > 0.02) { halo(x, y - 4, 11, c, 0.9 * on * lat); for (let j = 1; j < 16; j++) { tono(x, y - 3 - j, hex('#fff6c0'), 0.75 * on * (1 - j / 16)); tono(x - 1, y - 3 - j, c, 0.4 * on * (1 - j / 16)); tono(x + 1, y - 3 - j, c, 0.4 * on * (1 - j / 16)); } }
  R.disco(x, y, 4, K); R.disco(x, y, 3, mez(hex('#4a4a56'), c, on)); if (on > 0.5) { R.pset(x - 1, y - 1, hex('#ffffff')); R.pset(x, y - 2, hex('#fff6c0')); }
  else { R.pset(x - 1, y - 1, hex('#7a7a86')); }
};
const chispas = (x, y, t, u, n = 10) => { if (u <= 0 || u >= 1) return; for (let k = 0; k < n; k++) { const a = h(k, 3, 9) * 6.28, r = u * (6 + h(k, 4, 9) * 10); R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r - u * 4), k % 3 ? hex('#ffe08a') : hex('#ffffff')); } };

// ═══ PLANO 1 · el prado de la arena (general): Haymitch entra y se queda maravillado ═══
const p1 = (t) => {
  const g = T.arena50(R, t, { encuadre: 'prado', camara: 'general', luz: 'dia' });
  const u = tramo(t, 0.2, en('arena', 0.094)), x = Math.round(lerp(-18, 92, u)), mira = t > en('arena', 0.169) && t < en('arena', 0.202) ? -1 : 1;
  R.actor(EL.haymitch, x, g.suelo, t, { dir: mira, anda: u > 0 && u < 1, sorpresa: t > en('arena', 0.094) && t < en('arena', 0.150), sonrisa: t >= en('arena', 0.150) });
  const ax = lerp(-10, 128, tramo(t, 0.6, en('arena', 0.113))) + Math.sin(t * 1.3) * 6, ay = 112 + Math.sin(t * 2.1) * 3;
  T.arena50Delante(R, t, { encuadre: 'prado', camara: 'general', luz: 'dia' });
  AT.luciernaga(R, ax, ay, t, { dir: t > en('arena', 0.169) && t < en('arena', 0.202) ? -1 : 1, cara: t > en('arena', 0.094) ? 'sonrisa' : 'normal' });
};

// ═══ PLANO 2 · INSERTO: el arroyo de cerca; el agua del vaso se vuelve violeta (fondo local) ═══
// una piedra de orilla: irregular, con su luz, su sombra y musgo encima
const piedra = (x, y, r, sem) => {
  const pts = []; for (let k = 0; k < 9; k++) { const a = k / 9 * 6.28, rr = r * (0.75 + h(k, sem, 77) * 0.35); pts.push([Math.round(x + Math.cos(a) * rr * 1.3), Math.round(y + Math.sin(a) * rr * 0.8)]); }
  R.poligono(pts.map(([a, b]) => [a + 1, b + 1]), K); R.poligono(pts, hex('#6a6e76'));
  for (let j = -r; j <= r; j++) for (let i = -r * 1.3; i <= r * 1.3; i++) { const X = Math.round(x + i), Y = Math.round(y + j); if (R.pget(X, Y) === hex('#6a6e76')) R.pset(X, Y, i + j < -r * 0.6 ? hex('#9aa0a8') : i + j > r * 0.7 ? hex('#4a4e56') : (h(X, Y, sem) < 0.15 ? hex('#7a7e86') : hex('#6a6e76'))); }
  for (let i = -r; i <= r * 0.6; i++) { const X = Math.round(x + i), Y = Math.round(y - r * 0.7 + Math.abs(i) * 0.25); R.pset(X, Y, hex('#5aa03e')); if (h(i, sem) < 0.5) R.pset(X, Y - 1, hex('#7ac85a')); }
};
const fondoArroyo = () => {
  // la orilla de enfrente: el bosque en penumbra, troncos con corteza, helechos y frutos que relucen
  for (let y = 0; y < 60; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 1); R.pset(x, y, y < 38 ? (n < 0.5 ? hex('#1e3a2a') : hex('#24452e')) : (n < 0.45 ? hex('#2a5232') : hex('#335e38'))); }
  for (let k = 0; k < 30; k++) { const x = Math.floor(h(k, 31) * 320), y = 4 + Math.floor(h(k, 32) * 30); R.disco(x, y, 3 + (k % 3), k % 2 ? hex('#2e5a34') : hex('#1a3424')); }
  for (const [x0, w] of [[8, 14], [58, 10], [104, 18], [176, 12], [236, 16], [292, 12]]) {
    R.rect(x0, 0, x0 + w, 56, hex('#3a2a20')); R.rect(x0 + 1, 0, x0 + 3, 56, hex('#5a4030')); R.rect(x0 + w - 2, 0, x0 + w, 56, hex('#24180f'));
    for (let y = 2; y < 56; y += 5) R.linea(x0 + 4 + (y % 3), y, x0 + 5 + (y % 3), y + 3, hex('#2a1e16'));
    for (let k = 0; k < 4; k++) R.pset(x0 + 3 + Math.floor(h(k, x0) * (w - 4)), 10 + Math.floor(h(x0, k) * 40), hex('#6a8a4a'));
    R.poligono([[x0 - 3, 56], [x0 + w + 3, 56], [x0 + w, 50], [x0, 50]], hex('#3a2a20'));
  }
  for (let y = 0; y < 26; y++) for (let x = 0; x < 200; x++) if (y < 23 || h(x, y, 2) < (26 - y) / 4) R.pset(x, y, (x + y) % 5 === 0 ? hex('#24452e') : hex('#1e3a2a'));
  for (let k = 0; k < 16; k++) { const x = 180 + Math.floor(h(k, 1, 3) * 90), y = 24 + Math.floor(h(k, 2, 3) * 24); R.disco(x, y, 2, hex('#a83a8a')); R.pset(x - 1, y - 1, hex('#f08ad8')); }
  for (let x = 0; x < 320; x++) { const yb = 56 + Math.round(Math.sin(x * 0.07) * 3 + Math.sin(x * 0.23) * 1.5); for (let y = yb; y < yb + 9; y++) R.pset(x, y, y < yb + 2 ? hex('#5a9a3e') : h(x, y, 4) < 0.5 ? hex('#3e6e30') : hex('#4a5a40')); }
  for (let k = 0; k < 9; k++) { const x = 10 + k * 36 + Math.floor(h(k, 5) * 10); for (let j = 0; j < 6; j++) R.linea(x, 58, x - 8 + j * 3, 48 + Math.abs(j - 2.5) * 2, hex('#4a8a3a')); }
  for (let k = 0; k < 10; k++) piedra(16 + k * 32 + Math.floor(h(k, 7) * 12), 63 + Math.floor(h(k, 8) * 3), 3 + Math.floor(h(k, 9) * 3), k + 40);
  // el agua: honda en el centro, con piedras bajo el agua, las algas y los reflejos de los troncos
  for (let y = 66; y < 138; y++) for (let x = 0; x < 320; x++) { const d = 1 - Math.abs(y - 100) / 38, n = h(x >> 2, y >> 1, 6);
    R.pset(x, y, d > 0.55 ? (n < 0.5 ? hex('#1e5a6e') : hex('#226478')) : d > 0.25 ? (n < 0.5 ? hex('#2a7a86') : hex('#30848e')) : (n < 0.5 ? hex('#3a8a8a') : hex('#42948e'))); }
  for (let k = 0; k < 26; k++) { const x = Math.floor(h(k, 11) * 320), y = 72 + Math.floor(h(k, 12) * 62), r = 2 + Math.floor(h(k, 13) * 4); R.disco(x, y, r, hex('#3e7068')); R.disco(x - 1, y - 1, Math.max(1, r - 2), hex('#5a8a7a')); }
  for (let k = 0; k < 18; k++) { const x = Math.floor(h(k, 14) * 320), y = 112 + Math.floor(h(k, 15) * 22); for (let j = 0; j < 6; j++) R.pset(x + Math.round(Math.sin(j) * 1.5), y - j, hex('#2e6a4a')); }
  for (const [x0, w] of [[8, 14], [104, 18], [236, 16]]) for (let y = 68; y < 96; y++) if (y % 2) R.linea(x0 + 2, y, x0 + w - 2, y, hex('#1a4a58'));
  // la orilla de aquí: hierba, piedras con musgo, flores violetas, juncos y una seta rosa
  for (let x = 0; x < 320; x++) { const yb = 136 + Math.round(Math.sin(x * 0.05 + 1) * 3 + Math.sin(x * 0.19) * 2); for (let y = yb; y < 180; y++) R.pset(x, y, y < yb + 2 ? hex('#6ab04a') : h(x, y, 14) < 0.5 ? hex('#3e7a30') : hex('#4a8a36')); for (let y = yb - 1; y < yb + 1; y++) R.pset(x, y, hex('#2a5a4a')); }
  for (const [x, y, r] of [[20, 150, 8], [74, 162, 6], [236, 152, 9], [290, 166, 7], [196, 172, 5], [128, 174, 4]]) piedra(x, y, r, x);
  for (let k = 0; k < 60; k++) { const x = Math.floor(h(k, 18) * 320), y = 140 + Math.floor(h(k, 19) * 40); R.linea(x, y, x + (k % 3) - 1, y - 5, k % 2 ? hex('#8ad05a') : hex('#5aa03e')); }
  for (let k = 0; k < 14; k++) { const x = 6 + Math.floor(h(k, 20) * 300), y = 144 + Math.floor(h(k, 21) * 30); R.pset(x, y, hex('#c86ae8')); R.pset(x + 1, y, hex('#a84ad0')); R.pset(x - 1, y, hex('#a84ad0')); R.pset(x, y - 1, hex('#e8a8ff')); R.pset(x, y + 1, hex('#3a7a2e')); R.pset(x, y + 2, hex('#3a7a2e')); }
  for (const x0 of [44, 262]) for (let k = 0; k < 5; k++) { R.linea(x0 + k * 3, 146, x0 + k * 3 + (k % 2), 124 + k * 2, hex('#4a7a2e')); R.rect(x0 + k * 3, 124 + k * 2, x0 + k * 3 + 1, 128 + k * 2, hex('#7a5a30')); }
  R.rect(304, 160, 305, 168, hex('#e8dcc8')); R.disco(305, 158, 4, K); R.disco(305, 158, 3, hex('#e85aa8')); R.pset(304, 156, hex('#ffd0ec')); R.pset(307, 158, hex('#ffd0ec'));
};
const p2 = (t) => {
  capa('arroyo', fondoArroyo);
  // el agua que corre: rizos que avanzan y destellos que titilan
  for (let k = 0; k < 70; k++) { const y = 68 + Math.floor(h(k, 1, 21) * 68), x = ((h(k, 2, 21) * 360 + t * (18 + 14 * (1 - Math.abs(y - 100) / 38))) % 360) - 20, w = 4 + Math.floor(h(k, 3, 21) * 8);
    R.linea(Math.round(x), y, Math.round(x + w), y, hex('#6ab8c0')); if (k % 5 === 0) R.linea(Math.round(x + 2), y + 1, Math.round(x + w - 2), y + 1, hex('#1e5060')); }
  for (let k = 0; k < 44; k++) { const x = Math.floor(h(k, 4, 21) * 320), y = 68 + Math.floor(h(k, 5, 21) * 68); if (Math.sin(t * 5 + k * 1.7) > 0.7) { R.pset(x, y, hex('#ffffff')); R.pset(x - 1, y, hex('#c8f4ff')); R.pset(x + 1, y, hex('#c8f4ff')); R.pset(x, y - 1, hex('#c8f4ff')); } }
  const hx = ((t - 5.8) * 22 + 20) % 340 - 10, hy = 90 + Math.sin(t * 2) * 2; R.poligono([[hx, hy], [hx + 6, hy - 2], [hx + 9, hy + 1], [hx + 3, hy + 3]].map((p) => p.map(Math.round)), hex('#d89a3a')); R.linea(Math.round(hx + 1), Math.round(hy + 1), Math.round(hx + 8), Math.round(hy), hex('#8a5a20'));
  const dx = 250 + Math.sin(t * 0.9) * 40, dy = 44 + Math.sin(t * 1.7) * 8, ala = Math.floor(t * 20) % 2; R.linea(Math.round(dx - 5), Math.round(dy), Math.round(dx + 4), Math.round(dy), hex('#3ab8d8')); R.pset(Math.round(dx + 5), Math.round(dy), K);
  R.linea(Math.round(dx - 2), Math.round(dy - 2 - ala), Math.round(dx + 1), Math.round(dy - 1), hex('#e8f8ff')); R.linea(Math.round(dx - 2), Math.round(dy + 2 + ala), Math.round(dx + 1), Math.round(dy + 1), hex('#e8f8ff'));
  // el brazo de Haymitch entra desde abajo con el vaso, lo hunde en la orilla, lo sube; en «poison» el agua se vuelve violeta; en «even the water» lo vuelca
  const veneno = tramo(t, en('arena', 0.385), en('arena', 0.413)), vuelca = tramo(t, en('arena', 0.462), en('arena', 0.477));
  const baja = tramo(t, 5.9, en('arena', 0.282)), sube = tramo(t, en('arena', 0.315), en('arena', 0.352)), aparta = tramo(t, en('arena', 0.484), en('arena', 0.504));
  let wx = lerp(120, 150, baja), wy = lerp(196, 134, baja); wx = lerp(wx, 142, sube); wy = lerp(wy, 118, sube); wx = lerp(wx, 128, aparta); wy = lerp(wy, 132, aparta);
  const agua = mez(hex('#8ad8e8'), hex('#a83ad8'), veneno);
  const ani = lin(t, en('arena', 0.277), en('arena', 0.347)); if (ani > 0 && ani < 1) for (let r = 0; r < 3; r++) { const rr = ani * 24 - r * 6; if (rr > 0) for (let a = 0; a < 48; a++) { const x = 160 + Math.cos(a / 48 * 6.28) * rr, y = 132 + Math.sin(a / 48 * 6.28) * rr * 0.3; if (a % 2 && y < 137) tono(x, y, hex('#e8fbff'), 0.8 * (1 - ani)); } }
  if (veneno > 0) for (let k = 0; k < 16; k++) { const u = (t * 0.8 + h(k, 7, 21)) % 1, x = 30 + h(k, 8, 21) * 260, y = 134 - u * 64; if (y > 68) { R.disco(Math.round(x), Math.round(y), 1 + (k % 2), mez(hex('#2a7a86'), hex('#c86ae8'), veneno)); R.pset(Math.round(x) - 1, Math.round(y) - 1, hex('#f0c8ff')); } }
  if (vuelca > 0.5) for (let k = 0; k < 10; k++) { const u = (t * 3 + k / 10) % 1; R.disco(Math.round(wx + 15 + u * 2), Math.round(wy - 3 + u * 16), 1, hex('#b04ae0')); }
  T.brazo(R, Math.round(wx - 34), 214, Math.round(wx), Math.round(wy), MANGA_H, 1, { sombra: false });
  vaso(Math.round(wx + 8), Math.round(wy + 2), vuelca, agua);
  if (veneno > 0.2 && vuelca < 0.5) for (let k = 0; k < 3; k++) { const u = (t * 1.5 + k / 3) % 1; R.pset(Math.round(wx + 6 + k * 2), Math.round(wy - 8 - u * 6), hex('#e8a8ff')); }
  const ll = tramo(t, en('arena', 0.390), en('arena', 0.418)), ax = lerp(340, 190, ll) + Math.sin(t * 2) * 3, ay = 90 + Math.sin(t * 2.6) * 3;
  if (ll > 0) { AT.luciernaga(R, ax, ay, t, { dir: -1, cara: 'sorpresa' }); if (t > en('arena', 0.418) && t < en('arena', 0.488)) R.icono('!', Math.round(ax - 2), Math.round(ay - 28), hex('#ff5a5a'), K, 2); }
  else AT.luciernaga(R, 300 - (t - 5.8) * 4, 76 + Math.sin(t * 2.2) * 3, t, { dir: -1, brillo: 0.6 });
};

// ═══ PLANO 3 · las flores de cerca: el polen violeta; baja el paracaídas y Haymitch lo coge ═══
const p3 = (t) => {
  const po = tramo(t, en('arena', 0.523), en('arena', 0.620)), pa = Math.min(1, lin(t, en('arena', 0.643), en('arena', 0.725)) * 1.02);
  const o = { encuadre: 'prado', camara: 'flores', luz: 'dia', polen: po, paracaidas: t > en('arena', 0.641) ? pa : undefined };
  const g = T.arena50(R, t, o);
  const atras = tramo(t, en('arena', 0.533), en('arena', 0.559)), va = tramo(t, en('arena', 0.681), en('arena', 0.723));
  const x = Math.round(lerp(lerp(126, 98, atras), 210, va));
  const salto = t > en('arena', 0.533) && t < en('arena', 0.559) ? Math.round(Math.sin(lin(t, en('arena', 0.533), en('arena', 0.559)) * Math.PI) * 6) : 0;
  const toca = t > en('arena', 0.507) && t < en('arena', 0.533), mira = t > en('arena', 0.650);
  const bot = g.paracaidas, coge = bot && t > en('arena', 0.725);
  R.actor(EL.haymitch, x, g.suelo, t, { dir: t > en('arena', 0.533) && t < en('arena', 0.592) ? -1 : 1, anda: va > 0 && va < 1, salto,
    sostiene: toca ? [148, 152] : coge ? [bot[0] - 2, bot[1] - 2] : undefined, dedo: mira && t < en('arena', 0.678), sorpresa: (t > en('arena', 0.530) && t < en('arena', 0.601)) || (mira && t < en('arena', 0.681)), sonrisa: coge, triste: t >= en('arena', 0.601) && t < en('arena', 0.650) });
  if (t > en('arena', 0.545) && t < en('arena', 0.667)) { const k = Math.floor((t - en('arena', 0.545)) * 3) % 3; R.pset(x + 2 - k, g.suelo - 26 - k * 2, hex('#c88ae8')); R.pset(x + 4 - k, g.suelo - 28 - k * 2, hex('#e8c8ff')); }
  T.arena50Delante(R, t, o);
  // el destello plateado del paracaídas que baja (para que se lea a 640 px)
  if (bot && t < en('arena', 0.725)) { halo(bot[0], bot[1] - 14, 16, hex('#ffffff'), 0.55); if (Math.sin(t * 9) > 0.3) { R.linea(bot[0] - 4, bot[1] - 22, bot[0] + 4, bot[1] - 22, hex('#ffffff')); R.linea(bot[0], bot[1] - 26, bot[0], bot[1] - 18, hex('#ffffff')); } }
  const ax = 186 + Math.sin(t * 1.2) * 5 + tramo(t, en('arena', 0.530), en('arena', 0.554)) * 30, ay = 116 + Math.sin(t * 2.3) * 3 - tramo(t, en('arena', 0.530), en('arena', 0.554)) * 20;
  AT.luciernaga(R, ax, ay, t, { dir: -1, cara: t > en('arena', 0.530) && t < en('arena', 0.610) ? 'sorpresa' : t > en('arena', 0.650) ? 'normal' : 'triste' });
};

// ═══ PLANO 4 · la mesa de Snow de cerca: huele la rosa, sonríe en «wants» y en «owe» abre el cofre de lo que le deben ═══
const p4 = (t) => {
  const cofre = tramo(t, en('arena', 0.878), en('arena', 0.911));
  const o = { encuadre: 'despacho', camara: 'mesa', cofre, numero: '50' };
  const g = T.capitolio(R, t, o);
  const huele = t < en('arena', 0.822), apunta = t > en('arena', 0.915);
  const r = R.actor(EL.snow, 226, 115, t, { dir: -1, sostiene: huele ? [222, 96 + Math.round(Math.sin(t * 3))] : apunta ? undefined : [214, 104], dedo: apunta, sonrisa: t > en('arena', 0.822) && t < en('arena', 0.915), habla: t > en('arena', 0.920) && t < en('arena', 0.995) && Math.sin(t * 8) > 0 });
  if (r.mano && !apunta) T.PIEZAS_JH.rosaBlanca(R, r.mano[0] - 1, r.mano[1] + 1, {});
  T.capitolioDelante(R, t, o);
  // el paracaídas plateado de los patrocinios, en miniatura, sobre el secante: la tela se mece y la botellita brilla
  const bx = 214, by = 148, m = Math.round(Math.sin(t * 2) * 1.5);
  for (let i = -7; i <= 7; i++) { const y = by - 24 - Math.round(Math.sqrt(Math.max(0, 49 - i * i)) * 0.7) + m; R.rect(bx + i, y, bx + i, y + 2, i % 3 === 0 ? hex('#a8b0c0') : hex('#e4e8f0')); R.pset(bx + i, y - 1, K); }
  R.linea(bx - 7, by - 22 + m, bx - 2, by - 8, hex("#c8ccd8")); R.linea(bx + 7, by - 22 + m, bx + 2, by - 8, hex('#c8ccd8')); R.linea(bx, by - 26 + m, bx, by - 8, hex('#c8ccd8'));
  R.rect(bx - 3, by - 9, bx + 3, by, K); R.rect(bx - 2, by - 8, bx + 2, by - 1, hex('#c8d4e8')); R.rect(bx - 1, by - 11, bx + 1, by - 9, K); R.pset(bx - 1, by - 7, hex('#ffffff'));
  if (Math.sin(t * 4) > 0.6) halo(bx, by - 5, 8, hex('#ffffff'), 0.5);
  AT.luciernaga(R, 92 + Math.sin(t * 0.9) * 5, 70 + Math.sin(t * 2) * 3, t, { dir: 1, cara: t > en('arena', 0.887) ? 'triste' : 'normal', brillo: 0.8 });
};

// ═══ PLANO 5 · la maqueta de la arena (cúpula): se apaga la luz dorada de Wyatt ═══
const LUCES12 = [[120, 136], [146, 130], [176, 137], [204, 131]];
const p5 = (t) => {
  const g = T.arena(R, t, { encuadre: 'cupula', luces: 18 });
  const fuera = 1 - tramo(t, en('polen', 0.310), en('polen', 0.339)), parp = t > en('polen', 0.302) && t < en('polen', 0.319) && Math.sin(t * 60) > 0 ? 0.3 : 1;
  LUCES12.forEach(([x, y], i) => luzTributo(x, y, t, i === 0 ? fuera * parp : 1));
  // la moneda de las apuestas, en holograma, gira sobre la luz de Wyatt
  const mo = tramo(t, en('polen', 0.222), en('polen', 0.245)) * (1 - tramo(t, en('polen', 0.296), en('polen', 0.313)));
  if (mo > 0) { const w = Math.round(Math.abs(Math.cos(t * 7)) * 4), y = 116 - Math.round(mo * 4); R.rect(120 - w - 1, y - 5, 120 + w + 1, y + 5, K); if (w > 0) R.rect(120 - w, y - 4, 120 + w, y + 4, hex('#ffd34a')); R.pset(120, y, hex('#a8781a')); halo(120, y, 8, hex('#fff0a0'), 0.4 * mo); }
  // la estela de luz que sube cuando se apaga
  const es = lin(t, en('polen', 0.319), en('polen', 0.376)); if (es > 0 && es < 1) for (let k = 0; k < 6; k++) R.pset(120 + Math.round(Math.sin(k * 2 + t * 3) * 2), 132 - Math.round(es * 26) - k * 3, mez(hex('#ffd34a'), hex('#3a4a6a'), es));
  // dos vigilantes junto a la mesa: el de la izquierda señala la luz al nombrar a Wyatt
  R.actor(T.JH.vigilante, 18, 176, t, { dir: 1, dedo: t > en('polen', 0.168) && t < en('polen', 0.262), habla: t > en('polen', 0.168) && t < en('polen', 0.228) && Math.sin(t * 9) > 0 });
  const vr = R.actor(T.JH.vigilante, 284, 176, t, { dir: -1, sostiene: true, triste: t > en('polen', 0.319) });
  if (vr.mano) { const [qx, qy] = vr.mano; R.rect(qx - 5, qy - 6, qx + 1, qy + 2, K); R.rect(qx - 4, qy - 5, qx, qy + 1, hex('#3ad0c8')); R.pset(qx - 3, qy - 4, hex('#c8fff8')); if (Math.sin(t * 6) > 0) R.pset(qx - 2, qy - 1, hex('#ffd34a')); }
  // Atom rodea la luz con su órbita y se entristece cuando se apaga
  const ax = lerp(250, 132, tramo(t, en('polen', 0.125), en('polen', 0.168))) + Math.sin(t * 1.4) * 3, ay = lerp(70, 104, tramo(t, en('polen', 0.125), en('polen', 0.168))) + Math.sin(t * 2.4) * 2;
  if (t > en('polen', 0.168) && t < en('polen', 0.313)) AT.anillo(R, 120, 136, 9, 5, t, tramo(t, en('polen', 0.168), en('polen', 0.205)));
  AT.luciernaga(R, ax, ay, t, { dir: -1, cara: t > en('polen', 0.319) ? 'triste' : 'normal', brillo: 0.8 });
};

// ═══ PLANO 6 · el borde de la maqueta de cerca: a la mañana sale polen de las flores de maqueta y se apaga otra luz dorada ═══
const p6 = (t) => {
  const o = { encuadre: 'cupula', camara: 'borde', luces: 0 };
  const g = T.arena(R, t, o), py = g.prado ?? 150;
  const L = [[60, py - 22], [104, py - 26], [150, py - 20]];
  const fuera = 1 - tramo(t, en('polen', 0.595), en('polen', 0.624));
  // el polen de maqueta: una nube violeta que sale de las flores junto a la luz del centro
  const pn = lin(t, en('polen', 0.547), en('polen', 0.649)) * (1 - lin(t, en('polen', 0.661), en('polen', 0.706)) * 0.6);
  if (pn > 0) { for (let k = 0; k < 14; k++) { const a = h(k, 3, 33) * 6.28, rr = (6 + h(k, 4, 33) * 20) * pn, x = Math.round(104 + Math.cos(a) * rr * 1.5 + Math.sin(t * 1.5 + k) * 2), y = Math.round(py - 14 + Math.sin(a) * rr * 0.5 - pn * 12), r = Math.round(2 + 4 * pn * h(k, 5, 33));
      R.disco(x, y, r + 1, hex('#6a3a9a')); R.disco(x, y, r, k % 2 ? hex('#a86ad8') : hex('#c88ae8')); R.pset(x - 1, y - r + 1, hex('#f0d8ff')); }
    for (let k = 0; k < 30; k++) { const u = (t * 0.6 + h(k, 6, 33)) % 1; R.pset(Math.round(104 + (h(k, 7, 33) - 0.5) * 60 * pn), Math.round(py - 10 - u * 40 * pn), hex('#e8c8ff')); } }
  L.forEach(([x, y], i) => luzTributo(x, y, t, i === 1 ? fuera : 1));
  const es = lin(t, en('polen', 0.604), en('polen', 0.672)); if (es > 0 && es < 1) for (let k = 0; k < 6; k++) R.pset(104 + Math.round(Math.sin(k * 2 + t * 3) * 2), L[1][1] - 4 - Math.round(es * 30) - k * 3, mez(hex('#ffd34a'), hex('#3a4a6a'), es));
  AT.atom(R, 272, g.suelo, t, { pose: t > en('polen', 0.581) && t < en('polen', 0.672) ? 'senala' : 'quieto', dir: -1, cara: t > en('polen', 0.598) ? 'triste' : t > en('polen', 0.547) ? 'sorpresa' : 'normal' });
};

// ═══ PLANO 7 · el mapa de Panem, el Distrito 12 de cerca: de cuatro chinchetas quedan dos (Haymitch y Maysilee) ═══
const p7 = (t) => {
  const g = T.capitolio(R, t, { encuadre: 'mapa', camara: 'doce' });
  const [dx, dy] = g.distrito12, P4 = [[dx - 52, dy + 10], [dx - 28, dy - 4], [dx - 6, dy + 16], [dx - 36, dy + 32]];
  const apaga = tramo(t, en('polen', 0.812), en('polen', 0.849)), cae = [0, 1, 0, 1];
  P4.forEach(([x, y], i) => {
    const on = cae[i] ? 1 - apaga : 1;
    R.disco(x + 2, y + 3, 4, hex('#3a4a3a'));
    luzTributo(x, y, t, on);
  });
  // las dos figuritas que quedan, como piezas de un juego, saltan junto a su chincheta
  const fig = (el, x, y, t0) => { const u = lin(t, t0, t0 + 0.35); if (u <= 0) return; R.disco(x + 7, y + 1, 6, hex('#2a3a4a')); R.rect(x + 1, y, x + 13, y + 1, hex('#c8a040'));
    R.actor(el, x, y, t, { dir: 1, salto: Math.round(Math.sin(u * Math.PI) * 8), sonrisa: u >= 1, quieto: u < 1 }); };
  fig(EL.haymitch, P4[0][0] + 4, P4[0][1] + 6, en('polen', 0.911));
  fig(EL.maysilee, P4[2][0] + 4, P4[2][1] + 6, en('polen', 0.940));
  AT.atom(R, 290, 172, t, { pose: t > en('polen', 0.809) && t < en('polen', 0.889) ? 'senala' : t > en('polen', 0.911) ? 'brazos' : 'quieto', dir: -1, cara: t > en('polen', 0.814) && t < en('polen', 0.906) ? 'triste' : t > en('polen', 0.911) ? 'sonrisa' : 'normal' });
};

// ═══ PLANO 8 · INSERTO: el suelo del bosque de cerca; la mano de Ampert da el paquete y se va (fondo local) ═══
const fondoSuelo = () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 41); R.pset(x, y, n < 0.33 ? hex('#3a2a1e') : n < 0.66 ? hex('#4a3624') : hex('#54402a')); }
  // las raíces gruesas que cruzan
  for (const [x0, y0, x1, y1, w] of [[0, 40, 320, 20, 6], [0, 150, 140, 178, 5], [210, 180, 320, 120, 7]]) for (let i = 0; i <= 100; i++) { const u = i / 100, x = x0 + (x1 - x0) * u, y = y0 + (y1 - y0) * u + Math.sin(u * 9) * 4;
    R.disco(Math.round(x), Math.round(y), w, K); R.disco(Math.round(x), Math.round(y), w - 1, hex('#6a4a2e')); R.pset(Math.round(x), Math.round(y - w + 2), hex('#8a6a46')); }
  // musgo, hojarasca de colores, piedrecitas y setas que relucen
  for (let k = 0; k < 18; k++) { const x = Math.floor(h(k, 1, 42) * 320), y = 30 + Math.floor(h(k, 2, 42) * 150), r = 4 + Math.floor(h(k, 3, 42) * 9); for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (Math.hypot(i, j * 1.4) < r && h(x + i, y + j, 43) < 0.8) R.pset(x + i, y + j, h(x + i, y + j, 44) < 0.5 ? hex('#4a7a2e') : hex('#5e9238')); }
  const HOJ = [hex('#c86a2a'), hex('#d89a3a'), hex('#a84a2a'), hex('#8a8a3a'), hex('#e8b84a')];
  for (let k = 0; k < 70; k++) { const x = Math.floor(h(k, 4, 42) * 320), y = Math.floor(h(k, 5, 42) * 180), c = HOJ[k % 5], a = h(k, 6, 42) * 3; const dx = Math.round(Math.cos(a) * 4), dy = Math.round(Math.sin(a) * 2);
    R.poligono([[x - dx, y - dy], [x - 1, y - 2], [x + dx, y + dy], [x + 1, y + 2]], c); R.linea(x - dx, y - dy, x + dx, y + dy, mez(c, K, 0.4)); }
  for (let k = 0; k < 24; k++) { const x = Math.floor(h(k, 7, 42) * 320), y = Math.floor(h(k, 8, 42) * 180); R.rect(x, y, x + 2, y + 1, hex('#8a8a90')); R.pset(x, y, hex('#c8c8d0')); }
  for (const [x, y] of [[36, 120], [44, 126], [278, 158], [290, 152], [250, 74]]) { R.rect(x, y, x + 1, y + 6, hex('#f0e0d0')); R.disco(x, y - 1, 4, K); R.disco(x, y - 1, 3, hex('#e85aa8')); R.pset(x - 1, y - 3, hex('#ffd0ec')); R.pset(x + 2, y - 1, hex('#ffd0ec')); }
  // helechos en las esquinas de abajo
  for (const [x0, y0, d] of [[0, 180, 1], [320, 180, -1]]) for (let f = 0; f < 4; f++) { const a = -0.4 - f * 0.35; for (let i = 0; i < 46; i++) { const x = x0 + d * Math.cos(a) * i, y = y0 + Math.sin(a) * i; R.pset(Math.round(x), Math.round(y), hex('#3a7a2e')); if (i % 4 === 0) { R.linea(Math.round(x), Math.round(y), Math.round(x + d * 4), Math.round(y - 3), hex('#5aa03e')); R.linea(Math.round(x), Math.round(y), Math.round(x - d * 2), Math.round(y - 5), hex('#5aa03e')); } } }
};
const p8 = (t) => {
  capa('suelo', fondoSuelo);
  // un haz de luz con motas y hojas que caen; un escarabajo que cruza
  for (let y = 0; y < 180; y++) { const xa = 210 - y * 0.6; for (let x = Math.round(xa); x < xa + 34; x++) if (((x + y) & 3) === 0) tono(x, y, hex('#fff0b0'), 0.18); }
  for (let k = 0; k < 10; k++) { const u = (t * 0.07 + h(k, 1, 45)) % 1; R.pset(Math.round(196 - u * 110 + Math.sin(t + k) * 6 + k * 2), Math.round(u * 180), hex('#fff6c0')); }
  for (let k = 0; k < 3; k++) { const u = (t * 0.12 + k / 3) % 1, x = 60 + k * 90 + Math.sin(t * 2 + k) * 10, y = u * 200 - 10; R.rect(Math.round(x), Math.round(y), Math.round(x) + 3, Math.round(y) + 1, k % 2 ? hex('#e8b84a') : hex('#c86a2a')); }
  const bx = ((t - 41) * 9) % 360 - 20; R.disco(Math.round(bx), 64, 2, K); R.pset(Math.round(bx), 63, hex('#3a8aa8')); R.pset(Math.round(bx) + 2, 64, K);
  // la mano de Ampert sube desde abajo con el paquete; en «explosive» pasa a la mano de Haymitch; la de Ampert se va
  const llegaA = tramo(t, en('deposito', 0.002), en('deposito', 0.066)), vaA = tramo(t, en('deposito', 0.177), en('deposito', 0.258)), llegaH = tramo(t, en('deposito', 0.037), en('deposito', 0.095)), pasa = tramo(t, en('deposito', 0.101), en('deposito', 0.127));
  const aX = lerp(lerp(222, 186, llegaA), 262, vaA), aY = lerp(lerp(200, 138, llegaA), 204, vaA);
  const hX = lerp(96, 124, llegaH), hY = lerp(206, 140, llegaH) + tramo(t, en('deposito', 0.194), en('deposito', 0.275)) * 8 + (t > en('deposito', 0.136) ? Math.round(Math.sin(t * 9) * 0.6) : 0);
  const px = lerp(aX - 2, hX + 8, pasa), py = lerp(aY - 8, hY - 8, pasa);
  T.brazo(R, Math.round(hX - 32), 222, Math.round(hX), Math.round(hY), MANGA_H, 1, { sombra: false });
  if (vaA < 1) T.brazo(R, Math.round(aX + 34), 222, Math.round(aX), Math.round(aY), MANGA_A, -1, { sombra: false });
  paquete(Math.round(px), Math.round(py), 1.5);
  const ax = lerp(250, 236, tramo(t, en('deposito', 0.055), en('deposito', 0.101))) + tramo(t, en('deposito', 0.177), en('deposito', 0.252)) * 40 + Math.sin(t * 1.3) * 3, ay = 104 + Math.sin(t * 2.2) * 3 + tramo(t, en('deposito', 0.177), en('deposito', 0.252)) * 30;
  AT.luciernaga(R, ax, ay, t, { dir: t > en('deposito', 0.177) ? 1 : -1, cara: t > en('deposito', 0.177) ? 'triste' : 'normal', brillo: 0.85 });
};

// ═══ PLANO 9 · el depósito bajo tierra: Haymitch baja solo por la escalera y ata la carga a la tubería ═══
const p9 = (t) => {
  const pone = t > en('deposito', 0.528), o = { encuadre: 'deposito', camara: 'general', carga: pone };
  const g = T.arena50(R, t, o);
  for (const xr of [8, 20]) { R.rect(xr, 40, xr + 1, g.suelo, K); R.pset(xr, 40, hex('#9aa0a8')); for (let y = 41; y < g.suelo; y++) R.pset(xr + 1, y, hex('#6a7280')); }
  for (let y = 46; y < g.suelo; y += 7) { R.rect(9, y, 19, y + 1, K); R.rect(10, y, 19, y, hex('#8a929e')); }
  const baja = tramo(t, en('deposito', 0.331), en('deposito', 0.412)), anda = tramo(t, en('deposito', 0.418), en('deposito', 0.508));
  const x = Math.round(lerp(7, 222, anda)), s = Math.round(lerp(96, g.suelo, baja)) + (baja > 0 && baja < 1 ? Math.round(Math.sin(t * 12)) : 0);
  const alcanza = t > en('deposito', 0.508) && t < en('deposito', 0.542);
  const r = R.actor(EL.haymitch, x, s, t, { dir: anda > 0 ? 1 : -1, anda: anda > 0 && anda < 1, sostiene: alcanza ? [240, 146] : !pone ? true : undefined, triste: pone && t > en('deposito', 0.542) });
  if (!pone && r.mano) paquete(r.mano[0] + 2, r.mano[1] + 2, 0.6);
  T.arena50Delante(R, t, o);
  AT.luciernaga(R, x + 6 + Math.sin(t * 1.5) * 6, s - 40 + Math.sin(t * 2.4) * 3, t, { dir: 1, cara: 'triste', brillo: 1 });
};

// ═══ PLANO 10 · la tubería de cerca: el pedernal de Lenore Dove, la mecha y el reventón del agua (sin nadie cerca) ═══
const p10 = (t) => {
  const mecha = lin(t, en('deposito', 0.638), en('deposito', 0.734)), estalla = tramo(t, en('deposito', 0.738), en('deposito', 0.786)), o = { encuadre: 'deposito', camara: 'tuberia', mecha, estalla };
  const g = T.arena50(R, t, o);
  const huye = tramo(t, en('deposito', 0.656), en('deposito', 0.717)), x = Math.round(lerp(150, -24, huye));
  const golpe = t < en('deposito', 0.653) ? (Math.abs(t - en('deposito', 0.609)) < 0.12 || Math.abs(t - en('deposito', 0.634)) < 0.12) : false;
  const r = R.actor(EL.haymitch, x, g.suelo, t, { dir: huye > 0 ? -1 : 1, anda: huye > 0 && huye < 1, sostiene: huye > 0 ? true : [168, golpe ? 157 : 150], sorpresa: huye > 0, quieto: false });
  if (r.mano) pedernal(r.mano[0], r.mano[1], t);
  chispas(172, 157, t, lin(t, en('deposito', 0.609), en('deposito', 0.627)), 8); chispas(172, 157, t, lin(t, en('deposito', 0.634), en('deposito', 0.659)), 14);
  T.arena50Delante(R, t, o);
  const ax = lerp(122, -20, tramo(t, en('deposito', 0.664), en('deposito', 0.722))) + Math.sin(t * 1.4) * 3;
  AT.luciernaga(R, ax, 96 + Math.sin(t * 2.2) * 3, t, { dir: t > en('deposito', 0.664) ? -1 : 1, cara: t > en('deposito', 0.635) ? 'sorpresa' : 'normal' });
};

// ═══ PLANO 11 · la consola de los Vigilantes: los engranajes tiemblan… y siguen girando ═══
const pantallaAgua = (R2, t, [x0, y0, x1, y1]) => {
  const W = x1 - x0, H = y1 - y0, cl = (x, y, c) => { if (x >= x0 && x <= x1 && y >= y0 && y <= y1) R.pset(Math.round(x), Math.round(y), c); };
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) cl(x, y, (x - x0) % 8 === 0 || (y - y0) % 8 === 0 ? hex('#1a3a5a') : hex('#0e2238'));
  const sube = tramo(t, en('deposito', 0.804), en('deposito', 0.868)) * (1 - tramo(t, en('deposito', 0.891), en('deposito', 0.949))), nivel = y1 - 3 - sube * H * 0.55;
  for (let x = x0; x <= x1; x++) { const yy = nivel + Math.sin(x * 0.4 + t * 6) * 1.2; for (let y = Math.round(yy); y <= y1; y++) cl(x, y, y === Math.round(yy) ? hex('#a8e8ff') : hex('#2a7ab8')); }
  // los puntitos de los tributos siguen moviéndose como si nada
  for (let k = 0; k < 8; k++) cl(x0 + 4 + ((h(k, 1, 51) * W + t * 3 * (k % 2 ? 1 : -1)) % (W - 8) + W - 8) % (W - 8), y0 + 4 + h(k, 2, 51) * (H * 0.4), k < 2 ? hex('#ffd34a') : hex('#e8e8f0'));
};
const p11 = (t) => {
  const eng = t < en('deposito', 0.888) ? 0.45 * tramo(t, en('deposito', 0.812), en('deposito', 0.868)) : 0;
  const o = { encuadre: 'control', camara: 'consola', engranajes: eng, pantalla: pantallaAgua };
  T.arena(R, t, o);
  const alarma = t > en('deposito', 0.812) && t < en('deposito', 0.888);
  R.actor(T.JH.vigilante, 112, 158, t, { dir: 1, sorpresa: alarma, sonrisa: t > en('deposito', 0.902), brazos: t > en('deposito', 0.902) && t < en('deposito', 0.966), habla: t > en('deposito', 0.972) && Math.sin(t * 8) > 0 });
  const v2 = tramo(t, en('deposito', 0.926), en('deposito', 1.048)); R.actor(T.JH.vigilante, Math.round(lerp(330, 196, v2)), 158, t, { dir: -1, anda: v2 > 0 && v2 < 1, sostiene: true });
  T.arenaDelante(R, t, o);
  if (alarma && Math.sin(t * 14) > 0) { halo(274, 128, 20, hex('#ff3a3a'), 0.35); R.icono('!', 270, 104, hex('#ff5a5a'), K, 2); }
  AT.luciernaga(R, 104 + Math.sin(t * 1.1) * 4, 92 + Math.sin(t * 2.1) * 3, t, { dir: 1, cara: alarma ? 'sorpresa' : t > en('deposito', 0.897) ? 'triste' : 'normal', brillo: 0.85 });
};

// ═══ PLANO 12 · el bosque: Maysilee en la rama con la cerbatana en la mano; el matorral se agita, los pájaros escapan y ella le llama ═══
const p12 = (t) => {
  const o = { encuadre: 'bosque', camara: 'general', luz: 'dia' };
  const g = T.arena50(R, t, o);
  const [rx, ry] = g.rama;
  const u = tramo(t, en('maysilee', 0.002), en('maysilee', 0.115)), hx = Math.round(lerp(-18, 108, u));
  const gira = t > en('maysilee', 0.195) && t < en('maysilee', 0.236), arriba = t >= en('maysilee', 0.236);
  R.actor(EL.haymitch, hx, g.suelo, t, { dir: gira ? -1 : 1, anda: u > 0 && u < 1, sorpresa: t > en('maysilee', 0.195) && t < en('maysilee', 0.252), sonrisa: t > en('maysilee', 0.252) });
  // el matorral de la izquierda se agita (algo acecha, no se ve) y de él escapan los pájaros
  const ag = t > en('maysilee', 0.120) && t < en('maysilee', 0.203) ? Math.sin(t * 30) * 2 : 0;
  for (let k = 0; k < 7; k++) { const bx = 22 + k * 5 + Math.round(ag * (k % 2 ? 1 : -1)), by = 150 - (k % 3) * 4; R.disco(bx, by, 6, K); R.disco(bx, by, 5, k % 2 ? hex('#2e7a2e') : hex('#3a8a3a')); R.pset(bx - 2, by - 3, hex('#6ac85a')); }
  // los pájaros que escapan del matorral
  const pj = lin(t, en('maysilee', 0.206), en('maysilee', 0.274)); if (pj > 0 && pj < 1) for (let k = 0; k < 4; k++) { const x = 30 + k * 6 + pj * (80 + k * 14), y = 140 - pj * (90 + k * 8), ala = Math.floor(t * 12 + k) % 2; R.linea(Math.round(x - 3), Math.round(y - ala), Math.round(x), Math.round(y), K); R.linea(Math.round(x), Math.round(y), Math.round(x + 3), Math.round(y - ala), K); }
  // Maysilee en la rama, con la cerbatana en la mano (bajada, sin apuntar): le llama y le señala que suba
  const llama = t > en('maysilee', 0.164) && t < en('maysilee', 0.236), mx = rx - 7;
  const r = R.actor(EL.maysilee, mx, ry, t, { dir: -1, sostiene: llama ? undefined : [mx - 1, ry - 9], dedo: llama, habla: llama && Math.sin(t * 9) > 0, sonrisa: t > en('maysilee', 0.236) });
  if (r.mano && !llama) cerbatana(r.mano[0], r.mano[1], -1, 12, 14);
  if (llama) cerbatana(mx + 2, ry - 6, -1, 12, 12);
  T.arena50Delante(R, t, o);
  AT.luciernaga(R, lerp(70, 150, tramo(t, en('maysilee', 0.032), en('maysilee', 0.241))) + Math.sin(t * 1.3) * 4, 106 + Math.sin(t * 2.2) * 3 - (arriba ? 14 : 0), t, { dir: 1, cara: t > en('maysilee', 0.195) && t < en('maysilee', 0.241) ? 'sorpresa' : arriba ? 'sonrisa' : 'normal' });
};

// ═══ PLANO 13 · INSERTO: el filo de la meseta: las dos manos se dan la mano; la de Haymitch coge un piñón (fondo local) ═══
const fondoMeseta = () => {
  // el cielo tramado, la sierra «pintada» al otro lado del vacío y la niebla
  const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], CI = [hex('#3a7ad8'), hex('#5a9ae8'), hex('#8abcf0'), hex('#b8d8f8')];
  for (let y = 0; y < 86; y++) for (let x = 0; x < 320; x++) { const v = Math.min(2.99, y / 76 * 3), i = Math.floor(v), f = v - i; R.pset(x, y, f * 16 > B4[((y & 3) << 2) | (x & 3)] + 0.5 ? CI[Math.min(3, i + 1)] : CI[i]); }
  for (let x = 0; x < 320; x++) { const m1 = 50 - Math.round(Math.abs(Math.sin(x * 0.021 + 1)) * 18 + Math.sin(x * 0.09) * 3), m2 = 62 - Math.round(Math.abs(Math.sin(x * 0.034 + 2)) * 10);
    for (let y = m1; y < 86; y++) { const sn = Math.sin(x * 0.021 + 1) > 0.5 && y < m1 + 4 + (x % 3); const lado = Math.cos(x * 0.021 + 1) * Math.sign(Math.sin(x * 0.021 + 1)) > 0;
      R.pset(x, y, sn ? (lado ? hex('#f0f4fc') : hex('#c8d4ec')) : lado ? ((x + y) % 4 === 0 ? hex('#9aaad4') : hex('#8a9ac8')) : ((x + y) % 4 === 0 ? hex('#7a86b8') : hex('#6e7aac'))); }
    for (let y = m2; y < 86; y++) R.pset(x, y, (x + y) % 3 === 0 ? hex('#4a7a8a') : hex('#5a8a90')); }
  for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 1, 71) * 320), y = 60 + Math.floor(h(k, 2, 71) * 8); R.poligono([[x, y - 6], [x - 3, y + 2], [x + 3, y + 2]], hex('#3e6a78')); }
  // el filo de la meseta: hierba, flores y piedras que asoman al vacío
  for (let x = 0; x < 320; x++) { const yb = 80 + Math.round(Math.sin(x * 0.06) * 2 + Math.sin(x * 0.17) * 1.5); for (let y = yb; y < 180; y++) { const n = h(x >> 1, y, 61), v = (y - 80) / 100;
    R.pset(x, y, y < yb + 2 ? hex('#7ac85a') : n < 0.3 ? mez(hex('#2e6a2a'), hex('#3e8a34'), v) : n < 0.65 ? mez(hex('#3a7a30'), hex('#4a9a3a'), v) : mez(hex('#468a38'), hex('#5aac44'), v)); } }
  for (let k = 0; k < 30; k++) { const x = Math.floor(h(k, 3, 71) * 320), y = 78 + Math.floor(h(k, 4, 71) * 4); R.linea(x, y + 3, x - 2, y - 3, hex('#6ab84a')); R.linea(x, y + 3, x + 2, y - 2, hex('#8ad86a')); }
  for (let k = 0; k < 200; k++) { const x = Math.floor(h(k, 1, 63) * 320), y = 86 + Math.floor(h(k, 2, 63) * 94), l = 2 + Math.floor((y - 80) / 22); R.linea(x, y, x + (k % 3) - 1, y - l, h(k, 3, 63) < 0.5 ? hex('#8ad86a') : hex('#2e6a26')); }
  for (let k = 0; k < 34; k++) { const x = 8 + Math.floor(h(k, 4, 63) * 304), y = 88 + Math.floor(h(k, 5, 63) * 88), c = [hex('#f4f0e8'), hex('#f0c840'), hex('#c86ae8'), hex('#e85aa8')][k % 4], s = y > 140 ? 2 : 1;
    for (const [i, j] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); R.pset(x, y, hex('#f8d040')); R.linea(x, y + s + 1, x, y + s + 4, hex('#2e6a26')); }
  for (let k = 0; k < 10; k++) { const x = Math.floor(h(k, 6, 63) * 300) + 10, y = 100 + Math.floor(h(k, 7, 63) * 76); R.disco(x, y, 2, hex('#2e7a2e')); R.disco(x - 2, y + 1, 2, hex('#3a8a3a')); R.disco(x + 2, y + 1, 2, hex('#3a8a3a')); R.pset(x, y - 1, hex('#6ac85a')); }
  for (const [x, y, r] of [[52, 118, 5], [262, 128, 7], [96, 166, 6], [300, 170, 5], [228, 104, 4], [140, 112, 3]]) piedra(x, y, r, x + 3);
  // matas de flores grandes de primer plano (abajo a los lados) y piñas viejas por el suelo
  for (const [cx, cy, c1, c2] of [[40, 160, hex('#c86ae8'), hex('#8a3ab8')], [282, 150, hex('#f0c840'), hex('#c89a20')], [236, 172, hex('#f4f0e8'), hex('#c8c0b0')], [120, 140, hex('#e85aa8'), hex('#b8307a')]])
    for (let k = 0; k < 7; k++) { const x = cx + Math.round((h(k, cx, 74) - 0.5) * 30), y = cy + Math.round((h(cx, k, 74) - 0.5) * 14); R.linea(x, y, x + 1, y + 10, hex('#2e6a26'));
      R.disco(x, y, 3, K); R.disco(x, y, 2, c1); R.pset(x - 1, y - 1, hex('#ffffff')); R.pset(x + 1, y + 1, c2); R.pset(x, y, hex('#f8d040')); }
  for (const [x, y] of [[70, 130], [250, 160], [176, 98], [30, 140]]) { pinon(x, y, 1); R.linea(x - 3, y + 6, x + 4, y + 6, hex('#2a5a22')); }
  // el pino de la izquierda: tronco con corteza y ramas con agujas (fuera de la barra del año)
  R.rect(0, 0, 16, 180, K); R.rect(0, 0, 14, 180, hex('#5a3a22')); R.rect(0, 0, 3, 180, hex('#7a5232')); for (let y = 2; y < 180; y += 6) R.linea(5 + (y % 4), y, 7 + (y % 4), y + 4, hex('#3a2414'));
  for (const [y0, l] of [[30, 48], [56, 64], [84, 40]]) { R.linea(14, y0, 14 + l, y0 + 6, hex('#3a2414')); R.linea(14, y0 + 1, 14 + l, y0 + 7, hex('#5a3a22'));
    for (let i = 0; i < l; i += 2) { const x = 14 + i, y = y0 + Math.round(i * 6 / l); for (let j = -5; j <= 5; j++) if (h(x, j, 75) < 0.75) R.pset(x + (j > 0 ? 1 : -1), y + j, j < -2 ? hex('#3a8a4a') : j > 2 ? hex('#1e4a2a') : hex('#2e6a3a')); } }
  for (let y = 20; y < 110; y++) for (let x = 0; x < 20; x++) if (h(x, y, 76) < 0.45 && (x + y) % 2) R.pset(x, y, (x + y) % 3 ? hex('#2e6a3a') : hex('#3a8a4a'));
};
const p13 = (t) => {
  capa('meseta', fondoMeseta);
  // nubes de tres tonos a tres velocidades, la niebla que sube del vacío y unos pájaros lejos
  for (const [y0, v, c, w] of [[16, 3, hex('#ffffff'), 30], [30, 5, hex('#e8f0fc'), 22], [44, 8, hex('#c8d8f0'), 16]]) for (let k = 0; k < 3; k++) { const x = ((k * 140 + t * v) % 420) - 60; if ((x > 250 && y0 < 46) || x < 70) continue;
    R.disco(Math.round(x), y0, w >> 2, c); R.disco(Math.round(x + w * 0.35), y0 - 2, w >> 2, c); R.disco(Math.round(x + w * 0.7), y0, w >> 3, c); R.rect(Math.round(x - w * 0.2), y0, Math.round(x + w * 0.8), y0 + 2, c); }
  for (let k = 0; k < 26; k++) { const x = ((h(k, 1, 72) * 380 + t * 6) % 380) - 30, y = 70 + Math.round(h(k, 2, 72) * 10 + Math.sin(t + k) * 2); R.rect(Math.round(x), y, Math.round(x) + 10, y + 1, hex('#e8f0f8')); }
  for (let k = 0; k < 2; k++) { const x = 60 + ((t * 10 + k * 30) % 200), y = 52 + k * 4, ala = Math.floor(t * 8 + k) % 2; R.linea(Math.round(x - 2), y - ala, Math.round(x), y, K); R.linea(Math.round(x), y, Math.round(x + 2), y - ala, K); }
  // el campo de fuerza: nadie lo había visto; en «noticed» brilla un instante una red de hexágonos sobre el vacío
  const br = tramo(t, en('maysilee', 0.445), en('maysilee', 0.473)) * (1 - tramo(t, en('maysilee', 0.506), en('maysilee', 0.550)));
  if (br > 0) for (let y = 48; y < 80; y++) for (let x = 150; x < 320; x++) { const q = (x + (Math.floor(y / 6) % 2) * 5) % 10, r = y % 6; if ((q === 0 || r === 0) && h(x, y, 73) < 0.7) tono(x, y, hex('#e8fbff'), 0.75 * br * (1 - Math.abs(x - 235) / 120)); }
  // las hierbas que se mecen con el viento, una mariquita y una mariposa
  for (let k = 0; k < 44; k++) { const x = Math.floor(h(k, 1, 64) * 320), y = 96 + Math.floor(h(k, 2, 64) * 84), m = Math.round(Math.sin(t * 2 + x * 0.05) * 2); R.linea(x, y, x + m, y - 9, hex('#8ad86a')); R.linea(x + 1, y, x + 1 + m, y - 7, hex('#4a9a3a')); }
  const lx = 40 + ((t - 64) * 4) % 60; R.disco(Math.round(lx), 164, 2, hex('#e83a3a')); R.pset(Math.round(lx), 163, K); R.pset(Math.round(lx) + 2, 164, K);
  const bx = 300 - ((t - 64) * 18) % 360, by = 110 + Math.sin(t * 3) * 8, ala = Math.floor(t * 10) % 2; R.disco(Math.round(bx), Math.round(by), ala ? 3 : 2, hex('#f0a830')); R.pset(Math.round(bx), Math.round(by), K);
  // las dos manos suben desde abajo y se estrechan en «ally»; la de Maysilee se retira; la de Haymitch coge el piñón en «noticed»
  const llega = tramo(t, en('maysilee', 0.277), en('maysilee', 0.302)), suelta = tramo(t, en('maysilee', 0.363), en('maysilee', 0.385)), vaM = tramo(t, en('maysilee', 0.379), en('maysilee', 0.429));
  const ag = t > en('maysilee', 0.302) && t < en('maysilee', 0.363) ? Math.round(Math.sin((t - en('maysilee', 0.302)) * 14) * 2) : 0;
  const baja = tramo(t, en('maysilee', 0.390), en('maysilee', 0.459)), subeP = tramo(t, en('maysilee', 0.470), en('maysilee', 0.522));
  let hx = lerp(112, 140, llega) - suelta * 6, hy = lerp(200, 140, llega) + ag; hx = lerp(hx, 192, baja); hy = lerp(hy, 160, baja); hx = lerp(hx, 168, subeP); hy = lerp(hy, 128, subeP); const atras = tramo(t, en('maysilee', 0.605), en('maysilee', 0.646)); hx = lerp(hx, 150, atras); hy = lerp(hy, 136, atras); hy += t > en('maysilee', 0.522) && t < en('maysilee', 0.550) ? Math.round(Math.sin(lin(t, en('maysilee', 0.522), en('maysilee', 0.550)) * Math.PI) * 3) : 0;
  const mxM = lerp(lerp(196, 166, llega) + suelta * 8, 214, vaM), myM = lerp(lerp(200, 140, llega) + ag, 206, vaM);
  const coge = t > en('maysilee', 0.465);
  if (!coge) pinon(200, 166, 1);
  T.brazo(R, Math.round(hx - 30), 222, Math.round(hx), Math.round(hy), MANGA_H, 1, { sombra: false });
  const vuela = t > en('maysilee', 0.556) && t < en('maysilee', 0.597) ? Math.round(Math.sin(lin(t, en('maysilee', 0.556), en('maysilee', 0.597)) * Math.PI) * 22) : 0;
  if (coge) pinon(Math.round(hx + 6), Math.round(hy - 7 - vuela), 1);
  if (vaM < 1) T.brazo(R, Math.round(mxM + 30), 222, Math.round(mxM), Math.round(myM), MANGA_M, -1, { sombra: false });
  AT.luciernaga(R, 236 + Math.sin(t * 1.1) * 6 - tramo(t, en('maysilee', 0.467), en('maysilee', 0.517)) * 40, 108 + Math.sin(t * 2.3) * 3, t, { dir: -1, cara: t > en('maysilee', 0.302) && t < en('maysilee', 0.379) ? 'sonrisa' : t > en('maysilee', 0.451) ? 'sorpresa' : 'normal' });
};

// ═══ PLANO 14 · el borde de la arena (de lado): el piñón choca con el campo invisible y vuelve ═══
const T0 = en('maysilee', 0.724);
const p14 = (t) => {
  const o = { encuadre: 'borde', camara: 'acantilado', luz: 'dia', rebote: [T0, 144, 102], objeto: 'pinon' };
  const g = T.arena50(R, t, o), rb = g.rebote || { impacto: [T0 + 0.8], cae: [T0 + 1.6] };
  const ti = rb.impacto[0], tc = rb.cae[0];
  const u = tramo(t, en('maysilee', 0.652), en('maysilee', 0.693)), hx = Math.round(lerp(96, 128, u)), mx = Math.round(lerp(70, 98, u));
  const lanza = t > T0 - 0.35 && t < T0 + 0.15;
  const r = R.actor(EL.haymitch, hx, g.suelo, t, { dir: 1, anda: u > 0 && u < 1, sostiene: t < T0 - 0.35 ? true : lanza ? [hx + 16, g.suelo - 18] : undefined, brazos: t > tc && t < tc + 0.6,
    sorpresa: t > ti && t < tc + 1.2, salto: t > tc && t < tc + 0.4 ? 3 : 0, habla: t > en('maysilee', 0.892) && Math.sin(t * 8) > 0 });
  if (t < T0 && r.mano) pinon(r.mano[0], r.mano[1] - 3, 1);
  R.actor(EL.maysilee, mx, g.suelo, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: t > ti && t < tc + 1.0, dedo: t > en('maysilee', 0.889), sonrisa: t > en('maysilee', 0.930) });
  T.arena50Delante(R, t, o);
  AT.luciernaga(R, 54 + Math.sin(t * 1.2) * 5, 74 + Math.sin(t * 2.2) * 3 - (t > ti && t < ti + 0.5 ? 6 : 0), t, { dir: 1, cara: t > ti ? 'sorpresa' : 'normal' });
};

T.rodar(E, R, [[0, p1], [en('arena', 0.226), p2], [en('arena', 0.504), p3], [en('arena', 0.765), p4], [en('polen', -0.000), p5], [en('polen', 0.377), p6], [en('polen', 0.705), p7], [en('deposito', 0.000), p8], [en('deposito', 0.329), p9], [en('deposito', 0.569), p10], [en('deposito', 0.801), p11], [en('maysilee', 0.000), p12], [en('maysilee', 0.277), p13], [en('maysilee', 0.650), p14]], {
  año: 50,
  efectos: [[en('arena', 0.094), 'brillo'], [en('arena', 0.390), 'burbujas'], [en('arena', 0.465), 'chof'], [en('arena', 0.526), 'vapor'], [en('arena', 0.648), 'brillo'], [en('arena', 0.725), 'pop'], [en('arena', 0.883), 'cerrojo'],
    [en('polen', 0.170), 'bip'], [en('polen', 0.313), 'interruptor'], [en('polen', 0.598), 'interruptor'], [en('polen', 0.814), 'toc'], [en('polen', 0.912), 'pop'], [en('polen', 0.940), 'pop'],
    [en('deposito', 0.113), 'golpecito'], [en('deposito', 0.333), 'toc'], [en('deposito', 0.528), 'golpecito'], [en('deposito', 0.609), 'golpecito'], [en('deposito', 0.634), 'flash'], [en('deposito', 0.738), 'boom'], [en('deposito', 0.763), 'ola'],
    [en('deposito', 0.815), 'aviso'], [en('deposito', 0.891), 'maquina'], [en('maysilee', 0.126), 'viento'], [en('maysilee', 0.286), 'palmada'], [en('maysilee', 0.556), 'whoosh'],
    [en('maysilee', 0.724), 'whoosh'], [en('maysilee', 0.761), 'boing'], [en('maysilee', 0.805), 'toc']],
});
''')
