E = {}
E['dc-inocentes'] = ('Inocentes', '''// DC-INOCENTES (frase 11), 2004, cartela «2004». Cuatro planos:
// 1. (caja) en los Archivos de 2004 se abre la caja del expediente; la mano saca el plano de la mina con sus gallinas, el
//    sello rojo le planta una «X» en «cancelled» y el «1958» en su año; el gato espía husmea el dibujo de la gallina y se
//    esconde («no chicken ever went near it»);
// 2. (inserto local: la pared con el calendario) corta en «Britain's»: la carpeta sale de la caja en «released» y la mano
//    arranca la hoja del 31 en «April»: queda el 1 y el mes 4 encendido;
// 3. (parque) corta en «and it sounded»: dos lectores en el banco bajan el periódico de la gallina y se ríen; un paseante
//    llega leyendo, saca un pollo de goma en «April Fool's», lo aprieta en «joke» y se espantan las palomas;
// 4. (sala de lectura) corta en «A spokesman»: rueda de prensa, fogonazos; el portavoz explica, levanta la mano muy serio
//    y sale el «!» en «certainly» (golpe); los periodistas pasan de la risa a la sorpresa; el gato graba con su micrófono.''', r'''
const a = (f) => en('abril', f);
const P2 = a(0.286), P3 = a(0.547), P4 = a(0.776);
const cancela = a(0.030), mil958 = a(0.063), gallina = a(0.145), cerca = a(0.189);
const suelta = a(0.357), abril = a(0.450), dosmil = a(0.478);
const absurdo = a(0.591), inocente = a(0.690), broma = a(0.734);
const explica = a(0.824), pero = a(0.925), cierto = a(0.946);
const k = hex('#1a1420'), ROJO = hex('#c8282a'), ROJOS = hex('#8a1a1e'), PAPEL = hex('#f2ecd8'), PAPELS = hex('#cfc4a4');
const AZUL = hex('#2a5a9a'), AZULL = hex('#6a9ad0'), AZULS = hex('#1c3a6a');
const h = (x, y, s = 0) => { const v = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453; return v - Math.floor(v); };

// el plano azul de la mina con sus gallinas (sin letras), de w × hh, en (x, y)
const planoMina = (x, y, w, hh, t, o = {}) => {
  const { rect, pset, linea, disco } = R;
  rect(x - 1, y - 1, x + w + 1, y + hh + 1, k); rect(x, y, x + w, y + hh, AZUL);
  for (let j = y + 2; j < y + hh; j += 4) for (let i = x + 1; i < x + w; i++) if ((i + j) % 2) pset(i, j, AZULS);
  for (let i = x + 4; i < x + w; i += 6) for (let j = y + 1; j < y + hh; j += 2) pset(i, j, AZULS);
  // la mina en corte: el depósito redondeado y la caja de la electrónica
  const mx = x + Math.round(w * 0.12), my = y + Math.round(hh * 0.3), mw = Math.round(w * 0.76), mh = Math.round(hh * 0.42);
  linea(mx + 3, my, mx + mw - 3, my, AZULL); linea(mx + 3, my + mh, mx + mw - 3, my + mh, AZULL);
  linea(mx, my + 3, mx, my + mh - 3, AZULL); linea(mx + mw, my + 3, mx + mw, my + mh - 3, AZULL);
  for (const [dx, dy] of [[1, 1], [2, 0], [0, 2]]) { pset(mx + dx, my + dy, AZULL); pset(mx + mw - dx, my + dy, AZULL); pset(mx + dx, my + mh - dy, AZULL); pset(mx + mw - dx, my + mh - dy, AZULL); }
  rect(mx + mw - 12, my + 3, mx + mw - 4, my + mh - 3, AZULS); linea(mx + mw - 12, my + 3, mx + mw - 4, my + 3, AZULL);
  // las gallinas dentro, con su comedero
  const G = T.PIEZAS_DC.gallina; if (G) for (const [gx, sx] of [[0.26, 1], [0.48, -1]]) G(R, mx + Math.round(mw * gx), my + mh - 2, { t, dir: sx, sentada: gx > 0.4 });
  rect(mx + 6, my + mh - 3, mx + 30, my + mh - 2, AZULL);
  // cotas con flechas y el «7»
  linea(mx, my + mh + 5, mx + mw, my + mh + 5, AZULL); pset(mx + 1, my + mh + 4, AZULL); pset(mx + 1, my + mh + 6, AZULL); pset(mx + mw - 1, my + mh + 4, AZULL); pset(mx + mw - 1, my + mh + 6, AZULL);
  R.numero('7', mx + Math.round(mw / 2), my + mh + 14, { centro: true, color: hex('#e8f0ff') });
  // el cajetín de rayas
  rect(x + w - 26, y + hh - 9, x + w - 3, y + hh - 3, AZULS); for (let j = y + hh - 8; j < y + hh - 3; j += 2) linea(x + w - 24, j, x + w - 6, j, AZULL);
  if (o.x > 0) {   // la «X» roja del sello, que baja y se queda
    const u = o.x, cx = x + Math.round(w / 2), cy = y + Math.round(hh / 2) - 2, r = Math.round(lerp(26, 18, Math.min(1, u * 3)));
    for (let d = -r; d <= r; d++) for (let e = -1; e <= 1; e++) { if (h(d, e, 3) < 0.12) continue; pset(cx + d, cy + d + e, ROJO); pset(cx + d, cy - d + e, ROJO); }
  }
};

// un bocadillo grande con un símbolo (escala 2), con su rabito hacia abajo a la izquierda
const burbuja = (x, y, ic, c, esc = 2) => {
  const w = ic === '!' ? 10 : 18, hh = 18; R.rect(x - w / 2 - 2, y - hh, x + w / 2 + 2, y + 1, k); R.rect(x - w / 2 - 1, y - hh + 1, x + w / 2 + 1, y, hex('#fbf8ee'));
  R.pset(x - w / 2 - 2, y + 2, k); R.pset(x - w / 2 - 3, y + 3, k); R.pset(x - w / 2 - 1, y + 1, hex('#fbf8ee'));
  R.icono(ic, ic === '!' ? x - 3 : x - 7, y - hh + 3, c, k, esc);
};
// ── 1 · la caja del expediente ─────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  const g = T.animales(R, t, { encuadre: 'archivos2004', camara: 'caja', abre: tramo(t, 1.35, 2.0) });
  // la hoja sale de la caja en la mano (de 1,9 a 2,3 s) y se posa sobre la mesa, a la izquierda
  const s = tramo(t, 1.55, cancela - 0.12), px = Math.round(lerp(130, 6, s)), py = Math.round(lerp(60, 102, s));
  planoMina(px, py, 88, 62, t, { x: tramo(t, cancela, cancela + 0.25) });
  // el sello que baja: «X» en «cancelled» y el año en «1958»
  const SE = T.PIEZAS_DC.sello;
  const golpe1 = tramo(t, cancela - 0.35, cancela) - tramo(t, cancela + 0.1, cancela + 0.45);
  const golpe2 = tramo(t, mil958 + 0.1, mil958 + 0.4) - tramo(t, mil958 + 0.55, mil958 + 0.9);
  const enX = t < mil958 + 0.3;
  const sx = enX ? 50 : 32, sy = enX ? Math.round(lerp(96, 132, golpe1)) : Math.round(lerp(126, 160, golpe2));
  if (t > cancela - 0.4 && t < mil958 + 1.0 && SE) {
    SE(R, sx, sy, { s: 2 });
    T.brazo(R, -6, sy - 2, sx - 8, sy - 21, '#5a4a6a', 1, { codo: [Math.round(sx / 2 - 6), sy - 4] });
  }
  if (t > mil958 + 0.42) {   // el «1958» estampado con su recuadro
    R.rect(10, 150, 52, 164, ROJO); R.rect(11, 151, 51, 163, PAPEL);
    R.numero('1958', 31, 161, { centro: true, color: ROJO });
  }
  // el gato espía llega por la mesa, husmea la gallina del plano y se da la vuelta en «near it»
  const va = tramo(t, gallina - 1.0, gallina + 0.1), vuelve = tramo(t, cerca + 0.2, cerca + 1.4);
  if (va > 0 && vuelve < 1) {
    const gx = Math.round(lerp(150, 114, va) + lerp(0, 80, vuelve)), anda = (va > 0 && va < 1) || vuelve > 0;
    T.gatoEspia(R, gx, 176, t, { s: 2, anda, dir: vuelve > 0 ? 1 : -1, cara: t > gallina + 0.3 ? 'travieso' : 'normal' });
    if (t > gallina && t < cerca + 0.2) burbuja(gx + 4, 138, '?', k);
  }
};

// ── 2 · el calendario de la pared (fondo local) ───────────────────────────────────────────────────────
let bufCal = null;
const fondoCal = () => {
  if (bufCal) { R.copiar(bufCal); return; }
  bufCal = R.nuevo(); const prev = R.usar(bufCal);
  const { rect, pset, linea, disco } = R;
  // la pared de enlucido crema con su textura, la moldura y el zócalo de madera
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y >> 1) * 0.6 + h(x, y, 2) * 0.4 + (y / 128) * 0.25; pset(x, y, v > 0.82 ? hex('#d8ceb4') : v > 0.55 ? hex('#ece4cc') : v > 0.2 ? hex('#e6dcc2') : hex('#f2ead4')); }
  rect(0, 0, 319, 5, hex('#cfc4a8')); rect(0, 6, 319, 7, hex('#b8ac90')); rect(0, 8, 319, 8, hex('#f6f0dc'));
  for (let y = 118; y < 128; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 118 ? hex('#3a2414') : (x + Math.floor(h(0, y) * 9)) % 37 < 2 ? hex('#4a2c18') : h(x >> 3, y, 5) > 0.5 ? hex('#7a4a2a') : hex('#6a3e22'));
  rect(0, 117, 319, 117, hex('#a89a7c'));
  // la ventana alta de guillotina (el cielo de Londres va encima, cada fotograma)
  rect(12, 14, 94, 108, hex('#f4f0e6')); rect(14, 16, 92, 106, k); rect(16, 18, 90, 104, hex('#8a9aac'));
  rect(10, 106, 96, 111, hex('#f4f0e6')); rect(10, 111, 96, 112, hex('#a89a7c'));
  // el grabado enmarcado: un barco de vela en tinta
  rect(222, 64, 270, 100, hex('#6a3e1e')); rect(224, 66, 268, 98, hex('#c89a4a')); rect(226, 68, 266, 96, hex('#efe6cc'));
  for (let x = 228; x < 265; x++) { pset(x, 90 + Math.round(Math.sin(x * 0.5)), hex('#5a5a6a')); if (x % 3 === 0) pset(x, 93, hex('#8a8a96')); }
  R.poligono([[246, 72], [246, 88], [236, 88]], hex('#4a4a5a')); R.poligono([[248, 74], [248, 88], [258, 88]], hex('#6a6a7a')); rect(234, 88, 260, 90, hex('#3a2a20'));
  for (let x = 226; x < 267; x += 2) pset(x, 68, hex('#d8ceb0'));
  // el corcho con notas de rayas y chinchetas, a la derecha
  rect(214, 18, 270, 56, hex('#5a3a1e')); for (let y = 20; y < 55; y++) for (let x = 216; x < 269; x++) pset(x, y, h(x, y, 7) > 0.6 ? hex('#a87a4a') : h(x, y, 8) > 0.4 ? hex('#c8945a') : hex('#b8844e'));
  for (const [x, y, w, c] of [[220, 24, 16, '#f6f2e0'], [240, 28, 14, '#f6e88a'], [256, 22, 11, '#f6f2e0'], [222, 40, 18, '#cfe4f6'], [246, 42, 18, '#f6f2e0']]) { rect(x, y, x + w, y + 11, hex('#8a7a5a')); rect(x, y, x + w - 1, y + 10, hex(c)); for (let j = y + 3; j < y + 10; j += 2) linea(x + 2, j, x + w - 3, j, hex('#9a9a9a')); disco(x + Math.round(w / 2), y + 1, 1, ROJO); }
  // el tablero de la mesa de lectura: roble con vetas, canto y sombra
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin((x * 0.04 + Math.sin(y * 0.3 + x * 0.01) * 1.6) + y * 0.9) * 0.5 + 0.5 + (h(x >> 2, y, 9) - 0.5) * 0.3; pset(x, y, y < 131 ? hex('#3a2010') : v > 0.8 ? hex('#a86a3a') : v > 0.45 ? hex('#8a5430') : hex('#7a4828')); }
  rect(0, 131, 319, 131, hex('#c88a54'));
  // la caja de archivo gris con sus rayas y el número, la almohadilla del sello, el lápiz y los guantes
  rect(20, 108, 92, 146, k); rect(21, 109, 91, 145, hex('#8a8e96')); rect(21, 109, 91, 114, hex('#a8acb4')); rect(86, 110, 91, 145, hex('#6a6e76'));
  for (let j = 120; j < 140; j += 4) linea(30, j, 70, j, hex('#5a5e66')); rect(30, 117, 52, 125, hex('#e8e4d8')); R.numero('11', 41, 125, { centro: true, color: k });
  rect(236, 146, 262, 156, k); rect(237, 147, 261, 155, hex('#3a3a46')); rect(239, 148, 259, 153, ROJOS);
  linea(272, 166, 306, 158, hex('#2a2a2a')); linea(272, 167, 306, 159, hex('#e8b030')); pset(306, 158, hex('#f0c8a0'));
  // la lupa
  disco(190, 168, 7, k); disco(190, 168, 6, hex('#9ab8c8')); pset(187, 165, hex('#ffffff')); pset(188, 165, hex('#ffffff')); linea(195, 173, 204, 179, hex('#3a2a1a')); linea(196, 173, 205, 179, hex('#3a2a1a'));
  // la sombra del expediente abierto sobre la mesa
  for (let y = 172; y < 176; y++) for (let x = 108; x < 180; x++) if ((x + y) % 2) pset(x, y, hex('#5a3418'));
  // la sombra de la caja sobre la mesa
  for (let y = 146; y < 150; y++) for (let x = 24; x < 98; x++) if ((x + y) % 2) pset(x, y, hex('#5a3418'));
  R.usar(prev); R.copiar(bufCal);
};
// el calendario de taco: la barra roja con «2004», la hoja con el día y la fila de los doce meses
const calendario = (t, dia, mes, x0 = 112, y0 = 24) => {
  const { rect, pset, linea } = R;
  rect(x0 - 1, y0 - 1, x0 + 89, y0 + 93, k);
  rect(x0, y0, x0 + 88, y0 + 12, ROJO); rect(x0, y0 + 11, x0 + 88, y0 + 12, ROJOS); rect(x0 + 2, y0 + 1, x0 + 86, y0 + 2, hex('#e85a50'));
  for (let i = 0; i < 9; i++) { const x = x0 + 8 + i * 9; R.disco(x, y0 + 6, 2, hex('#5a1414')); pset(x, y0 + 5, hex('#c8c8d0')); }
  // las hojas de debajo (los cantos) y la de delante
  for (let j = 0; j < 3; j++) rect(x0 + 1, y0 + 91 - j, x0 + 87, y0 + 91 - j, j % 2 ? PAPELS : hex('#e2dac2'));
  rect(x0 + 1, y0 + 13, x0 + 87, y0 + 88, PAPEL); rect(x0 + 1, y0 + 13, x0 + 87, y0 + 14, hex('#dcd2b8'));
  R.numero(String(dia), x0 + 44, y0 + 64, { centro: true, tam: 40, color: dia === 1 ? ROJO : k });
  for (let m = 0; m < 12; m++) { const x = x0 + 8 + m * 6, y = y0 + 76; rect(x, y, x + 4, y + 4, m + 1 === mes ? ROJO : hex('#bdb39a')); if (m + 1 === mes) rect(x + 1, y + 1, x + 3, y + 1, hex('#f07a6a')); }
  // el clavo y la anilla
  R.disco(x0 + 44, y0 - 4, 3, k); R.disco(x0 + 44, y0 - 4, 2, hex('#a8a8b0'));
};
const p2 = (t) => {
  fondoCal();
  const { pset, linea } = R;
  // por la ventana: el cielo gris de Londres con nubes a dos velocidades, la lluvia fina y los tejados con chimeneas
  R.recorte([16, 18, 90, 104]);
  for (let y = 18; y < 105; y++) for (let x = 16; x < 91; x++) pset(x, y, (y < 50 ? h(x >> 1, y >> 1, 4) > 0.5 : h(x >> 1, y >> 1, 4) > 0.75) ? hex('#9aa8b8') : y < 60 ? hex('#aab8c6') : hex('#b8c4d0'));
  for (const [x0, y, w, v] of [[20, 30, 30, 2.4], [70, 44, 24, 1.4], [40, 56, 20, 3.1]]) { const cx = ((x0 + t * v) % 110) + 6; R.nube(cx, y, w); }
  for (let i = 0; i < 26; i++) { const x = 16 + ((i * 29 + Math.floor(t * 60)) % 75), y = 18 + ((i * 47 + Math.floor(t * 140)) % 86); pset(x, y, hex('#d8e0ea')); pset(x - 1, y - 2, hex('#c8d2de')); }
  for (let x = 16; x < 91; x++) { const tj = 82 + Math.round(Math.abs(Math.sin(x * 0.11)) * 6) - (x > 46 && x < 60 ? 10 : 0); for (let y = tj; y < 105; y++) pset(x, y, (x + y) % 5 ? hex('#5a5462') : hex('#6a6472')); }
  for (const cx of [26, 52, 74]) { for (let y = 70; y < 84; y++) for (let x = cx; x < cx + 5; x++) pset(x, y, hex('#7a4a3a')); const hum = (t * 8 + cx) % 14; pset(cx + 2 + Math.round(Math.sin(t * 3 + cx)), 68 - Math.round(hum), hex('#d8dee6')); }
  R.recorte(null);
  linea(53, 18, 53, 104, hex('#f4f0e6')); linea(16, 60, 90, 60, hex('#f4f0e6')); linea(16, 61, 90, 61, hex('#c8c0b0'));
  // una paloma en el alféizar que picotea y se mueve
  const pg = Math.floor(t * 3) % 4 === 0, pxg = 70 + Math.round(Math.sin(t * 0.7) * 6);
  R.rect(pxg, 100, pxg + 7, 104, hex('#7a8090')); R.rect(pxg + 6, pg ? 101 : 98, pxg + 9, pg ? 103 : 100, hex('#8a90a0')); pset(pxg + 9, pg ? 103 : 99, hex('#e8a030')); pset(pxg + 8, pg ? 102 : 99, k);
  // el reloj de pared: el segundero corre
  const cx = 288, cy = 84; R.disco(cx, cy, 14, k); R.disco(cx, cy, 13, hex('#6a3e1e')); R.disco(cx, cy, 11, hex('#f8f4e6'));
  for (let m = 0; m < 12; m++) { const an = m * Math.PI / 6; pset(Math.round(cx + Math.cos(an) * 9), Math.round(cy + Math.sin(an) * 9), k); }
  linea(cx, cy, cx + 5, cy - 3, k); linea(cx, cy, cx - 1, cy - 8, k); const sg = t * Math.PI / 30 * 6; linea(cx, cy, Math.round(cx + Math.sin(sg) * 10), Math.round(cy - Math.cos(sg) * 10), ROJO);
  // el calendario: la hoja del 31 de marzo, que la mano arranca en «April»
  const arranca = tramo(t, abril - 0.1, abril + 0.9);
  calendario(t, arranca > 0 ? 1 : 31, arranca > 0 ? 4 : 3);
  if (arranca > 0 && arranca < 1) {   // la hoja del 31 que cae girando
    const u = arranca, hx = Math.round(112 + u * 120), hy = Math.round(38 + u * u * 110), w = Math.round(88 * (1 - u * 0.5)), hh = Math.round(78 * (1 - u * 0.3));
    R.poligono([[hx, hy], [hx + w, hy + Math.round(u * 20)], [hx + w - Math.round(u * 16), hy + hh + Math.round(u * 20)], [hx - Math.round(u * 10), hy + hh]], PAPELS);
    R.poligono([[hx + 1, hy + 1], [hx + w - 1, hy + 1 + Math.round(u * 20)], [hx + w - 1 - Math.round(u * 16), hy + hh - 1 + Math.round(u * 20)], [hx + 1 - Math.round(u * 10), hy + hh - 1]], PAPEL);
    R.numero('31', hx + Math.round(w / 2), hy + Math.round(hh * 0.6), { centro: true, tam: 16, color: k });
  }
  // la mano baja desde arriba, coge la esquina de la hoja y tira hacia abajo; luego se va
  const llega = tramo(t, suelta + 0.2, abril - 0.15), tira = tramo(t, abril - 0.1, abril + 0.35), vuelve = tramo(t, abril + 0.45, abril + 1.1);
  if (llega > 0 && vuelve < 1) {
    const wx = Math.round(lerp(240, 214, llega) + tira * 10 + vuelve * 30), wy = Math.round(lerp(-12, 40, llega) + tira * 22 - vuelve * 70);
    T.brazo(R, 252, -8, wx, wy, '#4a5a7a', -1, { codo: [Math.round((252 + wx) / 2 + 8), Math.round((-8 + wy) / 2)] });
  }
  // el expediente de la gallina, abierto sobre la caja
  const CP = T.PIEZAS_DC.carpeta; if (CP) CP(R, 142, 172, { s: 2, dibujo: 'gallina', abierta: true });
  // el vapor del té en su taza
  R.disco(206, 160, 7, k); R.disco(206, 160, 6, hex('#f4f0ea')); R.disco(206, 159, 4, hex('#a8643a'));
  for (let i = 0; i < 4; i++) { const v = (t * 0.9 + i * 0.25) % 1; pset(Math.round(206 + Math.sin(v * 6 + i) * 2), Math.round(152 - v * 16), hex('#f8f4ee')); }
};

// ── 3 · el parque: risas con el periódico ─────────────────────────────────────────────────────────────────────────────
// el pollo de goma amarillo (la broma de siempre), con su cresta roja; e 0–1: apretado
const polloGoma = (x, y, e = 0, dir = 1) => {
  const { rect, pset } = R, a = Math.round(e * 3);
  rect(x - 7, y - 4 + a, x + 4, y + 2, k); rect(x - 6, y - 3 + a, x + 3, y + 1, hex('#f0d040'));
  rect(x - 6, y - 3 + a, x + 3, y - 2 + a, hex('#f8e880')); rect(x - 6, y, x + 3, y + 1, hex('#c8a020'));
  const cx = x + dir * 4; rect(cx - 2, y - 9 + a, cx + 2, y - 4 + a, k); rect(cx - 1, y - 8 + a, cx + 1, y - 5 + a, hex('#f0d040'));
  pset(cx, y - 10 + a, ROJO); pset(cx - 1, y - 10 + a, ROJO); pset(cx + dir * 3, y - 6 + a, hex('#e87a20')); pset(cx + dir * 2, y - 6 + a, hex('#e87a20')); pset(cx + dir, y - 7 + a, k);
};
// el periódico abierto que se lee con las dos manos: rayas de columnas y la foto de la gallina
const periodico = (x, y, dir = 1) => {
  const { rect, pset, linea } = R; rect(x - 10, y - 8, x + 10, y + 6, k); rect(x - 9, y - 7, x + 9, y + 5, hex('#ecebe2'));
  rect(x - 9, y - 7, x + 9, y - 5, hex('#3a3a46')); linea(x, y - 4, x, y + 5, hex('#b8b6aa'));
  const fx = dir > 0 ? x + 2 : x - 8; rect(fx, y - 3, fx + 6, y + 2, hex('#9ab0c8')); pset(fx + 2, y, hex('#ffffff')); pset(fx + 3, y, hex('#ffffff')); pset(fx + 3, y - 1, hex('#ffffff')); pset(fx + 4, y - 2, ROJO); pset(fx + 4, y + 1, hex('#e8a030'));
  for (let j = y - 3; j < y + 5; j += 2) linea(dir > 0 ? x - 8 : x + 1, j, dir > 0 ? x - 1 : x + 8, j, hex('#8a8a8a'));
};
const p3 = (t) => {
  // las palomas se espantan con el pollo de goma en «joke»
  const espanta = tramo(t, broma, broma + 1.2);
  T.animales(R, t, { encuadre: 'parque', furgoneta: false, espanta });
  const ri = t > absurdo, salta = (fase) => ri ? Math.max(0, Math.round(Math.sin(t * 14 + fase) * 2.5)) : 0;
  // dos lectores en el banco: leen tapados por el periódico y en «absurd» lo bajan y se ríen
  const baja = tramo(t, absurdo - 0.3, absurdo + 0.1);
  const b1 = R.actor(EL.periodistaUK, 210, 154, t, { dir: 1, sostiene: [228, Math.round(lerp(136, 146, baja))], sonrisa: ri, salto: salta(0) });
  const b2 = R.actor(EL.periodistaUK2, 236, 154, t, { dir: -1, sostiene: [232, Math.round(lerp(138, 147, baja))], sonrisa: ri, salto: salta(1.7) });
  // un paseante llega leyendo, se para, se ríe, saca el pollo de goma en «April Fool's» y lo aprieta en «joke»
  const u = tramo(t, P3 + 0.1, absurdo + 0.2), xp = Math.round(lerp(24, 112, u)), saca = t > inocente - 0.2;
  const r3 = R.actor(EL.periodista2000, xp, 164, t, { dir: 1, anda: u > 0 && u < 1, sostiene: [xp + 18, saca ? 138 : 146], sonrisa: ri, salto: u >= 1 && !saca ? salta(3.1) : 0 });
  T.animalesDelante(R, t, { encuadre: 'parque', furgoneta: false });
  periodico(b1.mano[0] - 1, b1.mano[1], 1); periodico(b2.mano[0] + 1, b2.mano[1], -1);
  if (!saca) periodico(r3.mano[0] - 2, r3.mano[1] + 2, 1);
  else { const e = Math.max(0, 1 - Math.abs(t - broma) * 4); polloGoma(r3.mano[0] + 1, r3.mano[1] + 2, e, 1); if (e > 0.3) burbuja(r3.mano[0] + 8, r3.mano[1] - 12, '!', ROJO); }
};

// ── 4 · la rueda de prensa del portavoz ─────────────────────────────────────────────────────────────────
const p4 = (t) => {
  const flash = Math.max(Math.max(0, 1 - Math.abs(t - (P4 + 0.9)) * 6), Math.max(0, 1 - Math.abs(t - explica) * 6), Math.max(0, 1 - Math.abs(t - (cierto + 0.2)) * 6));
  T.animales(R, t, { encuadre: 'archivos2004', dia: 1, mes: 4, flash, flashes: [[44, 126], [262, 120]] });
  const serio = t > pero;
  const vp = tramo(t, P4 + 0.1, P4 + 1.3);
  R.actor(EL.portavoz, Math.round(lerp(128, 156, vp)), 151, t, { dir: 1, anda: vp > 0 && vp < 1, habla: vp >= 1 && t < pero + 0.9 && Math.sin(t * 8) > 0, dedo: serio, enfado: serio && t < cierto + 1.2 });
  const ri = !serio, sp = t > cierto;
  for (const [def, x, s, d] of [[EL.periodistaUK, 26, 170, 1], [EL.periodista2000, 62, 168, 1], [EL.periodistaUK2, 252, 168, -1], [EL.archivista, 284, 170, -1]]) {
    const sx = x + (def === EL.periodistaUK ? Math.round(lerp(-30, 0, tramo(t, P4, P4 + 1.2))) : 0);
    R.actor(def, sx, s, t, { dir: d, sonrisa: ri && t > P4 + 1, sorpresa: sp, salto: ri && t > explica && t < pero ? Math.max(0, Math.round(Math.sin(t * 13 + x) * 2)) : 0, anda: def === EL.periodistaUK && t < P4 + 1.2, sostiene: def === EL.periodista2000 ? [x + 16, 146] : false });
  }
  T.animalesDelante(R, t, { encuadre: 'archivos2004' });
  // el «!» que salta encima del portavoz en «certainly»
  const e = tramo(t, cierto, cierto + 0.25);
  if (e > 0) burbuja(174, Math.round(lerp(128, 114, e)), '!', ROJO, 2);
};

const efectos = [[cancela, 'sello'], [mil958 + 0.35, 'sello'], [gallina, 'miau'], [abril + 0.05, 'papel'], [absurdo + 0.2, 'publico'], [broma, 'boing'], [broma + 0.3, 'whoosh'], [P4 + 0.9, 'flash'], [explica, 'flash'], [cierto, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '2004', efectos, año: 2004 });
''')

