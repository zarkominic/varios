"""Borrador de escenas del ep29, grupo S4: pr-sultan, pr-fuentes, pr-caribe (con el movimiento hecho).

Los instantes se escriben en segundos de la escena como @s(…), @f(…) y @c(…) (sultan, fuentes, caribe) y se pasan aquí a
en('marca', fracción) con las marcas reales de la voz (atomo/plato/escenas/marcas-ep29.json).
"""
import json
import os
import re

_RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
_M = json.load(open(os.path.join(_RAIZ, 'atomo/plato/escenas/marcas-ep29.json'), encoding='utf-8'))
_CLAVE = {'s': ('pr-sultan', 'sultan'), 'f': ('pr-fuentes', 'fuentes'), 'c': ('pr-caribe', 'caribe')}


def _en(m):
    esc, marca = _CLAVE[m.group(1)]
    a = _M[esc]['marcas'][marca]
    b = _M[esc]['marcas'][marca + '_fin']
    return "en('%s', %.4f)" % (marca, (float(m.group(2)) - a) / (b - a))


def _cuerpo(txt):
    return re.sub(r'@([sfc])\(([\d.]+)\)', _en, HEL + txt)


# ── lo común de las tres escenas: ruido, mezcla, tramos, fondos fijos en búfer y piezas pequeñas ─────────────────────
HEL = r'''
const C = T.C, K = hex('#1a1418');
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const lin = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));
const suave = (u) => u * u * (3 - 2 * u);
const parp = (t, v = 7) => Math.sin(t * v) > 0;
// un fondo fijo que se pinta una vez en su búfer y luego se copia en cada fotograma
const fijo = (pinta) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); } R.copiar(b); }; };
// madera vista desde arriba: tablas horizontales de alto a, con vetas, juntas escalonadas y clavos (c: base, veta oscura, veta clara, junta)
const madera = (x0, y0, x1, y1, a, c, calma = null) => { const [c0, c1, c2, cj] = c.map(hex);
  for (let y = y0; y <= y1; y++) { const k = Math.floor((y - y0) / a), yy = (y - y0) % a, off = Math.floor(h(k, 3, 1) * 300);
    for (let x = x0; x <= x1; x++) {
      const xx = x + off, q = calma && calma(x, y);
      if (yy === 0 || xx % 97 === 0) { R.pset(x, y, q ? mez(cj, c0, 0.5) : cj); continue; }
      if (!q && (xx % 97 === 3 || xx % 97 === 94) && (yy === 2 || yy === a - 2)) { R.pset(x, y, K); continue; }
      const v = Math.sin(xx * 0.09 + Math.sin(yy * 0.9 + k) * 1.6 + h(k, 1, 2) * 6) + (h(x, y, 9) - 0.5) * 0.6;
      R.pset(x, y, q ? (v > 0.9 ? mez(c0, c2, 0.4) : c0) : v > 0.75 ? c2 : v < -0.7 ? c1 : c0);
    } } };
// el rollo pequeño de pergamino que lleva un personaje en la mano (cerrado, con su cinta roja)
const rolloMano = (x, y) => { x = Math.round(x); y = Math.round(y);
  R.rect(x - 7, y - 3, x + 7, y + 2, K); R.rect(x - 6, y - 2, x + 6, y + 1, hex('#e8d4a4')); R.rect(x - 6, y - 2, x + 6, y - 2, hex('#f8ecd0')); R.rect(x - 6, y + 1, x + 6, y + 1, hex('#b89a64'));
  R.rect(x - 6, y - 2, x - 6, y + 1, hex('#c8a870')); R.pset(x - 5, y, hex('#9a7a48')); R.rect(x - 1, y - 3, x, y + 2, hex('#a8302a')); R.pset(x - 1, y - 2, hex('#e05a4a')); };
// el mapa abierto en la mano: la hoja con la costa, islas, rumbos y sus dos rollos arriba y abajo
const mapaMano = (x, y, w = 20, hh = 13) => { x = Math.round(x - w / 2); y = Math.round(y - hh / 2);
  R.rect(x - 1, y - 1, x + w, y + hh, K); R.rect(x, y, x + w - 1, y + hh - 1, hex('#ecd8a8'));
  for (let i = 0; i < w; i++) for (let j = 0; j < hh; j++) if (h(i, j, 5) > 0.84) R.pset(x + i, y + j, hex('#d4bc88'));
  for (let j = 1; j < hh - 1; j++) { const cx = x + 4 + Math.round(Math.sin(j * 0.7) * 1.5 + j * 0.2); R.pset(cx, y + j, hex('#3a2a18')); R.pset(cx - 1, y + j, hex('#9aa458')); R.pset(cx - 2, y + j, hex('#b8a058')); }
  R.linea(x + 6, y + hh - 3, x + w - 3, y + 2, hex('#c87a6a'), 2); R.disco(x + w - 6, y + 4, 1.5, hex('#a83224')); R.pset(x + 9, y + 4, hex('#9aa458')); R.pset(x + 10, y + 4, hex('#9aa458'));
  for (const yy of [y - 2, y + hh]) { R.rect(x - 2, yy - 1, x + w + 1, yy + 2, K); R.rect(x - 1, yy, x + w, yy + 1, hex('#c8a870')); R.rect(x - 1, yy, x + w, yy, hex('#e8d4a4')); } };
// la lanza de un guardia, cogida por la mano (x, y)
const lanza = (x, y) => { x = Math.round(x); y = Math.round(y);
  R.rect(x - 1, y - 24, x + 1, y + 12, K); R.rect(x, y - 24, x, y + 12, hex('#8a5a30')); R.pset(x, y - 12, hex('#b07a44')); R.pset(x, y + 4, hex('#6a4020'));
  R.poligono([[x - 3, y - 25], [x, y - 33], [x + 3, y - 25]], K); R.poligono([[x - 2, y - 25], [x, y - 31], [x + 2, y - 25]], hex('#c8ccd8')); R.pset(x - 1, y - 27, hex('#ffffff'));
  R.rect(x - 2, y - 25, x + 2, y - 24, hex('#d8a838')); R.rect(x - 2, y - 22, x + 2, y - 21, hex('#c0302a')); };
// la pluma de escribir en la mano
const pluma = (x, y) => { x = Math.round(x); y = Math.round(y); R.linea(x, y, x + 5, y - 8, K); R.linea(x + 1, y - 1, x + 6, y - 9, hex('#f6f2e8')); R.linea(x + 2, y - 2, x + 7, y - 8, hex('#d8d4c8')); R.pset(x, y + 1, hex('#2a2018')); };
// un destello de cuatro puntas (lo que brilla)
const destello = (x, y, r, c = hex('#fff4c8')) => { x = Math.round(x); y = Math.round(y); for (let i = 1; i <= r; i++) { const cc = i > r - 2 ? mez(c, hex('#d8a838'), 0.5) : c; R.pset(x + i, y, cc); R.pset(x - i, y, cc); R.pset(x, y + i, cc); R.pset(x, y - i, cc); } R.pset(x, y, hex('#ffffff')); };
// el marco de un rectángulo, que late en oro
const marcoOro = (x0, y0, x1, y1, a) => { const c = mez(hex('#d8a838'), hex('#fff4c8'), a); R.linea(x0, y0, x1, y0, c); R.linea(x0, y1, x1, y1, c); R.linea(x0, y0, x0, y1, c); R.linea(x1, y0, x1, y1, c); };
'''

