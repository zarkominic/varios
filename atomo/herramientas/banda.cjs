// Uso: node herramientas/banda.cjs <carpeta_linea> <escenas.json>
// Banda sonora con emoción, escena a escena (desde el episodio 10). Escribe <carpeta_linea>/musica.wav y musica-banda.json;
// con este último, montar-largo.sh la mezcla a su nivel (sin el 0,2 de musica.py) y con un compresor más suave.
// - Cada escena de escenas.json lleva su «animo»:
//   - suspense: bordón grave que se abre y crece hasta el final de la escena, con un latido que se acelera;
//   - misterio: colchón suave y un motivo de caja de música con eco;
//   - intriga: pulso grave en corcheas y tictac de madera, muy bajo;
//   - cierre: colchón cálido que cambia de acorde, con la caja de música al final.
// - «golpes»: nombres de marcas (p. ej. «objeto_fin»). La música se corta justo antes, entra un golpe grave en el silencio
//   y vuelve poco a poco. Es la versión C del gancho del episodio 10 (25/10/2026), la que se eligió.
// - Todo en La menor, para que los cambios de escena casen. Cada capa se normaliza a su nivel (NIVEL, dB RMS): con la voz
//   a −19 dB, la música queda entre 7 y 12 dB por debajo cuando no habla nadie, y más baja aún bajo la voz.
const fs = require('fs');
const path = require('path');
const { SR, Bus, rng, reverb } = require('./sonido/dsp.cjs');
const I = require('./sonido/instruments.cjs');
const MIX = require('./sonido/mix.cjs');

const dir = path.resolve(process.argv[2]);
const linea = JSON.parse(fs.readFileSync(path.join(dir, 'linea.json'), 'utf8'));
const plan = Object.fromEntries(JSON.parse(fs.readFileSync(process.argv[3], 'utf8')).escenas.map((e) => [e.id, e]));
const dur = linea.duracion, n = Math.ceil(dur * SR);
const NIVEL = { suspense: -26, misterio: -28, intriga: -30, cierre: -26, golpe: -17 };
const FUNDIDO = 1.5;   // s de fundido entre escenas

const rms = (b, i0, i1) => { i1 = Math.min(i1, b.n); let s = 0; for (let i = i0; i < i1; i++) s += b.L[i] ** 2 + b.R[i] ** 2; return 10 * Math.log10(s / (2 * Math.max(1, i1 - i0)) + 1e-20); };
const pad = (bus, notas, t0, d, o = {}) => notas.forEach(([m, g]) => { const a = I.padNote(m, d, o); bus.addStereo(a.L, a.R, t0, g); });

