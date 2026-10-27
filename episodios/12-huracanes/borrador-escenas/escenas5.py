E = {}

# ── piezas comunes a las tres escenas (se pegan al principio de cada cuerpo) ─────────────────────────────────────────
COMUN = r'''
const C = T.C, K = C.k;
const lin = (t, a0, a1) => Math.max(0, Math.min(1, (t - a0) / (a1 - a0)));
const suave = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
const entre = (t, a0, a1) => t >= a0 && t < a1;
const parp = (t, v = 6) => Math.sin(t * v) > 0;
const ruido = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const umbral = (x, y) => (BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const rgb = (c) => [c & 255, (c >>> 8) & 255, (c >>> 16) & 255];
const mezcla = (a, b, f) => { const [ar, ag, ab] = rgb(a), [br, bg, bb] = rgb(b); return (0xff000000 | (Math.round(ab + (bb - ab) * f) << 16) | (Math.round(ag + (bg - ag) * f) << 8) | Math.round(ar + (br - ar) * f)) >>> 0; };
const luz = (c) => { const [r, g, b] = rgb(c); return 0.3 * r + 0.59 * g + 0.11 * b; };
// la zona de Atom y la de la barra del año, que quedan tranquilas
const enAtom = (x, y) => x >= 276 && y <= 46;
'''

# la AT-6 vista desde arriba, para las vistas del satélite
ARRIBA = r'''
// la AT-6 vista desde arriba (para las vistas desde lo alto): fuselaje y ala baja amarillos con la luz por la izquierda,
// el capó y la cola azules, la cubierta de cristal con su brillo, las luces de las puntas (roja a babor, verde a
// estribor) y la hélice que parpadea. a: el rumbo (radianes, 0 hacia la derecha); s: escala (1: 13 px de envergadura).
// o.mascara(x, y, fondo): solo pinta donde devuelve true (para que se meta bajo las nubes); o.sombra [dx, dy]: su sombra
// en el suelo o el mar, desplazada
const avionArriba = (x, y, a, s, t, o = {}) => {
  const ca = Math.cos(a), sa = Math.sin(a), R0 = Math.ceil(7 * s) + 2;
  const forma = (u, v) => {
    const au = u / s, av = v / s, w = Math.abs(av);
    if (au > 4.1 && au < 5.5 && w < 1.15) return 'capo';
    if (w <= 1.2 && au >= -5.3 && au <= 4.1) return au > 0.3 && au < 2.9 && w < 0.8 ? 'cristal' : au < -3.9 ? 'cola' : 'fus';
    if (au >= -1.0 && au <= 1.8 - w * 0.1 && w <= 6.3) return w > 5.5 ? (av < 0 ? 'puntaI' : 'puntaD') : au < -0.2 ? 'alaS' : 'ala';
    if (au >= -5.4 && au <= -4.0 && w <= 2.9) return 'cola';
    return null;
  };
  const col = { fus: C.at6, ala: C.at6, alaS: C.at6S, capo: C.at6A, cola: C.at6A, cristal: hex('#2a3c62'), puntaI: C.rojo, puntaD: hex('#3ab85a') };
  const pinta = (dx, dy, sombra) => {
    for (let j = -R0; j <= R0; j++) for (let i = -R0; i <= R0; i++) {
      const X = Math.round(x + i + dx), Y = Math.round(y + j + dy);
      const u = i * ca + j * sa, v = -i * sa + j * ca, f = forma(u, v);
      let borde = false;
      if (!f) { if (sombra) continue; for (const [p, q] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (forma((i + p) * ca + (j + q) * sa, -(i + p) * sa + (j + q) * ca)) { borde = true; break; } if (!borde) continue; }
      const fondo = R.pget(X, Y);
      if (o.mascara && !o.mascara(X, Y, fondo)) continue;
      if (sombra) { if (umbral(X, Y) < 0.8) R.pset(X, Y, mezcla(fondo, hex('#0e1a2c'), 0.38)); continue; }
      if (borde) { R.pset(X, Y, K); continue; }
      let c = col[f];
      if (f === 'fus' || f === 'ala') { const lado = (-i * 0.7 - j * 0.7) / R0; if (lado > 0.25) c = C.at6L; else if (lado < -0.35) c = C.at6S; }
      if (f === 'cristal' && Math.abs(u / s - 1.6) < 0.5 && v < 0) c = hex('#8ac0e8');
      R.pset(X, Y, c);
    }
  };
  if (o.sombra) pinta(o.sombra[0], o.sombra[1], true);
  pinta(0, 0, false);
  // la hélice: un trazo que gira delante del morro
  const hx = x + ca * 5.9 * s, hy = y + sa * 5.9 * s, g = t * 40;
  for (let k = -3; k <= 3; k++) { if (k === 0) continue; const e = Math.abs(k) / 3, X = Math.round(hx - sa * k * s * Math.cos(g) * 0.95), Y = Math.round(hy + ca * k * s * Math.cos(g) * 0.95), fondo = R.pget(X, Y);
    if (o.mascara && !o.mascara(X, Y, fondo)) continue; if (umbral(X, Y) < 0.75 - e * 0.3) R.pset(X, Y, mezcla(fondo, hex('#d8dce4'), 0.6)); }
};
'''

