E = {}

# las marcas de cada palabra de la voz inglesa (en('marca', fracción))
W = r'''
const W = { DOES: en('estatua', 0.0000), THAT: en('estatua', 0.0034), MEAN: en('estatua', 0.0101), GOBEKLI: en('estatua', 0.0188), TEP: en('estatua', 0.0369), HAS: en('estatua', 0.0443), NO: en('estatua', 0.0530), MYSTERY: en('estatua', 0.0591), LEFT: en('estatua', 0.0712), NOT: en('estatua', 0.1262), AT: en('estatua', 0.1390), ALL: en('estatua', 0.1437), BECAUSE: en('estatua', 0.1658), IN: en('estatua', 0.1745), SEPTEMBER: en('estatua', 0.1806), N2025: en('estatua', 0.1920), WHILE: en('estatua', 0.2524), RESTORING: en('estatua', 0.2598), A: en('estatua', 0.2746), WALL: en('estatua', 0.2813), BETWEEN: en('estatua', 0.2927), TWO: en('estatua', 0.3048), OF: en('estatua', 0.3162), THE: en('estatua', 0.3195), GREAT: en('estatua', 0.3236), ENCLOSURES: en('estatua', 0.3323), A2: en('estatua', 0.3726), LIFE: en('estatua', 0.3766), SIZE: en('estatua', 0.3847), STATUE: en('estatua', 0.3947), OF2: en('estatua', 0.4142), A3: en('estatua', 0.4236), PERSON: en('estatua', 0.4270), TURNED: en('estatua', 0.4384), UP: en('estatua', 0.4538), INSIDE: en('estatua', 0.4619), THE2: en('estatua', 0.4719), WALL2: en('estatua', 0.4813), LAID: en('estatua', 0.5136), LENGTHWISE: en('estatua', 0.5209), ALONG: en('estatua', 0.5391), IT: en('estatua', 0.5512), AND: en('estatua', 0.5606), SET: en('estatua', 0.5700), INTO: en('estatua', 0.5794), ITS: en('estatua', 0.5867), BASE: en('estatua', 0.5934), ON: en('estatua', 0.6042), PURPOSE: en('estatua', 0.6116), PERHAPS: en('estatua', 0.6418), AS: en('estatua', 0.6559), AN: en('estatua', 0.6727), OFFERING: en('estatua', 0.6780), ITS2: en('estatua', 0.7230), THE3: en('estatua', 0.7438), FIRST: en('estatua', 0.7479), TIME: en('estatua', 0.7552), ANYTHING: en('estatua', 0.7660), LIKE: en('estatua', 0.7814), IT2: en('estatua', 0.7969), HAS2: en('estatua', 0.8009), APPEARED: en('estatua', 0.8063), AT2: en('estatua', 0.8197), GOBEKLI2: en('estatua', 0.8291), TEP2: en('estatua', 0.8459), AND2: en('estatua', 0.8579), NOBODY: en('estatua', 0.8774), KNOWS: en('estatua', 0.8935), YET: en('estatua', 0.9043), WHAT: en('estatua', 0.9130), THE4: en('estatua', 0.9264), PERSON2: en('estatua', 0.9311), WHO: en('estatua', 0.9432), PLACED: en('estatua', 0.9513), IT3: en('estatua', 0.9640), MEANT: en('estatua', 0.9714), TO: en('estatua', 0.9781), SAY: en('estatua', 0.9862), AND3: en('karahan', 0.0000), THE5: en('karahan', 0.0030), MOST: en('karahan', 0.0059), EXCITING: en('karahan', 0.0112), PART: en('karahan', 0.0225), IS: en('karahan', 0.0343), THAT2: en('karahan', 0.0479), GOBEKLI3: en('karahan', 0.0520), TEEP: en('karahan', 0.0662), IS2: en('karahan', 0.0750), NO2: en('karahan', 0.0821), LONGER: en('karahan', 0.0863), ALONE: en('karahan', 0.0987), BECAUSE2: en('karahan', 0.1276), ON2: en('karahan', 0.1347), THE6: en('karahan', 0.1412), SURROUNDING: en('karahan', 0.1442), HILLS: en('karahan', 0.1554), MORE: en('karahan', 0.1690), THAN: en('karahan', 0.1784), TEN: en('karahan', 0.1843), SIMILAR: en('karahan', 0.1914), PLACES: en('karahan', 0.2044), ARE: en('karahan', 0.2180), NOW: en('karahan', 0.2257), BEING: en('karahan', 0.2340), DUG: en('karahan', 0.2416), WHICH: en('karahan', 0.2635), ARCHAEOLOGISTS: en('karahan', 0.2694), CALL: en('karahan', 0.2942), TASH: en('karahan', 0.3054), TEPLER: en('karahan', 0.3173), THE7: en('karahan', 0.3397), STONE: en('karahan', 0.3427), HILLS2: en('karahan', 0.3497), AT3: en('karahan', 0.3970), ONE: en('karahan', 0.4094), OF3: en('karahan', 0.4141), THEM: en('karahan', 0.4177), KARAHAN: en('karahan', 0.4378), TEEPA: en('karahan', 0.4472), THERES: en('karahan', 0.4691), A4: en('karahan', 0.4750), HALL: en('karahan', 0.4779), CARVED: en('karahan', 0.4844), INTO2: en('karahan', 0.4939), THE8: en('karahan', 0.5016), LIVING: en('karahan', 0.5069), ROCK: en('karahan', 0.5116), WITH: en('karahan', 0.5205), PILLARS: en('karahan', 0.5264), RISING: en('karahan', 0.5358), AS2: en('karahan', 0.5524), IF: en('karahan', 0.5601), THEY: en('karahan', 0.5677), GREW: en('karahan', 0.5737), FROM: en('karahan', 0.5819), THE9: en('karahan', 0.5896), GROUND: en('karahan', 0.5937), WATCHED: en('karahan', 0.6221), OVER: en('karahan', 0.6310), BY: en('karahan', 0.6386), A5: en('karahan', 0.6463), HUMAN: en('karahan', 0.6505), HEAD: en('karahan', 0.6605), SCULPTED: en('karahan', 0.6705), INTO3: en('karahan', 0.6883), THE10: en('karahan', 0.6936), WALL3: en('karahan', 0.6989), AND4: en('karahan', 0.7107), IN2: en('karahan', 0.7267), N20252: en('karahan', 0.7308), THE11: en('karahan', 0.7509), FIRST2: en('karahan', 0.7674), T: en('karahan', 0.7751), SHAPED: en('karahan', 0.7858), PILLAR: en('karahan', 0.7928), WITH2: en('karahan', 0.8070), A6: en('karahan', 0.8224), CARVED2: en('karahan', 0.8259), FACE: en('karahan', 0.8354), TURNED2: en('karahan', 0.8460), UP2: en('karahan', 0.8566), THERE: en('karahan', 0.8643), AS3: en('karahan', 0.8891), IF2: en('karahan', 0.8950), THOSE: en('karahan', 0.8992), FACELESS: en('karahan', 0.9051), GIANTS: en('karahan', 0.9205), WERE: en('karahan', 0.9352), FINALLY: en('karahan', 0.9506), LOOKING: en('karahan', 0.9636), BACK: en('karahan', 0.9718), AT4: en('karahan', 0.9831), US: en('karahan', 0.9890), AND5: en('leopardo', 0.0000), THE12: en('leopardo', 0.0032), FINDS: en('leopardo', 0.0064), KEEP: en('leopardo', 0.0128), COMING: en('leopardo', 0.0198), BECAUSE3: en('leopardo', 0.0428), IN3: en('leopardo', 0.0493), AUGUST: en('leopardo', 0.0541), N2026: en('leopardo', 0.0600), A7: en('leopardo', 0.0942), FIGURE: en('leopardo', 0.1044), OF4: en('leopardo', 0.1108), A8: en('leopardo', 0.1156), PERSON3: en('leopardo', 0.1189), SEATED: en('leopardo', 0.1264), ON3: en('leopardo', 0.1360), A9: en('leopardo', 0.1472), LEOPARD: en('leopardo', 0.1499), TURNED3: en('leopardo', 0.1579), UP3: en('leopardo', 0.1676), AT5: en('leopardo', 0.1745), KARAHAN2: en('leopardo', 0.1788), TEPE: en('leopardo', 0.1906), A10: en('leopardo', 0.2142), YEAR: en('leopardo', 0.2168), AFTER: en('leopardo', 0.2222), A11: en('leopardo', 0.2313), STONE2: en('leopardo', 0.2366), BOWL: en('leopardo', 0.2415), WITH3: en('leopardo', 0.2527), THREE: en('leopardo', 0.2650), LITTLE: en('leopardo', 0.2714), FIGURINES: en('leopardo', 0.2784), INSIDE2: en('leopardo', 0.2918), A12: en('leopardo', 0.3175), FOX: en('leopardo', 0.3212), A13: en('leopardo', 0.3437), BOAR: en('leopardo', 0.3464), AND6: en('leopardo', 0.3582), A14: en('leopardo', 0.3646), VULTURE: en('leopardo', 0.3683), THE13: en('leopardo', 0.3903), SAME: en('leopardo', 0.3935), ANIMALS: en('leopardo', 0.3994), CARVED3: en('leopardo', 0.4133), ON4: en('leopardo', 0.4235), THE14: en('leopardo', 0.4305), PILLARS2: en('leopardo', 0.4342), HAD: en('leopardo', 0.4551), APPEARED2: en('leopardo', 0.4594), IN4: en('leopardo', 0.4674), A15: en('leopardo', 0.4744), SEALED: en('leopardo', 0.4776), POCKET: en('leopardo', 0.4851), OF5: en('leopardo', 0.4958), RED: en('leopardo', 0.5017), EARTH: en('leopardo', 0.5081), BENEATH: en('leopardo', 0.5156), A16: en('leopardo', 0.5268), BENCH: en('leopardo', 0.5359), AND7: en('leopardo', 0.5718), AT6: en('leopardo', 0.5846), NEARBY: en('leopardo', 0.5879), SABERCH: en('leopardo', 0.5970), A17: en('leopardo', 0.6285), CARVED4: en('leopardo', 0.6334), WALL4: en('leopardo', 0.6414), TELLS: en('leopardo', 0.6510), A18: en('leopardo', 0.6601), SCENE: en('leopardo', 0.6666), WITH4: en('leopardo', 0.6730), A19: en('leopardo', 0.6778), MAN: en('leopardo', 0.6810), BETWEEN2: en('leopardo', 0.6874), TWO2: en('leopardo', 0.6976), LEOPARDS: en('leopardo', 0.7094), AND8: en('leopardo', 0.7244), ANOTHER: en('leopardo', 0.7287), FACING: en('leopardo', 0.7356), A20: en('leopardo', 0.7453), BULL: en('leopardo', 0.7501), ONE2: en('leopardo', 0.7720), OF6: en('leopardo', 0.7752), THE15: en('leopardo', 0.7779), OLDEST: en('leopardo', 0.7806), STORIES: en('leopardo', 0.7870), CARVED5: en('leopardo', 0.7999), IN5: en('leopardo', 0.8117), STONE3: en('leopardo', 0.8186), THAT3: en('leopardo', 0.8272), WE: en('leopardo', 0.8336), KNOW: en('leopardo', 0.8373), OF7: en('leopardo', 0.8432), ITS3: en('leopardo', 0.8625), A21: en('leopardo', 0.8668), WHOLE: en('leopardo', 0.8684), WORLD: en('leopardo', 0.8743), THAT4: en('leopardo', 0.8861), WAS: en('leopardo', 0.8914), LYING: en('leopardo', 0.8957), DOWN: en('leopardo', 0.9021), THERE2: en('leopardo', 0.9091), WAITING: en('leopardo', 0.9278), AND9: en('leopardo', 0.9514), THAT5: en('leopardo', 0.9541), WERE2: en('leopardo', 0.9567), ONLY: en('leopardo', 0.9610), BEGINNING: en('leopardo', 0.9680), TO2: en('leopardo', 0.9798), READ: en('leopardo', 0.9867) };
'''

# ── utilidades de pintura (las del grupo 7: tramas, mezclas, cifras de 3 × 5, nubes, pájaros, globo)
UTIL = r'''
const ri = Math.round, H = (s) => hex(s), K = T.C.k;
const B4M = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4M[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const h2 = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const cl = (u) => Math.max(0, Math.min(1, u)), ease = (u) => u * u * (3 - 2 * u);
const ps = (x, y, c) => R.pset(ri(x), ri(y), c);
const rr = (x0, y0, x1, y1, c) => R.rect(ri(Math.min(x0, x1)), ri(Math.min(y0, y1)), ri(Math.max(x0, x1)), ri(Math.max(y0, y1)), c);
const tine = (x, y, c, a) => { x = ri(x); y = ri(y); if (x < 0 || y < 0 || x > 319 || y > 179) return; const B = R.buf, i = y * 320 + x; B[i] = mez(B[i], c, a); };
const pal = (a) => a.map((c) => H(c));
const rmp = (ramp, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return ramp[Math.max(0, Math.min(ramp.length - 1, l))]; };
const pop = (t, a, d = 0.3) => { const u = Math.max(0, Math.min(1, (t - a) / d)); return u <= 0 ? 0 : u < 1 ? 1 - Math.pow(1 - u, 3) * Math.cos(u * 7) : 1; };
const DIG = { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001111001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001001001001', 8: '111101111101111', 9: '111101111001111', '-': '000000111000000' };
const cifras = (s, x, y, c, n = 99) => { let k = 0; for (const ch of String(s)) { if (k++ >= n) break; const g = DIG[ch]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(ri(x) + i, ri(y) + j, c); x += 4; } };
const BOLLOS = [[-0.36, 0.08, 0.26], [-0.12, -0.12, 0.33], [0.16, -0.06, 0.3], [0.38, 0.1, 0.22], [0.02, 0.14, 0.3], [-0.24, 0.16, 0.2]];
const nube = (cx, cy, w, cs) => {
  const x0 = ri(cx - w * 0.65), x1 = ri(cx + w * 0.65), y0 = ri(cy - w * 0.48), y1 = ri(cy + w * 0.36);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    let d = 9; for (const [a, b, r] of BOLLOS) { const q = ((x - cx - a * w) ** 2 + ((y - cy - b * w) * 1.5) ** 2) / (r * w) ** 2; if (q < d) d = q; }
    if (d > 1 || (d > 0.8 && b4(x, y) < (d - 0.8) * 5)) continue;
    const v = (y - (cy - w * 0.3)) / (w * 0.5) + (d > 0.7 ? 0.25 : 0);
    R.pset(x, y, v > 0.82 ? cs[0] : v > 0.42 + b4(x, y) * 0.2 ? cs[1] : cs[2]); }
};
const pajaro = (x, y, t, c, k = 0) => { x = ri(x); y = ri(y); const f = Math.floor(t * 6 + k * 1.7) % 3; ps(x, y, c); if (f === 0) { ps(x - 1, y - 1, c); ps(x + 1, y - 1, c); ps(x - 2, y - 1, c); ps(x + 2, y - 1, c); } else if (f === 1) { ps(x - 1, y, c); ps(x + 1, y, c); ps(x - 2, y - 1, c); ps(x + 2, y - 1, c); } else { ps(x - 1, y + 1, c); ps(x + 1, y + 1, c); ps(x - 2, y + 1, c); ps(x + 2, y + 1, c); } };
const sombraS = (cx, cy, w, a = 0.35) => { for (let i = -w; i <= w; i++) { const k = 1 - (i / (w + 1)) ** 2; tine(cx + i, cy, K, a * k); if (Math.abs(i) < w * 0.7) tine(cx + i, cy + 1, K, a * 0.6 * k); } };
const destello = (x, y, r, c = H('#fff8d0')) => { x = ri(x); y = ri(y); for (let k = 1; k <= r; k++) { ps(x + k, y, c); ps(x - k, y, c); ps(x, y + k, c); ps(x, y - k, c); } ps(x, y, H('#ffffff')); };
// las capas fijas de cada plano, pintadas una vez en su búfer
const CAPAS = {};
const fijo = (k, f) => { let b = CAPAS[k]; if (!b) { b = CAPAS[k] = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); } R.buf.set(b); };
// madera con vetas (tablas horizontales u verticales), yeso con grumos y grietas, corcho
const MADERA = pal(['#3e2414', '#5a3620', '#7a4c2c', '#9a6638', '#b88048']);
const madera = (x0, y0, x1, y1, k = 0, vert = false, ramp = MADERA, base = 2.2) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
  const u = vert ? x : y, w = vert ? y : x, tabla = Math.floor((u - (vert ? x0 : y0)) / 9), junta = (u - (vert ? x0 : y0)) % 9 === 8;
  const v = base + Math.sin(w * 0.09 + Math.sin(u * 0.7 + tabla * 3) * 2 + tabla * 5 + k) * 0.55 + (h2(tabla, k, 3) - 0.5) * 0.8 + (h2(x, y, k) - 0.5) * 0.5 - (junta ? 1.6 : 0) + (h2(w >> 3, tabla, 9 + k) > 0.93 ? -0.9 : 0);
  R.pset(x, y, rmp(ramp, v, x, y)); } };
const YESO = pal(['#8a7c64', '#a8987a', '#c4b494', '#d8caa8', '#e8dcbe']);
const yeso = (x0, y0, x1, y1, k = 0, ramp = YESO, base = 2.6) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
  const v = base + (h2(x >> 2, y >> 2, k) - 0.5) * 0.7 + (h2(x, y, k + 1) - 0.5) * 0.5 + Math.sin(x * 0.05 + y * 0.03 + k) * 0.2;
  R.pset(x, y, rmp(ramp, v, x, y)); }
  for (let g = 0; g < 4; g++) { let x = x0 + h2(g, k, 7) * (x1 - x0), y = y0 + h2(g, k, 8) * (y1 - y0); for (let s = 0; s < 18; s++) { x += h2(s, g, k) - 0.3; y += 0.9; if (x > x0 && x < x1 && y < y1) R.pset(ri(x), ri(y), ramp[0]); } } };
// cielo tramado con nubes de tres tonos a tres velocidades y pájaros (lo fijo en el búfer; esto, cada fotograma)
const nubesVivas = (t, lista, y1) => { for (const [x0, y, w, v, cs] of lista) { const x = ((x0 + t * v) % 420 + 420) % 420 - 50; nube(x, y, w, cs); } };
const CI_DIA = pal(['#5a90cc', '#6fa0d6', '#88b4e0', '#a6c8e6', '#c4dcea']);
const NUB = [pal(['#fbfcff', '#e2eaf4', '#b8c8dc']), pal(['#f0f4fa', '#d0dae8', '#a4b4cc']), pal(['#e4eaf2', '#c4ccda', '#98a6bc'])];
const cielo = (y0, y1, ramp = CI_DIA) => { for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(ramp, (y - y0) / (y1 - y0 + 1) * (ramp.length - 0.2), x, y)); };
// la mano que coge (brazo canónico): del hombro a la muñeca, con codo
const brazo = (x0, y0, x1, y1, manga, dir, codo) => T.brazo(R, ri(x0), ri(y0), ri(x1), ri(y1), manga, dir, codo ? { codo: [ri(codo[0]), ri(codo[1])] } : {});
// una etiqueta blanca con su número y su clavo
const etiqueta = (x, y, n, c = H('#f4f0e4')) => { x = ri(x); y = ri(y); const w = String(n).length * 4 + 3; rr(x - 1, y - 1, x + w, y + 7, K); rr(x, y, x + w - 1, y + 6, c); rr(x, y + 6, x + w - 1, y + 6, mez(c, K, 0.25)); cifras(n, x + 2, y + 1, H('#2a2a34')); ps(x + w - 2, y + 1, H('#c83a3a')); };
// el globo de pensamiento: lo de dentro se pinta en un rectángulo y fuera del óvalo se devuelve lo de debajo
const globo = (cx, cy, rx, ry, s, dentro) => {
  if (s <= 0) return; const ax = rx * s, ay = ry * s, x0 = Math.max(0, ri(cx - ax - 4)), x1 = Math.min(319, ri(cx + ax + 4)), y0 = Math.max(0, ri(cy - ay - 4)), y1 = Math.min(179, ri(cy + ay + 4));
  const B = R.buf, antes = B.slice(); dentro();
  const borde = (x, y) => { const a = Math.atan2((y - cy) / ay, (x - cx) / ax); return 1 + Math.sin(a * 11) * 0.035 * s; };
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const d = Math.hypot((x - cx) / ax, (y - cy) / ay), b = borde(x, y), i = y * 320 + x;
    if (d > b + 0.06) B[i] = antes[i]; else if (d > b) B[i] = K; else if (d > b - 0.045) B[i] = H('#fbf8ee'); else if (d > b - 0.075) B[i] = mez(B[i], H('#fbf8ee'), 0.5); }
};
const burbujas = (pts, s) => { pts.forEach(([x, y, r], k) => { if (s < 0.3 + k * 0.2) return; R.disco(ri(x), ri(y), r + 1, K); R.disco(ri(x), ri(y), r, H('#fbf8ee')); ps(x - 1, y - 1, H('#ffffff')); }); };
'''

