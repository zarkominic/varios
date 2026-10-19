// Uso: node herramientas/foto-forma.mjs <nombre> <ts1,ts2,...> [--idioma es|en]
// Compila la forma src/formas/<nombre>.js en un banco de pruebas aislado y
// guarda una captura (540x960) por cada instante ts (segundos desde el inicio de su escena)
// en build/fotos/<nombre>-<ts>.png. Las bandas marcadas tapan rótulo (arriba) y subtítulos (abajo).
import { buildSync } from 'esbuild';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const argumentos = process.argv.slice(2);
const pos = argumentos.indexOf('--idioma');
const idioma = pos >= 0 ? argumentos.splice(pos, 2)[1] : 'es';
const [nombre, tsArg = '0,3,6'] = argumentos;
if (!nombre) {
  console.error('Uso: node herramientas/foto-forma.mjs <nombre> <ts1,ts2,...>');
  process.exit(1);
}
const build = path.join(raiz, 'build');
fs.mkdirSync(path.join(build, 'fotos'), { recursive: true });
const entrada = path.join(build, `entrada-${nombre}.jsx`);
// Marcas (instantes de las palabras clave) de la escena que usa esta forma en el vídeo de ese idioma.
let marcas = null;
const lineaPath = path.join(raiz, 'build/video', idioma, 'linea.json');
if (fs.existsSync(lineaPath)) {
  const esc = JSON.parse(fs.readFileSync(lineaPath)).escenas.find((e) => e.forma === nombre);
  if (esc) marcas = esc.marcas;
}
if (marcas) console.log(`marcas (${idioma}):`, Object.fromEntries(Object.entries(marcas).filter(([k]) => !k.endsWith('_fin'))));
fs.writeFileSync(entrada, `import { arrancarPrueba } from '../src/prueba.jsx';\nimport { rig } from '../src/estado.js';\nimport * as m from '../src/formas/${nombre}.js';\nrig.marcas = ${JSON.stringify(marcas)};\nrig.idioma = ${JSON.stringify(idioma)};\narrancarPrueba(${JSON.stringify(nombre)}, m);\n`);
buildSync({
  entryPoints: [entrada],
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  outfile: path.join(build, `prueba-${nombre}.js`),
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'error',
});
fs.writeFileSync(path.join(build, `prueba-${nombre}.html`), `<!doctype html><meta charset="utf-8"><style>
html,body{margin:0;height:100%;background:#05081a;overflow:hidden}
#lienzo{position:absolute;inset:0}
.banda{position:absolute;left:0;right:0;border:2px dashed rgba(255,80,80,.7);background:rgba(255,60,60,.08);color:#ff9a9a;font:600 14px sans-serif;padding:4px 8px;box-sizing:border-box}
</style><div id="lienzo"></div>
<div class="banda" style="top:0;height:14%">zona del rótulo (no poner nada importante)</div>
<div class="banda" style="bottom:0;height:32%">zona de subtítulos e interfaz de TikTok (no poner nada importante)</div>
<script type="module" src="prueba-${nombre}.js"></script>`);

const tipos = { '.html': 'text/html', '.js': 'text/javascript' };
const servidor = http.createServer((req, res) => {
  const f = path.join(raiz, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(raiz) || !fs.existsSync(f)) return res.writeHead(404).end();
  res.writeHead(200, { 'Content-Type': tipos[path.extname(f)] ?? 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => servidor.listen(0, r));
const puerto = servidor.address().port;

const global = execSync('npm root -g').toString().trim();
const { chromium } = createRequire(global + '/')('playwright');
const navegador = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const pagina = await navegador.newPage({ viewport: { width: 540, height: 960 } });
pagina.on('pageerror', (e) => console.log('ERROR en la página:', e.message));
pagina.on('console', (m) => m.type() === 'error' && console.log('consola:', m.text().slice(0, 300)));
await pagina.goto(`http://localhost:${puerto}/build/prueba-${nombre}.html`);
await pagina.waitForFunction(() => window.__listo === true, null, { timeout: 60000 });
for (const ts of tsArg.split(',').map(Number)) {
  // Varios fotogramas seguidos para que la cámara se asiente.
  for (let k = 4; k >= 0; k--) await pagina.evaluate((x) => window.__renderizar(x), ts - k / 30);
  const salida = path.join(build, 'fotos', `${nombre}${idioma === 'es' ? '' : '-' + idioma}-${ts}.png`);
  await pagina.screenshot({ path: salida });
  console.log(salida);
}
await navegador.close();
servidor.close();
