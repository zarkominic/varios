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
  // extras from their own stream (the layout above stays as it was)
  const r2 = mulberry(4471);
  for (const b of far) { b.tank = r2() > .6; b.chim = r2() > .62; b.cxk = r2(); b.dome = !b.spire && b.h > 120 && r2() > .6; b.mast = r2() > .8; }
  for (const b of near) { b.fe = r2() > .45; b.bulk = r2() > .35; b.bx = r2(); b.sky = r2() > .5; b.flag = r2() > .8; b.brick = r2() > .4; }
  return { far, near };
}
const CW = cityWide();
export const NEAR = CW.near;      // main.js puts chimney smoke on these
// far chimneys (world coords of the far layer, parallax .45) — main.js puts thin smoke on them
export const FAR_CHIM = CW.far.filter(b => b.chim && !b.spire).map(b => [b.x + 8 + b.cxk * (b.w - 24), W_HORIZON - b.h - (b.step ? b.h * .18 : 0) - 16]);
// windows of the near blocks that flicker at night (main.js, parallax 1.15): [x, y, w, h, seed]
export const FLICK = [];
// a fire escape on a near block face: platforms under every other window row, ladders between them
function fireEscape(g, raw, x, top, w) {
  raw(); g.strokeStyle = 'rgba(30,28,25,.7)'; g.lineWidth = 2.2;
  for (let yy = top + 26 + 34 * 2 - 6, i = 0; yy < 2200; yy += 68, i++) {
    g.beginPath(); g.moveTo(x, yy); g.lineTo(x + w, yy); g.stroke();                       // platform
    g.lineWidth = 1.2; g.beginPath(); g.moveTo(x, yy - 14); g.lineTo(x + w, yy - 14); g.stroke();   // rail
    for (let xx = x; xx <= x + w; xx += 10) { g.beginPath(); g.moveTo(xx, yy); g.lineTo(xx, yy - 14); g.stroke(); }
    g.lineWidth = 1.8; g.beginPath(); const a = i % 2 ? x + 6 : x + w - 6, b = i % 2 ? x + w - 10 : x + 10; g.moveTo(a, yy); g.lineTo(b, yy + 68); g.stroke();   // stair
    g.lineWidth = 2.2;
  }
}
export function paintWide() {
  const sky = makeBG(-400, -600, 1480, 2200, .6);
  withCanvas(sky, (g, raw) => {
    skyBands(g, raw, -400, -600, 1480, 2200, '#9C9991', '#DCD9D0', 2);
    // long soft stratus streaks + a pale glow low in the sky (the far city's haze)
    const rs = mulberry(23); raw(); g.save(); g.filter = 'blur(14px)';
    for (let i = 0; i < 14; i++) { const y = -500 + rs() * 1700, x = -400 + rs() * 1700, L = 300 + rs() * 600; g.fillStyle = `rgba(255,253,245,${.07 + rs() * .07})`; g.beginPath(); g.ellipse(x, y, L / 2, 10 + rs() * 16, -.04, 0, 7); g.fill(); g.fillStyle = 'rgba(40,38,34,.05)'; g.beginPath(); g.ellipse(x + 20, y + 22, L / 2.4, 6, -.04, 0, 7); g.fill(); }
    g.filter = 'blur(60px)'; g.fillStyle = 'rgba(245,243,236,.35)'; g.fillRect(-400, 1050, 1880, 300); g.restore();
  });
  const far = makeBG(-400, 600, 1480, 2200, 1), farLit = makeBG(-400, 600, 1480, 2200, 1);
  const rnd = mulberry(77);
  withCanvas(far, (g, raw) => {
    // the rivers and the low far shore under the skyline
    wash(rect(-400, W_HORIZON - 6, 1880, 40), '#C6C3BA', { line: false, seed: 3, edge: .06 });
    raw(); g.strokeStyle = 'rgba(255,253,245,.45)'; g.lineWidth = 1.5;
    const rw = mulberry(31); for (let i = 0; i < 50; i++) { const x = -400 + rw() * 1880, y = W_HORIZON + 2 + rw() * 30; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 10 + rw() * 26, y); g.stroke(); }
    // the back row: the far boroughs, small and pale in the haze
    const rb = mulberry(41);
    for (let x = -400; x < 1480;) {
      const w = 26 + rb() * 60, h = 18 + rb() * 80 * (rb() > .85 ? 1.8 : 1);
      wash(rect(x, W_HORIZON - h - 4, w, h + 10), '#BFBCB4', { seed: 900 + (x | 0), edge: .03, lw: 1, lineCol: '#9E9B93' });
      if (rb() > .8) wash([[x + w * .3, W_HORIZON - h - 4], [x + w * .5, W_HORIZON - h - 40], [x + w * .7, W_HORIZON - h - 4]], '#BFBCB4', { seed: 950 + (x | 0), edge: .03, lw: 1, lineCol: '#9E9B93' });
      raw(); g.fillStyle = 'rgba(90,88,84,.13)'; for (let yy = W_HORIZON - h + 6; yy < W_HORIZON; yy += 10) for (let xx = x + 4; xx < x + w - 4; xx += 7) g.fillRect(xx, yy, 3, 4);
      x += w * (.75 + rb() * .3);
    }
    raw(); g.save(); g.filter = 'blur(12px)'; g.fillStyle = 'rgba(232,230,222,.5)'; g.fillRect(-400, W_HORIZON - 70, 1880, 80); g.restore();
    // a plain suspension bridge low on the left, over the river
    raw(); g.strokeStyle = 'rgba(95,93,88,.8)';
    const by = W_HORIZON + 14, t0 = -300, t1 = 40;
    g.lineWidth = 3; g.beginPath(); g.moveTo(-400, by); g.lineTo(260, by); g.stroke();
    for (const tx of [t0, t1]) { g.fillStyle = '#9A978F'; g.fillRect(tx - 7, by - 92, 14, 96); g.fillStyle = 'rgba(255,253,245,.35)'; g.fillRect(tx - 7, by - 92, 4, 96); }
    g.lineWidth = 1.6; g.beginPath(); g.moveTo(-400, by - 40); g.quadraticCurveTo((-400 + t0) / 2, by - 30, t0, by - 90); g.quadraticCurveTo((t0 + t1) / 2, by + 30, t1, by - 90); g.quadraticCurveTo(t1 + 110, by - 30, 260, by); g.stroke();
    g.lineWidth = .9; for (let x = t0 + 14; x < t1; x += 14) { const u = (x - t0) / (t1 - t0); g.beginPath(); g.moveTo(x, by - 90 + 240 * u * (1 - u)); g.lineTo(x, by); g.stroke(); }
    // the far skyline: setbacks, cornices, a shadow side, tanks, chimneys, domes and masts
    for (const b of CW.far) {
      const y = W_HORIZON - b.h, col = '#ABA8A0';
      wash(rect(b.x, y, b.w, b.h + 30), col, { seed: b.x | 0, edge: .05, lw: 1.6, lineCol: '#77746D' });
      if (b.step) wash(rect(b.x + b.w * .2, y - b.h * .18, b.w * .6, b.h * .2), col, { seed: (b.x | 0) + 1, edge: .05, lw: 1.6, lineCol: '#77746D' });
      if (b.spire) wash([[b.x + b.w * .35, y], [b.x + b.w * .5, y - 90], [b.x + b.w * .65, y]], col, { seed: (b.x | 0) + 2, edge: .05, lw: 1.6, lineCol: '#77746D' });
      if (b.dome) wash([...arc(b.x + b.w * .5, y, b.w * .26, b.w * .3, Math.PI, Math.PI * 2, 10)], col, { seed: (b.x | 0) + 3, edge: .05, lw: 1.4, lineCol: '#77746D' });
      raw();
      g.fillStyle = 'rgba(60,58,54,.16)'; g.fillRect(b.x + b.w * .68, y, b.w * .32, b.h + 30);                 // shadow side
      g.fillStyle = 'rgba(80,78,72,.55)'; g.fillRect(b.x - 2, y, b.w + 4, 3);                               // cornice
      g.fillStyle = 'rgba(60,58,54,.22)';
      for (let yy = y + 10; yy < W_HORIZON + 20; yy += 14) for (let xx = b.x + 6; xx < b.x + b.w - 6; xx += 10) g.fillRect(xx, yy, 4, 6);
      g.fillStyle = 'rgba(255,253,245,.25)'; g.fillRect(b.x + 1, y + 2, 2, b.h);                             // lit edge
      const ty = y - (b.step ? b.h * .18 : 0);
      if (b.tank && !b.spire && !b.dome) waterTank(g, raw, b.x + 10 + b.cxk * (b.w - 20), ty, .32, '#8E8B83', (b.x | 0) + 7);
      raw();
      if (b.chim && !b.spire) { g.fillStyle = '#86837B'; g.fillRect(b.x + 4 + b.cxk * (b.w - 24), ty - 16, 8, 18); }
      if (b.mast) { g.strokeStyle = 'rgba(80,78,72,.8)'; g.lineWidth = 1.4; g.beginPath(); g.moveTo(b.x + b.w * .5, ty); g.lineTo(b.x + b.w * .5, ty - 40); g.stroke(); }
    }
    raw(); g.save(); g.filter = 'blur(18px)'; g.fillStyle = 'rgba(230,228,220,.45)'; g.fillRect(-400, W_HORIZON - 40, 1880, 120); g.restore();
  });
  withCanvas(farLit, (g, raw) => {
    raw();
    for (const b of CW.far) {
      const y = W_HORIZON - b.h, dense = .35 + rnd() * .45;
      for (let yy = y + 10; yy < W_HORIZON + 20; yy += 14) { const rowOn = rnd() > .25; for (let xx = b.x + 6; xx < b.x + b.w - 6; xx += 10) if (rowOn && rnd() < dense) { g.fillStyle = rnd() > .3 ? 'rgba(255,250,232,.85)' : 'rgba(255,238,205,.55)'; g.fillRect(xx, yy, 4, 6); } }
    }
  }, false);
  const near = makeBG(-400, 1200, 1480, 2200, 1), nearLit = makeBG(-400, 1200, 1480, 2200, 1);
  withCanvas(near, (g, raw) => {
    for (const b of CW.near) {
      const col = mix('#7A776F', '#8E8B83', b.tone), rr_ = mulberry(b.x | 0);
      wash(rect(b.x, b.top, b.w, 2200 - b.top), col, { seed: b.x | 0, edge: .14, lw: 2.4 });
      raw();
      if (b.brick) { g.strokeStyle = 'rgba(40,38,34,.1)'; g.lineWidth = 1; for (let yy = b.top + 8; yy < 2200; yy += 7) { g.beginPath(); g.moveTo(b.x, yy); g.lineTo(b.x + b.w, yy); g.stroke(); } }
      g.fillStyle = 'rgba(30,28,25,.16)'; g.fillRect(b.x + b.w * .72, b.top, b.w * .28, 2200 - b.top);       // shadow side
      g.fillStyle = 'rgba(255,253,245,.12)'; g.fillRect(b.x + 3, b.top + 6, 3, 2200 - b.top);
      wash(rect(b.x - 4, b.top - 8, b.w + 8, 12), '#5E5C57', { seed: (b.x | 0) + 5, edge: .1, lw: 2 });   // cornice
      raw(); g.fillStyle = 'rgba(40,38,34,.35)'; for (let xx = b.x; xx < b.x + b.w; xx += 9) g.fillRect(xx, b.top + 4, 5, 5);   // dentils
      // windows: dark panes, a few catching the sky, shades pulled to different heights, lintels
      for (let yy = b.top + 26; yy < 2200; yy += 34) for (let xx = b.x + 12; xx < b.x + b.w - 16; xx += 24) {
        const r = rr_();
        g.fillStyle = 'rgba(40,38,34,.42)'; g.fillRect(xx, yy, 11, 18);
        if (r > .8) { g.fillStyle = 'rgba(235,233,226,.35)'; g.fillRect(xx, yy, 11, 18); }
        else if (r > .45) { g.fillStyle = 'rgba(200,198,190,.45)'; g.fillRect(xx, yy, 11, 18 * (r - .45) * 2.4); }
        g.fillStyle = 'rgba(230,228,220,.25)'; g.fillRect(xx - 1, yy - 3, 13, 2);
        if (yy < 2000 && rr_() > .93) FLICK.push([xx, yy, 11, 18, FLICK.length]);
      }
      if (b.fe) fireEscape(g, raw, b.x + 10 + (b.w > 190 ? b.w * .5 : 0), b.top, 58);
      if (b.bulk) { const bx = b.x + 16 + b.bx * (b.w - 70); wash(rect(bx, b.top - 40, 46, 34), '#6B6963', { seed: (b.x | 0) + 11, edge: .1, lw: 1.8 }); raw(); g.fillStyle = 'rgba(30,28,25,.55)'; g.fillRect(bx + 16, b.top - 30, 14, 24); }
      if (b.sky) { const sx = b.x + b.w * .55; raw(); g.fillStyle = '#5E5C57'; g.beginPath(); g.moveTo(sx, b.top - 6); g.lineTo(sx + 14, b.top - 22); g.lineTo(sx + 44, b.top - 22); g.lineTo(sx + 58, b.top - 6); g.fill(); g.strokeStyle = 'rgba(220,218,210,.5)'; g.lineWidth = 1.2; for (let k = 1; k < 4; k++) { g.beginPath(); g.moveTo(sx + 14 * k, b.top - 6); g.lineTo(sx + 14 * k, b.top - 21); g.stroke(); } }
      if (b.tank) waterTank(g, raw, b.x + 24 + b.tx * (b.w - 48), b.top - 6, .8, '#6B6963', b.x | 0);
      if (b.chim) wash(rect(b.x + 14 + b.cx * (b.w - 40), b.top - 40, 16, 34), '#55534E', { seed: (b.x | 0) + 9, edge: .1, lw: 2 });
      if (b.flag) { raw(); const fx = b.x + b.w - 20; g.strokeStyle = '#3B3A37'; g.lineWidth = 2; g.beginPath(); g.moveTo(fx, b.top - 8); g.lineTo(fx, b.top - 90); g.stroke(); }
    }
  });
  withCanvas(nearLit, (g, raw) => {
    raw();
    for (const b of CW.near) {
      const dense = .3 + rnd() * .5;
      for (let yy = b.top + 26; yy < 2200; yy += 34) { const floorOn = rnd() > .3; for (let xx = b.x + 12; xx < b.x + b.w - 16; xx += 24) if (floorOn && rnd() < dense) {
        const sh = rnd(); g.fillStyle = rnd() > .35 ? 'rgba(255,250,232,.9)' : 'rgba(255,236,200,.6)';
        g.fillRect(xx, yy + (sh > .6 ? 18 * (sh - .6) * 1.8 : 0), 11, 18 - (sh > .6 ? 18 * (sh - .6) * 1.8 : 0));
      } }
    }
  }, false);
  const m = paintMid();
  return { sky, far, farLit, mid: m.day, midLit: m.lit, near, nearLit };
}


