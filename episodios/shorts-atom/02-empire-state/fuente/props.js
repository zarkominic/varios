// props.js — the Empire State short's props in the rubber-hose drawing language (flat greys + ink, boiling line,
// hard form-shadow band). Only generic 1930 things: steel girders and columns, plank decks, a guy derrick, a portable
// rivet forge, rivets, tongs, a catch can, a dolly bar, a pneumatic rivet gun, a flatbed truck, little sedans, a biplane
// towing a banner, clouds, calendar pages, a pocket watch, a knife switch, a rail cart — and the tower itself, drawn
// procedurally as it rises. Numerals are hand-inked strokes (no font, no words). Prop-local origin = the ground under it.
import * as T from '/styles/rubber-hose/demo/toon.js';
import { P, ribbon } from '/styles/rubber-hose/demo/chars.js';
import { clamp, lerp, TAU, hash, vnoise } from '/core/lib.js';
const { shape, stroke, ell, arc, rr, rect, spline, quad, push, pop, translate, rotate, scale, S } = T;

export const at = (x, y, k, fn, o = {}) => { push(); translate(x, y); if (o.rot) rotate(o.rot); scale(k * (o.sx || 1), k * (o.sy || 1)); fn(); pop(); };

// —— hand-inked numerals (same hand as the first short) ——
const DIG = {
  '0': [{ e: [0, .5, .27, .5] }],
  '1': [{ p: [[-.13, .18], [.04, 0], [.04, 1]] }, { p: [[-.15, 1], [.23, 1]] }],
  '2': [{ c: [[-.26, .24], [-.12, .03], [.1, .01], [.26, .2], [.2, .45], [-.05, .7], [-.27, .99]] }, { p: [[-.27, .99], [.29, .99]] }],
  '3': [{ c: [[-.25, .13], [-.02, 0], [.22, .1], [.22, .35], [-.03, .47]] }, { c: [[-.03, .47], [.25, .6], [.25, .87], [0, 1], [-.27, .88]] }],
  '4': [{ p: [[.14, 1], [.14, 0], [-.3, .66], [.3, .66]] }],
  '5': [{ p: [[.25, 0], [-.2, 0], [-.23, .42]] }, { c: [[-.23, .42], [0, .35], [.24, .5], [.26, .78], [.04, 1], [-.27, .9]] }],
  '6': [{ c: [[.22, .06], [0, 0], [-.22, .25], [-.26, .6], [-.14, .94], [.1, .98], [.25, .78], [.18, .52], [-.04, .48], [-.25, .66]] }],
  '7': [{ p: [[-.27, 0], [.29, 0], [-.06, 1]] }],
  '8': [{ e: [0, .25, .2, .24] }, { e: [0, .73, .25, .27] }],
  '9': [{ e: [0, .3, .24, .29] }, { c: [[.24, .3], [.22, .65], [.05, .95], [-.2, 1]] }],
};
export function numeral(str, cx, cy, h, o = {}) {
  const adv = h * .64, n = str.length, x0 = cx - adv * (n - 1) / 2, y0 = cy - h / 2;
  const pass = (col, lw) => {
    for (let i = 0; i < n; i++) {
      const d = DIG[str[i]]; if (!d) continue; const ox = x0 + i * adv;
      for (const s of d) {
        if (s.e) shape(ell(ox + s.e[0] * h, y0 + s.e[1] * h, s.e[2] * h, s.e[3] * h, 30), { lw, line: col, boil: .6 });
        else { const pts = (s.c ? spline(s.c, false, 6) : s.p).map(q => [ox + q[0] * h, y0 + q[1] * h]); stroke(pts, lw, { line: col, boil: .6 }); }
      }
    }
  };
  const lw = h * (o.w ?? .15) * T.zoom();
  if (o.halo) pass(o.halo, lw * 2.1);
  pass(o.col || P.ink, lw);
}

// —— soft glow (screen-space radial gradient around a local point) ——
export function glow(x, y, r, a = 1, col = '255,252,238') {
  const [sx, sy] = T.tx(x, y), R = r * T.zoom(), g = T.g;
  if (R < 1 || a <= 0) return;
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
  const gr = g.createRadialGradient(sx, sy, 0, sx, sy, R);
  gr.addColorStop(0, `rgba(${col},${.75 * a})`); gr.addColorStop(.35, `rgba(${col},${.3 * a})`); gr.addColorStop(1, `rgba(${col},0)`);
  g.fillStyle = gr; g.beginPath(); g.arc(sx, sy, R, 0, TAU); g.fill(); g.restore();
}

