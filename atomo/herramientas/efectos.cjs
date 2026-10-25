// Uso: node herramientas/efectos.cjs <carpeta_linea> [--hasta segundos]
// Sintetiza los efectos de sonido de un episodio en <carpeta_linea>/efectos.wav (estéreo, 48 kHz, 32 bits).
// - Los instantes vienen de <carpeta_linea>/efectos.json, que escribe render-escenas.mjs con lo que declara cada escena.
// - Todo se genera en código con el motor de herramientas/sonido/: no hay muestras ni licencias de terceros.
// - Reglas de mezcla: los efectos son discretos. La voz de Kokoro habla a unos −19 dB RMS y cada efecto se normaliza al
//   nivel de NIVEL (dB RMS en su tramo de 0,4 s más fuerte): entre 10 y 14 dB por debajo de la voz.
// - montar-largo.sh los suma sin pasar por el compresor de la música.
const fs = require('fs');
const path = require('path');
const { SR, TAU, Bus, rng, SVF, OnePole } = require('./sonido/dsp.cjs');
const I = require('./sonido/instruments.cjs');
const MIX = require('./sonido/mix.cjs');

const dir = path.resolve(process.argv[2]);
const arg = (n, d) => (process.argv.includes(n) ? process.argv[process.argv.indexOf(n) + 1] : d);
const linea = JSON.parse(fs.readFileSync(path.join(dir, 'linea.json'), 'utf8'));
const lista = Object.values(JSON.parse(fs.readFileSync(path.join(dir, 'efectos.json'), 'utf8'))).flat();
const dur = Number(arg('--hasta', linea.duracion));
const buf = (s) => new Float32Array(Math.ceil(s * SR));

// el glugluteo del pavo: seis sílabas nasales que bajan de tono
function gluglu() {
  const out = buf(0.75), w = rng(5), bp = new SVF(), bp2 = new SVF();
  let ph = 0;
  for (let i = 0; i < out.length; i++) {
    const t = i / SR, x = t / 0.75;
    ph += (560 - 180 * x) / SR;
    const saw = 2 * (ph % 1) - 1, sil = Math.pow(Math.max(0, Math.sin(Math.PI * 9 * t)), 2);
    const s = bp.bp(saw, 1250 - 300 * x, 2.5) + bp2.bp(saw, 2600, 4) * 0.4 + w() * 0.03;
    out[i] = s * sil * Math.min(1, t / 0.01) * (1 - x) * 1.6;
  }
  return out;
}

// bocina de coche de los cincuenta: dos notas cuadradas a la vez, filtradas
function claxon({ tono = 1 } = {}) {
  const out = buf(0.4), lp = new OnePole();
  for (let i = 0; i < out.length; i++) {
    const t = i / SR, sq = (f) => (Math.sin(TAU * f * tono * t) > 0 ? 1 : -1);
    const env = Math.min(1, t / 0.015) * Math.min(1, (0.4 - t) / 0.05);
    out[i] = lp.lp(sq(392) + sq(494), 1800) * env * 0.35;
  }
  return out;
}

// dos pitidos del silbato: uno corto y otro largo
function silbato() {
  const a = I.whistle(0.16), b = I.whistle(0.45), out = buf(0.3 + b.length / SR);
  out.set(a, 0);
  out.set(b, Math.round(0.3 * SR));
  return out;
}