E['dc-sri'] = ('Stanford', '''// DC-SRI (frase 12), años setenta. Cinco planos:
// 1. (despacho, mesa) «the fear changed shape»: junto a la Luna y el cohete de juguete (el miedo de antes), una mano deja
//    caer encima la carpeta del ojo con ondas;
// 2. (sala del Capitolio) corta en «Word»: en la tarima, un ayudante le susurra al general en el atril y le da la carpeta del
//    ojo en «Soviets»; en «psychic powers» la levanta ante la sala y sale el bocadillo del ojo; fogonazos;
// 3. (mapa de EE. UU.) corta en «So»: la ruta del dinero sale de Washington y cruza el país con la bolsa; la chincheta cae
//    en Stanford, California;
// 4. (laboratorio del SRI) corta en «where»: Ingo Swann, con los ojos cerrados en el cuarto aislado, dibuja; sueña con una
//    isla lejana; los científicos toman notas y miran el osciloscopio; el gato espía escucha encima del magnetofón;
// 5. (el dibujo) corta en «just»: el lápiz traza la isla con su torre, el «?» del mapa late y en «remote viewing» se
//    enciende el ojo con ondas.''', r'''
const s = (f) => en('sri', f);
const P2 = s(0.128), P3 = s(0.334), P4 = s(0.577), P5 = s(0.862);
const cambia = s(0.075), washington = s(0.151), sovieticos = s(0.206), psiquico = s(0.261);
const cia = s(0.347), paga = s(0.391), stanford = s(0.470), california = s(0.550);
const ingo = s(0.660), lejos = s(0.744), nunca = s(0.8186), remoto = s(0.962);
const k = hex('#1a1420');

// ── 1 · la mesa: el miedo cambia de forma ───────────────────────────────────────────────────────────────
const p1 = (t) => {
  T.carrera(R, t, { encuadre: 'despachoAF', camara: 'mesa' });
  // la carpeta del ojo llega en la mano por la derecha y cae sobre la de la Luna en «changed shape»
  // la carpeta vieja se aparta un poco antes (tiembla) y la del ojo cae de arriba en «changed shape», con un bote
  const cae = tramo(t, cambia - 0.45, cambia), bote = Math.max(0, Math.sin(tramo(t, cambia, cambia + 0.35) * Math.PI)) * 6;
  const CP = T.PIEZAS_DC.carpeta;
  if (CP && cae > 0) {
    const fy = Math.round(lerp(-50, 160, cae * cae) - bote);
    if (cae < 1) for (let j = 0; j < 4; j++) R.linea(150 + j * 16, fy - 52 - j * 3, 150 + j * 16, fy - 60 - j * 3, hex('#f8f0d8'));
    CP(R, 176 + Math.round((1 - cae) * 10), fy, { s: 3, dibujo: 'ojo' });
  }
  // el temblor del cohete de juguete cuando cae la carpeta
  if (t > cambia && t < cambia + 0.5 && Math.floor(t * 20) % 2) R.pset(128, 118, hex('#f8f0d8'));
  // el polvo que levanta al caer
  const p = tramo(t, cambia + 0.15, cambia + 0.9);
  if (p > 0 && p < 1) for (let i = 0; i < 12; i++) { const an = i * 0.52; R.pset(Math.round(176 + Math.cos(an) * (30 + p * 14)), Math.round(158 - Math.abs(Math.sin(an)) * p * 10), hex('#e8dcc0')); }
};

// un bocadillo grande con un símbolo (escala 2)
const burbuja = (x, y, ic, c, esc = 2) => {
  const w = 18, hh = 18; R.rect(x - w / 2 - 2, y - hh, x + w / 2 + 2, y + 1, k); R.rect(x - w / 2 - 1, y - hh + 1, x + w / 2 + 1, y, hex('#fbf8ee'));
  R.pset(x - w / 2 - 2, y + 2, k); R.pset(x - w / 2 - 3, y + 3, k); R.pset(x - w / 2 - 1, y + 1, hex('#fbf8ee'));
  R.icono(ic, x - 7, y - hh + 3, c, k, esc);
};
// ── 2 · una sala del Capitolio: la noticia ───────────────────────────────────────────────────────────────────────
const p2 = (t) => {
  T.guerra(R, t, { encuadre: 'capitolio' });
  // el general habla en el atril; un ayudante sube a la tarima, le susurra y le da la carpeta del ojo en «Soviets»;
  // en «psychic powers» el general la levanta ante la sala y salta el bocadillo del ojo
  const u = tramo(t, P2 + 0.1, washington + 0.6), xa = Math.round(lerp(262, 204, u)), da = t > sovieticos, alza = t > psiquico - 0.3;
  const susurra = u >= 1 && !da;
  const g = R.actor(EL.generalAF, 180, 131, t, { dir: susurra ? 1 : -1, habla: (!susurra && !da && Math.sin(t * 6) > 0.2) || (alza && Math.sin(t * 7) > 0), sostiene: da ? (alza ? [174, 98] : [178, 108]) : false, sorpresa: susurra || (da && !alza) });
  const r = R.actor(EL.ingenieroCIA, xa, 131, t, { dir: -1, anda: u > 0 && u < 1, sostiene: !da ? [xa - 2, 113] : false, habla: susurra && Math.sin(t * 9) > 0, dedo: da && t < psiquico });
  T.guerraDelante(R, t, { encuadre: 'capitolio' });
  const CP = T.PIEZAS_DC.carpeta;
  if (CP) { if (!da) CP(R, r.mano[0] - 2, r.mano[1] + 8, { s: 1, dibujo: 'ojo' }); else CP(R, g.mano[0] - 9, g.mano[1] + 7, { s: 1, dibujo: 'ojo' }); }
  if (t > psiquico) burbuja(196, Math.round(lerp(92, 84, tramo(t, psiquico, psiquico + 0.25))), 'ojo', hex('#7a4aa8'));
};

// ── 3 · el mapa: el dinero viaja a California ───────────────────────────────────────────────────────────
const LUG = { washington: [-77.04, 38.90], sri: [-122.18, 37.45] };
const p3 = (t) => {
  const P = T.mapa(R, t, { zona: 'eeuu' });
  const [wx, wy] = P(LUG.washington), [sx, sy] = P(LUG.sri);
  T.chincheta(R, Math.round(wx), Math.round(wy), t, T.C.azul ?? hex('#3a6ad8'), { baja: tramo(t, P3 + 0.1, P3 + 0.5) });
  const pts = [[wx, wy - 4], [(wx + sx) / 2, Math.min(wy, sy) - 34], [sx, sy - 4]].map(([x, y]) => [Math.round(x), Math.round(y)]);
  // una curva de Bézier en puntos, para la ruta
  const curva = []; for (let i = 0; i <= 24; i++) { const v = i / 24; curva.push([Math.round((1 - v) ** 2 * pts[0][0] + 2 * v * (1 - v) * pts[1][0] + v * v * pts[2][0]), Math.round((1 - v) ** 2 * pts[0][1] + 2 * v * (1 - v) * pts[1][1] + v * v * pts[2][1])]); }
  const u = tramo(t, cia, stanford);
  if (u > 0) R.ruta(curva, u, R.PALA.VERDE ? R.PALA.VERDE[3] : hex('#3a8a3a'));
  // la bolsa del dinero que viaja por la ruta y rebota al llegar
  if (u > 0) { const i = Math.min(24, Math.round(u * 24)), [bx, by] = curva[i], bote = u >= 1 ? Math.round(Math.abs(Math.sin((t - stanford) * 9)) * 3 * Math.max(0, 1 - (t - stanford))) : 0;
    R.icono('bolsa', bx - 7, by - 20 - bote, hex('#c8a040'), k, 2); }
  T.chincheta(R, Math.round(sx), Math.round(sy), t, hex('#c8282a'), { baja: tramo(t, stanford - 0.2, stanford + 0.25), pulso: t > california });
  // en «California» se enciende el ojo con ondas sobre la chincheta
  const e = tramo(t, california - 0.2, california + 0.3);
  if (e > 0) burbuja(Math.round(sx) + 22, Math.round(sy) - Math.round(lerp(10, 16, e)), 'ojo', hex('#7a4aa8'));
};

// ── 4 · el laboratorio del SRI: Ingo Swann dibuja con los ojos cerrados ─────────────────────────────────
const p4 = (t) => {
  T.psiquicos(R, t, { encuadre: 'sri', sesion: true });
  const lapiz = Math.sin(t * 9) * 3;
  R.recorte([58, 58, 158, 118]);
  const sw = R.actor(EL.swann, 104, 124, t, { dir: 1, parpadea: true, sostiene: [124 + Math.round(lapiz), 110 + Math.round(Math.cos(t * 7))] });
  R.recorte(null);
  // los científicos: uno apunta en su tablilla, el otro mira el osciloscopio y señala en «faraway»
  const cs = R.actor(EL.cientificoSRI, 198, 162, t, { dir: -1, sostiene: [194, 141], habla: t > lejos && t < nunca && Math.sin(t * 7) > 0 });
  const ida = tramo(t, P4 + 0.2, P4 + 1.2), vuelta = tramo(t, ingo + 0.6, lejos - 0.2), x2 = Math.round(lerp(214, 236, ida) - lerp(0, 22, vuelta));
  R.actor(EL.cientificoSRI2, x2, 162, t, { dir: ida > 0 && vuelta === 0 ? 1 : -1, anda: (ida > 0 && ida < 1) || (vuelta > 0 && vuelta < 1), dedo: (t > ingo - 0.2 && t < ingo + 0.5) || (t > lejos - 0.2 && t < nunca + 0.4), sorpresa: t > nunca && t < nunca + 0.8 });
  { const [mx, my] = cs.mano, ap = Math.floor(t * 3) % 3 === 0 ? 1 : 0; R.rect(mx - 8, my - 6, mx, my + 4, k); R.rect(mx - 7, my - 5, mx - 1, my + 3, hex('#f2ecd8')); R.rect(mx - 6, my - 7, mx - 2, my - 6, hex('#8a8a96')); for (let j = my - 3; j < my + 3; j += 2) R.linea(mx - 6, j, mx - 2 - ap, j, hex('#6a6a7a')); }
  T.gatoEspia(R, 258, 92, t, { cara: t > lejos ? 'travieso' : 'normal' });
  T.psiquicosDelante(R, t, { encuadre: 'sri', sesion: true });
  // la nube del pensamiento: una isla lejana con su torre, dentro de la ventana
  const nb = tramo(t, lejos - 0.4, lejos + 0.3);
  if (nb > 0) {
    R.recorte([58, 58, 158, 118]);
    const cx = 140, cy = 76; R.disco(122, 98, 2, k); R.disco(122, 98, 1, hex('#f8f4ea')); R.disco(129, 92, 3, k); R.disco(129, 92, 2, hex('#f8f4ea'));
    R.disco(cx, cy, Math.round(16 * nb) + 1, k); R.disco(cx, cy, Math.round(16 * nb), hex('#f8f4ea'));
    if (nb > 0.8) { R.disco(cx, cy + 3, 13, hex('#6ab0d8')); for (let i = 0; i < 9; i++) R.pset(cx - 11 + i * 3, cy + 9 + (i % 2), hex('#e8f4ff'));
      R.disco(cx, cy + 6, 6, hex('#c8a860')); R.disco(cx - 2, cy + 4, 3, hex('#5a9a4a'));
      R.rect(cx + 1, cy - 9, cx + 3, cy + 3, hex('#5a5a6a')); R.rect(cx + 2, cy - 8, cx + 2, cy + 2, hex('#8a8a9a')); if (Math.floor(t * 4) % 2) R.pset(cx + 2, cy - 10, hex('#f8d040')); }
    R.recorte(null);
  }
};

// ── 5 · el dibujo que se hace solo ──────────────────────────────────────────────────────────────────────
const p5 = (t) => {
  const g = T.psiquicos(R, t, { encuadre: 'sri', camara: 'dibujo', trazo: tramo(t, P5 + 0.1, remoto), lapiz: false });
  if (g && g.punta) {   // la mano de Swann con su lápiz amarillo: la punta en el trazo
    const [px, py] = g.punta.map(Math.round);
    T.mano(R, px + 13, py - 9, -1, '#c8742a', { sinManga: true });
    R.linea(px, py, px + 9, py - 11, k); R.linea(px + 1, py, px + 10, py - 11, hex('#e8b030')); R.linea(px + 1, py - 1, px + 10, py - 12, hex('#f8d060')); R.pset(px, py, hex('#3a3a3a'));
  }
  const e = tramo(t, remoto - 0.1, remoto + 0.3);
  if (e > 0) { const cx = 204, cy = 50, r0 = Math.round(8 + e * 4); R.disco(cx, cy, r0 + 1, k); R.disco(cx, cy, r0, hex('#f8f4ea')); R.icono('ojo', cx - 7, cy - 7, hex('#7a4aa8'), k, 2);
    for (let r = r0 + 3; r < r0 + 3 + e * 9; r += 3) for (let an = 0; an < 6.28; an += 0.22) if ((Math.floor(an * 5) + Math.floor(t * 8)) % 2) R.pset(Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r), hex('#9a6ac8')); }
};

const efectos = [[cambia + 0.12, 'papel'], [sovieticos, 'papel'], [psiquico, 'publico'], [cia, 'whoosh'], [stanford, 'toc'], [california, 'brillo'], [P4 + 1.2, 'interruptor'], [lejos, 'pop'], [P5 + 0.2, 'lapiz'], [remoto, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 1972 });
''')
