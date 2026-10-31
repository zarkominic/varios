E = {}

# Ayudas comunes de este grupo (se anteponen al cuerpo de cada escena)
H = r'''
const mez = (c, d, a) => { const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255, r2 = d & 255, g2 = (d >> 8) & 255, b2 = (d >> 16) & 255;
  return (0xff000000 | (Math.round(b + (b2 - b) * a) << 16) | (Math.round(g + (g2 - g) * a) << 8) | Math.round(r + (r2 - r) * a)) >>> 0; };
const h1 = (a, b = 0) => { const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return s - Math.floor(s); };
const KK = hex('#1a1424'), PAPEL = hex('#f8f4e8');
// pega un búfer encima, saltándose los píxeles vacíos (0): para lo fijo que va por delante de un cielo que se mueve
const pegar = (R, b) => { for (let i = 0; i < 57600; i++) { const v = b[i]; if (v) R.pset(i % 320, (i / 320) | 0, v); } };
// aclara (o tiñe) un disco: halos de faroles, del fantasma, de la luna
const halo = (R, cx, cy, r, col, a) => { for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { if (x < 0 || y < 0 || x > 319 || y > 179) continue; const g = 1 - Math.hypot(x - cx, y - cy) / r; if (g > 0) R.pset(x, y, mez(R.pget(x, y), col, a * g * g)); } };
// un bocadillo de cómic con un pictograma dentro (dibuja(R, cx, cy)); cola hacia (qx, qy); a 0–1 lo hace crecer
const bocata = (R, cx, cy, w, hh, qx, qy, a, dibuja) => { if (a <= 0) return; const s = Math.min(1, a * 1.6), W = Math.round(w * s), Hh = Math.round(hh * s);
  R.poligono([[cx - 3, cy + Hh / 2 - 1], [cx + 3, cy + Hh / 2 - 1], [qx, qy]], KK); R.poligono([[cx - 2, cy + Hh / 2 - 2], [cx + 2, cy + Hh / 2 - 2], [qx + (qx < cx ? 1 : -1), qy - 2]], PAPEL);
  R.rect(cx - W / 2 - 1, cy - Hh / 2, cx + W / 2 + 1, cy + Hh / 2, KK); R.rect(cx - W / 2, cy - Hh / 2 - 1, cx + W / 2, cy + Hh / 2 + 1, KK);
  R.rect(cx - W / 2, cy - Hh / 2 + 1, cx + W / 2, cy + Hh / 2 - 1, PAPEL); R.rect(cx - W / 2 + 1, cy - Hh / 2, cx + W / 2 - 1, cy + Hh / 2, PAPEL);
  R.rect(cx - W / 2 + 1, cy + Hh / 2 - 1, cx + W / 2 - 1, cy + Hh / 2, hex('#c8c0b0'));
  if (s >= 1) dibuja(R, Math.round(cx), Math.round(cy)); };
// la nube de pensar: bolas blancas y tres bolitas hasta (qx, qy)
const piensa = (R, cx, cy, w, hh, qx, qy, a, dibuja) => { if (a <= 0) return; const s = Math.min(1, a * 1.5);
  for (let k = 0; k < 3; k++) { const u = (k + 1) / 4, x = Math.round(lerp(qx, cx, u)), y = Math.round(lerp(qy, cy + hh / 2, u)), r = 1.2 + k * 0.9; if (a * 3 > k * 0.6) { R.disco(x, y, r + 1, KK); R.disco(x, y, r, PAPEL); } }
  if (s < 0.4) return; const W = w * s / 2, Hh = hh * s / 2, B = [[-0.6, -0.5], [0, -0.75], [0.6, -0.5], [0.75, 0.1], [0.4, 0.6], [-0.3, 0.65], [-0.75, 0.1]];
  for (const [i, j] of B) R.disco(cx + i * W, cy + j * Hh, Hh * 0.62 + 1, KK); for (const [i, j] of B) R.disco(cx + i * W, cy + j * Hh, Hh * 0.62, PAPEL);
  R.rect(cx - W * 0.7, cy - Hh * 0.6, cx + W * 0.7, cy + Hh * 0.6, PAPEL); if (s >= 1) dibuja(R, Math.round(cx), Math.round(cy)); };
// una espada de pirata en la mano (x, y): hoja de 2 px con filo, guarda dorada y pomo; ang en radianes
const espada = (R, x, y, ang, L = 17) => { const ux = Math.cos(ang), uy = Math.sin(ang), x1 = Math.round(x + ux * L), y1 = Math.round(y + uy * L);
  const nx = Math.round(-uy), ny = Math.round(ux);
  R.linea(Math.round(x + ux * 2) + 1, Math.round(y + uy * 2) + 1, x1 + 1, y1 + 1, hex('#2a2e3a'));
  R.linea(Math.round(x + ux * 2) + nx, Math.round(y + uy * 2) + ny, x1 + nx, y1 + ny, hex('#8a92a8'));
  R.linea(Math.round(x + ux * 2), Math.round(y + uy * 2), x1, y1, hex('#eef2fa')); R.pset(x1, y1, hex('#ffffff'));
  R.linea(Math.round(x + ux * 2 - uy * 3), Math.round(y + uy * 2 + ux * 3), Math.round(x + ux * 2 + uy * 3), Math.round(y + uy * 2 - ux * 3), hex('#c8a040'));
  R.pset(Math.round(x - ux * 2), Math.round(y - uy * 2), hex('#f0d070')); return [x1, y1]; };
// la chispa de dos hojas que chocan (a 0–1)
const chispa = (R, x, y, a) => { if (a <= 0) return; const r = Math.round(2 + a * 4);
  for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4 + 0.3, l = k % 2 ? r : r * 0.6; for (let i = 1; i <= l; i++) R.pset(Math.round(x + Math.cos(an) * i), Math.round(y + Math.sin(an) * i), i > l - 1 ? hex('#f0a020') : hex('#fff4a0')); }
  R.disco(x, y, 1.5, hex('#ffffff')); };
// pictogramas de los bocadillos (sin letras): la vaca (el insulto clásico), el rayo, la flecha que devuelve
const vaca = (R, cx, cy) => { R.disco(cx, cy - 1, 6, KK); R.disco(cx, cy - 1, 5, hex('#f4f2ee')); R.rect(cx - 7, cy - 4, cx - 5, cy - 2, KK); R.rect(cx + 5, cy - 4, cx + 7, cy - 2, KK); R.pset(cx - 6, cy - 3, hex('#f0a0a8')); R.pset(cx + 6, cy - 3, hex('#f0a0a8'));
  R.rect(cx - 5, cy - 8, cx - 4, cy - 6, hex('#e8d8a8')); R.rect(cx + 4, cy - 8, cx + 5, cy - 6, hex('#e8d8a8')); R.rect(cx - 3, cy - 5, cx - 1, cy - 3, KK); R.rect(cx + 2, cy - 1, cx + 4, cy, KK);
  R.pset(cx - 2, cy - 2, KK); R.pset(cx + 2, cy - 2, KK); R.disco(cx, cy + 3, 3.4, KK); R.disco(cx, cy + 3, 2.6, hex('#f0a0a8')); R.pset(cx - 1, cy + 3, hex('#a85a6a')); R.pset(cx + 1, cy + 3, hex('#a85a6a')); };
const rayoP = (R, cx, cy, c = hex('#f0c020')) => { const P = [[cx + 2, cy - 8], [cx - 4, cy + 1], [cx, cy + 1], [cx - 2, cy + 8], [cx + 5, cy - 2], [cx + 1, cy - 2], [cx + 4, cy - 8]];
  R.poligono(P.map(([x, y]) => [x - 1, y]), KK); R.poligono(P.map(([x, y]) => [x + 1, y]), KK); R.poligono(P, c); R.pset(cx + 2, cy - 6, hex('#fff8c0')); };
const vuelta = (R, cx, cy, c = hex('#c83a3a')) => { for (let a = 0.2; a < 3.6; a += 0.12) { const x = Math.round(cx + Math.cos(a) * 4), y = Math.round(cy - Math.sin(a) * 4); R.pset(x, y, c); R.pset(x, y + 1, c); }
  R.poligono([[cx + 1, cy + 1], [cx + 7, cy + 1], [cx + 4, cy + 5]], c); };
// el tricornio de pirata (pictograma para la nube de pensar), con su calavera
const tricornioP = (R, cx, cy, s = 1) => { const q = (pts) => pts.map(([i, j]) => [cx + i * s, cy + j * s]);
  R.poligono(q([[-9, 3], [9, 3], [6, -5], [0, -2], [-6, -5]]), KK); R.poligono(q([[-7.5, 2], [7.5, 2], [5, -3.5], [0, -0.8], [-5, -3.5]]), hex('#2a2430'));
  R.rect(cx - 8 * s, cy + 2 * s, cx + 8 * s, cy + 3 * s - 1, hex('#c8a040')); R.disco(cx, cy - 0.5 * s, 2 * s, hex('#f4f2ee')); R.pset(cx - s, cy - s, KK); R.pset(cx + s, cy - s, KK); R.rect(cx - s, cy + s, cx + s, cy + s, KK); };
// la espada de los pictogramas, con su contorno para que se lea sobre el pergamino
const espadaP = (R, x, y, ang, L = 16) => { for (const [i, j] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) R.linea(x + i, y + j, Math.round(x + Math.cos(ang) * L) + i, Math.round(y + Math.sin(ang) * L) + j, KK); espada(R, x, y, ang, L); };
'''

