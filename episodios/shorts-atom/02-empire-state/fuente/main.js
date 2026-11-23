// main.js — «ASK Atom» short #2: how the Empire State was built in 410 days (1930s rubber-hose, 9:16, 24 fps, 43.559 s)
// Four shots cut on the voice timeline (linea.json), actions keyed to the English word timings. Characters and props on
// twos (12 fps), camera on ones. Tempo 120 BPM (a beat = 12 frames): idle things breathe on the beat, in phase with the band.
// The running gag: a pigeon looking for somewhere to land — every time it lands, another floor grows under it.
import * as T from '/styles/rubber-hose/demo/toon.js';
import { P, pieEye, hose, shoe, glove } from '/styles/rubber-hose/demo/chars.js';
import { clamp, lerp, seg, ss, eo, ei, back, TAU, hash } from '/core/lib.js';
import { makeFilm, post } from './vfilm.js';
import * as SET from './set.js';
import { atom, A, NY } from './atom.js';
import { ENV } from './env.js';
import * as PR from './props.js';
import { worker, pigeon, KIND, restArm } from './gang.js';

const DUR = 43.559, BEAT = .5, R = A.R;
const CUT = [0, 10.637, 20.349, 31.397, DUR];
const THUMB = new URLSearchParams(location.search).has('thumb');

const cv = document.getElementById('c');
const F = makeFilm(cv); T.init(F.scene);
const BGT = SET.paintTop(), BGW = SET.paintWide(), BGS = SET.paintStreet(); T.init(F.scene);
const sg = F.sg;

// —— timing helpers ——
const q2 = t => Math.floor(t * 12 + 1e-6) / 12;
const bump = (u, c, d = .35) => Math.sin(Math.PI * seg(u, c, c + d));
const dsp = (u, c, f = 14, d = 5) => u < c ? 0 : Math.exp(-(u - c) * d) * Math.sin((u - c) * f);
const spring = (u, c, k = 16, z = .32) => u < c ? 0 : 1 - Math.exp(-z * k * (u - c)) * Math.cos(k * (u - c));
const EASE = { ss, lin: x => clamp(x), back: x => back(x, 2.0), eo, ei };
function kf(u, keys) {
  if (u <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) if (u <= keys[i][0]) { const [u0, a] = keys[i - 1], [u1, b, e] = keys[i]; return mixv(a, b, (EASE[e || 'ss'])((u - u0) / (u1 - u0 || 1))); }
  return keys[keys.length - 1][1];
}
function mixv(a, b, k) {
  if (typeof a === 'number') return lerp(a, b, k);
  if (Array.isArray(a)) return a.map((v, i) => lerp(v, b[i], k));
  const o = {}; for (const key in a) o[key] = typeof a[key] === 'number' ? lerp(a[key], b[key] ?? a[key], k) : (k < .5 ? a[key] : (b[key] ?? a[key]));
  for (const key in b) if (!(key in o)) o[key] = b[key];
  return o;
}
const breath = (tq, amp = 1) => { const b = Math.cos(TAU * tq / BEAT); return { sx: 1 - .024 * b * amp, sy: 1 + .04 * b * amp, b }; };
const jit = (u, a, f = 31) => (hash(Math.floor(u * f)) - .5) * 2 * a;         // a stepped jitter (the rattle)

// —— Atom (canon, as in the first short) ——
const RR = { x: R * 1.2, y: NY + R * 1.02, rot: Math.PI / 2 - .35, bend: -18, hand: 'open' };
const RL = { x: -R * 1.2, y: NY + R * 1.02, rot: Math.PI / 2 + .35, bend: 18, hand: 'open' };
const UPR = { x: R * 1.75, y: NY - R * .7, rot: -.75, bend: 22, hand: 'open' };
const UPL = { x: -R * 1.75, y: NY - R * .7, rot: -Math.PI + .75, bend: -22, hand: 'open' };
const SHR = { x: R * 1.62, y: NY + R * .2, rot: -.35, bend: -26, hand: 'open' };
const SHL = { x: -R * 1.62, y: NY + R * .2, rot: -Math.PI + .35, bend: 26, hand: 'open' };
const HIPR = { x: R * 1.08, y: NY + R * .78, rot: Math.PI - .15, bend: 60, hand: 'fist' };
const HIPL = { x: -R * 1.08, y: NY + R * .78, rot: .15, bend: -60, hand: 'fist' };
function blinkLid(tq, off = 0) { const b = (tq + off) % 3.3; return b < 1 / 12 - 1e-6 ? .95 : b < 2 / 12 - 1e-6 ? .45 : 0; }
function talkMouth(tq) { const i = Math.round(tq * 24), e = Math.max(ENV[i] || 0, ENV[i + 1] || 0); return e > .12 ? { type: 'open', w: R * (.36 + .1 * e), open: .25 + .6 * e } : null; }
function shadow(x, y, rx, ry, a = .38) {
  const b = T.BASE; sg.save(); sg.setTransform(b[0], b[1], b[2], b[3], b[4], b[5]);
  sg.fillStyle = `rgba(20,18,16,${a})`; sg.filter = 'blur(3px)'; sg.beginPath(); sg.ellipse(x, y, Math.max(1, rx), Math.max(1, ry), 0, 0, TAU); sg.fill(); sg.restore();
}
function drawAtom(o) {
  const tq = q2(o.t), b = Math.cos(TAU * tq / BEAT), amp = o.amp ?? .05;
  const sy = (1 + b * amp) * (o.sy || 1), sx = (1 - b * amp * .6) * (o.sx || 1), lift = b * 7 * (amp / .05) + (o.lift || 0), k = o.k || 1;
  const toLocal = (wx, wy) => [(wx - o.x) / (k * sx), (wy - o.y) / (k * sy) + lift];
  let armL = o.armL || RL, armR = o.armR || RR;
  if (o.armsW) { const r = o.armsW(toLocal); if (r.armL) armL = r.armL; if (r.armR) armR = r.armR; }
  const m = o.forceMouth || talkMouth(tq) || o.mouth || { type: 'smile', w: R * .4 };
  const eyes = { lid: blinkLid(tq, o.blinkOff || 0), ...(o.eyes || {}) };
  if (!o.noShadow) shadow(o.x, o.y + 4, 150 * k * (1 - Math.max(0, lift) * .005), 18 * k);
  atom({ x: o.x, y: o.y, k, sx, sy, lean: o.lean || 0, lift, armL, armR, legL: o.legL, legR: o.legR, eyes, eyeR: o.eyeR, brows: o.brows, mouth: m, eph: tq * .85, over: o.over });
  return { toLocal, sx, sy, lift };
}
const atomWorld = (o, st, lx, ly) => [o.x + lx * o.k * st.sx, o.y + (ly - st.lift) * o.k * st.sy];

// —— the gang: breathing, blinking, a shadow; returns local↔world helpers ——
function drawW(kind, o) {
  const tq = q2(o.t), br = breath(tq + (o.ph || 0), o.amp ?? 1), k = o.k || 1;
  const sx = br.sx * (o.sx || 1), sy = br.sy * (o.sy || 1), lift = (o.lift || 0) + br.b * 4;
  const toLocal = (wx, wy) => [(wx - o.x) / (k * sx), (wy - o.y) / (k * sy) + lift];
  const p = { ...o, sx, sy, lift, eyes: { lid: blinkLid(tq, o.ph || 0), ...(o.eyes || {}) } };
  if (o.armsW) Object.assign(p, o.armsW(toLocal));
  if (!o.noShadow) shadow(o.x, o.y + 3, 70 * k, 10 * k, .3);
  worker(kind, p);
  return { toLocal, toWorld: (lx, ly) => [o.x + lx * k * sx, o.y + (ly - lift) * k * sy] };
}

// a worker's arm thrown up (local): the cheer
const UPL_W = (kind, s) => { const K = KIND[kind]; return { x: s * (K.sh[0] + 60), y: K.sh[1] - 90, rot: -Math.PI / 2 + s * .5, bend: s * 20, hand: 'open' }; };
// —— camera ——
let CAM = { x: 540, y: 960, z: 1 };
function useCam(c, par = 1) {
  const z = 1 + (c.z - 1) * par, cx = 540 + (c.x - 540) * par, cy = 960 + (c.y - 960) * par;
  T.BASE.splice(0, 6, z, 0, 0, z, 540 - cx * z, 960 - cy * z); T.reset();
}
const cam3 = v => ({ x: v[0], y: v[1], z: v[2] });
// a vertical whip-pan (cartoon swish): the finished scene gets a directional motion blur along the move (built by
// halving offset copies on a half-size canvas: smooth, no hard streaks), is washed a little toward the paper tone, and
// is crossed by a few thin tapered speed lines in mid-grey ink. amt 0..1; dir −1 = the camera moving up.
// whip(u, cut) gives the 2-frame envelope around an in-shot cut.
function smear(amt, dir = -1) {
  if (amt <= .01) return;
  const mk = k => { smear[k] = smear[k] || document.createElement('canvas'); return smear[k]; };
  const W = 540, H = 960, a = mk('a'), b = mk('b');
  for (const c of [a, b]) { c.width = W; c.height = H; }
  let cur = a, nxt = b;
  { const g = cur.getContext('2d'); g.imageSmoothingQuality = 'high'; g.drawImage(F.scene, 0, 0, W, H); }
  const reach = 220 * amt;                                   // blur length in half-size px
  for (let k = 2; k <= reach; k *= 2) {
    const g = nxt.getContext('2d'); g.globalAlpha = 1; g.clearRect(0, 0, W, H); g.drawImage(cur, 0, 0);
    g.globalAlpha = .5; g.drawImage(cur, 0, dir * k); g.globalAlpha = 1;
    [cur, nxt] = [nxt, cur];
  }
  sg.save(); sg.setTransform(1, 0, 0, 1, 0, 0); sg.imageSmoothingEnabled = true; sg.imageSmoothingQuality = 'high';
  sg.drawImage(cur, 0, 0, W, H, 0, -dir * 40 * amt, 1080, 1920);
  sg.fillStyle = `rgba(226,222,212,${(.28 * amt).toFixed(3)})`; sg.fillRect(0, 0, 1080, 1920);
  sg.restore();
  T.BASE.splice(0, 6, 1, 0, 0, 1, 0, 0); T.reset();
  const n = Math.round(4 + 6 * amt), seed = Math.floor(amt * 4) * 17 + (dir < 0 ? 3 : 0);
  for (let i = 0; i < n; i++) {
    const x = 60 + hash(i * 3.3 + seed) * 960, y = hash(i * 7.1 + seed) * 1400 + 80, L = (260 + hash(i * 1.9 + seed) * 420) * amt;
    for (let j = 0; j < 3; j++) T.stroke([[x, y + L * j / 3], [x, y + L * (j + 1) / 3]], T.S.lw * (.5 - j * .14), { line: P.dmid, alpha: .55 - j * .12 });
  }
}
// frames around an in-shot whip cut: −1 → 1 (the swish), 0 → .5 (the landing, already settling), then clean
function whip(u, cut) { const f = Math.floor((u - cut) * 24 + 1e-6); return f === -1 ? 1 : f === 0 ? .5 : 0; }
function darken(a, col = '8,8,14') { if (a <= 0) return; sg.save(); sg.setTransform(1, 0, 0, 1, 0, 0); sg.fillStyle = `rgba(${col},${a})`; sg.fillRect(0, 0, 1080, 1920); sg.restore(); }
function flash(a) { if (a <= 0) return; sg.save(); sg.setTransform(1, 0, 0, 1, 0, 0); sg.fillStyle = `rgba(255,252,240,${a})`; sg.fillRect(0, 0, 1080, 1920); sg.restore(); }
function iris(wx, wy, r) {
  const b = T.BASE, sx = b[0] * wx + b[4], sy = b[3] * wy + b[5], rr = r * b[0];
  sg.save(); sg.setTransform(1, 0, 0, 1, 0, 0); sg.fillStyle = '#000'; sg.beginPath(); sg.rect(0, 0, 1080, 1920);
  if (rr > .5) sg.arc(sx, sy, rr, 0, TAU, true); sg.fill('evenodd'); sg.restore();
}

// ———————————————— the TOP set (the top of the steel) ————————————————
const LO = 1340, L1 = 940, L2 = 540, L3 = 140, L4 = -260, FH = 400;     // deck surfaces (feet stand here)
const C0 = 110, C1 = 620, C2 = 930;
function deck(y, x0, x1, o = {}) { PR.girder(x0, x1, y + 16, { d: 56 }); if (o.planks !== false) PR.planks(x0, x1, y + 16, { ph: o.ph || 0 }); if (o.rails) PR.rails(x0, x1, y); }
// the sky life at the top: far chimney smoke, clouds blowing right, a flock, wind streaks (parallax)
function topSky(cam, t, o = {}) {
  useCam(cam, .12);
  for (const [x, y, s] of [[60, 1290, .5], [400, 1360, .6], [840, 1300, .5], [1000, 1420, .7]]) PR.smoke(x, y, s, t, x);
  useCam(cam, .18); PR.blimp(820 - t * 12, 600, .55, t, -1);   // a far airship nosing slowly left
  useCam(cam, .28);
  for (const [i, [x0, y, k, v]] of [[100, 120, 1.1, 14], [700, 320, .8, 10], [-200, 560, .7, 18], [420, -120, 1.2, 12], [1000, 760, .6, 16]].entries()) {
    const x = ((x0 + ((o.cloudShift || [])[i] || 0) + t * v * (o.wind || 1) + 400) % 1700 + 1700) % 1700 - 400;
    PR.cloud(x, y, k, { br: Math.cos(TAU * q2(t) / BEAT) });
  }
  for (let i = 0; i < 5; i++) { const x = ((t * 60 + i * 34 + 200) % 1600) - 300, y = 420 + Math.sin(t * .7 + i) * 30 + (i % 2) * 18; PR.bird(x, y, 11, t * 14 + i); }
  useCam(cam, .6);
  for (let i = 0; i < 3; i++) { const p = ((t * .45 + i * .37) % 1); PR.windLine(-200 + p * 1500, 200 + i * 420 + Math.sin(i * 3) * 80, 260, p); }
  useCam(cam, 1);
}
// st: c0/c1/c2 column tops, l2 (span, drop), l3 (span), stubs [{x0,x1,y,drop}], derrick {foot, ang, L, drop, swing}, splice
function topSet(st, t) {
  for (const [x, top, sp] of [[C0, st.c0, null], [C1, st.c1, st.splice], [C2, st.c2, null]]) PR.column(x, top, 2200, { splice: sp ? [sp] : [] });
  // wind bracing (rods) in the bays below L1
  for (const [a, b] of [[C0, C1], [C1, C2]]) { T.stroke([[a + 24, L1 + 80], [b - 24, LO]], T.S.lw * .4, { line: P.dark }); T.stroke([[b - 24, L1 + 80], [a + 24, LO]], T.S.lw * .4, { line: P.dark }); }
  deck(LO, -260, 1340, { ph: 20 });
  deck(L1, -260, 1340, { rails: st.rails !== false, ph: 50 });
  if (st.l2) { const dy = -320 * (1 - clamp(st.l2d ?? 1)) * (1 - clamp(st.l2d ?? 1)); deck(L2 + dy, st.l2[0], st.l2[1], { planks: st.l2p !== false, rails: !!st.l2r, ph: 80 }); }
  if (st.l3) PR.girder(st.l3[0], st.l3[1], L3 + 16, { d: 56 });
  for (const sb of st.stubs || []) { const dy = -240 * (1 - clamp(sb.drop ?? 1)) ** 2; if ((sb.drop ?? 1) > 0) PR.girder(sb.x0, sb.x1, sb.y + 16 + dy, { d: 56 }); }
  // gusset plates where the beams frame into the columns
  const decks = [LO, L1]; if (st.l2 && (st.l2d ?? 1) >= 1) decks.push(L2);
  for (const [x, top] of [[C0, st.c0], [C1, st.c1], [C2, st.c2]]) for (const y of decks) if (top < y) {
    T.shape(T.rect(x - 40, y + 10, 80, 68), { fill: P.mid, lw: T.S.lw * .5, shade: () => T.shape(T.rect(x + 10, y + 6, 40, 76), { fill: P.dmid, stroke: false, boil: 0, alpha: .6 }) });
    for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) T.shape(T.ell(x - 26 + i * 52, y + 24 + j * 20, 3, 3, 8), { fill: P.light, lw: T.S.lw * .25 });
  }
  // a ladder lashed between the two low decks (right bay)
  T.stroke([[1002, L1 + 72], [1006, LO]], T.S.lw * .55, { line: P.dark }); T.stroke([[1052, L1 + 72], [1056, LO]], T.S.lw * .55, { line: P.dark });
  for (let y = L1 + 100; y < LO - 10; y += 38) T.stroke([[1003, y], [1054, y]], T.S.lw * .4, { line: P.dark });
}
function derrickTop(d, t) { return PR.derrick(1040, d.foot, d.foot - 1150, d.ang, d.L, d.drop, d.swing, { t, hook: {} }); }

