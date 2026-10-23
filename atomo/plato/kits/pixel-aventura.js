// Kit «pixel aventura»: el pixel retro del canal (pixel-retro.js) con personajes de aventura gráfica clásica: caras
// legibles, ropa de colores, contorno oscuro y animación (andar, parpadear, hablar). Inspirado en el aspecto de las
// aventuras de LucasArts de principios de los 90 (sin copiar personajes).
//
//   import { crearAventura } from '/atomo/plato/kits/pixel-aventura.js';
//   const R = await crearAventura(lienzo);   // todo lo de crearRetro, más PALA, personaje(), retrato()
//
// Lienzo igual que pixel-retro: 320 × 180 escalado ×6. Las paletas nocturnas del estilo 17 siguen para el cielo y el
// mar; los personajes, los interiores y los acentos usan las rampas de PALA (3–4 tonos por material, luz por la
// izquierda, contorno #140a1a).
import { crearRetro, pal, hex } from '/atomo/plato/kits/pixel-retro.js';

export const PALA = {
  CONTORNO: hex('#140a1a'),
  PIEL: pal(['#7a3e2e', '#b86a48', '#e09a70', '#f6c89c']),
  PIEL_OSCURA: pal(['#3e2018', '#6a3a26', '#9a5a3a', '#c4845a']),
  PELO_CASTANO: pal(['#2e1a10', '#5a3418', '#8a5428']),
  PELO_NEGRO: pal(['#100c16', '#26202e', '#40384c']),
  PELO_RUBIO: pal(['#7a5a18', '#c8a038', '#f0d878']),
  PELO_BLANCO: pal(['#7a7a92', '#bcbcd0', '#f2f2ff']),
  PELO_ROJO: pal(['#5a1a10', '#a03a24', '#d86a3a']),
  ROJO: pal(['#4a0e1c', '#8e1e2c', '#d03a40', '#f07a6a']),
  AZUL: pal(['#141e52', '#26409a', '#4a72d8', '#8ab0f6']),
  VERDE: pal(['#123a22', '#246a34', '#46a04a', '#8ad06a']),
  AMARILLO: pal(['#6a4a0c', '#b88818', '#e8c040', '#fae890']),
  MORADO: pal(['#2a1248', '#52287e', '#8050b8', '#b890e8']),
  BLANCO: pal(['#7a7a92', '#bcbcd0', '#e8e8f4', '#ffffff']),
  MARRON: pal(['#2e1c10', '#583820', '#8a5a34', '#b88454']),
  NEGRO: pal(['#100c14', '#221c2a', '#3a3246', '#56506a']),
  ORO: pal(['#6a4410', '#b07a18', '#e8b830', '#fff0a0']),
  TURQUESA: pal(['#0a2a3a', '#12505e', '#1e8088', '#46b8b0', '#9ae8d8']),
  SELVA: pal(['#0a1a14', '#123a24', '#1e5a30', '#3a8a3e', '#6ab84a']),
  ANTORCHA: pal(['#6a1a10', '#c84a18', '#f08a20', '#ffd040', '#fff8c0']),
  // Roma
  MARMOL: pal(['#6a5e6e', '#a89aa6', '#d8ccc8', '#f4ece2', '#ffffff']),
  BRONCE: pal(['#3e2410', '#7a4a1c', '#b8782c', '#e8b05a', '#fff0b0']),
  TERRACOTA: pal(['#4a1c14', '#86321e', '#c0582e', '#e48a52']),
  PURPURA: pal(['#2e0828', '#5a1446', '#8e2a6a', '#c45a96']),
  PIELES: pal(['#2a1a10', '#4e3220', '#7a5434', '#a88058']),
  LAUREL: pal(['#1a3a12', '#2e6a1e', '#5a9a2e', '#a0d050']),
};