// —— structure: a horizontal I-beam (side elevation), top-left at (x0, y), depth d ——
export function girder(x0, x1, y, o = {}) {
  const d = o.d || 56, fl = d * .2;
  shape(rect(x0, y, x1 - x0, d), { fill: o.fill || P.dmid, lw: S.lw * .8, shade: () => { shape(rect(x0 - 4, y + d * .55, x1 - x0 + 8, d), { fill: P.dark, stroke: false, boil: 0, alpha: .5 }); } });
  stroke([[x0 + 3, y + fl], [x1 - 3, y + fl]], S.lw * .45, { line: P.ink });
  stroke([[x0 + 3, y + d - fl], [x1 - 3, y + d - fl]], S.lw * .45, { line: P.ink });
  stroke([[x0 + 8, y + fl * .5], [x1 - 8, y + fl * .5]], S.lw * .35, { line: P.light, boil: .4 });
  // rivet rows at the ends (connection angles) + every so often along the web
  const rivRow = xx => { for (let k = 0; k < 3; k++) shape(ell(xx, y + d * .35 + k * d * .16, 3.2, 3.2, 8), { fill: P.light, lw: S.lw * .3 }); };
  if (o.rivets !== false) { rivRow(x0 + 16); rivRow(x0 + 30); rivRow(x1 - 16); rivRow(x1 - 30); }
  if (o.label) { push(); translate((x0 + x1) / 2, y + d / 2); numeral(o.label, 0, 0, d * .5, { col: P.white, w: .14 }); pop(); }
}
// a vertical column (front view) from y0 (top) to y1, splices at o.splice [y...]
export function column(x, y0, y1, o = {}) {
  const w = o.w || 46;
  shape(rect(x - w / 2, y0, w, y1 - y0), { fill: P.dmid, lw: S.lw * .8, shade: () => shape(rect(x + w * .1, y0 - 4, w, y1 - y0 + 8), { fill: P.dark, stroke: false, boil: 0, alpha: .55 }) });
  stroke([[x - w * .3, y0 + 4], [x - w * .3, y1 - 4]], S.lw * .4, { line: P.ink });
  stroke([[x + w * .3, y0 + 4], [x + w * .3, y1 - 4]], S.lw * .4, { line: P.ink });
  stroke([[x - w * .4, y0 + 8], [x - w * .4, y1 - 8]], S.lw * .3, { line: P.light, boil: .3 });
  if (o.cap !== false) shape(rect(x - w * .62, y0 - 8, w * 1.24, 12), { fill: P.dark, lw: S.lw * .6 });
  for (const sy of o.splice || []) {
    shape(rect(x - w * .7, sy - 34, w * 1.4, 68), { fill: P.mid, lw: S.lw * .6 });
    for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) shape(ell(x - w * .4 + i * w * .8, sy - 22 + j * 22, 3.4, 3.4, 8), { fill: P.light, lw: S.lw * .3 });
  }
}
// a plank deck on top of a beam: planks lying across, seen edge-on
export function planks(x0, x1, y, o = {}) {
  const h = o.h || 16;
  shape(rect(x0, y - h, x1 - x0, h), { fill: P.light, lw: S.lw * .7, shade: () => shape(rect(x0 - 2, y - h * .35, x1 - x0 + 4, h), { fill: P.mid, stroke: false, boil: 0, alpha: .7 }) });
  for (let x = x0 + 70 + (o.ph || 0); x < x1 - 20; x += 96) stroke([[x, y - h + 2], [x + 3, y - 2]], S.lw * .4, { line: P.dmid });
}
// little rails on a deck (for the rail cart)
export function rails(x0, x1, y) { stroke([[x0, y - 3], [x1, y - 3]], S.lw * .9, { line: P.dark, boil: .3 }); for (let x = x0 + 10; x < x1; x += 34) shape(rect(x, y - 6, 18, 6), { fill: P.dmid, lw: S.lw * .3, boil: .3 }); }

// a lattice member from a to b (width w): two chords + zigzag
export function lattice(a, b, w, o = {}) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L * w / 2, ny = dx / L * w / 2;
  const n = Math.max(2, Math.round(L / (w * 1.1))), lw = S.lw * (o.lw || .6);
  const zz = []; for (let i = 0; i <= n; i++) { const u = i / n, s = i % 2 ? 1 : -1; zz.push([a[0] + dx * u + nx * s, a[1] + dy * u + ny * s]); }
  stroke(zz, lw * .7, { line: o.col || P.dark });
  for (const s of [-1, 1]) stroke([[a[0] + nx * s, a[1] + ny * s], [b[0] + nx * s, b[1] + ny * s]], lw * 1.4, { line: P.ink });
}
// guy derrick: mast foot (mx, my) to the top (mx, mt); boom from the foot at angle ang (rad, 0 = right, -π/2 = up), length L;
// the fall line hangs from the boom tip: hook at drop below the tip, swing = pendulum angle. Returns the hook world point.
export function derrick(mx, my, mt, ang, L, drop, swing = 0, o = {}) {
  const tip = [mx + Math.cos(ang) * L, my + Math.sin(ang) * L];
  // back guys off the mast top
  stroke([[mx, mt], [mx + 900, mt + 1400]], S.lw * .3, { line: P.dmid, boil: .3 });   // the back guy runs off to the right
  lattice([mx, my], [mx, mt], 34, { lw: .7 });
  shape(rect(mx - 26, mt - 14, 52, 16), { fill: P.dark, lw: S.lw * .5 });
  if (o.flag !== false) { const fw = Math.sin((o.t || 0) * 9) * 8; stroke([[mx, mt - 14], [mx, mt - 70]], S.lw * .5); shape(spline([[mx, mt - 70], [mx + 50, mt - 62 + fw], [mx + 84, mt - 58 - fw * .5], [mx, mt - 44]], true, 5), { fill: P.white, lw: S.lw * .5 }); }
  // topping lift: mast top → boom tip
  stroke([[mx, mt], tip], S.lw * .45, { line: P.dark });
  lattice([mx, my], tip, 26, { lw: .6 });
  shape(ell(tip[0], tip[1], 10, 10, 12), { fill: P.mid, lw: S.lw * .5 });
  shape(ell(mx, my, 16, 16, 14), { fill: P.dark, lw: S.lw * .6 });
  const hx = tip[0] + Math.sin(swing) * drop, hy = tip[1] + Math.cos(swing) * drop;
  stroke([tip, [hx, hy]], S.lw * .5, { line: P.ink, boil: .3 });
  hookBlock(hx, hy, swing, o.hook);
  return [hx, hy + 70];
}
export function hookBlock(x, y, rot = 0, o = {}) {
  push(); translate(x, y); rotate(-rot * .4);
  shape(rr(-16, 0, 32, 40, 8), { fill: P.dmid, lw: S.lw * .6, shade: () => shape(rect(4, 0, 20, 40), { fill: P.dark, stroke: false, boil: 0, alpha: .5 }) });
  shape(ell(0, 52, 18, 18, 16), { fill: P.dark, lw: S.lw * .6 });          // the headache ball
  stroke(spline([[0, 66], [0, 80], [-10, 96], [2, 108], [16, 96]], false, 6), S.lw * 1.0, { line: P.ink });
  pop();
}

