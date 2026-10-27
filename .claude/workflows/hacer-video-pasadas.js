export const meta = {
  name: 'hacer-video-pasadas',
  description: 'Pasadas de calidad de un episodio de ASK Atom al nivel del 11 final: decorados, movimiento o calidad (revisión, escéptico y pulido hasta que nada desentone)',
  whenToUse: 'Desde la skill hacer-video, pasos 7–9. args.paso = decorados | movimiento | calidad. No se lanza a mano sin la skill.',
  phases: [
    { title: 'Decorados', detail: 'un agente por grupo de funciones, cada uno sobre su copia _tmp_<G>' },
    { title: 'Movimiento', detail: 'un agente por grupo de escenas; editan solo sus .html' },
    { title: 'Revisar', detail: 'revisor y escéptico por lote, con las hojas de revisión y la referencia del 11' },
    { title: 'Pulir', detail: 'un agente por escena con fallos (y uno para el archivo de decorados), luego se revisa de nuevo' },
  ],
}

// ── args ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Comunes: { paso, ep: 'ep12', pref: 'xx', carpeta: '12-tema', tema: 'nombre corto del episodio', sc: '<scratchpad>' }
// decorados:  grupos: [{ g: 'A', fns: ['farmacia', …], indicaciones: '…', dependencias: '…' }]   (4–7 funciones por grupo)
// movimiento: grupos: [{ k: 0, ids: ['xx-gancho', …], indicaciones: '…' }]                         (2–5 escenas por grupo)
// calidad:    lotes: [['xx-gancho', 'xx-vuelta', …], …], rondas: 3                                    (4–6 escenas por lote)
//             fallos: [{ escena, plano, nota, fallos: […], origen: 'escena' | 'decorado', funcion, encargo }] (opcional: tu
//             propia revisión; se pule eso primero y luego se revisa lo pulido, sin la primera revisión)
// Orden del 11: movimiento → decorados (con las dependencias y los fallos que vio movimiento) → integrar → calidad.
// Con 4 núcleos cada workflow ejecuta 2 agentes a la vez: movimiento y decorados se lanzan en 3 workflows a la vez (con
// grupos distintos). Calidad va sola, cuando todo está integrado.

const A = args || {}
const { paso, ep, pref, carpeta, tema, sc } = A
if (!paso || !ep || !pref || !carpeta || !sc) throw new Error('faltan args: paso, ep, pref, carpeta, sc (y tema)')
const EP = `el episodio ${ep}${tema ? ` (${tema})` : ''}`
const esId = (x) => typeof x === 'string' && x.startsWith(pref + '-')
if (paso === 'decorados' && !(Array.isArray(A.grupos) && A.grupos.length && A.grupos.every((G) => G && G.g && Array.isArray(G.fns) && G.fns.length) && new Set(A.grupos.map((G) => G.g)).size === A.grupos.length))
  throw new Error('decorados: grupos = [{ g: letra única, fns: [funciones…], indicaciones?, dependencias? }]')
if (paso === 'movimiento' && !(Array.isArray(A.grupos) && A.grupos.length && A.grupos.every((G) => (Array.isArray(G) ? G : G && G.ids || []).length && (Array.isArray(G) ? G : G.ids).every(esId))))
  throw new Error(`movimiento: grupos = [[ids ${pref}-…] | { ids: […], indicaciones? }]`)
if (paso === 'calidad' && !(Array.isArray(A.lotes) && A.lotes.length && A.lotes.every((l) => Array.isArray(l) && l.length && l.every(esId))))
  throw new Error(`calidad: lotes = [[ids ${pref}-…], …] que cubran todas las escenas`)
if (paso === 'calidad' && A.fallos && !(Array.isArray(A.fallos) && A.fallos.every((f) => f && esId(f.escena) && f.plano != null && Array.isArray(f.fallos) && f.encargo)))
  throw new Error('calidad: fallos = [{ escena, plano, nota, fallos: […], origen, funcion?, encargo }]')

