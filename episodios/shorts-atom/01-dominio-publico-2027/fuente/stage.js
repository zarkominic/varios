// stage.js — the vaudeville stage of the style test, re-built for a 9:16 frame and painted once into a cached greyscale
// "watercolour" canvas (never boils). Mid greys only: the characters keep the whites and the ink blacks.
// World = the 1080×1920 frame at camera {x:540, y:960, z:1}. A low riser runs along the back wall (where the props stand).
import * as T from '/styles/rubber-hose/demo/toon.js';
import { wash } from '/styles/rubber-hose/demo/bg.js';
import { mulberry } from '/core/lib.js';
const { ell, arc, rr, rect, spline } = T;

export const FLOOR = 1180;      // wall meets the riser top
export const RISER = { top: 1180, lip: 1212, face: 1290, x0: 110, x1: 970 };   // riser top surface → front edge → face bottom
export const GROUND = 1440;     // where Atom and the chests stand
const X0 = -280, X1 = 1360, Y0 = -120, Y1 = 2040;

function paperGrain(g, w, h, seed = 3) {
  const rnd = mulberry(seed); g.setTransform(1, 0, 0, 1, 0, 0);
  for (let i = 0; i < w * h / 900; i++) { g.fillStyle = rnd() > .5 ? 'rgba(20,18,15,.06)' : 'rgba(255,255,250,.05)'; g.fillRect(rnd() * w, rnd() * h, 1 + rnd() * 2, 1 + rnd() * 2); }
}
function makeBG(x0, y0, x1, y1, PS) { const cv = document.createElement('canvas'); cv.width = Math.round((x1 - x0) * PS); cv.height = Math.round((y1 - y0) * PS); return { cv, ox: x0, oy: y0, PS, w: x1 - x0, h: y1 - y0 }; }
function withCanvas(bg, fn) {
  const prev = T.g, oldB = T.BASE.slice(), oldL = T.S.lwScale, { PS, ox, oy } = bg;
  T.init(bg.cv); T.BASE.splice(0, 6, PS, 0, 0, PS, -ox * PS, -oy * PS); T.S.lwScale = PS; T.frame(0, { amp: 0 });
  const raw = () => T.g.setTransform(PS, 0, 0, PS, -ox * PS, -oy * PS);
  fn(T.g, raw); T.g.setTransform(1, 0, 0, 1, 0, 0);
  paperGrain(T.g, bg.cv.width, bg.cv.height, 11);
  T.BASE.splice(0, 6, ...oldB); T.S.lwScale = oldL; T.init(prev.canvas);
}