# ── mis utilidades (grupo 8): muro a hiladas, roca viva, tierra, pilares redondos, haces de luz y bichos ─────────
MIS = r'''
const CAL = pal(['#5e5240', '#7e6e56', '#a08e70', '#bfad8a', '#d8c8a4', '#ece0c0']);
const CALT = pal(['#4a3424', '#6a4a32', '#8e6644', '#b08458', '#cca472', '#e2c48e']);   // caliza al atardecer
const CALN = pal(['#141828', '#1e2436', '#2a3246', '#384258', '#4a566c', '#5e6a80']);   // de noche
const CALI = pal(['#3a3028', '#50423a', '#685848', '#80705a', '#9a886c']);              // interior en penumbra
const TIE = pal(['#3e2616', '#5a3820', '#7a4e2c', '#9a6a3e', '#b88654']);
const TIER = pal(['#4a1a10', '#6a2618', '#8a3620', '#a84a2a', '#c4623a']);
const KAR = pal(['#5a4028', '#7a5a38', '#9a764a', '#b8925e', '#d0ac76', '#e4c894']);   // la caliza de Karahan, cálida
const MUS = pal(['#12161f', '#191e2a', '#212836', '#2b3344', '#384154']);
// muro de piedra seca a hiladas: lajas irregulares con su junta de barro, la luz arriba a la izquierda
const hiladas = (x0, y0, x1, y1, k = 0, ramp = CAL, alto = 7, base = 2.4, J = null) => {
  J = J ?? mez(ramp[0], K, 0.4); const J2 = mez(ramp[0], ramp[1], 0.5);
  let y = y0, f = 0;
  while (y <= y1) {
    const hh = Math.max(3, ri(alto * (0.65 + h2(f, k, 1) * 0.7))), ya = y, yb = Math.min(y1, y + hh - 1);
    let x = x0 - ri(h2(f, k, 2) * alto * 2), s = 0;
    while (x <= x1) {
      const w = Math.max(4, ri(alto * (1.1 + h2(f, s, k + 3) * 2.4))), xa = x, xb = x + w - 1, v0 = base + (h2(f, s, k + 4) - 0.5) * 1.4;
      const sube = ri(h2(s, f, k + 5) * 2), baja = ri(h2(s, f, k + 6) * 2);
      for (let yy = ya; yy <= yb; yy++) for (let xx = Math.max(x0, xa); xx <= Math.min(x1, xb); xx++) {
        const dl = xx - xa, dr = xb - xx, dt = yy - ya - (dl < 3 || dr < 3 ? 0 : sube * (h2(xx >> 2, f, k) > 0.5 ? 1 : 0)), db = yb - yy - baja * (h2(xx >> 2, f, k + 1) > 0.6 ? 1 : 0);
        if (dl === 0 || dt <= 0 || db < 0 || (Math.min(dl, dr) + Math.min(dt, db) < 2)) { R.pset(xx, yy, db < 0 || dt <= 0 ? J : J2); continue; }
        let v = v0 + (dt <= 1 ? 1.0 : 0) + (dl <= 1 ? 0.5 : 0) - (db <= 1 ? 1.1 : 0) - (dr <= 1 ? 0.6 : 0) + (h2(xx, yy, k) - 0.5) * 0.7 + (h2(xx >> 2, yy >> 1, k + 8) - 0.5) * 0.5;
        if (h2(xx, yy >> 1, k + 7) > 0.975) v -= 1.3;
        R.pset(xx, yy, rmp(ramp, v, xx, yy)); }
      x += w; s++; }
    y += hh; f++; }
};
// roca viva tallada: grano, estratos ondulados, poros y grietas
const roca = (x0, y0, x1, y1, k = 0, ramp = CAL, base = 2.5, estr = 9, luzX = null) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const e = (y + ri(Math.sin(x * 0.045 + k) * 3 + Math.sin(x * 0.13 + k * 2))) % estr;
    let v = base + (h2(x >> 3, y >> 3, k) - 0.5) * 0.7 + (h2(x >> 1, y >> 1, k + 1) - 0.5) * 0.5 + (h2(x, y, k + 2) - 0.5) * 0.4 + (e === 0 ? -0.9 : e === 1 ? 0.35 : 0);
    if (luzX != null) v += (1 - Math.abs(x - luzX) / 160) * 0.5;
    if (h2(x, y, k + 3) > 0.985) v -= 1.4;
    R.pset(x, y, rmp(ramp, v, x, y)); }
  for (let g = 0; g < 5; g++) { let x = x0 + h2(g, k, 9) * (x1 - x0), y = y0 + h2(g, k, 10) * (y1 - y0) * 0.6; for (let s = 0; s < 26; s++) { x += (h2(s, g, k) - 0.5) * 1.8; y += 0.8; if (x > x0 && x < x1 && y < y1) { R.pset(ri(x), ri(y), ramp[0]); R.pset(ri(x) + 1, ri(y), ramp[Math.min(ramp.length - 1, 3)]); } } }
};
// tierra con piedrecitas, raíces y terrones
const tierra = (x0, y0, x1, y1, k = 0, ramp = TIE, base = 2.3, pc = CAL) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const v = base + (h2(x >> 2, y >> 2, k) - 0.5) * 0.9 + (h2(x, y, k + 1) - 0.5) * 0.7 + (h2(x >> 4, y >> 3, k + 2) - 0.5) * 0.5;
    R.pset(x, y, rmp(ramp, v, x, y)); }
  const n = ri((x1 - x0) * (y1 - y0) / 90);
  for (let g = 0; g < n; g++) { const x = ri(x0 + h2(g, k, 3) * (x1 - x0)), y = ri(y0 + h2(g, k, 4) * (y1 - y0)), w = 1 + ri(h2(g, k, 5) * 2);
    rr(x, y, x + w, y + 1, pc[Math.min(pc.length - 1, 3 + (g & 1))]); rr(x, y + 2, x + w, y + 2, mez(ramp[0], K, 0.3)); ps(x, y, pc[pc.length - 1]); }
};
// un pilar redondeado de Karahan Tepe que brota del suelo (x centro, yb base, w ancho, hh alto)
const pilarR = (x, yb, w, hh, k = 0, ramp = CAL, luz = 0.5) => {
  if (hh < 1) return; const r = w / 2, top = yb - hh;
  for (let y = ri(top); y <= yb; y++) { const dy = y - top, ancho = dy < r ? Math.sqrt(Math.max(0, r * r - (r - dy) ** 2)) : r + (yb - y < 4 ? (4 - (yb - y)) * 0.6 : 0);
    for (let xx = ri(x - ancho); xx <= ri(x + ancho); xx++) { const u = (xx - x) / Math.max(1, ancho), borde = Math.abs(u) > 0.86 || (dy < r && Math.hypot(xx - x, y - top - r) > r - 1.2);
      const v = 2.6 + luz - u * 1.6 - (u > 0.4 ? 0.5 : 0) + (h2(xx, y, k) - 0.5) * 0.6 + (h2(xx >> 1, y >> 2, k + 1) - 0.5) * 0.5 + (dy < r * 0.7 ? 0.5 : 0);
      R.pset(xx, y, borde ? mez(ramp[0], K, 0.5) : rmp(ramp, v, xx, y)); } }
  sombraS(x + 2, yb + 1, ri(r + 3), 0.35);
};
// un haz de luz tramado (de arriba (xa, ya) ancho wa, a abajo (xb, yb) ancho wb)
const haz = (xa, ya, xb, yb, wa, wb, c, a) => {
  for (let y = Math.max(0, ri(ya)); y <= Math.min(179, ri(yb)); y++) { const u = (y - ya) / Math.max(1, yb - ya), cx = lerp(xa, xb, u), w = lerp(wa, wb, u);
    for (let x = Math.max(0, ri(cx - w)); x <= Math.min(319, ri(cx + w)); x++) { const e = 1 - Math.abs(x - cx) / Math.max(1, w); if (b4(x, y) < e * 0.95) tine(x, y, c, a * (0.45 + e * 0.55)); } }
};
// un charco de luz en el suelo o la pared (elipse tramada)
const manchaLuz = (cx, cy, rx, ry, c, a) => { for (let y = ri(cy - ry); y <= ri(cy + ry); y++) for (let x = ri(cx - rx); x <= ri(cx + rx); x++) { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d < 1 && b4(x, y) < (1 - d) * 1.1) tine(x, y, c, a); } };
// motas de polvo que flotan en una caja
const motasEn = (t, x0, y0, x1, y1, n, c, k = 0) => { for (let i = 0; i < n; i++) { const u = (t * (0.04 + h2(i, k, 1) * 0.05) + h2(i, k, 2)) % 1; ps(x0 + h2(i, k, 3) * (x1 - x0) + Math.sin(t * 0.9 + i) * 3, y1 - u * (y1 - y0), c); } };
// un montón de tierra en cúpula (cx centro, yb base, w medio ancho abajo, L lo alto)
const monton = (cx, yb, w, L, ramp, k = 0) => { if (L >= yb - 1) return; const hh = yb - L;
  for (let y = ri(L); y <= yb; y++) { const u = (y - L) / hh, hw = w * Math.sqrt(Math.min(1, (u * 1.15 + 0.04))), x0 = ri(cx - hw + Math.sin(y * 0.7 + k) * 1.5), x1 = ri(cx + hw + Math.sin(y * 0.5 + k + 2) * 1.5);
    for (let x = x0; x <= x1; x++) { const q = h2(x, y, 300 + k), borde = x === x0 || x === x1 || y === ri(L);
      R.pset(x, y, borde ? (y === ri(L) ? ramp[4] : mez(ramp[0], K, 0.4)) : q > 0.97 ? CAL[4] : q > 0.95 ? K : rmp(ramp, 3.2 - u * 1.2 - (x - cx) / w * 0.9 + (h2(x >> 1, y >> 1, 301 + k) - 0.5) * 1.3, x, y)); } }
  sombraS(cx + 4, yb + 1, ri(w + 2), 0.35);
};
// sprites pequeños
const CABRA = ['..kk.........', '.kNk.........', 'kNNNkkkkkkk..', '.kNNNNNNNNNkk', '..kNNNNNNNNk.', '..kNnNNNNnNk.', '..k.k...k.k..', '..k.k...k.k..'];
const cabra = (x, y, dir, t, k = 0, c = '#e8e0d0') => { const ram = Math.sin(t * 3 + k) > 0.6; R.dibujo(CABRA, ri(x), ri(y) - 8 + (ram ? 1 : 0), dir, { k: K, N: H(c), n: mez(H(c), K, 0.3) }); sombraS(ri(x) + 6, ri(y), 6, 0.3); if (ram) ps(ri(x) + (dir > 0 ? 1 : 11), ri(y) - 1, H('#6a9a3a')); };
const GALLINA = ['.kk....', 'kRWk...', '.kWWkk.', '.kWWWWk', '..kWWk.', '...k.k.'];
const gallina = (x, y, dir, t, k = 0) => { const pica = Math.sin(t * 4 + k * 2) > 0.7; R.dibujo(GALLINA, ri(x), ri(y) - 6 + (pica ? 1 : 0), dir, { k: K, R: H('#d83a2a'), W: H(k & 1 ? '#c8783a' : '#f0ece0') }); };
const LAGARTIJA = ['k.....k.', '.kGGGGk.kk', 'kGGGGGGGGG', '.k.....k..'];
const lagartija = (x, y, dir) => R.dibujo(LAGARTIJA, ri(x), ri(y) - 4, dir, { k: K, G: H('#8a8a4a') });
// la camioneta de la excavación (blanca, polvorienta, sin marca): x es el borde izquierdo, y el suelo; dir 1 mira a la derecha
const camioneta = (x, y, dir, t, mueve = false, carga = null) => {
  x = ri(x); y = ri(y); const X = (i) => dir > 0 ? x + i : x + 52 - i, cb = H('#e8e4da'), cs = H('#b8b2a6'), vid = H('#5a7a9a');
  const P = (i0, j0, i1, j1, c) => rr(X(i0), y - j0, X(i1), y - j1, c);
  sombraS(x + 26, y + 1, 28, 0.4);
  P(0, 7, 52, 15, K); P(1, 8, 51, 14, cb); P(1, 8, 51, 9, cs); P(1, 13, 51, 14, H('#fbfaf6'));
  P(30, 15, 46, 23, K); P(31, 15, 45, 22, cb); P(33, 16, 44, 21, vid); P(34, 20, 37, 21, H('#a8c4dc'));
  P(46, 9, 52, 13, H('#c8c4b8')); P(51, 10, 52, 12, H('#ffe890')); P(0, 9, 1, 12, H('#c83a2a'));
  P(2, 14, 28, 15, K); P(3, 15, 27, 15, cs);
  for (let i = 4; i < 28; i += 6) P(i, 10, i, 13, cs);
  for (const wx of [11, 41]) { R.disco(X(wx), y - 4, 5, K); R.disco(X(wx), y - 4, 4, H('#2a2a30')); R.disco(X(wx), y - 4, 2, H('#8a8a92')); const a = mueve ? t * 14 : 0; ps(X(wx) + ri(Math.cos(a) * 2), y - 4 + ri(Math.sin(a) * 2), H('#c8c8d0')); }
  for (let i = 0; i < 12; i++) tine(X(4 + i * 4), y - 7 - (i % 3), H('#9a7a54'), 0.35);
  if (carga) carga(X(14), y - 15);
};
// una caja de hallazgos con su etiqueta numerada
const caja = (x, y, c = '#3a6ac8', n = null, w = 16, hh = 10) => { x = ri(x); y = ri(y); rr(x - 1, y - hh - 1, x + w, y, K); rr(x, y - hh, x + w - 1, y - 1, H(c)); rr(x, y - hh, x + w - 1, y - hh + 1, mez(H(c), H('#ffffff'), 0.35)); rr(x, y - 2, x + w - 1, y - 1, mez(H(c), K, 0.3)); if (n != null) { const lw = String(n).length * 4 + 2; rr(x + 2, y - hh + 3, x + 2 + lw, y - 3, H('#f4f0e4')); cifras(n, x + 3, y - hh + 4, H('#2a2a34')); } };
// el cepillo en la mano (mango de madera y cerdas)
const cepillo = (x, y, dir = 1) => { x = ri(x); y = ri(y); rr(x - 1, y - 6, x + 1, y + 1, K); rr(x, y - 6, x, y, H('#b07a44')); rr(x - 2, y + 1, x + 2, y + 4, K); rr(x - 1, y + 2, x + 1, y + 4, H('#e8d8a8')); };
// la cámara de fotos en la mano y su destello
const camara = (x, y, flash = 0) => { x = ri(x); y = ri(y); rr(x - 4, y - 3, x + 4, y + 3, K); rr(x - 3, y - 2, x + 3, y + 2, H('#3a3a42')); R.disco(x, y, 2, H('#8aa0c0')); ps(x - 1, y - 1, H('#ffffff')); rr(x - 3, y - 5, x - 1, y - 4, H('#3a3a42'));
  if (flash > 0) { destello(x - 2, y - 5, ri(3 + flash * 6)); manchaLuz(x, y, 40 * flash, 28 * flash, H('#ffffff'), 0.35 * flash); } };
// el cubo de goma negro con asas
const cubo = (x, y, c = '#2a2a2e') => { x = ri(x); y = ri(y); R.poligono([[x - 7, y - 11], [x + 7, y - 11], [x + 5, y], [x - 5, y]], K); R.poligono([[x - 6, y - 10], [x + 6, y - 10], [x + 4, y - 1], [x - 4, y - 1]], H(c)); R.linea(x - 5, y - 9, x - 4, y - 2, mez(H(c), H('#ffffff'), 0.2)); rr(x - 6, y - 11, x + 6, y - 11, mez(H(c), H('#ffffff'), 0.3)); sombraS(x + 1, y + 1, 6, 0.3); };
// recupera del búfer de un plano un rectángulo (para lo que va delante de un personaje: una mesa, un banco)
const restaura = (k, x0, y0, x1, y1) => { const b = CAPAS[k]; if (!b) return; const B = R.buf; for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) B[y * 320 + x] = b[y * 320 + x]; };
// la membrana blanca de la cubierta, de cerca (arriba, tranquila: bajo la barra del año y la zona de Atom)
const membrana = (y0, y1, k = 0, ramp = pal(['#a8a49a', '#bcb8ac', '#cecabe', '#dedace', '#eae6dc'])) => {
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const f = Math.sin(x * 0.045 + k) * 0.5 + Math.sin(x * 0.11 + 2 + k) * 0.2; R.pset(x, y, rmp(ramp, 2.8 + f - (y - y0) / (y1 - y0 + 1) * 1.2, x, y)); }
  for (let x = 0; x < 320; x++) { const yb = y1 + ri(Math.abs(Math.sin(x * Math.PI / 40 + k)) * 3); for (let y = y1; y <= yb; y++) R.pset(x, y, ramp[1]); R.pset(x, yb + 1, mez(ramp[0], K, 0.3)); }
};
// las estrellas de un cielo nocturno (fijas, en el búfer)
const estrellas = (y0, y1, n, k = 0, x0 = 0, x1 = 319) => { for (let i = 0; i < n; i++) { const x = ri(x0 + h2(i, k, 1) * (x1 - x0)), y = ri(y0 + h2(i, k, 2) * (y1 - y0)); if (x > 272 && y < 48) continue; if (x < 176 && y < 24) continue; ps(x, y, h2(i, k, 3) > 0.8 ? H('#ffffff') : H('#9aa4d0')); } };
'''

