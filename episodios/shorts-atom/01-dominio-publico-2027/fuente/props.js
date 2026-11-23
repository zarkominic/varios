// props.js — the short's props in the rubber-hose drawing language (flat greys + ink, boiling line, form-shadow band).
// Only generic objects: wall calendar, bed sheets, hourglass, treasure chests and padlocks, a castle on a hill, a cute bat,
// a cape on a coat stand, a single flower, a fedora, a rubber stamp, a director's chair. Numerals are hand-inked strokes
// (no font, no words). All coordinates are prop-local with the origin on the ground under the prop, y down.
import * as T from '/styles/rubber-hose/demo/toon.js';
import { P, ribbon, pieEye } from '/styles/rubber-hose/demo/chars.js';
import { clamp, lerp, TAU, hash } from '/core/lib.js';
const { shape, stroke, ell, arc, rr, rect, spline, quad, push, pop, translate, rotate, scale, S } = T;

export const at = (x, y, k, fn, o = {}) => { push(); translate(x, y); if (o.rot) rotate(o.rot); scale(k * (o.sx || 1), k * (o.sy || 1)); fn(); pop(); };

// —— hand-inked numerals ——
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
// str centred on (cx, cy), cap height h; o.col ink colour, o.halo = a wider stroke under it, o.w = stroke weight (× h)
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

// —— wall calendar: board on a nail, a stack of tear-off pages (band with the year + the big day) ——
export const CAL = { w: 270, h: 380 };
export function calPage(num, band, o = {}) {           // local: page top-left at (0,0)
  const { w, h } = CAL;
  shape(rr(0, 0, w, h, 6), { fill: P.white, lw: S.lw * .8, shade: () => shape(rect(w * .78, 0, w * .3, h), { fill: P.paper, stroke: false, boil: 0 }) });
  shape(rr(10, 12, w - 20, 74, 4), { fill: P.dark, lw: S.lw * .6 });
  numeral(band, w / 2, 49, 40, { col: P.white, w: .13 });
  push(); translate(w / 2, 225); if (o.pop) scale(1 + o.pop * .25, 1 - o.pop * .12); numeral(num, 0, 0, 200, { w: .16 }); pop();
  // perforation along the top
  for (let x = 12; x < w; x += 16) shape(ell(x, 4, 2.5, 2.5, 8), { fill: P.mid, stroke: false, boil: 0 });
}
// o.top {num, band}, o.under {num, band}, o.peel 0..1 (the top page stretches toward the yank), o.torn (top page gone),
// o.flip 0..1 (one page flipping up over the binding, for the "pages fly back" gag), o.flipNum
export function calendar(x, y, o = {}) {
  const { w, h } = CAL;
  push(); translate(x, y);
  // nail + string
  stroke([[-w * .42, 40], [0, -26], [w * .42, 40]], S.lw * .55, { line: P.dark });
  shape(ell(0, -26, 7, 7, 12), { fill: P.dark, lw: S.lw * .5 });
  shape(rr(-w / 2 - 16, 26, w + 32, h + 34, 10), { fill: P.dmid, lw: S.lw * .8, shade: () => shape(rect(w * .3, 26, w, h + 40), { fill: P.dark, stroke: false, boil: 0, alpha: .35 }) });
  push(); translate(-w / 2, 44);
  calPage(o.under.num, o.under.band, { pop: o.underPop || 0 });
  if (!o.torn && o.top) {
    const pl = o.peel || 0;
    push(); T.transform(1 + pl * .08, 0, pl * .22, 1 + pl * .32, 0, 0); calPage(o.top.num, o.top.band); pop();
  }
  if (o.torn) for (let x2 = 6; x2 < w - 6; x2 += 18) shape([[x2, -2], [x2 + 18, -2], [x2 + 12, 9], [x2 + 6, 4]], { fill: P.white, lw: S.lw * .4 });
  if (o.flip != null && o.flip > 0 && o.flip < 1) {     // a page swinging up over the top binding (squashes through edge-on)
    const c = Math.cos(o.flip * Math.PI);
    push(); scale(1, c); if (c > 0) calPage(o.flipNum || '8', o.flipBand || '1931'); else shape(rr(0, 0, w, h, 6), { fill: P.paper, lw: S.lw * .8 }); pop();
  }
  pop();
  // binder rings
  for (let i = 0; i < 5; i++) { const rx = -w / 2 + 30 + i * (w - 60) / 4; shape(arc(rx, 44, 9, 14, Math.PI, TAU, 10), { closed: false, lw: S.lw * .7 }); }
  pop();
}
// a torn page falling: centred at (x, y), rot, sy (flattened when lying on the floor)
export function fallingPage(x, y, rot, sy, num, band) {
  push(); translate(x, y); rotate(rot); scale(.9, .9 * sy); translate(-CAL.w / 2, -CAL.h / 2); calPage(num, band); pop();
}

