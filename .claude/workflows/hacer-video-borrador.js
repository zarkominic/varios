export const meta = {
  name: 'hacer-video-borrador',
  description: 'Primera versión de los decorados de un episodio de ASK Atom, un agente por grupo sobre su copia _tmp_<G>, al nivel del 11 final',
  whenToUse: 'Desde la skill hacer-video, paso 5, con <pref>-comun.js ya escrito con las cabeceras de encargo y esqueletos.',
  phases: [
    { title: 'Decorados', detail: 'un agente por grupo de funciones de <pref>-comun.js, cada uno en su copia _tmp_<G>' },
  ],
}

// args: { ep: 'ep13', pref: 'fa', carpeta: '13-tema', tema: 'nombre del episodio', elenco: 'ELENCO_FA: a, b, c…',
//         escena: 'fa-gancho' (una escena para T.preparar en la página de prueba), sc, grupos: [{ g, fns, indicaciones }] }
const A = args || {}
const grupos = A.grupos || []
const { sc, ep, pref, carpeta, tema, elenco } = A
if (!sc || !ep || !pref || !carpeta || !grupos.length) throw new Error('args: { ep, pref, carpeta, tema, elenco, escena, sc, grupos: [{ g, fns, indicaciones }] }')
const ESCENA = A.escena || `${pref}-gancho`

const CONTEXTO = `Trabajas en el repositorio de la serie (tu directorio de trabajo es su raíz): la serie de vídeos «ASK Atom» (pixel art en un lienzo de 320×180; escenas en atomo/plato/escenas/<id>.html que importan «* as T» de ${pref}-comun.js). Es el ${ep}, «${tema}», para público de EE. UU. El guion está en episodios/${carpeta}/guion.md (lee la narración y la tabla de decorados) y el guion visual por frase en episodios/${carpeta}/escenas.json.

EL NIVEL ESTÁ ESCRITO EN PIEDRA: lee episodios/NIVEL-RESUMEN.md (una página, con «Los siete fallos que más suspendieron en el 12»: evítalos desde ya; ESTANDAR.md y GUIA-ESTILO.md solo si dudas de algo concreto). El usuario: «todo excelente; pero sobre todo el detalle de las escenas y movimiento», y «no por ahorrar tiempo bajarlo por ninguna circunstancia». Rechazó una primera versión del 11 por «escenas muy simples, sin detalles, con paredes vacías, cielos sin detalle». LA REFERENCIA es el episodio 11 final: mira con Read episodios/referencia-ep11-1.jpg y referencia-ep11-2.jpg (15 planos a 640×360) ANTES de empezar. Su código está en atomo/plato/escenas/th-comun.js (farmacia, laboratorio, tribunal, consejo, prision, cine, stanford, pajar, sede…), el del 12 en hu-comun.js (aerodromo, galveston, llanuras, labFujita, centroHuracanes…) y el del 10 en ov-comun.js: lee SOLO las funciones que te sirvan de modelo (grep -n y sed -n del trozo), nunca los archivos enteros, y reutiliza sus técnicas (cielos tramados con nubes de tres tonos a varias velocidades, búferes R.nuevo() para lo fijo, texturas con la función de ruido h(x, y, k), sombreado con luz y sombra, vida animada con t). Ninguna imagen que mires con Read debe pasar de 2000 px de lado.

GASTA POCO SIN MIRAR MENOS: cada turno reenvía todo lo que ya has leído, imágenes incluidas. Lanza a la vez las órdenes y lecturas que no dependen unas de otras, no vuelvas a abrir una imagen que ya has mirado y lee el código por trozos.`