// ———————————————— SHOT 1 (0 – 10.637): wide 1930 Manhattan → the top of the steel ————————————————
function shot1(u, uq, t) {
  if (u < 3.0) return shot1wide(u, uq, t);
  shot1top(u, uq, t);
  smear(whip(u, 3.0), -1);
}
function shot1wide(u, uq, t) {
  const top = PR.floorY(34);
  const c = cam3(kf(u, [[0, [520, 1120, 1.7]], [1.9, [520, 1100, 1.8]], [2.9, [520, top + 140, 2.5], 'ei']]));
  CAM = c;
  SET.drawLayer(sg, BGW.sky, c, .1); T.frame(t);
  useCam(c, .25);
  for (const [x0, y, k, v] of [[0, 560, 1.0, 20], [600, 820, .8, 14], [-300, 1020, .7, 24]]) PR.cloud(((x0 + t * v + 500) % 1800) - 400, y, k, { br: Math.cos(TAU * q2(t) / BEAT) });
  useCam(c, .35);
  PR.plane(420 + 300 * u, 640 + Math.sin(u * 2) * 12, .9, { t, num: '1930' });
  SET.drawLayer(sg, BGW.far, c, .45);
  useCam(c, .45); for (const [x, y] of SET.FAR_CHIM) PR.smoke(x, y, .35, t * .8, x);
  SET.drawLayer(sg, BGW.mid, c, .7);
  useCam(c, 1);
  PR.towerWide({ steel: 34 + .4 * ss(seg(u, 0, 2.9)), clad: 24, t });
  const tw = PR.TW;
  PR.miniDerrick(tw.cx - 120, top, -2.4 + Math.sin(t * .9) * .5, 1);
  PR.miniDerrick(tw.cx + 110, top, -.7 + Math.sin(t * .7 + 1) * .5, 1);
  // the pigeon, a speck heading for the top
  if (u > 1.6) { const e = seg(u, 1.6, 2.95); pigeon(lerp(980, tw.cx + 40, ss(e)), lerp(top - 380, top - 30, e) + Math.sin(e * 9) * 14, .32, { dir: -1, fly: 1, flap: Math.sin(t * 22) }); }
  SET.drawLayer(sg, BGW.near, c, 1.15);
  useCam(c, 1.15);
  for (const b of SET.NEAR) if (b.chim) PR.smoke(b.x + 22 + b.cx * (b.w - 40), b.top - 40, 1, t, b.x);
  useCam(c, 1);
  smear(whip(u, 3.0), -1);
}
// Atom carries a beam; looks for somewhere to put it down
function shot1top(u, uq, t) {
  // the right column grows a floor every time the pigeon lands on it
  const POP1 = 3.68, POP2 = 4.78;
  const g1 = clamp(spring(uq, POP1, 15, .3), 0, 1.25), g2 = clamp(spring(uq, POP2, 15, .3), 0, 1.25);
  const c2 = L1 - 120 - FH * g1 - FH * g2;
  const c = cam3(kf(u, [[3.0, [540, 1010, 1.0]], [3.6, [540, 980, 1.0]], [4.2, [560, 860, 1.0]], [5.0, [600, 700, 1.0]], [5.5, [600, 720, 1.0]], [6.3, [540, 980, 1.0]], [10.64, [548, 990, 1.03]]]));
  c.y -= 90 * (1 - eo(seg(u, 3.0, 3.45)));   // the whip lands a little high and settles
  CAM = c;
  SET.drawLayer(sg, BGT, c, .12); T.frame(t);
  const gust = bump(u, 6.4, 1.6);
  topSky(c, t, { wind: 1 + gust * 3 });
  const swing = Math.sin(t * 1.3) * .12 + gust * .3;
  // the hook lowers the «410» sign on «410», the gust spins it, it goes back up
  const sdrop = 60 + 600 * ss(seg(u, 5.4, 5.95)) - 640 * ss(seg(u, 8.0, 8.7));
  const hook = derrickTop({ foot: L1, ang: -1.95, L: 1150, drop: sdrop, swing: swing + dsp(u, 5.95, 6, 2) * .2 }, t);
  topSet({ c0: L1 - 120, c1: L1 - 120, c2, stubs: [{ x0: C2 - 260, x1: C2 + 30, y: L2, drop: seg(uq, POP1 + .1, POP1 + .35) }, { x0: C2 - 220, x1: C2 + 30, y: L3, drop: seg(uq, POP2 + .1, POP2 + .35) }] }, t);
  let SGN = null;   // where the «410» plate hangs, so the gust's pages can blow around it instead of across it
  if (sdrop > 80) {
    const [hx, hy] = hook, sp = (dsp(u, 5.95, 7, 2) * .25 + gust * Math.sin(u * 9) * .35);
    SGN = { x: hx, y: hy, r: sp };
    PR.at(hx, hy, 1, () => {
      T.stroke([[0, -50], [-110, 30]], T.S.lw * .45, { line: P.dark }); T.stroke([[0, -50], [110, 30]], T.S.lw * .45, { line: P.dark });
      T.shape(T.rr(-160, 24, 320, 150, 10), { fill: P.white, lw: T.S.lw, shade: () => T.shape(T.rect(80, 20, 100, 160), { fill: P.pale, stroke: false, boil: 0 }) });
      T.shape(T.rr(-146, 38, 292, 122, 6), { lw: T.S.lw * .4, line: P.mid });
      PR.numeral('410', 0, 99, 86, { w: .16 });
    }, { rot: sp });
    if (u > 5.9 && u < 6.4) PR.glint(hook[0] + 150, hook[1] + 40, 22 * bump(u, 5.95, .4));
  }
  // forge + the heater cranking it (background life), a keg of rivets
  const crank = t * 7;
  PR.forge(150, LO, 1, { t, crank });
  shadow(150, LO + 3, 110, 10, .3);
  const hx_ = 150 + 86 + Math.cos(crank) * 30, hy_ = LO - 128 + Math.sin(crank) * 30;
  drawW('heater', { x: 300, y: LO, k: 1, t, ph: .2, hat: { lift: 26 * bump(u, 6.7, .6), rot: -.4 * bump(u, 6.7, .6) },
    armsW: tl => { const [lx, ly] = tl(hx_, hy_); return { armL: { x: lx, y: ly, rot: Math.PI - .3, bend: 20, hand: 'grab' }, armR: u > 6.6 && u < 7.5 ? { x: 80, y: -330, rot: -1.2, bend: -20, hand: 'open' } : restArm('heater', 1) }; },
    eyes: { lx: u > 5.5 && u < 8.2 ? .5 : -.6, ly: u > 5.5 && u < 8.2 ? -.8 : .3, type: u > 6.6 && u < 7.2 ? 'wide' : undefined }, mouth: u > 6.6 && u < 7.4 ? { type: 'o', w: 30 } : { type: 'smile', w: 30 } });
  keg(920, LO);
  PR.smoke(150, LO - 170, 1, t * 1.6, 3);
  // Atom with the beam on his shoulder
  const look = u < 4.3 ? [.8, -.6] : u < 5.4 ? [.7, -1] : u < 6.5 ? [-.3, -.6] : u < 7.4 ? [-.9, 0] : u < 8.1 ? [-.9, .3] : u < 8.8 ? [.9, .3] : u < 9.9 ? [-.8, .9] : [0, -.6];
  const o = { x: 660, y: LO, k: .95, t };
  // «nowhere to set down a beam»: a real search walk — left to the forge (taken), right to the keg (taken), back
  const XK = [[7.45, 660], [7.95, 555], [8.2, 555], [8.75, 765], [9.05, 765], [9.4, 660]];
  const xv = (kf(uq + .03, XK) - kf(uq - .03, XK)) / .06, mv = clamp(Math.abs(xv) / 260);
  const step = Math.sin((uq - 7.45) * TAU / .5) * mv;
  o.x = kf(uq, XK);
  o.lean = .1 * clamp(xv / 420, -1, 1) - .05 * dsp(u, 7.95, 13, 5) + .05 * dsp(u, 8.75, 13, 5) - .04 * dsp(u, 9.4, 13, 5);
  o.lift = 10 * Math.abs(step);
  o.legL = { x: -46 + 14 * step, y: -Math.max(0, step) * 30 }; o.legR = { x: 46 + 14 * step, y: -Math.max(0, -step) * 30 };
  const bal = seg(u, 9.95, 10.25);
  const hold = { x: R * 1.05, y: NY - R * 1.12, rot: -1.4, bend: -24, hand: 'open' };
  const fing = { x: R * .3, y: NY - R * 1.9, rot: -Math.PI / 2, bend: -10, hand: 'point' };
  const lower = { x: R * 1.75, y: NY + R * .35, rot: .6, bend: -24, hand: 'open' };
  o.armR = u < 9.3 ? hold : u < 9.9 ? kf(u, [[9.3, hold], [9.6, lower]]) : kf(u, [[9.9, lower], [10.2, fing, 'back']]);
  const SHL_T = { x: -R * 1.25, y: NY + R * .1, rot: -Math.PI + .5, bend: 26, hand: 'open' };   // a tight shrug: clears the pigeon spot
  o.armL = kf(u, [[5.6, RL], [5.85, { x: R * .2, y: NY - R * 1.4, rot: -1.3, bend: 20, hand: 'point' }, 'back'], [6.5, { x: R * .2, y: NY - R * 1.4, rot: -1.3, bend: 20, hand: 'point' }], [6.8, SHL], [7.4, SHL], [7.6, RL], [9.55, RL], [9.8, SHL_T], [10.6, SHL_T]]);
  o.eyes = { lx: look[0], ly: look[1], type: u > 9.55 && u < 9.95 ? 'wide' : undefined };
  o.brows = (u > 5.8 && u < 6.6) || u > 9.5 ? 'up' : null;
  o.mouth = u > 9.55 && u < 9.95 ? { type: 'o', w: R * .4 } : u > 10.0 ? { type: 'grin', w: R * .44, open: .5 } : null;
  const wob = Math.sin(u * 8) * .08 * bal;
  o.over = () => {
    if (u < 9.3) { const rot = Math.sin(t * 2) * .02 - .07 * clamp(xv / 420, -1, 1) + .06 * dsp(u, 7.95, 11, 4) - .06 * dsp(u, 8.75, 11, 4) + .05 * dsp(u, 9.4, 11, 4); PR.at(R * .35, NY - R * 1.2, 1, () => PR.girder(-170, 170, -14, { d: 28 }), { rot }); }
    else if (u < 9.9) { const e = ss(seg(u, 9.3, 9.6)); PR.at(lerp(R * .35, R * 2.05, e) + Math.sin(e * Math.PI) * R * .4, lerp(NY - R * 1.2, NY + R * .1, e) - Math.sin(e * Math.PI) * R * .3, 1, () => PR.girder(-170, 170, -14, { d: 28 }), { rot: e * 1.25 + .1 * dsp(u, 9.6, 14, 5) }); }
    else { const a = o.armR, fl = 1 - back(seg(u, 9.9, 10.12), 1.4); PR.at(a.x + R * .3 * fl, a.y - 44 - 30 * bal + R * .2 * fl, 1, () => PR.girder(-170, 170, -28, { d: 28 }), { rot: wob + 1.25 * fl }); }
  };
  drawAtom(o);
  // the pigeon: flies in, lands on the column top (pop!), again (pop!), then down into the only free spot
  pigeonTop1(u, uq, t, c2, POP1, POP2);
  // calendar pages blowing past on «days»
  if (u > 6.4 && u < 8.6) for (let i = 0; i < 11; i++) {
    const p = (u - 6.4 - i * .09) / 1.6; if (p < 0 || p > 1) continue;
    let x = lerp(-120, 1220, p) + Math.sin(p * 9 + i) * 40, y = 260 + hash(i * 3.1) * 780 + Math.sin(p * 6 + i * 2) * 60;
    if (SGN) {   // the wind parts around the plate: in the plate's frame, ease the page out above or below it
      const cr = Math.cos(SGN.r), sr = Math.sin(SGN.r), dx = x - SGN.x, dy = y - SGN.y;
      const lx = dx * cr + dy * sr, ly = -dx * sr + dy * cr - 99, need = 75 + 82;
      const e = ss(clamp((330 - Math.abs(lx)) / 170, 0, 1));
      if (e > 0 && Math.abs(ly) < need) {
        const ly2 = Math.sign(ly || 1) * lerp(Math.abs(ly), need, e) + 99;
        x = SGN.x + lx * cr - ly2 * sr; y = SGN.y + lx * sr + ly2 * cr;
      }
    }
    PR.calPage(x, y, .8 + hash(i) * .4, p * 3.2 + i * .7, Math.cos(p * 11 + i), String(1 + Math.floor(hash(i * 5.3) * 28)));
  }
}
function keg(x, y) {
  shadow(x, y + 3, 50, 8, .3);
  T.shape(T.spline([[x - 38, y], [x - 44, y - 40], [x - 38, y - 80], [x + 38, y - 80], [x + 44, y - 40], [x + 38, y]], true, 5), { fill: P.mid, lw: T.S.lw * .8, shade: () => T.shape(T.rect(x + 10, y - 90, 50, 100), { fill: P.dmid, stroke: false, boil: 0 }) });
  for (const yy of [-20, -60]) T.stroke([[x - 42, y + yy], [x + 42, y + yy]], T.S.lw * .6, { line: P.dark });
  T.shape(T.ell(x, y - 80, 38, 9, 18), { fill: P.dark, lw: T.S.lw * .6 });
  for (let i = 0; i < 6; i++) PR.rivet(x - 24 + i * 9, y - 86 - (i % 2) * 6, -1.2 + i * .4, .6, 0);
}
function pigeonTop1(u, uq, t, c2, POP1, POP2) {
  const top = c2 - 8, px = C2 + 6;
  let x, y, o = { dir: -1 };
  if (u < POP1) { const e = seg(u, 3.0, POP1); x = lerp(1200, px, ss(e)); y = lerp(380, L1 - 128, ei(e)) - Math.sin(e * Math.PI) * 120; o = { dir: -1, fly: 1 - seg(u, POP1 - .1, POP1), flap: Math.sin(t * 24), lx: -.5, ly: .5 }; }
  else if (u < POP2 - .5) { x = px; y = top; o = { dir: -1, puff: bump(u, POP1, .5), wide: u < POP1 + .7, ly: .8, lx: .3 }; }
  else if (u < POP2) { const e = seg(u, POP2 - .5, POP2); x = px - Math.sin(e * Math.PI) * 120; y = lerp(L2 - 128, top, e) - Math.sin(e * Math.PI) * 140; o = { dir: e < .5 ? -1 : 1, fly: 1, flap: Math.sin(t * 24) }; }
  else if (u < 9.0) { x = px; y = top; o = { dir: 1, puff: bump(u, POP2, .5), wide: u < POP2 + .7, peck: u > 6.0 ? bump(u % 1.0, .2, .3) : 0, ly: .5 }; }
  else { const e = seg(u, 9.0, 9.6); x = lerp(px, 440, ss(e)); y = lerp(top, LO, ei(e)) - Math.sin(e * Math.PI) * 160; o = { dir: -1, fly: 1 - seg(u, 9.5, 9.6), flap: Math.sin(t * 24) }; if (u >= 9.6) o = { dir: -1, peck: bump(u, 9.9, .25) + bump(u, 10.3, .25), lx: -.3 }; }
  if (u >= 9.6) { x = 440; y = LO; shadow(x, y + 3, 30, 6, .3); }
  pigeon(x, y, .9, o);
}