// un caza que pasa: rugido de ruido rosa con el filtro que sube y baja (efecto Doppler) y un retumbo grave
function jet({ dur = 2.6 } = {}) {
  const out = buf(dur), w = rng(31), bp = new SVF(), lp = new OnePole();
  let p = 0;
  for (let i = 0; i < out.length; i++) {
    const x = i / out.length, env = Math.sin(Math.PI * x) ** 1.4;
    p = 0.98 * p + 0.02 * w();
    out[i] = (bp.bp(w(), 500 + 1300 * Math.sin(Math.PI * Math.min(1, x * 1.2)), 0.7) * 0.8 + lp.lp(w(), 160) * 1.5) * env;
  }
  return out;
}
// agua que hierve: burbujas graves cada vez más seguidas sobre un rumor de agua
function burbujas({ dur = 4 } = {}) {
  const out = buf(dur), w = rng(32), lp = new OnePole();
  for (let i = 0; i < out.length; i++) { const x = i / out.length; out[i] = lp.lp(w(), 700) * 0.5 * Math.min(1, x * 3) * Math.min(1, (1 - x) * 4); }
  for (let t = 0.05; t < dur - 0.1; t += 0.03 + 0.18 * (1 - t / dur) * Math.abs(w())) {
    const b = I.pop(260 + 500 * Math.abs(w()), 40 + Math.round(t * 100)), i0 = Math.round(t * SR);
    for (let i = 0; i < b.length && i0 + i < out.length; i++) out[i0 + i] += b[i] * 0.6;
  }
  return out;
}
// zumbido grave que sube, con un temblor leve: el objeto que se eleva
function zumbido() {
  const out = buf(2.4);
  let ph = 0;
  for (let i = 0; i < out.length; i++) {
    const t = i / SR, x = t / 2.4, f = 90 * Math.pow(3.2, x) * (1 + 0.01 * Math.sin(TAU * 6 * t));
    ph += f / SR;
    out[i] = (Math.sin(TAU * ph) + 0.3 * Math.sin(TAU * ph * 2.01)) * Math.min(1, t / 0.4) * Math.min(1, (2.4 - t) / 0.15) * 0.6;
  }
  return out;
}

const RECETAS = {
  jet, burbujas, zumbido,
  gluglu,
  boing: () => I.boing(),
  claxon,
  silbato,
  vapor: () => I.noiseSweep(0.9, 5000, 2500, { q: 0.7, shape: (x) => Math.sin(Math.PI * Math.min(1, x * 3)) * (1 - x) }),
  pop: () => I.pop(1300),
  whoosh: () => I.noiseSweep(0.55, 250, 2200, { q: 0.9, pink: true }),
  // aldeas que se encienden: escala pentatónica que sube, nota a nota
  aldea: ({ k = 0 } = {}) => I.marimba(69 + [0, 2, 4, 7, 9][k % 5] + 12 * Math.floor(k / 5)),
};
// nivel (dB RMS) y posición (−1 izquierda, 1 derecha) de cada efecto; las aldeas se solapan, por eso van más bajas
const NIVEL = { gluglu: [-30, 0.3], boing: [-29, -0.2], claxon: [-31, -0.5], silbato: [-32, 0.1], vapor: [-34, 0.1],
  pop: [-28, 0], whoosh: [-32, 0], aldea: [-35, 0], jet: [-24, 0], burbujas: [-33, 0.1], zumbido: [-31, 0] };
// nivel de un efecto: el RMS de su tramo de 0,4 s más fuerte (un caza que pasa empieza en silencio y luego ruge)
const rms = (b) => {
  const n = Math.min(b.length, Math.round(0.4 * SR)), c = new Float64Array(b.length + 1);
  for (let i = 0; i < b.length; i++) c[i + 1] = c[i] + b[i] * b[i];
  let m = 0; for (let i = 0; i + n <= b.length; i += Math.round(0.05 * SR)) m = Math.max(m, c[i + n] - c[i]);
  return 10 * Math.log10(m / n + 1e-20);
};

const bus = new Bus(Math.ceil(dur * SR));
for (const [t, nombre, o] of lista) {
  if (t >= dur) continue;
  if (!RECETAS[nombre]) throw new Error(`efecto desconocido: ${nombre}`);
  const [db, pan] = NIVEL[nombre], b = RECETAS[nombre](o);
  bus.addMono(b, t, 10 ** ((db - rms(b)) / 20), nombre === 'aldea' ? -0.6 + 0.1 * o.k : o.pan ?? pan);
}
MIX.writeWav(path.join(dir, 'efectos.wav'), bus);
console.log(`efectos.wav: ${lista.filter((e) => e[0] < dur).length} efectos en ${dur.toFixed(1)} s`);
