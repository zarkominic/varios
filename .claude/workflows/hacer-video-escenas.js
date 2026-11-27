export const meta = {
  name: 'hacer-video-escenas',
  description: 'Primer borrador de las escenas de un episodio de ASK Atom, ya con el movimiento de la pasada: un agente por grupo escribe su módulo de borrador, lo genera en su carpeta _tmp_S<k> y lo revisa con las hojas',
  whenToUse: 'Desde la skill hacer-video, paso 6, con los decorados integrados y la voz real. Desde el 13 sustituye a «borrador + pasada de movimiento» (probado en el 13 y aprobado).',
  phases: [
    { title: 'Escenas', detail: 'un agente por grupo de escenas; cada uno escribe su módulo borrador-escenas/<archivo>.py' },
  ],
}

// args: { ep: 'ep13', pref: 'fa', carpeta: '13-tema', tema, elenco: 'ELENCO_FA: a, b…', geo: '<carpeta con las notas de
//         geometría de los decorados, <letra>.md>', sc, grupos: [{ k, ids: [...], archivo: 'escenas1.py', indicaciones }] }
const A = args || {}
const grupos = A.grupos || []
const { sc, ep, pref, carpeta, tema, elenco, geo } = A
if (!sc || !ep || !pref || !carpeta || !geo || !grupos.length) throw new Error('args: { ep, pref, carpeta, tema, elenco, geo, sc, grupos: [{ k, ids, archivo, indicaciones }] }')

const ENCUADRES = `${sc}/encuadres-${ep}.md`
const CONTEXTO = `Trabajas en el repositorio de la serie (tu directorio de trabajo es su raíz): la serie de vídeos «ASK Atom» (pixel art en un lienzo de 320×180; escenas en atomo/plato/escenas/<id>.html que importan «* as T» de ${pref}-comun.js). Es el ${ep}, «${tema}», para público de EE. UU.

EL NIVEL ESTÁ ESCRITO EN PIEDRA: lee episodios/NIVEL-RESUMEN.md (una página, con «Los siete fallos que más suspendieron en el 12»: no los cometas). El usuario: «todo excelente; pero sobre todo el detalle de las escenas y movimiento», y «no por ahorrar tiempo bajarlo por ninguna circunstancia». LA REFERENCIA es el episodio 11 final: mira con Read episodios/referencia-ep11-1.jpg y referencia-ep11-2.jpg (15 planos a 640×360) ANTES de empezar, y lee una escena del 11 para ver cómo se escriben (atomo/plato/escenas/th-gancho.html) y su borrador (episodios/11-theranos/borrador-escenas/escenas1.py, solo la primera escena). Mira cómo se mueven los personajes en th-gancho y th-consejo (grep y sed del trozo, no enteras). Ninguna imagen que mires con Read debe pasar de 2000 px de lado.

GASTA POCO SIN MIRAR MENOS: cada turno reenvía todo lo que ya has leído, imágenes incluidas (una hoja de 1920×1800 son unos 4.600 tokens que se pagan otra vez en cada turno siguiente). Lanza a la vez las órdenes y lecturas que no dependen unas de otras (la hoja y los fundidos en una sola orden con &&), no vuelvas a abrir una imagen que ya has mirado, saca solo los planos que has cambiado (--planos N) para repasar, y lee el código por trozos (grep -n y sed -n).

LO QUE TIENES DEL EPISODIO:
- La voz inglesa manda: episodios/${carpeta}/guion.json (campo «en» de cada frase; «visual» es el guion visual de cada frase) y escenas.json. La narración entera y los gags, en episodios/${carpeta}/guion.md.
- Las marcas reales de la voz: atomo/plato/escenas/marcas-${ep}.json (duración de cada escena, y cada marca con su «_fin»). Dentro de una escena, en('marca', f) es el instante a la fracción f de esa frase (0 = empieza, 1 = acaba).
- Los tiempos de cada palabra: atomo/build/largo/${ep}/linea.json, en palabras.en (cada una {p, i, f, escena}; i y f son tiempos GLOBALES: réstales el «inicio» de su escena, en linea.json → escenas[k].inicio). Úsalos para que cada plano corte en la palabra que toca y cada acción caiga cuando la voz inglesa la dice; en el código escribe el instante como en('marca', fracción).
- Los decorados: atomo/plato/escenas/${pref}-comun.js. Cada función lleva su cabecera // con lo que pinta y sus opciones o.* (léela con grep -n "export function <nombre>" y sed del trozo de comentario de encima). Las notas de geometría de sus autores (dónde está el suelo, las puertas, las mesas, qué zonas quedan libres, qué piezas van delante de los personajes, qué devuelve cada función) están en ${geo}/<letra>.md. Léelas antes de componer.
- El reparto: ${elenco}, en atomo/plato/kits/pixel-chibi.js, más los de episodios anteriores. R.actor(EL.x, x, ySuelo, t, { dir, anda, habla, sonrisa, sorpresa, enfado, triste, dedo, brazos, salto, quieto }). Mira en pixel-chibi.js las opciones que acepta de verdad.
- El mapa: T.mapa(R, t, { zona, desde, u }) devuelve la proyección P([lon, lat]) → [x, y]; T.LUGARES tiene los sitios; T.chincheta (mira su firma en ov-mapas.js) y R.ruta para las trayectorias.
- Los efectos de sonido: en las opciones de T.rodar, efectos: [[t, 'receta'], …], SOLO con recetas que existen en el objeto NIVEL de atomo/herramientas/efectos.cjs (míralo con grep). «gluglu» es el pavo; para líquidos va «burbujas». PRESUPUESTO: como mucho un efecto por segundo de escena y pocos rellenos (pop, brillo, whoosh): en el 12 hubo 595 en 532 s y sonaban el 75 % del tiempo. Cada efecto, con su acción en pantalla.`

