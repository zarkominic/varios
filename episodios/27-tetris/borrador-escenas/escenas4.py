E = {}

# Lo común de las tres escenas (cada .html es una página aparte): el reparto, el ruido, los búferes y unas piezas pequeñas.
COMUN = r'''
import { ELENCO_TS as TS } from '/atomo/plato/kits/pixel-chibi.js';
import { equirect, mapaPapel, chincheta } from '/atomo/plato/escenas/ov-mapas.js';
const PZ = T.PIEZAS_TS, K = hex('#0c0a12');
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const capa = (() => { const m = {}; return (clave, dibuja) => { if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; } R.copiar(m[clave]); }; })();
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const tinte = (x, y, c, a) => R.pset(x, y, mez(R.pget(x, y), c, a));
// una caja con borde negro y relleno
const caja = (x0, y0, x1, y1, c, luz, sombra) => { R.rect(x0, y0, x1, y1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); if (luz) R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, luz); if (sombra) R.rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, sombra); };
// madera con vetas (para mesas, puertas y suelos)
const madera = (x0, y0, x1, y1, c0, c1, c2, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = Math.sin((y + Math.sin(x * 0.07 + k) * 3) * 0.9 + k) ; R.pset(x, y, v > 0.82 ? c2 : h(x >> 2, y, k) < 0.12 ? c1 : v < -0.85 ? c1 : c0); } };
// el vapor de un vaso o de una taza
const vapor = (x, y, t, k = 0, alto = 12) => { for (let i = 0; i < 3; i++) { const u = (t * 0.5 + i / 3 + k * 0.37) % 1; tinte(Math.round(x + Math.sin(u * 7 + t + k) * 1.5), Math.round(y - u * alto), hex('#f2f4f8'), 0.55 * (1 - u)); } };
// un vaso de té en su soporte de metal (de frente)
const vasoTe = (x, y, t, k = 0) => { R.rect(x - 3, y - 7, x + 3, y, K); R.rect(x - 2, y - 6, x + 2, y - 3, hex('#b8622a')); R.rect(x - 2, y - 6, x + 2, y - 6, hex('#e0a060')); R.rect(x - 3, y - 3, x + 3, y, hex('#a8a8b0')); R.rect(x - 3, y - 3, x + 3, y - 3, hex('#e0e0e8')); R.pset(x + 4, y - 2, hex('#a8a8b0')); R.pset(x + 4, y - 4, hex('#a8a8b0')); vapor(x, y - 8, t, k); };
'''

