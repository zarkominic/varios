import re

E = {}

# Las marcas de cada escena (marcas-ep23.json): [inicio, fin] de su frase. En el código, @{s} (segundos de la escena,
# medidos sobre los tiempos de las palabras de linea.json) se escribe como en('marca', fracción).
MARCAS = {'tr-racion': ('guerra', 0.5, 16.354), 'tr-velas': ('velas', 1.5, 28.379), 'tr-hill': ('hill', 1.5, 15.949)}


def _en(id_, codigo):
    k, a, b = MARCAS[id_]
    return re.sub(r'@\{(-?[0-9.]+)\}', lambda m: "en('%s', %.4f)" % (k, (float(m.group(1)) - a) / (b - a)), codigo)


# ayudas comunes de las tres escenas (van al principio de cada cuerpo)
AYUDAS = r'''
const { rect, pset, linea, poligono, disco, halo, tone } = R;
const PZ = T.PIEZAS_TR, H = (s) => hex(s), RP = (...c) => c.map(hex), K = hex('#1c1622'), BL = hex('#f6f2e6');
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const sube = (a, b, t) => { const u = tramo(t, a, b); return u * u * (3 - 2 * u); };
const capa = (fn) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); fn(); R.usar(prev); } R.copiar(b); }; };
const capaT = (fn) => { let b = null, idx = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); fn(); R.usar(prev); idx = []; for (let i = 0; i < b.length; i++) if (b[i]) idx.push(i); } for (const i of idx) pset(i % 320, (i / 320) | 0, b[i]); }; };
// mezcla de dos colores (0 = c1, 1 = c2)
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
// sombra chinesca: lo que pinta fn se pega en un color (o en el que devuelva luz(c)), a escala esc, de [ax, ay] a [bx, by]
const SB = R.nuevo();
const silueta = (fn, col, esc, ax, ay, bx, by, luz) => {
  SB.fill(0); const prev = R.usar(SB); fn(); R.usar(prev);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const c = SB[y * 320 + x]; if (!c) continue;
    const X = bx + (x - ax) * esc, Y = by + (y - ay) * esc, c2 = luz ? luz(c) : col; for (let a = 0; a < esc; a++) for (let b = 0; b < esc; b++) pset(X + a, Y + b, c2); }
};
// nube de tres tonos (sombra, cuerpo, luz)
const nube = (x, y, w, c) => { x = Math.round(x); const B = [[0, 0, .24], [.26, -.1, .2], [.5, 0, .2], [-.24, .04, .15], [.72, .05, .13]];
  for (const [dx, dy, r] of B) disco(x + dx * w, y + dy * w + 1.5, r * w, c[0]);
  for (const [dx, dy, r] of B) disco(x + dx * w, y + dy * w, r * w - 0.6, c[1]);
  for (const [dx, dy, r] of B) disco(x + dx * w - 1, y + dy * w - 1.5, r * w * 0.55, c[2]); };
const aves = (t, n, y0, v, col, k = 0, x0 = -30, x1 = 350) => { for (let i = 0; i < n; i++) { const x = Math.round(x0 + ((i * 53 + k * 31 + t * v * (0.8 + 0.4 * hh(i, k))) % (x1 - x0))), y = Math.round(y0 + 10 * hh(i, k, 3) + 2 * Math.sin(t * 2 + i)), a = Math.sin(t * 9 + i * 2) > 0;
  pset(x, y, col); pset(x - 1, y - (a ? 1 : 0), col); pset(x + 1, y - (a ? 1 : 0), col); pset(x - 2, y - (a ? 2 : -1), col); pset(x + 2, y - (a ? 2 : -1), col); } };
const cieloT = (y0, y1, rp, x0 = 0, x1 = 319) => { for (let y = y0; y < y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, tone(rp, (y - y0) / (y1 - y0) * (rp.length - 1) + (hh(x >> 3, y >> 2) - 0.5) * 0.3, x, y)); };
const estrellas = (t, n, x0, y0, x1, y1, k = 0) => { for (let i = 0; i < n; i++) { const x = Math.floor(x0 + hh(i, k, 7) * (x1 - x0)), y = Math.floor(y0 + hh(i, k, 8) * (y1 - y0)); if (x > 276 && y < 46) continue; const b = Math.sin(t * (1.5 + hh(i, k)) + i) > 0.3; pset(x, y, b ? H('#f6f0d8') : H('#8a8ab0')); if (b && i % 7 === 0) { pset(x - 1, y, H('#6a6a98')); pset(x + 1, y, H('#6a6a98')); } } };
// una nota musical (corchea) con su contorno, para que se lea
const notaF = (x, y, c, k = 0) => { x = Math.round(x); y = Math.round(y);
  const f = (X, Y, col) => { disco(X, Y, 1.7, col); pset(X + 1, Y - 1, col); linea(X + 2, Y, X + 2, Y - 7, col); linea(X + 2, Y - 7, X + 5, Y - 4, col); if (k % 2) { linea(X + 2, Y - 5, X + 5, Y - 2, col); } };
  for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) f(x + dx, y + dy, K); f(x, y, c); pset(x - 1, y - 1, BL); };
// bocadillo blanco con un icono (R.icono a escala 2); u 0–1 lo hace aparecer (tramado) o desaparecer
const bocadillo = (x, y, ico, u = 1, col = K) => { if (u <= 0) return; const ver = (X, Y) => u >= 1 || hh(X, Y, 3) < u;
  for (let j = -12; j <= 12; j++) for (let i = -10; i <= 10; i++) { const d = (i * i) / 110 + (j * j) / 156; if (d > 1.02) continue; const X = x + i, Y = y + j; if (!ver(X, Y)) continue; pset(X, Y, d > 0.8 ? K : BL); }
  for (const [i, j] of [[-2, 12], [-3, 13], [-4, 14], [-2, 13], [-3, 14], [-5, 15]]) if (ver(x + i, y + j)) pset(x + i, y + j, j > 12 && (i === -2 || i === -5) ? K : BL);
  if (u >= 0.6) R.icono(ico, x - 5, y - 7, col, H('#c8c0b0'), 2); };
'''

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['tr-racion'] = ('El racionamiento y la vuelta', '''// TR-RACION (frase 17), sin cartela; tres planos:
// 1. «During World War II» (1943): la cocina de un piso de EE. UU. en guerra (fondo local): la radio habla en la estantería,
//    la madre la escucha y, en «rationed», arranca un cupón de la cartilla; en «candy was scarce» el niño sacude el frasco
//    de azúcar y caen los últimos granos (se pone triste). Fuera pasa un chico con el carro de chatarra; el gato del alféizar
//    mueve la cola; la tetera echa vapor; el reloj anda.
// 2. «It came back strong» (1950): la calle de las afueras en Halloween: tres niños disfrazados (vaquero, princesa,
//    pirata) llegan corriendo con sus cubos; en «magazines» el niño del cómic pasa la página y en «comic strips» otra; en
//    «cartoons» todos levantan los cubos ante la puerta.
// 3. «and today» (2026): el porche de cerca, con la tele que echa el dibujo animado: dos niños de hoy suben, cogen
//    caramelos del cuenco en «spend»; en «$10 billion» crecen las pilas de monedas y se escribe $10,000,000,000; en
//    «every Halloween» los dos saltan de alegría.''', _en('tr-racion', AYUDAS + r'''
const P2 = @{5.67}, P3 = @{11.73};
// ── 1. la cocina de 1943 (fondo local) ──
const fondoCocina = capa(() => {
  // la pared alta de yeso (tranquila, por la barra del año y Atom)
  for (let y = 0; y < 58; y++) for (let x = 0; x < 320; x++) pset(x, y, tone(RP('#b8ac8c', '#cabe9e', '#d8ceb0', '#e4dcc2'), 2.4 - y / 58 * 0.5 + (hh(x >> 3, y >> 3) - 0.5) * 0.6 + (y < 3 ? -1.2 : 0), x, y));
  rect(0, 57, 319, 57, H('#5a3a20')); rect(0, 58, 319, 59, H('#a8784a')); rect(0, 60, 319, 60, H('#6a4a2a'));
  // el papel pintado de rayas con ramitos
  for (let y = 61; y < 112; y++) for (let x = 0; x < 320; x++) { const r = x % 14; let c = tone(RP('#cfbe96', '#ddcea8', '#e8dcbc'), 1.5 + (hh(x >> 2, y >> 2) - .5) * .5 - (y > 104 ? 0.6 : 0), x, y);
    if (r === 0) c = H('#a85846'); else if (r === 1) c = H('#c8705a'); else if (r === 7) c = H('#9ab080'); pset(x, y, c); }
  for (let y = 66; y < 108; y += 10) for (let x = 3; x < 320; x += 14) { const yy = y + ((x / 14 | 0) % 2) * 5; pset(x + 3, yy, H('#c84a3a')); pset(x + 4, yy, H('#e0604a')); pset(x + 3, yy + 1, H('#5a7a4a')); pset(x + 5, yy + 1, H('#5a7a4a')); pset(x + 4, yy + 2, H('#5a7a4a')); }
  // el zócalo de tablillas pintadas de verde
  rect(0, 111, 319, 111, H('#3a5040'));
  for (let y = 112; y < 127; y++) for (let x = 0; x < 320; x++) pset(x, y, x % 9 === 0 ? H('#3e5a4a') : tone(RP('#4e6e5c', '#62826e', '#7a9a84'), 1.3 + (x % 9 === 1 ? .9 : 0) + (hh(x, y >> 2) - .5) * .5 - (y > 123 ? .8 : 0), x, y));
  // la ventana: fuera, la calle de enfrente un día de otoño
  cieloT(26, 62, RP('#7aa8d8', '#9ac0e4', '#bcd6ec', '#d8e6f0'), 18, 88);
  // la casa de enfrente (tablas blancas, tejado, porche) y el árbol
  poligono([[24, 52], [50, 36], [78, 52]], (x, y) => tone(RP('#5a3a3a', '#7a4a44', '#9a5a50'), 1.4 + ((y + (x >> 2)) % 4 === 0 ? -1 : 0), x, y));
  for (let y = 52; y < 82; y++) for (let x = 28; x < 75; x++) pset(x, y, y % 3 === 0 ? H('#b8b4a8') : tone(RP('#d8d4c8', '#ecead8'), 1 - (x > 66 ? 1 : 0), x, y));
  for (const wx of [33, 61]) { rect(wx, 58, wx + 7, 67, H('#3a3a4a')); rect(wx + 1, 59, wx + 6, 66, H('#6a8ab0')); rect(wx + 4, 59, wx + 4, 66, H('#e8e8e0')); rect(wx + 1, 62, wx + 6, 62, H('#e8e8e0')); rect(wx - 2, 58, wx - 1, 67, H('#4a6a4a')); rect(wx + 8, 58, wx + 9, 67, H('#4a6a4a')); }
  rect(46, 68, 54, 82, H('#6a3a2a')); rect(47, 69, 53, 81, H('#8a4a32')); pset(52, 75, H('#e0c060'));
  for (let x = 28; x < 75; x++) pset(x, 67, H('#a8a498'));
  for (let i = 0; i < 26; i++) disco(16 + hh(i, 1) * 12, 44 + hh(i, 2) * 26, 3 + hh(i, 3) * 3, tone(RP('#a8501e', '#c8702a', '#e0a040'), hh(i, 4) * 2.4, i, 0));
  rect(18, 64, 20, 84, H('#4a3424'));
  for (let y = 82; y < 90; y++) for (let x = 18; x < 89; x++) pset(x, y, tone(RP('#5a7a3a', '#6e8e48', '#88a858'), 1.2 + (hh(x >> 1, y) - .5) * 1.2, x, y));
  for (let y = 90; y < 97; y++) for (let x = 18; x < 89; x++) pset(x, y, (x + y * 3) % 17 === 0 ? H('#8a8478') : tone(RP('#a8a294', '#bcb6a8'), 1 - (y < 91 ? 1 : 0), x, y));
  // el marco, los peinazos, el alféizar y la bandera de servicio (una estrella azul) colgada en el cristal
  for (const [x0, y0, x1, y1] of [[14, 22, 91, 25], [14, 22, 17, 97], [88, 22, 91, 97], [52, 25, 53, 97], [17, 59, 88, 60]]) { rect(x0, y0, x1, y1, H('#f0ece0')); }
  for (const [x0, y0, x1, y1] of [[14, 25, 91, 25], [17, 25, 17, 97], [91, 22, 91, 97], [53, 25, 53, 97], [17, 60, 88, 60]]) rect(x0, y0, x1, y1, H('#b8b4a4'));
  rect(10, 97, 95, 100, H('#f0ece0')); rect(10, 100, 95, 101, H('#9a968a')); rect(12, 102, 93, 103, H('#7a6a50'));
  rect(26, 64, 42, 86, H('#a82a2a')); rect(28, 66, 40, 84, H('#f4f0e8')); linea(25, 63, 43, 63, H('#c8a050'));
  R.poligono([[34, 69], [35, 73], [39, 73], [36, 76], [37, 80], [34, 78], [31, 80], [32, 76], [29, 73], [33, 73]], H('#2a4aa0'));
  // las cortinas de cuadros y la galería
  for (const [c0, c1] of [[4, 20], [84, 100]]) for (let y = 18; y < 108; y++) for (let x = c0; x <= c1; x++) { const pl = Math.sin((x - c0) * 1.1) * 0.6, ch = ((x >> 2) + (y >> 2)) % 2 === 0, raya = (x >> 2) % 2 === 0 || (y >> 2) % 2 === 0;
    pset(x, y, x === c0 || x === c1 ? H('#8a2a24') : tone(ch && raya ? RP('#a8302a', '#c84a3a', '#e06a50') : raya ? RP('#c87a6a', '#e0a090', '#f0c0b0') : RP('#d8d0c0', '#ece6da', '#f8f4ec'), 1.2 + pl, x, y)); }
  for (let x = 2; x < 103; x++) { const b = 26 + Math.round(2 * Math.abs(Math.sin(x * 0.3))); for (let y = 16; y <= b; y++) pset(x, y, y === b ? H('#8a2a24') : tone(RP('#a8302a', '#c84a3a', '#e06a50'), 1.2 + ((x >> 2) % 2 ? .6 : -.4) + (y === 16 ? 1 : 0), x, y)); }
  rect(0, 14, 105, 15, H('#7a5a3a'));
  // el reloj de pared (la esfera; las agujas van en cada fotograma)
  disco(166, 38, 11, H('#4a2e18')); disco(166, 38, 10, H('#8a5a30')); disco(166, 38, 8, H('#f4ecd6')); disco(165, 37, 7, H('#fbf6e8'));
  for (let k = 0; k < 12; k++) { const a = k / 12 * 6.283; pset(Math.round(166 + Math.cos(a) * 7), Math.round(38 + Math.sin(a) * 7), k % 3 ? H('#8a7a6a') : K); }
  // la lámina del huerto de la victoria (zanahorias, tomates y un pimiento; sin letras)
  rect(112, 66, 146, 100, H('#5a3a20')); rect(114, 68, 144, 98, H('#e8dcb8')); for (let y = 69; y < 98; y++) for (let x = 115; x < 144; x++) if (y > 86) pset(x, y, tone(RP('#5a3a20', '#7a5030'), 1 + (x + y) % 2 * .5, x, y)); else pset(x, y, tone(RP('#d8e8f0', '#e8f0f4'), 1, x, y));
  for (const [x, c] of [[120, '#e07a2a'], [128, '#d03a2a'], [136, '#e07a2a']]) { poligono([[x - 3, 86], [x + 3, 86], [x, 96]], H(c)); linea(x - 1, 86, x - 3, 80, H('#4a8a3a')); linea(x + 1, 86, x + 3, 79, H('#5a9a4a')); linea(x, 86, x, 78, H('#3a7a2a')); }
  disco(140, 78, 3, H('#d03a2a')); pset(139, 77, H('#f08a7a')); disco(118, 76, 2.5, H('#4a9a3a'));
  // la estantería con la radio, los botes y los platos
  rect(186, 70, 270, 73, H('#6a4428')); rect(186, 70, 270, 70, H('#a8784a')); rect(186, 74, 270, 75, H('#5a4a3a'));
  for (const bx of [192, 262]) { poligono([[bx, 75], [bx + 4, 75], [bx + 4, 84]], H('#5a3a20')); }
  // la radio de capilla: caja de nogal con el arco, la tela de la rejilla y el dial
  for (let y = 44; y < 70; y++) for (let x = 196; x < 224; x++) { const d = Math.hypot((x - 210) / 14, (y - 56) / 14); if (y < 56 && d > 1) continue; pset(x, y, tone(RP('#4a2a14', '#6a3e20', '#8a5630', '#a8703e'), 2 + ((x * 3 + y) % 11 === 0 ? -1 : 0) - (x > 220 ? 1 : 0) + (x < 199 ? .8 : 0), x, y)); }
  for (let y = 48; y < 62; y++) for (let x = 201; x < 219; x++) { const d = Math.hypot((x - 210) / 9, (y - 57) / 9); if (y < 57 && d > 1) continue; pset(x, y, (x + y) % 3 === 0 ? H('#6a5a3a') : H('#b8a070')); }
  for (const x of [204, 210, 216]) linea(x, 50, x, 61, H('#5a3a20'));
  rect(203, 63, 217, 66, H('#2a1a10')); rect(209, 64, 211, 65, H('#e8c060'));
  disco(200, 66, 1.5, H('#c8b080')); disco(220, 66, 1.5, H('#c8b080'));
  // los botes de lata (harina, café, azúcar: el del azúcar vacío, con la tapa torcida)
  for (const [x0, w, hgt, c] of [[228, 12, 16, '#c83a2a'], [242, 10, 13, '#e8e0c8'], [254, 9, 10, '#3a6a9a']]) { rect(x0, 70 - hgt, x0 + w, 69, H('#3a2a20')); for (let y = 71 - hgt; y < 69; y++) for (let x = x0 + 1; x < x0 + w; x++) pset(x, y, tone(RP(oscuro(c), c, '#f8f0e0'), 1 + (x === x0 + 2 ? 1 : 0) - (x > x0 + w - 3 ? 1 : 0), x, y)); rect(x0, 70 - hgt, x0 + w, 72 - hgt, H('#c8c8c0')); rect(x0 + 2, 69 - hgt - 1, x0 + w - 2, 69 - hgt - 1, H('#8a8a84')); }
  // la cocina de esmalte con su horno
  for (let y = 70; y < 127; y++) for (let x = 274; x < 320; x++) pset(x, y, tone(RP('#b8b0a0', '#d8d2c2', '#ece8dc', '#f8f6ee'), 2.2 - (x < 277 ? 1.2 : 0) - (y > 122 ? 1 : 0) + ((y === 88 || y === 120) ? -1.5 : 0), x, y));
  rect(272, 66, 319, 70, H('#2a2a2e')); rect(272, 66, 319, 66, H('#5a5a62'));
  for (const kx of [282, 292, 302, 312]) { disco(kx, 76, 2, H('#2a2a2e')); pset(kx, 75, H('#e8e8e8')); }
  rect(280, 90, 316, 118, H('#9a968a')); rect(281, 91, 315, 117, H('#e4e0d4')); rect(286, 95, 310, 106, H('#3a3a40')); rect(287, 96, 309, 105, H('#5a4a40')); rect(288, 97, 294, 98, H('#8a7a70'));
  rect(286, 110, 310, 111, H('#c8c8cc')); rect(286, 112, 310, 112, H('#6a6a70'));
  // la tetera (el vapor va en cada fotograma)
  disco(296, 60, 6, H('#2a2a30')); disco(296, 60, 5, H('#c83a2a')); disco(294, 58, 2, H('#f08a7a')); rect(290, 64, 302, 65, H('#2a2a30')); linea(302, 58, 307, 54, H('#2a2a30')); linea(301, 59, 306, 55, H('#a82a22')); rect(294, 52, 298, 53, H('#2a2a30'));
  linea(290, 55, 293, 51, K); linea(302, 55, 299, 51, K);
  // el suelo de linóleo que asoma bajo la mesa no se ve: la mesa ocupa todo el frente
});
function oscuro(c) { return '#' + [1, 3, 5].map((i) => Math.round(parseInt(c.slice(i, i + 2), 16) * 0.62).toString(16).padStart(2, '0')).join(''); }
// la mesa con el hule de cuadros rojos (delante de la madre y el niño)
const mesaHule = capaT(() => {
  for (let y = 126; y < 180; y++) { const d = (y - 126) / 54, cel = 8 + d * 10; for (let x = 0; x < 320; x++) { const u = (x - 160) / (1 + d * 0.5), cx = Math.floor(u / cel), cy = Math.floor((y - 126) / (4 + d * 6));
    const rojo = (cx + cy) % 2 === 0, raya = Math.abs(((u / cel) % 1 + 1) % 1 - 0.5) < 0.12;
    pset(x, y, y < 128 ? (y === 126 ? H('#f8f4ec') : H('#d8d0c0')) : tone(rojo ? RP('#8a2a24', '#b8403a', '#d05a4a') : raya ? RP('#c8a8a0', '#e0c4ba') : RP('#d8d0c4', '#ece6dc', '#f8f6f0'), (rojo ? 1.4 : 1.3) + (hh(x >> 3, y >> 2) - 0.5) * 0.4 - (x < 30 || x > 290 ? 0.5 : 0), x, y)); } }
  // un pliegue y el brillo del hule
  for (let x = 0; x < 320; x++) { const y = 150 + Math.round(3 * Math.sin(x * 0.02)); pset(x, y, H('#a89890')); }
  for (let k = 0; k < 18; k++) { const x = 40 + k * 14, y = 134 + (k % 3) * 9; linea(x, y, x + 5, y, H('#fffaf2')); }
});
// la taza de café, el platillo y el cuenco de cristal vacío (con un envoltorio)
const tazaYCuenco = (t) => {
  R.disco(58, 162, 11, H('#c8c0b4')); R.disco(58, 161, 10, H('#f4f0e8')); for (let y = 148; y < 160; y++) for (let x = 51; x < 66; x++) pset(x, y, tone(RP('#b8b0a4', '#e8e4dc', '#fbf8f2'), 2 - (x > 62 ? 1 : 0) + (x < 54 ? -.6 : 0), x, y));
  rect(51, 147, 65, 148, H('#6a3a1a')); rect(52, 148, 64, 148, H('#4a2a10')); R.anillo(68, 153, 3, H('#d8d2c8'));
  for (let k = 0; k < 3; k++) { const f = (t * 0.6 + k / 3) % 1; pset(Math.round(56 + k * 3 + Math.sin(t * 3 + k) * 2), Math.round(144 - f * 16), f < 0.6 ? H('#f8f6f0') : H('#d8d2c8')); pset(Math.round(57 + k * 3 + Math.sin(t * 3 + k) * 2), Math.round(143 - f * 16), H('#e8e4dc')); }
  // el cuenco de cristal: solo el envoltorio de un caramelo
  for (let j = 0; j < 9; j++) for (let i = -14; i <= 14; i++) { const e = (i * i) / 196 + ((j - 2) * (j - 2)) / 49; if (e > 1) continue; pset(160 + i, 156 + j, e > 0.82 ? H('#8aa8b8') : j < 3 ? H('#d8ecf4') : H('#b8d4e0')); }
  for (let i = -13; i <= 13; i++) pset(160 + i, 156, H('#eef8fc')); rect(154, 158, 160, 159, H('#e0b030')); pset(153, 157, H('#e0b030')); pset(161, 160, H('#e0b030')); pset(158, 158, H('#fff0a0'));
  // las fichas de racionamiento (rojas y azules) y el lápiz
  for (const [x, y, c] of [[128, 168, '#c83a2a'], [134, 171, '#3a5aa8'], [139, 167, '#c83a2a']]) { R.disco(x, y, 2.5, K); R.disco(x, y, 2, H(c)); pset(x - 1, y - 1, BL); }
  linea(66, 176, 84, 170, H('#e0b030')); linea(66, 177, 84, 171, H('#a87820')); pset(85, 170, K); pset(65, 177, H('#e08a8a'));
};
const p1 = (t) => {
  fondoCocina();
  // por la ventana: nubes y el chico que arrastra el carro de chatarra
  R.recorte([18, 26, 87, 96]);
  for (const [x0, y, w, v] of [[10, 34, 22, 3], [70, 40, 16, 5], [130, 30, 26, 2.5]]) nube(((x0 + t * v) % 120) - 10, y, w, RP('#a8bcd0', '#e4ecf2', '#fbfdff'));
  const cx = Math.round(-10 + t * 17);
  for (const [dx, c] of [[0, '#7a7a80'], [5, '#a8a8b0'], [9, '#8a6a4a']]) rect(cx + dx, 87, cx + dx + 3, 90, H(c));
  rect(cx - 1, 91, cx + 13, 92, H('#a82a22')); pset(cx + 1, 93, K); pset(cx + 11, 93, K); linea(cx + 13, 91, cx + 18, 88, K);
  const pie = Math.floor(t * 6) % 2; rect(cx + 19, 82, cx + 21, 84, H('#e8b890')); rect(cx + 19, 85, cx + 21, 89, H('#3a5aa8')); pset(cx + 19 + pie * 2, 91, K); pset(cx + 21 - pie * 2, 91, K); rect(cx + 19, 81, cx + 21, 81, H('#6a3a1a'));
  R.recorte(null);
  // la bandera del porche de enfrente, que ondea
  // (dentro del cristal de la izquierda; los peinazos vuelven a pintarse encima)
  rect(52, 25, 53, 97, H('#f0ece0')); rect(17, 59, 88, 60, H('#f0ece0'));
  // el gato del alféizar con la cola que se mueve
  const gx = 72; rect(gx, 89, gx + 7, 96, H('#2a2428')); rect(gx + 1, 86, gx + 6, 89, H('#2a2428')); pset(gx + 1, 85, H('#2a2428')); pset(gx + 6, 85, H('#2a2428')); pset(gx + 2, 87, H('#c8d040')); pset(gx + 5, 87, H('#c8d040'));
  const cola = Math.sin(t * 2.4); for (let k = 0; k < 7; k++) pset(Math.round(gx - 1 - k * 0.8), Math.round(95 - k * 0.6 + cola * k * 0.5), H('#2a2428'));
  // las agujas del reloj y el vapor de la tetera
  const am = t * 0.8 - 1.4, ah = t * 0.07 + 2.2; linea(166, 38, Math.round(166 + Math.cos(am) * 6), Math.round(38 + Math.sin(am) * 6), K); linea(166, 38, Math.round(166 + Math.cos(ah) * 4), Math.round(38 + Math.sin(ah) * 4), K); pset(166, 38, H('#c83a2a'));
  for (let k = 0; k < 6; k++) { const f = (t * 0.7 + k / 6) % 1; const x = Math.round(304 + f * 6 + Math.sin(t * 2 + k) * 2), y = Math.round(52 - f * 9); if (y > 46) { disco(x, y, 1 + f * 2, f < .5 ? H('#f4f2ee') : H('#d8d6d0')); } }
  // la radio habla: el dial se enciende y salen las ondas
  const habla = t > @{1.9} && t < @{3.5}; if (habla) { rect(209, 64, 211, 65, H('#fff0a0')); for (let k = 0; k < 3; k++) { const f = (t * 1.6 + k / 3) % 1, r = 4 + f * 12; for (let a = -0.7; a <= 0.7; a += 0.12) pset(Math.round(224 + Math.cos(a) * r), Math.round(55 + Math.sin(a) * r), f < .6 ? H('#f8f0d0') : H('#c8bc98')); } }
  // la madre: escucha la radio, habla con el niño y arranca el cupón
  const arranca = t > @{3.55}, vuela = sube(@{3.55}, @{3.95}, t);
  const ma = R.actor(EL.madre62, 62, 130, t, { dir: 1, habla: (t > @{0.2} && t < @{1.4}) && Math.sin(t * 8) > 0, sostiene: arranca ? [90, 112] : undefined, dedo: t > @{2.0} && t < @{3.3}, sonrisa: t < @{1.6} });
  // el niño: mira el frasco, lo sacude y se entristece
  const sacude = t > @{4.27} && t < @{4.95}, triste = t > @{4.8};
  const ni = R.actor(EL.nino62, 208, 130, t, { dir: -1, sostiene: sacude ? [222, 122 + (Math.sin(t * 30) > 0 ? 1 : 0)] : undefined, sorpresa: t > @{0.6} && t < @{1.4}, triste });
  mesaHule();
  tazaYCuenco(t);
  // la cartilla (un cupón menos desde «rationed») y el cupón que vuela a la mano de la madre
  PZ.cartilla(R, 104, 174, { s: 3, cupones: arranca ? 4 : 5 });
  if (arranca) { const x = Math.round(lerp(118, ma.mano[0] + 2, vuela)), y = Math.round(lerp(150, ma.mano[1] - 2, vuela) - Math.sin(vuela * 3.14) * 12); rect(x - 4, y - 3, x + 4, y + 3, K); rect(x - 3, y - 2, x + 3, y + 2, H('#e8dcc0')); rect(x - 2, y - 1, x + 2, y, H('#c83a2a')); pset(x + 3, y + 2, H('#b8a888')); }
  // el frasco de azúcar: tiembla y caen los últimos granos en la cuchara
  const jx = sacude ? (Math.sin(t * 40) > 0 ? 1 : -1) : 0, nivel = lerp(0.15, 0.04, sube(@{4.3}, @{4.9}, t));
  PZ.frasco(R, 230 + jx, 174, { s: 3, nivel });
  rect(252, 168, 268, 169, H('#9a9aa0')); R.disco(270, 168, 3, H('#9a9aa0')); R.disco(270, 168, 2, H('#d8d8dc'));
  if (t > @{4.4}) for (let k = 0; k < 6; k++) { const f = Math.min(1, (t - @{4.4} - k * 0.07) * 3); if (f <= 0) continue; pset(Math.round(246 + k % 3 + f * 20), Math.round(150 + f * f * 16), BL); }
};
// ── 2. la calle de las afueras en 1950: vuelven los disfraces y los cómics ──
const cubo = (x, y, c = '#e07a1a') => { rect(x - 3, y - 4, x + 3, y + 2, K); rect(x - 2, y - 3, x + 2, y + 1, H(c)); pset(x - 1, y - 2, H('#fff0a0')); pset(x + 1, y - 2, H('#fff0a0')); rect(x - 1, y, x + 1, y, H('#3a1a0a')); linea(x - 3, y - 4, x, y - 7, K); linea(x + 3, y - 4, x, y - 7, K); };
const comic = (x, y, pasa, t) => { x = Math.round(x); y = Math.round(y);
  rect(x - 9, y - 7, x + 9, y + 5, K); rect(x - 8, y - 6, x - 1, y + 4, H('#f8f4e4')); rect(x + 1, y - 6, x + 8, y + 4, H('#f8f4e4')); rect(x, y - 6, x, y + 4, H('#b8b0a0'));
  const pg = Math.floor(pasa) % 3, cols = [['#e8402a', '#3a7ad8', '#f0c020', '#4aa84a'], ['#f0c020', '#e8402a', '#8a4ac8', '#3a7ad8'], ['#4aa84a', '#f08a2a', '#3a7ad8', '#e8402a']][pg];
  for (const [i, [dx, dy]] of [[-7, -5], [-4, -5], [-7, -1], [-4, -1]].entries()) { rect(x + dx, y + dy, x + dx + 2, y + dy + 2, H(cols[i])); }
  for (const [i, [dx, dy]] of [[2, -5], [5, -5], [2, -1], [5, -1]].entries()) { rect(x + dx, y + dy, x + dx + 2, y + dy + 2, H(cols[(i + 2) % 4])); }
  const f = pasa % 1; if (f > 0 && f < 1) { const w = Math.round(8 * Math.cos(f * 3.14)); rect(Math.min(x, x + w), y - 7, Math.max(x, x + w), y + 4, K); rect(Math.min(x, x + w) + (w < 0 ? 1 : 0), y - 6, Math.max(x, x + w) - (w > 0 ? 1 : 0), y + 3, H('#ece6d0')); } };
const p2 = (t) => {
  const g = T.estaciones(R, t, { encuadre: 'calle50', camara: 'general' }), S = g.suelo ?? 150;
  // los tres disfrazados llegan corriendo por la acera hasta el camino de la casa del centro
  const ll = sube(P2 + 0.1, @{9.4}, t), alza = t > @{10.9};
  const kids = [[EL.pirata50, 330, 168, '#e07a1a'], [EL.princesa50, 352, 188, '#d86ac8'], [EL.vaquero50, 374, 208, '#e0a02a']];
  for (const [def, x0, x1, c] of kids) { const x = Math.round(lerp(x0, x1, ll)), anda = ll > 0 && ll < 1;
    const m = R.actor(def, x, S, t, { dir: -1, anda, sostiene: alza ? [x - 2, S - 26 - (Math.sin(t * 9 + x) > 0 ? 1 : 0)] : true, sonrisa: ll >= 1, habla: alza && Math.sin(t * 8 + x) > 0 });
    cubo(m.mano[0], m.mano[1] + 6, c); }
  if (alza) R.icono('!', 196, 100 - Math.round(Math.abs(Math.sin(t * 6)) * 2), H('#ffe08a'), K, 2);
  // el niño del cómic, junto a la farola: pasa la página en «magazines» y en «comic strips»
  const pasa = sube(@{8.33}, @{8.75}, t) + sube(@{9.47}, @{9.85}, t);
  const lee = R.actor(EL.nino62, 104, S, t, { dir: 1, sostiene: [122, 128], sonrisa: pasa > 0.5, sorpresa: t > @{11.25} });
  comic(lee.mano[0] + 2, lee.mano[1] - 1, pasa, t);
  T.estacionesDelante(R, t, { encuadre: 'calle50', camara: 'general' });
};
// ── 3. el porche de cerca, hoy: los caramelos y los diez mil millones ──
const pilas = [[106, 22], [118, 30], [130, 18], [142, 34], [154, 26], [166, 16], [178, 24]];
const moneda = (x, y, luz) => { rect(x - 5, y - 1, x + 5, y + 1, K); rect(x - 4, y - 1, x + 4, y, H('#e8b830')); rect(x - 4, y + 1, x + 4, y + 1, H('#a8701a')); pset(x - 3, y - 1, luz ? BL : H('#fff0a0')); };
const p3 = (t) => {
  const o = { encuadre: 'calle50', camara: 'porche', dulces: lerp(1, 0.4, sube(@{13.1}, @{13.9}, t)) };
  const g = T.estaciones(R, t, o), S = g.suelo ?? 146;
  // las pilas de monedas crecen en «$10 billion»
  pilas.forEach(([x, hmax], i) => { const u = sube(@{14.0} + i * 0.08, @{14.6} + i * 0.1, t), n = Math.round(u * hmax / 2); for (let k = 0; k < n; k++) moneda(x, S - 1 - k * 2, k === n - 1 && Math.sin(t * 5 + i) > 0.6); });
  for (let i = 0; i < 5; i++) { const f = (t - @{14.0} - i * 0.13) * 2.2; if (f > 0 && f < 1) moneda(110 + i * 16, Math.round(40 + f * f * 80), true); }
  // los dos niños de hoy suben al porche, cogen caramelos y saltan de alegría
  const ll = sube(P3 + 0.1, @{12.9}, t), coge = t > @{13.05} && t < @{13.95}, salta = t > @{15.51} ? Math.round(Math.abs(Math.sin((t - @{15.51}) * 7)) * 4) : 0;
  const xa = Math.round(lerp(336, 222, ll)), xb = Math.round(lerp(360, 246, ll));
  const a = R.actor(EL.chicoHoy, xa, S, t, { dir: -1, anda: ll > 0 && ll < 1, sostiene: coge ? [204, 126] : true, salto: salta, sonrisa: t > @{13.9}, sorpresa: t > @{14.1} && t < @{15.4} });
  cubo(a.mano[0], a.mano[1] + 6); if (coge && t > @{13.5}) { pset(a.mano[0], a.mano[1] - 1, H('#e83a6a')); pset(a.mano[0] + 1, a.mano[1] - 1, H('#3ab8e8')); }
  const b = R.actor(EL.chicaHoy, xb, S, t, { dir: -1, anda: ll > 0 && ll < 1, sostiene: true, salto: salta ? 4 - salta : 0, sonrisa: t > @{13.0}, dedo: t > @{14.1} && t < @{15.4} });
  cubo(b.mano[0], b.mano[1] + 6, '#8a4ac8');
  // la cifra se escribe de izquierda a derecha
  const u = sube(@{14.0}, @{14.7}, t); if (u > 0) { R.numero('$10,000,000,000', 152, 34, { tam: 8, centro: true, n: Math.round(u * 124) }); }
  T.estacionesDelante(R, t, o);
};
const efectos = [[@{3.6}, 'papel'], [@{4.35}, 'golpecito'], [@{8.35}, 'papel'], [@{9.5}, 'papel'], [@{10.95}, 'palmada'], [@{13.3}, 'pop'], [@{14.05}, 'brillo'], [@{15.6}, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: (t) => (t < P2 ? 1943 : t < P3 ? 1950 : 2026) });
'''))

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['tr-velas'] = ('Las velas del pastel', '''// TR-VELAS (frase 18), cartela 1746; cinco planos:
// 1. «Halloween has its own day» (hoy): la puerta de la nevera con el calendario de octubre; una mano rodea el 31 con el
//    rotulador en «own day» y, en «some celebrations don't», pasa las hojas: cada mes lleva un pastelito en otro día;
// 2. «because everyone gets their own» (¿?): un cuarto a oscuras; una sombra entra con una vela, en «Nobody knows who» le
//    sale un «?», en «candle» la clava en un pastel y en «birthday cake» se enciende y la luz llena el cuarto;
// 3. «the Greek goddess Artemis»: el templo en ruinas bajo la luna, con la estatua de Artemisa y su pastel de luna; el
//    erudito la mira con la lupa, el «?» se deshace en «no evidence» y en «accounts» abre su libro;
// 4. «In 1746 in Germany» (1746): el salón rococó; el conde entra, se alegra en «celebrated» y en «one candle for each
//    year» enciende las velas una a una (1…46) mientras los niños aplauden;
// 5. «in 1801 the writer Goethe» (1801): el pastel de cerca: Goethe escribe; en «about 50» sale el 50; GAG 6: la uva
//    llega corriendo por el mantel, sopla… y se apagan todas menos una.''', _en('tr-velas', AYUDAS + r'''
const P2 = @{5.60}, P3 = @{12.44}, P4 = @{16.98}, P5 = @{23.36};
// ── 1. la puerta de la nevera (fondo local) ──
const fondoNevera = capa(() => {
  // la pared de azulejos a la izquierda y la derecha, con la ventana y el armario alto pintado
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { if (x >= 62 && x <= 262) continue; const az = y > 60, jx = (x % 12 === 0) || (y % 10 === 0);
    pset(x, y, az ? (jx ? H('#a8b4b0') : tone(RP('#c8d8d4', '#dce8e4', '#eef6f2'), 1.4 + (x % 12 < 2 ? .7 : 0) + (hh(x >> 2, y >> 2) - .5) * .4, x, y)) : tone(RP('#b8c4bc', '#c8d2ca', '#d4ddd6'), 1.4 + (hh(x >> 3, y >> 3) - .5) * .4, x, y)); }
  rect(0, 59, 61, 60, H('#8a9a94')); rect(263, 59, 319, 60, H('#8a9a94'));
  // la ventana de la izquierda (el cielo y las nubes van en cada fotograma)
  rect(6, 70, 52, 120, H('#f4f4ee')); rect(8, 72, 50, 118, H('#9ac4e4')); rect(28, 72, 29, 118, H('#f4f4ee')); rect(8, 94, 50, 95, H('#f4f4ee'));
  rect(4, 120, 54, 123, H('#e8e8e0')); rect(4, 124, 54, 124, H('#9a9a94'));
  // la encimera con el frutero (uvas), la tostadora y el bote de utensilios
  for (let y = 140; y < 180; y++) for (let x = 0; x < 62; x++) pset(x, y, y < 144 ? H(y === 140 ? '#f0f0ea' : '#c8c8c2') : tone(RP('#7a5a3a', '#9a7450', '#b48c62'), 1.4 + ((x + (y >> 3) * 5) % 16 === 0 ? -1 : 0) + (y % 12 === 0 ? -.8 : 0), x, y));
  for (let y = 140; y < 180; y++) for (let x = 263; x < 320; x++) pset(x, y, y < 144 ? H(y === 140 ? '#f0f0ea' : '#c8c8c2') : tone(RP('#7a5a3a', '#9a7450', '#b48c62'), 1.4 + ((x + (y >> 3) * 5) % 16 === 0 ? -1 : 0) + (y % 12 === 0 ? -.8 : 0), x, y));
  rect(282, 150, 312, 152, H('#3a2a1a')); rect(290, 156, 304, 157, H('#c8c0b0'));
  for (let j = 0; j < 8; j++) for (let i = -12; i <= 12; i++) if ((i * i) / 144 + (j * j) / 64 <= 1) pset(30 + i, 132 + j, j < 1 ? H('#f8f4ec') : tone(RP('#8a6a4a', '#b89068', '#d8b088'), 1.6 - j / 6, i, j));
  for (const [x, y, c] of [[22, 130, '#6a2a7a'], [26, 128, '#7a3a8a'], [24, 126, '#6a2a7a'], [36, 129, '#e84a3a'], [40, 131, '#e8c030'], [33, 126, '#e8c030']]) { disco(x, y, 2.6, K); disco(x, y, 2, H(c)); pset(x - 1, y - 1, BL); }
  for (let y = 112; y < 140; y++) for (let x = 268; x < 296; x++) pset(x, y, tone(RP('#8a8a90', '#b8b8c0', '#e0e0e6', '#f8f8fc'), 2 - (x > 292 ? 1.5 : 0) + (x < 271 ? 1 : 0) - (y > 136 ? 1 : 0), x, y));
  rect(272, 110, 280, 112, K); rect(284, 110, 292, 112, K); rect(296, 120, 298, 124, K);
  rect(302, 118, 314, 139, H('#3a6a8a')); for (const [x, h2, c] of [[305, 104, '#c8a060'], [309, 100, '#9a9aa0'], [312, 108, '#c84a3a']]) { linea(x, 118, x, h2, H(c)); disco(x, h2, 1.5, H(c)); }
  // la nevera: el cuerpo de esmalte, la puerta del congelador y la de abajo, la junta y los tiradores cromados
  for (let y = 0; y < 180; y++) for (let x = 62; x <= 262; x++) { const borde = x < 66 || x > 258; pset(x, y, tone(RP('#b8b8b0', '#d8d8d0', '#ecece4', '#f8f8f2'), 2.3 - (borde ? 1.4 : 0) - (x > 240 ? (x - 240) / 30 : 0) + (x < 90 ? (90 - x) / 60 : 0) + (hh(x >> 4, y >> 4) - .5) * .2, x, y)); }
  rect(62, 0, 62, 179, H('#7a7a74')); rect(262, 0, 262, 179, H('#7a7a74'));
  rect(64, 38, 260, 40, H('#8a8a84')); rect(64, 41, 260, 41, H('#fafaf6'));
  for (const [y0, y1] of [[6, 32], [56, 136]]) { rect(246, y0, 252, y1, H('#5a5a64')); for (let y = y0 + 1; y < y1; y++) { pset(247, y, H('#f8f8ff')); pset(248, y, H('#c8c8d4')); pset(249, y, H('#e0e0ea')); pset(250, y, H('#9a9aa8')); pset(251, y, H('#7a7a88')); } }
  // los imanes, el dibujo del niño, la foto y la lista (sin letras)
  rect(74, 50, 112, 82, H('#c8c4b8')); rect(75, 51, 111, 81, H('#fbfaf4')); disco(104, 58, 4, H('#f0c020')); for (let k = 0; k < 8; k++) { const a = k * .785; pset(Math.round(104 + Math.cos(a) * 6), Math.round(58 + Math.sin(a) * 6), H('#f0a020')); }
  poligono([[80, 72], [88, 64], [96, 72]], H('#e0402a')); rect(82, 72, 94, 80, H('#3a7ad8')); rect(87, 75, 89, 80, H('#8a5a2a')); rect(75, 80, 111, 81, H('#4aa84a'));
  for (const [x, c] of [[100, '#e84a8a'], [106, '#3a3a3a']]) { disco(x, 70, 1.5, H(c)); linea(x, 72, x, 77, H(c)); linea(x, 77, x - 2, 80, H(c)); linea(x, 77, x + 2, 80, H(c)); linea(x - 2, 74, x + 2, 74, H(c)); }
  disco(93, 50, 3, K); disco(93, 50, 2.4, H('#e83a3a')); pset(92, 49, BL); linea(93, 47, 94, 45, H('#4a8a3a'));
  rect(80, 96, 108, 128, H('#b8b0a0')); rect(82, 98, 106, 120, H('#f8f4ea')); for (let y = 99; y < 120; y++) for (let x = 83; x < 106; x++) pset(x, y, y > 112 ? H('#7aa85a') : tone(RP('#8ab8d8', '#b0d0e8'), 1, x, y));
  for (const [x, c, d] of [[88, '#e8a080', '#c8604a'], [95, '#f0c8a0', '#3a6ad8'], [101, '#e8b890', '#e8c030']]) { disco(x, 106, 2.4, H(c)); rect(x - 2, 109, x + 2, 116, H(d)); }
  rect(82, 121, 106, 126, H('#f8f4ea'));
  disco(94, 96, 3, K); disco(94, 96, 2.4, H('#4aa84a'));
  rect(124, 100, 146, 138, H('#d8d0b8')); rect(125, 101, 145, 137, H('#fbf8e8')); for (let y = 106; y < 136; y += 4) linea(128, y, 142 - (y % 8 ? 4 : 0), y, H('#9a9ab8')); disco(135, 100, 3, K); disco(135, 100, 2.4, H('#f08a2a'));
  // la invitación de cumpleaños (globos y un pastel, sin letras)
  rect(122, 52, 162, 86, H('#c8a0b0')); rect(123, 53, 161, 85, H('#fbeef2')); for (const [x, y, c] of [[131, 62, '#e8402a'], [140, 59, '#3a7ad8'], [150, 63, '#e8c030']]) { disco(x, y, 4, H(c)); pset(x - 1, y - 2, BL); linea(x, y + 4, 141, 76, H('#8a7a8a')); }
  rect(134, 76, 148, 83, H('#f4e0c8')); rect(134, 76, 148, 77, H('#e87aa0')); for (const x of [137, 141, 145]) { rect(x, 72, x, 75, H('#5aa8e8')); pset(x, 71, H('#ffb030')); }
  disco(142, 52, 3, K); disco(142, 52, 2.4, H('#c84ac8'));
  // el dibujo del gato con ceras debajo del calendario
  rect(150, 156, 196, 180, H('#c8c4b8')); rect(151, 157, 195, 180, H('#fbfaf4')); disco(170, 170, 7, H('#3a3a3a')); disco(176, 163, 5, H('#3a3a3a')); poligono([[172, 160], [174, 155], [176, 159]], H('#3a3a3a')); poligono([[177, 159], [180, 155], [181, 160]], H('#3a3a3a')); pset(175, 163, H('#e8c030')); pset(178, 163, H('#e8c030')); linea(163, 172, 156, 165, H('#3a3a3a')); for (let x = 152; x < 195; x += 3) pset(x, 178, H('#4aa84a'));
  disco(173, 156, 3, K); disco(173, 156, 2.4, H('#3a7ad8'));
  // la postal de la playa y la tabla de estrellitas en el congelador
  rect(132, 14, 170, 34, H('#b8b0a0')); rect(133, 15, 169, 33, H('#f8f4ea')); for (let y = 16; y < 33; y++) for (let x = 134; x < 169; x++) pset(x, y, y < 25 ? tone(RP('#7ab8e8', '#a8d4f0'), (y - 16) / 9, x, y) : y < 28 ? H('#3a8ab8') : H('#e8d098')); disco(160, 20, 3, H('#ffd040')); linea(140, 28, 140, 22, H('#6a4a2a')); for (let k = 0; k < 5; k++) pset(137 + k * 2, 21 + (k % 2), H('#4a9a3a'));
  rect(196, 12, 236, 34, H('#b8b0a0')); rect(197, 13, 235, 33, H('#fbfaf4')); for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) { const x = 200 + i * 6, y = 17 + j * 6; rect(x, y, x + 3, y + 3, H('#d8d8e0')); if (hh(i, j, 3) < 0.7) { pset(x + 1, y, H('#e8c030')); rect(x, y + 1, x + 3, y + 2, H('#e8c030')); pset(x + 1, y + 3, H('#e8c030')); } }
  // el brillo de la luz de la ventana sobre el esmalte
  for (let y = 0; y < 180; y++) for (let k = 0; k < 10; k++) { const x = 70 + k + Math.round(y * 0.35); if (k % 3 !== 1 && R.pget(x, y) && x < 260) pset(x, y, mez(R.pget(x, y), H('#ffffff'), 0.35)); }
  // el imán de la uva (el gag del episodio se asoma)
  PZ.uva(R, 120, 150, { s: 1 }); disco(124, 152, 2, H('#c8c8c0'));
  // el armario alto de la derecha, pintado y tranquilo (la esquina de Atom)
  rect(263, 0, 319, 54, H('#d8dcd2')); rect(266, 0, 316, 50, H('#e4e8de')); rect(270, 44, 276, 46, H('#9a9a94'));
  // el congelador: una cesta de alambre con imanes de letras… no: con imanes de colores
  for (const [x, y, c] of [[90, 18, '#3a7ad8'], [104, 22, '#e8c030'], [118, 16, '#e84a3a'], [196, 20, '#4aa84a']]) { rect(x - 3, y - 3, x + 3, y + 3, K); rect(x - 2, y - 2, x + 2, y + 2, H(c)); pset(x - 1, y - 1, BL); }
});
const p1 = (t) => {
  fondoNevera();
  // el cielo por la ventana
  R.recorte([8, 72, 50, 118]); for (let y = 72; y < 119; y++) for (let x = 8; x < 51; x++) if (x < 28 || x > 29) if (y < 94 || y > 95) pset(x, y, tone(RP('#7aa8d8', '#9ac0e4', '#c0d8ec'), (y - 72) / 46 * 2, x, y));
  for (const [x0, y, w, v] of [[0, 80, 16, 3], [30, 100, 12, 5]]) nube(8 + ((x0 + t * v) % 60) - 8, y, w, RP('#a8bcd0', '#e4ecf2', '#fbfdff'));
  aves(t, 2, 84, 14, K, 3, 0, 60); R.recorte(null);
  rect(28, 72, 29, 118, H('#f4f4ee')); rect(8, 94, 50, 95, H('#f4f4ee'));
  // la tostadora que brilla y el vapor del café (en la encimera de la derecha)
  for (let k = 0; k < 3; k++) { const f = (t * .6 + k / 3) % 1; pset(Math.round(296 + Math.sin(t * 3 + k) * 2), Math.round(116 - f * 12), f < .5 ? H('#f8f8f8') : H('#d8d8d8')); }
  // el calendario: octubre con el 31 y su calabaza; luego las hojas vuelan y cada mes trae un pastelito en otro día
  const hojas = [[10, 31], [11, 19], [12, 7], [1, 23], [2, 11]], vu = (t - @{3.92}) / 0.38;
  const k = Math.max(0, Math.min(3, Math.floor(vu))), vol = vu > 0 && vu < 4, nv = vu <= 0 ? 0 : vol ? k + 1 : 4;
  const [mes, dia] = hojas[nv]; const CX = 212, CY = 150;
  PZ.calendario(R, CX, CY, { s: 3, mes, dia });
  if (nv === 0) PZ.calabaza(R, CX + 18, CY - 4, { s: 1 }); else PZ.pastel(R, CX + 17, CY - 3, { velas: 1, t });
  // la marca de rotulador alrededor del día (solo en octubre)
  const rodea = sube(@{2.6}, @{3.5}, t); if (nv === 0 && rodea > 0) { for (let a = 0; a < rodea * 6.4; a += 0.05) { const x = Math.round(CX + 2 + Math.cos(a - 1.6) * 19), y = Math.round(CY - 20 + Math.sin(a - 1.6) * 13); pset(x, y, H('#d0202a')); pset(x + 1, y, H('#d0202a')); } }
  // la hoja que se va volando (la de debajo ya es el mes siguiente)
  if (vol) { const fv = vu - k, [m2, d2] = hojas[k]; if (fv < 0.92) PZ.hojaCalendario(R, Math.round(CX - fv * 100), Math.round(CY - 6 - fv * 46 + fv * fv * 70), { s: 3, mes: m2, dia: d2 }); }
  // la mano con el rotulador: entra desde abajo, rodea el 31, levanta la esquina de cada hoja y se va
  const entra = sube(@{1.7}, @{2.5}, t) * (1 - sube(@{5.15}, @{5.55}, t));
  if (entra > 0) { let px, py;
    if (t < @{3.6}) { const a = rodea * 6.4 - 1.6; px = CX + 2 + Math.cos(a) * 19; py = CY - 20 + Math.sin(a) * 13; }
    else { const f = vol ? Math.sin((vu % 1) * 3.14) : 0; px = CX + 24 - f * 8; py = CY - 4 - f * 12; }
    // la punta del rotulador en (px, py); la muñeca, 16 px a la derecha
    const wx = Math.round(lerp(330, px + 16, entra)), wy = Math.round(lerp(210, py + 3, entra));
    T.brazo(R, 300, 200, wx, wy, '#3a6a9a', -1, { codo: [Math.round((300 + wx) / 2 + 10), Math.round((200 + wy) / 2 + 8)] });
    const tx = wx - 16, ty = wy - 3; linea(tx, ty, tx + 9, ty + 3, K); linea(tx + 1, ty - 1, tx + 9, ty + 2, H('#e8e8f0')); pset(tx, ty, H('#d0202a')); pset(tx - 1, ty, H('#d0202a')); }
};
// ── 2. el cuarto a oscuras: nadie sabe quién puso la primera vela (fondo local, con luz y sin luz) ──
const cuarto = (luz) => () => {
  const L = luz ? 1 : 0, sh = (rp, v, x, y) => tone(rp, v - (1 - L) * 1.0, x, y);
  const PARED = RP('#1a141e', '#2a2028', '#3e3030', '#5a4638', '#7a5e44', '#9a7854');
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 9), bx = (x + (fila % 2) * 11) % 22, junta = y % 9 === 0 || bx === 0, piedra = y > 96;
    pset(x, y, sh(PARED, (piedra ? (junta ? 1.6 : 3 + (hh(fila, (x + (fila % 2) * 11) / 22 | 0) - .5)) : 3.2 + (hh(x >> 2, y >> 2) - .5) * .8) + (hh(x, y, 2) < .05 ? -1 : 0), x, y)); }
  rect(0, 96, 319, 96, H(luz ? '#3a2a20' : '#140e14'));
  // la viga con las hierbas colgadas y la ventana en arco (el cielo de noche va en cada fotograma)
  for (let y = 16; y < 24; y++) for (let x = 0; x < 320; x++) pset(x, y, sh(RP('#140c08', '#2a1a10', '#4a2e1a', '#6a4426'), 2.6 - (y > 21 ? 1 : 0) + ((x + y * 7) % 23 === 0 ? -1 : 0), x, y));
  for (const [x, c] of [[40, '#4a6a2a'], [58, '#6a5a2a'], [76, '#3a5a2a'], [180, '#5a6a2a']]) { linea(x, 24, x, 30, H(luz ? '#8a7a5a' : '#2a2418')); for (let k = 0; k < 9; k++) linea(x, 30, Math.round(x - 4 + k), 30 + 6 + (k % 3) * 2, sh(RP('#1a2010', c, '#8aa04a'), 1.8 + (k % 2) * .5, x + k, 34)); }
  rect(214, 34, 260, 90, H(luz ? '#3a2a20' : '#120c10'));
  // el estante con tarros, la jarra y el candil apagado
  rect(20, 70, 110, 73, sh(RP('#1a1008', '#3a2414', '#5a3a20', '#7a5030'), 2.5, 0, 0)); rect(20, 74, 110, 74, H('#0e0a08'));
  for (const [x, w, hgt, c] of [[26, 10, 14, '#6a7a8a'], [40, 8, 18, '#8a5a3a'], [52, 12, 10, '#a89a7a'], [70, 9, 16, '#5a6a4a'], [86, 14, 12, '#8a4a3a']]) for (let y = 70 - hgt; y < 70; y++) for (let xx = x; xx < x + w; xx++) pset(xx, y, sh(RP(oscuro(c), c, '#e8dcc0'), 1 + (xx === x + 1 ? 1 : 0) - (xx > x + w - 3 ? 1 : 0) + (y === 70 - hgt ? -.5 : 0), xx, y));
  // la mesa de madera tosca
  for (let y = 128; y < 136; y++) for (let x = 96; x < 226; x++) pset(x, y, sh(RP('#1a1008', '#3a2414', '#5a3a20', '#7a5030', '#9a6a40'), 3.2 - (y > 132 ? 1.4 : 0) + ((x * 3 + (y >> 1) * 11) % 37 === 0 ? -1 : 0) + (hh(x >> 3, y) - .5) * .6, x, y));
  for (const lx of [102, 216]) for (let y = 136; y < 172; y++) for (let x = lx; x < lx + 6; x++) pset(x, y, sh(RP('#140c06', '#2a1a10', '#4a2e1a', '#6a4426'), 2.4 + (x === lx + 1 ? .8 : 0) - (x > lx + 4 ? 1 : 0), x, y));
  // el suelo de losas
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 150) / 10), j = (y - 150) % 10 === 0 || (x + fila * 17) % 34 === 0; pset(x, y, sh(RP('#141014', '#262024', '#3a3234', '#56484a', '#6e5e5a'), j ? 1.6 : 3 + (hh((x + fila * 17) / 34 | 0, fila) - .5) * .8 - (y < 152 ? 1 : 0), x, y)); }
  // la mesa tapa el suelo detrás de las patas
  for (const lx of [102, 216]) for (let y = 150; y < 172; y++) for (let x = lx; x < lx + 6; x++) pset(x, y, sh(RP('#140c06', '#2a1a10', '#4a2e1a', '#6a4426'), 2.4 + (x === lx + 1 ? .8 : 0) - (x > lx + 4 ? 1 : 0), x, y));
  const MAD = RP('#140c06', '#2a1a10', '#4a2e1a', '#6a4426', '#8a5a34');
  // la alacena de la derecha con platos y jarras
  for (let y = 58; y < 160; y++) for (let x = 268; x < 318; x++) { const marco = x < 271 || x > 314 || y < 61 || (y > 96 && y < 100) || y > 155; pset(x, y, sh(MAD, marco ? 3 : 1.6 + ((x * 5 + y) % 19 === 0 ? -1 : 0), x, y)); }
  for (const [x, y, r] of [[280, 80, 7], [296, 80, 7], [310, 82, 5]]) { disco(x, y, r, sh(RP('#3a3a40', '#8a8a90', '#c8c4b8', '#e8e4d8'), 2.4, x, y)); disco(x, y, r - 3, sh(RP('#3a4a6a', '#5a6a9a', '#8a9ac8'), 1.6, x, y)); }
  for (const [x, w, hgt] of [[276, 10, 14], [292, 8, 18], [304, 8, 12]]) for (let y = 128 - hgt; y < 128; y++) for (let xx = x; xx < x + w; xx++) pset(xx, y, sh(RP('#2a1a10', '#6a4a2a', '#a87a4a', '#c89a6a'), 2 + (xx === x + 1 ? 1 : 0) - (xx > x + w - 3 ? 1 : 0), xx, y));
  rect(272, 128, 314, 130, sh(MAD, 3.4, 0, 0)); rect(272, 140, 314, 141, sh(MAD, 3, 0, 0)); disco(304, 120, 1.5, H('#c8a050'));
  // el barril, la escoba y el caldero colgado
  for (let y = 124; y < 166; y++) for (let x = 16; x < 46; x++) { const bo = Math.abs(y - 145) / 21, w = 15 - bo * bo * 4; if (Math.abs(x - 31) > w) continue; const aro = Math.abs(y - 130) < 2 || Math.abs(y - 160) < 2; pset(x, y, aro ? sh(RP('#1a1a1e', '#3a3a40', '#6a6a70'), 1.8 + (x < 25 ? .6 : 0), x, y) : sh(MAD, 2.4 - (x - 31) / 15 + ((x - 16) % 6 === 0 ? -1 : 0), x, y)); }
  linea(54, 82, 66, 164, sh(MAD, 3.4, 0, 0)); linea(55, 82, 67, 164, sh(MAD, 2.4, 0, 0)); for (let k = 0; k < 9; k++) linea(64 + k - 4, 150, 62 + k * 1.4 - 4, 168, sh(RP('#3a2a10', '#7a6a2a', '#a8904a'), 2, k, 0));
  linea(150, 24, 150, 34, H(luz ? '#5a4a3a' : '#2a2018')); for (let j = 0; j < 9; j++) for (let i = -8; i <= 8; i++) if ((i * i) / 64 + (j * j) / 81 <= 1) pset(150 + i, 36 + j, sh(RP('#0e0e10', '#26262a', '#4a4a50', '#7a7a80'), 2 - i / 8 + (j === 0 ? 1 : 0), i, j)); rect(141, 35, 159, 36, sh(RP('#26262a', '#4a4a50'), 1.5, 0, 0));
  // telarañas en la esquina
  for (let k = 0; k < 6; k++) { linea(0, 24, 30 - k * 5, 24 + k * 6, H(luz ? '#8a7a6a' : '#3a3036')); } for (const r of [8, 15, 22]) for (let a = 0; a < 1.57; a += 0.08) pset(Math.round(Math.cos(a) * r), Math.round(24 + Math.sin(a) * r), H(luz ? '#8a7a6a' : '#3a3036'));
  // el rayo de luna que entra por la ventana y cae en el suelo
  for (let y = 92; y < 180; y++) { const u = (y - 92) / 88, a0 = lerp(214, 150, u), a1 = lerp(260, 214, u); for (let x = Math.round(a0); x < a1; x++) if ((x + y) % 2 === 0 || u > 0.5) { const c = R.pget(x, y); pset(x, y, mez(c, H('#8a9ad0'), luz ? 0.12 : 0.22)); } }
};
function oscuro(c) { return '#' + [1, 3, 5].map((i) => Math.round(parseInt(c.slice(i, i + 2), 16) * 0.62).toString(16).padStart(2, '0')).join(''); }
const BOSC = (() => { let A = null, B = null; return () => { if (!A) { A = R.nuevo(); B = R.nuevo(); let pv = R.usar(A); cuarto(false)(); R.usar(pv); pv = R.usar(B); cuarto(true)(); R.usar(pv); } return [A, B]; }; })();
// el pastel sencillo, sin velas (crema, goterones y guindas)
const tarta = (cx, by) => { const w = 22;
  for (let j = 0; j < 4; j++) for (let i = -w - 6; i <= w + 6; i++) if ((i * i) / ((w + 6) * (w + 6)) + (j * j) / 16 <= 1) pset(cx + i, by + j - 1, j < 1 ? H('#e8e8ec') : H('#9a9aa4'));
  for (let y = by - 14; y < by; y++) for (let i = -w; i <= w; i++) pset(cx + i, y, tone(RP('#a86a3a', '#c8884a', '#e0a868'), 1.6 - (i > w - 5 ? 1 : 0) + (i < -w + 3 ? .5 : 0) + (y === by - 7 ? -1 : 0), cx + i, y));
  for (let j = -3; j <= 3; j++) for (let i = -w; i <= w; i++) if ((i * i) / (w * w) + (j * j) / 9 <= 1) pset(cx + i, by - 14 + j, j < -1 ? H('#fffaf2') : H('#f4ece0'));
  for (const i of [-19, -12, -6, -1, 6, 12, 17, 20]) for (let k = 0; k < 2 + (i & 3); k++) pset(cx + i, by - 11 + k, H('#f4ece0'));
  for (const i of [-15, -5, 5, 15]) { disco(cx + i, by - 16, 1.6, H('#c8202a')); pset(cx + i - 1, by - 17, BL); } };
const p2 = (t) => {
  const [A, B] = BOSC();
  // la luz: la vela que lleva la sombra y luego la del pastel
  const entra = sube(P2 + 0.05, @{7.6}, t), clava = sube(@{9.16}, @{9.6}, t), prende = sube(@{10.0}, @{10.7}, t), vase = sube(@{11.4}, @{12.4}, t);
  const xs = Math.round(t < @{11.4} ? lerp(-18, 112, entra) : lerp(112, -24, vase));
  const SUELO = 166, yC = SUELO - 13;
  const mano = clava < 1 ? [Math.round(lerp(xs + 20, 160, clava)), Math.round(lerp(yC, 118, clava))] : null;
  const lx = mano ? mano[0] : 160, ly = mano ? mano[1] - 8 : 102, r = mano ? 34 + Math.sin(t * 9) : lerp(34, 160, prende) + Math.sin(t * 7) * 2;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - lx, (y - ly) * 1.15) / r, i = y * 320 + x; pset(x, y, d < 1 - (hh(x, y, 5) - .5) * .25 ? B[i] : A[i]); }
  // la ventana: la noche, la luna y las nubes
  R.recorte([214, 34, 260, 90]); for (let y = 34; y <= 90; y++) for (let x = 214; x <= 260; x++) { if (y < 56 && Math.hypot(x - 237, y - 56) > 23) continue; pset(x, y, tone(RP('#0a0c1e', '#141a36', '#22284a'), (y - 34) / 56 * 2, x, y)); }
  disco(246, 50, 6, H('#f4ecc8')); disco(244, 49, 5, H('#fff8e0')); for (const [x0, y, v] of [[0, 60, 4], [30, 74, 2.5]]) nube(214 + ((x0 + t * v) % 60) - 10, y, 10, RP('#1a1e36', '#2a2e4a', '#4a4e6a'));
  estrellas(t, 8, 216, 36, 258, 88, 4); R.recorte(null);
  for (let y = 34; y <= 90; y++) for (let x = 210; x <= 264; x++) { const dEn = (y < 56 ? Math.hypot(x - 237, y - 56) : Math.abs(x - 237)); if (dEn > 23 && dEn <= 26 && (y >= 56 || Math.hypot(x - 237, y - 56) <= 26)) pset(x, y, prende > .3 ? H('#5a4638') : H('#2a2028')); }
  rect(212, 90, 262, 93, prende > .3 ? H('#7a5e44') : H('#2a2028'));
  // el ratón que cruza el suelo
  const rt = (t - @{6.4}) / 2.2; if (rt > 0 && rt < 1) { const rx = Math.round(330 - rt * 360), ry = 174, pa = Math.floor(t * 12) % 2; rect(rx, ry - 3, rx + 5, ry, H('#4a4048')); pset(rx - 1, ry - 2, H('#4a4048')); pset(rx + 1, ry - 4, H('#6a5e66')); pset(rx, ry - 2, K); linea(rx + 6, ry - 1, rx + 11, ry - 2 - pa, H('#6a5e66')); pset(rx + 1 + pa, ry + 1, K); pset(rx + 4 - pa, ry + 1, K); }
  // el pastel y la vela (cuando ya está clavada)
  tarta(160, 128);
  const velaEn = (x, y, encendida) => { rect(x - 1, y - 9, x + 1, y, K); rect(x, y - 8, x, y - 1, H('#f4ece0')); pset(x, y - 8, H('#c8202a'));
    if (encendida) { const on = Math.sin(t * 13) > 0; pset(x, y - 10, H('#fff0a0')); pset(x, y - 11, on ? H('#ffd040') : H('#ffb030')); pset(x + (on ? 0 : 1), y - 12, H('#ff8a20')); pset(x - 1, y - 10, H('#ffb030')); pset(x + 1, y - 10, H('#ffb030')); } };
  // la sombra que nadie conoce (se queda en sombra aunque haya luz)
  silueta(() => R.actor(EL.estudioso, xs, SUELO, t, { dir: t < @{11.4} ? 1 : -1, anda: (entra > 0 && entra < 1) || (vase > 0 && vase < 1), sostiene: mano ?? undefined, brazos: t > @{10.75} && t < @{11.35} }), H('#0a0610'), 1, 0, 0, 0, 0);
  if (mano) velaEn(mano[0], mano[1] + 1, true); else velaEn(160, 113, true);
  if (prende > 0) for (let k = 0; k < 10; k++) { const f = (t * .15 + k / 10) % 1; pset(Math.round(120 + hh(k, 2) * 80 + Math.sin(t + k) * 4), Math.round(60 + hh(k, 3) * 60 - f * 20), prende > .5 && f < .7 ? H('#e8c890') : H('#8a6a4a')); }
  // «Nobody knows who…»: el «?»
  const q = sube(@{7.62}, @{7.9}, t) * (1 - sube(@{9.0}, @{9.3}, t)); bocadillo(xs + 10, yC - 34, '?', q);
};
// ── 3. el templo de Artemisa en ruinas, de noche (fondo local) ──
const CIELO3 = RP('#0c1028', '#141a3a', '#1e2650', '#2c3664', '#3e4878');
const MARMOL = RP('#3a4058', '#5a6280', '#8a92ae', '#b8c0d4', '#dce2ee');
const columna = (x, y0, y1, roto) => { for (let y = y0; y < y1; y++) for (let i = 0; i < 16; i++) { const acan = i % 4 === 0; pset(x + i, y, tone(MARMOL, 2.6 - (i > 11 ? 1.2 : 0) + (i < 3 ? .6 : 0) - (acan ? .8 : 0) + (hh(x + i, y >> 2) < .06 ? -1 : 0), x + i, y)); }
  if (roto) { for (let i = 0; i < 16; i++) { const yy = y0 - Math.round(3 * hh(i, x)); for (let y = yy; y < y0; y++) pset(x + i, y, tone(MARMOL, 2.2, x + i, y)); pset(x + i, yy, MARMOL[4]); } }
  else { for (let y = y0 - 6; y < y0; y++) for (let i = -3; i < 19; i++) pset(x + i, y, tone(MARMOL, 3 - (y > y0 - 3 ? 1 : 0), x + i, y)); }
  for (let y = y1; y < y1 + 5; y++) for (let i = -3; i < 19; i++) pset(x + i, y, tone(MARMOL, 2.6 - (y > y1 + 2 ? 1 : 0), x + i, y)); };
const fondoTemplo = capa(() => {
  cieloT(0, 132, CIELO3);
  // la luna llena con su halo (Artemisa es la diosa de la luna)
  halo(226, 46, 40, RP('#1e2650', '#2a3462', '#3a4676'), 1.4); disco(226, 46, 17, H('#c8c4b0')); disco(225, 45, 16, H('#ece6cc')); disco(222, 42, 9, H('#f8f4e2'));
  for (const [x, y, r] of [[231, 50, 3], [219, 49, 2], [229, 39, 2], [222, 54, 1.5]]) disco(x, y, r, H('#d0c8ac'));
  // los montes del fondo y los olivos
  for (let x = 0; x < 320; x++) { const hm = 112 - Math.round(10 * Math.sin(x * 0.02) + 6 * Math.sin(x * 0.07 + 1)); for (let y = hm; y < 132; y++) pset(x, y, tone(RP('#0e1220', '#161c30', '#202842'), 1.4 - (y - hm) / 20 + (hh(x >> 2, y >> 2) - .5) * .5, x, y)); }
  for (const [x, y] of [[150, 116], [168, 112], [262, 118], [300, 114]]) for (let k = 0; k < 14; k++) disco(x + (hh(k, x) - .5) * 14, y + (hh(k, y) - .5) * 8, 2 + hh(k, 3) * 2, tone(RP('#141c1c', '#1e2a28', '#2c3a34'), hh(k, 9) * 2.4, k, 0));
  // la escalinata (estilóbato) de tres gradas
  for (let y = 132; y < 160; y++) for (let x = 0; x < 320; x++) { const g = Math.floor((y - 132) / 9.4), bor = (y - 132) % 9 === 0; pset(x, y, bor ? MARMOL[4] : tone(MARMOL, 2.2 - ((y - 132) % 9) / 9 * 1.2 + (hh(x >> 3, g) - .5) * .5 + ((x + g * 13) % 31 === 0 ? -1.2 : 0), x, y)); }
  // el suelo de tierra con hierba y piedras caídas
  for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, tone(RP('#141a14', '#1e281c', '#2c3a26', '#3e4e32'), 2 + (hh(x >> 1, y) - .5) * 1.6 - (y < 162 ? 1 : 0), x, y));
  for (const [x, y, w] of [[30, 170, 10], [268, 172, 14], [210, 176, 8]]) { for (let j = 0; j < 5; j++) for (let i = 0; i < w; i++) pset(x + i, y + j, tone(MARMOL, 2 - j * .3 - (i > w - 3 ? 1 : 0), x + i, y + j)); }
  // las columnas: dos enteras con su arquitrabe a la izquierda; a la derecha, rotas
  columna(14, 52, 132, false); columna(64, 52, 132, false); for (let y = 30; y < 46; y++) for (let x = 0; x < 100; x++) pset(x, y, tone(MARMOL, 2.4 - (y > 41 ? 1 : 0) + (y === 30 ? 1 : 0) + ((x % 12 === 0 && y > 33 && y < 40) ? -1.2 : 0), x, y));
  for (let x = 0; x < 100; x++) for (let y = 46; y < 52; y++) pset(x, y, tone(MARMOL, 1.6 + (y === 46 ? 1 : 0), x, y));
  for (let i = 0; i < 6; i++) pset(100 + i, 30 + i * 2, CIELO3[2]);
  columna(250, 96, 132, true); columna(292, 78, 132, true);
  // el pedestal y el altar
  for (let y = 110; y < 132; y++) for (let x = 96; x < 136; x++) pset(x, y, tone(MARMOL, 2.6 - (x > 131 ? 1.2 : 0) + (y < 113 ? .8 : 0) + (y > 128 ? -.8 : 0), x, y));
  for (let y = 120; y < 132; y++) for (let x = 168; x < 212; x++) pset(x, y, tone(MARMOL, 2.4 - (x > 207 ? 1.2 : 0) + (y < 122 ? .8 : 0) + ((x - 168) % 11 === 0 ? -.6 : 0), x, y));
  for (let i = 0; i < 4; i++) { disco(176 + i * 10, 126, 1.5, MARMOL[1]); }
  // grietas, musgo, hojas de olivo y ofrendas en las gradas
  for (let k = 0; k < 14; k++) { let x = Math.floor(hh(k, 11) * 300) + 10, y = 133 + Math.floor(hh(k, 12) * 24); for (let j = 0; j < 6; j++) { pset(x, y, MARMOL[0]); x += hh(k, j) > .5 ? 1 : -1; y += 1; } }
  for (let k = 0; k < 40; k++) { const x = Math.floor(hh(k, 13) * 320), y = 134 + Math.floor(hh(k, 14) * 24); pset(x, y, H('#3a5a3a')); pset(x + 1, y, H('#2a4a2a')); if (k % 3 === 0) pset(x, y - 1, H('#4a6a3a')); }
  for (let k = 0; k < 30; k++) { const x = Math.floor(hh(k, 15) * 320), y = 160 + Math.floor(hh(k, 16) * 20); linea(x, y, x + 1, y - 3, H('#4a6a3a')); pset(x + 2, y - 2, H('#3a5a2a')); if (k % 4 === 0) pset(x + 1, y - 4, H('#c8c0e0')); }
  // el ánfora y la corona de flores junto al altar
  for (let y = 112; y < 132; y++) { const w = 4 + Math.round(4 * Math.sin((y - 112) / 20 * 3.14)); for (let x = 232 - w; x <= 232 + w; x++) pset(x, y, tone(RP('#3a1a10', '#6a3a20', '#9a5a30'), 1.8 - (x - 232) / w + (y === 120 ? -1 : 0), x, y)); }
  rect(229, 108, 235, 112, H('#6a3a20')); linea(226, 110, 228, 116, H('#5a2a14')); linea(238, 110, 236, 116, H('#5a2a14'));
  for (let a = 0; a < 6.28; a += 0.5) { const x = Math.round(118 + Math.cos(a) * 12), y = Math.round(134 + Math.sin(a) * 3); disco(x, y, 1.6, H(['#e8e0f0', '#c8a0d8', '#f0e8a0'][Math.round(a * 2) % 3])); pset(x + 1, y + 1, H('#3a5a3a')); }
});
// la estatua: una figura del reparto pasada a mármol, al doble, con el arco y la media luna
const marmol = (c) => { const r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255, l = (r + g + b) / 3; return l < 40 ? MARMOL[0] : l < 110 ? MARMOL[2] : l < 180 ? MARMOL[3] : MARMOL[4]; };
const p3 = (t) => {
  fondoTemplo();
  // las nubes que pasan por delante de la luna y las estrellas
  estrellas(t, 40, 0, 0, 320, 110, 6);
  for (const [x0, y, w, v] of [[0, 40, 26, 4], [120, 22, 18, 2.4], [200, 62, 22, 3.2]]) nube(((x0 + t * v) % 380) - 40, y, w, RP('#1a2040', '#2a3256', '#4a5276'));
  // la cierva que pasa entre los olivos
  const cx = Math.round(330 - ((t - P3) * 14)), pa = Math.floor(t * 6) % 2; if (cx > -20 && cx < 330) { const C2 = H('#2a2420'); rect(cx, 116, cx + 10, 120, C2); rect(cx - 3, 110, cx - 1, 117, C2); rect(cx - 5, 108, cx - 1, 110, C2); pset(cx - 2, 107, C2); pset(cx - 1, 106, C2); for (const [lx, d] of [[cx + 1, pa], [cx + 4, 1 - pa], [cx + 7, pa], [cx + 9, 1 - pa]]) linea(lx, 121, lx - d, 126, C2); pset(cx + 11, 115, H('#8a7a6a')); }
  // la estatua y su pedestal
  silueta(() => R.actor(EL.noviaBlanca, 100, 40, 0, { dir: 1, quieto: true, dedo: true }), null, 2, 100, 0, 101, 30, marmol);
  linea(131, 54, 136, 66, MARMOL[4]); linea(136, 66, 136, 92, MARMOL[3]); linea(136, 92, 131, 104, MARMOL[4]); linea(131, 54, 131, 104, MARMOL[2]);
  for (let a = 0; a < 3.14; a += 0.1) pset(Math.round(116 + Math.cos(a + 1.57) * 5), Math.round(52 + Math.sin(a + 1.57) * 2 - 0), MARMOL[4]);
  // el pastel de luna del altar, con sus velitas
  disco(190, 118, 9, H('#c8c4b4')); disco(190, 117, 8, H('#f4f0e2')); for (const dx of [-5, -2, 2, 5]) { rect(190 + dx, 108, 190 + dx, 111, BL); pset(190 + dx, 107, Math.sin(t * 11 + dx) > 0 ? H('#ffd040') : H('#ff9a30')); }
  halo(190, 106, 14, RP('#3a3460', '#5a4a6a'), 0.6);
  // el humo del incienso
  for (let k = 0; k < 6; k++) { const f = (t * .3 + k / 6) % 1; pset(Math.round(206 + Math.sin(t + k * 2) * 3 + f * 4), Math.round(118 - f * 40), f < .5 ? H('#8a8aa8') : H('#5a5a7a')); }
  // el erudito llega con la lupa, mira, niega con la cabeza y abre su libro
  const ll = sube(P3 + 0.1, @{13.6}, t), x = Math.round(lerp(330, 150, ll)), niega = t > @{14.04} && t < @{14.9}, libro = t > @{15.36};
  const m = R.actor(EL.erudito, x, 141, t, { dir: niega ? (Math.sin(t * 14) > 0 ? 1 : -1) : -1, anda: ll > 0 && ll < 1, sostiene: libro ? [x - 4, 120] : (t > @{12.9} ? [x - 8, 110] : true), habla: niega, sonrisa: libro && t > @{16.0} });
  if (!libro) { const [hx, hy] = m.mano; R.anillo(hx - 2, hy - 4, 3, H('#c8a050')); disco(hx - 2, hy - 4, 2, H('#9ac0e8')); pset(hx - 3, hy - 5, BL); linea(hx, hy - 1, hx + 2, hy + 2, H('#6a4a2a')); }
  else { const [hx, hy] = m.mano, ab = sube(@{15.36}, @{15.8}, t); rect(hx - 10, hy - 6, hx + 2, hy + 1, K); rect(hx - 9, hy - 5, hx - 5, hy, H('#f4ecd0')); rect(hx - 3, hy - 5, hx + 1, hy, ab > .5 ? H('#f4ecd0') : H('#7a2a2a')); for (let y = hy - 4; y < hy; y += 2) { linea(hx - 8, y, hx - 6, y, H('#8a7a6a')); if (ab > .5) linea(hx - 2, y, hx, y, H('#8a7a6a')); } }
  // el «?» sobre la estatua, que se deshace en «no evidence»
  bocadillo(152, 44 + Math.round(Math.sin(t * 2) * 1), '?', sube(@{12.6}, @{13.0}, t) * (1 - sube(@{14.04}, @{14.72}, t)), H('#c8202a'));
};
// ── 4. el salón de 1746: el conde y sus 46 velas ──
const p4 = (t) => {
  const n = Math.round(46 * sube(@{21.39}, @{22.86}, t)), o = { encuadre: 'salon1746', camara: 'general', velas: 46, encendidas: n, humo: false };
  const g = T.fiestas(R, t, o);
  // los niños de la casa, a la izquierda: miran, se sorprenden y aplauden
  const aplaude = t > @{22.9};
  R.actor(EL.ninaBarroca, 56, 160, t, { dir: 1, sorpresa: t > @{21.5} && !aplaude, brazos: aplaude && Math.sin(t * 12) > 0, sonrisa: aplaude, habla: t < @{19.4} && Math.sin(t * 7) > 0 });
  R.actor(EL.ninoBarroco, 78, 160, t, { dir: 1, sorpresa: t > @{21.6} && !aplaude, brazos: aplaude && Math.sin(t * 12 + 1) > 0, sonrisa: aplaude, salto: aplaude ? Math.round(Math.abs(Math.sin(t * 8)) * 2) : 0 });
  // el conde entra, se alegra y enciende las velas con su cerilla larga
  const ll = sube(P4 + 0.1, @{19.6}, t), xc = Math.round(lerp(330, 194, ll)), prende = t > @{21.1} && t < @{23.0};
  const tx = Math.round(lerp(184, 140, sube(@{21.39}, @{22.86}, t)));
  const c = R.actor(EL.conde, xc, 150, t, { dir: -1, anda: ll > 0 && ll < 1, brazos: t > @{19.81} && t < @{20.7}, sonrisa: t > @{19.81}, sostiene: prende ? [tx + 4, 112] : undefined, habla: t > @{20.7} && t < @{21.2} && Math.sin(t * 8) > 0 });
  T.fiestasDelante(R, t, o);
  if (prende) { const [hx, hy] = c.mano; linea(hx, hy, hx - 7, hy + 4, H('#e8dcc0')); pset(hx - 8, hy + 4, Math.sin(t * 13) > 0 ? H('#ffd040') : H('#ff8a20')); pset(hx - 8, hy + 3, H('#fff0a0')); }
  // la cuenta: una vela por año
  if (n > 0) { const py = 96; disco(160, py - 4, 10, K); disco(160, py - 4, 9, BL); disco(158, py - 6, 5, H('#fffdf6')); R.numero(String(n), 161, py, { tam: 8, centro: true, color: K, sombra: false }); }
};
// ── 5. el pastel de Goethe de cerca, con el gag de la uva ──
const p5 = (t) => {
  const sopla = sube(@{28.5}, @{28.9}, t), o = { encuadre: 'salon1746', camara: 'pastel', velas: 50, encendidas: sopla >= 1 ? 1 : true, humo: true };
  T.fiestas(R, t, o);
  // Goethe, detrás de la mesa, escribe la descripción con su pluma
  const escribe = t > @{24.98} && t < @{27.0};
  const gq = R.actor(EL.goethe, 262, 128, t, { dir: -1, sostiene: [252, 110 + (escribe && Math.sin(t * 14) > 0 ? 1 : 0)], sorpresa: t > @{29.2}, habla: t > P5 && t < @{24.9} && Math.sin(t * 7) > 0, sonrisa: t > @{27.06} && t < @{29.2} });
  T.fiestasDelante(R, t, o);
  // las llamas: se buscan en el pastel y se les pone su halo (así se lee si están encendidas)
  const fl = []; for (let y = 56; y < 104; y++) for (let x = 96; x < 226; x++) { const c = R.pget(x, y), r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255; if (r > 225 && g > 120 && b < 120) fl.push([x, y]); }
  const AU = H('#ffd870'), sola = fl.length < 6;
  for (const [x, y] of fl) { const rr = sola ? 7 : 3; for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) { const d = Math.hypot(i, j * 0.8) / rr; if (d > 1 || hh(x + i, y + j, 9) > (1 - d) * 1.1) continue; pset(x + i, y + j, mez(R.pget(x + i, y + j), AU, 0.45 * (1 - d))); } pset(x, y - 1, H('#fff4c0')); if (sola) { pset(x, y - 2, H('#ffd040')); pset(x - 1, y - 1, H('#ffb030')); pset(x + 1, y - 1, H('#ffb030')); pset(x, y - 3, H('#ff9a20')); } }
  if (sopla >= 1) { const f = t - @{28.9}; if (f < 2) for (let k = 0; k < 24; k++) { const x0 = 118 + (k * 37) % 86, ph = (f * 0.9 + hh(k, 2) * 0.3); if (ph > 1) continue; pset(Math.round(x0 + Math.sin(f * 3 + k) * 3 * ph), Math.round(76 - ph * 30 - (k % 3) * 3), ph < .5 ? H('#d8d4d0') : H('#a8a4a0')); } }
  { const [hx, hy] = gq.mano; rect(hx - 12, hy - 6, hx - 1, hy + 6, K); rect(hx - 11, hy - 5, hx - 2, hy + 5, H('#f4ecd0')); const lineas = escribe ? Math.floor((t - @{24.98}) * 3) % 6 : 5; for (let k = 0; k <= lineas; k++) linea(hx - 10, hy - 3 + k * 2, hx - 4 - (k % 2) * 2, hy - 3 + k * 2, H('#5a4a3a'));
    linea(hx - 2, hy - 1, hx + 4, hy - 9, H('#f8f8f0')); linea(hx - 1, hy - 1, hx + 5, hy - 8, H('#c8c8c0')); pset(hx - 3, hy, K); }
  // «about 50»
  const v50 = sube(@{27.06}, @{27.3}, t) * (1 - sube(@{28.2}, @{28.4}, t)); if (v50 > 0) R.numero('50', 160, Math.round(64 - v50 * 4), { tam: 16, centro: true });
  // GAG 6: la uva llega corriendo por el mantel, sopla y se apagan todas menos una
  const ll = sube(@{27.3}, @{28.2}, t), ux = Math.round(lerp(336, 238, ll)), susto = t > @{29.15};
  PZ.uva(R, ux, 164, { s: 2, t, corre: ll > 0 && ll < 1, dir: -1, cara: susto ? 'susto' : 'normal' });
  if (t > @{28.3} && t < @{29.0}) { for (let k = 0; k < 5; k++) { const f = ((t - @{28.3}) * 2.4 + k / 5) % 1, x = Math.round(224 - f * 50), y = Math.round(140 - k * 5 - f * 12); linea(x, y, x + 6 - k % 2, y, BL); pset(x - 1, y + 1, H('#c8d8e8')); } disco(226, 146, 2, H('#7a2a8a')); }
  if (susto) { R.icono('!', ux - 2, 116 - Math.round(Math.abs(Math.sin(t * 8)) * 2), H('#ffe08a'), K, 2); }
};
const efectos = [[@{2.65}, 'lapiz'], [@{3.95}, 'papel'], [@{4.9}, 'papel'], [@{9.45}, 'golpecito'], [@{10.05}, 'brillo'], [@{13.06}, 'pop'], [@{15.4}, 'papel'], [@{19.85}, 'palmada'], [@{21.4}, 'brillo'], [@{22.95}, 'palmada'], [@{25.4}, 'lapiz'], [@{27.06}, 'brillo'], [@{28.5}, 'viento'], [@{29.2}, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { cartela: '1746', efectos, año: (t) => (t < P2 ? 2026 : t < P4 ? null : t < P5 ? 1746 : 1801) });
'''))

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['tr-hill'] = ('Las hermanas Hill', '''// TR-HILL (frase 19), cartela 1893; tres planos:
// 1. «In 1893, two sisters from Kentucky» (1893): el kínder de Louisville; Mildred toca el piano y suben las notas;
//    Patty entra hasta el círculo, da palmas en «1893» y en «two sisters» señala a su hermana, que se vuelve y sonríe;
// 2. «Mildred and Patti Hill»: el piano de cerca: Mildred toca, Patty dirige y en «published» levanta la partitura;
//    en «children» entran dos niños, y en «good morning» saludan con los brazos;
// 3. «With different lyrics» (1912 → hoy): el mapamundi: las notas salen de Louisville y en «became» se vuelven un pastel
//    con velas; en «most famous birthday song in the world» vuelan a todo el mundo y en cada ciudad se enciende un pastel.''', _en('tr-hill', AYUDAS + r'''
import { equirect, pintar, PAPEL, chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { TIERRA } from '/atomo/plato/escenas/geo-ov.js';
const P2 = @{6.77}, P3 = @{12.20};
const COLN = ['#e8402a', '#3a7ad8', '#e8a020', '#4aa84a', '#c84ac8'];
// ── 1. el kínder de Louisville ──
const p1 = (t) => {
  const o = { encuadre: 'kinder', camara: 'general' };
  T.fiestas(R, t, o);
  // Mildred al piano: las manos van y vienen por el teclado; en «two sisters» se vuelve y sonríe
  const vuelve = t > @{5.0} && t < @{6.4};
  R.actor(EL.mildred, 60, 134, t, { dir: vuelve ? 1 : -1, sostiene: vuelve ? undefined : [52 + Math.round(Math.sin(t * 5) * 3), 104 + (Math.sin(t * 11) > 0 ? 1 : 0)], sonrisa: true, dedo: vuelve });
  // las notas que suben del piano
  for (let k = 0; k < 6; k++) { const f = ((t - 0.5) * 0.4 + k / 6) % 1; if (t < 1.2 + k * 0.2) continue; notaF(40 + k * 7 + Math.sin(t * 2 + k) * 6 + f * 30, 66 - f * 40, H(COLN[k % 5]), k); }
  // Patty entra hasta el círculo, da palmas y señala a su hermana
  const ll = sube(@{1.6}, @{3.4}, t), xp = Math.round(lerp(330, 143, ll)), palmas = t > @{3.49} && t < @{4.9};
  R.actor(EL.patty, xp, 150, t, { dir: -1, anda: ll > 0 && ll < 1, brazos: palmas && Math.sin(t * 14) > 0, dedo: t > @{4.93} && t < @{6.3}, sonrisa: t > @{3.4}, habla: t > @{5.79} && Math.sin(t * 8) > 0 });
  T.fiestasDelante(R, t, o);
};
// ── 2. el piano de cerca ──
const p2 = (t) => {
  const o = { encuadre: 'kinder', camara: 'piano', toca: true, notas: true };
  T.fiestas(R, t, o);
  // los dos niños que entran a dar los buenos días
  const ll = sube(@{9.33}, @{10.1}, t), saluda = t > @{10.15};
  for (const [def, x0, x1, k] of [[EL.ninaKinder, 330, 252, 0], [EL.ninoKinder, 350, 272, 1]]) { const x = Math.round(lerp(x0, x1, ll)); if (x < 324) R.actor(def, x, 176, t, { dir: -1, anda: ll > 0 && ll < 1, brazos: saluda && Math.sin(t * 9 + k) > -0.2, sonrisa: saluda, habla: saluda && Math.sin(t * 8 + k) > 0, salto: saluda ? Math.round(Math.abs(Math.sin(t * 7 + k)) * 2) : 0 }); }
  // Mildred toca (de espaldas a nosotros, las manos sobre el teclado)
  R.actor(EL.mildred, 82, 174, t, { dir: 1, sostiene: [104 + Math.round(Math.sin(t * 4) * 8), 152 + (Math.sin(t * 10) > 0 ? 1 : 0)], sonrisa: true });
  // Patty dirige; en «published» levanta la partitura impresa
  const parti = t > @{8.33} && t < @{9.6};
  const pt = R.actor(EL.patty, 206, 174, t, { dir: -1, dedo: !parti && Math.sin(t * 4) > 0, sostiene: parti ? [196, 136 - Math.round(sube(@{8.33}, @{8.6}, t) * 6)] : undefined, habla: Math.sin(t * 7) > 0.1, sonrisa: true });
  if (parti) { const [hx, hy] = pt.mano; rect(hx - 9, hy - 16, hx + 3, hy, K); rect(hx - 8, hy - 15, hx + 2, hy - 1, H('#f8f4e4')); for (let s2 = 0; s2 < 2; s2++) for (let l = 0; l < 4; l++) linea(hx - 7, hy - 13 + s2 * 7 + l * 1.5, hx + 1, hy - 13 + s2 * 7 + l * 1.5, H('#8a8a9a')); for (const [dx, dy] of [[-6, -12], [-3, -10], [0, -11], [-5, -5], [-2, -4]]) { pset(hx + dx, hy + dy, K); pset(hx + dx + 1, hy + dy, K); } }
  // las notas que salen de Patty al cantar
  for (let k = 0; k < 3; k++) { const f = (t * 0.5 + k / 3) % 1; notaF(204 + Math.sin(t * 3 + k) * 4 - f * 20, 140 - f * 50, H(COLN[(k + 2) % 5]), k); }
};
// ── 3. el mapamundi: la canción da la vuelta al mundo ──
const PM = equirect([10, 22, 310, 166], [-168, 192, -58, 80]);
const LOU = [-85.76, 38.25];
const CIUDADES = [[-0.13, 51.5], [-99.1, 19.4], [-43.2, -22.9], [2.35, 48.85], [3.4, 6.5], [37.6, 55.7], [31.2, 30.0], [77.2, 28.6], [116.4, 39.9], [139.7, 35.7], [151.2, -33.9], [18.4, -33.9], [-74.0, 4.6], [-123.1, 49.3]];
const fondoMapa = capa(() => {
  // el marco de madera y el papel (un mapa escolar enrollable colgado en la pared)
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, tone(RP('#3a2414', '#5a3a20', '#7a5030', '#9a6a40'), 2 + ((x * 3 + (y >> 2) * 7) % 29 === 0 ? -1 : 0) + (hh(x >> 4, y) - .5) * .6, x, y));
  R.recorte([10, 22, 310, 166]);
  for (let y = 22; y <= 166; y++) for (let x = 10; x <= 310; x++) pset(x, y, tone(RP('#7a9aa0', '#8aaab0', '#9cbabc', '#b0c8c4'), 2 + (hh(x >> 3, y >> 3) - .5) * .7 - (hh(x, y, 4) < .04 ? 1 : 0), x, y));
  for (let lon = -180; lon <= 180; lon += 30) for (let lat = -58; lat <= 80; lat += 1) { const [x, y] = PM([lon, lat]); if (lat % 3 === 0) pset(Math.round(x), Math.round(y), H('#6a8a90')); }
  for (let lat = -30; lat <= 60; lat += 30) for (let lon = -168; lon <= 192; lon += 1) { const [x, y] = PM([lon, lat]); if (lon % 3 === 0) pset(Math.round(x), Math.round(y), H('#6a8a90')); }
  pintar(R, PM, TIERRA, (x, y) => tone(RP('#9a8a5a', '#b8a670', '#d0c08a', '#e2d6a4'), 2 + (hh(x >> 2, y >> 2, 7) - .5) * 1 + (y > 120 ? -.4 : 0) + (y < 40 ? .6 : 0), x, y), { somera: H('#a8c4c4'), borde: H('#4a3a20') });
  // los bosques y desiertos insinuados
  for (let k = 0; k < 260; k++) { const x = 10 + Math.floor(hh(k, 1) * 300), y = 22 + Math.floor(hh(k, 2) * 144); const c = R.pget(x, y); if (c !== R.pget(x + 1, y) || !c) continue; const tierra = ((c & 255) > 140); if (!tierra) continue; if (y > 60 && y < 110 && hh(k, 5) < .5) { pset(x, y, H('#c89a5a')); pset(x + 2, y + 1, H('#c89a5a')); } else { pset(x, y - 1, H('#5a7a3a')); pset(x - 1, y, H('#5a7a3a')); pset(x + 1, y, H('#4a6a2a')); pset(x, y, H('#3a5a2a')); } }
  R.recorte(null);
  // las varillas de arriba y abajo del mapa enrollable y el cordón
  rect(4, 16, 316, 21, H('#2a1a10')); for (let x = 5; x < 316; x++) { pset(x, 17, H('#a8784a')); pset(x, 18, H('#8a5a30')); pset(x, 19, H('#6a4428')); }
  rect(4, 167, 316, 172, H('#2a1a10')); for (let x = 5; x < 316; x++) { pset(x, 168, H('#a8784a')); pset(x, 169, H('#8a5a30')); pset(x, 170, H('#6a4428')); }
  disco(160, 176, 3, H('#c8a050')); linea(160, 172, 160, 174, H('#c8a050'));
  // la rosa de los vientos en el Pacífico sur
  const rx = 40, ry = 140; for (let k = 0; k < 8; k++) { const a = k * .785 - 1.57, l = k % 2 ? 4 : 9; linea(rx, ry, Math.round(rx + Math.cos(a) * l), Math.round(ry + Math.sin(a) * l), k === 0 ? H('#c8202a') : H('#4a3a20')); } disco(rx, ry, 1.5, H('#e2d6a4'));
});
const arco = (a, b, u) => { const x = lerp(a[0], b[0], u), y = lerp(a[1], b[1], u) - Math.sin(u * 3.14) * Math.min(40, Math.hypot(b[0] - a[0], b[1] - a[1]) * 0.35); return [x, y]; };
const p3 = (t) => {
  fondoMapa();
  const L = PM(LOU).map(Math.round);
  R.recorte([10, 22, 310, 166]);
  // el reflejo de la luz que cruza el papel
  const bx = Math.round(((t - P3) * 30) % 500) - 100; for (let y = 22; y <= 166; y++) for (let k = 0; k < 6; k++) { const x = bx + k + Math.round((y - 22) * 0.4); if (k % 2 === 0) pset(x, y, mez(R.pget(x, y), BL, 0.25)); }
  // las notas que giran sobre Louisville y en «became» se vuelven el pastel
  const junta = sube(@{12.6}, @{13.24}, t);
  if (junta < 1) for (let k = 0; k < 5; k++) { const a = t * 2 + k * 1.256, r = lerp(22, 2, junta); notaF(L[0] + Math.cos(a) * r, L[1] - 10 + Math.sin(a) * r * 0.6, H(COLN[k]), k); }
  // las rutas a las ciudades y los pasteles que se encienden al llegar
  CIUDADES.forEach((c, i) => { const D = PM(c).map(Math.round), t0 = @{13.6} + i * 0.18, u = tramo(t, t0, t0 + 0.9);
    if (u <= 0) return;
    for (let s = 0; s < u; s += 0.03) { const [x, y] = arco(L, D, s); if (Math.floor(s * 33) % 2 === 0) pset(Math.round(x), Math.round(y), H('#8a3a2a')); }
    if (u < 1) { const [x, y] = arco(L, D, u); notaF(x, y, H(COLN[i % 5]), i); }
    else { const pop = Math.min(1, (t - t0 - 0.9) * 5); if (pop > 0.3) PZ.pastel(R, D[0], D[1] + 3, { velas: 3, t: t + i, s: 1 }); if (pop < 1) R.anillo(D[0], D[1] - 2, 3 + pop * 6, BL); } });
  R.recorte(null);
  // Louisville: la chincheta y su pastel grande
  chincheta(R, L[0], L[1], t, H('#c8202a'), { pulso: true });
  if (junta > 0.6) { PZ.pastel(R, L[0], L[1] - 6, { velas: 5, t, s: 2 }); if (junta < 1) halo(L[0], L[1] - 14, 16, RP('#f8e8a0', '#fff8d8'), 1.2); }
};
const efectos = [[@{3.55}, 'palmada'], [@{5.0}, 'pop'], [@{8.4}, 'papel'], [@{10.2}, 'palmada'], [@{13.24}, 'brillo'], [@{14.5}, 'pop'], [@{15.3}, 'pop'], [@{16.1}, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { cartela: '1893', efectos, año: (t) => (t < P3 ? 1893 : Math.round(lerp(1912, 2026, tramo(t, P3 + 0.5, @{17.6})))) });
'''))