// Una capa por escena, normalizada a su nivel y con fundidos de entrada y salida
function capa(esc, animo) {
  const t0 = Math.max(0, esc.inicio - FUNDIDO / 2), d = esc.duracion + FUNDIDO, b = new Bus(n), r = rng(esc.inicio * 1000 | 0);
  if (animo === 'suspense') {
    pad(b, [[33, 1], [40, 0.6], [45, 0.35]], t0, d, { cutoff: 450, attack: Math.min(3, d / 3), release: 0.6 });
    for (let i = Math.round(t0 * SR), i1 = Math.min(n, Math.round((t0 + d) * SR)); i < i1; i++) {   // crece hasta el final
      const k = 0.25 + 0.75 * ((i / SR - t0) / d) ** 1.6; b.L[i] *= k; b.R[i] *= k;
    }
    if (esc.duracion > 7)
      for (let t = esc.inicio + esc.duracion * 0.35, p = 1.15; t < esc.inicio + esc.duracion - 0.8; t += p, p = Math.max(0.7, p * 0.96))
        b.addMono(I.heartbeat(), t, 0.35, 0);
  } else if (animo === 'misterio') {
    pad(b, [[45, 0.6], [52, 0.4], [57, 0.3], [59, 0.18]], t0, d, { cutoff: 900, attack: 2, release: 1.5 });
    const motivo = [69, 72, 76, 75, 69, 72, 76, 74];
    for (let t = esc.inicio + 0.4, k = 0; t < esc.inicio + esc.duracion - 1; t += 0.75, k++) {
      if (Math.floor(k / 8) % 2) continue;   // ocho notas y ocho de silencio
      b.addMono(I.musicBox(motivo[k % 8] + 12), t, 0.5, k % 2 ? 0.3 : -0.3);
    }
  } else if (animo === 'intriga') {
    pad(b, [[38, 0.5], [45, 0.3], [53, 0.2]], t0, d, { cutoff: 700, attack: 1.5, release: 1 });
    for (let t = esc.inicio, k = 0; t < esc.inicio + esc.duracion; t += 60 / 92 / 2, k++) {
      b.addMono(I.pluck ? I.pluck(k % 8 < 6 ? 38 : 41, { decay: 0.18 }) : I.woodTick(0.5), t, 0.35, 0);
      if (k % 4 === 2) b.addMono(I.woodTick(1 + 0.05 * (k % 3)), t, 0.12, r() * 0.6 - 0.3);
    }
  } else if (animo === 'cierre') {
    const ac = [[[41, 0.5], [48, 0.35], [52, 0.3], [57, 0.25]], [[36, 0.5], [43, 0.35], [52, 0.3], [55, 0.25]], [[45, 0.5], [52, 0.35], [57, 0.3], [60, 0.25]]];
    const tramo = d / ac.length;
    ac.forEach((notas, k) => pad(b, notas, t0 + k * tramo, tramo + 0.6, { cutoff: 1400, attack: 1.2, release: 1.4 }));
    [69, 72, 76, 81].forEach((m, k) => b.addMono(I.musicBox(m + 12), esc.inicio + esc.duracion - 4 + k * 0.6, 0.4, 0));
  } else return null;
  const i0 = Math.round(Math.max(0, esc.inicio) * SR), i1 = Math.min(n, Math.round((esc.inicio + esc.duracion) * SR));
  const g = 10 ** ((NIVEL[animo] - rms(b, i0, i1)) / 20);
  const f0 = Math.round(t0 * SR), f1 = Math.min(n, Math.round((t0 + d) * SR)), fd = Math.round(FUNDIDO * SR);
  for (let i = f0; i < f1; i++) { const k = g * Math.min(1, (i - f0) / fd, (f1 - i) / fd); b.L[i] *= k; b.R[i] *= k; }
  return b;
}

const musica = new Bus(n), golpes = new Bus(n), cortes = [];
for (const esc of linea.escenas) {
  const p = plan[esc.id] || {};
  const b = p.animo && capa(esc, p.animo);
  if (b) b.mixInto(musica, 1);
  for (const marca of p.golpes || []) {
    const t = esc.inicio + esc.marcas[marca];
    cortes.push(t);
    golpes.addMono(I.subBoom(2.6, 70, 30), t + 0.1, 1, 0);
    golpes.addMono(I.timpani(33, { decay: 1.6 }), t + 0.1, 0.5, 0);
  }
}
// eco: la caja de música y los golpes respiran en una sala grande
const eco = reverb(musica, { room: 0.88 }), ecoG = reverb(golpes, { room: 0.7 });
eco.mixInto(musica, 0.35);
for (const t of cortes) {   // silencio antes del golpe y vuelta suave
  const g = 10 ** ((NIVEL.golpe - rms(golpes, Math.round((t + 0.1) * SR), Math.round((t + 1.1) * SR))) / 20);
  for (let i = Math.round((t - 0.6) * SR); i < Math.min(n, Math.round((t + 3) * SR)); i++) {
    const x = i / SR - t, k = x < -0.35 ? Math.max(0, (-0.35 - x) / 0.25) : x < 1.2 ? 0 : Math.min(1, (x - 1.2) / 1.8);
    if (i >= 0) { musica.L[i] *= k; musica.R[i] *= k; }
  }
  for (let i = Math.round((t + 0.05) * SR); i < Math.min(n, Math.round((t + 3) * SR)); i++) { golpes.L[i] *= g; golpes.R[i] *= g; ecoG.L[i] *= g; ecoG.R[i] *= g; }
}
golpes.mixInto(musica, 1); ecoG.mixInto(musica, 0.35);
MIX.fadeOut(musica, Math.max(dur - 3, ...cortes.map((t) => t + 2.5)), dur + 0.01);   // el fundido final no se come un golpe
MIX.writeWav(path.join(dir, 'musica.wav'), musica);
fs.writeFileSync(path.join(dir, 'musica-banda.json'), JSON.stringify({ animos: linea.escenas.map((e) => plan[e.id]?.animo ?? null), golpes: cortes }));
console.log(`musica.wav: ${linea.escenas.length} escenas, ${cortes.length} golpes, ${dur.toFixed(1)} s`);