E['ts-elorg'] = ('Elorg', '''// TS-ELORG (frase 10), 1988. Cuatro planos:
// 1. «Meanwhile, the Soviets had put the country's software in the hands of a foreign trade agency, Elorg»: la sala de
//    Elorg por la mañana (moscu/elorg): la científica entra por la puerta con la caja de los disquetes, cruza detrás de la
//    mesa y se la da al funcionario en «hands»; él la deja en la mesa y le pone el sello de la estrella en «Elorg». La
//    secretaria teclea en su máquina; alguien pasa por el pasillo. Corta en «Stein».
// 2. «Stein finally signed a contract with them, but only for computers. And that detail was going to cost him dearly»:
//    la mesa de cerca (moscu/elorg/mesa): la mano de Stein firma el contrato en «signed» y marca la casilla del ordenador
//    en «computers»; se retira. Detrás, el funcionario asiente y la traductora señala las dos casillas vacías en
//    «detail» («!»); el funcionario sonríe en «dearly». Corta en «The contract».
// 3. «The contract never even mentioned game consoles. Soon after, a»: el contrato de cerca, visto desde arriba (inserto
//    sobre el tapete): el dedo da golpecitos en la casilla vacía de la consola de salón en «never» y en la de bolsillo en
//    «consoles»; salen dos «?» rojos. En «Soon after» una sombra cae sobre el contrato. Corta en «tougher».
// 4. «tougher new director, Nikolai Belikov, ended up with all the paperwork on his desk»: el despacho de Bélikov al
//    anochecer (fondo local): Bélikov entra por la puerta en «director», va a su mesa en «Belikov»; el oficinista le trae
//    las pilas de carpetas (en «ended up», «all» y «paperwork»); en «desk» Bélikov tira de todo hacia él, serio, y
//    pone su sello encima.''', COMUN + r'''
const e = (f) => en('elorg', f);
const P2 = e(0.277), P3 = e(0.590), P4 = e(0.776);
const software = e(0.1027), manos = e(0.1387), agencia = e(0.1999), elorg = e(0.2467);
const firma = e(0.3185), contrato = e(0.3392), solo = e(0.3932), ordenadores = e(0.4148), detalle = e(0.4818), caro = e(0.5359), dearly = e(0.5593);
const nunca = e(0.6151), menciona = e(0.6511), consolas = e(0.6871), pronto = e(0.7419);
const director = e(0.8041), belikov = e(0.8563), acabo = e(0.8932), todos = e(0.9211), papeles = e(0.9382), mesa = e(0.9760);

// la caja de cartón de los disquetes (x, y: el centro de abajo); sello: la estrella roja
const cajaDisquetes = (x, y, sello = 0) => { caja(x - 8, y - 9, x + 8, y, hex('#c8964a'), hex('#e2b06a'), hex('#a87a40'));
  for (let k = 0; k < 4; k++) { const dx = x - 6 + k * 3; R.rect(dx, y - 12, dx + 2, y - 9, k % 2 ? hex('#2a3a6a') : hex('#3a3a46')); R.pset(dx + 1, y - 11, hex('#c8ccd8')); }
  if (sello > 0) { const c = hex('#c8302a'); R.pset(x, y - 7, c); R.rect(x - 2, y - 6, x + 2, y - 6, c); R.rect(x - 1, y - 5, x + 1, y - 4, c); R.pset(x - 2, y - 3, c); R.pset(x + 2, y - 3, c); } };

// ── 1 · la sala de Elorg: el software del país pasa a manos de la agencia ──
const p1 = (t) => {
  const o = { encuadre: 'elorg', hora: 0.12 };
  T.moscu(R, t, o);
  // la científica entra por la puerta del pasillo con la caja y va detrás de la mesa hasta el funcionario
  const w = tramo(t, 0.3, manos - 0.3), cx = Math.round(lerp(22, 104, w)), da = t > manos;
  const vuelve = tramo(t, manos + 0.9, P2 - 0.2), cx2 = Math.round(lerp(cx, 64, vuelve));
  const rc = R.actor(TS.cientifica, cx2, 131, t, { dir: vuelve > 0 && vuelve < 1 ? -1 : 1, anda: (w > 0 && w < 1) || (vuelve > 0 && vuelve < 1), sostiene: da ? false : [cx2 + 15, 112], sonrisa: da, habla: t > manos - 0.4 && t < manos + 0.6 });
  // el funcionario de Elorg: recibe la caja en «hands», la deja en la mesa y le pone el sello en «Elorg»
  const deja = tramo(t, manos + 0.2, manos + 0.8), sella = t > elorg - 0.6 && t < elorg + 0.6;
  const golpe = sella ? Math.round(Math.abs(Math.sin((t - elorg + 0.6) * Math.PI / 1.2 * 2)) * -6) : 0;
  const rb = R.actor(TS.burocrata, 128, 131, t, { dir: -1, habla: t < software - 0.3 || (t > agencia - 0.4 && t < elorg - 0.6), sostiene: t > manos - 0.1 && deja < 1 ? [Math.round(lerp(117, 118, deja)), Math.round(lerp(112, 120, deja))] : sella ? [116, 112 + golpe] : false, sonrisa: t > elorg + 0.2 });
  // la secretaria teclea en la máquina de escribir (detrás, a la derecha)
  R.actor(TS.publica, 198, 131, t, { dir: -1, habla: t > 4.2 && t < 5.2, sostiene: [190 + (Math.floor(t * 8) % 2), 118] });
  // un ordenanza junto al perchero: cuelga el abrigo y se frota las manos por el frío
  const ab = tramo(t, 1.2, 2.4);
  R.actor(TS.burocrata, 292, 172, t, { dir: -1, pal: { C: hex('#4a5a4a'), c: hex('#3a483a'), H: hex('#3a2a20') }, sostiene: ab < 1 ? [Math.round(lerp(300, 290, ab)), Math.round(lerp(152, 140, ab))] : false, brazos: t > 3.0 && t < 3.8, habla: t > 5.4 && t < 6.2 });
  T.moscuDelante(R, t, o);
  // la caja: en las manos de la científica, luego en las del funcionario, y en la mesa con su sello
  if (!da) cajaDisquetes(rc.mano[0], rc.mano[1] + 4);
  else if (deja < 1) cajaDisquetes(rb.mano[0], rb.mano[1] + 4);
  else cajaDisquetes(116, 128, t > elorg ? 1 : 0);
  if (sella) { const [mx, my] = rb.mano; R.rect(mx - 2, my - 1, mx + 2, my + 3, hex('#5a3a22')); R.rect(mx - 3, my + 4, mx + 3, my + 5, hex('#2a2a32')); }
  if (t > elorg && t < elorg + 0.8) for (let k = 0; k < 6; k++) { const a = k * 1.05, r = 4 + tramo(t, elorg, elorg + 0.4) * 6; R.pset(Math.round(116 + Math.cos(a) * r), Math.round(122 + Math.sin(a) * r * 0.6), hex('#ffe890')); }
  // la máquina de escribir de la secretaria, con la hoja que sube
  caja(180, 116, 198, 126, hex('#3a3e4a'), hex('#5a6070')); R.rect(178, 112, 200, 114, K); R.rect(179, 112, 199, 113, hex('#6a7080'));
  const hoja = Math.round((t * 1.6) % 10); R.rect(183, 102 - hoja, 195, 112, K); R.rect(184, 103 - hoja, 194, 112, hex('#f6f2e6')); for (let y = 105 - hoja; y < 111; y += 2) R.rect(185, y, 185 + ((y * 7) % 8), y, hex('#6a6a7a'));
  for (let i = 0; i < 6; i++) R.pset(182 + i * 3, 121, Math.floor(t * 8) % 6 === i ? hex('#ffffff') : hex('#a8a8b0'));
  // el abrigo del ordenanza, colgado en el perchero
  if (ab > 0) { const x = Math.round(lerp(300, 289, ab)), y = Math.round(lerp(150, 92, ab)); R.rect(x - 4, y, x + 4, y + 22, K); R.rect(x - 3, y + 1, x + 3, y + 21, hex('#5a4a3a')); R.rect(x - 3, y + 1, x + 3, y + 3, hex('#b0946e')); }
};

// ── 2 · la mesa de cerca: Stein firma (solo ordenadores) ──
const p2 = (t) => {
  const marca = t > ordenadores + 0.05;
  const o = { encuadre: 'elorg', camara: 'mesa', hora: 0.3, dia: 10, cartucho: false, casillas: marca ? [1, 0, 0] : [0, 0, 0], firma: t > firma + 0.9, sello: false };
  T.moscu(R, t, o);
  // detrás de la mesa: el funcionario asiente mientras firma; la traductora señala las casillas vacías en «detail»
  const asiente = t > firma && t < solo ? Math.round(Math.abs(Math.sin(t * 6))) : 0;
  R.actor(TS.burocrata, 116, 120 + asiente, t, { dir: 1, habla: t > P2 + 0.2 && t < firma - 0.2, sonrisa: t > dearly - 0.3 });
  R.actor(TS.publica, 178, 120, t, { dir: -1, habla: t > solo && t < ordenadores + 0.6, dedo: t > detalle - 0.2 && t < caro + 0.6, sorpresa: t > detalle - 0.2 && t < detalle + 0.4 });
  T.moscuDelante(R, t, o);
  // la mano de Stein (la manga gris marengo): firma, marca la casilla del ordenador y se retira
  const llega = tramo(t, P2 + 0.2, firma - 0.15), escribe = tramo(t, firma, firma + 0.9), va = tramo(t, firma + 1.0, ordenadores - 0.15), sale = tramo(t, ordenadores + 0.5, ordenadores + 1.4);
  let wx = lerp(lerp(250, 162, llega), 170, escribe), wy = lerp(210, 170, llega);
  wx = lerp(wx, 158, va); wy = lerp(wy, 158, va); wx = lerp(wx, 260, sale); wy = lerp(wy, 215, sale);
  if (escribe > 0 && escribe < 1) wy += Math.round(Math.sin(t * 30) * 1.2);
  if (va >= 1 && sale === 0) wy += Math.round(Math.abs(Math.sin((t - ordenadores + 0.15) * 14)) * -1.5);
  // la firma, que se escribe a la vez que la pluma avanza
  if (escribe > 0 && t < firma + 0.9) for (let i = 10; i <= 10 + Math.floor(escribe * 7); i++) R.pset(139 + i, 144 + 24 - Math.round(Math.abs(Math.sin(i * 1.3)) * 2), hex('#3a6ad8'));
  if (sale < 1) { const bx = Math.round(wx), by = Math.round(wy);
    R.linea(bx - 12, by + 1, bx - 18, by - 2, hex('#1a1a22')); R.pset(bx - 18, by - 2, hex('#d8c060'));   // la pluma
    T.brazo(R, Math.round(lerp(300, 262, llega)), 220, bx, by, '#4a4c56', -1, { codo: [Math.round(bx + 46), Math.round(by + 26)], puno: '#eef0f6' }); }
  // el detalle: las dos casillas vacías parpadean en rojo y salta el «!»
  if (t > detalle - 0.1 && t < P3 - 0.2) { if (Math.floor(t * 5) % 2) for (const j0 of [14, 19]) { R.rect(140, 144 + j0 - 1, 146, 144 + j0 - 1, hex('#ff4a3a')); R.rect(140, 144 + j0 + 4, 146, 144 + j0 + 4, hex('#ff4a3a')); R.rect(140, 144 + j0 - 1, 140, 144 + j0 + 4, hex('#ff4a3a')); R.rect(146, 144 + j0 - 1, 146, 144 + j0 + 4, hex('#ff4a3a')); }
    R.icono('!', 145, 122 - Math.round(tramo(t, detalle - 0.1, detalle + 0.2) * 8), hex('#ffe890'), K, 3); }
};

// ── 3 · el contrato de cerca, visto desde arriba (inserto sobre el tapete) ──
const tapete = () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const r = h(x, y, 31); R.pset(x, y, r < 0.12 ? hex('#1e4a2a') : r > 0.94 ? hex('#3e7a4c') : (x + y * 2) % 9 === 0 ? hex('#2a5a36') : hex('#26522f')); }
  // el canto de madera de la mesa arriba, con su moldura
  madera(0, 0, 319, 16, hex('#6a4024'), hex('#4a2a14'), hex('#8a5a34'), 3); R.rect(0, 17, 319, 18, hex('#2a1408')); R.rect(0, 16, 319, 16, hex('#a87444'));
  // la carpeta de cartón con su cinta, debajo a la izquierda
  caja(10, 40, 80, 150, hex('#c8a870'), hex('#e0c088'), hex('#a88850')); R.rect(44, 41, 47, 149, hex('#e8e4d8')); for (let y = 50; y < 146; y += 6) R.rect(16, y, 38, y, hex('#b89860'));
  // la hoja de debajo, torcida, con renglones
  R.poligono([[208, 34], [292, 28], [300, 150], [214, 156]], K); R.poligono([[209, 35], [291, 29], [299, 149], [215, 155]], hex('#ece6d6'));
  for (let k = 0; k < 14; k++) { const y = 44 + k * 7; R.linea(224, y, 286 - (k % 3) * 8, y - 3, hex('#9a9a9a')); }
  // el tampón de tinta con su tapa y el sello de madera
  caja(234, 150, 272, 172, hex('#2a2a32'), hex('#4a4a56')); R.rect(238, 154, 268, 168, hex('#6a1a22')); for (let k = 0; k < 18; k++) R.pset(240 + (k * 7) % 26, 155 + (k * 5) % 12, hex('#8a2a32'));
  R.disco(290, 160, 9, K); R.disco(290, 160, 8, hex('#8a5a34')); R.disco(290, 160, 5, hex('#6a4024')); R.disco(288, 158, 2, hex('#a87444'));
  // el ábaco a la izquierda abajo
  caja(8, 154, 58, 178, hex('#4a2a14')); R.rect(10, 156, 56, 176, hex('#d8c898')); for (let r = 0; r < 5; r++) { const y = 158 + r * 4; R.rect(10, y, 56, y, hex('#6a6a6a')); for (let b = 0; b < 5; b++) { const x = 13 + b * 5 + (b > 2 - (r % 3) ? 18 - r * 2 : 0); R.rect(x, y - 1, x + 3, y + 1, b % 2 ? hex('#8a3a1a') : hex('#c8602a')); } }
};
const p3 = (t) => {
  capa('tapete', tapete);
  // las gafas de leer, plegadas, y el bolígrafo
  for (const cx of [116, 132]) { R.disco(cx, 26, 6, K); R.disco(cx, 26, 5, hex('#a8c0c8')); R.pset(cx - 2, 24, hex('#ffffff')); } R.rect(122, 25, 126, 26, K); R.linea(110, 26, 98, 30, K);
  R.linea(196, 100, 206, 150, K); R.linea(197, 100, 207, 150, hex('#2a2a3a')); R.pset(206, 151, hex('#d8c060'));
  // el contrato grande, con la firma y la casilla del ordenador marcada
  const cx = 160, cy = 170, s = 4, x0 = cx - 44, y0 = cy - 112;
  R.rect(x0 + 4, y0 + 4, x0 + 92, y0 + 116, hex('#173a20'));
  PZ.contrato(R, cx, cy, { s, casillas: [1, 0, 0], firma: true });
  // el vaso de té visto desde arriba, con el soporte y el vapor
  R.disco(250, 112, 12, K); R.disco(250, 112, 11, hex('#a8a8b0')); R.disco(250, 112, 8, hex('#7a3a14')); R.disco(247, 109, 2, hex('#d8a060')); vapor(250, 104, t, 1, 16);
  // el dedo de Stein: golpecitos en la casilla de la consola de salón («never») y en la de bolsillo («consoles»)
  const b1 = [x0 + 3 * s, y0 + 16 * s], b2 = [x0 + 3 * s, y0 + 21 * s];
  const lle = tramo(t, P3 + 0.1, nunca - 0.1), pasa = tramo(t, menciona + 0.2, consolas - 0.15), sale = tramo(t, pronto - 0.4, pronto + 0.3);
  let wx = lerp(300, b1[0] + 16, lle), wy = lerp(200, b1[1] + 2, lle); wx = lerp(wx, b2[0] + 16, pasa); wy = lerp(wy, b2[1] + 2, pasa); wx = lerp(wx, 300, sale); wy = lerp(wy, 215, sale);
  const toc = (t > nunca && t < menciona + 0.2) || (t > consolas && t < pronto - 0.4) ? Math.round(Math.abs(Math.sin(t * 9)) * -3) : 0;
  // los «?» rojos junto a las casillas vacías
  for (const [b, t0] of [[b1, nunca], [b2, consolas]]) if (t > t0) { const u = tramo(t, t0, t0 + 0.25); R.icono('?', b[0] - 26, b[1] - 8 - Math.round(u * 4), Math.floor(t * 3) % 2 ? hex('#ff5a4a') : hex('#ffb0a0'), K, 3); }
  if (sale < 1) T.brazo(R, Math.round(wx + 40), 220, Math.round(wx), Math.round(wy) + toc, '#4a4c56', -1, { codo: [Math.round(wx + 60), Math.round(wy + 40)], puno: '#eef0f6' });
  // la sombra del director nuevo que cae sobre la mesa en «Soon after»
  const so = tramo(t, pronto, P4); if (so > 0) for (let y = 0; y < 180; y++) { const xa = Math.round(lerp(-40, 120, so) + Math.sin(y * 0.05) * 6 - (y < 60 ? (60 - y) * 0.3 : 0)); for (let x = 0; x < Math.min(320, xa + 120); x++) if (((x + y) & 1) === 0 || x < xa) tinte(x, y, hex('#0a0a14'), 0.45); }
};

// ── 4 · el despacho de Bélikov al anochecer (fondo local) ──
const despacho = () => {
  // la pared de paneles de nogal con su moldura y la tela de arriba
  for (let y = 0; y < 136; y++) for (let x = 0; x < 320; x++) { if (y < 58) { R.pset(x, y, (x + (y >> 2)) % 6 === 0 ? hex('#5a4a3a') : h(x >> 1, y >> 1, 41) < 0.1 ? hex('#7a6448') : hex('#6c5840')); continue; }
    const px = x % 40, py = (y - 62) % 36; R.pset(x, y, px < 2 || py < 2 ? hex('#2a160a') : px < 4 || py < 4 ? hex('#7a4a28') : Math.sin((x + Math.sin(y * 0.2) * 4) * 0.6) > 0.8 ? hex('#4a2a14') : hex('#5a3418')); }
  R.rect(0, 56, 319, 61, hex('#8a5a34')); R.rect(0, 56, 319, 56, hex('#b07a48')); R.rect(0, 61, 319, 61, hex('#2a160a'));
  R.rect(0, 130, 319, 136, hex('#2a160a')); R.rect(0, 130, 319, 130, hex('#6a4024'));
  // el suelo de parqué en espiga y la alfombra roja con cenefa
  for (let y = 137; y < 180; y++) for (let x = 0; x < 320; x++) { const k = ((x >> 3) + (y >> 2)) % 2; R.pset(x, y, (x + y * (k ? 1 : -1)) % 8 === 0 ? hex('#3a2010') : k ? hex('#7a4a24') : hex('#6a3e1e')); }
  R.poligono([[40, 150], [280, 150], [300, 179], [20, 179]], hex('#5a1418')); R.poligono([[46, 153], [274, 153], [292, 177], [28, 177]], hex('#8a2228'));
  for (let x = 40; x < 280; x += 6) { R.pset(x, 155, hex('#c89838')); R.pset(x + 3, 175, hex('#c89838')); }
  // la puerta acolchada a la izquierda (la hoja la pinta la escena), con su marco
  R.rect(14, 64, 56, 136, hex('#2a160a')); R.rect(16, 66, 54, 136, hex('#1a1410'));
  // la caja fuerte verde y el archivador de cajones a la derecha
  caja(244, 92, 286, 136, hex('#3a5a4a'), hex('#5a7a6a'), hex('#2a4034')); R.disco(265, 112, 6, K); R.disco(265, 112, 5, hex('#b8bcc8')); R.disco(265, 112, 2, hex('#7c8090')); R.rect(276, 108, 280, 118, hex('#b8bcc8'));
  caja(290, 70, 318, 136, hex('#6a6a74'), hex('#8a8a96'), hex('#4a4a54')); for (let k = 0; k < 4; k++) { R.rect(292, 74 + k * 15, 316, 74 + k * 15, K); R.rect(300, 79 + k * 15, 308, 80 + k * 15, hex('#c8c8d0')); }
  // el estandarte rojo con la estrella (sin letras) y el reloj de pared
  R.rect(96, 10, 98, 50, hex('#c8a040')); R.disco(97, 9, 2, hex('#f0c040'));
  // la ventana grande del centro (el hueco lo pinta la escena: Moscú al anochecer)
  R.rect(132, 12, 214, 98, hex('#2a160a')); R.rect(134, 14, 212, 96, 0); R.rect(128, 96, 218, 100, hex('#8a5a34')); R.rect(128, 96, 218, 96, hex('#b07a48'));
  // la estantería de libros y el busto sin rasgos encima (a la izquierda de la ventana)
  caja(62, 66, 120, 136, hex('#3a2212')); for (let s = 0; s < 3; s++) { const y0 = 70 + s * 21; R.rect(64, y0, 118, y0 + 18, hex('#1a0e06')); let x = 65; while (x < 116) { const w = 3 + Math.floor(h(x, s, 7) * 3), c = [hex('#3a5a8a'), hex('#8a3a2a'), hex('#4a6a3a'), hex('#a88a3a'), hex('#6a3a5a')][Math.floor(h(x, s, 9) * 5)]; R.rect(x, y0 + 3 + Math.floor(h(x, s, 3) * 4), Math.min(117, x + w - 1), y0 + 18, c); R.pset(x, y0 + 8, hex('#e0c060')); x += w + 1; } R.rect(63, y0 + 19, 119, y0 + 20, hex('#6a4226')); }
  // la mesa grande (lo de delante: tablero y frente; el tapete lo pinta la escena encima de los papeles) — va en mesaDelante
};
const mesaDelante = () => {
  // el tablero (tapete verde) y el frente tallado de la mesa del director
  R.poligono([[96, 130], [238, 130], [246, 137], [88, 137]], K); for (let y = 131; y <= 136; y++) { const xa = Math.round(96 - (y - 131)), xb = Math.round(238 + (y - 131)); for (let x = xa; x <= xb; x++) R.pset(x, y, h(x, y, 51) < 0.15 ? hex('#245a32') : hex('#2e6a3c')); }
  R.rect(86, 137, 248, 140, hex('#8a5a34')); R.rect(86, 137, 248, 137, hex('#b07a48'));
  madera(88, 141, 246, 171, hex('#5a3418'), hex('#3a2010'), hex('#7a4a28'), 5);
  for (const [a, b] of [[94, 160], [174, 240]]) { R.rect(a, 145, b, 167, hex('#2a160a')); R.rect(a + 2, 147, b - 2, 165, hex('#6a3e1e')); R.rect(a + 2, 147, b - 2, 147, hex('#8a5a34')); R.disco((a + b) >> 1, 156, 2, hex('#c89838')); }
  R.rect(88, 171, 246, 173, hex('#2a160a'));
};
const p4 = (t) => {
  capa('despacho', despacho);
  // por la ventana: Moscú al anochecer, las cúpulas y los tejados con nieve, las ventanas encendidas y la nieve que cae
  R.recorte([134, 14, 212, 95]);
  for (let y = 14; y <= 95; y++) { const u = (y - 14) / 81; for (let x = 134; x <= 212; x++) R.pset(x, y, u + (h(x, y, 61) - 0.5) * 0.1 < 0.35 ? hex('#2a2a5a') : u < 0.7 ? hex('#4a3a6a') : hex('#a8607a')); }
  for (let k = 0; k < 14; k++) { const x = 134 + Math.round(h(k, 1, 62) * 78), y = 14 + Math.round(h(k, 2, 62) * 30); if (Math.sin(t * 2 + k) > -0.6) R.pset(x, y, hex('#e8e8ff')); }
  for (const [x, w, hh] of [[136, 18, 30], [156, 14, 22], [172, 22, 36], [196, 16, 26]]) { R.rect(x, 96 - hh, x + w, 95, hex('#1e1a2e')); R.rect(x, 96 - hh, x + w, 96 - hh, hex('#e8ecf4')); for (let j = 96 - hh + 4; j < 94; j += 5) for (let i = x + 2; i < x + w - 1; i += 4) if (h(i, j, 63) < 0.45) R.rect(i, j, i + 1, j + 1, hex('#f0c060')); }
  for (const [x, y, r] of [[184, 52, 6], [160, 66, 4]]) { R.rect(x - 1, y + r, x + 1, y + r + 14, hex('#2a2238')); R.disco(x, y, r, hex('#c8a040')); R.disco(x - 1, y - 1, r - 2, hex('#f0d070')); R.linea(x, y - r - 4, x, y - r, hex('#c8a040')); }
  for (let k = 0; k < 26; k++) { const x = 134 + ((k * 31 + t * (6 + (k % 3) * 3)) % 79), y = 14 + ((k * 17 + t * (10 + (k % 4) * 4)) % 82); R.pset(Math.round(x), Math.round(y), hex('#f4f8ff')); }
  R.recorte(null);
  R.rect(172, 14, 174, 95, hex('#2a160a')); R.rect(134, 54, 212, 56, hex('#2a160a'));
  // las cortinas pesadas que se mecen
  for (const [x0, lado] of [[122, -1], [210, 1]]) for (let y = 10; y < 104; y++) { const w = 12 + Math.round(Math.sin(y * 0.08 + t * 0.7 + lado) * 1.5); for (let x = 0; x < w; x++) R.pset(x0 + (lado < 0 ? x : x - 2), y, [hex('#7a2028'), hex('#5a141c'), hex('#8e2a32')][(x + y * 0) % 3]); }
  // el estandarte rojo con la estrella que ondea
  for (let y = 12; y < 44; y++) for (let x = 99; x < 120; x++) { const o = Math.round(Math.sin(t * 2 + x * 0.3) * 1.2); R.pset(x, y + o, (x + y) % 9 === 0 ? hex('#a01a24') : hex('#c8283a')); }
  R.icono('estrella', 105, 22 + Math.round(Math.sin(t * 2 + 3) * 1), hex('#f0c040'), K, 1);
  // el reloj de pared a la derecha, con el péndulo
  R.disco(234, 30, 10, K); R.disco(234, 30, 9, hex('#e8e0c8')); R.linea(234, 30, 234 + Math.round(Math.sin(t * 0.5) * 6), 30 - Math.round(Math.cos(t * 0.5) * 6), K); R.linea(234, 30, 238, 32, K);
  caja(229, 40, 239, 64, hex('#5a3418')); const pa = Math.sin(t * 3) * 3; R.linea(234, 42, 234 + Math.round(pa), 58, hex('#c89838')); R.disco(234 + Math.round(pa), 59, 2, hex('#f0c040'));
  // la puerta: se abre en «tougher» para que entre Bélikov y se queda entornada
  const ab = tramo(t, P4 + 0.05, P4 + 0.45) - tramo(t, belikov + 0.4, belikov + 1.0) * 0.6, ancho = Math.round(38 - ab * 30);
  R.rect(16, 66, 54, 136, hex('#c8b890')); R.rect(16, 100, 54, 136, hex('#6a4a2a'));
  // los que van detrás de la mesa: Bélikov entra y se planta detrás; el oficinista llega con las pilas por la derecha
  const anda = tramo(t, P4 + 0.3, belikov + 0.2), bx = Math.round(lerp(24, 160, anda));
  const tira = t > mesa - 0.2 && t < mesa + 0.6, sella = t > mesa + 0.9 && t < mesa + 1.8;
  const golpe = sella ? Math.round(Math.abs(Math.sin((t - mesa - 0.9) * Math.PI * 2)) * -6) : 0;
  const rb = R.actor(TS.belikov, bx, 137, t, { dir: 1 - (anda >= 1 && t < acabo ? 2 : 0), anda: anda > 0 && anda < 1, enfado: t > belikov, habla: t > director && t < belikov, brazos: tira, sostiene: sella ? [150, 124 + golpe] : t > belikov + 0.4 && t < acabo ? [176, 126] : false });
  // las tres pilas que trae el oficinista (cada una llega en su palabra)
  const viajes = [acabo, todos, papeles];
  const pos = (k) => { const t0 = viajes[k] - 1.0; return tramo(t, t0, viajes[k]); };
  let ox = 330, lleva = -1; for (let k = 0; k < 3; k++) { const u = pos(k); if (u > 0 && u < 1) { ox = Math.round(lerp(330, 250, Math.min(1, u * 1.6))); lleva = k; } else if (u >= 1 && k === 2) ox = Math.round(lerp(250, 330, tramo(t, papeles + 0.2, papeles + 1.6))); }
  if (t > acabo - 1.0) R.actor(TS.burocrata, ox, 160, t, { dir: lleva < 0 && t > papeles + 0.2 ? 1 : -1, anda: (lleva >= 0 && ox > 250) || (t > papeles + 0.2 && ox < 330), sostiene: lleva >= 0 ? [ox - 2, 134] : false, habla: t > todos - 0.2 && t < todos + 0.4 });
  // la hoja de la puerta, por delante de quien entra
  R.rect(16, 66, 16 + ancho, 136, hex('#5a1e1e')); for (let y = 70; y < 134; y += 8) for (let x = 19; x < 14 + ancho; x += 8) R.disco(x, y, 1, hex('#c89838')); R.rect(16 + ancho, 66, 17 + ancho, 136, K); R.disco(10 + ancho, 104, 2, hex('#c89838'));
  mesaDelante();
  // las pilas de papeles y carpetas en la mesa (crecen con cada viaje; en «desk» Bélikov las arrastra hacia él, a los lados)
  const junta = tramo(t, mesa - 0.2, mesa + 0.5);
  for (let k = 0; k < 4; k++) { const llego = k === 0 ? 1 : tramo(t, viajes[k - 1], viajes[k - 1] + 0.2); if (llego <= 0) continue;
    const x = Math.round(lerp([112, 232, 214, 196][k], [126, 190, 208, 140][k], junta)), alto = [10, 12, 16, 14][k], base = k === 3 ? 131 - Math.round(junta * 20) : k === 2 ? 131 - Math.round(junta * 24) : 131;
    for (let j = 0; j < alto; j++) { const y = base - j * 2, dx = Math.round(Math.sin(j * 1.7 + k) * 1.5); R.rect(x - 9 + dx, y - 1, x + 9 + dx, y, j % 5 === 4 ? hex('#c8a870') : hex('#f2eee2')); R.pset(x - 9 + dx, y, hex('#a8a498')); R.pset(x + 9 + dx, y - 1, hex('#ffffff')); } }
  // lo que lleva el oficinista en brazos
  if (lleva >= 0) for (let j = 0; j < 8; j++) R.rect(ox - 12, 134 - j * 2, ox + 4, 135 - j * 2, j % 4 === 3 ? hex('#c8a870') : hex('#f2eee2'));
  // el sello de Bélikov sobre la pila en «desk», y el flexo de la mesa que se enciende
  if (sella) { const [mx, my] = rb.mano; R.rect(mx - 2, my - 1, mx + 2, my + 3, hex('#3a2a1a')); R.rect(mx - 3, my + 4, mx + 3, my + 5, hex('#c8302a')); }
  if (t > mesa + 1.3) { R.disco(150, 130, 3, hex('#c8302a')); R.disco(150, 130, 1, hex('#f2eee2')); }
  const luz = t > belikov ? 1 : 0; R.rect(102, 114, 104, 130, hex('#c89838')); R.poligono([[94, 114], [112, 114], [108, 106], [98, 106]], hex('#2a6a3a')); R.rect(98, 130, 108, 132, hex('#c89838'));
  if (luz) for (let y = 115; y < 130; y++) for (let x = 92 - (y - 115); x < 116 + (y - 115); x++) if (((x + y) & 1) === 0) tinte(x, y, hex('#fff0b0'), 0.25);
};

const efectos = [[0.5, 'puerta'], [1.4, 'tecleo'], [manos, 'papel'], [elorg, 'sello'], [firma, 'firma'], [ordenadores, 'lapiz'], [detalle, 'aviso'],
  [nunca, 'golpecito'], [consolas, 'golpecito'], [P4 + 0.1, 'puerta'], [acabo, 'papel'], [papeles, 'papel'], [mesa + 1.0, 'sello']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1988 });
''')

