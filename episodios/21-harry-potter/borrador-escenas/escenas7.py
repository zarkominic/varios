E = {}

# Ayudas comunes (cada escena es su propia página, así que van repetidas en cada cuerpo)
AYUDAS = r'''
const mix = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };
// un halo de luz tramado alrededor de (x, y): aclara hacia col en la proporción a, que cae hacia el borde
const halo = (x, y, r, col, a) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r) continue; const X = Math.round(x + i), Y = Math.round(y + j); if (X < 0 || X > 319 || Y < 0 || Y > 179) continue; R.pset(X, Y, mix(R.pget(X, Y), col, a * (1 - d / r))); } };
// una bolita de luz con su halo, su brillo y una estela de tres puntos
const bola = (x, y, col, r = 2, est = null) => { halo(x, y, r * 4, col, 0.6); R.disco(Math.round(x), Math.round(y), r, col); R.pset(Math.round(x) - 1, Math.round(y) - 1, hex('#ffffff')); if (est) for (let k = 1; k <= 3; k++) R.pset(Math.round(x - est[0] * k * 3), Math.round(y - est[1] * k * 3), mix(col, hex('#ffffff'), 0.3)); };
const brilla = (x, y, t, col = hex('#fff6c8')) => { if (Math.sin(t * 9 + x) > -0.2) { R.pset(x, y - 2, col); R.pset(x, y + 2, col); R.pset(x - 2, y, col); R.pset(x + 2, y, col); R.pset(x, y, hex('#ffffff')); } };
const K = hex('#14111a');
const PIEZAS_HP = T.PIEZAS_HP;
'''

