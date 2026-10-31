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
//   - un golpe a menos de 3 s de una cartela no deja silencio: baja la música (al 65 %) y vuelve.
// - Desde el episodio 13 (28/10/2026), porque «la música de fondo se está repitiendo de capítulo a capítulo… no todo es
//   suspenso» (el usuario), cada episodio define su banda en escenas.json («banda», que escribe plan.py y se aprueba con el
//   guion): tono y modo, tempo, su motivo propio y una paleta de ánimos que incluye los nuevos:
//   - asombro: cuerdas que se abren y un arpegio que sube, con destellos de campana (descubrir, mirar desde arriba);
//   - aventura: ostinato de pizzicato, cuerdas graves, timbal y golpes de metal (viajes, vuelos, carreras);
//   - curiosidad: marimba juguetona con el motivo y pizzicato en el bajo (explicar cómo funciona algo, los gags);
//   - calma: piano eléctrico y colchón lentos (un respiro, la vida de antes);
//   - epico: cuerdas y metales que crecen hasta un redoble de timbal (el gran logro, la cifra enorme);
//   - ternura: guitarra en arpegio y colchón suave (personas, recuerdos, el cierre íntimo);
//   - pastoral (desde el 16): una cita de dominio público tocada por nosotros (banda.cita), con lengüeta y cuerdas.
//   Sin «banda», todo suena exactamente como antes (La menor y el motivo del 10–12), así que los episodios ya hechos no
//   cambian. Con «banda», los cuatro ánimos de siempre también van en su tono y con su motivo.
// - Todo en el mismo tono (La menor por defecto), para que los cambios de escena casen. Cada capa se normaliza a su nivel (NIVEL, en LUFS desde el 29/10/2026)
//   y un nivelador frena los picos: la música entera queda unos 4–5 LU por debajo de la voz cuando no habla nadie, y más
//   baja aún bajo la voz (montar-largo.sh la aparta con la voz como llave).
const fs = require('fs');
const path = require('path');
const { SR, Bus, rng, reverb } = require('./sonido/dsp.cjs');
const I = require('./sonido/instruments.cjs');
const MIX = require('./sonido/mix.cjs');

