// Mide cada plano de las escenas de un episodio, con las marcas reales de la voz (desde el episodio 11).
//
//   node atomo/herramientas/medir-planos.mjs <episodio> [id …] [--centros] [--puerto N]
//   node atomo/herramientas/medir-planos.mjs ep11                 → duración de cada plano de todas las escenas
//   node atomo/herramientas/medir-planos.mjs ep11 th-gancho th-lab
//   node atomo/herramientas/medir-planos.mjs ep11 --centros > centros.txt   → «id t1,t2,…» con el centro de cada plano
//   node atomo/herramientas/medir-planos.mjs ep11 th-lab --hoja <carpeta>   → <carpeta>/th-lab-1.jpg, th-lab-2.jpg: la hoja de revisión
//   node atomo/herramientas/medir-planos.mjs ep11 --fundidos       → los fundidos rotos (sale con 1 si hay alguno)
//   node atomo/herramientas/medir-planos.mjs ep11 --comprobar      → sospechas que se miden solas (ver abajo)
//   … th-lab --hoja <carpeta> --planos 2,4   → la hoja solo de esos planos (los números de la hoja; 0 es la cartela)
//   … th-lab --hoja <carpeta> --ligera       → la hoja con dos columnas (inicio y final), para buscar regresiones
// Cada hoja (1920×1800) pesa unos 4.600 tokens y el agente la vuelve a cargar en cada turno: el verificador y el pulidor
// sacan solo los planos que tocan (--planos) y una hoja ligera del resto (desde el episodio 13).
//
// --comprobar (desde el episodio 13) mide sin agentes, antes de las revisiones, lo que más suspendió en el 12. Son
// SOSPECHAS para el revisor, no veredictos (sale siempre con 0), calibradas para que el 11 final casi no dé ninguna (da 5):
// - LISO: el % del cuadro (sin la zona de Atom ni la barra del año) en bloques de 8×8 con un solo color, y la mancha lisa
//   más grande en bloques. Cielos de franjas, muebles y suelos planos;
// - QUIETO: el % de píxeles que cambian entre el inicio y el final del plano;
// - ATOM: los píxeles con borde (cambio fuerte de color con el vecino) en las esquinas de la zona de Atom, fuera de su
//   disco: algo con detalle detrás de Atom;
// - REPITE: dos planos de la misma escena o de escenas seguidas con el centro casi igual en miniatura (40×22).
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
const ligera = args.includes('--ligera');
const iq = args.indexOf('--planos'), soloPlanos = iq >= 0 ? new Set(String(args[iq + 1]).split(',').map(Number)) : null;
const comprobar = args.includes('--comprobar');
const libres = args.filter((a, i) => !a.startsWith('--') && (ip < 0 || i !== ip + 1) && (ih < 0 || i !== ih + 1) && (iq < 0 || i !== iq + 1));
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
const pg = await nav.newPage(hoja || fundidos || comprobar ? { viewport: { width: 640, height: 360 } } : {});
// el lienzo en el instante t, a 320×180 (un píxel de cada 2×2), en RGB
const lienzo = (t) => pg.evaluate(async (t) => {
  await window.__frame(t);
  const c = document.querySelector('canvas'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data, k = c.width / 320, o = [];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const i = (Math.floor(y * k) * c.width + Math.floor(x * k)) * 4; o.push(d[i], d[i + 1], d[i + 2]); }
  return o;
}, t);
let rotos = 0;
// --comprobar: las medidas de un fotograma (RGB 320×180)
const UMB = { liso: 30, mancha: 100, quieto: 1, atom: 120, repite: 3 };
const enCalma = (x, y) => (x >= 278 && y <= 44) || (x >= 20 && x <= 170 && y <= 14);
function liso(F) {
  const B = 8, nx = 40, ny = 22, lisos = new Uint8Array(nx * ny); let total = 0, n = 0;
  for (let by = 0; by < ny; by++) for (let bx = 0; bx < nx; bx++) {
    if (enCalma(bx * B + 4, by * B + 4)) continue;
    total++; const j0 = ((by * B) * 320 + bx * B) * 3; let uno = true;
    for (let y = by * B; y < Math.min(180, by * B + B) && uno; y++) for (let x = bx * B; x < bx * B + B; x++) { const j = (y * 320 + x) * 3; if (F[j] !== F[j0] || F[j + 1] !== F[j0 + 1] || F[j + 2] !== F[j0 + 2]) { uno = false; break; } }
    if (uno) { lisos[by * nx + bx] = 1; n++; }
  }
  // la mancha más grande (bloques lisos vecinos)
  const visto = new Uint8Array(nx * ny); let mayor = 0;
  for (let k = 0; k < nx * ny; k++) { if (!lisos[k] || visto[k]) continue; let c = 0; const pila = [k]; visto[k] = 1;
    while (pila.length) { const q = pila.pop(); c++; const x = q % nx, y = (q / nx) | 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const X = x + dx, Y = y + dy, r = Y * nx + X; if (X >= 0 && X < nx && Y >= 0 && Y < ny && lisos[r] && !visto[r]) { visto[r] = 1; pila.push(r); } } }
    mayor = Math.max(mayor, c); }
  return { pct: 100 * n / total, mayor };
}
function bordesAtom(F) {
  let n = 0;
  for (let y = 4; y <= 44; y++) for (let x = 278; x <= 318; x++) {
    if (Math.hypot(x - 297, y - 24) < 19) continue;
    const j = (y * 320 + x) * 3, k = j + 3, d = Math.abs(F[j] - F[k]) + Math.abs(F[j + 1] - F[k + 1]) + Math.abs(F[j + 2] - F[k + 2]);
    if (d > 120) n++;
  }
  return n;
}
const miniatura = (F) => { const o = []; for (let y = 0; y < 22; y++) for (let x = 0; x < 40; x++) { let r = 0, g = 0, b = 0; for (let yy = 0; yy < 8; yy++) for (let xx = 0; xx < 8; xx++) { const j = (Math.min(179, y * 8 + yy) * 320 + x * 8 + xx) * 3; r += F[j]; g += F[j + 1]; b += F[j + 2]; } o.push(r / 64, g / 64, b / 64); } return o; };
const firmas = [], sospechas = [];
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
      // el corte de la cartela de año al primer plano es seco (T.rodar): lo que cambia ahí es el propio plano 1 animándose,
      // no un resto; por debajo del 10 % no se avisa (en el 13 y el 14 fue un REVISAR del 3–4 % que costó agentes)
      if (cartela && i === 1 && u < 0.1) continue;
      if (u >= 0.1) mal.push(`ROTO ${nombre(i)} (t=${p[i].toFixed(2)}: ${(u * 100).toFixed(0)} %)`);
      else if (u > 0.03) dudas.push(`REVISAR ${nombre(i)} (t=${p[i].toFixed(2)}: ${(u * 100).toFixed(0)} %)`);
    }
    rotos += mal.length;
    console.log(id.padEnd(16), [...mal, ...dudas].join(', ') || `${p.length - 1} cortes bien`, errores.length ? `  ERRORES: ${errores.join(' | ')}` : '');
  }
  else if (comprobar) {
    for (let i = 0; i < p.length; i++) {
      if (cartela && i === 0) continue;
      const a = p[i], b = fin(i), m = (a + b) / 2;
      const I = await lienzo(Math.min(a + 0.4, m)), M = await lienzo(m), Fi = await lienzo(Math.max(b - 0.35, m));
      const l = liso(M), at = bordesAtom(M);
      let cambia = 0; for (let j = 0; j < I.length; j += 3) if (Math.abs(I[j] - Fi[j]) + Math.abs(I[j + 1] - Fi[j + 1]) + Math.abs(I[j + 2] - Fi[j + 2]) > 30) cambia++;
      const q = 100 * cambia / (I.length / 3), n = `${path.basename(id)} ${nombre(i)}`;
      if (l.pct > UMB.liso || l.mayor > UMB.mancha) sospechas.push(`LISO    ${n}: ${l.pct.toFixed(0)} % del cuadro en bloques de un color, mancha de ${l.mayor} bloques (t=${m.toFixed(2)})`);
      if (q < UMB.quieto) sospechas.push(`QUIETO  ${n}: solo cambia el ${q.toFixed(1)} % entre el inicio y el final`);
      if (at > UMB.atom) sospechas.push(`ATOM    ${n}: ${at} píxeles con borde detrás de Atom (t=${m.toFixed(2)})`);
      firmas.push({ n, f: miniatura(M), t: m, e: ids.indexOf(id) });
    }
    if (errores.length) sospechas.push(`ERROR   ${id}: ${errores.join(' | ')}`);
  }
  else if (!hoja) console.log(id.padEnd(16), d.toFixed(1).padStart(5), p.map((a, i) => { const x = fin(i) - a; return x.toFixed(1) + (x > 7.2 ? '!' : x < 3.5 ? '<' : ''); }).join(' '));
  if (hoja) {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hoja-')), celdas = [], cols = ligera ? 2 : 3;
    // el número de plano de la hoja: con cartela, la entrada i es «plano i» (la cartela, 0); sin ella, «plano i+1»
    const num = (i) => (cartela ? i : i + 1);
    for (let i = 0; i < p.length; i++) {
      if (soloPlanos && !soloPlanos.has(num(i))) continue;
      const a = p[i], b = fin(i), m = (a + b) / 2;
      for (const [j, t] of (ligera ? [Math.min(a + 0.4, m), Math.max(b - 0.35, m)] : [Math.min(a + 0.4, m), m, Math.max(b - 0.35, m)]).entries()) {
        await pg.evaluate((t) => window.__frame(t), t);
        const f = path.join(tmp, `${i}-${j}.png`);
        await pg.screenshot({ path: f });
        celdas.push({ f, txt: `${nombre(i)}  t=${t.toFixed(2)}` });
      }
    }
    // de 5 planos en 5 (1920×1800 como mucho): Read reduce lo que pasa de 2000 px y los planos se verían en miniatura
    const filas = celdas.length / cols, salidas = [], grupos = Math.ceil(filas / 5);
    for (let g = 0; g < grupos; g++) {
      const parte = celdas.slice(g * 5 * cols, (g + 1) * 5 * cols), n = parte.length, ent = [], fil = [];
      parte.forEach((c, k) => {
        ent.push('-i', c.f);
        fil.push(`[${k}:v]` + (letra ? `drawtext=fontfile=${letra}:text='${c.txt}':x=6:y=342:fontsize=14:fontcolor=white:box=1:boxcolor=black@0.6` : 'null') + `[v${k}]`);
      });
      const lay = parte.map((_, k) => `${(k % cols) * 640}_${Math.floor(k / cols) * 360}`).join('|');
      const sufijo = (soloPlanos ? '-p' + [...soloPlanos].join('_') : '') + (ligera ? '-ligera' : '');
      const sal = path.join(hoja, `${path.basename(id)}${sufijo}${grupos > 1 ? '-' + (g + 1) : ''}.jpg`);
      execFileSync('ffmpeg', ['-v', 'error', '-y', ...ent, '-filter_complex', fil.join(';') + ';' + parte.map((_, k) => `[v${k}]`).join('') + (n > 1 ? `xstack=inputs=${n}:layout=${lay}` : 'null'), '-q:v', '3', sal]);
      salidas.push(sal);
    }
    fs.rmSync(tmp, { recursive: true, force: true });
    const sal = salidas.join(', ');
    console.log(`${id}: ${filas} de ${p.length} planos → ${sal}` + (errores.length ? `  ERRORES: ${errores.join(' | ')}` : '  sin errores en la página'));
  }
}
await nav.close();
srv.close();
if (comprobar) {
  // solo dentro de la misma escena o con la siguiente: en el 11 se reutilizan decorados en escenas lejanas, y vale
  for (let i = 0; i < firmas.length; i++) for (let j = i + 1; j < firmas.length; j++) {
    if (firmas[j].e - firmas[i].e > 1) continue;
    const A = firmas[i].f, B = firmas[j].f; let s = 0; for (let k = 0; k < A.length; k++) s += Math.abs(A[k] - B[k]);
    const dm = s / A.length;
    if (dm < UMB.repite) sospechas.push(`REPITE  ${firmas[i].n} ~ ${firmas[j].n}: centros casi iguales (diferencia media ${dm.toFixed(1)})`);
  }
  console.log(sospechas.length ? sospechas.join('\n') : 'ninguna sospecha');
  console.log(`${firmas.length} planos comprobados, ${sospechas.length} sospechas (umbrales: liso ${UMB.liso} % o mancha ${UMB.mancha}, quieto ${UMB.quieto} %, atom ${UMB.atom}, repite ${UMB.repite})`);
}
if (fundidos && rotos) { console.log(`${rotos} fundidos rotos`); process.exit(1); }
