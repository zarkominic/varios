# Borrador de escenas del ep43, grupo S3: hm-cosecha y hm-toma (la pausa 1).
# Desde la pasada de movimiento las escenas se editan en su .html; aquí va su código tal cual (los instantes ya en
# en('marca', fracción)), para que generar-escenas.py dé el mismo .html.

E = {}

E['hm-cosecha'] = ('La cosecha', '''// HM-COSECHA (frases 10–12), Juegos 50. Nueve planos; Atom en todos (de luciérnaga; al doble al final, que entra
// para la pausa de hm-toma). LA VIOLENCIA NO SE VE: Woodbine corre de lejos y de espaldas y el plano corta antes.
// 1. la urna de cerca, llena casi hasta la boca: solo el antebrazo de la escolta baja por la boca (por detrás del labio
//    de latón y del cristal), se hunde entre las papeletas, revuelve y saca una por arriba en «bowl»; Atom se asoma;
// 2. contraplano desde el escenario: los chicos de cara, la Veta, la alambrada y el bosque; en «Woodbine» todos le
//    miran; sale al pasillo y en «runs» echa a correr hacia el fondo, de espaldas; dos agentes arrancan; corte;
// 3. el frontón del Edificio de Justicia (sillares biselados con hollín, dentículos, ménsulas, pilastras estriadas, el
//    escudo con el sello bajo el reloj): tras el cristal de la derecha, en un vestíbulo con luz, dos agentes cruzan
//    corriendo hacia la puerta;
//    el minutero salta en «don't» (campana); en «let him» las palomas se sueltan de la cornisa una tras otra; en «get
//    far» alguien corre la cortina de la izquierda y en «far» la pantalla se va a nieve; Atom, triste, se esconde tras
//    el reloj (corta antes de ver nada);
// 4. entre las filas, a ras de suelo: Lenore Dove sale por el pasillo hacia los agentes («goes after»); Haymitch se
//    pone delante con los brazos abiertos («steps in front»); un agente le señala;
// 5. el escenario: el agente sube y se planta; tres tributos en tres de las cuatro marcas, que se miran mientras
//    Drusilla los cuenta (1, 2, 3) en «four tributes»; en «down to three» los tres miran la marca vacía y sale el «?»;
//    Plutarch, joven, levanta su cámara tras la barandilla;
// 6. el borde del escenario (a la derecha, la esquina del Edificio: cornisa, pilastra, farol encendido, la colgadura
//    con su sello y su fleco, una ventana con una paloma en el alféizar, la bajante): Drusilla y Plutarch con su cámara
//    en el filo miran abajo; en «look at the boy» Drusilla
//    señala y la órbita de Atom rodea a Haymitch (junto al escenario, delante de Lenore); en «decide he'll do» sonríe
//    y llega otro agente a por él;
// 7. la claqueta: el «1» se tacha y sale un «2» en «redoes the reaping»; se cierra de golpe en «take»;
// 8. el visor de la cámara: la toma 2; la cámara barre la plaza y se para en el pasillo vacío, los dos agentes vuelven
//    a su sitio; la mano entra, gira el dial en «broadcast» y se va; en «what happened to Woodbine» la órbita rodea el
//    hueco;
// 9. lo que ve Panem: la sala de una casa de distrito al anochecer (papel pintado, la ventana con la Veta, el reloj de
//    péndulo, la lámpara, la alfombra trenzada); en la tele, al fondo a la izquierda, Haymitch sube solo al escenario
//    («walks up onto the stage») y Drusilla aplaude; la familia la mira de espaldas desde el sofá, el pequeño se vuelve
//    hacia su madre; entra el Atom grande para la pausa.''', r'''
const K = hex('#1a1424'), ease = (u) => u * u * (3 - 2 * u), H = (s) => hex(s);
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], bay = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const hh = (x, y, k = 0) => { const v = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return v - Math.floor(v); };
const rgb = (c) => [c & 255, (c >> 8) & 255, (c >> 16) & 255];
const mez = (a, b, u) => { const A = rgb(a), B = rgb(b); return (0xff000000 | (Math.round(A[2] + (B[2] - A[2]) * u) << 16) | (Math.round(A[1] + (B[1] - A[1]) * u) << 8) | Math.round(A[0] + (B[0] - A[0]) * u)) >>> 0; };
const voz = (t) => E.energia(t);
// lo fijo de cada fondo se pinta una vez en su búfer
const CACHE = new Map();
const horno = (k, f) => { if (!CACHE.has(k)) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); CACHE.set(k, b); } return CACHE.get(k); };
const degradado = (x0, x1, y0, y1, cs) => { const n = cs.length - 1; for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(f)), u = f - i; for (let x = x0; x <= x1; x++) R.pset(x, y, u > bay(x, y) ? cs[i + 1] : cs[i]); } };
// nubes de tres tonos, recortadas por arriba de la silueta (lim[x]: la primera y que ya no es cielo)
const NUB = [H('#f2f2f0'), H('#cfd4dc'), H('#a6aebe')];
const nube = (x, y, w, lim, tono = NUB) => { x = Math.round(x); y = Math.round(y);
  const d = (cx, cy, r, c) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r + r) { const X = cx + i, Y = cy + j; if (X >= 0 && X < 320 && Y >= 0 && (!lim || Y < lim[X])) R.pset(X, Y, c); } };
  const n = Math.max(3, Math.round(w / 9));
  for (let k = 0; k < n; k++) d(x + Math.round((k + 0.5) * w / n), y + 2, Math.round(w / n * (0.62 + 0.3 * Math.sin(k * 2.3 + w))), tono[2]);
  for (let k = 0; k < n; k++) d(x + Math.round((k + 0.5) * w / n) - 1, y, Math.round(w / n * (0.55 + 0.3 * Math.sin(k * 2.3 + w))), tono[1]);
  for (let k = 1; k < n - 1; k++) d(x + Math.round((k + 0.3) * w / n) - 1, y - 2, Math.max(1, Math.round(w / n * (0.42 + 0.3 * Math.sin(k * 1.7 + w)))), tono[0]);
};
const nubes = (t, lim, ys) => ys.forEach(([y, w, v], k) => nube(((k * 113 + t * v) % 420) - 60, y, w, lim));
const pajaro = (x, y, t, col) => { x = Math.round(x); y = Math.round(y); const a = Math.floor(t * 9) % 2;
  R.pset(x, y, col); R.pset(x + 1, y, col); for (const d of [-1, 1]) { R.pset(x + (d > 0 ? 2 : -1), y - 1 + a * 2, col); R.pset(x + (d > 0 ? 3 : -2), y - 2 + a * 3, col); } };
// humo de chimenea en bolitas que suben y crecen
const humo = (x, y, t, sem) => { for (let k = 0; k < 5; k++) { const f = ((t * 0.35 + k / 5 + sem) % 1), r = 1 + f * 3.2; R.disco(x + Math.sin(f * 4 + sem) * 2 + f * 6, y - f * 22, r, mez(H('#9a9ca4'), H('#c8cad0'), f)); } };
// la gente de la plaza: chicos y chicas a escala s (≈ ancho de hombros), de cara a la cámara
const PELO = ['#2a2024', '#1e1a1c', '#3a2a20', '#5a3a22', '#a88050', '#2a2024', '#4a3a30'].map(H);
const ROPA = ['#e8e6e0', '#c8ccd4', '#a8a29a', '#d8d0c0', '#8a8e9a', '#b8c0c8', '#9aa6b8', '#c8b8a0'].map(H);
const PIEL = ['#e8bc98', '#c8946a', '#9a6444'].map(H);
const carita = (px, y, s, q, mira, sube = 0, espalda = false) => {
  const ropa = ROPA[Math.floor(q * 8)], ropaS = mez(ropa, K, 0.3), pelo = PELO[Math.floor((q * 7.3 % 1) * 7)], piel = PIEL[Math.floor((q * 13.1 % 1) * 3)];
  const hw = Math.max(2, Math.round(s * 0.55)), ys = Math.round(y - s * 0.5), r = Math.max(1.6, s * 0.36), hy = Math.round(y - s * 0.95) - sube, rr = Math.ceil(r);
  R.rect(px - hw - 1, ys, px + hw + 1, y, K); R.rect(px - hw, ys + 1, px + hw, y, ropa); R.rect(px + hw - 1, ys + 2, px + hw, y, ropaS); R.rect(px - hw, ys + 1, px + hw, ys + 1, mez(ropa, H('#ffffff'), 0.25));
  R.rect(px - 1, ys - 1, px + 1, ys, piel);
  R.disco(px + 0.5, hy, r + 0.9, K); R.disco(px + 0.5, hy, r, espalda && !mira ? pelo : piel);
  if (espalda && !mira) { R.pset(px - rr, hy + 1, piel); R.pset(px + rr + 1, hy + 1, piel); R.pset(px - 1, hy - rr + 1, mez(pelo, H('#ffffff'), 0.3)); return; }
  for (let j = -rr; j <= 0; j++) for (let i = -rr; i <= rr; i++) if (i * i + j * j <= r * r && j < -r * 0.2 + (Math.abs(i) > r * 0.62 ? r * 0.7 : 0)) R.pset(px + i, hy + j, pelo);
  if (s >= 5) { const e = mira; R.pset(px - 1 + e, hy + 1, K); R.pset(px + 2 + e, hy + 1, K); }
  if (q * 19 % 1 < 0.25 && s > 8) { R.rect(px + rr, hy, px + rr, hy + 4, pelo); R.pset(px + rr, hy + 5, H('#a85a4a')); }
};
const filaCaras = (t, x0, x1, y, s, sem, huecos, mirar, espalda = false) => { const paso = Math.max(4, Math.round(s * 1.08));
  for (let x = x0, i = 0; x <= x1; x += paso, i++) { if (huecos && huecos.some(([a, b]) => x + s * 0.6 > a && x - s * 0.6 < b)) continue;
    const q = hh(i, sem), px = Math.round(x + (q - 0.5) * 2), sube = Math.sin(t * 1.3 + i * 1.7 + sem) > 0.88 ? 1 : 0;
    const m = mirar ? mirar(px, y, i) : (Math.sin(t * 0.7 + i * 2.3 + sem) > 0.8 ? (i % 2 ? 1 : -1) : 0);
    carita(px, y, s, q, m, sube, espalda); } };
// un agente de la paz pequeño, de blanco con casco (de lejos); s: alto en px
const agenteMini = (x, y, s, t, anda, dir = 1) => {
  x = Math.round(x); y = Math.round(y); const w = Math.max(2, Math.round(s * 0.22)), p = anda ? Math.floor(t * 8) % 2 : 0, yc = y - Math.round(s * 0.4), yt = y - Math.round(s * 0.74), r = Math.max(1.6, s * 0.15);
  R.rect(x - w - 1, yt - 1, x + w + 1, y, K);
  R.rect(x - w, yc, x - 1, y - p, H('#c8ccd6')); R.rect(x + 1, yc, x + w, y - (anda ? 1 - p : 0), H('#b0b6c2'));
  R.rect(x - w, yt, x + w, yc, H('#f2f4f8')); R.rect(x + (dir > 0 ? w - 1 : -w), yt + 1, x + (dir > 0 ? w : -w + 1), yc, H('#c8ccd6'));
  R.rect(x - w, yc - 1, x + w, yc - 1, H('#3a3a44'));
  R.disco(x + 0.5, yt - r, r + 0.9, K); R.disco(x + 0.5, yt - r, r, H('#f6f8fc')); R.pset(x + (dir > 0 ? 1 : 0), Math.round(yt - r), H('#2a2e3a')); R.pset(x + (dir > 0 ? 2 : -1), Math.round(yt - r), H('#2a2e3a'));
};
// una casa de tablas de la Veta con su tejado de chapa (pies en b), su puerta, su ventana y su chimenea
const casaVeta = (x, b, w, h, sem) => { const q = hh(x, sem, 4), muro = mez(H('#7a6a5a'), H('#9a8a78'), q), tejH = Math.round(h * 0.42), y0 = b - h;
  R.rect(x - 1, y0 + tejH, x + w + 1, b, K); R.rect(x, y0 + tejH + 1, x + w, b, muro);
  for (let i = x + 2; i < x + w; i += 3) R.rect(i, y0 + tejH + 1, i, b - 1, mez(muro, K, 0.25));
  for (let j = 0; j <= tejH; j++) { const a = x - 2 + Math.round((tejH - j) * 0.5), z = x + w + 2 - Math.round((tejH - j) * 0.5); for (let i = a; i <= z; i++) R.pset(i, y0 + j, j === 0 ? H('#4a4e56') : (i % 3 === 0) ? H('#6a6e76') : hh(i, j + x, 6) > 0.86 ? H('#9a6a4a') : H('#8a8e96')); }
  R.rect(x - 2, y0 + tejH, x + w + 2, y0 + tejH, H('#4a4e56'));
  R.rect(x + Math.round(w * 0.25), b - 7, x + Math.round(w * 0.25) + 3, b - 1, H('#3a2a20'));
  const vx = x + Math.round(w * 0.6); R.rect(vx, y0 + tejH + 3, vx + 4, y0 + tejH + 6, H('#3a3e4a')); R.pset(vx + 2, y0 + tejH + 3, H('#5a5e6a'));
  R.rect(x + w - 5, y0 - 3, x + w - 3, y0 + 2, H('#5a4a44')); };
// la cámara del Capitolio en su trípode (de perfil), con su piloto rojo; (x, y) es el asa; dir hacia donde mira
const camaraTripode = (x, y, dir, t, graba = true) => { x = Math.round(x); y = Math.round(y); const X = (i) => x + i * dir;
  for (const [a, b] of [[-5, 0], [0, 0], [5, 0]]) R.linea(X(1), y + 6, X(1 + a), y + 22, K);
  R.linea(X(0), y + 6, X(-4), y + 22, H('#6a6a76')); R.linea(X(2), y + 6, X(6), y + 22, H('#8a8a96'));
  const x0 = Math.min(X(-6), X(10)), x1 = Math.max(X(-6), X(10)); R.rect(x0 - 1, y - 2, x1 + 1, y + 6, K); R.rect(x0, y - 1, x1, y + 5, H('#e8eaf0')); R.rect(x0, y + 3, x1, y + 5, H('#b8bcc8'));
  R.rect(Math.min(X(10), X(15)), y, Math.max(X(10), X(15)), y + 4, K); R.pset(X(14), y + 1, H('#8ad8ff')); R.pset(X(13), y + 2, H('#4a7aa8'));
  R.disco(X(-3), y - 5, 3, K); R.disco(X(4), y - 5, 3, K); R.disco(X(-3), y - 5, 2, H('#d8dce4')); R.disco(X(4), y - 5, 2, H('#d8dce4'));
  const g = (t * 3) % (Math.PI * 2); R.pset(X(-3) + Math.round(Math.cos(g)), y - 5 + Math.round(Math.sin(g)), K); R.pset(X(4) + Math.round(Math.cos(g + 1)), y - 5 + Math.round(Math.sin(g + 1)), K);
  if (graba && Math.sin(t * 6) > 0) R.pset(X(-5), y, H('#ff3030'));
};

const EB = R.nuevo();
// la claqueta pequeña (16 × 14), que Atom lleva al doble con AT.escalado; ang: lo abierta que está
const claquetaMini = (ang, n) => () => { R.rect(1, 5, 16, 15, K); R.rect(2, 6, 15, 14, H('#22242a')); R.rect(2, 9, 15, 9, H('#d8d8d0')); R.numero(String(n), 9, 15, { color: H('#f0e070'), sombra: false });
  for (let u = 0; u <= 15; u++) for (let v = -3; v <= 0; v++) { const x = 1 + u * Math.cos(-ang) - v * Math.sin(-ang), y = 4 + u * Math.sin(-ang) + v * Math.cos(-ang); R.pset(Math.round(x), Math.round(y), v === -3 || v === 0 ? K : Math.floor((u - v) / 3) % 2 ? H('#f2f2ee') : H('#1a1a20')); } };
// la sala de una casa de distrito, al anochecer (lo fijo, en su búfer): papel pintado gastado, zócalo de tablas, suelo,
// la ventana con la Veta, el reloj, el cuadro, la lámpara de pie, el perchero y la tele sobre su mueble, al fondo a
// la izquierda; el sofá va delante, aparte, con la familia de espaldas
const TV = [28, 52, 113, 93];   // el cristal de la tele
const fondoSala = () => horno('sala', () => {
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { const r = (x % 16), mot = ((x + 8) % 16 - 8) ** 2 / 2 + ((y % 18) - 9) ** 2 / 4.5 < 3 && ((x + 8) % 16 - 8) ** 2 / 2 + ((y % 18) - 9) ** 2 / 4.5 > 1.2;
    let c = r < 2 ? H('#9a8a68') : r === 2 ? H('#c8b890') : H('#b4a47e'); if (mot) c = H('#8e7e5c');
    const luz = Math.max(0, 1 - Math.hypot((x - 296) / 60, (y - 70) / 50)) * 0.35, sombra = Math.min(1, Math.abs(x - 170) / 200) * 0.25 + (y < 10 ? (10 - y) * 0.03 : 0);
    c = mez(c, H('#3a2e24'), sombra); if (luz > bay(x, y) * 0.4) c = mez(c, H('#f8d890'), luz); if (hh(x >> 3, y >> 3, 31) > 0.93 && bay(x, y) < 0.4) c = mez(c, H('#7a6a4e'), 0.4); R.pset(x, y, c); }
  // una mancha de humedad
  for (let y = 4; y < 30; y++) for (let x = 226; x < 250; x++) if (Math.hypot((x - 238) / 12, (y - 12) / 14) < 1 && bay(x, y) < 0.3) R.pset(x, y, H('#8a7a58'));
  // el zócalo de tablas y el suelo de madera
  R.rect(0, 108, 319, 110, H('#4a3424')); R.rect(0, 108, 319, 108, H('#8a6a48'));
  for (let y = 111; y < 128; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 12 === 0 ? H('#3a2818') : x % 12 === 1 ? H('#8a6644') : Math.sin(y * 0.7 + (x >> 3) * 1.9) > 0.85 ? H('#5a3e28') : H('#6e4e32'));
  R.rect(0, 126, 319, 129, H('#3a2818'));
  for (let y = 130; y < 180; y++) { const k = Math.floor((y - 130) / 7); for (let x = 0; x < 320; x++) { let c = (y - 130) % 7 === 0 ? H('#3a2818') : k % 2 ? H('#7a5638') : H('#6a4a30');
    if (Math.sin(x * 0.09 + k * 2.7) > 0.86) c = H('#58402a'); if ((x + k * 37) % 61 === 0) c = H('#3a2818'); if (bay(x, y) < 0.05) c = H('#8a6644'); R.pset(x, y, c); } }
  // la alfombra trenzada, ovalada
  const TRZ = ['#8a3a2a', '#b8945a', '#5a6a4a', '#a85a3a', '#c8a870', '#6a4a3a', '#9a6a4a'].map(H);
  for (let y = 142; y < 180; y++) for (let x = 20; x < 300; x++) { const d = Math.hypot((x - 150) / 128, (y - 166) / 22); if (d >= 1) continue; const c = TRZ[Math.floor(d * 7)];
    R.pset(x, y, d > 0.96 ? H('#3a2818') : (x + y * 2) % 4 === 0 ? mez(c, K, 0.25) : c); }
  // la ventana del fondo: el cielo del anochecer, la Veta y sus chimeneas (el humo se pinta en vivo)
  R.rect(160, 22, 218, 92, K); R.rect(161, 23, 217, 91, H('#6a4a30')); R.rect(161, 23, 162, 91, H('#9a7450')); R.rect(216, 23, 217, 91, H('#3a2818'));
  for (let y = 27; y <= 87; y++) for (let x = 165; x <= 213; x++) { const u = (y - 27) / 60 + (bay(x, y) - 0.5) * 0.08; R.pset(x, y, u < 0.35 ? mez(H('#3a3a6a'), H('#7a5a8a'), u / 0.35) : u < 0.7 ? mez(H('#7a5a8a'), H('#e89a6a'), (u - 0.35) / 0.35) : mez(H('#e89a6a'), H('#f0c88a'), (u - 0.7) / 0.3)); }
  R.pset(174, 32, H('#ffffff')); R.pset(203, 38, H('#e8e8f8'));
  for (let x = 165; x <= 213; x++) { const h = 70 + Math.round(4 * Math.sin(x * 0.4)) + ((x >> 3) % 2 ? -4 : 0); for (let y = h; y <= 87; y++) R.pset(x, y, y === h ? H('#4a3a44') : H('#2a2230')); }
  for (const [x, y] of [[172, 76], [190, 72], [206, 76]]) { R.rect(x, y - 6, x + 2, y, H('#2a2230')); R.pset(x + 4, y + 4, H('#f8c860')); R.pset(x + 5, y + 4, H('#f8c860')); }
  R.rect(188, 27, 190, 87, H('#5a3e28')); R.rect(165, 56, 213, 57, H('#5a3e28'));
  R.rect(156, 92, 222, 95, K); R.rect(157, 92, 221, 93, H('#9a7450')); R.rect(157, 94, 221, 94, H('#4a3424'));
  // la barra y las cortinas de flores
  R.rect(152, 18, 226, 19, H('#3a2818')); R.disco(152, 18.5, 2, H('#c89a3a')); R.disco(226, 18.5, 2, H('#c89a3a'));
  for (const [x0, x1] of [[154, 166], [212, 224]]) for (let y = 20; y < 100; y++) for (let x = x0; x <= x1; x++) { const pl = (x - x0) % 4; let c = pl === 0 ? H('#8a4a3a') : pl === 3 ? H('#a85a48') : H('#c87a62'); if ((x * 3 + y * 5) % 23 === 0) c = H('#f0d8a0'); if ((x * 7 + y * 3) % 29 === 0) c = H('#6a8a4a'); R.pset(x, y, c); }
  // el reloj de la pared (el péndulo se pinta en vivo)
  R.rect(137, 30, 151, 72, K); R.rect(138, 31, 150, 71, H('#6a4a30')); R.rect(138, 31, 139, 71, H('#9a7450')); R.disco(144, 38, 6, K); R.disco(144, 38, 5, H('#f2ead6'));
  for (let k = 0; k < 4; k++) R.pset(144 + [0, 4, 0, -4][k], 38 + [-4, 0, 4, 0][k], K); R.linea(144, 38, 144, 35, K); R.linea(144, 38, 147, 39, K);
  R.rect(140, 46, 148, 69, H('#2a1e18')); R.rect(140, 46, 148, 46, H('#9a7450'));
  // el cuadro del prado sobre el sofá
  R.rect(236, 28, 278, 58, K); R.rect(237, 29, 277, 57, H('#a8783a')); R.rect(237, 29, 277, 29, H('#d8a860'));
  for (let y = 32; y <= 54; y++) for (let x = 240; x <= 274; x++) R.pset(x, y, y < 42 ? mez(H('#9ac0d8'), H('#d8e8e8'), (y - 32) / 10) : y < 46 ? H('#6a8a5a') : (x + y) % 5 === 0 ? H('#e8d870') : H('#5a7a3a'));
  R.disco(266, 36, 2, H('#f8f0c0')); R.poligono([[240, 44], [252, 38], [262, 44]], H('#7a9a8a'));
  // la lámpara de pie, a la derecha: pantalla de tela con su luz
  R.rect(299, 84, 300, 128, K); R.rect(294, 127, 305, 129, K);
  R.poligono([[290, 84], [309, 84], [305, 68], [294, 68]], K); R.poligono([[291, 83], [308, 83], [304, 69], [295, 69]], H('#f0d8a0')); R.poligono([[291, 83], [296, 83], [297, 69], [295, 69]], H('#fff0c8')); R.rect(291, 82, 308, 83, H('#c89a5a'));
  // el perchero con un abrigo, a la izquierda
  R.rect(4, 40, 14, 42, H('#3a2818')); R.rect(8, 42, 10, 46, H('#3a2818'));
  R.poligono([[2, 46], [16, 46], [18, 96], [0, 96]], K); R.poligono([[3, 47], [15, 47], [17, 95], [1, 95]], H('#5a5a4a')); R.linea(9, 48, 9, 95, H('#3a3a30')); R.rect(3, 47, 4, 95, H('#7a7a64'));
  // el mueble de la tele y la tele de madera con sus antenas
  R.rect(18, 98, 124, 124, K); R.rect(19, 99, 123, 123, H('#6a4a30')); R.rect(19, 99, 123, 100, H('#9a7450'));
  for (const x0 of [22, 72]) { R.rect(x0, 103, x0 + 46, 120, H('#3a2818')); R.rect(x0 + 1, 104, x0 + 45, 119, H('#7a5638')); for (let y = 105; y < 119; y += 3) R.rect(x0 + 3, y, x0 + 43, y, H('#6a4a30')); R.disco(x0 + (x0 < 50 ? 42 : 4), 111, 1, H('#c89a3a')); }
  R.rect(22, 124, 25, 129, K); R.rect(117, 124, 120, 129, K);
  R.linea(60, 44, 44, 22, K); R.linea(76, 44, 98, 24, K); R.disco(44, 22, 1.5, H('#c8ccd6')); R.disco(98, 24, 1.5, H('#c8ccd6')); R.rect(62, 42, 74, 46, K); R.rect(63, 43, 73, 45, H('#4a4e5a'));
  R.rect(22, 46, 120, 98, K); R.rect(23, 47, 119, 97, H('#7a5232')); R.rect(23, 47, 119, 48, H('#a87a4a')); R.rect(118, 47, 119, 97, H('#4a3220'));
  for (let x = 24; x < 118; x += 5) R.pset(x, 50, H('#5a3c24'));
  R.rect(TV[0] - 2, TV[1] - 2, TV[2] + 2, TV[3] + 2, H('#2a2024')); R.rect(TV[0] - 1, TV[1] - 1, TV[2] + 1, TV[3] + 1, K);
  for (let x = 30; x < 92; x += 2) R.rect(x, 94, x, 96, H('#4a3220')); R.disco(100, 95, 1.6, H('#d8c8a0')); R.disco(108, 95, 1.6, H('#d8c8a0'));
  // la sombra de la tele en la pared
  for (let y = 46; y < 100; y++) for (let x = 120; x < 126; x++) if (bay(x, y) < 0.5) R.pset(x, y, mez(R.pget(x, y), K, 0.25));
});
// el respaldo del sofá, en primer término, por delante de la familia: tela gastada con capitoné, el marco de madera,
// una manta de ganchillo por encima
const sofa = () => horno('sofa', () => {
  for (let y = 161; y < 180; y++) for (let x = 156; x < 320; x++) { const borde = y === 161 || x === 156; let c = borde ? K : y < 165 ? H('#7a5638') : (x + (y >> 2)) % 3 === 0 ? H('#4a5a44') : H('#56684e');
    if (!borde && y === 162) c = H('#a87a4a'); if (!borde && y >= 165 && x > 312) c = mez(c, K, 0.3); R.pset(x, y, c); }
  for (let x = 172; x < 318; x += 26) for (let y = 167; y < 180; y += 9) { R.pset(x, y + 2, H('#2e3a2a')); R.pset(x - 1, y + 1, H('#3a4a36')); R.pset(x + 1, y + 3, H('#6a7c60')); R.pset(x - 3, y + 2, H('#4a5a44')); R.pset(x + 3, y + 2, H('#4a5a44')); }
  for (let x = 160; x < 318; x++) if (bay(x, 165) < 0.5) R.pset(x, 165, H('#3a4a36'));
  // el brazo del sofá, redondo, en la punta de la izquierda
  R.disco(160, 166, 7, K); R.disco(160, 166, 6, H('#56684e')); R.disco(158, 164, 3, H('#6a7c60'));
  // la manta de ganchillo, de cuadros de colores, echada por encima del respaldo
  const MC = ['#c84a3a', '#e8c060', '#4a7ab0', '#e8e0d0'].map(H);
  for (let y = 161; y < 180; y++) for (let x = 262; x < 300; x++) { if (y > 174 + Math.sin(x * 0.6) * 2) continue; const q = ((x - 262) >> 2) + ((y - 161) >> 2); R.pset(x, y, (x - 262) % 4 === 0 || (y - 161) % 4 === 0 ? H('#2a2024') : MC[q % 4]); }
});
// la tele de la sala: dentro, el escenario de la plaza (lo que ve todo Panem), en su búfer
const teleFinal = (t, TT, conAtom = true) => {
  const prev = R.usar(EB);
  const oe = { encuadre: 'plaza', camara: 'escenario', luz: 'dia', urna: 1, pantalla: 'sello' };
  const g = T.distrito(R, t, oe), S = g.suelo;
  R.actor(EL.wyattHM, 108, S, t, { dir: 1 });
  R.actor(EL.maysilee, 127, S, t, { dir: 1 });
  R.actor(EL.louellaHM, 167, S, t, { dir: -1, triste: true });
  const ua = tramo(t, TT.sube, TT.llega), xh = lerp(226, 188, ease(ua));
  R.actor(EL.haymitch, Math.round(xh), S, t, { dir: -1, anda: ua > 0 && ua < 1, triste: ua >= 1 });
  const aplaude = t > TT.llega + 0.1;
  R.actor(EL.drusilla, 147, S, t, { dir: aplaude ? 1 : -1, sonrisa: true, brazos: aplaude && Math.floor(t * 6) % 2 === 0, habla: !aplaude && voz(t) > 0.3 });
  T.distritoDelante(R, t, oe);
  R.usar(prev);
  // la sala
  R.copiar(fondoSala());
  // el humo de las chimeneas de la Veta, por la ventana
  R.recorte([165, 27, 213, 87]); for (const [x, s] of [[173, 0], [207, 0.5]]) for (let k = 0; k < 4; k++) { const f = (t * 0.3 + k / 4 + s) % 1; R.disco(x + f * 6 + Math.sin(f * 5) * 1.5, 68 - f * 30, 1 + f * 2.5, mez(H('#8a7a8a'), H('#c8b0b8'), f)); } R.recorte(null);
  // el péndulo del reloj
  { const a = Math.sin(t * 3.1) * 0.35; R.linea(144, 47, 144 + Math.round(Math.sin(a) * 16), 47 + Math.round(Math.cos(a) * 16), H('#c89a3a')); R.disco(144 + Math.sin(a) * 18, 47 + Math.cos(a) * 18, 2, H('#e8c060')); }
  // la pantalla: la imagen con sus líneas, su viñeta y el reflejo del cristal
  const [x0, y0, x1, y1] = TV, ox = 124, oy = S - 36, B = R.buf, fl = 0.94 + Math.sin(t * 23) * 0.03;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const [r, gg, b] = rgb(EB[(y - y0 + oy) * 320 + (x - x0 + ox)]), v = Math.hypot((x - 70.5) / 46, (y - 72.5) / 24), k = (y % 2 ? 0.86 : 1) * fl * (1 - Math.max(0, v - 0.75) * 1.2);
    B[y * 320 + x] = (0xff000000 | (Math.min(255, Math.round((b * 1.05 + 12) * k)) << 16) | (Math.min(255, Math.round((gg + 6) * k)) << 8) | Math.min(255, Math.round(r * 0.95 * k))) >>> 0; }
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if ((x - x0) + (y - y0) * 0.8 > 60 && (x - x0) + (y - y0) * 0.8 < 66 && bay(x, y) < 0.35) R.pset(x, y, mez(R.pget(x, y), H('#ffffff'), 0.5));
  // la luz azulada de la tele en la alfombra y el suelo, que parpadea
  for (let y = 132; y < 180; y += 1) for (let x = 30; x < 150; x++) { const d = Math.hypot((x - 70) / 80, (y - 132) / 40); if (d < 1 && bay(x, y) < (1 - d) * 0.35 * fl) R.pset(x, y, mez(R.pget(x, y), H('#a8c0f0'), 0.35)); }
  // la luz de la lámpara que tiembla un poco
  if (Math.sin(t * 13) > 0.7) for (let y = 86; y < 108; y++) for (let x = 284; x < 316; x++) if (bay(x, y) < 0.08) R.pset(x, y, H('#f8e0a0'));
  // la familia en el sofá, de espaldas, mirando la tele; en «walks up» el pequeño se vuelve hacia su madre y la abuela
  // asiente cuando Drusilla aplaude
  const vuelve = t > TT.llega - 0.4 ? -1 : 0;
  const FAM = [[190, 166, 22, 0.62, 0, 0], [228, 166, 20, 0.11, 0, 0], [260, 170, 15, 0.47, vuelve, vuelve ? 1 : 0], [292, 166, 18, 0.86, 0, aplaude && Math.floor(t * 3) % 2 ? 1 : 0]];
  for (const [x, y, sz, q, m, sb] of FAM) carita(x, y, sz, q, m, sb, true);
  // la luz de la tele les perfila el pelo por arriba
  for (const [x, y, sz, , , sb] of FAM) { const r = Math.max(1.6, sz * 0.36), hy = Math.round(y - sz * 0.95) - sb; for (let i = -Math.ceil(r); i <= 0; i++) if (bay(x + i, hy) < 0.6 * fl) R.pset(x + i, hy - Math.round(Math.sqrt(Math.max(0, r * r - i * i))), H('#a8c0f0')); }
  { const S2 = sofa(), B2 = R.buf; for (let i = 156 * 320; i < 180 * 320; i++) if (S2[i]) B2[i] = S2[i]; }
  // Atom, de luciérnaga, junto a la lámpara; se va por la derecha justo antes de que entre el Atom grande
  const ul = tramo(t, TT.sube - 0.6, TT.atom - 0.3);
  if (conAtom && ul < 1) T.AT.luciernaga(R, lerp(262, 340, ease(ul)), 100 + Math.sin(t * 2.2) * 3, t, { dir: ul > 0 ? 1 : -1, brillo: 0.8, cara: t > TT.llega - 1 ? 'triste' : 'normal' });
};

const P2 = en('woodbine', 0.4215), P3 = en('woodbine', 0.8659), P4 = en('protege', 0.0608), P5 = en('protege', 0.3870), P6 = en('protege', 0.7330), P7 = en('toma', 0), P8 = en('toma', 0.4408), P9 = en('toma', 0.6944);

// ── 1 · la urna de cerca ─────────────────────────────────────────────────────────────────────────────────────
// la urna, llena casi hasta la boca: SUP_U es la primera fila de papeletas; RX_U, el ancho del cristal en cada fila
const SUP_U = 42, RX_U = (y) => Math.round(44 + 8 * Math.sin((y - 34) / 90 * Math.PI));
const fondoUrna = () => horno('urna', () => {
  // la fachada de piedra con hollín
  for (let y = 0; y < 130; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 12), xo = (fila % 2) * 14, bx = Math.floor((x + xo) / 28), q = hh(bx, fila, 3);
    const junta = y % 12 === 0 || (x + xo) % 28 === 0, hollin = hh(x >> 2, y >> 3, 5) * (1 - y / 160) + (q - 0.5) * 0.3;
    let c = junta ? H('#8a8478') : mez(H('#d8d2c4'), H('#b8b0a2'), q * 0.7 + (bay(x, y) < 0.3 ? 0.12 : 0));
    if (!junta && hollin > 0.55) c = mez(c, H('#6a6460'), (hollin - 0.55) * 1.6);
    if (!junta && (x + xo) % 28 === 1) c = mez(c, H('#f0ece2'), 0.4);
    R.pset(x, y, c); }
  // churretes de hollín
  for (let k = 0; k < 9; k++) { const x = 12 + k * 37 + Math.round(hh(k, 1) * 10); for (let y = 0; y < 40 + hh(k, 2) * 50; y++) if (bay(x, y) < 0.5) R.pset(x, y, H('#7a746c')); }
  // la ventana de la izquierda (cristal oscuro con su reflejo) y la de la derecha
  for (const [x0, x1] of [[10, 52], [270, 312]]) { R.rect(x0 - 3, 14, x1 + 3, 104, H('#8a8478')); R.rect(x0, 18, x1, 100, H('#2a3040'));
    for (let y = 18; y <= 100; y++) for (let x = x0; x <= x1; x++) if ((x - x0) + (y - 18) * 0.5 > 18 && (x - x0) + (y - 18) * 0.5 < 26 && bay(x, y) < 0.6) R.pset(x, y, H('#4a5a74'));
    R.rect(Math.round((x0 + x1) / 2), 18, Math.round((x0 + x1) / 2) + 1, 100, H('#5a5248')); R.rect(x0, 58, x1, 59, H('#5a5248')); R.rect(x0 - 5, 104, x1 + 5, 108, H('#c8c0b0')); R.rect(x0 - 5, 108, x1 + 5, 109, H('#7a7468')); }
  // las tablas del escenario, en perspectiva
  for (let y = 124; y < 180; y++) { const k = Math.floor(Math.pow(y - 120, 0.75)), tabla = k % 2; for (let x = 0; x < 320; x++) { const veta = Math.sin(x * 0.11 + k * 3) * 0.5 + hh(x >> 3, k, 7) * 0.5;
    let c = tabla ? H('#9a7654') : H('#8a6a4a'); if (veta > 0.72) c = H('#7a5a3e'); if (bay(x, y) < 0.08) c = H('#a8845e'); R.pset(x, y, c); }
    if (Math.floor(Math.pow(y + 1 - 120, 0.75)) !== k) for (let x = 0; x < 320; x++) R.pset(x, y, H('#5a4230')); }
  for (let k = 0; k < 14; k++) R.pset(20 + k * 23, 150 + (k % 3) * 9, H('#3a2a20'));
  R.rect(0, 124, 319, 125, H('#c8a87e'));
  // la marca de cinta del suelo
  R.rect(232, 160, 252, 162, H('#e8e0c8')); R.rect(240, 156, 242, 166, H('#e8e0c8'));
  // el pedestal torneado
  for (let y = 120; y < 170; y++) { const w = 26 + Math.round(6 * Math.sin((y - 120) / 50 * Math.PI * 2.2) * (y < 150 ? 0.6 : 1)) + (y > 160 ? 6 : 0); for (let x = 150 - w; x <= 150 + w; x++) {
    const u = (x - (150 - w)) / (2 * w); R.pset(x, y, x === 150 - w || x === 150 + w ? K : u < 0.25 ? H('#c8945e') : u > 0.72 ? H('#5a3a22') : H('#8a5a34')); } }
  R.rect(116, 168, 184, 172, K); R.rect(117, 168, 183, 171, H('#6a4428'));
  for (let x = 118; x < 184; x++) if (bay(x, 173) < 0.6) R.pset(x, 174, H('#5a4230'));
  // la urna: el cuerpo de cristal con las papeletas dentro
  const cx = 150, top = 34, bot = 124, rx = (y) => Math.round(44 + 8 * Math.sin((y - top) / (bot - top) * Math.PI)), dentro = (y) => y > SUP_U;
  for (let y = top; y <= bot; y++) { const w = rx(y); for (let x = cx - w; x <= cx + w; x++) {
    const u = (x - cx + w) / (2 * w); let c;
    if (dentro(y)) { const px = x >> 2, py = (y + (px % 2) * 2) >> 2, q = hh(px, py, 9); c = q > 0.82 ? H('#c8b890') : q > 0.45 ? H('#f4eedc') : q > 0.2 ? H('#e2d8c0') : H('#b8aa8c'); if ((x & 3) === 0 || ((y + (px % 2) * 2) & 3) === 0) c = mez(c, H('#8a7e66'), 0.45); }
    else c = mez(H('#3a3530'), H('#b8b0a2'), 0.3 + 0.25 * Math.sin(y * 0.2));
    c = mez(c, H('#cfe6f0'), 0.18 + (u < 0.15 || u > 0.85 ? 0.25 : 0));
    R.pset(x, y, c); }
    R.pset(cx - w - 1, y, K); R.pset(cx + w + 1, y, K); }
  R.linea(cx - rx(bot), bot + 1, cx + rx(bot), bot + 1, K);
  // los aros de latón de la boca y del pie
  for (const [y, w] of [[top, rx(top) + 2], [bot - 2, rx(bot) + 2]]) { R.rect(cx - w, y - 2, cx + w, y + 3, K); R.rect(cx - w + 1, y - 1, cx + w - 1, y + 2, H('#c89a3a')); R.rect(cx - w + 1, y - 1, cx + w - 1, y - 1, H('#f0d070')); R.rect(cx - w + 1, y + 2, cx + w - 1, y + 2, H('#8a6420')); }
});
const brilloUrna = () => { // los reflejos del cristal, por delante de la mano
  for (let y = 40; y < 118; y++) { const x = 116 + Math.round((y - 40) * 0.12); if (bay(x, y) < 0.75) { R.pset(x, y, H('#ffffff')); R.pset(x + 1, y, H('#e8f4f8')); } if (y > 52 && y < 100 && bay(x + 6, y) < 0.35) R.pset(x + 6, y, H('#ffffff')); }
  for (let y = 46; y < 110; y++) { const x = 184 - Math.round((y - 46) * 0.05); if (bay(x, y) < 0.5) R.pset(x, y, H('#e8f4f8')); }
  R.rect(104, 33, 196, 34, H('#f0d070'));
};
const p1 = (t) => {
  R.copiar(fondoUrna());
  // la guirnalda de banderines de la fachada, que ondea
  for (let x = 0; x < 320; x++) R.pset(x, Math.round(25 + Math.sin(x / 320 * Math.PI * 2) * 3), H('#4a4a54'));
  for (let x = 4; x < 316; x += 12) { const y = Math.round(25 + Math.sin(x / 320 * Math.PI * 2) * 3), m = Math.round(Math.sin(t * 3 + x * 0.3) * 1.5); R.poligono([[x, y], [x + 8, y], [x + 4 + m, y + 8]], x % 24 ? H('#9a9ea8') : H('#e8eaf0')); }
  // los apliques de hierro con su llama que tiembla
  for (const x of [72, 196]) { R.rect(x - 1, 52, x + 1, 60, K); R.rect(x - 4, 44, x + 4, 52, K); R.rect(x - 3, 45, x + 3, 51, Math.sin(t * 9 + x) > 0 ? H('#f0d070') : H('#e8b040')); R.rect(x - 1, 47, x + 1, 50, H('#fff4c0')); R.rect(x - 5, 43, x + 5, 43, H('#3a3a44')); }
  // una paloma en el alféizar de la ventana, que mueve la cabeza
  { const b = Math.sin(t * 2.6) > 0.4 ? 1 : 0; R.rect(26, 99, 34, 103, K); R.rect(27, 100, 33, 102, H('#8a90a0')); R.rect(33 + b, 97, 36 + b, 100, H('#6a7080')); R.pset(37 + b, 98, H('#e8a040')); R.pset(29, 101, H('#a8b0c0')); }
  // la colgadura gris con su sello, que se mece
  const m = Math.sin(t * 1.2) * 1.5;
  for (let y = 0; y < 100; y++) { const dx = Math.round(m * y / 100); for (let x = 214; x <= 250; x++) R.pset(x + dx, y, (x === 214 || x === 250) ? H('#5a5e68') : (x - 214) % 6 === 0 ? H('#7a7e88') : H('#8e929c')); }
  { const dx = Math.round(m * 0.6); R.disco(232 + dx, 56, 10, H('#5a5e68')); R.disco(232 + dx, 56, 8, H('#c8a040')); R.disco(232 + dx, 56, 5, H('#8e929c')); R.poligono([[232 + dx, 50], [236 + dx, 60], [228 + dx, 60]], H('#c8a040')); }
  for (let x = 214; x <= 250; x += 4) R.poligono([[x + Math.round(m), 100], [x + 4 + Math.round(m), 100], [x + 2 + Math.round(m), 104]], H('#7a7e88'));
  // motas de polvo en la luz
  for (let k = 0; k < 16; k++) { const x = (k * 53 + t * (3 + k % 3)) % 320, y = 20 + ((k * 37 + t * 2) % 90); if (bay(Math.round(x), Math.round(y)) < 0.5) R.pset(Math.round(x), Math.round(y), H('#fff6e0')); }
  // una paloma que picotea en las tablas
  { const x = Math.round(272 - ((t * 6) % 40)), pic = Math.sin(t * 5) > 0.3 ? 1 : 0; R.rect(x - 4, 166, x + 3, 170, K); R.rect(x - 3, 167, x + 2, 169, H('#8a90a0')); R.rect(x - 5 + 0, 164 + pic, x - 3, 166 + pic, H('#6a7080')); R.pset(x - 6, 166 + pic, H('#e8a040')); R.pset(x + 3, 167, H('#4a5060')); R.pset(x, 171, H('#e86a5a')); R.pset(x - 2, 171, H('#e86a5a')); }
  // la mano de la escolta: solo el antebrazo, que baja de arriba por la boca de la urna, se hunde entre las papeletas,
  // revuelve y sube con una; el codo queda en el borde de arriba (la manga visible no pasa de ~44 px)
  const en1 = tramo(t, 0.4, 1.6), mete = tramo(t, 2.2, 3.0), saca = tramo(t, en('woodbine', 0.1916), en('woodbine', 0.2506)), va = tramo(t, en('woodbine', 0.3095), en('woodbine', 0.3832));
  let wx = lerp(202, 184, ease(en1)), wy = lerp(-26, 22, ease(en1));   // a la derecha de la barra del año
  wy += lerp(0, 24, ease(mete)) - lerp(0, 30, ease(saca)); wx += Math.sin(t * 7) * 2.5 * mete * (1 - saca) + lerp(0, 22, ease(va)); wy -= lerp(0, 64, ease(va));
  wx = Math.round(wx); wy = Math.round(wy);
  if (en1 > 0 && va < 1) {
    T.brazo(R, wx + 26, wy - 86, wx, wy, '#5a2a7a', -1, { codo: [wx + 10, wy - 45], sombra: false });
    // la papeleta, doblada, entre los dedos (sale de entre las otras)
    if (saca > 0.25) { const sx = wx - 9, sy = wy + 4; R.rect(sx - 6, sy - 1, sx + 6, sy + 8, K); R.rect(sx - 5, sy, sx + 5, sy + 7, H('#fbf6e8')); R.rect(sx - 5, sy + 3, sx + 5, sy + 3, H('#c8bca0')); R.rect(sx - 5, sy, sx - 4, sy + 7, H('#e8e0cc')); R.pset(sx + 4, sy + 1, H('#ffffff')); }
    // lo que está dentro de la urna va detrás del labio de latón y del cristal; bajo las papeletas, no se ve
    const U = fondoUrna(), B = R.buf;
    for (let y = 35; y <= 123; y++) { const w = y <= 37 ? RX_U(34) + 2 : RX_U(y); for (let x = Math.max(0, wx - 24); x <= Math.min(319, wx + 30); x++) { if (Math.abs(x - 150) > w) continue; const i = y * 320 + x;
      if (y <= 37 || y >= SUP_U) B[i] = U[i]; else if (B[i] !== U[i]) B[i] = mez(B[i], H('#cfe6f0'), 0.3); } }
  }
  // las papeletas de arriba se revuelven mientras la mano busca
  if (mete > 0 && saca < 1) for (let k = 0; k < 10; k++) { const a = t * 6 + k * 0.7, x = Math.round(wx - 10 + Math.cos(a) * 9 + k), y = Math.round(SUP_U + 1 + Math.abs(Math.sin(a * 1.3)) * 3); R.rect(x, y, x + 3, y + 1, H('#f8f2e2')); R.pset(x, y + 2, H('#b8aa8c')); }
  brilloUrna();
  // Atom, de luciérnaga, se asoma por la izquierda de la urna
  const ab = Math.sin(t * 2) * 2, sale = tramo(t, 0.6, 1.8);
  T.AT.luciernaga(R, lerp(60, 84, ease(sale)), 92 + ab, t, { dir: 1, brillo: 0.8, cara: t > en('woodbine', 0.1916) && t < en('woodbine', 0.3390) ? 'sorpresa' : 'normal' });
};

// ── 2 · el contraplano desde el escenario: Woodbine corre ─────────────────────────────────────────────────────
const LIM_A = new Int16Array(320);
const pasL = (y) => lerp(153, 124, (y - 98) / 72), pasR = (y) => lerp(173, 202, (y - 98) / 72);
const fondoA = () => horno('contra', () => {
  degradado(0, 319, 0, 72, [H('#7e8ea6'), H('#97a2b6'), H('#b2bac8'), H('#ccd0d6')]);
  const r1 = (x) => Math.round(42 + 7 * Math.sin(x / 41 + 0.5) + 4 * Math.sin(x / 17)), r2 = (x) => Math.round(54 + 5 * Math.sin(x / 29 + 2) + 3 * Math.sin(x / 11));
  for (let x = 0; x < 320; x++) { LIM_A[x] = r1(x); for (let y = r1(x); y < 80; y++) R.pset(x, y, y - r1(x) < 3 && bay(x, y) < 0.6 ? H('#9aa2b4') : bay(x, y) < 0.15 ? H('#8a92a4') : H('#7a8496'));
    for (let y = r2(x); y < 82; y++) R.pset(x, y, y - r2(x) < 2 ? H('#76829a') : bay(x, y) < 0.2 ? H('#6a7686') : H('#5e6a7a')); }
  // el bosque de pinos detrás de la alambrada
  for (let x = -6; x < 326; x += 5) { const h = 8 + Math.round(hh(x, 3) * 6), b = 82 + Math.round(Math.sin(x / 9) * 1.5); R.poligono([[x, b - h], [x - 4, b], [x + 4, b]], H('#2f3d35')); R.poligono([[x, b - h], [x + 4, b], [x + 1, b]], H('#3e5244')); }
  R.rect(0, 82, 319, 86, H('#26322c'));
  for (let y = 86; y < 94; y++) for (let x = 0; x < 320; x++) R.pset(x, y, bay(x, y) < 0.35 ? H('#647858') : H('#56684a'));
  for (let x = 0; x < 320; x += 3) R.pset(x + (x % 2), 87 + (x % 5), H('#7a8c62'));
  // la alambrada (postes y cuatro hilos de espino) con su hueco
  for (let k = 0; k < 4; k++) for (let x = 0; x < 320; x++) { const xi = x % 14; let y = 91 - k * 3 + Math.round(Math.sin(xi / 14 * Math.PI) * 1); if (x > 152 && x < 176 && k < 2) y += Math.round(Math.sin((x - 152) / 24 * Math.PI) * (3 - k)); R.pset(x, y, H('#5e5e68')); if (x % 5 === 2) R.pset(x, y - 1, H('#a4a4ae')); }
  for (let x = 2; x < 320; x += 14) { R.rect(x, 78, x + 1, 93, H('#5e4632')); R.pset(x, 78, H('#8a6a4c')); R.pset(x, 79, H('#8a6a4c')); }
  // la mina: el castillete con su chimenea, a la izquierda
  for (let y = 34; y < 96; y++) { const w = Math.round(3 + (y - 34) * 0.16); R.pset(36 - w, y, H('#3a3a44')); R.pset(36 + w, y, H('#3a3a44')); if (y % 6 === 0) for (let x = 36 - w; x <= 36 + w; x++) R.pset(x, y, H('#4a4a54')); if (y % 6 < 3) { R.pset(36 - w + (y % 6) * 2, y, H('#4a4a54')); R.pset(36 + w - (y % 6) * 2, y, H('#4a4a54')); } }
  R.rect(58, 40, 63, 96, H('#5a4a44')); R.rect(57, 38, 64, 41, H('#3a3034')); for (let y = 44; y < 96; y += 4) R.rect(58, y, 63, y, H('#4a3c36'));
  // las casas de la Veta en dos filas, con una calle en medio que sale hacia la alambrada
  const casa = (x, b, w, h, sem) => { const q = hh(x, sem, 4), muro = mez(H('#7a6a5a'), H('#9a8a78'), q), tejH = Math.round(h * 0.45);
    R.rect(x - 1, b - h - 1, x + w + 1, b, K); R.rect(x, b - h + tejH, x + w, b, muro);
    for (let i = x + 2; i < x + w; i += 3) R.rect(i, b - h + tejH + 1, i, b - 1, mez(muro, K, 0.25));
    for (let j = 0; j <= tejH; j++) { const a = x - 1 + Math.round(j * 0.2), z = x + w + 1 - Math.round(j * 0.2); for (let i = a; i <= z; i++) R.pset(i, b - h + j, (i % 3 === 0) ? H('#6a6e76') : hh(i, j + x, 6) > 0.86 ? H('#9a6a4a') : H('#8a8e96')); }
    R.rect(x - 1, b - h + tejH, x + w + 1, b - h + tejH, H('#4a4e56'));
    R.rect(x + Math.round(w * 0.25), b - 7, x + Math.round(w * 0.25) + 3, b - 1, H('#3a2a20'));
    const vx = x + Math.round(w * 0.6); R.rect(vx, b - h + tejH + 3, vx + 4, b - h + tejH + 6, H('#3a3e4a')); R.pset(vx + 2, b - h + tejH + 3, H('#5a5e6a'));
    R.rect(x + w - 4, b - h - 4, x + w - 2, b - h + 2, H('#5a4a44')); };
  // la tierra apisonada de la calle que sale de la plaza, con sus roderas y un charco
  for (let y = 92; y < 102; y++) for (let x = 0; x < 320; x++) R.pset(x, y, bay(x, y) < 0.3 ? H('#7a7262') : (x % 9 === 0 && y > 95) ? H('#5a5448') : H('#6a6456'));
  for (let y = 93; y < 102; y++) { R.pset(Math.round(lerp(160, 150, (y - 92) / 10)), y, H('#4e483e')); R.pset(Math.round(lerp(166, 176, (y - 92) / 10)), y, H('#4e483e')); }
  for (let x = 160; x < 170; x++) R.pset(x, 98, H('#a8b0c0'));
  for (const [x, w, h] of [[-4, 20, 12], [22, 18, 11], [66, 22, 13], [92, 18, 11], [116, 20, 12], [190, 18, 12], [214, 22, 13], [240, 18, 11], [264, 22, 12], [292, 26, 13]]) casa(x, 92, w, h, 1);

  for (const [x, w, h] of [[0, 24, 15], [30, 22, 14], [58, 26, 16], [90, 22, 14], [116, 24, 15], [184, 26, 15], [216, 22, 14], [244, 24, 16], [274, 22, 14], [300, 24, 15]]) casa(x, 101, w, h, 2);
  // los adoquines de la plaza, en perspectiva
  for (let y = 101; y < 170; y++) { const f = (y - 98) / 72, hfila = 2 + Math.round(f * 5), fila = Math.floor(Math.pow(y - 98, 0.82)), ww = 4 + Math.round(f * 9), off = (fila % 2) * Math.round(ww / 2);
    const borde = Math.floor(Math.pow(y + 1 - 98, 0.82)) !== fila;
    for (let x = 0; x < 320; x++) { const bx = Math.floor((x + off) / ww), q = hh(bx, fila, 8); let c = mez(H('#8e8878'), H('#a8a090'), q);
      if (borde || (x + off) % ww === 0) c = H('#5a564c'); else if (bay(x, y) < 0.12) c = mez(c, H('#c8c0b0'), 0.5); else if (bay(x, y) > 0.9) c = mez(c, H('#4a463e'), 0.4);
      R.pset(x, y, c); } }
  // los cordones del pasillo, con sus postes
  for (const lado of [0, 1]) { for (let y = 104; y < 170; y += 12) { const x = Math.round(lado ? pasR(y) + 2 : pasL(y) - 2), h = 3 + Math.round((y - 98) / 12); R.rect(x, y - h, x + 1, y, H('#4a3a2c')); R.pset(x, y - h, H('#c8a040')); }
    for (let y = 104; y < 168; y++) { const x = Math.round(lado ? pasR(y) + 2 : pasL(y) - 2), h = 3 + Math.round((y - 98) / 12) - 1; if ((y % 12) < 11) R.pset(x, y - h + Math.round(Math.sin((y % 12) / 12 * Math.PI) * 2), H('#8a3a3a')); } }
  // el borde del escenario, abajo, con la guirnalda de banderines del faldón
  for (let y = 170; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 170 ? H('#c8a87e') : (y - 170) % 4 === 0 ? H('#6a4e38') : hh(x >> 4, y >> 2, 2) > 0.8 ? H('#7a5a3e') : H('#8a6a4c'));
});
const FILAS_A = [[110, 7, 21], [122, 9, 22], [136, 11, 23], [152, 13, 24], [170, 15, 25]];
const WB = [130, 136];   // Woodbine, en la tercera fila, junto al pasillo
const p2 = (t) => {
  R.copiar(fondoA());
  nubes(t, LIM_A, [[24, 40, 1.2], [36, 26, 2.2], [18, 52, 0.7]]);
  for (let k = 0; k < 3; k++) pajaro(((t * (9 + k * 3) + k * 90) % 360) - 20, 30 + k * 6 + Math.sin(t + k) * 2, t + k, H('#3a3e4a'));
  for (const [x, y, s] of [[34, 66, 0], [100, 80, 0.3], [228, 80, 0.6], [306, 79, 0.8], [61, 36, 0.5]]) humo(x, y, t, s);
  // la rueda del castillete
  { const a = t * 2.2; R.disco(36, 32, 5, K); R.disco(36, 32, 4, H('#5a5a64')); R.disco(36, 32, 2, H('#2a2a30')); for (let k = 0; k < 4; k++) R.linea(36, 32, 36 + Math.round(Math.cos(a + k * 1.57) * 4), 32 + Math.round(Math.sin(a + k * 1.57) * 4), H('#8a8a96')); }
  // la cuerda de banderines grises, de poste a poste
  for (let x = 0; x < 320; x++) R.pset(x, Math.round(26 + Math.sin(x / 320 * Math.PI) * 12), H('#4a4a54'));
  for (let x = 6; x < 316; x += 11) { const y = Math.round(26 + Math.sin(x / 320 * Math.PI) * 12), m = Math.round(Math.sin(t * 3 + x * 0.3) * 1.5); R.poligono([[x, y], [x + 7, y], [x + 3 + m, y + 7]], x % 22 ? H('#9a9ea8') : H('#c8ccd4')); }
  const nombre = en('woodbine', 0.5424), sale = en('woodbine', 0.6559), corre = en('woodbine', 0.7532), pk = en('woodbine', 0.8254);
  // los dos agentes del fondo, junto a la calle; arrancan cuando él corre
  const ua = tramo(t, pk, pk + 1.5);
  agenteMini(lerp(128, 146, ua), 100, 12, t, ua > 0, 1); agenteMini(lerp(196, 180, ua), 100, 12, t, ua > 0, -1);
  // los chicos, fila a fila; en «Woodbine» todos le miran
  const mira = (px, y) => t > nombre ? (Math.abs(px - WB[0]) < 6 ? 0 : px < WB[0] ? 1 : -1) : null;
  const uRun = tramo(t, corre, P3), uSal = tramo(t, sale, corre);
  for (const [y, s, sem] of FILAS_A) {
    const hue = [[pasL(y) - 1, pasR(y) + 1]]; if (y === WB[1]) hue.push([WB[0] - 4, WB[0] + 4]);
    filaCaras(t, 2, 318, y, s, sem, hue, (px, yy, i) => mira(px) ?? (Math.sin(t * 0.7 + i * 2.3 + sem) > 0.8 ? (i % 2 ? 1 : -1) : 0));
    if (y === WB[1]) {
      if (t < corre) { const x = Math.round(lerp(WB[0], 162, ease(uSal))); carita(x, WB[1] - (t > nombre ? 2 : 0), 12, 0.05, t > nombre && t < sale ? 0 : 1, 0); }
    }

  }
  // las palomas del pasillo levantan el vuelo cuando él pasa
  for (let k = 0; k < 4; k++) { const x0 = 150 + k * 5, y0 = 150 - k * 9, v = tramo(t, corre + 0.2 + k * 0.15, corre + 1.4 + k * 0.15), x = Math.round(x0 + v * (k % 2 ? 40 : -40)), y = Math.round(y0 - v * 50);
    if (v <= 0) { R.rect(x - 2, y - 2, x + 2, y, H('#7a8090')); R.pset(x - 3, y - 2 + (Math.sin(t * 4 + k) > 0 ? 1 : 0), H('#5a6070')); } else pajaro(x, y, t + k, H('#6a7080')); }
  // los dos agentes de delante, en las esquinas
  // Woodbine corre por el pasillo, de espaldas, cada vez más pequeño (camisa clara sobre los adoquines oscuros)
  if (t >= corre) { const yy = lerp(140, 114, uRun), s = lerp(26, 17, uRun), x = lerp(162, 163, uRun), p = Math.floor(t * 11) % 2;
    const X = Math.round(x), Y = Math.round(yy), hw = Math.max(2, Math.round(s * 0.2)), yc = Y - Math.round(s * 0.42), yh = Y - Math.round(s * 0.8), r = Math.max(1.8, s * 0.16);
    R.rect(X - 2 - (p ? 2 : 0), yc, X - 1 - (p ? 2 : 0), Y, K); R.rect(X + 1 + (p ? 0 : 2), yc, X + 2 + (p ? 0 : 2), Y - (p ? 0 : 2), K);
    R.rect(X - hw - 1, yh + 1, X + hw + 1, yc + 1, K); R.rect(X - hw, yh + 2, X + hw, yc, H('#f4f0d8')); R.rect(X - hw, yc - 1, X + hw, yc, H('#4a4a54')); R.rect(X + hw - 1, yh + 2, X + hw, yc - 2, H('#c8c4ac'));
    R.linea(X - hw - 1, yh + 3, X - hw - 3 - p, yh + 6 + p, K); R.linea(X + hw + 1, yh + 3, X + hw + 3 + (1 - p), yh + 6 + (1 - p), K);
    R.disco(X + 0.5, yh, r + 1, K); R.disco(X + 0.5, yh, r, H('#4a3220')); R.pset(X - 1, yh - 1, H('#6a4a30')); }
  // en «Woodbine» la órbita de Atom le señala entre los chicos
  { const u = tramo(t, nombre, nombre + 0.5); if (u > 0 && t < corre) T.AT.anillo(R, Math.round(lerp(WB[0], 162, ease(uSal))), WB[1] - 10, 11, 12, t, u); }

  R.actor(EL.agentePaz, 2, 178, t, { dir: 1, sorpresa: t > corre }); R.actor(EL.agentePaz, 302, 178, t, { dir: -1, anda: t > pk, sorpresa: t > corre });
  T.AT.luciernaga(R, 268 + Math.sin(t * 1.1) * 6, 60 + Math.sin(t * 2.3) * 3, t, { dir: -1, brillo: 0.8, cara: t > corre ? 'sorpresa' : t > nombre ? 'triste' : 'normal' });
};

// ── 3 · el frontón del Edificio de Justicia: el reloj y las palomas ──────────────────────────────────────────
const LIM_F = new Int16Array(320);
// una paloma de la cornisa (x centro, y pies), mirando a dir; pic: baja la cabeza; vuela: aleteo (0 o 1, el ala arriba o abajo)
const paloma = (x, y, dir, pic = 0, vuela = -1) => { x = Math.round(x); y = Math.round(y); const X = (i) => x + i * dir, G = H('#8a90a0'), GS = H('#6a7080'), GL = H('#b4bac6');
  const px = (i, j, c) => R.pset(X(i), y + j, c);
  // el contorno y el cuerpo (un óvalo de 9 × 5), la cola hacia atrás
  for (let j = -6; j <= -1; j++) for (let i = -5; i <= 3; i++) { const d = ((i + 1) / 4.6) ** 2 + ((j + 3.5) / 2.9) ** 2; if (d <= 1.25) px(i, j, d > 0.85 ? K : j <= -5 ? GL : j >= -2 ? GS : G); }
  for (const [i, j] of [[-6, -4], [-7, -4], [-7, -3], [-6, -3]]) px(i, j, K); px(-6, -4, GS);
  // el ala plegada con sus dos barras oscuras, o abierta si vuela
  if (vuela < 0) { for (let i = -3; i <= 1; i++) px(i, -4, GS); px(-2, -3, H('#3a3e4a')); px(0, -3, H('#3a3e4a')); }
  else { const up = vuela === 0; const pts = up ? [[X(-3), y - 5], [X(2), y - 5], [X(-4), y - 13], [X(-1), y - 12]] : [[X(-3), y - 3], [X(2), y - 3], [X(-5), y + 4], [X(-2), y + 4]];
    R.poligono([pts[0], pts[1], pts[3], pts[2]], K); R.poligono([[pts[0][0] + dir, pts[0][1] + (up ? -1 : 1)], [pts[1][0] - dir, pts[1][1] + (up ? -1 : 1)], [pts[3][0], pts[3][1] + (up ? 1 : -1)], [pts[2][0] + dir, pts[2][1] + (up ? 1 : -1)]], GL); }
  // la cabeza con el cuello tornasolado, el ojo y el pico
  const hy = -8 + pic; for (let j = hy - 1; j <= hy + 3; j++) for (let i = 2; i <= 6; i++) if ((i - 4) ** 2 + (j - hy - 1) ** 2 <= 5) px(i, j, ((i - 4) ** 2 + (j - hy - 1) ** 2 > 2.5) ? K : H('#7a8090'));
  px(4, hy, K); px(5, hy, H('#e8eaf0')); px(7, hy + 1, H('#e8a040')); px(3, hy + 3, H('#5a9a7a')); px(2, -5, H('#8a6aa0'));
  if (vuela < 0) { px(-1, 0, H('#e86a5a')); px(1, 0, H('#e86a5a')); } };
const fondoF = () => horno('fronton', () => {
  degradado(0, 319, 0, 70, [H('#7e8ea6'), H('#98a3b6'), H('#b6bdc9')]);
  for (let x = 0; x < 320; x++) LIM_F[x] = Math.round(70 - 52 * (1 - Math.abs(x - 150) / 150));
  // la piedra: sillares con su bisel (luz arriba y a la izquierda, sombra abajo y a la derecha), poros y hollín
  for (let x = 0; x < 320; x++) for (let y = LIM_F[x]; y < 180; y++) { const fila = Math.floor(y / 10), xo = (fila % 2) * 12, q = hh(Math.floor((x + xo) / 24), fila, 11), jy = y % 10, jx = (x + xo) % 24, junta = jy === 0 || jx === 0;
    let c = junta ? H('#7e786c') : mez(H('#d4cec0'), H('#b4ac9e'), q * 0.8);
    if (!junta) { if (jy === 1 || jx === 1) c = mez(c, H('#f4f0e6'), 0.45); else if (jy === 9 || jx === 23) c = mez(c, H('#6a645c'), 0.35); if (hh(x, y, 13) > 0.965) c = mez(c, H('#6a645c'), 0.5); }
    const ho = hh(x >> 2, y >> 3, 12) * (y < 90 ? 1 : 0.6); if (!junta && ho > 0.6) c = mez(c, H('#6a6460'), (ho - 0.6) * 1.5); R.pset(x, y, c); }
  // churretes de hollín que bajan de las cornisas
  for (let k = 0; k < 22; k++) { const x = 6 + k * 14 + Math.round(hh(k, 3) * 8), y0 = k % 2 ? LIM_F[x] + 6 : 106, l = 8 + hh(k, 4) * 22;
    for (let y = y0; y < y0 + l && y < 180; y++) if (bay(x, y) < 0.7 - (y - y0) / l * 0.5) { R.pset(x, y, mez(R.pget(x, y), H('#4a4640'), 0.45)); if (hh(k, 5) > 0.5) R.pset(x + 1, y, mez(R.pget(x + 1, y), H('#4a4640'), 0.25)); } }
  // las cornisas inclinadas del frontón (dos molduras con su sombra) y sus dentículos
  for (let x = 0; x < 320; x++) { const y = LIM_F[x]; R.pset(x, y, K); R.pset(x, y + 1, H('#f0ece2')); R.pset(x, y + 2, H('#c8c0b0')); R.pset(x, y + 3, H('#8a8478')); R.pset(x, y + 4, H('#6a645c'));
    const d = x % 5 < 3; R.pset(x, y + 5, d ? H('#d8d2c4') : H('#5a544c')); R.pset(x, y + 6, d ? H('#a8a090') : H('#5a544c')); R.pset(x, y + 7, mez(R.pget(x, y + 7), H('#4a4640'), 0.35)); }
  // la cornisa de abajo (donde se posan las palomas), el friso con sus dentículos y las ménsulas
  R.rect(0, 92, 319, 92, K); R.rect(0, 93, 319, 95, H('#ece6da')); R.rect(0, 96, 319, 97, H('#a8a090')); R.rect(0, 98, 319, 100, H('#6a645c'));
  for (let x = 0; x < 320; x++) if (bay(x, 94) < 0.12) R.pset(x, 94, H('#c8c0b0'));
  for (let x = 2; x < 320; x += 8) { R.rect(x, 101, x + 4, 104, H('#c8c0b0')); R.rect(x, 101, x, 104, H('#ece6da')); R.rect(x, 105, x + 4, 105, H('#6a645c')); }
  for (const x of [8, 100, 112, 182, 194, 306]) { R.rect(x - 1, 100, x + 6, 112, K); R.rect(x, 101, x + 5, 104, H('#ece6da')); R.rect(x + 1, 105, x + 4, 108, H('#d4cec0')); R.rect(x + 2, 109, x + 3, 111, H('#b4ac9e')); R.pset(x + 5, 102, H('#8a8478')); R.rect(x + 4, 105, x + 4, 109, H('#8a8478')); R.disco(x + 2.5, 103, 1, H('#a8a090')); }
  // dos pilastras estriadas flanquean la colgadura, con su capitel y su sombra
  for (const x0 of [104, 184]) { R.rect(x0 - 1, 112, x0 + 13, 180, K); R.rect(x0, 113, x0 + 12, 180, H('#d8d2c4')); R.rect(x0, 113, x0 + 1, 180, H('#f0ece2')); R.rect(x0 + 11, 113, x0 + 12, 180, H('#8a8478'));
    for (const i of [3, 6, 9]) for (let y = 117; y < 180; y++) R.pset(x0 + i, y, y % 2 ? H('#a8a090') : H('#b8b0a2'));
    R.rect(x0 - 2, 112, x0 + 14, 116, H('#ece6da')); R.rect(x0 - 2, 116, x0 + 14, 116, H('#6a645c')); R.rect(x0 - 2, 112, x0 + 14, 112, K);
    for (let y = 113; y < 180; y++) if (bay(x0 + 13, y) < 0.5) R.pset(x0 + 14, y, mez(R.pget(x0 + 14, y), K, 0.3)); }
  // dos ventanas altas: marco moldurado, clave, alféizar; la de la izquierda refleja el cielo; la de la derecha da a un
  // vestíbulo con luz (por ahí cruzan los agentes)
  for (const x0 of [30, 236]) { R.rect(x0 - 5, 111, x0 + 55, 180, K); R.rect(x0 - 4, 112, x0 + 54, 180, H('#c8c0b0')); R.rect(x0 - 4, 112, x0 - 3, 180, H('#ece6da')); R.rect(x0 + 53, 112, x0 + 54, 180, H('#8a8478')); R.rect(x0 - 1, 115, x0 + 51, 180, H('#6a645c'));
    if (x0 === 30) for (let y = 116; y < 180; y++) for (let x = x0; x <= x0 + 50; x++) { let c = mez(H('#4a5670'), H('#222a38'), (y - 116) / 64 + (bay(x, y) - 0.5) * 0.15);
      if (Math.hypot((x - x0 - 16) / 12, (y - 128) / 4) < 1 && bay(x, y) < 0.5) c = H('#6a7690'); if ((x - x0) + (y - 116) * 0.6 > 20 && (x - x0) + (y - 116) * 0.6 < 30 && bay(x, y) < 0.55) c = H('#5a6a86'); R.pset(x, y, c); }
    else for (let y = 116; y < 180; y++) for (let x = x0; x <= x0 + 50; x++) { let c = mez(H('#9a7a54'), H('#5a4434'), (y - 116) / 58 + (bay(x, y) - 0.5) * 0.12);
      if (y > 170) c = (x + (y >> 1)) % 6 < 3 ? H('#6a5038') : H('#584030');
      if (x > x0 + 6 && x < x0 + 18 && y > 128) c = y < 131 ? H('#4a3628') : H('#2a2024');             // la puerta del fondo, abierta y oscura
      if (Math.hypot(x - x0 - 38, y - 130) < 7 && bay(x, y) < 0.6) c = mez(c, H('#f8e0a0'), 0.5);   // el aplique que ilumina
      R.pset(x, y, c); }
    if (x0 > 100) { R.rect(x0 + 36, 127, x0 + 40, 132, K); R.rect(x0 + 37, 128, x0 + 39, 131, H('#fff0b8')); }
    R.rect(x0 + 24, 116, x0 + 26, 180, H('#5a5248')); R.rect(x0, 146, x0 + 50, 147, H('#5a5248'));
    R.rect(x0 - 7, 106, x0 + 57, 111, K); R.rect(x0 - 6, 107, x0 + 56, 110, H('#d4cec0')); R.rect(x0 - 6, 107, x0 + 56, 107, H('#f0ece2')); R.rect(x0 - 6, 110, x0 + 56, 110, H('#8a8478'));
    R.poligono([[x0 + 20, 104], [x0 + 30, 104], [x0 + 28, 114], [x0 + 22, 114]], K); R.poligono([[x0 + 21, 105], [x0 + 29, 105], [x0 + 27, 113], [x0 + 23, 113]], H('#e4ded0')); R.linea(x0 + 28, 105, x0 + 27, 113, H('#8a8478')); }
  // el reloj del frontón: aro de bronce, esfera de marfil y doce marcas
  const cx = 150, cy = 56; R.disco(cx, cy, 17, K); R.disco(cx, cy, 16, H('#8a6420')); R.disco(cx, cy, 14, H('#c89a3a')); R.disco(cx, cy, 12, H('#f2ead6'));
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; R.pset(cx + Math.round(Math.cos(a) * 10), cy + Math.round(Math.sin(a) * 10), K); if (k % 3 === 0) R.pset(cx + Math.round(Math.cos(a) * 9), cy + Math.round(Math.sin(a) * 9), K); }
  for (let y = cy - 12; y < cy + 12; y++) for (let x = cx - 12; x < cx + 12; x++) if (Math.hypot(x - cx + 4, y - cy + 4) < 6 && bay(x, y) < 0.3) R.pset(x, y, H('#ffffff'));
  for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; R.pset(cx + Math.round(Math.cos(a) * 15), cy + Math.round(Math.sin(a) * 15), k % 2 ? H('#f0d070') : H('#6a4a18')); }
  // el escudo tallado bajo el reloj, con el sello del Capitolio en oro
  R.poligono([[139, 75], [161, 75], [161, 83], [150, 91], [139, 83]], K); R.poligono([[140, 76], [160, 76], [160, 83], [150, 90], [140, 83]], H('#c8c0b0'));
  R.poligono([[140, 76], [150, 76], [150, 90], [140, 83]], H('#d8d2c4')); R.linea(140, 76, 160, 76, H('#f0ece2')); R.linea(160, 77, 160, 83, H('#8a8478'));
  R.poligono([[150, 78], [155, 87], [145, 87]], K); R.poligono([[150, 80], [153, 86], [147, 86]], H('#d8a840')); R.pset(150, 80, H('#f8e080'));
  for (const d of [-1, 1]) { R.linea(150 + d * 13, 78, 150 + d * 20, 86, H('#8a8478')); R.linea(150 + d * 13, 79, 150 + d * 19, 87, H('#f0ece2')); }
  // el relieve del tímpano: dos picos de minero cruzados y dos gavillas de trigo, tallados en la piedra
  for (const [x0, d] of [[96, 1], [204, -1]]) { for (let k = 0; k < 18; k++) { R.pset(x0 + d * k, 82 - k, H('#7a7468')); R.pset(x0 + d * k, 83 - k, H('#f0ece2')); }
    R.poligono([[x0 + d * 15, 64], [x0 + d * 22, 70], [x0 + d * 19, 72], [x0 + d * 13, 67]], H('#9a948a')); R.linea(x0 + d * 15, 64, x0 + d * 22, 70, H('#f0ece2'));
    for (let k = 0; k < 7; k++) { R.linea(x0 - d * 18 + k * 2 * d, 84, x0 - d * 22 + k * 3 * d, 70 - (k % 2) * 3, H('#8a8478')); R.disco(x0 - d * 22 + k * 3 * d, 69 - (k % 2) * 3, 1.5, H('#c8c0b0')); } }
  // grietas y matas de hierba en las juntas
  R.linea(250, 70, 256, 78, H('#6a645c')); R.linea(256, 78, 254, 86, H('#6a645c')); R.linea(60, 84, 66, 90, H('#6a645c')); R.linea(222, 130, 226, 140, H('#6a645c'));
  for (const [x, y] of [[262, 91], [40, 91], [118, 112]]) { R.pset(x, y - 2, H('#5a7a3a')); R.pset(x + 1, y - 3, H('#6a8a4a')); R.pset(x - 1, y - 2, H('#4a6a2a')); R.pset(x + 2, y - 2, H('#4a6a2a')); }
  // las cortinas grises tras los cristales (las de la derecha, recogidas: deja ver el vestíbulo)
  for (const [x0, w] of [[30, 9], [236, 5]]) for (let y = 116; y < 180; y++) { for (let x = x0; x < x0 + w; x++) R.pset(x, y, (x - x0) % 3 === 0 ? H('#4a4e5a') : H('#5e6270')); for (let x = x0 + 51 - w; x <= x0 + 50; x++) R.pset(x, y, (x - x0) % 3 === 0 ? H('#4a4e5a') : H('#5e6270')); }
});
const p3 = (t) => {
  R.copiar(fondoF());
  nubes(t, LIM_F, [[28, 44, 2.0], [44, 30, 3.2], [20, 36, 1.2]]);
  pajaro(((t * 14) % 360) - 20, 22 + Math.sin(t) * 2, t, H('#3a3e4a'));
  // la bandera gris del mástil del vértice, que ondea
  R.rect(230, 18, 231, 46, H('#3a3a44')); R.disco(230.5, 18, 1.5, H('#c8a040'));
  for (let x = 0; x < 22; x++) { const y = 20 + Math.round(Math.sin(t * 5 - x * 0.4) * 1.2 * x / 22); for (let j = 0; j < 9; j++) R.pset(232 + x, y + j, j === 0 || j === 8 ? H('#5a5e68') : (x + j) % 5 === 0 ? H('#7a7e88') : H('#9a9ea8')); }
  // las agujas del reloj (el minutero salta en «peacekeepers»)
  const cx = 150, cy = 56, SALTA = en('woodbine', 0.9070), sal = t > SALTA ? 1 : 0, am = -Math.PI / 2 + (0.6 + sal * 0.105) * Math.PI * 2, ah = -Math.PI / 2 + 0.31 * Math.PI * 2;
  R.linea(cx, cy, cx + Math.round(Math.cos(ah) * 6), cy + Math.round(Math.sin(ah) * 6), K); R.linea(cx, cy, cx + Math.round(Math.cos(am) * 9), cy + Math.round(Math.sin(am) * 9), K); R.disco(cx, cy, 1, H('#8a6420'));
  if (sal && t < SALTA + 0.2) { R.pset(cx + Math.round(Math.cos(am) * 12), cy + Math.round(Math.sin(am) * 12), H('#ffffff')); }
  // la colgadura gris bajo la cornisa, que el aire mueve
  const m = Math.sin(t * 1.4) * 1.2 + tramo(t, en('woodbine', 0.9320), en('woodbine', 0.9900)) * (1 - tramo(t, P4 - 1, P4)) * Math.sin(t * 9) * 2;
  for (let y = 106; y < 180; y++) { const dx = Math.round(m * (y - 106) / 74); for (let x = 132; x <= 168; x++) R.pset(x + dx, y, x === 132 || x === 168 ? H('#5a5e68') : (x - 132) % 6 === 0 ? H('#7a7e88') : H('#8e929c')); }
  { const dx = Math.round(m * 0.5); R.disco(150 + dx, 136, 11, H('#5a5e68')); R.disco(150 + dx, 136, 9, H('#c8a040')); R.disco(150 + dx, 136, 6, H('#8e929c')); R.poligono([[150 + dx, 130], [155 + dx, 141], [145 + dx, 141]], H('#c8a040')); }
  // la pantalla grande del poste, a la derecha: el sello; en «don't let him» se va a nieve
  const nieve = t > en('woodbine', 0.9830);
  R.rect(288, 64, 320, 112, K); R.rect(290, 66, 319, 110, H('#1a1e3a'));
  R.recorte([290, 66, 319, 110]);
  if (nieve) { for (let y = 66; y <= 110; y++) for (let x = 290; x < 320; x++) R.pset(x, y, hh(x, y, Math.floor(t * 20)) > 0.5 ? H('#d8dce8') : H('#5a5e70')); }
  else { R.disco(310, 88, 12, H('#8a6420')); R.disco(310, 88, 10, H('#c89a3a')); R.disco(310, 88, 7, H('#1a1e3a')); R.poligono([[310, 82], [315, 93], [305, 93]], H('#e8c060')); }
  R.recorte(null); R.rect(300, 112, 303, 180, H('#3a3a44'));
  // las palomas de la cornisa: picotean y, en «let him», arrancan a volar una tras otra hacia arriba
  const sueltan = en('woodbine', 0.9320);
  [20, 56, 90, 124, 178, 214, 248, 276].forEach((x0, k) => { const d = [3, 1, 5, 0, 6, 2, 7, 4][k] * 0.22, v = tramo(t, sueltan + d, sueltan + 1.8 + d), dir = k % 2 ? 1 : -1;
    if (v <= 0) paloma(x0, 91, dir, Math.sin(t * 3 + k * 2) > 0.6 ? 1 : 0);
    else if (v < 1) { const u = ease(v); paloma(x0 + dir * u * 200, 91 - u * 64 - Math.sin(v * Math.PI) * 6, dir, 0, Math.floor(t * 12 + k) % 2); } });
  // tras el cristal de la derecha, dos agentes cruzan corriendo el vestíbulo hacia la puerta (recortados al hueco)
  const HV = [241, 117, 281, 179];
  R.recorte(HV);
  // (R.rect no respeta el recorte: mientras se pintan, sus rectángulos van punto a punto)
  { const rr = R.rect; R.rect = (x0, y0, x1, y1, c) => { for (let y = Math.max(y0, HV[1]); y <= Math.min(y1, HV[3]); y++) for (let x = Math.max(x0, HV[0]); x <= Math.min(x1, HV[2]); x++) R.pset(x, y, c); };
    for (const d of [0, 0.55]) { const v = tramo(t, P3 + 0.2 + d, P3 + 2.6 + d); if (v > 0 && v < 1) agenteMini(lerp(296, 230, v), 176, 30, t, true, -1); }
    // el reflejo del cristal, por delante de ellos
    for (let y = HV[1]; y <= HV[3]; y++) for (let x = HV[0]; x <= HV[2]; x++) if ((x - 236) + (y - 116) * 0.6 > 22 && (x - 236) + (y - 116) * 0.6 < 27 && bay(x, y) < 0.3) R.pset(x, y, H('#e8eef4'));
    R.rect = rr; }
  R.recorte(null);
  for (const x0 of [30, 236]) { R.rect(x0 + 24, 116, x0 + 26, 180, H('#5a5248')); R.rect(x0, 146, x0 + 50, 147, H('#5a5248')); R.rect(x0 + 24, 116, x0 + 24, 180, H('#7a7268')); }
  // en «get far» alguien de dentro corre la cortina de la ventana de la izquierda: el edificio no quiere mirar
  { const v = ease(tramo(t, en('woodbine', 0.9660), en('woodbine', 0.9660) + 1.1)); if (v > 0) { const a = Math.round(39 + v * 16), b = Math.round(71 - v * 16);
    for (let y = 116; y < 180; y++) { for (let x = 39; x <= a; x++) R.pset(x, y, (x - a) % 3 === 0 ? H('#4a4e5a') : H('#5e6270')); for (let x = b; x <= 71; x++) R.pset(x, y, (x - b) % 3 === 0 ? H('#4a4e5a') : H('#5e6270')); }
    R.linea(a, 116, a, 179, H('#7a7e8c')); R.linea(b, 116, b, 179, H('#3a3e4a')); } }
  // una pluma que cae dando vueltas
  { const v = tramo(t, sueltan + 0.4, P4); if (v > 0) { const x = Math.round(118 + Math.sin(v * 8) * 6), y = Math.round(90 + v * 70); R.pset(x, y, H('#e8eaf0')); R.pset(x + 1, y + 1, H('#a8acb8')); } }
  // Atom, triste, se esconde detrás del reloj
  const u = tramo(t, en('woodbine', 0.9070), en('woodbine', 0.9830));
  T.AT.luciernaga(R, lerp(206, 174, ease(u)), lerp(44, 50, u) + Math.sin(t * 2) * 1.5, t, { dir: -1, brillo: 0.7, cara: t > en('woodbine', 0.9070) ? 'triste' : t > P3 + 0.2 ? 'sorpresa' : 'normal' });
};

// ── 4 · entre las filas, a ras de suelo: Lenore Dove y Haymitch ──────────────────────────────────────────────
const LIM_B = new Int16Array(320);
const fondoB = () => horno('filas', () => {
  degradado(0, 319, 0, 46, [H('#8292aa'), H('#a0aabc'), H('#c4c9d2')]);
  for (let x = 0; x < 320; x++) LIM_B[x] = 46;
  // tejados de la Veta al fondo, a los lados
  for (let x = 0; x < 320; x++) { const h = 36 + Math.round(Math.abs(Math.sin(x / 13)) * 6) + (x % 26 < 3 ? -4 : 0); for (let y = h; y < 60; y++) R.pset(x, y, (x % 3 === 0) ? H('#6a6e76') : H('#7e828a')); LIM_B[x] = Math.min(LIM_B[x], h); }
  // las casas de la Veta a los dos lados de la plaza, en dos filas
  for (const [x, b, w, h] of [[-6, 62, 22, 14], [18, 64, 20, 13], [40, 66, 24, 15], [250, 66, 22, 14], [274, 64, 22, 13], [298, 62, 24, 15], [-2, 78, 26, 17], [26, 80, 24, 16], [52, 82, 20, 15], [248, 82, 22, 15], [272, 80, 24, 16], [298, 78, 24, 17]]) casaVeta(x, b, w, h, 3);
  for (let y = 82; y < 86; y++) for (let x = 0; x < 320; x++) R.pset(x, y, bay(x, y) < 0.4 ? H('#6a6458') : H('#7a7466'));

  // la fachada del Edificio de Justicia, lejos, con su frontón, el reloj y las colgaduras
  const fx0 = 70, fx1 = 250;
  for (let y = 14; y < 84; y++) for (let x = fx0; x <= fx1; x++) { const tri = y < 34 && Math.abs(x - 160) > (y - 14) * 4.5; if (tri) continue; const q = hh(x >> 3, y >> 2, 14); R.pset(x, y, (y % 5 === 0 || (x + (Math.floor(y / 5) % 2) * 4) % 8 === 0) ? H('#9a948a') : mez(H('#d2ccbe'), H('#b2aa9c'), q * 0.8)); }
  for (let x = fx0; x <= fx1; x++) { const y = Math.max(14, Math.round(14 + Math.abs(x - 160) / 4.5)); if (y <= 34) { R.pset(x, y, K); R.pset(x, y + 1, H('#f0ece2')); LIM_B[x] = Math.min(LIM_B[x], y); } }
  R.rect(fx0, 34, fx1, 35, H('#6a645c'));
  R.disco(160, 26, 5, K); R.disco(160, 26, 4, H('#f2ead6')); R.linea(160, 26, 160, 23, K); R.linea(160, 26, 162, 27, K);
  for (const x of [96, 120, 200, 224]) { R.rect(x, 40, x + 8, 66, H('#7a7e88')); R.disco(x + 4, 50, 2, H('#c8a040')); }
  R.rect(140, 42, 180, 50, H('#c8c0b0')); for (let x = 142; x < 180; x += 3) R.rect(x, 43, x, 49, H('#8a8478'));
  R.rect(148, 54, 172, 84, H('#4a3426')); R.rect(150, 56, 170, 84, H('#5a4030')); R.linea(160, 56, 160, 84, H('#3a2a20'));
  // el escenario, lejos: tablas, las dos urnas y el micrófono
  R.rect(84, 70, 236, 84, H('#8a6a4a')); R.rect(84, 70, 236, 71, H('#b08a62')); for (let x = 84; x < 236; x += 7) R.rect(x, 72, x, 84, H('#6a4e38'));
  for (const x of [104, 216]) { R.rect(x - 7, 56, x + 7, 69, H('#9aaab4')); R.rect(x - 6, 60, x + 6, 68, H('#f0e8d4')); R.rect(x - 8, 55, x + 8, 56, H('#c89a3a')); R.rect(x - 3, 69, x + 3, 70, H('#6a4428')); }
  R.rect(159, 58, 160, 70, K); R.disco(159.5, 57, 1.5, H('#3a3a44'));
  // las dos pantallas grandes sobre sus postes
  for (const [x0, x1, y0] of [[6, 58, 24], [262, 314, 22]]) { R.rect(x0 - 2, y0 - 2, x1 + 2, y0 + 30, K); R.rect(Math.round((x0 + x1) / 2) - 1, y0 + 30, Math.round((x0 + x1) / 2) + 1, 84, H('#3a3a44')); for (let x = x0 - 2; x <= x1 + 2; x++) LIM_B[x] = Math.min(LIM_B[x], y0 - 2); }
  // los adoquines del primer término
  for (let y = 84; y < 180; y++) { const f = (y - 84) / 96, fila = Math.floor(Math.pow(y - 82, 0.85)), ww = 6 + Math.round(f * 16), off = (fila % 2) * Math.round(ww / 2), borde = Math.floor(Math.pow(y + 1 - 82, 0.85)) !== fila;
    for (let x = 0; x < 320; x++) { const q = hh(Math.floor((x + off) / ww), fila, 15); let c = mez(H('#8a8476'), H('#a69e8e'), q); if (borde || (x + off) % ww === 0) c = H('#585448'); else if (bay(x, y) < 0.1) c = mez(c, H('#c8c0b0'), 0.5); R.pset(x, y, c); } }
  // un charco con el cielo
  for (let y = 168; y < 176; y++) for (let x = 30; x < 74; x++) if (((x - 52) / 22) ** 2 + ((y - 172) / 4) ** 2 < 1) R.pset(x, y, bay(x, y) < 0.3 ? H('#c4c9d2') : H('#8a96a8'));
});
const pantallaSello = (t, x0, y0, x1, y1) => { R.rect(x0, y0, x1, y1, H('#1a1e3a')); R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y += 2) R.linea(x0, y, x1, y, H('#22284a'));
  const cx = Math.round((x0 + x1) / 2), cy = Math.round((y0 + y1) / 2); R.disco(cx, cy, 11, H('#8a6420')); R.disco(cx, cy, 9, H('#c89a3a')); R.disco(cx, cy, 6, H('#1a1e3a')); R.poligono([[cx, cy - 5], [cx + 4, cy + 4], [cx - 4, cy + 4]], H('#e8c060'));
  const b = Math.round(y0 + ((t * 20) % (y1 - y0))); R.linea(x0, b, x1, b, H('#3a4070')); R.recorte(null); };
const p4 = (t) => {
  R.copiar(fondoB());
  nubes(t, LIM_B, [[22, 40, 1.6], [32, 28, 2.6]]);
  pantallaSello(t, 6, 24, 58, 52); pantallaSello(t + 1, 262, 22, 314, 50);
  // las filas de los chicos, de espaldas, mirando al escenario; giran la cabeza hacia el lío
  const lio = en('protege', 0.0193), mira = (px) => t > lio ? (px < 200 ? 1 : -1) : 0;
  for (const [y, s, sem] of [[96, 6, 31], [104, 7, 32], [114, 8, 33], [126, 10, 34]]) filaCaras(t, 2, 318, y, s, sem, [[150, 172]], (px, yy, i) => (Math.sin(t * 0.9 + i * 1.7 + sem) > 0.2 ? mira(px) : 0), true);
  // el cordón de terciopelo, a la altura de las rodillas, con su hueco en el pasillo
  const cordon = () => { for (const [a, b] of [[0, 148], [176, 320]]) { for (let x = a; x < b; x++) { const xi = (x - a) % 44, y = 146 + Math.round(Math.sin(xi / 44 * Math.PI) * 3); R.pset(x, y, H('#5a1a24')); R.pset(x, y + 1, H('#a83a4a')); }
      for (let x = a; x <= b; x += 44) { R.rect(x - 1, 138, x + 1, 158, K); R.rect(x, 139, x, 157, H('#c8a040')); R.disco(x + 0.5, 138, 2, H('#e8c060')); R.rect(x - 3, 157, x + 3, 159, H('#3a3a44')); } } };
  // los de detrás del cordón (suelo 152): chicos que miran
  R.actor(EL.tributoChica, 22, 152, t, { dir: 1, sorpresa: t > en('protege', 0.1012) });
  R.actor(EL.tributoChico, 274, 152, t, { dir: -1, sorpresa: t > en('protege', 0.2473), triste: t < en('protege', 0.2473) });
  // Lenore Dove: del lado de las chicas sale por el pasillo y va hacia los agentes
  const ul = tramo(t, en('protege', 0.1006), en('protege', 0.1947)), xl = lerp(70, 176, ease(ul)), sl = lerp(152, 166, tramo(t, en('protege', 0.1362), en('protege', 0.1830)));
  // Haymitch: del lado de los chicos da un paso y se pone delante de ella con los brazos abiertos
  const uh = tramo(t, en('protege', 0.2222), en('protege', 0.2707)), xh = lerp(232, 196, ease(uh)), sh = lerp(152, 166, uh);
  // los agentes, que llegan por la derecha
  const ua = tramo(t, P4, en('protege', 0.1947)), para = t > en('protege', 0.2853);
  const lenore = () => R.actor(EL.lenore, Math.round(xl), Math.round(sl), t, { dir: 1, anda: ul > 0 && ul < 1, enfado: ul > 0 && t < en('protege', 0.2531), sorpresa: t >= en('protege', 0.2531), triste: t > en('protege', 0.3350) });
  const hay = () => R.actor(EL.haymitch, Math.round(xh), Math.round(sh), t, { dir: uh > 0 && uh < 1 ? -1 : 1, anda: uh > 0 && uh < 1, brazos: uh >= 1, enfado: uh >= 1 });
  if (sl < 158) lenore(); if (sh < 158) hay();
  cordon();
  if (sl >= 158) lenore(); if (sh >= 158) hay();
  R.actor(EL.agentePaz, Math.round(lerp(330, 240, ease(ua))), 168, t, { dir: -1, anda: ua > 0 && ua < 1, dedo: para && Math.sin(t * 3) > -0.4, enfado: para });
  R.actor(EL.agentePaz, Math.round(lerp(350, 266, ease(ua))), 170, t, { dir: -1, anda: ua > 0 && ua < 1 });
  // una plumita de colores se le cae a Lenore y baja meciéndose
  { const v = tramo(t, en('protege', 0.1538), en('protege', 0.3233)); if (v > 0 && v < 1) { const x = Math.round(140 + v * 10 + Math.sin(v * 9) * 5), y = Math.round(132 + v * 34); R.pset(x, y, H('#e8483a')); R.pset(x + 1, y + 1, H('#f0c840')); R.pset(x + 2, y + 2, H('#3a8ad8')); } }
  T.AT.luciernaga(R, lerp(120, 170, tramo(t, en('protege', 0.1012), en('protege', 0.2765))) + Math.sin(t * 1.5) * 4, 108 + Math.sin(t * 2.4) * 3, t, { dir: 1, brillo: 0.8, cara: t > en('protege', 0.2473) ? 'sorpresa' : 'triste' });
};

// ── 5 · el escenario: tres tributos en cuatro marcas ─────────────────────────────────────────────────────────
const p5 = (t) => {
  const o = { encuadre: 'plaza', camara: 'escenario', luz: 'dia', urna: 1, pantalla: 'sello' };
  const g = T.distrito(R, t, o), S = g.suelo;
  const c1 = en('protege', 0.5693), c2 = en('protege', 0.5863), c3 = en('protege', 0.6038), tres = en('protege', 0.6885);
  // Maysilee mira a Wyatt al oír «2»; Wyatt se vuelve hacia Louella en «3»; en «down to three» los tres miran la marca vacía
  R.actor(EL.maysilee, 93, S, t, { dir: 1, triste: t < c2, sorpresa: t > tres, salto: t > tres && t < tres + 0.25 ? 1 : 0 });
  R.actor(EL.wyattHM, 123, S, t, { dir: t > c2 + 0.1 && t < tres ? 1 : t > tres ? 1 : -1, habla: t > en('protege', 0.4752) && t < c1 - 0.3 ? 0.6 : 0, sorpresa: t > tres });
  R.actor(EL.louellaHM, 183, S, t, { dir: t > tres ? 1 : -1, triste: true, salto: t > c3 && t < c3 + 0.2 ? 1 : 0 });
  // Drusilla llega al micrófono, se presenta en «escort» y cuenta con el dedo
  const ud = tramo(t, P5, en('protege', 0.4109)), cuenta = t > c1 - 0.2 && t < tres + 0.4, xd = Math.round(lerp(170, 146, ease(ud)));
  const dd = t < c1 ? 1 : t < c3 + 0.15 ? -1 : 1;
  R.actor(EL.drusilla, xd, S, t, { dir: dd, anda: ud > 0 && ud < 1, dedo: cuenta, sonrisa: t > en('protege', 0.4051) && t < en('protege', 0.4752), sorpresa: t > tres, salto: t > en('protege', 0.4109) && t < en('protege', 0.4285) ? 1 : 0 });
  // el agente sube por la izquierda y se planta en su sitio, firme, de cara a los tributos
  { const ua = tramo(t, P5 + 0.2, P5 + 1.6); R.actor(EL.agentePaz, Math.round(lerp(4, 40, ease(ua))), S, t, { dir: 1, anda: ua > 0 && ua < 1 }); }
  // el joven cámara, tras la barandilla, levanta la cámara en «young cameraman»
  const up = tramo(t, en('protege', 0.4752), en('protege', 0.5044)), pl = R.actor(EL.plutarch, 262, S + 2, t, { dir: -1, sostiene: [254, S - 14 - Math.round(up * 3)] });
  T.distritoDelante(R, t, o);
  camaraTripode(pl.mano[0] - 2, pl.mano[1] - 3, -1, t, up > 0);
  // los números de la cuenta, sobre cada uno, y el «?» sobre la marca vacía
  for (const [n, x, t0] of [['1', 100, c1], ['2', 130, c2], ['3', 190, c3]]) { const u = tramo(t, t0, t0 + 0.2); if (u > 0) R.numero(n, x - 1, S - 30 - Math.round(u * 4), { tam: 8, centro: true }); }
  { const u = tramo(t, tres, tres + 0.25); if (u > 0) { const y = S - 36 - Math.round(ease(u) * 6) + Math.round(Math.sin(t * 4) * 1.5); R.icono('?', 214, y, H('#e8483a'), K, 2); R.rect(212, S - 1, 228, S, H('#f0e8c8')); } }
  T.AT.luciernaga(R, lerp(250, 222, tramo(t, en('protege', 0.6506), tres)) + Math.sin(t * 1.4) * 3, lerp(70, 92, tramo(t, en('protege', 0.6506), tres)) + Math.sin(t * 2.2) * 2, t, { dir: -1, brillo: 0.8, cara: t > en('protege', 0.6564) ? 'triste' : 'normal' });
};

// ── 6 · el borde del escenario: le eligen ────────────────────────────────────────────────────────────────────
const LIM_C = new Int16Array(320);
const HB = [92, 120];   // Haymitch entre los chicos (pies)
const fondoC = () => horno('borde', () => {
  degradado(0, 319, 0, 66, [H('#7e8ea6'), H('#9aa4b8'), H('#bcc2cc'), H('#d0d2d6')]);
  const r1 = (x) => Math.round(44 + 6 * Math.sin(x / 33 + 1.4) + 4 * Math.sin(x / 13 + 0.3));
  for (let x = 0; x < 320; x++) { LIM_C[x] = r1(x); for (let y = r1(x); y < 74; y++) R.pset(x, y, y - r1(x) < 2 ? H('#94a0b2') : bay(x, y) < 0.2 ? H('#7c8698') : H('#6e7a8c')); }
  for (let x = -4; x < 326; x += 5) { const h = 7 + Math.round(hh(x, 5) * 5); R.poligono([[x, 72 - h], [x - 4, 72], [x + 4, 72]], H('#33433a')); }
  R.rect(0, 72, 319, 76, H('#2a362f'));
  // la Veta: una fila de casas
  for (let x = -6; x < 240; x += 24) casaVeta(x, 90, 20, 14, 7);
  // la plaza (adoquines, en picado)
  for (let y = 88; y < 180; y++) { const fila = Math.floor((y - 88) / 3), off = (fila % 2) * 3; for (let x = 0; x < 320; x++) { const q = hh(Math.floor((x + off) / 6), fila, 16); R.pset(x, y, (y - 88) % 3 === 0 || (x + off) % 6 === 0 ? H('#5a564c') : mez(H('#8e8878'), H('#a8a090'), q)); } }
  // la esquina del Edificio de Justicia a la derecha: sillares biselados con poros y hollín, la cornisa con sus
  // dentículos, la pilastra estriada con capitel y basa, una ventana con su alféizar, la bajante y el soporte del farol
  for (let y = 0; y < 180; y++) for (let x = 236; x < 320; x++) { const fila = Math.floor(y / 11), xo = (fila % 2) * 13, jy = y % 11, jx = (x + xo) % 26, q = hh(Math.floor((x + xo) / 26), fila, 17), junta = jy === 0 || jx === 0;
    let c = junta ? H('#7e786c') : mez(H('#d4cec0'), H('#b4ac9e'), q * 0.8);
    if (!junta) { if (jy === 1 || jx === 1) c = mez(c, H('#f4f0e6'), 0.45); else if (jy === 10 || jx === 25) c = mez(c, H('#6a645c'), 0.35); if (hh(x, y, 19) > 0.965) c = mez(c, H('#6a645c'), 0.5); if (hh(x >> 2, y >> 3, 18) > 0.66) c = mez(c, H('#6a6460'), 0.4); }
    R.pset(x, y, c); }
  for (let k = 0; k < 6; k++) { const x = 254 + k * 11 + Math.round(hh(k, 7) * 5), l = 14 + hh(k, 8) * 30; for (let y = 14; y < 14 + l; y++) if (bay(x, y) < 0.75 - (y - 14) / l * 0.6) R.pset(x, y, mez(R.pget(x, y), H('#4a4640'), 0.45)); }
  R.rect(234, 0, 319, 9, K); R.rect(236, 0, 319, 2, H('#ece6da')); R.rect(236, 3, 319, 4, H('#c8c0b0')); R.rect(236, 5, 319, 6, H('#8a8478'));
  for (let x = 236; x < 320; x++) { const d = x % 5 < 3; R.pset(x, 7, d ? H('#d8d2c4') : H('#5a544c')); R.pset(x, 8, d ? H('#a8a090') : H('#5a544c')); }
  for (let x = 236; x < 320; x++) if (bay(x, 10) < 0.5) R.pset(x, 10, mez(R.pget(x, 10), K, 0.3));
  // la pilastra con su luz a la izquierda y su sombra a la derecha
  R.rect(234, 0, 235, 179, K); R.rect(236, 10, 250, 179, H('#d0c8b8')); R.rect(236, 10, 238, 179, H('#f0ece2')); R.rect(248, 10, 250, 179, H('#7a7468'));
  for (const i of [241, 244]) for (let y = 20; y < 140; y++) R.pset(i, y, y % 2 ? H('#a8a090') : H('#b8b0a2'));
  R.rect(234, 10, 252, 18, K); R.rect(235, 11, 251, 13, H('#f0ece2')); R.rect(235, 14, 251, 16, H('#c8c0b0')); R.rect(235, 17, 251, 17, H('#7a7468'));
  R.rect(234, 138, 252, 146, K); R.rect(235, 139, 251, 141, H('#e4ded0')); R.rect(235, 142, 251, 145, H('#b4ac9e'));
  for (let y = 10; y < 180; y++) if (bay(251, y) < 0.6) R.pset(251, y, mez(R.pget(251, y), K, 0.35));
  // la ventana bajo la colgadura: marco moldurado, clave, cristal que refleja el cielo, alféizar
  R.rect(262, 106, 308, 152, K); R.rect(263, 107, 307, 151, H('#c8c0b0')); R.rect(263, 107, 264, 151, H('#ece6da')); R.rect(306, 107, 307, 151, H('#8a8478'));
  for (let y = 111; y <= 146; y++) for (let x = 267; x <= 303; x++) { let c = mez(H('#4a5670'), H('#222a38'), (y - 111) / 36 + (bay(x, y) - 0.5) * 0.15); if ((x - 267) + (y - 111) * 0.6 > 14 && (x - 267) + (y - 111) * 0.6 < 21 && bay(x, y) < 0.5) c = H('#5a6a86'); R.pset(x, y, c); }
  R.rect(284, 111, 286, 146, H('#5a5248')); R.rect(267, 127, 303, 128, H('#5a5248'));
  R.poligono([[280, 103], [290, 103], [288, 112], [282, 112]], K); R.poligono([[281, 104], [289, 104], [287, 111], [283, 111]], H('#e4ded0'));
  R.rect(259, 146, 311, 151, K); R.rect(260, 147, 310, 149, H('#e4ded0')); R.rect(260, 147, 310, 147, H('#f6f2ea')); R.rect(260, 150, 310, 150, H('#6a645c'));
  // la bajante de hierro con sus abrazaderas
  R.rect(313, 10, 317, 179, K); R.rect(314, 10, 316, 179, H('#4a4e5a')); R.rect(314, 10, 314, 179, H('#6a6e7a'));
  for (let y = 30; y < 180; y += 34) { R.rect(312, y, 318, y + 2, K); R.rect(313, y + 1, 317, y + 1, H('#7a7e8a')); }
  // el soporte del farol, clavado en la pilastra
  R.rect(251, 56, 264, 57, K); R.linea(252, 64, 262, 57, K); R.rect(262, 57, 263, 60, K); R.pset(251, 55, H('#6a6e7a'));
});
// las tablas del escenario, en primer término, con su filo: van por delante de la gente de la plaza
const ybC = (x) => 150 + Math.round(x / 320 * 10);
const tablasC = () => horno('tablas', () => {
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const yb = ybC(x); if (y < yb) continue;
    const k = Math.floor((y - yb) / 6); let c = k % 2 ? H('#9a7654') : H('#8a6a4a'); if ((y - yb) % 6 === 0) c = H('#5a4230'); else if (Math.sin(x * 0.12 + k * 2.1) > 0.82) c = H('#7a5a3e'); else if (bay(x, y) < 0.06) c = H('#a8845e');
    if (y === yb) c = K; else if (y - yb === 1) c = H('#c8a87e'); R.pset(x, y, c); }
  R.rect(40, 168, 62, 170, H('#e8e0c8')); R.rect(50, 164, 52, 174, H('#e8e0c8'));
  for (let k = 0; k < 10; k++) R.pset(14 + k * 31, 166 + (k % 2) * 8, H('#3a2a20'));
});
const pegaTablas = () => { const T2 = tablasC(), B = R.buf; for (let i = 140 * 320; i < 180 * 320; i++) if (T2[i]) B[i] = T2[i]; };
const p6 = (t) => {
  R.copiar(fondoC());
  nubes(t, LIM_C, [[22, 38, 1.4], [34, 30, 2.4]]);
  for (const [x, s] of [[14, 0], [86, 0.4], [182, 0.7]]) humo(x, 72, t, s);
  // la colgadura del Edificio, colgada de su barra, con el sello del Capitolio y el fleco dorado; se mece
  { const m = Math.sin(t * 1.3) * 1.2; R.rect(264, 18, 304, 20, K); R.rect(265, 18, 303, 19, H('#c89a3a')); R.disco(264, 19, 2, H('#c89a3a')); R.disco(304, 19, 2, H('#c89a3a'));
    for (let y = 21; y < 96; y++) { const dx = Math.round(m * (y - 21) / 75); for (let x = 268; x <= 300; x++) R.pset(x + dx, y, x === 268 || x === 300 ? H('#5a5e68') : (x - 268) % 6 === 0 ? H('#7a7e88') : x > 294 ? H('#7e828c') : H('#8e929c')); }
    for (let x = 268; x <= 300; x += 2) { const dx = Math.round(m), l = 3 + ((x >> 1) % 2); R.rect(x + dx, 96, x + dx, 96 + l, H('#c89a3a')); R.pset(x + dx, 96 + l, H('#8a6420')); }
    const sx = 284 + Math.round(m * 0.5); R.disco(sx, 54, 11, H('#5a5e68')); R.disco(sx, 54, 9, H('#c8a040')); R.disco(sx, 54, 6, H('#8e929c')); R.poligono([[sx, 48], [sx + 5, 59], [sx - 5, 59]], H('#c8a040')); R.pset(sx - 3, 48, H('#f0d070')); R.pset(sx - 6, 50, H('#f0d070')); }
  // el farol en su soporte: el cristal y la llama que tiembla
  { const b = Math.round(Math.sin(t * 2.1) * 0.6), fx = 262 + b; R.linea(262, 60, fx, 62, K); R.rect(fx - 4, 62, fx + 4, 64, K); R.rect(fx - 3, 65, fx + 3, 74, K); R.rect(fx - 2, 66, fx + 2, 73, Math.sin(t * 9) > 0 ? H('#f0d070') : H('#e8b040')); R.rect(fx - 1, 68, fx + 1, 71, H('#fff4c0')); R.rect(fx - 4, 75, fx + 4, 76, K); R.pset(fx, 77, K); }
  // una paloma en el alféizar: picotea, da dos pasitos y se arregla las plumas
  { const u = (t * 0.25) % 1, px = 276 + Math.round(Math.sin(u * Math.PI * 2) * 8), dir = Math.cos(u * Math.PI * 2) > 0 ? 1 : -1; paloma(px, 146, dir, Math.sin(t * 4) > 0.5 ? 1 : 0); }
  // los chicos en la plaza, de cara al escenario; giran la cabeza hacia el chico que se ha puesto delante
  const mira = (px) => t > en('protege', 0.7441) ? (px < 70 ? 1 : -1) : 0;
  for (const [y, s, sem] of [[100, 5, 41], [108, 6, 42], [118, 7, 43], [130, 8, 44], [144, 10, 45]]) filaCaras(t, 2, 232, y, s, sem, y >= 118 ? [[30, 120]] : null, (px, yy, i) => (Math.sin(t + i) > -0.2 ? mira(px) : 0));
  // en la plaza, junto al escenario: Lenore Dove detrás, Haymitch delante con los brazos abiertos, el agente que le señala
  const ok = t > en('protege', 0.9375), ub = tramo(t, en('protege', 0.9486), P7);
  R.actor(EL.lenore, 40, 156, t, { dir: 1, triste: true, sorpresa: t > en('protege', 0.7616) && t < en('protege', 0.8200) });
  R.actor(EL.haymitch, 62, 156, t, { dir: 1, brazos: !ok || ub < 0.5, enfado: !ok, sorpresa: ok && ub < 0.4 });
  R.actor(EL.agentePaz, 92, 156, t, { dir: -1, dedo: t < en('protege', 0.8610), enfado: true });
  R.actor(EL.agentePaz, Math.round(lerp(150, 110, ease(ub))), 158, t, { dir: -1, anda: ub > 0 && ub < 1 });
  pegaTablas();
  // la órbita de Atom rodea al chico en «the boy»
  const ua = tramo(t, en('protege', 0.7558), en('protege', 0.7967)); if (ua > 0) T.AT.anillo(R, 70, 140, 15, 17, t, ua);
  // Drusilla y Plutarch en el filo de las tablas
  const se = t > en('protege', 0.7441) && t < en('protege', 0.8960);
  R.actor(EL.drusilla, 168, 174, t, { dir: -1, dedo: se, sonrisa: ok, salto: ok && t < en('protege', 0.9545) ? 1 : 0, habla: t > en('protege', 0.8025) && t < en('protege', 0.9369) && voz(t) > 0.3 });
  const pl = R.actor(EL.plutarch, 222, 176, t, { dir: -1, sostiene: [208, 156], sonrisa: ok });
  camaraTripode(pl.mano[0] - 1, pl.mano[1] - 4, -1, t, true);
  T.AT.luciernaga(R, lerp(150, 112, tramo(t, en('protege', 0.7441), en('protege', 0.8025))) + Math.sin(t * 1.3) * 3, 112 + Math.sin(t * 2.1) * 2, t, { dir: -1, brillo: 0.8, cara: ok ? 'triste' : 'sorpresa' });
};

// ── 7 · la claqueta ──────────────────────────────────────────────────────────────────────────────────────────
// el fondo: la plaza desde el escenario, desenfocada (el contraplano, emborronado una vez)
const fondoBorroso = () => horno('borroso', () => { const A = fondoA(), prev = R.usar(R.nuevo()); R.copiar(A); const B = R.buf, O = new Uint32Array(B);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let r = 0, g = 0, b = 0, n = 0; for (let j = -3; j <= 3; j += 2) for (let i = -3; i <= 3; i += 2) { const X = Math.min(319, Math.max(0, x + i)), Y = Math.min(179, Math.max(0, y + j)), c = O[Y * 320 + X]; r += c & 255; g += (c >> 8) & 255; b += (c >> 16) & 255; n++; }
    B[y * 320 + x] = (0xff000000 | (Math.round(b / n) << 16) | (Math.round(g / n) << 8) | Math.round(r / n)) >>> 0; }
  const out = R.buf; R.usar(prev); R.copiar(out); });
const p7 = (t) => {
  R.copiar(fondoBorroso());
  // manchas desenfocadas de los chicos que se mueven, y los banderines borrosos que ondean
  for (let k = 0; k < 14; k++) { const x = 8 + k * 23 + Math.sin(t * 0.8 + k) * 2, y = 128 + (k % 3) * 14, r = 4 + (k % 2); R.disco(x, y - r, r, mez(H('#8a8478'), PIEL[k % 3], 0.6)); R.disco(x, y + r + 2, r + 2, mez(H('#8a8478'), ROPA[k % 8], 0.6)); }
  for (let x = 0; x < 330; x += 24) { const m = Math.round(Math.sin(t * 2.4 + x * 0.2) * 3); R.poligono([[x, 22], [x + 16, 22], [x + 8 + m, 36]], x % 48 ? H('#a8acb6') : H('#c4c8d0')); }
  // el objetivo de la cámara a la izquierda: aros negros, el cristal con su reflejo
  R.disco(14, 96, 58, K); R.disco(14, 96, 54, H('#2a2a32')); R.disco(14, 96, 46, K); R.disco(14, 96, 40, H('#1a2238'));
  for (let y = 56; y < 136; y++) for (let x = 0; x < 54; x++) { const d = Math.hypot(x - 14, y - 96); if (d < 40 && ((x - 14) - (y - 96)) > 6 && ((x - 14) - (y - 96)) < 18 && bay(x, y) < 0.5) R.pset(x, y, H('#4a6a9a')); if (d > 47 && d < 53 && ((x + y) % 4 === 0)) R.pset(x, y, H('#4a4a56')); }
  R.disco(2, 84, 6, H('#5a7ab0')); R.pset(0, 82, H('#ffffff'));
  // la cámara: el cuerpo blanco detrás del objetivo, con su piloto
  R.rect(0, 150, 60, 180, K); R.rect(0, 152, 58, 180, H('#e4e6ec')); for (let y = 158; y < 180; y += 3) R.rect(6, y, 40, y, H('#b4b8c4')); R.disco(50, 160, 2, Math.sin(t * 6) > 0 ? H('#ff3030') : H('#6a2020'));
  // la claqueta: la pizarra con su marco de madera y las rayas del palo
  const X0 = 134, X1 = 296, Y0 = 70, Y1 = 158;
  R.rect(X0 - 2, Y0 - 2, X1 + 2, Y1 + 2, K); R.rect(X0, Y0, X1, Y1, H('#22242a'));
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) if (bay(x, y) < 0.06) R.pset(x, y, H('#3a3e46'));
  R.rect(X0, Y0 + 30, X1, Y0 + 30, H('#d8d8d0')); R.rect(X0, Y0 + 60, X1, Y0 + 60, H('#d8d8d0')); R.rect(X0 + 80, Y0 + 30, X0 + 80, Y0 + 60, H('#d8d8d0'));
  // la toma: el «1» se tacha y se escribe un «2»
  const tacha = tramo(t, en('toma', 0.2349), en('toma', 0.2713)), dos = tramo(t, en('toma', 0.2650), en('toma', 0.3127));
  R.numero('50', X0 + 22, Y0 + 54, { tam: 16, color: H('#e8e8e0'), contorno: false, sombra: false });
  R.numero('1', X0 + 108, Y0 + 54, { tam: 16, color: H('#e8e8e0'), contorno: false, sombra: false });
  if (tacha > 0) for (let i = 0; i < 22 * tacha; i++) { R.pset(X0 + 104 + i, Y0 + 52 - Math.round(i * 0.9), H('#e8483a')); R.pset(X0 + 104 + i, Y0 + 53 - Math.round(i * 0.9), H('#e8483a')); }
  if (dos > 0) R.numero('2', X0 + 134, Y0 + 54, { tam: 16, color: H('#f0e070'), contorno: false, sombra: false, n: Math.ceil(dos * 16) });
  if (dos > 0 && dos < 1) for (let k = 0; k < 6; k++) R.pset(X0 + 140 + Math.round(Math.sin(t * 20 + k) * 6), Y0 + 44 + k * 2, H('#ffffff'));
  R.numero('12', X0 + 30, Y0 + 84, { tam: 16, color: H('#c8c8c0'), contorno: false, sombra: false });
  for (let k = 0; k < 4; k++) R.rect(X0 + 100 + k * 14, Y0 + 70, X0 + 108 + k * 14, Y0 + 80, k < 3 ? H('#c8c8c0') : H('#e8483a'));
  // el palo de rayas, con la bisagra a la izquierda: se cierra en «take»
  const cierra = en('toma', 0.4232), abre = tramo(t, en('toma', 0.3655), en('toma', 0.4031)), ang = t < cierra ? 0.06 + 0.32 * ease(abre) : Math.max(0, 0.38 * (1 - (t - cierra) / 0.06));
  const L = X1 - X0 + 2, px = (u, v) => [X0 - 1 + u * Math.cos(-ang) - v * Math.sin(-ang), Y0 - 3 + u * Math.sin(-ang) + v * Math.cos(-ang)];
  for (let u = 0; u <= L; u++) for (let v = -12; v <= 0; v++) { const [x, y] = px(u, v), raya = Math.floor((u - v * 0.8) / 14) % 2; R.pset(Math.round(x), Math.round(y), v === -12 || v === 0 || u === 0 || u === L ? K : raya ? H('#f2f2ee') : H('#1a1a20')); }
  R.rect(X0 - 4, Y0 - 6, X0 + 2, Y0 + 2, H('#8a8e96')); R.pset(X0 - 1, Y0 - 2, H('#e8eaf0'));
  if (t > cierra && t < cierra + 0.35) { const u = (t - cierra) / 0.35; for (let k = 0; k < 8; k++) { const a = -Math.PI * 0.9 + k * 0.25, r1 = 6 + u * 10, r2 = r1 + 6; R.linea(Math.round(X1 + 6 + Math.cos(a) * r1), Math.round(Y0 - 4 + Math.sin(a) * r1), Math.round(X1 + 6 + Math.cos(a) * r2), Math.round(Y0 - 4 + Math.sin(a) * r2), H('#ffffff')); } }
  // las manos: una sujeta la pizarra desde abajo; la otra cierra el palo por la punta
  T.brazo(R, 226, 198, 214, 162, '#7a2436', 1, { sombra: false, codo: [222, 182] });
  const [tx, ty] = px(L - 4, -6);
  T.brazo(R, 336, ty + 30, Math.min(316, tx + 6), ty + 6, '#7a2436', -1, { sombra: false });
  T.AT.luciernaga(R, 100 + Math.sin(t * 1.2) * 3, 48 + Math.sin(t * 2.2) * 2 - (t > cierra && t < cierra + 0.5 ? 6 : 0), t, { dir: 1, brillo: 0.8, cara: t > cierra && t < cierra + 1 ? 'sorpresa' : t > en('toma', 0.2650) ? 'guino' : 'normal' });
};

// ── 8 · el visor de la cámara: la toma 2, sin Woodbine ───────────────────────────────────────────────────────
const AB = R.nuevo();
const fondoCamara = () => horno('camara', () => {
  R.copiar(fondoBorroso());
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, mez(R.pget(x, y), H('#1a1e2a'), 0.45));
  // el cuerpo de la cámara del Capitolio: esmalte blanco, cromados, rejillas y tornillos
  R.rect(26, 14, 300, 180, K); R.rect(28, 16, 298, 180, H('#e4e6ec'));
  for (let y = 16; y < 180; y++) for (let x = 28; x <= 298; x++) { if (x < 36 || y < 22) R.pset(x, y, H('#f6f7fa')); else if (x > 290) R.pset(x, y, H('#b4b8c4')); else if (bay(x, y) < 0.05) R.pset(x, y, H('#d0d4dc')); }
  for (const [x, y] of [[34, 22], [292, 22], [34, 172], [292, 172]]) { R.disco(x, y, 2, H('#8a8e98')); R.pset(x, y, H('#e8eaf0')); }
  for (let y = 148; y < 176; y += 3) R.rect(40, y, 70, y, H('#9aa0ac'));
  for (let y = 148; y < 176; y += 3) R.rect(256, y, 286, y, H('#9aa0ac'));
  R.rect(110, 150, 216, 160, H('#c8ccd6')); R.rect(110, 150, 216, 150, H('#8a8e98'));
  // el marco del monitor
  R.rect(66, 26, 260, 142, K); R.rect(68, 28, 258, 140, H('#3a3e4a')); R.rect(70, 30, 256, 138, K);
  // los diales y los botones de la derecha
  for (const [x, y, c] of [[276, 46, '#c8303a'], [276, 72, '#3a8ad8'], [276, 98, '#e8c040']]) { R.disco(x, y, 8, K); R.disco(x, y, 7, H('#8a8e98')); R.disco(x, y, 5, H('#d8dce4')); R.pset(x, y - 4, H(c)); }
  for (const [x, y] of [[44, 40], [44, 56], [44, 72], [44, 88]]) { R.rect(x - 5, y - 4, x + 5, y + 4, K); R.rect(x - 4, y - 3, x + 4, y + 3, H('#5a5e6a')); }
});
const p8 = (t) => {
  // la toma 2 en un búfer: la plaza desde el escenario, ahora con el pasillo vacío
  const prev = R.usar(AB); R.copiar(fondoA()); nubes(t, LIM_A, [[24, 40, 1.2], [36, 26, 2.2]]);
  for (const [x, y, s] of [[34, 66, 0], [100, 80, 0.3], [228, 80, 0.6]]) humo(x, y, t, s);
  for (const [y, s, sem] of FILAS_A) filaCaras(t, 2, 318, y, s, sem, [[pasL(y) - 1, pasR(y) + 1]], null);
  // los dos agentes vuelven a su sitio a los lados del pasillo, como si no hubiera pasado nada
  { const ua = tramo(t, P8 + 0.2, P8 + 1.8); agenteMini(lerp(104, 128, ease(ua)), 100, 12, t, ua > 0 && ua < 1, 1); agenteMini(lerp(222, 196, ease(ua)), 100, 12, t, ua > 0 && ua < 1, -1); }
  R.usar(prev);
  // el barrido: la cámara pasa de la izquierda al pasillo y se queda en él en «what happened to Woodbine»
  const ox = Math.round(lerp(4, 32, ease(tramo(t, P8, en('toma', 0.5800)))));
  R.copiar(fondoCamara());
  // el monitor: la imagen azulada, con sus líneas y su viñeta
  R.recorte([71, 31, 255, 137]);
  for (let y = 31; y <= 137; y++) for (let x = 71; x <= 255; x++) { const c = AB[(y + 22) * 320 + (x + ox)], [r, g, b] = rgb(c), l = 0.3 * r + 0.59 * g + 0.11 * b, v = Math.hypot((x - 163) / 92, (y - 84) / 54);
    let rr = l * 0.72 + 10, gg = l * 0.86 + 18, bb = l * 1.0 + 34; const k = (y % 2 ? 0.86 : 1) * (1 - Math.max(0, v - 0.7) * 0.9); R.pset(x, y, (0xff000000 | (Math.min(255, Math.round(bb * k)) << 16) | (Math.min(255, Math.round(gg * k)) << 8) | Math.min(255, Math.round(rr * k))) >>> 0); }
  // las esquinas del encuadre y la cruz del centro
  for (const [x, y, dx, dy] of [[78, 38, 1, 1], [248, 38, -1, 1], [78, 130, 1, -1], [248, 130, -1, -1]]) { R.linea(x, y, x + 8 * dx, y, H('#e8f0ff')); R.linea(x, y, x, y + 6 * dy, H('#e8f0ff')); }
  R.linea(160, 80, 166, 80, H('#e8f0ff')); R.linea(163, 77, 163, 83, H('#e8f0ff'));
  if (Math.sin(t * 5) > 0) R.disco(84, 46, 3, H('#ff3030'));
  R.numero('2', 236, 50, { tam: 8, color: H('#f0e070') });
  // la órbita rodea el hueco del pasillo en «what happened to Woodbine»
  const uo = tramo(t, en('toma', 0.5814), en('toma', 0.6266)); if (uo > 0) T.AT.anillo(R, 131, 108, 16, 12, t, uo);
  R.recorte(null);
  // el piloto rojo de grabar, encima
  R.disco(160, 20, 3, K); R.disco(160, 20, 2, Math.sin(t * 5) > 0 ? H('#ff3030') : H('#6a2020'));
  // la mano del cámara gira el dial azul en «broadcast»
  const gd = tramo(t, en('toma', 0.5099), en('toma', 0.5538)), mb = ease(tramo(t, P8 + 0.3, en('toma', 0.5000))) * (1 - ease(tramo(t, en('toma', 0.6200), en('toma', 0.6700))));
  if (mb > 0) T.brazo(R, 336, 112, lerp(336, 286, mb), lerp(118, 74, mb), '#7a2436', -1, { sombra: false, codo: [lerp(340, 312, mb), lerp(124, 102, mb)] });

  { const a = -Math.PI / 2 + gd * 1.6; R.pset(276 + Math.round(Math.cos(a) * 4), 72 + Math.round(Math.sin(a) * 4), H('#1a1a20')); }
  T.AT.luciernaga(R, 300 + Math.sin(t * 1.2) * 3, 128 + Math.sin(t * 2) * 2, t, { dir: -1, brillo: 0.8, cara: t > en('toma', 0.5978) ? 'triste' : 'normal' });
};

// ── 9 · la sala de un distrito: lo que ve Panem ─────────────────────────────────────────────────────────────────────────────
const TT = { sube: en('toma', 0.8514), llega: en('toma', 0.9431), atom: en('toma', 0.9933) };
const p9 = (t) => {
  teleFinal(t, TT);
  // el Atom grande entra por la derecha para la pausa
  if (t > TT.atom) { const r = T.AT.atom(R, lerp(340, 262, tramo(t, TT.atom, E.duracion)), 176, t, { s: 2, pose: 'camina', dir: -1 });   // en primer término, por delante del sofá
    T.AT.escalado(R, claquetaMini(0, 2), 18, 16, r.mano[0] - 30, r.mano[1] - 22, 2); }
};

// cada efecto con su acción en pantalla: la mano revuelve y saca la papeleta; la plaza se vuelve; el silbato; la campana
// del reloj y el aleteo de las palomas; el salto de Lenore y el murmullo; los pasos del agente; el «?»; la cámara que
// rueda; la tachadura y el golpe de la claqueta; la cámara de la toma 2 y su dial; el aplauso de la tele
const efectos = [[2.3, 'papel'], [en('woodbine', 0.2005), 'papel'], [en('woodbine', 0.5601), 'publico'], [en('woodbine', 0.7930), 'publico', { dur: 2.5, ola: 1 }], [en('woodbine', 0.8328), 'silbato'],
  [en('woodbine', 0.9070), 'campana', { lejos: true }], [en('woodbine', 0.9320), 'rafaga'], [en('protege', 0.1012), 'whoosh'], [en('protege', 0.2370), 'publico', { dur: 3 }],
  [en('protege', 0.6885), 'pop'], [en('protege', 0.7616), 'brillo'], [P6 + 0.3, 'maquina', { dur: 4, ritmo: 14 }], [en('toma', 0.2650), 'lapiz'], [en('toma', 0.4232), 'palmada'], [P8 + 0.2, 'maquina', { dur: 3.4, ritmo: 14 }], [en('toma', 0.5161), 'bip'], [en('toma', 0.9242), 'publico']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9]], { efectos, año: 50 });
''')

