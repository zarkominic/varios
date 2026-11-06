E = {}

E['tr-gancho'] = ('Gancho', '''// TR-GANCHO (frases 1–2), sin cartela. Siete planos:
// 1. la Puerta del Sol en Nochevieja: la bola baja, suenan las campanadas y la gente se come las uvas; la uva con ojos
//    salta del racimo del chico y se escapa corriendo por delante de la multitud (gag 1, en los 3 primeros segundos);
// 2. en «Take New Year's Eve»: la torre del reloj de cerca desde la azotea: las campanadas 7 a 12 con su contador y los
//    dos chicos que se comen una uva en cada una; en «twelve chimes», la duodécima, saltan y estallan los fuegos;
// 3. en «The famous story»: el andén de una estación de Alicante en 1909: cajas de uvas que se amontonan, el vagón lleno,
//    el viticultor con su carretilla; en «1909» se estampa el año en el vagón;
// 4. en «but Madrid newspapers»: la mesa de Nochevieja de cerca: el «1909» se tacha, el periódico de 1894 cae sobre el
//    mantel y su año se enciende en «fifteen years earlier»; en «aren't alone» asoma otra uva con ojos;
// 5. en «Along the way»: el calendario gigante y sus estampas: el rey de la cachetada (en «king»), la carta tras los
//    barrotes (en «valentine») y el pastel con monedas;
// 6. en «birthday»: el piano del kínder de 1893: suena la canción y de las notas salen monedas hasta «2000000»;
// 7. en «so this time»: el salón de Atom: el calendario pasa las hojas saltándose diciembre; el chico lo señala en
//    «calendar» y la uva se esconde tras la copa.''', r'''
const u = (f) => en('uvas', f), z = (f) => en('anzuelos', f);
const P2 = u(0.2764), P3 = u(0.5895), P4 = u(0.8102), P5 = z(0.0964), P6 = z(0.4603), P7 = z(0.8126);
const K = T.C.k;
// las doce campanadas: 1–6 en el plano 1, 7–12 en el 2 (la duodécima en «chimes»)
const CAMP = [];
for (let k = 0; k < 6; k++) CAMP.push(u(0) + 0.1 + k * 1.0);
for (let k = 0; k < 6; k++) CAMP.push(lerp(u(0.3248), u(0.5389), k / 5));
const camp = (t) => { let i = -1; while (i + 1 < 12 && t >= CAMP[i + 1]) i++; if (i < 0) return 0; const sig = CAMP[i + 1] ?? CAMP[i] + 1; return i + 1 + Math.min(0.99, (t - CAMP[i]) / (sig - CAMP[i])); };
// un racimo pequeño (de mano): n granos de 3 px
const GR = [[0, 3], [-3, 4], [3, 4], [-1, 6], [2, 6], [-4, 7], [5, 7], [0, 9], [-3, 9], [3, 9], [-1, 12], [2, 12]];
const racimito = (x, y, n = 12) => {
  R.linea(x, y - 1, x, y + 2, hex('#5a3a1a')); R.pset(x + 1, y, hex('#7ab83a')); R.pset(x + 2, y - 1, hex('#5a9a2a')); R.pset(x + 2, y, hex('#7ab83a'));
  const g = GR.slice(0, n);
  for (const [i, j] of g) R.rect(x + i - 1, y + j - 1, x + i + 2, y + j + 2, K);
  for (const [i, j] of g) { R.rect(x + i, y + j, x + i + 1, y + j + 1, hex('#6a2a7a')); R.pset(x + i, y + j, hex('#b07ac8')); R.pset(x + i + 1, y + j + 1, hex('#3e1450')); }
};
// quien come: la mano sube a la boca 0,3 s después de cada campanada; devuelve cuántas lleva
const comidas = (t) => CAMP.filter((c) => t >= c + 0.15).length;
const aBoca = (t) => CAMP.some((c) => t >= c && t < c + 0.32);
const comeUvas = (def, x, suelo, t, dir, o = {}) => {
  const boca = aBoca(t + (o.desfase ?? 0)), sx = dir > 0 ? x + 11 : x + 3;
  const a = R.actor(def, x, suelo, t, { dir, sostiene: boca ? [sx + dir * 1, suelo - 17] : [sx + dir * 6, suelo - 9], sonrisa: !boca && o.sonrisa, sorpresa: o.sorpresa, ...o.mas });
  const [mx, my] = a.mano; racimito(mx, my + 1, Math.max(1, 12 - comidas(t)));
  return a;
};

// 1 · la Puerta del Sol: la bola, las campanadas 1–6 y la uva que se escapa
const salta = 1.35, aterriza = 2.05, sale = 3.7;
const p1 = (t) => {
  const o = { encuadre: 'sol', bola: 0.55 + 0.45 * tramo(t, 0, 0.6), campanada: camp(t), fuegos: 0.25 };
  const g = T.anuevo(R, t, o);
  comeUvas(EL.madre62, 62, 162, t, 1, { desfase: 0.05, sonrisa: true, mas: { pal: { C: '#2a5a8a', c: '#1c3c60' } } });
  // el chico: la uva salta de SU racimo
  const sorp = t > salta && t < sale + 0.4;
  const a = R.actor(EL.chicoHoy, 112, 162, t, { dir: 1, sorpresa: sorp, sostiene: t < salta - 0.25 ? [126, 148] : sorp ? [130, 142] : [128, 147] });
  const [mx, my] = a.mano;
  PIEZAS.racimo(R, mx + 1, my + 18, { hueco: t > salta });
  comeUvas(EL.chicaHoy, 168, 162, t, -1, { sonrisa: true, mas: { dedo: t > aterriza && t < sale } });
  R.actor(EL.abuela62, 200, 162, t, { dir: -1, sonrisa: true, habla: Math.sin(t * 6) > 0.4 });
  comeUvas(EL.nino62, 236, 162, t, -1, { desfase: 0.1, sonrisa: true });
  T.anuevoDelante(R, t, o);
  // la uva con ojos: salta en arco, cae delante de la gente y se escapa corriendo hacia la derecha
  if (t >= salta) {
    let x, y, cara = 'susto', corre = false;
    if (t < aterriza) { const k = (t - salta) / (aterriza - salta); x = lerp(mx + 2, 150, k); y = lerp(my + 4, 176, k) - Math.sin(k * Math.PI) * 26; }
    else { const k = tramo(t, aterriza + 0.35, sale); x = lerp(150, 336, k); y = 176; corre = k > 0 && k < 1; cara = k > 0.05 ? 'susto' : 'susto'; }
    if (corre) for (let k = 1; k <= 3; k++) R.rect(Math.round(x) - 8 - k * 4, Math.round(y) - 4 - k * 3, Math.round(x) - 6 - k * 4, Math.round(y) - 4 - k * 3, hex('#e8e4f0'));
    if (x < 330) T.uva(R, Math.round(x), Math.round(y), t, { cara, corre });
    if (t < salta + 0.8) R.icono('!', 117, 120, hex('#ffe08a'), K, 2);
    if (t < salta + 0.25) for (let k = 0; k < 6; k++) { const an = k * 1.05, r = 6 + (t - salta) * 30; R.pset(Math.round(mx + 2 + Math.cos(an) * r), Math.round(my + 4 + Math.sin(an) * r), hex('#fff0a0')); }
  }
};
const PIEZAS = T.PIEZAS_TR;

// 2 · la torre del reloj: las campanadas 7–12, el contador y los fuegos
const doce = CAMP[11];
const p2 = (t) => {
  const o = { encuadre: 'sol', camara: 'reloj', bola: 1, campanada: camp(t), fuegos: 0.3 + 0.7 * tramo(t, doce, doce + 0.8), minuto: lerp(59.6, 60, tramo(t, CAMP[6], doce)) };
  T.anuevo(R, t, o);
  const fiesta = t > doce + 0.1, s = fiesta ? Math.round(Math.abs(Math.sin((t - doce) * 7)) * 5) : 0;
  comeUvas(EL.chicaHoy, 104, 166, t, 1, { sonrisa: true, mas: fiesta ? { brazos: true, salto: s, sonrisa: true } : {} });
  comeUvas(EL.chicoHoy, 140, 166, t, 1, { desfase: 0.08, mas: fiesta ? { brazos: true, salto: Math.round(Math.abs(Math.sin((t - doce) * 7 + 1)) * 5), sonrisa: true } : {} });
  // un vecino en su azotea, a la derecha, con su copa
  R.actor(EL.padre62, 272, 166, t, { dir: -1, sonrisa: true, sostiene: fiesta ? [268, 134] : [266, 150] });
  // el contador de campanadas, grande
  const n = Math.min(12, Math.max(6, Math.floor(camp(t))));
  const pulso = CAMP.some((c) => t >= c && t < c + 0.18) ? 2 : 0;
  R.numero(String(n), 112, 62 - pulso, { tam: 16, centro: true });
  for (let k = 0; k < 12; k++) { const x = 52 + k * 10, y = 72, ya = k < n; R.disco(x + 2, y + 2, 3, K); R.disco(x + 2, y + 2, 2.2, ya ? hex('#3e1450') : hex('#6a2a7a')); if (!ya) R.pset(x + 1, y + 1, hex('#b07ac8')); }
  T.anuevoDelante(R, t, o);
  // la uva fugitiva cruza la azotea y se mete detrás de la chimenea
  const k = tramo(t, u(0.39), u(0.47)); if (k > 0 && k < 1) T.uva(R, Math.round(lerp(150, 286, k)), 168, t, { cara: 'susto', corre: true });
};

// 3 · 1909: el andén de una estación de Alicante con el excedente de uvas (fondo local)
let FONDO3 = null;
const ladrillo = (x0, y0, x1, y1) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const f = Math.floor((y - y0) / 4), off = f % 2 ? 4 : 0, junta = (y - y0) % 4 === 3 || (x + off) % 8 === 7;
    const n = Math.sin(x * 12.9 + y * 78.2) * 43758.5; const r = n - Math.floor(n);
    R.pset(x, y, junta ? hex('#7a4a3a') : r > 0.85 ? hex('#c8784a') : r < 0.15 ? hex('#8a442a') : hex('#a85a38'));
  }
};
const caja = (x, y, n = 1) => {   // la caja de uvas de 16 × 10, esquina de arriba a la izquierda
  R.rect(x, y, x + 15, y + 9, K); R.rect(x + 1, y + 3, x + 14, y + 8, hex('#c8965a'));
  R.rect(x + 1, y + 5, x + 14, y + 5, hex('#8a5a2a')); R.rect(x + 1, y + 8, x + 14, y + 8, hex('#8a5a2a'));
  R.pset(x + 2, y + 4, hex('#e8c08a')); R.pset(x + 13, y + 7, hex('#5a3a1a'));
  for (let i = 1; i <= 14; i += 2) { const c = (i + n) % 5 === 0 ? hex('#b07ac8') : (i + n) % 3 ? hex('#6a2a7a') : hex('#3e1450'); R.rect(x + i, y + 1, x + i + 1, y + 2, c); }
  R.pset(x + 1 + (n * 5) % 13, y, hex('#3e1450')); R.pset(x + 3 + (n * 7) % 11, y, hex('#6a2a7a'));
};
const pintaFondo3 = () => {
  // cielo de atardecer en bandas tramadas
  const B = ['#2a2a5a', '#4a3a6a', '#7a4a7a', '#b0606a', '#d8845a', '#f0b070'];
  for (let y = 0; y < 86; y++) for (let x = 0; x < 320; x++) { const v = y / 86 * 5 + (((x + y * 2) % 4) / 4 - 0.4) * 0.6; R.pset(x, y, hex(B[Math.max(0, Math.min(5, Math.floor(v)))])); }
  // sierras secas
  for (let x = 0; x < 320; x++) { const h1 = 66 + Math.round(Math.sin(x * 0.03) * 6 + Math.sin(x * 0.11) * 3); for (let y = h1; y < 92; y++) R.pset(x, y, (x + y) % 3 ? hex('#6a4a6a') : hex('#5a3c5c')); const h2 = 78 + Math.round(Math.sin(x * 0.05 + 2) * 4 + Math.sin(x * 0.17) * 2); for (let y = h2; y < 96; y++) R.pset(x, y, (x * y) % 5 ? hex('#7a5a4a') : hex('#6a4a3a')); }
  // la vega: campo de rastrojo, almendros, una alquería blanca, el camino y los postes del telégrafo
  for (let y = 90; y < 124; y++) for (let x = 0; x < 320; x++) { if (y < 96 && R.pget(x, y) !== 0) continue; const n = Math.sin(x * 37.1 + y * 11.3) * 43758.5, r = n - Math.floor(n); R.pset(x, y, y % 5 === 0 && r > 0.3 ? hex('#a87a4a') : r > 0.8 ? hex('#d8b07a') : r > 0.4 ? hex('#c09460') : hex('#b0844e')); }
  for (let x = 120; x < 320; x++) { const y = 108 + Math.round((x - 120) * 0.04); R.pset(x, y, hex('#e0c898')); R.pset(x, y + 1, hex('#e0c898')); }
  for (const [ax, ay] of [[136, 104], [196, 100], [252, 106], [300, 101]]) { R.linea(ax, ay, ax, ay + 8, hex('#4a3020')); R.disco(ax, ay - 1, 4.5, hex('#e8c8d8')); R.disco(ax - 2, ay - 2, 2.5, hex('#f8e8f0')); R.pset(ax + 2, ay, hex('#c898b0')); }
  R.rect(212, 92, 240, 104, K); R.rect(213, 93, 239, 104, hex('#f2ece0')); R.rect(213, 93, 239, 94, hex('#c8603a')); R.rect(222, 97, 226, 104, hex('#4a3a2a')); R.rect(230, 96, 233, 99, hex('#4a6a8a')); R.rect(244, 96, 256, 104, hex('#e8e0d0')); R.rect(244, 95, 256, 95, hex('#c8603a'));
  for (let x = 128; x < 320; x += 38) { R.rect(x, 84, x, 112, hex('#5a4030')); R.rect(x - 3, 86, x + 3, 86, hex('#5a4030')); }
  for (let x = 128; x < 318; x++) { const k = (x - 128) % 38, y = 86 + Math.round(Math.sin(k / 38 * Math.PI) * 3); R.pset(x, y + 1, hex('#3a2a2a')); }
  // palmeras lejanas
  for (const px of [150, 168, 232]) { R.linea(px, 60, px + 1, 86, hex('#3a2a2a')); for (let a = 0; a < 6; a++) { const an = -2.8 + a * 0.55; R.linea(px, 60, Math.round(px + Math.cos(an) * 9), Math.round(60 + Math.sin(an) * 5 + 4), hex('#2a3a2a')); } }
  // la estación: ladrillo, piedra, tejado y ventanas en arco encendidas
  ladrillo(0, 36, 118, 124);
  R.rect(0, 28, 122, 35, K); for (let x = 0; x < 122; x += 3) R.rect(x, 29, x + 2, 34, x % 6 ? hex('#a84a2a') : hex('#c8603a'));
  R.rect(0, 35, 120, 37, hex('#d8c8a8')); R.rect(118, 36, 121, 124, hex('#d8c8a8')); for (let y = 40; y < 124; y += 8) R.rect(116, y, 121, y + 3, hex('#e8dcc0'));
  for (const wx of [14, 50, 86]) {
    R.rect(wx - 1, 54, wx + 22, 104, K); R.rect(wx, 55, wx + 21, 103, hex('#e8dcc0'));
    R.disco(wx + 11, 64, 9, K); R.disco(wx + 11, 64, 8, hex('#ffd890')); R.rect(wx + 3, 64, wx + 19, 100, hex('#ffd890'));
    for (let y = 66; y < 100; y += 2) R.rect(wx + 3, y, wx + 19, y, hex('#f0b860'));
    R.rect(wx + 10, 56, wx + 11, 100, hex('#4a3a2a')); R.rect(wx + 3, 78, wx + 19, 79, hex('#4a3a2a'));
    R.rect(wx - 2, 104, wx + 23, 106, hex('#d8c8a8'));
  }
  // la marquesina de hierro sobre el andén
  R.rect(118, 46, 319, 52, K); for (let x = 119; x < 320; x++) R.pset(x, 47, x % 4 ? hex('#5a6a6a') : hex('#8a9a9a')); R.rect(119, 48, 319, 51, hex('#3a4a4a'));
  for (let x = 120; x < 320; x += 6) { R.poligono([[x, 52], [x + 6, 52], [x + 3, 56]], hex('#3a4a4a')); R.pset(x + 3, 54, hex('#8a9a9a')); }
  for (const cx of [134, 214, 294]) { R.rect(cx - 2, 52, cx + 2, 124, K); R.rect(cx - 1, 52, cx + 1, 124, hex('#4a5a5a')); R.pset(cx - 1, 60, hex('#8a9a9a')); R.linea(cx - 10, 53, cx, 64, hex('#3a4a4a')); R.linea(cx + 10, 53, cx, 64, hex('#3a4a4a')); R.rect(cx - 4, 120, cx + 4, 124, hex('#3a4a4a')); }
  // el reloj del andén, colgado de la marquesina (sin letras)
  R.linea(174, 52, 174, 58, K); R.disco(174, 66, 8, K); R.disco(174, 66, 7, hex('#f2ead8')); for (let a = 0; a < 12; a++) R.pset(Math.round(174 + Math.cos(a * Math.PI / 6) * 5.5), Math.round(66 + Math.sin(a * Math.PI / 6) * 5.5), K);
  // el andén de losas
  for (let y = 124; y < 146; y++) for (let x = 0; x < 320; x++) { const junta = (y - 124) % 7 === 6 || (x + ((y - 124) / 7 | 0) * 9) % 22 === 0; R.pset(x, y, junta ? hex('#8a8070') : (x * 7 + y * 3) % 11 === 0 ? hex('#b8ae98') : hex('#a89e88')); }
  R.rect(0, 146, 319, 149, hex('#d8d0b8')); R.rect(0, 150, 319, 151, hex('#5a5048'));
  // la vía: balasto, traviesas y carriles
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const n = Math.sin(x * 91.3 + y * 17.7) * 43758.5, r = n - Math.floor(n); R.pset(x, y, r > 0.7 ? hex('#8a7a6a') : r > 0.35 ? hex('#6a5a4e') : hex('#4e4238')); }
  for (let x = 4; x < 320; x += 14) R.rect(x, 162, x + 9, 174, hex('#5a3a22'));
  for (const y of [164, 172]) { R.rect(0, y, 319, y + 1, hex('#9aa0a8')); R.rect(0, y + 2, 319, y + 2, hex('#3a3a40')); }
  // bancos, faroles y sacos del andén
  R.rect(20, 114, 48, 116, hex('#6a4a2a')); R.rect(22, 117, 23, 124, K); R.rect(45, 117, 46, 124, K); R.rect(20, 108, 48, 110, hex('#6a4a2a'));
  for (const fx of [62, 104]) { R.rect(fx, 84, fx + 1, 124, K); R.rect(fx - 3, 78, fx + 4, 85, K); R.rect(fx - 2, 79, fx + 3, 84, hex('#ffe08a')); }
  for (const [sx, sy] of [[90, 116], [100, 118]]) { R.disco(sx, sy, 5, K); R.disco(sx, sy, 4, hex('#d8c098')); R.pset(sx - 1, sy - 2, hex('#f0e0c0')); }
};
// el vagón de mercancías con la puerta abierta y las cajas dentro
const vagon = (t) => {
  const x0 = 186, y0 = 92, x1 = 316, y1 = 152;
  R.rect(x0, y0, x1, y1, K); for (let x = x0 + 1; x < x1; x++) for (let y = y0 + 1; y < y1; y++) R.pset(x, y, (x - x0) % 8 === 0 ? hex('#5a2a1a') : (y + x) % 13 === 0 ? hex('#a84a2a') : hex('#8a3a22'));
  R.rect(x0 - 2, y0 - 4, x1 + 2, y0, K); R.rect(x0 - 1, y0 - 3, x1 + 1, y0 - 1, hex('#5a5a62'));
  for (const x of [x0 + 2, x1 - 4]) R.rect(x, y0 + 1, x + 2, y1 - 1, hex('#3a3a40'));
  R.rect(x0, 130, x1, 132, hex('#3a3a40'));
  // la puerta corredera abierta y las cajas que asoman
  R.rect(226, 98, 270, 146, K); R.rect(227, 99, 269, 145, hex('#2a1a14'));
  for (let f = 0; f < 4; f++) for (let c = 0; c < 3; c++) caja(228 + c * 14 - (f % 2) * 3, 135 - f * 10, f * 3 + c);
  R.rect(272, 96, 300, 148, K); for (let x = 273; x < 300; x++) for (let y = 97; y < 148; y++) R.pset(x, y, (x - 273) % 7 === 0 ? hex('#5a2a1a') : hex('#9a4428'));
  // ruedas
  for (const wx of [206, 296]) { R.disco(wx, 158, 8, K); R.disco(wx, 158, 6, hex('#3a3a40')); R.disco(wx, 158, 2, hex('#8a8a90')); R.linea(wx - 5, 158, wx + 5, 158, hex('#5a5a62')); }
};
const p3 = (t) => {
  if (!FONDO3) { FONDO3 = R.nuevo(); const prev = R.usar(FONDO3); pintaFondo3(); R.usar(prev); }
  R.copiar(FONDO3);
  // nubes de tres tonos a tres velocidades y pájaros
  for (const [x0, y, w, v, c] of [[30, 24, 40, 1.2, '#c8708a'], [190, 20, 54, 0.7, '#9a5a7a'], [110, 40, 30, 2, '#f0a080']]) {
    const x = ((x0 + t * v) % 400) - 40;
    for (let i = 0; i < w; i++) { const hh = Math.round(3 + Math.sin(i / w * Math.PI) * 4); R.rect(Math.round(x + i), y - hh, Math.round(x + i), y, hex(c)); R.pset(Math.round(x + i), y - hh, hex('#f8d0a0')); }
  }
  for (let k = 0; k < 4; k++) { const bx = Math.round(((t * 14 + k * 23) % 260)), by = 22 + k * 4 + Math.round(Math.sin(t * 3 + k) * 2), a = Math.sin(t * 10 + k) > 0; R.pset(bx, by, K); R.pset(bx - 1, by - (a ? 1 : 0), K); R.pset(bx + 1, by - (a ? 1 : 0), K); }
  // humo de una locomotora detrás de la estación
  for (let k = 0; k < 6; k++) { const f = ((t * 0.5 + k / 6) % 1), x = 40 + f * 34 + Math.sin(f * 6 + k) * 4, y = 30 - f * 10, r = 3 + f * 5; R.disco(x, y, r, hex(f > 0.6 ? '#8a7a8a' : '#c8b8c0')); }
  vagon(t);
  // la pila de cajas del andén crece con «surplus» y se desborda en «1909»
  const n = Math.min(14, 4 + Math.floor(tramo(t, P3 + 0.4, u(0.75)) * 10));
  const PILA = [[120, 136], [136, 136], [152, 136], [168, 136], [128, 126], [144, 126], [160, 126], [136, 116], [152, 116], [120, 126], [144, 106], [168, 126], [128, 116], [160, 116]];
  PILA.slice(0, n).forEach(([x, y], i) => caja(x, y, i));
  // el viticultor llega con la carretilla y descarga; el labriego se rasca la cabeza ante la montaña
  const v = tramo(t, P3 + 0.2, u(0.69)), vx = Math.round(lerp(-20, 88, v));
  R.actor(EL.viticultor, vx, 146, t, { dir: 1, anda: v > 0 && v < 1, sostiene: [vx + 22, 134], sorpresa: t > u(0.748) });
  R.rect(vx + 18, 132, vx + 40, 140, K); R.rect(vx + 19, 133, vx + 39, 139, hex('#8a5a2a')); caja(vx + 21, 124, 9); R.disco(vx + 38, 143, 3, K); R.disco(vx + 38, 143, 2, hex('#5a3a1a'));
  R.actor(EL.labriego, 186, 146, t, { dir: -1, triste: t < u(0.70), dedo: t > u(0.70) && t < u(0.76), sorpresa: t > u(0.748) });
  R.actor(EL.ninoCampo, Math.round(lerp(12, 36, tramo(t, u(0.62), u(0.66)))), 146, t, { dir: 1, anda: t > u(0.62) && t < u(0.66), sonrisa: true, sostiene: true });
  // el año estampado en el vagón
  const e = tramo(t, u(0.748), u(0.748) + 0.25);
  if (e > 0) { R.rect(232, 104, 296, 124, K); R.rect(233, 105, 295, 123, hex('#d8c8a8')); R.numero('1909', 264, 121 - Math.round((1 - e) * 4), { tam: 16, centro: true }); }
};

// 4 · la mesa de Nochevieja de cerca: el 1909 tachado y el periódico de 1894
const tacha = u(0.8167), cae = u(0.8334), enciende = u(0.9336), otra = z(0.0475);
const p4 = (t) => {
  const o = { encuadre: 'medianoche', camara: 'mesa', confeti: 0.4 };
  const g = T.hoy(R, t, o);
  R.actor(EL.chicaHoy, 60, 138, t, { dir: 1, dedo: t > cae + 0.6 && t < enciende + 0.8, habla: t > cae + 0.6 && t < enciende && Math.sin(t * 8) > 0, sonrisa: t > enciende });
  R.actor(EL.chicoHoy, 246, 138, t, { dir: -1, sorpresa: t > enciende && t < enciende + 1.6, sonrisa: t > enciende + 1.6, sostiene: t > enciende + 1.6 ? [238, 122] : undefined });
  T.hoyDelante(R, t, o);
  // el «1909» grande, que se tacha con dos trazos rojos
  R.numero('1909', 120, 74, { tam: 16, centro: true });
  const k1 = tramo(t, tacha - 0.15, tacha + 0.15), k2 = tramo(t, tacha + 0.15, tacha + 0.45);
  for (let d = -1; d <= 1; d++) {
    if (k1 > 0) R.linea(88, 56 + d, Math.round(lerp(88, 152, k1)), Math.round(lerp(56, 78, k1)) + d, hex('#e83a3a'));
    if (k2 > 0) R.linea(152, 56 + d, Math.round(lerp(152, 88, k2)), Math.round(lerp(56, 78, k2)) + d, hex('#e83a3a'));
  }
  // el periódico cae sobre el mantel
  const c = tramo(t, cae, cae + 0.5), px = Math.round(lerp(-40, 150, c)), py = Math.round(lerp(120, 168, c));
  if (c > 0) {
    if (t > enciende) { const on = Math.floor((t - enciende) * 6) % 2 || t > enciende + 1.2; if (on) { R.rect(px - 32, py - 61, px + 32, py + 3, hex('#ffe08a')); } }
    PIEZAS.periodico(R, px, py, { s: 3, anio: 1894, dibujo: 'uvas' });
  }
  if (t > enciende) { const e = tramo(t, enciende, enciende + 0.3); R.numero('1894', 220, 74 - Math.round((1 - e) * 6), { tam: 16, centro: true }); R.icono('!', 252, 58, hex('#ffe08a'), K, 2); }
  // «the grapes aren't alone»: la uva fugitiva asoma por la botella y llega otra, verde
  const a = tramo(t, otra - 1.0, otra - 0.4); if (a > 0) T.uva(R, Math.round(lerp(18, 44, a)), 136, t, { cara: a < 1 ? 'normal' : 'feliz', corre: a > 0 && a < 1 });
  const b = tramo(t, otra, otra + 0.5); if (b > 0) T.uva(R, Math.round(lerp(-10, 26, b)), 136, t, { color: 'verde', cara: 'feliz', corre: b > 0 && b < 1 });
};

// 5 · el calendario y sus estampas
const rey = z(0.1684), carta = z(0.3150), pastel = z(0.4290), golpe = z(0.2109);
const p5 = (t) => {
  const o = { encuadre: 'salon', camara: 'calendario', mes: 12, dia: 31, estampas: [tramo(t, rey - 0.2, rey + 0.2), tramo(t, carta - 0.2, carta + 0.2), tramo(t, pastel - 0.2, pastel + 0.2)] };
  T.hoy(R, t, o);
  // la chica va hasta las estampas de la izquierda y las señala
  const w = tramo(t, P5 + 0.1, rey - 0.3), cx = Math.round(lerp(150, 90, w));
  R.actor(EL.chicaHoy, cx, 168, t, { dir: -1, anda: w > 0 && w < 1, dedo: t > rey - 0.2 && t < pastel - 0.4, sorpresa: t > golpe && t < golpe + 0.6, sonrisa: t > carta });
  // el chico, a la derecha, levanta la vista al pastel
  R.actor(EL.chicoHoy, 236, 168, t, { dir: -1, habla: t < rey && Math.sin(t * 7) > 0, sorpresa: t > pastel && t < pastel + 0.8, brazos: t > pastel + 0.8 });
  // la uva sobre el taburete se encoge con la cachetada
  T.uva(R, 198, 146, t, { cara: t > golpe && t < golpe + 0.9 ? 'susto' : 'normal' });
  T.hoyDelante(R, t, o);
};

// 6 · el piano del kínder de 1893: la canción y las monedas
const gana = z(0.5362), millon = z(0.5799);
const p6 = (t) => {
  const o = { encuadre: 'kinder', camara: 'piano', toca: true, notas: true };
  T.fiestas(R, t, o);
  R.actor(EL.mildred, 122, 174, t, { dir: 1, sonrisa: true, habla: Math.sin(t * 5) > 0.3, sorpresa: t > millon && t < millon + 0.6 });
  R.actor(EL.patty, 214, 174, t, { dir: -1, habla: Math.sin(t * 6) > -0.2, dedo: t < gana, sorpresa: t > gana && t < millon + 0.8, brazos: t > millon + 0.8 });
  T.fiestasDelante(R, t, o);
  // las monedas suben con las notas y caen en un montón encima del piano
  for (let k = 0; k < 14; k++) {
    const t0 = gana - 0.6 + k * 0.28; if (t < t0) continue;
    const f = Math.min(1, (t - t0) / 1.1), x = Math.round(lerp(150 + Math.sin(k * 2.3) * 30, 262 + (k % 4) * 6, f)), y = Math.round(lerp(110, 170, f) - Math.sin(f * Math.PI) * 50);
    if (f < 1) { R.disco(x, y, 4, K); R.disco(x, y, 3.2, hex('#f0c040')); R.pset(x - 1, y - 1, hex('#fff0a0')); R.pset(x - 2, y, hex('#fff0a0')); R.pset(x + 1, y + 1, hex('#a87a18')); }
  }
  const mont = Math.min(10, Math.floor(tramo(t, gana, millon + 1.5) * 10));
  for (let k = 0; k < mont; k++) { const x = 262 + (k % 4) * 6 + (k > 7 ? 3 : 0), y = 172 - Math.floor(k / 4) * 3; R.rect(x - 3, y - 1, x + 3, y + 1, K); R.rect(x - 2, y - 1, x + 2, y, hex('#f0c040')); }
  const c = tramo(t, gana, millon + 0.2);
  if (c > 0) { const v = Math.round(2000000 * c / 1000) * 1000; R.numero('$' + v.toLocaleString('en-US'), 160, 48, { tam: 16, centro: true }); }
};

// 7 · el salón de Atom: el calendario pasa las hojas sin diciembre
const pasa0 = z(0.8628), cal = z(0.9593);
const p7 = (t) => {
  const f = Math.max(0, (t - pasa0) * 2.6), n = Math.floor(f);
  let mes = 1; for (let i = 0; i < Math.min(n, 22); i++) mes = mes % 11 + 1;
  const o = { encuadre: 'salon', mes, dia: 1, hoja: n < 22 ? Math.min(1, (f - n) * 1.6) : 0 };
  T.hoy(R, t, o);
  const w = tramo(t, P7 + 0.2, cal - 0.3), x = Math.round(lerp(250, 104, w));
  R.actor(EL.chicoHoy, x, 148, t, { dir: -1, anda: w > 0 && w < 1, dedo: t > cal - 0.3, sonrisa: t > cal });
  R.actor(EL.chicaHoy, 232, 148, t, { dir: -1, sonrisa: true, habla: t > cal && Math.sin(t * 7) > 0, dedo: t < P7 + 1.2 });
  T.hoyDelante(R, t, o);
  // la uva sube a la mesita y se esconde detrás de la copa
  const k = tramo(t, cal + 0.6, cal + 1.6); if (k > 0) T.uva(R, Math.round(lerp(236, 196, k)), Math.round(lerp(178, 152, k)) - Math.round(Math.sin(k * Math.PI) * 8), t, { cara: k < 1 ? 'normal' : 'feliz', corre: k < 1 });
};

const efectos = [
  ...CAMP.map((c) => [c, 'campana']), [salta, 'boing'], [aterriza + 0.4, 'whoosh'],
  [P3 + 0.3, 'carro'], [u(0.70), 'golpecito'], [u(0.748), 'sello'],
  [tacha - 0.1, 'lapiz'], [cae + 0.3, 'papel'], [enciende, 'brillo'], [otra, 'pop'],
  [rey, 'brillo'], [golpe, 'palmada'], [carta, 'brillo'], [pastel, 'brillo'],
  [gana, 'brillo'], [millon, 'campana'],
  [pasa0, 'papel'], [cal, 'golpecito'], [cal + 1.6, 'boing'],
];
const año = (t) => t < P3 ? 2026 : t < enciende ? 1909 : t < P5 ? 1894 : t < P6 ? 2026 : t < P7 ? 1893 : 2026;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año });
''')

