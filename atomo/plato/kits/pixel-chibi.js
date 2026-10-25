// Kit «pixel chibi»: el estilo canónico del canal desde la muestra del Pireo (atomo/plato/escenas/px-chibi-muestra.html,
// guía en episodios/GUIA-ESTILO.md). Personajes cabezones dibujados píxel a píxel como rejillas de letras (no por
// código), con caras expresivas; colores planos (un tono de luz y uno de sombra por pieza), contorno #1c1222 y nada de
// ruido ni tramas.
//
//   import { crearChibi, ELENCO_CHIBI, COL } from '/atomo/plato/kits/pixel-chibi.js';
//   const R = await crearChibi(lienzo);       // todo lo de crearRetro, más dibujo(), actor(), busto(), nube()…
//   R.actor(ELENCO_CHIBI.socrates, 126, 145, t, { dedo: true, habla: true });
//
// Lienzo igual que pixel-retro: 320 × 180 escalado ×6. Los personajes miden unos 26–28 px (cabeza de 13–14 y cuerpo
// de 13–14) y se plantan con los pies en «suelo».
import { crearRetro, hex } from '/atomo/plato/kits/pixel-retro.js';

const paleta = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));

// Letras de los dibujos de personajes. Cada personaje puede cambiar cualquiera (pelo H/h, ropa C/c, etc.).
//   k contorno · S/s piel (luz/sombra) · W/w barba o pelo blanco · T/t túnica clara · B/b manto marrón · L sandalias
//   m boca abierta · H/h pelo (oscuro/brillo) · A/a túnica azul · Q/q capa roja · E blanco del ojo · o oro · G cinturón
//   (bustos del público) e ojo · C/c ropa · V velo · Z/z bronce · R penacho · P/p gorro
export const P = paleta({
  k: '#1c1222', S: '#f6c290', s: '#d48a5a', W: '#f6f6f6', w: '#b8bccc', T: '#ece0bc', t: '#bfae80', B: '#93603a', b: '#64401f',
  L: '#6a4020', m: '#7a2026', H: '#2c2232', h: '#54466a', A: '#3e74d4', a: '#2a50a0', Q: '#d24040', q: '#922828', E: '#ffffff',
  o: '#f0c040', G: '#7a4a24',
  // Egipto: N nemes azul · O oro · g oro sombra · Y turquesa · D corona roja · X/x corona blanca · J/j máscara de chacal
  // · K corona azul · U barba postiza · Z/z metal (plata) · C/c ropa · F pantalón · M/m caballo · V/v cocodrilo
  N: '#2a4fa8', O: '#e8b830', g: '#a87a18', Y: '#2aa8a0', D: '#c83a3a', X: '#f2eee2', x: '#c8c0b0', J: '#2a2430', j: '#4c4660',
  K: '#2e5aa8', U: '#2a2440', Z: '#c0c4d4', z: '#8c90a4', C: '#3a4a7a', c: '#26305a', F: '#6a5a4a', M: '#a0683a', V: '#4a8a3a', v: '#2e5a24',
});
// piel morena de los egipcios (y de los demás pueblos del Mediterráneo oriental)
export const PIEL_EG = { S: hex('#d0905e'), s: hex('#a0623a') };

// Materiales planos de los fondos (3–5 tonos cada uno, sin tramas).
export const COL = paleta({
  k: '#1c1222', cielo1: '#5cb6f2', cielo2: '#7cc6f6', cielo3: '#a2d8fa', nube: '#ffffff', nubeS: '#d2ecfc', nubeS2: '#a8d6f2',
  colina: '#94a4c8', colinaS: '#7a88b0', colinaL: '#b4c0dc', marmolL: '#f6f2ea', marmol: '#dcd6ca', marmolS: '#aaa293',
  mar1: '#2a64b0', mar2: '#3678c4', mar3: '#4f94d8', marL: '#cfe8ff', marHondo: '#1b4486', marHondo2: '#22549c',
  mad0: '#3a2214', mad1: '#5e3a1e', mad2: '#83552c', mad3: '#a8743c', mad4: '#c8955a',
  casco0: '#3c2014', casco1: '#5a3018', casco2: '#7a4422', franja: '#c83a3a', franjaS: '#8e2424',
  bronce: '#d29a34', bronceS: '#94621a', vela: '#f0e4c4', velaS: '#cbb88c', cuerda: '#b8985e',
  terra: '#c25a2c', terraL: '#e88450', terraS: '#8a3a1a', negroFig: '#2a1810', estuco: '#c9b99a',
  azulPint: '#2e5aa8', rojoPint: '#b8322e', oro: '#e8b830', hierro: '#5a5a6a', hierroL: '#8c8ca0', hierroS: '#3a3a48',
  gaviota: '#ffffff', gaviotaS: '#b8c4d4',
});

// variante de un cuerpo sin el brazo de delante (para levantarlo): borra desde la columna i0 en las filas j0–j1 y deja
// el contorno del tronco
export const sinBrazo = (filas, i0, j0 = 2, j1 = 5) => filas.map((f, j) => (j >= j0 && j <= j1 ? f.slice(0, i0) + 'k' + '.'.repeat(f.length - i0 - 1) : f));

