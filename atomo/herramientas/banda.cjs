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
// - Desde el episodio 11 (26/10/2026), porque «en cada cambio de año se corta bruscamente y empieza de nuevo» (el usuario):
//   - las escenas seguidas con el mismo ánimo forman un solo tramo, que suena sin reiniciarse;
//   - un lecho grave continuo (La y Mi) suena de principio a fin, así que la música nunca se queda en silencio;
//   - los tramos se cruzan con fundidos de igual potencia de 3 s;
//   - en cada cartela de año, una transición: un soplo que crece hasta el cambio y una nota de caja de música;
//   - un golpe a menos de 3 s de una cartela no deja silencio: baja la música (al 30 %) y vuelve.
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
// subido el 25/10/2026: a −26/−30 «casi no se escucha» (el usuario), sobre todo en altavoces de móvil, que no dan los graves
const NIVEL = { suspense: -20, misterio: -21, intriga: -23, cierre: -20, golpe: -14, lecho: -29, transicion: -24 };
const FUNDIDO = 3;   // s de fundido entre tramos (de igual potencia)
const CERCA_CARTELA = 3;   // s: un golpe tan cerca de una cartela no deja silencio

const rms = (b, i0, i1) => { i1 = Math.min(i1, b.n); let s = 0; for (let i = i0; i < i1; i++) s += b.L[i] ** 2 + b.R[i] ** 2; return 10 * Math.log10(s / (2 * Math.max(1, i1 - i0)) + 1e-20); };
const pad = (bus, notas, t0, d, o = {}) => notas.forEach(([m, g]) => { const a = I.padNote(m, d, o); bus.addStereo(a.L, a.R, t0, g); });

// Una capa por tramo (escenas seguidas con el mismo ánimo), normalizada a su nivel y con fundidos de igual potencia
function capa(esc, animo) {
  const t0 = Math.max(0, esc.inicio - FUNDIDO / 2), d = esc.duracion + FUNDIDO, b = new Bus(n), r = rng(esc.inicio * 1000 | 0);
  if (animo === 'suspense') {
    pad(b, [[33, 1], [40, 0.6], [45, 0.35]], t0, d, { cutoff: 450, attack: Math.min(3, d / 3), release: 0.6 });
    // registro medio (La3, Mi4, Si4 tenso), para que el suspense se oiga también en un móvil
    pad(b, [[57, 0.32], [64, 0.22], [71, 0.12]], t0, d, { cutoff: 1500, attack: Math.min(3, d / 3), release: 0.6, seed: 4 });
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
    pad(b, [[38, 0.5], [45, 0.3], [53, 0.25], [57, 0.2], [62, 0.12]], t0, d, { cutoff: 1100, attack: 1.5, release: 1 });
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
  for (let i = f0; i < f1; i++) { const k = g * Math.sin(Math.PI / 2 * Math.min(1, (i - f0) / fd)) * Math.sin(Math.PI / 2 * Math.min(1, (f1 - i) / fd)); b.L[i] *= k; b.R[i] *= k; }
  return b;
}

const musica = new Bus(n), golpes = new Bus(n), cortes = [];
// los tramos: escenas seguidas con el mismo ánimo
const tramos = [];
for (const esc of linea.escenas) {
  const animo = (plan[esc.id] || {}).animo, ult = tramos[tramos.length - 1];
  if (ult && ult.animo === animo) ult.duracion = esc.inicio + esc.duracion - ult.inicio;
  else tramos.push({ inicio: esc.inicio, duracion: esc.duracion, animo });
}
for (const tr of tramos) { const b = tr.animo && capa(tr, tr.animo); if (b) b.mixInto(musica, 1); }
// el lecho continuo: La y Mi graves, en trozos de 30 s que se cruzan, de principio a fin
{
  const lecho = new Bus(n), TROZO = 30, CRUCE = 4;
  for (let t0 = 0, k = 0; t0 < dur; t0 += TROZO - CRUCE, k++) {
    const d = Math.min(TROZO, dur - t0 + 0.5), tmp = new Bus(n);
    pad(tmp, [[33, 0.7], [45, 0.5], [52, 0.32]], t0, d, { cutoff: 650, attack: k ? CRUCE : 2, release: CRUCE, seed: 30 + k });
    tmp.mixInto(lecho, 1);
  }
  const g = 10 ** ((NIVEL.lecho - rms(lecho, 0, n)) / 20); lecho.mixInto(musica, g);
}
// las transiciones de las cartelas de año: un soplo que crece hasta el cambio y una nota de caja de música al llegar
const cartelas = linea.escenas.filter((e) => (plan[e.id] || {}).cartela && e.inicio > 1).map((e) => e.inicio);
{
  const tr = new Bus(n);
  cartelas.forEach((t, k) => {
    tr.addMono(I.noiseSweep(1.6, 300, 2600, { q: 0.8, pink: true, shape: (x) => x ** 2 * (1 - Math.max(0, x - 0.92) / 0.08), seed: 40 + k }), t - 1.55, 0.5, 0);
    pad(tr, [[57, 0.3], [64, 0.22], [69, 0.16]], t - 1.4, 3.2, { cutoff: 1800, attack: 1.3, release: 1.6, seed: 50 + k });
    tr.addMono(I.musicBox(81), t + 0.05, 0.6, 0.2); tr.addMono(I.musicBox(76), t + 0.3, 0.4, -0.2);
  });
  if (cartelas.length) { const t = cartelas[0]; const g = 10 ** ((NIVEL.transicion - rms(tr, Math.round((t - 1.5) * SR), Math.round((t + 1.5) * SR))) / 20); tr.mixInto(musica, g); }
}
for (const esc of linea.escenas) {
  const p = plan[esc.id] || {};
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
  const suelo = cartelas.some((c) => Math.abs(c - t) < CERCA_CARTELA) ? 0.3 : 0;   // junto a una cartela, baja pero no calla
  for (let i = Math.round((t - 0.6) * SR); i < Math.min(n, Math.round((t + 3) * SR)); i++) {
    const x = i / SR - t, k0 = x < -0.35 ? Math.max(0, (-0.35 - x) / 0.25) : x < 1.2 ? 0 : Math.min(1, (x - 1.2) / 1.8), k = suelo + (1 - suelo) * k0;
    if (i >= 0) { musica.L[i] *= k; musica.R[i] *= k; }
  }
  for (let i = Math.round((t + 0.05) * SR); i < Math.min(n, Math.round((t + 3) * SR)); i++) { golpes.L[i] *= g; golpes.R[i] *= g; ecoG.L[i] *= g; ecoG.R[i] *= g; }
}
golpes.mixInto(musica, 1); ecoG.mixInto(musica, 0.35);
MIX.fadeOut(musica, Math.max(dur - 3, ...cortes.map((t) => t + 2.5)), dur + 0.01);   // el fundido final no se come un golpe
MIX.writeWav(path.join(dir, 'musica.wav'), musica);
fs.writeFileSync(path.join(dir, 'musica-banda.json'), JSON.stringify({ animos: linea.escenas.map((e) => plan[e.id]?.animo ?? null), golpes: cortes }));
console.log(`musica.wav: ${linea.escenas.length} escenas en ${tramos.length} tramos, ${cartelas.length} transiciones de año, ${cortes.length} golpes, ${dur.toFixed(1)} s`);