// —— WIDE mid layer (parallax .7): a few tall setback towers of the day framing the site, left and right ——
const MIDB = [
  { x: -130, w: 140, h: 250, tiers: 2, crown: 'flat' }, { x: 40, w: 150, h: 340, tiers: 3, crown: 'spire' },
  { x: 196, w: 96, h: 210, tiers: 2, crown: 'tank' }, { x: 760, w: 110, h: 240, tiers: 2, crown: 'tank' },
  { x: 880, w: 140, h: 370, tiers: 3, crown: 'spire' }, { x: 1040, w: 130, h: 280, tiers: 3, crown: 'dome' },
];
const MID_BASE = W_HORIZON + 40;
function midShape(b) {
  const tiers = []; let y = MID_BASE, w = b.w, x = b.x, hRest = b.h;
  for (let i = 0; i < b.tiers; i++) { const th = i === 0 ? b.h * .55 : hRest / (b.tiers - i) * (i === b.tiers - 1 ? 1 : .9); tiers.push({ x, y: y - th, w, h: th }); y -= th; hRest -= th; x += w * .14; w *= .72; }
  return tiers;
}
export function paintMid() {
  const day = makeBG(-400, 800, 1480, 1500, 1), lit = makeBG(-400, 800, 1480, 1500, 1);
  const rl = mulberry(512);
  withCanvas(day, (g, raw) => {
    for (const b of MIDB) {
      const tiers = midShape(b), col = '#A09D95';
      tiers.forEach((tr, i) => {
        wash(rect(tr.x, tr.y, tr.w, tr.h + 4), col, { seed: (b.x | 0) * 3 + i, edge: .08, lw: 1.8, lineCol: '#6B6963' });
        raw(); g.fillStyle = 'rgba(40,38,34,.18)'; g.fillRect(tr.x + tr.w * .66, tr.y, tr.w * .34, tr.h + 4);
        g.fillStyle = 'rgba(255,253,245,.22)'; g.fillRect(tr.x + 2, tr.y + 3, 3, tr.h);
        g.fillStyle = 'rgba(70,68,62,.6)'; g.fillRect(tr.x - 3, tr.y - 2, tr.w + 6, 4);
        g.fillStyle = 'rgba(50,48,44,.3)';
        for (let yy = tr.y + 10; yy < tr.y + tr.h - 4; yy += 13) for (let xx = tr.x + 6; xx < tr.x + tr.w - 6; xx += 9) g.fillRect(xx, yy, 4, 7);
        // vertical piers (the art-deco stripes)
        g.fillStyle = 'rgba(255,253,245,.08)'; for (let xx = tr.x + 4; xx < tr.x + tr.w - 4; xx += 18) g.fillRect(xx, tr.y + 4, 2, tr.h - 6);
      });
      const tp = tiers[tiers.length - 1], cx = tp.x + tp.w / 2;
      if (b.crown === 'spire') { wash([[cx - tp.w * .28, tp.y], [cx - 4, tp.y - 110], [cx + 4, tp.y - 110], [cx + tp.w * .28, tp.y]], col, { seed: (b.x | 0) + 70, edge: .06, lw: 1.6, lineCol: '#6B6963' }); raw(); g.strokeStyle = '#6B6963'; g.lineWidth = 1.4; g.beginPath(); g.moveTo(cx, tp.y - 110); g.lineTo(cx, tp.y - 150); g.stroke(); }
      else if (b.crown === 'dome') wash([...arc(cx, tp.y, tp.w * .34, tp.w * .38, Math.PI, Math.PI * 2, 12)], col, { seed: (b.x | 0) + 71, edge: .06, lw: 1.6, lineCol: '#6B6963' });
      else if (b.crown === 'tank') waterTank(g, raw, cx, tp.y, .45, '#87847C', (b.x | 0) + 72);
      raw(); g.save(); g.filter = 'blur(16px)'; g.fillStyle = 'rgba(232,230,222,.35)'; g.fillRect(b.x - 40, MID_BASE - 140, b.w + 80, 160); g.restore();
    }
  });
  withCanvas(lit, (g, raw) => {
    raw();
    for (const b of MIDB) for (const tr of midShape(b)) {
      const dense = .3 + rl() * .4;
      for (let yy = tr.y + 10; yy < tr.y + tr.h - 4; yy += 13) { const on = rl() > .3; for (let xx = tr.x + 6; xx < tr.x + tr.w - 6; xx += 9) if (on && rl() < dense) { g.fillStyle = rl() > .3 ? 'rgba(255,250,232,.85)' : 'rgba(255,236,200,.5)'; g.fillRect(xx, yy, 4, 7); } }
    }
  }, false);
  return { day, lit };
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
    // the far towers on the far shore, pale in the haze (setbacks, a spire or two, tanks)
    const rf = mulberry(19);
    for (let x = -480; x < 1580;) {
      const w = 24 + rf() * 40, h = rf() > .7 ? 70 + rf() * 110 : 20 + rf() * 50, y = T_HORIZON - 4 - h;
      wash(rect(x, y, w, h + 6), '#B3B0A8', { seed: 300 + (x | 0), edge: .03, lw: .9, lineCol: '#8E8B83' });
      raw(); g.fillStyle = 'rgba(60,58,54,.12)'; g.fillRect(x + w * .65, y, w * .35, h + 4);
      g.fillStyle = 'rgba(80,78,72,.18)'; for (let yy = y + 6; yy < T_HORIZON - 6; yy += 8) for (let xx = x + 3; xx < x + w - 3; xx += 6) g.fillRect(xx, yy, 2.5, 3.5);
      if (h > 90 && rf() > .5) wash([[x + w * .3, y], [x + w * .5, y - 46], [x + w * .7, y]], '#B3B0A8', { seed: 320 + (x | 0), edge: .03, lw: .9, lineCol: '#8E8B83' });
      else if (h > 40 && rf() > .6) { raw(); g.fillStyle = '#9E9B93'; g.fillRect(x + w * .4, y - 14, 10, 12); g.beginPath(); g.moveTo(x + w * .4 - 2, y - 14); g.lineTo(x + w * .4 + 5, y - 20); g.lineTo(x + w * .4 + 12, y - 14); g.fill(); }
      x += w + rf() * 30;
    }
    raw(); g.save(); g.filter = 'blur(10px)'; g.fillStyle = 'rgba(226,223,215,.45)'; g.fillRect(-500, T_HORIZON - 110, 2080, 110); g.restore();
    wash(rect(-500, T_HORIZON + 4, 2080, 46), '#CFCCC3', { line: false, seed: 9, edge: .04 });      // river, catching the light
    // a plain truss bridge far off to the right, and little boats with their wakes on the river
    raw(); g.strokeStyle = 'rgba(110,108,102,.75)'; g.lineWidth = 2; g.beginPath(); g.moveTo(900, T_HORIZON + 2); g.lineTo(1580, T_HORIZON + 2); g.stroke();
    g.lineWidth = 1; for (let x = 920; x < 1580; x += 16) { g.beginPath(); g.moveTo(x, T_HORIZON + 2); g.lineTo(x + 8, T_HORIZON - 16); g.lineTo(x + 16, T_HORIZON + 2); g.stroke(); }
    g.beginPath(); g.moveTo(920, T_HORIZON - 16); g.lineTo(1580, T_HORIZON - 16); g.stroke();
    for (const [bx, by, k] of [[-260, T_HORIZON + 22, 1], [380, T_HORIZON + 34, 1.3], [760, T_HORIZON + 16, .8]]) {
      g.fillStyle = '#6B6963'; g.beginPath(); g.moveTo(bx - 22 * k, by); g.lineTo(bx + 26 * k, by); g.lineTo(bx + 20 * k, by + 6 * k); g.lineTo(bx - 18 * k, by + 6 * k); g.fill();
      g.fillRect(bx - 8 * k, by - 7 * k, 14 * k, 7 * k); g.fillRect(bx - 2 * k, by - 15 * k, 4 * k, 8 * k);
      g.strokeStyle = 'rgba(255,253,245,.6)'; g.lineWidth = 1.4; g.beginPath(); g.moveTo(bx - 24 * k, by + 5 * k); g.lineTo(bx - 70 * k, by + 9 * k); g.moveTo(bx - 24 * k, by + 2 * k); g.lineTo(bx - 60 * k, by - 1 * k); g.stroke();
    }
    raw(); g.strokeStyle = 'rgba(255,253,245,.35)'; g.lineWidth = 2;
    for (let i = 0; i < 40; i++) { const x = -500 + rnd() * 2080, y = T_HORIZON + 10 + rnd() * 36; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 20 + rnd() * 30, y); g.stroke(); }
    // rows of rooftops, nearer = bigger and darker
    for (let row = 0; row < 9; row++) {
      const y0 = T_HORIZON + 50 + Math.pow(row, 1.45) * 46, k = .35 + row * .16, col = mix('#BAB7AF', '#918E86', row / 8);
      for (let x = -520; x < 1600;) {
        const w = (60 + rnd() * 90) * k, h = (20 + rnd() * 50) * k;
        const hh = h * (.6 + rnd() * .9); wash(rect(x, y0 - hh, w, 2400 - y0 + hh), col, { seed: row * 100 + (x | 0), edge: .06, lw: .8 + row * .12, lineCol: '#6B6963' });
        raw(); g.fillStyle = 'rgba(255,253,245,.18)'; g.fillRect(x, y0 - hh, w, 3 * k);
        g.fillStyle = `rgba(40,38,34,${.07 + row * .012})`; g.fillRect(x + w * .7, y0 - hh, w * .3, 2400 - y0 + hh);          // shadow side
        if (rnd() > .55 && row > 0) { g.fillStyle = mix('#8E8B83', '#55534E', row / 8); g.fillRect(x + w * (.15 + rnd() * .6), y0 - hh - 12 * k, 6 * k, 12 * k); }   // chimney
        if (rnd() > .8 && row > 2) { g.fillStyle = mix('#A7A49C', '#6B6963', row / 8); g.fillRect(x + w * .2, y0 - hh - 10 * k, w * .3, 10 * k); }       // stair bulkhead
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
    // the next blocks over, seen through the bare steel: pale, hazy, windowed
    for (const [bx, bw, bt, tone] of [[-320, 230, 120, '#B9B6AE'], [-80, 170, -120, '#AFACA4'], [100, 210, 260, '#B5B2AA'], [320, 250, 20, '#ACA9A1']]) {
      wash(rect(bx, bt, bw, ST.fenceTop - bt + 40), tone, { seed: 500 + bx, edge: .05, lw: 1.4, lineCol: '#8E8B83' });
      raw(); g.fillStyle = 'rgba(60,58,54,.16)'; g.fillRect(bx + bw * .7, bt, bw * .3, ST.fenceTop - bt + 40);
      g.fillStyle = 'rgba(70,68,62,.24)'; for (let yy = bt + 24; yy < ST.fenceTop; yy += 46) for (let xx = bx + 16; xx < bx + bw - 24; xx += 34) g.fillRect(xx, yy, 16, 26);
      g.fillStyle = 'rgba(80,78,72,.5)'; g.fillRect(bx - 4, bt - 6, bw + 8, 8);
      if (bw > 200) waterTank(g, raw, bx + bw * .7, bt - 4, .7, '#9A978F', 510 + bx);
    }
    raw(); g.save(); g.filter = 'blur(20px)'; g.fillStyle = 'rgba(225,222,214,.35)'; g.fillRect(-300, -500, 860, 1500); g.restore();
    // the site: steel going up behind the hoarding (left)
    for (let y = ST.fenceTop + 20; y > -500; y -= 150) wash(rect(-300, y - 18, 860, 20), '#5E5C57', { seed: y | 0, edge: .1, lw: 2 });
    for (const x of [-120, 90, 300, 510]) wash(rect(x - 14, -500, 28, ST.fenceTop + 520), '#55534E', { seed: x + 7, edge: .12, lw: 2 });
    raw(); g.strokeStyle = 'rgba(40,38,34,.5)'; g.lineWidth = 3;
    for (let y = ST.fenceTop + 20; y > -350; y -= 300) for (const [x0, x1] of [[-120, 90], [300, 510]]) { g.beginPath(); g.moveTo(x0 + 14, y - 18); g.lineTo(x1 - 14, y - 150); g.moveTo(x1 - 14, y - 18); g.lineTo(x0 + 14, y - 150); g.stroke(); }
    g.fillStyle = 'rgba(200,198,190,.55)';
    for (let y = ST.fenceTop + 20; y > -500; y -= 150) for (const x of [-120, 90, 300, 510]) for (const d of [-8, 8]) { g.beginPath(); g.arc(x + d, y - 9, 2.6, 0, 7); g.fill(); }
    g.strokeStyle = 'rgba(30,28,25,.25)'; g.lineWidth = 2;
    for (const x of [-120, 90, 300, 510]) { g.beginPath(); g.moveTo(x - 6, -500); g.lineTo(x - 6, ST.fenceTop); g.stroke(); }
    // a guy derrick on the site steel: its boom reaches out over the street (the hook hangs from its tip)
    const lat = (ax, ay, bx, by, w, lw) => { const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy), nx = -dy / L * w / 2, ny = dx / L * w / 2, n = Math.round(L / (w * 1.1));
      g.lineWidth = lw * 1.6; for (const s_ of [-1, 1]) { g.beginPath(); g.moveTo(ax + nx * s_, ay + ny * s_); g.lineTo(bx + nx * s_, by + ny * s_); g.stroke(); }
      g.lineWidth = lw; g.beginPath(); for (let i = 0; i <= n; i++) { const u = i / n, s_ = i % 2 ? 1 : -1; g.lineTo(ax + dx * u + nx * s_, ay + dy * u + ny * s_); } g.stroke(); };
    g.strokeStyle = 'rgba(40,38,34,.75)';
    lat(200, 362, 200, -500, 30, 1.6);                     // mast
    lat(200, 346, 571, -560, 24, 1.4);                     // boom up to the hook's tip
    g.lineWidth = 1.4; g.beginPath(); g.moveTo(200, -480); g.lineTo(571, -560); g.stroke();
    g.fillStyle = '#4E4C48'; g.beginPath(); g.ellipse(200, 358, 30, 8, 0, 0, 7); g.fill();
    // planks and a tarp on the site floors, a few hanging chains
    g.fillStyle = 'rgba(200,198,190,.55)'; for (let y = ST.fenceTop + 2; y > -500; y -= 150) g.fillRect(-300, y - 24, 860, 6);
    g.strokeStyle = 'rgba(30,28,25,.45)'; g.lineWidth = 1.6;
    for (const [cx, cy, L] of [[-40, 470, 90], [410, 170, 120], [150, -130, 70]]) { g.beginPath(); for (let i = 0; i <= 10; i++) g.lineTo(cx + Math.sin(i) * 2, cy + i * L / 10); g.stroke(); g.beginPath(); g.arc(cx, cy + L + 8, 7, -.5, Math.PI + .5, false); g.stroke(); }
    // the stone building next door (right)
    wash(rect(560, -500, 840, ST.far + 500), '#A7A49C', { seed: 20, edge: .14, lw: 2.6 });
    raw(); g.strokeStyle = 'rgba(60,58,54,.18)'; g.lineWidth = 2;
    for (let y = -480; y < ST.far; y += 26) { g.beginPath(); g.moveTo(560, y); g.lineTo(1400, y); g.stroke(); }
    for (let y = -420; y < 900; y += 170) for (let x = 610; x < 1380; x += 150) {
      wash(rr(x, y, 78, 112, 4), '#4E4C48', { seed: x * 3 + y, edge: .1, lw: 2 });
      wash(rect(x - 8, y + 112, 94, 12), '#8A877F', { seed: x + y, edge: .1, lw: 1.8 });
      raw();
      const rs = mulberry(x * 7 + y), sh = rs();
      if (sh > .25) { g.fillStyle = sh > .7 ? 'rgba(226,223,214,.75)' : 'rgba(170,167,159,.75)'; g.fillRect(x + 3, y + 3, 72, (sh - .2) * 100); g.fillStyle = 'rgba(40,38,34,.5)'; g.fillRect(x + 34, y + 3 + (sh - .2) * 100, 10, 3); }
      else { g.fillStyle = 'rgba(255,253,245,.12)'; g.beginPath(); g.moveTo(x + 10, y + 100); g.lineTo(x + 60, y + 8); g.lineTo(x + 72, y + 8); g.lineTo(x + 22, y + 100); g.fill(); }
      if (rs() > .7) { g.fillStyle = 'rgba(200,198,190,.6)'; g.beginPath(); g.moveTo(x + 4, y + 4); g.quadraticCurveTo(x + 26, y + 50, x + 8, y + 108); g.lineTo(x + 4, y + 108); g.fill(); g.beginPath(); g.moveTo(x + 74, y + 4); g.quadraticCurveTo(x + 52, y + 50, x + 70, y + 108); g.lineTo(x + 74, y + 108); g.fill(); }
      g.strokeStyle = 'rgba(200,198,190,.5)'; g.lineWidth = 3; g.beginPath(); g.moveTo(x + 39, y + 4); g.lineTo(x + 39, y + 108); g.moveTo(x + 4, y + 56); g.lineTo(x + 74, y + 56); g.stroke();
      g.fillStyle = 'rgba(70,68,62,.45)'; g.fillRect(x - 6, y - 14, 90, 10);                       // lintel
      for (let k = 0; k < 5; k++) { g.fillStyle = 'rgba(255,253,245,.18)'; g.fillRect(x - 4 + k * 18, y - 13, 12, 3); }
      if (rs() > .78 && y > -100) { g.fillStyle = '#5E5C57'; g.fillRect(x - 4, y + 118, 86, 16); g.fillStyle = 'rgba(230,228,220,.7)'; for (let k = 0; k < 6; k++) { g.beginPath(); g.arc(x + 6 + k * 14, y + 114, 6, 0, 7); g.fill(); } }   // a window box
    }
    // the fire escape on the right-hand bay
    g.strokeStyle = 'rgba(25,24,22,.85)';
    for (let y = -80; y < 900; y += 170) {
      const py = y + 128;
      g.lineWidth = 3; g.beginPath(); g.moveTo(880, py); g.lineTo(1010, py); g.stroke();
      g.lineWidth = 1.6; g.beginPath(); g.moveTo(880, py - 34); g.lineTo(1010, py - 34); g.stroke();
      for (let xx = 884; xx <= 1010; xx += 12) { g.beginPath(); g.moveTo(xx, py); g.lineTo(xx, py - 34); g.stroke(); }
      g.lineWidth = 1.2; g.beginPath(); g.moveTo(880, py); g.lineTo(900, py + 26); g.moveTo(1010, py); g.lineTo(990, py + 26); g.stroke();
      if (y + 170 < 900) { g.lineWidth = 2; const a = (y / 170) % 2 ? 900 : 990, b = (y / 170) % 2 ? 990 : 900; g.beginPath(); g.moveTo(a, py); g.lineTo(b, py + 170); g.moveTo(a + (b > a ? -8 : 8), py); g.lineTo(b + (b > a ? -8 : 8), py + 170); g.stroke(); g.lineWidth = 1.2; for (let k = 1; k < 10; k++) { const u = k / 10; g.beginPath(); g.moveTo(a + (b - a) * u - 4, py + 170 * u); g.lineTo(a + (b - a) * u + 4, py + 170 * u); g.stroke(); } }
    }
    wash(rect(560, 900, 840, 26), '#8A877F', { seed: 31, edge: .12, lw: 2.2 });     // string course over the shop
    // the shop front + striped awning (no lettering)
    wash(rect(600, 990, 460, ST.far - 990), '#3B3A37', { seed: 32, edge: .1, lw: 2.2 });
    wash(rect(620, 1010, 200, 200), '#6E6B64', { seed: 33, edge: .1, lw: 2 });
    wash(rect(850, 1010, 190, 200), '#6E6B64', { seed: 34, edge: .1, lw: 2 });
    raw(); g.save(); g.filter = 'blur(8px)'; g.fillStyle = 'rgba(255,252,240,.18)'; g.fillRect(630, 1020, 400, 180); g.restore();
    raw();
    for (const [x0, x1] of [[620, 820], [850, 1040]]) {
      g.fillStyle = 'rgba(40,38,34,.35)'; g.fillRect(x0, 1150, x1 - x0, 6); g.fillRect(x0, 1080, x1 - x0, 5);      // shelves
      const rg = mulberry(x0);
      for (let x = x0 + 10; x < x1 - 16; x += 18 + rg() * 8) { const h = 18 + rg() * 22; g.fillStyle = rg() > .5 ? 'rgba(60,58,54,.45)' : 'rgba(200,198,190,.45)'; g.fillRect(x, 1150 - h, 12, h); g.fillRect(x + 2, 1080 - h * .7, 10, h * .7); }
      g.strokeStyle = 'rgba(30,28,25,.4)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x0 + (x1 - x0) / 2, 1010); g.lineTo(x0 + (x1 - x0) / 2, 1210); g.stroke();   // mullion
    }
    g.fillStyle = 'rgba(30,28,25,.55)'; g.fillRect(824, 1010, 22, ST.far - 1010);                                       // the door, in the slot between
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
    raw(); const rk = mulberry(43);
    for (let i = 0; i < 26; i++) { const x = -290 + rk() * 840, y = ST.fenceTop + 20 + rk() * 300; if (x > ST.gate0 - 10 && x < ST.gate1 + 10) continue; g.strokeStyle = 'rgba(40,38,34,.3)'; g.lineWidth = 1.2; g.beginPath(); g.ellipse(x, y, 5, 3, 0, 0, 7); g.stroke(); }
    g.fillStyle = 'rgba(220,218,210,.7)'; g.beginPath(); g.moveTo(-170, 1230); g.lineTo(-120, 1226); g.lineTo(-140, 1262); g.fill();     // a torn scrap of an old bill
    // peepholes cut in the boards for the passers-by, at grown-up eye height
    for (const x of [-230, -60, 130]) { g.fillStyle = '#2E2D2A'; g.beginPath(); g.ellipse(x, 1000, 13, 11, 0, 0, 7); g.fill(); g.strokeStyle = 'rgba(230,228,220,.45)'; g.lineWidth = 2; g.beginPath(); g.ellipse(x, 1000, 17, 15, 0, 0, 7); g.stroke(); }
    // a strip of shadow under the top rail, and the post caps
    g.fillStyle = 'rgba(30,28,25,.25)'; g.fillRect(-300, ST.fenceTop + 4, ST.fence1 + 300, 8);
    wash(rect(ST.gate0, ST.fenceTop + 30, ST.gate1 - ST.gate0, ST.far - ST.fenceTop - 30), '#4A4844', { seed: 42, edge: .2, lw: 2.4 });   // dark gateway into the site
    raw(); g.save(); g.filter = 'blur(14px)'; g.fillStyle = 'rgba(20,18,16,.35)'; g.fillRect(ST.gate0 + 20, ST.fenceTop + 60, ST.gate1 - ST.gate0 - 40, ST.far - ST.fenceTop - 60); g.restore();
    // far pavement, road (cobbles + tram rails), near kerb + pavement
    wash(rect(-300, ST.far, 1680, ST.road0 - ST.far + 4), '#B4B1A9', { seed: 60, edge: .08, lw: 2 });
    wash(rect(-300, ST.road0, 1680, ST.road1 - ST.road0), '#77746D', { seed: 61, line: false, edge: .08 });
    raw(); g.strokeStyle = 'rgba(30,28,25,.18)'; g.lineWidth = 1.5;
    const rnd = mulberry(62);
    for (let y = ST.road0 + 12; y < ST.road1; y += 16) for (let x = -300 + (y % 32); x < 1380; x += 30) { g.beginPath(); g.ellipse(x, y, 12, 5, 0, 0, 7); g.stroke(); }
    g.strokeStyle = 'rgba(220,218,210,.5)'; g.lineWidth = 4; for (const y of [1440, 1470]) { g.beginPath(); g.moveTo(-300, y); g.lineTo(1380, y); g.stroke(); }
    g.strokeStyle = 'rgba(30,28,25,.35)'; g.lineWidth = 2; for (const y of [1440, 1470]) for (let x = -260; x < 1380; x += 230) { g.beginPath(); g.moveTo(x, y - 4); g.lineTo(x, y + 4); g.stroke(); }
    for (const [px, py, pw] of [[60, 1372, 120], [930, 1494, 150]]) { g.fillStyle = 'rgba(200,198,190,.45)'; g.beginPath(); g.ellipse(px, py, pw / 2, 9, 0, 0, 7); g.fill(); g.strokeStyle = 'rgba(255,253,245,.6)'; g.lineWidth = 1.6; g.beginPath(); g.moveTo(px - pw * .3, py - 2); g.lineTo(px + pw * .1, py - 2); g.stroke(); }
    wash(rect(-300, ST.road1, 1680, 22), '#5E5C57', { seed: 63, edge: .1, lw: 2.2 });
    wash(rect(-300, ST.near, 1680, 2100 - ST.near), '#A29F97', { seed: 64, edge: .08, lw: 2 });
    raw(); g.strokeStyle = 'rgba(40,38,34,.25)'; g.lineWidth = 2;
    for (let x = -300; x < 1380; x += 140) { g.beginPath(); g.moveTo(x, ST.near); g.lineTo(x - 90, 2100); g.stroke(); }
    for (const y of [1680, 1860]) { g.beginPath(); g.moveTo(-300, y); g.lineTo(1380, y); g.stroke(); }
    // slab wear: soft stains, hairline cracks, a kerb drain, a few leaves (all low-contrast: subtitles sit here)
    const rp = mulberry(65);
    g.save(); g.filter = 'blur(6px)'; for (let i = 0; i < 18; i++) { g.fillStyle = rp() > .5 ? 'rgba(40,38,34,.06)' : 'rgba(255,253,245,.07)'; g.beginPath(); g.ellipse(-300 + rp() * 1680, ST.near + 40 + rp() * 500, 40 + rp() * 60, 14 + rp() * 20, 0, 0, 7); g.fill(); } g.restore();
    g.strokeStyle = 'rgba(40,38,34,.22)'; g.lineWidth = 1.2;
    for (let i = 0; i < 9; i++) { let x = -300 + rp() * 1680, y = ST.near + 30 + rp() * 480; g.beginPath(); g.moveTo(x, y); for (let k = 0; k < 4; k++) { x += 10 + rp() * 22; y += (rp() - .5) * 18; g.lineTo(x, y); } g.stroke(); }
    g.fillStyle = '#4E4C48'; g.fillRect(380, ST.road1 + 2, 90, 16); g.strokeStyle = 'rgba(200,198,190,.5)'; g.lineWidth = 1.4; for (let x = 388; x < 466; x += 10) { g.beginPath(); g.moveTo(x, ST.road1 + 4); g.lineTo(x, ST.road1 + 16); g.stroke(); }
    for (let i = 0; i < 7; i++) { const x = -260 + rp() * 1600, y = ST.near + 20 + rp() * 300, a = rp() * 6; g.fillStyle = 'rgba(90,88,82,.35)'; g.beginPath(); g.ellipse(x, y, 7, 3.5, a, 0, 7); g.fill(); }
    // the kerb stones
    g.strokeStyle = 'rgba(30,28,25,.3)'; g.lineWidth = 1.6; for (let x = -280; x < 1380; x += 110) { g.beginPath(); g.moveTo(x, ST.road1); g.lineTo(x, ST.near); g.stroke(); }
    // lamppost on the far pavement + a fire hydrant
    wash(rect(1006, 700, 14, ST.far - 700), '#3B3A37', { seed: 70, edge: .1, lw: 2 });
    wash(rr(990, 660, 46, 50, 10), '#55534E', { seed: 71, edge: .1, lw: 2 });
    wash(ell(1013, 690, 14, 12, 16), '#E2DFD6', { seed: 72, edge: .1, lw: 1.6 });
    wash(rr(80, 1236, 30, 54, 8), '#5E5C57', { seed: 73, edge: .1, lw: 2 }); wash(ell(95, 1236, 18, 8, 12), '#5E5C57', { seed: 74, edge: .1, lw: 2 });
    raw(); g.save(); g.filter = 'blur(12px)'; g.fillStyle = 'rgba(20,18,16,.3)'; g.fillRect(-300, ST.far - 6, 1680, 18); g.restore();
  });
  return bg;
}
