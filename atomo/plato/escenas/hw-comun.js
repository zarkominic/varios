// Fontanería común de las escenas del episodio 7 (hw-*.html): prepara la escena y el kit pixel-roma de noche y conecta
// el dibujo con el renderizador. Cada escena solo describe sus planos. Igual que rm-comun.js y gr-comun.js, más los
// decorados de Halloween que se repiten (la noche, la casa con porche, la iglesia, el árbol seco, el pastel de alma).
//
//   import { preparar, rodar, noche, casa } from '/atomo/plato/escenas/hw-comun.js';
//   const { E, R, M } = await preparar('hw-hola');
//   rodar(E, R, [[0, plano1], [M('mundo'), plano2]], { cartela: '31/10', año: 2026, caja: (t, e) => … });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';

export async function preparar(id) {
  const E = await escena(id, 'ep07');
  const R = await crearRoma(document.getElementById('lienzo'));
  // de noche: la luna da por la izquierda (contraluz frío) y los personajes proyectan sombra
  luna(R);
  R.tramosTiempo([[-500, 835, R.PALA.ANTORCHA, 'fuego'], [835, 1845, R.PALA.MORADO, 'cruz'], [1845, 2026, R.NARANJA, 'calabaza']]);
  return { E, R, M: (k, d) => E.marca(k, d) };
}

export function rodar(E, R, planos, o = {}) {
  const dc = o.durCartela ?? 1.3;
  const lista = o.cartela
    ? [[0, (t) => R.cartela(Math.min(1, t / dc), o.cartela)], ...planos.map(([a, f, modo], i) => [i === 0 ? dc : a, f, modo ?? (i === 0 ? 'corte' : undefined)])]
    : planos;
  E.iniciar((t) => {
    R.secuencia(t, lista, { fundido: o.fundido ?? 0.35 });
    const e = E.energia(t);
    if (o.caja) o.caja(t, e);
    // la barra de tiempo, arriba a la izquierda, con el año de la escena (salvo en la cartela)
    const año = typeof o.año === 'function' ? o.año(t) : o.año;
    // o.barra: opciones extra de la barra (p. ej. { numero: false } para «hace unos 2000 años»), fijas o función de t
    const bo = typeof o.barra === 'function' ? o.barra(t) : o.barra;
    if (año != null && (!o.cartela || t > dc) && t >= (o.barraDesde ?? 0)) R.barraTiempo(t, año, { x0: 22, x1: 168, y: 5, alto: 2, ...(bo || {}) });
    if (!o.cartela || t > dc + 0.1) R.companero(t, e);
    R.presentar();
  }, { paso: 1 / 15 });
}

// luz de luna: contraluz frío por la izquierda y sombra (el ambiente por defecto; los interiores ponen el suyo)
export function luna(R) { R.ambiente({ luz: { lado: -1, color: R.PR.NIEVE[2] }, sombra: R.PALA.CONTORNO }); }

// la noche de Halloween: cielo estrellado con una luna enorme, colinas oscuras y murciélagos (o.murcielagos = cuántos).
// Vuelve a poner la luz de luna.
export function noche(R, t, o = {}) {
  const { PALA } = R;
  luna(R);
  R.cielo(t, { luna: o.luna ?? [262, 34, 13], hor: o.hor ?? 150, semilla: o.semilla ?? 31 });
  if (o.colinas !== false) {
    R.colinas((o.hor ?? 150) - 22, { amp: 8, luz: 0.5, rampa: [PALA.CONTORNO, PALA.PURPURA[0], PALA.PURPURA[1]], semilla: 5, hasta: o.hor ?? 150 });
    R.colinas((o.hor ?? 150) - 6, { amp: 6, luz: 0.7, rampa: [PALA.CONTORNO, PALA.MORADO[0], PALA.MORADO[1]], semilla: 9, hasta: o.hor ?? 150 });
  }
  if (o.murcielagos) R.murcielagos(t, { n: o.murcielagos, y0: 16 });
}

