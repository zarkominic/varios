E = {}

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
# Lo común de las tres escenas (se antepone a cada cuerpo): búfer de lo fijo, cielo tramado, nubes de tres tonos,
# pájaros, madera con vetas, el globo del número, el camión de carga y la hormigonera de calle.
COMUN = r'''
const H = hex, PZ = T.PIEZAS_AT, K = T.C.k, BL = T.C.blanco;
const ru = (x, y, k = 0) => R.hash2(x + k * 101, y + k * 37);
const tono = (cols, v, x, y) => R.tone(cols, v, x, y);
const parp = (t, v = 7) => Math.sin(t * v) > 0;
const cl = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = (u) => u * u * (3 - 2 * u);
// mezcla de dos colores (para luces y sombras sobre lo ya pintado)
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const tinta = (x, y, c, a) => R.pset(x, y, mez(R.pget(x, y), c, a));
// lo que no se mueve de un fondo local va en un búfer (R.usar(prev), nunca R.usar() a secas)
const fijo = (dib) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); dib(); R.usar(prev); } R.copiar(b); }; };
// cielo tramado de y0 a y1 con la rampa cols (de arriba abajo)
const cieloT = (y0, y1, cols, x0 = 0, x1 = 319) => { const n = cols.length - 1; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, tono(cols, n * (y - y0) / Math.max(1, y1 - y0) + (ru(x, y, 3) - 0.5) * 0.25, x, y)); };
// nube de tres tonos (sombra, cuerpo, luz)
const NUBE = [H('#9fb0cc'), H('#dfe6f2'), H('#ffffff')];
const nube3 = (cx, cy, w, c = NUBE) => {
  const b = [[0, 0, 0.3], [-0.32, 0.07, 0.22], [0.3, 0.06, 0.24], [-0.12, -0.13, 0.24], [0.14, -0.09, 0.21], [0.46, 0.1, 0.14], [-0.46, 0.11, 0.13]];
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 2), Math.max(1, Math.round(r * w)), c[0]);
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), Math.max(1, Math.round(r * w)), c[1]);
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 2), Math.max(1, Math.round(r * w * 0.62)), c[2]);
  for (let i = -Math.round(w * 0.55); i <= Math.round(w * 0.55); i += 2) R.pset(Math.round(cx + i), Math.round(cy + w * 0.17 + 2), c[0]);
};
// nubes que corren a tres velocidades (lista de [x0, y, w, v])
const nubes = (t, L, c = NUBE) => { for (const [x0, y, w, v] of L) nube3(((x0 + t * v) % 400 + 400) % 400 - 40, y, w, c); };
// pájaros pequeños que aletean y cruzan
const pajaros = (t, n, y0, v = 9, c = H('#2a2a3a')) => { for (let k = 0; k < n; k++) { const x = Math.round(((k * 53 + t * v * (1 + k * 0.13)) % 380) - 30), y = Math.round(y0 + k * 4 + Math.sin(t * 1.5 + k) * 2), a = Math.sin(t * 10 + k * 2) > 0;
  R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 2 : -1), c); R.pset(x + 2, y - (a ? 2 : -1), c); } };
// madera con vetas (tablas horizontales de alto h)
const madera = (x0, y0, x1, y1, cols, h = 6, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const fila = Math.floor((y - y0) / h), off = Math.floor(ru(fila, 9, k) * 80), junta = (y - y0) % h === h - 1 || (x + off) % 61 === 0;
  const veta = Math.sin((x + off) * 0.21 + Math.sin(x * 0.05 + fila) * 2.2 + fila * 3) > 0.82; R.pset(x, y, junta ? cols[3] : veta ? cols[2] : tono([cols[0], cols[1]], ru(x, y, k) * 1.3, x, y)); } };
// el globo del número: un globo rojo de goma con su brillo, el nudo y el cordel hasta (ax, ay); r el radio; n el número
const GLOBO = [H('#7a1418'), H('#b82a2a'), H('#e04a3a'), H('#ff8a70')];
const globo = (t, cx, cy, r, n, ax, ay, o = {}) => {
  const rx = Math.round(r * (1 + 0.04 * Math.sin(t * 3.1))), ry = Math.round(r * 1.12 * (1 - 0.03 * Math.sin(t * 3.1)));
  // el cordel que se mece
  const kx = cx, ky = cy + ry + 2; let px = kx, py = ky;
  for (let i = 1; i <= 16; i++) { const u = i / 16, x = Math.round(lerp(kx, ax, u) + Math.sin(u * 6 + t * 3) * 3 * (1 - u)), y = Math.round(lerp(ky, ay, u)); R.linea(px, py, x, y, o.cordel ?? H('#e8e4dc')); px = x; py = y; }
  for (let y = -ry - 1; y <= ry + 1; y++) for (let x = -rx - 1; x <= rx + 1; x++) {
    const d = (x * x) / ((rx + 0.5) * (rx + 0.5)) + (y * y) / ((ry + 0.5) * (ry + 0.5)); if (d > 1.0) continue;
    if (d > 0.86) { R.pset(cx + x, cy + y, K); continue; }
    const l = 1.9 - (x + y * 1.2) / (rx + ry) * 1.4 - d * 0.9; R.pset(cx + x, cy + y, tono(GLOBO, l + (o.tenso ? 0.4 : 0), cx + x, cy + y));
  }
  // el brillo y el nudo
  R.disco(cx - Math.round(rx * 0.42), cy - Math.round(ry * 0.45), Math.max(1, Math.round(r * 0.14)), H('#ffd0c0')); R.pset(cx - Math.round(rx * 0.25), cy - Math.round(ry * 0.62), BL);
  R.poligono([[cx - 3, ky + 2], [cx + 3, ky + 2], [cx, ky - 2]], K); R.poligono([[cx - 2, ky + 1], [cx + 2, ky + 1], [cx, ky - 1]], GLOBO[1]);
  if (n) R.numero(n, cx, cy + 4, { centro: true, fina: o.fina, color: H('#fff4e0') });
  if (o.tenso) for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) if (Math.floor(t * 8) % 2) { R.pset(cx + a * (rx + 4), cy + b * (ry + 2), BL); R.pset(cx + a * (rx + 6), cy + b * (ry + 4), BL); }
};
// el camión de carga de los ochenta de perfil hacia la derecha (cabina crema con franjas naranja y marrón, remolque de
// aluminio con costillas); x el morro, s el suelo de las ruedas; devuelve nada
const camionCarga = (x, s, t, o = {}) => {
  const xr = x - 82, top = s - 30, gira = Math.floor(t * 12) % 2;
  // sombra
  for (let i = xr + 2; i <= x + 2; i++) { tinta(i, s + 1, K, 0.35); tinta(i, s + 2, K, 0.2); }
  // remolque
  R.rect(xr, top, xr + 56, s - 7, K); R.rect(xr + 1, top + 1, xr + 55, s - 8, H(o.remolque ?? '#c8ccd0'));
  for (let i = xr + 4; i < xr + 55; i += 6) { R.rect(i, top + 1, i, s - 8, H('#9aa0a8')); R.pset(i + 1, top + 2, BL); }
  R.rect(xr + 1, top + 1, xr + 55, top + 2, H('#eef0f2')); R.rect(xr + 1, s - 10, xr + 55, s - 8, H('#7a8088'));
  R.rect(xr + 6, top + 8, xr + 50, top + 11, H(o.franja ?? '#e07a2a')); R.rect(xr + 6, top + 12, xr + 50, top + 13, H('#7a4a24'));
  R.rect(xr + 54, s - 8, xr + 60, s - 6, K);
  // cabina
  const cx = x - 24; R.rect(cx, top + 6, x, s - 6, K); R.rect(cx + 1, top + 7, x - 1, s - 7, H('#efe2c0'));
  R.rect(cx + 1, top + 7, cx + 3, s - 7, H('#d6c49c')); R.rect(cx + 12, top + 9, x - 3, top + 17, K); R.rect(cx + 13, top + 10, x - 4, top + 16, H('#6aa8c8')); R.linea(cx + 14, top + 15, cx + 18, top + 10, H('#cfeaf4'));
  R.rect(cx + 1, s - 16, x - 1, s - 14, H('#e07a2a')); R.rect(cx + 1, s - 13, x - 1, s - 12, H('#7a4a24'));
  R.rect(x - 2, s - 12, x, s - 7, H('#b8b8b0')); R.rect(x, s - 11, x + 1, s - 9, o.faro ? H('#fff4b0') : H('#f0e8a0'));
  if (o.faro) for (let i = 1; i < 26; i++) for (let j = -i / 4; j <= i / 4; j++) tinta(x + 1 + i, Math.round(s - 10 + j), H('#fff4c0'), 0.28 * (1 - i / 26));
  if (o.conductor !== false) { R.disco(cx + 18, top + 13, 2, H('#2a2a34')); R.rect(cx + 16, top + 15, cx + 20, top + 16, H('#2a2a34')); }
  // tubo de escape con humo
  R.rect(cx + 4, top - 4, cx + 6, top + 8, K); R.rect(cx + 5, top - 3, cx + 5, top + 7, H('#c0c0c8'));
  for (let k = 0; k < 4; k++) { const u = (t * 1.6 + k / 4) % 1; R.disco(Math.round(cx + 5 - u * 14), Math.round(top - 5 - u * 10), u < 0.5 ? 1 : 2, mez(H('#8a8a90'), H('#d8d8dc'), u)); }
  // ruedas
  for (const wx of [xr + 6, xr + 14, xr + 46, cx + 4, x - 5]) { R.disco(wx, s - 4, 4, K); R.disco(wx, s - 4, 3, H('#2a2a30')); R.disco(wx, s - 4, 1, H('#a8a8b0')); R.pset(wx + (gira ? 2 : -2), s - 4, H('#5a5a64')); }
};
// la hormigonera de calle de perfil hacia la derecha (cabina, tambor de rayas que gira, canaleta)
const hormigonera = (x, s, t, o = {}) => {
  const top = s - 34, cx = x - 22;
  for (let i = x - 78; i <= x + 2; i++) { tinta(i, s + 1, K, 0.35); }
  R.rect(x - 78, s - 10, x, s - 6, K); R.rect(x - 77, s - 9, x - 1, s - 7, H('#5a5a64'));
  // tambor
  const tx = x - 50, ty = s - 22;
  for (let yy = -13; yy <= 13; yy++) for (let xx = -24; xx <= 24; xx++) { const d = (xx * xx) / 600 + (yy * yy) / 182; if (d > 1) continue; const raya = ((xx + yy * 1.4 + Math.floor(t * 24)) % 14 + 14) % 14 < 5;
    R.pset(tx + xx, ty + yy, d > 0.86 ? K : raya ? (yy < -4 ? H('#f0a040') : H('#c86a20')) : (yy < -5 ? H('#f4f0e6') : yy > 6 ? H('#b8b4a8') : H('#dcd8cc'))); }
  R.linea(tx + 22, ty - 6, tx + 30, ty + 8, K); R.linea(tx + 21, ty - 6, tx + 29, ty + 8, H('#8a8a90'));
  // cabina
  R.rect(cx, top + 8, x, s - 6, K); R.rect(cx + 1, top + 9, x - 1, s - 7, H('#d84a3a')); R.rect(cx + 8, top + 11, x - 3, top + 19, K); R.rect(cx + 9, top + 12, x - 4, top + 18, H('#5a8aa8'));
  R.rect(cx + 1, s - 14, x - 1, s - 13, H('#f4e8d0')); R.rect(x - 1, s - 12, x + 1, s - 10, H('#fff4b0'));
  if (o.faro) for (let i = 1; i < 34; i++) for (let j = -i / 4; j <= i / 4; j++) tinta(x + 1 + i, Math.round(s - 11 + j), H('#fff4c0'), 0.3 * (1 - i / 34));
  R.disco(cx + 12, top + 15, 2, H('#2a2a34'));
  for (const wx of [x - 70, x - 60, x - 8]) { R.disco(wx, s - 4, 5, K); R.disco(wx, s - 4, 4, H('#2a2a30')); R.disco(wx, s - 4, 1, H('#b0b0b8')); R.pset(wx + (Math.floor(t * 12) % 2 ? 2 : -2), s - 4, H('#6a6a74')); }
};
'''

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['at-camiones'] = ('Los camiones', '''// AT-CAMIONES (frase 16), septiembre de 1983. Cuatro planos:
// 1. el vertedero de Alamogordo de día: el volquete entra marcha atrás guiado por el operario («trucks»), levanta la
//    caja y a «unloading» las cajas caen a chorro a la fosa con su polvo; el hombre de Atari (traje) apunta en su
//    tablilla y el operario se aparta; gaviotas, nubes y la planta rodadora del decorado; corta en «in Alamogordo»;
// 2. el mapa de papel se acerca del oeste a Nuevo México: cae la chincheta de Alamogordo con la fosa; a «desert»
//    brotan las dunas blancas y los cactus; a «plant» cae la chincheta de El Paso con la fábrica que humea, y a «El Paso»
//    la ruta se dibuja hacia el norte y la recorren los camioncitos (cartel con el 86);
// 3. la carretera del vertedero: camión tras camión hacia la verja; en el arcén de enfrente la fotógrafa del periódico
//    local dispara el flash a «reported» y el reportero cuenta camiones (el número sube con cada uno); corta en «crushed»;
// 4. la fosa de cerca (gag 5): la rueda de púas de la apisonadora entra y aplasta las cajas («crushed»), un cartucho
//    sale disparado, le salen patitas y huye cuesta arriba por el borde; a «concrete» el cemento lo cubre todo.''', COMUN + r'''
const A = (f) => en('camiones', f);
const P2 = A(0.289), P3 = A(0.621), P4 = A(0.846);
const trucks = A(0.135), unload = A(0.187), alamo = A(0.305), desierto = A(0.375), planta = A(0.506), elpaso = A(0.587);
const papers = A(0.668), reported = A(0.697), truck1 = A(0.750), truck2 = A(0.776), crushed = A(0.845), covered = A(0.891), concrete = A(0.960);

// la tablilla con su papel (en la mano: x, y es el puño)
const tablilla = (x, y, d = 1) => { const a = d > 0 ? x + 1 : x - 9; R.rect(a, y - 9, a + 8, y + 2, K); R.rect(a + 1, y - 8, a + 7, y + 1, H('#a8743c')); R.rect(a + 2, y - 7, a + 6, y + 1, H('#f4f0e2')); for (const j of [-5, -3, -1]) R.rect(a + 3, y + j, a + 5, y + j, H('#9a9aa8')); R.rect(a + 3, y - 9, a + 5, y - 8, H('#c8c8d0')); };

// un perro flaco del vertedero que trota (x el hocico, s el suelo)
const perro = (x, s, t, anda) => { const f = anda ? Math.floor(t * 10) % 2 : 0, c = H('#a8783a'), cs = H('#6a4a24');
  for (let i = 0; i < 13; i++) tinta(x - 13 + i, s + 1, K, 0.3);
  R.rect(x - 13, s - 9, x - 3, s - 5, K); R.rect(x - 12, s - 8, x - 4, s - 6, c); R.rect(x - 12, s - 6, x - 4, s - 6, cs);
  R.rect(x - 4, s - 12, x + 1, s - 7, K); R.rect(x - 3, s - 11, x, s - 8, c); R.pset(x + 1, s - 9, K); R.pset(x - 1, s - 10, K); R.pset(x - 3, s - 13, cs); R.pset(x - 4, s - 12, cs);
  const pa = (px, a) => { R.rect(px, s - 5, px, s - 1 + (a ? -1 : 0), cs); R.pset(px + (a ? 1 : -1), s - (a ? 1 : 0), K); };
  pa(x - 11, f); pa(x - 9, 1 - f); pa(x - 6, 1 - f); pa(x - 4, f);
  R.linea(x - 13, s - 8, x - 16, s - 11 - (Math.floor(t * 6) % 2), cs);
};
// ── 1 · el vertedero de día: el volquete descarga ──
const p1 = (t) => {
  const cam = tramo(t, 0.6, 6.0), o = { encuadre: 'vertedero83', camion: cam };
  T.desierto(R, t, o);
  // el polvo de las cajas que caen a la fosa
  if (t > 2.3 && t < 6.0) for (let k = 0; k < 10; k++) { const u = ((t * 0.9 + k / 10) % 1), x = Math.round(206 + (k % 5) * 7 - u * 22 + Math.sin(k + t) * 3), y = Math.round(140 - u * 26); R.disco(x, y, 1 + Math.round(u * 3), mez(H('#c8a878'), H('#efe0c0'), u)); }
  // el operario guía al volquete con la mano y luego se aparta de las cajas
  const ap = tramo(t, 2.5, 3.5), ox = Math.round(lerp(204, 168, ap));
  R.actor(EL.operario, ox, 168, t, { dir: ap > 0 && ap < 1 ? -1 : 1, anda: ap > 0 && ap < 1, dedo: (t > 0.7 && t < 2.4) || (t > unload + 0.2 && t < unload + 1.3), habla: t > 0.9 && t < 2.2 && parp(t, 9), sorpresa: t > unload - 0.1 && t < unload + 0.3 });
  // el hombre de Atari llega con su tablilla y apunta las cajas que caen
  const ll = tramo(t, 0.2, 1.8), ex = Math.round(lerp(60, 112, ll));
  const m = R.actor(EL.ejecutivoAtari2, ex, 168, t, { dir: 1, anda: ll > 0 && ll < 1, sostiene: [ex + 15, 153 - (t > trucks && t < unload + 1.6 && Math.floor(t * 4) % 2 ? 1 : 0)], habla: t > trucks - 0.3 && t < trucks + 0.6 && parp(t, 8), sonrisa: t > unload + 0.8 });
  tablilla(m.mano[0], m.mano[1], 1);
  if (t > trucks && t < unload + 1.6 && Math.floor(t * 4) % 2) { const [hx, hy] = m.mano; R.pset(hx + 5, hy - 4, H('#3a6ad8')); R.pset(hx + 6, hy - 3, H('#3a6ad8')); }
  // un perro del vertedero cruza al trote por delante (y se para a mirar el chorro de cajas)
  const pu = tramo(t, 3.0, 5.6), px = Math.round(lerp(120, 270, pu));
  if (pu > 0) perro(px, 177, t, pu < 1);
  T.desiertoDelante(R, t, o);
};

// ── 2 · el mapa: Alamogordo, el desierto y El Paso ──
const ALA = [-105.96, 32.9], EPA = [-106.49, 31.76], DUNAS = [-106.3, 32.8], SIERRA = [-105.75, 32.95], ORGAN = [-106.6, 32.35], SANAND = [-106.55, 33.0], FRANK = [-106.48, 31.95], GUADA = [-104.9, 32.1];
const fabrica = (x, y, t, s) => {   // la fábrica de El Paso: tejado de dientes de sierra y chimenea que humea
  if (s <= 0) return; const h = Math.round(14 * s);
  R.rect(x - 11, y - h, x + 11, y, K); R.rect(x - 10, y - h + 1, x + 10, y - 1, H('#c8a06a'));
  for (let i = 0; i < 4; i++) R.poligono([[x - 10 + i * 5, y - h + 1], [x - 10 + i * 5, y - h - 4], [x - 6 + i * 5, y - h + 1]], H('#8a5a3a'));
  for (let i = 0; i < 3; i++) R.rect(x - 8 + i * 6, y - 6, x - 5 + i * 6, y - 3, H('#5a6a8a'));
  R.rect(x + 6, y - h - 9, x + 9, y - h, K); R.rect(x + 7, y - h - 8, x + 8, y - h, H('#a85a3a'));
  if (s >= 1) for (let k = 0; k < 4; k++) { const u = (t * 0.7 + k / 4) % 1; R.disco(Math.round(x + 8 + u * 10 + Math.sin(u * 6) * 2), Math.round(y - h - 10 - u * 12), u < 0.4 ? 1 : 2, mez(H('#8a8a90'), H('#e8e4dc'), u)); }
};
const fosaIcono = (x, y, t) => {   // el vertedero: el hoyo con las cajas y un volquete que bascula
  R.poligono([[x - 12, y - 2], [x + 12, y - 2], [x + 8, y + 5], [x - 8, y + 5]], K); R.poligono([[x - 11, y - 1], [x + 11, y - 1], [x + 7, y + 4], [x - 7, y + 4]], H('#6a4a2a'));
  for (let i = 0; i < 5; i++) R.rect(x - 7 + i * 3, y + 1 - (i % 2), x - 6 + i * 3, y + 2, H(['#c8a06a', '#d0383a', '#c8a06a', '#3a6ad8', '#c8a06a'][i]));
  const b = Math.sin(t * 2.4) > 0 ? 3 : 0; R.rect(x + 10, y - 8, x + 17, y - 4, K); R.rect(x + 11, y - 7, x + 16, y - 5, H('#efe2c0'));
  R.poligono([[x + 2, y - 5 - b], [x + 10, y - 7], [x + 10, y - 4], [x + 3, y - 3]], H('#c8461e')); R.disco(x + 12, y - 3, 1, K); R.disco(x + 16, y - 3, 1, K);
};
const camioncito = (x, y) => { R.rect(x - 7, y - 5, x + 6, y + 1, K); R.rect(x - 6, y - 4, x + 1, y, H('#d8dce0')); R.rect(x - 6, y - 2, x + 1, y - 2, H('#e07a2a')); R.rect(x + 2, y - 3, x + 5, y, H('#efe2c0')); R.pset(x + 4, y - 2, H('#6aa8c8')); R.disco(x - 4, y + 2, 1, K); R.disco(x + 3, y + 2, 1, K); };
const p2 = (t) => {
  const u = tramo(t, P2, P2 + 1.1), P = T.mapa(R, t, { desde: 'oeste', zoom: 11, centro: [-106.2, 32.36], u, rosa: [262, 136] });
  R.recorte([7, 7, 312, 172]);
  const [ax, ay] = P(ALA), [ex, ey] = P(EPA);
  // las carreteras (la 10 y la 25 en gris; la 70 de Las Cruces a Alamogordo) y los pueblos pequeños
  for (const L of [[[-107.6, 32.25], [-106.78, 32.32], [-106.49, 31.76], [-105.4, 31.3], [-104.4, 31.1]], [[-106.78, 32.32], [-106.9, 33.1], [-107.0, 34.2]], [[-106.78, 32.32], [-106.4, 32.6], [-105.96, 32.9], [-105.6, 33.4], [-105.3, 34.2]]]) {
    const pts = L.map(P); for (let i = 1; i < pts.length; i++) { R.linea(pts[i - 1][0], pts[i - 1][1] + 1, pts[i][0], pts[i][1] + 1, H('#b8a07a')); R.linea(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], H('#8a7a6a')); } }
  for (const L of [[-106.78, 32.32], [-106.02, 33.07], [-105.66, 32.82], [-107.25, 32.9]]) { const [x, y] = P(L); R.disco(x, y, 2, K); R.disco(x, y, 1, H('#f4ecd8')); }
  // las dunas blancas (White Sands) con sus ondas, que brillan a «desert»
  { const [dx, dy] = P(DUNAS), br = t > desierto && t < desierto + 1.2; for (let yy = -9; yy <= 9; yy++) for (let xx = -16; xx <= 16; xx++) { if ((xx * xx) / 256 + (yy * yy) / 81 > 1) continue; const on = Math.sin(xx * 0.7 + yy * 1.6) > 0.3;
    R.pset(dx + xx, dy + yy, on ? (br && ru(xx, yy + Math.floor(t * 6)) > 0.8 ? H('#fff8c0') : H('#f6f2ea')) : H('#e2dccc')); } }
  // las dunas blancas y la sierra brotan a «desert»
  const d = tramo(t, desierto - 0.2, desierto + 0.5);
  if (d > 0 && false) { const [dx, dy] = P(DUNAS); for (let k = 0; k < 40; k++) { const a = k * 2.4, rr = Math.sqrt(k) * 3.2 * d; const x = Math.round(dx + Math.cos(a) * rr * 1.4), y = Math.round(dy + Math.sin(a) * rr); R.pset(x, y, BL); R.pset(x + 1, y, H('#e8e4dc')); if (k % 3 === 0) R.pset(x, y + 1, H('#c8c0b0')); } }
  for (const [L, n] of [[SIERRA, 6], [ORGAN, 3], [SANAND, 4], [FRANK, 2], [GUADA, 4]]) { const [sx, sy] = P(L); for (let k = 0; k < n; k++) { const s2 = Math.max(0.5, ease(cl(d * 1.4 - k * 0.12, 0, 1))); const x = Math.round(sx + k * 8 - (n * 8) / 2), y = sy + (k % 2) * 4, h = Math.round(9 * s2);
    R.poligono([[x - 5, y], [x, y - h], [x + 5, y]], H('#6a5a4a')); R.poligono([[x, y - h], [x + 5, y], [x + 1, y]], H('#4a3a2a')); if (h > 5) R.pset(x, y - h + 1, H('#3a6a3a')); } }
  // cactus que brotan por el desierto
  for (const [lx, ly, k] of [[-107.3, 33.6, 0], [-104.8, 32.2, 1], [-107.6, 32.0, 2], [-105.2, 33.9, 3], [-104.6, 31.4, 4]]) { const s2 = tramo(t, desierto + k * 0.12, desierto + k * 0.12 + 0.3); if (s2 <= 0) continue; const [cx, cy] = P([lx, ly]), h = Math.round(8 * s2);
    R.rect(cx - 1, cy - h, cx + 1, cy, H('#2a6a3a')); R.pset(cx, cy - h, H('#5aa85a')); if (h > 5) { R.rect(cx - 4, cy - 5, cx - 2, cy - 4, H('#2a6a3a')); R.rect(cx - 4, cy - 7, cx - 3, cy - 5, H('#2a6a3a')); R.rect(cx + 2, cy - 4, cx + 4, cy - 3, H('#2a6a3a')); R.rect(cx + 3, cy - 6, cx + 4, cy - 4, H('#2a6a3a')); } }
  // la ruta de El Paso a Alamogordo (la 54, hacia el norte) y los camioncitos que la recorren
  const ruta = [[ex, ey], [ex + 6, ey - 14], [ex + 14, ey - 30], [ax - 2, ay + 18], [ax, ay + 4]];
  const r = tramo(t, planta + 0.5, elpaso + 0.25);
  if (r > 0) R.ruta(ruta, r, H('#c8302a'));
  if (r >= 1) for (let k = 0; k < 3; k++) { const v = ((t - elpaso - 0.25) * 0.55 + k / 3) % 1; let L = 0; const seg = []; for (let i = 1; i < ruta.length; i++) { const l = Math.hypot(ruta[i][0] - ruta[i - 1][0], ruta[i][1] - ruta[i - 1][1]); seg.push(l); L += l; }
    let q = v * L, i = 0; while (i < seg.length - 1 && q > seg[i]) { q -= seg[i]; i++; } const f = q / seg[i]; camioncito(Math.round(lerp(ruta[i][0], ruta[i + 1][0], f)), Math.round(lerp(ruta[i][1], ruta[i + 1][1], f)), 1); }
  if (r > 0.6) { const mx = Math.round((ex + ax) / 2) + 22, my = Math.round((ey + ay) / 2); R.rect(mx - 9, my - 6, mx + 9, my + 5, K); R.rect(mx - 8, my - 5, mx + 8, my + 4, H('#2a7a4a')); R.rect(mx - 8, my - 5, mx + 8, my - 5, H('#4a9a6a')); R.numero('86', mx + 1, my + 3, { centro: true, color: BL, sombra: false }); R.linea(mx - 9, my, mx - 16, my, H('#2a7a4a')); }
  // los sitios: la fosa en Alamogordo y la fábrica en El Paso, con sus chinchetas
  const s1 = tramo(t, alamo - 0.1, alamo + 0.4), s2 = tramo(t, planta - 0.1, planta + 0.5);
  if (s1 > 0.6) fosaIcono(ax + 22, ay + 4, t);
  fabrica(ex - 22, ey + 4, t, ease(s2));
  R.recorte(null);
  T.chincheta(R, ax, ay, t, H('#d82a2a'), { baja: s1 });
  T.chincheta(R, ex, ey, t, H('#2a6ad8'), { baja: s2 });
};

// ── 3 · la carretera del vertedero: camión tras camión, y el periódico local que lo cuenta ──
const S3 = 148, ARCEN = 122;
const carretera = fijo(() => {
  cieloT(0, 74, [H('#3a7ac8'), H('#5a9ae0'), H('#8ac0ec'), H('#c8e0f0'), H('#f0e6cc')]);
  // la sierra en dos términos: la lejana azulada y la cercana con pinos
  for (let x = 0; x < 320; x++) { const h1 = 52 + Math.round(Math.sin(x * 0.031) * 7 + Math.sin(x * 0.083 + 1) * 4 + Math.sin(x * 0.21) * 1.5); for (let y = h1; y <= 80; y++) R.pset(x, y, tono([H('#9a9ac8'), H('#8a86b8'), H('#7a76a8')], (y - h1) / 9 + ru(x, y) * 0.4, x, y));
    const h2 = 64 + Math.round(Math.sin(x * 0.045 + 2) * 6 + Math.sin(x * 0.12) * 2); for (let y = h2; y <= 82; y++) R.pset(x, y, tono([H('#7a6a8a'), H('#6a5a74'), H('#5a4a62')], (y - h2) / 7 + ru(x, y, 1) * 0.5, x, y)); if (ru(x, h2, 2) > 0.8) { R.pset(x, h2 - 1, H('#3a4a3a')); R.pset(x, h2 - 2, H('#3a4a3a')); } }
  // la llanura con matorral y la carretera del horizonte
  for (let y = 80; y <= 180; y++) for (let x = 0; x < 320; x++) { const v = (y - 80) / 100 * 2 + ru(x, y, 4) * 0.9; R.pset(x, y, tono([H('#e8cc98'), H('#d8b47a'), H('#c8a068'), H('#b08a58')], v, x, y)); }
  for (let k = 0; k < 160; k++) { const x = Math.floor(ru(k, 1, 5) * 320), y = 84 + Math.floor(ru(k, 2, 5) * 36), r = y < 100 ? 1 : 2; R.disco(x, y, r, H('#6a7a3a')); R.pset(x - 1, y - 1, H('#8a9a4a')); R.pset(x + 1, y + r, H('#a8844a')); }
  // yucas y una mesa de roca a lo lejos
  for (const [x, y] of [[150, 104], [196, 98], [232, 108], [12, 102], [300, 112]]) { R.rect(x, y - 8, x, y, H('#6a5a3a')); for (let a = -3; a <= 3; a++) R.linea(x, y - 8, x + a * 2, y - 12 - Math.abs(a) % 2, a % 2 ? H('#5a7a3a') : H('#7a9a4a')); }
  for (let x = 178; x < 226; x++) { const h = 84 - (x < 186 ? (x - 178) : x > 218 ? (226 - x) : 8); for (let y = h; y < 86; y++) R.pset(x, y, y === h ? H('#c89a6a') : H('#a8785a')); }
  // los postes de la luz con el cable que cae
  for (let i = 0; i < 6; i++) { const x = 20 + i * 62, y0 = 70 + i, y1 = 106; R.rect(x, y0, x + 1, y1, H('#5a3a24')); R.rect(x - 4, y0 + 2, x + 5, y0 + 2, H('#5a3a24')); if (i < 5) for (let s = 0; s <= 62; s++) R.pset(x + s, Math.round(y0 + 3 + Math.sin(s / 62 * Math.PI) * 5), H('#3a3a44')); }
  // el arcén de enfrente (donde está la prensa) y la carretera
  for (let x = 0; x < 320; x++) for (let y = 116; y <= ARCEN + 4; y++) R.pset(x, y, tono([H('#d8b47a'), H('#c09a64')], ru(x, y, 6) * 1.6, x, y));
  for (let y = 126; y <= 152; y++) for (let x = 0; x < 320; x++) { const borde = y === 126 || y === 152; R.pset(x, y, borde ? H('#3a3a40') : tono([H('#5a5a62'), H('#4a4a52'), H('#3e3e46')], ru(x, y, 7) * 1.8 + (y - 126) / 26, x, y)); }
  for (let x = 0; x < 320; x++) { R.pset(x, 128, H('#e8e4d4')); R.pset(x, 150, H('#e8e4d4')); if (x % 18 < 10) { R.pset(x, 138, H('#e8c040')); R.pset(x, 139, H('#e8c040')); } }
  for (let k = 0; k < 12; k++) { const x = Math.floor(ru(k, 3, 8) * 300), y = 130 + Math.floor(ru(k, 4, 8) * 18); R.linea(x, y, x + 5, y + 1, H('#2e2e34')); R.pset(x + 2, y + 1, H('#2e2e34')); }
  for (let k = 0; k < 4; k++) { const x = 20 + k * 80 + Math.floor(ru(k, 5, 8) * 20); R.rect(x, 141, x + 14, 146, H('#55555e')); }
  // el arcén de delante: arena, piedras, matas, balizas
  for (let y = 153; y <= 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono([H('#e0c08a'), H('#d0aa72'), H('#b8915c'), H('#9a764a')], (y - 153) / 27 * 1.6 + ru(x, y, 9) * 1.1, x, y));
  for (let k = 0; k < 26; k++) { const x = Math.floor(ru(k, 6, 9) * 320), y = 158 + Math.floor(ru(k, 7, 9) * 20); R.disco(x, y, 1 + (k % 2), H('#8a7a6a')); R.pset(x - 1, y - 1, H('#c8b8a0')); }
  for (let k = 0; k < 6; k++) { const x = 30 + k * 52, y = 166 + (k % 3) * 4; R.disco(x, y, 4, H('#5a6a2a')); R.disco(x - 1, y - 1, 3, H('#7a8a3a')); R.pset(x - 2, y - 3, H('#9aa84a')); }
  for (const x of [8, 112, 216]) { R.rect(x, 152, x + 2, 168, K); R.rect(x + 1, 153, x + 1, 167, BL); R.rect(x, 155, x + 2, 157, H('#e8803a')); }
});
// la verja del vertedero a la derecha (las cajas se ven tras la tela metálica)
const verja = (t) => {
  for (let y = 92; y <= 124; y++) for (let x = 262; x < 320; x++) if ((x + y) % 5 === 0 || (x - y + 400) % 5 === 0) tinta(x, y, H('#6a6a74'), 0.6);
  for (const x of [262, 290, 318]) { R.rect(x - 1, 88, x + 1, 125, K); R.rect(x, 89, x, 124, H('#a8a8b0')); }
  R.linea(262, 90, 319, 90, H('#4a4a52'));
  for (let x = 262; x < 320; x += 3) R.pset(x, 88 + (x % 2), H('#4a4a52'));
  // el cartel sin letras: un camión que vuelca
  R.rect(232, 96, 254, 112, K); R.rect(233, 97, 253, 111, H('#f4ecd8')); R.rect(236, 103, 246, 107, H('#c8461e')); R.rect(246, 101, 251, 107, H('#3a3a44')); R.disco(238, 108, 1, K); R.disco(249, 108, 1, K); R.rect(243, 112, 244, 124, H('#5a3a24'));
};
const p3 = (t) => {
  carretera();
  nubes(t, [[20, 18, 36, 3], [170, 28, 26, 5], [260, 12, 44, 2], [100, 40, 18, 7]]);
  pajaros(t, 3, 30, 11);
  verja(t);
  // el molino de viento del rancho, que gira
  { const mx = 214, my = 66; R.linea(mx - 6, 114, mx, my, H('#5a5a64')); R.linea(mx + 6, 114, mx, my, H('#5a5a64')); R.linea(mx - 4, 100, mx + 4, 100, H('#5a5a64')); R.linea(mx - 2, 86, mx + 2, 86, H('#5a5a64'));
    for (let k = 0; k < 8; k++) { const a = t * 3 + k * Math.PI / 4; R.linea(mx, my, Math.round(mx + Math.cos(a) * 9), Math.round(my + Math.sin(a) * 9), k % 2 ? H('#c8c8d0') : H('#8a8a94')); }
    R.disco(mx, my, 1, K); R.rect(mx + 1, my - 1, mx + 9, my, H('#6a6a74')); R.poligono([[mx + 9, my - 4], [mx + 13, my - 4], [mx + 13, my + 3], [mx + 9, my + 1]], H('#c8302a')); }
  // el coche del periódico aparcado en el arcén de enfrente, con la puerta abierta
  { const cx = 16, cy = ARCEN; R.rect(cx, cy - 12, cx + 40, cy - 3, K); R.rect(cx + 1, cy - 11, cx + 39, cy - 4, H('#3a6a9a')); R.rect(cx + 8, cy - 17, cx + 30, cy - 11, K); R.rect(cx + 9, cy - 16, cx + 29, cy - 12, H('#9ac8e0')); R.rect(cx + 19, cy - 16, cx + 20, cy - 12, H('#3a6a9a'));
    R.rect(cx + 1, cy - 7, cx + 39, cy - 7, H('#c8d8e8')); R.rect(cx + 39, cy - 9, cx + 40, cy - 7, H('#fff0a0')); for (const wx of [cx + 9, cx + 31]) { R.disco(wx, cy - 2, 3, K); R.disco(wx, cy - 2, 1, H('#a8a8b0')); }
    R.rect(cx + 41, cy - 12, cx + 43, cy - 4, K); R.rect(cx + 42, cy - 11, cx + 42, cy - 5, H('#3a6a9a')); }
  // la fotógrafa del periódico local dispara el flash a «reported»; el reportero cuenta los camiones
  const fl = (t > reported && t < reported + 0.25) || (t > truck2 + 0.1 && t < truck2 + 0.3);
  const mf = R.actor(EL.espectadora, 72, ARCEN, t, { dir: 1, sostiene: [86, ARCEN - 15], sonrisa: t > reported + 0.4 });
  const [fx, fy] = mf.mano; R.rect(fx - 1, fy - 6, fx + 7, fy, K); R.rect(fx, fy - 5, fx + 6, fy - 1, H('#3a3a44')); R.disco(fx + 4, fy - 3, 1, H('#8ab8e8')); R.rect(fx + 1, fy - 8, fx + 3, fy - 6, K); R.rect(fx + 2, fy - 7, fx + 2, fy - 7, BL);
  if (fl) { for (let a = 0; a < 8; a++) R.linea(fx + 2, fy - 8, Math.round(fx + 2 + Math.cos(a * 0.785) * 9), Math.round(fy - 8 + Math.sin(a * 0.785) * 9), H('#fff8c0')); R.disco(fx + 2, fy - 8, 3, BL); }
  const cuenta = 6 + (t > truck1 ? 1 : 0) + (t > truck2 ? 1 : 0) + (t > truck2 + 0.9 ? 1 : 0);
  const mr = R.actor(EL.camionero2, 104, ARCEN, t, { dir: 1, sostiene: [116, ARCEN - 13], habla: parp(t, 6) && t > papers && t < reported, sorpresa: t > truck2 && t < truck2 + 0.4 });
  { const [hx, hy] = mr.mano; R.rect(hx, hy - 8, hx + 6, hy, K); R.rect(hx + 1, hy - 7, hx + 5, hy - 1, H('#f4f0e2')); for (let j = 0; j < 3; j++) R.rect(hx + 2, hy - 6 + j * 2, hx + 4, hy - 6 + j * 2, H('#5a5a6a')); }
  // el número de camiones contados, en su bocadillo
  if (t > papers) { const bx = 122, by = 82; R.rect(bx - 12, by - 10, bx + 12, by + 3, K); R.rect(bx - 11, by - 9, bx + 11, by + 2, BL); R.poligono([[bx - 8, by + 3], [bx - 2, by + 3], [bx - 9, by + 9]], K); R.poligono([[bx - 7, by + 2], [bx - 3, by + 2], [bx - 8, by + 7]], BL); R.numero(String(cuenta), bx + 1, by, { centro: true, color: H('#c8302a'), sombra: false }); }
  // camión tras camión hacia la verja (por delante de la prensa)
  for (let k = 0; k < 3; k++) { const x = Math.round(-60 - k * 128 + (t - P3 + 1.6) * 92); if (x > -30 && x < 420) camionCarga(x, S3, t, { remolque: ['#c8ccd0', '#d8d0bc', '#bcc4cc'][k], franja: ['#e07a2a', '#c8302a', '#3a6ad8'][k] }); }
  // el polvo que levantan
  for (let k = 0; k < 8; k++) { const u = (t * 1.3 + k / 8) % 1; R.disco(Math.round(((k * 47 + t * 60) % 340) - 10), Math.round(150 - u * 8), 1 + Math.round(u * 2), mez(H('#c8a878'), H('#efe0c0'), u)); }
  // una planta rodadora que cruza el arcén de delante
  const rx = Math.round(((t - P3) * 38) % 360) - 20, rb = Math.round(Math.abs(Math.sin(t * 5)) * 3);
  R.disco(rx, 168 - rb, 5, H('#8a6a3a')); R.disco(rx, 168 - rb, 4, H('#b8915c')); for (let a = 0; a < 6; a++) R.pset(Math.round(rx + Math.cos(a + t * 6) * 3), Math.round(168 - rb + Math.sin(a + t * 6) * 3), H('#5a3a24'));
};

// ── 4 · gag 5: la apisonadora aplasta y un cartucho se escapa; luego el cemento ──
const salta = P4 + 0.42, aterriza = salta + 0.5, huye = aterriza + 0.25, fuera = huye + 1.3;
const rueda = (cx, cy, r, t) => {
  for (let y = -r - 4; y <= r + 4; y++) for (let x = -r - 4; x <= r + 4; x++) { const d = Math.hypot(x, y); if (d > r + 0.5) continue; R.pset(cx + x, cy + y, d > r - 1 ? K : d > r - 5 ? tono([H('#d8d4cc'), H('#a8a4a0'), H('#6a6a70')], 1 + (x + y) / r, cx + x, cy + y) : d > r * 0.45 ? tono([H('#f0c040'), H('#d8a020'), H('#a87810')], 1 + (x + y) / r * 0.9, cx + x, cy + y) : d > r * 0.45 - 1.5 ? K : H('#5a5a64')); }
  const ang = -cx / r;
  for (let k = 0; k < 12; k++) { const a = ang + k * Math.PI / 6, c = Math.cos(a), s = Math.sin(a); R.poligono([[cx + c * (r - 1) - s * 3, cy + s * (r - 1) + c * 3], [cx + c * (r + 5), cy + s * (r + 5)], [cx + c * (r - 1) + s * 3, cy + s * (r - 1) - c * 3]], K); R.linea(Math.round(cx + c * r), Math.round(cy + s * r), Math.round(cx + c * (r + 3)), Math.round(cy + s * (r + 3)), H('#c8c8d0')); }
  for (let k = 0; k < 6; k++) { const a = ang + k * Math.PI / 3; R.disco(Math.round(cx + Math.cos(a) * r * 0.3), Math.round(cy + Math.sin(a) * r * 0.3), 1, H('#2a2a30')); }
  R.disco(cx, cy, 4, K); R.disco(cx, cy, 3, H('#8a8a94')); R.pset(cx - 1, cy - 1, BL);
};
const p4 = (t) => {
  const ce = tramo(t, covered - 0.1, A(1.0) + 2.2);
  T.desierto(R, t, { encuadre: 'vertedero83', camara: 'cemento', cemento: ce });
  // la rueda delantera de la apisonadora entra por la derecha, aplasta y se queda
  const w = ease(tramo(t, P4 - 0.15, P4 + 0.45)), cx = Math.round(lerp(352, 238, w)), cy = 136, r = 38;
  // lo que deja aplastado detrás
  for (let x = cx + 10; x < 320; x += 2) for (let y = 168; y <= 178; y++) if (ru(x, y, 11) > 0.55) R.pset(x, y, tono([H('#8a6a3a'), H('#6a4a24')], ru(x, y, 12) * 2, x, y));
  // el bastidor que sale hacia la derecha (por debajo de la zona de Atom)
  R.rect(cx, cy - 8, 330, cy - 2, K); R.rect(cx, cy - 7, 330, cy - 3, H('#e0b028')); R.rect(cx, cy - 7, 330, cy - 7, H('#f8d860')); for (let x = cx + 8; x < 330; x += 10) R.pset(x, cy - 5, H('#7a5a10'));
  rueda(cx, cy, r, t);
  for (let k = 0; k < 6; k++) { const u = (t * 2 + k / 6) % 1; if (w > 0 && w < 1) R.disco(Math.round(cx - r + 4 - u * 18), Math.round(cy + r - 2 - u * 10), 1 + Math.round(u * 2), mez(H('#a8885a'), H('#e8d8b8'), u)); }
  // el cartucho: aplastado un instante, salta, le salen patitas y huye cuesta arriba
  const c0 = [216, 168], c1 = [178, 128], c2 = [204, 50];
  let x, y, sq = 0, pat = false;
  if (t < salta) { x = c0[0]; y = c0[1]; sq = t > salta - 0.25 ? 1 : 0; }
  else if (t < aterriza) { const u = (t - salta) / (aterriza - salta); x = lerp(c0[0], c1[0], u); y = lerp(c0[1], c1[1], u) - Math.sin(u * Math.PI) * 30; }
  else if (t < huye) { x = c1[0]; y = c1[1]; }
  else { const u = tramo(t, huye, fuera); x = lerp(c1[0], c2[0], u); y = lerp(c1[1], c2[1], u) - Math.abs(Math.sin(t * 14)) * 2; pat = true; }
  if (t < fuera + 0.4) {
    x = Math.round(x); y = Math.round(y);
    if (y > 52 || t < fuera) {
      R.recorte([0, 52, 319, 179]);
      if (pat) { const f = Math.floor(t * 12) % 2; y -= 6;
        for (const [dx, a] of [[-5, f], [4, 1 - f]]) { const px = x + dx, qx = px + (a ? 3 : -3); R.linea(px, y - 1, qx, y + 6, K); R.linea(px + 1, y - 1, qx + 1, y + 6, K); R.rect(qx - 1, y + 5, qx + 3, y + 7, K); R.rect(qx, y + 5, qx + 2, y + 6, H('#e8e4dc')); }
        for (const [dx, a] of [[-13, f], [13, 1 - f]]) { const bx = x + dx, by = y - 16 - (a ? 5 : 0); R.linea(x + Math.sign(dx) * 11, y - 12, bx, by, K); R.linea(x + Math.sign(dx) * 11, y - 11, bx, by + 1, K); R.disco(bx, by, 2, BL); R.pset(bx, by, K); } }
      if (sq) { R.rect(x - 13, y - 14, x + 13, y, K); R.rect(x - 12, y - 13, x + 12, y - 1, H('#d0383a')); R.rect(x - 7, y - 10, x + 7, y - 4, H('#1a2440')); }
      else PZ.cartucho(R, x, y, { color: 'rojo', icono: 'foso', s: 2 });
      R.recorte(null);
      if (pat && Math.floor(t * 3) % 2) { R.disco(x + 17, y - 30, 2, H('#8ad0f0')); R.pset(x + 17, y - 33, H('#8ad0f0')); R.pset(x + 16, y - 31, BL); }
    }
  }
  if (t > salta && t < salta + 0.6) R.bocadillo(c0[0] - 30, 112, { icono: '!' });
  if (t > fuera - 0.1 && t < fuera + 0.5) { const u = tramo(t, fuera - 0.1, fuera + 0.5); for (let k = 0; k < 6; k++) R.disco(Math.round(c2[0] + Math.cos(k) * u * 12), Math.round(c2[1] - 6 + Math.sin(k) * u * 5), Math.max(1, Math.round(3 - u * 2)), mez(H('#c8a878'), H('#efe0c0'), u)); }
};

const efectos = [[0.7, 'motor'], [1.0, 'silbato'], [2.4, 'avalancha'], [unload + 0.6, 'golpecito'],
  [alamo + 0.3, 'golpecito'], [desierto + 0.1, 'pop'], [planta + 0.4, 'golpecito'], [planta + 0.55, 'lapiz'],
  [P3 + 0.1, 'motor'], [reported, 'flash'], [truck2 + 0.15, 'flash'],
  [P4 + 0.05, 'motor'], [crushed + 0.08, 'chof'], [salta, 'boing'], [huye + 0.1, 'whoosh'], [fuera, 'pop'], [covered + 0.6, 'burbujas']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1983 });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['at-nyt'] = ('No era un secreto', '''// AT-NYT (frase 17), 1983 y los años siguientes. Tres planos:
// 1. la imprenta: el impresor pulsa el panel de la rotativa; el repartidor entra, coge un fajo de la mesa y se va; a
//    «ran a short piece» el periódico sale de la máquina y se posa delante (la foto del vertedero); el impresor se
//    acerca, lo señala a «Atari parts» y a «dumped» se lleva la sorpresa («!»); corta en «and local kids»;
// 2. el pueblo de noche: la chica vigila con la linterna; el chico y el pequeño llegan de puntillas y a «snuck in»
//    saltan el muro hacia el vertedero (el gato maúlla); a «rescue cartridges» el chico asoma con un cartucho en alto y
//    salta de vuelta, el pequeño trae dos; a «before the concrete came» llega la hormigonera con los faros y huyen;
// 3. el dormitorio: el chico entra con la caja de zapatos y a «kept them at home» la mete bajo la cama, pide silencio
//    y se va; a «for years» pasan los años: la ventana pasa del día a la noche, el reloj corre, las hojas del
//    calendario vuelan (1983 → 1990), la caja coge polvo y una araña teje su tela.''', COMUN + r'''
const A = (f) => en('periodico', f);
const P2 = A(0.485), P3 = A(0.845);
const times = A(0.133), ran = A(0.165), piece = A(0.231), atari = A(0.283), dumped = A(0.384);
const kids = A(0.514), snuck = A(0.551), rescue = A(0.648), concrete = A(0.759), algunos = A(0.860), kept = A(0.889), years = A(0.957);

// el fajo de periódicos atado con cuerda (en la mano)
const fajo = (x, y) => { R.rect(x - 7, y - 8, x + 7, y + 1, K); for (let j = 0; j < 4; j++) R.rect(x - 6, y - 7 + j * 2, x + 6, y - 6 + j * 2, j % 2 ? H('#d8d4c8') : H('#f0ece0')); R.rect(x - 1, y - 8, x, y + 1, H('#a8743c')); R.rect(x - 6, y - 4, x + 6, y - 4, H('#a8743c')); };

// ── 1 · la imprenta: sale el periódico con la foto del vertedero ──
const p1 = (t) => {
  const o = { encuadre: 'pueblo', camara: 'imprenta', sale: tramo(t, ran, piece + 0.6) };
  T.desierto(R, t, o);
  // el repartidor entra, coge un fajo de la mesa y se lo lleva
  const e1 = tramo(t, 0.2, 1.3), e2 = tramo(t, 2.3, 4.2), rx = Math.round(e2 > 0 ? lerp(258, 336, e2) : lerp(336, 258, e1)), lleva = t > 1.6;
  const mr = R.actor(EL.camionero, rx, 162, t, { dir: e2 > 0 ? 1 : -1, anda: (e1 > 0 && e1 < 1) || (e2 > 0 && e2 < 1), sostiene: t > 1.4 ? [rx + (e2 > 0 ? 12 : 2), 142] : false, sonrisa: lleva });
  if (lleva) fajo(mr.mano[0], mr.mano[1]);
  // el impresor: pulsa el panel, mira cómo sale el periódico, se acerca y lo señala; a «dumped», la sorpresa
  const va = tramo(t, piece + 0.3, atari + 0.1), ix = Math.round(lerp(96, 128, va));
  R.actor(EL.dependiente, ix, 162, t, { dir: t < ran - 0.3 ? -1 : 1, anda: va > 0 && va < 1, dedo: (t > 0.4 && t < 1.9) || (t > atari && t < A(0.47)), habla: t > atari && t < dumped && parp(t, 8), sorpresa: t > dumped && t < dumped + 0.9, sonrisa: t > dumped + 1.2 });
  if (t > dumped && t < dumped + 0.7) R.bocadillo(ix + 8, 126, { icono: '!' });
  // la luz del panel parpadea cuando lo pulsa
  if (t > 0.4 && t < 1.9 && parp(t, 12)) { R.pset(98, 44, H('#ff4a3a')); R.pset(104, 44, H('#5aff5a')); }
};

// ── 2 · el pueblo de noche: los chicos saltan al vertedero y vuelven con cartuchos ──
const MURO = 127;
// un chico que salta el muro (x0 → x1) entre ta y tb; antes anda hasta x0; después, detrás del muro (recortado)
const salto = (def, t, tLlega, x00, x0, ta, tb, tVuelve, conCartucho, n) => {
  let x, s = 148, sal = 0, detras = false, op = { dir: 1 };
  if (t < ta) { const u = tramo(t, tLlega, ta - 0.1); x = lerp(x00, x0, u); op.anda = u > 0 && u < 1; }
  else if (t < tb) { const u = (t - ta) / (tb - ta); x = lerp(x0, x0 + 18, u); sal = Math.round(Math.sin(u * Math.PI) * 18); s = 148 + Math.round(Math.max(0, u - 0.5) * 2 * 26); detras = u > 0.5; }
  else if (t < tVuelve) { x = x0 + 18; s = 174; detras = true; }
  else if (t < tVuelve + 0.45) { const u = (t - tVuelve) / 0.45; x = x0 + 18; s = Math.round(lerp(174, 150, ease(u))); detras = true; op.sostiene = [Math.round(x + 9), s - 30]; op.sonrisa = true; }
  else if (t < tVuelve + 0.95) { const u = (t - tVuelve - 0.45) / 0.5; x = lerp(x0 + 18, x0 - 12, u); sal = Math.round(Math.sin(u * Math.PI) * 16); s = 148; op.dir = -1; detras = u < 0.5; op.sostiene = [Math.round(x + 2), 148 - 34 - sal]; op.sonrisa = true; }
  else { const huida = tramo(t, concrete + 0.3, concrete + 1.3); x = lerp(x0 - 12, x0 - 12 - 150, huida); op.dir = -1; op.anda = huida > 0 && huida < 1; op.sorpresa = t > concrete && t < concrete + 0.8; op.sostiene = [Math.round(x + 1), 120]; }
  x = Math.round(x); op.salto = sal;
  if (detras) R.recorte([0, 0, 319, MURO]);
  const m = R.actor(def, x, s, t, op);
  if (op.sostiene && m.mano && !(detras && m.mano[1] + 4 > MURO)) for (let k = 0; k < n; k++) { PZ.cartucho(R, m.mano[0] + k * 5 - (n - 1) * 2, m.mano[1] + 4 - k, { color: ['rojo', 'azul'][k], icono: ['foso', 'nave'][k] }); if (t > tVuelve && t < tVuelve + 0.8 && Math.floor(t * 8) % 2) { R.pset(m.mano[0] + 8, m.mano[1] - 14, BL); R.pset(m.mano[0] + 7, m.mano[1] - 15, H('#fff0a0')); R.pset(m.mano[0] + 9, m.mano[1] - 15, H('#fff0a0')); } }
  R.recorte(null);
};
// el haz de la linterna (luz que se suma a lo que hay)
const haz = (x, y, x1, y1, ab) => { const n = Math.ceil(Math.hypot(x1 - x, y1 - y)); for (let i = 2; i < n; i++) { const u = i / n, cx = lerp(x, x1, u), cy = lerp(y, y1, u), w = ab * u; for (let j = -w; j <= w; j++) tinta(Math.round(cx), Math.round(cy + j), H('#fff4b0'), 0.32 * (1 - u * 0.6)); } };
const p2 = (t) => {
  const o = { encuadre: 'pueblo' };
  T.desierto(R, t, o);
  // la chica vigila con la linterna y les hace señas
  const cu = tramo(t, P2, P2 + 0.9), cx = Math.round(lerp(-16, 112, cu));
  R.actor(EL.chicaPueblo, cx, 148, t, { dir: t > concrete + 0.1 ? -1 : 1, anda: cu > 0 && cu < 1, dedo: t > snuck + 0.2 && t < rescue - 0.2, sonrisa: t > rescue && t < concrete, sorpresa: t > concrete && t < concrete + 0.9 });
  if (cu >= 1 && t < concrete + 0.1) haz(cx + 16, 133, 168, 112 + Math.round(Math.sin(t * 2.2) * 8), 7);
  salto(EL.chicoPueblo, t, P2, -30, 150, snuck, snuck + 0.55, rescue - 0.1, true, 1);
  salto(EL.nino77, t, P2 + 0.2, -44, 142, snuck + 0.45, snuck + 1.0, rescue + 0.35, true, 2);
  // la hormigonera llega por la calle con los faros encendidos (por delante de los chicos)
  const hu = tramo(t, concrete - 0.45, P3 + 0.4); if (hu > 0 && hu < 1) hormigonera(Math.round(lerp(-10, 420, hu)), 178, t, { faro: true });
};

// ── 3 · el dormitorio: la caja de cartuchos bajo la cama, y pasan los años ──
const pasan = kept + 0.55, hasta = P3 + 4.0;
const anio = (t) => (t < pasan ? 1983 : 1983 + Math.min(7, Math.floor(8 * tramo(t, pasan, hasta))));
const dormitorio = fijo(() => {
  // pared: papel pintado de rayas mostaza con rombos (tranquilo arriba a la derecha)
  for (let y = 0; y <= 128; y++) for (let x = 0; x < 320; x++) { const r = (x % 16) < 7, calma = x > 266 && y < 52;
    let c = r ? H('#e8c27a') : H('#dcae62'); if (!calma && (x % 16) === 11 && (y % 18) > 6 && (y % 18) < 12 && Math.abs((y % 18) - 9) + Math.abs((x % 16) - 11) < 3) c = H('#b8743a'); if (!calma && (x % 16) === 7) c = H('#c89850');
    R.pset(x, y, tono([c, mez(c, K, 0.12)], ru(x, y, 20) * 0.9 + y / 260, x, y)); }
  for (let x = 0; x < 320; x++) { R.pset(x, 0, H('#8a5a2a')); R.pset(x, 1, H('#a8743c')); }
  // el zócalo y el suelo de tablas
  R.rect(0, 122, 319, 128, H('#6a3a1a')); R.rect(0, 122, 319, 122, H('#9a6a3a'));
  madera(0, 129, 319, 179, [H('#b07a44'), H('#a06a38'), H('#8a5a2e'), H('#6a4020')], 7, 1);
  // la alfombra trenzada
  for (let y = -12; y <= 12; y++) for (let x = -48; x <= 48; x++) { const d = (x * x) / 2304 + (y * y) / 144; if (d > 1) continue; const anillo = Math.floor(Math.sqrt(d) * 5);
    R.pset(104 + x, 164 + y, [H('#c8463a'), H('#3a6a9a'), H('#e8b040'), H('#3a8a5a'), H('#7a3a2a')][anillo] ); if ((x + y) % 4 === 0) tinta(104 + x, 164 + y, K, 0.15); }
  // la puerta (a la izquierda) con su marco
  R.rect(4, 40, 40, 128, H('#5a3218')); R.rect(7, 43, 37, 128, H('#a8743c')); for (const [y0, y1] of [[48, 80], [86, 122]]) { R.rect(11, y0, 33, y1, H('#8a5a2a')); R.rect(12, y0 + 1, 32, y1 - 1, H('#b8844a')); }
  R.disco(33, 86, 2, H('#e8c040')); R.pset(32, 85, BL);
  // la ventana (el cielo se pinta en cada fotograma) y las cortinas de cuadros
  R.rect(56, 24, 112, 84, H('#f4ecd8')); R.rect(54, 84, 114, 88, H('#e8dcc0'));
  // la mesa con la tele y la consola, la lámpara
  R.rect(116, 104, 176, 108, H('#6a3a1a')); R.rect(117, 104, 175, 105, H('#9a6a3a')); R.rect(118, 109, 121, 146, H('#5a3218')); R.rect(171, 109, 174, 146, H('#5a3218')); R.rect(122, 109, 170, 118, H('#8a5a2a')); R.rect(144, 111, 148, 112, H('#e8c040'));
  PZ.teleCRT(R, 136, 104, { encendida: false }); PZ.consolaVieja(R, 162, 104, {}); PZ.cajaCartucho(R, 124, 104, { color: 'verde', icono: 'nave' });
  // la cama de la derecha: cabecero, colcha de retales, almohada
  R.rect(292, 70, 310, 152, H('#5a3218')); R.rect(294, 72, 308, 150, H('#8a5a2a')); for (let y = 76; y < 150; y += 8) R.rect(296, y, 306, y + 4, H('#a06a38'));
  R.rect(186, 128, 296, 140, H('#5a3218'));
  for (let y = 108; y <= 132; y++) for (let x = 182; x <= 292; x++) { const i = Math.floor((x - 182) / 11), j = Math.floor((y - 108) / 8); const c = [H('#c8463a'), H('#e8b040'), H('#3a6a9a'), H('#f0e6d0'), H('#3a8a5a')][(i * 2 + j * 3) % 5];
    R.pset(x, y, (x - 182) % 11 === 0 || (y - 108) % 8 === 0 ? mez(c, K, 0.35) : tono([c, mez(c, K, 0.18)], ru(x, y, 21) * 0.8 + (y - 108) / 40, x, y)); }
  R.rect(260, 100, 290, 110, K); R.rect(261, 101, 289, 109, H('#f4f0e6')); R.rect(261, 107, 289, 109, H('#d8d0c0'));
  R.rect(182, 140, 292, 158, H('#1a1210')); for (const x of [184, 288]) R.rect(x, 140, x + 4, 158, H('#5a3218'));
  // la balda con juguetes y los dos pósteres sin letras (el cohete y el planeta)
  R.rect(186, 64, 262, 67, H('#6a3a1a')); R.rect(186, 64, 262, 64, H('#9a6a3a'));
  R.rect(192, 50, 200, 63, H('#9a9aa8')); R.rect(193, 51, 199, 56, H('#c8c8d0')); R.pset(195, 53, H('#ff4a3a')); R.pset(197, 53, H('#ff4a3a')); R.rect(194, 57, 198, 63, H('#7a7a88'));
  R.poligono([[214, 63], [218, 44], [222, 63]], H('#e8e4dc')); R.poligono([[218, 44], [222, 63], [219, 63]], H('#b8b4ac')); R.rect(212, 58, 224, 63, H('#c8302a'));
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) R.rect(234 + i * 3, 54 + j * 3, 235 + i * 3, 55 + j * 3, [H('#e8c040'), H('#3a6ad8'), H('#c8302a'), H('#3a9a4a')][(i + j) % 4]);
  R.rect(248, 52, 258, 63, H('#2a2a30')); R.rect(249, 53, 257, 59, H('#5a9a5a'));
  R.rect(126, 30, 160, 76, K); R.rect(127, 31, 159, 75, H('#1a2450')); for (let k = 0; k < 14; k++) R.pset(128 + Math.floor(ru(k, 1, 22) * 30), 32 + Math.floor(ru(k, 2, 22) * 42), BL);
  R.poligono([[143, 38], [149, 54], [137, 54]], H('#e8e4dc')); R.rect(139, 54, 147, 66, H('#e8e4dc')); R.rect(139, 58, 147, 60, H('#c8302a')); R.poligono([[139, 62], [134, 70], [139, 68]], H('#c8302a')); R.poligono([[147, 62], [152, 70], [147, 68]], H('#c8302a'));
});
const cajaZapatos = (x, y, polvo = 0) => { R.rect(x - 14, y - 12, x + 14, y, K); R.rect(x - 13, y - 11, x + 13, y - 1, H('#5a8ac8')); R.rect(x - 13, y - 11, x + 13, y - 9, H('#7aa8e0')); R.rect(x - 4, y - 7, x + 4, y - 4, H('#f4f0e6'));
  for (let k = 0; k < 3; k++) PZ.cartucho(R, x - 8 + k * 8, y - 9, { color: ['rojo', 'azul', 'verde'][k] });
  if (polvo > 0) for (let k = 0; k < 40 * polvo; k++) R.pset(x - 13 + Math.floor(ru(k, 1, 23) * 27), y - 24 + Math.floor(ru(k, 2, 23) * 14), H('#c8c4bc')); };
