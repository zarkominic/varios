// Fontanería común de las escenas del episodio 6 (gr-*.html, la antigua Grecia). Igual que rm-comun.js (episodio 5):
// prepara la escena y el kit, dibuja la barra de tiempo arriba a la izquierda (o.año) y a Atom abajo a la izquierda.
// La barra de este episodio: las ciudades (800–480 a. C.), la edad de oro y las guerras (480–338 a. C.) y Alejandro y el
// mundo griego (338–146 a. C.).
//
//   import { preparar, rodar, acropolis } from '/atomo/plato/escenas/gr-comun.js';
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';

export async function preparar(id) {
  const E = await escena(id, 'ep06');
  const R = await crearRoma(document.getElementById('lienzo'));
  R.ambiente({ luz: { lado: 1, color: R.hex('#ffb060') }, sombra: R.PALA.CONTORNO });
  R.tramosTiempo([[-800, -480, R.PALA.ORO, 'columna'], [-480, -338, R.PALA.AZUL, 'casco'], [-338, -146, R.PALA.MORADO, 'estrella']]);
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
    const año = typeof o.año === 'function' ? o.año(t) : o.año;
    if (año != null && (!o.cartela || t > dc) && t >= (o.barraDesde ?? 0)) R.barraTiempo(t, año, { x0: 22, x1: 168, y: 5, alto: 2 });
    if (!o.cartela || t > dc + 0.1) R.companero(t, e);
    R.presentar();
  }, { paso: 1 / 15 });
}

// La Acrópolis: una colina de roca con el Partenón encima (s = escala; o.color = rampa de la roca; o.obra = 0–1 para
// verlo levantarse columna a columna; o.fuego = arde).
export function acropolis(R, cx, base, t, o = {}) {
  const { PALA, PR } = R, s = o.esc ?? 1, roca = o.roca ?? PR.ROCA;
  const w = 70 * s, h = 26 * s;
  R.poligono([[cx - w, base], [cx - w * 0.75, base - h * 0.7], [cx - w * 0.5, base - h], [cx + w * 0.55, base - h], [cx + w * 0.8, base - h * 0.6], [cx + w, base]], (x, y) => R.tone(roca, 2.4 - (y - base + h) / h * 1.2 + (x < cx ? 0.3 : -0.2) + (R.hash2(x >> 1, y >> 1) - 0.5) * 0.5, x, y));
  const top = base - h, obra = o.obra ?? 1;
  if (obra > 0) {
    const tw = 56 * s, th = 18 * s, rp = o.marmol ?? PALA.MARMOL, n = 8;
    R.rect(cx - tw / 2 - 2, top - 3, cx + tw / 2 + 2, top, rp[2]);
    const cols = Math.round(n * Math.min(1, obra * 1.4));
    for (let i = 0; i < cols; i++) { const x = Math.round(cx - tw / 2 + 2 + i * (tw - 4) / (n - 1)); for (let y = top - 3 - th; y < top - 3; y++) { R.pset(x - 1, y, rp[3]); R.pset(x, y, rp[2]); R.pset(x + 1, y, rp[1]); } }
    if (obra > 0.7) { R.rect(cx - tw / 2, top - 6 - th, cx + tw / 2, top - 3 - th, rp[3]); R.poligono([[cx - tw / 2 - 1, top - 6 - th], [cx, top - 6 - th - tw * 0.18], [cx + tw / 2 + 1, top - 6 - th]], (x, y) => R.tone(rp, 3, x, y)); }
    if (obra < 1) { for (let k = 0; k < 3; k++) R.linea(Math.round(cx + tw / 2 + 4 + k * 5), top, Math.round(cx + tw / 2 + 4 + k * 5), Math.round(top - th - 8), PR.MADERA[2]); R.linea(Math.round(cx + tw / 2 + 2), Math.round(top - th - 6), Math.round(cx + tw / 2 + 16), Math.round(top - th - 6), PR.MADERA[2]); }
  }
  if (o.fuego) for (let k = 0; k < 14; k++) { const x = cx - w * 0.5 + k * w / 14, hh = (6 + 10 * R.hash2(k, Math.floor(t * 12))) * s; R.linea(Math.round(x), top - 2, Math.round(x), Math.round(top - 2 - hh), k % 2 ? PALA.ANTORCHA[3] : PALA.ANTORCHA[2]); }
}
