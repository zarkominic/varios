// Kit del estilo isométrico (referencia: estilos/08-isometrico.html).
//
//   import * as K from '/atomo/plato/kits/isometrico.js';
//   const plato = K.crearPlato();            // lienzo, cámaras, luces, fondo con estrellas, bandas
//   const suelo = K.crearSuelo(plato);       // rejilla isométrica con sombras de contacto y anillos
//   ...piezas: crearPlaneta, crearObservador, crearSol, crearLuna, crearAtomo, crearVeredicto,
//   crearPlaca, crearReloj, crearColumna, crearRayas, crearFlecha, crearArco, crearCota,
//   crearRotulo, crearTag...
//   plato.render();
//
// Cámara ortográfica a 35,26° / 45°. Hay cuatro pasadas: fondo (degradado y estrellas, en
// pantalla), escena principal (cámara que puede encuadrar y acercarse), escena fija (misma
// cámara isométrica sin zoom: el átomo narrador y el veredicto) y HUD (rótulos en píxeles).
// Todo lo que se anima depende solo de t; el azar sale de un PRNG con semilla.
import * as THREE from 'three';
export { THREE };

export const W = 1920, H = 1080, TAU = Math.PI * 2;
export const CAPTURA = new URLSearchParams(location.search).has('captura');

// =====================================================================
// Tiempo y curvas
// =====================================================================
export const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
export const lerp = (a, b, k) => a + (b - a) * k;
export const seg = (t, a, b) => clamp01((t - a) / (b - a));
export const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const eo = (x) => 1 - Math.pow(1 - x, 3);
export const ei = (x) => x * x * x;
export const eob = (x, s = 1.7) => (x <= 0 ? 0 : x >= 1 ? 1 : 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2));
export const eib = (x, s = 1.7) => (x <= 0 ? 0 : x >= 1 ? 1 : (s + 1) * x * x * x - s * x * x);
export const sstep = (a, b, x) => { const t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); };
// Entrada ligada a una marca: empieza `antes` s antes de la palabra y dura `dur` s (con eob, a la
// hora de la marca ya está casi completa y se asienta mientras se dice la palabra).
export const entra = (t, m, dur = 0.5, antes = 0.25) => seg(t, m - antes, m - antes + dur);
// Latido suave 0 → 1 → 0 centrado poco después de la marca.
export const latido = (t, m, dur = 0.8, antes = 0.2) => { const x = seg(t, m - antes, m - antes + dur); return Math.pow(Math.sin(Math.PI * x), 2); };

export function prng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hash3(x, y, z) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(z | 0, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}
export function vnoise(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
  const L = (a, b, t) => a + (b - a) * t;
  const c = (dx, dy, dz) => hash3(xi + dx, yi + dy, zi + dz);
  return L(L(L(c(0, 0, 0), c(1, 0, 0), u), L(c(0, 1, 0), c(1, 1, 0), u), v),
           L(L(c(0, 0, 1), c(1, 0, 1), u), L(c(0, 1, 1), c(1, 1, 1), u), v), w);
}
export const fbm = (x, y, z) => 0.72 * vnoise(x, y, z) + 0.28 * vnoise(x * 2.1 + 5, y * 2.1, z * 2.1);
export const col = (h) => new THREE.Color(h);
// color sRGB tal cual para los shaders propios (escriben directamente en el lienzo sRGB)
export const hex2v = (h) => { const c = new THREE.Color(h); c.convertLinearToSRGB(); return new THREE.Vector3(c.r, c.g, c.b); };

// =====================================================================
// Paleta (pastel sobre oscuro)
// =====================================================================
export const P = {
  bgC: '#1c1f41', bgE: '#0b0d1f',
  floor: '#151834', line: '#21254b', line2: '#2d3266', ring: '#9a90e6',
  oceanD: '#4d7fb4', ocean: '#5e9dca', shallow: '#80c6d8', sand: '#f0dcae', land: '#a9d59a', land2: '#93c897', hill: '#79ae8f', ice: '#eef0fb', ice2: '#d6dbf2',
  crust: '#f3c6a9', mantle: '#ef9480', ocore: '#f6c46e', icore: '#fff3cc',
  moonLit: '#f7efdc', moonDark: '#34386c',
  lav: '#b6acf4', lav2: '#8f86dd', mint: '#8fdcc6', peach: '#f6ae92', coral: '#ee8778',
  cream: '#f5efe3', ink: '#272a4f', navy: '#23264a',
  gold: '#f6c46e', gold2: '#ffdf94', sun: '#ffc857', sunHot: '#fff3cf', sunDeep: '#f39a4f',
  warm: '#f59a7a', cold: '#7fb2f0', coldD: '#4e7fd0',
  skin: '#f2cfb8', pants: '#3b3e72', shoe: '#23254a', tree: '#86bf93', tree2: '#6aa98a', trunk: '#9a7a83',
  wall: '#f6eee2', wall2: '#ece0d0', roofA: '#ee8778', roofB: '#a79de8', roofC: '#f2b880', glass: '#ffd98a', door: '#4a4470',
};

// =====================================================================
// Ejes de pantalla en el mundo (cámara isométrica)
// =====================================================================
export const vR = new THREE.Vector3(1, 0, -1).normalize();   // derecha en pantalla
export const vU = new THREE.Vector3(-1, 2, -1).normalize();  // arriba en pantalla
export const vW = new THREE.Vector3(1, 1, 1).normalize();    // hacia la cámara
export const vF = new THREE.Vector3(1, 0, 1).normalize();    // horizontal hacia la cámara (baja en pantalla)
export const Y = new THREE.Vector3(0, 1, 0);
// Punto del mundo que la cámara sin zoom (mirando al origen) pone en el píxel (sx, sy); d lo acerca a la cámara.
export const S = (sx, sy, d = 0) => new THREE.Vector3().addScaledVector(vR, sx - W / 2).addScaledVector(vU, H / 2 - sy).addScaledVector(vW, d);
// Punto del plano y = fy que se ve en el píxel (sx, sy) con la cámara sin zoom.
export function enPlano(sx, sy, fy) { const a = S(sx, sy); const s = (a.y - fy) / vW.y; return a.addScaledVector(vW, -s); }
// Píxel de un punto del mundo con la cámara sin zoom.
export const pix = (p) => ({ x: W / 2 + p.dot(vR), y: H / 2 - p.dot(vU) });

// orienta un objeto: eje Y local -> up, eje Z local -> forward (ortogonalizado)
export function orient(obj, up, fwd) {
  const u = up.clone().normalize();
  const f = fwd.clone().addScaledVector(u, -fwd.dot(u)).normalize();
  const r = new THREE.Vector3().crossVectors(u, f).normalize();
  obj.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(r, u, f));
}
// Orientación de las placas verticales del isométrico (como los paneles del demo): de pie y
// giradas hacia la cámara; beta las abre un poco a un lado para que se vea su canto.
export function orientPlaca(obj, beta = 0) {
  const b = Math.PI / 4 - beta;
  orient(obj, Y, new THREE.Vector3(Math.sin(b), 0, Math.cos(b)));
}

export const lam = (c, extra = {}) => new THREE.MeshLambertMaterial({ color: c, flatShading: true, ...extra });
export const basic = (c, extra = {}) => new THREE.MeshBasicMaterial({ color: c, ...extra });

// oclusión ambiental falsa: oscurece los vértices cerca de la base (y = 0 del grupo)
export function bakeAO(root, k = 9, s = 0.38) {
  root.updateMatrixWorld(true);
  const inv = root.matrixWorld.clone().invert();
  const v = new THREE.Vector3();
  root.traverse((o) => {
    if (!o.isMesh) return;
    const geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
    const p = geo.attributes.position;
    const m = new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld);
    const cols = new Float32Array(p.count * 3);
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i).applyMatrix4(m);
      const a = 1 - s * Math.exp(-Math.max(v.y, 0) / k);
      cols[i * 3] = cols[i * 3 + 1] = cols[i * 3 + 2] = a;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    o.geometry = geo;
    o.material = o.material.clone(); o.material.vertexColors = true;
  });
}

// ---------- brillos ----------
function glowTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  g.addColorStop(0.6, 'rgba(255,255,255,0.12)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
export const GLOW = glowTexture();
export const brillo = (c, op = 0.4, escala = 100) => {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: GLOW, color: c, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false }));
  s.scale.setScalar(escala);
  return s;
};

