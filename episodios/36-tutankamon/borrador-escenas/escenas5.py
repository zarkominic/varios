E = {}

E['tu-reina'] = ('La reina', '''// TU-REINA (frases 12–13), sin cartela; la barra dice 2015 (las escenas antiguas llevan el año de la escena). Ocho planos:
// 1. el corte del monte: en «Tutankhamun's tomb» la tumba pequeña se enciende; en «entrance to a bigger one» la mano
//    con el lápiz dibuja el contorno azul a rayas de la tumba grande; en «queen» destella su coronita;
// 2. el museo de Berlín: un padre entra con su hija; el padre señala la vitrina en «Nefertiti»; la otra visitante
//    explica; en «father» la niña da saltitos para ver; el guarda cabecea;
// 3. el busto en su vitrina: en «bust» la mano de la niña se apoya en el cristal (quedan las huellas); en «never been
//    found» sale la «?» grande;
// 4. la cámara pintada (2015): Reeves entra por la pasarela y en «behind that wall» señala la pared norte, donde
//    parpadea su contorno azul a rayas; una turista se va por la derecha;
// 5. la ciudad del disco solar: los reyes salen al balcón; en «3,350 years ago» la cifra; en «religion» alzan los
//    brazos al disco, que se enciende;
// 6. la pared del templo: en «disc of the sun» el disco late; en «After they died» la corona pasa de la reina al rey
//    niño; en «erased» el cincel raspa los dos cartuchos y las caras;
// 7. la máscara en su vitrina: en «Pharaoh» el oro brilla; en «another name» el reflejo cruza el cristal y aparece un
//    cartucho con «?»;
// 8. (vista libre) el montón de arena del valle: Reeves llega, mira; en «lost tomb» la arena resbala, recula; en
//    «mysteries» la «?»; una salamanquesa cruza.''', r'''
const N = Math.round;
const ease = (u) => u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u);
const h3 = (x, y, k) => { const q = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return q - Math.floor(q); };
const K = hex('#1a1410'), BL = hex('#f8f4e8');
const globo = (x, y, ic, c) => { R.disco(x, y, 7, K); R.disco(x, y, 6, BL); R.pset(x - 5, y + 7, K); R.pset(x - 4, y + 6, BL); R.pset(x - 6, y + 8, K); R.icono(ic, x - (ic === '?' ? 2 : 1), y - 4, c, null, 1); };
const destello = (x, y, r, c = '#fff8d0') => { const C = hex(c); R.linea(x - r, y, x + r, y, C); R.linea(x, y - r, x, y + r, C); const d = N(r * 0.5); R.linea(x - d, y - d, x + d, y + d, C); R.linea(x - d, y + d, x + d, y - d, C); R.pset(x, y, hex('#ffffff')); };
const rayas = (x0, y0, x1, y1, c, fase = 0) => { const C = hex(c); const per = (x1 - x0) * 2 + (y1 - y0) * 2; for (let i = 0; i < per; i++) { if (((i + fase) % 6) > 3) continue; let x, y; if (i < x1 - x0) { x = x0 + i; y = y0; } else if (i < x1 - x0 + y1 - y0) { x = x1; y = y0 + i - (x1 - x0); } else if (i < 2 * (x1 - x0) + y1 - y0) { x = x1 - (i - (x1 - x0) - (y1 - y0)); y = y1; } else { x = x0; y = y1 - (i - 2 * (x1 - x0) - (y1 - y0)); } R.pset(x, y, C); } };
const P2 = en('reina', 0.3409), P3 = en('reina', 0.6178), P4 = en('reina', 0.8716), P5 = en('nefertiti', 0) - 0.1;
const P6 = en('nefertiti', 0.2789), P7 = en('nefertiti', 0.5437), P8 = en('nefertiti', 0.8085);

// 1 · el corte: la tumba pequeña se enciende y la mano dibuja la grande; la coronita destella en «queen»
const p1 = (t) => {
  const traza = ease(tramo(t, en('reina', 0.1692), en('reina', 0.3025)));
  const o = { encuadre: 'trazo', epoca: 2015, reeves: 1, traza, anomalias: 0 };
  const g = T.ladera(R, t, o);
  // «Tutankhamun's tomb»: un filo de luz recorre la tumba pequeña (pasillo, antecámara y cámara pintada)
  const luz = tramo(t, en('reina', 0.1128), en('reina', 0.1128) + 1.4);
  if (luz > 0 && luz < 1) { const a = Math.sin(luz * Math.PI), c = a > 0.5 ? '#fff2b0' : '#f0c860';
    for (const [x0, y0, x1, y1] of [[62, 98, 112, 110], [112, 92, 168, 128], [174, 96, 214, 130]]) rayas(x0 - 1, y0 - 1, x1 + 1, y1 + 1, c, N(t * 12)); }
  const q = tramo(t, en('reina', 0.3097), en('reina', 0.3097) + 0.7);
  if (q > 0 && q < 1) { const [cx, cy] = g.corona; destello(cx, cy - 4, N(2 + 5 * Math.sin(q * Math.PI))); }
};

// 2 · el museo: el padre y la niña entran; él señala; ella da saltitos en «father»
const p2 = (t) => {
  const o = { encuadre: 'museo' };
  T.radares(R, t, o);
  const u = ease(tramo(t, P2 + 0.05, en('reina', 0.4153)));
  const xd = N(lerp(10, 98, u)), xn = N(lerp(-8, 78, ease(tramo(t, P2 + 0.25, en('reina', 0.4153) + 0.3))));
  const salt = tramo(t, en('reina', 0.5281), en('reina', 0.5845));
  const hop = salt > 0 && salt < 1 ? N(Math.abs(Math.sin(salt * Math.PI * 3)) * 4) : 0;
  R.actor(EL.turista2, 212, 166, t, { dir: -1, habla: t > en('reina', 0.3845) && t < en('reina', 0.4819), sonrisa: t > en('reina', 0.5845) });
  R.actor(EL.turista1, xd, 166, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > en('reina', 0.4358) && t < en('reina', 0.5281), sonrisa: t > en('reina', 0.5281) });
  R.actor(EL.nina, xn, 166, t, { dir: 1, anda: xn < 78 && t > P2 + 0.25, salto: hop, sonrisa: hop > 0 });
  T.radaresDelante(R, t, o);
};

// 3 · el busto: la mano de la niña se apoya en el cristal en «bust»; la «?» en «never been found»
const p3 = (t) => {
  const duda = ease(tramo(t, en('reina', 0.81), en('reina', 0.8408)));
  T.radares(R, t, { encuadre: 'museo', camara: 'busto', duda });
  const sube = ease(tramo(t, en('reina', 0.6614) - 0.5, en('reina', 0.6614))), baja = ease(tramo(t, en('reina', 0.7844), en('reina', 0.7844) + 0.5));
  const k = sube * (1 - baja), hx = 112, hy = N(lerp(204, 134, k));
  // las huellas de los dedos en el cristal, que se quedan (un vaho que se va despacio)
  if (t > en('reina', 0.6614)) { const f = 1 - 0.6 * tramo(t, en('reina', 0.7844), P4); const C = hex(f > 0.6 ? '#9ab8bc' : '#6a888c');
    for (let i = 0; i < 4; i++) { R.pset(hx - 2 + i * 3, 124, C); R.pset(hx - 2 + i * 3, 125, C); } R.pset(hx + 8, 129, C); R.pset(hx + 8, 130, C); }
  if (k > 0.02) T.brazo(R, hx - 16, 196, hx, hy, '#e8783a', 1, { codo: [hx - 18, hy + 26] });
};

// 4 · la cámara pintada: Reeves entra y en «behind that wall» señala la pared norte, donde parpadea el contorno azul
const p4 = (t) => {
  const o = { encuadre: 'pintada', epoca: 2015 };
  const g = T.tumba(R, t, o);
  const u = ease(tramo(t, P4 + 0.1, en('reina', 0.928)));
  const xr = N(lerp(20, 86, u));
  const ve = tramo(t, en('reina', 0.9639), en('reina', 0.9639) + 0.6);
  if (ve > 0) { const on = Math.floor(t * 4) % 2 === 0 || ve < 1, f = N(t * 10);
    if (on) { rayas(231, 71, 277, 148, '#14284a', f); rayas(233, 73, 275, 146, '#14284a', f); rayas(232, 72, 276, 147, '#7ac0ff', f); }
    if (ve >= 1) { R.disco(254, 104, 9, hex('#14284a')); R.icono('?', 250, 97, hex('#9ad0ff'), hex('#14284a'), 2); } }
  R.actor(EL.turista2, N(lerp(236, 300, ease(tramo(t, P4, P5)))), 170, t, { dir: 1, anda: t < P5 - 0.1 });
  R.actor(T.ELENCO_TU.reevesTU, xr, 170, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > en('reina', 0.9485), habla: t > en('reina', 0.9485) && t < en('reina', 1.0305), sonrisa: u >= 1 && t < en('reina', 0.9485) });
  T.tumbaDelante(R, t, o);
};

// 5 · la ciudad del disco solar: los reyes salen al balcón; la cifra; alzan los brazos al disco en «religion»
const p5 = (t) => {
  const disco = lerp(0.4, 1, ease(tramo(t, en('nefertiti', 0.2127), en('nefertiti', 0.2748))));
  const o = { encuadre: 'amarna', disco };
  T.radares(R, t, o);
  const sal = ease(tramo(t, P5 + 0.15, en('nefertiti', 0.039)));
  const alza = t > en('nefertiti', 0.2127);
  R.actor(T.ELENCO_TU.nefertitiTU, N(lerp(176, 186, sal)), 96, t, { dir: 1, anda: sal > 0 && sal < 1, brazos: alza, habla: t > en('nefertiti', 0.1755) && t < en('nefertiti', 0.2127), sonrisa: alza });
  R.actor(T.ELENCO_TU.akenatonTU, N(lerp(213, 203, sal)), 96, t, { dir: -1, anda: sal > 0 && sal < 1, brazos: t > en('nefertiti', 0.2127) + 0.3 });
  const n = tramo(t, en('nefertiti', 0.0472), en('nefertiti', 0.0472) + 0.35), fu = 1 - tramo(t, en('nefertiti', 0.1589), en('nefertiti', 0.1589) + 0.4);
  if (n > 0 && fu > 0) R.numero('3350', 92, N(lerp(52, 48, n)), { tam: 16, centro: true });
  T.radaresDelante(R, t, o);
};

// 6 · el templo: el disco late; la corona pasa al rey niño en «After they died»; el cincel raspa en «erased»
const p6 = (t) => {
  const corona = ease(tramo(t, en('nefertiti', 0.3865), en('nefertiti', 0.4279)));
  const borra = tramo(t, en('nefertiti', 0.4361), en('nefertiti', 0.5313));
  T.radares(R, t, { encuadre: 'amarna', camara: 'templo', corona, borra });
  const d = tramo(t, en('nefertiti', 0.3286), en('nefertiti', 0.3575) + 0.3);
  if (d > 0 && d < 1) destello(200, 52, N(3 + 6 * Math.sin(d * Math.PI)), '#fff0a0');
};

// 7 · la máscara: el oro brilla en «Pharaoh»; el reflejo cruza y un cartucho con «?» en «another name»
const p7 = (t) => {
  const brillo = ease(tramo(t, en('nefertiti', 0.6409), en('nefertiti', 0.7878)));
  const g = T.tumba(R, t, { encuadre: 'mascara', brillo });
  const fa = tramo(t, en('nefertiti', 0.6409), en('nefertiti', 0.6409) + 0.9);
  if (fa > 0 && fa < 1) destello(g.mascara[0] - 10, g.mascara[1] - 22, N(2 + 4 * Math.sin(fa * Math.PI)));
  const c = ease(tramo(t, en('nefertiti', 0.7464), en('nefertiti', 0.7464) + 0.5));
  if (c > 0) { const cx = 252, cy = N(lerp(96, 86, c));
    // el cartucho: un óvalo de cuerda dorada con la raya de abajo, y dentro solo la «?»
    for (let a = 0; a < 64; a++) { const an = a / 64 * Math.PI * 2, x = N(cx + Math.cos(an) * 10), y = N(cy + Math.sin(an) * 17); R.pset(x, y, hex(a % 2 ? '#f0c040' : '#a87818')); R.pset(x + 1, y + 1, hex('#2a1808')); }
    R.linea(cx - 9, cy + 20, cx + 9, cy + 20, hex('#f0c040')); R.linea(cx - 9, cy + 21, cx + 9, cy + 21, hex('#a87818'));
    if (c > 0.6) R.icono('?', cx - 2, cy - 5, hex('#f0c040'), hex('#2a1808'), 2); }
};

// 8 · el valle (vista libre): Reeves llega al montón; en «lost tomb» la arena resbala y recula; «?» en «mysteries»
const p8 = (t) => {
  const resbala = ease(tramo(t, en('nefertiti', 0.8912), en('nefertiti', 0.9533)));
  const o = { encuadre: 'valle', camara: 'arena', epoca: 2014, sombrero: false, resbala };
  T.valle(R, t, o);
  const u = ease(tramo(t, P8 + 0.1, en('nefertiti', 0.8705)));
  const rec = ease(tramo(t, en('nefertiti', 0.9036), en('nefertiti', 0.9036) + 0.4));
  const xr = N(lerp(30, 136, u) - 10 * rec), hop = rec > 0 && rec < 1 ? N(Math.sin(rec * Math.PI) * 4) : 0;
  // una salamanquesa cruza la arena de delante
  { const s = tramo(t, P8, P8 + 5.6), x = N(lerp(330, 196, s)), y = 172, pa = Math.floor(t * 8) % 2; const V = hex('#8a7a4a'), v = hex('#5a4a2a');
    R.rect(x, y, x + 6, y + 1, V); R.pset(x - 1, y, V); R.linea(x + 7, y + 1, x + 12, y + 2 + pa, v); R.pset(x + 1, y - 1 + pa, v); R.pset(x + 1, y + 2 - pa, v); R.pset(x + 5, y - pa, v); R.pset(x + 5, y + 2 + pa, v); R.pset(x, y, hex('#1a1410')); }
  R.actor(T.ELENCO_TU.reevesTU, xr, 156, t, { dir: 1, anda: u > 0 && u < 1, salto: hop, habla: t > en('nefertiti', 0.8705) && t < en('nefertiti', 0.9036), sorpresa: rec > 0 && t < en('nefertiti', 0.9657), dedo: t > en('nefertiti', 0.9657) });
  if (t > en('nefertiti', 0.9657)) globo(xr + 8, 112, '?', hex('#3a6ad8'));
  T.valleDelante(R, t, o);
};

const efectos = [[en('reina', 0.1692), 'lapiz'], [en('reina', 0.3097), 'brillo'],
  [en('reina', 0.6614), 'golpecito'], [en('reina', 0.81), 'pop'],
  [en('nefertiti', 0.0472), 'pop'], [en('nefertiti', 0.2127), 'brillo'], [en('nefertiti', 0.3865), 'whoosh'],
  [en('nefertiti', 0.45), 'toc'], [en('nefertiti', 0.48), 'toc'], [en('nefertiti', 0.51), 'toc'],
  [en('nefertiti', 0.7464), 'brillo'], [en('nefertiti', 0.9657), 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8]], { efectos, año: 2015 });
''')