# ── frase «estatua»: el almacén, el muro de 2025, la estatua que sale, el muro de −9500, la foto y la duda ─────────
PLANOS_A = r'''
const P2 = W.BECAUSE, P3 = W.STATUE, P4 = W.SET, P5 = W.ITS2, P6 = W.NOBODY, P7 = W.AND3, P8 = W.BECAUSE2, P9 = W.WHICH, P10 = W.AT3, P11 = W.AS2;
const P12 = W.AND4, P13 = W.AS3, P14 = W.AND5, P15 = W.FIGURE, P16 = W.A10, P17 = W.THE13, P18 = W.AND7 - 0.55, P19 = W.SCENE, P20 = W.ONE2, P21 = W.WHOLE;
// ── 1 · el almacén de hallazgos de la excavación, al atardecer (fondo local) ──────────────────────────────────────
const ALM = pal(['#3e3228', '#56463a', '#6e5c4a', '#8a765e', '#a49074']);
const CJ = ['#3a6ac8', '#d8782a', '#3a9a5a', '#c8b040', '#8a5ac8', '#c84a3a'];
const fondo1 = () => fijo('p1', () => {
  rr(0, 0, 319, 17, H('#241c16')); for (let x = 6; x < 320; x += 38) { rr(x, 0, x + 9, 16, H('#2c221a')); R.linea(x, 0, x, 16, H('#1a140f')); }
  R.linea(0, 17, 319, 17, H('#16110c'));
  hiladas(0, 18, 319, 137, 11, ALM, 9, 2.3);
  hiladas(0, 138, 319, 179, 12, pal(['#4a4038', '#62574c', '#7a6e60', '#948674', '#ac9e88']), 12, 2.5);
  R.linea(0, 138, 319, 138, H('#2a221c'));
  // la estantería metálica con sus cajas numeradas (el hueco de la balda de y 112, x 66–90, espera la caja que llega)
  for (const x of [8, 62, 118]) { rr(x, 30, x + 2, 142, K); rr(x + 1, 30, x + 1, 142, H('#8a9098')); }
  for (const y of [56, 84, 112, 140]) { rr(8, y, 120, y + 2, K); rr(9, y, 119, y, H('#c8ced6')); rr(9, y + 1, 119, y + 1, H('#7a8088')); }
  let n = 11;
  for (const [y, xs] of [[56, [12, 34, 66, 90]], [84, [12, 36, 66, 92]], [112, [12, 36, 94]], [140, [14, 40, 68, 94]]]) for (const x of xs) { caja(x, y, CJ[n % 6], n, 20, 13); n += 7; }
  // encima de la estantería: una lasca grande y un trozo de pilar con su etiqueta
  R.poligono([[20, 30], [26, 22], [40, 21], [46, 30]], K); R.poligono([[21, 29], [27, 23], [39, 22], [44, 29]], CAL[3]); R.linea(27, 24, 38, 23, CAL[5]);
  T.d_pilar(R, 90, 30, { escala: 0.42, sombra: false, luz: 0.5 }); etiqueta(100, 22, '7');
  // la ventana con el ocaso: el cerro con la cubierta blanca y el sol
  rr(192, 30, 250, 90, K); madera(193, 31, 249, 89, 4, true, MADERA, 2.4);
  for (let y = 35; y <= 85; y++) for (let x = 197; x <= 245; x++) R.pset(x, y, rmp(pal(['#c87a58', '#e8a060', '#f0b878', '#f4cc94', '#f6dcb0']), 4.4 - (y - 35) / 12, x, y));
  R.disco(230, 66, 6, H('#ffe8b0')); R.disco(230, 66, 4, H('#fffbe8'));
  for (let x = 197; x <= 245; x++) { const yy = 70 + ri(Math.max(0, 10 - Math.abs(x - 214) * 0.5) * -1 + 10) - 10; for (let y = Math.min(85, yy); y <= 85; y++) R.pset(x, y, rmp(pal(['#5a3a3a', '#7a4a42', '#9a5e4a']), 1.6 - (y - yy) / 8 + (h2(x, y, 3) - 0.5) * 0.6, x, y)); }
  rr(207, 63, 221, 66, H('#f4eee2')); for (let x = 207; x <= 221; x += 3) ps(x, 62, H('#f4eee2')); R.linea(206, 67, 222, 67, H('#8a6a5a'));
  for (let x = 197; x <= 245; x++) { const yy = 80 + ri(Math.sin(x * 0.2) * 1.5); for (let y = yy; y <= 85; y++) R.pset(x, y, H(y === yy ? '#8a7a4a' : '#5a4a32')); }
  rr(220, 35, 222, 85, K); rr(197, 59, 245, 60, K);
  rr(188, 88, 254, 93, K); rr(189, 89, 253, 91, CAL[3]); rr(189, 92, 253, 92, CAL[1]);
  R.poligono([[238, 88], [237, 80], [247, 80], [246, 88]], K); R.poligono([[239, 87], [238, 81], [246, 81], [245, 87]], H('#c86a3a'));
  for (let k = 0; k < 6; k++) R.linea(242, 80, ri(242 + Math.cos(-2.6 + k * 0.42) * 8), ri(78 + Math.sin(-2.6 + k * 0.42) * 10), H(k & 1 ? '#3e6a30' : '#5a8a3e'));
  // el reloj de pared y el plano de la colina clavado
  R.disco(160, 50, 10, K); R.disco(160, 50, 9, H('#7a4c2c')); R.disco(160, 50, 7, H('#f4efe2')); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; ps(160 + Math.cos(a) * 6, 50 + Math.sin(a) * 6, K); }
  rr(134, 70, 176, 104, K); rr(135, 71, 175, 103, H('#f2ead4'));
  for (const [cx, cy, a, b] of [[150, 86, 9, 7], [164, 80, 6, 5], [162, 95, 6, 4]]) for (let k = 0; k < 36; k++) { const an = k / 36 * Math.PI * 2; ps(cx + Math.cos(an) * a, cy + Math.sin(an) * b, H('#5a4a3a')); }
  ps(150, 86, H('#c83a3a')); ps(151, 86, H('#c83a3a')); ps(150, 85, H('#c83a3a'));
  R.disco(136, 72, 1, H('#e83a3a')); R.disco(174, 72, 1, H('#3a8ad8'));
  // el escritorio: el tablero (y 138) y lo que hay encima va en mesa1(), delante del arqueólogo
});
const mesa1 = (t, vibra) => {
  rr(168, 138, 319, 142, K); madera(169, 139, 319, 141, 6, false, MADERA, 3.0);
  rr(170, 143, 319, 164, K); madera(171, 143, 319, 163, 8, true, MADERA, 1.9);
  for (const x of [196, 252, 300]) { rr(x, 147, x + 12, 149, K); rr(x + 1, 147, x + 11, 148, H('#c8a46a')); }
  rr(172, 165, 176, 179, K); rr(173, 165, 175, 179, MADERA[1]);
  // la radio (walkie) que pita y tiembla
  const dx = vibra ? (Math.floor(t * 30) % 2 ? 1 : -1) : 0, X = 206 + dx;
  rr(X - 4, 126, X + 4, 138, K); rr(X - 3, 127, X + 3, 137, H('#2e3a2e')); rr(X - 2, 131, X + 2, 135, H('#4a5a4a')); rr(X + 2, 118, X + 3, 126, K);
  ps(X - 2, 128, vibra && Math.floor(t * 8) % 2 ? H('#ff4a3a') : H('#5a1a1a'));
  if (vibra) for (const s of [-1, 1]) { R.linea(X + s * 7, 124, X + s * 8, 121, H('#fff4c0')); R.linea(X + s * 9, 127, X + s * 11, 125, H('#fff4c0')); }
  // la taza que humea, los papeles y el flexo encendido
  rr(230, 130, 238, 138, K); rr(231, 131, 237, 137, H('#e8e4dc')); rr(238, 132, 240, 135, K);
  for (let k = 0; k < 5; k++) { const u = (t * 0.5 + k / 5) % 1; tine(234 + Math.sin(u * 6 + k) * 2, 128 - u * 18, H('#f4f4f4'), 0.6 * (1 - u)); }
  R.poligono([[244, 138], [250, 134], [276, 134], [272, 138]], K); R.poligono([[245, 137], [251, 135], [275, 135], [271, 137]], H('#f4f0e4'));
  rr(296, 135, 312, 138, K); rr(297, 136, 311, 137, H('#3e6a4e'));
  R.linea(303, 135, 296, 112, K); R.linea(304, 135, 297, 112, H('#9aa0a8')); R.linea(296, 112, 284, 104, K); R.linea(297, 112, 285, 105, H('#9aa0a8'));
  R.poligono([[276, 100], [290, 98], [294, 108], [280, 110]], K); R.poligono([[277, 101], [289, 99], [292, 107], [281, 108]], H('#3e6a4e'));
  haz(286, 110, 280, 138, 4, 16, H('#fff0c0'), 0.18);
};
const p1 = (t) => {
  fondo1();
  haz(220, 46, 150, 150, 10, 34, H('#ffd8a0'), 0.14); motasEn(t, 150, 60, 220, 150, 14, H('#ffe8c0'), 1);
  // el reloj y el gato del alféizar que mueve la cola
  const as = t * Math.PI * 2 / 8; R.linea(160, 50, ri(160 + Math.sin(as) * 6), ri(50 - Math.cos(as) * 6), H('#c83a3a')); R.linea(160, 50, 160, 45, K); R.linea(160, 50, 163, 52, K);
  rr(200, 82, 214, 88, K); rr(201, 83, 213, 87, H('#4a4a52')); rr(212, 79, 217, 86, K); rr(213, 80, 216, 85, H('#4a4a52')); ps(213, 79, K); ps(216, 79, K); ps(214, 82, H('#e8c040'));
  const cola = Math.sin(t * 2.2) * 3; R.linea(200, 86, 194, ri(82 + cola), K); R.linea(199, 86, 193, ri(83 + cola), H('#4a4a52'));
  // la arqueóloga trae la última caja, la sube a la balda en «mystery», se sacude las manos; en «not» pita la radio
  const ida = tramo(t, 0.3, 2.5), sube = tramo(t, W.MYSTERY - 0.25, W.LEFT + 0.15), vuelve = tramo(t, W.ALL + 0.1, P2);
  const xa = ri(lerp(150, 96, ease(ida)) + lerp(0, 46, vuelve)), vibra = t > W.NOT - 0.05 && t < W.ALL + 1.0;
  const mano = sube < 1 ? (sube > 0 ? [ri(lerp(xa - 3, 82, sube)), ri(lerp(138, 106, sube))] : true) : undefined;
  // el arqueólogo escribe detrás del escritorio y levanta la vista
  const o = R.actor(EL.arqueologoGB, 252, 145, t, { dir: -1, sostiene: t < W.NOT ? [250 + ri(Math.sin(t * 9) * 2), 134] : undefined, sorpresa: t > W.NOT + 0.1 && t < W.ALL + 0.4, dedo: t > W.ALL + 0.3 });
  if (t < W.NOT) { R.linea(o.mano[0] - 1, o.mano[1] - 4, o.mano[0] + 1, o.mano[1] + 1, K); ps(o.mano[0] + 1, o.mano[1] + 1, H('#e8c020')); }
  mesa1(t, vibra);
  if (sube >= 1) caja(68, 112, '#d8782a', 23, 18, 12);
  const a = R.actor(EL.arqueologaGB, xa, 150, t, { dir: t < W.NOT ? -1 : 1, anda: (ida > 0 && ida < 1) || (vuelve > 0 && vuelve < 1), sostiene: mano, brazos: t > W.LEFT + 0.35 && t < W.LEFT + 1.0, sorpresa: t > W.NOT && t < W.ALL + 0.5 });
  if (sube < 1) caja(a.mano[0] - 10, a.mano[1] + 6, '#d8782a', 23, 18, 12);
  if (t > W.LEFT + 0.35 && t < W.LEFT + 1.0) for (let i = 0; i < 6; i++) ps(xa + 2 + h2(i, 1, 1) * 12, 120 + ((t * 30 + i * 3) % 8), H('#c8b898'));
  if (t > W.NOT + 0.05 && t < P2) R.bocadillo(xa + 8, 119, {});
};
// ── 2 · el muro entre dos recintos (decorado colina·norte·muro): restauran, y en «life-size» cede el barro ──────────
const p2 = (t) => {
  const e = tramo(t, W.LIFE - 0.15, W.STATUE - 0.1) * 0.24;
  T.colina(R, t, { encuadre: 'norte', camara: 'muro', estatua: e });
  const u = tramo(t, P2 + 0.2, W.RESTORING + 1.4), xo = ri(lerp(-18, 46, ease(u)));
  const o = R.actor(EL.arqueologoGB, xo, 150, t, { dir: 1, anda: u > 0 && u < 1, sostiene: u < 1 ? true : undefined, dedo: t > W.SIZE, sorpresa: t > W.SIZE + 0.1 });
  if (u < 1) cubo(o.mano[0] + 3, o.mano[1] + 10); else cubo(xo + 22, 150);
  const fr = t < W.LIFE ? Math.sin(t * 13) : 0, xa = t < W.LIFE ? 124 : ri(lerp(124, 110, ease(tramo(t, W.LIFE, W.LIFE + 0.45))));
  const a = R.actor(EL.arqueologaGB, xa, 150, t, { dir: 1, sostiene: [xa + 21 + ri(fr * 2), 131 + ri(fr)], sorpresa: t > W.LIFE, anda: t > W.LIFE && t < W.LIFE + 0.45 });
  cepillo(a.mano[0] + 1, a.mano[1] - 2);
  if (t > W.SIZE) R.bocadillo(xa + 8, 118, {});
  if (t > W.LIFE - 0.1) for (let i = 0; i < 12; i++) { const v = ((t - W.LIFE) * 1.4 + i * 0.083) % 1; ps(150 + h2(i, 1, 2) * 22, 118 + v * 30, i & 1 ? H('#a08e70') : H('#6e5c4a')); }
  T.colinaDelante(R, t, { encuadre: 'norte', camara: 'muro' });
};
// ── 3 · INSERTO: la base del muro de cerca; el cepillo destapa la estatua de cabeza a pies; la cota de 170 ─────────
const fondo3 = () => fijo('p3', () => {
  membrana(0, 19, 1);
  rr(0, 22, 319, 25, K); rr(0, 23, 319, 24, H('#6a6e76')); for (let x = 4; x < 320; x += 24) { R.linea(x, 22, x + 12, 19, H('#4a4e56')); }
  hiladas(0, 26, 319, 152, 21, CAL, 13, 2.4);
  for (let y = 26; y <= 152; y++) for (let x = 0; x < 320; x++) { const a = y < 50 ? (50 - y) / 60 : y > 120 ? (y - 120) / 90 : 0; if (a > 0 && b4(x, y) < a * 1.6) tine(x, y, K, 0.3); }
  // matas en las juntas, una etiqueta clavada, el cable de la lámpara y las marcas de tiza de la restauración
  for (const [x, y] of [[38, 66], [252, 48], [292, 96], [70, 120]]) for (let k = -2; k <= 2; k++) R.linea(x, y, x + k * 2, y - 4 - Math.abs(k), H(k & 1 ? '#5a7a3a' : '#8aa04a'));
  etiqueta(232, 86, '25'); R.linea(240, 84, 240, 80, K);
  for (let x = 220; x <= 308; x++) ps(x, 116 + ri(Math.sin(x * 0.08) * 3), H('#2a2a2e'));
  for (const [x, y] of [[60, 98], [96, 70], [270, 66]]) { R.linea(x, y, x + 6, y, H('#f4f0e4')); R.linea(x + 3, y - 3, x + 3, y + 3, H('#f4f0e4')); }
  rr(102, 110, 218, 152, K); for (let y = 111; y <= 152; y++) for (let x = 103; x <= 217; x++) R.pset(x, y, rmp(TIE, 1.2 + (h2(x, y, 4) - 0.5) * 0.8 - (y - 111) / 60, x, y));
  tierra(0, 153, 319, 179, 22, TIE, 2.5); R.linea(0, 153, 319, 153, mez(TIE[0], K, 0.4));
  cubo(26, 170, '#2a2a2e'); cubo(46, 174, '#3a5a8a');
  // la paleta, la flecha del norte y la escala blanca y negra en el suelo
  R.poligono([[66, 172], [76, 166], [80, 170], [70, 176]], K); R.poligono([[67, 172], [76, 167], [79, 170], [70, 175]], H('#b8bec6')); R.linea(80, 170, 88, 168, H('#8a5a34'));
  for (let i = 0; i < 6; i++) rr(240 + i * 8, 166, 247 + i * 8, 169, H(i & 1 ? '#f4f0e4' : '#2a2a2e')); R.linea(240, 165, 287, 165, K); R.linea(240, 170, 287, 170, K);
  R.poligono([[296, 172], [300, 158], [304, 172], [300, 169]], K); R.poligono([[297, 171], [300, 160], [303, 171], [300, 168]], H('#f4f0e4'));
  // la lámpara de obra de la derecha
  rr(300, 120, 316, 132, K); rr(301, 121, 315, 131, H('#e8c020')); rr(303, 123, 313, 129, H('#fffbe0')); R.linea(308, 132, 308, 153, K); R.linea(302, 153, 314, 153, K);
});
const p3 = (t) => {
  fondo3();
  manchaLuz(250, 132, 80, 26, H('#fff0c0'), 0.16);
  const d = lerp(0.1, 1, ease(tramo(t, P3 + 0.1, W.LAID)));
  const s = T.d_estatua(R, 160, 150, { escala: 2, destapada: d, t });
  // el brazo con el cepillo sigue el filo de lo destapado y se va en «laid»
  const sale = tramo(t, W.LAID, W.LAID + 0.6), b = s.borde || [160, 132], bx = b[0] + lerp(0, 60, sale), by = b[1] + lerp(0, 50, sale) + ri(Math.sin(t * 14) * 2);
  if (sale < 1) { brazo(bx + 16, 182, bx + 8, by + 8, '#d86a4a', -1); cepillo(bx - 2, by + 2); }
  // la cota de cabeza a pies con «170»: se tiende en «lengthwise»
  const c = ease(tramo(t, W.LENGTHWISE - 0.1, W.ALONG + 0.3));
  if (c > 0) { const xe = ri(lerp(110, 210, c)); R.linea(110, 104, xe, 104, H('#fff4c0')); R.linea(110, 103, xe, 103, K); R.linea(110, 100, 110, 108, H('#fff4c0')); if (c >= 1) R.linea(210, 100, 210, 108, H('#fff4c0'));
    if (c >= 1) { const p = pop(t, W.ALONG + 0.3, 0.35); if (p > 0) { rr(144, 86, 176, 99, K); rr(145, 87, 175, 98, H('#e8c020')); R.numero('170', 160, 89, { centro: true }); } } }
  motasEn(t, 100, 60, 300, 150, 16, H('#f4e8c8'), 3);
};
// ── 4 · hace 11.600 años: dos cazadores meten la estatua en la base del muro; la cazadora deja la ofrenda ──────────
const CI_TARDE = pal(['#4a3a6a', '#7a4a6e', '#b8606a', '#e08a5e', '#f4b06a', '#f8cc8a']);
const NUBT = [pal(['#fcd8a8', '#e8a07a', '#a8606a']), pal(['#f8c89a', '#d8906e', '#985a66']), pal(['#f0b890', '#c88066', '#885062'])];
const fondo4 = () => fijo('p4', () => {
  cielo(0, 100, CI_TARDE);
  R.disco(62, 92, 11, H('#ffe0a0')); R.disco(62, 92, 8, H('#fff4d0'));
  for (let x = 0; x < 320; x++) { const yy = 84 + ri(Math.sin(x * 0.03) * 5 + Math.sin(x * 0.09 + 1) * 2); for (let y = yy; y <= 104; y++) R.pset(x, y, rmp(pal(['#4a3048', '#5e3a52', '#74465a']), 1.6 - (y - yy) / 14, x, y)); }
  tierra(0, 104, 319, 179, 41, pal(['#4a2e1e', '#6a4026', '#8a5632', '#a86e40', '#c48a52']), 2.6);
  T.d_pilar(R, 70, 122, { escala: 1.1, sombra: false, luz: 0.9, relieves: ['zorro'] }); T.d_pilar(R, 262, 124, { escala: 1.0, sombra: false, luz: 0.9 });
  hiladas(0, 94, 109, 150, 42, CALT, 7, 2.6); hiladas(231, 104, 319, 150, 43, CALT, 7, 2.6); hiladas(110, 110, 230, 150, 44, CALT, 7, 2.5);
  for (let x = 0; x < 106; x += 9) { const yy = 92 - ri(h2(x, 1, 45) * 3); rr(x, yy, x + 6 + ri(h2(x, 2, 45) * 3), 94, K); rr(x + 1, yy + 1, x + 5 + ri(h2(x, 2, 45) * 3), 93, CALT[3]); }
  rr(112, 116, 228, 150, K); for (let y = 117; y <= 150; y++) for (let x = 113; x <= 227; x++) R.pset(x, y, rmp(TIE, 0.9 - (y - 117) / 60 + (h2(x, y, 6) - 0.5) * 0.8, x, y));
  // cascotes, la cesta de piedras y los percutores delante
  for (let i = 0; i < 14; i++) { const x = ri(h2(i, 3, 46) * 300), y = 158 + ri(h2(i, 4, 46) * 18); rr(x, y, x + 3, y + 2, K); rr(x, y, x + 2, y + 1, CALT[3 + (i & 1)]); }
  R.disco(36, 164, 10, K); R.disco(36, 164, 9, H('#8a6a3e')); for (let k = 0; k < 7; k++) R.linea(28, 158 + k * 2, 44, 158 + k * 2, H(k & 1 ? '#6a4e2c' : '#a8844e')); for (let i = 0; i < 5; i++) R.disco(30 + i * 3, 156 - (i & 1), 2, CALT[3]);
});
const p4 = (t) => {
  fondo4();
  nubesVivas(t, [[20, 42, 34, 1.2, NUBT[0]], [180, 30, 26, 0.7, NUBT[1]], [300, 54, 40, 1.6, NUBT[2]]]);
  pajaro(120 + t * 9, 46 + Math.sin(t) * 2, t, H('#3a2a3a')); pajaro(134 + t * 9, 50, t, H('#3a2a3a'), 2);
  // la hoguera de la derecha con su humo
  for (let k = 0; k < 8; k++) { const u = (t * 0.35 + k / 8) % 1; tine(300 + Math.sin(u * 5 + k) * 6 * u, 158 - u * 80, H('#c8b8b0'), 0.45 * (1 - u)); }
  const fl = Math.sin(t * 17) > 0; R.poligono([[292, 168], [298, 156 - (fl ? 2 : 0)], [301, 162], [305, 154 + (fl ? 2 : 0)], [310, 168]], H('#f08a2a')); R.poligono([[296, 168], [300, 160], [304, 168]], H('#ffe080'));
  rr(288, 168, 314, 170, H('#3a2a1e'));
  // el porteador por lo alto del muro
  const up = (t - P4) * 0.08 % 1; R.actor(EL.cazadora2GB, ri(10 + up * 60), 92, t, { dir: 1, anda: true, sostiene: true });
  // la estatua: la traen entre dos, la bajan en «into its base» y se apartan en «purpose»
  const lleva = ease(tramo(t, P4 - 0.2, W.INTO)), baja = ease(tramo(t, W.INTO, W.BASE + 0.3)), aparta = ease(tramo(t, W.PURPOSE, W.PURPOSE + 0.9));
  const X = ri(lerp(112, 170, lleva)), yS = ri(lerp(140, 150, baja)), puesta = baja >= 1;
  if (puesta) T.d_estatua(R, X, yS, { escala: 2 });
  R.actor(EL.cazadorGB, X - 66 - ri(aparta * 16), 150, t, { dir: aparta > 0 && aparta < 1 ? -1 : 1, anda: (lleva > 0 && lleva < 1) || (aparta > 0 && aparta < 1), sostiene: puesta ? undefined : [X - 50, yS - 14], sonrisa: aparta > 0 });
  R.actor(EL.cazador2GB, X + 52 + ri(aparta * 18), 150, t, { dir: aparta > 0 && aparta < 1 ? 1 : -1, anda: (lleva > 0 && lleva < 1) || (aparta > 0 && aparta < 1), sostiene: puesta ? undefined : [X + 50, yS - 14], sonrisa: aparta > 0 });
  if (!puesta) T.d_estatua(R, X, yS, { escala: 2 });
  if (baja > 0.85 && baja < 1) for (let i = 0; i < 12; i++) ps(X - 50 + i * 9, 148 - (i & 1) * 3, H('#e8d0a0'));
  // la ofrenda: el cuenco con grano y una ramita, en «offering»
  const va = ease(tramo(t, W.PERHAPS - 0.7, W.OFFERING - 0.1)), xc = ri(lerp(300, 204, va)), deja = t > W.OFFERING;
  const c = R.actor(EL.cazadoraGB, xc, 150, t, { dir: -1, anda: va > 0 && va < 1, sostiene: deja ? undefined : true, sonrisa: deja });
  const cuenco = (x, y) => { R.poligono([[x - 5, y - 4], [x + 5, y - 4], [x + 3, y], [x - 3, y]], K); R.poligono([[x - 4, y - 3], [x + 4, y - 3], [x + 2, y - 1], [x - 2, y - 1]], CALT[3]); rr(x - 4, y - 5, x + 4, y - 4, H('#e8c070')); R.linea(x + 1, y - 5, x + 4, y - 10, H('#5a8a3e')); ps(x + 4, y - 11, H('#e8603a')); };
  if (deja) { cuenco(196, 154); const g = pop(t, W.OFFERING, 0.4); if (g > 0 && t < W.OFFERING + 1.2) destello(200, 142, ri(2 + g * 3)); } else cuenco(c.mano[0], c.mano[1] + 2);
};
// ── 5 · el muro entero desde la otra pasarela, de día: la foto cenital desde la escalera, la escala y el «1» ────────
const fondo5 = () => fijo('p5', () => {
  membrana(0, 22, 3);
  tierra(0, 26, 319, 72, 51, pal(['#6a4a32', '#8a6440', '#a8804e', '#c09a62', '#d4b07a']), 2.6);
  rr(0, 26, 319, 36, H('#8a6a44')); for (let x = 0; x < 320; x += 3) R.linea(x, 30, x + 2, 30, H('#6a5032')); R.linea(0, 37, 319, 37, K);
  for (let x = 2; x < 320; x += 16) { rr(x, 26, x, 36, H('#5a4028')); } R.linea(0, 27, 319, 27, H('#b08a5a'));
  T.d_pilar(R, 96, 108, { escala: 0.9, sombra: false, luz: 0.6 }); T.d_pilar(R, 228, 110, { escala: 1.0, sombra: false, luz: 0.6, relieves: ['jabali'] });
  hiladas(0, 72, 319, 140, 52, CAL, 6, 2.4);
  rr(126, 122, 194, 140, K); for (let y = 123; y <= 140; y++) for (let x = 127; x <= 193; x++) R.pset(x, y, rmp(TIE, 1.0 + (h2(x, y, 7) - 0.5) * 0.8, x, y));
  T.d_estatua(R, 160, 140, { escala: 1 });
  tierra(0, 141, 319, 179, 53, pal(['#5a4030', '#7a5a40', '#9a7652', '#b49068', '#c8a880']), 2.6); R.linea(0, 141, 319, 141, mez(CAL[0], K, 0.4));
  for (const x of [30, 262]) { rr(x - 2, 22, x + 2, 150, K); rr(x - 1, 22, x + 1, 150, H('#9aa0a8')); R.linea(x - 1, 22, x - 1, 150, H('#d0d4da')); rr(x - 5, 148, x + 5, 151, K); }
  // la carretilla, los cubos y la criba
  R.poligono([[6, 156], [40, 156], [34, 168], [12, 168]], K); R.poligono([[7, 157], [39, 157], [33, 167], [13, 167]], H('#3a7a5a')); R.disco(22, 172, 4, K); R.disco(22, 172, 3, H('#3a3a3a')); R.linea(39, 157, 52, 164, K);
  cubo(66, 170, '#2a2a2e'); cubo(80, 174, '#c86a3a');
  R.disco(290, 166, 10, K); R.disco(290, 166, 9, H('#8a6a3e')); R.disco(290, 166, 7, H('#5a5a5a')); for (let k = -6; k <= 6; k += 2) R.linea(284, 166 + k, 296, 166 + k, H('#7a7a7a'));
  // la escalera de tijera
  R.linea(206, 160, 216, 124, K); R.linea(207, 160, 217, 124, H('#c8ccd2')); R.linea(228, 160, 218, 124, K); R.linea(227, 160, 217, 124, H('#a8acb2'));
  for (let k = 0; k < 4; k++) { const y = 152 - k * 8; R.linea(ri(208 + k * 2.4), y, ri(226 - k * 2.4), y, H('#9aa0a8')); }
});
const p5 = (t) => {
  fondo5();
  // visitantes diminutos que cruzan la pasarela del fondo
  for (let k = 0; k < 4; k++) { const x = ((t * (6 + k) + k * 90) % 360) - 20, c = H(['#c83a3a', '#3a6ac8', '#e8c040', '#3a9a5a'][k]); rr(x, 29, x + 1, 32, c); ps(x, 28, H('#f0c8a0')); ps(x + 1, 28, H('#f0c8a0')); }
  const flash = tramo(t, W.FIRST, W.FIRST + 0.15) - tramo(t, W.FIRST + 0.15, W.FIRST + 0.5);
  // la arqueóloga sostiene el jalón de escala junto a la estatua; la del laboratorio apunta; el fotógrafo dispara en «first»
  const a = R.actor(EL.arqueologaGB, 100, 150, t, { dir: 1, sostiene: [117, 132], habla: t > W.APPEARED && Math.sin(t * 8) > 0, sonrisa: t > W.FIRST + 0.4 });
  for (let k = 0; k < 6; k++) rr(a.mano[0], a.mano[1] - 6 + k * 4, a.mano[0] + 1, a.mano[1] - 3 + k * 4, H(k & 1 ? '#f4f0e4' : '#c83a3a')); R.linea(a.mano[0] - 1, a.mano[1] - 6, a.mano[0] - 1, a.mano[1] + 18, K);
  const f = R.actor(EL.arqueologoGB, 212, 124, t, { dir: -1, sostiene: [205, 112] });
  camara(f.mano[0] - 2, f.mano[1], cl(flash));
  const l = R.actor(EL.laboratorioGB, 240, 150, t, { dir: -1, sostiene: t < W.ANYTHING ? true : undefined, dedo: t >= W.ANYTHING, sorpresa: t > W.FIRST && t < W.FIRST + 0.8 });
  if (t < W.ANYTHING) { rr(l.mano[0] - 6, l.mano[1] - 4, l.mano[0] + 1, l.mano[1] + 5, K); rr(l.mano[0] - 5, l.mano[1] - 3, l.mano[0], l.mano[1] + 4, H('#f4f0e4')); }
  // las esquinas doradas sobre la estatua y el «1» que salta en «first»
  const g = pop(t, W.FIRST, 0.35);
  if (g > 0) { const on = Math.floor(t * 4) % 2 ? H('#ffd84a') : H('#f0a020'), e = ri((1 - Math.min(1, g)) * 6);
    for (const [x, y, sx, sy] of [[122 - e, 118 - e, 1, 1], [198 + e, 118 - e, -1, 1], [122 - e, 144 + e, 1, -1], [198 + e, 144 + e, -1, -1]]) { rr(Math.min(x, x + sx * 6), y, Math.max(x, x + sx * 6), y, on); rr(x, Math.min(y, y + sy * 6), x, Math.max(y, y + sy * 6), on); }
    const yN = ri(lerp(112, 100, Math.min(1, g))); R.disco(160, yN - 6, 12, K); R.disco(160, yN - 6, 11, H('#e8c020')); R.disco(160, yN - 6, 9, H('#ffe070')); R.numero('1', 161, yN - 12, { tam: 16, centro: true }); }
};
// ── 6 · de noche, la lámpara de obra sobre la estatua; el arqueólogo se rasca la cabeza y piensa en quien la puso ──
const fondo6 = () => fijo('p6', () => {
  cielo(0, 100, pal(['#0a0c1e', '#10142a', '#161c36', '#1e2644', '#283052']));
  estrellas(4, 80, 70, 6);
  R.disco(240, 30, 7, H('#e8e4cc')); R.disco(242, 28, 6, H('#161c36'));
  for (let x = 0; x < 320; x++) { const yy = 78 + ri(Math.sin(x * 0.02 + 1) * 6 + Math.sin(x * 0.07) * 2); for (let y = yy; y <= 110; y++) R.pset(x, y, rmp(pal(['#0c0e18', '#121624', '#1a2030']), 1 - (y - yy) / 30 + (h2(x, y, 6) - 0.5) * 0.4, x, y)); }
  for (let x = 40; x <= 120; x++) { const y = 80 + ri(Math.abs(Math.sin((x - 40) * Math.PI / 16)) * 2); ps(x, y, H('#8a8ea0')); ps(x, y - 1, H('#5a5e70')); }
  tierra(0, 110, 319, 179, 61, pal(['#100c10', '#1a1418', '#261e22', '#32282a', '#40343a']), 2.0, CALN);
  hiladas(150, 84, 319, 150, 62, CALN, 8, 2.4);
  rr(196, 130, 276, 150, K); for (let y = 131; y <= 150; y++) for (let x = 197; x <= 275; x++) R.pset(x, y, rmp(TIE, 0.4 + (h2(x, y, 7) - 0.5) * 0.6, x, y));
  T.d_estatua(R, 236, 150, { escala: 1 });
  // la mesa de campo con el termo y la silla plegable
  rr(46, 136, 98, 139, K); rr(47, 137, 97, 138, H('#5a6a7a')); R.linea(50, 139, 60, 160, K); R.linea(94, 139, 84, 160, K); R.linea(60, 139, 50, 160, K); R.linea(84, 139, 94, 160, K);
  rr(58, 120, 66, 136, K); rr(59, 121, 65, 135, H('#3a6a9a')); rr(59, 121, 65, 123, H('#c8ccd2')); rr(72, 129, 80, 136, K); rr(73, 130, 79, 135, H('#c8c4b8'));
  // la lámpara de obra en su trípode
  R.linea(298, 96, 290, 150, K); R.linea(298, 96, 306, 150, K); R.linea(298, 96, 298, 150, K);
  rr(288, 88, 306, 100, K); rr(289, 89, 305, 99, H('#e8c020')); rr(290, 95, 304, 99, H('#fffbe0'));
});
const p6 = (t) => {
  fondo6();
  const fl = 0.85 + Math.sin(t * 23) * 0.04;
  haz(296, 98, 236, 150, 6, 46, H('#fff0c0'), 0.16 * fl); manchaLuz(236, 140, 56, 16, H('#ffe8b0'), 0.22 * fl);
  for (let k = 0; k < 3; k++) { const a = t * (3 + k) + k * 2; ps(297 + Math.cos(a) * (6 + k * 3), 94 + Math.sin(a * 1.3) * 5, H('#f4f0e4')); }
  for (let k = 0; k < 5; k++) { const u = (t * 0.4 + k / 5) % 1; tine(76 + Math.sin(u * 6 + k) * 2, 128 - u * 16, H('#d8d8e0'), 0.5 * (1 - u)); }
  // el arqueólogo mira la estatua, se rasca la cabeza («nobody knows») y al final se encoge de hombros
  const encoge = t > W.MEANT - 0.1;
  R.actor(EL.arqueologoGB, 122, 154, t, { dir: 1, dedo: !encoge && t > W.NOBODY + 0.2 && Math.floor(t * 3) % 2 === 0, brazos: encoge, sorpresa: false });
  if (t > W.NOBODY && t < W.KNOWS + 1.2) R.bocadillo(130, 122, { icono: '?' });
  // el globo: alguien de hace 11.600 años mete la estatua en el muro, con su «?»
  const s = ease(tramo(t, W.KNOWS - 0.05, W.KNOWS + 0.45));
  burbujas([[120, 120, 1], [112, 110, 2], [102, 100, 3]], s);
  globo(66, 62, 48, 30, s, () => {
    for (let y = 30; y <= 94; y++) for (let x = 14; x <= 118; x++) R.pset(x, y, rmp(CI_TARDE, (y - 30) / 52 * 5.6, x, y)); for (let x = 14; x <= 118; x++) { const yy = 70 + ri(Math.sin(x * 0.12) * 2); for (let y = yy; y <= 94; y++) R.pset(x, y, rmp(pal(['#5a3a2a', '#7a4e34', '#9a6842']), 2 - (y - yy) / 8, x, y)); }
    hiladas(76, 72, 118, 86, 63, CALT, 4, 2.5); rr(80, 82, 110, 86, mez(TIE[0], K, 0.3));
    R.actor(EL.cazadorGB, 44, 86, t, { dir: 1, sostiene: [62, 79] }); T.d_estatua(R, 76, 84, { escala: 1 });
    if (s >= 1) R.bocadillo(52, 54, { icono: '?' });
  });
};
'''