// casa de madera con tejado a dos aguas, porche, puerta (o.abierta 0–1) y ventanas encendidas; o.medieval: entramado
// y paja. Devuelve la x de la puerta.
export function casa(R, cx, suelo, t, o = {}) {
  const { PALA, PR } = R;
  const w = o.w ?? 34, h = o.h ?? 30, pared = o.pared ?? (o.medieval ? PALA.MARMOL : [PALA.CONTORNO, PALA.AZUL[0], PALA.AZUL[1], PALA.AZUL[2]]);
  const luz = o.luz ?? 1, top = suelo - h;
  for (let y = top; y <= suelo; y++) for (let x = cx - w; x <= cx + w; x++) {
    const tabla = !o.medieval && (y - top) % 4 === 0, viga = o.medieval && (x === cx - w || x === cx + w || y === top || (y - top) === Math.round(h / 2) || x - (cx - w) === Math.round(Math.abs(y - top - h / 2)));
    R.pset(x, y, viga ? PR.MADERA[0] : R.tone(pared, 1.1 + (x - cx) / w * -0.3 + (tabla ? -0.6 : 0), x, y));
  }
  const tej = o.medieval ? PR.PAJA : [PALA.CONTORNO, PALA.NEGRO[1], PALA.NEGRO[2], PALA.MORADO[1]];
  R.poligono([[cx - w - 5, top + 1], [cx, top - h * 0.7], [cx + w + 5, top + 1]], (x, y) => R.tone(tej, (o.medieval ? 1.6 : 1.2) - (x - cx) / w * 0.4 + ((x + y * 2) % 5 === 0 ? -0.5 : 0), x, y));
  // ventanas con luz cálida
  const ventana = (x, y) => {
    if (luz > 0) R.halo(x, y, 12, [PALA.ANTORCHA[0], PALA.ANTORCHA[1]], 0.5 * luz);
    R.rect(x - 5, y - 5, x + 5, y + 5, PR.MADERA[0]);
    const fl = 0.5 + 0.5 * Math.sin(t * 3 + x);
    R.rect(x - 4, y - 4, x + 4, y + 4, luz > 0 ? (fl > 0.2 ? PALA.ANTORCHA[3] : PALA.ANTORCHA[2]) : PALA.CONTORNO);
    R.rect(x, y - 4, x, y + 4, PR.MADERA[0]); R.rect(x - 4, y, x + 4, y, PR.MADERA[0]);
  };
  const px = cx + (o.puertaX ?? -Math.round(w * 0.45));
  ventana(cx + Math.round(w * 0.45), top + Math.round(h * 0.4));
  if (o.ventanas !== 1) ventana(px, top - Math.round(h * 0.22) + 2);
  // puerta (abierta: deja ver la luz de dentro)
  const ab = o.abierta ?? 0, dh = Math.round(h * 0.62), dw = 7;
  R.rect(px - dw, suelo - dh, px + dw, suelo, ab > 0 ? PALA.ANTORCHA[3] : PR.MADERA[0]);
  if (ab > 0) R.halo(px, suelo - dh / 2, 18, [PALA.ANTORCHA[1], PALA.ANTORCHA[2]], 0.6 * ab);
  const hoja = Math.round(dw * 2 * (1 - ab));
  if (hoja > 0) { R.rect(px - dw, suelo - dh, px - dw + hoja, suelo, o.colorPuerta ?? PALA.ROJO[1]); R.pset(px - dw + hoja - 2, suelo - dh / 2, PALA.ORO[3]); }
  // porche
  if (!o.medieval) { R.rect(cx - w - 2, suelo - 1, cx + w + 2, suelo + 2, PR.MADERA[1]); R.rect(cx - w - 2, suelo - 1, cx + w + 2, suelo - 1, PR.MADERA[3]); }
  return px;
}

