E = {}

E['te-leyenda'] = ('La leyenda de la flota', '''// TE-LEYENDA (frases 21–23). La flota se vuelve leyenda. Cinco planos:
// 1. (puerto de noche, La Rochelle) las galeras salen por la bocana con la vela de la cruz y se vuelven fantasmas en la
//    niebla; un templario carga un cofre por el muelle y se para a mirar; otro, en el bolardo, levanta el farol y lo
//    mece despidiendo a la flota en «La Rochelle»;
// 2. (mapa, corte en «and the fleet») una mano con pluma marca La Rochelle con un círculo de tinta y se retira en «on its
//    own»: la flota dibujada navega sola: llega a Escocia en «Scotland», a Portugal en «Portugal» y a América en
//    «America» (chincheta);
// 3. (mapa de Nueva Escocia, corte en «Some») en «pit» un cubo de tinta baja por el pozo dibujado; en «Nova Scotia» una
//    lupa entra y aumenta Oak Island; en «told you» cae una tarjeta con el «14» (el vídeo de Oak Island);
// 4. (hoy, el prado al atardecer, corte en «And every») el buscador pasa el detector junto a una piedra vieja; en «finds»
//    pita, lo deja en la hierba y con la brocha limpia la piedra: en «carved» sale la cruz tallada («!»);
// 5. (la piedra de cerca, en el hoyo, corte en «The question») la cruz grande; en «question» el «?»; en «Templars pass»
//    un templario fantasma cruza por detrás del hoyo y se desvanece; el buscador se gira tarde y se rasca la cabeza.''', r'''
const a = (f) => en('rochelle', f), b = (f) => en('oak', f), c = (f) => en('cruz', f);
const P2 = a(0.423), P3 = b(-0.028), P4 = c(-0.03), P5 = c(0.54);
const K = T.C.k;
// la luz caliente de un farol de mano en (x, y): asa, jaula de hierro, cristal y la llama con su halo
const farol = (x, y, t, k = 0) => {
  x = Math.round(x); y = Math.round(y);
  R.linea(x, y, x, y + 2, hex('#2a2024'));
  for (let i = 0; i < 26; i++) { const an = i / 26 * Math.PI * 2, r = 7 + Math.sin(t * 9 + i) * 0.6; const px = Math.round(x + Math.cos(an) * r), py = Math.round(y + 7 + Math.sin(an) * r * 0.9); if (R.b4(px, py) < 0.35) R.pset(px, py, hex('#c89a50')); }
  R.rect(x - 3, y + 3, x + 3, y + 3, K); R.rect(x - 3, y + 11, x + 3, y + 12, K);
  R.rect(x - 2, y + 4, x + 2, y + 10, hex('#f8d070')); R.rect(x - 1, y + 5, x + 1, y + 9, hex('#fff2b0'));
  R.linea(x - 3, y + 4, x - 3, y + 10, K); R.linea(x + 3, y + 4, x + 3, y + 10, K); R.linea(x, y + 4, x, y + 10, hex('#3a2a20'));
  const f = Math.sin(t * 13 + k) > 0; R.pset(x + (f ? 1 : -1), y + 6, hex('#ffffff')); R.pset(x - 1, y + 2, hex('#5a4a3a')); R.pset(x + 1, y + 2, hex('#5a4a3a'));
};
// un cofre pequeño de madera con herrajes, en brazos (x, y: la mano)
const cofrecito = (x, y) => {
  x = Math.round(x); y = Math.round(y);
  R.rect(x - 7, y - 6, x + 5, y + 3, K); R.rect(x - 6, y - 5, x + 4, y + 2, hex('#8a5a2a')); R.rect(x - 6, y - 5, x + 4, y - 4, hex('#b07a3a'));
  R.rect(x - 6, y - 2, x + 4, y - 2, hex('#3a2418')); R.linea(x - 4, y - 5, x - 4, y + 2, hex('#c8a040')); R.linea(x + 2, y - 5, x + 2, y + 2, hex('#c8a040'));
  R.pset(x - 1, y - 1, hex('#f0d070')); R.pset(x - 1, y, hex('#3a2418'));
};

// 1 · La Rochelle de noche: las galeras salen entre la niebla y se vuelven fantasmas; el del farol las despide
const ROCH = a(0.31), PORT = a(0.23);
const p1 = (t) => {
  const d = T.puerto(R, t, { flota: 0.08 + tramo(t, 0.2, P2 + 0.3) * 0.72 });
  const S = d.suelo;
  // el templario que carga un cofre por el muelle y se para a mirar cómo se van
  { const u = tramo(t, 0.2, PORT + 0.2), x = Math.round(lerp(40, 112, u)), anda = u > 0 && u < 1;
    const m = R.actor(EL.templario2, x, S, t, { dir: 1, anda, sostiene: [x + 14, S - 15], sorpresa: t > ROCH && t < ROCH + 0.8 }).mano;
    cofrecito(m[0] + 2, m[1]); }
  // el del bolardo: suelta la amarra y luego levanta el farol y lo mece en «La Rochelle»
  { const x = 204, alza = tramo(t, ROCH - 0.4, ROCH), mece = t > ROCH ? Math.sin((t - ROCH) * 6) * 3 : 0;
    const suelta = t < PORT;
    const o = { dir: -1, habla: t > ROCH + 0.3 && t < ROCH + 1.0 && Math.sin(t * 9) > 0 };
    if (suelta) o.sostiene = [x - 2, S - 8 - Math.round(Math.abs(Math.sin(t * 5)) * 2)];
    else o.sostiene = [x - 4 + Math.round(mece), S - 16 - Math.round(alza * 10)];
    const m = R.actor(EL.templario, x, S, t, o).mano;
    if (suelta) { // la amarra que se desata del bolardo
      const fl = tramo(t, PORT - 0.6, PORT); R.linea(m[0], m[1], Math.round(lerp(m[0] - 2, 180, fl)), Math.round(lerp(m[1] + 2, 150, fl)), hex('#b89a6a')); }
    else farol(m[0], m[1] + 1, t, 2); }
  // una gaviota que se posa en los barriles y otra que cruza la niebla
  { const u = tramo(t, 0.4, 2.2), x = Math.round(lerp(330, 290, u)), y = Math.round(lerp(96, 137, u)), al = u < 1 ? Math.sin(t * 14) > 0 : false;
    R.rect(x - 2, y - 1, x + 2, y, hex('#e8e8e8')); R.pset(x - 3, y - 1, hex('#f0a020')); R.pset(x + 3, y, hex('#9a9aa6'));
    if (al) { R.pset(x - 1, y - 2, hex('#d8d8e0')); R.pset(x, y - 3, hex('#d8d8e0')); R.pset(x + 1, y - 2, hex('#d8d8e0')); } else { R.pset(x + 1, y - 2, hex('#9a9aa6')); R.pset(x, y + 1, hex('#f0a020')); R.pset(x + 1, y + 1, hex('#f0a020')); } }
};

// 2 · el mapa: la pluma marca La Rochelle y se retira; la flota de tinta navega sola a Escocia, Portugal y América
const FLEET = a(0.44), SOLA = a(0.57), SCOT = a(0.67), PORTU = a(0.78), AMER = a(0.93);
const ru = (t) => t < FLEET + 0.25 ? 0 : t < SCOT ? 0.4 * tramo(t, FLEET + 0.25, SCOT) : t < PORTU ? 0.4 + 0.2 * tramo(t, SCOT, PORTU) : 0.6 + 0.4 * tramo(t, PORTU, AMER);
const pluma = (x, y) => {   // la pluma de ave con su punta en (x, y), inclinada hacia arriba a la derecha
  x = Math.round(x); y = Math.round(y);
  for (let i = 0; i <= 22; i++) { const px = x + Math.round(i * 0.8), py = y - i; R.pset(px, py, i < 3 ? hex('#1a1418') : hex('#c8b890'));
    if (i > 6) { const w = Math.round(Math.min(3, (i - 6) * 0.5) * (i > 19 ? (23 - i) / 4 : 1)); for (let s = 1; s <= w; s++) { R.pset(px - s, py - (s >> 1), s === w ? hex('#b8b0a0') : hex('#f2eee2')); R.pset(px + s, py + (s >> 1), s === w ? hex('#a8a090') : hex('#e2dcd0')); } } }
};
const p2 = (t) => {
  const d = T.puerto(R, t, { encuadre: 'mapa', rutas: ru(t) });
  const [lx, ly] = d.rochelle;
  // el círculo de tinta que la pluma traza alrededor de La Rochelle
  { const u = tramo(t, P2 + 0.35, FLEET + 0.35); for (let i = 0; i < 40 * u; i++) { const an = i / 40 * Math.PI * 2 - 1.2; R.pset(Math.round(lx + Math.cos(an) * 7), Math.round(ly + Math.sin(an) * 6), hex('#3a2418')); } }
  // las ondas de llegada en cada destino
  for (const [p, t0] of [[d.escocia, SCOT], [d.portugal, PORTU], [d.oak, AMER]]) { const w = tramo(t, t0, t0 + 0.7); if (w > 0 && w < 1) for (let q = 0; q < 20; q++) if (q % 2) { const an = q / 20 * Math.PI * 2; R.pset(Math.round(p[0] + Math.cos(an) * (3 + w * 8)), Math.round(p[1] + Math.sin(an) * (3 + w * 6)), hex('#8a1e24')); } }
  // la mano con la pluma: entra por la derecha, traza el círculo y se retira en «on its own»
  const ent = tramo(t, P2 - 0.1, P2 + 0.35), sal = tramo(t, SOLA - 0.2, SOLA + 0.5), v = ent * (1 - sal);
  if (v > 0) {
    const u = tramo(t, P2 + 0.35, FLEET + 0.35), an = u * Math.PI * 2 - 1.2, tx = lx + Math.cos(an) * 7 * (u > 0 && u < 1 ? 1 : 0), ty = ly + Math.sin(an) * 6 * (u > 0 && u < 1 ? 1 : 0) - (u >= 1 ? 3 : 0);
    const wx = Math.round(lerp(352, tx + 16, v)), wy = Math.round(lerp(150, ty - 4, v));
    pluma(wx - 16, wy + 4);
    T.brazo(R, wx + 46, wy + 24, wx, wy, '#3a4a6a', -1, { codo: [wx + 24, wy + 16] });
  }
};

// 3 · Nueva Escocia de cerca: el cubo baja por el pozo dibujado, la lupa aumenta Oak Island y cae la tarjeta del «14»
const PIT = b(0.21), NOVA = b(0.28), OAKI = b(0.49), TOLD = b(0.71);
const p3 = (t) => {
  const d = T.puerto(R, t, { encuadre: 'mapa', camara: 'oeste', rutas: 1 });
  // el cubo de tinta que baja por el pozo dibujado y vuelve a subir
  { const u = tramo(t, PIT - 0.2, PIT + 1.6), v = u < 1 ? Math.sin(u * Math.PI) : 0, x = 222, y = Math.round(48 + v * 30);
    R.recorte([211, 40, 245, 85]);
    R.linea(x + 2, 42, x + 2, y - 1, hex('#3a2418'));
    R.rect(x, y, x + 4, y + 3, hex('#3a2418')); R.rect(x + 1, y, x + 3, y + 2, hex('#a07040')); R.pset(x + 2, y - 1, hex('#3a2418'));
    R.recorte(null); }
  // la lupa: entra por la izquierda en «Nova Scotia», se queda sobre Oak Island y se va
  const [ox, oy] = d.oak, ent = tramo(t, NOVA - 0.5, NOVA + 0.2), sal = tramo(t, TOLD - 0.6, TOLD), v = ent * (1 - sal);
  if (v > 0) {
    const cx = Math.round(lerp(-30, ox + 2 + Math.sin(t * 1.7) * 2, v)), cy = Math.round(lerp(150, oy - 2 + Math.cos(t * 1.3) * 1.5, v)), r = 13;
    // lo de debajo, aumentado al doble dentro del cristal
    const src = []; for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) src.push(R.pget(cx + (i >> 1), cy + (j >> 1)));
    let n = 0; for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++, n++) { const q = Math.hypot(i, j); if (q <= r - 1) { R.pset(cx + i, cy + j, src[n]); } }
    for (let s = 0; s < 64; s++) { const an = s / 64 * Math.PI * 2; R.pset(Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r), hex('#5a3a1a')); R.pset(Math.round(cx + Math.cos(an) * (r + 1)), Math.round(cy + Math.sin(an) * (r + 1)), K); if (an > 3.5 && an < 4.6) R.pset(Math.round(cx + Math.cos(an) * (r - 1)), Math.round(cy + Math.sin(an) * (r - 1)), hex('#ffffff')); }
    // el mango de madera hacia la mano y el brazo que entra por la izquierda
    const hx = cx - 24, hy = cy + 16;
    for (let i = 0; i <= 14; i++) { const px = Math.round(lerp(cx - r * 0.7, hx + 4, i / 14)), py = Math.round(lerp(cy + r * 0.7, hy - 1, i / 14)); R.rect(px - 1, py - 1, px + 1, py + 1, K); R.pset(px, py, hex('#8a5a2a')); }
    T.brazo(R, hx - 40, hy + 14, hx, hy, '#6a3a2a', 1);
  }
  // la tarjeta del «14» que cae con su chincheta junto al pozo
  { const u = tramo(t, TOLD, TOLD + 0.4); if (u > 0) { const y = Math.round(lerp(60, 96, u)), x = 254;
    R.rect(x + 1, y + 1, x + 25, y + 17, hex('#3a2a1a')); R.rect(x - 1, y - 1, x + 23, y + 15, K); R.rect(x, y, x + 22, y + 14, hex('#f6eed6')); R.rect(x, y + 13, x + 22, y + 14, hex('#d8c8a0'));
    R.numero('14', x + 4, y + 12, { tam: 8, color: hex('#8a1e24'), sombra: false });
    T.chincheta(R, x + 11, y + 2, t, T.C.rojo, { baja: tramo(t, TOLD + 0.3, TOLD + 0.6) }); } }
};

// 4 · hoy, el prado al atardecer: el detector pita junto a una piedra vieja; la brocha saca la cruz tallada
const FIND = c(0.15), CARV = c(0.27), STONE = c(0.41);
const piedra = (x, base, cruz) => {   // una estela vieja de granito con liquen; cruz (0–1): la cruz tallada que aparece
  for (let j = 0; j < 24; j++) { const w = j > 19 ? Math.round(Math.sqrt(1 - ((j - 19) / 5) ** 2) * 8) : 8; for (let i = -w - 1; i <= w + 1; i++) { const y = base - j, e = Math.abs(i) > w;
    R.pset(x + i, y, e ? K : i < -w + 2 ? hex('#a8a498') : i > w - 2 ? hex('#5e5a54') : (i * 7 + j * 13) % 11 === 0 ? hex('#6e6a62') : hex('#8a867c')); } }
  R.rect(x - 9, base - 25, x + 9, base - 25, K);
  for (const [i, j, cc] of [[-5, 4, '#c8b84a'], [-4, 5, '#a8a03a'], [5, 15, '#c8b84a'], [6, 16, '#d8c86a'], [-6, 18, '#8aa04a'], [3, 2, '#7a9a4a'], [4, 3, '#8aa04a']]) R.pset(x + i, base - j, hex(cc));
  if (cruz > 0) { const cc = cruz > 0.6 ? hex('#3a362e') : hex('#6a665e'); const n = Math.round(cruz * 6);
    for (let s = 0; s <= n; s++) { R.pset(x, base - 13 + s, cc); R.pset(x, base - 13 - s, cc); R.pset(x + s, base - 13, cc); R.pset(x - s, base - 13, cc); }
    if (cruz > 0.9) { for (const [i, j] of [[-1, -6], [1, -6], [-1, 6], [1, 6], [-6, -1], [-6, 1], [6, -1], [6, 1]]) R.pset(x + i, base - 13 + j, cc); R.pset(x + 1, base - 14, hex('#b8b4a8')); } }
};
const p4 = (t) => {
  const d = T.hoy(R, t, { encuadre: 'campo' });
  const S = d.suelo, px = 214;
  // la piedra vieja, con su sombra larga del atardecer
  for (let i = 0; i < 26; i++) R.pset(px + 9 + i, S + 1 - (i >> 3), hex('#3a5a2a'));
  const cruz = tramo(t, CARV - 0.1, STONE);
  piedra(px, S, cruz);
  // el buscador: barre con el detector, pita en «finds», lo deja en la hierba y cepilla la piedra
  const deja = t > FIND + 0.45, x = Math.round(deja ? lerp(176, 190, tramo(t, FIND + 0.45, FIND + 0.8)) : lerp(150, 176, tramo(t, P4, FIND - 0.2)));
  const anda = (t < FIND - 0.2 && t > P4 + 0.05) || (t > FIND + 0.45 && t < FIND + 0.8);
  const cepilla = t > FIND + 0.8 && t < STONE + 0.2, sorp = t > STONE && t < STONE + 1.4;
  if (deja) T.detector(R, 150, S - 1, t, { dir: 1, tumbado: true, pita: t < FIND + 1.2 ? 0.5 : 0 });
  const o = { dir: 1, anda, sorpresa: (t > FIND && t < FIND + 0.45) || sorp, sonrisa: t > STONE + 1.4 };
  if (!deja) o.sostiene = [x + 15, S - 12];
  else if (cepilla) o.sostiene = [px - 7, S - 14 + Math.round(Math.sin(t * 14) * 3)];
  else o.sostiene = [x + 15, S - 16];
  const m = R.actor(EL.buscador, x, S, t, o).mano;
  if (!deja) T.detector(R, m[0], m[1], t, { dir: 1, suelo: S, barre: t < FIND ? 1 : 0, pita: tramo(t, FIND - 0.3, FIND + 0.1) });
  else { // la brocha: mango rojo y cerdas claras
    R.rect(m[0] - 1, m[1] - 5, m[0] + 1, m[1] - 1, K); R.pset(m[0], m[1] - 4, hex('#c8303a')); R.pset(m[0], m[1] - 2, hex('#c8303a'));
    R.rect(m[0] - 2, m[1] + 1, m[0] + 2, m[1] + 4, hex('#3a2a1a')); R.rect(m[0] - 1, m[1] + 1, m[0] + 1, m[1] + 3, hex('#e8d8a8')); }
  // el polvo que salta de la piedra al cepillar
  if (cepilla) for (let k = 0; k < 6; k++) { const u = (t * 2.4 + k / 6) % 1; R.pset(Math.round(px - 9 - u * 10 + Math.sin(k * 3) * 2), Math.round(S - 14 - Math.sin(u * 3) * 6 + u * 12), u < 0.5 ? hex('#d8c8a0') : hex('#b8a880')); }
  if (sorp) R.bocadillo(x + 8, S - 30, { icono: '!' });
  // el atardecer: luz dorada sobre todo el prado (otra hora que la del principio)
  T.tinte(R, 0, 179, [255, 150, 70], 0.24);
};

// 5 · la cruz de cerca, en el hoyo: el «?» y el templario fantasma que cruza por detrás
const QUES = c(0.55), DID = c(0.78), PASS = c(0.87), HERE = c(0.93);
const FB = R.nuevo();
const mz = (p, q, u) => { let r = 0; for (const s of [0, 8, 16]) { const ca = (p >>> s) & 255, cb = (q >>> s) & 255; r += Math.round(ca + (cb - ca) * u) * (1 << s); } return (0xff000000 + r) >>> 0; };
const losa = (x0, y0, x1, y1) => {   // la losa de piedra medio enterrada, con las esquinas rotas y una cruz templaria en un círculo
  const roto = (x, y) => (x - x0 < 5 && y - y0 < 5 - (x - x0)) || (x1 - x < 4 && y - y0 < 4 - (x1 - x) + ((x * 3) % 2));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { if (roto(x, y)) continue; const e = x === x0 || x === x1 || y === y0 || roto(x, y - 1) || roto(x - 1, y) || roto(x + 1, y);
    const n = ((x * 13 + y * 7) % 17) / 17, cc = e ? K : y < y0 + 2 || roto(x, y - 2) ? hex('#b4b0a4') : x > x1 - 3 ? hex('#5e5a52') : n < 0.12 ? hex('#706c64') : n > 0.9 ? hex('#a29e92') : hex('#8c887e'); R.pset(x, y, cc); }
  const cx = (x0 + x1) >> 1, cy = y0 + 16;
  // el círculo tallado (surco oscuro con su labio de luz)
  for (let s = 0; s < 120; s++) { const an = s / 120 * Math.PI * 2; for (const [rr, cc] of [[13, '#3a3630'], [12, '#5a2a24'], [14, '#b8b4a8']]) R.pset(Math.round(cx + Math.cos(an) * rr), Math.round(cy + Math.sin(an) * rr), hex(cc)); }
  // la cruz de brazos finos que se abren en la punta (tallada, con restos de pintura roja en el fondo)
  const dentro = (p, q) => { const ap = Math.abs(p), aq = Math.abs(q); return (aq <= 10 && ap <= (aq > 6 ? aq - 5 : 1)) || (ap <= 10 && aq <= (ap > 6 ? ap - 5 : 1)); };
  for (let j = -11; j <= 11; j++) for (let i = -11; i <= 11; i++) if (dentro(i, j)) {
    const luz = !dentro(i + 1, j + 1), som = !dentro(i - 1, j - 1);
    R.pset(cx + i, cy + j, luz ? hex('#c4c0b4') : som ? hex('#2e2a26') : (i * 5 + j * 3) % 4 ? hex('#8a3a30') : hex('#5a4a44')); }
  // grietas y liquen
  for (const [sx, sy, dx, dy, n] of [[x0 + 3, y0 + 9, 1, 1, 7], [x1 - 6, y1 - 4, -1, -1, 6]]) for (let k = 0; k < n; k++) R.pset(sx + dx * k + (k % 2), sy + dy * k, hex('#3a3630'));
  for (let k = 0; k < 22; k++) { const x = x0 + 6 + ((k * 37) % (x1 - x0 - 10)), y = y0 + 2 + ((k * 23) % 7); if (Math.hypot(x - cx, y - cy) < 15) continue; R.pset(x, y, k % 3 ? hex('#c8b84a') : hex('#8aa04a')); if (k % 2) R.pset(x + 1, y, hex('#a8a03a')); }
  // la tierra que todavía la tapa por abajo, con terrones y raíces
  for (let x = x0 - 4; x <= x1 + 5; x++) { const al = 4 + Math.round(Math.sin(x * 0.7) * 1.5 + Math.sin(x * 0.23) * 2); for (let y = y1 - al; y <= y1 + 1; y++) R.pset(x, y, y === y1 - al ? hex('#8a6a3a') : (x * 7 + y * 3) % 5 ? hex('#6a4a2a') : hex('#4a3020')); }
};
const p5 = (t) => {
  const d = T.hoy(R, t, { encuadre: 'campo', camara: 'suelo' });
  const S = d.suelo;
  // el templario fantasma: cruza por detrás del hoyo, translúcido, y se desvanece
  const g = tramo(t, DID - 0.2, HERE + 0.5);
  if (g > 0 && g < 1) {
    FB.fill(0); const prev = R.usar(FB); const gx = Math.round(lerp(262, 196, g)); R.actor(EL.templario, gx, S, t, { dir: -1, anda: true }); R.usar(prev);
    const al = Math.min(1, g * 4, (1 - g) * 3) * 0.85, GC = hex('#bfe4ff'), GO = hex('#3a5a8a');
    for (let y = S - 34; y <= S + 1; y++) for (let x = gx - 4; x <= gx + 20; x++) { const q = FB[y * 320 + x]; if (!q) continue; const s0 = R.pget(x, y);
      const lum = ((q & 255) + ((q >>> 8) & 255) + ((q >>> 16) & 255)) / 765, obj = lum < 0.2 ? GO : mz(GC, q, 0.3);
      R.pset(x, y, mz(s0, obj, al)); }
    for (let k = 0; k < 5; k++) { const u = (t * 1.5 + k / 5) % 1; R.pset(gx + 16 + Math.round(u * 10), S - 8 - k * 4 + Math.round(Math.sin(u * 6) * 2), hex('#d8e8f0')); }
  }
  // la losa con la cruz, medio desenterrada junto al hoyo
  losa(94, 96, 146, 136);
  // el buscador, a la izquierda: mira la cruz, se pregunta, se gira tarde y se rasca la cabeza
  const tarde = t > HERE + 0.2, x = 64;
  const m = R.actor(EL.buscador, x, S, t, { dir: tarde ? -1 : 1, sostiene: t < QUES - 0.1 ? [x + 18, S - 18 + Math.round(Math.sin(t * 14) * 2)] : false,
    dedo: t > QUES && t < DID, sorpresa: t > PASS && t < HERE + 0.6, brazos: false, triste: false, sonrisa: t > HERE + 1.2 }).mano;
  if (t < QUES - 0.1) { R.rect(m[0] - 1, m[1] - 5, m[0] + 1, m[1] - 1, K); R.pset(m[0], m[1] - 4, hex('#c8303a')); R.rect(m[0] - 2, m[1] + 1, m[0] + 2, m[1] + 4, hex('#3a2a1a')); R.rect(m[0] - 1, m[1] + 1, m[0] + 1, m[1] + 3, hex('#e8d8a8')); }
  if (t > QUES && t < DID + 0.4) R.bocadillo(x + 8, S - 30, { icono: '?' });
  if (t > HERE + 0.8) R.bocadillo(x + 8, S - 30, { icono: '?' });
  T.tinte(R, 0, 179, [255, 150, 70], 0.2);
};

const efectos = [[0.2, 'ola'], [ROCH, 'viento'], [P2 + 0.4, 'lapiz'], [SCOT, 'pop'], [PORTU, 'pop'], [AMER, 'brillo'], [NOVA, 'whoosh'], [TOLD + 0.55, 'pop'],
  [FIND, 'bip'], [FIND + 0.9, 'papel'], [STONE, 'brillo'], [QUES, 'pop'], [PASS - 0.3, 'whoosh']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: (t) => (t < P3 ? 1307 : t < P4 ? 1795 : 2026) });
''')