E['la-monkey'] = ('Monkey Island', '''// LA-MONKEY (frases 15–16), 1990, cartela «1990». Cuatro planos:
// 1. el muelle, delante de la taberna, de noche: el aspirante a pirata llega con su hatillo al hombro («sets sail»); el
//    tentáculo morado llega saltando por detrás del pirata del tricornio y, en «secret», le roba el sombrero y se va con
//    él puesto; el pirata da un respingo y le amenaza con el puño; el loro y los de la taberna, a lo suyo;
// 2. (desde «The story») en lo alto del acantilado, bajo una luna enorme, el aspirante mira el mar con un mono al lado;
//    pasa un galeón; en «wants to be a pirate» le sale la nube con el tricornio y la calavera y salta de alegría;
// 3. (desde «Gilbert») el estudio en 1990: el diseñador de las gafas señala la pizarra con un puntero y aparecen el
//    pirata fantasma y el barco junto al mono; en «two young members» entran dos jóvenes; uno levanta la mano en «Tim»
//    y el otro en «Dave»;
// 4. (desde «and they filled it») el barco fantasma en la niebla verde: un mono tira una piel de plátano («jokes»),
//    salta otro mono («monkeys») y en «ghost pirate» sube de la niebla el pirata fantasma con su halo; da un paso y
//    resbala en la piel; los monos se ríen.''', H + r'''
const A = (s) => en('guybrush', (s - 1.5) / 8.493), B = (s) => en('escritores', (s - 11.054) / 9.047);
const P2 = A(6.02), P3 = B(10.98), P4 = B(16.1);
// 1 · el muelle delante de la taberna
const llega = A(1.55), para = A(3.95), viene = A(3.0), roba = A(4.35), huye = A(4.75);
const p1 = (t) => {
  T.isla(R, t, { encuadre: 'muelle', camara: 'taberna' });
  const sinS = t > roba;
  // el pirata del tricornio con su jarra de grog, junto a los barriles
  const pr = R.actor(EL.pirata, 194, 161, t, { dir: -1, tocado: sinS ? undefined : 'tricornio', sostiene: sinS ? undefined : [186, 148 - (Math.sin(t * 1.3) > 0.6 ? 4 : 0)],
    habla: !sinS && t < roba - 0.5 && Math.sin(t * 6) > 0.2, sorpresa: sinS && t < roba + 0.7, enfado: t > roba + 0.7, dedo: t > roba + 0.75, salto: t > roba && t < roba + 0.35 ? 3 : 0 });
  if (!sinS) { const [mx, my] = pr.mano; R.rect(mx - 4, my - 5, mx + 1, my + 2, KK); R.rect(mx - 3, my - 4, mx, my + 1, hex('#8a5a2a')); R.rect(mx - 3, my - 4, mx, my - 3, hex('#f4ecd0')); R.pset(mx + 1, my - 2, KK); R.pset(mx + 2, my - 1, KK); }
  else if (t < roba + 0.5) { const u = tramo(t, roba, roba + 0.5); R.rect(Math.round(lerp(186, 176, u)), Math.round(lerp(150, 160, u * u)), Math.round(lerp(186, 176, u)) + 3, Math.round(lerp(150, 160, u * u)) + 4, hex('#8a5a2a')); }
  else { R.rect(172, 158, 178, 160, KK); R.rect(173, 158, 177, 159, hex('#8a5a2a')); }   // la jarra, en el suelo
  // el tentáculo morado llega saltando por detrás, le quita el tricornio y se va con él puesto
  const v = tramo(t, viene, roba - 0.05), w = tramo(t, huye, P2 - 0.1);
  const xm = Math.round(lerp(338, 222, v) + lerp(0, 130, w));
  T.tentaculo(R, xm, 163, t, { color: 'morado', dir: w > 0 ? 1 : -1, anda: (v > 0 && v < 1) || w > 0, accesorio: sinS ? 'pirata' : undefined, expresion: sinS ? 'feliz' : 'malvado',
    mira: sinS ? [1, -0.3] : [-0.8, -0.6], salto: t > roba - 0.2 && t < roba + 0.15 ? 9 : 0, brazos: t > roba - 0.25 && t < roba + 0.3 ? 1 : 0 });
  if (t > roba - 0.05 && t < roba + 0.3) for (let k = 0; k < 3; k++) R.linea(204 + k * 3, 128 + k * 2, 214 + k * 3, 128 + k * 2, hex('#f2eee2'));
  // el aspirante llega por el muelle con el hatillo al hombro
  const ua = tramo(t, llega, para), xa = Math.round(lerp(-20, 112, ua));
  const ha = R.actor(EL.aspirante, xa, 162, t, { dir: 1, anda: ua > 0 && ua < 1, sostiene: [xa + 15, 140], sorpresa: t > roba && t < roba + 0.8, sonrisa: (ua >= 1 && t < roba) || t > roba + 0.8 });
  const [hx, hy] = ha.mano, bx = hx - 24, by = hy - 13;
  R.linea(hx, hy, bx, by, hex('#5a3a1e')); R.linea(hx, hy - 1, bx, by - 1, hex('#a8743c'));
  R.disco(bx, by + 3, 5, KK); R.disco(bx, by + 3, 4, hex('#c83a3a')); R.disco(bx - 1, by + 2, 2, hex('#e85a4a'));
  for (const [i, j] of [[-2, 1], [1, 4], [2, 1], [-1, 5]]) R.pset(bx + i, by + 3 + j, hex('#f4f2ee')); R.rect(bx - 1, by - 2, bx + 1, by - 1, hex('#c83a3a'));
};
// 2 · el acantilado bajo la luna: un muchacho que quiere ser pirata
let roca2 = null;
const pintaRoca2 = () => { const b = R.nuevo(), prev = R.usar(b);
  // el cabo lejano con el pueblo pirata y su faro
  R.poligono([[226, 123], [244, 116], [262, 113], [284, 111], [300, 113], [319, 109], [319, 123]], hex('#141c30'));
  for (let k = 0; k < 7; k++) { const x = 250 + k * 9, y = 113 - (k % 3); R.rect(x, y - 5, x + 6, y + 2, hex('#0e1424')); R.poligono([[x - 1, y - 5], [x + 3, y - 9], [x + 7, y - 5]], hex('#1a2238')); }
  R.rect(304, 94, 307, 110, hex('#c8c4b8')); R.rect(304, 94, 305, 110, hex('#e8e4d8')); R.rect(303, 92, 308, 94, hex('#5a2a2a'));
  // el acantilado: estratos, grietas y la luz de la luna por el lado del mar
  const top = (x) => x < 180 ? Math.round(115 + x * 0.022) : 120;
  R.poligono([[0, 114], [90, 117], [180, 119], [188, 126], [192, 142], [200, 160], [206, 180], [0, 180]], hex('#3a3046'));
  const RC = [hex('#241c2e'), hex('#2e2438'), hex('#3a3046'), hex('#4a3e56'), hex('#5e5068'), hex('#7a6a80')];
  for (let y = 112; y < 180; y++) for (let x = 0; x < 210; x++) { if (R.pget(x, y) !== hex('#3a3046')) continue;
    const banda = ((y + Math.round(Math.sin(x * 0.07) * 3)) % 9 + 9) % 9, n = h1(x >> 1, y), luz = x > 150 ? (x - 150) / 60 : 0, sombra = (y - 118) / 70;
    let k = 2 + (banda < 2 ? -1 : banda === 8 ? 1 : 0) + (n < 0.12 ? -1 : n > 0.9 ? 1 : 0) + Math.round(luz * 2 - sombra * 1.2);
    R.pset(x, y, RC[Math.max(0, Math.min(5, k))]); }
  for (let k = 0; k < 9; k++) { let x = 20 + k * 21, y = 124 + (k % 3) * 9; for (let i = 0; i < 14; i++) { R.pset(x, y, hex('#1a1422')); x += h1(k, i) > 0.5 ? 1 : 0; y += 1; } }
  // la hierba del borde, con matas y florecillas
  for (let x = 0; x < 184; x++) { const y = top(x); R.pset(x, y - 1, hex('#2a5a3a')); R.pset(x, y, hex('#3a7a4a')); R.pset(x, y + 1, hex('#2a5a3a'));
    if (h1(x, 3) > 0.55) R.pset(x, y - 2 - (h1(x, 4) > 0.7 ? 1 : 0), hex('#4a8a5a')); if (h1(x, 5) > 0.93) { R.pset(x, y - 3, hex('#f0d060')); } }
  // el cañón viejo apuntando al mar, con su cureña y las balas
  R.rect(12, 106, 30, 114, KK); R.rect(13, 107, 29, 113, hex('#6a4a2a')); R.rect(13, 107, 29, 108, hex('#8a6a3a')); R.disco(16, 114, 3, KK); R.disco(16, 114, 2, hex('#4a3420')); R.disco(27, 114, 3, KK); R.disco(27, 114, 2, hex('#4a3420'));
  R.poligono([[16, 102], [44, 98], [45, 104], [17, 108]], KK); R.poligono([[17, 103], [43, 99], [44, 103], [18, 107]], hex('#3a3e4a')); R.linea(18, 103, 42, 100, hex('#6a7080')); R.disco(17, 105, 3, hex('#2a2e3a'));
  for (const [x, y] of [[36, 114], [40, 114], [38, 111]]) { R.disco(x, y, 2, KK); R.pset(x - 1, y - 1, hex('#6a7080')); }
  // el tronco de la palmera (las hojas se mecen aparte)
  for (let i = 0; i <= 66; i++) { const u = i / 66, x = Math.round(64 + Math.sin(u * 1.4) * 22 - u * 4), y = 116 - i; R.rect(x - 2, y, x + 2, y, hex('#5a3a22')); R.pset(x - 1, y, hex('#8a6a3a')); if (i % 4 === 0) R.rect(x - 2, y, x + 2, y, hex('#3a2416')); }
  R.usar(prev); return b; };
const P2a = A(6.3), mono2 = A(6.6), quiere = A(8.84), salta = A(9.3);
const p2 = (t) => {
  R.cielo(t, { hor: 123, luna: [214, 62, 26] });
  R.lunaLlena(214, 62, 26);
  R.nubes(t, { y0: 14, y1: 116, vel: 6, bandas: [[22, 7, 1], [104, 6, 0.8]] }, [214, 62, 26]);
  R.nubes(t * 0.5 + 40, { y0: 40, y1: 80, vel: 4, bandas: [[60, 9, 0.9]] }, [214, 62, 26]);
  R.mar(t, { hor: 123, luzX: 214 });
  // un galeón lejano que cruza la estela de la luna
  R.barco(Math.round(lerp(300, 196, tramo(t, P2, P3))), 125, t, { tipo: 'galeon', esc: 0.6, dir: -1 });
  for (let k = 0; k < 2; k++) { const x = Math.round((t * (14 + k * 5) + k * 160) % 360) - 20, y = 40 + k * 22 + Math.round(Math.sin(t * 7 + k) * 2); R.pset(x, y, KK); R.pset(x - 1, y - 1, KK); R.pset(x + 1, y - 1, KK); R.pset(x - 2, y, KK); R.pset(x + 2, y, KK); }
  if (!roca2) roca2 = pintaRoca2(); pegar(R, roca2);
  // las ventanas del pueblo y el faro, que gira
  for (let k = 0; k < 7; k++) if (Math.sin(t * 0.7 + k * 2.3) > -0.6) R.pset(252 + k * 9, 110 - (k % 3), hex('#f0c060'));
  { const a = t * 1.6, l = Math.cos(a); if (l > 0) for (let i = 0; i < 26 * l; i++) R.pset(Math.round(306 - i), 93 + Math.round(i * 0.06), mez(R.pget(Math.round(306 - i), 93 + Math.round(i * 0.06)), hex('#fff0b0'), 0.6 * (1 - i / 26))); R.rect(305, 91, 306, 92, hex('#fff0a0')); }
  // las hojas de la palmera, que se mecen con la brisa
  const cx = 82, cy = 50; for (let k = 0; k < 7; k++) { const an = -2.9 + k * 0.62 + Math.sin(t * 1.5 + k) * 0.06, L = 26 - Math.abs(k - 3) * 2;
    for (let i = 0; i < L; i++) { const u = i / L, x = Math.round(cx + Math.cos(an) * i), y = Math.round(cy + Math.sin(an) * i + u * u * 10); R.pset(x, y, hex('#1e4a2a')); R.pset(x, y + 1, hex('#2e6a3a'));
      if (i % 2 === 0 && i > 3) { R.pset(x, y + 2, hex('#3a7a4a')); R.pset(x + (k < 3 ? -1 : 1), y + 3, hex('#2a5a34')); } } }
  R.disco(cx, cy + 1, 3, hex('#4a3420')); R.pset(cx - 1, cy + 2, hex('#6a4a2a'));
  // la ola que rompe contra la roca
  const ola = (t * 0.55) % 1; for (let k = 0; k < 18; k++) { const a = k / 18 * Math.PI, r = 4 + ola * 14, x = Math.round(198 + Math.cos(a) * r * 1.4), y = Math.round(164 - Math.sin(a) * r * (1 - ola * 0.4)); if (ola < 0.8) { R.pset(x, y, hex('#e8f4ff')); R.pset(x + 1, y, hex('#a8c8e8')); } }
  for (let x = 196; x < 230; x++) if (h1(x, Math.floor(t * 6)) > 0.6) R.pset(x, 170 + Math.round(Math.sin(x * 0.4 + t * 3)), hex('#c8e0f8'));
  // el mono que sube a la roca y se come un plátano; el aspirante mira el mar y sueña
  const um = tramo(t, mono2, mono2 + 0.7), xmo = Math.round(lerp(196, 166, um));
  T.bicho(R, xmo, 120 - (um > 0 && um < 1 ? Math.round(Math.sin(um * Math.PI) * 8) : 0), t, { quien: 'mono', dir: -1, anda: um > 0 && um < 1, platano: um >= 1 && t < salta, salta: t > salta && t < salta + 1.2 });
  const sueno = t > quiere;
  R.actor(EL.aspirante, 134, 119, t, { dir: t < P2a ? 1 : t < quiere - 0.6 ? 1 : -1, sonrisa: sueno || (t > A(7.1) && t < A(7.8)), brazos: t > salta && t < salta + 1, salto: t > salta && t < salta + 0.5 ? Math.round(Math.sin((t - salta) * 6.3) * 6) : 0, habla: t > A(6.6) && t < A(7.6) && Math.sin(t * 9) > 0 });
  piensa(R, 100, 66, 58, 40, 138, 92, tramo(t, quiere, quiere + 0.4), (R, x, y) => { tricornioP(R, x - 10, y + 2, 2); R.rect(x + 12, y - 14, x + 13, y + 12, hex('#5a3a1e')); R.rect(x + 14, y - 14, x + 26, y - 2, KK); R.rect(x + 15, y - 13, x + 25, y - 3, hex('#1e1a24')); R.icono('calavera', x + 17, y - 12, hex('#f4f2ee'), KK, 1); });
};
// 3 · el estudio en 1990: los tres de la isla de los monos, con el pirata fantasma en la pizarra
const dos = B(12.25), tim = B(14.15), dave = B(14.97), señala = B(11.45);
const marcador = (R, x, y, c, lim) => { if (x <= lim) { R.pset(x, y, c); } };
const aro = (R, cx, cy, rx, ry, c, lim, a0 = 0, a1 = 6.283) => { for (let a = a0; a < a1; a += 0.06) marcador(R, Math.round(cx + Math.cos(a) * rx), Math.round(cy + Math.sin(a) * ry), c, lim); };
const dibujos = (R, lim) => {
  // el mono (ya estaba en la pizarra)
  const M = hex('#8a5a2a'); aro(R, 112, 50, 10, 10, M, 999); aro(R, 112, 53, 6, 5, M, 999); aro(R, 101, 47, 3, 3, M, 999); aro(R, 123, 47, 3, 3, M, 999);
  R.rect(109, 47, 109, 48, KK); R.rect(115, 47, 115, 48, KK); aro(R, 112, 54, 3, 2, KK, 999, 0.3, 2.8);
  // el pirata fantasma: cuerpo de sábana con la barba, el bicornio y los ojos
  const G = hex('#3a8a4a'); aro(R, 158, 50, 11, 11, G, lim, 3.14, 6.29); for (let x = 147; x <= 169; x++) marcador(R, x, 50 + Math.round(Math.abs(Math.sin((x - 147) * 0.45)) * 16) + 8, G, lim);
  for (const x of [147, 169]) for (let y = 50; y < 58; y++) marcador(R, x, y, G, lim);
  for (let x = 150; x <= 166; x++) marcador(R, x, 38 - Math.round(Math.sin((x - 150) / 16 * Math.PI) * 6), KK, lim); for (let x = 148; x <= 168; x++) marcador(R, x, 38, KK, lim);
  for (const x of [154, 162]) { marcador(R, x, 47, KK, lim); marcador(R, x, 48, KK, lim); } for (let x = 153; x <= 163; x++) marcador(R, x, 54 + (x % 2), G, lim);
  // el barco con su vela
  const Bc = hex('#2a4fa8'); for (let x = 186; x <= 214; x++) marcador(R, x, 66 + Math.round(Math.abs(x - 200) > 10 ? -1 : 0), Bc, lim); for (let x = 189; x <= 211; x++) marcador(R, x, 71, Bc, lim);
  for (let y = 66; y <= 71; y++) { marcador(R, 186 + (y - 66) * 0.6 | 0, y, Bc, lim); marcador(R, 214 - (y - 66) * 0.6 | 0, y, Bc, lim); }
  for (let y = 40; y < 66; y++) marcador(R, 200, y, Bc, lim); for (let y = 42; y < 62; y++) marcador(R, 201 + Math.round(Math.sin((y - 42) / 20 * Math.PI) * 9), y, Bc, lim);
  for (let x = 200; x < 206; x++) marcador(R, x, 41, hex('#c83a3a'), lim); };
const p3 = (t) => {
  T.estudio(R, t, { encuadre: 'pizarra', camara: 'general', anyo: 1990, trazo: 0 });
  const u = tramo(t, señala, dos + 0.9), lim = Math.round(lerp(140, 216, u));
  dibujos(R, lim);
  // el diseñador de las gafas explica con el puntero, que va siguiendo el trazo
  const yg = 152, d = R.actor(EL.disenador, 96, yg, t, { dir: 1, dedo: t > señala - 0.2 && t < B(15.6), habla: t > señala && t < dos && Math.sin(t * 8) > 0, sonrisa: t > tim });
  if (t > señala - 0.2 && t < B(15.6)) { const tx = u < 1 ? Math.min(lim, 214) : 200 + Math.round(Math.sin(t * 3) * 10), ty = u < 1 ? 50 + Math.round(Math.sin(t * 9) * 8) : 58;
    R.linea(d.mano[0], d.mano[1], tx, ty, hex('#5a3a1e')); R.linea(d.mano[0] + 1, d.mano[1], tx + 1, ty, hex('#a8743c')); R.rect(tx - 1, ty - 1, tx, ty, hex('#f4f2ee')); }
  // entran los dos jóvenes; cada uno levanta la mano cuando se dice su nombre
  const e1 = tramo(t, dos - 0.4, dos + 1.0), e2 = tramo(t, dos - 0.1, dos + 1.4);
  R.actor(EL.disenador2, Math.round(lerp(334, 168, e1)), 152, t, { dir: -1, anda: e1 > 0 && e1 < 1, dedo: t > tim && t < tim + 1.3, sonrisa: t > tim, habla: t > tim && t < tim + 0.6 && Math.sin(t * 10) > 0 });
  R.actor(EL.disenador2, Math.round(lerp(352, 206, e2)), 153, t, { dir: -1, anda: e2 > 0 && e2 < 1, dedo: t > dave && t < dave + 1.2, sonrisa: t > dave, habla: t > dave && t < dave + 0.6 && Math.sin(t * 10) > 0, pal: { H: hex('#c89a4a'), h: hex('#e0b860'), C: hex('#5a8a4a'), c: hex('#3e6a34') } });
};
// 4 · el barco fantasma en la niebla: chistes, monos y el pirata fantasma
const chiste = B(16.91), monos = B(17.85), fantasma = B(18.59), lechuck = B(19.39), resbala = B(20.15);
const p4 = (t) => {
  T.isla(R, t, { encuadre: 'barcoFantasma', camara: 'general' });
  // el mono que se come el plátano y tira la piel
  const um = tramo(t, P4 - 0.1, chiste - 0.3), xm = Math.round(lerp(-12, 96, um));
  T.bicho(R, xm, 168, t, { quien: 'mono', dir: 1, anda: um > 0 && um < 1, platano: um >= 1 && t < chiste, salta: t > resbala + 0.1 });
  const vp = tramo(t, chiste, chiste + 0.5), px = Math.round(lerp(xm + 8, 132, vp)), py = Math.round(lerp(150, 166, vp) - Math.sin(vp * Math.PI) * 14);
  const pielX = t > resbala ? Math.round(lerp(132, 168, tramo(t, resbala, resbala + 0.4))) : px, pielY = t > resbala ? Math.round(166 - Math.sin(tramo(t, resbala, resbala + 0.4) * Math.PI) * 12) : py;
  if (t > chiste) { R.rect(pielX - 3, pielY, pielX + 3, pielY + 1, hex('#6a5a1a')); R.rect(pielX - 2, pielY - 1, pielX + 2, pielY, hex('#f0d040')); R.pset(pielX - 3, pielY - 2, hex('#f0d040')); R.pset(pielX + 3, pielY - 2, hex('#e0c030')); }
  // el segundo mono que salta por las rocas
  const u2 = tramo(t, monos - 0.3, monos + 0.6); if (u2 > 0) T.bicho(R, Math.round(lerp(330, 222, u2)), 168 - (u2 < 1 ? Math.round(Math.abs(Math.sin(u2 * Math.PI * 3)) * 10) : 0), t, { quien: 'mono', dir: -1, anda: u2 < 1, salta: t > resbala + 0.1 });
  // el pirata fantasma sube de la niebla con su halo verde, ríe y da un paso… sobre la piel
  if (t > fantasma - 0.2) { const s = tramo(t, fantasma - 0.2, fantasma + 0.5), wv = tramo(t, lechuck + 0.25, resbala), xf = Math.round(lerp(156, 126, wv)), suelo = Math.round(lerp(196, 168, s));
    halo(R, xf + 7, suelo - 14, 30 + Math.sin(t * 7) * 2, hex('#7af0a0'), 0.9 * s); halo(R, xf + 7, suelo - 14, 18, hex('#c8ffd8'), 0.6 * s);
    for (let k = 0; k < 5; k++) { const an = t * 2.2 + k * 1.26, rr = 16 + Math.sin(t * 3 + k) * 3; R.pset(Math.round(xf + 7 + Math.cos(an) * rr), Math.round(suelo - 14 + Math.sin(an) * rr * 0.8), hex('#d8ffe0')); R.pset(Math.round(xf + 7 + Math.cos(an) * rr) + 1, Math.round(suelo - 14 + Math.sin(an) * rr * 0.8), hex('#7af0a0')); }
    for (let i = 0; i < 18; i++) { const y = suelo - 2 + Math.round(i * 0.5), x = Math.round(xf + 7 + Math.sin(t * 5 + i * 0.5) * (4 + i * 0.4)); R.pset(x, y, mez(R.pget(x, y), hex('#b8ffd0'), 0.7)); }
    R.recorte([0, 0, 319, 168]);
    R.actor(EL.fantasma, xf, suelo, t, { dir: -1, anda: wv > 0 && wv < 1, brazos: t > lechuck - 0.1 && t < lechuck + 0.6, habla: t > lechuck - 0.1 && t < lechuck + 0.6, sonrisa: t < resbala, sorpresa: t > resbala, salto: t > resbala && t < resbala + 0.45 ? Math.round(Math.sin((t - resbala) * 7) * 9) : 0 });
    R.recorte(null);
    if (Math.floor(t * 15) % 7 === 0) for (let y = suelo - 28; y < suelo; y += 3) for (let x = xf; x < xf + 15; x++) R.pset(x, y, mez(R.pget(x, y), hex('#1a3a2a'), 0.5));
    if (t > resbala && t < resbala + 0.8) R.icono('!', xf + 18, suelo - 40, hex('#f0c020'), KK, 2); }
  T.tinte(R, 0, 179, [40, 120, 70], 0.05);
};
const efectos = [[roba, 'whoosh'], [roba + 0.8, 'boing'], [P2 + 0.3, 'ola'], [quiere + 0.05, 'brillo'], [salta + 0.1, 'boing'], [señala + 0.1, 'toc'], [tim, 'pop'], [chiste + 0.45, 'chof'], [fantasma, 'whoosh'], [resbala, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1990', efectos, año: 1990 });
''')