// —— riveting kit ——
// portable coal forge: pan on three legs + a hand-cranked blower; o.crank (angle), o.heat 0..1, o.t
export function forge(x, y, k, o = {}) {
  push(); translate(x, y); scale(k);
  const t = o.t || 0, heat = o.heat ?? 1;
  for (const [lx, a] of [[-60, -.18], [60, .18], [8, .02]]) stroke([[lx * .6, -110], [lx, 0]], 9 * T.zoom(), { line: P.dark });
  // blower housing + crank (right side)
  shape(ell(86, -128, 34, 34, 20), { fill: P.dmid, lw: S.lw * .8, shade: () => shape(ell(98, -116, 30, 30, 18), { fill: P.dark, stroke: false, boil: 0, alpha: .5 }) });
  shape(ell(86, -128, 10, 10, 10), { fill: P.mid, lw: S.lw * .5 });
  const ca = o.crank || 0, cx = 86 + Math.cos(ca) * 30, cy = -128 + Math.sin(ca) * 30;
  stroke([[86, -128], [cx, cy]], S.lw * .9, { line: P.ink }); shape(rr(cx - 5, cy - 14, 10, 18, 4), { fill: P.light, lw: S.lw * .5 });
  stroke([[56, -128], [40, -126]], 12 * T.zoom(), { line: P.dark });
  // pan (bowl) + coals
  shape(spline([[-96, -150], [96, -150], [76, -112], [0, -100], [-76, -112]], true, 5), { fill: P.dark, lw: S.lw * .9, shade: () => shape(rect(20, -160, 90, 70), { fill: P.ink, stroke: false, boil: 0, alpha: .4 }) });
  shape(ell(0, -150, 96, 16, 30), { fill: P.ink, lw: S.lw * .8 });
  glow(0, -160, 150, .55 * heat);
  for (let i = 0; i < 13; i++) {
    const a = hash(i * 3.1), bx = (a - .5) * 150, by = -152 - hash(i * 7.7) * 18, r = 10 + hash(i * 1.3) * 9;
    const fl = .5 + .5 * Math.sin(t * (6 + i) + i);
    shape(ell(bx, by, r, r * .7, 10), { fill: heat * fl > .45 ? P.white : P.pale, lw: S.lw * .35, line: P.dark });
  }
  glow(0, -158, 70, .9 * heat);
  pop();
}
// a rivet: shank pointing +x from the head (local), heat 0..1 (white-hot → steel grey)
export function rivet(x, y, rot, k = 1, heat = 0, o = {}) {
  push(); translate(x, y); rotate(rot); scale(k);
  if (heat > .05) glow(6, 0, 46, heat);
  const col = heat > .6 ? P.white : heat > .3 ? P.pale : heat > .12 ? P.light : P.dmid;
  shape(rect(0, -6, o.len ?? 26, 12), { fill: col, lw: S.lw * .5 });
  shape(arc(0, 0, 10, 12, Math.PI / 2, Math.PI * 1.5, 10), { fill: col, lw: S.lw * .55 });
  pop();
}
// sparks: n little strokes flying out from (x,y) at phase p 0..1
export function sparks(x, y, p, n = 7, r = 90, seed = 1, up = 0) {
  if (p <= 0 || p >= 1) return;
  for (let i = 0; i < n; i++) {
    const a = hash(seed + i * 2.3) * TAU, v = r * (.5 + hash(seed + i * 5.1) * .7), d = v * p, gy = up + 120 * p * p;
    const sx = x + Math.cos(a) * d, sy = y + Math.sin(a) * d + gy, ex = x + Math.cos(a) * (d - 14 * (1 - p)), ey = y + Math.sin(a) * (d - 14 * (1 - p)) + gy;
    stroke([[ex, ey], [sx, sy]], S.lw * .55 * (1 - p * .6), { line: P.white, boil: .2 });
  }
}
// tongs: from the grip (gx, gy) along ang, length L; jaws open 0..1
export function tongs(gx, gy, ang, L = 120, open = 0) {
  push(); translate(gx, gy); rotate(ang);
  for (const s of [-1, 1]) stroke(spline([[-10, s * 6], [L * .55, s * 4], [L * .9, s * (5 + open * 10)], [L, s * (2 + open * 6)]], false, 5), S.lw * .75, { line: P.ink });
  shape(ell(L * .55, 0, 5, 5, 8), { fill: P.mid, lw: S.lw * .35 });
  pop();
}
// the catch can (a tin cone, wide mouth up): origin = the handle grip; o.tilt
export function can(x, y, k = 1, o = {}) {
  push(); translate(x, y); rotate(o.tilt || 0); scale(k * (o.sx || 1), k * (o.sy || 1));
  stroke(arc(0, 18, 30, 24, Math.PI * 1.05, Math.PI * 1.95, 10), S.lw * .6, { line: P.ink });
  shape([[-44, 8], [44, 8], [24, 74], [-24, 74]], { fill: P.light, lw: S.lw * .8, shade: () => shape(rect(8, 0, 50, 80), { fill: P.mid, stroke: false, boil: 0 }) });
  shape(ell(0, 8, 44, 10, 20), { fill: P.dark, lw: S.lw * .7 });
  stroke([[-30, 40], [30, 40]], S.lw * .35, { line: P.dmid });
  pop();
}
// dolly bar: a heavy bar from the grip along ang
export function dolly(x, y, ang, k = 1) {
  push(); translate(x, y); rotate(ang); scale(k);
  shape(rr(-30, -10, 150, 20, 8), { fill: P.dmid, lw: S.lw * .8, shade: () => shape(rect(-30, 2, 150, 12), { fill: P.dark, stroke: false, boil: 0, alpha: .6 }) });
  shape(rr(112, -16, 34, 32, 6), { fill: P.dark, lw: S.lw * .7 });
  pop();
}
// pneumatic rivet gun: origin = the grip, the snout points along ang; hose to (hx, hy) in the same local frame as (x, y)
export function rivetGun(x, y, ang, k = 1, o = {}) {
  if (o.hose) { const [ex, ey] = o.hose; stroke(spline([[x - Math.cos(ang) * 40, y - Math.sin(ang) * 40], [x - 60, y + 80], [ex + 60, ey - 30], [ex, ey]], false, 8), 9 * T.zoom(), { line: P.ink }); }
  push(); translate(x, y); rotate(ang); scale(k);
  shape(rr(-10, 0, 26, 44, 8), { fill: P.dark, lw: S.lw * .7 });
  shape(rr(-34, -34, 108, 38, 14), { fill: P.dmid, lw: S.lw * .9, shade: () => shape(rect(-40, -12, 120, 30), { fill: P.dark, stroke: false, boil: 0, alpha: .55 }) });
  stroke([[-20, -26], [50, -26]], S.lw * .4, { line: P.light, boil: .3 });
  shape(rect(72, -24, 44, 18), { fill: P.dark, lw: S.lw * .7 });
  shape(rr(112, -28, 14, 26, 4), { fill: P.mid, lw: S.lw * .6 });
  pop();
}
// pocket watch (face front), hands at hour/minute angles
export function watch(x, y, k = 1, o = {}) {
  push(); translate(x, y); scale(k);
  shape(ell(0, -30, 7, 7, 10), { lw: S.lw * .5 });
  shape(ell(0, 0, 26, 26, 24), { fill: P.light, lw: S.lw * .8 });
  shape(ell(0, 0, 20, 20, 22), { fill: P.white, lw: S.lw * .4 });
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; shape(ell(Math.cos(a) * 15, Math.sin(a) * 15, 1.6, 1.6, 6), { fill: P.ink, stroke: false, boil: 0 }); }
  stroke([[0, 0], [Math.cos(o.h ?? -1.2) * 9, Math.sin(o.h ?? -1.2) * 9]], S.lw * .6);
  stroke([[0, 0], [Math.cos(o.m ?? -Math.PI / 2) * 15, Math.sin(o.m ?? -Math.PI / 2) * 15]], S.lw * .45);
  pop();
}
// little rail cart: origin = rails under its centre
export function railCart(x, y, k = 1, o = {}) {
  push(); translate(x, y); scale(k);
  for (const s of [-1, 1]) { const wa = o.roll || 0; shape(ell(s * 44, -14, 14, 14, 14), { fill: P.dark, lw: S.lw * .6 }); stroke([[s * 44 - Math.cos(wa) * 10, -14 - Math.sin(wa) * 10], [s * 44 + Math.cos(wa) * 10, -14 + Math.sin(wa) * 10]], S.lw * .5, { line: P.mid }); }
  shape(rr(-74, -54, 148, 36, 4), { fill: P.mid, lw: S.lw * .8, shade: () => shape(rect(-80, -34, 160, 20), { fill: P.dmid, stroke: false, boil: 0 }) });
  for (const s of [-1, 1]) shape(rect(s * 60 - 5, -80, 10, 28), { fill: P.dark, lw: S.lw * .5 });
  pop();
}
// a bundle of n beams (side view), length L, centred on (x, y = bottom); tags [{num, sw}] hang off the front end
export function bundle(x, y, L, n, o = {}) {
  push(); translate(x, y); if (o.rot) rotate(o.rot);
  for (let i = 0; i < n; i++) girder(-L / 2 + (i % 2) * 8, L / 2 - (i % 2 ? 0 : 8), -26 * (i + 1), { d: 26, rivets: false });
  for (const s of [-1, 1]) { const cx = s * L * .3; shape(rr(cx - 7, -26 * n - 6, 14, 26 * n + 10, 5), { stroke: true, lw: S.lw * .6 }); for (let j = 0; j < n + 1; j++) shape(ell(cx, -26 * n + j * 26 - 2, 6, 9, 10), { fill: P.light, lw: S.lw * .45 }); }
  (o.tags || []).forEach((tg, i) => {
    const pp = tg.pop || 0; if (pp <= 0) return;
    const ax = -L / 2 + 18 + i * 74, ay = -26 * n + 10, a = .2 + (tg.sw || 0);
    const ex = ax + Math.sin(a) * 50, ey = ay + Math.cos(a) * 50 * pp;
    stroke([[ax, ay], [ex, ey]], S.lw * .4, { line: P.dark });
    push(); translate(ex, ey); rotate(-a * .6); scale(Math.min(1.25, pp));
    shape([[-34, 0], [34, 0], [34, 44], [-34, 44], [-42, 22]], { fill: P.white, lw: S.lw * .7 });
    shape(ell(-30, 22, 3.5, 3.5, 8), { fill: P.dark, stroke: false, boil: 0 });
    numeral(tg.num, 2, 22, 26, { w: .15 });
    pop();
  });
  pop();
}