const REGLAS = `REGLAS DE LAS ESCENAS:
- Un plano nuevo cada 4–7 s, cada uno con su propia composición (otro decorado, otro encuadre u otro inserto de objeto); un cambio de cámara sobre el mismo dibujo no cuenta, ni repetir el encuadre de un plano de la escena de antes o de después. Corta en la palabra que toca.
- Cartela de año en las escenas que la tienen en escenas.json (opción cartela: 'AAAA' de T.rodar) y la barra del año (opción año, puede ser una función del tiempo) que dice la verdad en cada plano.
- Los gags del guion (guion.md, sección Gags) en su escena: cortos (1–3 s), con objetos y animales, nunca contra personas reales.
- Sin palabras ni letras en pantalla: solo números y símbolos (R.numero, R.icono: '?', '!', 'X'…). Personajes pequeños, sin primeros planos; si sale un brazo, el canónico T.brazo(R, x0, y0, x1, y1, manga, dir, { codo: [x, y] }) (hombro → muñeca, con la mano de 14 px al final; mira su cabecera en ov-comun.js); la mano sola, T.mano(R, x, y, dir, manga, { sinManga: true }). Un personaje que sostiene algo: R.actor(EL.x, x, suelo, t, { sostiene: true | [x, y] }) y pinta el objeto en la .mano que devuelve. No escribas un brazo propio (NIVEL-RESUMEN.md, fallo 1). La zona de Atom (x 278–318, y 4–44) y la barra del año (x 20–170, y 0–14) quedan como fondo tranquilo.
- Lo que pasa por detrás de un mueble queda tapado por él; lo que se ve por una ventana, un mapa o una pantalla se recorta a su hueco (R.recorte con linea/pset/poligono/disco: R.rect no lo respeta). Los coches y las multitudes van por delante de la gente.
- Sin marcas reales: ni logotipos ni escudos de una liga o de un equipo de hoy (los equipos de hoy son los inventados del reparto).
- Nada morboso.
- Todo plano pinta los 320×180 píxeles en cada fotograma (el decorado lo hace; si haces un inserto propio, píntalo entero y con detalle, sobre su decorado o una mesa con cosas).
- No cambies ${pref}-comun.js (otros agentes trabajan a la vez): si te falta una pieza pequeña, dibújala en la escena. Si un decorado tiene un fallo, apúntalo en avisos («FALLO DECORADO: <función> <encuadre>: …»).
- No hagas commits.
- ENCUADRES: antes de componer cada plano, mira ${ENCUADRES} (lo escriben a la vez todos los agentes) y apunta el tuyo con una línea al final: echo "<id> p<n>: <función> '<encuadre>' (<qué se ve>)" >> ${ENCUADRES}. Ningún plano repite el decorado y encuadre de otro plano de su escena ni de la escena de antes o de después, y el mismo encuadre no sale más de dos veces en el episodio (en el 13, 13 fallos de composición repetida venían de que cada grupo no veía a los demás).`