# ── frase «karahan»: la llanura, la colina nueva, el mapa, la sala de roca, los pilares que brotan y la cara ─────────
PLANOS_B = r'''
// ── 7 · la llanura de Harrán al atardecer: Göbekli Tepe solo… y en «alone» se encienden las otras colinas ─────────
const CI_OCASO = pal(['#3a4a7a', '#566898', '#8a88a8', '#d8a08a', '#f2c08c', '#f8d8a4']);
const LOMAS = [[22, 85], [56, 87], [88, 88], [118, 89], [206, 87], [234, 85], [262, 88], [292, 86], [312, 88]];
const fondo7 = () => fijo('p7', () => {
  cielo(0, 92, CI_OCASO);
  R.disco(252, 90, 9, H('#ffe0a0')); R.disco(252, 90, 7, H('#fff4d0'));
  for (let x = 0; x < 320; x++) { let yy = 92; for (const [lx, ly] of LOMAS) yy = Math.min(yy, ly + ((x - lx) / 9) ** 2); yy = ri(yy); for (let y = yy; y <= 94; y++) R.pset(x, y, rmp(pal(['#4a4a6a', '#5a5878', '#6a6684']), 1.5 - (y - yy) / 6, x, y)); }
  // los campos en franjas que se acercan (rastrojo dorado, tierra arada, verde) con lindes y pistacheros
  const CAMP = [pal(['#8a6a3a', '#a8844a', '#c49e5a', '#d8b46e']), pal(['#5a3a26', '#74503a', '#8e6648', '#a87e58']), pal(['#4a5a2a', '#5e7032', '#748a3e', '#8aa04a'])];
  for (let y = 94; y <= 179; y++) { const p = (y - 92) / 88, fila = Math.floor(Math.pow(p, 0.6) * 9);
    for (let x = 0; x < 320; x++) { const col = Math.floor((x - 160) / (40 + p * 140) + fila * 1.7 + 50), r = CAMP[(col * 7 + fila * 3) % 3], surco = ((x - 160) * 0.02 / (p + 0.1) + y * 0.9) % 3 < 1;
      R.pset(x, y, rmp(r, 1.6 + p * 1.2 - (surco ? 0.6 : 0) + (h2(x >> 1, y, 3) - 0.5) * 0.6, x, y)); } }
  for (let i = 0; i < 26; i++) { const p = h2(i, 1, 71) ** 1.5, y = ri(96 + p * 60), x = ri(h2(i, 2, 71) * 320), r = 1 + ri(p * 3); R.disco(x, y - r, r + 1, H('#2a3a1e')); R.disco(x, y - r - 1, r, H('#4a6a2e')); }
  // el cerro de Göbekli Tepe con la cubierta blanca
  for (let x = 96; x <= 228; x++) { const yy = ri(74 + ((x - 162) / 22) ** 2 * 3.2); for (let y = yy; y <= 120; y++) R.pset(x, y, rmp(pal(['#6a4a3a', '#8a6248', '#a87c58', '#c49868']), 2.6 - (y - yy) / 14 + (h2(x, y, 72) - 0.5) * 0.6 - (x > 170 ? 0.5 : 0), x, y)); }
  for (let x = 146; x <= 178; x++) { const yy = 70 + ri(Math.abs(Math.sin((x - 146) * Math.PI / 8)) * 2); R.linea(x, yy, x, 76, H(x < 160 ? '#f8f4ec' : '#d8d2c8')); ps(x, yy, H('#ffffff')); } R.linea(146, 77, 178, 77, H('#7a6a5a'));
  rr(126, 104, 138, 108, H('#c8c0b0')); rr(128, 102, 134, 104, H('#e8e4dc'));
  for (let k = 0; k < 4; k++) for (let x = 104 + k * 6; x <= 220 - k * 6; x++) if (h2(x >> 2, k, 76) > 0.3) ps(x, ri(84 + k * 9 + ((x - 162) / 26) ** 2 * 2), H('#7a5438'));
  for (let i = 0; i < 18; i++) { const x = ri(110 + h2(i, 1, 77) * 104), y = ri(80 + ((x - 162) / 22) ** 2 * 3.2 + 4 + h2(i, 2, 77) * 30); if (y > 118) continue; R.disco(x, y, 2, H('#3a4a22')); ps(x - 1, y - 1, H('#6a8a3a')); }
  for (let y = 78; y <= 118; y++) { const x = ri(150 + (y - 78) * 0.6 + Math.sin(y * 0.4) * 6); ps(x, y, H('#d8c0a0')); }
  // la carretera de tierra y la peña de delante (x 200–319)
  for (let y = 120; y <= 179; y++) { const c = lerp(150, 90, (y - 120) / 60), w = lerp(2, 12, (y - 120) / 60); for (let x = ri(c - w); x <= ri(c + w); x++) R.pset(x, y, rmp(pal(['#9a7a5a', '#b8966e', '#d0b088']), 1.4 + (h2(x, y, 73) - 0.5), x, y)); }
  for (let y = 128; y <= 179; y++) { const x0 = ri(206 + (179 - y) * 0.9 + Math.sin(y * 0.3) * 3); roca(x0, y, 319, y, 74, CALT, 2.2 + (y < 134 ? 1 : 0), 7); R.pset(x0, y, K); }
  for (let i = 0; i < 10; i++) { const x = ri(6 + h2(i, 3, 75) * 180), y = 168 + ri(h2(i, 4, 75) * 10); for (let k = -2; k <= 2; k++) R.linea(x, y, x + k * 2, y - 6 - Math.abs(k), H(k & 1 ? '#6a7a3a' : '#9aa04a')); }
});
const p7 = (t) => {
  fondo7();
  nubesVivas(t, [[30, 44, 30, 0.8, NUBT[0]], [170, 56, 24, 1.2, NUBT[1]], [250, 64, 34, 0.5, NUBT[2]]]);
  pajaro(60 + t * 7, 60, t, H('#3a3048')); pajaro(72 + t * 7, 64, t, H('#3a3048'), 1); pajaro(200 - t * 4, 70, t, H('#3a3048'), 2);
  // las luces de las otras colinas que se encienden una a una en «no longer alone»
  LOMAS.forEach(([x, y], k) => { const g = pop(t, W.ALONE - 0.25 + k * 0.2, 0.3); if (g <= 0) return; const lat = 0.75 + Math.sin(t * 4 + k) * 0.25; manchaLuz(x, y - 2, 12 * lat, 7 * lat, H('#ffd870'), 0.7); R.disco(x, y - 2, 2, H('#ffe890')); destello(x, y - 2, 2, H('#fff4c0')); });
  if (t > W.ALONE) { const lat = 0.7 + Math.sin(t * 4) * 0.3; manchaLuz(162, 72, 12 * lat, 6 * lat, H('#ffd870'), 0.45); }
  // el pastorcillo en la peña con sus cabras: señala en «alone»
  cabra(226, 142, -1, t, 1); cabra(ri(306 - (t - P7) * 5), 166, -1, t, 2, '#8a6a4a');
  R.actor(EL.ninoGB, 252, 140, t, { dir: -1, dedo: t > W.ALONE - 0.1, sonrisa: t > W.ALONE + 0.3, sorpresa: t > W.NO2 && t < W.ALONE + 0.2 });
};
// ── 8 · otra colina del contorno, excavándose ahora: catas, lona de sombra, la camioneta y el «10+» ──────────────
const pendiente = (x) => 64 + x * 0.15;
const CATAS = [[52, 0], [100, 0], [148, 0], [76, 1], [124, 1], [172, 1]];
const fondo8 = () => fijo('p8', () => {
  cielo(0, 74, CI_DIA);
  for (let x = 0; x < 320; x++) { const yy = 58 + ri(Math.sin(x * 0.025 + 2) * 5 + Math.sin(x * 0.08) * 2); for (let y = yy; y <= 80; y++) R.pset(x, y, rmp(pal(['#7a88a0', '#8a98ae', '#9aa8bc']), 1.6 - (y - yy) / 10, x, y)); }
  for (let x = 0; x < 320; x++) for (let y = 70; y < ri(pendiente(x)); y++) R.pset(x, y, rmp(pal(['#8a8a6a', '#a09c74', '#b4ae84', '#c4bc94']), 1 + (y - 70) / 20 + (h2(x >> 2, y, 85) - 0.5) * 0.6 + ((x >> 4) % 3 === 0 ? 0.4 : 0), x, y));
  const LAD = pal(['#8a6a42', '#a8844e', '#c0a064', '#d4b87e', '#e4cc96']), ladera = (x, y) => R.pset(x, y, rmp(LAD, 3.0 - (y - pendiente(x)) / 70 + (h2(x >> 1, y, 81) - 0.5) * 0.9 + ((x * 0.4 + y) % 7 < 1 ? -0.5 : 0), x, y));
  for (let x = 0; x < 320; x++) { const yy = ri(pendiente(x)); for (let y = yy; y <= 152; y++) ladera(x, y); }
  // la cabeza de un pilar en T que asoma en la cata del centro de arriba (lo que queda bajo la cata se vuelve a cubrir)
  { const yc = ri(pendiente(148) + 27); T.d_pilar(R, 163, ri(pendiente(148) + 58), { escala: 0.9, sombra: false, luz: 0.8 }); for (let y = yc; y <= 152; y++) for (let x = 140; x <= 190; x++) ladera(x, y); }
  for (let i = 0; i < 40; i++) { const x = ri(h2(i, 1, 82) * 318), y = ri(pendiente(x) + 6 + h2(i, 2, 82) * 80); if (y > 150) continue; R.linea(x, y, x - 1, y - 3, H('#7a6a3a')); R.linea(x, y, x + 1, y - 3, H('#9a8a4a')); }
  // las catas con sus testigos, cordeles y estacas, y la tierra sacada al lado
  for (const [x, f] of CATAS) { const y = ri(pendiente(x) + 18 + f * 26), w = 30, hh = 12;
    R.poligono([[x - 6, y + hh + 2], [x + w + 2, y + hh + 2], [x + w + 12, y + hh + 5], [x - 10, y + hh + 5]], H('#c4a272'));
    rr(x, y, x + w, y + hh, mez(TIE[1], K, 0.2)); for (let yy = y + 1; yy < y + hh; yy++) for (let xx = x + 1; xx < x + w; xx++) R.pset(xx, yy, rmp(TIE, 2.2 - (yy - y) / 6 + (h2(xx, yy, 83) - 0.5) * 0.8, xx, yy));
    rr(x + 1, y + hh - 3, x + w - 1, y + hh - 1, TIE[4]); R.linea(x, y, x + w, y, H('#f4f0e4')); R.linea(x, y + hh, x + w, y + hh, H('#f4f0e4'));
    for (const [sx, sy] of [[x, y], [x + w, y], [x, y + hh], [x + w, y + hh]]) { rr(sx, sy - 4, sx, sy, H('#8a5a34')); ps(sx, sy - 4, H('#e83a3a')); } }
  // la cabeza de un pilar en T que asoma en la cata del centro
  // la lona de sombra sobre dos postes y la tienda blanca
  R.linea(196, 76, 196, 112, K); R.linea(240, 82, 240, 120, K); R.poligono([[194, 74], [242, 80], [236, 88], [200, 84]], K); R.poligono([[195, 75], [241, 81], [235, 87], [200, 83]], H('#f4f0e4')); R.linea(200, 83, 235, 87, H('#c8c4b8'));
  R.poligono([[252, 128], [272, 104], [296, 104], [312, 128]], K); R.poligono([[253, 127], [272, 105], [295, 105], [311, 127]], H('#ece8dc')); R.poligono([[272, 105], [282, 127], [262, 127]], H('#c8c4b8')); rr(270, 116, 276, 127, H('#6a5a48'));
  // el camino de tierra de delante
  for (let y = 152; y <= 179; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#8a6a48', '#a8845a', '#c09c70', '#d4b488']), 2.2 + (h2(x >> 2, y, 84) - 0.5) * 0.8 - ((y === 160 || y === 172) && (x % 9 < 6) ? 0.9 : 0), x, y));
  R.linea(0, 152, 319, 152, H('#6a5032'));
});
const p8 = (t) => {
  fondo8();
  nubesVivas(t, [[20, 30, 26, 1.4, NUB[0]], [160, 42, 20, 0.9, NUB[1]], [260, 26, 30, 0.6, NUB[2]]]);
  pajaro(100 + t * 10, 40, t, H('#3a3a4a'));
  // banderitas en las lomas del fondo: «similar places»
  for (let k = 0; k < 9; k++) { const g = pop(t, W.SIMILAR + k * 0.12, 0.25); if (g <= 0) continue; const x = 18 + k * 34, y = 60 + ri(Math.sin(x * 0.025 + 2) * 5 + Math.sin(x * 0.08) * 2) - 1; R.linea(x, y, x, y - ri(6 * Math.min(1, g)), K); if (g >= 1) { const o = Math.floor(t * 6 + k) % 2; rr(x + 1, y - 6, x + 3 + o, y - 4, H('#e83a3a')); } }
  // los que trabajan: ella rasca en la primera cata, el obrero sube cubos, él apunta en la tablilla
  const fr = Math.sin(t * 11); const ya = ri(pendiente(64) + 18) ;
  const a = R.actor(EL.arqueologaGB, 40, ya, t, { dir: 1, sostiene: [58 + ri(fr * 2), ya - 4] }); R.linea(a.mano[0], a.mano[1], a.mano[0] + 4, a.mano[1] + 3, H('#b8bec6'));
  const u = ((t - P8) * 0.22) % 1, ida = u < 0.5, xo = ri(ida ? lerp(110, 168, u * 2) : lerp(168, 110, (u - 0.5) * 2));
  const ob = R.actor(EL.campesinoGB, xo, ri(pendiente(xo + 7) + 44), t, { dir: ida ? 1 : -1, anda: true, sostiene: true }); cubo(ob.mano[0] + (ida ? 2 : -2), ob.mano[1] + 10);
  const b = R.actor(EL.arqueologoGB, 204, ri(pendiente(211) + 46), t, { dir: -1, sostiene: true, dedo: t > W.TEN - 0.1 && t < W.TEN + 1.2 });
  if (!(t > W.TEN - 0.1 && t < W.TEN + 1.2)) { rr(b.mano[0] - 6, b.mano[1] - 4, b.mano[0], b.mano[1] + 4, K); rr(b.mano[0] - 5, b.mano[1] - 3, b.mano[0] - 1, b.mano[1] + 3, H('#f4f0e4')); }
  // la camioneta llega por el camino levantando polvo
  const c = ease(tramo(t, P8, W.TEN - 0.2)), xc = ri(lerp(-60, 30, c));
  for (let k = 0; k < 8; k++) { const v = (t * 1.5 + k / 8) % 1; if (c < 1 || v < 0.5) tine(xc - 4 - v * 30, 170 - v * 10 - k % 3, H('#d8c0a0'), 0.5 * (1 - v)); }
  camioneta(xc, 172, 1, t, c > 0 && c < 1, (x, y) => { caja(x - 4, y, '#3a6ac8', null, 12, 6); caja(x + 10, y, '#d8782a', null, 12, 6); });
  // el «10+» en el cielo, en «ten»
  const g = pop(t, W.TEN, 0.35); if (g > 0) { const yN = ri(lerp(44, 32, Math.min(1, g))); R.numero('10', 206, yN, { tam: 16, centro: true }); rr(226, yN + 6, 236, yN + 9, K); rr(229, yN + 3, 233, yN + 12, K); rr(227, yN + 7, 235, yN + 8, H('#ffe070')); rr(230, yN + 4, 232, yN + 11, H('#ffe070')); }
};
// ── 9 · el mapa de Taş Tepeler (hoy·karahan·mapa, 2.º uso): se encienden las doce y la mano clava la última ───────
const p9 = (t) => {
  const m = T.hoy(R, t, { encuadre: 'karahan', camara: 'mapa', encendidas: ease(tramo(t, P9 + 0.2, W.HILLS2 + 0.1)) });
  const s = (m && m.sitios && m.sitios[10]) || [160, 150], v = ease(tramo(t, W.CALL, W.STONE)) - ease(tramo(t, W.HILLS2 + 0.5, P10));
  if (t > W.STONE) { R.disco(s[0], s[1] - 3, 2, K); R.disco(s[0], s[1] - 3, 1, H('#3a8ad8')); R.linea(s[0], s[1] - 1, s[0], s[1], K); }
  if (v > 0) { const x1 = s[0] + 10, y1 = s[1] - 2 + ri((1 - v) * 40); brazo(x1 + 22, 200, x1, y1, '#5a7a9a', -1); if (t <= W.STONE) { R.disco(x1 - 10, y1 - 4, 2, K); R.disco(x1 - 10, y1 - 4, 1, H('#3a8ad8')); } }
};
// ── 10 · Karahan Tepe, la sala tallada en la roca (hoy·karahan): ella baja por la escalera; él señala los pilares ──
const p10 = (t) => {
  T.hoy(R, t, { encuadre: 'karahan' });
  const baja = ease(tramo(t, P10 + 0.1, W.ROCK)), anda = tramo(t, W.ROCK + 0.15, W.PILLARS + 0.3);
  const xa = ri(lerp(7, 52, anda)), ya = ri(lerp(74, 150, baja));
  R.actor(EL.arqueologaGB, xa, ya, t, { dir: 1, anda: (baja > 0 && baja < 1) || (anda > 0 && anda < 1), sostiene: baja < 1 ? [xa + 9, ya - 15] : undefined, sonrisa: anda >= 1, sorpresa: t > W.PILLARS + 0.2 && t < W.PILLARS + 1.0 });
  R.actor(EL.arqueologoGB, 92, 150, t, { dir: t > W.WITH ? 1 : -1, dedo: t > W.WITH, habla: t > W.THERES && t < W.WITH && Math.sin(t * 8) > 0, sonrisa: t > W.PILLARS });
  T.hoyDelante(R, t, { encuadre: 'karahan' });
};
// ── 11 · los pilares que brotan del suelo de roca (de cerca) y la cabeza tallada que vigila en la pared ──────────
const PILARES11 = [[136, 140, 14, 58], [180, 140, 16, 70], [222, 141, 12, 50], [262, 142, 16, 62], [298, 142, 12, 44], [112, 170, 20, 92], [198, 174, 22, 104], [252, 176, 18, 80]];
const cabezaTallada = (cx, cy, luz, CAL = KAR) => {
  // el hueco de la pared y el cuello que sale de la roca
  for (let y = cy - 24; y <= cy + 34; y++) for (let x = cx - 20; x <= cx + 20; x++) { const d = ((x - cx) / 20) ** 2 + ((y - cy - 4) / 30) ** 2; if (d < 1) tine(x, y, K, 0.35 * (1 - d) + 0.1); }
  for (let y = cy + 12; y <= cy + 34; y++) for (let x = cx - 7; x <= cx + 7; x++) R.pset(x, y, rmp(CAL, 2.4 + luz - (x - cx) / 7 * 1.2 + (h2(x, y, 5) - 0.5) * 0.5, x, y));
  for (let y = cy - 17; y <= cy + 17; y++) for (let x = cx - 13; x <= cx + 13; x++) { const d = ((x - cx) / 13) ** 2 + ((y - cy) / 17) ** 2; if (d > 1) continue;
    R.pset(x, y, d > 0.86 ? mez(CAL[0], K, 0.4) : rmp(CAL, 2.9 + luz - (x - cx) / 13 * 1.4 - (y - cy) / 17 * 0.4 + (h2(x, y, 6) - 0.5) * 0.5, x, y)); }
  rr(cx - 10, cy - 6, cx + 10, cy - 5, mez(CAL[0], K, 0.2)); rr(cx - 10, cy - 7, cx + 10, cy - 7, CAL[5]);
  for (const ex of [cx - 6, cx + 5]) { rr(ex - 2, cy - 3, ex + 2, cy, K); rr(ex - 1, cy - 2, ex + 1, cy - 1, mez(CAL[0], K, 0.6)); }
  R.linea(cx, cy - 4, cx - 1, cy + 5, CAL[5]); R.linea(cx + 1, cy - 4, cx + 2, cy + 5, CAL[1]); rr(cx - 2, cy + 6, cx + 3, cy + 6, mez(CAL[0], K, 0.4));
  rr(cx - 5, cy + 10, cx + 5, cy + 10, K); rr(cx - 4, cy + 11, cx + 4, cy + 11, CAL[4]);
};
const fondo11 = () => fijo('p11', () => {
  cielo(0, 16, CI_DIA); for (let x = 0; x < 320; x++) { const yy = 14 + ri(Math.sin(x * 0.07) * 2 + h2(x >> 2, 0, 9) * 2); for (let y = yy; y <= 22; y++) R.pset(x, y, y === yy ? H('#6a8a3a') : H('#4a5a2a')); }
  roca(0, 21, 319, 112, 71, KAR, 2.3, 8, 40);
  for (let y = 21; y <= 112; y++) for (let x = 0; x < 320; x++) if (b4(x, y) < (y - 21) / 150 + x / 1000) tine(x, y, H('#2a1a10'), 0.25);
  // raíces y hierbas que cuelgan del borde, dos hornacinas talladas y las marcas del cincel
  for (let i = 0; i < 16; i++) { const x = ri(8 + h2(i, 1, 78) * 300), l = 4 + ri(h2(i, 2, 78) * 14); for (let k = 0; k < l; k++) ps(x + ri(Math.sin(k * 0.6 + i) * 1.5), 22 + k, k & 1 ? H('#5a4a2a') : H('#7a6a3a')); }
  for (const [x, y] of [[150, 52], [236, 60]]) { rr(x - 8, y - 12, x + 8, y + 10, H('#3a2818')); rr(x - 7, y - 11, x + 7, y + 9, H('#5a4028')); rr(x - 7, y - 11, x + 7, y - 9, H('#2a1a10')); R.disco(x, y - 11, 7, H('#3a2818')); R.disco(x, y - 10, 6, H('#5a4028')); rr(x - 6, y + 6, x + 6, y + 9, KAR[3]); }
  for (let i = 0; i < 60; i++) { const x = ri(h2(i, 3, 79) * 318), y = ri(26 + h2(i, 4, 79) * 80); R.linea(x, y, x + 2, y + 1, KAR[0]); }
  cabezaTallada(60, 62, 0);
  rr(0, 112, 319, 123, K); roca(0, 113, 319, 116, 73, KAR, 3.6, 20); roca(0, 117, 319, 123, 74, KAR, 1.6, 20);
  roca(0, 124, 319, 179, 75, KAR, 3.0, 13, 80);
  for (let i = 0; i < 40; i++) { const x = ri(h2(i, 1, 76) * 318), y = ri(126 + h2(i, 2, 76) * 52); rr(x, y, x + 2, y + 1, KAR[1]); ps(x, y, KAR[5]); }
  // el charco que refleja el cielo, la criba, un cubo y la regla de escala por el suelo
  for (let y = 150; y <= 160; y++) for (let x = 12; x <= 70; x++) { const d = ((x - 41) / 29) ** 2 + ((y - 155) / 5) ** 2; if (d < 1) R.pset(x, y, rmp(CI_DIA, 3.4 - d * 2, x, y)); }
  R.disco(290, 170, 10, K); R.disco(290, 170, 9, H('#8a6a3e')); R.disco(290, 170, 7, H('#5a5a5a')); for (let k = -6; k <= 6; k += 2) R.linea(284, 170 + k, 296, 170 + k, H('#7a7a7a'));
  for (let k = 0; k < 6; k++) rr(150 + k * 6, 176, 155 + k * 6, 178, H(k & 1 ? '#f4f0e4' : '#2a2a2e'));
});
const p11 = (t) => {
  fondo11();
  // el sol entra por arriba a la izquierda y, en «watched over by a human head», llega a la cabeza
  const vigila = ease(tramo(t, W.WATCHED - 0.2, W.HEAD));
  haz(30 + vigila * 10, 0, 60, 112, 14, 30, H('#fff4d0'), 0.07 + vigila * 0.04); if (vigila > 0) manchaLuz(60, 62, 22, 26, H('#fff4d0'), 0.1 * vigila);
  motasEn(t, 20, 30, 110, 120, 14, H('#fff8e0'), 4);
  // la lagartija que cruza el banco
  const lz = ((t - P11) * 22) % 360; lagartija(320 - lz, 113, -1);
  // los pilares brotan del suelo uno tras otro (de «as if they grew» a «ground»)
  PILARES11.forEach(([x, yb, w, hh], k) => { const u = ease(tramo(t, P11 + 0.05 + k * 0.24, W.GROUND + 0.2 + k * 0.1)), alto = ri(hh * (0.04 + 0.96 * u));
    pilarR(x, yb, w, alto, k + 3, KAR, 0.5 - k * 0.04); if (alto > 4) for (let i = 1; i < alto * 0.5; i++) if (b4(x + w / 2 + i, yb) < 0.6) tine(x + w / 2 + i, yb - 1, H('#2a1a10'), 0.3);
    if (u > 0 && u < 1) for (let i = 0; i < 7; i++) { const v = (t * 3 + i / 7) % 1; tine(x - w / 2 - 3 + i * (w + 6) / 7, yb - v * 6, H('#e8dcc0'), 0.6 * (1 - v)); } });
  // la arqueóloga enciende la linterna y la apunta a la cabeza («human head»)
  const on = t > W.HUMAN - 0.1, a = R.actor(EL.arqueologaGB, 72, 172, t, { dir: -1, sostiene: [68, 150], sorpresa: t > W.HEAD && t < W.HEAD + 0.8, sonrisa: t > W.HEAD + 0.8 });
  rr(a.mano[0] - 3, a.mano[1] - 2, a.mano[0] + 1, a.mano[1] + 1, K); rr(a.mano[0] - 2, a.mano[1] - 1, a.mano[0], a.mano[1], H('#e8c020'));
  if (on) { haz(60, 76, a.mano[0] - 2, a.mano[1] - 2, 14, 2, H('#fffbe0'), 0.12); manchaLuz(60, 90, 14, 8, H('#fffbe0'), 0.12); }
};
// ── 12 · 2025: la cata del pilar en T con cara; la tierra baja y en «face» aparece la cara ────────────────────────
const fondo12 = () => fijo('p12', () => {
  cielo(0, 22, CI_DIA);
  for (let x = 0; x < 320; x++) { const yy = 20 + ri(Math.sin(x * 0.1) * 1.5); for (let y = yy; y <= 30; y++) R.pset(x, y, y < yy + 3 ? H('#6a8a3a') : rmp(TIE, 2.6 - (y - yy) / 5, x, y)); }
  roca(0, 30, 319, 150, 81, KAR, 2.4, 8);
  for (let y = 30; y <= 150; y++) for (let x = 0; x < 320; x++) if (b4(x, y) < 0.25 - Math.abs(x - 160) / 900) tine(x, y, H('#2a1a10'), 0.25);
  for (const yy of [60, 100, 140]) R.linea(0, yy, 319, yy + 2, H('#f4f0e4')); for (const xx of [40, 260]) R.linea(xx, 30, xx, 150, H('#f4f0e4'));
  for (const [x, y, n] of [[44, 62, 1], [264, 62, 2], [44, 102, 3], [264, 102, 4]]) etiqueta(x, y, n);
  for (let i = 0; i < 10; i++) { const x = ri(10 + h2(i, 1, 88) * 300), l = 4 + ri(h2(i, 2, 88) * 10); for (let k = 0; k < l; k++) ps(x + ri(Math.sin(k + i)), 30 + k, H('#5a4a2a')); }
  roca(0, 151, 319, 179, 82, KAR, 3.0, 13); R.linea(0, 151, 319, 151, mez(CAL[0], K, 0.4));
  // el andamio: la tabla a y 92 sobre tubos, y una escalera
  for (const x of [84, 136]) { rr(x - 1, 93, x + 1, 151, K); rr(x, 93, x, 151, H('#c8ccd2')); }
  R.linea(84, 120, 136, 104, H('#9aa0a8')); rr(78, 92, 142, 95, K); madera(79, 92, 141, 94, 85, false, MADERA, 2.6);
  for (let k = 0; k < 7; k++) R.linea(58, 151 - k * 9, 70, 151 - k * 9, H('#c8a46a')); R.linea(58, 151, 66, 90, K); R.linea(70, 151, 78, 90, K);
  // sacos, la criba y una regla de escala apoyada
  for (const [x, y] of [[236, 160], [252, 162], [244, 154]]) { R.disco(x, y, 6, K); R.disco(x, y, 5, H('#d8c8a0')); R.linea(x - 3, y - 2, x + 3, y - 2, H('#b8a880')); }
  R.disco(292, 166, 10, K); R.disco(292, 166, 9, H('#8a6a3e')); R.disco(292, 166, 7, H('#5a5a5a'));
  for (let k = 0; k < 6; k++) rr(24, 120 + k * 5, 26, 124 + k * 5, H(k & 1 ? '#f4f0e4' : '#c83a3a')); R.linea(23, 120, 23, 150, K);
});
const p12 = (t) => {
  fondo12();
  const P = T.d_pilar(R, 166, 176, { escala: 2, cara: true, brazos: false, luz: 0.6, sem: 3 });
  // la tierra que lo cubre baja (de «and in 2025» a «face»)
  const L = lerp(46, 132, ease(tramo(t, P12 + 0.2, W.FACE + 0.1)));
  monton(166, 176, 48, L, TIE, 1);
  for (let i = 0; i < 8; i++) { const v = (t * 1.3 + i / 8) % 1; if (L < 120) ps(lerp(140, 192, h2(i, 1, 87)), L + v * 30, TIE[3]); }
  // ella cepilla el borde de la cabeza desde la tabla; él saca cubos de tierra
  const fr = Math.sin(t * 13), mira = t > W.FACE;
  const a = R.actor(EL.arqueologaGB, 116, 92, t, { dir: 1, sostiene: mira ? undefined : [138 + ri(fr * 2), ri(Math.min(L + 2, 82))], sorpresa: mira && t < W.FACE + 0.9, sonrisa: t > W.FACE + 0.9, dedo: t > W.UP2 });
  if (!mira) cepillo(a.mano[0] + 1, a.mano[1] - 2);
  const u = ((t - P12) * 0.3) % 1, xo = mira ? 224 : ri(lerp(212, 262, Math.abs(u * 2 - 1)));
  const o = R.actor(EL.arqueologoGB, xo, 172, t, { dir: mira ? -1 : (u < 0.5 ? 1 : -1), anda: !mira, sostiene: mira ? undefined : true, sorpresa: mira });
  if (!mira) cubo(o.mano[0] + 2, o.mano[1] + 10); else cubo(xo + 18, 172);
  if (mira) { const g = pop(t, W.FACE, 0.4); if (g > 0 && t < W.FACE + 1.5) destello(186, 58, ri(2 + g * 4)); if (t < W.FACE + 1.4) R.bocadillo(xo + 8, 140, {}); }
};
// ── 13 · al anochecer, la pasarela: los gigantes sin cara al fondo y el pilar con cara; en «looking back» le guiña ──
const fondo13 = () => fijo('p13', () => {
  cielo(0, 72, pal(['#26305a', '#3e4270', '#6a5478', '#b8707a', '#e89a78', '#f4b880']));
  estrellas(4, 40, 18, 13);
  roca(0, 60, 319, 150, 131, CALT, 2.0, 9);
  for (let x = 0; x < 320; x++) { const yy = 58 + ri(Math.sin(x * 0.05) * 3 + h2(x >> 3, 1, 132) * 3); for (let y = yy - 3; y < yy; y++) R.pset(x, y, H('#2e2a2a')); R.pset(x, yy, CALT[4]); }
  for (const x of [44, 92]) T.d_pilar(R, x, 144, { escala: 1.3, sombra: false, luz: 0.3 });
  for (let y = 40; y <= 146; y++) for (let x = 20; x <= 116; x++) if (b4(x, y) < 0.45) tine(x, y, H('#2a2848'), 0.35);
  for (const [x, hh, w] of [[136, 46, 12], [160, 58, 14], [190, 40, 11], [292, 52, 14]]) pilarR(x, 148, w, hh, x, CALT, 0.2);
  roca(0, 150, 319, 158, 133, CALT, 2.6, 20);
  for (let y = 158; y <= 179; y++) for (let x = 0; x < 320; x++) { const tabla = (x + (Math.floor((y - 158) / 7) & 1) * 20) % 40 < 1; R.pset(x, y, tabla ? MADERA[0] : rmp(MADERA, 2.4 + (h2(x >> 3, y >> 1, 134) - 0.5) * 0.8 - ((y - 158) % 7 === 6 ? 1.5 : 0), x, y)); }
});
const p13 = (t) => {
  fondo13();
  nubesVivas(t, [[60, 24, 22, 0.6, NUBT[0]], [200, 34, 18, 1.0, NUBT[1]]]);
  for (let k = 0; k < 2; k++) { const a = t * 1.7 + k * 3, x = 150 + Math.sin(a) * 60 + k * 40, y = 30 + Math.sin(a * 2.3) * 8, f = Math.floor(t * 10 + k) % 2; ps(x, y, K); ps(x - 1, y - f, K); ps(x + 1, y - f, K); ps(x - 2, y - 1 + f, K); ps(x + 2, y - 1 + f, K); }
  const P = T.d_pilar(R, 236, 152, { escala: 1.8, cara: true, brazos: false, luz: 0.9, sem: 4 });
  // la guía habla de los gigantes; el padre y el niño miran; en «looking back» brillan los ojos y el niño salta
  const brillo = pop(t, W.LOOKING, 0.25) * (t < W.US + 0.6 ? 1 : 0), c = P.cabeza || [236, 40];
  if (brillo > 0) for (const dx of [-6, 6]) { destello(c[0] + dx, c[1] + 16, ri(1 + brillo * 2), H('#fff4a0')); }
  R.actor(EL.arqueologaGB, 40, 174, t, { dir: 1, habla: t < W.LOOKING && Math.sin(t * 8) > 0, dedo: t > W.FACELESS - 0.2 && t < W.LOOKING });
  const salta = tramo(t, W.LOOKING, W.LOOKING + 0.45), esconde = ease(tramo(t, W.BACK + 0.1, W.US + 0.5)), xn = ri(lerp(176, 136, esconde));
  const nino = () => R.actor(EL.ninoGB, xn, 176, t, { dir: esconde > 0 && esconde < 1 ? -1 : 1, salto: salta > 0 && salta < 1 ? ri(Math.sin(salta * Math.PI) * 8) : 0, sorpresa: t > W.LOOKING - 0.05, anda: esconde > 0 && esconde < 1 });
  if (esconde >= 0.6) nino();
  R.actor(EL.espectadorGB, 150, 174, t, { dir: 1, sonrisa: t > W.BACK + 0.3, habla: t > W.US && Math.sin(t * 9) > 0 });
  if (esconde < 0.6) nino();
  // la barandilla de la pasarela, por delante
  rr(0, 160, 319, 162, K); rr(0, 160, 319, 160, MADERA[4]); rr(0, 161, 319, 161, MADERA[2]);
  for (let x = 6; x < 320; x += 52) { rr(x, 160, x + 3, 179, K); rr(x + 1, 160, x + 2, 179, MADERA[3]); }
};
'''