E['hp-apagador'] = ('El apagador', '''// HP-APAGADOR (frase 24), sin cartela, 1997 en la barra (el libro). Cuatro planos:
// 1. Privet Drive de noche: Dumbledore entra por la acera, levanta el apagador y hace clic: las cuatro farolas se apagan
//    de una en una (la más lejana primero) y cada luz vuela, con su estela, a meterse en el aparato; el gato lo mira desde la
//    tapia. Corta en «the Put-Outer».
// 2. El bosque de noche (el último libro): Ron anda a oscuras por el sendero, mira a los lados, saca el mismo apagador,
//    clic en «Ron», y sale una bolita de luz azulada que flota delante y le alumbra; él sonríe y la sigue. Corta en «And».
// 3. La casa de los reptiles del zoo: un niño da golpecitos al cristal y se aburre; Harry llega a la barandilla, le habla a
//    la boa («talks to a snake») y se encoge de hombros («without knowing what he's doing»). Corta en «That's».
// 4. El cristal de cerca: Harry habla, la boa le guiña un ojo en «parseltongue»; un brillo recorre el cristal y lo deja
//    hecho chispas (el cristal que desaparece, insinuado); Harry da un paso atrás con «!» y al final mira con «?».''', AYUDAS + r'''
const a = (f) => en('apagador', f);
const P2 = a(0.246), P3 = a(0.477), P4 = a(0.703);
const SODIO = hex('#ffc860'), AZUL = hex('#bfe4ff');
// el plano 1: los instantes en que se apaga cada farola (la más lejana primero) y su luz vuela al aparato
const ORDEN = [38, 296, 124, 210];   // de la más lejana al anciano (x 167) a la más cercana
const c0 = a(0.107), c1 = a(0.225), apaga = (k) => c0 + (k + 1) / 4 * (c1 - c0) - 0.12;
const p1 = (t) => {
  const u = tramo(t, c0, c1), dx = Math.round(lerp(236, 160, tramo(t, 0.2, a(0.07))));
  const g = T.muggle(R, t, { encuadre: 'calle', farolas: 1 - u, aparato: 167 });
  T.tinte(R, 0, 179, [8, 10, 30], 0.3 * tramo(t, c0 + 0.3, c1 + 0.3));
  // polillas alrededor de las farolas encendidas
  for (const f of g.farolas ?? []) if (f.encendida) for (let k = 0; k < 3; k++) { const an = t * (3 + k) + k * 2.1 + f.x; R.pset(Math.round(f.x + Math.cos(an) * (5 + k)), Math.round(f.y + 2 + Math.sin(an * 1.3) * 4), hex('#f8eed0')); }
  const anda = t < a(0.07), levanta = t > a(0.08) && t < c1 + 0.6;
  const ac = R.actor(EL.dumbledore, dx, 138, t, { dir: -1, anda, sostiene: levanta ? [dx - 4, 104] : false, sonrisa: t > c1 + 0.2, habla: !anda && !levanta && t < a(0.08) });
  const [mx, my] = ac.mano;
  // las luces que vuelan de cada farola al apagador (orden: de la más lejana a la más cercana)
  const FX = ORDEN;
  FX.forEach((fx, k) => { const v = tramo(t, apaga(k), apaga(k) + 0.55); if (v <= 0 || v >= 1) return; const e = v * v * (3 - 2 * v), x = lerp(fx, mx, e), y = lerp(69, my - 6, e) - Math.sin(v * Math.PI) * 18; bola(x, y, SODIO, 3, [(mx - fx) / 300, 0]); });
  if (levanta) PIEZAS_HP.apagador(R, mx, my + 4, { luz: FX.some((fx, k) => t > apaga(k) + 0.5 && t < apaga(k) + 0.75) });
  // el clic: un destello pequeño en el botón
  FX.forEach((fx, k) => { if (t > apaga(k) - 0.05 && t < apaga(k) + 0.12) brilla(mx + 3, my - 5, 1, hex('#ffffff')); });
  T.muggleDelante(R, t, { encuadre: 'calle' });
};
// el plano 2: Ron en el bosque, con la bolita de luz que le guía
const clic2 = a(0.378), sigue = a(0.415);
const p2 = (t) => {
  T.exterior(R, t, { encuadre: 'bosque' });
  T.tinte(R, 0, 179, [6, 10, 26], 0.45 - 0.2 * tramo(t, clic2 + 0.1, clic2 + 0.9));
  const w = tramo(t, P2 + 0.1, a(0.35)), z = tramo(t, sigue, P3 + 0.2);
  const rx = Math.round(lerp(18, 112, w) + lerp(0, 70, z));
  // la bolita: sale del aparato, sube y se queda flotando delante; luego tira hacia el sendero
  const salir = tramo(t, clic2 + 0.05, clic2 + 0.8);
  const bx = lerp(rx + 22, 170, salir) + lerp(0, 70, z) + Math.sin(t * 2.4) * 3, by = lerp(138, 118, salir) + Math.sin(t * 3.1) * 3;
  if (salir > 0) { halo(bx, by, 46, AZUL, 0.32 * Math.min(1, salir * 2)); halo(bx, 168, 34, AZUL, 0.25 * Math.min(1, salir * 2)); }
  const mira = t > a(0.35) && t < clic2 - 0.25;
  const ac = R.actor(EL.ronJersey, rx, 166, t, { dir: mira && Math.sin(t * 3) > 0 ? -1 : 1, anda: (w > 0 && w < 1) || (z > 0 && z < 1), sostiene: t > clic2 - 0.6 && t < sigue + 0.3 ? [rx + 22, 140] : false, sonrisa: salir > 0.6, sorpresa: salir > 0 && salir <= 0.6 });
  if (t > clic2 - 0.6 && t < sigue + 0.3) { const [mx, my] = ac.mano; PIEZAS_HP.apagador(R, mx, my + 4, { luz: salir > 0 && salir < 0.3 }); if (t > clic2 - 0.05 && t < clic2 + 0.12) brilla(mx + 2, my - 5, 1, hex('#ffffff')); }
  if (salir > 0) bola(bx, by, AZUL, 3);
  // luciérnagas que se acercan a la luz
  if (salir > 0.5) for (let k = 0; k < 4; k++) { const an = t * 1.7 + k * 1.57; R.pset(Math.round(bx + Math.cos(an) * (12 + k * 3)), Math.round(by + Math.sin(an) * 7), hex('#d8f070')); }
  T.exteriorDelante(R, t, { encuadre: 'bosque' });
};
// el plano 3: el zoo, Harry le habla a la boa
const llega = a(0.528), hablaA = a(0.539), encoge = a(0.6);
const p3 = (t) => {
  const g = T.muggle(R, t, { encuadre: 'zoo' });
  // un niño (el primo, de espaldas al reflejo) da golpecitos en el cristal y se va aburrido
  const toc = t < a(0.525), vete = tramo(t, a(0.53), a(0.6)), nx = Math.round(lerp(196, 262, vete));
  R.actor(EL.chico, nx, 160, t, { dir: vete > 0 ? 1 : -1, dedo: toc && Math.sin(t * 14) > 0, anda: vete > 0 && vete < 1, enfado: vete > 0 });
  const hx = Math.round(lerp(30, 136, tramo(t, P3 + 0.15, llega)));
  const habla = t > hablaA && t < a(0.592);
  R.actor(EL.harryCalle, hx, 160, t, { dir: 1, anda: t < llega, habla: habla && Math.sin(t * 11) > -0.3, sorpresa: t > encoge && t < a(0.64), sonrisa: t > a(0.64), brazos: t > encoge && t < a(0.625) });
  if (t > encoge) R.icono('?', hx + 5, 126 - Math.round(tramo(t, encoge, encoge + 0.3) * 4), hex('#f8f0d0'), K);
  // ondas de voz hacia la boa mientras habla
  if (habla) for (let k = 0; k < 3; k++) { const f = (t * 1.2 + k / 3) % 1, cx = hx + 16 + f * 22, cy = 136 - f * 30, r = 2 + f * 4; for (let q = -3; q <= 3; q++) { const an = -0.8 + q * 0.25; R.pset(Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r), mix(hex('#d8ffd0'), hex('#3a6a3a'), f * 0.6)); } }
  T.muggleDelante(R, t, { encuadre: 'zoo' });
};
// el plano 4: el cristal de cerca, el guiño y el cristal que se deshace en chispas
const guina = a(0.722), barre = a(0.79), atras = a(0.84);
const p4 = (t) => {
  const gu = tramo(t, guina, guina + 0.15) - tramo(t, guina + 0.7, guina + 0.85);
  const g = T.muggle(R, t, { encuadre: 'zoo', camara: 'cristal', guiño: gu, guino: gu });
  // el guiño: una estrellita que destella junto al ojo que se cierra
  if (gu > 0.3) { const sx = 214 + Math.round(Math.sin(t * 0.7) * 4), sy = 118, L = 2 + Math.round(gu * 2); halo(sx, sy, 8, hex('#fff6c8'), 0.5); for (let k = -L; k <= L; k++) { R.pset(sx + k, sy, hex('#fff6c8')); R.pset(sx, sy + k, hex('#fff6c8')); } R.pset(sx - 1, sy - 1, hex('#ffffff')); R.pset(sx + 1, sy + 1, hex('#ffffff')); R.pset(sx, sy, hex('#ffffff')); }
  // el brillo que barre el cristal de izquierda a derecha y lo deja en chispas
  const b = tramo(t, barre, barre + 1.1);
  if (b > 0) {
    const [x0, y0, x1, y1] = g.cristal ?? [14, 12, 306, 162], bx = Math.round(lerp(x0 - 30, x1 + 30, b));
    R.recorte([x0, y0, x1, y1]);
    for (let y = y0; y <= y1; y++) for (let i = -10; i <= 10; i++) { const x = bx + i - Math.round((y - y0) * 0.25); if (x >= x0 && x <= x1 && ((x + y) & 1)) R.pset(x, y, mix(R.pget(x, y), hex('#ffffff'), 0.6 * (1 - Math.abs(i) / 10))); }
    for (let k = 0; k < 90; k++) { const sx = x0 + ((k * 61) % (x1 - x0)), sy = y0 + ((k * 37) % (y1 - y0)); if (sx < bx - 10 - (sy - y0) * 0.25) { const f = (t * 1.3 + k * 0.17) % 1; brilla(sx, Math.round(sy + f * 8), t + k, mix(hex('#e8fff0'), hex('#ffffff'), f)); } }
    R.recorte(null);
  }
  const hx = Math.round(226 + tramo(t, atras, atras + 0.3) * 18);
  R.actor(EL.harryCalle, hx, 178, t, { dir: -1, dedo: t > a(0.705) && t < guina, habla: t < a(0.752) && Math.sin(t * 10) > -0.3, sorpresa: t > atras && t < a(0.9), sonrisa: t > a(0.9) || (t > guina && t < atras), salto: Math.round(Math.sin(tramo(t, atras, atras + 0.3) * Math.PI) * 3) });
  if (t > atras && t < a(0.9)) R.icono('!', hx + 6, 138, hex('#fff0a0'), K);
  if (t > a(0.9)) R.icono('?', hx + 5, 138 - Math.round(tramo(t, a(0.9), a(0.92)) * 3), hex('#f8f0d0'), K);
  T.muggleDelante(R, t, { encuadre: 'zoo', camara: 'cristal' });
};
const efectos = [[apaga(0), 'interruptor'], [apaga(1), 'interruptor'], [apaga(2), 'interruptor'], [apaga(3), 'interruptor'], [clic2, 'interruptor'], [clic2 + 0.2, 'brillo'], [a(0.49), 'toc'], [guina, 'pop'], [barre + 0.1, 'brillo'], [atras, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1997 });
''')

