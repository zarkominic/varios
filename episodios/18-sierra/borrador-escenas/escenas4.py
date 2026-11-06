E = {}

# Piezas pequeñas compartidas (se repiten en cada cuerpo porque cada escena es su propia página).
PIEZAS = r'''
const C = T.C;
const K = { k: hex('#1a1420'), blanco: hex('#f2eee2'), oro: hex('#f8d040'), oroS: hex('#c89a28'), rojo: hex('#d83a3a'), rojoS: hex('#981e2a'),
  agua: hex('#cfe8f8'), aguaS: hex('#7ab8e0'), luzC: hex('#fff2b8'), rosa: hex('#f06a8a'), rosaL: hex('#ffb0c4') };
const lin = (t, a0, a1) => Math.max(0, Math.min(1, (t - a0) / (a1 - a0)));
const suave = (u) => u * u * (3 - 2 * u);
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
// un halo de luz que aclara lo de debajo (cx, cy, radio, color, fuerza 0–1), con trama en el borde
const halo = (cx, cy, r, col, a) => {
  cx = Math.round(cx); cy = Math.round(cy);
  for (let y = Math.max(0, cy - r); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, cx - r); x <= Math.min(319, cx + r); x++) {
    const d = Math.hypot(x - cx, y - cy) / r; if (d > 1) continue; const k = a * (1 - d) * (1 - d * 0.3);
    if (k < 0.08 && (x + y) & 1) continue; R.pset(x, y, mez(R.pget(x, y), col, Math.min(0.85, k))); } };
// estrellita de brillo que se abre y se apaga (u 0–1)
const destello = (x, y, u, r = 8, col = K.oro) => {
  if (u <= 0 || u >= 1) return; x = Math.round(x); y = Math.round(y); const d = Math.round(r * Math.sin(u * Math.PI)), e = Math.round(d * 0.6);
  for (let i = -d; i <= d; i++) { R.pset(x + i, y, Math.abs(i) < d * 0.4 ? K.blanco : col); R.pset(x, y + i, Math.abs(i) < d * 0.4 ? K.blanco : col); }
  for (let i = -e; i <= e; i += 2) { R.pset(x + i, y + i, col); R.pset(x + i, y - i, col); }
};
// un corazón de 7 × 6 a escala s con su borde negro y su brillo (x, y: arriba a la izquierda)
const CORAZON = ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...'];
const corazon = (x, y, s = 2, col = K.rojo) => {
  x = Math.round(x); y = Math.round(y);
  const px = (i, j, c, dx = 0, dy = 0) => R.rect(x + i * s + dx, y + j * s + dy, x + i * s + s - 1 + dx, y + j * s + s - 1 + dy, c);
  CORAZON.forEach((f, j) => { for (let i = 0; i < 7; i++) if (f[i] === '#') for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) px(i, j, K.k, dx, dy); });
  CORAZON.forEach((f, j) => { for (let i = 0; i < 7; i++) if (f[i] === '#') px(i, j, j > 2 && i > 3 ? mez(col, K.k, 0.25) : col); });
  px(1, 1, K.blanco); if (s > 1) px(2, 1, mez(col, K.blanco, 0.5));
};
// gotas de agua que caen de alguien que sale del agua (x, y arriba; u 0–1 del goteo)
const goteo = (x, y, t, u) => { if (u <= 0 || u >= 1) return; for (let k = 0; k < 4; k++) { const f = ((t * 1.7 + k * 0.27) % 1); if (f > 1 - u * 0.6) continue;
  const gx = Math.round(x + (k * 5) % 13), gy = Math.round(y + f * 20); R.pset(gx, gy, K.aguaS); R.pset(gx, gy - 1, K.agua); } };
// un farol de mano (x, y: el asa, donde va la mano) que tiembla
const farol = (x, y, t) => {
  x = Math.round(x); y = Math.round(y); const fl = Math.sin(t * 17) > 0.3 ? 1 : 0;
  R.pset(x, y - 1, K.k); R.pset(x - 1, y, K.k); R.pset(x + 1, y, K.k);
  R.rect(x - 3, y + 1, x + 3, y + 2, K.k); R.rect(x - 3, y + 3, x + 3, y + 9, K.k); R.rect(x - 2, y + 3, x + 2, y + 8, fl ? K.luzC : K.oro);
  R.pset(x, y + 5, hex('#f89a30')); R.pset(x, y + 6, hex('#f8c040')); R.rect(x - 3, y + 10, x + 3, y + 10, K.k); R.pset(x - 2, y + 3, K.blanco);
};
'''

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['si-lago'] = ('El lago y el gnomo', '''// SI-LAGO (frases 24–25), sin cartela; año 1984 y, en el último plano, la barra cuenta de 1984 a 1998. Tres planos:
// 1. el lago del reino: Graham nada a braza hacia la orilla (en «swim», chof y ondas), sale chorreando por las piedras
//    («lake»), trepa por el tronco del sauce («climb a tree») y, sentado en la rama, señala a la derecha en «gnome»;
//    corta en el silencio después de «gnome»;
// 2. la orilla del tocón: Graham llega todavía goteando; la puertecita del tocón se abre («the game») y sale el gnomo
//    barbudo; Graham le habla y en su bocadillo se teclea la frase con su cursor («tried to understand»); el gnomo,
//    «?», se rasca la cabeza… y en «typed» lo entiende, «!», y le da una llave dorada que brilla; Graham la levanta;
// 3. la ventana de la oficina de la montaña: «King's Quest was a hit»: globos, banderines, la cola de clientes que
//    crece hasta la tienda y el teléfono que no para; Ken lo celebra con los brazos arriba; entra Roberta con su
//    cuaderno («Roberta kept telling») y, con el bocadillo de la corona («Graham's family»), van apareciendo en el
//    alféizar las cajas con corona numeradas del 1 al 8 mientras la barra del año cuenta 1984 → 1998
//    («almost fifteen years»).''', PIEZAS + r'''
const a = (f) => en('lago', f), b = (f) => en('exito', f);
const P2 = 3.6, P3 = b(0);
const nada = a(0.05), sale = a(0.2), trepa = a(0.257), gnomo = a(0.441), juego = a(0.598), entiende = a(0.701), tecleo = a(0.785), escrito = a(0.905);
const exito = b(0.141), roberta = b(0.267), familia = b(0.564), anos = b(0.753);
// p1 · el lago: nada, sale y trepa al sauce
const p1 = (t) => {
  const g = T.reino(R, t, { encuadre: 'lago' }); const wl = 136;
  const u = suave(lin(t, 0.15, sale)), fuera = lin(t, sale, sale + 0.45), anda = lin(t, sale + 0.45, trepa + 0.35), sube = suave(lin(t, trepa + 0.35, gnomo - 0.15));
  if (fuera === 0) {
    // nadando: la cabeza y los hombros por encima del agua, las ondas y el chapoteo de los brazos
    const gx = Math.round(lerp(176, 84, u)), bra = Math.sin(t * 9) > 0;
    R.recorte([0, 0, 319, wl]); R.actor(EL.graham, gx, wl + 15, t, { dir: -1, quieto: true, habla: false, sonrisa: true }); R.recorte(null);
    for (let k = 0; k < 3; k++) { const r = ((t * 1.4 + k / 3) % 1), w = Math.round(9 + r * 22), c = r < 0.6 ? K.agua : K.aguaS;
      for (let i = -w; i <= w; i += 2) if (Math.abs(i) > 6) R.pset(gx + 7 + i + Math.round(r * 6), wl + 1 + Math.round(r * 2), c); }
    R.rect(gx + 1, wl, gx + 13, wl + 1, K.agua); R.rect(gx + 3, wl + 1, gx + 11, wl + 1, K.aguaS);
    for (const s of [-1, 1]) { const bx = gx + 7 + s * (bra ? 9 : 6), by = wl - (bra ? 3 : 1); R.pset(bx, by, K.blanco); R.pset(bx + s, by - 1, K.agua); R.pset(bx - s, by + 1, K.agua); }
    // el chof al tirarse a nadar
    const ch = lin(t, nada - 0.1, nada + 0.6); if (ch > 0 && ch < 1) for (let k = 0; k < 9; k++) { const ang = Math.PI * (0.15 + k * 0.09), r = ch * 16;
      R.pset(Math.round(gx + 10 + Math.cos(ang) * r), Math.round(wl - Math.sin(ang) * r * 1.1 + ch * ch * 14), k % 2 ? K.blanco : K.agua); }
  } else {
    // sale por las piedras, anda hasta el sauce y trepa por el tronco; en la rama señala hacia la orilla del gnomo
    const x = Math.round(sube > 0 ? 17 : anda > 0 ? lerp(70, 17, anda) : lerp(84, 70, fuera)), y = Math.round(sube > 0 ? lerp(157, 112, sube) : anda > 0 ? 157 : lerp(wl + 15, 157, suave(fuera)));
    const enRama = sube >= 1, trepando = sube > 0 && sube < 1;
    if (enRama) { R.rect(14, 112, 44, 113, hex('#5a3a1a')); R.rect(14, 111, 44, 111, hex('#7a5228')); R.rect(40, 113, 52, 114, hex('#5a3a1a')); }   // la rama donde se sienta
    R.actor(EL.graham, x, y, t, { dir: enRama ? 1 : -1, anda: (anda > 0 && anda < 1), brazos: trepando || (fuera > 0 && fuera < 1), salto: trepando ? Math.round(Math.abs(Math.sin(t * 10)) * 2) : 0,
      dedo: enRama && t > gnomo - 0.2, sonrisa: true, habla: enRama && t > gnomo - 0.2 && Math.sin(t * 9) > 0 });
    goteo(x + 2, y - 18, t, lin(t, sale, gnomo + 0.5));
    if (enRama && t > gnomo - 0.1) R.bocadillo(x + 20, y - 26, { icono: '!' });
  }
};
// la puertecita del tocón (x 191–213, y 132–158, arco arriba) que se abre hacia la izquierda (u 0–1)
const puertaTocon = (u) => {
  const x0 = 191, x1 = 213, y0 = 132, y1 = 157, cx = 202, r = 11, w = Math.round((x1 - x0) * (1 - u));
  if (w <= 1) return;
  for (let y = y0; y <= y1; y++) { const hw = y < y0 + r ? Math.sqrt(Math.max(0, r * r - (y0 + r - y) ** 2)) : r; const a0 = Math.round(cx - hw), a1 = Math.min(Math.round(cx + hw), x0 + w);
    for (let x = Math.max(a0, x0); x <= a1; x++) { const borde = x === Math.max(a0, x0) || x === a1 || y === y0; R.pset(x, y, borde ? K.k : (x - x0) % 5 === 0 ? hex('#5a3418') : (x + y * 3) % 11 === 0 ? hex('#6a4220') : hex('#8a5a2a')); } }
  if (w > 6) { R.disco(x0 + w - 4, 146, 1, K.oro); R.rect(x0 + 1, 138, x0 + Math.min(w, 14), 139, hex('#3a3a3a')); R.rect(x0 + 1, 151, x0 + Math.min(w, 14), 152, hex('#3a3a3a')); }
};
// el bocadillo de escribir: «>», los trazos que se teclean y el cursor
const bocadilloTecleo = (x, y, n, t) => {
  R.rect(x - 1, y - 1, x + 41, y + 11, K.k); R.rect(x, y, x + 40, y + 10, K.blanco); R.rect(x + 6, y + 11, x + 9, y + 12, K.k); R.rect(x + 7, y + 11, x + 8, y + 11, K.blanco); R.pset(x + 7, y + 13, K.k);
  const gr = hex('#3a3a4a'); R.pset(x + 3, y + 3, gr); R.pset(x + 4, y + 4, gr); R.pset(x + 5, y + 5, gr); R.pset(x + 4, y + 6, gr); R.pset(x + 3, y + 7, gr);
  let cx = x + 9; for (let k = 0; k < n && cx < x + 36; k++) { if (k % 5 !== 4) R.rect(cx, y + 4, cx + 1, y + 7, k % 3 ? gr : hex('#5a5a7a')); cx += 3; }
  if (Math.floor(t * 4) % 2) R.rect(cx, y + 7, cx + 2, y + 7, gr);
};
// la llave dorada (x, y: el ojo)
const llave = (x, y, u = 0) => { x = Math.round(x); y = Math.round(y);
  R.disco(x, y, 3, K.k); R.disco(x, y, 2, K.oro); R.pset(x, y, K.k); R.rect(x + 3, y - 1, x + 11, y + 1, K.k); R.rect(x + 3, y, x + 10, y, K.oro);
  R.rect(x + 8, y + 1, x + 9, y + 3, K.k); R.pset(x + 8, y + 2, K.oro); R.rect(x + 11, y + 1, x + 12, y + 3, K.k); R.pset(x - 1, y - 2, K.blanco); };
// p2 · la orilla del tocón: sale el gnomo, Graham teclea su pregunta y el gnomo le da la llave
const p2 = (t) => {
  const o = { encuadre: 'lago', camara: 'orilla' }; const g = T.reino(R, t, o);
  const llega = suave(lin(t, P2, P2 + 0.95)), gx = Math.round(lerp(92, 146, llega));
  const abre = suave(lin(t, juego - 0.25, juego + 0.15)), saleG = suave(lin(t, juego + 0.15, juego + 0.6)), nx = Math.round(lerp(196, 170, saleG));
  const da = lin(t, escrito + 0.35, escrito + 0.85), tiene = t > escrito + 0.85;
  // dentro del tocón, a oscuras, el gnomo espera; luego sale
  if (abre > 0) { if (saleG < 0.4) R.recorte([191, 120, 213, 160]);
    const rG = R.actor(EL.gnomo, nx, 158, t, { dir: -1, anda: saleG > 0 && saleG < 1, sorpresa: t > entiende && t < escrito, sonrisa: t >= escrito, brazos: t > escrito && t < escrito + 0.35,
      dedo: t > entiende - 0.3 && t < entiende + 0.3, sostiene: t > escrito + 0.3 && !tiene ? [nx - 6, 140] : false });
    R.recorte(null);
    if (rG && rG.mano && da > 0 && !tiene) llave(lerp(rG.mano[0] - 6, gx + 16, da), lerp(rG.mano[1] - 1, 138, da) - Math.sin(da * Math.PI) * 6);
  }
  puertaTocon(abre);
  T.reinoDelante(R, t, o);
  const rg = R.actor(EL.graham, gx, 160, t, { dir: 1, anda: llega > 0 && llega < 1, habla: t > juego + 0.4 && t < escrito && Math.sin(t * 10) > 0, sonrisa: t > escrito,
    sostiene: tiene ? [gx + 13, 128] : false, salto: tiene && t < escrito + 1.25 ? Math.round(Math.sin(lin(t, escrito + 0.85, escrito + 1.25) * Math.PI) * 4) : 0 });
  goteo(gx + 2, 138, t, lin(t, P2 - 0.5, P2 + 1.6));
  if (tiene && rg && rg.mano) { llave(rg.mano[0] - 2, rg.mano[1] - 4); destello(rg.mano[0] + 6, rg.mano[1] - 10, lin(t, escrito + 0.9, escrito + 1.6), 9); }
  // la frase que se teclea encima de Graham; el gnomo, «?» y luego «!»
  if (t > juego + 0.35 && t < escrito + 0.3) bocadilloTecleo(gx - 14, 94, Math.floor((t - juego - 0.35) * 9), t);
  if (t > entiende + 0.1 && t < escrito) R.bocadillo(nx + 9, 124, { icono: '?' });
  if (t >= escrito && t < escrito + 0.8) R.bocadillo(nx + 9, 124 - Math.round(lin(t, escrito, escrito + 0.15) * 3), { icono: '!' });
};
// p3 · la ventana de la oficina: el éxito; las ocho cajas con corona y los años
const AÑOS = [1984, 1985, 1986, 1988, 1990, 1992, 1994, 1998];
const TCAJA = [P3 + 0.12, exito + 0.05, roberta + 0.6, roberta + 1.25, familia - 0.15, familia + 0.5, anos + 0.1, anos + 0.75];
const nCajas = (t) => TCAJA.filter((x) => t >= x).length;
const COLS = [hex('#c83a3a'), hex('#3a5ab0'), hex('#2a8a5a'), hex('#8a3a9a'), hex('#c8782a')];
const p3 = (t) => {
  const n = Math.max(1, nCajas(t)), cel = n / 9 + 0.01;
  const g = T.oficina(R, t, { encuadre: 'oficina', camara: 'ventana', epoca: 1984, celebra: cel });
  // la cifra de cada caja (del 1 al 8) encima de la del decorado, que salta un poco al llegar
  for (let i = 0; i < n; i++) { const fila = i < 5 ? 0 : i < 8 ? 1 : 2, col = fila === 0 ? i : fila === 1 ? i - 5 : 0, x = 50 + col * 16 + fila * 8, y0 = 122 - 12 - fila * 13;
    const b = lin(t, TCAJA[i], TCAJA[i] + 0.3), y = y0 - Math.round(Math.sin(b * Math.PI) * 5);
    T.d_cajaCorona(R, x, y, 15, 12, i + 1, COLS[i % 5]); destello(x + 7, y - 3, lin(t, TCAJA[i], TCAJA[i] + 0.45), 6); }
  // Ken, a la izquierda, lo celebra; Roberta entra por la derecha con su cuaderno y cuenta la historia
  const hurra = t > exito - 0.1 && t < roberta + 0.2;
  R.actor(EL.ken, 8, 168, t, { dir: 1, brazos: hurra && Math.sin(t * 8) > -0.3, salto: hurra ? Math.round(Math.abs(Math.sin(t * 8)) * 4) : 0, sonrisa: t > exito - 0.2, sorpresa: t > anos + 0.6, habla: !hurra && t > familia && Math.sin(t * 7) > 0.4 });
  const ent = suave(lin(t, roberta - 0.3, roberta + 0.55)), rx = Math.round(lerp(330, 252, ent));
  if (ent > 0) {
    const señala = t > familia - 0.2 && Math.floor((t - familia) * 1.4) % 2 === 0;
    const rr = R.actor(EL.roberta, rx, 168, t, { dir: -1, anda: ent < 1, sostiene: !señala ? true : false, dedo: señala, habla: ent >= 1 && Math.sin(t * 8) > 0, sonrisa: true });
    if (rr && rr.mano && !señala) { const [mx, my] = rr.mano; R.rect(mx - 6, my - 7, mx + 1, my + 2, K.k); R.rect(mx - 5, my - 6, mx, my + 1, hex('#f4ead2')); R.rect(mx - 5, my - 6, mx - 5, my + 1, hex('#c83a3a'));
      for (let j = my - 4; j <= my; j += 2) R.rect(mx - 3, j, mx - 1, j, hex('#8a8aa0')); }
    if (t > familia - 0.1 && t < familia + 1.3) { R.bocadillo(rx + 4, 128, {}); R.rect(rx, 120, rx + 7, 125, hex('#f2eee2')); R.icono('corona', rx + 1, 120, K.oroS, K.oroS); }
  }
};
const año = (t) => t < P3 ? 1984 : AÑOS[Math.max(1, nCajas(t)) - 1];
const efectos = [[nada, 'chof'], [sale + 0.1, 'ola'], [juego - 0.2, 'puerta'], [juego + 0.4, 'tecleo'], [escrito, 'pop'], [escrito + 0.9, 'brillo'], [exito, 'publico'], [exito + 0.5, 'ring'], [familia - 0.15, 'pop'], [anos + 0.75, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['si-goose'] = ('Mixed-Up Mother Goose', '''// SI-GOOSE (frases 26–27), 1987, sin cartela. Tres planos:
// 1. (fondo local) el libro de canciones infantiles sobre la mesa de un cuarto de niños, visto desde arriba: el libro se
//    abre solo en «1987» (papel); en «something different» los dibujos cobran vida con un destello (las estrellas
//    titilan, la vaca salta la luna, sale humo del zapato); en «Mother Goose» la oca con cofia sale del dibujo, salta a
//    la mesa y bate las alas; alrededor, los cubos 1-9-8-7, ceras, el vaso de leche, el disquete y una mariquita que
//    cruza; corta en «A game»;
// 2. el pueblo de las canciones: la pastora busca a su oveja («?»); la niña llega con el corderito en brazos y se lo
//    devuelve en «returned» (corazón); la vaca salta por encima de la luna en «nursery rhyme»; el plato y la cuchara
//    cruzan corriendo de la mano; la señora del zapato saluda desde su puerta en «homes»; el gato toca el violín;
//    corta en el silencio antes de «It was»;
// 3. el corro de la plaza: los cuatro bailan alrededor del mayo con el corderito en medio; en «nobody could die»
//    aparecen en el cielo una calavera tachada y un corazón que laten, y todos saltan con los brazos arriba.''', PIEZAS + r'''
const a = (f) => en('goose', f), b = (f) => en('nadie', f);
const P2 = a(0.507) - 0.08, P3 = b(0) - 0.15;
const abre = a(0.021), vivo = a(0.195), oca = a(0.39), vuelve = a(0.677), rima = a(0.725), casas = a(0.906), nadie = b(0.634);
// ── p1 · el libro sobre la mesa (fondo local) ──
let MESA = null;
const mesa = () => {
  if (!MESA) { MESA = R.nuevo(); const prev = R.usar(MESA);
    const tabla = [hex('#c8945a'), hex('#be8a50'), hex('#cc9a62'), hex('#c28e56'), hex('#c69258')];
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
      const p = Math.floor(y / 36), yy = y % 36, base = tabla[p];
      const veta = Math.sin(x * 0.045 + p * 2.1 + Math.sin(x * 0.013 + p) * 3 + yy * 0.32) ;
      let c = veta > 0.86 ? mez(base, hex('#8a5a2a'), 0.45) : veta > 0.6 ? mez(base, hex('#8a5a2a'), 0.18) : veta < -0.92 ? mez(base, hex('#f0c890'), 0.25) : base;
      if (yy === 0) c = hex('#6a4220'); else if (yy === 1) c = mez(base, hex('#6a4220'), 0.5); else if (yy === 35) c = mez(base, hex('#f0c890'), 0.3);
      const nud = [[48, 20], [250, 92], [120, 166], [300, 140]].find(([nx, ny]) => Math.hypot((x - nx) * 0.7, y - ny) < 4);
      if (nud) { const d = Math.hypot((x - nud[0]) * 0.7, y - nud[1]); c = d < 1.5 ? hex('#5a3418') : mez(base, hex('#7a4a20'), 0.5); }
      // la luz de la lámpara: un círculo cálido en el centro y las esquinas en penumbra
      const l = Math.hypot((x - 168) / 190, (y - 86) / 120); c = l < 0.62 ? mez(c, hex('#ffe8b0'), 0.12) : l > 1 ? mez(c, hex('#2a1810'), Math.min(0.35, (l - 1) * 0.8)) : c;
      if (l > 0.55 && l < 0.66 && (x + y) % 2) c = mez(c, hex('#ffe8b0'), 0.06);
      R.pset(x, y, c);
    }
    // el disquete (arriba a la izquierda), las ceras (abajo a la izquierda), el vaso de leche (a la derecha), un dibujo
    const dq = [6, 22]; R.rect(dq[0], dq[1], dq[0] + 34, dq[1] + 34, K.k); R.rect(dq[0] + 1, dq[1] + 1, dq[0] + 33, dq[1] + 33, hex('#2a2a32'));
    R.rect(dq[0] + 4, dq[1] + 3, dq[0] + 30, dq[1] + 10, K.blanco); R.rect(dq[0] + 4, dq[1] + 3, dq[0] + 30, dq[1] + 4, K.rojo); for (let j = 6; j <= 9; j += 2) R.rect(dq[0] + 6, dq[1] + j, dq[0] + 24, dq[1] + j, hex('#9a9ab0'));
    R.disco(dq[0] + 17, dq[1] + 21, 6, hex('#14141a')); R.disco(dq[0] + 17, dq[1] + 21, 3, hex('#5a5a66')); R.disco(dq[0] + 17, dq[1] + 21, 1, hex('#14141a')); R.rect(dq[0] + 15, dq[1] + 27, dq[0] + 19, dq[1] + 33, hex('#14141a'));
    R.rect(dq[0] + 33, dq[1] + 5, dq[0] + 34, dq[1] + 9, mez(hex('#c8945a'), K.k, 0.2)); R.rect(dq[0] + 3, dq[1] + 35, dq[0] + 36, dq[1] + 36, mez(hex('#c8945a'), K.k, 0.35));
    const cera = (x, y, col, l) => { R.rect(x - 1, y - 1, x + l + 1, y + 4, K.k); R.rect(x, y, x + l, y + 3, col); R.rect(x + 4, y, x + l - 6, y + 3, mez(col, K.blanco, 0.55)); R.rect(x, y, x + l, y, mez(col, K.blanco, 0.3));
      R.pset(x + l + 2, y + 1, K.k); R.pset(x + l + 2, y + 2, K.k); R.pset(x + l + 3, y + 1, col); R.rect(x, y + 5, x + l + 2, y + 5, mez(hex('#c8945a'), K.k, 0.3)); for (let i = x + 6; i < x + l - 6; i += 4) R.pset(i, y + 1, mez(col, K.k, 0.3)); };
    cera(8, 150, hex('#d83a3a'), 26); cera(12, 160, hex('#3a7ad8'), 24); cera(6, 170, hex('#f8c030'), 28);
    // la hoja con el dibujo de un castillo, debajo de las ceras
    R.rect(40, 116, 72, 146, mez(hex('#c8945a'), K.k, 0.35)); R.rect(38, 114, 70, 144, K.blanco); R.rect(38, 114, 70, 114, hex('#d8d0b8'));
    R.rect(46, 126, 62, 138, hex('#9a9aa8')); R.rect(44, 122, 48, 138, hex('#8a8a98')); R.rect(60, 122, 64, 138, hex('#8a8a98')); R.rect(52, 132, 56, 138, hex('#5a3a1a'));
    for (const xx of [44, 48, 60, 64]) R.pset(xx, 121, hex('#8a8a98')); R.rect(42, 119, 50, 121, hex('#3a5ab0')); R.rect(58, 119, 66, 121, hex('#3a5ab0')); R.rect(40, 139, 68, 141, hex('#5ab04a'));
    // el vaso de leche con su pajita (a la derecha, por debajo de la zona de Atom)
    R.disco(300, 84, 13, mez(hex('#c8945a'), K.k, 0.3)); R.disco(298, 80, 12, K.k); R.disco(298, 80, 11, hex('#dfe8f0')); R.disco(298, 80, 9, hex('#fbfbf6')); R.disco(296, 78, 3, K.blanco);
    R.linea(300, 78, 312, 60, K.k); R.linea(301, 78, 313, 60, hex('#e84a6a')); R.linea(302, 79, 314, 61, K.k);
    // la caja del juego de 1987 que asoma por abajo a la derecha (un libro con una oca dibujada)
    R.rect(250, 158, 319, 179, K.k); R.rect(251, 159, 319, 179, hex('#3a8ac8')); R.rect(251, 159, 319, 160, hex('#6ab0e8'));
    R.disco(278, 170, 6, K.blanco); R.rect(283, 166, 287, 167, hex('#f0a030')); R.pset(279, 168, K.k); R.rect(272, 163, 280, 165, hex('#e84a6a'));
    for (let x = 292; x < 318; x += 4) R.rect(x, 168, x + 2, 169, hex('#f2eee2')); R.rect(292, 173, 312, 173, hex('#f8d040'));
    R.usar(prev); }
  R.copiar(MESA);
};
// la oca de las canciones con su cofia (x, y: las patas; s escala; aleteo; dir)
const ocaDibujo = (x, y, t, o = {}) => {
  const s = o.s ?? 1, d = o.dir ?? 1, al = o.aletea ? (Math.sin(t * 22) > 0 ? -1 : 1) : 0, X = (i) => Math.round(x + d * i * s), Y = (j) => Math.round(y + j * s);
  const P = (i, j, c) => R.rect(Math.min(X(i), X(i) + d * (s - 1)), Y(j), Math.max(X(i), X(i) + d * (s - 1)), Y(j) + s - 1, c);
  const bl = hex('#f8f8f2'), bS = hex('#c8c8d8'), na = hex('#f0902a'), co = hex('#5a8ad8');
  for (let i = -6; i <= 5; i++) for (let j = -9; j <= -2; j++) { const e = (i * i) / 36 + ((j + 5.5) * (j + 5.5)) / 13; if (e <= 1.15) P(i, j, e > 0.85 ? K.k : j > -4 ? bS : bl); }
  for (let j = -16; j <= -8; j++) { P(3, j, K.k); P(4, j, bl); P(5, j, j < -13 ? bl : K.k); }   // el cuello
  for (let i = 2; i <= 7; i++) for (let j = -20; j <= -15; j++) if ((i - 4.5) ** 2 / 7 + (j + 17.5) ** 2 / 7 <= 1) P(i, j, bl);
  P(6, -18, K.k); P(8, -17, na); P(9, -17, na); P(8, -16, na);   // el ojo y el pico
  for (let i = 1; i <= 8; i++) P(i, -21, co); for (let i = 2; i <= 7; i++) P(i, -22, co); P(1, -20, co); P(1, -19, co); P(0, -18, co); P(-1, -17, hex('#e84a6a'));   // la cofia y su lazo
  for (let i = -4; i <= 1; i++) P(i, -7 + al - (i > -2 ? 1 : 0), bS); P(-5, -8 + al * 2, bS); P(-6, -9 + al * 3, bS);   // el ala
  P(-1, -1, na); P(-1, 0, na); P(-2, 0, na); P(2, -1, na); P(2, 0, na); P(3, 0, na);   // las patas
};
// la vaca pequeña del dibujo (x, y: patas)
const vaquita = (x, y) => { x = Math.round(x); y = Math.round(y);
  R.rect(x - 5, y - 6, x + 4, y - 2, K.k); R.rect(x - 4, y - 5, x + 3, y - 3, K.blanco); R.pset(x - 2, y - 4, K.k); R.pset(x + 1, y - 5, K.k);
  R.rect(x + 4, y - 7, x + 6, y - 4, K.blanco); R.pset(x + 6, y - 6, K.k); R.pset(x - 4, y - 1, K.k); R.pset(x + 3, y - 1, K.k); R.pset(x - 2, y - 1, K.k); R.pset(x + 1, y - 1, K.k); R.pset(x + 5, y - 8, K.k); };
