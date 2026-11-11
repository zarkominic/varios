# Borrador de escenas del ep31 (grupo S7): gt-retraso y gt-escondido, con el movimiento hecho.
E = {}

# piezas y ayudas comunes a las dos escenas (cada escena es su propia página)
AYUDA = r'''
const K = hex('#16121e'), BL = hex('#f6f2e6');
const PZ = T.PIEZAS_GT;
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const CAPAS = {};
// un fondo fijo se pinta una vez en su búfer y se pega en cada fotograma
const capa = (k, dib) => { if (!CAPAS[k]) { const b = R.nuevo(), prev = R.usar(b); dib(); R.usar(prev); CAPAS[k] = b; } R.copiar(CAPAS[k]); };
const sua = (u) => u * u * (3 - 2 * u);
const caja = (x0, y0, x1, y1, c, b = K) => { R.rect(x0, y0, x1, y1, b); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
// un rectángulo que respeta R.recorte (R.rect no lo hace)
const rr = (x0, y0, x1, y1, c) => { for (let y = Math.round(y0); y <= Math.round(y1); y++) R.linea(Math.round(x0), y, Math.round(x1), y, c); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const luz = (x, y, c, a) => { if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, mez(R.pget(x, y), c, a)); };
const grad = (x0, y0, x1, y1, rampa) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, R.tone(rampa, (y - y0) / Math.max(1, y1 - y0) * (rampa.length - 1) * 0.999, x, y)); };
// una nube de tres tonos (sombra, cuerpo, luz); m(x, y): false donde no se pinta (detrás de los edificios)
const nube = (cx, cy, w, c3, m) => {
  const n = Math.max(3, Math.round(w / 8)), ps = (x, y, c) => { if (!m || m(x, y)) R.pset(x, y, c); };
  for (let capa3 = 0; capa3 < 3; capa3++) for (let i = 0; i < n; i++) {
    const x = cx - w / 2 + (i + 0.5) * w / n, r = 2 + Math.abs(Math.sin(i * 2.1 + w)) * 2.5 + (i === n >> 1 ? 2.5 : 0) + (i === 0 || i === n - 1 ? -1 : 0) - capa3 * 1.2, oy = -capa3 * 1.4;
    for (let dy = -Math.ceil(r); dy <= 0; dy++) for (let dx = -Math.ceil(r); dx <= Math.ceil(r); dx++) if (dx * dx + dy * dy * 1.6 <= r * r) ps(Math.round(x + dx - capa3 * 0.6), Math.round(cy + dy + oy), c3[capa3]);
    if (capa3 === 0) for (let dx = -Math.ceil(r); dx <= Math.ceil(r); dx++) ps(Math.round(x + dx), Math.round(cy + 1), c3[0]);
  }
};
// ladrillo con juntas, piezas de dos tonos y desconchones
const ladrillo = (x0, y0, x1, y1, base, osc, junta, k = 0) => {
  const cla = mez(base, BL, 0.14);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const fila = Math.floor((y - y0) / 6), dx = (fila % 2) * 7, enJ = (y - y0) % 6 === 5 || (x + dx) % 14 === 13, n = hh(Math.floor((x + dx) / 14), fila, k);
    R.pset(x, y, enJ ? junta : hh(x, y, k + 3) < 0.06 ? osc : n < 0.22 ? osc : n > 0.84 ? cla : (y - y0) % 6 === 0 ? cla : base);
  }
};
// madera con vetas horizontales
const madera = (x0, y0, x1, y1, c, cs, cl, k = 0) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = Math.sin(y * 0.9 + Math.sin(x * 0.045 + k) * 2.2 + hh(0, y, k) * 4); R.pset(x, y, v > 0.82 ? cs : v < -0.9 ? cl : c); }
};
// una caja de juego pequeña (8 × 11, sin letras): cielo, coche y la franja; ao: la etiqueta negra
const cajita = (x, y, col = hex('#e0a030'), ao = 0) => {
  x = Math.round(x); y = Math.round(y);
  R.rect(x - 4, y - 11, x + 4, y, K); R.rect(x - 3, y - 10, x + 3, y - 1, col); R.rect(x - 3, y - 10, x + 3, y - 8, hex('#2a3a7a'));
  R.pset(x + 2, y - 9, hex('#f0c040')); R.rect(x - 2, y - 6, x + 2, y - 5, hex('#c8303a')); R.pset(x - 2, y - 4, K); R.pset(x + 2, y - 4, K); R.pset(x + 3, y - 10, mez(col, BL, 0.5));
  if (ao) { R.rect(x, y - 3, x + 3, y - 1, K); R.pset(x + 1, y - 2, BL); } else { R.rect(x + 1, y - 3, x + 3, y - 1, BL); R.pset(x + 2, y - 2, K); }
};
// la esquina de Atom, tranquila: un degradado tramado sin juntas ni dibujo que se funde con lo de alrededor
const calma = (x0, y0, x1, y1, c0, c1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const borde = Math.min(1, (x - x0) / 10, (y1 - y) / 8); if (borde < 1 && hh(x, y, 99) > borde) continue; R.pset(x, y, R.tone([c0, c1], (y - y0) / (y1 - y0 + 1) * 1.99, x, y)); } };
// una nota musical (♪)
const nota = (x, y, c) => { x = Math.round(x); y = Math.round(y); R.rect(x, y + 3, x + 1, y + 4, c); R.linea(x + 1, y - 2, x + 1, y + 3, c); R.linea(x + 2, y - 2, x + 3, y - 1, c); };
// una palmera con el tronco anillado y siete hojas que se mecen
const palmera = (x, y, alto, t, k = 0, cT = hex('#8a5a3a'), cTs = hex('#5a3a2a'), cH = [hex('#1e4a2a'), hex('#2a6a3a'), hex('#4a9a4a')]) => {
  const sw = Math.sin(t * 1.3 + k) * 2.4; let px = x, py = y;
  for (let i = 0; i <= alto; i++) { const u = i / alto, cx = Math.round(x + Math.sin(u * 1.5) * 7 * (k % 2 ? 1 : -1) + sw * u * u), cy = y - i;
    R.rect(cx - 2, cy, cx + 2, cy, i % 4 === 0 ? cTs : cT); R.pset(cx - 2, cy, K); R.pset(cx + 2, cy, K); if (i % 4 === 1) R.pset(cx + 1, cy, mez(cT, BL, 0.25)); px = cx; py = cy; }
  for (let f = 0; f < 7; f++) {
    const ang = -Math.PI / 2 + (f - 3) * 0.56 + Math.sin(t * 1.9 + k + f) * 0.07, L = 15 + (f % 2) * 5;
    for (let s = 0; s <= L; s++) { const u = s / L, fx = Math.round(px + Math.cos(ang) * s * 1.1), fy = Math.round(py + Math.sin(ang) * s * 0.7 + u * u * 10);
      R.pset(fx, fy, cH[0]); R.pset(fx, fy - 1, cH[1]);
      if (s % 2 === 0 && s > 2) { const l = 3.5 * (1 - u * 0.5); R.linea(fx, fy, Math.round(fx - Math.sin(ang) * l), Math.round(fy + l), cH[1]); R.linea(fx, fy, Math.round(fx + Math.sin(ang) * l * 0.6), Math.round(fy + l), cH[0]); if (s % 4 === 0) R.pset(fx, fy - 1, cH[2]); } }
  }
  R.disco(px - 1, py + 2, 2, hex('#4a2a14')); R.disco(px + 2, py + 2, 2, hex('#5a3a1a')); R.pset(px - 1, py + 1, hex('#8a6a3a'));
};
// una ventana con cristales que brillan (marco, travesaño y alféizar)
const marco = (x0, y0, x1, y1, c = hex('#d8d0c0'), cs = hex('#8a8478')) => { R.rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, K); R.rect(x0 - 1, y0 - 1, x1 + 1, y0 - 1, c); R.rect(x0 - 1, y0 - 1, x0 - 1, y1 + 1, c); R.rect(x1 + 1, y0, x1 + 1, y1 + 1, cs); R.rect(x0 - 1, y1 + 1, x1 + 1, y1 + 1, cs); };
'''