# ── frase «leopardo»: las cajas que llegan, el leopardo, las figuritas, el banco, Sayburç, el museo y el mundo enterrado
PLANOS_C = r'''
// ── 14 · agosto de 2026: el patio de la casa de la excavación; llega la camioneta y las cajas pasan de mano en mano ──
const fondo14 = () => fijo('p14', () => {
  cielo(0, 46, pal(['#7aa8d8', '#8ab4de', '#a0c4e4', '#bcd6ea', '#d4e4ee']));
  for (let x = 0; x < 320; x++) { const yy = 40 + ri(Math.sin(x * 0.03) * 3); for (let y = yy; y <= 48; y++) R.pset(x, y, rmp(pal(['#8a9aae', '#a0aebe', '#b4c0cc']), 1.6 - (y - yy) / 5, x, y)); }
  hiladas(0, 52, 319, 130, 141, CAL, 9, 2.7);
  rr(0, 48, 319, 52, K); rr(0, 49, 319, 51, CAL[4]);
  // la puerta, la ventana con postigos azules, el canalón y el cable de la luz
  rr(148, 86, 178, 130, K); madera(149, 87, 177, 130, 142, true, MADERA, 2.2); rr(172, 106, 174, 109, H('#e8c040'));
  rr(208, 64, 238, 90, K); rr(209, 65, 237, 89, H('#1e2430')); rr(202, 64, 208, 90, H('#3a6ac8')); rr(238, 64, 244, 90, H('#3a6ac8')); for (let y = 66; y < 90; y += 3) { R.linea(202, y, 208, y, H('#2a4a98')); R.linea(238, y, 244, y, H('#2a4a98')); } rr(206, 90, 240, 92, CAL[4]);
  R.linea(120, 52, 120, 130, H('#8a9098')); R.linea(121, 52, 121, 130, H('#5a6068'));
  for (let x = 0; x < 320; x++) ps(x, 58 + ri(((x - 160) / 160) ** 2 * 8), H('#2a2a2a'));
  // el pistachero a la izquierda con su sombra
  rr(40, 90, 46, 140, K); rr(41, 90, 45, 140, H('#5a3e2a'));
  for (let i = 0; i < 40; i++) { const x = ri(10 + h2(i, 1, 143) * 70), y = ri(54 + h2(i, 2, 143) * 40), r = 5 + ri(h2(i, 3, 143) * 6); R.disco(x, y, r + 1, H('#2a3a1a')); }
  for (let i = 0; i < 40; i++) { const x = ri(10 + h2(i, 1, 143) * 70), y = ri(54 + h2(i, 2, 143) * 40), r = 5 + ri(h2(i, 3, 143) * 6); R.disco(x, y, r, H('#4a6a2a')); R.disco(x - 1, y - 2, ri(r * 0.6), H('#6a8a3a')); }
  tierra(0, 131, 319, 179, 144, pal(['#8a6a4a', '#a8845e', '#c09c74', '#d4b48a', '#e4c8a0']), 2.6);
  for (let y = 131; y <= 179; y++) for (let x = 0; x < 110; x++) if (b4(x, y) < 0.55 - Math.abs(x - 50) / 120) tine(x, y, K, 0.25);
  // las cajas que ya había, a la derecha, y la mesa de tamizar
  // la escalera apoyada, las cribas colgadas, la manguera, dos sillas de plástico y unas macetas
  for (let k = 0; k < 8; k++) R.linea(250, 128 - k * 9, 262, 128 - k * 9, H('#c8a46a')); R.linea(248, 130, 254, 60, K); R.linea(262, 130, 268, 60, K);
  for (const x of [94, 112]) { R.disco(x, 74, 8, K); R.disco(x, 74, 7, H('#8a6a3e')); R.disco(x, 74, 5, H('#6a6a6a')); for (let k = -4; k <= 4; k += 2) R.linea(x - 4, 74 + k, x + 4, 74 + k, H('#8a8a8a')); ps(x, 65, K); }
  for (let x = 124; x <= 146; x++) ps(x, 128 + ri(Math.sin(x * 0.5) * 1.5), H('#3a8a4a')); R.disco(130, 126, 3, H('#3a8a4a'));
  for (const x of [186, 300]) { R.poligono([[x, 130], [x + 1, 122], [x + 9, 122], [x + 10, 130]], H('#c86a3a')); R.disco(x + 5, 118, 5, H('#3a6a2a')); R.disco(x + 4, 116, 3, H('#5a8a3a')); }
  for (const [x, y, c, n] of [[262, 170, '#3a6ac8', 41], [282, 170, '#3a9a5a', 42], [300, 170, '#c84a3a', 43], [272, 158, '#c8b040', 44], [292, 158, '#3a6ac8', 45]]) caja(x, y, c, n, 18, 12);
});
const DESTINO14 = [[196, 172], [216, 172], [236, 172], [206, 160], [226, 160]];
const p14 = (t) => {
  fondo14();
  const llega = ease(tramo(t, P14, P14 + 1.0)), xc = ri(lerp(-58, 2, llega));
  for (let k = 0; k < 6; k++) { const v = (t * 1.8 + k / 6) % 1; if (llega < 1) tine(xc - 2 - v * 24, 170 - v * 8, H('#e0c8a8'), 0.5 * (1 - v)); }
  for (let i = 0; i < 3; i++) gallina(140 + i * 18 + Math.sin(t * 0.7 + i) * 4, 176, i & 1 ? 1 : -1, t, i);
  // dos pasan las cajas: de la caja de la camioneta al primero, al segundo y al montón
  const salida = (k) => P14 + 1.0 + k * 0.52, viaje = 0.9;
  const a = R.actor(EL.arqueologoGB, 74, 168, t, { dir: 1, sostiene: true, sonrisa: true });
  const b = R.actor(EL.campesinoGB, 148, 168, t, { dir: 1, sostiene: true });
  camioneta(xc, 172, 1, t, llega > 0 && llega < 1, (x, y) => { const quedan = 5 - DESTINO14.filter((_, k) => t > salida(k)).length; for (let k = 0; k < quedan; k++) caja(x - 6 + (k % 3) * 13, y - (k > 2 ? 6 : 0), ['#d8782a', '#3a6ac8', '#3a9a5a'][k % 3], null, 12, 6); });
  DESTINO14.forEach(([dx, dy], k) => { const u = tramo(t, salida(k), salida(k) + viaje); if (u <= 0) return;
    const pts = [[24, 150], [a.mano[0], a.mano[1]], [b.mano[0], b.mano[1]], [dx, dy]], s = u * 3, i = Math.min(2, Math.floor(s)), f = ease(s - i);
    const x = lerp(pts[i][0], pts[i + 1][0], f), y = lerp(pts[i][1], pts[i + 1][1], f) - Math.sin(f * Math.PI) * 8;
    caja(x - 8, y + 5, ['#d8782a', '#3a6ac8', '#3a9a5a', '#c8b040', '#8a5ac8'][k], 46 + k, 18, 12); });
  const sol = 0.5 + Math.sin(t * 2) * 0.5; destello(300, 20, ri(1 + sol * 2), H('#fffbe0'));
};
// ── 15 · Karahan Tepe, agosto de 2026: la figura sentada sobre el leopardo sale de la tierra; la foto en «leopard» ──
const fondo15 = () => fijo('p15', () => {
  cielo(0, 22, CI_DIA);
  for (let x = 0; x < 320; x++) { const yy = 20 + ri(Math.sin(x * 0.09) * 1.5); for (let y = yy; y <= 26; y++) R.pset(x, y, y < yy + 2 ? H('#7a8a3a') : TIE[2]); }
  let y = 26; for (const [hh, ramp, k] of [[14, TIE, 151], [8, TIER, 152], [18, pal(['#5a4434', '#74584a', '#8e705a', '#a8886c']), 153], [10, TIER, 154], [44, CAL, 155]]) { if (ramp === CAL) roca(0, y, 319, y + hh, k, CAL, 2.2, 7); else tierra(0, y, 319, y + hh, k, ramp, 2.2); y += hh; }
  for (let yy = 26; yy <= 120; yy++) for (let x = 0; x < 320; x++) if (b4(x, yy) < 0.3) tine(x, yy, K, 0.18);
  tierra(0, 121, 319, 179, 156, TIER, 2.6); R.linea(0, 121, 319, 121, K);
  for (const yy of [140, 164]) R.linea(0, yy, 319, yy - 4, H('#f4f0e4')); for (const x of [40, 280]) R.linea(x, 121, x - 14, 179, H('#f4f0e4'));
  for (const [x, yy, n] of [[30, 150, 3], [282, 168, 4]]) etiqueta(x, yy, n);
  cubo(18, 176, '#2a2a2e'); R.poligono([[290, 150], [302, 144], [306, 148], [294, 154]], K); R.poligono([[291, 150], [302, 145], [305, 148], [294, 153]], H('#b8bec6'));
});
const p15 = (t) => {
  fondo15();
  T.d_leopardo(R, 160, 170, { escala: 2, t });
  const L = lerp(80, 168, ease(tramo(t, P15 + 0.05, W.LEOPARD + 0.15)));
  monton(160, 172, 54, L, TIER, 2);
  for (let i = 0; i < 8; i++) { const v = (t * 1.4 + i / 8) % 1; if (L < 158) ps(lerp(120, 200, h2(i, 1, 158)), L + v * 20, TIER[4]); }
  const fl = tramo(t, W.LEOPARD, W.LEOPARD + 0.12) - tramo(t, W.LEOPARD + 0.12, W.LEOPARD + 0.45), fr = Math.sin(t * 13);
  const a = R.actor(EL.arqueologaGB, 92, 172, t, { dir: 1, sostiene: t < W.SEATED ? [116 + ri(fr * 2), 154] : undefined, sorpresa: t > W.SEATED, dedo: t > W.LEOPARD + 0.5 });
  if (t < W.SEATED) cepillo(a.mano[0] + 1, a.mano[1] - 2);
  const o = R.actor(EL.arqueologoGB, 214, 174, t, { dir: -1, sostiene: [208, 152], sorpresa: t > W.SEATED && t < W.LEOPARD });
  camara(o.mano[0] - 2, o.mano[1], cl(fl));
  if (t > W.LEOPARD && t < W.LEOPARD + 1.5) { const g = pop(t, W.LEOPARD, 0.4); destello(186, 124, ri(2 + g * 3)); }
};
// ── 16 · 2025: el cuenco de clorita sobre la mesa del laboratorio; salen el zorro, el jabalí y el buitre ─────────
const LAB = pal(['#7a8a96', '#90a0ac', '#a8b6c0', '#bec8d0', '#d2dae0']);
const fondo16 = () => fijo('p16', () => {
  rr(0, 0, 319, 13, H('#c8d0d6')); rr(40, 6, 280, 9, H('#eef4f6')); R.linea(40, 10, 280, 10, H('#a8b0b8'));
  yeso(0, 14, 319, 127, 161, LAB, 2.6); for (let x = 0; x < 320; x += 64) R.linea(x, 14, x, 127, LAB[1]);
  // la estantería de la derecha con frascos y cajas
  for (const y of [70, 98, 126]) { rr(222, y, 316, y + 2, K); rr(223, y, 315, y, H('#e8ecee')); }
  for (let i = 0; i < 9; i++) { const x = 226 + i * 10, y = 70; rr(x, y - 12, x + 7, y - 1, K); rr(x + 1, y - 11, x + 6, y - 1, H(['#c8dce8', '#e8d8b0', '#c8e0c8'][i % 3])); rr(x + 1, y - 13, x + 6, y - 12, H('#5a5a62')); rr(x + 2, y - 7, x + 5, y - 4, H('#f4f0e4')); }
  for (const [x, c, n] of [[226, '#3a6ac8', 17], [250, '#d8782a', 18], [274, '#3a9a5a', 19], [296, '#c8b040', 20]]) caja(x, 98, c, n, 18, 14);
  for (const [x, c] of [[228, '#8a5ac8'], [256, '#c84a3a'], [284, '#3a6ac8']]) caja(x, 126, c, null, 22, 12);
  // el cuadro con el dibujo del pilar y el zorro, y el monitor del brazo articulado
  rr(118, 26, 176, 78, K); rr(119, 27, 175, 77, H('#f8f4ea')); rr(122, 30, 172, 74, H('#efe8d6'));
  T.d_pilar(R, 140, 72, { escala: 0.62, sombra: false, luz: 0.3 }); for (let k = 0; k < 14; k++) ps(156 + Math.cos(k / 14 * 6.28) * 8, 50 + Math.sin(k / 14 * 6.28) * 5, H('#7a5a3a'));
  rr(14, 36, 76, 80, K); rr(15, 37, 75, 79, H('#14202c')); rr(42, 80, 46, 96, H('#5a6068')); rr(34, 96, 54, 99, H('#5a6068'));
  // la mesa: tablero, la plancha verde de corte y lo que hay encima
  rr(0, 128, 319, 179, H('#d8dcde')); for (let y = 128; y <= 179; y++) for (let x = 0; x < 320; x++) if (b4(x, y) < 0.18) R.pset(x, y, H('#c4c8cc'));
  R.linea(0, 128, 319, 128, H('#8a9096'));
  rr(84, 136, 238, 177, H('#2e6a4e')); for (let x = 84; x <= 238; x += 10) R.linea(x, 136, x, 177, H('#4a8a6a')); for (let y = 136; y <= 177; y += 8) R.linea(84, y, 238, y, H('#4a8a6a'));
  rr(20, 150, 70, 170, K); rr(21, 151, 69, 169, H('#f4f4f0')); etiqueta(26, 154, '23'); for (let i = 0; i < 4; i++) { rr(42 + i * 6, 158, 45 + i * 6, 162, CAL[1 + i % 3]); }
  rr(250, 150, 262, 162, K); rr(251, 151, 261, 161, H('#e8e4dc')); rr(262, 153, 265, 158, K);
  R.linea(270, 170, 300, 160, K); R.linea(270, 169, 300, 159, H('#b8bec6')); R.linea(276, 176, 304, 170, H('#c8a46a')); rr(304, 168, 308, 172, H('#3a3a3a'));
  R.poligono([[248, 172], [262, 166], [270, 170], [258, 177]], H('#5a8ad8')); R.poligono([[290, 136], [304, 134], [306, 142], [292, 144]], H('#5a8ad8'));
  // la lupa de anillo con su brazo
  R.linea(96, 132, 92, 92, K); R.linea(97, 132, 93, 92, H('#c8ccd2')); R.linea(93, 92, 112, 86, K); R.linea(93, 93, 112, 87, H('#c8ccd2'));
  rr(90, 130, 102, 134, K); rr(91, 131, 101, 133, H('#5a6068'));
});
const p16 = (t) => {
  fondo16();
  // la pantalla con el escaneo 3D que gira
  for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2 + t * 0.8, x = 45 + Math.cos(a) * 20, y = 60 + Math.sin(a) * 5 * Math.cos(t * 0.8) ; ps(x, y, H('#4ae8a8')); ps(45 + Math.cos(a) * 14, 66 + Math.sin(a) * 4, H('#2a9a6a')); } rr(18, 40, 30, 42, H('#4ae8a8'));
  // el anillo de luz encendido sobre el cuenco
  R.disco(120, 88, 11, K); R.disco(120, 88, 10, H('#f4f4f0')); R.disco(120, 88, 7, H('#d8eef8')); ps(117, 85, H('#ffffff')); haz(122, 96, 160, 150, 6, 40, H('#fffbe8'), 0.12);
  const f = ease(tramo(t, W.FOX - 0.35, W.VULTURE + 0.25)), F = T.d_figuritas(R, 160, 162, { escala: 2, fuera: f, t });
  // las tres, una a una, con su brillo: «fox», «boar», «vulture»
  const figs = (F && F.figuras) || [[118, 120], [160, 130], [202, 120]];
  [W.FOX, W.BOAR, W.VULTURE].forEach((w, k) => { const g = pop(t, w, 0.3); if (g > 0 && t < w + 0.9) destello(figs[k][0], figs[k][1] - 4, ri(2 + g * 3)); });
  // la restauradora, tras la mesa, con las pinzas; luego señala cada una
  const apunta = t > W.FOX - 0.1, l = R.actor(EL.laboratorioGB, 34, 140, t, { dir: 1, sostiene: apunta ? undefined : [58, 124], dedo: apunta, sonrisa: t > W.VULTURE, habla: t > W.A10 + 0.6 && t < W.FIGURINES && Math.sin(t * 8) > 0 });
  if (!apunta) { R.linea(l.mano[0], l.mano[1], l.mano[0] + 7, l.mano[1] + 3, K); R.linea(l.mano[0], l.mano[1] - 1, l.mano[0] + 7, l.mano[1] + 2, H('#c8ccd2')); }
  restaura('p16', 26, 129, 62, 179);
};
// ── 17 · la sala de Karahan en corte: los mismos animales en el pilar; la bolsa de tierra roja sellada bajo el banco ──
const fondo17 = () => fijo('p17', () => {
  cielo(0, 18, CI_DIA); for (let x = 0; x < 320; x++) { const yy = 16 + ri(Math.sin(x * 0.08) * 1.5); for (let y = yy; y <= 20; y++) R.pset(x, y, y === yy ? H('#6a8a3a') : H('#4a5a2a')); }
  roca(0, 20, 319, 128, 171, CAL, 2.2, 9, 80);
  for (let y = 20; y <= 128; y++) for (let x = 0; x < 320; x++) if (b4(x, y) < (y - 20) / 200 + 0.08) tine(x, y, K, 0.25);
  // el banco corrido tallado
  rr(140, 104, 319, 128, K); roca(141, 105, 319, 110, 172, CAL, 3.4, 30); roca(141, 111, 319, 128, 173, CAL, 2.0, 30);
  roca(0, 129, 319, 179, 174, CAL, 2.8, 14);
  // el corte bajo el banco: la roca, la losa que lo sella y la bolsa de tierra roja con el cuenco dentro
  for (let y = 130; y <= 177; y++) for (let x = 170; x <= 292; x++) R.pset(x, y, rmp(CALI, 2.0 + (h2(x >> 1, y >> 1, 175) - 0.5) * 0.9, x, y));
  rr(186, 134, 276, 139, K); roca(187, 135, 275, 138, 176, CAL, 3.0, 30);
  for (let y = 141; y <= 176; y++) for (let x = 188; x <= 274; x++) { const d = ((x - 231) / 42) ** 2 + ((y - 159) / 17) ** 2; if (d < 1) R.pset(x, y, d > 0.92 ? mez(TIER[0], K, 0.4) : rmp(TIER, 2.6 - d + (h2(x, y, 177) - 0.5) * 0.8, x, y)); }
  T.d_figuritas(R, 231, 170, { escala: 1, tierra: true });
  for (let x = 170; x <= 292; x += 4) { ps(x, 130, H('#f4f0e4')); ps(x + 1, 130, H('#f4f0e4')); ps(x, 177, H('#f4f0e4')); ps(x + 1, 177, H('#f4f0e4')); }
  for (let y = 130; y <= 177; y += 4) { ps(170, y, H('#f4f0e4')); ps(170, y + 1, H('#f4f0e4')); ps(292, y, H('#f4f0e4')); ps(292, y + 1, H('#f4f0e4')); }
});
const p17 = (t) => {
  fondo17();
  const rel = t < W.ANIMALS ? 'zorro' : t < W.CARVED3 ? 'jabali' : t < W.HAD ? 'buitre' : null;
  T.d_pilar(R, 76, 172, { escala: 1.8, brazos: false, relieves: ['zorro', 'jabali', 'buitre'], luz: 0.6, brillo: t > W.SAME - 0.1 ? rel : null, t, sem: 7 });
  const lz = ((t - P17) * 16) % 260; lagartija(150 + lz, 105, 1);
  // la bolsa sellada: su borde punteado late en «sealed» y la tierra roja se enciende en «red earth»
  if (t > W.SEALED - 0.05) { const on = Math.floor(t * 4) % 2; for (let k = 0; k < 48; k++) { if ((k + Math.floor(t * 6)) % 3 === 0) continue; const a = k / 48 * Math.PI * 2; ps(231 + Math.cos(a) * 44, 159 + Math.sin(a) * 19, on ? H('#ffd84a') : H('#f0a020')); } }
  if (t > W.RED - 0.05) manchaLuz(231, 160, 40, 15, H('#ff8a4a'), 0.22 * (0.7 + Math.sin(t * 5) * 0.3));
  if (t > W.BENEATH) { const g = pop(t, W.BENEATH, 0.3); destello(231, 148, ri(1 + g * 2)); }
  const o = R.actor(EL.arqueologoGB, 128, 172, t, { dir: t < W.HAD ? -1 : 1, dedo: true, habla: Math.sin(t * 8) > 0.3, sonrisa: t > W.BENCH });
};
// ── 18 · Sayburç (2021): la calle del pueblo; en «tells» suben la lona de la casa y asoma la pared tallada ──────────
const CASA = pal(['#8a7a60', '#a8967a', '#c4b094', '#d8c8aa', '#e8dcc2']);
const casa = (x0, y0, x1, y1, k) => {
  yeso(x0, y0, x1, y1, k, CASA, 2.7); rr(x0, y0 - 3, x1, y0, K); rr(x0, y0 - 2, x1, y0 - 1, CASA[4]);
  rr(x1 - 14, y0 - 12, x1 - 4, y0 - 3, K); rr(x1 - 13, y0 - 11, x1 - 5, y0 - 4, H('#c8ccd2')); R.linea(x1 - 13, y0 - 9, x1 - 5, y0 - 9, H('#9aa0a8'));
};
const fondo18 = () => fijo('p18', () => {
  cielo(0, 70, CI_DIA);
  for (let i = 0; i < 12; i++) { const x = i * 28 - 6, y = 64 + ri(h2(i, 1, 181) * 8), w = 22 + ri(h2(i, 2, 181) * 8); rr(x, y, x + w, 92, K); yeso(x + 1, y + 1, x + w - 1, 92, 182 + i, pal(['#9a8e7a', '#b0a48e', '#c4b8a2']), 1.6); rr(x + 5, y + 6, x + 8, y + 10, H('#3a3430')); rr(x + w - 9, y + 6, x + w - 6, y + 10, H('#3a3430')); if (i % 3 === 1) { R.disco(x + 6, y - 3, 3, K); R.disco(x + 6, y - 3, 2, H('#d8d8dc')); } }
  casa(0, 76, 88, 150, 183); casa(240, 82, 319, 150, 184); casa(96, 84, 234, 150, 185);
  // la casa de la izquierda: puerta verde y ventana con reja; la de la derecha, puerta azul y unas macetas
  rr(30, 112, 50, 150, K); rr(31, 113, 49, 150, H('#3a7a5a')); rr(60, 96, 78, 114, K); rr(61, 97, 77, 113, H('#2a2a32')); for (let x = 63; x < 78; x += 4) R.linea(x, 97, x, 113, H('#8a9098'));
  rr(262, 112, 282, 150, K); rr(263, 113, 281, 150, H('#3a6ac8')); for (const x of [290, 302]) { R.poligono([[x, 150], [x + 1, 142], [x + 9, 142], [x + 10, 150]], H('#c86a3a')); R.disco(x + 5, 138, 4, H('#4a8a3a')); R.disco(x + 4, 136, 2, H('#e83a5a')); }
  // el hueco de la excavación en la casa del centro, con la pared tallada dentro
  rr(102, 92, 228, 150, K); for (let y = 93; y <= 150; y++) for (let x = 103; x <= 227; x++) R.pset(x, y, rmp(CALI, 1.4 + (h2(x, y, 186) - 0.5) * 0.8, x, y));
  T.d_relieve(R, 165, 146, { escala: 1 });
  // la calle de tierra con el charco y las rodadas
  tierra(0, 151, 319, 179, 187, pal(['#8a7050', '#a88a64', '#c0a27a', '#d4b890']), 2.4);
  for (let y = 164; y <= 172; y++) for (let x = 190; x <= 250; x++) { const d = ((x - 220) / 30) ** 2 + ((y - 168) / 4) ** 2; if (d < 1) R.pset(x, y, rmp(CI_DIA, 3 - d * 2, x, y)); }
  for (const yy of [158, 176]) for (let x = 0; x < 320; x += 2) if (h2(x, yy, 188) > 0.4) ps(x, yy, H('#7a6040'));
});
const p18 = (t) => {
  fondo18();
  nubesVivas(t, [[40, 26, 24, 1.0, NUB[0]], [180, 40, 20, 0.7, NUB[1]], [250, 22, 28, 0.5, NUB[2]]]);
  pajaro(80 + t * 8, 44, t, H('#3a3a4a'));
  // la lona azul que tapa el hueco: sube en «tells»
  const sube = ease(tramo(t, W.TELLS - 0.15, W.SCENE + 0.1)), yb = ri(lerp(150, 98, sube));
  if (yb > 94) { for (let y = 93; y <= yb; y++) for (let x = 103; x <= 227; x++) { const pl = Math.sin(x * 0.25 + t * 3 + y * 0.05) * 0.6; R.pset(x, y, rmp(pal(['#1a3a7a', '#2a4a9a', '#3a62b8', '#5a80d0']), 2 + pl - (y === yb ? 1 : 0), x, y)); } rr(103, 93, 227, 95, H('#5a80d0')); }
  if (sube > 0) haz(165, 96, 165, 146, 30, 60, H('#fff4d0'), 0.1 * sube);
  // la ropa tendida que ondea
  R.linea(10, 98, 96, 102, H('#4a4a4a')); for (let k = 0; k < 4; k++) { const x = 18 + k * 18, w = Math.sin(t * 4 + k) * 2; R.poligono([[x, 99], [x + 12, 100], [x + 12 + w, 112], [x + w, 111]], H(['#e83a3a', '#f4f0e4', '#3a8ad8', '#e8c040'][k])); }
  for (let i = 0; i < 3; i++) gallina(230 + i * 22 + Math.sin(t * 0.6 + i) * 5, 170 + (i & 1) * 4, i & 1 ? 1 : -1, t, i + 1);
  R.actor(EL.prospectora2GB, 40, 158, t, { dir: 1, brazos: Math.sin(t * 2) > 0, sonrisa: true });
  const tira = t > W.TELLS - 0.2, xo = ri(lerp(232, 246, ease(tramo(t, W.TELLS - 0.2, W.SCENE))));
  const o = R.actor(EL.arqueologoGB, xo, 160, t, { dir: -1, sostiene: [xo - 2, tira ? 140 : 134], anda: tira && t < W.SCENE });
  R.linea(o.mano[0], o.mano[1], 226, yb, H('#e8e0c8'));
  R.actor(EL.arqueologaGB, 84, 162, t, { dir: 1, dedo: t > W.TELLS + 0.3, sorpresa: t > W.TELLS && t < W.TELLS + 0.5, sonrisa: t > W.TELLS + 0.5 });
};
// ── 19 · el relieve de Sayburç en la sala oscura: la linterna va del hombre entre leopardos al del toro ─────────────
const fondo19 = () => fijo('p19', () => {
  yeso(0, 0, 319, 150, 191, MUS, 2.0); for (let x = 0; x < 320; x += 80) R.linea(x, 0, x, 150, MUS[0]);
  for (const [x, y] of [[0, 0], [80, 0], [160, 0], [240, 0]]) for (let yy = 4; yy < 146; yy += 2) ps(x + 40, yy, MUS[3]);
  rr(30, 146, 290, 153, K); roca(31, 147, 289, 152, 192, CALI, 2.6, 30);
  rr(4, 120, 22, 132, K); rr(5, 121, 21, 131, H('#2a2622')); R.linea(6, 124, 20, 124, H('#5a5048')); R.linea(6, 127, 16, 127, H('#5a5048'));
  for (let y = 154; y <= 179; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(MUS, 1.2 + (y - 154) / 30 + (h2(x >> 3, y, 193) - 0.5) * 0.4 + ((x + y * 3) % 41 < 2 ? 0.6 : 0), x, y));
  // los postes de latón con el cordón rojo
  for (const x of [24, 112, 208, 296]) { rr(x - 1, 150, x + 1, 170, K); rr(x, 150, x, 170, H('#e8c070')); rr(x - 3, 170, x + 3, 172, H('#a8803a')); R.disco(x, 149, 2, H('#e8c070')); }
  for (const [a, b] of [[24, 112], [112, 208], [208, 296]]) for (let x = a; x <= b; x++) { const y = 152 + ri(Math.sin((x - a) / (b - a) * Math.PI) * 6); ps(x, y, H('#a82a2a')); ps(x, y + 1, H('#6a1a1a')); }
});
const p19 = (t) => {
  fondo19();
  haz(160, 0, 160, 146, 40, 140, H('#fff0d0'), 0.05); manchaLuz(160, 166, 120, 10, H('#fff0d0'), 0.12);
  const L = lerp(0.25, 0.86, ease(tramo(t, W.MAN - 0.2, W.BULL)));
  T.d_relieve(R, 160, 148, { escala: 2, linterna: L, destaca: t > W.FACING - 0.1 ? 'derecha' : t > W.MAN - 0.1 ? 'izquierda' : undefined, t });
  // los visitantes, de espaldas abajo, señalan
  R.actor(EL.espectadorGB, 60, 186, t, { dir: 1, dedo: t > W.MAN && t < W.FACING, sonrisa: true });
  R.actor(EL.arqueologaGB, 250, 186, t, { dir: -1, dedo: t > W.FACING, sorpresa: t > W.BULL && t < W.BULL + 0.6 });
  R.actor(EL.campesinoGB, 150, 189, t, { dir: 1 });
};
// ── 20 · el museo (2026): las vitrinas con el leopardo, las figuritas y la estatua; el relieve en la pared y su «11000» ──
const MUSEO = pal(['#5a5048', '#6e6458', '#837868', '#988c7a', '#ac9e8a']);
const fondo20 = () => fijo('p20', () => {
  rr(0, 0, 319, 15, H('#1c1a1e')); rr(0, 14, 319, 15, H('#2a282c')); for (let x = 30; x < 300; x += 44) { rr(x, 15, x + 5, 19, K); rr(x + 1, 16, x + 4, 18, H('#4a4a50')); ps(x + 2, 19, H('#fff4c0')); }
  yeso(0, 20, 319, 124, 201, MUSEO, 2.5); for (const x of [0, 108, 212, 319]) R.linea(x, 20, x, 124, MUSEO[0]);
  rr(0, 120, 319, 124, H('#2a2622'));
  T.d_relieve(R, 160, 92, { escala: 1 });
  rr(144, 98, 176, 106, K); rr(145, 99, 175, 105, H('#2a2622')); cifras('11000', 151, 100, H('#e8c070'));
  // en la pared: fotos de la excavación y el mapa de las colinas con sus puntos
  for (const [x, y, k] of [[92, 30, 0], [228, 30, 1]]) { rr(x - 1, y - 1, x + 22, y + 16, K); rr(x, y, x + 21, y + 15, H('#f4f0e4'));
    for (let yy = y + 2; yy <= y + 13; yy++) for (let xx = x + 2; xx <= x + 19; xx++) R.pset(xx, yy, yy < y + 6 ? H('#8ab4e0') : rmp(KAR, 2.6 - (yy - y - 6) / 4 + (h2(xx, yy, 205 + k) - 0.5), xx, yy));
    if (k === 0) { rr(x + 8, y + 5, x + 13, y + 7, KAR[4]); rr(x + 10, y + 7, x + 11, y + 12, KAR[4]); } else for (const dx of [5, 10, 15]) rr(x + dx, y + 6, x + dx + 1, y + 11, KAR[4]); }
  rr(232, 54, 300, 112, K); rr(233, 55, 299, 111, H('#e8dcc0')); for (let y = 58; y <= 108; y += 6) for (let x = 236; x <= 296; x++) if (h2(x >> 3, y, 206) > 0.4) ps(x, y + ri(Math.sin(x * 0.1) * 2), H('#c8b890'));
  for (const [x, y] of [[250, 70], [266, 80], [282, 66], [258, 94], [276, 98], [290, 84], [244, 84]]) { R.disco(x, y, 2, K); R.disco(x, y, 1, H('#e83a3a')); }
  R.linea(250, 70, 266, 80, H('#a83a2a')); R.linea(266, 80, 276, 98, H('#a83a2a'));
  rr(20, 54, 82, 70, K); rr(21, 55, 81, 69, H('#2a2622')); for (let k = 0; k < 4; k++) { rr(26 + k * 14, 60, 32 + k * 14, 64, H(['#e8c070', '#c8a050', '#a88040', '#886030'][k])); }
  // el suelo pulido con reflejos
  for (let y = 125; y <= 179; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#2e2a28', '#3e3834', '#4e4640', '#5e564e']), 1.8 - (y - 125) / 60 + ((x + y * 2) % 37 < 2 ? 0.8 : 0) + (h2(x >> 3, y >> 2, 202) - 0.5) * 0.3, x, y));
  // las peanas y las vitrinas de los lados
  rr(258, 150, 314, 156, K); madera(259, 151, 313, 155, 207, false, MADERA, 2.6); for (const x of [262, 308]) rr(x, 156, x + 2, 168, K);
  for (const [x0, x1, ya] of [[18, 78, 76], [240, 302, 90]]) { rr(x0, 120, x1, 164, K); rr(x0 + 1, 121, x1 - 1, 163, H('#e8e4dc')); rr(x1 - 6, 121, x1 - 1, 163, H('#c8c4bc')); rr(x0 + 1, 121, x1 - 1, 122, H('#ffffff'));
    for (let y = 164; y <= 176; y++) for (let x = x0; x <= x1; x++) if (b4(x, y) < 0.35 - (y - 164) / 40) tine(x, y, H('#e8e4dc'), 0.3); }
  T.d_leopardo(R, 48, 120, { escala: 1 }); T.d_figuritas(R, 271, 120, { escala: 1, fuera: 1 });
  for (const [x0, x1, ya] of [[18, 78, 72], [240, 302, 88]]) { R.linea(x0, ya, x1, ya, H('#c8dce8')); R.linea(x0, ya, x0, 120, H('#a8bccc')); R.linea(x1, ya, x1, 120, H('#a8bccc')); for (let k = 0; k < 3; k++) R.linea(x0 + 6 + k * 14, 116, x0 + 20 + k * 14, ya + 4, H('#e8f4fa')); }
});
const vitrinaBaja = () => {
  rr(108, 150, 212, 172, K); rr(109, 151, 211, 171, H('#3a3430')); rr(109, 151, 211, 152, H('#5a524c'));
  rr(112, 138, 208, 151, H('#4a4440')); T.d_estatua(R, 160, 151, { escala: 1 });
  R.linea(108, 134, 212, 134, H('#c8dce8')); R.linea(108, 134, 108, 150, H('#a8bccc')); R.linea(212, 134, 212, 150, H('#a8bccc'));
  for (let k = 0; k < 4; k++) R.linea(116 + k * 26, 149, 128 + k * 26, 136, H('#e8f4fa'));
};
const p20 = (t) => {
  fondo20();
  for (const [x, w] of [[48, 22], [160, 50], [271, 24]]) haz(x, 19, x, x === 160 ? 96 : 120, 3, w, H('#fff4d0'), 0.08);
  const g = pop(t, W.OLDEST, 0.3); if (g > 0 && t < W.OLDEST + 1) destello(176, 100, ri(1 + g * 2));
  // la guía señala el relieve; un señor mira; otro visitante cruza por delante
  R.actor(EL.arqueologaGB, 86, 150, t, { dir: 1, dedo: t > P20 + 0.3, habla: Math.sin(t * 8) > 0 });
  R.actor(EL.campesinoGB, 128, 146, t, { dir: 1, sonrisa: t > W.STONE3 });
  vitrinaBaja();
  const u = tramo(t, P20, P21 + 0.2), xv = ri(lerp(330, 214, u));
  R.actor(EL.espectadorGB, xv, 176, t, { dir: -1, anda: u < 1, sorpresa: u >= 1 });
};
// ── 21 · el mundo enterrado bajo las colinas: todo lo que espera abajo, y la lámpara que empieza a leer ─────────────
const CERROS21 = [[20, 64], [56, 70], [96, 66], [160, 58], [214, 66], [252, 62], [296, 68]];
const fondo21 = () => fijo('p21', () => {
  cielo(0, 70, pal(['#1a2048', '#2a3060', '#4a4070', '#8a5a78', '#d0806e', '#f0a870']));
  estrellas(4, 36, 26, 21);
  for (let x = 0; x < 320; x++) { let yy = 80; for (const [cx, cy] of CERROS21) yy = Math.min(yy, cy + ((x - cx) / 13) ** 2); yy = ri(yy);
    for (let y = yy; y <= 82; y++) R.pset(x, y, rmp(pal(['#3a2a2a', '#5a3e32', '#7a5640']), 2.2 - (y - yy) / 8, x, y)); R.pset(x, yy, H('#9a7a5a')); }
  for (let x = 150; x <= 170; x++) { R.pset(x, 57, H('#f4f0e4')); R.pset(x, 56, H('#ffffff')); }
  // las capas de tierra
  const CAP = [TIE, TIER, pal(['#5a4a3a', '#6e5c48', '#84705a', '#9a8670']), TIE, TIER, CALI];
  for (let y = 83; y <= 179; y++) for (let x = 0; x < 320; x++) { const c = Math.floor((y - 83 + Math.sin(x * 0.04) * 4 + Math.sin(x * 0.11 + 2) * 2) / 17); R.pset(x, y, rmp(CAP[Math.min(5, Math.max(0, c))], 1.8 + (h2(x >> 1, y >> 1, 211) - 0.5) * 0.9 - (y - 83) / 150, x, y)); }
  for (let i = 0; i < 70; i++) { const x = ri(h2(i, 1, 212) * 318), y = ri(86 + h2(i, 2, 212) * 92); rr(x, y, x + 1, y, CAL[3]); ps(x, y + 1, K); }
  // lo enterrado: pilares en T tumbados, pilares redondos, la estatua, el leopardo, el cuenco
  T.d_pilar(R, 30, 160, { escala: 0.9, sombra: false, inclinado: 28, relieves: ['zorro'] }); T.d_pilar(R, 90, 178, { escala: 0.95, sombra: false, relieves: ['jabali'] });
  T.d_pilar(R, 284, 172, { escala: 0.9, sombra: false, inclinado: -20, cara: true, brazos: false });
  pilarR(236, 136, 12, 34, 1, CAL, 0.2); pilarR(306, 110, 10, 22, 2, CAL, 0.2); pilarR(60, 112, 8, 18, 3, CAL, 0.2);
  T.d_leopardo(R, 216, 178, { escala: 1 }); T.d_figuritas(R, 120, 122, { escala: 1, tierra: true }); T.d_moler(R, 150, 168, { escala: 1 });
  T.d_estatua(R, 166, 132, { escala: 1 });
  for (let y = 84; y <= 179; y++) for (let x = 0; x < 320; x++) tine(x, y, H('#140c0c'), b4(x, y) < 0.5 ? 0.42 : 0.28);
});
const DORMIDOS = [[34, 140], [90, 150], [284, 150], [236, 118], [166, 124], [216, 158], [120, 110], [150, 160]];
const p21 = (t) => {
  fondo21();
  nubesVivas(t, [[80, 30, 20, 0.6, NUBT[1]], [230, 40, 16, 0.9, NUBT[2]]]);
  // lo que espera abajo late, uno tras otro, en «lying down there, waiting»
  DORMIDOS.forEach(([x, y], k) => { const ph = (t - W.LYING) * 1.6 - k * 0.35; if (ph < 0) return; const a = 0.12 + 0.1 * Math.sin(ph * 2.5); manchaLuz(x, y, 16, 12, H('#ffd8a0'), a); });
  // la arqueóloga en lo alto del cerro abre la cata y baja la luz: en «read» se enciende la estatua
  const cava = ease(tramo(t, P21, W.BEGINNING)), fondo = ri(lerp(62, 116, cava));
  for (let y = 59; y <= fondo; y++) for (let x = 160; x <= 172; x++) R.pset(x, y, x === 160 || x === 172 ? H('#0a0606') : rmp(pal(['#0e0808', '#1a1010', '#2a1c16']), 1.2 - (y - 59) / 50 + (h2(x, y, 213) - 0.5) * 0.6, x, y));
  for (let k = 0; k < 4; k++) { const v = (t * 1.2 + k / 4) % 1; if (cava > 0 && cava < 1) ps(176 + v * 8, 58 - Math.sin(v * Math.PI) * 6, TIE[3]); }
  const lee = tramo(t, W.BEGINNING, W.READ);
  R.actor(EL.arqueologaGB, 140, 60, t, { dir: 1, sostiene: [158, 52], sorpresa: t > W.READ, sonrisa: t > W.READ + 0.5 });
  rr(156, 49, 160, 54, K); rr(157, 50, 159, 53, H('#e8c020'));
  if (lee > 0) { haz(166, 56, 166, 124, 3, 14, H('#fff4c0'), 0.3 * lee); manchaLuz(166, 126, 28 * lee, 12 * lee, H('#fff4c0'), 0.35); }
  if (t > W.READ - 0.1) { T.d_estatua(R, 166, 132, { escala: 1 }); manchaLuz(166, 126, 30, 12, H('#fff4c0'), 0.3); const g = pop(t, W.READ - 0.1, 0.3); destello(144, 122, ri(1 + g * 3)); destello(190, 126, ri(1 + g * 2)); }
};
'''

