E = {}

# piezas comunes de las dos escenas (cielos tramados, nubes de tres tonos, pájaros, madera, búferes)
PRE = r'''
const C = T.C;
const H = (s) => hex(s);
const cols = (...a) => a.map(hex);
const lin = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));
const suave = (v) => { v = Math.max(0, Math.min(1, v)); return v * v * (3 - 2 * v); };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bay = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const hs = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
const tono = (cs, f, x, y) => cs[Math.max(0, Math.min(cs.length - 1, Math.floor(f * (cs.length - 1) + bay(x, y))))];
// la zona de Atom y la barra del año: ahí no se pinta detalle
const tranquila = (x, y) => (x >= 272 && y <= 48) || (x >= 14 && x <= 176 && y <= 22);
// lo fijo de cada plano se pinta una vez en su búfer y se copia en cada fotograma
const CAPAS = new Map();
const capa = (clave, dibuja) => { let b = CAPAS.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); CAPAS.set(clave, b); } R.copiar(b); };
// cielo tramado de arriba (y0) abajo (y1) con la rampa cs
const cieloT = (y0, y1, cs, x0 = 0, x1 = 319) => { for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0); for (let x = x0; x <= x1; x++) R.pset(x, y, tono(cs, f, x, y)); } };
// nube de tres tonos (cs = [luz, base, sombra]) centrada en (cx, cy), de ancho w; borde tramado; no entra en las zonas tranquilas
const BOLAS = [[0, 0, 0.5], [-0.3, 0.1, 0.32], [0.32, 0.08, 0.34], [-0.1, -0.2, 0.3], [0.16, -0.14, 0.3], [0.44, 0.16, 0.2]];
const nube = (cx, cy, w, cs, rec = null, masc = null) => {
  const h = Math.max(4, w * 0.36);
  for (let y = Math.floor(cy - h); y <= cy + h * 0.5; y++) for (let x = Math.floor(cx - w * 0.62); x <= cx + w * 0.62; x++) {
    if (x < 0 || x > 319 || tranquila(x, y)) continue;
    if (rec && (x < rec[0] || x > rec[2] || y < rec[1] || y > rec[3])) continue;
    if (masc && masc(x, y)) continue;
    let d = 9; for (const [bx, by, r] of BOLAS) { const dx = (x - (cx + bx * w)) / (r * w), dy = (y - (cy + by * w)) / (r * w * 0.7); d = Math.min(d, dx * dx + dy * dy); }
    if (d > 1 || y > cy + h * 0.45) continue; if (d > 0.8 && bay(x, y) < 0.5) continue;
    const v = (y - (cy - h)) / (h * 1.45); R.pset(x, y, y > cy + h * 0.32 ? cs[2] : tono(cs, v, x, y));
  }
};
// nubes que pasan a tres velocidades: lista de [x0, y, w, velocidad]
const nubes = (t, lista, cs, rec = null, masc = null) => { for (const [x0, y, w, v] of lista) nube(((x0 + t * v) % 420 + 420) % 420 - 50, y, w, cs, rec, masc); };
// un pájaro pequeño que aletea
const pajaro = (x, y, t, c) => { x = Math.round(x); y = Math.round(y); if (tranquila(x, y)) return; const a = Math.floor(t * 7 + x * 0.3) % 2; R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x + 1, y - a, c); R.pset(x - 2, y - 1 + 2 * a, c); R.pset(x + 2, y - 1 + 2 * a, c); };
// madera con vetas en tablas horizontales (cs = [oscuro, base, claro])
const madera = (x0, y0, x1, y1, cs, alto = 14, sem = 0) => {
  for (let y = y0; y <= y1; y++) { const tabla = Math.floor((y - y0) / alto), yy = (y - y0) % alto;
    for (let x = x0; x <= x1; x++) { const g = Math.sin(x * 0.06 + tabla * 3.1 + Math.sin(x * 0.017 + tabla * 1.7) * 3 + yy * 0.75 + sem);
      let c = cs[1]; if (g > 0.88) c = cs[0]; else if (g < -0.86) c = cs[2]; if (hs(x, y, sem) > 0.95) c = mez(c, cs[0], 0.5);
      if (yy === alto - 1) c = cs[0]; if (yy === 0) c = mez(c, cs[2], 0.4); R.pset(x, y, c); } }
};
// estrellas que titilan entre y0 e y1 (fuera de las zonas tranquilas y de la máscara fuera(x, y))
const estrellas = (t, n, y0, y1, sem = 0, fuera = null) => {
  for (let k = 0; k < n; k++) { const x = Math.floor(hs(k, 1, sem) * 320), y = Math.floor(y0 + hs(k, 2, sem) * (y1 - y0));
    if (tranquila(x, y) || (fuera && fuera(x, y))) continue; const b = Math.sin(t * (1.5 + hs(k, 3, sem) * 3) + k) ;
    R.pset(x, y, b > 0.6 ? H('#ffffff') : b > -0.2 ? H('#c8d4f0') : H('#7a88b8'));
    if (hs(k, 4, sem) > 0.86 && b > 0.3) { R.pset(x - 1, y, H('#8a98c8')); R.pset(x + 1, y, H('#8a98c8')); R.pset(x, y - 1, H('#8a98c8')); R.pset(x, y + 1, H('#8a98c8')); } }
};
// el vapor que sube de una taza
const vapor = (x, y, t, c = H('#f4f0e8')) => { for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1, xx = Math.round(x + Math.sin(u * 7 + k * 2) * 2), yy = Math.round(y - u * 14); if (u < 0.8 && bay(xx, yy) < 1 - u) { R.pset(xx, yy, c); if (u < 0.5) R.pset(xx, yy - 1, c); } } };
// una chapa de aluminio de canto (de (x0, y0) a (x1, y1), con su cara de arriba de g píxeles)
const chapa = (x0, y0, x1, y1, g = 3) => {
  x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
  const n = Math.max(1, Math.round(Math.hypot(x1 - x0, y1 - y0)));
  for (let i = 0; i <= n; i++) { const x = Math.round(x0 + (x1 - x0) * i / n), y = Math.round(y0 + (y1 - y0) * i / n);
    R.pset(x, y - 1, C.k); R.pset(x, y, H('#f4f8fc')); for (let k = 1; k < g; k++) R.pset(x, y + k, i % 10 === 5 && k === 1 ? H('#6e7680') : k === g - 1 ? H('#8a929c') : H('#c4ccd4')); R.pset(x, y + g, C.k); }
  R.linea(x0, y0 - 1, x0, y0 + g, C.k); R.linea(x1, y1 - 1, x1, y1 + g, C.k);
};
'''