export async function crearAventura(lienzo) {
  const R = await crearRetro(lienzo);
  const { pset, hash2 } = R;

  // ── Personaje de aventura ────────────────────────────────────────────────────────────────────────────────────────
  // personaje(x, suelo, h, o): x = centro, suelo = y de los pies, h = altura en px (≈ 40–70 de cuerpo entero; con h ≈
  // 150–200 y el suelo fuera de cuadro sirve de primer plano: la cara sale grande).
  // o: piel, pelo (rampa), peinado ('corto', 'largo', 'coleta', 'calvo', 'peluca', 'moño'), barba ('no', 'perilla',
  //    'poblada', 'bigote'), sombrero ('no', 'tricornio', 'pañuelo', 'corona', 'capitan', 'gorro'), chaqueta (rampa),
  //    camisa (rampa), pantalon (rampa), botas (rampa), faja (rampa o null), capa (rampa o null), capaCorta (la capa llega a la cadera), parche, pata, loro,
  //    pose ('pie', 'senala', 'brazos', 'ofrece', 'rodilla', 'manos_cintura', 'saluda'), dir (1 mira a la derecha),
  //    anda (fase en radianes: ciclo de paso) , t (para parpadear y respirar), habla (0–1: la boca se abre),
  //    objeto ('libro', 'espada', 'pergamino', 'saco', 'bolsa', 'catalejo', 'farol', 'corona', 'gladio').
  // Ropa romana: falda (rampa: túnica o toga hasta la rodilla; largoFalda en fracción de h), pteruges (rampa: tiras
  //    de cuero de la armadura), banda (rampa: la franja de la toga en diagonal), antebrazo (rampa: brazos desnudos con
  //    la piel), sandalias (true: espinilla desnuda y sandalia), sombrero 'casco' (bronce con cresta, colorCresta),
  //    'laurel' (corona de hojas; colorLaurel), 'diadema'; tamSombrero agranda la corona (la del emperador niño).
  // Regla del pelo: el pelo va solo arriba y detrás de la cabeza; nunca baja por la frente hasta los ojos ni cae por
  //    delante de la cara. Los ojos, las cejas y la boca se pintan al final, encima de todo.
  const personaje = (cx, suelo, h, o = {}) => {
    const t = o.t ?? 0, dir = o.dir ?? 1;
    const W2 = Math.ceil(h * 1.1) + 12, H2 = Math.ceil(h * 1.3) + 8;
    const col = new Uint32Array(W2 * H2), ramp = new Array(W2 * H2), lvl = new Float32Array(W2 * H2);
    const ox = Math.round(W2 / 2), oy = H2 - 3;
    // dibuja un píxel de una rampa con un nivel (0 sombra … n−1 luz); z: capas posteriores pisan
    const put = (x, y, rp, v) => {
      const X = Math.round(ox + x * dir), Y = Math.round(oy + y);
      if (X < 0 || X >= W2 || Y < 0 || Y >= H2) return;
      const k = Y * W2 + X; ramp[k] = rp; lvl[k] = v; col[k] = 1;
    };
    const elipse = (cx_, cy_, rx, ry, rp, v = 1.5) => { for (let y = -ry; y <= ry; y += 0.5) for (let x = -rx; x <= rx; x += 0.5) if ((x / rx) ** 2 + (y / ry) ** 2 <= 1) put(cx_ + x, cy_ + y, rp, v); };
    const caja = (x0, y0, x1, y1, rp, v = 1.5) => { for (let y = y0; y <= y1; y += 0.5) for (let x = x0; x <= x1; x += 0.5) put(x, y, rp, v); };
    const trazo = (x0, y0, x1, y1, g, rp, v = 1.5) => {
      const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 2));
      for (let k = 0; k <= n; k++) { const x = x0 + (x1 - x0) * k / n, y = y0 + (y1 - y0) * k / n; for (let a = -g / 2; a <= g / 2; a += 0.5) for (let b = -g / 2; b <= g / 2; b += 0.5) put(x + a, y + b, rp, v); }
    };
    const P = {
      piel: o.piel ?? PALA.PIEL, pelo: o.pelo ?? PALA.PELO_CASTANO, chaqueta: o.chaqueta ?? PALA.AZUL, camisa: o.camisa ?? PALA.BLANCO,
      pantalon: o.pantalon ?? PALA.MARRON, botas: o.botas ?? PALA.NEGRO,
    };
    const respira = Math.sin(t * 2.2) > 0.6 ? -0.5 : 0;
    const rod = o.pose === 'rodilla', sent = o.pose === 'sentado';
    const cab = h * 0.11, cuelloY = -h * (sent ? 0.6 : rod ? 0.64 : 0.78) + respira, hombroY = cuelloY + cab * 0.35;
    const caderaY = -h * (sent ? 0.24 : rod ? 0.3 : 0.42), anchoH = h * 0.15, anchoC = h * 0.12;
    const pierna = h * 0.1;
    // ── piernas y botas
    const an = o.anda != null ? Math.sin(o.anda) : 0, an2 = o.anda != null ? Math.cos(o.anda) : 0;
    const piernas = sent
      ? [[-anchoC * 0.45, caderaY, h * 0.12, caderaY + h * 0.01, h * 0.14, 0], [anchoC * 0.45, caderaY, h * 0.2, caderaY + h * 0.01, h * 0.22, 0]]
      : rod
      ? [[-anchoC * 0.45, caderaY, -h * 0.2, -h * 0.05, -h * 0.3, 0], [anchoC * 0.45, caderaY, h * 0.16, caderaY + h * 0.02, h * 0.16, 0]]
      : [[-anchoC * 0.45, caderaY, -anchoC * 0.45 + an * h * 0.08, -h * 0.22 + Math.max(0, -an2) * h * 0.02, -anchoC * 0.45 + an * h * 0.14, 0],
         [anchoC * 0.45, caderaY, anchoC * 0.45 - an * h * 0.08, -h * 0.22 + Math.max(0, an2) * h * 0.02, anchoC * 0.45 - an * h * 0.14, 0]];
    piernas.forEach(([x0, y0, x1, y1, x2, y2], i) => {
      const esPata = o.pata && i === 1;
      trazo(x0, y0, x1, y1, pierna, P.pantalon, 1.4);
      if (esPata) trazo(x1, y1, x2, y2 - 1, Math.max(1.5, pierna * 0.35), PALA.MARRON, 2);
      else {
        trazo(x1, y1 + h * 0.06, x2, y2 - h * 0.03, pierna * 0.9, o.sandalias ? P.pantalon : P.botas, 1);
        caja(x2 - pierna * 0.45, y2 - h * 0.035, x2 + pierna * 0.8, y2, o.sandalias ? PALA.MARRON : P.botas, 1);
        if (o.sandalias) caja(x2 - pierna * 0.4, y2 - h * 0.075, x2 + pierna * 0.4, y2 - h * 0.06, PALA.MARRON, 1.6);
      }
    });
    // ── capa (detrás del cuerpo)
    if (o.capa) {
      const vuelo = Math.sin(t * 1.8) * h * 0.02;
      for (let y = hombroY; y <= (o.capaCorta ? caderaY + h * 0.06 : rod ? -2 : -h * 0.06); y += 0.5) {
        const f = (y - hombroY) / (h * 0.75);
        const w = anchoH * (1.05 + f * 0.6);
        for (let x = -w - vuelo * f; x <= w * 0.9; x += 0.5) put(x, y, o.capa, 1.2 + (x < 0 ? 0 : 0.3));
      }
      if (o.armiño) for (let x = -anchoH * 1.2; x <= anchoH * 1.1; x += 0.5) for (let y = hombroY - 1; y <= hombroY + h * 0.05; y += 0.5) put(x, y, PALA.BLANCO, (Math.round(x * 2 + y * 3) % 5 === 0) ? 0 : 2.5);
    }
    // ── falda de túnica o toga (y las tiras de cuero de la armadura)
    if (o.falda) {
      const y1 = caderaY + h * (o.largoFalda ?? 0.24);
      for (let y = caderaY - h * 0.02; y <= y1; y += 0.5) {
        const f = (y - caderaY) / (y1 - caderaY), w = anchoC * (1.15 + 0.35 * Math.max(0, f)) + Math.abs(an) * h * 0.03 * f;
        for (let x = -w; x <= w; x += 0.5) put(x, y, o.falda, 1.5 + (Math.round(x * 2 / Math.max(1, h * 0.06)) % 2 ? -0.4 : 0));
      }
    }
    if (o.pteruges) {
      const n = 5, w = anchoC * 1.25, y1 = caderaY + h * 0.17;
      for (let k = 0; k < n; k++) { const x = -w + (k + 0.5) * 2 * w / n; caja(x - w / n * 0.7, caderaY, x + w / n * 0.7, y1, o.pteruges, 1.6); }
    }
    // ── tronco: camisa, chaqueta abierta, faja
    for (let y = hombroY; y <= caderaY + h * 0.04; y += 0.5) {
      const f = (y - hombroY) / (caderaY - hombroY);
      const w = anchoH * (1 - f * 0.22);
      for (let x = -w; x <= w; x += 0.5) {
        const abierta = Math.abs(x) < w * 0.32 && f < 0.85;
        put(x, y, abierta ? P.camisa : P.chaqueta, abierta ? 2 : 1.6);
      }
    }
    if (o.chaqueta_larga !== false) for (let y = caderaY; y <= caderaY + h * 0.14; y += 0.5) { const w = anchoH * 0.8; for (let x = -w; x <= -w * 0.3; x += 0.5) put(x, y, P.chaqueta, 1.2); for (let x = w * 0.3; x <= w; x += 0.5) put(x, y, P.chaqueta, 1.2); }
    for (let y = caderaY - h * 0.035; y <= caderaY + h * 0.01; y += 0.5) for (let x = -anchoH * 0.8; x <= anchoH * 0.8; x += 0.5) put(x, y, o.faja ?? PALA.MARRON, 1.8);
    if (o.faja) { trazo(anchoH * 0.5, caderaY, anchoH * 0.7, caderaY + h * 0.1, 1.5, o.faja, 1.5); }
    caja(-1, caderaY - h * 0.03, 1, caderaY - h * 0.005, PALA.ORO, 2);
    if (o.capa === PALA.PIELES) for (let x = -anchoH * 1.15; x <= anchoH * 1.05; x += 0.5) for (let y = hombroY - h * 0.02; y <= hombroY + h * 0.045; y += 0.5) put(x, y, PALA.PIELES, (Math.round(x * 2 + y * 5) % 4 === 0) ? 1 : 2.4);   // cuello de pieles
    if (o.banda) trazo(-anchoH * 0.85, hombroY, anchoH * 0.7, caderaY + h * 0.02, Math.max(1.5, h * 0.05), o.banda, 1.8);
    // ── brazos
    const brazo = (lado, pose) => {
      const sx = lado * anchoH * 0.92, sy = hombroY + h * 0.025;
      const L1 = h * 0.16, L2 = h * 0.16;
      let ex, ey, hx, hy;
      const balanceo = o.anda != null ? Math.sin(o.anda + (lado > 0 ? Math.PI : 0)) * 0.35 : 0;
      switch (pose) {
        case 'senala': ex = sx + lado * L1 * 0.8; ey = sy + L1 * 0.25; hx = ex + lado * L2; hy = ey - L2 * 0.15; break;
        case 'arriba': ex = sx + lado * L1 * 0.35; ey = sy - L1 * 0.85; hx = ex + lado * L2 * 0.15; hy = ey - L2; break;
        case 'ofrece': ex = sx + lado * L1 * 0.55; ey = sy + L1 * 0.75; hx = ex + lado * L2 * 0.95; hy = ey - L2 * 0.1; break;
        case 'cintura': ex = sx + lado * L1 * 0.7; ey = sy + L1 * 0.6; hx = sx + lado * anchoH * 0.2; hy = caderaY - h * 0.02; break;
        case 'cara': ex = sx + lado * L1 * 0.7; ey = sy + L1 * 0.35; hx = sx + lado * L1 * 0.75; hy = hombroY - h * 0.1; break;
        case 'saluda': ex = sx + lado * L1 * 0.6; ey = sy - L1 * 0.3; hx = ex + lado * L2 * 0.3 + Math.sin(t * 12) * h * 0.04; hy = ey - L2 * 0.9; break;
        default: ex = sx + lado * h * 0.02 + balanceo * L1 * 0.4; ey = sy + L1; hx = ex + balanceo * L2 * 0.5; hy = ey + L2;
      }
      trazo(sx, sy, ex, ey, h * 0.085, P.chaqueta, 1.5);
      trazo(ex, ey, hx, hy, h * 0.075, o.antebrazo ?? P.chaqueta, 1.6);
      elipse(hx, hy + h * 0.01, h * 0.035, h * 0.035, P.piel, 2);
      return [hx, hy];
    };
    const p = o.pose ?? 'pie';
    const mD = brazo(1, o.brazoD ?? { senala: 'senala', brazos: 'arriba', ofrece: 'ofrece', rodilla: 'ofrece', saluda: 'saluda', manos_cintura: 'cintura', mide: 'cara' }[p] ?? 'abajo');
    const mI = brazo(-1, { brazos: 'arriba', manos_cintura: 'cintura' }[p] ?? o.brazoI ?? 'abajo');
    // ── cuello y cabeza
    caja(-h * 0.03, cuelloY - cab * 0.2, h * 0.03, hombroY, P.piel, 1.4);
    const hy = cuelloY - cab * 0.95, hx = cab * 0.08;
    elipse(hx, hy, cab * 0.92, cab, P.piel, 2);
    // oreja
    elipse(hx - cab * 0.15, hy + cab * 0.1, cab * 0.2, cab * 0.28, P.piel, 1.4);
    // nariz (hacia donde mira)
    elipse(hx + cab * 0.9, hy + cab * 0.15, cab * 0.18, cab * 0.22, P.piel, 2.2);
    // pelo según peinado
    const pe = o.peinado ?? 'corto';
    if (pe !== 'calvo') {
      // casquete: por delante (hacia la cara) se queda alto, lejos de cejas y ojos
      for (let y = hy - cab * 1.05; y <= hy - cab * 0.35; y += 0.5) for (let x = -cab * 0.95; x <= cab * 0.7; x += 0.5) if ((x / cab) ** 2 + ((y - hy) / cab) ** 2 <= 1.12 && (x < cab * 0.1 || y <= hy - cab * 0.62)) put(x + hx, y, P.pelo, 1.5);
      for (let y = hy - cab * 0.4; y <= hy + cab * (pe === 'largo' || pe === 'peluca' ? 1.3 : 0.4); y += 0.5) for (let x = -cab * 1.0; x <= -cab * 0.35; x += 0.5) put(x + hx, y, P.pelo, 1.3);
      if (pe === 'coleta') trazo(hx - cab, hy, hx - cab * 1.5, hy + cab * 1.2, cab * 0.35, P.pelo, 1.2);
      if (pe === 'peluca') for (let k = 0; k < 4; k++) elipse(hx - cab * 0.9, hy + k * cab * 0.45, cab * 0.32, cab * 0.25, P.pelo, 2);
      if (pe === 'rizos') for (let k = 0; k < 5; k++) elipse(hx - cab * 0.7 + k * cab * 0.3, hy - cab * 0.95 + Math.abs(k - 1.5) * cab * 0.12, cab * 0.24, cab * 0.2, P.pelo, 2);
      if (pe === 'moño') elipse(hx - cab * 0.4, hy - cab * 1.15, cab * 0.4, cab * 0.32, P.pelo, 1.6);
    }
    // barba
    const ba = o.barba ?? 'no';
    if (ba === 'poblada') for (let y = hy + cab * 0.25; y <= hy + cab * 1.25; y += 0.5) for (let x = -cab * 0.55; x <= cab * 0.95; x += 0.5) if (((x - cab * 0.2) / (cab * 0.85)) ** 2 + ((y - hy - cab * 0.5) / (cab * 0.8)) ** 2 <= 1) put(x + hx, y, P.pelo, 1.4);
    if (ba === 'perilla') elipse(hx + cab * 0.45, hy + cab * 0.95, cab * 0.25, cab * 0.32, P.pelo, 1.4);
    // sombreros
    const sb = o.sombrero ?? 'no';
    const sR = o.colorSombrero ?? PALA.NEGRO;
    if (sb === 'tricornio') {
      for (let y = hy - cab * 1.65; y <= hy - cab * 0.8; y += 0.5) { const f = (y - (hy - cab * 1.65)) / (cab * 0.85); const w = cab * (0.6 + 0.4 * Math.sqrt(f)); for (let x = -w; x <= w; x += 0.5) put(x + hx, y, sR, 1); }
      for (let x = -cab * 1.65; x <= cab * 1.65; x += 0.5) { const u = x / (cab * 1.65), yy = hy - cab * 0.8 - u * u * cab * 0.75; for (let g = 0; g < Math.max(1, cab * 0.22); g += 0.5) put(x + hx, yy - g, sR, 1.5); put(x + hx, yy - Math.max(1, cab * 0.22), PALA.ORO, 2); }
    } else if (sb === 'capitan') {
      for (let x = -cab * 1.5; x <= cab * 1.5; x += 0.5) put(x + hx, hy - cab * 0.85, sR, 1.6);
      for (let y = hy - cab * 1.9; y <= hy - cab * 0.85; y += 0.5) for (let x = -cab * 1.0; x <= cab * 1.0; x += 0.5) put(x + hx, y, sR, 1.3);
      elipse(hx + cab * 0.2, hy - cab * 1.95, cab * 0.9, cab * 0.25, PALA.BLANCO, 2.5);  // pluma
    } else if (sb === 'pañuelo') {
      for (let y = hy - cab * 1.08; y <= hy - cab * 0.45; y += 0.5) for (let x = -cab * 0.98; x <= cab * 0.9; x += 0.5) if ((x / cab) ** 2 + ((y - hy) / cab) ** 2 <= 1.15) put(x + hx, y, o.colorPañuelo ?? PALA.ROJO, 2);
      trazo(hx - cab, hy - cab * 0.5, hx - cab * 1.5, hy + cab * 0.1 + Math.sin(t * 6) * cab * 0.1, cab * 0.25, o.colorPañuelo ?? PALA.ROJO, 1.5);
    } else if (sb === 'corona') {
      // tamSombrero > 1: la corona le queda grande (más ancha y alta), pero se apoya en la frente, nunca en los ojos
      const ks = o.tamSombrero ?? 1;
      for (let y = hy - cab * (0.8 + 0.75 * ks); y <= hy - cab * 0.8; y += 0.5) for (let x = -cab * 0.85 * ks; x <= cab * 0.85 * ks; x += 0.5) {
        const pico = ((x + cab * ks) / (cab * 0.42 * ks)) % 2 < 1;
        if (y > hy - cab * (0.8 + 0.35 * ks) || pico) put(x + hx, y, PALA.ORO, 2);
      }
      for (const x of [-cab * 0.5 * ks, 0, cab * 0.5 * ks]) put(x + hx, hy - cab * (0.8 + 0.2 * ks), PALA.ROJO, 2.5);
    } else if (sb === 'casco') {
      for (let y = hy - cab * 1.25; y <= hy - cab * 0.5; y += 0.5) for (let x = -cab * 1.05; x <= cab * 0.85; x += 0.5) if ((x / (cab * 1.05)) ** 2 + ((y - hy + cab * 0.5) / (cab * 0.78)) ** 2 <= 1) put(x + hx, y, PALA.BRONCE, 2);
      caja(hx - cab * 1.1, hy - cab * 0.55, hx + cab * 0.9, hy - cab * 0.45, PALA.BRONCE, 1.4);           // visera
      caja(hx - cab * 1.15, hy - cab * 0.5, hx - cab * 0.8, hy + cab * 0.15, PALA.BRONCE, 1.4);          // cubrenuca (detrás)
      for (let x = -cab * 0.9; x <= cab * 0.7; x += 0.5) { const yy = hy - cab * 1.25 - cab * 0.5 * Math.sqrt(Math.max(0, 1 - ((x + cab * 0.1) / (cab * 0.85)) ** 2)); for (let y = yy; y <= hy - cab * 1.2; y += 0.5) put(x + hx, y, o.colorCresta ?? PALA.ROJO, 1.8); }
    } else if (sb === 'laurel' || sb === 'diadema') {
      const LR = sb === 'diadema' ? PALA.ORO : (o.colorLaurel ?? PALA.LAUREL);
      caja(hx - cab * 0.95, hy - cab * 0.72, hx + cab * 0.55, hy - cab * 0.62, LR, 1.6);
      if (sb === 'laurel') for (let k = 0; k < 6; k++) { const x = hx - cab * 0.95 + k * cab * 0.28; elipse(x, hy - cab * 0.82, cab * 0.14, cab * 0.1, LR, 2.2); }
      else put(hx + cab * 0.3, hy - cab * 0.8, PALA.ROJO, 2.5);
      trazo(hx - cab * 1.0, hy - cab * 0.65, hx - cab * 1.3, hy - cab * 0.1 + Math.sin(t * 3) * cab * 0.08, cab * 0.14, LR, 1.4);   // cintas detrás
    } else if (sb === 'gorro') {
      for (let y = hy - cab * 1.6; y <= hy - cab * 0.6; y += 0.5) for (let x = -cab * 0.95; x <= cab * 0.95 - (hy - cab * 0.6 - y) * 0.5; x += 0.5) put(x + hx, y, o.colorSombrero ?? PALA.ROJO, 1.6);
    }
    // ── objetos
    const [ax, ay] = mD;
    if (o.objeto === 'libro') { caja(ax - h * 0.02, ay - h * 0.08, ax + h * 0.09, ay + h * 0.01, PALA.ROJO, 1.6); caja(ax + h * 0.01, ay - h * 0.075, ax + h * 0.085, ay - h * 0.065, PALA.ORO, 2); }
    if (o.objeto === 'espada') trazo(ax, ay, ax + h * 0.38, ay - h * 0.22, Math.max(1, h * 0.018), PALA.BLANCO, 2.6);
    if (o.objeto === 'pergamino') caja(ax - h * 0.015, ay - h * 0.1, ax + h * 0.025, ay + h * 0.02, PALA.AMARILLO, 2.4);
    if (o.objeto === 'saco' || o.objeto === 'bolsa') elipse(ax + h * 0.02, ay + h * 0.05, h * (o.objeto === 'saco' ? 0.08 : 0.05), h * (o.objeto === 'saco' ? 0.09 : 0.055), PALA.MARRON, 1.8);
    if (o.objeto === 'catalejo') trazo(ax, ay, ax + h * 0.22, ay - h * 0.04, h * 0.035, PALA.ORO, 2);
    if (o.objeto === 'sextante') { trazo(ax, ay, ax + h * 0.08, ay + h * 0.06, h * 0.02, PALA.ORO, 2); trazo(ax, ay, ax + h * 0.1, ay - h * 0.01, h * 0.02, PALA.ORO, 2); trazo(ax + h * 0.08, ay + h * 0.06, ax + h * 0.1, ay - h * 0.01, h * 0.02, PALA.ORO, 2.5); }
    if (o.objeto === 'corona') { const c = h * 0.075; for (let x = -c; x <= c; x += 0.5) for (let y = -c * 1.1; y <= 0; y += 0.5) if (y > -c * 0.5 || ((x + c) / (c * 0.5)) % 2 < 1) put(ax + x, ay - h * 0.02 + y, PALA.ORO, 2); put(ax, ay - h * 0.02 - c * 0.3, PALA.ROJO, 2.5); }
    if (o.objeto === 'gladio') { trazo(ax, ay, ax + h * 0.02, ay - h * 0.2, Math.max(1, h * 0.025), PALA.BLANCO, 2.6); trazo(ax - h * 0.03, ay - h * 0.01, ax + h * 0.03, ay - h * 0.01, Math.max(1, h * 0.02), PALA.BRONCE, 2); }
    if (o.objeto === 'pluma') trazo(ax, ay, ax + h * 0.06, ay - h * 0.12, h * 0.02, PALA.BLANCO, 2.5);
    if (o.objeto === 'pala') { trazo(ax, ay - h * 0.1, ax + h * 0.04, ay + h * 0.25, h * 0.025, PALA.MARRON, 2); caja(ax + h * 0.01, ay + h * 0.25, ax + h * 0.08, ay + h * 0.33, PALA.BLANCO, 1); }
    // loro en el hombro (al otro lado de la cara)
    if (o.loro) {
      const lx = -anchoH * 0.85, ly = hombroY - h * 0.06, ala = Math.sin(t * 9) > 0.85;
      elipse(lx, ly, h * 0.035, h * 0.05, PALA.VERDE, 2);
      elipse(lx + h * 0.02, ly - h * 0.05, h * 0.028, h * 0.028, PALA.VERDE, 2.4);
      put(lx + h * 0.045, ly - h * 0.05, PALA.AMARILLO, 2.5);
      trazo(lx - h * 0.01, ly + h * 0.03, lx - h * 0.03, ly + h * 0.09, h * 0.02, PALA.ROJO, 1.8);
      if (ala) trazo(lx, ly, lx - h * 0.07, ly - h * 0.05, h * 0.02, PALA.AZUL, 2);
    }
    // ── sombreado por bandas: luz en el borde izquierdo de cada material, sombra en el derecho, interior liso
    const out = new Uint32Array(W2 * H2);
    const N = Math.max(1, Math.round(h * 0.022));
    for (let y = 0; y < H2; y++) for (let x = 0; x < W2; x++) {
      const k = y * W2 + x; if (!col[k]) continue;
      const rp = ramp[k];
      let dl = 0; while (dl <= N && x - dl - 1 >= 0 && col[k - dl - 1] && ramp[k - dl - 1] === rp) dl++;
      let dr = 0; while (dr <= N * 2 && x + dr + 1 < W2 && col[k + dr + 1] && ramp[k + dr + 1] === rp) dr++;
      let du = 0; while (du <= N && y - du - 1 >= 0 && col[k - (du + 1) * W2] && ramp[k - (du + 1) * W2] === rp) du++;
      let v = Math.round(lvl[k]);
      if (dl < N || du < Math.max(1, N - 1)) v += 1;
      else if (dr < N * 2) v -= 1;
      else if (dr < N * 3 && (x + y) % 2 === 0) v -= 1;   // transición tramada solo en una franja estrecha
      out[k] = rp[Math.max(0, Math.min(rp.length - 1, v))];
    }
    // contorno: píxel vacío junto a uno lleno
    for (let y = 0; y < H2; y++) for (let x = 0; x < W2; x++) {
      const k = y * W2 + x; if (col[k]) continue;
      if ((x > 0 && col[k - 1]) || (x < W2 - 1 && col[k + 1]) || (y > 0 && col[k - W2]) || (y < H2 - 1 && col[k + W2])) out[k] = PALA.CONTORNO;
    }
    // ── cara: ojos, cejas, boca (se pintan encima, escalan con la cabeza)
    const face = (x, y, c) => { const X = Math.round(ox + x * dir), Y = Math.round(oy + y); if (X >= 0 && X < W2 && Y >= 0 && Y < H2) out[Y * W2 + X] = c; };
    const ojoW = Math.max(1, Math.round(cab * 0.3)), ojoH = Math.max(1, Math.round(cab * 0.34));
    const pup = Math.max(1, Math.round(ojoW * 0.5));
    const parpadea = (t % 3.7) < 0.12;
    const ex = hx + cab * 0.42, ey = hy - cab * 0.12;
    const ojo = (x0, blanco) => {
      for (let j = 0; j < ojoH; j++) for (let i = 0; i < ojoW; i++) {
        if (parpadea) { face(x0 + i - ojoW / 2, ey + ojoH - 1, PALA.CONTORNO); continue; }
        const enPupila = i >= ojoW - pup && j >= Math.floor((ojoH - pup) / 2) && j < Math.floor((ojoH - pup) / 2) + pup;
        face(x0 + i - ojoW / 2, ey + j, ojoW === 1 ? PALA.CONTORNO : enPupila ? PALA.CONTORNO : blanco);
      }
      if (cab >= 10 && !parpadea) face(x0 + ojoW / 2 - pup, ey + Math.floor((ojoH - pup) / 2), PALA.BLANCO[3]);  // brillo
    };
    ojo(ex, PALA.BLANCO[3]);
    if (cab >= 7) ojo(ex - cab * 0.5, PALA.BLANCO[2]);
    if (cab >= 7) for (let k = 0; k < Math.max(1, cab * 0.12); k++) face(hx + cab * 0.98, hy + cab * 0.32 + k, P.piel[0]);  // sombra de la nariz
    if (o.parche) { for (let j = -1; j <= ojoH; j++) for (let i = -1; i <= ojoW; i++) face(ex + i - ojoW / 2, ey + j, PALA.NEGRO[0]); for (let k = -cab; k <= cab * 0.6; k += 0.5) face(hx + k, hy - cab * 0.55 + k * 0.25, PALA.NEGRO[0]); }
    const ceja = o.ceño ? 0.15 : 0, gc = Math.max(1, Math.round(cab * 0.1));
    for (const x0 of cab >= 7 ? [ex, ex - cab * 0.5] : [ex]) for (let i = -1; i <= ojoW; i++) for (let g = 0; g < gc; g++) face(x0 + i - ojoW / 2, ey - Math.max(1, cab * 0.16) - g + (o.ceño && i === -1 ? 1 : 0), P.pelo[0]);
    const bocaY = hy + cab * 0.5, bocaX = hx + cab * 0.48;
    const abre = o.habla ? (Math.sin(t * 17) * Math.sin(t * 7) > 0.1 ? o.habla : 0) : 0;
    const bw = Math.max(1, Math.round(cab * 0.35));
    const bh = Math.max(1, Math.round(cab * 0.08));
    for (let i = 0; i < bw; i++) for (let g = 0; g < bh; g++) face(bocaX + i - bw / 2, bocaY + g, PALA.CONTORNO);
    if (abre > 0) for (let i = 0; i < bw; i++) for (let g = 0; g < Math.max(1, Math.round(cab * 0.2 * abre)); g++) face(bocaX + i - bw / 2, bocaY + bh + g, g === 0 ? PALA.CONTORNO : PALA.ROJO[1]);
    if (o.sonrisa && !abre) { face(bocaX - bw / 2 - 1, bocaY - 1, PALA.CONTORNO); face(bocaX + bw / 2, bocaY - 1, PALA.CONTORNO); }
    if (ba === 'bigote' || ba === 'poblada' || ba === 'perilla') for (let i = -1; i <= bw; i++) face(bocaX + i - bw / 2, bocaY - 1, P.pelo[1]);
    // ── al lienzo
    const X0 = Math.round(cx - ox), Y0 = Math.round(suelo - oy);
    for (let y = 0; y < H2; y++) for (let x = 0; x < W2; x++) { const c = out[y * W2 + x]; if (c) pset(X0 + x, Y0 + y, c); }
    return { cabeza: [cx + hx * dir, suelo + hy], mano: [cx + mD[0] * dir, suelo + mD[1]], manoI: [cx + mI[0] * dir, suelo + mI[1]] };
  };

  // antorcha de pared con su luz
  const antorcha = (x, y, t) => {
    const fl = 0.5 + 0.5 * Math.sin(t * 19 + x) * Math.sin(t * 7 + y);
    R.halo(x, y - 4, 26 + fl * 3, [PALA.ANTORCHA[0], PALA.ANTORCHA[1]], 0.8);
    R.rect(x - 1, y, x + 1, y + 8, PALA.MARRON[1]); R.rect(x - 2, y, x + 2, y + 1, PALA.MARRON[2]);
    for (let k = 0; k < 7; k++) { const hh = 3 + 5 * hash2(k, Math.floor(t * 14)); R.linea(x - 2 + (k % 5), y - 1, x - 2 + (k % 5), y - 1 - hh * (1 - Math.abs(k % 5 - 2) / 3), k % 2 ? PALA.ANTORCHA[3] : PALA.ANTORCHA[2]); }
    pset(x, y - 6 - Math.round(fl * 2), PALA.ANTORCHA[4]);
  };

  // ── más color en el cielo y el mar de la noche: resplandor morado en el horizonte y crestas turquesa
  const cielo0 = R.cielo, mar0 = R.mar;
  const cielo = (t, o = {}) => {
    cielo0(t, o);
    if (o.morado === false) return;
    const hor = o.hor ?? 121;
    for (let y = Math.round(hor * 0.6); y < Math.min(hor, R.H); y++) for (let x = 0; x < R.W; x++) {
      const f = (y - hor * 0.6) / (hor * 0.4);
      if (o.luna && Math.hypot(x - o.luna[0], y - o.luna[1]) < o.luna[2] + 2) continue;
      if (f * 0.8 > R.b4(x, y) + 0.15) pset(x, y, f > 0.75 ? PALA.MORADO[1] : PALA.MORADO[0]);
    }
  };
  const mar = (t, o = {}) => {
    mar0(t, o);
    const hor = o.hor ?? 121, y1 = o.y1 ?? R.H;
    for (let y = hor + 1; y < y1; y++) for (let x = 0; x < R.W; x++) if (Math.sin(x * 0.13 + y * 0.8 - t * 2.6) * Math.sin(x * 0.05 - t) > 0.72) pset(x, y, PALA.TURQUESA[y > hor + 30 ? 3 : 2]);
  };
  // estandarte colgado de la pared
  const estandarte = (x, y, w, h, rampa, t) => {
    const s = Math.round(Math.sin(t * 1.3 + x) * 0.6);
    R.rect(x - 1, y - 1, x + w + 1, y, PALA.ORO[2]);
    for (let j = 0; j < h; j++) { const o_ = j > h * 0.5 ? s : 0; R.rect(x + o_, y + j, x + w + o_, y + j, rampa[2]); R.pset(x + o_, y + j, rampa[3]); R.pset(x + w + o_, y + j, rampa[1]); }
    R.poligono([[x + s, y + h], [x + w / 2 + s, y + h + w * 0.5], [x + w + s + 1, y + h]], rampa[2]);
    R.rect(x + w * 0.3 + s, y + h * 0.3, x + w * 0.7 + s, y + h * 0.45, PALA.ORO[2]);
  };

  return { ...R, PALA, personaje, antorcha, cielo, mar, estandarte, ELENCO };
}