// —— street ——
// 1930 flatbed truck driving left: origin = the road under the front wheel; o.wheel (rad), o.bob, o.dive (rad), o.load(fn)
export function truck(x, y, k = 1, o = {}) {
  push(); translate(x, y); scale(k);
  const wa = o.wheel || 0;
  const wheel = wx => {
    shape(ell(wx, -44, 44, 44, 26), { fill: P.ink, lw: S.lw * .8 });
    shape(ell(wx, -44, 26, 26, 20), { fill: P.light, lw: S.lw * .5 });
    for (let i = 0; i < 6; i++) { const a = wa + i / 6 * TAU; stroke([[wx, -44], [wx + Math.cos(a) * 24, -44 + Math.sin(a) * 24]], S.lw * .45, { line: P.dark }); }
    shape(ell(wx, -44, 7, 7, 10), { fill: P.dark, lw: S.lw * .4 });
  };
  wheel(0); wheel(380); wheel(470);
  push(); translate(0, -(o.bob || 0)); rotate(o.dive || 0);
  // chassis + flatbed
  shape(rect(-40, -96, 560, 18), { fill: P.dark, lw: S.lw * .7 });
  shape(rect(150, -122, 380, 28), { fill: P.mid, lw: S.lw * .8, shade: () => shape(rect(150, -106, 380, 20), { fill: P.dmid, stroke: false, boil: 0 }) });
  for (let sx = 166; sx < 530; sx += 72) shape(rect(sx, -170, 10, 50), { fill: P.dmid, lw: S.lw * .45 });
  if (o.load) { push(); translate(340, -122); o.load(); pop(); }
  // fenders
  for (const [fx, w] of [[0, 62], [425, 108]]) shape([...arc(fx, -44, w, 58, Math.PI, TAU, 14), [fx + w + 14, -40], [fx - w - 14, -40]], { fill: P.dark, lw: S.lw * .8 });
  // hood + grille + headlight
  shape(spline([[-104, -96], [-110, -150], [-96, -176], [20, -184], [36, -170], [36, -96]], true, 5), { fill: P.dmid, lw: S.lw * .9, shade: () => shape(rect(-120, -130, 170, 40), { fill: P.dark, stroke: false, boil: 0, alpha: .4 }) });
  for (let gx = -98; gx < -70; gx += 7) stroke([[gx, -168], [gx, -102]], S.lw * .35, { line: P.ink });
  for (let i = 0; i < 4; i++) stroke([[-40 + i * 16, -170], [-40 + i * 16, -140]], S.lw * .35, { line: P.dark });
  shape(ell(-96, -192, 20, 20, 16), { fill: P.white, lw: S.lw * .8, shade: () => shape(ell(-90, -186, 14, 14, 12), { fill: P.pale, stroke: false, boil: 0 }) });
  stroke([[-96, -172], [-80, -150]], S.lw * .5);
  // cab
  shape(spline([[30, -96], [30, -240], [44, -268], [150, -270], [162, -250], [164, -96]], true, 4), { fill: P.mid, lw: S.lw * .9, shade: () => shape(rect(120, -280, 60, 200), { fill: P.dmid, stroke: false, boil: 0, alpha: .6 }) });
  shape(rr(52, -252, 92, 70, 8), { fill: P.light, lw: S.lw * .7, shade: () => shape([[52, -252], [96, -252], [52, -200]], { fill: P.white, stroke: false, boil: 0, alpha: .6 }) });
  // the keystone emblem on the door (a plain keystone shape)
  push(); translate(98, -136); scale(1 + (o.emblem || 0) * .3);
  shape([[-22, -24], [22, -24], [14, 22], [-14, 22]], { fill: P.white, lw: S.lw * .7 });
  shape([[-12, -14], [12, -14], [7, 12], [-7, 12]], { fill: null, lw: S.lw * .35, line: P.dmid });
  pop();
  stroke([[140, -150], [150, -150]], S.lw * .7);
  // exhaust stack
  shape(rect(170, -300, 14, 70), { fill: P.dark, lw: S.lw * .5 });
  pop();
  pop();
}
// a small 1930 sedan facing dir (−1 = driving left); origin = the road under the middle
export function car(x, y, k = 1, o = {}) {
  push(); translate(x, y); scale(k * (o.dir || -1), k);
  const wa = o.wheel || 0, tone = o.tone || P.dmid;
  shape(spline([[-130, -40], [-128, -78], [-60, -86], [-40, -140], [60, -142], [96, -86], [132, -74], [134, -40]], true, 5), { fill: tone, lw: S.lw * .8, shade: () => shape(rect(-140, -64, 280, 30), { fill: P.dark, stroke: false, boil: 0, alpha: .4 }) });
  shape([[-30, -96], [-18, -132], [20, -132], [20, -96]], { fill: P.light, lw: S.lw * .5 });
  shape([[30, -96], [30, -132], [54, -132], [76, -96]], { fill: P.light, lw: S.lw * .5 });
  shape(ell(-124, -68, 10, 10, 10), { fill: P.white, lw: S.lw * .5 });
  for (const wx of [-80, 84]) { shape(ell(wx, -30, 30, 30, 20), { fill: P.ink, lw: S.lw * .6 }); shape(ell(wx, -30, 14, 14, 12), { fill: P.light, lw: S.lw * .4 }); stroke([[wx - Math.cos(wa) * 12, -30 - Math.sin(wa) * 12], [wx + Math.cos(wa) * 12, -30 + Math.sin(wa) * 12]], S.lw * .4, { line: P.dark }); }
  pop();
}
// exhaust / dust puff (grows and fades): p 0..1
export function puff(x, y, r, p, col = P.light) {
  if (p <= 0 || p >= 1) return;
  const rr_ = r * (.4 + p), a = 1 - p;
  for (const [ox, oy, s] of [[0, 0, 1], [-r * .5, r * .2, .7], [r * .5, r * .15, .75]]) shape(ell(x + ox * (.5 + p), y + oy - p * r * .6, rr_ * s, rr_ * s * .8, 16), { fill: col, lw: S.lw * .5, alpha: a });
}