E['la-insultos'] = ('El duelo de insultos', '''// LA-INSULTOS (frases 17–19), 1990. Siete planos:
// 1. el muelle de día: el aspirante y un pirata se baten a toda velocidad, chispas en cada choque («reflexes»); en
//    «wit» paran, el aspirante baja la espada y le sale un «!»; al pirata, un «?»; dos piratas jalean y la maestra de
//    esgrima mira desde la puerta de la taberna;
// 2. (desde «You collect») la selva de noche, el claro del duelo: el pirata suelta un insulto (bocadillo con una vaca,
//    «insults»), el aspirante se lo devuelve (la vaca con la flecha, «comebacks»), y en «sharpest» le lanza un rayo; el
//    pirata se queda con un «?» y en «wins» se le cae la espada al suelo (gag);
// 3. (desde «and a running gag») el claro de cerca: el pirata recoge la espada y avanza enfadado; el aspirante recula
//    hasta la pala y, en «Look behind you», señala detrás de él; el morado del tricornio robado asoma tras el tronco;
// 4. (desde «A three-headed monkey») la selva con el árbol grande: el mono de tres cabezas sale a la rama y saluda, con
//    el morado al lado; en «turns around» el pirata se vuelve a mirar y, en «slip away», el aspirante se escabulle;
// 5. (desde «to become a pirate») la mansión de la gobernadora: entra el aspirante; en «three trials» salen las tres
//    pruebas (espada, pala, ídolo) con su 1, 2, 3; en «Sword Master» la maestra baja por la verja, cruzan las espadas y la
//    primera prueba se marca;
// 6. (desde «Find buried treasure») la ventana del ídolo: llega con el cofre desenterrado, lo deja, sube a la caja y en
//    «idol» se lleva el ídolo dorado; baja de un salto con él en alto;
// 7. (desde «And almost everything») inserto: la mesa de la taberna; del bolsillo de la casaca colgada salen volando
//    objetos absurdos (una llave, un pollo de goma con polea, un mapa, un plátano, un pez y un queso) que caen en la mesa;
//    el morado asoma por detrás con su tricornio.''', H + r'''
const A = (s) => en('insultos', (s - 0.5) / 7.712), Bm = (s) => en('mono', (s - 9.735) / 9.389), C = (s) => en('pruebas', (s - 19.924) / 13.857);
const P2 = A(3.9), P3 = Bm(9.735), P4 = Bm(14.58), P5 = C(19.924), P6 = C(25.0), P7 = C(29.2);
// 1 · el muelle de día: espadas a toda velocidad
const golpes = [A(0.62), A(0.92), A(1.58), A(1.96), A(2.42)], para = A(2.8), ingenio = A(3.02);
const p1 = (t) => {
  T.isla(R, t, { encuadre: 'muelle', camara: 'general', luz: 'dia' });
  const lucha = t < para;
  // los que jalean y la maestra de esgrima en la puerta de la taberna
  R.actor(EL.esgrimista, 230, 129, t, { dir: -1, sonrisa: t > ingenio });
  R.actor(EL.pirata, 168, 160, t, { dir: -1, brazos: lucha && Math.sin(t * 8) > 0.2, habla: Math.sin(t * 6) > 0.3, sonrisa: !lucha, pal: { C: hex('#3a6a8a'), c: hex('#2a4a6a'), H: hex('#8a5a2a') } });
  R.actor(EL.pirata, 190, 164, t, { dir: -1, dedo: lucha && Math.sin(t * 7 + 1) > 0.4, sonrisa: true, pal: { C: hex('#c8a040'), c: hex('#8a6a2a'), F: hex('#3a3a4a') } });
  // el empuje de cada golpe: uno ataca y el otro para
  let emp = 0, quien = 0; golpes.forEach((g, i) => { const v = Math.max(0, 1 - Math.abs(t - g) / 0.2); if (v > emp) { emp = v; quien = i % 2; } });
  const xa = Math.round(70 + (quien === 0 ? emp * 7 : -emp * 3)), xp = Math.round(104 - (quien === 1 ? emp * 7 : -emp * 3));
  const a = R.actor(EL.aspirante, xa, 162, t, { dir: 1, sostiene: lucha ? [xa + 21, 146 - Math.round(Math.sin(t * 11) * 3)] : [xa + 18, 154], enfado: lucha, sonrisa: !lucha, salto: lucha && quien === 0 && emp > 0.5 ? 1 : 0 });
  const p = R.actor(EL.pirata, xp, 162, t, { dir: -1, sostiene: lucha ? [xp - 6, 146 + Math.round(Math.sin(t * 11) * 3)] : [xp - 4, 150], enfado: lucha, sorpresa: !lucha && t > ingenio + 0.2, salto: lucha && quien === 1 && emp > 0.5 ? 1 : 0 });
  const angA = lucha ? -0.55 + Math.sin(t * 13) * 0.35 : 1.25, angP = lucha ? Math.PI + 0.55 - Math.sin(t * 13 + 1) * 0.35 : Math.PI - 0.9;
  const ta = espada(R, a.mano[0], a.mano[1], angA), tp = espada(R, p.mano[0], p.mano[1], angP);
  golpes.forEach((g) => chispa(R, Math.round((a.mano[0] + p.mano[0]) / 2), Math.min(ta[1], tp[1]) + 3, 1 - Math.abs(t - g) / 0.12));
  if (t > ingenio) { const s = tramo(t, ingenio, ingenio + 0.2); R.icono('!', a.cabeza[0] - 3, a.cabeza[1] - 14 - Math.round(s * 3), hex('#f0c020'), KK, 2); }
  if (t > ingenio + 0.3) R.icono('?', p.cabeza[0] - 5, p.cabeza[1] - 16, hex('#3a5a8a'), hex('#c8c0b0'), 2);
};
// 2 · el claro del duelo en la selva: la vaca, la réplica, el rayo… y la espada que cae
const insulto = A(4.29), replica = A(4.95), afilada = A(6.84), duda = A(7.15), gana = A(7.6), suelo2 = 150;
const p2 = (t) => {
  T.isla(R, t, { encuadre: 'bosque', camara: 'general' });
  const cae = tramo(t, gana, gana + 0.45);
  const a = R.actor(EL.aspirante, 134, suelo2, t, { dir: 1, sostiene: [156, 136 + Math.round(Math.sin(t * 3) * 2)], habla: (t > replica && t < replica + 0.5) || (t > afilada && t < afilada + 0.5), sonrisa: t > afilada, salto: t > gana + 0.1 && t < gana + 0.5 ? Math.round(Math.sin((t - gana - 0.1) * 8) * 5) : 0 });
  const p = R.actor(EL.pirata, 184, suelo2, t, { dir: -1, sostiene: t < gana ? [178, 136 + Math.round(Math.sin(t * 3 + 1) * 2)] : undefined, habla: t > insulto - 0.1 && t < insulto + 0.5, enfado: t < afilada, sorpresa: t > afilada && t < gana + 0.6, triste: t > gana + 0.6 });
  espada(R, a.mano[0], a.mano[1], -0.25, 18);
  if (cae < 1 && t < gana) espada(R, p.mano[0], p.mano[1], Math.PI + 0.25, 18);
  else if (cae < 1) { const x = Math.round(lerp(178, 194, cae)), y = Math.round(lerp(136, 147, cae * cae)); espada(R, x, y, Math.PI + 0.25 + cae * 4.2, 18); }
  else { const reb = tramo(t, gana + 0.45, gana + 0.65); espada(R, 196, 148 - Math.round(Math.sin(reb * Math.PI) * 3), Math.PI - 0.02, 18); }
  // los bocadillos: vaca (insulto), vaca devuelta (réplica), rayo (la réplica más afilada) y «?»
  bocata(R, 204, 104, 28, 22, 193, 124, tramo(t, insulto - 0.1, insulto + 0.15) * (1 - tramo(t, afilada - 0.2, afilada - 0.1)), vaca);
  bocata(R, 130, 104, 32, 22, 141, 124, tramo(t, replica - 0.1, replica + 0.15) * (1 - tramo(t, afilada - 0.2, afilada - 0.1)), (R, x, y) => { vaca(R, x - 5, y); vuelta(R, x + 9, y - 1); });
  bocata(R, 130, 102, 28, 24, 141, 124, tramo(t, afilada - 0.05, afilada + 0.2), (R, x, y) => rayoP(R, x, y));
  bocata(R, 204, 104, 22, 22, 193, 124, tramo(t, duda, duda + 0.2), (R, x, y) => R.icono('?', x - 5, y - 7, hex('#3a5a8a'), hex('#c8c0b0'), 2));
  // luciérnagas de más que se apartan del duelo
  for (let k = 0; k < 6; k++) { const x = Math.round(60 + k * 40 + Math.sin(t * 0.9 + k * 2) * 12), y = Math.round(118 + Math.sin(t * 1.3 + k) * 10); if (Math.sin(t * 4 + k * 1.7) > 0) { R.pset(x, y, hex('#f0f890')); R.pset(x + 1, y, hex('#a8c050')); } }
};
// 3 · el claro de cerca: el pirata avanza; «¡mira detrás de ti!»
const recoge = Bm(9.9), avanza0 = Bm(10.4), avanza1 = Bm(12.3), tajo = Bm(11.4), mira = Bm(13.21);
const p3 = (t) => {
  const d = T.isla(R, t, { encuadre: 'bosque', camara: 'claro' });
  // el morado del tricornio robado asoma por detrás del tronco caído, a curiosear
  const asoma = tramo(t, Bm(11.0), Bm(11.6)) * (1 - tramo(t, Bm(14.0), Bm(14.4)));
  R.recorte([0, 0, 319, 134]); T.tentaculo(R, 250, Math.round(lerp(166, 148, asoma)), t, { color: 'morado', dir: -1, accesorio: 'pirata', expresion: t > mira ? 'sorpresa' : 'feliz', mira: [-1, 0.2] }); R.recorte(null);
  const u = tramo(t, avanza0, avanza1), xp = Math.round(lerp(208, 150, u)), xa = Math.round(lerp(124, 100, tramo(t, avanza0 + 0.2, avanza1 + 0.2)));
  const a = R.actor(EL.aspirante, xa, 158, t, { dir: 1, anda: t > avanza0 + 0.2 && t < avanza1 + 0.2, sostiene: t < mira - 0.2 ? [xa + 18, 150] : undefined, dedo: t > mira - 0.2, sorpresa: t < mira - 0.2, sonrisa: t > mira + 0.9, habla: t > mira - 0.1 && t < mira + 0.9 && Math.sin(t * 10) > 0 });
  if (t < mira - 0.2) espada(R, a.mano[0], a.mano[1], 1.0, 16);
  const golpe = tramo(t, tajo - 0.15, tajo + 0.15), dud = t > mira + 0.3;
  const p = R.actor(EL.pirata, xp, 158, t, { dir: -1, anda: u > 0 && u < 1, sostiene: t < recoge ? [xp + 2, 156] : [xp - 6, 142 - Math.round(Math.sin(golpe * Math.PI) * 6)], enfado: !dud, sorpresa: dud && t < mira + 0.9, salto: t > recoge - 0.1 && t < recoge + 0.2 ? 2 : 0 });
  espada(R, p.mano[0], p.mano[1], t < recoge ? Math.PI - 0.1 : Math.PI + 0.5 - Math.sin(golpe * Math.PI) * 1.3, 18);
  if (golpe > 0 && golpe < 1) for (let k = 0; k < 5; k++) { const an = Math.PI + 0.5 - k * 0.3; R.pset(Math.round(p.mano[0] + Math.cos(an) * 20), Math.round(p.mano[1] + Math.sin(an) * 20), hex('#c8d8f0')); }
  if (t > mira) bocata(R, xa + 6, 110, 28, 22, xa + 8, 130, tramo(t, mira, mira + 0.2), (R, x, y) => { R.icono('!', x - 9, y - 7, hex('#c83a3a'), hex('#c8c0b0'), 2); vuelta(R, x + 5, y - 1, hex('#2a4fa8')); });
};
// 4 · la selva con el árbol grande: el mono de tres cabezas
let selva = null, frente4 = null;
const pintaSelva = () => { const b = R.nuevo(), prev = R.usar(b);
  const V = [hex('#0e2a22'), hex('#163a2c'), hex('#1e4a34'), hex('#2a5e40'), hex('#3a7a4e')];
  // las copas del fondo, con huecos al cielo
  for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) { const n = h1(x >> 2, y >> 2) * 0.5 + h1(x >> 3, (y >> 3) + 9) * 0.5, dx = (x - 140) / 74, dy = (y - 38) / 34, cielo = y > 3 && dx * dx + dy * dy < 1 - 0.45 * h1(x >> 2, y >> 2) - 0.25 * h1(x >> 3, (y >> 3) + 5);
    if (cielo) continue; const k = y > 100 ? 1 : n > 0.75 ? 2 : 0; R.pset(x, y, V[k + ((x + y) % 5 === 0 && n > 0.5 ? 1 : 0)]); }
  for (let k = 0; k < 40; k++) { const cx = Math.round(h1(k, 1) * 320), cy = Math.round(20 + h1(k, 2) * 100), r = 5 + h1(k, 3) * 8; for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) { const q = Math.hypot(x, y) / r; const ex = (cx + x - 140) / 74, ey = (cy + y - 38) / 34; if (q < 1 && !(ex * ex + ey * ey < 0.75)) R.pset(cx + x, cy + y, q > 0.8 ? V[1] : y < -r * 0.3 ? V[3] : V[2]); } }
  // troncos del fondo y del medio
  for (const [x0, w, c] of [[24, 10, hex('#2a2420')], [78, 7, hex('#2a2420')], [292, 12, hex('#2e2622')]]) for (let y = 30; y < 150; y++) for (let i = 0; i < w; i++) R.pset(x0 + i + Math.round(Math.sin(y * 0.05) * 2), y, i < 2 ? hex('#4a3e34') : (y + i * 3) % 11 === 0 ? hex('#1a1614') : c);
  // el suelo: el camino de tierra con piedras y raíces, y la hierba
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const camino = Math.abs(x - 160 - (y - 140) * 0.6) < 40 + (y - 140) * 1.4, n = h1(x, y);
    R.pset(x, y, camino ? (n < 0.15 ? hex('#5a4630') : n > 0.92 ? hex('#8a7254') : hex('#6e583c')) : (n < 0.3 ? hex('#1e4a2e') : n > 0.85 ? hex('#3a7a46') : hex('#2a5e3a'))); }
  for (let k = 0; k < 26; k++) { const x = Math.round(h1(k, 7) * 320), y = Math.round(146 + h1(k, 8) * 30); R.disco(x, y, 1.5 + h1(k, 9) * 1.5, hex('#4a4a52')); R.pset(x - 1, y - 1, hex('#8a8a94')); }
  for (let k = 0; k < 60; k++) { const x = Math.round(h1(k, 11) * 320), y = Math.round(142 + h1(k, 12) * 36); if (Math.abs(x - 160 - (y - 140) * 0.6) < 30) continue; for (let i = 0; i < 4; i++) R.pset(x + i - 2, y - Math.abs(i - 1.5) * 2 | 0, hex('#4a8a52')); }
  // helechos del medio
  for (let k = 0; k < 9; k++) { const cx = 10 + k * 38 + Math.round(h1(k, 13) * 10), cy = 142; if (cx > 220 && cx < 270) continue; for (let f = 0; f < 5; f++) { const an = -2.6 + f * 0.55; for (let i = 0; i < 12; i++) { const x = Math.round(cx + Math.cos(an) * i), y = Math.round(cy + Math.sin(an) * i + i * i * 0.04); R.pset(x, y, hex('#2e6e3e')); if (i % 2) R.pset(x, y + 1, hex('#4a9a5a')); } } }
  // el árbol grande y su rama
  for (let y = 36; y < 160; y++) { const w = 12 + Math.round((y - 36) / 20) + (y > 145 ? (y - 145) : 0); for (let i = -w; i <= w; i++) { const x = 250 + i + Math.round(Math.sin(y * 0.04) * 2), n = h1(x, y >> 1);
      R.pset(x, y, Math.abs(i) === w ? hex('#1a1210') : i < -w * 0.5 ? hex('#7a5a3e') : i > w * 0.5 ? hex('#3a2a1e') : (x + (y >> 2)) % 6 === 0 ? hex('#4a3626') : n > 0.85 ? hex('#8a6a48') : hex('#5e4430')); } }
  for (let k = 0; k < 6; k++) R.disco(240 + k * 5, 60 + k * 14, 2.5, hex('#3a6a3a'));
  for (let x = 160; x < 242; x++) { const th = Math.round(3 + (x - 160) / 16), yc = 100 + Math.round((242 - x) * 0.04); for (let j = -th; j <= th; j++) R.pset(x, yc + j, Math.abs(j) === th ? hex('#1a1210') : j < -th * 0.4 ? hex('#8a6a48') : j > th * 0.4 ? hex('#3a2a1e') : hex('#5e4430')); if (x % 9 === 0) R.pset(x, yc - th, hex('#4a8a4a')); }
  R.usar(prev); return b; };
const pintaFrente4 = () => { const b = R.nuevo(), prev = R.usar(b);
  // las hojas grandes del primer término, en las esquinas de abajo
  for (const [cx, cy, d] of [[-6, 186, 1], [326, 190, -1]]) for (let f = 0; f < 6; f++) { const an = d > 0 ? -1.5 + f * 0.28 : Math.PI + 1.5 - f * 0.28; for (let i = 0; i < 34; i++) { const x = Math.round(cx + Math.cos(an) * i), y = Math.round(cy + Math.sin(an) * i); for (let j = -2; j <= 2; j++) R.pset(x, y + j, j === -2 || j === 2 ? hex('#0e2a1a') : j < 0 ? hex('#3a8a4a') : hex('#2a6a3a')); } }
  R.usar(prev); return b; };
const tres = Bm(14.71), gira = Bm(17.03), escapa = Bm(17.73);
const p4 = (t) => {
  R.cielo(t, { hor: 120, luna: [152, 36, 9] }); R.lunaLlena(152, 36, 9);
  if (!selva) { selva = pintaSelva(); frente4 = pintaFrente4(); } pegar(R, selva);
  // rayos de luna entre las copas
  for (let k = 0; k < 3; k++) { const x0 = 100 + k * 34; for (let y = 60; y < 150; y++) { const x = Math.round(x0 + (y - 60) * 0.35); if ((x + y) % 3 === 0) for (let i = 0; i < 6; i++) R.pset(x + i, y, mez(R.pget(x + i, y), hex('#c8e8d8'), 0.16 + Math.sin(t * 0.8 + k) * 0.04)); } }
  // las lianas que se mecen
  for (let k = 0; k < 4; k++) { const x0 = 40 + k * 66, L = 40 + (k % 2) * 30; for (let i = 0; i < L; i++) { const x = Math.round(x0 + Math.sin(t * 1.1 + k) * i * i / (L * 6)); R.pset(x, i, hex('#2a5a2a')); if (i % 5 === 0) { R.pset(x - 1, i, hex('#4a8a3a')); R.pset(x + 1, i + 1, hex('#4a8a3a')); } } }
  // el mono de tres cabezas sale por encima de la rama, saluda y parlotea; el morado del tricornio, a su lado
  const sube = tramo(t, tres - 0.18, tres + 0.18);
  R.recorte([0, 0, 319, 97]); T.bicho(R, 196, Math.round(lerp(126, 98, sube)), t, { quien: 'mono3', dir: -1, saluda: t > tres + 0.3 && t < gira + 1, habla: t > tres + 0.6 && t < tres + 1.8 }); R.recorte(null);
  T.tentaculo(R, 224, 99, t, { color: 'morado', dir: -1, accesorio: 'pirata', brazos: t > tres + 0.5 ? 1 : 0, pose: t > tres + 0.6 && t < gira + 0.8 ? 'saluda' : 'normal', expresion: 'feliz', mira: [-0.6, 0.6], salto: t > tres && t < tres + 0.3 ? 3 : 0 });
  // el pirata se vuelve a mirar y el aspirante se escabulle de puntillas
  const vuelto = t > gira, ue = tramo(t, escapa, escapa + 1.6);
  const p = R.actor(EL.pirata, 140, 162, t, { dir: vuelto ? 1 : -1, sostiene: [vuelto ? 160 : 140, 150], sorpresa: vuelto, enfado: !vuelto, salto: t > gira && t < gira + 0.3 ? 3 : 0 });
  espada(R, p.mano[0], p.mano[1], vuelto ? 0.9 : Math.PI - 0.9, 16);
  if (vuelto) R.icono('!', p.cabeza[0] - 3, p.cabeza[1] - 15, hex('#f0c020'), KK, 2);
  R.actor(EL.aspirante, Math.round(lerp(98, -24, ue)), 163, t, { dir: ue > 0 ? -1 : 1, anda: ue > 0 && ue < 1, dedo: t < gira - 0.6, habla: t < Bm(15.4) && Math.sin(t * 10) > 0, sonrisa: t > gira, sorpresa: t < tres + 0.4 });
  // luciérnagas y el primer término
  for (let k = 0; k < 8; k++) { const x = Math.round(30 + k * 37 + Math.sin(t * 0.8 + k * 2) * 10), y = Math.round(126 + Math.sin(t * 1.2 + k) * 14); if (Math.sin(t * 3 + k * 1.3) > 0.1) { R.pset(x, y, hex('#f0f890')); R.pset(x, y - 1, hex('#8aa040')); } }
  pegar(R, frente4);
};
// 5 · la mansión de la gobernadora: las tres pruebas
const entra = C(20.0), lasTres = C(22.16), maestra = C(23.52), cruce = C(23.86), bien = C(24.4);
const marco = (R, x, y, a, dibuja, n) => { if (a <= 0) return; const s = Math.min(1, a * 1.4), w = Math.round(13 * s);
  R.rect(x - w - 1, y - w - 1, x + w + 1, y + w + 1, KK); R.rect(x - w, y - w, x + w, y + w, hex('#e8d8a8')); R.rect(x - w, y + w - 1, x + w, y + w, hex('#c8b080')); R.rect(x - w, y - w, x + w, y - w, hex('#fff4d0'));
  if (s >= 1) { dibuja(R, x, y); R.numero(String(n), x, y + 26, { centro: true }); } };
const pala = (R, x, y) => { R.linea(x - 7, y - 8, x + 3, y + 2, KK); R.linea(x - 6, y - 8, x + 4, y + 2, hex('#a8743c')); R.poligono([[x + 1, y + 1], [x + 6, y - 2], [x + 9, y + 6], [x + 4, y + 9]], KK); R.poligono([[x + 2, y + 1], [x + 6, y - 1], [x + 8, y + 5], [x + 4, y + 8]], hex('#8a92a8')); R.rect(x - 9, y - 10, x - 5, y - 9, hex('#5a3a1e')); };
const idolo = (R, x, y) => { R.rect(x - 4, y - 1, x + 4, y + 2, hex('#a87820')); R.rect(x - 3, y - 6, x + 3, y - 1, hex('#e8b830')); R.rect(x - 4, y - 12, x + 4, y - 6, hex('#f0c840')); R.rect(x - 4, y - 12, x - 3, y - 6, hex('#fff0a0'));
  R.pset(x - 2, y - 9, hex('#e8203a')); R.pset(x + 2, y - 9, hex('#e8203a')); R.rect(x - 2, y - 7, x + 2, y - 7, hex('#7a5410')); R.rect(x - 2, y - 14, x + 2, y - 13, hex('#e8b830')); };
const p5 = (t) => {
  T.isla(R, t, { encuadre: 'mansion', camara: 'general' });
  marco(R, 26 + 0, 72, tramo(t, lasTres, lasTres + 0.15), (R, x, y) => espadaP(R, x - 7, y + 7, -0.8, 16), 1);
  marco(R, 60, 72, tramo(t, lasTres + 0.12, lasTres + 0.27), (R, x, y) => pala(R, x, y), 2);
  marco(R, 94, 72, tramo(t, lasTres + 0.24, lasTres + 0.39), (R, x, y) => idolo(R, x, y + 7), 3);
  if (t > bien) T.visto(R, 18, 66, 1);
  // la maestra de esgrima baja por el camino desde la verja
  const um = tramo(t, C(22.5), maestra + 0.2), xm = Math.round(lerp(154, 132, um)), ym = Math.round(lerp(156, 168, um));
  const m = R.actor(EL.esgrimista, xm, ym, t, { dir: -1, anda: um > 0 && um < 1, sostiene: um > 0 && t < bien + 0.2 ? [xm - 6, ym - 18 + (t > cruce - 0.15 && t < cruce + 0.1 ? -4 : 0)] : undefined, sonrisa: t > bien, enfado: t > maestra && t < bien });
  if (um > 0 && t < bien + 0.2) espada(R, m.mano[0], m.mano[1], Math.PI + 0.4, 17);
  // el aspirante entra por la izquierda, mira las tres pruebas y se bate con ella
  const ua = tramo(t, entra, C(21.6)), xa = Math.round(lerp(-20, 98, ua));
  const lucha = t > maestra - 0.1 && t < bien + 0.2;
  const a = R.actor(EL.aspirante, xa, 169, t, { dir: 1, anda: ua > 0 && ua < 1, sostiene: lucha ? [xa + 20, 150 + (t > cruce - 0.1 && t < cruce + 0.1 ? 3 : 0)] : undefined, sorpresa: t > lasTres && t < lasTres + 0.8, sonrisa: t > bien, brazos: t > bien + 0.2 && t < bien + 0.9 });
  if (lucha) espada(R, a.mano[0], a.mano[1], -0.45, 17);
  chispa(R, 121, 140, 1 - Math.abs(t - cruce) / 0.14);
};
// 6 · la ventana del ídolo: el cofre y el robo
const llega6 = C(25.05), deja = C(25.95), sube = C(26.2), roba6 = C(26.62), coge = C(27.06), baja = C(27.75), vase = C(28.35);
const cofreChico = (R, x, y) => { R.rect(x - 7, y - 5, x + 7, y + 4, KK); R.rect(x - 6, y - 4, x + 6, y + 3, hex('#8a5a2a')); R.rect(x - 6, y - 4, x + 6, y - 3, hex('#b07a3a')); R.rect(x - 6, y - 1, x + 6, y - 1, hex('#c8a040')); R.rect(x - 1, y - 2, x + 1, y + 1, hex('#f0d070')); for (const i of [-5, 5]) R.rect(x + i, y - 4, x + i, y + 3, hex('#c8a040')); };
const p6 = (t) => {
  T.isla(R, t, { encuadre: 'mansion', camara: 'ventana' });
  // cuando se lo lleva, el pedestal queda vacío (el papel pintado de arriba tapa el hueco del ídolo)
  if (t > coge) for (let y = 70; y <= 95; y++) for (let x = 150; x <= 170; x++) R.pset(x, y, R.pget(x, y - 24));
  if (t > coge && t < coge + 0.6) for (let k = 0; k < 6; k++) { const an = k + t * 4; R.pset(Math.round(160 + Math.cos(an) * 8), Math.round(84 + Math.sin(an) * 8), hex('#fff4a0')); }
  // el cofre que ha desenterrado, primero en las manos y luego en la grava
  const uw = tramo(t, llega6, deja - 0.1), j = tramo(t, sube, roba6 - 0.05), down = tramo(t, baja, baja + 0.4), uv = tramo(t, vase, C(29.15));
  let x = Math.round(lerp(-20, 112, uw)), suelo = 166, salto = 0;
  if (j > 0) { x = Math.round(lerp(112, 152, j)); suelo = Math.round(lerp(166, 136, j)) - Math.round(Math.sin(j * Math.PI) * 12); }
  if (down > 0) { x = Math.round(lerp(152, 186, down) + lerp(0, 60, uv)); suelo = Math.round(lerp(136, 166, down)) - Math.round(Math.sin(down * Math.PI) * 8); }
  if (t > deja) { cofreChico(R, 122, 163); if (Math.sin(t * 5) > 0.3) R.pset(124, 157, hex('#fff4a0')); }
  const conIdolo = t > coge, arriba = conIdolo && down >= 1;
  const obj = t < deja ? [x + 18, suelo - 12] : t > roba6 - 0.1 && t < coge + 0.25 ? [160, 96] : conIdolo ? [x + 16, suelo - (arriba ? 24 : 14)] : undefined;
  const a = R.actor(EL.aspirante, x, suelo, t, { dir: 1, anda: (uw > 0 && uw < 1) || (uv > 0 && uv < 1), sostiene: obj, sorpresa: t > roba6 - 0.3 && t < coge, sonrisa: t > coge + 0.3, salto });
  if (t < deja) cofreChico(R, a.mano[0] + 2, a.mano[1] + 2);
  if (conIdolo) { idolo(R, a.mano[0], a.mano[1] - 1); if (arriba && Math.sin(t * 8) > 0) for (const [i, k] of [[-7, -10], [7, -14], [0, -18]]) R.pset(a.mano[0] + i, a.mano[1] + k, hex('#fff4a0')); }
};
// 7 · inserto: la mesa de la taberna y los objetos absurdos del bolsillo
let mesa7 = null;
const pintaMesa7 = () => { const b = R.nuevo(), prev = R.usar(b);
  // la pared de tablones con vetas, nudos y clavos
  for (let y = 0; y < 118; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor(x / 22), borde = x % 22 === 0, n = h1(x >> 1, y >> 3 + tabla), veta = Math.sin(y * 0.11 + tabla * 3 + Math.sin(x * 0.3) * 0.6) > 0.9;
    R.pset(x, y, borde ? hex('#1e140e') : veta ? hex('#4a3020') : n > 0.88 ? hex('#6a4a30') : (tabla % 2 ? hex('#5a3c26') : hex('#523622'))); }
  for (let k = 0; k < 14; k++) { const tx = (k % 7) * 44 + 11, ty = k < 7 ? 8 : 108; R.pset(tx, ty, hex('#8a8a94')); R.pset(tx + 22, ty, hex('#8a8a94')); }
  for (const [x, y] of [[96, 40], [176, 90], [250, 28]]) { R.disco(x, y, 3, hex('#3a2416')); R.anillo(x, y, 3, hex('#2a1a10')); }
  // el ojo de buey (el mar se pinta luego dentro), la balda con botellas y el mapa clavado
  R.disco(200, 54, 25, KK); R.disco(200, 54, 24, hex('#a87a3a')); R.disco(200, 54, 21, hex('#6a4a1e')); R.disco(200, 54, 20, KK);
  for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4; R.disco(Math.round(200 + Math.cos(an) * 22.5), Math.round(54 + Math.sin(an) * 22.5), 1.2, hex('#e8c870')); }
  R.rect(234, 76, 318, 79, KK); R.rect(234, 76, 318, 77, hex('#8a6a3a'));
  for (let k = 0; k < 6; k++) { const x = 240 + k * 13, hb = 12 + (k % 3) * 4, c = [hex('#3a8a4a'), hex('#8a3a3a'), hex('#3a5a8a'), hex('#c8a040'), hex('#5a3a6a'), hex('#3a8a8a')][k];
    R.rect(x, 76 - hb, x + 7, 75, KK); R.rect(x + 1, 77 - hb, x + 6, 75, c); R.rect(x + 2, 72 - hb, x + 5, 76 - hb, KK); R.rect(x + 3, 73 - hb, x + 4, 76 - hb, c); R.rect(x + 1, 78 - hb, x + 2, 74, mez(c, hex('#ffffff'), 0.4)); R.rect(x + 1, 66 - hb + 14, x + 6, 70 - hb + 14, hex('#e8dcb8')); }
  R.rect(120, 64, 160, 96, KK); R.rect(121, 65, 159, 95, hex('#e8d8a8')); for (let k = 0; k < 30; k++) R.pset(122 + (k * 7) % 37, 66 + (k * 11) % 29, hex('#c8b080'));
  for (let i = 0; i < 26; i++) R.pset(126 + i, 88 - Math.round(Math.sin(i * 0.3) * 8 + i * 0.4), i % 3 ? hex('#8a5a2a') : hex('#e8d8a8')); R.icono('X', 148, 70, hex('#c83a3a'), hex('#8a5a2a'), 1); R.disco(140, 64, 1.5, hex('#c83a3a'));
  // el gancho de la pared y la casaca colgada, con su bolsillo
  R.rect(56, 10, 62, 14, KK); R.rect(57, 11, 61, 13, hex('#8a8a94')); R.rect(58, 14, 60, 20, KK);
  R.poligono([[59, 18], [96, 30], [104, 118], [14, 118], [22, 30]], KK); R.poligono([[59, 20], [94, 31], [102, 118], [16, 118], [24, 31]], hex('#2a3a6a'));
  for (let y = 22; y < 118; y++) for (let x = 16; x < 104; x++) { if (R.pget(x, y) !== hex('#2a3a6a')) continue; const lado = x < 40 ? 1 : x > 84 ? -1 : 0, pl = Math.sin(x * 0.35 + y * 0.05) > 0.85;
    if (lado === 1 || pl) R.pset(x, y, hex('#3a4e84')); else if (lado === -1) R.pset(x, y, hex('#1e2a50')); }
  for (const [x0, d] of [[24, -1], [95, 1]]) { R.poligono([[x0, 31], [x0 + d * 10, 40], [x0 + d * 12, 100], [x0 + d * 2, 102]], KK); R.poligono([[x0, 33], [x0 + d * 9, 41], [x0 + d * 11, 99], [x0 + d * 3, 100]], d < 0 ? hex('#33447a') : hex('#1e2a50'));
    R.rect(Math.min(x0 + d * 2, x0 + d * 12), 94, Math.max(x0 + d * 2, x0 + d * 12), 99, KK); R.rect(Math.min(x0 + d * 3, x0 + d * 11), 95, Math.max(x0 + d * 3, x0 + d * 11), 98, hex('#c8a040')); }
  for (let k = 0; k < 6; k++) { const x0 = 26 + k * 13; for (let y = 64 + (k % 2) * 8; y < 118; y++) { const x = x0 + Math.round(Math.sin(y * 0.15 + k) * 1.5); if (R.pget(x, y) !== KK) { R.pset(x, y, hex('#1a2448')); R.pset(x - 1, y, hex('#44589a')); } } }
  for (let y = 30; y < 118; y += 3) { R.pset(59, y, hex('#5a6aa8')); }
  R.rect(78, 104, 92, 114, KK); R.rect(79, 105, 91, 113, hex('#3a5a3a')); for (let x = 79; x <= 91; x += 2) { R.pset(x, 104, hex('#e8dcb8')); R.pset(x, 114, hex('#e8dcb8')); }
  R.poligono([[59, 20], [50, 26], [56, 70], [59, 66]], hex('#c83a3a')); R.poligono([[59, 20], [68, 26], [62, 70], [59, 66]], hex('#a82a2a'));
  for (let k = 0; k < 4; k++) { R.disco(48, 44 + k * 16, 2, KK); R.disco(48, 44 + k * 16, 1.3, hex('#e8c040')); R.disco(70, 44 + k * 16, 2, KK); R.disco(70, 44 + k * 16, 1.3, hex('#e8c040')); }
  R.rect(28, 82, 52, 104, KK); R.rect(29, 83, 51, 103, hex('#24325c')); R.rect(27, 80, 53, 87, KK); R.rect(28, 81, 52, 86, hex('#33447a')); R.disco(40, 85, 1.5, hex('#e8c040'));
  for (let x = 30; x < 51; x += 2) R.pset(x, 101, hex('#8a9ac8')); for (let y = 88; y < 101; y += 2) { R.pset(30, y, hex('#8a9ac8')); R.pset(50, y, hex('#8a9ac8')); }
  // la mesa: tablones con vetas, clavos, manchas y el canto de delante
  for (let y = 116; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((y - 116) / 13), j = (y - 116) % 13, n = h1(x >> 2, y), veta = Math.sin(x * 0.06 + tabla * 2 + Math.sin(y * 0.7) * 0.4) > 0.93;
    R.pset(x, y, j === 0 ? hex('#3a2416') : j === 1 ? hex('#b0804a') : veta ? hex('#6a4626') : n > 0.9 ? hex('#9a6c3e') : hex('#87592f')); }
  R.rect(0, 116, 319, 117, KK); for (let y = 118; y < 124; y++) for (let x = 0; x < 320; x++) R.pset(x, y, mez(R.pget(x, y), KK, 0.35 - (y - 118) * 0.05));
  for (let k = 0; k < 10; k++) { R.pset(14 + k * 32, 122 + (k % 4) * 13, hex('#2a2a30')); }
  for (const [x, y, r] of [[60, 160, 9], [250, 140, 6]]) for (let a = 0; a < 6.28; a += 0.1) R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r * 0.5), hex('#5a3a20'));
  // la brújula y unas monedas
  R.disco(286, 160, 9, KK); R.disco(286, 160, 8, hex('#c8a040')); R.disco(286, 160, 6, hex('#f4ecd0')); R.linea(286, 155, 286, 160, hex('#c83a3a')); R.linea(286, 160, 286, 165, KK);
  for (const [x, y] of [[240, 170], [246, 172], [232, 166], [300, 140]]) { R.disco(x, y, 2.5, KK); R.disco(x, y, 2, hex('#e8c040')); R.pset(x - 1, y - 1, hex('#fff0a0')); }
  R.usar(prev); return b; };
const salen = [[C(30.5), 'llave', 104, 150], [C(31.25), 'pollo', 150, 154], [C(31.65), 'mapa', 196, 168], [C(32.2), 'platano', 120, 132], [C(32.5), 'pez', 214, 140], [C(33.07), 'queso', 170, 128]];
const objeto = (R, q, x, y, giro) => {
  if (q === 'llave') { R.anillo(x - 5, y, 3, KK); R.anillo(x - 5, y, 2, hex('#e8c040')); R.rect(x - 2, y - 1, x + 6, y + 1, KK); R.rect(x - 2, y, x + 6, y, hex('#e8c040')); R.rect(x + 4, y + 1, x + 5, y + 3, hex('#e8c040')); R.rect(x + 2, y + 1, x + 2, y + 2, hex('#e8c040')); }
  if (q === 'pollo') { R.disco(x, y, 8, KK); R.disco(x, y, 7, hex('#f0d040')); R.disco(x - 2, y - 2, 3, hex('#fff08a')); R.disco(x + 7, y - 8, 4.5, KK); R.disco(x + 7, y - 8, 3.5, hex('#f0d040'));
    R.rect(x + 6, y - 14, x + 9, y - 12, hex('#e83a3a')); R.poligono([[x + 10, y - 9], [x + 15, y - 8], [x + 10, y - 6]], hex('#f08a2a')); R.pset(x + 8, y - 9, KK); R.rect(x - 9, y - 2, x - 7, y + 1, hex('#e8b830'));
    R.rect(x - 3, y + 7, x - 2, y + 10, hex('#f08a2a')); R.rect(x + 2, y + 7, x + 3, y + 10, hex('#f08a2a'));
    R.disco(x, y - 9, 3.5, KK); R.anillo(x, y - 9, 3, hex('#9aa0b0')); R.anillo(x, y - 9, 2, hex('#5a6070')); R.rect(x, y - 13, x, y - 7, hex('#c8ccd8')); }
  if (q === 'mapa') { R.rect(x - 9, y - 6, x + 9, y + 6, KK); R.rect(x - 8, y - 5, x + 8, y + 5, hex('#e8d8a8')); R.rect(x - 10, y - 6, x - 8, y + 6, hex('#c8b080')); R.rect(x + 8, y - 6, x + 10, y + 6, hex('#c8b080'));
    for (let i = 0; i < 10; i++) R.pset(x - 6 + i, y + 2 - Math.round(Math.sin(i * 0.6) * 2), i % 2 ? hex('#8a5a2a') : hex('#e8d8a8')); R.pset(x + 5, y - 2, hex('#c83a3a')); R.pset(x + 4, y - 3, hex('#c83a3a')); R.pset(x + 6, y - 1, hex('#c83a3a')); R.pset(x + 4, y - 1, hex('#c83a3a')); R.pset(x + 6, y - 3, hex('#c83a3a')); }
  if (q === 'platano') { for (let i = -7; i <= 7; i++) { const yy = y + Math.round(i * i / 14) * (giro ? -1 : 1); R.pset(x + i, yy - 1, KK); R.pset(x + i, yy, hex('#f0d040')); R.pset(x + i, yy + 1, hex('#c8a020')); R.pset(x + i, yy + 2, KK); } R.rect(x + 7, y + 2, x + 8, y + 3, hex('#5a4a1a')); }
  if (q === 'pez') { R.poligono([[x - 9, y], [x - 2, y - 5], [x + 6, y - 3], [x + 8, y], [x + 6, y + 3], [x - 2, y + 5]], KK); R.poligono([[x - 8, y], [x - 2, y - 4], [x + 5, y - 2], [x + 7, y], [x + 5, y + 2], [x - 2, y + 4]], hex('#c83a3a'));
    R.poligono([[x + 6, y], [x + 12, y - 5], [x + 12, y + 5]], hex('#a82a2a')); R.pset(x - 5, y - 1, KK); R.pset(x - 2, y - 2, hex('#f08a8a')); R.pset(x + 1, y - 1, hex('#f08a8a')); }
  if (q === 'queso') { R.poligono([[x - 8, y + 4], [x + 8, y + 4], [x + 8, y - 4]], KK); R.poligono([[x - 6, y + 3], [x + 7, y + 3], [x + 7, y - 3]], hex('#f0c840')); R.disco(x + 3, y + 1, 1.2, hex('#c8a020')); R.disco(x + 5, y - 1, 0.8, hex('#c8a020')); R.rect(x - 6, y + 3, x + 7, y + 4, hex('#c8a020')); }
};
const p7 = (t) => {
  if (!mesa7) mesa7 = pintaMesa7(); R.copiar(mesa7);
  // por el ojo de buey: el mar de noche, la luna y un barco que pasa (todo recortado a su hueco)
  for (let y = 34; y <= 74; y++) for (let x = 180; x <= 220; x++) { if (Math.hypot(x - 200, y - 54) > 19.5) continue; const mar = y > 60;
    R.pset(x, y, mar ? (Math.sin(x * 0.5 + y * 1.3 - t * 3) > 0.6 ? hex('#3a6a9a') : hex('#1e3a5a')) : y < 46 ? hex('#141a3e') : hex('#1e2650')); }
  for (let y = 36; y <= 74; y++) for (let x = 180; x <= 220; x++) { const d = Math.hypot(x - 207, y - 45); if (d < 4.5 && Math.hypot(x - 200, y - 54) <= 19.5) R.pset(x, y, d < 3.5 ? hex('#f4ecd0') : hex('#c8c0a0')); }
  { const bx = Math.round(226 - ((t * 5) % 52)); for (let y = 52; y <= 60; y++) for (let x = bx - 6; x <= bx + 6; x++) { if (Math.hypot(x - 200, y - 54) > 19.5) continue; const casco = y > 57 && Math.abs(x - bx) < 6 - (y - 57), vela = y < 57 && Math.abs(x - bx + 1) < (y - 50) * 0.7; if (casco || vela) R.pset(x, y, casco ? hex('#0e0e18') : hex('#c8c0b0')); } }
  // el farol que se mece colgado de su cadena, con su luz
  const fx = Math.round(150 + Math.sin(t * 1.6) * 5); for (let i = 0; i < 24; i++) R.pset(Math.round(150 + (fx - 150) * i / 24), i, i % 2 ? hex('#3a3a40') : hex('#8a8a94'));
  halo(R, fx, 32, 30, hex('#f8c860'), 0.35); R.rect(fx - 5, 24, fx + 5, 40, KK); R.rect(fx - 4, 26, fx + 4, 38, hex('#f8d070')); R.rect(fx - 1, 28, fx + 1, 34, hex('#fff8d0')); R.rect(fx - 5, 24, fx + 5, 25, hex('#5a5a62')); R.rect(fx - 5, 39, fx + 5, 40, hex('#5a5a62'));
  // la vela con su llama y la jarra de grog que burbujea
  R.rect(262, 104, 270, 128, KK); R.rect(263, 105, 269, 128, hex('#f4ecd0')); R.rect(263, 105, 264, 128, hex('#ffffff')); R.rect(258, 126, 274, 130, KK); R.rect(259, 127, 273, 129, hex('#8a8a94'));
  const ll = Math.sin(t * 13) + Math.sin(t * 7); R.disco(266, 98 + (ll > 1 ? -1 : 0), 3, hex('#f0a020')); R.disco(266, 99, 2, hex('#fff4a0')); R.pset(266, 94 + (ll > 0 ? 0 : 1), hex('#f0a020')); halo(R, 266, 98, 22, hex('#f8d070'), 0.25);
  R.rect(292, 112, 310, 136, KK); R.rect(293, 113, 309, 135, hex('#7a7e8a')); R.rect(293, 113, 296, 135, hex('#a8acb8')); R.rect(309, 118, 314, 130, KK); R.rect(310, 120, 312, 128, hex('#7a7e8a'));
  R.rect(293, 110, 309, 114, hex('#c8f070')); for (let k = 0; k < 3; k++) { const by = 110 - ((t * 9 + k * 4) % 12); R.disco(296 + k * 6, Math.round(by), 1.2, hex('#d8ff90')); }
  // el bolsillo se agita, sale todo volando y cae en la mesa
  const agita = t > P7 && t < salen[salen.length - 1][0] + 0.2 ? Math.round(Math.sin(t * 26) * 1.5) : 0;
  if (agita) { R.rect(28 + agita, 80, 52 + agita, 87, KK); R.rect(29 + agita, 81, 51 + agita, 86, hex('#33447a')); R.disco(40 + agita, 85, 1.5, hex('#e8c040')); }
  for (const [t0, q, lx, ly] of salen) { if (t < t0 - 0.45) continue; const u = tramo(t, t0 - 0.45, t0), x = Math.round(lerp(40, lx, u)), y = Math.round(lerp(82, ly, u) - Math.sin(u * Math.PI) * 40);
    const rebote = u >= 1 ? Math.round(Math.max(0, Math.sin((t - t0) * 14) * 3 * (1 - tramo(t, t0, t0 + 0.4)))) : 0; objeto(R, q, x, y - rebote, u < 1 && Math.sin(u * 9) > 0);
    if (u >= 1 && t < t0 + 0.25) for (let k = 0; k < 4; k++) R.pset(lx - 10 + k * 7, ly + 6, hex('#f4ecd0')); }
  // el morado, con el tricornio robado, asoma por detrás de la mesa con antojo
  const as = tramo(t, C(33.2), C(33.6)); if (as > 0) { R.recorte([0, 0, 319, 116]); T.tentaculo(R, 236, Math.round(lerp(150, 124, as)), t, { color: 'morado', dir: -1, s: 1, accesorio: 'pirata', expresion: 'antojo', mira: [-1, 0.6] }); R.recorte(null); }
};
const efectos = [[golpes[1], 'toc'], [golpes[3], 'toc'], [ingenio, 'pop'], [insulto, 'pop'], [replica, 'pop'], [afilada, 'brillo'], [gana + 0.45, 'golpecito'], [tajo, 'whoosh'], [mira, 'pop'], [tres, 'boing'], [gira, 'whoosh'],
  [lasTres, 'pop'], [cruce, 'toc'], [bien, 'brillo'], [deja, 'golpecito'], [coge, 'brillo'], [salen[0][0], 'pop'], [salen[1][0], 'boing'], [salen[3][0], 'pop'], [salen[5][0], 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año: 1990 });
''')

