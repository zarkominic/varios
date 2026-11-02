E = {}

# Piezas pequeñas compartidas por las tres escenas (se repiten en cada cuerpo porque cada escena es su propia página).
PIEZAS = r'''
const C = T.C;
// el «chof» de humo de cuento: bolas blancas que se hinchan con borde gris y se deshacen en motas (u 0–1)
const puf = (x, y, u, s = 1) => {
  if (u <= 0 || u >= 1) return;
  const r0 = (3 + 7 * Math.sin(Math.min(1, u * 1.6) * Math.PI / 2)) * s, se = u > 0.6 ? (u - 0.6) / 0.4 : 0;
  const bolas = [[0, 0, 1], [-1, -0.3, 0.75], [1, -0.25, 0.8], [-0.55, -0.9, 0.7], [0.6, -0.85, 0.65], [0, -1.25, 0.6]];
  for (const pasada of [0, 1, 2]) for (const [dx, dy, k] of bolas) {
    const r = r0 * k * (1 - se * 0.5), cx = x + dx * r0 * (1 + u * 0.4), cy = y + dy * r0 - u * 4 * s;
    if (se > 0 && ((Math.round(cx) + Math.round(cy)) & 1) && pasada === 2) continue;
    R.disco(Math.round(cx), Math.round(cy), Math.max(1, Math.round(pasada === 0 ? r + 1 : pasada === 1 ? r : r * 0.55)), pasada === 0 ? hex('#8a8ea0') : pasada === 1 ? hex('#e8ecf4') : hex('#ffffff'));
  }
  if (se > 0) for (let k = 0; k < 10; k++) { const a = k * 0.63, d = r0 * (1.3 + se * 0.9); R.pset(Math.round(x + Math.cos(a) * d), Math.round(y - r0 * 0.4 + Math.sin(a) * d * 0.7), k % 2 ? hex('#e8ecf4') : hex('#b8bcc8')); }
  for (let k = 0; k < 4; k++) { const a = u * 6 + k * 1.57, d = r0 * 1.2; R.pset(Math.round(x + Math.cos(a) * d), Math.round(y - r0 * 0.5 + Math.sin(a) * d * 0.6), hex('#f8e060')); }
};
// estrellitas de mareo que giran alrededor de una cabeza
const mareo = (x, y, t) => { for (let k = 0; k < 3; k++) { const a = t * 6 + k * 2.1, px = Math.round(x + Math.cos(a) * 7), py = Math.round(y + Math.sin(a) * 2);
  R.pset(px, py, hex('#f8e060')); R.pset(px - 1, py, hex('#e8a830')); R.pset(px + 1, py, hex('#e8a830')); R.pset(px, py - 1, hex('#e8a830')); R.pset(px, py + 1, hex('#e8a830')); } };
// el gorro rojo con pluma del caballerito, suelto (flota, vuela)
const gorro = (x, y, a = 0) => { const k = hex('#1a1420'), r = hex('#c83a3a'), rs = hex('#8a2a2a'), p = hex('#f2eee2');
  R.rect(x - 4, y - 1, x + 4, y + 1, k); R.rect(x - 3, y - 3, x + 2, y, k); R.rect(x - 3, y, x + 3, y, rs); R.rect(x - 2, y - 2, x + 1, y - 1, r); R.pset(x - 2, y - 2, hex('#e85a5a'));
  const fx = x + 2 + Math.round(Math.sin(a) * 1); R.linea(x + 1, y - 2, fx + 3, y - 6, k); R.linea(x + 1, y - 3, fx + 3, y - 7, p); R.pset(fx + 4, y - 7, p); };
'''

