// set.js — the short's painted sets, each painted once into cached greyscale "watercolour" canvases (they never boil).
// Mid greys only: characters and props keep the whites and the ink blacks.
//   WIDE  — 1930 Manhattan seen from across the rooftops: sky, a far skyline, a near row of blocks with water tanks
//           (the tower itself is procedural, props.js towerWide, drawn between the far and the near layer)
//   TOP   — the view from the top of the steel: sky, the horizon with the rivers, the city far below
//   STREET— the site on 34th-ish street: the hoarding, the stone building next door, the road, the near kerb
// Every layer is drawn with its own parallax (par): par 1 = moves with the world, 0 = nailed to the screen.
import * as T from '/styles/rubber-hose/demo/toon.js';
import { wash } from '/styles/rubber-hose/demo/bg.js';
import { mulberry } from '/core/lib.js';
const { ell, arc, rr, rect, spline } = T;

export const W_STREET = 1750;          // WIDE: the street level under the tower (hidden behind the near blocks)
export const W_HORIZON = 1330;         // WIDE: where the far skyline stands
export const T_HORIZON = 1150;         // TOP: the horizon behind the steel

function paperGrain(g, w, h, seed = 3) {
  const rnd = mulberry(seed); g.setTransform(1, 0, 0, 1, 0, 0);
  for (let i = 0; i < w * h / 900; i++) { g.fillStyle = rnd() > .5 ? 'rgba(20,18,15,.06)' : 'rgba(255,255,250,.05)'; g.fillRect(rnd() * w, rnd() * h, 1 + rnd() * 2, 1 + rnd() * 2); }
}
function makeBG(x0, y0, x1, y1, PS) { const cv = document.createElement('canvas'); cv.width = Math.round((x1 - x0) * PS); cv.height = Math.round((y1 - y0) * PS); return { cv, ox: x0, oy: y0, PS, w: x1 - x0, h: y1 - y0 }; }
function withCanvas(bg, fn, grain = true) {
  const prev = T.g, oldB = T.BASE.slice(), oldL = T.S.lwScale, { PS, ox, oy } = bg;
  T.init(bg.cv); T.BASE.splice(0, 6, PS, 0, 0, PS, -ox * PS, -oy * PS); T.S.lwScale = PS; T.frame(0, { amp: 0 });
  const raw = () => T.g.setTransform(PS, 0, 0, PS, -ox * PS, -oy * PS);
  fn(T.g, raw); T.g.setTransform(1, 0, 0, 1, 0, 0);
  if (grain) paperGrain(T.g, bg.cv.width, bg.cv.height, 11);
  T.BASE.splice(0, 6, ...oldB); T.S.lwScale = oldL; T.init(prev.canvas);
}
// draw a cached layer for camera {x,y,z}; par scales both the pan and the zoom (0 = fixed to the screen)
export function drawLayer(sg, bg, cam, par = 1, alpha = 1, dy = 0) {
  const z = 1 + (cam.z - 1) * par, cx = 540 + (cam.x - 540) * par, cy = 960 + (cam.y - 960) * par;
  sg.save(); sg.globalAlpha = alpha; sg.setTransform(z, 0, 0, z, 540 - cx * z, 960 - cy * z + dy);
  sg.drawImage(bg.cv, bg.ox, bg.oy, bg.w, bg.h); sg.restore();
}

// —— shared bits ——
function skyBands(g, raw, x0, y0, x1, y1, top, bot, seed) {
  raw();
  const gr = g.createLinearGradient(0, y0, 0, y1); gr.addColorStop(0, top); gr.addColorStop(.55, mix(top, bot, .62)); gr.addColorStop(1, bot);
  g.fillStyle = gr; g.fillRect(x0, y0, x1 - x0, y1 - y0);
  const rnd = mulberry(seed * 7);
  g.save(); g.filter = 'blur(40px)';
  for (let i = 0; i < 60; i++) { const r = 80 + rnd() * 200; g.fillStyle = rnd() > .45 ? `rgba(255,253,245,${.04 + rnd() * .06})` : `rgba(30,28,25,${.03 + rnd() * .04})`; g.beginPath(); g.ellipse(x0 + rnd() * (x1 - x0), y0 + rnd() * (y1 - y0), r, r * (.3 + rnd() * .3), 0, 0, 7); g.fill(); }
  g.restore();
}
function mix(a, b, k) {
  const pa = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16)), pb = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16));
  return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * k).toString(16).padStart(2, '0')).join('');
}
// a rooftop water tank on stilts (origin = roof under its centre)
function waterTank(g, raw, x, y, k, col, seed) {
  for (const s of [-1, 1]) wash(rect(x + s * 22 * k - 2 * k, y - 46 * k, 4 * k, 46 * k), '#4E4C48', { seed, line: false, edge: 0 });
  wash(rect(x - 26 * k, y - 30 * k, 52 * k, 4 * k), '#4E4C48', { seed: seed + 1, line: false, edge: 0 });
  wash(rr(x - 30 * k, y - 104 * k, 60 * k, 60 * k, 6 * k), col, { seed: seed + 2, edge: .12, lw: 2 });
  raw(); g.strokeStyle = 'rgba(30,28,25,.35)'; g.lineWidth = 1.6 * k;
  for (const yy of [-90, -72, -56]) { g.beginPath(); g.moveTo(x - 30 * k, y + yy * k); g.lineTo(x + 30 * k, y + yy * k); g.stroke(); }
  wash([[x - 34 * k, y - 102 * k], [x, y - 134 * k], [x + 34 * k, y - 102 * k]], '#55534E', { seed: seed + 3, edge: .1, lw: 2 });
}