// ── El elenco del episodio (para que cada personaje sea siempre el mismo)
export const ELENCO = {
  sharp: { sombrero: 'tricornio', barba: 'poblada', pelo: PALA.PELO_NEGRO, chaqueta: PALA.AZUL, faja: PALA.ROJO, loro: true },
  rey: { sombrero: 'corona', peinado: 'peluca', pelo: PALA.PELO_BLANCO, chaqueta: PALA.MORADO, capa: PALA.ROJO, armiño: true, pantalon: PALA.BLANCO },
  reina: { sombrero: 'corona', peinado: 'peluca', pelo: PALA.PELO_ROJO, chaqueta: PALA.BLANCO, capa: PALA.AZUL, armiño: true, pantalon: PALA.BLANCO, camisa: PALA.AMARILLO },
  oficial: { sombrero: 'capitan', peinado: 'coleta', pelo: PALA.PELO_CASTANO, chaqueta: PALA.AMARILLO, barba: 'bigote', pantalon: PALA.ROJO },
  casaca: { sombrero: 'tricornio', peinado: 'peluca', pelo: PALA.PELO_BLANCO, chaqueta: PALA.ROJO, pantalon: PALA.BLANCO },
  drake: { sombrero: 'capitan', barba: 'perilla', pelo: PALA.PELO_ROJO, chaqueta: PALA.NEGRO, camisa: PALA.BLANCO, faja: PALA.ORO, pantalon: PALA.NEGRO },
  piloto: { sombrero: 'gorro', colorSombrero: PALA.MARRON, barba: 'bigote', pelo: PALA.PELO_NEGRO, piel: PALA.PIEL_OSCURA, chaqueta: PALA.MARRON, camisa: PALA.AMARILLO },
  colon: { sombrero: 'gorro', colorSombrero: PALA.ROJO, peinado: 'largo', pelo: PALA.PELO_BLANCO, chaqueta: PALA.VERDE, camisa: PALA.AMARILLO, capa: PALA.ROJO },
  sabio1: { sombrero: 'gorro', colorSombrero: PALA.NEGRO, barba: 'poblada', pelo: PALA.PELO_BLANCO, chaqueta: PALA.NEGRO, camisa: PALA.BLANCO, pantalon: PALA.NEGRO },
  sabio2: { sombrero: 'gorro', colorSombrero: PALA.MORADO, barba: 'perilla', pelo: PALA.PELO_CASTANO, chaqueta: PALA.MORADO, pantalon: PALA.NEGRO },
  griego: { peinado: 'corto', pelo: PALA.PELO_BLANCO, barba: 'poblada', chaqueta: PALA.BLANCO, camisa: PALA.BLANCO, pantalon: PALA.BLANCO, botas: PALA.MARRON, capa: PALA.AZUL },
  marinero: { sombrero: 'pañuelo', colorPañuelo: PALA.ROJO, pelo: PALA.PELO_CASTANO, chaqueta: PALA.AZUL, camisa: PALA.BLANCO },
  navegante: { sombrero: 'tricornio', pelo: PALA.PELO_RUBIO, peinado: 'coleta', chaqueta: PALA.VERDE, faja: PALA.AMARILLO },
  pirata1: { sombrero: 'pañuelo', colorPañuelo: PALA.VERDE, pelo: PALA.PELO_ROJO, barba: 'perilla', chaqueta: PALA.ROJO },
  pirata2: { sombrero: 'pañuelo', colorPañuelo: PALA.AZUL, piel: PALA.PIEL_OSCURA, pelo: PALA.PELO_NEGRO, chaqueta: PALA.AMARILLO, parche: true },
  pirata3: { sombrero: 'gorro', colorSombrero: PALA.MORADO, pelo: PALA.PELO_RUBIO, chaqueta: PALA.VERDE },
  pirataPata: { sombrero: 'pañuelo', colorPañuelo: PALA.ROJO, barba: 'poblada', pelo: PALA.PELO_CASTANO, chaqueta: PALA.MORADO, pata: true },
  capitanPirata: { sombrero: 'tricornio', colorSombrero: PALA.ROJO, barba: 'bigote', pelo: PALA.PELO_NEGRO, chaqueta: PALA.ROJO, faja: PALA.AMARILLO, capa: PALA.NEGRO },
  polinesio: { peinado: 'moño', pelo: PALA.PELO_NEGRO, piel: PALA.PIEL_OSCURA, chaqueta: PALA.ROJO, camisa: PALA.PIEL_OSCURA, pantalon: PALA.AMARILLO, botas: PALA.PIEL_OSCURA, chaqueta_larga: false },
  anciano: { peinado: 'moño', pelo: PALA.PELO_BLANCO, barba: 'poblada', piel: PALA.PIEL_OSCURA, chaqueta: PALA.VERDE, camisa: PALA.PIEL_OSCURA, pantalon: PALA.AMARILLO, botas: PALA.PIEL_OSCURA, chaqueta_larga: false },
  nino: { peinado: 'corto', pelo: PALA.PELO_NEGRO, piel: PALA.PIEL_OSCURA, chaqueta: PALA.AZUL, camisa: PALA.PIEL_OSCURA, pantalon: PALA.ROJO, botas: PALA.PIEL_OSCURA, chaqueta_larga: false },
  harrison: { peinado: 'corto', pelo: PALA.PELO_CASTANO, chaqueta: PALA.MARRON, camisa: PALA.BLANCO, pantalon: PALA.MARRON, faja: PALA.AMARILLO },
  harrisonViejo: { peinado: 'peluca', pelo: PALA.PELO_BLANCO, chaqueta: PALA.MARRON, camisa: PALA.BLANCO, pantalon: PALA.MARRON },
  astronomo: { sombrero: 'gorro', colorSombrero: PALA.AZUL, peinado: 'peluca', pelo: PALA.PELO_BLANCO, chaqueta: PALA.AZUL, capa: PALA.MORADO },
  lord1: { peinado: 'peluca', pelo: PALA.PELO_BLANCO, chaqueta: PALA.ROJO },
  lord2: { peinado: 'peluca', pelo: PALA.PELO_BLANCO, chaqueta: PALA.NEGRO },
  // ── Roma (episodio 5): túnica o toga con falda, brazos desnudos, sandalias
  emperadorNino: { sombrero: 'corona', tamSombrero: 1.35, peinado: 'rizos', pelo: PALA.PELO_RUBIO, chaqueta: PALA.MARMOL, camisa: PALA.MARMOL, falda: PALA.MARMOL, largoFalda: 0.36, banda: PALA.PURPURA, capa: PALA.PURPURA, antebrazo: PALA.PIEL, pantalon: PALA.PIEL, sandalias: true, chaqueta_larga: false, faja: PALA.ORO },
  odoacro: { peinado: 'largo', pelo: PALA.PELO_ROJO, barba: 'poblada', chaqueta: PALA.ROJO, camisa: PALA.ROJO, pantalon: PALA.AZUL, botas: PALA.PIELES, capa: PALA.PIELES, capaCorta: true, faja: PALA.BRONCE, chaqueta_larga: false, antebrazo: PALA.PIEL },
  senador: { peinado: 'corto', pelo: PALA.PELO_BLANCO, chaqueta: PALA.MARMOL, camisa: PALA.MARMOL, falda: PALA.MARMOL, largoFalda: 0.36, banda: PALA.PURPURA, antebrazo: PALA.PIEL, pantalon: PALA.PIEL, sandalias: true, chaqueta_larga: false, faja: PALA.MARMOL },
  ciudadano: { peinado: 'corto', pelo: PALA.PELO_CASTANO, chaqueta: PALA.TERRACOTA, camisa: PALA.TERRACOTA, falda: PALA.TERRACOTA, antebrazo: PALA.PIEL, pantalon: PALA.PIEL, sandalias: true, chaqueta_larga: false, faja: PALA.MARRON },
  legionario: { sombrero: 'casco', pelo: PALA.PELO_NEGRO, chaqueta: PALA.BRONCE, camisa: PALA.BRONCE, falda: PALA.ROJO, largoFalda: 0.2, pteruges: PALA.MARRON, capa: PALA.ROJO, antebrazo: PALA.PIEL, pantalon: PALA.PIEL, sandalias: true, chaqueta_larga: false, faja: PALA.MARRON },
  cesar: { sombrero: 'laurel', peinado: 'corto', pelo: PALA.PELO_CASTANO, chaqueta: PALA.MARMOL, camisa: PALA.MARMOL, falda: PALA.MARMOL, largoFalda: 0.36, banda: PALA.PURPURA, capa: PALA.PURPURA, antebrazo: PALA.PIEL, pantalon: PALA.PIEL, sandalias: true, chaqueta_larga: false, faja: PALA.ORO },
  barbaro: { peinado: 'largo', pelo: PALA.PELO_RUBIO, barba: 'bigote', chaqueta: PALA.VERDE, camisa: PALA.VERDE, pantalon: PALA.MARRON, botas: PALA.PIELES, capa: PALA.PIELES, capaCorta: true, chaqueta_larga: false, antebrazo: PALA.PIEL },
};