RODAR = r'''
const año = (t) => t < P4 ? 2025 : t < P5 ? -9500 : t < P7 ? 2025 : t < P12 ? 2026 : t < P13 ? 2025 : t < P16 ? 2026 : t < P18 ? 2025 : t < P20 ? 2021 : 2026;
const efectos = [[W.LEFT + 0.05, 'toc'], [W.NOT, 'bip'], [W.RESTORING, 'toc'], [W.LIFE, 'chof'], [W.LENGTHWISE, 'tic'], [W.BASE + 0.25, 'toc'], [W.OFFERING, 'brillo'], [W.FIRST, 'flash'], [W.KNOWS, 'pop'],
  [W.ALONE, 'brillo'], [P8 + 0.1, 'motor'], [W.TEN, 'pop'], [W.TASH, 'brillo'], [W.STONE, 'toc'], [W.ROCK, 'toc'], [W.RISING, 'whoosh'], [W.HUMAN, 'interruptor'], [W.FACE, 'brillo'], [W.LOOKING, 'boing'],
  [P14 + 0.1, 'motor'], [P14 + 1.5, 'toc'], [W.LEOPARD, 'flash'], [W.FOX, 'pop'], [W.BOAR, 'pop'], [W.VULTURE, 'pop'], [W.SAME, 'brillo'], [W.SEALED, 'toc'], [W.TELLS - 0.1, 'whoosh'], [W.MAN, 'brillo'], [W.BULL, 'brillo'], [W.OLDEST, 'pop'], [W.READ, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10], [P11, p11], [P12, p12], [P13, p13], [P14, p14], [P15, p15], [P16, p16], [P17, p17], [P18, p18], [P19, p19], [P20, p20], [P21, p21]], { cartela: '2025', efectos, año });
'''