// —— bed sheets over the three props (no eye holes: these are covered furniture, not ghosts) ——
const SHEET = {
  castle: { w: 330, h: 330, p: [[-1, 0], [-.98, -.32], [-.82, -.52], [-.6, -.6], [-.56, -.9], [-.38, -.96], [-.3, -.68], [.08, -.74], [.3, -.7], [.36, -.98], [.58, -1], [.64, -.64], [.86, -.48], [.99, -.28], [1, 0]] },
  stand: { w: 250, h: 500, p: [[-.62, 0], [-.55, -.3], [-.72, -.62], [-.9, -.74], [-.58, -.82], [-.16, -.88], [-.1, -.99], [.1, -.99], [.16, -.88], [.58, -.82], [.9, -.74], [.72, -.62], [.55, -.3], [.62, 0]] },
  table: { w: 270, h: 330, p: [[-1, 0], [-.92, -.4], [-1, -.56], [-.6, -.63], [-.3, -.64], [-.26, -.86], [-.1, -1], [.06, -.95], [.12, -.7], [.32, -.64], [1, -.56], [.92, -.4], [1, 0]] },
};
// o.wob (px sway at the top), o.lift (hop), o.sq (squash), o.drop 0..1 (collapses into a puddle)
export function sheet(x, y, kind, o = {}) {
  const D = SHEET[kind], dr = clamp(o.drop || 0), hh = D.h * (1 - .9 * dr) * (1 + (o.sq || 0)), ww = D.w / 2 * (1 + .5 * dr) * (1 - (o.sq || 0) * .5);
  const lift = (o.lift || 0) * (1 - dr), wob = (o.wob || 0) * (1 - dr);
  const map = q => [q[0] * ww + wob * Math.pow(-q[1], 1.6), q[1] * hh - lift * (q[1] < -.05 ? 1 : .3)];
  const prof = D.p.map(map), hem = [];
  for (let i = 1; i < 10; i++) { const u = i / 10; hem.push([lerp(ww * (D.p[D.p.length - 1][0]), ww * D.p[0][0], u) + wob * 0, (i % 2 ? 9 : -3) - lift * .3]); }
  push(); translate(x, y);
  const pts = spline([...prof, ...hem], true, 6);
  shape(pts, { fill: P.paper, lw: S.lw * .9, shade: () => shape(ell(ww * .75 + wob * .6, -hh * .45, ww * .55, hh * .8), { fill: P.pale, stroke: false, boil: 0 }) });
  // folds hanging from the high points
  if (dr < .85) {
    const tops = D.p.filter(q => q[1] < -.8).map(map);
    tops.forEach((q, i) => stroke(quad([q[0], q[1] + 20], [q[0] + (i % 2 ? 14 : -14), q[1] * .5], [q[0] * 1.15, -8]), S.lw * .5, { line: P.mid }));
    stroke(quad([-ww * .5, -hh * .55], [-ww * .58, -hh * .3], [-ww * .5, -6]), S.lw * .45, { line: P.light });
  }
  pop();
}