E['hp-rata'] = ('La rata', '''// HP-RATA (frase 25), sin cartela, 1997 en la barra. Cuatro planos:
// 1. El compartimento del expreso: Ron, sentado, saca a Scabbers dormida de su regazo y se la enseña a Harry («Ron's rat
//    Scabbers»); con «hand-me-down from Percy» se encoge de hombros y la vuelve a dejar; entra el carrito de las golosinas.
//    Corta en «old».
// 2. La ventanilla de cerca (gag 6): Scabbers duerme hecha una bola en la mesita entre las golosinas; la snitch llega con la
//    lupa y la vigila; en «find out why» la rata abre un ojo (grande en la lupa), la snitch se asusta y huye. Corta en «And».
// 3. La chimenea de la sala común: Neville lee en la butaca la carta de su abuela con el sapo en el regazo; el sapo salta a
//    la alfombra, Neville se levanta, lo persigue y lo coge, sonriendo; Hermione lee en la otra butaca. Corta en «the answer».
// 4. El escaparate de la tienda de túnicas: Neville, con su sapo, pasea de la mano de su abuela (el sombrero con el buitre,
//    insinuado, y otro igual expuesto en el escaparate); se paran, ella le pone la mano en el hombro y entran juntos.''', AYUDAS + r'''
const a = (f) => en('rata', f);
const P2 = a(0.23), P3 = a(0.463), P4 = a(0.755);
const enseña = a(0.04), baja = a(0.16);
const p1 = (t) => {
  const g = T.hogwarts(R, t, { encuadre: 'tren', carrito: tramo(t, 0.3, 2.6) });
  const rx = 46, sube = t > enseña && t < baja;
  const ron = R.actor(EL.ron, rx, 140, t, { dir: 1, sostiene: sube ? [rx + 22, 112] : [rx + 16, 126], sonrisa: sube, habla: t > enseña + 0.3 && t < baja && Math.sin(t * 10) > 0, triste: t > baja && t < baja + 0.8 });
  const [mx, my] = ron.mano, resp = Math.sin(t * 3) > 0 ? 1 : 0;
  PIEZAS_HP.rata(R, mx + 2, my + 4 - resp, {});
  R.actor(EL.harry, 258, 140, t, { dir: -1, sonrisa: t > enseña + 0.4, sorpresa: t > enseña && t < enseña + 0.4, dedo: t > enseña + 0.5 && t < enseña + 1.2 });
  T.hogwartsDelante(R, t, { encuadre: 'tren', carrito: tramo(t, 0.3, 2.6) });
};
// el plano 2: la mesita de cerca con la rata, la snitch y la lupa
const entra = a(0.25), ojo = a(0.396), huye = a(0.43);
const p2 = (t) => {
  T.hogwarts(R, t, { encuadre: 'tren', camara: 'ventana' });
  R.actor(EL.harry, 92, 152, t, { dir: 1, sorpresa: t > ojo, sonrisa: t < ojo && t > entra + 0.5 });
  R.actor(EL.ron, 214, 152, t, { dir: -1, habla: t < ojo && Math.sin(t * 8) > 0.3, sostiene: t < ojo ? [206, 128] : false, sorpresa: t > ojo + 0.2 });
  if (t < ojo) { const [mx, my] = [206, 128]; R.rect(mx - 3, my - 2, mx + 2, my + 2, hex('#6a3a1a')); R.rect(mx - 2, my - 1, mx + 1, my + 1, hex('#8a5228')); }
  T.hogwartsDelante(R, t, { encuadre: 'tren', camara: 'ventana' });
  // Scabbers hecha una bola sobre la mesita, respirando
  const rx = 160, ry = 141 - (Math.sin(t * 2.6) > 0 ? 1 : 0), abre = t > ojo;
  R.disco(rx, ry + 1, 14, mix(R.pget(rx, ry + 2), K, 0.3));
  PIEZAS_HP.rata(R, rx, ry, { s: 2, ojo: abre });
  // la lupa (sostenida por la snitch) que recorre la rata y se para en el ojo
  const v = tramo(t, entra, entra + 0.9), w = tramo(t, entra + 0.9, ojo - 0.2), fu = tramo(t, huye, huye + 0.7);
  if (v > 0 && fu < 1) {
    const ox = rx + 5, oy = ry - 10;   // el ojo de la rata (a escala 2)
    let lx = lerp(30, rx - 8, v) + Math.sin(w * Math.PI * 2) * 7 * (1 - tramo(w, 0.7, 1)), ly = lerp(70, oy + 2, v);
    if (w >= 1) { lx = ox; ly = oy; }
    if (fu > 0) { lx = lerp(ox, 20, fu * fu); ly = lerp(oy, 30, fu) - Math.sin(fu * Math.PI) * 20; }
    const lyB = Math.round(ly + 17), lxB = Math.round(lx);
    PIEZAS_HP.lupa(R, lxB, lyB, { s: 2 });
    // lo que se ve por la lupa: el ojo de la rata enorme (cerrado, o abierto de golpe)
    if (w >= 1 && fu === 0) { const cx = lxB, cy = lyB - 17; if (!abre) { R.rect(cx - 4, cy, cx + 4, cy, K); R.pset(cx - 5, cy - 1, K); R.pset(cx + 5, cy - 1, K); } else { R.rect(cx - 4, cy - 2, cx + 4, cy + 2, hex('#ffffff')); R.rect(cx - 5, cy - 1, cx + 5, cy + 1, hex('#ffffff')); R.rect(cx - 1, cy - 2, cx + 2, cy + 2, K); R.pset(cx, cy - 1, hex('#ffffff')); } }
    const sx = lxB - 15 + Math.round(Math.sin(t * 5) * 1), sy = lyB - 18;
    T.snitch(R, sx, sy, t, { cara: abre ? 'susto' : 'normal' });
  }
  if (t > ojo && t < ojo + 0.6) R.icono('!', rx + 14, ry - 30, hex('#fff0a0'), K);
};
// el plano 3: Neville junto a la chimenea, la carta de la abuela y el sapo que se escapa
const salta = a(0.55), levanta = a(0.6), coge = a(0.7);
const p3 = (t) => {
  const g = T.hogwarts(R, t, { encuadre: 'sala', camara: 'chimenea' });
  R.actor(EL.hermione, 276, 150, t, { dir: -1, sonrisa: t > coge, sorpresa: t > salta && t < levanta });
  const sentado = t < levanta;
  const sv = tramo(t, salta, salta + 0.6);
  // el sapo: en el regazo, salta a la alfombra en arco y espera; luego, en la mano
  if (t < coge) { const x = lerp(48, 130, sv) + Math.round(tramo(t, salta + 1.4, salta + 1.8) * 8), y = lerp(136, 172, sv) - Math.sin(sv * Math.PI) * 26 - (Math.sin(t * 5) > 0.8 && sv >= 1 ? 3 : 0); if (sentado || sv >= 1) PIEZAS_HP.sapo(R, x, y, { dir: sv > 0 ? 1 : -1 }); }
  const nx = sentado ? 30 : Math.round(lerp(84, 112, tramo(t, levanta + 0.1, coge - 0.15)));
  const nev = R.actor(EL.neville, nx, sentado ? 150 : 172, t, { dir: 1, sostiene: sentado ? [nx + 20, 128] : t > coge ? [nx + 20, 156] : false, sorpresa: t > salta && t < coge, sonrisa: t > coge || t < salta - 0.6, anda: !sentado && t < coge - 0.15, salto: !sentado && t < levanta + 0.25 ? 3 : 0 });
  const [mx, my] = nev.mano;
  if (sentado) PIEZAS_HP.carta(R, mx + 2, my + 5, {});
  else { PIEZAS_HP.carta(R, 96, 174, {}); if (t > coge) PIEZAS_HP.sapo(R, mx + 1, my + 3, { dir: -1 }); }
  if (t > salta && t < levanta) R.icono('!', 42, 112, hex('#fff0a0'), K);
  T.hogwartsDelante(R, t, { encuadre: 'sala', camara: 'chimenea' });
  if (!sentado && t < coge) PIEZAS_HP.sapo(R, lerp(130, 138, tramo(t, salta + 1.4, salta + 1.8)), 172 - (Math.sin(t * 6) > 0.7 ? 2 : 0), { dir: 1 });
};
// el plano 4: Neville y su abuela delante del escaparate
const paran = a(0.83), hombro = a(0.9), entran = a(0.94);
const sombreroBuitre = (x, y, t) => {
  // el sombrero alto verde con su cinta y, encima, el buitre disecado (cabeza pelada, pico curvo)
  R.rect(x - 7, y - 1, x + 7, y + 1, K); R.rect(x - 6, y, x + 6, y, hex('#3e5a36'));
  R.rect(x - 5, y - 10, x + 5, y - 1, K); R.rect(x - 4, y - 9, x + 4, y - 1, hex('#4a6a40')); R.rect(x - 4, y - 3, x + 4, y - 2, hex('#8a2a2a')); R.rect(x + 2, y - 9, x + 4, y - 4, hex('#3a5432'));
  R.rect(x - 5, y - 15, x + 3, y - 10, K); R.rect(x - 4, y - 14, x + 2, y - 10, hex('#6a6058')); R.rect(x - 4, y - 14, x - 1, y - 12, hex('#8a8076'));
  R.rect(x + 2, y - 19, x + 6, y - 14, K); R.rect(x + 3, y - 18, x + 5, y - 15, hex('#e0a0a0')); R.pset(x + 4, y - 17, K); R.pset(x + 6, y - 15, hex('#e8c040')); R.pset(x + 7, y - 15, hex('#e8c040'));
  R.pset(x - 6, y - 12, hex('#4a4038')); R.pset(x - 7, y - 11, hex('#4a4038'));
};
const p4 = (t) => {
  const g = T.diagon(R, t, { encuadre: 'calle', camara: 'escaparate' });
  // en el escaparate, entre los sombreros, otro sombrero con buitre en su peana (recortado al cristal)
  const [ex0, ey0, ex1, ey1] = g.escaparate ?? [26, 41, 244, 127];
  R.recorte([ex0, ey0, ex1, ey1]);
  R.linea(200, 126, 200, 98, hex('#5a3a22')); R.linea(196, 126, 204, 126, hex('#5a3a22'));
  sombreroBuitre(200, 97, t);
  R.recorte(null);
  const w = tramo(t, P4 + 0.1, paran), z = tramo(t, entran, entran + 0.9);
  const ax = Math.round(lerp(-30, 150, w) + lerp(0, 104, z)), nx = ax - 20;
  const enHombro = t > hombro && t < entran + 0.1;
  const ab = R.actor(EL.abuela, ax, 164, t, { dir: z > 0 || w < 1 ? 1 : -1, anda: (w > 0 && w < 1) || (z > 0 && z < 1), pal: { C: '#3e5a36', c: '#2c4228', o: '#8a2a2a' }, sostiene: enHombro ? [nx + 14, 140] : false, sonrisa: t > hombro, habla: t > paran && t < hombro && Math.sin(t * 9) > 0 });
  sombreroBuitre(ab.cabeza[0], ab.cabeza[1] + 2, t);
  R.actor(EL.nevilleSapo, nx, 164, t, { dir: t > paran && t < entran ? 1 : 1, anda: (w > 0 && w < 1) || (z > 0 && z < 1), sonrisa: t > hombro, dedo: t > paran + 0.2 && t < hombro });
  T.diagonDelante(R, t, { encuadre: 'calle', camara: 'escaparate' });
};
const efectos = [[0.4, 'carro'], [enseña + 0.1, 'pop'], [entra, 'whoosh'], [ojo, 'boing'], [salta, 'pop'], [coge, 'pop'], [entran + 0.6, 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1997 });
''')