E['si-gancho'] = ('Gancho', '''// SI-GANCHO (frases 1–3), 1985. Cuatro planos, el gag 1 (el puente):
// 1. el castillo de cuento entero: el caballerito cruza la orilla y sube por el puente levadizo; la pastora y su oveja lo
//    saludan desde el camino, el centinela pasea, el molino gira; corta en «too» (3,69);
// 2. el puente de lado: anda por las tablas, pisa la tabla suelta («one step too many»), la tabla bascula y cae al foso
//    con un «chof» (salpicón, corona de agua); sale su gorro flotando y burbujas; un pato se acerca; en «freezes» la
//    imagen se congela y se apaga a gris con el símbolo de pausa;
// 3. la pantalla de cerca, el juego congelado: en «box pops up» salta el cuadro de la muerte; la calavera guiña en
//    «joke», se ríe en «died»; la mano del jugador entra al teclado y pulsa; en «square one» el cuadro se cierra y el
//    juego vuelve a color, al principio;
// 4. el escritorio de noche: el disquete con ojos llega corriendo, tarde («if you hadn't saved»); el reloj de pared da
//    media hora hacia atrás («lost half an hour»), el disquete se asusta y en «misstep» se tapa los ojos.''', PIEZAS + r'''
const a = (f) => en('foso', f), b = (f) => en('cuadro', f), c = (f) => en('media', f);
const P2 = 3.69, P3 = 8.19, P4 = 13.33;
// p1 · el castillo entero
const p1 = (t) => {
  const g = T.reino(R, t, { encuadre: 'castillo' });
  // el caballerito: por la orilla hasta el pie del puente y sube por las tablas
  const u = tramo(t, 0.1, 1.9), v = tramo(t, 1.9, P2 + 0.6);
  const gx = v > 0 ? Math.round(lerp(152, 153, v)) : Math.round(lerp(26, 152, u)), gy = v > 0 ? Math.round(lerp(157, 132, v)) : Math.round(lerp(170, 157, u));
  // la pastora y su oveja en el camino, junto al poste: lo saluda cuando pasa
  const sal = t > 1.0 && t < 2.6;
  T.c_oveja(R, 288, 174, t, { dir: -1, come: true });
  R.actor(EL.pastora, 254, 172, t, { dir: -1, dedo: sal, sonrisa: true, habla: sal && Math.sin(t * 9) > 0 });
  R.actor(EL.graham, gx, gy, t, { dir: 1, anda: (u > 0 && u < 1) || (v > 0 && v < 1), sonrisa: t > 1.2 && t < 2.6 });
  // una mariposa que lo acompaña
  { const mx = gx + 6 + Math.round(Math.sin(t * 3) * 10), my = gy - 32 + Math.round(Math.sin(t * 5) * 4), al = Math.sin(t * 22) > 0;
    R.pset(mx, my, hex('#3a2a1a')); R.pset(mx - 1, my - (al ? 1 : 0), hex('#f8d040')); R.pset(mx + 1, my - (al ? 1 : 0), hex('#f8d040')); R.pset(mx - 1, my + 1, hex('#e8a030')); R.pset(mx + 1, my + 1, hex('#e8a030')); }
  T.reinoDelante(R, t, { encuadre: 'castillo' });
};
// p2 · el puente de lado: la tabla suelta, la caída y el «chof»; luego, todo se congela
const PISA = a(0.79), CAE = PISA + 0.12, AGUA = CAE + 0.42, FR = 6.95;
const TX = 150;   // la tabla suelta, de x 150 a 172
const p2 = (t0) => {
  const t = Math.min(t0, FR);
  const spl = tramo(t, AGUA, AGUA + 1.3);
  T.reino(R, t, { encuadre: 'castillo', camara: 'puente', salpicon: spl, salpiconX: TX + 14, salpiconY: 152 });
  // la tabla suelta: el hueco oscuro y la tabla que bascula
  const giro = tramo(t, PISA, PISA + 0.25), ang = giro * 1.1 - tramo(t, PISA + 0.4, PISA + 1.4) * 0.6;
  if (giro > 0) { R.rect(TX, 128, TX + 22, 133, hex('#1a2a3a')); R.rect(TX, 128, TX + 22, 128, hex('#0e1620')); }
  { const cx = TX + 4, cy = 130, L = 22, ex = cx + Math.cos(ang) * L, ey = cy + Math.sin(ang) * L;
    for (let d = -2; d <= 2; d++) R.linea(cx, cy + d, Math.round(ex - Math.sin(ang) * d), Math.round(ey + Math.cos(ang) * d), d === -2 || d === 2 ? hex('#3a2414') : d === -1 ? hex('#c89058') : hex('#a06a3a'));
    R.pset(cx + 3, cy, C.k); R.pset(Math.round(cx + Math.cos(ang) * 16), Math.round(cy + Math.sin(ang) * 16), C.k); }
  // el caballerito: anda, pisa la tabla, se tambalea y cae
  const ux = tramo(t, P2, PISA), x = Math.round(lerp(70, TX + 7, ux));
  if (t < CAE) R.actor(EL.graham, x, 128, t, { dir: 1, anda: ux > 0 && ux < 1, sonrisa: t < PISA - 0.4, sorpresa: t >= PISA, brazos: t >= PISA });
  else if (t < AGUA + 0.6) {
    const w = tramo(t, CAE, AGUA), y = Math.round(128 + 24 * w * w + 30 * tramo(t, AGUA, AGUA + 0.6));
    R.recorte([0, 0, 319, 152]); R.actor(EL.graham, x + Math.round(w * 4), y, t, { dir: 1, sorpresa: true, brazos: true }); R.recorte(null);
    if (t < AGUA) { R.icono('!', x + 18, y - 34, hex('#f8e060'), C.k); }
  }
  // el gorro que sale flotando, las burbujas y un pato curioso
  if (t > AGUA + 0.7) { const f = t - AGUA - 0.7; gorro(Math.round(TX + 16 + f * 6), 150 + Math.round(Math.sin(f * 4) * 1), f * 3);
    for (let k = 0; k < 4; k++) { const v = ((f * 0.9 + k * 0.27) % 1), bx = TX + 12 + k * 3 + Math.round(Math.sin(v * 9 + k) * 1), by = 160 - Math.round(v * 9); if (v < 0.9) { R.pset(bx, by, hex('#d8eef8')); R.pset(bx + 1, by, hex('#8ac0e0')); } } }
  { const px = Math.round(lerp(250, TX + 34, tramo(t, AGUA + 0.3, FR))), py = 156, k = C.k, bl = hex('#f2eee2'), bs = hex('#c8c4b8');
    R.rect(px - 4, py - 3, px + 4, py, k); R.rect(px - 3, py - 2, px + 3, py - 1, bl); R.rect(px - 3, py - 1, px + 3, py - 1, bs);
    R.rect(px - 5, py - 7, px - 2, py - 3, k); R.rect(px - 4, py - 6, px - 3, py - 4, bl); R.pset(px - 4, py - 5, k); R.rect(px - 7, py - 5, px - 6, py - 4, hex('#e8a030'));
    if (t > AGUA + 1.4) R.icono('?', px - 6, py - 17, hex('#f2eee2'), k); }
  T.reinoDelante(R, t, { encuadre: 'castillo', camara: 'puente' });
  // la congelación: todo pasa a gris y sale el símbolo de pausa
  const gz = tramo(t0, FR + 0.05, FR + 0.45);
  if (gz > 0) {
    for (let y = 0; y < 180; y++) for (let x0 = 0; x0 < 320; x0++) { const q = R.pget(x0, y), r = q & 255, gg = (q >> 8) & 255, bb = (q >> 16) & 255, l = (r * 0.3 + gg * 0.55 + bb * 0.15) * 0.82 + 10;
      R.pset(x0, y, (0xff000000 | (Math.round(bb + (l + 8 - bb) * gz) << 16) | (Math.round(gg + (l - gg) * gz) << 8) | Math.round(r + (l - 4 - r) * gz)) >>> 0); }
    if (gz >= 1) { R.rect(150, 74, 157, 98, C.k); R.rect(163, 74, 170, 98, C.k); R.rect(151, 75, 156, 97, hex('#f2eee2')); R.rect(164, 75, 169, 97, hex('#f2eee2')); }
    if (t0 < FR + 0.5) { const yl = Math.round(lerp(0, 179, tramo(t0, FR + 0.05, FR + 0.45))); R.rect(0, yl, 319, yl + 1, hex('#f2eee2')); }
  }
};
// p3 · la pantalla de cerca: el cuadro de la muerte
const ABRE = 8.56, GUINO = b(0.46), RIE = b(0.63), PULSA = b(0.88), CIERRA = PULSA + 0.25;
const p3 = (t) => {
  const abre = tramo(t, ABRE, ABRE + 0.45) * (1 - tramo(t, CIERRA, CIERRA + 0.3));
  T.muerte(R, t, { encuadre: 'pantalla', camara: 'cerca', congela: 1 - tramo(t, CIERRA + 0.2, CIERRA + 0.6), abre: abre > 0 ? Math.max(0.01, abre) : 0,
    guino: Math.sin(Math.PI * tramo(t, GUINO, GUINO + 0.5)), rie: t > RIE && t < RIE + 0.9 ? 1 : 0, cursor: t > b(0.75) && t < CIERRA });
  // la mano del jugador entra por abajo, pulsa la tecla y se va
  const m = tramo(t, b(0.7), PULSA - 0.1) * (1 - tramo(t, CIERRA + 0.6, CIERRA + 1.2)), baja = t > PULSA - 0.05 && t < PULSA + 0.2 ? 2 : 0;
  if (m > 0) T.brazo(R, Math.round(lerp(312, 284, m)), Math.round(lerp(212, 192, m)), Math.round(lerp(270, 232, m)), Math.round(lerp(198, 163, m)) + baja, '#3a6a9a', -1, { codo: [Math.round(lerp(296, 262, m)), Math.round(lerp(204, 178, m))] });
};
// p4 · el escritorio: el disquete llega tarde
const LLEGA = c(0.12), ATRAS = c(0.37), TAPA = c(0.79);
const p4 = (t) => {
  T.muerte(R, t, { encuadre: 'pantalla', congela: 0, abre: 0, atras: tramo(t, ATRAS, ATRAS + 1.1), lee: t > LLEGA + 0.4 && t < LLEGA + 1.2 ? 1 : 0 });
  const u = tramo(t, P4 + 0.1, LLEGA + 0.6), x = Math.round(lerp(-14, 52, u * (2 - u)));
  const mira = t > LLEGA + 0.6;
  T.disquete(R, x, 133, t, { s: 2, corre: u > 0 && u < 1 ? 1 : 0, dir: mira && t > ATRAS - 0.3 && t < TAPA - 0.3 ? 1 : 1,
    expresion: t > ATRAS + 0.2 ? (t > TAPA + 0.8 ? 'triste' : 'susto') : 'normal', tapa: tramo(t, TAPA, TAPA + 0.3), salto: t > ATRAS + 0.2 && t < ATRAS + 0.5 ? 4 : 0 });
  if (t > ATRAS + 0.2 && t < ATRAS + 1.2) R.icono('!', x + 16, 82, hex('#f8e060'), C.k, 2);
  // junto al reloj: el rebobinado («◀◀ 30»)
  const rb = tramo(t, ATRAS, ATRAS + 0.25);
  if (rb > 0) { const bx = 104, by = 24 + Math.round((1 - rb) * 6), k = C.k;
    R.rect(bx - 1, by - 1, bx + 38, by + 14, k); R.rect(bx, by, bx + 37, by + 13, hex('#f2eee2')); R.rect(bx, by + 12, bx + 37, by + 13, hex('#c8c0a8'));
    const on = t < ATRAS + 1.3 ? Math.floor(t * 6) % 2 === 0 : true;
    for (const dx of [3, 9]) for (let j = 0; j < 7; j++) { const w = j < 4 ? j : 6 - j; R.rect(bx + dx + 5 - w, by + 3 + j, bx + dx + 5, by + 3 + j, on ? hex('#c83a3a') : hex('#8a2a2a')); }
    R.numero('30', bx + 18, by + 11, {}); }
  if (t > TAPA + 0.9) { const f = (t - TAPA - 0.9) * 1.5; for (let k = 0; k < 3; k++) { const v = (f + k * 0.33) % 1; R.pset(x + 14 + Math.round(v * 6), 100 - Math.round(v * 8), hex('#8ac0e0')); } }
};
const efectos = [[1.2, 'tic'], [PISA, 'golpecito'], [CAE + 0.05, 'whoosh'], [AGUA, 'chof'], [AGUA + 0.9, 'burbujas'], [FR + 0.05, 'interruptor'],
  [ABRE, 'pop'], [GUINO + 0.1, 'boing'], [RIE, 'masca'], [PULSA, 'bip'], [P4 + 0.3, 'whoosh'], [ATRAS, 'tic'], [ATRAS + 0.25, 'aviso'], [TAPA, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1985 });
''')