// =====================================================================
// PLATO: renderer, escenas, cámaras, luces, fondo y bandas
// =====================================================================
// libre: rectángulos [x0, y0, x1, y1] (píxeles) donde no se ponen estrellas
export function crearPlato({ fondo = [P.bgC, P.bgE], centro = [0.42, 0.6], estrellas = 80, semilla = 808, libre = null } = {}) {
  let canvas = document.getElementById('c');
  if (!canvas) { canvas = document.createElement('canvas'); canvas.id = 'c'; document.body.appendChild(canvas); }
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
  renderer.autoClear = false;
  renderer.localClippingEnabled = true;
  renderer.setClearColor('#000000', 1);

  const scene = new THREE.Scene();      // principal (cámara móvil)
  const fija = new THREE.Scene();       // isométrica sin zoom (narrador, veredicto)
  const fondoScene = new THREE.Scene(); // degradado + estrellas
  const hud = new THREE.Scene();        // rótulos en píxeles
  const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, 10, 14000);
  const camFija = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, 10, 14000);
  camFija.position.copy(vW).multiplyScalar(5000); camFija.lookAt(0, 0, 0);
  const hudCam = new THREE.OrthographicCamera(0, W, 0, -H, -10, 10);

  for (const sc of [scene, fija]) {
    sc.add(new THREE.HemisphereLight('#ece8ff', '#2d2b58', 2.25));
    const sun = new THREE.DirectionalLight('#fff4e6', 2.45);
    sun.position.set(0.55, 1, 0.1).multiplyScalar(1000);
    sc.add(sun);
  }

  // fondo: degradado radial con grano
  {
    const m = new THREE.ShaderMaterial({
      uniforms: { c0: { value: hex2v(fondo[0]) }, c1: { value: hex2v(fondo[1]) }, cc: { value: new THREE.Vector2(...centro) } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: `uniform vec3 c0; uniform vec3 c1; uniform vec2 cc; varying vec2 vUv;
        void main(){
          vec2 p = (vUv - cc) * vec2(1.7778, 1.0);
          float d = length(p);
          vec3 col = mix(c0, c1, smoothstep(0.05, 1.2, d));
          float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
          col += (n - 0.5) / 255.0;
          gl_FragColor = vec4(col, 1.0);
        }`,
      depthWrite: false, depthTest: false,
    });
    const q = new THREE.Mesh(new THREE.PlaneGeometry(W, H), m);
    q.position.set(W / 2, -H / 2, -5);
    fondoScene.add(q);
  }
  // estrellas (instanciadas) que titilan en función de t
  const STARS = [];
  let starMesh = null;
  if (estrellas > 0) {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const x = c.getContext('2d');
    const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.18, 'rgba(255,255,255,0.5)'); g.addColorStop(0.5, 'rgba(255,255,255,0)');
    x.fillStyle = g; x.fillRect(0, 0, 64, 64);
    x.fillStyle = 'rgba(255,255,255,0.9)';
    x.beginPath(); x.moveTo(32, 2); x.quadraticCurveTo(34, 30, 62, 32); x.quadraticCurveTo(34, 34, 32, 62); x.quadraticCurveTo(30, 34, 2, 32); x.quadraticCurveTo(30, 30, 32, 2); x.fill();
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    const rnd = prng(semilla);
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false });
    starMesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), mat, estrellas);
    const cols = ['#ffffff', '#cfc8ff', '#ffe6cf', '#c9f1e6'];
    for (let i = 0; i < estrellas; i++) {
      let sx, sy, ok = false, k = 0;
      while (!ok && k++ < 60) {
        sx = 40 + rnd() * (W - 80); sy = 20 + rnd() * 640;
        ok = !libre || !libre.some(([x0, y0, x1, y1]) => sx > x0 && sx < x1 && sy > y0 && sy < y1);
      }
      const s = rnd() < 0.12 ? 14 + rnd() * 8 : 5 + rnd() * 6;
      STARS.push({ x: sx, y: sy, s, k: 0.6 + rnd() * 1.4, ph: rnd() * TAU });
      starMesh.setColorAt(i, col(cols[Math.floor(rnd() * cols.length)]).multiplyScalar(0.5 + rnd() * 0.4));
    }
    starMesh.instanceColor.needsUpdate = true;
    fondoScene.add(starMesh);
  }
  const _m4 = new THREE.Matrix4(), _q = new THREE.Quaternion(), _v = new THREE.Vector3(), _s = new THREE.Vector3();
  function titilar(t) {
    if (!starMesh) return;
    for (let i = 0; i < STARS.length; i++) {
      const s = STARS[i];
      const k = s.s * (0.55 + 0.45 * Math.sin(t * s.k + s.ph));
      _m4.compose(_v.set(s.x, -s.y, 0), _q.identity(), _s.set(k, k, 1));
      starMesh.setMatrixAt(i, _m4);
    }
    starMesh.instanceMatrix.needsUpdate = true;
  }

  // cámara principal: mira siempre en la dirección isométrica; encuadre = punto central y zoom
  const cam = { target: new THREE.Vector3(), zoom: 1 };
  function encuadre(target, zoom = 1) {
    cam.target.copy(target); cam.zoom = zoom;
    camera.position.copy(target).addScaledVector(vW, 6000);
    camera.lookAt(target);
    camera.zoom = zoom; camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
  }
  encuadre(new THREE.Vector3(), 1);
  // píxel de un punto del mundo con la cámara principal
  const aPantalla = (p) => { const d = _v.subVectors(p, cam.target); return { x: W / 2 + cam.zoom * d.dot(vR), y: H / 2 - cam.zoom * d.dot(vU) }; };

  // tamaño con bandas
  let vp = { x: 0, y: 0, w: W, h: H }, lastKey = '';
  function resize() {
    const dpr = CAPTURA ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    const vw = window.innerWidth, vh = window.innerHeight;
    const key = vw + 'x' + vh + '@' + dpr;
    if (key === lastKey) return;
    lastKey = key;
    renderer.setPixelRatio(dpr);
    renderer.setSize(vw, vh, false);
    const s = Math.min(vw / W, vh / H);
    vp = { x: (vw - W * s) / 2, y: (vh - H * s) / 2, w: W * s, h: H * s };
  }
  if (!CAPTURA) window.addEventListener('resize', () => { lastKey = ''; });
  function render() {
    resize();
    const vw = window.innerWidth, vh = window.innerHeight;
    renderer.setScissorTest(false);
    renderer.setViewport(0, 0, vw, vh);
    renderer.clear(true, true, true);
    renderer.setViewport(vp.x, vp.y, vp.w, vp.h);
    renderer.setScissor(vp.x, vp.y, vp.w, vp.h);
    renderer.setScissorTest(true);
    renderer.render(fondoScene, hudCam);
    renderer.clearDepth();
    renderer.render(scene, camera);
    renderer.clearDepth();
    renderer.render(fija, camFija);
    renderer.clearDepth();
    renderer.render(hud, hudCam);
  }
  return { renderer, scene, fija, hud, fondoScene, camera, camFija, hudCam, encuadre, aPantalla, titilar, render, resize, cam };
}

