// Registro de las formas nuevas. Cada módulo exporta `forma(i, t, p, c, ts)` y `camara`.
import * as tierra_ecuador from './tierra_ecuador.js';
import * as luna_letras from './luna_letras.js';
import * as globo_observadores from './globo_observadores.js';
import * as luna_mentirosa from './luna_mentirosa.js';
import * as lavabo from './lavabo.js';
import * as remolino from './remolino.js';
import * as ecuador_truco from './ecuador_truco.js';
import * as tanque from './tanque.js';
import * as huracanes from './huracanes.js';
import * as luna_doc from './luna_doc.js';
import * as veredicto from './veredicto.js';

const MODULOS = { tierra_ecuador, luna_letras, globo_observadores, luna_mentirosa, lavabo, remolino, ecuador_truco, tanque, huracanes, luna_doc, veredicto };

export const NUEVAS = Object.fromEntries(Object.entries(MODULOS).map(([k, m]) => [k, m.forma]));
export const CAMARAS_NUEVAS = Object.fromEntries(Object.entries(MODULOS).map(([k, m]) => [k, m.camara]));