E['hp-banco'] = ('El banco', '''// HP-BANCO (frase 26), sin cartela; 1997 en la barra y, en la librería del final, de 1999 (libro 3) a 2007 (el último).
// Seis planos:
// 1. Las cuevas de las cámaras: la vagoneta baja por la vía con el duende, Harry y Hagrid y frena en el andén; el duende
//    salta, abre la puerta redonda del 713 en «Vault 713» (polvo) y Hagrid coge del suelo el paquetito y lo enseña.
//    Corta en «and».
// 2. El vestíbulo de mármol: el duende guía a Hagrid (con el paquete) y a Harry hacia la salida; en «Griphook» se vuelve y
//    señala; en «final book» le sale encima un «7» dorado. Corta en «When».
// 3. El aula del espejo: Harry mira el espejo; Dumbledore entra y le habla; en «sees himself» aparece en el cristal su
//    reflejo, con algo en las manos. Corta en «woollen».
// 4. El espejo de cerca (gag 7): Dumbledore levanta los calcetines de lana (y su reflejo también); la snitch llega, le roba
//    uno y se lo pone de gorro, feliz; en «doesn't quite believe him» el reflejo tiembla y la snitch pone cara de «?».
// 5. El campo de quidditch de día: el padre de Harry, en escoba, baja en picado y desvía de un golpe una bludger que iba
//    hacia un Snape jovencito que lee por el campo («saved Snape's life»); luego sube persiguiendo a la snitch, que se le
//    escapa. Corta en «in».
// 6. Una librería: siete libros de pie en la mesa; en «Book 3» sube y brilla el tercero (con su «3»); en «the last one»,
//    el séptimo («7»), y la snitch se posa encima; una lectora se acerca a mirarlos.''', AYUDAS + r'''
import * as J from '/atomo/plato/escenas/jh-comun.js';
const a = (f) => en('banco', f);
const P2 = a(0.194), P3 = a(0.366), P4 = a(0.513), P5 = a(0.684), P6 = a(0.872);
const paquete = (x, y) => { R.rect(x - 5, y - 6, x + 5, y, K); R.rect(x - 4, y - 5, x + 4, y - 1, hex('#b8875a')); R.rect(x - 4, y - 5, x + 4, y - 5, hex('#d8a878')); R.rect(x, y - 5, x, y - 1, hex('#f0e0c0')); R.rect(x - 4, y - 3, x + 4, y - 3, hex('#f0e0c0')); R.pset(x, y - 3, hex('#a82a2a')); R.rect(x + 2, y - 4, x + 4, y - 1, hex('#946a44')); };
// el plano 1: la vagoneta, la puerta del 713 y el paquete
const frena = a(0.075), salta = a(0.085), abre = a(0.112), sale = a(0.135), coge = a(0.16);
const p1 = (t) => {
  const carro = lerp(0.22, 1, tramo(t, 0, frena) ** 1.3), ab = tramo(t, abre, abre + 0.8);
  const g = T.diagon(R, t, { encuadre: 'banco', camara: 'camara', carro, abierta: ab });
  const [vx, vy] = T.a_via(carro), tumbo = carro < 1 ? (Math.sin(t * 20) > 0 ? 1 : 0) : 0;
  // el paquetito en el suelo de la cámara, cuando se abre la puerta
  if (ab > 0.6 && t < coge) paquete(262, 138);
  // los de la vagoneta (los pies a 6 px por encima del carril; la vagoneta los tapa)
  const dz = tramo(t, salta, salta + 0.5), dx = Math.round(lerp(vx + 8, 214, dz)), dy = Math.round(lerp(vy - 6 - tumbo, 150, dz) - Math.sin(dz * Math.PI) * 12);
  const hz = tramo(t, sale, sale + 0.7), hx = Math.round(lerp(vx - 26, 236, hz)), hy = Math.round(lerp(vy - 6 - tumbo, 150, hz) - Math.sin(hz * Math.PI) * 6);
  if (hz < 0.02) R.actor(EL.hagrid, hx, hy, t, { dir: 1, sonrisa: true });
  R.actor(EL.harry, vx - 8, vy - 6 - tumbo, t, { dir: 1, sorpresa: ab > 0.2 && t < coge, sonrisa: t > coge + 0.3 });
  if (dz < 0.02) R.actor(EL.duende, vx + 4, vy - 6 - tumbo, t, { dir: 1 });
  T.diagonDelante(R, t, { encuadre: 'banco', camara: 'camara', carro });
  if (dz >= 0.02) R.actor(EL.duende, dx, dy, t, { dir: 1, dedo: t > abre - 0.2 && t < abre + 0.5, sostiene: t > abre + 0.5 && t < coge ? [dx + 18, 128] : false, salto: 0 });
  if (hz >= 0.02) {
    const tiene = t > coge, ag = t > coge - 0.4 && t < coge;
    const h = R.actor(EL.hagrid, hx, hy, t, { dir: t > coge + 0.4 ? -1 : 1, anda: hz > 0 && hz < 1, sostiene: ag ? [hx + 30, 140] : tiene ? [hx + (t > coge + 0.4 ? -8 : 30), 116] : false, sonrisa: tiene });
    if (tiene) paquete(h.mano[0], h.mano[1] + 4);
  }
  if (t > abre + 0.2 && t < coge) R.icono('?', vx - 2, vy - 44, hex('#f8f0d0'), K);
};
// el plano 2: el vestíbulo, el duende guía y el «7»
const gira = a(0.249), siete = a(0.322);
const p2 = (t) => {
  T.diagon(R, t, { encuadre: 'banco' });
  const u = tramo(t, P2 + 0.1, gira), v = tramo(t, gira + 0.9, P3);
  const gx = Math.round(lerp(118, 40, u) + lerp(0, -26, v));
  R.actor(EL.duende, 252, 132, t, { dir: -1, habla: Math.sin(t * 3) > 0.6 });
  const hgx = gx + 22, hrx = gx + 50, andan = (u > 0 && u < 1) || (v > 0 && v < 1);
  const h = R.actor(EL.hagrid, hgx, 162, t, { dir: -1, anda: andan, sostiene: [hgx - 4, 130], sonrisa: !andan });
  paquete(h.mano[0], h.mano[1] + 4);
  R.actor(EL.harry, hrx, 162, t, { dir: -1, anda: andan, sonrisa: t > siete });
  const vuelto = u >= 1 && v === 0;
  R.actor(EL.duende, gx, 162, t, { dir: vuelto ? 1 : -1, anda: andan, dedo: vuelto, habla: vuelto && Math.sin(t * 10) > 0 });
  const s = tramo(t, siete, siete + 0.35);
  if (s > 0) { const y = Math.round(lerp(150, 120, s)); halo(gx + 8, y - 6, 10, hex('#ffe890'), 0.5 * s); R.numero('7', gx + 8, y, { centro: true, tam: 16 }); }
  T.diagonDelante(R, t, { encuadre: 'banco' });
};
// el plano 3: el espejo en el aula vacía; Dumbledore llega y le habla a Harry
const llega = a(0.398), refleja = a(0.413);
const reflejoD = (s) => (R, t, [x0, y0, x1, y1]) => {
  if (s <= 0) return;
  const cx = (x0 + x1) >> 1;
  halo(cx, y1 - 26, 30, hex('#f0d8ff'), 0.25 * s);
  const r = R.actor(EL.dumbledore, cx - 8, y1 - 4, t, { dir: 1, sonrisa: true, sostiene: [cx + 10, y1 - 22] });
  PIEZAS_HP.calcetin(R, r.mano[0], r.mano[1] + 6, {}); PIEZAS_HP.calcetin(R, r.mano[0] + 5, r.mano[1] + 7, {});
  if (s < 1) for (let y = y0; y <= y1; y += 2) for (let x = x0; x <= x1; x++) if (((x * 7 + y * 3) % 10) / 10 > s) R.pset(x, y, mix(R.pget(x, y), hex('#2a2440'), 0.7));
};
const p3 = (t) => {
  const s = tramo(t, refleja, refleja + 0.7);
  T.hogwarts(R, t, { encuadre: 'espejo', reflejo: reflejoD(s) });
  const dx = Math.round(lerp(330, 204, tramo(t, P3 + 0.05, llega)));
  R.actor(EL.harry, 100, 166, t, { dir: t > llega - 0.3 && t < refleja + 0.4 ? 1 : 1, sorpresa: s > 0 && s < 1, sonrisa: s >= 1, habla: t > llega && t < refleja && Math.sin(t * 9) > 0 });
  R.actor(EL.dumbledore, dx, 166, t, { dir: -1, anda: t < llega, habla: t > refleja && Math.sin(t * 8) > -0.2, dedo: t > a(0.45) });
  T.hogwartsDelante(R, t, { encuadre: 'espejo' });
};
// el plano 4: el espejo de cerca, los calcetines y la snitch con su gorro
const roba = a(0.575), puesto = a(0.6), duda = a(0.62);
const p4 = (t) => {
  const tiembla = t > duda && t < duda + 1.2;
  T.hogwarts(R, t, { encuadre: 'espejo', camara: 'cerca', reflejo: (R, t, q) => { reflejoD(1)(R, t, q); if (tiembla) { const [x0, y0, x1, y1] = q; for (let y = y0; y <= y1; y += 3) { const d = Math.round(Math.sin(y * 0.3 + t * 30) * 2); for (let x = x0; x <= x1; x++) if ((x + y) % 5 === 0) R.pset(x + d, y, mix(R.pget(x, y), hex('#e8e0ff'), 0.3)); } } } });
  const d = R.actor(EL.dumbledore, 44, 176, t, { dir: 1, sostiene: [74, 150], sonrisa: t < roba || t > puesto + 0.4, sorpresa: t > roba && t < puesto + 0.4 });
  const [mx, my] = d.mano;
  PIEZAS_HP.calcetin(R, mx + 1, my + 9, {});
  if (t < roba) PIEZAS_HP.calcetin(R, mx + 6, my + 10, {});
  // la snitch: llega, coge el segundo calcetín y se lo pone de gorro
  const v = tramo(t, a(0.55), roba), w = tramo(t, roba, puesto);
  let sx = lerp(330, mx + 8, v), sy = lerp(70, my + 4, v);
  if (w > 0) { sx = lerp(mx + 8, 196, w); sy = lerp(my + 4, 92, w) - Math.sin(w * Math.PI) * 24; }
  if (t > puesto) { sx = 196 + Math.sin(t * 2) * 4; sy = 92 + Math.sin(t * 3.3) * 3; }
  if (v > 0) {
    const cara = t > duda ? (Math.sin(t * 2) > 0 ? 'normal' : 'feliz') : t > puesto ? 'feliz' : 'normal';
    halo(sx, sy - 4, 14, hex('#fff0b0'), 0.25);
    const sn = T.snitch(R, Math.round(sx), Math.round(sy), t, { cara });
    if (w > 0 && w < 1) PIEZAS_HP.calcetin(R, Math.round(sx) + 1, Math.round(sy) + 9, {});
    if (t >= puesto) PIEZAS_HP.calcetin(R, Math.round(sx) - 1, Math.round(sy) - 6, { dir: -1 });
    if (t > duda) R.icono('?', Math.round(sx) + 12, Math.round(sy) - 22, hex('#f8f0d0'), K, 2);
  }
  T.hogwartsDelante(R, t, { encuadre: 'espejo', camara: 'cerca' });
};
// el plano 5: el campo de quidditch, la bludger y la escoba en picado
const pica = a(0.735), salva = a(0.764), persigue = a(0.8);
const vuela = (def, bx, by, t, o = {}) => { R.actor(def, bx - 8, by + 8, t, { quieto: true, ...o }); PIEZAS_HP.escoba(R, bx, by + 2, { dir: o.dir ?? 1 }); };
const p5 = (t) => {
  T.exterior(R, t, { encuadre: 'quidditch' });
  // Snape joven, leyendo, cruza el campo
  const sw = tramo(t, P5, salva - 0.2), sxp = Math.round(lerp(250, 190, sw));
  const sn = R.actor(EL.snape, sxp, 166, t, { dir: -1, anda: sw > 0 && sw < 1, sostiene: t < salva - 0.1 ? [sxp - 6, 146] : false, sorpresa: t > salva - 0.3 && t < salva + 0.8, enfado: t > salva + 0.8 });
  if (t < salva - 0.1) PIEZAS_HP.libro(R, sn.mano[0], sn.mano[1] + 6, {});
  else PIEZAS_HP.libro(R, sxp + 18, 166, {});
  // la bludger: sale del baúl y va derecha a Snape; el golpe la manda al cielo
  const bv = tramo(t, a(0.71), salva), bw = tramo(t, salva, salva + 0.9);
  if (bv > 0) { const x = bw > 0 ? lerp(sxp - 8, 120, bw) : lerp(66, sxp - 8, bv), y = bw > 0 ? lerp(150, 20, bw) : lerp(158, 150, bv) - Math.sin(bv * Math.PI) * 24; if (bw < 1) { R.disco(Math.round(x), Math.round(y), 4, K); R.disco(Math.round(x), Math.round(y), 3, hex('#3a3440')); R.pset(Math.round(x) - 1, Math.round(y) - 2, hex('#8a8494')); if (bw > 0) for (let k = 1; k < 4; k++) R.pset(Math.round(x + k * 3), Math.round(y + k * 6), hex('#f0f0f0')); } }
  if (t > salva && t < salva + 0.25) for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4; R.pset(Math.round(sxp - 8 + Math.cos(an) * 7), Math.round(150 + Math.sin(an) * 7), hex('#fff0a0')); }
  // el padre de Harry en escoba: cruza alto, baja en picado, desvía la bludger y sube tras la snitch
  let jx, jy, dir = 1;
  if (t < pica) { const u = tramo(t, P5, pica); jx = lerp(-20, 150, u); jy = 70 + Math.sin(u * 6) * 4; }
  else if (t < salva + 0.2) { const u = tramo(t, pica, salva + 0.2); jx = lerp(150, sxp - 24, u); jy = lerp(70, 140, u * u); }
  else { const u = tramo(t, salva + 0.2, P6); jx = lerp(sxp - 24, 250, u); jy = lerp(140, 80, Math.sqrt(u)); }
  // la snitch que se le escapa
  if (t > persigue) { const u = tramo(t, persigue, P6); const sx = jx + 26 + Math.sin(t * 7) * 6, sy = jy - 10 + Math.sin(t * 11) * 5; T.snitch(R, Math.round(sx), Math.round(sy), t, { cara: 'feliz' }); }
  vuela(EL.harry, Math.round(jx), Math.round(jy), t, { dir, dedo: t > persigue, sonrisa: t > salva });
};
// el plano 6: la librería con los siete libros
const tres = a(0.88), siete7 = a(0.972), lee = a(0.93);
const p6 = (t) => {
  J.real(R, t, { encuadre: 'libreria', torre: 0.2 });
  R.actor(EL.cajera, 248, 142, t, { dir: -1, habla: t > tres && t < tres + 1 && Math.sin(t * 8) > 0, sonrisa: t > siete7 });
  // los siete libros de pie en la mesa (tapas de colores con su rayo, sin letras)
  const COL = ['#c8283a', '#2e7a4a', '#3a5ac8', '#7a3aa8', '#d8742a', '#2a8a8a', '#c8a030'];
  for (let i = 0; i < 7; i++) {
    const x = 116 + i * 11, sube = i === 2 ? tramo(t, tres, tres + 0.3) * 6 : i === 6 ? tramo(t, siete7, siete7 + 0.3) * 6 : 0, y = Math.round(127 - sube), c = hex(COL[i]);
    if ((i === 2 && t > tres) || (i === 6 && t > siete7)) halo(x + 4, y - 8, 12, hex('#fff0b0'), 0.45);
    R.rect(x, y - 15, x + 9, y, K); R.rect(x + 1, y - 14, x + 8, y - 1, c); R.rect(x + 1, y - 14, x + 8, y - 13, mix(c, hex('#ffffff'), 0.35)); R.rect(x + 7, y - 14, x + 8, y - 1, mix(c, K, 0.3));
    R.pset(x + 5, y - 11, hex('#f8e070')); R.pset(x + 4, y - 10, hex('#f8e070')); R.pset(x + 5, y - 9, hex('#f8e070')); R.pset(x + 4, y - 8, hex('#f8e070'));
    R.rect(x + 2, y - 5, x + 6, y - 5, mix(c, hex('#ffffff'), 0.5));
  }
  const n3 = tramo(t, tres, tres + 0.3); if (n3 > 0) R.numero('3', 144, Math.round(lerp(118, 100, n3)), { centro: true, tam: 16 });
  const n7 = tramo(t, siete7, siete7 + 0.3); if (n7 > 0) R.numero('7', 188, Math.round(lerp(118, 100, n7)), { centro: true, tam: 16 });
  // la lectora entra por la puerta y se acerca a la mesa
  const lv = tramo(t, P6 + 0.2, lee), lx = Math.round(lerp(40, 92, lv));
  R.actor(EL.chica, lx, 166, t, { dir: 1, anda: lv > 0 && lv < 1, sorpresa: t > siete7 && t < siete7 + 0.5, sonrisa: t > siete7 + 0.5, dedo: t > tres + 0.4 && t < tres + 1.4 && lv >= 1 });
  // la snitch: revolotea y acaba posada en el séptimo
  const sv = tramo(t, siete7 - 0.6, siete7 + 0.1), sx = sv > 0 ? lerp(60, 192, sv) : 60 + Math.sin(t * 1.3) * 20, sy = sv > 0 ? lerp(80, 106, sv) : 80 + Math.sin(t * 2.2) * 8;
  T.snitch(R, Math.round(sx), Math.round(sy), t, { cara: t > siete7 ? 'feliz' : 'normal' });
  J.realDelante(R, t, { encuadre: 'libreria', torre: 0.2 });
};
const año = (t) => t < P6 ? 1997 : t < siete7 ? 1999 : 2007;
const efectos = [[0.3, 'carro'], [abre, 'cerrojo'], [coge, 'pop'], [siete, 'brillo'], [refleja, 'brillo'], [roba, 'whoosh'], [puesto, 'pop'], [salva, 'golpecito'], [tres, 'brillo'], [siete7, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año });
''')