E = {}

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['pr-sultan'] = ('El sultán', '''// PR-SULTAN (frase 10), 1517 → 1929. Cuatro planos:
// 1. el salón del sultán en El Cairo (galipoli/cairo): Piri entra por la alfombra con el mapa enrollado entre dos
//    guardias con lanza; el visir lo anuncia; a «sultan» se para ante el estrado, inclina la cabeza y le ofrece el rollo;
//    a «Selim» el sultán sonríe y le hace un gesto para que se acerque; el visir baja a recogerlo (corta en «Cairo»);
// 2. el estrado de cerca (galipoli/cairo/trono): Selim mira el mapa abierto y sonríe a «conquered»; lo enrolla, el cofre
//    se abre y lo echa dentro de un tirón; la tapa se cierra con el cerrojo a «forgotten»; Piri, abajo, se queda triste;
// 3. la biblioteca del palacio (estambul/biblioteca): pasan los siglos (la barra corre de 1517 a 1929): días y noches
//    cada vez más deprisa, criados que cruzan como rayos, el polvo que se posa, telarañas que crecen y una araña que baja;
//    a «Only» (1929) Halil Edhem entra por la puerta de detrás y se para, sorprendido, junto al cofre a «survived»;
// 4. el mapa del mundo de 1513 sobre la mesa (pergamino/entero con borrado): a «western» los dos tercios del este se
//    queman y se deshacen (pavesas); queda el oeste; una lupa en la mano recorre el Atlántico, la costa de Europa y África
//    (a «Europe») y las tierras nuevas, que brillan a «new lands».''', _cuerpo(r'''
const P2 = @s(4.82), P3 = @s(8.76), P4 = @s(13.74);

// ── 1 · Piri ofrece el mapa al sultán ───────────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  T.galipoli(R, t, { encuadre: 'cairo' });
  const ofrece = @s(2.84), selim = @s(3.60), baja = lin(t, @s(4.0), @s(4.75));
  // los dos guardias con su lanza: el de la izquierda sigue a Piri con la mirada al entrar
  const g1 = R.actor(EL.marineroOtomano1, 36, 168, t, { dir: t > 0.5 && t < 1.3 ? -1 : 1, sostiene: true }); lanza(g1.mano[0], g1.mano[1]);
  const g2 = R.actor(EL.marineroOtomano2, 266, 168, t, { dir: -1, sostiene: true, sonrisa: t > selim }); lanza(g2.mano[0], g2.mano[1]);
  // el sultán en su estrado: mira, sonríe a «Selim» y le llama con la mano
  R.actor(EL.selim, 153, 120, t, { dir: -1, sonrisa: t > selim - 0.2, habla: t > selim && t < selim + 0.6 && parp(t, 8), dedo: t > selim + 0.5 });
  // Piri entra por la alfombra con el rollo, se para, inclina la cabeza y lo ofrece
  const u = suave(lin(t, 0.2, ofrece - 0.15)), px = Math.round(lerp(-16, 112, u)), sube = lin(t, ofrece, ofrece + 0.35);
  const p = R.actor(EL.piri, px, 162, t, { dir: 1, anda: u > 0 && u < 1, sostiene: sube > 0 ? [px + 20, 162 - 14 - Math.round(sube * 6)] : true, triste: t > ofrece + 0.1 && t < selim - 0.1, sonrisa: t > selim });
  rolloMano(p.mano[0] + 3, p.mano[1] - 1);
  // el visir lo anuncia con la mano y después baja del lado del estrado a recoger el rollo
  const vx = Math.round(lerp(214, 150, suave(baja)));
  R.actor(EL.visir, vx, 160, t, { dir: -1, anda: baja > 0 && baja < 1, habla: t > 0.7 && t < 1.9 && parp(t, 7), dedo: (t > 0.9 && t < 1.8) || baja >= 1 });
  T.galipoliDelante(R, t, { encuadre: 'cairo' });
};

// ── 2 · el sultán lo mira y lo echa al cofre ─────────────────────────────────────────────────────────────────────
const enrolla = @s(7.0), tira = @s(7.45), cae = @s(7.85), cierra = @s(8.38);
const p2 = (t) => {
  const abre = lin(t, enrolla, tira) - lin(t, cae + 0.05, cierra - 0.02);
  T.galipoli(R, t, { encuadre: 'cairo', camara: 'trono', cofre: abre });
  // Piri, abajo a la izquierda, mira contento… hasta que el mapa acaba en el cofre
  R.actor(EL.piri, 58, 168, t, { dir: 1, sonrisa: t < cae, sorpresa: t > tira && t < cierra - 0.1, triste: t > cierra - 0.1 });
  // el visir, abajo a la derecha, señala el cofre cuando se abre
  R.actor(EL.visir, 252, 168, t, { dir: -1, habla: t > P2 + 0.4 && t < P2 + 1.4 && parp(t, 7), dedo: t > enrolla - 0.1 && t < cae + 0.2 });
  // Selim con el mapa: lo mira, sonríe a «conquered», lo enrolla y lo lanza al cofre
  const conMapa = t < tira, s = R.actor(EL.selim, 154, 122, t, { dir: 1, sostiene: conMapa ? [178, 100] : false, sonrisa: t > @s(6.4) && t < cae, habla: t > P2 + 0.5 && t < @s(6.3) && parp(t, 6), dedo: t > tira && t < cierra });
  if (conMapa) { if (t < enrolla) mapaMano(s.mano[0] + 9, s.mano[1] - 4, 20, Math.round(13 - 2 * Math.abs(Math.sin(t * 1.3)))); else rolloMano(s.mano[0] + 5, s.mano[1]); }
  const v = lin(t, tira, cae);
  if (v > 0 && v < 1) rolloMano(lerp(184, 222, v), lerp(100, 116, v) - Math.sin(Math.PI * v) * 16);
  T.galipoliDelante(R, t, { encuadre: 'cairo', camara: 'trono' });
};

// ── 3 · los siglos pasan en la biblioteca ─────────────────────────────────────────────────────────────────────────
const siglos0 = @s(9.0), siglos1 = @s(11.62);
const telarana = (cx, cy, r, a0, a1, g) => {   // radios y arcos de una telaraña en una esquina, que crece con g
  if (g <= 0) return; const rr = r * g, c = hex('#e8e8f0');
  for (let k = 0; k <= 4; k++) { const a = a0 + (a1 - a0) * k / 4; R.linea(cx, cy, Math.round(cx + Math.cos(a) * rr), Math.round(cy + Math.sin(a) * rr), mez(c, hex('#a8a8b4'), 0.3)); }
  for (let q = 1; q <= 3; q++) { const d = rr * q / 3.4; for (let k = 0; k < 4; k++) { const a = a0 + (a1 - a0) * k / 4, b = a0 + (a1 - a0) * (k + 1) / 4; R.linea(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d), Math.round(cx + Math.cos((a + b) / 2) * d * 0.9), Math.round(cy + Math.sin((a + b) / 2) * d * 0.9), c); R.linea(Math.round(cx + Math.cos((a + b) / 2) * d * 0.9), Math.round(cy + Math.sin((a + b) / 2) * d * 0.9), Math.round(cx + Math.cos(b) * d), Math.round(cy + Math.sin(b) * d), c); } }
};
const p3 = (t) => {
  T.estambul(R, t, { encuadre: 'biblioteca' });
  const u = lin(t, siglos0, siglos1), polvo = lin(t, siglos0, siglos1 + 0.6);
  // criados del palacio que cruzan como rayos (el tiempo corre)
  const pasos = [[EL.visir, 0.0, 1], [EL.marineroOtomano1, 0.18, -1], [EL.marineroOtomano2, 0.36, 1], [EL.visir, 0.55, -1], [EL.marineroOtomano1, 0.74, 1]];
  for (const [d, a, dir] of pasos) { const v = lin(u, a, a + 0.16); if (v > 0 && v < 1) { const x = Math.round(dir > 0 ? lerp(70, 196, v) : lerp(196, 70, v)); R.actor(d, x, 150, t * 3, { dir, anda: true }); } }
  // Halil Edhem entra por la puerta del fondo en 1929, se acerca y se para junto al cofre, sorprendido
  const e = suave(lin(t, siglos1 + 0.1, @s(12.6)));
  if (t > siglos1) R.actor(EL.edhem, Math.round(lerp(292, 220, e)), 142, t, { dir: -1 + 2 * (e >= 1 ? 1 : 0), anda: e > 0 && e < 1, sorpresa: t > @s(12.7) && t < @s(13.4), dedo: t > @s(13.2) });
  T.estambulDelante(R, t, { encuadre: 'biblioteca' });
  // el polvo que se posa en las estanterías, el cofre y los papeles
  if (polvo > 0) { const gris = hex('#cfc8bc');
    for (const [x0, y0, x1, y1] of [[84, 28, 230, 120], [238, 112, 276, 134], [6, 120, 72, 138]]) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const g = h(x >> 1, y >> 1, 7); if (g < polvo * 0.26) R.pset(x, y, mez(R.pget(x, y), gris, g < polvo * 0.1 ? 0.6 : 0.35)); } }
  // las telarañas de las esquinas y la araña que baja de su hilo
  telarana(84, 28, 22, 0, Math.PI / 2, polvo); telarana(230, 28, 20, Math.PI / 2, Math.PI, lin(polvo, 0.2, 1)); telarana(276, 112, 14, Math.PI / 2, Math.PI, lin(polvo, 0.4, 1)); telarana(32, 34, 12, 0, Math.PI / 2, lin(polvo, 0.3, 1));
  const ar = Math.sin(Math.PI * lin(t, @s(10.0), @s(12.2))), ay = Math.round(30 + ar * 46);
  if (ar > 0) { R.linea(206, 29, 206, ay - 2, hex('#e8e8f0')); R.disco(206, ay, 1.6, K); R.pset(204, ay - 1, K); R.pset(208, ay - 1, K); R.pset(204, ay + 1, K); R.pset(208, ay + 1, K); }
  // días y noches que pasan cada vez más deprisa
  const n = u > 0 && u < 1 ? (0.5 - 0.5 * Math.cos(2 * Math.PI * (u * u * 7))) * 0.5 : 0;
  if (n > 0.02) T.tinte(R, 16, 179, [18, 22, 52], n);
};

// ── 4 · se borran dos tercios: queda el oeste ────────────────────────────────────────────────────────────────────
const quema0 = @s(13.86), quema1 = @s(15.3), atl = @s(15.02), europa = @s(16.5), nuevas = @s(17.9);
const p4 = (t) => {
  const b = suave(lin(t, quema0, quema1));
  // la lupa: sube de abajo, mira el Atlántico, la costa de Europa y África y luego las tierras nuevas
  const sube = suave(lin(t, P4 + 0.3, atl - 0.2)), aE = suave(lin(t, europa - 0.5, europa)), aN = suave(lin(t, nuevas - 0.5, nuevas));
  const lx = Math.round(lerp(lerp(62, 96, aE), 34, aN)), ly = Math.round(lerp(220, lerp(lerp(104, 92, aE), 112, aN), sube));
  const r = T.pergamino(R, t, { vista: 'entero', borrado: b, vivo: 0.6, ilumina: t > nuevas ? 'costa' : undefined, lupa: { x: lx, y: ly, r: 20 } });
  // las pavesas que suben del borde quemado
  const fx = 313 - 200 * b;
  for (let k = 0; k < 26; k++) { const vida = (t * 0.9 + h(k, 1, 31)) % 1, x0 = fx + (h(k, 2, 31) - 0.3) * 30, y0 = 64 + h(k, 3, 31) * 78; const vis = lin(t, quema0, quema0 + 0.2) * (1 - lin(t, quema1, quema1 + 1.8)); if (vis <= 0 || h(k, 4, 31) > vis) continue;
    const x = Math.round(x0 + Math.sin(t * 3 + k) * 3 + vida * 8), y = Math.round(y0 - vida * 46); if (y < 18 || (x > 274 && y < 48)) continue; R.pset(x, y, vida < 0.4 ? hex('#ffb040') : vida < 0.7 ? hex('#c85a2a') : hex('#8a8288')); }
  // la mano de Edhem con la lupa (el brazo sube de abajo)
  if (r.lupa && r.lupa.mango) { const [mx, my] = r.lupa.mango; T.brazo(R, mx + 30, 206, mx + 2, my + 4, '#2a2e3a', -1, { codo: [mx + 22, my + 30] }); }
  // las tierras nuevas que brillan
  if (t > nuevas) { const a = 0.5 + 0.5 * Math.sin((t - nuevas) * 9); destello(22, 104, 3 + Math.round(a * 2)); destello(44, 140, 2 + Math.round(a)); }
};

const año = (t) => t < P3 + 0.2 ? 1517 : t < P4 ? Math.round(lerp(1517, 1929, suave(lin(t, siglos0, siglos1)))) : 1929;
const efectos = [[@s(2.9), 'papel'], [@s(7.45), 'whoosh'], [@s(8.36), 'cerrojo'], [siglos0, 'whoosh'], [@s(12.75), 'golpecito'], [quema0 + 0.05, 'rafaga'], [nuevas, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
'''))

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['pr-fuentes'] = ('Las fuentes', '''// PR-FUENTES (frase 11), 1513. Cinco planos:
// 1. el taller de Piri en Galípoli a la luz de la tarde (galipoli/taller, 2.ª vez y con otra luz): Piri escribe sus
//    notas tras la mesa; entra un mozo con un fardo de cartas, lo deja en el suelo y señala a Piri, que a «explains»
//    levanta la vista, habla y alza el dedo a «how» (corta en «In»);
// 2. LOCAL: el suelo del taller con la alfombra, desde arriba: veinte cartas caen una tras otra y la cuenta sube hasta
//    «20» justo a «20»; a «ancient maps» las cuatro viejas cartas del mundo redondo se levantan y brillan, y la mano de
//    Piri toca una (corta en «from»);
// 3. LOCAL: la pared del taller: el mapa redondo «de Alejandro» colgado de un clavo, con su medalla que brilla a
//    «Alexander»; Piri lo señala; a «Arab» tira del cordón y se desenrolla el mapa árabe del Índico; a «four Portuguese»
//    lanza cuatro cartas portuguesas que se quedan prendidas en la pared (corta en «and the one»);
// 4. el pergamino de cerca (pergamino/detalle, 2.ª vez): la carta de Colón vuela y se posa junto a La Española a
//    «Columbus», con un hilo de oro que las une; a «puzzle» llegan otras tres cartas y encajan (corta en «everything»);
// 5. LOCAL: la mesa de nogal con el gran pergamino en blanco y dos montones de cartas: las veinte piezas vuelan y
//    encajan una a una, y a «1513» el mapa entero brilla.''', _cuerpo(r'''
const P2 = @f(5.61), P3 = @f(10.51), P4 = @f(16.73), P5 = @f(20.72);

// ── 1 · Piri escribe sus notas ───────────────────────────────────────────────────────────────────────────────────
const fardo = (x, y) => { x = Math.round(x); y = Math.round(y); for (let k = 0; k < 3; k++) { const yy = y - 4 + k * 3; R.rect(x - 8, yy - 2, x + 8, yy + 1, K); R.rect(x - 7, yy - 1, x + 7, yy, [hex('#e8d4a4'), hex('#d8c08c'), hex('#ecdcb4')][k]); R.pset(x - 7, yy - 1, hex('#b89a64')); R.pset(x + 7, yy, hex('#b89a64')); } R.rect(x - 1, y - 7, x, y + 4, hex('#8a5a30')); };
const p1 = (t) => {
  T.galipoli(R, t, { encuadre: 'taller', luz: 'tarde' });
  const explica = @f(3.60), como = @f(4.32), deja = @f(3.0);
  const llega = suave(lin(t, 0.4, deja - 0.25)), mx = Math.round(lerp(-18, 92, llega));
  // el fardo de cartas que el mozo deja junto al diván
  if (t >= deja) { fardo(112, 165); fardo(122, 162); }
  const m = R.actor(EL.marineroOtomano2, mx, 168, t, { dir: 1, anda: llega > 0 && llega < 1, sostiene: t < deja ? true : false, dedo: t > deja + 0.4 && t < como, sonrisa: t > como });
  if (t < deja) fardo(m.mano[0] + 4, m.mano[1] + 1);
  // Piri escribe con la pluma; a «explains» levanta la vista y lo cuenta, con el dedo a «how»
  const escribe = t < explica - 0.2, p = R.actor(EL.piri, 198, 145, t, { dir: escribe ? 1 : -1, sostiene: escribe ? [216 + Math.round(Math.sin(t * 9) * 2), 132] : false, habla: t > explica && t < @f(5.1) && parp(t, 8), dedo: t > como - 0.1 && t < @f(5.2), sonrisa: t > @f(5.0) });
  if (escribe) pluma(p.mano[0], p.mano[1]);
  T.galipoliDelante(R, t, { encuadre: 'taller', luz: 'tarde' });
};

// ── 2 · las veinte cartas en la alfombra ─────────────────────────────────────────────────────────────────────────
const KIL = { r: hex('#a8302a'), rS: hex('#7a2420'), az: hex('#22447a'), azL: hex('#3a64a8'), oc: hex('#d8a838'), cr: hex('#efe4c8'), vd: hex('#3a7a5a'), k: hex('#3a1c18') };
const kilim = (x0, y0, x1, y1) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const d = Math.min(x - x0, x1 - x, y - y0, y1 - y); let c;
    if (d < 2) c = KIL.k; else if (d < 7) c = (Math.floor((x + y) / 3) % 2) ? KIL.az : KIL.azL; else if (d < 8) c = KIL.cr; else if (d < 13) { const z = (x - x0 + (y - y0)) % 8; c = z < 2 ? KIL.oc : z < 4 ? KIL.r : z < 6 ? KIL.cr : KIL.rS; } else if (d < 14) c = KIL.cr;
    else { const cx = (x - x0 - 14) % 34 - 17, cy = (y - y0 - 14) % 34 - 17, m = Math.abs(cx) + Math.abs(cy); c = m < 3 ? KIL.oc : m < 6 ? KIL.az : m < 8 ? KIL.cr : m < 10 ? KIL.vd : m === 14 || m === 15 ? KIL.rS : KIL.r; if (h(x, y, 11) > 0.93) c = mez(c, KIL.k, 0.25); }
    R.pset(x, y, c);
  }
  for (const xe of [x0, x1]) for (let y = y0 + 2; y < y1 - 1; y += 2) { const s = xe === x0 ? -1 : 1; R.linea(xe + s, y, xe + s * (4 + Math.round(h(y, xe, 3) * 2)), y, KIL.cr); R.pset(xe + s * 5, y, hex('#c8bc9c')); }
};
const suelo2 = fijo(() => {
  madera(0, 0, 319, 179, 11, ['#6a3e22', '#4e2c18', '#8a5a34', '#2e1a10'], (x, y) => x > 268 && y < 50);
  // el arcón de la esquina (visto desde arriba): la tapa con sus flejes y la cerradura
  R.rect(0, 0, 20, 62, K); R.rect(0, 0, 18, 60, hex('#7a4a2a')); for (let y = 2; y < 60; y += 5) R.linea(0, y, 18, y, hex('#5a3420')); for (const y of [10, 50]) { R.rect(0, y, 18, y + 2, hex('#4a4a54')); R.pset(15, y + 1, hex('#8a8a96')); } R.rect(16, 28, 18, 33, hex('#d8a838'));
  kilim(30, 18, 270, 168);
  // el cojín de terciopelo con sus borlas, abajo a la derecha
  R.disco(298, 152, 26, K); R.disco(298, 152, 25, hex('#2e6a4a')); R.disco(292, 146, 14, hex('#3a8a5a')); R.disco(288, 142, 5, hex('#5aa87a'));
  for (let a = 0; a < 6.28; a += 0.4) R.pset(Math.round(298 + Math.cos(a) * 21), Math.round(152 + Math.sin(a) * 21), hex('#d8a838'));
  for (const [x, y] of [[276, 132], [280, 174]]) { R.disco(x, y, 3, K); R.disco(x, y, 2, hex('#d8a838')); R.linea(x, y + 2, x - 2, y + 6, hex('#c09030')); }
  // el tintero y la pluma, abajo a la izquierda
  R.disco(14, 160, 7, K); R.disco(14, 160, 6, hex('#3a3a46')); R.disco(14, 160, 3, hex('#1a1418')); R.pset(12, 157, hex('#8a8a96')); R.linea(16, 157, 26, 146, hex('#f6f2e8')); R.linea(17, 158, 27, 147, hex('#c8c4b8'));
});
const CARTAS = (() => { const est = ['vieja', 'portugues', 'vieja', 'ptolomeo', 'vieja', 'vieja', 'arabe', 'portugues', 'ptolomeo', 'vieja', 'colon', 'vieja', 'portugues', 'vieja', 'ptolomeo', 'vieja', 'portugues', 'vieja', 'vieja', 'ptolomeo'];
  return est.map((e, k) => { const c = k % 5, f = Math.floor(k / 5); return { e, x: 66 + c * 46 + Math.round((h(k, 1, 4) - 0.5) * 8), y: 46 + f * 34 + Math.round((h(k, 2, 4) - 0.5) * 6), izq: h(k, 3, 4) < 0.5 }; }); })();
const veinte = @f(7.47), antiguas = @f(8.73);
const p2 = (t) => {
  suelo2();
  // el sol de la ventana que cruza despacio la alfombra, con motas
  const sx = Math.round(40 + (t - P2) * 6);
  for (let y = 20; y < 168; y++) { const a = sx + Math.round((168 - y) * 0.35); for (let x = a; x < a + 46; x++) if (x > 30 && x < 270 && ((x + y) % 2 === 0 || x - a > 6 && x - a < 40)) R.pset(x, y, mez(R.pget(x, y), hex('#fff0c8'), 0.16)); }
  let n = 0;
  CARTAS.forEach((c, k) => {
    const cae = P2 + 0.34 + k * (veinte - P2 - 0.34) / 19, v = lin(t, cae - 0.36, cae);
    if (v <= 0) return; if (v >= 1) n++;
    const x0 = c.izq ? -20 : 300, y0 = 196, x = Math.round(lerp(x0, c.x, suave(v))), y = Math.round(lerp(y0, c.y, suave(v)) - Math.sin(Math.PI * v) * 30);
    const viejo = c.e === 'ptolomeo' && t > antiguas, lev = viejo ? lin(t, antiguas, antiguas + 0.4) : 0.12 * Math.max(0, Math.sin(t * 1.7 + k));
    if (v < 1) R.poligono([[x - 13, y + 14], [x + 17, y + 14], [x + 17, y + 18], [x - 13, y + 18]], mez(hex('#7a2420'), K, 0.4));
    T.c_carta(R, x, y, c.e, { levanta: lev });
    if (viejo) marcoOro(c.x - 17, c.y - 13, c.x + 17, c.y + 13, 0.5 + 0.5 * Math.sin(t * 8 + k));
  });
  // la cuenta, grande, abajo
  if (n > 0) R.numero(String(n), 160, 178, { tam: 16, centro: true });
  // la mano de Piri entra por abajo a la derecha y toca la carta vieja del rincón
  const m = Math.sin(Math.PI * lin(t, antiguas + 0.5, P3 - 0.1));
  if (m > 0) { const wx = Math.round(lerp(316, 258, m)), wy = Math.round(lerp(196, 150, m)); T.brazo(R, wx + 34, 214, wx, wy, '#2e5a9a', -1, { codo: [wx + 26, wy + 36] }); }
};

// ── 3 · la pared: el mapa de Alejandro, el árabe y las cuatro cartas portuguesas ─────────────────────────────────────
const alejandro = @f(11.45), arabe = @f(12.93), india = @f(13.79), cuatro = @f(14.85), asia = @f(16.05);
const pared3 = fijo(() => {
  // la pared de cal con manchas y grietas
  for (let y = 0; y < 148; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 4) * 0.5 + h(x >> 3, y >> 3, 5) * 0.5; R.pset(x, y, x > 270 && y < 50 ? (n > 0.8 ? hex('#ddc8a0') : hex('#e2cea8')) : n > 0.82 ? hex('#cdb68c') : n < 0.18 ? hex('#efe0be') : hex('#e2cea8')); }
  R.linea(150, 40, 156, 52, hex('#bfa67c')); R.linea(156, 52, 153, 60, hex('#bfa67c')); R.linea(236, 120, 244, 128, hex('#bfa67c'));
  // las vigas del techo
  R.rect(0, 0, 319, 9, hex('#4a2a18')); for (let x = 0; x < 320; x += 40) { R.rect(x, 0, x + 12, 13, K); R.rect(x + 1, 0, x + 11, 12, hex('#6a4024')); R.rect(x + 1, 12, x + 11, 12, hex('#3a2010')); } R.rect(0, 9, 319, 9, hex('#2e1a10'));
  // el friso pintado bajo las vigas (rombos rojos y azules)
  R.rect(0, 13, 319, 20, hex('#c8b088')); for (let x = 0; x < 320; x++) { const i = x % 10; if (x > 268) continue; R.pset(x, 16, i < 5 ? hex('#a8302a') : hex('#22447a')); if (i === 2 || i === 7) { R.pset(x, 15, hex('#d8a838')); R.pset(x, 17, hex('#d8a838')); } } R.rect(0, 13, 268, 13, hex('#8a6a44')); R.rect(0, 20, 268, 20, hex('#8a6a44'));
  // manchas de humedad y desconchones
  for (const [x, y, r] of [[60, 120, 9], [168, 118, 7], [230, 40, 6], [20, 128, 5]]) for (let j = -r; j <= r; j++) for (let i = -r * 1.6; i <= r * 1.6; i++) if ((i / 1.6) ** 2 + j * j < r * r && h(x + i, y + j, 8) > 0.35) R.pset(Math.round(x + i), y + j, mez(R.pget(Math.round(x + i), y + j), hex('#b89a70'), 0.35));
  for (const [x, y] of [[140, 112], [52, 30], [236, 128]]) { R.rect(x, y, x + 5, y + 3, hex('#c0a888')); R.rect(x + 1, y + 1, x + 4, y + 2, hex('#a8906c')); R.linea(x, y + 4, x + 5, y + 4, hex('#efe0be')); }
  // la hornacina de la derecha (más oscura, con su arco), donde van las baldas
  R.poligono([[242, 124], [242, 58], [250, 50], [308, 50], [316, 58], [316, 124]], hex('#9a8a6c')); R.poligono([[245, 122], [245, 60], [252, 53], [306, 53], [313, 60], [313, 122]], hex('#bca686'));
  for (let y = 54; y < 122; y++) for (let x = 246; x < 313; x++) if (h(x, y, 33) > 0.9) R.pset(x, y, hex('#a8926e'));
  // la ventana de arco (el hueco se pinta vivo en cada fotograma)
  R.poligono([[6, 104], [6, 40], [12, 28], [28, 20], [44, 28], [50, 40], [50, 104]], hex('#9a8a6c')); R.poligono([[9, 102], [9, 41], [14, 31], [28, 24], [42, 31], [47, 41], [47, 102]], K);
  R.rect(4, 104, 52, 108, hex('#b8a888')); R.rect(4, 108, 52, 109, hex('#7a6a50'));
  // el zócalo de azulejos y el suelo de tablas
  for (let y = 136; y < 148; y++) for (let x = 0; x < 320; x++) { const i = x % 12, j = (y - 136) % 12, m = Math.abs(i - 6) + Math.abs(j - 6); R.pset(x, y, i === 0 || j === 0 ? hex('#8a8a8a') : m < 2 ? hex('#d8a838') : m < 4 ? hex('#22489a') : m === 5 ? hex('#2a9a9a') : hex('#f2efe6')); }
  R.rect(0, 147, 319, 148, hex('#5a3a22'));
  for (let y = 149; y < 180; y++) for (let x = 0; x < 320; x++) { const k = Math.floor((x + (y - 149) * 0.4) / 22), v = Math.sin(x * 0.4 + k * 3) + (h(x, y, 2) - 0.5) * 0.8; R.pset(x, y, (x + Math.floor((y - 149) * 0.4)) % 22 === 0 ? hex('#3a2010') : v > 0.9 ? hex('#8a5a34') : v < -0.8 ? hex('#4e2c18') : hex('#6a3e22')); }
  // la alfombra de borde con flecos, al pie
  for (let y = 162; y < 180; y++) for (let x = 112; x < 250; x++) { const d = Math.min(y - 162, x - 112, 249 - x); R.pset(x, y, d < 2 ? KIL.k : d < 5 ? KIL.az : (Math.floor((x - y) / 4) % 3 === 0 ? KIL.oc : KIL.r)); }
  for (let x = 113; x < 249; x += 2) R.linea(x, 159, x, 161, KIL.cr);
  // la mesita baja con libros y el tintero
  R.rect(56, 140, 104, 145, K); R.rect(57, 141, 103, 143, hex('#7a4a2a')); R.rect(57, 143, 103, 144, hex('#4e2c18')); R.rect(60, 145, 62, 166, K); R.rect(98, 145, 100, 166, K);
  for (const [x, w, c] of [[60, 18, '#2e5a9a'], [62, 15, '#a8302a'], [61, 16, '#3a7a4a']]) {}
  R.rect(60, 131, 80, 134, K); R.rect(61, 132, 79, 133, hex('#2e5a9a')); R.rect(62, 128, 78, 131, K); R.rect(63, 129, 77, 130, hex('#a8302a')); R.rect(61, 135, 81, 139, K); R.rect(62, 136, 80, 138, hex('#3a7a4a'));
  R.disco(92, 136, 4, K); R.disco(92, 136, 3, hex('#3a3a46')); R.linea(93, 133, 99, 122, hex('#f6f2e8'));
  // la repisa de la derecha con rollos y botes (por debajo de la zona de Atom)
  R.rect(246, 96, 312, 100, K); R.rect(247, 97, 311, 98, hex('#7a4a2a')); R.rect(250, 100, 252, 108, K); R.rect(306, 100, 308, 108, K);
  for (let k = 0; k < 5; k++) { const x = 252 + k * 9; R.rect(x, 86, x + 6, 96, K); R.rect(x + 1, 87, x + 5, 95, [hex('#e8d4a4'), hex('#d8c08c')][k % 2]); R.rect(x + 1, 90, x + 5, 90, hex('#a8302a')); }
  for (const [x, c] of [[298, '#2a9a9a'], [288, '#c8402e']]) { R.rect(x - 3, 84, x + 3, 96, K); R.rect(x - 2, 85, x + 2, 95, hex(c)); R.rect(x - 1, 82, x + 1, 84, K); }
  R.rect(246, 60, 312, 64, K); R.rect(247, 61, 311, 62, hex('#7a4a2a')); for (let k = 0; k < 6; k++) { const x = 250 + k * 10; R.rect(x, 50 - (k % 2) * 3, x + 7, 60, K); R.rect(x + 1, 51 - (k % 2) * 3, x + 6, 59, [hex('#2e5a9a'), hex('#7a2a3a'), hex('#3a6a3a')][k % 3]); }
  // el astrolabio colgado de su clavo, entre los dos mapas
  R.linea(162, 78, 162, 84, hex('#5a4a3a')); R.disco(162, 94, 10, K); R.disco(162, 94, 9, hex('#c89a3a')); R.disco(162, 94, 7, hex('#e0b850')); R.anillo(162, 94, 5, hex('#a87a24')); R.linea(156, 94, 168, 94, hex('#6a4a20')); R.linea(162, 88, 162, 100, hex('#6a4a20')); R.linea(157, 89, 167, 99, hex('#2a2018')); R.disco(162, 84, 2, hex('#c89a3a')); R.pset(159, 90, hex('#fff4c8'));
  // los clavos de los mapas
  for (const [x, y] of [[110, 18], [206, 20]]) { R.disco(x, y, 2, K); R.pset(x, y, hex('#c8ccd8')); }
});
// el mapa redondo «de Alejandro» (el mundo de Ptolomeo): el océano en anillo, las tierras, el Mediterráneo y el Índico cerrado
const mundoRedondo = (cx, cy, r) => {
  R.disco(cx, cy, r + 1, K); R.disco(cx, cy, r, hex('#7aa0b0'));
  for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) { const d = Math.hypot(x, y); if (d > r - 3) continue; const u = x / r, v = y / r;
    const tierra = v > -0.62 && v < 0.55 && u > -0.85 && u < 0.86 && !(v > 0.2 && u > 0.05 && u < 0.6 && Math.hypot((u - 0.32) / 0.3, (v - 0.36) / 0.18) < 1) && !(Math.abs(v + 0.08) < 0.07 + 0.05 * Math.sin(u * 9) && u > -0.7 && u < 0.05);
    if (tierra) R.pset(cx + x, cy + y, h(x, y, 3) > 0.8 ? hex('#b89858') : (x + y) % 5 === 0 ? hex('#9aa458') : hex('#d8bc80')); }
  // la retícula curva (meridianos y paralelos) en tinta roja
  for (let k = -2; k <= 2; k++) for (let y = -r + 3; y <= r - 3; y += 2) { const w = Math.sqrt(Math.max(0, 1 - (y / r) ** 2)); R.pset(Math.round(cx + k * 0.33 * r * w), cy + y, hex('#a83224')); }
  for (const v of [-0.5, 0, 0.5]) for (let x = -r + 4; x <= r - 4; x += 2) if (Math.hypot(x, v * r) < r - 3) R.pset(cx + x, Math.round(cy + v * r), hex('#a83224'));
  R.anillo(cx, cy, r - 2, hex('#2a2018'));
  // los doce vientos: caritas que soplan alrededor
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, x = Math.round(cx + Math.cos(a) * (r + 5)), y = Math.round(cy + Math.sin(a) * (r + 5)); R.disco(x, y, 3, K); R.disco(x, y, 2, hex('#f6f2e8')); R.pset(x - 1, y - 1, hex('#e8a090')); }
};
// el mapa árabe del Índico (con el sur arriba): el borde de oro, el océano que lo rodea todo y las tierras
const mundoArabe = (cx, cy, r) => {
  R.disco(cx, cy, r + 2, hex('#d8a838')); R.disco(cx, cy, r + 1, K); R.disco(cx, cy, r, hex('#3a7a6a'));
  for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2; R.pset(Math.round(cx + Math.cos(a) * (r - 2)), Math.round(cy + Math.sin(a) * (r - 2)), hex('#8ac0b0')); }
  R.disco(cx, cy, r - 4, hex('#2a2018')); R.disco(cx, cy, r - 5, hex('#e4c88c'));
  for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (Math.hypot(x, y) < r - 5 && h(x, y, 19) > 0.86) R.pset(cx + x, cy + y, hex('#c8a058'));
  // el Índico (el sur va arriba): una gran bahía que se abre al océano de arriba, con islas
  R.poligono([[cx - 3, cy - r + 3], [cx + 5, cy - r + 3], [cx + 15, cy - 9], [cx + 10, cy - 1], [cx - 2, cy + 1], [cx - 13, cy - 5], [cx - 9, cy - 12]], hex('#2a2018'));
  R.poligono([[cx - 2, cy - r + 4], [cx + 4, cy - r + 4], [cx + 13, cy - 9], [cx + 9, cy - 2], [cx - 2, cy], [cx - 11, cy - 5], [cx - 8, cy - 11]], hex('#4a8ab0'));
  for (const [x, y] of [[cx + 6, cy - 8], [cx - 5, cy - 6], [cx + 1, cy - 12]]) { R.disco(x, y, 1.5, hex('#e4c88c')); R.pset(x, y, hex('#9aa458')); }
  // el mar Rojo y el golfo Pérsico, el Mediterráneo abajo y el Nilo
  R.linea(cx - 6, cy, cx - 9, cy + 9, hex('#4a8ab0')); R.linea(cx + 3, cy + 1, cx + 5, cy + 8, hex('#4a8ab0'));
  R.poligono([[cx - 16, cy + 12], [cx + 2, cy + 10], [cx + 6, cy + 13], [cx - 12, cy + 15]], hex('#4a8ab0')); R.linea(cx - 9, cy + 9, cx - 13, cy + 3, hex('#3a6a9a'));
  // montes y ciudades
  for (const [x, y] of [[cx + 12, cy + 6], [cx - 15, cy - 2], [cx + 8, cy + 14]]) { R.pset(x, y, hex('#8a5a34')); R.pset(x - 1, y + 1, hex('#8a5a34')); R.pset(x + 1, y + 1, hex('#8a5a34')); }
  for (const [x, y] of [[cx - 10, cy + 8], [cx + 1, cy + 5], [cx + 14, cy - 2], [cx - 4, cy + 16], [cx + 9, cy + 9]]) { R.pset(x, y, hex('#c8302a')); R.pset(x, y - 1, hex('#ff8a7a')); }
};
const casco = (x, y, a) => {   // la medalla de Alejandro: un casco de cimera dentro de un disco de oro
  R.disco(x, y, 5, K); R.disco(x, y, 4, mez(hex('#d8a838'), hex('#fff4c8'), a)); R.rect(x - 2, y - 1, x + 1, y + 2, hex('#8a5a24')); R.rect(x - 1, y - 3, x + 2, y - 2, hex('#a83224')); R.pset(x + 2, y, hex('#8a5a24'));
};
const p3 = (t) => {
  pared3();
  // la ventana: el cielo de la tarde, el mar, una vela que pasa y una gaviota (recortado al hueco del arco)
  R.recorte([10, 25, 46, 101]);
  for (let y = 25; y < 102; y++) for (let x = 10; x < 47; x++) { if (Math.hypot(x - 28, y - 42) > 18 && y < 42) continue; R.pset(x, y, y < 78 ? ((x + y) % 2 && y > 60 ? hex('#f0c890') : y < 50 ? hex('#8ab4d8') : hex('#c8c8d0')) : (y + Math.floor(t * 4 + x * 0.3)) % 4 === 0 ? hex('#8ac0d8') : hex('#3a6a9a')); }
  for (const [ox, v, c] of [[0, 3, '#fbf6ec'], [20, 5, '#e0d8d0']]) { const x = Math.round(((t * v + ox) % 60) - 6); R.disco(x + 10, 46 + ox / 5, 4, hex(c)); R.disco(x + 15, 47 + ox / 5, 3, hex(c)); }
  { const bx = Math.round(46 - ((t * 3) % 44)); R.poligono([[bx, 82], [bx + 7, 82], [bx + 6, 84], [bx + 1, 84]], hex('#4a2a18')); R.poligono([[bx + 3, 81], [bx + 3, 74], [bx + 7, 81]], hex('#f2eee2')); }
  { const gx = Math.round(10 + ((t * 9) % 40)), gy = 36 + Math.round(Math.sin(t * 2) * 3), al = parp(t, 9); R.pset(gx, gy, K); R.pset(gx - 1, gy - (al ? 1 : 0), K); R.pset(gx + 1, gy - (al ? 1 : 0), K); R.pset(gx - 2, gy - (al ? 2 : 0), K); R.pset(gx + 2, gy - (al ? 2 : 0), K); }
  R.recorte(null);
  R.linea(28, 24, 28, 101, hex('#4a3a2a')); R.linea(10, 64, 46, 64, hex('#4a3a2a'));
  // el rayo de sol con motas
  for (let k = 0; k < 16; k++) { const x = Math.round(54 + ((h(k, 1, 6) * 90 + t * 4) % 90)), y = Math.round(40 + ((h(k, 2, 6) * 90 + t * 3 + Math.sin(t + k) * 4) % 90)); if (parp(t * 0.7 + k, 1.3)) R.pset(x, y, hex('#fff4d8')); }
  // la lámpara de aceite colgada que se mece
  const la = Math.sin(t * 1.6) * 0.1, lx = Math.round(162 + Math.sin(la) * 50), ly = Math.round(10 + Math.cos(la) * 50);
  R.linea(162, 10, lx, ly - 4, hex('#5a4a3a')); R.halo?.(lx, ly + 2, 10, [hex('#f0c870'), hex('#f6dca0')], 0.5);
  R.poligono([[lx - 6, ly], [lx + 6, ly], [lx + 3, ly + 5], [lx - 3, ly + 5]], K); R.poligono([[lx - 5, ly + 1], [lx + 5, ly + 1], [lx + 2, ly + 4], [lx - 2, ly + 4]], hex('#d8a838')); R.rect(lx - 1, ly - 4, lx + 1, ly - 1, hex('#a87a24'));
  const fl = parp(t, 13) ? 1 : 0; R.pset(lx, ly - 5 - fl, hex('#ffd860')); R.pset(lx, ly - 6 - fl, hex('#fff4c8'));
  // el mapa de Alejandro colgado de su cordel, con la medalla que brilla a «Alexander»
  R.linea(110, 18, 76, 28, hex('#5a4a3a')); R.linea(110, 18, 144, 28, hex('#5a4a3a'));
  R.rect(73, 27, 147, 103, K); R.rect(74, 28, 146, 102, hex('#e2c88c')); for (let y = 28; y < 103; y++) for (let x = 74; x < 147; x++) if (h(x, y, 21) > 0.9) R.pset(x, y, hex('#cdb078'));
  R.linea(74, 28, 146, 28, hex('#f2dcae')); R.linea(74, 102, 146, 102, hex('#b8945c')); mundoRedondo(110, 66, 30);
  const br = lin(t, alejandro - 0.1, alejandro + 0.3) * (1 - lin(t, alejandro + 1.4, alejandro + 2)); casco(110, 32, br); if (br > 0.3) destello(117, 28, 2 + Math.round(br * 3));
  // el mapa árabe: el rollo colgado que se desenrolla a «Arab»
  const de = suave(lin(t, arabe, arabe + 0.7)), alto = Math.round(4 + de * 82);
  R.rect(176, 21, 236, 25, K); R.rect(177, 22, 235, 24, hex('#8a5a30'));
  R.rect(179, 25, 233, 25 + alto, K); R.rect(180, 25, 232, 24 + alto, hex('#f0e4c4'));
  R.recorte([180, 25, 232, 24 + alto]); for (let x = 182; x < 231; x += 2) { R.pset(x, 28, hex('#d8a838')); R.pset(x, 104, hex('#d8a838')); } mundoArabe(206, 66, 24); R.recorte(null);
  R.rect(177, 24 + alto, 235, 28 + alto, K); R.rect(178, 25 + alto, 234, 27 + alto, hex('#c8a870')); R.rect(178, 25 + alto, 234, 25 + alto, hex('#e8d4a4'));
  // el cordón del rollo, del que tira Piri
  const tira = lin(t, arabe - 0.3, arabe + 0.7) * (1 - lin(t, arabe + 0.9, arabe + 1.2)); R.linea(180, 27 + alto, 178, 138 + Math.round(tira * 4), hex('#c8402e')); R.disco(178, 139 + Math.round(tira * 4), 1.5, hex('#d8a838'));
  // Piri: señala el mapa redondo, tira del cordón, sonríe a «India» y lanza las cuatro cartas a «four Portuguese»
  const lanzaK = (k) => cuatro + k * 0.22;
  const lanzando = t > cuatro - 0.15 && t < lanzaK(3) + 0.15;
  const p = R.actor(EL.piri, 156, 174, t, { dir: t > arabe - 0.5 && t < arabe + 1.0 ? 1 : -1, dedo: (t > P3 + 0.3 && t < arabe - 0.5) || lanzando, sostiene: t > arabe - 0.5 && t < arabe + 1.0 ? [178, 142] : false, sonrisa: t > india - 0.1, habla: t > P3 + 0.4 && t < alejandro + 0.8 && parp(t, 7) });
  // las cuatro cartas portuguesas: vuelan desde su mano y se quedan prendidas en la pared, con su chincheta
  for (let k = 0; k < 4; k++) { const v = lin(t, lanzaK(k), lanzaK(k) + 0.32); if (v <= 0) continue; const tx = 80 + k * 34, ty = 124, x = Math.round(lerp(p.mano[0], tx, v)), y = Math.round(lerp(p.mano[1], ty, v) - Math.sin(Math.PI * v) * 22);
    T.c_carta(R, x, y, 'portugues', { levanta: v >= 1 ? 0.15 * Math.max(0, Math.sin(t * 2 + k)) : 0 }); if (v >= 1) { R.disco(tx, ty - 9, 1.5, hex('#c8302a')); R.pset(tx, ty - 10, hex('#ff8a7a')); } }
  if (t > asia) { const a = 0.5 + 0.5 * Math.sin((t - asia) * 8); for (let k = 0; k < 4; k++) marcoOro(80 + k * 34 - 16, 111, 80 + k * 34 + 16, 137, a * 0.7); }
};

// ── 4 · la carta de Colón se posa junto a La Española ────────────────────────────────────────────────────────────
const colonT = @f(17.31), puzzle = @f(19.92);
let tmpC = null; const CG = {};
const cartaGrande = (x, y, e) => {   // la carta pequeña (30 × 22) pintada al doble, para que se lea de cerca
  if (!CG[e]) { if (!tmpC) tmpC = R.nuevo(); const prev = R.usar(tmpC); R.llenar(0); T.c_carta(R, 40, 30, e); R.usar(prev); const px = []; for (let j = 0; j < 30; j++) for (let i = 0; i < 40; i++) { const c = tmpC[(15 + j) * 320 + 20 + i]; if (c) px.push([i, j, c]); } CG[e] = px; }
  const x0 = Math.round(x) - 40, y0 = Math.round(y) - 30; for (const [i, j, c] of CG[e]) R.rect(x0 + i * 2, y0 + j * 2, x0 + i * 2 + 1, y0 + j * 2 + 1, c);
};
const p4 = (t) => {
  T.pergamino(R, t, { vista: 'caribe', camara: 'detalle', lupa: false });
  // la carta de Colón entra planeando desde la derecha y se posa en el mar, junto a La Española, a «Columbus»
  const v = suave(lin(t, P4 + 0.15, colonT)), cx = Math.round(lerp(380, 252, v)), cy = Math.round(lerp(40, 104, v) - Math.sin(Math.PI * v) * 12);
  if (v < 1) R.poligono([[cx - 26, cy + 28], [cx + 36, cy + 28], [cx + 36, cy + 34], [cx - 26, cy + 34]], mez(hex('#b8945c'), K, 0.35));
  cartaGrande(cx, cy, 'colon');
  // sus islas son las del mapa: el aro de oro punteado alrededor de La Española y el marco de la carta, que laten
  const hilo = lin(t, colonT, colonT + 0.6), a = 0.5 + 0.5 * Math.sin(t * 8);
  if (hilo > 0) { for (let k = 0; k < 90 * hilo; k++) { if (k % 3 === 2) continue; const q = k / 90 * Math.PI * 2 - Math.PI / 2; const px = Math.round(170 + Math.cos(q) * 54), py = Math.round(92 + Math.sin(q) * 80); R.disco(px, py, 2.2, K); R.disco(px, py, 1.6, mez(hex('#f0c040'), hex('#fff4c8'), a)); } marcoOro(cx - 31, cy - 23, cx + 31, cy + 23, a); }
  if (t > colonT && t < colonT + 0.6) destello(cx + 28, cy - 22, 5);
  // a «puzzle» llegan otras tres cartas y encajan a su lado, como piezas
  [['arabe', 252, 150, 380, 200], ['portugues', 314, 104, 380, 30], ['ptolomeo', 314, 150, 380, 140]].forEach(([e, x, y, x0, y0], k) => { const u = suave(lin(t, puzzle - 0.7 + k * 0.2, puzzle - 0.25 + k * 0.2)); if (u <= 0) return;
    cartaGrande(lerp(x0, x, u), lerp(y0, y, u), e); if (u >= 1 && t < puzzle + 0.5 + k * 0.2) destello(x - 30, y - 22, 3); });
};

// ── 5 · las veinte piezas encajan en el gran pergamino ───────────────────────────────────────────────────────────
const año1513 = @f(23.56);
const PX0 = 48, PY0 = 18, PW = 42, PH = 40;   // la rejilla de 5 × 4 piezas sobre el pergamino (x 48–258, y 18–178)
let mapaB = null;
const mesa5 = fijo(() => {
  madera(0, 0, 319, 179, 13, ['#4a2a18', '#341c10', '#6a4024', '#1e100a'], (x, y) => x > 264 && y < 50);
  // la vela del rincón de abajo a la izquierda, el compás y el tintero
  R.disco(20, 164, 9, K); R.disco(20, 164, 8, hex('#a87a24')); R.disco(20, 164, 5, hex('#d8a838')); R.rect(18, 150, 22, 163, K); R.rect(19, 151, 21, 162, hex('#f2eee2'));
  R.linea(284, 172, 296, 150, K); R.linea(308, 172, 296, 150, K); R.linea(285, 171, 296, 151, hex('#c8ccd8')); R.linea(307, 171, 296, 151, hex('#c8ccd8')); R.disco(296, 150, 2, hex('#d8a838'));
  // el pergamino en blanco con la rejilla de lápiz, donde encajarán las piezas
  R.rect(PX0 - 2, PY0 - 2, PX0 + PW * 5 + 1, PY0 + PH * 4 + 1, mez(hex('#1e100a'), K, 0.5));
  for (let y = PY0; y < PY0 + PH * 4; y++) for (let x = PX0; x < PX0 + PW * 5; x++) { const n = h(x, y, 13); R.pset(x, y, (x - PX0) % PW === 0 || (y - PY0) % PH === 0 ? hex('#c8b088') : n > 0.9 ? hex('#dcc494') : n < 0.05 ? hex('#f2e4c0') : hex('#e8d4a4')); }
});
const ORDEN = [7, 12, 2, 17, 6, 11, 0, 15, 8, 13, 3, 18, 5, 10, 1, 16, 9, 14, 4, 19];
const p5 = (t) => {
  if (!mapaB) { mapaB = R.nuevo(); const prev = R.usar(mapaB); T.pergamino(R, 0, { vista: 'entero', vivo: false }); R.usar(prev); }
  mesa5();
  const pieza = (i, j, x, y) => { for (let yy = 0; yy < PH; yy++) for (let xx = 0; xx < PW; xx++) { const sx = PX0 + i * PW + xx, sy = PY0 + j * PH + yy; R.pset(x + xx, y + yy, mapaB[sy * 320 + sx]); } R.linea(x, y, x + PW - 1, y, mez(mapaB[(PY0 + j * PH) * 320 + PX0 + i * PW], K, 0.2)); };
  // los dos montones de cartas que menguan
  const llegadas = ORDEN.map((_, k) => P5 + 0.15 + k * (año1513 - 0.2 - P5 - 0.15) / 19);
  const quedan = (lado) => ORDEN.filter((_, k) => (k % 2 === lado) && t < llegadas[k] - 0.4).length;
  for (let k = 0; k < quedan(0); k++) T.c_carta(R, 22, 120 - k * 3, ['vieja', 'portugues', 'ptolomeo'][k % 3]);
  for (let k = 0; k < quedan(1); k++) T.c_carta(R, 290, 120 - k * 3, ['vieja', 'arabe', 'colon'][k % 3]);
  // cada pieza vuela de su montón a su sitio, con su sombra, y se posa con un saltito
  ORDEN.forEach((q, k) => { const i = q % 5, j = Math.floor(q / 5), tx = PX0 + i * PW, ty = PY0 + j * PH, v = lin(t, llegadas[k] - 0.4, llegadas[k]);
    if (v <= 0) return;
    if (v >= 1) { pieza(i, j, tx, ty); return; }
    const sx = k % 2 ? 270 : 2, sy = 100, x = Math.round(lerp(sx, tx, suave(v))), y = Math.round(lerp(sy, ty, suave(v)) - Math.sin(Math.PI * v) * 24);
    R.rect(x + 4, y + 6, x + PW + 3, y + PH + 5, mez(hex('#1e100a'), K, 0.6)); pieza(i, j, x, y);
  });
  // las juntas entre las piezas y, a «1513», el brillo que recorre el mapa entero
  for (let k = 0; k < ORDEN.length; k++) { if (t < llegadas[k] || t > llegadas[k] + 0.25) continue; const q = ORDEN[k], x = PX0 + (q % 5) * PW, y = PY0 + Math.floor(q / 5) * PH; marcoOro(x, y, x + PW - 1, y + PH - 1, 1); }
  const brillo = lin(t, año1513, año1513 + 0.9);
  if (brillo > 0 && brillo < 1) { const bx = Math.round(PX0 - 20 + brillo * 250); for (let y = PY0; y < PY0 + PH * 4; y++) for (let x = Math.max(PX0, bx - 6 + Math.round((y - PY0) * 0.3)); x < Math.min(PX0 + PW * 5, bx + 6 + Math.round((y - PY0) * 0.3)); x++) R.pset(x, y, mez(R.pget(x, y), hex('#fff4c8'), 0.45)); }
  if (t > año1513) { const a = lin(t, año1513, año1513 + 0.3); R.numero('1513', 153, Math.round(lerp(120, 106, a)), { tam: 16, centro: true }); }
  // la llama de la vela
  const fl = Math.round(Math.sin(t * 11) + Math.sin(t * 17)) ; R.disco(20, 146 + fl * 0, 3, hex('#f0a838')); R.disco(20, 145, 2, hex('#ffd860')); R.pset(20 + (fl > 0 ? 1 : 0), 142, hex('#fff4c8'));
};

const efectos = [[@f(3.0), 'papel'], [@f(5.95), 'papel'], [veinte, 'pop'], [antiguas, 'brillo'], [alejandro, 'brillo'], [arabe, 'papel'], [cuatro + 0.3, 'whoosh'], [colonT, 'toc'], [puzzle, 'papel'], [P5 + 0.6, 'whoosh'], [año1513, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 1513 });
'''))

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['pr-caribe'] = ('El Caribe de Colón', '''// PR-CARIBE (frase 12), 1502–1513. Cuatro planos:
// 1. LOCAL: la proa de la nao de Colón al atardecer: el sol bajo, nubes de tres tonos, gaviotas, el mar que brilla y las
//    islas en el horizonte; Colón llega a la borda, saca el catalejo a «Columbus», mira, lo baja a «tell» y señala las
//    islas, convencido; un marinero se asombra; la ola rompe contra la proa (corta en «The island»);
// 2. el mapa de cerca (pergamino/caribe, 2.ª vez y vivo): a «Hispaniola» un aro rojo rodea La Española; a «standing up»
//    aparece en punteado la isla de verdad, tumbada; a «north to south» una flecha la recorre de arriba abajo;
// 3. LOCAL: un mapa de 1490 sobre la mesa (la costa de Asia a la izquierda, el mar con islas y Cipango de pie): la
//    silueta de La Española entra desde la derecha y se posa sobre Cipango; encajan («=») a «maps»; una carabela cruza el
//    mar hacia el oeste dejando su estela (corta en «convinced»);
// 4. LOCAL: la sala de Colón en 1506 (Valladolid): Colón, viejo, empuja su globo de entonces (sin América) y lo mira
//    girar hacia el oeste; la ruta punteada llega a «doorstep» a Cipango; a «Asia» brilla la costa de Asia al otro lado
//    y a «Japan» señala Cipango, convencido, y la isla brilla; el gato del alféizar menea la cola.''', _cuerpo(r'''
const P2 = @c(5.39), P3 = @c(9.43), P4 = @c(13.04);

// ── 1 · Colón en la proa ─────────────────────────────────────────────────────────────────────────────────────────
const HOR = 96;
const cielo1 = fijo(() => {
  const st = [[0, '#3a3a78'], [40, '#7a4a8a'], [70, '#d86a6a'], [HOR, '#f6b860']].map(([y, c]) => [y, hex(c)]);
  for (let y = 0; y < HOR; y++) { let i = 0; while (i < st.length - 2 && y > st[i + 1][0]) i++; const f = (y - st[i][0]) / (st[i + 1][0] - st[i][0]); for (let x = 0; x < 320; x++) { const d = (h(x, y, 2) * 0.6 + ((x + y) % 2) * 0.4); R.pset(x, y, d < f ? st[i + 1][1] : st[i][1]); } }
  // el sol que se pone, con su halo
  R.disco(58, HOR, 20, mez(hex('#f6b860'), hex('#fff0c0'), 0.35)); R.disco(58, HOR, 12, hex('#ffe08a')); R.disco(58, HOR, 9, hex('#fff4c8'));
  // las islas del horizonte con palmeras
  for (const [x0, x1, alto] of [[196, 250, 8], [252, 272, 4], [286, 318, 6]]) { for (let x = x0; x <= x1; x++) { const a = Math.round(alto * Math.sin(Math.PI * (x - x0) / (x1 - x0)) + h(x, 1, 3) * 1.5); R.rect(x, HOR - a, x, HOR, hex('#4a3a5a')); } }
  for (const x of [214, 226, 262, 300]) { R.linea(x, HOR - 6, x + 1, HOR - 14, hex('#3a2a4a')); for (const d of [-4, -2, 2, 4]) R.linea(x + 1, HOR - 14, x + 1 + d, HOR - 12 + Math.abs(d) / 2, hex('#3a2a4a')); }
});
const nube = (x, y, w, c0, c1, c2) => { R.disco(x, y, w * 0.32, c1); R.disco(x + w * 0.3, y - 3, w * 0.36, c0); R.disco(x + w * 0.62, y, w * 0.28, c1); R.rect(Math.round(x - w * 0.3), Math.round(y), Math.round(x + w * 0.9), Math.round(y + w * 0.18), c2); R.disco(x + w * 0.3, y - 5, w * 0.2, mez(c0, hex('#fff0e0'), 0.4)); };
const nao = (t) => {
  // el palo del trinquete (a la izquierda, fuera de la barra del año) y su vela cuadrada hinchada con la cruz
  R.rect(8, 18, 12, 150, K); R.rect(9, 18, 11, 150, hex('#6a4024')); R.rect(9, 18, 9, 150, hex('#8a5a34'));
  R.rect(-2, 22, 14, 24, K); const hin = Math.round(4 + Math.sin(t * 1.4) * 2);
  for (let y = 24; y < 98; y++) { const b = Math.round(Math.sin(Math.PI * (y - 24) / 74) * (14 + hin)), x1 = 58 + b; R.linea(14, y, x1, y, (y % 6 === 0) ? hex('#d8ccb0') : hex('#efe6d0')); R.pset(x1, y, K); R.pset(x1 - 1, y, hex('#c8bca0')); R.pset(x1 - 2, y, hex('#dcd0b4')); }
  for (let y = 36; y < 88; y++) { const b = Math.round(Math.sin(Math.PI * (y - 24) / 74) * (14 + hin)); R.rect(32 + Math.round(b * 0.5), y, 35 + Math.round(b * 0.5), y, hex('#b83a2e')); }
  for (let x = 16; x < 80; x++) { const b = Math.round(Math.sin(Math.PI * (60 - 24) / 74) * (14 + hin)); if (x < 58 + b - 2) R.rect(x, 59, x, 62, hex('#b83a2e')); }
  R.rect(-2, 96, 16, 98, K);
  // el bauprés y los cabos (de la cofa a la punta)
  R.linea(244, 124, 300, 98, K); R.linea(244, 123, 300, 97, hex('#6a4024')); R.linea(244, 125, 300, 99, hex('#4a2a18'));
  R.linea(12, 22, 298, 98, hex('#3a2a20')); R.linea(12, 70, 250, 122, hex('#3a2a20'));
};
// la borda (vista por dentro, hacia la proa, que sube a la derecha) y la cubierta de tablas que corren hacia la proa
const BT = (x) => 132 - x * 0.05, BB = (x) => 150 - x * 0.04;
const borda = () => {
  for (let x = 0; x <= 248; x++) { const y0 = Math.round(BT(x)), y1 = Math.round(BB(x)); R.pset(x, y0 - 1, K); for (let y = y0; y <= y1; y++) R.pset(x, y, y < y0 + 3 ? (y === y0 ? hex('#a87a4a') : hex('#8a5a34')) : (y - y0) % 5 === 3 ? hex('#3a2010') : h(x, y, 4) > 0.86 ? hex('#5a3420') : hex('#6a4024')); }
  R.linea(248, 119, 252, 124, K); R.linea(252, 124, 250, 141, K); R.poligono([[249, 120], [251, 124], [249, 140], [246, 140], [246, 121]], hex('#5a3420'));
  for (let x = 16; x < 240; x += 32) { const y0 = Math.round(BT(x)), y1 = Math.round(BB(x)); R.rect(x, y0 + 3, x + 2, y1, hex('#4a2a18')); R.pset(x + 1, y0 + 6, hex('#c8ccd8')); }
  for (let y = 141; y < 180; y++) { const xe = 250 - Math.round((y - 141) * 0.35); for (let x = 0; x < Math.min(320, xe); x++) { if (y < Math.round(BB(x))) continue; const q = (x - 250) / Math.max(1, (y - 120)), k = Math.floor(q * 9 + 100); const junta = Math.abs(q * 9 - Math.round(q * 9)) < 0.06; R.pset(x, y, junta ? hex('#3a2010') : h(k, Math.floor(y / 9), 6) > 0.8 && (x + y) % 3 === 0 ? hex('#6a4426') : h(x, y, 6) > 0.92 ? hex('#a87a4a') : hex('#8a6038')); } R.pset(xe, y, K); }
  // la escotilla con su rejilla, el rollo de cabo, el cubo y el barril
  R.poligono([[96, 164], [140, 162], [146, 178], [92, 180]], K); for (let y = 165; y < 178; y++) for (let x = 95; x < 145; x++) if (x > 94 + (y - 164) * -0.3 && x < 141 + (y - 162) * 0.35) R.pset(x, y, (x % 4 === 0 || y % 4 === 0) ? hex('#5a3420') : hex('#1e100a'));
  for (let r = 8; r > 0; r -= 2) R.anillo(36, 168, r, r % 4 === 0 ? hex('#c8a870') : hex('#9a7a48')); R.pset(36, 168, K);
  R.rect(56, 162, 66, 174, K); R.rect(57, 163, 65, 173, hex('#8a6a4a')); R.rect(57, 165, 65, 165, hex('#4a4a54')); R.rect(57, 163, 65, 163, hex('#3a6a8a'));
  R.rect(212, 146, 230, 174, K); R.rect(213, 147, 229, 173, hex('#8a5a30')); R.rect(213, 147, 214, 173, hex('#a87a4a')); for (const y of [152, 167]) R.rect(213, y, 229, y + 1, hex('#4a4a54'));
};
const p1 = (t) => {
  cielo1();
  // las nubes de tres tonos a tres velocidades y las gaviotas
  for (const [x0, y, w, v, k] of [[60, 26, 40, 2, 0], [190, 48, 34, 3.4, 1], [120, 64, 26, 5, 2], [250, 74, 22, 4.2, 1]]) { const x = ((x0 + t * v) % 380) - 40; nube(x, y, w, [hex('#f6c8a8'), hex('#e89a8a'), hex('#c87a8a')][k], [hex('#e0a090'), hex('#c87a88'), hex('#a86a8a')][k], [hex('#b87a8a'), hex('#9a6a8a'), hex('#7a5a7a')][k]); }
  for (let k = 0; k < 3; k++) { const x = Math.round(((t * (14 + k * 3) + k * 90) % 340) - 10), y = 52 + k * 7 + Math.round(Math.sin(t * 2 + k) * 2), al = parp(t + k, 10); if (x > 270 && y < 46) continue; R.pset(x, y, K); R.pset(x - 1, y - (al ? 1 : 0), K); R.pset(x - 2, y - (al ? 2 : 1), K); R.pset(x + 1, y - (al ? 1 : 0), K); R.pset(x + 2, y - (al ? 2 : 1), K); }
  // el mar: olas que corren, la espuma y el reflejo del sol que tiembla
  for (let y = HOR; y < 180; y++) for (let x = 0; x < 320; x++) { const o = Math.sin(x * 0.18 * (1 - (y - HOR) / 200) + y * 0.9 - t * 2.4) + Math.sin(x * 0.05 - t * 0.8), sol = Math.abs(x - 58) < 6 + (y - HOR) * 0.9 && o > 0.6; R.pset(x, y, sol ? hex('#ffe08a') : o > 1.35 ? (y > 140 ? hex('#e8d8e0') : hex('#c87a8a')) : y < 104 ? hex('#7a4a7a') : y < 118 ? hex('#5a3a6a') : y < 140 ? hex('#3a2a5a') : hex('#2e2250')); }
  nao(t);
  // la ola que rompe contra la proa (con su espuma)
  const ola = @c(2.6), sp = Math.sin(Math.PI * lin(t, ola, ola + 0.9));
  if (sp > 0) for (let k = 0; k < 22; k++) { const a = -0.3 - h(k, 1, 8) * 2.4, d = sp * (6 + h(k, 2, 8) * 16); R.pset(Math.round(256 + Math.cos(a) * d), Math.round(132 + Math.sin(a) * d), k % 3 ? hex('#f2eee2') : hex('#c8d8e8')); }
  borda();
  // Colón llega a la borda, saca el catalejo a «Columbus», lo baja a «tell» y señala las islas, convencido
  const colon = @c(1.92), baja = @c(3.06), llega = suave(lin(t, 0.1, colon - 0.9)), cx = Math.round(lerp(126, 176, llega));
  const mira = t > colon - 0.6 && t < baja, c = R.actor(EL.colon, cx, 154, t, { dir: 1, anda: llega > 0 && llega < 1, sostiene: mira ? [cx + 18, 128] : false, dedo: t > baja + 0.2, sonrisa: t > baja + 0.5, habla: t > @c(3.8) && t < @c(4.6) && parp(t, 7) });
  if (mira) T.PIEZAS_PR.catalejo(R, c.mano[0] + 10, c.mano[1] + 3, { abre: lin(t, colon - 0.5, colon) });
  // el marinero de la cubierta enrolla un cabo, se vuelve y se asombra con las islas
  R.actor(EL.marineroEspanol, 70, 160, t, { dir: t < @c(3.3) ? -1 : 1, brazos: t < @c(3.3) && parp(t, 5), sorpresa: t > @c(3.5) && t < @c(4.6), sonrisa: t > @c(4.6) });
};

// ── 2 · La Española, de pie ──────────────────────────────────────────────────────────────────────────────────────
const espanola = @c(6.07), dePie = @c(7.27), norte = @c(8.33), sur = @c(8.81);
const p2 = (t) => {
  T.pergamino(R, t, { vista: 'caribe', vivo: true });
  const cx = 150, cy = 82;
  // el aro rojo que rodea la isla del mapa a «Hispaniola»
  const a = lin(t, espanola, espanola + 0.5); if (a > 0) for (let k = 0; k < 80 * a; k++) { const q = k / 80 * Math.PI * 2 - Math.PI / 2; if (k % 3 === 2) continue; R.pset(Math.round(cx + Math.cos(q) * 26), Math.round(cy + Math.sin(q) * 50), hex('#c8302a')); R.pset(Math.round(cx + Math.cos(q) * 27), Math.round(cy + Math.sin(q) * 51), hex('#c8302a')); }
  // la isla de verdad, tumbada (de oeste a este), en punteado azul: aparece de pie sobre la del mapa y se tumba
  const g = lin(t, dePie, dePie + 0.3), gira = suave(lin(t, dePie + 0.3, dePie + 1.1)) * Math.PI / 2;
  if (g > 0) { const pts = []; for (let k = 0; k < 60; k++) { const q = k / 60 * Math.PI * 2, rx = 15 + 3 * Math.sin(q * 3), ry = 44 + 4 * Math.cos(q * 2); const x = Math.cos(q) * rx, y = Math.sin(q) * ry; pts.push([cx + x * Math.cos(gira) - y * Math.sin(gira), cy + x * Math.sin(gira) + y * Math.cos(gira)]); }
    pts.forEach(([x, y], k) => { if (k % 2 === 0 && k / 60 < g) { R.disco(Math.round(x), Math.round(y), 1.6, hex('#f6f2e8')); R.pset(Math.round(x), Math.round(y), hex('#1e4aa8')); } }); }
  // la flecha de norte a sur a lo largo de la isla del mapa
  const f = suave(lin(t, norte - 0.1, sur + 0.1));
  if (f > 0) { const x = 186, y0 = 34, y1 = Math.round(lerp(34, 132, f)); R.rect(x - 1, y0, x + 1, y1, K); R.rect(x, y0, x, y1, hex('#c8302a')); R.poligono([[x - 5, y1 - 1], [x + 5, y1 - 1], [x, y1 + 6]], K); R.poligono([[x - 4, y1], [x + 4, y1], [x, y1 + 5]], hex('#c8302a'));
    R.disco(x, y0 - 3, 3, K); R.disco(x, y0 - 3, 2, hex('#d8a838')); destello(x, y0 - 3, 4, hex('#fff4c8')); }
};

// ── 3 · Cipango en un mapa de entonces ───────────────────────────────────────────────────────────────────────────
const japon = @c(9.63), mapas = @c(10.85), cruza = @c(11.6);
const CIPANGO = [[0, -44], [8, -38], [12, -24], [10, -8], [14, 6], [12, 22], [6, 36], [-2, 44], [-8, 34], [-12, 18], [-10, 2], [-14, -14], [-10, -30], [-6, -40]];
const mapa3 = fijo(() => {
  madera(0, 0, 319, 179, 12, ['#5a3420', '#3e2214', '#7a4a2a', '#24140a'], (x, y) => x > 266 && y < 50);
  // la hoja del mapa de 1490: el mar pintado, la orla roja y oro
  R.rect(28, 18, 264, 166, K); R.rect(30, 20, 262, 164, hex('#c8302a')); R.rect(32, 22, 260, 162, hex('#d8a838')); R.rect(34, 24, 258, 160, K);
  for (let y = 25; y < 160; y++) for (let x = 35; x < 258; x++) { const n = h(x, y, 15); R.pset(x, y, ((x + Math.round(Math.sin(y * 0.5) * 2)) % 9 === 0 && y % 4 === 0) ? hex('#8abcb8') : n > 0.92 ? hex('#5a8a8a') : hex('#6a9aa0')); }
  for (let y = 28; y < 158; y += 7) for (let x = 36 + (y % 14 === 0 ? 0 : 6); x < 256; x += 13) { R.pset(x, y, hex('#a8d0c8')); R.pset(x + 1, y - 1, hex('#a8d0c8')); R.pset(x + 2, y, hex('#a8d0c8')); R.pset(x + 3, y - 1, hex('#a8d0c8')); R.pset(x + 4, y, hex('#a8d0c8')); }
  for (const [x, y] of [[112, 150], [140, 30], [228, 44], [236, 150]]) { R.poligono([[x - 4, y], [x + 4, y], [x + 3, y + 2], [x - 3, y + 2]], hex('#4a2a18')); R.linea(x, y, x, y - 6, K); R.rect(x - 2, y - 5, x + 2, y - 2, hex('#f2eee2')); }
  // la costa de Asia a la izquierda, con montes, ríos y ciudades de tejados rojos
  const costa = (y) => 84 + Math.round(Math.sin(y * 0.09) * 10 + Math.sin(y * 0.23) * 4);
  for (let y = 25; y < 160; y++) { const c = costa(y); for (let x = 35; x < c; x++) R.pset(x, y, h(x, y, 16) > 0.88 ? hex('#c8a058') : (x + y) % 7 === 0 ? hex('#a8a058') : hex('#dcc08a')); R.pset(c, y, hex('#2a2018')); R.pset(c + 1, y, hex('#4a7a7a')); }
  for (const [x, y] of [[48, 40], [60, 70], [44, 100], [62, 130]]) { R.poligono([[x - 6, y + 4], [x, y - 5], [x + 6, y + 4]], hex('#8a6a3a')); R.poligono([[x - 4, y + 4], [x, y - 3], [x + 2, y + 4]], hex('#a8865a')); R.pset(x, y - 5, hex('#f2eee2')); }
  for (const [x, y] of [[70, 52], [74, 112], [56, 148]]) { R.rect(x - 3, y - 2, x + 3, y + 2, K); R.rect(x - 2, y - 1, x + 2, y + 1, hex('#f2eee2')); R.poligono([[x - 4, y - 2], [x, y - 6], [x + 4, y - 2]], hex('#c8302a')); }
  R.linea(40, 88, 66, 96, hex('#4a7aa0')); R.linea(66, 96, costa(96), 98, hex('#4a7aa0'));
  // islas pequeñas del mar y la costa de Europa a la derecha, con las Canarias
  for (const [x, y, r] of [[118, 40, 3], [126, 132, 4], [206, 60, 3], [212, 140, 3], [108, 104, 2], [224, 98, 2]]) { R.disco(x, y, r + 1, hex('#2a2018')); R.disco(x, y, r, hex('#9aa458')); }
  for (let y = 25; y < 160; y++) { const c = 246 + Math.round(Math.sin(y * 0.12) * 4); for (let x = c; x < 258; x++) R.pset(x, y, hex('#dcc08a')); R.pset(c, y, hex('#2a2018')); }
  // Cipango, la isla grande de pie, con montes, oro y una ciudad
  const cx = 166, cy = 90;
  R.poligono(CIPANGO.map(([x, y]) => [cx + x + 1, cy + y + 1]), hex('#2a2018')); R.poligono(CIPANGO.map(([x, y]) => [cx + x, cy + y]), hex('#d8a858'));
  for (let y = -40; y < 40; y += 3) for (let x = -10; x < 10; x += 3) if (h(x, y, 17) > 0.7) R.pset(cx + x, cy + y, hex('#a8a058'));
  for (const [x, y] of [[cx - 2, cy - 20], [cx + 2, cy + 12]]) { R.poligono([[x - 5, y + 4], [x, y - 5], [x + 5, y + 4]], hex('#8a6a3a')); R.pset(x, y - 5, hex('#f2eee2')); }
  R.disco(cx, cy - 2, 3, K); R.disco(cx, cy - 2, 2, hex('#f0c040')); R.pset(cx - 1, cy - 3, hex('#fff4c8'));
  // la rosa de los vientos y el monstruo marino
  T.PIEZAS_PR.rosa?.(R, 120, 74); R.poligono([[200, 120], [214, 114], [226, 120], [214, 124]], hex('#3a6a6a')); R.pset(222, 118, K); R.linea(196, 118, 200, 120, hex('#3a6a6a')); R.linea(206, 110, 206, 114, hex('#c8d8e8'));
  // el tintero y la pluma, en la mesa a la derecha (abajo, lejos de Atom)
  R.disco(290, 150, 8, K); R.disco(290, 150, 7, hex('#3a3a46')); R.disco(290, 150, 4, hex('#1a1418')); R.linea(292, 146, 306, 128, hex('#f6f2e8')); R.linea(293, 147, 307, 129, hex('#c8c4b8'));
});
const p3 = (t) => {
  mapa3();
  // las olas del mar que corren (recortadas al mar del mapa)
  R.recorte([88, 25, 244, 159]); for (let k = 0; k < 16; k++) { const x = Math.round(96 + ((h(k, 1, 9) * 140 + t * 6) % 145)), y = 30 + Math.round(h(k, 2, 9) * 124); if (Math.abs(x - 166) < 16 && Math.abs(y - 90) < 46) continue; R.pset(x, y, hex('#e8f0f0')); R.pset(x + 1, y - 1, hex('#e8f0f0')); R.pset(x + 2, y, hex('#e8f0f0')); } R.recorte(null);
  // la silueta de La Española (la del mapa de Piri) entra desde la derecha y se posa sobre Cipango
  const v = suave(lin(t, P3 + 0.3, mapas - 0.2)), sx = Math.round(lerp(300, 166, v)), sy = Math.round(lerp(96, 90, v));
  const fx = (x) => Math.round(x * 0.85);
  for (let k = 0; k < CIPANGO.length; k++) { const [ax, ay] = CIPANGO[k], [bx, by] = CIPANGO[(k + 1) % CIPANGO.length]; R.linea(sx + fx(ax), sy + ay, sx + fx(bx), sy + by, hex('#c8302a'), 3); R.linea(sx + fx(ax) + 1, sy + ay, sx + fx(bx) + 1, sy + by, hex('#e05a4a'), 3); }
  if (v > 0 && v < 1) for (let y = -40; y < 40; y += 2) for (let x = -10; x < 10; x += 2) R.pset(sx + x, sy + y, mez(R.pget(sx + x, sy + y), hex('#d8a858'), 0.5));
  // encajan: el «=» que late junto a las dos islas
  if (t > mapas - 0.2) { const a = 0.5 + 0.5 * Math.sin((t - mapas) * 8), c = mez(hex('#d8a838'), hex('#fff4c8'), a); R.rect(186, 84, 198, 86, K); R.rect(187, 85, 197, 85, c); R.rect(186, 90, 198, 92, K); R.rect(187, 91, 197, 91, c); }
  // una carabela cruza el mar hacia el oeste (la idea de Colón), con su estela de puntos
  const w = suave(lin(t, cruza, P4 - 0.15)), bx = Math.round(lerp(240, 196, w)), by = Math.round(lerp(132, 116, w) + Math.sin(t * 3));
  if (t > cruza) { for (let k = 0; k < 10; k++) { const q = k / 10 * w; if (k % 2) continue; R.pset(Math.round(lerp(240, 196, q)) + 6, Math.round(lerp(132, 116, q)) + 3, hex('#f2eee2')); }
    R.poligono([[bx - 5, by], [bx + 6, by], [bx + 4, by + 3], [bx - 3, by + 3]], hex('#4a2a18')); R.linea(bx, by, bx, by - 9, K); R.poligono([[bx - 3, by - 8], [bx + 4, by - 8], [bx + 4, by - 2], [bx - 3, by - 2]], hex('#f2eee2')); R.rect(bx, by - 7, bx, by - 3, hex('#c8302a')); R.rect(bx - 2, by - 5, bx + 2, by - 5, hex('#c8302a')); }
  // la llama de la vela en la esquina de la mesa
  R.disco(14, 170, 6, K); R.disco(14, 170, 5, hex('#a87a24')); R.rect(12, 158, 16, 169, K); R.rect(13, 159, 15, 168, hex('#f2eee2')); R.disco(14, 155 + (parp(t, 13) ? 0 : 1), 2, hex('#f0a838')); R.pset(14, 152, hex('#fff4c8'));
};

// ── 4 · Colón y su globo de entonces: Asia al otro lado de un mar estrecho ─────────────────────────────────────────
const asia = @c(15.08), japonT = @c(17.68), puerta = @c(14.4);
// las tierras del globo de 1492 (sin América): Europa y África, Asia que llega muy al este, Cipango de pie e islitas
const EUAF = [[-10, 62], [30, 72], [45, 45], [36, 31], [52, 12], [42, -35], [20, -36], [9, 4], [-17, 14], [-10, 36], [-9, 44]];
const ASIA = [[45, 70], [180, 72], [232, 42], [236, 12], [214, -6], [176, 14], [140, -4], [104, 8], [70, 22], [50, 30]];
const CIPG = [[-61, 33], [-57, 30], [-56, 22], [-58, 14], [-62, 12], [-64, 20], [-64, 28]];
const ISLAS = [[-30, 38], [-38, 28], [-46, 12], [-80, 30], [-88, 18], [-26, 16]];
const dentro = (pol, lon, lat) => { let d = false; for (let i = 0, j = pol.length - 1; i < pol.length; j = i++) { const [xi, yi] = pol[i], [xj, yj] = pol[j]; if ((yi > lat) !== (yj > lat) && lon < (xj - xi) * (lat - yi) / (yj - yi) + xi) d = !d; } return d; };
const GX = 208, GY = 106, GR = 34, F0 = 22 * Math.PI / 180;
const globo = (lon0, t, brillaAsia, brillaCip) => {
  const D = Math.PI / 180, sf = Math.sin(F0), cf = Math.cos(F0);
  R.disco(GX, GY, GR + 1, K);
  for (let j = -GR; j <= GR; j++) for (let i = -GR; i <= GR; i++) { const X = i / GR, Y = -j / GR, rho = Math.hypot(X, Y); if (rho > 1) continue;
    const c = Math.asin(Math.min(1, rho)), sc = Math.sin(c), cc = Math.cos(c), lat = rho ? Math.asin(cc * sf + Y * sc * cf / rho) / D : F0 / D;
    let lon = lon0 + Math.atan2(X * sc, rho * cc * cf - Y * sc * sf) / D; lon = ((lon + 540) % 360) - 180;
    const lonA = lon < 40 ? lon + 360 : lon, luz = 0.25 + 0.75 * Math.max(0, cc) - (X < -0.3 ? 0.12 : 0) + (X > 0.4 && Y > 0.2 ? 0.12 : 0);
    let col = (Math.round(lon) % 15 === 0 || Math.round(lat) % 15 === 0) && h(i, j, 1) > 0.4 ? hex('#a8c4c0') : hex('#6a9aa0');
    if (dentro(EUAF, lon, lat) && !(lat > 31 && lat < 44 && lon > -5 && lon < 36)) col = hex('#d8bc80');
    else if (dentro(ASIA, lonA, lat)) col = brillaAsia > 0 && Math.abs(lat) < 40 && lonA > 200 ? mez(hex('#d8bc80'), hex('#fff0a0'), brillaAsia) : hex('#c8a868');
    else if (dentro(CIPG, lon, lat)) col = brillaCip > 0 ? mez(hex('#e0a848'), hex('#fff0a0'), brillaCip) : hex('#e0a848');
    else if (ISLAS.some(([a, b]) => Math.hypot(lon - a, lat - b) < 2.6)) col = hex('#9aa458');
    R.pset(GX + i, GY + j, mez(col, K, Math.max(0, 0.55 - luz * 0.55)));
  }
  // el brillo del barniz
  for (let k = 0; k < 8; k++) R.pset(GX - 14 + k, GY - 22 + Math.round(k * 0.4), hex('#f2f6f0')); R.pset(GX - 16, GY - 20, hex('#f2f6f0'));
  return (lon, lat) => { const l = (lon - lon0) * D, f = lat * D, cc = sf * Math.sin(f) + cf * Math.cos(f) * Math.cos(l); if (cc < 0.05) return null; return [GX + GR * Math.cos(f) * Math.sin(l), GY - GR * (cf * Math.sin(f) - sf * Math.cos(f) * Math.cos(l))]; };
};
const RUTA = [[-9, 38], [-16, 28], [-30, 26], [-46, 24], [-56, 23]];
const sala4 = fijo(() => {
  // la pared encalada con su zócalo, las vigas, el suelo de barro cocido
  for (let y = 0; y < 142; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 41) * 0.6 + h(x >> 3, y >> 3, 42) * 0.4; R.pset(x, y, x > 266 && y < 50 ? hex('#e8e0cc') : n > 0.8 ? hex('#d8cdb4') : n < 0.15 ? hex('#f2ecdc') : hex('#e8e0cc')); }
  R.rect(0, 0, 319, 7, hex('#3a2416')); for (let x = 6; x < 266; x += 44) { R.rect(x, 0, x + 10, 11, K); R.rect(x + 1, 0, x + 9, 10, hex('#5a3a22')); R.rect(x + 1, 10, x + 9, 10, hex('#2e1c10')); }
  R.rect(0, 118, 319, 141, hex('#b85a3a')); for (let x = 0; x < 320; x += 2) if (h(x, 3, 43) > 0.6) R.pset(x, 118, hex('#d8865a')); R.rect(0, 141, 319, 142, hex('#5a2a1a'));
  for (let y = 143; y < 180; y++) for (let x = 0; x < 320; x++) { const s = 0.5 + (y - 143) / 60, i = Math.floor((x - 160) / (14 * s) + 100), j = Math.floor((y - 143) / 7); const junta = Math.abs(((x - 160) / (14 * s)) - Math.round((x - 160) / (14 * s))) < 0.06 || (y - 143) % 7 === 0;
    R.pset(x, y, junta ? hex('#7a3a24') : h(i, j, 44) > 0.7 ? hex('#c06a44') : h(i, j, 45) > 0.5 ? hex('#b05a3a') : hex('#a8543a')); }
  // la ventana de reja (el cielo de la tarde se pinta vivo), la repisa con el reloj de arena y libros, el arcón
  R.rect(18, 24, 82, 104, hex('#8a7a60')); R.rect(21, 27, 79, 101, K);
  R.rect(14, 104, 86, 109, hex('#b0a080')); R.rect(14, 109, 86, 110, hex('#6a5a40'));
  R.rect(96, 52, 150, 55, K); R.rect(97, 53, 149, 54, hex('#7a4a2a'));
  for (let k = 0; k < 5; k++) { const x = 100 + k * 7; R.rect(x, 38 + (k % 2) * 2, x + 5, 52, K); R.rect(x + 1, 39 + (k % 2) * 2, x + 4, 51, [hex('#7a2a3a'), hex('#2e4a6a'), hex('#5a6a3a')][k % 3]); R.pset(x + 2, 44, hex('#d8a838')); }
  R.rect(138, 40, 146, 52, K); R.rect(139, 41, 145, 42, hex('#7a4a2a')); R.rect(139, 50, 145, 51, hex('#7a4a2a')); R.poligono([[140, 43], [144, 43], [142, 46]], hex('#e8d4a4')); R.poligono([[142, 46], [140, 49], [144, 49]], hex('#e8d4a4'));
  R.rect(24, 132, 76, 164, K); R.rect(25, 133, 75, 163, hex('#6a4024')); R.rect(25, 133, 75, 140, hex('#8a5a34')); for (const x of [34, 66]) R.rect(x, 133, x + 2, 163, hex('#3a3a46')); R.rect(48, 142, 52, 147, hex('#d8a838'));
  // manchas de cal y desconchones, la lámpara de hierro colgada, la silla de cuero y el modelo de nao en su repisa
  for (const [x, y, r] of [[120, 92, 10], [178, 30, 7], [296, 120, 6], [10, 120, 6]]) for (let j = -r; j <= r; j++) for (let i = -r * 1.6; i <= r * 1.6; i++) if ((i / 1.6) ** 2 + j * j < r * r && h(x + i, y + j, 48) > 0.35) R.pset(Math.round(x + i), y + j, mez(R.pget(Math.round(x + i), y + j), hex('#c8bca0'), 0.4));
  for (const [x, y] of [[150, 80], [92, 20], [232, 40]]) { R.rect(x, y, x + 6, y + 3, hex('#cfc4ac')); R.linea(x, y + 4, x + 6, y + 4, hex('#f6f0e2')); }
  R.linea(120, 7, 120, 60, hex('#3a3a46')); R.poligono([[112, 60], [128, 60], [124, 66], [116, 66]], K); R.rect(114, 61, 126, 64, hex('#4a4a54')); for (const x of [115, 120, 125]) { R.rect(x - 1, 56, x + 1, 60, hex('#f2eee2')); R.pset(x, 55, hex('#ffd860')); }
  R.rect(96, 128, 100, 170, K); R.rect(97, 128, 99, 169, hex('#6a4024')); R.rect(96, 146, 122, 150, K); R.rect(97, 147, 121, 149, hex('#7a3a2a')); R.rect(118, 150, 121, 170, K); R.rect(100, 132, 100, 145, hex('#9a4a32'));
  R.rect(236, 54, 296, 57, K); R.rect(237, 55, 295, 56, hex('#7a4a2a')); R.poligono([[246, 48], [286, 48], [282, 54], [250, 54]], K); R.poligono([[247, 49], [285, 49], [281, 53], [251, 53]], hex('#8a5a30')); R.rect(265, 30, 266, 48, K); R.rect(256, 34, 275, 44, K); R.rect(257, 35, 274, 43, hex('#efe6d0')); R.rect(264, 36, 267, 42, hex('#b83a2e')); R.rect(259, 38, 272, 39, hex('#b83a2e'));
  // la carta de navegar clavada en la pared, a la derecha
  R.rect(244, 60, 300, 100, K); R.rect(245, 61, 299, 99, hex('#e8d4a4')); R.linea(250, 70, 262, 92, hex('#3a2a18')); R.linea(262, 92, 280, 96, hex('#3a2a18')); for (let k = 0; k < 6; k++) R.linea(272, 78, 272 + Math.round(Math.cos(k) * 24), 78 + Math.round(Math.sin(k) * 18), hex('#c87a6a')); R.disco(272, 78, 2, hex('#a83224'));
  for (const [x, y] of [[246, 62], [298, 62], [246, 98], [298, 98]]) R.pset(x, y, hex('#c8ccd8'));
  // la alfombra al pie del globo
  for (let y = 160; y < 178; y++) for (let x = 120 + Math.round((178 - y) * 0.6); x < 300 - Math.round((178 - y) * 0.6); x++) { const d = Math.min(y - 160, 177 - y); R.pset(x, y, d < 2 ? hex('#22447a') : ((x + y) % 6 < 3 ? hex('#a8302a') : hex('#c8402e'))); }
});
const p4 = (t) => {
  sala4();
  // el cielo de la tarde por la reja, con una nube y un vencejo
  R.recorte([22, 28, 78, 100]); for (let y = 28; y <= 100; y++) for (let x = 22; x <= 78; x++) R.pset(x, y, y < 60 ? hex('#e8a070') : (x + y) % 2 ? hex('#f0c080') : hex('#f6d8a0'));
  R.disco(Math.round(30 + ((t * 2) % 60)), 50, 5, hex('#f6e0d0')); R.disco(Math.round(36 + ((t * 2) % 60)), 49, 4, hex('#f0d0c0'));
  for (let y = 84; y <= 100; y++) for (let x = 22; x <= 78; x++) if (y > 92 - Math.round(Math.sin(x * 0.2) * 4)) R.pset(x, y, hex('#8a6a5a'));
  { const vx = Math.round(22 + ((t * 18) % 60)), vy = 40 + Math.round(Math.sin(t * 3) * 3), al = parp(t, 11); R.pset(vx, vy, K); R.pset(vx - 1, vy - (al ? 1 : 0), K); R.pset(vx + 1, vy - (al ? 1 : 0), K); }
  R.recorte(null); for (let x = 30; x < 78; x += 10) R.rect(x, 27, x + 1, 101, K); R.rect(21, 62, 79, 63, K);
  // el gato del alféizar que menea la cola
  T.gato(R, 64, 104, t, { dir: -1 });
  // el globo de pie: gira hacia el oeste, de España a Cipango y a la costa de Asia
  const gira = suave(lin(t, P4 + 0.4, japonT - 0.6)), lon0 = lerp(-6, -66, gira) + (t < P4 + 0.4 ? 0 : Math.sin(lin(t, japonT - 0.6, japonT + 0.4) * Math.PI) * 2);
  R.linea(GX - 18, GY + 36, GX - 28, 172, K); R.linea(GX + 18, GY + 36, GX + 28, 172, K); R.linea(GX, GY + 36, GX, 168, K); R.linea(GX - 17, GY + 36, GX - 27, 172, hex('#6a4024')); R.linea(GX + 17, GY + 36, GX + 27, 172, hex('#6a4024')); R.linea(GX - 22, 160, GX + 22, 160, hex('#5a3a22')); R.rect(GX - 20, GY + 34, GX + 20, GY + 37, hex('#5a3a22'));
  const P = globo(lon0, t, t > asia ? 0.5 + 0.5 * Math.sin((t - asia) * 7) : 0, t > japonT - 0.2 ? 0.5 + 0.5 * Math.sin((t - japonT) * 9) : 0);
  R.anillo(GX, GY, GR + 3, hex('#d8a838')); R.anillo(GX, GY, GR + 4, hex('#a87a24')); R.disco(GX, GY - GR - 4, 2, hex('#d8a838')); R.disco(GX, GY + GR + 4, 2, hex('#d8a838'));
  // la ruta de Colón en el globo, que se dibuja hacia el oeste
  const v = lin(t, P4 + 0.6, puerta);
  for (let k = 0; k <= 40 * v; k++) { if (k % 3 === 2) continue; const u = k / 40, n = RUTA.length - 1, i = Math.min(n - 1, Math.floor(u * n)), f = u * n - i, p = P(lerp(RUTA[i][0], RUTA[i + 1][0], f), lerp(RUTA[i][1], RUTA[i + 1][1], f)); if (p) { R.disco(Math.round(p[0]), Math.round(p[1]), 1.2, K); R.pset(Math.round(p[0]), Math.round(p[1]), hex('#fff4c8')); } }
  // Colón, viejo y canoso, empuja el globo, lo mira girar y señala Cipango a «Japan», convencido
  const empuja = t > P4 + 0.2 && t < P4 + 0.9, c = R.actor(EL.colon, 146, 170, t, { dir: 1, sostiene: empuja ? [172, 118 + Math.round(lin(t, P4 + 0.2, P4 + 0.9) * 6)] : false, dedo: t > japonT - 0.4, sonrisa: t > asia, habla: t > puerta && t < asia + 0.8 && parp(t, 7) });
  const cp = P(-60, 22); if (cp && t > japonT - 0.2) { R.anillo(Math.round(cp[0]), Math.round(cp[1]), 7 + Math.round(Math.sin(t * 7)), hex('#fff0a0'), 3); destello(cp[0] + 8, cp[1] - 8, 3); }
  // la vela de la repisa
  R.rect(118, 47, 121, 52, hex('#f2eee2')); R.pset(119 + (parp(t, 12) ? 1 : 0), 45, hex('#ffd860')); R.pset(119, 44, hex('#fff4c8'));
};

const año = (t) => t < P2 ? 1502 : t < P3 ? 1513 : t < P4 ? 1502 : 1506;
const efectos = [[@c(1.4), 'golpecito'], [@c(2.6), 'ola'], [espanola, 'pop'], [norte, 'lapiz'], [mapas - 0.2, 'brillo'], [P4 + 0.3, 'whoosh'], [japonT, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
'''))