// —— hourglass: wooden caps (top «1931», bottom «2027»), turned posts, glass bulbs, sand; a «95» tag swings at the post ——
const HG = (() => { const b = [[18, -360], [40, -330], [100, -262], [128, -182], [118, -110], [80, -72], [0, -62]]; return b; })();
function hgGlass() {
  const R = HG, Ltop = R.map(([x, y]) => [x, -720 - y]).reverse();     // right side, top bulb (from the top cap down to the neck)
  const right = [...Ltop, ...R.slice(1)];
  const left = right.map(([x, y]) => [-x, y]).reverse();
  return spline([...right, ...left], true, 5);
}
// o.level 0..1 (sand left in the top bulb), o.stream, o.pTop / o.pBot / o.p95 (numeral pops), o.tagSwing, o.t
export function hourglass(x, y, k, o = {}) {
  push(); translate(x, y); scale(k * (o.sx || 1), k * (o.sy || 1));
  const lv = clamp(o.level ?? 1), glass = hgGlass();
  // back posts
  for (const s of [-1, 1]) post(s * 150);
  // glass + sand
  const gp = shape(glass, { fill: 'rgba(226,223,214,.55)', stroke: false, boil: 0 });
  const g = T.g; g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.clip(gp);
  const yl = -360 - 6 - lv * 280, dip = 14 * lv;
  if (lv > .005) shape([[-140, yl], [-30, yl], [0, yl + dip], [30, yl], [140, yl], [140, -355], [-140, -355]], { fill: P.dmid, stroke: false, boil: 0 });
  const hb = 18 + (1 - lv) * 240;
  shape([[-150, -60], [-150, -64 - hb * .22], [-60, -64 - hb * .7], [0, -64 - hb], [60, -64 - hb * .7], [150, -64 - hb * .22], [150, -60]], { fill: P.dmid, lw: S.lw * .4, line: P.dark });
  if (o.stream && lv > .002) shape(rect(-3, -362, 6, 300 - hb), { fill: P.dmid, stroke: false, boil: 0 });
  g.restore();
  // highlights + outline
  stroke(quad([-92, -610], [-120, -540], [-96, -460]), S.lw * .9, { line: P.white, boil: .4 });
  stroke(quad([-92, -258], [-120, -190], [-94, -116]), S.lw * .9, { line: P.white, boil: .4 });
  shape(glass, { lw: S.lw * .9 });
  // front posts
  for (const s of [-1, 1]) post(s * 128, true);
  // caps
  for (const [cy, num, pp] of [[-720, '1931', o.pTop || 0], [-60, '2027', o.pBot || 0]]) {
    shape(rr(-178, cy, 356, 60, 14), { fill: P.dmid, lw: S.lw, shade: () => shape(rect(-178, cy + 40, 356, 30), { fill: P.dark, stroke: false, boil: 0 }) });
    shape(rr(-90, cy + 8, 180, 44, 8), { fill: P.dark, lw: S.lw * .6 });
    push(); translate(0, cy + 30); scale(1 + pp * .3); numeral(num, 0, 0, 30, { col: P.white, w: .14 }); pop();
  }
  for (const s of [-1, 1]) shape(ell(s * 150, 10, 22, 12, 14), { fill: P.dark, lw: S.lw * .7 });
  // «95» tag on a string from the right post
  const sw = o.tagSwing || 0, ax = 150, ay = -470, ang = .35 + sw;
  const tx = ax + Math.sin(ang) * 120, ty = ay + Math.cos(ang) * 120;
  stroke([[ax, ay], [tx, ty - 50]], S.lw * .5);
  push(); translate(tx, ty); rotate(-sw * .6); const pp = o.p95 || 0; scale(1 + pp * .3);
  shape(ell(0, 0, 56, 56, 32), { fill: P.white, lw: S.lw, shade: () => shape(ell(14, 12, 52, 52, 30), { fill: P.pale, stroke: false, boil: 0 }) });
  shape(ell(0, 0, 45, 45, 30), { lw: S.lw * .4, line: P.mid });
  shape(ell(0, -48, 6, 6, 10), { fill: P.dark, lw: S.lw * .4 });
  numeral('95', 0, 4, 48, { w: .16 });
  pop();
  pop();
  function post(px, front) {
    shape(rect(px - 9, -664, 18, 608), { fill: front ? P.dmid : P.dark, lw: S.lw * .7 });
    for (const by of [-600, -360, -120]) shape(ell(px, by, 15, 11, 14), { fill: front ? P.dmid : P.dark, lw: S.lw * .6 });
  }
}