E['te-logia'] = ('La gran logia', '''// TE-LOGIA (frases 24–26), cartela «1717». Siete planos:
// 1. (fondo local: la calle de Londres de 1717) la cúpula de San Pablo al fondo, la taberna de ladrillo con el letrero del
//    ganso y la parrilla que se mece; dos caballeros con peluca llegan por los dos lados, se saludan en «1717» y en «by
//    tradition» se abre la puerta (luz caliente); en «London tavern» entran; otros dos llegan corriendo; un perro cruza;
// 2. (taberna, corte en «Four») cuatro caballeros de cuatro logias (mandiles de cuatro colores) charlan por parejas;
//    en «come together» se vuelven al centro y alzan las jarras, en «grand lodge» brindan (destellos) y sonríen;
// 3. (el banco del cantero, corte antes de «Freemasons») un cantero medieval con mandil de cuero talla su marca con maza
//    y cincel; en «stone masons» la marca queda acabada y salta la última esquirla;
// 4. (la catedral en obras, corte en «who built») la grúa sube un sillar, los canteros golpean; el maestro cantero
//    sostiene la escuadra y en «now» se la da a un caballero con peluca que llega, que la alza en «fraternal»;
// 5. (la mesa de la taberna de cerca, corte en «gentlemen») cenan en «dine» (uno se lleva el pan a la boca), hablan en
//    «talk» (dedo) y en «charity» uno echa monedas en el cepillo de madera (brillo);
// 6. (fondo local: París en 1736 al atardecer, corte en «In 1736») el Sena, Notre-Dame a contraluz con su aguja, una
//    barcaza; un carruaje llega y para en «Paris»; en «Scottish mason» baja Ramsay y en «Andrew Ramsay» los dos
//    masones de la puerta le saludan; entra;
// 7. (el atril, corte en «gives») Ramsay habla y pasa la hoja; en «nobler origin» le sale la nube de pensamiento y en
//    «the Crusaders» cruzan por ella tres cruzados a caballo con sus estandartes.''', r'''
import { carruaje } from '/atomo/plato/escenas/ny-comun.js';
const a = (f) => en('taberna', f), b = (f) => en('canteros', f), c = (f) => en('ramsay', f);
const P2 = a(0.59), P3 = b(-0.045), P4 = b(0.287), P5 = b(0.629), P6 = c(-0.017), P7 = c(0.537);
const K = T.C.k;
const mz = (p, q, u) => { let r = 0; for (const s of [0, 8, 16]) { const ca = (p >>> s) & 255, cb = (q >>> s) & 255; r += Math.round(ca + (cb - ca) * u) * (1 << s); } return (0xff000000 + r) >>> 0; };
const H = (x, y, s) => { const v = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453; return v - Math.floor(v); };
// pintar en un fondo fijo: cada píxel que se pinta deja de ser cielo en la máscara M (las nubes solo van por el cielo)
const pintor = (M) => {
  const p = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, c); M[y * 320 + x] = 0; };
  const r = (x0, y0, x1, y1, c) => { for (let y = Math.round(y0); y <= y1; y++) for (let x = Math.round(x0); x <= x1; x++) p(x, y, c); };
  return { p, r };
};
const cieloBandas = (M, hor, cols) => { for (let y = 0; y < hor; y++) for (let x = 0; x < 320; x++) { const quieta = (y <= 22 && x >= 14 && x <= 176) || (y <= 48 && x >= 270); const f = (y / hor) * (cols.length - 1), i = Math.floor(f), fr = f - i; R.pset(x, y, hex(cols[Math.min(cols.length - 1, fr > R.b4(x, y) * 0.9 + 0.05 ? i + 1 : i)])); M[y * 320 + x] = quieta ? 0 : 1; } };
// nubes de tres tonos que pasan solo por el cielo (sombra, cuerpo y luz), a tres velocidades
const nubes = (M, t, lista, [cs, cm, cl]) => {
  for (const [x0, y, w, v] of lista) { const x = ((x0 + t * v) % 400 + 400) % 400 - 40;
    const bolas = [[0, 0, w * 0.3], [-w * 0.3, w * 0.06, w * 0.22], [w * 0.3, w * 0.05, w * 0.24], [-w * 0.1, -w * 0.12, w * 0.24], [w * 0.14, -w * 0.08, w * 0.2]];
    for (const [pass, dy, k, col] of [[0, 1, 1, cs], [1, 0, 1, cm], [2, -1.5, 0.72, cl]]) for (const [dx, dd, r0] of bolas) { const rr = r0 * k, cx = x + dx - (pass === 2 ? 1 : 0), cy = y + dd + dy;
      for (let j = Math.floor(-rr); j <= rr; j++) for (let i = Math.floor(-rr); i <= rr; i++) if (i * i + j * j <= rr * rr) { const px = Math.round(cx + i), py = Math.round(cy + j); if (px >= 0 && px < 320 && py >= 0 && py < 180 && M[py * 320 + px]) R.pset(px, py, hex(col)); } } }
};
const humo = (x, y, t, k, col = '#b8b0a8') => { for (let i = 0; i < 7; i++) { const u = (t * 0.35 + i / 7 + k * 0.13) % 1; const px = Math.round(x + Math.sin(u * 5 + k + t) * 2 + u * 10), py = Math.round(y - u * 22); if (R.b4(px, py) < 1 - u) { R.pset(px, py, hex(col)); R.pset(px + 1, py, hex(col)); if (u > 0.3) R.pset(px, py - 1, hex(col)); } } };
// una jarra de peltre en la mano (x, y)
const jarra = (x, y, espuma = true) => { x = Math.round(x); y = Math.round(y);
  R.rect(x - 2, y - 6, x + 3, y + 1, K); R.rect(x - 1, y - 5, x + 2, y, hex('#a8acb4')); R.pset(x - 1, y - 5, hex('#e0e4ea')); R.pset(x - 1, y - 4, hex('#d0d4dc')); R.rect(x + 2, y - 5, x + 2, y, hex('#7a7e88'));
  R.pset(x + 4, y - 4, K); R.pset(x + 4, y - 2, K); if (espuma) { R.rect(x - 2, y - 7, x + 3, y - 6, hex('#f6f0e0')); R.pset(x + 1, y - 8, hex('#f6f0e0')); } };
const brindis = (x, y, t, t0) => { const w = tramo(t, t0, t0 + 0.5); if (w <= 0 || w >= 1) return; for (let q = 0; q < 8; q++) { const an = q / 8 * Math.PI * 2, r = 2 + w * 7; R.pset(Math.round(x + Math.cos(an) * r), Math.round(y + Math.sin(an) * r), q % 2 ? hex('#fff6c0') : hex('#ffd060')); } };
const PL = (o) => { const r = {}; for (const k in o) r[k] = typeof o[k] === 'string' ? hex(o[k]) : o[k]; return r; };
const LOGIAS = [{ A: '#3a6ac8' }, { A: '#c8303a' }, { A: '#3a9a5a' }, { A: '#e8b830' }];

// 1 · la calle de Londres en 1717 (fondo local): la taberna del ganso y la parrilla, San Pablo al fondo
const BL = R.nuevo(), ML = new Uint8Array(320 * 180); let hechoL = false;
const pintaLondres = () => {
  const { p, r } = pintor(ML);
  cieloBandas(ML, 110, ['#6a8ac0', '#88a4cc', '#a8bcd6', '#c8d0d8', '#e6dccb', '#f2dcb4']);
  // San Pablo al fondo, en el hueco entre las casas: tambor con columnas, cúpula, linterna y la bola
  { const cx = 105, cy = 62, hz = (c) => mz(hex(c), hex('#c8d0d8'), 0.35);
    for (let x = 80; x <= 130; x++) for (let y = 74 + Math.round(H(x >> 2, 1, 3) * 6); y <= 112; y++) p(x, y, (x + y) % 7 ? hz('#7a7a88') : hz('#6a6a78'));   // tejados lejanos
    for (let x = 88; x <= 122; x++) for (let y = 64; y <= 76; y++) p(x, y, (x - 88) % 4 === 0 ? hz('#6a7088') : x < 98 ? hz('#c0c4cc') : x > 114 ? hz('#80869a') : hz('#a0a6b4'));
    r(86, 63, 124, 64, hz('#d8dade'));
    for (let j = 0; j <= 16; j++) { const w = Math.round(Math.sqrt(1 - (j / 17) ** 2) * 17); for (let i = -w; i <= w; i++) p(cx + i, cy - j, i < -w * 0.4 ? hz('#c8ccd6') : i > w * 0.45 ? hz('#7a8096') : (i + 40) % 6 === 0 ? hz('#8a90a4') : hz('#a2a8b8')); }
    r(cx - 2, cy - 24, cx + 2, cy - 17, hz('#b0b4c0')); p(cx - 2, cy - 24, hz('#d8dade')); r(cx - 1, cy - 27, cx + 1, cy - 25, hz('#e0c070')); p(cx, cy - 29, hz('#e0c070')); p(cx, cy - 28, hz('#e0c070'));
    for (const x of [84, 126]) { r(x - 2, 52, x + 2, 76, hz('#8a8e9e')); r(x - 3, 50, x + 3, 52, hz('#b0b4c0')); } }
  // la calle que se aleja entre las casas: fachadas lejanas con ventanas encendidas, el suelo y la bruma
  { const hz = (c, k = 0.4) => mz(hex(c), hex('#c8d0d8'), k);
    for (const [x0, x1, top, col] of [[86, 100, 80, '#8a6a5a'], [100, 112, 86, '#7a5a4c'], [112, 126, 78, '#9a6a52'], [104, 118, 96, '#6a5048']]) {
      for (let y = top; y <= 150; y++) for (let x = x0; x <= x1; x++) p(x, y, (y - top) % 9 === 0 ? hz('#5a4a44') : (x * 3 + y) % 13 === 0 ? hz('#a08070') : hz(col));
      for (let x = x0 - 1; x <= x1 + 1; x++) p(x, top - 1, hz('#4a3a36', 0.3));
      for (let y = top + 4; y < 146; y += 9) for (let x = x0 + 3; x < x1 - 2; x += 6) { const lit = H(x, y, 17) < 0.25; p(x, y, lit ? hex('#e8b870') : hz('#4a4a5a')); p(x, y + 1, lit ? hex('#d09a58') : hz('#3a3a4a')); p(x + 1, y + 1, hz('#3a3a4a')); p(x + 1, y, hz('#5a5a6a')); } }
    for (let y = 150; y <= 158; y++) for (let x = 86; x <= 126; x++) p(x, y, (x + y * 3) % 7 === 0 ? hz('#7a7468', 0.3) : hz('#9a9488', 0.3));
    }
  // la casa de entramado de la izquierda: tejado a dos aguas, el piso volado y la tienda con su escaparate abombado
  { for (let y = 26; y <= 52; y++) { const w = Math.round((y - 26) * 1.7); for (let x = 43 - w; x <= 43 + w; x++) if (x >= -2 && x <= 88) p(x, y, (y % 3 === 0) ? hex('#3a2620') : ((x + (y >> 1) * 3) % 6 === 0 ? hex('#4a3026') : hex('#6a4232'))); }
    for (let y = 26; y <= 52; y++) { const w = Math.round((y - 26) * 1.7); p(43 - w, y, K); p(43 + w, y, K); }
    r(20, 18, 28, 34, hex('#7a4a3a')); r(19, 16, 29, 18, hex('#5a3428')); for (let y = 20; y < 34; y += 3) r(20, y, 28, y, hex('#5a3428'));
    r(0, 53, 88, 100, hex('#e8e0cc')); for (let x = 0; x <= 88; x++) for (let y = 53; y <= 100; y++) if (H(x, y, 5) < 0.08) p(x, y, hex('#d8d0bc'));
    for (const x of [0, 14, 30, 58, 74, 88]) r(x, 53, x + 2, 100, hex('#4a3020'));
    r(0, 53, 88, 55, hex('#3a2418')); r(0, 76, 88, 77, hex('#4a3020'));
    for (let i = 0; i < 14; i++) { p(16 + i, 77 + i, hex('#4a3020')); p(17 + i, 77 + i, hex('#4a3020')); p(72 - i, 77 + i, hex('#4a3020')); p(73 - i, 77 + i, hex('#4a3020')); }
    for (const [x0, x1] of [[34, 54]]) { r(x0 - 1, 58, x1 + 1, 74, K); for (let y = 59; y <= 73; y++) for (let x = x0; x <= x1; x++) p(x, y, ((x - x0) + (y - 59)) % 5 === 0 || ((x - x0) - (y - 59) + 50) % 5 === 0 ? hex('#5a4a3a') : y < 64 ? hex('#f0c070') : hex('#e09a50')); }
    r(0, 100, 88, 103, hex('#3a2418')); r(0, 104, 88, 106, hex('#2a1a14'));
    r(0, 106, 88, 158, hex('#6a4a34')); for (let y = 106; y <= 158; y += 4) r(0, y, 88, y, hex('#5a3a28'));
    // el escaparate abombado de cristales de culo de botella con hogazas
    r(6, 112, 52, 146, K); for (let y = 113; y <= 145; y++) for (let x = 7; x <= 51; x++) { const cx = 7 + Math.floor((x - 7) / 5) * 5 + 2, cy = 113 + Math.floor((y - 113) / 5) * 5 + 2; const d = Math.hypot(x - cx, y - cy); p(x, y, (x - 7) % 5 === 4 || (y - 113) % 5 === 4 ? hex('#3a2a20') : d < 1.2 ? hex('#fff0c0') : y > 132 ? hex('#d89850') : hex('#e8b870')); }
    for (const [x, y] of [[14, 140], [26, 141], [38, 140]]) { r(x - 4, y - 3, x + 4, y, hex('#a0602a')); r(x - 3, y - 4, x + 3, y - 4, hex('#c8843a')); p(x - 1, y - 3, hex('#e8b060')); p(x + 2, y - 2, hex('#7a4420')); }
    r(4, 146, 54, 150, hex('#4a3020')); r(4, 146, 54, 146, hex('#7a5a3a'));
    r(60, 114, 78, 156, K); r(61, 115, 77, 156, hex('#2a4a3a')); for (const y of [118, 132, 146]) r(63, y, 75, y + 8, hex('#33584a')); p(74, 136, hex('#e8c050'));
    r(58, 156, 80, 158, hex('#8a8478')); }
  // la taberna: tres pisos de ladrillo con ventanas de guillotina, cornisa y chimeneas
  { for (let y = 38; y <= 158; y++) for (let x = 126; x <= 262; x++) { const fila = Math.floor((y - 38) / 3), off = fila % 2 ? 3 : 0, junta = (y - 38) % 3 === 2 || (x + off) % 7 === 0;
      p(x, y, junta ? hex('#c0a088') : H(Math.floor((x + off) / 7), fila, 9) < 0.25 ? hex('#8a3e2c') : H(Math.floor((x + off) / 7), fila, 10) < 0.2 ? hex('#a85a40') : hex('#9a4a34')); }
    r(126, 34, 262, 38, hex('#d8ccb0')); r(124, 33, 264, 33, hex('#e8e0c8')); r(124, 39, 264, 40, hex('#8a7a62'));
    for (const cx of [146, 240]) { r(cx - 6, 20, cx + 6, 33, hex('#8a3e2c')); for (let y = 20; y < 33; y += 3) r(cx - 6, y, cx + 6, y, hex('#c0a088')); r(cx - 7, 18, cx + 7, 20, hex('#d8ccb0')); for (const dx of [-3, 3]) { r(cx + dx - 1, 14, cx + dx + 1, 18, hex('#b86a3a')); p(cx + dx - 1, 14, hex('#d88a5a')); } }
    r(126, 106, 262, 109, hex('#d8ccb0')); r(126, 110, 262, 110, hex('#7a5a4a'));
    const ventana = (x0, y0, w, hh, lit) => { r(x0 - 3, y0 - 3, x0 + w + 3, y0 - 1, hex('#e0d4b8')); r(x0 - 1, y0 + hh + 1, x0 + w + 1, y0 + hh + 2, hex('#e0d4b8'));
      r(x0, y0, x0 + w, y0 + hh, hex('#f2eee2')); for (let y = y0 + 1; y < y0 + hh; y++) for (let x = x0 + 1; x < x0 + w; x++) { const fx = (x - x0) % Math.round(w / 3) === 0, fy = (y - y0) % Math.round(hh / 4) === 0; p(x, y, fx || fy ? hex('#f2eee2') : lit ? (y < y0 + hh * 0.4 ? hex('#f8d890') : hex('#e8a858')) : (x + y) % 9 < 2 ? hex('#8ab0d0') : hex('#3a4a6a')); } };
    for (const x of [138, 180, 222]) { ventana(x, 46, 22, 26, false); ventana(x, 78, 22, 24, x !== 180); }
    // la planta baja: dos ventanales con cristales pequeños y la puerta con su montante de abanico
    for (const [x0, x1] of [[132, 170], [208, 256]]) { r(x0 - 2, 116, x1 + 2, 150, hex('#3a2418')); for (let y = 117; y <= 149; y++) for (let x = x0; x <= x1; x++) p(x, y, (x - x0) % 6 === 5 || (y - 117) % 6 === 5 ? hex('#4a3020') : y < 128 ? hex('#f8d890') : hex('#e8a050')); r(x0 - 3, 150, x1 + 3, 152, hex('#d8ccb0')); }
    r(174, 112, 200, 156, hex('#d8ccb0')); r(176, 120, 198, 156, hex('#2a1a12'));
    for (let s = 0; s < 40; s++) { const an = Math.PI + s / 39 * Math.PI; for (const rr of [10, 11]) p(187 + Math.round(Math.cos(an) * rr), 120 + Math.round(Math.sin(an) * rr * 0.7), hex('#b8ac90')); }
    for (let j = 0; j < 7; j++) for (let i = -9; i <= 9; i++) if (i * i / 81 + (j * j) / 49 < 1) p(187 + i, 119 - j, (i % 3 === 0 || j === 0) ? hex('#4a3a2a') : hex('#f0c070'));
    r(172, 156, 202, 157, hex('#a8a090')); r(170, 158, 204, 159, hex('#8a8478'));
    // el farol de la pared, a la izquierda de la puerta
    r(166, 118, 166, 124, K); r(163, 124, 169, 132, K); r(164, 125, 168, 131, hex('#f8d070')); p(166, 127, hex('#fff6c0')); r(162, 123, 170, 123, hex('#3a3a3a')); }
  // la casa de la derecha: entramado, ventana con macetas
  { r(262, 50, 320, 158, hex('#e2d8c0')); for (let x = 262; x <= 320; x++) for (let y = 50; y <= 158; y++) if (H(x, y, 7) < 0.07) p(x, y, hex('#cfc4aa'));
    for (let y = 46; y <= 52; y++) r(260, y, 320, y, y % 2 ? hex('#4a3026') : hex('#6a4232'));
    for (const x of [262, 288, 318]) r(x, 52, x + 1, 158, hex('#4a3020')); r(262, 100, 320, 102, hex('#3a2418'));
    r(292, 62, 314, 90, K); for (let y = 63; y <= 89; y++) for (let x = 293; x <= 313; x++) p(x, y, ((x - 293) + (y - 63)) % 5 === 0 || ((x - 293) - (y - 63) + 50) % 5 === 0 ? hex('#5a4a3a') : hex('#e8b060'));
    r(290, 90, 316, 94, hex('#6a4a2a')); for (let i = 0; i < 9; i++) { const x = 292 + i * 3; p(x, 89, hex('#3a8a3a')); p(x + 1, 88, hex('#c8303a')); p(x, 87, hex('#4aa04a')); }
    r(270, 112, 284, 156, K); r(271, 113, 283, 156, hex('#5a3a2a')); p(281, 134, hex('#e8c050')); }
  // la acera de losas y la calle empedrada con su reguero
  r(0, 159, 319, 163, hex('#a8a296')); for (let x = 0; x < 320; x += 18) r(x, 159, x, 163, hex('#8a8478')); r(0, 159, 319, 159, hex('#c8c2b6')); r(0, 164, 319, 164, hex('#6a645a'));
  for (let y = 165; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 165) / 3), off = fila % 2 ? 2 : 0, cx = Math.floor((x + off) / 4); const borde = (y - 165) % 3 === 2 || (x + off) % 4 === 3;
    p(x, y, borde ? hex('#4a463e') : H(cx, fila, 13) < 0.3 ? hex('#7a7468') : H(cx, fila, 14) < 0.2 ? hex('#9a9488') : hex('#8a8478')); }
  for (let x = 0; x < 320; x++) p(x, 172, x % 4 ? hex('#5a564e') : hex('#3a3830'));
  for (const x of [112, 268]) { r(x - 2, 150, x + 2, 162, hex('#2a2a2a')); r(x - 3, 149, x + 3, 150, hex('#3a3a3a')); p(x - 1, 152, hex('#5a5a5a')); }
  // el charco que refleja la luz de la taberna
  for (let y = 168; y <= 176; y++) for (let x = 60; x <= 100; x++) if (((x - 80) / 20) ** 2 + ((y - 172) / 4) ** 2 < 1) p(x, y, y < 171 ? hex('#5a6a80') : hex('#7a7a7a'));
};
// el letrero colgante del ganso y la parrilla (sin letras), que se mece
const letrero = (t, fuerza) => {
  const ang = Math.sin(t * 2.2) * 0.06 + Math.sin(t * 5.3) * 0.02 * fuerza + fuerza * Math.sin(t * 3) * 0.08;
  R.linea(252, 84, 286, 84, K); R.linea(252, 85, 286, 85, hex('#3a3a3a')); R.linea(256, 86, 266, 92, K); for (let i = 0; i < 6; i++) R.pset(258 + i * 2, 82 - (i % 2), K);
  const x0 = 270, y0 = 86, W = 26, HH = 24, sk = (y) => Math.round(Math.sin(ang) * (y - y0));
  R.linea(x0 + 2, 85, x0 + 2 + sk(y0 + 3), y0 + 3, K); R.linea(x0 + W - 2, 85, x0 + W - 2 + sk(y0 + 3), y0 + 3, K);
  for (let y = y0 + 3; y <= y0 + HH; y++) { const d = sk(y); for (let x = x0; x <= x0 + W; x++) { const e = x === x0 || x === x0 + W || y === y0 + 3 || y === y0 + HH, e2 = x === x0 + 1 || x === x0 + W - 1 || y === y0 + 4 || y === y0 + HH - 1;
    R.pset(x + d, y, e ? K : e2 ? hex('#c8a040') : hex('#2a4a3a')); } }
  const P = (i, j, cc) => { const y = y0 + j; R.pset(x0 + i + sk(y), y, hex(cc)); };
  // el ganso
  for (const [i, j] of [[8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 10], [15, 10], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11], [14, 11], [15, 9], [16, 8], [16, 7], [17, 6], [17, 5], [18, 5]]) P(i, j, '#f6f2e6');
  P(19, 5, '#f08a20'); P(20, 6, '#f08a20'); P(18, 5, '#1a1a1a'); P(10, 12, '#f08a20'); P(13, 12, '#f08a20'); P(9, 9, '#c8c4b8'); P(10, 10, '#d8d4c8');
  // la parrilla debajo
  for (let i = 6; i <= 18; i += 3) for (let j = 15; j <= 20; j++) P(i, j, '#1a1a1a');
  for (let i = 6; i <= 18; i++) { P(i, 15, '#1a1a1a'); P(i, 20, '#1a1a1a'); } for (let i = 19; i <= 22; i++) P(i, 17, '#1a1a1a');
};
const DOOR = a(0.28), TAV = a(0.45), M1717 = a(0.17);
const p1 = (t) => {
  if (!hechoL) { const prev = R.usar(BL); pintaLondres(); R.usar(prev); hechoL = true; }
  R.copiar(BL);
  nubes(ML, t, [[20, 30, 34, 1.2], [160, 28, 40, 0.8], [250, 38, 26, 1.8], [90, 44, 20, 2.4]], ['#a8a8b8', '#e8e8ee', '#ffffff']);
  for (const [x, k] of [[143, 0], [149, 1], [237, 2], [243, 3]]) humo(x, 12, t, k, '#9a96a0');
  // las palomas de la cornisa: picotean y una sale volando
  for (let k = 0; k < 3; k++) { const x = 190 + k * 9, pk = Math.sin(t * 4 + k * 2) > 0.6 ? 1 : 0; if (k === 2 && t > 3.6) { const u = t - 3.6, px = Math.round(x + u * 30), py = Math.round(31 - u * 18 + Math.sin(u * 6) * 2); if (py > 16) { R.pset(px, py, hex('#7a7a88')); R.pset(px - 1, py - (Math.sin(t * 20) > 0 ? 1 : -1), hex('#5a5a68')); R.pset(px + 1, py - (Math.sin(t * 20) > 0 ? 1 : -1), hex('#5a5a68')); } continue; }
    R.rect(x, 30, x + 3, 32, hex('#7a7a88')); R.pset(x + 4, 30 + pk, hex('#5a5a68')); R.pset(x + 4, 29 + pk, hex('#8a8a98')); R.pset(x + 1, 32, hex('#5a5a68')); R.pset(x + 2, 31, hex('#a0a0b0')); }
  // las ventanas encendidas: siluetas que pasan detrás
  { R.recorte([209, 117, 255, 149]); const x = Math.round(220 + Math.sin(t * 0.7) * 18); R.rect(x, 126, x + 5, 149, hex('#8a5a30')); R.disco(x + 2, 123, 3, hex('#8a5a30')); R.recorte(null);
    R.recorte([133, 117, 169, 149]); const x2 = Math.round(150 - Math.sin(t * 0.5 + 1) * 12); R.rect(x2, 128, x2 + 5, 149, hex('#8a5a30')); R.disco(x2 + 2, 125, 3, hex('#8a5a30')); R.recorte(null); }
  // el farol de la pared parpadea
  { const f = Math.sin(t * 11) > 0.3; R.pset(166, 126, f ? hex('#ffffff') : hex('#fff0b0')); R.halo(166, 128, 9, [hex('#d8a060'), hex('#e8b070')], 0.6); }
  // la puerta de la taberna se abre en «by tradition»: la hoja gira y sale la luz caliente al escalón
  { const ab = tramo(t, DOOR, DOOR + 0.6), w = Math.round(22 * (1 - ab));
    if (ab > 0) { R.rect(177, 121, 197, 155, hex('#f0b860')); R.rect(180, 124, 194, 155, hex('#f8d890')); for (let k = 0; k < 4; k++) { const yy = 156 + k; R.rect(176 - k * 3, yy, 198 + k * 3, yy, mz(hex('#a8a090'), hex('#f0c070'), 0.5 - k * 0.1)); } }
    if (w > 1) { R.rect(176, 121, 176 + w, 155, hex('#2a1a12')); R.rect(177, 122, 175 + w, 154, hex('#3a5a3a')); for (const y of [124, 138]) R.rect(178, y, Math.max(178, 173 + w), y + 11, hex('#446a46')); R.pset(173 + w, 139, hex('#e8c050')); } }
  // el perro que cruza la calle
  { const u = tramo(t, 1.6, 5.2); if (u > 0 && u < 1) { const x = Math.round(lerp(-12, 330, u)), y = 176, pa = Math.floor(t * 10) % 2;
    R.rect(x, y - 6, x + 9, y - 3, hex('#8a5a2a')); R.rect(x + 8, y - 9, x + 12, y - 5, hex('#8a5a2a')); R.pset(x + 13, y - 7, K); R.pset(x + 11, y - 8, K); R.pset(x + 9, y - 10, hex('#5a3a1a'));
    R.rect(x, y - 6, x + 9, y - 6, hex('#a87a4a')); R.pset(x - 1, y - 7 - pa, hex('#8a5a2a')); R.pset(x - 2, y - 8 - pa, hex('#8a5a2a'));
    for (const [i, s] of [[1, pa], [3, 1 - pa], [7, pa], [9, 1 - pa]]) { R.pset(x + i + s, y - 2, hex('#6a4220')); R.pset(x + i, y - 1, hex('#6a4220')); R.pset(x + i, y, K); } } }
  // los caballeros: dos se saludan en la puerta, entran en «London tavern»; otros dos llegan
  const S = 160;
  const g = (def, pal, xa, xb, t0, t1, dentro, dir, o2 = {}) => {
    if (t > dentro + 0.35) return; const u = tramo(t, t0, t1), x = Math.round(lerp(xa, xb, u)), anda = u > 0 && u < 1;
    const entra = tramo(t, dentro - 0.4, dentro); const xx = Math.round(lerp(x, 180, entra)), yy = Math.round(S - entra * 3);
    if (t > dentro) R.recorte([176, 100, 198, 158]);
    R.actor(def, xx, yy, t, { dir: entra > 0 ? (xx < 180 ? 1 : -1) : dir, anda: anda || (entra > 0 && entra < 1), pal: PL(pal), ...o2 });
    R.recorte(null);
  };
  const salu = t > M1717 && t < DOOR + 0.3;
  g(EL.mason2, LOGIAS[0], -18, 150, 1.4, M1717, TAV, 1, { sonrisa: salu, habla: salu && Math.sin(t * 9) > 0, dedo: t > DOOR && t < DOOR + 0.6 });
  g(EL.mason, LOGIAS[1], 336, 208, 1.6, M1717 + 0.1, TAV + 0.6, -1, { sonrisa: salu, habla: t > M1717 + 0.5 && t < DOOR && Math.sin(t * 8 + 1) > 0 });
  g(EL.mason, { ...LOGIAS[2], C: '#2a5a3a', c: '#1e4a2e' }, -18, 150, TAV - 0.4, P2 + 0.3, 99, 1, { sorpresa: t > TAV + 0.4 });
  g(EL.mason2, { ...LOGIAS[3], C: '#6a3a5a', c: '#4a2a40' }, 336, 214, TAV - 0.1, P2 + 0.3, 99, -1, { sonrisa: true });
  letrero(t, t > TAV - 0.3 && t < TAV + 1.5 ? 1 : 0.2);
};

// 2 · la taberna: cuatro logias que se juntan; en «grand lodge» brindan
const TOG = a(0.74), GRAND = a(0.88);
const p2 = (t) => {
  const d = T.logia(R, t, { encuadre: 'taberna' });
  const S = d.detras, xs = [110, 136, 166, 192];
  xs.forEach((x, k) => {
    const izq = k < 2, junta = tramo(t, TOG - 0.2, TOG + 0.3), alza = tramo(t, TOG, GRAND - 0.1), choca = tramo(t, GRAND - 0.15, GRAND + 0.05) - tramo(t, GRAND + 0.15, GRAND + 0.5);
    // antes de juntarse: cada pareja habla mirándose (de espaldas a la otra pareja)
    const dir = junta < 0.5 ? (k % 2 === 0 ? -1 : 1) * (izq ? -1 : 1) * -1 : izq ? 1 : -1;
    const hx = dir > 0 ? x + 15 : x, hy = S - 14 - Math.round(alza * 8);
    const m = R.actor(k % 2 ? EL.mason2 : EL.mason, x, S, t, { dir, pal: PL(LOGIAS[k]), sostiene: [hx + dir * Math.round(2 + choca * 4), hy], habla: t < TOG && Math.sin(t * 7 + k * 2) > 0.2 && (k === 0 || k === 3), sonrisa: t > GRAND + 0.2 || (t < TOG && (k === 1 || k === 2)) }).mano;
    jarra(m[0], m[1]);
  });
  brindis(130, S - 30, t, GRAND); brindis(180, S - 30, t, GRAND + 0.08);
  T.logiaDelante(R, t, { encuadre: 'taberna' });
  // un mozo con la bandeja de jarras pasa por delante de la mesa
  { const u = tramo(t, P2 + 0.3, P2 + 3.6); if (u > 0 && u < 1) { const x = Math.round(lerp(330, 238, Math.min(1, u * 1.6))), m = R.actor(EL.escribano, x, d.suelo, t, { dir: -1, anda: u < 0.62, sostiene: [x - 3, d.suelo - 16], pal: PL({ C: '#6a5a4a', c: '#4a3e32' }) }).mano;
    R.rect(m[0] - 7, m[1] - 1, m[0] + 3, m[1], hex('#5a3a1a')); jarra(m[0] - 4, m[1] - 1); jarra(m[0] + 1, m[1] - 1, false); } }
};

// 3 · el banco del cantero: talla su marca con maza y cincel
const CANT = { ...EL.mason, tocado: 'boina' }, CANTP = { H: '#6a4020', h: '#8a5a30', C: '#8a6a4a', c: '#6a5038', W: '#b88a5a', A: '#7a5030', o: '#5a3a1a' };
const STONE = b(0.21), MASONS = b(0.24);
const p3 = (t) => {
  const talla = tramo(t, P3 + 0.3, MASONS + 0.1);
  const d = T.logia(R, t, { encuadre: 'catedral', camara: 'cerca', talla, golpes: t < MASONS + 0.2 });
  const S = d.suelo, x = 104, golpe = t < MASONS + 0.1 ? Math.max(0, Math.sin(t * 7.5)) : 0;
  // el cantero: el cincel apoyado en el sillar y la maza que golpea (con la mano de delante)
  const m = R.actor(CANT, x, S, t, { dir: 1, pal: PL(CANTP), sostiene: [x + 22, S - 22 + Math.round(golpe * 4)], sonrisa: t > MASONS + 0.3, enfado: t < MASONS && golpe > 0.8 }).mano;
  // el cincel de hierro contra el sillar
  R.linea(m[0] + 2, m[1] + 3, d.sillar[0] + 2, S - 26, hex('#5a5a62')); R.linea(m[0] + 2, m[1] + 4, d.sillar[0] + 2, S - 25, hex('#9a9aa6'));
  // la maza de madera
  { const hx = m[0] - 1, hy = m[1] - 2 - Math.round((1 - golpe) * 5); R.linea(m[0], m[1], hx - 2, hy - 2, hex('#6a4a2a')); R.rect(hx - 6, hy - 6, hx, hy - 1, K); R.rect(hx - 5, hy - 5, hx - 1, hy - 2, hex('#a07040')); R.pset(hx - 5, hy - 5, hex('#c8985a')); }
  if (golpe > 0.95) for (const [i, j] of [[4, -3], [6, 0], [4, 3]]) R.pset(d.sillar[0] + i, S - 26 + j, hex('#fff6c0'));
  // un aprendiz trae otro sillar en una parihuela al fondo
  { const u = tramo(t, P3 + 0.4, P4 - 0.3); if (u > 0 && u < 1) { const xa = Math.round(lerp(330, 236, u)); R.actor(EL.mason, xa, S - 4, t, { dir: -1, anda: true, pal: PL({ ...CANTP, H: '#a8743c' }), sostiene: [xa - 6, S - 18] }); R.rect(xa - 14, S - 23, xa - 2, S - 16, K); R.rect(xa - 13, S - 22, xa - 3, S - 17, hex('#c8bca0')); R.rect(xa - 13, S - 22, xa - 3, S - 22, hex('#e0d8c4')); } }
};

// 4 · la catedral en obras: el maestro cantero da la escuadra a un caballero
const NOW = b(0.44), FRAT = b(0.5);
const escuadra = (x, y, s = 1) => { x = Math.round(x); y = Math.round(y);
  R.rect(x - 1, y - 9 * s, x + 1, y + 1, K); R.rect(x - 1, y - 1, x + 9 * s, y + 1, K); R.linea(x, y - 8 * s, x, y, hex('#e8c050')); R.linea(x, y, x + 8 * s, y, hex('#e8c050')); R.pset(x, y - 8 * s, hex('#fff6c0')); R.pset(x + 3, y, hex('#c89830')); };
const p4 = (t) => {
  const d = T.logia(R, t, { encuadre: 'catedral' });
  const S = d.suelo, da = t > NOW;
  // el caballero llega por la izquierda; el maestro cantero le da la escuadra en «now» y él la alza en «fraternal»
  const ug = tramo(t, P4 + 0.2, NOW - 0.2), xg = Math.round(lerp(-18, 70, ug));
  const alza = tramo(t, FRAT - 0.2, FRAT + 0.3);
  const mg = R.actor(EL.mason2, xg, S, t, { dir: 1, anda: ug > 0 && ug < 1, pal: PL(LOGIAS[0]), sostiene: da ? [xg + 15, S - 14 - Math.round(alza * 6)] : false, sonrisa: t > FRAT, sorpresa: da && t < FRAT }).mano;
  const xm = 96;
  const mm = R.actor(CANT, xm, S, t, { dir: -1, pal: PL(CANTP), sostiene: !da ? [xm - 1, S - 15 - Math.round(Math.max(0, Math.sin((t - P4) * 3)) * 2)] : false, dedo: da && t < FRAT + 0.6, sonrisa: da, habla: t > NOW - 0.8 && t < NOW && Math.sin(t * 9) > 0 }).mano;
  if (!da) escuadra(mm[0] - 1, mm[1]); else escuadra(mg[0], mg[1]);
  if (t > FRAT && t < FRAT + 0.6) { const w = (t - FRAT) / 0.6; for (let q = 0; q < 8; q++) { const an = q / 8 * Math.PI * 2; R.pset(Math.round(mg[0] + 3 + Math.cos(an) * (3 + w * 6)), Math.round(mg[1] - 4 + Math.sin(an) * (3 + w * 6)), hex('#fff6c0')); } }
  // otro cantero empuja una carretilla con piedra por la derecha
  { const u = (t - P4) / (P5 - P4), x = Math.round(lerp(150, 214, u)); R.actor(CANT, x, S, t, { dir: 1, anda: true, pal: PL({ ...CANTP, H: '#3a2418' }), sostiene: [x + 18, S - 8] });
    R.rect(x + 18, S - 9, x + 32, S - 4, K); R.rect(x + 19, S - 8, x + 31, S - 5, hex('#8a5a2a')); R.rect(x + 21, S - 11, x + 29, S - 9, hex('#c8bca0')); R.disco(x + 30, S - 2, 2, K); R.pset(x + 30, S - 2, hex('#6a4a2a')); }
};

// 5 · la mesa de la taberna de cerca: cenan, hablan y echan monedas en el cepillo
const DINE = b(0.72), TALK = b(0.81), CHAR = b(0.92);
const p5 = (t) => {
  const d = T.logia(R, t, { encuadre: 'taberna', camara: 'mesa' });
  const S = d.suelo;
  // 1: se lleva el pan a la boca en «dine»
  { const x = 46, come = tramo(t, DINE - 0.3, DINE + 0.1) - tramo(t, DINE + 0.6, DINE + 0.9), m = R.actor(EL.mason2, x, S, t, { dir: 1, pal: PL(LOGIAS[0]), sostiene: [x + 17 - Math.round(come * 5), S - 8 - Math.round(come * 10)], habla: t > DINE + 0.1 && t < DINE + 0.6 && Math.sin(t * 14) > 0, sonrisa: t > DINE + 0.9 }).mano;
    R.rect(m[0] - 2, m[1] - 2, m[0] + 3, m[1] + 1, hex('#8a5a2a')); R.rect(m[0] - 1, m[1] - 3, m[0] + 2, m[1] - 2, hex('#c88a3a')); R.pset(m[0], m[1] - 1, hex('#e8c890')); }
  // 2 y 3: hablan; el de la derecha explica con el dedo en «talk»
  R.actor(EL.mason, 92, S, t, { dir: 1, pal: PL(LOGIAS[1]), sonrisa: t > TALK + 0.4, habla: t < TALK - 0.2 && t > P5 + 0.4 && Math.sin(t * 8) > 0.3 });
  R.actor(EL.mason, 198, S, t, { dir: -1, pal: PL({ ...LOGIAS[2], C: '#2a5a3a', c: '#1e4a2e' }), dedo: t > TALK - 0.1 && t < CHAR - 0.3, habla: t > TALK - 0.1 && t < CHAR - 0.3 && Math.sin(t * 9) > 0 });
  // 4: echa las monedas en el cepillo en «charity»
  const x4 = 248, echa = tramo(t, CHAR - 0.6, CHAR - 0.2);
  const m4 = R.actor(EL.mason2, x4, S, t, { dir: -1, pal: PL({ ...LOGIAS[3], C: '#6a3a5a', c: '#4a2a40' }), sostiene: [x4 - 2 + Math.round(echa * 6), S - 10 - Math.round(echa * 4)], sonrisa: t > CHAR }).mano;
  T.logiaDelante(R, t, { encuadre: 'taberna', camara: 'mesa' });
  // el cepillo de madera con su ranura, sobre la mesa (delante del cuarto caballero)
  { const x0 = 224, y0 = 125; R.rect(x0 + 1, y0 + 14, x0 + 23, y0 + 16, hex('#3a2418')); R.rect(x0 - 1, y0 - 1, x0 + 21, y0 + 15, K); R.rect(x0, y0, x0 + 20, y0 + 14, hex('#7a4a24')); R.rect(x0, y0, x0 + 20, y0 + 3, hex('#a0683a')); R.rect(x0 + 6, y0 + 1, x0 + 14, y0 + 2, K);
    for (let x = x0 + 1; x < x0 + 20; x += 4) R.linea(x, y0 + 4, x, y0 + 13, hex('#6a3e1e')); R.rect(x0, y0 + 8, x0 + 20, y0 + 8, hex('#c8a040')); R.disco(x0 + 10, y0 + 9, 2, hex('#e8c050')); R.pset(x0 + 10, y0 + 9, K); }
  // la bolsa en la mano y las monedas que caen en la ranura
  R.disco(m4[0], m4[1], 3, K); R.disco(m4[0], m4[1], 2.2, hex('#6a3a2a')); R.pset(m4[0] - 1, m4[1] - 1, hex('#8a5a3a')); R.pset(m4[0], m4[1] - 3, hex('#c8a040'));
  for (let k = 0; k < 3; k++) { const u = tramo(t, CHAR - 0.15 + k * 0.18, CHAR + 0.15 + k * 0.18); if (u > 0 && u < 1) { const x = Math.round(lerp(m4[0], 234, u)), y = Math.round(lerp(m4[1] + 2, 126, u * u)); R.disco(x, y, 1.6, hex('#8a6a1a')); R.pset(x, y, hex('#f8d870')); }
    if (u >= 1 && u < 1.01 || (t > CHAR + 0.15 + k * 0.18 && t < CHAR + 0.4 + k * 0.18)) { R.pset(234, 122, hex('#fff6c0')); R.pset(237, 121, hex('#fff6c0')); R.pset(231, 121, hex('#fff6c0')); R.pset(234, 119, hex('#fff6c0')); } }
};

// 6 · París en 1736 (fondo local): el Sena al atardecer, Notre-Dame a contraluz; llega Ramsay en carruaje
const BP = R.nuevo(), MP = new Uint8Array(320 * 180); let hechoP = false;
const pintaParis = () => {
  const { p, r } = pintor(MP);
  cieloBandas(MP, 96, ['#2e3466', '#4a4a80', '#7a5a8a', '#b86a7e', '#e08a70', '#f0b070', '#f8d898']);
  // el sol bajo detrás de la isla
  for (let j = -12; j <= 12; j++) for (let i = -12; i <= 12; i++) { const d = Math.hypot(i, j); if (d <= 11) p(196 + i, 86 + j, d < 8 ? hex('#fff2c0') : hex('#f8d890')); else if (d <= 12 && R.b4(196 + i, 86 + j) < 0.5) p(196 + i, 86 + j, hex('#f8d890')); }
  // Notre-Dame: dos torres cuadradas, el rosetón encendido, la nave con arbotantes y la aguja
  const NS = hex('#3a3252'), NL = hex('#5a4a6a'), NR = hex('#c87a6a');
  r(28, 42, 48, 96, NS); r(66, 42, 86, 96, NS); r(48, 52, 66, 96, NS); r(26, 40, 50, 42, NL); r(64, 40, 88, 42, NL);
  for (const x0 of [28, 66]) { for (let x = x0; x <= x0 + 20; x += 4) p(x, 39, NL); for (const wx of [x0 + 5, x0 + 13]) { r(wx, 48, wx + 2, 64, hex('#2a2440')); p(wx + 1, 47, hex('#2a2440')); } r(x0 + 20, 42, x0 + 20, 96, NR); }
  for (let s = 0; s < 60; s++) { const an = s / 60 * Math.PI * 2; for (let rr = 0; rr <= 6; rr++) p(57 + Math.round(Math.cos(an) * rr), 66 + Math.round(Math.sin(an) * rr), rr === 6 ? NL : (s + rr) % 7 < 2 ? hex('#c84a3a') : hex('#f0a050')); }
  r(48, 54, 66, 56, NL); for (let x = 49; x <= 65; x += 3) r(x, 57, x + 1, 60, hex('#2a2440'));
  for (const x of [32, 52, 70]) { for (let j = 0; j < 12; j++) { const w = Math.round(Math.sqrt(Math.max(0, 1 - (j / 12) ** 2)) * 5); r(x + 4 - w, 96 - j, x + 4 + w, 96 - j, hex('#241e36')); } }
  for (let x = 86; x <= 156; x++) { const top = 60 + Math.round((x - 86) * 0.02); r(x, top, x, 96, x % 9 === 0 ? NL : NS); }
  for (let x = 88; x <= 156; x += 12) { for (let i = 0; i < 10; i++) { p(x + i, 70 + i, NL); p(x + i, 71 + i, NS); } r(x + 10, 80, x + 12, 96, NS); }
  for (let y = 26; y <= 60; y++) { const w = Math.max(0, Math.round((y - 26) / 14)); r(130 - w, y, 130 + w, y, NS); } p(130, 24, NL); p(130, 25, NL); p(129, 25, NL); p(131, 25, NL);
  r(86, 58, 156, 60, NR);
  // las casas de la isla con ventanas encendidas
  for (let k = 0; k < 7; k++) { const x0 = 156 + k * 10 + (k > 3 ? 14 : 0), top = 76 + Math.round(H(k, 1, 21) * 8); if (x0 > 214) break; r(x0, top, x0 + 9, 96, k % 2 ? hex('#4a3a5a') : hex('#3e3250')); r(x0 - 1, top - 2, x0 + 10, top, hex('#2a2440'));
    for (const wx of [x0 + 2, x0 + 6]) if (H(wx, top, 22) < 0.7) { p(wx, top + 5, hex('#f8c060')); p(wx, top + 6, hex('#e89040')); } }
  // el Sena: reflejos del cielo en franjas tramadas
  for (let y = 97; y <= 126; y++) for (let x = 0; x < 320; x++) { const f = (y - 97) / 29, base = f < 0.3 ? '#e09a70' : f < 0.6 ? '#9a6a86' : '#4a4a78', alt = f < 0.3 ? '#f0b878' : f < 0.6 ? '#b8789a' : '#3a3a66';
    p(x, y, (H(Math.floor(x / 6), y, 31) < 0.3 && (x + y) % 2) ? hex(alt) : hex(base)); }
  // el muelle de piedra con su pretil y la calle empedrada
  r(0, 124, 214, 127, hex('#d8c4a0')); r(0, 128, 214, 138, hex('#9a8670')); for (let y = 128; y <= 138; y += 5) r(0, y, 214, y, hex('#7a6a58')); for (let x = 0; x <= 214; x += 12) r(x + ((Math.floor(x / 12) % 2) * 6), 128, x + ((Math.floor(x / 12) % 2) * 6), 138, hex('#7a6a58'));
  for (let y = 139; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 139) / 3), off = fila % 2 ? 2 : 0, cx = Math.floor((x + off) / 4), borde = (y - 139) % 3 === 2 || (x + off) % 4 === 3, luz = Math.max(0, 1 - Math.hypot(x - 270, (y - 150) * 2) / 90);
    p(x, y, borde ? hex('#4a3e3a') : H(cx, fila, 33) < 0.3 ? mz(hex('#7a6a60'), hex('#e0a060'), luz * 0.5) : mz(hex('#8a7a6c'), hex('#f0b070'), luz * 0.5)); }
  // el palacete de la derecha: piedra clara, mansarda de pizarra con buhardillas, balcones de hierro y la puerta cochera
  r(214, 62, 319, 158, hex('#e0cfae')); for (let x = 214; x <= 319; x++) for (let y = 62; y <= 158; y++) if (H(x, y, 41) < 0.06) p(x, y, hex('#cbb894'));
  for (let y = 108; y <= 158; y += 6) r(214, y, 319, y, hex('#b8a47e'));
  for (let y = 46; y <= 61; y++) { const w = Math.round((61 - y) * 0.4); r(214 + w, y, 319, y, y % 3 ? hex('#4a4e66') : hex('#3a3e56')); }
  r(212, 60, 319, 63, hex('#f0e2c4')); r(212, 64, 319, 64, hex('#9a8668'));
  for (const cx of [230, 262]) { r(cx - 4, 34, cx + 4, 46, hex('#c8b490')); r(cx - 5, 32, cx + 5, 34, hex('#e0cfae')); }
  for (const dx of [240, 300]) { r(dx - 6, 46, dx + 6, 58, hex('#e0cfae')); r(dx - 4, 48, dx + 4, 58, hex('#f0b860')); r(dx - 7, 44, dx + 7, 46, hex('#4a4e66')); r(dx, 48, dx, 58, hex('#c8a060')); }
  for (const wx of [224, 252, 282, 308]) { if (wx > 312) continue; r(wx - 6, 70, wx + 6, 98, hex('#9a8668')); r(wx - 5, 71, wx + 5, 97, hex('#f0b860')); r(wx - 5, 71, wx + 5, 76, hex('#f8d890')); r(wx, 71, wx, 97, hex('#c8a060')); r(wx - 5, 84, wx + 5, 84, hex('#c8a060'));
    r(wx - 8, 98, wx + 8, 99, hex('#3a3a40')); for (let x = wx - 8; x <= wx + 8; x += 2) r(x, 92, x, 98, hex('#2a2a30')); r(wx - 8, 92, wx + 8, 92, hex('#2a2a30')); }
  r(244, 108, 296, 158, hex('#c8b490')); for (let j = 0; j <= 20; j++) { const w = Math.round(Math.sqrt(1 - (j / 21) ** 2) * 20); r(270 - w, 136 - j - 6, 270 + w, 136 - j - 6, hex('#d8c8a4')); }
  for (let y = 116; y <= 158; y++) { const lim = y < 136 ? Math.round(Math.sqrt(Math.max(0, 1 - ((136 - y) / 20) ** 2)) * 18) : 18; r(270 - lim, y, 270 + lim, y, y < 126 ? hex('#f8d890') : hex('#f0b060')); }
  r(262, 140, 278, 158, hex('#e89a50')); for (let y = 128; y <= 158; y += 6) r(254, y, 286, y, hex('#d88a48'));
  // la farola de la izquierda
  r(34, 104, 36, 160, hex('#2a2a30')); r(32, 158, 38, 160, hex('#3a3a40')); r(30, 94, 40, 96, hex('#2a2a30')); r(31, 97, 39, 104, K); r(32, 98, 38, 103, hex('#f8d070')); p(35, 92, hex('#2a2a30'));
  // barriles y cajas en el muelle
  for (const [x, y] of [[4, 124], [14, 124]]) { r(x, y - 12, x + 8, y, K); r(x + 1, y - 11, x + 7, y - 1, hex('#8a5a2a')); r(x + 1, y - 9, x + 7, y - 9, hex('#4a3a2a')); r(x + 1, y - 3, x + 7, y - 3, hex('#4a3a2a')); }
};
const ARRIVE = c(0.19), SCOT = c(0.3), ANDREW = c(0.43);
const p6 = (t) => {
  if (!hechoP) { const prev = R.usar(BP); pintaParis(); R.usar(prev); hechoP = true; }
  R.copiar(BP);
  nubes(MP, t, [[30, 30, 40, 1.0], [170, 36, 30, 1.6], [250, 26, 30, 0.7], [100, 50, 22, 2.2]], ['#8a5a7a', '#d88a84', '#f8c8a0']);
  T.bandada(R, t, { tipo: 'golondrina', n: 5, y: 54, cada: 6 });
  for (const [x, k] of [[228, 0], [264, 1]]) humo(x, 30, t, k, '#8a7a90');
  // los reflejos del sol que tiemblan en el agua y el de la farola
  for (let k = 0; k < 26; k++) { const y = 98 + (k % 13) * 2, x = Math.round(196 + Math.sin(t * 2 + k * 1.7) * (3 + (y - 97) * 0.4)); if (Math.sin(t * 5 + k) > -0.2) { R.pset(x, y, hex('#fff2c0')); R.pset(x + 1, y, hex('#f8d890')); } }
  { const f = Math.sin(t * 11) > 0.3; R.pset(35, 100, f ? hex('#ffffff') : hex('#fff0b0')); R.halo(35, 100, 9, [hex('#d8a060'), hex('#f0c070')], 0.55); }
  // la barcaza que baja por el Sena con su barquero
  { const x = Math.round(((t * 7) % 380) - 50), y = 114; R.rect(x, y, x + 30, y + 3, K); R.rect(x + 1, y + 1, x + 29, y + 2, hex('#5a3a24')); R.rect(x + 2, y - 3, x + 18, y - 1, hex('#8a6a3a')); R.rect(x + 4, y - 5, x + 14, y - 4, hex('#a07a4a'));
    R.rect(x + 23, y - 9, x + 25, y - 1, hex('#2a2430')); R.disco(x + 24, y - 11, 2, hex('#e0a878')); R.linea(x + 21, y - 12, x + 31, y + 6, hex('#3a2a1a'));
    for (let i = 0; i < 6; i++) { const w = (t * 3 + i) % 4; R.pset(x - 2 - i * 3, y + 3 + (i % 2), hex('#f0c890')); if (w < 1) R.pset(x - 3 - i * 3, y + 4, hex('#c8889a')); } }
  // un gato sobre el pretil que mueve la cola
  { const x = 120, y = 123, cola = Math.round(Math.sin(t * 3) * 2); R.rect(x, y - 3, x + 5, y, K); R.rect(x + 4, y - 6, x + 7, y - 3, K); R.pset(x + 4, y - 7, K); R.pset(x + 7, y - 7, K); R.pset(x + 6, y - 5, hex('#f0e040')); R.linea(x, y - 1, x - 3, y - 4 + cola, K); }
  // los dos masones que esperan a la puerta: saludan en «Andrew Ramsay»
  const S = 158, salu = t > ANDREW - 0.2 && t < ANDREW + 1.0;
  R.actor(EL.mason, 232, S, t, { dir: 1, pal: PL(LOGIAS[0]), sonrisa: t > SCOT, dedo: salu, habla: salu && Math.sin(t * 9) > 0 });
  R.actor(EL.mason2, 288, S, t, { dir: -1, pal: PL(LOGIAS[1]), sonrisa: t > SCOT, sorpresa: t > ARRIVE && t < ARRIVE + 0.6 });
  // el carruaje llega desde la derecha y para en «Paris»; Ramsay baja en «Scottish mason» y va a la puerta
  const u = tramo(t, P6 + 0.1, ARRIVE), cu = 1 - (1 - u) * (1 - u), kx = Math.round(lerp(372, 206, cu)), quieto = u >= 1, baja = t > SCOT - 0.1;
  const cc = carruaje(R, kx, 176, t, { parte: 'detras', dir: -1, cochero: EL.escribano, quieto, color: hex('#1e3a2e'), filete: hex('#c8a040') });
  if (!baja) R.actor(EL.ramsay, cc.asiento[0], cc.asiento[1], t, { dir: -1, sonrisa: quieto, habla: false });
  carruaje(R, kx, 176, t, { parte: 'delante', dir: -1, quieto, color: hex('#1e3a2e'), filete: hex('#c8a040') });
  if (baja) { const v = tramo(t, SCOT - 0.1, SCOT + 0.3), w = tramo(t, ANDREW + 0.6, P7 + 0.2), x = Math.round(lerp(lerp(kx + 14, 250, v), 262, w)), y = Math.round(lerp(178, 174, v) - w * 16);
    R.actor(EL.ramsay, x, y, t, { dir: w > 0 ? 1 : 1, anda: (v > 0 && v < 1) || (w > 0 && w < 1), sonrisa: t > ANDREW - 0.2, habla: t > ANDREW && t < ANDREW + 0.6 && Math.sin(t * 9) > 0 }); }
};

// 7 · el atril: Ramsay habla; en «nobler origin» le sale la nube con los cruzados a caballo
const NOBLE = c(0.71), CRUS = c(0.91), SPEECH = c(0.6);
const nubePens = (x0, y0, w, hh, u, cola) => {
  const cx = x0 + w / 2, cy = y0 + hh / 2, B = hex('#f6f2e6'), KK = hex('#2a2430');
  for (let k = 0; k < 3; k++) { const f = (k + 1) / 4, bx = Math.round(lerp(cola[0], x0 + w * 0.62, f)), by = Math.round(lerp(cola[1], y0 + hh, f)), r = 2 + k; if (u > f * 0.6) { R.disco(bx, by, r + 1, KK); R.disco(bx, by, r, B); } }
  if (u < 0.6) return false; const s = Math.min(1, (u - 0.6) / 0.4), ww = w * (0.4 + 0.6 * s) / 2, hw = hh * (0.4 + 0.6 * s) / 2;
  for (const pass of [0, 1]) for (let j = -hw - 2; j <= hw + 2; j++) for (let i = -ww - 2; i <= ww + 2; i++) { const e = (i / ww) ** 4 + (j / hw) ** 4, bump = 0.07 * Math.sin(Math.atan2(j, i) * 11); if (pass === 0 ? e <= 1.16 + bump : e <= 1 + bump) R.pset(Math.round(cx + i), Math.round(cy + j), pass ? B : KK); }
  return s >= 1;
};
const p7 = (t) => {
  const d = T.logia(R, t, { encuadre: 'salon', camara: 'atril' });
  const S = d.suelo;
  R.actor(EL.ramsay, 143, S, t, { dir: 1, habla: Math.sin(t * 8) > -0.1 && t < CRUS + 0.8, dedo: t > NOBLE - 0.2 && t < CRUS + 0.6, sonrisa: t > CRUS + 0.4 });
  T.logiaDelante(R, t, { encuadre: 'salon', camara: 'atril', paginas: tramo(t, SPEECH - 0.2, SPEECH + 0.5) });
  // la nube de pensamiento con los cruzados que cabalgan por ella
  const X0 = 56, Y0 = 20, W = 150, HH = 78;
  const llena = nubePens(X0, Y0, W, HH, tramo(t, NOBLE - 0.3, NOBLE + 0.6), [150, 124]);
  if (llena) {
    R.recorte([X0 + 10, Y0 + 8, X0 + W - 10, Y0 + HH - 7]);
    const yb = Y0 + HH - 14;
    // el campo de Tierra Santa dentro de la nube: cielo caliente, la ciudad amurallada con su cúpula, palmeras, dunas
    for (let y = Y0 + 8; y < yb - 4; y++) R.linea(X0 + 10, y, X0 + W - 10, y, y < Y0 + 26 ? hex('#f8e8c8') : y < Y0 + 44 ? hex('#f8dcb0') : hex('#f0cc98'));
    R.disco(X0 + 118, Y0 + 26, 7, hex('#fff2c0')); R.disco(X0 + 118, Y0 + 26, 5, hex('#ffffff'));
    for (let x = X0 + 84; x <= X0 + 136; x++) { const al = (x - X0) % 10 < 3 ? 9 : 6; R.linea(x, yb - 4 - al, x, yb - 4, (x - X0) % 10 < 3 ? hex('#c89a60') : hex('#d8b07a')); }
    for (let j = 0; j <= 7; j++) { const w = Math.round(Math.sqrt(1 - (j / 8) ** 2) * 7); R.linea(X0 + 108 - w, yb - 14 - j, X0 + 108 + w, yb - 14 - j, j > 5 ? hex('#f8d870') : hex('#e8b840')); }
    for (const px of [X0 + 24, X0 + 74, X0 + 144]) { R.linea(px, yb - 4, px + 1, yb - 18, hex('#7a5a3a')); for (let q = -6; q <= 6; q++) { R.pset(px + q, yb - 18 + Math.round(Math.abs(q) * 0.5 + Math.sin(t * 2 + q) * 0.5), hex('#3a7a3a')); R.pset(px + q, yb - 19 + Math.round(Math.abs(q) * 0.5), hex('#5a9a4a')); } }
    for (let y = yb - 4; y <= Y0 + HH - 7; y++) R.linea(X0 + 10, y, X0 + W - 10, y, y === yb - 4 ? hex('#c8a870') : hex('#e8d0a0'));
    for (let x = X0 + 30; x < X0 + 80; x++) { R.pset(x, yb - 9, hex('#c8b088')); if (x % 6 < 2) R.pset(x, yb - 10, hex('#c8b088')); } R.linea(X0 + 30, yb - 8, X0 + 80, yb - 8, hex('#b89a70'));
    for (let k = 0; k < 3; k++) { const u = tramo(t, NOBLE + 0.5 + k * 0.45, NOBLE + 3.9 + k * 0.45), x = Math.round(lerp(X0 - 30, X0 + W + 4, u)), y = yb + (k === 1 ? 2 : 0);
      if (u <= 0 || u >= 1) continue;
      T.b_caballo(R, x, y, t + k, { dir: 1, anda: true, silla: true, color: ['#8a5a34', '#f2eee2', '#4a3020'][k] });
      R.actor(k === 1 ? EL.templario2 : EL.templario, x + 8, y - 13, t, { dir: 1, quieto: true, sonrisa: true, sostiene: [x + 22, y - 30] });
      // la lanza con su estandarte blanco de la cruz roja que ondea
      const lx = x + 22, ly = y - 30; R.linea(lx, ly + 10, lx, ly - 14, hex('#6a4a2a')); const fl = Math.round(Math.sin(t * 10 + k) * 1);
      for (let j = 0; j <= 6; j++) for (let i = 1; i <= 9; i++) { const w = Math.round(Math.sin(t * 9 + i * 0.7 + k) * (i / 9)), yy = ly - 14 + j + w + fl; R.pset(lx - i, yy, j === 0 ? K : (i >= 4 && i <= 6 && j >= 1 && j <= 5) || (j >= 2 && j <= 3 && i >= 2 && i <= 8) ? hex('#c8303a') : hex('#f2eee2')); } }
    R.recorte(null);
  }
};

const efectos = [[3.2, 'palmada'], [DOOR, 'puerta'], [TAV, 'viento'], [TOG, 'publico'], [GRAND, 'brillo'], [P3 + 0.5, 'golpecito'], [P3 + 1.4, 'golpecito'], [MASONS, 'golpecito'],
  [NOW, 'pop'], [FRAT, 'brillo'], [DINE, 'masca'], [CHAR, 'brillo'], [SCOT, 'puerta'], [SPEECH - 0.1, 'papel'], [NOBLE, 'whoosh']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { cartela: '1717', efectos, año: (t) => (t < P3 ? 1717 : t < NOW ? 1250 : t < P6 ? 1717 : 1736) });
''')
