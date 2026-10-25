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

// motor de avioneta de hélice: zumbido grave con el pulso de las palas, constante y muy bajo (ambiente)
function motor({ dur = 10 } = {}) {
  const out = buf(dur), w = rng(33), lp = new OnePole();
  let ph = 0;
  for (let i = 0; i < out.length; i++) {
    const t = i / SR; ph += 38 / SR;
    const pulso = 0.6 + 0.4 * Math.sin(TAU * ph * 2) ** 2;
    out[i] = (lp.lp(w(), 220) * 2 + Math.sin(TAU * 76 * t) * 0.25) * pulso * Math.min(1, t / 1.5, (dur - t) / 1.5);
  }
  return out;
}
// destello al sol: tres campanitas agudas que se desvanecen
function brillo() {
  const out = buf(1.6);
  [96, 100, 103].forEach((m, k) => { const b = I.bell(440 * 2 ** ((m - 69) / 12), 0.25), i0 = Math.round(k * 0.09 * SR); for (let i = 0; i < b.length && i0 + i < out.length; i++) out[i0 + i] += b[i] * 0.5; });
  return out;
}
// lápiz que garabatea y palmada en la frente
const lapiz = () => I.scribble(1.0);
const palmada = () => I.thud(180, 0.04);

// la camioneta que arranca: tres petardeos y el motor que se aleja
function arranque() {
  const out = buf(2.2), m = motor({ dur: 2.2 });
  for (let i = 0; i < out.length; i++) out[i] = m[i] * Math.max(0, 1 - i / out.length) * 1.6;
  [0.05, 0.18, 0.3].forEach((t0) => { const b = I.thud(70, 0.05), i0 = Math.round(t0 * SR); for (let i = 0; i < b.length && i0 + i < out.length; i++) out[i0 + i] += b[i]; });
  return out;
}
// la oveja que mastica papel de aluminio: crujidos cortos
function masca() { const out = buf(1.2), w = rng(41); for (let k = 0; k < 6; k++) { const i0 = Math.round(k * 0.18 * SR); for (let i = 0; i < 0.05 * SR; i++) out[i0 + i] += w() * Math.exp(-i / (0.012 * SR)) * 0.8; } return out; }
// flash de cámara de los cuarenta: chasquido y el zumbido agudo que se carga
function flash() { const out = buf(0.8), w = rng(42); let ph = 0; for (let i = 0; i < out.length; i++) { const t = i / SR; ph += (2000 + 3000 * t) / SR; out[i] = (t < 0.02 ? w() : 0) + Math.sin(TAU * ph) * 0.08 * Math.min(1, t / 0.1) * Math.exp(-t * 3); } return out; }

// pitido de radar, teléfono de los cincuenta, golpecito en el cristal, cerrojo, avalancha de papel, interruptor de la luz
const bip = () => { const out = buf(0.18); for (let i = 0; i < out.length; i++) { const t = i / SR; out[i] = Math.sin(TAU * 1320 * t) * Math.exp(-t * 18) * 0.6; } return out; };
function ring() { const out = buf(0.9); for (let i = 0; i < out.length; i++) { const t = i / SR; out[i] = (Math.sin(TAU * 900 * t) + Math.sin(TAU * 1100 * t)) * (Math.sin(TAU * 22 * t) > 0 ? 0.4 : 0.1) * Math.min(1, (0.9 - t) / 0.05); } return out; }
const toc = () => I.woodTick(2.2);
function cerrojo() { const out = buf(0.4), a = I.thud(300, 0.03), b = I.woodTick(1.6); out.set(a.subarray(0, Math.min(a.length, out.length))); const i0 = Math.round(0.12 * SR); for (let i = 0; i < b.length && i0 + i < out.length; i++) out[i0 + i] += b[i]; return out; }
function avalancha() { const out = buf(1.4), w = rng(43); for (let k = 0; k < 14; k++) { const f = I.paperFwip(0.6 + 0.4 * Math.abs(w()), 50 + k), i0 = Math.round(k * 0.06 * SR); for (let i = 0; i < f.length && i0 + i < out.length; i++) out[i0 + i] += f[i] * 0.7; } const d = I.thud(90, 0.12), i0 = Math.round(0.6 * SR); for (let i = 0; i < d.length && i0 + i < out.length; i++) out[i0 + i] += d[i]; return out; }
const interruptor = () => I.tvClick();