// el encargo de la pasada de movimiento, desde el borrador (probado en el 13: la pasada aparte bajó de 4,6 M a 0,2 M)
const MOVIMIENTO = `CADA PLANO (cada entrada [inicio, función] de T.rodar) TIENE QUE TENER, YA EN ESTE BORRADOR, LO QUE PEDÍA LA PASADA DE MOVIMIENTO:
- Una acción con propósito de los personajes que cuente lo que dice la voz en ese momento: entrar, sentarse, coger algo, señalar, hablar con otro, reaccionar (sorpresa, enfado, sonrisa), lanzar, atrapar, irse. Empieza y termina dentro del plano. Nadie está tieso todo el plano: los que esperan respiran (sin quieto) o hacen gestos (habla, dedo).
- Vida de fondo: extras pequeños que pasan o trabajan; objetos que se mueven (puertas, papeles, banderas, coches que pasan por delante, pantallas, el balón).
- Sincronía: lo importante cae cuando la voz inglesa lo dice, con en('marca', fracción). Cada acción con sonido lleva su efecto, dentro del presupuesto.
- Planos de 4–7 s.
- El detalle del decorado más los objetos que pongas: nada de zonas casi lisas (NIVEL-RESUMEN.md, fallo 3).`

const SALIDA = {
  type: 'object',
  properties: {
    escenas: { type: 'array', items: { type: 'string' } },
    resumen: { type: 'string' },
    capturas: { type: 'array', items: { type: 'string' } },
    avisos: { type: 'string' },
  },
  required: ['escenas', 'resumen', 'capturas', 'avisos'],
}

