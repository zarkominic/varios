E = {}

E['do-nwh'] = ('No Way Home', '''// DO-NWH (frases 22–23), 2021. Cinco planos:
// 1. azotea de Nueva York al atardecer: Spider-Man llega columpiándose y aterriza («Spider-Man»); un chico le señala y
//    salta de alegría; en «No Way Home» se gira y se va por su telaraña;
// 2. el santuario (de día): Spider-Man entra y le pide algo a Strange («asks»); Strange lanza el hechizo de runas
//    doradas («spell»); Spider-Man no deja de interrumpir («who Spider-Man is»);
// 3. el santuario, la otra pared: el hechizo se tuerce («goes so wrong») y se abre un portal al cosmos («tears»);
// 4. Nueva York nevada: se abre la grieta («crack»), salen tres villanos en sombra («villains») y bajan otros dos
//    Spider-Man («two other Spider-Men») que se señalan entre sí;
// 5. la calle nevada del santuario: Strange lanza el hechizo del olvido («forget»): la onda dorada barre la calle, la
//    grieta se cierra y las palomitas del banco ya no saben quién es Spider-Man («?»).''', r'''
const a = (f) => en('hechizo', f), g = (f) => en('grieta', f);
const P2 = a(0.296), P3 = a(0.748), P4 = g(0), P5 = g(0.61);
const RED = hex('#e8eef4'), REDS = hex('#9aa6b8');
const telar = (x0, y0, x1, y1) => { R.linea(x0, y0, x1, y1, RED); R.linea(x0 + 1, y0, x1 + 1, y1, REDS); };
// 1 · la azotea: llega columpiándose, aterriza, el chico le señala; se va por su telaraña
const ATER = 2.65, SUBE = a(0.2);
const p1 = (t) => {
  T.mundo(R, t, { encuadre: 'nyhoy', camara: 'general' });
  // se columpia de derecha a izquierda colgado de lo alto (la telaraña sale por arriba, lejos del año y de Atom)
  const A = [196, -40], L = 172, TH1 = -0.22;
  let x, s, dir = -1, web = null, pose = {};
  if (t < 2.25) { const th = lerp(1.62, TH1, tramo(t, 0.2, 2.25)); const hx = A[0] + L * Math.sin(th), hy = A[1] + L * Math.cos(th);
    x = Math.round(hx - 4); s = Math.round(hy + 29); web = [hx, hy, A[0], A[1]]; pose = { dedo: true, sonrisa: true }; }
  else if (t < ATER) { const u = (t - 2.25) / (ATER - 2.25), x0 = A[0] + L * Math.sin(TH1) - 4, s0 = A[1] + L * Math.cos(TH1) + 29;
    x = Math.round(lerp(x0, 150, u)); s = Math.round(lerp(s0, 164, u) - 10 * Math.sin(Math.PI * u)); pose = { brazos: true }; }
  else if (t < SUBE) { x = 150; s = 164; dir = t > 3.0 && t < 4.0 ? -1 : 1; pose = { dedo: t > 3.1 && t < 3.9, sonrisa: t > 3.0 }; }
  else { const u = tramo(t, SUBE, SUBE + 0.55), hx = 150 + 11, hy = 164 - 29; const ax = 250, ay = -50;
    x = Math.round(lerp(150, ax - 11, u)); s = Math.round(lerp(164, ay + 29, u)); web = [lerp(hx, ax, u), lerp(hy, ay, u), ax, ay]; pose = { dedo: true }; }
  // el chico de la azotea: le ve llegar, señala, se sorprende y salta de alegría
  const ve = t > 0.9 && t < ATER, al = t > ATER && t < ATER + 0.8;
  R.actor(EL.chico, 96, 164, t, { dir: 1, dedo: ve, sorpresa: al, brazos: t > ATER + 0.8 && t < SUBE + 0.6, salto: t > ATER + 0.8 && t < SUBE + 0.6 ? Math.round(3 * Math.abs(Math.sin(t * 7))) : 0, sonrisa: t > ATER + 0.8 });
  // el polvo del aterrizaje
  const pv = tramo(t, ATER, ATER + 0.5); if (pv > 0 && pv < 1) for (const k of [-1, 1]) for (let i = 0; i < 3; i++) R.pset(157 + k * Math.round(6 + pv * 10 + i * 2), 163 - i - Math.round(pv * 2), hex('#c8c0b8'));
  if (web) telar(web[0], web[1], web[2], web[3]);
  R.actor(EL.spiderman, x, s, t, { dir, ...pose });
};
// 2 · el santuario de día: Spider-Man pide el hechizo; Strange lo lanza; Spider-Man interrumpe
const p2 = (t) => {
  const hz = 0.5 * tramo(t, a(0.491), a(0.686));
  T.multiverso(R, t, { encuadre: 'santuario', camara: 'general', luz: 'dia', hechizo: hz, hechizoX: 170 });
  const u = tramo(t, P2 + 0.05, P2 + 1.1), sx = Math.round(lerp(262, 210, u));
  const lanza = t > a(0.47);
  R.actor(EL.strange, 116, 152, t, { dir: 1, brazos: lanza, habla: !lanza && t > a(0.39) && Math.sin(t * 9) > 0, sonrisa: t > a(0.39) && t < a(0.47), enfado: t > a(0.7) });
  const pide = t > a(0.343) && t < a(0.47), corta = t > a(0.6) && t < a(0.72);
  R.actor(EL.spiderman, sx + (corta ? -4 : 0), 152, t, { dir: -1, anda: u > 0 && u < 1, habla: (pide || corta) && Math.sin(t * 10) > -0.2, dedo: pide || corta, salto: corta ? Math.round(2 * Math.abs(Math.sin(t * 8))) : 0 });
  T.multiversoDelante(R, t, { encuadre: 'santuario', camara: 'general', luz: 'dia' });
};
// 3 · la otra pared: el hechizo se tuerce y se abre un portal al cosmos
const p3 = (t) => {
  const hz = 0.5 + 0.5 * tramo(t, a(0.765), a(0.873)), pt = tramo(t, a(0.873), a(0.951));
  T.multiverso(R, t, { encuadre: 'santuario', camara: 'portal', luz: 'dia', hechizo: hz, portal: pt, dentro: 'cosmos' });
  const se = t > a(0.873);
  R.actor(EL.strange, 70, 160, t, { dir: 1, brazos: !se, enfado: t > a(0.81) && !se, sorpresa: se });
  const u = tramo(t, P3 + 0.1, P3 + 0.7), b = tramo(t, a(0.88), a(0.93));
  const sx = Math.round(lerp(176, 154, u) - 12 * b);
  R.actor(EL.spiderman, sx, 160, t, { dir: se ? 1 : -1, anda: u > 0 && u < 1, habla: !se && t > P3 + 0.2 && Math.sin(t * 10) > 0, dedo: !se && t > P3 + 0.2, salto: Math.round(8 * Math.sin(Math.PI * b)) });
  if (se && t < a(0.951) + 0.6) R.bocadillo(sx + 8, 124, { icono: '!' });
  T.multiversoDelante(R, t, { encuadre: 'santuario', camara: 'portal', luz: 'dia' });
};
// los villanos en sombra (siluetas con su filo de luz de la grieta)
const SOM = hex('#1a1226'), FILO = hex('#e866c0'), FILO2 = hex('#7ad8f8');
const sil = (dibuja) => { dibuja(0, -1, FILO); dibuja(1, 0, FILO2); dibuja(0, 0, SOM); };
const pulpo = (x, y, t) => sil((dx, dy, c) => {   // cuatro brazos mecánicos que se mueven
  for (let k = 0; k < 4; k++) { const lado = k < 2 ? -1 : 1, arriba = k % 2 === 0;
    for (let i = 0; i <= 12; i++) { const u = i / 12, px = x + dx + lado * (3 + u * 11), py = y + dy - 10 + (arriba ? -u * 9 : u * 7) + Math.sin(t * 4 + k * 1.7 + u * 3) * 3 * u; R.disco(px, py, u > 0.9 ? 2 : 1, c); } }
  R.rect(x + dx - 3, y + dy - 14, x + dx + 3, y + dy - 3, c); R.disco(x + dx, y + dy - 17, 3, c); R.rect(x + dx - 3, y + dy - 3, x + dx - 1, y + dy, c); R.rect(x + dx + 1, y + dy - 3, x + dx + 3, y + dy, c);
});
const duende = (x, y, t) => sil((dx, dy, c) => {   // en su planeador de alas de murciélago
  R.poligono([[x + dx - 13, y + dy], [x + dx - 6, y + dy - 3], [x + dx + 6, y + dy - 3], [x + dx + 13, y + dy], [x + dx + 8, y + dy + 1], [x + dx + 4, y + dy + 3], [x + dx, y + dy + 1], [x + dx - 4, y + dy + 3], [x + dx - 8, y + dy + 1]], c);
  R.rect(x + dx - 2, y + dy - 12, x + dx + 2, y + dy - 3, c); R.disco(x + dx, y + dy - 15, 3, c); R.pset(x + dx - 3, y + dy - 18, c); R.pset(x + dx + 3, y + dy - 18, c); R.linea(x + dx + 2, y + dy - 10, x + dx + 6, y + dy - 13, c);
});
const chispa = (x, y, t) => sil((dx, dy, c) => {   // el de los rayos
  R.rect(x + dx - 3, y + dy - 14, x + dx + 3, y + dy - 3, c); R.disco(x + dx, y + dy - 17, 3, c); R.rect(x + dx - 3, y + dy - 3, x + dx - 1, y + dy, c); R.rect(x + dx + 1, y + dy - 3, x + dx + 3, y + dy, c);
  R.linea(x + dx - 3, y + dy - 12, x + dx - 9, y + dy - 18, c); R.linea(x + dx + 3, y + dy - 12, x + dx + 9, y + dy - 18, c);
});
const rayitos = (x, y, t) => { for (let k = 0; k < 4; k++) { if ((Math.floor(t * 12) + k) % 3 === 0) continue; const an = k * 1.6 + Math.floor(t * 12) * 0.7; let px = x, py = y - 10;
  for (let i = 0; i < 4; i++) { const nx = px + Math.cos(an) * 4 + (i % 2 ? 2 : -2), ny = py + Math.sin(an) * 4; R.linea(px, py, nx, ny, i % 2 ? hex('#fff8b0') : hex('#f0d040')); px = nx; py = ny; } } };
const ojos = (x, y, c) => { R.pset(x - 1, y, c); R.pset(x + 1, y, c); };
// 4 · Nueva York nevada: la grieta, los villanos y los otros dos Spider-Man
const p4 = (t) => {
  const gr = tramo(t, P4, g(0.06));
  T.multiverso(R, t, { encuadre: 'nieve', camara: 'general', grieta: gr });
  // los tres villanos salen de la grieta y se quedan en el cielo
  const vs = [[0, 132, 40, 92, 70], [1, 176, 42, 232, 64], [2, 214, 48, 150, 92]];
  for (const [k, x0, y0, x1, y1] of vs) { const u = tramo(t, g(0.082) + k * 0.35, g(0.2) + k * 0.35); if (u <= 0) continue;
    const x = Math.round(lerp(x0, x1, u) + (u >= 1 ? Math.sin(t * 1.5 + k) * 4 : 0)), y = Math.round(lerp(y0, y1, u) + (u >= 1 ? Math.sin(t * 2.1 + k) * 2 : 0));
    if (u < 1) for (let i = 1; i < 5; i++) R.pset(x - Math.round((x1 - x0) * 0.04 * i), y - 4 - Math.round((y1 - y0) * 0.04 * i), i % 2 ? FILO : FILO2);
    if (k === 0) { pulpo(x, y, t); ojos(x, y - 17, hex('#ffb040')); }
    if (k === 1) { duende(x, y, t); ojos(x, y - 15, hex('#ff8a20')); }
    if (k === 2) { rayitos(x, y, t); chispa(x, y, t); ojos(x, y - 17, hex('#fff070')); } }
  // los dos Spider-Man bajan de la grieta por su telaraña y se señalan
  const H = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
  const SP = [[H({ C: '#b81c2a', W: '#b81c2a', G: '#b81c2a', n: '#b81c2a', c: '#1c2a78', I: '#1c2a78', F: '#1c2a78', u: '#1c2a78' }), 118, 148, 0], [H({ C: '#f04048', W: '#f04048', G: '#f04048', n: '#f04048', c: '#2a2a3a', I: '#2a2a3a', F: '#3a64e0', u: '#3a64e0' }), 196, 160, 0.3]];
  for (const [pal, x, ax, d] of SP) { const u = tramo(t, g(0.27) + d, g(0.4) + d); if (u <= 0) continue;
    const s = Math.round(lerp(40, 152, u)), dir = x < 160 ? 1 : -1, hx = x + 7;
    if (u < 1) telar(hx, s - 28, ax, 46);
    const se = t > g(0.44);
    R.actor(EL.spiderman, x, s, t, { dir, pal, dedo: u < 1 || se, sorpresa: t > g(0.44) && t < g(0.487), salto: t > g(0.5) && t < g(0.6) ? Math.round(2 * Math.abs(Math.sin(t * 9))) : 0 }); }
  // la paseante que lo ve todo
  const mira = t > g(0.035);
  R.actor(EL.senora30, 72, 152, t, { dir: 1, sorpresa: mira && t < g(0.3), dedo: t > g(0.1) && t < g(0.25), brazos: t > g(0.33) && t < g(0.45) });
  T.multiversoDelante(R, t, { encuadre: 'nieve', camara: 'general' });
};
// 5 · la calle nevada: el hechizo del olvido barre la calle y la grieta se cierra
const p5 = (t) => {
  const cierra = tramo(t, g(0.68), g(0.93));
  T.multiverso(R, t, { encuadre: 'nieve', camara: 'calle', grieta: 1 - cierra });
  const lanza = t > g(0.638), onda = tramo(t, g(0.874), g(0.874) + 1.1), pasa = onda > 0.35;
  // la paseante cruza por la acera
  const w = tramo(t, P5, E.duracion);
  const px = Math.round(lerp(330, -20, w)), junto = px > 70 && px < 150;
  R.actor(EL.senora30, px, 159, t, { dir: -1, anda: true, sonrisa: junto && !pasa, dedo: junto && !pasa });
  R.actor(EL.strange, 214, 169, t, { dir: -1, brazos: lanza, habla: !lanza && Math.sin(t * 8) > 0 });
  R.actor(EL.spiderman, 104, 169, t, { dir: 1, habla: !lanza && t > P5 + 0.2 && Math.sin(t * 9) > 0.2, dedo: t > g(0.64) && t < g(0.8), triste: pasa });
  const pp = T.palomitas(R, 62, 171, t, { s: 2, dir: 1, saluda: t > P5 + 0.3 && t < g(0.8) && !pasa, expresion: 'normal', asiente: t > g(0.8) && !pasa });
  if (pasa) R.bocadillo(62, 120, { icono: '?' });
  if (pasa && px > -10 && px < 300) R.bocadillo(px + 7, 125, { icono: '?' });
  // el círculo de runas en las manos de Strange y la onda dorada del olvido
  if (lanza) { const cx = 221, cy = 146, n = 14, rr = 9 + 3 * tramo(t, g(0.64), g(0.8));
    for (let i = 0; i < n; i++) { const an = i / n * Math.PI * 2 + t * 2.5; R.pset(Math.round(cx + Math.cos(an) * rr), Math.round(cy + Math.sin(an) * rr * 0.5), i % 2 ? hex('#ffd860') : hex('#ffb040')); } }
  if (onda > 0 && onda < 1) { R.recorte([0, 48, 319, 179]); const rx = 10 + onda * 360, ry = rx * 0.32;
    for (let i = 0; i < 260; i++) { const an = i / 260 * Math.PI * 2, x = 221 + Math.cos(an) * rx, y = 158 + Math.sin(an) * ry; R.pset(x, y, i % 3 ? hex('#ffd860') : hex('#fff8d0')); R.pset(x, y + 1, hex('#e89a30')); }
    R.recorte(null); }
  T.multiversoDelante(R, t, { encuadre: 'nieve', camara: 'calle' });
};
const efectos = [[0.4, 'whoosh'], [ATER, 'golpecito'], [a(0.491), 'brillo'], [a(0.77), 'zumbido'], [a(0.873), 'trueno'], [P4 + 0.1, 'boom'], [g(0.082), 'whoosh'], [g(0.4), 'golpecito'], [g(0.64), 'brillo'], [g(0.874), 'whoosh']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 2021 });
''')

