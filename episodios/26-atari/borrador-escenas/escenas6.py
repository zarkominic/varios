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
  const r = tramo(t, elpaso - 0.1, elpaso + 0.9);
  if (r > 0) R.ruta(ruta, r, H('#c8302a'));
  if (r >= 1) for (let k = 0; k < 3; k++) { const v = ((t - elpaso - 0.9) * 0.45 + k / 3) % 1; let L = 0; const seg = []; for (let i = 1; i < ruta.length; i++) { const l = Math.hypot(ruta[i][0] - ruta[i - 1][0], ruta[i][1] - ruta[i - 1][1]); seg.push(l); L += l; }
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
  [alamo + 0.3, 'golpecito'], [desierto + 0.1, 'pop'], [planta + 0.4, 'golpecito'], [elpaso, 'lapiz'],
  [P3 + 0.1, 'motor'], [reported, 'flash'], [truck2 + 0.15, 'flash'],
  [P4 + 0.05, 'motor'], [crushed + 0.08, 'chof'], [salta, 'boing'], [huye + 0.1, 'whoosh'], [fuera, 'pop'], [covered + 0.6, 'burbujas']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1983 });
''')