const CONTEXTO = `Trabajas en el repositorio de la serie (tu directorio de trabajo es su raíz): la serie de vídeos «ASK Atom» (pixel art en un lienzo de 320×180, escenas en atomo/plato/escenas/<id>.html que importan «* as T» de ${pref}-comun.js; el guion del episodio está en episodios/${carpeta}/guion.json, campo «en» = la voz inglesa, que manda; escenas.json tiene el guion visual).

EL NIVEL ESTÁ ESCRITO EN PIEDRA: lee episodios/NIVEL-RESUMEN.md (una página; ESTANDAR.md y GUIA-ESTILO.md solo si dudas de algo concreto). El usuario lo dijo así: «todo excelente; pero sobre todo el detalle de las escenas y movimiento», y «no por ahorrar tiempo bajarlo por ninguna circunstancia». Rechazó una primera versión del 11 por «escenas muy simples, sin detalles, con paredes vacías, cielos sin detalle». LA REFERENCIA es el episodio 11 final: mira con Read episodios/referencia-ep11-1.jpg y referencia-ep11-2.jpg (15 planos a 640×360) antes de empezar, y si necesitas un modelo de código, lee SOLO la función o la escena del 11 que te sirva (grep -n en th-comun.js y sed -n de ese trozo: farmacia, laboratorio, tribunal, consejo, prision, cine, stanford), nunca el archivo entero. Ninguna imagen que mires con Read debe pasar de 2000 px de lado: si pasa, Read la reduce y juzgarías los planos en miniatura.`

const REGLAS = `REGLAS QUE NO SE PUEDEN ROMPER:
- Sin palabras ni letras en pantalla: solo números y símbolos (R.numero, R.icono). Carteles, logos y periódicos se insinúan con barras, pictogramas o trazos.
- Personajes pequeños (sprite chibi de ~25 px: R.actor; R.busto para el público), sin primeros planos de cuerpos ni de caras. Si sale una mano, es la canónica de 14 px: mano(R, x, y, dir, manga) en ${pref}-comun.js, T.mano en las escenas. Nada de manos o dedos grandes.
- La zona de Atom (x 278–318, y 4–44) y la barra del año (x 20–170, y 0–14) quedan como fondo tranquilo, sin nada importante. El pelo nunca tapa la cara.
- Los coches y las multitudes van POR DELANTE de la gente (se dibujan después). Se camina solo con propósito.
- Orden de dibujo: quien pasa por detrás de un mueble (sillas, mesa, mostrador) queda tapado por él; lo que se ve por una ventana o una puerta (coches, gente, pájaros) se recorta a su hueco (R.recorte), también en cada escena que reutiliza el decorado.
- Un plano nuevo es una composición nueva: un cambio de cámara o de un detalle sobre el mismo dibujo no cuenta como plano.
- Todo plano pinta los 320×180 píxeles en cada fotograma (si no, quedan restos de fotogramas anteriores). Nada de paredes lisas, suelos lisos ni cielos de franjas planas: textura, sombreado con luz y sombra, brillos, profundidad (fondo, medio, primer plano) y vida animada con t.
- Tono: los protagonistas reales no se ridiculizan; los gags van con máquinas y objetos. Nada morboso.
- Rendimiento: no más de ~3 recorridos píxel a píxel de toda la pantalla por fotograma.
- Paleta C y hex('#rrggbb') como el resto del código; comentarios en español, como el código de alrededor.
- No hagas commits. No toques archivos fuera de los que te tocan.`

const HERRAMIENTAS = (propia) => `HERRAMIENTAS (desde la raíz del repositorio):
- Hoja de revisión de una o varias escenas (una fila por plano: inicio, centro y final, a 640×360 con etiqueta; dice si la página dio errores): node atomo/herramientas/medir-planos.mjs ${ep} <id> [<id> …] --hoja <carpeta>. Un id puede llevar carpeta (_tmp_A/${pref}-lab) para abrir una copia. Mira cada hoja con Read.
- Duración de cada plano («!» más de 7,2 s, «<» menos de 3,5 s): node atomo/herramientas/medir-planos.mjs ${ep} <ids>. Con --centros da el centro de cada plano.
- Fundidos rotos (negro o restos en la mitad del fundido entre dos planos; la hoja no los ve): node atomo/herramientas/medir-planos.mjs ${ep} <ids> --fundidos.
- Capturas sueltas a 1920×1080 (SOLO para un detalle concreto o un instante intermedio que la hoja no deja juzgar; para todo lo demás, las hojas): node estilos/herramientas/capturar.mjs atomo/plato/escenas/<archivo>.html t1,t2,… --salida <carpeta> --formato 16:9 (dice «sin errores en la página»).
- Sintaxis de un .js: cópialo a ${propia}/chk.mjs (tu carpeta: otros agentes usan la suya) y node --check.
- En las hojas, «cartela» es la cartela de año del principio y «plano N» es la entrada N de T.rodar.`

const SALIDA_ESCENAS = {
  type: 'object',
  properties: {
    escenas: { type: 'array', items: { type: 'string' } },
    resumen: { type: 'string' },
    capturas: { type: 'array', items: { type: 'string' } },
    avisos: { type: 'string' },
  },
  required: ['escenas', 'resumen', 'capturas', 'avisos'],
}

