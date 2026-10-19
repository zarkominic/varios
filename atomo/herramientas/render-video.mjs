// Uso: node herramientas/render-video.mjs <es|en> [--trabajadores 3] [--desde N] [--hasta N]
// Dibuja cada fotograma de video.html (1080x1920) y lo guarda en build/video/<idioma>/fotos/NNNNN.jpg.
// Trocea el vídeo por escenas entre varios navegadores; cada uno "calienta" la simulación
// desde 4 s antes de su trozo para que cámara y transiciones queden idénticas.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const args = process.argv.slice(2);
const idioma = args[0] ?? 'es';
const opcion = (n, d) => (args.includes(n) ? Number(args[args.indexOf(n) + 1]) : d);
const W = opcion('--trabajadores', 3);
const linea = JSON.parse(fs.readFileSync(path.join(raiz, 'build/video', idioma, 'linea.json')));
const desde = opcion('--desde', 0);
const hasta = opcion('--hasta', linea.fotogramas);
const carpeta = path.join(raiz, 'build/video', idioma, 'fotos');
fs.mkdirSync(carpeta, { recursive: true });

// Cortes en los cambios de escena, repartidos en W trozos de tamaño parecido.
const cortes = linea.escenas.map((e) => Math.round(e.inicio * linea.fps)).filter((f) => f > desde && f < hasta);
const trozos = [];
let ini = desde;
const objetivo = (hasta - desde) / W;
for (const c of cortes) {
  if (c - ini >= objetivo * 0.85 && trozos.length < W - 1) {
    trozos.push([ini, c]);
    ini = c;
  }
}
trozos.push([ini, hasta]);

const tipos = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json' };
const servidor = http.createServer((req, res) => {
  const f = path.join(raiz, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(raiz) || !fs.existsSync(f)) return res.writeHead(404).end();
  res.writeHead(200, { 'Content-Type': tipos[path.extname(f)] ?? 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => servidor.listen(0, r));
const puerto = servidor.address().port;
const { chromium } = createRequire(execSync('npm root -g').toString().trim() + '/')('playwright');

async function trabajar([a, b], w) {
  const nav = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const pag = await nav.newPage({ viewport: { width: 1080, height: 1920 } });
  pag.on('pageerror', (e) => console.log(`[${w}] ERROR:`, e.message));
  await pag.goto(`http://localhost:${puerto}/video.html?idioma=${idioma}`);
  await pag.waitForFunction(() => window.__listo === true, null, { timeout: 120000 });
  const t0 = a / linea.fps;
  if (a > 0) await pag.evaluate(([x, y]) => window.__calentar(x, y), [Math.max(0, t0 - 4), t0]);
  const inicio = Date.now();
  for (let n = a; n < b; n++) {
    await pag.evaluate((x) => window.__fotograma(x), n);
    await pag.screenshot({ path: path.join(carpeta, `${String(n).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 92 });
    if ((n - a) % 60 === 59) {
      const ritmo = (Date.now() - inicio) / (n - a + 1);
      console.log(`[${w}] ${n - a + 1}/${b - a} fotogramas · ${(ritmo / 1000).toFixed(2)} s/fotograma · faltan ~${Math.round((ritmo * (b - n - 1)) / 60000)} min`);
    }
  }
  await nav.close();
}

console.log(`Render ${idioma}: fotogramas ${desde}-${hasta} en ${trozos.length} trozos`, trozos);
const t = Date.now();
await Promise.all(trozos.map((tr, w) => trabajar(tr, w)));
console.log(`Hecho en ${((Date.now() - t) / 60000).toFixed(1)} min`);
servidor.close();