E['gt-retraso'] = ('El retraso', '''// GT-RETRASO (frases 21–22), 2001, cartela «2001». Ocho planos:
// 1. el loft de noche (C nuevayork/loft, o.noche): Sam trae la caja del juego terminado y se la da a Dan en «2001»; en
//    la tele, la ciudad de juguete; en «inspired» Sam levanta el dedo hacia el ventanal con Nueva York.
// 2. LOCAL Nueva York de noche desde una azotea (corta en «New York»): en «September 11th» las ventanas se apagan un
//    poco, se levantan las dos columnas de luz del homenaje y la pareja del pretil enciende una vela. Nada más.
// 3. LOCAL la pared del loft de cerca: el calendario de octubre (corta en «delayed»): la X sobre el 2 y la flecha que
//    salta semana a semana hasta el 22; en «removed one mission», una mano descuelga una ficha del corcho.
// 4. LOCAL la mesa del diseñador con el monitor de 2001 (corta en «changed»): la selección parpadea sobre dos detalles; en
//    «redid the cover» se borra la portada (cuadros de transparencia) y se pinta otra, de día.
// 5. C nuevayork/tienda (o.año 2001; corta en «came out»): el primer comprador se lleva la caja; en «phenomenon» salta.
// 6. LOCAL paseo marítimo de los ochenta (2002; corta en «Vice»): se encienden los neones, pasa el descapotable con la
//    radio (notas en «music»), una patinadora y un chico que baila; palmeras, mar y el sol a rayas.
// 7. LOCAL pared de teles de una tienda (2004; corta en «San Andreas»): tres teles se encienden una a una, cada una
//    con una ciudad (bahía con puente, desierto con luces, colinas verdes); el chico va de tele en tele y las señala.
// 8. LOCAL fachada de noche (corta en «It wasn't»): las ventanas se encienden de azul, en cada una alguien juega.''', AYUDA + r'''
const a = (f) => en('retraso', f), b = (f) => en('vice', f);
const P2 = a(0.262), P3 = a(0.503), P4 = a(0.755), P5 = b(0), P6 = b(0.255), P7 = b(0.552), P8 = b(0.8);

// ── 1 · el loft de noche ──────────────────────────────────────────────
// la tele de tubo del loft (176–204 × 76–98) enseña la ciudad de juguete en 3D: avenida, bloques y un coche que sube
const teleCiudad = (t) => {
  R.recorte([179, 79, 201, 95]);
  rr(179, 79, 201, 86, hex('#1a2448')); rr(179, 87, 201, 95, hex('#3a3a46'));
  R.poligono([[185, 96], [195, 96], [191, 86], [189, 86]], hex('#5a5a66'));
  R.poligono([[179, 80], [188, 84], [188, 92], [179, 96]], hex('#8a4a3a')); R.poligono([[201, 78], [192, 84], [192, 92], [201, 96]], hex('#4a6a9a'));
  for (let k = 0; k < 4; k++) { R.pset(181 + k * 2, 85 + (k % 2), Math.sin(t * 3 + k) > 0 ? hex('#ffe890') : hex('#5a2a2a')); R.pset(199 - k * 2, 85 + (k % 2), Math.sin(t * 2 + k) > 0 ? hex('#ffe890') : hex('#2a3a5a')); }
  const cy = 95 - ((t * 5) % 10); R.pset(190, Math.round(cy), hex('#ff3a3a')); R.pset(190, Math.round(cy) - 1, hex('#ff3a3a'));
  R.recorte(null);
};
const p1 = (t) => {
  const o = { encuadre: 'loft', noche: true };
  T.nuevayork(R, t, o); teleCiudad(t);
  const da = a(0.072), ins = a(0.211), llega = sua(tramo(t, 1.4, 2.6)), pasa = sua(tramo(t, da - 0.1, da + 0.4));
  const sx = Math.round(lerp(236, 170, llega));
  R.actor(EL.programadorNorth, 8, 152, t, { dir: 1, habla: t > da && t < da + 1 && Math.sin(t * 9) > 0, sonrisa: t > da });
  const d = R.actor(EL.danHouser, 138, 156, t, { dir: 1, sostiene: pasa > 0.5, sonrisa: t > da + 0.2, habla: t > ins + 0.2 && Math.sin(t * 8) > 0.2 });
  const s = R.actor(EL.samHouser, sx, 156, t, { dir: -1, anda: llega > 0 && llega < 1, sostiene: pasa < 0.5, dedo: t >= ins, sonrisa: true, habla: t > da + 0.5 && t < ins && Math.sin(t * 7) > 0 });
  // la caja pasa de la mano de Sam a la de Dan; luego Dan la deja sobre la mesa
  { const [x0, y0] = s.mano, [x1, y1] = d.mano, u = pasa; cajita(lerp(x0, x1, u), lerp(y0, y1, u) - Math.sin(u * Math.PI) * 4 + 5, hex('#e0a030')); }
  T.nuevayorkDelante(R, t, o);
};

// ── 2 · Nueva York de noche, con respeto ────────────────────────────────
// los edificios: alto de cada columna (TOP) para que el cielo, las nubes, las estrellas y las luces no los pisen
const TOP = new Array(320).fill(118), VENT = [];
const edif = (x0, x1, top, c, cl, ven, k) => {
  for (let x = x0; x <= x1; x++) TOP[x] = Math.min(TOP[x], top);
  R.rect(x0, top, x1, 118, c); R.rect(x0, top, x0, 118, cl);
  if (ven) for (let y = top + 3; y < 114; y += 4) for (let x = x0 + 2; x < x1 - 1; x += 3) { const n = hh(x, y, k); if (n < 0.42) { R.pset(x, y, n < 0.12 ? hex('#ffe8a0') : n < 0.3 ? hex('#e0b860') : hex('#a8c0e0')); if (n < 0.3) VENT.push([x, y]); } }
};
const skyline = () => capa('sky', () => {
  grad(0, 0, 319, 118, [hex('#05081a'), hex('#080c22'), hex('#0c122c'), hex('#121a3a'), hex('#1a2048'), hex('#2a2a56'), hex('#463a66')]);
  // la ciudad lejana, en la bruma
  for (let x = 0, k = 0; x < 320; k++) { const w = 5 + Math.floor(hh(k, 1) * 9), hg = 8 + Math.floor(hh(k, 2) * 18); edif(x, Math.min(319, x + w), 112 - hg, hex('#262a52'), hex('#30366a'), false, k); x += w + 1; }
  // la de delante, con ventanas
  for (let x = 0, k = 0; x < 320; k++) { const w = 7 + Math.floor(hh(k, 3) * 12), hg = 12 + Math.floor(hh(k, 4) * 26) + (x > 90 && x < 240 ? 10 : 0); edif(x, Math.min(319, x + w), 116 - hg, hex('#141830'), hex('#20264a'), true, k + 9); x += w + 2; }
  // la torre de los escalones (art déco, genérica) con su mástil, y la de la corona
  edif(108, 130, 58, hex('#121630'), hex('#262c52'), true, 41); edif(112, 126, 46, hex('#121630'), hex('#262c52'), true, 42); edif(115, 123, 36, hex('#141832'), hex('#2a3058'), true, 43);
  R.rect(118, 22, 120, 36, hex('#2a3058')); for (let y = 22; y < 36; y++) TOP[118] = TOP[119] = TOP[120] = 22;
  edif(156, 170, 62, hex('#121630'), hex('#262c52'), true, 44);
  R.poligono([[156, 62], [163, 44], [170, 62]], hex('#3a4068')); for (let k = 0; k < 4; k++) R.linea(158 + k * 1.5, 62 - k * 4, 168 - k * 1.5, 62 - k * 4, hex('#a8b0d0'));
  for (let x = 156; x <= 170; x++) TOP[x] = Math.min(TOP[x], 44 + Math.abs(x - 163) * 2.5); R.linea(163, 36, 163, 44, hex('#8a90b0')); TOP[163] = 36;
  // el sur de la isla: edificios medianos (sin las torres)
  edif(192, 206, 74, hex('#121630'), hex('#262c52'), true, 45); edif(210, 222, 80, hex('#121630'), hex('#262c52'), true, 46); edif(226, 238, 70, hex('#141832'), hex('#262c52'), true, 47);
  // los tejados de cerca: edificios bajos con depósitos de agua sobre patas y ventanas encendidas
  for (let x = 0, k = 0; x < 320; k++) { const w = 18 + Math.floor(hh(k, 21) * 24), top = 116 + Math.floor(hh(k, 22) * 16);
    R.rect(x, top, x + w, 152, hex('#0c0e22')); R.rect(x, top, x + w, top, hex('#2a2e52'));
    for (let y = top + 4; y < 150; y += 5) for (let xx = x + 3; xx < x + w - 2; xx += 4) { const n = hh(xx, y, k + 30); if (n < 0.35) { R.rect(xx, y, xx + 1, y + 1, n < 0.1 ? hex('#ffe8a0') : hex('#c89a50')); VENT.push([xx, y]); } }
    if (hh(k, 23) < 0.45 && x + w < 190 || (x > 240 && hh(k, 23) < 0.6)) { const tx = x + 4; R.rect(tx, top - 14, tx + 10, top - 5, hex('#1c1c30')); R.poligono([[tx - 1, top - 14], [tx + 5, top - 19], [tx + 11, top - 14]], hex('#1c1c30')); for (let q = 0; q < 3; q++) R.linea(tx + 1 + q * 4, top - 5, tx + q * 4, top, hex('#1c1c30')); for (let xx = tx; xx <= tx + 11; xx++) TOP[xx] = Math.min(TOP[xx], top - 19); }
    x += w + 1; }
  // la azotea de delante: pretil de ladrillo con su albardilla, tela asfáltica con grava, chimenea, máquina del aire y la caseta de la escalera
  ladrillo(0, 150, 319, 160, hex('#4a2a2e'), hex('#341c20'), hex('#2a2030'), 17); R.rect(0, 148, 319, 150, hex('#6a6a7a')); R.rect(0, 147, 319, 147, K); R.rect(0, 151, 319, 151, hex('#2a2030'));
  for (let y = 161; y < 180; y++) for (let x = 0; x < 320; x++) { const n = hh(x, y, 18); R.pset(x, y, n < 0.12 ? hex('#1e1e2a') : n > 0.9 ? hex('#4a4a5a') : hex('#2e2e3c')); }
  R.rect(0, 160, 319, 160, K);
  for (let y = 164; y < 180; y += 7) R.linea(0, y, 319, y + 1, hex('#262632'));
  R.rect(12, 120, 30, 168, K); ladrillo(13, 121, 29, 168, hex('#5a3a34'), hex('#3a2420'), hex('#2a2030'), 19); R.rect(10, 116, 32, 120, hex('#4a4a5a')); R.rect(10, 116, 32, 116, K);
  R.rect(50, 152, 92, 174, K); R.rect(51, 153, 91, 173, hex('#5a5e6a')); R.rect(51, 153, 91, 154, hex('#7a7e8a')); for (let y = 156; y < 172; y += 2) R.linea(54, y, 68, y, hex('#3a3e4a')); R.disco(80, 163, 8, K); R.disco(80, 163, 7, hex('#3a3e4a'));
  R.rect(262, 112, 319, 170, K); ladrillo(263, 113, 319, 170, hex('#4a2a2e'), hex('#341c20'), hex('#2a2030'), 20); R.rect(260, 108, 319, 112, hex('#4a4a5a')); R.rect(260, 107, 319, 107, K);
  R.rect(276, 128, 298, 170, K); R.rect(277, 129, 297, 170, hex('#3a4a5a')); R.rect(279, 131, 295, 148, hex('#2e3c4a')); R.rect(279, 151, 295, 168, hex('#2e3c4a')); R.pset(293, 150, hex('#c8a040'));
  R.rect(284, 118, 290, 122, K); R.rect(285, 119, 289, 121, hex('#ffe8a0'));
  // macetas y una silla plegable
  for (const [x, c] of [[110, '#4a8a4a'], [204, '#5a9a4a'], [226, '#4a7a3a']]) { R.rect(x, 166, x + 10, 174, hex('#8a4a2a')); R.rect(x - 1, 165, x + 11, 166, hex('#a85a3a')); for (let q = 0; q < 5; q++) R.linea(x + 1 + q * 2, 165, x + q * 2 + (q % 2 ? 2 : -1), 156 + (q % 3) * 2, hex(c)); }
  R.linea(236, 160, 250, 176, hex('#8a8c94')); R.linea(250, 160, 236, 176, hex('#8a8c94')); R.rect(236, 160, 250, 162, hex('#a8acb8'));
});
const p2 = (t) => {
  skyline();
  const sep = a(0.35), haz = sua(tramo(t, sep + 0.25, sep + 1.6)), apaga = tramo(t, sep, sep + 0.8);
  const cielo = (x, y) => y < TOP[Math.max(0, Math.min(319, x))];
  // estrellas que titilan, solo en el cielo
  for (let k = 0; k < 70; k++) { const x = Math.floor(hh(k, 11) * 320), y = 16 + Math.floor(hh(k, 12) * 90); if (!cielo(x, y) || (x > 270 && y < 50) || (x < 172 && y < 16)) continue; const v = Math.sin(t * (1.5 + hh(k, 13) * 3) + k); if (v > -0.4) R.pset(x, y, v > 0.7 ? hex('#ffffff') : hex('#8a90c0')); }
  // nubes oscuras en tres capas, con la panza teñida por la ciudad (no pasan por la esquina de Atom)
  const NC = [hex('#20285a'), hex('#2c366c'), hex('#3e4a84')];
  for (let k = 0; k < 7; k++) { const v = [1.2, 2.2, 3.5][k % 3], w = 30 + (k % 3) * 14, x = ((k * 71 + t * v) % 420) - 50, y = 30 + (k % 3) * 14 + (k % 2) * 6; if (x + w / 2 > 262 && y < 56) continue; nube(x, y, w, NC, cielo); }
  // las dos columnas de luz del homenaje (desde el sur de la isla), que se apagan hacia arriba
  if (haz > 0) for (const bx of [205, 219]) for (let y = 0; y < 118; y++) {
    const alto = 118 - y, tope = 118 * haz; if (alto > tope) continue;
    const f = (1 - alto / 160) * 0.8 * Math.min(1, (tope - alto) / 18 + 0.3);
    for (let dx = -4; dx <= 4; dx++) { const x = bx + dx; if (!cielo(x, y)) continue; luz(x, y, hex('#e0ecff'), f * [1, 1, 0.85, 0.55, 0.25][Math.abs(dx)]); }
  }
  // las ventanas: unas parpadean; en «September 11th» la ciudad baja la luz
  for (let i = 0; i < VENT.length; i += 3) { const [x, y] = VENT[i]; if (hh(i, Math.floor(t * 0.7)) < 0.05 || hh(i, 5) < apaga * 0.35) R.pset(x, y, hex('#1c2240')); }
  if (Math.sin(t * 3) > 0) { R.pset(119, 21, hex('#ff3a3a')); R.pset(163, 35, hex('#ff3a3a')); }
  // la chimenea echa humo, el ventilador del aire gira y la luz de la caseta tiene su halo
  for (let k = 0; k < 5; k++) { const s = (t * 0.35 + k / 5) % 1, x = Math.round(21 + Math.sin(s * 5 + k) * 3 + s * 10), y = Math.round(114 - s * 40); if (s < 0.9) { R.disco(x, y, 1 + Math.round(s * 3), hex('#3a3e5a')); R.pset(x - 1, y - 1, hex('#4a4e6a')); } }
  for (let k = 0; k < 3; k++) { const an = t * 9 + k * 2.09; R.linea(80, 163, Math.round(80 + Math.cos(an) * 6), Math.round(163 + Math.sin(an) * 6), hex('#8a8e9a')); }
  R.halo(287, 120, 18, [hex('#2a2a3a'), hex('#5a5048'), hex('#a8906a')], 0.7);
  // la pareja en el pretil: charlan, miran y, en «September 11th», encienden una vela
  R.actor(EL.comprador1GT, 128, 174, t, { dir: 1, habla: t < sep && Math.sin(t * 7) > 0.1, triste: t > sep + 0.4 });
  const c2 = R.actor(EL.comprador2GT, 150, 174, t, { dir: 1, sostiene: t > sep + 0.5, triste: t > sep + 0.4, sonrisa: t < sep });
  if (t > sep + 0.5) { const [mx, my] = c2.mano; R.rect(mx - 1, my - 6, mx + 1, my, BL); R.pset(mx, my - 7, K); const fl = Math.sin(t * 13) > 0 ? 0 : 1; R.pset(mx, my - 8 - fl, hex('#ffd040')); R.pset(mx, my - 9, hex('#ff8a2a')); R.halo(mx, my - 8, 7, [hex('#3a3040'), hex('#8a6a40')], 0.6); }
};

// ── 3 · el calendario y el corcho ───────────────────────────────────────
// octubre de 2001 empieza en lunes: el día d va en la columna d % 7 y la fila d / 7
const CX = 40, CY = 64, CW = 17, CH = 18, celda = (d) => [CX + (d % 7) * CW + 8, CY + Math.floor(d / 7) * CH + 9];
const FICHAS = [[190, 62, 'coche'], [226, 60, 'puente'], [262, 64, 'estrella'], [192, 102, 'telefono'], [228, 104, 'radio']];
const ficha = (x, y, tipo, c = hex('#f6f0dc')) => {
  caja(x, y, x + 28, y + 22, c); R.rect(x + 1, y + 1, x + 27, y + 3, hex('#c8d8f0'));
  for (let k = 0; k < 2; k++) R.rect(x + 3, y + 17 + k * 2, x + 12 + k * 6, y + 17 + k * 2, hex('#a8a090'));
  const cx = x + 14, cy = y + 10;
  if (tipo === 'coche') { R.rect(cx - 6, cy - 1, cx + 6, cy + 2, hex('#3a6ad8')); R.rect(cx - 3, cy - 4, cx + 3, cy - 1, hex('#3a6ad8')); R.rect(cx - 2, cy - 3, cx + 2, cy - 2, hex('#c8e6ee')); R.disco(cx - 4, cy + 3, 1, K); R.disco(cx + 4, cy + 3, 1, K); }
  if (tipo === 'puente') { R.rect(cx - 8, cy + 2, cx + 8, cy + 3, hex('#c8303a')); R.rect(cx - 5, cy - 5, cx - 4, cy + 3, hex('#c8303a')); R.rect(cx + 4, cy - 5, cx + 5, cy + 3, hex('#c8303a')); R.linea(cx - 8, cy, cx - 5, cy - 5, K); R.linea(cx - 4, cy - 5, cx + 4, cy - 5, K); R.linea(cx + 5, cy - 5, cx + 8, cy, K); }
  if (tipo === 'estrella') R.poligono([[cx, cy - 6], [cx + 2, cy - 1], [cx + 6, cy - 1], [cx + 3, cy + 2], [cx + 4, cy + 6], [cx, cy + 3], [cx - 4, cy + 6], [cx - 3, cy + 2], [cx - 6, cy - 1], [cx - 2, cy - 1]], hex('#f0c040'));
  if (tipo === 'telefono') { R.rect(cx - 5, cy - 4, cx + 5, cy - 2, K); R.rect(cx - 3, cy - 1, cx + 3, cy + 4, hex('#c8303a')); R.disco(cx, cy + 1, 1, BL); }
  if (tipo === 'radio') { R.rect(cx - 6, cy - 3, cx + 6, cy + 4, hex('#8a5a3a')); R.disco(cx - 3, cy + 1, 2, K); R.rect(cx + 1, cy - 1, cx + 5, cy, hex('#f0c040')); nota(cx + 6, cy - 9, hex('#3a6ad8')); }
  if (tipo === 'mision') { R.rect(cx - 6, cy - 5, cx + 6, cy + 4, hex('#d8d0c0')); R.icono('?', cx - 2, cy - 4, hex('#5a5468'), hex('#b8b0a0'), 1); }
};
const pared3 = () => capa('pared3', () => {
  ladrillo(0, 0, 319, 158, hex('#a8543a'), hex('#7a3a28'), hex('#c8b8a0'), 3);
  // la parte de arriba, en sombra (la esquina de Atom queda tranquila)
  for (let y = 0; y < 50; y++) for (let x = 0; x < 320; x++) if ((1 - y / 50) * 0.75 > ((x * 7 + y * 13) % 16) / 16 * 0.6 + 0.15) R.pset(x, y, mez(R.pget(x, y), hex('#2a1418'), 0.55));
  // el tubo con abrazaderas
  R.rect(0, 20, 266, 23, K); R.rect(0, 21, 266, 21, hex('#8a8c90')); R.rect(0, 22, 266, 22, hex('#5e6064')); R.rect(263, 0, 266, 23, K); R.rect(264, 0, 264, 21, hex('#8a8c90')); R.rect(265, 0, 265, 22, hex('#5e6064'));
  for (let x = 30; x < 260; x += 70) { R.rect(x, 18, x + 3, 25, K); R.rect(x + 1, 19, x + 2, 24, hex('#a8a8b0')); }
  // el calendario de pared: anillas, la foto de arriba (la ciudad de noche, sin letras), la cabecera con el 10 y el 2001
  R.rect(33, 31, 167, 158, hex('#3a2418')); caja(34, 30, 166, 156, hex('#f8f4ea'));
  R.rect(35, 31, 165, 46, hex('#1a2448')); for (let k = 0; k < 14; k++) { const x = 37 + k * 9, hgt = 4 + Math.floor(hh(k, 2) * 9); R.rect(x, 46 - hgt, x + 7, 46, hex('#2a3260')); if (k % 2) R.pset(x + 3, 46 - hgt + 2, hex('#ffe8a0')); }
  R.disco(150, 36, 3, hex('#f6f0c0'));
  R.rect(35, 47, 165, 60, hex('#c8303a')); R.rect(35, 60, 165, 61, hex('#8a1e26'));
  R.numero('10', 46, 58, { color: BL }); R.numero('2001', 120, 58, { fina: true, color: hex('#ffd8d8') });
  for (let k = 0; k < 8; k++) { R.rect(42 + k * 16, 27, 44 + k * 16, 33, K); R.pset(43 + k * 16, 28, hex('#c8ccd8')); }
  for (let c = 0; c <= 7; c++) R.linea(CX + c * CW, CY, CX + c * CW, CY + 5 * CH, hex('#c8c0b0'));
  for (let f = 0; f <= 5; f++) R.linea(CX, CY + f * CH, CX + 7 * CW, CY + f * CH, hex('#c8c0b0'));
  for (let c = 0; c < 7; c++) R.rect(CX + c * CW + 1, CY + 1, CX + c * CW + CW - 1, CY + 2, c === 0 ? hex('#f0b0a8') : hex('#e8e0d0'));
  for (let d = 1; d <= 31; d++) { const [x, y] = celda(d); R.numero(String(d), x - (d < 10 ? 2 : 4), y - 1, { fina: true, color: d % 7 === 0 ? hex('#c8303a') : hex('#3a3446'), sombra: false }); }
  calma(268, 0, 319, 48, hex('#2a1418'), hex('#4a2420'));
  // el corcho con su marco
  caja(178, 50, 306, 148, hex('#c8925a'), hex('#5a3a1a')); R.rect(179, 51, 305, 52, hex('#8a5a2a'));
  for (let y = 53; y < 147; y++) for (let x = 179; x < 306; x++) { const n = hh(x, y, 21); if (n < 0.18) R.pset(x, y, hex('#a8703a')); else if (n > 0.9) R.pset(x, y, hex('#e0b07a')); }
  for (const [x, y, tp] of FICHAS) { R.rect(x + 2, y + 2, x + 30, y + 24, hex('#8a5a2a')); ficha(x, y, tp); R.disco(x + 14, y + 1, 2, hex(['#c8303a', '#3a6ad8', '#3a9a3a'][x % 3])); }
  // la mesa de delante, con vetas, taza, lápices, disquetes y el rotulador
  madera(0, 159, 319, 179, hex('#8a5a32'), hex('#6a4224'), hex('#a8743e'), 2); R.rect(0, 158, 319, 159, hex('#c08a50')); R.rect(0, 157, 319, 157, K);
  for (let k = 0; k < 3; k++) { caja(196 + k * 12, 162 - k, 206 + k * 12, 172 - k, [hex('#3a3a46'), hex('#2a4a8a'), hex('#5a2a3a')][k]); R.rect(198 + k * 12, 163 - k, 204 + k * 12, 166 - k, hex('#c8ccd8')); }
  caja(270, 150, 292, 172, hex('#f2ecd8')); R.rect(292, 156, 297, 160, K); R.rect(293, 157, 296, 159, hex('#f2ecd8')); R.rect(272, 152, 290, 154, hex('#5a3a1a'));
  caja(132, 148, 144, 170, hex('#3a6ad8')); for (let k = 0; k < 4; k++) { R.rect(134 + k * 3, 140 - k * 2, 135 + k * 3, 148, [hex('#f0c040'), hex('#c8303a'), hex('#4a9a3a'), hex('#24202c')][k]); }
  R.rect(150, 166, 176, 168, K); R.rect(151, 167, 170, 167, hex('#c8303a')); R.rect(171, 167, 175, 167, hex('#24202c'));
});
const p3 = (t) => {
  pared3();
  const x2 = a(0.51), salta = [a(0.545), a(0.575), a(0.6)], quita = a(0.6), tira = a(0.66);
  // el ventilador de la mesa: las aspas giran y mueven los papelitos del corcho
  const vx = 22, vy = 160; R.rect(vx - 2, vy - 2, vx + 2, vy + 18, K); R.rect(vx - 1, vy, vx + 1, vy + 17, hex('#8a8c90')); R.rect(vx - 8, vy + 17, vx + 8, vy + 19, K); R.rect(vx - 7, vy + 18, vx + 7, vy + 18, hex('#5e6064'));
  R.disco(vx, vy - 12, 12, K); R.disco(vx, vy - 12, 11, hex('#3a3c44'));
  for (let k = 0; k < 3; k++) { const an = t * 14 + k * 2.09; R.poligono([[vx, vy - 12], [vx + Math.cos(an) * 10, vy - 12 + Math.sin(an) * 10], [vx + Math.cos(an + 0.6) * 9, vy - 12 + Math.sin(an + 0.6) * 9]], hex('#a8b0c0')); }
  R.anillo(vx, vy - 12, 11, hex('#8a8c90')); R.disco(vx, vy - 12, 2, hex('#c8303a'));
  for (const [x, y, c] of [[296, 56, hex('#f0e060')], [182, 128, hex('#a8e0f0')], [292, 132, hex('#f0a0c8')]]) { const w = Math.round(Math.sin(t * 9 + x) * 1.5); R.rect(x, y, x + 8, y + 7, c); R.linea(x, y + 8, x + 8 + w, y + 8 + Math.abs(w), mez(c, K, 0.4)); R.pset(x + 4, y, K); }
  // la taza humea
  for (let k = 0; k < 3; k++) { const s = (t * 0.7 + k / 3) % 1, x = 281 + Math.round(Math.sin(s * 7 + k) * 2), y = 148 - s * 22; if (s < 0.8) { R.pset(x, Math.round(y), hex('#e8e4dc')); R.pset(x + 1, Math.round(y) - 1, hex('#c8c4bc')); } }
  // el 2 rodeado y, en «delayed», tachado; la flecha salta semana a semana hasta el 22
  const [ax, ay] = celda(2); R.anillo(ax, ay, 7, hex('#c8303a')); R.anillo(ax, ay, 6, hex('#c8303a'));
  const tx = tramo(t, x2 - 0.2, x2 + 0.2); if (tx > 0) { R.linea(ax - 5, ay - 5, ax - 5 + 10 * Math.min(1, tx * 2), ay - 5 + 10 * Math.min(1, tx * 2), K); if (tx > 0.5) R.linea(ax + 5, ay - 5, ax + 5 - 10 * (tx - 0.5) * 2, ay - 5 + 10 * (tx - 0.5) * 2, K); }
  const paradas = [2, 9, 16, 22];
  for (let k = 0; k < 3; k++) { const u = tramo(t, salta[k] - 0.45, salta[k]); if (u <= 0) continue; const [x0, y0] = celda(paradas[k]), [x1, y1] = celda(paradas[k + 1]);
    let px = x0, py = y0; for (let s = 1; s <= 16 * u; s++) { const v = s / 16, x = lerp(x0, x1, v) + 7, y = lerp(y0, y1, v) - Math.sin(v * Math.PI) * 9; R.linea(px + (s === 1 ? 7 : 0), py, x, y, hex('#c8303a')); R.linea(px + (s === 1 ? 7 : 0), py + 1, x, y + 1, hex('#c8303a')); px = x; py = y; }
    if (u >= 1) R.poligono([[x1 + 7, y1 + 1], [x1 + 3, y1 - 4], [x1 + 10, y1 - 3]], hex('#c8303a')); }
  if (t > salta[2]) { const [x, y] = celda(22), g = 1 + Math.max(0, 1 - (t - salta[2]) * 3) * 2; R.anillo(x, y, 7 + g, hex('#c8303a')); R.anillo(x, y, 6 + g, hex('#c8303a')); }
  // la ficha de la misión que se quita: la mano la coge en «removed» y se la lleva por la derecha
  const fx0 = 264, fy0 = 104, coge = tramo(t, quita - 0.5, quita), lleva = sua(tramo(t, quita + 0.15, tira + 0.6));
  if (lleva <= 0) { R.rect(fx0 + 2, fy0 + 2, fx0 + 30, fy0 + 24, hex('#8a5a2a')); ficha(fx0, fy0, 'mision'); R.disco(fx0 + 14, fy0 + 1, 2, hex('#f0c040')); }
  else { R.rect(fx0 + 2, fy0 + 2, fx0 + 26, fy0 + 20, hex('#d8a46a')); R.disco(fx0 + 14, fy0 + 1, 2, hex('#f0c040')); }
  const wx = lerp(lerp(330, 300, coge), 350, lleva), wy = lerp(lerp(140, 116, coge), 160, lleva);
  if (coge > 0 && lleva < 1) {
    if (lleva > 0) { const fx = Math.round(wx - 34), fy = Math.round(wy - 10); ficha(fx, fy, 'mision'); }
    T.brazo(R, wx + 46, wy + 34, wx, wy, '#3a4a6a', -1, { codo: [wx + 26, wy + 26], sombra: false });
  }
  if (t > tira && t < tira + 1.6) R.icono('X', 272, 110, hex('#c8303a'), hex('#5a1a1a'), 2);
};

// ── 4 · la portada se borra y se rehace ───────────────────────────────────
const SCR = [102, 34, 218, 120], LIENZO = [128, 40, 210, 116];
const mesa4 = () => capa('mesa4', () => {
  ladrillo(0, 0, 319, 140, hex('#9a4e36'), hex('#6e3424'), hex('#b8a890'), 7);
  for (let y = 0; y < 60; y++) for (let x = 0; x < 320; x++) if ((1 - y / 60) * 0.8 > ((x * 5 + y * 11) % 16) / 16 * 0.6 + 0.12) R.pset(x, y, mez(R.pget(x, y), hex('#24120e'), 0.6));
  calma(264, 0, 319, 50, hex('#24120e'), hex('#4a2418'));
  // un boceto clavado (un coche y una ciudad a lápiz) y una regla
  caja(14, 62, 64, 104, hex('#f2ecd8')); R.disco(39, 63, 2, hex('#3a6ad8')); for (let k = 0; k < 6; k++) R.rect(18 + k * 7, 96 - k * 3 - (k % 2) * 6, 23 + k * 7, 98, hex('#a8a090')); R.rect(22, 80, 38, 84, hex('#8a8478')); R.disco(25, 86, 2, hex('#5a5468')); R.disco(35, 86, 2, hex('#5a5468'));
  R.rect(246, 58, 300, 61, hex('#e0c890')); for (let x = 248; x < 300; x += 4) R.pset(x, 59, K);
  // la balda con discos y una figurita
  R.rect(240, 96, 310, 99, hex('#6a4224')); R.rect(240, 100, 310, 100, K); for (let k = 0; k < 9; k++) R.rect(244 + k * 5, 78, 247 + k * 5, 95, [hex('#3a6ad8'), hex('#c8303a'), hex('#f0c040'), hex('#4a9a3a'), hex('#24202c')][k % 5]);
  // el monitor grande de 2001: carcasa beis, sombra, pie
  R.rect(84, 22, 236, 140, K); R.rect(85, 23, 235, 139, hex('#d8ccb0')); R.rect(85, 23, 235, 25, hex('#ece4cc')); R.rect(232, 26, 235, 139, hex('#a89c80')); R.rect(85, 134, 235, 139, hex('#b8ac90'));
  R.rect(SCR[0] - 2, SCR[1] - 2, SCR[2] + 2, SCR[3] + 2, hex('#6a6252')); R.rect(SCR[0] - 1, SCR[1] - 1, SCR[2] + 1, SCR[3] + 1, K);
  R.disco(222, 130, 2, hex('#3a9a3a')); for (let k = 0; k < 5; k++) R.rect(96 + k * 6, 129, 99 + k * 6, 131, hex('#a89c80'));
  R.rect(140, 140, 180, 150, hex('#a89c80')); R.rect(130, 150, 190, 154, hex('#c8bca0')); R.rect(130, 154, 190, 154, K);
  // notitas pegadas al borde
  R.rect(88, 40, 97, 49, hex('#f0e060')); R.rect(88, 52, 97, 61, hex('#a8e0f0')); R.linea(89, 44, 95, 44, hex('#a89040'));
  // la mesa con vetas: teclado, cuaderno, lápiz y taza
  madera(0, 150, 319, 179, hex('#8a5a32'), hex('#6a4224'), hex('#a8743e'), 5); R.rect(0, 149, 319, 149, hex('#c08a50')); R.rect(0, 148, 319, 148, K);
  caja(56, 158, 150, 172, hex('#e8e0c8')); for (let f = 0; f < 3; f++) for (let k = 0; k < 13; k++) { R.rect(59 + k * 7, 160 + f * 4, 63 + k * 7, 162 + f * 4, hex('#c8bca0')); R.pset(59 + k * 7, 160 + f * 4, BL); }
  caja(10, 160, 46, 176, hex('#f6f2e6')); for (let k = 0; k < 4; k++) R.linea(14, 164 + k * 3, 42, 164 + k * 3, hex('#a8c8e8')); R.rect(8, 159, 9, 176, hex('#c8303a'));
  caja(200, 154, 216, 172, hex('#3a6ad8')); R.rect(216, 158, 220, 162, K); R.rect(202, 156, 214, 158, hex('#24202c'));
});
const p4 = (t) => {
  mesa4();
  const cam = a(0.758), det = a(0.80), redo = a(0.862), borra = tramo(t, redo + 0.25, redo + 0.85), pinta = tramo(t, redo + 0.95, a(0.99));
  const [s0, s1, s2, s3] = SCR, [l0, l1, l2, l3] = LIENZO;
  R.recorte(SCR);
  // el programa de dibujo (sin letras): fondo gris, la barra de herramientas con iconos y el lienzo
  rr(s0, s1, s2, s3, hex('#8a8c94')); rr(s0, s1, s2, s1 + 4, hex('#3a4a8a'));
  for (let k = 0; k < 7; k++) { const y = s1 + 9 + k * 10; rr(s0 + 3, y, s0 + 14, y + 8, k === 2 && t > redo ? hex('#f0c040') : hex('#c8ccd8')); R.pset(s0 + 8, y + 4, K); R.linea(s0 + 6, y + 2 + (k % 3), s0 + 11, y + 6 - (k % 3), K); }
  const viejo = (x, y) => { if (Math.hypot(x - l2 + 18, y - l1 - 14) < 6) return hex('#f6f0c0'); if (y < l1 + 40) return R.tone([hex('#0e1430'), hex('#1a2448'), hex('#2a3a6a'), hex('#4a5a8a')], (y - l1) / 40 * 3.2, x, y);
    const n = hh(Math.floor(x / 7), 3, 5), top = l1 + 30 + Math.floor(n * 22); return y > top ? ((x + y) % 4 === 0 && y < l3 - 14 && n > 0.4 ? hex('#ffe890') : hex('#14101c')) : R.tone([hex('#0e1430'), hex('#1a2448'), hex('#2a3a6a'), hex('#4a5a8a')], Math.min(3, (y - l1) / 40 * 3.2), x, y); };
  const nuevo = (x, y) => { if (y < l1 + 34) return R.tone([hex('#4a8ae8'), hex('#7ab4f0'), hex('#a8d4f8')], (y - l1) / 34 * 2.4, x, y);
    const n = hh(Math.floor((x - l0) / 9), 4, 6), top = l1 + 34 + Math.floor(n * 16); if (y > l3 - 14) return (x + y) % 3 ? hex('#5a5a66') : hex('#4a4a56');
    return y > top ? [hex('#e86a7a'), hex('#f0c040'), hex('#4a9a3a'), hex('#3a6ad8'), hex('#f2ecd8')][Math.floor(n * 5)] : hex('#a8d4f8'); };
  const linea = l1 + (l3 - l1) * pinta;
  for (let y = l1; y <= l3; y++) for (let x = l0; x <= l2; x++) {
    let c;
    if (pinta > 0 && y <= linea) c = nuevo(x, y);
    else if (borra > 0 && (hh(x, y, 9) < borra * 1.2 || pinta > 0)) c = ((x >> 2) + (y >> 2)) % 2 ? hex('#f2f2f2') : hex('#c8c8d0');
    else c = viejo(x, y);
    R.pset(x, y, c);
  }
  if (pinta > 0.75) { R.disco(l2 - 16, l1 + 12, 6, hex('#ffe890')); R.disco(l2 - 16, l1 + 12, 4, hex('#fff8d0')); nube(l0 + 24 + (t % 6), l1 + 16, 22, [hex('#c8dcf0'), hex('#e8f0f8'), hex('#ffffff')]); const cx = l0 + 30; PZ.cocheJuguete(R, cx, l3 - 6, { color: '#e8403a' }); }
  else if (borra < 0.6) { R.rect(l0 + 30, l3 - 12, l0 + 50, l3 - 8, hex('#3a3a46')); R.pset(l0 + 51, l3 - 10, hex('#ffe890')); R.pset(l0 + 52, l3 - 10, hex('#ffe890')); }
  // en «changed a few details»: la selección (hormigas que andan) sobre dos detalles; luego sobre toda la portada
  const hormigas = (x0, y0, x1, y1) => { const f = Math.floor(t * 8); for (let x = x0; x <= x1; x++) { if ((x + f) % 4 < 2) { R.pset(x, y0, K); R.pset(x, y1, K); } else { R.pset(x, y0, BL); R.pset(x, y1, BL); } } for (let y = y0; y <= y1; y++) { if ((y + f) % 4 < 2) { R.pset(x0, y, K); R.pset(x1, y, K); } else { R.pset(x0, y, BL); R.pset(x1, y, BL); } } };
  if (t > cam && t < det) hormigas(l0 + 4, l1 + 30, l0 + 30, l1 + 60);
  if (t > det && t < redo) hormigas(l0 + 46, l1 + 26, l2 - 6, l1 + 58);
  if (t > redo && t < redo + 0.3 || (borra > 0 && pinta === 0)) hormigas(l0 - 1, l1 - 1, l2 + 1, l3 + 1);
  // el cursor (una flecha) sigue a la mano
  const cu = [l0 + 16 + Math.sin(t * 1.3) * 10 + (t > det ? 40 : 0) - (t > redo ? 50 : 0), l1 + 44 + Math.cos(t * 1.7) * 8 - (t > redo ? 20 : 0)];
  const [cx, cy] = cu.map(Math.round); R.poligono([[cx, cy], [cx, cy + 9], [cx + 3, cy + 6], [cx + 6, cy + 6]], K); R.poligono([[cx + 1, cy + 2], [cx + 1, cy + 7], [cx + 3, cy + 5], [cx + 4, cy + 5]], BL);
  R.recorte(null);
  // el brillo del cristal y las líneas del tubo
  for (let y = s1; y <= s3; y += 3) for (let x = s0; x <= s2; x += 2) luz(x, y, K, 0.08);
  R.linea(s0 + 4, s1 + 8, s0 + 14, s1 + 2, hex('#ffffff')); R.halo(160, 78, 80, [hex('#3a3a4a'), hex('#4a4a5a')], 0.06);
  // la mano en el ratón (abajo a la derecha), que se mueve con el cursor y hace clic
  const mx = Math.round(262 + (cu[0] - 160) * 0.12), my = Math.round(164 + (cu[1] - 80) * 0.1), clic = (t > redo + 0.2 && t < redo + 0.3) ? 1 : 0;
  R.rect(mx - 12, my - 3, mx + 2, my + 6, K); R.rect(mx - 11, my - 2, mx + 1, my + 5, hex('#e8e0c8')); R.linea(mx - 5, my - 2, mx - 5, my + 1, hex('#a89c80'));
  R.linea(mx - 5, my - 3, mx - 30, my - 14, K);
  T.brazo(R, 340, 196, mx + 4, my - 2 + clic, '#5a6a8a', -1, { codo: [318, 184] });
  // la taza humea
  for (let k = 0; k < 3; k++) { const s = (t * 0.6 + k / 3) % 1, x = 208 + Math.round(Math.sin(s * 7 + k) * 2), y = 152 - s * 20; if (s < 0.8) R.pset(x, Math.round(y), hex('#e8e4dc')); }
};

// ── 5 · la tienda, 2001: sale el juego ───────────────────────────────────
const p5 = (t) => {
  const o = { encuadre: 'tienda', año: 2001 };
  T.nuevayork(R, t, o);
  const ve = sua(tramo(t, P5 + 0.15, P5 + 1.5)), da = b(0.12), fen = b(0.138), sal = tramo(t, fen, fen + 0.6);
  R.actor(EL.chica, 72, 168, t, { dir: 1, habla: Math.sin(t * 6) > 0.3, sonrisa: t > fen });
  R.actor(EL.chico, 92, 168, t, { dir: 1, sorpresa: t > fen && t < fen + 1, sonrisa: t > fen + 1 });
  const dep = R.actor(EL.dependienteGT, 200, 160, t, { dir: -1, sostiene: t < da, sonrisa: true, habla: t > P5 + 1 && t < da && Math.sin(t * 8) > 0 });
  const cx = Math.round(lerp(104, 146, ve));
  const comp = R.actor(EL.comprador1GT, cx, 168, t, { dir: 1, anda: ve > 0 && ve < 1, sostiene: t >= da, sonrisa: t > da, salto: Math.round(Math.sin(sal * Math.PI) * 5) });
  if (t < da) cajita(dep.mano[0] - 2, dep.mano[1] + 5); else cajita(comp.mano[0] + 1, comp.mano[1] + 5);
  T.nuevayorkDelante(R, t, o);
  if (t > fen && t < fen + 1.2) R.icono('!', cx + 6, 128 - Math.round(Math.sin(sal * Math.PI) * 5), hex('#ffe890'), K, 2);
};

// ── 6 · el paseo marítimo de los ochenta (2002) ────────────────────────────
const ochenta = () => capa('ochenta', () => {
  grad(0, 0, 319, 94, [hex('#1e1446'), hex('#3a1a5a'), hex('#6a2a7a'), hex('#a83a8a'), hex('#e85a7a'), hex('#f88a6a'), hex('#ffb060')]);
  // el sol a rayas sobre el mar
  for (let y = 56; y <= 94; y++) for (let x = 200; x <= 264; x++) { const d = Math.hypot(x - 232, y - 88); if (d > 30) continue; const g = (y - 56) / 38; if (y > 74 && (y - 74) % 5 < 1 + (y - 74) / 8) continue; R.pset(x, y, R.tone([hex('#fff060'), hex('#ffc040'), hex('#ff8a4a'), hex('#ff5a7a')], g * 3.2, x, y)); }
  // el mar con la estela del sol
  grad(140, 95, 319, 122, [hex('#5a2a6a'), hex('#3a2a6a'), hex('#2a2a5a'), hex('#1e2a4a')]);
  for (let k = 0; k < 90; k++) { const x = 140 + Math.floor(hh(k, 31) * 178), y = 97 + Math.floor(hh(k, 32) * 24); R.linea(x, y, x + 3, y, hex('#7a4a8a')); }
  R.rect(140, 94, 319, 94, hex('#ffd0a0'));
  // la playa: arena, sombrillas de rayas y la torre del socorrista
  grad(140, 118, 319, 128, [hex('#f0c890'), hex('#e0b07a')]); for (let k = 0; k < 60; k++) R.pset(140 + Math.floor(hh(k, 33) * 178), 119 + Math.floor(hh(k, 34) * 9), hex('#c8905a'));
  for (const [x, c] of [[170, '#ff5ab0'], [214, '#4af0f0'], [300, '#f0c040']]) { R.linea(x, 112, x, 124, K); R.poligono([[x - 8, 113], [x, 106], [x + 8, 113]], hex(c)); R.linea(x - 4, 111, x, 106, BL); R.linea(x + 4, 111, x, 106, BL); }
  R.rect(252, 100, 270, 104, hex('#4af0f0')); R.rect(251, 99, 271, 99, K); for (const x of [254, 268]) R.linea(x, 105, x - 2, 125, hex('#e8e0d0')); R.linea(255, 112, 267, 112, hex('#e8e0d0'));
  // los dos hoteles art déco: rosa y menta, con cornisas, ojos de buey y la aleta del rótulo
  const hotel = (x0, y0, x1, base, cl, cs) => {
    R.rect(x0, y0, x1, 128, K); R.rect(x0 + 1, y0 + 1, x1 - 1, 128, hex(base)); R.rect(x0 + 1, y0 + 1, x0 + 3, 128, hex(cl)); R.rect(x1 - 3, y0 + 1, x1 - 1, 128, hex(cs));
    for (let y = y0 + 10; y < 120; y += 14) { R.rect(x0 - 2, y, x1 + 2, y + 1, hex(cl)); R.rect(x0 - 2, y + 2, x1 + 2, y + 2, hex(cs));
      for (let x = x0 + 6; x < x1 - 8; x += 11) { R.rect(x, y + 4, x + 7, y + 10, K); R.rect(x + 1, y + 5, x + 6, y + 9, hex('#3a4a7a')); R.pset(x + 2, y + 6, hex('#a8d8f0')); R.rect(x, y + 11, x + 7, y + 11, hex(cs)); } }
    R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 4, hex(cl)); R.rect((x0 + x1) / 2 - 4, y0 - 10, (x0 + x1) / 2 + 4, y0, K); R.rect((x0 + x1) / 2 - 3, y0 - 9, (x0 + x1) / 2 + 3, y0, hex(cl));
    R.rect((x0 + x1) / 2 - 8, 116, (x0 + x1) / 2 + 8, 128, K); R.rect((x0 + x1) / 2 - 7, 117, (x0 + x1) / 2 + 7, 128, hex('#ffd890'));
  };
  hotel(6, 38, 72, '#f8a8c8', '#ffd0e0', '#c87898'); hotel(80, 50, 140, '#a8f0d8', '#d8fff0', '#6ab8a0');
  // el paseo, la calzada con la raya amarilla y el pretil de delante
  R.rect(0, 128, 319, 139, hex('#f0d8c0')); for (let x = 0; x < 320; x += 8) R.linea(x, 128, x - 4, 139, hex('#d8b8a0')); R.rect(0, 139, 319, 140, hex('#a88878'));
  grad(0, 141, 319, 166, [hex('#4a3a5a'), hex('#3a3048'), hex('#2e2a3c')]); for (let x = 4; x < 320; x += 24) R.rect(x, 153, x + 12, 154, hex('#f0c040'));
  for (let k = 0; k < 40; k++) R.pset(Math.floor(hh(k, 35) * 320), 142 + Math.floor(hh(k, 36) * 24), hex('#5a4a6a'));
  for (let k = 0; k < 7; k++) R.rect(156 + k * 5, 142, 158 + k * 5, 165, hex('#e8e0f0'));
  R.disco(110, 158, 4, K); R.disco(110, 158, 3, hex('#3a3048')); R.linea(108, 158, 112, 158, hex('#5a4a6a'));
  // en la acera de delante: la boca de riego, una papelera de rayas y el radiocasete sobre el pretil
  R.rect(16, 168, 22, 178, K); R.rect(17, 169, 21, 178, hex('#f0c040')); R.rect(15, 171, 23, 172, hex('#c8a020'));
  R.rect(286, 166, 298, 179, K); for (let y = 167; y < 179; y++) R.rect(287, y, 297, y, (y >> 1) % 2 ? hex('#4af0f0') : hex('#f8f8f8'));
  R.rect(232, 169, 262, 179, K); R.rect(233, 170, 261, 179, hex('#c8ccd8')); R.rect(236, 166, 238, 169, K); R.rect(256, 166, 258, 169, K); R.rect(236, 166, 258, 166, K); R.rect(245, 171, 249, 173, hex('#5a5a66'));
  R.rect(0, 167, 319, 179, hex('#e8c8b0')); for (let x = 0; x < 320; x += 10) R.linea(x, 167, x, 179, hex('#c8a890')); R.rect(0, 167, 319, 168, hex('#ffe0c8')); R.rect(0, 166, 319, 166, K);
});
const p6 = (t) => {
  ochenta();
  const vice = b(0.261), mus = b(0.466), neon = (k) => t > vice + k * 0.25 && !(Math.sin(t * 23 + k * 5) > 0.97);
  // nubes de tres tonos a tres velocidades y pájaros
  for (let k = 0; k < 6; k++) { const v = [2, 4, 7][k % 3], w = 26 + (k % 3) * 12, x = ((k * 67 + t * v) % 400) - 40, y = 22 + (k % 3) * 11 + (k % 2) * 4; if (x > 250 && y < 50) continue; nube(x, y, w, [hex('#c8507a'), hex('#f08a8a'), hex('#ffc8a0')]); }
  for (let k = 0; k < 4; k++) { const x = Math.round((k * 83 + t * (9 + k)) % 340) - 10, y = 54 + k * 6 + Math.round(Math.sin(t * 2 + k) * 2), al = Math.sin(t * 8 + k) > 0 ? -1 : 0; if (x > 270 && y < 48) continue; R.pset(x, y, K); R.pset(x - 1, y + al, K); R.pset(x + 1, y + al, K); R.pset(x - 2, y + al + 1, K); R.pset(x + 2, y + al + 1, K); }
  // la estela del sol en el agua y un velero que se mece
  for (let y = 96; y < 118; y += 2) { const w = 4 + (y - 96) * 0.6, x = 232 + Math.round(Math.sin(t * 3 + y) * 2); R.linea(Math.round(x - w), y, Math.round(x + w), y, (y >> 1) % 2 ? hex('#ffb060') : hex('#ff8a6a')); }
  const vx = Math.round(170 + (t - P6) * 3), vb = Math.round(Math.sin(t * 2) * 1); R.poligono([[vx - 6, 108 + vb], [vx + 6, 108 + vb], [vx + 4, 111 + vb], [vx - 4, 111 + vb]], K); R.linea(vx, 96 + vb, vx, 108 + vb, K); R.poligono([[vx + 1, 97 + vb], [vx + 1, 107 + vb], [vx + 7, 107 + vb]], hex('#ffe0c8'));
  // los neones: los contornos rosa y cian se encienden en «Vice City» y parpadean
  const tubo = (x0, y0, x1, y1, c, k) => { if (!neon(k)) return; R.linea(x0, y0, x1, y1, c); luz(x0, y0 - 1, c, 0.4); R.halo((x0 + x1) / 2, (y0 + y1) / 2, 6, [mez(c, K, 0.5), c], 0.25); };
  tubo(7, 37, 71, 37, hex('#ff5ab0'), 0); tubo(81, 49, 139, 49, hex('#4af0f0'), 1); tubo(7, 37, 7, 127, hex('#ff5ab0'), 2); tubo(139, 49, 139, 127, hex('#4af0f0'), 3);
  // los rótulos de pictogramas (palmera, sol, estrella), sin letras
  const rot = (x, y, k, dib) => { R.rect(x - 4, y + 2, x - 1, y + 3, K); R.rect(x - 4, y + 9, x - 1, y + 10, K); R.rect(x - 1, y - 1, x + 15, y + 13, K); R.rect(x, y, x + 14, y + 12, hex('#3a2a4a')); R.rect(x, y, x + 14, y, hex('#f8d0e0')); R.rect(x, y + 12, x + 14, y + 12, hex('#8a6a8a')); if (neon(k + 2)) dib(x + 7, y + 6); else { R.pset(x + 7, y + 6, hex('#5a4a6a')); } };
  rot(73, 60, 2, (x, y) => { R.linea(x, y + 5, x, y - 1, hex('#ff5ab0')); R.linea(x, y - 1, x - 5, y + 1, hex('#4af0f0')); R.linea(x, y - 1, x + 5, y + 1, hex('#4af0f0')); R.linea(x, y - 1, x - 3, y - 4, hex('#4af0f0')); R.linea(x, y - 1, x + 3, y - 4, hex('#4af0f0')); });
  rot(141, 70, 3, (x, y) => { R.anillo(x, y, 4, hex('#ffd040')); for (let k = 0; k < 8; k++) R.pset(Math.round(x + Math.cos(k * 0.785) * 6), Math.round(y + Math.sin(k * 0.785) * 6), hex('#ff5ab0')); });
  rot(73, 96, 4, (x, y) => R.poligono([[x, y - 5], [x + 2, y - 1], [x + 5, y - 1], [x + 2, y + 2], [x + 3, y + 5], [x, y + 3], [x - 3, y + 5], [x - 2, y + 2], [x - 5, y - 1], [x - 2, y - 1]], hex('#4af0f0')));
  // las palmeras a contraluz, que se mecen con la brisa
  const cH = [hex('#1a2a3a'), hex('#2a4a4a'), hex('#4a7a5a')];
  palmera(152, 132, 50, t, 1, hex('#5a3a4a'), hex('#3a2434'), cH); palmera(196, 134, 40, t, 2, hex('#5a3a4a'), hex('#3a2434'), cH); palmera(284, 132, 44, t, 3, hex('#5a3a4a'), hex('#3a2434'), cH);
  // la patinadora que pasa por el paseo y el chico que baila con la música
  const px = Math.round(300 - (t - P6) * 28); R.actor(EL.chica, px, 138, t, { dir: -1, anda: true, sonrisa: true });
  for (const dx of [3, 10]) { R.rect(px + dx, 139, px + dx + 2, 139, hex('#ff5ab0')); R.pset(px + dx, 140, K); R.pset(px + dx + 2, 140, K); }
  R.actor(EL.chico, 112, 138, t, { dir: -1, sonrisa: t > mus, salto: t > mus ? Math.round(Math.abs(Math.sin(t * 6)) * 3) : 0, brazos: t > mus && Math.sin(t * 3) > 0 });
  // los coches: un descapotable rosa con la radio (notas en «music») y uno cian en el otro sentido
  const ax = Math.round(-30 + (t - P6 - 1.2) * 44); PZ.cocheJuguete(R, ax, 164, { color: '#ff5ab0' });
  if (t > mus) for (let k = 0; k < 3; k++) { const s = (t * 0.9 + k / 3) % 1; nota(ax - 4 + s * 10 + k * 3, 148 - s * 16, [hex('#4af0f0'), hex('#ffe060'), hex('#ffffff')][k]); }
  const bx = Math.round(360 - (t - P6) * 30); PZ.cocheJuguete(R, bx, 152, { color: '#4af0f0', dir: -1 });
  // los reflejos de los neones en la calzada y los altavoces del radiocasete, que laten con la música
  if (neon(0)) for (let y = 143; y < 165; y += 3) R.linea(10 + (y % 2) * 4, y, 60, y, mez(hex('#ff5ab0'), hex('#3a3048'), 0.6));
  if (neon(1)) for (let y = 143; y < 165; y += 3) R.linea(86, y, 132 - (y % 2) * 4, y, mez(hex('#4af0f0'), hex('#3a3048'), 0.6));
  R.rect(231, 166, 263, 179, K); R.rect(232, 169, 262, 179, hex('#c8ccd8')); R.rect(232, 169, 262, 169, BL); R.rect(237, 167, 257, 168, hex('#5a5a66')); R.rect(244, 171, 250, 173, hex('#3a3a46')); R.pset(246, 172, hex('#ff5ab0'));
  const lat = t > mus ? (Math.sin(t * 12) > 0 ? 1 : 0) : 0; for (const x of [239, 255]) { R.disco(x, 175, 3 + lat, K); R.disco(x, 175, 2, hex('#3a3a46')); R.pset(x, 175, hex('#8a8c94')); }
  if (t > mus) for (let k = 0; k < 2; k++) { const s = (t * 0.8 + k / 2) % 1; nota(244 + Math.sin(s * 6 + k) * 6, 162 - s * 22, [hex('#ff5ab0'), hex('#4af0f0')][k]); }
};

// ── 7 · la pared de teles de una tienda (2004): tres ciudades ──────────────────
const TVS = [[22, 52, 102, 112], [120, 48, 200, 112], [218, 52, 298, 112]];
const pared7 = () => capa('pared7', () => {
  // pared de panel perforado con ganchos, cables y mandos colgados
  R.rect(0, 0, 319, 140, hex('#d8dce6')); for (let y = 4; y < 140; y += 6) for (let x = 3 + ((y / 6) % 2) * 3; x < 320; x += 6) R.pset(x, y, hex('#a8acb8'));
  for (let y = 0; y < 30; y++) for (let x = 0; x < 320; x++) if ((1 - y / 30) * 0.6 > ((x * 3 + y * 7) % 8) / 8 * 0.5 + 0.1) R.pset(x, y, mez(R.pget(x, y), hex('#5a6070'), 0.35));
  calma(268, 0, 319, 29, hex('#a8acb8'), hex('#c8ccd8'));
  // la franja de arriba con bombillitas (se encienden en la escena)
  R.rect(0, 30, 319, 38, hex('#2a3a7a')); R.rect(0, 38, 319, 39, K); R.rect(0, 29, 319, 29, hex('#5a6aa8'));
  // la estantería de las teles y las baldas de abajo con cajas y consolas
  R.rect(8, 112, 312, 120, hex('#3a3c44')); R.rect(8, 112, 312, 113, hex('#6a6c78')); R.rect(8, 120, 312, 121, K);
  for (const [x0, y0, x1, y1] of TVS) { R.rect(x0 - 4, y0 - 4, x1 + 4, y1, K); R.rect(x0 - 3, y0 - 3, x1 + 3, y1 - 1, hex('#2a2a32')); R.rect(x0 - 3, y0 - 3, x1 + 3, y0 - 2, hex('#4a4a56')); R.disco(x1 - 2, y1 - 3, 1, hex('#c8303a')); for (let k = 0; k < 4; k++) R.rect(x0 + k * 4, y1 - 3, x0 + k * 4 + 2, y1 - 3, hex('#5a5a66')); }
  R.rect(8, 140, 312, 144, hex('#3a3c44')); R.rect(8, 140, 312, 141, hex('#6a6c78'));
  for (let k = 0; k < 24; k++) cajita(18 + k * 12, 139, [hex('#e0a030'), hex('#3a6ad8'), hex('#c8303a'), hex('#4a9a3a'), hex('#8a4ac8')][k % 5]);
  for (const x of [60, 160, 260]) { R.rect(x - 8, 124, x + 8, 128, hex('#24242c')); R.rect(x - 9, 128, x - 4, 130, hex('#24242c')); R.rect(x + 4, 128, x + 9, 130, hex('#24242c')); R.pset(x + 5, 126, hex('#3a9a3a')); }
  // el suelo de baldosas con el reflejo de la luz
  for (let y = 145; y < 180; y++) for (let x = 0; x < 320; x++) { const tile = ((x >> 4) + ((y - 145) >> 3)) % 2; R.pset(x, y, tile ? hex('#c8ccd8') : hex('#b0b4c4')); }
  for (let y = 146; y < 180; y += 3) R.linea(110, y, 210, y, hex('#dce0ec'));
});
const ciudadTV = (k, x0, y0, x1, y1, t) => {
  R.recorte([x0, y0, x1, y1]); const w = x1 - x0, hz = y0 + Math.round((y1 - y0) * 0.55);
  if (k === 0) {   // la bahía: niebla, puente rojo, agua y un coche que lo cruza
    grad(x0, y0, x1, hz, [hex('#7ab4e8'), hex('#a8d0f0'), hex('#d8e8f0')]);
    for (let x = x0; x <= x1; x++) { const hg = Math.round(6 + Math.sin(x * 0.12) * 4 + hh(x >> 2, 1) * 4); R.linea(x, hz - hg, x, hz, hex('#7a9a8a')); }
    rr(x0, hz, x1, y1, hex('#3a6aa8')); for (let j = 0; j < 8; j++) { const xx = x0 + ((j * 13 + Math.round(t * 6)) % w); R.linea(xx, hz + 4 + j * 2, xx + 3, hz + 4 + j * 2, hex('#7aa8d8')); }
    const by = hz - 2; rr(x0, by, x1, by + 1, hex('#c8403a')); for (const tx of [x0 + 20, x1 - 20]) rr(tx - 1, y0 + 8, tx + 1, hz + 6, hex('#c8403a'));
    for (let x = x0; x <= x1; x++) { const u = (x - (x0 + 20)) / (w - 40), yy = Math.round(y0 + 8 + (u > 0 && u < 1 ? Math.sin(u * Math.PI) * 18 : u <= 0 ? (-u) * 30 : (u - 1) * 30)); R.pset(x, Math.min(by, yy), hex('#a83a34')); }
    const cx = x0 + ((Math.round(t * 18)) % (w + 10)) - 5; rr(cx, by - 3, cx + 5, by - 1, hex('#f0c040'));
    for (let j = 0; j < 3; j++) { const nx = x0 + ((j * 31 + Math.round(t * 3)) % (w + 20)) - 10; rr(nx, hz - 10 + j * 3, nx + 18, hz - 8 + j * 3, hex('#e8eef4')); }
  } else if (k === 1) {   // el desierto al anochecer: mesetas y la ciudad de luces que parpadean
    grad(x0, y0, x1, hz + 4, [hex('#2a1a4a'), hex('#6a2a6a'), hex('#c8506a'), hex('#f8a060')]);
    R.poligono([[x0, hz], [x0 + 10, hz - 12], [x0 + 26, hz - 12], [x0 + 32, hz]], hex('#7a3a3a')); R.poligono([[x1 - 30, hz], [x1 - 24, hz - 8], [x1 - 6, hz - 8], [x1, hz]], hex('#6a3434'));
    rr(x0, hz, x1, y1, hex('#c8804a')); for (let j = 0; j < 30; j++) R.pset(x0 + Math.floor(hh(j, 41) * w), hz + 1 + Math.floor(hh(j, 42) * (y1 - hz)), hex('#a8603a'));
    for (let j = 0; j < 7; j++) { const bx = x0 + 22 + j * 6, hg = 8 + Math.floor(hh(j, 43) * 20); rr(bx, hz - hg, bx + 4, hz, hex('#2a1a3a')); for (let yy = hz - hg + 2; yy < hz; yy += 3) R.pset(bx + 1 + (yy % 2) * 2, yy, Math.sin(t * 6 + j + yy) > 0 ? [hex('#ff5ab0'), hex('#ffe060'), hex('#4af0f0')][j % 3] : hex('#5a3a5a')); }
    for (let j = 0; j < 5; j++) { const yy = hz + 3 + j * 3, xx = x0 + ((Math.round(t * 14) + j * 17) % w); R.pset(xx, yy, hex('#ffffd0')); R.pset(xx + 1, yy, hex('#ffffd0')); }
  } else {   // las colinas verdes: bosque, granja, molino y la carretera con un coche
    grad(x0, y0, x1, hz, [hex('#5aa8e8'), hex('#8ac8f0'), hex('#c8e8f8')]);
    for (let x = x0; x <= x1; x++) { const h1 = Math.round(10 + Math.sin(x * 0.08) * 6), h2 = Math.round(4 + Math.sin(x * 0.15 + 1) * 3); R.linea(x, hz - h1, x, y1, hex('#4a9a4a')); R.linea(x, hz - h2 + 6, x, y1, hex('#5ab85a')); if (hh(x, 3) < 0.3) R.pset(x, hz - h1, hex('#2e6a2e')); }
    for (let j = 0; j < 9; j++) { const tx = x0 + 4 + j * 9, ty = hz - 4 + (j % 3); R.disco(tx, ty, 3, hex('#2e6a2e')); R.pset(tx - 1, ty - 2, hex('#5ab85a')); }
    rr(x1 - 26, hz + 2, x1 - 14, hz + 10, hex('#c8303a')); R.poligono([[x1 - 27, hz + 2], [x1 - 20, hz - 3], [x1 - 13, hz + 2]], hex('#8a1e26'));
    const mx = x0 + 52, my = hz - 2; rr(mx, my, mx + 1, my + 12, hex('#e8e8e8')); for (let j = 0; j < 3; j++) { const an = t * 3 + j * 2.09; R.linea(mx, my, Math.round(mx + Math.cos(an) * 7), Math.round(my + Math.sin(an) * 7), hex('#ffffff')); }
    for (let x = x0; x <= x1; x++) { const yy = Math.round(y1 - 6 - Math.sin((x - x0) * 0.09) * 4); R.pset(x, yy, hex('#5a5a66')); R.pset(x, yy + 1, hex('#5a5a66')); }
    const cx = x0 + ((Math.round(t * 16)) % (w + 10)) - 5, cy = Math.round(y1 - 6 - Math.sin((cx - x0) * 0.09) * 4); rr(cx, cy - 3, cx + 5, cy - 1, hex('#3a6ad8'));
    for (let j = 0; j < 2; j++) { const nx = x0 + ((j * 41 + Math.round(t * 4)) % (w + 20)) - 10; nube(nx, y0 + 10 + j * 6, 16, [hex('#d8e8f0'), hex('#eef4f8'), hex('#ffffff')]); }
  }
  R.recorte(null);
};
const p7 = (t) => {
  pared7();
  const on = [b(0.56), b(0.635), b(0.72)];
  // las bombillitas de la franja corren
  for (let x = 6; x < 270; x += 10) { const v = Math.floor(t * 6 + x / 10) % 3 === 0; R.disco(x, 34, 1, v ? hex('#ffe060') : hex('#8a7a3a')); }
  TVS.forEach(([x0, y0, x1, y1], k) => {
    const u = tramo(t, on[k], on[k] + 0.35);
    if (u <= 0) { R.rect(x0, y0, x1, y1, hex('#1e2026')); R.linea(x0 + 4, y0 + 6, x0 + 14, y0 + 2, hex('#3a3c46')); return; }
    const hy = Math.round((y1 - y0) / 2 * u), cy = Math.round((y0 + y1) / 2);
    R.rect(x0, y0, x1, y1, hex('#1e2026'));
    if (u < 1) { R.rect(x0, cy - hy, x1, cy + hy, hex('#e8f0ff')); return; }
    ciudadTV(k, x0, y0, x1, y1, t);
    for (let y = y0; y <= y1; y += 2) for (let x = x0; x <= x1; x += 3) luz(x, y, K, 0.1);
    R.linea(x0 + 3, y0 + 7, x0 + 12, y0 + 2, hex('#ffffff'));
    // la pegatina con su número (1, 2 y 3)
    const sx = Math.round((x0 + x1) / 2), sy = y1 + 4, g = Math.min(1, (t - on[k] - 0.3) * 4);
    if (g > 0) { R.disco(sx, sy + 4, 5 + Math.round((1 - g) * 2), K); R.disco(sx, sy + 4, 4 + Math.round((1 - g) * 2), hex('#f0c040')); R.numero(String(k + 1), sx - 2, sy + 8, { fina: true, color: K, sombra: false }); }
  });
  // dos chicos miran: uno señala cada tele al encenderse, la otra se sorprende; pasa un dependiente con un carro
  const k = on.filter((x) => t > x).length;
  // el dependiente pasa por detrás con su carro (antes que los chicos)
  // el dependiente repone la balda de abajo a la derecha, con su carro
  R.rect(296, 156, 316, 168, K); R.rect(297, 157, 315, 167, hex('#8a8c94')); for (let j = 0; j < 3; j++) cajita(301 + j * 6, 164, [hex('#e0a030'), hex('#3a6ad8'), hex('#c8303a')][j]); R.disco(299, 171, 2, K); R.disco(313, 171, 2, K);
  const dep = R.actor(EL.dependienteGT, 272, 172, t, { dir: -1, sostiene: k < 3, sorpresa: k === 3, habla: k < 3 && Math.sin(t * 6) > 0.4 }); if (k < 3) cajita(dep.mano[0] - 2, dep.mano[1] + 5, hex('#3a6ad8'));
  const an = sua(tramo(t, on[0] + 0.4, on[1] + 0.2)) * 0.5 + sua(tramo(t, on[1] + 0.4, on[2] + 0.1)) * 0.5, nx = Math.round(lerp(44, 236, an)), mueve = (t > on[0] + 0.4 && t < on[1] + 0.2) || (t > on[1] + 0.4 && t < on[2] + 0.1);
  R.actor(EL.chicaHoy, 92, 172, t, { dir: 1, sorpresa: k === 3, sonrisa: k > 0 && k < 3, habla: k > 0 && Math.sin(t * 7) > 0.3 });
  R.actor(EL.nino85, nx, 172, t, { dir: 1, dedo: k > 0 && !mueve, sonrisa: k > 1, anda: mueve });
};

// ── 8 · la fachada de noche: una forma nueva de jugar ──────────────────────
const VENTS = [];
const fachada = () => capa('fachada', () => {
  grad(0, 0, 319, 60, [hex('#060a1e'), hex('#0c1230'), hex('#16204a'), hex('#22305a')]);
  // el edificio de ladrillo (izquierda, con la escalera de incendios) y el de piedra (derecha, con el depósito de agua)
  ladrillo(0, 34, 178, 150, hex('#6a3428'), hex('#4a2018'), hex('#3a2a28'), 11); R.rect(0, 30, 178, 34, hex('#3a2a28')); R.rect(0, 29, 178, 29, K);
  for (let y = 50; y <= 140; y++) for (let x = 182; x <= 319; x++) R.pset(x, y, (y - 50) % 9 === 0 || (x + ((y - 50) / 9 | 0) * 9) % 22 === 0 ? hex('#5a5048') : hh(x, y, 13) < 0.08 ? hex('#7a7068') : hex('#8a8076'));
  R.rect(182, 46, 319, 50, hex('#5a5048')); R.rect(182, 45, 319, 45, K); R.rect(178, 30, 182, 150, K);
  R.rect(226, 22, 252, 44, K); R.rect(227, 23, 251, 44, hex('#6a4a2a')); for (let x = 229; x < 251; x += 4) R.linea(x, 23, x, 44, hex('#4a3018')); R.poligono([[224, 23], [239, 12], [254, 23]], hex('#3a2a1a')); for (const x of [229, 248]) R.linea(x, 44, x, 46, K);
  for (let f = 0; f < 4; f++) for (let c = 0; c < 6; c++) { const x = 10 + c * 28, y = 42 + f * 26; VENTS.push([x, y, x + 16, y + 16]); }
  for (let f = 0; f < 3; f++) for (let c = 0; c < 5; c++) { const x = 192 + c * 26, y = 58 + f * 28; VENTS.push([x, y, x + 15, y + 17]); }
  for (const [x0, y0, x1, y1] of VENTS) { marco(x0, y0, x1, y1, hex('#c8b8a0'), hex('#6a5a48')); R.rect(x0, y0, x1, y1, hex('#141828')); R.rect(x0 - 2, y1 + 3, x1 + 2, y1 + 4, hex('#a89a88')); }
  // la escalera de incendios en zigzag
  for (let f = 0; f < 4; f++) { const y = 61 + f * 26; R.rect(64, y, 104, y + 1, K); for (let x = 64; x <= 104; x += 3) R.linea(x, y - 6, x, y, hex('#2a2224')); R.linea(64, y - 6, 104, y - 6, hex('#2a2224')); if (f < 3) R.linea(f % 2 ? 66 : 102, y, f % 2 ? 102 : 66, y + 26, hex('#2a2224')); }
  // la acera, el bordillo y la calzada
  R.rect(0, 150, 319, 160, hex('#5a5a66')); for (let x = 0; x < 320; x += 16) R.linea(x, 150, x - 3, 160, hex('#4a4a56')); R.rect(0, 160, 319, 161, hex('#8a8a96'));
  grad(0, 162, 319, 179, [hex('#2e2e38'), hex('#24242c')]); for (let x = 6; x < 320; x += 28) R.rect(x, 171, x + 14, 171, hex('#c8b860'));
  R.rect(136, 136, 160, 150, K); R.rect(137, 137, 159, 150, hex('#3a2a20')); R.rect(134, 146, 162, 150, hex('#6a6a76'));
  R.rect(296, 112, 298, 152, K); R.rect(290, 106, 304, 112, K); R.rect(291, 107, 303, 111, hex('#ffe8a0'));
  R.rect(20, 142, 26, 152, hex('#c8303a')); R.rect(19, 141, 27, 142, K); R.rect(18, 146, 28, 147, hex('#8a1e26'));
});
const p8 = (t) => {
  fachada();
  const nw = b(0.944), juega = b(0.862);
  for (let k = 0; k < 50; k++) { const x = Math.floor(hh(k, 51) * 320), y = 2 + Math.floor(hh(k, 52) * 40); if ((x < 178 && y > 28) || (x >= 178 && y > 44) || (x > 272 && y < 48) || (x < 172 && y < 16)) continue; if (Math.sin(t * 2 + k) > -0.3) R.pset(x, y, Math.sin(t * 3 + k) > 0.6 ? BL : hex('#8a90c0')); }
  for (let k = 0; k < 3; k++) { const x = ((k * 97 + t * (2 + k)) % 380) - 40, y = 10 + k * 7; if (x > 240) continue; nube(x, y, 30, [hex('#141c3a'), hex('#1c264a'), hex('#283460')]); }
  // las ventanas: se encienden una a una (azul de tele) y, en «new way to play», todas
  VENTS.forEach(([x0, y0, x1, y1], i) => {
    const on = t > P8 + 0.2 + hh(i, 61) * (nw - P8 - 0.4) || t > nw;
    const cal = hh(i, 62) < 0.25;
    if (!on && !cal) return;
    const fl = 0.6 + 0.4 * Math.sin(t * (7 + i % 5) + i), cb = on ? mez(hex('#2a4aa8'), hex('#8ab8ff'), fl) : hex('#c89a4a');
    R.rect(x0, y0, x1, y1, cb); R.rect(x0, y0, x0 + 2, y1, on ? hex('#4a3a6a') : hex('#8a3a2a')); R.rect(x1 - 2, y0, x1, y1, on ? hex('#4a3a6a') : hex('#8a3a2a'));
    if (on) { // alguien juega: cabeza, hombros y el mando; uno salta
      const sx = Math.round((x0 + x1) / 2) - 1, sal = hh(i, 63) < 0.2 && t > juega ? Math.round(Math.abs(Math.sin(t * 7 + i)) * 2) : 0, sy = y1 - sal;
      R.disco(sx, sy - 7, 3, K); R.rect(sx - 4, sy - 4, sx + 4, sy, K); R.rect(sx - 2 + (i % 2), sy - 3, sx + 1 + (i % 2), sy - 2, hex('#5a5a66'));
      R.halo((x0 + x1) / 2, (y0 + y1) / 2, 14, [hex('#141c3a'), hex('#2a3a7a')], 0.25 * fl);
    }
  });
  // la farola, un gato en el portal y un coche que pasa con los faros
  R.halo(297, 112, 20, [hex('#2a2a3a'), hex('#5a5048'), hex('#a8906a')], 0.7);
  const gx = 140, gy = 135, col = Math.round(Math.sin(t * 3) * 2); R.rect(gx, gy - 4, gx + 6, gy, K); R.rect(gx + 5, gy - 7, gx + 8, gy - 3, K); R.pset(gx + 5, gy - 8, K); R.pset(gx + 8, gy - 8, K); R.pset(gx + 7, gy - 5, hex('#f0e060')); R.linea(gx, gy - 2, gx - 4, gy - 6 + col, K);
  const cx = Math.round(-40 + (t - P8) * 70); PZ.cocheJuguete(R, cx, 176, { color: '#e8a030' }); R.halo(cx + 20, 170, 9, [hex('#3a3a40'), hex('#a8a080'), hex('#fff0c0')], 0.6);
};

const efectos = [
  [a(0.08), 'papel'],
  [a(0.35), 'campana'],
  [a(0.51), 'lapiz'], [a(0.575), 'lapiz'], [a(0.62), 'papel'],
  [a(0.87), 'golpecito'], [a(0.93), 'brillo'],
  [b(0.12), 'bip'],
  [b(0.27), 'zumbido'], [b(0.42), 'coche'],
  [b(0.56), 'interruptor'], [b(0.72), 'interruptor'],
  [P8 + 0.6, 'coche'],
];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8]], { cartela: '2001', efectos, año: (t) => (t < P6 ? 2001 : t < P7 ? 2002 : 2004) });
''')