// ———————————————— SHOT 2 (10.637 – 20.349): nowhere to store anything — the steel comes just in time ————————————————
function shot2(u, uq, t) {
  if (u < 7.95) shot2street(u, uq, t); else shot2top(u, uq, t);
  smear(whip(u, 7.95), -1);
}
const TRUCK_STOP = 180, TK = 1.15;
function truckX(u) { return u < 4.15 ? 1700 : TRUCK_STOP + (1600 - TRUCK_STOP) * (1 - eo(seg(u, 4.15, 5.3))); }
// «nowhere on site to store anything»: Atom yanks the hoarding gate open on «nowhere» — the site is packed wall to wall
// (girders to the lintel, kegs, two squeezed workers' eyes in the dark) — a beam slides out at him on «site», he shoves it
// back and slams the gate on «store»; the gate bulges and a plank pops up over the hoarding on «anything».
const GATE = { open: 1.94, hit: 2.08, out: 2.26, shove: 2.8, slam0: 2.95, slam: 3.06 };
function gateTheta(u) {
  if (u < GATE.open) return 0;
  if (u < GATE.slam0) return 2.45 * eo(seg(u, GATE.open, GATE.hit)) - .14 * dsp(u, GATE.hit, 16, 6) * (u > GATE.hit ? 1 : 0);
  if (u < GATE.slam) return 2.45 * (1 - ei(seg(u, GATE.slam0, GATE.slam)));
  return 0;
}
const gateBulge = u => bump(u, GATE.slam + .22, .26) + .8 * bump(u, GATE.slam + .52, .26) + .5 * bump(u, 5.0, .3) + .5 * bump(u, 6.95, .3);
const beamOut = u => 130 * eo(seg(u, GATE.out, GATE.out + .16)) * (1 - ss(seg(u, GATE.shove, GATE.shove + .14))) + 10 * dsp(u, GATE.out + .16, 18, 6) * (u < GATE.shove ? 1 : 0);
// the driver: leans into the drive, lurches on the brake (thump 15.94), turns to Atom and tips his cap on «two floors»,
// then watches the bundle go up; an idle bob and cigar puffs throughout
function truckMan(u, t, moving) {
  const lean = ss(seg(u, 4.0, 4.4)) * (1 - ss(seg(u, 5.2, 5.5)));
  const jolt = dsp(u, 5.3, 13, 3.6) * 1.1;
  const look = -1 + 2.15 * eo(seg(u, 5.95, 6.2)) - .15 * ss(seg(u, 6.2, 6.35)) - 1.4 * ss(seg(u, 6.9, 7.15)) + 1.1 * ss(seg(u, 7.4, 7.65));
  const tip = bump(u, 6.2, .5);
  const bob = Math.sin(t * 5.2) * 1.6 + (moving ? Math.abs(Math.sin(u * 18)) * 3 : 0) + 5 * bump(u, 6.3, .3);
  return { lean, jolt, look, tip, bob, t, wind: moving ? 1 : .25 };
}
function shot2street(u, uq, t) {
  const c = cam3(kf(u, [[0, [540, 1210, 1.12]], [4.0, [520, 1220, 1.1]], [6.6, [500, 1190, 1.12]], [7.5, [520, 1080, 1.12]], [7.95, [520, 720, 1.15], 'ei']]));
  CAM = c;
  SET.drawLayer(sg, BGS, c, 1); T.frame(t);
  useCam(c, .3);
  for (const [x0, y, k, v] of [[100, 60, .9, 16], [800, 220, .7, 12]]) PR.cloud(((x0 + t * v + 400) % 1700) - 400, y, k, {});
  for (let i = 0; i < 6; i++) { const x = ((t * 70 + i * 40) % 1700) - 300, y = 180 + Math.sin(t * .8 + i) * 26 + (i % 3) * 20; PR.bird(x, y, 12, t * 15 + i); }
  useCam(c, 1);
  const ST = SET.ST;
  // a flag on a bracket off the stone building, snapping in the wind; a curtain stirring in an open window
  { const px = 566, py = 470, tx = 486, ty = 380; T.stroke([[px, py], [tx, ty]], T.S.lw * .6, { line: P.dark }); T.shape(T.ell(tx, ty, 6, 6, 8), { fill: P.light, lw: T.S.lw * .4 });
    const top = [], bot = []; for (let i = 0; i <= 8; i++) { const q = i / 8, w = Math.sin(t * 7 - q * 5) * 12 * q; top.push([tx - 6 - q * 120, ty + 4 + w - q * 6]); bot.push([tx - 6 - q * 120, ty + 74 + w - q * 2]); }
    T.shape([...top, ...bot.reverse()], { fill: P.pale, lw: T.S.lw * .6 });
    for (let k = 1; k < 4; k++) { const pts = []; for (let i = 0; i <= 8; i++) { const q = i / 8, w = Math.sin(t * 7 - q * 5) * 12 * q; pts.push([tx - 6 - q * 120, ty + 4 + k * 17.5 + w - q * (6 - k)]); } T.stroke(pts, T.S.lw * .7, { line: P.dmid, boil: .3 }); } }
  { const wx = 760, wy = 90, sw = Math.sin(t * 2.3) * 10 + Math.sin(t * 5.1) * 4;
    T.shape([[wx + 4, wy + 4], [wx + 40, wy + 4], [wx + 30 + sw, wy + 60], [wx + 40 + sw * 1.4, wy + 108], [wx + 4, wy + 108]], { fill: P.paper, lw: T.S.lw * .4, alpha: .85 }); }
  windowLady(u, t);
  siteGate(u, t);
  for (let i = 0; i < 3; i++) PR.smoke(700 + i * 14, 1440, .9, t * .8 + i * .33, 20 + i);
  T.shape(T.ell(706, 1444, 46, 9, 18), { fill: P.dark, lw: T.S.lw * .5 });
  if (u < 6.6) { const hx = TRUCK_STOP + 340 * TK + Math.sin(t * 1.4) * 40, hy = 400 + Math.sin(t * .9) * 12; T.stroke([[TRUCK_STOP + 340 * TK, -600], [hx, hy]], T.S.lw * .5, { line: P.ink }); PR.hookBlock(hx, hy, Math.sin(t * 1.4) * .3); }
  // a passer-by on the far pavement (right → left) while the truck pulls in
  if (u > 4.4) passer(1260 - 200 * (u - 4.4), ST.far, .8, u, -1);
  // cars: one far lane left→right, one honking right→left in the near lane
  const cA = seg(u, 0, 1.9); if (cA > 0 && cA < 1) PR.car(lerp(-250, 1350, cA), 1400, .75, { dir: 1, wheel: u * 20, tone: P.mid });
  const cB = seg(u, 2.15, 3.0); if (cB > 0 && cB < 1) { const x = lerp(1400, -300, cB); PR.car(x, 1500, .85, { dir: -1, wheel: -u * 22, tone: P.dmid }); PR.speedLines(x + 150, 1430, 140, 3, -1, .8, 3); if (u > 2.4 && u < 2.75) honk(x - 120, 1360); }
  // —— Atom on the far pavement ——
  const bx = TRUCK_STOP + 340 * TK, byTop = 1480 - (122 + 78) * TK, rise = ei(seg(u, 7.4, 8.1));
  const JB0 = 6.95, JB1 = 7.28;                        // he hops onto the bundle as the hook takes it, and rides it up
  const o = { x: 820, y: ST.far, k: .75, t };
  const slide = 1 - eo(seg(u, 0, .4));
  const XA = [[1.2, 820], [1.72, 615], [2.3, 615], [2.55, 690, 'eo'], [2.8, 620], [3.7, 620], [4.15, 750]];
  const xv = (kf(uq + .03, XA) - kf(uq - .03, XA)) / .06, walking = (u < 2.3 || u > 2.6) && u < JB0;
  const mv = walking ? clamp(Math.abs(xv) / 260) : 0, step = Math.sin((uq - 1.2) * TAU / .5) * mv;
  o.x = kf(uq, XA) + 380 * slide;
  o.legL = { x: -46 + 14 * step, y: -Math.max(0, step) * 30 }; o.legR = { x: 46 + 14 * step, y: -Math.max(0, -step) * 30 };
  const yank = bump(u, GATE.open - .04, .3), shove = bump(u, GATE.shove - .05, .3), slamK = dsp(u, GATE.slam, 16, 6);
  o.lean = -.25 * slide + .12 * dsp(u, .4, 14, 5) + .1 * clamp(xv / 420, -1, 1) * mv + .14 * yank - .16 * shove - .06 * slamK;
  const jump = bump(u, 2.45, .45);
  const startle = bump(u, 5.28, .42);
  const crouchJ = bump(u, JB0 - .08, .16);
  o.lift = 10 * Math.abs(step) + 60 * jump + 55 * startle;
  o.sy = 1 - .1 * dsp(u, .4, 16, 6) + .08 * jump + .07 * startle - .12 * dsp(u, 5.7, 16, 6) - .14 * crouchJ - .14 * dsp(u, JB1, 16, 6) - .08 * slamK;
  o.lean += .035 * Math.sin((u - 3.9) * TAU / .9) * bump(u, 3.9, .7) - .12 * startle;
  const ptUp = { x: R * 1.25, y: NY - R * 1.3, rot: -Math.PI / 2 - .1, bend: 20, hand: 'point' };
  const ptTruck = { x: -R * 1.7, y: NY + R * .1, rot: -Math.PI + .05, bend: 16, hand: 'point' };
  const push2 = { x: -R * 1.75, y: NY + R * .55, rot: -Math.PI + .1, bend: 26, hand: 'open' };
  const push2R = { x: -R * .9, y: NY + R * .75, rot: -Math.PI + .2, bend: 34, hand: 'open' };
  const handle = { x: -R * 1.45, y: NY + R * .3, rot: -Math.PI, bend: 20, hand: 'grab' };
  o.armR = kf(u, [[.3, RR], [.5, ptUp, 'back'], [1.2, ptUp], [1.4, RR], [2.3, RR], [2.45, UPR, 'back'], [2.7, UPR], [2.8, push2R], [2.95, push2R], [3.15, SHR, 'back'], [3.7, SHR], [4.0, RR], [6.0, RR], [6.25, { ...UPR, hand: 'point' }, 'back'], [6.85, { ...UPR, hand: 'point' }], [6.95, RR]]);
  o.armL = kf(u, [[.3, RL], [1.62, RL], [1.82, handle, 'back'], [GATE.open, handle], [2.3, SHL], [2.45, UPL, 'back'], [2.7, UPL], [2.8, push2], [2.92, push2], [3.15, SHL, 'back'], [3.7, SHL], [4.0, RL], [5.5, RL], [5.7, ptTruck, 'back'], [6.1, ptTruck], [6.3, RL]]);
  // the yank: the left glove holds the gate's free edge and is dragged after it (a rubber stretch), then snaps back;
  // the slam: the left arm shoots out to the swung-open edge and hauls it shut
  const gth = gateTheta(u), edgeAt = th => [ST.gate0 + 270 * Math.cos(th), 1150 - Math.sin(th) * 10];
  if ((u >= GATE.open && u < GATE.open + .12) || (u >= GATE.slam0 - .05 && u < GATE.slam + .04)) {
    const [ex, ey] = edgeAt(u < GATE.slam0 ? gth : Math.max(gth, .02));
    o.armsW = toLocal => { const [lx, ly] = toLocal(ex + 14, ey); return { armL: { x: lx, y: ly, rot: -Math.PI, bend: 40, hand: u < GATE.slam0 ? 'grab' : 'open' } }; };
  }
  const look = u < 1.4 ? [0, 0] : u < 1.75 ? [-.9, .1] : u < 2.2 ? [-.9, .2] : u < 2.4 ? [-.6, .9] : u < 2.9 ? [.9, .7] : u < 3.25 ? [-.9, .3] : u < 3.7 ? [-.2, -.1] : u < 4.1 ? [.6, 0] : u < 5.4 ? [lerp(.9, -.9, seg(u, 4.2, 5.3)), .5] : u < 6.2 ? [-.9, .4] : u < 6.95 ? [-.8, -.3] : u < 7.35 ? [-.4, .6] : [-.3, -1];
  o.eyes = { lx: look[0], ly: look[1], type: (u > 1.94 && u < 2.3) || (u > 2.45 && u < 2.9) || (u > 4.5 && u < 4.9) || (u > 5.25 && u < 5.75) || u > 7.4 ? 'wide' : undefined };
  o.eyeR = (u > .8 && u < 1.15) || (u > 3.3 && u < 3.65) ? { type: 'happy' } : null;
  o.brows = u < 1.3 || (u > 1.94 && u < 3.0) || u > 5.4 ? 'up' : null;
  o.mouth = (u > 1.96 && u < 2.3) ? { type: 'o', w: R * .36 } : u > 2.45 && u < 2.9 ? { type: 'wavy', w: R * .4, open: .5 } : u > 3.25 && u < 3.7 ? { type: 'grin', w: R * .42, open: .3 } : u > 7.4 ? { type: 'grin', w: R * .46, open: .6 } : null;
  if (u >= JB0) {          // the hop onto the bundle, then the ride up holding the hook line
    const e = seg(u, JB0, JB1);
    o.x = lerp(750, bx - 90, ss(e)); o.y = u < JB1 ? lerp(ST.far, byTop, e) - Math.sin(e * Math.PI) * 230 : byTop - 1500 * rise;
    o.lift = 0; o.noShadow = u > JB1 - .05;
    const grabL = toLocal => { const hy = byTop - 120 - 1500 * rise; const [lx, ly] = toLocal(bx - 8, (u < 7.25 ? lerp(400, hy, eo(seg(u, 6.6, 7.25))) : hy) + 40); return { x: lx, y: ly, rot: -1.2, bend: -20, hand: 'grab' }; };
    if (u < JB1) { o.armL = mixv(RL, UPL, ss(e * 2)); o.armR = mixv(RR, UPR, ss(e * 2)); }
    else { o.armL = kf(u, [[JB1, UPL], [7.5, { ...UPL, hand: 'wave' }], [7.65, { ...UPL, y: UPL.y - 30, hand: 'wave' }], [7.8, { ...UPL, hand: 'wave' }], [7.95, { ...UPL, y: UPL.y - 30, hand: 'wave' }]]); o.armsW = toLocal => ({ armR: mixv(UPR, grabL(toLocal), ss(seg(u, JB1, JB1 + .12))) }); }
  }
  const atomFront = u >= JB0 + .12;
  if (!atomFront) drawAtom(o);
  if (slide > .04) PR.speedLines(o.x + 170, ST.far - 150, 220 * slide, 4, 1, slide, 5);
  if (u > .3 && u < .9) PR.puff(o.x + 90, ST.far - 10, 34, seg(u, .3, .9), P.pale);
  // the truck from Pennsylvania (keystone on the door), two floors of steel on the bed
  const tx = truckX(u), moving = u > 4.15 && u < 5.3, stopK = dsp(u, 5.3, 12, 4), unload = dsp(u, 7.45, 14, 5) + .6 * dsp(u, JB1, 16, 6);
  const wheel = -(1700 - tx) / 44;
  const loaded = u < 7.4;
  if (u > 4.15) {
    PR.puff(tx + 205 * TK, 1480 - 300 * TK, 30, seg(u % .4, 0, .4) * (moving || u < 6 ? 1 : 0));
    if (u > 5.0 && u < 5.8) PR.puff(tx + 480, 1470, 50, seg(u, 5.1, 5.8), P.pale);
    if (u > 5.25 && u < 5.8) PR.puff(tx - 30, 1470, 40, seg(u, 5.25, 5.8), P.pale);
    const tags = [{ num: '25', pop: clamp(spring(u, 6.14, 16, .3), 0, 1.3), sw: Math.sin(u * 3) * .12 }, { num: '26', pop: clamp(spring(u, 6.55, 16, .3), 0, 1.3), sw: Math.sin(u * 3 + 1) * .12 }];
    PR.truck(tx, 1480, TK, { wheel, bob: Math.abs(Math.sin(u * 18)) * 4 * (moving ? 1 : 0) + 8 * unload, dive: -.035 * stopK, emblem: bump(u, 5.5, .45), driver: truckMan(u, t, moving), load: loaded ? () => PR.bundle(0, 0, 330, 3, { tags }) : null });
    if (moving) PR.speedLines(tx + 640, 1320, 200, 4, -1, .8, 7);
    if (u > 5.5 && u < 6.0) PR.glint(tx + 140, 1300, 26 * bump(u, 5.5, .45));
  }
  // the derrick's hook comes down on «at a time», hooks the sling, and the bundle goes up (with the pigeon and Atom on it)
  const hookY = u < 6.6 ? 400 : u < 7.25 ? lerp(400, byTop - 120, eo(seg(u, 6.6, 7.25))) : byTop - 120 - 1500 * rise;
  if (u > 6.6) {
    T.stroke([[bx + Math.sin(u * 2) * 4, -600], [bx, hookY]], T.S.lw * .5, { line: P.ink });
    PR.hookBlock(bx, hookY, 0);
    if (!loaded) {
      const by = 1480 - 122 * TK - 1500 * rise;
      T.stroke([[bx, hookY + 100], [bx - 110, by - 78 * TK]], T.S.lw * .45); T.stroke([[bx, hookY + 100], [bx + 110, by - 78 * TK]], T.S.lw * .45);
      PR.at(bx, by, TK, () => PR.bundle(0, 0, 330, 3, { tags: [{ num: '25', pop: 1 }, { num: '26', pop: 1 }] }));
    }
  }
  if (u > 7.2 && u < 7.5) PR.glint(bx + 20, byTop - 20, 24 * bump(u, 7.25, .25));
  if (atomFront) { drawAtom(o); if (u > JB1 && u < JB1 + .4) PR.puff(o.x, byTop - 6, 30, seg(u, JB1, JB1 + .4), P.pale); }
  // the pigeon: lands on the bundle on «two floors», rides it up
  if (u > 5.6) {
    let x, y, po;
    const landed = 6.9;
    if (u < landed) { const e = seg(u, 5.6, landed); x = lerp(1150, bx + 90, ss(e)); y = lerp(500, byTop, ei(e)) - Math.sin(e * Math.PI) * 100; po = { dir: -1, fly: 1, flap: Math.sin(t * 24) }; }
    else { x = bx + 90; y = u < 7.4 ? byTop : byTop - 1500 * rise; po = { dir: -1, wide: u > 7.0, puff: bump(u, 7.4, .5) + .7 * bump(u, JB1, .4), ly: u > 7.0 ? .8 : 0, lx: u > 7.0 && u < 7.4 ? -1 : 0 }; }
    pigeon(x, y, .8, po);
  }
}
// a passer-by in an overcoat and a fedora, a folded newspaper under his arm (blank), walking; dir −1 = to the left
function passer(x, y, k, u, dir) {
  const ph = u * TAU / .62, sw = Math.sin(ph), b = Math.abs(Math.cos(ph)) * 5;
  PR.at(x, y, k, () => {
    T.push(); T.scale(dir < 0 ? -1 : 1, 1);
    for (const s of [-1, 1]) { const f = s * sw; hose([s * 10, -96], [f * 26, -8 - Math.max(0, -f) * 12], s * 4, 13); shoe(f * 26 - 6, -Math.max(0, -f) * 12, 1, 1.0); }
    T.translate(0, -b);
    hose([-16, -200], [-34 - sw * 22, -118], -10, 12); glove(-34 - sw * 22, -118, Math.PI / 2 + .3 + sw * .3, 'open', .62);
    T.shape(T.spline([[-30, -96], [-34, -170], [-22, -214], [22, -214], [34, -170], [30, -96]], true, 6), { fill: P.dmid, lw: T.S.lw * .8, shade: () => T.shape(T.rect(4, -230, 40, 140), { fill: P.dark, stroke: false, boil: 0, alpha: .45 }) });
    for (const yy of [-180, -150, -120]) T.shape(T.ell(6, yy, 3, 3, 6), { fill: P.light, stroke: false, boil: 0 });
    T.shape(T.rr(14, -180, 44, 16, 3), { fill: P.white, lw: T.S.lw * .45 });                       // the newspaper (blank)
    hose([16, -200], [34, -166], 10, 12); glove(34, -166, 1.9, 'grab', .62);
    T.shape(T.ell(0, -244, 25, 27, 26), { fill: P.white, lw: T.S.lw * .8 });
    pieEye(10, -250, 6, 8, { lx: .8, ly: .1, lwk: .6 }); pieEye(-4, -250, 6, 8, { lx: .8, ly: .1, lwk: .6, lid: blinkLid(u, .7) });
    T.shape(T.ell(24, -238, 6, 5, 8), { fill: P.pale, lw: T.S.lw * .5 });
    T.shape(T.ell(14, -225, 4, 3.5, 8), { fill: P.ink, stroke: false, boil: 0 });                  // whistling
    T.shape(T.rr(-30, -268, 60, 10, 4), { fill: P.dark, lw: T.S.lw * .6 });
    T.shape(T.spline([[-20, -266], [-18, -292], [0, -298], [18, -292], [20, -266]], true, 5), { fill: P.dark, lw: T.S.lw * .7 });
    T.stroke([[-19, -272], [19, -272]], T.S.lw * .5, { line: P.mid });
    T.pop();
  });
  // whistle notes drifting up behind him (little ink dots, no words)
  for (let i = 0; i < 2; i++) { const p = ((u * .9 + i * .5) % 1); T.shape(T.ell(x + dir * 30 * k - dir * p * 40, y - 200 * k - p * 60, 4 * (1 - p), 4 * (1 - p), 6), { fill: P.ink, stroke: false, boil: 0, alpha: 1 - p }); }
}
// a woman in a window of the stone building, shaking a rug out over the sill (dust puffs); she looks down at the street
function windowLady(u, t) {
  const wx = 760, wy = 600, b = T.BASE, g = sg;
  const shake = Math.sin(t * 9) * (u % 2.4 < 1.2 ? 1 : .25), lookDown = (u > 2.4 && u < 3.0) || (u > 3.05 && u < 3.5) || (u > 5.2 && u < 5.8);
  g.save(); g.setTransform(b[0], b[1], b[2], b[3], b[4], b[5]); g.beginPath(); g.rect(wx + 3, wy + 3, 72, 109); g.clip();
  T.shape(T.ell(wx + 39, wy + 110, 30, 32, 18), { fill: P.light, lw: T.S.lw * .5 });
  for (const [dx, dy] of [[-12, -12], [8, -4], [-4, 10], [16, 12]]) T.shape(T.ell(wx + 39 + dx, wy + 110 + dy, 3, 3, 6), { fill: P.dmid, stroke: false, boil: 0 });
  const hy = wy + 58 + (lookDown ? 6 : 0);
  T.shape(T.ell(wx + 39, hy, 16, 18, 18), { fill: P.white, lw: T.S.lw * .55 });
  T.shape(T.spline([[wx + 21, hy - 2], [wx + 24, hy - 20], [wx + 39, hy - 25], [wx + 54, hy - 20], [wx + 57, hy - 2], [wx + 39, hy - 12]], true, 5), { fill: P.mid, lw: T.S.lw * .5 });
  pieEye(wx + 33, hy - 2, 4, 5.5, { lx: lookDown ? 0 : -.3, ly: lookDown ? 1 : 0, lwk: .45, type: (u > 3.06 && u < 3.4) ? 'wide' : undefined, lid: blinkLid(u, 1.3) });
  pieEye(wx + 45, hy - 2, 4, 5.5, { lx: lookDown ? 0 : -.3, ly: lookDown ? 1 : 0, lwk: .45, type: (u > 3.06 && u < 3.4) ? 'wide' : undefined, lid: blinkLid(u, 1.3) });
  T.shape(T.ell(wx + 39, hy + 9, 3, (u > 3.06 && u < 3.4) ? 3 : 1.5, 6), { fill: P.ink, stroke: false, boil: 0 });
  g.restore();
  // arms over the sill, the rug hanging out and flapping
  const ry = wy + 118, sh = shake * 6;
  hose([wx + 22, wy + 96], [wx + 12, ry - 4 + sh], 6, 7); hose([wx + 56, wy + 96], [wx + 66, ry - 4 + sh], -6, 7);
  const top = [], bot = []; for (let i = 0; i <= 6; i++) { const q = i / 6, w = Math.sin(t * 9 - q * 4) * 6 * q * (.4 + Math.abs(shake)); top.push([wx + 6 + q * 66, ry + sh]); bot.push([wx + 6 + q * 66 + w, ry + 70 + sh + w * .5]); }
  T.shape([...top, ...bot.reverse()], { fill: P.mid, lw: T.S.lw * .5, shade: () => { for (let j = 1; j < 4; j++) T.stroke([[wx + 6, ry + sh + j * 17], [wx + 72, ry + sh + j * 17]], T.S.lw * .3, { line: P.dark, boil: .3 }); } });
  for (const s of [-1, 1]) T.shape(T.ell(wx + 39 + s * 30, ry - 2 + sh, 6, 5, 8), { fill: P.white, lw: T.S.lw * .4 });
  const pp = (u % 1.2) / 1.2; if (u % 2.4 < 1.2) PR.puff(wx + 39 + pp * 40, ry + 80, 14, pp, P.pale);
}
// the site behind the gate: packed wall to wall — girders stacked to the lintel, kegs, two squeezed workers' eyes in the
// dark, a lantern swinging — and the gate leaf (hinged on the left) that Atom yanks open and slams shut
function siteGate(u, t) {
  const ST = SET.ST, b = T.BASE, g = sg, th = gateTheta(u);
  const x0 = ST.gate0, x1 = ST.gate1, yT = ST.fenceTop + 36, yB = ST.far - 4;
  const lurch = dsp(u, GATE.open, 12, 5) * 10 + (u > GATE.open && u < GATE.slam ? 4 : 0);
  if (th > .02) {
    g.save(); g.setTransform(b[0], b[1], b[2], b[3], b[4], b[5]); g.beginPath(); g.rect(x0 + 6, yT, x1 - x0 - 12, yB - yT); g.clip();
    T.shape(T.rect(x0, yT, x1 - x0, yB - yT), { fill: P.dark, stroke: false, boil: 0 });
    PR.at(lurch, 0, 1, () => {
      const rows = [[yB - 30, -.02, 0], [yB - 62, .03, 30], [yB - 96, -.05, -20], [yB - 132, .02, 40], [yB - 170, -.03, 10], [yB - 206, .06, -30], [yB - 240, -.02, 20], [yB - 274, .03, 0]];
      rows.forEach(([y, r, dx], i) => PR.at((x0 + x1) / 2 + dx, y, 1, () => PR.girder(-190, 190, -15, { d: 30, rivets: false, fill: i % 2 ? P.mid : P.dmid }), { rot: r + Math.sin(t * 3 + i) * .006 }));
      keg(x0 + 70, yB + 2); keg(x1 - 60, yB + 2);
      // two workers squeezed in the gaps: just faces and eyes in the dark, blinking
      for (const [fx, fy, ph, lx] of [[x0 + 120, yB - 118, 0, .8], [x1 - 100, yB - 190, 1.3, -.8]]) {
        T.shape(T.ell(fx, fy, 24, 16, 18), { fill: P.dmid, lw: T.S.lw * .4 });
        const wide = u > GATE.open && u < GATE.open + .6;
        pieEye(fx - 9, fy - 2, 7, 9, { lx, ly: .2, lwk: .5, lid: blinkLid(u, ph), type: wide ? 'wide' : undefined });
        pieEye(fx + 9, fy - 2, 7, 9, { lx, ly: .2, lwk: .5, lid: blinkLid(u, ph), type: wide ? 'wide' : undefined });
      }
    });
    const lx = x0 + 60, ly = ST.fenceTop + 40, a = Math.sin(t * 2.2) * .25, ex = lx + Math.sin(a) * 60, ey = ly + Math.cos(a) * 60;
    T.stroke([[lx, ly], [ex, ey]], T.S.lw * .35, { line: P.ink });
    T.shape(T.rr(ex - 10, ey, 20, 26, 5), { fill: P.pale, lw: T.S.lw * .45 });
    PR.glow(ex, ey + 14, 70, .45 + .1 * Math.sin(t * 9));
    g.restore();
  }
  // the beam that slides out at Atom on «site» (its far end stays inside the doorway)
  const bo = beamOut(u);
  if (bo > 1) PR.girder(x0 + 30, x1 - 10 + bo, yB - 30, { d: 30, rivets: false });
  // the gate leaf: hinge on the left post, free edge at x1 when shut; past 90° we see its braced back
  const bul = gateBulge(u), rat = u > GATE.slam ? jit(u, 1, 24) * bump(u, GATE.slam, .5) : 0;
  const c = Math.cos(th), s = Math.sin(th), W = x1 - x0, ex = x0 + W * c + rat, per = s * 26;
  const P4 = q => [x0 + W * q * c + rat * q, yT - per * q - bul * 10 * Math.sin(Math.PI * q)], P5 = q => [x0 + W * q * c + rat * q, yB + per * .6 * q + bul * 8 * Math.sin(Math.PI * q)];
  const pts = []; for (let i = 0; i <= 6; i++) pts.push(P4(i / 6)); for (let i = 6; i >= 0; i--) { const [px, py] = P5(i / 6); pts.push([px + bul * 6 * Math.sin(Math.PI * i / 6) * (i % 2 ? 1 : -1) * .3, py]); }
  const back_ = c < 0;
  T.shape(pts, { fill: back_ ? P.mid : P.light, lw: T.S.lw * .8, shade: () => T.shape(T.rect(Math.min(x0, ex) - 10, yT - 40, Math.abs(ex - x0) * .35 + 10, yB - yT + 80), { fill: P.dmid, stroke: false, boil: 0, alpha: .35 }) });
  for (let q = 1 / 6; q < .99; q += 1 / 6) { const [ax, ay] = P4(q), [bx2, by2] = P5(q); T.stroke([[ax, ay + 4], [bx2, by2 - 4]], T.S.lw * .4, { line: P.dmid, boil: .3 }); }
  if (back_ || th < .02) { const [ax, ay] = P4(.06), [bx2, by2] = P5(.94); T.stroke([[ax, ay + 30], [bx2, by2 - 30]], T.S.lw * .7, { line: P.dmid }); for (const yy of [.18, .82]) { const [a1, a2] = P4(0), [c1] = P4(1); T.stroke([[a1, lerp(yT, yB, yy)], [c1, lerp(yT, yB, yy)]], T.S.lw * .7, { line: P.dmid }); } }
  if (!back_) { const [hx, hy] = P4(.9); T.shape(T.ell(hx, hy + (yB - yT) * .5, 7, 10, 10), { fill: P.dark, lw: T.S.lw * .4 }); }
  for (const yy of [.15, .85]) T.shape(T.rect(x0 - 6, lerp(yT, yB, yy) - 8, 30, 16), { fill: P.dark, lw: T.S.lw * .4 });   // hinge straps
  if (u > GATE.hit && u < GATE.hit + .45) PR.puff(ex - 10, yB - 20, 26, seg(u, GATE.hit, GATE.hit + .45), P.pale);
  if (u > GATE.slam && u < GATE.slam + .5) { const p = seg(u, GATE.slam, GATE.slam + .5); PR.puff(x1 + 10, yT + 20, 26, p, P.pale); PR.puff(x1 + 14, yB - 20, 30, p, P.pale); PR.puff(x0 + 30, yT - 8, 22, p, P.pale); }
  for (const [c0, d] of [[GATE.slam + .22, .26], [GATE.slam + .52, .26]]) if (u > c0 && u < c0 + .45) PR.puff(x1 + 10, (yT + yB) / 2, 22, seg(u, c0, c0 + .45), P.pale);
  // a plank pops up over the top of the hoarding on «anything», wobbles, and drops back
  const pk = u > 3.2 && u < 3.95 ? Math.sin(Math.PI * seg(u, 3.2, 3.95)) : 0;
  if (pk > .01) {
    g.save(); g.setTransform(b[0], b[1], b[2], b[3], b[4], b[5]); g.beginPath(); g.rect(-400, -2000, 2000, 2000 + ST.fenceTop - 2); g.clip();
    PR.at(x0 + 150, ST.fenceTop + 120 - 170 * pk, 1, () => { T.shape(T.rr(-11, -110, 22, 220, 4), { fill: P.light, lw: T.S.lw * .7 }); T.stroke([[-4, -96], [-4, 100]], T.S.lw * .3, { line: P.dmid }); }, { rot: .12 + Math.sin(u * 20) * .06 * pk });
    g.restore();
  }
}
function honk(x, y) { for (let i = 0; i < 3; i++) { const a = -2.6 + i * .35; T.stroke([[x + Math.cos(a) * 40, y + Math.sin(a) * 40], [x + Math.cos(a) * 80, y + Math.sin(a) * 80]], T.S.lw * .7); } }
// the top: the derrick swings the bundle in (Atom and the pigeon riding it), the cart rolls in on its rail on «right»,
// the catcher reaches for the load, and the derrick sets it down on the cart on «needed» (squash, dust); then it rolls off
function shot2top(u, uq, t) {
  const c = cam3(kf(u, [[7.95, [560, 420, 1.0]], [9.71, [580, 450, 1.02]]]));
  c.y -= 90 * (1 - eo(seg(u, 7.95, 8.4)));   // the whip lands a little high and settles
  CAM = c;
  SET.drawLayer(sg, BGT, c, .12); T.frame(t);
  topSky(c, t);
  const LAND = 9.02, RIGHT = 8.36, CX = 590;
  // boom: swung out right at the landing of the whip, swings in over the cart; the hook lowers the load; after the
  // drop the hook is unhooked and goes back up as the boom swings away
  const ang = kf(u, [[7.95, -1.72], [8.55, -2.3, 'back'], [9.15, -2.3], [9.71, -1.95]]);
  const L = 720, tip = [1040 + Math.cos(ang) * L, L2 + Math.sin(ang) * L];
  const byLand = L2 - 54;
  const by = u < LAND ? kf(u, [[7.95, byLand - 300], [8.55, byLand - 290], [8.9, byLand - 30, 'eo'], [LAND, byLand, 'ei']]) : byLand + 6 * dsp(u, LAND, 20, 6);
  const sway = (u < LAND ? Math.sin(t * 2.4) * .05 + .1 * dsp(u, 8.55, 6, 2.5) : 0);
  const bx = u < 8.55 ? tip[0] + Math.sin(sway) * 260 : lerp(tip[0], CX, ss(seg(u, 8.4, 8.6))) + Math.sin(sway) * 120;
  const hookTo = u < 9.1 ? by - 78 - 170 : by - 78 - 170 - 520 * ei(seg(u, 9.1, 9.6));
  const drop = Math.max(40, hookTo - tip[1]);
  derrickTop({ foot: L2, ang, L, drop, swing: u < 9.1 ? Math.asin(clamp((bx - tip[0]) / Math.max(drop, 1), -.6, .6)) : Math.sin(t * 1.2) * .06 }, t);
  topSet({ c0: L3 - 120, c1: L3 - 120, c2: L3 - 120, l2: [-260, 1340], l2r: true, l3: [C1, C2], splice: L2 - 150 }, t);
  // the riveter checks his pocket watch at his chest (taps it twice), grins on the landing; the catcher reaches for the load
  const tapAt = x => bump(u, x, .16);
  drawW('riveter', { x: 820, y: L2, k: .95, t, ph: .3,
    armR: kf(u, [[8.1, restArm('riveter', 1)], [8.3, { x: 70, y: -170, rot: -1.2, bend: -30, hand: 'grab' }, 'back'], [LAND, { x: 70, y: -170, rot: -1.2, bend: -30, hand: 'grab' }], [9.25, { x: 70, y: -186, rot: -1.2, bend: -30, hand: 'grab' }], [9.5, restArm('riveter', 1)]]),
    armL: u > 8.45 && u < 8.95 ? { x: 30 + 14 * (tapAt(8.6) + tapAt(8.8)), y: -196 - 10 * (tapAt(8.6) + tapAt(8.8)), rot: -.5, bend: 20, hand: 'point', flip: false } : restArm('riveter', -1),
    over: () => { if (u > 8.2 && u < 9.45) { const wx = 76, wy = -196 - (u > LAND ? 16 * seg(u, LAND, 9.25) : 0); T.stroke(T.quad([wx - 10, wy + 20], [20, -140], [-6, -176]), T.S.lw * .35, { line: P.dark }); PR.watch(wx, wy, 1.05, { h: -1.0, m: -Math.PI / 2 + (u < LAND ? (u - 8.3) * 1.5 : 0) }); } },
    eyes: { lx: u < 8.3 ? -.3 : u < LAND ? .3 : -.6, ly: u < 8.3 ? .9 : u < LAND ? .8 : .6, type: u > LAND && u < 9.4 ? 'happy' : undefined }, brows: u < LAND ? 'up' : null,
    mouth: u > LAND ? { type: 'grin', open: .5 } : { type: 'flat' }, lean: .1 * bump(u, LAND, .4) + .05 * seg(u, 8.3, 8.5) * (u < LAND ? 1 : 0) });
  const reach = { x: 130, y: -230, rot: -.1, bend: -20, hand: 'open' };
  drawW('catcher', { x: 250, y: L2, k: .95, t, ph: .7, lean: .1 * ss(seg(u, RIGHT, RIGHT + .3)) * (1 - ss(seg(u, LAND, LAND + .3))),
    armR: kf(u, [[RIGHT - .1, restArm('catcher', 1)], [RIGHT + .2, reach, 'back'], [8.75, { ...reach, y: -200, hand: 'grab' }], [LAND, { ...reach, y: -170, hand: 'grab' }], [LAND + .2, { x: 80, y: -320, rot: -1.6, bend: -24, hand: 'thumb' }, 'back'], [9.71, { x: 80, y: -320, rot: -1.6, bend: -24, hand: 'thumb' }]]),
    eyes: { lx: .8, ly: u < LAND ? -.4 : .6 }, brows: u > RIGHT && u < LAND ? 'up' : null, mouth: u > LAND ? { type: 'grin', open: .45 } : u > RIGHT ? { type: 'o', w: 22 } : { type: 'smile' } });
  // the cart: rolls in from the right on «right», takes the load (squash), rolls off right with Atom and the pigeon riding
  const rin = eo(seg(u, RIGHT, RIGHT + .45)), roll = ei(seg(u, 9.25, 9.71));
  const cx = u < 9.25 ? lerp(1400, CX, rin) : CX + 760 * roll, cq = dsp(u, LAND, 20, 6);
  const ld = u >= LAND, lx = ld ? cx : bx;
  const hkx = u < 9.1 ? lx : tip[0];
  if (u < 9.1) { T.stroke([[hkx, hookTo + 100], [lx - 100, by - 78]], T.S.lw * .45); T.stroke([[hkx, hookTo + 100], [lx + 100, by - 78]], T.S.lw * .45); }
  shadow(cx, L2 + 3, 90, 8, .3);
  PR.railCart(cx, L2, 1, { roll: (rin + roll) * 20 });
  if (u > RIGHT && u < RIGHT + .5) PR.speedLines(cx + 90, L2 - 50, 120 * (1 - rin), 3, -1, 1 - rin, 9);
  shadow(lx, L2 - 50, 150 * (ld ? 1 : clamp(1 - (byLand - by) / 300)), 8, .25);
  PR.at(lx, by, 1, () => PR.bundle(0, 0, 330, 3, { tags: [{ num: '25', pop: 1, sw: dsp(u, LAND, 9, 3) * .5 + Math.sin(t * 3) * .08 }, { num: '26', pop: 1, sw: dsp(u, LAND, 9, 3) * .4 + Math.sin(t * 3 + 1) * .08 }] }), { sx: 1 + cq * .04, sy: 1 - cq * .06 });
  if (u > LAND && u < LAND + .5) { const p = seg(u, LAND, LAND + .5); PR.puff(cx - 170, L2 - 20, 34, p, P.pale); PR.puff(cx + 170, L2 - 20, 34, p, P.pale); PR.sparks(cx - 120, L2 - 40, p, 6, 70, 2); PR.sparks(cx + 120, L2 - 40, p, 6, 70, 5); }
  // Atom rides the load: holds the hook line, braces on the swing, squashes on the landing, «ta-da» on «needed», rides off
  const o = { x: lx - 115, y: by - 78 + 6 * cq, k: .62, t, noShadow: true };
  o.sy = 1 - .16 * cq; o.lean = -sway * 1.2 + .1 * dsp(u, 8.55, 6, 2.5) - (u > 9.25 ? .1 * bump(u, 9.3, .4) : 0);
  const UPLn = { x: -R * 1.3, y: NY - R * 1.05, rot: -Math.PI + 1.0, bend: -22, hand: 'open' };   // the ta-da, kept clear of the catcher's face
  const holdR = toLocal => { const [ax, ay] = toLocal(hkx - 16, hookTo + 120); return { x: ax, y: ay, rot: -1.5, bend: 24, hand: 'grab' }; };
  o.armR = RR; o.armL = kf(u, [[7.95, { ...UPL, hand: 'wave' }], [8.2, { ...UPL, y: UPL.y - 30, hand: 'wave' }], [8.45, SHL], [LAND - .05, SHL], [LAND + .12, UPLn, 'back'], [9.71, { ...UPLn, hand: 'wave' }]]);
  if (u < LAND + .02) o.armsW = toLocal => ({ armR: holdR(toLocal) });
  else o.armR = kf(u, [[LAND + .02, SHR], [LAND + .14, UPR, 'back'], [9.71, UPR]]);
  o.eyes = { lx: u < 8.55 ? -.6 : u < LAND ? .1 : .4, ly: u < LAND ? .9 : -.2, type: u > LAND && u < LAND + .3 ? 'wide' : undefined };
  o.eyeR = u > LAND + .3 ? { type: 'happy' } : null;
  o.brows = u < LAND ? 'up' : null;
  o.mouth = u < LAND ? { type: 'o', w: R * .34 } : { type: 'grin', w: R * .5, open: .7 };
  drawAtom(o);
  pigeon(lx + 90, by - 78, .8, { dir: u > 9.25 ? 1 : -1, wide: u < 8.6, puff: bump(u, LAND, .4), ly: u < 8.6 ? .8 : 0, lx: u > 9.25 ? 1 : 0 });
}