E['wo-oreja'] = ('La gran oreja', r'''// WO-OREJA (frases 4–5), 1956–1961, sin cartela. Siete planos, todos con acción y vida de fondo:
// 1. «a field in Ohio, near Delaware»: la gran oreja en obras (1958) a la luz de la tarde, con la grúa, los obreros y la
//    camioneta; dos obreros acarrean una chapa por la hierba y la dejan en el suelo («Delaware», golpe); uno se gira a
//    hablar y la otra señala el campo;
// 2. «between 1956 and 1961»: a ras del suelo de metal, con los andamios del plano y el curvo; la barra del año corre de
//    1956 a 1961; un obrero cruza con una chapa sobre la cabeza; a «engineer John Kraus» entra Kraus con el rollo de
//    planos y lo despliega; a «his students» llega un estudiante, que señala el curvo;
// 3. «built a huge radio telescope… Big Ear»: el taller al pie del curvo a medio chapar (fondo local): dos estudiantes
//    remachan una chapa sobre los caballetes (chispas y golpes); el gancho de la grúa baja, a «built» la levantan entre
//    los dos y se la enganchan; la grúa la sube, balanceándose, hasta el hueco del curvo y encaja a «Big Ear» (destello);
//    Kraus deja el plano en la caja y señala; los estudiantes lo celebran;
// 4. «It didn't look like the dishes in the movies»: las antenas «de película» de hoy, con un equipo de rodaje diminuto:
//    la claqueta entra, se cierra a «movies» y todas las antenas giran a la vez, como en el cine; la claqueta se va;
// 5. «two metal walls, one flat and tilted, one curved»: el cianotipo del perfil sobre la mesa de dibujo (fondo local):
//    la mano izquierda repasa el plano inclinado con el lápiz a «flat», la derecha el curvo a «curved»; vapor del café;
// 6. «an aluminum floor… bigger than three football fields… it didn't move»: la gran oreja desde el aire entre maizales
//    (fondo local), con las sombras de las nubes, los pájaros y un coche en la carretera; a «three», «football» y
//    «fields» caen tres campos de fútbol dentro del suelo de metal y sobra sitio;
// 7. «as the Earth turned, it carried the sky past… like a conveyor belt»: el esquema de la deriva: la Tierra gira y
//    el cielo pasa (o.u); a los lados, dos rodillos de cinta que giran; a «conveyor belt» una estrella se cae de la
//    cinta por la derecha y rebota en la Tierra (gag 2).
''', PRE + r'''
const o1 = (f) => en('ohio', f), o2 = (f) => en('cinta', f);
const P2 = o1(0.248), P3 = o1(0.654), P4 = o1(1.06), P5 = o2(0.142), P6 = o2(0.397), P7 = o2(0.707);
const DELAWARE = o1(0.184), Y1956 = o1(0.301), Y1961 = o1(0.408), INGENIERO = o1(0.509), ESTUDIANTES = o1(0.605);
const CONSTRUYE = o1(0.732), ENORME = o1(0.779), BIGEAR = o1(0.939);
const PELIS = o2(0.051), MUROS = o2(0.170), PLANO = o2(0.250), CURVO = o2(0.341);
const TRES = o2(0.535), FUTBOL = o2(0.552), CAMPOS = o2(0.574), NOSEMUEVE = o2(0.651), CINTA = o2(0.948);

// ── 1 · el campo en obras: dos obreros dejan una chapa ──────────────────────────────────────────────────────────
const p1 = (t) => {
  const o = { encuadre: 'campo', epoca: 1958, luz: 'tarde' };
  T.oreja(R, t, o);
  const u = suave(lin(t, 0.3, DELAWARE - 0.15)), xa = Math.round(lerp(100, 178, u)), xb = xa - 34, anda = u > 0 && u < 1;
  const baja = lin(t, DELAWARE - 0.15, DELAWARE + 0.15), libres = t > DELAWARE + 0.35;
  const A = R.actor(EL.operario, xa, 166, t, { dir: libres && t > DELAWARE + 0.7 ? -1 : 1, anda, sostiene: libres ? undefined : [xa + 18, 156 + baja * 5], habla: t > DELAWARE + 0.8 && Math.sin(t * 9) > 0, sonrisa: t > DELAWARE + 0.8 });
  const B = R.actor(EL.operaria, xb, 166, t, { dir: 1, anda, sostiene: libres ? undefined : [xb + 18, 156 + baja * 5], dedo: t > DELAWARE + 0.9 });
  if (!libres) chapa(B.mano[0] - 6, B.mano[1] - 1, A.mano[0] + 5, A.mano[1] - 1, 3);
  else { chapa(xb + 14, 167, xa + 22, 167, 2); }
  T.orejaDelante(R, t, o);
};
// ── 2 · a ras del suelo: Kraus despliega los planos ─────────────────────────────────────────────────────────────
const p2 = (t) => {
  const o = { encuadre: 'campo', camara: 'muros', epoca: 1958 };
  T.oreja(R, t, o);
  // el obrero que cruza con una chapa sobre la cabeza
  const w = lin(t, P2 + 0.1, P2 + 2.7), wx = Math.round(lerp(30, 336, w));
  if (w > 0 && w < 1) { R.actor(EL.operario, wx, 160, t, { dir: 1, anda: true, sostiene: [wx + 15, 136] }); chapa(wx - 10, 133, wx + 26, 129, 2); }
  // Kraus entra con el rollo y lo despliega; el estudiante llega y señala el curvo
  const k = suave(lin(t, INGENIERO - 0.8, INGENIERO + 0.35)), kx = Math.round(lerp(326, 196, k));
  const s = suave(lin(t, ESTUDIANTES - 1.2, ESTUDIANTES + 0.2)), sx = Math.round(lerp(-18, 150, s));
  const abre = lin(t, INGENIERO + 0.5, INGENIERO + 0.8);
  const K = R.actor(EL.krausWO, kx, 160, t, { dir: -1, anda: k > 0 && k < 1, sostiene: [kx - 6, 146], habla: t > ESTUDIANTES + 0.3 && Math.sin(t * 8) > 0 });
  const [mx, my] = K.mano;
  if (abre < 1) { R.rect(mx - 2, my - 6, mx + 1, my + 3, C.k); R.rect(mx - 1, my - 5, mx, my + 2, H('#3a6ab8')); R.pset(mx - 1, my - 5, H('#8ab4e8')); }
  else { const w2 = 12; R.rect(mx - w2, my - 7, mx + 1, my + 2, C.k); R.rect(mx - w2 + 1, my - 6, mx, my + 1, H('#2a5aa8')); for (let i = mx - w2 + 2; i < mx; i += 3) R.pset(i, my - 3, H('#d8e8ff')); R.linea(mx - w2 + 2, my - 1, mx - 2, my - 5, H('#d8e8ff')); }
  R.actor(EL.empollon, sx, 160, t, { dir: 1, anda: s > 0 && s < 1, dedo: t > ESTUDIANTES + 0.35 && t < P3 - 0.1, sonrisa: t > ESTUDIANTES + 0.2 });
  T.orejaDelante(R, t, o);
};

// ── 3 · el taller al pie del curvo a medio chapar (fondo local) ─────────────────────────────────────────────────
const TOPE = (x) => 52 + 26 * Math.pow((319 - x) / 223, 1.3);
const BORDE0 = 188, HUECO = [172, 188];   // donde acaba lo chapado y el hueco de la última chapa
const tallerFondo = () => capa('taller', () => {
  cieloT(0, 112, cols('#3e6ec8', '#5684d2', '#719cdc', '#8eb2e4', '#acc8ec', '#c8dcf0', '#dfe9f0'));
  // el horizonte: arboleda azulada y maizales lejanos
  for (let x = 0; x < 320; x++) { const h = 6 + Math.round(3 * Math.sin(x * 0.08) + 2 * Math.sin(x * 0.21 + 1) + hs(x, 3) * 2);
    for (let y = 110 - h; y <= 112; y++) R.pset(x, y, tono(cols('#6a8aa0', '#5a7a88', '#4e6e6a'), (y - 110 + h) / (h + 2), x, y)); }
  // el curvo a medio chapar: chapa gris con juntas y costillas a la derecha; a la izquierda, solo costillas y largueros
  for (let x = 96; x < 320; x++) { const top = Math.round(TOPE(x));
    for (let y = top; y <= 112; y++) { const v = (y - top) / (112 - top);
      if (x >= BORDE0) { let c = tono(cols('#eef2f6', '#cdd4dc', '#aeb6c0', '#8e96a0', '#767e88'), v, x, y);
        if ((y - top) % 10 === 0) c = H('#6e7680'); if ((x - 96) % 16 === 0) c = H('#5e6670'); else if ((x - 96) % 16 === 1) c = H('#f4f8fc'); if (hs(x, y, 2) > 0.985) c = H('#5e6670'); R.pset(x, y, c); }
      else if ((x - 96) % 16 < 2) R.pset(x, y, (x - 96) % 16 ? H('#7a828c') : H('#c8d0d8'));
      else if ((y - top) % 12 === 0) R.pset(x, y, H('#9aa2ac'));
      else if ((y - top) % 12 === 1 && (x + y) % 2) R.pset(x, y, H('#7e8690')); }
    R.pset(x, top, H('#ffffff')); R.pset(x, top - 1, H('#3a3e48')); if (x % 16 === 0) for (let y = 112; y < 116; y++) R.pset(x, y, H('#5a5e66')); }
  // los postes y riostras del curvo
  for (let x = 104; x < 320; x += 32) { R.rect(x, 104, x + 1, 116, H('#5a5e66')); R.linea(x, 116, x + 16, 104, H('#6a6e76')); }
  // el andamio en el borde de lo chapado
  for (const x of [176, 192]) R.rect(x, 64, x, 116, H('#8a5a2a'));
  for (let y = 70; y < 116; y += 11) { R.rect(174, y, 196, y + 1, H('#b07a3a')); R.rect(174, y + 2, 196, y + 2, H('#6a4422')); R.linea(176, y + 3, 192, y + 10, H('#7a5030')); }
  // el suelo de tierra: grava, rodadas, un charco con el cielo
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const v = (y - 112) / 68; let c = tono(cols('#a08a6a', '#94785a', '#86684c', '#7a5e44'), v + (hs(x >> 1, y >> 1, 4) - 0.5) * 0.25, x, y);
    if (hs(x, y, 5) > 0.97) c = H('#c8b496'); if (hs(x, y, 6) > 0.985) c = H('#5a4430'); R.pset(x, y, c); }
  for (const [a, b] of [[0.4, 0], [0.4, 7]]) for (let x = 0; x < 320; x++) { const y = Math.round(150 + Math.sin(x * 0.012 + a) * 10 + b - x * 0.03); R.pset(x, y, H('#6a5038')); R.pset(x, y + 1, H('#b09a78')); }
  for (let y = 168; y < 176; y++) for (let x = 230; x < 270; x++) if (((x - 250) / 20) ** 2 + ((y - 172) / 4) ** 2 < 1) R.pset(x, y, tono(cols('#cfe0f0', '#9cc0ec', '#6a8ab0'), (y - 168) / 8, x, y));
  // la caseta de obra de tablas a la izquierda, con su tejado de tela asfáltica, puerta, ventana y farol
  R.rect(8, 82, 66, 124, C.k); for (let x = 9; x < 66; x++) for (let y = 86; y < 124; y++) R.pset(x, y, (x - 9) % 6 === 0 ? H('#6a4a2a') : tono(cols('#c89a5a', '#b08048', '#966a3a'), (y - 86) / 38, x, y));
  R.poligono([[4, 86], [70, 86], [66, 78], [8, 78]], H('#3a3438')); R.rect(4, 86, 70, 87, H('#1e1a20')); for (let x = 10; x < 66; x += 7) R.pset(x, 82, H('#5a5258'));
  R.rect(20, 98, 32, 123, C.k); R.rect(21, 99, 31, 123, H('#7a5030')); R.pset(29, 111, H('#e8c060'));
  R.rect(42, 96, 58, 108, C.k); R.rect(43, 97, 57, 107, H('#9cc0e0')); R.rect(43, 102, 57, 102, H('#5a4430')); R.rect(50, 97, 50, 107, H('#5a4430')); R.pset(44, 98, H('#ffffff'));
  // la pila de chapas, los sacos y la carretilla en el término medio
  for (let k = 0; k < 6; k++) { const y = 136 - k * 3; R.rect(230 - k, y, 300 - k, y + 2, C.k); R.rect(231 - k, y, 299 - k, y, H('#f4f8fc')); R.rect(231 - k, y + 1, 299 - k, y + 1, H('#a8b0b8')); }
  R.rect(232, 139, 236, 141, H('#5a4430')); R.rect(292, 139, 296, 141, H('#5a4430'));
  for (let k = 0; k < 3; k++) { const x = 206 + k * 9; R.rect(x, 130, x + 8, 140, C.k); R.rect(x + 1, 131, x + 7, 139, H('#d8ccb0')); R.rect(x + 1, 134, x + 7, 135, H('#b0a080')); }
  // vigas, un rollo de cable, un bidón y la caja de herramientas en el término medio
  for (let k = 0; k < 3; k++) { const y = 126 - k * 3; R.rect(96 + k * 2, y, 150 + k * 2, y + 2, C.k); R.rect(97 + k * 2, y, 149 + k * 2, y + 1, H('#8a5a3a')); R.rect(97 + k * 2, y, 149 + k * 2, y, H('#b07a4a')); }
  R.disco(170, 128, 6, C.k); R.disco(170, 128, 5, H('#3a3438')); R.anillo(170, 128, 3, H('#c87a3a')); R.disco(170, 128, 1, H('#8a5a3a'));
  R.rect(60, 128, 70, 142, C.k); R.rect(61, 129, 69, 141, H('#3a6a8a')); R.rect(61, 132, 69, 132, H('#2a4a6a')); R.rect(61, 137, 69, 137, H('#2a4a6a')); R.rect(62, 129, 63, 141, H('#5a8aaa'));
  R.rect(140, 150, 156, 158, C.k); R.rect(141, 151, 155, 157, H('#c83a2a')); R.rect(146, 148, 150, 150, C.k); R.rect(141, 153, 155, 153, H('#8a2a1a'));
  R.rect(300, 120, 319, 140, C.k); R.rect(301, 121, 319, 139, H('#7a6a5a')); for (let y = 123; y < 139; y += 4) R.rect(301, y, 319, y, H('#5a4a3a'));
});
// la grúa que sube la última chapa; devuelve dónde va el gancho
const grua = (t, gx, gy) => {
  const mx = 74;
  for (let y = 30; y <= 112; y++) { R.pset(mx, y, H('#c8a020')); R.pset(mx + 5, y, H('#c8a020')); if ((y - 30) % 6 === 0) R.linea(mx, y, mx + 5, y + 6, H('#a07c18')); }
  R.rect(mx - 4, 110, mx + 9, 114, C.k); R.rect(mx - 3, 111, mx + 8, 113, H('#e8b828'));
  R.rect(mx - 2, 26, mx + 7, 31, C.k); R.rect(mx - 1, 27, mx + 6, 30, H('#e8b828')); R.pset(mx + 1, 28, H('#9cc0e0'));
  for (let x = mx - 18; x <= 204; x++) { R.pset(x, 26, H('#c8a020')); R.pset(x, 29, H('#a07c18')); if ((x - mx) % 6 === 0) R.linea(x, 26, x + 3, 29, H('#a07c18')); }
  R.rect(mx - 22, 27, mx - 12, 34, H('#6a6e76')); R.rect(mx - 22, 27, mx - 12, 27, H('#9aa0aa'));
  R.linea(mx + 2, 20, mx - 18, 26, H('#5a5e66')); R.linea(mx + 2, 20, 204, 26, H('#5a5e66'));
  R.rect(Math.round(gx) - 2, 29, Math.round(gx) + 2, 32, C.k);
  R.linea(Math.round(gx), 32, Math.round(gx), Math.round(gy) - 3, H('#2a2e36'));
  R.rect(Math.round(gx) - 1, Math.round(gy) - 3, Math.round(gx) + 1, Math.round(gy) - 1, H('#e8b828')); R.pset(Math.round(gx), Math.round(gy), C.k);
};
const caballete = (x, y, s = 166) => { R.rect(x - 1, y, x + 15, y + 2, C.k); R.rect(x, y, x + 14, y + 1, H('#c89a5a')); R.linea(x + 2, y + 2, x - 2, s, H('#7a5030')); R.linea(x + 12, y + 2, x + 16, s, H('#7a5030')); R.linea(x + 3, y + 2, x - 1, s, H('#a07040')); R.linea(x + 13, y + 2, x + 17, s, H('#a07040')); R.rect(x + 1, y + 10, x + 13, y + 10, H('#7a5030')); };
const martillo = (x, y, a) => { const hx = Math.round(x), hy = Math.round(y - 7 + a * 4); R.linea(hx, hy, hx + 1, hy + 7, H('#8a5a2a')); R.rect(hx - 2, hy - 1, hx + 3, hy + 1, C.k); R.rect(hx - 1, hy, hx + 2, hy, H('#9aa2ac')); };
const p3 = (t) => {
  tallerFondo();
  // las nubes y los pájaros
  nubes(t, [[20, 40, 46, 2.2], [170, 30, 36, 3.4], [300, 58, 28, 5]], cols('#ffffff', '#e4ecf6', '#b8c8de'), null, (x, y) => (x >= 96 && y >= TOPE(x) - 1) || (x < 72 && y >= 76) || y >= 98);
  for (let k = 0; k < 3; k++) pajaro(((t * (9 + k * 3) + k * 90) % 360) - 20, 46 + k * 7 + Math.sin(t * 2 + k) * 2, t, H('#2a2e3a'));
  // la última chapa: sobre los caballetes, en las manos, colgada del gancho y en su hueco
  const lev = suave(lin(t, CONSTRUYE - 0.05, CONSTRUYE + 0.4)), sube = suave(lin(t, CONSTRUYE + 0.5, BIGEAR - 0.1)), encaja = t >= BIGEAR - 0.1;
  const baja = suave(lin(t, P3 + 0.1, CONSTRUYE - 0.2));
  let gx = lerp(146, 154, baja), gy = lerp(64, 138, baja);
  if (lev > 0) { gy = 138 - 6 * lev; }
  const fin = [180, 70];
  if (sube > 0) { gx = lerp(154, fin[0], sube); gy = lerp(132, fin[1], sube) - Math.sin(sube * Math.PI) * 10; }
  // el borde de lo chapado avanza cuando la chapa encaja (con destello)
  if (encaja) { for (let x = HUECO[0]; x < HUECO[1]; x++) { const top = Math.round(TOPE(x)); for (let y = top; y <= 112; y++) { const v = (y - top) / (112 - top); let c = tono(cols('#f4f8fc', '#d8dee4', '#b4bcc6', '#949ca6', '#7a828c'), v, x, y); if ((y - top) % 10 === 0) c = H('#6e7680'); R.pset(x, y, c); } } }
  // los obreros diminutos en lo alto del andamio
  for (const [x, y, k] of [[180, 69, 0], [188, 91, 1]]) { const b = Math.sin(t * 6 + k * 2) > 0 ? 1 : 0; R.rect(x, y - 5, x + 2, y - 1, H(k ? '#3e5a8a' : '#c83a3a')); R.rect(x, y - 7, x + 2, y - 6, H('#f0c890')); R.pset(x + 1, y - 8, H('#e8c020')); R.pset(x + 3, y - 3 - b, H('#9aa2ac')); }
  grua(t, gx, gy);
  if (encaja) { const f = lin(t, BIGEAR - 0.1, BIGEAR + 0.6); if (f < 1) for (let r = 0; r < 6; r++) { const a = r * Math.PI / 3 + t * 3, d = 3 + f * 9; R.pset(Math.round(180 + Math.cos(a) * d), Math.round(76 + Math.sin(a) * d), H('#ffffff')); } }
  else if (sube > 0) { const s = lerp(1, 0.22, sube), w = 84 * s, ang = Math.sin(t * 3) * 0.08 * (1 - sube); chapa(gx - w / 2, gy + 3 + w * ang, gx + w / 2, gy + 3 - w * ang, Math.max(1, Math.round(3 * s))); R.linea(Math.round(gx), Math.round(gy), Math.round(gx - w / 2 + 2), Math.round(gy + 2), H('#2a2e36')); R.linea(Math.round(gx), Math.round(gy), Math.round(gx + w / 2 - 2), Math.round(gy + 2), H('#2a2e36')); }
  // la caja de los planos de Kraus
  R.rect(14, 154, 38, 170, C.k); R.rect(15, 155, 37, 169, H('#a87a48')); R.rect(15, 160, 37, 160, H('#7a5030')); R.rect(15, 165, 37, 165, H('#7a5030'));
  // los caballetes
  caballete(108, 150); caballete(176, 150);
  // Kraus: los planos en la mano; los deja en la caja y señala la chapa que sube
  const kd = lin(t, ENORME + 0.3, ENORME + 0.7), ka = suave(lin(t, ENORME + 0.8, ENORME + 1.8)), kx = Math.round(lerp(40, 70, ka));
  const kdir = kd < 1 && t > ENORME ? -1 : 1;
  const K = R.actor(EL.krausWO, kx, 170, t, { dir: kdir, anda: ka > 0 && ka < 1, sostiene: kd < 1 ? (kdir > 0 ? [kx + 18, 158] : [kx - 4, 158]) : undefined, habla: t < CONSTRUYE && Math.sin(t * 8) > 0.2, dedo: t > BIGEAR - 0.4, sonrisa: t > BIGEAR });
  if (kd < 1) { const [mx, my] = K.mano, a = kdir > 0 ? mx - 1 : mx - 6; R.rect(a, my - 3, a + 7, my + 2, C.k); R.rect(a + 1, my - 2, a + 6, my + 1, H('#2a5aa8')); R.pset(a + 2, my - 1, H('#d8e8ff')); R.pset(a + 4, my - 1, H('#d8e8ff')); }
  else { R.rect(18, 151, 32, 154, C.k); R.rect(19, 152, 31, 153, H('#2a5aa8')); R.pset(22, 152, H('#d8e8ff')); R.pset(27, 152, H('#d8e8ff')); }
  // los dos estudiantes: remachan, levantan la chapa al gancho y celebran
  const remacha = t < CONSTRUYE - 0.3, sueltan = t > CONSTRUYE + 0.55;
  const a1 = remacha ? Math.abs(Math.sin(t * 9)) : 0, a2 = remacha ? Math.abs(Math.sin(t * 9 + 1.6)) : 0;
  const yC = 147 - 6 * lev;
  const S1 = R.actor(EL.empollon, 96, 170, t, { dir: 1, sostiene: sueltan ? undefined : remacha ? [116, 146 - a1 * 4] : [114, yC], brazos: t > BIGEAR && t < BIGEAR + 1.2, sonrisa: t > BIGEAR, sorpresa: sube > 0.2 && t < BIGEAR });
  const S2 = R.actor(EL.joven2, 196, 170, t, { dir: -1, sostiene: sueltan ? undefined : remacha ? [186, 146 - a2 * 4] : [186, yC], sonrisa: t > BIGEAR, habla: t > BIGEAR + 0.3 && Math.sin(t * 8) > 0 });
  if (sube <= 0) chapa(108, yC - 1, 196, yC - 1, 3);
  if (remacha) { martillo(S1.mano[0], S1.mano[1], a1); martillo(S2.mano[0], S2.mano[1], a2);
    for (const [hx, a] of [[S1.mano[0], a1], [S2.mano[0], a2]]) if (a > 0.92) { R.pset(hx, yC - 3, H('#fff4a0')); R.pset(hx - 2, yC - 4, H('#ffd040')); R.pset(hx + 2, yC - 5, H('#ffd040')); } }
};

// ── 4 · las antenas «de película» y el rodaje ───────────────────────────────────────────────────────────────────
const camaraCine = (x, s, t, rueda) => {
  for (const dx of [-8, 0, 8]) R.linea(x, s - 16, x + dx, s, H('#3a3438'));
  R.rect(x - 7, s - 24, x + 7, s - 16, C.k); R.rect(x - 6, s - 23, x + 6, s - 17, H('#4a4a52')); R.rect(x - 6, s - 23, x + 6, s - 23, H('#7a7a84'));
  for (const [cx, cy] of [[x - 3, s - 28], [x + 4, s - 29]]) { R.disco(cx, cy, 4, C.k); R.disco(cx, cy, 3, H('#5a5a64')); const a = t * (rueda ? 9 : 0.3); R.pset(Math.round(cx + Math.cos(a) * 2), Math.round(cy + Math.sin(a) * 2), H('#c8c8d0')); R.pset(cx, cy, H('#c8c8d0')); }
  R.rect(x + 7, s - 22, x + 11, s - 18, C.k); R.rect(x + 8, s - 21, x + 10, s - 19, H('#2a2a30')); R.pset(x + 10, s - 20, H('#9cc0e0'));
  if (rueda && Math.sin(t * 8) > 0) R.pset(x - 5, s - 22, H('#ff3a3a'));
};
const claqueta = (x, y, cierra) => {
  const a = (1 - cierra) * 0.6;
  R.rect(x - 8, y - 2, x + 1, y + 5, C.k); R.rect(x - 7, y - 1, x, y + 4, H('#2a2a30')); R.rect(x - 7, y + 1, x, y + 1, H('#6a6a74'));
  for (let i = 0; i < 10; i++) { const px = Math.round(x - 8 + Math.cos(-a) * i), py = Math.round(y - 3 + Math.sin(-a) * i); R.pset(px, py, i % 3 === 2 ? H('#2a2a30') : H('#f4f4f0')); R.pset(px, py - 1, C.k); }
};
const p4 = (t) => {
  const o = { encuadre: 'ata', giro: 0.18 + 0.7 * suave(lin(t, PELIS + 0.15, PELIS + 1.3)) };
  T.telescopios(R, t, o);
  const rueda = t > PELIS - 0.1;
  camaraCine(98, 152, t, rueda);
  R.actor(EL.tecnico, 74, 152, t, { dir: 1, sostiene: [90, 132], habla: t < P4 + 1.6 && Math.sin(t * 8) > 0.1 });
  const llega = suave(lin(t, P4 + 0.25, P4 + 1.6)), sale = suave(lin(t, PELIS + 0.55, P5 - 0.1)), cx = Math.round(sale > 0 ? lerp(140, 336, sale) : lerp(336, 140, llega));
  const CL = R.actor(EL.tecnica, cx, 152, t, { dir: sale > 0 ? 1 : -1, anda: (llega > 0 && llega < 1) || (sale > 0 && sale < 1), sostiene: sale > 0 ? [cx + 18, 138] : [cx - 4, 136], sonrisa: t > PELIS });
  claqueta(CL.mano[0] + (sale > 0 ? 8 : 0), CL.mano[1], lin(t, PELIS - 0.3, PELIS - 0.05));
  // la silla de director, a la izquierda
  R.linea(52, 140, 62, 152, H('#6a4422')); R.linea(62, 140, 52, 152, H('#6a4422')); R.rect(50, 138, 64, 140, H('#a83a3a')); R.rect(50, 130, 64, 133, H('#a83a3a')); R.rect(50, 130, 50, 140, H('#6a4422')); R.rect(64, 130, 64, 140, H('#6a4422'));
  T.telescopiosDelante(R, t, o);
};

// ── 5 · el cianotipo del perfil sobre la mesa de dibujo (fondo local) ───────────────────────────────────────────
const SUELO_Y = 132, PL = [[58, 132], [38, 52]], CUR = (u) => [262 + 38 * u * u, 132 - 70 * u];
const papelX0 = 6, papelX1 = 314, papelY0 = 26, papelY1 = 156;
const plano = () => capa('cianotipo', () => {
  madera(0, 0, 319, 179, cols('#5a3418', '#7a4a26', '#94603a'), 16, 1);
  // la esquina de arriba en sombra (tranquila tras Atom y bajo el año)
  for (let y = 0; y < 26; y++) for (let x = 0; x < 320; x++) { const p = R.pget(x, y); R.pset(x, y, mez(p, H('#2a160a'), 0.55 - y * 0.012)); }
  // el papel azul con su trama, su rejilla y su borde blanco
  for (let y = papelY0; y <= papelY1; y++) for (let x = papelX0; x <= papelX1; x++) { let c = tono(cols('#2e5c9e', '#28528e', '#224a84'), (y - papelY0) / 130 + (hs(x >> 2, y >> 2, 9) - 0.5) * 0.3, x, y);
    if ((x - papelX0) % 8 === 0 || (y - papelY0) % 8 === 0) c = mez(c, H('#6a98d8'), 0.35); R.pset(x, y, c); }
  R.rect(papelX0, papelY1 + 1, papelX1, papelY1 + 2, H('#2a160a'));
  for (const [x0, y0, x1, y1] of [[papelX0 + 4, papelY0 + 4, papelX1 - 4, papelY0 + 4], [papelX0 + 4, papelY1 - 4, papelX1 - 4, papelY1 - 4], [papelX0 + 4, papelY0 + 4, papelX0 + 4, papelY1 - 4], [papelX1 - 4, papelY0 + 4, papelX1 - 4, papelY1 - 4]]) R.linea(x0, y0, x1, y1, H('#c8dcf4'));
  for (const [x, y] of [[papelX0 + 1, papelY0 + 1], [papelX1 - 1, papelY0 + 1], [papelX0 + 1, papelY1 - 1], [papelX1 - 1, papelY1 - 1]]) { R.disco(x, y, 2, C.k); R.disco(x, y, 1, H('#d83a3a')); R.pset(x - 1, y - 1, H('#ffb0a0')); }
  const B = H('#eaf2ff'), Bt = H('#9cc0ec');
  // el suelo (raya gruesa con su trama), la cota de abajo con sus flechas y las marcas
  R.rect(14, SUELO_Y, 306, SUELO_Y + 1, B); for (let x = 16; x < 306; x += 4) R.linea(x, SUELO_Y + 2, x - 3, SUELO_Y + 5, Bt);
  R.linea(58, 142, 262, 142, B); for (const [x, d] of [[58, 1], [262, -1]]) { R.linea(x, 142, x + 4 * d, 140, B); R.linea(x, 142, x + 4 * d, 144, B); R.linea(x, 138, x, 146, B); }
  for (let x = 78; x < 262; x += 20) R.pset(x, 141, B);
  // el plano inclinado: la cara y la celosía de atrás
  R.linea(PL[0][0], PL[0][1], PL[1][0], PL[1][1], B); R.linea(PL[0][0] + 1, PL[0][1], PL[1][0] + 1, PL[1][1], B);
  for (let k = 0; k <= 6; k++) { const u = k / 6, x = lerp(PL[0][0], PL[1][0], u), y = lerp(PL[0][1], PL[1][1], u); R.linea(Math.round(x), Math.round(y), Math.round(lerp(16, 30, u)), SUELO_Y, Bt); if (k < 6) R.linea(Math.round(x), Math.round(y), Math.round(lerp(16, 30, u + 1 / 6)), SUELO_Y - Math.round(10 * (1 - u)), Bt); }
  // el curvo: la curva y sus postes
  let [ax, ay] = CUR(0); for (let k = 1; k <= 40; k++) { const [bx, by] = CUR(k / 40); R.linea(Math.round(ax), Math.round(ay), Math.round(bx), Math.round(by), B); R.linea(Math.round(ax) + 1, Math.round(ay), Math.round(bx) + 1, Math.round(by), B); [ax, ay] = [bx, by]; }
  for (let k = 1; k <= 5; k++) { const [x, y] = CUR(k / 5); R.linea(Math.round(x) + 2, Math.round(y), Math.round(x) + 2, SUELO_Y, Bt); if (k > 1) R.linea(Math.round(x) + 2, Math.round(y) + 8, Math.round(CUR((k - 1) / 5)[0]) + 2, SUELO_Y, Bt); }
  // el carro de las bocinas junto al curvo
  R.rect(236, 122, 248, 131, B); R.rect(237, 123, 247, 130, H('#28528e')); R.linea(248, 124, 256, 119, B); R.linea(248, 129, 256, 133, B); R.disco(239, 131, 1, B); R.disco(245, 131, 1, B);
  // las ondas: bajan del cielo, rebotan en el plano hacia el curvo y del curvo a las bocinas (punteadas)
  for (const [y0, k] of [[64, 0], [84, 1], [104, 2]]) { const xp = lerp(PL[0][0], PL[1][0], (132 - y0) / 80); R.linea(Math.round(xp) - 14, y0 - 30, Math.round(xp), y0, Bt, 2); R.linea(Math.round(xp), y0, 262 + 30 - k * 8, y0 + 4, Bt, 2); R.linea(262 + 30 - k * 8, y0 + 4, 252, 126, Bt, 2); }
  // la figura humana a escala junto al curvo, las notas (rayas sin letras) y la flecha de las ondas que bajan
  R.disco(212, 120, 1, B); R.linea(212, 122, 212, 127, B); R.linea(212, 127, 210, 131, B); R.linea(212, 127, 214, 131, B); R.linea(209, 124, 215, 124, B);
  for (const [x, y, n] of [[110, 40, 5], [110, 46, 4], [110, 52, 6], [176, 40, 3], [176, 46, 5]]) for (let k = 0; k < n; k++) R.linea(x + k * 7, y, x + k * 7 + 4, y, Bt);
  R.rect(106, 36, 160, 57, Bt); R.rect(107, 37, 159, 56, H('#28528e')); for (const [x, y, n] of [[110, 41, 6], [110, 47, 5], [110, 53, 6]]) for (let k = 0; k < n; k++) R.linea(x + k * 8, y, x + k * 8 + 5, y, B);
  R.linea(150, 66, 150, 92, B); R.linea(150, 92, 147, 88, B); R.linea(150, 92, 153, 88, B); for (let k = 0; k < 3; k++) R.anillo(150, 64, 3 + k * 3, Bt, 2);
  R.linea(30, 52, 30, 132, Bt, 3); R.linea(26, 52, 34, 52, B); R.linea(26, 132, 34, 132, B);
  for (let y = 98; y < 112; y++) for (let x = 196; x < 214; x++) { const d = Math.hypot(x - 205, (y - 105) * 1.2); if (d > 6.5 && d < 8) R.pset(x, y, mez(R.pget(x, y), H('#5a3418'), 0.35)); }
  // el cajetín (sin letras: rayas y el pictograma de la oreja)
  R.rect(120, 146, 200, 154, B); R.rect(121, 147, 199, 153, H('#28528e')); R.linea(150, 146, 150, 154, B); for (let x = 154; x < 196; x += 6) R.linea(x, 150, x + 3, 150, Bt); R.linea(130, 152, 133, 147, B); R.linea(134, 152, 142, 152, B); for (let k = 0; k < 4; k++) R.pset(143 + (k > 1 ? 1 : 0), 151 - k, B);
  // la escuadra transparente abajo a la izquierda y la regla de cálculo abajo
  R.poligono([[2, 120], [2, 172], [52, 172]], H('#c8e0d0')); R.linea(2, 120, 52, 172, H('#5a8a6a')); R.linea(2, 172, 52, 172, H('#5a8a6a'));
  for (let y = 124; y < 172; y++) for (let x = 3; x < 52; x++) if (x - 2 < (y - 120) * 50 / 52 && (x + y) % 2) R.pset(x, y, mez(R.pget(x, y), H('#e8f4ec'), 0.5));
  R.rect(60, 162, 230, 170, C.k); R.rect(61, 163, 229, 169, H('#f0e8d0')); R.rect(61, 166, 229, 166, H('#c8b890')); for (let x = 64; x < 228; x += 4) R.pset(x, 163 + (x % 8 ? 0 : 1), H('#3a3438')); R.rect(120, 162, 140, 170, H('#e8e4dc')); R.rect(120, 162, 120, 170, C.k); R.rect(140, 162, 140, 170, C.k);
  // la goma, las virutas, el compás y dos lápices sueltos
  R.rect(238, 162, 250, 168, C.k); R.rect(239, 163, 249, 167, H('#e88aa0')); R.rect(239, 163, 249, 163, H('#ffc0cc'));
  for (const [x, y] of [[254, 166], [258, 170], [252, 172], [261, 165]]) R.pset(x, y, H('#e8a0b0'));
  R.linea(8, 4, 28, 20, H('#7a7a84')); R.linea(28, 20, 40, 4, H('#7a7a84')); R.disco(28, 20, 2, H('#b0b0b8'));
  R.linea(200, 174, 236, 160, H('#e8b828')); R.linea(200, 175, 236, 161, H('#b08818')); R.pset(198, 175, H('#3a3438'));
});
// el lápiz amarillo de la punta (tx, ty) hacia atrás (dx, dy)
const lapiz = (tx, ty, dx, dy) => { const n = 14; for (let i = 0; i <= n; i++) { const x = Math.round(tx + dx * i / n * 14), y = Math.round(ty + dy * i / n * 14); R.pset(x, y, i < 2 ? H('#3a3438') : i < 4 ? H('#e8c8a0') : i > n - 2 ? H('#e88aa0') : H('#f0c020')); R.pset(x + (dy > 0 ? 1 : -1), y, i < 4 ? C.k : H('#b08818')); } };
// el trazo de repaso en ámbar, hasta la fracción f
const repasoPlano = (f) => { if (f <= 0) return; const [a, b] = PL; const x1 = lerp(a[0], b[0], f), y1 = lerp(a[1], b[1], f); for (const d of [-1, 2]) R.linea(a[0] + d, a[1], Math.round(x1) + d, Math.round(y1), H('#ffd36a')); };
const repasoCurvo = (f) => { if (f <= 0) return; let [ax, ay] = CUR(0); const n = Math.max(1, Math.round(40 * f)); for (let k = 1; k <= n; k++) { const [bx, by] = CUR(k / 40); for (const d of [-1, 2]) R.linea(Math.round(ax) + d, Math.round(ay), Math.round(bx) + d, Math.round(by), H('#ffd36a')); [ax, ay] = [bx, by]; } };
const p5 = (t) => {
  plano();
  vapor(292, 150, t);
  // la taza de café, por delante del papel
  R.rect(282, 150, 302, 172, C.k); R.rect(283, 151, 301, 171, H('#e8e4dc')); R.rect(283, 151, 301, 153, H('#5a3418')); R.rect(284, 152, 300, 152, H('#7a4a26')); R.rect(283, 158, 301, 159, H('#3a6ab8')); R.rect(303, 155, 306, 166, C.k); R.rect(303, 157, 304, 164, H('#e8e4dc'));
  // a «two metal walls» el lápiz toca los dos muros; a «flat» repasa el plano; a «curved», la otra mano repasa el curvo
  const fP = suave(lin(t, PLANO - 0.05, PLANO + 0.55)), fC = suave(lin(t, CURVO - 0.1, CURVO + 0.55));
  repasoPlano(fP); repasoCurvo(fC);
  // la mano izquierda: entra, da dos toques en el plano, lo repasa de abajo arriba y se va
  const entraI = suave(lin(t, P5 + 0.05, P5 + 0.45)), saleI = suave(lin(t, CURVO - 0.6, CURVO - 0.1));
  if (saleI < 1) { const [a, b] = PL; let tx = lerp(a[0], b[0], fP), ty = lerp(a[1], b[1], fP);
    if (fP === 0) { const toque = t > MUROS - 0.1 && t < MUROS + 0.5 ? Math.abs(Math.sin((t - MUROS) * 12)) * 3 : 3; tx = 52; ty = 106 - toque; }
    tx -= 60 * (1 - entraI) + 60 * saleI; ty += 30 * (1 - entraI) + 30 * saleI;
    const wx = tx - 18, wy = ty + 9; T.brazo(R, wx - 30, wy + 26, wx, wy, '#5a6a8a', 1); lapiz(tx, ty, -0.7, 0.7); }
  // la mano derecha: entra por la derecha y repasa el curvo de abajo arriba
  const entraD = suave(lin(t, CURVO - 0.75, CURVO - 0.2)), saleD = suave(lin(t, CURVO + 0.75, P6 - 0.05));
  if (entraD > 0 && saleD < 1) { let [tx, ty] = CUR(Math.max(0.02, fC)); tx += 70 * (1 - entraD) + 70 * saleD; ty += 20 * (1 - entraD);
    const wx = tx + 15, wy = ty + 9; T.brazo(R, wx + 30, wy + 26, wx, wy, '#5a6a8a', -1); lapiz(tx, ty, 0.7, 0.7); }
};

// ── 6 · la gran oreja desde el aire, y los tres campos de fútbol (fondo local) ──────────────────────────────────
const SUE = [[112, 66], [222, 66], [246, 150], [90, 150]];   // el suelo de metal: arriba izq., arriba der., abajo der., abajo izq.
const enSuelo = (u, v) => { const a = [lerp(SUE[0][0], SUE[1][0], u), lerp(SUE[0][1], SUE[1][1], u)], b = [lerp(SUE[3][0], SUE[2][0], u), lerp(SUE[3][1], SUE[2][1], u)]; return [lerp(a[0], b[0], v), lerp(a[1], b[1], v)]; };
const FILAS = [22, 30, 40, 52, 66, 84, 106, 132, 162, 196];
const VP = [160, -300];
const colX = (x0, y) => VP[0] + (x0 - VP[0]) * (y - VP[1]) / (180 - VP[1]);
const aire = () => capa('aire', () => {
  // la calima del horizonte (tranquila bajo el año y tras Atom)
  cieloT(0, 22, cols('#a8bed6', '#b4c8dc', '#c0d0dc', '#c8d4d4'));
  const tipos = [cols('#5a8a3a', '#4e7a32', '#669a44'), cols('#c8b04a', '#b49c3e', '#d8c060'), cols('#8a6a4a', '#7a5c40', '#9a7a56'), cols('#7aa84a', '#6a983e', '#8ab85a'), cols('#4a7a3a', '#3e6a30', '#5a8a46')];
  for (let r = 0; r < FILAS.length - 1; r++) { const y0 = FILAS[r], y1 = FILAS[r + 1];
    for (let y = y0; y < Math.min(180, y1); y++) { const prof = (y - 22) / 158;
      for (let x = 0; x < 320; x++) { let k = 0; const xs = VP[0] + (x - VP[0]) * (180 - VP[1]) / (y - VP[1]); k = Math.floor((xs + 400) / 70);
        const tipo = tipos[Math.floor(hs(k, r, 7) * tipos.length)], dentro = (xs + 400) % 70, surco = Math.floor(dentro / (hs(k, r, 8) > 0.5 ? 3 : 4)) % 2;
        let c = tipo[surco ? 0 : 1]; if (hs(x, y, 3) > 0.94) c = tipo[2];
        if (dentro < 1.2) c = H('#3a5a2a'); if (y === y0) c = H('#3e5e2c');
        c = mez(c, H('#b8c8d0'), Math.min(0.92, Math.max(0, 0.45 - prof * 0.9) + Math.max(0, (52 - y) / 30) * (x > 250 ? 0.95 : 0.6))); R.pset(x, y, c); } } }
  // la carretera de la derecha y la del fondo, con sus postes
  for (let y = 22; y < 180; y++) { const x = Math.round(colX(292, y)); R.pset(x, y, H('#d8d0c0')); R.pset(x + 1, y, H('#c8c0b0')); if (y % 9 === 0) R.pset(x + 3, y, H('#5a4430')); }
  for (let x = 0; x < 320; x++) { R.pset(x, 52, H('#d0c8b8')); }
  // el arroyo de abajo a la derecha
  for (let x = 250; x < 320; x++) { const y = Math.round(160 + Math.sin(x * 0.09) * 5 + (x - 250) * 0.12); R.pset(x, y, H('#4a7ab0')); R.pset(x, y + 1, H('#6a9ad0')); R.pset(x, y + 2, H('#3a5a8a')); }
  // la granja: granero rojo, casa blanca, silo y árboles
  R.rect(22, 112, 44, 126, C.k); R.rect(23, 113, 43, 125, H('#b83a2a')); R.poligono([[21, 113], [45, 113], [41, 106], [25, 106]], H('#5a3a2a')); R.rect(30, 119, 34, 125, H('#f0e8d8'));
  R.rect(50, 116, 62, 126, C.k); R.rect(51, 117, 61, 125, H('#f0ece0')); R.poligono([[49, 117], [63, 117], [56, 110]], H('#4a4a54')); R.rect(54, 120, 56, 122, H('#3a5a8a'));
  R.disco(16, 116, 5, C.k); R.disco(16, 116, 4, H('#c8c8c0')); R.disco(15, 115, 2, H('#e8e8e0'));
  for (const [x, y, r] of [[8, 130, 6], [66, 106, 5], [70, 128, 6], [30, 98, 4], [280, 120, 6], [300, 96, 5], [268, 70, 4], [40, 70, 4], [12, 76, 5]]) { R.disco(x + 2, y + 2, r, H('#2e4a22')); R.disco(x, y, r, H('#3e6a2a')); R.disco(x - 1, y - 1, r - 2, H('#5a8a3a')); R.pset(x - 2, y - 2, H('#7aaa4a')); }
  // las sombras de los dos muros sobre los campos (el sol viene de la derecha y de arriba)
  R.poligono([[90, 150], [112, 66], [86, 62], [62, 150]], mez(H('#4e7a32'), C.k, 0.45));
  // el plano: la cara gris con sus juntas y la celosía blanca por detrás
  const PLc = [[112, 66], [90, 150], [72, 146], [94, 60]];
  R.poligono(PLc, H('#8e969e'));
  for (let k = 1; k < 10; k++) { const u = k / 10; R.linea(Math.round(lerp(112, 90, u)), Math.round(lerp(66, 150, u)), Math.round(lerp(94, 72, u)), Math.round(lerp(60, 146, u)), H('#6e7680')); }
  for (let k = 1; k < 3; k++) { const u = k / 3; R.linea(Math.round(lerp(112, 94, u)), Math.round(lerp(66, 60, u)), Math.round(lerp(90, 72, u)), Math.round(lerp(150, 146, u)), H('#c4ccd4')); }
  R.linea(94, 60, 72, 146, H('#f4f8fc')); R.linea(93, 60, 71, 146, H('#eef0f0'));
  for (let k = 0; k < 8; k++) { const u = k / 7, x = lerp(94, 72, u), y = lerp(60, 146, u); R.linea(Math.round(x), Math.round(y), Math.round(x - 10), Math.round(y + 6), H('#eef0f0')); }
  R.linea(112, 66, 90, 150, C.k);
  // el curvo: la cara cóncava de oscuro (abajo) a claro (el labio), con sus costillas
  const CUc = (u, w) => [lerp(lerp(222, 246, u), lerp(240, 266, u), w) + Math.sin(w * Math.PI) * 3, lerp(lerp(66, 150, u), lerp(62, 144, u), w)];
  for (let i = 0; i <= 90; i++) for (let j = 0; j <= 22; j++) { const [x, y] = CUc(i / 90, j / 22); const c = tono(cols('#6e7680', '#8e96a0', '#b4bcc6', '#dce2e8'), j / 22, Math.round(x), Math.round(y)); R.pset(Math.round(x), Math.round(y), c); R.pset(Math.round(x) + 1, Math.round(y), c); }
  for (let k = 0; k <= 9; k++) { const u = k / 9; for (let j = 0; j <= 22; j++) { const [x, y] = CUc(u, j / 22); R.pset(Math.round(x), Math.round(y), H('#5e6670')); } }
  for (let i = 0; i <= 90; i++) { const [x, y] = CUc(i / 90, 1); R.pset(Math.round(x), Math.round(y), H('#ffffff')); R.pset(Math.round(x) + 1, Math.round(y), C.k); }
  for (let k = 0; k <= 6; k++) { const [x, y] = CUc(k / 6, 1); R.linea(Math.round(x) + 1, Math.round(y), Math.round(x) + 8, Math.round(y) + 4, H('#4a4e56')); }
  // la caseta y el coche abajo a la izquierda
  R.rect(70, 156, 86, 166, C.k); R.rect(71, 157, 85, 165, H('#c8bca8')); R.rect(70, 155, 86, 157, H('#5a5a62')); R.pset(76, 162, H('#7a5030')); R.rect(90, 160, 97, 164, C.k); R.rect(91, 161, 96, 163, H('#7a2a32'));
});
// el suelo de metal: brillo, juntas y el reflejo del cielo que pasa
const sueloMetal = (t) => {
  for (let v = 0; v <= 1.0001; v += 1 / 90) for (let u = 0; u <= 1.0001; u += 1 / 160) { const [x, y] = enSuelo(u, v), xi = Math.round(x), yi = Math.round(y);
    const ref = Math.sin((u * 3 + t * 0.12) * 4 + v * 2) * 0.5 + 0.5, brillo = Math.abs(u - ((t * 0.18) % 1.6 - 0.3) - v * 0.3) < 0.03;
    let c = tono(cols('#c8d0d8', '#dce2e8', '#eef2f6'), 0.3 + ref * 0.55 - v * 0.2, xi, yi);
    if (Math.abs((u * 12) % 1) < 0.07 || Math.abs((v * 9) % 1) < 0.06) c = H('#a8b0b8'); if (brillo) c = H('#ffffff'); R.pset(xi, yi, c); }
  R.linea(SUE[0][0], SUE[0][1], SUE[1][0], SUE[1][1], H('#6e7680')); R.linea(SUE[3][0], SUE[3][1], SUE[2][0], SUE[2][1], H('#5a5e66'));
  R.linea(SUE[3][0], SUE[3][1] + 1, SUE[2][0], SUE[2][1] + 1, H('#c8c0b0'));
  // el carro de las bocinas junto al curvo
  const [bx, by] = enSuelo(0.86, 0.45); R.rect(Math.round(bx) - 4, Math.round(by) - 2, Math.round(bx) + 3, Math.round(by) + 2, C.k); R.rect(Math.round(bx) - 3, Math.round(by) - 1, Math.round(bx) + 2, Math.round(by) + 1, H('#7a7e86'));
};
// un campo de fútbol dentro del suelo, en (u0..u1, v0..v1); a = 0–1 aparece cayendo
const campo = (u0, u1, v0, v1, a) => {
  if (a <= 0) return; const cae = (1 - suave(a)) * 14;
  for (let v = v0; v <= v1 + 1e-6; v += 1 / 180) for (let u = u0; u <= u1 + 1e-6; u += 1 / 200) { const [x, y] = enSuelo(u, v), xi = Math.round(x), yi = Math.round(y - cae);
    if (bay(xi, yi) > a * 1.2) continue;
    const fu = (u - u0) / (u1 - u0), fv = (v - v0) / (v1 - v0);
    let c = Math.floor(fu * 12) % 2 ? H('#4aa83a') : H('#3e9632');
    if (fu < 0.08) c = H('#2a3a7a'); else if (fu > 0.92) c = H('#7a2a3a');
    if (fu < 0.012 || fu > 0.988 || fv < 0.06 || fv > 0.94) c = H('#ffffff');
    else if (fu > 0.08 && fu < 0.92 && Math.abs(((fu - 0.08) / 0.084) % 1) < 0.07) c = H('#e8f4e0');
    if (Math.abs(fu - 0.5) < 0.01) c = H('#ffffff');
    R.pset(xi, yi, c); }
  if (a > 0.9) for (const fu of [0.0, 1.0]) { const [x, y] = enSuelo(u0 + (u1 - u0) * fu, (v0 + v1) / 2); R.rect(Math.round(x) - 1, Math.round(y) - 4, Math.round(x) + 1, Math.round(y) - 4, H('#f0d020')); R.linea(Math.round(x), Math.round(y) - 4, Math.round(x), Math.round(y), H('#f0d020')); }
};
const p6 = (t) => {
  aire();
  sueloMetal(t);
  // el coche que sube por la carretera y los campos que caen
  const cy = 176 - ((t - P6) * 9) % 170, cx = Math.round(colX(292, cy)) - 1; R.rect(cx - 1, Math.round(cy) - 2, cx + 2, Math.round(cy) + 2, C.k); R.rect(cx, Math.round(cy) - 1, cx + 1, Math.round(cy) + 1, H('#3a7ac8'));
  campo(0.08, 0.92, 0.05, 0.29, lin(t, TRES - 0.05, TRES + 0.3));
  campo(0.08, 0.92, 0.38, 0.62, lin(t, FUTBOL - 0.05, FUTBOL + 0.3));
  campo(0.08, 0.92, 0.71, 0.95, lin(t, CAMPOS - 0.05, CAMPOS + 0.3));
  // las sombras de las nubes que pasan por encima (más oscuras, tramadas)
  for (const [x0, y0, w, v] of [[-60, 40, 60, 11], [120, 110, 46, 8]]) { const cx2 = ((x0 + (t - P6) * v) % 440) - 60, cy2 = y0 + (t - P6) * v * 0.3;
    for (let y = Math.round(cy2 - w * 0.3); y <= cy2 + w * 0.3; y++) for (let x = Math.round(cx2 - w / 2); x <= cx2 + w / 2; x++) { if (x < 0 || x > 319 || y < 23 || y > 179) continue; const d = ((x - cx2) / (w / 2)) ** 2 + ((y - cy2) / (w * 0.3)) ** 2; if (d > 1 || (d > 0.7 && bay(x, y) > 0.5)) continue; R.pset(x, y, mez(R.pget(x, y), H('#0a1a10'), 0.22)); } }
  // los pájaros que cruzan por debajo de la cámara
  for (let k = 0; k < 4; k++) { const x = ((t - P6) * (22 + k * 4) + k * 26) % 360 - 20, y = 150 - k * 6 - (t - P6) * 3; const a = Math.floor(t * 6 + k) % 2; R.pset(Math.round(x), Math.round(y), H('#1e1a20')); R.pset(Math.round(x) - 1, Math.round(y) - 1 - a, H('#1e1a20')); R.pset(Math.round(x) + 1, Math.round(y) - 1 - a, H('#1e1a20')); R.pset(Math.round(x) - 2, Math.round(y) - 1 - a, H('#3a3438')); R.pset(Math.round(x) + 2, Math.round(y) - 1 - a, H('#3a3438')); }
};

// ── 7 · la Tierra gira y el cielo pasa como una cinta; una estrella se cae ──────────────────────────────────────
const rodillo = (x, y, t) => { R.disco(x, y, 9, C.k); R.disco(x, y, 8, H('#7a828c')); R.disco(x, y, 6, H('#a8b0b8')); for (let k = 0; k < 3; k++) { const a = t * 2.4 + k * 2.09; R.linea(x, y, Math.round(x + Math.cos(a) * 6), Math.round(y + Math.sin(a) * 6), H('#4a525c')); } R.disco(x, y, 2, H('#dce2e8')); R.pset(x - 3, y - 4, H('#ffffff')); };
const p7 = (t) => {
  const o = { encuadre: 'cinta', u: lin(t, P7, 35.6) };
  T.oreja(R, t, o);
  // la banda de goma estriada de la cinta, arriba y abajo de la franja del cielo, y sus rodillos
  rodillo(2, 136, t); rodillo(318, 136, t);
  // la estrella que se sale de la cinta por la derecha, cae y rebota en la Tierra
  const f = lin(t, CINTA - 0.5, CINTA + 1.1);
  const limbo = (x) => 107 + 31 * ((x - 160) / 160) ** 2;
  if (f > 0) { let x, y; if (f < 0.35) { x = lerp(250, 318, f / 0.35); y = lerp(limbo(250) - 16, 124, f / 0.35); } else { const g = (f - 0.35) / 0.65; x = lerp(318, 280, g); const b = g < 0.45 ? g / 0.45 : g < 0.75 ? (g - 0.45) / 0.3 : (g - 0.75) / 0.25; const alto = g < 0.45 ? 0 : g < 0.75 ? 10 : 4; y = g < 0.45 ? lerp(124, limbo(x) - 3, b * b) - Math.sin(b * Math.PI) * 8 : limbo(x) - 3 - Math.sin(b * Math.PI) * alto; }
    const xi = Math.round(x), yi = Math.round(y); for (let i = -3; i <= 3; i++) { R.pset(xi + i, yi, H('#fff4a0')); R.pset(xi, yi + i, H('#fff4a0')); } R.pset(xi - 1, yi - 1, H('#ffffff')); R.pset(xi + 1, yi + 1, H('#ffffff')); R.pset(xi + 1, yi - 1, H('#ffffff')); R.pset(xi - 1, yi + 1, H('#ffffff')); R.pset(xi, yi, H('#ffffff'));
    if (f > 0.35 && f < 0.65) for (let k = 1; k < 5; k++) R.pset(Math.round(x + k * 3), Math.round(y - k * 2), H('#c8b860'));
    const choque = (f > 0.64 && f < 0.72) || (f > 0.83 && f < 0.88); if (choque) for (let r = 0; r < 8; r++) { const a = r * Math.PI / 4; R.pset(Math.round(xi + Math.cos(a) * 6), Math.round(yi + Math.sin(a) * 4), H('#ffffff')); } }
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], {
  año: (t) => t < P2 ? 1956 : t < BIGEAR ? Math.round(lerp(1956, 1961, lin(t, Y1956, BIGEAR))) : 1961,
  efectos: [[DELAWARE, 'golpecito'], [INGENIERO + 0.5, 'papel'], [P3 + 0.3, 'toc'], [CONSTRUYE - 0.6, 'toc'], [BIGEAR - 0.1, 'brillo'],
    [PELIS - 0.05, 'palmada'], [PELIS + 0.2, 'motor'], [PLANO, 'lapiz'], [CURVO, 'lapiz'], [TRES, 'pop'], [CAMPOS, 'pop'], [CINTA + 0.53, 'brillo']],
});
''')