// —— sky ——
export function cloud(x, y, k, o = {}) {
  push(); translate(x, y); scale(k * (1 + (o.br || 0) * .03), k * (1 - (o.br || 0) * .03));
  const lob = [[-90, 6, 46], [-40, -24, 60], [24, -30, 56], [80, -2, 46], [20, 14, 56], [-50, 18, 44]];
  for (const [ox, oy, r] of lob) shape(ell(ox, oy, r, r * .78, 22), { fill: o.fill || P.paper, lw: S.lw * .7 });
  shape(ell(-4, 22, 130, 28, 24), { fill: o.fill || P.paper, stroke: false, boil: 0 });
  stroke(quad([-80, 30], [0, 44], [90, 26]), S.lw * .7);
  stroke(arc(-30, -10, 30, 22, Math.PI * 1.1, Math.PI * 1.6, 6), S.lw * .4, { line: P.light });
  pop();
}
// a distant bird (a tiny "v"), flap phase f
export function bird(x, y, s, f) { const w = Math.sin(f) * .5; stroke([[x - s, y - s * w], [x - s * .3, y - s * .15], [x, y + s * .1], [x + s * .3, y - s * .15], [x + s, y - s * w]], S.lw * .45, { line: P.dark, boil: .3 }); }
// biplane towing a banner with digits; origin = the plane centre; flying +x (dir 1) ; o.t, o.num
export function plane(x, y, k, o = {}) {
  const t = o.t || 0, dir = o.dir || 1;
  push(); translate(x, y); scale(k * dir, k);
  // banner (behind, trailing to −x)
  const bx0 = -150, bL = 300, bH = 84, pts = [], ptsB = [];
  for (let i = 0; i <= 12; i++) { const u = i / 12, xx = bx0 - 60 - u * bL, w = Math.sin(t * 8 - u * 6) * 8 * u; pts.push([xx, -bH / 2 + w]); ptsB.push([xx, bH / 2 + w]); }
  stroke([[-60, 4], pts[0], [-60, 4], ptsB[0]], S.lw * .4, { line: P.dark });
  shape([...pts, ...ptsB.reverse()], { fill: P.white, lw: S.lw * .8 });
  if (o.num) { push(); translate(bx0 - 60 - bL / 2, Math.sin(t * 8 - 3) * 4); scale(dir, 1); numeral(o.num, 0, 0, 52, { w: .15 }); pop(); }
  // plane
  shape(spline([[-90, -6], [-30, -20], [60, -22], [92, -10], [92, 10], [40, 18], [-30, 12], [-92, 4]], true, 5), { fill: P.light, lw: S.lw * .8, shade: () => shape(rect(-100, 4, 200, 20), { fill: P.mid, stroke: false, boil: 0 }) });
  shape([[-96, 2], [-120, -36], [-100, -36], [-74, -4]], { fill: P.mid, lw: S.lw * .7 });
  shape(rr(-30, -58, 120, 14, 6), { fill: P.mid, lw: S.lw * .8 });
  shape(rr(-20, 12, 110, 14, 6), { fill: P.dmid, lw: S.lw * .8 });
  for (const sx of [0, 60]) stroke([[sx, -46], [sx + 4, 14]], S.lw * .5);
  shape(ell(20, -28, 14, 10, 12), { fill: P.ink, lw: S.lw * .5 });
  stroke([[30, 26], [40, 44]], S.lw * .5); shape(ell(40, 50, 10, 10, 10), { fill: P.ink, lw: S.lw * .5 });
  const pb = Math.abs(Math.sin(t * 40)) * 34 + 6;
  shape(ell(98, 0, 6, pb, 12), { fill: P.pale, lw: S.lw * .5, alpha: .8 });
  pop();
}
// a tear-off calendar page tumbling: centred, rot, sy (flip), a small number
export function calPage(x, y, k, rot, sy, num) {
  push(); translate(x, y); rotate(rot); scale(k, k * sy);
  shape(rr(-40, -54, 80, 108, 4), { fill: P.white, lw: S.lw * .6 });
  shape(rect(-34, -48, 68, 20), { fill: P.dark, stroke: false, boil: .3 });
  if (num) numeral(num, 0, 12, 40, { w: .15 });
  pop();
}
// a big knife switch on a wall panel: origin = panel centre; lever 0 (open) .. 1 (closed); the handle sits at
// (sin φ·147, 58 − cos φ·147) × k from the origin, φ = lerp(−2.3, 0, lever)
export function knifeSwitch(x, y, k, lever = 0, o = {}) {
  push(); translate(x, y); scale(k);
  shape(rr(-70, -110, 140, 220, 10), { fill: P.dmid, lw: S.lw * .9, shade: () => shape(rect(30, -120, 60, 240), { fill: P.dark, stroke: false, boil: 0, alpha: .5 }) });
  for (const [bx, by] of [[-56, -96], [56, -96], [-56, 96], [56, 96]]) shape(ell(bx, by, 5, 5, 8), { fill: P.light, lw: S.lw * .3 });
  for (const s of [-1, 1]) { shape(rect(s * 24 - 8, 40, 16, 34), { fill: P.light, lw: S.lw * .5 }); shape(rect(s * 24 - 8, -74, 16, 30), { fill: P.light, lw: S.lw * .5 }); }
  // the blades hinge at the bottom clips; lever 0 = swung down-left (open), 1 = straight up into the top clips (closed)
  const phi = lerp(-2.3, 0, lever);
  for (const s_ of [-1, 1]) { push(); translate(s_ * 24, 58); rotate(phi); shape(rect(-5, -124, 10, 124), { fill: P.white, lw: S.lw * .55 }); pop(); }
  push(); translate(0, 58); rotate(phi);
  shape(rect(-30, -124, 60, 12), { fill: P.dark, lw: S.lw * .5 });
  shape(rr(-12, -172, 24, 50, 10), { fill: P.ink, lw: S.lw * .6 });
  pop();
  if (o.spark) sparks(0, -60, o.spark, 8, 80, 3);
  pop();
}

