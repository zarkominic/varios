// Uso: node herramientas/render-escenas.mjs <carpeta_linea> [--trabajadores 3] [--solo id1,id2] [--faltan]
// Renderiza un vídeo largo escena a escena: cada escena es una página de atomo/plato/escenas/
// (los marcadores comparten marcador.html) que dibuja el instante t de la escena con
// window.__frame(t). Antes de cargarla se le inyecta window.ESCENA con su duración, sus marcas,
// la energía de la voz y, en los marcadores, los veredictos. Los fotogramas salen numerados en
// <carpeta_linea>/fotos/ con la numeración global del vídeo (1920x1080, 30 fps).
// Si la página declara window.__paso (p. ej. 1/12 en stop-motion), los instantes se redondean a
// ese paso y los fotogramas repetidos se copian en vez de volver a dibujarse.
// Cada escena empieza en el fotograma donde acaba la anterior, para que no queden huecos al
// redondear. Con --faltan solo se dibujan los fotogramas que aún no existen.
// Los efectos de sonido que declara cada página (window.__efectos) se guardan, en tiempo global, en
// <carpeta_linea>/efectos.json, para herramientas/efectos.cjs. Con --efectos solo se recogen, sin dibujar.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const args = process.argv.slice(2);
const opcion = (n, d) => (args.includes(n) ? args[args.indexOf(n) + 1] : d);
const dirLinea = path.resolve(args[0]);
const linea = JSON.parse(fs.readFileSync(path.join(dirLinea, 'linea.json'), 'utf8'));
const W = Number(opcion('--trabajadores', 3));
const solo = opcion('--solo', null)?.split(',');
const faltan = args.includes('--faltan');
const soloEfectos = args.includes('--efectos');
const archEfectos = path.join(dirLinea, 'efectos.json');
const efectos = fs.existsSync(archEfectos) ? JSON.parse(fs.readFileSync(archEfectos, 'utf8')) : {};
const fotos = path.join(dirLinea, 'fotos');
fs.mkdirSync(fotos, { recursive: true });

const tipos = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css' };
const servidor = http.createServer((req, res) => {
  const f = path.join(raiz, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(raiz) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) return res.writeHead(404).end();
  res.writeHead(200, { 'Content-Type': tipos[path.extname(f)] ?? 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => servidor.listen(0, r));
const { chromium } = createRequire(execSync('npm root -g').toString().trim() + '/')('playwright');
const nav = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const three = path.join(raiz, 'atomo/node_modules/three');

const fps = linea.fps;
const veredictos = linea.escenas.filter((e) => e.veredicto).map((e) => e.veredicto);
// Fotogramas [f0, f1) de cada escena, contiguos: el f1 de una es el f0 de la siguiente.
linea.escenas.forEach((e, i, todas) => {
  e.f0 = Math.round(e.inicio * fps);
  e.f1 = i + 1 < todas.length ? Math.round(todas[i + 1].inicio * fps) : linea.fotogramas;
});
const cola = linea.escenas.filter((e) => !solo || solo.includes(e.id));
const nombre = (n) => path.join(fotos, `${String(n).padStart(5, '0')}.jpg`);
const t0 = Date.now();

async function renderizar(esc) {
  const pagina = esc.id.startsWith('marcador') ? 'marcador' : esc.id;
  const { f0, f1 } = esc;
  if (faltan && !soloEfectos && Array.from({ length: f1 - f0 }, (_, k) => f0 + k).every((n) => fs.existsSync(nombre(n)))) return;
  const ESCENA = {
    id: esc.id, duracion: esc.duracion, fps, marcas: esc.marcas, voz: esc.voz ?? null,
    cartela: esc.cartela ?? null, frases: esc.frases ?? null,
    energia: linea.energia.slice(f0, f1), n: esc.n ?? null, veredicto: esc.veredicto ?? null,
    resultados: veredictos,
  };
  const pag = await nav.newPage({ viewport: { width: 1920, height: 1080 } });
  pag.on('pageerror', (e) => console.log(`[${esc.id}] ERROR:`, e.message));
  await pag.route('https://cdn.jsdelivr.net/npm/three@0.170.0/**', (ruta) => {
    const f = path.join(three, new URL(ruta.request().url()).pathname.replace('/npm/three@0.170.0/', ''));
    if (!fs.existsSync(f)) return ruta.fulfill({ status: 404 });
    ruta.fulfill({ status: 200, contentType: 'text/javascript', body: fs.readFileSync(f) });
  });
  await pag.addInitScript((e) => { window.ESCENA = e; }, ESCENA);
  // Sin esperar a «load»: con varias escenas pesadas cargando a la vez (WebGL, fuentes) puede tardar
  // más de 30 s; lo que cuenta es window.__listo.
  await pag.goto(`http://localhost:${servidor.address().port}/atomo/plato/escenas/${pagina}.html?captura`, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await pag.waitForFunction(() => window.__listo === true && typeof window.__frame === 'function', null, { timeout: 180000 });
  efectos[esc.id] = (await pag.evaluate(() => window.__efectos ?? [])).map(([t, nombre, o]) => [+(esc.inicio + t).toFixed(3), nombre, o ?? {}]);
  if (soloEfectos) {
    await pag.close();
    console.log(`${esc.id}: ${efectos[esc.id].length} efectos`);
    return;
  }
  const paso = await pag.evaluate(() => window.__paso ?? 0);
  let previo = null, dibujados = 0;
  for (let n = f0; n < f1; n++) {
    let t = (n - f0) / fps;
    if (paso > 0) t = Math.floor(t / paso + 1e-6) * paso;
    if (faltan && fs.existsSync(nombre(n))) {
      previo = { t, archivo: nombre(n) };
      continue;
    }
    if (previo && previo.t === t) {
      fs.copyFileSync(previo.archivo, nombre(n));
    } else {
      await pag.evaluate((t) => window.__frame(t), t);
      await pag.screenshot({ path: nombre(n), type: 'jpeg', quality: 92 });
      dibujados++;
    }
    previo = { t, archivo: nombre(n) };
  }
  await pag.close();
  console.log(`${esc.id}: ${f1 - f0} fotogramas (${dibujados} dibujados) · ${((Date.now() - t0) / 60000).toFixed(1)} min`);
}

const pendientes = cola.slice();
await Promise.all(Array.from({ length: W }, async () => {
  while (pendientes.length) await renderizar(pendientes.shift());
}));
fs.writeFileSync(archEfectos, JSON.stringify(efectos, null, 1));
console.log(`Hecho en ${((Date.now() - t0) / 60000).toFixed(1)} min`);
await nav.close();
servidor.close();