E['ts-reventa'] = ('La reventa', '''// TS-REVENTA (frase 11), 1988. Tres planos:
// 1. «Even so, the rights kept being resold from company to company, to Japan and to arcade machines»: el mapa del
//    mundo de papel, centrado en el Pacífico (fondo local): de Londres sale un contrato que vuela por su arco hasta
//    EE. UU. en «resold»; de allí, otro a Japón en «Japan» y otro a una máquina recreativa dibujada en el Pacífico en
//    «arcade»; cada uno clava su chincheta al llegar y el arco queda punteado. Barcos y nubes sobre el mapa. Corta en «and every».
// 2. «and every buyer believed they owned something they didn't fully own»: el vestíbulo de un centro de negocios
//    (fondo local): tres puertas con su bandera (Reino Unido, EE. UU., Japón); cada comprador sale de la suya en «every
//    buyer» y levanta su contrato, orgulloso, en «owned»; en «didn't fully own» a cada contrato se le cae un trozo y los
//    tres se quedan con «?». Un mensajero cruza por delante con su carro. Corta en «It was».
// 3. «It was like a row of pieces that didn't quite fit, about to come crashing down»: la torre de bloques de madera
//    mal encajados sobre una mesa de despacho (inserto, fondo local), cada bloque con su pegatina (las banderas, la
//    recreativa, el ordenador); se tambalea desde «row»; un gato se acerca, la mira, y en «about to» le da con la pata;
//    en «crashing» la torre cae y los bloques ruedan por la mesa; el gato salta del susto.''', COMUN + r'''
const e = (f) => en('reventa', f);
const P2 = e(0.435), P3 = e(0.70);
const revende = e(0.1162), empresa = e(0.1742), empresa2 = e(0.2213), japon = e(0.278), recre = e(0.343), maquinas = e(0.372);
const cada = e(0.4481), comprador = e(0.466), creia = e(0.4882), poseia = e(0.538), noDel = e(0.6043), del = e(0.6431);
const fila = e(0.7448), piezas = e(0.7697), noEncaja = e(0.8167), encaja = e(0.8485), aPunto = e(0.8928), cae = e(0.9315), abajo = e(0.9578);

// una bandera pequeña (w × hh) en (x, y), con ondas: 'uk', 'us', 'jp'
const bandera = (tipo, x, y, w, hh, t, k = 0) => {
  for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) {
    const o = Math.round(Math.sin(t * 4 + i * 0.5 + k) * 1.2 * (i / w)); let c;
    if (tipo === 'jp') c = Math.hypot(i - w / 2 + 0.5, (j - hh / 2 + 0.5) * 1.1) < hh * 0.3 ? hex('#c8283a') : hex('#f6f2ec');
    else if (tipo === 'us') c = i < w * 0.45 && j < hh * 0.55 ? ((i + j) % 3 === 0 ? hex('#f6f2ec') : hex('#2a3a7a')) : (j % 2 ? hex('#f6f2ec') : hex('#c8283a'));
    else { const cx = Math.abs(i - (w - 1) / 2), cy = Math.abs(j - (hh - 1) / 2), dg = Math.abs(i / (w - 1) - j / (hh - 1)) < 0.09 || Math.abs(i / (w - 1) - (1 - j / (hh - 1))) < 0.09;
      c = cx < 1 || cy < 1 ? hex('#c8283a') : cx < 2 || cy < 2 ? hex('#f6f2ec') : dg ? hex('#c8283a') : hex('#2a3a7a'); }
    R.pset(x + i, y + j + o, (i + o) % 5 === 0 ? mez(c, K, 0.18) : c); }
};

// ── 1 · el mapa del mundo con los contratos que vuelan ──
const PM = equirect([0, 0, 320, 180], [95, 385, -20, 88]);
const pt = (lon, lat) => PM([lon, lat]).map(Math.round);
const LON = pt(-0.1 + 360, 51.5), EEUU = pt(-122.3 + 360, 37.8), JAP = pt(139.7, 35.7), ARC = pt(196, 30);
const VUELOS = [{ de: LON, a: EEUU, t0: revende - 0.3, t1: empresa2 + 0.2, c: hex('#c8302a') }, { de: EEUU, a: JAP, t0: japon - 1.2, t1: japon + 0.05, c: hex('#2a5ac8') }, { de: EEUU, a: ARC, t0: recre - 0.7, t1: maquinas + 0.1, c: hex('#2a8a4a') }];
const curva = (v, q) => { const cx = (v.de[0] + v.a[0]) / 2, cy = Math.min(v.de[1], v.a[1]) - 26; return [(1 - q) * (1 - q) * v.de[0] + 2 * q * (1 - q) * cx + q * q * v.a[0], (1 - q) * (1 - q) * v.de[1] + 2 * q * (1 - q) * cy + q * q * v.a[1]]; };
// la máquina recreativa dibujada en el mapa: el mueble, la pantalla que brilla, la palanca y los botones
const recreativa = (x, y, t, on) => { caja(x - 7, y - 22, x + 7, y, hex('#3a2a6a'), hex('#5a4a9a'), hex('#2a1a4a')); R.poligono([[x - 7, y - 22], [x + 7, y - 22], [x + 9, y - 26], [x - 9, y - 26]], K); R.rect(x - 7, y - 25, x + 7, y - 23, on ? hex('#f0c040') : hex('#8a6a2a'));
  R.rect(x - 5, y - 19, x + 5, y - 11, K); R.rect(x - 4, y - 18, x + 4, y - 12, on && Math.floor(t * 4) % 2 ? hex('#5af07a') : hex('#1e3a2a')); R.rect(x - 6, y - 9, x + 6, y - 7, hex('#2a2a32')); R.rect(x - 3, y - 11, x - 3, y - 9, K); R.pset(x - 3, y - 12, hex('#c8302a')); R.pset(x + 2, y - 8, hex('#f0c040')); R.pset(x + 4, y - 8, hex('#3a8ae8')); };
const p1 = (t) => {
  capa('mapaMundo', () => { mapaPapel(R, 0, PM, { mundo: true, reticula: 15, mesa: 5, rosa: [262, 140] }); });
  // las sombras de las nubes que pasan sobre el papel y dos barcos que cruzan los océanos
  for (let k = 0; k < 3; k++) { const cx = ((k * 130 + t * (5 + k * 2)) % 420) - 50, cy = 40 + k * 44; for (let y = cy - 8; y < cy + 8; y++) for (let x = Math.round(cx - 22); x < cx + 22; x++) if (x > 5 && x < 315 && y > 5 && y < 175 && ((x + y) & 1) && ((x - cx) / 22) ** 2 + ((y - cy) / 8) ** 2 < 1) tinte(x, y, hex('#2a3a4a'), 0.22); }
  for (const [x0, y0, v, d] of [[200, 120, 3, 1], [80, 130, 2.4, -1]]) { const x = Math.round(x0 + ((t * v * d) % 40)); R.rect(x - 3, y0, x + 3, y0 + 1, K); R.rect(x - 2, y0 - 2, x + 1, y0 - 1, hex('#f2eee2')); R.pset(x + (d > 0 ? -5 : 5), y0 + 1, hex('#e8eef4')); R.pset(x + (d > 0 ? -7 : 7), y0 + 1, hex('#c8d8e4')); }
  // Londres: el punto de partida, con el montón de contratos
  R.disco(LON[0], LON[1], 3, K); R.disco(LON[0], LON[1], 2, hex('#c8302a'));
  for (let k = 0; k < 3; k++) { R.rect(LON[0] - 4 + k, LON[1] + 4 - k * 2, LON[0] + 4 + k, LON[1] + 5 - k * 2, K); R.rect(LON[0] - 3 + k, LON[1] + 4 - k * 2, LON[0] + 3 + k, LON[1] + 4 - k * 2, hex('#f6f2e6')); }
  // la recreativa del Pacífico, que se enciende cuando le llega su contrato
  recreativa(ARC[0], ARC[1] + 8, t, t > maquinas + 0.1);
  for (const v of VUELOS) {
    const u = tramo(t, v.t0, v.t1);
    if (u <= 0) continue;
    // el arco punteado que deja el contrato
    R.recorte([6, 6, 313, 173]);
    for (let q = 0; q < u; q += 0.01) { const [x, y] = curva(v, q); if (Math.floor(q * 70) % 3 !== 2) { R.pset(Math.round(x), Math.round(y), v.c); R.pset(Math.round(x), Math.round(y) + 1, mez(v.c, K, 0.4)); } }
    R.recorte(null);
    // el contrato que vuela, con su sello, aleteando
    if (u < 1) { const [x, y] = curva(v, u), a = Math.round(Math.sin(t * 14) * 1), X = Math.round(x), Y = Math.round(y);
      R.poligono([[X - 5, Y - 6 + a], [X + 5, Y - 6 - a], [X + 5, Y + 6 - a], [X - 5, Y + 6 + a]], K); R.poligono([[X - 4, Y - 5 + a], [X + 4, Y - 5 - a], [X + 4, Y + 5 - a], [X - 4, Y + 5 + a]], hex('#f6f2e6'));
      R.linea(X - 3, Y - 3, X + 3, Y - 3, hex('#8a8478')); R.linea(X - 3, Y - 1, X + 2, Y - 1, hex('#8a8478')); R.disco(X + 1, Y + 3, 1, v.c); }
    // al llegar: la chincheta cae y late, y un destello
    if (u >= 1) { const b = tramo(t, v.t1, v.t1 + 0.3); chincheta(R, v.a[0], v.a[1], t, v.c, { baja: b, pulso: true });
      if (t < v.t1 + 0.6) for (let k = 0; k < 8; k++) { const an = k * 0.785, r = 5 + tramo(t, v.t1, v.t1 + 0.5) * 8; R.pset(Math.round(v.a[0] + Math.cos(an) * r), Math.round(v.a[1] - 3 + Math.sin(an) * r * 0.7), hex('#fff2a0')); } }
  }
  // el vaso de té en la esquina del mapa y la regla de madera
  R.disco(24, 158, 9, K); R.disco(24, 158, 8, hex('#a8a8b0')); R.disco(24, 158, 6, hex('#8a3a14')); R.pset(22, 156, hex('#e0a060')); vapor(24, 150, t, 2, 18);
  R.poligono([[60, 170], [150, 160], [151, 165], [61, 175]], K); R.poligono([[61, 170], [149, 161], [150, 164], [62, 174]], hex('#e0c088')); for (let i = 0; i < 18; i++) R.pset(64 + i * 5, 170 - Math.round(i * 0.55), hex('#5a3a22'));
};

// ── 2 · el vestíbulo de las tres puertas (fondo local) ──
const PUERTAS = [{ x: 22, f: 'uk', quien: 'ejecutivoMirror', papel: hex('#f6f2e6') }, { x: 132, f: 'us', quien: 'publico', papel: hex('#f6f2e6') }, { x: 242, f: 'jp', quien: 'rogers', papel: hex('#f6f2e6') }];
const vestibulo = () => {
  // la pared de mármol crema con vetas, la moldura y el friso
  for (let y = 0; y < 134; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + y * 0.11 + Math.sin(y * 0.07 + x * 0.02) * 3); R.pset(x, y, Math.abs(v) < 0.04 ? hex('#b8a888') : (x % 64 === 0 || y === 40) ? hex('#c8b898') : h(x >> 1, y >> 1, 71) < 0.08 ? hex('#ece2cc') : hex('#e2d6bc')); }
  R.rect(0, 0, 319, 6, hex('#8a7a60')); R.rect(0, 7, 319, 9, hex('#c8b898')); R.rect(0, 10, 319, 10, hex('#6a5a44'));
  R.rect(0, 120, 319, 133, hex('#5a4a3a')); R.rect(0, 120, 319, 121, hex('#8a7a60'));
  // la greca dorada bajo la moldura y los cuadros entre las puertas (paisajes sin letras)
  R.rect(0, 12, 319, 18, hex('#8a6a3a')); for (let x = 0; x < 320; x += 8) { R.rect(x + 1, 13, x + 6, 13, hex('#e0c060')); R.rect(x + 6, 13, x + 6, 17, hex('#e0c060')); R.rect(x + 3, 15, x + 4, 17, hex('#e0c060')); }
  for (const [x0, y0, cielo, tierra] of [[82, 24, '#e8a060', '#5a7a3a'], [196, 24, '#8ab8d8', '#c8a050']]) { caja(x0, y0, x0 + 34, y0 + 22, hex('#a87a30'), hex('#d8a850')); R.rect(x0 + 2, y0 + 2, x0 + 32, y0 + 12, hex(cielo)); R.rect(x0 + 2, y0 + 13, x0 + 32, y0 + 20, hex(tierra)); R.poligono([[x0 + 4, y0 + 13], [x0 + 14, y0 + 5], [x0 + 22, y0 + 13]], mez(hex(tierra), K, 0.3)); R.disco(x0 + 26, y0 + 6, 2, hex('#fff0c0')); }
  // el suelo de mármol en damero, pulido
  for (let y = 134; y < 180; y++) for (let x = 0; x < 320; x++) { const k = ((Math.floor((x - 160) / (14 + (y - 134) * 0.3)) + Math.floor((y - 134) / 9)) & 1); R.pset(x, y, k ? (h(x >> 1, y, 72) < 0.1 ? hex('#3a3a46') : hex('#2e2e3a')) : (h(x >> 1, y, 73) < 0.1 ? hex('#d8d0c0') : hex('#c8c0b0'))); }
  // las tres puertas de madera con el cristal esmerilado, el marco y el pomo de latón (la hoja la pinta la escena)
  for (const p of PUERTAS) { R.rect(p.x - 3, 52, p.x + 59, 134, hex('#3a2212')); R.rect(p.x - 1, 54, p.x + 57, 134, hex('#2a1a12'));
    R.rect(p.x + 4, 58, p.x + 52, 134, hex('#e8d8b0')); for (let y = 60; y < 132; y += 6) R.rect(p.x + 6, y, p.x + 50, y, hex('#d8c8a0'));
    R.rect(p.x - 5, 48, p.x + 61, 51, hex('#8a6a3a')); R.rect(p.x - 5, 48, p.x + 61, 48, hex('#b8945a')); }
  // entre las puertas: el reloj, la fuente de agua, el banco, las plantas y los apliques
  for (const x of [104, 214]) { R.rect(x - 1, 22, x + 1, 30, hex('#8a6a3a')); R.disco(x, 33, 5, hex('#fff0c0')); R.disco(x, 33, 3, hex('#ffffff')); }
  R.disco(104, 70, 9, K); R.disco(104, 70, 8, hex('#f6f2ec')); R.rect(103, 64, 104, 70, K); R.rect(104, 70, 108, 71, K);
  caja(206, 84, 222, 132, hex('#d8dce4'), hex('#ffffff'), hex('#a8acb4')); R.rect(208, 68, 220, 84, hex('#8ab8d8')); R.rect(208, 68, 220, 70, hex('#b8d8f0')); R.rect(210, 98, 218, 102, hex('#3a3a46'));
  for (const x of [92, 300]) { caja(x - 7, 116, x + 7, 132, hex('#a85a3a'), hex('#c87a5a'), hex('#7a3a24')); for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * 0.35; R.linea(x, 116, Math.round(x + Math.cos(a) * 14), Math.round(116 + Math.sin(a) * 18), k % 2 ? hex('#3a7a4a') : hex('#2a5a36')); } }
};
const p2 = (t) => {
  capa('vestibulo', vestibulo);
  // la burbuja que sube en la fuente de agua y las agujas del reloj
  { const u = (t * 0.8) % 1; R.pset(214, Math.round(83 - u * 14), hex('#e8f4ff')); R.pset(212, Math.round(80 - ((u + 0.5) % 1) * 12), hex('#e8f4ff')); }
  R.linea(104, 70, 104 + Math.round(Math.sin(t * 2) * 6), 70 - Math.round(Math.cos(t * 2) * 6), hex('#c8302a'));
  for (let k = 0; k < 3; k++) {
    const p = PUERTAS[k], sale = tramo(t, cada - 0.4 + k * 0.15, comprador + 0.4 + k * 0.15), abre = tramo(t, cada - 0.6 + k * 0.15, cada - 0.1 + k * 0.15);
    // la bandera de cada puerta sobre su mástil inclinado
    R.linea(p.x + 30, 46, p.x + 20, 24, hex('#8a6a3a')); R.disco(p.x + 20, 23, 1, hex('#f0c040')); bandera(p.f, p.x + 2, 24, 18, 11, t, k);
    // el comprador sale de su puerta, levanta el contrato orgulloso y, al caerse el trozo, se queda con «?»
    const x = Math.round(p.x + 21), suelo = Math.round(lerp(134, 158, sale)), arriba = t > creia && t < noDel + 0.1;
    const cae = tramo(t, noDel + k * 0.1, del + 0.3 + k * 0.1), mira = t > noDel + k * 0.1;
    const ra = R.actor(TS[p.quien], x, suelo, t, { dir: 1, anda: sale > 0 && sale < 1, sostiene: arriba ? [x + (k === 1 ? 14 : 13), suelo - 30] : [x + 14, suelo - 16], sonrisa: t > comprador && !mira, salto: arriba && t < poseia + 0.4 ? Math.round(Math.abs(Math.sin((t - creia) * 6)) * 3) : 0, sorpresa: mira && cae < 1, triste: cae >= 1 });
    // la hoja de la puerta, abierta hacia dentro (se pinta detrás de quien sale... por eso antes del contrato y después del fondo)
    // el contrato en su mano: la hoja con renglones y el sello; le falta un trozo que cae al suelo
    const [mx, my] = ra.mano, X = mx - 6, Y = my - 16;
    R.rect(X, Y, X + 12, Y + 15, K); R.rect(X + 1, Y + 1, X + 11, Y + 14, p.papel); for (let j = 3; j < 11; j += 2) R.rect(X + 2, Y + j, X + 9 - (j % 3), Y + j, hex('#8a8478')); R.disco(X + 8, Y + 12, 1, hex('#c8302a'));
    // el trozo que falta (una muesca de pieza de puzle) y el que cae
    const nx = X + 8, ny = Y + 3; if (cae > 0) { R.rect(nx, ny, nx + 4, ny + 4, hex('#c8c0b0')); R.rect(nx - 1, ny + 1, nx - 1, ny + 3, K); }
    if (cae > 0 && cae < 1) { const fx = Math.round(nx + Math.sin(cae * 9 + k) * 4), fy = Math.round(lerp(ny, suelo - 1, cae)); R.rect(fx, fy, fx + 4, fy + 3, K); R.rect(fx + 1, fy + 1, fx + 3, fy + 2, p.papel); }
    if (cae >= 1) { R.rect(nx - 2, suelo - 2, nx + 2, suelo, K); R.rect(nx - 1, suelo - 2, nx + 1, suelo - 1, p.papel); }
    if (mira) R.icono('?', x + 4, suelo - 44 - Math.round(tramo(t, noDel + k * 0.1, noDel + 0.3 + k * 0.1) * 4), hex('#ffe890'), K, 2);
    // la puerta: se abre (la hoja se ve de canto a la izquierda del hueco)
    const w = Math.round(48 * (1 - abre)); if (w > 1) { R.rect(p.x + 4, 58, p.x + 4 + w, 134, hex('#6a3e1e')); R.rect(p.x + 4, 58, p.x + 4 + w, 59, hex('#8a5a34')); R.disco(p.x + w - 2, 100, 2, hex('#c89838')); for (let y = 64; y < 130; y += 22) R.rect(p.x + 8, y, p.x + w - 4 > p.x + 8 ? p.x + w - 4 : p.x + 8, y + 16, hex('#5a3418')); }
    else { R.rect(p.x + 1, 56, p.x + 5, 134, hex('#6a3e1e')); R.rect(p.x + 5, 56, p.x + 5, 134, K); }
  }
  // el reflejo de los tres en el suelo pulido
  for (let y = 159; y < 170; y++) for (let x = 0; x < 320; x++) if (((x + y) & 1) && h(x, y, 74) < 0.05) tinte(x, y, hex('#ffffff'), 0.25);
  // el mensajero con el carro de paquetes, que cruza por delante
  const m = tramo(t, P2 + 0.2, P3 - 0.1), mx = Math.round(lerp(340, -60, m));
  R.actor(TS.operario, mx + 26, 180, t, { dir: -1, anda: true });
  caja(mx - 6, 158, mx + 22, 172, hex('#5a6a7a'), hex('#7a8a9a')); for (const [a, b, c] of [[-4, 6, '#c8964a'], [8, 20, '#b8844a']]) caja(mx + a, 146, mx + b, 158, hex(c), hex('#e2b06a')); R.disco(mx - 2, 175, 3, K); R.disco(mx + 18, 175, 3, K); R.linea(mx + 22, 160, mx + 30, 150, hex('#3a3a46'));
};

// ── 3 · la torre de bloques de madera que se cae (inserto, fondo local) ──
const despacho3 = () => {
  // la pared de papel pintado verde oscuro con rombos, el zócalo y la ventana al anochecer
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) { const d = (Math.abs(((x + 8) % 16) - 8) + Math.abs(((y + 8) % 16) - 8)); R.pset(x, y, d === 7 ? hex('#3a5a46') : d < 2 ? hex('#4a6a54') : h(x >> 1, y >> 1, 81) < 0.08 ? hex('#2e4a3a') : hex('#34503e')); }
  R.rect(0, 100, 319, 111, hex('#4a2a14')); R.rect(0, 100, 319, 100, hex('#7a4a28'));
  // el mapa enmarcado con su hilo rojo entre chinchetas (el de la escena anterior, en la pared)
  caja(20, 18, 104, 74, hex('#a87a30'), hex('#d8a850')); R.rect(24, 22, 100, 70, hex('#86a6bc')); for (const [a, b, c, d] of [[28, 30, 46, 52], [50, 26, 70, 44], [74, 34, 94, 60], [36, 56, 48, 66]]) R.poligono([[a, b], [c, b + 4], [c - 2, d], [a + 3, d - 2]], hex('#e8dcbc'));
  R.linea(90, 36, 44, 34, hex('#c8302a')); R.linea(44, 34, 32, 38, hex('#c8302a')); for (const [x, y] of [[90, 36], [44, 34], [32, 38], [62, 40]]) { R.disco(x, y, 1, hex('#c8302a')); }
  // la estantería a la derecha con archivadores
  caja(214, 14, 274, 100, hex('#3a2212')); for (let s = 0; s < 3; s++) { const y0 = 18 + s * 27; R.rect(216, y0, 272, y0 + 24, hex('#1a0e06')); for (let k = 0; k < 7; k++) { const x = 218 + k * 8; caja(x, y0 + 4, x + 6, y0 + 24, [hex('#8a3a2a'), hex('#3a5a8a'), hex('#a88a3a'), hex('#4a6a3a')][(k + s) % 4]); R.rect(x + 2, y0 + 16, x + 4, y0 + 17, hex('#e8e4d8')); } }
  // el canto de la mesa: el tablero de nogal en perspectiva, con vetas y su borde
  madera(0, 112, 319, 165, hex('#7a4a28'), hex('#5a3418'), hex('#9a6038'), 7);
  R.rect(0, 112, 319, 112, hex('#3a2010')); R.rect(0, 166, 319, 169, hex('#b07a48')); R.rect(0, 170, 319, 179, hex('#3a2010')); for (let x = 0; x < 320; x += 4) R.pset(x, 174, hex('#5a3418'));
  // en la mesa: el secante verde, la carpeta, el tintero con la pluma y unos papeles
  R.poligono([[18, 140], [96, 138], [100, 160], [14, 162]], hex('#2a5a36')); R.linea(18, 140, 96, 138, hex('#c8a870')); R.linea(14, 162, 100, 160, hex('#c8a870'));
  caja(36, 130, 60, 142, hex('#2a2a32'), hex('#4a4a56')); R.rect(40, 126, 56, 130, hex('#1a1a22')); R.linea(54, 128, 66, 112, hex('#e8e4d8')); R.linea(55, 128, 67, 112, hex('#b8b4a8'));
  for (let k = 0; k < 3; k++) { R.poligono([[236 + k * 3, 136 - k * 2], [292 + k * 2, 132 - k * 2], [296 + k * 2, 152 - k * 2], [240 + k * 3, 156 - k * 2]], K); R.poligono([[237 + k * 3, 137 - k * 2], [291 + k * 2, 133 - k * 2], [295 + k * 2, 151 - k * 2], [241 + k * 3, 155 - k * 2]], hex('#f2eee2')); }
  for (let j = 0; j < 6; j++) R.linea(246, 138 + j * 3 - 4, 288, 134 + j * 3 - 4, hex('#8a8478'));
};
// los bloques de la torre: ancho, alto, desplazamiento (mal encajados) y la pegatina
const BLOQ = [[34, 14, 0, 'pc'], [22, 16, 5, 'uk'], [30, 12, -6, 'us'], [16, 18, 8, 'jp'], [28, 12, 2, 'arc'], [20, 14, -9, 'us'], [26, 12, 6, 'uk'], [14, 16, -3, 'jp'], [22, 10, 3, 'pc']];
const SUELO3 = 150, XT = 160;
const BASE = (() => { let y = SUELO3; return BLOQ.map(([w, hh, dx]) => { const r = { w, hh, cx: XT + dx, cy: y - hh / 2 }; y -= hh - 1; return r; }); })();
const COL3 = [hex('#d8a860'), hex('#c89048'), hex('#e0b878'), hex('#b8803a')];
const pinta = (cx, cy, w, hh, a, k, tipo) => {
  const ca = Math.cos(a), sa = Math.sin(a), q = (u, v) => [Math.round(cx + u * ca - v * sa), Math.round(cy + u * sa + v * ca)];
  const pol = [q(-w / 2, -hh / 2), q(w / 2, -hh / 2), q(w / 2, hh / 2), q(-w / 2, hh / 2)];
  for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.poligono(pol.map(([x, y]) => [x + dx, y + dy]), K);
  R.poligono(pol, COL3[k % 4]);
  // la luz de arriba, la sombra de abajo y las vetas
  R.linea(...q(-w / 2 + 1, -hh / 2 + 1), ...q(w / 2 - 1, -hh / 2 + 1), mez(COL3[k % 4], hex('#ffffff'), 0.35));
  R.linea(...q(-w / 2 + 1, hh / 2 - 1), ...q(w / 2 - 1, hh / 2 - 1), mez(COL3[k % 4], K, 0.35));
  for (let i = -w / 2 + 4; i < w / 2 - 3; i += 7) R.linea(...q(i, -hh / 2 + 3), ...q(i + 2, hh / 2 - 3), mez(COL3[k % 4], K, 0.15));
  // la pegatina del centro: una banderita, la recreativa o el ordenador
  for (let j = -3; j <= 3; j++) for (let i = -4; i <= 4; i++) { let c;
    if (tipo === 'jp') c = i * i + j * j * 1.4 < 6 ? hex('#c8283a') : hex('#f6f2ec');
    else if (tipo === 'us') c = i < 0 && j < 0 ? hex('#2a3a7a') : (j & 1) ? hex('#f6f2ec') : hex('#c8283a');
    else if (tipo === 'uk') c = i === 0 || j === 0 ? hex('#c8283a') : Math.abs(i) === Math.abs(j) + 1 ? hex('#f6f2ec') : hex('#2a3a7a');
    else if (tipo === 'arc') c = Math.abs(i) < 3 && j < 1 && j > -3 ? hex('#5af07a') : Math.abs(i) < 4 ? hex('#5a3a9a') : null;
    else c = Math.abs(i) < 4 && j < 1 ? (Math.abs(i) < 3 && j < 0 && j > -3 ? hex('#5a8ae8') : hex('#e8e4d8')) : j === 2 && Math.abs(i) < 2 ? hex('#e8e4d8') : null;
    if (c) R.pset(...q(i, j), c); }
};
const p3 = (t) => {
  capa('despacho3', despacho3);
  // la lámpara de la mesa, con su cono de luz que tiembla un poco
  R.rect(298, 60, 300, 112, hex('#c89838')); R.poligono([[286, 60], [312, 60], [306, 50], [292, 50]], hex('#2a6a3a')); R.rect(290, 112, 308, 115, hex('#c89838'));
  for (let y = 62; y < 150; y += 1) for (let x = 230; x < 319; x++) if (((x + y) & 1) === 0 && Math.abs(x - 299) < (y - 60) * 0.7 && h(x, y, Math.floor(t * 3)) < 0.5) tinte(x, y, hex('#fff0b0'), 0.12);
  // la torre: tiembla desde «row» cada vez más; en «crashing» se vuelca hacia la derecha y los bloques se sueltan
  const amp = 0.012 + tramo(t, fila, aPunto) * 0.06, osc = Math.sin((t - fila) * 9) * amp * (t > fila ? 1 : 0.2);
  const tc = cae - 0.12, vuelca = t > tc ? Math.min(0.9, 2.6 * (t - tc) ** 2 + 0.6 * (t - tc)) : 0, suelta = tc + 0.45;
  const piv = [XT + 17, SUELO3];
  BASE.forEach((b, k) => {
    const a0 = osc * (1 + k * 0.25) + vuelca, dxk = Math.sin((t - fila) * 9 + k) * amp * k * 6 * (t > fila ? 1 : 0);
    const rot = ([x, y], a) => [piv[0] + (x - piv[0]) * Math.cos(a) - (y - piv[1]) * Math.sin(a), piv[1] + (x - piv[0]) * Math.sin(a) + (y - piv[1]) * Math.cos(a)];
    let [x, y] = rot([b.cx + dxk, b.cy], a0), ang = a0;
    if (t > suelta) { const s = t - suelta, [x0, y0] = rot([b.cx, b.cy], Math.min(0.9, 2.6 * (suelta - tc) ** 2 + 0.6 * (suelta - tc))), vx = 30 + k * 14 + (k % 3) * 10, vy = -10 - (k % 2) * 30;
      const yf = SUELO3 + 6 + (k % 3) * 5 - b.hh / 2; x = x0 + vx * s * Math.max(0, 1 - s * 0.6); y = Math.min(yf, y0 + vy * s + 260 * s * s); ang = 0.6 + s * (2 + k * 0.4) * (y < yf ? 1 : 0) + (y >= yf ? Math.round((0.6 + k) / (Math.PI / 2)) * Math.PI / 2 - 0.6 : 0); if (y >= yf) ang = (k % 2) * Math.PI / 2 + 0.1 * (k % 3 - 1); }
    // la sombra en la mesa
    if (t < suelta) R.rect(XT - 18, SUELO3, XT + 20, SUELO3 + 2, mez(hex('#5a3418'), K, 0.5));
    pinta(x, y, b.w, b.hh, ang, k, BLOQ[k][3]);
  });
  // el polvo al caer
  if (t > suelta + 0.3 && t < suelta + 1.4) for (let k = 0; k < 16; k++) { const s = t - suelta - 0.3; R.pset(Math.round(180 + (k - 8) * 7 + Math.sin(k) * s * 20), Math.round(156 - s * 14 - (k % 3) * 3), hex('#e8d8b8')); }
  // el gato gris atigrado: llega por la derecha, se sienta a mirar, le da con la pata en «about to» y salta del susto
  const llega = tramo(t, P3 + 0.3, piezas + 0.9), gx = Math.round(lerp(340, 218, llega)), susto = tramo(t, cae, cae + 0.5), huye = tramo(t, cae + 0.5, cae + 1.6);
  const X = Math.round(gx + huye * 140), Y = SUELO3 - Math.round(Math.sin(susto * Math.PI) * 16), anda = (llega > 0 && llega < 1) || huye > 0;
  const gris = hex('#8a8a96'), grisO = hex('#5a5a66'), grisL = hex('#b8b8c4');
  R.rect(X - 2, Y - 10, X + 14, Y - 2, K); R.rect(X - 1, Y - 9, X + 13, Y - 3, gris); for (let i = 1; i < 13; i += 3) R.rect(X + i, Y - 9, X + i, Y - 6, grisO); R.rect(X - 1, Y - 3, X + 13, Y - 3, grisL);
  const p = anda ? Math.floor(t * 8) % 2 : 0; for (const [lx, dy] of [[0, p], [3, 1 - p], [10, 1 - p], [13, p]]) R.rect(X + lx - 1, Y - 2, X + lx, Y - dy, K);
  // la cabeza mira a la torre; la pata se estira en «about to»
  const hx = X - 6, hy = Y - 15 - (llega >= 1 && t < aPunto ? Math.round(Math.sin(t * 5) * 1) : 0);
  R.rect(hx - 1, hy, hx + 8, hy + 8, K); R.rect(hx, hy + 1, hx + 7, hy + 7, gris); R.poligono([[hx, hy + 1], [hx + 1, hy - 3], [hx + 3, hy + 1]], K); R.poligono([[hx + 5, hy + 1], [hx + 7, hy - 3], [hx + 8, hy + 1]], K); R.pset(hx + 1, hy - 1, hex('#e8a0a0')); R.pset(hx + 6, hy - 1, hex('#e8a0a0'));
  R.pset(hx + 2, hy + 3, susto > 0 && susto < 1 ? hex('#ffffff') : hex('#e8d040')); R.pset(hx + 5, hy + 3, susto > 0 && susto < 1 ? hex('#ffffff') : hex('#e8d040')); R.pset(hx + 3, hy + 5, hex('#e8a0a0'));
  for (const s of [-1, 1]) R.linea(hx + 3 + s * 2, hy + 5, hx + 3 + s * 7, hy + 4 + (s > 0 ? 1 : 0), grisL);
  const pata = tramo(t, aPunto - 0.2, aPunto + 0.2) - tramo(t, cae - 0.05, cae + 0.2); if (pata > 0) { R.linea(X - 1, Y - 6, X - 1 - Math.round(pata * 14), Y - 8 - Math.round(pata * 4), K); R.rect(X - 3 - Math.round(pata * 14), Y - 10 - Math.round(pata * 4), X - 1 - Math.round(pata * 14), Y - 8 - Math.round(pata * 4), gris); }
  // la cola que se mece (erizada del susto)
  for (let i = 0; i < 12; i++) { const a = Math.sin(t * 3 + i * 0.3) * 0.6 + (susto > 0 && susto < 1 ? -1 : 0); R.rect(X + 13 + Math.round(Math.cos(-1.2 + a * i / 12) * i * 0.8), Y - 5 - Math.round(i * 0.9), X + 14 + Math.round(Math.cos(-1.2 + a * i / 12) * i * 0.8), Y - 4 - Math.round(i * 0.9), i % 3 ? gris : grisO); }
  if (susto > 0 && susto < 1) R.icono('!', X + 2, Y - 34, hex('#ffe890'), K, 2);
};

const efectos = [[revende, 'whoosh'], [empresa2 + 0.2, 'golpecito'], [japon + 0.05, 'golpecito'], [maquinas + 0.1, 'bip'], [cada - 0.4, 'puerta'], [poseia, 'papel'], [del, 'boing'], [aPunto, 'golpecito'], [cae, 'avalancha'], [cae + 0.1, 'miau']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1988 });
''')