E['tr-hola'] = ('Hola', '''// TR-HOLA (frase 3), sin cartela. Un plano: la pared de la ventana grande a medianoche; los chicos saludan a Atom en «I'm
// Atom»; el chico explica con el dedo; en «Let's find out» la uva con ojos salta de la mesa y se esconde detrás del
// calendario de la pared, y asoma los ojos.''', r'''
const h = (f) => en('hola', f), K = T.C.k;
const atom = h(0.0349), explica = h(0.218), vamos = h(0.80);
const p1 = (t) => {
  const o = { encuadre: 'medianoche', confeti: 0.6 };
  T.hoy(R, t, o);
  // el calendario de pared, entre la ventana y el reloj
  T.PIEZAS_TR.calendario(R, 218, 66, { mes: 12, s: 1 });
  R.linea(218, 42, 218, 44, K);
  R.actor(EL.chicaHoy, 128, 146, t, { dir: 1, brazos: t > atom && t < atom + 1.4, sonrisa: true, habla: t > explica + 1.4 && t < vamos && Math.sin(t * 7) > 0.2 });
  R.actor(EL.chicoHoy, 170, 146, t, { dir: 1, dedo: t > atom && t < vamos, sonrisa: t > vamos, habla: t > explica && t < explica + 1.4 && Math.sin(t * 8) > 0 });
  const pa = R.actor(EL.padre62, 62, 146, t, { dir: 1, sonrisa: true, sostiene: t > atom && t < atom + 2 ? [80, 112] : [78, 124] }); T.PIEZAS_TR.copa(R, pa.mano[0], pa.mano[1] + 4);
  T.hoyDelante(R, t, o);
  // la uva: corretea por la mesa, salta a la pared y se esconde detrás del calendario
  const a = tramo(t, 0.3, vamos), b = tramo(t, vamos, vamos + 0.6);
  if (b < 1) { const x = b > 0 ? lerp(200, 218, b) : lerp(110, 200, a), y = b > 0 ? lerp(146, 62, b) - Math.sin(b * Math.PI) * 16 : 146; T.uva(R, Math.round(x), Math.round(y), t, { cara: b > 0 ? 'susto' : 'normal', corre: (a > 0 && a < 1) || b > 0 }); }
  else { // asoma los ojos por el borde del calendario
    const s = Math.sin((t - vamos) * 3) > 0 ? 1 : 0; R.rect(229, 50 - s, 231, 52 - s, hex('#6a2a7a')); R.pset(229, 50 - s, hex('#f2f2f2')); R.pset(230, 51 - s, K);
  }
  T.PIEZAS_TR.calendario(R, 218, 66, { mes: 12, s: 1 });
};
T.rodar(E, R, [[0, p1]], { efectos: [[atom, 'brillo'], [vamos + 0.3, 'boing']], año: 2026 });
''')