const dir = path.resolve(process.argv[2]);
const linea = JSON.parse(fs.readFileSync(path.join(dir, 'linea.json'), 'utf8'));
const planJson = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));
const plan = Object.fromEntries(planJson.escenas.map((e) => [e.id, e]));
// los cambios de año (cartelas): antes de uno la música no deja huecos (el control mide ±2,5 s y pide caer como mucho 7,5 dB)
const CARTELAS = linea.escenas.filter((e) => (plan[e.id] || {}).cartela && e.inicio > 1).map((e) => e.inicio);
const antesDeCartela = (t) => CARTELAS.some((c) => t > c - 3 && t < c + 0.5);
// la banda del episodio: tono (nota, en español), modo, tempo y motivo (8 notas, en semitonos sobre la tónica)
const BANDA = planJson.banda || {};
const NOTAS = { do: 0, re: 2, mi: 4, fa: 5, sol: 7, la: 9, si: 11 };
const tonoDe = (n) => { const m = String(n || 'la').toLowerCase().match(/^(do|re|mi|fa|sol|la|si)([#b♯♭]?)/); if (!m) throw new Error(`banda.tono desconocido: ${n}`); let v = NOTAS[m[1]] + (/[#♯]/.test(m[2]) ? 1 : /[b♭]/.test(m[2]) ? -1 : 0) - 9; if (v > 5) v -= 12; if (v < -6) v += 12; return v; };
const T = tonoDe(BANDA.tono);   // semitonos sobre La (entre −6 y +5, para que el grave no se vaya de registro)
const MODOS = { menor: [0, 2, 3, 5, 7, 8, 10], mayor: [0, 2, 4, 5, 7, 9, 11], dorico: [0, 2, 3, 5, 7, 9, 10], mixolidio: [0, 2, 4, 5, 7, 9, 10], lidio: [0, 2, 4, 6, 7, 9, 11] };
const MODO = MODOS[BANDA.modo || 'menor'];
if (!MODO) throw new Error(`banda.modo desconocido: ${BANDA.modo} (${Object.keys(MODOS).join(', ')})`);
const MOTIVO = BANDA.motivo || [0, 3, 7, 6, 0, 3, 7, 5];   // el de siempre: La Do Mi Re# La Do Mi Re
const TEMPO = BANDA.tempo || 96, NEGRA = 60 / TEMPO, COMPAS = 4 * NEGRA;
const TONICA = 45 + T;   // La2 por defecto
// grado k de la escala (0 = tónica), en la octava oct sobre TONICA; acorde de tres notas sobre el grado k
const grado = (k, oct = 0) => TONICA + 12 * oct + MODO[((k % 7) + 7) % 7] + 12 * Math.floor(k / 7);
const acorde = (k, oct = 0) => [grado(k, oct), grado(k + 2, oct), grado(k + 4, oct)];
const mtof = (m) => 440 * 2 ** ((m - 69) / 12);
const dur = linea.duracion, n = Math.ceil(dur * SR);
// Desde el 29/10/2026 los niveles son de sonoridad (LUFS, ponderación K y bloques de 0,4 s con puerta, como ebur128) y
// no de energía: con dB RMS, la marimba, la campana y la lengüeta sonaban hasta 4 dB más fuertes que la intriga o el
// épico, y los golpes 5 dB por encima de todo (medido en el 13–15; el usuario: «hay melodías que suenan más fuertes que
// otras»). Todos los ánimos van al mismo nivel y la música entera queda unos 3 dB más baja que en el 15 (−18,4 LUFS, casi
// lo mismo que la voz). No más: a −26/−30 dB RMS «casi no se escucha» (25/10/2026), sobre todo en el móvil.
const ANIMO = -23;
const NIVEL = { suspense: ANIMO, misterio: ANIMO, intriga: ANIMO, cierre: ANIMO, golpe: -21, lecho: -31, transicion: -25,
  asombro: ANIMO, aventura: ANIMO, curiosidad: ANIMO, calma: ANIMO, epico: ANIMO, ternura: ANIMO, pastoral: ANIMO };
const TECHO = 3;   // LU: lo que un tramo puede pasar de su nivel en un instante (un crescendo, una campana) antes de que lo frene el nivelador
const FUNDIDO = 3;   // s de fundido entre tramos (de igual potencia)
const CERCA_CARTELA = 3;   // s: un golpe tan cerca de una cartela no deja silencio

// Sonoridad ebur128 de [i0, i1): filtro K (BS.1770, a 48 kHz), bloques de 0,4 s cada 0,1 s, puertas de −70 y −10 LU
const filtroK = (x) => {
  const y = new Float32Array(x.length);
  const [b0, b1, b2, a1, a2] = [1.53512485958697, -2.69169618940638, 1.19839281085285, -1.69065929318241, 0.73248077421585];
  for (let i = 0, x1 = 0, x2 = 0, y1 = 0, y2 = 0; i < x.length; i++) { const v = b0 * x[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2; x2 = x1; x1 = x[i]; y2 = y1; y1 = v; y[i] = v; }
  for (let i = 0, x1 = 0, x2 = 0, y1 = 0, y2 = 0; i < y.length; i++) { const u = y[i], v = u - 2 * x1 + x2 + 1.99004745483398 * y1 - 0.99007225036621 * y2; x2 = x1; x1 = u; y2 = y1; y1 = v; y[i] = v; }
  return y;
};
const bloquesK = (b, i0, i1) => {
  i0 = Math.max(0, i0); i1 = Math.min(i1, b.n);
  const L = filtroK(b.L.subarray(i0, i1)), R = filtroK(b.R.subarray(i0, i1)), B = Math.round(0.4 * SR), H = Math.round(0.1 * SR), out = [];
  for (let j = 0; j + B <= L.length; j += H) { let s = 0; for (let k = j; k < j + B; k++) s += L[k] * L[k] + R[k] * R[k]; out.push([i0 + j, s / B]); }
  return out;
};
const lufs = (b, i0, i1) => {
  const bl = bloquesK(b, i0, i1).map(([, e]) => e).filter((e) => -0.691 + 10 * Math.log10(e + 1e-20) > -70);
  if (!bl.length) return -100;
  const rel = -0.691 + 10 * Math.log10(bl.reduce((a, e) => a + e, 0) / bl.length) - 10;
  const g = bl.filter((e) => -0.691 + 10 * Math.log10(e) > rel);
  return -0.691 + 10 * Math.log10(g.reduce((a, e) => a + e, 0) / g.length);
};
const rms = (b, i0, i1) => { i1 = Math.min(i1, b.n); let s = 0; for (let i = i0; i < i1; i++) s += b.L[i] ** 2 + b.R[i] ** 2; return 10 * Math.log10(s / (2 * Math.max(1, i1 - i0)) + 1e-20); };
const pad = (bus, notas, t0, d, o = {}) => notas.forEach(([m, g]) => { const a = I.padNote(m, d, o); bus.addStereo(a.L, a.R, t0, g); });

// Los ánimos nuevos (desde el 13): todos van en el tono, el modo y el tempo de la banda del episodio, por compases
const compases = (esc, t0, d, f) => { for (let c = 0, t = t0 + 0.2; t < t0 + d - 0.4; c++, t += COMPAS) f(c, t); };
const estereo = (b, x, t, g) => (x.L ? b.addStereo(x.L, x.R, t, g) : b.addMono(x, t, g, 0));
const NUEVOS = {
  asombro(b, esc, t0, d, r) {
    const prog = [0, 5, 3, 4];
    compases(esc, t0, d, (c, t) => {
      const k = prog[Math.floor(c / 2) % 4];
      if (c % 2 === 0) acorde(k, 2).forEach((m, j) => estereo(b, I.strings(m, 2 * COMPAS, { attack: 1.2, release: 1.2, bright: 0.7, seed: 3 + j }), t, 0.32 - j * 0.05));
      // el arpegio que sube: dos octavas en corcheas, del grave al agudo
      const notas = [...acorde(k, 3), ...acorde(k, 4)];
      notas.forEach((m, j) => b.addMono(I.pluck(m, { decay: 0.5, cutoff: 4200, seed: 20 + j }), t + j * NEGRA / 2, 0.22, j % 2 ? 0.35 : -0.35));
      if (c % 2 === 1) b.addMono(I.bell(mtof(grado(k + 4, 5)), 0.9, 1.4), t + 3 * NEGRA, 0.12, 0.4);
    });
  },
  aventura(b, esc, t0, d, r) {
    const prog = [0, 0, 3, 4];
    compases(esc, t0, d, (c, t) => {
      const k = prog[c % 4], [a1, , a5] = acorde(k, 1), crece = 0.6 + 0.4 * Math.min(1, (t - t0) / d);
      estereo(b, I.strings(grado(k, 0), COMPAS, { attack: 0.15, release: 0.3, bright: 0.6, seed: 5 }), t, 0.35 * crece);
      for (let j = 0; j < 8; j++) b.addMono(I.pizz([a1, a1, a5, a1, a1 + 12, a1, a5, a1][j], { seed: 7 + j }), t + j * NEGRA / 2, (j % 2 ? 0.28 : 0.4) * crece, j % 2 ? 0.25 : -0.25);
      b.addMono(I.timpani(grado(k, -1), { decay: 0.6 }), t, 0.5 * crece, 0);
      if (c % 2 === 0) estereo(b, I.brassNote(grado(k, 1) + 12, NEGRA * 0.9, { stab: true }), t, 0.22 * crece);
    });
  },
  curiosidad(b, esc, t0, d, r) {
    const prog = [0, 3, 4, 0];
    compases(esc, t0, d, (c, t) => {
      const k = prog[c % 4];
      b.addMono(I.pizz(grado(k, 0), { seed: 3 }), t, 0.45, -0.1); b.addMono(I.pizz(grado(k + 4, 0), { seed: 4 }), t + 2 * NEGRA, 0.38, -0.1);
      // el motivo del episodio en la marimba, en corcheas con huecos (un compás sí y uno a medias)
      MOTIVO.forEach((x, j) => { if (c % 2 && j > 3 && !antesDeCartela(t + j * NEGRA / 2)) return; b.addMono(I.marimba(TONICA + 24 + x + (c % 4 === 2 ? MODO[2] : 0), { decay: 0.3 }), t + j * NEGRA / 2, 0.3, j % 2 ? 0.3 : -0.3); });
      for (let j = 1; j < 8; j += 2) b.addMono(I.woodTick(1.2 + 0.1 * (j % 3)), t + j * NEGRA / 2, 0.08, r() * 0.6 - 0.3);
    });
  },
  calma(b, esc, t0, d, r) {
    const prog = [0, 3, 5, 4];
    compases(esc, t0, d, (c, t) => {
      const k = prog[c % 4];
      acorde(k, 2).forEach((m, j) => b.addMono(I.epiano(m, COMPAS * 0.9, { decay: 1.6 }), t + j * 0.04, 0.22, j - 1 ? 0.2 : -0.2));
      b.addMono(I.epiano(grado(k + 4, 3), NEGRA, { decay: 1 }), t + 2.5 * NEGRA, 0.1, 0.3);
    });
    pad(b, [[TONICA, 0.4], [TONICA + 7, 0.25]], t0, d, { cutoff: 700, attack: 2.5, release: 2 });
  },
  epico(b, esc, t0, d, r) {
    const prog = [0, 5, 3, 4];
    compases(esc, t0, d, (c, t) => {
      const k = prog[c % 4], crece = 0.45 + 0.55 * Math.min(1, (t - t0) / d);
      acorde(k, 1).forEach((m, j) => estereo(b, I.strings(m + 12, COMPAS, { attack: 0.4, release: 0.5, bright: 0.8, seed: 9 + j }), t, 0.3 * crece));
      acorde(k, 0).forEach((m, j) => estereo(b, I.brassNote(m + 12, COMPAS * 0.85, { seed: 14 + j }), t, 0.16 * crece));
      b.addMono(I.timpani(grado(k, -1), { decay: 1 }), t, 0.6 * crece, 0);
    });
    // el redoble que crece en los dos últimos compases
    for (let t = t0 + d - 2 * COMPAS - 0.4, p = 0.25; t < t0 + d - 0.5; t += p, p = Math.max(0.07, p * 0.9))
      b.addMono(I.timpani(TONICA - 12, { decay: 0.25 }), t, 0.25 + 0.4 * (1 - (t0 + d - 0.5 - t) / (2 * COMPAS)), 0);
  },
  // pastoral (desde el 16): una cita de una pieza de dominio público en banda.cita ({ notas: [[negra, dur, midi]…],
  // bajo: […], negra: s por negra, tonica_original }), tocada por nosotros: el solo con la lengüeta (I.reed), el bajo en
  // cuerdas suaves y un colchón; se traspone al tono de la banda y se repite si la escena es más larga que la frase.
  // En el 16, el «Ranz des vaches» de la obertura de Guillermo Tell de Rossini (1829), en el gancho del río.
  pastoral(b, esc, t0, d, r) {
    const C = BANDA.cita || {}, neg = C.negra || 0.9, notas = C.notas || [], bajo = C.bajo || [];
    const orig = NOTAS[String(C.tonica_original || 'sol').toLowerCase()] ?? 7;
    let tr = ((TONICA % 12) - orig + 24) % 12; if (tr > 6) tr -= 12;
    const largo = Math.max(1, ...notas.map(([x, dd]) => x + dd), ...bajo.map(([x]) => x + 1.5)) * neg, fin = t0 + d - 0.6;
    for (let t = esc.inicio + 0.4; t < fin - 1; t += largo + neg) {
      for (const [x, dd, m] of notas) { const tt = t + x * neg; if (tt > fin) break; b.addMono(I.reed(m + tr, Math.max(0.07, dd * neg * 0.97)), tt, 0.55, 0.15); }
      for (const [x, dd, m] of bajo) { const tt = t + x * neg; if (tt > fin) break; estereo(b, I.strings(m + tr, dd * neg, { attack: 0.35, release: 0.6, bright: 0.45, seed: 4 }), tt, 0.3); }
    }
    pad(b, [[TONICA + 12, 0.22], [TONICA + 19, 0.15]], t0, d, { cutoff: 900, attack: 2, release: 2 });
  },
  ternura(b, esc, t0, d, r) {
    const prog = [0, 4, 5, 3];
    compases(esc, t0, d, (c, t) => {
      const k = prog[c % 4], [a1, a3, a5] = acorde(k, 1);
      [a1 - 12, a5, a1 + 12, a3 + 12, a5, a1 + 12, a3 + 12, a5].forEach((m, j) => b.addMono(I.guitar(m, 1.2, { bright: 0.45, seed: 1 + j }), t + j * NEGRA / 2, j ? 0.3 : 0.4, j % 2 ? 0.2 : -0.2));
    });
    pad(b, [[TONICA + 12, 0.35], [TONICA + 19, 0.22]], t0, d, { cutoff: 900, attack: 2, release: 2 });
  },
};

// Una capa por tramo (escenas seguidas con el mismo ánimo), normalizada a su nivel y con fundidos de igual potencia
function capa(esc, animo) {
  const t0 = Math.max(0, esc.inicio - FUNDIDO / 2), d = esc.duracion + FUNDIDO, b = new Bus(n), r = rng(esc.inicio * 1000 | 0);
  if (animo === 'suspense') {
    pad(b, [[33 + T, 1], [40 + T, 0.6], [45 + T, 0.35]], t0, d, { cutoff: 450, attack: Math.min(3, d / 3), release: 0.6 });
    // registro medio (La3, Mi4, Si4 tenso), para que el suspense se oiga también en un móvil
    pad(b, [[57 + T, 0.32], [64 + T, 0.22], [71 + T, 0.12]], t0, d, { cutoff: 1500, attack: Math.min(3, d / 3), release: 0.6, seed: 4 });
    for (let i = Math.round(t0 * SR), i1 = Math.min(n, Math.round((t0 + d) * SR)); i < i1; i++) {   // crece hasta el final
      const k = 0.25 + 0.75 * ((i / SR - t0) / d) ** 1.6; b.L[i] *= k; b.R[i] *= k;
    }
    if (esc.duracion > 7)
      for (let t = esc.inicio + esc.duracion * 0.35, p = 1.15; t < esc.inicio + esc.duracion - 0.8; t += p, p = Math.max(0.7, p * 0.96))
        b.addMono(I.heartbeat(), t, 0.35, 0);
  } else if (animo === 'misterio') {
    pad(b, [[45 + T, 0.6], [52 + T, 0.4], [57 + T, 0.3], [59 + T, 0.18]], t0, d, { cutoff: 900, attack: 2, release: 1.5 });
    const motivo = MOTIVO.map((x) => 69 + T + x);
    for (let t = esc.inicio + 0.4, k = 0; t < esc.inicio + esc.duracion - 1; t += 0.75, k++) {
      if (Math.floor(k / 8) % 2) continue;   // ocho notas y ocho de silencio
      b.addMono(I.musicBox(motivo[k % 8] + 12), t, 0.5, k % 2 ? 0.3 : -0.3);
    }
  } else if (animo === 'intriga') {
    pad(b, [[38 + T, 0.5], [45 + T, 0.3], [53 + T, 0.25], [57 + T, 0.2], [62 + T, 0.12]], t0, d, { cutoff: 1100, attack: 1.5, release: 1 });
    for (let t = esc.inicio, k = 0; t < esc.inicio + esc.duracion; t += 60 / 92 / 2, k++) {
      b.addMono(I.pluck ? I.pluck((k % 8 < 6 ? 38 : 41) + T, { decay: 0.18 }) : I.woodTick(0.5), t, 0.35, 0);
      if (k % 4 === 2) b.addMono(I.woodTick(1 + 0.05 * (k % 3)), t, 0.12, r() * 0.6 - 0.3);
    }
  } else if (animo === 'cierre') {
    const ac = [[[41, 0.5], [48, 0.35], [52, 0.3], [57, 0.25]], [[36, 0.5], [43, 0.35], [52, 0.3], [55, 0.25]], [[45, 0.5], [52, 0.35], [57, 0.3], [60, 0.25]]].map((a) => a.map(([m, g]) => [m + T, g]));
    const tramo = d / ac.length;
    ac.forEach((notas, k) => pad(b, notas, t0 + k * tramo, tramo + 0.6, { cutoff: 1400, attack: 1.2, release: 1.4 }));
    [69, 72, 76, 81].forEach((m, k) => b.addMono(I.musicBox(m + 12 + T), esc.inicio + esc.duracion - 4 + k * 0.6, 0.4, 0));
  } else if (NUEVOS[animo]) NUEVOS[animo](b, esc, t0, d, r);
  else return null;
  const i0 = Math.round(Math.max(0, esc.inicio) * SR), i1 = Math.min(n, Math.round((esc.inicio + esc.duracion) * SR));
  const g = 10 ** ((NIVEL[animo] - lufs(b, i0, i1)) / 20);
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
    pad(tmp, [[33 + T, 0.7], [45 + T, 0.5], [52 + T, 0.32]], t0, d, { cutoff: 650, attack: k ? CRUCE : 2, release: CRUCE, seed: 30 + k });
    tmp.mixInto(lecho, 1);
  }
  const g = 10 ** ((NIVEL.lecho - lufs(lecho, 0, n)) / 20); lecho.mixInto(musica, g);
}
// las transiciones de las cartelas de año: un soplo que crece hasta el cambio y una nota de caja de música al llegar
const cartelas = CARTELAS;
{
  const tr = new Bus(n);
  cartelas.forEach((t, k) => {
    tr.addMono(I.noiseSweep(1.6, 300, 2600, { q: 0.8, pink: true, shape: (x) => x ** 2 * (1 - Math.max(0, x - 0.92) / 0.08), seed: 40 + k }), t - 1.55, 0.5, 0);
    pad(tr, [[57 + T, 0.3], [64 + T, 0.22], [69 + T, 0.16]], t - 1.4, 3.2, { cutoff: 1800, attack: 1.3, release: 1.6, seed: 50 + k });
    tr.addMono(I.musicBox(81 + T), t + 0.05, 0.6, 0.2); tr.addMono(I.musicBox(76 + T), t + 0.3, 0.4, -0.2);
  });
  if (cartelas.length) { const t = cartelas[0]; const g = 10 ** ((NIVEL.transicion - lufs(tr, Math.round((t - 1.5) * SR), Math.round((t + 1.5) * SR))) / 20); tr.mixInto(musica, g); }
}
for (const esc of linea.escenas) {
  const p = plan[esc.id] || {};
  for (const marca of p.golpes || []) {
    const t = esc.inicio + esc.marcas[marca];
    cortes.push(t);
    golpes.addMono(I.subBoom(2.6, 70, 30), t + 0.1, 1, 0);
    golpes.addMono(I.timpani(33 + T, { decay: 1.6 }), t + 0.1, 0.5, 0);
  }
}
// eco: la caja de música y los golpes respiran en una sala grande
const eco = reverb(musica, { room: 0.88 }), ecoG = reverb(golpes, { room: 0.7 });
eco.mixInto(musica, 0.35);
// el nivelador (desde el 29/10/2026): donde la sonoridad momentánea (0,4 s) pasa de ANIMO + TECHO, la baja con una
// razón de 4 a 1, con ataque de 0,2 s y suelta de 0,8 s. Frena los picos dentro de un tramo (el crescendo del épico, la
// caja de música del cierre) sin tocar lo demás. Los golpes entran después, a su nivel.
{
  const bl = bloquesK(musica, 0, n), H = Math.round(0.1 * SR), red = new Float32Array(bl.length);
  bl.forEach(([, e], k) => { const l = -0.691 + 10 * Math.log10(e + 1e-20), sobra = l - (ANIMO + TECHO); red[k] = sobra > 0 ? -sobra * 0.75 : 0; });
  for (let k = 1, v = 0; k < red.length; k++) { v = red[k] < v ? v + (red[k] - v) * 0.4 : v + (red[k] - v) * 0.12; red[k] = v; }   // ataque y suelta, a pasos de 0,1 s
  const centro = Math.round(0.2 * SR);   // el bloque k mide [k·H, k·H + 0,4 s): su ganancia va a su centro
  for (let i = 0; i < n; i++) {
    const x = (i - centro) / H, k = Math.max(0, Math.min(red.length - 1, Math.floor(x))), k2 = Math.min(red.length - 1, k + 1), f = Math.max(0, Math.min(1, x - k));
    const g = 10 ** (((red[k] || 0) * (1 - f) + (red[k2] || 0) * f) / 20);
    musica.L[i] *= g; musica.R[i] *= g;
  }
}
for (const t of cortes) {   // silencio antes del golpe y vuelta suave
  const g = 10 ** ((NIVEL.golpe - lufs(golpes, Math.round((t + 0.1) * SR), Math.round((t + 1.1) * SR))) / 20);
  const suelo = cartelas.some((c) => Math.abs(c - t) < CERCA_CARTELA) ? 0.65 : 0;   // junto a una cartela, baja pero no calla (al 30 % caía 13 dB en el 13 y a la mitad 8,9: el control pide 7,5 como mucho)
  for (let i = Math.round((t - 0.6) * SR); i < Math.min(n, Math.round((t + 3) * SR)); i++) {
    const x = i / SR - t, k0 = x < -0.35 ? Math.max(0, (-0.35 - x) / 0.25) : x < 1.2 ? 0 : Math.min(1, (x - 1.2) / 1.8), k = suelo + (1 - suelo) * k0;
    if (i >= 0) { musica.L[i] *= k; musica.R[i] *= k; }
  }
  for (let i = Math.round((t + 0.05) * SR); i < Math.min(n, Math.round((t + 3) * SR)); i++) { golpes.L[i] *= g; golpes.R[i] *= g; ecoG.L[i] *= g; ecoG.R[i] *= g; }
}
golpes.mixInto(musica, 1); ecoG.mixInto(musica, 0.35);
// Desde el 15: donde la música cae en una cartela más de lo que deja el control (7,5 dB: los huecos de la aventura o el
// redoble del épico que se acaba justo antes del cambio de año), un colchón sostenido rellena el hueco y crece hasta que
// la caída baja de 6,5 dB. Se mide igual que medir-sonido.py (ventanas de 0,1 s en mono; antes −1,5…−0,5 s y mínimo en
// ±2,5 s). Donde ya cumplía no se añade nada, así que los episodios anteriores suenan igual.
{
  const W = Math.round(0.1 * SR), nivel = (i) => { let s = 0; for (let j = i; j < i + W; j++) { const m = (musica.L[j] + musica.R[j]) / 2; s += m * m; } return 10 * Math.log10(s / W + 1e-12); };
  const caida = (c) => { const i = Math.round(c * 10); let a = 0; for (let k = i - 15; k < i - 5; k++) a += nivel(k * W); a /= 10; let m = Infinity; for (let k = Math.max(0, i - 25); k < i + 25; k++) m = Math.min(m, nivel(k * W)); return [a - m, a]; };
  for (const [k, c] of cartelas.entries()) {
    if (c + 2.6 > dur) continue;
    let [d, antes] = caida(c);
    if (d <= 7.5) continue;
    for (let vuelta = 0; vuelta < 5 && d > 6.5; vuelta++) {
      const tmp = new Bus(n);
      pad(tmp, [[TONICA + 12, 0.4], [TONICA + 19, 0.3], [TONICA + 24, 0.2]], c - 2.7, 5.4, { cutoff: 1300, attack: 0.25, release: 0.8, seed: 70 + k + vuelta });
      const i0 = Math.round((c - 2.5) * SR), i1 = Math.round((c + 2.5) * SR);
      tmp.mixInto(musica, 10 ** ((antes - 4 - rms(tmp, i0, i1)) / 20));
      [d] = caida(c);
    }
  }
}
MIX.fadeOut(musica, Math.max(dur - 3, ...cortes.map((t) => t + 2.5)), dur + 0.01);   // el fundido final no se come un golpe
MIX.writeWav(path.join(dir, 'musica.wav'), musica);
fs.writeFileSync(path.join(dir, 'musica-banda.json'), JSON.stringify({ animos: linea.escenas.map((e) => plan[e.id]?.animo ?? null), golpes: cortes }));
console.log(`${planJson.banda ? `banda: ${BANDA.tono || 'la'} ${BANDA.modo || 'menor'}, ${TEMPO} bpm · ` : ''}musica.wav: ${linea.escenas.length} escenas en ${tramos.length} tramos, ${cartelas.length} transiciones de año, ${cortes.length} golpes, ${dur.toFixed(1)} s`);