const REGLAS = `REGLAS QUE NO SE PUEDEN ROMPER:
- Sin palabras ni letras en pantalla: solo números y símbolos (R.numero, R.icono). Carteles, logos y periódicos se insinúan con barras, pictogramas o trazos.
- Personajes pequeños (sprite chibi de ~25 px: R.actor(EL.<nombre>, x, ySuelo, t, { dir, anda, habla, sonrisa, sorpresa, dedo, brazos, quieto }); EL = ELENCO_CHIBI de /atomo/plato/kits/pixel-chibi.js; el elenco del episodio es ${elenco}). Sin primeros planos de cuerpos ni de caras; si sale una mano, es la canónica de 14 px: T.mano(R, x, y, dir, manga). Los decorados NO dibujan a los protagonistas: eso lo hace la escena. Sí pueden llevar gente pequeña de fondo (figuras de 6–12 px, mecánicos, paseantes) como vida.
- La zona de Atom (x 278–318, y 4–44) y la barra del año (x 20–170, y 0–14) quedan como fondo tranquilo: nada importante ni muy contrastado ahí.
- Lo que se ve por una ventana o una puerta (coches, gente, pájaros) se recorta a su hueco (R.recorte). Quien pasa por detrás de un mueble queda tapado por él.
- Cada función pinta los 320×180 píxeles en cada fotograma. Nada de paredes lisas, suelos lisos ni cielos de franjas planas: textura (vetas, juntas, tramas), sombreado con luz y sombra, brillos y reflejos, objetos y accesorios reales del lugar y la época, profundidad en tres términos (fondo, medio, primer plano) y vida animada con t (gente pequeña que trabaja o pasa, luces que parpadean, pantallas que cambian, vapor, viento en la hierba y las banderas, nubes a distintas velocidades, pájaros, agua que se mueve).
- Un fondo fijo que se pinta una vez y se copia en cada fotograma va en un búfer de R.nuevo() con const prev = R.usar(b); …; R.usar(prev) (nunca R.usar() sin nada: rompe los fundidos entre planos). Mira cómo lo hace th-comun.js.
- Tono: nada morboso. Los gags van con máquinas, animales y objetos; las personas reales se tratan con respeto.
- Sin letras ni marcas reales: ningún logotipo ni escudo de una liga o de un equipo real; los equipos de hoy son inventados.
- Rendimiento: no más de ~3 recorridos píxel a píxel de toda la pantalla por fotograma (cada fotograma debe dibujarse en menos de ~150 ms).
- Paleta T.C y hex('#rrggbb') como el resto del código; comentarios en español, como el código de alrededor, y cada función con su cabecera // que dice qué se ve y qué hacen sus opciones.
- No hagas commits. No toques archivos fuera de tu carpeta.`

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
  const g = G.g, dir = `atomo/plato/escenas/_tmp_${g}`, det = `${sc}/det_${g}`
  return `Eres un artista de pixel art y programador. ${CONTEXTO}

TU ENCARGO: la primera versión, ya al nivel del 11 final, de estos decorados del ${ep}: ${G.fns.join(', ')}. Hoy en atomo/plato/escenas/${pref}-comun.js solo hay un esqueleto de cada una (un relleno provisional) con su cabecera //: la cabecera es el encargo (lo que se ve y las opciones o.*). Respeta la firma y las opciones de la cabecera; puedes añadir opciones nuevas, siempre opcionales, y debes poner al día la cabecera con lo que de verdad hace la función.
${G.indicaciones ? `\nINDICACIONES PARA TU GRUPO: ${G.indicaciones}\n` : ''}
CÓMO TRABAJAR (solo puedes escribir en ${dir}/ y en ${det}/):
1. Crea ${dir}/ y copia ahí atomo/plato/escenas/${pref}-comun.js dos veces: como ${pref}-comun.js (tu copia de trabajo) y como ${pref}-comun.base.js (intacta: el integrador la usa para saber qué has cambiado tú). Si ya existen de un intento anterior (te interrumpieron), NO las borres: sigue desde ahí. Los imports son absolutos (/atomo/…), así que la copia funciona igual.
2. Escribe una página de prueba ${dir}/${pref}-prueba-${g.toLowerCase()}.html copiando la estructura de atomo/plato/escenas/th-hola.html, pero importando '/${dir}/${pref}-comun.js' y con const { E, R, M } = await T.preparar('${ESCENA}'). Que tenga un plano de 5 s por cada encuadre y variante importante de tus funciones (T.rodar(E, R, [[0, p1], [5, p2], …], { año: … })), y en cada plano los personajes del elenco que irán ahí (R.actor) donde los pondrán las escenas, para comprobar que se leen bien delante del decorado y que hay sitio para la acción.
3. Captura con: node estilos/herramientas/capturar.mjs ${dir}/${pref}-prueba-${g.toLowerCase()}.html t1,t2,… --salida ${det}/<n> --formato 16:9 (debe decir «sin errores en la página»). Mira sobre todo la tira (a un tercio), junto a las dos imágenes de referencia del 11; una captura a 1920×1080 solo para un detalle concreto. Mira también dos instantes seguidos (t y t + 0,5) para ver que la animación se mueve.
4. Itera hasta que cada plano aguante la comparación lado a lado con la referencia: detalle de superficie, sombreado, profundidad y vida animada. No te quedes en la primera versión que «funciona».
5. Comprueba la sintaxis: copia tu ${pref}-comun.js a ${det}/chk.mjs y node --check ${det}/chk.mjs.

${REGLAS}
- No toques funciones que no son de tu lista (por ejemplo cielo(), mapa(), preparar()…). Si necesitas piezas propias, haz auxiliares nuevas con el prefijo ${g.toLowerCase()}_ (sin exportar, o exportadas si las escenas las van a necesitar, por ejemplo una pieza que va por delante de los personajes), cada una con su comentario // encima, y ponlas justo debajo de tu función.
- No añadas imports nuevos: lo que haga falta de th-comun.js u ov-comun.js, cópialo como auxiliar ${g.toLowerCase()}_.

ENTREGA (salida estructurada, CORTA: listas y frases breves; cada campo en menos de ~1.500 caracteres salvo geometria): cambiadas (las funciones de tu lista que has escrito), capturas (las rutas de tus capturas finales), notas (qué tiene cada función y cada opción) y geometria: TODO lo que las escenas necesitan saber para poner a los personajes y la acción encima, con coordenadas: la línea de suelo de cada encuadre (y donde se plantan los pies), dónde están las puertas, ventanas, mesas, los objetos principales, las pantallas, el sol, el horizonte, qué zonas quedan libres para los personajes, y qué piezas exportadas van por delante de los personajes. El integrador toma el código de tu copia ${dir}/${pref}-comun.js: déjala terminada y con la sintaxis comprobada.`
}

phase('Decorados')
const res = await parallel(grupos.map((G) => () =>
  agent(prompt(G), { label: `decorados ${G.g}: ${G.fns.slice(0, 3).join(', ')}${G.fns.length > 3 ? '…' : ''}`, phase: 'Decorados', schema: SALIDA })
    .then((r) => r && { g: G.g, fns: G.fns, ...r })))
const ok = res.filter(Boolean)
const faltan = grupos.filter((G) => !ok.some((r) => r.g === G.g)).map((G) => G.g)
log(`${ok.length}/${grupos.length} grupos entregados${faltan.length ? `; FALTAN ${faltan.join(', ')}` : ''}`)
const integrar = `python3 atomo/herramientas/integrar-decorados.py atomo/plato/escenas/${pref}-comun.js ` +
  ok.map((r) => `--copia atomo/plato/escenas/_tmp_${r.g}/${pref}-comun.js ${r.fns.join(',')}`).join(' ')
return { entregados: ok, faltan, integrar }
