// Uso: node estilos/herramientas/miniaturas.mjs <salida>
// Para cada estilo (estilos/NN-*.html): lo abre en modo captura a 1920x1080, mide cuánto tarda
// en dibujarse y capturarse un fotograma (media de 3, el coste real de renderizarlo en este
// servidor sin GPU) y guarda una miniatura de 640x360 a mitad del bucle. Escribe
// <salida>/medidas.json con { slug: { duracion, s_por_fotograma } }.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, execSync } from 'node:child_process';
import { createRequire } from 'node:module';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const salida = path.resolve(process.argv[2] ?? path.join(raiz, 'estilos/miniaturas'));
fs.mkdirSync(salida, { recursive: true });
const estilos = fs.readdirSync(path.join(raiz, 'estilos')).filter((f) => /^\d\d-.*\.html$/.test(f)).sort();

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

const medidas = {};
for (const archivo of estilos) {
  const slug = archivo.replace(/\.html$/, '');
  const pag = await nav.newPage({ viewport: { width: 1920, height: 1080 } });
  await pag.route('https://cdn.jsdelivr.net/npm/three@0.170.0/**', (ruta) => {
    const f = path.join(three, new URL(ruta.request().url()).pathname.replace('/npm/three@0.170.0/', ''));
    if (!fs.existsSync(f)) return ruta.fulfill({ status: 404 });
    ruta.fulfill({ status: 200, contentType: 'text/javascript', body: fs.readFileSync(f) });
  });
  try {
    await pag.goto(`http://localhost:${servidor.address().port}/estilos/${archivo}?captura`);
    await pag.waitForFunction(() => window.__listo === true && typeof window.__frame === 'function', null, { timeout: 120000 });
    // La duración del bucle no se expone: se lee del código (const DUR = …) o se supone 10 s.
    const html = fs.readFileSync(path.join(raiz, 'estilos', archivo), 'utf8');
    const m = html.match(/\bDUR\s*=\s*([\d.]+)/);
    const dur = m ? Number(m[1]) : 10;
    await pag.evaluate((t) => window.__frame(t), dur * 0.1); // calentamiento (compilar shaders, cachés)
    await pag.screenshot({ type: 'jpeg', quality: 50 });
    const tiempos = [];
    for (const k of [0.3, 0.8, 0.55]) {
      const a = Date.now();
      await pag.evaluate((t) => window.__frame(t), dur * k);
      await pag.screenshot({ path: path.join(salida, `${slug}-grande.jpg`), type: 'jpeg', quality: 90 });
      tiempos.push((Date.now() - a) / 1000);
    }
    execFileSync('python3', ['-c', `from PIL import Image; Image.open('${path.join(salida, slug + '-grande.jpg')}').convert('RGB').resize((640, 360), Image.LANCZOS).save('${path.join(salida, slug + '.jpg')}', quality=86)`]);
    fs.unlinkSync(path.join(salida, `${slug}-grande.jpg`));
    medidas[slug] = { duracion: dur, s_por_fotograma: Number((tiempos.reduce((a, b) => a + b, 0) / tiempos.length).toFixed(2)) };
    console.log(slug, medidas[slug]);
  } catch (e) {
    console.log(slug, 'ERROR', e.message.split('\n')[0]);
  }
  await pag.close();
}
fs.writeFileSync(path.join(salida, 'medidas.json'), JSON.stringify(medidas, null, 2));
await nav.close();
servidor.close();
