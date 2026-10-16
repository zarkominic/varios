// Dibujos de la pizarra (SVG con estilo de tiza). Cada escena del guion
// indica qué dibujo mostrar con su campo "pizarra".
const W = 340;
const H = 240;
const f = (n) => n.toFixed(1);
const retraso = (i) => `style="--d:${(i * 0.22).toFixed(2)}s"`;

const lienzo = (cuerpo, defs = '') =>
  `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${defs}${cuerpo}</svg>`;

const trazo = (d, clase, i, extra = '') =>
  `<path class="trazo ${clase}" pathLength="1" ${retraso(i)} d="${d}" ${extra}/>`;

const texto = (x, y, contenido, { clase = '', tam = 22, i = 0, peso = 400 } = {}) =>
  `<text class="tiza aparece ${clase}" ${retraso(i)} x="${x}" y="${y}" font-size="${tam}" font-weight="${peso}">${contenido}</text>`;

const circulo = (cx, cy, r, clase, i) =>
  trazo(`M${f(cx - r)} ${f(cy)} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0`, clase, i);

function flecha(x1, y1, x2, y2, clase, i) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const L = 9;
  const h1 = [x2 - L * Math.cos(a - 0.5), y2 - L * Math.sin(a - 0.5)];
  const h2 = [x2 - L * Math.cos(a + 0.5), y2 - L * Math.sin(a + 0.5)];
  return (
    trazo(`M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)}`, clase, i) +
    trazo(`M${f(h1[0])} ${f(h1[1])} L${f(x2)} ${f(y2)} L${f(h2[0])} ${f(h2[1])}`, clase, i + 0.8)
  );
}

function onda(x0, x1, yc, amp, lambda) {
  let d = `M${x0} ${yc}`;
  for (let x = x0 + 2; x <= x1; x += 2) {
    d += ` L${x} ${f(yc - amp * Math.sin(((x - x0) / lambda) * 2 * Math.PI))}`;
  }
  return d;
}

function rayos(cx, cy, r1, r2, n, clase, i) {
  let d = '';
  for (let k = 0; k < n; k++) {
    const a = (k / n) * Math.PI * 2;
    d += `M${f(cx + r1 * Math.cos(a))} ${f(cy + r1 * Math.sin(a))} L${f(cx + r2 * Math.cos(a))} ${f(cy + r2 * Math.sin(a))} `;
  }
  return trazo(d, clase, i);
}

