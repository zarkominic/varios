E = {}
E['hm-gancho'] = ('Gancho', '''// HM-GANCHO (frases 1–2), Juegos 50 (y 74 en el plano 2). Seis planos; Atom entra por la ventana en el 3:
// 1. la promesa: el borde de la arena de los Juegos 50 al amanecer, vacío; el muro invisible brilla cada vez más con
//    «deadliest… history» y un pájaro que vuela hacia el filo se da la vuelta antes de tocarlo;
// 2. GOLPE en «took»: la Aldea de los Vencedores de noche; con «took everything» se apagan las ventanas de las casas
//    vacías y solo queda la del vencedor, con su botella en el alféizar y una sombra que pasa; con «Imagine» el cielo
//    empieza a clarear (vamos al pasado);
// 3. la casa de tablas al amanecer: la madre lleva la mirada al bollo con la vela («instead of a cake»), Haymitch se
//    despereza («wake up») y se acerca serio («reaping day»); Sid juega con la peonza; ATOM, de luciérnaga, entra por la
//    ventana y se queda junto a la vela;
// 4. la mesa de cerca: Haymitch sopla la vela («every summer») y el soplo se lleva a Atom; humo; por la ventana pasa un
//    agente de la paz y Sid lo señala («kids' names»);
// 5. la plaza al amanecer: un agente vuelca papeletas en la urna («bowl»), la escolta va al micrófono y las pantallas
//    pasan a «en directo» en «live television»; Atom, triste, sobre los chicos;
// 6. el plató del Capitolio: Caesar sale, levanta los brazos en «anniversary», señala la pantalla de 24 retratos en
//    «24» y en «48» la pantalla se dobla a 48 con un destello; Atom, en el escenario, da un respingo.''', r'''
const g = (f) => en('gano', f), c = (f) => en('cumple', f);
const P2 = g(0.673), P3 = c(0.097), P4 = c(0.287), P5 = c(0.516), P6 = c(0.716);
const K = hex('#1a1424'), ease = (u) => u * u * (3 - 2 * u);
const voz = (t) => E.energia(t);
// un pájaro oscuro de 5 px que aletea
const pajaro = (x, y, t, col) => { x = Math.round(x); y = Math.round(y); const a = Math.floor(t * 9) % 2;
  R.rect(x - 1, y, x + 1, y + 1, col); for (const d of [-1, 1]) { R.pset(x + 2 * d, y - 1 + a * 2, col); R.pset(x + 3 * d, y - 2 + a * 3, col); R.pset(x + 4 * d, y - 2 + a * 4, col); } R.pset(x + 2, y, col); };

// 1 · el borde vacío al amanecer: el muro que brilla
const p1 = (t) => {
  const v = Math.min(1, 0.22 + 0.78 * ease(tramo(t, g(0.09), g(0.46))) + 0.06 * Math.sin(t * 4.2));
  const o = { encuadre: 'borde', luz: 'amanecer', campo: v };
  T.arena50(R, t, o);
  // el pájaro vuela hacia el filo, frena ante el muro y vuelve atrás subiendo
  const u = tramo(t, 0.15, 3.9); let bx, by;
  if (u < 0.62) { const w = u / 0.62; bx = lerp(-6, 226, ease(w)); by = 70 + Math.sin(w * 7) * 3 - w * 6; }
  else { const w = (u - 0.62) / 0.38; bx = 226 - 150 * w * w; by = 64 - 36 * w + Math.sin(w * 9) * 2; }
  pajaro(bx, by, t, hex('#2a1e3a'));
  pajaro(lerp(-20, 150, tramo(t, 1.2, 4.1)), 96 + Math.sin(t * 3) * 2, t + 0.3, hex('#4a3a5a'));
  T.arena50Delante(R, t, o);
};

// 2 · GOLPE: la Aldea de noche; se apagan las casas vacías y queda la ventana del vencedor con la botella
const p2 = (t) => {
  T.distrito(R, t, { encuadre: 'aldea', luz: 'noche' });
  const apaga = (x0, x1, y0, y1, k) => {
    if (k <= 0 || (k < 1 && Math.floor(t * 28) % 2)) return;
    R.rect(x0, y0, x1, y1, hex('#232842')); R.rect(x0, y0, x1, y0 + 1, hex('#181c30'));
    for (let x = x0; x <= x1; x += 2) R.pset(x, y0 + 3 + ((x >> 1) & 1), hex('#2e3556'));
    R.pset(x1, y1, hex('#3a4268'));
  };
  const k1 = tramo(t, g(0.673), g(0.70)), k2 = tramo(t, g(0.737), g(0.765));
  apaga(12, 16, 106, 119, k1); apaga(18, 22, 106, 119, k1); apaga(66, 70, 106, 119, k1); apaga(72, 76, 106, 119, k1);
  apaga(148, 152, 77, 89, k2); apaga(154, 158, 77, 89, k2); apaga(171, 175, 77, 89, k2); apaga(177, 181, 77, 89, k2);
  // la ventana del vencedor: más cálida, con halo, la sombra que pasa y la botella en el alféizar
  const vivo = 0.75 + 0.25 * Math.sin(t * 5.3) * Math.sin(t * 2.1);
  for (let j = -9; j <= 21; j++) for (let i = -14; i <= 12; i++) { const x = 310 + i, y = 95 + j, d = Math.hypot(i, (j - 1) * 1.1);
    if (x > 319 || (x >= 304 && x <= 316 && y >= 88 && y <= 102)) continue;
    if (d < 13 * vivo && d > 6 && ((x * 3 + y * 5) % 4 === 0)) R.pset(x, y, hex('#b8904a')); }
  R.recorte([305, 89, 315, 101]);
  const s = tramo(t, g(0.84), g(0.90)) - tramo(t, c(0.0), c(0.04));
  if (s > 0) { const sx = Math.round(lerp(320, 311, s)); R.disco(sx, 93, 2, hex('#3a2a22')); for (let y = 96; y <= 101; y++) for (let x = sx - 3; x <= sx + 3; x++) R.pset(x, y, hex('#3a2a22')); }
  R.recorte(null);
  R.rect(306, 95, 309, 101, hex('#14301c')); R.rect(307, 91, 308, 94, hex('#14301c')); R.pset(307, 90, hex('#8a6a40')); R.pset(308, 90, hex('#8a6a40'));
  R.pset(306, 96, hex('#6aa070')); R.pset(306, 97, hex('#6aa070')); R.pset(307, 92, hex('#4a7a50'));
  R.rect(312, 98, 313, 101, hex('#c87a2a')); R.pset(312, 98, hex('#f0c070'));
  // con «Imagine» Atom (luciérnaga) se asoma junto a la ventana encendida y se va volando hacia la izquierda: al pasado
  const ua = tramo(t, c(0.0), P3 - 0.1);
  if (ua > 0 && ua < 1) { const w = ease(ua), ax = ua < 0.3 ? lerp(300, 262, ua / 0.3) : lerp(262, -20, (ua - 0.3) / 0.7), ay = ua < 0.3 ? lerp(112, 92, ua / 0.3) : lerp(92, 58, (ua - 0.3) / 0.7);
    T.AT.luciernaga(R, ax, ay + Math.sin(t * 3) * 2, t, { dir: ua < 0.25 ? 1 : -1, brillo: Math.min(1, ua * 6) * 0.9, cara: ua < 0.3 ? 'triste' : 'normal' }); }
  // la luz de la ventana cae sobre el césped
  for (let y = 104; y <= 132; y++) for (let x = 296; x <= 319; x++) { const w = (y - 102) * 0.45; if (Math.abs(x - 310) < 5 + w && ((x * 5 + y * 3) % (y < 116 ? 3 : 4) === 0)) R.pset(x, y, hex('#a88a4a')); }
};

// 3 · la casa al amanecer: el bollo con la vela, Haymitch se despierta y Atom entra por la ventana
const p3 = (t) => {
  const o = { encuadre: 'casa', luz: 'amanecer', vela: true };
  const gq = T.prado(R, t, o);
  const W = gq.ventana ?? [212, 46, 252, 86];
  // la madre deja la olla y va hacia la mesa; señala el bollo en «cake»
  const um = tramo(t, P3 + 0.1, c(0.151));
  R.actor(EL.madreHaymitch, Math.round(lerp(30, 90, um)), 168, t, { dir: 1, anda: um > 0 && um < 1, sonrisa: t > c(0.151), dedo: t > c(0.151) && t < c(0.20), habla: t > c(0.151) && t < c(0.19) && Math.sin(t * 15) > 0 });
  // Haymitch se despereza en «wake up», va hacia la mesa y se queda serio en «reaping day»
  const uh = tramo(t, c(0.195), c(0.232));
  R.actor(EL.haymitch, Math.round(lerp(258, 192, ease(uh))), 168, t, { dir: -1, anda: uh > 0 && uh < 1, brazos: t > c(0.17) && t < c(0.195), habla: t > c(0.17) && t < c(0.19), sorpresa: t > c(0.232) && t < c(0.26), triste: t > c(0.26) });
  // Sid hace bailar la peonza
  R.actor(EL.hermanoHaymitch, 232, 172, t, { dir: -1, sonrisa: true, dedo: t > c(0.11) && t < c(0.14) });
  T.pradoDelante(R, t, o);
  // Atom (luciérnaga) se ve tras el cristal, entra por la ventana y se queda junto a la vela
  const ua = tramo(t, P3 + 0.25, c(0.17));
  const ax = ua < 0.35 ? lerp(262, 232, ua / 0.35) : lerp(232, 172, ease((ua - 0.35) / 0.65)), ay = ua < 0.35 ? lerp(60, 66, ua / 0.35) : lerp(66, 126, ease((ua - 0.35) / 0.65));
  const flota = ua >= 1 ? Math.sin(t * 2.2) * 3 : 0;
  if (ua < 0.35) R.recorte([W[0] + 1, W[1] + 1, W[2] - 1, W[3] - 1]);
  if (ua > 0) T.AT.luciernaga(R, ax + flota, ay + Math.sin(t * 2.6) * 2, t, { dir: -1, brillo: 0.9, cara: t > c(0.211) ? 'triste' : 'sonrisa' });
  R.recorte(null);
};

// 4 · la mesa de cerca: Haymitch sopla la vela y el soplo se lleva a Atom; por la ventana pasa un agente
const p4 = (t) => {
  const sopla = c(0.346), apaga = c(0.366);
  const o = { encuadre: 'casa', camara: 'mesa', luz: 'amanecer', vela: t < apaga };
  const gm = T.prado(R, t, o);
  const W = gm.ventana ?? [36, 26, 104, 76];
  // por la ventana pasa un agente de la paz (recortado al cristal)
  const up = tramo(t, c(0.40), c(0.505));
  if (up > 0 && up < 1) { R.recorte([W[0] + 2, W[1] + 2, W[2] - 2, W[3] - 2]); R.actor(EL.agentePaz, Math.round(lerp(W[2] + 2, W[0] - 18, up)), W[3] + 8, t, { dir: -1, anda: true }); R.recorte(null); }
  // detrás de la mesa: Sid, Haymitch y la madre
  R.actor(EL.hermanoHaymitch, 70, 116, t, { dir: t > c(0.45) ? -1 : 1, sonrisa: t < c(0.40), dedo: t > c(0.456) && t < c(0.51), sorpresa: t > c(0.456) });
  R.actor(EL.haymitch, 194, 116, t, { dir: -1, sonrisa: t < sopla, habla: t > sopla && t < apaga, triste: t > c(0.42) });
  R.actor(EL.madreHaymitch, 232, 116, t, { dir: -1, sonrisa: t < c(0.40), triste: t > c(0.42), habla: t > c(0.30) && t < c(0.33) && Math.sin(t * 14) > 0 });
  T.pradoDelante(R, t, o);
  // sobre la mesa: el aviso de la cosecha con su sello rojo, el cuchillo del pan, la tabla con la hogaza y la peonza de Sid
  R.poligono([[10, 132], [46, 128], [50, 152], [14, 156]], K); R.poligono([[11, 133], [45, 129], [49, 151], [15, 155]], hex('#efe6cc'));
  for (let k = 0; k < 5; k++) R.linea(16 + (k === 0 ? 4 : 0), 136 + k * 3, 40 - (k % 2) * 6, 133 + k * 3, hex('#9a9480'));
  R.disco(38, 147, 4, hex('#8a1a1a')); R.disco(38, 147, 3, hex('#c83030')); R.pset(37, 146, hex('#f08080'));
  R.rect(184, 137, 199, 138, hex('#c8ccd4')); R.rect(184, 139, 199, 139, hex('#6a6e78')); R.rect(200, 136, 207, 139, hex('#6a4024')); R.pset(184, 137, hex('#ffffff'));
  R.rect(276, 150, 318, 160, K); R.rect(277, 151, 317, 159, hex('#a8744a')); R.rect(277, 151, 317, 151, hex('#c8945a'));
  R.disco(296, 148, 9, K); R.disco(296, 148, 8, hex('#c8843a')); R.rect(288, 148, 304, 152, hex('#a8744a')); R.linea(291, 145, 301, 143, hex('#f0c070')); R.linea(290, 148, 302, 146, hex('#8a5220'));
  for (const [mx, my] of [[284, 156], [306, 157], [270, 165], [120, 168], [132, 160]]) R.pset(mx, my, hex('#e8c080'));
  R.poligono([[118, 172], [130, 172], [124, 179]], K); R.poligono([[119, 173], [129, 173], [124, 178]], hex('#c84a3a')); R.rect(123, 168, 124, 172, hex('#6a4024'));
  // la vela apagada y su humo
  if (t >= apaga) {
    for (let j = 0; j < 18; j++) for (let i = 0; i < 3; i++) R.pset(160 + i, 114 + j, (j + i) % 3 === 0 ? hex('#d85a6a') : hex('#e8e0d4'));
    R.pset(161, 113, hex('#2a2a2a')); R.pset(161, 112, hex('#2a2a2a'));
    const hum = 1 - tramo(t, c(0.47), c(0.515));
    for (let k = 0; k < 34 * hum; k++) { const y = 110 - k * 1.4, x = 161 + Math.sin(k * 0.35 - t * 3) * (2 + k * 0.12); if (((k + Math.floor(t * 8)) % 3) !== 0) R.pset(Math.round(x), Math.round(y), k < 10 ? hex('#c8c8cc') : hex('#a8a8b4')); }
  }
  // el soplo: líneas de aire de la boca a la llama
  if (t > sopla && t < apaga + 0.15) for (let k = 0; k < 3; k++) { const fx = Math.round(lerp(190, 166, ((t - sopla) * 3 + k * 0.33) % 1)); for (let i = 0; i < 4; i++) R.pset(fx - i, 103 + k * 3 - (k === 1 ? 0 : 1), hex('#e8f4ff')); }
  // Atom: el soplo lo empuja hacia la izquierda, da vueltas y vuelve
  const em = tramo(t, sopla + 0.05, sopla + 0.6), vu = tramo(t, sopla + 0.9, sopla + 1.8);
  const ax = 138 - 30 * Math.sin(em * Math.PI / 2) * (1 - vu), ay = 98 - 8 * Math.sin(em * Math.PI) + Math.sin(t * 2.3) * 2;
  T.AT.luciernaga(R, ax, ay, t, { dir: em > 0 && vu < 1 ? (Math.floor(t * 8) % 2 ? 1 : -1) : 1, brillo: 0.9, cara: em > 0 && vu < 1 ? 'sorpresa' : t > c(0.44) ? 'triste' : 'sonrisa' });
};

// 5 · la plaza al amanecer: la urna se llena de papeletas; las pantallas, en directo
const p5 = (t) => {
  const vivo = c(0.652);
  const enDirecto = (R, t, [x0, y0, x1, y1]) => {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, ((x + y) & 1) ? hex('#1a1e3a') : hex('#22284a'));
    for (let y = y0; y <= y1; y += 3) for (let x = x0; x <= x1; x++) R.pset(x, y, hex('#2a3058'));
    const cx = Math.round((x0 + x1) / 2) + 6, cy = Math.round((y0 + y1) / 2);
    // la cámara de televisión: cuerpo, objetivo y bobinas
    for (let y = cy - 6; y <= cy + 6; y++) for (let x = cx - 10; x <= cx + 6; x++) R.pset(x, y, (y === cy - 6 || y === cy + 6 || x === cx - 10 || x === cx + 6) ? hex('#0a0a12') : hex('#e8ecf4'));
    R.disco(cx - 6, cy - 10, 4, hex('#e8ecf4')); R.disco(cx + 2, cy - 10, 4, hex('#e8ecf4')); R.disco(cx - 6, cy - 10, 1, hex('#1a1e3a')); R.disco(cx + 2, cy - 10, 1, hex('#1a1e3a'));
    R.poligono([[cx + 6, cy - 4], [cx + 13, cy - 7], [cx + 13, cy + 7], [cx + 6, cy + 4]], hex('#c8ccd8'));
    if (Math.floor(t * 2.5) % 2 === 0) R.disco(x0 + 9, y0 + 8, 4, hex('#ff3030'));
    R.disco(x0 + 9, y0 + 8, 1, hex('#ffd0d0'));
  };
  const llena = 0.3 + 0.7 * tramo(t, P5 + 0.3, c(0.62));
  const o = { encuadre: 'plaza', luz: 'amanecer', urna: llena, pantalla: t < vivo ? 'sello' : enDirecto };
  const gp = T.distrito(R, t, o);
  const B = gp.urnas?.[0] ?? [124, 100];
  // el agente vuelca la caja de papeletas en la urna de la izquierda
  const vuelca = t > P5 + 0.2 && t < c(0.62);
  const r = R.actor(EL.agentePaz, B[0] - 21, 118, t, { dir: 1, sostiene: vuelca ? [B[0] - 4, B[1] - 6] : true });
  if (r?.mano && vuelca) { const [mx, my] = r.mano; R.rect(mx - 2, my - 4, mx + 4, my + 1, K); R.rect(mx - 1, my - 3, mx + 3, my, hex('#c8a060'));
    for (let k = 0; k < 6; k++) { const f = ((t * 1.6 + k / 6) % 1); R.pset(Math.round(mx + 3 + f * 2 + (k % 2)), Math.round(my - 2 + f * (B[1] - my + 4)), hex('#f4f0e4')); } }
  // la escolta va al micrófono y lo toca en «live»
  const ue = tramo(t, c(0.546), c(0.60));
  R.actor(EL.drusilla, Math.round(lerp(196, 164, ease(ue))), 118, t, { dir: -1, anda: ue > 0 && ue < 1, dedo: t > vivo - 0.2 && t < vivo + 0.6, sonrisa: t > vivo });
  // Atom, triste, sobre el pasillo de los chicos
  T.AT.luciernaga(R, 160 + Math.sin(t * 0.9) * 10, 146 + Math.sin(t * 2.1) * 3, t, { dir: Math.sin(t * 0.9) > 0 ? 1 : -1, brillo: 0.75, cara: t > c(0.58) ? 'triste' : 'normal' });
};

// 6 · el plató del Capitolio: 24 retratos que se doblan a 48
const p6 = (t) => {
  const veinti = c(0.895), cuarenta = c(0.955), aniv = c(0.808);
  const ap = Math.min(1, 0.35 + 0.65 * tramo(t, aniv - 0.1, aniv + 0.3) - 0.45 * tramo(t, c(0.85), c(0.88)) + 0.6 * tramo(t, cuarenta, cuarenta + 0.2));
  const o = { encuadre: 'plato', pantalla: 'retratos', n: t < cuarenta ? 24 : 48, aplausos: ap, audiencia: t < veinti - 0.3 ? 0.5 + 0.1 * Math.sin(t) : t < cuarenta ? 0.24 : 0.48 };
  const gp = T.capitolio(R, t, o);
  const P = gp.pantalla ?? [97, 29, 223, 93];
  const fl = 1 - tramo(t, cuarenta, cuarenta + 0.45);
  if (t > cuarenta && fl > 0) for (let y = P[1]; y <= P[3]; y++) for (let x = P[0]; x <= P[2]; x++) if (((x * 7 + y * 3) % 10) / 10 < fl * 0.9) R.pset(x, y, hex('#fffbe8'));
  // Caesar sale, abre los brazos en «anniversary», señala en «24» y celebra en «48»
  const uc = tramo(t, P6 + 0.15, c(0.775));
  R.actor(EL.caesar, Math.round(lerp(34, 140, ease(uc))), 150, t, { dir: 1, anda: uc > 0 && uc < 1, sonrisa: true,
    brazos: (t > aniv && t < c(0.86)) || t > cuarenta + 0.1, dedo: t > veinti - 0.1 && t < cuarenta + 0.1, habla: uc >= 1 && t < aniv && Math.sin(t * 16) > 0 });
  // Atom en el escenario: mira la pantalla y da un respingo en «48»
  const brinco = t > cuarenta && t < cuarenta + 0.35 ? 4 : 0;
  T.AT.atom(R, 232, 150 - brinco, t, { dir: -1, pose: t > cuarenta ? 'brazos' : t > veinti ? 'piensa' : 'quieto', cara: t > cuarenta ? 'sorpresa' : 'normal', habla: t > cuarenta ? 0 : voz(t) });
  // confeti
  const cf = tramo(t, aniv, aniv + 2.6) - tramo(t, aniv + 2.6, aniv + 2.9) + tramo(t, cuarenta, cuarenta + 0.3);
  if (cf > 0) { const COL = [hex('#ff5aa8'), hex('#3ad0c8'), hex('#ffd34a'), hex('#8a6aff'), hex('#ffffff')];
    for (let k = 0; k < 46; k++) { const x = (k * 53 + Math.floor(Math.sin(t * 2 + k) * 4)) % 300 + 10, y = 24 + ((k * 37 + t * (30 + (k % 5) * 6)) % 140);
      if (x > 274 && y < 46) continue; if (k / 46 < cf) R.pset(Math.round(x), Math.round(y), COL[k % 5]); } }
};

const efectos = [[0.35, 'viento'], [g(0.12), 'brillo'], [g(0.68), 'interruptor'], [c(0.13), 'brillo'], [c(0.347), 'whoosh'], [P5 + 0.35, 'papel'], [c(0.654), 'bip'], [c(0.81), 'publico'], [c(0.956), 'flash']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: (t) => (t >= P2 && t < P3 ? 74 : 50) });
''')

