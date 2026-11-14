# Borrador de escenas del ep35 (grupo S6): jm-espacio y jm-velas. Formato del 11: E[id] = (título, cabecera, cuerpo).
E = {}

COMUN = r'''
const K = hex('#16161c'), CREMA = hex('#fbf7ea'), BL = hex('#f6f2ea'), PZ = T.PIEZAS_JM, ease = (u) => u * u * (3 - 2 * u);
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], b4 = (x, y) => B4[(x & 3) + (y & 3) * 4] / 16;
// un bocadillo (caja crema con filo) con el rabito hacia (px, py)
const globo = (x0, y0, x1, y1, px, py) => {
  R.rect(x0 + 1, y0, x1 - 1, y1, K); R.rect(x0, y0 + 1, x1, y1 - 1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, CREMA); R.rect(x0 + 2, y1 - 1, x1 - 2, y1 - 1, hex('#d8d0b8'));
  const bx = Math.max(x0 + 3, Math.min(x1 - 8, px - 2)); R.poligono([[bx, y1], [bx + 6, y1], [px, py]], K); R.poligono([[bx + 1, y1 - 1], [bx + 5, y1 - 1], [px, py - 2]], CREMA);
};
const destello = (x, y, r, c = BL) => { x = Math.round(x); y = Math.round(y); for (let i = -r; i <= r; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } if (r > 1) { R.pset(x - 1, y - 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); R.pset(x + 1, y + 1, c); } };
// un bote corto (para saltar de alegría o de susto)
const bote = (t, t0, alto = 5, dur = 0.42) => (t > t0 && t < t0 + dur ? Math.round(Math.sin((t - t0) / dur * Math.PI) * alto) : 0);
'''