E['si-pregunta'] = ('La pregunta', '''// SI-PREGUNTA (frases 4–6). Cuatro planos:
// 1. el camino de los peligros: el caballerito sale de junto a la cueva del ogro (los ojos lo siguen), cruza el tronco
//    del barranco y en «Off a bridge» resbala y cae; «chof» de humo y vuelve a aparecer al principio;
// 2. el bosque: anda tan tranquilo; en «under a rock» una roca rueda por el camino y lo aplasta (humo, mareo); en
//    «touching the wrong thing» toca una seta, se pone verde y otra vez humo; reaparece y se encoge de hombros;
// 3. el salón de 1985 (corta en «millions»): la abuela, el chico y el adolescente ante el monitor; en la pantalla salta el cuadro de la
//    muerte y en «loved them» los tres se ríen y aplauden; el perro menea la cola;
// 4. el porche de California al atardecer: la pareja junto al ordenador antiguo; en «adventures?» sube un «?» grande y
//    en «dying» una calavera al lado; en «fun?» los dos se miran y sonríen.''', PIEZAS + r'''
const a = (f) => en('cada', f), b = (f) => en('millones', f), c = (f) => en('pareja', f);
const P2 = 3.95, P3 = 7.74, P4 = 11.45;
// p1 · el barranco del camino de los peligros
const RESBALA = 3.3;
const p1 = (t) => {
  const g = T.reino(R, t, { encuadre: 'peligros' });
  const u = tramo(t, 0.2, RESBALA), x = Math.round(lerp(40, 86, u));
  if (t < RESBALA + 0.05) R.actor(EL.graham, x, 155, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: t > RESBALA - 0.25, brazos: t > RESBALA - 0.15, sonrisa: t < 2.6 });
  else { const w = tramo(t, RESBALA, RESBALA + 0.5); if (w < 1) { R.recorte([74, 0, 120, 179]); R.actor(EL.graham, x + 2, Math.round(155 + 40 * w * w), t, { dir: 1, sorpresa: true, brazos: true }); R.recorte(null); } }
  puf(95, 160, tramo(t, RESBALA + 0.35, RESBALA + 1.0));
  // reaparece al principio del camino, con su humo
  const r = tramo(t, RESBALA + 0.55, P2 + 0.3);
  if (r > 0) { puf(48, 146, tramo(t, RESBALA + 0.45, RESBALA + 1.0), 0.9); if (t > RESBALA + 0.6) R.actor(EL.graham, 40, 155, t, { dir: 1, sorpresa: t < RESBALA + 1.0 }); }
  T.reinoDelante(R, t, { encuadre: 'peligros' });
};
// p2 · el bosque: la roca y la seta
const ROCA = a(0.66), SETA = a(0.85), VERDE = SETA + 0.25, PUF2 = a(0.97);
const p2 = (t) => {
  T.reino(R, t, { encuadre: 'bosque' });
  // la seta roja de lunares, grande
  const sx = 196, sy = 154; R.rect(sx - 1, sy - 7, sx + 2, sy, hex('#2a2018')); R.rect(sx, sy - 7, sx + 1, sy - 1, hex('#f2eee2'));
  R.disco(sx, sy - 9, 6, hex('#2a1418')); R.rect(sx - 7, sy - 9, sx + 8, sy - 7, hex('#2a1418')); R.disco(sx, sy - 9, 5, hex('#d83a3a')); R.rect(sx - 6, sy - 8, sx + 7, sy - 8, hex('#a82a2a'));
  for (const [dx, dy] of [[-3, -11], [1, -12], [3, -9], [-1, -9]]) R.pset(sx + dx, sy + dy, hex('#f8f4ea')); R.pset(sx - 2, sy - 13, hex('#ff8a8a'));
  if (t > SETA && t < SETA + 0.6) for (let k = 0; k < 4; k++) R.pset(sx - 6 + k * 4, sy - 17 - (k % 2) * 2, hex('#a8f060'));
  // el caballerito: anda; la roca; reaparece; va a la seta; verde; humo; reaparece y se encoge de hombros
  const roca = tramo(t, ROCA - 0.55, ROCA + 0.5), rx = Math.round(lerp(-20, 230, roca));
  const anda1 = tramo(t, P2, ROCA), x1 = Math.round(lerp(130, 150, anda1));
  const vuelve = t > ROCA + 0.4, anda2 = tramo(t, ROCA + 0.75, SETA - 0.05), x2 = Math.round(lerp(150, 176, anda2));
  if (t < ROCA) R.actor(EL.graham, x1, 154, t, { dir: 1, anda: anda1 > 0 && anda1 < 1, sorpresa: t > ROCA - 0.35, dir: t > ROCA - 0.35 ? -1 : 1 });
  else if (vuelve && t < PUF2 - 0.1) {
    const verde = t > VERDE;
    R.actor(EL.graham, x2, 154, t, { dir: 1, anda: anda2 > 0 && anda2 < 1, dedo: t > SETA - 0.1 && t < SETA + 0.4, sorpresa: verde, pal: verde ? { S: hex('#8ad05a'), s: hex('#5aa03a') } : undefined });
    if (t < ROCA + 1.3) mareo(x2 + 7, 154 - 28, t);
  } else if (t > PUF2 + 0.2) { const s = t > PUF2 + 0.45; R.actor(EL.graham, 150, 154, t, { dir: 1, brazos: s && t < PUF2 + 1.6, sonrisa: s }); }
  // la roca que rueda por el camino (por delante del caballero)
  if (roca > 0 && roca < 1) { const ry = 145, rr = 9; R.disco(rx, ry, rr + 1, hex('#2a2620')); R.disco(rx, ry, rr, hex('#8a8478')); R.disco(rx - 2, ry - 3, 5, hex('#a8a296')); R.disco(rx - 3, ry - 4, 2, hex('#c8c2b4'));
    const g = roca * 20; for (let k = 0; k < 3; k++) { const an = g + k * 2.1; R.linea(rx + Math.round(Math.cos(an) * 3), ry + Math.round(Math.sin(an) * 3), rx + Math.round(Math.cos(an) * 7), ry + Math.round(Math.sin(an) * 7), hex('#5e584e')); }
    for (let k = 0; k < 4; k++) R.pset(rx - 12 - k * 3, 153 - (k % 2), hex('#b8a888')); }
  puf(157, 146, tramo(t, ROCA, ROCA + 0.6));
  puf(x2 + 7, 146, tramo(t, PUF2 - 0.15, PUF2 + 0.5));
  puf(157, 146, tramo(t, PUF2 + 0.05, PUF2 + 0.55), 0.8);
  T.reinoDelante(R, t, { encuadre: 'bosque' });
};
// p3 · el salón de 1985: se ríen y aplauden
const RIEN = 8.54;
const p3 = (t) => {
  T.casa(R, t, { encuadre: 'jugadores', epoca: 1985 });
  // en el monitor: el cuadro de la muerte pequeño
  const ab = tramo(t, P3 + 0.5, P3 + 0.9);
  if (ab > 0) { R.recorte([212, 72, 250, 100]); T.cuadroMuerte(R, 216, 77, t, { w: 31, abre: ab }); R.recorte(null); }
  const ri = t > RIEN, pal = (k) => ri && Math.floor(t * 7 + k) % 2 === 0;
  R.actor(EL.abuela, 84, 162, t, { dir: 1, sonrisa: ri || t < P3 + 0.4, sorpresa: t > P3 + 0.6 && !ri, brazos: pal(0) });
  R.actor(EL.chico, 176, 162, t, { dir: 1, dedo: t > P3 + 0.5 && t < RIEN, habla: t > P3 + 0.5 && t < RIEN && Math.sin(t * 9) > 0, sonrisa: ri, brazos: pal(1), salto: ri && Math.sin(t * 7) > 0.5 ? 2 : 0 });
  R.actor(EL.adolescente, 128, 162, t, { dir: 1, sonrisa: ri, sorpresa: t > P3 + 0.6 && !ri, brazos: pal(0.5) });
  if (ri && t < RIEN + 2) for (let k = 0; k < 3; k++) { const v = ((t - RIEN) * 1.2 + k * 0.3) % 1; R.icono('!', 92 + k * 46, 124 - Math.round(v * 10), hex('#f8e060'), C.k); }
};
// p4 · el porche: la pareja y la pregunta
const INTERR = c(0.5), CAL = c(0.81), FUN = c(0.92);
const p4 = (t) => {
  T.casa(R, t, { encuadre: 'porche' });
  R.actor(EL.roberta, 110, 166, t, { dir: 1, dedo: t > P4 + 0.6 && t < P4 + 1.8, habla: t > P4 + 0.6 && t < P4 + 1.8 && Math.sin(t * 8) > 0, sorpresa: t > INTERR && t < INTERR + 0.6, dir: t > FUN - 0.2 ? 1 : 1, sonrisa: t > FUN });
  R.actor(EL.ken, 180, 166, t, { dir: -1, sonrisa: t > FUN, dedo: t > CAL - 0.2 && t < CAL + 0.8, sorpresa: t > INTERR && t < INTERR + 0.6 });
  const q = tramo(t, INTERR, INTERR + 0.35), yq = Math.round(lerp(104, 72, q) + Math.sin(t * 3) * 1.5);
  if (q > 0) R.icono('?', 154, yq, hex('#f8e060'), C.k, 3);
  const k = tramo(t, CAL, CAL + 0.3); if (k > 0) R.icono('calavera', 128, Math.round(lerp(100, 82, k)), hex('#f2eee2'), C.k, 2);
  if (t > FUN) R.icono('!', 190, 84 - Math.round(tramo(t, FUN, FUN + 0.3) * 6), hex('#ff8a8a'), C.k, 2);
};
const año = (t) => t < P3 ? 1984 : t < P4 ? 1985 : 1979;
const efectos = [[RESBALA, 'whoosh'], [RESBALA + 0.4, 'pop'], [ROCA - 0.45, 'whoosh'], [ROCA, 'boing'], [VERDE, 'brillo'], [PUF2, 'pop'],
  [P3 + 0.5, 'bip'], [RIEN, 'palmada'], [RIEN + 0.3, 'publico'], [INTERR, 'brillo'], [CAL, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')

E['si-hola'] = ('Hola', '''// SI-HOLA (frase 7). Un plano: la sala de las partidas guardadas. El disquete con ojos sale de su buzón de un salto,
// aterriza, se vuelve hacia Atom y lo saluda con la mano («I'm Atom»); mientras Atom se presenta asiente y señala los
// buzones; en «Let's find out» se pone firme (saludo militar) y se ilumina, listo para guardar: su buzón destella en verde.''', PIEZAS + r'''
const a = (f) => en('hola', f);
const BX = 22 + 33 * 2, BY = 34 + 25 * 3, SALE = 0.4, CAE = 1.1, FIRME = 5.06;
const p1 = (t) => {
  T.muerte(R, t, { encuadre: 'partidas', llenas: 23, luz: t > FIRME + 0.4 ? 14 : -1 });
  const u = tramo(t, SALE, CAE), sc = lerp(1.2, 2.6, u), x = Math.round(lerp(BX + 15, 128, u)), y = Math.round(lerp(BY + 20, 164, u) - Math.sin(u * Math.PI) * 30);
  const enSuelo = t >= CAE, sal = t > CAE + 0.2 && t < 3.0, firme = t > FIRME;
  if (t < SALE) { R.rect(BX + 6, BY + 8, BX + 24, BY + 18, hex('#1a1414')); R.rect(BX + 8, BY + 9, BX + 22, BY + 18, hex('#2a2e3a')); }
  T.disquete(R, x, enSuelo ? 164 : y, t, { s: Math.round(sc * 5) / 5, dir: 1, corre: 0, expresion: firme || sal ? 'feliz' : 'normal', saluda: firme ? 'militar' : sal ? 'mano' : false,
    guarda: tramo(t, FIRME + 0.3, FIRME + 0.8), salto: enSuelo && t < CAE + 0.25 ? 3 : t > 3.3 && t < 3.6 ? 3 : 0 });
  if (t > SALE - 0.1 && t < SALE + 0.5) for (let k = 0; k < 5; k++) R.pset(BX + 8 + k * 4, BY + 22 + (k % 2), hex('#e8d8a8'));
  if (enSuelo && t < CAE + 0.5) for (let k = 0; k < 6; k++) R.pset(128 - 16 + k * 6 + Math.round((t - CAE) * 20) * (k < 3 ? -1 : 1), 164 - (k % 2), hex('#c8b898'));
  // la señal: «!» al ver a Atom
  if (t > CAE + 0.1 && t < CAE + 0.7) R.icono('!', 146, 104, hex('#f8e060'), C.k, 2);
};
const efectos = [[SALE, 'pop'], [CAE, 'golpecito'], [CAE + 0.3, 'boing'], [FIRME + 0.3, 'brillo']];
T.rodar(E, R, [[0, p1]], { efectos });
''')