const p3 = (t) => {
  dormitorio();
  // el cielo de la ventana: de noche; y cuando pasan los años, días y noches que corren
  const ciclo = t < pasan ? 0.85 : ((t - pasan) * (0.9 + (t - pasan) * 0.7)) % 1, dia = Math.sin(ciclo * Math.PI * 2) > 0;
  R.recorte([58, 26, 110, 82]);
  cieloT(26, 82, dia ? [H('#4a8ad8'), H('#7ab0e8'), H('#c8e0f0')] : [H('#0e1430'), H('#1a2450'), H('#2a3468')], 58, 110);
  if (dia) { const sx = Math.round(lerp(50, 118, (ciclo * 2) % 1)); R.disco(sx, 40, 5, H('#fff0a0')); R.disco(sx, 40, 4, H('#ffe060')); nube3(((t * 30) % 70) + 50, 56, 18); }
  else { for (let k = 0; k < 12; k++) R.pset(60 + Math.floor(ru(k, 3, 24) * 48), 28 + Math.floor(ru(k, 4, 24) * 30), parp(t + k, 5) ? BL : H('#8a8ab0')); R.disco(96, 38, 4, H('#f4f0d8')); R.disco(98, 37, 3, H('#1a2450')); }
  for (let x = 58; x <= 110; x++) R.pset(x, 78, H('#2a2a34')); for (let k = 0; k < 4; k++) { const hx = 62 + k * 14; R.rect(hx, 66, hx + 8, 78, H('#2a2a34')); R.pset(hx + 3, 70, dia ? H('#2a2a34') : H('#ffe080')); }
  R.recorte(null);
  R.rect(83, 26, 85, 82, H('#f4ecd8')); R.rect(58, 53, 110, 55, H('#f4ecd8'));
  for (const [x0, d] of [[46, 1], [108, -1]]) for (let y = 20; y <= 90; y++) { const w = 10 + Math.round(Math.sin(y * 0.15 + t * 1.5) * 1.5); for (let i = 0; i < w; i++) { const x = d > 0 ? x0 + i : x0 + 14 - i; R.pset(x, y, ((Math.floor(x / 3) + Math.floor(y / 3)) % 2) ? H('#3a7a4a') : H('#e8e0c8')); } }
  R.rect(42, 18, 126, 20, H('#5a3218'));
  // el reloj (corre cuando pasan los años) y el calendario con el año que vuela
  const vel = t < pasan ? 1 : 1 + (t - pasan) * 40, hr = t * vel * 0.3, mn = t * vel * 3.6;
  R.disco(172, 26, 9, K); R.disco(172, 26, 8, H('#f4f0e6')); for (let k = 0; k < 12; k++) R.pset(Math.round(172 + Math.cos(k * 0.52) * 7), Math.round(26 + Math.sin(k * 0.52) * 7), H('#5a5a64'));
  R.linea(172, 26, Math.round(172 + Math.cos(mn - 1.57) * 6), Math.round(26 + Math.sin(mn - 1.57) * 6), K); R.linea(172, 26, Math.round(172 + Math.cos(hr - 1.57) * 4), Math.round(26 + Math.sin(hr - 1.57) * 4), H('#c8302a'));
  R.rect(194, 74, 236, 104, K); R.rect(195, 75, 235, 103, H('#f4f0e6')); R.rect(195, 75, 235, 82, H('#c8302a')); R.numero(String(anio(t)), 216, 81, { centro: true, color: BL, sombra: false });
  for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) R.rect(198 + i * 5, 86 + j * 4, 200 + i * 5, 87 + j * 4, (i + j * 7) % 9 === 4 ? H('#c8302a') : H('#a8a8b0'));
  if (t > pasan) for (let k = 0; k < 3; k++) { const u = ((t - pasan) * 2.2 + k / 3) % 1; const fx = Math.round(216 + u * 50 + Math.sin(u * 9 + k) * 6), fy = Math.round(88 + u * 60 - Math.sin(u * 3) * 20); R.rect(fx - 4, fy - 3, fx + 4, fy + 3, K); R.rect(fx - 3, fy - 2, fx + 3, fy + 2, H('#f4f0e6')); R.rect(fx - 3, fy - 2, fx + 3, fy - 1, H('#c8302a')); }
  // el chico entra con la caja, la mete bajo la cama, pide silencio y se va
  const puerta = (t > P3 && t < P3 + 0.8) || (t > kept + 1.2 && t < kept + 2.2);
  if (puerta) { R.rect(7, 43, 22, 128, H('#2a1a10')); R.rect(22, 43, 37, 128, H('#8a5a2a')); }
  const entra = tramo(t, P3 + 0.1, kept - 0.2), sale = tramo(t, kept + 0.9, kept + 2.0);
  const kx = Math.round(sale > 0 ? lerp(168, 6, sale) : lerp(10, 168, entra));
  const tiene = t < kept - 0.1, cajaU = tramo(t, kept - 0.15, kept + 0.35);
  if (sale < 1) { const m = R.actor(EL.chicoPueblo, kx, 150, t, { dir: sale > 0 ? -1 : 1, anda: (entra > 0 && entra < 1) || (sale > 0 && sale < 1), sostiene: tiene ? [kx + 16, 136] : false, dedo: t > kept + 0.35 && t < kept + 0.9, sonrisa: t > kept + 0.3 });
    if (tiene) cajaZapatos(m.mano[0] + 4, m.mano[1] + 6); }
  // la caja que baja al suelo y se desliza bajo la cama (la tapa el bastidor delantero cuando entra)
  if (!tiene) { const bx = Math.round(lerp(188, 232, ease(cajaU))), by = Math.round(lerp(142, 156, Math.min(1, cajaU * 2)));
    R.recorte([0, 0, 319, 179]); cajaZapatos(bx, by, tramo(t, pasan, hasta)); R.recorte(null);
    R.rect(182, 156, 292, 158, H('#5a3218')); for (const x of [184, 288]) R.rect(x, 140, x + 4, 158, H('#5a3218')); }
  // la araña que baja y su tela que crece bajo la cama
  const tela = tramo(t, pasan + 0.4, hasta);
  if (tela > 0) { for (let k = 0; k < 6; k++) R.linea(190, 141, Math.round(190 + Math.cos(k * 0.3) * 14 * tela), Math.round(141 + Math.sin(k * 0.3) * 14 * tela), H('#d8d8e0')); for (let r2 = 4; r2 < 14 * tela; r2 += 4) for (let k = 0; k < 5; k++) R.linea(Math.round(190 + Math.cos(k * 0.3) * r2), Math.round(141 + Math.sin(k * 0.3) * r2), Math.round(190 + Math.cos((k + 1) * 0.3) * r2), Math.round(141 + Math.sin((k + 1) * 0.3) * r2), H('#b8b8c4'));
    const ay = Math.round(141 + 10 * Math.abs(Math.sin(t * 1.3))); R.linea(200, 141, 200, ay, H('#d8d8e0')); R.disco(200, ay, 1, K); R.pset(199, ay + 1, K); R.pset(201, ay + 1, K); }
  // las motas de polvo en la luz de la ventana
  for (let k = 0; k < 10; k++) { const u = ((t * 0.15 + k / 10) % 1); R.pset(Math.round(70 + k * 9 + Math.sin(t + k) * 4), Math.round(96 + u * 40), H('#fff4c8')); }
};

