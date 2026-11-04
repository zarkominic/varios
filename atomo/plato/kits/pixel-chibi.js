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
  // tricornio del siglo XVIII (1765–1790), con el ribete claro
  tricornio: [[
    '.k..kkkkkk..k..',
    'kJkkJJJJJJkkJk.',
    'kJJJJJJJJJJJJk.',
    '.kJjjjjjjjjJk..',
    '..kkkkkkkkkk...',
  ], -2],
  // boina plana de marinero o de navegante (1524–1783), sin visera; el color es el de la ropa oscura (J)
  boina: [[
    '..kkkkkkkk.....',
    '.kJJJJJJJJk....',
    'kJjJJJJJJJJk...',
    '.kkkkkkkkkkk...',
  ], -2],
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
  // sombrero vaquero (episodio 10): copa hundida y ala ancha que sube por los lados
  vaquero: [[
    '....kkkkkkk....',
    '...kVVkVVVVk...',
    '...kVVVVVVVk...',
    '...kvvvvvvvk...',
    'kk.kkkkkkkkk.kk',
    'kVkVVVVVVVVVkVk',
    '.kkkkkkkkkkkkk.',
  ], -4],
  // gorra de plato de general (episodio 10): visera negra y emblema dorado
  general: [[
    '..kkkkkkkkkk...',
    '.kCCCCCCCCCCk..',
    '.kCCCCOOCCCCk..',
    '.kkkkkkkkkkkkk.',
    '..........kkkk.',
  ], -2],
  // auriculares de controlador aéreo (episodio 10): diadema y cascos a los lados, con micrófono
  auriculares: [[
    '...kkkkkkkk....',
    '..kMk.....kMk..',
    '..kMk.....kMk..',
    '..k.k.....k.k..',
    '...............',
    '.kMMk.....kMMk.',
    '.kMMk.....kMMk.',
    '..kk..kkk..kk..',
  ], 0],
  // casco de piloto de caza (episodio 10): blanco, con la visera oscura subida por delante
  casco: [[
    '....kkkkkkk....',
    '..kkXXXXXXXkk..',
    '.kXXXXXXXXXXXk.',
    '.kXXXXXXXXkkkk.',
    '.kXXXXXXXXkkkk.',
    '.kXkkkkkkkkkk..',
  ], -2],
  // el casco de cuero de 1913 (ep13): gorro marrón cosido en gajos, con orejeras que bajan por los lados sin tapar la cara
  cuero: [[
    '...kkkkkkkk....',
    '..kBBbBBbBBk...',
    '.kBBBbBBbBBBk..',
    'kBBBBbBBbBBBBk.',
    'kbkkkkkkkkkkbk.',
    'kBk........kBk.',
    'kBk........kBk.',
    'kbk........kbk.',
    '.k..........k..',
  ], -2],
  // el casco de hoy (ep13): carcasa brillante del color del equipo (X), franja central (x) y rejilla delante, sin tapar los ojos
  futbol: [[
    '....kkkkkkk....',
    '..kkXXxXXXXkk..',
    '.kXXXXxXXXXXXk.',
    '.kXwXXxXXXXXXk.',
    'kXXXXXXXXXkkkkk',
    'kXXk.....kXk..k',
    '.kXk......kkkkk',
    '..kk...........',
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
  // Kenneth Arnold, 1947: cazadora de cuero marrón y gorra de aviador
  arnold: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#3a2418'), tocado: 'gorra', pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#7a4a2a', c: '#5a3418', F: '#4a4a5a', W: '#e8dcc0', o: '#c8b040' }) },
  // Mac Brazel, capataz del rancho: camisa a cuadros (roja), vaqueros y sombrero
  brazel: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#5a3418'), tocado: 'vaquero', bigote: true, pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#b84a3a', c: '#8e3428', F: '#3e5a8a', W: '#b84a3a', o: '#e8d8b4', V: '#a8885a', v: '#6a4e30' }) },
  // general de 1947: uniforme verde oliva con gorra de plato
  general: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#8c8ca0'), tocado: 'general', pal: CLARA({ H: '#8c8ca0', h: '#b8bccc', C: '#5e6a44', c: '#46502e', F: '#5e6a44', W: '#d8c8a8', o: '#e8b830', O: '#e8b830' }) },
  // controlador aéreo de 1952: camisa blanca, corbata y auriculares
  controlador: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#5a3418'), tocado: 'auriculares', pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#e8e4dc', c: '#c0bcb4', F: '#4a4a5a', W: '#e8e4dc', o: '#2a4fa8', M: '#2a2430' }) },
  // oficial joven de la Fuerza Aérea (Ruppelt, jefe del Libro Azul) y oficinista: uniforme azul
  oficial: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#2c2232'), pal: CLARA({ H: '#2c2232', h: '#54466a', C: '#4a5a8a', c: '#36446e', F: '#4a5a8a', W: '#d8dce8', o: '#e8b830' }) },
  oficinista: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#8a5428'), pal: CLARA({ H: '#a87040', h: '#c89058', C: '#f2eee2', c: '#c8c0b0', F: '#5e5e70', W: '#f2eee2', o: '#c83a3a' }) },
  // general de la Fuerza Aérea en 1952: uniforme azul y gorra de plato
  generalAzul: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#8c8ca0'), tocado: 'general', pal: CLARA({ H: '#8c8ca0', h: '#b8bccc', C: '#3a4a7a', c: '#2a3660', F: '#3a4a7a', W: '#d8dce8', o: '#e8b830', O: '#e8b830' }) },
  // azafata de los cincuenta: uniforme azul y gorrito
  azafata: { cab: CAB_EGIPCIA, cuerpo: CUERPO_VESTIDO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#5a3418'), tocado: 'gorra', pal: CLARA({ H: '#8a5428', h: '#a8703a', C: '#2a4a8a', c: '#1e3468', W: '#f2eee2', L: '#1e3468' }) },
  // agente federal: traje oscuro y gafas
  agente: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#2c2232'), pal: CLARA({ H: '#2c2232', h: '#54466a', C: '#2a2a36', c: '#1c1c26', F: '#2a2a36', W: '#f2eee2', o: '#2a2a36' }) },
  agenta: { cab: CAB_EGIPCIA, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#8a5428'), pal: CLARA({ H: '#a85a2a', h: '#c8783a', C: '#2a2a36', c: '#1c1c26', F: '#2a2a36', W: '#f2eee2', o: '#2a2a36' }) },
  // persona de hoy con sudadera
  sudadera: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#2c2232'), pal: CLARA({ H: '#2c2232', h: '#54466a', C: '#3e8a7a', c: '#2c6a5e', F: '#3e5a9a', W: '#3e8a7a', o: '#f2eee2' }) },
  // periodista de 1947: traje gris, sombrero, libreta
  periodista: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#2c2232'), tocado: 'fedora', pal: CLARA({ H: '#2c2232', h: '#54466a', C: '#8c8ca0', c: '#6a6a7a', F: '#5e5e70', W: '#f2eee2', G: '#3a3046', o: '#c83a3a' }) },
  dietrich: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#8a5428'), tocado: 'casco', pal: CLARA({ H: '#a87040', h: '#c89058', C: '#6e7a52', c: '#525c3c', F: '#6e7a52', W: '#6e7a52', o: '#c8b040' }) },
};
Object.assign(ELENCO_CHIBI, ELENCO_OV);

// ── Episodio 11 (Theranos): Silicon Valley, 2003–2026 ───────────────────────────────────────────────────────────────
const MORENA = (o) => ({ S: hex('#c8946a'), s: hex('#a06a44'), ...Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)])) });
export const ELENCO_TH = {
  // Elizabeth Holmes: jersey negro de cuello alto, pantalón negro, pelo rubio por detrás (la cara siempre a la vista)
  holmes: { cab: CAB_EGIPCIA, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#9a7a3a'), pal: CLARA({ H: '#d8b860', h: '#b8903a', C: '#1e1e28', c: '#141418', W: '#1e1e28', o: '#1e1e28', F: '#1e1e28' }) },
  // Sunny Balwani: traje gris oscuro, camisa blanca y corbata granate
  balwani: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#1c1424'), pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#3a3a4a', c: '#2a2a36', F: '#3a3a4a', W: '#f2eee2', o: '#8a2a3a' }) },
  // consejero mayor y famoso: pelo blanco, traje azul marino y una medalla dorada
  consejero: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#c8c8d0'), pal: CLARA({ H: '#e8e8ee', h: '#c0c0cc', C: '#2a3460', c: '#1e2648', F: '#2a3460', W: '#f2eee2', o: '#e8b830' }) },
  consejeroCalvo: { cab: CAB_CALVO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#a8a8b0'), pal: CLARA({ H: '#d8d8e0', h: '#b8b8c4', C: '#3a3a4a', c: '#2a2a36', F: '#3a3a4a', W: '#f2eee2', o: '#c83a3a' }) },
  // profesor de Stanford: chaqueta de tweed marrón y pelo gris
  profesor: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#8c8ca0'), pal: CLARA({ H: '#a8a8b8', h: '#c8c8d4', C: '#8a6a4a', c: '#6a4e34', F: '#5e5e70', W: '#e8dcc0', o: '#3a5a3a' }) },
  // Tyler Shultz y Erika Cheung, y los técnicos: bata blanca de laboratorio
  tyler: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#6a4a2a'), pal: CLARA({ H: '#8a5a2a', h: '#a8743c', C: '#f4f4f8', c: '#c8c8d4', F: '#3e5a8a', W: '#8ab0e0', o: '#8ab0e0' }) },
  erika: { cab: CAB_EGIPCIA, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#1c1424'), pal: CLARA({ H: '#1c1424', h: '#3a3046', S: '#f0c8a0', C: '#f4f4f8', c: '#c8c8d4', F: '#4a4a5a', W: '#e8a8b8', o: '#e8a8b8' }) },
  tecnico: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#1c1424'), pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#f4f4f8', c: '#c8c8d4', F: '#3e5a8a', W: '#5aa86a', o: '#5aa86a' }) },
  tecnica: { cab: CAB_EGIPCIA, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#6a3a1a'), pal: CLARA({ H: '#a85a2a', h: '#c8783a', C: '#f4f4f8', c: '#c8c8d4', F: '#4a4a5a', W: '#e8c040', o: '#e8c040' }) },
  // John Carreyrou: camisa azul claro remangada, pantalón gris
  carreyrou: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#2c2232'), pal: CLARA({ H: '#3a2a2a', h: '#5a4040', C: '#a8c8e8', c: '#7aa0c8', F: '#5e5e70', W: '#a8c8e8', o: '#2a3a6a' }) },
  // juez: toga negra con el cuello blanco, pelo gris
  juez: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#6a6a7a'), pal: CLARA({ H: '#8c8ca0', h: '#b8bccc', C: '#1c1c24', c: '#121218', F: '#1c1c24', W: '#f2eee2', o: '#1c1c24' }) },
  // la clienta de la farmacia: rebeca roja; la enfermera: pijama sanitario verde azulado
  clienta: { cab: CAB_EGIPCIA, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#5a3418'), pal: CLARA({ H: '#6a3a1a', h: '#8a5428', C: '#c84a4a', c: '#a03434', F: '#3e5a8a', W: '#f2eee2', o: '#f2eee2' }) },
  enfermera: { cab: CAB_EGIPCIA, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#1c1424'), pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#4aa8a0', c: '#348a82', F: '#4aa8a0', W: '#4aa8a0', o: '#348a82' }) },
  // guardia de seguridad: uniforme gris y gorra
  guardia: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#2c2232'), tocado: 'gorra', pal: CLARA({ H: '#2c2232', h: '#54466a', C: '#5e6270', c: '#464a56', F: '#3a3e4a', W: '#5e6270', o: '#e8b830' }) },
};
Object.assign(ELENCO_CHIBI, ELENCO_TH);

// ── Episodio 12 (huracanes y tornados): Bryan 1943, Galveston 1900, Miami y Chicago 1971, hoy ─────────────────────
export const ELENCO_HU = {
  // Joe Duckworth, teniente coronel de 1943: guerrera verde oliva, pantalón «pink» claro y gorra de plato de oficial
  duckworth: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#4a3020'), tocado: 'general', pal: CLARA({ H: '#4a3020', h: '#6a4a30', C: '#6a6444', c: '#4e4a32', F: '#b8a888', W: '#d8cca8', o: '#c8a040', O: '#e8b830' }) },
  // su navegante (Ralph O'Hair): cazadora A-2 de cuero marrón y gorra
  navegante: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#8a5a2a'), tocado: 'gorra', pal: CLARA({ H: '#a8743c', h: '#c8904c', C: '#7a4a2a', c: '#5a341c', F: '#8a7a52', W: '#d8cca8', o: '#e8b830' }) },
  // el oficial meteorológico (William Jones-Burdick): uniforme verde oliva con camisa caqui
  meteorologo: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#2c2232'), tocado: 'gorra', pal: CLARA({ H: '#2c2232', h: '#54466a', C: '#5e5a3e', c: '#46422c', F: '#5e5a3e', W: '#c8b88a', o: '#c8a040' }) },
  // pilotos británicos en prácticas: uniforme azul grisáceo de la RAF
  britanico: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#a87040'), tocado: 'gorra', pal: CLARA({ H: '#c8904c', h: '#e0ac64', C: '#6a7a96', c: '#4e5c78', F: '#6a7a96', W: '#d8dce8', o: '#e8b830' }) },
  britanico2: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#1c1424'), pal: CLARA({ H: '#2c2232', h: '#54466a', C: '#6a7a96', c: '#4e5c78', F: '#6a7a96', W: '#d8dce8', o: '#2a2430' }) },
  // Isaac Cline (1900): traje oscuro de tres piezas, bigote y sombrero de ala corta
  cline: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#3a2418'), tocado: 'fedora', bigote: true, pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#3a3a4a', c: '#2a2a36', F: '#2e2e3c', G: '#1c1c24', W: '#f2eee2', o: '#c8a040' }) },
  // vecinos de Galveston en 1900
  vecino: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#5a3418'), tocado: 'fedora', pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#7a5a3a', c: '#5a4028', F: '#8c8070', G: '#3a2a20', W: '#f2eee2', o: '#2a2430' }) },
  vecina: { cab: CAB_EGIPCIA, cuerpo: CUERPO_VESTIDO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#5a3418'), pal: CLARA({ H: '#6a3a1a', h: '#8a5428', C: '#4a6a8a', c: '#36506a', W: '#f2eee2', L: '#2a2430' }) },
  // Herbert Saffir (1971): ingeniero, calvo, gafas, camisa blanca y corbata
  saffir: { cab: CAB_CALVO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#6a6a7a'), tocado: 'gafas', pal: CLARA({ H: '#8c8ca0', h: '#b8bccc', C: '#f2eee2', c: '#c8c0b0', F: '#5e5e70', W: '#f2eee2', o: '#3a5a8a' }) },
  // Robert Simpson (1971): director del Centro Nacional de Huracanes, traje marrón y pelo gris
  simpson: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#6a6a7a'), pal: CLARA({ H: '#8c8ca0', h: '#b8bccc', C: '#6a5a4a', c: '#4e4234', F: '#6a5a4a', W: '#f2eee2', o: '#8a3a2a' }) },
  // Ted Fujita (1971): gafas, pelo negro, camisa blanca y una cámara al cuello
  fujita: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#1c1424'), tocado: 'gafas', pal: CLARA({ H: '#1c1424', h: '#3a3046', S: '#f0c8a0', s: '#c8946a', C: '#f2eee2', c: '#c8c0b0', F: '#3a3a4a', W: '#f2eee2', o: '#1c1c24' }) },
  // los del Centro Nacional de Huracanes de hoy: polo azul marino
  pronosticador: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#1c1424'), pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#2a4a7a', c: '#1e365c', F: '#5e5e70', W: '#2a4a7a', o: '#e8e4dc' }) },
  pronosticadora: { cab: CAB_EGIPCIA, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#6a3a1a'), pal: CLARA({ H: '#a85a2a', h: '#c8783a', C: '#2a4a7a', c: '#1e365c', F: '#4a4a5a', W: '#2a4a7a', o: '#e8e4dc' }) },
  // tripulación del P-3: mono de vuelo verde salvia con auriculares
  tripulante: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#5a3418'), tocado: 'auriculares', pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#7a8a6a', c: '#5e6c50', F: '#7a8a6a', W: '#7a8a6a', o: '#2a4a7a', M: '#2a2430' }) },
  tripulanta: { cab: CAB_EGIPCIA, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#1c1424'), tocado: 'auriculares', pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#7a8a6a', c: '#5e6c50', F: '#7a8a6a', W: '#7a8a6a', o: '#2a4a7a', M: '#2a2430' }) },
  // granjero de las Grandes Llanuras: peto vaquero, camisa a cuadros roja y sombrero
  granjero: { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#6a4a2a'), tocado: 'vaquero', pal: CLARA({ H: '#8a5a2a', h: '#a8743c', C: '#3e5a8a', c: '#2c4468', F: '#3e5a8a', W: '#c84a3a', o: '#e8b830', V: '#c8a46a', v: '#8a6e42' }) },
};
Object.assign(ELENCO_CHIBI, ELENCO_HU);

// ── Episodio 13: la física del fútbol americano ────────────────────────────────────────────────────────────────────────
// Sin colores ni escudos de equipos reales de hoy: los de 1905–1913 son de época; los de hoy, inventados
const BASE13 = { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9 };
export const ELENCO_FA = {
  // Gus Dorais (1913): quarterback de Notre Dame, jersey de lana azul marino con cuello vuelto, pelo negro, sin casco
  dorais: { ...BASE13, ceja: hex('#1c1424'), pal: CLARA({ H: '#1c1424', h: '#3a3046', C: '#2a3458', c: '#1c2440', F: '#c8b88a', W: '#2a3458', o: '#c8a040' }) },
  // Knute Rockne (1913): jersey azul marino de Notre Dame y casco de cuero
  rockne: { ...BASE13, ceja: hex('#a87a48'), tocado: 'cuero', pal: CLARA({ H: '#c8a070', h: '#e0bc8c', B: '#7a4a24', b: '#5a3418', C: '#2a3458', c: '#1c2440', F: '#c8b88a', W: '#2a3458', o: '#c8a040' }) },
  // los dos en Cedar Point, de socorristas: camiseta de tirantes blanca con franja roja y pantalón azul
  doraisPlaya: { ...BASE13, ceja: hex('#1c1424'), pal: CLARA({ H: '#1c1424', h: '#3a3046', C: '#f2eee2', c: '#c84a3a', F: '#2a3458', W: '#f2eee2', o: '#c84a3a' }) },
  rocknePlaya: { ...BASE13, ceja: hex('#a87a48'), pal: CLARA({ H: '#c8a070', h: '#e0bc8c', C: '#f2eee2', c: '#c84a3a', F: '#2a3458', W: '#f2eee2', o: '#c84a3a' }) },
  // jugador del Ejército (1913): jersey negro y dorado de lana, casco de cuero
  soldadoJugador: { ...BASE13, ceja: hex('#5a3418'), tocado: 'cuero', pal: CLARA({ H: '#5a3418', h: '#8a5428', B: '#6a4020', b: '#4a2c14', C: '#2a2430', c: '#c8a040', F: '#c8b88a', W: '#2a2430', o: '#c8a040' }) },
  // cadete de West Point (1913): guerrera gris con botones y quepis gris
  cadete: { ...BASE13, ceja: hex('#6a4a2a'), tocado: 'kepi', pal: CLARA({ H: '#8a5a2a', h: '#a8743c', C: '#8c8ca0', c: '#6a6a7e', F: '#8c8ca0', W: '#f2eee2', o: '#2a2430' }) },
  // periodista de 1913: traje marrón y bombín
  periodista: { ...BASE13, ceja: hex('#3a2418'), tocado: 'fedora', bigote: true, pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#7a5a3a', c: '#5a4028', F: '#5a4a3a', G: '#2a2430', W: '#f2eee2', o: '#2a2430' }) },
  // jugador de 1905: jersey de lana a rayas, sin casco, pelo revuelto
  jugador1905: { ...BASE13, ceja: hex('#6a3a1a'), pal: CLARA({ H: '#7a4a24', h: '#a8743c', C: '#8a2a2a', c: '#e8d8b4', F: '#c8b88a', W: '#8a2a2a', o: '#e8d8b4' }) },
  // Theodore Roosevelt (1905): traje oscuro, gafas y bigote; siempre con trato serio
  roosevelt: { ...BASE13, ceja: hex('#5a3a24'), tocado: 'gafas', bigote: true, pal: CLARA({ H: '#6a4a2a', h: '#8a6a44', C: '#3a3a4a', c: '#2a2a36', F: '#2e2e3c', W: '#f2eee2', o: '#c8a040' }) },
  // representantes de las universidades (1905): traje y cuello duro
  rector: { ...BASE13, ceja: hex('#6a6a7a'), pal: CLARA({ H: '#8c8ca0', h: '#b8bccc', C: '#2e2e3c', c: '#1c1c24', F: '#2e2e3c', W: '#f2eee2', o: '#8a2a2a' }) },
  // Eddie Cochems (1906): entrenador, jersey de cuello alto gris y gorra
  cochems: { ...BASE13, ceja: hex('#3a2418'), tocado: 'gorra', pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#7a7a8a', c: '#5a5a6a', F: '#3a3a4a', W: '#f2eee2', o: '#2a3a7a' }) },
  // Bradbury Robinson y Jack Schneider (Saint Louis, 1906): jersey azul con franja blanca
  robinson: { ...BASE13, ceja: hex('#8a5a2a'), pal: CLARA({ H: '#a8743c', h: '#c8904c', C: '#2a4a8a', c: '#f2eee2', F: '#c8b88a', W: '#2a4a8a', o: '#f2eee2' }) },
  schneider: { ...BASE13, ceja: hex('#1c1424'), pal: CLARA({ H: '#2c2232', h: '#54466a', C: '#2a4a8a', c: '#f2eee2', F: '#c8b88a', W: '#2a4a8a', o: '#f2eee2' }) },
  // el físico y su colega (hoy): camisa y gafas, pelo gris; la colega, bata clara
  fisico: { ...BASE13, ceja: hex('#6a6a7a'), tocado: 'gafas', pal: CLARA({ H: '#9c9cac', h: '#c8ccd8', C: '#4a6a9a', c: '#36507a', F: '#4a4a5a', W: '#f2eee2', o: '#2a2430' }) },
  fisica: { cab: CAB_EGIPCIA, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#1c1424'), pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#e8e8f0', c: '#b8b8c8', F: '#3a3a4a', W: '#e8e8f0', o: '#2a6a8a' }) },
  // trabajadores de la fábrica de Ada: delantal de cuero sobre camisa azul
  obrero: { ...BASE13, ceja: hex('#5a3418'), pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#3e5a8a', c: '#8a5a2a', F: '#3a3a4a', W: '#3e5a8a', o: '#c8a040' }) },
  obrera: { cab: CAB_EGIPCIA, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#a85a2a'), pal: CLARA({ H: '#c8783a', h: '#e0944c', C: '#3e5a8a', c: '#8a5a2a', F: '#3a3a4a', W: '#3e5a8a', o: '#c8a040' }) },
  // Wellington Mara de niño (años veinte): recogepelotas con jersey y gorra
  recogepelotas: { ...BASE13, ceja: hex('#3a2418'), tocado: 'gorra', pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#3e5a8a', c: '#2c4468', F: '#c8b88a', W: '#3e5a8a', o: '#c84a3a' }) },
  // jugadores de hoy, de equipos inventados: verde azulado con naranja, y granate con blanco
  pateador: { ...BASE13, ceja: hex('#5a3418'), tocado: 'futbol', pal: CLARA({ H: '#5a3418', h: '#8a5428', X: '#1e8a8a', x: '#e8783a', w: '#7ad8d8', C: '#1e8a8a', c: '#e8783a', F: '#f2eee2', W: '#1e8a8a', o: '#e8783a' }) },
  quarterback: { ...BASE13, ceja: hex('#1c1424'), tocado: 'futbol', pal: MORENA({ H: '#1c1424', h: '#3a3046', X: '#1e8a8a', x: '#e8783a', w: '#7ad8d8', C: '#1e8a8a', c: '#e8783a', F: '#f2eee2', W: '#1e8a8a', o: '#e8783a' }) },
  receptor: { ...BASE13, ceja: hex('#8a5a2a'), tocado: 'futbol', pal: CLARA({ H: '#a8743c', h: '#c8904c', X: '#1e8a8a', x: '#e8783a', w: '#7ad8d8', C: '#1e8a8a', c: '#e8783a', F: '#f2eee2', W: '#1e8a8a', o: '#e8783a' }) },
  liniero: { ...BASE13, ceja: hex('#1c1424'), tocado: 'futbol', pal: MORENA({ H: '#1c1424', h: '#3a3046', X: '#8a2a3a', x: '#f2eee2', w: '#d87a8a', C: '#8a2a3a', c: '#f2eee2', F: '#f2eee2', W: '#8a2a3a', o: '#f2eee2' }) },
  // técnicos de la sala de datos: polo gris oscuro con auriculares
  tecnico: { ...BASE13, ceja: hex('#5a3418'), tocado: 'auriculares', pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#3a3a4a', c: '#2a2a36', F: '#4a4a5a', W: '#3a3a4a', o: '#2aa8a0', M: '#2a2430' }) },
  tecnica: { cab: CAB_EGIPCIA, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#1c1424'), tocado: 'auriculares', pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#3a3a4a', c: '#2a2a36', F: '#4a4a5a', W: '#3a3a4a', o: '#2aa8a0', M: '#2a2430' }) },
};
Object.assign(ELENCO_CHIBI, ELENCO_FA);

// ── Episodio 14: Oak Island, el Pozo del Dinero ────────────────────────────────────────────────────────────────────────
const BASE14 = { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9 };
export const ELENCO_OI = {
  // Daniel McGinnis (1795): muchacho colono, camisa de lino crema, chaleco marrón y pelo castaño
  mcginnis: { ...BASE14, ceja: hex('#6a3a1a'), pal: CLARA({ H: '#7a4a24', h: '#a8743c', C: '#7a5230', c: '#e8dcc0', F: '#5a4a3a', W: '#e8dcc0', o: '#c8a040' }) },
  // sus dos amigos (1795): casaca azul con sombrero de copa baja, y camisa roja con gorra de lana
  amigo1: { ...BASE14, ceja: hex('#2c2232'), tocado: 'capotain', pal: CLARA({ H: '#2c2232', h: '#54466a', C: '#3a4a6a', c: '#2a3650', F: '#5a4a3a', W: '#e8dcc0', o: '#c8a040' }) },
  amigo2: { ...BASE14, ceja: hex('#a8743c'), tocado: 'gorra', pal: CLARA({ H: '#c8904c', h: '#e0ac64', C: '#8a3a2a', c: '#6a2a1e', F: '#5a4a3a', W: '#e8dcc0', o: '#2a2430' }) },
  // obreros de las compañías (1803–1909): camisa clara, tirantes, pantalón de faena y sombrero
  cavador: { ...BASE14, ceja: hex('#5a3418'), tocado: 'fedora', pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#d8ccaa', c: '#5a3a24', F: '#4a4a5a', G: '#3a2a20', W: '#d8ccaa', o: '#5a3a24' }) },
  cavador2: { ...BASE14, ceja: hex('#1c1424'), tocado: 'gorra', bigote: true, pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#7a8a9a', c: '#3a3a4a', F: '#5a4a3a', W: '#7a8a9a', o: '#3a3a4a' }) },
  // el capataz de las compañías: chaleco oscuro, cadena de reloj y sombrero
  capataz: { ...BASE14, ceja: hex('#3a2418'), tocado: 'fedora', bigote: true, pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#3a3a4a', c: '#f2eee2', F: '#5a4a3a', G: '#2a2430', W: '#f2eee2', o: '#c8a040' }) },
  // Franklin D. Roosevelt joven (1909): traje claro de verano, quevedos; siempre con trato serio
  fdr: { ...BASE14, ceja: hex('#5a3a24'), tocado: 'gafas', pal: CLARA({ H: '#6a4a2a', h: '#8a6a44', C: '#c8bca0', c: '#a89c80', F: '#c8bca0', W: '#f2eee2', o: '#2a3a6a' }) },
  // Roosevelt de niño en Campobello: traje de marinerito blanco con cuello azul
  fdrNino: { ...BASE14, ceja: hex('#6a4a2a'), pal: CLARA({ H: '#8a6a44', h: '#a8865a', C: '#f2eee2', c: '#2a3a6a', F: '#f2eee2', W: '#2a3a6a', o: '#c84a3a' }) },
  // marinero del barco de 1939: jersey azul marino y gorra
  marinero39: { ...BASE14, ceja: hex('#5a3418'), tocado: 'gorra', pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#2a3458', c: '#1c2440', F: '#2a3458', W: '#f2eee2', o: '#f2eee2' }) },
  // la granjera de 1878 (Sophia Sellers): vestido marrón y delantal
  granjera: { cab: CAB_EGIPCIA, cuerpo: CUERPO_VESTIDO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#5a3418'), pal: CLARA({ H: '#6a3a1a', h: '#8a5428', C: '#7a5a3a', c: '#5a4028', W: '#f2eee2', L: '#2a2430' }) },
  // un geólogo (de cualquier época): chaqueta de lana verde, gafas y martillo
  geologo: { ...BASE14, ceja: hex('#6a6a7a'), tocado: 'gafas', pal: CLARA({ H: '#9c9cac', h: '#c8ccd8', C: '#4e6a4a', c: '#3a5038', F: '#5a4a3a', W: '#f2eee2', o: '#c8a040' }) },
  // Rick Lagina de niño (1965): jersey rojo de lana y pelo castaño
  rickNino: { ...BASE14, ceja: hex('#6a3a1a'), pal: CLARA({ H: '#7a4a24', h: '#a8743c', C: '#b83a3a', c: '#8a2a2a', F: '#3e5a8a', W: '#b83a3a', o: '#f2eee2' }) },
  // Dan Blankenship (1965): camisa de trabajo caqui y gorra
  blankenship: { ...BASE14, ceja: hex('#6a6a7a'), tocado: 'gorra', pal: CLARA({ H: '#8c8ca0', h: '#b8bccc', C: '#a8946a', c: '#7a6a48', F: '#4a4a5a', W: '#a8946a', o: '#3a3a4a' }) },
  // los hermanos Lagina (hoy): Rick con gorra verde y barba canosa; Marty con gorra azul y chaqueta
  rick: { ...BASE14, ceja: hex('#8c8ca0'), tocado: 'gorra', bigote: true, pal: CLARA({ H: '#9c9cac', h: '#c8ccd8', C: '#4e6a4a', c: '#3a5038', F: '#4a4a5a', W: '#4e6a4a', o: '#3a5038' }) },
  marty: { ...BASE14, ceja: hex('#8c8ca0'), tocado: 'gorra', pal: CLARA({ H: '#9c9cac', h: '#c8ccd8', C: '#2a4a7a', c: '#1e365c', F: '#4a4a5a', W: '#2a4a7a', o: '#1e365c' }) },
  // técnicos de hoy: chaleco naranja de alta visibilidad y casco
  operario: { ...BASE14, ceja: hex('#5a3418'), tocado: 'casco', pal: CLARA({ H: '#5a3418', h: '#8a5428', X: '#e8d84a', x: '#c8b83a', w: '#f8f0a0', C: '#e8783a', c: '#e8d84a', F: '#3a3a4a', W: '#e8783a', o: '#e8d84a' }) },
  operaria: { cab: CAB_EGIPCIA, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#1c1424'), tocado: 'casco', pal: MORENA({ H: '#1c1424', h: '#3a3046', X: '#f2eee2', x: '#c8c8c8', w: '#ffffff', C: '#e8783a', c: '#e8d84a', F: '#3a3a4a', W: '#e8783a', o: '#e8d84a' }) },
};
Object.assign(ELENCO_CHIBI, ELENCO_OI);

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
    const sh = -(def.dxCuerpo ?? 0), cm = 12 + 2 * sh;   // cuerpos anchos (ep19: Hulk, la Cosa): el hombro más afuera
    const fila = def.cuerpo[2] ?? '', manga = fila[cm] && fila[cm] !== '.' && fila[cm] !== 'k' ? fila[cm] : 'S';
    if (!brazoCache.has(manga)) brazoCache.set(manga, BRAZO.map((f) => f.replace(/M/g, manga)));
    dibujo(brazoCache.get(manga), dir > 0 ? x + 10 + sh : x - 4 - sh, yC - 7, dir, pal);
  };

  // brazo que sostiene algo (desde el 14, aprobado por el usuario): sale del hombro hacia el punto (tx, ty) —como mucho
  // 9 px—, manga del color de la ropa y antebrazo de piel, de 2 px con su contorno, y acaba en una mano redonda de 3 px
  // donde la escena pinta lo que se sostiene (un farol, una pala, una revista…). Devuelve dónde ha quedado la mano
  const brazoSostiene = (def, x, yC, dir, pal, objetivo) => {
    const sh = -(def.dxCuerpo ?? 0), cm = 12 + 2 * sh;
    const fila = def.cuerpo[2] ?? '', manga = pal[fila[cm]] && fila[cm] !== '.' && fila[cm] !== 'k' ? pal[fila[cm]] : pal.S;
    const sx = dir > 0 ? x + 12 + sh : x + 2 - sh, sy = yC + 2;
    let [tx, ty] = Array.isArray(objetivo) ? objetivo : [sx + 7 * dir, yC + 5];
    const dx = tx - sx, dy = ty - sy, d = Math.hypot(dx, dy) || 1, L = Math.min(9, d);
    const hx = Math.round(sx + dx / d * L), hy = Math.round(sy + dy / d * L), n = Math.max(1, Math.round(L));
    for (const borde of [1, 0]) for (let i = 0; i <= n; i++) {
      const cx = Math.round(sx + (hx - sx) * i / n), cy = Math.round(sy + (hy - sy) * i / n), c = borde ? P.k : i < n * 0.55 ? manga : pal.S;
      for (let a = -borde; a <= 1 + borde; a++) for (let b = -borde; b <= 1 + borde; b++) if (borde ? (Math.abs(a - 0.5) > 1 || Math.abs(b - 0.5) > 1) : true) pset(cx + a, cy + b, c);
    }
    for (let a = -2; a <= 2; a++) for (let b = -2; b <= 2; b++) { const r = Math.hypot(a, b); if (r <= 2.3) pset(hx + a, hy + b, r > 1.5 ? P.k : pal.S); }
    pset(hx + (dir > 0 ? 1 : -1), hy - 1, pal.s ?? pal.S);
    return [hx, hy];
  };

  // un personaje del reparto. o: dir (1 mira a la derecha), dedo (explica con el índice), brazos (los dos arriba),
  // sostiene (true o [x, y]: el brazo de delante sostiene algo ahí; devuelve la mano en .mano),
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
    const manos = o.sorpresa && o.manos === true, levanta = o.dedo || o.brazos || manos || o.sostiene;   // las manos arriba junto a la cabeza parecían orejas: la sorpresa va en la cara (o.manos: true para levantarlas)
    if (levanta && !sinBrazoCache.has(def)) sinBrazoCache.set(def, sinBrazo(def.cuerpo, def.brazoCol, ...(def.brazoFilas ?? [])));
    const base = levanta ? sinBrazoCache.get(def) : def.cuerpo;
    // ep19: def.detras / def.delante (capa, alas, cola, katanas; garras, llamas, brillos) reciben un contexto con px y rej
    // en coordenadas de la rejilla de 15 px (se voltean solas con dir); def.dxCuerpo centra un cuerpo más ancho que 15
    const lado = (y0) => ({ px: (i, j, c) => pset(Math.round(x + (dir > 0 ? i : 14 - i)), Math.round(y0 + j), c), rej: (g, i, j, p = pal) => dibujo(g, dir > 0 ? x + i : x + 15 - i - g[0].length, y0 + j, dir, p) });
    const ctx = (def.detras || def.delante) && { x, yC, yH, suelo, dir, pal, t, o, pset, cuerpo: lado(yC), cab: lado(yH) };
    if (def.detras) def.detras(ctx);
    dibujo(paso >= 0 ? conPaso(base, paso) : base, x + (def.dxCuerpo ?? 0), yC, dir, pal);
    if (o.dedo && !o.brazos && !manos) brazoArriba(def, x, yC, dir, pal);
    if (o.brazos || manos) { brazoArriba(def, x, yC, 1, pal); brazoArriba(def, x, yC, -1, pal); }
    const sostiene = o.sostiene && !o.brazos ? brazoSostiene(def, x, yC, dir, pal, o.sostiene) : null;   // o.sostiene: true (delante, a la altura del pecho) o [x, y]
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
    if (def.delante) def.delante(ctx);
    if (salto > 0) for (let i = -5; i <= 5; i++) if (Math.abs(i) > 2 - salto * 0.2) pset(x + 7 + i, suelo + 1, COL.mad1);
    return { cabeza: [x + 7, yH], mano: sostiene ?? [dir > 0 ? x + 15 : x, yH - 4] };
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

  const K = { ...R, P, COL, dibujo, cara, brazoArriba, actor, busto, nube, gaviota, bocadillo, caballo, carro, cocodrilo };
  // R.buf es un getter: el búfer en uso (la pantalla, o el de nuevo()/usar()). El «...R» lo congelaba en la pantalla, así
  // que en los fundidos entre planos lo que se pintaba con R.buf caía fuera de su búfer y salía negro (cielo y calle del
  // plano 2 de th-consejo, ep11, a 2:16,75).
  Object.defineProperty(K, 'buf', { get: () => R.buf, enumerable: true });
  return K;
}

// ── Episodio 15: Nueva York, de isla de bosques a ciudad de rascacielos (1524–hoy) ─────────────────────────────────────
// Los lenapes, con respeto y según las fuentes (plumas de colores en 1524, por la carta de Verrazzano); sin burlas.
const BASE15 = { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9 };
const BASE15M = { cab: CAB_EGIPCIA, cuerpo: CUERPO_VESTIDO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9 };
const BASE15P = { cab: CAB_CORTO, cuerpo: CUERPO_PEREGRINO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9 };
export const ELENCO_NY = {
  // Giovanni da Verrazzano (1524): jubón granate, barba oscura, gorra negra de terciopelo
  verrazzano: { ...BASE15, ceja: hex('#1c1424'), tocado: 'boina', bigote: true, pal: CLARA({ J: '#2a2430', j: '#4c4660', H: '#1c1424', h: '#3a3046', C: '#7a2a3a', c: '#5a1e2a', F: '#3a3046', W: '#e8dcc0', o: '#c8a040' }) },
  // marineros de La Dauphine (1524) y del Halve Maen (1609): camisa de lino, chaleco y gorro de lana
  marinero: { ...BASE15, ceja: hex('#6a3a1a'), tocado: 'boina', pal: CLARA({ J: '#8a3a2a', j: '#a85a44', H: '#7a4a24', h: '#a8743c', C: '#c8bc9a', c: '#7a5a3a', F: '#5a4a3a', W: '#c8bc9a', o: '#8a3a2a' }) },
  marinero2: { ...BASE15, ceja: hex('#1c1424'), pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#4a5a7a', c: '#36425a', F: '#5a4a3a', W: '#e8dcc0', o: '#c8a040' }) },
  // los lenapes (1524–1626): manto de piel, collar de cuentas; plumas de colores
  lenape: { cab: CAB_CORTO, cuerpo: CUERPO_NATIVO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#1c1424'), tocado: 'pluma', pal: NATIVA({ W: '#3e9ad4', w: '#2a70a8', D: '#d84a3a' }) },
  lenape2: { cab: CAB_CORTO, cuerpo: CUERPO_NATIVO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#1c1424'), tocado: 'plumas', pal: NATIVA({ W: '#e8c840', w: '#c8a020', B: '#a8784a', b: '#7a5030' }) },
  lenapa: { ...BASE15M, ceja: hex('#1c1424'), pal: NATIVA({ C: '#b8895a', c: '#8a6038', W: '#d8b07a', L: '#6a4a2a' }) },
  // Henry Hudson (1609): casaca oscura, cuello blanco, sombrero alto y barba
  hudson: { ...BASE15P, ceja: hex('#6a3a1a'), tocado: 'capotain', bigote: true, pal: CLARA({ H: '#7a4a24', h: '#a8743c', C: '#2a3046', F: '#3a3046', G: '#5a3a20' }) },
  // Juan Rodríguez (1613): marinero nacido en Santo Domingo, camisa roja y pañuelo, con su hacha
  rodriguez: { ...BASE15, ceja: hex('#1c1424'), pal: MORENA({ S: '#a86a40', s: '#7a4a2a', H: '#1c1424', h: '#3a3046', C: '#a83a2a', c: '#7a2a1e', F: '#5a4a3a', W: '#e8dcc0', o: '#e8c840' }) },
  // colonos holandeses (1624–1664): casaca oscura y sombrero alto; ella con cofia y delantal
  colono: { ...BASE15P, ceja: hex('#8a5428'), tocado: 'capotain', pal: CLARA({ H: '#a8703a', h: '#c8904c', C: '#3a4a3a', F: '#3a3046', G: '#5a3a20' }) },
  colona: { ...BASE15M, ceja: hex('#a8743c'), tocado: 'cofia', pal: CLARA({ H: '#c8904c', h: '#e0ac64', C: '#3a3a5a', c: '#2a2a46', W: '#f2eee2', L: '#2a2430' }) },
  // Peter Stuyvesant (1664): casaca negra con cuello blanco, pelo gris y sombrero; trato serio, sin burlas
  stuyvesant: { ...BASE15P, ceja: hex('#6a6a7a'), tocado: 'capotain', bigote: true, pal: CLARA({ H: '#8c8ca0', h: '#b8bccc', C: '#1c1c24', F: '#2a2430', G: '#3a2a20' }) },
  // oficial inglés (1664–1783): casaca roja, pelo empolvado, tricornio negro
  ingles: { ...BASE15, ceja: hex('#8a8a9a'), tocado: 'tricornio', pal: CLARA({ H: '#e8e4dc', h: '#c8c4bc', C: '#b8302a', c: '#8a2420', F: '#f2eee2', W: '#f2eee2', o: '#e8c840' }) },
  casacaRoja: { ...BASE15, ceja: hex('#5a3418'), tocado: 'tricornio', pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#b8302a', c: '#8a2420', F: '#f2eee2', W: '#f2eee2', o: '#f2eee2' }) },
  // delegados de 1765 y congresistas de 1789: casaca de paño, chaleco, peluca blanca
  delegado: { ...BASE15, ceja: hex('#8a8a9a'), tocado: 'tricornio', pal: CLARA({ H: '#f2eee2', h: '#d8d4cc', C: '#3a4a6a', c: '#c8a878', F: '#2a2430', W: '#f2eee2', o: '#c8a040' }) },
  delegado2: { ...BASE15, ceja: hex('#8a8a9a'), pal: CLARA({ H: '#e8e4dc', h: '#c8c4bc', C: '#5a3a2a', c: '#e8dcc0', F: '#2a2430', W: '#f2eee2', o: '#c8a040' }) },
  // los Hijos de la Libertad (1765): casaca marrón y tricornio; un farol en la mano
  libertad: { ...BASE15, ceja: hex('#3a2418'), tocado: 'tricornio', pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#7a5a3a', c: '#5a4028', F: '#3a3046', W: '#e8dcc0', o: '#c8a040' }) },
  libertad2: { ...BASE15, ceja: hex('#a8743c'), pal: CLARA({ H: '#c8904c', h: '#e0ac64', C: '#4a5a3a', c: '#36442a', F: '#5a4a3a', W: '#e8dcc0', o: '#c8a040' }) },
  // George Washington (1776–1789): casaca azul con solapas beis, pelo empolvado; tricornio en la guerra. Trato serio
  washington: { ...BASE15, ceja: hex('#8a8a9a'), tocado: 'tricornio', pal: CLARA({ H: '#f2eee2', h: '#d8d4cc', C: '#2a3a6a', c: '#d8c49a', F: '#d8c49a', W: '#f2eee2', o: '#e8c840' }) },
  // Washington en la investidura (1789): traje marrón de paño, sin sombrero
  washington89: { ...BASE15, ceja: hex('#8a8a9a'), pal: CLARA({ H: '#f2eee2', h: '#d8d4cc', C: '#6a4a2a', c: '#4e3420', F: '#6a4a2a', W: '#f2eee2', o: '#c8a040' }) },
  // soldados continentales (1776): casaca azul o de cazador, tricornio
  continental: { ...BASE15, ceja: hex('#5a3418'), tocado: 'tricornio', pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#2a3a6a', c: '#f2eee2', F: '#c8bc9a', W: '#f2eee2', o: '#c8a040' }) },
  continental2: { ...BASE15, ceja: hex('#1c1424'), pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#8a7a52', c: '#6a5a3a', F: '#c8bc9a', W: '#e8dcc0', o: '#5a3a20' }) },
  // el marinero del mástil (1783): camisa a rayas y gorro
  marinero83: { ...BASE15, ceja: hex('#a8743c'), tocado: 'boina', pal: CLARA({ J: '#2a3a6a', j: '#4a5a8a', H: '#c8904c', h: '#e0ac64', C: '#f2eee2', c: '#2a3a6a', F: '#2a3a6a', W: '#f2eee2', o: '#c84a3a' }) },
  // DeWitt Clinton (1825): levita negra, chaleco, pelo castaño y chistera
  clinton: { ...BASE15, ceja: hex('#5a3418'), tocado: 'chistera', pal: CLARA({ H: '#6a4020', h: '#8a5a30', C: '#1c1c24', c: '#f2eee2', F: '#2e2e3c', W: '#f2eee2', o: '#c8a040' }) },
  // obreros del canal y del puerto (1825–1860): camisa clara, tirantes y gorra
  estibador: { ...BASE15, ceja: hex('#5a3418'), tocado: 'gorra', pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#d8ccaa', c: '#5a3a24', F: '#4a4a5a', W: '#d8ccaa', o: '#5a3a24' }) },
  estibador2: { ...BASE15, ceja: hex('#1c1424'), bigote: true, pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#7a8a9a', c: '#3a3a4a', F: '#5a4a3a', W: '#7a8a9a', o: '#3a3a4a' }) },
  // comerciante y vecina de las brownstones (1850): levita y chistera; vestido largo
  comerciante: { ...BASE15, ceja: hex('#3a2418'), tocado: 'chistera', bigote: true, pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#3a3a4a', c: '#e8dcc0', F: '#5a4a3a', W: '#f2eee2', o: '#c8a040' }) },
  dama: { ...BASE15M, ceja: hex('#5a3418'), pal: CLARA({ H: '#6a3a1a', h: '#8a5428', C: '#6a4a7a', c: '#4e3460', W: '#f2eee2', L: '#2a2430' }) },
  // emigrantes (1840–1900): chaqueta gastada y gorra; ella con chal y pañuelo
  emigrante: { ...BASE15, ceja: hex('#6a3a1a'), tocado: 'gorra', pal: CLARA({ H: '#7a4a24', h: '#a8743c', C: '#5a5a4a', c: '#3e3e34', F: '#4a4a5a', W: '#e8dcc0', o: '#5a3a24' }) },
  emigrante2: { ...BASE15, ceja: hex('#1c1424'), bigote: true, pal: CLARA({ H: '#1c1424', h: '#3a3046', C: '#6a4a3a', c: '#4e3428', F: '#3a3a4a', W: '#e8dcc0', o: '#c8a040' }) },
  emigranta: { ...BASE15M, ceja: hex('#a85a2a'), tocado: 'cofia', pal: CLARA({ H: '#c8783a', h: '#e0944c', C: '#7a3a3a', c: '#5a2a2a', W: '#d8ccaa', L: '#2a2430' }) },
  // Annie Moore (1892): muchacha irlandesa, abrigo verde oscuro y pelo pelirrojo; sus hermanos, con gorra
  annie: { ...BASE15M, ceja: hex('#a8502a'), pal: CLARA({ H: '#b85a2a', h: '#d8783a', C: '#3a5a3a', c: '#2a442a', W: '#e8dcc0', L: '#2a2430' }) },
  hermanoMoore: { ...BASE15, ceja: hex('#a8502a'), tocado: 'gorra', pal: CLARA({ H: '#b85a2a', h: '#d8783a', C: '#5a4a3a', c: '#3e3428', F: '#4a4a5a', W: '#e8dcc0', o: '#5a4a3a' }) },
  // funcionario de Ellis Island (1892): uniforme azul marino y gorra de plato
  funcionario: { ...BASE15, ceja: hex('#3a2418'), tocado: 'gorra', bigote: true, pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#2a3458', c: '#1c2440', F: '#2a3458', W: '#f2eee2', o: '#c8a040' }) },
  // Emily Roebling (1883): vestido largo morado oscuro y pelo recogido; Washington Roebling, barba y bata, en la ventana
  emily: { ...BASE15M, ceja: hex('#3a2418'), pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#4a2a4a', c: '#341c34', W: '#f2eee2', L: '#2a2430' }) },
  roebling: { ...BASE15, ceja: hex('#5a3418'), bigote: true, pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#5a5a6a', c: '#42424e', F: '#3a3a4a', W: '#f2eee2', o: '#2a2430' }) },
  // Elisha Otis (1854): barba, levita negra y chistera
  otis: { ...BASE15, ceja: hex('#3a2418'), tocado: 'chistera', bigote: true, pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#1c1c24', c: '#f2eee2', F: '#2e2e3c', W: '#f2eee2', o: '#c8a040' }) },
  // obreros de las vigas (1902–1931): mono de trabajo, gorra y camisa de cuadros
  vigas: { ...BASE15, ceja: hex('#5a3418'), tocado: 'gorra', pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#3e5a8a', c: '#2c4468', F: '#3e5a8a', W: '#c84a3a', o: '#c8a040' }) },
  vigas2: { ...BASE15, ceja: hex('#1c1424'), tocado: 'gorra', pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#7a6a4a', c: '#5a4a32', F: '#4a4a5a', W: '#7a6a4a', o: '#3a3a4a' }) },
  // oficinistas (1915–1931): traje gris, corbata y sombrero de fieltro
  oficinista: { ...BASE15, ceja: hex('#3a2418'), tocado: 'fedora', pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#5e5e70', c: '#46465a', F: '#5e5e70', G: '#2a2430', W: '#f2eee2', o: '#8a2a2a' }) },
  oficinista2: { ...BASE15M, ceja: hex('#1c1424'), pal: CLARA({ H: '#1c1424', h: '#3a3046', C: '#2a5a6a', c: '#1e4450', W: '#f2eee2', L: '#2a2430' }) },
  // neoyorquinos de hoy: chaqueta, sudadera, abrigo
  neoyorquino: { ...BASE15, ceja: hex('#1c1424'), pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#e8783a', c: '#c85a2a', F: '#2a3a5a', W: '#e8783a', o: '#f2eee2' }) },
  neoyorquina: { cab: CAB_EGIPCIA, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9, ceja: hex('#6a3a1a'), pal: CLARA({ H: '#8a4a24', h: '#a8643a', C: '#2a6a5a', c: '#1e5044', F: '#3a3a4a', W: '#2a6a5a', o: '#e8c840' }) },
  neoyorquino2: { ...BASE15, ceja: hex('#5a3418'), tocado: 'gorra', pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#5a4a8a', c: '#42366a', F: '#3a3a4a', W: '#5a4a8a', o: '#e8c840' }) },
};
Object.assign(ELENCO_CHIBI, ELENCO_NY);

// ── Episodio 16: homenaje a las aventuras de LucasArts (1987–1998 y hoy) ──────────────────────────────────────────────
// Personajes de homenaje, dibujados por nosotros y reconocibles por su silueta y su ropa, sin copiar sprites. Los que no
// son humanos (los dos tentáculos, el perro y el conejo detectives, el esqueleto agente de viajes, el demonio mecánico,
// el mono de tres cabezas, el hámster) son piezas de la-comun.js.
const BASE16 = { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9 };
const BASE16M = { cab: CAB_EGIPCIA, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9 };
const BASE16V = { cab: CAB_EGIPCIA, cuerpo: CUERPO_VESTIDO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9 };
export const ELENCO_LA = {
  // el científico loco: bata blanca, gafas y pelo blanco revuelto
  cientifico: { ...BASE16, ceja: hex('#8a8a9a'), tocado: 'gafas', pal: CLARA({ H: '#f2eee2', h: '#c8c4bc', C: '#f2eee2', c: '#c8c0b0', F: '#4a4a5a', W: '#f2eee2', o: '#4aa8a0' }) },
  // el empollón: gafas, camisa clara de manga corta con bolígrafos y pelo castaño
  empollon: { ...BASE16, ceja: hex('#6a3a1a'), tocado: 'gafas', pal: CLARA({ H: '#7a4a24', h: '#a8743c', C: '#e8e0c8', c: '#c8bc9a', F: '#6a5a4a', W: '#e8e0c8', o: '#3a5a8a' }) },
  // el roquero: camiseta negra, gorra roja al revés y pelo largo castaño
  roquero: { ...BASE16, ceja: hex('#5a3418'), tocado: 'gorra', pal: CLARA({ H: '#6a4020', h: '#8a5a30', C: '#2a2430', c: '#c84a3a', F: '#3e5a8a', W: '#2a2430', o: '#c84a3a' }) },
  // la chica rara: vestido de bata de enfermera verde y pelo oscuro
  chicaRara: { ...BASE16M, ceja: hex('#1c1424'), pal: CLARA({ H: '#1c1424', h: '#3a3046', C: '#7aa87a', c: '#5a8a5a', F: '#3a3a4a', W: '#7aa87a', o: '#f2eee2' }) },
  // el aspirante a pirata: camisa blanca, pantalón oscuro, coleta rubia
  aspirante: { ...BASE16, ceja: hex('#a8743c'), pal: CLARA({ H: '#e0b860', h: '#c8984a', C: '#f2eee2', c: '#c8c0b0', F: '#2a2430', W: '#f2eee2', o: '#c8a040' }) },
  // la gobernadora: vestido rojo y pelo pelirrojo
  gobernadora: { ...BASE16V, ceja: hex('#a8502a'), pal: CLARA({ H: '#b85a2a', h: '#d8783a', C: '#a83a3a', c: '#7a2a2a', W: '#f2eee2', L: '#2a2430' }) },
  // el pirata fantasma: casaca azul, barba verde, piel verdosa y sombrero de capitán
  fantasma: { ...BASE16, ceja: hex('#2a6a3a'), tocado: 'bicornio', bigote: true, pal: { S: hex('#a8d8a8'), s: hex('#78a878'), H: hex('#3a8a4a'), h: hex('#5aa86a'), C: hex('#2a3a6a'), c: hex('#1e2a50'), F: hex('#2a2430'), W: hex('#c8f0c8'), o: hex('#e8c840'), N: hex('#1c1c24'), D: hex('#c84a3a') } },
  // la maestra de esgrima: chaqueta oscura con fajín y pelo recogido
  esgrimista: { ...BASE16M, ceja: hex('#3a2418'), pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#4a2a4a', c: '#c84a3a', F: '#2a2430', W: '#f2eee2', o: '#c8a040' }) },
  // un pirata de la taberna: camisa a rayas y pañuelo
  pirata: { ...BASE16, ceja: hex('#1c1424'), bigote: true, pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#f2eee2', c: '#c84a3a', F: '#5a4a3a', W: '#f2eee2', o: '#c84a3a' }) },
  // diseñadores y programadores de los ochenta: camisa de cuadros, gafas, barba
  disenador: { ...BASE16, ceja: hex('#5a3418'), tocado: 'gafas', bigote: true, pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#8a3a3a', c: '#c8a878', F: '#3e5a8a', W: '#8a3a3a', o: '#c8a878' }) },
  disenador2: { ...BASE16, ceja: hex('#1c1424'), pal: CLARA({ H: '#1c1424', h: '#3a3046', C: '#3e6a8a', c: '#2c5068', F: '#4a4a5a', W: '#e8e0c8', o: '#c8a040' }) },
  disenadora: { ...BASE16M, ceja: hex('#a85a2a'), tocado: 'gafas', pal: CLARA({ H: '#c8783a', h: '#e0944c', C: '#6a8a4a', c: '#4e6a38', F: '#3a3a4a', W: '#6a8a4a', o: '#f2eee2' }) },
  // los músicos: jersey y camisa
  musico: { ...BASE16, ceja: hex('#3a2418'), bigote: true, pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#5a4a7a', c: '#42365c', F: '#3a3a4a', W: '#5a4a7a', o: '#f2eee2' }) },
  // un caballero de 1793 que vuela una cometa: casaca marrón, peluca gris y gafitas
  caballero: { ...BASE16, ceja: hex('#8a8a9a'), tocado: 'gafas', pal: CLARA({ H: '#c8c4bc', h: '#a8a49c', C: '#6a4a2a', c: '#4e3420', F: '#2a2430', W: '#f2eee2', o: '#c8a040' }) },
  // un motero: chupa negra y pelo negro
  motero: { ...BASE16, ceja: hex('#1c1424'), bigote: true, pal: CLARA({ H: '#1c1424', h: '#3a3046', C: '#1c1c24', c: '#5a5a6a', F: '#2a3a5a', W: '#1c1c24', o: '#c8c8d0' }) },
  // un astronauta: traje blanco
  astronauta: { ...BASE16, ceja: hex('#5a3418'), pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#e8e8f0', c: '#b8b8c8', F: '#e8e8f0', W: '#e8e8f0', o: '#c84a3a' }) },
  // el chico de los noventa y de hoy, y su padre
  chico: { ...BASE16, ceja: hex('#6a3a1a'), pal: CLARA({ H: '#7a4a24', h: '#a8743c', C: '#3e8a6a', c: '#2c6a50', F: '#3e5a8a', W: '#3e8a6a', o: '#f2eee2' }) },
  padre: { ...BASE16, ceja: hex('#5a5a6a'), bigote: true, pal: CLARA({ H: '#6a6a7a', h: '#8a8a9a', C: '#7a5a3a', c: '#5a4028', F: '#3a3a4a', W: '#e8e0c8', o: '#c8a040' }) },
  // creadores con canas (2016–2022): camisa y barba gris
  creador: { ...BASE16, ceja: hex('#8a8a9a'), tocado: 'gafas', bigote: true, pal: CLARA({ H: '#9c9cac', h: '#c8ccd8', C: '#2a2430', c: '#5a5a6a', F: '#3e5a8a', W: '#2a2430', o: '#c84a3a' }) },
  creador2: { ...BASE16, ceja: hex('#8a8a9a'), bigote: true, pal: CLARA({ H: '#9c9cac', h: '#c8ccd8', C: '#6a3a3a', c: '#4e2a2a', F: '#3a3a4a', W: '#6a3a3a', o: '#f2eee2' }) },
  // jóvenes que hacen juegos hoy
  joven: { ...BASE16M, ceja: hex('#1c1424'), pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#e8783a', c: '#c85a2a', F: '#2a3a5a', W: '#e8783a', o: '#f2eee2' }) },
  joven2: { ...BASE16, ceja: hex('#5a3418'), tocado: 'auriculares', pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#5a4a8a', c: '#42366a', F: '#3a3a4a', W: '#5a4a8a', o: '#e8c840', M: '#2a2430' }) },
};
Object.assign(ELENCO_CHIBI, ELENCO_LA);

// ── Episodio 17 (los tesoros perdidos): templarios, reyes, papas, masones, curas, arqueólogos y buscadores ─────────
// caballero templario: sobreveste blanca larga hasta las rodillas con la cruz roja en el pecho (D), cota de malla gris
// en brazos y piernas (Z/z), cinturón y botas. Con otra paleta (W negro, D blanco) es un hospitalario.
const CUERPO_TEMPLARIO = [
  '...kkZZZZZkk...',
  '..kWWWWDWWWWk..',
  '.kZkWWDDDWWkZk.',
  '.kZkWWWDWWWkZk.',
  '.kZkWWWDWWWkZk.',
  '.kSkGGGGGGGkSk.',
  '..kkWWWWWWWkk..',
  '...kWWWkWWWk...',
  '...kWWWkWWWk...',
  '...kZZZkZZZk...',
  '...kzzzkzzzk...',
  '...kLLLkLLLk...',
  '..kkkkk.kkkkk..',
];
// túnica larga hasta los pies (rey, papa, obispo, peregrino medieval, poeta): C/c la túnica, o el ribete
const CUERPO_TUNICA_LARGA = [
  '...kkCCCCCkk...',
  '..kCCCCoCCCCk..',
  '.kCkCCCoCCCkCk.',
  '.kCkCCCoCCCkCk.',
  '.kCkCCCoCCCkCk.',
  '.kSkGGGGGGGkSk.',
  '..kkCCCCCCCkk..',
  '...kCCCCCCCk...',
  '...kCCCCCCCk...',
  '...kCCCCCCCk...',
  '...kcccccccck..',
  '...kooooooook..',
  '...kkLkkkkLkk..',
];
// sotana negra con alzacuello blanco y botones (el cura de 1885)
const CUERPO_SOTANA = [
  '....kkWWWkk....',
  '..kkCCWWWCCkk..',
  '.kCkCCCoCCCkCk.',
  '.kCkCCCCCCCkCk.',
  '.kCkCCCoCCCkCk.',
  '.kSkCCCCCCCkSk.',
  '..kkCCCoCCCkk..',
  '...kCCCCCCCk...',
  '...kCCCoCCCk...',
  '...kCCCCCCCk...',
  '...kcccccccck..',
  '...kkkkkkkkk...',
  '....kLk.kLk....',
];
// masón del siglo XVIII: casaca con chaleco, y el mandil blanco atado a la cintura (W, con ribete azul A)
const CUERPO_MANDIL = [
  '...kkWWWWWkk...',
  '..kCCCWWWCCCk..',
  '.kCkCCCoCCCkCk.',
  '.kCkCCCoCCCkCk.',
  '.kCkCCCoCCCkCk.',
  '.kSkAAAAAAAkSk.',
  '..kkAWWWWWAkk..',
  '...kAWWWWWAk...',
  '...kAWWWWWAk...',
  '...kAAAAAAAk...',
  '...kFFFkFFFk...',
  '...kFFFkFFFk...',
  '..kkkkk.kkkkk..',
];
// buscador de tesoros de hoy: chaleco de muchos bolsillos sobre camisa, pantalón de campo y botas
const CUERPO_BUSCADOR = [
  '...kkCCCCCkk...',
  '..kCVVCCCVVCk..',
  '.kCkVoVCVoVkCk.',
  '.kCkVVVCVVVkCk.',
  '.kCkVoVCVoVkCk.',
  '.kSkVVVCVVVkSk.',
  '..kkGGGGGGGkk..',
  '...kFFFkFFFk...',
  '...kFFFkFFFk...',
  '...kFFFkFFFk...',
  '...kffFkFffk...',
  '...kLLLkLLLk...',
  '..kkkkk.kkkkk..',
];
Object.assign(TOCADOS, {
  // corona de oro de rey (1307), con tres puntas y piedras rojas
  corona: [[
    '...k.k.k.k.k...',
    '...kokokokok...',
    '...kooDoooDok..',
    '...kkkkkkkkk...',
  ], -3],
  // mitra de papa u obispo: alta y blanca (X) con la franja de oro (o) en medio
  mitra: [[
    '.....kkkkk.....',
    '....kXXoXXk....',
    '...kXXXoXXXk...',
    '...kXXXoXXXk...',
    '...kXXXoXXXk...',
    '...kooooooook..',
    '...kkkkkkkkkk..',
  ], -6],
  // capucha de malla de caballero (gris), que tapa el pelo y las orejas, nunca la cara
  malla: [[
    '...kkkkkkkk....',
    '..kZZzZZzZZk...',
    '.kZzZZzZZzZZk..',
    '.kZZk.......k..',
    '.kzZk..........',
    '.kZZk..........',
    '.kzZk..........',
  ], 0],
});
export const ELENCO_TE = {
  // el buscador de tesoros con su detector (nuestro, de hoy): fedora marrón, chaleco verde oliva y barba de tres días
  buscador: { ...BASE16, cuerpo: CUERPO_BUSCADOR, ceja: hex('#5a3418'), tocado: 'fedora', pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#e8dcc0', c: '#c8bc9a', V: '#6a7a3a', F: '#7a6a4a', f: '#5a4e34', G: '#5a3a1a', o: '#c8a040', J: '#7a4a24', j: '#5a3418' }) },
  // caballeros templarios de 1120–1307: sobreveste blanca con cruz roja y capucha de malla
  templario: { ...BASE16, cuerpo: CUERPO_TEMPLARIO, ceja: hex('#3a2418'), tocado: 'malla', bigote: true, pal: CLARA({ H: '#3a2418', h: '#5a3a24', W: '#f2eee2', D: '#c8303a', G: '#5a3a1a', L: '#4a3020' }) },
  templario2: { ...BASE16, cuerpo: CUERPO_TEMPLARIO, ceja: hex('#a8743c'), tocado: 'malla', pal: CLARA({ H: '#a8743c', h: '#c8984a', W: '#f2eee2', D: '#c8303a', G: '#5a3a1a', L: '#4a3020' }) },
  // Jacques de Molay, el último maestre (1314): mayor, barba blanca, sobreveste de templario sin malla
  molay: { ...BASE16, cuerpo: CUERPO_TEMPLARIO, ceja: hex('#c8c4bc'), bigote: true, pal: CLARA({ H: '#d8d4cc', h: '#f2eee2', W: '#f2eee2', D: '#c8303a', G: '#5a3a1a', L: '#4a3020' }) },
  // un hospitalario: la misma sobreveste en negro con la cruz blanca
  hospitalario: { ...BASE16, cuerpo: CUERPO_TEMPLARIO, ceja: hex('#1c1424'), tocado: 'malla', bigote: true, pal: CLARA({ H: '#1c1424', h: '#3a3046', W: '#2a2430', D: '#f2eee2', G: '#5a3a1a', L: '#4a3020' }) },
  // el rey Felipe IV de Francia (1307): túnica azul con ribete de oro, corona y pelo castaño claro
  felipe: { ...BASE16, cuerpo: CUERPO_TUNICA_LARGA, ceja: hex('#8a5a30'), tocado: 'corona', pal: CLARA({ H: '#a8743c', h: '#c8984a', C: '#2a4a9a', c: '#1e3670', o: '#e8b830', G: '#c8a040', L: '#3a2a4a', D: '#c8303a' }) },
  // el papa (1312) y un obispo: túnica blanca o morada y mitra
  papa: { ...BASE16, cuerpo: CUERPO_TUNICA_LARGA, ceja: hex('#8a8a9a'), tocado: 'mitra', pal: CLARA({ H: '#9c9cac', h: '#c8ccd8', C: '#f2eee2', c: '#c8c0b0', o: '#e8b830', G: '#e8b830', L: '#c8303a', X: '#f2eee2' }) },
  obispo: { ...BASE16, cuerpo: CUERPO_TUNICA_LARGA, ceja: hex('#8a8a9a'), tocado: 'mitra', bigote: true, pal: CLARA({ H: '#9c9cac', h: '#c8ccd8', C: '#6a2a7a', c: '#4e1e5a', o: '#e8b830', G: '#e8b830', L: '#2a2430', X: '#f2eee2' }) },
  // soldados del rey (1307): capucha de malla y túnica azul con la flor dorada
  soldado: { ...BASE16, ceja: hex('#3a2418'), tocado: 'malla', bigote: true, pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#2a4a9a', c: '#1e3670', F: '#5a5a6a', W: '#c0c4d4', o: '#e8b830' }) },
  // un peregrino medieval: hábito pardo largo con la concha (o), y un ladrón de caminos: túnica verde oscura
  peregrino: { ...BASE16, cuerpo: CUERPO_TUNICA_LARGA, ceja: hex('#5a3418'), bigote: true, pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#8a6a4a', c: '#6a5038', o: '#f2eee2', G: '#5a3a1a', L: '#5a3a1a' }) },
  ladron: { ...BASE16, ceja: hex('#1c1424'), bigote: true, pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#3a5a3a', c: '#2a422a', F: '#4a3a2a', W: '#3a5a3a', o: '#8a6a3a' }) },
  // un escribano: túnica gris y pelo castaño
  escribano: { ...BASE16, cuerpo: CUERPO_TUNICA_LARGA, ceja: hex('#6a3a1a'), pal: CLARA({ H: '#6a4020', h: '#8a5a30', C: '#6a6a7a', c: '#4e4e5c', o: '#c8c0b0', G: '#3a2a1a', L: '#3a2a1a' }) },
  // el poeta (1190–1210): túnica roja larga y boina
  poeta: { ...BASE16, cuerpo: CUERPO_TUNICA_LARGA, ceja: hex('#5a3418'), tocado: 'boina', pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#a83a3a', c: '#7a2a2a', o: '#e8b830', G: '#5a3a1a', L: '#3a2a1a', J: '#2a4a6a', j: '#1e3650' }) },
  // masones del siglo XVIII (1717–1760): casaca, peluca y mandil; Andrew Ramsay, con casaca granate
  mason: { ...BASE16, cuerpo: CUERPO_MANDIL, ceja: hex('#8a8a9a'), pal: CLARA({ H: '#e8e4dc', h: '#c8c4bc', C: '#3a3a5a', c: '#2a2a44', W: '#f2eee2', A: '#3a6ac8', F: '#2a2430', o: '#e8b830' }) },
  mason2: { ...BASE16, cuerpo: CUERPO_MANDIL, ceja: hex('#5a3418'), tocado: 'tricornio', pal: CLARA({ H: '#e8e4dc', h: '#c8c4bc', C: '#4a3a2a', c: '#33281c', W: '#f2eee2', A: '#3a6ac8', F: '#2a2430', o: '#e8b830', J: '#1c1c24', j: '#3a3a4a' }) },
  ramsay: { ...BASE16, cuerpo: CUERPO_MANDIL, ceja: hex('#8a8a9a'), pal: CLARA({ H: '#e8e4dc', h: '#c8c4bc', C: '#7a2a3a', c: '#5a1e2a', W: '#f2eee2', A: '#3a6ac8', F: '#2a2430', o: '#e8b830' }) },
  // Bérenger Saunière (1885–1910): sotana negra y pelo oscuro
  sauniere: { ...BASE16, cuerpo: CUERPO_SOTANA, ceja: hex('#1c1424'), pal: CLARA({ H: '#1c1424', h: '#3a3046', C: '#1c1c24', c: '#2a2a34', W: '#f2eee2', o: '#5a5a6a', L: '#1c1c24' }) },
  // el dueño del hotel (años cincuenta): traje claro, corbata y bigote; un periodista con gabardina
  corbu: { ...BASE16, ceja: hex('#3a2418'), bigote: true, pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#c8b89a', c: '#a8987a', F: '#a8987a', W: '#f2eee2', o: '#a83a3a' }) },
  periodista: { ...BASE16, ceja: hex('#5a3418'), tocado: 'fedora', pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#a88a5a', c: '#86683e', F: '#4a4a5a', W: '#e8e0c8', o: '#3a3a4a', J: '#4a4a5a', j: '#2a2a34' }) },
  // arqueólogos de 1952 con salacot y camisa caqui; el ingeniero de Manchester con bata gris
  arqueologo: { ...BASE16, ceja: hex('#5a3418'), tocado: 'salacot', bigote: true, pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#c8b078', c: '#a8905a', F: '#a8905a', W: '#c8b078', o: '#7a5a3a' }) },
  arqueologa: { ...BASE16M, ceja: hex('#a8502a'), tocado: 'salacot', pal: CLARA({ H: '#b85a2a', h: '#d8783a', C: '#c8b078', c: '#a8905a', F: '#7a6a4a', W: '#c8b078', o: '#f2eee2' }) },
  ingeniero: { ...BASE16, ceja: hex('#8a8a9a'), tocado: 'gafas', pal: CLARA({ H: '#6a6a7a', h: '#8a8a9a', C: '#8a8e9a', c: '#6a6e7a', F: '#3a3a4a', W: '#8a8e9a', o: '#3a3a4a' }) },
  // Forrest Fenn (2010): mayor, pelo blanco, sombrero vaquero y chaleco; el estudiante de 2020 con gorra y mochila
  fenn: { ...BASE16, ceja: hex('#c8c4bc'), tocado: 'vaquero', pal: CLARA({ H: '#e8e4dc', h: '#c8c4bc', C: '#e8dcc0', c: '#c8bc9a', F: '#3a4a6a', W: '#7a5a3a', o: '#c8a040', J: '#7a5a3a', j: '#5a3e24' }) },
  estudiante: { ...BASE16, ceja: hex('#1c1424'), tocado: 'gorra', pal: CLARA({ H: '#1c1424', h: '#3a3046', C: '#3a6a8a', c: '#2a5068', F: '#4a4a5a', W: '#3a6a8a', o: '#e8783a' }) },
  // gente de hoy: una niña en el museo y turistas
  nina: { ...BASE16M, ceja: hex('#1c1424'), pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#e8783a', c: '#c85a2a', F: '#3a4a7a', W: '#e8783a', o: '#f2eee2' }) },
  turista: { ...BASE16, ceja: hex('#a8743c'), tocado: 'gorra', pal: CLARA({ H: '#e0b860', h: '#c8984a', C: '#e84a7a', c: '#c83a5a', F: '#3e5a8a', W: '#e84a7a', o: '#f2eee2' }) },
};
Object.assign(ELENCO_CHIBI, ELENCO_TE);
export const ELENCO_SI = {
  // Roberta Williams en 1979–1990: pelo castaño largo con flequillo, jersey malva; y de mayor (2020–2023): media melena rubia ceniza y gafas
  roberta: { ...BASE16M, ceja: hex('#5a3418'), pal: CLARA({ H: '#6a4020', h: '#8a5a30', C: '#9a6a9a', c: '#7a4e7a', F: '#3a4a6a', W: '#9a6a9a', o: '#f2eee2' }) },
  robertaMayor: { ...BASE16M, ceja: hex('#a8987a'), tocado: 'gafas', pal: CLARA({ H: '#d8c8a0', h: '#c0ae84', C: '#3a6a8a', c: '#2a5068', F: '#3a3a4a', W: '#3a6a8a', o: '#f2eee2' }) },
  // Ken Williams en 1979–1990: pelo oscuro, barba, camisa de cuadros azul; y de mayor: pelo y barba grises, gafas
  ken: { ...BASE16, ceja: hex('#2a1c14'), bigote: true, pal: CLARA({ H: '#2a1c14', h: '#4a3020', C: '#4a6a9a', c: '#c8d0e0', F: '#4a4a5a', W: '#4a6a9a', o: '#c8d0e0' }) },
  kenMayor: { ...BASE16, ceja: hex('#8a8a9a'), tocado: 'gafas', bigote: true, pal: CLARA({ H: '#a8a8b4', h: '#c8ccd8', C: '#5a5a6a', c: '#3e3e4c', F: '#3a3a4a', W: '#5a5a6a', o: '#f2eee2' }) },
  // el programador que exploraba cuevas (años setenta): casco con luz, mono caqui y barba
  espeleologo: { ...BASE16, ceja: hex('#5a3418'), tocado: 'casco', bigote: true, pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#a8905a', c: '#86703e', F: '#86703e', W: '#a8905a', o: '#e8c840' }) },
  // dos ejecutivos de 1983: traje gris oscuro, camisa blanca y corbata
  ejecutivo: { ...BASE16, ceja: hex('#3a2418'), pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#3a3e4c', c: '#f2eee2', F: '#3a3e4c', W: '#3a3e4c', o: '#2a4a9a' }) },
  ejecutivo2: { ...BASE16, ceja: hex('#a8743c'), tocado: 'gafas', pal: CLARA({ H: '#c8984a', h: '#a8743c', C: '#2a2e3a', c: '#f2eee2', F: '#2a2e3a', W: '#2a2e3a', o: '#a83a3a' }) },
  // el caballero del cuento (nuestro, homenaje): gorro rojo con pluma, túnica azul con cinturón, calzas rojas, pelo castaño
  graham: { ...BASE16, ceja: hex('#6a3a1a'), tocado: 'pluma', pal: CLARA({ H: '#7a4a24', h: '#a8743c', C: '#2a5aa8', c: '#1e4280', F: '#a83a3a', W: '#2a5aa8', o: '#c8a040', J: '#c83a3a', j: '#8a2a2a' }) },
  // el viejo rey del cuento: túnica larga granate, corona y barba blanca
  reyCuento: { ...BASE16, cuerpo: CUERPO_TUNICA_LARGA, ceja: hex('#c8c4bc'), tocado: 'corona', bigote: true, pal: CLARA({ H: '#e8e4dc', h: '#c8c4bc', C: '#7a2a3a', c: '#5a1e2a', o: '#e8b830', G: '#e8b830', L: '#3a2a4a', D: '#e8b830' }) },
  // la princesa del cuento: vestido azul celeste con ribete blanco y pelo rubio largo
  rosella: { ...BASE16V, ceja: hex('#c8984a'), pal: CLARA({ H: '#f0c860', h: '#d8a840', C: '#6aa8d8', c: '#4a88b8', W: '#f2eee2', L: '#3a3a5a' }) },
  // un gnomo del bosque: gorro rojo puntiagudo, barba blanca, chaqueta verde
  gnomo: { ...BASE16, ceja: hex('#c8c4bc'), tocado: 'santa', bigote: true, pal: CLARA({ H: '#e8e4dc', h: '#c8c4bc', C: '#3a7a3a', c: '#2a5a2a', F: '#5a3a1a', W: '#3a7a3a', o: '#c83a3a' }) },
  // la pastora de las canciones infantiles: vestido rosa, cofia blanca
  pastora: { ...BASE16V, ceja: hex('#a8743c'), tocado: 'cofia', pal: CLARA({ H: '#c8984a', h: '#a8743c', C: '#e88aa8', c: '#c86a88', W: '#f2eee2', L: '#3a3a5a' }) },
  // policía de carreteras de 1987: camisa caqui, pantalón verde oscuro, gorra; y su compañero, con bigote
  policia: { ...BASE16, ceja: hex('#3a2418'), tocado: 'gorra', pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#c8b078', c: '#a8905a', F: '#3a4a3a', W: '#c8b078', o: '#e8c840', M: '#3a4a3a' }) },
  policia2: { ...BASE16, ceja: hex('#1c1424'), tocado: 'gorra', bigote: true, pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#c8b078', c: '#a8905a', F: '#3a4a3a', W: '#c8b078', o: '#e8c840', M: '#3a4a3a' }) },
  // la cajera del supermercado (1980): delantal verde y pelo rizado pelirrojo
  cajera: { ...BASE16M, ceja: hex('#a8502a'), pal: CLARA({ H: '#c86a3a', h: '#e0844c', C: '#4a8a5a', c: '#f2eee2', F: '#3a3a4a', W: '#4a8a5a', o: '#f2eee2' }) },
  // el cartero de 1981: uniforme azul grisáceo y gorra
  cartero: { ...BASE16, ceja: hex('#5a3418'), tocado: 'gorra', bigote: true, pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#6a7a9a', c: '#4e5c7a', F: '#3e4a6a', W: '#6a7a9a', o: '#c83a3a', M: '#3e4a6a' }) },
  // los dos dibujantes de la oficina de la montaña (1986): uno con barba y camisa roja, otro rubio con camiseta amarilla
  dibujante: { ...BASE16, ceja: hex('#3a2418'), bigote: true, pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#a83a3a', c: '#7a2a2a', F: '#3e5a8a', W: '#a83a3a', o: '#f2eee2' }) },
  dibujante2: { ...BASE16, ceja: hex('#a8743c'), tocado: 'gafas', pal: CLARA({ H: '#e0b860', h: '#c8984a', C: '#e8c840', c: '#c8a830', F: '#3e5a8a', W: '#e8c840', o: '#3a3a4a' }) },
  // el conserje espacial (nuestro, homenaje): mono gris azulado con bolsillos, pelo rubio
  conserje: { ...BASE16, ceja: hex('#a8743c'), pal: CLARA({ H: '#e0b860', h: '#c8984a', C: '#7a8aa8', c: '#5a6a88', F: '#5a6a88', W: '#7a8aa8', o: '#e8c840' }) },
  // los alienígenas que asaltan la nave (nuestros): piel verde, casco morado
  alien: { ...BASE16, ceja: hex('#2a5a2a'), tocado: 'casco', pal: { S: hex('#7ac86a'), s: hex('#5aa84a'), H: hex('#5a2a7a'), h: hex('#7a3a9a'), C: hex('#5a2a7a'), c: hex('#3e1e5a'), F: hex('#3e1e5a'), W: hex('#5a2a7a'), o: hex('#e8c840'), G: hex('#2a2430'), L: hex('#2a2430') } },
  // el ligón con mala suerte (1987): traje blanco de los setenta, camisa abierta, entradas
  ligon: { ...BASE16, ceja: hex('#5a3418'), pal: CLARA({ H: '#6a4020', h: '#8a5a30', C: '#f2eee2', c: '#d8d0c0', F: '#f2eee2', W: '#f2eee2', o: '#e8c840' }) },
  // el antiguo profesor de música que escribía comedias: gafas, bigote, chaleco
  humorista: { ...BASE16, ceja: hex('#3a2418'), tocado: 'gafas', bigote: true, pal: CLARA({ H: '#4a3020', h: '#6a4430', C: '#6a4a2a', c: '#e8e0c8', F: '#3a3a4a', W: '#6a4a2a', o: '#e8e0c8' }) },
  // la pareja que inventó los héroes que aprenden (1989): ella con pelo largo oscuro, él con barba y gafas
  lori: { ...BASE16M, ceja: hex('#2a1c14'), pal: CLARA({ H: '#2a1c14', h: '#4a3020', C: '#3a7a6a', c: '#2a5a4e', F: '#3a3a4a', W: '#3a7a6a', o: '#f2eee2' }) },
  corey: { ...BASE16, ceja: hex('#6a3a1a'), tocado: 'gafas', bigote: true, pal: CLARA({ H: '#7a4a24', h: '#a8743c', C: '#7a5a3a', c: '#5a4028', F: '#3a3a4a', W: '#7a5a3a', o: '#f2eee2' }) },
  // los tres héroes de fantasía: guerrero (cota y casco), mago (túnica y gorro puntiagudo azul) y ladrona (capucha verde)
  guerrero: { ...BASE16, ceja: hex('#5a3418'), tocado: 'malla', bigote: true, pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#8a8a94', c: '#6a6a74', F: '#5a3a1a', W: '#8a8a94', o: '#c8a040', G: '#5a3a1a', L: '#4a3020' }) },
  mago: { ...BASE16, cuerpo: CUERPO_TUNICA_LARGA, ceja: hex('#c8c4bc'), tocado: 'santa', bigote: true, pal: CLARA({ H: '#e8e4dc', h: '#c8c4bc', C: '#3a4aa8', c: '#2a3680', o: '#e8c840', G: '#e8c840', L: '#2a2430', D: '#e8c840' }) },
  ladrona: { ...BASE16M, ceja: hex('#1c1424'), tocado: 'capotain', pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#3a6a3a', c: '#2a4e2a', F: '#3a3a2a', W: '#3a6a3a', o: '#8a6a3a', J: '#2a4e2a', j: '#1e3a1e' }) },
  // el estudio de 1990: el técnico de sonido con auriculares, la actriz de voz y el compositor
  tecnico: { ...BASE16, ceja: hex('#1c1424'), tocado: 'auriculares', pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#5a5a6a', c: '#3e3e4c', F: '#3a3a4a', W: '#5a5a6a', o: '#e8c840', M: '#2a2430' }) },
  actriz: { ...BASE16M, ceja: hex('#a8502a'), pal: CLARA({ H: '#b85a2a', h: '#d8783a', C: '#e8c840', c: '#c8a830', F: '#3a3a4a', W: '#e8c840', o: '#f2eee2' }) },
  compositor: { ...BASE16, ceja: hex('#5a3418'), tocado: 'auriculares', bigote: true, pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#2a2430', c: '#5a5a6a', F: '#3e5a8a', W: '#2a2430', o: '#c84a3a', M: '#c84a3a' }) },
  // la escritora de misterio (1993): pelo largo castaño oscuro, chaqueta negra
  escritora: { ...BASE16M, ceja: hex('#3a2418'), pal: CLARA({ H: '#3a2418', h: '#5a3a24', C: '#2a2430', c: '#5a5a6a', F: '#2a2430', W: '#2a2430', o: '#a83a3a' }) },
  // el actor de Hollywood (1993): pelo oscuro peinado hacia atrás, chaqueta burdeos y bufanda
  actor: { ...BASE16, ceja: hex('#1c1424'), pal: CLARA({ H: '#1c1424', h: '#3a3046', C: '#6a2a3a', c: '#e8c840', F: '#2a2430', W: '#6a2a3a', o: '#e8c840' }) },
  // jugadores: una abuela de los ochenta (rebeca y moño gris) y un adolescente de los noventa (camiseta y gorra)
  abuela: { ...BASE16V, ceja: hex('#8a8a9a'), tocado: 'gafas', pal: CLARA({ H: '#b8b8c4', h: '#9c9cac', C: '#a86a8a', c: '#86506c', W: '#f2eee2', L: '#3a3a4a' }) },
  adolescente: { ...BASE16, ceja: hex('#5a3418'), tocado: 'gorra', pal: CLARA({ H: '#6a4020', h: '#8a5a30', C: '#2a6aa8', c: '#1e5080', F: '#3a4a7a', W: '#2a6aa8', o: '#e8c840', M: '#c83a3a' }) },
};
Object.assign(ELENCO_CHIBI, ELENCO_SI);

// ── Episodio 19: «Avengers: Doomsday». Héroes y villanos dibujados por nosotros, reconocibles por la silueta y los
// colores (como en un juego de 16 bits), sin logos ni letras: solo la estrella del escudo, la araña, el «4» en su
// círculo. Letras propias de este reparto (cada personaje las define en su pal): I cinturón · n botas · y/Y brillo
// (reactor, ojos) · r/R detalle rojo · e gema · u/l/p/d colores sueltos de cada uno.
// parche(filas, [[i, j, 'texto'], …]): superpone texto en la rejilla; '.' no cambia nada y ' ' borra
const parche = (filas, ps) => { const a = filas.map((f) => f.split('')); for (const [i, j, s] of ps) for (let n = 0; n < s.length; n++) if (s[n] !== '.' && a[j] && i + n >= 0 && i + n < a[j].length) a[j][i + n] = s[n] === ' ' ? '.' : s[n]; return a.map((f) => f.join('')); };
// tapa(filas, {H: 'C', …}): cambia letras (para sacar una máscara completa de una cabeza)
const tapa = (filas, m) => filas.map((f) => f.replace(/./g, (ch) => m[ch] ?? ch));
const OSCURA = (o) => ({ S: hex('#9a6644'), s: hex('#744628'), ...Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)])) });
const COLORES = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));

// ── cabezas ──
// sienes canosas (Strange, Reed): unas canas (w) delante de la oreja
const CAB_SIENES = parche(CAB_CORTO, [[2, 3, '.ww'], [2, 4, 'ww'], [2, 5, 'w'], [2, 6, 'w']]);
// pelo largo hasta los hombros (Thor, Bucky, Clea, Sue, Mística): la de las egipcias
const CAB_LARGO = CAB_EGIPCIA;
// coleta recogida atrás (Yelena)
const COLETA = ['.kkk', 'kHHH', 'kHhk', '.kHk', '..kk'];
const coleta = (c) => c.cab.rej(COLETA, -3, 3);
// casco de Iron Man: rojo (H) con la placa de la cara dorada (O/g) y los ojos que brillan (y)
const CAB_IRON = [
  '...kkkkkkkk....',
  '..kHHHhhHHHk...',
  '.kHHHHHHHhHHk..',
  'kHHHHHHHHHHHHk.',
  'kHHHHHkkkkkkHk.',
  'kHHHHkOOOOOOOk.',
  'kHHHHkyyyOyyyk.',
  'kHHhHkOOOOOOOOk',
  '.kHHHkOOOOOOgk.',
  '.kHHHHkOkkkgk..',
  '..kHHHHkOOgk...',
  '...kkHHkkkkk...',
  '.....kkkkk.....',
];
// máscara completa de Spider-Man: roja (C/c) con los ojos blancos grandes de borde negro
const CAB_ARANA = parche(tapa(CAB_CORTO, { H: 'C', h: 'd', S: 'C', s: 'd' }), [
  [6, 4, 'kkk.kkk'], [5, 5, 'kEEEkEEEk'], [5, 6, 'kEEEkEEEk'], [6, 7, 'kEEk.kEk'], [7, 8, 'kk...k'], [13, 6, 'C'],
]);
// Deadpool: roja (C) con los parches negros (J) y los ojos blancos (E)
const CAB_DEADPOOL = parche(tapa(CAB_CORTO, { H: 'C', h: 'c', S: 'C', s: 'c' }), [
  [6, 5, 'JJJ.JJJJ'], [5, 6, 'JEEJ.JEEJ'], [6, 7, 'JJ...JJ'], [13, 6, 'C'],
]);
// Pantera Negra (Shuri): máscara negra (J/j) con orejitas, ojos plateados (E) y dibujos plateados (Z)
const CAB_PANTERA = [
  '...k....k......',
  '..kJk..kJk.....',
  '..kJJkkJJJk....',
  '.kJJJJJJJJJk...',
  'kJJJjJJJJJJJk..',
  'kJJZJJJJJJJJk..',
  'kJJjZJJJJJJJJk.',
  'kJJJJJZEEJZEEJk',
  'kJJjJJJJJJJJJk.',
  '.kJJJZJJJJJJk..',
  '..kJJJZJJJjk...',
  '...kkJJJJJkk...',
  '.....kkkkk.....',
];
// Ant-Man: casco plateado (Z/z) con los ojos rojos (r) y la rejilla de la boca
const CAB_ANTMAN = parche(tapa(CAB_CORTO, { H: 'Z', h: 'z', S: 'Z', s: 'z' }), [
  [1, 3, 'kkk'], [3, 4, 'z'], [7, 5, 'rrk.rr'], [7, 6, 'rrk.rr'], [8, 8, 'zkzk'], [8, 9, 'zkzk'], [2, 6, 'R'], [2, 7, 'R'],
]);
// Doctor Doom: capucha verde (V/v) y máscara de metal (Z/z) con los ojos rasgados y la rejilla en la boca
const CAB_DOOM = [
  '...kkkkkkkk....',
  '..kVVVVVVVVk...',
  '.kVVvVVVVVVVk..',
  'kVVVVVVVVVVVVk.',
  'kVVVvkkkkkkkVk.',
  'kVVVkZZZZZZZZk.',
  'kVVvkZkkkZkkkZk',
  'kVVvkZZZZZZZZk.',
  'kVVVkZzZkzkzZk.',
  'kVVVkZzZkzkzk..',
  '.kVVkzZZZZZzk..',
  '..kVvkkkkkkk...',
  '...kkk.........',
];
// Hulk: piel verde (S/s), pelo negro corto y la ceja gruesa; cabeza normal sobre un cuerpo enorme
const CAB_HULK = parche(CAB_CORTO, [[4, 4, 'sssssssss'], [13, 6, 'S']]);
// la Cosa: cabeza de rocas naranjas (S/s, grietas r) con la frente pesada
const CAB_COSA = parche(tapa(CAB_CORTO, { H: 'S', h: 's' }), [
  [3, 1, 'r..r'], [1, 3, 'rr.r..r'], [4, 4, 'rsssssssk'], [2, 7, 'r'], [5, 8, 'r'], [3, 10, 'r'], [9, 10, 'r'], [12, 8, 'r'],
]);
// Bestia: pelaje azul (S/s; pelo H) que le crece por la cara
const CAB_BESTIA = parche(CAB_CORTO, [[3, 8, 'HH'], [2, 9, 'kHH'], [3, 10, 'kHHh'], [5, 11, 'HHH']]);
// Thanos: calvo, morado, con la barbilla de surcos (z)
const CAB_THANOS = parche(CAB_CALVO, [[4, 3, 'sss'], [8, 10, 'zSzS'], [9, 11, 'zz'], [3, 8, 's']]);
// M'Baku: barba poblada (H) y el pelo alto
const CAB_MBAKU = parche(CAB_BARBA, [[3, 0, 'kkkk'], [2, 1, 'kHHHH']]);
// la Antorcha: cabeza en llamas, con el pelo de fuego hacia atrás (Y/y)
const CAB_FUEGO = [
  'k..kk..k.......',
  'kYk.YkkYk......',
  '.kYYyYYYYkk....',
  'kYyYYYYYYYYk...',
  'kYYyYSSSSSSSk..',
  'kYyYsSSSSSSSk..',
  'kyYYsSSSSSSSSk.',
  '.kYsSSSSSSSSk..',
  'kYySSSSSSSSSSk.',
  '.kYSSSSSSSSSk..',
  '..kSSSSSSSSsk..',
  '...kksSSSSkk...',
  '.....kkkkk.....',
];

// ── cuerpos (15 de ancho y 13 de alto, como CUERPO_EUROPEO) ──
// traje ceñido de héroe: C pecho, c costados, W brazos, G guantes, I cinturón, F piernas, n botas
const CUERPO_HEROE = [
  '...kkCCCCCkk...',
  '..kWWCCCCCWWk..',
  '.kWkCCCCCCCkWk.',
  '.kWkCCCCCCCkWk.',
  '.kWkcCCCCCckWk.',
  '.kGkcCCCCCckGk.',
  '..kkIIIIIIIkk..',
  '...kFFFkFFFk...',
  '...kFFFkFFFk...',
  '...kFFFkFFFk...',
  '...knnnknnnk...',
  '...knnnknnnk...',
  '..kkkkk.kkkkk..',
];
// ropa de calle: camiseta de manga corta (C) y vaqueros (F)
const CUERPO_CALLE = [
  '...kkCCCCCkk...',
  '..kCCCCCCCCCk..',
  '.kCkCCCCCCCkCk.',
  '.kSkCCCCCCCkSk.',
  '.kSkcCCCCCckSk.',
  '.kSkcCCCCCckSk.',
  '..kkCCCCCCCkk..',
  '...kFFFkFFFk...',
  '...kFFFkFFFk...',
  '...kFFFkFFFk...',
  '...kFFFkFFFk...',
  '...knnnknnnk...',
  '..kkkkk.kkkkk..',
];
// gabardina larga abierta (Gambito): C gabardina, c su sombra, W pecho, F piernas
const CUERPO_GABARDINA = [
  '..kkCWWWWCkk...',
  '.kCCCWWWWCCCk..',
  '.kCkCCWWWCCkCk.',
  '.kCkCCWWWCCkCk.',
  '.kCkCCWWWCCkCk.',
  '.kGkCCIIICCkGk.',
  '.kckCCFFFCCkck.',
  '.kCCCkFkFkCCCk.',
  '.kCCCkFkFkCCCk.',
  '.kcCCkFkFkCCck.',
  '.kccckFkFkccck.',
  '..kkkknkknkkk..',
  '....kkk.kkk....',
];
// vestido de mujer de los años 40 (Peggy): chaqueta entallada y falda por la rodilla
const CUERPO_SASTRE = [
  '...kkWWWWWkk...',
  '..kCCCWWWCCCk..',
  '.kCkCCCWCCCkCk.',
  '.kCkCCCoCCCkCk.',
  '.kCkcCCCCCckCk.',
  '.kSkIIIIIIIkSk.',
  '..kkCCCCCCCkk..',
  '...kCCCCCCCk...',
  '...kcCCCCCck...',
  '...kkkkkkkkk...',
  '....kSk.kSk....',
  '....kSk.kSk....',
  '...kkkk.kkkk...',
];
// túnica larga abierta por delante (Strange, Aquel Que Permanece): C túnica, W fajín/camisa, F piernas
const CUERPO_TUNICA_HEROE = [
  '...kkCCCCCkk...',
  '..kCCCWWWCCCk..',
  '.kCkCCWWWCCkCk.',
  '.kCkCCWoWCCkCk.',
  '.kCkCCWWWCCkCk.',
  '.kGkIIIIIIIkGk.',
  '..kkCCWWWCCkk..',
  '...kCCWkWCCk...',
  '...kCCFkFCCk...',
  '...kCcFkFcCk...',
  '...kccFkFcck...',
  '...kkknknkkk...',
  '..kkkkk.kkkkk..',
];
// chaleco táctico (Yelena, Bucky): C chaleco con bolsillos (o), W mangas, F pantalón, n botas
const CUERPO_TACTICO = [
  '...kkCCCCCkk...',
  '..kWWCCCCCWWk..',
  '.kWkCoCCCoCkWk.',
  '.kWkCCCCCCCkWk.',
  '.kWkCoCCCoCkWk.',
  '.kGkCCCCCCCkGk.',
  '..kkIIIoIIIkk..',
  '...kFFFkFFFk...',
  '...kFoFkFoFk...',
  '...kFFFkFFFk...',
  '...knnnknnnk...',
  '...knnnknnnk...',
  '..kkkkk.kkkkk..',
];
// bañador (Namor): torso desnudo, calzón verde (C) y alitas en los tobillos (W)
const CUERPO_BANADOR = [
  '...kkSSSSSkk...',
  '..kSSSSSSSSSk..',
  '.kSkSSsSsSSkSk.',
  '.kSkSSSSSSSkSk.',
  '.kSkSSSsSSSkSk.',
  '.kSkSSSSSSSkSk.',
  '..kkCCCCCCCkk..',
  '...kCCcCCcCk...',
  '...kSSSkSSSk...',
  '...kSSSkSSSk...',
  '.kWkSSSkSSSkWk.',
  'kWWkSSSkSSSkWWk',
  '.kkkkkk.kkkkkk.',
];
// M'Baku: pecho de piel (S) con el chaleco de pelaje (C/c), falda de pelaje y piernas desnudas
const CUERPO_PELAJE = [
  '..kkCCSSSCCkk..',
  '.kCCcCSSSCcCCk.',
  '.kCkCCSSSCCkCk.',
  '.kSkCcSSSCcSkSk',
  '.kSkCCSSSCCkSk.',
  '.kSkCcIIICcksk.',
  '..kkCCCCCCCkk..',
  '...kCcCcCcCk...',
  '...kSSSkSSSk...',
  '...kSSSkSSSk...',
  '...kSSSkSSSk...',
  '...knnnknnnk...',
  '..kkkkk.kkkkk..',
];
// Xavier sentado en su silla: traje oscuro y las piernas hacia delante
const CUERPO_SENTADO_TRAJE = [
  '...kkWWWWWkk...',
  '..kCCCWoWCCCk..',
  '.kCkCCCoCCCkCk.',
  '.kCkCCCoCCCkCk.',
  '.kSkCCCCCCCkSk.',
  '..kkFFFFFFFFFk.',
  '...kFFFFFFFFFk.',
  '...kkkkkkkkFFk.',
  '..........kFFk.',
  '..........kkkkk',
];
// cuerpo ancho (17 × 15) de Thanos: hombreras de oro (O/g), peto azul (C/c), el guantelete (G con gemas e)
const CUERPO_ANCHO = [
  '...kkOOCCCCOOkk..',
  '..kOOOOCCCCOOOOk.',
  '.kOOgkCCCCCCkOOOk',
  '.kWWkCCCOCCCCkWk.',
  '.kWWkCCOOOCCCkWk.',
  '.kWWkcCCOCCCckWk.',
  '.kWWkcCCCCCCckGGk',
  '.kGGkIIIIIIIIkGek',
  '.kGGkFFFFkFFFkkk.',
  '..kkkFFFFkFFFFk..',
  '....kFFFFkFFFFk..',
  '....kFFFFkFFFFk..',
  '....knnnnknnnnk..',
  '....knnnnknnnnk..',
  '...kkkkkk.kkkkkk.',
];
// cuerpo grande (21 × 24) de Hulk, la Cosa y Bestia: hombros enormes, brazos hasta las rodillas, puños grandes;
// S/s piel, r grietas o pelo, F/f calzón o pantalón (roto abajo)
const CUERPO_GRANDE = [
  '....kkkkkkkkkkkkk....',
  '..kkSSSSSSSSSSSSSkk..',
  '.kSSSSSSSSSSSSSSSSSk.',
  'kSSSSSkSSSSSSSSkSSSSk',
  'kSSSSkSSSSSSSSSSkSSSk',
  'kSSSskSSSssSssSSkSSsk',
  'kSSSskSSSSSSSSSSkSSsk',
  'kSSSskSSSSSsSSSSkSSsk',
  'kSSsSkSSSsSsSsSSkSsSk',
  'kSSsSkSSSSSsSSSSkSsSk',
  'kSSsSkSSSsSsSsSSkSsSk',
  'kSSsSkSSSSSSSSSSkSsSk',
  'kSSsSkFFFFFFFFFFkSsSk',
  'kSSsSkFFFFFFFFFFkSsSk',
  'kSSSSSkFFFFfFFFkSSSSk',
  'kSSSSSkFFFFkFFFkSSSSk',
  '.kSSSkkFFFFkFFFFkSSk.',
  '..kkk.kFFFFkFFFFkkk..',
  '......kFFFFkFFFFk....',
  '......kFkFkkFkFFk....',
  '......kSSSk.kSSSk....',
  '......kSSSk.kSSSk....',
  '.....kSSSSk.kSSSSk...',
  '.....kkkkkk.kkkkkk...',
];

// ── capas, alas y cola (por detrás del cuerpo; en coordenadas de la rejilla de 15, la x empieza en −2) ──
const CAPA_LARGA = [
  '....kkkkkkkkkk.....',
  '...kQQQQQQQQQQkk...',
  '..kQQqQQQQQQQQQQk..',
  '..kQqQQQQQQQQQQQQk.',
  '.kQQqQQQQQQQQQQQQk.',
  '.kQqQQQQQQQQQQQQQk.',
  '.kQqQQQQQQQQQQQQQk.',
  'kQQqQQQQQQQQQQQQQk.',
  'kQqQQQQQQQQQQQQQQk.',
  'kQqQQQQQQQQQQQQQqk.',
  'kQqqQQQQQQQQQQQqqk.',
  'kqQqQQQQQQQQQQqqk..',
  '.kkkkkkkkkkkkkkk...',
];
const capa = (alto = 12) => (c) => c.cuerpo.rej(CAPA_LARGA.slice(0, alto).concat([CAPA_LARGA[12]]), -2, 0);
// cuello alto de la capa de Strange, que sube por detrás de la cabeza
const CUELLO_ALTO = ['kk..', 'kQk.', 'kQqk', 'kQqk', 'kQQk', '.kQk'];
// alas plegadas de Sam: dos alas de metal (Z/z) que asoman por encima de los hombros, por detrás
const ALAS = [
  '..kk...........',
  '.kZZk..........',
  '.kZzk......kk..',
  'kZZzk.....kZZk.',
  'kZzZk.....kZzk.',
  'kZzZk....kZzZk.',
  'kZzZk....kZzZk.',
  'kZzZk....kZzk..',
  'kzZzk.....kk...',
  '.kZzk..........',
  '.kzk...........',
  '..k............',
];
// las dos katanas de Deadpool, cruzadas a la espalda (asoman las empuñaduras)
const KATANAS = [
  'kk.kk...',
  'kJkkJk..',
  '.kJkkJk.',
  '..kZkkZk',
  '...kZkkZk',
];
// cola de Rondador Nocturno, que sale por detrás y acaba en punta de flecha
const COLA = [
  '......kk.',
  '.....kSSk',
  '.....kSk.',
  '....kSk..',
  '...kSk...',
  '..kSk....',
  '.kSk.....',
  'kSk......',
  'kSk......',
  '.kSk.....',
  '..kkk....',
];

// ── tocados nuevos ──
Object.assign(TOCADOS, {
  // capucha azul del Capitán América (C): tapa la frente y la nuca, con las alitas blancas (X) en la sien
  capitan: [[
    '...kkkkkkkk....',
    '..kCCCCCCCCk...',
    '.kCCcCCCCCCCk..',
    'kCCCCCCCCCCCCk.',
    'kCkkCCCCCCCCCk.',
    'kXXXkCCCCCCCCk.',
    'kCXXXk.........',
    'kCCXCk.........',
    '.kCCk..........',
    '.kCk...........',
  ], 0],
  // casco de Loki: banda de oro (O/g) con los dos cuernos largos curvados hacia atrás
  cuernos: [[
    'kk......kk.....',
    'kOk.....kOk....',
    '.kOk.....kOk...',
    '.kOOk....kOOk..',
    '..kOOk....kOOk.',
    '..kkOOkkkkkOOk.',
    '.kkOOOOOOOOOOk.',
    'kOgOOOOOOOOOOk.',
    'kgOOkkkkkkkkk..',
    'kgOk...........',
    'kgOk...........',
    '.kgk...........',
  ], -7],
  // yelmo de Kang: azul (A/a) con las aletas laterales que suben por detrás y el cuello verde (V)
  yelmo: [[
    'kk.............',
    'kAk............',
    'kAAk.kkkkkk....',
    '.kAAkAAAAAAkk..',
    '.kAAAAaAAAAAAk.',
    'kAaAAAAAAAAAAk.',
    'kAAAAkkkkkkkkk.',
    'kAAAk..........',
    'kAAAk..........',
    'kaAAk..........',
    'kAAAk..........',
    '.kAAk..........',
    '.kVVVk.........',
  ], -3],
  // casco de Magneto: rojo (D/d) que cubre la cabeza y baja por la mejilla, con el borde de la frente
  magneto: [[
    '...kkkkkkkk....',
    '..kDDDDDDDDk...',
    '.kDDdDDDDDDDk..',
    'kDDDDDDDDDDDDk.',
    'kDDDDDDDDDDDDDk',
    'kDDDDkkkkkkkkk.',
    'kDDDk..........',
    'kDdDk..........',
    'kDDDk..........',
    'kDdDDk.........',
    '.kDDDk.........',
    '..kkk..........',
  ], -2],
  // máscara de Lobezno: amarilla (Y) con los lados negros (J) y las dos puntas hacia atrás; ojos blancos (E)
  lobezno: [[
    '.k.............',
    'kJk............',
    'kJJk...........',
    '.kJJkkkkkkk....',
    '.kJJYYYYYYYk...',
    '.kJJYYYYYYYYk..',
    'kJJYYYYYYYYYYk.',
    'kJJJYYYYYYYYYk.',
    'kJJJJJJYYJJJJk.',
    'kJJJJJkEEkJEEk.',
    'kJJJk..kk..kk..',
  ], -3],
  // visor de Cíclope: la banda roja (r) de lado a lado con su montura (J)
  visor: [[
    'kJJJJJkkkkkkkk.',
    'kJJJJkrrrrrrrrk',
    'kJJJJJkkkkkkkk.',
  ], 5],
  // gafas de aviador de Sam (cristal rojo r) y gafas de sol (J)
  goggles: [[
    'kJk....kkk.kkk.',
    'kJJJJJkrrrkrrrk',
    '.kk....kkk.kkk.',
  ], 5],
  gafasClaras: [[
    '......E..EE..E.',
    '......E..EE..E.',
    '.......EE..EE..',
  ], 6],
  sol: [[
    '.....kkkkkkkkk.',
    '.....kJJJkkJJJk',
    '.......kk..kk..',
  ], 5],
  // cinta de Gambito: la bandana oscura (J) por la frente
  cinta: [[
    'kJJJJJJJJJJJJk.',
    'kJjJJJJJJJJJJk.',
    'kJk............',
    'kJk............',
  ], 3],
  // sombrero rojo de Peggy (D/d), pequeño e inclinado
  peggy: [[
    '.......kkkk....',
    '...kkkkDDDDk...',
    '..kDDDDDDdDDkk.',
    '.kkkkkkkkkkkkkk',
  ], -2],
  // gorra de visera de Feige (C) y gorra de fan
  visera: [[
    '...kkkkkkkk....',
    '..kCCCCCCCCk...',
    '.kCCcCCCCCCCk..',
    '.kkkkkkkkkkkkkk',
    '..........kkkk.',
  ], -1],
});

// ── piezas (se pintan con el R de conChibi: R.dibujo, R.pset, R.rect) ──
const PAL_PIEZAS = COLORES({
  k: '#1c1222', r: '#c8303a', R: '#e84a4a', X: '#f2eee2', x: '#c8c0b0', A: '#2a4fa8', a: '#1e3680', Z: '#c0c4d4', z: '#8c90a4',
  O: '#e8b830', g: '#a87a18', B: '#7a4a24', b: '#4e2e14', J: '#2a2430', S: '#f6c290', s: '#d48a5a', H: '#e0b860', C: '#4a8ad8', c: '#2e64a8',
});
// el escudo del Capitán: aros rojo-blanco-rojo y estrella blanca sobre azul. o.r radio (6), o.ancho (1; 0.4 de canto)
const escudoCap = (R, cx, cy, o = {}) => {
  const r = o.r ?? 6, sx = o.ancho ?? 1, P_ = PAL_PIEZAS;
  for (let y = -r - 1; y <= r + 1; y++) for (let x = Math.floor(-(r + 1) * sx); x <= Math.ceil((r + 1) * sx); x++) {
    const d = Math.hypot(x / sx, y); if (d > r + 0.6) continue;
    const f = d / r, c = d > r - 0.4 ? P_.k : f > 0.82 ? (x / sx + y < -2 ? P_.R : P_.r) : f > 0.64 ? P_.X : f > 0.46 ? P_.r : P_.A;
    R.pset(Math.round(cx + x), Math.round(cy + y), c);
  }
  if (sx > 0.6) R.dibujo(['..X..', 'XXXXX', '.XXX.', '.X.X.'], Math.round(cx - 2), Math.round(cy - 2), 1, P_);
  R.pset(Math.round(cx - r * 0.5 * sx), Math.round(cy - r * 0.6), P_.X);   // el brillo
};
// el martillo corto de Thor: cabeza de metal (Z/z) y mango con tira de cuero; (x, y) = la mano; o.arriba: la cabeza arriba
const MARTILLO = ['kkkkkkkk', 'kZZZZZZk', 'kZZZZzzk', 'kZzzzzzk', 'kkkkkkkk', '...kBk..', '...kbk..', '...kBk..', '...kbk..', '...kkk..'];
const martillo = (R, x, y, o = {}) => { const g = o.arriba ? MARTILLO : [...MARTILLO].reverse(); R.dibujo(g, x - 4, o.arriba ? y - 7 : y - 2, 1, PAL_PIEZAS); };
// el guantelete dorado con las seis gemas (morada, azul, roja, naranja, verde, amarilla); (x, y) = la muñeca
const GUANTELETE = [
  '.kk.kk.kk..',
  'kOOkOOkOOk.',
  'kOekOekOek.',
  'kOOOOOOOOkk',
  'kOOOOOOOOkOk',
  'kOOOeOOOOkek',
  'kgOOOOOOgkOk',
  'kggOOOOggkk.',
  '.kkgggggk...',
  '..kOOOOOk...',
  '..kkkkkkk...',
];
const guantelete = (R, x, y, t = 0) => {
  const gemas = ['#9a4ae8', '#3a8ae8', '#e83a3a', '#e8903a', '#3ac85a', '#f0e040'].map(hex);
  let n = 0;
  GUANTELETE.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const ch = f[i]; if (ch === '.') continue; R.pset(x - 5 + i, y - 10 + j, ch === 'e' ? gemas[n++ % 6] : PAL_PIEZAS[ch]); } });
  if (Math.sin(t * 5) > 0.6) R.pset(x - 1, y - 5, hex('#fff6c8'));
};
// silla de ruedas (Xavier): rueda grande con radios, asiento, respaldo y rueda pequeña delante; (x, suelo) = el asiento
const sillaRuedas = (R, x, suelo, o = {}) => {
  const dir = o.dir ?? 1, X = (i) => Math.round(x + dir * i), P_ = PAL_PIEZAS, cy = suelo - 6;
  // o.parte: 'respaldo' (antes del actor), 'ruedas' (después) o las dos
  if (o.parte !== 'ruedas') { for (let j = 0; j < 14; j++) { R.pset(X(-1), suelo - 8 - j, P_.k); R.pset(X(0), suelo - 8 - j, P_.z); R.pset(X(1), suelo - 8 - j, P_.k); }   // respaldo
    for (let i = -1; i <= 13; i++) { R.pset(X(i), suelo - 10, P_.k); R.pset(X(i), suelo - 9, P_.z); } }   // asiento
  if (o.parte === 'respaldo') return;
  R.disco(X(4), cy, 6, P_.k); R.disco(X(4), cy, 5, P_.z); R.disco(X(4), cy, 4, P_.k); R.disco(X(4), cy, 3, P_.Z);
  for (let k = 0; k < 4; k++) { const a = k * Math.PI / 4; for (let rr = -3; rr <= 3; rr++) R.pset(Math.round(X(4) + Math.cos(a) * rr), Math.round(cy + Math.sin(a) * rr), P_.z); }
  R.pset(X(4), cy, P_.k);
  for (let j = 0; j < 7; j++) R.pset(X(12), suelo - 9 + j, P_.k);
  R.disco(X(12), suelo - 2, 2, P_.k); R.pset(X(12), suelo - 2, P_.z);
};
// Franklin, el bebé de Reed y Sue: pelele azul (C) y un mechón rubio (H); (x, suelo)
const FRANKLIN = ['...kkk...', '..kHHHk..', '.kSSSSSk.', '.kSkSkSk.', '.kSSsSSk.', '..kkkkk..', '.kCCCCCk.', 'kSkCXCkSk', '.kCCCCCk.', '.kckkck..', '.kk..kk..'];
const franklin = (R, x, suelo) => R.dibujo(FRANKLIN, x, suelo - FRANKLIN.length, 1, PAL_PIEZAS);
// Galactus (primer boceto, el decorado lo pulirá): gigante morado con casco de grandes alas laterales; se pinta como pieza
// a escala s (cada letra, s × s px; con s = 2 mide 88 px). (cx, pie) = centro de los pies
const GALACTUS = [
  '.kk..................kk.',
  'kAAk................kAAk',
  'kAAk................kAAk',
  'kAAAk..............kAAAk',
  'kAaAk...kkkkkkk....kAaAk',
  'kAaAAk.kAAAAAAAk..kAAaAk',
  '.kAaAkkAAAAAAAAAkkkAaAk.',
  '.kAaAAkAAkkkkkAAAkAAaAk.',
  '..kAaAkAkSSSSSkAkAAaAk..',
  '..kAaAAkSkSSkSSkkAaAk...',
  '...kAaAkSSSSSSSkAAaAk...',
  '...kkAAkSSSsSSSkAAkk....',
  '.....kkAkSSSSSkAkk......',
  '....kkUUkkkkkkkUUkk.....',
  '...kUUUUUUUUUUUUUUUk....',
  '..kUUuUUUUAAAUUUUuUUk...',
  '..kUuUUUUAAuAAUUUUuUk...',
  '.kUUuUkUUAAAAAUUkUuUUk..',
  '.kUuUUkUUUAAAUUUkUUuUk..',
  '.kUuUkkUUUUUUUUUkkUuUk..',
  '.kSSk.kUUUUUUUUUk.kSSk..',
  '.kSSk.kAAAAAAAAAk.kSSk..',
  '..kk..kUUUUkUUUUk..kk...',
  '......kUUUUkUUUUk.......',
  '......kUUuUkUuUUk.......',
  '......kUUuUkUuUUk.......',
  '......kUUUUkUUUUk.......',
  '......kUUUUkUUUUk.......',
  '......kUuUUkUUuUk.......',
  '......kAAAAkAAAAk.......',
  '......kAAAAkAAAAk.......',
  '......kAaAAkAAaAk.......',
  '......kAAAAkAAAAk.......',
  '.....kAAAAAkAAAAAk......',
  '.....kkkkkkkkkkkkk......',
];
const PAL_GALACTUS = COLORES({ k: '#1c1222', A: '#6a3aa8', a: '#4a2480', U: '#3a5ac8', u: '#283e94', S: '#b89ad8', s: '#8a6ab0' });
const galactus = (R, cx, pie, o = {}) => {
  const s = o.s ?? 2, w = GALACTUS[0].length, h = GALACTUS.length, x0 = Math.round(cx - w * s / 2), y0 = pie - h * s;
  GALACTUS.forEach((f, j) => { for (let i = 0; i < w; i++) { const c = PAL_GALACTUS[f[i]]; if (c != null) R.rect(x0 + i * s, y0 + j * s, x0 + i * s + s - 1, y0 + j * s + s - 1, c); } });
  if (o.ojos !== false) { const ex = x0 + 10 * s, ey = y0 + 9 * s; R.rect(ex, ey, ex + s - 1, ey + s - 1, hex('#e8f0ff')); R.rect(ex + 3 * s, ey, ex + 4 * s - 1, ey + s - 1, hex('#e8f0ff')); }
};
export const PIEZAS_DO = { escudo: escudoCap, martillo, guantelete, silla: sillaRuedas, franklin, galactus };

// ── ganchos de los personajes (def.detras / def.delante) ──
// ojos de Iron Man que brillan de vez en cuando
const brilloIron = (c) => { if (Math.sin(c.t * 3 + c.x) > 0.7) { c.cab.px(7, 6, hex('#ffffff')); c.cab.px(11, 6, hex('#ffffff')); } };
// garras de Lobezno: tres cuchillas que salen del puño de delante (o.garras: false las esconde)
const GARRAS = [[13, 4], [14, 4], [15, 3], [16, 3], [17, 2], [13, 5], [14, 5], [15, 5], [16, 5], [17, 5], [13, 6], [14, 6], [15, 7], [16, 7], [17, 8]];
const garras = (c) => { if (c.o.garras === false || c.o.sostiene || c.o.dedo || c.o.brazos) return; for (const [i, j] of GARRAS) c.cuerpo.px(i, j, hex(i === 17 ? '#9ca0b4' : '#eef0f8')); };
// carta de Gambito, que brilla rosa
const cartaRosa = (c) => { if (c.o.sostiene || c.o.dedo || c.o.brazos) return; const on = Math.sin(c.t * 7 + c.x) > 0; const R1 = hex(on ? '#ff8ad8' : '#e84aa8'), R2 = hex('#ffd0f0'); c.cuerpo.px(13, 3, R1); c.cuerpo.px(14, 3, R1); c.cuerpo.px(13, 4, R2); c.cuerpo.px(14, 4, R1); c.cuerpo.px(15, 2, on ? R1 : R2); };
// llamas de la Antorcha que se mueven alrededor del cuerpo
const llamas = (c) => {
  const Y = hex('#fff0a0'), y = hex('#f8b030'), q = hex('#e85a20');
  for (let n = 0; n < 9; n++) { const i = [1, 3, 13, 2, 12, 4, 10, 0, 14][n], j = [2, -1, 3, 8, 7, 11, 11, 5, 9][n], h = 2 + ((Math.floor(c.t * 8) + n) % 3);
    for (let k = 0; k < h; k++) c.cuerpo.px(i + (k === h - 1 ? (n % 2 ? 1 : -1) : 0), j - k, k === 0 ? q : k === h - 1 ? Y : y); }
};
const capaYcuello = (c) => { capa()(c); c.cuerpo.rej(CUELLO_ALTO, -2, -6); };

// ── el reparto del 19 ──
const B19 = { cab: CAB_CORTO, cuerpo: CUERPO_HEROE, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9 };
const B19M = { ...B19, cab: CAB_LARGO };
const BIG = { cuerpo: CUERPO_GRANDE, dxCuerpo: -3, brazoCol: 16, brazoFilas: [2, 16], altoCuerpo: 24, altoCab: 11, ojosY: 6, bocaY: 9 };
export const ELENCO_DO = {
  // Iron Man: armadura roja (C/H) y dorada (O), casco con la placa de la cara dorada, ojos que brillan y el reactor
  ironman: { ...B19, cab: CAB_IRON, sinCara: true, delante: brilloIron,
    cuerpo: parche(CUERPO_HEROE, [[6, 2, 'kyk'], [6, 3, 'yYy'], [6, 4, 'kyk'], [3, 7, '.OOO.OOO'], [3, 8, '.OOO.OOO']]),
    pal: COLORES({ H: '#c8303a', h: '#e85a5a', C: '#c8303a', c: '#8a1e28', W: '#c8303a', G: '#e8b830', I: '#8a1e28', F: '#c8303a', n: '#c8303a', O: '#e8b830', g: '#a87a18', y: '#a8f0ff', Y: '#ffffff', S: '#f6c290', s: '#d48a5a' }) },
  // Tony Stark sin armadura: perilla, camiseta oscura con el reactor que asoma, vaqueros (gafas de sol: tocado 'sol')
  tony: { ...B19, cuerpo: parche(CUERPO_CALLE, [[7, 3, 'y']]), ceja: hex('#2a1c14'), bigote: true, barba: true,
    pal: CLARA({ H: '#2a1c14', h: '#4a3020', U: '#2a1c14', C: '#2a2e3a', c: '#1c1f28', F: '#3e5a8a', n: '#2a2430', y: '#a8f0ff' }) },
  // Robert Downey Jr. en la Comic-Con: traje oscuro, camisa blanca, gafas de sol y perilla (sin parecido forzado)
  rdj: { ...B19, cuerpo: CUERPO_EUROPEO, ceja: hex('#2a1c14'), bigote: true, barba: true, tocado: 'sol',
    pal: CLARA({ H: '#2a1c14', h: '#4a3020', U: '#2a1c14', C: '#2a2e3a', c: '#1c1f28', W: '#f2eee2', o: '#2a2e3a', F: '#2a2e3a', J: '#1c1222' }) },
  // el Capitán América: traje azul con la estrella blanca, franjas rojas y blancas en la cintura y la capucha con alitas
  capitan: { ...B19, ceja: hex('#a8743c'), tocado: 'capitan',
    cuerpo: parche(CUERPO_HEROE, [[5, 1, '..X..'], [5, 2, 'XXXXX'], [5, 3, '.XXX.'], [5, 4, 'rXrXr'], [5, 5, 'rXrXr']]),
    pal: CLARA({ C: '#2a4fa8', c: '#1e3680', W: '#2a4fa8', G: '#a83a2a', I: '#5a3a24', F: '#1e3680', n: '#7a4a24', X: '#f2eee2', r: '#c8303a' }) },
  // Steve Rogers con el mismo traje, sin capucha: el pelo rubio
  steve: { ...B19, ceja: hex('#a8743c'),
    cuerpo: parche(CUERPO_HEROE, [[5, 1, '..X..'], [5, 2, 'XXXXX'], [5, 3, '.XXX.'], [5, 4, 'rXrXr'], [5, 5, 'rXrXr']]),
    pal: CLARA({ H: '#e0b860', h: '#f0d088', C: '#2a4fa8', c: '#1e3680', W: '#2a4fa8', G: '#a83a2a', I: '#5a3a24', F: '#1e3680', n: '#7a4a24', X: '#f2eee2', r: '#c8303a' }) },
  // Steve anciano: pelo blanco y traje gris con corbata
  steveViejo: { ...B19, cuerpo: CUERPO_EUROPEO, ceja: hex('#c8c4bc'), mejillas: [[6, 8]],
    pal: CLARA({ H: '#f2eee2', h: '#c8c4bc', C: '#7a7e8a', c: '#5a5e6a', W: '#f2eee2', o: '#3a4a7a', F: '#5a5e6a' }) },
  // Peggy Carter: pelo castaño ondulado, traje azul de los 40 y el sombrero rojo
  peggy: { ...B19M, cuerpo: CUERPO_SASTRE, ceja: hex('#4a2a14'), tocado: 'peggy',
    pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#3a5a9a', c: '#2a4278', W: '#f2eee2', o: '#c8303a', I: '#2a2430', D: '#c8303a', d: '#8a2028' }) },
  // Sam Wilson, el nuevo Capitán: traje azul con mangas blancas, la estrella, cinturón rojo, alas plegadas y gafas rojas
  sam: { ...B19, ceja: hex('#1c1424'), tocado: 'goggles', detras: (c) => c.cuerpo.rej(ALAS, -1, -4),
    cuerpo: parche(CUERPO_HEROE, [[5, 1, '..X..'], [5, 2, 'XXXXX'], [5, 3, '.XXX.'], [5, 4, '.X.X.']]),
    pal: OSCURA({ H: '#1c1424', h: '#3a3046', C: '#2a5ac8', c: '#1e3e90', W: '#e8e8f0', G: '#c8303a', I: '#c8303a', F: '#1e3e90', n: '#c8303a', X: '#f2eee2', r: '#c8303a', J: '#2a2430', Z: '#c8ccd8', z: '#8a90a4' }) },
  // Thor: pelo rubio largo y barba, armadura gris oscura con los discos de plata y la capa roja (martillo: PIEZAS_DO)
  thor: { ...B19M, cab: parche(CAB_LARGO, [[4, 9, 'kUSSSSSU'], [4, 10, 'kUUSSSUUk'], [4, 11, 'k.kUUUUk'], [4, 12, '...kkkk']]), ceja: hex('#c8984a'), detras: capa(),
    cuerpo: parche(CUERPO_HEROE, [[5, 2, 'Z...Z'], [5, 4, 'Z...Z']]),
    pal: CLARA({ H: '#e8c060', h: '#f8dc90', C: '#3a3a4a', c: '#26262f', W: '#3a3a4a', G: '#3a3a4a', I: '#5a4a3a', F: '#26262f', n: '#3a3a4a', Z: '#c8ccd8', Q: '#c8303a', q: '#8a1e28', U: '#c89a40' }) },
  // Hulk: todo verde y más grande (36 px), pelo negro, pantalón morado roto
  hulk: { ...BIG, cab: CAB_HULK, ceja: hex('#1c2a14'),
    pal: COLORES({ S: '#5aa83a', s: '#3e7a28', H: '#1c1c24', h: '#3a3a4a', F: '#6a3a8a', f: '#4a2466' }) },
  // Thanos: piel morada, barbilla de surcos, armadura dorada y azul, el guantelete dorado con las gemas
  thanos: { ...B19, cab: CAB_THANOS, cuerpo: CUERPO_ANCHO, dxCuerpo: -1, brazoCol: 13, altoCuerpo: 15, ceja: hex('#4a2a5a'),
    delante: (c) => { if (!c.o.sostiene && !c.o.dedo && !c.o.brazos) for (const [i, j, k] of [[14, 7, 0], [14, 6, 1], [13, 6, 2], [15, 7, 3]]) c.cuerpo.px(i, j, hex(['#9a4ae8', '#3a8ae8', '#e83a3a', '#3ac85a'][k])); },
    pal: COLORES({ S: '#8a6aa8', s: '#6a4a88', z: '#4a2a68', C: '#2a4fa8', c: '#1e3680', O: '#e8b830', g: '#a87a18', W: '#2a4fa8', G: '#e8b830', e: '#e83a3a', I: '#a87a18', F: '#2a3a7a', n: '#a87a18' }) },
  // Loki: traje verde (C) y negro (J) con dorado, y el casco de cuernos dorados largos
  loki: { ...B19, ceja: hex('#1c1424'), tocado: 'cuernos', detras: capa(),
    cuerpo: parche(CUERPO_HEROE, [[4, 1, 'O.....O'], [4, 2, 'JO...OJ'], [4, 3, 'J.O.O.J'], [4, 4, 'J..O..J']]),
    pal: CLARA({ H: '#1c1424', h: '#3a3046', C: '#2a7a3a', c: '#1e5a2a', W: '#2a2430', G: '#2a2430', I: '#e8b830', F: '#2a2430', n: '#2a2430', O: '#e8b830', g: '#a87a18', J: '#2a2430', Q: '#2a7a3a', q: '#1e5a2a' }) },
  // Aquel Que Permanece: túnica morada y verde, sin casco
  permanece: { ...B19, cuerpo: CUERPO_TUNICA_HEROE, ceja: hex('#1c1424'),
    pal: OSCURA({ H: '#1c1424', h: '#3a3046', C: '#6a3a8a', c: '#4a2466', W: '#3a8a5a', o: '#e8b830', G: '#9a6644', I: '#3a8a5a', F: '#2a2430', n: '#2a2430' }) },
  // Kang: traje azul y verde con el yelmo azul de aletas laterales
  kang: { ...B19, ceja: hex('#1c1424'), tocado: 'yelmo',
    cuerpo: parche(CUERPO_HEROE, [[4, 1, 'VVVVVVV'], [5, 2, 'VVVVV'], [6, 3, 'VVV'], [7, 4, 'V']]),
    pal: OSCURA({ H: '#1c1424', C: '#2a5aa8', c: '#1e3e80', W: '#2a5aa8', G: '#3a8a3a', I: '#3a8a3a', F: '#1e3e80', n: '#3a8a3a', V: '#3a9a4a', A: '#3a6ac8', a: '#2a4a98' }) },
  // agente de la oficina del tiempo: traje marrón de los 70, chaleco y corbata
  agenteTVA: { ...B19, cuerpo: parche(CUERPO_EUROPEO, [[5, 2, 'u.o.u'], [5, 3, 'u.o.u'], [5, 4, 'uuouu'], [5, 5, 'uuuuu']]), ceja: hex('#5a3418'), bigote: true,
    pal: CLARA({ H: '#5a3418', h: '#8a5428', C: '#8a5a2a', c: '#6a4220', W: '#e8dcc0', o: '#c8783a', u: '#a8783a', F: '#8a5a2a' }) },
  // Mobius: bigote, entradas y traje gris
  mobius: { ...B19, cab: parche(CAB_CORTO, [[4, 1, 'SSSS'], [5, 2, 'SSSS'], [6, 3, 'SSSSS']]), cuerpo: CUERPO_EUROPEO, ceja: hex('#8a6a4a'), bigote: true,
    pal: CLARA({ H: '#a88a6a', h: '#c8a888', C: '#7a7e8a', c: '#5a5e6a', W: '#e8e4dc', o: '#5a3a6a', F: '#5a5e6a' }) },
  // Spider-Man: rojo y azul, la máscara con los ojos blancos grandes y la araña sencilla en el pecho
  spiderman: { ...B19, cab: CAB_ARANA, sinCara: true,
    cuerpo: parche(CUERPO_HEROE, [[5, 2, 'k.k.k'], [5, 3, '.kkk.'], [5, 4, 'k.k.k'], [3, 7, '.uuu.uuu'], [3, 8, '.uuu.uuu'], [3, 9, '.uuu.uuu']]),
    pal: COLORES({ d: '#a02028', C: '#d8303a', c: '#2a4fb8', W: '#d8303a', G: '#d8303a', I: '#2a4fb8', F: '#2a4fb8', u: '#2a4fb8', n: '#d8303a', E: '#ffffff', S: '#f6c290', s: '#d48a5a' }) },
  // Doctor Strange: túnica azul oscuro, capa roja con cuello alto, perilla y sienes canosas, el amuleto de oro
  strange: { ...B19, cab: CAB_SIENES, cuerpo: CUERPO_TUNICA_HEROE, ceja: hex('#2a1c14'), bigote: true, barba: true, detras: capaYcuello,
    pal: CLARA({ H: '#2a1c14', h: '#4a3020', w: '#d8d8e0', U: '#2a1c14', C: '#2a3a7a', c: '#1e2a5a', W: '#3a4a8a', o: '#e8b830', G: '#c8a878', I: '#7a5a3a', F: '#1e2a5a', n: '#4a3020', Q: '#c8303a', q: '#8a1e28' }) },
  // Clea: pelo blanco largo y traje morado
  clea: { ...B19M, ceja: hex('#c8c4bc'), cuerpo: parche(CUERPO_HEROE, [[4, 1, 'uuuuuuu'], [7, 2, 'u']]),
    pal: CLARA({ H: '#f2eee2', h: '#c8c8d8', C: '#7a3aa8', c: '#5a2a88', W: '#7a3aa8', G: '#e8b830', I: '#e8b830', F: '#5a2a88', n: '#3a1a5a', u: '#e8b830' }) },
  // Reed Richards de otra Tierra: uniforme azul oscuro sin el 4, sienes canosas
  reedOtro: { ...B19, cab: CAB_SIENES, ceja: hex('#4a3020'), cuerpo: parche(CUERPO_HEROE, [[6, 2, 'XXX']]),
    pal: CLARA({ H: '#4a3020', h: '#6a4430', w: '#d8d8e0', C: '#1e3a6a', c: '#14284e', W: '#1e3a6a', G: '#2a2430', I: '#2a2430', F: '#14284e', n: '#2a2430', X: '#8ab0e0' }) },
  // Charles Xavier: calvo, traje oscuro, sentado (la silla de ruedas es PIEZAS_DO.silla)
  xavier: { ...B19, cab: CAB_CALVO, cuerpo: CUERPO_SENTADO_TRAJE, altoCuerpo: 10, ceja: hex('#8a6a4a'),
    pal: CLARA({ C: '#2a2e3a', c: '#1c1f28', W: '#f2eee2', o: '#3a4a7a', F: '#2a2e3a' }) },
  // Doctor Doom: armadura gris de metal, máscara con rejilla, capucha, túnica y capa verdes
  doom: { ...B19, cab: CAB_DOOM, sinCara: true, detras: capa(),
    cuerpo: parche(CUERPO_HEROE, [[4, 1, 'VVVVVVV'], [4, 2, 'VVVVVVV'], [4, 3, 'VVVVVVV'], [4, 4, 'vVVVVVv'], [4, 5, 'vVVVVVv'], [4, 6, 'IIIoIII'], [4, 7, 'VVVkVVV']]),
    pal: COLORES({ V: '#2e7a3e', v: '#1e5a2a', Z: '#a8acbc', z: '#6a6e80', C: '#2e7a3e', c: '#1e5a2a', W: '#8c90a4', G: '#6a6e80', I: '#5a3a24', o: '#e8b830', F: '#6a6e80', n: '#4a4e5e', Q: '#2e7a3e', q: '#1e5a2a', S: '#f6c290', s: '#d48a5a' }) },
  // Deadpool: rojo con negro, máscara de ojos blancos en óvalos negros y las dos katanas a la espalda
  deadpool: { ...B19, cab: CAB_DEADPOOL, sinCara: true, detras: (c) => c.cuerpo.rej(KATANAS, -5, -4),
    cuerpo: parche(CUERPO_HEROE, [[4, 2, 'J.....J'], [4, 3, 'J.....J'], [7, 6, 'O'], [3, 7, '.J...J']]),
    pal: COLORES({ C: '#c8303a', c: '#8a1e28', W: '#c8303a', G: '#c8303a', I: '#2a2430', O: '#c8c8d0', F: '#c8303a', n: '#2a2430', J: '#2a2430', E: '#ffffff', Z: '#c0c4d4', S: '#f6c290', s: '#d48a5a' }) },
  // Lobezno: traje amarillo con azul, máscara de dos puntas y las garras de tres cuchillas (o.garras: false las quita)
  lobezno: { ...B19, ceja: hex('#1c1424'), bigote: false, tocado: 'lobezno', delante: garras,
    cab: parche(CAB_CORTO, [[3, 8, 'HH'], [3, 9, 'HH']]),
    cuerpo: parche(CUERPO_HEROE, [[4, 1, 'c.....c'], [5, 3, 'J...J'], [5, 4, 'cJ.Jc'], [3, 7, '.cc...cc']]),
    pal: CLARA({ H: '#1c1424', h: '#3a3046', C: '#f0c830', c: '#2a4fa8', W: '#f0c830', G: '#2a4fa8', I: '#c8303a', F: '#f0c830', n: '#2a4fa8', Y: '#f0c830', J: '#2a2430', E: '#ffffff' }) },
  // Gambito: gabardina marrón larga, cinta en el pelo castaño y la carta que brilla rosa
  gambito: { ...B19M, cuerpo: CUERPO_GABARDINA, ceja: hex('#4a2a14'), tocado: 'cinta', delante: cartaRosa,
    pal: CLARA({ H: '#6a3a1a', h: '#8a5428', C: '#8a5a2a', c: '#6a4220', W: '#c84a8a', G: '#3a3046', I: '#2a2430', F: '#2a2e4a', n: '#2a2430', J: '#2a2430', j: '#4c4660' }) },
  // Magneto: casco rojo y capa morada, traje rojo y morado
  magneto: { ...B19, ceja: hex('#c8c4bc'), tocado: 'magneto', detras: capa(),
    cuerpo: parche(CUERPO_HEROE, [[4, 1, 'u.....u'], [5, 2, 'u...u']]),
    pal: CLARA({ H: '#e8e4dc', C: '#c8303a', c: '#8a1e28', W: '#c8303a', G: '#6a3a9a', I: '#6a3a9a', F: '#c8303a', n: '#6a3a9a', u: '#6a3a9a', D: '#c8303a', d: '#8a1e28', Q: '#6a3a9a', q: '#4a2470' }) },
  // Cíclope: el visor rojo de lado a lado, traje azul con amarillo
  ciclope: { ...B19, ceja: hex('#5a3418'), tocado: 'visor',
    cuerpo: parche(CUERPO_HEROE, [[4, 1, 'Y.....Y'], [5, 2, 'Y...Y'], [6, 3, 'Y.Y']]),
    pal: CLARA({ H: '#6a4020', h: '#8a5a30', C: '#2a4fa8', c: '#1e3680', W: '#2a4fa8', G: '#f0c830', I: '#f0c830', F: '#1e3680', n: '#2a4fa8', Y: '#f0c830', J: '#2a2430', r: '#e83a3a' }) },
  // Mística: piel azul con escamas, pelo rojo
  mistica: { ...B19M, ceja: hex('#a8301a'), cuerpo: parche(CUERPO_HEROE, [[5, 2, 's.s'], [7, 3, 's'], [6, 4, 's.s'], [4, 8, 's'], [8, 9, 's']]),
    pal: COLORES({ S: '#3a6ac8', s: '#2a4a98', H: '#c83a2a', h: '#e8583a', C: '#3a6ac8', c: '#2a4a98', W: '#3a6ac8', G: '#3a6ac8', I: '#2a4a98', F: '#3a6ac8', n: '#2a4a98' }) },
  // Rondador Nocturno: piel azul oscuro, pelo negro, traje negro y rojo y la cola en punta
  rondador: { ...B19, ceja: hex('#1c1424'), detras: (c) => c.cuerpo.rej(COLA, -6, 2),
    cuerpo: parche(CUERPO_HEROE, [[5, 2, 'r...r'], [6, 3, 'r.r'], [7, 4, 'r']]),
    pal: COLORES({ S: '#2a3a7a', s: '#1e2a5a', H: '#1c1424', h: '#3a3046', C: '#2a2430', c: '#1c1424', W: '#2a2430', G: '#f2eee2', I: '#c8303a', F: '#2a2430', n: '#c8303a', r: '#c8303a' }) },
  // Bestia: grande como Hulk pero de pelaje azul, con gafas y calzón negro
  bestia: { ...BIG, cab: CAB_BESTIA, ceja: hex('#1e2a5a'), tocado: 'gafasClaras',
    cuerpo: parche(CUERPO_GRANDE, [[7, 5, 'r..r..r'], [3, 8, 'r'], [18, 8, 'r'], [8, 10, 'r...r']]),
    pal: COLORES({ S: '#4a78e0', s: '#2e52b0', r: '#1e2a7a', H: '#24368a', h: '#3a5ac8', F: '#2a2430', f: '#1c1424', E: '#e8ecf4' }) },
  // los Cuatro Fantásticos de la Tierra 828: traje azul claro con el 4 blanco en su círculo
  // la Cosa: piel de rocas naranjas, grande, calzón azul
  cosa: { ...BIG, cab: CAB_COSA, ceja: hex('#5a2a10'),
    cuerpo: parche(CUERPO_GRANDE, [[7, 3, 'r..r'], [2, 5, 'r'], [9, 4, 'rr'], [12, 7, 'r.r'], [1, 9, 'rr'], [18, 10, 'r'], [7, 9, 'r'], [2, 14, 'r'], [18, 14, 'r'], [7, 20, 'r'], [13, 21, 'r']]),
    pal: COLORES({ S: '#e8883a', s: '#b85a20', r: '#7a3810', H: '#e8883a', h: '#f8a85a', F: '#2a5ac8', f: '#1e3e90' }) },
  // los Thunderbolts: Yelena (chaleco táctico negro, pelo rubio recogido)
  yelena: { ...B19, detras: coleta, cuerpo: CUERPO_TACTICO, ceja: hex('#a8743c'),
    pal: CLARA({ H: '#e0c070', h: '#f0d898', C: '#2a2430', c: '#1c1424', W: '#3a3a4a', o: '#4a4a5a', G: '#2a2430', I: '#4a4a5a', F: '#2a2a34', n: '#1c1424' }) },
  // Bucky: ropa negra, brazo de metal plateado (el de delante) y pelo largo oscuro
  bucky: { ...B19M, ceja: hex('#2a1c14'), cuerpo: parche(CUERPO_TACTICO, [[11, 1, 'ZZk'], [11, 2, 'kZk'], [11, 3, 'kZk'], [11, 4, 'kzk'], [11, 5, 'kZk']]),
    pal: CLARA({ H: '#2a1c14', h: '#4a3020', C: '#2a2430', c: '#1c1424', W: '#2a2430', o: '#3a3a4a', G: '#2a2430', I: '#4a4a5a', F: '#2a2a34', n: '#1c1424', Z: '#c8ccd8', z: '#8c90a4' }) },
  // el Guardián Rojo: traje rojo con la estrella blanca, barba y bigote castaños
  guardian: { ...B19, cab: parche(CAB_BARBA, [[4, 4, 'S'], [3, 9, 'kH'], [2, 10, '.'], [12, 10, 'k']]), ceja: hex('#4a2a14'),
    cuerpo: parche(CUERPO_HEROE, [[5, 1, '..X..'], [5, 2, 'XXXXX'], [5, 3, '.XXX.'], [5, 4, '.X.X.']]),
    pal: CLARA({ H: '#6a3a1a', h: '#8a5428', C: '#c8303a', c: '#8a1e28', W: '#c8303a', G: '#e8b830', I: '#e8b830', F: '#2a4fa8', n: '#e8b830', X: '#f2eee2' }) },
  // Bob / Sentry: traje azul con el pecho dorado, rubio, capa azul
  sentry: { ...B19, ceja: hex('#a8743c'), detras: capa(),
    cuerpo: parche(CUERPO_HEROE, [[4, 1, 'OOOOOOO'], [4, 2, 'OOOOOOO'], [5, 3, 'OOOOO'], [6, 4, 'OOO'], [7, 5, 'O']]),
    pal: CLARA({ H: '#f0d070', h: '#f8e4a0', C: '#2a3e90', c: '#1e2a6a', W: '#2a3e90', G: '#2a3e90', I: '#e8b830', F: '#2a3e90', n: '#e8b830', O: '#f0c830', Q: '#2a4fb8', q: '#1e3680' }) },
  // Wakanda: Shuri como Pantera Negra (traje negro con dibujos plateados, máscara con orejitas)
  shuri: { ...B19, cab: CAB_PANTERA, sinCara: true,
    cuerpo: parche(CUERPO_HEROE, [[4, 1, 'ZZZZZZZ'], [5, 2, 'Z...Z'], [7, 3, 'Z'], [6, 4, 'Z.Z'], [4, 8, 'Z'], [8, 9, 'Z']]),
    pal: COLORES({ J: '#24202c', j: '#3a3646', C: '#24202c', c: '#14121a', W: '#24202c', G: '#24202c', I: '#3a3646', F: '#24202c', n: '#14121a', Z: '#b8bcd8', E: '#e8ecff', S: '#24202c', s: '#14121a' }) },
  // M'Baku: pelo, barba y el chaleco de pelaje marrón
  mbaku: { ...B19, cab: CAB_MBAKU, cuerpo: CUERPO_PELAJE, ceja: hex('#1c1424'),
    pal: OSCURA({ S: '#7a4a2a', s: '#5a3418', H: '#1c1424', h: '#3a3046', C: '#8a5a2a', c: '#5a3a1a', I: '#2a2430', n: '#5a3a1a' }) },
  // Namor: piel morena, bañador verde y las alitas blancas en los tobillos
  namor: { ...B19, cuerpo: CUERPO_BANADOR, ceja: hex('#1c1424'), cab: parche(CAB_CORTO, [[3, 0, 'kk'], [2, 1, 'kHH']]),
    pal: MORENA({ S: '#b88058', s: '#8a5a38', H: '#1c1424', h: '#3a3046', C: '#2a8a5a', c: '#1e6a42', W: '#f2eee2' }) },
  // Shang-Chi: traje rojo y oro con los anillos azules en los antebrazos
  shangchi: { ...B19, ceja: hex('#1c1424'),
    cuerpo: parche(CUERPO_HEROE, [[5, 1, 'O...O'], [6, 2, 'O.O'], [7, 3, 'O'], [1, 4, 'kYk.......kYk'], [1, 3, 'kYk.......kYk']]),
    pal: CLARA({ H: '#1c1424', h: '#3a3046', C: '#c8303a', c: '#8a1e28', W: '#c8303a', G: '#f6c290', I: '#e8b830', F: '#2a2430', n: '#2a2430', O: '#e8b830', Y: '#4ad8f8' }) },
  // Ant-Man: traje rojo y negro con el casco plateado de ojos rojos
  antman: { ...B19, cab: CAB_ANTMAN, sinCara: true,
    cuerpo: parche(CUERPO_HEROE, [[5, 2, 'J...J'], [5, 3, 'J...J'], [6, 4, 'JJJ'], [3, 7, '.J...J'], [3, 8, '.J...J']]),
    pal: COLORES({ Z: '#c0c4d4', z: '#7c8094', r: '#e83a3a', R: '#c8303a', C: '#c8303a', c: '#2a2430', W: '#2a2430', G: '#c8303a', I: '#c0c4d4', F: '#c8303a', n: '#2a2430', J: '#2a2430', S: '#f6c290', s: '#d48a5a' }) },
  // Kevin Feige, el presentador: gorra y chaqueta (sin parecido forzado)
  feige: { ...B19, cuerpo: parche(CUERPO_EUROPEO, [[5, 2, '.....'], [5, 3, '.....']]), ceja: hex('#5a3418'), tocado: 'visera', bigote: true, barba: true,
    pal: CLARA({ H: '#6a4a2a', h: '#8a6a4a', U: '#a88a6a', C: '#3a4a3a', c: '#2a362a', W: '#2a2430', o: '#2a2430', F: '#3e5a8a' }) },
  // fans de la Comic-Con disfrazados con ropa de calle: capa roja, cuernos de juguete, camiseta de la araña con gorra
  fanCapa: { ...B19, cuerpo: CUERPO_CALLE, ceja: hex('#5a3418'), detras: capa(),
    pal: CLARA({ H: '#7a4a24', h: '#a8743c', C: '#2a5ac8', c: '#1e3e90', F: '#3e4a6a', n: '#2a2430', Q: '#d8303a', q: '#8a1e28' }) },
  fanCuernos: { ...B19M, cuerpo: CUERPO_CALLE, ceja: hex('#1c1424'), tocado: 'cuernos',
    pal: MORENA({ H: '#1c1424', h: '#3a3046', C: '#2a7a3a', c: '#1e5a2a', F: '#2a2430', n: '#2a2430', O: '#e8c840', g: '#a88a28' }) },
  fanArana: { ...B19, cuerpo: parche(CUERPO_CALLE, [[5, 2, 'k.k.k'], [5, 3, '.kkk.'], [5, 4, 'k.k.k']]), ceja: hex('#a8743c'), tocado: 'visera',
    pal: CLARA({ H: '#e0b860', h: '#c8984a', C: '#d8303a', c: '#a82028', F: '#3e5a8a', n: '#f2eee2' }) },
};
// los Cuatro Fantásticos de la Tierra 828: traje azul claro, cinturón y botas oscuros, el 4 blanco en su círculo
const CUERPO_4F = parche(CUERPO_HEROE, [[5, 1, '.XXX.'], [5, 2, 'XaXaX'], [5, 3, 'XaaaX'], [5, 4, 'XXXaX'], [5, 5, '.XXX.']]);
const PAL_4F = { C: '#4a8ad8', c: '#2e64a8', W: '#4a8ad8', G: '#1e2a4a', I: '#1e2a4a', F: '#2e64a8', n: '#1e2a4a', X: '#f2eee2', a: '#2e64a8' };
Object.assign(ELENCO_DO, {
  reed: { ...B19, cab: CAB_SIENES, cuerpo: CUERPO_4F, ceja: hex('#4a3020'), pal: CLARA({ ...PAL_4F, H: '#4a3020', h: '#6a4430', w: '#d8d8e0' }) },
  sue: { ...B19M, cuerpo: CUERPO_4F, ceja: hex('#a8843c'), pal: CLARA({ ...PAL_4F, H: '#f0d070', h: '#f8e4a0' }) },
  johnny: { ...B19, cuerpo: CUERPO_4F, ceja: hex('#a8743c'), pal: CLARA({ ...PAL_4F, H: '#f0c860', h: '#f8dc90' }) },
  // la Antorcha Humana: Johnny encendido, todo en llamas naranja y amarillo
  antorcha: { ...B19, cab: CAB_FUEGO, cuerpo: CUERPO_4F, ceja: hex('#a83a10'), detras: llamas, delante: (c) => { if (Math.floor(c.t * 8) % 2) llamas({ ...c, t: c.t + 0.4 }); },
    pal: COLORES({ S: '#f8a030', s: '#e86a20', Y: '#fff0a0', y: '#f8c840', C: '#f8a030', c: '#e86a20', W: '#f8a030', G: '#fff0a0', I: '#e86a20', F: '#f8a030', n: '#e86a20', X: '#fff0a0', a: '#e86a20' }) },
});
Object.assign(ELENCO_CHIBI, ELENCO_DO);

// ── Episodio 20: «Los Juegos del Hambre» (antes de «Amanecer en la cosecha»). Personajes dibujados por nosotros,
// reconocibles solo por sus atributos (la trenza, el broche, la petaca, la rosa blanca, las plumas, la peluca rosa…),
// sin parecido con los actores de las películas y sin logos. Letras propias de este reparto (cada uno las define en su
// pal): O/g oro del broche · r/R, y, v/V, u/U, p, d colores sueltos · n botas · I cinturón · J/j pelucas oscuras.
// Los niños (Prim, el hermano de Haymitch) llevan un cuerpo más bajo (10 filas), con la misma cabeza.
const pad = (g) => { const w = Math.max(...g.map((f) => f.length)); return g.map((f) => f.padEnd(w, '.')); };
// piel del Veta (Seam) del Distrito 12: oliva
const OLIVA = (o) => ({ S: hex('#dcae84'), s: hex('#b08058'), ...Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)])) });

// ── cabezas ──
// pelo rizado y revuelto (Haymitch a los 16, su hermano, Teseo): la silueta de arriba con bultos y unos rizos en la frente
const CAB_RIZOS = [
  '..kk.kk.kk.....',
  '.kHHkHHkHHkk...',
  '.kHhHHhHHhHHk..',
  'kHHHhHHHHHhHHk.',
  'kHhHSHSSSHSSSk.',
  'kHHhSSSSSSSSSk.',
  'kHhssSSSSSSSSSk',
  'kHHsSSSSSSSSsk.',
  '.kHSSSSSSSSSSk.',
  '.kSSSSSSSSSSk..',
  '..kSSSSSSSSsk..',
  '...kksSSSSkk...',
  '.....kkkkk.....',
];
// Haymitch mentor: greñas largas y revueltas hasta el cuello, barba de varios días (u) y las mejillas coloradas (r)
const CAB_GRENAS = [
  '..kk.kkk.kk....',
  '.kHHkHHHkHHk...',
  '.kHhHHHHhHHHk..',
  'kHHHHHhHHHHHHk.',
  'kHhHHHSSSHSSSk.',
  'kHHHHSSSSSSSSk.',
  'kHHHsSSSSSSSSSk',
  'kHhHSSSSSSSSsk.',
  'kHHHSSrrSSSSrk.',
  'kHhHkuuuuSSSk..',
  'kHHhkkuuuuukk..',
  'khHHk.kkkkk....',
  '.kkHk..........',
  '..kk...........',
];
// Lenore Dove: rizos oscuros largos con plumitas de colores (r roja, y amarilla, u azul) entre el pelo
const CAB_PLUMAS = [
  '..kk.kk.kk.....',
  '.kHHkHHkHHkk...',
  '.kHhHrHHhHHHk..',
  'kHHHHrHHHHhHHk.',
  'kHyHHSSSSSSSSk.',
  'kHyHhSSSSSSSSk.',
  'kHHHsSSSSSSSSSk',
  'khHHSSSSSSSSsk.',
  'kHuHSSSSSSSSSk.',
  'kHuHkSSSSSSSk..',
  'khHhkkSSSSSkk..',
  'kHhHk.kkkkk....',
  '.kkk...........',
];
// pelo peinado hacia atrás y liso (Snow joven, el tributo profesional): una raya de brillo
const CAB_ENGOMINADO = parche(CAB_CORTO, [[3, 1, 'hhhhh'], [2, 2, 'HHHHHHHhh'], [4, 4, 'H']]);
// peluca empolvada del siglo XVIII (Hume): blanca, con los rulos sobre la oreja
const CAB_PELUCA = parche(CAB_CORTO, [[1, 4, 'hH'], [1, 5, 'Hh'], [1, 6, 'hH'], [1, 7, 'Hh'], [2, 8, 'h']]);
// entradas (Beetee): la frente despejada
const CAB_ENTRADAS = parche(CAB_CORTO, [[6, 3, 'SSSSSS'], [5, 4, 'S']]);
// mechones canosos (Mags): el pelo largo con vetas grises (w)
const CAB_VETAS = parche(CAB_LARGO, [[3, 1, 'ww'], [5, 2, 'w'], [2, 3, 'w'], [1, 5, 'w'], [2, 7, 'w'], [1, 9, 'w'], [2, 10, 'w']]);

// ── cuerpos ──
// camisa de trabajo remangada con tirantes (G) y el cuello abierto: el Distrito 12 minero (Haymitch joven)
const CUERPO_TIRANTES = parche(CUERPO_CALLE, [[6, 0, 'SSS'], [5, 1, 'G...G'], [2, 2, 'W..G...G..W'], [5, 3, 'G...G'], [5, 4, 'G...G'], [5, 5, 'G...G'], [5, 6, 'G...G']]);
// chaqueta arrugada (c) con la camisa por fuera (W): Haymitch mentor
const CUERPO_ARRUGADO = parche(CUERPO_EUROPEO, [[4, 3, 'c'], [10, 4, 'c'], [4, 7, 'WW'], [9, 7, 'WW']]);
// manga larga (camisa, jersey, sudadera): CUERPO_CALLE con las mangas hasta la muñeca
const CUERPO_MANGA = parche(CUERPO_CALLE, [[2, 3, 'C.........C'], [2, 4, 'C.........C']]);
// chaqueta de cuero de caza (C) abierta sobre la camisa verde (W), el broche de oro (O) en la solapa y las botas (n)
const CUERPO_CAZADORA = [
  '...kkWWWWWkk...',
  '..kCCCWWWCCCk..',
  '.kCkCCCWCOCkCk.',
  '.kCkCCCWCCCkCk.',
  '.kCkcCCWCCckCk.',
  '.kSkcCCWCCckSk.',
  '..kkCCCCCCCkk..',
  '...kCCCkCCCk...',
  '...kFFFkFFFk...',
  '...kFFFkFFFk...',
  '...knnnknnnk...',
  '...knnnknnnk...',
  '..kkkkk.kkkkk..',
];
// vestido sin delantal, solo el cuello (W): las chicas del 12 el día de la cosecha, Maysilee, Madge
const VESTIDO_LISO = parche(CUERPO_VESTIDO, [[4, 4, 'CCCCCCC'], [4, 5, 'CCCCCCC'], [4, 6, 'CCCCCCC'], [4, 7, 'CCCCCCC'], [4, 8, 'CCCCCCC']]);
// el vestido de la hija del comerciante (Maysilee): lazo en la cintura (I) y pliegues (c)
const CUERPO_PLIEGUES = parche(VESTIDO_LISO, [[4, 4, 'IIIIIII'], [4, 6, 'cCCCCCc'], [4, 7, 'CcCCCcC'], [4, 8, 'CcCCCcC'], [4, 9, 'cCcCcCc']]);
// ropa de capas de colores del Covey (Lenore Dove): collar de cuentas (y r b), blusa mostaza con lunares (d), fajín
// (u) y la falda de tres capas (roja, verde y morada)
const CUERPO_COVEY = [
  '....kkSSSkk....',
  '..kkCyrybyCkk..',
  '.kCkCCCCCCCkCk.',
  '.kCkCdCCCdCkCk.',
  '.kSkuuuuuuukSk.',
  '.kSkrrrrrrrkSk.',
  '..kkrRrrrRrkk..',
  '...krrrrrrrk...',
  '...kvvvvvvvk...',
  '...kvVvvvVvk...',
  '...kpppppppk...',
  '...kkkkkkkkk...',
  '....kLk.kLk....',
];
// el vestido de volantes de Lucy Gray: los colores del arcoíris en bandas y la falda que se abre
const CUERPO_VOLANTES = [
  '....kkSSSkk....',
  '..kkrrrrrrrkk..',
  '.krkrrRrRrrkrk.',
  '.kSkqqqqqqqkSk.',
  '.kSkyyyyyyykSk.',
  '.kskvvvvvvvksk.',
  '..kuuuuuuuuuk..',
  '.kuuUuuuuUuuuk.',
  '.kpppppppppppk.',
  'kpppPppppppPppk',
  'krRrrRrrRrrRrrk',
  '.kkkkkkkkkkkkk.',
  '....kLk.kLk....',
];
// la toga del emperador: blanca (T) con la banda morada (A) en diagonal y el borde de abajo
const CUERPO_TOGA = [
  '...kkTTTTTkk...',
  '..kAATTTTTTTk..',
  '.kTkTAATTTTkSk.',
  '.kTkTTAATTTkSk.',
  '.kTkTTTAATTkSk.',
  '.kSkTTTTAATksk.',
  '..kkTTTTTAAkk..',
  '...kTTTTTTAk...',
  '...kTTTTTTTk...',
  '...ktTTTTTtk...',
  '...kAAAAAAAk...',
  '...kkkkkkkkk...',
  '....kLk.kLk....',
];
// quitón corto griego (Teseo): túnica blanca ceñida (G), brazos y piernas al aire, sandalias
const CUERPO_QUITON = [
  '...kkTTTTTkk...',
  '..kTTTTTTTTTk..',
  '.kSkTTTTTTTkSk.',
  '.kSkTTTTTTTkSk.',
  '.kSkTTTTTTTkSk.',
  '.kskGGGGGGGksk.',
  '..kkTTTTTTTkk..',
  '...kTTtTTtTk...',
  '...ktttttttk...',
  '....kSk.kSk....',
  '....kSk.kSk....',
  '....kLk.kLk....',
  '...kLLk.kLLk...',
];
// niños (10 filas): vestido con cuello (W) y camisa con pantalón corto
const CUERPO_NINA = [
  '....kkWWWkk....',
  '..kkCCWWWCCkk..',
  '.kCkCCCCCCCkCk.',
  '.kSkCCCCCCCkSk.',
  '.kSkCCCCCCCkSk.',
  '..kkcCCCCCckk..',
  '...kCCCCCCCk...',
  '...kkkkkkkkk...',
  '....kSk.kSk....',
  '....kLk.kLk....',
];
const CUERPO_NINO = [
  '...kkCCCCCkk...',
  '..kCCCCCCCCCk..',
  '.kCkCCCCCCCkCk.',
  '.kSkCCCCCCCkSk.',
  '.kSkCCCCCCCkSk.',
  '..kkFFFFFFFkk..',
  '...kFFFkFFFk...',
  '...kSSSkSSSk...',
  '...knnnknnnk...',
  '..kkkkk.kkkkk..',
];

// ── tocados nuevos ──
Object.assign(TOCADOS, {
  // la peluca rosa altísima de Effie (P/p) con el sombrerito verde (V) arriba
  pelucaRosa: [[
    '.....kkkk......',
    '....kVVVVk.....',
    '...kkkkkkkk....',
    '...kPPPPPPk....',
    '..kPPpPPPPPk...',
    '..kPPPPPPpPk...',
    '.kPPpPPPPPPPk..',
    '.kPPPPPPPpPPk..',
    'kPPPPpPPPPPPPk.',
    'kPPPPPPPPPPPPk.',
    'kPpPPPPPPPPPPk.',
    'kPPPPPPPPPPPPk.',
  ], -8],
  // la torre de Drusilla: peluca ciruela (J/j) altísima e inclinada hacia atrás, con dos bandas de oro (O)
  torre: [[
    '..kkkk.........',
    '.kJJJJk........',
    '.kJjJJk........',
    '.kOOOOk........',
    '..kJJJJk.......',
    '..kJJjJJk......',
    '..kJJJJJk......',
    '.kJJJJjJJk.....',
    '.kOOOOOOOOk....',
    'kJJJJJJJJJJk...',
    'kJJjJJJJJJJJk..',
    'kJJJJJJJJjJJJk.',
    'kJJJJJJJJJJJJk.',
    'kJJJJJJJJJJJJk.',
  ], -10],
  // el tupé de Caesar: pelo de color (H) en una ola alta que se adelanta sobre la frente (sin taparla)
  tupe: [[
    '......kkkkk....',
    '....kkHHHHHkk..',
    '...kHHhhHHHHHk.',
    '..kHHHHHHHhHHHk',
    '.kHHHHHHHHHHHk.',
    'kHHHhHHHHHHHk..',
  ], -4],
  // corona de laurel (V/v): las hojas alrededor de la cabeza, por encima de la frente
  laurel: [[
    '..kV.kV.kV.k...',
    '.kVVkVVkVVkVk..',
    'kVvVVvVVvVVvVk.',
    'kVk.........kVk',
  ], 1],
  // pelucas del Capitolio: pinchos verdes (V/v) y una bola turquesa enorme (Y/y)
  pinchos: [[
    '.k...k...k.....',
    'kVk.kVk.kVk....',
    'kVVkVVVkVVVk.k.',
    '.kVVVvVVVvVVkVk',
    'kVVvVVVVVVVVVVk',
    'kVVVVVVVVVvVVk.',
    'kVvVVVVVVVVVVk.',
    'kVVVVVVVVVVVVk.',
    'kVVVVVVVVVVVVk.',
  ], -5],
  pompon: [[
    '....kkkkkk.....',
    '..kkYYYYYYkk...',
    '.kYYyYYYYYYYk..',
    'kYYYYYYYyYYYYk.',
    'kYyYYYYYYYYYYk.',
    'kYYYYYYYYYYyYYk',
    'kYYYyYYYYYYYYk.',
    'kYYYYYYYYYYYYk.',
    'kYYYYYYYYYYYYk.',
    'kYYYYYYYYYYYYk.',
    '.kYYYYYYYYYYYk.',
  ], -7],
  // casco blanco de los agentes de la paz (X/x), con la visera oscura (J) subida: la cara se ve entera
  cascoPaz: [[
    '...kkkkkkkk....',
    '..kXXXXXXXXk...',
    '.kXXxXXXXXXXk..',
    'kXXXXXXXXXXXXk.',
    'kXXXkJJJJJJJJJk',
    'kXXXkkkkkkkkkk.',
    'kXXXk..........',
    'kXxXk..........',
    'kXXXk..........',
    '.kXXk..........',
    '..kk...........',
  ], -1],
  // casco antidisturbios oscuro (J/j) con la visera transparente: solo su marco gris (Z) por delante de la cara
  antidisturbios: [[
    '...kkkkkkkk....',
    '..kJJJJJJJJk...',
    '.kJJjJJJJJJJk..',
    'kJJJJJJJJJJJJk.',
    'kJJJJJJJJJJJJJk',
    'kJJJkZZZZZZZZZk',
    'kJJJk.........Z',
    'kJjJk.........Z',
    'kJJJk.........Z',
    'kJJJk........Z.',
    '.kJJk......ZZ..',
    '..kk...........',
  ], -1],
});

// ── piezas (con el R de conChibi). Todas: (x, y) = el centro de abajo de la pieza (donde se apoya o por donde se
// coge); o.s escala (1 = tamaño de escena; 2 al doble, para los insertos), o.dir −1 la voltea ──
const PAL_JH = COLORES({
  k: '#1c1222', O: '#f0c040', g: '#a87a18', o: '#ffe890', X: '#f6f2e6', x: '#c8c0b0', Z: '#c8ccd8', z: '#8c90a4', E: '#ffffff',
  B: '#d8943a', b: '#9a5a24', T: '#f4cc80', t: '#e0a85a', m: '#7a2026', r: '#e86a7a', V: '#4a9a3a', v: '#2e6a24',
  G: '#c8e6ee', W: '#e6f4f8', R: '#c8303a', J: '#24202c', j: '#4a4458', w: '#f2f2f2', u: '#8a8a96', U: '#5a5a66',
  C: '#c87a3a', c: '#8a4a1e', M: '#a8642a', L: '#6a3a1a',
});
const pintaJH = (R, g, x, y, o = {}, pal = PAL_JH) => {
  const s = o.s ?? 1, dir = o.dir ?? 1, w = g[0].length, x0 = Math.round(x - w * s / 2), y0 = Math.round(y - g.length * s);
  g.forEach((f, j) => { for (let i = 0; i < w; i++) { const c = pal[f[i]]; if (c == null) continue; const ii = dir > 0 ? i : w - 1 - i; R.rect(x0 + ii * s, y0 + j * s, x0 + ii * s + s - 1, y0 + j * s + s - 1, c); } });
};
// el broche del sinsajo: un aro de oro (O, sombra g) con el pájaro de alas abiertas en negro dentro
const BROCHE = [
  '.....kkkkk.....',
  '...kkOOOOOkk...',
  '..kOOOOOOOOOk..',
  '.kOOOkOOOOOOOk.',
  '.kOOOkkOOOOOOk.',
  'kOOOOkkkOOOOOOk',
  'kOOOOOkkkOOkkOk',
  'kkkOOkkkkkkkkkk',
  'kOkkkkkkkkkOOOk',
  'kOOOOOkkkOOOOOk',
  '.kOOOOOOOOOOOk.',
  '.kOOOOOOOOOOgk.',
  '..kOOOOOOOOgk..',
  '...kkggggggk...',
  '.....kkkkk.....',
]
const broche = (R, x, y, o = {}) => { pintaJH(R, BROCHE, x, y, o); if (o.brillo) R.pset(Math.round(x - 2 * (o.s ?? 1)), Math.round(y - 7 * (o.s ?? 1)), PAL_JH.o); };
// la petaca de Haymitch: plata (Z/z) con el tapón oscuro y un brillo
const PETACA = ['.kk.', 'kjjk', 'kZZk', 'kZEk', 'kZZk', 'kzZk', 'kzzk', '.kk.'];
const petaca = (R, x, y, o = {}) => pintaJH(R, PETACA, x, y, o);
// la urna de cristal de la cosecha (G/W cristal, E brillo) sobre su pie, llena de papeletas (X/x); o.nivel 0–1
const URNA = [
  '..kkkkkkkkkkkkkkk..',
  '.kWWWWWWWWWWWWWWWk.',
  '..kGGGGGGGGGGGGGk..',
  '.kGEGGGGGGGGGGGGGk.',
  'kGGEGGGGGGGGGGGGGGk',
  'kGGEGGGGGGGGGGGGGGk',
  'kGGGGGGGGGGGGGGGGGk',
  'kGGGGGGGGGGGGGGGGGk',
  'kGGGGGGGGGGGGGGGGGk',
  '.kGGGGGGGGGGGGGGGk.',
  '..kGGGGGGGGGGGGGk..',
  '...kkkkkkkkkkkkk...',
  '......kuuuuuk......',
  '.......kuuuk.......',
  '.....kkuuuuukk.....',
  '....kuuuuuuuuuk....',
  '....kkkkkkkkkkk....',
];
const urna = (R, x, y, o = {}) => {
  const nivel = o.nivel ?? 0.6, arriba = Math.round(10 - nivel * 7);
  const g = URNA.map((f, j) => (j < arriba || j > 10 ? f : f.replace(/G/g, (_, i) => ((i * 7 + j * 3) % 5 === 0 ? 'x' : (i + j) % 3 === 0 ? 'G' : 'X'))));
  pintaJH(R, g, x, y, o);
};
// la rosa blanca de Snow: flor (X/x) con el tallo y una hoja (V/v)
const ROSA = ['.kkk.', 'kXxXk', 'kxXXk', '.kxk.', '..Vk.', '.vV..', 'kVV..', '..V..', '..v..'];
const rosaBlanca = (R, x, y, o = {}) => pintaJH(R, ROSA, x, y, o);
// la guitarra vieja de Lucy Gray: cuerpo de madera (C/c) con la boca negra y el mástil (M/L)
const GUITARRA = [
  '..kkk..',
  '..kLk..',
  '..kkk..',
  '..kMk..',
  '..kMk..',
  '..kMk..',
  '..kMk..',
  '.kkMkk.',
  'kCCCCck',
  'kCCCCck',
  '.kCCck.',
  'kCCkCCk',
  'kCkkkck',
  'kCCkCck',
  'kCCCCck',
  '.kcccck',
  '..kkkk.',
];
const guitarra = (R, x, y, o = {}) => pintaJH(R, GUITARRA, x, y, o);
// el arco de Katniss: la pala de madera (B/b) curvada y la cuerda (x) recta
const ARCO = [
  'kk...',
  'xbk..',
  'x.bk.',
  'x.Bk.',
  'x..Bk',
  'x..Bk',
  'x..Bk',
  'x..Bk',
  'x..Bk',
  'x.Bk.',
  'x.bk.',
  'xbk..',
  'kk...',
];
const arco = (R, x, y, o = {}) => pintaJH(R, ARCO, x, y, o);
// flecha: plumas rojas (R), astil (B) y punta de metal (Z); apunta a la derecha (o.dir −1 a la izquierda)
const FLECHA = ['RR........kk.', '.RBBBBBBBBZZk', 'RR........kk.'];
const flecha = (R, x, y, o = {}) => pintaJH(R, FLECHA, x, y, o);
// la aguja de tejer de Wiress: plata (Z) con la bolita de la punta (O)
const AGUJA = ['.k.', 'kOk', 'kZk', 'kZk', 'kZk', 'kZk', 'kZk', 'kzk', '.k.'];
const aguja = (R, x, y, o = {}) => pintaJH(R, AGUJA, x, y, o);
// el anzuelo de Mags: sedal (x) y el gancho de plata (Z) en forma de J con su punta
const ANZUELO = ['...x.', '...x.', '..kZk', '...Zk', '...Zk', 'kk.Zk', 'kZkZk', '.kZZk', '..kk.'];
const anzuelo = (R, x, y, o = {}) => pintaJH(R, ANZUELO, x, y, o);
// la bobina de cable de Beetee: vueltas de cobre (C/c) y la punta suelta
const CABLE = [
  '..kkkkk...',
  '.kCcCcCk..',
  'kCk...kCk.',
  'kc.....ck.',
  'kCk...kCkk',
  '.kCcCcCkCk',
  '..kkkkk.kc',
  '.........k',
];
const cable = (R, x, y, o = {}) => pintaJH(R, CABLE, x, y, o);
// EL PAN CON OJOS, la mascota del episodio: hogaza redonda de corteza dorada (B, cortes b) y miga clara (T/t) con cara.
// o.cara: 'normal' (y parpadea con o.t), 'feliz', 'susto' (ojos grandes y boca en O), 'estornudo' (ojos cerrados,
// boca abierta y migas que salen); o.mordido: le falta la mitad de la derecha (el gag del maratón)
const PAN = [
  '...kkkkkkk...',
  '.kkBBbBBbBkk.',
  'kBBbBBbBBbBBk',
  'kBBBBBBBBBBBk',
  'kBTTTTTTTTTBk',
  'kTTTTTTTTTTTk',
  'kTTTTTTTTTTTk',
  'kTTTTTTTTTTtk',
  '.kttTTTTTttk.',
  '..kkkkkkkkk..',
];
const PAN_MORDIDO = [
  '...kkkkk.....',
  '.kkBBbBBk....',
  'kBBbBBbBk....',
  'kBBBBBBk.....',
  'kBTTTTTxk....',
  'kTTTTTTk.....',
  'kTTTTTTxk....',
  'kTTTTTTk.....',
  '.kttTTTxk....',
  '..kkkkkk.....',
];
const pan = (R, x, y, o = {}) => {
  const s = o.s ?? 1, dir = o.dir ?? 1, cara = o.cara ?? 'normal', w = PAN[0].length;
  pintaJH(R, o.mordido ? PAN_MORDIDO : PAN, x, y, o);
  const x0 = Math.round(x - w * s / 2), y0 = Math.round(y - PAN.length * s);
  const dx = o.mordido ? -2 : 0, px = (i, j, c) => { const ii = dir > 0 ? i + dx : w - 1 - i - dx; R.rect(x0 + ii * s, y0 + j * s, x0 + ii * s + s - 1, y0 + j * s + s - 1, PAL_JH[c]); };
  if (cara === 'susto') { for (const ex of [3, 8]) { px(ex, 4, 'E'); px(ex + 1, 4, 'E'); px(ex, 5, 'E'); px(ex + 1, 5, 'k'); } px(6, 6, 'k'); px(6, 7, 'm'); px(6, 8, 'k'); }
  else if (cara === 'estornudo') {
    px(3, 4, 'k'); px(4, 5, 'k'); px(3, 6, 'k'); px(9, 4, 'k'); px(8, 5, 'k'); px(9, 6, 'k');
    px(5, 6, 'k'); px(6, 6, 'm'); px(7, 6, 'k'); px(6, 7, 'm'); px(5, 7, 'k'); px(7, 7, 'k');
    for (const [i, j] of [[14, 4], [15, 6], [14, 7], [16, 5], [17, 7]]) px(i, j, 'T');
  } else {
    const cierra = cara === 'normal' && ((o.t ?? 0) + x * 0.13) % 2.6 < 0.1;
    for (const ex of [4, 8]) { if (!cierra) px(ex, 4, 'k'); px(ex, 5, 'k'); }
    if (cara === 'feliz') { px(5, 6, 'k'); px(6, 7, 'k'); px(7, 6, 'k'); } else px(6, 7, 'k');
    px(3, 6, 'r'); px(9, 6, 'r');
  }
};
// pájaros (mirando a la derecha; o.t bate las alas): cuerpo J, ala j, barras del ala w, ojo E, pico Z, cola U
const PAJARO = pad([
  '.......kkk..',
  '......kJJJk.',
  '.....kJJEJkk',
  'kkk.kJJJJJkZk',
  'kUUkJjjjJJkk',
  '.kUUjwwjJJk',
  '..kkJjjJJk',
  '....kkkkk',
]);
const ALA_ARRIBA = [[5, 2, 'kj'], [4, 1, 'kjk'], [4, 0, '.k']];
const pajaro = (pal) => (R, x, y, o = {}) => {
  const arriba = o.t != null && Math.sin(o.t * 14 + x) > 0;
  pintaJH(R, arriba ? parche(PAJARO, ALA_ARRIBA) : PAJARO, x, y, o, { ...PAL_JH, ...pal });
};
// el charlajo (jabberjay): todo negro, ojo blanco; el sinsonte: gris con barras blancas; el sinsajo: negro con el oro
const charlajo = pajaro(COLORES({ J: '#24202c', j: '#3a3646', w: '#3a3646', U: '#24202c', Z: '#5a5a66', E: '#ffffff' }));
const sinsonte = pajaro(COLORES({ J: '#8a8a96', j: '#6a6a76', w: '#f2f2f2', U: '#5a5a66', Z: '#3a3646', E: '#1c1222' }));
const sinsajo = pajaro(COLORES({ J: '#24202c', j: '#3a3646', w: '#f0c040', U: '#a87a18', Z: '#f0c040', E: '#f0c040' }));
export const PIEZAS_JH = { broche, petaca, urna, rosaBlanca, guitarra, arco, flecha, aguja, anzuelo, cable, pan, charlajo, sinsonte, sinsajo };

// ── ganchos (lo que llevan en la mano: se quita si la escena le pone o.sostiene, o.dedo u o.brazos) ──
const manoLibre = (c) => !(c.o.sostiene || c.o.dedo || c.o.brazos || c.o.sinObjeto);
// la trenza de lado (Katniss): baja desde detrás de la oreja por encima del hombro, con su lazo (r)
const TRENZA = ['.kHk', 'kHhk', 'kHHk', 'khHk', 'kHHk', 'kHhk', '.kHk', '.krk', '.kHk', '..k.'];
const trenza = (c) => c.cab.rej(TRENZA, 3, 10);
// las dos trencitas rubias de Prim: una por detrás de la espalda y otra por encima del hombro
const TRENCITA = ['kHk', 'khk', 'kHk', 'khk', 'krk', '.k.'];
const trencitas = { detras: (c) => c.cab.rej(TRENCITA, -1, 8), delante: (c) => c.cab.rej(TRENCITA, 2, 9) };
// las dos coletas de Maysilee con sus pinzas rosas (r): una detrás y la otra asomando por arriba
const COLETA_M = ['.kk.', 'krrk', 'kHHk', 'kHhk', '.kHk', '..k.'];
const COLETA_ALTA = ['.kk.', 'kHHk', 'kHhk', 'krrk', '.kk.'];
const coletas = (c) => { c.cab.rej(COLETA_M, -3, 4); };   // una coleta baja por detrás (la alta parecía un lazo)
// plumas de colores que asoman del pelo de Lenore
const plumitas = (c) => { for (const [i, j, k] of [[1, -1, 'r'], [0, -2, 'r'], [3, -1, 'y'], [3, -2, 'y'], [-1, 3, 'u'], [-2, 2, 'u']]) c.cab.px(i, j, c.pal[k]); };
// el moño con la aguja de tejer cruzada (Wiress)
const MONO = ['z......', '.z.kk..', '.kzHHk.', 'kHHzhHk', 'kHhHzHk', '.kHHHZz', '..kkk..'];
const mono = (c) => c.cab.rej(MONO, -3, 0, { ...c.pal, Z: hex('#c8ccd8'), z: hex('#e8ecf4') });
// la coleta con lazo negro de la peluca de Hume
const LAZO = ['kk.', 'kJk', 'kJJ', '.kk'];
const lazo = (c) => c.cab.rej(LAZO, -2, 7);
// el cuello rígido de oro de Drusilla, que sube por detrás de la cabeza
const CUELLO_RIGIDO = ['k...', 'kOk.', 'kOOk', 'kOgk', 'kOOk', 'kOgk', '.kOk'];
// cosas en la mano de delante (columna 12–16 de la rejilla del cuerpo, la mano en la fila 5)
const enMano = (g, i, j, pal) => (c) => { if (manoLibre(c)) c.cuerpo.rej(g, i, j, pal ? { ...c.pal, ...pal } : c.pal); };
const PAL_MANO = COLORES({ O: '#f0c040', g: '#a87a18', Z: '#c8ccd8', z: '#8c90a4', E: '#ffffff', X: '#f6f2e6', x: '#c8c0b0', B: '#d8943a', b: '#9a5a24', C: '#c87a3a', c: '#8a4a1e', j: '#4a4458', J: '#24202c', u: '#6a3a9a' });
const conPetaca = enMano(['.kk.', 'kjjk', 'kZZk', 'kZEk', 'kzZk', '.kk.'], 13, 2, PAL_MANO);
const conLibreta = enMano(['kkkkk', 'kXkXk', 'kxkxk', 'kkkkk'], 13, 3, PAL_MANO);
const conMicro = enMano(['.kk.', 'kJjk', 'kJJk', '.kk.', '.kZk', '.kzk', '..k.'], 12, -1, PAL_MANO);
const conAbanico = enMano(['kkkkkk', 'kOuOuk', '.kOuk.', '..kk..'], 12, 2, PAL_MANO);
const conCable = enMano(['.kkk.', 'kCcCk', 'kc.ck', 'kCcCk', '.kkk.'], 12, 4, PAL_MANO);
const conEspada = enMano(['..k..', '.kZk.', '.kZk.', '.kZk.', '.kZk.', '.kZk.', 'kOOOk', '.kbk.', '.kkk.'], 12, -2, PAL_MANO);
const conArco = enMano(ARCO, 13, -1, PAL_MANO);
// la sonrisa enorme de Caesar (dientes E) y los brillos del traje, que centellean
const sonrisaCaesar = (c) => { if (c.o.habla || c.o.sorpresa || c.o.triste) return; const y = 9; c.cab.px(8, y, P.k); for (let i = 9; i <= 12; i++) { c.cab.px(i, y, P.E); c.cab.px(i, y + 1, P.k); } c.cab.px(13, y, P.k); };
const brillos = (c) => { const on = Math.floor(c.t * 4 + c.x) % 3; [[5, 2], [9, 4], [4, 6], [10, 1], [6, 8]].forEach(([i, j], n) => { if ((n + on) % 3) c.cuerpo.px(i, j, hex((n + on) % 3 === 1 ? '#c8d0ff' : '#ffffff')); }); };
// cejas severas (Drusilla): las dos cejas hacia abajo por dentro
const severa = (c) => { if (c.o.sonrisa || c.o.sorpresa) return; const ceja = hex('#3a1a4a'); c.cab.px(7, 4, ceja); c.cab.px(7, 5, c.pal.S); c.cab.px(12, 4, ceja); c.cab.px(12, 5, c.pal.S); };
// el maquillaje del Capitolio: dos piedrecitas de color en las mejillas
const gemas = (col) => (c) => { c.cab.px(6, 8, hex(col)); c.cab.px(13, 8, hex(col)); };
const varios = (...fs) => (c) => { for (const f of fs) f(c); };

// ── el reparto del 20 ──
const B20 = { cab: CAB_CORTO, cuerpo: CUERPO_EUROPEO, brazoCol: 11, altoCuerpo: 13, altoCab: 12, ojosY: 6, bocaY: 9 };
const B20M = { ...B20, cab: CAB_LARGO, cuerpo: CUERPO_VESTIDO };
const B20N = { ...B20, altoCuerpo: 10 };
export const ELENCO_JH = {
  // ── Distrito 12, Juegos 50 (2.º Vasallaje) ──
  // Haymitch a los 16: rizos oscuros revueltos, camisa de trabajo gris azulada remangada, tirantes, pantalón y botas
  haymitch: { ...B20, cab: CAB_RIZOS, cuerpo: CUERPO_TIRANTES, ceja: hex('#1c1424'),
    pal: OLIVA({ H: '#2a2028', h: '#4a3e4c', C: '#7a8aa0', c: '#5a6a80', W: '#a8b8c8', G: '#5a3a20', F: '#4a4038', n: '#2a2018' }) },
  // Haymitch mentor (74–75): greñas largas, barba de días, mejillas coloradas, chaqueta parda arrugada con la camisa
  // por fuera; la petaca en la mano (o.sinObjeto la quita)
  haymitchViejo: { ...B20, cab: CAB_GRENAS, cuerpo: CUERPO_ARRUGADO, ceja: hex('#3a2a20'), delante: conPetaca,
    pal: OLIVA({ H: '#5a4632', h: '#7a6248', u: '#9a7a5c', r: '#e07a6a', C: '#6a5a40', c: '#4e422e', W: '#d8ccb0', o: '#d8ccb0', F: '#3e3a34' }) },
  // Lenore Dove Baird: piel oscura, rizos negros con plumitas de colores, collar de cuentas y capas de colores del Covey
  lenore: { ...B20, cab: CAB_PLUMAS, cuerpo: CUERPO_COVEY, ceja: hex('#1c1424'), detras: plumitas,
    pal: OSCURA({ H: '#1c1424', h: '#3a3046', r: '#e8483a', R: '#f07a5a', y: '#f0c840', b: '#3a8ad8', u: '#2a9aa0', C: '#d8a030', d: '#a86a18', v: '#4a9a4a', V: '#7ac86a', p: '#8a4aa8', L: '#4a2e1a' }) },
  // Maysilee Donner: rubia, el pelo bien peinado con una coleta baja y pinza rosa, vestido rosa de comerciante con lazo
  maysilee: { ...B20, cuerpo: CUERPO_PLIEGUES, ceja: hex('#b8903c'), detras: coletas,
    pal: CLARA({ H: '#f0d070', h: '#f8e8a8', r: '#f07ab0', C: '#e88aa8', c: '#c0607e', W: '#f8f4ec', I: '#f8f4ec', L: '#2a2430' }) },
  // la madre y el hermano pequeño de Haymitch (Veta): ella con vestido gris y delantal; él, de camisa y pantalón corto
  madreHaymitch: { ...B20M, ceja: hex('#1c1424'), pal: OLIVA({ H: '#2a2028', h: '#4a3e4c', C: '#6e6a5c', c: '#545046', W: '#d8d0bc', L: '#3a2a20' }) },
  hermanoHaymitch: { ...B20N, cab: CAB_RIZOS, cuerpo: CUERPO_NINO, ceja: hex('#1c1424'), pal: OLIVA({ H: '#2a2028', h: '#4a3e4c', C: '#8a7a6a', c: '#6a5a4a', F: '#4a4038', n: '#2a2018' }) },
  // la vendedora del Quemador: mayor, pelo gris, mantón granate de punto sobre los hombros y delantal
  vendedoraHob: { ...B20M, ceja: hex('#8a8a9a'),
    cuerpo: parche(CUERPO_VESTIDO, [[4, 1, 'uuuuuuu'], [2, 2, 'u.uuuuuuu.u'], [2, 3, 'u..uuuuu..u'], [6, 4, 'UuU']]),
    pal: OLIVA({ H: '#a8a8b0', h: '#c8c8d0', u: '#8a2a3a', U: '#c85a6a', C: '#5a4a3a', c: '#3e3228', W: '#c8bca0', L: '#2a2018' }) },
  // tributos genéricos del 12: él con camisa clara de domingo; ella con vestido azul gastado (sin delantal)
  tributoChico: { ...B20, cuerpo: CUERPO_MANGA, ceja: hex('#1c1424'), pal: OLIVA({ H: '#3a2a20', h: '#5a4232', C: '#d8d2c2', c: '#b0a894', F: '#4a4a52', n: '#2a2018' }) },
  tributoChica: { ...B20M, cuerpo: VESTIDO_LISO, ceja: hex('#2a1c14'), pal: OLIVA({ H: '#3a2a20', h: '#5a4232', C: '#6a7a9a', c: '#4e5a78', W: '#d8d2c2', L: '#2a2018' }) },
  // ── Distrito 12, Juegos 74–75 ──
  // Katniss: trenza oscura de lado, chaqueta de cuero marrón de caza, camisa verde, el broche (punto de oro) y botas
  katniss: { ...B20, cuerpo: CUERPO_CAZADORA, ceja: hex('#1c1424'), delante: trenza,
    pal: OLIVA({ H: '#2a2028', h: '#4a3e4c', r: '#6a4a2a', C: '#7a4a2a', c: '#5a341c', W: '#3e5a3a', O: '#f0c040', F: '#5a5246', n: '#3a2618' }) },
  // Katniss con el arco en la mano (o.sinObjeto lo quita)
  katnissArco: { ...B20, cuerpo: CUERPO_CAZADORA, ceja: hex('#1c1424'), delante: varios(trenza, conArco),
    pal: OLIVA({ H: '#2a2028', h: '#4a3e4c', r: '#6a4a2a', C: '#7a4a2a', c: '#5a341c', W: '#3e5a3a', O: '#f0c040', F: '#5a5246', n: '#3a2618', B: '#c8843a', b: '#8a5424', x: '#e8e4dc' }) },
  // Prim: niña pequeña, rubia, con dos trencitas y vestido azul claro con cuello blanco
  prim: { ...B20N, cuerpo: CUERPO_NINA, ceja: hex('#b8903c'), ...trencitas,
    pal: CLARA({ H: '#f0d070', h: '#f8e8a8', r: '#7aa8e0', C: '#9ac0e8', c: '#7098c8', W: '#f8f4ec', L: '#4a3a5a' }) },
  // Peeta: rubio de pelo ondulado, fuerte, camisa lisa azul grisácea de manga larga, pantalón marrón
  peeta: { ...B20, cab: parche(CAB_CORTO, [[3, 1, 'h..h..h'], [2, 2, '..h..h..h']]), cuerpo: CUERPO_MANGA, ceja: hex('#b8903c'),
    pal: CLARA({ H: '#e8c060', h: '#f8dc90', C: '#7a90a8', c: '#5a7088', F: '#6a5040', n: '#3a2a20' }) },
  // Peeta panadero: el mismo con el delantal blanco enharinado
  peetaPanadero: { ...B20, cab: parche(CAB_CORTO, [[3, 1, 'h..h..h'], [2, 2, '..h..h..h']]), cuerpo: parche(CUERPO_MANDIL, [[6, 7, 'x'], [8, 8, 'x']]), ceja: hex('#b8903c'),
    pal: CLARA({ H: '#e8c060', h: '#f8dc90', C: '#7a90a8', c: '#5a7088', W: '#f8f4ec', o: '#5a7088', A: '#d8ccb4', x: '#e0d8c8', F: '#6a5040' }) },
  // Madge: rubia de pelo largo, vestido blanco y el broche de oro en el pecho
  madge: { ...B20M, cuerpo: parche(VESTIDO_LISO, [[9, 2, 'O']]), ceja: hex('#b8903c'),
    pal: CLARA({ H: '#f0d070', h: '#f8e8a8', C: '#f8f6f0', c: '#d0ccc4', W: '#ffffff', O: '#f0c040', L: '#8a7a6a' }) },
  // ── el Capitolio ──
  // el presidente Snow: pelo y barba blancos y cortos, traje oscuro elegante, corbata granate y la rosa blanca en la solapa
  snow: { ...B20, cab: CAB_BARBA, cuerpo: parche(CUERPO_EUROPEO, [[9, 1, 'XX'], [9, 2, 'Xv']]), ceja: hex('#c8c8d0'),
    pal: CLARA({ H: '#f2f0ec', h: '#c8c8d0', C: '#2a2834', W: '#f2f0ec', o: '#6a1e2a', F: '#2a2834', X: '#ffffff', v: '#3a7a3a' }) },
  // Snow a los 18 (Juegos 10): rubio engominado, uniforme granate de la Academia con hombreras y botones de oro
  snowJoven: { ...B20, cab: CAB_ENGOMINADO, cuerpo: parche(CUERPO_EUROPEO, [[3, 1, 'o.......o']]), ceja: hex('#b8903c'),
    pal: CLARA({ H: '#e8c870', h: '#f8e4a8', C: '#7a1e2e', c: '#5a1420', W: '#f2eee2', o: '#f0c040', F: '#2a2430' }) },
  // Lucy Gray Baird: pelo oscuro largo, vestido de volantes con los colores del arcoíris (la guitarra: PIEZAS_JH)
  lucyGray: { ...B20M, cuerpo: CUERPO_VOLANTES, ceja: hex('#2a1c14'),
    pal: CLARA({ H: '#3a2418', h: '#5a3a28', r: '#e8483a', R: '#f88a7a', q: '#f0902a', y: '#f0d040', v: '#4aa84a', u: '#3a7ad8', U: '#7aaaf0', p: '#8a4ab8', P: '#b07ad8', L: '#4a2e1a' }) },
  // Plutarch: pelo castaño y barba corta, traje burdeos con corbata dorada (para no confundirlo con Snow); la libreta
  plutarch: { ...B20, cab: CAB_BARBA, cuerpo: CUERPO_EUROPEO, ceja: hex('#4a2e1a'), delante: conLibreta,
    pal: CLARA({ H: '#6a4426', h: '#8a6040', C: '#7a2436', c: '#561826', W: '#e8e4dc', o: '#e8b830', F: '#561826' }) },
  // Effie joven: peluca rosa altísima con sombrerito verde, traje rosa chillón con blusa verde
  effie: { ...B20, tocado: 'pelucaRosa', cuerpo: CUERPO_SASTRE, ceja: hex('#c84a88'), mejillas: [[6, 8], [12, 8]],
    pal: CLARA({ H: '#f070b0', h: '#ff9ad0', P: '#f070b0', p: '#c84a88', V: '#4ac87a', s: '#f0a0a0', C: '#f070b0', c: '#c84a88', W: '#4ac87a', o: '#f0c040', I: '#3aa86a' }) },
  // Caesar Flickerman: tupé de color lila azulado, sonrisa enorme, traje azul noche que centellea y el micrófono
  caesar: { ...B20, tocado: 'tupe', cuerpo: CUERPO_EUROPEO, ceja: hex('#6a4ac8'), delante: varios(sonrisaCaesar, brillos, conMicro),
    pal: CLARA({ H: '#8a7ae8', h: '#c0b4ff', C: '#1e2466', c: '#141a4a', W: '#f2eee2', o: '#1e2466', F: '#1e2466' }) },
  // Drusilla, la escolta del 12 en los Juegos 50: peluca torre ciruela con oro, cuello rígido de oro, vestido morado
  // con el peto dorado, cejas severas; el abanico en la mano
  drusilla: { ...B20, tocado: 'torre', cuerpo: CUERPO_VESTIDO, ceja: hex('#3a1a4a'), detras: (c) => c.cuerpo.rej(CUELLO_RIGIDO, -1, -7), delante: varios(severa, conAbanico),
    pal: CLARA({ H: '#3a1a4a', h: '#5a2a6a', J: '#4a2a5a', j: '#6a4a7a', O: '#e8b830', g: '#a87a18', C: '#5a2a7a', c: '#3e1a5a', W: '#e0b040', L: '#2a1a3a', u: '#5a2a7a' }) },
  // un vigilante (Gamemaker): túnica morada larga con el ribete de oro
  vigilante: { ...B20, cuerpo: CUERPO_TUNICA_LARGA, ceja: hex('#1c1424'),
    pal: CLARA({ H: '#2a2028', h: '#4a3e4c', C: '#6a3a9a', c: '#4a2470', o: '#e8b830', G: '#e8b830', L: '#2a2430' }) },
  // un agente de la paz: uniforme blanco entero, casco blanco con la visera subida, guantes y botas negros
  agentePaz: { ...B20, tocado: 'cascoPaz', cuerpo: CUERPO_TACTICO, ceja: hex('#5a3a28'),
    pal: CLARA({ X: '#f6f4f0', x: '#c8c8d0', J: '#2a2e3a', C: '#f2f0ec', c: '#c8c8d0', o: '#c8c8d0', W: '#f2f0ec', G: '#2a2430', I: '#2a2430', F: '#e8e6e2', n: '#2a2430' }) },
  // gente del Capitolio: él con pinchos verdes, cejas magenta y traje naranja; ella con la bola turquesa y traje fucsia
  capitolino1: { ...B20, tocado: 'pinchos', cuerpo: CUERPO_EUROPEO, ceja: hex('#e83ab0'), delante: gemas('#e83ab0'),
    pal: CLARA({ H: '#4ac84a', V: '#5ad85a', v: '#2e9a2e', C: '#f08a2a', c: '#c0601a', W: '#f8e040', o: '#e83ab0', F: '#f08a2a' }) },
  capitolino2: { ...B20, tocado: 'pompon', cuerpo: CUERPO_SASTRE, ceja: hex('#2a9aa0'), delante: gemas('#f0c040'),
    pal: CLARA({ H: '#3ac8c0', Y: '#3ac8c0', y: '#9af0e8', C: '#d83ab0', c: '#a82a88', W: '#f0c040', o: '#f0c040', I: '#f0c040' }) },
  // un tributo profesional de un distrito rico: rubio engominado, pecho dorado brillante, brazos al aire, fuerte
  tributoCarrera: { ...B20, cab: CAB_ENGOMINADO, cuerpo: parche(CUERPO_HEROE, [[5, 1, 'y'], [5, 2, 'y'], [6, 3, 'y']]), ceja: hex('#b8903c'),
    pal: CLARA({ H: '#f0d070', h: '#f8ecb0', C: '#e8b830', c: '#a87a18', y: '#fff0a0', W: '#f6c290', G: '#f6c290', I: '#5a1e2a', F: '#5a1e2a', n: '#a87a18' }) },
  // ── vencedores de los Juegos 50 (veinticinco años más jóvenes que en «En llamas») ──
  // Beetee: gafas, pelo corto con entradas, chaqueta de técnico gris verdosa con bolsillos; el cable en la mano
  beetee: { ...B20, cab: CAB_ENTRADAS, tocado: 'gafasClaras', cuerpo: CUERPO_TACTICO, ceja: hex('#1c1424'), delante: conCable,
    pal: MORENA({ E: '#e8ecf4', S: '#a87050', s: '#7e5034', H: '#1c1424', h: '#3a3046', C: '#5a6a64', c: '#3e4a46', o: '#3e4a46', W: '#5a6a64', G: '#a87050', I: '#2a2430', F: '#3a3a44', n: '#2a2430' }) },
  // Wiress: delgada, moño con la aguja de tejer cruzada, vestido gris sencillo
  wiress: { ...B20, cuerpo: VESTIDO_LISO, ceja: hex('#4a3a2a'), delante: mono,
    pal: CLARA({ H: '#6a5038', h: '#8a6c50', C: '#8a8a96', c: '#6a6a76', W: '#b8b8c4', L: '#3a3a44' }) },
  // Mags (de mediana edad): pelo largo con vetas grises, jersey de pescadora verde azulado, cuerda de cinturón, botas
  mags: { ...B20, cab: CAB_VETAS, cuerpo: parche(CUERPO_MANGA, [[4, 6, 'IIIIIII']]), ceja: hex('#5a4a40'),
    pal: MORENA({ H: '#6a5448', h: '#8a7466', w: '#c8c4bc', C: '#3a7080', c: '#28505e', I: '#c8a868', F: '#8a7a5a', n: '#3a3028' }) },
  // ── el mundo real y la historia (sección final) ──
  // una mujer en el sofá (representa a la autora de forma genérica, sin parecido): pelo castaño largo, gafas, jersey
  // mostaza, vaqueros y zapatillas
  mujerSofa: { ...B20, cab: CAB_LARGO, tocado: 'gafas', cuerpo: CUERPO_MANGA, ceja: hex('#4a2e1a'),
    pal: CLARA({ H: '#6a4426', h: '#8a6040', C: '#d0a040', c: '#a87a28', F: '#3e5a8a', n: '#f2eee2' }) },
  // Teseo: joven griego de pelo rizado, quitón blanco ceñido y la espada corta
  teseo: { ...B20, cab: CAB_RIZOS, cuerpo: CUERPO_QUITON, ceja: hex('#3a2418'), delante: conEspada,
    pal: MORENA({ H: '#3a2418', h: '#5a3a28', T: '#f4eedc', t: '#c8bc9a', G: '#8a5a2a', L: '#6a4020' }) },
  // un emperador romano: toga blanca con la banda morada y corona de laurel
  emperador: { ...B20, cuerpo: CUERPO_TOGA, tocado: 'laurel', ceja: hex('#2a1c14'),
    pal: CLARA({ H: '#3a2a20', h: '#5a4232', T: '#f4eedc', t: '#c8bc9a', A: '#6a2a8a', V: '#5aa83a', v: '#3a7a24', L: '#6a4020' }) },
  // David Hume (siglo XVIII): peluca blanca empolvada con rulos y lazo, casaca marrón, chorrera blanca
  hume: { ...B20, cab: CAB_PELUCA, ceja: hex('#8a7a6a'), detras: lazo,
    pal: CLARA({ H: '#ecebe6', h: '#c4c0b8', J: '#2a2430', C: '#6a4a30', W: '#f2eee2', o: '#e8dcc0', F: '#3a2a20' }) },
  // un manifestante: sudadera verde, pañuelo rojo al cuello, vaqueros
  manifestante: { ...B20, cuerpo: parche(CUERPO_MANGA, [[5, 0, 'uuuuu'], [6, 1, 'uuu']]), ceja: hex('#1c1424'),
    pal: MORENA({ H: '#1c1424', h: '#3a3046', u: '#c8303a', C: '#3a6a3a', c: '#2a4e2a', F: '#3e5a8a', n: '#2a2430' }) },
  // un agente antidisturbios: casco oscuro con la visera transparente, uniforme negro azulado acolchado
  agenteCasco: { ...B20, tocado: 'antidisturbios', cuerpo: CUERPO_TACTICO, ceja: hex('#2a1c14'),
    pal: CLARA({ J: '#2a2e3a', j: '#4a5060', Z: '#a8b8c8', C: '#2a2e3a', c: '#1c1f28', o: '#3e4454', W: '#2a2e3a', G: '#1c1c24', I: '#1c1c24', F: '#2a2e3a', n: '#14141a' }) },
};
Object.assign(ELENCO_CHIBI, ELENCO_JH);