// —— WIDE: building specs shared by the day layer and the lit-window layer ——
function cityWide() {
  const rnd = mulberry(1930), far = [], near = [];
  for (let x = -320; x < 1400;) { const w = 40 + rnd() * 90, h = 40 + rnd() * 140 * (rnd() > .8 ? 1.5 : 1); far.push({ x, w, h, spire: rnd() > .86, step: rnd() > .55 }); x += w * (.7 + rnd() * .35); }
  for (let x = -320; x < 1400;) { const w = 110 + rnd() * 150, top = 1540 + rnd() * 150; near.push({ x, w, top, tank: rnd() > .45, tx: rnd(), chim: rnd() > .5, cx: rnd(), tone: rnd() }); x += w + 4 + rnd() * 10; }
  return { far, near };
}
const CW = cityWide();
export const NEAR = CW.near;      // main.js puts chimney smoke on these
export function paintWide() {
  const sky = makeBG(-400, -600, 1480, 2200, .6);
  withCanvas(sky, (g, raw) => skyBands(g, raw, -400, -600, 1480, 2200, '#9C9991', '#DCD9D0', 2));
  const far = makeBG(-400, 600, 1480, 2200, 1), farLit = makeBG(-400, 600, 1480, 2200, 1);
  const rnd = mulberry(77);
  withCanvas(far, (g, raw) => {
    // the rivers and the low far shore under the skyline
    wash(rect(-400, W_HORIZON - 6, 1880, 40), '#C6C3BA', { line: false, seed: 3, edge: .06 });
    for (const b of CW.far) {
      const y = W_HORIZON - b.h, col = '#ABA8A0';
      wash(rect(b.x, y, b.w, b.h + 30), col, { seed: b.x | 0, edge: .05, lw: 1.6, lineCol: '#77746D' });
      if (b.step) wash(rect(b.x + b.w * .2, y - b.h * .18, b.w * .6, b.h * .2), col, { seed: (b.x | 0) + 1, edge: .05, lw: 1.6, lineCol: '#77746D' });
      if (b.spire) wash([[b.x + b.w * .35, y], [b.x + b.w * .5, y - 90], [b.x + b.w * .65, y]], col, { seed: (b.x | 0) + 2, edge: .05, lw: 1.6, lineCol: '#77746D' });
      raw(); g.fillStyle = 'rgba(60,58,54,.22)';
      for (let yy = y + 10; yy < W_HORIZON + 20; yy += 14) for (let xx = b.x + 6; xx < b.x + b.w - 6; xx += 10) g.fillRect(xx, yy, 4, 6);
    }
    raw(); g.save(); g.filter = 'blur(18px)'; g.fillStyle = 'rgba(230,228,220,.45)'; g.fillRect(-400, W_HORIZON - 40, 1880, 120); g.restore();
  });
  withCanvas(farLit, (g, raw) => {
    raw();
    for (const b of CW.far) { const y = W_HORIZON - b.h; for (let yy = y + 10; yy < W_HORIZON + 20; yy += 14) for (let xx = b.x + 6; xx < b.x + b.w - 6; xx += 10) if (rnd() > .62) { g.fillStyle = 'rgba(255,250,232,.85)'; g.fillRect(xx, yy, 4, 6); } }
  }, false);
  const near = makeBG(-400, 1200, 1480, 2200, 1), nearLit = makeBG(-400, 1200, 1480, 2200, 1);
  withCanvas(near, (g, raw) => {
    for (const b of CW.near) {
      const col = mix('#7A776F', '#8E8B83', b.tone);
      wash(rect(b.x, b.top, b.w, 2200 - b.top), col, { seed: b.x | 0, edge: .14, lw: 2.4 });
      wash(rect(b.x - 4, b.top - 8, b.w + 8, 12), '#5E5C57', { seed: (b.x | 0) + 5, edge: .1, lw: 2 });   // cornice
      raw(); g.fillStyle = 'rgba(40,38,34,.4)';
      for (let yy = b.top + 26; yy < 2200; yy += 34) for (let xx = b.x + 12; xx < b.x + b.w - 16; xx += 24) g.fillRect(xx, yy, 11, 18);
      if (b.tank) waterTank(g, raw, b.x + 24 + b.tx * (b.w - 48), b.top - 6, .8, '#6B6963', b.x | 0);
      if (b.chim) wash(rect(b.x + 14 + b.cx * (b.w - 40), b.top - 40, 16, 34), '#55534E', { seed: (b.x | 0) + 9, edge: .1, lw: 2 });
    }
  });
  withCanvas(nearLit, (g, raw) => {
    raw();
    for (const b of CW.near) for (let yy = b.top + 26; yy < 2200; yy += 34) for (let xx = b.x + 12; xx < b.x + b.w - 16; xx += 24) if (rnd() > .55) { g.fillStyle = 'rgba(255,250,232,.9)'; g.fillRect(xx, yy, 11, 18); }
  }, false);
  return { sky, far, farLit, near, nearLit };
}