E['hm-aviso'] = ('El aviso', '''// HM-AVISO (frases 3–4). Juegos 74 (el reloj, de 51 a 74; el estudio y el cine, sin año). Siete planos:
// 1. la Aldea, 24 años después: Haymitch mayor sale al porche con la petaca; Atom, en el césped, lo señala («That boy is
//    Haymitch Abernathy») y bebe en «you know him»;
// 2. el tren: Haymitch en el sofá con la copa; Katniss («Katniss») y Peeta entran por la puerta; él levanta la copa en
//    «drink in hand»; Effie charla tras la mesa;
// 3. un museo del Capitolio con tres cuadros (la arena, la botella, la corona): Atom va a la botella, piensa en «that
//    way» y en «isn't that he was a drunk» la botella se tacha con una X; luego señala la arena;
// 4. el holograma de la sala de los Vigilantes: Snow señala («what they did to him»); la manecilla da la vuelta y los
//    años pasan (51→74): cada año se apagan dos lucecitas, los chicos que Haymitch tuvo que mentorear;
// 5. el estudio de Atom, la mesa de cerca: Atom levanta el cartel del ojo tapado en «warning» y en «Sunrise on the
//    Reaping» aparece en la pizarra un sol que sale tras la urna;
// 6. un cine de hoy: Atom en la primera fila levanta el libro en «the book», la película empieza en «the movie» y en
//    «if you haven't seen it yet» se cierra el telón;
// 7. el estudio entero: Atom cuelga el cartel del ojo tapado en el pomo de la puerta y la señala en «save this video
//    for later», con un guiño.''', r'''
const h = (f) => en('haymitch', f), a = (f) => en('aviso', f);
const Q2 = h(0.289), Q3 = h(0.545), Q4 = h(0.875), Q5 = a(0.086), Q6 = a(0.414), Q7 = a(0.748);
const K = hex('#1a1424'), ease = (u) => u * u * (3 - 2 * u), voz = (t) => E.energia(t);
const relleno = (x0, y0, x1, y1, f) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const c = f(x, y); if (c != null) R.pset(x, y, c); } };
// el cartel del ojo tapado (sin letras): tarjeta blanca con borde, un ojo con pestañas y una venda oscura encima
const cartel = (x0, y0, w, hh) => {
  R.rect(x0, y0, x0 + w, y0 + hh, K); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + hh - 1, hex('#fbf6e8')); R.rect(x0 + 1, y0 + hh - 2, x0 + w - 1, y0 + hh - 1, hex('#e0d6bc'));
  const cx = x0 + Math.round(w / 2), cy = y0 + Math.round(hh / 2) + 1, rx = Math.round(w * 0.34), ry = Math.max(2, Math.round(hh * 0.24));
  for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) { const e = (x / rx) ** 2 + (y / ry) ** 2; if (e <= 1) R.pset(cx + x, cy + y, e > 0.62 ? K : hex('#ffffff')); }
  R.disco(cx, cy, Math.max(1, ry - 1), hex('#3a7ad8')); R.pset(cx, cy, K);
  for (let k = -2; k <= 2; k++) R.linea(cx + k * Math.round(rx / 2.5), cy - ry - 1, cx + k * Math.round(rx / 2.2), cy - ry - 3, K);
  const bh = Math.max(2, Math.round(hh * 0.18)); R.rect(x0 + 2, cy - Math.floor(bh / 2), x0 + w - 2, cy + Math.ceil(bh / 2) - 1, hex('#2a2a36'));
  R.rect(x0 + 2, cy - Math.floor(bh / 2), x0 + w - 2, cy - Math.floor(bh / 2), hex('#4a4a5a'));
  R.linea(x0 + w - 3, cy + 1, x0 + w - 1, cy + 4, hex('#2a2a36')); R.linea(x0 + w - 4, cy + 1, x0 + w - 5, cy + 4, hex('#2a2a36'));
};

// 1 · el porche de la Aldea, 24 años después
const q1 = (t) => {
  const o = { encuadre: 'aldea', camara: 'porche', luz: 'tarde' };
  T.distrito(R, t, o);
  const sale = tramo(t, h(0.03), h(0.10));
  if (sale < 1) { R.rect(147, 103, 173, 155, hex('#2a1e1a')); R.rect(149, 105, 171, 120, hex('#3a2a20')); R.rect(150, 106, 152, 108, hex('#c8903a')); }
  const x = Math.round(lerp(151, 170, ease(sale))), bebe = t > h(0.222) && t < h(0.285);
  const r = R.actor(EL.haymitchViejo, x, 156, t, { dir: 1, anda: sale > 0 && sale < 1, triste: t > h(0.12), sinObjeto: bebe, sostiene: bebe ? [x + 12, 137] : undefined });
  if (bebe && r?.mano) { const [mx, my] = r.mano; R.rect(mx - 1, my - 5, mx + 2, my + 1, K); R.rect(mx, my - 4, mx + 1, my, hex('#b8c0c8')); R.pset(mx, my - 4, hex('#eef2f6')); }
  T.distritoDelante(R, t, o);
  // Atom en el césped: lo señala con su nombre y luego cuenta
  T.AT.atom(R, 290, 172, t, { dir: -1, pose: t > h(0.0) && t < h(0.11) ? 'senala' : 'quieto', cara: t > h(0.20) ? 'triste' : 'normal', habla: voz(t) });
};

// 2 · el tren: Katniss conoce al mentor, copa en mano
const q2 = (t) => {
  const o = { encuadre: 'tren', luz: 'tarde' };
  const gt = T.interior(R, t, o);
  const D = gt.puerta ?? [4, 28, 32, 131];
  const abre = tramo(t, Q2 + 0.45, Q2 + 0.75) - tramo(t, h(0.40), h(0.42));
  if (abre > 0) { const w = Math.round((D[2] - D[0] - 4) * abre); R.rect(D[0] + 2, D[1] + 2, D[0] + 2 + w, D[3] - 1, hex('#3a2a24')); R.rect(D[0] + 2, D[1] + 2, D[0] + 2 + w, D[1] + 3, hex('#f0d8a0')); R.rect(D[0] + 2 + w, D[1] + 2, D[0] + 3 + w, D[3] - 1, K); }
  // Haymitch en el sofá con la copa; la levanta en «drink in hand»
  const sube = tramo(t, h(0.45), h(0.475)) - tramo(t, h(0.52), h(0.54));
  const r = R.actor(EL.haymitchViejo, 64, 140, t, { dir: 1, sinObjeto: true, sostiene: [Math.round(lerp(79, 82, sube)), Math.round(lerp(126, 113, sube))], sonrisa: sube > 0.5, triste: sube <= 0.5 && t > h(0.36) });
  if (r?.mano) { const [mx, my] = r.mano;
    R.rect(mx - 2, my - 7, mx + 2, my - 3, K); R.rect(mx - 1, my - 6, mx + 1, my - 4, hex('#e0a030')); R.pset(mx - 1, my - 6, hex('#fff0b0'));
    R.rect(mx, my - 3, mx, my, K); R.rect(mx - 1, my + 1, mx + 1, my + 1, K); }
  // Effie charla junto al espejo
  R.actor(EL.effie, 284, 156, t, { dir: -1, sonrisa: true, habla: Math.sin(t * 13) > 0.2 && t < h(0.43), dedo: t > h(0.36) && t < h(0.40) });
  // Katniss y Peeta entran por la puerta del pasillo
  const uk = tramo(t, Q2 + 0.7, h(0.40)), up = tramo(t, Q2 + 1.2, h(0.43));
  if (up > 0) R.actor(EL.peeta, Math.round(lerp(10, 118, ease(up))), 156, t, { dir: up < 1 ? 1 : -1, anda: up > 0 && up < 1, sorpresa: t > h(0.46) && t < h(0.5) });
  if (uk > 0) R.actor(EL.katniss, Math.round(lerp(10, 138, ease(uk))), 156, t, { dir: uk < 1 ? 1 : -1, anda: uk > 0 && uk < 1, enfado: t > h(0.47) });
  T.interiorDelante(R, t, o);
  T.AT.luciernaga(R, 172 + Math.sin(t * 0.8) * 8, 66 + Math.sin(t * 2.2) * 3, t, { dir: -1, brillo: 0.8, cara: t > h(0.307) ? 'triste' : 'normal' });
};

// 3 · el museo: la botella tachada
const q3 = (t) => {
  const fondo = (c1, c2) => (x, y) => ((x * 3 + y * 7) % 5 === 0 ? c2 : c1);
  const cuadroArena = (R, t, [x0, y0, x1, y1]) => {
    const hy = y0 + Math.round((y1 - y0) * 0.5), CIE = [hex('#6a5ab8'), hex('#c87aa8'), hex('#f0a890'), hex('#f8d8a0')];
    relleno(x0, y0, x1, hy, (x, y) => { const u = (y - y0) / (hy - y0) * 3.4, i = Math.min(3, Math.floor(u)); return CIE[Math.min(3, i + ((u - i) > ((x * 5 + y * 3) % 4) / 4 ? 1 : 0))]; });
    R.poligono([[x0, hy], [x0 + 20, y0 + 14], [x0 + 34, hy - 6], [x0 + 50, y0 + 10], [x1, hy]], hex('#7a6aa8'));
    R.linea(x0 + 47, y0 + 12, x0 + 53, y0 + 12, hex('#f4f0ff')); R.linea(x0 + 18, y0 + 16, x0 + 22, y0 + 16, hex('#f4f0ff'));
    relleno(x0, hy, x1, y1, (x, y) => ((x * 7 + y * 13) % 11 === 0 ? [hex('#ff6aa8'), hex('#ffd34a'), hex('#b07aff')][(x + y) % 3] : (y - hy) % 4 === 0 && x % 3 ? hex('#3a8a3a') : hex('#4aa848')));
    const cx = x0 + 30, cy = hy + 12; R.poligono([[cx - 10, cy + 3], [cx + 6, cy - 4], [cx + 9, cy + 4], [cx - 8, cy + 6]], hex('#e8b830')); R.disco(cx + 8, cy, 3, hex('#8a6a20')); R.linea(cx - 9, cy + 3, cx + 5, cy - 3, hex('#fff0a0'));
    for (let y = y0; y <= y1; y += 3) R.pset(x1 - 8 + ((y >> 1) & 1), y, hex('#e8fbff'));
  };
  const cuadroBotella = (R, t, [x0, y0, x1, y1]) => {
    const my = y1 - 16; relleno(x0, y0, x1, my, fondo(hex('#4a1e2e'), hex('#5a2a3a'))); relleno(x0, my, x1, y1, (x, y) => (y === my ? hex('#a8744a') : (x * 2 + y * 9) % 13 === 0 ? hex('#5a3420') : hex('#7a4a2a')));
    const bx = x0 + 26; relleno(bx - 7, my - 34, bx + 7, my, (x, y) => (x === bx - 7 || x === bx + 7 ? K : x === bx - 4 ? hex('#7ac08a') : hex('#2e6a3e')));
    relleno(bx - 3, my - 48, bx + 3, my - 35, (x, y) => (x === bx - 3 || x === bx + 3 ? K : x === bx - 1 ? hex('#7ac08a') : hex('#2e6a3e')));
    R.poligono([[bx - 7, my - 34], [bx - 3, my - 38], [bx + 3, my - 38], [bx + 7, my - 34]], hex('#2e6a3e')); relleno(bx - 2, my - 52, bx + 2, my - 48, () => hex('#b8884a'));
    relleno(bx - 6, my - 22, bx + 6, my - 12, (x, y) => (y === my - 22 || y === my - 12 ? hex('#c8b890') : hex('#efe4c8')));
    const gx = x0 + 52; relleno(gx - 6, my - 14, gx + 6, my, (x, y) => (x === gx - 6 || x === gx + 6 || y === my ? K : y < my - 9 ? hex('#d8e8f0') : hex('#d88a2a')));
    R.pset(gx - 4, my - 7, hex('#ffe0a0'));
  };
  const cuadroCorona = (R, t, [x0, y0, x1, y1]) => {
    relleno(x0, y0, x1, y1, fondo(hex('#1e2a5a'), hex('#2a3a72')));
    const cx = Math.round((x0 + x1) / 2), cy = Math.round((y0 + y1) / 2) - 2;
    for (let k = 0; k < 22; k++) { const p = Math.PI * 0.62 + k / 21 * Math.PI * 1.76, x = cx + Math.cos(p) * 20, y = cy + Math.sin(p) * 17;
      R.disco(Math.round(x), Math.round(y), 3, k % 2 ? hex('#e8b830') : hex('#c8901e')); R.pset(Math.round(x) - 1, Math.round(y) - 1, hex('#fff0a0')); }
    R.poligono([[cx - 6, cy + 18], [cx, cy + 14], [cx + 6, cy + 18], [cx + 3, cy + 24], [cx, cy + 20], [cx - 3, cy + 24]], hex('#c83a3a'));
    const b = (t * 0.7) % 1; R.pset(cx + 16, cy - 14, b < 0.5 ? hex('#ffffff') : hex('#fff0a0')); R.pset(cx - 18, cy + 4, b > 0.5 ? hex('#ffffff') : hex('#e8b830'));
  };
  const o = { encuadre: 'museo', cuadros: [cuadroArena, cuadroBotella, cuadroCorona] };
  const gm = T.capitolio(R, t, o);
  const Q = gm.cuadros?.[1] ?? [124, 44, 196, 112];
  // la X roja sobre la botella en «isn't that he was a drunk»
  const tacha = h(0.776), ux = tramo(t, tacha, tacha + 0.3);
  if (ux > 0) { const g1 = Q[0] + 6, g2 = Q[2] - 6, v1 = Q[1] + 6, v2 = Q[3] - 6;
    for (const [xa, ya, xb, yb, u] of [[g1, v1, g2, v2, Math.min(1, ux * 2)], [g2, v1, g1, v2, Math.max(0, ux * 2 - 1)]]) if (u > 0) for (let w = -2; w <= 2; w++) R.linea(xa + w, ya, Math.round(lerp(xa, xb, u)) + w, Math.round(lerp(ya, yb, u)), Math.abs(w) === 2 ? hex('#7a1a1a') : hex('#e8302a')); }
  // dos visitantes del Capitolio charlan ante la corona y se vuelven cuando aparece la X
  const vuelven = t > tacha + 0.1;
  R.actor(EL.capitolino1, 234, 162, t, { dir: vuelven ? -1 : 1, habla: !vuelven && Math.sin(t * 12) > 0.3, dedo: !vuelven && t > Q3 + 1.5 && t < Q3 + 2.6, sorpresa: vuelven });
  R.actor(EL.capitolino2, 254, 162, t, { dir: -1, habla: !vuelven && Math.sin(t * 11 + 2) > 0.4 && t > Q3 + 2.6, sonrisa: !vuelven, sorpresa: vuelven });
  // Atom va a la botella, piensa, dice que no con la cabeza y señala la arena
  const ua = tramo(t, Q3 + 0.15, h(0.65)), niega = t > tacha + 0.3 && t < h(0.835);
  T.AT.atom(R, Math.round(lerp(58, 160, ease(ua))), 162, t, { dir: niega ? (Math.floor(t * 5) % 2 ? 1 : -1) : t > h(0.84) ? -1 : 1, pose: ua > 0 && ua < 1 ? 'camina' : t > h(0.84) ? 'senala' : t > h(0.66) && t < tacha ? 'piensa' : 'quieto', cara: t > h(0.84) ? 'sonrisa' : niega ? 'normal' : 'normal', habla: voz(t) });
};

// 4 · el holograma: los años pasan y se apagan las lucecitas
const q4 = (t) => {
  const u = tramo(t, Q4 + 0.25, Q5 - 0.35), hora = 12 * u;
  const o = { encuadre: 'reloj', hora };
  const gr = T.arena(R, t, o);
  const [cx, cy] = gr.centro ?? [160, 90], [rx, ry] = gr.radios ?? [116, 48];
  const mano = -Math.PI / 2 + hora / 12 * Math.PI * 2;
  for (let k = 0; k < 23; k++) { const p = -Math.PI / 2 + (k + 0.6) / 23 * Math.PI * 2, rel = p - mano;
    const apagada = rel < 0, recien = apagada && rel > -0.3;
    for (const d of [-3, 3]) { const x = Math.round(cx + Math.cos(p) * rx * 0.86 + d * Math.sin(p) * 0.6), y = Math.round(cy + Math.sin(p) * ry * 0.84 - d * Math.cos(p) * 0.25);
      if (!apagada) { R.rect(x - 1, y - 1, x + 1, y + 1, hex('#ffd34a')); R.pset(x, y, hex('#fffbe0')); if (Math.sin(t * 6 + k) > 0.6) { R.pset(x, y - 2, hex('#fff0a0')); R.pset(x, y + 2, hex('#fff0a0')); } }
      else if (recien) { R.rect(x - 1, y - 1, x + 1, y + 1, hex('#ffffff')); }
      else { R.pset(x, y, hex('#1e3048')); } } }
  // Snow señala en «what they did to him»; el vigilante maneja el holograma
  R.actor(EL.snow, 268, 174, t, { dir: -1, dedo: t > h(0.90) && t < h(0.97), sonrisa: t > h(0.97) });
  R.actor(T.JH.vigilante, 294, 176, t, { dir: -1, dedo: Math.sin(t * 2.4) > 0.5, habla: Math.sin(t * 9) > 0.6 && t < h(0.95) });
  T.AT.luciernaga(R, 34 + Math.sin(t * 0.9) * 6, 130 + Math.sin(t * 2) * 3, t, { dir: 1, brillo: 0.7, cara: t > h(0.93) ? 'triste' : 'normal' });
};

// 5 · el estudio, la mesa de cerca: el cartel del ojo tapado y el amanecer en la pizarra
const q5 = (t) => {
  const sol = a(0.299);
  const pizarra = (R, t, [x0, y0, x1, y1]) => {
    const tiza = hex('#e8f0e0'), am = hex('#f8d870'), hy = y1 - 6;
    const u1 = tramo(t, sol - 0.1, sol + 0.25), u2 = tramo(t, sol + 0.2, sol + 0.7), u3 = tramo(t, sol + 0.6, sol + 1.0);
    if (u1 > 0) R.linea(x0 + 6, hy, Math.round(lerp(x0 + 6, x1 - 6, u1)), hy, tiza);
    const sx = x0 + 32;
    if (u2 > 0) { for (let k = 0; k <= 30 * u2; k++) { const p = Math.PI + k / 30 * Math.PI; R.pset(Math.round(sx + Math.cos(p) * 9), Math.round(hy + Math.sin(p) * 9), am); }
      if (u2 >= 1) for (let k = 0; k < 7; k++) { const p = Math.PI + (k + 0.5) / 7 * Math.PI, d = 12 + (Math.floor(t * 3 + k) % 2); R.linea(Math.round(sx + Math.cos(p) * 11), Math.round(hy + Math.sin(p) * 11), Math.round(sx + Math.cos(p) * d), Math.round(hy + Math.sin(p) * d), am); } }
    if (u3 > 0) { const bx = x0 + 70, n = Math.round(4 * u3);
      const L = [[bx - 9, hy - 12, bx + 9, hy - 12], [bx - 9, hy - 12, bx - 6, hy - 1], [bx + 9, hy - 12, bx + 6, hy - 1], [bx - 6, hy - 1, bx + 6, hy - 1]];
      for (let k = 0; k < n; k++) R.linea(...L[k], tiza);
      if (u3 >= 1) for (let k = 0; k < 4; k++) R.pset(bx - 5 + k * 3, hy - 14 - (k % 2), tiza); }
  };
  const o = { camara: 'mesa', pizarra };
  T.estudio(R, t, o);
  const alza = tramo(t, a(0.095), a(0.11)), baja = tramo(t, a(0.285), a(0.30));
  const r = T.AT.atom(R, 166, 150, t, { s: 2, dir: baja > 0 ? -1 : 1, pose: baja > 0 ? 'senala' : alza > 0 ? 'sostiene' : 'quieto', cara: baja > 0 ? 'sonrisa' : alza > 0 && t < a(0.14) ? 'sorpresa' : 'normal', habla: voz(t) });
  if (alza > 0 && baja < 1) {
    const [mx, my] = baja > 0 ? [lerp(r.mano[0], 206, baja), lerp(r.mano[1], 146, baja)] : r.mano;
    const cy0 = Math.round(my - 34 + (1 - ease(alza)) * 20 + baja * 16), cx0 = Math.round(mx - 4);
    R.rect(Math.round(mx), cy0 + 26, Math.round(mx) + 1, Math.round(my), hex('#7a5230')); R.pset(Math.round(mx), Math.round(my), hex('#ffffff'));
    cartel(cx0, cy0, 36, 26);
  } else if (baja >= 1) {
    R.rect(204, 124, 205, 146, hex('#7a5230')); cartel(190, 118, 32, 22);
  }
};

// 6 · el cine: el libro, la película y el telón
const q6 = (t) => {
  const libro = a(0.421), peli = a(0.471), telon = a(0.611);
  const o = { encuadre: 'cine', pantalla: t < peli ? 'nieve' : undefined };
  const gc = T.hoy(R, t, o);
  const P = gc.pantalla ?? [60, 20, 260, 100];
  const ut = tramo(t, telon, telon + 0.8);
  if (ut > 0) { const w = Math.round((P[2] - P[0]) / 2 * ease(ut)) + 1; R.recorte(P);
    for (const lado of [0, 1]) for (let x = 0; x < w; x++) { const X = lado ? P[2] - x : P[0] + x, f = (x + Math.round(Math.sin(t * 2) * 1)) % 6, col = f < 2 ? hex('#7a1420') : f < 4 ? hex('#a8202a') : hex('#c83a3a');
      for (let y = P[1]; y <= P[3]; y++) R.pset(X, y, (x === w - 1) ? hex('#5a0e18') : col); }
    R.recorte(null); }
  const S = gc.asientos?.[0] ?? [148, 155];
  const con = t > libro && t < peli + 0.1;
  const r = T.AT.atom(R, S[0] + 8, S[1], t, { dir: t > telon && t < telon + 1.2 ? -1 : 1, pose: con ? 'sostiene' : t > peli && t < telon ? 'senala' : t > telon && t < telon + 1.2 ? 'brazos' : 'quieto', cara: t > telon + 1.0 ? 'guino' : t > telon ? 'sorpresa' : 'sonrisa', habla: voz(t) });
  T.hoyDelante(R, t, o);
  if (con && r?.mano) { const [mx, my] = r.mano.map(Math.round), by = my - 10 + (t - libro < 0.25 ? Math.round((1 - (t - libro) / 0.25) * 6) : 0);
    R.rect(mx - 1, by, mx + 8, by + 11, K); R.rect(mx, by + 1, mx + 7, by + 10, hex('#e8902a')); R.rect(mx, by + 1, mx, by + 10, hex('#8a4a1a'));
    R.disco(mx + 4, by + 6, 2, hex('#ffe070')); R.rect(mx + 1, by + 8, mx + 7, by + 8, hex('#c86a1a')); }
};

// 7 · el estudio entero: Atom (al doble) cuelga el cartel en el pomo de la puerta y la señala
const q7 = (t) => {
  const o = {};
  const ge = T.estudio(R, t, o);
  const [px, py] = ge.pomo ?? [36, 100];
  const cuelga = a(0.815), ida = tramo(t, Q7 + 0.1, cuelga - 0.05), vuelta = tramo(t, cuelga + 0.25, a(0.88));
  const colgado = t > cuelga;
  const x = vuelta > 0 ? lerp(64, 132, ease(vuelta)) : lerp(150, 64, ease(ida)), suelo = vuelta > 0 ? lerp(138, 160, ease(vuelta)) : lerp(158, 138, ease(ida));
  // el cartel colgado se balancea en el pomo
  if (colgado) { const s = t - cuelga, dx = Math.round(3 * Math.sin(s * 8) * Math.exp(-s * 1.4)), cx = 10 + dx;
    R.linea(px, py + 1, cx + 3, py + 7, K); R.linea(px, py + 1, cx + 25, py + 7, K); R.pset(px, py, hex('#f0d080')); cartel(cx, py + 7, 28, 20); }
  const anda = (ida > 0 && ida < 1) || (vuelta > 0 && vuelta < 1);
  const r = T.AT.atom(R, Math.round(x), Math.round(suelo), t, { s: 2, dir: vuelta > 0 && vuelta < 1 ? 1 : -1, pose: !colgado ? 'sostiene' : anda ? 'camina' : vuelta >= 1 ? 'senala' : 'quieto', cara: t > a(0.962) ? 'guino' : t > a(0.885) ? 'sonrisa' : 'normal', habla: voz(t) });
  if (!colgado && r?.mano) { const [mx, my] = r.mano.map(Math.round); R.rect(mx - 1, my - 6, mx, my, hex('#7a5230')); cartel(mx - 28, my - 24, 28, 20); }
  T.estudioDelante(R, t, o);
};

const efectos = [[h(0.226), 'burbujas'], [Q2 + 0.5, 'puerta'], [h(0.456), 'toc'], [h(0.778), 'sello'], [Q4 + 0.3, 'zumbido'], [a(0.10), 'aviso'], [a(0.30), 'lapiz'], [a(0.423), 'papel'], [a(0.472), 'interruptor'], [a(0.612), 'whoosh'], [a(0.816), 'toc']];
const año = (t) => (t < Q4 ? 74 : t < Q5 ? Math.min(74, Math.floor(51 + 23 * tramo(t, Q4 + 0.25, Q5 - 0.35))) : null);
T.rodar(E, R, [[0, q1], [Q2, q2], [Q3, q3], [Q4, q4], [Q5, q5], [Q6, q6], [Q7, q7]], { efectos, año });
''')