export function paintStage() {
  const bg = makeBG(X0, Y0, X1, Y1, 1.4), W = X1 - X0;
  withCanvas(bg, (g, raw) => {
    // back wall: mid-grey wallpaper, faint stripes + small diamond flowers
    wash(rect(X0, Y0, W, FLOOR - Y0), '#8A877F', { line: false, seed: 1, edge: 0 });
    raw();
    for (let x = X0; x < X1; x += 64) { g.fillStyle = 'rgba(255,253,245,.07)'; g.fillRect(x, Y0, 22, FLOOR - Y0); }
    for (let x = 28; x < X1; x += 128) for (let y = 240; y < 940; y += 96) { g.fillStyle = 'rgba(30,28,24,.2)'; g.beginPath(); g.moveTo(x, y - 8); g.lineTo(x + 6, y); g.lineTo(x, y + 8); g.lineTo(x - 6, y); g.fill(); }
    // follow-spot pool on the wall
    g.save(); g.filter = 'blur(50px)'; g.fillStyle = 'rgba(255,252,240,.20)'; g.beginPath(); g.ellipse(540, 760, 360, 420, 0, 0, 7); g.fill(); g.restore();
    // wainscot: dado rail + panels
    wash(rect(X0, 990, W, FLOOR - 990), '#6E6B64', { seed: 3, line: false, edge: .1 });
    wash(rect(X0, 980, W, 16), '#4A4844', { seed: 4 });
    for (let x = 30; x < X1 - 60; x += 175) wash(rr(x, 1012, 148, 150, 6), '#77746D', { seed: x, edge: .12 });
    // stage floor: boards in perspective toward a vanishing point above the stage
    wash(rect(X0, FLOOR, W, 1720 - FLOOR), '#A29F97', { seed: 6, line: false, edge: .06 });
    raw(); g.strokeStyle = 'rgba(40,38,34,.42)'; g.lineWidth = 2.2;
    for (let i = -12; i <= 12; i++) { const xb = 540 + i * 70; g.beginPath(); g.moveTo(xb, FLOOR); g.lineTo(540 + (xb - 540) * 2.2, 1720); g.stroke(); }
    for (const y of [1330, 1420, 1540, 1660]) { g.strokeStyle = 'rgba(40,38,34,.16)'; g.beginPath(); g.moveTo(X0, y); g.lineTo(X1, y); g.stroke(); }
    // spot pool on the floor
    g.save(); g.filter = 'blur(30px)'; g.fillStyle = 'rgba(255,252,240,.24)'; g.beginPath(); g.ellipse(540, 1450, 380, 90, 0, 0, 7); g.fill(); g.restore();
    // the riser along the back wall: top surface + front face (the props stand on it)
    wash(rect(RISER.x0, RISER.top, RISER.x1 - RISER.x0, RISER.lip - RISER.top), '#B4B1A9', { seed: 21, edge: .08 });
    wash(rect(RISER.x0, RISER.lip, RISER.x1 - RISER.x0, RISER.face - RISER.lip), '#625F59', { seed: 22, edge: .2 });
    raw(); g.strokeStyle = 'rgba(20,18,16,.3)'; g.lineWidth = 2;
    for (let x = RISER.x0 + 86; x < RISER.x1; x += 86) { g.beginPath(); g.moveTo(x, RISER.lip + 4); g.lineTo(x, RISER.face - 4); g.stroke(); }
    g.save(); g.filter = 'blur(10px)'; g.fillStyle = 'rgba(20,18,16,.35)'; g.fillRect(RISER.x0 - 6, RISER.face - 2, RISER.x1 - RISER.x0 + 12, 22); g.restore();
    // footlight lip at the front edge + the dark pit below it
    wash(rect(X0, 1720, W, 80), '#3B3A37', { seed: 7 });
    for (let x = 60; x < X1; x += 160) wash(arc(x, 1724, 44, 24, Math.PI, Math.PI * 2, 14), '#5E5C57', { seed: x + 9, edge: .1 });
    wash(rect(X0, 1800, W, Y1 - 1800), '#2A2927', { seed: 8, line: false, edge: 0 });
    // side curtains: heavy drapes with fold stripes, gathered by a tie-back
    for (const s of [-1, 1]) {
      const xo = s < 0 ? X0 : X1, xi = s < 0 ? 150 : 930, xt = s < 0 ? 100 : 980;
      const pts = spline([[xo, Y0], [xi, Y0], [xi + s * -6, 400], [xt, 860], [xi - s * 6, 1180], [xi + s * 20, 1720], [xo, 1720]], true, 6);
      wash(pts, '#55534E', { seed: 40 + s, edge: .3 });
      raw(); g.save();
      for (let k = 1; k < 5; k++) { const fx = xo + (xi - xo) * k / 5; g.strokeStyle = k % 2 ? 'rgba(20,18,16,.38)' : 'rgba(255,252,240,.12)'; g.lineWidth = 11; g.filter = 'blur(3px)'; g.beginPath(); g.moveTo(fx, Y0); g.quadraticCurveTo(fx + (xt - xi) * .5 * k / 5, 860, fx, 1720); g.stroke(); }
      g.restore();
      wash(rr(xt - 34 + s * -14, 846, 68, 24, 11), '#3B3A37', { seed: 50 + s });
      wash(ell(xt + s * -44, 896, 14, 28), '#3B3A37', { seed: 60 + s });
    }
    // valance with scalloped hem (inside the top 8 %, nothing important lives there)
    const val = [[X0, Y0], [X1, Y0], [X1, 120]];
    for (let x = X1; x >= X0; x -= 8) val.push([x, 120 + Math.abs(Math.sin((x - 0) / 135 * Math.PI)) * 44]);
    wash(val, '#4A4844', { seed: 70, edge: .3 });
    raw(); g.fillStyle = 'rgba(20,18,16,.5)';
    for (let x = 67; x < X1; x += 135) { g.beginPath(); g.ellipse(x, 170, 6, 11, 0, 0, 7); g.fill(); }
  });
  return bg;
}
// cam = {x, y, z}: world point (x, y) lands on the frame centre (540, 960); squash = the set breathes around the floor line
export function drawStage(sg, bg, cam, squash = 0, pivotY = GROUND) {
  const z = cam.z;
  sg.save(); sg.setTransform(z, 0, 0, z, 540 - cam.x * z, 960 - cam.y * z);
  if (squash) { sg.translate(540, pivotY); sg.scale(1 - squash * .4, 1 + squash); sg.translate(-540, -pivotY); }
  sg.drawImage(bg.cv, bg.ox, bg.oy, bg.w, bg.h); sg.restore();
}
