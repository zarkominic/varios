// Comprueba sin agentes cada encuadre de los decorados de un episodio ANTES de integrarlo en las escenas (desde el 17,
// aprobado por el usuario el 31/10/2026: «siempre que no haga que gastemos más tokens ni baje la calidad»). Son las mismas
// medidas de medir-planos.mjs --comprobar, pero sobre el decorado solo, así los fallos van a la pasada de decorados y no
// aparecen después en las escenas (en el 17, «algo no se lee» y la zona de Atom subieron por esto):
// - ATOM: píxeles con borde detrás de Atom (x 278–318, y 4–44, fuera de su disco), umbral 120;
// - AÑO: píxeles con borde en la franja de la barra del año (x 20–170, y 0–14), umbral 1000 (la textura de un muro no cuenta: solo un objeto con mucho detalle);
// - LISO: % del cuadro en bloques de 8×8 de un solo color (> 30 %) o una mancha lisa de más de 100 bloques;
// - NEGRO: % del cuadro en negro puro (#000): el decorado no pinta toda la pantalla (> 2 %).
//
//   node atomo/herramientas/comprobar-decorados.mjs <pref> <lista.json> [--hoja <carpeta>]
// lista.json: [["temple", {"encuadre": "calle"}], ["temple", {"encuadre": "calle", "camara": "patio"}], …]: cada
// encuadre y cámara con sus opciones (la función exportada de <pref>-comun.js y su o). Con --hoja, además, una hoja de
// contacto (5 columnas a 384×216) para mirarla de un vistazo. Sale con 0 siempre: son sospechas para la pasada.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execSync, execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const { chromium } = createRequire(execSync('npm root -g').toString().trim() + '/')('playwright');
const args = process.argv.slice(2), ih = args.indexOf('--hoja'), hoja = ih >= 0 ? path.resolve(args[ih + 1]) : null;
const [pref, listaRuta] = args.filter((a, i) => !a.startsWith('--') && i !== ih + 1);
if (!pref || !listaRuta) { console.error('uso: comprobar-decorados.mjs <pref> <lista.json> [--hoja carpeta]'); process.exit(1); }
const lista = JSON.parse(fs.readFileSync(listaRuta, 'utf8'));
const pagina = `atomo/plato/escenas/_comprobar-${pref}.html`;
const marcas = JSON.parse(fs.readFileSync(fs.readdirSync(path.join(raiz, 'atomo/plato/escenas')).filter((f) => /^marcas-ep\d+\.json$/.test(f)).map((f) => path.join(raiz, 'atomo/plato/escenas', f)).sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0], 'utf8'));
const unaEscena = Object.keys(marcas).find((k) => k.startsWith(pref + '-')) ?? Object.keys(marcas)[0];
fs.writeFileSync(path.join(raiz, pagina), `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;height:100%;background:#000;overflow:hidden}canvas{display:block;position:fixed;inset:0}</style></head><body><canvas id="lienzo"></canvas>
<script type="module">
import * as T from '/atomo/plato/escenas/${pref}-comun.js';
const { R } = await T.preparar('${unaEscena}');
const L = ${JSON.stringify(lista)};
window.__frame = async (t) => { const [f, o] = L[Math.min(L.length - 1, Math.floor(t))]; R.buf.fill(0xff000000); T[f](R, 3 + (t % 1), o); R.presentar(); };
window.__listo = true;
</script></body></html>`);