// ———————————————— SHOT 3 (20.349 – 31.397): the gang — toss, catch, drive it home ————————————————
const G3 = { heater: [330, LO], catcher: [300, L2], bucker: [470, L2], riveter: [800, L2], atom: [760, L1] };
const HOLE = [C1, L2 - 150];
const TOSS = 3.55, APEX = 4.45, HANG = 4.45, CATCH = 5.52, INSERT = 7.1, DRIVE0 = 8.7, DRIVE1 = 9.6, POP3 = 10.55;
function shot3(u, uq, t) {
  const c = cam3(kf(u, [[0, [540, 640, 1.12]], [.9, [540, 970, .92]], [3.4, [540, 970, .92]], [4.3, [525, 955, .95]], [5.52, [520, 955, .95]], [6.3, [560, 780, 1.1]], [7.1, [590, 670, 1.25]], [8.4, [592, 650, 1.31]], [9.9, [592, 650, 1.31]], [10.4, [570, 600, 1.05]], [11.05, [560, 520, .9]]]));
  CAM = c;
  SET.drawLayer(sg, BGT, c, .12); T.frame(t);
  topSky(c, t, { cloudShift: [700] });   // the big near cloud moved off the rivet's arc (shot 3 only)
  const rat = u > DRIVE0 && u < DRIVE1 ? 1 : 0;
  const g4 = clamp(spring(uq, POP3, 15, .3), 0, 1.25);
  derrickTop({ foot: L2, ang: -1.95, L: 720, drop: 80 + 30 * Math.sin(t * .8), swing: Math.sin(t * 1.1) * .1 }, t);
  const shake = rat * jit(u, 3);
  PR.at(shake, 0, 1, () => topSet({ c0: L3 - 120, c1: L3 - 120 - FH * g4, c2: L3 - 120, l2: [-260, 1340], l3: [C1, C2], splice: HOLE[1] }, t));
  // the rivet in the splice (after it goes in): heat fades on «cooled»; the head forms while it's driven
  const heatIn = 1 - seg(u, 9.6, 10.4);
  if (u >= INSERT) {
    PR.rivet(HOLE[0] - 14 + shake, HOLE[1], 0, 1.1, heatIn * .95);
    if (u > DRIVE0) T.shape(T.ell(HOLE[0] + 26 + shake, HOLE[1], 10 + 4 * seg(u, DRIVE0, DRIVE1), 13, 12), { fill: heatIn > .5 ? P.white : heatIn > .2 ? P.pale : P.mid, lw: T.S.lw * .5 });
    if (u > 9.8 && u < 10.9) PR.smoke(HOLE[0] + 10, HOLE[1] - 10, .6, (u - 9.8) * 2.2, 8);
  }
  // forge (left, on the low deck) + Atom (right, on the low deck)
  PR.forge(150, LO, 1, { t, crank: u < 6.05 ? t * 5 : (20.349 + 6.05) * 5 + 2.5 * (1 - Math.exp(-(u - 6.05) * 2)) });
  shadow(150, LO + 3, 110, 10, .3);
  PR.smoke(150, LO - 170, 1, t * 1.6, 3);
  keg(690, LO);
  const POINT = [1.12, 1.45, 1.78, 2.08];
  shot3Atom(u, uq, t, POINT, shake);
  // —— the heater: tongs into the coals, wind-up, toss ——
  const tongsGrip = { x: 70, y: -170, rot: -2.4, bend: -20, hand: 'grab' };
  const wind = { x: 40, y: -120, rot: -.6, bend: 30, hand: 'grab' };
  const throwA = { x: 90, y: -330, rot: -1.25, bend: -20, hand: 'grab' };
  let hArmR;
  if (u < 2.8) hArmR = restArm('heater', 1);
  else hArmR = kf(u, [[2.8, restArm('heater', 1)], [3.0, { x: -40, y: -200, rot: -2.6, bend: -30, hand: 'grab' }], [3.3, wind], [TOSS, throwA, 'back'], [4.3, throwA], [4.7, restArm('heater', 1)]]);
  const hk = { x: G3.heater[0], y: LO, k: 1, t, ph: .2, armR: hArmR,
    armL: u < 2.8 ? { x: -110, y: -150, rot: Math.PI - .5, bend: 16, hand: 'grab' } : kf(u, [[2.8, { x: -110, y: -150, rot: Math.PI - .5, bend: 16, hand: 'grab' }], [3.1, restArm('heater', -1)]]),
    hat: { lift: 30 * bump(u, POINT[0], .45), rot: -.3 * bump(u, POINT[0], .45) },
    itemR: (x, y, rot) => { if (u > 2.8 && u < 4.7) { PR.tongs(x, y, rot - .2, 110, u > TOSS - .02 && u < TOSS + .3 ? .6 : 0); if (u < TOSS) PR.rivet(x + Math.cos(rot - .2) * 112, y + Math.sin(rot - .2) * 112, rot, .9, 1); } },
    eyes: u < 2.8 ? { lx: .2, ly: -.4 } : u < TOSS ? { lx: -.5, ly: .5 } : u < CATCH + .3 ? { lx: .1, ly: -1 } : { lx: .3, ly: -.8 },
    brows: u > 3.2 && u < 3.6 ? 'angry' : null, mouth: u > TOSS && u < 4.3 ? { type: 'grin', open: .5 } : { type: 'smile' },
    lean: -.12 * bump(u, 3.05, .5) + .1 * bump(u, TOSS, .4), sy: 1 - .08 * bump(u, 3.25, .3) + .06 * bump(u, TOSS, .3) };
  if (u > 4.9 && u < 6.05) {
    const crank = t * 5, cw = ss(seg(u, 4.9, 5.4)) * (1 - ss(seg(u, 5.85, 6.05)));
    hk.armsW = tl => { const [lx, ly] = tl(150 + 86 + Math.cos(crank) * 30, LO - 128 + Math.sin(crank) * 30); return { armL: mixv(restArm('heater', -1), { x: lx, y: ly, rot: Math.PI - .3, bend: 20, hand: 'grab' }, cw) }; };
  }
  if (u >= 6.05) {   // off to fetch the next rivets: a clean walk out of frame to the left, whistling
    const w = seg(u, 6.05, 7.05), st = Math.sin((u - 6.05) * TAU / .42);
    hk.x = G3.heater[0] - 560 * w; hk.lean = -.08; hk.eyes = { lx: -.9, ly: 0 }; hk.mouth = { type: 'o', w: 16 };
    hk.legL = { x: -40 + 16 * st, y: -Math.max(0, st) * 26 }; hk.legR = { x: 40 + 16 * st, y: -Math.max(0, -st) * 26 }; hk.lift = 8 * Math.abs(st);
    hk.armL = { ...restArm('heater', -1), x: restArm('heater', -1).x + 22 * st }; hk.armR = { ...restArm('heater', 1), x: restArm('heater', 1).x + 22 * st };
  }
  const hW = drawW('heater', hk);
  if (u > 2.9 && u < TOSS) PR.sparks(150, LO - 160, seg(u, 2.95, 3.4), 6, 80, 9, -30);
  // —— the flying rivet ——
  const start = [hW.toWorld(throwA.x + Math.cos(-1.45) * 112, throwA.y + Math.sin(-1.45) * 112)[0], LO - 400];
  const canAt = [392, L2 - 302], apexP = [414, 150];   // apex ~200 px under the top edge, clear of the vignette
  const rvAt = uu => {
    if (uu < APEX) { const e = seg(uu, TOSS, APEX); return [lerp(start[0], apexP[0], e), apexP[1] + (start[1] - apexP[1]) * (1 - e) * (1 - e)]; }
    const e = seg(uu, APEX, CATCH); return [lerp(apexP[0], canAt[0], e), apexP[1] + (canAt[1] - apexP[1]) * e * e];
  };
  let RV = null;
  if (u >= TOSS && u < CATCH) {
    const [rx, ry] = rvAt(u);
    for (let i = 1; i < 7; i++) { const uu = u - i * .04; if (uu < TOSS) break; const [px, py] = rvAt(uu); T.shape(T.ell(px + Math.sin(u * 30 + i) * 3, py, 11 - i * 1.3, 11 - i * 1.3, 10), { fill: P.white, lw: T.S.lw * .3, alpha: .75 - i * .1 }); }
    if (u > APEX - .3) PR.sparks(rx, ry, ((u - APEX + .3) * 3) % 1, 5, 40, Math.floor(u * 3), 10);
    RV = [rx, ry];
    T.shape(T.ell(rx, ry, 34, 34, 16), { fill: null, line: P.dark, lw: T.S.lw * .5, alpha: .35 });   // keeps its outline on any light sky
    PR.glow(rx, ry, 150, .8);
    PR.rivet(rx, ry, u * 14, 2.0, 1);
    if (u > APEX - .25 && u < APEX + .3) { PR.glint(rx + 54, ry - 50, 40 * bump(u, APEX - .25, .55)); PR.glint(rx - 50, ry + 20, 24 * bump(u, APEX - .1, .4)); }
  }
  // —— the catcher: shuffles under it, catches it in the can, then sets it in the hole with the tongs (a long rubber arm) ——
  const shuffle = u > 4.25 && u < CATCH ? Math.sin((u - 4.25) * 11) * 30 * (1 - seg(u, CATCH - .25, CATCH)) : 0;
  const cq = dsp(u, CATCH, 18, 6);
  const canHold = { x: 50, y: -300, rot: .2, bend: -24, hand: 'grab' };   // the glove grips the can's side, its mouth clear above
  const toHole = toLocal => { const [lx, ly] = toLocal(HOLE[0] - 120, HOLE[1]); return { x: lx, y: ly, rot: 0, bend: -30, hand: 'grab' }; };
  // —— the bucker-up (dolly) and the riveter (gun): «the other two drove it home» ——
  const dollyOn = u > 8.25;
  // the two who wait: their eyes ride the rivet, they crouch as it falls and pop up on the catch; then they rub their hands
  const watchEyes = (x0, y0) => RV ? { lx: clamp((RV[0] - x0) / 220, -1, 1), ly: clamp((RV[1] - y0) / 220, -1, 1) } : null;
  const crouch = seg(u, HANG - .35, HANG + .2) * (1 - seg(u, CATCH, CATCH + .08));
  const cheer = (d = 0) => bump(u, CATCH + .04 + d, .42);
  const rub = (side, ph, x0 = 0) => { const w = Math.sin(q2(u) * TAU * 4.5 + ph) * 12; return { x: side * (16 + side * w) + x0, y: -150 + Math.abs(w) * .4, rot: side < 0 ? 0 : Math.PI, bend: side * -30, hand: 'open', flip: side < 0 }; };
  const rubW = d => ss(seg(u, 6.15 + d, 6.45 + d)) * (1 - ss(seg(u, 7.85 + d, 8.15 + d)));
  const rubB = ss(seg(u, 6.15, 6.3)) * (1 - ss(seg(u, 6.45, 6.6))), leanB = -.08 * ss(seg(u, 6.6, 6.8)) * (1 - ss(seg(u, 7.4, 7.6)));
  drawW('bucker', { x: G3.bucker[0] + (dollyOn ? 30 * ss(seg(u, 8.2, 8.45)) : 0) + rat * jit(u, 4, 27), y: L2, k: .95, t, ph: .45,
    sx: 1 + rat * jit(u + 1, .05) + .05 * crouch, sy: 1 + rat * jit(u + 2, .06) - .08 * crouch + .06 * cheer(), lift: 26 * cheer(), lean: -.05 * crouch + .06 * rubB * Math.sin(q2(u) * TAU * 2.25) + leanB,
    hat: { lift: 30 * bump(u, POINT[2], .45) + rat * Math.abs(jit(u + 3, 14)), rot: -.3 * bump(u, POINT[2], .45) },
    armsW: toLocal => {
      if (!dollyOn) { const w = rubB, up = cheer(); const L = mixv(restArm('bucker', -1), rub(-1, 0), w), Rr = mixv(restArm('bucker', 1), rub(1, 0), w);
        return { armL: L, armR: mixv(Rr, UPL_W('bucker', 1), up) }; }
      const [lx, ly] = toLocal(HOLE[0] - 160, HOLE[1] + 6), [lx2, ly2] = toLocal(HOLE[0] - 110, HOLE[1] + 4);
      const e = back(seg(u, 8.2, 8.45), 1.6);
      return { armL: mixv(restArm('bucker', -1), { x: lx, y: ly, rot: 0, bend: -40, hand: 'grab', flip: false }, e), armR: mixv(restArm('bucker', 1), { x: lx2, y: ly2, rot: 0, bend: 30, hand: 'grab' }, e) };
    },
    itemR: (x, y) => { if (dollyOn) PR.dolly(x - 40, y, 0, .9); },
    eyes: rat ? { type: 'squeeze' } : watchEyes(G3.bucker[0], L2 - 250) || (u > CATCH && u < 7.7 ? { lx: -.6, ly: .1 } : { lx: dollyOn ? .8 : .2, ly: dollyOn ? .3 : 0 }), brows: rat ? 'angry' : crouch > .3 ? 'up' : null,
    mouth: rat ? { type: 'wavy', open: .5 } : u > 9.9 ? { type: 'grin', open: .4 } : { type: 'smile' } });
  const gunUp = u > 8.3;
  const blow = bump(u, 9.95, .6);
  drawW('riveter', { x: G3.riveter[0] + rat * jit(u + 5, 5, 29), y: L2, k: .95, t, ph: .3, lean: -.06 * (gunUp ? 1 : 0) + .14 * blow - .06 * crouch,
    sx: 1 + rat * jit(u + 6, .06) + .04 * crouch, sy: 1 + rat * jit(u + 7, .07) - .07 * crouch + .06 * cheer(.08), lift: 30 * cheer(.08) + 18 * bump(u, 7.55, .3),
    hat: { lift: 0 },
    armsW: toLocal => {
      if (!gunUp) { const w = rubW(.12), up = cheer(.08); const L = mixv(restArm('riveter', -1), rub(-1, 1.3), w), Rr = mixv(restArm('riveter', 1), rub(1, 1.3), w);
        return { armL: mixv(L, UPL_W('riveter', -1), up), armR: mixv(Rr, UPL_W('riveter', 1), up) }; }
      if (u > DRIVE1 + .2 && blow < .05 && u > 10.6) return { armL: restArm('riveter', -1), armR: restArm('riveter', 1) };
      const [gx, gy] = toLocal(HOLE[0] + 150 + rat * jit(u + 8, 8, 33), HOLE[1] + 30);
      const e = back(seg(u, 8.3, 8.55), 1.6);
      const R0 = mixv(restArm('riveter', 1), { x: gx + 40, y: gy, rot: Math.PI, bend: 20, hand: 'grab' }, e);
      const L0 = mixv(restArm('riveter', -1), { x: gx - 30, y: gy - 30, rot: Math.PI, bend: -24, hand: 'grab' }, e);
      if (u > DRIVE1 + .2) { const b = seg(u, DRIVE1 + .2, 9.95); return { armR: mixv(R0, { x: 110, y: -250, rot: -1.2, bend: 20, hand: 'grab' }, ss(b)), armL: mixv(L0, restArm('riveter', -1), ss(b)) }; }
      return { armR: R0, armL: L0 };
    },
    itemR: (x, y, rot) => {
      if (!gunUp || u > 10.7) return;
      const hoseEnd = [(918 - G3.riveter[0]) / .95, -24];
      if (u > DRIVE1 + .2) { const ga = lerp(Math.PI, TAU - 1.0, ss(seg(u, DRIVE1 + .2, 9.95))); PR.rivetGun(x, y, ga, .9, { hose: hoseEnd }); if (u > 9.95 && u < 10.6) { const mx = x + Math.cos(ga) * 118 + Math.sin(ga) * 14, my = y + Math.sin(ga) * 118 - Math.cos(ga) * 14; PR.smoke(mx, my, .5, (u - 9.95) * 2, 4); } }
      else PR.rivetGun(x - 40, y, Math.PI, .9, { hose: hoseEnd });
    },
    eyes: rat ? { type: 'squeeze', side: 1 } : blow > .2 ? { lx: 1, ly: -.6 } : watchEyes(G3.riveter[0], L2 - 280) || (u > CATCH && u < 7.7 ? { lx: -.8, ly: .1 } : { lx: gunUp ? -.8 : -.2, ly: gunUp ? .2 : 0 }), brows: rat ? 'angry' : crouch > .3 ? 'up' : null,
    mouth: rat ? { type: 'grin', open: .6 } : blow > .2 ? { type: 'o', w: 22 } : { type: 'grin', open: .4 } });
  drawW('catcher', { x: G3.catcher[0] + shuffle, y: L2, k: .95, t, ph: .7, sy: 1 - .14 * cq - .05 * bump(u, CATCH - .35, .3), sx: 1 + .08 * cq, lift: -20 * bump(u, CATCH, .3) + 10 * Math.abs(Math.sin((u - 4.25) * 11)) * (u > 4.25 && u < CATCH - .25 ? 1 : 0), lean: shuffle * -.0015,
    hat: { lift: 30 * bump(u, POINT[1], .45), rot: -.3 * bump(u, POINT[1], .45) },
    armsW: toLocal => {
      const L = u < 1.4 ? restArm('catcher', -1) : u < POINT[1] + .5 ? kf(u, [[1.4, restArm('catcher', -1)], [POINT[1] + .05, { x: -10, y: -420, rot: -1.7, bend: 20, hand: 'grab' }, 'back'], [POINT[1] + .5, restArm('catcher', -1)]]) : restArm('catcher', -1);
      let Rr;
      if (u < 3.4) Rr = restArm('catcher', 1);
      else if (u < 6.3) Rr = kf(u, [[3.4, restArm('catcher', 1)], [3.8, canHold, 'back'], [CATCH, canHold], [CATCH + .15, { ...canHold, y: canHold.y + 30 }], [6.0, { ...canHold, y: -340 }, 'back'], [6.3, { ...canHold, y: -280 }]]);
      else if (u < 7.7) { const h = toHole(toLocal); Rr = kf(u, [[6.3, { ...canHold, y: -280 }], [6.6, { x: 90, y: -270, rot: -.4, bend: -10, hand: 'grab' }], [6.85, { ...h, x: h.x - 40, y: h.y - 140, bend: -120 }], [INSERT - .05, { ...h, bend: -160 }, 'back'], [7.3, { ...h, bend: -160 }], [7.7, restArm('catcher', 1)]]); }
      else Rr = restArm('catcher', 1);
      return { armL: L, armR: Rr };
    },
    itemR: (x, y, rot) => {
      if (u > 3.6 && u < 6.4) PR.can(x + 46, y - 24, .8, { tilt: dsp(u, CATCH, 22, 6) * .2 + (u > 6.0 ? .3 * seg(u, 6.0, 6.3) : 0), sy: 1 - cq * .1 });
      if (u >= CATCH && u < 6.4) { PR.glow(x + 46, y - 26, 90, .7 * (1 - seg(u, CATCH, CATCH + .8)) + .25); PR.rivet(x + 46, y - 30, -1.6, .8, 1); }
      if (u >= 6.4 && u < 7.7) { PR.tongs(x, y, rot, 100, u > INSERT && u < 7.4 ? .5 : 0); if (u < INSERT) PR.rivet(x + Math.cos(rot) * 104, y + Math.sin(rot) * 104, rot, .85, 1); }
    },
    over: () => { if (u >= CATCH && u < CATCH + .45) { const [gx, gy] = [canHold.x + 46, canHold.y - 22]; PR.sparks(gx, gy, seg(u, CATCH, CATCH + .45), 8, 80, 4, -30); PR.glint(gx + 30, gy - 30, 30 * bump(u, CATCH, .35)); } },
    eyes: u < 3.6 ? { lx: .3 } : u < CATCH ? { lx: clamp((470 - 300) / 300), ly: -1, type: u > HANG ? 'wide' : undefined } : u < 6.5 ? { lx: .2, ly: .2 } : u < 7.6 ? { lx: 1, ly: .2 } : { lx: .6, ly: 0 },
    brows: u > HANG && u < CATCH ? 'up' : null,
    mouth: u > HANG && u < CATCH ? { type: 'o', w: 24 } : u >= CATCH && u < 6.9 ? { type: 'grin', open: .5 } : { type: 'smile' } });
  if (rat) {
    for (let i = 0; i < 4; i++) { const a = -Math.PI / 2 + (i - 1.5) * .6 + jit(u + i, .3), r = 40 + Math.abs(jit(u * 2 + i, 20)); T.stroke([[HOLE[0] + 30 + Math.cos(a) * r, HOLE[1] + Math.sin(a) * r], [HOLE[0] + 30 + Math.cos(a) * (r + 30), HOLE[1] + Math.sin(a) * (r + 30)]], T.S.lw * .7); }
    PR.glint(HOLE[0] + 30 + jit(u, 10), HOLE[1] + jit(u + 1, 10), 18 + Math.abs(jit(u + 2, 10)));
  }
  // the pigeon: lands on the column top after «cooled» → the column grows another floor
  if (u > 9.6) {
    const e = seg(u, 9.6, POP3), top = L3 - 120 - FH * g4 - 8;
    if (u < POP3) pigeon(lerp(1200, C1 + 6, ss(e)), lerp(-200, L3 - 128, ei(e)) - Math.sin(e * Math.PI) * 60, .9, { dir: -1, fly: 1 - seg(u, POP3 - .1, POP3), flap: Math.sin(t * 24) });
    else pigeon(C1 + 6, top, .9, { dir: -1, puff: bump(u, POP3, .5), wide: true, ly: .9 });
  }
}
function shot3Atom(u, uq, t, POINT, shake = 0) {
  const o = { x: G3.atom[0] + shake, y: G3.atom[1], k: .8, t };
  const pt = (wx, wy) => toLocal => { const [lx, ly] = toLocal(wx, wy); const a = Math.atan2(ly - (NY - R * .2), lx + R); const d = R * 1.85; return { x: -R * .2 + Math.cos(a) * d, y: NY - R * .2 + Math.sin(a) * d, rot: a, bend: 18, hand: 'point' }; };
  const targets = [[330, LO - 260], [300, L2 - 360], [470, L2 - 260], [800, L2 - 300]];
  o.armsW = toLocal => {
    let armL = RL, armR = RR;
    if (u > 1.0 && u < 2.3) { let i = 0; while (i < 3 && u >= POINT[i + 1] - .05) i++; armL = pt(...targets[i])(toLocal); }
    else if (u >= 2.3 && u < 2.9) { armL = UPL; armR = UPR; }
    else if (u > 3.4 && u < 4.6) armL = pt(470, 120)(toLocal);
    else if (u > 8.55 && u < 9.8) {   // the gun goes off over his head: hands clapped over the sides of his head
      const e = back(seg(u, 8.55, 8.72), 1.6) * (1 - ss(seg(u, 9.6, 9.8)));
      armL = mixv(RL, { x: -R * 1.16, y: NY - R * .05, rot: -Math.PI / 2 + .25, bend: -30, hand: 'open' }, e);
      armR = mixv(RR, { x: R * 1.16, y: NY - R * .05, rot: -Math.PI / 2 - .25, bend: 30, hand: 'open' }, e);
    }
    else if (u > 9.9 && u < 10.5) { armL = SHL; armR = SHR; }
    else if (u > POP3) { armL = UPL; armR = UPR; }
    return { armL, armR };
  };
  const look = u < 1.0 ? [-.4, -.3] : u < 2.3 ? [-1, -.7] : u < 3.4 ? [0, 0] : u < CATCH ? [-.7, -1] : u < 7.4 ? [-.6, -.8] : u < 9.9 ? [-.5, -1] : u < POP3 ? [0, 0] : [-.6, -1];
  const rat = u > DRIVE0 && u < DRIVE1 ? 1 : 0;
  o.eyes = { lx: look[0], ly: look[1], type: rat ? 'squeeze' : (u > CATCH && u < CATCH + .4) || (u > 8.5 && u < DRIVE0) ? 'wide' : u > POP3 ? 'wide' : undefined };
  o.brows = (u > 4.0 && u < 6.0) || u > POP3 || (u > 8.5 && u < DRIVE0) ? 'up' : rat ? 'sad' : null;
  o.mouth = u > POP3 ? { type: 'o', w: R * .4 } : rat ? { type: 'wavy', w: R * .4, open: .4 } : u > DRIVE1 && u < 9.9 ? { type: 'flat', w: R * .3 } : null;
  o.lift = 30 * bump(u, 2.3, .4) + 20 * bump(u, CATCH, .35) - 10 * bump(u, 8.6, .2);
  o.lean = .06 * Math.sin(u * 3) * (u > 1 && u < 2.3 ? 1 : 0) + rat * jit(u + 11, .05, 27) - .08 * bump(u, 8.58, .3);
  o.sy = 1 - .1 * bump(u, 8.6, .22) + rat * jit(u + 12, .05, 24);
  if (u > DRIVE1 && u < 9.9) o.eyes = { lx: 0, ly: 0, lid: .4 * Math.abs(Math.sin((u - DRIVE1) * 20)) };
  drawAtom(o);
}

