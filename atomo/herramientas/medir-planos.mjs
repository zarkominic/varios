// Mide cada plano de las escenas de un episodio, con las marcas reales de la voz (desde el episodio 11).
//
//   node atomo/herramientas/medir-planos.mjs <episodio> [id …] [--centros] [--puerto N]
//   node atomo/herramientas/medir-planos.mjs ep11                 → duración de cada plano de todas las escenas
//   node atomo/herramientas/medir-planos.mjs ep11 th-gancho th-lab
//   node atomo/herramientas/medir-planos.mjs ep11 --centros > centros.txt   → «id t1,t2,…» con el centro de cada plano
//
// Abre cada escena (?captura) en Chromium, lee los inicios de plano que deja rodar() en window.__planos y las duraciones de
// plato/escenas/marcas-<episodio>.json. Marca «!» los planos de más de 7,2 s y «<» los de menos de 3,5 s (ESTANDAR.md
// pide 4–7 s; la cartela de 1,3 s del principio sale siempre con «<» y no cuenta). Con --centros omite la cartela.
// Varias copias a la vez necesitan --puerto distinto.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const { chromium } = createRequire(execSync('npm root -g').toString().trim() + '/')('playwright');
const args = process.argv.slice(2);
const centros = args.includes('--centros');
const ip = args.indexOf('--puerto'), puerto = ip >= 0 ? Number(args[ip + 1]) : 8970 + Math.floor(Math.random() * 20);
const libres = args.filter((a, i) => !a.startsWith('--') && (ip < 0 || i !== ip + 1));
const episodio = libres[0];
if (!episodio) { console.error('uso: medir-planos.mjs <episodio> [id …] [--centros] [--puerto N]'); process.exit(1); }
const marcas = JSON.parse(fs.readFileSync(path.join(raiz, `atomo/plato/escenas/marcas-${episodio}.json`), 'utf8'));
const ids = libres.length > 1 ? libres.slice(1) : Object.keys(marcas);

const tipos = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.html': 'text/html', '.css': 'text/css', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.png': 'image/png' };
const srv = http.createServer((q, r) => {
  const f = path.join(raiz, decodeURIComponent(q.url.split('?')[0]));
  fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': tipos[path.extname(f)] ?? 'application/octet-stream' }); r.end(d); });
}).listen(puerto);
const nav = await chromium.launch();
const pg = await nav.newPage();
for (const id of ids) {
  await pg.goto(`http://localhost:${puerto}/atomo/plato/escenas/${id}.html?captura`);
  await pg.waitForFunction(() => window.__listo, null, { timeout: 30000 });
  const p = await pg.evaluate(() => window.__planos);
  const d = marcas[id].duracion, fin = (i) => (i + 1 < p.length ? p[i + 1] : d);
  if (centros) console.log(id, p.map((a, i) => ((a + fin(i)) / 2).toFixed(2)).filter((x, i) => !(i === 0 && p.length > 1 && p[1] < 1.4)).join(','));
  else console.log(id.padEnd(16), d.toFixed(1).padStart(5), p.map((a, i) => { const x = fin(i) - a; return x.toFixed(1) + (x > 7.2 ? '!' : x < 3.5 ? '<' : ''); }).join(' '));
}
await nav.close();
srv.close();
