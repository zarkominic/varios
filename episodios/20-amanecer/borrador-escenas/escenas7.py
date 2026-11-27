E = {}
E['jh-flecha'] = ('La flecha', '''// JH-FLECHA (frases 40–41), Juegos 75 → 50. Tres planos:
// 1. el tren de tarde (ventana de cerca): katniss mira el paisaje; haymitchViejo entra con su petaca, se le acerca y le
//    habla al oído en «tells Katniss»; en «real enemy» sale el globo con la rosa de Snow y ella asiente seria;
// 2. corta en «and in the end»: la maqueta de la arena con su cúpula; una figurita con arco junto al árbol; la flecha
//    con su cable sale en «fires», se clava en el borde en «force field» y la cúpula se resquebraja como un cristal; dos
//    vigilantes se asustan (nadie herido);
// 3. corta en «It's the same weak spot»: el borde de cerca con la grieta; el vigilante señala; en «saved Haymitch» el
//    recuerdo en sepia (Juegos 50): la piedra rebota en el mismo punto; en «earlier» vuelve la grieta y los dos anillos
//    coinciden.''', r'''
const a = (f) => en('enemigo', f), b = (f) => en('punto', f);
const TELLS = 3.72, KAT = 3.94, REAL = 5.96, ENEMY = 6.28, P2 = 7.15, FIRES = 8.36, FORCE = 9.8, P3 = b(0);
const SAVED = 12.96, EARLIER = 14.7;
const ROSA = hex('#f4f0f4'), ROSAS = hex('#b8b0c0'), K = hex('#141018'), BLANCO = hex('#f8f8f0');
// globo de pensamiento con la rosa blanca de Snow (sin letras)
const globo = (x, y, u) => {
  if (u <= 0) return; const r = Math.round(14 * Math.min(1, u * 1.6));
  R.disco(x, y, r + 1, K); R.disco(x, y, r, hex('#2a2438')); R.disco(x - 1, y - 1, r - 3, hex('#3a3450'));
  R.disco(x - 12, y + 15, 3, K); R.disco(x - 12, y + 15, 2, hex('#2a2438')); R.disco(x - 17, y + 20, 1, K);
  if (u > 0.5) { R.linea(x, y + 2, x, y + 9, hex('#3a8a3a')); R.pset(x + 1, y + 6, hex('#5ab84a')); R.pset(x + 2, y + 5, hex('#5ab84a')); R.icono('rosa', x - 7, y - 9, ROSA, K, 2); R.pset(x - 1, y - 4, ROSAS); R.pset(x, y - 3, ROSAS); }
};
// la figurita de la maqueta: trenza oscura, cazadora, el arco (5 × 9 px)
const figurita = (x, y, t, tensa) => {
  R.rect(x, y - 8, x + 2, y - 6, hex('#2a2032')); R.pset(x + 1, y - 7, hex('#c89070'));
  R.rect(x, y - 5, x + 2, y - 2, hex('#4a5a50')); R.rect(x, y - 1, x, y, K); R.rect(x + 2, y - 1, x + 2, y, K);
  R.pset(x - 1, y - 6, hex('#2a2032')); R.pset(x - 1, y - 5, hex('#2a2032'));
  const ax = x + 4 + (tensa ? 0 : 1); R.linea(ax, y - 9, ax + 1, y - 6, hex('#8a5a2a')); R.linea(ax + 1, y - 6, ax, y - 2, hex('#8a5a2a'));
  R.linea(ax, y - 9, tensa ? ax - 2 : ax, y - 6, hex('#e8e8e8')); R.linea(tensa ? ax - 2 : ax, y - 6, ax, y - 2, hex('#e8e8e8'));
  R.pset(x + 3, y - 5, hex('#c89070'));
};
const p1 = (t) => {
  const o = { encuadre: 'tren', camara: 'ventana', luz: 'tarde' };
  T.interior(R, t, o);
  // haymitch entra desde la derecha, se para a su lado y se inclina a hablarle al oído
  const u = tramo(t, 0.6, 3.0), w = tramo(t, TELLS - 0.3, TELLS + 0.2);
  const hx = Math.round(lerp(236, 132, u) - 12 * w);
  const kgira = t > KAT - 0.1, asiente = (t > ENEMY + 0.15 && t < ENEMY + 0.35) || (t > ENEMY + 0.55 && t < ENEMY + 0.75);
  R.actor(EL.katniss, 98, 152 + (asiente ? 1 : 0), t, { dir: kgira ? 1 : -1, sorpresa: t > KAT && t < KAT + 0.7, triste: t > REAL + 0.2 });
  R.actor(EL.haymitchViejo, hx, 152 + (w > 0.5 && t < 6.9 ? 1 : 0), t, { dir: -1, anda: u > 0 && u < 1, habla: t > TELLS && t < 6.9 && Math.sin(t * 13) > -0.2, dedo: t > ENEMY && t < 6.9 });
  // el susurro: unas ondas pequeñas de su boca a la oreja de ella
  if (t > TELLS + 0.1 && t < 6.9) for (let k = 0; k < 3; k++) { const f = ((t * 2.2 + k / 3) % 1); const x = Math.round(lerp(hx + 2, 112, f)); R.pset(x, 132 + (k % 2), hex('#f0e0b0')); R.pset(x, 134 - (k % 2), hex('#f0e0b0')); }
  globo(126, 94, tramo(t, REAL - 0.15, REAL + 0.25) * (1 - tramo(t, 6.95, 7.1)));
  T.interiorDelante(R, t, o);
};
const p2 = (t) => {
  const fl = tramo(t, FIRES, FORCE), gr = tramo(t, FORCE + 0.05, FORCE + 1.3);
  const g = T.arena(R, t, { encuadre: 'cupula', luces: 6, flecha: fl, grieta: gr });
  figurita(84, 129, t, t < FIRES + 0.1);
  const [px, py] = g && g.punto ? g.punto : [262, 84];
  if (fl > 0 && fl < 1) { const x = Math.round(lerp(90, px, fl)), y = Math.round(lerp(122, py, fl) - Math.sin(fl * Math.PI) * 10);
    for (let i = 1; i <= 10; i++) { const f2 = Math.max(0, fl - i * 0.03), xx = Math.round(lerp(90, px, f2)), yy = Math.round(lerp(122, py, f2) - Math.sin(f2 * Math.PI) * 10); R.pset(xx, yy, hex(i < 4 ? '#fff6a0' : '#e8b830')); }
    R.disco(x, y, 3, hex('#fff6a0')); R.disco(x, y, 1, BLANCO); }
  const hit = tramo(t, FORCE, FORCE + 0.7); if (hit > 0 && hit < 1) { R.anillo(px, py, 3 + Math.round(hit * 22), hex(hit < 0.5 ? '#fff6a0' : '#8ad8ff')); if (hit < 0.25) R.disco(px, py, 5, BLANCO); }
  // dos vigilantes junto a la mesa: el de la izquierda señala el borde; el de la derecha salta del susto con la grieta
  const susto = t > FORCE + 0.1;
  R.actor(EL.vigilante, 10, 176, t, { dir: 1, dedo: t > FIRES - 0.4 && t < FORCE + 0.1, sorpresa: susto });
  R.actor(EL.vigilante, 292, 177, t, { dir: -1, salto: susto && t < FORCE + 0.6 ? Math.round(3 * Math.sin((t - FORCE - 0.1) * 6.3)) : 0, brazos: susto && t < FORCE + 1.2, sorpresa: susto, habla: t < FIRES && Math.sin(t * 9) > 0.3 });
  // por delante pasa un técnico con una carpeta, que se para en seco con el chasquido
  const v = tramo(t, P2 + 0.2, FORCE), tx = Math.round(lerp(96, 176, v));
  R.actor(EL.plutarch, tx, 181, t, { dir: 1, anda: v > 0 && v < 1, sorpresa: susto });
};
const p3 = (t) => {
  const recuerdo = t > SAVED - 0.05 && t < EARLIER;
  const g = T.arena(R, t, { encuadre: 'cupula', camara: 'borde', grieta: recuerdo ? 0 : 1, golpe: recuerdo ? tramo(t, SAVED + 0.1, EARLIER - 0.2) : 0, luces: 2 });
  const [px, py] = g && g.punto ? g.punto : [223, 90];
  R.actor(EL.vigilante, 262, 178, t, { dir: -1, dedo: t > b(0.12) && t < SAVED, sorpresa: t > EARLIER, habla: recuerdo && Math.sin(t * 8) > 0 });
  const v = tramo(t, P3 + 0.3, P3 + 1.6); R.actor(EL.vigilante, Math.round(lerp(330, 288, v)), 178, t, { dir: -1, anda: v > 0 && v < 1, pal: { C: '#5a3a8a', c: '#3a2462' } });
  if (recuerdo) T.tinte(R, 0, 179, [150, 110, 60], 0.38);
  // el punto débil: un anillo que late (al volver del recuerdo, dos anillos que se juntan en el mismo sitio)
  const late = 5 + Math.round(2 * Math.sin(t * 7));
  if (!recuerdo) { R.anillo(px, py, late, hex('#fff6a0')); if (t > EARLIER) { const r2 = Math.max(late, Math.round(24 - 30 * tramo(t, EARLIER, EARLIER + 0.6))); R.anillo(px, py, r2, hex('#e8b830')); } }
};
const año = (t) => (t > SAVED - 0.05 && t < EARLIER) ? 50 : 75;
const efectos = [[1.0, 'pasos'], [REAL, 'pop'], [FIRES, 'whoosh'], [FORCE, 'flash'], [FORCE + 0.6, 'zumbido'], [b(0.15), 'brillo'], [SAVED + 0.1, 'whoosh'], [SAVED + 0.75, 'toc'], [EARLIER, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos: efectos.filter(([, n]) => n !== 'pasos'), año });
''')

