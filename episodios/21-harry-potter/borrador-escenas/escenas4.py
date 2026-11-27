E = {}

E['hp-peeves'] = ('Flitwick y Peeves', '''// HP-PEEVES (frase 14), 2026 (la serie). Dos planos:
// 1. el aula de encantamientos, ante la pizarra: Flitwick, sobre su pila de libros encima de la mesa, saluda con un
//    saltito («recognize»), alza la varita en «Flitwick» y la pluma sube de la mesa y flota en ocho; los alumnos de
//    delante se asombran y aplauden («again»), la pluma hace un bucle («movies») y en «And someone» una tiza entra
//    volando por la izquierda y se estrella contra la pizarra (corta en «you've»);
// 2. la sala común, la chimenea de cerca: Harry lee en su butaca y Ron dormita en la otra; en «Peeves» el poltergeist sale
//    del fuego entre chispas, saca tizas del gorro y en «prankster» tira una a la butaca de Ron y otra a la snitch, que la
//    esquiva (gag 3); en «played by» hace una voltereta riéndose y en el final se va chimenea arriba.''', r'''
const at = (s) => en('flitwick', (s - 0.5) / 12.452);
const P2 = at(7.09);
const salta = at(1.62), varita = at(2.92), aplauso = at(4.4), bucle = at(5.6), tizaV = at(6.62);
const sale = at(8.88), tiro1 = at(9.55), tiro2 = at(10.25), rie = at(10.95), vuelta = at(11.6), vase = at(13.05);
const TZ = hex('#f4f2e6'), TZS = hex('#c8c4b4');
const tiza = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x - 5, y - 2, x + 5, y + 2, T.C.k); R.rect(x - 4, y - 1, x + 4, y, TZ); R.rect(x - 4, y + 1, x + 4, y + 1, TZS); R.pset(x - 3, y - 1, hex('#ffffff')); };
const estela = (x0, y0, x1, y1, u) => { for (let k = 1; k <= 5; k++) { const v = Math.max(0, u - k * 0.05); R.pset(Math.round(lerp(x0, x1, v)), Math.round(lerp(y0, y1, v) - Math.sin(Math.PI * v) * 18), k < 3 ? TZ : TZS); } };
// la pluma: cálamo pardo y barbas blancas con su sombra, inclinada ang (rad)
const pluma = (x, y, ang) => {
  const c = Math.cos(ang), s = Math.sin(ang), W = (i) => (i < -10 ? 0.6 : i > 8 ? 2.2 - (i - 8) * 0.4 : 3.6 - Math.abs(i + 1) * 0.08);
  for (const borde of [1.2, 0]) for (let i = -14; i <= 12; i++) { const w = W(i) + borde; for (let j = -w; j <= w; j += 0.5) R.pset(Math.round(x + c * i - s * j), Math.round(y + s * i + c * j), borde ? T.C.k : j > 1.2 ? hex('#b8bccc') : j > 0 ? hex('#dcdee8') : hex('#fbfaf4')); }
  for (let i = -16; i <= 10; i++) R.pset(Math.round(x + c * i), Math.round(y + s * i), i < -11 ? hex('#8a6a4a') : hex('#c8beb0'));
  for (const i of [-6, 1, 6]) R.pset(Math.round(x + c * i + s * 2), Math.round(y + s * i - c * 2), hex('#9a9eb0'));
};
const chispas = (x, y, t, n, r) => { for (let k = 0; k < n; k++) { const a = k * 2.4 + t * 5, d = r * ((t * 1.7 + k * 0.37) % 1); const on = Math.sin(t * 13 + k) > -0.2; if (on) R.pset(Math.round(x + Math.cos(a) * d), Math.round(y + Math.sin(a) * d), k % 3 ? hex('#ffe08a') : hex('#ffffff')); } };
const p1 = (t) => {
  T.hogwarts(R, t, { encuadre: 'aula', camara: 'pizarra' });
  // Flitwick sobre su pila de libros, encima de la mesa del profesor
  const fx = 172, fy = 131, hop = Math.round(Math.sin(Math.PI * tramo(t, salta - 0.3, salta + 0.3)) * 7);
  const conj = tramo(t, varita - 0.25, varita + 0.9), vara = t > varita - 0.25;
  const giro = Math.sin(conj * Math.PI * 3) * (1 - conj);
  const ducha = t > tizaV + 0.25 && t < tizaV + 1.1;
  const a = R.actor(EL.flitwick, fx, fy, t, { dir: -1, salto: hop, sonrisa: !ducha, sorpresa: ducha, habla: t < varita - 0.3 && Math.sin(t * 8) > 0,
    sostiene: vara ? [fx - 6 + Math.round(giro * 4), fy - 26 - Math.round(Math.abs(giro) * 3)] : undefined });
  const [mx, my] = a.mano;
  if (vara) { T.PIEZAS_HP.varita(R, mx, my + 2, { t, chispa: t > varita && t < bucle + 1.2 }); }
  // la pluma: de la mesa sube y flota en ocho; en «movies» da un bucle
  const sube = tramo(t, varita + 0.1, varita + 1.2), b = tramo(t, bucle, bucle + 1.1);
  let px = 118, py = 127;
  if (sube > 0) { px = lerp(118, 120, sube) + Math.sin(t * 1.9) * 16 * sube; py = lerp(127, 64, sube) + Math.sin(t * 3.8) * 5 * sube; }
  if (b > 0 && b < 1) { px += Math.sin(b * Math.PI * 2) * 14; py -= (1 - Math.cos(b * Math.PI * 2)) * 12; }
  pluma(px, py, sube > 0 ? Math.sin(t * 2.2) * 0.5 + (b > 0 && b < 1 ? b * 6.28 : 0) : 0.05);
  if (sube > 0 && t < bucle + 1.3) chispas(px, py, t, 10, 14);
  if (t > varita && t < varita + 1.2) { const u = tramo(t, varita, varita + 1.2); for (let k = 0; k < 6; k++) { const v = (u + k / 6) % 1; R.pset(Math.round(lerp(mx + 1, px, v)), Math.round(lerp(my - 9, py, v) - Math.sin(Math.PI * v) * 8), hex('#ffe08a')); } }
  // la snitch mira la pluma desde la esquina de la pizarra
  const sn = t < tizaV + 0.2 ? 'normal' : t < tizaV + 1 ? 'susto' : 'normal';
  T.snitch(R, 236 + Math.sin(t * 1.3) * 6, 70 + (px - 128) * 0.1, t, { vuela: 0.5, cara: sn });
  // la tiza que entra volando y se estrella contra la pizarra; deja su raya y el polvo
  const u = tramo(t, tizaV, tizaV + 0.55);
  if (u > 0 && u < 1) { estela(-6, 74, 150, 52, u); tiza(lerp(-6, 150, u), lerp(74, 52, u) - Math.sin(Math.PI * u) * 18); }
  if (u >= 1) { const d = tramo(t, tizaV + 0.55, tizaV + 1.6); R.linea(146, 50, 154, 54, TZ); R.linea(150, 48, 152, 56, TZS); for (let k = 0; k < 7; k++) R.pset(150 + Math.round(Math.cos(k * 0.9) * d * 8), 52 + Math.round(Math.sin(k * 0.9) * d * 5 + d * d * 10), TZS);
    if (d < 1) tiza(150 + d * 6, 54 + d * d * 70); }
  T.hogwartsDelante(R, t, { encuadre: 'aula', camara: 'pizarra' });
  // los alumnos de delante, de espaldas a nosotros mirando la pluma: se asombran, aplauden y se agachan con la tiza
  const asombro = t > varita + 0.5, aplau = t > aplauso && t < aplauso + 1.3;
  const bote = (k) => (aplau ? Math.round(Math.abs(Math.sin(t * 9 + k)) * 3) : 0);
  R.actor(EL.ron, 4, 190, t, { dir: 1, sorpresa: (asombro && !aplau) || ducha, brazos: aplau, salto: bote(0), habla: t > bucle && t < bucle + 0.8 });
  R.actor(EL.neville, 42, 192, t, { dir: 1, sorpresa: ducha, sonrisa: asombro && !ducha, salto: bote(1) });
  R.actor(EL.alumno, 80, 191, t, { dir: 1, sorpresa: ducha || (t > varita + 0.4 && t < aplauso), brazos: aplau, salto: bote(2) });
  R.actor(EL.alumna, 208, 191, t, { dir: -1, sorpresa: ducha || (t > varita + 0.4 && t < aplauso), brazos: aplau, salto: bote(3) });
  R.actor(EL.hermione, 246, 190, t, { dir: -1, sonrisa: asombro && !ducha, dedo: aplau, sorpresa: ducha });
  R.actor(EL.alumno, 286, 192, t, { dir: -1, sorpresa: ducha, sonrisa: asombro && !ducha, brazos: aplau, salto: bote(4), pal: { H: hex('#c8783a'), h: hex('#e09a5a') } });
};
const p2 = (t) => {
  T.hogwarts(R, t, { encuadre: 'sala', camara: 'chimenea' });
  // Peeves sale del fuego entre chispas, sube y se queda flotando delante de la chimenea, meciéndose
  const s = tramo(t, sale - 0.15, sale + 0.7), va = tramo(t, vase, vase + 0.9);
  const flota = Math.sin(t * 2.6) * 3, vx = Math.round(152 + Math.sin(t * 1.1) * 10 * s + va * 40), vy = Math.round(lerp(140, 98, s) + flota - va * 120);
  const voltea = tramo(t, vuelta, vuelta + 0.7);
  const conTiza1 = t > sale + 0.4 && t < tiro1, conTiza2 = t > tiro1 + 0.15 && t < tiro2;
  // Harry lee en su butaca; Ron dormita en la otra
  const golpe = t > tiro1 + 0.45, sorpresa = t > sale && t < tiro1;
  const h = R.actor(EL.harry, 26, 150, t, { dir: 1, sostiene: t < sale ? true : undefined, sorpresa, sonrisa: t > rie, habla: t > tiro2 + 0.5 && t < rie && Math.sin(t * 8) > 0 });
  if (t < sale) T.PIEZAS_HP.libro(R, h.mano[0] + 2, h.mano[1] + 4, { abierto: true });
  R.actor(EL.ron, 276, 150 - (golpe && t < tiro1 + 0.8 ? 4 : 0), t, { dir: -1, sorpresa: golpe && t < rie, enfado: t > rie && t < vase, quieto: t < sale });
  if (t < sale) for (let k = 0; k < 3; k++) { const z = (t * 0.7 + k / 3) % 1, r = Math.round(1 + z * 2); R.disco(Math.round(272 - z * 10), Math.round(116 - z * 16), r, hex('#cfe0f4')); R.pset(Math.round(271 - z * 10), Math.round(115 - z * 16), hex('#ffffff')); }
  if (s > 0 && va < 1) {
    if (t < sale + 0.5 && Math.floor(t * 20) % 2) { /* parpadea al aparecer */ } else {
      // el halo frío del fantasma, para que se lea sobre el hogar oscuro
      for (let k = 0; k < 26; k++) { const a = k * 0.83 + t * 1.5, d = 15 + Math.sin(t * 3 + k) * 2; R.pset(Math.round(vx + 7 + Math.cos(a) * d), Math.round(vy - 13 + Math.sin(a) * d * 1.05), k % 2 ? hex('#a8c0f0') : hex('#e8f0ff')); }
      const p = R.actor(EL.peeves, vx, vy, t, { opaco: true, dir: t < tiro1 + 0.3 ? 1 : -1, sonrisa: true, salto: voltea > 0 && voltea < 1 ? Math.round(Math.sin(voltea * Math.PI) * 12) : 0,
        sostiene: conTiza1 ? [vx + 18, vy - 20] : conTiza2 ? [vx - 4, vy - 22] : undefined, dedo: (t > tiro1 && t < tiro1 + 0.3) || (t > tiro2 && t < tiro2 + 0.3), habla: t > rie && Math.sin(t * 10) > 0 });
      if (conTiza1 || conTiza2) tiza(p.mano[0], p.mano[1] - 1);
    }
    chispas(160, 132, t, s < 1 ? 12 : 4, s < 1 ? 26 : 10);
  }
  // la tiza a la butaca de Ron y la otra a la snitch, que la esquiva
  const u1 = tramo(t, tiro1, tiro1 + 0.45); if (u1 > 0 && u1 < 1) { estela(172, 78, 268, 128, u1); tiza(lerp(172, 268, u1), lerp(78, 128, u1) - Math.sin(Math.PI * u1) * 18); }
  if (u1 >= 1 && t < tiro1 + 1.4) { const d = tramo(t, tiro1 + 0.45, tiro1 + 1.4); tiza(268 - d * 20, 128 + d * d * 40); }
  const u2 = tramo(t, tiro2, tiro2 + 0.5); if (u2 > 0 && u2 < 1) { estela(148, 74, 40, 80, u2); tiza(lerp(148, 74 + 0, u2) * 0 + lerp(148, 40, u2), lerp(74, 80, u2) - Math.sin(Math.PI * u2) * 18); }
  const esq = tramo(t, tiro2 + 0.2, tiro2 + 0.45) - tramo(t, tiro2 + 0.9, tiro2 + 1.5);
  T.snitch(R, 80 + Math.sin(t * 1.7) * 8, 70 - esq * 22, t, { vuela: 0.6, cara: esq > 0.1 ? 'susto' : t > rie + 1 ? 'feliz' : 'normal' });
  T.hogwartsDelante(R, t, { encuadre: 'sala', camara: 'chimenea' });
};
const efectos = [[salta, 'boing'], [varita + 0.05, 'brillo'], [aplauso + 0.1, 'palmada'], [tizaV + 0.55, 'golpecito'], [sale, 'whoosh'], [tiro1 + 0.45, 'golpecito'], [tiro2 + 0.25, 'whoosh'], [vuelta, 'boing'], [vase + 0.1, 'whoosh']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: 2026 });
''')