// café que salpica y teléfono que se cuelga
function chof() { const out = buf(0.6), w = rng(44), lp = new OnePole(); for (let i = 0; i < out.length; i++) { const t = i / SR; out[i] = lp.lp(w(), 1800) * Math.exp(-t * 9) * (t > 0.25 ? 0.4 : 1); } return out; }
function cuelga() { const out = buf(0.5), a = I.thud(140, 0.05), b = I.woodTick(0.8); out.set(a.subarray(0, Math.min(a.length, out.length))); const i0 = Math.round(0.06 * SR); for (let i = 0; i < b.length && i0 + i < out.length; i++) out[i0 + i] += b[i] * 0.6; return out; }

// el periódico que golpea el suelo del porche, un sello de goma y un maullido corto
const golpecito = () => I.thud(160, 0.04);
const sello = () => I.thud(110, 0.06);
function miau() { const out = buf(0.7); let ph = 0; for (let i = 0; i < out.length; i++) { const t = i / SR, x = t / 0.7, f = 500 + 450 * Math.sin(Math.PI * Math.min(1, x * 1.3)); ph += f / SR; const e = Math.sin(Math.PI * x); out[i] = (Math.sin(TAU * ph) * 0.6 + Math.sin(TAU * ph * 2) * 0.25 + Math.sin(TAU * ph * 3) * 0.1) * e * 0.7; } return out; }

// tecleo de máquina de escribir: golpes secos irregulares y una campanilla al final de línea
function tecleo({ dur = 3 } = {}) { const out = buf(dur), w = rng(45); for (let t = 0.05; t < dur - 0.1; t += 0.07 + 0.08 * Math.abs(w())) { const b = I.woodTick(1.6 + 0.3 * w()), i0 = Math.round(t * SR); for (let i = 0; i < b.length && i0 + i < out.length; i++) out[i0 + i] += b[i] * 0.7; } const c = I.bell(2600, 0.3), i0 = Math.round((dur - 0.4) * SR); for (let i = 0; i < c.length && i0 + i < out.length; i++) out[i0 + i] += c[i] * 0.4; return out; }

const RECETAS = {
  tecleo,
  golpecito, sello, miau,
  boom: () => I.subBoom(1.6, 60, 28),
  chof, cuelga,
  bip, ring, toc, cerrojo, avalancha, interruptor,
  jet, burbujas, zumbido, motor, brillo, lapiz, palmada, arranque, masca, flash, papel: () => I.paperFwip(0.8), tic: () => I.woodTick(1.3),
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
  pop: [-28, 0], whoosh: [-32, 0], aldea: [-35, 0], jet: [-24, 0], burbujas: [-33, 0.1], zumbido: [-31, 0],
  motor: [-36, 0], tecleo: [-33, 0.2], golpecito: [-30, 0.2], sello: [-27, 0.3], miau: [-30, 0.2], boom: [-30, 0], chof: [-30, 0.3], cuelga: [-30, 0], bip: [-33, 0.4], ring: [-30, -0.3], toc: [-30, 0.3], cerrojo: [-29, 0.4], avalancha: [-26, 0], interruptor: [-30, 0], arranque: [-30, 0.4], masca: [-33, 0.1], flash: [-31, -0.3], papel: [-31, 0], brillo: [-30, 0.2], lapiz: [-32, 0.2], palmada: [-28, -0.2], tic: [-34, 0] };
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