// =====================================================================
// SUELO: rejilla isométrica + sombras de contacto + anillos + peanas
// =====================================================================
export function crearSuelo(plato, { y = -300, centro = [980, 760], radio = 1250, base = P.floor } = {}) {
  const U = {
    uLine: { value: hex2v(P.line) }, uLine2: { value: hex2v(P.line2) }, uRing: { value: hex2v(P.ring) },
    uFadeC: { value: new THREE.Vector2() }, uFadeR: { value: radio }, uAlpha: { value: 1 },
    uBlobs: { value: Array.from({ length: 8 }, () => new THREE.Vector4(0, 0, 0, 0)) },
    uRings: { value: Array.from({ length: 6 }, () => new THREE.Vector4(0, 0, 0, 0)) },
    uSlabs: { value: Array.from({ length: 4 }, () => new THREE.Vector4(0, 0, 0, 0)) },
  };
  function material(baseCol, top, self) {
    return new THREE.ShaderMaterial({
      transparent: true, depthWrite: !!top,
      uniforms: { ...U, uFloor: { value: hex2v(baseCol) }, uTop: { value: top ? 1 : 0 }, uSelf: { value: self || new THREE.Vector3() }, uGlow: { value: new THREE.Vector4(0, 0, 0, 0) } },
      vertexShader: 'varying vec3 vP; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vP = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }',
      fragmentShader: `
        uniform vec3 uFloor, uLine, uLine2, uRing; uniform vec2 uFadeC; uniform float uFadeR, uTop, uAlpha;
        uniform vec4 uBlobs[8]; uniform vec4 uRings[6]; uniform vec4 uSlabs[4]; uniform vec3 uSelf; uniform vec4 uGlow;
        varying vec3 vP;
        float grid(vec2 p, float cell, float w){
          vec2 q = p / cell; vec2 fw = fwidth(q);
          vec2 g = abs(fract(q - 0.5) - 0.5) / fw;
          return 1.0 - min(min(g.x, g.y) / w, 1.0);
        }
        void main(){
          vec2 p = vP.xz;
          vec3 col = uFloor;
          col = mix(col, uLine, grid(p, 48.0, 1.0) * (0.7 - 0.35 * uTop));
          col = mix(col, uLine2, grid(p, 192.0, 1.3) * (0.9 - 0.5 * uTop));
          vec2 q = abs(fract(p / 192.0 + 0.5) - 0.5) * 192.0;
          float cross = (1.0 - smoothstep(0.0, 1.6, min(q.x, q.y))) * (1.0 - smoothstep(9.0, 11.0, max(q.x, q.y)));
          col = mix(col, uRing * 0.75, cross * 0.55 * (1.0 - uTop));
          float sh = 0.0;
          for (int i = 0; i < 8; i++) { vec4 b = uBlobs[i]; float d = length(p - b.xy) / max(b.z, 1.0); sh += b.w * exp(-d * d * 2.4); }
          if (uTop < 0.5) {
            for (int i = 0; i < 4; i++) {
              vec4 s = uSlabs[i]; if (s.w < 0.5) continue;
              vec2 d = abs(p - s.xy) - vec2(s.z);
              float o = length(max(d, 0.0));
              sh += 0.5 * exp(-o / 34.0) * step(0.0, max(d.x, d.y));
            }
          }
          col *= 1.0 - clamp(sh, 0.0, 0.8);
          for (int i = 0; i < 6; i++) {
            vec4 r = uRings[i]; if (r.w <= 0.0) continue;
            float L = length(p - r.xy); float fw = fwidth(L);
            float l = 1.0 - smoothstep(0.6, 0.6 + 1.6 * fw, abs(L - r.z));
            float dash = step(0.5, fract(atan(p.y - r.y, p.x - r.x) * 9.549));
            col = mix(col, uRing, l * r.w * mix(0.45, 1.0, dash));
          }
          float a = 1.0;
          if (uTop > 0.5) {
            vec2 d = abs(p - uSelf.xy); float e = uSelf.z - max(d.x, d.y); float fe = fwidth(e);
            vec3 rim = mix(uRing * 0.85, uGlow.rgb, uGlow.w);
            col = mix(col, rim, (1.0 - smoothstep(1.2, 1.2 + 1.5 * fe + 2.5 * uGlow.w, e)) * (0.75 + 0.25 * uGlow.w));
            col = mix(col, mix(uLine2 * 1.25, uGlow.rgb, uGlow.w * 0.8), (1.0 - smoothstep(0.5, 0.5 + 1.5 * fe, abs(e - 16.0))) * 0.7);
            col += uGlow.rgb * uGlow.w * 0.10 * smoothstep(60.0, 0.0, e);
          } else {
            a = smoothstep(uFadeR, uFadeR * 0.3, length(p - uFadeC));
          }
          gl_FragColor = vec4(col, a * uAlpha);
        }`,
    });
  }
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(9000, 9000), material(base, false));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = y;
  mesh.renderOrder = -1;
  plato.scene.add(mesh);
  { const p = enPlano(centro[0], centro[1], y); U.uFadeC.value.set(p.x, p.z); }

  let nSlabs = 0;
  // peana isométrica (losa cuadrada alineada con la rejilla); devuelve su grupo y su material de tapa
  function peana(cx, cz, a, { alto = 24, caras = ['#353b74', '#242851', '#1d2146'] } = {}) {
    const g = new THREE.Group();
    const fR = basic(caras[0]), fL = basic(caras[1]), fH = basic(caras[2]);
    const box = new THREE.Mesh(new THREE.BoxGeometry(2 * a, alto, 2 * a), [fR, fL, fH, fH, fL, fR]);
    box.position.set(cx, y + alto / 2 - 0.5, cz); g.add(box);
    const self = new THREE.Vector3(cx, cz, a);
    const topMat = material('#1d2146', true, self);
    const top = new THREE.Mesh(new THREE.PlaneGeometry(2 * a, 2 * a), topMat);
    top.rotation.x = -Math.PI / 2; top.position.set(cx, y + alto, cz); g.add(top);
    if (nSlabs < 4) U.uSlabs.value[nSlabs++].set(cx, cz, a, 1);
    plato.scene.add(g);
    return { g, top: topMat, y: y + alto, cx, cz, a, brillo(c, k) { topMat.uniforms.uGlow.value.set(...hex2v(c).toArray(), k); } };
  }
  return {
    y, mesh, U, peana,
    sombra(i, x, z, r, a) { U.uBlobs.value[i].set(x, z, r, a); },
    anillo(i, x, z, r, a) { U.uRings.value[i].set(x, z, r, a); },
    alpha(a) { U.uAlpha.value = a; },
  };
}

// =====================================================================
// Líneas, flechas, arcos y cotas (en el mundo)
// =====================================================================
const _m4 = new THREE.Matrix4(), _q = new THREE.Quaternion(), _v = new THREE.Vector3(), _v2 = new THREE.Vector3(), _s = new THREE.Vector3();
const XAX = new THREE.Vector3(1, 0, 0);

// línea discontinua instanciada: poner(a, b, desde, hasta, ancho, fase)
export function crearRayas(padre, color, n, opacidad = 0.9) {
  const im = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), basic(color, { transparent: true, opacity: opacidad, depthWrite: false }), n);
  im.frustumCulled = false; padre.add(im);
  return {
    im, n,
    poner(a, b, desde = 0, hasta = 1, w = 3, fase = 0, extremos = true, relleno = 0.5) {
      const dir = _v.subVectors(b, a); const len = dir.length(); dir.normalize();
      _q.setFromUnitVectors(XAX, dir);
      const step = len / n;
      for (let j = 0; j < n; j++) {
        const u = (j + fase) / n;
        let sc = (u >= desde && u <= hasta) ? 1 : 0;
        if (extremos) sc *= sstep(0, 0.05, u) * sstep(1, 0.95, u);
        const p = _v2.copy(a).addScaledVector(dir, u * len);
        _s.set(Math.max(0.001, step * relleno * sc), Math.max(0.001, w * sc), Math.max(0.001, w * sc));
        _m4.compose(p, _q, _s);
        im.setMatrixAt(j, _m4);
      }
      im.instanceMatrix.needsUpdate = true;
      im.visible = hasta > desde;
    },
  };
}

// flecha recta (cilindro + cono) que crece de a hacia b con k
export function crearFlecha(padre, color, { grosor = 3.2, punta = 16, anchoPunta = 8, opacidad = 1 } = {}) {
  const g = new THREE.Group(); padre.add(g);
  const mat = basic(color, { transparent: opacidad < 1, opacity: opacidad });
  const sg = new THREE.CylinderGeometry(grosor, grosor, 1, 10); sg.translate(0, 0.5, 0);
  const shaft = new THREE.Mesh(sg, mat); g.add(shaft);
  const hg = new THREE.ConeGeometry(anchoPunta, punta, 12); hg.translate(0, -punta / 2, 0);
  const head = new THREE.Mesh(hg, mat); g.add(head);
  return {
    g, mat,
    poner(a, b, k = 1, s = 1) {
      g.visible = k > 0.002 && s > 0.002;
      if (!g.visible) return;
      const dir = _v.subVectors(b, a); const L = dir.length() * k; dir.normalize();
      _q.setFromUnitVectors(Y, dir);
      const end = _v2.copy(a).addScaledVector(dir, L);
      shaft.position.copy(a); shaft.quaternion.copy(_q); shaft.scale.set(s, Math.max(0.001, L - punta * s * 0.8), s);
      head.position.copy(end); head.quaternion.copy(_q); head.scale.setScalar(s * Math.min(1, L / punta));
    },
  };
}

// arco (continuo o discontinuo) en el plano (e1, e2) alrededor de c, con punta opcional
export function crearArco(padre, color, { n = 64, grosor = 3, punta = 15, anchoPunta = 8, opacidad = 1, discontinuo = false } = {}) {
  const mat = basic(color, { transparent: true, opacity: opacidad, depthWrite: false });
  const im = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), mat, n);
  im.frustumCulled = false; padre.add(im);
  const hg = new THREE.ConeGeometry(anchoPunta, punta, 12); hg.translate(0, -punta / 2, 0);
  const head = new THREE.Mesh(hg, mat); padre.add(head);
  const p = new THREE.Vector3(), tg = new THREE.Vector3();
  return {
    im, head, mat,
    poner(c, e1, e2, r, a0, a1, k = 1, conPunta = true, s = 1) {
      const vis = k > 0.002 && s > 0.002;
      im.visible = vis; head.visible = vis && conPunta;
      if (!vis) return;
      const span = (a1 - a0) * k, sg = Math.sign(a1 - a0) || 1;
      const segLen = Math.abs(span) * r / n;
      for (let j = 0; j < n; j++) {
        const a = a0 + span * (j + 0.5) / n;
        p.copy(c).addScaledVector(e1, Math.cos(a) * r).addScaledVector(e2, Math.sin(a) * r);
        tg.copy(e1).multiplyScalar(-Math.sin(a)).addScaledVector(e2, Math.cos(a)).normalize();
        _q.setFromUnitVectors(XAX, tg);
        const cut = conPunta ? (Math.abs(span) * r * (j + 0.5) / n < Math.abs(span) * r - punta * s * 0.7 ? 1 : 0) : 1;
        _s.set(Math.max(0.001, segLen * (discontinuo ? 0.55 : 1.08) * cut), Math.max(0.001, grosor * s * cut), Math.max(0.001, grosor * s * cut));
        _m4.compose(p, _q, _s);
        im.setMatrixAt(j, _m4);
      }
      im.instanceMatrix.needsUpdate = true;
      if (conPunta) {
        const a = a0 + span;
        head.position.copy(c).addScaledVector(e1, Math.cos(a) * r).addScaledVector(e2, Math.sin(a) * r);
        tg.copy(e1).multiplyScalar(-Math.sin(a) * sg).addScaledVector(e2, Math.cos(a) * sg).normalize();
        head.quaternion.setFromUnitVectors(Y, tg);
        head.scale.setScalar(s * Math.min(1, Math.abs(span) * r / punta));
      }
    },
  };
}