// —— treasure chest; o.lid 0..1 open, o.lock {open 0..1, fall 0..1}, o.chains, o.tags [{num, sw}], o.shake (px), o.inside(fn) ——
export function chest(x, y, k, o = {}) {
  push(); translate(x + (o.shake || 0), y); scale(k * (o.sx || 1), k * (o.sy || 1));
  const W = 165, H = 150, lid = clamp(o.lid || 0);
  // open lid (seen from the front it rises behind the rim, showing its dark underside)
  if (lid > 0) {
    const hl = 150 * Math.sin(Math.min(lid * 1.9, Math.PI / 2)) * (lid > 1 ? 1 + (lid - 1) * .6 : 1), yb = -H - 14;
    const lp = [[-W + 4, yb], [-W - 6, yb - hl * .8], ...arc(0, yb - hl * .8, W + 6, hl * .25, Math.PI, TAU, 18), [W + 6, yb - hl * .8], [W - 4, yb]];
    shape(lp, { fill: P.dark, lw: S.lw, shade: () => shape(rr(-W + 22, yb - hl * .9, W * 2 - 44, hl * .8, 10), { fill: P.dmid, stroke: false, boil: 0 }) });
    for (const s of [-1, 1]) shape(rect(s * 110 - 11, yb - hl * .95, 22, hl * .95), { fill: P.ink, stroke: false, boil: .3, alpha: .7 });
    shape(ell(0, -H + 2, W - 8, 24, 28), { fill: P.ink, lw: S.lw * .8 });
    if (o.inside) o.inside();
  }
  // body
  shape(rr(-W, -H, W * 2, H, 10), { fill: P.dmid, lw: S.lw, shade: () => shape(rect(W * .45, -H, W, H), { fill: P.dark, stroke: false, boil: 0, alpha: .45 }) });
  for (const py of [-100, -50]) stroke([[-W + 8, py], [W - 8, py]], S.lw * .45, { line: P.dark });
  for (const s of [-1, 1]) {
    shape(rect(s * 110 - 13, -H, 26, H), { fill: P.dark, lw: S.lw * .6 });
    for (const ry of [-130, -75, -20]) shape(ell(s * 110, ry, 4, 4, 8), { fill: P.light, stroke: false, boil: 0 });
    shape([[s * W, -H + 34], [s * W, -H], [s * (W - 34), -H]], { fill: P.dark, lw: S.lw * .5 });
  }
  // closed lid: a dome
  if (lid === 0) {
    shape([[-W, -H], ...arc(0, -H, W, 64, Math.PI, TAU, 22), [W, -H]], { fill: P.dmid, lw: S.lw, shade: () => shape(ell(W * .6, -H - 10, W * .6, 70, 20), { fill: P.dark, stroke: false, boil: 0, alpha: .45 }) });
    for (const s of [-1, 1]) shape([[s * 110 - 13, -H], [s * 106 - 12, -H - 52], [s * 106 + 12, -H - 50], [s * 110 + 13, -H]], { fill: P.dark, lw: S.lw * .6 });
  }
  // chains
  if (o.chains) for (const s of [-1, 1]) {
    for (let i = 0; i <= 11; i++) {
      const u = i / 11, cx = lerp(-W + 10, W - 10, u) * s, cy = lerp(-H - 30, -18, u) + Math.sin(u * Math.PI) * 22;
      const ang = Math.atan2(-H - 30 + 18, (W - 10) * 2 * s) + (i % 2 ? Math.PI / 2 : 0);
      push(); translate(cx, cy); rotate(ang); shape(ell(0, 0, 15, 9, 14), { lw: S.lw * .55, fill: i % 2 ? P.dmid : P.mid }); pop();
    }
  }
  // hasp + padlock
  shape(rr(-18, -H - 10, 36, 58, 6), { fill: P.dark, lw: S.lw * .7 });
  const L = o.lock || {}, op = clamp(L.open || 0), fall = clamp(L.fall || 0);
  if (fall < 1) {
    push(); translate(0, -H + 52 + fall * fall * 200); rotate(fall * 1.4 + (L.swing || 0));
    // shackle
    push(); translate(-26, -6 - op * 34); rotate(-op * .9);
    const sk = arc(26, 0, 26, 40, Math.PI, TAU, 14).concat([[52, 22]]); sk.unshift([0, 22]);
    const zk = T.zoom(); stroke(sk, 16 * zk, { line: P.ink }); stroke(sk, 9 * zk, { line: P.mid, boil: .5 });
    pop();
    shape(rr(-40, -10, 80, 72, 16), { fill: P.light, lw: S.lw, shade: () => shape(rect(12, -10, 40, 80), { fill: P.mid, stroke: false, boil: 0 }) });
    shape(ell(0, 18, 9, 9, 12), { fill: P.ink, stroke: false, boil: 0 }); shape([[-5, 22], [5, 22], [8, 44], [-8, 44]], { fill: P.ink, stroke: false, boil: 0 });
    // tags hanging from the lock
    (o.tags || []).forEach((tg, i) => {
      const n = o.tags.length, hx = (i - (n - 1) / 2) * 26, a = (i - (n - 1) / 2) * .8 + (tg.sw || 0);
      const ex = hx + Math.sin(a) * 100, ey = 60 + Math.cos(a) * 100;
      stroke([[hx, 56], [ex, ey]], S.lw * .4, { line: P.dark });
      push(); translate(ex, ey); rotate(-a * .7);
      shape([[-48, 0], [48, 0], [48, 44], [-48, 44], [-58, 22]], { fill: P.white, lw: S.lw * .7 });
      numeral(tg.num, -2, 22, 24, { w: .14 });
      pop();
    });
    pop();
  }
  pop();
}