E['do-tierras'] = ('Las Tierras', '''// DO-TIERRAS (frases 24–25), 2022, cartela «2022». Cinco planos:
// 1. Strange cae por el túnel del multiverso, entre burbujas con otros mundos («Multiverse of Madness»);
// 2. 2019, el puente de noche: el del casco de pecera flota sobre el agua y saca dos Tierras de holograma con su número
//    («numbers»; 833 y 616); en «lie» el holograma falla y se ven los drones que lo proyectan; Spider-Man lo descubre;
// 3. el espacio desde la luna: la Tierra grande con su 616 dorado, otras Tierras con su número; las palomitas llegan y
//    la señalan en «ours»; el 616 late en «616»;
// 4. el consejo de la Tierra 838: Strange llega por un portal y camina hasta el círculo; el 838 se enciende en el
//    ventanal; en «council» aparecen los jueces en sus sillas altas;
// 5. los jueces de cerca: Reed habla en «Reed Richards»; Xavier rueda hacia delante y sus ondas brillan en «Xavier».''', r'''
const a = (f) => en('616', f), b = (f) => en('838', f);
const P2 = a(0.289), P3 = a(0.726), P4 = b(0), P5 = b(0.599);
const mix = (c1, c2, k) => { const r1 = c1 & 255, g1 = (c1 >> 8) & 255, b1 = (c1 >> 16) & 255, r2 = c2 & 255, g2 = (c2 >> 8) & 255, b2 = (c2 >> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (b2 - b1) * k) << 16) | (Math.round(g1 + (g2 - g1) * k) << 8) | Math.round(r1 + (r2 - r1) * k)) >>> 0; };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], dz = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
// ── 1 · el túnel del multiverso (fondo local) ──
const TUN = ['#2a0e4a', '#4a1678', '#1a2a7a', '#0e6a8a', '#6a1a7a', '#3a0e5a'].map(hex), TUNL = ['#7a3ac8', '#c04ab0', '#4a7ae8', '#3ad0d8', '#e86ac8', '#8a4ae8'].map(hex);
const NUCLEO = hex('#fff6d8'), NUCLEO2 = hex('#ffd890'), OSC = hex('#0a0618');
const mundoB = (k, u, v, t) => {   // lo que se ve dentro de cada burbuja (u, v en −1..1)
  if (k === 0) { const h = 0.25 + 0.15 * Math.sin(u * 5); if (v > h) return v > h + 0.25 ? hex('#3a9a3a') : hex('#5ac84a'); if (Math.hypot(u - 0.35, v + 0.35) < 0.22) return hex('#ffe060'); return v < -0.1 ? hex('#5ab0f0') : hex('#9ad8f8'); }
  if (k === 1) { const col = Math.floor((u + 1) * 5), alto = 0.1 + ((col * 37) % 7) / 10; if (v > 0.9 - alto * 1.2) return (Math.floor(u * 20) + Math.floor(v * 14)) % 3 === 0 ? hex('#ffd860') : hex('#1a1a3a'); return v < -0.3 ? hex('#0a0a2a') : hex('#2a1a5a'); }
  if (k === 2) { if (Math.hypot(u, v - 0.25) < 0.32 && v < 0.35) return hex('#e8c060'); if (v > 0.3) return Math.sin(u * 14 + t * 3) > 0.6 ? hex('#8ad8f8') : hex('#2a7ac8'); return hex('#f0a060'); }
  if (k === 3) { const d = (Math.floor((u + 1) * 8) + Math.floor((v + 1) * 8)) % 2; if (Math.hypot(u + 0.2, v) < 0.45) return hex('#e83a3a'); return d ? hex('#f8e8a0') : hex('#f0d060'); }
  const q = Math.hypot(u, v); if (q < 0.7) { const tierra = Math.sin(u * 6 + t) + Math.cos(v * 5) > 0.6; return tierra ? hex('#4ab04a') : hex('#2a6ad8'); } return hex('#0a0a2a');
};
const p1 = (t) => {
  const { pset, disco } = R;
  const cx = 166 + 14 * Math.sin(t * 0.8), cy = 104 + 8 * Math.cos(t * 1.1);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const dx = x - cx, dy = (y - cy) * 1.3, r = Math.hypot(dx, dy) + 0.5, an = Math.atan2(dy, dx);
    let c;
    if (r < 16) c = r < 9 || dz(x, y) < (16 - r) / 7 ? NUCLEO : NUCLEO2;
    else { const z = 700 / (r + 10) + t * 4.2 + an * 0.955, k = Math.floor(z), fr = z - k, i = ((k % 6) + 6) % 6;
      c = fr < 0.14 ? TUNL[i] : (fr < 0.3 && dz(x, y) < 0.5 ? TUNL[i] : TUN[i]);
      const lejos = Math.max(0, (r - 120) / 120); if (lejos > 0 && dz(x, y) < lejos) c = OSC;
      const cerca = Math.max(0, 1 - (r - 16) / 30); if (cerca > 0 && dz(x, y) < cerca * 0.7) c = NUCLEO2; }
    const za = Math.max(0, 1 - Math.hypot(x - 297, y - 24) / 34), zb = y < 20 && x > 14 && x < 176 ? (20 - y) / 10 : 0, zz = Math.min(0.8, Math.max(za * 1.3, zb));
    if (zz > 0 && dz(x, y) < zz) c = mix(c, OSC, 0.75);
    pset(x, y, c);
  }
  // estrellas que salen disparadas hacia fuera
  for (let i = 0; i < 70; i++) { const an = i * 2.399, d = ((t * (0.25 + (i % 5) * 0.05) + i * 0.137) % 1), r = 18 + d * d * 260;
    const x = cx + Math.cos(an) * r, y = cy + Math.sin(an) * r / 1.3; if ((y < 16 && x > 18 && x < 172) || (x > 276 && y < 46)) continue;
    pset(x, y, hex('#ffffff')); if (d > 0.4) pset(x - Math.cos(an) * 2, y - Math.sin(an) * 1.5, hex('#a8c8ff')); }
  // las burbujas con otros mundos que pasan de largo
  for (let i = 0; i < 5; i++) { const d = ((t * 0.38 + i * 0.2) % 1), an = i * 1.9 + 0.6, rr = 22 + d * d * 210, R0 = 2 + d * d * 34;
    const bx = Math.round(cx + Math.cos(an) * rr), by = Math.round(cy + Math.sin(an) * rr / 1.3);
    for (let j = -R0 - 1; j <= R0 + 1; j++) for (let ii = -R0 - 1; ii <= R0 + 1; ii++) { const q = Math.hypot(ii, j); if (q > R0 + 1) continue; const x = bx + ii, y = by + j;
      if ((y < 16 && x > 18 && x < 172) || (x > 276 && y < 46)) continue;
      pset(x, y, q > R0 ? hex('#e8f4ff') : q > R0 - 1 ? hex('#8ab8e8') : mundoB(i, ii / R0, j / R0, t)); }
    if (R0 > 5) { pset(bx - R0 * 0.5, by - R0 * 0.55, hex('#ffffff')); pset(bx - R0 * 0.5 + 1, by - R0 * 0.55, hex('#ffffff')); pset(bx - R0 * 0.55, by - R0 * 0.45, hex('#ffffff')); } }
  // Strange cae dando vueltas, con la capa al viento
  const sx = Math.round(118 + 10 * Math.sin(t * 1.6)), ss = Math.round(124 + 7 * Math.sin(t * 2.3)), dir = Math.sin(t * 2.1) > 0 ? 1 : -1;
  R.actor(EL.strange, sx, ss, t, { dir, brazos: true, sorpresa: t < a(0.2) || Math.sin(t * 3) > 0, quieto: true });
  // atraviesa una burbuja: destello del mundo de colores
  const fl = tramo(t, a(0.165), a(0.175)) - tramo(t, a(0.18), a(0.2)); if (fl > 0) T.tinte(R, 16, 179, [255, 240, 220], fl * 0.55);
};
// ── 2 · 2019: el del casco de pecera y su mentira en el puente ──
const H = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
const MPAL = H({ C: '#2a8a4a', c: '#1c6a38', W: '#2a8a4a', F: '#1c6a38', I: '#c8a040', G: '#c8a040', n: '#1c3a2a', o: '#c8a040', Q: '#7a3a9a', q: '#5a2a7a' });
const holo = (x, y, r, n, t, fallo) => {
  if (fallo && Math.floor(t * 15) % 3 === 0) return;
  const C1 = hex('#c8faff'), C2 = hex('#5ad0f0'), C3 = hex('#2a7ab0');
  for (let j = -r; j <= r; j++) { const fil = ((j + Math.floor(t * 8)) & 1) === 0, dx = fallo ? (((j >> 2) & 1) ? 3 : -3) : 0, w = Math.round(Math.sqrt(r * r - j * j));
    for (let i = -w; i <= w; i++) { const tierra = Math.sin((i + t * 6) * 0.35 + j * 0.2) + Math.cos(j * 0.45 - i * 0.1) > 0.7;
      if (Math.abs(i) === w || j === -r || j === r) R.pset(x + i + dx, y + j, C1); else if (tierra) R.pset(x + i + dx, y + j, fil ? C1 : C2); else if (fil && ((i + j) & 1) === 0) R.pset(x + i + dx, y + j, C3); } }
  R.numero(String(n), x + (fallo ? 2 : 0), y + r + 18, { tam: 16, centro: true, color: hex('#c8faff') });
};
const dron = (x, y, t, haz) => { const h = Math.floor(t * 20) % 2;
  if (haz) for (let j = 4; j < haz; j++) { const w = Math.round(j * 0.45); for (let i = -w; i <= w; i++) if (((i + j) & 3) === 0) R.pset(x + i, y + j, hex('#5ad0f0')); }
  R.rect(x - 7, y - 1, x + 7, y + 3, hex('#14181e')); R.rect(x - 6, y, x + 6, y + 2, hex('#4a5460')); R.rect(x - 6, y, x + 6, y, hex('#8a94a0'));
  R.rect(x - 12, y - 3, x - 5, y - 2, h ? hex('#c8d0d8') : hex('#5a6470')); R.rect(x + 5, y - 3, x + 12, y - 2, h ? hex('#5a6470') : hex('#c8d0d8')); R.rect(x - 9, y - 2, x - 8, y, hex('#14181e')); R.rect(x + 8, y - 2, x + 9, y, hex('#14181e'));
  R.rect(x - 1, y + 3, x + 1, y + 4, hex('#c8faff')); if (Math.floor(t * 3) % 2) R.pset(x + 5, y + 1, hex('#ff4040')); };
const p2 = (t) => {
  NY.hoy(R, t, { encuadre: 'puente', luz: 'anochecer' });
  const mx = 96, my = Math.round(120 + 3 * Math.sin(t * 2));
  // el humo verde bajo sus pies
  for (let i = 0; i < 34; i++) { const ph = (t * 0.35 + i * 0.0297) % 1, an = i * 2.4, x = mx + 7 + Math.cos(an + t * 0.5) * (6 + ph * 22), y = my + 4 + Math.sin(an) * 3 + ph * 10; R.disco(x, y, 4 - ph * 2, ph < 0.4 ? hex('#7ae890') : ph < 0.75 ? hex('#3ab868') : hex('#1e7a48')); }
  for (let i = 0; i < 12; i++) { const ph = (t * 0.8 + i / 12) % 1; R.pset(mx + 7 + Math.sin(i * 3 + t * 2) * 10, my - ph * 30, hex('#a8f8c0')); }
  const sale1 = tramo(t, a(0.308), a(0.34)), sale2 = tramo(t, a(0.486), a(0.52)), fallo = t > a(0.664);
  if (sale1 > 0) holo(Math.round(lerp(mx + 8, 176, sale1)), Math.round(lerp(my - 10, 62, sale1)), Math.round(4 + 14 * sale1), 833, t, fallo);
  if (sale2 > 0) holo(Math.round(lerp(mx + 8, 248, sale2)), Math.round(lerp(my - 10, 86, sale2)), Math.round(4 + 12 * sale2), 616, t, fallo);
  if (fallo) { dron(176, 30, t, 14); dron(248, 54, t, 16); dron(mx + 30, my + 4, t, 0); }
  const r = R.actor(EL.strange, mx, my, t, { dir: 1, pal: MPAL, brazos: t > a(0.3) && t < a(0.55), quieto: true, bigote: false, barba: false });
  // el casco de pecera, con el humo verde dentro
  const [hx, hy] = r.cabeza; for (let j = -8; j <= 8; j++) for (let i = -8; i <= 8; i++) { const q = Math.hypot(i, j); if (q > 8.5) continue;
    R.pset(hx + i, hy + 5 + j, q > 7.6 ? hex('#d8f4ff') : ((i + j + Math.floor(t * 6)) % 3 === 0 ? hex('#a8f0c0') : hex('#6ad890'))); }
  R.pset(hx - 4, hy, hex('#ffffff')); R.pset(hx - 3, hy - 1, hex('#ffffff'));
  // Spider-Man en el paseo lo descubre
  R.actor(EL.spiderman, 220, 172, t, { dir: -1, sorpresa: fallo, dedo: fallo && t > a(0.68) });
};
// ── 3 · el espacio: la Tierra 616 y las otras ──
const p3 = (t) => {
  const s = T.cosmos(R, t, { encuadre: 'espacio', camara: 'general', numeros: [616, 838, 828, 10005, '?'], foco: 0 });
  const ours = t > a(0.88), late = tramo(t, a(0.94), a(0.94) + 0.3) - tramo(t, a(0.94) + 0.5, a(0.94) + 0.9);
  const w = tramo(t, P3 + 0.2, a(0.82));
  T.palomitas(R, Math.round(lerp(330, 214, w)), 164, t, { s: 2, dir: -1, anda: w > 0 && w < 1, señala: ours ? [100, 78] : undefined, expresion: t > a(0.94) ? 'emocion' : 'normal', salta: t > a(0.94) && t < a(0.94) + 1 ? 1 : 0 });
  R.numero('616', 100, 143 - Math.round(late * 3), { tam: late > 0.3 ? 24 : 16, centro: true });
};
// ── 4 · el consejo de la Tierra 838 ──
const holoActor = H({ H: '#5ad0e8', h: '#8ae8f8', S: '#8ae8f8', s: '#5ad0e8', C: '#3ab0d8', c: '#2a8ab8', W: '#5ad0e8', F: '#2a8ab8', G: '#5ad0e8', I: '#5ad0e8', n: '#2a6a98', o: '#bff8ff', u: '#8ae8f8', Q: '#5ad0e8', q: '#3ab0d8' });
const consejo = (t, s, cam, entra) => {
  const sillas = cam === 'jueces' ? [80, 160, 240] : [76, 118, 160, 202, 244];
  const as = cam === 'jueces' ? [146, 146, 146] : [124, 120, 118, 120, 124];
  const ix = cam === 'jueces' ? 1 : 2;
  const quien = cam === 'jueces' ? ['reed', 'xavier', 'peggy'] : ['peggy', 'reed', 'xavier', 'holo', 'holo'];
  quien.forEach((q, k) => { const u = entra[k]; if (u <= 0) return; const x = sillas[k], suelo = as[k] - (cam === 'jueces' ? 0 : 2);
    if (u < 1) { for (let i = 0; i < 8; i++) { const an = i * 0.8 + t * 6, rr = 10 * (1 - u) + 3; R.pset(x + Math.cos(an) * rr, suelo - 14 + Math.sin(an) * rr * 1.4, hex('#fff6c0')); } if (u < 0.5) return; }
    if (q === 'xavier') { const xs = cam === 'jueces' ? x - 4 + Math.round(6 * tramo(t, b(0.85), b(0.9))) : x - 4; T.PIEZAS_DO.silla(R, xs, suelo, { dir: 1, parte: 'respaldo' }); R.actor(EL.xavier, xs + 4, suelo - 2, t, { dir: 1, sonrisa: true }); T.PIEZAS_DO.silla(R, xs, suelo, { dir: 1, parte: 'ruedas' }); return; }
    if (q === 'reed') { R.actor(EL.reedOtro, x - 7, suelo, t, { dir: cam === 'jueces' ? 1 : 1, habla: cam === 'jueces' && t > b(0.75) && t < b(0.87) && Math.sin(t * 9) > 0, dedo: cam === 'jueces' && t > b(0.75) && t < b(0.87) }); return; }
    if (q === 'peggy') { const r = R.actor(EL.peggy, x - 7, suelo, t, { dir: -1, sostiene: true, enfado: cam !== 'jueces' }); T.PIEZAS_DO.escudo(R, r.mano[0], r.mano[1], { r: 6 }); return; }
    R.actor(EL.permanece ?? EL.mobius, x - 7, suelo, t, { dir: -1, pal: holoActor, quieto: Math.floor(t * 10) % 7 !== 0 });
  });
};
const p4 = (t) => {
  const s = T.multiverso(R, t, { encuadre: 'consejo', camara: 'general', hueco: 2 });
  // el portal por el que llega Strange
  const po = tramo(t, P4, P4 + 0.5) - tramo(t, b(0.2), b(0.27));
  if (po > 0) for (let i = 0; i < 40; i++) { const an = i / 40 * Math.PI * 2 + t * 5, rx = 14 * po, ry = 22 * po; R.pset(Math.round(36 + Math.cos(an) * rx), Math.round(146 + Math.sin(an) * ry), i % 3 ? hex('#ffb040') : hex('#fff0a0')); }
  const w = tramo(t, P4 + 0.4, b(0.3));
  const ap = (k) => tramo(t, b(0.455) + k * 0.25, b(0.455) + k * 0.25 + 0.5);
  consejo(t, s, 'general', [ap(0), ap(1), ap(2), ap(3), ap(4)]);
  R.actor(EL.strange, Math.round(lerp(30, 152, w)), 165, t, { dir: 1, anda: w > 0 && w < 1, sorpresa: t > b(0.46) && t < b(0.56) });
  const nu = tramo(t, b(0.206), b(0.206) + 0.4); if (nu > 0) R.numero('838', 160, 40 - Math.round((1 - nu) * 4), { tam: 16, centro: true });
};
// ── 5 · los jueces de cerca ──
const p5 = (t) => {
  T.multiverso(R, t, { encuadre: 'consejo', camara: 'jueces', hueco: 1 });
  consejo(t, null, 'jueces', [1, 1, 1]);
  const on = tramo(t, b(0.91), b(0.91) + 0.6); if (t > b(0.87)) for (let k = 0; k < 3; k++) { const rr = 8 + ((t * 14 + k * 6) % 18); R.anillo(163, 124, rr, k % 2 ? hex('#c89af8') : hex('#8a6ae8'), 2); }
  // Strange, juzgado, delante
  R.actor(EL.strange, 270, 178, t, { dir: -1, sorpresa: t > b(0.75) && t < b(0.8), habla: t > b(0.62) && t < b(0.72) && Math.sin(t * 8) > 0 });
};
const efectos = [[1.5, 'whoosh'], [a(0.17), 'rafaga'], [a(0.31), 'brillo'], [a(0.49), 'pop'], [a(0.664), 'zumbido'], [a(0.94), 'brillo'], [P4 + 0.1, 'whoosh'], [b(0.206), 'pop'], [b(0.455), 'brillo'], [b(0.753), 'golpecito'], [b(0.87), 'zumbido']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, cartela: '2022', año: (t) => (t >= P2 && t < P3 ? 2019 : 2022) });
import * as NY from '/atomo/plato/escenas/ny-comun.js';
''')