// cota técnica entre a y b: línea, topes perpendiculares (dirección perp) y puntas
export function crearCota(padre, color, { grosor = 2.2, tope = 14, punta = 12 } = {}) {
  const g = new THREE.Group(); padre.add(g);
  const mat = basic(color);
  const box = () => new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), mat);
  const linea = box(), t0 = box(), t1 = box();
  const cg = new THREE.ConeGeometry(punta * 0.42, punta, 10); cg.translate(0, -punta / 2, 0);
  const p0 = new THREE.Mesh(cg, mat), p1 = new THREE.Mesh(cg, mat);
  g.add(linea, t0, t1, p0, p1);
  return {
    g,
    poner(a, b, k, perp, s = 1) {
      g.visible = k > 0.002 && s > 0.002;
      if (!g.visible) return;
      const dir = _v.subVectors(b, a); const L = dir.length(); dir.normalize();
      const end = _v2.copy(a).addScaledVector(dir, L * k);
      linea.position.copy(a).lerp(end, 0.5);
      linea.quaternion.setFromUnitVectors(XAX, dir);
      linea.scale.set(Math.max(0.001, L * k - 2 * punta * 0.6 * (k > 0.98 ? 1 : 0.5)), grosor * s, grosor * s);
      const qp = new THREE.Quaternion().setFromUnitVectors(Y, perp);
      t0.position.copy(a); t0.quaternion.copy(qp); t0.scale.set(grosor * s, tope * 2 * s, grosor * s);
      const kb = sstep(0.9, 1, k);
      t1.position.copy(b); t1.quaternion.copy(qp); t1.scale.set(grosor * s, Math.max(0.001, tope * 2 * s * kb), grosor * s);
      p0.position.copy(a); p0.quaternion.setFromUnitVectors(Y, dir.clone().negate()); p0.scale.setScalar(s);
      p1.position.copy(end); p1.quaternion.setFromUnitVectors(Y, dir); p1.scale.setScalar(s * Math.max(0.001, k > 0.02 ? 1 : 0));
    },
  };
}

