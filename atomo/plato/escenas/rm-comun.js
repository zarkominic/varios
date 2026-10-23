// Fontanería común de las escenas del episodio 5 (rm-*.html): prepara la escena y el kit pixel-roma y conecta el
// dibujo con el renderizador. Cada escena solo describe sus planos.
//
//   import { preparar, rodar } from '/atomo/plato/escenas/rm-comun.js';
//   const { E, R, M } = await preparar('rm-salon');
//   rodar(E, R, [[0, plano1], [M('general'), plano2]], { cartela: '476', caja: (t, e) => … });
//
// Con o.cartela, la cartela ocupa de 0 a o.durCartela (1,3 s por defecto) y el primer plano empieza ahí. Atom está
// siempre en su sitio (abajo a la izquierda), salvo durante la cartela.
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';

export async function preparar(id) {
  const E = await escena(id, 'ep05');
  const R = await crearRoma(document.getElementById('lienzo'));
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
    if (!o.cartela || t > dc + 0.1) R.companero(t, e);
    R.presentar();
  }, { paso: 1 / 15 });
}