E['gt-escondido'] = ('Escondido', '''// GT-ESCONDIDO (frases 23–24), 2005. Siete planos:
// 1. LOCAL un cuarto de 2005 de noche (pared verde, persiana): dos aficionados ante el monitor; uno con la lupa; en «discovered», el candado
//    aparece entre las cifras de la pantalla y los dos saltan («!»).
// 2. E hoy/espera/disco (corta en «Hidden»): la lupa pasa sobre el disco y, en «unfinished adults-only minigame», sale la
//    caja con candado y 18+; uno señala y el otro se sorprende.
// 3. LOCAL la caja de cerca (corta en «which»): una llave hecha de cifras sale del portátil y entra en el candado en
//    «modifying»; clic, la tapa se entreabre y en «all along» cae el polvo y la telaraña; sale un vapor.
// 4. LOCAL la mesa del organismo que califica (corta en «Hot»): la taza humea fuerte en «Hot Coffee»; una mano marca la
//    lista; en «adults only» el sello salta y tapa el 17 con la etiqueta negra del 18.
// 5. LOCAL el pasillo de una gran tienda (corta en «big stores»): el dependiente retira las cajas de la balda al carro y
//    se lo lleva.
// 6. C nuevayork/loft/despacho (corta en «Federal»): en «ordered» la abogada desliza la carpeta; en «everything» crece el
//    montón de hojas; firma.
// 7. LOCAL la caja de cerca en unas manos (corta en «say so»): en la caja aparece la etiqueta clara y brilla en «clearly».''', AYUDA + r'''
const a = (f) => en('escondido', f), b = (f) => en('coffee', f);
const P2 = a(0.3), P3 = a(0.695), P4 = b(0.03), P5 = b(0.363), P6 = b(0.575), P7 = b(0.855);

// ── 1 · los aficionados ante el monitor ─────────────────────────────────
const MON = [54, 100, 130, 146];
const cuarto = () => capa('cuarto', () => {
  // pared verde azulado con textura suave, la esquina de arriba en penumbra; friso de madera abajo
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const n = hh(x >> 1, y >> 1, 71); R.pset(x, y, n < 0.12 ? hex('#26504e') : n > 0.92 ? hex('#3a6a66') : hex('#2e5c5a')); }
  for (let y = 0; y < 50; y++) for (let x = 0; x < 320; x++) if ((1 - y / 50) * 0.8 > ((x * 5 + y * 3) % 8) / 8 * 0.6 + 0.1) R.pset(x, y, mez(R.pget(x, y), hex('#0e1e22'), 0.5));
  madera(0, 112, 319, 150, hex('#5a3a28'), hex('#442a1c'), hex('#6e4a34'), 12); R.rect(0, 110, 319, 111, hex('#7a5238')); R.rect(0, 109, 319, 109, K);
  for (let x = 0; x < 320; x += 32) { R.rect(x + 3, 116, x + 29, 146, hex('#4a3020')); R.rect(x + 4, 117, x + 28, 117, hex('#6e4a34')); }
  // la ventana con la persiana echada (la farola de la calle la ilumina a rayas)
  marco(196, 40, 262, 96, hex('#d8d0c0'), hex('#8a8478')); R.rect(196, 40, 262, 96, hex('#1a1a2a'));
  for (let y = 41; y < 96; y += 4) { R.rect(196, y, 262, y + 2, hex('#8a6a4a')); R.rect(196, y, 262, y, hex('#a8845a')); }
  R.linea(229, 40, 229, 96, hex('#5a4a3a'));
  // pósteres (un coche a contraluz y una nave), y la balda con cajas y figuritas
  caja(14, 30, 46, 70, hex('#2a1a3a')); R.disco(30, 46, 8, hex('#f08a4a')); R.rect(16, 54, 44, 68, hex('#14101c')); R.rect(21, 51, 39, 55, hex('#3a6ad8')); R.disco(24, 56, 2, K); R.disco(36, 56, 2, K);
  caja(140, 34, 170, 74, hex('#0e1430')); R.poligono([[155, 42], [162, 62], [148, 62]], hex('#c8ccd8')); R.rect(152, 62, 158, 66, hex('#ff8a2a')); for (let k = 0; k < 6; k++) R.pset(143 + k * 4, 38 + (k % 3) * 11, BL);
  R.rect(56, 64, 128, 67, hex('#6a4224')); R.rect(56, 68, 128, 68, K);
  for (let k = 0; k < 8; k++) { const x = 58 + k * 6; R.rect(x, 50, x + 4, 63, K); R.rect(x + 1, 51, x + 3, 63, [hex('#e0a030'), hex('#3a6ad8'), hex('#c8303a'), hex('#4a9a3a'), hex('#8a4ac8')][k % 5]); }
  R.rect(112, 56, 118, 63, hex('#f08a2a')); R.rect(113, 53, 117, 56, hex('#4a9a3a')); R.pset(114, 58, K); R.pset(116, 58, K);
  // el puf rojo y una pila de cómics
  R.disco(290, 160, 18, K); R.disco(290, 160, 17, hex('#c8303a')); R.disco(284, 154, 7, hex('#e04a4a')); R.rect(272, 170, 308, 179, hex('#14101c'));
  for (let k = 0; k < 5; k++) caja(246 + (k % 2), 168 - k * 3, 268 + (k % 2), 171 - k * 3, [hex('#f0c040'), hex('#3a6ad8'), hex('#c8303a'), hex('#f2ecd8'), hex('#4a9a3a')][k]);
  // la mesa a la izquierda: monitor grande, torre beis, teclado y latas
  madera(6, 152, 176, 158, hex('#6a4a32'), hex('#4a3222'), hex('#8a6242'), 8); R.rect(6, 151, 176, 151, hex('#a87a52')); R.rect(6, 150, 176, 150, K);
  R.rect(12, 158, 16, 178, K); R.rect(168, 158, 172, 178, K);
  R.rect(MON[0] - 10, MON[1] - 8, MON[2] + 10, MON[3] + 4, K); R.rect(MON[0] - 9, MON[1] - 7, MON[2] + 9, MON[3] + 3, hex('#d8ccb0')); R.rect(MON[2] + 6, MON[1] - 6, MON[2] + 9, MON[3] + 3, hex('#a89c80'));
  R.disco(MON[2] + 4, MON[3] + 1, 1, hex('#3a9a3a'));
  R.rect(16, 114, 38, 150, K); R.rect(17, 115, 37, 150, hex('#d8ccb0')); R.rect(20, 120, 34, 122, hex('#a89c80')); R.rect(20, 126, 34, 128, hex('#a89c80'));
  caja(64, 154, 124, 158, hex('#e8e0c8'));
  R.rect(142, 140, 148, 150, K); R.rect(143, 141, 147, 150, hex('#4a9a3a')); R.rect(143, 143, 147, 144, BL); R.rect(152, 142, 158, 150, K); R.rect(153, 143, 157, 150, hex('#c8303a'));
  // la alfombra
  for (let y = 159; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hh(x, y, 72) < 0.2 ? hex('#3a3a5a') : (x + y) % 16 < 2 ? hex('#5a5a7a') : hex('#4a4a6a'));
});
const p1 = (t) => {
  cuarto();
  const desc = a(0.245), fans = a(0.224);
  // la persiana: pasa la luz de un coche por las lamas y la torre parpadea
  const barre = ((t * 0.45) % 1.6) * 120 - 40; for (let y = 41; y < 96; y += 4) for (let x = Math.max(196, Math.round(barre + 196)); x < Math.min(263, Math.round(barre + 220)); x++) luz(x, y + 1, hex('#fff0c0'), 0.4);
  R.pset(34, 132, Math.sin(t * 9) > 0 ? hex('#3aff6a') : hex('#1a5a2a')); R.pset(34, 136, Math.sin(t * 5) > 0.5 ? hex('#ffb040') : hex('#5a3a1a'));
  // la lámpara de lava junto a la balda: las burbujas suben y bajan
  R.rect(176, 98, 184, 100, K); R.poligono([[176, 100], [184, 100], [186, 110], [174, 110]], hex('#3a1a4a')); R.rect(174, 110, 186, 113, K);
  for (let k = 0; k < 3; k++) { const y = Math.round(105 + Math.sin(t * 0.9 + k * 2) * 4); R.disco(180 + (k - 1), y, 1 + (k % 2), hex('#ff5ab0')); }
  R.halo(180, 106, 14, [hex('#2e5c5a'), hex('#6a4a8a')], 0.4);
  // la pantalla: filas de cifras que suben; en «discovered», el candado entre las cifras, con su marco que late
  const [m0, m1, m2, m3] = MON; R.recorte(MON); rr(m0, m1, m2, m3, hex('#08140c'));
  const off = Math.floor(t * 6);
  for (let f = 0; f < 6; f++) { const y = m1 + 7 + f * 8; let s = ''; for (let c = 0; c < 9; c++) s += Math.floor(hh(c, f + off, 76) * 10); R.numero(s, m0 + 4, y, { fina: true, color: hex('#3ac86a'), sombra: false }); }
  const ap = tramo(t, desc - 0.3, desc + 0.1);
  if (ap > 0) { const cx = Math.round((m0 + m2) / 2), cy = Math.round((m1 + m3) / 2); rr(cx - 14, cy - 12, cx + 14, cy + 12, hex('#08140c')); const lat = Math.sin(t * 10) > 0 ? hex('#ff3a3a') : hex('#8a1e26'); R.rect(cx - 14, cy - 12, cx + 14, cy - 12, lat); R.rect(cx - 14, cy + 12, cx + 14, cy + 12, lat); R.rect(cx - 14, cy - 12, cx - 14, cy + 12, lat); R.rect(cx + 14, cy - 12, cx + 14, cy + 12, lat); R.icono('candado', cx - 7, cy - 8, hex('#f0c040'), hex('#5a4a1a'), 2); }
  R.recorte(null);
  for (let y = m1; y <= m3; y += 2) for (let x = m0; x <= m2; x += 2) luz(x, y, K, 0.12);
  R.halo(92, 124, 36, [hex('#2a3a3a'), hex('#2a5a3a')], 0.18);
  // los dos aficionados (a la derecha de la mesa): uno con la lupa sobre la pantalla; el otro charla; en «discovered» saltan
  const sal = tramo(t, desc, desc + 0.5), s = Math.round(Math.sin(sal * Math.PI) * 4);
  const f1 = R.actor(EL.aficionado2005, 128, 176, t, { dir: -1, sostiene: true, sorpresa: t > desc, salto: s });
  const [lx, ly] = f1.mano, ox = Math.round(Math.sin(t * 1.4) * 3);
  const cxL = 112 + ox * 2, cyL = 139 + Math.round(Math.cos(t * 1.1) * 2);
  R.linea(lx, ly, cxL + 5, cyL + 6, K); R.linea(lx - 1, ly, cxL + 4, cyL + 6, hex('#8a5a2a')); R.linea(lx, ly - 1, cxL + 5, cyL + 5, hex('#5a3a1a'));
  for (let dy = -7; dy <= 7; dy++) for (let dx = -7; dx <= 7; dx++) if (dx * dx + dy * dy < 49) luz(cxL + dx, cyL + dy, hex('#c8f0ff'), 0.28);
  R.anillo(cxL, cyL, 8, K); R.anillo(cxL, cyL, 7, hex('#f0c040')); R.anillo(cxL, cyL, 6, hex('#a87a18')); R.pset(cxL - 3, cyL - 3, BL); R.pset(cxL - 2, cyL - 4, BL);
  R.actor(EL.hackerGT, 164, 176, t, { dir: -1, habla: t < fans && Math.sin(t * 8) > 0, sorpresa: t > desc, salto: Math.round(Math.sin(tramo(t, desc + 0.1, desc + 0.6) * Math.PI) * 4) });
  if (t > desc && t < desc + 1.2) R.icono('!', 148, 132 - s, hex('#ffe890'), K, 2);
};

// ── 2 · el disco y la caja escondida ─────────────────────────────────────
const p2 = (t) => {
  const lupa = sua(tramo(t, a(0.32), a(0.43))), sale = sua(tramo(t, a(0.49), a(0.6))), adu = a(0.562);
  const o = { encuadre: 'espera', camara: 'disco', lupa: 0.15 + lupa * 0.85, caja: sale };
  T.hoy(R, t, o);
  R.actor(EL.aficionado2005, 30, 158, t, { dir: 1, dedo: t > a(0.36) && t < adu, sorpresa: t > adu, sonrisa: t < a(0.36) });
  R.actor(EL.hackerGT, 280, 158, t, { dir: -1, habla: t < adu && Math.sin(t * 7) > 0.2, sorpresa: t > adu + 0.2, salto: Math.round(Math.sin(tramo(t, adu + 0.2, adu + 0.7) * Math.PI) * 3) });
  T.hoyDelante(R, t, o);
  if (sale > 0.95 && t < adu + 2) { const g = Math.sin(t * 8) > 0; if (g) { R.pset(186, 128, BL); R.pset(228, 132, BL); R.pset(206, 124, hex('#ffe890')); } }
};

// ── 3 · la caja de cerca: la llave de cifras y el candado ───────────────────
const BOX = [104, 66, 236, 154];
const mesa3 = () => capa('mesa3', () => {
  // pared oscura con un tablero de herramientas y la luz del flexo
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 10 === 5 && y % 10 === 5) ? hex('#141626') : hh(x >> 1, y >> 1, 81) < 0.12 ? hex('#22243a') : hex('#1c1e30'));
  for (let y = 0; y < 50; y++) for (let x = 0; x < 320; x++) if ((1 - y / 50) * 0.7 > ((x * 3 + y * 5) % 8) / 8 * 0.6) R.pset(x, y, mez(R.pget(x, y), hex('#0a0a14'), 0.5));
  for (const [x, y, w] of [[250, 50, 18], [276, 58, 6], [240, 76, 26]]) { R.rect(x, y, x + w, y + 2, hex('#8a8c90')); R.rect(x, y + 3, x + w, y + 3, K); }
  R.rect(262, 62, 264, 90, hex('#c8303a')); R.rect(261, 90, 265, 94, hex('#8a8c90'));
  // la mesa con vetas
  madera(0, 120, 319, 179, hex('#4a3222'), hex('#3a2418'), hex('#5e4230'), 9); R.rect(0, 119, 319, 119, hex('#6a4a32')); R.rect(0, 118, 319, 118, K);
  // el portátil (izquierda) y el estuche abierto con el disco (abajo)
  R.poligono([[8, 120], [84, 120], [92, 132], [2, 132]], hex('#5a5a66')); R.poligono([[10, 122], [82, 122], [86, 128], [8, 128]], hex('#3a3a46'));
  R.rect(12, 70, 80, 120, K); R.rect(14, 72, 78, 117, hex('#2a2a34'));
  caja(110, 160, 150, 178, hex('#c8d0e0')); R.disco(130, 169, 8, hex('#c8ccd8')); R.disco(130, 169, 2, K); R.anillo(130, 169, 5, hex('#e8a0c8'));
  for (let k = 0; k < 3; k++) { R.rect(250 + k * 14, 150, 252 + k * 14, 172, hex(['#c8303a', '#f0c040', '#3a6ad8'][k])); R.rect(250 + k * 14, 140, 252 + k * 14, 150, hex('#a8acb8')); }
  // la caja grande: madera oscura con cantoneras, la tapa, la pegatina del 18+ y su telaraña
  const [x0, y0, x1, y1] = BOX;
  R.rect(x0 + 4, y1 + 1, x1 + 6, y1 + 5, hex('#24180e'));
  R.rect(x0, y0 + 20, x1, y1, K); for (let y = y0 + 21; y < y1; y++) for (let x = x0 + 1; x < x1; x++) R.pset(x, y, Math.sin(y * 1.1 + Math.sin(x * 0.06) * 2) > 0.85 ? hex('#3a2a3a') : hex('#4a3a4a'));
  for (const [cx, cy] of [[x0 + 1, y0 + 21], [x1 - 7, y0 + 21], [x0 + 1, y1 - 7], [x1 - 7, y1 - 7]]) { R.rect(cx, cy, cx + 6, cy + 6, hex('#8a8c90')); R.pset(cx + 3, cy + 3, K); }
  R.rect(x0 + 12, y1 - 26, x0 + 42, y1 - 12, K); R.rect(x0 + 13, y1 - 25, x0 + 41, y1 - 13, hex('#c8303a')); R.numero('18+', x0 + 16, y1 - 15, { fina: true, color: BL, sombra: false });
});
const tapa = (t, ab) => {
  const [x0, y0, x1] = BOX, dy = Math.round(ab * 5);
  if (ab > 0) { R.rect(x0 + 2, y0 + 18 - dy, x1 - 2, y0 + 20, hex('#ffd890')); R.halo((x0 + x1) / 2, y0 + 18, 30 * ab, [hex('#3a2a20'), hex('#a8783a'), hex('#ffd890')], 0.6); }
  R.rect(x0 - 2, y0 - dy, x1 + 2, y0 + 18 - dy, K); for (let y = y0 + 1 - dy; y < y0 + 18 - dy; y++) for (let x = x0 - 1; x <= x1 + 1; x++) R.pset(x, y, Math.sin(y * 1.1 + Math.sin(x * 0.06) * 2) > 0.85 ? hex('#4a3a4a') : hex('#5a4a5a'));
  R.rect(x0 - 1, y0 + 1 - dy, x1 + 1, y0 + 2 - dy, hex('#7a6a7a')); for (const cx of [x0 - 1, x1 - 5]) R.rect(cx, y0 + 1 - dy, cx + 6, y0 + 7 - dy, hex('#8a8c90'));
};
const p3 = (t) => {
  mesa3();
  const mod = a(0.789), clic = a(0.86), along = a(0.963), sk = tramo(t, P3 + 0.3, mod), entra = sua(tramo(t, mod, mod + 0.6)), gira = tramo(t, clic - 0.3, clic), ab = sua(tramo(t, clic + 0.3, along - 0.1)) * 0.6 + sua(tramo(t, along, along + 0.5)) * 0.4;
  // el flexo y su luz, con una polilla que da vueltas
  R.linea(210, 0, 206, 26, hex('#3a3c44')); R.linea(211, 0, 207, 26, hex('#5a5c64')); R.poligono([[194, 26], [218, 26], [214, 36], [198, 36]], hex('#2a6a8a')); R.linea(196, 27, 216, 27, hex('#4a9ab8')); R.rect(200, 36, 212, 37, hex('#fff0c0')); R.halo(206, 46, 36, [hex('#22243a'), hex('#3a3440'), hex('#5a4a40')], 0.6);
  const ma = t * 3.1, px = Math.round(206 + Math.cos(ma) * 13), py = Math.round(48 + Math.sin(ma * 1.3) * 7); R.pset(px, py, hex('#c8b8a0')); R.pset(px + (Math.sin(t * 30) > 0 ? 1 : -1), py - 1, hex('#e8d8c0'));
  // la pantalla del portátil: cifras que bajan
  R.recorte([14, 72, 78, 117]); for (let f = 0; f < 6; f++) { let s = ''; for (let c = 0; c < 7; c++) s += Math.floor(hh(c, f + Math.floor(t * 5), 82) * 10); R.numero(s, 16, 80 + f * 7, { fina: true, color: hex('#3ac86a'), sombra: false }); } R.recorte(null);
  // la caja con su tapa (se entreabre después del clic) y el candado
  tapa(t, ab);
  const [x0, y0, x1, y1] = BOX, lx = Math.round((x0 + x1) / 2), ly = y0 + 34;
  { const ar = Math.round(gira * 0 + (t > clic ? 5 : 0)); R.rect(lx - 8, ly - 12 - ar, lx + 8, ly - 10 - ar, K); R.rect(lx - 8, ly - 12 - ar, lx - 6, ly, K); R.rect(lx + 6, ly - 12 - ar, lx + 8, ly - (t > clic ? 8 : 0), K); R.rect(lx - 7, ly - 11 - ar, lx + 7, ly - 11 - ar, hex('#c8ccd8')); }
  caja(lx - 11, ly, lx + 11, ly + 20, hex('#f0c040')); R.rect(lx - 10, ly + 1, lx + 10, ly + 3, hex('#ffe890')); R.rect(lx - 10, ly + 17, lx + 10, ly + 19, hex('#a87a18'));
  R.disco(lx, ly + 9, 3, K); R.rect(lx - 1, ly + 9, lx + 1, ly + 15, K);
  // la telaraña de la esquina y el polvo, que caen en «all along»
  const cae = tramo(t, along, along + 1.2);
  if (cae < 1) { const dy = Math.round(cae * 30); for (let k = 0; k < 6; k++) R.linea(x1 - 1, y0 + 20 + dy, x1 - 1 - Math.cos(k * 0.3) * 18, y0 + 20 + dy + Math.sin(k * 0.3) * 18, hex('#a8a8b8')); for (let r = 6; r < 18; r += 5) R.anillo(x1 - 1, y0 + 20 + dy, r, hex('#8a8a9a'), 3); }
  if (cae > 0 && cae < 1) for (let k = 0; k < 18; k++) { const x = x0 + Math.floor(hh(k, 83) * (x1 - x0)), y = y0 + Math.round(hh(k, 84) * 10 + cae * 40); R.pset(x, y, hex('#c8b8a0')); }
  // la llave de cifras: sale del portátil, vuela y entra en el candado; gira en el clic
  if (sk > 0 && t < clic + 0.6) {
    const kx = Math.round(lerp(60, lx - 18, sua(sk)) + entra * 10), ky = Math.round(lerp(96, ly + 9, sua(sk)) - Math.sin(sk * Math.PI) * 30);
    for (let k = 0; k < 6; k++) { const d = Math.floor(hh(k, Math.floor(t * 8), 85) * 2); R.numero(String(d), kx - 22 + k * 4 - (1 - sk) * k * 4, ky + 3 + Math.round(Math.sin(t * 9 + k) * (1 - sk) * 4), { fina: true, color: hex('#6aff9a'), sombra: false }); }
    const ga = gira > 0 ? 1 : 0; R.halo(kx - 14, ky, 20, [hex('#1c2e2a'), hex('#2a5a3a'), hex('#3a8a5a')], 0.5);
    R.anillo(kx - 28, ky, 6, K); R.anillo(kx - 28, ky, 5, hex('#6aff9a')); R.anillo(kx - 28, ky, 4, hex('#3ac86a')); R.rect(kx - 22, ky - 1, kx, ky + 1, K); R.rect(kx - 22, ky, kx, ky, hex('#6aff9a'));
    for (const d of [-8, -4]) R.rect(kx + d, ky + (ga ? -5 : 1), kx + d + 2, ky + (ga ? -1 : 5), hex('#6aff9a'));
  }
  // el vapor que sale por la rendija
  if (ab > 0.5) for (let k = 0; k < 6; k++) { const s = (t * 0.5 + k / 6) % 1, x = Math.round(x0 + 20 + k * 18 + Math.sin(s * 6 + k) * 4), y = Math.round(y0 + 12 - s * 50); if (s < 0.85 && y > 20) { R.pset(x, y, hex('#e8e4dc')); R.pset(x + 1, y - 1, hex('#c8c4bc')); R.pset(x - 1, y + 1, hex('#a8a4a0')); } }
};

// ── 4 · el organismo que califica: el sello ─────────────────────────────────
const CJ = [176, 62, 240, 150];
const oficina4 = () => capa('oficina4', () => {
  // pared azul grisácea con zócalo de madera y cuarterones
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hh(x >> 1, y >> 1, 91) < 0.1 ? hex('#7a8aa0') : hex('#8a9ab0'));
  for (let y = 0; y < 44; y++) for (let x = 0; x < 320; x++) if ((1 - y / 44) * 0.6 > ((x * 3 + y * 5) % 8) / 8 * 0.6) R.pset(x, y, mez(R.pget(x, y), hex('#4a5a70'), 0.4));
  madera(0, 100, 319, 127, hex('#7a5232'), hex('#5a3a22'), hex('#946640'), 4); R.rect(0, 99, 319, 99, hex('#a87a52')); for (let x = 0; x < 320; x += 40) { R.rect(x + 4, 104, x + 36, 123, hex('#6a4428')); R.rect(x + 5, 105, x + 35, 105, hex('#946640')); }
  // la ventana con persiana (se anima dentro), el reloj y la estantería de cajas
  marco(14, 22, 92, 90, hex('#e0e4ec'), hex('#8a94a8'));
  R.rect(110, 30, 166, 92, K); R.rect(111, 31, 165, 92, hex('#6a4a2e')); for (let f = 0; f < 3; f++) { R.rect(111, 50 + f * 21, 165, 52 + f * 21, hex('#4a3020')); for (let k = 0; k < 9; k++) { const x = 113 + k * 6; R.rect(x, 36 + f * 21, x + 4, 49 + f * 21, K); R.rect(x + 1, 37 + f * 21, x + 3, 49 + f * 21, [hex('#e0a030'), hex('#3a6ad8'), hex('#c8303a'), hex('#4a9a3a'), hex('#8a4ac8'), hex('#f0f0f0')][(k + f) % 6]); } }
  // la mesa con vetas: papeles, el tampón con su sello, el portalápices
  madera(0, 136, 319, 179, hex('#8a5a32'), hex('#6a4224'), hex('#a8743e'), 6); R.rect(0, 135, 319, 135, hex('#c08a50')); R.rect(0, 134, 319, 134, K);
  for (let k = 0; k < 3; k++) { R.poligono([[248 + k * 3, 152 - k * 2], [300 + k * 3, 148 - k * 2], [304 + k * 3, 170 - k * 2], [252 + k * 3, 174 - k * 2]], k === 2 ? hex('#f6f2e6') : hex('#d8d0c0')); }
  for (let k = 0; k < 4; k++) R.linea(258, 156 + k * 4, 292, 153 + k * 4, hex('#a8a090'));
  caja(92, 156, 128, 166, hex('#24202c')); R.rect(94, 158, 126, 164, hex('#1a1a24'));
  caja(296, 118, 312, 136, hex('#3a6ad8')); for (let k = 0; k < 3; k++) R.rect(299 + k * 4, 108 - k * 3, 300 + k * 4, 118, [hex('#f0c040'), hex('#c8303a'), hex('#24202c')][k]);
  // la caja del juego, de pie: el cielo, la ciudad de juguete, el coche y la etiqueta del 17 abajo a la derecha
  const [x0, y0, x1, y1] = CJ; R.rect(x0 + 4, y1 - 2, x1 + 5, y1 + 3, hex('#5a3a22'));
  caja(x0, y0, x1, y1, hex('#4a8ae8')); grad(x0 + 1, y0 + 1, x1 - 1, y0 + 44, [hex('#3a6ad8'), hex('#6aa0e8'), hex('#a8d0f0')]);
  nube(x0 + 18, y0 + 14, 18, [hex('#c8dcf0'), hex('#e8f0f8'), hex('#ffffff')]); R.disco(x1 - 12, y0 + 10, 5, hex('#ffe890'));
  for (let k = 0; k < 7; k++) { const bx = x0 + 2 + k * 9, hg = 10 + Math.floor(hh(k, 92) * 22); R.rect(bx, y0 + 66 - hg, bx + 7, y0 + 66, [hex('#e86a7a'), hex('#f0c040'), hex('#4a9a3a'), hex('#8a4ac8'), hex('#f2ecd8')][k % 5]); for (let yy = y0 + 69 - hg; yy < y0 + 64; yy += 4) R.rect(bx + 2, yy, bx + 4, yy + 1, hex('#2a3a7a')); }
  R.rect(x0 + 1, y0 + 66, x1 - 1, y1 - 1, hex('#4a4a56')); for (let x = x0 + 4; x < x1; x += 10) R.rect(x, y0 + 76, x + 5, y0 + 76, hex('#f0c040'));
  PZ.cocheJuguete(R, x0 + 26, y0 + 82, { color: '#e8403a' });
  R.rect(x1 - 20, y1 - 22, x1 - 3, y1 - 3, K); R.rect(x1 - 19, y1 - 21, x1 - 4, y1 - 4, BL); R.numero('17', x1 - 17, y1 - 8, { fina: true, color: K, sombra: false });
});
const p4 = (t) => {
  oficina4();
  const hot = b(0.033), board = b(0.116), ch = b(0.243), golpe = b(0.292), [x0, y0, x1, y1] = CJ;
  // la ventana: cielo de día con nubes que pasan; las lamas de la persiana encima
  R.recorte([14, 22, 92, 90]); grad(14, 22, 92, 90, [hex('#5a9ae8'), hex('#8ac0f0'), hex('#c8e0f8')]);
  for (let k = 0; k < 3; k++) nube(((k * 41 + t * (3 + k * 2)) % 120) - 10, 36 + k * 12, 24, [hex('#c8d8e8'), hex('#e8f0f8'), hex('#ffffff')]);
  for (let k = 0; k < 8; k++) { const x = 14 + k * 11, hg = 12 + Math.floor(hh(k, 93) * 18); rr(x, 90 - hg, x + 9, 90, hex('#7a8aa0')); for (let y = 92 - hg; y < 90; y += 3) R.pset(x + 3, y, hex('#a8c0d8')); }
  for (let y = 24; y < 60; y += 4) R.linea(14, y, 92, y, hex('#e8e4dc')); R.recorte(null);
  // el reloj de pared, que anda
  R.disco(192, 30, 9, K); R.disco(192, 30, 8, BL); const an = t * 0.5; R.linea(192, 30, Math.round(192 + Math.cos(an) * 6), Math.round(30 + Math.sin(an) * 6), K); R.linea(192, 30, 192, 25, K); R.pset(192, 30, hex('#c8303a'));
  // la taza: humea siempre; en «Hot Coffee» echa una nube grande
  const tx = 140, ty = 150; caja(tx - 9, ty - 16, tx + 7, ty, hex('#f2ecd8')); R.rect(tx + 7, ty - 12, tx + 11, ty - 5, K); R.rect(tx + 8, ty - 11, tx + 10, ty - 6, hex('#f2ecd8')); R.rect(tx - 8, ty - 15, tx + 6, ty - 13, hex('#5a3a1a')); R.rect(tx - 8, ty - 9, tx + 6, ty - 8, hex('#c8303a'));
  const fuerte = tramo(t, hot, hot + 0.4) - tramo(t, hot + 1.2, hot + 2.2);
  for (let k = 0; k < 5; k++) { const s = (t * (0.6 + fuerte) + k / 5) % 1, x = Math.round(tx - 1 + Math.sin(s * 6 + k) * (2 + fuerte * 4)), y = Math.round(ty - 18 - s * (18 + fuerte * 30)); if (s < 0.85) { R.pset(x, y, hex('#f0ece4')); R.pset(x + 1, y - 1, hex('#d8d4cc')); if (fuerte > 0.3) { R.disco(x, y, 2, hex('#e8e4dc')); } } }
  // la mano que marca la lista con el lápiz (abajo a la izquierda), en «the board that rates games»
  const lis = tramo(t, board, board + 1.8), [cbx, cby] = [30, 150];
  caja(cbx - 2, cby - 4, cbx + 46, cby + 30, hex('#8a6a3a')); R.rect(cbx, cby - 2, cbx + 44, cby + 28, BL); R.rect(cbx + 16, cby - 7, cbx + 28, cby - 2, hex('#8a8c90'));
  for (let k = 0; k < 4; k++) { const yy = cby + 4 + k * 6; R.rect(cbx + 4, yy, cbx + 8, yy + 4, K); R.rect(cbx + 5, yy + 1, cbx + 7, yy + 3, BL); R.linea(cbx + 12, yy + 2, cbx + 38, yy + 2, hex('#a8a090')); if (lis > (k + 1) / 4) { R.linea(cbx + 4, yy + 2, cbx + 6, yy + 4, hex('#c8303a')); R.linea(cbx + 6, yy + 4, cbx + 10, yy - 1, hex('#c8303a')); } }
  const kk = Math.min(3, Math.floor(lis * 4)), hx = cbx + 10 + Math.round(Math.sin(t * 14) * (lis > 0 && lis < 1 ? 2 : 0)), hy = cby + 6 + kk * 6;
  R.linea(hx - 2, hy + 2, hx + 8, hy - 10, hex('#f0c040')); R.linea(hx - 1, hy + 2, hx + 9, hy - 10, hex('#c8a020')); R.pset(hx - 3, hy + 3, K);
  T.brazo(R, -14, 196, hx + 6, hy - 4, '#6a7a5a', 1, { codo: [8, 184] });
  // el sello: está en su tampón; en «changed it» salta, en «adults only» golpea la etiqueta y vuelve
  const sube = sua(tramo(t, ch, golpe - 0.15)), baja = tramo(t, golpe - 0.15, golpe), vuelve = sua(tramo(t, golpe + 0.5, golpe + 1.2));
  const base = [110, 156], dest = [x1 - 11, y1 - 10];
  let sx, sy;
  if (t < golpe) { sx = lerp(base[0], dest[0], sube); sy = lerp(base[1], dest[1] - 30, sube) - Math.sin(sube * Math.PI) * 30 + baja * 30; }
  else { sx = lerp(dest[0], base[0], vuelve); sy = lerp(dest[1], base[1], vuelve) - Math.sin(vuelve * Math.PI) * 30; }
  // la etiqueta negra del 18 (desde el golpe), con el polvo del golpe
  if (t > golpe) { R.rect(x1 - 21, y1 - 23, x1 - 2, y1 - 2, BL); R.rect(x1 - 20, y1 - 22, x1 - 3, y1 - 3, K); R.rect(x1 - 18, y1 - 20, x1 - 5, y1 - 5, hex('#24202c')); R.numero('18', x1 - 17, y1 - 8, { fina: true, color: BL, sombra: false }); for (const dx of [-14, -10]) { R.disco(x1 + dx, y1 - 18, 1, BL); } }
  const temb = t > golpe && t < golpe + 0.3 ? Math.round(Math.sin(t * 80) * 1) : 0;
  sx = Math.round(sx) + temb; sy = Math.round(sy);
  R.rect(sx - 10, sy - 4, sx + 10, sy, K); R.rect(sx - 9, sy - 3, sx + 9, sy - 1, hex('#3a3a46')); R.rect(sx - 7, sy - 10, sx + 7, sy - 5, K); R.rect(sx - 6, sy - 9, sx + 6, sy - 6, hex('#8a5a32')); R.rect(sx - 2, sy - 18, sx + 2, sy - 10, hex('#6a4224')); R.disco(sx, sy - 20, 4, K); R.disco(sx, sy - 20, 3, hex('#c8303a')); R.pset(sx - 1, sy - 22, hex('#ff8a8a'));
  if (t > golpe && t < golpe + 0.5) { const r = Math.round((t - golpe) * 40); R.anillo(dest[0], dest[1], 6 + r, hex('#f6f2e6'), 3); R.icono('!', dest[0] - 3, dest[1] - 34, hex('#ffe890'), K, 2); }
};

// ── 5 · el pasillo de la gran tienda: retiran las cajas ───────────────────────
const SLOTS = []; for (let k = 0; k < 9; k++) SLOTS.push([128 + k * 10, 157]);
const COLS = [hex('#e0a030'), hex('#3a6ad8'), hex('#c8303a'), hex('#4a9a3a'), hex('#8a4ac8'), hex('#f0f0f0')];
const pasillo = () => capa('pasillo', () => {
  // techo con placas y fluorescentes; la esquina de Atom, techo liso con una luz suave
  R.rect(0, 0, 319, 30, hex('#d8dce4')); for (let x = 0; x < 260; x += 32) R.linea(x, 0, x, 30, hex('#b8bcc8')); for (let y = 10; y < 30; y += 10) R.linea(0, y, 260, y, hex('#b8bcc8'));
  for (const x of [20, 116, 212]) { R.rect(x, 18, x + 50, 22, hex('#a8acb8')); R.rect(x + 2, 19, x + 48, 21, hex('#ffffff')); }
  R.rect(0, 30, 319, 36, hex('#2a5aa8')); R.rect(0, 31, 319, 31, hex('#5a8ad8')); R.rect(0, 37, 319, 37, K);
  for (let x = 6; x < 262; x += 24) { R.poligono([[x, 32], [x + 2, 34], [x + 4, 32], [x + 2, 30]], hex('#f0c040')); }
  // la estantería: montantes perforados, cuatro baldas con cajas de tamaños distintos y etiquetas de precio
  R.rect(0, 38, 319, 159, hex('#3e404c')); for (let y = 40; y < 158; y += 4) for (let x = 2; x < 320; x += 6) R.pset(x, y, hex('#34363f'));
  for (const x of [0, 64, 128, 192, 256, 316]) { R.rect(x, 38, x + 3, 159, hex('#6a6c78')); for (let y = 42; y < 158; y += 5) R.pset(x + 1, y, K); }
  const balda = (yb, salta) => { R.rect(0, yb, 319, yb + 3, hex('#c8ccd8')); R.rect(0, yb, 319, yb, BL); R.rect(0, yb + 4, 319, yb + 4, K);
    for (let x = 6; x < 314;) { const k = Math.floor(hh(x, yb, 94) * 10); if (salta && x >= 122 && x < 216) { x += 10; continue; }
      if (k === 9) { caja(x, yb - 16, x + 16, yb - 1, hex('#24242c')); R.rect(x + 2, yb - 13, x + 14, yb - 8, hex('#3a6ad8')); R.pset(x + 13, yb - 4, hex('#3a9a3a')); x += 19; }
      else if (k === 8) { caja(x, yb - 13, x + 6, yb - 1, hex('#1a1a24')); R.rect(x + 1, yb - 12, x + 5, yb - 8, COLS[(x >> 3) % 6]); x += 8; }
      else { cajita(x + 4, yb - 1, COLS[k % 6]); x += 10; } }
    for (let x = 14; x < 316; x += 40) { R.rect(x, yb + 1, x + 12, yb + 3, hex('#f0e060')); R.numero('49', x + 3, yb + 4, { fina: true, color: K, sombra: false }); } };
  balda(78, false); balda(104, false); balda(130, false);
  // la balda de abajo, a la altura de la mano, con la tira negra de la sección del 18
  R.rect(0, 158, 319, 161, hex('#c8ccd8')); R.rect(0, 158, 319, 158, BL); R.rect(0, 162, 319, 162, K);
  for (let x = 6; x < 314; x += 10) if (x < 122 || x >= 216) cajita(x + 4, 157, COLS[Math.floor(hh(x, 3, 95) * 6)]);
  R.rect(122, 159, 214, 161, K); R.rect(160, 159, 176, 161, hex('#c8303a'));
  // el cartel del pasillo colgado (con su número) y un expositor de cartón al fondo
  R.rect(40, 37, 41, 46, K); R.rect(80, 37, 81, 46, K); caja(30, 46, 92, 60, hex('#2a5aa8')); R.rect(31, 47, 91, 48, hex('#5a8ad8')); R.numero('12', 52, 57, { fina: true, color: BL, sombra: false });
  // el suelo brillante con los reflejos de los fluorescentes
  for (let y = 163; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, ((x >> 5) + ((y - 163) >> 3)) % 2 ? hex('#c8ccd8') : hex('#d4d8e2'));
  for (const x of [40, 136, 232]) for (let y = 165; y < 180; y += 3) R.linea(x, y, x + 40, y, hex('#eef0f6'));
});
const p5 = (t) => {
  pasillo();
  const pul = b(0.399), lleva = sua(tramo(t, b(0.5), P6 + 1.4));
  // las cajas de la sección del 18 (abajo, con la etiqueta negra) se van quitando una a una
  const quitadas = Math.max(0, Math.min(9, Math.floor((t - pul) / 0.3) + 1));
  SLOTS.forEach(([x, y], k) => { if (k >= quitadas) cajita(x, y, COLS[k % 3], 1); });
  if (t > pul && t < pul + 1.5) { const g = Math.sin(t * 10) > 0; if (g) R.rect(122, 159, 214, 159, hex('#ff3a3a')); }
  // el dependiente las coge y las deja en el carro; luego se lo lleva por la derecha
  const dx = Math.round(170 + lleva * 190), cx = dx + 22, coge = t > pul && quitadas < 9 && lleva === 0, sx = SLOTS[Math.min(8, quitadas)][0];
  const d = R.actor(EL.dependienteGT, dx, 178, t, { dir: lleva > 0 ? 1 : coge && sx < dx + 7 ? -1 : 1, sostiene: coge ? [sx, 150] : false, anda: lleva > 0 && lleva < 1, habla: t < pul && Math.sin(t * 7) > 0.3 });
  if (coge) cajita(d.mano[0], d.mano[1] + 4, COLS[quitadas % 3], 1);
  R.rect(cx, 150, cx + 40, 168, K); for (let x = cx + 1; x < cx + 40; x += 3) R.linea(x, 151, x, 167, hex('#a8acb8')); R.rect(cx + 1, 151, cx + 39, 152, hex('#c8ccd8')); R.linea(cx + 40, 150, cx + 46, 142, K); R.linea(cx + 46, 142, cx + 50, 142, K);
  for (let k = 0; k < Math.min(quitadas - (coge ? 1 : 0), 9); k++) cajita(cx + 6 + (k % 5) * 7, 164 - Math.floor(k / 5) * 9, COLS[k % 3], 1);
  R.disco(cx + 5, 172, 3, K); R.disco(cx + 35, 172, 3, K); R.disco(cx + 5, 172, 1, hex('#8a8c94')); R.disco(cx + 35, 172, 1, hex('#8a8c94'));
  // una clienta se acerca, mira el hueco y se va con las manos vacías
  const cl = sua(tramo(t, P5, P5 + 1.6)), va = sua(tramo(t, b(0.5), P6 + 0.3)); R.actor(EL.madre85, Math.round(lerp(-20, 90, cl) - va * 120), 178, t, { dir: va > 0 ? -1 : 1, anda: (cl > 0 && cl < 1) || (va > 0 && va < 1), sorpresa: t > pul + 1.2 && va === 0, triste: va > 0 });
};

// ── 6 · el despacho: la carpeta ───────────────────────────────────────────────
const p6 = (t) => {
  const o = { encuadre: 'loft', camara: 'despacho' };
  T.nuevayork(R, t, o);
  const ord = b(0.64), tell = b(0.706), todo = b(0.774), firma = b(0.84);
  R.actor(EL.abogado1, 134, 152, t, { dir: 1, dedo: t > ord && t < tell, habla: t > ord && Math.sin(t * 8) > 0, enfado: false });
  R.actor(EL.ejecutivo, 174, 152, t, { dir: -1, sorpresa: t > todo && t < firma, triste: t > firma, habla: t > tell && t < todo && Math.sin(t * 7) > 0.2 });
  const ab2 = R.actor(EL.abogado2, 272, 156, t, { dir: -1, habla: t < ord && Math.sin(t * 6) > 0.2, dedo: t > todo, sostiene: t < todo });
  if (t < todo) { const [mx, my] = ab2.mano; R.rect(mx - 8, my - 2, mx + 1, my + 9, K); R.rect(mx - 7, my - 1, mx, my + 8, hex('#c8303a')); R.rect(mx - 7, my - 1, mx - 6, my + 8, hex('#8a1e26')); }
  T.nuevayorkDelante(R, t, o);
  // la carpeta se desliza por la mesa hasta el ejecutivo; se abre y crece el montón de hojas
  const des = sua(tramo(t, ord, ord + 0.6)), fx = Math.round(lerp(132, 160, des)), fy = 141;
  R.rect(fx - 14, fy - 3, fx + 14, fy + 2, K); R.rect(fx - 13, fy - 2, fx + 13, fy + 1, hex('#e0c070')); R.rect(fx - 13, fy - 2, fx - 9, fy + 1, hex('#c8a040'));
  const ab = tramo(t, tell, tell + 0.4), mon = Math.round(tramo(t, todo - 0.2, firma) * 12);
  if (ab > 0) { for (let k = 0; k < mon; k++) { R.rect(fx - 11, fy - 4 - k * 2, fx + 11, fy - 3 - k * 2, k % 2 ? hex('#e8e4dc') : BL); R.pset(fx - 11, fy - 4 - k * 2, K); R.pset(fx + 11, fy - 4 - k * 2, K); }
    for (let k = 0; k < 3; k++) { const s = (t * 1.3 + k / 3) % 1; if (t > tell && t < firma) { const px = Math.round(fx + Math.sin(s * 5 + k) * 14), py = Math.round(fy - 10 - mon * 2 - s * 18); R.rect(px - 3, py - 2, px + 3, py + 2, BL); R.linea(px - 2, py, px + 2, py, hex('#a8a090')); } } }
  if (t > firma) { const u = tramo(t, firma, firma + 0.6); R.linea(fx + 14, fy - 1, fx + 14 + Math.round(u * 10), fy - 1 - Math.round(Math.sin(u * 12) * 1.5), hex('#2a3a8a')); R.linea(fx + 12 + Math.round(u * 10), fy - 8, fx + 15 + Math.round(u * 10), fy - 1, K); }
};

// ── 7 · la caja en unas manos: la etiqueta clara ────────────────────────────────
const salon7 = () => capa('salon7', () => {
  // pared con papel pintado suave abajo y lisa arriba (la esquina de Atom tranquila), ventana al anochecer, lámpara y cuadro
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y > 70 && (x % 12 === 0) ? hex('#c8a890') : hh(x >> 1, y >> 1, 101) < 0.1 ? hex('#d0b49c') : hex('#dcc0a8'));
  for (let y = 0; y < 44; y++) for (let x = 0; x < 320; x++) if ((1 - y / 44) * 0.5 > ((x * 3 + y * 5) % 8) / 8 * 0.6) R.pset(x, y, mez(R.pget(x, y), hex('#8a6a5a'), 0.3));
  marco(14, 34, 86, 104, hex('#f2ecd8'), hex('#a89c80'));
  caja(238, 52, 284, 86, hex('#c8a040')); R.rect(241, 55, 281, 83, hex('#5a8ac8')); R.poligono([[241, 83], [256, 66], [266, 76], [272, 70], [281, 83]], hex('#4a8a4a')); R.disco(274, 61, 3, hex('#f0e060'));
  // el sofá por detrás, abajo, con sus cojines
  R.rect(0, 140, 319, 179, K); for (let y = 141; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y - 141) % 14 === 0 || x % 64 === 0 ? hex('#6a2a2a') : hex('#8a3a34'));
  R.rect(0, 141, 319, 143, hex('#a84a42')); caja(20, 130, 56, 150, hex('#e0a030')); caja(262, 132, 300, 152, hex('#3a6ad8'));
});
const p7 = (t) => {
  salon7();
  const say = b(0.884), cla = b(0.915), box = b(0.966);
  // el anochecer por la ventana, con nubes que pasan
  R.recorte([14, 34, 86, 104]); grad(14, 34, 86, 104, [hex('#3a2a6a'), hex('#a84a7a'), hex('#f08a5a'), hex('#ffc070')]);
  for (let k = 0; k < 2; k++) nube(((k * 47 + t * (3 + k * 3)) % 110) - 10, 50 + k * 14, 26, [hex('#8a3a6a'), hex('#c8607a'), hex('#f0a08a')]);
  for (let k = 0; k < 6; k++) { const x = 14 + k * 13, hg = 8 + Math.floor(hh(k, 102) * 18); rr(x, 104 - hg, x + 11, 104, hex('#2a1a3a')); }
  R.recorte(null); R.rect(49, 34, 50, 104, hex('#f2ecd8')); R.rect(14, 68, 86, 69, hex('#f2ecd8'));
  // la lámpara de pie con su halo y el gato que pasea por el respaldo del sofá
  R.linea(304, 70, 304, 140, K); R.poligono([[294, 70], [314, 70], [310, 56], [298, 56]], hex('#f0d890')); R.halo(304, 74, 26, [hex('#dcc0a8'), hex('#f0d8b0'), hex('#fff0c8')], 0.6);
  const gx = Math.round(330 - ((t - P7) * 12)), cola = Math.round(Math.sin(t * 4) * 2); R.rect(gx, 132, gx + 12, 137, hex('#3a3a46')); R.rect(gx - 4, 128, gx + 1, 134, hex('#3a3a46')); R.pset(gx - 4, 127, hex('#3a3a46')); R.pset(gx, 127, hex('#3a3a46')); R.pset(gx - 3, 130, hex('#f0e060')); R.linea(gx + 12, 133, gx + 17, 127 + cola, hex('#3a3a46'));
  // la caja grande, sostenida por dos manos (se mece un poco)
  const by = Math.round(Math.sin(t * 1.6) * 1.2), x0 = 112, y0 = 24 + by, x1 = 208, y1 = 150 + by;
  R.rect(x0 + 3, y0 + 3, x1 + 4, y1 + 4, hex('#5a3a3a'));
  caja(x0, y0, x1, y1, hex('#4a8ae8')); grad(x0 + 1, y0 + 1, x1 - 1, y0 + 60, [hex('#3a6ad8'), hex('#6aa0e8'), hex('#a8d0f0')]);
  R.disco(x1 - 18, y0 + 16, 8, hex('#ffe890')); R.disco(x1 - 18, y0 + 16, 6, hex('#fff8d0')); nube(x0 + 28 + Math.round(Math.sin(t) * 2), y0 + 22, 30, [hex('#c8dcf0'), hex('#e8f0f8'), hex('#ffffff')]);
  for (let k = 0; k < 10; k++) { const bx = x0 + 2 + k * 9.4, hg = 14 + Math.floor(hh(k, 103) * 30); R.rect(Math.round(bx), y0 + 90 - hg, Math.round(bx) + 8, y0 + 90, [hex('#e86a7a'), hex('#f0c040'), hex('#4a9a3a'), hex('#8a4ac8'), hex('#f2ecd8')][k % 5]); for (let yy = y0 + 93 - hg; yy < y0 + 88; yy += 5) R.rect(Math.round(bx) + 2, yy, Math.round(bx) + 5, yy + 1, hex('#2a3a7a')); }
  R.rect(x0 + 1, y0 + 90, x1 - 1, y1 - 1, hex('#4a4a56')); for (let x = x0 + 4; x < x1; x += 12) R.rect(x, y0 + 100, x + 6, y0 + 100, hex('#f0c040'));
  PZ.cocheJuguete(R, x0 + 40, y0 + 108, { color: '#e8403a', s: 1 });
  // la etiqueta clara: sube en «say so» y brilla en «clearly» (el 18 en negro y tres renglones con sus iconos)
  const et = sua(tramo(t, say - 0.1, say + 0.35));
  if (et > 0) { const ey = Math.round(y1 - 4 - 30 * et);
    R.recorte([x0 + 1, y0 + 1, x1 - 1, y1 - 1]);
    rr(x0 + 6, ey, x1 - 6, ey + 28, K); rr(x0 + 7, ey + 1, x1 - 7, ey + 27, BL);
    rr(x0 + 10, ey + 4, x0 + 30, ey + 24, K); R.numero('18', x0 + 13, ey + 17, { fina: true, color: BL, sombra: false });
    for (let k = 0; k < 3; k++) { const yy = ey + 5 + k * 7; R.disco(x0 + 38, yy + 1, 2, [hex('#c8303a'), hex('#f0c040'), hex('#3a6ad8')][k]); R.linea(x0 + 44, yy + 1, x1 - 12 - k * 8, yy + 1, hex('#5a5468')); R.linea(x0 + 44, yy + 2, x1 - 12 - k * 8, yy + 2, hex('#8a8494')); }
    R.recorte(null);
    if (t > cla && t < cla + 1) { const g = 1 - (t - cla); R.halo((x0 + x1) / 2, ey + 14, 40 * g + 10, [hex('#e8e0c8'), hex('#fff8d8')], 0.4 * g); for (const [sx, sy] of [[x0 + 4, ey - 2], [x1 - 4, ey + 2], [x0 + 40, ey - 4]]) { R.pset(sx, sy, BL); R.pset(sx - 1, sy, BL); R.pset(sx + 1, sy, BL); R.pset(sx, sy - 1, BL); R.pset(sx, sy + 1, BL); } }
  }
  // las dos manos (brazos desde abajo) que sujetan la caja por los cantos; en «box» la acercan un poco
  const ac = Math.round(sua(tramo(t, box - 0.3, box + 0.3)) * 2);
  T.brazo(R, 74, 214, x0 + 2, y1 - 6 - ac, '#7a4a8a', 1, { codo: [86, 186] });
  T.brazo(R, 246, 214, x1 - 2, y1 - 6 - ac, '#7a4a8a', -1, { codo: [234, 186] });
};

const efectos = [
  [1.0, 'tecleo'], [a(0.245), 'aviso'],
  [a(0.33), 'whoosh'], [a(0.56), 'brillo'],
  [a(0.79), 'bip'], [a(0.86), 'cerrojo'], [a(0.965), 'vapor'],
  [b(0.04), 'burbujas'], [b(0.13), 'lapiz'], [b(0.292), 'sello'],
  [b(0.41), 'golpecito'], [b(0.52), 'carro'],
  [b(0.645), 'papel'], [b(0.84), 'firma'],
  [b(0.89), 'pop'], [b(0.915), 'brillo'],
];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año: 2005 });
''')