const prompt = (G) => {
  const dir = `atomo/plato/escenas/_tmp_S${G.k}`, det = `${sc}/esc_S${G.k}`, tmp = G.ids.map((i) => `_tmp_S${G.k}/${i}`).join(' ')
  return `Eres director de animación, artista de pixel art y programador. ${CONTEXTO}

TU ENCARGO: el primer borrador, ya con el nivel del 11 final Y CON EL MOVIMIENTO HECHO (no habrá una pasada de movimiento detrás salvo para lo que no aguante), de estas escenas del ${ep}: ${G.ids.join(', ')}. Mira en escenas.json qué frases lleva cada una y su guion visual, y en guion.md la narración entera, para que tus escenas cuenten la historia y enlacen con las de antes y después.
${G.indicaciones ? `\nINDICACIONES PARA TU GRUPO: ${G.indicaciones}\n` : ''}
CÓMO TRABAJAR (solo puedes escribir en episodios/${carpeta}/borrador-escenas/${G.archivo}, en ${dir}/ y en ${det}/):
0. Si tu módulo episodios/${carpeta}/borrador-escenas/${G.archivo} o tu carpeta ${dir}/ ya existen de un intento anterior (te interrumpieron: un reinicio del contenedor mata a los agentes), NO los borres: léelos, mira las hojas que haya en ${det}/ y sigue desde ahí hasta terminar; en el registro de encuadres puede haber ya líneas tuyas: no las repitas.
1. Escribe tu módulo episodios/${carpeta}/borrador-escenas/${G.archivo} con el formato del 11: E = {} y E['${pref}-…'] = (título, comentario de cabecera // que dice qué pasa en cada plano, cuerpo). El cuerpo tiene a mano T, EL (ELENCO_CHIBI), E, R, M, tramo, lerp, hex y en(k, f), y acaba con T.rodar(E, R, [[0, p1], [en('x', .4), p2], …], { efectos, cartela, año }). Lee atomo/herramientas/generar-escenas.py (por trozos).
2. Genera tus escenas en tu carpeta: python3 atomo/herramientas/generar-escenas.py ${pref} ${ep} episodios/${carpeta}/borrador-escenas/${G.archivo} --destino ${dir} --pisar
3. Mide y revisa EN UNA SOLA ORDEN: node atomo/herramientas/medir-planos.mjs ${ep} ${tmp} && node atomo/herramientas/medir-planos.mjs ${ep} ${tmp} --fundidos && node atomo/herramientas/medir-planos.mjs ${ep} ${tmp} --hoja ${det}/<n> («!» más de 7,2 s; «<» menos de 3,5 s; ningún fundido ROTO; la hoja tiene que decir «sin errores en la página»). Mira las hojas con Read junto a la referencia del 11. Para repasar un plano cambiado, añade --planos N. Para un instante concreto: node estilos/herramientas/capturar.mjs ${dir}/<id>.html t1,t2 --salida ${det}/cap --formato 16:9.
4. Itera hasta que cada plano aguante la comparación con la referencia: composición, detalle, vida de fondo y una acción con propósito sincronizada con la voz, y repasa plano a plano los siete fallos de NIVEL-RESUMEN.md. No te quedes en la primera versión que «funciona».

${MOVIMIENTO}

ANTES DE ENTREGAR, haz de revisor de la pasada de calidad, con su mismo listón: en el 13 suspendió 47 de los 102 planos del borrador (algo que no se lee 21, quieto 15, composición repetida 13, zonas casi lisas 13, brazos 11, orden de dibujo 6, letras 4), y cada plano suspendido cuesta luego una ronda de revisor, escéptico y pulido. Mira tus hojas finales plano a plano con los ocho fallos de NIVEL-RESUMEN.md delante y arregla lo que veas, sobre todo: ¿lo que cuenta la frase se lee a 640 px sin buscarlo? ¿se mueve algo con propósito del principio al final? ¿el encuadre es distinto de los que ya hay en ${ENCUADRES}?
Comprueba también que ningún instante da error (las hojas solo miran inicio, centro y final; en el 13 un error a mitad de plano rompió el render): cd atomo && node herramientas/render-escenas.mjs build/largo/${ep} --barrer --carpeta _tmp_S${G.k} --solo ${G.ids.join(',')} (tiene que decir «barrido sin errores»).

${REGLAS}

ENTREGA (salida estructurada, CORTA: listas y frases breves; cada campo en menos de ~1.500 caracteres salvo avisos): escenas (los ids hechos), resumen (por escena: los planos, qué pasa en cada uno y en qué palabra corta), capturas (las rutas de tus hojas finales) y avisos (FALLO DECORADO con función y encuadre, piezas que echaste de menos, «fondo local: <id> plano n» si pintaste un fondo entero en la escena, y las posiciones de los decorados de las que dependen tus escenas). El módulo ${G.archivo} es lo que se entrega: déjalo terminado.`
}

phase('Escenas')
const res = await parallel(grupos.map((G) => () =>
  agent(prompt(G), { label: `escenas S${G.k}: ${G.ids.join(', ')}`, phase: 'Escenas', schema: SALIDA })
    .then((r) => r && { k: G.k, archivo: G.archivo, ids: G.ids, ...r })))
const ok = res.filter(Boolean)
const faltan = grupos.filter((G) => !ok.some((r) => r.k === G.k)).map((G) => G.k)
log(`${ok.length}/${grupos.length} grupos entregados${faltan.length ? `; FALTAN ${faltan.join(', ')}` : ''}`)
return { entregados: ok, faltan }