// —— the tower, wide, rising: world coords, centre cx, street y0, floor height fh ——
export const TW = { cx: 520, y0: 1750, fh: 15.5 };
export const floorY = f => TW.y0 - f * TW.fh;
function halfW(f) { return f < 6 ? 228 : f < 21 ? 172 : f < 25 ? 164 : f < 30 ? 158 : f < 72 ? 150 : f < 81 ? 120 : f < 85 ? 94 : 80; }
// o.steel (floors of steel, float), o.clad (floors clad), o.mast 0..1 (the mooring mast), o.lit 0..1 (lights wave), o.night 0..1, o.t
export function towerWide(o) {
  const g = T.g, b = T.BASE, { cx, fh } = TW, st = o.steel, cl = Math.min(o.clad, st), t = o.t || 0;
  g.save(); g.setTransform(b[0], b[1], b[2], b[3], b[4], b[5]);
  // clad floors: stone with recessed window strips
  for (let f = 0; f < Math.floor(cl); f++) {
    const hw = halfW(f), y = floorY(f + 1);
    g.fillStyle = f < 6 ? '#BEBBB3' : '#C9C6BE'; g.fillRect(cx - hw, y, hw * 2, fh + .6);
    // windows: strips every 12 px
    for (let x = cx - hw + 7; x < cx + hw - 6; x += 12) {
      const id = f * 131 + Math.round(x), on = o.lit > 0 && hash(id * .37) < .82 && (f / 86) < o.lit * 1.05 - hash(id) * .05;
      g.fillStyle = on ? 'rgba(255,250,230,.95)' : 'rgba(70,68,64,.55)'; g.fillRect(x, y + 4, 5, fh - 7);
    }
    // a hard shadow side (light from the upper left)
    g.fillStyle = 'rgba(40,38,34,.22)'; g.fillRect(cx + hw * .35, y, hw * .65, fh + .6);
  }
  // steel above the cladding
  g.strokeStyle = '#3B3A37'; g.lineWidth = 2.2;
  const top = floorY(st);
  for (let f = Math.floor(cl); f < Math.ceil(st); f++) {
    const hw = halfW(f), y1 = floorY(f), y2 = Math.max(top, floorY(f + 1));
    g.beginPath(); g.moveTo(cx - hw, y1); g.lineTo(cx + hw, y1); g.stroke();
    for (let x = cx - hw; x <= cx + hw + .1; x += hw / 6) { g.beginPath(); g.moveTo(x, y1); g.lineTo(x, y2 - (f === Math.ceil(st) - 1 ? 6 : 0)); g.stroke(); }
    if (f % 2 === 0) { g.strokeStyle = 'rgba(59,58,55,.4)'; g.lineWidth = 1.2; g.beginPath(); for (let x = cx - hw; x < cx + hw; x += hw / 3) { g.moveTo(x, y1); g.lineTo(x + hw / 6, y2); } g.stroke(); g.strokeStyle = '#3B3A37'; g.lineWidth = 2.2; }
  }
  if (st > cl + .5) { const f = Math.floor(st), hw = halfW(f); if (st - f > .05) { g.beginPath(); g.moveTo(cx - hw, floorY(st)); g.lineTo(cx + hw, floorY(st)); g.stroke(); } }
  g.restore();
  // the mooring mast
  const mp = clamp(o.mast || 0);
  if (mp > 0) {
    const y86 = floorY(86), mh = 250 * mp;
    shape([[cx - 46, y86], [cx - 40, y86 - mh * .55], [cx - 22, y86 - mh * .9], [cx - 10, y86 - mh], [cx + 10, y86 - mh], [cx + 22, y86 - mh * .9], [cx + 40, y86 - mh * .55], [cx + 46, y86]], { fill: o.lit > .9 ? P.white : P.pale, lw: S.lw * .5, boil: .3, shade: () => shape(rect(cx + 12, y86 - mh, 40, mh), { fill: P.mid, stroke: false, boil: 0, alpha: .5 }) });
    for (const dx of [-24, 0, 24]) stroke([[cx + dx, y86], [cx + dx * .4, y86 - mh * .95]], S.lw * .25, { line: P.dmid, boil: .2 });
    if (mp >= 1) { stroke([[cx, y86 - mh], [cx, y86 - mh - 40]], S.lw * .5); if (o.lit > .9) glow(cx, y86 - mh - 40, 40, .5 + .5 * Math.sin(t * 6)); }
  }
  // outline of the clad part (boiling, like the props)
  if (cl > .5) {
    const pts = [], f1 = Math.floor(cl);
    for (let f = 0; f < f1; f++) { pts.push([cx - halfW(f), floorY(f)]); pts.push([cx - halfW(f), floorY(f + 1)]); }
    for (let f = f1 - 1; f >= 0; f--) { pts.push([cx + halfW(f), floorY(f + 1)]); pts.push([cx + halfW(f), floorY(f)]); }
    shape(pts, { lw: S.lw * .45, boil: .4 });
  }
}
// a small derrick standing on the steel top (wide scale): foot (x, y), boom swing angle
export function miniDerrick(x, y, ang, k = 1) {
  push(); translate(x, y); scale(k);
  stroke([[0, 0], [0, -70]], S.lw * .5, { line: P.ink });
  const tx_ = Math.cos(ang) * 64, ty_ = -20 + Math.sin(ang) * 64;
  stroke([[0, -4], [tx_, ty_]], S.lw * .45, { line: P.ink });
  stroke([[0, -70], [tx_, ty_]], S.lw * .25, { line: P.dark });
  stroke([[tx_, ty_], [tx_, ty_ + 30]], S.lw * .2, { line: P.dark });
  pop();
}
// searchlight beams from a point, sweeping
export function beams(x, y, t, a = 1) {
  if (a <= 0) return;
  for (let i = 0; i < 3; i++) {
    const c = -Math.PI / 2 + Math.sin(t * .9 + i * 2.1) * .9, w = .045, L = 1400;
    shape([[x, y], [x + Math.cos(c - w) * L, y + Math.sin(c - w) * L], [x + Math.cos(c + w) * L, y + Math.sin(c + w) * L]], { fill: P.white, stroke: false, boil: 0, alpha: .16 * a });
  }
}
export function glint(x, y, r, a = 1) {
  const p = []; for (let i = 0; i < 8; i++) { const rr_ = i % 2 ? r * .28 : r, an = i / 8 * TAU; p.push([x + Math.cos(an) * rr_, y + Math.sin(an) * rr_]); }
  shape(p, { fill: P.white, lw: S.lw * .5, alpha: a });
}
// speed lines (behind something moving along +x by default)
export function speedLines(x, y, len, n, dir = 1, a = 1, seed = 1) {
  for (let i = 0; i < n; i++) { const yy = y + (i - (n - 1) / 2) * 22, l = len * (.5 + hash(seed + i) * .6); stroke([[x, yy], [x - dir * l, yy]], S.lw * .5, { line: P.ink, alpha: a }); }
}
// wind streaks across the sky
export function windLine(x, y, L, p) { const pts = []; for (let i = 0; i <= 10; i++) { const u = i / 10; pts.push([x + u * L, y + Math.sin(u * 5 + p * 6) * 8]); } stroke(pts, S.lw * .4, { line: P.white, alpha: .7 * Math.sin(Math.PI * clamp(p)) }); }
// smoke wisp from a chimney: base (x,y), drifting to +x with the wind; t
export function smoke(x, y, k, t, seed = 0) {
  for (let i = 0; i < 4; i++) {
    const p = ((t * .35 + i / 4 + hash(seed) ) % 1), r = (8 + p * 26) * k;
    shape(ell(x + p * p * 90 * k + Math.sin(t * 2 + i) * 4 * k, y - p * 110 * k, r, r * .8, 14), { fill: P.light, lw: S.lw * .35, alpha: (1 - p) * .8, boil: .5 });
  }
}