const tipos = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.html': 'text/html', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.png': 'image/png' };
const srv = http.createServer((q, r) => { const f = path.join(raiz, decodeURIComponent(q.url.split('?')[0])); fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': tipos[path.extname(f)] ?? 'application/octet-stream' }); r.end(d); }); });
await new Promise((r) => srv.listen(0, r));
const nav = await chromium.launch(), pg = await nav.newPage({ viewport: { width: 640, height: 360 } });
const errores = []; pg.on('pageerror', (e) => errores.push(e.message));
await pg.goto(`http://localhost:${srv.address().port}/${pagina}?captura`);
await pg.waitForFunction(() => window.__listo, null, { timeout: 30000 });
const lienzo = (t) => pg.evaluate(async (t) => {
  await window.__frame(t);
  const c = document.querySelector('canvas'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data, k = c.width / 320, o = [];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const i = (Math.floor(y * k) * c.width + Math.floor(x * k)) * 4; o.push(d[i], d[i + 1], d[i + 2]); }
  return o;
}, t);
const dif = (F, j, k) => Math.abs(F[j] - F[k]) + Math.abs(F[j + 1] - F[k + 1]) + Math.abs(F[j + 2] - F[k + 2]);
const bordes = (F, x0, y0, x1, y1, fuera = () => false) => { let n = 0; for (let y = y0; y <= y1; y++) for (let x = x0; x < x1; x++) { if (fuera(x, y)) continue; const j = (y * 320 + x) * 3; if (dif(F, j, j + 3) > 120) n++; } return n; };
const enCalma = (x, y) => (x >= 278 && y <= 44) || (x >= 20 && x <= 170 && y <= 14);
function liso(F) {
  const B = 8, nx = 40, ny = 22, l = new Uint8Array(nx * ny); let total = 0, n = 0;
  for (let by = 0; by < ny; by++) for (let bx = 0; bx < nx; bx++) {
    if (enCalma(bx * B + 4, by * B + 4)) continue;
    total++; const j0 = ((by * B) * 320 + bx * B) * 3; let uno = true;
    for (let y = by * B; y < Math.min(180, by * B + B) && uno; y++) for (let x = bx * B; x < bx * B + B; x++) { const j = (y * 320 + x) * 3; if (dif(F, j, j0) > 0) { uno = false; break; } }
    if (uno) { l[by * nx + bx] = 1; n++; }
  }
  const visto = new Uint8Array(nx * ny); let mayor = 0;
  for (let k = 0; k < nx * ny; k++) { if (!l[k] || visto[k]) continue; let c = 0; const pila = [k]; visto[k] = 1;
    while (pila.length) { const q = pila.pop(); c++; const x = q % nx, y = (q / nx) | 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const X = x + dx, Y = y + dy, r = Y * nx + X; if (X >= 0 && X < nx && Y >= 0 && Y < ny && l[r] && !visto[r]) { visto[r] = 1; pila.push(r); } } }
    mayor = Math.max(mayor, c); }
  return { pct: 100 * n / total, mayor };
}
const sospechas = [], capturas = [];
if (hoja) fs.mkdirSync(hoja, { recursive: true });
for (let i = 0; i < lista.length; i++) {
  const F = await lienzo(i + 0.5), nombre = `${lista[i][0]} ${JSON.stringify(lista[i][1])}`;
  const at = bordes(F, 278, 4, 318, 44, (x, y) => Math.hypot(x - 297, y - 24) < 19), an = bordes(F, 20, 0, 170, 14), l = liso(F);
  let negro = 0; for (let j = 0; j < F.length; j += 3) if (F[j] + F[j + 1] + F[j + 2] === 0) negro++;
  const pn = 100 * negro / (F.length / 3);
  if (at > 120) sospechas.push(`ATOM    ${nombre}: ${at} píxeles con borde detrás de Atom`);
  if (an > 1000) sospechas.push(`AÑO     ${nombre}: ${an} píxeles con borde en la barra del año`);
  if (l.pct > 30 || l.mayor > 100) sospechas.push(`LISO    ${nombre}: ${l.pct.toFixed(0)} % en bloques de un color, mancha de ${l.mayor}`);
  if (pn > 2) sospechas.push(`NEGRO   ${nombre}: ${pn.toFixed(1)} % del cuadro sin pintar`);
  if (hoja) { const f = path.join(hoja, `${String(i).padStart(3, '0')}.png`); await pg.screenshot({ path: f }); capturas.push(f); }
}
await nav.close(); srv.close(); fs.unlinkSync(path.join(raiz, pagina));
if (hoja && capturas.length) {
  const py = `from PIL import Image\nimport sys\nfs=sys.argv[2:];W,H=384,216;c=5\nfor p in range(0,len(fs),35):\n  s=fs[p:p+35];r=(len(s)+c-1)//c;im=Image.new('RGB',(c*W,r*H))\n  for k,f in enumerate(s): im.paste(Image.open(f).convert('RGB').resize((W,H)),((k%c)*W,(k//c)*H))\n  im.save(f"{sys.argv[1]}/hoja{p//35}.jpg",quality=85)\n`;
  execFileSync('python3', ['-c', py, hoja, ...capturas]); for (const f of capturas) fs.unlinkSync(f);
  console.log(`hojas de contacto en ${hoja}/hoja*.jpg (35 encuadres cada una, en el orden de la lista)`);
}
for (const s of sospechas) console.log(s);
if (errores.length) console.log(`ERRORES en la página: ${errores.join(' | ')}`);
console.log(`${lista.length} encuadres comprobados, ${sospechas.length} sospechas`);