E['tr-burla'] = ('La burla', '''// TR-BURLA (frase 4), sin cartela. Cuatro planos:
// 1. el salón burgués de Madrid de 1894: el caballero lee el periódico (en «newspaper») y la señora coge una uva del
//    frutero; en «France» brindan con champán a la francesa;
// 2. en «and some believe»: la calle de abajo de noche: en el balcón la familia brinda en silueta; abajo, el chulapo y la
//    chulapa los imitan de broma: copa invisible con el meñique y reverencia (en «mocking»), uvas a dos carrillos;
// 3. en «Most likely»: el viñedo de Alicante en la vendimia de 1909: el viticultor baja por el camino y levanta un racimo
//    enorme en «both things happened»; la labriega y la niña llenan las cestas;
// 4. en «and the grape surplus»: el almacén: las cajas se apilan hasta el techo, el viticultor estampa «1909» en una caja
//    y el labriego sale con la carretilla cargada por la puerta en «spread it across the country».''', r'''
const b = (f) => en('burla', f), K = T.C.k;
const P2 = b(0.2675), P3 = b(0.4961), P4 = b(0.7704);
// 1 · el salón burgués
const lee = b(0.0961), coge = b(0.0229), brindis = b(0.2249);
const p1 = (t) => {
  const o = { encuadre: 'casa1890' };
  T.anuevo(R, t, o);
  // delante del balcón: él lee el periódico (en «newspaper») y ella se come las uvas a la francesa; en «France», brindan
  const brinda = t > brindis - 0.4 && t < brindis + 0.9, choca = t > brindis - 0.1 && t < brindis + 0.3;
  const a = R.actor(EL.burgues, 222, 162, t, { dir: 1, sostiene: brinda ? [244 - (choca ? 0 : 3), 136] : t > lee - 0.3 ? [240, 146] : [238, 150], sonrisa: brinda, habla: t > lee + 0.8 && t < brindis - 0.5 && Math.sin(t * 7) > 0 });
  if (brinda) T.PIEZAS_TR.copa(R, a.mano[0], a.mano[1] + 6);
  else if (t > lee - 0.3) T.PIEZAS_TR.periodico(R, a.mano[0] + 4, a.mano[1] + 10, { anio: 1894 });
  else T.PIEZAS_TR.copa(R, a.mano[0], a.mano[1] + 6);
  const come = t > coge + 0.3 && t < lee + 1.2 && Math.sin((t - coge) * 5) > 0.3;
  const c = R.actor(EL.senoraMantilla, 262, 162, t, { dir: -1, sostiene: brinda ? [250 + (choca ? 0 : 3), 136] : come ? [254, 145] : [251, 151], sonrisa: t > lee + 1.2 || brinda, habla: t > lee + 1.4 && t < brindis - 0.5 && Math.sin(t * 6) > 0 });
  if (brinda) T.PIEZAS_TR.copa(R, c.mano[0], c.mano[1] + 6);
  else T.PIEZAS_TR.racimo(R, c.mano[0], c.mano[1] + 15, { color: 'verde', hueco: t > coge + 1 });
  // el criado entra por la izquierda con la bandeja de copas
  const w = tramo(t, 0.4, 3.4), sx = Math.round(lerp(-20, 70, w));
  const s = R.actor(EL.chulapo, sx, 162, t, { dir: 1, anda: w > 0 && w < 1, sostiene: [sx + 20, 140], sonrisa: w >= 1, pal: { C: '#2a2a32', c: '#1a1a22' } });
  R.rect(s.mano[0] - 4, s.mano[1] - 1, s.mano[0] + 8, s.mano[1], K); R.rect(s.mano[0] - 3, s.mano[1] - 1, s.mano[0] + 7, s.mano[1] - 1, hex('#d8d8e0'));
  T.PIEZAS_TR.copa(R, s.mano[0], s.mano[1] - 2); T.PIEZAS_TR.copa(R, s.mano[0] + 5, s.mano[1] - 2);
  T.anuevoDelante(R, t, o);
  if (t > brindis && t < brindis + 0.5) for (let k = 0; k < 6; k++) { const an = k * 1.05, r = 4 + (t - brindis) * 20; R.pset(Math.round(247 + Math.cos(an) * r), Math.round(126 + Math.sin(an) * r), hex('#fff0a0')); }
};
// 2 · la calle de abajo: la burla
const burla = b(0.3714), ricos = b(0.4047), copian = b(0.4483);
const p2 = (t) => {
  const o = { encuadre: 'casa1890', camara: 'calle' };
  T.anuevo(R, t, o);
  const rev = t > burla && t < burla + 0.8;
  // el chulapo levanta un racimo como si fuera una copa de champán, hacia el balcón, y hace la reverencia
  const a = R.actor(EL.chulapo, 116, 164, t, { dir: 1, sostiene: rev ? undefined : [132, 132 + Math.round(Math.sin(t * 4))], brazos: rev, salto: rev ? Math.round(Math.abs(Math.sin((t - burla) * 8)) * 3) : 0, sonrisa: true, habla: t < burla && Math.sin(t * 8) > 0 });
  if (!rev) T.PIEZAS_TR.racimo(R, a.mano[0] + 1, a.mano[1] + 16);
  const ch = R.actor(EL.chulapa, 152, 164, t, { dir: -1, sonrisa: true, sostiene: t > copian ? [146, 140] : [144, 148], habla: t > ricos && t < copian && Math.sin(t * 9) > 0 });
  if (t < copian + 0.3) { const [mx, my] = ch.mano; R.rect(mx - 2, my + 1, mx + 2, my + 6, K); R.rect(mx - 1, my + 2, mx + 1, my + 5, hex('#6a2a7a')); R.pset(mx - 1, my + 2, hex('#b07ac8')); }
  // los mofletes llenos de uvas
  if (t > copian + 0.3) { R.pset(146, 164 - 17, hex('#f0a0a0')); R.pset(147, 164 - 16, hex('#f0a0a0')); }
  // un pilluelo que se ríe y se va corriendo
  const n = tramo(t, copian, copian + 1.6); R.actor(EL.ninoCampo, Math.round(lerp(196, 260, n)), 164, t, { dir: n > 0 ? 1 : -1, anda: n > 0 && n < 1, sonrisa: true });
};
// 3 · el viñedo de Alicante en 1909
const ambas = b(0.5257), nace = b(0.6390);
const p3 = (t) => {
  const o = { encuadre: 'vinedo' };
  T.anuevo(R, t, o);
  const w = tramo(t, P3, ambas - 0.2), vx = Math.round(lerp(126, 150, w)), arriba = t > ambas - 0.2 && t < nace + 0.6;
  const a = R.actor(EL.viticultor, vx, 160, t, { dir: 1, anda: w > 0 && w < 1, sostiene: arriba ? [vx + 18, 128] : [vx + 18, 146], sonrisa: arriba });
  T.PIEZAS_TR.racimo(R, a.mano[0] + 1, a.mano[1] + 16);
  R.actor(EL.labriega, 182, 160, t, { dir: -1, sostiene: Math.sin(t * 3) > 0 ? [176, 148] : [174, 154], sonrisa: t > nace });
  const n = tramo(t, nace, nace + 1.4); R.actor(EL.ninaCampo, Math.round(lerp(96, 120, n)), 162, t, { dir: 1, anda: n > 0 && n < 1, sonrisa: true });
  T.anuevoDelante(R, t, o);
  if (arriba && t < ambas + 0.4) for (let k = 0; k < 6; k++) { const an = k * 1.05, r = 6 + (t - ambas + 0.2) * 24; R.pset(Math.round(a.mano[0] + Math.cos(an) * r), Math.round(a.mano[1] + 6 + Math.sin(an) * r), hex('#fff0a0')); }
};
// 4 · el almacén: las cajas que sobran
const caja = (x, y, n = 1) => {
  R.rect(x, y, x + 15, y + 9, K); R.rect(x + 1, y + 3, x + 14, y + 8, hex('#c8965a'));
  R.rect(x + 1, y + 5, x + 14, y + 5, hex('#8a5a2a')); R.rect(x + 1, y + 8, x + 14, y + 8, hex('#8a5a2a'));
  for (let i = 1; i <= 14; i += 2) { const c = (i + n) % 5 === 0 ? hex('#b07ac8') : (i + n) % 3 ? hex('#6a2a7a') : hex('#3e1450'); R.rect(x + i, y + 1, x + i + 1, y + 2, c); }
};
const sobra = b(0.8120), sello = b(0.8551), lleva = b(0.9055);
const p4 = (t) => {
  const o = { encuadre: 'vinedo', camara: 'cajas' };
  T.anuevo(R, t, o);
  // la pila que crece
  const n = Math.min(9, 2 + Math.floor(tramo(t, P4 + 0.2, sello) * 7));
  const PILA = [[110, 152], [126, 152], [142, 152], [118, 142], [134, 142], [150, 152], [126, 132], [142, 142], [134, 122]];
  PILA.slice(0, n).forEach(([x, y], i) => caja(x, y, i));
  // el viticultor estampa la caja
  const sel = t > sello - 0.25 && t < sello + 0.25;
  R.actor(EL.viticultor, 170, 162, t, { dir: -1, sostiene: sel ? [158, 148] : [160, 140], dedo: t > sello + 0.6, sonrisa: t > sello });
  if (t > sello) { const e = tramo(t, sello, sello + 0.25); R.numero('1909', 140, 112 - Math.round((1 - e) * 4), { tam: 16, centro: true }); }
  if (t > sello && t < sello + 0.4) R.icono('!', 160, 116, hex('#ffe08a'), K, 2);
  // el labriego se lleva la carretilla cargada por la puerta
  const w = tramo(t, lleva - 0.3, E.duracion - 0.3), lx = Math.round(lerp(240, 30, w));
  R.actor(EL.labriego, lx, 162, t, { dir: -1, anda: w > 0 && w < 1, sostiene: [lx - 8, 150] });
  R.rect(lx - 30, 146, lx - 8, 154, K); R.rect(lx - 29, 147, lx - 9, 153, hex('#8a5a2a')); caja(lx - 28, 138, 3); caja(lx - 26, 130, 5);
  R.disco(lx - 26, 157, 4, K); R.disco(lx - 26, 157, 3, hex('#5a3a1a'));
  T.anuevoDelante(R, t, o);
};
const efectos = [[b(0.0961), 'papel'], [brindis, 'brillo'], [burla, 'boing'], [copian + 0.3, 'masca'], [ambas, 'brillo'], [sobra, 'golpecito'], [sello, 'sello'], [lleva, 'carro']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => t < P3 ? 1894 : 1909 });
''')