E['ts-rogers'] = ('Rogers', '''// TS-ROGERS (frase 12), 1988. Cuatro planos:
// 1. «One of those buyers was Henk Rogers, a Dutch-born game designer living in Japan»: una calle de Tokio de noche
//    (fondo local): letreros luminosos de símbolos que parpadean, el tren elevado que pasa, farolillos que se mecen,
//    gente que cruza y un taxi por delante. Rogers, con bigote y camisa hawaiana, entra andando y se para en «Rogers»;
//    sobre él, un bocadillo con un molino que gira y un tulipán en «Dutch», un mando de juego en «game designer» y el
//    sol rojo de Japón en «Japan», mientras señala la calle. Corta en «He had seen».
// 2. «He had seen Tetris at a trade show in Las Vegas in 1988 and couldn't put it down»: la feria de Las Vegas (fondo
//    local): focos que barren, cerchas, puestos con monitores y globos, el letrero de dados y naipes que se enciende en
//    «Las Vegas» y el «88» de bombillas en «1988». Rogers llega al ordenador de demostración, se sorprende en «Tetris»
//    y se pone a jugar; en «couldn't put it down» la azafata le toca el hombro y él sigue, abrazado al teclado; la cola
//    espera con su reloj. Pasa gente por delante. Corta en «He got».
// 3. «He got the Japanese rights through that chain of sales, and then Nintendo»: el despachito de Rogers en Tokio, de día
//    (fondo local): el fax pita y saca una tira larga con la cadena de sellos (Reino Unido, EE. UU., Japón) en «Japanese
//    rights» y «chain»; Rogers coge la tira y salta de alegría en «sales»; en «Nintendo» suena el teléfono y se vuelve.
//    El tablero de go, la ventana con nubes y la torre de Tokio. Corta en «told».
// 4. «told him a secret: it was about to launch a handheld console»: la sala de reuniones de Tokio (fondo local): el
//    ejecutivo baja la persiana y cierra la puerta al curioso en «secret»; en «launch» levanta el paño granate y aparece la
//    consola de bolsillo gris en «handheld»; se enciende en «console»; Rogers se queda boquiabierto, salta y la señala.''', COMUN + r'''
const e = (f) => en('rogers', f);
const P2 = e(0.272), P3 = e(0.565), P4 = e(0.782);
const rogers = e(0.0726), holandes = e(0.1253), juego = e(0.1579), vive = e(0.1989), japon = e(0.2284);
const visto = e(0.287), tetris = e(0.2975), enFeria = e(0.3407), vegas = e(0.3859), anio = e(0.4343), noPodia = e(0.5112), soltar = e(0.5375);
const consiguio = e(0.5842), japoneses = e(0.6031), derechos = e(0.6252), cadena = e(0.68), ventas = e(0.7042), nintendo = e(0.7557);
const secreto = e(0.8252), lanzar = e(0.9041), bolsillo = e(0.9326), consola = e(0.9526);

// un bocadillo de pensamiento con su pictograma (k: 0 molino y tulipán, 1 mando de juego, 2 sol de Japón)
const bocadillo = (x, y, t, k, u) => {
  if (u <= 0) return; const w = Math.round(17 * Math.min(1, u * 3)), hh = Math.round(13 * Math.min(1, u * 3));
  R.disco(x - 9, y + 18, 1, hex('#f6f2ec')); R.disco(x - 6, y + 15, 2, K); R.disco(x - 6, y + 15, 1, hex('#f6f2ec'));
  R.rect(x - w - 1, y - hh - 1, x + w + 1, y + hh + 1, K); R.rect(x - w, y - hh, x + w, y + hh, hex('#f6f2ec')); R.rect(x - w + 1, y + hh, x + w - 1, y + hh, hex('#c8c4bc'));
  if (u < 0.34) return;
  if (k === 0) { // el molino holandés con las aspas que giran, y el tulipán rojo
    R.poligono([[x - 9, y + 10], [x - 3, y + 10], [x - 5, y - 2], [x - 7, y - 2]], hex('#8a5a34')); R.rect(x - 7, y + 4, x - 5, y + 10, hex('#5a3418'));
    for (let a = 0; a < 4; a++) { const an = t * 3 + a * Math.PI / 2; R.linea(x - 6, y - 2, Math.round(x - 6 + Math.cos(an) * 8), Math.round(y - 2 + Math.sin(an) * 8), hex('#3a3a46')); }
    R.disco(x - 6, y - 2, 1, K); R.rect(x + 7, y + 1, x + 7, y + 10, hex('#3a8a4a')); R.linea(x + 7, y + 6, x + 10, y + 3, hex('#3a8a4a'));
    R.poligono([[x + 3, y - 6], [x + 5, y - 3], [x + 7, y - 7], [x + 9, y - 3], [x + 11, y - 6], [x + 10, y + 1], [x + 4, y + 1]], hex('#d8283a')); R.pset(x + 6, y - 2, hex('#ff8a8a'));
    R.rect(x + 12, y - 8, x + 15, y - 7, hex('#c8283a')); R.rect(x + 12, y - 6, x + 15, y - 5, hex('#f6f2ec')); R.rect(x + 12, y - 4, x + 15, y - 3, hex('#2a3a8a')); }
  else if (k === 1) { // el mando: la cruceta y dos botones (uno parpadea)
    caja(x - 13, y - 6, x + 13, y + 7, hex('#3a3a46'), hex('#5a5a66')); R.rect(x - 9, y - 1, x - 3, y + 1, hex('#c8c8d0')); R.rect(x - 7, y - 3, x - 5, y + 3, hex('#c8c8d0'));
    R.disco(x + 5, y + 1, 2, Math.floor(t * 4) % 2 ? hex('#ff4a4a') : hex('#c8283a')); R.disco(x + 10, y - 1, 2, hex('#3a8ae8')); R.rect(x - 2, y + 4, x + 2, y + 4, hex('#8a8a96')); }
  else { R.rect(x - 14, y - 9, x + 14, y + 9, hex('#f6f2ec')); R.rect(x - 14, y - 9, x + 14, y - 9, hex('#c8c4bc')); R.disco(x, y, 6, hex('#c8283a')); R.pset(x - 2, y - 3, hex('#ff8a8a')); }
};

// ── 1 · una calle de Tokio de noche (fondo local) ──
const calle = () => {
  // el cielo de noche tramado, las estrellas y el horizonte de rascacielos con ventanas
  for (let y = 0; y < 110; y++) for (let x = 0; x < 320; x++) { const u = y / 110 + (h(x, y, 91) - 0.5) * 0.12; R.pset(x, y, u < 0.35 ? hex('#141a3a') : u < 0.6 ? hex('#1e2450') : u < 0.85 ? hex('#3a2e5e') : hex('#5a3a6a')); }
  for (let k = 0; k < 30; k++) R.pset(Math.round(h(k, 1, 92) * 270), Math.round(h(k, 2, 92) * 40), hex('#c8ccf0'));
  for (let x = 0; x < 320; x += 14) { const hh = x > 262 ? 14 + Math.floor(h(x, 3, 93) * 8) : 20 + Math.floor(h(x, 3, 93) * 30); R.rect(x, 74 - hh, x + 12, 74, hex('#1a1630')); for (let j = 74 - hh + 3; j < 72; j += 4) for (let i = x + 2; i < x + 11; i += 3) if (h(i, j, 94) < 0.35) R.pset(i, j, hex('#f0c870')); }
  // la torre de celosía roja y blanca a lo lejos (sin letras)
  for (let y = 18; y < 74; y++) { const w = Math.round(2 + (y - 18) * 0.22); const c = Math.floor((y - 18) / 8) % 2 ? hex('#e8e4e0') : hex('#d8402a'); R.pset(232 - w, y, c); R.pset(232 + w, y, c); if (y % 4 === 0) R.linea(232 - w, y, 232 + w, y, mez(c, K, 0.3)); }
  R.rect(226, 40, 238, 42, hex('#d8402a')); R.rect(224, 56, 240, 58, hex('#e8e4e0'));
  // el viaducto del tren elevado con sus pilares
  R.rect(0, 76, 319, 82, hex('#4a4a56')); R.rect(0, 76, 319, 76, hex('#6a6a76')); R.rect(0, 82, 319, 83, hex('#2a2a32')); for (let x = 10; x < 320; x += 60) { R.rect(x, 83, x + 6, 100, hex('#3a3a46')); R.rect(x, 83, x + 1, 100, hex('#5a5a66')); }
  // las fachadas de las tiendas (y 96–152): cuatro locales con sus toldos
  const LOC = [[0, 78, '#6a2a2a'], [80, 158, '#2a3a5a'], [160, 238, '#3a3a3a'], [240, 319, '#5a4a2a']];
  for (const [a, b, c] of LOC) { R.rect(a, 96, b, 152, hex(c)); for (let y = 96; y < 152; y += 3) for (let x = a; x <= b; x++) if (h(x >> 2, y, 95) < 0.08) R.pset(x, y, mez(hex(c), K, 0.3)); R.rect(a, 96, b, 98, mez(hex(c), hex('#ffffff'), 0.2)); R.rect(b, 96, b, 152, K); }
  // el puesto de fideos: la cortina partida azul, el mostrador, los cuencos
  R.rect(8, 110, 70, 150, hex('#f0c870')); for (let x = 10; x < 70; x += 12) { R.rect(x, 110, x + 10, 124, hex('#2a3a7a')); R.rect(x, 124, x + 10, 124, hex('#1a2450')); }
  R.rect(8, 136, 70, 150, hex('#8a5a34')); R.rect(8, 136, 70, 137, hex('#b07a48')); for (const x of [18, 34, 52]) { R.rect(x - 4, 132, x + 4, 136, hex('#f2eee2')); R.rect(x - 4, 132, x + 4, 132, hex('#c8302a')); }
  // la tienda de electrónica: escaparate con televisores
  R.rect(86, 108, 152, 148, hex('#0e1424')); for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) caja(90 + i * 15, 112 + j * 12, 102 + i * 15, 122 + j * 12, hex('#2a2a32'));
  // la cafetería con su escaparate cálido y mesitas
  R.rect(166, 110, 232, 148, hex('#e8a050')); R.rect(166, 128, 232, 129, hex('#8a5a34')); for (const x of [178, 204, 222]) { R.rect(x - 4, 136, x + 4, 137, hex('#5a3418')); R.rect(x, 137, x, 148, hex('#5a3418')); }
  // el estanco con la máquina expendedora iluminada
  caja(250, 104, 280, 150, hex('#e8eef4'), hex('#ffffff')); for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) R.rect(254 + i * 6, 108 + j * 9, 257 + i * 6, 114 + j * 9, [hex('#c8302a'), hex('#3a8ae8'), hex('#f0c040'), hex('#3a8a4a')][(i + j) % 4]); R.rect(254, 136, 276, 140, hex('#2a2a32'));
  R.rect(286, 108, 316, 150, hex('#3a2a1a')); R.rect(288, 110, 314, 130, hex('#f0d890'));
  // la acera de baldosas y la calzada con el paso de cebra
  for (let y = 152; y < 162; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 16 === 0 || y === 156) ? hex('#4a4a56') : h(x, y, 96) < 0.06 ? hex('#6a6a76') : hex('#5a5a66'));
  R.rect(0, 161, 319, 162, hex('#8a8a96'));
  for (let y = 163; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, h(x >> 1, y, 97) < 0.08 ? hex('#2a2a32') : hex('#323240'));
  for (let x = 110; x < 220; x += 12) R.rect(x, 166, x + 7, 179, hex('#d8d8e0'));
  // la tapa de alcantarilla, la línea del bordillo y las bicis aparcadas junto a la cafetería
  R.disco(262, 172, 5, hex('#24242c')); R.disco(262, 172, 4, hex('#3a3a46')); for (let i = -3; i <= 3; i += 2) R.linea(259, 172 + i, 265, 172 + i, hex('#24242c'));
  for (let x = 4; x < 100; x += 10) R.rect(x, 177, x + 5, 177, hex('#e8c040'));
  for (const x of [238, 250]) { R.disco(x, 149, 3, K); R.disco(x + 9, 149, 3, K); R.disco(x, 149, 2, hex('#5a5a66')); R.disco(x + 9, 149, 2, hex('#5a5a66')); R.linea(x, 149, x + 4, 144, hex('#2a6ac8')); R.linea(x + 4, 144, x + 9, 149, hex('#2a6ac8')); R.linea(x + 3, 142, x + 5, 142, K); R.linea(x + 8, 143, x + 8, 141, hex('#c8c8d0')); }
};
const p1 = (t) => {
  capa('calle', calle);
  // el tren elevado pasa con sus ventanas encendidas
  { const x = Math.round(((t * 70) % 760) - 420); R.recorte([0, 60, 319, 76]); for (let c = 0; c < 4; c++) { const x0 = x + c * 66; caja(x0, 64, x0 + 62, 76, hex('#c8ccd8'), hex('#e8ecf4')); R.rect(x0 + 1, 72, x0 + 61, 73, hex('#3a8a4a')); for (let w = 0; w < 7; w++) R.rect(x0 + 4 + w * 8, 66, x0 + 9 + w * 8, 70, hex('#f0e0a0')); } R.recorte(null); }
  // la luz roja de la torre que parpadea
  if (Math.floor(t * 1.5) % 2) R.pset(232, 17, hex('#ff3a3a'));
  // los letreros luminosos verticales de símbolos (sin letras), que parpadean
  for (const [x, c, k] of [[74, '#ff4a8a', 0], [154, '#4af0e8', 1], [236, '#f0d040', 2], [312, '#8aff6a', 3]]) {
    R.rect(x - 5, 84, x + 5, 132, K); R.rect(x - 4, 85, x + 4, 131, hex('#1a1424'));
    for (let j = 0; j < 5; j++) { const on = Math.sin(t * 3 + j * 1.3 + k * 2) > -0.6, col = on ? hex(c) : mez(hex(c), K, 0.6), y = 89 + j * 9;
      if ((j + k) % 3 === 0) { R.disco(x, y + 2, 2, col); } else if ((j + k) % 3 === 1) { R.rect(x - 2, y, x + 2, y + 4, col); R.rect(x - 1, y + 1, x + 1, y + 3, hex('#1a1424')); } else { R.linea(x - 2, y + 4, x, y, col); R.linea(x, y, x + 2, y + 4, col); } }
    if (Math.sin(t * 3 + k) > 0) for (let y = 86; y < 131; y += 2) tinte(x + 6, y, hex(c), 0.25); }
  // los televisores del escaparate: cambian de color; los farolillos rojos que se mecen
  for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) { const c = [hex('#5a8ae8'), hex('#e8a040'), hex('#5ae88a'), hex('#e85a8a')][Math.floor(t * 1.5 + i + j * 2) % 4]; R.rect(91 + i * 15, 113 + j * 12, 101 + i * 15, 121 + j * 12, c); R.rect(91 + i * 15, 113 + j * 12, 101 + i * 15, 113 + j * 12, mez(c, hex('#ffffff'), 0.5)); }
  for (const [x, k] of [[14, 0], [40, 1], [64, 2]]) { const s = Math.round(Math.sin(t * 2 + k) * 2); R.linea(x, 98, x + s, 102, K); R.disco(x + s, 106, 4, K); R.disco(x + s, 106, 3, hex('#e83a2a')); R.rect(x + s - 3, 106, x + s + 3, 106, hex('#a82018')); R.pset(x + s - 1, 104, hex('#ffb070')); }
  // los reflejos de los letreros en la calzada mojada, que tiemblan
  for (const [x, c] of [[74, '#ff4a8a'], [154, '#4af0e8'], [236, '#f0d040']]) for (let y = 165; y < 179; y += 2) if (Math.sin(t * 6 + y) > -0.3) R.rect(x - 2 + Math.round(Math.sin(t * 3 + y) * 1.5), y, x + 2 + Math.round(Math.sin(t * 3 + y) * 1.5), y, mez(hex(c), hex('#323240'), 0.55));
  // el vapor del puesto de fideos
  for (const x of [18, 34, 52]) vapor(x, 130, t, x, 14);
  // la gente que pasa por la acera
  { const u = ((t * 18) % 420) - 40; R.actor(TS.publica, Math.round(340 - u), 158, t, { dir: -1, anda: true }); }
  { const u = ((t * 14 + 200) % 420) - 40; R.actor(TS.publico, Math.round(u), 157, t, { dir: 1, anda: true, pal: { C: hex('#2a3a5a'), c: hex('#1e2a44') } }); }
  // Rogers entra andando y se para en «Rogers»; luego piensa (bocadillos) y señala la calle en «Japan»
  const w = tramo(t, 0.2, rogers + 0.2), rx = Math.round(lerp(-20, 140, w));
  R.actor(TS.rogers, rx, 159, t, { dir: 1, anda: w > 0 && w < 1, sonrisa: w >= 1, habla: t > holandes - 0.2 && t < vive, dedo: t > japon - 0.2 && t < P2 - 0.1 });
  const b0 = tramo(t, holandes - 0.15, holandes + 0.4) - tramo(t, juego - 0.25, juego - 0.05), b1 = tramo(t, juego - 0.05, juego + 0.4) - tramo(t, vive + 0.1, japon - 0.15), b2 = tramo(t, japon - 0.15, japon + 0.3);
  bocadillo(rx + 26, 106, t, 0, b0); bocadillo(rx + 26, 106, t, 1, b1); bocadillo(rx + 26, 106, t, 2, b2);
  // el taxi que pasa por delante (con el piloto encendido en el techo)
  { const x = Math.round(lerp(-70, 340, tramo(t, 3.4, 5.6))); if (x > -70 && x < 340) { caja(x, 162, x + 54, 176, hex('#d8a020'), hex('#f0c040'), hex('#a87a18')); R.poligono([[x + 12, 162], [x + 18, 152], [x + 38, 152], [x + 44, 162]], K); R.poligono([[x + 14, 161], [x + 19, 154], [x + 37, 154], [x + 42, 161]], hex('#5a7a9a'));
      R.rect(x + 25, 149, x + 31, 152, hex('#f6f2ec')); R.disco(x + 10, 177, 4, K); R.disco(x + 44, 177, 4, K); R.disco(x + 10, 177, 2, hex('#8a8a96')); R.disco(x + 44, 177, 2, hex('#8a8a96')); R.rect(x + 51, 165, x + 54, 168, hex('#fff2b0')); for (let i = 0; i < 18; i++) tinte(x + 55 + i, 166 + (i >> 3), hex('#fff2b0'), 0.4 - i * 0.02); } }
};

// ── 2 · la feria de Las Vegas de 1988 (fondo local) ──
const feria = () => {
  // el techo oscuro con las cerchas de acero en celosía
  for (let y = 0; y < 44; y++) for (let x = 0; x < 320; x++) R.pset(x, y, h(x >> 1, y >> 1, 101) < 0.08 ? hex('#1e1a2a') : hex('#16121e'));
  for (const y0 of [8, 30]) { R.rect(0, y0, 266, y0 + 1, hex('#5a5a66')); R.rect(0, y0 + 7, 266, y0 + 8, hex('#5a5a66')); for (let x = 0; x < 264; x += 8) R.linea(x, y0 + 1, x + 4, y0 + 7, hex('#4a4a56')); for (let x = 4; x < 264; x += 8) R.linea(x, y0 + 7, x + 4, y0 + 1, hex('#4a4a56')); } R.rect(267, 4, 270, 44, hex('#3a3a46'));
  // la pared del fondo con los puestos: el de la izquierda (monitores), el del letrero de dados, el de la derecha (pantallas)
  R.rect(0, 44, 319, 110, hex('#2a2440'));
  caja(4, 54, 100, 110, hex('#3a5a9a'), hex('#5a7aba'), hex('#2a4070')); for (let j = 0; j < 2; j++) for (let i = 0; i < 4; i++) caja(12 + i * 22, 64 + j * 20, 30 + i * 22, 80 + j * 20, hex('#2a2a32'));
  caja(110, 50, 210, 110, hex('#5a2a5a'), hex('#7a4a7a'), hex('#3a1a3a'));
  caja(220, 54, 316, 110, hex('#2a6a5a'), hex('#4a8a7a'), hex('#1a4a3a')); for (let i = 0; i < 5; i++) caja(226 + i * 18, 64, 240 + i * 18, 92, hex('#c8c0b0'), hex('#e8e0d0'));
  // la moqueta roja con rombos dorados, en perspectiva
  for (let y = 110; y < 180; y++) for (let x = 0; x < 320; x++) { const s = 10 + (y - 110) * 0.2, u = (x - 160) / s, v = (y - 110) / 6; const d = Math.abs((u % 2 + 2) % 2 - 1) + Math.abs((v % 2 + 2) % 2 - 1); R.pset(x, y, d < 0.25 ? hex('#c8a040') : d > 1.6 ? hex('#6a1a24') : h(x >> 1, y, 102) < 0.07 ? hex('#7a2a30') : hex('#8a2430')); }
  R.rect(0, 110, 319, 111, hex('#1a1020'));
};
// el ordenador de demostración en su peana: el monitor beis con los corchetes verdes y el teclado
const demo = (x, y, t, juega) => {
  caja(x - 14, y, x + 14, y + 40, hex('#d8d0c0'), hex('#f0e8d8'), hex('#a8a090')); R.rect(x - 10, y + 6, x + 10, y + 8, hex('#3a5a9a'));
  caja(x - 15, y - 28, x + 15, y - 2, hex('#d0c8b0'), hex('#e8e0c8'), hex('#a8a088')); R.rect(x - 12, y - 25, x + 12, y - 6, K); R.rect(x - 11, y - 24, x + 11, y - 7, hex('#0a120c'));
  // en la pantalla: filas de corchetes que bajan y una fila que se completa y parpadea
  for (let r = 0; r < 3; r++) { const yy = y - 10 - r * 4; for (let c = 0; c < 4; c++) if ((r * 3 + c + Math.floor(t * (juega ? 2 : 0.5))) % 4) { const xx = x - 9 + c * 5; R.rect(xx, yy, xx, yy + 2, hex('#56f07a')); R.pset(xx + 1, yy, hex('#56f07a')); R.pset(xx + 1, yy + 2, hex('#56f07a')); R.rect(xx + 3, yy, xx + 3, yy + 2, hex('#56f07a')); R.pset(xx + 2, yy, hex('#56f07a')); R.pset(xx + 2, yy + 2, hex('#56f07a')); } }
  { const yy = y - 22 + Math.floor((t * (juega ? 6 : 2)) % 10); R.rect(x - 2, yy, x - 2, yy + 2, hex('#56f07a')); R.rect(x + 1, yy, x + 1, yy + 2, hex('#56f07a')); }
  R.rect(x - 4, y - 2, x + 4, y, hex('#a8a088'));
  caja(x - 16, y - 1, x + 16, y + 4, hex('#e0d8c4'), hex('#f2eadc')); for (let i = 0; i < 9; i++) R.pset(x - 13 + i * 3, y + 2, juega && Math.floor(t * 10) % 9 === i ? hex('#ffffff') : hex('#9a9282'));
};
const p2 = (t) => {
  capa('feria', feria);
  // los focos del techo que barren la sala
  for (const [x0, f, c] of [[60, 0, '#fff0c0'], [160, 2, '#c0e0ff'], [262, 4, '#ffd0f0']]) { const a = Math.sin(t * 0.7 + f) * 0.5; R.rect(x0 - 3, 16, x0 + 3, 22, hex('#2a2a32')); R.disco(x0, 23, 2, hex(c));
    for (let y = 24; y < 178; y += 1) { const cx = x0 + Math.round(Math.tan(a) * (y - 24)), w = Math.round((y - 24) * 0.14); for (let x = cx - w; x <= cx + w; x++) if (((x + y) & 1) && x >= 0 && x < 320) tinte(x, y, hex(c), 0.1); } }
  // el letrero de dados y naipes del puesto central: se enciende en «Las Vegas»; el «88» de bombillas en «1988»
  const vg = t > vegas - 0.1, ochos = t > anio - 0.1;
  for (let k = 0; k < 2; k++) { const x = 136 + k * 22, y = 58 + Math.round(Math.sin(t * 2 + k) * 1); caja(x, y, x + 16, y + 16, vg ? hex('#f6f2ec') : hex('#a8a4a0'), hex('#ffffff')); for (const [i, j] of k ? [[4, 4], [11, 11], [4, 11], [11, 4], [7, 7]] : [[4, 4], [11, 11], [7, 7]]) R.rect(x + i, y + j, x + i + 1, y + j + 1, vg ? hex('#c8283a') : hex('#5a3a3a')); }
  for (const [x, rojo] of [[182, 1], [194, 0]]) { caja(x, 60, x + 10, 74, hex('#f6f2ec')); if (rojo) { R.disco(x + 5, 66, 2, hex('#c8283a')); R.pset(x + 5, 69, hex('#c8283a')); } else { R.rect(x + 4, 64, x + 6, 70, K); R.rect(x + 3, 66, x + 7, 66, K); } }
  for (let i = 0; i < 26; i++) { const x = 114 + i * 3.7, on = vg && Math.floor(t * 8 + i) % 3; R.pset(Math.round(x), 52, on ? hex('#fff2a0') : hex('#6a5a3a')); R.pset(Math.round(x), 107, on ? hex('#fff2a0') : hex('#6a5a3a')); }
  R.numero('88', 140, 102, { centro: true, color: ochos && Math.floor(t * 6) % 2 ? hex('#fff2a0') : ochos ? hex('#f0c040') : hex('#7a5a3a'), sombra: true });
  // los monitores de los puestos de los lados, con sus colores que cambian; los globos que se mecen
  for (let j = 0; j < 2; j++) for (let i = 0; i < 4; i++) R.rect(13 + i * 22, 65 + j * 20, 29 + i * 22, 79 + j * 20, [hex('#3a8ae8'), hex('#e8c040'), hex('#3ae88a'), hex('#e84a6a')][Math.floor(t * 2 + i + j) % 4]);
  for (let i = 0; i < 5; i++) { const on = Math.floor(t * 3 + i) % 3; R.rect(227 + i * 18, 65, 239 + i * 18, 91, on ? hex('#d8e8f0') : hex('#a8c8e0')); R.rect(229 + i * 18, 70, 237 + i * 18, 76, hex('#3a5a9a')); }
  for (const [x, c, k] of [[104, '#e8303a', 0], [112, '#f0c040', 1], [214, '#3a8ae8', 2], [218, '#e83a9a', 3]]) { const s = Math.round(Math.sin(t * 1.5 + k) * 2), y = 42 + (k % 2) * 6; R.linea(x, 110, x + s, y + 6, hex('#e8e4dc')); R.disco(x + s, y, 5, K); R.disco(x + s, y, 4, hex(c)); R.pset(x + s - 2, y - 2, hex('#ffffff')); }
  // la cola que espera (con su reloj, impaciente en «couldn't») y la azafata del puesto
  R.actor(TS.publico, 250, 158, t, { dir: -1, habla: Math.sin(t * 1.3) > 0.6, enfado: t > noPodia });
  R.actor(TS.publica, 274, 160, t, { dir: -1, dedo: t > noPodia + 0.3 && t < soltar + 0.8 });
  if (t > noPodia) R.icono('reloj', 251, 116 - Math.round(tramo(t, noPodia, noPodia + 0.3) * 4), hex('#ffe890'), K, 1);
  const az = tramo(t, vegas, noPodia - 0.1);
  R.actor(TS.publica, Math.round(lerp(320, 222, az)), 156, t, { dir: -1, anda: az > 0 && az < 1, pal: { C: hex('#2a4a9a'), c: hex('#1e3878'), H: hex('#c8a050'), h: hex('#e8c070') }, sonrisa: az < 1, habla: t > noPodia - 0.1 && t < soltar + 0.6, dedo: t > noPodia && t < soltar + 0.6 });
  // Rogers llega al ordenador, se asombra en «Tetris», juega y no lo suelta
  const w = tramo(t, P2, visto + 0.4), rx = Math.round(lerp(80, 166, w)), juega = t > tetris + 0.5;
  demo(198, 116, t, juega);
  R.actor(TS.rogers, rx, 156, t, { dir: 1, anda: w > 0 && w < 1, sorpresa: t > tetris - 0.05 && t < tetris + 0.5, sonrisa: juega && t < noPodia, enfado: t > noPodia + 0.2 && t < soltar + 0.8, sostiene: juega ? [184 + (Math.floor(t * 10) % 2), 117] : false });
  if (t > tetris - 0.05 && t < tetris + 0.8) R.icono('!', rx + 4, 112 - Math.round(tramo(t, tetris, tetris + 0.2) * 5), hex('#ffe890'), K, 2);
  if (t > noPodia + 0.2 && t < soltar + 1.2) { const s = Math.round(Math.sin(t * 16)); R.icono('X', rx - 12 + s, 116, hex('#ff8a7a'), K, 2); }
  // la gente de la feria que pasa por delante (cortada por abajo), con sus bolsas
  { const u = ((t - P2) * 26) % 520; R.actor(TS.publico, Math.round(-30 + u), 188, t, { dir: 1, anda: true, pal: { C: hex('#e8c040'), c: hex('#c09020') } }); }
  { const u = ((t - P2) * 22 + 260) % 520; R.actor(TS.publica, Math.round(340 - u), 190, t, { dir: -1, anda: true }); R.actor(TS.publico, Math.round(358 - u), 189, t, { dir: -1, anda: true }); }
};

// ── 3 · el despachito de Rogers en Tokio, de día (fondo local) ──
const despachito = () => {
  // la pared de listones claros y el zócalo
  for (let y = 0; y < 134; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 20 === 0 ? hex('#c8b898') : h(x >> 1, y >> 2, 111) < 0.08 ? hex('#ece0c4') : hex('#e2d6b8'));
  R.rect(0, 126, 319, 134, hex('#8a6a4a')); R.rect(0, 126, 319, 126, hex('#a8885a'));
  // el suelo de tatami/madera clara
  for (let y = 135; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y - 135) % 11 === 0 ? hex('#8a7a4a') : (x + (y >> 1)) % 3 === 0 ? hex('#c8b878') : hex('#d4c488'));
  // la ventana grande (el hueco lo pinta la escena) con el marco
  R.rect(176, 14, 264, 92, hex('#5a4a3a')); R.rect(178, 16, 262, 90, 0); R.rect(172, 90, 268, 94, hex('#8a6a4a')); R.rect(172, 90, 268, 90, hex('#b08a5a'));
  // la estantería con cajas de juegos (sin letras: colores y dibujos) y los disquetes
  caja(8, 20, 82, 126, hex('#6a4a2a')); for (let s = 0; s < 4; s++) { const y0 = 24 + s * 25; R.rect(10, y0, 80, y0 + 22, hex('#2a1a0e')); for (let k = 0; k < 6; k++) { const x = 12 + k * 11, c = [hex('#2a5ac8'), hex('#c8302a'), hex('#e8a020'), hex('#3a8a4a'), hex('#6a3aa8'), hex('#1a1a22')][(k + s * 2) % 6]; caja(x, y0 + 4, x + 9, y0 + 22, c); R.disco(x + 4, y0 + 11, 2, hex('#f2ecd8')); } R.rect(9, y0 + 23, 81, y0 + 24, hex('#8a6a3a')); }
  // el cuadro del dragón de tinta (sin letras) y el calendario de 1988 con un número
  caja(96, 26, 150, 80, hex('#f2ecd8'), hex('#ffffff')); R.rect(98, 28, 148, 78, hex('#f2ecd8')); for (let i = 0; i < 40; i++) { const a = i * 0.25; R.disco(Math.round(104 + i * 1.0), Math.round(54 + Math.sin(a) * 12), 2, hex('#2a2a32')); } R.disco(144, 52, 3, hex('#c8283a'));
  // la mesita baja con el tablero de go y sus cuencos de piedras
  caja(16, 150, 84, 158, hex('#c89848'), hex('#e0b868'), hex('#a07830')); for (const x of [20, 78]) R.rect(x, 158, x + 3, 170, hex('#8a6a3a'));
  for (let i = 0; i < 7; i++) { R.linea(22 + i * 9, 151, 22 + i * 9, 156, hex('#5a4020')); } R.linea(20, 153, 80, 153, hex('#5a4020'));
  for (const [x, y, c] of [[31, 152, '#1a1a22'], [40, 154, '#f6f6f6'], [49, 152, '#1a1a22'], [58, 153, '#f6f6f6'], [67, 155, '#1a1a22']]) R.disco(x, y, 2, hex(c));
  // el corcho con notas y fotos, la papelera con bolas de papel y la caja de disquetes
  caja(92, 88, 146, 120, hex('#b8844a'), hex('#d8a46a')); for (const [x, y, c] of [[96, 92, '#f6f2a0'], [110, 96, '#f6f2ec'], [124, 92, '#a8d8f0'], [100, 106, '#f6c0c0'], [118, 108, '#f6f2ec'], [134, 102, '#f6f2a0']]) { R.rect(x, y, x + 9, y + 9, hex(c)); R.pset(x + 4, y, hex('#c8302a')); R.rect(x + 2, y + 4, x + 7, y + 4, hex('#8a8478')); }
  caja(150, 156, 164, 172, hex('#5a6a7a'), hex('#7a8a9a')); for (const [x, y] of [[154, 154], [159, 153], [156, 151]]) R.disco(x, y, 2, hex('#f2eee2'));
  caja(236, 150, 268, 170, hex('#c8964a'), hex('#e2b06a'), hex('#a87a40')); for (let k = 0; k < 6; k++) R.rect(240 + k * 4, 144, 242 + k * 4, 150, k % 2 ? hex('#2a3a6a') : hex('#3a3a46'));
  for (const [x, c] of [[94, '#f6f6f6'], [104, '#1a1a22']]) { R.disco(x, 166, 5, K); R.disco(x, 166, 4, hex('#8a5a34')); R.disco(x, 164, 2, hex(c)); }
  // la mesa de trabajo con el ordenador beis, el teléfono y el fax (la tira la pinta la escena)
  R.rect(170, 128, 310, 133, hex('#6a4a2a')); R.rect(170, 128, 310, 128, hex('#8a6a3a')); R.rect(172, 134, 176, 172, hex('#4a3420')); R.rect(304, 134, 308, 172, hex('#4a3420'));
  caja(262, 98, 300, 126, hex('#d8d0c0'), hex('#f0e8d8')); R.rect(266, 102, 296, 120, hex('#0a1a2a')); for (let j = 104; j < 118; j += 3) R.rect(268, j, 268 + ((j * 7) % 20), j, hex('#5ae88a')); caja(258, 124, 304, 128, hex('#e0d8c4'));
  caja(190, 112, 230, 128, hex('#c8c8d0'), hex('#e8e8f0'), hex('#8a8a96')); R.rect(194, 112, 226, 114, K); R.rect(220, 118, 226, 122, hex('#3a3a46')); for (let i = 0; i < 4; i++) R.rect(198 + i * 5, 118, 200 + i * 5, 120, hex('#6a6a76'));
};
const p3 = (t) => {
  capa('despachito', despachito);
  // por la ventana: el cielo de día con nubes de tres tonos, los edificios de Tokio y la torre, unos pájaros
  R.recorte([178, 16, 262, 89]);
  for (let y = 16; y < 90; y++) for (let x = 178; x < 263; x++) R.pset(x, y, y + (h(x, y, 112) - 0.5) * 6 < 40 ? hex('#6a9ad8') : y < 64 ? hex('#8ab4e4') : hex('#a8c8ec'));
  for (let k = 0; k < 4; k++) { const v = [3, 5, 8][k % 3], x = 170 + ((k * 47 + t * v) % 110), y = 24 + (k * 13) % 30; for (const [dx, dy, r, c] of [[0, 0, 5, '#f6f8fc'], [5, 2, 4, '#dce6f2'], [-5, 2, 4, '#dce6f2'], [0, 4, 4, '#b8c8dc']]) R.disco(Math.round(x + dx), y + dy, r, hex(c)); }
  for (let y = 40; y < 90; y++) { const w = Math.round(1 + (y - 40) * 0.2); const c = Math.floor((y - 40) / 6) % 2 ? hex('#f0ece8') : hex('#e04a2a'); R.pset(236 - w, y, c); R.pset(236 + w, y, c); if (y % 3 === 0) R.linea(236 - w, y, 236 + w, y, c); }
  for (let x = 178; x < 263; x += 11) { const hh = 14 + Math.floor(h(x, 1, 113) * 24); R.rect(x, 90 - hh, x + 9, 89, hex('#8a94a8')); R.rect(x, 90 - hh, x + 9, 90 - hh, hex('#b8c0d0')); for (let j = 92 - hh; j < 88; j += 4) for (let i = x + 2; i < x + 8; i += 3) R.pset(i, j, hex('#5a6478')); }
  for (let k = 0; k < 2; k++) { const x = Math.round(((t * 12 + k * 50) % 100) + 170), y = 30 + k * 8, a = Math.floor(t * 6 + k) % 2; R.pset(x - 1, y - a, K); R.pset(x, y, K); R.pset(x + 1, y - a, K); }
  R.recorte(null);
  R.rect(219, 16, 220, 89, hex('#5a4a3a')); R.rect(178, 52, 262, 53, hex('#5a4a3a'));
  // el reloj de pared y la planta que se mece con el ventilador de mesa
  R.disco(160, 104, 7, K); R.disco(160, 104, 6, hex('#f6f2ec')); R.linea(160, 104, 160 + Math.round(Math.sin(t) * 4), 104 - Math.round(Math.cos(t) * 4), K); R.linea(160, 104, 163, 105, K);
  caja(240, 116, 252, 128, hex('#3a3a46')); R.disco(246, 112, 6, K); R.disco(246, 112, 5, hex('#c8ccd8')); for (let a = 0; a < 3; a++) { const an = t * 12 + a * 2.1; R.linea(246, 112, Math.round(246 + Math.cos(an) * 4), Math.round(112 + Math.sin(an) * 4), hex('#6a6a76')); }
  // el fax saca la tira con la cadena de sellos: Reino Unido, EE. UU. y Japón (aparecen al salir)
  const L = tramo(t, consiguio - 0.1, ventas - 0.3) * 100, coge = t > ventas - 0.2;
  const camino = (d) => d < 30 ? [204 - d, 114] : d < 50 ? [174 - (d - 30) * 0.4, 114 + (d - 30)] : [166 - (d - 50) * 0.9, 134 + (d - 50) * 0.35];
  const sube = tramo(t, ventas - 0.2, ventas + 0.3);
  const [ex, ey] = camino(L);
  // Rogers: se acerca al fax en «Japanese», coge la tira en «sales», la levanta y salta; se vuelve al teléfono en «Nintendo»
  const w = tramo(t, P3 + 0.2, japoneses + 0.3), rx = Math.round(lerp(60, 98, w)), suena = t > nintendo - 0.1;
  const salto = t > ventas && t < nintendo - 0.2 ? Math.round(Math.abs(Math.sin((t - ventas) * 7)) * 5) : 0;
  const ra = R.actor(TS.rogers, rx, 160, t, { dir: suena ? 1 : 1, anda: w > 0 && w < 1, sonrisa: t > derechos, habla: t > cadena && t < ventas, sostiene: coge ? [rx + 15, Math.round(lerp(140, 112, sube))] : false, salto, sorpresa: suena && t < nintendo + 0.5 });
  // la tira de papel: del fax hasta el suelo o hasta la mano de Rogers
  const puntos = []; for (let d = 0; d <= L; d += 2) puntos.push(camino(d));
  if (coge) { const [mx, my] = ra.mano; for (let i = 0; i < puntos.length; i++) { const q = i / Math.max(1, puntos.length - 1); if (q > 0.55) { const a = (q - 0.55) / 0.45; puntos[i] = [lerp(puntos[i][0], mx, a * sube), lerp(puntos[i][1], my + (1 - a) * 18, a * sube)]; } } }
  for (const [x, y] of puntos) { R.rect(Math.round(x) - 1, Math.round(y) - 4, Math.round(x) + 1, Math.round(y) + 4, K); }
  for (const [x, y] of puntos) { R.rect(Math.round(x) - 1, Math.round(y) - 3, Math.round(x) + 1, Math.round(y) + 3, hex('#f6f2e6')); }
  // los sellos de la cadena, en la tira: la banderita de cada uno
  const sellos = [[16, 'uk', japoneses], [42, 'us', derechos], [70, 'jp', cadena]];
  for (const [d, f, t0] of sellos) if (L > d + 6) { const i = Math.min(puntos.length - 1, Math.round(d / 2)), [x, y] = puntos[i].map(Math.round);
    R.rect(x - 5, y - 4, x + 5, y + 4, K); for (let j = -3; j <= 3; j++) for (let ii = -4; ii <= 4; ii++) { let c;
      if (f === 'jp') c = ii * ii + j * j * 1.3 < 6 ? hex('#c8283a') : hex('#f6f2ec'); else if (f === 'us') c = ii < 0 && j < 0 ? hex('#2a3a7a') : (j & 1) ? hex('#f6f2ec') : hex('#c8283a'); else c = ii === 0 || j === 0 ? hex('#c8283a') : Math.abs(ii) === Math.abs(j) + 1 ? hex('#f6f2ec') : hex('#2a3a7a');
      R.pset(x + ii, y + j, c); }
    if (t < t0 + 0.5 && t > t0) R.disco(x, y - 8, 1, hex('#fff2a0')); }
  // el piloto verde del fax que parpadea mientras imprime
  R.rect(222, 115, 224, 116, L < 100 && L > 0 && Math.floor(t * 6) % 2 ? hex('#5af07a') : hex('#2a4a2a'));
  // el teléfono que suena en «Nintendo»: el auricular salta y salen las ondas
  const brinca = suena ? Math.round(Math.abs(Math.sin(t * 22)) * 2) : 0;
  caja(276, 120 - 0, 296, 128, hex('#c8302a'), hex('#e8605a')); R.rect(274, 115 - brinca, 298, 119 - brinca, K); R.rect(275, 116 - brinca, 297, 118 - brinca, hex('#c8302a'));
  if (suena) { for (const r of [6, 10]) for (let a = -0.9; a < 0.9; a += 0.15) { R.pset(Math.round(286 + Math.cos(a - Math.PI / 2) * r - 0), Math.round(112 + Math.sin(a - Math.PI / 2) * r * 0.6), hex('#ffe890')); } }
};

// ── 4 · la sala de reuniones de Tokio: el secreto bajo el paño (fondo local) ──
const sala = () => {
  // la pared de paneles de papel con la celosía de madera oscura
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { const gx = x % 22, gy = y % 18; R.pset(x, y, gx < 2 || gy < 2 ? hex('#3a2416') : h(x, y, 121) < 0.05 ? hex('#e2dccc') : hex('#ece6d6')); }
  for (let y = 0; y < 50; y++) for (let x = 0; x < 320; x++) R.pset(x, y, h(x >> 1, y >> 1, 127) < 0.07 ? hex('#ddd4bc') : hex('#e6dec8'));
  R.rect(0, 0, 319, 4, hex('#3a2416')); R.rect(0, 48, 319, 52, hex('#3a2416')); R.rect(0, 48, 319, 48, hex('#6a4a2e')); R.rect(0, 120, 319, 128, hex('#2a180e')); R.rect(0, 120, 319, 120, hex('#5a3a22'));
  // el suelo de madera oscura
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y - 128) % 7 === 0 ? hex('#2a180e') : h(x >> 3, y, 122) < 0.15 ? hex('#4a2e1a') : hex('#5a3820'));
  // el ventanal del centro (el hueco lo pinta la escena) y el rollo de tinta de la izquierda (montañas y una grulla)
  R.rect(110, 16, 214, 96, hex('#2a180e')); R.rect(112, 18, 212, 94, 0);
  R.rect(28, 14, 62, 16, hex('#3a2416')); R.rect(30, 16, 60, 100, hex('#e8dcc0')); R.rect(30, 16, 60, 18, hex('#8a6a3a')); R.rect(30, 98, 60, 100, hex('#8a6a3a')); R.rect(26, 100, 64, 102, hex('#3a2416'));
  R.poligono([[32, 80], [42, 52], [50, 70], [54, 60], [58, 80]], hex('#8a8a8a')); R.poligono([[36, 80], [44, 62], [50, 80]], hex('#4a4a4a')); R.disco(52, 34, 4, hex('#c8283a')); R.linea(38, 40, 44, 36, K); R.linea(44, 36, 48, 40, K);
  // la puerta corredera de la derecha (la hoja la pinta la escena), el bonsái en su peana y el reloj
  R.rect(240, 30, 292, 122, hex('#2a180e')); R.rect(242, 32, 290, 122, hex('#4a3a2a'));
  caja(80, 92, 100, 122, hex('#5a3418'), hex('#7a4a28')); caja(82, 84, 98, 92, hex('#3a5a7a'), hex('#5a7a9a')); R.rect(89, 70, 91, 84, hex('#5a3a22')); R.linea(90, 76, 82, 72, hex('#5a3a22'));
  for (const [x, y, r] of [[84, 70, 6], [96, 66, 5], [90, 62, 6]]) { R.disco(x, y, r, hex('#2a5a32')); R.disco(x - 1, y - 1, r - 2, hex('#3a7a42')); }
  R.disco(226, 30, 7, K); R.disco(226, 30, 6, hex('#f6f2ec'));
};
const p4 = (t) => {
  capa('salaTokio', sala);
  // por el ventanal: Tokio al anochecer (luces que titilan), y la persiana que baja en «secret»
  R.recorte([112, 18, 212, 94]);
  for (let y = 18; y < 95; y++) for (let x = 112; x < 213; x++) R.pset(x, y, y + (h(x, y, 123) - 0.5) * 8 < 50 ? hex('#3a3a7a') : y < 74 ? hex('#7a5a8a') : hex('#d88a6a'));
  for (let x = 112; x < 213; x += 9) { const hh = 18 + Math.floor(h(x, 1, 124) * 36); R.rect(x, 95 - hh, x + 7, 94, hex('#2a2440')); for (let j = 97 - hh; j < 92; j += 4) for (let i = x + 1; i < x + 7; i += 2) if (h(i, j + Math.floor(t * 0.5), 125) < 0.35) R.pset(i, j, hex('#f0c870')); }
  const persiana = tramo(t, P4 + 0.3, secreto + 0.2), py = Math.round(lerp(18, 90, persiana));
  for (let y = 18; y < py; y++) R.rect(112, y, 212, y, y % 4 === 0 ? hex('#a89878') : hex('#d8ccb0'));
  R.recorte(null);
  R.rect(160, 18, 162, 94, hex('#2a180e')); R.linea(206, 18, 206, py + 6, hex('#8a7a5a')); R.disco(206, py + 7, 1, hex('#c8a040'));
  // las agujas del reloj
  R.linea(226, 30, 226 + Math.round(Math.sin(t * 0.4) * 4), 30 - Math.round(Math.cos(t * 0.4) * 4), K); R.linea(226, 30, 229, 31, K);
  // la puerta corredera: un curioso asoma y el ejecutivo se la cierra en «secret»
  const cierra = tramo(t, secreto - 0.2, secreto + 0.3), hueco = Math.round(lerp(22, 0, cierra));
  if (hueco > 0) { R.recorte([242, 32, 242 + hueco, 122]); R.actor(TS.publico, 246, 122, t, { dir: -1, sorpresa: t > secreto - 0.3, pal: { C: hex('#2a3450'), c: hex('#1e263c') } }); R.recorte(null); }
  R.rect(242 + hueco, 32, 290, 122, hex('#ece6d6')); for (let x = 242 + hueco; x < 290; x += 12) R.rect(x, 32, x + 1, 122, hex('#3a2416')); for (let y = 32; y < 122; y += 15) R.rect(242 + hueco, y, 290, y + 1, hex('#3a2416'));
  // los dos, detrás de la mesa: el ejecutivo levanta el paño en «launch»; Rogers se asombra en «handheld» y salta
  const quita = tramo(t, lanzar - 0.1, bolsillo + 0.15), alcanza = tramo(t, lanzar - 0.8, lanzar - 0.1);
  const px = Math.round(lerp(160, 252, quita)), hx = alcanza < 1 ? Math.round(lerp(204, 190, alcanza)) : Math.min(212, px + 30), hy = alcanza < 1 ? Math.round(lerp(140, 156, alcanza)) : 156;
  const re = R.actor(TS.ejecutivoNintendo, 200, 158, t, { dir: -1, habla: (t > P4 && t < secreto + 0.4) || t > consola + 0.6, dedo: t > secreto - 0.1 && t < lanzar - 0.9, sonrisa: t > consola, sostiene: t > lanzar - 0.8 && t < bolsillo + 0.3 ? [hx, hy] : false });
  const salta = t > consola + 0.5 && t < consola + 1.5 ? Math.round(Math.abs(Math.sin((t - consola - 0.5) * 9)) * 4) : 0;
  R.actor(TS.rogers, 110, 158, t, { dir: 1, sorpresa: t > bolsillo - 0.05 && t < consola + 0.5, sonrisa: t > consola + 0.5, habla: t > P4 && t < secreto - 0.2, salto: salta, dedo: t > consola + 1.5 });
  // la mesa de reuniones lacada, por delante: tablero, canto y los tés
  R.poligono([[40, 150], [280, 150], [296, 172], [24, 172]], K); for (let y = 151; y < 172; y++) { const xa = Math.round(40 - (y - 150) * 0.7), xb = Math.round(280 + (y - 150) * 0.7); for (let x = xa; x <= xb; x++) R.pset(x, y, (x * 3 + y * 5) % 37 === 0 ? hex('#5a2a1a') : h(x >> 2, y, 126) < 0.1 ? hex('#3a160e') : hex('#4a1e12')); }
  R.rect(22, 172, 298, 175, hex('#6a2e1a')); R.rect(22, 172, 298, 172, hex('#8a4a2a')); R.rect(22, 176, 298, 179, hex('#2a0e08'));
  for (let x = 60; x < 260; x += 40) tinte(x, 153, hex('#ffffff'), 0.4);
  // las carpetas, el bloc con su pluma y las tarjetas de visita sobre la mesa
  for (const [x, y, c] of [[40, 160, '#2a4a7a'], [270, 158, '#c8a870']]) { R.poligono([[x, y], [x + 18, y - 1], [x + 20, y + 8], [x + 2, y + 9]], K); R.poligono([[x + 1, y + 1], [x + 17, y], [x + 19, y + 7], [x + 3, y + 8]], hex(c)); }
  R.poligono([[92, 160], [110, 158], [112, 166], [94, 168]], hex('#f2eee2')); R.linea(94, 162, 108, 160, hex('#8a8478')); R.linea(113, 168, 122, 160, hex('#1a1a22'));
  for (const x of [196, 208]) { R.rect(x, 164, x + 8, 168, K); R.rect(x + 1, 165, x + 7, 167, hex('#f6f2ec')); R.pset(x + 2, 166, hex('#c8283a')); }
  for (const [x, k] of [[76, 0], [236, 1]]) { R.rect(x - 4, 152, x + 4, 160, K); R.rect(x - 3, 153, x + 3, 159, hex('#e8e4dc')); R.rect(x - 3, 153, x + 3, 154, hex('#6a8a4a')); vapor(x, 150, t, k, 12); }
  // la consola de bolsillo gris en el centro: tapada; el paño se va con la mano del ejecutivo; se enciende en «console»
  const on = t > consola;
  PZ.consolaBolsillo(R, 160, 170, { s: 2, encendida: on, t });
  // el paño: tapa la consola y se desliza hacia la derecha por la mesa con la mano del ejecutivo; se queda arrugado allí
  PZ.consolaBolsillo(R, px, 173 - Math.round(Math.sin(quita * Math.PI) * 6), { s: 2, pano: true });
  if (on) for (let k = 0; k < 10; k++) { const a = k * 0.628 + t * 0.8, r = 34 + Math.sin(t * 4 + k) * 3; R.pset(Math.round(160 + Math.cos(a) * r), Math.round(156 + Math.sin(a) * r * 0.45), hex('#fff2a0')); }
  if (t > bolsillo && t < consola + 0.8) R.icono('!', 120, 112 - Math.round(tramo(t, bolsillo, bolsillo + 0.2) * 5), hex('#ffe890'), K, 2);
};

const efectos = [[0.4, 'viento'], [holandes, 'pop'], [juego, 'pop'], [3.5, 'coche'], [P2 + 0.1, 'publico'], [tetris, 'bip'], [anio, 'brillo'], [noPodia, 'tecleo'],
  [consiguio, 'bip'], [ventas, 'palmada'], [nintendo, 'ring'], [secreto, 'puerta'], [lanzar, 'whoosh'], [consola, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1988 });
''')
