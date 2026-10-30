// Uso: node herramientas/canal.mjs [ts1,ts2,...] [--energia 0.45] [--solo avatar|banner]
// Imágenes del canal de YouTube con el átomo narrador de verdad (el mismo motor de partículas):
//   canal/avatar-<ts>.png   800x800, foto de perfil (YouTube la recorta en círculo)
//   canal/banner-<ts>.png   2560x1440, banner; título y átomo dentro de la zona segura 1546x423
// Cada ts es la posición (en radianes) de los electrones en sus órbitas; se generan varias para elegir.
// Las imágenes elegidas (canal/avatar.png y canal/banner.png) son las de 0.3.
import { buildSync } from 'esbuild';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const args = process.argv.slice(2);
const opcion = (n, d) => (args.includes(n) ? args.splice(args.indexOf(n), 2)[1] : d);
const energia = Number(opcion('--energia', 0.45));
const solo = opcion('--solo', null);
const instantes = (args[0] ?? '0.3').split(',').map(Number);
const salida = path.join(raiz, '..', 'canal');
const build = path.join(raiz, 'build');
fs.mkdirSync(salida, { recursive: true });

fs.writeFileSync(path.join(build, 'entrada-canal.jsx'), `
import { createRoot } from 'react-dom/client';
import { Canvas, advance } from '@react-three/fiber';
import * as THREE from 'three';
import { Atomo, Estrellas, Resplandor } from '../src/Atomo.jsx';
import { N, TAU, S1, S2, S3, S4, C, poner, color, enBola } from '../src/formas/base.js';
import { rig } from '../src/estado.js';
import { reloj } from '../src/tiempo.js';
const K = window.CANAL;
// El átomo narrador posado como icono: mismas partículas y colores que en los vídeos, pero con las
// tres órbitas en la pose clásica (elipses a 60° entre sí) y los electrones repartidos a 120°.
const NUCLEONES = [[0, 0, 0]];
for (let k = 0; k < 13; k++) {
  const y = 1 - (2 * (k + 0.5)) / 13, r = Math.sqrt(1 - y * y), th = k * 2.39996;
  NUCLEONES.push([0.2 * r * Math.cos(th), 0.2 * y, 0.2 * r * Math.sin(th)]);
}
function orbita(k, th, r, p) {
  const x0 = r * Math.cos(th), z0 = r * Math.sin(th);
  const y1 = z0 * K.aplanado, z1 = z0 * Math.sqrt(1 - K.aplanado ** 2);
  const g = (k * Math.PI) / 3 + K.giro;
  poner(p, x0 * Math.cos(g) - y1 * Math.sin(g), x0 * Math.sin(g) + y1 * Math.cos(g), z1);
}
function icono(i, t, p, c) {
  const f = i / N;
  if (f < 0.14) {
    const k = i % NUCLEONES.length, n = NUCLEONES[k];
    enBola(S1[i], S2[i], S3[i], 0.1, p, n[0] * 1.15, n[1] * 1.15, n[2] * 1.15);
    color(c, k % 2 ? C.proton : C.neutron, 1.0);
    return 0.055;
  }
  if (f < 0.6) {
    orbita(i % 3, TAU * S1[i], 1.18 + (S2[i] - 0.5) * 0.02, p);
    color(c, C.cian, 0.6);
    return 0.03;
  }
  const k = i % 3, cabeza = K.fase + (k * TAU) / 3 + k * 0.9, s = S1[i];
  if (s < 0.08) {
    orbita(k, cabeza, 1.18, p);
    p[0] += (S2[i] - 0.5) * 0.08; p[1] += (S3[i] - 0.5) * 0.08; p[2] += (S4[i] - 0.5) * 0.08;
    color(c, C.electron, 1.4);
    return 0.065;
  }
  const d = (s - 0.08) / 0.92;
  orbita(k, cabeza - d * 1.4, 1.18 + (S2[i] - 0.5) * 0.03 * d, p);
  color(c, C.electron, 1.1 * (1 - d) ** 1.6);
  return 0.055 * (1 - d * 0.7);
}
rig.forma = 'atomo';
rig.inicioForma = 100;
reloj.modo = 'fijo';
reloj.sinTransicion = true;
reloj.t = 100;
reloj.energia = 0;
const camaras = { atomo: { pos: [K.x, K.y, K.d], mira: [K.x, K.y, 0], balanceo: 0 } };
createRoot(document.getElementById('lienzo')).render(
  <Canvas frameloop="never" dpr={1}
    gl={{ antialias: false, preserveDrawingBuffer: true, toneMapping: THREE.NoToneMapping }}
    camera={{ fov: 40, position: camaras.atomo.pos, near: 0.1, far: 80 }}
    onCreated={({ scene }) => {
      scene.background = new THREE.Color('#05081a');
      window.__renderizar = (ts, e, fase) => { K.fase = fase; reloj.t = 100 + ts; reloj.energia = e; advance(performance.now()); };
      setTimeout(() => (window.__listo = true), 50);
    }}>
    {K.estrellas && <Estrellas />}
    <Atomo formas={{ atomo: icono }} camaras={camaras} />
    <Resplandor />
  </Canvas>,
);
`);
buildSync({
  entryPoints: [path.join(build, 'entrada-canal.jsx')], bundle: true, format: 'esm', jsx: 'automatic',
  outfile: path.join(build, 'canal.js'), define: { 'process.env.NODE_ENV': '"production"' }, logLevel: 'error',
});