// =====================================================================
// PLANETA low-poly (geodésico). Eje = Y local. Con corte opcional de un octante (capas internas)
// y con una capa de color (hemisferios, noche, banda del ecuador y huellas de haces de luz).
// =====================================================================
export function crearPlaneta({ radio = 200, detalle = 7, semilla = 0, tierra = [], corte = false, umbral = 0.475, capa = false, hielo = 0.9 } = {}) {
  const RE = radio, TL = umbral, LAND_R = 1.024;
  const g = new THREE.Group();
  const planos = corte ? [new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0), new THREE.Plane(new THREE.Vector3(0, -1, 0), 0), new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)] : null;
  const o = [11.3 + semilla * 3.7, 3.1 + semilla * 1.3, 7.7 + semilla * 2.9];
  const heightAt = (d) => {
    const n = fbm(d.x * 1.2 + o[0], d.y * 1.2 + o[1], d.z * 1.2 + o[2]);
    let w = 0;
    for (const [dir, r, val] of tierra) w = Math.max(w, Math.exp(-Math.pow(d.distanceTo(dir) / r, 2)) * (val ?? 1));
    return n * (1 - w) + (TL + 0.06) * w;
  };
  const geo = new THREE.IcosahedronGeometry(1, detalle);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3(), q = new THREE.Vector3();
  const cache = new Map(), info = [];
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).normalize();
    const kx = Math.round(v.x * 2e4), ky = Math.round(v.y * 2e4), kz = Math.round(v.z * 2e4);
    const key = kx + ',' + ky + ',' + kz;
    let r = cache.get(key);
    if (!r) {
      q.set(kx, ky, kz).normalize();
      const h = heightAt(q);
      const ice = Math.abs(q.y) > hielo;
      const d = ice ? 1.016 : h > TL + 0.1 ? 1.042 : h > TL ? LAND_R : 1.0;
      r = { h, ice, d, n: vnoise(q.x * 3.2 + 2 + semilla, q.y * 3.2, q.z * 3.2 + 9) };
      cache.set(key, r);
    }
    info.push(r);
    pos.setXYZ(i, v.x * RE * r.d, v.y * RE * r.d, v.z * RE * r.d);
  }
  const colors = new Float32Array(pos.count * 3);
  const C = { oceanD: col(P.oceanD), ocean: col(P.ocean), shallow: col(P.shallow), land: col(P.land), land2: col(P.land2), hill: col(P.hill), ice: col(P.ice), ice2: col(P.ice2) };
  const rnd = prng(42 + semilla);
  for (let i = 0; i < pos.count; i += 3) {
    const a = info[i], b = info[i + 1], c = info[i + 2];
    const nIce = a.ice + b.ice + c.ice;
    const nLand = (a.h > TL) + (b.h > TL) + (c.h > TL);
    const nHill = (a.h > TL + 0.1) + (b.h > TL + 0.1) + (c.h > TL + 0.1);
    const hm = (a.h + b.h + c.h) / 3;
    let cc;
    if (nIce === 3) cc = C.ice; else if (nIce > 0) cc = C.ice2;
    else if (nLand === 3) cc = nHill === 3 ? C.hill : (a.n + b.n + c.n > 1.5 ? C.land : C.land2);
    else if (nLand === 2) cc = (a.n + b.n + c.n > 1.5 ? C.land : C.land2);
    else if (nLand === 1) cc = C.shallow;
    else cc = hm < TL - 0.12 ? C.oceanD : hm < TL - 0.05 ? C.ocean : C.shallow;
    const j = 0.975 + rnd() * 0.05;
    for (let k = 0; k < 3; k++) { colors[(i + k) * 3] = cc.r * j; colors[(i + k) * 3 + 1] = cc.g * j; colors[(i + k) * 3 + 2] = cc.b * j; }
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  const baseCols = colors.slice();
  const latY = new Float32Array(pos.count);
  for (let i = 0; i < pos.count; i++) { v.fromBufferAttribute(pos, i); latY[i] = v.y / v.length(); }
  let ultimo = '';
  const _cn = new THREE.Color(), _cs = new THREE.Color();
  // tiñe los hemisferios en el propio color de las caras (conserva el sombreado facetado)
  function tenir(cN, kN, cS, kS) {
    const key = [cN, kN.toFixed(3), cS, kS.toFixed(3)].join('|');
    if (key === ultimo) return;
    ultimo = key;
    _cn.set(cN); _cs.set(cS);
    const attr = geo.attributes.color;
    for (let i = 0; i < pos.count; i++) {
      const w = sstep(-0.035, 0.035, latY[i]);
      const a = kN * w, b = kS * (1 - w);
      for (let k = 0; k < 3; k++) {
        const base = baseCols[i * 3 + k];
        const tn = k === 0 ? _cn.r : k === 1 ? _cn.g : _cn.b, ts = k === 0 ? _cs.r : k === 1 ? _cs.g : _cs.b;
        attr.array[i * 3 + k] = (base * (1 - a) + tn * a) * (1 - b) + ts * b;
      }
    }
    attr.needsUpdate = true;
  }
  const clip = corte ? { clippingPlanes: planos, clipIntersection: true } : {};
  const superficie = new THREE.Mesh(geo, lam('#ffffff', { vertexColors: true, ...clip }));
  g.add(superficie);

  if (corte) {
    const back = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: P.crust, side: THREE.BackSide, ...clip }));
    g.add(back);
    const bands = [[0, 0.28, P.icore], [0.28, 0.55, P.ocore], [0.55, 0.86, P.mantle], [0.86, 1.0, P.crust]];
    const RIN = RE * 0.994;
    const quarter = (A, B, N) => {
      const verts = [], cols = [];
      const SEG = 14;
      const ao = (p) => { const u = p.dot(A), w = p.dot(B); return 1 - 0.36 * Math.exp(-Math.min(u, w) / 22) - 0.12 * Math.exp(-(u + w) / 70); };
      for (const [r0, r1, h] of bands) {
        const base = col(h);
        for (let j = 0; j < SEG; j++) {
          const a0 = (j / SEG) * Math.PI / 2, a1 = ((j + 1) / SEG) * Math.PI / 2;
          const P0 = (r, an) => new THREE.Vector3().addScaledVector(A, Math.cos(an) * r * RIN).addScaledVector(B, Math.sin(an) * r * RIN);
          const tris = r0 === 0 ? [[P0(0, 0), P0(r1, a0), P0(r1, a1)]] : [[P0(r0, a0), P0(r1, a0), P0(r1, a1)], [P0(r0, a0), P0(r1, a1), P0(r0, a1)]];
          for (const tri of tris) {
            const e1 = tri[1].clone().sub(tri[0]), e2 = tri[2].clone().sub(tri[0]);
            if (e1.cross(e2).dot(N) < 0) tri.reverse();
            for (const p of tri) { verts.push(p.x, p.y, p.z); const k = ao(p); cols.push(base.r * k, base.g * k, base.b * k); }
          }
        }
      }
      const gq = new THREE.BufferGeometry();
      gq.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
      gq.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
      gq.computeVertexNormals();
      return new THREE.Mesh(gq, new THREE.MeshLambertMaterial({ vertexColors: true }));
    };
    const X = new THREE.Vector3(1, 0, 0), Z = new THREE.Vector3(0, 0, 1);
    g.add(quarter(Y, Z, X), quarter(X, Z, Y), quarter(X, Y, Z));
    const core = brillo('#ffe9b0', 0.5, 120); core.position.set(4, 4, 4); g.add(core);
  }
  const halo = brillo('#7fd0e6', 0.15, RE * 3.0); halo.position.copy(vW).multiplyScalar(-RE * 2); g.add(halo);

  let capaU = null;
  if (capa) {
    capaU = {
      uN: { value: new THREE.Vector4(0, 0, 0, 0) }, uS: { value: new THREE.Vector4(0, 0, 0, 0) },
      uVista: { value: new THREE.Vector3(0, 0, 0) }, uRimN: { value: new THREE.Vector4(0, 0, 0, 0) }, uRimS: { value: new THREE.Vector4(0, 0, 0, 0) },
      uEq: { value: new THREE.Vector4(0, 0, 0, 0) }, uEqW: { value: 0.12 },
      uSol: { value: new THREE.Vector3(1, 0, 0) }, uNoche: { value: 0 }, uNocheC: { value: hex2v('#0c0f2c') },
      uHazL: { value: new THREE.Vector3(-1, 0, 0) },
      uHaz: { value: [new THREE.Vector4(), new THREE.Vector4()] }, uHazK: { value: [0, 0] },
      uDim: { value: 0 },
    };
    const m = new THREE.ShaderMaterial({
      uniforms: capaU, transparent: true, depthWrite: false,
      vertexShader: 'varying vec3 vL; void main(){ vL = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: `
        uniform vec4 uN, uS, uEq, uRimN, uRimS; uniform float uEqW, uNoche, uDim; uniform vec3 uSol, uNocheC, uHazL, uVista;
        uniform vec4 uHaz[2]; uniform float uHazK[2];
        varying vec3 vL;
        void main(){
          vec3 n = normalize(vL);
          vec3 C = vec3(0.0); float A = 0.0;
          float la;
          #define CAPA(c, a) la = clamp(a, 0.0, 1.0); C = (c) * la + C * (1.0 - la); A = la + A * (1.0 - la);
          float hn = smoothstep(-0.035, 0.035, n.y);
          CAPA(uN.rgb, uN.a * hn);
          CAPA(uS.rgb, uS.a * (1.0 - hn));
          float fres = pow(1.0 - max(dot(n, uVista), 0.0), 2.2);
          CAPA(uRimN.rgb, uRimN.a * hn * fres);
          CAPA(uRimS.rgb, uRimS.a * (1.0 - hn) * fres);
          CAPA(uNocheC, uDim);
          float ld = dot(n, uSol);
          CAPA(uNocheC, uNoche * (1.0 - smoothstep(-0.16, 0.10, ld)));
          float eq = 1.0 - smoothstep(uEqW * 0.6, uEqW, abs(n.y));
          CAPA(uEq.rgb, uEq.a * eq);
          float eqLine = 1.0 - smoothstep(0.0, 0.012, abs(n.y));
          CAPA(uEq.rgb * 1.15, uEq.a * eqLine);
          for (int i = 0; i < 2; i++) {
            vec3 v = n - uHaz[i].xyz;
            vec3 perp = v - dot(v, uHazL) * uHazL;
            float d = length(perp);
            float r = uHaz[i].w;
            float inside = 1.0 - smoothstep(r * 0.86, r, d);
            float cosi = max(-dot(n, uHazL), 0.0);
            float lit = smoothstep(0.0, 0.05, cosi);
            float k = uHazK[i] * inside * lit;
            vec3 c = mix(vec3(1.0, 0.70, 0.36), vec3(1.0, 0.97, 0.80), cosi * cosi);
            CAPA(c, k * (0.18 + 0.82 * cosi * cosi));
            float ring = (1.0 - smoothstep(r * 0.035, r * 0.09, abs(d - r * 0.93))) * lit * uHazK[i];
            CAPA(vec3(1.0, 0.93, 0.72), ring * 0.95);
          }
          gl_FragColor = vec4(A > 0.001 ? C / A : C, A);
        }`,
    });
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(RE * 1.052, 12), m);
    shell.renderOrder = 2;
    g.add(shell);
  }

  const _p = new THREE.Vector3();
  return {
    g, radio: RE, R0: RE * LAND_R, superficie, capa: capaU, planos, tenir,
    // los planos del corte siguen la posición del planeta (el grupo no debe girar)
    actualizarCorte() { if (!planos) return; g.getWorldPosition(_p); planos[0].constant = _p.x; planos[1].constant = _p.y; planos[2].constant = _p.z; },
  };
}

// ---------- personajes, casas y árboles low-poly ----------
export function crearObservador({ abrigo = P.coral, abrigoD = '#d9705f', gorro = P.lav, escala = 1.5, apagado = '#4a4f88' } = {}) {
  const g = new THREE.Group();
  const cuerpo = new THREE.Group(); g.add(cuerpo);
  const mPants = lam(P.pants), mShoe = lam(P.shoe), mCoat = lam(abrigo), mCoatD = lam(abrigoD), mSkin = lam(P.skin), mHat = lam(gorro);
  for (const s of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(6.4, 22, 7), mPants); leg.position.set(s * 4.4, 13, 0); cuerpo.add(leg);
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(7.2, 4, 10.5), mShoe); shoe.position.set(s * 4.4, 2, 1.6); cuerpo.add(shoe);
  }
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(8.2, 11.6, 27, 7), mCoat); torso.position.y = 37; cuerpo.add(torso);
  const scarf = new THREE.Mesh(new THREE.CylinderGeometry(7.6, 8.6, 5, 7), mHat); scarf.position.y = 51.5; cuerpo.add(scarf);
  const cabeza = new THREE.Group(); cabeza.position.y = 54; cuerpo.add(cabeza);
  const head = new THREE.Mesh(new THREE.IcosahedronGeometry(8.6, 1), mSkin); head.position.y = 7; cabeza.add(head);
  const cap = new THREE.Mesh(new THREE.SphereGeometry(9.3, 8, 4, 0, TAU, 0, Math.PI * 0.52), mHat); cap.position.y = 8.5; cap.rotation.x = -0.12; cabeza.add(cap);
  const pom = new THREE.Mesh(new THREE.IcosahedronGeometry(3.4, 0), mHat); pom.position.set(0, 18.5, -1); cabeza.add(pom);
  const eyeM = basic('#2a2748');
  for (const s of [-1, 1]) { const e = new THREE.Mesh(new THREE.IcosahedronGeometry(1.25, 0), eyeM); e.position.set(s * 3.2, 7.6, 7.8); cabeza.add(e); }
  const arms = [];
  for (const s of [-1, 1]) {
    const piv = new THREE.Group(); piv.position.set(s * 11.5, 47, 0);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(5, 21, 6), mCoatD); arm.position.y = -9.5; piv.add(arm);
    const hand = new THREE.Mesh(new THREE.IcosahedronGeometry(3, 0), mSkin); hand.position.y = -21; piv.add(hand);
    piv.rotation.z = s * 0.12;
    cuerpo.add(piv); arms.push(piv);
  }
  bakeAO(cuerpo, 10, 0.3);
  cuerpo.scale.setScalar(escala);
  const mats = [];
  const gris = col(apagado);
  cuerpo.traverse((o) => { if (o.isMesh && o.material.color) { const on = o.material.color.clone(); mats.push({ m: o.material, on, off: on.clone().lerp(gris, 0.72).multiplyScalar(0.8) }); } });
  const halo = brillo(abrigo, 0, 150 * escala / 1.5); halo.position.y = 38 * escala; g.add(halo);
  return {
    g, cuerpo, cabeza, arms, halo, alto: 72 * escala, ojo: 61 * escala,
    // 0 = apagado (silueta en penumbra), 1 = encendido (color pleno y halo)
    luz(k, haloK = k) {
      for (const e of mats) e.m.color.copy(e.off).lerp(e.on, k);
      halo.material.opacity = 0.32 * haloK;
      halo.visible = haloK > 0.003;
    },
  };
}
export function crearArbol(h, c) {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 2.3, 8, 5), lam(P.trunk)); trunk.position.y = 4; g.add(trunk);
  const c1 = new THREE.Mesh(new THREE.ConeGeometry(h * 0.4, h * 0.62, 6), lam(c)); c1.position.y = 7 + h * 0.31; g.add(c1);
  const c2 = new THREE.Mesh(new THREE.ConeGeometry(h * 0.29, h * 0.5, 6), lam(c)); c2.position.y = 7 + h * 0.62; g.add(c2);
  bakeAO(g, 7, 0.4);
  return g;
}
function prismGeo(w, h, d) {
  const s = new THREE.Shape(); s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(0, h); s.closePath();
  const geo = new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: false }); geo.translate(0, 0, -d / 2); return geo;
}
export function crearCasa(roof, w, d, h) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lam(P.wall)); body.position.y = h / 2; g.add(body);
  const r = new THREE.Mesh(prismGeo(w + 5, w * 0.5, d + 4), lam(roof)); r.position.y = h; g.add(r);
  const chim = new THREE.Mesh(new THREE.BoxGeometry(4, 9, 4), lam(P.wall2)); chim.position.set(w * 0.22, h + w * 0.32, -d * 0.18); g.add(chim);
  const door = new THREE.Mesh(new THREE.BoxGeometry(w * 0.24, h * 0.5, 1.2), basic(P.door)); door.position.set(-w * 0.17, h * 0.25, d / 2 + 0.3); g.add(door);
  const win = new THREE.Mesh(new THREE.BoxGeometry(w * 0.22, w * 0.2, 1.2), basic(P.glass)); win.position.set(w * 0.19, h * 0.56, d / 2 + 0.3); g.add(win);
  const win2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, w * 0.2, d * 0.24), basic(P.glass)); win2.position.set(w / 2 + 0.3, h * 0.56, 0); g.add(win2);
  bakeAO(g, 8, 0.32);
  return g;
}

// =====================================================================
// SOL low-poly: núcleo facetado, corona de rayos triangulares y halo
// =====================================================================
export function crearSol({ radio = 80, rayos = 14, semilla = 3 } = {}) {
  const g = new THREE.Group();
  const geo = new THREE.IcosahedronGeometry(radio, 2);
  const pos = geo.attributes.position;
  const cols = new Float32Array(pos.count * 3);
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), n = new THREE.Vector3();
  const cHot = col(P.sunHot), cSun = col(P.sun), cDeep = col(P.sunDeep);
  const rnd = prng(semilla);
  for (let i = 0; i < pos.count; i += 3) {
    a.fromBufferAttribute(pos, i); b.fromBufferAttribute(pos, i + 1); c.fromBufferAttribute(pos, i + 2);
    n.copy(a).add(b).add(c).normalize();
    const f = clamp01(n.dot(vW) * 0.5 + 0.5 + n.dot(Y) * 0.15);
    const cc = cDeep.clone().lerp(cSun, sstep(0.15, 0.6, f)).lerp(cHot, sstep(0.62, 1.0, f)).multiplyScalar(0.94 + rnd() * 0.1);
    for (let k = 0; k < 3; k++) { cols[(i + k) * 3] = cc.r; cols[(i + k) * 3 + 1] = cc.g; cols[(i + k) * 3 + 2] = cc.b; }
  }
  geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
  const nucleo = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true }));
  g.add(nucleo);
  // corona en el plano de la cámara
  const corona = new THREE.Group(); corona.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), vW); g.add(corona);
  const giro = new THREE.Group(); corona.add(giro);
  const rmats = [basic(P.gold2, { transparent: true, opacity: 0.95, side: THREE.DoubleSide }), basic(P.sunDeep, { transparent: true, opacity: 0.9, side: THREE.DoubleSide })];
  const rays = [];
  for (let i = 0; i < rayos; i++) {
    const largo = i % 2 ? 0.42 : 0.62;
    const s = new THREE.Shape();
    const w = radio * 0.2;
    s.moveTo(-w, 0); s.lineTo(w, 0); s.lineTo(0, radio * largo); s.closePath();
    const m = new THREE.Mesh(new THREE.ShapeGeometry(s), rmats[i % 2]);
    const ang = i / rayos * TAU;
    const piv = new THREE.Group(); piv.rotation.z = ang; giro.add(piv);
    m.position.y = radio * 1.1; m.position.z = -radio * 0.5; piv.add(m);
    rays.push({ m, largo, ph: rnd() * TAU });
  }
  const h1 = brillo('#ffd889', 0.55, radio * 4.2); h1.position.copy(vW).multiplyScalar(-radio * 1.5); g.add(h1);
  const h2 = brillo('#fff2cf', 0.5, radio * 2.4); h2.position.copy(vW).multiplyScalar(radio * 0.2); g.add(h2);
  return {
    g, nucleo, corona,
    actualizar(t, k = 1) {
      nucleo.rotation.set(0.2, t * 0.25, 0.1);
      giro.rotation.z = -t * 0.12;
      for (const r of rays) r.m.scale.set(1, 0.8 + 0.25 * Math.sin(t * 2.2 + r.ph), 1);
      h1.material.opacity = 0.5 * k + 0.05 * Math.sin(t * 1.7);
    },
  };
}

// =====================================================================
// LUNA low-poly con la fase horneada (luz desde la dirección `luz`)
// =====================================================================
export function crearLuna({ radio = 90, luz = new THREE.Vector3().addScaledVector(vR, 1).addScaledVector(vU, 0.16).addScaledVector(vW, -0.42).normalize(), semilla = 7 } = {}) {
  const g = new THREE.Group();
  const geo = new THREE.IcosahedronGeometry(radio, 3);
  const pos = geo.attributes.position;
  const cL = col(P.moonLit), cD = col(P.moonDark), cCr = col('#d8cfe0');
  const rnd = prng(semilla);
  const craters = Array.from({ length: 10 }, () => ({ d: new THREE.Vector3(rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1).normalize(), r: 0.16 + rnd() * 0.22 }));
  const colors = new Float32Array(pos.count * 3);
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), n = new THREE.Vector3();
  for (let i = 0; i < pos.count; i += 3) {
    a.fromBufferAttribute(pos, i); b.fromBufferAttribute(pos, i + 1); c.fromBufferAttribute(pos, i + 2);
    n.copy(a).add(b).add(c).normalize();
    const lit = cL.clone();
    for (const cr of craters) { const dd = n.distanceTo(cr.d) / cr.r; if (dd < 1) lit.lerp(cCr, 0.55 * (1 - dd * dd)); }
    lit.multiplyScalar(0.95 + rnd() * 0.07);
    const k = sstep(-0.05, 0.16, n.dot(luz));
    const cc = cD.clone().multiplyScalar(0.9 + rnd() * 0.14).lerp(lit, k);
    for (let q = 0; q < 3; q++) { colors[(i + q) * 3] = cc.r; colors[(i + q) * 3 + 1] = cc.g; colors[(i + q) * 3 + 2] = cc.b; }
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true }));
  g.add(mesh);
  const glow = brillo('#fff1d0', 0.28, radio * 3.4); glow.position.copy(vW).multiplyScalar(-radio * 2); g.add(glow);
  return { g, mesh, glow };
}

// =====================================================================
// ÁTOMO narrador: núcleo + 3 electrones en órbitas inclinadas; late con la voz
// =====================================================================
export function crearAtomo({ escala = 0.42 } = {}) {
  const g = new THREE.Group();
  const cuerpo = new THREE.Group(); cuerpo.scale.setScalar(escala); g.add(cuerpo);
  const RO = 150;
  const nucleo = new THREE.Group(); cuerpo.add(nucleo);
  for (let i = 0; i < 9; i++) {
    const yv = 1 - (i + 0.5) * 2 / 9, r = Math.sqrt(1 - yv * yv), th = i * 2.39996;
    const m = new THREE.Mesh(new THREE.IcosahedronGeometry(16, 1), lam(i % 2 ? P.cream : P.coral));
    m.position.set(Math.cos(th) * r * 17, yv * 17, Math.sin(th) * r * 17);
    nucleo.add(m);
  }
  const ng = brillo('#ffc9b0', 0.35, 130); cuerpo.add(ng);
  const eCols = [P.mint, P.lav, P.peach];
  const orbitas = [], electrones = [];
  for (let i = 0; i < 3; i++) {
    const qA = new THREE.Quaternion().setFromAxisAngle(vW, i * Math.PI / 3 + 0.35);
    const ax = vR.clone().applyQuaternion(qA);
    const qT = new THREE.Quaternion().setFromAxisAngle(ax, 1.22);
    const a1 = ax.clone(), a2 = vU.clone().applyQuaternion(qA).applyQuaternion(qT);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(RO, 3.2, 5, 96), lam(eCols[i], { transparent: true, opacity: 0.9 }));
    const nrm = new THREE.Vector3().crossVectors(a1, a2).normalize();
    ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), nrm);
    const xNow = new THREE.Vector3(1, 0, 0).applyQuaternion(ring.quaternion);
    const ang = Math.atan2(new THREE.Vector3().crossVectors(xNow, a1).dot(nrm), xNow.dot(a1));
    ring.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(nrm, ang));
    cuerpo.add(ring);
    orbitas.push({ ring, a1, a2 });
    const e = new THREE.Group();
    const em = new THREE.Mesh(new THREE.IcosahedronGeometry(12, 1), basic(eCols[i]));
    const eg = brillo(eCols[i], 0.6, 80);
    e.add(eg, em);
    cuerpo.add(e);
    electrones.push({ g: e, glow: eg, k: [1.25, 1.6, -1.15][i], ph: [0.3, 2.4, 4.4][i] });
  }
  const wob = new THREE.Quaternion();
  return {
    g,
    // t: segundos de la escena; e: energía de la voz (0..1)
    actualizar(t, e = 0) {
      const ee = clamp01(e);
      nucleo.scale.setScalar(1 + 0.2 * ee + 0.02 * Math.sin(t * 3));
      nucleo.rotation.set(t * 0.6, t * 1.1, 0);
      ng.material.opacity = 0.22 + 0.55 * ee;
      ng.scale.setScalar(110 + 110 * ee);
      for (let i = 0; i < 3; i++) {
        const o = orbitas[i], el = electrones[i];
        const th = el.ph + el.k * t * 2.2;
        el.g.position.set(0, 0, 0).addScaledVector(o.a1, Math.cos(th) * RO).addScaledVector(o.a2, Math.sin(th) * RO);
        el.g.scale.setScalar(1 + 0.25 * ee);
        el.glow.material.opacity = 0.45 + 0.4 * ee;
        o.ring.material.opacity = 0.62 + 0.3 * ee;
      }
      wob.setFromAxisAngle(vU, 0.3 * Math.sin(t * 0.7));
      cuerpo.quaternion.copy(wob);
    },
  };
}

// =====================================================================
// Placas (paneles con canto) y fichas de veredicto ✓ / ✗
// =====================================================================
export function roundRectPath(p, x, y, w, h, r) {
  p.moveTo(x + r, y); p.lineTo(x + w - r, y); p.quadraticCurveTo(x + w, y, x + w, y + r);
  p.lineTo(x + w, y + h - r); p.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  p.lineTo(x + r, y + h); p.quadraticCurveTo(x, y + h, x, y + h - r);
  p.lineTo(x, y + r); p.quadraticCurveTo(x, y, x + r, y);
}
function placaShape(w, h, r, hueco) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r); s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h); s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r); s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  if (hueco) {
    const hole = new THREE.Path();
    for (let q = 0; q < 4; q++) hole.absarc(hueco.x, hueco.y ?? 0, hueco.r, q * Math.PI / 2, (q + 1) * Math.PI / 2, false);
    s.holes.push(hole);
  }
  return s;
}
// Placa extruida. `dibujar(ctx, w, h)` pinta su cara (lienzo en unidades de la placa).
export function crearPlaca({ ancho = 300, alto = 200, radio = 24, grosor = 14, base = P.cream, lado = '#d9cdbd', hueco = null, dibujar = null, res = 1024 } = {}) {
  const g = new THREE.Group();
  const ext = new THREE.ExtrudeGeometry(placaShape(ancho, alto, radio, hueco), { depth: grosor, bevelEnabled: true, bevelThickness: 3, bevelSize: 3, bevelSegments: 1, curveSegments: 12 });
  const k = res / ancho;
  const c = document.createElement('canvas'); c.width = res; c.height = Math.round(alto * k);
  const x = c.getContext('2d'); x.scale(k, k);
  const gr = x.createLinearGradient(0, 0, 0, alto); gr.addColorStop(0, base); gr.addColorStop(1, new THREE.Color(base).multiplyScalar(0.92).getStyle());
  x.fillStyle = gr; x.fillRect(0, 0, ancho, alto);
  if (dibujar) dibujar(x, ancho, alto);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  tex.repeat.set(1 / ancho, 1 / alto); tex.offset.set(0.5, 0.5);
  const cara = new THREE.MeshBasicMaterial({ map: tex });
  const canto = new THREE.MeshLambertMaterial({ color: lado, flatShading: true });
  const body = new THREE.Mesh(ext, [cara, canto]);
  body.position.z = -grosor / 2;
  g.add(body);
  return { g, cara, canto, frente: grosor / 2 + 3, ancho, alto };
}
// ficha del veredicto (✓ verdad / ✗ mentira), dibujada con trazos (sin tipografía)
export function crearVeredicto(tipo = 'ok', { lado = 96 } = {}) {
  const ok = tipo === 'ok';
  const base = ok ? P.mint : P.coral, canto = ok ? '#5fae98' : '#c25f68', tinta = ok ? '#173a37' : '#3b1626';
  const placa = crearPlaca({
    ancho: lado, alto: lado, radio: lado * 0.22, grosor: lado * 0.16, base, lado: canto, res: 384,
    dibujar(x, w, h) {
      x.strokeStyle = tinta + '22'; x.lineWidth = 2; x.beginPath(); roundRectPath(x, 6, 6, w - 12, h - 12, w * 0.16); x.stroke();
      x.strokeStyle = tinta; x.lineCap = 'round'; x.lineJoin = 'round'; x.lineWidth = w * 0.12;
      x.beginPath();
      if (ok) { x.moveTo(w * 0.26, h * 0.53); x.lineTo(w * 0.43, h * 0.7); x.lineTo(w * 0.75, h * 0.32); }
      else { x.moveTo(w * 0.3, h * 0.3); x.lineTo(w * 0.7, h * 0.7); x.moveTo(w * 0.7, h * 0.3); x.lineTo(w * 0.3, h * 0.7); }
      x.stroke();
    },
  });
  const halo = brillo(base, 0.0, lado * 3.2); halo.position.z = -lado * 0.4; placa.g.add(halo);
  return { ...placa, halo };
}

// =====================================================================
// Reloj (placa redonda con agujas) y columna isométrica (barras)
// =====================================================================
export function crearReloj({ radio = 70, base = P.cream, lado = '#d6cab9', tinta = P.ink, acento = P.coral, grosor = 12, dia = 0, horas = 12 } = {}) {
  const g = new THREE.Group();
  const shape = new THREE.Shape(); shape.absarc(0, 0, radio, 0, TAU, false);
  const ext = new THREE.ExtrudeGeometry(shape, { depth: grosor, bevelEnabled: true, bevelThickness: 3, bevelSize: 3, bevelSegments: 1, curveSegments: 48 });
  const res = 512, k = res / (2 * radio);
  const c = document.createElement('canvas'); c.width = c.height = res;
  const x = c.getContext('2d'); x.scale(k, k); x.translate(radio, radio);
  const gr = x.createRadialGradient(-radio * 0.3, -radio * 0.35, 4, 0, 0, radio); gr.addColorStop(0, base); gr.addColorStop(1, new THREE.Color(base).multiplyScalar(0.9).getStyle());
  x.fillStyle = gr; x.beginPath(); x.arc(0, 0, radio, 0, TAU); x.fill();
  if (dia > 0) { // sector de horas de luz (fracción de 24 h), centrado arriba
    x.fillStyle = acento + '40'; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, radio * 0.78, -Math.PI / 2 - Math.PI * dia, -Math.PI / 2 + Math.PI * dia); x.closePath(); x.fill();
  }
  x.strokeStyle = tinta + '30'; x.lineWidth = 2; x.beginPath(); x.arc(0, 0, radio * 0.9, 0, TAU); x.stroke();
  const nt = horas === 24 ? 96 : 60, cada = horas === 24 ? 4 : 5;
  for (let i = 0; i < nt; i++) {
    const a = i / nt * TAU, big = i % cada === 0, top = i === 0 || (horas === 24 && i === nt / 2);
    const r0 = radio * (big ? 0.72 : 0.8), r1 = radio * 0.86;
    x.strokeStyle = top ? acento : tinta + (big ? 'cc' : '55'); x.lineWidth = top ? radio * 0.07 : big ? radio * 0.045 : radio * 0.018; x.lineCap = 'round';
    x.beginPath(); x.moveTo(Math.sin(a) * r0, -Math.cos(a) * r0); x.lineTo(Math.sin(a) * r1, -Math.cos(a) * r1); x.stroke();
  }
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  tex.repeat.set(1 / (2 * radio), 1 / (2 * radio)); tex.offset.set(0.5, 0.5);
  const body = new THREE.Mesh(ext, [new THREE.MeshBasicMaterial({ map: tex }), lam(lado)]);
  body.position.z = -grosor / 2; g.add(body);
  const frente = grosor / 2 + 3.5;
  const mano = (largo, ancho, color, z) => {
    const piv = new THREE.Group(); piv.position.z = frente + z;
    const geo = new THREE.BoxGeometry(ancho, largo + ancho * 0.6, 2); geo.translate(0, largo / 2 - ancho * 0.3, 0);
    piv.add(new THREE.Mesh(geo, basic(color)));
    g.add(piv); return piv;
  };
  const horaria = mano(radio * 0.46, radio * 0.11, tinta, 0.5);
  const minutero = mano(radio * 0.7, radio * 0.065, tinta, 1.5);
  const eje = new THREE.Mesh(new THREE.CylinderGeometry(radio * 0.07, radio * 0.07, 3, 16), basic(acento));
  eje.rotation.x = Math.PI / 2; eje.position.z = frente + 3; g.add(eje);
  return {
    g, frente, radio,
    // ángulos en radianes en el sentido de las agujas desde las 12
    agujas(h, m) { horaria.rotation.z = -h; minutero.rotation.z = -m; },
  };
}
export function crearColumna(color, ancho = 40, fondo = 40) {
  const g = new THREE.Group();
  const geo = new THREE.BoxGeometry(ancho, 1, fondo); geo.translate(0, 0.5, 0);
  const m = new THREE.Mesh(geo, lam(color)); g.add(m);
  return { g, m, altura(h) { m.scale.y = Math.max(0.001, h); m.visible = h > 0.01; } };
}

// =====================================================================
// HUD: rótulos (solo números, símbolos y las letras permitidas) y etiquetas hexagonales
// =====================================================================
export async function cargarFuentes() {
  try {
    await Promise.all([
      document.fonts.load('700 40px "Space Grotesk"', '0123456789×½°kmh NSEDC'),
      document.fonts.load('500 40px "Space Grotesk"', '0123456789×½°kmh NSEDC'),
      document.fonts.load('600 20px "IBM Plex Mono"', '0123456789 kmh NSE'),
    ]);
    await document.fonts.ready;
  } catch (e) { /* fuente de respaldo */ }
}
const FUENTE = '"Space Grotesk", "Helvetica Neue", Arial, sans-serif';
const MONO = '"IBM Plex Mono", ui-monospace, monospace';
function hudMesh(c, w, h, k) {
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  t.minFilter = THREE.LinearMipmapLinearFilter; t.generateMipmaps = true;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: t, transparent: true, depthTest: false, depthWrite: false, opacity: 0 }));
  m.visible = false;
  return m;
}
const hudPoner = (m) => (x, y, a = 1, s = 1, rot = 0) => {
  m.visible = a > 0.003 && s > 0.003;
  m.material.opacity = clamp01(a);
  m.position.set(x, -y, 0); m.scale.setScalar(Math.max(0.001, s)); m.rotation.z = -rot;
};
// partes: texto o lista de { t, tam, peso, mono, sup, color }
export function crearRotulo(plato, partes, { tam = 34, color = P.cream, fondo = P.navy, borde = P.lav, pad = [18, 10], radio = 14, k = 2, peso = 700 } = {}) {
  if (typeof partes === 'string') partes = [{ t: partes }];
  const meas = document.createElement('canvas').getContext('2d');
  const spec = partes.map((p) => {
    const sz = (p.tam ?? tam) * (p.sup ? 0.58 : 1);
    const font = `${p.peso ?? (p.mono ? 600 : peso)} ${sz}px ${p.mono ? MONO : FUENTE}`;
    meas.font = font;
    return { ...p, font, sz, w: meas.measureText(p.t).width };
  });
  const tw = spec.reduce((a, s) => a + s.w + (s.sup ? 1 : 0), 0);
  const w = Math.ceil(tw + 2 * pad[0]), h = Math.ceil(tam * 1.05 + 2 * pad[1]);
  const c = document.createElement('canvas'); c.width = w * k; c.height = h * k;
  const x = c.getContext('2d'); x.scale(k, k);
  if (fondo) {
    x.fillStyle = fondo; x.beginPath(); roundRectPath(x, 1.5, 1.5, w - 3, h - 3, Math.min(radio, h / 2 - 2)); x.fill();
    if (borde) { x.strokeStyle = borde; x.lineWidth = 2; x.stroke(); }
  }
  let cx = pad[0];
  const base = h / 2 + tam * 0.36;
  for (const s of spec) {
    x.font = s.font; x.fillStyle = s.color ?? color; x.textAlign = 'left';
    x.fillText(s.t, cx, s.sup ? base - tam * 0.42 : base);
    cx += s.w + (s.sup ? 1 : 0);
  }
  const mesh = hudMesh(c, w, h, k);
  plato.hud.add(mesh);
  return { mesh, w, h, poner: hudPoner(mesh) };
}
// etiqueta hexagonal con una letra (N, S, E)
export function crearTag(plato, letra, { tam = 46, fondo = P.navy, borde = P.lav, color = P.cream, k = 3 } = {}) {
  const c = document.createElement('canvas'); c.width = c.height = Math.ceil(tam * k);
  const x = c.getContext('2d'); x.scale(k, k);
  const r = tam / 2 - 2;
  x.beginPath();
  for (let i = 0; i < 6; i++) { const a = Math.PI / 6 + i * Math.PI / 3; x.lineTo(tam / 2 + Math.cos(a) * r, tam / 2 + Math.sin(a) * r); }
  x.closePath(); x.fillStyle = fondo; x.fill(); x.strokeStyle = borde; x.lineWidth = tam * 0.055; x.stroke();
  x.font = `700 ${tam * 0.52}px ${FUENTE}`; x.fillStyle = color; x.textAlign = 'center';
  x.fillText(letra, tam / 2, tam / 2 + tam * 0.185);
  const mesh = hudMesh(c, tam, tam, k);
  plato.hud.add(mesh);
  return { mesh, poner: hudPoner(mesh) };
}
// icono dibujado (sin texto) en el HUD: dibujar(ctx, tam)
export function crearIcono(plato, tam, dibujar, k = 3) {
  const c = document.createElement('canvas'); c.width = c.height = Math.ceil(tam * k);
  const x = c.getContext('2d'); x.scale(k, k);
  dibujar(x, tam);
  const mesh = hudMesh(c, tam, tam, k);
  plato.hud.add(mesh);
  return { mesh, poner: hudPoner(mesh) };
}

// =====================================================================
// Montaje común: narrador arriba a la izquierda y ficha de veredicto a su lado
// =====================================================================
export function presentador(plato, { x = 190, y = 165, escala = 0.42, veredicto = null, vx = null, vy = null } = {}) {
  const atomo = crearAtomo({ escala });
  atomo.g.position.copy(S(x, y, 400));
  plato.fija.add(atomo.g);
  let ficha = null;
  if (veredicto) {
    ficha = crearVeredicto(veredicto, { lado: 92 });
    orientPlaca(ficha.g, 0.12);
    ficha.g.position.copy(S(vx ?? x + 150, vy ?? y + 4, 380));
    plato.fija.add(ficha.g);
  }
  return {
    atomo, ficha,
    actualizar(t, e, marcaVeredicto) {
      atomo.actualizar(t, e);
      atomo.g.position.copy(S(x, y + 4 * Math.sin(t * 1.3), 400));
      if (ficha) {
        const k = entra(t, marcaVeredicto, 0.55, 0.28);
        const s = eob(k, 2.4);
        ficha.g.visible = s > 0.002;
        ficha.g.scale.setScalar(Math.max(0.001, s));
        ficha.g.rotation.z = (1 - eo(k)) * 0.6;
        ficha.g.position.copy(S(vx ?? x + 150, (vy ?? y + 4) + 3 * Math.sin(t * 1.3 + 1), 380));
        ficha.halo.material.opacity = 0.18 + 0.4 * latido(t, marcaVeredicto, 1.0, 0.0);
      }
    },
  };
}