// ── Reparto: cabeza y cuerpo de 15 px de ancho, dibujados mirando a la derecha ─────────────────────────────────────
// Campos: cab, cuerpo, brazoCol (columna del brazo de delante), altoCuerpo, altoCab (de la cabeza a los hombros),
// ojosY y bocaY (filas de la cabeza), ceja (color), mejillas ([i, j] en la cabeza), respira (sube 1 px la cabeza).
const SOCRATES = {
  cab: [
    '....kkkkkk.....',
    '..kkSSSSSSkk...',
    '.kSSSSSSSSSSk..',
    'kWWSSSSSSSSSSk.',
    'kWWSSSSSSSSSSk.',
    'kWWsSSSSSSSSSk.',
    'kWWsSSSSSSSSSSk',
    'kWWWSSSSSSSSsk.',
    '.kWWWWWWWWWWWk.',
    '.kWWWWWWWWWWWk.',
    '..kWWWWWwWWWk..',
    '..kWWWWWWWWWk..',
    '...kWWWWWWWk...',
    '....kkWWWkk....',
  ],
  cuerpo: [
    '...kkTTTTBBkk..',
    '..kTTTTTBBBBTk.',
    '.kSkTTTBBBBTkSk',
    '.kSkTTBBBBTTkSk',
    '.kSkTBBBBTTTkSk',
    '.kskBBBBTTTTksk',
    '..kkBBBTTTTTkk.',
    '...kBBTTTTTTk..',
    '...kbBttttttk..',
    '...kbbttttttk..',
    '....kkkkkkkk...',
    '.....kSk.kSk...',
    '.....kSk.kSk...',
    '....kLLk.kLLk..',
  ],
  brazoCol: 12, altoCuerpo: 14, altoCab: 13, ojosY: 5, bocaY: 9, ceja: P.w, respira: true,
};
const CIUDADANO = {
  cab: [
    '...kkkkkkkk....',
    '..kHhHHhHHhkk..',
    '.kHHhHhHHhHHHk.',
    'kHhHHHHHHHHhHk.',
    'kHHHHSSSSSSSSk.',
    'kHHHsSSSSSSSSk.',
    'kHHssSSSSSSSSSk',
    'kHHsSSSSSSSSsk.',
    '.kHSSSSSSSSSSk.',
    '.kSSSSSSSSSSk..',
    '..kSSSSSSSSsk..',
    '...kksSSSSkk...',
    '.....kkkkk.....',
  ],
  cuerpo: [
    '...kkAAAAAkk...',
    '..kQoAAAAAAAk..',
    '.kQQkAAaAAAkSk.',
    '.kQQkAAaAAAkSk.',
    '.kQqkGGGGGGkSk.',
    '.kQqkAaAAaAksk.',
    '.kqqkAaAAaAkk..',
    '.kqqkaAAaAAk...',
    '..kqkaaaaaak...',
    '...kkkkkkkk....',
    '....kSk.kSk....',
    '....kLk.kLk....',
    '...kLLk.kLLk...',
  ],
  brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: P.H, mejillas: [[10, 8], [5, 8]],
};