// ———————————————— SHOT 4 (31.397 – 43.559): four and a half floors a week; May 1931, the lights; the question ————————————————
// steel by «weeks»: each pop adds 4.5 floors (the pigeon lands, a week's worth grows under it), then the rush to 86 + the mast
const POPS4 = [.3, .75, 1.15, 1.6, 2.0, 2.5, 3.0, 3.22, 3.42, 3.6, 3.76, 3.9];
function steelAt(u) { let s = 34; POPS4.forEach((p, i) => { s += (i < 10 ? 4.5 : 3.6) * clamp(spring(u, p, 22, .38), 0, 1.15); }); return Math.min(s, 86.6); }
function shot4(u, uq, t) {
  const st = steelAt(uq), stS = steelAt(u - .08), top = PR.floorY(Math.min(86, st));
  const mast = ss(seg(uq, 4.0, 4.45));
  const clad = Math.min(86, Math.max(24, st - 10 + 10 * seg(u, 3.9, 4.5)));
  const trackY = PR.floorY(Math.min(86, stS)) + 300;
  const c = cam3(kf(u, [[0, [520, trackY, 2.0]], [3.95, [520, trackY, 2.0]], [4.6, [580, 990, 1.0]], [7.4, [590, 990, 1.0]], [8.3, [632, 1056, 1.38]], [11.3, [636, 1058, 1.4]], [11.62, [780, 1050, 1.4]], [12.2, [780, 1050, 1.4]]]));
  if (u < 3.95) { c.y = trackY; }
  else if (u < 4.6) { const e = ss(seg(u, 3.95, 4.6)); c.y = lerp(trackY, 990, e); }
  CAM = c;
  const night = ss(seg(u, 4.4, 6.6)) * .66;
  const lit = seg(u, 6.8, 7.35), cityLit = ss(seg(u, 5.2, 6.6));
  SET.drawLayer(sg, BGW.sky, c, .1); T.frame(t);
  // the timelapse: days flick by — a sun and a moon take turns crossing the sky while the steel rises
  const cyc = u < 3.95 ? (.5 - .5 * Math.cos(TAU * u / .9)) * (1 - seg(u, 3.5, 3.95)) : 0;
  if (u < 3.95) {
    useCam(c, .05); const fr = (u / .9) % 1, sx = -80 + fr * 1240, sy = 520 - Math.sin(Math.PI * fr) * 260;
    if (cyc < .5) { PR.glow(sx, sy, 160, .6 * (1 - cyc * 2)); T.shape(T.ell(sx, sy, 40, 40, 24), { fill: P.white, lw: T.S.lw * .5, alpha: 1 - cyc * 2 }); }
    else { const mx = 1160 - fr * 1240; PR.glow(mx, sy, 110, .4 * (cyc * 2 - 1)); T.shape([...T.arc(mx, sy, 30, 30, -Math.PI * .5, Math.PI * .5, 12), ...T.arc(mx - 14, sy, 22, 29, Math.PI * .5, -Math.PI * .5, 12)], { fill: P.paper, lw: T.S.lw * .45, alpha: cyc * 2 - 1 }); }
    useCam(c, 1);
  }
  // timelapse sky: clouds streak while the steel rises, slow down at dusk
  const cloudT = u < 4.2 ? u * 9 : 37.8 + (u - 4.2) * .8;
  useCam(c, .22);
  for (const [x0, y, k, v] of [[0, 300, 1.0, 40], [600, 620, .8, 30], [-300, 880, .7, 46], [300, 100, 1.1, 34]]) PR.cloud(((x0 + cloudT * v + 500) % 1800) - 400, y, k, {});
  SET.drawLayer(sg, BGW.far, c, .45);
  useCam(c, .45); for (const [x, y] of SET.FAR_CHIM) PR.smoke(x, y, .35, u < 4.2 ? u * 4 : t * .8, x);
  SET.drawLayer(sg, BGW.mid, c, .7);
  useCam(c, 1);
  PR.towerWide({ steel: st, clad, mast, lit: 0, t });
  const tw = PR.TW;
  // the «May 1931» banner plane flies in front of the tower, slow enough to read the whole banner (36.2 – 37.6)
  useCam(c, .22); if (u > 3.2 && u < 7.8) PR.plane(520 + (u - 4.8) * 420, 420 + Math.sin(u * 2) * 10, .9, { t, num: '1931' }); useCam(c, 1);
  // two derricks on the top floor, swinging fast in the timelapse, each with a beam on its hook
  if (mast < 1) for (const [dx, a0, f, ph] of [[-135, -2.3, 7, 0], [125, -.85, 6, 1.7]]) {
    const ang = a0 + Math.sin((u < 3.95 ? u * f : t * 2.6) + ph) * .55, k = 1.25, x = tw.cx + dx;
    PR.miniDerrick(x, top, ang, k);
    const hx = x + Math.cos(ang) * 64 * k, hy = top + (-20 + Math.sin(ang) * 64) * k + 30 * k;
    PR.at(hx, hy + 4, 1, () => PR.girder(-22, 22, 0, { d: 7, rivets: false }), { rot: Math.sin(t * 4 + ph) * .15 });
  }
  // the floor counter: a tag on a pole at the top of the steel (digits only)
  if (u < 4.05) {
    const n = String(Math.floor(Math.min(86, st))), p = POPS4.reduce((a, q) => a + dsp(uq, q, 20, 7), 0);
    PR.at(tw.cx - 92, top + 4, 1, () => { T.stroke([[0, 0], [0, 26]], T.S.lw * .5); T.shape(T.rr(-50, 24, 100, 58, 8), { fill: P.white, lw: T.S.lw * .7 }); PR.numeral(n, 0, 53, 36, { w: .15 }); }, { rot: Math.sin(t * 2) * .05 + p * .08, sy: 1 + p * .05 });
  }
  if (u < 3.98) {
    const hopA = POPS4.reduce((a, q) => a + bump(uq, q, .28), 0), land = POPS4.reduce((a, q) => a + bump(uq, q + .26, .14), 0);
    const jab = POPS4.reduce((a, q) => a + bump(uq, q + .3, .22), 0), zip = ei(seg(u, 3.78, 3.98));
    const oa = { x: tw.cx - 10 + 900 * zip, y: top, k: .16, t, noShadow: true, lift: 60 * Math.min(1, hopA), sy: 1 - .14 * Math.min(1, land), lean: .2 * zip };
    oa.armL = mixv({ x: -R * 1.7, y: NY - R * .1, rot: -Math.PI + .1, bend: 16, hand: 'point' }, { x: -R * 1.95, y: NY - R * .25, rot: -Math.PI + .2, bend: 10, hand: 'point' }, Math.min(1, jab));
    oa.armR = hopA > .3 || zip > 0 ? UPR : HIPR;
    oa.eyes = { lx: zip > 0 ? .9 : -.9, ly: -.2, type: hopA > .3 ? 'wide' : undefined }; oa.brows = 'up'; oa.forceMouth = { type: 'grin', w: R * .44, open: .5 };
    drawAtom(oa);
    if (zip > .05) PR.speedLines(oa.x - 30, top - 30, 140 * zip, 3, 1, 1, 13);
  }
  // the pigeon on the very top: lands → a week grows under it → hops → lands …
  const pigX = tw.cx + 40;
  let pg = null;
  if (u < 9.4) {
    const hopT = POPS4.reduce((a, q) => a + bump(uq, q, .3), 0);
    const yTop = mast > 0 ? PR.floorY(86) - 250 * mast - 2 : top - 2;
    pg = [pigX + 20 + (mast > 0 ? -60 : 0), yTop - 30 * Math.min(1, hopT), { dir: -1, k: .5, fly: Math.min(1, hopT * 2), flap: Math.sin(t * 26), wide: u < 4.2 || (u > 6.8 && u < 7.5), puff: bump(u, 6.8, .6) }];
  }
  SET.drawLayer(sg, BGW.near, c, 1.15);
  useCam(c, 1.15);
  for (const b of SET.NEAR) if (b.chim) PR.smoke(b.x + 22 + b.cx * (b.w - 40), b.top - 40, 1, u < 4.2 ? u * 4 : t, b.x);
  useCam(c, 1);
  // Atom's roof (right foreground) with a water tank and the knife switch on a post
  const fgIn = u < 3.9 ? 0 : ss(seg(u, 3.9, 4.6));
  if (pg) pigeon(pg[0], pg[1], u < 4 ? .5 : .38, pg[2]);
  // night falls
  darken(night);
  if (night > 0) nightSky(c, t, night / .66, cityLit);
  if (cityLit > 0) { SET.drawLayer(sg, BGW.farLit, c, .45, cityLit * .8); SET.drawLayer(sg, BGW.midLit, c, .7, cityLit * .85); SET.drawLayer(sg, BGW.nearLit, c, 1.15, cityLit * .9); }
  if (cityLit > 0) nightFlicker(c, t, cityLit);
  useCam(c, 1);
  if (lit > 0) {
    lightsPass(lit, t);
    PR.beams(tw.cx, PR.floorY(86) - 120, t, seg(u, 7.2, 7.8));
  }
  // the roof is drawn after the city lights (so no far window shows through it), dimmed to the night by a filter
  if (fgIn > 0) {
    fgOff(c, 0, 900 * (1 - fgIn));
    if (night > 0) {   // drawn off-screen once, then laid in with one dimming filter (cheap)
      const off = roofFG.cv || (roofFG.cv = document.createElement('canvas')); off.width = F.scene.width; off.height = F.scene.height;
      T.init(off); roofFG(u, t, cityLit); T.init(F.scene);
      sg.save(); sg.setTransform(1, 0, 0, 1, 0, 0); sg.filter = `brightness(${(1 - night * .97).toFixed(3)})`; sg.drawImage(off, 0, 0); sg.restore();
    } else roofFG(u, t, cityLit);
    useCam(c, 1);
  }
  if (lit > 0) flash(.35 * bump(u, 6.78, .25));
  if (pg && night > .1) pigeon(pg[0], pg[1], u < 4 ? .5 : .38, pg[2]);
  // Atom (lit by the bulb on the switch post) — throws the switch, asks the question
  if (u < 3.95 && cyc > 0) darken(.3 * cyc);
  if (fgIn > 0) { fgOff(c, 0, 900 * (1 - fgIn)); shot4Atom(u, uq, t, night); useCam(c, 1); }
}
function fgOff(c, dx, dy) { useCam(c, 1); T.BASE[4] += dx * c.z; T.BASE[5] += dy * c.z; T.reset(); }
// the night sky: stars of different sizes (a few twinkle, the brightest get a cross), a thin moon, and two city
// searchlights sweeping slowly from the rooftops once the city is lit
function nightSky(c, t, a, cityLit) {
  useCam(c, .05);
  for (let i = 0; i < 120; i++) {
    const x = hash(i * 1.7) * 1240 - 80, y = hash(i * 2.9) * 1100 - 40, big = hash(i * 5.3), tw = .55 + .45 * Math.sin(t * (1.5 + hash(i) * 3) + i);
    const r = big > .93 ? 3.2 : big > .7 ? 2.2 : 1.4;
    T.shape(T.ell(x, y, r, r, 6), { fill: P.white, stroke: false, boil: 0, alpha: a * (big > .7 ? tw : .45 + .3 * tw) });
    if (big > .96) { const L = 10 + 5 * tw; T.stroke([[x - L, y], [x + L, y]], T.S.lw * .25, { line: P.white, alpha: a * .8 * tw, boil: 0 }); T.stroke([[x, y - L], [x, y + L]], T.S.lw * .25, { line: P.white, alpha: a * .8 * tw, boil: 0 }); }
  }
  // a thin crescent moon, upper right
  const mx = 900, my = 230;
  PR.glow(mx, my, 150, .35 * a);
  T.shape([...T.arc(mx, my, 46, 46, -Math.PI * .5, Math.PI * .5, 16), ...T.arc(mx - 20, my, 34, 44, Math.PI * .5, -Math.PI * .5, 16).slice(0)], { fill: P.paper, lw: T.S.lw * .45, alpha: a });
  // searchlights from the near rooftops (behind the tower's own beams)
  if (cityLit > 0) {
    useCam(c, 1.15);
    for (const [x, y, ph] of [[-60, 1560, 0], [1180, 1600, 2.2]]) {
      const ang = -Math.PI / 2 + Math.sin(t * .35 + ph) * .55, w = .03, L = 2600;
      T.shape([[x, y], [x + Math.cos(ang - w) * L, y + Math.sin(ang - w) * L], [x + Math.cos(ang + w) * L, y + Math.sin(ang + w) * L]], { fill: P.white, stroke: false, boil: 0, alpha: .09 * cityLit });
      PR.glow(x, y, 50, .5 * cityLit);
    }
  }
  useCam(c, 1);
}
// near-block windows that switch on and off, and a couple that buzz (parallax 1.15)
function nightFlicker(c, t, a) {
  const g = sg; useCam(c, 1.15); const b = T.BASE;
  g.save(); g.setTransform(b[0], b[1], b[2], b[3], b[4], b[5]);
  for (const [x, y, w, h, i] of SET.FLICK) {
    const fast = i % 5 === 0, on = fast ? hash(Math.floor(t * 9) + i * 13) > .35 : hash(Math.floor(t * .8 + i * .37) * 7 + i) > .5;
    if (!on) continue;
    g.fillStyle = `rgba(255,${fast ? 244 : 250},${fast ? 215 : 232},${.9 * a})`; g.fillRect(x, y, w, h);
  }
  g.restore(); useCam(c, 1);
}
// lit windows of the tower, rising in a wave from the street to the mast (drawn after the darkness)
function lightsPass(lit, t) {
  const g = sg, b = T.BASE, { cx, fh } = PR.TW;
  g.save(); g.setTransform(b[0], b[1], b[2], b[3], b[4], b[5]);
  const hwOf = f => f < 6 ? 228 : f < 21 ? 172 : f < 25 ? 164 : f < 30 ? 158 : f < 72 ? 150 : f < 81 ? 120 : f < 85 ? 94 : 80;
  for (let f = 0; f < 86; f++) {
    if (f / 86 > lit * 1.08) break;
    const hw = hwOf(f), y = PR.floorY(f + 1);
    for (let x = cx - hw + 7; x < cx + hw - 6; x += 12) {
      const id = f * 131 + Math.round(x), dark = hash(Math.floor(f / 3) * 17 + Math.floor((x - cx + 240) / 48) * 5.3) < .2, h1 = hash(id * .37);
      if (dark ? h1 < .9 : h1 > .84) continue;                                  // dark offices in blocks, scattered off windows
      if (hash(id * 1.9) < .04 && hash(Math.floor(t * 6) + id) < .4) continue;    // a few buzz
      const warm = hash(id * 2.7);
      g.fillStyle = warm > .7 ? 'rgba(255,236,198,.78)' : warm > .2 ? 'rgba(255,250,230,.92)' : 'rgba(255,252,240,.6)';
      g.fillRect(x, y + 4, 5, fh - 7);
    }
  }
  g.restore();
  if (lit > .95) { const y86 = PR.floorY(86); PR.glow(cx, y86 - 120, 160, .55); T.shape(T.ell(cx, y86 - 290, 7, 7, 10), { fill: P.white, lw: T.S.lw * .4 }); PR.glow(cx, y86 - 290, 50, .6 + .4 * Math.sin(t * 7)); }
}
const ROOF = { y: 1330, x0: 600, x1: 1300, sw: [1000, 1150] };
function roofFG(u, t, lit = 0) {
  // parapet + roof slab + a water tank on stilts behind Atom (left edge) + the switch post
  T.shape(T.rect(ROOF.x0, ROOF.y, ROOF.x1 - ROOF.x0, 700), { fill: P.dmid, lw: T.S.lw * .8, shade: () => {
    T.shape(T.rect(ROOF.x0 + (ROOF.x1 - ROOF.x0) * .62, ROOF.y, 400, 700), { fill: P.dark, stroke: false, boil: 0, alpha: .3 });
    for (let y = ROOF.y + 32, i = 0; y < ROOF.y + 700; y += 23, i++) { T.stroke([[ROOF.x0, y], [ROOF.x1, y]], T.S.lw * .22, { line: P.dark, boil: .15 }); for (let x = ROOF.x0 + (i % 2) * 30 + 14; x < ROOF.x1; x += 60) if (hash(x * .13 + i) > .55) T.stroke([[x, y - 23], [x, y]], T.S.lw * .18, { line: P.dark, boil: 0 }); }
  } });
  // two rows of windows in the wall below (dark by day; at night a few glow)
  for (const [wy, row] of [[ROOF.y + 110, 0], [ROOF.y + 300, 1]]) for (let x = ROOF.x0 + 60; x < ROOF.x1 - 60; x += 150) {
    const on = (lit || 0) > 0 && hash(x * .7 + row * 3) > .45;
    T.shape(T.rect(x, wy, 64, 100), { fill: on ? P.pale : P.dark, lw: T.S.lw * .5, alpha: on ? .4 + .55 * lit : 1 });
    T.stroke([[x + 32, wy], [x + 32, wy + 100]], T.S.lw * .3, { line: P.ink }); T.stroke([[x, wy + 50], [x + 64, wy + 50]], T.S.lw * .3, { line: P.ink });
    T.shape(T.rect(x - 8, wy + 100, 80, 10), { fill: P.mid, lw: T.S.lw * .4 });
  }
  T.shape(T.rect(ROOF.x0 - 10, ROOF.y - 6, ROOF.x1 - ROOF.x0 + 20, 22), { fill: P.mid, lw: T.S.lw * .7 });
  for (let x = ROOF.x0 + 40; x < ROOF.x1; x += 64) T.stroke([[x, ROOF.y - 6], [x, ROOF.y + 16]], T.S.lw * .25, { line: P.dark, boil: .1 });
  // tank
  const tx = 690, ty = ROOF.y - 6;
  for (const s of [-1, 1]) T.stroke([[tx + s * 40, ty], [tx + s * 30, ty - 120]], T.S.lw * .9, { line: P.dark });
  T.stroke([[tx - 36, ty - 50], [tx + 36, ty - 80]], T.S.lw * .4, { line: P.dark }); T.stroke([[tx + 36, ty - 50], [tx - 36, ty - 80]], T.S.lw * .4, { line: P.dark });
  T.shape(T.rr(tx - 56, ty - 260, 112, 140, 10), { fill: P.mid, lw: T.S.lw * .8, shade: () => { T.shape(T.rect(tx + 14, ty - 270, 60, 160), { fill: P.dmid, stroke: false, boil: 0 }); for (const yy of [-240, -200, -160]) T.stroke([[tx - 56, ty + yy], [tx + 56, ty + yy]], T.S.lw * .4, { line: P.dark }); } });
  T.shape([[tx - 64, ty - 256], [tx, ty - 316], [tx + 64, ty - 256]], { fill: P.dark, lw: T.S.lw * .8 });
  // switch post + bulb
  const [sx, sy] = [ROOF.sw[0], ROOF.y];
  T.shape(T.rect(sx - 8, sy - 420, 16, 420), { fill: P.dark, lw: T.S.lw * .6 });
  T.stroke([[sx, sy - 420], [sx - 40, sy - 450]], T.S.lw * .6);
  T.shape(T.ell(sx - 46, sy - 440, 12, 15, 12), { fill: P.white, lw: T.S.lw * .5 });
}
function shot4Atom(u, uq, t, night) {
  const SW = 6.76;
  const lever = ss(seg(u, SW - .25, SW));
  const [sx, sy] = [ROOF.sw[0], ROOF.y];
  if (night > .05) PR.glow(sx - 46, sy - 440, 260, night * 1.2);
  PR.knifeSwitch(sx, sy - 250, .8, lever, { spark: u > SW && u < SW + .5 ? seg(u, SW, SW + .5) : 0 });
  const LAND = 10.3;
  const stretch = clamp(spring(u, LAND + .05, 16, .3), 0, 1.25);
  const hop = seg(u, 4.45, 4.75);
  const o = { x: lerp(1240, 780, eo(hop)), y: ROOF.y - 230 * Math.sin(Math.PI * hop) * (hop < 1 ? 1 : 0), k: .85, t };
  o.lift = 110 * stretch;
  if (hop < 1) { o.legL = { x: -30, y: -40 }; o.legR = { x: 40, y: -30 }; }
  o.sy = 1 - .16 * dsp(u, 4.75, 16, 6) * (u > 4.75 ? 1 : 0); o.noShadow = hop < .8;
  const pull = u > 5.9 && u < 7.3;
  o.armsW = toLocal => {
    if (pull) {
      const phi = lerp(-2.3, 0, lever), hand = [sx + .8 * Math.sin(phi) * 147, sy - 250 + .8 * (58 - Math.cos(phi) * 147)];
      const [lx, ly] = toLocal(hand[0] - 10, hand[1]);
      const reach = ss(seg(u, 5.9, 6.2)) * (1 - ss(seg(u, 7.0, 7.3)));
      return { armR: mixv(RR, { x: lx, y: ly, rot: -.3, bend: -30, hand: 'grab' }, reach), armL: mixv(RL, { x: lx - 20, y: ly + 20, rot: -.3, bend: 40, hand: 'grab', flip: false }, reach) };
    }
    return {};
  };
  const ptCam = { x: R * 1.0, y: NY + R * 1.15, rot: -1.9, bend: -34, hand: 'fist', gk: 1.9 };
  const thumbBack = { x: -R * 1.5, y: NY - R * 1.1, rot: -2.4, bend: 24, hand: 'point' };
  if (!pull) {
    o.armR = kf(u, [[4.6, RR], [5.0, HIPR], [5.8, HIPR], [7.3, RR], [7.9, SHR, 'back'], [8.3, SHR], [8.55, ptCam, 'back'], [9.4, ptCam], [9.7, RR], [10.3, RR], [10.5, UPR, 'back'], [10.9, UPR], [11.3, SHR, 'back'], [12.2, SHR]]);
    const ptPlane = { x: -R * 1.0, y: NY - R * 1.6, rot: -Math.PI / 2 - .4, bend: -20, hand: 'point' };
    o.armL = kf(u, [[4.6, RL], [4.95, HIPL], [5.12, ptPlane, 'back'], [5.6, ptPlane], [5.85, RL], [7.3, RL], [7.9, SHL, 'back'], [8.3, SHL], [8.6, HIPL], [9.4, HIPL], [9.6, thumbBack, 'back'], [10.2, thumbBack], [10.5, UPL, 'back'], [10.9, UPL], [11.3, SHL, 'back'], [12.2, SHL]]);
    if (u > 8.55 && u < 9.4) o.armR = { ...o.armR, gk: lerp(1.22, 1.9, ss(seg(u, 8.4, 8.6))) };
  }
  const pointing = u > 8.6 && u < 9.4;
  const lookUp = u > 4.0 && u < 6.0 ? [-.8, -1] : u > 6.0 && u < 7.4 ? [.6, -.3] : u > 9.6 && u < 10.2 ? [-.8, -.6] : u > LAND - .3 && u < 11.0 ? [0, -1] : [0, 0];
  o.eyes = { lx: lookUp[0], ly: lookUp[1], type: (u > SW && u < 7.3) || (u > LAND && u < 10.9) ? 'wide' : undefined };
  o.eyeR = u > 11.6 ? { type: 'happy' } : null;
  o.brows = (u > 7.7 && u < 9.5) || u > LAND ? 'up' : null;
  o.mouth = u > SW && u < 7.3 ? { type: 'o', w: R * .4 } : u > 11.8 ? { type: 'grin', w: R * .46, open: .55 } : null;
  o.lean = -.05 * bump(u, 6.4, .5) - .05 * bump(u, 5.0, .7) - .25 * Math.sin(Math.PI * hop) * (hop < 1 ? 1 : 0);
  if (u < 5.9) o.lift = (o.lift || 0) + 14 * bump(u, 5.05, .3);
  // the pigeon rides on Atom's head after landing
  const pigOn = u >= LAND;
  o.over = () => {
    if (pigOn) pigeon(10, NY - R - 8, .7, { dir: -1, puff: bump(u, LAND, .5), peck: u > 11.2 ? bump(u, 11.3, .3) : 0, lx: -.4, ly: .6, lid: u > 11.4 ? .5 : 0 });
    if (pointing) {
      const a = o.armR, gk = a.gk, cx = a.x + Math.cos(a.rot) * 24 * gk, cy = a.y + Math.sin(a.rot) * 24 * gk, fr = 12 * gk * (1 + .1 * dsp(u, 8.6, 20, 6));
      T.shape(T.ell(cx + 4, cy - 4, fr, fr, 24), { fill: P.white, lw: T.S.lw });
      T.stroke(T.arc(cx + 4, cy - 4, fr * .55, fr * .45, -2.4, -.7, 8), T.S.lw * .5);
      const pk = bump(u, 8.6, .5) + .6 * bump(u, 9.0, .4);
      if (pk > .02) for (let i = 0; i < 4; i++) { const an = -1.9 + (i - 1.5) * .5; T.stroke([[cx + Math.cos(an) * (fr + 20), cy + Math.sin(an) * (fr + 20)], [cx + Math.cos(an) * (fr + 20 + 34 * pk), cy + Math.sin(an) * (fr + 20 + 34 * pk)]], T.S.lw * .7); }
    }
  };
  if (u < 4.45) return;   // he hops in from off-screen right (35.85), landing whole in frame at 36.15
  const st = drawAtom(o);
  // the pigeon's flight from the mast down to Atom's head
  if (u > 9.4 && u < LAND) {
    const e = seg(u, 9.4, LAND), [hx, hy] = atomWorld(o, st, 10, NY - R - 8), y86 = PR.floorY(86) - 252;
    pigeon(lerp(PR.TW.cx, hx, ss(e)) + Math.sin(e * Math.PI * 2) * 60, lerp(y86, hy, ei(e)) - Math.sin(e * Math.PI) * 80, lerp(.38, .6, e), { dir: 1, fly: 1 - seg(u, LAND - .1, LAND), flap: Math.sin(t * 24) });
  }
  // iris out on Atom's face (and the pigeon)
  const [fx, fy] = atomWorld(o, st, 0, NY - 30);
  const ir = u < 11.62 ? 2000 : u < 11.86 ? lerp(1100, 300, eo(seg(u, 11.62, 11.86))) : u < 11.98 ? 300 : lerp(300, 0, ei(seg(u, 11.98, 12.13)));
  if (ir < 1500) iris(fx, fy, ir);
}

