E = {}
E['si-gracia'] = ('La gracia del peligro', '''// SI-GRACIA (frases 38–39), sin cartela; año 1988 (el reino) y 1995 (el salón). Tres planos:
// 1. el barranco al atardecer: el disquete corre a guardar en la orilla; graham pisa el tronco, se para a la mitad y
//    tiembla (caen piedrecitas, «!», el disquete se tapa los ojos) y llega al otro lado: brazos arriba y confeti
//    (corta en «victory»);
// 2. el salón de 1995: un chico teclea, el muñequito de la pantalla salta a propósito por el acantilado y sale el
//    cuadro de la calavera; los dos se parten de risa (corta en «Many players»);
// 3. el sofá: con el mando, otra vez al vacío a propósito; las palomitas saltan; en «narrator» el cuadro de la calavera
//    sale de la pantalla como un bocadillo y ríe; los dos se caen de risa y el gato se despierta.''', r'''
const a = (f) => en('gracia', f), b = (f) => en('proposito', f);
const P2 = a(0.94), P3 = b(0.377);
const ESCALON = a(0.429), LLEGA = a(0.755), VICTORIA = a(0.88), MUERE = b(0.095), CHISTE = b(0.229), APOSTA = b(0.462), NARRADOR = b(0.822);
const ruta = (t, pts) => {
  if (t <= pts[0][0]) return { x: pts[0][1], mv: false };
  for (let i = 0; i < pts.length - 1; i++) { const [t0, x0] = pts[i], [t1, x1] = pts[i + 1]; if (t < t1) return { x: Math.round(lerp(x0, x1, (t - t0) / (t1 - t0))), mv: x1 !== x0 }; }
  return { x: pts[pts.length - 1][1], mv: false };
};
const h = (k) => { const s = Math.sin(k * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const CONF = ['#e84a5a', '#f2c84a', '#5ac8f0', '#7ae86a', '#c87af0', '#ffffff'];
// confeti que estalla en (cx, cy) en el instante t0 y cae despacio, girando
const confeti = (cx, cy, t, t0, n = 46) => {
  const d = t - t0; if (d < 0) return;
  for (let k = 0; k < n; k++) {
    const ang = -Math.PI / 2 + (h(k) - 0.5) * 2.4, v = 50 + h(k + 9) * 70;
    const x = cx + Math.cos(ang) * v * Math.min(d, 0.6) + Math.sin(d * 3 + k) * 4 * Math.max(0, d - 0.4);
    const y = cy + Math.sin(ang) * v * Math.min(d, 0.6) + Math.max(0, d - 0.5) * (14 + h(k + 3) * 10);
    if (y > 178) continue; const c = hex(CONF[k % CONF.length]), giro = Math.floor(d * 8 + k) % 2;
    R.pset(Math.round(x), Math.round(y), c); if (giro) R.pset(Math.round(x) + 1, Math.round(y), c); else R.pset(Math.round(x), Math.round(y) + 1, c);
  }
};
// 1. el barranco: el tronco, el temblor y la llegada
const p1 = (t) => {
  T.reino(R, t, { encuadre: 'peligros', camara: 'barranco', luz: 'tarde' });
  const S = 122;
  // el disquete corre a guardar antes del peligro, y luego no puede mirar
  const dq = Math.round(lerp(-20, 26, tramo(t, 0.15, 0.85)));
  T.disquete(R, dq, S, t, { s: 1, dir: 1, corre: t < 0.85 ? 1 : 0, guarda: tramo(t, 0.95, 1.7), tapa: t > ESCALON + 0.05 && t < ESCALON + 1.3 ? 1 : 0, expresion: t > LLEGA ? 'feliz' : t > 1.9 ? 'susto' : 'normal', saluda: t > VICTORIA ? 'mano' : false });
  // graham: llega a la orilla, mira el vacío, pisa el tronco, se para y tiembla, y sigue hasta el otro lado
  const g = ruta(t, [[0, 2], [1.0, 44], [1.7, 44], [ESCALON - 0.1, 118], [ESCALON + 0.95, 118], [LLEGA - 0.05, 246]]);
  const tiembla = t > ESCALON - 0.1 && t < ESCALON + 0.95, gx = g.x + (tiembla ? Math.round(Math.sin(t * 46)) : 0);
  const brazos = t > VICTORIA - 0.25, salto = brazos ? Math.round(Math.abs(Math.sin((t - VICTORIA) * 7)) * 3) : 0;
  R.actor(EL.graham, gx, S, t, { dir: 1, anda: g.mv && !tiembla, sorpresa: (t > 1.0 && t < 1.6) || tiembla, brazos, sonrisa: t > LLEGA, salto });
  if (tiembla && t > ESCALON) R.bocadillo(gx + 7, S - 30, {});
  // las piedrecitas que se sueltan del tronco y caen al vacío
  for (let k = 0; k < 4; k++) { const d = t - (ESCALON + k * 0.18); if (d > 0 && d < 1.2) { const y = Math.round(S + 4 + 70 * d * d); if (y < 179) { R.pset(124 + k * 3 - 2, y, hex('#6a5a4a')); R.pset(125 + k * 3 - 2, y, hex('#8a7a62')); } } }
  confeti(gx + 7, S - 24, t, VICTORIA - 0.2);
};
// 2. el salón de 1995: salta a propósito y sale el cuadro
const p2 = (t) => {
  T.casa(R, t, { encuadre: 'jugadores', epoca: 1995, muerte: tramo(t, P2 + 0.2, CHISTE + 0.25) });
  T.gato(R, 50, 128, t);
  const S = 162, rie = t > CHISTE, bote = rie ? Math.round(Math.abs(Math.sin(t * 13)) * 2) : 0, bote2 = rie ? Math.round(Math.abs(Math.sin(t * 11 + 1)) * 2) : 0;
  // el amigo de la derecha teclea y lleva al muñequito al borde; el otro se acerca a mirar
  const tecla = !rie && t < MUERE ? [218, S - 13 + (Math.floor(t * 9) % 2)] : null;
  const amigo = ruta(t, [[P2, 150], [MUERE - 0.6, 150], [MUERE, 170]]);
  R.actor(EL.chico, amigo.x, S, t, { dir: 1, anda: amigo.mv, dedo: t > MUERE - 0.3 && t < CHISTE, sorpresa: t > MUERE && t < CHISTE - 0.1, sonrisa: rie, habla: rie && Math.sin(t * 16) > 0, salto: bote });
  R.actor(EL.adolescente, 200, S, t, { dir: rie && t > CHISTE + 0.5 ? -1 : 1, sostiene: tecla || undefined, brazos: rie && t > CHISTE + 0.25, sonrisa: rie || t > MUERE, habla: rie && Math.sin(t * 15 + 2) > 0, salto: bote2 });
};
// 3. el sofá: otra vez a propósito, las palomitas, el cuadro que «habla» y las carcajadas
const p3 = (t) => {
  const o = { encuadre: 'jugadores', camara: 'sofa', epoca: 1995 };
  T.casa(R, t, o);
  const S = 152, rie = (t > APOSTA + 0.35 && t < b(0.7)) || t > NARRADOR + 0.55;
  const bote = rie ? Math.round(Math.abs(Math.sin(t * 13)) * 2) : 0, bote2 = rie ? Math.round(Math.abs(Math.sin(t * 12 + 1)) * 3) : 0;
  T.gato(R, 206, 140, t);
  // el mando: lo aprieta en «died on purpose»
  const aprieta = t > APOSTA - 0.15 && t < APOSTA + 0.3;
  const m = R.actor(EL.adolescente, 139, S, t, { dir: -1, sostiene: rie ? undefined : [138, S - 13 + (aprieta ? 1 : 0)], brazos: rie && t > NARRADOR + 0.6, sonrisa: rie || t > NARRADOR, habla: rie && Math.sin(t * 15) > 0, salto: bote });
  if (!rie) { const [mx, my] = m.mano; R.rect(mx - 5, my - 2, mx + 3, my + 2, T.C.k); R.rect(mx - 4, my - 1, mx + 2, my + 1, hex('#5a5a68')); R.pset(mx - 3, my - 1, hex('#e84a5a')); R.pset(mx + 1, my, hex('#5ac8f0')); }
  R.actor(EL.chico, 75, S, t, { dir: 1, sonrisa: rie || t > APOSTA, habla: rie && Math.sin(t * 14 + 1) > 0, dedo: t > b(0.7) && t < NARRADOR + 0.5, brazos: rie && t < b(0.7) && t > APOSTA + 0.5, salto: bote2 });
  T.a_casaDelante(R, t, o);
  // las palomitas que saltan del bol con la primera carcajada
  const d = t - (APOSTA + 0.4);
  if (d > 0 && d < 1.4) for (let k = 0; k < 9; k++) { const vx = (h(k) - 0.5) * 60, vy = -60 - h(k + 4) * 40, x = Math.round(150 + vx * d), y = Math.round(160 + vy * d + 90 * d * d); if (y < 178) { R.rect(x - 1, y - 1, x + 1, y + 1, hex('#fff6d8')); R.pset(x, y - 1, hex('#e8c860')); } }
  // el cuadro de la calavera sale de la pantalla como un bocadillo («lo que diría el narrador»)
  const ab = tramo(t, NARRADOR - 0.1, NARRADOR + 0.3);
  if (ab > 0) {
    const x0 = 112, y0 = 22, w = 96, al = 52;
    R.rect(x0 - 1, y0 - 1, x0 + w + 1, y0 + al + 1, T.C.k); R.rect(x0, y0, x0 + w, y0 + al, hex('#fff8ec'));
    for (let i = 0; i < 9; i++) { R.rect(160 - 6 + i, y0 + al + 1 + i, 160 + 6 - i, y0 + al + 1 + i, hex('#fff8ec')); R.pset(160 - 7 + i, y0 + al + 1 + i, T.C.k); R.pset(160 + 7 - i, y0 + al + 1 + i, T.C.k); }
    T.cuadroMuerte(R, x0 + 6, y0 + 4, t, { w: 84, abre: ab, rie: t > NARRADOR + 0.5 ? 1 : 0, guino: t > NARRADOR + 0.9 && t < NARRADOR + 1.3 ? 1 : 0 });
  }
};
const efectos = [[0.95, 'brillo'], [ESCALON + 0.05, 'toc'], [VICTORIA - 0.2, 'pop'], [MUERE, 'boing'], [CHISTE + 0.2, 'palmada'], [APOSTA - 0.1, 'golpecito'], [APOSTA + 0.4, 'pop'], [NARRADOR, 'brillo'], [NARRADOR + 0.6, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: (t) => (t < P2 ? 1988 : 1995) });
''')

