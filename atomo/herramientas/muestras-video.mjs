// Uso: node herramientas/muestras-video.mjs <es|en> <t1,t2,...>
// Recorre el vídeo en un solo navegador (pasos de 0,1 s) y captura los instantes pedidos
// en build/video/<idioma>/muestras/t-<t>.jpg. Sirve para revisar sin renderizar todo.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const [idioma = 'es', lista = '0'] = process.argv.slice(2);
const tiempos = lista.split(',').map(Number).sort((a, b) => a - b);
const carpeta = path.join(raiz, 'build/video', idioma, 'muestras');
fs.mkdirSync(carpeta, { recursive: true });
const tipos = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json' };
const servidor = http.createServer((req, res) => {
  const f = path.join(raiz, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(raiz) || !fs.existsSync(f)) return res.writeHead(404).end();
  res.writeHead(200, { 'Content-Type': tipos[path.extname(f)] ?? 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => servidor.listen(0, r));
const { chromium } = createRequire(execSync('npm root -g').toString().trim() + '/')('playwright');
const nav = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const pag = await nav.newPage({ viewport: { width: 1080, height: 1920 } });
pag.on('pageerror', (e) => console.log('ERROR:', e.message));
await pag.goto(`http://localhost:${servidor.address().port}/video.html?idioma=${idioma}`);
await pag.waitForFunction(() => window.__listo === true, null, { timeout: 120000 });
const fps = await pag.evaluate(() => window.__linea.fps);
let previo = 0;
for (const t of tiempos) {
  const n = Math.round(t * fps);
  if (n / fps - 0.2 > previo) await pag.evaluate(([a, b]) => window.__calentar(a, b), [previo, n / fps - 0.2]);
  for (let k = Math.max(0, n - 6); k <= n; k++) await pag.evaluate((x) => window.__fotograma(x), k);
  previo = n / fps;
  const f = path.join(carpeta, `t-${t}.jpg`);
  await pag.screenshot({ path: f, type: 'jpeg', quality: 85 });
  console.log(f);
}
await nav.close();
servidor.close();