export const PIZARRAS = {
  pregunta: () =>
    lienzo(
      circulo(282, 62, 20, 'amarillo', 0) +
        rayos(282, 62, 28, 40, 10, 'amarillo', 0.6) +
        texto(24, 92, '¿Por qué', { tam: 36, i: 1 }) +
        texto(24, 142, 'el cielo es', { tam: 36, i: 2 }) +
        texto(24, 200, 'azul?', { tam: 52, i: 3, peso: 700, clase: 'azul' }) +
        trazo(onda(26, 168, 216, 4, 28), 'azul', 4),
    ),

  prisma: () =>
    lienzo(
      circulo(40, 62, 16, 'amarillo', 0) +
        rayos(40, 62, 22, 31, 8, 'amarillo', 0.4) +
        trazo('M56 70 L180 122', 'tiza grueso', 1) +
        texto(26, 128, 'luz blanca', { tam: 20, i: 1.5 }) +
        trazo('M150 176 L196 92 L242 176 Z', 'tiza', 2) +
        trazo('M180 122 L219 134', 'tiza fino', 3) +
        ['rojo', 'naranja', 'amarillo', 'verde', 'azul', 'violeta']
          .map((c, k) => trazo(`M219 134 L330 ${104 + k * 18}`, `${c} grueso`, 3.5 + k * 0.25))
          .join('') +
        texto(20, 224, '= todos los colores', { tam: 22, i: 5.5 }),
    ),

  ondas: () =>
    lienzo(
      texto(22, 38, 'azul ≈ 450 nm', { tam: 22, i: 0, clase: 'azul' }) +
        trazo(onda(22, 318, 76, 15, 45), 'azul grueso', 0.6) +
        trazo('M22 98 L22 104 L67 104 L67 98', 'tiza fino', 1.6) +
        texto(74, 110, 'onda corta', { tam: 16, i: 1.8 }) +
        texto(22, 150, 'rojo ≈ 700 nm', { tam: 22, i: 2.4, clase: 'rojo' }) +
        trazo(onda(22, 318, 188, 15, 70), 'rojo grueso', 3) +
        trazo('M22 210 L22 216 L92 216 L92 210', 'tiza fino', 4) +
        texto(100, 222, 'onda larga', { tam: 16, i: 4.2 }),
    ),

  rayleigh: () => {
    const c = [167, 124];
    const azules = [-150, -110, -70, -30, 30, 70, 110, 150]
      .map((g, k) => {
        const a = (g * Math.PI) / 180;
        return flecha(c[0] + 18 * Math.cos(a), c[1] + 18 * Math.sin(a), c[0] + 62 * Math.cos(a), c[1] + 62 * Math.sin(a), 'azul', 2 + k * 0.2);
      })
      .join('');
    return lienzo(
      texto(20, 34, 'dispersión ∝ 1/λ⁴', { tam: 22, i: 0 }) +
        flecha(14, 124, 138, 124, 'tiza grueso', 0.6) +
        circulo(160, 124, 8, 'tiza', 1.4) +
        circulo(175, 124, 8, 'tiza', 1.5) +
        azules +
        flecha(186, 124, 326, 124, 'rojo grueso', 4) +
        texto(16, 226, 'azul: casi 6 × más rebotes que rojo', { tam: 18, i: 5 }),
    );
  },

  observador: () => {
    const cabeza = [170, 176];
    const flechas = [25, 50, 75, 105, 130, 155]
      .map((g, k) => {
        const a = (g * Math.PI) / 180;
        const S = [170 + 128 * Math.cos(a), 206 - 128 * Math.sin(a)];
        const dx = S[0] - cabeza[0];
        const dy = S[1] - cabeza[1];
        const L = Math.hypot(dx, dy);
        const E = [cabeza[0] + (dx / L) * 22, cabeza[1] + (dy / L) * 22];
        return circulo(S[0], S[1], 3, 'azul', 1 + k * 0.25) + flecha(S[0], S[1], E[0], E[1], 'azul', 1.2 + k * 0.25);
      })
      .join('');
    return lienzo(
      texto(20, 34, 'azul desde todas partes', { tam: 22, i: 3.2 }) +
        trazo('M35 206 A135 135 0 0 1 305 206', 'tiza tenue', 0) +
        trazo('M14 206 L326 206', 'tiza', 0.3) +
        circulo(170, 176, 9, 'tiza', 0.5) +
        trazo('M170 185 L170 198 M170 198 L163 206 M170 198 L177 206 M162 190 L178 190', 'tiza', 0.7) +
        flechas,
    );
  },

  atardecer: () => {
    const y = (x) => 170 + ((x - 36) * 16) / 126;
    const perdidos = [70, 100, 130].map((x, k) => flecha(x, y(x) - 4, x + 6, y(x) - 24, 'azul fino', 3 + k * 0.3)).join('');
    const defs =
      '<defs><linearGradient id="g-atardecer" gradientUnits="userSpaceOnUse" x1="36" y1="0" x2="162" y2="0">' +
      '<stop offset="0" stop-color="#f3f0e6"/><stop offset="0.55" stop-color="#ffb35e"/><stop offset="1" stop-color="#ff8f80"/></linearGradient></defs>';
    return lienzo(
      trazo('M0 237 A330 330 0 0 1 340 237', 'tiza', 0) +
        trazo('M0 191 A370 370 0 0 1 340 191', 'azul tenue', 0.3) +
        texto(292, 166, 'aire', { tam: 15, i: 0.6, clase: 'azul' }) +
        `<circle class="aparece" ${retraso(0.6)} cx="170" cy="185" r="5" fill="#f3f0e6"/>` +
        circulo(170, 34, 13, 'amarillo', 1) +
        flecha(170, 52, 170, 176, 'tiza', 1.4) +
        texto(190, 40, 'mediodía:', { tam: 18, i: 1.6 }) +
        texto(190, 60, 'poco aire', { tam: 18, i: 1.8 }) +
        circulo(22, 166, 12, 'naranja', 2.2) +
        trazo('M36 170 L162 186', 'grueso degradado', 2.6) +
        trazo('M154 179 L162 186 L152 189', 'rojo', 3.2) +
        perdidos +
        texto(14, 118, 'atardecer:', { tam: 18, i: 2.4 }) +
        texto(14, 138, 'mucho aire', { tam: 18, i: 2.6 }),
      defs,
    );
  },

  cierre: () =>
    lienzo(
      texto(24, 66, 'Lo que no te', { tam: 32, i: 0 }) +
        texto(24, 114, 'explicaron', { tam: 42, i: 0.8, peso: 700, clase: 'amarillo' }) +
        trazo('M26 126 C80 118 150 132 214 122', 'amarillo', 1.6) +
        texto(24, 166, 'en clase', { tam: 36, i: 2 }) +
        texto(24, 214, 'Mañana: ¿por qué el mar es salado?', { tam: 17, i: 3, clase: 'azul' }),
    ),
};