// ── decorados ─────────────────────────────────────────────────────────────────────────────────────────────────────────
if (paso === 'decorados') {
  const grupos = A.grupos || []
  phase('Decorados')
  const SALIDA = {
    type: 'object',
    properties: {
      cambiadas: { type: 'array', items: { type: 'string' } },
      capturas: { type: 'array', items: { type: 'string' } },
      notas: { type: 'string' },
      geometria: { type: 'string' },
    },
    required: ['cambiadas', 'capturas', 'notas', 'geometria'],
  }
  const prompt = (G) => {
    const g = G.g, dir = `atomo/plato/escenas/_tmp_${g}`
    return `Eres un artista de pixel art y programador. ${CONTEXTO}

TU ENCARGO: subir AL NIVEL DEL 11 FINAL estos decorados de ${EP}: ${G.fns.join(', ')}. Están en atomo/plato/escenas/${pref}-comun.js.
${G.indicaciones ? `\nINDICACIONES PARA TU GRUPO: ${G.indicaciones}\n` : ''}${G.dependencias ? `\nDEPENDENCIAS QUE YA SE CONOCEN (no las rompas): ${G.dependencias}\n` : ''}
CÓMO TRABAJAR (solo puedes escribir en ${dir}/ y en ${sc}/det_${g}/):
1. Crea ${dir}/ y copia ahí ${pref}-comun.js dos veces: como ${pref}-comun.js (tu copia de trabajo) y como ${pref}-comun.base.js (intacta: el integrador la usa para saber qué has cambiado tú). Si ya existen de un intento anterior (te interrumpieron), NO las borres: lee tu copia, mira sus capturas en ${sc}/det_${g}/ y sigue desde ahí. Los imports son absolutos (/atomo/…), así que la copia funciona igual.
2. Copia a ${dir}/ las escenas que usan tus funciones (grep -l "T\\.<función>(" atomo/plato/escenas/${pref}-*.html, para cada función) y las que las usan a través de otro decorado (busca quién llama a tu función dentro de ${pref}-comun.js con grep -nE "(^|[^.A-Za-z_])<función>\\(" y repite el grep de T\\.<quien la llama>( hasta que no salgan más). Si ya existe ${pref}-miniatura.html, cópiala también: importa las funciones por su nombre y el grep no la encuentra; captúrala en t = 1 antes y después, y no debe perder nada. En cada copia cambia el import '/atomo/plato/escenas/${pref}-comun.js' por '/${dir}/${pref}-comun.js'. No cambies el id que pasan a T.preparar().
3. DEPENDENCIAS: lee esas escenas y apunta qué usan de tus decorados (dónde ponen personajes y objetos, líneas de suelo, rectángulos que tapan o repintan, colores que buscan, opciones que pasan). Eso no se mueve.
4. ANTES: hojas de revisión de tus escenas copiadas (ids _tmp_${g}/<id>) en ${sc}/det_${g}/antes. Míralas junto a la referencia.
5. Reescribe tus funciones en TU copia. Hoja «despues» en ${sc}/det_${g}/despues/<n> y compárala lado a lado con la referencia. Itera hasta que cada plano tenga detalle de superficie (texturas, vetas, juntas, zócalos, sombras, brillos, objetos), profundidad y vida de fondo animada con t (gente pequeña al fondo, luces que parpadean, pantallas que cambian, vapor, viento, nubes a distinta velocidad, pájaros, reflejos). Mira también instantes intermedios (capturar.mjs) para ver que la animación se mueve y que los personajes de las escenas se siguen viendo bien delante. Comprueba que pintas toda la pantalla llenándola antes con un color centinela.
6. Antes de la hoja final, vuelve a copiar las escenas (paso 2): otra pasada puede haberlas cambiado mientras trabajabas. La hoja final debe decir «sin errores en la página» en todas.

${REGLAS}
- La firma y las opciones (o.*) de cada función se mantienen con el mismo significado; puedes añadir opciones nuevas, siempre opcionales.
- No toques funciones que no son de tu lista (por ejemplo cielo(), que es de todos): si necesitas otra cosa, haz una auxiliar nueva con el prefijo ${g.toLowerCase()}_ (sin exportar), con su comentario // encima. Cada función lleva una cabecera // que dice qué se ve y qué hacen sus opciones.
- Un fondo fijo que se pinta una vez y se copia en cada fotograma se guarda en un búfer de R.nuevo() con const prev = R.usar(b); …; R.usar(prev) (nunca R.usar() sin nada: eso vuelve a la pantalla y rompe los fundidos entre planos).

${HERRAMIENTAS(`${sc}/det_${g}`)}

ENTREGA (salida estructurada, CORTA: listas y frases breves, sin redacción; cada campo de texto en menos de ~1.500 caracteres salvo las posiciones de las que dependen las escenas): cambiadas (las funciones de tu lista que has cambiado), capturas (las rutas de las hojas «despues» finales), notas (qué cambiaste en cada función) y geometria (cualquier posición de la que dependan las escenas que haya cambiado, o «ninguna»). El integrador toma el código de tu copia ${dir}/${pref}-comun.js: déjala terminada y con la sintaxis comprobada.`
  }
  const res = await parallel(grupos.map((G) => () =>
    agent(prompt(G), { label: `decorados ${G.g}: ${G.fns.slice(0, 3).join(', ')}${G.fns.length > 3 ? '…' : ''}`, phase: 'Decorados', schema: SALIDA })
      .then((r) => r && { g: G.g, fns: G.fns, ...r })))
  const ok = res.filter(Boolean)
  const faltan = grupos.filter((G) => !ok.some((r) => r.g === G.g)).map((G) => G.g)
  log(`${ok.length}/${grupos.length} grupos entregados${faltan.length ? `; FALTAN ${faltan.join(', ')} (relanza solo esos: su copia sigue en _tmp_)` : ''}`)
  const integrar = 'python3 atomo/herramientas/integrar-decorados.py atomo/plato/escenas/' + pref + '-comun.js ' +
    ok.map((r) => `--copia atomo/plato/escenas/_tmp_${r.g}/${pref}-comun.js ${r.fns.join(',')}`).join(' ')
  return { paso, entregados: ok, faltan, integrar }
}