// —— TOP: what you see from the top of the steel ——
export function paintTop() {
  const bg = makeBG(-500, -1200, 1580, 2400, .7);
  withCanvas(bg, (g, raw) => {
    skyBands(g, raw, -500, -1200, 1580, T_HORIZON + 10, '#97948C', '#D8D5CC', 5);
    // the far shore, the rivers, the low boroughs
    wash(rect(-500, T_HORIZON - 30, 2080, 34), '#B9B6AE', { line: false, seed: 8, edge: .05 });
    const rnd = mulberry(5);
    raw(); g.fillStyle = 'rgba(120,118,112,.55)';
    for (let x = -500; x < 1580; x += 8 + rnd() * 18) { const h = 6 + rnd() * 26; g.fillRect(x, T_HORIZON - 4 - h, 6 + rnd() * 10, h); }
    wash(rect(-500, T_HORIZON + 4, 2080, 46), '#CFCCC3', { line: false, seed: 9, edge: .04 });      // river, catching the light
    raw(); g.strokeStyle = 'rgba(255,253,245,.35)'; g.lineWidth = 2;
    for (let i = 0; i < 40; i++) { const x = -500 + rnd() * 2080, y = T_HORIZON + 10 + rnd() * 36; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 20 + rnd() * 30, y); g.stroke(); }
    // rows of rooftops, nearer = bigger and darker
    for (let row = 0; row < 9; row++) {
      const y0 = T_HORIZON + 50 + Math.pow(row, 1.45) * 46, k = .35 + row * .16, col = mix('#BAB7AF', '#918E86', row / 8);
      for (let x = -520; x < 1600;) {
        const w = (60 + rnd() * 90) * k, h = (20 + rnd() * 50) * k;
        const hh = h * (.6 + rnd() * .9); wash(rect(x, y0 - hh, w, 2400 - y0 + hh), col, { seed: row * 100 + (x | 0), edge: .06, lw: .8 + row * .12, lineCol: '#6B6963' });
        raw(); g.fillStyle = 'rgba(255,253,245,.18)'; g.fillRect(x, y0 - hh, w, 3 * k);
        raw(); g.fillStyle = `rgba(40,38,34,${.08 + row * .015})`;
        for (let yy = y0 - hh + 12 * k; yy < y0 + 200; yy += 16 * k) for (let xx = x + 5 * k; xx < x + w - 8 * k; xx += 14 * k) g.fillRect(xx, yy, 5 * k, 6 * k);
        if (rnd() > .84 && row > 1) waterTank(g, raw, x + w * .5, y0 - hh, k * .7, mix('#9A978F', '#5E5C57', row / 8), row * 100 + (x | 0) + 50);
        x += w + rnd() * 6;
      }
    }
    // a haze band over the rooftops
    raw(); g.save(); g.filter = 'blur(30px)'; g.fillStyle = 'rgba(225,222,214,.45)'; g.fillRect(-500, T_HORIZON - 20, 2080, 260); g.restore();
  });
  return bg;
}