const PAG = { x0: 54, x1: 266, sp: 160, y0: 30, y1: 150 };
const arriba = (x) => PAG.y0 + Math.round(5 * (1 - Math.abs(x - PAG.sp) / 106) ** 3), abajo = (x) => PAG.y1 + Math.round(3 * (1 - Math.abs(x - PAG.sp) / 106) ** 3);
const pagina = (xa, xb, t, viva, lado) => {
  // el bloque de hojas (cantos) y la tapa roja por debajo
  for (let x = xa - 3; x <= xb + 3; x++) { const y0 = arriba(Math.min(Math.max(x, PAG.x0), PAG.x1)) - 2, y1 = abajo(Math.min(Math.max(x, PAG.x0), PAG.x1)) + 4; R.rect(x, y0, x, y1, x === xa - 3 || x === xb + 3 ? K.k : hex('#a82a2a')); }
  for (let x = xa; x <= xb; x++) { const y0 = arriba(x), y1 = abajo(x), cerca = 1 - Math.min(1, Math.abs(x - PAG.sp) / 12);
    for (let y = y0; y <= y1; y++) { let c = (x * 7 + y * 13) % 29 === 0 ? hex('#ece0c0') : hex('#f6eed6'); if (cerca > 0) c = mez(c, hex('#a89070'), cerca * 0.55); if (y === y0 || x === xa || x === xb) c = hex('#b8a888'); R.pset(x, y, c); }
    for (const dy of [1, 2]) R.pset(x, abajo(x) + dy, (x + dy) % 3 ? hex('#e8dcc0') : hex('#c8b898')); }
  // los renglones (trazos, sin letras) debajo del dibujo
  const lx0 = lado < 0 ? 68 : 172, lx1 = lado < 0 ? 148 : 252;
  for (let j = 0; j < 4; j++) { const y = 120 + j * 7; let x = lx0 + (j === 0 ? 6 : 0); while (x < lx1 - (j === 3 ? 30 : 0)) { const w = 4 + ((x * 7 + j * 5) % 9); R.rect(x, y, Math.min(lx1, x + w), y + 1, hex('#8a7e6a')); x += w + 3; } }
  R.numero(lado < 0 ? '12' : '13', lado < 0 ? 64 : 248, 146, { fina: true });
};
const dibujoIzq = (t, viva) => {
  const x0 = 68, y0 = 44, x1 = 148, y1 = 110; R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, K.k); R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, y > 98 + Math.round(Math.sin(x * 0.12) * 2) ? (x + y) % 3 ? hex('#3a8a3a') : hex('#2a6a2a') : ((x + y) & 1) && y < 60 ? hex('#1a2a60') : hex('#24367a'));
  for (const [sx, sy, k] of [[76, 52, 0], [92, 60, 1], [140, 50, 2], [104, 48, 3], [84, 74, 4], [138, 80, 5]]) { const on = !viva || Math.sin(t * 6 + k * 1.7) > -0.3; if (on) { R.pset(sx, sy, hex('#fff6c0')); if (viva && Math.sin(t * 6 + k) > 0.6) { R.pset(sx + 1, sy, hex('#f8d040')); R.pset(sx - 1, sy, hex('#f8d040')); R.pset(sx, sy - 1, hex('#f8d040')); R.pset(sx, sy + 1, hex('#f8d040')); } } }
  R.disco(118, 66, 10, hex('#f8e078')); R.disco(116, 64, 8, hex('#fff2a8')); R.pset(121, 68, hex('#d8b850')); R.pset(114, 62, hex('#e8c860'));
  // la vaca: quieta en la colina; viva, salta por encima de la luna una y otra vez
  const u = viva ? (t * 0.55) % 1 : 0; vaquita(lerp(80, 146, u), viva ? 98 - Math.sin(u * Math.PI) * 50 : 98);
  R.recorte(null);
};
const dibujoDer = (t, viva, ocaFuera) => {
  const x0 = 172, y0 = 44, x1 = 252, y1 = 110; R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, K.k); R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, y > 96 ? (x * 3 + y) % 4 ? hex('#5ab04a') : hex('#3a8a3a') : (y < 60 && (x + y) % 2) ? hex('#9ad0f8') : hex('#b8e0fc'));
  for (const [cx, cy] of [[184 + (viva ? (t * 3) % 20 : 0), 54], [228, 50]]) { R.disco(Math.round(cx), cy, 4, K.blanco); R.disco(Math.round(cx) + 5, cy + 1, 3, K.blanco); }
  // el zapato-casa: bota marrón con ventanas y chimenea
  R.rect(200, 70, 222, 98, K.k); R.rect(201, 71, 221, 97, hex('#8a5a2a')); R.rect(214, 84, 244, 98, K.k); R.rect(215, 85, 243, 97, hex('#8a5a2a')); R.rect(201, 95, 243, 97, hex('#5a3418'));
  R.rect(205, 76, 209, 80, hex('#f8d040')); R.rect(213, 76, 217, 80, hex('#f8d040')); R.rect(225, 88, 230, 94, hex('#3a5ab0')); for (let y = 72; y < 92; y += 4) { R.pset(204, y, K.blanco); R.pset(218, y, K.blanco); }
  R.rect(198, 66, 224, 70, hex('#a83a3a')); R.rect(210, 58, 213, 66, hex('#6a3a2a'));
  if (viva) for (let k = 0; k < 4; k++) { const f = (t * 0.8 + k * 0.25) % 1; R.disco(Math.round(212 + f * 6 + Math.sin(f * 6) * 2), Math.round(56 - f * 14), 1 + Math.round(f * 2), mez(hex('#d8d8e0'), hex('#b8e0fc'), f)); }
  if (!ocaFuera) ocaDibujo(186, 98, t, { s: 1, dir: 1 });
  R.recorte(null);
};
const tapa = (u) => {
  // la tapa roja: tapa la página derecha y se levanta hacia la izquierda (u 0–1)
  if (u >= 1) return; const ang = u * Math.PI, w = Math.round(Math.cos(ang) * 108), xa = w >= 0 ? PAG.sp : PAG.sp + w, xb = w >= 0 ? PAG.sp + w : PAG.sp;
  for (let x = xa; x <= xb; x++) { const alto = Math.round(Math.sin(ang) * 10 * (Math.abs(x - PAG.sp) / 108)); const y0 = PAG.y0 - 4 - alto, y1 = PAG.y1 + 6 - alto;
    R.rect(x, y0, x, y1, x === xa || x === xb ? K.k : (x + 3) % 9 === 0 ? hex('#982222') : hex('#c83030')); R.pset(x, y0, K.k); R.pset(x, y1, K.k);
    if (Math.abs(x - (PAG.sp + w * 0.5)) < 6 && w > 20) for (let y = 80; y < 100; y++) if ((x + y) % 2) R.pset(x, y, K.oro); }
};
const mariquita = (x, y) => { x = Math.round(x); y = Math.round(y); R.disco(x, y, 3, K.k); R.disco(x, y, 2, hex('#e83a2a')); R.rect(x, y - 2, x, y + 2, K.k); R.pset(x - 1, y - 1, K.k); R.pset(x + 1, y + 1, K.k); R.rect(x - 1, y - 4, x + 1, y - 3, K.k); R.pset(x - 1, y - 1, K.blanco); };
const CIFRA = { '1': ['.#.', '##.', '.#.', '.#.', '###'], '7': ['###', '..#', '.#.', '.#.', '.#.'], '8': ['###', '#.#', '###', '#.#', '###'], '9': ['###', '#.#', '###', '..#', '###'] };
const cubo = (x, y, n, col) => { R.rect(x + 1, y + 18, x + 18, y + 19, mez(hex('#c8945a'), K.k, 0.35)); R.rect(x - 1, y - 1, x + 17, y + 17, K.k); R.rect(x, y, x + 16, y + 16, col); R.rect(x, y, x + 16, y + 2, mez(col, K.blanco, 0.45)); R.rect(x + 14, y + 3, x + 16, y + 16, mez(col, K.k, 0.3));
  R.rect(x + 2, y + 4, x + 12, y + 15, K.blanco); R.rect(x + 2, y + 15, x + 12, y + 15, hex('#d8d0c0'));
  CIFRA[n].forEach((f, j) => { for (let i = 0; i < 3; i++) if (f[i] === '#') R.rect(x + 4 + i * 2, y + 5 + j * 2, x + 5 + i * 2, y + 6 + j * 2, mez(col, K.k, 0.35)); }); };