E['jh-reloj'] = ('El reloj', '''// JH-RELOJ (frases 42–43), Juegos 75 → 50. Tres planos:
// 1. el holograma de la arena reloj (doce sectores); wiress entra desde la izquierda y en «gave away» levanta su aguja
//    hacia el holograma; beetee, a la derecha, la escucha y sonríe; la manecilla avanza;
// 2. corta en «the arena was a clock»: un sector de cerca; en «Tick» y «Tock» la manecilla salta y wiress da dos
//    golpecitos al aire con la aguja; un anillo marca cada salto;
// 3. corta en «the trailer» (Juegos 50): la sala de control con el holograma del reloj; wiress joven entra con un
//    destornillador, señala la pantalla de engranajes en «machine» y en «broken» salta una pieza y los engranajes se
//    paran; el vigilante se lleva las manos a la cabeza.''', r'''
const r = (f) => en('reloj', f), m = (f) => en('maquina', f);
const WIRESS = 2.0, GAVE = 3.25, P2 = 4.12, CLOCK = 4.99, TICK = 5.98, TOCK = 6.2, P3 = 7.82;
const SUMS = 9.31, MACHINE = 11.22, BUT = 12.17, BROKEN = 13.17;
const p1 = (t) => {
  const g = T.arena(R, t, { encuadre: 'reloj', hora: 1 + t * 0.55 });
  const u = tramo(t, 0.4, WIRESS - 0.1), wx = Math.round(lerp(-18, 36, u));
  const alza = tramo(t, GAVE - 0.2, GAVE + 0.3);
  const w = R.actor(EL.wiress, wx, 176, t, { dir: 1, anda: u > 0 && u < 1, sostiene: alza > 0 ? [wx + 16, Math.round(lerp(158, 146, alza))] : undefined, habla: t > WIRESS + 0.3 && t < GAVE && Math.sin(t * 11) > 0 });
  if (alza > 0) T.PIEZAS_JH.aguja(R, w.mano[0], w.mano[1] + 1, {});
  R.actor(EL.beetee, 274, 174, t, { dir: -1, sonrisa: t > GAVE + 0.4, sorpresa: t > WIRESS && t < WIRESS + 0.6, dedo: t > GAVE + 0.4 });
};
const p2 = (t) => {
  // la manecilla salta a golpes: dos saltos de calentamiento y los dos de «tic, tac»
  const saltos = [P2 + 0.3, CLOCK, TICK, TOCK, TOCK + 0.7];
  let n = 0; for (const s of saltos) n += tramo(t, s, s + 0.08);
  T.arena(R, t, { encuadre: 'reloj', camara: 'sector', hora: 3.7 + n * 0.3 });
  const golpe = Math.max(...saltos.slice(2, 4).map((s) => 1 - Math.min(1, Math.abs(t - s) / 0.12)));
  const w = R.actor(EL.wiress, 26, 176, t, { dir: 1, sostiene: [44, 150 - Math.round(golpe * 4)], sonrisa: t > TOCK });
  T.PIEZAS_JH.aguja(R, w.mano[0], w.mano[1] + 1, {});
  R.actor(EL.beetee, 252, 176, t, { dir: -1, dedo: t > CLOCK && t < TICK, sorpresa: t > TICK - 0.05 && t < TOCK + 0.4 });
  // el anillo de cada salto, en la punta de la manecilla
  for (const s of saltos.slice(1)) { const f = tramo(t, s, s + 0.45); if (f > 0 && f < 1) { const [ax, ay] = [w.mano[0], w.mano[1] - 9]; for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4, r0 = 3 + f * 6, r1 = 6 + f * 10; R.linea(Math.round(ax + Math.cos(an) * r0), Math.round(ay + Math.sin(an) * r0), Math.round(ax + Math.cos(an) * r1), Math.round(ay + Math.sin(an) * r1), hex(f < 0.5 ? '#fff6a0' : '#e8b830')); } } }
};
const destornillador = (x, y) => {
  R.rect(x - 1, y - 2, x + 1, y + 3, hex('#141018')); R.rect(x, y - 1, x, y + 2, hex('#e8b830'));
  R.linea(x, y - 3, x, y - 9, hex('#141018')); R.pset(x, y - 4, hex('#c8ccd8')); R.pset(x, y - 6, hex('#e8ecf4')); R.pset(x, y - 8, hex('#c8ccd8'));
};
const p3 = (t) => {
  const eng = t < MACHINE - 0.3 ? 0 : t < BROKEN ? 0.48 * tramo(t, MACHINE - 0.3, BROKEN) : 0.5 + 0.5 * tramo(t, BROKEN, BROKEN + 0.4);
  const g = T.arena(R, t, { arena: 'reloj', luces: 0, engranajes: eng });
  // wiress joven entra por la derecha con el destornillador, se para delante y explica
  const u = tramo(t, P3 + 0.2, SUMS - 0.2), wx = Math.round(lerp(330, 222, u));
  const sube = t > BUT - 0.2;
  const w = R.actor(EL.wiress, wx, 160, t, { dir: t > SUMS - 0.2 && t < MACHINE - 0.2 ? -1 : 1, anda: u > 0 && u < 1, pal: { H: '#4a3020', h: '#6a4630' },
    dedo: t > MACHINE - 0.2 && t < BUT - 0.2, sostiene: sube ? [wx + 17, sube && t < BROKEN ? 140 : 144] : undefined, habla: t > SUMS && t < MACHINE && Math.sin(t * 12) > 0, sonrisa: t > BROKEN + 0.3 });
  if (sube) destornillador(w.mano[0], w.mano[1]);
  else if (!(t > MACHINE - 0.2 && t < BUT - 0.2)) { destornillador(wx + (t > SUMS - 0.2 && t < MACHINE - 0.2 ? 1 : 14), 148); }
  R.actor(EL.vigilante, 58, 162, t, { dir: 1, sorpresa: t > BROKEN, brazos: t > BROKEN + 0.1 && t < BROKEN + 0.9, habla: t < SUMS && Math.sin(t * 7) > 0.4 });
  const v = tramo(t, P3 + 0.8, MACHINE); R.actor(EL.vigilante, Math.round(lerp(96, 120, v)), 160, t, { dir: 1, anda: v > 0 && v < 1, pal: { C: '#5a3a8a', c: '#3a2462' }, sorpresa: t > BROKEN });
  const sal = tramo(t, BROKEN, BROKEN + 1.1);
  if (sal > 0) { const x = Math.round(lerp(226, 262, sal)), y = Math.round(sal < 0.7 ? lerp(52, 160, (sal / 0.7) ** 2) : 160 - Math.sin((sal - 0.7) / 0.3 * Math.PI) * 8), giro = Math.floor(t * 12) % 2;
    R.disco(x, y, 4, hex('#141018')); R.disco(x, y, 3, hex('#e8b830')); R.disco(x, y, 1, hex('#141018')); for (let k = 0; k < 4; k++) { const an = k * Math.PI / 2 + giro * Math.PI / 4; R.pset(Math.round(x + Math.cos(an) * 4), Math.round(y + Math.sin(an) * 4), hex('#fff0a0')); } }
  const fl = tramo(t, BROKEN, BROKEN + 0.6); if (fl > 0 && fl < 1 && Math.floor(t * 10) % 2) { R.rect(195, 31, 241, 31, hex('#ff4a3a')); R.rect(195, 65, 241, 65, hex('#ff4a3a')); R.rect(195, 31, 195, 65, hex('#ff4a3a')); R.rect(241, 31, 241, 65, hex('#ff4a3a')); }
  T.arenaDelante(R, t, { arena: 'reloj' });
};
const año = (t) => (t >= P3 ? 50 : t >= P2 ? 75 : null);
const efectos = [[0.9, 'pasos'], [GAVE, 'brillo'], [CLOCK, 'tic'], [TICK, 'tic'], [TOCK, 'toc'], [P3 + 0.5, 'puerta'], [MACHINE, 'maquina'], [BROKEN, 'golpecito'], [BROKEN + 0.4, 'aviso']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos: efectos.filter(([, n]) => n !== 'pasos'), año });
''')

