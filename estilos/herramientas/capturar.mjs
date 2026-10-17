// Uso: node estilos/herramientas/capturar.mjs <estilo.html> <t1,t2,...> [--salida carpeta]
// Abre un estilo en modo captura (1080x1920, sin bucle de animación), dibuja cada instante con
// window.__frame(t), guarda una captura por instante y una tira con todas (360x640 cada una).
// Imprime los errores de la página, lo que tarda cada fotograma y cuánto difieren el primer
// y el último instante (para comprobar que el bucle cierra: pide 0 y la duración del bucle).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, execSync } from 'node:child_process';
import { createRequire } from 'node:module';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const args = process.argv.slice(2);
const opcion = (n, d) => (args.includes(n) ? args[args.indexOf(n) + 1] : d);
const archivo = path.resolve(args[0]);
const tiempos = (args[1] ?? '0,2,4').split(',').map(Number);
const nombre = path.basename(archivo, '.html');
const salida = path.resolve(opcion('--salida', path.join(raiz, 'estilos/capturas')));
fs.mkdirSync(salida, { recursive: true });

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
const pag = await nav.newPage({ viewport: { width: 1080, height: 1920 } });
const errores = [];
pag.on('pageerror', (e) => errores.push('pageerror: ' + e.message));
pag.on('console', (m) => m.type() === 'error' && errores.push('console: ' + m.text()));
// three.js sale del CDN en la web publicada; aquí se sirve la misma versión desde node_modules.
const three = path.join(raiz, 'atomo/node_modules/three');
await pag.route('https://cdn.jsdelivr.net/npm/three@0.170.0/**', (ruta) => {
  const rel = new URL(ruta.request().url()).pathname.replace('/npm/three@0.170.0/', '');
  const f = path.join(three, rel);
  if (!fs.existsSync(f)) return ruta.fulfill({ status: 404 });
  ruta.fulfill({ status: 200, contentType: 'text/javascript', body: fs.readFileSync(f) });
});

const rel = path.relative(raiz, archivo);
await pag.goto(`http://localhost:${servidor.address().port}/${rel}?captura`);
try {
  await pag.waitForFunction(() => window.__listo === true && typeof window.__frame === 'function', null, { timeout: 90000 });
} catch {
  console.log('ERROR: la página no llegó a window.__listo = true con window.__frame definido');
  console.log(errores.join('\n'));
  await nav.close();
  servidor.close();
  process.exit(1);
}
const fotos = [];
for (const t of tiempos) {
  const ms = await pag.evaluate(async (t) => {
    const a = performance.now();
    await window.__frame(t);
    return performance.now() - a;
  }, t);
  const f = path.join(salida, `${nombre}-t${t}.jpg`);
  await pag.screenshot({ path: f, type: 'jpeg', quality: 88 });
  fotos.push(f);
  console.log(`t=${t}s  ${ms.toFixed(0)} ms  ${f}`);
}
const tira = path.join(salida, `${nombre}-tira.jpg`);
const py = `
import sys
from PIL import Image, ImageChops, ImageStat
fs = sys.argv[2:]
ims = [Image.open(f).convert('RGB') for f in fs]
h = Image.new('RGB', (360 * len(ims), 640))
for j, im in enumerate(ims): h.paste(im.resize((360, 640)), (360 * j, 0))
h.save(sys.argv[1], quality=85)
if len(ims) > 1:
    d = ImageStat.Stat(ImageChops.difference(ims[0], ims[-1])).mean
    print('diferencia media primer-último instante: %.2f (0-255; < 3 = el bucle cierra)' % (sum(d) / 3))
`;
console.log(execFileSync('python3', ['-c', py, tira, ...fotos]).toString().trim());
console.log('tira:', tira);
console.log(errores.length ? 'ERRORES:\n' + errores.join('\n') : 'sin errores en la página');
await nav.close();
servidor.close();