const p1 = (t) => {
  mesa();
  const u = suave(lin(t, abre, abre + 0.8)), viva = t > vivo, salir = lin(t, oca, oca + 1.0);
  // la página derecha siempre; la izquierda aparece cuando la tapa pasa al otro lado
  pagina(PAG.sp, PAG.x1, t, viva, 1); dibujoDer(t, viva, salir > 0);
  if (u > 0.5) { const xa = Math.round(PAG.sp - Math.min(106, -Math.cos(u * Math.PI) * 106)); pagina(Math.max(PAG.x0, xa), PAG.sp, t, viva, -1); if (u >= 1) dibujoIzq(t, viva); }
  tapa(u);
  // los dibujos cobran vida: un destello grande y polvo de estrellas
  const ch = lin(t, vivo, vivo + 0.8); destello(108, 76, ch, 16); destello(212, 76, lin(t, vivo + 0.15, vivo + 0.95), 14);
  if (ch > 0 && ch < 1) for (let k = 0; k < 14; k++) { const ang = k * 0.45, r = 14 + ch * 50; R.pset(Math.round(160 + Math.cos(ang) * r * 1.6), Math.round(78 + Math.sin(ang) * r * 0.8), k % 2 ? K.oro : K.blanco); }
  // la oca sale del dibujo, salta a la mesa, se planta y bate las alas
  if (salir > 0) { const s1 = suave(lin(t, oca, oca + 0.5)), s2 = suave(lin(t, oca + 0.5, oca + 1.0));
    const ox = s2 > 0 ? lerp(226, 262, s2) : lerp(186, 226, s1), oy = s2 > 0 ? lerp(140, 150, s2) - Math.sin(s2 * Math.PI) * 14 : lerp(98, 140, s1) - Math.sin(s1 * Math.PI) * 18;
    ocaDibujo(ox, oy, t, { s: s1 < 0.4 ? 1 : 2, dir: 1, aletea: salir < 1 || Math.sin(t * 2) > 0.3 });
    if (salir >= 1 && t < oca + 1.7) R.bocadillo(Math.round(ox) + 16, Math.round(oy) - 44, { icono: '!' });
    if (s2 >= 1) for (let k = 0; k < 3; k++) { const f = (t * 1.3 + k * 0.33) % 1; const nx = Math.round(ox + 26 + f * 10), ny = Math.round(oy - 40 - f * 12); R.rect(nx, ny, nx + 1, ny + 3, K.k); R.rect(nx - 2, ny + 3, nx, ny + 4, K.k); } }
  // los cubos 1-9-8-7 (abajo, en el centro) y la mariquita que cruza la mesa
  [['1', hex('#d83a3a')], ['9', hex('#3a7ad8')], ['8', hex('#3aa84a')], ['7', hex('#f0b020')]].forEach(([n, col], k) => cubo(122 + k * 21, 158 + (k % 2), n, col));
  const mq = (t * 0.09) % 1; mariquita(lerp(16, 120, mq), 100 + Math.sin(mq * 9) * 6);
};
// ── p2 · el pueblo de las canciones ──
const platoCuchara = (x0, y0, t) => {
  const s = 2, ox = Math.round(x0), oy = Math.round(y0);
  const Rr = { rect: (a, b, c, d, col) => R.rect(ox + (a - ox) * s, oy + (b - oy) * s, ox + (c - ox) * s + s - 1, oy + (d - oy) * s + s - 1, col), pset: (a, b, col) => R.rect(ox + (a - ox) * s, oy + (b - oy) * s, ox + (a - ox) * s + s - 1, oy + (b - oy) * s + s - 1, col) };
  const x = ox, y = oy, p = Math.floor(t * 9) % 2;
  R.rect(ox - 2, oy, ox + 46, oy + 1, mez(hex('#c8a870'), K.k, 0.35));   // la sombra en el camino
  { const R = { ...Rr, disco: (a, b, r, col) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r + 0.5) Rr.pset(a + i, b + j, col); }, linea: (a, b, c, d, col) => { for (let i = Math.min(a, c); i <= Math.max(a, c); i++) Rr.pset(i, b, col); } };
  // el plato: de canto, blanco con el borde azul, patitas
  R.rect(x - 1, y - 13, x + 11, y - 4, K.k); R.rect(x, y - 12, x + 10, y - 5, K.blanco); R.rect(x, y - 12, x + 10, y - 12, hex('#3a6ad8')); R.rect(x, y - 5, x + 10, y - 5, hex('#3a6ad8')); R.pset(x + 7, y - 9, K.k); R.pset(x + 3, y - 9, K.k); R.rect(x + 4, y - 7, x + 6, y - 7, K.k);
  R.rect(x + 2, y - 3, x + 2, y - 1 + p, K.k); R.rect(x + 8, y - 3, x + 8, y - p, K.k);
  // la cuchara: plateada, de la mano del plato
  const cx = x + 15; R.disco(cx + 2, y - 14, 3, K.k); R.disco(cx + 2, y - 14, 2, hex('#d8dce8')); R.pset(cx + 1, y - 15, K.blanco); R.rect(cx + 1, y - 11, cx + 3, y - 4, K.k); R.rect(cx + 2, y - 11, cx + 2, y - 4, hex('#b8bcc8'));
  R.rect(cx + 1, y - 3, cx + 1, y - p, K.k); R.rect(cx + 3, y - 3, cx + 3, y - 1 + p, K.k); R.linea(x + 11, y - 8, cx + 1, y - 8, K.k); }
};
const p2 = (t) => {
  const salto = suave(lin(t, rima - 0.1, rima + 1.0));
  const g = T.cuento(R, t, { encuadre: 'canciones', salto });
  // la señora del zapato se asoma a su puerta y saluda en «homes»
  R.actor(EL.abuela, 233, 128, t, { dir: -1, dedo: t > casas - 0.2 && t < casas + 1.2, sonrisa: t > casas - 0.2, habla: t > casas && t < casas + 0.8 && Math.sin(t * 9) > 0 });
  // la niña llega con el corderito en brazos y se lo devuelve a la pastora
  const llega = suave(lin(t, P2 + 0.1, vuelve)), nx = Math.round(lerp(236, 92, llega)), entregado = t > vuelve + 0.2;
  const corre = lin(t, vuelve + 0.2, vuelve + 0.8);
  R.actor(EL.pastora, 58, 152, t, { dir: 1, triste: !entregado, sorpresa: t > vuelve - 0.4 && !entregado, brazos: entregado && t < vuelve + 1.4, sonrisa: entregado });
  if (!entregado) R.bocadillo(66, 118, { icono: '?' });
  const rn = R.actor(EL.nina, nx, 152, t, { dir: -1, anda: llega > 0 && llega < 1, sostiene: !entregado ? true : false, sonrisa: true, dedo: entregado && t < vuelve + 1.6 });
  if (!entregado && rn && rn.mano) T.c_oveja(R, rn.mano[0] - 2, rn.mano[1] + 3, t, { cria: true, dir: -1 });
  if (entregado) { const lx = lerp(88, 78, corre); T.c_oveja(R, Math.round(lx), 152 - Math.round(Math.abs(Math.sin(t * 9)) * (corre < 1 ? 3 : 1)), t, { cria: true, dir: -1, anda: corre < 1 });
    const hz = lin(t, vuelve + 0.3, vuelve + 1.6); if (hz > 0 && hz < 1) corazon(64, 110 - hz * 14, 2); }
  // el plato y la cuchara cruzan corriendo por delante, de la mano
  const pc = lin(t, rima + 0.2, P3 - 0.1), px = lerp(330, 150, pc); if (pc > 0) platoCuchara(px, 176, t);
};
// ── p3 · el corro ──
const BAILAN = ['pastora', 'chico', 'nina', 'abuela'];
const p3 = (t) => {
  const g = T.cuento(R, t, { encuadre: 'canciones', camara: 'corro' });
  const para = t > nadie + 0.5, w = para ? 0 : 1.1, th0 = (Math.min(t, nadie + 0.5) - P3) * 1.1;
  const pos = BAILAN.map((n, k) => { const th = th0 + k * Math.PI / 2; return { n, x: Math.round(160 + Math.cos(th) * 46 - 7), y: Math.round(150 + Math.sin(th) * 9), d: -Math.sin(th) > 0 ? 1 : -1 }; });
  const pinta = (p) => { const sj = para ? Math.round(Math.abs(Math.sin((t - nadie) * 7)) * 5) : 0;
    R.actor(EL[p.n], p.x, p.y, t, { dir: p.d, anda: !para, brazos: para && sj > 1, salto: sj, sonrisa: true }); };
  pos.filter((p) => p.y < 150).forEach(pinta);
  // el corderito brinca en el centro del corro
  T.c_oveja(R, 160, 150 - Math.round(Math.abs(Math.sin(t * 5)) * 3), t, { cria: true, dir: Math.sin(t * 0.8) > 0 ? 1 : -1 });
  pos.filter((p) => p.y >= 150).forEach(pinta);
  // en «nobody could die»: la calavera tachada y el corazón en el cielo, que laten
  const ap = lin(t, nadie - 0.15, nadie + 0.3);
  if (ap > 0) { const lat = 1 + (Math.sin(t * 8) > 0.6 ? 1 : 0), y0 = Math.round(70 - suave(ap) * 22);
    const cx = 108, cy = y0; R.disco(cx, cy, 15, K.k); R.disco(cx, cy, 14, K.rojo); R.disco(cx, cy, 11, K.blanco);
    R.icono('calavera', cx - 7, cy - 6, hex('#3a3a4a'), hex('#c8c8d8'), 2);
    for (let i = -10; i <= 10; i++) { const x = cx + i, y = cy - i; R.rect(x - 1, y - 1, x + 1, y + 1, K.rojo); }
    corazon(200 - lat, y0 - 8 - lat, 3 + (lat > 1 ? 0 : 0), K.rojo); destello(228, y0 - 12, (t * 1.3) % 1, 6, K.rosaL); }
};
const efectos = [[abre, 'papel'], [vivo, 'brillo'], [oca + 0.5, 'boing'], [vuelve + 0.3, 'pop'], [rima, 'boing'], [casas, 'miau'], [P3 + 0.3, 'palmada'], [nadie, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1987 });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['si-rosella'] = ('Rosella', '''// SI-ROSELLA (frases 28–29), 1988, sin cartela. Tres planos:
// 1. la alcoba del rey de noche: el viejo Graham, enfermo en la cama con su gorro de pluma, tose; Rosella entra por la
//    puerta redonda con su farol hasta la cama; en «switches heroes» el foco de luz se desliza de la cama a ella; en
//    «the star is his daughter» le brilla una estrella encima y levanta el farol; el rey sonríe; se da la vuelta hacia
//    la puerta; corta antes de «Princess»;
// 2. el castillo de noche: en «Princess Rosella» sale por el arco con su farol (el halo cálido y su reflejo en el
//    foso) y baja por el puente; en «save her father» se para, señala hacia la ventana encendida y le sale el
//    bocadillo de la corona; en «starring a girl» una estrella dorada y un salto con los brazos arriba, y se va por la
//    orilla hacia el molino; corta en el silencio después de «girl»;
// 3. la mesa de noche con el ordenador abierto: la tarjeta de sonido sobre la mesa, el piloto empieza a parpadear en
//    «play music»; en «sound card» salen de un salto los tres músicos diminutos (violín, trompa, timbal) y tocan; el
//    disquete con ojos se sube a la mesa y dirige con su batuta («like a little orchestra»); el altavoz bota.''', PIEZAS + r'''
const a = (f) => en('rosella', f), b = (f) => en('orquesta', f);
const P2 = a(0.676) - 0.08, P3 = b(0.285) + 0.45;
const heroes = a(0.272), estrella = a(0.497), princesa = a(0.676), salvar = a(0.888), chica = b(0.204), musica = b(0.531), tarjeta = b(0.667), orquesta = b(0.888);
// ── p1 · la alcoba ──
const foco = (cx, piso) => {
  // un cono de luz desde arriba hasta el suelo, que aclara lo de debajo
  for (let y = 0; y <= piso + 4; y++) { const hw = 8 + (y / piso) * 22; for (let x = Math.round(cx - hw); x <= Math.round(cx + hw); x++) { if (x < 0 || x > 319) continue; const borde = Math.abs(x - cx) > hw - 2;
    if (borde && (x + y) & 1) continue; R.pset(x, y, mez(R.pget(x, y), hex('#fff0c0'), y > piso - 6 ? 0.3 : 0.24)); } }
};
const p1 = (t) => {
  const g = T.cuento(R, t, { encuadre: 'alcoba' });
  const tos = (t % 1.6) < 0.35 && t < heroes;
  R.actor(EL.graham, 30, 138, t, { dir: 1, quieto: true, triste: t < estrella - 0.3, sonrisa: t > estrella, sorpresa: tos, habla: t > estrella + 0.5 && Math.sin(t * 7) > 0.4 });
  T.cuentoDelante(R, t, { encuadre: 'alcoba' });
  // la corona del rey, dejada en la mesilla junto a la vela
  { const cx = 146, cy = 110; R.rect(cx - 5, cy - 1, cx + 5, cy + 3, K.k); R.rect(cx - 4, cy, cx + 4, cy + 2, K.oro); for (const i of [-4, 0, 4]) { R.rect(cx + i - 1, cy - 4, cx + i + 1, cy - 1, K.k); R.pset(cx + i, cy - 3, K.oro); R.pset(cx + i, cy - 2, K.oro); }
    R.pset(cx, cy + 1, K.rojo); R.pset(cx - 3, cy + 1, hex('#3a7ad8')); R.pset(cx + 3, cy + 1, hex('#3a7ad8')); if (Math.sin(t * 3) > 0.8) R.pset(cx - 2, cy, K.blanco); }
  if (tos) for (let k = 0; k < 3; k++) R.pset(52 + k * 2 + Math.round((t % 1.6) * 8), 112 - k, hex('#c8c8d8'));
  // Rosella entra desde la puerta redonda hasta la cama, con su farol; luego se vuelve hacia la puerta
  const ent = suave(lin(t, 0.25, heroes - 0.3)), rx = Math.round(lerp(262, 160, ent)), vuelve = t > P2 - 0.55;
  const fx = heroes < t ? lerp(52, rx + 7, suave(lin(t, heroes, heroes + 0.7))) : 52;
  foco(fx, 156);
  const sube = t > estrella && t < estrella + 1.6;
  const rr = R.actor(EL.rosella, rx, 156, t, { dir: vuelve ? 1 : -1, anda: (ent > 0 && ent < 1), sostiene: sube ? [rx + (vuelve ? 14 : 0), 122] : true, sonrisa: t > estrella - 0.2, habla: t > estrella + 0.4 && t < P2 - 0.6 && Math.sin(t * 8) > 0.2 });
  if (rr && rr.mano) { halo(rr.mano[0], rr.mano[1] + 6, 20, hex('#ffd890'), 0.35); farol(rr.mano[0], rr.mano[1], t); }
  destello(rx + 7, 116, lin(t, estrella, estrella + 0.8), 11);
};
// ── p2 · el castillo de noche ──
const p2 = (t) => {
  const g = T.reino(R, t, { encuadre: 'castillo', luz: 'noche' });
  // sale del arco (y 126), baja por el puente (de y 127 a 152), llega a la orilla y se va hacia el molino
  const baja = suave(lin(t, princesa + 0.05, salvar - 0.35)), va = lin(t, chica + 0.75, P3 + 0.2);
  let x = 153, y = 126;
  if (baja > 0) { x = Math.round(lerp(153, 152, baja)); y = Math.round(lerp(126, 166, baja)); }
  if (va > 0) { x = Math.round(lerp(152, 70, va)); y = 166; }
  const visible = t > princesa - 0.1, para = baja >= 1 && va === 0, señala = para && t > salvar - 0.1 && t < salvar + 1.3, salta = t > chica + 0.05 && t < chica + 0.75;
  if (visible) {
    // el reflejo del farol en el agua mientras cruza el puente
    if (y < 152) for (let k = 0; k < 4; k++) { const rx = x + 4 + Math.round(Math.sin(t * 5 + k) * 2), ry = 134 + k * 3; if (ry > y) { R.pset(rx, ry, hex('#f8d070')); R.pset(rx + 1, ry, hex('#c89a40')); } }
    if (y < 140) R.recorte([0, 0, 319, 128 + Math.round((y - 126) * 1.2) + 26]);
    const rr = R.actor(EL.rosella, x, y, t, { dir: va > 0 ? -1 : señala ? 1 : 1, anda: (baja > 0 && baja < 1) || va > 0, dedo: señala, sostiene: !señala && !salta ? true : false, brazos: salta,
      salto: salta ? Math.round(Math.sin(lin(t, chica + 0.05, chica + 0.75) * Math.PI) * 7) : 0, sonrisa: true });
    R.recorte(null);
    const mx = rr && rr.mano ? rr.mano[0] : x + 12, my = rr && rr.mano ? rr.mano[1] : y - 12;
    halo(mx, my + 5, 26, hex('#ffd890'), 0.4);
    if (!señala && !salta) farol(mx, my, t); else farol(x + (va > 0 ? 0 : 12), y - 10, t);
    if (señala) { R.bocadillo(x + 20, y - 30, {}); R.rect(x + 16, y - 38, x + 23, y - 33, hex('#f2eee2')); R.icono('corona', x + 17, y - 38, hex('#c89a28'), hex('#c89a28')); }
    destello(x + 7, y - 36, lin(t, chica, chica + 0.9), 13); destello(x + 7, y - 36, lin(t, princesa + 0.1, princesa + 0.7), 9, K.blanco);
  }
  // una ventana de la torre se enciende más (el rey que espera) mientras ella lo mira
  if (t > salvar - 0.3) { const p = Math.sin(t * 4) > 0 ? hex('#fff2a8') : hex('#f8d060'); R.rect(158, 64, 161, 69, p); halo(160, 66, 7, hex('#fff2a8'), 0.4); }
};
// ── p3 · la tarjeta de sonido ──
const p3 = (t) => {
  const bota = 0.2 + 0.8 * lin(t, tarjeta, orquesta);
  const g = T.estudio(R, t, { encuadre: 'mesa', bota });
  const mus = suave(lin(t, tarjeta, tarjeta + 0.7));
  const r = T.tarjetaSonido(R, g.tarjeta[0], g.tarjeta[1], t, { musicos: mus });
  // el piloto rojo que se enciende en «play music»
  if (t > musica && Math.floor(t * 5) % 2) { R.disco(g.tarjeta[0] - 28, g.tarjeta[1] - 24, 2, hex('#ff4a3a')); halo(g.tarjeta[0] - 28, g.tarjeta[1] - 24, 6, hex('#ff8a6a'), 0.5); }
  // el disquete con ojos llega corriendo por la mesa y dirige con su batuta
  const llega = suave(lin(t, P3 + 0.4, tarjeta - 0.2)), dx = Math.round(lerp(345, 213, llega)), dirige = t > tarjeta + 0.3;
  const d = T.disquete(R, dx, 157, t, { s: 2, dir: -1, corre: llega > 0 && llega < 1 ? 1 : 0, expresion: t > orquesta - 0.2 ? 'feliz' : t > tarjeta ? 'feliz' : 'normal', salto: dirige && t > orquesta ? Math.round(Math.abs(Math.sin(t * 6)) * 2) : 0 });
  if (dirige && d && d.mano) { const [hx, hy] = d.mano, an = Math.sin(t * (t > orquesta ? 9 : 6)) * 0.9; const bx = Math.round(hx - 5 - Math.cos(an) * 7), by = Math.round(hy - 10 - Math.sin(an) * 6); R.linea(hx, hy, bx, by, K.k); R.linea(hx + 1, hy, bx + 1, by, K.blanco); R.pset(bx, by, K.blanco); R.pset(hx, hy, K.k); }
  // las notas de colores que suben con más fuerza en «orchestra»
  if (t > orquesta) for (let k = 0; k < 6; k++) { const f = (t * 0.7 + k / 6) % 1, nx = Math.round(130 + k * 13 + Math.sin(f * 7 + k) * 4), ny = Math.round(108 - f * 46), c = [hex('#f06a8a'), hex('#6ad8f0'), hex('#f8d040')][k % 3];
    R.rect(nx, ny, nx + 1, ny + 4, c); R.rect(nx - 2, ny + 3, nx, ny + 5, c); R.pset(nx + 2, ny, c); }
};
const efectos = [[0.3, 'puerta'], [heroes, 'whoosh'], [estrella, 'brillo'], [princesa, 'cerrojo'], [chica, 'brillo'], [musica, 'bip'], [tarjeta, 'pop'], [orquesta, 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1988 });
''')

for k in E:
    t, c, cuerpo = E[k]
    E[k] = (t, c, cuerpo)