# los relámpagos vistos desde arriba
RAYO = r'''
// los relámpagos vistos desde arriba: sobre la nube blanca solo se ven si llevan su halo morado y su contorno oscuro.
// Un rayo quebrado (x, y: donde nace; ang: hacia dónde; len: largo; k: su semilla) con sus ramas, que dura lo que f > 0
const rayo = (x, y, ang, len, k, f) => {
  if (f <= 0) return;
  const pts = [[x, y]]; let px = x, py = y;
  for (let i = 1; i <= 5; i++) { const a2 = ang + (ruido(k, i, 91) - 0.5) * 1.6; px += Math.cos(a2) * len / 5; py += Math.sin(a2) * len / 5; pts.push([px, py]); }
  const rama = pts[2], ar = ang + (ruido(k, 9, 91) > 0.5 ? 0.9 : -0.9), r2 = [rama, [rama[0] + Math.cos(ar) * len * 0.3, rama[1] + Math.sin(ar) * len * 0.3]];
  // el halo morado tramado alrededor
  const cx = (x + px) / 2, cy = (y + py) / 2, rh = len * 0.75;
  for (let j = -rh; j <= rh; j++) for (let i = -rh; i <= rh; i++) { const X = Math.round(cx + i), Y = Math.round(cy + j), d = Math.hypot(i, j) / rh; if (d > 1 || enAtom(X, Y) || (Y < 22 && X < 176)) continue; if (umbral(X, Y) < (1 - d) * 0.7 * f) R.pset(X, Y, mezcla(R.pget(X, Y), hex('#b8a8f8'), 0.55)); }
  const traza = (q, c, g) => { for (let i = 1; i < q.length; i++) { const [a0, b0] = q[i - 1], [a1, b1] = q[i], n = Math.ceil(Math.hypot(a1 - a0, b1 - b0)); for (let s = 0; s <= n; s++) { const X = Math.round(a0 + (a1 - a0) * s / n), Y = Math.round(b0 + (b1 - b0) * s / n); if (g) { for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) R.pset(X + dx, Y + dy, c); } else R.pset(X, Y, c); } } };
  traza(pts, hex('#3a2a6a'), true); traza(r2, hex('#3a2a6a'), true); traza(pts, C.blanco, false); traza(r2, hex('#e8e0ff'), false);
};
'''

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['hu-pregunta'] = ('Las preguntas', '''// HU-PREGUNTA (frase 4): las tres preguntas del vídeo, cada una con su imagen. Tres planos:
// 1. el ojo desde lo alto, de cerca (corta desde el ojo por dentro del gancho): el pozo de nubes que gira y, en el
//    fondo, el campo de Texas; la AT-6 diminuta da vueltas dentro con su sombra en los campos y dos gaviotas detrás; en
//    «violent» la pared se enciende con un relámpago doble, y en «quiet center» sale la «?» dorada en el centro del ojo;
// 2. (corta en «Where») el huracán entero sobre el mar, que gira y se aleja un poco: en «power» relampaguea en cuatro
//    sitios y sale una «?» grande sobre el mar; del agua caliente entran cintas de calor en espiral hacia el núcleo (la
//    respuesta que viene); en «flying into one» la AT-6 entra por abajo, se mete bajo las nubes y en «just» asoma dentro
//    del ojo, dando vueltas;
// 3. (corta en «see») la órbita de hoy: la barra del año corre de 1943 a 2026 mientras entra un satélite moderno
//    (cuerpo de papel dorado, ala de paneles, antena y mástil); en «seeing» su cámara destella y el visor enmarca el
//    huracán, y en «coming days in advance» se dibuja el cono del pronóstico con sus días (1 a 5) hasta la costa de
//    Florida, donde late el aviso.''', COMUN + ARRIBA + RAYO + r'''
const a = (f) => en('pregunta', f);
const P2 = a(0.277), P3 = a(0.681);
const violento = a(0.087), calma = a(0.155), centro = a(0.181), poder = a(0.343), volar = a(0.528), dentroDe = a(0.594), solo = a(0.625);
const ver = a(0.784), vienen = a(0.832), dias = a(0.861), antes = a(0.931), fin = a(0.963);

// la «?» o la «!» grandes, con su contorno y una sombra que la despega del fondo
const signo = (s, x, y, esc, c) => { for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1], [1, 1]]) R.icono(s, x + dx, y + dy, K, K, esc); R.icono(s, x, y, c, hex('#a87a18'), esc); };
// dos gaviotas que viajan dentro del ojo, dando vueltas
const gaviotasOjo = (cx, cy, rr, t) => { for (let k = 0; k < 2; k++) { const g = -t * 0.7 + k * 2.4, x = Math.round(cx + Math.cos(g) * rr * (0.75 + 0.2 * k)), y = Math.round(cy + Math.sin(g) * rr * 0.7), ala = Math.sin(t * 8 + k * 2) > 0 ? 1 : 0;
  R.pset(x, y, C.blanco); R.pset(x - 1, y - ala, C.blanco); R.pset(x + 1, y - ala, C.blanco); R.pset(x - 2, y - ala * 2, hex('#c8ccd8')); R.pset(x + 2, y - ala * 2, hex('#c8ccd8')); R.pset(x + 3, y + 3, hex('#3a5a2a')); } };

// ── 1 · el ojo desde lo alto, con la AT-6 que da vueltas dentro ─────────────────────────────────────────────────────
const p1 = (t) => {
  const zoom = 3.7 + 0.7 * suave(t / P2), o = { vista: 'arriba', zoom, suelo: 'texas' };
  T.ojo(R, t, o);
  const { x: cx, y: cy, r } = T.b_ojoArribaGeo(o);
  // «violent»: la pared se enciende dos veces, en dos sitios
  const f1 = entre(t, violento - 0.02, violento + 0.2) ? 1 : 0, f2 = entre(t, violento + 0.3, violento + 0.48) ? 1 : 0;
  rayo(cx + r * 1.25, cy - r * 0.9, 2.2, r * 0.9, 3, f1); rayo(cx - r * 1.5, cy + r * 0.6, -0.4, r * 0.8, 7, f2); rayo(cx + r * 0.2, cy + r * 1.35, 0.3, r * 0.6, 11, f2);
  gaviotasOjo(cx, cy, r * 0.42, t);
  // la AT-6 da vueltas en sentido antihorario, ladeada, con su sombra en los campos
  const g = 0.9 - t * 1.05, rr = r * 0.6, x = cx + Math.cos(g) * rr, y = cy + Math.sin(g) * rr * 0.9, rumbo = Math.atan2(-Math.cos(g) * 0.9, Math.sin(g));
  avionArriba(Math.round(x), Math.round(y), rumbo, 1.4, t, { sombra: [7, 6] });
  // «quiet center»: la «?» sale en el centro del ojo y se queda, flotando
  const q = lin(t, calma, calma + 0.25); if (q > 0) { const esc = q < 1 ? 1 : 2, bote = q < 1 ? 0 : Math.round(Math.sin((t - calma) * 4) * 1.2); signo('?', Math.round(cx - 2.5 * esc), Math.round(cy - 3.5 * esc) + bote, esc, C.oroL); }
};

// ── 2 · el huracán entero sobre el mar; la AT-6 se mete en él ───────────────────────────────────────────────────────
const marOscuro = (x, y, c) => luz(c) < 118;
const p2 = (t) => {
  const zoom = 1.85 - 0.3 * suave(lin(t, P2, P3)), o = { vista: 'arriba', zoom, centro: [146, 98] };
  T.ojo(R, t, o);
  const { x: cx, y: cy, r } = T.b_ojoArribaGeo(o);
  // «power»: el núcleo se enciende por dentro, dos veces
  const f1 = entre(t, poder - 0.02, poder + 0.18) ? 1 : 0, f2 = entre(t, poder + 0.26, poder + 0.42) ? 1 : 0;
  rayo(cx - r * 2.6, cy - r * 1.8, 0.6, 26, 5, f1); rayo(cx + r * 2.2, cy + r * 1.2, 2.6, 22, 8, f1); rayo(cx + r * 0.6, cy - r * 3.0, 1.9, 20, 13, f2); rayo(cx - r * 1.4, cy + r * 3.2, -0.9, 18, 17, f2);
  // la respuesta que viene: del mar caliente salen cintas de calor que entran en espiral hacia el núcleo y se meten
  // bajo las nubes (solo se ven sobre el mar)
  const calor = lin(t, poder - 0.2, poder + 0.7);
  if (calor > 0) for (let k = 0; k < 26; k++) {
    const u = ((t * 0.16 + ruido(k, 3, 7)) % 1), g0 = ruido(k, 1, 7) * Math.PI * 2, rr = lerp(230, 70, u), g = g0 - u * 2.2;
    for (let i = 0; i < 7; i++) { const gi = g + i * 0.012, ri = rr + i * 1.6, X = Math.round(cx + Math.cos(gi) * ri * 1.15 + Math.sin(t * 6 + i + k) * 0.6), Y = Math.round(cy + Math.sin(gi) * ri * 0.85);
      if (X < 0 || X > 319 || Y < 0 || Y > 179 || enAtom(X, Y) || (Y < 22 && X < 176)) continue; const f = R.pget(X, Y);
      if (marOscuro(X, Y, f) && umbral(X, Y) < calor * Math.sin(u * Math.PI) * 1.3) { R.pset(X, Y, mezcla(f, i < 2 ? C.calorL : C.calor, 0.75)); if (i < 5) R.pset(X, Y + 1, mezcla(R.pget(X, Y + 1), C.calor, 0.4)); } }
  }
  // «power?»: la «?» grande sobre el mar, a la derecha
  const q = lin(t, poder, poder + 0.2); if (q > 0) signo('?', 258, Math.round(lerp(118, 102, suave(q)) + (q >= 1 ? Math.sin((t - poder) * 3.5) * 1.5 : 0)), q < 0.5 ? 2 : 3, C.oroL);
  // «flying into one»: la AT-6 entra por abajo a la izquierda y se mete bajo las bandas; en «just» asoma en el ojo
  const v = lin(t, volar - 0.15, solo + 0.1);
  if (v > 0) { const x = lerp(-10, cx - 2, v), y = lerp(176, cy + 2, v) + Math.sin(v * 5) * 4, rumbo = Math.atan2(cy + 2 - 176, cx - 2 + 10);
    avionArriba(Math.round(x), Math.round(y), rumbo, 0.8, t, { mascara: marOscuro, sombra: [4, 3] }); }
  if (t > solo + 0.1) { const g = -(t - solo - 0.1) * 2.2 - 2.4, x = cx + Math.cos(g) * r * 0.45, y = cy + Math.sin(g) * r * 0.4; avionArriba(Math.round(x), Math.round(y), g - Math.PI / 2, 0.8, t, { mascara: marOscuro, sombra: [3, 2] }); }
};

// ── 3 · la órbita de hoy: el satélite moderno y el cono del pronóstico ──────────────────────────────────────────────
// el satélite meteorológico de hoy, de perfil: el cuerpo forrado de papel dorado arrugado, el radiador blanco, el ala de
// paneles solares con su brazo (el brillo del sol la recorre), la cámara que mira a la Tierra con su parasol, la antena
// parabólica y el mástil del magnetómetro. Devuelve dónde está el ojo de la cámara
const satelite = (x, y, t) => {
  const { rect, pset, linea, disco } = R;
  // el ala de paneles (cinco paneles con celdas), unida al cuerpo por un brazo
  linea(x - 18, y - 1, x - 10, y - 1, C.metalD); linea(x - 18, y, x - 10, y, C.metal);
  rect(x - 66, y - 8, x - 18, y + 6, K);
  for (let p = 0; p < 5; p++) { const x0 = x - 65 + p * 9.6 | 0;
    for (let j = y - 7; j <= y + 5; j++) for (let i = x0; i < x0 + 9; i++) { const borde = i === x0 || j === y - 7 || j === y + 5, celda = (i - x0) % 3 === 0 || (j - y) % 3 === 0;
      const brillo = Math.abs(((i - x) + (j - y) * 0.8 - ((t * 26) % 130 - 60))) < 3;
      pset(i, j, borde ? hex('#8a94a8') : brillo ? hex('#8ab4f0') : celda ? hex('#2a4a9a') : ((i + j) % 2 ? hex('#16285e') : hex('#1c3270'))); } }
  // el cuerpo de papel dorado, con sus arrugas y el radiador blanco arriba
  rect(x - 10, y - 10, x + 10, y + 10, K);
  for (let j = y - 9; j <= y + 9; j++) for (let i = x - 9; i <= x + 9; i++) { const n = ruido(i >> 1, j >> 1, 61), lado = (i - x + j - y) / 18;
    pset(i, j, j < y - 5 ? (j === y - 9 ? C.blanco : (i + j) % 4 ? hex('#e4e8ee') : hex('#b8c0cc')) : n > 0.82 ? hex('#fff0a0') : lado < -0.3 ? hex('#f0c848') : lado > 0.4 || n < 0.18 ? hex('#a8781c') : hex('#d8a838')); }
  rect(x - 9, y - 5, x + 9, y - 5, hex('#8a6a18'));
  // la cámara que mira a la Tierra, con su parasol negro
  rect(x - 5, y + 10, x + 6, y + 17, K); rect(x - 4, y + 11, x + 5, y + 16, hex('#e8ecf2')); rect(x - 4, y + 11, x - 3, y + 16, hex('#b8c0cc'));
  rect(x - 1, y + 14, x + 3, y + 18, K); pset(x + 1, y + 17, hex('#3a5a8a'));
  // la antena parabólica a la derecha y el mástil del magnetómetro
  for (let j = -6; j <= 6; j++) { const w = Math.round(Math.sqrt(36 - j * j) * 0.45); rect(x + 13, y + j, x + 13 + w, y + j, K); if (w > 0) rect(x + 13, y + j, x + 12 + w, y + j, j < 0 ? C.blanco : hex('#c8ccd8')); }
  linea(x + 10, y, x + 13, y, C.metalD); linea(x + 16, y, x + 19, y, C.metal); pset(x + 20, y, K);
  linea(x + 8, y - 10, x + 30, y - 26, C.metalL); linea(x + 9, y - 10, x + 31, y - 26, C.metalD); rect(x + 30, y - 29, x + 33, y - 26, K); rect(x + 31, y - 28, x + 32, y - 27, C.blanco);
  return [x + 1, y + 18];
};
const DIAS = [[22.6, -57.6], [23.4, -62.2], [24.2, -66.6], [25.1, -71.0], [26.1, -75.3], [27.3, -79.6]];
const año3 = (t) => t < P3 + 0.05 ? 1943 : Math.round(lerp(1943, 2026, suave(lin(t, P3 + 0.05, ver - 0.05))));
const p3 = (t) => {
  const { P } = T.orbita(R, t, { encuadre: 'cerca', espiral: 1, espiralEn: DIAS[0], mira: [21.2, -68.5], tiros: false });
  const sx = Math.round(lerp(-50, 132, suave(lin(t, P3, ver - 0.1))) + Math.max(0, t - ver) * 7), sy = Math.round(56 + Math.sin(t * 1.3) * 1.5);
  const H = P(DIAS[0]);
  // «seeing»: el haz de la cámara barre hacia el huracán y el visor lo enmarca
  const ve = lin(t, ver, ver + 0.5);
  const [ox, oy] = [sx + 1, sy + 18];
  if (ve > 0) { const barre = (t - ver) * 1.8 % 1;
    for (let y = oy + 2; y < H[1] + 24; y++) { const f = (y - oy) / (H[1] + 24 - oy), w = 2 + f * 34, xc = lerp(ox, H[0], f);
      for (let x = Math.round(xc - w); x <= Math.round(xc + w); x++) { if (x < 0 || x > 319) continue; const borde = Math.abs(Math.abs(x - xc) - w) < 1, linea = Math.abs(f - barre) < 0.03;
        if ((borde && (x + y) % 2 === 0) || (linea && umbral(x, y) < 0.6) || umbral(x, y) < 0.07 * ve) R.pset(x, y, mezcla(R.pget(x, y), hex('#bfe8ff'), borde || linea ? 0.65 : 0.4)); } }
    // el visor: cuatro esquinas que se cierran sobre el huracán, con su piloto rojo
    const w = Math.round(lerp(56, 30, suave(ve))), h = Math.round(w * 0.66), [vx, vy] = H.map(Math.round);
    for (const [sx2, sy2] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const X = vx + sx2 * w, Y = vy + sy2 * h; R.rect(Math.min(X, X - sx2 * 7), Y, Math.max(X, X - sx2 * 7), Y, C.blanco); R.rect(X, Math.min(Y, Y - sy2 * 5), X, Math.max(Y, Y - sy2 * 5), C.blanco); }
    if (parp(t, 9)) R.rect(vx + w - 3, vy - h + 2, vx + w - 2, vy - h + 3, C.rojo);
  }
  satelite(sx, sy, t);
  if (entre(t, ver, ver + 0.18)) { for (let k = 1; k < 9; k++) { R.pset(ox + k, oy, C.blanco); R.pset(ox - k, oy, C.blanco); R.pset(ox, oy + k, C.blanco); } R.disco(ox, oy, 2, C.blanco); }
  // «coming days in advance»: el cono del pronóstico y la trayectoria, día a día, hasta la costa
  const u = lin(t, vienen - 0.05, antes + 0.25);
  if (u > 0) {
    const pts = DIAS.map((d) => P(d)), n = pts.length - 1, hasta = u * n;
    const camino = []; for (let k = 0; k <= Math.floor(hasta); k++) camino.push([pts[k][0], pts[k][1], k]);
    if (hasta < n) { const i = Math.floor(hasta), e = hasta - i; camino.push([lerp(pts[i][0], pts[i + 1][0], e), lerp(pts[i][1], pts[i + 1][1], e), hasta]); }
    if (camino.length > 1) {
      // el cono: los bordes se abren con los días; se rellena tramado y se le marca el borde
      const izq = [], der = [];
      camino.forEach(([x, y, f], k) => { const a0 = camino[Math.max(0, k - 1)], a1 = camino[Math.min(camino.length - 1, k + 1)], dx = a1[0] - a0[0], dy = a1[1] - a0[1], l = Math.hypot(dx, dy) || 1, w = 2 + f * 3.2;
        izq.push([x - dy / l * w, y + dx / l * w]); der.push([x + dy / l * w, y - dx / l * w]); });
      const pol = [...izq, ...der.reverse()];
      let x0 = 320, x1 = 0, y0 = 180, y1 = 0; for (const [x, y] of pol) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
      const dentro = (X, Y) => { let c = false; for (let i = 0, j = pol.length - 1; i < pol.length; j = i++) { const [xi, yi] = pol[i], [xj, yj] = pol[j]; if ((yi > Y) !== (yj > Y) && X < (xj - xi) * (Y - yi) / (yj - yi) + xi) c = !c; } return c; };
      for (let Y = Math.floor(y0) - 1; Y <= y1 + 1; Y++) for (let X = Math.floor(x0) - 1; X <= x1 + 1; X++) { if (!dentro(X + 0.5, Y + 0.5)) continue;
        const borde = !dentro(X - 0.5, Y + 0.5) || !dentro(X + 1.5, Y + 0.5) || !dentro(X + 0.5, Y - 0.5) || !dentro(X + 0.5, Y + 1.5);
        if (borde) R.pset(X, Y, C.blanco); else if ((X + Y) % 2 === 0) R.pset(X, Y, mezcla(R.pget(X, Y), C.blanco, 0.55)); }
      for (let k = 1; k < camino.length; k++) R.linea(Math.round(camino[k - 1][0]), Math.round(camino[k - 1][1]), Math.round(camino[k][0]), Math.round(camino[k][1]), K);
    }
    // los puntos de cada día, con su número encima; el último, rojo (la llegada a la costa)
    for (let k = 1; k <= Math.floor(hasta + 0.001); k++) { const [px, py] = pts[k].map(Math.round), b = Math.min(1, (hasta - k) * 3 + 0.4);
      R.disco(px, py, 3, K); R.disco(px, py, 2, k === n ? C.rojo : C.blanco); R.numero(String(k), px, py - 6 - Math.round((1 - b) * 3), { centro: true }); }
  }
  // «in advance»: en la costa late el aviso
  const av = lin(t, antes + 0.25, antes + 0.45);
  if (av > 0) { const [px, py] = P(DIAS[DIAS.length - 1]).map(Math.round), r = 4 + ((t - antes) * 14) % 10;
    for (let g = 0; g < Math.PI * 2; g += 0.12) { const X = Math.round(px + Math.cos(g) * r), Y = Math.round(py + Math.sin(g) * r * 0.8); if (umbral(X, Y) < 0.8 - r / 16) R.pset(X, Y, C.rojo); }
    signo('!', px - 14, py - 20, 2, hex('#ff6a5a')); }
};

const efectos = [[0.15, 'whoosh'], [violento - 0.02, 'trueno'], [calma + 0.05, 'brillo'],
  [poder, 'boom'], [poder + 0.12, 'pop'], [volar, 'whoosh'], [solo + 0.15, 'pop'],
  [P3 + 0.05, 'tecleo', { dur: 0.6 }], [ver, 'flash'], [vienen + 0.15, 'tic'], [dias + 0.1, 'tic'], [dias + 0.4, 'tic'], [antes - 0.1, 'tic'], [antes + 0.15, 'tic'], [antes + 0.3, 'aviso']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: (t) => (t < P3 ? 1943 : año3(t)) });
''')

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['hu-hola'] = ('Hola', '''// HU-HOLA (frase 5): Atom se presenta. Un solo plano, sin barra del año: el huracán entero desde lo alto, girando junto
// a la costa de Texas (la bahía, la isla, los ríos), con los cirros que se escapan y los fucilazos en las bandas; en
// «school didn't teach you» sale una «?» dorada sobre la tierra; en «Let's find out» la «?» se convierte en «!» y la
// cámara se lanza en picado hacia el ojo.''', COMUN + RAYO + r'''
const a = (f) => en('hola', f);
const escuela = a(0.42), vamos = a(0.797), fuera = a(0.895);
const signo = (s, x, y, esc, c) => { for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1], [1, 1]]) R.icono(s, x + dx, y + dy, K, K, esc); R.icono(s, x, y, c, hex('#a87a18'), esc); };
const plano = (t) => {
  const pica = suave(lin(t, vamos, E.duracion + 0.2)), zoom = lerp(0.8 + 0.05 * t / vamos, 3.6, pica * pica);
  const o = { vista: 'arriba', zoom, suelo: 'texas' };
  T.ojo(R, t, o);
  const { x: cx, y: cy, r } = T.b_ojoArribaGeo(o);
  // relámpagos en las bandas, de vez en cuando
  rayo(cx - 70, cy - 30, 0.5, 18, 2, entre(t, 1.05, 1.2) ? 1 : 0); rayo(cx + 40, cy + 34, 2.4, 16, 6, entre(t, 3.0, 3.14) ? 1 : 0);
  // «school didn't teach you»: la «?» dorada sobre la tierra; en «find out» se vuelve «!» y se lanza hacia el ojo
  const q = lin(t, escuela, escuela + 0.25), va = suave(lin(t, fuera + 0.05, fuera + 0.6));
  if (q > 0 && va < 1) { const ex = t > fuera, x0 = ex ? 64 : 60, y0 = lerp(78, 60, suave(q)) + Math.sin((t - escuela) * 3.2) * 1.5;
    const esc = va < 0.55 ? 3 : va < 0.85 ? 2 : 1, x = Math.round(lerp(x0, cx - 1.5 * esc, va)), y = Math.round(lerp(y0, cy - 3.5 * esc, va));
    signo(ex ? '!' : '?', x, y, esc, ex ? C.oroL : hex('#f8e8b0')); }
  if (entre(t, fuera + 0.55, fuera + 0.75)) for (let k = 1; k < 7; k++) { R.pset(cx + k, cy, C.oroL); R.pset(cx - k, cy, C.oroL); R.pset(cx, cy + k, C.oroL); R.pset(cx, cy - k, C.oroL); }
};
const efectos = [[0.35, 'brillo'], [1.05, 'trueno'], [escuela + 0.05, 'pop'], [vamos, 'whoosh'], [fuera + 0.55, 'brillo']];
T.rodar(E, R, [[0, plano]], { efectos });
''')

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['hu-cazadores'] = ('Los cazahuracanes', '''// HU-CAZADORES (frase 16), 1943, cartela «1943». Cuatro planos, todos con acción y vida de fondo:
// 1. la pista de Bryan con la tormenta encima: la AT-6 baja zarandeada por las rachas, toca tierra en «lands» levantando
//    polvo y rueda hasta pararse («safely»); se abre la cubierta, el navegante salta al ala y baja con su taza de café
//    humeante; el oficial meteorológico, que esperaba en el margen sujetándose la gorra, corre con su maletín, sube al ala
//    en «weather officer» y se mete detrás; se cierra la cubierta y en «into the eye» la avioneta corre, levanta la cola,
//    despega y se va hacia la tormenta; relámpago en «second time»; el navegante la despide con los brazos;
// 2. (corta en «And although») delante del hangar: Duckworth repasa su avioneta con la tablilla (da dos golpecitos al ala);
//    en «historians» baja colgada una ficha vieja de 1943 con el vaso de la apuesta y una «?»; en «doubt the bet» le cae un
//    sello rojo en aspa y la ficha se suelta y cae revoloteando; en «simply wanted» Duckworth gira la hélice a mano dos
//    veces, en «test» el motor tose una bocanada de humo y arranca, y en «plane» levanta el pulgar (un «✓» verde); dentro
//    del hangar, los mecánicos trabajan en la otra AT-6;
// 3. (corta en «That day») años después (la barra corre a 1947): el morro de cristal de un gran cuatrimotor plateado de
//    reconocimiento, de cerca; un pintor subido a la escalera pinta el emblema (un círculo azul con la espiral blanca, la
//    avioneta y el aro dorado, sin letras) pincelada a pincelada con las palabras; en «Hurricane Hunters» el emblema brilla y
//    debajo Duckworth, el navegante y el oficial aplauden; en «Pilots» el piloto saluda desde la cabina y llegan dos
//    tripulantes con sus paracaídas;
// 4. (corta en «fly») la plataforma de Bryan con la tormenta grande: una fila de aviones de reconocimiento (la AT-6, un
//    bimotor verde oliva y el cuatrimotor plateado) sube por detrás de los hangares y se mete uno tras otro en la tormenta
//    (la barra corre hasta 1953); Duckworth saluda en «on purpose», el oficial suelta un globo sonda en «measure» que sube
//    meciéndose, y en «from the inside» un relámpago enciende la tormenta y deja ver las siluetas de los aviones dentro.''', COMUN + r'''
const a = (f) => en('cazadores', f);
const P2 = a(0.3355), P3 = a(0.598), P4 = a(0.8185);
const aterriza = a(0.1087), salvo = a(0.1253), oficial = a(0.1998), ojoT = a(0.2361), segunda = a(0.2841), vez = a(0.2969);
const historiadores = a(0.3653), duda = a(0.426), apuesta = a(0.4496), simple = a(0.4956), quiso = a(0.5123), probar = a(0.5348), avionT = a(0.5564);
const dia = a(0.6013), funda = a(0.6503), leyenda = a(0.6669), cazaH = a(0.7179), cazadoresT = a(0.7365), pilotos = a(0.7934);
const proposito = a(0.8816), medir = a(0.9159), dentroT = a(0.961);
// la taza del navegante, con su vapor (que el viento tumba)
const taza = (x, y, t, viento = 1) => { R.rect(x - 2, y - 3, x + 1, y, K); R.rect(x - 1, y - 2, x, y - 1, C.blanco); R.pset(x + 2, y - 2, K);
  for (let k = 0; k < 3; k++) { const u = (t * 1.4 + k / 3) % 1; if (u > 0.8) continue; R.pset(Math.round(x - u * 6 * viento + Math.sin(t * 5 + k) * 0.6), Math.round(y - 4 - u * 5), hex('#e8ecf0')); } };
// el maletín de instrumentos del oficial meteorológico
const maletin = (x, y) => { R.rect(x, y - 4, x + 6, y, K); R.rect(x + 1, y - 3, x + 5, y - 1, hex('#6a4a2a')); R.rect(x + 1, y - 3, x + 5, y - 3, hex('#8a6a3a')); R.rect(x + 2, y - 6, x + 4, y - 5, K); R.pset(x + 3, y - 2, C.oro); };
// la mano que cuelga al andar: dónde lleva algo un personaje (x, suelo, dir)
const enMano = (x, suelo, dir) => [dir > 0 ? x + 12 : x + 2, suelo - 8];

// ── 1 · aterriza, cambia de pasajero y despega otra vez hacia la tormenta ───────────────────────────────────────────
const toca = aterriza, para = salvo + 0.45, abre = para + 0.1, saleN = abre + 0.12, corre0 = para, llegaO = oficial + 0.12, sube = llegaO + 0.08, dentroO = sube + 0.25, cierra = dentroO + 0.12, rueda = cierra + 0.1, despega = segunda + 0.05;
const xAvion = (t) => {
  if (t < toca) return lerp(-14, 118, lin(t, 1.3, toca));
  if (t < para) { const d = t - toca, T0 = para - toca, v0 = 2 * 40 / T0; return 118 + v0 * d - v0 / (2 * T0) * d * d; }
  if (t < rueda) return 158;
  const u = (t - rueda) / 1.75; return 158 + 180 * u * u;
};
const p1 = (t) => {
  T.aerodromo(R, t, { encuadre: 'pista', tormenta: 0.82 });
  const x = xAvion(t), suelo = T.pistaY(x);
  // la altura: baja planeando hasta tocar; después de rodar, se va al aire
  const alt = t < toca ? 44 * Math.pow(1 - lin(t, 1.2, toca), 1.25) : t > despega ? 30 * Math.pow(lin(t, despega, despega + 0.9), 1.5) + Math.max(0, t - despega - 0.9) * 26 : 0;
  const enVuelo = alt > 0.5;
  const inclina = t < toca ? lerp(0.06, 0.14, lin(t, toca - 0.6, toca)) : t < rueda ? lerp(0.12, 0.19, lin(t, toca, toca + 0.6)) : t < despega ? lerp(0.19, 0, lin(t, rueda + 0.2, rueda + 0.6)) : 0.12;
  const helice = t < toca ? 0.75 : t < rueda - 0.15 ? lerp(0.75, 0.3, lin(t, toca, para)) : 1;
  const copiloto = t < saleN ? EL.navegante : t > dentroO ? EL.meteorologo : null;
  const polvo = t > toca && t < toca + 0.9 ? 1 - lin(t, toca, toca + 0.9) : t > rueda + 0.2 && t < despega + 0.3 ? 0.8 : 0;
  T.at6(R, Math.round(x), Math.round(suelo - alt), t, { s: 2, dir: 1, piloto: EL.duckworth, copiloto, helice, inclina, vuelo: enVuelo, suelo: alt < 18 ? suelo : undefined, tren: t > despega + 0.45 ? 1 - lin(t, despega + 0.45, despega + 0.9) : 1,
    sacude: t < toca ? 0.4 * (1 - lin(t, toca - 0.5, toca)) : t > despega ? 0.25 : 0, abierta: t > abre && t < cierra, polvo });
  // el relámpago de «second time», delante de la tormenta
  const rl = entre(t, vez - 0.05, vez + 0.15) || entre(t, vez + 0.25, vez + 0.33);
  if (rl) { let px = 268, py = 62; for (let i = 0; i < 8; i++) { const nx = px + (ruido(i, 3, 41) - 0.5) * 10, ny = py + 6; R.linea(Math.round(px), py, Math.round(nx), ny, hex('#f4f0ff')); R.linea(Math.round(px) + 1, py, Math.round(nx) + 1, ny, hex('#b8a8f8')); px = nx; py = ny; } T.tinte(R, 16, 110, [235, 235, 255], 0.18); }
  // el navegante: salta al ala, baja con su taza y se va hacia el margen; luego despide la avioneta
  if (t > saleN) {
    const xa = 158 - 22, suelo0 = T.pistaY(xa + 7, 0.7) - 8, abajo = lin(t, saleN + 0.15, saleN + 0.4), anda = lin(t, saleN + 0.45, despega - 0.2);
    const nx = Math.round(lerp(xa, 44, anda)), ns = Math.round(anda > 0 ? T.pistaY(nx, 0.96) : lerp(suelo0, T.pistaY(xa, 0.96), abajo));
    const despide = t > despega - 0.1, nd = despide || anda === 0 ? 1 : -1;
    R.actor(EL.navegante, nx, ns, t, { dir: nd, anda: anda > 0 && anda < 1, salto: abajo > 0 && abajo < 1 ? Math.round(Math.sin(abajo * Math.PI) * 6) : 0, brazos: despide && Math.floor(t * 3) % 2 === 0, sonrisa: despide });
    if (!(despide && Math.floor(t * 3) % 2 === 0)) { const [hx, hy] = enMano(nx, ns, nd); taza(hx, hy, t, 1); }
  }
  // el oficial meteorológico: espera en el margen sujetándose la gorra, corre con su maletín, sube al ala y se mete
  if (t < dentroO) {
    const c = lin(t, corre0, llegaO), xo = Math.round(lerp(12, 158 - 34, c)), enAla = t > sube;
    const so = enAla ? Math.round(lerp(T.pistaY(xo, 0.96), T.pistaY(158 - 15, 0.7) - 8, lin(t, sube, sube + 0.12))) : T.pistaY(xo, 0.96);
    const xx = enAla ? Math.round(lerp(xo, 158 - 22, lin(t, sube, sube + 0.12))) : xo;
    R.actor(EL.meteorologo, xx, so, t, { dir: 1, anda: c > 0 && c < 1, dedo: c === 0 && Math.sin(t * 2.3) > -0.2, salto: entre(t, sube, sube + 0.12) ? 4 : 0, habla: enAla && parp(t, 9) });
    if (!enAla) { if (c === 0) maletin(xo + 15, so); else { const [hx, hy] = enMano(xo, so, 1); maletin(hx - 2, hy + 3); } }
  }
};

// ── 2 · delante del hangar: la duda de los historiadores y la prueba del avión ──────────────────────────────────────
const golpe1 = P2 + 0.75, golpe2 = P2 + 1.05, llegaH = simple - 0.55, tira1 = simple, tira2 = quiso, atras = quiso + 0.3;
const fichaVieja = (x, y, t, sello, cae) => {
  const { rect, pset, linea } = R;
  // el cordel y la chincheta de arriba
  if (cae === 0) { linea(x + 24, y - 12, x + 24, y, hex('#8a7a5a')); R.disco(x + 24, y - 1, 2, K); R.disco(x + 24, y - 1, 1, C.rojo); }
  rect(x, y, x + 48, y + 32, K); rect(x + 1, y + 1, x + 47, y + 31, hex('#e8d8b4'));
  for (let j = y + 2; j < y + 31; j++) for (let i = x + 2; i < x + 47; i++) { const n = ruido(i, j, 77); if (n > 0.86) pset(i, j, hex('#d8c49a')); else if (n < 0.05) pset(i, j, hex('#c8b48a')); }
  rect(x + 1, y + 28, x + 47, y + 31, hex('#d8c49a')); rect(x + 44, y + 1, x + 47, y + 4, hex('#c8b48a')); pset(x + 44, y + 4, K);   // el borde gastado y la esquina doblada
  rect(x + 3, y + 3, x + 45, y + 3, hex('#b8a47a')); rect(x + 3, y + 6, x + 22, y + 6, hex('#b8a47a'));   // renglones de la ficha, sin letras
  R.numero('1943', x + 34, y + 9, { color: hex('#7a5a3a'), sombra: false, centro: true });
  // el vaso de la apuesta: un vaso bajo con whisky y hielo
  rect(x + 10, y + 12, x + 22, y + 27, K); rect(x + 11, y + 13, x + 21, y + 26, hex('#e8f0f4')); rect(x + 11, y + 19, x + 21, y + 26, hex('#d8902a')); rect(x + 11, y + 19, x + 21, y + 19, hex('#f0b850'));
  rect(x + 13, y + 16, x + 16, y + 19, hex('#f4fcff')); rect(x + 13, y + 16, x + 13, y + 19, hex('#b8d8e8')); pset(x + 20, y + 14, C.blanco); pset(x + 20, y + 15, C.blanco); rect(x + 11, y + 26, x + 21, y + 26, hex('#a86818'));
  R.icono('?', x + 28, y + 14, hex('#5a3a1a'), hex('#c8b48a'), 2);
  // el sello rojo en aspa, con su tinta salpicada
  if (sello > 0) { const e = Math.min(1, sello); for (let k = -1; k <= 1; k++) { linea(x + 6, y + 6 + k, Math.round(x + 6 + 36 * e), Math.round(y + 6 + 22 * e) + k, hex('#c8282a')); linea(x + 42, y + 6 + k, Math.round(x + 42 - 36 * e), Math.round(y + 6 + 22 * e) + k, hex('#c8282a')); }
    if (e >= 1) for (let k = 0; k < 7; k++) pset(x + 8 + ((ruido(k, 1, 33) * 34) | 0), y + 4 + ((ruido(k, 2, 33) * 24) | 0), hex('#c8282a')); }
};
const p2 = (t) => {
  T.aerodromo(R, t, { encuadre: 'hangar', tormenta: 0.7 });
  // la hélice: quieta, dos tirones a mano y arranca en «test»
  const fase = Math.PI * 0.3 + suave(lin(t, tira1, tira1 + 0.25)) * Math.PI / 2 + suave(lin(t, tira2, tira2 + 0.25)) * Math.PI / 2;
  const motor = lin(t, probar, probar + 0.55), helice = motor > 0 ? 0.12 + 0.88 * motor : 0;
  const humo = t > probar - 0.05 ? Math.max(0, 1 - lin(t, probar, probar + 1.1)) : 0;
  const av = T.at6(R, 222, 166, t, { s: 1.5, dir: 1, piloto: EL.navegante, helice, fase, humo, sacude: motor > 0 ? 0.12 : 0 });
  // Duckworth: repasa el avión con la tablilla, da dos golpecitos al ala, va al morro, gira la hélice y se aparta
  const ida = lin(t, P2 + 0.1, P2 + 0.65), vaMorro = lin(t, llegaH - 0.9, llegaH), aparta = lin(t, atras, atras + 0.35);
  const dx = ida < 1 ? lerp(132, 176, ida) : vaMorro > 0 ? lerp(176, 246, vaMorro) - aparta * 22 : 176;
  const mira = t > llegaH - 0.05 && aparta < 1 ? -1 : vaMorro > 0 && vaMorro < 1 ? 1 : t > golpe1 - 0.2 && t < golpe2 + 0.3 ? 1 : 1;
  const tirando = entre(t, tira1 - 0.15, tira1 + 0.25) || entre(t, tira2 - 0.15, tira2 + 0.25);
  const pulgar = t > avionT - 0.05;
  R.actor(EL.duckworth, Math.round(dx), 174, t, { dir: aparta > 0 && aparta < 1 ? -1 : mira, anda: (ida > 0 && ida < 1) || (vaMorro > 0 && vaMorro < 1) || (aparta > 0 && aparta < 1), dedo: tirando || entre(t, golpe1 - 0.1, golpe1 + 0.12) || entre(t, golpe2 - 0.1, golpe2 + 0.12) || pulgar, sorpresa: entre(t, probar, probar + 0.35), sonrisa: t > probar + 0.4 });
  // la tablilla que lleva bajo el brazo (cuando no tiene la mano arriba)
  if (!(tirando || pulgar)) { const [hx, hy] = enMano(Math.round(dx), 174, mira); R.rect(hx - 2, hy - 6, hx + 2, hy, K); R.rect(hx - 1, hy - 5, hx + 1, hy - 1, C.papel); R.pset(hx, hy - 6, C.metalL); }
  // «plane»: el visto verde junto al morro
  const ok = lin(t, avionT + 0.1, avionT + 0.3); if (ok > 0) T.visto(R, av.morro[0] - 8, av.morro[1] - 30 - Math.round((1 - ok) * 6), 2);
  // la ficha vieja de la apuesta: baja colgada en «historians», el sello en «bet» y cae revoloteando
  const baja = suave(lin(t, historiadores - 0.1, historiadores + 0.35)), cae = lin(t, apuesta + 0.5, apuesta + 1.15);
  if (baja > 0 && cae < 1) { const fx = Math.round(176 + Math.sin(cae * 7) * 10 * cae - cae * 30), fy = Math.round(lerp(-40, 24, baja) + cae * cae * 190 + Math.sin(t * 2) * (cae > 0 ? 0 : 1));
    fichaVieja(fx, fy, t, lin(t, apuesta - 0.04, apuesta + 0.1), cae); }
};

// ── 3 · años después: el emblema en el morro del cuatrimotor ────────────────────────────────────────────────────────
// el morro y el fuselaje delantero de un gran cuatrimotor plateado de reconocimiento, de perfil y de cerca: la cabina
// de cristal en bala con sus marcos, el reflejo que la recorre y los dos pilotos dentro; el aluminio con su luz de cilindro,
// las juntas de las chapas con remaches, el mástil de la antena, la estrella de la época, la puerta del tren delantero con
// su rueda y su sombra en la pista. Las chapas forman la base; el emblema lo pinta encima la escena
const EJE = 84, RAD = 28, NARIZ = 14, FIN_NARIZ = 70;
const radio = (x) => x >= FIN_NARIZ ? RAD : x <= NARIZ ? 0 : RAD * Math.sqrt(Math.max(0, 1 - ((FIN_NARIZ - x) / (FIN_NARIZ - NARIZ)) ** 2));
const ALU = ['#f4f8fc', '#d6dee8', '#bcc6d2', '#9ea8b6', '#7c8696', '#5c6676'].map(hex);
let fuselajeFijo = null;
const pintaFuselaje = () => {
  const { pset, rect, linea } = R;
  for (let x = NARIZ; x < 320; x++) { const r = radio(x); if (r < 1) continue;
    for (let y = Math.ceil(EJE - r); y <= Math.floor(EJE + r); y++) {
      const v = (y - EJE) / r, borde = y === Math.ceil(EJE - r) || y === Math.floor(EJE + r) || x === NARIZ + 1;
      if (borde) { pset(x, y, K); continue; }
      if (x < FIN_NARIZ - 4) {   // la cabina de cristal
        const marcoV = [24, 34, 44, 55].some((m) => Math.abs(x - m) < 0.6), marcoH = [-0.55, -0.12, 0.3, 0.68].some((m) => Math.abs(v - m) < 0.09);
        if (v > 0.8) { pset(x, y, ALU[4]); continue; }
        if (marcoV || marcoH) { pset(x, y, hex('#8a94a4')); continue; }
        const f = (v + 1) / 1.8; pset(x, y, umbral(x, y) < f ? hex('#24344e') : hex('#4a6890')); continue; }
      const tono = v < -0.86 ? 3 : v < -0.66 ? (umbral(x, y) < 0.5 ? 1 : 0) : v < -0.4 ? 0 : v < -0.05 ? (umbral(x, y) < (v + 0.4) / 0.35 ? 2 : 1) : v < 0.35 ? 2 : v < 0.62 ? (umbral(x, y) < (v - 0.35) / 0.27 ? 4 : 3) : v < 0.86 ? 4 : 5;
      pset(x, y, ALU[tono]); }
  }
  // las juntas de las chapas: verticales con sus remaches y dos horizontales
  for (const jx of [92, 124, 156, 188, 220, 252, 284, 316]) for (let y = Math.ceil(EJE - RAD) + 1; y < EJE + RAD; y++) { const p = R.pget(jx, y); pset(jx, y, mezcla(p, ALU[5], 0.45)); if (y % 3 === 0) { pset(jx - 2, y, mezcla(R.pget(jx - 2, y), ALU[0], 0.5)); pset(jx + 2, y, mezcla(R.pget(jx + 2, y), ALU[5], 0.3)); } }
  for (const vj of [-0.45, 0.4]) { const y = Math.round(EJE + vj * RAD); for (let x = FIN_NARIZ - 2; x < 320; x++) { pset(x, y, mezcla(R.pget(x, y), ALU[5], 0.35)); if (x % 4 === 0) pset(x, y + 2, mezcla(R.pget(x, y + 2), ALU[5], 0.25)); } }
  // las puertas de la bodega en la panza y la del tren delantero
  for (let x = 196; x < 320; x++) pset(x, EJE + RAD - 4, ALU[5]); for (const x of [196, 258]) linea(x, EJE + RAD - 4, x, EJE + RAD - 1, ALU[5]);
  rect(60, EJE + RAD - 3, 84, EJE + RAD - 3, ALU[5]);
  // la estrella de la época: disco azul con la estrella blanca, barras blancas con la franja roja y el borde azul
  const sx = 214, sy = EJE + 2;
  rect(sx - 27, sy - 6, sx + 27, sy + 6, hex('#1e3a7a')); rect(sx - 26, sy - 5, sx + 26, sy + 5, C.blanco); rect(sx - 26, sy - 1, sx + 26, sy + 1, C.rojo);
  R.disco(sx, sy, 14, hex('#1e3a7a')); R.disco(sx, sy, 13, hex('#2a4a9a'));
  const est = []; for (let k = 0; k < 10; k++) { const g = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? 5 : 12; est.push([Math.round(sx + Math.cos(g) * r), Math.round(sy + Math.sin(g) * r)]); } R.poligono(est, C.blanco);
  // la portezuela de la tripulación con su asa, y la burbuja de observación
  rect(156, EJE + 4, 170, EJE + 4, ALU[5]); rect(156, EJE + 4, 156, EJE + 24, ALU[5]); rect(170, EJE + 4, 170, EJE + 24, ALU[5]); rect(156, EJE + 24, 170, EJE + 24, ALU[5]); rect(159, EJE + 13, 163, EJE + 14, ALU[4]); rect(159, EJE + 12, 163, EJE + 12, ALU[0]);
  for (let j = -5; j <= 5; j++) for (let i = -5; i <= 5; i++) { const d = Math.hypot(i, j * 1.2); if (d > 5) continue; R.pset(176 + i, EJE - 14 + j, d > 4.2 ? K : (i + j < -2 ? hex('#c8e0f4') : hex('#4a6a94'))); }
  // las tapas de registro y una fila de remaches
  for (const [hx, hy] of [[100, EJE - 19], [140, EJE + 12], [240, EJE - 20], [246, EJE + 14]]) { rect(hx, hy, hx + 6, hy, ALU[4]); rect(hx, hy + 4, hx + 6, hy + 4, ALU[4]); rect(hx, hy, hx, hy + 4, ALU[4]); rect(hx + 6, hy, hx + 6, hy + 4, ALU[4]); }
  // el mástil de la antena y su cable
  rect(150, EJE - RAD - 8, 151, EJE - RAD, ALU[4]); linea(151, EJE - RAD - 7, 319, EJE - RAD - 2, hex('#5a6270'));
};
const fuselaje = (t) => {
  if (!fuselajeFijo) { fuselajeFijo = { buf: R.nuevo(), mask: new Uint8Array(320 * 180) }; const prev = R.usar(fuselajeFijo.buf); R.buf.fill(0); pintaFuselaje(); R.usar(prev); for (let i = 0; i < 57600; i++) fuselajeFijo.mask[i] = fuselajeFijo.buf[i] ? 1 : 0; }
  const B = R.buf, F = fuselajeFijo.buf, M = fuselajeFijo.mask; for (let i = 0; i < 57600; i++) if (M[i]) B[i] = F[i];
  // el reflejo que recorre la cabina de cristal y el aluminio
  const rx = ((t * 40) % 420) - 60;
  for (let y = EJE - RAD; y <= EJE + RAD; y++) for (let x = Math.max(NARIZ, Math.round(rx - 8 + (y - EJE) * 0.5)); x <= Math.min(319, Math.round(rx + (y - EJE) * 0.5)); x++) { if (!M[y * 320 + x] || Math.abs((y - EJE) / Math.max(1, radio(x))) > 0.9) continue; if (umbral(x, y) < 0.45) R.pset(x, y, mezcla(R.pget(x, y), C.blanco, 0.35)); }
};
// el motor de dentro, más cerca que el fuselaje: el ala que asoma de canto, la góndola con el aro del capó, las aletas de
// refrigeración y el escape, y la hélice parada de cuatro palas (de perfil se ve como una pala larga con las puntas
// amarillas), con su buje
const motor = (t) => { const { rect, pset, linea } = R;
  for (let x = 268; x < 320; x++) { rect(x, 94, x, 99, K); rect(x, 95, x, 96, ALU[1]); rect(x, 97, x, 98, ALU[3]); }
  for (let x = 262; x < 320; x++) { const r = x < 272 ? 12 + (x - 262) * 0.3 : 15;
    for (let y = Math.round(114 - r); y <= Math.round(114 + r); y++) { const v = (y - 114) / r, b = y === Math.round(114 - r) || y === Math.round(114 + r);
      pset(x, y, b ? K : x < 270 ? (v < -0.4 ? ALU[2] : v < 0.3 ? ALU[3] : ALU[4]) : v < -0.6 ? ALU[0] : v < -0.1 ? ALU[1] : v < 0.4 ? ALU[2] : v < 0.75 ? ALU[3] : ALU[4]); } }
  for (const x of [276, 280, 284, 288]) linea(x, 102, x, 126, mezcla(ALU[3], K, 0.4));
  rect(292, 124, 300, 128, K); rect(293, 125, 299, 127, hex('#4a3a34')); for (let k = 0; k < 3; k++) { const u = (t * 0.9 + k / 3) % 1; pset(Math.round(300 + u * 8), Math.round(126 + u * 3), hex('#a8a4a0')); }
  // la hélice: la pala de arriba y la de abajo, de canto, con las puntas amarillas; el buje redondo
  for (const [y0, y1] of [[68, 108], [120, 160]]) { rect(255, y0, 259, y1, K); rect(256, y0 + 1, 258, y1 - 1, hex('#2a2a32')); rect(257, y0 + 1, 257, y1 - 1, hex('#4a4a56'));
    const tip = y0 < 100 ? [y0 + 1, y0 + 6] : [y1 - 6, y1 - 1]; rect(256, tip[0], 258, tip[1], C.oro); }
  R.disco(258, 114, 7, K); R.disco(258, 114, 6, ALU[3]); R.disco(256, 112, 3, ALU[1]); pset(255, 111, C.blanco);
};
// los pilotos dentro de la cabina de cristal (siluetas con los auriculares); el de delante saluda en «Pilots»
const pilotosDentro = (t, saluda) => { const vid = hex('#2a3c5e');
  for (const [px, py, gorra] of [[39, 74, '#5e6a44'], [51, 72, '#7a4a2a']]) { const piel = mezcla(hex('#e8b48a'), vid, 0.35), ropa = mezcla(hex(gorra), vid, 0.45);
    R.rect(px - 4, py + 4, px + 4, py + 10, ropa); R.disco(px, py, 3, piel); R.rect(px - 3, py - 4, px + 3, py - 3, mezcla(hex(gorra), vid, 0.3)); R.pset(px + 2, py - 1, hex('#1a2238')); R.pset(px - 4, py, hex('#1a2238')); R.pset(px - 4, py + 1, hex('#1a2238')); }
  // los marcos de la cabina vuelven a pasar por delante de los pilotos
  for (let y = 60; y < 90; y++) for (const m of [34, 44, 55]) if (Math.abs((y - EJE) / Math.max(1, radio(m))) < 0.8) R.pset(m, y, hex('#8a94a4'));
  for (let x = 30; x < 60; x++) { const r = radio(x); for (const v of [-0.55, -0.12]) R.pset(x, Math.round(EJE + v * r), hex('#8a94a4')); }
  if (saluda) { const y = 63 + (Math.floor(t * 6) % 2); R.rect(46, y, 47, y + 6, mezcla(hex('#7a4a2a'), vid, 0.45)); R.rect(45, y - 2, 48, y, mezcla(hex('#e8b48a'), vid, 0.3)); } };
// el tren delantero: la pata con su amortiguador brillante, el compás y la rueda
const trenDelantero = () => { const x = 72, y0 = EJE + RAD - 2, y1 = 156; R.rect(x - 1, y0, x + 2, y1 - 6, K); R.rect(x, y0, x + 1, y1 - 6, ALU[2]); R.rect(x, y0 + 10, x, y1 - 10, ALU[0]); R.linea(x + 2, y0 + 12, x + 6, y0 + 18, ALU[4]); R.linea(x + 6, y0 + 18, x + 2, y0 + 24, ALU[4]);
  R.disco(x + 1, y1 - 2, 8, K); R.disco(x + 1, y1 - 2, 7, hex('#2a2a32')); R.disco(x + 1, y1 - 2, 3, ALU[3]); R.disco(x + 1, y1 - 2, 1, ALU[1]); R.rect(x - 5, y1 - 9, x - 3, y1 - 8, hex('#46464e')); };
// la escalera de tijera de madera, con su bote de pintura colgado
const escalera = (x, y0, y1) => { const { linea, rect } = R; for (const [a0, a1] of [[x, x + 9], [x + 22, x + 13]]) { linea(a0, y1, a1, y0, K); linea(a0 + 1, y1, a1 + 1, y0, C.madera); linea(a0 + 2, y1, a1 + 2, y0, C.maderaS); }
  for (let y = y0 + 8; y < y1 - 2; y += 8) { const f = (y - y0) / (y1 - y0), xa = Math.round(lerp(x + 10, x + 1, f)); rect(xa, y, xa + 6, y + 1, C.maderaL); rect(xa, y + 2, xa + 6, y + 2, C.maderaD); }
  rect(x + 8, y0 - 1, x + 16, y0 + 1, C.madera); rect(x + 8, y0 - 2, x + 16, y0 - 2, C.maderaL);
  rect(x + 14, y0 + 14, x + 19, y0 + 20, K); rect(x + 15, y0 + 15, x + 18, y0 + 19, ALU[2]); rect(x + 15, y0 + 15, x + 18, y0 + 16, hex('#3a7ad0')); R.linea(x + 14, y0 + 14, x + 16, y0 + 10, K); };
// el emblema de los cazahuracanes, sin letras: un disco azul con la espiral blanca del huracán, la avioneta que entra y
// el aro dorado. p 0–1 lo va pintando: el disco a barridos (0–0,3), la espiral (0,3–0,55), la avioneta (0,55–0,75) y el
// aro (0,75–1). Devuelve dónde está el pincel
const EMB = [124, 84];
const emblema = (p, t, brilla) => {
  const [cx, cy] = EMB, { pset } = R; let punta = null;
  const disco = Math.min(1, p / 0.3), espiral = lin(p, 0.3, 0.55), avion = lin(p, 0.55, 0.75), aro = lin(p, 0.75, 1);
  for (let j = -19; j <= 19; j++) for (let i = -19; i <= 19; i++) {
    const d = Math.hypot(i, j), ang = (Math.atan2(i, -j) + Math.PI * 2) % (Math.PI * 2) / (Math.PI * 2), X = cx + i, Y = cy + j;
    if (d <= 15.2 && ang <= disco) { const f = (j + 15) / 30; pset(X, Y, umbral(X, Y) < f ? hex('#2a62b8') : hex('#5a9ae0')); if (d > 14.2) pset(X, Y, hex('#1e3a7a')); }
    if (d > 15.2 && d <= 18.4 && ang <= aro) pset(X, Y, d > 17.6 ? K : d > 16.6 ? hex('#a87a18') : (i + j < 0 ? hex('#fff0a0') : C.oro));
  }
  if (disco < 1) { const g = disco * Math.PI * 2; punta = [cx + Math.sin(g) * 10, cy - Math.cos(g) * 10]; }
  // la espiral: dos brazos que giran al revés que las agujas del reloj
  if (espiral > 0) for (let b = 0; b < 2; b++) for (let s = 0; s <= 1; s += 0.01) { if (s > espiral) break; const r = 1.5 + s * 12, g = b * Math.PI - s * 3.6 + t * 0.4;
    const X = Math.round(cx + Math.cos(g) * r), Y = Math.round(cy + Math.sin(g) * r); pset(X, Y, C.blanco); if (s > 0.15) pset(X + 1, Y, C.blanco); if (s > 0.4) pset(X, Y + 1, hex('#d8e8f8')); if (b === 0 && Math.abs(s - espiral) < 0.012 && espiral < 1) punta = [X, Y]; }
  if (espiral > 0) { R.disco(cx, cy, 2, hex('#2a62b8')); pset(cx, cy, hex('#1e3a7a')); }
  // la avioneta de perfil, oscura, que cruza hacia el ojo
  if (avion > 0) { const forma = ['.y............', '.yy...........', '.yyy......aa..', 'yyyyyyyyyyyaay', '..yyyyyyyyyy..', '.....yyyy.....', '.......yy.....'];
    const lleno = new Set(); forma.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] !== '.' && i / f.length <= avion) lleno.add((cx - 13 + i) + ',' + (cy + 5 + j - Math.round(i * 0.45))); });
    for (const k of lleno) { const [X, Y] = k.split(',').map(Number); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!lleno.has((X + dx) + ',' + (Y + dy))) pset(X + dx, Y + dy, hex('#14204a')); }
    forma.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] !== '.' && i / f.length <= avion) pset(cx - 13 + i, cy + 5 + j - Math.round(i * 0.45), f[i] === 'a' ? hex('#2a4a8a') : j < 3 ? C.at6L : C.at6); });
    if (avion < 1) punta = [cx - 13 + avion * 14, cy + 7 - avion * 6]; }
  if (aro > 0 && aro < 1) { const g = aro * Math.PI * 2; punta = [cx + Math.sin(g) * 17, cy - Math.cos(g) * 17]; }
  // «Hurricane Hunters»: un brillo que cruza y destellos
  if (brilla > 0 && brilla < 1) { const bx = cx - 22 + brilla * 44; for (let j = -18; j <= 18; j++) for (let i = -2; i <= 2; i++) { const X = Math.round(bx + i + j * 0.4), Y = cy + j; if (Math.hypot(X - cx, Y - cy) < 18) R.pset(X, Y, mezcla(R.pget(X, Y), C.blanco, 0.55)); } }
  if (brilla > 0.2) for (const [dx, dy, k] of [[-20, -14, 0], [21, -10, 1], [16, 18, 2]]) if (Math.sin(t * 9 + k * 2) > 0) { const X = cx + dx, Y = cy + dy; for (let r = 1; r < 3; r++) { pset(X + r, Y, C.oroL); pset(X - r, Y, C.oroL); pset(X, Y + r, C.oroL); pset(X, Y - r, C.oroL); } pset(X, Y, C.blanco); }
  return punta;
};
const PINTOR = { ...EL.tecnico, tocado: 'gorra' }, PAL_PINTOR = { C: hex('#e8e4dc'), c: hex('#c0bcb4'), F: hex('#e8e4dc'), W: hex('#e8e4dc'), o: hex('#c84a3a') };
const TRIP = { C: hex('#7a4a2a'), c: hex('#5a341c'), F: hex('#5e6a44'), W: hex('#d8cca8') };
const año3 = (t) => Math.round(lerp(1943, 1947, suave(lin(t, P3 + 0.05, funda))));
const p3 = (t) => {
  T.aerodromo(R, t, { encuadre: 'pista', tormenta: 0.5 });
  // la sombra del avión en la pista
  for (let y = 138; y < 158; y++) for (let x = 20; x < 320; x++) { const f = 1 - Math.abs(y - 148) / 10; if (umbral(x, y) < f * 0.75) R.pset(x, y, mezcla(R.pget(x, y), hex('#2a2a36'), 0.35)); }
  fuselaje(t);
  pilotosDentro(t, entre(t, pilotos - 0.05, pilotos + 0.9));
  trenDelantero();
  motor(t);
  const p = suave(lin(t, dia + 0.05, cazaH)), brilla = lin(t, cazadoresT - 0.1, cazadoresT + 0.5);
  const punta = emblema(p, t, brilla);
  // el pintor en la escalera, con el pincel largo que sigue a la pincelada
  escalera(84, 118, 166);
  const pinta = p > 0 && p < 1;
  const r = R.actor(PINTOR, 87, 119, t, { dir: 1, pal: PAL_PINTOR, dedo: pinta || entre(t, cazadoresT, cazadoresT + 0.8), sonrisa: t > cazaH, quieto: false });
  if (pinta && punta) { const [hx, hy] = r.mano, px = Math.round(punta[0]), py = Math.round(punta[1]); R.linea(hx + 1, hy, px - 1, py, hex('#8a5a2a')); R.linea(hx + 1, hy + 1, px - 1, py + 1, hex('#5a3418')); R.rect(px - 1, py - 1, px + 1, py + 1, K); R.pset(px, py, p < 0.3 ? hex('#5a9ae0') : p < 0.55 ? C.blanco : p < 0.75 ? hex('#14204a') : C.oro); }
  // debajo, el trío de 1943 mira cómo lo pinta; en «Hurricane Hunters» aplauden
  const fiesta = t > cazadoresT - 0.05;
  R.actor(EL.duckworth, 150, 166, t, { dir: -1, dedo: entre(t, funda - 0.1, leyenda + 0.4) || (fiesta && Math.floor(t * 2.5) % 2 === 0), sonrisa: fiesta || t < funda });
  R.actor(EL.navegante, 172, 167, t, { dir: -1, brazos: fiesta && Math.floor(t * 4) % 2 === 0, sonrisa: fiesta }); { const [hx, hy] = enMano(172, 167, -1); if (!(fiesta && Math.floor(t * 4) % 2 === 0)) taza(hx, hy, t, 0.3); }
  R.actor(EL.meteorologo, 194, 166, t, { dir: -1, brazos: fiesta && Math.floor(t * 4 + 2) % 2 === 0, sorpresa: entre(t, leyenda, leyenda + 0.5), sonrisa: fiesta });
  // «Pilots»: dos tripulantes llegan con sus paracaídas a la espalda
  const v = lin(t, pilotos - 0.35, P4 + 0.3);
  if (v > 0) for (const [k, dx] of [[0, 0], [1, -20]]) { const x = Math.round(lerp(-20, 44, v) + dx), s = 167 + k; R.actor(EL.navegante, x, s, t, { dir: 1, anda: true, pal: TRIP }); R.rect(x - 1, s - 20, x + 3, s - 13, K); R.rect(x, s - 19, x + 2, s - 14, hex('#c8c0a0')); }
};

// ── 4 · una fila de aviones de reconocimiento se mete en la tormenta ────────────────────────────────────────────────
// los aviones se pintan en una capa aparte y solo se pasan donde detrás hay cielo azul: salen por detrás de los hangares
// y se meten en las nubes de la tormenta
let capa = null;
const cieloAzul = (c) => { const [r, g, b] = rgb(c); return b - r > 55 && b > 150; };
// el gris azulado de las nubes de la tormenta (no los edificios de delante)
const nubeGris = (c) => { const [r, g, b] = rgb(c); return Math.abs(r - g) < 20 && b >= r - 4 && b - r < 50; };
const conMascara = (dibuja, siluetas) => {
  if (!capa) capa = R.nuevo();
  const B = R.buf; capa.set(B); const prev = R.usar(capa); dibuja(); R.usar(prev);
  for (let i = 0; i < 57600; i++) if (capa[i] !== B[i]) { if (cieloAzul(B[i])) B[i] = capa[i]; else if (siluetas && i < 76 * 320 && i % 320 > 128 && nubeGris(B[i])) B[i] = hex('#2a2838'); }
};
// el bimotor verde oliva (morro a la derecha): fuselaje, morro de cristal, deriva doble, ala de gaviota y el motor con
// la hélice; s 1 mide unos 38 px
const bimotor = (x, y, t) => { const { rect, pset, disco, linea } = R;
  R.poligono([[x - 19, y - 1], [x - 21, y - 9], [x - 17, y - 9], [x - 14, y - 1]], K); R.poligono([[x - 19, y - 2], [x - 20, y - 8], [x - 18, y - 8], [x - 15, y - 2]], hex('#5e6a44'));
  rect(x - 22, y - 1, x - 12, y, K);
  rect(x - 18, y - 3, x + 14, y + 3, K); rect(x - 17, y - 2, x + 13, y + 2, hex('#5e6a44')); rect(x - 17, y + 1, x + 13, y + 2, hex('#a8a89a')); rect(x - 17, y - 2, x + 13, y - 2, hex('#7a8658'));
  rect(x + 14, y - 2, x + 18, y + 2, K); rect(x + 14, y - 1, x + 17, y + 1, hex('#3a5a8a')); pset(x + 15, y - 1, hex('#a8c8e8'));
  rect(x + 4, y - 4, x + 9, y - 3, K); rect(x + 5, y - 4, x + 8, y - 4, hex('#3a5a8a'));
  linea(x - 6, y, x + 8, y - 1, K); linea(x - 6, y + 1, x + 8, y, hex('#46502e'));
  rect(x + 2, y - 2, x + 10, y + 3, K); rect(x + 3, y - 1, x + 9, y + 2, hex('#5e6a44')); rect(x + 9, y - 1, x + 9, y + 2, hex('#2a2a32'));
  for (let j = -5; j <= 6; j++) if ((j + Math.floor(t * 30)) % 3) pset(x + 11, y + j, hex('#c8ccd4'));
  disco(x - 9, y, 1, hex('#2a4a9a')); pset(x - 9, y, C.blanco); };
// el cuatrimotor plateado (morro a la derecha): fuselaje largo, morro de cristal en bala, la deriva alta, el ala con los
// motores y las hélices; s 1 mide unos 54 px
const cuatrimotor = (x, y, t) => { const { rect, pset, linea } = R;
  R.poligono([[x - 26, y - 2], [x - 24, y - 15], [x - 19, y - 15], [x - 15, y - 2]], K); R.poligono([[x - 25, y - 3], [x - 23, y - 14], [x - 20, y - 14], [x - 16, y - 3]], ALU[2]);
  rect(x - 31, y - 1, x - 18, y, K);
  rect(x - 27, y - 4, x + 22, y + 3, K); rect(x - 26, y - 3, x + 21, y + 2, ALU[2]); rect(x - 26, y - 3, x + 21, y - 3, ALU[0]); rect(x - 26, y + 1, x + 21, y + 2, ALU[3]);
  R.poligono([[x + 21, y - 4], [x + 26, y - 2], [x + 27, y + 1], [x + 21, y + 3]], K); rect(x + 22, y - 2, x + 25, y + 1, hex('#3a5a8a')); pset(x + 23, y - 2, hex('#a8c8e8'));
  linea(x - 8, y + 1, x + 9, y + 1, K); linea(x - 8, y + 2, x + 9, y + 2, ALU[4]);
  for (const ex of [x + 1, x + 6]) { rect(ex - 3, y + 1, ex + 4, y + 5, K); rect(ex - 2, y + 2, ex + 3, y + 4, ALU[3]); }
  for (let j = -4; j <= 9; j++) if ((j + Math.floor(t * 30)) % 3) { pset(x + 11, y + j, hex('#c8ccd4')); }
  pset(x - 12, y - 4, ALU[4]); pset(x - 2, y - 4, ALU[4]); R.disco(x - 14, y, 1, hex('#2a4a9a')); pset(x - 14, y, C.blanco); };
const año4 = (t) => Math.round(lerp(1947, 1953, lin(t, P4, E.duracion)));
const p4 = (t) => {
  T.aerodromo(R, t, { tormenta: 0.88 });
  // la fila: cada avión sale por detrás de los hangares, sube y se mete en la tormenta
  const vuelo = (t0, v, dy) => { const d = t - t0; if (d < 0) return null; const x = -36 + v * d, y = (x < 110 ? 31 : 31 + Math.min(32, (x - 110) * 0.34)) + dy; return [Math.round(x), Math.round(y + Math.sin(t * 3 + t0) * 0.8)]; };
  const fl = entre(t, dentroT - 0.04, dentroT + 0.16) || entre(t, dentroT + 0.24, dentroT + 0.34);
  const A = vuelo(P4 - 0.3, 88, 0), B2 = vuelo(P4 + 0.35, 88, 0), C4 = vuelo(P4 + 1.05, 88, 2);
  conMascara(() => {
    if (A) T.at6(R, A[0], A[1] + 4, t, { s: 0.8, dir: 1, vuelo: true, helice: 1, inclina: A[0] > 110 ? -0.18 : 0.04 });
    if (B2) bimotor(B2[0], B2[1], t);
    if (C4) cuatrimotor(C4[0], C4[1], t);
  }, fl);
  // «from the inside»: el relámpago enciende la tormenta por dentro
  if (fl) { const sil = hex('#2a2838'); for (let y = 16; y < 84; y++) for (let x = 128; x < 320; x++) { if (enAtom(x, y)) continue; const c = R.pget(x, y); if (c !== sil && nubeGris(c) && umbral(x, y) < 0.6) R.pset(x, y, mezcla(c, hex('#e8e4ff'), 0.45)); } }
  // en la plataforma: el navegante con su taza, Duckworth que saluda y el oficial que suelta el globo sonda
  R.actor(EL.navegante, 84, 156, t, { dir: 1, brazos: entre(t, P4 + 0.3, P4 + 1.4) && Math.floor(t * 3) % 2 === 0, sorpresa: fl, sonrisa: t > dentroT + 0.4 });
  if (!(entre(t, P4 + 0.3, P4 + 1.4) && Math.floor(t * 3) % 2 === 0)) { const [hx, hy] = enMano(84, 156, 1); taza(hx, hy, t, 1); }
  R.actor(EL.duckworth, 112, 158, t, { dir: 1, dedo: entre(t, proposito - 0.1, proposito + 1.0), sorpresa: fl, sonrisa: t > dentroT + 0.4 });
  const suelta = t > medir;
  const ro = R.actor(EL.meteorologo, 140, 160, t, { dir: 1, dedo: !suelta || entre(t, medir, medir + 0.3), sorpresa: fl, sonrisa: entre(t, medir + 0.3, dentroT) });
  // el globo sonda: blanco, con su cordel y la cajita del instrumento; sube meciéndose y el viento lo lleva a la izquierda
  const sube = Math.max(0, t - medir), bx = Math.round(ro.mano[0] + 2 - sube * 9 + Math.sin(t * 2.2) * 2 * Math.min(1, sube)), by = Math.round(ro.mano[1] - 12 - sube * 30);
  R.linea(bx, by + 5, bx + Math.round(Math.sin(t * 2.2 + 1)), by + 14, hex('#e8e4dc')); R.rect(bx - 1, by + 14, bx + 1, by + 16, K); R.pset(bx, by + 15, hex('#c8a040'));
  R.disco(bx, by, 6, K); R.disco(bx, by, 5, hex('#e8ecf0')); R.disco(bx - 1, by - 1, 3, C.blanco); R.pset(bx - 2, by - 3, C.blanco); R.rect(bx + 2, by + 1, bx + 4, by + 3, hex('#c8ccd8'));
};

const efectos = [[1.6, 'motor', { dur: 1.6 }], [toca, 'golpecito'], [abre, 'cerrojo'], [sube, 'golpecito'], [cierra, 'cerrojo'], [rueda, 'motor', { dur: 1.2 }], [despega + 0.1, 'whoosh'], [vez - 0.05, 'trueno'],
  [historiadores, 'papel'], [golpe1, 'toc'], [golpe2, 'toc'], [apuesta - 0.04, 'sello'], [apuesta + 0.6, 'papel'], [tira1, 'golpecito'], [tira2, 'golpecito'], [probar - 0.05, 'arranque'], [avionT + 0.15, 'brillo'],
  [funda, 'lapiz'], [cazadoresT, 'brillo'], [cazadoresT + 0.32, 'palmada'], [pilotos + 0.05, 'pop'],
  [P4 + 0.1, 'motor', { dur: 1.2 }], [dentroT - 0.04, 'trueno']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1943', efectos, año: (t) => (t < P3 ? 1943 : t < P4 ? año3(t) : año4(t)) });
''')
