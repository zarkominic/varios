// atom.js — ATOM in the rubber-hose drawing language: white nucleus-face with pie eyes, three hose-like orbit rings
// (0°, +60°, −60°) whose near halves pass in front of the nucleus (below the face), electrons riding the rings,
// noodle limbs, white four-finger gloves, round shoes (red in colour → dark grey here).
// Character-local coordinates: origin = the ground between the feet, y down.
import * as T from '/styles/rubber-hose/demo/toon.js';
import { P, pieEye, mouth, glove, hose, brow } from '/styles/rubber-hose/demo/chars.js';
import { TAU, lerp } from '/core/lib.js';
const { shape, stroke, ell, arc, spline, push, pop, translate, rotate, scale, S } = T;

export const A = { R: 128, leg: 110, rx: 1.5, ry: 0.64, ringW: 12, eR: 18 };
export const NY = -(A.leg + A.R * 0.9);               // nucleus centre
export const shoulder = s => [s * A.R * 0.9, NY + A.R * 0.2];
const TILT = [0, Math.PI / 3, -Math.PI / 3];

function ringPt(i, u) {
  const th = TILT[i], c = Math.cos(th), s = Math.sin(th), x = Math.cos(u) * A.R * A.rx, y = Math.sin(u) * A.R * A.ry;
  return [x * c - y * s, NY + x * s + y * c];
}
const ringPts = i => { const p = []; for (let k = 0; k < 90; k++) p.push(ringPt(i, k / 90 * TAU)); return p; };
function strokeRing(Pth) {
  const g = T.g, zk = T.zoom(); g.setTransform(1, 0, 0, 1, 0, 0); g.lineCap = 'round'; g.lineJoin = 'round';
  g.strokeStyle = P.ink; g.lineWidth = A.ringW * zk + S.lw * 1.7; g.stroke(Pth);
  g.strokeStyle = P.dmid; g.lineWidth = A.ringW * zk; g.stroke(Pth);
  g.strokeStyle = P.mid; g.lineWidth = 3 * zk; g.globalAlpha = .8; g.stroke(Pth); g.globalAlpha = 1;   // one lighter thread: a hoop, not a line
}
function electron(x, y) {
  shape(ell(x, y, A.eR, A.eR, 22), { fill: P.white, lw: S.lw * .8, shade: () => shape(ell(x + 5, y + 6, A.eR * .85, A.eR * .85, 18), { fill: P.light, stroke: false, boil: 0 }) });
  shape(ell(x - 2, y - 2, A.eR * .7, A.eR * .7, 18), { fill: P.white, stroke: false, boil: 0 });
}
// Round shoe with its own fill (Atom's red shoes read as a dark grey in a black-and-white print)
function shoe(x, y, dir = 1, k = 1, fill = P.dark) {
  push(); translate(x, y); scale(dir * k, k);
  shape(spline([[-15, 0], [-17, -12], [-6, -19], [10, -21], [27, -18], [37, -8], [34, 3], [12, 5], [-8, 4]], true, 6), { fill, lw: S.lw * .9 });
  shape(ell(22, -12, 7, 3.6, 12, 0), { fill: P.pale, stroke: false, boil: .3 });
  pop();
}

// short-dp additions (look unchanged): arm.gk = glove scale, p.eyeR = right-eye override, p.over = draw hook on the head
// p: { x, y, k, sx, sy, lean, lift, armL/armR {x,y,hand,rot,bend}, legL/legR {x,y,bend}, eyes, brows, mouth, eph (electron phase, turns) }
export function atom(p) {
  const R = A.R, lift = p.lift || 0;
  push(); translate(p.x, p.y); scale(p.k || 1); scale(p.sx || 1, p.sy || 1); if (p.lean) rotate(p.lean);
  push(); translate(0, -lift);
  const ringP = [0, 1, 2].map(i => shape(ringPts(i), { stroke: false }));
  const el = [0, 1, 2].map(i => { const u = (p.eph || 0) * TAU * (i === 1 ? -1 : 1) + i * 2.1 + .4; return { u, pt: ringPt(i, u), front: Math.sin(u) > 0 }; });
  // back: whole rings + far electrons
  ringP.forEach(strokeRing);
  el.forEach(e => { if (!e.front) electron(...e.pt); });
  // legs in front of the far rings (hips ride the lift, feet stay on the floor)
  for (const [key, s] of [['legL', -1], ['legR', 1]]) {
    const L = p[key] || { x: s * 46, y: 0 };
    hose([s * R * .3, NY + R * .84], [L.x, L.y - 9 + lift], L.bend ?? s * 5, 15);
  }
  for (const [key, s] of [['legL', -1], ['legR', 1]]) { const L = p[key] || { x: s * 46, y: 0 }; shoe(L.x - s * 4, L.y + lift, s, 1.18); }
  // arms (shoulders tuck behind the nucleus)
  for (const [key, s] of [['armL', -1], ['armR', 1]]) {
    const Aa = p[key]; if (!Aa) continue; const sh = shoulder(s);
    hose(sh, [Aa.x, Aa.y], Aa.bend ?? s * -16, 14);
    glove(Aa.x, Aa.y, Aa.rot ?? Math.atan2(Aa.y - sh[1], Aa.x - sh[0]), Aa.hand || 'open', Aa.gk ?? 1.22, { flip: Aa.flip ?? s < 0 });
  }
  // nucleus = the face; hard form-shadow band away from the upper-left light
  shape(ell(0, NY, R, R, 72), {
    fill: P.light, shade: () => {
      shape(ell(-R * .16, NY - R * .17, R * 1.0, R * 1.0, 72), { fill: P.white, stroke: false, boil: 0 });
      shape(ell(-R * .5, NY - R * .52, R * .16, R * .1, 18), { fill: '#FFFFFF', stroke: false, boil: 0 });
    }
  });
  // face (upper half; the rings' near arcs cross the ball below it)
  const E = p.eyes || {}, ex = R * .28, ey = NY - R * .2;
  pieEye(-ex, ey, R * .16, R * .24, { ...E, lidCol: P.white, side: 1 });
  pieEye(ex, ey, R * .16, R * .24, { ...E, ...(p.eyeR || {}), lidCol: P.white, side: -1 });
  if (p.brows) { brow(-ex, ey - R * .37, R * .22, p.brows, -1); brow(ex, ey - R * .37, R * .22, p.brows, 1); }
  shape(ell(-R * .55, NY + R * .1, R * .1, R * .06, 14), { fill: P.pale, stroke: false, boil: .3 });
  shape(ell(R * .55, NY + R * .1, R * .1, R * .06, 14), { fill: P.pale, stroke: false, boil: .3 });
  const M = p.mouth || { type: 'smile' };
  mouth(0, NY + R * .2, M.w || R * .42, M.type, M);
  // front: the near half of each ring, only where it lies over the nucleus (clipped half-disc), then near electrons
  const g = T.g;
  ringP.forEach((Pth, i) => {
    const th = TILT[i], c = Math.cos(th), s = Math.sin(th), rr = R + 8, half = [];
    for (let k = 0; k <= 36; k++) { const a = k / 36 * Math.PI, x = Math.cos(a) * rr, y = Math.sin(a) * rr; half.push([x * c - y * s, NY + x * s + y * c]); }
    const clip = shape(half, { stroke: false, boil: 0 });
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.clip(clip); strokeRing(Pth); g.restore();
  });
  el.forEach(e => { if (e.front) electron(...e.pt); });
  if (p.over) p.over();          // short-dp hook: things worn on the head (fedora, the bat), in character-local coords
  pop();
  pop();
}