// —— light rays from an open chest (white wedges, behind it) ——
export function rays(x, y, r, t, a = 1) {
  const g = T.g;
  for (let i = 0; i < 9; i++) {
    const c = -Math.PI / 2 + (i - 4) * .3 + Math.sin(t * 1.4 + i) * .05, w = .07 + .03 * Math.sin(t * 3 + i * 2);
    shape([[x, y], [x + Math.cos(c - w) * r, y + Math.sin(c - w) * r], [x + Math.cos(c + w) * r, y + Math.sin(c + w) * r]], { fill: P.white, stroke: false, boil: 0, alpha: .32 * a });
  }
  g.globalAlpha = 1;
}

// —— a cartoon castle on a hill + a little storm cloud with a lightning bolt (cute, not spooky) ——
export function castleHill(x, y, k, o = {}) {
  push(); translate(x, y); scale(k * (o.sx || 1), k * (o.sy || 1));
  const t = o.t || 0;
  shape(spline([[-155, 0], [-138, -52], [-70, -100], [20, -112], [110, -78], [152, -24], [158, 0]], true, 6), { fill: P.mid, lw: S.lw, shade: () => shape(ell(110, -30, 90, 90), { fill: P.dmid, stroke: false, boil: 0 }) });
  stroke(spline([[-6, -108], [-40, -80], [10, -52], [-20, -20], [10, 0]], false, 6), S.lw * .9, { line: P.light });
  for (const [tx, ty] of [[-110, -40], [90, -60], [125, -20]]) shape(ell(tx, ty, 18, 9, 12), { fill: P.dmid, lw: S.lw * .5 });   // shrubs
  // towers (behind the keep)
  for (const [tx, tw, th, ap] of [[-78, 48, 250, 330], [70, 46, 228, 302]]) {
    shape(rect(tx - tw / 2, -th, tw, th - 100), { fill: P.pale, lw: S.lw * .9, shade: () => shape(rect(tx + tw * .15, -th, tw, th), { fill: P.light, stroke: false, boil: 0 }) });
    shape([[tx - tw / 2 - 10, -th], [tx, -ap], [tx + tw / 2 + 10, -th]], { fill: P.dark, lw: S.lw * .9 });
    shape(arc(tx, -th + 48, 8, 12, Math.PI, TAU, 8).concat([[tx + 8, -th + 66], [tx - 8, -th + 66]]), { fill: P.ink, stroke: false, boil: .4 });
  }
  // pennant on the right tower
  stroke([[70, -302], [70, -350]], S.lw * .6);
  const fw = Math.sin(t * 6) * 6;
  shape([[70, -350], [112, -340 + fw], [70, -328]], { fill: P.white, lw: S.lw * .6 });
  // keep with crenellations
  const top = [[-56, -104], [-56, -200]]; for (let i = 0; i < 5; i++) { const mx = -56 + i * 24; top.push([mx, -218], [mx + 14, -218], [mx + 14, -200], [mx + 24, -200]); }
  top.push([56, -200], [56, -104]);
  shape(top, { fill: P.light, lw: S.lw * .9, shade: () => shape(rect(20, -230, 60, 140), { fill: P.mid, stroke: false, boil: 0, alpha: .6 }) });
  shape([[-18, -104], ...arc(0, -134, 18, 22, Math.PI, TAU, 10), [18, -104]], { fill: P.ink, lw: S.lw * .6 });
  for (const wx of [-30, 30]) shape([[wx - 7, -150], ...arc(wx, -164, 7, 9, Math.PI, TAU, 6), [wx + 7, -150]], { fill: P.ink, stroke: false, boil: .4 });
  // cloud + bolt
  const cx = -120, cy = -400 + Math.sin(t * 1.3) * 5;
  if ((o.bolt || 0) > 0) {
    const b = [[cx + 20, cy + 20], [cx + 50, cy + 20], [cx + 38, cy + 70], [cx + 70, cy + 70], [cx + 18, cy + 160], [cx + 30, cy + 96], [cx + 2, cy + 96]];
    shape(b, { fill: P.white, lw: S.lw * .9, alpha: o.bolt });
  }
  for (const [ox, oy, r] of [[-40, 10, 34], [0, -10, 44], [44, 4, 36], [10, 18, 36]]) shape(ell(cx + ox, cy + oy, r, r * .8, 20), { fill: P.light, lw: S.lw * .8 });
  shape(ell(cx + 2, cy + 14, 70, 22, 20), { fill: P.light, stroke: false, boil: 0 });
  pop();
}

