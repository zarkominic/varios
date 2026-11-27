E = {}

E['tu-turin'] = ('Turín', '''// TU-TURIN (frases 16–17), sin cartela; la barra dice 2016 (el segundo equipo) y 2018 (Turín). Seis planos, cortados
// en la palabra inglesa (el inserto de la carpeta va ANTES de la pared pintada para caer con «no rooms», y la pared con
// «ghosts»; las vistas son las del reparto):
// 1. la misma pared en escorzo con luz de LED: en «a second team» entra el técnico del chaleco gris; en «repeated the
//    scan» señala el ordenador; la técnica llega con el rollo de cable y en «different equipment» señala el carro;
// 2. la pantalla plana (corta en «found»): la línea verde pinta un radargrama limpio; en «Two radars» la mano traza el
//    ✓ verde y en «different answers» el ✗ rojo, y se retira;
// 3. el laboratorio de Turín (corta en «In 2018»; gag 5): el equipo enciende el radar grande; en «arrived» la pantalla
//    pita con una puerta y «!»; el ayudante salta; en «Turin» el jefe va a la pared de prueba y señala la LATA olvidada;
// 4. la carpeta del caso (corta en «led»): la mano entra y en «clear» cierra la tapa; en «no rooms» el sello
//    estampa el candado rojo; la mano vuelve y da dos golpecitos;
// 5. la pared pintada de frente (corta en «few yards»): una técnica pasa el radar de mano por delante; en «echoes» los
//    arcos rebotan en el foco colgado DELANTE de la pared (el eco «fantasma» vuelve en rojo, «!»); en «in front of the
//    wall» el foco se mece y salta la raya roja foco→radar; la pared no se toca;
// 6. la entrada de la tumba hoy (corta en «not behind it»): la técnica sale con la maleta del radar y se va por la
//    derecha; la cola de turistas sigue; en «case closed» el guarda tiende la cadena entre dos postes y sale el candado.''', r'''
const N = Math.round;
const ease = (u) => u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u);
const K = hex('#1a1410'), BL = hex('#f8f4e8');
const globo = (x, y, ic, c) => { R.disco(x, y, 7, K); R.disco(x, y, 6, BL); R.pset(x - 5, y + 7, K); R.pset(x - 4, y + 6, BL); R.pset(x - 6, y + 8, K); R.icono(ic, x - (ic === '?' ? 2 : 1), y - 4, c, null, 1); };
const destello = (x, y, r, c = '#fff8d0') => { const C = hex(c); R.linea(x - r, y, x + r, y, C); R.linea(x, y - r, x, y + r, C); const d = N(r * 0.5); R.linea(x - d, y - d, x + d, y + d, C); R.linea(x - d, y + d, x + d, y - d, C); R.pset(x, y, hex('#ffffff')); };
// un candado rojo de tinta (sin letras): arco y cuerpo con su ojo
const candado = (x, y, c = '#d83a2a') => { const C = hex(c), S = hex('#7a1a10');
  for (let a = 0; a <= 12; a++) { const an = Math.PI + a / 12 * Math.PI; R.pset(N(x + Math.cos(an) * 3), N(y - 3 + Math.sin(an) * 3), C); }
  R.rect(x - 4, y - 2, x + 4, y + 4, C); R.rect(x - 4, y + 4, x + 4, y + 4, S); R.pset(x, y, S); R.pset(x, y + 1, S); };
// lápiz o rotulador en la mano: un palito de 1 px con la punta de color
const rotu = (x, y, c) => { R.linea(x, y, x + 6, y + 6, hex('#2a2a34')); R.linea(x + 1, y, x + 7, y + 6, hex('#5a5a68')); R.pset(x - 1, y - 1, hex(c)); R.pset(x, y - 1, hex(c)); };
// arco de onda (semicírculo hacia un lado) a trazos
const arco = (cx, cy, r, a0, a1, c, fase = 0) => { const C = hex(c); const n = Math.max(8, N(r * 2.2)); for (let i = 0; i <= n; i++) { if (((i + fase) % 4) === 3) continue; const an = a0 + (a1 - a0) * i / n; R.pset(N(cx + Math.cos(an) * r), N(cy + Math.sin(an) * r), C); } };
const P2 = en('natgeo', 0.5903), P3 = en('turin', 0) - 0.1, P4 = en('turin', 0.2787), P5 = en('turin', 0.572), P6 = en('turin', 0.8694);
const NG = T.ELENCO_TU.natgeoTU, PO = T.ELENCO_TU.porcelliTU;

// 1 · el segundo equipo en la misma pared: entra, señala el ordenador; la técnica señala el carro
const p1 = (t) => {
  const o = { encuadre: 'segundo' };
  T.radares(R, t, o);
  // sale de detrás del sarcófago (x 1–79) desde el primer instante
  const u = ease(tramo(t, 0.15, en('natgeo', 0.3)));
  const xn = N(lerp(70, 116, u));
  const v = ease(tramo(t, en('natgeo', 0.2), en('natgeo', 0.46)));
  const xt = N(lerp(250, 196, v));
  const ta = R.actor(EL.tecnica, xt, 164, t, { dir: -1, anda: v > 0 && v < 1, sostiene: v < 1 ? true : null,
    dedo: t > en('natgeo', 0.4842) && t < en('natgeo', 0.58), habla: t > en('natgeo', 0.4842) && t < en('natgeo', 0.56) });
  // el rollo de cable naranja en la mano mientras llega; luego lo deja en el suelo, junto al carro
  if (v < 1 && ta && ta.mano) { const [mx, my] = ta.mano; R.disco(mx, my + 3, 4, hex('#2a2a2a')); R.disco(mx, my + 3, 3, hex('#e8783a')); R.disco(mx, my + 3, 1, hex('#2a2a2a')); }
  else { R.disco(218, 160, 4, hex('#2a2a2a')); R.disco(218, 160, 3, hex('#e8783a')); R.disco(218, 160, 1, hex('#2a2a2a')); R.linea(218, 163, 236, 164, hex('#2a2a2a')); }
  R.actor(NG, xn, 164, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > en('natgeo', 0.3402) && t < en('natgeo', 0.47),
    habla: t > en('natgeo', 0.36) && t < en('natgeo', 0.45), triste: t > en('natgeo', 0.56) });
  T.radaresDelante(R, t, o);
};

// 2 · la pantalla plana: la línea verde y, en la pizarrita, la mano traza ✓ y luego ✗
const p2 = (t) => {
  const barrido = ease(tramo(t, P2 + 0.05, en('natgeo', 0.69)));
  const m1 = tramo(t, en('natgeo', 0.7034), en('natgeo', 0.79)), m2 = tramo(t, en('natgeo', 0.9034), en('natgeo', 0.99));
  const marcas = m1 + m2;
  const g = T.radares(R, t, { encuadre: 'segundo', camara: 'plana', barrido, marcas });
  // la mano con el rotulador: entra, va a la primera marca, a la segunda y se va
  const [ax, ay] = g.marcas ? g.marcas[0] : [236, 110], [bx, by] = g.marcas ? g.marcas[1] : [270, 110];
  const entra = ease(tramo(t, en('natgeo', 0.65), en('natgeo', 0.7034))), cruza = ease(tramo(t, en('natgeo', 0.8), en('natgeo', 0.9034)));
  const sale = ease(tramo(t, en('natgeo', 1.0), en('natgeo', 1.0) + 0.6));
  const k = entra * (1 - sale);
  if (k > 0.02) {
    const tx = lerp(ax, bx, cruza) + (m1 > 0 && m1 < 1 ? Math.sin(m1 * 9) * 3 : 0) + (m2 > 0 && m2 < 1 ? Math.sin(m2 * 9) * 3 : 0);
    const ty = ay + 6 + (m1 > 0 && m1 < 1 ? Math.cos(m1 * 7) * 3 : 0) + (m2 > 0 && m2 < 1 ? Math.cos(m2 * 7) * 3 : 0);
    const hx = N(lerp(330, tx + 8, k)), hy = N(lerp(196, ty + 6, k));
    rotu(hx - 9, hy - 8, m2 > 0 ? '#d83a2a' : '#3ac85a');
    T.brazo(R, hx + 30, 200, hx, hy, '#7a7e86', -1, { codo: [hx + 30, hy + 22] });
  }
};

// 3 · Turín: el radar grande pita (gag 5); el ayudante se alegra; el jefe va a la pared y señala la LATA
const p3 = (t) => {
  const pita = ease(tramo(t, en('turin', 0.0685), en('turin', 0.12)));
  const o = { encuadre: 'turin', pita };
  const g = T.radares(R, t, o);
  // el ayudante, en el monitor: se alegra con el pitido; cuando el jefe señala la lata, se queda triste
  const lata = t > en('turin', 0.222);
  const salto = t > en('turin', 0.075) && t < en('turin', 0.14) ? N(Math.abs(Math.sin((t - en('turin', 0.075)) * 9)) * 3) : 0;
  R.actor(EL.tecnico, 98, 158, t, { dir: 1, brazos: t > en('turin', 0.075) && t < en('turin', 0.16), salto, sonrisa: t > en('turin', 0.075) && !lata,
    sorpresa: lata && t < en('turin', 0.25), triste: t > en('turin', 0.25), habla: t > en('turin', 0.005) && t < en('turin', 0.05) });
  // el jefe del equipo: junto al radar; en «Polytechnic» echa a andar hacia la pared de prueba y en «Turin» señala la lata
  const u = ease(tramo(t, en('turin', 0.15), en('turin', 0.215)));
  const xp = N(lerp(140, 196, u));
  R.actor(PO, xp, 158, t, { dir: 1, anda: u > 0 && u < 1, sonrisa: t < en('turin', 0.15) && t > en('turin', 0.07), dedo: lata, habla: lata && t < en('turin', 0.26) });
  // una tercera, al fondo de la estantería, que se gira a mirar
  R.actor(EL.tecnica, 248, 158, t, { dir: t > en('turin', 0.09) ? -1 : 1, habla: t > en('turin', 0.18) && t < en('turin', 0.21) });
  if (lata) { const a = tramo(t, en('turin', 0.222), en('turin', 0.222) + 0.5); destello(214, 112, N(2 + 3 * Math.sin(Math.min(1, a) * Math.PI)), '#ffffff'); }
  T.radaresDelante(R, t, o);
};

// 4 · la carpeta: la mano mete la última hoja; en «clear» la tapa se cierra; en «no rooms» el sello; dos golpecitos
const p4 = (t) => {
  const cerrada = ease(tramo(t, en('turin', 0.3834), en('turin', 0.43)));
  const sello = tramo(t, en('turin', 0.44), en('turin', 0.5));
  T.radares(R, t, { encuadre: 'turin', camara: 'carpeta', cerrada, sello });
  // la mano entra por abajo a la izquierda, coge la tapa y la cierra en «clear»; se va; luego vuelve a dar dos golpecitos
  const coge = ease(tramo(t, P4 + 0.4, en('turin', 0.37))), suelta = ease(tramo(t, en('turin', 0.44), en('turin', 0.48)));
  const kc = coge * (1 - suelta);
  if (kc > 0.02) { const ex = N(100 - 92 * Math.cos(Math.PI * cerrada)), ey = N(150 - 30 * Math.sin(Math.PI * cerrada));
    const hx = N(lerp(-20, ex, kc)), hy = N(lerp(210, ey, kc));
    T.brazo(R, hx - 30, 204, hx, hy, '#4a5a6a', 1, { codo: [hx - 30, hy + 26] }); }
  const toc = tramo(t, en('turin', 0.52), en('turin', 0.58));
  if (toc > 0 && toc < 1) { const k = Math.sin(toc * Math.PI), golpe = Math.floor(toc * 4) % 2 ? 3 : 0;
    const hx = N(lerp(330, 206, Math.min(1, k * 1.6))), hy = N(lerp(196, 128, Math.min(1, k * 1.6))) - golpe;
    T.brazo(R, hx + 34, 200, hx, hy, '#4a5a6a', -1, { codo: [hx + 30, hy + 26] }); }
};

// 5 · la pared pintada de frente: el radar de mano pasa por DELANTE; los ecos rebotan en el foco colgado, no en la pared
const p5 = (t) => {
  const o = { encuadre: 'pintada', camara: 'pared', raya: 0, rectangulos: 0 };
  T.tumba(R, t, o);
  // el foco colgado de su cable, delante de la pared (se mece cuando el eco lo «descubre»)
  const mece = t > en('turin', 0.8389) ? Math.sin((t - en('turin', 0.8389)) * 6) * 4 * Math.max(0, 1 - (t - en('turin', 0.8389)) / 2.5) : Math.sin(t * 1.3) * 0.6;
  const fx = N(196 + mece), fy = 100;
  // el charco de luz del foco en la pared (se mueve con él) y el foco: cable, casquillo, pantalla con brillo y bombilla
  for (let j = 0; j < 26; j++) for (let i = -16 - j; i <= 16 + j; i += 2) if (((i + j) & 1) === 0 && Math.abs(i) < 30) R.pset(fx + i, fy + 6 + j, hex(j < 10 ? '#fff0a8' : '#f4d88a'));
  R.linea(196, 0, fx, fy - 9, hex('#1a1a1a')); R.linea(197, 0, fx + 1, fy - 9, hex('#4a4a4a'));
  R.rect(fx - 2, fy - 9, fx + 2, fy - 6, hex('#2a2a30'));
  R.poligono([[fx - 4, fy - 6], [fx + 4, fy - 6], [fx + 10, fy + 3], [fx - 10, fy + 3]], hex('#2e5a3a'));
  R.linea(fx - 3, fy - 5, fx - 8, fy + 2, hex('#5a9a6a')); R.linea(fx - 10, fy + 3, fx + 10, fy + 3, hex('#1a2a1e'));
  R.disco(fx, fy + 4, 3, hex('#fff8d8')); R.pset(fx - 1, fy + 3, hex('#ffffff'));
  // la técnica con el radar de mano, de izquierda a derecha por delante del zócalo
  const u = tramo(t, P5 + 0.1, en('turin', 0.86));
  const x = N(lerp(40, 170, ease(u)));
  const a = R.actor(EL.tecnica, x, 172, t, { dir: 1, anda: u > 0 && u < 1 && !(t > en('turin', 0.69) && t < en('turin', 0.79)), sostiene: [x + 22, 150],
    sorpresa: t > en('turin', 0.7505) && t < en('turin', 0.8), sonrisa: t > en('turin', 0.85) });
  const rx = x + 24, ry = 150;
  if (a && a.mano) T.PIEZAS_TU.radarMano(R, a.mano[0] + 4, a.mano[1] + 9, { t });
  // los arcos: salen del radar hacia arriba y a la derecha, chocan con el foco y vuelven (rojos) — no tocan la pared
  const e1 = tramo(t, en('turin', 0.6933), en('turin', 0.75)), e2 = tramo(t, en('turin', 0.79), en('turin', 0.8443));
  const dx = fx - rx, dy = fy - ry, d = Math.hypot(dx, dy), an = Math.atan2(dy, dx);
  for (const [e, rojo] of [[e1, false], [e2, true]]) if (e > 0 && e < 1) {
    for (let k = 0; k < 3; k++) { const s = e * 1.6 - k * 0.18; if (s <= 0) continue;
      if (s < 1) { arco(rx, ry, N(s * d), an - 0.5, an + 0.5, '#bfe4ff', N(t * 10)); arco(rx, ry, N(s * d) - 1, an - 0.5, an + 0.5, '#2a6ab8', N(t * 10)); }
      else if (s < 2) { const c = rojo ? '#ff5a4a' : '#ffb0a0'; arco(fx, fy, N((s - 1) * d), an + Math.PI - 0.45, an + Math.PI + 0.45, c, N(t * 10)); arco(fx, fy, N((s - 1) * d) + 1, an + Math.PI - 0.45, an + Math.PI + 0.45, '#7a1a10', N(t * 10)); } } }
  if (t > en('turin', 0.7505) && t < en('turin', 0.8443)) globo(fx + 18, fy - 14, '!', hex('#d83a2a'));
  // «in front of the wall»: la raya roja de puntos del foco al radar y el destello en el foco
  if (t > en('turin', 0.8443)) { const n = N(d / 3); for (let i = 0; i < n; i++) if ((i + N(t * 8)) % 3 === 0) { R.pset(N(rx + dx * i / n), N(ry + dy * i / n), hex('#ff5a4a')); R.pset(N(rx + dx * i / n) + 1, N(ry + dy * i / n), hex('#ff5a4a')); }
    const q = tramo(t, en('turin', 0.8443), en('turin', 0.8443) + 0.6); if (q < 1) destello(fx, fy, N(3 + 5 * Math.sin(q * Math.PI))); }
};

// 6 · la entrada de hoy: la técnica sale con la maleta del radar; en «case closed» el guarda echa la cadena y el candado
const p6 = (t) => {
  const o = { encuadre: 'entrada', cola: 0.4 };
  const g = T.valle(R, t, o);
  const u = ease(tramo(t, P6 + 0.1, en('turin', 0.99)));
  const xs = N(lerp(150, 240, u));
  const ta = R.actor(EL.tecnica, xs, 152, t, { dir: 1, anda: u > 0 && u < 1, sostiene: true });
  if (ta && ta.mano) { const [mx, my] = ta.mano; R.rect(mx - 6, my, mx + 4, my + 7, hex('#2a2e36')); R.rect(mx - 5, my + 1, mx + 3, my + 1, hex('#4a505a')); R.rect(mx - 2, my - 1, mx, my - 1, hex('#1a1a1a')); }
  // el guarda: sale de la caseta, tiende la cadena del sendero de servicio (dos postes) y en «closed» la cierra
  const sal = ease(tramo(t, en('turin', 0.91), en('turin', 0.955)));
  const xg = N(lerp(54, 74, sal));
  const tiende = ease(tramo(t, en('turin', 0.94), en('turin', 0.972)));
  R.rect(70, 136, 71, 152, hex('#5a5a62')); R.rect(102, 136, 103, 152, hex('#5a5a62')); R.pset(70, 135, hex('#e8c860')); R.pset(102, 135, hex('#e8c860'));
  { const xe = N(lerp(72, 102, tiende)); for (let x = 71; x <= xe; x++) { const y = N(138 + 3 * Math.sin((x - 71) / Math.max(1, xe - 71) * Math.PI)), c = (x >> 1) % 2 ? hex('#e83a2a') : hex('#f4f0e8'); R.pset(x, y, c); R.pset(x, y + 1, c); R.pset(x, y + 2, hex('#3a2a20')); } }
  R.actor(EL.guarda, xg, 154, t, { dir: 1, anda: sal > 0 && sal < 1, dedo: t > en('turin', 0.94) && t < en('turin', 0.972), sonrisa: t > en('turin', 0.975) });
  if (t > en('turin', 0.972)) { const q = tramo(t, en('turin', 0.972), en('turin', 0.972) + 0.25); R.disco(86, 120, N(6 + q), K); R.disco(86, 120, N(5 + q), BL); candado(86, 120); }
  T.valleDelante(R, t, o);
};

const efectos = [[en('natgeo', 0.3402), 'zumbido'],
  [en('natgeo', 0.7034), 'lapiz'], [en('natgeo', 0.9034), 'lapiz'],
  [en('turin', 0.0685), 'bip'], [en('turin', 0.222), 'pop'],
  [en('turin', 0.3834), 'papel'], [en('turin', 0.475), 'sello'], [en('turin', 0.54), 'toc'],
  [en('turin', 0.6933), 'zumbido'], [en('turin', 0.8443), 'bip'], [en('turin', 0.972), 'cerrojo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: (t) => t < P3 + 0.2 ? 2016 : 2018 });
''')