// Estrellas del banner (con semilla), menos en la zona del átomo y del título.
function estrellasSvg(w, h, n, libre) {
  let a = 7;
  const azar = () => ((a = (a * 16807) % 2147483647) / 2147483647);
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = azar() * w, y = azar() * h, r = 0.8 + azar() * 1.8, o = 0.15 + azar() * 0.45;
    if (libre.some(([cx, cy, R]) => Math.hypot(x - cx, y - cy) < R)) continue;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="#cfdcff" opacity="${o.toFixed(2)}"/>`;
  }
  return `<svg class="capa" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${s}</svg>`;
}

const fuentes = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@600;800&family=Atkinson+Hyperlegible:wght@700&display=swap">';
const base = `html,body{margin:0;background:#05081a;overflow:hidden}#lienzo,.capa{position:absolute;inset:0}`;
// El átomo del banner va a la izquierda de la zona segura (x 507-2053, y 508-931).
const AX = 800, AY = 720;
const paginas = {
  avatar: {
    w: 800, h: 800, canal: { x: 0, y: 0, d: 4.7, estrellas: true, aplanado: 0.36, giro: 0.26 },
    html: `<style>${base}.capa{background:radial-gradient(circle at 50% 50%,transparent 58%,rgba(5,8,26,.55) 72%)}</style><div id="lienzo"></div><div class="capa"></div>`,
  },
  banner: {
    w: 2560, h: 1440, canal: { x: (1280 - AX) * 0.00683 * 1, y: (AY - 720) * 0.00683, d: 13.5, estrellas: false, aplanado: 0.36, giro: 0.26 },
    html: `${fuentes}<style>${base}
      .titulo{position:absolute;left:1060px;top:556px;width:1000px;color:#fff;font:800 64px/1.08 Unbounded,sans-serif;letter-spacing:-.01em;white-space:nowrap}
      .titulo b{color:#ffd43b;font-weight:800}
      .sub{position:absolute;left:1064px;top:818px;color:#9fb3ff;font:600 32px Unbounded,sans-serif;letter-spacing:.06em}
      .orbita{position:absolute;left:0;top:0}
    </style><div id="lienzo"></div>
    ${estrellasSvg(2560, 1440, 520, [[AX, AY, 300], [1560, 720, 560]])}
    <svg class="orbita capa" width="2560" height="1440" viewBox="0 0 2560 1440" fill="none" stroke="#4d6bff" stroke-opacity=".16" stroke-width="2">
      <ellipse cx="${AX}" cy="${AY}" rx="1500" ry="380" transform="rotate(-9 ${AX} ${AY})"/>
      <ellipse cx="${AX}" cy="${AY}" rx="1250" ry="560" transform="rotate(24 ${AX} ${AY})" stroke-opacity=".1"/>
    </svg>
    <div class="titulo">The things you’ve<br><b>always wondered about</b></div>
    <div class="sub">ESO QUE SIEMPRE TE HAS PREGUNTADO</div>`,
  },
};

const tipos = { '.html': 'text/html', '.js': 'text/javascript' };
const servidor = http.createServer((req, res) => {
  const f = path.join(raiz, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(raiz) || !fs.existsSync(f)) return res.writeHead(404).end();
  res.writeHead(200, { 'Content-Type': (tipos[path.extname(f)] ?? 'application/octet-stream') + '; charset=utf-8' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => servidor.listen(0, r));
const { chromium } = createRequire(execSync('npm root -g').toString().trim() + '/')('playwright');
const nav = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
for (const [nombre, p] of Object.entries(paginas)) {
  if (solo && solo !== nombre) continue;
  fs.writeFileSync(path.join(build, `canal-${nombre}.html`), `<!doctype html><meta charset="utf-8">${p.html}<script>window.CANAL=${JSON.stringify(p.canal)}</script><script type="module" src="canal.js"></script>`);
  const pag = await nav.newPage({ viewport: { width: p.w, height: p.h } });
  pag.on('pageerror', (e) => console.log(`[${nombre}] ERROR:`, e.message));
  await pag.goto(`http://localhost:${servidor.address().port}/build/canal-${nombre}.html`);
  await pag.waitForFunction(() => window.__listo === true, null, { timeout: 60000 });
  await pag.evaluate(() => document.fonts.ready);
  for (const ts of instantes) {
    for (let k = 4; k >= 0; k--) await pag.evaluate(([x, e, f]) => window.__renderizar(x, e, f), [5 - k / 30, energia, ts]);
    const f = path.join(salida, `${nombre}-${ts}.png`);
    await pag.screenshot({ path: f });
    console.log(f);
  }
  await pag.close();
}
await nav.close();
servidor.close();