E['jm-espacio'] = ('El espacio', '''// JM-ESPACIO (frases 17–18), 1996 → 2016, sin cartela. Siete planos (cortes en game · The two boys · and this time ·
// That book · In theaters · For more than):
// 1. el salón de 1996: dos niños detrás del sofá miran la serie de dibujos; uno llega corriendo y los dos botan con el
//    dado de la tele (notas que salen del altavoz);  2. la juguetería: la niña señala NUESTRA caja en el expositor y da
//    un bote; llega el autor (EL.vanallsburg) con un libro nuevo en la mano y su etiqueta «2002», y lo levanta;
// 3. el otro tablero, el de hojalata, a la deriva: los dos chicos encima; uno tira las instrucciones, que se van
//    flotando, y el otro señala el cohetito;  4. (vista añadida: selva/espacio/ventana) el cuarto: el planeta a rayas
//    pasa por la ventana, los chicos corren a mirar y se quedan flotando;  5. la taquilla de 2005: una paloma, hojas
//    secas, un solo cliente que saca su entrada, mira atrás y no hay nadie («?»);  6. la sala vacía: el único
//    espectador con sus palomitas, la balanza de latón que se queda en el fiel (lo que costó = lo que recaudó), la
//    película se acaba (cola 3-2-1) y él se va;  7. la caja cerrada: el polvo crece, baja la araña, un ratón la
//    olisquea, estornuda y se va; el año corre de 2005 a 2016.
// DERECHOS: el cartel de la taquilla y la pantalla de la sala (el decorado pinta una casa y un planeta con anillos)
// se repintan aquí con lo NUESTRO: la bandeja de hojalata, el cohetito y el planeta a rayas sin anillos.''', COMUN + r'''
// el instante en que la voz inglesa dice algo, a partir de su segundo en la toma real (frase «zathura»: 0,9–14,989 s;
// frase «caja»: 16,425–29,734 s), como fracción de su frase
const Z = (s) => en('zathura', (s - 0.9) / 14.089), C = (s) => en('caja', (s - 16.425) / 13.309), FIN = M.duracion ?? 31.13;
const P2 = Z(3.66), P3 = Z(7.65), P4 = Z(11.89), P5 = C(16.43), P6 = C(21.81), P7 = C(26.9);
const serie = Z(1.72), a2002 = Z(4.65), secuela = Z(7.01), tira = Z(8.57), otro = Z(10.15), tablero = Z(10.49), flotar = Z(13.37);
const a2005 = C(18.37), nadie = C(20.11), costo = C(23.85), acabo = C(25.11), abrio = C(28.4), cajaW = C(28.96);

// ── lo nuestro en pequeño: el cohetito de cuerda, el planeta a rayas (sin anillos) y la bandeja de hojalata ──
const COHETE = ['...k...', '..kWk..', '..kWk..', '.kWWWk.', '.kWBWk.', '.kWBWk.', '.kWWWk.', 'kRWWWRk', 'kRkWkRk', 'kk.k.kk'];
const PALC = { k: K, W: hex('#f2f2ee'), B: hex('#5ab0e8'), R: hex('#d8303a') };
const cohete = (x, y, t) => { x = Math.round(x); y = Math.round(y); R.dibujo(COHETE, x - 3, y - 10, 1, PALC); const f = Math.floor(t * 14) % 2;
  R.pset(x, y, hex('#ffd45a')); R.pset(x, y + 1, hex(f ? '#ff8a2a' : '#ffd45a')); if (f) R.pset(x, y + 2, hex('#ff8a2a')); R.pset(x - 1, y, hex('#ff8a2a')); R.pset(x + 1, y, hex('#ff8a2a')); };
const planeta = (cx, cy, r, t) => { const B = ['#f8d8a0', '#e89848', '#f4c078', '#c86a38', '#e8a860', '#b85a30'].map(hex);
  for (let j = -r - 1; j <= r + 1; j++) for (let i = -r - 1; i <= r + 1; i++) { const d = Math.hypot(i, j); if (d > r + 0.9) continue; if (d > r - 0.1) { R.pset(cx + i, cy + j, K); continue; }
    let c = B[Math.max(0, Math.min(5, Math.floor((j + r + Math.sin((i + t * 4) * 0.35) * 0.9) / (2 * r + 1) * 6)))]; if (i + j > r * 0.75) c = mez(c, hex('#3a1830'), 0.45); else if (i + j < -r * 0.9) c = mez(c, BL, 0.35); R.pset(cx + i, cy + j, c); } };
const bandeja = (cx, cy, w) => { const cols = ['#f0c030', '#3aa85a', '#d8303a', '#f2f2ee', '#f08a2a', '#5ab0e8'].map(hex);
  R.poligono([[cx - w + 2, cy - 7], [cx + w - 2, cy - 7], [cx + w + 1, cy + 3], [cx - w - 1, cy + 3]], K);
  R.poligono([[cx - w + 3, cy - 6], [cx + w - 3, cy - 6], [cx + w, cy + 2], [cx - w, cy + 2]], hex('#2a4a90'));
  for (let i = -w + 4, n = 0; i <= w - 5; i += 3, n++) { R.pset(cx + i, cy - 5, cols[n % 6]); R.pset(cx + i + 1, cy - 5, cols[n % 6]); R.pset(cx + Math.round(i * 1.12), cy + 1, cols[(n + 3) % 6]); R.pset(cx + Math.round(i * 1.12) + 1, cy + 1, cols[(n + 3) % 6]); }
  for (let j = -3; j <= -1; j += 2) { R.pset(cx - w + 3, cy + j, cols[(j + 5) % 6]); R.pset(cx + w - 3, cy + j, cols[(j + 8) % 6]); }
  R.disco(cx - 4, cy - 2, 2, hex('#f0c030')); R.pset(cx - 4, cy - 2, hex('#d8303a')); R.pset(cx + 5, cy - 3, BL); R.pset(cx + 7, cy - 1, hex('#f08a2a'));
  R.poligono([[cx - w - 1, cy + 3], [cx + w + 1, cy + 3], [cx + w, cy + 7], [cx - w, cy + 7]], K); R.poligono([[cx - w, cy + 4], [cx + w, cy + 4], [cx + w - 1, cy + 6], [cx - w + 1, cy + 6]], hex('#c8343a'));
  for (let i = -w + 2; i < w; i += 4) R.pset(cx + i, cy + 5, hex('#f0c030')); };
// un cielo de espacio tramado, con estrellas que titilan, dentro de [x0, y0, x1, y1] (con pset: respeta el recorte)
const espacio = (x0, y0, x1, y1, t, k) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = (y - y0) / (y1 - y0) + (hh(x >> 3, y >> 3, k) - 0.5) * 0.5; R.pset(x, y, v > b4(x, y) * 0.9 + 0.35 ? hex('#3a2470') : v > b4(x, y) * 0.8 - 0.1 ? hex('#1e1a4c') : hex('#12122e')); }
  const n = Math.round((x1 - x0) * (y1 - y0) / 110); for (let i = 0; i < n; i++) { const x = x0 + 1 + Math.floor(hh(i, 1, k) * (x1 - x0 - 2)), y = y0 + 1 + Math.floor(hh(i, 2, k) * (y1 - y0 - 2)), tw = Math.sin(t * 3 + i * 1.7) > 0.5;
    R.pset(x, y, tw ? BL : hex('#8a90c8')); if (i % 7 === 0 && tw) { R.pset(x - 1, y, hex('#8a90c8')); R.pset(x + 1, y, hex('#8a90c8')); R.pset(x, y - 1, hex('#8a90c8')); R.pset(x, y + 1, hex('#8a90c8')); } } };

// 1 · el salón con la tele: la serie de dibujos
const p1 = (t) => {
  const o = { encuadre: 'tele' }; T.cine(R, t, o);
  // las notas de la sintonía, que salen del altavoz de la tele
  for (let k = 0; k < 3; k++) { const u = (t * 0.55 + k / 3) % 1, x = Math.round(240 + Math.sin(u * 6 + k * 2) * 4 + u * 8), y = Math.round(96 - u * 34); if (u < 0.9 && y > 48) { const c = hex(['#e84a5a', '#3a8ae8', '#f0a020'][k]);
    R.rect(x, y - 5, x, y, K); R.rect(x + 1, y - 5, x + 3, y - 4, K); R.rect(x - 2, y, x, y + 1, K); R.pset(x - 1, y, c); R.pset(x - 1, y + 1, c); R.pset(x - 2, y + 1, c); R.pset(x + 2, y - 3, c); } }
  // detrás del sofá: ella ya está mirando; él llega corriendo, y los dos botan con el dado de la tele
  const llega = ease(tramo(t, 0.15, 1.45)), px = Math.round(lerp(-16, 124, llega));
  R.actor(EL.judyJM, 96, 160, t, { dir: llega < 0.6 ? -1 : 1, sonrisa: true, dedo: t > serie - 0.1 && t < serie + 0.9, habla: t > 1.1 && t < serie && Math.sin(t * 9) > 0, salto: bote(t, serie + 0.95) + bote(t, P2 - 0.6) });
  R.actor(EL.peterJM, px, 160, t, { dir: 1, anda: llega < 1, sorpresa: llega >= 1 && t < serie + 0.3, sonrisa: t >= serie + 0.3, brazos: t > serie + 0.4 && Math.sin(t * 12) > -0.2, salto: bote(t, serie + 0.4) + bote(t, serie + 1.25) });
  T.cineDelante(R, t, o);
};
// 2 · la juguetería: el juego de mesa de verdad, y llega la continuación (2002)
const p2 = (t) => {
  const o = { encuadre: 'tele', camara: 'tienda', carrito: lerp(0.02, 0.3, tramo(t, P2, P3)) }; T.cine(R, t, o);
  // el destello de NUESTRA caja en el expositor
  if (t < a2002) for (let k = 0; k < 4; k++) { const an = t * 3 + k * 1.57; destello(150 + Math.cos(an) * 40, 82 + Math.sin(an) * 26, Math.sin(t * 8 + k) > 0 ? 2 : 1, hex('#fff2b8')); }
  // la niña señala la caja y da un bote; la mayor llega detrás y asiente
  const m = ease(tramo(t, P2 - 0.2, P2 + 1.3)), vx = Math.round(lerp(330, 184, ease(tramo(t, a2002 - 0.2, secuela - 0.5)))), alza = t > secuela - 0.15;
  R.actor(EL.tecnicoFX1JM, Math.round(lerp(40, 92, m)), 170, t, { dir: 1, anda: m < 1, sonrisa: true, habla: m >= 1 && t < a2002 && Math.sin(t * 8) > 0.2 });
  R.actor(EL.judyJM, 118, 171, t, { dir: 1, dedo: t < a2002 + 0.9 || alza, sonrisa: !alza, sorpresa: alza, salto: bote(t, P2 + 0.25) + bote(t, P2 + 0.95) + bote(t, secuela + 0.1, 6) });
  // el autor entra con el libro nuevo (el fino, con una estrella) y su etiqueta «2002», y lo levanta al llegar
  if (t > a2002 - 0.2) { const anda = vx > 184, by = alza ? 146 : 153;
    const v = R.actor(EL.vanallsburg, vx, 170, t, { dir: -1, anda, sostiene: [vx - 4, by], sonrisa: true, habla: alza && Math.sin(t * 9) > 0 });
    const lx = v.mano[0] - 3, ly = v.mano[1] + 8; PZ.libroFino(R, lx, ly, {}); destello(lx + 8, ly - 14, 1, hex('#ffd45a')); R.pset(lx + 8, ly - 14, hex('#ffd45a'));
    globo(lx - 20, ly - 38, lx + 20, ly - 24, lx, ly - 20); R.numero('2002', lx, ly - 27, { centro: true, color: hex('#c8362e'), sombra: false });
    if (alza && t < secuela + 0.6) for (let k = 0; k < 6; k++) { const an = k * 1.047 + t * 3, q = 16 + (t - secuela) * 14; destello(lx + Math.cos(an) * q, ly - 10 + Math.sin(an) * q * 0.7, 1, hex('#fff2b8')); } }
};
// 3 · el otro tablero, el de hojalata, a la deriva: los dos chicos que nunca leen las instrucciones
const p3 = (t) => {
  const o = { encuadre: 'espacio' }; const g = T.selva(R, t, o), bx = Math.round(g.pie[0]), by = Math.round(g.pie[1]);
  const v = tramo(t, tira, tira + 3.4), mira = t > otro;
  // el destello que recorre el canto del tablero cuando lo encuentran
  if (t > tablero && t < tablero + 1.1) { const u = (t - tablero) / 1.1; for (let k = 0; k < 3; k++) destello(bx - 56 + (u + k * 0.12) * 112, by + 19 + Math.sin((u + k * 0.12) * 9) * 2, k === 0 ? 2 : 1, hex('#fff2b8')); }
  const c1 = R.actor(EL.chico1JM, bx - 16, by, t, { dir: v > 0 && !mira ? -1 : 1, sostiene: v <= 0, brazos: v > 0 && v < 0.1, sorpresa: mira && t < tablero + 0.7, sonrisa: t >= tablero + 0.7, salto: bote(t, tablero + 0.75, 4) });
  R.actor(EL.chico2JM, bx + 12, by, t, { dir: t < otro - 0.3 ? -1 : 1, habla: t < tira && Math.sin(t * 9) > 0, dedo: t > otro - 0.3, sorpresa: mira && t < tablero + 0.4, sonrisa: t >= tablero + 0.4, salto: bote(t, tablero + 0.3, 4) });
  // las instrucciones: las mira un momento, las tira por encima del hombro y se van flotando, dando vueltas
  if (v <= 0) PZ.instrucciones(R, c1.mano[0] + 1, c1.mano[1] + 7, {});
  else if (v < 1) { const e = 1 - (1 - v) * (1 - v), lx = Math.round(lerp(bx - 22, 26, e)), ly = Math.round(lerp(by - 26, 108, e) - Math.sin(v * Math.PI) * 30 + Math.sin(t * 5) * 2);
    PZ.instrucciones(R, lx, ly, { dir: Math.sin(t * 7) > 0 ? 1 : -1 }); for (let k = 1; k <= 3; k++) R.pset(lx + 6 + k * 4, ly - 6 + Math.round(Math.sin(t * 5 + k) * 2), hex('#8a90c8')); }
  T.selvaDelante(R, t, o);
};
// 4 · (vista añadida) el cuarto: el planeta pasa por la ventana y todo flota
const p4 = (t) => {
  const o = { encuadre: 'espacio', camara: 'ventana', pasa: lerp(0.06, 0.6, tramo(t, P4 + 0.2, P5)) }; T.selva(R, t, o);
  const f = ease(tramo(t, flotar - 0.1, flotar + 1.3)), u1 = ease(tramo(t, P4 + 0.05, flotar - 0.3)), u2 = ease(tramo(t, P4 + 0.3, flotar));
  const s1 = Math.round(f * (15 + Math.sin(t * 1.9) * 3)), s2 = Math.round(f * (10 + Math.sin(t * 1.6 + 2) * 3));
  // la sombra de cada uno en la alfombra, que se encoge al despegar
  for (const [x, s] of [[lerp(34, 112, u1), s1], [lerp(292, 194, u2), s2]]) { const w = 7 - Math.round(s / 5); for (let i = -w; i <= w; i++) if ((i + Math.round(x)) & 1) R.pset(Math.round(x) + 7 + i, 159, hex('#2a2440')); }
  R.actor(EL.chico1JM, Math.round(lerp(34, 112, u1)), 158, t, { dir: 1, anda: u1 < 1, salto: s1, sorpresa: u1 >= 1 && t < flotar + 1.6, sonrisa: t >= flotar + 1.6, brazos: f > 0.2 && f < 1 });
  R.actor(EL.chico2JM, Math.round(lerp(292, 194, u2)), 158, t, { dir: -1, anda: u2 < 1, salto: s2, dedo: u2 >= 1 && (t < flotar || f >= 1), sorpresa: f > 0 && f < 1, sonrisa: f >= 1 });
  // las zapatillas que se les escapan y suben despacio
  if (f > 0.3) for (const [x0, k] of [[104, 0], [214, 1]]) { const y = Math.round(150 - (t - flotar) * (7 + k * 3)), x = x0 + Math.round(Math.sin(t * 2 + k * 3) * 3); if (y > 128) { R.rect(x - 1, y - 2, x + 5, y + 2, K); R.rect(x, y - 1, x + 4, y + 1, hex(k ? '#3a8ae8' : '#d8303a')); R.rect(x, y + 1, x + 4, y + 1, BL); } }
  T.selvaDelante(R, t, o);
};
// 5 · la taquilla de 2005: casi nadie
const PALOMA = ['...kkk...', '..kGGGk..', '..kGeGyy.', '.kGVGGk..', 'kGGGWWk..', '.kkGGk...', '...r.r...'];
const PALP = { k: K, G: hex('#dfe2ec'), e: K, y: hex('#f0a020'), V: hex('#5aa88a'), W: hex('#9aa0b4'), r: hex('#d8665a') };
const p5 = (t) => {
  const ent = tramo(t, a2005 + 0.1, a2005 + 0.9);
  const o = { encuadre: 'fachada', camara: 'taquilla', epoca: 2005, entradas: ent }; T.cine(R, t, o);
  // NUESTRO cartel sobre el del decorado: la bandeja de hojalata, el cohetito que sube y el planeta a rayas (sin anillos)
  R.recorte([24, 66, 70, 128]); espacio(24, 66, 70, 128, t, 5); planeta(57, 80, 7, t); bandeja(46, 116 + Math.round(Math.sin(t * 1.4)), 17);
  { const u = (t * 0.22) % 1, cx = 34 + u * 16, cy = 110 - u * 34; cohete(cx, cy, t); for (let k = 1; k < 5; k++) if ((k + Math.floor(t * 10)) & 1) R.pset(Math.round(cx - k * 1.2), Math.round(cy + 3 + k * 2.6), hex('#8a90c8')); }
  R.recorte(null);
  // …y el pictograma de las entradas del panel: el planeta a rayas, sin anillo
  R.rect(124, 69, 141, 79, hex('#f0a888')); planeta(132, 74, 4, t);
  // hojas secas que el viento arrastra por la acera
  for (let k = 0; k < 5; k++) { const u = (t * (0.16 + k * 0.03) + k * 0.23) % 1, x = Math.round(330 - u * 350), y = 168 + k * 2 + Math.round(Math.sin(u * 30 + k) * 2); R.pset(x, y, hex('#c8843a')); R.pset(x + 1, y, hex('#e8b060')); R.pset(x + 1, y - 1 + (Math.floor(t * 8 + k) & 1), hex('#a8642a')); }
  // el único cliente: llega, saca su entrada, va hacia la puerta, mira atrás… y no hay nadie
  const u1 = ease(tramo(t, P5 + 0.15, a2005 - 0.35)), u2 = ease(tramo(t, a2005 + 1.0, nadie - 0.1)), cx = Math.round(u2 > 0 ? lerp(76, 226, u2) : lerp(-18, 76, u1));
  const atras = t > nadie && t < nadie + 1.25, anda = (u1 > 0 && u1 < 1) || (u2 > 0 && u2 < 1);
  // la paloma: picotea bajo el cartel, echa a volar cuando él llega y vuelve cuando se queda solo
  { const huye = tramo(t, P5 + 0.45, P5 + 1.5), vuelve = tramo(t, nadie + 0.2, nadie + 1.3);
    if (huye <= 0 || vuelve >= 1) { const px = 40 + Math.round(Math.sin(t * 0.9) * 5), pica = Math.sin(t * 7) > 0.5 ? 1 : 0; R.dibujo(PALOMA, px, 157 + pica, Math.sin(t * 0.9 + 1.57) > 0 ? 1 : -1, PALP); }
    else if (huye < 1 || vuelve > 0) { const w = vuelve > 0 ? 1 - vuelve : huye, px = Math.round(40 - w * 60), py = Math.round(157 - Math.sin(Math.min(1, w) * 1.57) * 64), al = Math.floor(t * 12) & 1; R.dibujo(PALOMA.slice(0, 6), px, py, vuelve > 0 ? 1 : -1, PALP); R.linea(px + 2, py + 3, px - 1, py + (al ? -2 : 6), K); R.linea(px + 6, py + 3, px + 10, py + (al ? -2 : 6), K); R.pset(px + 2, py + 2 + (al ? -1 : 2), PALP.W); R.pset(px + 7, py + 2 + (al ? -1 : 2), PALP.W); } }
  const cl = R.actor(EL.tecnicoFX2JM, cx, 166, t, { dir: atras ? -1 : 1, anda, sostiene: ent >= 1 && !atras, sorpresa: atras && t < nadie + 0.5, triste: t > nadie + 1.25, habla: u1 >= 1 && ent <= 0 && Math.sin(t * 9) > 0 });
  if (ent >= 1 && !atras) { const ex = cl.mano[0] + 2, ey = cl.mano[1] - 1; R.rect(ex - 5, ey - 3, ex + 5, ey + 3, K); R.rect(ex - 4, ey - 2, ex + 4, ey + 2, hex('#f0a888')); R.pset(ex - 4, ey, K); R.pset(ex + 4, ey, K); R.rect(ex + 1, ey - 2, ex + 1, ey + 2, hex('#8a2434')); R.disco(ex - 2, ey, 1, hex('#e89040')); }
  if (atras) { const e = Math.min(1, (t - nadie) / 0.15), y0 = Math.round(lerp(128, 116, e)); globo(cx - 6, y0, cx + 14, y0 + 20, cx + 6, y0 + 25); R.icono('?', cx - 1, y0 + 3, hex('#c8362e'), hex('#f0c8b8'), 2); }
  T.cineDelante(R, t, o);
};
// 6 · la sala vacía: recaudó lo que había costado
const balanza = (cx, by, a, igual) => { const L = hex('#d8a830'), Ls = hex('#a87a18'), Lh = hex('#fff0a0'), yl = by - 38 + a, yr = by - 38 - a;
  R.rect(cx - 11, by - 4, cx + 11, by, K); R.rect(cx - 10, by - 3, cx + 10, by - 1, L); R.rect(cx - 10, by - 3, cx + 10, by - 3, Lh); R.rect(cx - 3, by - 40, cx + 3, by - 4, K); R.rect(cx - 2, by - 39, cx + 2, by - 4, L); R.rect(cx + 1, by - 39, cx + 2, by - 4, Ls); R.rect(cx - 2, by - 39, cx - 2, by - 4, Lh);
  for (const d of [-2, -1, 1, 2, 0]) R.linea(cx - 27, yl + d, cx + 27, yr + d, d === 0 ? Lh : Math.abs(d) === 2 ? K : L); R.disco(cx, by - 38, 4, K); R.disco(cx, by - 38, 3, L); R.disco(cx, by - 38, 1, Lh);
  for (const [px, py, s] of [[cx - 27, yl, 0], [cx + 27, yr, 1]]) { R.linea(px, py, px - 10, py + 22, Ls); R.linea(px, py, px + 10, py + 22, Ls); R.disco(px, py, 2, K); R.pset(px, py, Lh);
    R.rect(px - 12, py + 22, px + 12, py + 25, K); R.rect(px - 11, py + 22, px + 11, py + 24, L); R.rect(px - 11, py + 22, px + 11, py + 22, Lh); R.rect(px - 8, py + 25, px + 8, py + 26, K);
    R.icono(s ? 'camara' : 'bolsa', px - 7, py + 5, s ? hex('#c8d4e4') : hex('#8af0a0'), K, 2); }
  if (igual) { R.rect(cx - 7, by - 58, cx + 7, by - 47, K); R.rect(cx - 6, by - 57, cx + 6, by - 48, CREMA); R.rect(cx - 4, by - 55, cx + 4, by - 54, hex('#c8362e')); R.rect(cx - 4, by - 51, cx + 4, by - 50, hex('#c8362e')); } };
const pelicula = (t) => {
  R.recorte([64, 29, 256, 95]); espacio(64, 29, 256, 95, t, 9); planeta(222, 54, 13, t); R.disco(92, 44, 4, K); R.disco(92, 44, 3, hex('#c8ccd8')); R.pset(91, 43, hex('#8a8ea0')); R.pset(93, 45, hex('#8a8ea0'));
  const by = 72 + Math.round(Math.sin(t * 1.3) * 2);
  // la tapa abierta detrás (una noche litografiada) y la antena, y la bandeja
  R.poligono([[134, by - 26], [176, by - 26], [174, by - 8], [136, by - 8]], K); R.poligono([[136, by - 24], [174, by - 24], [172, by - 9], [138, by - 9]], hex('#2a3a8a')); R.disco(146, by - 17, 3, hex('#f0c030')); R.disco(148, by - 18, 3, hex('#2a3a8a')); for (const [i, j] of [[158, -20], [166, -14], [162, -12], [154, -13]]) R.pset(i, by + j, BL);
  R.linea(133, by - 26, 133, by - 36, K); R.pset(133, by - 37, Math.sin(t * 6) > 0 ? hex('#ff5a4a') : hex('#8a2a2a'));
  bandeja(155, by, 24);
  // el cohetito da la vuelta a la bandeja y deja su estela
  const an = t * 1.25, cx = 155 + Math.cos(an) * 62, cy = by - 8 + Math.sin(an) * 20; for (let k = 1; k < 9; k++) { const a2 = an - k * 0.07; if ((k + Math.floor(t * 12)) & 1) R.pset(Math.round(155 + Math.cos(a2) * 62), Math.round(by - 6 + Math.sin(a2) * 20), hex(k < 4 ? '#ffd45a' : '#8a90c8')); }
  cohete(cx, cy, t);
  // dos dados que flotan
  for (const [dx, dy, k] of [[104, 80, 0], [200, 84, 1]]) { const y = dy + Math.round(Math.sin(t * 1.7 + k * 2) * 2); R.rect(dx - 3, y - 3, dx + 3, y + 3, K); R.rect(dx - 2, y - 2, dx + 2, y + 2, hex('#f2ecd8')); R.pset(dx - 1, y - 1, K); R.pset(dx + 1, y + 1, K); if (k) R.pset(dx, y, K); }
  R.recorte(null);
};
const p6 = (t) => {
  const o = { encuadre: 'sala', lleno: 0.05, pantalla: t < acabo ? 'espacio' : 'blanco' }; T.cine(R, t, o);
  if (t < acabo) pelicula(t);
  // la balanza de latón del pasillo: oscila y se queda en el fiel (lo recaudado = lo que costó)
  { const q = Math.max(0, costo - t), a = Math.round(Math.sin(t * 5.5) * Math.min(7, q * 5)); balanza(244, 152, a, t >= costo);
    if (t >= costo && t < costo + 0.5) for (let k = 0; k < 6; k++) { const an = k * 1.047, r = 10 + (t - costo) * 26; R.pset(Math.round(244 + Math.cos(an) * r), Math.round(100 + Math.sin(an) * r * 0.6), hex('#fff2b8')); } }
  // el único espectador: entra con sus palomitas, mira la pantalla, la balanza… y cuando se acaba la película se va
  const u1 = ease(tramo(t, P6 + 0.1, P6 + 1.5)), u2 = tramo(t, acabo + 0.55, P7 + 0.4), ex = Math.round(u2 > 0 ? lerp(104, 4, u2) : lerp(22, 104, u1));
  const e = R.actor(EL.tecnicoFX2JM, ex, 152, t, { dir: u2 > 0 ? -1 : 1, anda: (u1 > 0 && u1 < 1) || u2 > 0, sostiene: true, sorpresa: t > acabo && u2 <= 0, triste: u2 > 0 });
  { const x = e.mano[0] + (u2 > 0 ? -1 : 1), y = e.mano[1] + 4; R.poligono([[x - 4, y - 7], [x + 4, y - 7], [x + 3, y], [x - 3, y]], K); R.poligono([[x - 3, y - 6], [x + 3, y - 6], [x + 2, y - 1], [x - 2, y - 1]], BL); R.linea(x - 2, y - 6, x - 1, y - 1, hex('#d8303a')); R.linea(x + 2, y - 6, x + 1, y - 1, hex('#d8303a')); for (const [i, j] of [[-3, -8], [-1, -9], [1, -8], [3, -9], [0, -10]]) R.pset(x + i, y + j, hex('#fff2b8'));
    if (u2 <= 0 && u1 >= 1 && t < acabo && Math.sin(t * 6) > 0.8) R.pset(x + 2, y - 13, hex('#fff2b8')); }
  T.cineDelante(R, t, o);
};
// 7 · nadie volvió a abrir la caja
const RATON = ['.........kk.', '...kkkkkkPGk', '..kGGGGGGGGk', 'tkGGGGGGGeGp', '.tkGGGGGGGk.', '...kk..kk...'];
const PALR = { k: K, G: hex('#9a94a0'), P: hex('#f0a0a8'), e: K, p: hex('#f08a98'), t: hex('#d88890') };
const p7 = (t) => {
  const u = tramo(t, P7, FIN - 0.1);
  const o = { encuadre: 'calendario', camara: 'caja', polvo: lerp(0.06, 1, u) }; T.cine(R, t, o);
  // el polvo que cae despacio delante de la caja
  for (let k = 0; k < 14; k++) { const v = (t * (0.08 + (k % 4) * 0.02) + k * 0.31) % 1, x = 104 + Math.floor(hh(k, 3, 7) * 116) + Math.round(Math.sin(t + k) * 2), y = Math.round(40 + v * 80); if ((k + Math.floor(t * 3)) % 3) R.pset(x, y, hex('#e8e0c8')); }
  // el ratón: llega por la repisa, olisquea el cierre, el polvo lo hace estornudar y se va por donde vino
  const va = ease(tramo(t, P7 + 0.35, abrio - 0.2)), est = t > cajaW && t < cajaW + 0.3, vuelve = tramo(t, cajaW + 0.45, FIN - 0.25);
  const rx = Math.round(vuelve > 0 ? lerp(211, 324, vuelve) : lerp(324, 211, va)), corre = (va > 0 && va < 1) || vuelve > 0, ry = 109 - (est ? 3 : corre ? Math.floor(t * 12) & 1 : Math.sin(t * 14) > 0.6 ? 1 : 0);
  { const dir = vuelve > 0 ? 1 : -1; RATON.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const c = PALR[f[i]]; if (c == null) continue; const x = rx + (dir > 0 ? i : f.length - 1 - i) * 2, y = ry + j * 2; R.rect(x, y, x + 1, y + 1, c); } }); }
  if (t > cajaW && t < cajaW + 0.7) { const q = (t - cajaW) / 0.7; for (let k = 0; k < 14; k++) { const an = k * 0.45 + 2.2, r = 4 + q * (10 + (k % 3) * 4); if (hh(k, 1, 3) > q * 0.8) { const x = Math.round(206 + Math.cos(an) * r), y = Math.round(110 + Math.sin(an) * r * 0.6 - q * 5); R.pset(x, y, hex('#d8d0bc')); R.pset(x + 1, y, hex('#b8b0a0')); R.pset(x, y - 1, hex('#f0ead8')); } } }
};
const efectos = [[serie + 0.4, 'boing'], [P2 + 0.25, 'pop'], [secuela, 'brillo'], [tira, 'whoosh'], [tablero, 'brillo'], [P4 + 0.5, 'zumbido'], [flotar, 'boing'], [P5 + 0.5, 'viento'], [a2005 + 0.2, 'papel'], [nadie + 0.05, 'pop'], [costo, 'tic'], [acabo, 'interruptor'], [P7 + 0.3, 'viento'], [cajaW, 'vapor']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año: (t) => (t < a2002 - 0.2 ? 1996 : t < P5 ? 2002 : t < P7 ? 2005 : 2005 + Math.min(11, Math.floor(tramo(t, P7 + 0.2, FIN - 0.5) * 11.99))) });
''')