// ── Egipto ──────────────────────────────────────────────────────────────────────────────────────────────────────────
// cabezas de 13 filas (ojos en la 6, boca en la 9) y cuerpos de 13 (o 9 sentado)
const CAB_CORTO = [
  '...kkkkkkkk....',
  '..kHHHHHHHHk...',
  '.kHHhHHHHhHHk..',
  'kHHHHHHHHHHHHk.',
  'kHHHSSSSSSSSSk.',
  'kHHsSSSSSSSSSk.',
  'kHHssSSSSSSSSSk',
  'kHHsSSSSSSSSsk.',
  '.kHSSSSSSSSSSk.',
  '.kSSSSSSSSSSk..',
  '..kSSSSSSSSsk..',
  '...kksSSSSkk...',
  '.....kkkkk.....',
];
const CAB_CALVO = CAB_CORTO.map((f, j) => (j < 4 ? f.replace(/[Hh]/g, 'S') : f.replace(/H/g, 'S')));
const CUERPO_EG = [
  '....kkSSSkk....',
  '..kkSSSSSSSkk..',
  '.kSkSSSSSSSkSk.',
  '.kSkSsSSSsSkSk.',
  '.kSkSSSSSSSkSk.',
  '.kskTTTTTTTksk.',
  '..kkTTTTTTtkk..',
  '...kTTTTTTtk...',
  '...kTTtTTTtk...',
  '...ktttttttk...',
  '....kSk.kSk....',
  '....kSk.kSk....',
  '...kSSk.kSSk...',
];
// escriba sentado con las piernas cruzadas (el papiro se dibuja aparte, en el regazo)
const CUERPO_SENTADO = [
  '....kkSSSkk....',
  '..kkSSSSSSSkk..',
  '.kSkSSSSSSSkSk.',
  '.kSkSsSSSsSkSk.',
  '.kSkkSSSSSkkSk.',
  '.kSSkTTTTTkSSk.',
  'kTTTTTTTTTTTTTk',
  'kTTtTTTTTTTtTTk',
  '.kkkkkkkkkkkkk.',
];
// faraón: nemes a rayas azul y oro (sin tapar la cara) y barba postiza
const CAB_NEMES = [
  '....kkkkkkk....',
  '..kkNNNNNNNkk..',
  '.kOOOOOOOOOOOk.',
  'kNNNNNNNNNNNNk.',
  'kOOOOOkSSSSSSk.',
  'kNNNNkSSSSSSSk.',
  'kOOOOksSSSSSSSk',
  'kNNNNkSSSSSSsk.',
  'kOOOOkSSSSSSSk.',
  'kNNNNkSSSSSSk..',
  'kOOOOkkSSSSsk..',
  'kNNNk..kkUUk...',
  '.kkk....kUUk...',
  '.........kk....',
];
const CUERPO_FARAON = [
  '...kkYOYOYkk...',
  '..kOYOYOYOYOk..',
  '.kSkYOYOYOYkSk.',
  '.kSkSSSSSSSkSk.',
  '.kSkSsSSSsSkSk.',
  '.kskOOOOOOOksk.',
  '..kkTTOOOTTkk..',
  '...kTTOgOTtk...',
  '...kTTOgOTtk...',
  '...kttOgOttk...',
  '....kSk.kSk....',
  '....kOk.kOk....',
  '...kOOk.kOOk...',
];
// mujer egipcia: peluca negra con el flequillo por encima de las cejas, vestido blanco y collar
const CAB_EGIPCIA = [
  '...kkkkkkkk....',
  '..kHHHHHHHHk...',
  '.kHHhHHHHHHHk..',
  'kHHHHHHHHHHHHk.',
  'kHHHHSSSSSSSSk.',
  'kHHHHSSSSSSSSk.',
  'kHHHsSSSSSSSSSk',
  'kHHHSSSSSSSSsk.',
  'kHHHSSSSSSSSSk.',
  'kHHHkSSSSSSSk..',
  'kHHHkkSSSSSkk..',
  'kHHHk.kkkkk....',
  '.kkk...........',
];
const CUERPO_EGIPCIA = [
  '....kkSSSkk....',
  '..kkYOYOYOYkk..',
  '.kSkTYOYOYTkSk.',
  '.kSkTTTTTTTkSk.',
  '.kSkTTTTTTTkSk.',
  '.kskTTTtTTTksk.',
  '..kkTTTtTTTkk..',
  '...kTTTtTTTk...',
  '...kTTTtTTTk...',
  '...kTTTtTTtk...',
  '...kTTtttTtk...',
  '...kkkkkkkkk...',
  '....kSk.kSk....',
];
// sacerdote con máscara de chacal (Anubis): sin cara, ojo de oro
const CAB_CHACAL = [
  '...kk...kk.....',
  '..kJk..kJk.....',
  '..kJJk.kJJk....',
  '..kJJJkJJJJk...',
  '.kJJJJJJJJJk...',
  '.kJJJJJJJJJJk..',
  'kOJJJJJJJOJJk..',
  'kOJJJJJJJJJJJk.',
  'kOJJJJJJJJJJJJk',
  'kOJJJJJJJJJjjk.',
  'kOJJJJJJJkkkk..',
  'kOJJJJJJk......',
  '.kkkkkkk.......',
];
// extranjeros de Asia (hicsos, hititas): pelo en seta y barba
const CAB_BARBA = [
  '...kkkkkkkk....',
  '..kHHHHHHHHk...',
  '.kHHhHHHHhHHk..',
  'kHHHHHHHHHHHHk.',
  'kHHHSSSSSSSSSk.',
  'kHHHsSSSSSSSSk.',
  'kHHssSSSSSSSSSk',
  'kHHsSSSSSSSSsk.',
  'kHHHSSSSSSSSSk.',
  '.kHHHHHHHHHHk..',
  '..kHHHHHHHHk...',
  '...kHHHHHHHk...',
  '....kkHHHkk....',
];
const CUERPO_TUNICA = [
  '...kkAAAAAkk...',
  '..kAQQQQQQQAk..',
  '.kSkAAAAAAAkSk.',
  '.kSkQQQQQQQkSk.',
  '.kSkAAAAAAAkSk.',
  '.kskQQQQQQQksk.',
  '..kkAAAAAAAkk..',
  '...kQQQQQQQk...',
  '...kAAAAAAAk...',
  '...kkkkkkkkk...',
  '....kSk.kSk....',
  '....kLk.kLk....',
  '...kLLk.kLLk...',
];
// legionario romano: casco con penacho, armadura de láminas y faldón rojo
const CAB_LEGIO = [
  '.....kkkkk.....',
  '....kQQQQQk....',
  '...kkkkkkkkk...',
  '..kZZZZZZZZZk..',
  '.kZZZZZZZZZZZk.',
  'kZZZZZSSSSSSSk.',
  'kZZZZkSSSSSSSk.',
  'kZZZkksSSSSSSSk',
  'kZZZkSSSSSSSsk.',
  '.kZZkSSSSSSSSk.',
  '..kkkSSSSSSSk..',
  '....kkSSSSSkk..',
  '......kkkkk....',
];
const CUERPO_LEGIO = [
  '...kkZZZZZkk...',
  '..kZZZZZZZZZk..',
  '.kSkZzZzZzZkSk.',
  '.kSkZZZZZZZkSk.',
  '.kSkZzZzZzZkSk.',
  '.kskGGGGGGGksk.',
  '..kkQQQQQQQkk..',
  '...kQqQqQqQk...',
  '...kQQQQQQQk...',
  '...kkkkkkkkk...',
  '....kSk.kSk....',
  '....kLk.kLk....',
  '...kLLk.kLLk...',
];
// europeo moderno (1799–1922): levita o chaqueta, pantalón y botas
const CUERPO_EUROPEO = [
  '...kkWWWWWkk...',
  '..kCCCWWWCCCk..',
  '.kCkCCCWCCCkCk.',
  '.kCkCCCoCCCkCk.',
  '.kCkCCCWCCCkCk.',
  '.kSkCCCoCCCkSk.',
  '..kkCCCCCCCkk..',
  '...kCCCkCCCk...',
  '...kFFFkFFFk...',
  '...kFFFkFFFk...',
  '...kFFFkFFFk...',
  '...kFFFkFFFk...',
  '..kkkkk.kkkkk..',
];
// ── Episodio 9 (Acción de Gracias): peregrinos, wampanoag, gente del siglo XIX y XX ─────────────────────────────────
// peregrino de 1620: jubón negro con cuello blanco ancho, cinturón, calzas y medias grises, zapatos con hebilla
const CUERPO_PEREGRINO = [
  '..kWWWWWWWWWk..',
  '.kWWWWWWWWWWWk.',
  '.kCkCCCoCCCkCk.',
  '.kCkCCCCCCCkCk.',
  '.kCkCCCoCCCkCk.',
  '.kSkGGGoGGGkSk.',
  '..kkCCCCCCCkk..',
  '...kFFFkFFFk...',
  '...kFFFkFFFk...',
  '...kwwwkwwwk...',
  '...kwwwkwwwk...',
  '...kkokkkkok...',
  '..kkkkk.kkkkk..',
];
// vestido largo de manga larga con cuello y delantal (peregrina; con otros colores, Sarah Hale o una abuela)
const CUERPO_VESTIDO = [
  '....kkWWWkk....',
  '..kkCWWWWWCkk..',
  '.kCkCCWWWCCkCk.',
  '.kCkCCCCCCCkCk.',
  '.kCkWWWWWWWkCk.',
  '.kSkWWWWWWWkSk.',
  '..kkWWWWWWWkk..',
  '...kWWWWWWWk...',
  '...kCWWWWWCk...',
  '...kCCCCCCCk...',
  '...kCCCCCCck...',
  '...kkkkkkkkk...',
  '....kLk.kLk....',
];
// wampanoag: manto de piel de ciervo sobre un hombro, collar de cuentas (wampum), taparrabos, polainas y mocasines
const CUERPO_NATIVO = [
  '...kkSSSSSkk...',
  '..kBBSSSSSSSk..',
  '.kBkBBSSSSSkSk.',
  '.kBkSBBYWYSkSk.',
  '.kBkSSBBSSSkSk.',
  '.kSkSSSBBSSkSk.',
  '..kkGGGGGGGkk..',
  '...kBBBkBBBk...',
  '...kbbbkbbbk...',
  '...kbbbkbbbk...',
  '...kbbbkbbbk...',
  '...kLLLkLLLk...',
  '..kkkkk.kkkkk..',
];
// tocados que se pintan encima de la cabeza: [rejilla, desplazamiento vertical]
export const TOCADOS = {
  // la doble corona: la blanca del sur dentro de la roja del norte
  doble: [[
    '.......kkk.....',
    '......kXXXk....',
    '......kXXXk....',
    '.....kXXXXxk...',
    'kkk..kXXXXXk...',
    'kDk..kXXXXxk...',
    'kDk.kXXXXXXxk..',
    'kDkkkkkkkkkkkk.',
    'kDDDDDDDDDDDDk.',
    'kDDDDDDDDDDDdk.',
  ], -7],
  blanca: [[
    '.......kkk.....',
    '......kXXXk....',
    '......kXXXk....',
    '.....kXXXXxk...',
    '.....kXXXXXk...',
    '....kXXXXXXxk..',
    '...kXXXXXXXXxk.',
    '..kXXXXXXXXXXk.',
    '.kXXXXXXXXXXXk.',
  ], -5],
  // la corona azul de guerra (jepresh) con su cobra de oro delante
  azul: [[
    '....kkkkkk.....',
    '..kkKKKKKKkk...',
    '.kKKOKKKOKKKk..',
    '.kKKKKKOKKKKk..',
    'kKKOKKKKKKOKKk.',
    'kKKKKKOKKKKKOk.',
    'kKKKKKKKKKKKOk.',
  ], -3],
  // diadema de oro con cobra (Cleopatra, reinas)
  diadema: [[
    '............kk.',
    '...........kOk.',
    'kkkkkkkkkkkkOk.',
    'kOOOOOOOOOOOOk.',
    '.kkkkkkkkkkkk..',
  ], 1],
  // salacot de explorador (1922)
  salacot: [[
    '....kkkkkkk....',
    '...kWWWWWWWk...',
    '..kWWWWWWWWWk..',
    '.kWwwwwwwwwWWk.',
    'kWWWWWWWWWWWWWk',
    '.kkkkkkkkkkkkk.',
  ], -3],
  // bicornio de soldado francés (1799) con escarapela
  bicornio: [[
    'kk.........kk..',
    'kNkkkkkkkkkNk..',
    '.kNNNNNNNWDNk..',
    '..kkkkkkkkkk...',
  ], -1],
  // ── episodio 9 ──
  // sombrero alto de peregrino (capotain) con cinta y hebilla
  capotain: [[
    '....kkkkkk.....',
    '...kJJJJJJk....',
    '...kJJJJJJk....',
    '...kJJJJJJk....',
    '...kjjojjjk....',
    '.kkkkkkkkkkkk..',
    'kJJJJJJJJJJJJk.',
    '.kkkkkkkkkkkk..',
  ], -5],
  // cofia blanca de peregrina: tapa el pelo de arriba y de atrás, nunca la cara
  cofia: [[
    '...kkkkkkkk....',
    '..kWWWWWWWWk...',
    '.kWWWWWWWWWWk..',
    'kWWwWWWWWWWWWk.',
    'kWWWk..........',
    'kWWWk..........',
    'kWWwk..........',
    'kWWWk..........',
    '.kWWk..........',
  ], -1],
  // una pluma detrás de la cabeza (wampanoag)
  pluma: [[
    '.kk............',
    'kWk............',
    'kWk............',
    'kwk............',
    'kDk............',
    '.kk............',
  ], -4],
  // tres plumas y una cinta de wampum (Massasoit)
  plumas: [[
    'kk.kk.kk.......',
    'kWkkWkkWk......',
    'kWkkWkkWk......',
    'kwkkwkkwk......',
    '.kkkkkkkkkkk...',
    'kYWYWYWYWYWk...',
    '.kkkkkkkkkkk...',
  ], -4],
  // chistera (Lincoln)
  chistera: [[
    '...kkkkkkkk....',
    '...kJJJJJJk....',
    '...kJJJJJJk....',
    '...kJJJJJJk....',
    '...kJJJJJJk....',
    '...kJJJJJJk....',
    '...kjjjjjjk....',
    '.kkkkkkkkkkkk..',
    'kJJJJJJJJJJJJk.',
    '.kkkkkkkkkkkk..',
  ], -8],
  // gorra de plato de policía con placa y visera delante
  gorra: [[
    '...kkkkkkkk....',
    '..kCCCCCCCCk...',
    '.kCCCCCoCCCCk..',
    '.kkkkkkkkkkkkkk',
    '..........kkkk.',
  ], -2],
  // gorro de Santa Claus con borla
  santa: [[
    'kk.............',
    'kWk.kkkkk......',
    '.kkkQQQQQk.....',
    '...kQQQQQQk....',
    '..kQQQQQQQQk...',
    '.kWWWWWWWWWWk..',
    '.kkkkkkkkkkkk..',
  ], -4],
  // quepis de soldado de la guerra civil (azul o gris, según la ropa)
  // casco de piloto de caza (episodio 10): blanco, con la visera oscura subida por delante
  casco: [[
    '....kkkkkkk....',
    '..kkXXXXXXXkk..',
    '.kXXXXXXXXXXXk.',
    '.kXXXXXXXXkkkk.',
    '.kXXXXXXXXkkkk.',
    '.kXkkkkkkkkkk..',
  ], -2],
  kepi: [[
    '...kkkkkk......',
    '...kCCCCCk.....',
    '...kCCCCCCk....',
    '..kCCCCCCCCk...',
    '..kkkkkkkkkkkk.',
  ], -2],
  // fedora de los años 20–50
  fedora: [[
    '....kkkkkk.....',
    '...kFFFFFFk....',
    '...kFFFFFFk....',
    '...kGGGGGGk....',
    '.kkkkkkkkkkkk..',
    'kFFFFFFFFFFFFk.',
    '.kkkkkkkkkkkk..',
  ], -4],
  // quevedos (Roosevelt): dos aros a la altura de los ojos
  gafas: [[
    '......k..kk..k.',
    '......k..kk..k.',
    '.......kk..kk..',
  ], 6],
};
export const PIEL_CLARA = { S: hex('#f6c290'), s: hex('#d48a5a') };
const EG = { ...PIEL_EG, T: hex('#f4eedc'), t: hex('#c8bc9a') };
export const ELENCO_EG = {
  campesino: { cab: CAB_CORTO, cuerpo: CUERPO_EG, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: P.H, pal: EG, kohl: true },
  calvo: { cab: CAB_CALVO, cuerpo: CUERPO_EG, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: P.s, pal: EG, kohl: true },
  escriba: { cab: CAB_CALVO, cuerpo: CUERPO_SENTADO, brazoCol: 11, altoCuerpo: 9, altoCab: 12, ojosY: 6, bocaY: 9, ceja: P.s, pal: EG, kohl: true },
  faraon: { cab: CAB_NEMES, cuerpo: CUERPO_FARAON, brazoCol: 11, altoCuerpo: 13, altoCab: 11, ojosY: 6, bocaY: 9, ceja: P.H, pal: EG, kohl: true },
  faraona: { cab: CAB_NEMES.slice(0, 11).concat(['kNNNk..kkkk....', '.kkk...........']), cuerpo: CUERPO_FARAON, brazoCol: 11, altoCuerpo: 13, altoCab: 11, ojosY: 6, bocaY: 9, ceja: P.H, pal: EG, kohl: true },
  rey: { cab: CAB_CORTO, cuerpo: CUERPO_FARAON, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: P.H, pal: EG, kohl: true, barba: true },
  egipcia: { cab: CAB_EGIPCIA, cuerpo: CUERPO_EGIPCIA, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: P.H, pal: EG, kohl: true },
  chacal: { cab: CAB_CHACAL, cuerpo: CUERPO_EG, brazoCol: 11, altoCuerpo: 13, altoCab: 12, sinCara: true, pal: EG },
  barbudo: { cab: CAB_BARBA, cuerpo: CUERPO_TUNICA, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: P.H, pal: { ...PIEL_EG, H: hex('#1c1424') } },
  legionario: { cab: CAB_LEGIO, cuerpo: CUERPO_LEGIO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 7, bocaY: 10, ceja: P.k, pal: PIEL_CLARA },
  europeo: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#5a3418'), pal: { ...PIEL_CLARA, H: hex('#5a3418'), h: hex('#8a5428') } },
};

