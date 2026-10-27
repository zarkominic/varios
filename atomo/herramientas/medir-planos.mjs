// Mide cada plano de las escenas de un episodio, con las marcas reales de la voz (desde el episodio 11).
//
//   node atomo/herramientas/medir-planos.mjs <episodio> [id …] [--centros] [--puerto N]
//   node atomo/herramientas/medir-planos.mjs ep11                 → duración de cada plano de todas las escenas
//   node atomo/herramientas/medir-planos.mjs ep11 th-gancho th-lab
//   node atomo/herramientas/medir-planos.mjs ep11 --centros > centros.txt   → «id t1,t2,…» con el centro de cada plano
//   node atomo/herramientas/medir-planos.mjs ep11 th-lab --hoja <carpeta>   → <carpeta>/th-lab-1.jpg, th-lab-2.jpg: la hoja de revisión
//
// La hoja tiene una fila por plano y tres columnas: inicio (+0,35 s), centro y final (−0,35 s), a 640×360 (2 px por píxel
// del lienzo) y con su etiqueta; con más de 5 planos se parte en varias imágenes (-1, -2…) para que ninguna pase de 2000 px. Es lo que se mira en la revisión y lo que leen los agentes de calidad. Con --hoja
// también dice si la página dio errores.
//
// Abre cada escena (?captura) en Chromium, lee los inicios de plano que deja rodar() en window.__planos y las duraciones de
// plato/escenas/marcas-<episodio>.json. Marca «!» los planos de más de 7,2 s y «<» los de menos de 3,5 s (ESTANDAR.md
// pide 4–7 s; la cartela de 1,3 s del principio sale siempre con «<» y no cuenta). Con --centros omite la cartela.
// Cada copia usa un puerto libre (o --puerto N). Un id puede llevar carpeta (_tmp_A/th-lab): se abre esa copia de la
// escena con las marcas de th-lab.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execSync, execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const { chromium } = createRequire(execSync('npm root -g').toString().trim() + '/')('playwright');
const args = process.argv.slice(2);
const centros = args.includes('--centros');
const ip = args.indexOf('--puerto'), fijo = ip >= 0 ? Number(args[ip + 1]) : 0;   // 0: uno libre
const ih = args.indexOf('--hoja'), hoja = ih >= 0 ? path.resolve(args[ih + 1]) : null;
const libres = args.filter((a, i) => !a.startsWith('--') && (ip < 0 || i !== ip + 1) && (ih < 0 || i !== ih + 1));
const episodio = libres[0];
if (!episodio) { console.error('uso: medir-planos.mjs <episodio> [id …] [--centros] [--puerto N] [--hoja carpeta]'); process.exit(1); }
const letra = ['liberation/LiberationSans-Bold.ttf', 'dejavu/DejaVuSans-Bold.ttf'].map((f) => '/usr/share/fonts/truetype/' + f).find((f) => fs.existsSync(f));
const marcas = JSON.parse(fs.readFileSync(path.join(raiz, `atomo/plato/escenas/marcas-${episodio}.json`), 'utf8'));
const ids = libres.length > 1 ? libres.slice(1) : Object.keys(marcas);

const tipos = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.html': 'text/html', '.css': 'text/css', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.png': 'image/png' };
const srv = http.createServer((q, r) => {
  const f = path.join(raiz, decodeURIComponent(q.url.split('?')[0]));
  fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': tipos[path.extname(f)] ?? 'application/octet-stream' }); r.end(d); });
});
await new Promise((r) => srv.listen(fijo, r));
const puerto = srv.address().port;
const nav = await chromium.launch();
const pg = await nav.newPage(hoja ? { viewport: { width: 640, height: 360 } } : {});
let errores = [];
pg.on('pageerror', (e) => errores.push(e.message));
pg.on('console', (m) => m.type() === 'error' && errores.push(m.text()));
if (hoja) fs.mkdirSync(hoja, { recursive: true });
for (const id of ids) {
  errores = [];
  await pg.goto(`http://localhost:${puerto}/atomo/plato/escenas/${id}.html?captura`);
  await pg.waitForFunction(() => window.__listo, null, { timeout: 30000 });
  const p = await pg.evaluate(() => window.__planos);
  const d = marcas[path.basename(id)].duracion, fin = (i) => (i + 1 < p.length ? p[i + 1] : d);
  if (centros) console.log(id, p.map((a, i) => ((a + fin(i)) / 2).toFixed(2)).filter((x, i) => !(i === 0 && p.length > 1 && p[1] < 1.4)).join(','));
  else if (!hoja) console.log(id.padEnd(16), d.toFixed(1).padStart(5), p.map((a, i) => { const x = fin(i) - a; return x.toFixed(1) + (x > 7.2 ? '!' : x < 3.5 ? '<' : ''); }).join(' '));
  if (hoja) {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hoja-')), celdas = [];
    for (let i = 0; i < p.length; i++) {
      const a = p[i], b = fin(i), m = (a + b) / 2;
      for (const [j, t] of [Math.min(a + 0.35, m), m, Math.max(b - 0.35, m)].entries()) {
        await pg.evaluate((t) => window.__frame(t), t);
        const f = path.join(tmp, `${i}-${j}.png`);
        await pg.screenshot({ path: f });
        celdas.push({ f, txt: `plano ${i + 1}  t=${t.toFixed(2)}` });
      }
    }
    // de 5 planos en 5 (1920×1800 como mucho): Read reduce lo que pasa de 2000 px y los planos se verían en miniatura
    const salidas = [], grupos = Math.ceil(p.length / 5);
    for (let g = 0; g < grupos; g++) {
      const parte = celdas.slice(g * 15, g * 15 + 15), n = parte.length, ent = [], fil = [];
      parte.forEach((c, k) => {
        ent.push('-i', c.f);
        fil.push(`[${k}:v]` + (letra ? `drawtext=fontfile=${letra}:text='${c.txt}':x=6:y=342:fontsize=14:fontcolor=white:box=1:boxcolor=black@0.6` : 'null') + `[v${k}]`);
      });
      const lay = parte.map((_, k) => `${(k % 3) * 640}_${Math.floor(k / 3) * 360}`).join('|');
      const sal = path.join(hoja, `${path.basename(id)}${grupos > 1 ? '-' + (g + 1) : ''}.jpg`);
      execFileSync('ffmpeg', ['-v', 'error', '-y', ...ent, '-filter_complex', fil.join(';') + ';' + parte.map((_, k) => `[v${k}]`).join('') + (n > 1 ? `xstack=inputs=${n}:layout=${lay}` : 'null'), '-q:v', '3', sal]);
      salidas.push(sal);
    }
    fs.rmSync(tmp, { recursive: true, force: true });
    const sal = salidas.join(', ');
    console.log(`${id}: ${p.length} planos → ${sal}` + (errores.length ? `  ERRORES: ${errores.join(' | ')}` : '  sin errores en la página'));
  }
}
await nav.close();
srv.close();