E['si-andromeda'] = ('Los dos tipos de Andrómeda', '''// SI-ANDROMEDA (frases 40–42), cartela «1986», año 1986. Cuatro planos:
// 1. el estudio blanco de la oficina de la montaña: los dos dibujantes en sus mesas; un compañero bebe en la fuente y
//    recoge una hoja de la impresora; con «Mark Crowe» y «Scott Murphy» cada uno se vuelve y saluda, y les brotan
//    unas antenas de broma (corta en «who called themselves»);
// 2. la mesa de cerca: el segundo llega con sus antenas, «Andromeda»: se chocan los cinco; «create Space Quest»: en la
//    pantalla despega un cohete y aparece un conserje diminuto con su escoba (corta en «Their hero»);
// 3. el pasillo de la nave: Roger barre y silba; en «isn't a knight» alza la escoba como una espada; el robot le sigue
//    y se traga el montón de polvo; se abre la puerta (corta en «His name»);
// 4. la radio de la nave: la mano pulsa el botón de hablar; «message received»: un bocadillo con «✓»; «will comply»:
//    otro con la mano de «vale».''', r'''
const d = (f) => en('dos', f), c = (f) => en('conserje', f), r = (f) => en('radio', f);
const P2 = d(0.551), P3 = c(0), P4 = r(0);
const MARK = d(0.341), SCOTT = d(0.416), ANDRO = d(0.755), CREA = d(0.869), KNIGHT = c(0.099), JANITOR = c(0.703);
const ROGER = r(0.334), RECIBIDO = r(0.453), WILCO = r(0.71), CUMPLE = r(0.835);
const ruta = (t, pts) => {
  if (t <= pts[0][0]) return { x: pts[0][1], mv: false };
  for (let i = 0; i < pts.length - 1; i++) { const [t0, x0] = pts[i], [t1, x1] = pts[i + 1]; if (t < t1) return { x: Math.round(lerp(x0, x1, (t - t0) / (t1 - t0))), mv: x1 !== x0 }; }
  return { x: pts[pts.length - 1][1], mv: false };
};
// las antenas de broma: dos muelles con bolitas verdes que brotan (a 0–1) y se balancean
const antenas = (cab, t, a, k = 0) => {
  if (a <= 0) return; const [cx, cy] = cab, l = Math.round(8 * Math.min(1.15, a * 1.3) - (a > 0.77 ? (a - 0.77) * 4 : 0));
  R.rect(cx - 5, cy + 1, cx + 5, cy + 1, hex('#3a3a4a'));
  for (const s of [-1, 1]) { const w = Math.round(Math.sin(t * 7 + k + s) * 1.4), x1 = cx + s * 5 + w, y1 = cy - l;
    R.linea(cx + s * 3, cy, x1, y1, T.C.k); R.disco(x1, y1 - 1, 2, T.C.k); R.disco(x1, y1 - 1, 1, hex('#7ae86a')); R.pset(x1 - 1, y1 - 2, hex('#e8ffe0')); }
};
const nota = (x, y, c) => { R.rect(x, y, x + 1, y + 1, c); R.rect(x + 2, y - 5, x + 2, y + 1, c); R.rect(x + 3, y - 5, x + 4, y - 4, c); };
// la escoba en la mano: modo 'barre' (el cepillo va y viene por el suelo), 'apoya' o 'alza' (en alto, como una espada)
const escoba = (m, dir, S, t, modo) => {
  const [hx, hy] = m, sw = modo === 'barre' ? Math.round(Math.sin(t * 9) * 3) : 0, palo = hex('#a86a3a'), paloS = hex('#6a3e1e');
  let x0, y0, x1, y1;
  if (modo === 'alza') { x0 = hx - dir * 2; y0 = hy + 6; x1 = hx + dir * 6; y1 = hy - 20; }
  else { x0 = hx - dir * 4; y0 = hy - 10; x1 = hx + dir * 9 + sw; y1 = S - 4; }
  R.linea(x0, y0, x1, y1, paloS); R.linea(x0 + 1, y0, x1 + 1, y1, palo);
  if (modo === 'alza') { R.rect(x1 - 3, y1 - 6, x1 + 3, y1 - 1, hex('#e8c060')); R.rect(x1 - 3, y1, x1 + 3, y1 + 1, hex('#a83a3a')); for (let i = -3; i <= 3; i += 2) R.pset(x1 + i, y1 - 6, hex('#a8843a')); return; }
  R.rect(x1 - 5, y1, x1 + 5, y1 + 1, hex('#a83a3a')); R.rect(x1 - 6, y1 + 2, x1 + 6, S, hex('#e8c060'));
  for (let i = -6; i <= 6; i += 2) R.pset(x1 + i, S, hex('#a8843a')); R.rect(x1 - 6, y1 + 2, x1 + 6, y1 + 2, hex('#c8a040'));
  if (modo === 'barre') for (let k = 0; k < 3; k++) { const f = (t * 2 + k / 3) % 1; R.pset(x1 + dir * (6 + Math.round(f * 10)), S - 1 - Math.round(f * 5), f < 0.5 ? hex('#c8c8d0') : hex('#8a8a98')); }
};
// 1. el estudio blanco: cada uno en su mesa; se vuelven, saludan y les brotan las antenas
const p1 = (t) => {
  T.oficina(R, t, { encuadre: 'oficina', epoca: 1986 });
  const S = 162;
  // el compañero del fondo: a la fuente, bebe, y a por la hoja de la impresora
  const q = ruta(t, [[1.3, 116], [2.2, 140], [3.5, 140], [4.4, 186], [6.7, 186]]);
  const bebe = t > 2.2 && t < 3.5, hoja = t > 4.6;
  const mq = R.actor(EL.tecnico, q.x, S - 4, t, { dir: t > 3.5 ? 1 : 1, anda: q.mv, sostiene: bebe ? [q.x + 15, S - 20] : hoja ? true : undefined, sonrisa: hoja });
  if (bebe) { const [mx, my] = mq.mano; R.rect(mx - 1, my - 3, mx + 2, my + 1, T.C.k); R.rect(mx, my - 2, mx + 1, my, hex('#ffffff')); }
  if (hoja) { const [mx, my] = mq.mano; R.rect(mx - 2, my - 8, mx + 5, my + 1, T.C.k); R.rect(mx - 1, my - 7, mx + 4, my, hex('#fbfbf4')); for (let j = my - 6; j < my - 1; j += 2) R.rect(mx, j, mx + 3, j, hex('#8a8aa0')); }
  // Mark: a la izquierda, teclea y se vuelve en su nombre; Scott: a la derecha, en el suyo
  const m1 = t > MARK, m2 = t > SCOTT, teclea = (x, dir) => [dir > 0 ? x + 15 : x - 1, S - 13 + (Math.floor(t * 8 + x) % 2)];
  const r1 = R.actor(EL.dibujante, 96, S, t, { dir: m1 ? 1 : -1, sostiene: m1 ? undefined : teclea(96, -1), dedo: m1 && t < MARK + 0.9, sonrisa: m1 });
  const r2 = R.actor(EL.dibujante2, 206, S, t, { dir: m2 ? -1 : 1, sostiene: m2 ? undefined : teclea(206, 1), dedo: m2 && t < SCOTT + 0.9, sonrisa: m2 });
  antenas(r1.cabeza, t, tramo(t, P2 - 0.85, P2 - 0.45), 0); antenas(r2.cabeza, t, tramo(t, P2 - 0.7, P2 - 0.3), 2);
};
// 2. la mesa de cerca: se chocan los cinco y en la pantalla nace Space Quest
const p2 = (t) => {
  const o = { encuadre: 'oficina', camara: 'mesa', epoca: 1986 };
  T.oficina(R, t, o);
  // la pantalla: despega el cohete y aparece el conserje diminuto con su escoba
  R.recorte([155, 79, 213, 123]);
  const u = tramo(t, CREA, CREA + 1.1);
  if (u > 0 && u < 1) { const x = Math.round(lerp(150, 220, u)), y = Math.round(lerp(118, 86, u));
    for (let k = 1; k < 6; k++) R.pset(x - 4 - k * 2, y + 2 + k, k % 2 ? hex('#f2c84a') : hex('#e84a3a'));
    R.poligono([[x - 4, y + 2], [x + 4, y - 2], [x + 2, y + 3]], hex('#e8e8f0')); R.pset(x + 1, y, hex('#5ac8f0')); R.pset(x - 3, y + 3, hex('#e84a3a')); }
  const v = tramo(t, CREA + 0.9, CREA + 1.3);
  if (v > 0) { const x = 184, y = 118 - Math.round((1 - v) * 4) + (Math.floor(t * 4) % 2);
    R.linea(x, y - 9, x + 2, y - 4, hex('#e0b860')); R.linea(x, y - 3, x, y, hex('#7a8aa8')); R.linea(x - 1, y - 3, x - 1, y, hex('#7a8aa8')); R.pset(x, y - 5, hex('#f6c290')); R.pset(x - 1, y - 5, hex('#e0b860'));
    R.linea(x + 2, y - 4, x + 5, y, hex('#a86a3a')); R.linea(x + 4, y, x + 7, y, hex('#e8c060')); }
  R.recorte(null);
  // Scott llega por detrás de la mesa; los dos se chocan los cinco en «Andromeda» y luego miran la pantalla
  const s = ruta(t, [[P2, 132], [P2 + 1.1, 86]]), mira = t > CREA - 0.05, choca = t > ANDRO - 0.35 && t < ANDRO + 0.5;
  const ra = R.actor(EL.dibujante, 62, 154, t, { dir: 1, dedo: choca || (mira && t > CREA + 0.5), sonrisa: t > P2 + 0.9, habla: !choca && !mira && t > P2 + 1.2 && Math.sin(t * 9) > 0 });
  const rb = R.actor(EL.dibujante2, s.x, 154, t, { dir: mira ? 1 : -1, anda: s.mv, dedo: choca, sonrisa: t > P2 + 1.1, habla: mira && t > CREA + 1.4 && Math.sin(t * 9) > 0 });
  antenas(ra.cabeza, t, 1, 0); antenas(rb.cabeza, t, 1, 2);
  // el choque: un destello de estrellas entre las dos manos
  const e = tramo(t, ANDRO - 0.05, ANDRO + 0.5);
  if (e > 0 && e < 1) { const cx = 81, cy = 112; for (let k = 0; k < 8; k++) { const ang = k * Math.PI / 4, rr = 3 + e * 10; R.pset(Math.round(cx + Math.cos(ang) * rr), Math.round(cy + Math.sin(ang) * rr), k % 2 ? hex('#f2c84a') : hex('#ffffff')); R.pset(Math.round(cx + Math.cos(ang) * (rr - 2)), Math.round(cy + Math.sin(ang) * (rr - 2)), hex('#f2c84a')); } }
  T.d_oficinaDelante(R, t, o);
};
// 3. el pasillo de la nave: barre, silba, alza la escoba y el robot se traga el polvo
const p3 = (t) => {
  const S = 150, g = ruta(t, [[P3, 64], [JANITOR - 0.1, 176]]), alza = t > KNIGHT && t < KNIGHT + 0.9, para = t > JANITOR - 0.1;
  const rx = g.x - 30;
  T.espacio(R, t, { encuadre: 'nave', puerta: tramo(t, JANITOR + 0.4, JANITOR + 1.1), robot: t > P4 - 1.1 ? Math.round(lerp(rx, g.x + 30, tramo(t, P4 - 1.1, P4 - 0.6))) : rx, robotDir: 1, robotAnda: g.mv || (t > P4 - 1.1 && t < P4 - 0.5) });
  // el montón de polvo que empuja la escoba (se lo traga el robot al final)
  const comido = t > P4 - 0.6, px = Math.min(g.x + 30, 210), crece = 2 + Math.round(tramo(t, P3, JANITOR) * 4);
  if (!comido) { R.disco(px, S, crece, hex('#6a6a78')); R.disco(px - 1, S - 1, crece - 1, hex('#9a9aa8')); R.pset(px + 1, S - crece, hex('#c8c8d0')); }
  const mano = alza ? [g.x + 14, S - 18] : [g.x + 14, S - 12 + (g.mv ? Math.round(Math.sin(t * 9)) : 0)];
  const ro = R.actor(EL.conserje, g.x, S, t, { dir: 1, anda: g.mv, sostiene: mano, sonrisa: para || alza, habla: !para && !alza && Math.sin(t * 6) > 0.6 });
  escoba(ro.mano, 1, S, t, alza ? 'alza' : g.mv ? 'barre' : 'apoya');
  // silba: las notas suben de su boca mientras barre
  if (!alza && t < JANITOR + 0.6) for (let k = 0; k < 3; k++) { const f = (t * 0.8 + k / 3) % 1; if (f < 0.85) nota(ro.cabeza[0] + 8 + Math.round(f * 10 + Math.sin(f * 8) * 2), ro.cabeza[1] - 2 - Math.round(f * 18), k % 2 ? hex('#5ae8f0') : hex('#f2c84a')); }
};
// 4. la radio: la mano pulsa el botón; «recibido» y «cumpliré»
const bocadillo = (x0, y0, x1, y1, cola, e) => {
  if (e <= 0) return; const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, k = e < 1 ? 0.5 + 0.5 * e + Math.sin(e * Math.PI) * 0.12 : 1;
  const a0 = Math.round(cx + (x0 - cx) * k), a1 = Math.round(cx + (x1 - cx) * k), b0 = Math.round(cy + (y0 - cy) * k), b1 = Math.round(cy + (y1 - cy) * k);
  R.rect(a0 + 2, b0 - 1, a1 - 2, b1 + 1, T.C.k); R.rect(a0 - 1, b0 + 2, a1 + 1, b1 - 2, T.C.k); R.rect(a0 + 1, b0, a1 - 1, b1, T.C.k);
  R.rect(a0 + 2, b0, a1 - 2, b1, hex('#fffdf2')); R.rect(a0, b0 + 2, a1, b1 - 2, hex('#fffdf2')); R.rect(a0 + 1, b0 + 1, a1 - 1, b1 - 1, hex('#fffdf2'));
  R.rect(a0 + 2, b1 - 2, a1 - 2, b1 - 1, hex('#e8e0c8'));
  if (e >= 1) { const [tx, ty] = cola, bx = Math.round(cx); R.poligono([[bx - 6, b1], [bx + 6, b1], [tx, ty]], T.C.k); R.poligono([[bx - 4, b1 - 1], [bx + 4, b1 - 1], [tx, ty - 2]], hex('#fffdf2')); }
};
const p4 = (t) => {
  const pulsa1 = t > ROGER - 0.15 && t < RECIBIDO + 0.75, pulsa2 = t > WILCO - 0.15 && t < CUMPLE + 0.6;
  const habla = Math.max(tramo(t, ROGER - 0.1, ROGER + 0.2) - tramo(t, RECIBIDO + 0.6, RECIBIDO + 0.9), tramo(t, WILCO - 0.1, WILCO + 0.2) - tramo(t, CUMPLE + 0.5, CUMPLE + 0.8));
  T.espacio(R, t, { encuadre: 'puente', camara: 'radio', habla });
  bocadillo(84, 20, 156, 60, [56, 96], tramo(t, RECIBIDO - 0.1, RECIBIDO + 0.25));
  if (t > RECIBIDO + 0.2) T.visto(R, 104, 28, 3);
  bocadillo(206, 20, 268, 60, [194, 58], tramo(t, CUMPLE - 0.1, CUMPLE + 0.25));
  if (t > CUMPLE + 0.2) { const bo = Math.round(Math.abs(Math.sin((t - CUMPLE) * 6)) * 2); R.icono('mano', 226, 26 - bo, hex('#f6c290'), T.C.k, 4); R.rect(226, 50 - bo, 249, 52 - bo, hex('#7a8aa8')); }
  // la mano del conserje: entra desde abajo a la derecha, pulsa, se levanta y vuelve a pulsar
  const entra = tramo(t, ROGER - 0.8, ROGER - 0.2), hund = pulsa1 || pulsa2 ? 2 : -3;
  const x1 = Math.round(lerp(345, 276, entra)), y1 = 156 + hund + Math.round((1 - entra) * 10);
  if (entra > 0) T.brazo(R, x1 + 46, 186, x1, y1, '#7a8aa8', -1, { codo: [x1 + 26, y1 + 18] });
};
const efectos = [[MARK - 0.1, 'tecleo'], [P2 - 0.8, 'boing'], [ANDRO, 'palmada'], [CREA, 'whoosh'], [P3 + 0.6, 'silbato'], [KNIGHT, 'whoosh'], [JANITOR + 0.4, 'puerta'], [P4 - 0.6, 'pop'], [ROGER - 0.15, 'interruptor'], [RECIBIDO, 'bip'], [WILCO - 0.15, 'interruptor'], [CUMPLE, 'bip']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1986', efectos, año: 1986 });
''')

