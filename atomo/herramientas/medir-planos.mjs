// Mide cada plano de las escenas de un episodio, con las marcas reales de la voz (desde el episodio 11).
//
//   node atomo/herramientas/medir-planos.mjs <episodio> [id …] [--centros] [--puerto N]
//   node atomo/herramientas/medir-planos.mjs ep11                 → duración de cada plano de todas las escenas
//   node atomo/herramientas/medir-planos.mjs ep11 th-gancho th-lab
//   node atomo/herramientas/medir-planos.mjs ep11 --centros > centros.txt   → «id t1,t2,…» con el centro de cada plano
//   node atomo/herramientas/medir-planos.mjs ep11 th-lab --hoja <carpeta>   → <carpeta>/th-lab-1.jpg, th-lab-2.jpg: la hoja de revisión
//   node atomo/herramientas/medir-planos.mjs ep11 --fundidos       → los fundidos rotos (sale con 1 si hay alguno)
//
// La hoja tiene una fila por plano y tres columnas: inicio (+0,4 s, ya fuera del fundido de 0,35 s), centro y final
// (−0,35 s), a 640×360 (2 px por píxel del lienzo) y con su etiqueta; con más de 5 planos se parte en varias imágenes (-1,
// -2…) para que ninguna pase de 2000 px; con cartela de año, su fila dice «cartela» y «plano N» es la entrada N de
// T.rodar. Es lo que se mira en la revisión y lo que leen los agentes de calidad. Con --hoja
// también dice si la página dio errores.
// Los fundidos NO se ven en la hoja: los comprueba --fundidos. En cada corte compara la mitad del fundido (+0,17 s) con el
// final del plano anterior (−0,02 s) y el principio del nuevo (+0,4 s). Solo cuenta los píxeles que están quietos en los
// dos planos (iguales a −0,25 y −0,02 s, y a +0,4 y +0,6 s), porque lo que se anima o se funde a blanco cambia por su
// cuenta. Un píxel quieto del fundido tiene que venir de uno de los dos planos. Si el 10 % del cuadro o más no se parece a
// ninguno (negro, restos de otro plano), el corte está ROTO y la orden sale con 1: así salieron cielos y paredes negros en
// el ep11 (18–48 % del cuadro). Entre el 3 y el 10 % dice REVISAR: suele ser algo que se anima, pero hay que mirarlo.
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
const fundidos = args.includes('--fundidos');
const libres = args.filter((a, i) => !a.startsWith('--') && (ip < 0 || i !== ip + 1) && (ih < 0 || i !== ih + 1));
const episodio = libres[0];
if (!episodio) { console.error('uso: medir-planos.mjs <episodio> [id …] [--centros] [--fundidos] [--puerto N] [--hoja carpeta]'); process.exit(1); }
const letra = ['liberation/LiberationSans-Bold.ttf', 'dejavu/DejaVuSans-Bold.ttf'].map((f) => '/usr/share/fonts/truetype/' + f).find((f) => fs.existsSync(f));
const marcas = JSON.parse(fs.readFileSync(path.join(raiz, `atomo/plato/escenas/marcas-${episodio}.json`), 'utf8'));
const pedidos = libres.length > 1 ? libres.slice(1) : Object.keys(marcas);
const ids = pedidos.filter((id) => marcas[path.basename(id)] || console.error(`AVISO: ${id} no está en marcas-${episodio}.json (¿la miniatura?): se salta`));

const tipos = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.html': 'text/html', '.css': 'text/css', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.png': 'image/png' };
const srv = http.createServer((q, r) => {
  const f = path.join(raiz, decodeURIComponent(q.url.split('?')[0]));
  fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': tipos[path.extname(f)] ?? 'application/octet-stream' }); r.end(d); });
});
await new Promise((r) => srv.listen(fijo, r));
const puerto = srv.address().port;
const nav = await chromium.launch();
const pg = await nav.newPage(hoja || fundidos ? { viewport: { width: 640, height: 360 } } : {});
// el lienzo en el instante t, a 320×180 (un píxel de cada 2×2), en RGB
const lienzo = (t) => pg.evaluate(async (t) => {
  await window.__frame(t);
  const c = document.querySelector('canvas'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data, k = c.width / 320, o = [];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const i = (Math.floor(y * k) * c.width + Math.floor(x * k)) * 4; o.push(d[i], d[i + 1], d[i + 2]); }
  return o;
}, t);
let rotos = 0;
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
  // con cartela de año, la primera entrada es la cartela y «plano N» es la entrada N de T.rodar
  const cartela = !!marcas[path.basename(id)].cartela && p.length > 1 && p[1] < 1.4;
  const nombre = (i) => (cartela ? (i === 0 ? 'cartela' : `plano ${i}`) : `plano ${i + 1}`);
  if (centros) console.log(id, p.map((a, i) => ((a + fin(i)) / 2).toFixed(2)).filter((x, i) => !(i === 0 && p.length > 1 && p[1] < 1.4)).join(','));
  else if (fundidos) {
    const mal = [], dudas = [];
    for (let i = 1; i < p.length; i++) {
      if (p[i] - p[i - 1] < 0.6 || fin(i) - p[i] < 0.6) continue;
      const A0 = await lienzo(p[i] - 0.25), A = await lienzo(p[i] - 0.02), F = await lienzo(p[i] + 0.17);
      const B = await lienzo(p[i] + 0.4), B1 = await lienzo(p[i] + 0.6);
      const dif = (X, Y, j) => Math.abs(X[j] - Y[j]) + Math.abs(X[j + 1] - Y[j + 1]) + Math.abs(X[j + 2] - Y[j + 2]);
      let n = 0;
      for (let j = 0; j < F.length; j += 3) {
        if (dif(A, A0, j) > 30 || dif(B, B1, j) > 30) continue;   // se anima: no se puede juzgar
        if (Math.min(dif(F, A, j), dif(F, B, j)) > 90) n++;
      }
      const u = n / (F.length / 3);
      if (u >= 0.1) mal.push(`ROTO ${nombre(i)} (t=${p[i].toFixed(2)}: ${(u * 100).toFixed(0)} %)`);
      else if (u > 0.03) dudas.push(`REVISAR ${nombre(i)} (t=${p[i].toFixed(2)}: ${(u * 100).toFixed(0)} %)`);
    }
    rotos += mal.length;
    console.log(id.padEnd(16), [...mal, ...dudas].join(', ') || `${p.length - 1} cortes bien`, errores.length ? `  ERRORES: ${errores.join(' | ')}` : '');
  }
  else if (!hoja) console.log(id.padEnd(16), d.toFixed(1).padStart(5), p.map((a, i) => { const x = fin(i) - a; return x.toFixed(1) + (x > 7.2 ? '!' : x < 3.5 ? '<' : ''); }).join(' '));
  if (hoja) {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hoja-')), celdas = [];
    for (let i = 0; i < p.length; i++) {
      const a = p[i], b = fin(i), m = (a + b) / 2;
      for (const [j, t] of [Math.min(a + 0.4, m), m, Math.max(b - 0.35, m)].entries()) {
        await pg.evaluate((t) => window.__frame(t), t);
        const f = path.join(tmp, `${i}-${j}.png`);
        await pg.screenshot({ path: f });
        celdas.push({ f, txt: `${nombre(i)}  t=${t.toFixed(2)}` });
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
if (fundidos && rotos) { console.log(`${rotos} fundidos rotos`); process.exit(1); }