E['wo-voluntarios'] = ('Los voluntarios', r'''// WO-VOLUNTARIOS (frase 6), 1972–1973, sin cartela. Cuatro planos, todos con acción y vida de fondo:
// 1. «the government money ran out, and the team carried on as volunteers»: la caseta de los receptores al atardecer; un
//    funcionario sale con su maletín, sube al coche negro del gobierno, que se va («ran out»); llega el familiar de los
//    setenta levantando polvo («carried on») y bajan dos voluntarios, ella con el termo («volunteers»);
// 2. «in the evenings and on weekends. From 1973»: dentro de la caseta, de noche (fondo local): él sirve café del termo
//    («evenings»), ella anota junto a los receptores; el registrador escribe y el reloj corre; a «1973» el calendario
//    pasa sus hojas y la barra del año llega a 1973; los dos brindan;
// 3. «Big Ear was devoted to something almost nobody took seriously»: el anochecer azul desde la cerca (fondo local): la
//    gran oreja enorme de canto, la caseta con luz y una camioneta que pasa; una vaca mira la oreja y, a «took
//    seriously», le da la espalda y sigue pastando;
// 4. «listening in case someone out there was sending a signal»: el estudio de Atom (hoy): la oreja casera del techo se
//    despega, una mano la coge al vuelo y la vuelve a pegar a «signal».
''', PRE + r'''
const v = (f) => en('voluntarios', f);
const P2 = v(0.290), P3 = v(0.562), P4 = v(0.818);
const RANOUT = v(0.137), SIGUE = v(0.214), VOLUNT = v(0.255), TARDES = v(0.337), FINDE = v(0.382), Y1973 = v(0.452);
const CASI = v(0.668), ENSERIO = v(0.727), ALGUIEN = v(0.869), SENAL = v(0.967);

// ── 1 · la caseta al atardecer: se va el coche del gobierno y llegan los voluntarios ────────────────────────────
const sedan = (x, s) => { x = Math.round(x);
  R.rect(x, s - 9, x + 46, s - 3, C.k); R.rect(x + 1, s - 8, x + 45, s - 4, H('#1e2028')); R.rect(x + 1, s - 8, x + 45, s - 8, H('#4a4e5a'));
  R.poligono([[x + 9, s - 9], [x + 14, s - 15], [x + 32, s - 15], [x + 36, s - 9]], C.k); R.poligono([[x + 11, s - 10], [x + 15, s - 14], [x + 22, s - 14], [x + 22, s - 10]], H('#7a8ab0')); R.poligono([[x + 24, s - 10], [x + 24, s - 14], [x + 31, s - 14], [x + 34, s - 10]], H('#7a8ab0'));
  R.rect(x, s - 7, x + 2, s - 6, H('#f8e8a0')); R.rect(x + 45, s - 7, x + 46, s - 6, H('#c83a3a')); R.rect(x + 1, s - 5, x + 45, s - 5, H('#9aa0aa'));
  for (const wx of [x + 9, x + 37]) { R.disco(wx, s - 2, 3, C.k); R.disco(wx, s - 2, 1, H('#9aa0aa')); } };
const termo = (x, y, inclina = 0) => { x = Math.round(x); y = Math.round(y);
  if (inclina > 0.5) { R.rect(x - 2, y - 3, x + 7, y + 1, C.k); R.rect(x - 1, y - 2, x + 6, y, H('#c83a3a')); R.rect(x + 2, y - 2, x + 2, y, H('#2a6a3a')); R.rect(x + 5, y - 2, x + 6, y, H('#d8d8d8')); return [x + 8, y]; }
  R.rect(x - 2, y - 8, x + 2, y + 1, C.k); R.rect(x - 1, y - 7, x + 1, y, H('#c83a3a')); R.rect(x - 1, y - 4, x + 1, y - 4, H('#2a6a3a')); R.rect(x - 1, y - 7, x + 1, y - 6, H('#d8d8d8')); return [x, y - 9]; };
const p1 = (t) => {
  const o = { encuadre: 'caseta', luz: 'tarde', coche: suave(lin(t, SIGUE - 0.8, SIGUE + 0.35)) };
  T.oreja(R, t, o);
  // el funcionario sale de la caseta con el maletín, sube al coche negro y el coche se va
  const sal = suave(lin(t, v(0) - 0.2, RANOUT - 0.75)), fx = Math.round(lerp(122, 52, sal)), dentro = t > RANOUT - 0.5;
  const vaX = lerp(30, -60, suave(lin(t, RANOUT - 0.3, RANOUT + 0.9)));
  sedan(vaX, 156);
  // el dinero del gobierno: un «$» dorado sobre el techo del coche negro, que se va con él
  if (vaX > -40) { const sx = Math.round(vaX + 18), sy = 136 + Math.round(Math.sin(t * 5) * 1); R.rect(sx - 2, sy - 9, sx + 9, sy + 1, C.k); R.rect(sx - 1, sy - 8, sx + 8, sy, H('#2a6a3a')); R.numero('$', sx, sy, {}); R.linea(sx + 3, sy + 1, sx + 3, sy + 4, C.k); }
  if (t > v(0) - 0.2 && !dentro) { const F = R.actor(EL.oficinista, fx, 156, t, { dir: -1, anda: sal < 1, sostiene: [fx - 2, 148] }); R.rect(F.mano[0] - 4, F.mano[1], F.mano[0] + 1, F.mano[1] + 4, C.k); R.rect(F.mano[0] - 3, F.mano[1] + 1, F.mano[0], F.mano[1] + 3, H('#5a3418')); }
  if (vaX < 30 && vaX > -60) for (let k = 0; k < 5; k++) { const e = ((t * 1.6 + k / 5) % 1), x = Math.round(vaX + 46 + k * 5 + e * 8), y = Math.round(153 - e * 7); if (bay(x, y) < 0.6 * (1 - e)) R.disco(x, y, 1 + Math.round(e * 3), H('#c8a888')); }
  // los voluntarios bajan del familiar; ella lleva el termo
  const b1 = suave(lin(t, VOLUNT - 0.1, P2 + 0.4)), b2 = suave(lin(t, VOLUNT + 0.2, P2 + 0.6));
  if (t > VOLUNT - 0.1) R.actor(EL.voluntario1WO, Math.round(lerp(196, 150, b1)), 156, t, { dir: -1, anda: b1 < 1, sonrisa: true });
  if (t > VOLUNT + 0.2) { const x2 = Math.round(lerp(204, 168, b2)); const V2 = R.actor(EL.voluntaria2WO, x2, 156, t, { dir: -1, anda: b2 < 1, sostiene: [x2 - 3, 147], habla: Math.sin(t * 8) > 0.3 }); termo(V2.mano[0], V2.mano[1] + 2); }
  T.orejaDelante(R, t, o);
};

// ── 2 · dentro de la caseta, de noche (fondo local) ─────────────────────────────────────────────────────────────
const VENT = [16, 30, 66, 80];
const caseta = () => capa('caseta-dentro', () => {
  // la pared de bloques pintados de verde claro, más oscura arriba (tranquila bajo el año y tras Atom)
  for (let y = 0; y < 124; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 8), junta = y % 8 === 7 || (x + (fila % 2) * 8) % 16 === 15;
    const luz = Math.max(0, 1 - Math.hypot(x - 180, (y - 96) * 1.4) / 170); let c = tono(cols('#3e4a40', '#56645a', '#6e7e70', '#8a9a88'), Math.min(1, y / 120 * 0.6 + luz * 0.6), x, y);
    if (junta && y > 24 && !(x >= 272 && y <= 48)) c = mez(c, H('#2a322c'), 0.45); R.pset(x, y, c); }
  // el zócalo y el suelo de linóleo a cuadros en perspectiva
  R.rect(0, 124, 319, 127, H('#3a2a22'));
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const z = (y - 120) / 60, u = (x - 160) / (0.5 + z * 1.5), w = Math.floor(z * 6 + 10);
    const cuad = (Math.floor(u / 22 + 50) + w) % 2; let c = tono(cuad ? cols('#8a7a5a', '#a08e6a') : cols('#4a3e30', '#5a4c3a'), 0.3 + hs(x, y, 2) * 0.4, x, y);
    const brillo = Math.max(0, 1 - Math.hypot(x - 170, (y - 150) * 3) / 60); if (brillo > 0) c = mez(c, H('#f0d8a0'), brillo * 0.35); R.pset(x, y, c); }
  // la ventana: marco de aluminio, el cielo de noche con la gran oreja recortada
  R.rect(VENT[0] - 2, VENT[1] - 2, VENT[2] + 2, VENT[3] + 4, C.k); R.rect(VENT[0] - 1, VENT[1] - 1, VENT[2] + 1, VENT[3] + 3, H('#9aa0aa'));
  R.rect(VENT[0] - 3, VENT[3] + 3, VENT[2] + 3, VENT[3] + 5, H('#b8bec6'));
  // el reloj de pared y el corcho con papeles
  R.disco(100, 40, 9, C.k); R.disco(100, 40, 8, H('#f4f0e4')); for (let k = 0; k < 12; k++) R.pset(Math.round(100 + Math.cos(k * Math.PI / 6) * 6), Math.round(40 + Math.sin(k * Math.PI / 6) * 6), H('#3a3438'));
  R.rect(76, 60, 112, 88, C.k); R.rect(77, 61, 111, 87, H('#b0844a')); for (let y = 62; y < 87; y++) for (let x = 78; x < 111; x++) if (hs(x, y, 5) > 0.8) R.pset(x, y, H('#9a7038'));
  for (const [x, y, w, h, c] of [[80, 64, 12, 14, '#f4f0e4'], [96, 66, 12, 10, '#f8e8a0'], [84, 76, 16, 9, '#e8f0f8']]) { R.rect(x, y, x + w, y + h, C.k); R.rect(x + 1, y + 1, x + w - 1, y + h - 1, H(c)); for (let yy = y + 3; yy < y + h - 1; yy += 2) R.linea(x + 2, yy, x + w - 3, yy, H('#9a9aa4')); R.pset(x + Math.round(w / 2), y + 1, H('#d83a3a')); }
  // los bastidores de los receptores: paneles beige con diales, botones y pilotos
  for (const [x0, x1] of [[196, 252], [256, 316]]) { R.rect(x0, 50, x1, 123, C.k); R.rect(x0 + 1, 51, x1 - 1, 122, H('#c8bca0'));
    for (let y = 56; y < 120; y += 22) { R.rect(x0 + 2, y, x1 - 2, y + 19, H('#b0a488')); R.rect(x0 + 2, y + 19, x1 - 2, y + 19, H('#8a7e66')); R.rect(x0 + 2, y, x1 - 2, y, H('#e0d6bc'));
      for (let k = 0; k < 3; k++) { const kx = x0 + 8 + k * 14; R.disco(kx, y + 13, 3, C.k); R.disco(kx, y + 13, 2, H('#3a3438')); R.pset(kx, y + 11, H('#e0d6bc')); } } }
  // el registrador de papel (su ventana) y el osciloscopio (su pantalla) los pinta el plano
  R.rect(200, 58, 248, 74, C.k); R.rect(262, 58, 290, 74, C.k);
  // la mesa de consola delante de los bastidores y la mesita plegable de la izquierda
  R.poligono([[188, 124], [319, 124], [319, 134], [184, 134]], H('#6a5a48')); R.rect(184, 134, 319, 136, C.k); R.rect(186, 125, 319, 126, H('#8a7a62'));
  for (let x = 196; x < 316; x += 10) { R.pset(x, 129, H('#e8c060')); R.pset(x + 3, 130, H('#3a3438')); }
  R.rect(112, 150, 158, 152, C.k); R.rect(113, 150, 157, 151, H('#5a6a7a')); R.rect(113, 150, 157, 150, H('#8a9aaa')); R.linea(116, 152, 112, 166, H('#3a3438')); R.linea(154, 152, 158, 166, H('#3a3438')); R.linea(116, 153, 156, 165, H('#2a2830'));
  // la estufa eléctrica en el suelo y la papelera con bolas de papel
  R.rect(150, 150, 172, 168, C.k); R.rect(151, 151, 171, 167, H('#8a8e96')); for (let y = 154; y < 166; y += 3) R.rect(153, y, 169, y, H('#e86a2a'));
  R.rect(60, 150, 76, 170, C.k); R.rect(61, 151, 75, 169, H('#4a5a6a')); for (const [x, y] of [[64, 150], [70, 149], [67, 147]]) { R.disco(x, y, 2, C.k); R.disco(x, y, 1, H('#f4f0e4')); }
  // el cable que cruza el suelo
  for (let x = 176; x < 319; x++) R.pset(x, Math.round(162 + Math.sin(x * 0.05) * 3), H('#1e1a20'));
});
const calendario = (t, pasa) => {
  const x0 = 124, y0 = 30, x1 = 166, y1 = 80;
  R.rect(x0, y0, x1, y1, C.k); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, H('#f4f0e4'));
  // la lámina de arriba: un paisaje (diciembre: la granja con nieve; enero, ya en 1973: el campo con el sol de invierno)
  const nuevo = pasa >= 1; R.rect(x0 + 2, y0 + 2, x1 - 2, y0 + 20, H(nuevo ? '#8ab0d8' : '#5a6a9a'));
  R.rect(x0 + 2, y0 + 15, x1 - 2, y0 + 20, H(nuevo ? '#e8ecf0' : '#4a7a3a')); R.rect(x0 + 8, y0 + 9, x0 + 16, y0 + 15, H('#b83a2a')); R.poligono([[x0 + 7, y0 + 9], [x0 + 17, y0 + 9], [x0 + 12, y0 + 5]], H(nuevo ? '#f4f8fc' : '#5a3a2a'));
  if (!nuevo) R.disco(x1 - 8, y0 + 7, 2, H('#f8e8a0')); else R.disco(x1 - 8, y0 + 7, 3, H('#ffd36a'));
  // la rejilla del mes (siete columnas), los fines de semana rodeados
  for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) { const x = x0 + 4 + c * 5, y = y0 + 25 + r * 5; R.rect(x, y, x + 2, y + 2, H('#9a9aa4')); if (c === 0 || c === 6) { R.pset(x - 1, y + 1, H('#d83a3a')); R.pset(x + 3, y + 1, H('#d83a3a')); R.pset(x + 1, y - 1, H('#d83a3a')); R.pset(x + 1, y + 3, H('#d83a3a')); } }
  R.disco(x0 + 21, y0, 2, C.k); R.pset(x0 + 21, y0, H('#c8c8d0'));
  // las hojas que pasan hacia arriba
  if (pasa > 0 && pasa < 1) for (let k = 0; k < 3; k++) { const f = Math.min(1, Math.max(0, pasa * 3 - k)); if (f <= 0 || f >= 1) continue; const h = Math.round((y1 - y0) * (1 - f)); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + h, H('#e8e2d0')); R.rect(x0 + 1, y0 + h, x1 - 1, y0 + h, H('#9a9080')); }
};
const p2 = (t) => {
  caseta();
  // el cielo de noche por la ventana, con la oreja recortada
  R.recorte(VENT);
  for (let y = VENT[1]; y <= VENT[3]; y++) for (let x = VENT[0]; x <= VENT[2]; x++) R.pset(x, y, tono(cols('#0e1428', '#16204a', '#24305a'), (y - VENT[1]) / 50, x, y));
  for (let k = 0; k < 18; k++) { const x = VENT[0] + Math.floor(hs(k, 1, 4) * 50), y = VENT[1] + Math.floor(hs(k, 2, 4) * 38); R.pset(x, y, Math.sin(t * 2 + k) > 0 ? H('#ffffff') : H('#8a98c8')); }
  R.disco(56, 40, 4, H('#f4ecd0')); R.disco(57, 39, 4, H('#16204a'));
  for (let x = VENT[0]; x <= VENT[2]; x++) { const top = Math.round(56 + 16 * Math.pow((VENT[2] - x) / 50, 1.6)); for (let y = top; y <= VENT[3]; y++) R.pset(x, y, (x % 6 === 0) ? H('#2a3048') : (y - top) % 6 === 0 ? H('#22283e') : H('#1a1e30')); R.pset(x, top, H('#8a9ac8')); }
  for (let x = VENT[0]; x <= VENT[2]; x += 9) R.linea(x, 76, x + 4, 70, H('#12162a'));
  R.recorte(null);
  R.rect(40, VENT[1], 41, VENT[3], H('#9aa0aa'));
  // el reloj corre (la tarde pasa) y el calendario pasa sus hojas a «1973»
  const hora = (t - P2) * 2.2; R.linea(100, 40, Math.round(100 + Math.cos(hora - 1.6) * 6), Math.round(40 + Math.sin(hora - 1.6) * 6), H('#3a3438')); R.linea(100, 40, Math.round(100 + Math.cos(hora / 12 + 0.5) * 4), Math.round(40 + Math.sin(hora / 12 + 0.5) * 4), H('#1e1a20'));
  calendario(t, lin(t, Y1973 - 0.1, Y1973 + 0.5));
  // el registrador: el papel corre hacia abajo y la plumilla escribe ruido; el osciloscopio late
  for (let y = 59; y < 74; y++) for (let x = 201; x < 248; x++) R.pset(x, y, (x - 201) % 8 === 0 || ((y + Math.floor(t * 10)) % 5 === 0) ? H('#d8e4d0') : H('#f4f0e4'));
  for (let y = 59; y < 74; y++) { const x = Math.round(224 + Math.sin((y + t * 10) * 0.9) * 3 + Math.sin((y + t * 10) * 2.7) * 2); R.pset(x, y, H('#2a4aa8')); }
  for (let y = 59; y < 74; y++) for (let x = 263; x < 290; x++) R.pset(x, y, (x % 6 === 0 || y % 5 === 0) ? H('#0e3a1e') : H('#062a12'));
  for (let x = 263; x < 290; x++) R.pset(x, Math.round(66 + Math.sin(x * 0.6 + t * 9) * 3 * Math.sin(t * 1.3)), H('#5aff8a'));
  // los pilotos de los bastidores y las agujas de los dos medidores
  for (let k = 0; k < 8; k++) R.pset(200 + k * 14, 116, Math.sin(t * 3 + k * 1.7) > 0 ? H('#ff5a3a') : H('#6a2a1a'));
  for (const [cx, k] of [[214, 0], [274, 1]]) { R.rect(cx - 8, 82, cx + 8, 94, C.k); R.rect(cx - 7, 83, cx + 7, 93, H('#f4e8c0')); const a = -2.4 + 0.8 + Math.sin(t * 4 + k) * 0.25 + Math.sin(t * 11 + k) * 0.1; R.linea(cx, 93, Math.round(cx + Math.cos(a) * 9), Math.round(93 + Math.sin(a) * 9), H('#1e1a20')); }
  // el flexo de la consola y su luz
  R.linea(300, 124, 296, 104, H('#3a3438')); R.linea(296, 104, 284, 98, H('#3a3438')); R.poligono([[278, 96], [290, 96], [288, 102], [280, 102]], H('#2a6a3a')); R.pset(284, 103, H('#fff4c0'));
  // la mesita: la taza, el bocadillo y la radio de transistores
  const brinda0 = t > Y1973 + 0.3;
  if (!brinda0) { R.rect(119, 143, 126, 150, C.k); R.rect(120, 144, 125, 149, H('#e8e4dc')); R.rect(126, 145, 127, 147, C.k); const lleno = lin(t, TARDES - 0.1, FINDE + 0.4); if (lleno > 0) R.rect(120, Math.round(149 - lleno * 4), 125, 149, H('#5a3418')); R.rect(120, 144, 125, 144, H('#f4f0e8')); }
  if (t > TARDES + 0.3 && !brinda0) vapor(122, 141, t);
  R.rect(132, 146, 142, 150, C.k); R.rect(133, 147, 141, 149, H('#e8c88a')); R.rect(133, 148, 141, 148, H('#7aa84a'));
  R.rect(146, 141, 155, 150, C.k); R.rect(147, 142, 154, 149, H('#8a2a2a')); for (let y = 143; y < 149; y += 2) R.rect(148, y, 151, y, H('#3a1a1a')); R.pset(153, 144, H('#e8c060')); R.linea(154, 141, 157, 134, H('#9aa0aa'));
  // él sirve el café del termo (a «evenings») y luego brinda; ella anota y gira el dial, y a «1973» mira el calendario
  const sirve = t > TARDES - 0.3 && t < FINDE + 0.6, brinda = t > Y1973 + 0.3;
  const V1 = R.actor(EL.voluntario1WO, 96, 160, t, { dir: 1, sostiene: sirve ? [118, 139] : brinda ? [112, 138 - Math.abs(Math.sin(t * 4)) * 3] : [110, 148], sonrisa: brinda, habla: t > Y1973 + 0.8 && Math.sin(t * 8) > 0 });
  if (sirve) { const [ex, ey] = termo(V1.mano[0] - 2, V1.mano[1] - 1, 1); for (let y = ey; y < 145; y++) if ((y + Math.floor(t * 12)) % 3) R.pset(Math.min(ex, 123), y, H('#5a3418')); }
  else if (brinda) { const [mx, my] = V1.mano; R.rect(mx - 2, my - 4, mx + 3, my + 1, C.k); R.rect(mx - 1, my - 3, mx + 2, my, H('#e8e4dc')); R.rect(mx - 1, my - 3, mx + 2, my - 3, H('#5a3418')); vapor(mx, my - 5, t); }
  else termo(V1.mano[0], V1.mano[1]);
  const mira = t > Y1973 - 0.1 && t < Y1973 + 1.2;
  const V2 = R.actor(EL.voluntaria2WO, 200, 160, t, { dir: mira ? -1 : 1, sostiene: mira ? undefined : true, sorpresa: t > Y1973 && t < Y1973 + 0.6, sonrisa: t > Y1973 + 0.6, dedo: mira && t > Y1973 + 0.4 });
  if (!mira) { const [mx, my] = V2.mano, ex = Math.round(Math.sin(t * 7) * 2);
    R.rect(mx - 1, my - 9, mx + 8, my + 2, C.k); R.rect(mx, my - 8, mx + 7, my + 1, H('#a87a48')); R.rect(mx + 1, my - 7, mx + 6, my, H('#f4f0e4')); for (let y = my - 6; y < my; y += 2) R.linea(mx + 2, y, mx + 5, y, H('#7a7a84')); R.rect(mx + 2, my - 9, mx + 5, my - 8, H('#9aa0aa'));
    R.linea(mx + 4 + ex, my - 3, mx + 8 + ex, my - 8, H('#e8b828')); R.pset(mx + 4 + ex, my - 3, H('#3a3438')); }
  // el cuaderno abierto en la consola
  R.rect(206, 126, 230, 132, C.k); R.rect(207, 127, 217, 131, H('#f4f0e4')); R.rect(219, 127, 229, 131, H('#f4f0e4')); for (let x = 208; x < 229; x += 2) if (x !== 218) R.pset(x, 129, H('#9a9aa4'));
};

// ── 3 · el anochecer desde la cerca: la vaca no se lo toma en serio (fondo local) ───────────────────────────────
const LABIO = (x) => 62 + 22 * Math.pow((319 - x) / 200, 1.6), PLANO_TOP = (x) => 36 + x * 0.42;
const anochecer = () => capa('anochecer', () => {
  cieloT(0, 112, cols('#141c46', '#1e2858', '#2c366a', '#463e78', '#6a4a80', '#9a5a7e', '#c8707a', '#e09070', '#f0b878'));
  // la arboleda lejana en el horizonte
  for (let x = 0; x < 320; x++) { const h = 4 + Math.round(3 * Math.sin(x * 0.07) + 2 * Math.sin(x * 0.19 + 2) + hs(x, 9) * 2); for (let y = 112 - h; y <= 112; y++) R.pset(x, y, tono(cols('#3a3058', '#2a2446'), (y - 112 + h) / (h + 1), x, y)); }
  // el plano a la izquierda: la celosía de canto contra el cielo
  for (let x = 0; x < 96; x++) { const top = Math.round(PLANO_TOP(x)); for (let y = top; y <= 112; y++) { let c = tono(cols('#3a3858', '#2e2c4a', '#24223c'), (y - top) / (112 - top), x, y);
      if (x % 12 === 0 || (y - top) % 10 === 0) c = H('#1a1830'); else if ((x + y * 1.2) % 12 < 1) c = H('#20203a'); R.pset(x, y, c); }
    R.pset(x, top, H('#d89888')); R.pset(x, top + 1, H('#7a5a72')); }
  for (let x = 96; x < 104; x++) for (let y = Math.round(PLANO_TOP(95)) + (x - 96) * 4; y <= 112; y++) R.pset(x, y, H('#1a1830'));
  // el curvo grande de canto, oscuro, con el labio que coge la última luz
  for (let x = 110; x < 320; x++) { const top = Math.round(LABIO(x)); for (let y = top; y <= 112; y++) { let c = tono(cols('#4a4a6a', '#3a3a58', '#2a2a44', '#22223a'), (y - top) / (112 - top), x, y); if ((x - 110) % 18 === 0) c = H('#1a1a2e'); if ((y - top) % 9 === 0) c = mez(c, H('#1a1a2e'), 0.4); R.pset(x, y, c); }
    R.pset(x, top, H('#e8a88a')); R.pset(x, top + 1, H('#9a6a7a')); }
  for (let x = 118; x < 320; x += 30) { R.rect(x, 104, x + 1, 116, H('#1a1a2e')); R.linea(x, 116, x + 14, 104, H('#22223a')); }
  // el campo de rastrojo en perspectiva, el camino de tierra y la caseta con su luz
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const z = (y - 112) / 68; let c = tono(cols('#2a2a3a', '#34303e', '#3e3640', '#4a4040'), z + (hs(x >> 1, y, 3) - 0.5) * 0.3, x, y); if (Math.floor((x - 160) / (2 + z * 10) + 100) % 3 === 0 && hs(x, y, 4) > 0.5) c = mez(c, H('#6a5a48'), 0.4 + z * 0.3); R.pset(x, y, c); }
  for (let y = 112; y < 180; y++) { const x0 = Math.round(170 + (y - 112) * 0.6), w = Math.round(2 + (y - 112) * 0.35); for (let x = x0; x < x0 + w; x++) R.pset(x, y, tono(cols('#5a4a48', '#6a5a52'), hs(x, y, 6), x, y)); }
  R.rect(148, 100, 176, 114, C.k); R.rect(149, 101, 175, 113, H('#4a4650')); R.rect(147, 99, 177, 100, H('#2a2832')); R.rect(156, 104, 166, 109, H('#ffd870')); R.rect(161, 104, 161, 109, H('#a07830'));
  for (let k = 0; k < 3; k++) for (let x = 154 - k * 3; x < 168 + k * 3; x++) { const y = 114 + k; if (bay(x, y) < 0.5 - k * 0.15) R.pset(x, y, H('#8a7040')); }
  R.rect(126, 109, 140, 114, C.k); R.rect(127, 110, 139, 113, H('#5a2a2e')); R.rect(129, 107, 137, 109, H('#3a2a2e'));
  R.linea(170, 76, 170, 99, H('#1a1830')); for (let k = 0; k < 4; k++) R.linea(166 + k, 78 + k * 3, 174 - k, 78 + k * 3, H('#1a1830'));
});
const vaca = (x, s, t, dir, cabeza) => {
  const X = (i) => Math.round(dir > 0 ? x + i : x + 34 - i), m = Math.round(Math.sin(t * 3) * 0.6), B = H('#f4f0e8'), N = H('#2a2430'), S = H('#c8c0b8'), RO = H('#e8a0a0');
  const px = (i, j, c) => R.pset(X(i), s - j, c);
  for (let i = 4; i <= 26; i++) for (let j = 8; j <= 19; j++) { let c = j < 11 ? S : B; if ((i - 12) ** 2 + (j - 15) ** 2 < 14 || (i - 21) ** 2 / 2 + (j - 12) ** 2 < 8) c = N; if (i === 4 || i === 26 || j === 8 || j === 19) c = C.k; px(i, j, c); }
  for (const i of [6, 9, 21, 24]) for (let j = 0; j <= 8; j++) px(i, j, j < 2 ? C.k : N), px(i + 1, j, j < 2 ? C.k : S);
  px(14, 6, RO); px(15, 6, RO); px(16, 7, RO);
  const ct = Math.round(Math.sin(t * 4) * 2); for (let k = 0; k < 7; k++) px(4 - (k > 3 ? 1 : 0) - (ct > 0 && k > 4 ? 1 : 0), 18 - k, N); px(3 + ct, 10, N); px(4 + ct, 10, N);
  const hy = cabeza === 'arriba' ? 24 : cabeza === 'pasta' ? 8 : 18;
  for (let i = 26; i <= 34; i++) for (let j = hy - 5; j <= hy + 2; j++) { let c = i > 31 ? RO : B; if (i === 26 + 0 && j === hy) c = N; if (i === 34 || j === hy - 5 || j === hy + 2) c = C.k; px(i, j, c); }
  px(29, hy, C.k); px(28, hy + 3, H('#e8e0c8')); px(30, hy + 3, H('#e8e0c8')); px(27, hy + 1, N);
  if (cabeza === 'pasta') { px(33, hy - 6 + m, H('#5a8a3a')); px(34, hy - 7, H('#5a8a3a')); }
  else px(33, hy - 2 + m, C.k);
};
const p3 = (t) => {
  anochecer();
  estrellas(t, 40, 2, 60, 3, (x, y) => y > 50);
  R.disco(236, 26, 5, H('#f4ecd0')); R.disco(238, 24, 5, H('#141c46'));
  nubes(t, [[0, 70, 70, 1.4], [200, 82, 54, 2.4], [110, 56, 40, 3.6]], cols('#f0a888', '#b06a80', '#5a4870'), null, (x, y) => y >= 100 || (x >= 110 && y >= LABIO(x) - 1) || (x < 104 && y >= PLANO_TOP(x) - 1));
  // la baliza roja del plano
  if (Math.sin(t * 3.2) > 0.2) { R.pset(3, 36, H('#ff3a3a')); R.pset(2, 36, H('#a02a2a')); R.pset(4, 36, H('#a02a2a')); R.pset(3, 35, H('#a02a2a')); }
  // la camioneta que pasa por la carretera del fondo con los faros, y el voluntario que va hacia la caseta con su linterna
  const cq = lin(t, P3 + 0.3, P4 - 0.4), qx = Math.round(lerp(330, -30, cq));
  if (cq > 0 && cq < 1) { R.rect(qx, 106, qx + 16, 111, C.k); R.rect(qx + 1, 107, qx + 15, 110, H('#3a4a6a')); R.rect(qx + 1, 104, qx + 7, 107, C.k); R.rect(qx + 2, 105, qx + 6, 106, H('#e0c070')); for (let k = 0; k < 10; k++) if (bay(qx - k, 109) < 1 - k / 10) R.pset(qx - k, 109, H('#fff0b0')); R.pset(qx + 15, 108, H('#ff3a3a')); }
  const wv = lin(t, P3 + 0.2, CASI), wx = Math.round(lerp(126, 152, wv));
  if (wv < 1) { R.rect(wx, 104, wx + 2, 111, H('#5a4228')); R.rect(wx, 101, wx + 2, 103, H('#f0c890')); R.pset(wx + (Math.floor(t * 5) % 2), 112, H('#2a2430')); for (let k = 1; k < 7; k++) if (bay(wx + 3 + k, 110) < 1 - k / 7) R.pset(wx + 3 + k, 110 + Math.round(k / 3), H('#fff4b0')); }
  // la vaca: pasta, levanta la cabeza para mirar la gran oreja y, a «took seriously», le da la espalda y sigue pastando
  const gira = t > ENSERIO;
  vaca(gira ? 84 : 70, 160, t, gira ? -1 : 1, t < CASI - 0.4 ? 'pasta' : t < ENSERIO + 0.5 ? 'arriba' : 'pasta');
  // la cerca de delante, con su alambre de espino, la hierba alta y las luciérnagas
  for (const x of [8, 62, 116, 170, 224, 278]) { R.rect(x, 136, x + 3, 172, C.k); R.rect(x + 1, 137, x + 2, 171, H('#5a4436')); R.pset(x + 1, 138, H('#8a7058')); }
  for (const y of [144, 156]) for (let x = 0; x < 320; x++) { const yy = Math.round(y + Math.sin(x * 0.058) * 2); R.pset(x, yy, H('#8a8a9a')); if (x % 9 === 4) { R.pset(x, yy - 1, H('#8a8a9a')); R.pset(x + 1, yy + 1, H('#8a8a9a')); } }
  for (let k = 0; k < 40; k++) { const x = Math.floor(hs(k, 1, 8) * 320), h = 8 + Math.floor(hs(k, 2, 8) * 10), sw = Math.sin(t * 1.8 + k) * 2; R.linea(x, 180, Math.round(x + sw), 180 - h, k % 3 ? H('#3a4a3a') : H('#5a6a48')); }
  for (let k = 0; k < 9; k++) { const x = Math.round(hs(k, 3, 9) * 300 + Math.sin(t * 0.7 + k) * 8), y = Math.round(118 + hs(k, 4, 9) * 50 + Math.cos(t * 0.9 + k) * 4); if (Math.sin(t * 2.2 + k * 1.9) > 0.3) { R.pset(x, y, H('#e8ff8a')); R.pset(x + 1, y, H('#8aa04a')); } }
};

// ── 4 · el estudio de Atom: la oreja casera se despega y una mano la vuelve a pegar ─────────────────────────────
const CAE = ALGUIEN - 0.35, COGE = CAE + 0.35;
const p4 = (t) => {
  const cae = suave(lin(t, CAE, CAE + 0.25)), sube = suave(lin(t, SENAL - 0.6, SENAL));
  const oreja = t < CAE ? 1 : t < SENAL - 0.6 ? 1 - 0.55 * cae : lerp(0.45, 1, sube);
  const g = T.hoy(R, t, { encuadre: 'estudio', camara: 'techo', oreja: oreja >= 0.999 ? 1 : oreja });
  // la mano entra por abajo, coge el vaso al vuelo, lo sube al techo, da dos palmaditas y se va
  const entra = suave(lin(t, CAE + 0.05, COGE)), va = suave(lin(t, SENAL + 0.55, P4 + 4.0));
  if (entra > 0 && va < 1) { const [ex, ey] = g.embudo; const pal = t > SENAL && t < SENAL + 0.5 ? Math.abs(Math.sin((t - SENAL) * 14)) * 2 : 0;
    const wx = ex + 9, wy = Math.round(lerp(200, ey + 3, entra) + va * 60 + pal);
    T.brazo(R, wx + 26, wy + 40, wx, wy, '#5a8ad0', -1); }
  // las motas de yeso que caen al despegarse
  if (t > CAE && t < CAE + 1.2) for (let k = 0; k < 6; k++) { const f = (t - CAE) / 1.2, x = Math.round(160 + k * 6 + Math.sin(k * 3 + t * 4) * 2), y = Math.round(34 + f * (60 + k * 10)); R.pset(x, y, H('#f4f0e8')); }
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], {
  año: (t) => t >= P4 ? 2026 : t >= Y1973 ? 1973 : 1972,
  efectos: [[RANOUT - 0.5, 'puerta'], [RANOUT, 'motor'], [SIGUE - 0.6, 'coche'], [VOLUNT + 0.1, 'puerta'], [TARDES - 0.1, 'burbujas'], [Y1973, 'papel'],
    [P3 + 0.6, 'coche'], [CAE, 'pop'], [SENAL, 'golpecito']],
});
''')