// —— STREET: the site on the left, the stone building on the right, the road, the near kerb ——
export const ST = { far: 1290, road0: 1300, road1: 1520, near: 1540, fence0: -200, fence1: 560, fenceTop: 960, gate0: 250, gate1: 520 };
export function paintStreet() {
  const bg = makeBG(-300, -500, 1380, 2100, .8);
  withCanvas(bg, (g, raw) => {
    skyBands(g, raw, -300, -500, 1380, 1300, '#9C9991', '#D2CFC6', 12);
    // the site: steel going up behind the hoarding (left)
    for (let y = ST.fenceTop + 20; y > -500; y -= 150) wash(rect(-300, y - 18, 860, 20), '#5E5C57', { seed: y | 0, edge: .1, lw: 2 });
    for (const x of [-120, 90, 300, 510]) wash(rect(x - 14, -500, 28, ST.fenceTop + 520), '#55534E', { seed: x + 7, edge: .12, lw: 2 });
    raw(); g.strokeStyle = 'rgba(40,38,34,.5)'; g.lineWidth = 3;
    for (let y = ST.fenceTop + 20; y > -350; y -= 300) for (const [x0, x1] of [[-120, 90], [300, 510]]) { g.beginPath(); g.moveTo(x0 + 14, y - 18); g.lineTo(x1 - 14, y - 150); g.moveTo(x1 - 14, y - 18); g.lineTo(x0 + 14, y - 150); g.stroke(); }
    g.fillStyle = 'rgba(200,198,190,.55)';
    for (let y = ST.fenceTop + 20; y > -500; y -= 150) for (const x of [-120, 90, 300, 510]) for (const d of [-8, 8]) { g.beginPath(); g.arc(x + d, y - 9, 2.6, 0, 7); g.fill(); }
    g.strokeStyle = 'rgba(30,28,25,.25)'; g.lineWidth = 2;
    for (const x of [-120, 90, 300, 510]) { g.beginPath(); g.moveTo(x - 6, -500); g.lineTo(x - 6, ST.fenceTop); g.stroke(); }
    // the stone building next door (right)
    wash(rect(560, -500, 840, ST.far + 500), '#A7A49C', { seed: 20, edge: .14, lw: 2.6 });
    raw(); g.strokeStyle = 'rgba(60,58,54,.18)'; g.lineWidth = 2;
    for (let y = -480; y < ST.far; y += 26) { g.beginPath(); g.moveTo(560, y); g.lineTo(1400, y); g.stroke(); }
    for (let y = -420; y < 900; y += 170) for (let x = 610; x < 1380; x += 150) {
      wash(rr(x, y, 78, 112, 4), '#4E4C48', { seed: x * 3 + y, edge: .1, lw: 2 });
      wash(rect(x - 8, y + 112, 94, 12), '#8A877F', { seed: x + y, edge: .1, lw: 1.8 });
      raw(); g.strokeStyle = 'rgba(200,198,190,.5)'; g.lineWidth = 3; g.beginPath(); g.moveTo(x + 39, y + 4); g.lineTo(x + 39, y + 108); g.moveTo(x + 4, y + 56); g.lineTo(x + 74, y + 56); g.stroke();
    }
    wash(rect(560, 900, 840, 26), '#8A877F', { seed: 31, edge: .12, lw: 2.2 });     // string course over the shop
    // the shop front + striped awning (no lettering)
    wash(rect(600, 990, 460, ST.far - 990), '#3B3A37', { seed: 32, edge: .1, lw: 2.2 });
    wash(rect(620, 1010, 200, 200), '#6E6B64', { seed: 33, edge: .1, lw: 2 });
    wash(rect(850, 1010, 190, 200), '#6E6B64', { seed: 34, edge: .1, lw: 2 });
    raw(); g.save(); g.filter = 'blur(8px)'; g.fillStyle = 'rgba(255,252,240,.18)'; g.fillRect(630, 1020, 400, 180); g.restore();
    const aw = [[580, 940], [1080, 940], [1110, 1010]]; for (let x = 1110; x >= 550; x -= 10) aw.push([x, 1010 + (Math.floor((x - 550) / 40) % 2 ? 0 : 10)]); aw.push([550, 1010]);
    wash(aw, '#C8C5BC', { seed: 35, edge: .1, lw: 2.4 });
    raw(); for (let x = 580; x < 1100; x += 80) { g.fillStyle = 'rgba(40,38,34,.45)'; g.beginPath(); g.moveTo(x, 940); g.lineTo(x + 40, 940); g.lineTo(x + 44, 1012); g.lineTo(x + 4, 1012); g.fill(); }
    // the hoarding (left): boards, three blank bills, the gate opening
    wash(rect(-300, ST.fenceTop, ST.gate0 + 300, ST.far - ST.fenceTop), '#8E8B83', { seed: 40, edge: .14, lw: 2.4 });
    wash(rect(ST.gate1, ST.fenceTop, ST.fence1 - ST.gate1, ST.far - ST.fenceTop), '#8E8B83', { seed: 41, edge: .14, lw: 2.4 });
    raw(); g.strokeStyle = 'rgba(40,38,34,.35)'; g.lineWidth = 2;
    for (let x = -300; x < ST.fence1; x += 34) if (x < ST.gate0 || x > ST.gate1) { g.beginPath(); g.moveTo(x, ST.fenceTop + 4); g.lineTo(x, ST.far); g.stroke(); }
    for (const [bx, by, bw, bh, s] of [[-150, 1020, 150, 190, 1], [40, 1050, 130, 160, 2]]) {
      wash(rect(bx, by, bw, bh), '#D6D3CA', { seed: 50 + s, edge: .1, lw: 2 });
      raw(); g.fillStyle = 'rgba(60,58,54,.35)'; g.fillRect(bx + 14, by + 16, bw - 28, 30); for (let yy = by + 64; yy < by + bh - 16; yy += 18) g.fillRect(bx + 14, yy, (bw - 28) * (.5 + .5 * ((yy / 18) % 2)), 7);
    }
    wash(rect(ST.gate0, ST.fenceTop + 30, ST.gate1 - ST.gate0, ST.far - ST.fenceTop - 30), '#4A4844', { seed: 42, edge: .2, lw: 2.4 });   // dark gateway into the site
    raw(); g.save(); g.filter = 'blur(14px)'; g.fillStyle = 'rgba(20,18,16,.35)'; g.fillRect(ST.gate0 + 20, ST.fenceTop + 60, ST.gate1 - ST.gate0 - 40, ST.far - ST.fenceTop - 60); g.restore();
    // far pavement, road (cobbles + tram rails), near kerb + pavement
    wash(rect(-300, ST.far, 1680, ST.road0 - ST.far + 4), '#B4B1A9', { seed: 60, edge: .08, lw: 2 });
    wash(rect(-300, ST.road0, 1680, ST.road1 - ST.road0), '#77746D', { seed: 61, line: false, edge: .08 });
    raw(); g.strokeStyle = 'rgba(30,28,25,.18)'; g.lineWidth = 1.5;
    const rnd = mulberry(62);
    for (let y = ST.road0 + 12; y < ST.road1; y += 16) for (let x = -300 + (y % 32); x < 1380; x += 30) { g.beginPath(); g.ellipse(x, y, 12, 5, 0, 0, 7); g.stroke(); }
    g.strokeStyle = 'rgba(220,218,210,.5)'; g.lineWidth = 4; for (const y of [1440, 1470]) { g.beginPath(); g.moveTo(-300, y); g.lineTo(1380, y); g.stroke(); }
    wash(rect(-300, ST.road1, 1680, 22), '#5E5C57', { seed: 63, edge: .1, lw: 2.2 });
    wash(rect(-300, ST.near, 1680, 2100 - ST.near), '#A29F97', { seed: 64, edge: .08, lw: 2 });
    raw(); g.strokeStyle = 'rgba(40,38,34,.25)'; g.lineWidth = 2;
    for (let x = -300; x < 1380; x += 140) { g.beginPath(); g.moveTo(x, ST.near); g.lineTo(x - 90, 2100); g.stroke(); }
    for (const y of [1680, 1860]) { g.beginPath(); g.moveTo(-300, y); g.lineTo(1380, y); g.stroke(); }
    // lamppost on the far pavement + a fire hydrant
    wash(rect(1006, 700, 14, ST.far - 700), '#3B3A37', { seed: 70, edge: .1, lw: 2 });
    wash(rr(990, 660, 46, 50, 10), '#55534E', { seed: 71, edge: .1, lw: 2 });
    wash(ell(1013, 690, 14, 12, 16), '#E2DFD6', { seed: 72, edge: .1, lw: 1.6 });
    wash(rr(80, 1236, 30, 54, 8), '#5E5C57', { seed: 73, edge: .1, lw: 2 }); wash(ell(95, 1236, 18, 8, 12), '#5E5C57', { seed: 74, edge: .1, lw: 2 });
    raw(); g.save(); g.filter = 'blur(12px)'; g.fillStyle = 'rgba(20,18,16,.3)'; g.fillRect(-300, ST.far - 6, 1680, 18); g.restore();
  });
  return bg;
}