E['hp-cortes'] = ('Al suelo de la sala de montaje', '''// HP-CORTES (frase 15). Dos planos:
// 1. el corcho de las pistas de cerca (2026): una mano trae una ficha nueva y la clava en «list» con una chincheta: la
//    lista sin letras de lo que la película dejó fuera (Peeves, el dragón, la flauta, las botellas, los centauros); en
//    «left out» se tachan una a una con una X roja y la pista de las tijeras se enciende; la snitch se posa en la ficha
//    (corta en «In»);
// 2. la moviola de 2001 de cerca: en el visor corre la toma de Peeves («filmed him»); en «his scene» entra la mano con las
//    tijeras, en «ended» corta la tira, el trozo con la silueta de Peeves resbala por la mesa y en «floor» cae al suelo
//    entre los otros recortes; la snitch baja, lo coge y se lo lleva.''', r'''
const at = (s) => en('rodaron', (s - 0.9) / 10.568);
const P2 = at(5.26);
const trae = at(1.0), clava = at(2.52), tacha = at(3.3), comienza = at(4.22);
const mano2 = at(8.3), corta = at(9.34), cae = at(10.9), coge = at(11.35);
const K = T.C.k, ROJO = hex('#d02a2a'), PAPEL = hex('#f4ecd6'), PAPELS = hex('#d8ccae');
// la ficha de la lista (sin letras): cinco filas con su icono y una raya; la X roja tacha las que van saliendo
const ficha = (x, y, t, nx) => {
  R.rect(x + 2, y + 2, x + 64, y + 76, hex('#2a1a10')); R.rect(x - 1, y - 1, x + 62, y + 74, K); R.rect(x, y, x + 61, y + 73, PAPEL); R.rect(x, y + 70, x + 61, y + 73, PAPELS);
  for (let j = 0; j < 5; j++) R.linea(x + 3, y + 14 + j * 13, x + 58, y + 14 + j * 13, hex('#b8c8e0'));
  R.linea(x + 18, y + 2, x + 18, y + 71, hex('#e8a8a8'));
  const filas = [
    () => R.actor(EL.peeves, x + 1, y + 13 + 12, t, { opaco: true, sonrisa: true, quieto: true }),
    () => T.PIEZAS_HP.dragon(R, x + 9, y + 25 + 12, { t }),
    () => T.PIEZAS_HP.flauta(R, x + 9, y + 38 + 12, { t }),
    () => T.PIEZAS_HP.botellas(R, x + 9, y + 51 + 12, { t }),
    () => T.PIEZAS_HP.huevoDragon(R, x + 9, y + 64 + 10, { t }),
  ];
  for (let j = 0; j < 5; j++) { R.recorte([x, y + j * 13 + 2, x + 17, y + j * 13 + 14]); filas[j](); R.recorte(null);
    for (let k = 0; k < 4; k++) R.linea(x + 22, y + 6 + j * 13 + (k % 2) * 3, x + 22 + 10 + ((j * 7 + k * 5) % 22), y + 6 + j * 13 + (k % 2) * 3, hex('#5a5a6a'));
    const v = tramo(nx, j, j + 1); if (v > 0) { const cx = x + 50, cy = y + 8 + j * 13, r = 4; R.linea(cx - r, cy - r, Math.round(cx - r + 2 * r * Math.min(1, v * 2)), Math.round(cy - r + 2 * r * Math.min(1, v * 2)), ROJO); if (v > 0.5) R.linea(cx + r, cy - r, Math.round(cx + r - 2 * r * (v - 0.5) * 2), Math.round(cy - r + 2 * r * (v - 0.5) * 2), ROJO); }
  }
};
const p1 = (t) => {
  T.hoy(R, t, { encuadre: 'corcho', camara: 'cerca', pistas: 2 + tramo(t, tacha, comienza) });
  // la mano trae la ficha desde abajo a la derecha y la clava
  const u = tramo(t, trae, clava - 0.1), fx = Math.round(lerp(330, 246, u)), fy = Math.round(lerp(150, 76, u) + (1 - u) * Math.sin(t * 9) * 2);
  ficha(fx, fy, t, tramo(t, tacha, comienza + 0.6) * 5);
  if (t > clava - 0.05) { R.disco(fx + 31, fy + 2, 3, K); R.disco(fx + 31, fy + 2, 2, ROJO); R.pset(fx + 30, fy + 1, hex('#ffb0b0')); }
  const suelta = tramo(t, clava + 0.2, clava + 0.9);
  if (suelta < 1) { const hx = fx + 40 + Math.round(suelta * 40), hy = fy + 8 + Math.round(suelta * 30); T.brazo(R, hx + 44, hy + 30, hx, hy, '#3a4a6a', -1, { codo: [hx + 26, hy + 24] }); }
  // la snitch llega volando y se posa en la esquina de la ficha
  const v = tramo(t, clava + 0.4, comienza);
  T.snitch(R, Math.round(lerp(30, fx + 10, v)) + (v < 1 ? Math.sin(t * 3) * 6 : 0), Math.round(lerp(40, fy - 2, v)), t, { vuela: v < 1 ? 0.7 : 0, cara: t > tacha && t < comienza ? 'susto' : 'feliz' });
};
const p2 = (t) => {
  const cortada = t > corta;
  // el visor: corre la toma de Peeves (sepia, con su grano y su raya) y después de cortar, la toma siguiente sin él
  const visor = (R, t, cl) => { const [x0, y0, x1, y1] = cl, fl = Math.sin(t * 40) > 0 ? 1 : 0;
    for (let y = y0; y <= y1; y++) R.rect(x0, y, x1, y, cortada ? hex(y < y0 + 28 ? '#6a6a8a' : '#4a3a2a') : hex(['#c8a878', '#bc9c6c'][(y >> 2) & 1]));
    if (!cortada) { R.rect(x0 + 6, y1 - 10, x1 - 6, y1, hex('#8a6a42')); R.actor(EL.peeves, ((x0 + x1) >> 1) - 7 + Math.round(Math.sin(t * 3) * 8), y1 - 8 + Math.round(Math.sin(t * 5) * 2), t, { opaco: true, sonrisa: true, dedo: Math.sin(t * 4) > 0 }); }
    else { R.rect(x0, y1 - 12, x1, y1, hex('#5a4a3a')); R.actor(EL.harry, ((x0 + x1) >> 1) - 7, y1 - 4, t, { dir: 1, anda: true }); }
    for (let k = 0; k < 9; k++) R.pset(x0 + ((k * 37 + Math.floor(t * 24) * 11) % (x1 - x0)), y0 + ((k * 23 + Math.floor(t * 24) * 7) % (y1 - y0)), hex('#f8f0e0'));
    if (fl) R.linea(x0 + ((Math.floor(t * 6) * 13) % (x1 - x0)), y0, x0 + ((Math.floor(t * 6) * 13) % (x1 - x0)), y1, hex('#e8dcc0')); };
  const g = T.hoy(R, t, { encuadre: 'montaje', camara: 'moviola', pantalla: visor, gira: cortada ? 0.3 : 1 });
  // los recortes que ya estaban en el suelo, a la derecha
  const trozo = (x, y, ang, sil) => { const c = Math.cos(ang), s = Math.sin(ang);
    for (const borde of [1, 0]) for (let i = -11; i <= 11; i += 0.5) for (let j = -6; j <= 6; j += 0.5) { if (!borde && (Math.abs(i) > 10 || Math.abs(j) > 5)) continue; const X = Math.round(x + c * i - s * j), Y = Math.round(y + s * i + c * j);
      const fant = sil && ((Math.hypot(i, j + 0.6) < 2.8) || (Math.abs(i) < 2.2 && j > 0 && j < 3)), ojo = sil && Math.abs(Math.abs(i) - 1) < 0.5 && Math.abs(j + 0.8) < 0.5;
      R.pset(X, Y, borde ? K : Math.abs(j) > 3.5 ? ((Math.floor(i) & 2) ? hex('#2a1e14') : hex('#e8dcc0')) : ojo ? K : fant ? hex('#f4f6ff') : Math.abs(i) < 0.6 || Math.abs(Math.abs(i) - 6) < 0.6 ? hex('#3a2818') : hex('#7a5632')); } };
  [[262, 170, 0.3, false], [300, 172, -0.5, false], [282, 176, 1.2, false], [312, 165, 0.9, false]].forEach(([x, y, a, s]) => trozo(x, y, a, s));
  // el trozo de Peeves: cuelga de la empalmadora, se corta, resbala por la mesa y cae al suelo; la snitch lo recoge
  const r = tramo(t, corta + 0.05, corta + 0.8), f = tramo(t, corta + 0.8, cae), lev = tramo(t, coge, coge + 0.8);
  let tx = 132, ty = 132, ta = 1.57;
  if (r > 0) { tx = lerp(132, 244, r); ty = lerp(132, 126, r); ta = lerp(1.57, 0.2, r); }
  if (f > 0) { tx = lerp(244, 286, f); ty = 126 + (172 - 126) * f * f; ta = 0.2 + f * 2.2; }
  if (lev > 0) { tx = lerp(286, 236, lev); ty = lerp(172, 60, lev) + Math.sin(lev * 9) * 3; ta = 2.4 + Math.sin(t * 8) * 0.3; }
  trozo(tx, ty, ta, true);
  const bajada = tramo(t, cae - 0.1, coge);
  const sx = lev > 0 ? tx : lerp(300, 286, bajada) + (bajada < 1 ? Math.sin(t * 3) * 6 : 0), sy = lev > 0 ? ty - 9 : lerp(70, 163, bajada);
  T.snitch(R, sx, sy, t, { vuela: 0.2, cara: lev > 0 ? 'feliz' : 'normal' });
  T.hoyDelante(R, t, { encuadre: 'montaje', camara: 'moviola' });
  // la mano con las tijeras: entra desde abajo a la izquierda, corta en «ended» y se va
  const m = tramo(t, mano2, corta - 0.15) - tramo(t, corta + 0.4, corta + 1.2);
  if (m > 0) { const hx = Math.round(lerp(70, 112, m)), hy = Math.round(lerp(200, 156, m)), ab = t < corta ? Math.abs(Math.sin(t * 6)) : 0;
    // las tijeras: dos hojas de acero de 20 px que se abren y se cierran sobre la tira, y sus ojos rojos en la mano
    const bx = hx + 4, by = hy - 8;
    for (const sg of [-1, 1]) { const ex = bx + 26, ey = by - 10 + sg * Math.round(ab * 7);
      for (let w = -1; w <= 1; w++) R.linea(bx, by + w, ex, ey + w, K); R.linea(bx, by, ex - 1, ey, sg < 0 ? hex('#eef0f8') : hex('#a8acbc')); }
    R.disco(bx, by, 2, K); R.pset(bx, by, hex('#e8c040'));
    for (const [dx, dy] of [[-5, 4], [-2, 8]]) { R.disco(bx + dx, by + dy, 4, K); R.disco(bx + dx, by + dy, 3, ROJO); R.disco(bx + dx, by + dy, 1, K); R.pset(bx + dx - 2, by + dy - 2, hex('#ff8a8a')); }
    T.brazo(R, 20, 214, hx, hy, '#c8a878', 1, { codo: [hx - 30, hy + 40] }); }
};
const efectos = [[trae + 0.1, 'papel'], [clava, 'pop'], [tacha + 0.2, 'lapiz'], [P2 + 0.2, 'zumbido'], [corta, 'golpecito'], [cae, 'papel'], [coge + 0.1, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: (t) => (t < P2 ? 2026 : 2001) });
''')