// —— a cute bat (round body, big pie eyes, a smile, scalloped wings; no fangs) ——
// o.flap -1..1, o.hang (upside down, wings folded), o.lid, o.lx/ly, o.fold 0..1
export function bat(x, y, k, o = {}) {
  push(); translate(x, y); if (o.rot) rotate(o.rot); scale(k);
  if (o.hang) rotate(Math.PI);
  const fl = (o.flap || 0) * 38, fold = clamp(o.fold ?? 0);
  for (const s of [-1, 1]) {
    const wf = (q) => [s * lerp(q[0], 18 + (q[0] - 18) * .32, fold), lerp(q[1] + fl * Math.min(1, (q[0] - 18) / 60), q[1] * .5 + 12, fold)];
    const wing = [[18, -10], [48, -40], [84, -32], [102, -6], [84, 6], [72, -2], [60, 12], [46, 4], [30, 16]].map(wf);
    shape(spline(wing, true, 4), { fill: P.dark, lw: S.lw * .8 });
    stroke([wf([22, -6]), wf([84, -30])], S.lw * .4, { line: P.mid }); stroke([wf([22, -2]), wf([72, -2])], S.lw * .4, { line: P.mid });
  }
  for (const s of [-1, 1]) shape([[s * 8, -24], [s * 24, -52], [s * 26, -20]], { fill: P.dark, lw: S.lw * .7 });
  shape(ell(0, 0, 30, 32, 24), { fill: P.dark, lw: S.lw * .9, shade: () => shape(ell(-8, -8, 22, 24, 18), { fill: P.dmid, stroke: false, boil: 0 }) });
  shape(ell(0, 8, 18, 16, 16), { fill: P.mid, stroke: false, boil: .3 });
  if (o.hang) rotate(Math.PI);           // the face stays upright even when hanging
  const fy = o.hang ? 2 : -6;
  for (const s of [-1, 1]) pieEye(s * 10, fy, 8.5, 11.5, { lx: o.lx || 0, ly: o.ly || 0, lid: o.lid || 0, lidCol: P.dark, side: -s, lwk: .6 });
  stroke(quad([-9, fy + 15], [0, fy + 22], [9, fy + 15]), S.lw * .6, { line: P.white });
  for (const s of [-1, 1]) stroke([[s * 6, o.hang ? -30 : 30], [s * 8, o.hang ? -38 : 38]], S.lw * .6);
  pop();
}