E['tu-este'] = ('El pasillo del este', '''// TU-ESTE (frases 18–19), cartela «2020». Seis planos, cortados en la palabra inglesa:
// 1. la ladera sobre la tumba (corta en «and led by»): un técnico sube empujando el radar de carrito; Eldamaty
//    le sigue y en «hillside» señala el monte; turistas y el milano;
// 2. el radar de carrito de cerca (corta en «but beside»): en «Eldamati» entra Eldamaty y se para a mirar; en
//    «search» la pantallita da el eco y él señala;
// 3. el bloque del monte en corte (corta en «long»): en «showed up» sale la mancha alargada paralela al pasillo; la
//    mano con el puntero largo marca el alto en «six and a half feet high» y el largo en «30 feet long»;
// 4. el radargrama (corta en «Zahi»): en «a few yards» sube la banda brillante alargada; el dedo la recorre en
//    «running parallel»;
// 5. el despacho oficial (corta en «discovery»): Hawass detrás de la mesa; en «wasn't convinced» niega con la cabeza
//    (globo con X) y la carpeta se queda a medio cerrar; en «never» señala, sale un globo con «0» y el sello baja, duda
//    y vuelve a subir;
// 6. el corte del monte (hasta el final): el lápiz se acerca a la mancha del pasillo del este en «eastern corridor»,
//    duda y se retira; en «left hanging» la «?» parpadea encima.''', r'''
const N = Math.round;
const ease = (u) => u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u);
const K = hex('#1a1410'), BL = hex('#f8f4e8');
const globo = (x, y, ic, c) => { R.disco(x, y, 7, K); R.disco(x, y, 6, BL); R.pset(x - 5, y + 7, K); R.pset(x - 4, y + 6, BL); R.pset(x - 6, y + 8, K); R.icono(ic, x - (ic === '?' ? 2 : 1), y - 4, c, null, 1); };
const destello = (x, y, r, c = '#fff8d0') => { const C = hex(c); R.linea(x - r, y, x + r, y, C); R.linea(x, y - r, x, y + r, C); const d = N(r * 0.5); R.linea(x - d, y - d, x + d, y + d, C); R.linea(x - d, y + d, x + d, y - d, C); R.pset(x, y, hex('#ffffff')); };
const puntero = (x, y, dx, dy, c = '#d83a2a') => { R.linea(x, y, x + dx, y + dy, hex('#2a2a34')); R.linea(x + 1, y, x + dx + 1, y + dy, hex('#6a6a78')); R.pset(x, y, hex(c)); R.pset(x - 1, y, hex(c)); };
const pie = (x) => N(140 - 0.12 * (x - 160));
const P2 = en('este', 0.2672), P3 = en('este', 0.499), P4 = en('este', 0.8028), P5 = en('hawass', 0) - 0.1, P6 = en('hawass', 0.5247);
const ED = T.ELENCO_TU.eldamatyTU, HW = T.ELENCO_TU.hawassTU;

// 1 · la ladera: el técnico empuja el radar de carrito monte arriba; Eldamaty le sigue y señala
const p1 = (t) => {
  const carrito = lerp(0, 0.6, ease(tramo(t, en('este', 0.03), en('este', 0.26))));
  const o = { encuadre: 'ladera', epoca: 2020, carrito: Math.max(0.001, carrito) };
  const g = T.ladera(R, t, o);
  const [ax, ay] = g.asa || [96, 120];
  const xt = N(ax - 15);
  const mueve = t > en('este', 0.03) && t < en('este', 0.26);
  R.actor(EL.tecnico, xt, pie(xt + 7), t, { dir: 1, anda: mueve, sostiene: [ax, ay] });
  const ue = ease(tramo(t, en('este', 0.06), en('este', 0.24)));
  const xe = N(lerp(40, xt - 26, ue));
  R.actor(ED, xe, pie(xe + 7), t, { dir: 1, anda: ue > 0 && ue < 1, dedo: t > en('este', 0.213) && t < en('este', 0.27), habla: t > en('este', 0.2) && t < en('este', 0.25) });
  T.laderaDelante(R, t, o);
};

// 2 · el radar de carrito de cerca: Eldamaty llega, mira la pantallita y señala el eco en «search»
const p2 = (t) => {
  const eco = ease(tramo(t, en('este', 0.4317), en('este', 0.48)));
  const o = { encuadre: 'ladera', camara: 'carrito', epoca: 2020, eco };
  T.ladera(R, t, o);
  const u = ease(tramo(t, P2 + 0.1, en('este', 0.305)));
  const x = N(lerp(10, 112, u));
  R.actor(ED, x, 158, t, { dir: 1, anda: u > 0 && u < 1, habla: t > en('este', 0.33) && t < en('este', 0.37), dedo: t > en('este', 0.4317), sorpresa: t > en('este', 0.48) && t < en('este', 0.5) });
  if (eco > 0.9) { const q = tramo(t, en('este', 0.48), en('este', 0.48) + 0.5); if (q < 1) destello(190, 120, N(2 + 4 * Math.sin(q * Math.PI))); }
};

// 3 · el bloque en corte: la mancha alargada sale; el puntero mide el alto y el largo
const p3 = (t) => {
  const pasillo = ease(tramo(t, en('este', 0.5549), en('este', 0.61)));
  const o = { encuadre: 'este', epoca: 2020, pasillo, duda: 0 };
  const g = T.ladera(R, t, o);
  const [x0, y0, x1, y1] = g.espacio || [70, 82, 160, 94];
  const entra = ease(tramo(t, en('este', 0.62), en('este', 0.6858)));
  const alto = tramo(t, en('este', 0.6858), en('este', 0.74)), largo = ease(tramo(t, en('este', 0.7758), en('este', 0.8)));
  if (entra > 0.02) {
    let tx, ty;
    if (t < en('este', 0.75)) { tx = x1 + 3; ty = N(lerp(y1, y0, Math.min(1, alto))); }
    else { tx = N(lerp(x1 + 3, x0, largo)); ty = y1 + 3; }
    // un puntero largo (40 px) para que el brazo asome poco desde abajo
    const hx = N(lerp(330, tx + 26, entra)), hy = N(lerp(210, ty + 42, entra));
    puntero(tx, ty, hx - tx - 2, hy - ty - 4);
    T.brazo(R, hx + 22, 200, hx, hy, '#4a6a8a', -1, { codo: [hx + 24, hy + 24] });
  }
};

// 4 · el radargrama: la banda alargada sube y el dedo la recorre en «running parallel»
const p4 = (t) => {
  const eco = ease(tramo(t, en('este', 0.8369), en('este', 0.88)));
  const g = T.ladera(R, t, { encuadre: 'este', camara: 'radargrama', epoca: 2020, eco });
  const [ex, ey] = g.eco || [190, 100];
  const entra = ease(tramo(t, en('este', 0.88), en('este', 0.9163))), corre = ease(tramo(t, en('este', 0.9163), en('este', 0.98)));
  const sale = ease(tramo(t, en('este', 1.0) + 0.2, en('este', 1.0) + 0.7));
  const k = entra * (1 - sale);
  if (k > 0.02) { const tx = N(lerp(ex - 40, ex + 30, corre)), ty = ey + 2, hx = N(lerp(330, tx + 24, k)), hy = N(lerp(210, ty + 42, k));
    puntero(tx, ty, hx - tx - 2, hy - ty - 4); T.brazo(R, hx + 22, 200, hx, hy, '#4a6a8a', -1, { codo: [hx + 24, hy + 24] }); }
};

// 5 · el despacho: Hawass detrás de la mesa niega con la cabeza; la carpeta a medio cerrar; el sello duda
const p5 = (t) => {
  const carpeta = ease(tramo(t, en('hawass', 0.2706), en('hawass', 0.36)));
  const sello = tramo(t, en('hawass', 0.4415), en('hawass', 0.5247) + 0.05);
  const o = { encuadre: 'permiso', carpeta, sello };
  T.ladera(R, t, o);
  const u = ease(tramo(t, P5 + 0.1, en('hawass', 0.12)));
  const x = N(lerp(240, 208, u));
  const niega = t > en('hawass', 0.2706) && t < en('hawass', 0.36);
  const dir = niega ? (Math.floor((t - en('hawass', 0.2706)) * 6) % 2 ? 1 : -1) : -1;
  R.actor(HW, x, 132, t, { dir, anda: u > 0 && u < 1, habla: (t > en('hawass', 0.3644) && t < en('hawass', 0.5)) , dedo: t > en('hawass', 0.4415) && t < en('hawass', 0.52), enfado: niega });
  T.laderaDelante(R, t, o);
  // lo que dice, en globos: «no» (X) mientras niega, y el radar con «0» descubrimientos en «never … single discovery»
  if (niega) globo(x - 8, 92, 'X', hex('#d83a2a'));
  if (t > en('hawass', 0.4415)) { const bx = x - 8, by = 92; R.disco(bx, by, 9, K); R.disco(bx, by, 8, BL); R.pset(bx - 7, by + 9, K); R.pset(bx - 6, by + 8, BL); R.pset(bx - 8, by + 10, K);
    R.numero('0', bx + 1, by + 4, { centro: true }); }
};

// 6 · el corte: el lápiz se acerca a la mancha del pasillo del este, duda y se va; la «?» parpadea
const p6 = (t) => {
  const o = { encuadre: 'corte', epoca: 2020, pasillo: 1, anomalias: 0.4, broca: 0 };
  const g = T.ladera(R, t, o);
  // la mancha del pasillo del este: x 60–150, y 80–90 (cabecera de ladera 'corte')
  const [px, py] = [108, 86];
  const acerca = ease(tramo(t, en('hawass', 0.6759), en('hawass', 0.86))), retira = ease(tramo(t, en('hawass', 0.9406), en('hawass', 0.99)));
  const k = acerca * (1 - retira), tiembla = acerca >= 1 && retira === 0 ? (Math.floor(t * 10) % 2) : 0;
  if (k > 0.02) { const tx = px + tiembla, ty = N(py + 6 + 10 * (1 - k)), hx = N(lerp(220, tx + 26, k)), hy = N(lerp(214, ty + 44, k));
    puntero(tx, ty, hx - tx - 2, hy - ty - 4, '#3a6ad8'); T.brazo(R, hx + 22, 204, hx, hy, '#4a6a8a', -1, { codo: [hx + 24, hy + 24] }); }
  if (t > en('hawass', 0.9406) && Math.floor(t * 3) % 2 === 0) globo(px - 4, py - 20, '?', hex('#3a6ad8'));
};

const efectos = [[en('este', 0.4317), 'bip'], [en('este', 0.5549), 'brillo'], [en('este', 0.7758), 'lapiz'],
  [en('este', 0.8369), 'bip'], [en('hawass', 0.2706), 'papel'], [en('hawass', 0.9406), 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, cartela: '2020', año: 2020 });
''')