const efectos = [[0.4, 'maquina'], [1.5, 'papel'], [ran + 0.1, 'papel'], [dumped + 0.05, 'aviso'],
  [snuck + 0.1, 'golpecito'], [snuck + 0.25, 'miau'], [rescue + 0.1, 'brillo'], [concrete - 0.3, 'motor'], [concrete + 0.1, 'claxon'],
  [P3 + 0.1, 'puerta'], [kept + 0.2, 'golpecito'], [pasan + 0.1, 'tic'], [pasan + 1.6, 'papel']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: (t) => (t < P3 ? 1983 : anio(t)) });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['at-leyenda'] = ('La leyenda', '''// AT-LEYENDA (frase 18), de 1983 a 2012: la leyenda que crece de época en época, con el número de cartuchos que se
// hincha como un globo. Cuatro planos:
// 1. la puerta de Atari en 1983: los reporteros preguntan («?»); el ejecutivo niega, se encoge de hombros a
//    «explanation», vuelve dentro y la puerta de cristal se cierra; a «legend filled the gap» el «?» de la reportera se
//    hincha y se vuelve un globo rojo con el 1,000 que ella sujeta;
// 2. 1994, la revista abierta en la moqueta: las manos pasan la página a «Over the years»; el globo crece con
//    «story», «growing» y, a «millions», llega al 1,000,000; a «copies» los cartuchos se multiplican en la página;
// 3. 2004, el foro en el monitor de tubo: las manos teclean; llegan los mensajes con su dibujo (enterrado a «buried»,
//    avergonzado a «shame», tachado a «bad», el barco que se hunde a «sank»); el globo pasa a 3,000,000 y a 5,000,000;
// 4. 2012, el salón: el padre enciende la tele con el mando a «nobody», la madre se encoge de hombros a «check»; el
//    documental repite la leyenda (el foro a «forums», la revista a «magazines», la claqueta a «documentaries»); el globo
//    del 5,000,000, enorme y tenso, lo sujeta el hijo; el perro mueve la cola.''', COMUN + r'''
const A = (f) => en('leyenda', f);
const P2 = A(0.214), P3 = A(0.469), P4 = A(0.724);
const never = A(0.016), explic = A(0.077), legend = A(0.138), filled = A(0.154), gap = A(0.179);
const story = A(0.263), growing = A(0.293), millions = A(0.352), copies = A(0.382), et = A(0.414);
const buried = A(0.497), shame = A(0.528), bad = A(0.604), sank = A(0.624), industry = A(0.671);
const nobody = A(0.734), check = A(0.772), legend2 = A(0.803), forums = A(0.864), magazines = A(0.908), docs = A(0.953);
const pared = (x0, y0, x1, y1, cols, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, tono(cols, ru(x, y, k) * 1.1 + (y - y0) / (y1 - y0 + 1) * (cols.length - 1.4) + (x % 7 === 0 ? 0.3 : 0), x, y)); };
const MANGA = '#3a5a8a';

// ── 1 · 1983: la puerta de Atari se cierra y el «?» se hincha ──
const S1 = 146;
const fachada = fijo(() => {
  cieloT(0, 70, [H('#3a78c8'), H('#5a98e0'), H('#8ac0ec'), H('#c8e0f4')]);
  // las colinas de detrás y la arboleda
  for (let x = 0; x < 320; x++) { const h = 54 + Math.round(Math.sin(x * 0.02 + 1) * 6 + Math.sin(x * 0.07) * 2); for (let y = h; y <= 72; y++) R.pset(x, y, tono([H('#a8b878'), H('#8aa060'), H('#6a8a4a')], (y - h) / 8 + ru(x, y, 30) * 0.6, x, y)); }
  for (let k = 0; k < 30; k++) { const x = Math.floor(ru(k, 1, 31) * 320), y = 66 + Math.floor(ru(k, 2, 31) * 6); R.disco(x, y, 4, H('#3a6a3a')); R.disco(x - 1, y - 1, 3, H('#4a8a4a')); R.pset(x - 2, y - 3, H('#6aa85a')); }
  for (let y = 72; y <= 128; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono([H('#7aa84a'), H('#6a983e'), H('#5a8434')], (y - 72) / 30 + ru(x, y, 39) * 0.9, x, y));
  for (const [x, y] of [[8, 96], [26, 108], [292, 100], [312, 112], [4, 122], [298, 124]]) { R.disco(x, y, 7, H('#2a5a24')); R.disco(x - 1, y - 1, 6, H('#3a7a30')); R.disco(x - 2, y - 3, 3, H('#5a9a44')); for (let k = 0; k < 3; k++) R.pset(x - 3 + k * 3, y - 2 + (k % 2) * 3, H('#e85a6a')); }
  // el edificio de oficinas: hormigón crema, la franja de ventanas que refleja el cielo, el voladizo de la entrada
  R.rect(40, 50, 280, 128, K); pared(41, 51, 279, 127, [H('#efe2c4'), H('#e2d2ae'), H('#d0bc94')], 32);
  for (let x = 41; x < 280; x += 12) R.rect(x, 51, x, 127, H('#d6c49e'));
  R.rect(41, 51, 279, 54, H('#c8b48a'));
  for (const y0 of [60, 94]) { R.rect(44, y0, 276, y0 + 20, K); for (let x = 45; x < 276; x++) for (let y = y0 + 1; y < y0 + 20; y++) { const ref = ((x - y * 0.6) % 40 + 40) % 40 < 6; R.pset(x, y, ref ? H('#b8d8ec') : tono([H('#3a5a7a'), H('#2a4060')], (y - y0) / 20 * 1.2 + ru(x, y, 33) * 0.3, x, y)); }
    for (let x = 44; x < 277; x += 14) R.rect(x, y0, x + 1, y0 + 20, H('#a8a8b0')); }
  // la entrada: voladizo y puertas (las puertas se pintan en cada fotograma)
  R.rect(120, 84, 200, 90, K); R.rect(121, 85, 199, 89, H('#c8302a')); R.rect(121, 85, 199, 85, H('#e85a4a'));
  R.rect(136, 90, 184, 128, K);
  // el monolito con el joystick (pictograma, sin marca)
  R.rect(88, 104, 112, 128, K); R.rect(89, 105, 111, 127, H('#5a5a64')); R.rect(89, 105, 111, 106, H('#7a7a84')); R.rect(98, 110, 102, 118, H('#c8302a')); R.disco(100, 110, 3, H('#e85a4a')); R.rect(94, 118, 106, 121, H('#2a2a30'));
  // seto, palmeras y farolas
  for (let x = 40; x < 136; x++) for (let y = 120; y < 130; y++) if (y > 121 + Math.sin(x * 0.7) || ru(x, y, 34) > 0.3) R.pset(x, y, tono([H('#4a8a3a'), H('#3a6a2a'), H('#2a5020')], (y - 120) / 5 + ru(x, y, 35) * 0.8, x, y));
  for (let x = 204; x < 280; x++) for (let y = 120; y < 130; y++) if (y > 121 + Math.sin(x * 0.7) || ru(x, y, 34) > 0.3) R.pset(x, y, tono([H('#4a8a3a'), H('#3a6a2a'), H('#2a5020')], (y - 120) / 5 + ru(x, y, 35) * 0.8, x, y));
  // la acera y el aparcamiento con sus rayas, manchas y tapas
  for (let y = 128; y <= 152; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 24 === 0 || y === 128) ? H('#a8a49a') : tono([H('#d8d4c8'), H('#c8c4b6')], ru(x, y, 36) * 1.4, x, y));
  for (let y = 153; y <= 179; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono([H('#5a5a62'), H('#4a4a52'), H('#3a3a42')], ru(x, y, 37) * 1.5 + (y - 153) / 30, x, y));
  for (let x = 6; x < 320; x += 46) R.rect(x, 158, x + 1, 179, H('#e8e4d4'));
  for (let k = 0; k < 8; k++) { const x = Math.floor(ru(k, 1, 38) * 300), y = 160 + Math.floor(ru(k, 2, 38) * 16); R.disco(x, y, 2, H('#33333a')); }
  // los coches aparcados de la fila de arriba (de frente, con su parabrisas)
  for (const [x, c] of [[12, '#3a6a9a'], [58, '#e8c040'], [196, '#5a8a4a']]) { R.rect(x, 154, x + 34, 170, K); R.rect(x + 1, 155, x + 33, 169, H(c)); R.rect(x + 5, 156, x + 29, 162, H('#9ac8e0')); R.rect(x + 6, 157, x + 14, 157, BL); R.rect(x + 1, 165, x + 33, 166, mez(H(c), K, 0.3)); R.rect(x + 2, 163, x + 6, 165, H('#fff0a0')); R.rect(x + 28, 163, x + 32, 165, H('#fff0a0')); R.rect(x + 12, 166, x + 22, 168, H('#c8c8d0')); R.rect(x + 2, 170, x + 6, 172, K); R.rect(x + 28, 170, x + 32, 172, K); }
});
const palmera = (x, s, t) => { for (let y = s - 70; y <= s; y++) { const xx = x + Math.round(Math.sin((s - y) * 0.03) * 3); R.rect(xx - 1, y, xx + 1, y, (y % 4) ? H('#8a6a4a') : H('#6a4a2a')); }
  const cx = x + 3, cy = s - 72; for (let k = 0; k < 7; k++) { const a = -Math.PI + k * (Math.PI / 6) + Math.sin(t * 1.4 + k) * 0.08; for (let i = 0; i < 20; i++) { const px = Math.round(cx + Math.cos(a) * i), py = Math.round(cy + Math.sin(a) * i * 0.6 + i * i * 0.025); R.pset(px, py, H('#3a7a3a')); R.pset(px, py + 1, H('#2a5a2a')); if (i % 3 === 0) R.pset(px, py + 2, H('#4a9a4a')); } }
  R.disco(cx, cy + 1, 2, H('#7a5a2a')); };
const camaraTV = (x, y) => { R.rect(x - 10, y - 9, x + 6, y, K); R.rect(x - 9, y - 8, x + 5, y - 1, H('#3a3a44')); R.rect(x - 9, y - 8, x + 5, y - 7, H('#5a5a64')); R.rect(x + 6, y - 7, x + 11, y - 2, K); R.rect(x + 7, y - 6, x + 10, y - 3, H('#5a6a8a')); R.pset(x + 8, y - 5, H('#c8e0f0')); R.pset(x - 7, y - 6, H('#ff3a3a')); };
const p1 = (t) => {
  fachada();
  nubes(t, [[30, 16, 34, 3], [150, 30, 22, 6], [250, 22, 30, 4]]);
  pajaros(t, 4, 26, 10);
  palmera(18, 146, t); palmera(302, 146, t);
  // el ejecutivo en la puerta: niega, se encoge de hombros, entra y la puerta se cierra
  const entra = tramo(t, explic + 0.35, explic + 1.0), cierra = tramo(t, explic + 0.8, explic + 1.3);
  const vx = Math.round(lerp(152, 152, entra)), vs = Math.round(lerp(128, 118, entra));
  R.rect(137, 91, 183, 127, H('#2a3a4a')); for (let y = 92; y < 127; y += 3) R.rect(138, y, 182, y, H('#34465a'));
  if (entra < 1) { if (entra > 0) R.recorte([137, 91, 183, 127]); R.actor(EL.ejecutivoAtari, vx, vs, t, { dir: entra > 0 ? 1 : Math.sin(t * 9) > 0 && t > never && t < explic ? -1 : 1, anda: entra > 0, brazos: t > explic - 0.1 && t < explic + 0.35, habla: t > 0.2 && t < never && parp(t, 8) }); R.recorte(null); }
  // las dos hojas de cristal que se cierran (reflejos)
  const ab = Math.round(lerp(22, 0, ease(cierra)));
  for (const [x0, x1] of [[137, 159 - ab], [161 + ab, 183]]) { if (x1 < x0) continue; R.rect(x0, 91, x1, 127, H('#7a9ab8')); for (let x = x0; x <= x1; x++) for (let y = 91; y <= 127; y++) if (((x - y * 0.5) % 18 + 18) % 18 < 3) R.pset(x, y, H('#c8e0f0')); R.rect(x0, 91, x0, 127, K); R.rect(x1, 91, x1, 127, K); }
  R.rect(158, 104, 159, 112, H('#c8c8d0')); R.rect(161, 104, 162, 112, H('#c8c8d0'));
  // los reporteros: el cámara a la izquierda y la reportera con el micro a la derecha
  const mc = R.actor(EL.espectador, 104, S1, t, { dir: 1, sostiene: [118, S1 - 22], sorpresa: t > explic + 0.9 && t < explic + 1.5 });
  camaraTV(mc.mano[0] + 2, mc.mano[1] + 2);
  const sujeta = t > legend - 0.1;
  const mr = R.actor(EL.espectadora, 188, S1, t, { dir: -1, sostiene: [178, S1 - 16], habla: t < never + 0.4 && parp(t, 9), sonrisa: t > filled });
  const [hx, hy] = mr.mano;
  if (!sujeta) { R.rect(hx - 3, hy - 6, hx - 1, hy, K); R.disco(hx - 2, hy - 7, 2, H('#3a3a44')); }
  // un tercer periodista se asoma detrás con su libreta
  R.actor(EL.camionero2, 232, S1 - 2, t, { dir: -1, dedo: t > 0.4 && t < 1.4, habla: t > 0.4 && t < 1.4 && parp(t, 9) });
  // los «?» de las preguntas, y el que queda flotando en el hueco cuando se cierra la puerta
  if (t > 0.3 && t < 1.2) R.bocadillo(112, 112, { icono: '?' });
  if (t > 0.7 && t < 1.6) R.bocadillo(238, 110, { icono: '?' });
  const gr = tramo(t, legend, gap + 0.3);
  if (t > explic + 1.0 && gr <= 0) { const b = Math.round(Math.sin(t * 6) * 1); R.rect(150, 62 + b, 170, 84 + b, K); R.rect(151, 63 + b, 169, 83 + b, BL); R.icono('?', 157, 67 + b, K, BL, 2); }
  // el «?» se hincha y se vuelve el globo del 1,000, que baja a la mano de la reportera
  if (gr > 0) { const r = Math.round(lerp(8, 16, ease(gr))), gx = Math.round(lerp(160, 196, ease(gr))), gy = Math.round(lerp(72, 66, gr)); globo(t, gx, gy, r, gr > 0.55 ? '1,000' : null, hx, hy, { fina: true }); if (gr <= 0.55) R.icono('?', gx - 2, gy - 4, BL, GLOBO[0], 1); }
  // la furgoneta de la tele aparcada, con su antena, y un coche que pasa por delante
  { const fx = 250, fy = 176; R.rect(fx, fy - 26, fx + 66, fy - 4, K); R.rect(fx + 1, fy - 25, fx + 65, fy - 5, H('#f0ece0')); R.rect(fx + 1, fy - 14, fx + 65, fy - 12, H('#3a6ad8')); R.rect(fx + 48, fy - 23, fx + 62, fy - 16, H('#5a8aa8')); R.rect(fx + 4, fy - 22, fx + 22, fy - 16, H('#2a2a34')); R.icono('camara', fx + 9, fy - 22, H('#e8c040'), H('#2a2a34'), 1);
    R.rect(fx + 20, fy - 40, fx + 21, fy - 26, H('#8a8a94')); for (let i = -6; i <= 6; i++) R.pset(fx + 21 + i, fy - 41 - Math.round(Math.sqrt(36 - i * i) * 0.5), H('#c8c8d0')); if (parp(t, 4)) R.pset(fx + 21, fy - 44, H('#ff4a3a'));
    for (const wx of [fx + 12, fx + 54]) { R.disco(wx, fy - 3, 4, K); R.disco(wx, fy - 3, 1, H('#a8a8b0')); } }
  const cu = tramo(t, 0.6, 3.4); if (cu > 0 && cu < 1) { const x = Math.round(lerp(-60, 260, cu)), y = 178; R.rect(x, y - 13, x + 44, y - 4, K); R.rect(x + 1, y - 12, x + 43, y - 5, H('#a83a2a')); R.rect(x + 10, y - 19, x + 32, y - 12, K); R.rect(x + 11, y - 18, x + 31, y - 13, H('#9ac8e0')); R.rect(x + 43, y - 10, x + 44, y - 8, H('#fff0a0')); for (const wx of [x + 9, x + 35]) { R.disco(wx, y - 3, 4, K); R.disco(wx, y - 3, 1, H('#a8a8b0')); } }
};

// ── 2 · 1994: la revista en la moqueta ──
const moqueta = fijo(() => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const calma = (x > 270 && y < 50) || y < 16; const m = ((Math.floor(x / 12) + Math.floor(y / 12)) % 2 === 0) && !calma, z = !calma && ((x + y * 2) % 36 < 2 || (x * 2 - y + 400) % 52 < 2);
    R.pset(x, y, z ? H('#c84a8a') : tono([H('#2a7a80'), H('#226a70'), H('#1a5a60')], ru(x, y, 40) * 1.6 + (m ? 0.4 : 0), x, y)); }
  // la consolita de bolsillo gris, la cinta de casete, la lata, la bolsa de patatas, el disquete y el lápiz
  R.rect(14, 112, 46, 168, K); R.rect(15, 113, 45, 167, H('#c8c8c0')); R.rect(19, 118, 41, 138, H('#5a5a64')); R.rect(21, 120, 39, 136, H('#8aa84a')); R.rect(24, 125, 28, 129, H('#3a5a2a'));
  R.rect(20, 146, 26, 148, H('#2a2a30')); R.rect(22, 144, 24, 150, H('#2a2a30')); R.disco(36, 148, 2, H('#a83a6a')); R.disco(41, 145, 2, H('#a83a6a')); R.rect(26, 158, 34, 159, H('#7a7a84'));
  R.rect(262, 120, 302, 146, K); R.rect(263, 121, 301, 145, H('#2a2a34')); R.rect(266, 124, 298, 132, H('#e8c040')); R.disco(274, 138, 4, H('#5a5a64')); R.disco(290, 138, 4, H('#5a5a64')); R.disco(274, 138, 1, BL); R.disco(290, 138, 1, BL);
  R.disco(292, 76, 11, K); R.disco(292, 76, 10, H('#c8302a')); R.disco(292, 76, 7, H('#d8d8e0')); R.disco(295, 76, 2, H('#8a8a94')); R.pset(288, 72, BL);
  R.poligono([[4, 22], [44, 14], [56, 52], [12, 62]], K); R.poligono([[6, 24], [42, 17], [52, 50], [14, 59]], H('#e8c040')); R.disco(30, 38, 7, H('#c8302a')); R.disco(30, 38, 4, H('#f4e8c0'));
  R.rect(262, 152, 290, 176, K); R.rect(263, 153, 289, 175, H('#3a3a44')); R.rect(268, 153, 284, 160, H('#a8a8b0')); R.rect(267, 165, 285, 175, H('#e8e4dc'));
  R.linea(48, 172, 84, 158, K); R.linea(48, 171, 84, 157, H('#e8c040')); R.pset(84, 157, H('#e88a8a'));
  R.disco(300, 104, 6, H('#e85a9a')); R.disco(300, 104, 3, H('#226a70'));
});
const pagina = (x0, y0, x1, y1, lado, fase, t) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, tono([H('#fbf8f0'), H('#efe8d8')], ru(x, y, 41) * 0.8 + (lado < 0 ? (x - x0) / (x1 - x0) : (x1 - x) / (x1 - x0)) * 0.9, x, y));
  if (fase === 0 && lado < 0) {   // la foto de la noche en el vertedero con el camión que vuelca
    R.rect(x0 + 6, y0 + 8, x1 - 6, y0 + 58, K); cieloT(y0 + 9, y0 + 40, [H('#0e1430'), H('#2a3468')], x0 + 7, x1 - 7); for (let k = 0; k < 10; k++) R.pset(x0 + 8 + Math.floor(ru(k, 1, 42) * (x1 - x0 - 16)), y0 + 10 + Math.floor(ru(k, 2, 42) * 20), BL);
    R.rect(x0 + 7, y0 + 41, x1 - 7, y0 + 57, H('#5a4a3a')); R.rect(x0 + 20, y0 + 30, x0 + 44, y0 + 40, H('#e8dcc0')); R.poligono([[x0 + 22, y0 + 30], [x0 + 36, y0 + 22], [x0 + 40, y0 + 30]], H('#c8461e')); R.disco(x0 + 26, y0 + 41, 2, K); R.disco(x0 + 40, y0 + 41, 2, K);
    for (let k = 0; k < 9; k++) R.rect(x0 + 50 + k * 4, y0 + 48 - (k % 3) * 2, x0 + 52 + k * 4, y0 + 51 - (k % 3) * 2, H(['#c8a06a', '#d0383a', '#3a6ad8'][k % 3]));
    if (parp(t, 3)) R.disco(x1 - 20, y0 + 20, 2, H('#fff0a0'));
  }
  if (fase === 0 && lado > 0) {   // el cartucho en el hoyo con un «?»
    R.rect(x0 + 10, y0 + 8, x1 - 8, y0 + 16, H('#c8302a')); R.disco(x0 + 40, y0 + 42, 15, H('#3a2a1a')); PZ.cartucho(R, x0 + 40, y0 + 48, { color: 'rojo', icono: 'foso', s: 2 }); R.icono('?', x0 + 60, y0 + 24, H('#c8302a'), BL, 2);
  }
  if (fase === 1) {   // la nueva doble página: filas de cartuchos que se multiplican (las copias)
    R.rect(x0 + 8, y0 + 8, x1 - 8, y0 + 12, H('#3a6ad8'));
    if (lado < 0) { R.rect(x0 + 8, y0 + 16, x1 - 8, y0 + 44, K); cieloT(y0 + 17, y0 + 32, [H('#5a9ae0'), H('#c8e0f0')], x0 + 9, x1 - 9); for (let y = y0 + 33; y <= y0 + 43; y++) for (let x = x0 + 9; x <= x1 - 9; x++) R.pset(x, y, tono([H('#d8b47a'), H('#a8844a')], (y - y0 - 33) / 6 + ru(x, y, 43) * 0.6, x, y));
      R.rect(x0 + 30, y0 + 36, x0 + 60, y0 + 41, H('#5a4a3a')); for (let k = 0; k < 7; k++) R.rect(x0 + 32 + k * 4, y0 + 36 - (k % 2), x0 + 33 + k * 4, y0 + 38, H(['#d0383a', '#3a6ad8', '#e8c040'][k % 3])); R.rect(x0 + 64, y0 + 30, x0 + 80, y0 + 38, H('#efe2c0')); R.disco(x0 + 68, y0 + 39, 2, K); R.disco(x0 + 77, y0 + 39, 2, K); }
    else { R.rect(x0 + 8, y0 + 16, x0 + 40, y0 + 44, H('#e8c040')); R.icono('!', x0 + 21, y0 + 22, H('#c8302a'), BL, 2); for (let j = 0; j < 4; j++) R.rect(x0 + 46, y0 + 18 + j * 6, x1 - 10 - (j % 2) * 8, y0 + 19 + j * 6, H('#8a8a94')); }
    const n = Math.floor(12 * tramo(t, copies - 0.2, et + 0.4)); for (let k = 0; k < n; k++) { const i = k % 6, j = Math.floor(k / 6); PZ.cartucho(R, x0 + 14 + i * 13, y0 + 64 + j * 17, { color: ['rojo', 'azul', 'verde', 'naranja'][k % 4] }); }
  }
  for (let j = 0; j < 7; j++) { const y = y1 - 46 + j * 6; R.rect(x0 + 8, y, x1 - 8 - (j % 3) * 9, y + 1, H('#8a8a94')); }
  R.numero(String(lado < 0 ? 42 : 43), lado < 0 ? x0 + 8 : x1 - 14, y1 - 2, { fina: true, color: H('#8a8a94'), sombra: false });
};
const p2 = (t) => {
  moqueta();
  const MX0 = 66, MX1 = 254, MY0 = 36, MY1 = 150, cen = 160;
  // la sombra de la revista y sus dos páginas
  for (let y = MY0 + 3; y <= MY1 + 4; y++) for (let x = MX0 + 4; x <= MX1 + 4; x++) tinta(x, y, K, 0.35);
  R.rect(MX0 - 1, MY0 - 1, MX1 + 1, MY1 + 1, K);
  const vuelta = tramo(t, P2 + 0.6, P2 + 1.3), fase = vuelta >= 0.5 ? 1 : 0;
  pagina(MX0, MY0, cen - 1, MY1, -1, fase, t); pagina(cen + 1, MY0, MX1, MY1, 1, vuelta > 0 ? 1 : 0, t);
  // la hoja que pasa (de derecha a izquierda), con su cara de atrás
  if (vuelta > 0 && vuelta < 1) { const w = Math.round(Math.cos(vuelta * Math.PI) * (MX1 - cen)); const xa = Math.min(cen, cen + w), xb = Math.max(cen, cen + w); const lev = Math.round(Math.sin(vuelta * Math.PI) * 10);
    R.poligono([[xa, MY0 - lev], [xb, MY0 - (w > 0 ? 0 : lev)], [xb, MY1 + (w > 0 ? 0 : lev)], [xa, MY1 + lev]], K);
    if (xb - xa > 2) R.poligono([[xa + 1, MY0 - lev + 1], [xb - 1, MY0 + 1], [xb - 1, MY1 - 1], [xa + 1, MY1 + lev - 1]], vuelta < 0.5 ? H('#f4efe2') : H('#e8e0cc')); }
  R.rect(cen - 1, MY0, cen + 1, MY1, H('#c8c0b0')); R.rect(cen, MY0, cen, MY1, H('#a8a090'));
  // las manos que sujetan la revista (la derecha pasa la página)
  const hxR = vuelta > 0 && vuelta < 1 ? Math.round(lerp(MX1 - 6, MX0 + 20, vuelta)) : MX1 - 8, hyR = vuelta > 0 && vuelta < 1 ? MY1 - 4 - Math.round(Math.sin(vuelta * Math.PI) * 12) : MY1 - 2;
  T.brazo(R, 40, 192, MX0 + 8, MY1 - 2, MANGA, 1, { codo: [48, 172] });
  T.brazo(R, 286, 192, hxR, hyR, MANGA, -1, { codo: [272, 174] });
  // el globo del número que crece y se tensa (atado a la grapa)
  const etapas = [[0, '1,000', 15], [story, '10,000', 18], [growing, '100,000', 22], [millions, '1,000,000', 28]];
  let k = 0; for (let i = 0; i < etapas.length; i++) if (t >= etapas[i][0]) k = i;
  const prev = k > 0 ? etapas[k - 1][2] : etapas[0][2], ri = Math.round(lerp(prev, etapas[k][2], tramo(t, etapas[k][0], etapas[k][0] + 0.35)));
  globo(t, 212, 66, ri + (k === 3 ? Math.round(Math.sin(t * 12) * 0.6) : 0), etapas[k][1], 200, MY0 + 4, { fina: true, tenso: k === 3 });
};

// ── 3 · 2004: el foro en el monitor de tubo ──
const escritorio = fijo(() => {
  pared(0, 0, 319, 126, [H('#3a3a5a'), H('#32324e'), H('#2a2a42')], 50);
  // la ventana de la noche con la ciudad (a la izquierda) y el póster del cohete
  R.rect(12, 22, 84, 84, K); cieloT(23, 83, [H('#0e1430'), H('#1a2450'), H('#3a3a6a')], 13, 83);
  for (let k = 0; k < 10; k++) R.pset(14 + Math.floor(ru(k, 1, 51) * 68), 24 + Math.floor(ru(k, 2, 51) * 24), BL);
  for (let i = 0; i < 7; i++) { const x = 13 + i * 10, h = 14 + Math.floor(ru(i, 3, 51) * 22); R.rect(x, 83 - h, x + 8, 83, H('#141830')); for (let j = 0; j < h - 4; j += 4) for (let q = 0; q < 2; q++) if (ru(i * 9 + j, q, 52) > 0.5) R.pset(x + 2 + q * 4, 83 - h + 3 + j, H('#ffd870')); }
  R.rect(47, 22, 49, 84, K); R.rect(12, 52, 84, 53, K);
  R.rect(252, 50, 290, 100, K); R.rect(253, 51, 289, 99, H('#e85a2a')); R.disco(271, 66, 8, H('#f4c040')); R.rect(259, 82, 283, 94, H('#2a2a42')); R.poligono([[265, 82], [271, 70], [277, 82]], H('#5a3a7a'));
  // la mesa de madera con su canto
  madera(0, 127, 319, 147, [H('#8a5a34'), H('#7a4e2c'), H('#6a4024'), H('#4a2c18')], 5, 3);
  R.rect(0, 147, 319, 152, H('#3a2414')); for (let y = 153; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono([H('#2a2030'), H('#221a28')], ru(x, y, 53) * 1.4, x, y));
  // la torre del ordenador con la disquetera, el altavoz, la taza y la pila de cedés
  R.rect(232, 66, 268, 128, K); R.rect(233, 67, 267, 127, H('#d8d0bc')); R.rect(237, 72, 263, 77, H('#b8b0a0')); R.rect(237, 81, 263, 86, H('#b8b0a0')); R.rect(244, 83, 256, 84, K); for (let y = 92; y < 122; y += 3) R.rect(237, y, 263, y, H('#c8c0ac'));
  R.rect(72, 92, 92, 128, K); R.rect(73, 93, 91, 127, H('#2a2a30')); R.disco(82, 104, 6, H('#4a4a54')); R.disco(82, 104, 2, H('#1a1a1e')); R.disco(82, 120, 4, H('#4a4a54'));
  R.rect(276, 112, 290, 128, K); R.rect(277, 113, 289, 127, H('#e8e4dc')); R.rect(290, 116, 293, 123, K); R.rect(278, 113, 288, 115, H('#5a3a24'));
  for (let k = 0; k < 6; k++) { const y = 126 - k * 2; R.rect(296, y, 316, y + 1, k % 2 ? H('#c8c8d8') : H('#a8b8e0')); } R.rect(305, 112, 307, 126, H('#5a5a64'));
  R.rect(20, 118, 54, 128, K); R.rect(21, 119, 53, 127, H('#f4f0e6')); for (let k = 0; k < 4; k++) R.rect(24, 121 + k * 2, 50 - k * 5, 121 + k * 2, H('#8a8a94'));
});
const pantallaForo = (x0, y0, x1, y1, t) => {
  R.rect(x0, y0, x1, y1, H('#e8eaf0'));
  R.rect(x0, y0, x1, y0 + 7, H('#3a5aa8')); R.rect(x0 + 2, y0 + 2, x0 + 12, y0 + 5, H('#e8c040')); for (let i = 0; i < 4; i++) R.rect(x0 + 18 + i * 14, y0 + 3, x0 + 28 + i * 14, y0 + 4, H('#a8c0f0'));
  const llegan = [buried, shame, bad, sank], n = llegan.filter((v) => t > v).length, sc = Math.round(18 * Math.max(0, n - 3 + tramo(t, llegan[Math.max(0, n - 1)], llegan[Math.max(0, n - 1)] + 0.3)) * (n >= 4 ? 1 : 0));
  R.recorte([x0, y0 + 8, x1, y1]);
  const posts = 1 + n;
  for (let i = 0; i < posts; i++) { const y = y0 + 10 + i * 18 - sc, nueva = i > 0 && t < llegan[i - 1] + 0.35; if (y > y1) continue; const yy = y + (nueva ? Math.round((1 - tramo(t, llegan[i - 1], llegan[i - 1] + 0.35)) * 10) : 0);
    for (let x = x0 + 1; x < x1; x++) for (let q = yy; q < yy + 16; q++) R.pset(x, q, i % 2 ? H('#f4f6fa') : H('#dfe4ee'));
    const av = ['#c8463a', '#3a8a5a', '#e8a030', '#7a4ab8', '#3a6ad8'][i]; for (let a = 0; a < 10; a++) for (let b = 0; b < 10; b++) R.pset(x0 + 3 + a, yy + 3 + b, H(av)); R.pset(x0 + 6, yy + 6, BL); R.pset(x0 + 9, yy + 6, BL); for (let a = 5; a < 10; a++) R.pset(x0 + 3 + a - 1, yy + 10, K);
    for (let j = 0; j < 3; j++) for (let x = x0 + 17; x < x1 - 30 - j * 10; x++) R.pset(x, yy + 4 + j * 4, H('#9a9aa8'));
    const ix = x1 - 18, iy = yy + 14;
    if (yy < y0 + 8 || yy + 16 > y1) continue;
    if (i === 1) { for (let x = ix - 8; x <= ix + 8; x++) for (let q = iy - 5; q <= iy; q++) R.pset(x, q, H('#6a4a2a')); PZ.cartucho(R, ix, iy - 3, { color: 'rojo' }); for (let x = ix - 8; x <= ix + 8; x++) R.pset(x, iy - 3, H('#8a6a3a')); }
    if (i === 2) { PZ.cartucho(R, ix, iy, { color: 'azul' }); R.pset(ix - 3, iy - 6, H('#ff7a8a')); R.pset(ix + 3, iy - 6, H('#ff7a8a')); R.disco(ix + 7, iy - 13, 1, H('#8ad0f0')); }
    if (i === 3) { PZ.cartucho(R, ix, iy, { color: 'verde' }); R.icono('X', ix - 5, iy - 13, H('#e82a2a'), K, 2); }
    if (i === 4) { const bj = Math.round(tramo(t, sank, industry) * 5); R.recorte([x0, yy, x1, yy + 15]); R.poligono([[ix - 9, iy - 6 + bj], [ix + 9, iy - 6 + bj], [ix + 6, iy + bj], [ix - 6, iy + bj]], H('#5a3a2a')); R.rect(ix, iy - 14 + bj, ix, iy - 6 + bj, K); R.disco(ix, iy - 15 + bj, 2, H('#e83a3a')); for (let x = x0 + 1; x < x1; x++) R.pset(x, iy - 1, ((x + Math.floor(t * 8)) % 6 < 3) ? H('#3a7ac8') : H('#5a9ae0')); R.recorte([x0, y0 + 8, x1, y1]); }
  }
  R.recorte(null);
  // el contador de respuestas que sube y el cursor
  R.numero(String(1200 + Math.floor((t - P3) * 37) + n * 210), x1 - 6, y0 + 7, { fina: true, color: BL, sombra: false });
  const cx = Math.round(lerp(x1 - 30, x0 + 40, tramo(t, bad - 0.6, bad))), cy = Math.round(lerp(y1 - 10, y0 + 40, tramo(t, bad - 0.6, bad)));
  R.poligono([[cx, cy], [cx, cy + 7], [cx + 2, cy + 5], [cx + 5, cy + 5]], K); R.pset(cx + 1, cy + 3, BL); R.pset(cx + 1, cy + 4, BL);
};
const p3 = (t) => {
  escritorio();
  // el monitor de tubo beige: carcasa, pantalla con el foro, el reflejo y el piloto
  R.rect(96, 18, 226, 124, K); R.rect(97, 19, 225, 123, H('#d8d0bc')); R.rect(97, 19, 225, 21, H('#ece6d6')); R.rect(220, 22, 224, 122, H('#b8b0a0'));
  R.rect(104, 26, 218, 112, K); pantallaForo(106, 28, 216, 110, t);
  for (let y = 28; y <= 110; y += 2) for (let x = 106; x <= 216; x++) tinta(x, y, K, 0.06);
  R.linea(110, 32, 124, 30, BL); R.rect(140, 115, 182, 118, H('#b8b0a0')); R.pset(210, 117, parp(t, 2) ? H('#5aff5a') : H('#2a8a2a'));
  R.rect(130, 124, 192, 128, K); R.rect(131, 124, 191, 127, H('#c8c0ac'));
  // el pósit amarillo pegado y la luz del piloto de la torre
  R.rect(98, 22, 108, 30, H('#f0e060')); R.rect(100, 25, 106, 25, H('#a89a3a'));
  R.pset(240, 74, parp(t, 9) ? H('#ff9a3a') : H('#5a3a1a')); R.pset(240, 79, parp(t, 1.5) ? H('#5aff5a') : H('#2a5a2a'));
  // el teclado, el ratón y las manos que teclean
  R.rect(110, 136, 212, 148, K); R.rect(111, 137, 211, 147, H('#d8d0bc')); for (let j = 0; j < 3; j++) for (let i = 0; i < 16; i++) R.rect(113 + i * 6, 138 + j * 3, 117 + i * 6, 139 + j * 3, H('#ece6d6'));
  R.rect(226, 136, 236, 148, K); R.rect(227, 137, 235, 147, H('#d8d0bc')); R.rect(231, 137, 231, 141, H('#a8a090'));
  const tec = t < bad - 0.7 || (t > sank + 0.4 && t < industry + 0.8), f = Math.floor(t * 12) % 2;
  T.brazo(R, 112, 196, 138, 142 - (tec && f ? 1 : 0), '#7a3a3a', 1, { codo: [118, 172] });
  if (!tec) T.brazo(R, 262, 196, 232, 144, '#7a3a3a', -1, { codo: [256, 172] }); else T.brazo(R, 214, 196, 182, 142 - (tec && !f ? 1 : 0), '#7a3a3a', -1, { codo: [208, 172] });
  // el globo que crece: 1,000,000 → 3,000,000 a «shame» → 5,000,000 a «industry» (atado al monitor)
  const g = t < shame ? ['1,000,000', 28] : t < industry ? ['3,000,000', 30] : ['5,000,000', 33];
  const crece = t > industry ? tramo(t, industry, industry + 0.4) : t > shame ? tramo(t, shame, shame + 0.4) : 1;
  globo(t, 50, 70, Math.round(g[1] - 3 + 3 * ease(crece)), g[0], 98, 44, { fina: true, tenso: t > industry });
};

// ── 4 · 2012: el documental en el salón ──
const salon = fijo(() => {
  pared(0, 0, 319, 130, [H('#8aa0a8'), H('#7a929a'), H('#6a8088')], 60);
  for (let x = 0; x < 320; x += 2) R.pset(x, 0, H('#e8e4dc'));
  // la ventana de la tarde (a la izquierda) con las casas de enfrente
  R.rect(4, 26, 40, 92, H('#f4f0e6')); cieloT(29, 89, [H('#e8a060'), H('#f0c080'), H('#f8e0b0')], 7, 37);
  for (const [x, h, c] of [[8, 18, '#a85a4a'], [24, 24, '#8a6a5a']]) { R.rect(x, 89 - h, x + 12, 89, H(c)); R.poligono([[x - 1, 89 - h], [x + 6, 83 - h], [x + 13, 89 - h]], H('#5a3a3a')); R.rect(x + 4, 92 - h, x + 7, 95 - h, H('#ffd870')); }
  R.rect(21, 29, 23, 89, H('#f4f0e6')); R.rect(7, 58, 37, 60, H('#f4f0e6'));
  // los cuadros (paisajes sin letras) y la estantería con los discos
  R.rect(246, 52, 270, 70, K); R.rect(247, 53, 269, 69, H('#c8e0f0')); R.rect(247, 62, 269, 69, H('#6a9a5a')); R.disco(262, 58, 2, H('#ffe080'));
  R.rect(232, 76, 262, 96, K); R.rect(233, 77, 261, 95, H('#f0e6d0')); R.poligono([[236, 94], [246, 80], [258, 94]], H('#7a6a9a'));
  // el suelo de tarima clara y la alfombra
  madera(0, 131, 319, 179, [H('#c89a64'), H('#b88a58'), H('#a07448'), H('#7a5634')], 8, 4);
  for (let y = 150; y < 180; y++) for (let x = 60; x < 230; x++) R.pset(x, y, ((x + y) % 8 < 1) ? H('#8a7a6a') : tono([H('#d8ccb8'), H('#c8bca6')], ru(x, y, 61) * 1.3, x, y));
  // el mueble de la tele con la consola, los discos y el router
  R.rect(46, 108, 186, 136, K); R.rect(47, 109, 185, 135, H('#4a3a30')); R.rect(47, 109, 185, 110, H('#6a5a4a')); R.rect(54, 116, 112, 130, H('#2a2220')); R.rect(120, 116, 178, 130, H('#2a2220'));
  R.rect(58, 120, 84, 126, H('#e8e8f0')); R.rect(60, 122, 82, 122, H('#3a8ad8'));
  for (let i = 0; i < 9; i++) R.rect(124 + i * 5, 118, 143 + i * 5, 129, H(['#c8302a', '#3a6ad8', '#e8c040', '#3a9a4a', '#7a4ab8'][i % 5]));
  // el sofá de la derecha (respaldo; el asiento y el brazo van delante)
  R.rect(212, 96, 318, 128, K); R.rect(213, 97, 317, 127, H('#8a3a3a')); for (let x = 214; x < 317; x += 26) R.rect(x, 98, x + 24, 126, H('#a04a46')); R.rect(213, 97, 317, 99, H('#b85a54'));
  // la lámpara de pie
  R.rect(306, 62, 308, 96, H('#3a3a40')); R.poligono([[298, 62], [316, 62], [312, 50], [302, 50]], H('#f0e0b0')); R.poligono([[300, 61], [314, 61], [311, 52], [303, 52]], H('#fff4c8'));
});
const pantallaDoc = (x0, y0, x1, y1, t) => {
  const fase = t < check ? -1 : t < forums ? 0 : t < magazines ? 1 : t < docs ? 2 : 3;
  if (fase < 0) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, ((x - y) % 23 + 23) % 23 < 3 ? H('#2a2a34') : H('#141418')); return; }
  // el desierto del documental con el presentador (silueta con sombrero) y el título de cifras
  cieloT(y0, y0 + 30, [H('#e8783a'), H('#f0a85a'), H('#f8d890')], x0, x1);
  R.disco(x1 - 22, y0 + 26, 7, H('#fff0a0'));
  for (let y = y0 + 30; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, tono([H('#c8925a'), H('#a8743c')], (y - y0 - 30) / 20 + ru(x, y, 62) * 0.5, x, y));
  const px = x0 + 18; R.rect(px - 3, y1 - 26, px + 3, y1 - 6, H('#2a1a14')); R.disco(px, y1 - 30, 4, H('#2a1a14')); R.rect(px - 7, y1 - 34, px + 7, y1 - 33, H('#2a1a14')); R.rect(px - 3, y1 - 38, px + 3, y1 - 34, H('#2a1a14'));
  if (fase === 0) for (let k = 0; k < 6; k++) PZ.cartucho(R, x0 + 50 + k * 10, y1 - 8 - (k % 2) * 4, { color: ['rojo', 'azul', 'verde'][k % 3] });
  // el recuadro de lo que repite la leyenda: el foro, la revista, la claqueta
  const bx = x0 + 40, by = y0 + 6, bw = 50, bh = 32;
  if (fase >= 1) { R.rect(bx - 1, by - 1, bx + bw + 1, by + bh + 1, K); R.rect(bx, by, bx + bw, by + bh, BL); }
  if (fase === 1) { R.rect(bx, by, bx + bw, by + 4, H('#3a5aa8')); for (let i = 0; i < 3; i++) { R.rect(bx + 3, by + 7 + i * 8, bx + 8, by + 12 + i * 8, H(['#c8463a', '#3a8a5a', '#e8a030'][i])); R.rect(bx + 11, by + 8 + i * 8, bx + bw - 6 - i * 5, by + 9 + i * 8, H('#9a9aa8')); } }
  if (fase === 2) { R.rect(bx + 8, by + 2, bx + bw - 8, by + bh - 2, H('#c8302a')); R.rect(bx + 10, by + 4, bx + bw - 10, by + 8, H('#f4f0e6')); PZ.cartucho(R, bx + bw / 2, by + bh - 4, { color: 'amarillo', icono: 'foso' }); }
  if (fase === 3) { R.rect(bx + 10, by + 12, bx + bw - 10, by + bh - 4, H('#2a2a30')); const ab = Math.round(Math.abs(Math.sin(t * 6)) * 6); R.poligono([[bx + 10, by + 11], [bx + bw - 10, by + 11 - ab], [bx + bw - 10, by + 6 - ab], [bx + 10, by + 6]], H('#2a2a30'));
    for (let i = 0; i < 4; i++) R.poligono([[bx + 12 + i * 8, by + 7], [bx + 16 + i * 8, by + 7 - Math.round(ab * (i + 1) / 5)], [bx + 18 + i * 8, by + 10 - Math.round(ab * (i + 1) / 5)], [bx + 14 + i * 8, by + 10]], BL);
    for (let i = 0; i < 4; i++) R.rect(bx + 13 + i * 6, by + 18, bx + 16 + i * 6, by + 20, BL); }
  if (fase >= 0) { const y = y1 - 4; R.rect(x0 + 50, y - 7, x1 - 4, y, H('#1a1a1e')); R.numero('5,000,000', x1 - 6 - 40, y - 1, { fina: true, color: H('#ffe060'), sombra: false }); }
};
const p4 = (t) => {
  salon();
  // la tele plana de la pared
  R.rect(52, 30, 176, 102, K); R.rect(53, 31, 175, 101, H('#1a1a1e')); pantallaDoc(56, 34, 172, 98, t); R.rect(106, 102, 120, 108, H('#2a2a30'));
  if (t > check) for (let y = 34; y <= 98; y++) for (let x = 124; x <= 172; x++) if (((x + y * 0.7) % 50) < 3) tinta(x, y, BL, 0.18);
  // el reflejo de la tele sobre el suelo y la luz que cambia en la pared
  if (t > check) { const c = t < forums ? H('#f0a85a') : t < magazines ? H('#5a7ae0') : t < docs ? H('#e84a4a') : H('#f0d060'); for (let y = 137; y < 150; y++) for (let x = 60; x < 176; x += 1) if ((x + y) % 2 === 0) tinta(x, y, c, 0.12); }
  // el padre con el mando enciende la tele; la madre se encoge de hombros; el hijo sujeta el globo
  const PAD = 224, MAD = 252, HIJ = 280;
  const SEN = 131; const mp = R.actor(EL.publico2014, PAD, SEN, t, { dir: -1, sostiene: t < check + 0.6 ? [PAD - 4, SEN - 22] : false, dedo: t > legend2 && t < legend2 + 0.9, habla: t > legend2 && t < forums && parp(t, 8), sonrisa: t > docs });
  if (t < check + 0.6) { const [hx, hy] = mp.mano; R.rect(hx - 6, hy - 2, hx, hy + 1, K); R.rect(hx - 5, hy - 1, hx - 1, hy, H('#3a3a44')); if (t > nobody && t < nobody + 0.3) { R.pset(hx - 7, hy - 1, H('#ff3a3a')); R.linea(hx - 8, hy - 1, hx - 14, hy - 4, H('#ff9a9a')); } }
  R.actor(EL.publico2014b, MAD, SEN, t, { dir: -1, brazos: t > check && t < check + 0.6, sorpresa: t > forums && t < forums + 0.5, sonrisa: t > docs + 0.3 });
  const mh = R.actor(EL.nino85, HIJ, SEN, t, { dir: -1, sostiene: [HIJ + 4, SEN - 26], sorpresa: t > docs - 0.1 && t < docs + 0.8, sonrisa: t > magazines && t < docs - 0.1 });
  // el asiento y el brazo del sofá van delante de la familia
  R.rect(212, 128, 318, 152, K); R.rect(213, 129, 317, 151, H('#9a4440')); R.rect(213, 129, 317, 131, H('#b85a54')); for (let x = 240; x < 317; x += 26) R.rect(x, 131, x, 151, H('#7a3430')); R.rect(213, 152, 216, 158, H('#3a2414')); R.rect(312, 152, 315, 158, H('#3a2414'));
  R.rect(206, 112, 218, 152, K); R.rect(207, 113, 217, 151, H('#a04a46')); R.rect(207, 113, 217, 116, H('#c06a62'));
  // el perro en la alfombra que mueve la cola (y levanta la cabeza a «documentaries»)
  { const dx = 150, dy = 168, c = H('#d8a868'), cs = H('#a8743c'); R.rect(dx - 14, dy - 7, dx + 6, dy, K); R.rect(dx - 13, dy - 6, dx + 5, dy - 1, c); R.rect(dx - 13, dy - 2, dx + 5, dy - 1, cs); const up = t > docs ? 4 : 0;
    R.rect(dx + 4, dy - 9 - up, dx + 12, dy - 2 - up, K); R.rect(dx + 5, dy - 8 - up, dx + 11, dy - 3 - up, c); R.pset(dx + 12, dy - 5 - up, K); R.pset(dx + 9, dy - 7 - up, K); R.rect(dx + 5, dy - 9 - up, dx + 6, dy - 6 - up, cs);
    const cola = Math.sin(t * 14) > 0; R.linea(dx - 14, dy - 5, dx - 20, dy - (cola ? 10 : 2), cs); R.linea(dx - 13, dy - 5, dx - 19, dy - (cola ? 10 : 2), cs); }
  // el globo del 5,000,000, enorme y tenso, que crece con cada repetición
  const rep = [legend2, forums, magazines, docs].filter((v) => t > v).length, r = 32 + rep * 2;
  globo(t, 230, 62, r, '5,000,000', mh.mano[0], mh.mano[1], { fina: true, tenso: rep >= 3 });
  // la mesita baja con el cuenco de palomitas
  R.rect(84, 150, 140, 156, K); R.rect(85, 151, 139, 155, H('#6a4a30')); R.rect(88, 156, 90, 166, H('#4a3020')); R.rect(134, 156, 136, 166, H('#4a3020'));
  R.disco(112, 148, 7, K); R.disco(112, 148, 6, H('#c8302a')); for (let k = 0; k < 8; k++) R.disco(107 + (k % 4) * 3, 143 + Math.floor(k / 4) * 2, 1, H('#fff4d0'));
};

const efectos = [[0.3, 'publico'], [explic, 'aviso'], [explic + 0.85, 'puerta'], [filled, 'vapor'], [gap + 0.2, 'boing'],
  [P2 + 0.65, 'papel'], [story + 0.05, 'vapor'], [growing + 0.05, 'vapor'], [millions + 0.05, 'boing'], [copies, 'pop'],
  [P3 + 0.1, 'tecleo'], [buried + 0.05, 'bip'], [shame + 0.05, 'vapor'], [sank + 0.05, 'bip'], [industry + 0.05, 'boing'],
  [nobody + 0.05, 'bip'], [forums + 0.05, 'bip'], [magazines + 0.05, 'bip'], [docs + 0.05, 'bip'], [docs + 0.5, 'vapor']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < P2 ? 1983 : t < P3 ? 1994 : t < P4 ? 2004 : 2012) });
''')