// —— coat stand with a cape on a hanger (high collar, lighter lining); o.sway, o.cape ——
export const STAND = { peg: [62, -452] };
export function coatStand(x, y, k, o = {}) {
  push(); translate(x, y); scale(k * (o.sx || 1), k * (o.sy || 1));
  for (const s of [-1, 0, 1]) stroke(quad([0, -40], [s * 40, -24], [s * 70 + (s ? 0 : 6), 0]), 12 * T.zoom(), { line: P.dark });
  shape(rect(-9, -476, 18, 440), { fill: P.dmid, lw: S.lw * .8 });
  shape(ell(0, -484, 17, 14, 14), { fill: P.dmid, lw: S.lw * .8 });
  for (const s of [-1, 1]) { stroke([[s * 6, -420], [s * 58, -448]], 8 * T.zoom(), { line: P.dark }); shape(ell(s * 62, -452, 8, 8, 10), { fill: P.dmid, lw: S.lw * .5 }); }
  if (o.cape !== false) {
    push(); translate(0, -470); rotate(o.sway || 0);
    stroke(arc(0, -6, 10, 10, Math.PI * .9, Math.PI * 2.2, 10), S.lw * .7);
    // collar (behind)
    shape(spline([[-74, 56], [-132, 0], [-104, -8], [-40, 30], [40, 30], [104, -8], [132, 0], [74, 56]], true, 5), { fill: P.mid, lw: S.lw * .8 });
    // hanger bar
    stroke([[-80, 58], [0, 22], [80, 58]], S.lw * 1.1, { line: P.dark });
    // cape body
    const hem = []; for (let i = 0; i <= 8; i++) { const u = i / 8; hem.push([lerp(132, -132, u), 280 + (i % 2 ? 14 : 0) + Math.sin(i + (o.t || 0) * 3) * 3]); }
    shape(spline([[-70, 52], [70, 52], [104, 130], [132, 276], ...hem, [-104, 130]], true, 5), { fill: P.dark, lw: S.lw, shade: () => shape(rect(30, 40, 120, 320), { fill: P.ink, stroke: false, boil: 0, alpha: .35 }) });
    shape(spline([[-14, 56], [14, 56], [24, 180], [28, 280], [-28, 280], [-24, 180]], true, 4), { fill: P.mid, lw: S.lw * .5 });
    stroke(quad([-60, 110], [-80, 200], [-92, 272]), S.lw * .45, { line: P.dmid });
    stroke(quad([60, 110], [76, 200], [86, 272]), S.lw * .45, { line: P.ink });
    pop();
  }
  pop();
}

// —— a single flower in a vase on a small round table; o.bloom 0..1, o.sway ——
export function flowerTable(x, y, k, o = {}) {
  push(); translate(x, y); scale(k * (o.sx || 1), k * (o.sy || 1));
  shape(ell(0, -8, 56, 14, 18), { fill: P.dark, lw: S.lw * .7 });
  shape(rect(-12, -186, 24, 178), { fill: P.dmid, lw: S.lw * .8 });
  shape(ell(0, -186, 112, 24, 30), { fill: P.dmid, lw: S.lw * .9, shade: () => shape(ell(30, -176, 100, 22, 24), { fill: P.dark, stroke: false, boil: 0, alpha: .4 }) });
  shape(rect(-112, -186, 224, 16), { fill: P.dark, lw: S.lw * .6 });
  // vase
  const vx = -34;
  shape(spline([[vx - 14, -282], [vx + 14, -282], [vx + 12, -262], [vx + 34, -226], [vx + 26, -196], [vx - 26, -196], [vx - 34, -226], [vx - 12, -262]], true, 5), { fill: P.light, lw: S.lw * .8, shade: () => shape(ell(vx + 18, -230, 20, 40), { fill: P.mid, stroke: false, boil: 0 }) });
  // flower
  const sw = o.sway || 0, hx = vx + 6 + sw * 30, hy = -470, bl = clamp(o.bloom ?? 1);
  stroke(spline([[vx, -276], [vx - 10, -340], [vx + 10 + sw * 10, -410], [hx, hy + 20]], false, 6), S.lw * .9, { line: P.ink });
  for (const s of [-1, 1]) shape(spline([[vx - 4, -330], [vx + s * 38, -350 - (s > 0 ? 10 : 0)], [vx + s * 20, -328]], true, 4), { fill: P.dmid, lw: S.lw * .6 });
  const pr = 22 * (.35 + .65 * bl);
  for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + sw; shape(ell(hx + Math.cos(a) * pr * 1.1, hy + Math.sin(a) * pr * 1.1, pr * .78, pr * .62, 12, a), { fill: P.white, lw: S.lw * .7 }); }
  shape(ell(hx, hy, 15, 15, 14), { fill: P.dmid, lw: S.lw * .7 });
  if (o.hat) fedora(56, -196, .62, -.08);
  pop();
}