// —— thumbnail: the gang and the pigeon on a girder high over the city, Atom in the middle, a red-hot rivet in the air ——
function thumb() {
  const c = { x: 540, y: 820, z: 1.0 }, t = .25;
  CAM = c;
  SET.drawLayer(sg, BGT, c, .12); T.frame(t);
  useCam(c, .28);
  PR.cloud(160, 260, 1.2, {}); PR.cloud(860, 120, .9, {}); PR.cloud(820, 620, .7, {});
  for (let i = 0; i < 5; i++) PR.bird(620 + i * 40, 360 + (i % 2) * 16, 11, i);
  useCam(c, 1);
  PR.derrick(1040, 1040, -300, -2.05, 760, 160, .08, { t });
  PR.column(110, 300, 2200, {}); PR.column(970, 300, 2200, {});
  deck(1040, -260, 1340);
  PR.girder(-260, 1340, 1500, { d: 56 });
  drawW('catcher', { x: 150, y: 1040, k: .98, t, ph: .7, armR: { x: 70, y: -330, rot: -1.3, bend: -20, hand: 'grab' }, itemR: (x, y) => PR.can(x + 4, y - 4, .8, {}), eyes: { lx: .7, ly: -1 }, mouth: { type: 'o', w: 24 }, brows: 'up' });
  drawW('heater', { x: 335, y: 1040, k: .98, t, ph: .2, armR: { x: 90, y: -330, rot: -1.25, bend: -20, hand: 'grab' }, itemR: (x, y, rot) => PR.tongs(x, y, rot - .2, 110, .6), eyes: { lx: .3, ly: -1 }, mouth: { type: 'grin', open: .5 } });
  const o = { x: 565, y: 1040, k: 1.0, t };
  o.armR = UPR; o.armL = UPL; o.eyes = { lx: -.3, ly: -.6, type: 'wide' }; o.brows = 'up'; o.forceMouth = { type: 'grin', w: R * .5, open: .7 };
  drawAtom(o);
  drawW('riveter', { x: 795, y: 1040, k: .98, t, ph: .3, armR: { x: 60, y: -170, rot: -.4, bend: -20, hand: 'grab' }, itemR: (x, y) => PR.rivetGun(x, y, -.4, .9, {}), eyes: { lx: -.6, ly: -.8 }, mouth: { type: 'grin', open: .5 } });
  drawW('bucker', { x: 960, y: 1040, k: .9, t, ph: .45, armL: { x: -110, y: -260, rot: -2.2, bend: 30, hand: 'open' }, eyes: { lx: -.8, ly: -.6 }, mouth: { type: 'grin', open: .4 } });
  PR.rivet(520, 420, .6, 1.4, 1);
  for (let i = 1; i < 6; i++) T.shape(T.ell(520 - i * 16, 420 + i * 20, 7 - i, 7 - i, 8), { fill: P.white, stroke: false, boil: 0, alpha: .5 - i * .08 });
  PR.glint(570, 380, 30);
  pigeon(565, 1040 + (NY - R - 8) * 1.0, .9, { dir: -1, wide: true, lx: -.4, ly: -.8, puff: .3 });
}

window.DUR = DUR;
window.render = t => {
  t = clamp(t, 0, DUR - 1e-4);
  sg.setTransform(1, 0, 0, 1, 0, 0); sg.fillStyle = '#000'; sg.fillRect(0, 0, 1080, 1920);
  if (THUMB) { thumb(); post(F, 1.0, {}); return; }
  let i = 0; while (t >= CUT[i + 1]) i++;
  const s = CUT[i], u = t - s, uq = Math.max(0, q2(t) - s);
  [shot1, shot2, shot3, shot4][i](u, uq, t);
  post(F, t, { jump: u < 1 / 24 + 1e-6 && i > 0 ? 5 : 0 });
};
window.READY = true;