// iglesia de piedra con campanario, cruz y vidrieras encendidas; o.p (0–1) la levanta desde el suelo
export function iglesia(R, cx, suelo, t, o = {}) {
  const { PALA, PR } = R;
  const s = o.esc ?? 1, w = 30 * s, h = 34 * s, tw = 9 * s, th = 66 * s, p = o.p ?? 1;
  const corte = suelo - (th + 12 * s) * p;
  const piedra = (x, y) => { const fila = Math.floor(y / 4), junta = y % 4 === 0 || (x + (fila & 1) * 3) % 7 === 0; return R.tone(PR.ROCA, (o.luz ?? 1.4) + (x - cx) / w * -0.4 + (junta ? -0.7 : 0), x, y); };
  const put = (x, y) => { if (y >= corte) R.pset(x, y, piedra(x, y)); };
  for (let y = suelo - h; y <= suelo; y++) for (let x = cx - w; x <= cx + w; x++) put(x, y);
  for (let y = suelo - h - 16 * s; y < suelo - h; y++) { const m = Math.round((y - (suelo - h - 16 * s)) * (w + 3) / (16 * s)); for (let x = cx - m; x <= cx + m; x++) if (y >= corte) R.pset(x, y, R.tone(PR.ROCA, 0.9 + (x - cx) / w * -0.4, x, y)); }
  const tx = cx + w - tw;
  for (let y = suelo - th; y <= suelo; y++) for (let x = tx - tw; x <= tx + tw; x++) put(x, y);
  for (let y = suelo - th - 14 * s; y < suelo - th; y++) { const m = Math.round((y - (suelo - th - 14 * s)) * (tw + 1) / (14 * s)); for (let x = tx - m; x <= tx + m; x++) if (y >= corte) R.pset(x, y, R.tone(PR.ROCA, 0.8, x, y)); }
  if (p < 1) return;
  // cruz en lo alto
  R.rect(tx, suelo - th - 22 * s, tx, suelo - th - 14 * s, PALA.ORO[3]); R.rect(tx - 2 * s, suelo - th - 19 * s, tx + 2 * s, suelo - th - 19 * s, PALA.ORO[3]);
  // campana que se balancea (o.campana)
  const cb = o.campana ? Math.round(Math.sin(t * 4) * 2) : 0;
  R.rect(tx - 3 * s, suelo - th + 6 * s, tx + 3 * s, suelo - th + 14 * s, PALA.CONTORNO);
  R.disco(tx + cb, suelo - th + 11 * s, 2 * s, PALA.ORO[2]);
  // vidrieras con luz
  const viv = o.encendida ?? 1;
  for (const vx of [cx - w * 0.6, cx - w * 0.15]) {
    const x = Math.round(vx), y = Math.round(suelo - h * 0.55);
    if (viv > 0) R.halo(x, y, 12 * s, [PALA.ANTORCHA[0], PALA.ANTORCHA[1]], 0.5 * viv);
    for (let yy = -7 * s; yy <= 7 * s; yy++) for (let xx = -3 * s; xx <= 3 * s; xx++) { if (yy < -4 * s && Math.hypot(xx, yy + 4 * s) > 3 * s) continue; R.pset(x + xx, y + yy, viv > 0 ? [PALA.ROJO[3], PALA.AZUL[3], PALA.AMARILLO[3], PALA.VERDE[3]][((xx + 9) >> 1) % 2 + (((yy + 9) >> 2) % 2) * 2] : PALA.CONTORNO); }
  }
  // puerta en arco
  const px = Math.round(cx + w * 0.3), ph = Math.round(14 * s);
  for (let yy = -ph; yy <= 0; yy++) for (let xx = -4 * s; xx <= 4 * s; xx++) { if (yy < -ph + 4 * s && Math.hypot(xx, yy + ph - 4 * s) > 4 * s) continue; R.pset(px + xx, suelo + yy, o.puertaAbierta ? PALA.ANTORCHA[3] : PR.MADERA[0]); }
}

// árbol seco y retorcido (siluetas de la noche); devuelve [x, y] de la rama alta
export function arbolSeco(R, x, suelo, s = 1, o = {}) {
  const c = o.color ?? R.PALA.CONTORNO;
  const rama = (x0, y0, ang, L, g, n) => {
    if (n === 0 || L < 2) return;
    const x1 = x0 + Math.sin(ang) * L, y1 = y0 - Math.cos(ang) * L;
    for (let a = -g / 2; a <= g / 2; a += 0.5) R.linea(Math.round(x0 + a), Math.round(y0), Math.round(x1 + a * 0.6), Math.round(y1), c);
    rama(x1, y1, ang - 0.5 - 0.2 * R.hash2(n, L | 0), L * 0.7, Math.max(1, g * 0.6), n - 1);
    rama(x1, y1, ang + 0.45 + 0.2 * R.hash2(L | 0, n), L * 0.66, Math.max(1, g * 0.6), n - 1);
  };
  rama(x, suelo, 0.08, 26 * s, 5 * s, 5);
  return [Math.round(x + 4 * s), Math.round(suelo - 34 * s)];
}

// pastel de alma: redondo, con una cruz marcada
export function pastel(R, x, y) {
  const { PALA } = R;
  R.disco(x, y, 3, PALA.ORO[2]); R.disco(x - 1, y - 1, 1, PALA.ORO[3]);
  R.rect(x - 2, y, x + 2, y, PALA.MARRON[1]); R.rect(x, y - 2, x, y + 2, PALA.MARRON[1]);
}

// suelo de noche (hierba o empedrado azulados por la luna)
export function sueloNoche(R, y0, o = {}) {
  const { PALA, PR } = R;
  R.suelo(y0, o.rampa ?? [PALA.CONTORNO, PALA.MORADO[0], PALA.PURPURA[0], PALA.PURPURA[1]], { luz: o.luz ?? 1.6, losas: o.losas });
}