E['jh-canal'] = ('El canal', '''// JH-CANAL (frases 44–45), el mundo real (sin barra de Juegos). Tres planos:
// 1. fondo local: un teatrito con su telón rojo; en «real» el telón se descorre y detrás aparece el mapa de papel de
//    Norteamérica (lo que Panem disfraza); el pan, con peluca rosa y gorguera dorada del Capitolio, se arranca la peluca
//    en «behind Panem» y ríe; el público de delante se mueve;
// 2. corta en «Susan Collins»: el salón de noche; la mujer del sofá coge el mando y en «flipping» cambia del desierto al
//    concurso; el pan, en la mesita, se ríe con el concurso y atrapa una palomita;
// 3. corta en «The other»: la tele de cerca; la mano con el mando cambia al desierto lejano (sin violencia) en «real
//    footage»; en «the two» zapea deprisa y en «blurred» el mando se queda sin pilas entre los dos canales: la imagen se
//    queda mezclada, la pila parpadea y la mano sacude el mando (gag 6).''', r'''
const c0 = (f) => en('real', f), k = (f) => en('canal', f);
const ABRE = 2.4, QUITA = 3.06, P2 = k(0), FLIP = 6.37, REALITY = 8.21, P3 = 9.42, FOOT = 9.96, TWO = 12.09, BLUR = 12.47;
const K = hex('#141018');
// ── el teatrito (fondo local): marco dorado, paredes de damasco, telón, suelo de tablas, candilejas y el público ──
let fondo = null;
const ox0 = 58, oy0 = 30, ox1 = 262, oy1 = 128;
const h = (x, y, s = 0) => { const v = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453; return v - Math.floor(v); };
const pintaFondo = () => {
  const W1 = hex('#4a1622'), W2 = hex('#5a1e2c'), W3 = hex('#6e2a36'), OR = hex('#e8b830'), ORL = hex('#fff0a0'), ORS = hex('#8a5a18'), ORM = hex('#b8862a');
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    // pared de damasco: rombos con flor, más oscura arriba y en la esquina de Atom
    const dx = (x + (Math.floor(y / 12) % 2) * 8) % 16 - 8, dy = y % 12 - 6, rombo = Math.abs(dx) / 8 + Math.abs(dy) / 6;
    let c = rombo < 0.35 ? W3 : rombo < 0.5 ? W2 : W1;
    if (x > 272 && y < 50) c = rombo < 0.35 ? W2 : W1;
    R.pset(x, y, c);
  }
  // friso y zócalo de madera de los palcos
  for (let x = 0; x < 320; x++) for (let y = 120; y < 156; y++) R.pset(x, y, ((x * 3 + (y >> 3) * 17) % 41 < 2) ? hex('#2a1410') : (h(x >> 2, y, 3) < 0.2 ? hex('#5a3420') : hex('#4a2a1a')));
  for (let x = 0; x < 320; x += 24) { R.rect(x, 120, x + 1, 155, hex('#2a1410')); R.rect(x + 2, 120, x + 2, 155, hex('#6a4430')); }
  // los apliques de las paredes, con su tulipa
  for (const ax of [22, 298]) { R.rect(ax - 1, 74, ax + 1, 86, ORS); R.disco(ax, 70, 5, hex('#fff0c0')); R.disco(ax, 70, 3, hex('#fffbe8')); R.rect(ax - 4, 74, ax + 4, 75, OR); }
  // el escenario: suelo de tablas en perspectiva
  for (let y = oy1; y < 150; y++) for (let x = 36; x < 284; x++) {
    const fx = (x - 160) / (1 + (y - oy1) * 0.04), tabla = Math.floor((fx + 400) / 14);
    let c = h(tabla, 0, 5) < 0.5 ? hex('#8a5a32') : hex('#7a4e2a');
    if (Math.abs(((fx + 400) % 14)) < 0.9) c = hex('#4a2a18');
    if (h(x >> 1, y, tabla) < 0.06) c = hex('#a06a3a');
    R.pset(x, y, c);
  }
  // el marco dorado del proscenio con moldura (luz arriba e izquierda, sombra abajo y derecha) y rosetas
  const marco = (x0, y0, x1, y1) => { R.rect(x0, y0, x1, y1, ORM); };
  marco(ox0 - 16, oy0 - 12, ox0 - 1, 156); marco(ox1 + 1, oy0 - 12, ox1 + 16, 156); marco(ox0 - 16, oy0 - 12, ox1 + 16, oy0 - 1);
  for (let y = oy0 - 12; y <= 156; y++) { R.pset(ox0 - 16, y, ORS); R.pset(ox0 - 15, y, ORL); R.pset(ox0 - 2, y, ORS); R.pset(ox0 - 1, y, K); R.pset(ox1 + 1, y, K); R.pset(ox1 + 2, y, ORL); R.pset(ox1 + 15, y, ORS); R.pset(ox1 + 16, y, K);
    if (y % 10 < 2) { R.pset(ox0 - 9, y, ORL); R.pset(ox1 + 9, y, ORL); } if (y % 10 === 5) { R.pset(ox0 - 9, y, ORS); R.pset(ox1 + 9, y, ORS); } }
  for (let x = ox0 - 16; x <= ox1 + 16; x++) { R.pset(x, oy0 - 12, ORS); R.pset(x, oy0 - 11, ORL); R.pset(x, oy0 - 2, ORS); R.pset(x, oy0 - 1, K); if (x % 12 < 2) R.pset(x, oy0 - 7, ORL); if (x % 12 === 6) R.pset(x, oy0 - 6, ORS); }
  for (const [rx, ry] of [[ox0 - 8, oy0 - 6], [ox1 + 8, oy0 - 6], [160, oy0 - 6]]) { R.disco(rx, ry, 4, ORS); R.disco(rx, ry, 3, OR); R.disco(rx - 1, ry - 1, 1, ORL); }
  // las máscaras del teatro en el centro del marco, sin letras
  // el borde del escenario con las candilejas (las bombillas brillan en vivo)
  R.rect(30, 150, 290, 156, hex('#3a2014')); R.rect(30, 150, 290, 150, hex('#8a5a32'));
  for (let x = 44; x < 280; x += 16) { R.rect(x - 3, 152, x + 3, 155, hex('#2a2a30')); R.rect(x - 3, 152, x + 3, 152, hex('#6a6a74')); }
  // el foso: oscuro, con la barandilla de latón
  for (let y = 156; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, h(x >> 1, y >> 1, 9) < 0.1 ? hex('#1e1018') : hex('#160a12'));
  R.rect(0, 158, 319, 158, hex('#b8862a')); R.rect(0, 159, 319, 159, hex('#5a3a18'));
  for (let x = 6; x < 320; x += 20) R.rect(x, 159, x + 1, 166, hex('#8a6420'));
};
const bambalina = (t) => {
  // la bambalina de terciopelo con festones y borlas, delante del telón
  for (let x = ox0; x <= ox1; x++) { const fes = 10 + Math.round(3 * Math.abs(Math.sin((x - ox0) * Math.PI / 34))); for (let y = oy0; y < oy0 + fes; y++) { const s = Math.sin((x - ox0) * 0.5); R.pset(x, y, y === oy0 + fes - 1 ? K : s > 0.6 ? hex('#d8384a') : s < -0.5 ? hex('#7a1424') : hex('#b02436')); }
    const fy = oy0 + 10 + Math.round(3 * Math.abs(Math.sin((x - ox0) * Math.PI / 34))); R.pset(x, fy, hex('#e8b830')); if (x % 3 === 0) R.pset(x, fy + 1, hex('#b8862a')); }
  for (let x = ox0 + 34; x < ox1; x += 34) { const sw = Math.round(Math.sin(t * 2 + x) * 0.8); R.rect(x - 1 + sw, oy0 + 13, x + 1 + sw, oy0 + 18, hex('#e8b830')); R.pset(x + sw, oy0 + 19, hex('#b8862a')); }
};
const telon = (t, u) => {
  // dos paños que se recogen hacia los lados; los pliegues se aprietan al recogerse
  const half = (ox1 - ox0) / 2, ancho = Math.round(lerp(half + 1, 18, u));
  for (const lado of [-1, 1]) {
    for (let i = 0; i < ancho; i++) {
      const x = lado < 0 ? ox0 + i : ox1 - i, fase = i * (lerp(0.35, 0.9, u)) + Math.sin(t * 1.5 + i * 0.1) * 0.3 * (u > 0 && u < 1 ? 1 : 0.2);
      const s = Math.sin(fase), c = s > 0.7 ? hex('#e04a5a') : s > 0.1 ? hex('#c02a3c') : s > -0.6 ? hex('#9a1a2c') : hex('#6a0e1e');
      for (let y = oy0; y <= oy1 + 2; y++) R.pset(x, y, c);
      R.pset(x, oy1 + 2, hex('#e8b830')); if ((x + Math.floor(t * 4)) % 3 === 0) R.pset(x, oy1 + 3, hex('#b8862a'));
      if (i === ancho - 1) for (let y = oy0; y <= oy1 + 2; y++) R.pset(x, y, K);
    }
    if (u > 0.95) { const bx = lado < 0 ? ox0 + 14 : ox1 - 14; R.rect(bx - 1, 84, bx + 1, 88, hex('#e8b830')); R.rect(bx, 89, bx, 93, hex('#b8862a')); }
  }
};
const peluca = (x, y, gira) => {
  // la peluca rosa del Capitolio: cinco bolas de tres tonos y un penacho
  for (const [dx, dy, rr] of [[-5, 0, 4], [5, 0, 4], [0, -3, 5], [-3, -7, 3], [3, -7, 3]]) { R.disco(x + dx, y + dy, rr + 1, K); }
  for (const [dx, dy, rr] of [[-5, 0, 4], [5, 0, 4], [0, -3, 5], [-3, -7, 3], [3, -7, 3]]) { R.disco(x + dx, y + dy, rr, hex('#e85aa8')); R.disco(x + dx - 1, y + dy - 1, Math.max(1, rr - 2), hex('#ff9ad0')); }
  R.linea(x, y - 10, x + (gira ? -3 : 3), y - 15, hex('#3ad0c8')); R.pset(x + (gira ? -3 : 3), y - 16, hex('#e8fbff'));
};
const gorguera = (x, y) => { for (let i = -8; i <= 8; i += 2) { R.disco(x + i, y, 2, K); } for (let i = -8; i <= 8; i += 2) { R.disco(x + i, y, 1, i % 4 ? hex('#e8b830') : hex('#fff0a0')); } };
const publico = (t) => {
  // la fila de cabezas de espaldas en el foso, con el filo de luz del escenario
  const PEL = ['#2a1a14', '#3a2a20', '#1a1418', '#4a3020', '#2a2028', '#5a3a28'];
  for (let i = 0; i < 12; i++) { const x = 12 + i * 27 + (i % 2) * 5, bota = t > QUITA + 0.2 && t < QUITA + 1.4 && (i % 3 === 0) ? -Math.round(Math.abs(Math.sin(t * 9 + i)) * 2) : 0, y = 170 + (i % 3) + bota;
    R.rect(x - 13, y + 5, x + 13, 180, K); R.rect(x - 12, y + 6, x + 12, 180, hex(['#3a2a4a', '#2a3a4a', '#4a2a2a'][i % 3])); R.rect(x - 12, y + 6, x + 12, y + 6, hex('#8a6a7a'));
    R.disco(x, y, 9, K); R.disco(x, y, 8, hex(PEL[i % 6])); R.disco(x - 1, y - 2, 4, hex(['#4a3424', '#5a4430', '#2a2428', '#6a4830', '#3a3040', '#7a5038'][i % 6]));
    for (let dx = -6; dx <= 6; dx++) R.pset(x + dx, y - 8 + (Math.abs(dx) > 4 ? 1 : 0), hex('#e8b070')); R.pset(x - 9, y + 1, hex('#c88a5a')); R.pset(x + 9, y + 1, hex('#c88a5a')); }
};
const p1 = (t) => {
  T.mapa(R, t, { zoom: 1.15, centro: [-97, 40], vida: false, rosa: false });
  if (!fondo) { fondo = R.nuevo(); const prev = R.usar(fondo); pintaFondo(); R.usar(prev); }
  const B = R.buf; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { if (x >= ox0 && x <= ox1 && y >= oy0 && y < oy1) continue; B[y * 320 + x] = fondo[y * 320 + x]; }
  // la luz del foco sobre el escenario
  const u = tramo(t, ABRE - 0.8, ABRE + 0.6);
  telon(t, u);
  // el pan, en el centro del escenario, con su disfraz; en «behind Panem» se arranca la peluca y la tira
  const q = tramo(t, QUITA - 0.1, QUITA + 0.8), quitando = t > QUITA - 0.25;
  const p = T.pan(R, 160, 146, t, { s: 2, saluda: quitando && q < 0.3, expresion: t > QUITA + 0.4 ? 'risa' : t > ABRE ? 'normal' : 'normal', dir: 1 });
  const [cx, cy] = p.cabeza;
  if (!quitando) { gorguera(cx, cy + 15); peluca(cx, cy - 2, false); }
  else {
    const vx = lerp(cx, 232, q), vy = cy - 2 - Math.sin(q * Math.PI) * 30 + q * 38;
    if (q < 1) peluca(Math.round(vx), Math.round(vy), true); else peluca(232, 138, true);
    const gq = tramo(t, QUITA + 0.2, QUITA + 0.6); gorguera(Math.round(lerp(cx, cx - 30, gq)), Math.round(lerp(cy + 15, 146, gq)));
  }
  bambalina(t);
  for (let x = 44; x < 280; x += 16) { const on = (Math.floor(t * 3) + x) % 7 !== 0; R.disco(x, 151, 2, hex(on ? '#fff0a0' : '#c8a040')); if (on) R.pset(x, 150, hex('#fffbe8')); }
  publico(t);
};
const p2 = (t) => {
  const canal = t < FLIP + 0.15 ? 1 : 0, zap = tramo(t, FLIP, FLIP + 0.3);
  const o = { encuadre: 'salon', canal, zap: zap > 0 && zap < 1 ? 1 - Math.abs(zap * 2 - 1) : 0 };
  T.real(R, t, o);
  // el pan en la mesita: mira la tele; con el concurso se ríe y atrapa una palomita que salta del bol
  const ri = t > REALITY - 0.2;
  T.pan(R, 146, 138, t, { dir: -1, expresion: ri ? 'risa' : 'normal' });
  const pq = tramo(t, REALITY + 0.3, REALITY + 0.9); if (pq > 0 && pq < 1) { const x = Math.round(lerp(162, 146, pq)), y = Math.round(128 - Math.sin(pq * Math.PI) * 14 + pq * 0); R.disco(x, y, 1, hex('#fff6d8')); R.pset(x, y - 1, hex('#e8c860')); }
  // la mujer coge el mando de la mesita y apunta a la tele en «flipping»
  const coge = tramo(t, P2 + 0.6, P2 + 1.2), apunta = t > FLIP - 0.3 && t < FLIP + 0.5;
  const mx = Math.round(lerp(228, 222, coge)), my = apunta ? 124 : 130;
  const w = R.actor(EL.mujerSofa, 228, 152, t, { dir: -1, sostiene: [mx - 6, my], sonrisa: t > REALITY - 0.1, habla: t > REALITY + 0.5 && Math.sin(t * 9) > 0.5 });
  const [hx, hy] = w.mano; R.rect(hx - 5, hy - 1, hx, hy + 1, K); R.rect(hx - 4, hy, hx - 1, hy, hex('#3a3a44')); R.pset(hx - 5, hy, apunta && Math.floor(t * 10) % 2 ? hex('#ff4a3a') : hex('#8a2a2a'));
  if (apunta && Math.floor(t * 10) % 2) for (let i = 1; i < 14; i++) { const f = i / 14; if (i % 2) R.pset(Math.round(lerp(hx - 6, 100, f)), Math.round(lerp(hy, 80, f)), hex('#ff8a7a')); }
  T.realDelante(R, t, o);
};
const p3 = (t) => {
  const pulsos = [FOOT - 0.1, TWO, TWO + 0.17, TWO + 0.32];
  let canal = 0; for (const s of pulsos) if (t > s + 0.12) canal = 1 - canal;
  const sinPilas = t > BLUR;
  let zap = 0; for (const s of pulsos) { const f = tramo(t, s, s + 0.25); if (f > 0 && f < 1) zap = Math.max(zap, 1 - Math.abs(f * 2 - 1)); }
  if (sinPilas) zap = 0.55 + 0.1 * Math.sin(t * 20);
  const o = { encuadre: 'salon', camara: 'tele', canal, zap, sinPilas, mando: false };
  T.real(R, t, o);
  // la mano con el mando entra desde abajo a la derecha; el pulgar aprieta; sin pilas, la mano lo sacude
  const entra = tramo(t, P3 - 0.1, P3 + 0.25), sacude = sinPilas && t > BLUR + 0.3 ? Math.round(Math.sin(t * 30) * 2) : 0;
  const wx = 176 + sacude, wy = Math.round(lerp(196, 160, entra));
  const aprieta = pulsos.some((s) => t > s && t < s + 0.12) || (sinPilas && Math.floor(t * 4) % 2 === 0 && t < BLUR + 0.3);
  // el mando, vertical, por debajo de la mano
  const rx = wx - 11, ry = wy - 36;
  R.rect(rx - 1, ry - 1, rx + 9, wy + 2, K); R.rect(rx, ry, rx + 8, wy + 1, hex('#4a4a5a')); R.rect(rx, ry, rx, wy + 1, hex('#7a7a8a')); R.rect(rx + 8, ry, rx + 8, wy + 1, hex('#2a2a34'));
  R.rect(rx + 3, ry + 2, rx + 5, ry + 3, aprieta && !sinPilas ? hex('#ff4a3a') : hex('#6a2a2a'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) R.pset(rx + 2 + i * 2, ry + 7 + j * 3, hex(j === 0 ? '#e83a3a' : '#e8ecf4'));
  R.rect(rx + 3, ry + 21, rx + 5, ry + 23, aprieta ? hex('#8a8a96') : hex('#c8ccd8'));
  if (aprieta && !sinPilas) for (let k = 1; k < 6; k++) R.pset(rx + 4 - k * 2, ry - 2 - k * 4, hex('#ff8a7a'));
  T.brazo(R, wx + 46, wy + 34, wx + 4, wy, '#d0a040', -1, { codo: [wx + 30, wy + 26] });
  if (aprieta) R.rect(rx + 3, ry + 21, rx + 4, ry + 22, hex('#f6c290'));
  if (sinPilas && Math.floor(t * 3) % 2) { R.bocadillo(wx + 22, wy - 40, { icono: '?' }); }
};
const efectos = [[ABRE - 0.6, 'whoosh'], [QUITA, 'pop'], [QUITA + 0.5, 'publico'], [P2 + 0.7, 'golpecito'], [FLIP, 'interruptor'], [REALITY, 'publico'], [FOOT - 0.1, 'interruptor'], [TWO, 'bip'], [BLUR, 'aviso'], [BLUR + 0.4, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos });
''')