export const ELENCO_CHIBI = { socrates: SOCRATES, ciudadano: CIUDADANO };
// todos los personajes juntos
Object.assign(ELENCO_CHIBI, ELENCO_EG);
const CLARA = (o) => ({ ...PIEL_CLARA, ...Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)])) });
const NATIVA = (o) => ({ S: hex('#c88a5a'), s: hex('#9a5e36'), H: hex('#1c1424'), h: hex('#3a3046'), B: hex('#b8895a'), b: hex('#8a6038'), L: hex('#6a4a2a'), G: hex('#5a3a20'), ...Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)])) });
export const ELENCO_AG = {
  peregrino: { cab: CAB_CORTO, cuerpo: CUERPO_PEREGRINO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#5a3418'), tocado: 'capotain', pal: CLARA({ H: '#6a4020', h: '#8a5a30', C: '#2a2430', F: '#3a3046', G: '#5a3a20' }) },
  peregrina: { cab: CAB_EGIPCIA, cuerpo: CUERPO_VESTIDO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#8a5428'), tocado: 'cofia', pal: CLARA({ H: '#8a5428', h: '#a8703a', C: '#4a3a5a', c: '#34283f', L: '#2a2430' }) },
  wampanoag: { cab: CAB_CORTO, cuerpo: CUERPO_NATIVO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#1c1424'), tocado: 'pluma', pal: NATIVA({}) },
  wampanoaga: { cab: CAB_EGIPCIA, cuerpo: CUERPO_VESTIDO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#1c1424'), pal: NATIVA({ C: '#b8895a', c: '#8a6038', W: '#d8b07a', L: '#6a4a2a' }) },
  massasoit: { cab: CAB_CORTO, cuerpo: CUERPO_NATIVO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#1c1424'), tocado: 'plumas', pal: NATIVA({ B: '#c83a3a', b: '#8e2424' }) },
  squanto: { cab: CAB_CORTO, cuerpo: CUERPO_NATIVO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#1c1424'), tocado: 'pluma', pal: NATIVA({ B: '#3e74d4', b: '#2a50a0' }) },
  hale: { cab: CAB_EGIPCIA, cuerpo: CUERPO_VESTIDO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#5a3418'), pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#6a3a8a', c: '#4a2864', W: '#f2eee2', L: '#2a2430' }) },
  lincoln: { cab: CAB_BARBA, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#1c1424'), tocado: 'chistera', pal: CLARA({ H: '#1c1424', h: '#3a3046', C: '#2a2430', c: '#1c1222', F: '#2a2430', W: '#f2eee2' }) },
  roosevelt: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#6a6a7a'), pal: CLARA({ H: '#8c8ca0', h: '#b8bccc', C: '#5a5a6a', F: '#4a4a5a', W: '#f2eee2' }) },
  policia: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#5a3418'), tocado: 'gorra', pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#1e2c5a', c: '#141e40', F: '#1e2c5a', W: '#8ab0e0' }) },
  santa: { cab: CAB_BARBA, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#f6f6f6'), tocado: 'santa', pal: CLARA({ H: '#f6f6f6', h: '#d8dce8', C: '#d23a3a', c: '#a02828', F: '#d23a3a', W: '#f6f6f6', o: '#2a2430' }) },
  soldadoAzul: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#5a3418'), tocado: 'kepi', pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#2a4fa8', F: '#6a8ac8', W: '#2a4fa8' }) },
  soldadoGris: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#5a3418'), tocado: 'kepi', pal: CLARA({ H: '#2c2232', h: '#54466a', C: '#8c8ca0', F: '#6a6a7a', W: '#8c8ca0' }) },
  senor30: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#5a3418'), tocado: 'fedora', pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#6a4a3a', F: '#5a4a5a', W: '#f2eee2', G: '#2a2430' }) },
  senora30: { cab: CAB_EGIPCIA, cuerpo: CUERPO_VESTIDO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#8a5428'), pal: CLARA({ H: '#a85a2a', h: '#c8783a', C: '#2a8a7a', c: '#1e6a5e', W: '#f2eee2', L: '#2a2430' }) },
  chico: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#2c2232'), pal: CLARA({ H: '#2c2232', h: '#54466a', C: '#e86a3a', c: '#b84a2a', F: '#3e5a9a', W: '#e86a3a' }) },
  chica: { cab: CAB_EGIPCIA, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#5a3418'), pal: { S: hex('#c88a5a'), s: hex('#9a5e36'), H: hex('#5a3418'), h: hex('#8a5428'), C: hex('#5a9a4a'), c: hex('#3e7a34'), F: hex('#3e5a9a'), W: hex('#5a9a4a') } },
};
Object.assign(ELENCO_CHIBI, ELENCO_AG);

// ── Episodio 10 (ovnis): pilotos de 2004 con mono de vuelo verde oliva y casco ─────────────────────────────────────
export const ELENCO_OV = {
  fravor: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#5a3418'), tocado: 'casco', pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#6e7a52', c: '#525c3c', F: '#6e7a52', W: '#6e7a52', o: '#c8b040' }) },
  dietrich: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#8a5428'), tocado: 'casco', pal: CLARA({ H: '#a87040', h: '#c89058', C: '#6e7a52', c: '#525c3c', F: '#6e7a52', W: '#6e7a52', o: '#c8b040' }) },
};
Object.assign(ELENCO_CHIBI, ELENCO_OV);

// ── Público: bustos de frente (9 × 12) que se asoman por encima de una borda, un muro o una grada ─────────────────
export const BUSTOS = {
  rizos: ['..kkkkk..', '.kHhHhHk.', 'kHhHHHhHk', 'kHSSSSSHk', 'kSeSSSeSk', 'kSSSsSSSk', '.kSSmSSk.', '..kSSSk..', '.kkCCCkk.', 'kCCCCCCCk', 'kCcCCCcCk', 'kCcCCCcCk'],
  calvo: ['..kkkkk..', '.kSSSSSk.', 'kWSSSSSWk', 'kWSSSSSWk', 'kSeSSSeSk', 'kSSSsSSSk', 'kWWWmWWWk', '.kWWWWWk.', '.kkWWWkk.', 'kCCCCCCCk', 'kCcCCCcCk', 'kCcCCCcCk'],
  mujer: ['...kkk...', '..kHHHk..', '.kVVVVVk.', 'kVHHHHHVk', 'kVSSSSSVk', 'kVeSSSeVk', 'kVSSsSSVk', 'kVSSmSSVk', 'kVkSSSkVk', '.kkCoCkk.', 'kCCCCCCCk', 'kCcCCCcCk'],
  soldado: ['..kRRRk..', '.kRRRRRk.', '..kZZZk..', '.kZZzZZk.', 'kZZZZZZZk', 'kZkSSSkZk', 'kZeSSSeZk', 'kZSSsSSZk', 'kZkSmSkZk', '.kkkkkkk.', 'kCCCCCCCk', 'kCcCCCcCk'],
  marinero: ['...kkk...', '..kPPPk..', '.kPPpPPk.', 'kPPPPPPPk', 'kHSSSSSHk', 'kSeSSSeSk', 'kSSSsSSSk', '.kSSmSSk.', '..kkkkk..', '.kCCCCCk.', 'kCcCCCcCk', 'kCcCCCcCk'],
  peluca: ['..kkkkk..', '.kHHHHHk.', 'kHHHHHHHk', 'kHSSSSSHk', 'kHeSSSeHk', 'kHSSsSSHk', 'kHSSmSSHk', 'kHkSSSkHk', '.kkYOYkk.', 'kCYOYOYCk', 'kCcCCCcCk', 'kCcCCCcCk'],
  egipcia: ['..kkkkk..', '.kHOOOHk.', 'kHHHHHHHk', 'kHSSSSSHk', 'kHeSSSeHk', 'kHSSsSSHk', 'kHSSmSSHk', 'kHHSSSHHk', 'kHkkkkkHk', 'kCYOYOYCk', 'kCCCCCCCk', 'kCcCCCcCk'],
};
const BOCA = { rizos: [4, 6], calvo: [4, 6], mujer: [4, 7], soldado: [4, 8], marinero: [4, 7], peluca: [4, 6], egipcia: [4, 6] };
// colores de un busto: ropa (luz, sombra) y lo que haga falta (H, h, V, Z, z, R, P, p)
export const tela = (luz, sombra, extra = {}) => ({ C: hex(luz), c: hex(sombra), ...paleta(extra) });

export async function crearChibi(lienzo) { return conChibi(await crearRetro(lienzo)); }

// añade lo del estilo chibi a un kit ya creado (crearRetro, crearRoma…), para mezclar mapas y personajes en una escena
export function conChibi(R) {
  const { pset, rect, disco } = R;

  // dibuja una rejilla de letras con una paleta (dir = −1 la voltea)
  const dibujo = (filas, x, y, dir = 1, pal = P) => filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const c = pal[f[i]]; if (c == null) continue; pset(Math.round(x + (dir > 0 ? i : f.length - 1 - i)), Math.round(y + j), c); } });

  // cara encima de la cabeza: ojos de 2 px, cejas, boca (normal, habla, sonrisa, sorpresa) y parpadeo
  const cara = (x, y, dir, o) => {
    const px = (i, j, c) => pset(Math.round(x + (dir > 0 ? i : 14 - i)), Math.round(y + j), c);
    const ey = o.ojosY ?? 5, cejaY = ey - 1 - (o.sorpresa ? 1 : 0);
    for (const ex of [8, 12]) {
      if (o.sorpresa) { px(ex, ey, P.E); px(ex, ey + 1, P.k); px(ex - 1, ey, P.k); px(ex - 1, ey + 1, P.E); }
      else if (o.parpadea) px(ex, ey + 1, P.k);
      else { px(ex, ey, P.k); px(ex, ey + 1, P.k); }
      if (o.enfado) { px(ex - 1, cejaY - (ex === 8 ? 1 : 0), o.ceja); px(ex, cejaY, o.ceja); }
      else { px(ex - 1, cejaY, o.ceja); px(ex, cejaY, o.ceja); }
    }
    const my = o.bocaY ?? 9;
    if (o.sorpresa) { px(10, my, P.k); px(11, my, P.k); px(10, my + 1, P.m); px(11, my + 1, P.m); px(10, my + 2, P.k); px(11, my + 2, P.k); }
    else if (o.habla) { px(9, my, P.k); px(10, my, P.k); px(11, my, P.k); px(10, my + 1, P.m); }
    else if (o.sonrisa) { px(9, my, P.k); px(10, my + 1, P.k); px(11, my + 1, P.k); px(12, my, P.k); }
    else if (o.triste) { px(9, my + 1, P.k); px(10, my, P.k); px(11, my, P.k); px(12, my + 1, P.k); }
    else { px(10, my, P.k); px(11, my, P.k); }
  };

  // brazo levantado: con el índice arriba (explica) o con la mano abierta (sorpresa, saludo)
  // brazo levantado, dibujado a mano (9 × 9, para el lado derecho; dir −1 lo voltea): sale del hombro con la manga del
  // color de la ropa (letra M), el codo hacia fuera, un antebrazo corto de piel y una mano abierta redondeada a media
  // altura de la cabeza. Antes era una línea recta que nacía en la cintura y acababa en punta: parecía un palo o una vela.
  const BRAZO = [   // columnas x+10 … x+18: el hombro en x+12 y la mano junto a la cabeza (x+15 … x+17), nunca encima de la cara
    '.....kkk.',
    '....kSSSk',
    '....kSSsk',
    '.....kSk.',
    '....kSSk.',
    '...kMMk..',
    '..kMMk...',
    '.kMMk....',
    '.kMk.....',
  ];
  const brazoCache = new Map();
  const brazoArriba = (def, x, yC, dir, pal) => {
    const fila = def.cuerpo[2] ?? '', manga = fila[12] && fila[12] !== '.' && fila[12] !== 'k' ? fila[12] : 'S';
    if (!brazoCache.has(manga)) brazoCache.set(manga, BRAZO.map((f) => f.replace(/M/g, manga)));
    dibujo(brazoCache.get(manga), dir > 0 ? x + 10 : x - 4, yC - 7, dir, pal);
  };

  // un personaje del reparto. o: dir (1 mira a la derecha), dedo (explica con el índice), brazos (los dos arriba),
  // salto (px), habla, sonrisa, sorpresa, enfado, triste, pal (cambia letras: otro pelo, otra ropa)
  const sinBrazoCache = new Map();
  // paso: en las cinco filas de abajo (las piernas), media rejilla sube un píxel, así un pie se levanta del suelo
  const pasoCache = new Map();
  const conPaso = (cuerpo, f) => {
    if (!pasoCache.has(cuerpo)) {
      const n = cuerpo.length, w = cuerpo[0].length, mitad = Math.floor(w / 2), vacia = '.'.repeat(w);
      const una = (izq) => cuerpo.map((fila, j) => { if (j < n - 5) return fila; const a = fila.split(''), b = cuerpo[j + 1] ?? vacia; for (let i = izq ? 0 : mitad + 1; i < (izq ? mitad : w); i++) a[i] = b[i] ?? '.'; return a.join(''); });
      pasoCache.set(cuerpo, [una(true), una(false)]);
    }
    return pasoCache.get(cuerpo)[f];
  };
  // o.anda: camina (piernas alternas y un rebote); quieto, cada personaje respira y de vez en cuando cambia el peso de
  // pie, a su ritmo (o.quieto: nada de eso)
  const actor = (def, x, suelo, t, o = {}) => {
    const dir = o.dir ?? 1, pal = { ...P, ...(def.pal || {}), ...(o.pal || {}) }, salto = o.salto ?? 0, fase = x * 0.37 + (def.altoCab || 0);
    const vivo = !o.quieto && !o.anda && salto === 0, resp = (def.respira ?? vivo) && Math.sin(t * 2.6 + fase) > 0.75 ? 1 : 0;
    const paso = o.anda ? Math.floor(t * 5 + fase) % 2 : vivo && (t * 0.35 + fase * 0.1) % 3 < 0.25 ? 0 : -1;
    const yC = suelo - def.altoCuerpo - salto - (o.anda && paso === 1 ? 1 : 0), yH = yC - def.altoCab + resp;
    const manos = o.sorpresa && o.manos === true, levanta = o.dedo || o.brazos || manos;   // las manos arriba junto a la cabeza parecían orejas: la sorpresa va en la cara (o.manos: true para levantarlas)
    if (levanta && !sinBrazoCache.has(def)) sinBrazoCache.set(def, sinBrazo(def.cuerpo, def.brazoCol));
    const base = levanta ? sinBrazoCache.get(def) : def.cuerpo;
    dibujo(paso >= 0 ? conPaso(base, paso) : base, x, yC, dir, pal);
    if (o.dedo && !o.brazos && !manos) brazoArriba(def, x, yC, dir, pal);
    if (o.brazos || manos) { brazoArriba(def, x, yC, 1, pal); brazoArriba(def, x, yC, -1, pal); }
    dibujo(def.cab, x, yH, dir, pal);
    const px = (i, j, c) => pset(Math.round(x + (dir > 0 ? i : 14 - i)), Math.round(yH + j), c);
    if (!def.sinCara) {
      cara(x, yH, dir, { ceja: def.ceja, ojosY: def.ojosY, bocaY: def.bocaY, parpadea: (t + x * 0.13) % 2.6 < 0.1, ...o });
      if (def.kohl || o.kohl) for (const ex of [8, 12]) px(ex + 1, def.ojosY ?? 5, P.k);   // el ojo pintado de los egipcios
      for (const [i, j] of def.mejillas ?? []) px(i, j, pal.s);
      if (o.bigote) { px(9, (def.bocaY ?? 9) - 1, pal.H); px(10, (def.bocaY ?? 9) - 1, pal.H); px(11, (def.bocaY ?? 9) - 1, pal.H); px(12, (def.bocaY ?? 9) - 1, pal.H); }
      if (o.barba ?? def.barba) for (let j = (def.bocaY ?? 9) + 2; j <= (def.bocaY ?? 9) + 4; j++) { px(9, j, P.k); px(10, j, P.U); px(11, j, P.U); px(12, j, P.k); }
    }
    const toc = o.tocado ?? def.tocado;
    if (toc) { const [g, dy] = TOCADOS[toc]; dibujo(g, x, yH + dy, dir, pal); }
    if (salto > 0) for (let i = -5; i <= 5; i++) if (Math.abs(i) > 2 - salto * 0.2) pset(x + 7 + i, suelo + 1, COL.mad1);
    return { cabeza: [x + 7, yH], mano: [dir > 0 ? x + 15 : x, yH - 4] };
  };

  // un busto del público en (x, y) = esquina de arriba; t para parpadear; o.rie, o.saluda
  const busto = (tipo, pal, x, y, t, o = {}) => {
    const ojos = (t + x * 0.07) % 2.6 < 0.1 ? 'S' : 'k';
    dibujo(BUSTOS[tipo], x, y, 1, { ...P, ...pal, e: P[ojos], m: o.rie ? P.m : P.k });
    if (o.rie) { const [mx, my] = BOCA[tipo]; pset(x + mx - 1, y + my, P.k); pset(x + mx + 1, y + my, P.k); pset(x + mx, y + my + 1, P.k); }
    if (o.saluda) { const ay = y + 3 - Math.round(Math.abs(Math.sin(t * 10 + x)) * 2); for (let yy = ay; yy <= y + 10; yy++) { pset(x + 9, yy, P.k); pset(x + 10, yy, P.S); pset(x + 11, yy, P.k); } rect(x + 9, ay - 2, x + 11, ay - 1, P.k); pset(x + 10, ay - 1, P.S); }
  };

  // nube de tres tonos (sombra de abajo, cuerpo y luz arriba), sin tramas
  const nube = (cx, cy, w) => {
    const bolas = [[0, 0, w * 0.32], [-w * 0.32, w * 0.06, w * 0.24], [w * 0.3, w * 0.05, w * 0.26], [-w * 0.1, -w * 0.12, w * 0.26], [w * 0.14, -w * 0.08, w * 0.22]];
    for (const [dx, dy, r] of bolas) disco(Math.round(cx + dx), Math.round(cy + dy + 1), Math.round(r), COL.nubeS2);
    for (const [dx, dy, r] of bolas) disco(Math.round(cx + dx), Math.round(cy + dy), Math.round(r), COL.nubeS);
    for (const [dx, dy, r] of bolas) disco(Math.round(cx + dx - 1), Math.round(cy + dy - 2), Math.round(r * 0.8), COL.nube);
    rect(Math.round(cx - w * 0.55), Math.round(cy + w * 0.18), Math.round(cx + w * 0.55), Math.round(cy + w * 0.3), COL.nubeS);
  };

  // gaviota que aletea
  const gaviota = (x, y, t, k = 0) => { const a = Math.sin(t * 9 + k) > 0; pset(x, y, COL.gaviota); pset(x - 1, y - (a ? 1 : 0), COL.gaviota); pset(x - 2, y - (a ? 2 : 0), COL.gaviota); pset(x + 1, y - (a ? 1 : 0), COL.gaviota); pset(x + 2, y - (a ? 2 : 0), COL.gaviota); pset(x, y + 1, COL.gaviotaS); };

  // bocadillo con un símbolo («!» rojo por defecto; o.icono = '?' etc. se dibuja con R.icono)
  const bocadillo = (x, y, o = {}) => {
    rect(x - 4, y - 9, x + 4, y + 1, P.k); rect(x - 3, y - 8, x + 3, y, COL.nube); pset(x - 1, y + 2, P.k); pset(x, y + 2, P.k); pset(x - 1, y + 1, COL.nube);
    if (o.icono) R.icono(o.icono, x - 2, y - 7, P.k, COL.nube); else { rect(x, y - 7, x, y - 3, P.Q); pset(x, y - 1, P.Q); }
  };

  // caballo de perfil (mirando a la derecha) con dos posturas de patas al galope
  const CABALLO = [
    '.....................kk...',
    '....................kHMk..',
    '...................kHMMMk.',
    '..................kHMMkMMk',
    '.................kHMMMMMMk',
    '................kHMMMk.kk.',
    '...............kHMMMk.....',
    '..kkkkkkkkkkkkkHMMMk......',
    '.kMMMMMMMMMMMMMMMMk.......',
    'kHMMMMMMMMMMMMMMMMk.......',
    'kHkMMMMMMMMMMMMMMMk.......',
    'kHkmMMMMMMMMMMMMMk........',
    '.k.kmMMkkkkkkkMmk.........',
  ];
  const PATAS = [['...kMk.......kMk..........', '...kMk.......kMk..........', '...kmk.......kmk..........', '...kkk.......kkk..........'],
                 ['..kMk.........kMk........', '.kMk...........kMk.......', 'kmk.............kmk......', 'kkk.............kkk......']];
  const caballo = (x, suelo, t, o = {}) => {
    const dir = o.dir ?? 1, f = o.galopa ? Math.floor(t * 8) % 2 : 0, y = suelo - 17 - (o.galopa && f ? 1 : 0);
    const pal = { ...P, M: o.color ?? P.M, m: o.sombra ?? hex('#6a4020'), H: hex('#2a1810') };
    dibujo(CABALLO, x, y, dir, pal); dibujo(PATAS[f], x, y + 13, dir, pal);
  };
  // carro de guerra: caja con baranda, rueda de seis radios y el caballo delante; o.conductor = def del reparto
  const carro = (x, suelo, t, o = {}) => {
    const dir = o.dir ?? 1, X = (i) => Math.round(x + dir * i);
    caballo(dir > 0 ? x + 14 : x - 36, suelo, t, { ...o, dir });
    for (let i = 4; i <= 16; i++) pset(X(i), suelo - 9, P.k);   // lanza que une el carro al caballo
    if (o.conductor) actor(o.conductor, dir > 0 ? x - 6 : x - 8, suelo - 6, t, { dir, ...(o.conductorOpc || {}) });
    for (let i = -4; i <= 6; i++) for (let j = 0; j < 7; j++) pset(X(i), suelo - 13 + j, j === 0 || i === -4 || i === 6 ? P.k : j < 2 ? P.O : P.D);
    const cx = X(1), cy = suelo - 5, giro = t * 9 * dir;
    disco(cx, cy, 5, P.k); disco(cx, cy, 4, P.M); disco(cx, cy, 3, P.k);
    for (let k = 0; k < 6; k++) { const a = giro + k * Math.PI / 3; for (let r = 0; r <= 3; r++) pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), P.M); }
    pset(cx, cy, P.O);
  };
  // cocodrilo que asoma en el agua (o tumbado en la orilla)
  const COCODRILO = [
    '........kkk..kkk..kk.....',
    '..kkkkkkVVVkkVVVkkVVkkk..',
    '.kVVVVVVVVVVVVVVVVVVVVOVk',
    'kvVVVVVVVVVVVVVVVVVVVVVVk',
    '.kvvvvvvvvvvvvvvvvvkWkWkk',
    '..kkkkkkkkkkkkkkkkk.k.k..',
  ];
  const cocodrilo = (x, y, t, o = {}) => dibujo(COCODRILO, x, y + Math.round(Math.sin(t * 1.5 + x) * 0.6), o.dir ?? 1);

  return { ...R, P, COL, dibujo, cara, brazoArriba, actor, busto, nube, gaviota, bocadillo, caballo, carro, cocodrilo };
}