E['gb-colinas'] = ('Las colinas de piedra', '''// GB-COLINAS (frases «estatua», «karahan», «leopardo»), cartela 2025. Veintiún planos:
// 1. el almacén de hallazgos: ella sube la última caja a la balda («no mystery left?»); en «not at all» pita la radio;
// 2. colina·norte·muro: restauran el muro entre dos recintos; en «life-size» cede el barro y asoma la cabeza de piedra;
// 3. INSERTO la base del muro: el cepillo destapa la estatua de cabeza a pies; la cota «170» en «lengthwise»;
// 4. −9500, al atardecer: dos cazadores meten la estatua en la base del muro («set into its base»); la ofrenda;
// 5. el muro de lejos, de día: la foto cenital desde la escalera, el jalón y el «1» en «first time»;
// 6. de noche, la lámpara de obra: el arqueólogo se rasca la cabeza; el globo con quien la puso y su «?»;
// 7. la llanura al atardecer: Göbekli Tepe solo; en «no longer alone» se encienden las lomas; el pastorcillo señala;
// 8. otra colina excavándose: catas, la camioneta, banderitas en las lomas y el «10+» en «ten»;
// 9. hoy·karahan·mapa: se encienden las doce colinas de Taş Tepeler; la mano clava la última en «Stone Hills»;
// 10. hoy·karahan: ella baja por la escalera a la sala tallada; él señala los pilares;
// 11. los pilares brotan del suelo de roca; el sol y la linterna encuentran la cabeza tallada en «human head»;
// 12. 2025: la tierra baja por el pilar en T y en «face» aparece la cara; los dos se asombran;
// 13. al anochecer, la pasarela: en «looking back at us» brillan los ojos del pilar y el niño salta y se esconde;
// 14. agosto de 2026: llega la camioneta y las cajas de hallazgos pasan de mano en mano al montón;
// 15. la figura sentada sobre el leopardo sale de la tierra roja; flash en «leopard»;
// 16. 2025: el cuenco de clorita en la mesa del laboratorio; salen el zorro, el jabalí y el buitre, cada uno en su palabra;
// 17. la sala en corte: los mismos animales brillan en el pilar; la bolsa de tierra roja sellada bajo el banco;
// 18. Sayburç (2021): la calle del pueblo; en «tells» suben la lona y asoma la pared tallada;
// 19. el relieve en la sala oscura: la linterna va del hombre entre leopardos al del toro;
// 20. el museo: las vitrinas con el leopardo, las figuritas y la estatua; el relieve y su «11000»;
// 21. el mundo enterrado bajo las colinas: lo que espera late y, en «read», la lámpara enciende la estatua.''', W + UTIL + MIS + PLANOS_A + PLANOS_B + PLANOS_C + RODAR)