E['la-pintados'] = ('Fondos pintados', '''// LA-PINTADOS (frase 20), 1991. Dos planos:
// 1. el estudio de dibujo: la pintora termina con el pincel el fondo pintado en papel (la acuarela avanza por el boceto
//    a lápiz) y, en «painted by hand», levanta el pincel satisfecha; un compañero lleva otra hoja hacia el escáner;
// 2. (desde «The artists») el escáner de cerca: una mano desliza la hoja pintada sobre el cristal («on paper»), se
//    retira, y en «scanned» la barra de luz recorre el cristal mientras el dibujo aparece en píxeles en el monitor.''', H + r'''
const P = (s) => en('pintados', (s - 0.5) / 7.632);
const P2 = P(4.2), pinta0 = P(0.6), pinta1 = P(3.0), mano = P(3.23), coloca = P(5.6), escanea = P(6.52), fin = P(7.7);
const p1 = (t) => {
  const d = T.estudio(R, t, { encuadre: 'dibujo', camara: 'general', escaneo: 1.2 });
  // la parte del papel que aún es boceto (a lápiz), a la derecha del borde de la acuarela
  const u = tramo(t, pinta0, pinta1), borde = Math.round(lerp(82, 134, u));
  for (let y = 89; y <= 119; y++) { const v = (y - 89) / 30, xa = Math.round(39 - 9 * v), xb = Math.round(123 + 9 * v); for (let x = Math.max(xa + 1, borde); x < xb; x++) { const m = ((x * 7 + y * 13) % 23 === 0);
      R.pset(x, y, y === 104 + Math.round(Math.sin(x * 0.1) * 2) || m ? hex('#9a968a') : hex('#f2eee4')); } }
  for (let y = 89; y <= 119; y++) if (borde < 132 && (y + Math.floor(t * 8)) % 3 === 0) R.pset(borde, y, hex('#6aa8d8'));
  // la pintora con el pincel largo, que va siguiendo el borde de la acuarela
  const ty = 100 + Math.round(Math.sin(t * 7) * 9), pin = t < mano;
  const a = R.actor(EL.disenadora, 146, 152, t, { dir: -1, sostiene: pin ? [138, 136] : [150, 120], sonrisa: !pin, habla: false });
  const [hx, hy] = a.mano, tx = pin ? Math.min(borde, 128) : 152, tyy = pin ? ty : 104;
  R.linea(hx, hy, tx, tyy, hex('#5a3a1e')); R.linea(hx + 1, hy, tx + 1, tyy, hex('#c8944a')); R.rect(tx - 1, tyy - 1, tx + 1, tyy + 1, hex('#3a6ab8'));
  if (!pin && Math.sin(t * 6) > 0) R.pset(tx + 3, tyy - 3, hex('#fff4a0'));
  // un compañero lleva otra hoja pintada hacia el escáner
  const w = tramo(t, P(1.2), P(3.4)), xc = Math.round(lerp(330, 252, w));
  const c = R.actor(EL.disenador2, xc, 152, t, { dir: -1, anda: w > 0 && w < 1, sostiene: [xc - 6, 140], sonrisa: w >= 1 });
  const [cx, cy] = c.mano; R.rect(cx - 12, cy - 9, cx + 1, cy + 1, KK); R.rect(cx - 11, cy - 8, cx, cy, hex('#8ac0e8')); R.rect(cx - 11, cy - 3, cx, cy, hex('#5a9a5a')); R.rect(cx - 8, cy - 6, cx - 6, cy - 4, hex('#f0d060'));
};
let pint = null;
const p2 = (t) => {
  const g = T.estudio(R, t, { encuadre: 'dibujo', camara: 'escaner', escaneo: tramo(t, escanea, fin) });
  if (!pint) { pint = []; for (let y = 121; y <= 156; y++) for (let x = 0; x < 192; x++) { const v = (y - 121) / 35, xa = Math.round(28 - 9 * v), xb = Math.round(164 + 9 * v); if (x >= xa && x <= xb) pint.push([x, y, R.pget(x, y)]); } }
  // la mano desliza la hoja sobre el cristal y se retira
  const s = tramo(t, P2 + 0.15, coloca), dy = Math.round((1 - s) * (1 - s) * 46), r = tramo(t, coloca + 0.1, coloca + 0.7);
  if (s < 1) { R.poligono([[20, 117], [172, 117], [180, 160], [12, 160]], hex('#2a3a4a')); for (const [x, y, c] of pint) if (y + dy < 180) R.pset(x, y + dy, c);
    for (let x = 18; x < 176; x++) { R.pset(x, 120 + dy, hex('#f6f2ea')); if (157 + dy < 180) R.pset(x, 157 + dy, hex('#c8c0b0')); } }
  if (r < 1) { const wx = Math.round(lerp(150, 214, r)), wy = Math.round(lerp(158 + dy, 206, r)); T.brazo(R, 262, 214, wx, wy, '#6a8a4a', -1, { codo: [Math.round(lerp(214, 236, r)), Math.round(lerp(196, 214, r))] }); }
  if (t > fin && t < fin + 0.8) for (let k = 0; k < 5; k++) { const an = k * 1.26 + t * 3; R.pset(Math.round(253 + Math.cos(an) * 30), Math.round(91 + Math.sin(an) * 22), hex('#fff4a0')); }
};
const efectos = [[pinta0 + 0.2, 'lapiz'], [P(2.2), 'papel'], [coloca, 'papel'], [escanea, 'zumbido'], [fin, 'bip']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: 1991 });
''')