E['tu-radar'] = ('El radar', '''// TU-RADAR (frases 14–15), finales de 2015, sin cartela. Seis planos:
// 1. la cámara pintada de noche: Watanabe entra con el radar de mano, lo apoya en la pared en «Watanabe» (bip) y en
//    «ran his device along the walls» lo pasa de un lado a otro; el ayudante apunta;
// 2. la rueda de prensa en Luxor: el ministro habla; en «announced» la pantalla sube y en «90 %» se para en 90; él
//    señala, los de la mesa sonríen; flashes;
// 3. el público desde la mesa: en «hidden rooms» estalla la tanda de flashes;
// 4. el cañón: el excursionista llega a la repisa y en «shouting» grita; la onda cruza, choca y en «echo» vuelve;
// 5. el corte de roca: la onda baja y en «material to another» rebota en el aire; en «rubble» rebota en el escombro;
//    el cronómetro mide cada vuelta;
// 6. la pantalla del radar: en «bounces back» salen las hipérbolas; la mano señala la del fondo y en «how deep» baja
//    el dedo por la escala de metros.''', r'''
const N = Math.round;
const ease = (u) => u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u);
const P2 = en('watanabe', 0.4098), P3 = en('watanabe', 0.8659), P4 = en('eco', 0) - 0.33, P5 = en('eco', 0.3648), P6 = en('eco', 0.7472);

// 1 · la pared de noche: Watanabe entra, apoya el radar y lo pasa por la pared
const p1 = (t) => {
  const llega = en('watanabe', 0.1586);
  const pasada = ease(tramo(t, en('watanabe', 0.2181), en('watanabe', 0.4032)));
  const enPared = t >= llega;
  const o = { encuadre: 'pared', pasada, radar: enPared, ayudante: true };
  const g = T.radares(R, t, o);
  if (enPared) {
    const rx = g.radar[0], mira = t > en('watanabe', 0.1719) && t < en('watanabe', 0.2181);
    R.actor(T.ELENCO_TU.watanabeTU, rx - 15, 162, t, { dir: 1, anda: pasada > 0.02 && pasada < 0.98, sostiene: [rx - 6, 140], habla: mira });
  } else {
    const u = ease(tramo(t, 0.3, llega)), x = N(lerp(56, 137, u));
    const a = R.actor(T.ELENCO_TU.watanabeTU, x, 162, t, { dir: 1, anda: u > 0 && u < 1, sostiene: [x + 14, 146] });
    if (a && a.mano) T.PIEZAS_TU.radarMano(R, a.mano[0] + 4, a.mano[1] + 9, { t });
  }
  T.radaresDelante(R, t, o);
};

// 2 · la rueda de prensa: el ministro anuncia; la pantalla sube hasta 90 en «90 %»
const p2 = (t) => {
  const cifra = ease(tramo(t, en('watanabe', 0.7866), en('watanabe', 0.8494)));
  const o = { encuadre: 'prensa', cifra, flash: 1 };
  T.radares(R, t, o);
  const habla = t > en('watanabe', 0.5751) && Math.floor(t * 3) % 4 !== 3, punto = t > en('watanabe', 0.8494);
  // el ministro se levanta en «minister» y señala la pantalla; antes, Reeves y Watanabe cuchichean
  const de = ease(tramo(t, en('watanabe', 0.5751), en('watanabe', 0.5751) + 0.5)), charla = t < en('watanabe', 0.5751);
  R.actor(T.ELENCO_TU.watanabeTU, 77, 136, t, { dir: 1, sonrisa: punto, habla: charla && Math.floor(t * 2) % 2 === 0 });
  R.actor(T.ELENCO_TU.reevesTU, 113, 136, t, { dir: charla ? -1 : 1, sonrisa: punto || charla, habla: charla && Math.floor(t * 2) % 2 === 1, sorpresa: t > en('watanabe', 0.7866) && !punto });
  R.actor(T.ELENCO_TU.eldamatyTU, 153, N(lerp(136, 129, de)), t, { dir: t > en('watanabe', 0.6941) && t < en('watanabe', 0.7866) ? -1 : 1, habla: habla && !punto, dedo: de > 0.9 && !punto ? t % 2 < 1.2 : false, brazos: punto, sonrisa: punto });
  R.actor(EL.guia, 193, 136, t, { dir: -1, habla: t > en('watanabe', 0.6941) && t < en('watanabe', 0.7866) });
  R.actor(EL.tecnico, 229, 136, t, { dir: -1, sorpresa: punto });
  T.radaresDelante(R, t, o);
};

// 3 · el público: la tanda de flashes en «hidden rooms»
const p3 = (t) => {
  const o = { encuadre: 'prensa', camara: 'publico', flash: 1 };
  T.radares(R, t, o);
  T.radaresDelante(R, t, o);
  const f = [en('watanabe', 0.8924), en('watanabe', 0.9453), en('watanabe', 0.9717)].some((g) => t > g && t < g + 0.08);
  if (f) { const B = R.buf; for (let i = 0; i < 57600; i++) { const p = B[i]; B[i] = (0xff000000 | (Math.min(255, ((p >> 16) & 255) + 70) << 16) | (Math.min(255, ((p >> 8) & 255) + 70) << 8) | Math.min(255, (p & 255) + 70)) >>> 0; } }
};

// 4 · el cañón: el excursionista llega y grita en «shouting»; la onda cruza y el eco vuelve en «echo»
const p4 = (t) => {
  const u = ease(tramo(t, P4 + 0.1, en('eco', 0.0573)));
  const x = N(lerp(24, 64, u));
  const onda = ease(tramo(t, en('eco', 0.1108), en('eco', 0.2124)));
  const vuelve = ease(tramo(t, en('eco', 0.2498), en('eco', 0.3568)));
  const o = { encuadre: 'canon', boca: [x + 13, 134], onda, vuelve };
  T.radares(R, t, o);
  const grita = t > en('eco', 0.1055) && t < en('eco', 0.1589);
  R.actor(EL.turista1, x, 150, t, { dir: 1, anda: u > 0 && u < 1, habla: grita, brazos: grita, sonrisa: t > en('eco', 0.3354) });
  T.radaresDelante(R, t, o);
};

// 5 · el corte de roca: dos idas y vueltas, primero en el aire (en «another») y luego en el escombro (en «rubble»)
const p5 = (t) => {
  const c2 = en('eco', 0.6616);
  const prim = t < c2;
  const onda = prim ? tramo(t, en('eco', 0.3942), en('eco', 0.6616) - 0.1) : tramo(t, c2, en('eco', 0.7472) + 0.2);
  T.radares(R, t, { encuadre: 'canon', camara: 'roca', onda, material: prim ? 'aire' : 'escombro' });
};

// 6 · la pantalla: las hipérbolas; la mano señala la del fondo y baja por la escala en «how deep»
const p6 = (t) => {
  const eco = ease(tramo(t, en('eco', 0.7579), en('eco', 0.9129)));
  const g = T.radares(R, t, { encuadre: 'pared', camara: 'pantalla', eco });
  const ex = (g.eco ? g.eco[0] : 168), ey = (g.eco ? g.eco[1] : 104);
  const entra = ease(tramo(t, en('eco', 0.8809) - 0.6, en('eco', 0.8809))), baja = ease(tramo(t, en('eco', 0.9236), en('eco', 0.9611)));
  // en «how deep»: la raya de puntos roja va del vértice a la escala de metros y la cifra se enciende
  if (baja > 0) { const x1 = N(lerp(ex - 4, 58, baja)); for (let x = ex - 4; x >= x1; x--) if (x % 4 < 2) R.pset(x, ey, hex('#ff5a4a'));
    if (baja >= 1 && Math.floor(t * 4) % 2 === 0) for (let a = 0; a < 40; a++) { const an = a / 40 * Math.PI * 2; R.pset(N(50 + Math.cos(an) * 8), N(ey + Math.sin(an) * 7), hex('#ff5a4a')); } }
  const toc = t > en('eco', 0.8809) && Math.floor((t - en('eco', 0.8809)) * 3) % 3 === 0 ? 2 : 0;
  if (entra > 0.02) { const hx = N(lerp(300, ex + 8, entra)), hy = N(lerp(200, ey + 12, entra)) + toc;
    T.brazo(R, hx + 22, 196, hx, hy, '#4a5a6a', -1, { codo: [hx + 26, hy + 24] }); }
};

const efectos = [[en('watanabe', 0.1586), 'bip'], [en('watanabe', 0.2181), 'zumbido'], [en('watanabe', 0.8494), 'flash'],
  [en('watanabe', 0.8924), 'publico'], [en('watanabe', 0.9453), 'flash'],
  [en('eco', 0.1108), 'whoosh'], [en('eco', 0.2124), 'golpecito'], [en('eco', 0.3354), 'pop'],
  [en('eco', 0.5279), 'tic'], [en('eco', 0.7044), 'tic'], [en('eco', 0.7579), 'bip'], [en('eco', 0.9236), 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: 2015 });
''')