E['jm-velas'] = ('Las velas', '''// JM-VELAS (frase 19), 1995 → 2014, sin cartela. Cinco planos (cortes en had been · and the same painters · on the
// night · Over the next few days):
// 1. el plató de Keene se desmonta: dos del equipo se llevan un bastidor, la ayudante apunta, cajas apiladas, y el
//    pintor cruza por delante con su cubo y la esponja en un palo;  2. la esquina del letrero (pintura lavable, pálida):
//    el pintor deja el cubo, frota la esquina de abajo con la esponja (espuma, churretes) y los vecinos llegan
//    corriendo y lo paran («!» y un corazón): gag 6;  3. la pared de frente: el mismo pintor lo repasa con pintura de
//    la buena (o.buena 0→1) mientras un vecino le sujeta el bote; al acabar baja el andamio, cae la tarde, se encienden
//    los apliques y el año corre hasta 2014;  4. de noche, al pie de la pared: una vecina llega despacio con una vela
//    encendida y la deja; llegan otros dos y las velas se van encendiendo (sobrio: nadie sonríe, nadie salta);
// 5. la calle mayor, de día: los vecinos dejan ramos y notas (rayas) al pie de la casa de los zapatos.''', COMUN + r'''
// el instante en que la voz inglesa dice algo, por su segundo en la toma real (frase «letrero»: 0,5–24,731 s)
const L = (s) => en('letrero', (s - 0.5) / 24.231);
const P2 = L(3.71), P3 = L(9.59), P4 = L(15.36), P5 = L(21.46);
const frota = L(5.81), vecinos = L(7.85), quede = L(8.35), buenaW = L(11.99), agosto = L(13.66), encendio = L(19.04), flores = L(23.5), notas = L(24.2);
// el palo con la esponja en la punta (de la mano a la punta) y el cubo de agua con jabón
const palo = (hx, hy, tx, ty, espuma) => { for (const d of [-1, 1, 0]) R.linea(hx + d, hy, tx + d, ty, d ? K : hex('#c89a5a')); PZ.esponja(R, tx, ty + 4, { espuma }); };
const cubo = (x, y, t) => { R.poligono([[x - 7, y - 11], [x + 7, y - 11], [x + 5, y], [x - 5, y]], K); R.poligono([[x - 6, y - 10], [x + 6, y - 10], [x + 4, y - 1], [x - 4, y - 1]], hex('#8a9ab0')); R.linea(x - 5, y - 9, x - 4, y - 2, hex('#c8d4e4')); R.rect(x - 6, y - 11, x + 6, y - 10, hex('#c8d4e4')); R.rect(x - 5, y - 6, x + 5, y - 6, hex('#5a6a80'));
  for (let k = 0; k < 4; k++) { const bx = x - 5 + k * 3 + (k & 1), b = Math.sin(t * 5 + k * 2) > 0 ? 1 : 0; R.disco(bx, y - 12 - b, 1, BL); R.pset(bx + 1, y - 13 - b, hex('#c8e4f8')); } };
// 1 · el plató se desmonta
const bastidor = (x0, yb) => { const w = 30, h = 42, m = hex('#c89a5a'), ms = hex('#8a6434');
  R.rect(x0, yb - h, x0 + w, yb, K); for (let y = yb - h + 1; y < yb; y++) for (let x = x0 + 1; x < x0 + w; x++) R.pset(x, y, hh(x, y, 4) > 0.9 ? hex('#c8bc98') : (x + y) % 7 === 0 ? hex('#d4c8a4') : hex('#e0d4b4'));
  R.rect(x0 + 1, yb - h + 1, x0 + w - 1, yb - h + 3, m); R.rect(x0 + 1, yb - 3, x0 + w - 1, yb - 1, ms); R.rect(x0 + 1, yb - h + 1, x0 + 3, yb - 1, m); R.rect(x0 + w - 3, yb - h + 1, x0 + w - 1, yb - 1, ms); R.rect(x0 + 1, yb - 22, x0 + w - 1, yb - 20, m); R.rect(x0 + 1, yb - 20, x0 + w - 1, yb - 20, ms);
  R.linea(x0 + 4, yb - 23, x0 + w - 4, yb - h + 4, ms); R.linea(x0 + 4, yb - 22, x0 + w - 4, yb - h + 5, m); R.linea(x0 + 4, yb - 4, x0 + w - 4, yb - 19, ms); R.linea(x0 + 4, yb - 3, x0 + w - 4, yb - 18, m); for (const [i, j] of [[2, 2], [w - 2, 2], [2, h - 2], [w - 2, h - 2]]) R.pset(x0 + i, yb - j, hex('#5a5a66')); };
const carton = (x, yb, w, h, cinta) => { R.rect(x, yb - h, x + w, yb, K); R.rect(x + 1, yb - h + 1, x + w - 1, yb - 1, hex('#c8a070')); R.rect(x + 1, yb - h + 1, x + w - 1, yb - h + 2, hex('#e0bc8a')); R.rect(x + 1, yb - 2, x + w - 1, yb - 1, hex('#9a7448')); R.rect(x + (w >> 1) - 1, yb - h + 1, x + (w >> 1) + 1, yb - 1, hex(cinta)); for (let i = 3; i < w - 2; i += 5) R.pset(x + i, yb - (h >> 1), hex('#9a7448')); };
const p1 = (t) => {
  const o = { encuadre: 'plato' }; T.keene(R, t, o);
  // las cajas ya cerradas, al borde de la tarima, con la claqueta encima
  carton(52, 150, 20, 13, '#e8dcc0'); carton(74, 150, 16, 11, '#c83a3a'); carton(56, 137, 16, 10, '#e8dcc0'); R.rect(58, 124, 70, 127, K); R.rect(59, 125, 69, 126, BL); for (let i = 60; i < 69; i += 4) R.pset(i, 125, K); R.linea(58, 123, 70, 120, K); R.linea(58, 122, 70, 119, BL);
  // dos del equipo se llevan un bastidor hacia la derecha y lo posan
  const u = ease(tramo(t, 0.25, P2 - 0.75)), a = Math.round(lerp(92, 150, u)), anda = u > 0 && u < 1, alto = anda ? 2 + (Math.floor(t * 5) & 1) : 0;
  R.actor(EL.guionista1JM, a, 150, t, { dir: 1, anda, sostiene: [a + 17, 134 - alto], habla: !anda && Math.sin(t * 9) > 0 });
  bastidor(a + 15, 149 - alto);
  R.actor(EL.tecnicoFX1JM, a + 44, 150, t, { dir: -1, anda, sostiene: [a + 44, 134 - alto], sonrisa: !anda });
  if (!anda && u >= 1 && t < P2 - 0.45) for (let k = 0; k < 5; k++) { const q = (t - (P2 - 0.75)) / 0.3; R.pset(a + 16 + k * 7, 150 - Math.round(q * 3), hex('#c8bc98')); R.pset(a + 13 + k * 7 - Math.round(q * 3), 149, hex('#c8bc98')); }
  // la ayudante repasa la lista
  const ay = R.actor(EL.guionista2JM, 226, 150, t, { dir: -1, sostiene: true, habla: Math.sin(t * 7) > 0.3 && t > 1 && t < 2.6, dedo: false });
  { const x = ay.mano[0], y = ay.mano[1]; R.rect(x - 4, y - 6, x + 4, y + 5, K); R.rect(x - 3, y - 5, x + 3, y + 4, hex('#c89a5a')); R.rect(x - 2, y - 3, x + 2, y + 3, BL); R.rect(x - 1, y - 6, x + 1, y - 5, hex('#8a8e9c')); const n = Math.min(3, Math.floor(t * 0.9)); for (let j = 0; j < 3; j++) { R.rect(x, y - 2 + j * 2, x + 2, y - 2 + j * 2, hex('#8a8698')); if (j < n) R.pset(x - 2, y - 2 + j * 2, hex('#3aa85a')); } }
  T.keeneDelante(R, t, o);
  // el pintor cruza por delante hacia la calle, con el cubo y la esponja en su palo
  const px = Math.round(lerp(282, 36, tramo(t, 0, P2 + 0.3)));
  const pin = R.actor(EL.pintorJM, px, 172, t, { dir: -1, anda: true, sostiene: [px - 2, 160] });
  palo(pin.mano[0], pin.mano[1] + 4, pin.mano[0] + 14, pin.mano[1] - 30, false); cubo(px + 20, 171 - (Math.floor(t * 5) & 1), t);
};
// 2 · la esquina: va a lavarlo y los vecinos lo paran (gag 6)
const corazon = (x, y, c) => { for (const [i, j, w] of [[-3, 0, 2], [1, 0, 2], [-4, 1, 8], [-4, 2, 8], [-3, 3, 6], [-2, 4, 4], [-1, 5, 2]]) R.rect(x + i, y + j, x + i + w, y + j, c); R.pset(x - 2, y + 1, hex('#ffb0b0')); };
const p2 = (t) => {
  const o = { encuadre: 'calle', camara: 'esquina', lavable: true, pintores: true }; const g = T.keene(R, t, o), le = g.letrero ?? [62, 62, 152, 124];
  const u = ease(tramo(t, P2 - 0.3, frota - 0.55)), px = Math.round(lerp(236, 92, u)), anda = u < 1, lava = t >= frota && t < vecinos + 0.15, parado = t >= vecinos + 0.15;
  // lo ya lavado: la esquina de abajo del letrero deja ver el ladrillo, con espuma y churretes que bajan por el muro
  const w = tramo(t, frota, vecinos + 0.1), tx0 = le[0] + 22, ty0 = le[3] - 12;
  if (w > 0) { R.recorte([le[0] + 4, le[1] + 4, le[2] - 4, le[3] + 30]);
    for (let j = -9; j <= 7; j++) for (let i = -16; i <= 16; i++) { const d = Math.hypot(i / 16, j / 8); if (d < w * 1.05 - hh(i, j, 2) * 0.3) { const x = tx0 + i, y = ty0 + j + Math.round(i * 0.06); R.pset(x, y, (y % 4 === 0) || ((x + (y >> 2) * 4) % 8 === 0) ? hex('#d8c8b0') : hh(x, y, 6) > 0.7 ? hex('#6e2c20') : hex('#8a3a2a')); } }
    for (let k = 0; k < 5; k++) { const x = tx0 - 12 + k * 6, len = Math.round(Math.max(0, w - k * 0.12) * (14 + (k % 3) * 5)); for (let j = 0; j < len; j++) R.pset(x + (j > 8 ? 1 : 0), ty0 + 8 + j, j === len - 1 ? BL : hex('#c8dcec')); }
    R.recorte(null);
    if (t < vecinos + 0.8) for (let k = 0; k < 6; k++) { const x = tx0 - 12 + Math.floor(hh(k, 1, 8) * 26), y = ty0 - 6 + Math.floor(hh(k, 2, 8) * 12) - Math.round(((t * 0.8 + k * 0.3) % 1) * 3), r = (k + Math.floor(t * 4)) % 3 ? 2 : 1; R.disco(x, y, r, BL); R.pset(x - 1, y - 1, hex('#c8e4f8')); } }
  // los vecinos llegan corriendo
  const v1 = ease(tramo(t, vecinos - 0.75, vecinos + 0.2)), v2 = ease(tramo(t, vecinos - 0.45, vecinos + 0.55));
  const x1 = Math.round(lerp(330, 132, v1)), x2 = Math.round(lerp(340, 160, v2));
  if (v2 > 0) R.actor(EL.vecina2JM, x2, 157, t, { dir: -1, anda: v2 < 1, sonrisa: t > quede + 0.6, habla: v2 >= 1 && t < quede + 0.9 && Math.sin(t * 10) > 0, dedo: v2 >= 1 && t > quede && t < P3 - 0.25 });
  if (v1 > 0) R.actor(EL.vecino1JM, x1, 156, t, { dir: -1, anda: v1 < 1, brazos: v1 >= 1 && t < quede + 0.2 && Math.sin(t * 14) > -0.3, enfado: v1 >= 1 && t < quede, sonrisa: t > quede + 0.9, salto: bote(t, vecinos + 0.25, 4) });
  // el pintor: llega, deja el cubo, moja la esponja y frota; al oírlos se vuelve con la esponja en alto
  const fy = lava ? Math.round(Math.sin(t * 11) * 4) : 0, fx = lava ? Math.round(Math.cos(t * 5.5) * 7) : 0;
  const pin = R.actor(EL.pintorJM, px, 156, t, { dir: parado ? 1 : -1, anda, sostiene: parado ? [px + 16, 142] : anda ? [px - 2, 144] : [px - 2, 138 + (lava ? fy >> 1 : 0)], sorpresa: parado && t < quede + 0.5, sonrisa: t > quede + 0.9 });
  cubo(anda ? px + 22 : 116, anda ? 155 - (Math.floor(t * 5) & 1) : 156, t);
  if (parado) palo(pin.mano[0], pin.mano[1] + 3, pin.mano[0] + 3, pin.mano[1] - 30, true);
  else if (anda) palo(pin.mano[0], pin.mano[1] + 4, pin.mano[0] + 12, pin.mano[1] - 30, false);
  else palo(pin.mano[0], pin.mano[1] + 3, lava ? tx0 + fx : pin.mano[0] - 8, lava ? ty0 - 4 + fy : pin.mano[1] - 32, true);
  // «!» del vecino y el corazón de la vecina: que se quede
  if (v1 >= 1 && t < quede + 0.1) { const y0 = 114 - bote(t, vecinos + 0.25, 4); globo(x1 + 1, y0, x1 + 15, y0 + 18, x1 + 8, y0 + 23); R.icono('!', x1 + 5, y0 + 2, hex('#c8362e'), hex('#f0c8b8'), 2); }
  if (t > quede && t < P3 - 0.1) { const e = Math.min(1, (t - quede) / 0.15), y0 = Math.round(lerp(124, 108, e)); globo(x2 - 3, y0, x2 + 19, y0 + 20, x2 + 8, y0 + 25); corazon(x2 + 8, y0 + 7 - (Math.sin(t * 9) > 0.5 ? 1 : 0), hex('#d8303a')); }
  T.keeneDelante(R, t, o);
};
// 3 · la pared: lo repasan con pintura de la buena; cae la tarde y pasan los años
const p3 = (t) => {
  const pinta = tramo(t, P3 + 0.25, agosto - 0.55), hecho = pinta >= 1, baja = ease(tramo(t, agosto - 0.35, agosto + 0.75)), d = tramo(t, agosto, P4);
  const o = { encuadre: 'pared', letrero: 1, lavable: true, buena: pinta, andamio: hecho ? [214, Math.round(lerp(112, 148, baja))] : true }; const g = T.keene(R, t, o);
  const ax = Math.round(g.andamio.x) - 24, ay = g.andamio.y, by = ay - 18 + Math.round(Math.sin(t * 8) * 7);
  // el brillo de la pintura fresca en el frente
  if (!hecho && pinta > 0) for (let k = 0; k < 4; k++) destello(g.xBuena - 3 - k * 9 + Math.round(Math.sin(t * 3 + k) * 3), 50 + ((k * 23 + Math.floor(t * 3) * 11) % 56), (k + Math.floor(t * 6)) % 3 === 0 ? 2 : 1, hex('#fff2b8'));
  if (!hecho) { const p = R.actor(EL.pintorJM, ax, ay, t, { dir: 1, sostiene: [ax + 22, by] }); PZ.brocha(R, p.mano[0] + 2, p.mano[1] + 9, {}); if (Math.sin(t * 8) > 0.5) { R.pset(p.mano[0] + 4, p.mano[1] + 12, hex('#d8303a')); R.pset(p.mano[0], p.mano[1] + 15, hex('#d8303a')); } }
  else R.actor(EL.pintorJM, ax, ay, t, { dir: 1, brazos: t < agosto + 0.2 && Math.sin(t * 10) > -0.3, sonrisa: true, dedo: t > agosto + 0.9 && d < 0.6 });
  T.keeneDelante(R, t, o);
  // abajo, a la derecha: el vecino le tiende el bote de la buena, la vecina aplaude al acabar; al caer la tarde se van
  const ida = tramo(t, agosto + 0.25, P4 - 0.1), s = Math.round(ida * 70);
  const v1 = R.actor(EL.vecino1JM, 226 + s, 160, t, { dir: ida > 0 ? 1 : -1, anda: ida > 0, sostiene: ida > 0 ? true : [222, 140 - (Math.sin(t * 3) > 0.6 ? 2 : 0)], sonrisa: true });
  PZ.botePintura(R, v1.mano[0] - (ida > 0 ? -2 : 2), v1.mano[1] + 14, {}); if (t > buenaW && t < buenaW + 0.9) destello(v1.mano[0] - 2, v1.mano[1] - 6, Math.sin(t * 16) > 0 ? 3 : 2, hex('#fff2b8'));
  R.actor(EL.vecina2JM, 248 + Math.round(s * 1.1), 161, t, { dir: ida > 0 ? 1 : -1, anda: ida > 0, sonrisa: true, dedo: t > buenaW - 0.4 && !hecho, brazos: hecho && ida <= 0 && Math.sin(t * 15) > 0 });
  // cae la tarde: el muro se dora y luego se queda en azul; se encienden los apliques
  if (d > 0) { const oro = 0.32 * Math.sin(Math.PI * Math.min(1, d * 1.25)), no = 0.6 * ease(Math.max(0, (d - 0.3) / 0.7)), c1 = hex('#f09a4a'), c2 = hex('#141a44');
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let c = R.pget(x, y); if (oro > 0.01) c = mez(c, c1, oro); if (no > 0.01) c = mez(c, c2, no); R.pset(x, y, c); }
    if (d > 0.55) for (const fx of [112, 196]) { const f = Math.min(1, (d - 0.55) / 0.15); for (let j = 0; j < 30; j++) for (let i = -j * 0.7 - 3; i <= j * 0.7 + 3; i++) { const x = Math.round(fx + i), y = 31 + j; if (f * (1 - j / 34) > b4(x, y) * 1.1 + 0.1) R.pset(x, y, mez(R.pget(x, y), hex('#ffd880'), 0.5)); } R.rect(fx - 2, 28, fx + 2, 30, hex('#fff2b8')); } }
};
// 4 · agosto de 2014, de noche: las velas al pie de la pared (sobrio)
const VELAS_T = [0, 0.5, 0.95, 1.3, 1.5, 1.7, 1.85, 2.0, 2.1, 2.2, 2.28, 2.35];
const p4 = (t) => {
  let n = 0; for (const dt of VELAS_T) if (t >= encendio + dt) n++;
  const o = { encuadre: 'pared', camara: 'pie', velas: n }; T.keene(R, t, o);
  // una vecina llega despacio con una vela encendida, la deja y se aparta; por la derecha llegan otros dos con las suyas
  const u = tramo(t, P4 + 0.15, encendio - 0.25), atras = ease(tramo(t, encendio + 0.2, encendio + 1.1)), ax = Math.round(atras > 0 ? lerp(131, 58, atras) : lerp(-18, 131, u));
  const a = R.actor(EL.vecina2JM, ax, 153, t, { dir: 1, anda: (u > 0 && u < 1) || (atras > 0 && atras < 1), sostiene: n < 1 ? [ax + 17, 138] : false, triste: true });
  if (n < 1) PZ.vela(R, a.mano[0] + 2, a.mano[1] + 6, { t });
  const u2 = tramo(t, P4 + 1.5, encendio + 0.3), bx = Math.round(lerp(334, 240, u2)), u3 = tramo(t, P4 + 3.0, encendio + 1.2), cx = Math.round(lerp(338, 263, u3));
  const c = R.actor(EL.vecina3JM, cx, 156, t, { dir: -1, anda: u3 > 0 && u3 < 1, sostiene: n < 6 ? [cx - 3, 142] : false, triste: true }); if (n < 6) PZ.vela(R, c.mano[0] - 2, c.mano[1] + 6, { t: t + 1 });
  const b = R.actor(EL.vecino1JM, bx, 153, t, { dir: -1, anda: u2 > 0 && u2 < 1, sostiene: n < 3 ? [bx - 3, 139] : false, triste: true }); if (n < 3) PZ.vela(R, b.mano[0] - 2, b.mano[1] + 6, { t: t + 2 });
  T.keeneDelante(R, t, o);
};
// 5 · los días siguientes: flores y notas
const nota = (x, y, c) => { R.rect(x - 4, y - 5, x + 4, y + 5, K); R.rect(x - 3, y - 4, x + 3, y + 4, hex(c)); for (let j = -2; j <= 2; j += 2) R.rect(x - 2, y + j, x + (j === 2 ? 0 : 2), y + j, hex('#6a6478')); R.pset(x, y - 4, hex('#c83a3a')); };
const OFRENDAS = [[0, 'ramo', 131, 133], [0, 'nota', 126, 108, '#f6f2ea'], [0, 'vela', 146, 134], [0.5, 'ramo', 160, 134], [1.0, 'nota', 142, 106, '#f8e89a'], [1.5, 'ramo', 147, 136], [2.3, 'ramo', 174, 133], [2.9, 'nota', 158, 109, '#f6c8d0'], [3.3, 'vela', 122, 135], [3.8, 'nota', 172, 105, '#c8e4f8'], [4.3, 'ramo', 118, 137]];
const p5 = (t) => {
  const o = { encuadre: 'calle', epoca: 2014 }; T.keene(R, t, o);
  const deja = flores - 0.1, pega = notas + 0.1;
  for (const [dt, que, x, y, c] of OFRENDAS) { const t0 = dt === 2.3 ? deja : dt === 2.9 ? pega : P5 + dt * 0.9; if (t < t0) continue; const cae = Math.max(0, 1 - (t - t0) / 0.18) * 3 | 0;
    if (que === 'ramo') PZ.ramo(R, x, y - cae, {}); else if (que === 'vela') PZ.vela(R, x, y - cae, { t: t + x }); else nota(x, y - cae, c); }
  // la vecina llega con un ramo y lo deja; el chaval pega su nota en la pared; el vecino, con el gorro en la mano, se queda un momento
  const u3 = ease(tramo(t, P5 + 0.2, deja - 0.1)), x3 = Math.round(lerp(248, 180, u3)), fuera = tramo(t, deja + 0.5, deja + 3.2);
  const v3 = R.actor(EL.vecina3JM, Math.round(x3 + fuera * 60), 135, t, { dir: fuera > 0 ? 1 : -1, anda: (u3 > 0 && u3 < 1) || fuera > 0, sostiene: t < deja ? [x3 - 3, 121] : false, triste: true });
  if (t < deja) PZ.ramo(R, v3.mano[0] - 3, v3.mano[1] + 9, {});
  const u4 = ease(tramo(t, P5 - 0.2, pega - 0.1)), x4 = Math.round(lerp(78, 140, u4));
  const ch = R.actor(EL.nino2017JM, x4, 136, t, { dir: 1, anda: u4 > 0 && u4 < 1, sostiene: t < pega ? [x4 + 16, u4 >= 1 ? 116 : 124] : false, dedo: t >= pega && t < pega + 1.2, triste: true });
  if (t < pega) nota(ch.mano[0] + 2, ch.mano[1] - 2, '#f6c8d0');
  { const u1 = ease(tramo(t, P5 - 0.2, P5 + 2.0)); R.actor(EL.vecino1JM, Math.round(lerp(30, 98, u1)), 135, t, { dir: 1, anda: u1 < 1, triste: true }); }
  T.keeneDelante(R, t, o);
};
const efectos = [[P2 - 0.75, 'toc'], [frota - 0.45, 'chof'], [frota + 0.3, 'burbujas'], [vecinos + 0.2, 'pop'], [P3 + 0.4, 'chof'], [buenaW, 'brillo'], [agosto - 0.5, 'palmada'], [agosto + 1.0, 'interruptor'], [encendio, 'tic'], [flores - 0.1, 'papel']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: (t) => (t < agosto + 0.2 ? 1995 : t < P4 ? 1995 + Math.floor(tramo(t, agosto + 0.2, P4 - 0.15) * 19) : 2014) });
''')