E['hp-draco'] = ('La tienda de túnicas', '''// HP-DRACO (frase 16), 1997 (el libro). Tres planos:
// 1. el escaparate de la tienda de túnicas desde la calle: Hagrid y Harry llegan por la acera; Hagrid señala la puerta
//    («book»), Harry va hasta la puerta (suena la campanilla) y Hagrid se da la vuelta hacia la heladería (corta en
//    «Harry»);
// 2. el probador: Harry sube de un salto a su taburete junto a un chico pálido y rubio; la costurera le prende el bajo con
//    alfileres; en «pale boy» Draco se vuelve, levanta la nariz y le habla; Harry contesta en «Diagon Alley» (corta en «a»);
// 3. la tienda entera: por el escaparate del fondo llega Hagrid con dos helados y saluda; en «sneers» Draco lo señala con
//    desprecio y se ríe; en «Draco Malfoy» Harry se enfada; en «skips» Harry baja del taburete y se va hacia la puerta
//    mientras Hagrid le espera fuera.''', r'''
const at = (s) => en('tienda', (s - 0.5) / 13.451);
const P2 = at(4.24), P3 = at(8.46);
const llegan = at(0.3), senala = at(2.0), puerta = at(3.7), sube = at(4.3), palido = at(5.42), contesta = at(7.22);
const asoma = at(8.5), burla = at(9.1), draco = at(11.0), salta = at(12.55);
const PIN = hex('#e8ecf4');
const p1 = (t) => {
  const g = T.diagon(R, t, { encuadre: 'calle', camara: 'escaparate' });
  const u = tramo(t, llegan, senala - 0.1), hx = Math.round(lerp(-60, 150, u)), hd = tramo(t, puerta - 0.9, P2 + 0.2);
  const w = tramo(t, senala + 0.7, puerta);
  // Harry: llega con Hagrid, mira el escaparate y va a la puerta
  const harx = Math.round(lerp(-30, 186, u) + w * 70);
  R.actor(EL.harryCalle, harx, 164, t, { dir: 1, anda: (u > 0 && u < 1) || (w > 0 && w < 1), sorpresa: t > senala && t < senala + 0.7, sonrisa: t > puerta });
  // Hagrid: señala la puerta y se va a por los helados
  const hgx = hd > 0 ? Math.round(lerp(150, -70, hd)) : hx;
  R.actor(EL.hagrid, hgx, 166, t, { dir: hd > 0 ? -1 : 1, anda: (u > 0 && u < 1) || (hd > 0 && hd < 1), dedo: t > senala && t < puerta - 0.9, habla: t > senala && t < puerta - 1 && Math.sin(t * 7) > 0, sonrisa: true });
  // la campanilla de la puerta se mueve cuando llega Harry
  if (t > puerta) { const a = Math.sin((t - puerta) * 18) * Math.max(0, 1 - (t - puerta) * 1.5); R.linea(266, 46, 266 + Math.round(a * 4), 52, T.C.k); R.disco(266 + Math.round(a * 4), 54, 2, hex('#e8c040')); }
  // una lechuza cruza por arriba con un paquete
  T.diagonDelante(R, t, { encuadre: 'calle', camara: 'escaparate' });
  // un duende con prisa pasa por el bordillo, por delante, con su saco de monedas
  const l = tramo(t, 0.6, P2 + 0.3); if (l > 0 && l < 1) { const dx = Math.round(lerp(330, -30, l)); const d = R.actor(EL.duende, dx, 178, t, { dir: -1, anda: true, sostiene: true }); R.disco(d.mano[0], d.mano[1] + 2, 3, T.C.k); R.disco(d.mano[0], d.mano[1] + 2, 2, hex('#8a6a3a')); R.pset(d.mano[0] - 1, d.mano[1], hex('#f0d060')); }
};
const p2 = (t) => {
  T.diagon(R, t, { encuadre: 'tunicas', camara: 'probador' });
  // Harry sube de un salto al taburete de la izquierda; Draco ya está en el de la derecha
  const s = tramo(t, sube, sube + 0.5), hy = Math.round(lerp(170, 140, s) - Math.sin(Math.PI * s) * 10);
  const vuelve = t > palido - 0.1;
  R.actor(EL.harryCalle, 103, hy, t, { dir: 1, sorpresa: t > palido && t < palido + 0.8, habla: t > contesta && t < contesta + 1 && Math.sin(t * 8) > 0 });
  R.actor(EL.draco, 203, 140, t, { dir: vuelve ? -1 : 1, habla: t > palido + 0.2 && t < contesta - 0.1 && Math.sin(t * 7) > 0, sonrisa: t > palido && t < contesta, enfado: t > contesta + 0.2 });
  // la costurera prende alfileres en el bajo de Harry; la ayudanta, en el de Draco
  const pica = Math.sin(t * 5) > 0.3;
  R.actor(EL.costurera, 124, 172, t, { dir: -1, dedo: pica && t > sube + 0.5 });
  R.actor(EL.costurera, 182, 172, t, { dir: 1, dedo: !pica, pal: { C: hex('#6a8ab0'), c: hex('#4a6a90'), V: hex('#6a8ab0') } });
  const n = Math.floor(tramo(t, sube + 0.6, P3) * 6); for (let k = 0; k < n; k++) R.pset(105 + k * 2, hy - 2, PIN);
  for (let k = 0; k < 6; k++) R.pset(205 + k * 2, 138, PIN);
  // la snitch, enredada un momento en la cinta métrica que flota
  T.snitch(R, 160 + Math.sin(t * 1.4) * 14, 70 + Math.sin(t * 2.1) * 6, t, { vuela: 0.4, cara: t > palido && t < contesta ? 'susto' : 'normal' });
  T.diagonDelante(R, t, { encuadre: 'tunicas', camara: 'probador' });
};
const p3 = (t) => {
  const g = T.diagon(R, t, { encuadre: 'tunicas' });
  // por el escaparate del fondo llega Hagrid con dos helados, se para y saluda
  const [vx0, vy0, vx1, vy1] = g.ventana;
  const a = tramo(t, asoma - 0.1, burla - 0.3), hx = Math.round(lerp(vx0 - 60, 150, a));
  R.recorte([vx0, vy0, vx1, vy1]);
  const hg = R.actor(EL.hagridHelado, hx, g.calle, t, { dir: 1, anda: a > 0 && a < 1, sonrisa: true, sostiene: t > burla - 0.3 ? [hx + 22, g.calle - 46 - Math.round(Math.abs(Math.sin(t * 5)) * 3)] : undefined });
  if (t > burla - 0.3) T.PIEZAS_HP.helado(R, hg.mano[0], hg.mano[1] + 2, { t });
  R.recorte(null);
  // los dos niños en sus taburetes; Draco señala el escaparate con desprecio y se ríe
  const baja = tramo(t, salta, salta + 0.5), sale = tramo(t, salta + 0.5, E.duracion);
  const harx = Math.round(lerp(123, 96, baja) - sale * 140), hary = Math.round(lerp(146, 166, baja) - Math.sin(Math.PI * baja) * 8);
  R.actor(EL.harryCalle, harx, hary, t, { dir: baja > 0 ? -1 : 1, anda: sale > 0 && sale < 1, enfado: t > draco && t < salta + 0.5, sorpresa: t > burla && t < burla + 0.6 });
  R.actor(EL.draco, 183, 146, t, { dir: -1, dedo: t > burla && t < draco, enfado: t > burla && t < burla + 1, sonrisa: t > burla + 1, habla: t > burla + 1 && t < draco + 1.2 && Math.sin(t * 8) > 0, salto: t > draco && t < draco + 0.4 ? 2 : 0 });
  R.actor(EL.costurera, 150, 168, t, { dir: baja > 0 ? -1 : 1, sorpresa: t > salta && t < salta + 1, dedo: t < burla && Math.sin(t * 5) > 0 });
  T.diagonDelante(R, t, { encuadre: 'tunicas' });
};
const efectos = [[senala, 'pop'], [puerta, 'campana'], [sube + 0.45, 'boing'], [contesta, 'pop'], [burla + 0.1, 'boing'], [salta + 0.45, 'golpecito'], [at(13.6), 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1997 });
''')