// —— fedora: origin = centre under the brim ——
export function fedora(x, y, k, rot = 0, o = {}) {
  push(); translate(x, y); rotate(rot); scale(k * (o.sx || 1), k * (o.sy || 1));
  shape(spline([[-58, -16], [-62, -64], [-40, -100], [-10, -90], [0, -80], [10, -90], [40, -100], [62, -64], [58, -16]], true, 6), { fill: P.dmid, lw: S.lw, shade: () => shape(rect(24, -110, 60, 100), { fill: P.dark, stroke: false, boil: 0, alpha: .5 }) });
  stroke(quad([0, -80], [-4, -56], [0, -40]), S.lw * .55, { line: P.dark });
  shape([[-59, -40], [59, -40], [58, -16], [-58, -16]], { fill: P.ink, lw: S.lw * .6 });
  shape(spline([[-104, -2], [-84, -20], [0, -24], [84, -20], [104, -2], [76, 10], [0, 12], [-76, 10]], true, 6), { fill: P.dmid, lw: S.lw, shade: () => shape(rect(-110, 0, 220, 20), { fill: P.dark, stroke: false, boil: 0, alpha: .5 }) });
  stroke(quad([-40, -78], [-50, -60], [-46, -46]), S.lw * .5, { line: P.light });
  pop();
}

// —— rubber stamp (knob, neck, wooden block, rubber); origin = the rubber face ——
export function stamp(x, y, k, o = {}) {
  const sq = o.sq || 0;
  push(); translate(x, y); rotate(o.rot || 0); scale(k * (1 + sq * .25), k * (1 - sq * .3));
  shape(rect(-72, -24, 144, 24), { fill: P.ink, lw: S.lw * .7 });
  shape(rr(-82, -84, 164, 62, 8), { fill: P.dark, lw: S.lw, shade: () => shape(rect(30, -90, 60, 70), { fill: P.ink, stroke: false, boil: 0, alpha: .4 }) });
  shape(rect(-18, -150, 36, 68), { fill: P.dmid, lw: S.lw * .8 });
  shape(ell(0, -184, 50, 42, 24), { fill: P.dmid, lw: S.lw, shade: () => shape(ell(16, -176, 40, 36, 20), { fill: P.dark, stroke: false, boil: 0, alpha: .5 }) });
  shape(ell(-16, -198, 12, 8, 10), { fill: P.light, stroke: false, boil: .3 });
  pop();
}
export function stampMark(x, y, k, rot, a = 1) {
  push(); translate(x, y); rotate(rot); scale(k);
  shape(ell(0, 0, 62, 62, 36), { lw: S.lw * 1.1, alpha: a });
  shape(ell(0, 0, 52, 52, 32), { lw: S.lw * .45, alpha: a });
  T.g.globalAlpha = a; numeral('1931', 0, 0, 34, { w: .15 }); T.g.globalAlpha = 1;
  pop();
}

// —— director's chair (blank canvas, no lettering); part 'back' (behind the sitter) or 'front' (armrests) ——
export function directorChair(x, y, k, part) {
  push(); translate(x, y); scale(k);
  const zk = T.zoom();
  if (part === 'back') {
    for (const s of [-1, 1]) shape(rect(s * 200 - 9, -420, 18, 420), { fill: P.dmid, lw: S.lw * .8 });
    shape(rr(-212, -410, 424, 96, 6), { fill: P.mid, lw: S.lw, shade: () => shape(rect(100, -420, 140, 120), { fill: P.dmid, stroke: false, boil: 0, alpha: .6 }) });
    stroke([[-200, -396], [200, -396]], S.lw * .4, { line: P.dark }); stroke([[-200, -328], [200, -328]], S.lw * .4, { line: P.dark });
    for (const s of [-1, 1]) stroke([[s * 190, -6], [-s * 190, -126]], 15 * zk, { line: P.dark });
    shape(rr(-205, -140, 410, 26, 5), { fill: P.mid, lw: S.lw * .8 });
  } else {
    for (const s of [-1, 1]) {
      shape(rect(s * 210 - 9, -228, 18, 228), { fill: P.dmid, lw: S.lw * .8 });
      shape(rr(s * 210 - 52, -238, 104, 18, 8), { fill: P.dmid, lw: S.lw * .8 });
    }
  }
  pop();
}

// —— little cartoon glints (four-point stars) ——
export function glint(x, y, r, a = 1) {
  const p = []; for (let i = 0; i < 8; i++) { const rr_ = i % 2 ? r * .28 : r, an = i / 8 * TAU; p.push([x + Math.cos(an) * rr_, y + Math.sin(an) * rr_]); }
  shape(p, { fill: P.white, lw: S.lw * .5, alpha: a });
}