E['si-asalto'] = ('El asalto', '''// SI-ASALTO (frases 43–44), sin cartela, año 1986. Cuatro planos:
// 1. el armario de las escobas: Roger duerme con la cabeza en el cubo (la pompa del ronquido); por la ventanilla se
//    acopla la nave alienígena y, por el pasillo de delante, pasan de puntillas dos alienígenas con casco; salta la
//    alarma y la pompa revienta (corta en «And it's up to him»);
// 2. el puente con la alarma: Roger entra corriendo, mira la nave alienígena por el ventanal y vacía los bolsillos: un
//    patito, un bocadillo, un yoyó y un calcetín van a sus casillas; se encoge de hombros (corta tras «pockets»);
// 3. el planeta desierto: Roger barre la arena silbando, de espaldas a su nave; un platillo de película colgado de un
//    hilo cruza el cielo («science fiction movies»); la nave tiembla y estalla en fuegos de colores (corta en «most»);
// 4. de cerca: los fuegos siguen; un engranaje cae a sus pies; se da la vuelta, se asombra y se rasca la cabeza: «?».''', r'''
const a = (f) => en('armario', f), p = (f) => en('pelis', f);
const P2 = a(0.477), P3 = p(0) - 0.8, P4 = p(0.65);
const ALIENS = a(0.272), BOLSILLOS = a(0.798), SALVAR = a(0.627), PELIS = p(0.216), MUERTES = p(0.767);
const EXP0 = p(0.47), FLASH = EXP0 + 0.16 * 4;
const ruta = (t, pts) => {
  if (t <= pts[0][0]) return { x: pts[0][1], mv: false };
  for (let i = 0; i < pts.length - 1; i++) { const [t0, x0] = pts[i], [t1, x1] = pts[i + 1]; if (t < t1) return { x: Math.round(lerp(x0, x1, (t - t0) / (t1 - t0))), mv: x1 !== x0 }; }
  return { x: pts[pts.length - 1][1], mv: false };
};
const nota = (x, y, c) => { R.rect(x, y, x + 1, y + 1, c); R.rect(x + 2, y - 5, x + 2, y + 1, c); R.rect(x + 3, y - 5, x + 4, y - 4, c); };
const escoba = (m, dir, S, t, modo) => {
  const [hx, hy] = m, sw = modo === 'barre' ? Math.round(Math.sin(t * 9) * 3) : 0, palo = hex('#a86a3a'), paloS = hex('#6a3e1e');
  const x0 = hx - dir * 4, y0 = hy - 10, x1 = hx + dir * 9 + sw, y1 = S - 4;
  R.linea(x0, y0, x1, y1, paloS); R.linea(x0 + 1, y0, x1 + 1, y1, palo);
  R.rect(x1 - 5, y1, x1 + 5, y1 + 1, hex('#a83a3a')); R.rect(x1 - 6, y1 + 2, x1 + 6, S, hex('#e8c060'));
  for (let i = -6; i <= 6; i += 2) R.pset(x1 + i, S, hex('#a8843a')); R.rect(x1 - 6, y1 + 2, x1 + 6, y1 + 2, hex('#c8a040'));
  if (modo === 'barre') for (let k = 0; k < 4; k++) { const f = (t * 2 + k / 4) % 1; R.pset(x1 + dir * (6 + Math.round(f * 12)), S - 1 - Math.round(f * 6), f < 0.5 ? hex('#f2d8a0') : hex('#c8a870')); }
};
// Roger tumbado: se pinta de pie en un búfer y se copia girado (la cabeza a la izquierda, en alto sobre el cubo)
const BUF = R.nuevo();
const tumbado = (x0, yb, t, o) => {
  const prev = R.usar(BUF); R.rect(0, 0, 40, 50, 0); R.actor(EL.conserje, 10, 44, t, { dir: 1, ...o });
  const px = []; for (let j = 4; j < 45; j++) for (let i = 8; i < 28; i++) { const c = R.pget(i, j); if (c) px.push([i, j, c]); }
  R.usar(prev);
  const jt = px.length ? Math.min(...px.map((q) => q[1])) : 0;
  for (const [i, j, c] of px) { const k = j - jt; R.pset(x0 + k, yb - (i - 8) - Math.round(Math.max(0, 9 - k * 0.45)), c); }
  return { cabeza: [x0 + 6, yb - 22] };
};
// 1. el armario: duerme; la nave se acopla; los alienígenas pasan de puntillas; salta la alarma
const p1 = (t) => {
  const al = tramo(t, ALIENS + 0.85, ALIENS + 1.2);
  T.espacio(R, t, { encuadre: 'nave', camara: 'armario', acople: tramo(t, 1.3, ALIENS + 0.6), almohada: 114, alarma: al });
  const ro = tumbado(110, 150, t, { parpadea: true, sorpresa: al > 0.5 && t > P2 - 0.35 });
  // la pompa del ronquido: crece y revienta con la alarma
  if (al < 0.6) { const f = (t / 1.8) % 1, rr = Math.round(1 + f * 4); R.disco(ro.cabeza[0] + 6, ro.cabeza[1] - rr, rr, hex('#bfe8ff')); R.disco(ro.cabeza[0] + 6, ro.cabeza[1] - rr, Math.max(0, rr - 1), hex('#e8f8ff')); R.pset(ro.cabeza[0] + 5, ro.cabeza[1] - rr - 1, hex('#ffffff')); }
  else if (t < ALIENS + 1.6) for (let k = 0; k < 6; k++) R.pset(ro.cabeza[0] + 6 + Math.round(Math.cos(k) * 5), ro.cabeza[1] - 4 + Math.round(Math.sin(k) * 4), hex('#bfe8ff'));
  // por el pasillo de delante, dos alienígenas de puntillas con su pistola de rayos
  for (let k = 0; k < 2; k++) {
    const x = Math.round(lerp(330 + k * 24, 196 + k * 24, tramo(t, ALIENS - 0.1, P2 + 0.2)));
    if (x > 330) continue; const mira = k === 0 && t > ALIENS + 0.9;
    const m = R.actor(EL.alien, x, 178, t, { dir: -1, anda: x > 196 + k * 24, sostiene: true, sorpresa: mira, sonrisa: k === 1 });
    const [mx, my] = m.mano; R.rect(mx - 6, my - 2, mx + 1, my + 1, T.C.k); R.rect(mx - 5, my - 1, mx, my, hex('#c8c8d8')); R.pset(mx - 6, my - 1, hex('#7ae86a'));
  }
};
// 2. el puente con la alarma: entra corriendo, mira la nave por el ventanal y vacía los bolsillos
const CASILLAS = [122, 142, 162, 182];
const objeto = (k, x, y) => {
  const P = (dx, dy, c) => R.pset(x + dx, y + dy, hex(c));
  if (k === 0) { R.disco(x + 1, y + 3, 4, hex('#c89a1a')); R.disco(x + 1, y + 3, 3, hex('#f2d03a')); R.disco(x - 2, y - 2, 3, hex('#c89a1a')); R.disco(x - 2, y - 2, 2, hex('#f2d03a')); P(-5, -2, '#e8782a'); P(-6, -2, '#e8782a'); P(-3, -3, '#2a2a34'); P(2, 1, '#fff2a0'); }
  else if (k === 1) { R.rect(x - 5, y - 3, x + 5, y + 4, hex('#2a2a34')); R.rect(x - 4, y - 2, x + 4, y - 1, hex('#e8c080')); R.rect(x - 4, y, x + 4, y, hex('#5ac84a')); R.rect(x - 4, y + 1, x + 4, y + 1, hex('#e84a3a')); R.rect(x - 4, y + 2, x + 4, y + 3, hex('#d8a860')); }
  else if (k === 2) { R.disco(x, y, 5, hex('#2a2a34')); R.disco(x, y, 4, hex('#e84a5a')); R.rect(x - 4, y, x + 4, y, hex('#a82a3a')); R.pset(x - 1, y - 2, hex('#ffb0b8')); R.linea(x, y, x + 2, y - 6, hex('#f2eee2')); }
  else { R.rect(x - 2, y - 5, x + 2, y + 2, hex('#2a2a34')); R.rect(x - 1, y - 4, x + 1, y + 1, hex('#f2eee2')); R.rect(x - 1, y - 2, x + 1, y - 2, hex('#e84a3a')); R.rect(x - 1, y, x + 1, y, hex('#e84a3a')); R.rect(x - 4, y + 2, x + 2, y + 4, hex('#2a2a34')); R.rect(x - 3, y + 2, x + 1, y + 3, hex('#f2eee2')); }
};
const p2 = (t) => {
  T.espacio(R, t, { encuadre: 'puente', alarma: 1 });
  // la nave alienígena se asoma por el paño del centro del ventanal
  R.recorte([113, 17, 207, 92]);
  { const sx = Math.round(lerp(230, 172, tramo(t, P2, SALVAR + 0.4))), sy = 42 + Math.round(Math.sin(t * 2.5) * 2);
    R.disco(sx, sy + 3, 15, hex('#3e1e5a')); R.disco(sx, sy + 2, 14, hex('#7a3a9a')); R.disco(sx, sy - 5, 8, hex('#7ae86a')); R.disco(sx - 2, sy - 7, 3, hex('#c8ffc0'));
    for (let k = -2; k <= 2; k++) R.disco(sx + k * 6, sy + 5, 1, Math.floor(t * 6 + k) % 2 ? hex('#f2c84a') : hex('#e84a3a'));
    for (let y = sy + 10; y < 92; y++) if ((y + Math.floor(t * 10)) % 3) R.linea(sx - Math.round((y - sy) * 0.25), y, sx + Math.round((y - sy) * 0.25), y, hex('#3a7a4a'), 2); }
  R.recorte(null);
  const S = 160, g = ruta(t, [[P2, -18], [P2 + 1.0, 144]]), saca = t > BOLSILLOS - 0.15, encoge = t > BOLSILLOS + 1.2;
  R.actor(EL.conserje, g.x, S, t, { dir: 1, anda: g.mv, sorpresa: t > P2 + 1.0 && t < SALVAR + 0.6, brazos: encoge, sonrisa: encoge, dedo: saca && !encoge });
  // los bolsillos del revés y las cosas que vuelan a sus casillas
  if (saca) { R.rect(g.x + 1, S - 11, g.x + 4, S - 8, hex('#f2eee2')); R.rect(g.x + 11, S - 11, g.x + 14, S - 8, hex('#f2eee2')); }
  for (let k = 0; k < 4; k++) {
    const e = tramo(t, BOLSILLOS - 0.25 + k * 0.2, BOLSILLOS - 0.05 + k * 0.2), cx = CASILLAS[k] + 7, cy = 108;
    if (tramo(t, BOLSILLOS - 0.45, BOLSILLOS - 0.25) > 0) { R.rect(CASILLAS[k] - 1, 99, CASILLAS[k] + 15, 117, T.C.k); R.rect(CASILLAS[k], 100, CASILLAS[k] + 14, 116, hex('#3a4a6a')); R.rect(CASILLAS[k] + 1, 101, CASILLAS[k] + 13, 115, hex('#5a6a8a')); R.rect(CASILLAS[k] + 1, 101, CASILLAS[k] + 13, 101, hex('#8a9ac0')); }
    if (e > 0) { const x = Math.round(lerp(g.x + 8, cx, e)), y = Math.round(lerp(S - 12, cy, e) - Math.sin(e * Math.PI) * 18); objeto(k, x, y); }
  }
};
// 3. el desierto: barre de espaldas a la nave; el platillo de película; la nave estalla
const platillo = (t) => {
  const u = tramo(t, P3 + 0.4, PELIS + 1.4); if (u <= 0 || u >= 1) return;
  const sx = Math.round(lerp(182, 266, u)), sy = 54 + Math.round(Math.sin(t * 5) * 2), tilt = Math.round(Math.sin(t * 3));
  R.linea(sx, 0 + 16, sx, sy - 5, hex('#d8d8e0')); R.linea(sx, 0, sx, 15, hex('#d8d8e0'), 2);
  R.disco(sx, sy - 2, 4, hex('#5ac8f0')); R.pset(sx - 1, sy - 4, hex('#e8ffff'));
  R.poligono([[sx - 11, sy + tilt], [sx + 11, sy - tilt], [sx + 7, sy + 3 - tilt], [sx - 7, sy + 3 + tilt]], hex('#8a8a98'));
  R.linea(sx - 11, sy + tilt, sx + 11, sy - tilt, hex('#c8c8d8'));
  for (let k = -2; k <= 2; k++) R.pset(sx + k * 4, sy + 1, Math.floor(t * 8 + k) % 2 ? hex('#f2c84a') : hex('#e84a3a'));
};
const p3 = (t) => {
  T.espacio(R, t, { encuadre: 'desierto', explosion: tramo(t, EXP0, EXP0 + 4) });
  platillo(t);
  const S = 150, g = ruta(t, [[P3, 112], [P4, 82]]);
  const ro = R.actor(EL.conserje, g.x, S, t, { dir: -1, anda: g.mv && Math.sin(t * 3) > 0, sostiene: [g.x - 1, S - 12 + Math.round(Math.sin(t * 9))], sonrisa: true, habla: Math.sin(t * 6) > 0.5 });
  escoba(ro.mano, -1, S, t, 'barre');
  for (let k = 0; k < 3; k++) { const f = (t * 0.8 + k / 3) % 1; if (f < 0.85) nota(ro.cabeza[0] - 12 - Math.round(f * 10), ro.cabeza[1] - 2 - Math.round(f * 18), k % 2 ? hex('#5a3ab0') : hex('#e84a5a')); }
};
// 4. de cerca: el engranaje cae, se da la vuelta y se rasca la cabeza
const p4 = (t) => {
  T.espacio(R, t, { encuadre: 'desierto', camara: 'cerca', explosion: tramo(t, EXP0, EXP0 + 4) });
  const S = 158, cae = MUERTES + 0.4, vuelve = cae + 0.55;
  // el engranaje: sale volando de la explosión y cae a sus pies
  const u = tramo(t, P4 + 0.2, cae);
  { const x = Math.round(lerp(96, 184, u)), y = u < 1 ? Math.round(lerp(80, S - 3, u) - Math.sin(u * Math.PI) * 50) : S - 3 - Math.round(Math.abs(Math.sin((t - cae) * 9)) * Math.max(0, 3 - (t - cae) * 6));
    if (u > 0) { R.disco(x, y, 4, T.C.k); R.disco(x, y, 3, hex('#a8b2c0')); for (let k = 0; k < 6; k++) { const ang = k * Math.PI / 3 + (u < 1 ? t * 8 : 0); R.pset(Math.round(x + Math.cos(ang) * 5), Math.round(y + Math.sin(ang) * 5), hex('#7a8494')); } R.disco(x, y, 1, hex('#4e5664')); } }
  const vuelta = t > vuelve, sorpresa = vuelta && t < vuelve + 0.6, rasca = t > vuelve + 0.6;
  const ro = R.actor(EL.conserje, 148, S, t, { dir: vuelta ? -1 : 1, sostiene: vuelta ? (rasca ? undefined : [146, S - 13]) : [163, S - 12 + Math.round(Math.sin(t * 9))], sorpresa, dedo: rasca, sonrisa: !vuelta });
  if (!rasca) escoba(ro.mano, vuelta ? -1 : 1, S, t, vuelta ? 'apoya' : 'barre');
  else { R.linea(ro.cabeza[0] + 10, ro.cabeza[1] + 4, ro.cabeza[0] + 16, S - 1, hex('#6a3e1e')); R.rect(ro.cabeza[0] + 12, S - 4, ro.cabeza[0] + 22, S, hex('#e8c060')); R.rect(ro.cabeza[0] + 12, S - 5, ro.cabeza[0] + 22, S - 5, hex('#a83a3a')); }
  if (rasca) R.bocadillo(ro.cabeza[0], ro.cabeza[1] - 6, { icono: '?' });
};
const efectos = [[1.4, 'zumbido'], [ALIENS + 0.85, 'aviso'], [P2 + 0.2, 'carro'], [BOLSILLOS - 0.2, 'pop'], [BOLSILLOS + 0.2, 'pop'], [P3 + 0.5, 'silbato'], [PELIS - 0.3, 'zumbido'], [FLASH, 'boom'], [MUERTES + 0.4, 'toc'], [MUERTES + 1.6, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1986 });
''')