E['do-incursion'] = ('La incursión', '''// DO-INCURSION (frases 26–28), 2022. Seis planos:
// 1. el espacio: dos planetas chocan como coches de choque (golpe en «incursion»); las palomitas se tapan los ojos y
//    Strange, en el risco, da un respingo; vuelven a chocar en «collision» (gag 3);
// 2. la mesa de hologramas del consejo: dos universos en burbuja; en «one of them» se deshace uno y en «both» los dos;
// 3. el santuario de noche, la pared del portal: se abre el portal y sale Clea («Clea»), que avisa a Strange;
// 4. el santuario de noche: Strange ve la incursión que ha causado; Clea le hace una seña y los dos entran en el portal
//    («too late»);
// 5. un autocine de noche: en la pantalla, dos universos chocan con un destello («crashing»); las palomitas, en el techo
//    de un coche con gafas 3D, saltan;
// 6. 2026, la rueda de prensa: el presentador cuenta la sinopsis; en «universes collide» chocan dos aros de luz y
//    saltan los flashes.''', r'''
const a = (f) => en('incursion', f), c = (f) => en('clea', f), d = (f) => en('chocan', f);
const P2 = a(0.618), P3 = c(0), P4 = c(0.502), P5 = d(0), P6 = d(0.474);
const mix = (c1, c2, k) => { const r1 = c1 & 255, g1 = (c1 >> 8) & 255, b1 = (c1 >> 16) & 255, r2 = c2 & 255, g2 = (c2 >> 8) & 255, b2 = (c2 >> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (b2 - b1) * k) << 16) | (Math.round(g1 + (g2 - g1) * k) << 8) | Math.round(r1 + (r2 - r1) * k)) >>> 0; };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], dz = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
// ── 1 · los coches de choque ──
const GOLPE = 0.6, COL2 = a(0.42);
const choque = (t) => t < GOLPE ? lerp(0.74, 0.8, tramo(t, 0, GOLPE)) : t < 2.4 ? lerp(0.8, 1, (t - GOLPE) / 1.8)
  : t < 3.1 ? lerp(0.79, 0.5, tramo(t, 2.4, 3.1)) : t < COL2 ? lerp(0.5, 0.8, tramo(t, 3.1, COL2)) : lerp(0.8, 1, Math.min(1, (t - COL2) / 1.8));
const p1 = (t) => {
  T.cosmos(R, t, { encuadre: 'espacio', camara: 'choque', choque: choque(t), numeros: [838, 616] });
  const tapa = (t > GOLPE - 0.1 && t < 2.6) || (t > COL2 - 0.2 && t < P2);
  T.palomitas(R, 46, 160, t, { s: 2, dir: 1, tapa, expresion: tapa ? 'susto' : 'normal' });
  const r = t > a(0.329) && t < a(0.42);
  R.actor(EL.strange, 86, 160, t, { dir: 1, sorpresa: (t > GOLPE && t < 1.6) || t > COL2, salto: t > GOLPE && t < GOLPE + 0.4 ? 3 : 0, dedo: r, habla: r && Math.sin(t * 9) > 0 });
};
// ── 2 · la mesa de hologramas del consejo (inserto) ──
const hsh = (i, j, k) => { const v = Math.sin(i * 12.9898 + j * 78.233 + k * 37.719) * 43758.5453; return v - Math.floor(v); };
const burbuja = (x, y, rr, t, vida, tono, sem) => {
  const se = 1 - vida;
  for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) { const q = Math.hypot(i, j); if (q > rr) continue;
    const h = hsh(i, j, sem), an = Math.atan2(j, i), sw = Math.sin(an * 2 + q * 0.35 - t * 1.5);
    let c = q > rr - 1 ? hex('#c8faff') : q < 3 ? hex('#ffffff') : sw > 0.55 ? tono[1] : (h > 0.95 ? hex('#ffffff') : tono[0]);
    if (((j + Math.floor(t * 8)) & 3) === 0 && q < rr - 1) c = mix(c, hex('#0a1a2a'), 0.35);
    if (se > 0 && h < se) { if (h > se - 0.3 && ((i + j) % 3 === 0)) R.pset(x + i + Math.round(Math.sin(h * 20 + t) * 3), y + j - Math.round((se - h) * 50), tono[1]); continue; }
    R.pset(x + i, y + j, c); }
};
const MESA = 146;
const p2 = (t) => {
  T.multiverso(R, t, { encuadre: 'consejo', camara: 'general', hueco: 2 });
  T.tinte(R, 0, 179, [14, 20, 44], 0.62);
  const { rect, pset, disco, linea } = R;
  // el cono de luz del proyector de la mesa
  for (let y = 58; y < MESA; y++) { const w = Math.round(14 + (MESA - y) * 0.75); for (let x = 160 - w; x <= 160 + w; x++) { const borde = Math.abs(Math.abs(x - 160) - w) < 1;
    if (borde ? (y & 1) : dz(x, y) < 0.1) pset(x, y, borde ? hex('#5ad0f0') : hex('#2a6a98')); } }
  const uno = 1 - tramo(t, a(0.648), a(0.74)), dos = 1 - tramo(t, a(0.762), a(0.9));
  const ch = tramo(t, P2, P2 + 1.2);
  burbuja(Math.round(124 + 6 * ch), 88, 24, t, Math.min(uno, dos), [hex('#2a5ac8'), hex('#5ad0f0')], 1);
  burbuja(Math.round(196 - 6 * ch), 88, 24, t, dos, [hex('#7a2aa0'), hex('#e866c0')], 2);
  if (ch > 0.95 && dos > 0.7) for (let i = 0; i < 8; i++) pset(160 + Math.round(Math.cos(t * 9 + i) * 3), 88 + Math.round(Math.sin(t * 9 + i * 1.3) * 8), hex('#fff6c0'));
  // Reed explica, Strange escucha (asoman cabeza y hombros por detrás de la mesa)
  R.actor(EL.reedOtro, 44, 150, t, { dir: 1, dedo: t < a(0.9), habla: Math.sin(t * 8) > 0 && t < a(0.94) });
  R.actor(EL.strange, 262, 150, t, { dir: -1, sorpresa: t > a(0.86) || (t > a(0.65) && t < a(0.72)) });
  // la mesa redonda de mármol: tablero con la luz del holograma, banda de oro con rombos, frente con vetas y paneles
  for (let y = MESA - 2; y < 180; y++) for (let x = 0; x < 320; x++) { let c;
    if (y < MESA) c = Math.abs(x - 160) < 40 && dz(x, y) < 0.5 - Math.abs(x - 160) / 80 ? hex('#a8e8f8') : hex('#f6f4fa');
    else if (y < MESA + 4) { const m = (x + 6) % 14, rombo = Math.abs(m - 7) + Math.abs(y - MESA - 1.5) * 2 < 4; c = rombo ? hex('#8a6420') : y === MESA ? hex('#f8d870') : hex('#d8b048'); }
    else { const v = Math.sin(x * 0.06 + y * 0.21 + Math.sin(y * 0.09) * 2) + 0.6 * Math.sin(x * 0.017 - y * 0.13); c = v > 1.15 ? hex('#b8b6c8') : v > 0.95 ? hex('#cfcdda') : hex('#e4e2ec');
      if (x % 64 === 0 || x % 64 === 63) c = hex('#c8a040'); if (x % 64 === 1) c = hex('#f0d880');
      if (y > 172) c = mix(c, hex('#4a4a60'), 0.35); if (y === MESA + 4) c = hex('#a8a6b8'); }
    pset(x, y, c); }
  // en cada panel del frente, un medallón de oro con su gema que late
  for (let k = 0; k < 5; k++) { const cx = 32 + k * 64, cy = 163; R.anillo(cx, cy, 7, hex('#8a6420')); R.anillo(cx, cy, 6, hex('#d8b048')); R.anillo(cx, cy, 5, hex('#f8d870'), 2);
    disco(cx, cy, 2, Math.sin(t * 3 + k) > 0.5 ? hex('#8af0ff') : hex('#3a8ae8')); pset(cx - 1, cy - 1, hex('#ffffff')); for (const dx of [-14, 14]) { rect(cx + dx - 3, cy, cx + dx + 3, cy, hex('#c8a040')); pset(cx + dx, cy - 1, hex('#c8a040')); pset(cx + dx, cy + 1, hex('#c8a040')); } }
  // el proyector en el centro del tablero
  rect(146, MESA - 4, 174, MESA - 1, hex('#2a3038')); rect(148, MESA - 4, 172, MESA - 4, hex('#6a7480')); rect(152, MESA - 3, 168, MESA - 3, Math.sin(t * 6) > 0 ? hex('#8af0ff') : hex('#5ad0f0'));
  // sobre la mesa: una tableta que brilla, una bola de cristal, libros y una taza que humea
  rect(64, MESA - 4, 90, MESA - 1, hex('#1a1e2a')); rect(66, MESA - 3, 88, MESA - 2, hex('#3a8ae8')); pset(70 + Math.floor(t * 4) % 16, MESA - 3, hex('#c8faff'));
  disco(112, MESA - 6, 3, hex('#8ab0e8')); pset(111, MESA - 7, hex('#ffffff')); rect(109, MESA - 3, 115, MESA - 1, hex('#c8a040'));
  rect(212, MESA - 9, 236, MESA - 7, hex('#7a2a2a')); rect(214, MESA - 6, 234, MESA - 4, hex('#2a4a7a')); rect(211, MESA - 3, 237, MESA - 1, hex('#3a6a3a'));
  for (const yy of [MESA - 9, MESA - 6, MESA - 3]) pset(236, yy, hex('#f2eee2'));
  rect(246, MESA - 7, 253, MESA - 1, hex('#f2eee2')); rect(247, MESA - 6, 252, MESA - 6, hex('#6a3a1a')); rect(254, MESA - 5, 255, MESA - 3, hex('#f2eee2'));
  for (let k = 0; k < 3; k++) { const ph = (t * 0.7 + k / 3) % 1; pset(249 + Math.round(Math.sin(ph * 6 + k) * 1.5), MESA - 9 - Math.round(ph * 10), hex('#c8c8d8')); }
};
// ── 3 · el santuario de noche: Clea sale del portal ──
const p3 = (t) => {
  const po = tramo(t, P3, c(0.13));
  T.multiverso(R, t, { encuadre: 'santuario', camara: 'portal', luz: 'noche', portal: po, dentro: 'cosmos' });
  const w = tramo(t, c(0.15), c(0.26));
  R.actor(EL.strange, 96, 160, t, { dir: 1, sorpresa: t > c(0.15) && t < c(0.28) || t > c(0.4), habla: t > c(0.3) && t < c(0.4) && Math.sin(t * 8) > 0 });
  if (w > 0) R.actor(EL.clea, Math.round(lerp(218, 150, w)), 160, t, { dir: -1, anda: w < 1, dedo: t > c(0.28), habla: t > c(0.279) && Math.sin(t * 9) > -0.2 });
  T.multiversoDelante(R, t, { encuadre: 'santuario', camara: 'portal', luz: 'noche' });
};
// ── 4 · el santuario de noche: la seña y al portal ──
const p4 = (t) => {
  T.multiverso(R, t, { encuadre: 'santuario', camara: 'general', luz: 'noche', portal: 1 - tramo(t, P5 - 0.8, P5 - 0.1), portalX: 236 });
  const va = tramo(t, c(0.771), c(0.93)), entra = tramo(t, c(0.913), c(0.98));
  // la visión de la incursión que ha causado: dos planetas que se tocan sobre su cabeza
  const vi = tramo(t, c(0.572), c(0.62)) - tramo(t, c(0.72), c(0.76));
  if (vi > 0) { const sep = Math.round(10 - 3 * Math.abs(Math.sin(t * 4))), r = Math.round(8 * vi); R.anillo(150, 96, Math.round(20 * vi), hex('#8a6ae8'), 2);
    R.disco(150 - sep, 96, r + 1, hex('#c8faff')); R.disco(150 - sep, 96, r, hex('#3a8ae8')); R.disco(150 + sep, 96, r + 1, hex('#ffd8f0')); R.disco(150 + sep, 96, r, hex('#e866c0')); if (sep < 8) { R.pset(150, 96, hex('#ffffff')); R.pset(150, 94, hex('#fff6a0')); R.pset(150, 98, hex('#fff6a0')); } }
  if (entra < 1) R.actor(EL.strange, Math.round(lerp(140, 230, va)), 152, t, { dir: 1, anda: va > 0 && va < 1, sorpresa: t > c(0.55) && t < c(0.7) });
  if (entra < 0.6) R.actor(EL.clea, Math.round(220 + 10 * entra), 152, t, { dir: -1, dedo: t < c(0.9), habla: t < c(0.8) && Math.sin(t * 8) > 0 });
  T.multiversoDelante(R, t, { encuadre: 'santuario', camara: 'general', luz: 'noche' });
};
// ── 5 · el autocine (fondo local) ──
let autocine = null;
const PANT = [66, 20, 254, 98];
const fondoAutocine = () => {
  const { rect, pset, disco, linea } = R;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const k = y / 120; pset(x, y, k < 0.35 ? (dz(x, y) < k / 0.35 * 0.5 ? hex('#1a1640') : hex('#0e0c2a')) : k < 0.8 ? (dz(x, y) < (k - 0.35) / 0.45 ? hex('#2a2058') : hex('#1a1640')) : hex('#3a2a62')); }
  for (let i = 0; i < 110; i++) { const x = (i * 97 + (i >> 3) * 13) % 320, y = (i * 53) % 108; if ((y < 18 && x > 16 && x < 174) || (x > 272 && y < 50)) continue; pset(x, y, i % 4 ? hex('#6a6aa8') : hex('#d8d8ff')); }
  // colinas, pinos y las luces del pueblo
  for (let x = 0; x < 320; x++) { const h = 112 + Math.round(6 * Math.sin(x * 0.03) + 3 * Math.sin(x * 0.11)); rect(x, h, x, 124, hex('#141230')); if (x % 9 === 0) { const ph = h - 6 - (x % 4); for (let j = 0; j < 8; j++) rect(x - Math.floor(j / 2), ph + j, x + Math.floor(j / 2), ph + j, hex('#0c0a22')); } }
  for (let i = 0; i < 22; i++) pset(6 + i * 14 + (i % 3) * 3, 117 + (i % 3), i % 4 ? hex('#f0c060') : hex('#f8f0d0'));
  // la grava: piedrecitas, rodadas y charcos que reflejan la pantalla
  for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) { const r = (x * 13 + y * 7 + (x >> 2) * 5) % 11; pset(x, y, r === 0 ? hex('#4a4064') : r < 3 ? hex('#2e2848') : hex('#383052')); }
  for (let x = 0; x < 320; x += 2) { pset(x, 150 + Math.round(Math.sin(x * 0.05) * 2), hex('#262038')); pset(x + 1, 152 + Math.round(Math.sin(x * 0.05) * 2), hex('#262038')); pset(x, 174 + Math.round(Math.sin(x * 0.04 + 1) * 2), hex('#262038')); }
  for (const [cx, cy, rx] of [[70, 156, 12], [210, 158, 9], [120, 177, 14], [290, 176, 10]]) for (let j = -2; j <= 2; j++) for (let i = -rx; i <= rx; i++) if ((i * i) / (rx * rx) + (j * j) / 4 <= 1) pset(cx + i, cy + j, j < 0 ? hex('#5a6aa8') : hex('#3a4478'));
  // la pantalla en su andamio
  rect(62, 16, 258, 104, hex('#0a0a14')); rect(63, 17, 257, 19, hex('#c8c8d8'));
  for (const x of [80, 120, 200, 240]) { rect(x, 98, x + 3, 126, hex('#2a2440')); rect(x, 98, x, 126, hex('#4a4070')); linea(x, 106, x + 18, 126, hex('#2a2440')); linea(x + 3, 106, x - 15, 126, hex('#2a2440')); }
  rect(58, 98, 262, 104, hex('#3a3058')); rect(58, 98, 262, 98, hex('#6a5a90')); for (let x = 60; x < 262; x += 10) rect(x, 100, x + 1, 103, hex('#2a2440'));
  // la caseta del bar con su toldo, la ventanilla y el ventanuco del proyector
  rect(262, 96, 318, 140, hex('#5a2a3a')); for (let y = 98; y < 140; y += 4) rect(262, y, 318, y, hex('#4a2030'));
  rect(260, 90, 319, 96, hex('#d8d0c0')); for (let x = 260; x < 319; x += 6) rect(x, 90, x + 2, 96, hex('#c83a3a')); for (let x = 260; x < 319; x += 3) pset(x, 97, hex('#8a2a2a'));
  rect(274, 106, 304, 124, hex('#f0d890')); rect(274, 106, 304, 107, hex('#8a6a3a')); rect(268, 124, 310, 127, hex('#8a6a3a'));
  for (let k = 0; k < 4; k++) { rect(278 + k * 7, 112, 281 + k * 7, 118, [hex('#c83a3a'), hex('#f0f0f0'), hex('#e8b030'), hex('#3a8ac8')][k]); }
  rect(306, 100, 312, 106, hex('#1a1426')); rect(307, 101, 311, 105, hex('#fff6c0'));
  // postes de altavoz con su cable y una farola
  for (const x of [32, 112, 188, 250]) { rect(x, 132, x + 1, 152, hex('#5a5a70')); rect(x - 3, 129, x + 4, 133, hex('#8a8aa0')); rect(x - 2, 130, x + 3, 132, hex('#4a4a60')); }
  rect(10, 100, 11, 150, hex('#5a5a70')); rect(6, 98, 15, 100, hex('#8a8aa0'));
  for (let y = 101; y < 150; y++) { const w = Math.round((y - 101) * 0.3); for (let x = 10 - w; x <= 11 + w; x++) if (dz(x, y) < 0.15) pset(x, y, hex('#8a7a60')); }
};
const COCHES = [[18, 142, '#c83a3a'], [92, 140, '#3a8ac8'], [214, 141, '#e8b030'], [44, 168, '#8a5ab0'], [140, 170, '#e86a3a'], [232, 168, '#3ab0b0']];
const coche = (x, y, col, t, k, susto) => { const { rect, pset } = R; const C = hex(col), S = mix(C, hex('#0a0818'), 0.45), L = mix(C, hex('#ffffff'), 0.3);
  rect(x, y - 10, x + 40, y, hex('#0a0818')); rect(x + 1, y - 9, x + 39, y - 1, C); rect(x + 1, y - 9, x + 39, y - 9, L); rect(x + 1, y - 3, x + 39, y - 1, S);
  rect(x + 8, y - 18, x + 32, y - 10, hex('#0a0818')); rect(x + 9, y - 17, x + 31, y - 10, C); rect(x + 9, y - 17, x + 31, y - 17, L); rect(x + 11, y - 16, x + 29, y - 11, hex('#3a4a7a'));
  for (let i = 0; i < 5; i++) pset(x + 12 + i * 4, y - 15 + (i % 2), hex('#6a7ab8'));
  for (const hx of [15, 23]) { const hy = y - 15 - (susto ? 2 : 0); rect(x + hx, hy, x + hx + 3, hy + 3, hex('#1a1426')); }
  rect(x + 2, y - 7, x + 5, y - 5, Math.sin(t * 2 + k) > 0.8 ? hex('#ff6a5a') : hex('#c8283a')); rect(x + 35, y - 7, x + 38, y - 5, hex('#c8283a'));
  rect(x + 17, y - 6, x + 23, y - 4, hex('#d8d8e0')); rect(x + 18, y - 5, x + 22, y - 5, hex('#5a5a70'));
  rect(x + 3, y, x + 8, y + 2, hex('#0a0818')); rect(x + 32, y, x + 37, y + 2, hex('#0a0818'));
};
const p5 = (t) => {
  if (!autocine) { autocine = R.nuevo(); const prev = R.usar(autocine); fondoAutocine(); R.usar(prev); }
  R.copiar(autocine);
  const { pset, disco, rect } = R;
  // la luna y las nubes de tres tonos que pasan por detrás de la pantalla
  disco(266, 62, 7, hex('#f2eedc')); disco(268, 60, 2, hex('#d8d2c0')); pset(263, 64, hex('#d8d2c0'));
  for (const [x0, y, v, n] of [[20, 40, 2.5, 4], [180, 28, 4, 5], [110, 60, 1.6, 3], [300, 76, 3, 4]]) { const x = ((x0 + t * v) % 400) - 40;
    for (let i = 0; i < n; i++) { disco(x + i * 7, y + 1, 5 - (i % 2), hex('#1e1a48')); disco(x + i * 7, y, 5 - (i % 2), hex('#2e2864')); disco(x + i * 7 - 1, y - 2, 3 - (i % 2), hex('#463e86')); } }
  // la pantalla: el espacio con dos universos que se acercan y chocan con un destello
  rect(62, 16, 258, 104 - 6, hex('#0a0a14')); rect(PANT[0], PANT[1], PANT[2], PANT[3], hex('#0e1230'));
  R.recorte(PANT);
  for (let y = PANT[1]; y <= PANT[3]; y++) for (let x = PANT[0]; x <= PANT[2]; x++) { const n = Math.sin(x * 0.05 + y * 0.08) + Math.sin(x * 0.021 - y * 0.05 + 1); if (n > 0.9 && dz(x, y) < (n - 0.9)) pset(x, y, hex('#3a1e5a')); }
  for (let i = 0; i < 50; i++) pset(68 + (i * 41) % 184, 22 + (i * 23) % 74, (i + Math.floor(t * 3)) % 7 ? hex('#8a8ab8') : hex('#ffffff'));
  const u = tramo(t, P5 + 0.3, d(0.276)), bum = tramo(t, d(0.276), d(0.276) + 0.6), sep = Math.round(lerp(64, 21, u) + 8 * bum);
  for (const [cx, c1, c2] of [[160 - sep, '#2a5ac8', '#5ad0f0'], [160 + sep, '#7a2aa0', '#e866c0']]) { disco(cx, 59, 21, hex('#c8faff')); disco(cx, 59, 20, hex(c1));
    for (let j = -19; j <= 19; j++) for (let i = -19; i <= 19; i++) { const q = Math.hypot(i, j); if (q > 19) continue; const sw = Math.sin(Math.atan2(j, i) * 2 + q * 0.4 - t * 1.4); if (sw > 0.6) pset(cx + i, 59 + j, hex(c2)); if (q < 3) pset(cx + i, 59 + j, hex('#ffffff')); } }
  if (bum > 0 && bum < 1) { const r = Math.round(4 + bum * 46); disco(160, 59, r, hex('#ffffff')); disco(160, 59, Math.round(r * 0.6), hex('#fff6a0'));
    for (let k = 0; k < 12; k++) { const an = k * 0.52; pset(160 + Math.round(Math.cos(an) * (r + 6)), 59 + Math.round(Math.sin(an) * (r + 6)), hex('#ffd860')); } }
  R.recorte(null);
  // el haz del proyector desde la caseta
  for (let y = 22; y < 104; y++) { const x0 = Math.round(lerp(309, 250, (103 - y) / 81)); for (let x = Math.min(x0, 255); x < 309; x++) { const lim = 103 - (309 - x) * 1.35, lim2 = 103 - (309 - x) * 0.25;
    if (y >= lim && y <= lim2 && x > 256 && dz(x, y) < 0.13) pset(x, y, hex('#8a84c8')); } }
  const susto = t > d(0.276) && t < d(0.276) + 0.7;
  if (bum > 0 && bum < 0.5) T.tinte(R, 104, 179, [200, 200, 255], 0.3 * (1 - bum * 2));
  // un señor con la bandeja de palomitas entre las filas; un chico va al bar
  const w = (t * 0.09) % 1; R.actor(EL.chico, Math.round(lerp(130, 262, w)), 156, t, { dir: 1, anda: true });
  const v = tramo(t, P5, P6), rv = R.actor(EL.senor30, Math.round(lerp(300, 196, v)), 160, t, { dir: -1, anda: v > 0 && v < 1, sorpresa: susto, sostiene: true });
  { const [mx, my] = rv.mano; rect(mx - 6, my - 1, mx + 3, my, hex('#8a6a3a')); for (let k = 0; k < 3; k++) { rect(mx - 5 + k * 3, my - 5, mx - 4 + k * 3, my - 2, k % 2 ? hex('#f0f0f0') : hex('#c83a3a')); pset(mx - 5 + k * 3, my - 6, hex('#fff4c8')); pset(mx - 4 + k * 3, my - 6, hex('#fff4c8')); } }
  COCHES.forEach(([x, y, col], k) => { coche(x, y, col, t, k, susto); });
  for (let i = 0; i < 6; i++) if (Math.sin(t * 3 + i * 2) > 0.3) pset(Math.round(20 + i * 50 + Math.sin(t + i) * 8), Math.round(130 + Math.cos(t * 0.7 + i) * 6), hex('#e8f070'));
  // las palomitas en el techo del coche naranja, con gafas 3D
  T.palomitas(R, 160, 153, t, { s: 1, dir: -1, gafas: '3d', expresion: susto ? 'susto' : t > d(0.32) ? 'emocion' : 'normal', salta: susto ? 1 : 0 });
};
// ── 6 · la rueda de prensa de 2026 ──
const p6 = (t) => {
  const fl = t > d(0.88) ? 1 : 0.35;
  T.escenario(R, t, { encuadre: 'prensa', camara: 'general', flashes: fl });
  const ch = tramo(t, d(0.88), d(0.94));
  R.actor(EL.feige, 153, 122, t, { dir: 1, habla: t < d(0.86) && Math.sin(t * 8) > 0, dedo: t > d(0.613) && t < d(0.8), brazos: t > d(0.88), sonrisa: t > d(0.94) });
  // los dos aros de luz que chocan sobre el atril
  const sep = Math.round(lerp(40, 12, ch)); for (const [cx, col, c2] of [[160 - sep, '#5ad0f0', '#2a6ad8'], [160 + sep, '#e866c0', '#8a3ab0']]) { R.anillo(cx, 66, 17, hex('#ffffff')); R.anillo(cx, 66, 16, hex(col)); R.anillo(cx, 66, 15, hex(c2)); for (let k = 0; k < 10; k++) { const an = k * 0.63 + t * 1.5; R.pset(cx + Math.round(Math.cos(an) * (k % 3 * 4 + 3)), 66 + Math.round(Math.sin(an) * (k % 3 * 4 + 3)), hex(col)); } }
  if (t > d(0.94) && t < d(0.94) + 0.6) { const r = Math.round(4 + (t - d(0.94)) * 50); R.anillo(160, 66, r, hex('#ffffff')); R.anillo(160, 66, r - 2, hex('#fff6a0')); R.disco(160, 66, Math.max(1, 7 - Math.round((t - d(0.94)) * 10)), hex('#ffffff')); }
  T.escenarioDelante(R, t, { encuadre: 'prensa', camara: 'general', flashes: fl });
};
const efectos = [[GOLPE, 'boing'], [COL2, 'boing'], [a(0.65), 'whoosh'], [a(0.88), 'zumbido'], [P3 + 0.1, 'whoosh'], [c(0.244), 'brillo'], [c(0.572), 'pop'], [c(0.93), 'whoosh'], [d(0.276), 'boom'], [d(0.29), 'publico'], [d(0.94), 'flash']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: (t) => (t >= P6 ? 2026 : 2022) });
''')