// ── movimiento ────────────────────────────────────────────────────────────────────────────────────────────────────────
if (paso === 'movimiento') {
  const grupos = (A.grupos || []).map((G, k) => (Array.isArray(G) ? { k, ids: G } : { k, ...G }))
  phase('Movimiento')
  const prompt = (G) => `Eres animador de pixel art y programador. ${CONTEXTO}

TU ENCARGO: que estas escenas de ${EP} tengan MOVIMIENTO RICO Y CON PROPÓSITO y vida en cada plano, al nivel del 11 final: ${G.ids.join(', ')} (archivos atomo/plato/escenas/<id>.html). Lo que más le importa al usuario es «el detalle de las escenas y movimiento». Mira cómo se mueven los personajes y los extras en th-gancho, th-consejo, th-lab, th-juicio y th-periodista.
${G.indicaciones ? `\nINDICACIONES: ${G.indicaciones}\n` : ''}
OJO: otros agentes mejoran los decorados (${pref}-comun.js) a la vez o después. Tú NO toques ${pref}-comun.js ni ningún archivo que no sea de tu lista. Si necesitas un objeto nuevo, dibújalo con una función local dentro del <script> de la escena. Las líneas de suelo de los decorados no van a cambiar.
- Si dibujas un FONDO entero dentro de la escena (una sala, un pasillo), tiene que estar al nivel de los decorados del 11 (textura, sombreado, profundidad, vida), porque la pasada de decorados no lo va a tocar. Apúntalo en avisos como «fondo local: <id> plano n».
- Si tapas desde la escena un fallo de un decorado, márcalo en el código con // PARCHE DECORADO: <función> <fallo> y dilo en avisos (cuando se arregle el decorado, el parche se quita).

CADA PLANO (cada entrada [inicio, función] de T.rodar) TIENE QUE TENER:
- Una acción con propósito de los personajes que cuente lo que dice la voz en ese momento: entrar, sentarse, coger algo, señalar, hablar con otro, reaccionar (sorpresa, enfado, sonrisa), irse. Empieza y termina dentro del plano. Nadie está tieso todo el plano: los que esperan respiran (sin quieto) o hacen gestos (habla, dedo).
- Vida de fondo: extras pequeños del reparto ELENCO_CHIBI que pasan o trabajan; objetos que se mueven (puertas, papeles, tubos en una cinta, coches que pasan por delante, pantallas).
- Sincronía: lo importante cae cuando la voz inglesa lo dice, con en('marca', fracción) (la fracción sale de las letras de la frase; el texto está en guion.json, campo «en»). Cada acción con sonido lleva su efecto [tiempo, 'receta'] en la lista efectos, SOLO con recetas que existen en atomo/herramientas/efectos.cjs (objeto NIVEL; ojo: «gluglu» es el pavo, para líquidos usa «burbujas»; th-gancho, th-lab y th-periodista lo usan mal para líquidos, no lo copies). Densidad como en el 11: discreta, no un ruido continuo.
- Planos de 4–7 s. No cambies los inicios de plano salvo que haga falta; si los cambias, mídelos.

${REGLAS}
- Actualiza el comentario de cabecera de cada escena con lo que pasa en cada plano.

${HERRAMIENTAS(`${sc}/mov_${G.ids[0]}`)}

MÉTODO:
1. Lee tus escenas y el texto de sus frases. Hoja ANTES: ${sc}/mov_${G.ids[0]}/antes.
2. Edita las escenas.
3. Hoja DESPUÉS: ${sc}/mov_${G.ids[0]}/despues/<n>. Itera hasta que en cada plano la acción avance entre el inicio, el centro y el final, con vida de fondo, al nivel de la referencia, y que la hoja diga «sin errores en la página».

ENTREGA (salida estructurada, CORTA: listas y frases breves, sin redacción; cada campo de texto en menos de ~1.500 caracteres salvo las posiciones de las que dependen las escenas): escenas (los ids que has cambiado), resumen (una línea por plano: qué pasa), capturas (las hojas «despues» finales) y avisos (inicios de plano cambiados, efectos nuevos, LAS POSICIONES DE LOS DECORADOS DE LAS QUE DEPENDEN TUS ESCENAS y cualquier fallo de decorado que hayas visto).`
  const res = await parallel(grupos.map((G) => () =>
    agent(prompt(G), { label: `movimiento: ${G.ids.join(', ')}`, phase: 'Movimiento', schema: SALIDA_ESCENAS })
      .then((r) => r && { grupo: G.k, ids: G.ids, ...r })))
  const ok = res.filter(Boolean)
  const faltan = grupos.filter((G) => !ok.some((r) => r.grupo === G.k)).map((G) => G.ids.join(','))
  log(`${ok.length}/${grupos.length} grupos de escenas entregados${faltan.length ? `; FALTAN: ${faltan.join(' | ')}` : ''}`)
  return { paso, entregados: ok, faltan }
}