E['hm-toma'] = ('Toma 2', '''// HM-TOMA (frase 13), LA PAUSA 1 «fíjate en esto». Cinco planos:
// 1. la tele del último plano de hm-cosecha, CONGELADA en gris azulado; Atom al doble llega con la claqueta, la
//    cierra de golpe en «notice this» (GAG: «toma 2»), guiña, la deja y señala la tele; en «this book» sale a color el
//    libro de Hume (1741);
// 2. el estudio de Hume de noche: escribe a la luz de la vela; en «Hume» la órbita le rodea; en «so few» se vuelve a
//    la ventana y la órbita rodea a los pocos del balcón;
// 3. la plaza desde la calle, de noche y a ras de la multitud (de espaldas): el palacio con su reloj y el balcón
//    encendido de los tres «pocos», las casas altas con chimeneas que humean y ventanas que se encienden, el empedrado,
//    dos faroles y farolillos en palos; en «govern so many» la multitud agacha la cabeza en ola desde el centro; en
//    «whoever controls» la órbita rodea el balcón; el del centro desenrolla un pergamino en «story» y la multitud
//    levanta la cabeza en otra ola, con la luz del balcón en el pelo;
// 4. la librería: la librera, tras el mostrador, mira a Atom y sella un libro; Atom entra con los tres libros de la saga
//    y los lanza a lo alto de la torre en «saga»; la torre crece en

//    «more urgent every day» y Atom y la librera se sorprenden;
// 5. la tele congelada otra vez: Atom con las dos tarjetas a color, «?» en «real» y «!» en «not real»; vuelve el color.
// Sonido de la pausa: un golpe seco al congelarse, un pop por cada objeto que sale a color y un clic al salir.''', r'''
const K = hex('#1a1424'), ease = (u) => u * u * (3 - 2 * u), H = (s) => hex(s);
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], bay = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const hh = (x, y, k = 0) => { const v = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return v - Math.floor(v); };
const rgb = (c) => [c & 255, (c >> 8) & 255, (c >> 16) & 255];
const mez = (a, b, u) => { const A = rgb(a), B = rgb(b); return (0xff000000 | (Math.round(A[2] + (B[2] - A[2]) * u) << 16) | (Math.round(A[1] + (B[1] - A[1]) * u) << 8) | Math.round(A[0] + (B[0] - A[0]) * u)) >>> 0; };
const voz = (t) => E.energia(t);
// lo fijo de cada fondo se pinta una vez en su búfer
const CACHE = new Map();
const horno = (k, f) => { if (!CACHE.has(k)) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); CACHE.set(k, b); } return CACHE.get(k); };
const degradado = (x0, x1, y0, y1, cs) => { const n = cs.length - 1; for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(f)), u = f - i; for (let x = x0; x <= x1; x++) R.pset(x, y, u > bay(x, y) ? cs[i + 1] : cs[i]); } };
// nubes de tres tonos, recortadas por arriba de la silueta (lim[x]: la primera y que ya no es cielo)
const NUB = [H('#f2f2f0'), H('#cfd4dc'), H('#a6aebe')];
const nube = (x, y, w, lim, tono = NUB) => { x = Math.round(x); y = Math.round(y);
  const d = (cx, cy, r, c) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r + r) { const X = cx + i, Y = cy + j; if (X >= 0 && X < 320 && Y >= 0 && (!lim || Y < lim[X])) R.pset(X, Y, c); } };
  const n = Math.max(3, Math.round(w / 9));
  for (let k = 0; k < n; k++) d(x + Math.round((k + 0.5) * w / n), y + 2, Math.round(w / n * (0.62 + 0.3 * Math.sin(k * 2.3 + w))), tono[2]);
  for (let k = 0; k < n; k++) d(x + Math.round((k + 0.5) * w / n) - 1, y, Math.round(w / n * (0.55 + 0.3 * Math.sin(k * 2.3 + w))), tono[1]);
  for (let k = 1; k < n - 1; k++) d(x + Math.round((k + 0.3) * w / n) - 1, y - 2, Math.max(1, Math.round(w / n * (0.42 + 0.3 * Math.sin(k * 1.7 + w)))), tono[0]);
};
const nubes = (t, lim, ys) => ys.forEach(([y, w, v], k) => nube(((k * 113 + t * v) % 420) - 60, y, w, lim));
const pajaro = (x, y, t, col) => { x = Math.round(x); y = Math.round(y); const a = Math.floor(t * 9) % 2;
  R.pset(x, y, col); R.pset(x + 1, y, col); for (const d of [-1, 1]) { R.pset(x + (d > 0 ? 2 : -1), y - 1 + a * 2, col); R.pset(x + (d > 0 ? 3 : -2), y - 2 + a * 3, col); } };
// humo de chimenea en bolitas que suben y crecen
const humo = (x, y, t, sem) => { for (let k = 0; k < 5; k++) { const f = ((t * 0.35 + k / 5 + sem) % 1), r = 1 + f * 3.2; R.disco(x + Math.sin(f * 4 + sem) * 2 + f * 6, y - f * 22, r, mez(H('#9a9ca4'), H('#c8cad0'), f)); } };
// la gente de la plaza: chicos y chicas a escala s (≈ ancho de hombros), de cara a la cámara
const PELO = ['#2a2024', '#1e1a1c', '#3a2a20', '#5a3a22', '#a88050', '#2a2024', '#4a3a30'].map(H);
const ROPA = ['#e8e6e0', '#c8ccd4', '#a8a29a', '#d8d0c0', '#8a8e9a', '#b8c0c8', '#9aa6b8', '#c8b8a0'].map(H);
const PIEL = ['#e8bc98', '#c8946a', '#9a6444'].map(H);
const carita = (px, y, s, q, mira, sube = 0, espalda = false) => {
  const ropa = ROPA[Math.floor(q * 8)], ropaS = mez(ropa, K, 0.3), pelo = PELO[Math.floor((q * 7.3 % 1) * 7)], piel = PIEL[Math.floor((q * 13.1 % 1) * 3)];
  const hw = Math.max(2, Math.round(s * 0.55)), ys = Math.round(y - s * 0.5), r = Math.max(1.6, s * 0.36), hy = Math.round(y - s * 0.95) - sube, rr = Math.ceil(r);
  R.rect(px - hw - 1, ys, px + hw + 1, y, K); R.rect(px - hw, ys + 1, px + hw, y, ropa); R.rect(px + hw - 1, ys + 2, px + hw, y, ropaS); R.rect(px - hw, ys + 1, px + hw, ys + 1, mez(ropa, H('#ffffff'), 0.25));
  R.rect(px - 1, ys - 1, px + 1, ys, piel);
  R.disco(px + 0.5, hy, r + 0.9, K); R.disco(px + 0.5, hy, r, espalda && !mira ? pelo : piel);
  if (espalda && !mira) { R.pset(px - rr, hy + 1, piel); R.pset(px + rr + 1, hy + 1, piel); R.pset(px - 1, hy - rr + 1, mez(pelo, H('#ffffff'), 0.3)); return; }
  for (let j = -rr; j <= 0; j++) for (let i = -rr; i <= rr; i++) if (i * i + j * j <= r * r && j < -r * 0.2 + (Math.abs(i) > r * 0.62 ? r * 0.7 : 0)) R.pset(px + i, hy + j, pelo);
  if (s >= 5) { const e = mira; R.pset(px - 1 + e, hy + 1, K); R.pset(px + 2 + e, hy + 1, K); }
  if (q * 19 % 1 < 0.25 && s > 8) { R.rect(px + rr, hy, px + rr, hy + 4, pelo); R.pset(px + rr, hy + 5, H('#a85a4a')); }
};
const filaCaras = (t, x0, x1, y, s, sem, huecos, mirar, espalda = false) => { const paso = Math.max(4, Math.round(s * 1.08));
  for (let x = x0, i = 0; x <= x1; x += paso, i++) { if (huecos && huecos.some(([a, b]) => x + s * 0.6 > a && x - s * 0.6 < b)) continue;
    const q = hh(i, sem), px = Math.round(x + (q - 0.5) * 2), sube = Math.sin(t * 1.3 + i * 1.7 + sem) > 0.88 ? 1 : 0;
    const m = mirar ? mirar(px, y, i) : (Math.sin(t * 0.7 + i * 2.3 + sem) > 0.8 ? (i % 2 ? 1 : -1) : 0);
    carita(px, y, s, q, m, sube, espalda); } };
// un agente de la paz pequeño, de blanco con casco (de lejos); s: alto en px
const agenteMini = (x, y, s, t, anda, dir = 1) => {
  x = Math.round(x); y = Math.round(y); const w = Math.max(2, Math.round(s * 0.22)), p = anda ? Math.floor(t * 8) % 2 : 0, yc = y - Math.round(s * 0.4), yt = y - Math.round(s * 0.74), r = Math.max(1.6, s * 0.15);
  R.rect(x - w - 1, yt - 1, x + w + 1, y, K);
  R.rect(x - w, yc, x - 1, y - p, H('#c8ccd6')); R.rect(x + 1, yc, x + w, y - (anda ? 1 - p : 0), H('#b0b6c2'));
  R.rect(x - w, yt, x + w, yc, H('#f2f4f8')); R.rect(x + (dir > 0 ? w - 1 : -w), yt + 1, x + (dir > 0 ? w : -w + 1), yc, H('#c8ccd6'));
  R.rect(x - w, yc - 1, x + w, yc - 1, H('#3a3a44'));
  R.disco(x + 0.5, yt - r, r + 0.9, K); R.disco(x + 0.5, yt - r, r, H('#f6f8fc')); R.pset(x + (dir > 0 ? 1 : 0), Math.round(yt - r), H('#2a2e3a')); R.pset(x + (dir > 0 ? 2 : -1), Math.round(yt - r), H('#2a2e3a'));
};
// una casa de tablas de la Veta con su tejado de chapa (pies en b), su puerta, su ventana y su chimenea
const casaVeta = (x, b, w, h, sem) => { const q = hh(x, sem, 4), muro = mez(H('#7a6a5a'), H('#9a8a78'), q), tejH = Math.round(h * 0.42), y0 = b - h;
  R.rect(x - 1, y0 + tejH, x + w + 1, b, K); R.rect(x, y0 + tejH + 1, x + w, b, muro);
  for (let i = x + 2; i < x + w; i += 3) R.rect(i, y0 + tejH + 1, i, b - 1, mez(muro, K, 0.25));
  for (let j = 0; j <= tejH; j++) { const a = x - 2 + Math.round((tejH - j) * 0.5), z = x + w + 2 - Math.round((tejH - j) * 0.5); for (let i = a; i <= z; i++) R.pset(i, y0 + j, j === 0 ? H('#4a4e56') : (i % 3 === 0) ? H('#6a6e76') : hh(i, j + x, 6) > 0.86 ? H('#9a6a4a') : H('#8a8e96')); }
  R.rect(x - 2, y0 + tejH, x + w + 2, y0 + tejH, H('#4a4e56'));
  R.rect(x + Math.round(w * 0.25), b - 7, x + Math.round(w * 0.25) + 3, b - 1, H('#3a2a20'));
  const vx = x + Math.round(w * 0.6); R.rect(vx, y0 + tejH + 3, vx + 4, y0 + tejH + 6, H('#3a3e4a')); R.pset(vx + 2, y0 + tejH + 3, H('#5a5e6a'));
  R.rect(x + w - 5, y0 - 3, x + w - 3, y0 + 2, H('#5a4a44')); };
// la cámara del Capitolio en su trípode (de perfil), con su piloto rojo; (x, y) es el asa; dir hacia donde mira
const camaraTripode = (x, y, dir, t, graba = true) => { x = Math.round(x); y = Math.round(y); const X = (i) => x + i * dir;
  for (const [a, b] of [[-5, 0], [0, 0], [5, 0]]) R.linea(X(1), y + 6, X(1 + a), y + 22, K);
  R.linea(X(0), y + 6, X(-4), y + 22, H('#6a6a76')); R.linea(X(2), y + 6, X(6), y + 22, H('#8a8a96'));
  const x0 = Math.min(X(-6), X(10)), x1 = Math.max(X(-6), X(10)); R.rect(x0 - 1, y - 2, x1 + 1, y + 6, K); R.rect(x0, y - 1, x1, y + 5, H('#e8eaf0')); R.rect(x0, y + 3, x1, y + 5, H('#b8bcc8'));
  R.rect(Math.min(X(10), X(15)), y, Math.max(X(10), X(15)), y + 4, K); R.pset(X(14), y + 1, H('#8ad8ff')); R.pset(X(13), y + 2, H('#4a7aa8'));
  R.disco(X(-3), y - 5, 3, K); R.disco(X(4), y - 5, 3, K); R.disco(X(-3), y - 5, 2, H('#d8dce4')); R.disco(X(4), y - 5, 2, H('#d8dce4'));
  const g = (t * 3) % (Math.PI * 2); R.pset(X(-3) + Math.round(Math.cos(g)), y - 5 + Math.round(Math.sin(g)), K); R.pset(X(4) + Math.round(Math.cos(g + 1)), y - 5 + Math.round(Math.sin(g + 1)), K);
  if (graba && Math.sin(t * 6) > 0) R.pset(X(-5), y, H('#ff3030'));
};

const EB = R.nuevo();
// la claqueta pequeña (16 × 14), que Atom lleva al doble con AT.escalado; ang: lo abierta que está
const claquetaMini = (ang, n) => () => { R.rect(1, 5, 16, 15, K); R.rect(2, 6, 15, 14, H('#22242a')); R.rect(2, 9, 15, 9, H('#d8d8d0')); R.numero(String(n), 9, 15, { color: H('#f0e070'), sombra: false });
  for (let u = 0; u <= 15; u++) for (let v = -3; v <= 0; v++) { const x = 1 + u * Math.cos(-ang) - v * Math.sin(-ang), y = 4 + u * Math.sin(-ang) + v * Math.cos(-ang); R.pset(Math.round(x), Math.round(y), v === -3 || v === 0 ? K : Math.floor((u - v) / 3) % 2 ? H('#f2f2ee') : H('#1a1a20')); } };
// la sala de una casa de distrito, al anochecer (lo fijo, en su búfer): papel pintado gastado, zócalo de tablas, suelo,
// la ventana con la Veta, el reloj, el cuadro, la lámpara de pie, el perchero y la tele sobre su mueble, al fondo a
// la izquierda; el sofá va delante, aparte, con la familia de espaldas
const TV = [28, 52, 113, 93];   // el cristal de la tele
const fondoSala = () => horno('sala', () => {
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { const r = (x % 16), mot = ((x + 8) % 16 - 8) ** 2 / 2 + ((y % 18) - 9) ** 2 / 4.5 < 3 && ((x + 8) % 16 - 8) ** 2 / 2 + ((y % 18) - 9) ** 2 / 4.5 > 1.2;
    let c = r < 2 ? H('#9a8a68') : r === 2 ? H('#c8b890') : H('#b4a47e'); if (mot) c = H('#8e7e5c');
    const luz = Math.max(0, 1 - Math.hypot((x - 296) / 60, (y - 70) / 50)) * 0.35, sombra = Math.min(1, Math.abs(x - 170) / 200) * 0.25 + (y < 10 ? (10 - y) * 0.03 : 0);
    c = mez(c, H('#3a2e24'), sombra); if (luz > bay(x, y) * 0.4) c = mez(c, H('#f8d890'), luz); if (hh(x >> 3, y >> 3, 31) > 0.93 && bay(x, y) < 0.4) c = mez(c, H('#7a6a4e'), 0.4); R.pset(x, y, c); }
  // una mancha de humedad
  for (let y = 4; y < 30; y++) for (let x = 226; x < 250; x++) if (Math.hypot((x - 238) / 12, (y - 12) / 14) < 1 && bay(x, y) < 0.3) R.pset(x, y, H('#8a7a58'));
  // el zócalo de tablas y el suelo de madera
  R.rect(0, 108, 319, 110, H('#4a3424')); R.rect(0, 108, 319, 108, H('#8a6a48'));
  for (let y = 111; y < 128; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 12 === 0 ? H('#3a2818') : x % 12 === 1 ? H('#8a6644') : Math.sin(y * 0.7 + (x >> 3) * 1.9) > 0.85 ? H('#5a3e28') : H('#6e4e32'));
  R.rect(0, 126, 319, 129, H('#3a2818'));
  for (let y = 130; y < 180; y++) { const k = Math.floor((y - 130) / 7); for (let x = 0; x < 320; x++) { let c = (y - 130) % 7 === 0 ? H('#3a2818') : k % 2 ? H('#7a5638') : H('#6a4a30');
    if (Math.sin(x * 0.09 + k * 2.7) > 0.86) c = H('#58402a'); if ((x + k * 37) % 61 === 0) c = H('#3a2818'); if (bay(x, y) < 0.05) c = H('#8a6644'); R.pset(x, y, c); } }
  // la alfombra trenzada, ovalada
  const TRZ = ['#8a3a2a', '#b8945a', '#5a6a4a', '#a85a3a', '#c8a870', '#6a4a3a', '#9a6a4a'].map(H);
  for (let y = 142; y < 180; y++) for (let x = 20; x < 300; x++) { const d = Math.hypot((x - 150) / 128, (y - 166) / 22); if (d >= 1) continue; const c = TRZ[Math.floor(d * 7)];
    R.pset(x, y, d > 0.96 ? H('#3a2818') : (x + y * 2) % 4 === 0 ? mez(c, K, 0.25) : c); }
  // la ventana del fondo: el cielo del anochecer, la Veta y sus chimeneas (el humo se pinta en vivo)
  R.rect(160, 22, 218, 92, K); R.rect(161, 23, 217, 91, H('#6a4a30')); R.rect(161, 23, 162, 91, H('#9a7450')); R.rect(216, 23, 217, 91, H('#3a2818'));
  for (let y = 27; y <= 87; y++) for (let x = 165; x <= 213; x++) { const u = (y - 27) / 60 + (bay(x, y) - 0.5) * 0.08; R.pset(x, y, u < 0.35 ? mez(H('#3a3a6a'), H('#7a5a8a'), u / 0.35) : u < 0.7 ? mez(H('#7a5a8a'), H('#e89a6a'), (u - 0.35) / 0.35) : mez(H('#e89a6a'), H('#f0c88a'), (u - 0.7) / 0.3)); }
  R.pset(174, 32, H('#ffffff')); R.pset(203, 38, H('#e8e8f8'));
  for (let x = 165; x <= 213; x++) { const h = 70 + Math.round(4 * Math.sin(x * 0.4)) + ((x >> 3) % 2 ? -4 : 0); for (let y = h; y <= 87; y++) R.pset(x, y, y === h ? H('#4a3a44') : H('#2a2230')); }
  for (const [x, y] of [[172, 76], [190, 72], [206, 76]]) { R.rect(x, y - 6, x + 2, y, H('#2a2230')); R.pset(x + 4, y + 4, H('#f8c860')); R.pset(x + 5, y + 4, H('#f8c860')); }
  R.rect(188, 27, 190, 87, H('#5a3e28')); R.rect(165, 56, 213, 57, H('#5a3e28'));
  R.rect(156, 92, 222, 95, K); R.rect(157, 92, 221, 93, H('#9a7450')); R.rect(157, 94, 221, 94, H('#4a3424'));
  // la barra y las cortinas de flores
  R.rect(152, 18, 226, 19, H('#3a2818')); R.disco(152, 18.5, 2, H('#c89a3a')); R.disco(226, 18.5, 2, H('#c89a3a'));
  for (const [x0, x1] of [[154, 166], [212, 224]]) for (let y = 20; y < 100; y++) for (let x = x0; x <= x1; x++) { const pl = (x - x0) % 4; let c = pl === 0 ? H('#8a4a3a') : pl === 3 ? H('#a85a48') : H('#c87a62'); if ((x * 3 + y * 5) % 23 === 0) c = H('#f0d8a0'); if ((x * 7 + y * 3) % 29 === 0) c = H('#6a8a4a'); R.pset(x, y, c); }
  // el reloj de la pared (el péndulo se pinta en vivo)
  R.rect(137, 30, 151, 72, K); R.rect(138, 31, 150, 71, H('#6a4a30')); R.rect(138, 31, 139, 71, H('#9a7450')); R.disco(144, 38, 6, K); R.disco(144, 38, 5, H('#f2ead6'));
  for (let k = 0; k < 4; k++) R.pset(144 + [0, 4, 0, -4][k], 38 + [-4, 0, 4, 0][k], K); R.linea(144, 38, 144, 35, K); R.linea(144, 38, 147, 39, K);
  R.rect(140, 46, 148, 69, H('#2a1e18')); R.rect(140, 46, 148, 46, H('#9a7450'));
  // el cuadro del prado sobre el sofá
  R.rect(236, 28, 278, 58, K); R.rect(237, 29, 277, 57, H('#a8783a')); R.rect(237, 29, 277, 29, H('#d8a860'));
  for (let y = 32; y <= 54; y++) for (let x = 240; x <= 274; x++) R.pset(x, y, y < 42 ? mez(H('#9ac0d8'), H('#d8e8e8'), (y - 32) / 10) : y < 46 ? H('#6a8a5a') : (x + y) % 5 === 0 ? H('#e8d870') : H('#5a7a3a'));
  R.disco(266, 36, 2, H('#f8f0c0')); R.poligono([[240, 44], [252, 38], [262, 44]], H('#7a9a8a'));
  // la lámpara de pie, a la derecha: pantalla de tela con su luz
  R.rect(299, 84, 300, 128, K); R.rect(294, 127, 305, 129, K);
  R.poligono([[290, 84], [309, 84], [305, 68], [294, 68]], K); R.poligono([[291, 83], [308, 83], [304, 69], [295, 69]], H('#f0d8a0')); R.poligono([[291, 83], [296, 83], [297, 69], [295, 69]], H('#fff0c8')); R.rect(291, 82, 308, 83, H('#c89a5a'));
  // el perchero con un abrigo, a la izquierda
  R.rect(4, 40, 14, 42, H('#3a2818')); R.rect(8, 42, 10, 46, H('#3a2818'));
  R.poligono([[2, 46], [16, 46], [18, 96], [0, 96]], K); R.poligono([[3, 47], [15, 47], [17, 95], [1, 95]], H('#5a5a4a')); R.linea(9, 48, 9, 95, H('#3a3a30')); R.rect(3, 47, 4, 95, H('#7a7a64'));
  // el mueble de la tele y la tele de madera con sus antenas
  R.rect(18, 98, 124, 124, K); R.rect(19, 99, 123, 123, H('#6a4a30')); R.rect(19, 99, 123, 100, H('#9a7450'));
  for (const x0 of [22, 72]) { R.rect(x0, 103, x0 + 46, 120, H('#3a2818')); R.rect(x0 + 1, 104, x0 + 45, 119, H('#7a5638')); for (let y = 105; y < 119; y += 3) R.rect(x0 + 3, y, x0 + 43, y, H('#6a4a30')); R.disco(x0 + (x0 < 50 ? 42 : 4), 111, 1, H('#c89a3a')); }
  R.rect(22, 124, 25, 129, K); R.rect(117, 124, 120, 129, K);
  R.linea(60, 44, 44, 22, K); R.linea(76, 44, 98, 24, K); R.disco(44, 22, 1.5, H('#c8ccd6')); R.disco(98, 24, 1.5, H('#c8ccd6')); R.rect(62, 42, 74, 46, K); R.rect(63, 43, 73, 45, H('#4a4e5a'));
  R.rect(22, 46, 120, 98, K); R.rect(23, 47, 119, 97, H('#7a5232')); R.rect(23, 47, 119, 48, H('#a87a4a')); R.rect(118, 47, 119, 97, H('#4a3220'));
  for (let x = 24; x < 118; x += 5) R.pset(x, 50, H('#5a3c24'));
  R.rect(TV[0] - 2, TV[1] - 2, TV[2] + 2, TV[3] + 2, H('#2a2024')); R.rect(TV[0] - 1, TV[1] - 1, TV[2] + 1, TV[3] + 1, K);
  for (let x = 30; x < 92; x += 2) R.rect(x, 94, x, 96, H('#4a3220')); R.disco(100, 95, 1.6, H('#d8c8a0')); R.disco(108, 95, 1.6, H('#d8c8a0'));
  // la sombra de la tele en la pared
  for (let y = 46; y < 100; y++) for (let x = 120; x < 126; x++) if (bay(x, y) < 0.5) R.pset(x, y, mez(R.pget(x, y), K, 0.25));
});
// el respaldo del sofá, en primer término, por delante de la familia: tela gastada con capitoné, el marco de madera,
// una manta de ganchillo por encima
const sofa = () => horno('sofa', () => {
  for (let y = 161; y < 180; y++) for (let x = 156; x < 320; x++) { const borde = y === 161 || x === 156; let c = borde ? K : y < 165 ? H('#7a5638') : (x + (y >> 2)) % 3 === 0 ? H('#4a5a44') : H('#56684e');
    if (!borde && y === 162) c = H('#a87a4a'); if (!borde && y >= 165 && x > 312) c = mez(c, K, 0.3); R.pset(x, y, c); }
  for (let x = 172; x < 318; x += 26) for (let y = 167; y < 180; y += 9) { R.pset(x, y + 2, H('#2e3a2a')); R.pset(x - 1, y + 1, H('#3a4a36')); R.pset(x + 1, y + 3, H('#6a7c60')); R.pset(x - 3, y + 2, H('#4a5a44')); R.pset(x + 3, y + 2, H('#4a5a44')); }
  for (let x = 160; x < 318; x++) if (bay(x, 165) < 0.5) R.pset(x, 165, H('#3a4a36'));
  // el brazo del sofá, redondo, en la punta de la izquierda
  R.disco(160, 166, 7, K); R.disco(160, 166, 6, H('#56684e')); R.disco(158, 164, 3, H('#6a7c60'));
  // la manta de ganchillo, de cuadros de colores, echada por encima del respaldo
  const MC = ['#c84a3a', '#e8c060', '#4a7ab0', '#e8e0d0'].map(H);
  for (let y = 161; y < 180; y++) for (let x = 262; x < 300; x++) { if (y > 174 + Math.sin(x * 0.6) * 2) continue; const q = ((x - 262) >> 2) + ((y - 161) >> 2); R.pset(x, y, (x - 262) % 4 === 0 || (y - 161) % 4 === 0 ? H('#2a2024') : MC[q % 4]); }
});
// la tele de la sala: dentro, el escenario de la plaza (lo que ve todo Panem), en su búfer
const teleFinal = (t, TT, conAtom = true) => {
  const prev = R.usar(EB);
  const oe = { encuadre: 'plaza', camara: 'escenario', luz: 'dia', urna: 1, pantalla: 'sello' };
  const g = T.distrito(R, t, oe), S = g.suelo;
  R.actor(EL.wyattHM, 108, S, t, { dir: 1 });
  R.actor(EL.maysilee, 127, S, t, { dir: 1 });
  R.actor(EL.louellaHM, 167, S, t, { dir: -1, triste: true });
  const ua = tramo(t, TT.sube, TT.llega), xh = lerp(226, 188, ease(ua));
  R.actor(EL.haymitch, Math.round(xh), S, t, { dir: -1, anda: ua > 0 && ua < 1, triste: ua >= 1 });
  const aplaude = t > TT.llega + 0.1;
  R.actor(EL.drusilla, 147, S, t, { dir: aplaude ? 1 : -1, sonrisa: true, brazos: aplaude && Math.floor(t * 6) % 2 === 0, habla: !aplaude && voz(t) > 0.3 });
  T.distritoDelante(R, t, oe);
  R.usar(prev);
  // la sala
  R.copiar(fondoSala());
  // el humo de las chimeneas de la Veta, por la ventana
  R.recorte([165, 27, 213, 87]); for (const [x, s] of [[173, 0], [207, 0.5]]) for (let k = 0; k < 4; k++) { const f = (t * 0.3 + k / 4 + s) % 1; R.disco(x + f * 6 + Math.sin(f * 5) * 1.5, 68 - f * 30, 1 + f * 2.5, mez(H('#8a7a8a'), H('#c8b0b8'), f)); } R.recorte(null);
  // el péndulo del reloj
  { const a = Math.sin(t * 3.1) * 0.35; R.linea(144, 47, 144 + Math.round(Math.sin(a) * 16), 47 + Math.round(Math.cos(a) * 16), H('#c89a3a')); R.disco(144 + Math.sin(a) * 18, 47 + Math.cos(a) * 18, 2, H('#e8c060')); }
  // la pantalla: la imagen con sus líneas, su viñeta y el reflejo del cristal
  const [x0, y0, x1, y1] = TV, ox = 124, oy = S - 36, B = R.buf, fl = 0.94 + Math.sin(t * 23) * 0.03;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const [r, gg, b] = rgb(EB[(y - y0 + oy) * 320 + (x - x0 + ox)]), v = Math.hypot((x - 70.5) / 46, (y - 72.5) / 24), k = (y % 2 ? 0.86 : 1) * fl * (1 - Math.max(0, v - 0.75) * 1.2);
    B[y * 320 + x] = (0xff000000 | (Math.min(255, Math.round((b * 1.05 + 12) * k)) << 16) | (Math.min(255, Math.round((gg + 6) * k)) << 8) | Math.min(255, Math.round(r * 0.95 * k))) >>> 0; }
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if ((x - x0) + (y - y0) * 0.8 > 60 && (x - x0) + (y - y0) * 0.8 < 66 && bay(x, y) < 0.35) R.pset(x, y, mez(R.pget(x, y), H('#ffffff'), 0.5));
  // la luz azulada de la tele en la alfombra y el suelo, que parpadea
  for (let y = 132; y < 180; y += 1) for (let x = 30; x < 150; x++) { const d = Math.hypot((x - 70) / 80, (y - 132) / 40); if (d < 1 && bay(x, y) < (1 - d) * 0.35 * fl) R.pset(x, y, mez(R.pget(x, y), H('#a8c0f0'), 0.35)); }
  // la luz de la lámpara que tiembla un poco
  if (Math.sin(t * 13) > 0.7) for (let y = 86; y < 108; y++) for (let x = 284; x < 316; x++) if (bay(x, y) < 0.08) R.pset(x, y, H('#f8e0a0'));
  // la familia en el sofá, de espaldas, mirando la tele; en «walks up» el pequeño se vuelve hacia su madre y la abuela
  // asiente cuando Drusilla aplaude
  const vuelve = t > TT.llega - 0.4 ? -1 : 0;
  const FAM = [[190, 166, 22, 0.62, 0, 0], [228, 166, 20, 0.11, 0, 0], [260, 170, 15, 0.47, vuelve, vuelve ? 1 : 0], [292, 166, 18, 0.86, 0, aplaude && Math.floor(t * 3) % 2 ? 1 : 0]];
  for (const [x, y, sz, q, m, sb] of FAM) carita(x, y, sz, q, m, sb, true);
  // la luz de la tele les perfila el pelo por arriba
  for (const [x, y, sz, , , sb] of FAM) { const r = Math.max(1.6, sz * 0.36), hy = Math.round(y - sz * 0.95) - sb; for (let i = -Math.ceil(r); i <= 0; i++) if (bay(x + i, hy) < 0.6 * fl) R.pset(x + i, hy - Math.round(Math.sqrt(Math.max(0, r * r - i * i))), H('#a8c0f0')); }
  { const S2 = sofa(), B2 = R.buf; for (let i = 156 * 320; i < 180 * 320; i++) if (S2[i]) B2[i] = S2[i]; }
  // Atom, de luciérnaga, junto a la lámpara; se va por la derecha justo antes de que entre el Atom grande
  const ul = tramo(t, TT.sube - 0.6, TT.atom - 0.3);
  if (conAtom && ul < 1) T.AT.luciernaga(R, lerp(262, 340, ease(ul)), 100 + Math.sin(t * 2.2) * 3, t, { dir: ul > 0 ? 1 : -1, brillo: 0.8, cara: t > TT.llega - 1 ? 'triste' : 'normal' });
};

// el plano congelado: la tele de hm-cosecha en su último instante (49,70 s), con los instantes escritos a mano
const FZ = 49.70, TTF = { sube: 46.64, llega: 48.1, atom: 48.9 };
const congelado = () => horno('congelado', () => teleFinal(FZ, TTF, false));
const P2 = en('fijate1', 0.2618), P3 = en('fijate1', 0.4331), P4 = en('fijate1', 0.6557), P5 = en('fijate1', 0.8703);
const pausa = (t, a, b) => T.AT.pausa(R, tramo(t, a, a + 0.3) * (1 - tramo(t, b - 0.3, b)));

// el libro de Hume: piel marrón, cantoneras doradas, una pluma y «1741»
const libro = () => { R.rect(0, 0, 21, 25, K); R.rect(1, 1, 20, 24, H('#7a3a22')); R.rect(1, 1, 3, 24, H('#5a2814')); R.rect(18, 2, 20, 23, H('#f0e6c8'));
  for (const [x, y] of [[4, 1], [16, 1], [4, 22], [16, 22]]) R.rect(x, y, x + 1, y + 1, H('#e8c040'));
  R.linea(8, 15, 15, 5, H('#f4f0e4')); R.linea(9, 15, 15, 6, H('#c8c0a8')); R.pset(7, 16, K); R.rect(6, 19, 16, 19, H('#e8c040')); };
const tarjeta = (s, fondo, tinta) => () => { R.rect(0, 0, 17, 21, K); R.rect(1, 1, 16, 20, H(fondo)); R.rect(1, 18, 16, 20, mez(H(fondo), K, 0.15));
  if (s === '!') { R.rect(7, 4, 10, 12, H(tinta)); R.rect(8, 13, 9, 13, H(tinta)); R.rect(7, 15, 10, 17, H(tinta)); }
  else { R.rect(6, 4, 11, 5, H(tinta)); R.rect(10, 5, 12, 8, H(tinta)); R.rect(5, 6, 6, 7, H(tinta)); R.rect(8, 9, 10, 10, H(tinta)); R.rect(8, 11, 9, 12, H(tinta)); R.rect(8, 15, 10, 17, H(tinta)); } };

// ── 1 · la pausa: Atom con la claqueta ────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  R.copiar(congelado()); pausa(t, 0, P2 - 0.05);
  const anda = tramo(t, 0, 0.9), x = lerp(262, 238, ease(anda)), clap = en('fijate1', 0.0180), senala = t > en('fijate1', 0.0961) && t < en('fijate1', 0.1961);
  const cara = t > clap && t < clap + 0.7 ? 'sorpresa' : t > en('fijate1', 0.0560) && t < en('fijate1', 0.0961) ? 'guino' : t > en('fijate1', 0.2042) ? 'sonrisa' : 'normal';
  const r = T.AT.atom(R, x, 160, t, { s: 2, pose: anda < 1 ? 'camina' : senala ? 'senala' : 'sostiene', dir: -1, cara, habla: voz(t) });
  // la claqueta: abierta mientras llega, se cierra en «notice this»; luego la deja en la consola
  const ang = t < clap ? 0.45 * tramo(t, 0.2, 0.7) : 0, deja = t > en('fijate1', 0.0961);
  if (!deja) T.AT.escalado(R, claquetaMini(ang, 2), 18, 16, r.mano[0] - 30, r.mano[1] - 22, 2);
  else T.AT.escalado(R, claquetaMini(0, 2), 18, 16, 270, 136, 2);
  if (t > clap && t < clap + 0.3) for (let k = 0; k < 6; k++) { const a = -2.6 + k * 0.4, u = (t - clap) / 0.3; R.linea(Math.round(r.mano[0] - 30 + Math.cos(a) * (6 + u * 6)), Math.round(r.mano[1] - 22 + Math.sin(a) * (6 + u * 6)), Math.round(r.mano[0] - 30 + Math.cos(a) * (10 + u * 8)), Math.round(r.mano[1] - 22 + Math.sin(a) * (10 + u * 8)), H('#ffffff')); }
  // el libro de Hume, a color y al doble, en «this book»
  const ul = tramo(t, en('fijate1', 0.2082), en('fijate1', 0.2222));
  if (ul > 0) { const y = 46 + Math.round((1 - ease(ul)) * 30) + Math.round(Math.sin(t * 2.4) * 1.5); T.AT.escalado(R, libro, 22, 26, 22, y, 2); R.numero('1741', 44, y + 66, { tam: 8, centro: true }); if (t > en('fijate1', 0.2242)) T.AT.anillo(R, 44, y + 26, 30, 34, t, tramo(t, en('fijate1', 0.2242), en('fijate1', 0.2442))); }
};

// ── 2 · el estudio de Hume ───────────────────────────────────────────────────────────────────────────────────
const p2 = (t) => {
  const o = { encuadre: 'biblioteca' }, g = T.real(R, t, o);
  const [hx, hy] = g.hume ?? [140, 136], escribe = t < en('fijate1', 0.3443), vuelve = t > en('fijate1', 0.3483);
  const r = R.actor(EL.hume, hx, hy, t, { dir: vuelve ? -1 : 1, sostiene: escribe ? [hx + 18 + Math.round(Math.sin(t * 9) * 2), hy - 8] : undefined, dedo: vuelve && t > en('fijate1', 0.3603), sorpresa: t > en('fijate1', 0.2978) && t < en('fijate1', 0.3242) });
  T.realDelante(R, t, o);
  // la pluma en la mano mientras escribe
  if (escribe && r?.mano) { const [mx, my] = r.mano; R.linea(mx, my, mx + 5, my - 9, H('#f4f0e4')); R.linea(mx + 1, my, mx + 6, my - 9, H('#c8c0a8')); R.pset(mx - 1, my + 1, K); }
  // en «Hume» la órbita le rodea; en «so few», los pocos del balcón, en la ventana
  const u1 = tramo(t, en('fijate1', 0.2978), en('fijate1', 0.3202)); if (u1 > 0 && t < en('fijate1', 0.3563)) T.AT.anillo(R, hx + 8, hy - 14, 18, 16, t, u1);
  const u2 = tramo(t, en('fijate1', 0.3619), en('fijate1', 0.3843)); if (u2 > 0) T.AT.anillo(R, 160, 62, 12, 7, t, u2);
  const vx = lerp(214, 180, tramo(t, en('fijate1', 0.3403), en('fijate1', 0.3723))), vy = lerp(108, 80, tramo(t, en('fijate1', 0.3403), en('fijate1', 0.3723)));
  T.AT.luciernaga(R, vx + Math.sin(t * 1.4) * 3, vy + Math.sin(t * 2.3) * 2, t, { dir: -1, brillo: 0.8, cara: t > en('fijate1', 0.3643) ? 'sorpresa' : 'normal' });
};

// ── 3 · la plaza desde la calle: pocos arriba, muchos abajo ──────────────────────────────────────────────────
// De noche, a ras de la multitud (de espaldas): al fondo el palacio de piedra con su frontón, su reloj y el balcón
// encendido donde están los tres «pocos»; a los lados, las casas altas de vecinos con sus chimeneas, sus tiendas y
// sus ventanas que se encienden y se apagan; delante, el empedrado y dos faroles de hierro.
const LIM = new Int16Array(320).fill(180), VENT = [];
// sillería: hiladas de alto a, piezas de largo l en matajunta; cada piedra con su tono, su filo de luz y su junta
const silleria = (x0, x1, y0, y1, c, a = 4, l = 8, sem = 0) => { for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / a), jy = (y - y0) % a;
  for (let x = x0; x <= x1; x++) { const xs = x + (f % 2) * (l >> 1), jx = ((xs % l) + l) % l, pz = Math.floor(xs / l), q = hh(pz, f, sem);
    let col = mez(c, q > 0.5 ? H('#b8b0c4') : H('#2a2638'), Math.abs(q - 0.5) * 0.35);
    if (jy === a - 1 || jx === 0) col = mez(c, K, 0.45); else if (jy === 0) col = mez(col, H('#ffffff'), 0.1);
    if (hh(x, y, sem + 3) > 0.93) col = mez(col, K, 0.18);
    R.pset(x, y, col); } } };
// una ventana de guillotina (marco claro, cristal de noche y travesaño); se guarda para encenderla en vivo
const ventana = (x, y, w, h, piedra) => { R.rect(x - 1, y - 1, x + w, y + h, mez(piedra, H('#ffffff'), 0.25)); R.rect(x - 1, y + h, x + w, y + h, mez(piedra, K, 0.4));
  R.rect(x, y, x + w - 1, y + h - 1, H('#141a34')); R.rect(x, y + (h >> 1), x + w - 1, y + (h >> 1), H('#3a3448')); R.rect(x + (w >> 1), y, x + (w >> 1), y + h - 1, H('#3a3448'));
  R.pset(x, y, H('#2a3466')); R.pset(x + 1, y, H('#2a3466')); VENT.push([x, y, w, h]); };
// una casa alta de vecinos (x0–x1; tejado en top; pie en base): pizarra con buhardilla, chimenea, ventanas y tienda
const casaAlta = (x0, x1, top, base, muro, sem) => {
  for (let x = x0; x <= x1; x++) LIM[x] = top;
  for (let y = top; y < top + 5; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, y === top ? H('#1a1c2a') : (x + y * 2) % 5 === 0 ? H('#3a3e50') : hh(x, y, sem) > 0.85 ? H('#4a4e62') : H('#2c3040'));
  silleria(x0, x1, top + 5, base, muro, 4, 8, sem); R.rect(x0, top + 5, x1, top + 6, mez(muro, H('#ffffff'), 0.2)); R.rect(x1, top + 5, x1, base, mez(muro, K, 0.5)); R.rect(x0, top + 5, x0, base, mez(muro, K, 0.3));
  // la chimenea con sus dos cañones
  const cx = x0 + Math.round((x1 - x0) * (hh(sem, 1) > 0.5 ? 0.25 : 0.65)); R.rect(cx - 1, top - 8, cx + 7, top, K); silleria(cx, cx + 6, top - 7, top, mez(muro, K, 0.2), 3, 4, sem + 1);
  for (const dx of [1, 4]) { R.rect(cx + dx, top - 11, cx + dx + 1, top - 8, H('#8a5a42')); R.pset(cx + dx, top - 11, H('#b07a58')); }
  for (let x = cx - 1; x <= cx + 7; x++) LIM[x] = top - 11;
  // las ventanas por pisos
  const n = Math.max(2, Math.floor((x1 - x0 - 4) / 10)), paso = (x1 - x0 + 1) / n;
  for (let y = top + 10; y < base - 30; y += 15) for (let i = 0; i < n; i++) ventana(Math.round(x0 + paso * i + paso / 2 - 3), y, 6, 9, muro);
  // la tienda de abajo: escaparate de madera, puerta y el letrero colgado (sin letras: un pictograma)
  const ty = base - 22; R.rect(x0 + 1, ty, x1 - 1, base, H('#2a1a18')); R.rect(x0 + 2, ty + 1, x1 - 2, ty + 2, H('#5a3424'));
  for (let x = x0 + 3; x < x1 - 2; x += 4) R.rect(x, ty + 4, x, base - 1, H('#3a2418'));
  const ex = x0 + 3, ew = Math.round((x1 - x0) * 0.5); R.rect(ex, ty + 5, ex + ew, base - 6, H('#1a2038')); R.rect(ex, ty + 5, ex + ew, ty + 5, H('#6a4a30')); R.rect(ex + (ew >> 1), ty + 5, ex + (ew >> 1), base - 6, H('#5a3a28'));
  VENT.push([ex + 1, ty + 6, ew - 1, base - ty - 12, 'tienda']);
  const px = x1 - 9; R.rect(px, ty + 6, px + 5, base, H('#4a2a1c')); R.pset(px + 4, ty + 14, H('#e8c040')); R.rect(px, base, px + 5, base, H('#6a5a50'));
  const lx = x1 - 6, ly = ty - 8; R.rect(lx - 6, ly - 1, lx + 2, ly - 1, H('#1a1a22')); R.rect(lx - 6, ly, lx - 6, ly + 1, H('#1a1a22')); R.rect(lx - 2, ly, lx - 2, ly + 1, H('#1a1a22'));
  R.rect(lx - 8, ly + 2, lx, ly + 8, K); R.rect(lx - 7, ly + 3, lx - 1, ly + 7, H('#6a4428')); R.disco(lx - 4, ly + 5, 1.6, H('#e8c040'));
};
// el palacio (x 92–228): frontón con reloj, cornisa con balaustrada, pilastras, ventanas altas, balcón y portalón
const PIEDRA = H('#8a8296'), ALM = H('#e8c040');
const palacio = () => {
  for (let x = 92; x <= 228; x++) LIM[x] = 34;
  silleria(92, 228, 40, 124, PIEDRA, 4, 10, 7);
  // la planta baja almohadillada: juntas hondas
  silleria(92, 228, 98, 124, mez(PIEDRA, K, 0.12), 5, 14, 9);
  for (const y of [40, 66, 97]) { R.rect(92, y, 228, y + 1, mez(PIEDRA, H('#ffffff'), 0.3)); R.rect(92, y + 2, 228, y + 2, mez(PIEDRA, K, 0.45)); }
  // las pilastras con su capitel
  for (const x of [94, 118, 202, 224]) { R.rect(x, 42, x + 3, 96, mez(PIEDRA, H('#ffffff'), 0.18)); R.rect(x + 3, 42, x + 3, 96, mez(PIEDRA, K, 0.35)); R.rect(x - 1, 42, x + 4, 43, mez(PIEDRA, H('#ffffff'), 0.35)); }
  // la cornisa y la balaustrada del tejado (fuera del frontón)
  R.rect(90, 38, 230, 39, mez(PIEDRA, H('#ffffff'), 0.25)); R.rect(90, 34, 230, 34, mez(PIEDRA, K, 0.2));
  for (let x = 92; x <= 228; x += 3) if (x < 126 || x > 194) { R.rect(x, 35, x + 1, 37, mez(PIEDRA, H('#ffffff'), 0.1)); R.pset(x + 1, 37, mez(PIEDRA, K, 0.4)); }
  for (let x = 92; x <= 228; x++) if (x < 126 || x > 194) for (let y = 35; y < 38; y++) if (((x - 92) % 3) === 2) R.pset(x, y, H('#1a2048'));
  // el frontón con el reloj
  R.poligono([[124, 40], [160, 18], [196, 40]], mez(PIEDRA, K, 0.5)); R.poligono([[127, 39], [160, 20], [193, 39]], mez(PIEDRA, H('#ffffff'), 0.12)); R.poligono([[133, 38], [160, 23], [187, 38]], mez(PIEDRA, K, 0.2));
  for (let x = 124; x <= 196; x++) LIM[x] = Math.min(LIM[x], Math.round(40 - (22 - Math.abs(x - 160) * 22 / 36)));
  R.disco(160, 32, 5, K); R.disco(160, 32, 4, H('#f0e6c8')); for (let k = 0; k < 12; k++) R.pset(160 + Math.round(Math.cos(k * 0.5236) * 3.4), 32 + Math.round(Math.sin(k * 0.5236) * 3.4), H('#8a7a5a'));
  R.rect(158, 17, 162, 18, ALM); R.pset(160, 15, ALM); R.pset(160, 16, ALM);
  // ventanas altas de arriba, con su frontoncillo
  for (const x of [102, 124, 136, 184, 196, 212]) { ventana(x, 50, 6, 12, PIEDRA); R.rect(x - 2, 47, x + 7, 48, mez(PIEDRA, H('#ffffff'), 0.3)); R.rect(x - 1, 46, x + 6, 46, mez(PIEDRA, H('#ffffff'), 0.2)); }
  // ventanas de la planta noble, a los lados del balcón
  for (const x of [102, 124, 190, 212]) { ventana(x, 72, 6, 16, PIEDRA); R.rect(x - 2, 70, x + 7, 70, mez(PIEDRA, H('#ffffff'), 0.3)); }
  // la puerta del balcón (la luz se pinta en vivo) y su arco
  R.rect(144, 58, 176, 87, mez(PIEDRA, K, 0.4)); R.rect(145, 59, 175, 87, H('#5a3a1e'));
  // la planta baja: ventanas con reja y el portalón en arco con clavos
  for (const x of [102, 124, 190, 212]) { R.rect(x - 1, 104, x + 7, 116, K); R.rect(x, 105, x + 6, 115, H('#141a34')); for (let k = x + 1; k <= x + 5; k += 2) R.rect(k, 105, k, 115, H('#3a3a46')); }
  R.rect(147, 102, 173, 124, K); R.disco(160, 104, 13, K); R.disco(160, 104, 12, H('#3a2416')); R.rect(148, 104, 172, 124, H('#3a2416'));
  for (let x = 150; x <= 170; x += 4) for (let y = 98; y <= 122; y += 4) if ((x - 160) ** 2 + (y - 104) ** 2 < 120 || y > 104) R.pset(x, y, H('#a07a3a'));
  R.rect(160, 95, 160, 124, H('#1a1010')); for (let a = Math.PI; a <= Math.PI * 2; a += 0.05) R.pset(Math.round(160 + Math.cos(a) * 13), Math.round(104 + Math.sin(a) * 13), mez(PIEDRA, H('#ffffff'), 0.3));
  // la escalinata
  for (let k = 0; k < 3; k++) { const y = 124 + k * 2, a = 118 - k * 6, b = 202 + k * 6; R.rect(a, y, b, y + 1, mez(PIEDRA, K, 0.1 + k * 0.08)); R.rect(a, y, b, y, mez(PIEDRA, H('#ffffff'), 0.2)); }
};
const plazaFondo = () => horno('plaza', () => {
  // el cielo de noche tramado y las estrellas
  degradado(0, 319, 0, 124, [H('#080a20'), H('#10163a'), H('#1a2452'), H('#2a3462')]);
  for (let k = 0; k < 90; k++) { const x = Math.floor(hh(k, 1, 31) * 320), y = Math.floor(hh(k, 2, 31) * 70); R.pset(x, y, k % 4 ? H('#7a80b0') : H('#e8ecff')); }
  // al fondo, lejos y en penumbra, los tejados de la ciudad por detrás del palacio
  for (let x = 60, i = 0; x < 262; i++) { const w = 10 + Math.floor(hh(i, 1, 33) * 12), h = 6 + Math.floor(hh(i, 2, 33) * 10);
    R.poligono([[x, 60], [x, 42 - h + 8], [x + w / 2, 36 - h + 8], [x + w, 42 - h + 8], [x + w, 60]], H('#20264a')); R.linea(x, 42 - h + 8, x + Math.round(w / 2), 36 - h + 8, H('#3a4070'));
    if (hh(i, 3, 33) > 0.5) R.pset(x + 3, 46 - h + 8, H('#d89a40')); x += w + 1; }
  palacio();
  casaAlta(0, 30, 6, 128, H('#7a6e70'), 41); casaAlta(31, 62, 20, 128, H('#6e6a7a'), 42); casaAlta(63, 91, 32, 128, H('#7c7468'), 43);
  casaAlta(229, 257, 32, 128, H('#746e7e'), 44); casaAlta(258, 289, 20, 128, H('#7e7066'), 45); casaAlta(290, 319, 6, 128, H('#6c6a76'), 46);
  for (const x of [30, 62, 91, 229, 257, 289]) R.rect(x, 20, x, 128, K);
  // el empedrado: hiladas de adoquines que crecen hacia la cámara, con su filo de luz y sus juntas
  for (let y = 128, f = 0; y < 180; f++) { const a = 2 + Math.floor((y - 128) / 12), l = a * 2 + 2;
    for (let j = 0; j < a; j++) for (let x = 0; x < 320; x++) { if (y + j > 179) break; if (y + j < 130 && x > 112 && x < 208) continue;
      const xs = x + (f % 2) * (l >> 1), jx = xs % l, q = hh(Math.floor(xs / l), f, 51); let c = mez(H('#4a4656'), H('#6a6474'), q);
      if (j === a - 1 || jx === 0) c = H('#24222e'); else if (j === 0 && jx < l - 1) c = mez(c, H('#ffffff'), 0.15); if (hh(x, y + j, 52) > 0.95) c = H('#7a7486');
      R.pset(x, y + j, c); } y += a; }
  // la luz de los faroles y del portalón, cálida sobre el empedrado y las fachadas (cocida: los faroles no se mueven)
  const B = R.buf; for (const [lx, ly, r, k] of [[34, 100, 46, 0.42], [286, 100, 46, 0.42], [160, 116, 60, 0.3]]) for (let y = Math.max(0, ly - r); y < Math.min(180, ly + r); y++) for (let x = Math.max(0, lx - r); x < Math.min(320, lx + r); x++) {
    const d = Math.hypot(x - lx, (y - ly) * 1.4) / r; if (d < 1 && (1 - d) * k > bay(x, y) * 0.5) B[y * 320 + x] = mez(B[y * 320 + x], H('#e8a050'), (1 - d) * k); }
});
// un farol de hierro en su poste (x; pie en y), con la llama que tiembla
const farol = (x, y, t) => { R.rect(x - 1, y - 52, x + 1, y, K); R.rect(x, y - 52, x, y - 1, H('#3a3a46')); R.rect(x - 3, y - 2, x + 3, y, K);
  R.rect(x - 5, y - 64, x + 5, y - 52, K); R.rect(x - 4, y - 62, x + 4, y - 54, H('#f8d070')); R.rect(x - 4, y - 58, x + 4, y - 58, K); R.rect(x, y - 62, x, y - 54, K);
  const f = Math.sin(t * 11 + x) * 0.5 + Math.sin(t * 7.3) * 0.5; R.rect(x - 2, y - 61, x - 1, y - 59, f > 0 ? H('#fff8d0') : H('#f8e090')); R.rect(x + 1, y - 57, x + 2, y - 55, f > 0.3 ? H('#fff8d0') : H('#f0b060'));
  R.poligono([[x - 6, y - 64], [x, y - 69], [x + 6, y - 64]], K); R.pset(x, y - 70, K);
  for (let k = 0; k < 18; k++) { const a = k * 0.35, rr = 9 + f; const px = Math.round(x + Math.cos(a) * rr), py = Math.round(y - 58 + Math.sin(a) * rr); if (hh(k, Math.floor(t * 6)) > 0.4) R.pset(px, py, mez(R.buf[py * 320 + px], H('#f8d070'), 0.4)); } };
// la luz en vivo de una ventana: las de los vecinos se encienden y se apagan; tras el visillo pasa una sombra
const luzVentanas = (t) => VENT.forEach(([x, y, w, h, tipo], i) => { const on = tipo === 'tienda' || hh(i, Math.floor((t + i * 1.7) / 4.5), 61) < 0.42; if (!on) return;
  for (let j = 0; j < h; j++) for (let k = 0; k < w; k++) if (k !== (w >> 1) && j !== (h >> 1)) R.pset(x + k, y + j, j < h * 0.4 ? H('#f8d080') : H('#e0a050'));
  if (tipo !== 'tienda' && i % 3 === 0) { const sx = x + Math.round((Math.sin(t * 0.8 + i) * 0.5 + 0.5) * (w - 2)); R.rect(sx, y + 2, sx + 1, y + h - 1, H('#8a5a30')); } });

// uno de la multitud, de espaldas (pies fuera de cuadro; y: hombros abajo), con casaca de la época y, según q, coleta
// con lazo, tricornio o cofia; sube < 0: agacha la cabeza (se le ve la nuca); luz: la luz del balcón en el pelo
const CASACA = ['#4a3a30', '#3a4a3a', '#2e3448', '#5a4a3a', '#6a5a4a', '#4a3040', '#3a3a40', '#7a6a58'].map(H);
const nuca = (px, y, s, q, sube, luz) => {
  // agachados, quedan en la sombra: la ola se lee como una sombra que se abre desde el centro
  const som = sube < 0 ? 0.38 : 0, ropa = mez(CASACA[Math.floor(q * 8)], K, som), pelo = mez(PELO[Math.floor((q * 7.3 % 1) * 7)], K, som * 0.6), piel = PIEL[Math.floor((q * 13.1 % 1) * 3)], tipo = q * 17 % 1;
  const hw = Math.max(2, Math.round(s * 0.62)), ys = Math.round(y - s * 0.5), r = Math.max(1.6, s * 0.36), hy = Math.round(y - s * 0.95) - sube, rr = Math.ceil(r);
  // los hombros redondeados, con la luz arriba y una costura en la espalda
  R.rect(px - hw, ys, px + hw, y + s, K); R.rect(px - hw + 1, ys + 1, px + hw - 1, y + s, ropa); R.rect(px - hw + 1, ys + 1, px + hw - 1, ys + 1, mez(ropa, H('#ffffff'), 0.2));
  R.pset(px - hw, ys, mez(ropa, K, 0.6)); R.pset(px + hw, ys, mez(ropa, K, 0.6)); R.rect(px + hw - 2, ys + 2, px + hw - 1, y + s, mez(ropa, K, 0.3)); if (s >= 9) R.rect(px, ys + 3, px, y + s, mez(ropa, K, 0.3));
  if (sube < 0) R.rect(px - 1, hy + rr - 1, px + 1, ys, piel);   // agachado, se le ve la nuca
  R.disco(px + 0.5, hy, r + 0.9, K); R.disco(px + 0.5, hy, r, pelo);
  R.pset(px - rr, hy + 1, piel); R.pset(px + rr + 1, hy + 1, piel);
  if (s >= 7) { R.pset(px - 1, hy - rr + 1, mez(pelo, H('#ffffff'), 0.3)); R.pset(px + 2, hy + 1, mez(pelo, K, 0.3)); }
  if (luz) for (let i = -rr + 1; i <= rr; i++) { const j = -Math.round(Math.sqrt(Math.max(0, r * r - i * i))); R.pset(px + i, hy + j, Math.abs(i) < r * 0.5 ? H('#ffe8a8') : H('#e8b060')); }
  if (tipo < 0.22 && s >= 6) { const yb = hy - Math.round(r * 0.5); R.rect(px - rr - 1, yb, px + rr + 2, yb + 1, H('#1a1a22')); R.rect(px - rr + 1, yb - 2, px + rr, yb, H('#24242e')); R.pset(px - rr - 1, yb - 1, H('#1a1a22')); R.pset(px + rr + 2, yb - 1, H('#1a1a22')); }
  else if (tipo < 0.38 && s >= 6) { for (let j = -rr; j <= 0; j++) for (let i = -rr; i <= rr; i++) if (i * i + j * j <= r * r) R.pset(px + i, hy + j - 1, j === 0 ? H('#b8b0a0') : (i + j) % 3 === 0 ? H('#c8c0b0') : H('#d8d0c0')); R.pset(px + rr, hy, H('#8a3a3a')); }
  else if (tipo < 0.6 && s >= 7) { R.rect(px, hy + rr, px + 1, hy + rr + Math.round(s * 0.35), pelo); R.pset(px, hy + rr, H('#2a2a3a')); R.pset(px + 1, hy + rr, H('#2a2a3a')); }
};
const p3 = (t) => {
  R.copiar(plazaFondo());
  // el cielo vivo: la luna con su halo, nubes de tres tonos a tres velocidades (por detrás de los tejados) y el humo
  { const mx = 110, my = 15, B = R.buf; for (let y = my - 12; y <= my + 12; y++) for (let x = mx - 12; x <= mx + 12; x++) { if (y < 0 || y >= LIM[x]) continue; const d = Math.hypot(x - mx, y - my);
      if (d < 5.5) R.pset(x, y, hh(x >> 1, y >> 1, 71) < 0.2 ? H('#c8c4b0') : H('#f0ecd8')); else if (d < 12 && (12 - d) / 14 > bay(x, y)) B[y * 320 + x] = mez(B[y * 320 + x], H('#4a5288'), 0.6); } }
  const NOC = [H('#5a6090'), H('#3a4270'), H('#262c58')];
  for (const [k, y, w, v] of [[0, 8, 40, 0.8], [1, 22, 30, 1.6], [2, 14, 52, 0.5], [3, 30, 26, 2.4]]) nube(((k * 131 + t * v) % 420) - 60, y, w, LIM, NOC);
  for (let k = 0; k < 20; k++) { const x = Math.floor(hh(k, 5, 32) * 320), y = Math.floor(hh(k, 6, 32) * 60); if (y < LIM[x] && Math.sin(t * 3 + k * 2.1) > 0.4) R.pset(x, y, H('#ffffff')); }
  for (const [x, y, s] of [[10, -5, 0.1], [36, 9, 0.4], [71, 21, 0.7], [236, 21, 0.2], [264, 9, 0.5], [300, -5, 0.9]]) humo(x + 3, y, t, s);
  // un murciélago que cruza el cielo de vez en cuando
  { const u = (t / 7) % 1; if (u < 0.4) { const bx = Math.round(330 - u / 0.4 * 360), by = Math.round(44 + Math.sin(u * 30) * 3), a = Math.sin(t * 18) > 0 ? -1 : 1; if (bx > 0 && bx < 319 && by < LIM[bx]) { R.pset(bx, by, H('#0a0a18')); R.pset(bx - 1, by + a, H('#0a0a18')); R.pset(bx + 1, by + a, H('#0a0a18')); R.pset(bx - 2, by + a * 2, H('#0a0a18')); R.pset(bx + 2, by + a * 2, H('#0a0a18')); } } }
  luzVentanas(t);
  // los estandartes del palacio, que ondean (barras y un pictograma de corona, sin letras)
  for (const x0 of [106, 208]) for (let y = 44; y < 64; y++) { const o = Math.round(Math.sin(t * 2.4 - y * 0.3) * (y - 44) / 14); for (let x = x0; x < x0 + 8; x++) R.pset(x + o, y, x === x0 || x === x0 + 7 ? K : y > 60 ? H('#e8c040') : (x + o + y) % 7 === 0 ? H('#a82a32') : H('#c8303a'));
    if (y === 52) { R.pset(x0 + 3 + o, y, ALM); R.pset(x0 + 4 + o, y, ALM); R.pset(x0 + 2 + o, y - 1, ALM); R.pset(x0 + 5 + o, y - 1, ALM); R.pset(x0 + 3 + o, y - 2, ALM); } }
  // el balcón: la luz de la sala de detrás, que tiembla con las velas de dentro
  { const f = Math.sin(t * 5) * 0.06 + 0.94; for (let y = 60; y <= 86; y++) for (let x = 146; x <= 174; x++) R.pset(x, y, (y - 60) / 26 * f > bay(x, y) * 0.9 ? H('#e8a050') : H('#f8d888'));
    R.rect(159, 60, 160, 86, H('#8a5a2a')); R.rect(146, 70, 174, 70, H('#8a5a2a'));
    for (const [ax, ay] of [[150, 63], [169, 63]]) { R.pset(ax, ay, H('#fff8e0')); R.pset(ax, ay + 1, H('#f8c860')); } }
  // los pocos: tres en el balcón, de cara; el del centro con banda dorada
  const story = tramo(t, en('fijate1', 0.5804), en('fijate1', 0.6085));
  for (const [x, q, m] of [[150, 0.12, 1], [160, 0.71, 0], [170, 0.38, -1]]) { const mira = x === 160 ? 0 : (Math.sin(t * 0.9 + x) > 0.4 ? m : 0);
    carita(x, 86, 9, q, mira, x === 160 && story > 0 ? 1 : 0); if (x === 160) { R.rect(158, 80, 162, 80, ALM); R.pset(160, 81, ALM); } }
  // la balaustrada de piedra, por delante de ellos
  R.rect(138, 80, 182, 81, mez(PIEDRA, H('#ffffff'), 0.3)); R.rect(138, 82, 182, 82, mez(PIEDRA, K, 0.5));
  for (let x = 139; x <= 181; x += 3) { R.rect(x, 83, x + 1, 87, PIEDRA); R.pset(x + 1, 85, mez(PIEDRA, K, 0.3)); }
  R.rect(136, 88, 184, 90, mez(PIEDRA, H('#ffffff'), 0.18)); R.rect(136, 91, 184, 91, mez(PIEDRA, K, 0.5));
  for (const x of [140, 160, 180]) { R.rect(x - 2, 92, x + 2, 95, mez(PIEDRA, K, 0.1)); R.pset(x, 96, mez(PIEDRA, K, 0.4)); }
  // el del centro desenrolla un pergamino en «story» y lo deja colgar por la balaustrada
  if (story > 0) { const L = Math.round(story * 16); R.rect(153, 78, 167, 79, K); R.rect(154, 78, 166, 78, H('#c8a060'));
    R.rect(155, 80, 165, 79 + L, K); R.rect(156, 80, 164, 78 + L, H('#f4ecd4')); for (let k = 3; k < L - 1; k += 3) R.linea(158, 79 + k, 162, 79 + k, H('#b8aa8c'));
    R.rect(154, 79 + L, 166, 80 + L, H('#c8a060')); R.pset(153, 78, PIEL[0]); R.pset(167, 78, PIEL[0]); }
  // los faroles de la plaza
  farol(34, 160, t); farol(286, 160, t);
  // los muchos: la multitud de espaldas, en seis filas que crecen hacia la cámara. En «govern so many» agacha la
  // cabeza en ola desde el centro; en «story» la levanta en otra ola y mira arriba (con la luz del balcón en el pelo)
  const baja = tramo(t, en('fijate1', 0.4520), en('fijate1', 0.5000)), alza = tramo(t, en('fijate1', 0.5941), en('fijate1', 0.6525));
  for (const [y, s, x0, x1, sem] of [[133, 5, 96, 224, 1], [141, 6, 0, 320, 2], [150, 7, -2, 322, 3], [160, 9, -2, 322, 4], [172, 11, -6, 326, 5], [187, 14, -8, 328, 6]]) {
    const paso = Math.max(4, Math.round(s * 1.15));
    for (let x = x0, i = 0; x <= x1; x += paso, i++) { const q = hh(i, sem), px = Math.round(x + (q - 0.5) * 3 + (sem % 2) * paso * 0.5), py = y + Math.round((hh(i, sem, 2) - 0.5) * (s > 6 ? 3 : 1)), d = Math.abs(px - 160) / 170;
      const agacha = d < baja && !(d < alza), mira = d < alza;
      const sube = agacha ? -Math.max(2, Math.round(s * 0.42)) : mira ? Math.max(1, Math.round(s * 0.15)) : Math.sin(t * 1.3 + i * 1.7 + sem) > 0.9 ? 1 : 0;
      nuca(px, py, s, q, sube, mira); } }
  // los farolillos que lleva la gente, colgados de palos, que se mecen
  for (const [x, y, k] of [[58, 112, 0], [122, 124, 1], [206, 120, 2], [258, 110, 3]]) { const o = Math.round(Math.sin(t * 1.6 + k * 2) * 1.5); R.linea(x, y + 30, x + o, y, H('#3a2a1e'));
    R.rect(x + o - 2, y, x + o + 2, y + 5, K); R.rect(x + o - 1, y + 1, x + o + 1, y + 4, Math.sin(t * 9 + k) > 0 ? H('#fff0b0') : H('#f8c060')); R.pset(x + o, y - 1, K); }
  // en «whoever controls» la órbita rodea el balcón
  const ua = tramo(t, en('fijate1', 0.5460), en('fijate1', 0.5684)); if (ua > 0) T.AT.anillo(R, 160, 82, 30, 14, t, ua);
  T.AT.luciernaga(R, lerp(300, 232, tramo(t, P3, P3 + 1.4)) + Math.sin(t * 1.3) * 2, 104 + Math.sin(t * 2.2) * 2, t, { dir: -1, brillo: 0.8, cara: t > en('fijate1', 0.5941) ? 'sorpresa' : 'normal' });
};

// ── 4 · la librería: la torre de la saga ─────────────────────────────────────────────────────────────────────
const p4 = (t) => {
  const pone = en('fijate1', 0.7558), urge = tramo(t, en('fijate1', 0.8318), en('fijate1', 0.8847));
  const torre = 0.35 + (t > pone ? 0.15 : 0) + 0.45 * ease(urge);
  const o = { encuadre: 'libreria', torre }, g = T.real(R, t, o), S = g.suelo ?? 166;
  // la librera sella un libro tras el mostrador
  // (mira a Atom cuando entra; luego sella con su tampón la pila de libros de su izquierda, lejos de su cara)
  const sella = t > en('fijate1', 0.7966) && t < en('fijate1', 0.8086), mira = t > en('fijate1', 0.7366), coge = t > en('fijate1', 0.7826) && t < en('fijate1', 0.8226);
  const lib = R.actor(EL.publico, 252, 141, t, { dir: mira ? -1 : 1, sostiene: coge ? [240, 116 + (sella ? 3 : 0)] : false, sorpresa: urge > 0.2, habla: mira && !coge && urge === 0 ? 0.5 : 0 });
  // el tampón en su mano: mango de madera y goma roja
  if (coge && lib?.mano) { const [bx, by] = lib.mano; R.rect(bx - 2, by - 5, bx + 2, by + 2, K); R.rect(bx - 1, by - 4, bx + 1, by - 1, H('#7a5030')); R.rect(bx - 1, by, bx + 1, by + 1, H('#c8303a')); }
  T.realDelante(R, t, o);
  // Atom entra con los tres libros de la saga y los deja en la torre
  const anda = tramo(t, P4, en('fijate1', 0.7366)), x = lerp(92, 128, ease(anda)), atras = tramo(t, en('fijate1', 0.7886), en('fijate1', 0.8166));
  const r = T.AT.atom(R, x - atras * 12, S, t, { pose: anda < 1 ? 'camina' : t < pone - 0.5 ? 'sostiene' : t < pone + 0.3 ? 'saluda' : urge > 0 ? 'brazos' : 'quieto', dir: 1, cara: urge > 0 ? 'sorpresa' : 'sonrisa', habla: voz(t) * 0.6 });
  // los tres libros de la saga: en la mano, y en «saga» los lanza a lo alto de la torre en arco
  const vuela = tramo(t, pone - 0.5, pone), [mx, my] = r.mano, cima = g.torre ? g.torre[2] : 100;
  if (t < pone) for (const [k, c] of [[0, '#3a8a4a'], [1, '#c8303a'], [2, '#e8c040']]) { const x = Math.round(lerp(mx, 146, vuela)), y = Math.round(lerp(my, cima - 4, vuela) - Math.sin(vuela * Math.PI) * 26) - k * 3;
    R.rect(x - 4, y - 3, x + 5, y - 1, K); R.rect(x - 3, y - 3, x + 4, y - 2, H(c)); R.pset(x + 4, y - 2, H('#f4f0e4')); }
  if (t > pone && t < pone + 0.4) for (let k = 0; k < 5; k++) R.pset(144 + k * 3, cima - 6 - (k % 2) * 3, H('#ffffff'));

  // libros que caen a la torre mientras crece
  if (urge > 0 && urge < 1) for (let k = 0; k < 3; k++) { const f = (urge * 3 + k / 3) % 1, y = Math.round(20 + f * 70); R.rect(146, y, 156, y + 2, K); R.rect(147, y, 155, y + 1, H(['#3a8a4a', '#c8303a', '#e8c040'][k])); }
};

// ── 5 · la pausa otra vez: ¿real o no real? ──────────────────────────────────────────────────────────────────
const p5 = (t) => {
  R.copiar(congelado()); pausa(t, P5 - 0.3, E.duracion);
  const real = en('fijate1', 0.9479), no = en('fijate1', 0.9703), hom = t > en('fijate1', 0.9807);
  const r = T.AT.atom(R, 238, 160, t, { s: 2, pose: hom ? 'brazos' : t > real ? 'senala' : 'quieto', dir: t > no ? 1 : -1, cara: hom ? 'guino' : t > real ? 'sorpresa' : 'normal', habla: voz(t) });
  T.AT.escalado(R, claquetaMini(0, 2), 18, 16, 270, 136, 2);
  for (const [s, f, tn, x, t0] of [['?', '#f8f4ec', '#e8483a', 40, real], ['!', '#f0d860', '#1a1424', 120, no]]) { const u = tramo(t, t0, t0 + 0.3); if (u <= 0) continue;
    const y = 40 + Math.round((1 - ease(u)) * 30) + Math.round(Math.sin(t * 2 + x) * 1.5); T.AT.escalado(R, tarjeta(s, f, tn), 18, 22, x, y, 2);
    T.AT.anillo(R, x + 18, y + 22, 26, 30, t, tramo(t, t0 + 0.1, t0 + 0.5)); }
};

// la pausa entra con un golpe seco que para la imagen («cuelga»: no hay receta de tape-stop) y sale con un clic
// («interruptor») justo cuando vuelve el color; un pop por cada objeto que sale a color (el libro, «?» y «!»)
const efectos = [[0.05, 'tapestop'], [en('fijate1', 0.0180), 'palmada'], [en('fijate1', 0.2082), 'pop'], [en('fijate1', 0.2722), 'lapiz'], [en('fijate1', 0.3483), 'papel'],
  [en('fijate1', 0.4520), 'publico', { dur: 2.5 }], [en('fijate1', 0.5804), 'papel'], [en('fijate1', 0.6005), 'publico', { dur: 2.5, ola: 1 }],
  [en('fijate1', 0.7558), 'golpecito'], [en('fijate1', 0.7966), 'sello'], [en('fijate1', 0.8318), 'avalancha'], [en('fijate1', 0.9479), 'pop'], [en('fijate1', 0.9703), 'pop'], [E.duracion - 0.3, 'interruptor']];
// el año: Juegos 50 en la tele congelada; ni Hume (1741) ni la librería de hoy son de los Juegos, así que sin barra
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: (t) => (t >= P2 && t < P5 ? null : 50) });
''')