// ── calidad: revisar → escéptico → pulir → revisar lo pulido, hasta que nada desentone ──────────────────────────────────
if (paso === 'calidad') {
  const lotes = A.lotes
  const rondas = Math.max(0, Math.floor(Number(A.rondas ?? 3)) || 0)
  const ids = new Set(lotes.flat())
  // el nombre de escena que devuelven los agentes, como id: sin ruta, sin .html y sin el -N de la hoja
  const norm = (e) => { const x = String(e || '').replace(/^.*\//, '').replace(/\.(html|jpg)$/, ''); return ids.has(x) ? x : ids.has(x.replace(/-\d+$/, '')) ? x.replace(/-\d+$/, '') : x }
  const VEREDICTO = {
    type: 'object',
    properties: {
      planos: { type: 'array', items: { type: 'object', properties: {
        escena: { type: 'string' }, plano: { type: 'number' }, nota: { type: 'number' },
        fallos: { type: 'array', items: { type: 'string' } },
        origen: { type: 'string', enum: ['escena', 'decorado'] }, funcion: { type: 'string' },
        encargo: { type: 'string' },
      }, required: ['escena', 'plano', 'nota', 'fallos', 'origen', 'encargo'] } },
      hojas: { type: 'array', items: { type: 'string' } },
      errores_pagina: { type: 'string' },
    },
    required: ['planos', 'hojas', 'errores_pagina'],
  }
  const RUBRICA = `CÓMO SE PUNTÚA CADA PLANO (compara siempre con la referencia del 11, con planos del mismo tipo: interior con interior, exterior con exterior, inserto de objetos con inserto, mapa con mapa, pizarra con pizarra):
- 5: al nivel de los mejores planos de la referencia.
- 4: al nivel del 11 final. Detalle de superficie en todo el cuadro, profundidad, vida de fondo animada, y una acción con propósito que avanza entre el inicio y el final y cuenta lo que dice la voz.
- 3: por debajo. Zonas grandes lisas o vacías (pared, suelo, cielo o mueble sin textura), poca profundidad, plano casi estático (entre inicio y final solo cambian detalles mínimos), o una acción que no cuenta la voz.
- 2 o 1: muy por debajo, o roto.
Cualquier regla rota es un FALLO aunque la nota sea alta: letras o palabras; manos no canónicas o grandes; primeros planos; algo importante en la zona de Atom o en la barra del año; pelo que tapa la cara; coches o multitudes detrás de la gente; restos de fotogramas anteriores o zonas sin pintar (en los fundidos lo dice --fundidos); errores en la página; objetos flotando, cortados o mal colocados; personajes tapados por el decorado o pintados encima de lo que tienen delante; lo de fuera que cruza por dentro de un local; un plano que repite la composición del anterior; gags que ridiculizan a una persona real.
Un plano pasa si tiene nota 4 o 5 y no rompe ninguna regla.`
  const revisar = (ids, i, r) => `Eres el revisor de calidad de ${EP}. ${CONTEXTO}

TU LOTE: ${ids.join(', ')}.

1. Mira con Read episodios/referencia-ep11-1.jpg y referencia-ep11-2.jpg.
2. Genera las hojas: node atomo/herramientas/medir-planos.mjs ${ep} ${ids.join(' ')} --hoja ${sc}/cal_r${r}_${i} (una escena con más de 5 planos sale en varias imágenes: <id>-1.jpg, <id>-2.jpg). Apunta si alguna escena da errores. Comprueba también los fundidos: node atomo/herramientas/medir-planos.mjs ${ep} ${ids.join(' ')} --fundidos. Cada fundido roto es un FALLO del plano que empieza en ese corte (origen «decorado» si el negro sale de un decorado de ${pref}-comun.js).
3. Mira cada hoja con Read, plano por plano (fila = plano; columnas = inicio, centro, final). Para entender qué tiene que contar cada plano, lee el comentario de cabecera de la escena, su guion visual en episodios/${carpeta}/escenas.json y el texto inglés de sus frases en guion.json. Si una miniatura no te deja juzgar un detalle (manos, letras, pelo, una zona), haz una captura a 1920×1080 de ese instante con capturar.mjs en ${sc}/cal_r${r}_${i}/zoom.
4. Puntúa TODOS los planos.

${RUBRICA}

${REGLAS}

Sé exigente: el usuario no quiere tener que señalar lo que tú dejaste pasar. Pero no suspendas un plano por gusto: cada fallo tiene que ser concreto y visible.

ENTREGA (salida estructurada, CORTA: listas y frases breves, sin redacción; cada campo de texto en menos de ~1.500 caracteres salvo las posiciones de las que dependen las escenas): planos (todos; escena = el id tal cual, sin ruta ni «.html»; plano = el número de la hoja, la cartela no se puntúa; origen «decorado» si el fallo está en una función de ${pref}-comun.js, con su nombre en funcion; encargo: qué hay que hacer, concreto, para que pase), hojas (rutas) y errores_pagina (o «ninguno»). No edites ningún archivo.`
  const esceptico = (ids, i, r, v) => `Eres el ESCÉPTICO de la revisión de calidad de ${EP}. ${CONTEXTO}

Otro revisor ya ha puntuado estas escenas: ${ids.join(', ')}. Sus hojas están en ${sc}/cal_r${r}_${i}/ (míralas con Read, junto a episodios/referencia-ep11-1.jpg y -2.jpg). Su veredicto:
${JSON.stringify(v.planos.map((p) => ({ escena: p.escena, plano: p.plano, nota: p.nota, fallos: p.fallos })))}

Tu trabajo: encontrar lo que se le ha escapado. Repasa en especial los planos que ha aprobado (nota 4 o 5 sin fallos). ¿Hay alguno por debajo de la referencia o que rompe una regla? Busca zonas lisas, planos estáticos, letras, manos, pelo sobre la cara, la zona de Atom, coches detrás de la gente, restos de fotogramas y objetos mal colocados. Si una miniatura no basta, haz capturas a 1920×1080 con capturar.mjs en ${sc}/cal_r${r}_${i}/esceptico. Si dudas de un plano, suspéndelo con el fallo concreto que ves.

${RUBRICA}

${REGLAS}

ENTREGA (salida estructurada, CORTA: listas y frases breves, sin redacción; cada campo de texto en menos de ~1.500 caracteres salvo las posiciones de las que dependen las escenas): planos = SOLO los planos que suspendes y el revisor aprobó (lista vacía si no hay ninguno), con el mismo formato; hojas = las que has mirado; errores_pagina = «ninguno» o lo que hayas visto. No edites ningún archivo.`
  const pulir = (tarea, r, j) => `Eres un artista de pixel art y animador. ${CONTEXTO}

La revisión de calidad de ${EP} ha suspendido estos planos. Tu encargo es subirlos al nivel de la referencia:
${tarea.fallos.map((p) => `- ${p.escena}, plano ${p.plano} (nota ${p.nota}): ${p.fallos.join('; ')}${p.fallos.length ? '. ' : ''}Qué hacer: ${p.encargo}`).join('\n')}

${tarea.decorado
    ? `Estos fallos están en los decorados: edita SOLO estas funciones de atomo/plato/escenas/${pref}-comun.js: ${[...new Set(tarea.fallos.map((p) => p.funcion).filter(Boolean))].join(', ') || '(las que tengan el fallo)'}. Mantén sus firmas, opciones y las posiciones de las que dependen las escenas (léelas: grep -l "T\\.<función>(" atomo/plato/escenas/${pref}-*.html, y también las de los decorados que llaman a esa función dentro de ${pref}-comun.js). Al terminar, comprueba la sintaxis de ${pref}-comun.js y que todas esas escenas dicen «sin errores en la página». Trabajas solo: hasta que termines nadie más edita ni captura. No toques las escenas .html.`
    : `Edita SOLO atomo/plato/escenas/${tarea.escena}.html, y solo los planos suspendidos: los demás planos y los tiempos de corte se quedan igual. No toques ${pref}-comun.js (si el fallo es del decorado, dibuja encima desde la escena o dilo en avisos).`}
Mantén la sincronía con la voz (en('marca', fracción)) y los efectos (solo recetas de NIVEL en atomo/herramientas/efectos.cjs). Actualiza el comentario de cabecera.

${REGLAS}

${HERRAMIENTAS(`${sc}/pul_r${r}_${j}`)}

MÉTODO: hoja ANTES en ${sc}/pul_r${r}_${j}/antes; edita; hoja DESPUÉS en ${sc}/pul_r${r}_${j}/despues/<n>; compara lado a lado con la referencia. Itera hasta que cada plano tuyo pase la rúbrica (nota 4 o más, ninguna regla rota) y la hoja diga «sin errores en la página».

${RUBRICA}

ENTREGA (salida estructurada, CORTA: listas y frases breves, sin redacción; cada campo de texto en menos de ~1.500 caracteres salvo las posiciones de las que dependen las escenas): escenas (las que has cambiado; si has tocado decorados, TODAS las escenas que usan esas funciones, para revisarlas otra vez), resumen (qué se ve ahora en cada plano), capturas (hojas finales) y avisos.`

  const suspensos = (planos) => planos.filter((p) => p.nota < 4 || p.fallos.length)
  let pendientes = lotes.map((l) => [...l])
  const historial = []
  let quedan = []
  let dados = A.fallos && A.fallos.length ? A.fallos : null   // tu propia revisión: se pule primero, sin revisar antes
  let todosLuego = false   // tras pulir la revisión propia, la primera revisión independiente cubre todos los lotes
  for (let r = 0; r <= rondas; r++) {
    let fallos
    if (dados) {
      fallos = dados.map((p) => ({ ...p, escena: norm(p.escena) }))
      dados = null
      todosLuego = true
      historial.push({ ronda: r, planos: 0, suspensos: fallos.map((p) => `${p.escena} p${p.plano} (${p.nota}): ${p.fallos.join('; ') || p.encargo}`), errores: [], dados: true })
      log(`ronda ${r}: ${fallos.length} planos suspendidos por la revisión propia`)
    } else {
      phase('Revisar')
      const revisa = (lista, intento) => pipeline(
        lista,
        (l, _, i) => agent(revisar(l, intento ? `${i}b` : i, r), { label: `revisar r${r}${intento ? ' (otra vez)' : ''}: ${l.join(', ')}`, phase: 'Revisar', schema: VEREDICTO }),
        (v, l, i) => (v ? agent(esceptico(l, intento ? `${i}b` : i, r, v), { label: `escéptico r${r}${intento ? ' (otra vez)' : ''}: ${l.join(', ')}`, phase: 'Revisar', schema: VEREDICTO })
          .then((e) => ({ ids: l, v, e })) : { ids: l, v: null, e: null }),
      )
      let revisiones = await revisa(pendientes, false)
      // un revisor o un escéptico caído no aprueba nada: se repite una vez y, si vuelve a caer, sus escenas quedan pendientes
      const caidos = pendientes.filter((_, i) => !revisiones[i] || !revisiones[i].v || !revisiones[i].e)
      if (caidos.length) {
        log(`AVISO: revisión caída en ${caidos.map((l) => l.join(',')).join(' | ')}; se repite`)
        const otra = await revisa(caidos, true)
        revisiones = revisiones.filter((x) => x && x.v && x.e).concat(otra)
      }
      const buenas = revisiones.filter((x) => x && x.v && x.e)
      const sinRevisar = pendientes.filter((l) => !buenas.some((x) => x.ids === l || x.ids.join() === l.join())).flat()
      if (sinRevisar.length) log(`AVISO: sin revisar después de dos intentos: ${sinRevisar.join(', ')}`)
      const todos = buenas.flatMap((x) => x.v.planos)
      const errores = buenas.flatMap((x) => [x.v.errores_pagina, x.e.errores_pagina]).filter((t) => t && !/^ninguno/i.test(t.trim()))
      fallos = [
        ...buenas.flatMap((x) => [...suspensos(x.v.planos), ...x.e.planos]),
        ...errores.map((t) => ({ escena: [...ids].find((e) => t.includes(e)) || pendientes[0][0], plano: 0, nota: 1, fallos: ['error en la página: ' + t], origen: 'escena', encargo: 'quitar el error de la página' })),
      ].map((p) => ({ ...p, escena: norm(p.escena) }))
      // las escenas que nadie pudo revisar no se dan por buenas
      fallos.push(...sinRevisar.map((e) => ({ escena: e, plano: 0, nota: 0, fallos: ['sin revisar: el revisor o el escéptico cayó dos veces'], origen: 'escena', encargo: 'revisar a mano', sinRevisar: true })))
      historial.push({ ronda: r, planos: todos.length, suspensos: fallos.map((p) => `${p.escena} p${p.plano} (${p.nota}): ${p.fallos.join('; ') || p.encargo}`), errores, sinRevisar })
      log(`ronda ${r}: ${todos.length} planos revisados, ${fallos.length} suspendidos${errores.length ? `, errores de página: ${errores.length}` : ''}`)
    }
    quedan = fallos
    if (!fallos.length || r === rondas) break

    // primero, solo, el agente del archivo de decorados (si no, los demás capturarían un archivo a medio editar);
    // luego un agente por escena, a la vez (cada uno edita solo su .html)
    phase('Pulir')
    const porEscena = {}
    for (const p of fallos.filter((p) => p.origen !== 'decorado' && !p.sinRevisar)) (porEscena[p.escena] ||= []).push(p)
    const tareas = Object.entries(porEscena).map(([escena, fs]) => ({ escena, fallos: fs }))
    const deco = fallos.filter((p) => p.origen === 'decorado')
    const pulidos = []
    if (deco.length) {
      const t = { escena: `${pref}-comun.js`, decorado: true, fallos: deco }
      const hecho = await agent(pulir(t, r, 'deco'), { label: `pulir r${r}: ${pref}-comun.js`, phase: 'Pulir', schema: SALIDA_ESCENAS })
      if (!hecho) {   // ${pref}-comun.js puede haber quedado a medio editar: no se pule nada encima
        log(`AVISO: el pulido de ${pref}-comun.js no entregó; comprueba su sintaxis (node --check) antes de seguir`)
        quedan = fallos
        historial[historial.length - 1].decoCaido = true
        break
      }
      pulidos.push(hecho)
      tareas.unshift(t)
    }
    pulidos.push(...await parallel(tareas.filter((t) => !t.decorado).map((t, j) => () =>
      agent(pulir(t, r, j), { label: `pulir r${r}: ${t.escena}`, phase: 'Pulir', schema: SALIDA_ESCENAS }))))
    const tocadas = new Set(pulidos.filter(Boolean).flatMap((p) => p.escenas.map(norm)))
    tareas.forEach((t, j) => {
      if (!pulidos[j]) log(`AVISO: el pulido de ${t.escena} no entregó`)
      t.fallos.forEach((p) => tocadas.add(p.escena))
    })
    fallos.filter((p) => p.sinRevisar).forEach((p) => tocadas.add(p.escena))   // se vuelven a intentar revisar
    const lista = [...tocadas].filter((e) => e.startsWith(pref + '-') && !e.endsWith('.js') && !e.endsWith('-miniatura'))
    pendientes = []
    if (todosLuego) {   // todas las escenas de los lotes, más las pulidas que no estuvieran en ninguno
      todosLuego = false
      const enLotes = new Set(lotes.flat())
      pendientes = lotes.map((l) => [...l])
      const sueltas = lista.filter((e) => !enLotes.has(e))
      for (let k = 0; k < sueltas.length; k += 5) pendientes.push(sueltas.slice(k, k + 5))
    } else for (let k = 0; k < lista.length; k += 5) pendientes.push(lista.slice(k, k + 5))
    historial[historial.length - 1].pulido = pulidos.filter(Boolean).map((p) => ({ escenas: p.escenas, resumen: p.resumen, avisos: p.avisos }))
  }
  if (quedan.length) log(`QUEDAN ${quedan.length} planos sin pasar después de ${rondas} rondas: díselo al usuario, no se entrega en silencio`)
  return { paso, aprobado: !quedan.length, quedan, historial }
}

throw new Error(`paso desconocido: ${paso} (decorados | movimiento | calidad)`)
