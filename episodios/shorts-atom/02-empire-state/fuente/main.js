// main.js — «ASK Atom» short #2: how the Empire State was built in 410 days (1930s rubber-hose, 9:16, 24 fps, 43.559 s)
// Four shots cut on the voice timeline (linea.json), actions keyed to the English word timings. Characters and props on
// twos (12 fps), camera on ones. Tempo 120 BPM (a beat = 12 frames): idle things breathe on the beat, in phase with the band.
// The running gag: a pigeon looking for somewhere to land — every time it lands, another floor grows under it.
import * as T from '/styles/rubber-hose/demo/toon.js';
import { P } from '/styles/rubber-hose/demo/chars.js';
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

// —— camera ——
let CAM = { x: 540, y: 960, z: 1 };
function useCam(c, par = 1) {
  const z = 1 + (c.z - 1) * par, cx = 540 + (c.x - 540) * par, cy = 960 + (c.y - 960) * par;
  T.BASE.splice(0, 6, z, 0, 0, z, 540 - cx * z, 960 - cy * z); T.reset();
}
const cam3 = v => ({ x: v[0], y: v[1], z: v[2] });
// a vertical whip-smear over the finished scene (cartoon whip-pan): amt 0..1, dir −1 = moving up
function smear(amt, dir = -1) {
  if (amt <= .01) return;
  const tmp = smear.cv || (smear.cv = document.createElement('canvas')); tmp.width = 1080; tmp.height = 1920;
  const tg = tmp.getContext('2d'); tg.drawImage(F.scene, 0, 0);
  sg.save(); sg.setTransform(1, 0, 0, 1, 0, 0);
  for (let i = 1; i <= 7; i++) { sg.globalAlpha = .28; sg.drawImage(tmp, 0, dir * i * 46 * amt); }
  sg.globalAlpha = 1; sg.restore();
  T.BASE.splice(0, 6, 1, 0, 0, 1, 0, 0); T.reset();
  for (let i = 0; i < 9; i++) { const x = 60 + hash(i * 3.3 + Math.floor(amt * 9)) * 960, y = hash(i * 7.1 + Math.floor(amt * 13)) * 1920; T.stroke([[x, y], [x, y + 260 * amt]], T.S.lw * .6, { line: P.ink, alpha: .55 * amt }); }
}
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
  useCam(cam, .28);
  for (const [x0, y, k, v] of [[100, 120, 1.1, 14], [700, 320, .8, 10], [-200, 560, .7, 18], [420, -120, 1.2, 12], [1000, 760, .6, 16]]) {
    const x = ((x0 + t * v * (o.wind || 1) + 400) % 1700 + 1700) % 1700 - 400;
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
  if (st.l2) { const dy = -320 * (1 - clamp(st.l2d ?? 1)) * (1 - clamp(st.l2d ?? 1)); deck(L2 + dy, st.l2[0], st.l2[1], { planks: st.l2p !== false }); }
  if (st.l3) PR.girder(st.l3[0], st.l3[1], L3 + 16, { d: 56 });
  for (const sb of st.stubs || []) { const dy = -240 * (1 - clamp(sb.drop ?? 1)) ** 2; if ((sb.drop ?? 1) > 0) PR.girder(sb.x0, sb.x1, sb.y + 16 + dy, { d: 56 }); }
}
function derrickTop(d, t) { return PR.derrick(1040, d.foot, d.foot - 1150, d.ang, d.L, d.drop, d.swing, { t, hook: {} }); }

// ———————————————— SHOT 1 (0 – 10.637): wide 1930 Manhattan → the top of the steel ————————————————
function shot1(u, uq, t) {
  if (u < 3.0) return shot1wide(u, uq, t);
  shot1top(u, uq, t);
  smear(1 - seg(u, 3.0, 3.22), -1);
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
  smear(seg(u, 2.62, 3.0), -1);
}
// Atom carries a beam; looks for somewhere to put it down
function shot1top(u, uq, t) {
  // the right column grows a floor every time the pigeon lands on it
  const POP1 = 3.68, POP2 = 4.78;
  const g1 = clamp(spring(uq, POP1, 15, .3), 0, 1.25), g2 = clamp(spring(uq, POP2, 15, .3), 0, 1.25);
  const c2 = L1 - 120 - FH * g1 - FH * g2;
  const c = cam3(kf(u, [[3.0, [540, 1010, 1.0]], [3.6, [540, 980, 1.0]], [4.2, [560, 860, 1.0]], [5.0, [600, 700, 1.0]], [5.5, [600, 720, 1.0]], [6.3, [540, 980, 1.0]], [10.64, [548, 990, 1.03]]]));
  CAM = c;
  SET.drawLayer(sg, BGT, c, .12); T.frame(t);
  const gust = bump(u, 6.4, 1.6);
  topSky(c, t, { wind: 1 + gust * 3 });
  const swing = Math.sin(t * 1.3) * .12 + gust * .3;
  // the hook lowers the «410» sign on «410», the gust spins it, it goes back up
  const sdrop = 60 + 600 * ss(seg(u, 5.4, 5.95)) - 640 * ss(seg(u, 8.0, 8.7));
  const hook = derrickTop({ foot: L1, ang: -1.95, L: 1150, drop: sdrop, swing: swing + dsp(u, 5.95, 6, 2) * .2 }, t);
  topSet({ c0: L1 - 120, c1: L1 - 120, c2, stubs: [{ x0: C2 - 260, x1: C2 + 30, y: L2, drop: seg(uq, POP1 + .1, POP1 + .35) }, { x0: C2 - 220, x1: C2 + 30, y: L3, drop: seg(uq, POP2 + .1, POP2 + .35) }] }, t);
  if (sdrop > 80) {
    const [hx, hy] = hook, sp = (dsp(u, 5.95, 7, 2) * .25 + gust * Math.sin(u * 9) * .35);
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
  drawW('heater', { x: 330, y: LO, k: 1, t, ph: .2, hat: { lift: 26 * bump(u, 6.7, .6), rot: -.4 * bump(u, 6.7, .6) },
    armsW: tl => { const [lx, ly] = tl(hx_, hy_); return { armL: { x: lx, y: ly, rot: Math.PI - .3, bend: 20, hand: 'grab' }, armR: u > 6.6 && u < 7.5 ? { x: 80, y: -330, rot: -1.2, bend: -20, hand: 'open' } : restArm('heater', 1) }; },
    eyes: { lx: u > 5.5 && u < 8.2 ? .5 : -.6, ly: u > 5.5 && u < 8.2 ? -.8 : .3, type: u > 6.6 && u < 7.2 ? 'wide' : undefined }, mouth: u > 6.6 && u < 7.4 ? { type: 'o', w: 30 } : { type: 'smile', w: 30 } });
  keg(920, LO);
  PR.smoke(150, LO - 170, 1, t * 1.6, 3);
  // Atom with the beam on his shoulder
  const look = u < 4.3 ? [.8, -.6] : u < 5.4 ? [.7, -1] : u < 6.5 ? [-.3, -.6] : u < 7.4 ? [-.9, 0] : u < 8.1 ? [-.9, .3] : u < 8.8 ? [.9, .3] : u < 9.9 ? [-.8, .9] : [0, -.6];
  const o = { x: 660, y: LO, k: .95, t };
  const step = u > 7.6 && u < 9.4 ? Math.sin((u - 7.6) * TAU / 1.2) : 0;
  o.lean = -.08 * bump(u, 7.5, .8) + .08 * bump(u, 8.3, .8) + .05 * bump(u, 9.2, .4);
  o.x = 660 - 30 * bump(u, 7.5, .9) + 50 * bump(u, 8.3, .9);
  o.legL = { x: -46, y: -Math.max(0, step) * 26 }; o.legR = { x: 46, y: -Math.max(0, -step) * 26 };
  const bal = seg(u, 9.95, 10.25);
  const hold = { x: R * 1.05, y: NY - R * 1.12, rot: -1.4, bend: -24, hand: 'open' };
  const fing = { x: R * .3, y: NY - R * 1.9, rot: -Math.PI / 2, bend: -10, hand: 'point' };
  const lower = { x: R * 1.45, y: NY + R * .4, rot: .6, bend: -24, hand: 'open' };
  o.armR = u < 9.3 ? hold : u < 9.9 ? kf(u, [[9.3, hold], [9.6, lower]]) : kf(u, [[9.9, lower], [10.2, fing, 'back']]);
  o.armL = kf(u, [[5.6, RL], [5.85, { x: R * .2, y: NY - R * 1.4, rot: -1.3, bend: 20, hand: 'point' }, 'back'], [6.5, { x: R * .2, y: NY - R * 1.4, rot: -1.3, bend: 20, hand: 'point' }], [6.8, SHL], [7.4, SHL], [7.6, RL], [9.55, RL], [9.8, SHL, 'back'], [10.6, SHL]]);
  o.eyes = { lx: look[0], ly: look[1], type: u > 9.55 && u < 9.95 ? 'wide' : undefined };
  o.brows = (u > 5.8 && u < 6.6) || u > 9.5 ? 'up' : null;
  o.mouth = u > 9.55 && u < 9.95 ? { type: 'o', w: R * .4 } : u > 10.0 ? { type: 'grin', w: R * .44, open: .5 } : null;
  const wob = Math.sin(u * 8) * .08 * bal;
  o.over = () => {
    if (u < 9.3) { const rot = Math.sin(t * 2) * .02 + .05 * bump(u, 7.5, .9) - .05 * bump(u, 8.3, .9); PR.at(R * .35, NY - R * 1.2, 1, () => PR.girder(-170, 170, -14, { d: 28 }), { rot }); }
    else if (u < 9.9) { const e = seg(u, 9.3, 9.6); PR.at(lerp(R * .35, R * 1.3, e), lerp(NY - R * 1.2, NY + R * .2, e), 1, () => PR.girder(-170, 170, -14, { d: 28 }), { rot: e * .25 }); }
    else { const a = o.armR; PR.at(a.x, a.y - 44 - 30 * bal, 1, () => PR.girder(-170, 170, -28, { d: 28 }), { rot: wob }); }
  };
  drawAtom(o);
  // the pigeon: flies in, lands on the column top (pop!), again (pop!), then down into the only free spot
  pigeonTop1(u, uq, t, c2, POP1, POP2);
  // calendar pages blowing past on «days»
  if (u > 6.4 && u < 8.6) for (let i = 0; i < 11; i++) {
    const p = (u - 6.4 - i * .09) / 1.6; if (p < 0 || p > 1) continue;
    const x = lerp(-120, 1220, p) + Math.sin(p * 9 + i) * 40, y = 260 + hash(i * 3.1) * 780 + Math.sin(p * 6 + i * 2) * 60;
    PR.calPage(x, y, .8 + hash(i) * .4, p * 7 + i, Math.cos(p * 11 + i), String(1 + Math.floor(hash(i * 5.3) * 28)));
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
  if (u < 7.95) smear(seg(u, 7.6, 7.95), -1); else smear(1 - seg(u, 7.95, 8.3), -1);
}
const TRUCK_STOP = 180, TK = 1.15;
function truckX(u) { return u < 4.15 ? 1700 : TRUCK_STOP + (1600 - TRUCK_STOP) * (1 - eo(seg(u, 4.15, 5.3))); }
function shot2street(u, uq, t) {
  const c = cam3(kf(u, [[0, [540, 1080, 1.12]], [4.0, [520, 1090, 1.1]], [6.6, [500, 1060, 1.12]], [7.5, [520, 950, 1.12]], [7.95, [520, 720, 1.15], 'ei']]));
  CAM = c;
  SET.drawLayer(sg, BGS, c, 1); T.frame(t);
  useCam(c, .3);
  for (const [x0, y, k, v] of [[100, 60, .9, 16], [800, 220, .7, 12]]) PR.cloud(((x0 + t * v + 400) % 1700) - 400, y, k, {});
  for (let i = 0; i < 6; i++) { const x = ((t * 70 + i * 40) % 1700) - 300, y = 180 + Math.sin(t * .8 + i) * 26 + (i % 3) * 20; PR.bird(x, y, 12, t * 15 + i); }
  useCam(c, 1);
  const ST = SET.ST;
  for (let i = 0; i < 3; i++) PR.smoke(700 + i * 14, 1440, .9, t * .8 + i * .33, 20 + i);
  T.shape(T.ell(706, 1444, 46, 9, 18), { fill: P.dark, lw: T.S.lw * .5 });
  if (u < 6.6) { const hx = TRUCK_STOP + 340 * TK + Math.sin(t * 1.4) * 40, hy = 400 + Math.sin(t * .9) * 12; T.stroke([[TRUCK_STOP + 340 * TK, -600], [hx, hy]], T.S.lw * .5, { line: P.ink }); PR.hookBlock(hx, hy, Math.sin(t * 1.4) * .3); }
  // cars: one far lane left→right, one honking right→left in the near lane
  const cA = seg(u, 0, 1.9); if (cA > 0 && cA < 1) PR.car(lerp(-250, 1350, cA), 1400, .75, { dir: 1, wheel: u * 20, tone: P.mid });
  const cB = seg(u, 2.15, 3.0); if (cB > 0 && cB < 1) { const x = lerp(1400, -300, cB); PR.car(x, 1500, .85, { dir: -1, wheel: -u * 22, tone: P.dmid }); PR.speedLines(x + 150, 1430, 140, 3, -1, .8, 3); if (u > 2.4 && u < 2.75) honk(x - 120, 1360); }
  // Atom on the far pavement
  const o = { x: 820, y: ST.far, k: .75, t };
  const slide = 1 - eo(seg(u, 0, .4));
  o.x += 380 * slide; o.lean = -.25 * slide + .12 * dsp(u, .4, 14, 5);
  const jump = bump(u, 2.45, .45);
  o.lift = 60 * jump; o.sy = 1 - .1 * dsp(u, .4, 16, 6) + .08 * jump;
  const ptUp = { x: R * 1.25, y: NY - R * 1.3, rot: -Math.PI / 2 - .1, bend: 20, hand: 'point' };
  const toSiteR = { x: -R * .6, y: NY - R * .3, rot: -Math.PI + .1, bend: 30, hand: 'open' };
  const toSiteL = { x: -R * 1.8, y: NY - R * .2, rot: -Math.PI + .2, bend: 20, hand: 'open' };
  const ptTruck = { x: -R * 1.7, y: NY + R * .1, rot: -Math.PI + .05, bend: 16, hand: 'point' };
  o.armR = kf(u, [[.3, RR], [.5, ptUp, 'back'], [1.2, ptUp], [1.4, RR], [1.55, toSiteR, 'back'], [2.3, toSiteR], [2.45, UPR, 'back'], [2.9, UPR], [3.15, SHR, 'back'], [3.7, SHR], [4.0, RR], [6.0, RR], [6.25, { ...UPR, hand: 'point' }, 'back'], [7.0, { ...UPR, hand: 'point' }], [7.3, RR]]);
  o.armL = kf(u, [[.3, RL], [1.4, RL], [1.55, toSiteL, 'back'], [2.3, toSiteL], [2.45, UPL, 'back'], [2.9, UPL], [3.15, SHL, 'back'], [3.7, SHL], [4.0, RL], [5.5, RL], [5.7, ptTruck, 'back'], [6.1, ptTruck], [6.3, RL]]);
  const look = u < 1.4 ? [0, 0] : u < 2.35 ? [-.9, .2] : u < 3.0 ? [.9, .7] : u < 4.1 ? [0, 0] : u < 5.4 ? [lerp(.9, -.9, seg(u, 4.2, 5.3)), .5] : u < 6.2 ? [-.9, .4] : u < 7.1 ? [-.8, -.3] : [-.6, -1];
  o.eyes = { lx: look[0], ly: look[1], type: (u > 2.45 && u < 2.9) || (u > 4.5 && u < 4.9) ? 'wide' : undefined };
  o.eyeR = u > .8 && u < 1.15 ? { type: 'happy' } : null;
  o.brows = u < 1.3 || (u > 2.4 && u < 3.7) || u > 5.4 ? 'up' : null;
  o.mouth = u > 2.45 && u < 2.9 ? { type: 'wavy', w: R * .4, open: .5 } : null;
  drawAtom(o);
  // the truck from Pennsylvania (keystone on the door), two floors of steel on the bed
  const tx = truckX(u), moving = u > 4.15 && u < 5.3, stopK = dsp(u, 5.3, 12, 4), unload = dsp(u, 7.45, 14, 5);
  const wheel = -(1700 - tx) / 44;
  const loaded = u < 7.4;
  if (u > 4.15) {
    PR.puff(tx + 205 * TK, 1480 - 300 * TK, 30, seg(u % .4, 0, .4) * (moving || u < 6 ? 1 : 0));
    if (u > 5.0 && u < 5.8) PR.puff(tx + 480, 1470, 50, seg(u, 5.1, 5.8), P.pale);
    if (u > 5.25 && u < 5.8) PR.puff(tx - 30, 1470, 40, seg(u, 5.25, 5.8), P.pale);
    const tags = [{ num: '25', pop: clamp(spring(u, 6.14, 16, .3), 0, 1.3), sw: Math.sin(u * 3) * .12 }, { num: '26', pop: clamp(spring(u, 6.55, 16, .3), 0, 1.3), sw: Math.sin(u * 3 + 1) * .12 }];
    PR.truck(tx, 1480, TK, { wheel, bob: Math.abs(Math.sin(u * 18)) * 4 * (moving ? 1 : 0) + 8 * unload, dive: -.035 * stopK, emblem: bump(u, 5.5, .45), load: loaded ? () => PR.bundle(0, 0, 330, 3, { tags }) : null });
    if (moving) PR.speedLines(tx + 640, 1320, 200, 4, -1, .8, 7);
    if (u > 5.5 && u < 6.0) PR.glint(tx + 140, 1300, 26 * bump(u, 5.5, .45));
  }
  // the derrick's hook comes down on «at a time», hooks the sling, and the bundle goes up (with the pigeon on it)
  const bx = TRUCK_STOP + 340 * TK, byTop = 1480 - (122 + 78) * TK;
  const hookY = u < 6.6 ? 400 : u < 7.25 ? lerp(400, byTop - 120, eo(seg(u, 6.6, 7.25))) : byTop - 120 - 1500 * ei(seg(u, 7.4, 8.1));
  if (u > 6.6) {
    T.stroke([[bx + Math.sin(u * 2) * 4, -600], [bx, hookY]], T.S.lw * .5, { line: P.ink });
    PR.hookBlock(bx, hookY, 0);
    if (!loaded) {
      const by = 1480 - 122 * TK - 1500 * ei(seg(u, 7.4, 8.1));
      T.stroke([[bx, hookY + 100], [bx - 110, by - 78 * TK]], T.S.lw * .45); T.stroke([[bx, hookY + 100], [bx + 110, by - 78 * TK]], T.S.lw * .45);
      PR.at(bx, by, TK, () => PR.bundle(0, 0, 330, 3, { tags: [{ num: '25', pop: 1 }, { num: '26', pop: 1 }] }));
    }
  }
  if (u > 7.2 && u < 7.5) PR.glint(bx + 20, byTop - 20, 24 * bump(u, 7.25, .25));
  // the pigeon: lands on the bundle on «two floors», rides it up
  if (u > 5.6) {
    let x, y, po;
    const landed = 6.9;
    if (u < landed) { const e = seg(u, 5.6, landed); x = lerp(1150, bx + 90, ss(e)); y = lerp(500, byTop, ei(e)) - Math.sin(e * Math.PI) * 100; po = { dir: -1, fly: 1, flap: Math.sin(t * 24) }; }
    else { x = bx + 90; y = u < 7.4 ? byTop : byTop - 1500 * ei(seg(u, 7.4, 8.1)); po = { dir: -1, wide: u > 7.35, puff: bump(u, 7.4, .5), ly: u > 7.35 ? .8 : 0 }; }
    pigeon(x, y, .8, po);
  }
}
function honk(x, y) { for (let i = 0; i < 3; i++) { const a = -2.6 + i * .35; T.stroke([[x + Math.cos(a) * 40, y + Math.sin(a) * 40], [x + Math.cos(a) * 80, y + Math.sin(a) * 80]], T.S.lw * .7); } }
// the top: the bundle rises into view and lands on the little rail cart «right when it was needed»
function shot2top(u, uq, t) {
  const c = cam3(kf(u, [[7.95, [560, 760, 1.0]], [9.71, [580, 800, 1.02]]]));
  CAM = c;
  SET.drawLayer(sg, BGT, c, .12); T.frame(t);
  topSky(c, t);
  const LAND = 9.02;
  derrickTop({ foot: L2, ang: -1.95, L: 720, drop: 90 + 40 * Math.sin(t), swing: Math.sin(t * 1.2) * .08 }, t);
  topSet({ c0: L3 - 120, c1: L3 - 120, c2: L3 - 120, l2: [-260, 1340], l3: [C1, C2], splice: L2 - 150 }, t);
  // the cart: waits, takes the load (squash), rolls off right with the pigeon riding
  const roll = ei(seg(u, 9.25, 9.71)), cx = 560 + 760 * roll, cq = dsp(u, LAND, 20, 6);
  const by = u < LAND ? lerp(1700, L1 - 54, eo(seg(u, 7.95, LAND))) : L1 - 54 + 6 * cq;
  if (u < 9.3) {   // hook cable from above
    const hy = by - 78 - 160 - (u > 9.1 ? 500 * ei(seg(u, 9.1, 9.5)) : 0);
    T.stroke([[560, -600], [560, hy]], T.S.lw * .5, { line: P.ink }); PR.hookBlock(560, hy, 0);
    if (u < 9.1) { T.stroke([[560, hy + 100], [460, by - 78]], T.S.lw * .45); T.stroke([[560, hy + 100], [660, by - 78]], T.S.lw * .45); }
  }
  shadow(cx, L1 + 3, 90, 8, .3);
  PR.railCart(cx, L1, 1, { roll: roll * 20 });
  PR.at(cx, by + 0, 1, () => PR.bundle(0, 0, 330, 3, { tags: [{ num: '25', pop: 1, sw: dsp(u, LAND, 9, 3) * .5 }, { num: '26', pop: 1, sw: dsp(u, LAND, 9, 3) * .4 }] }), { sx: 1 + cq * .04, sy: 1 - cq * .06 });
  if (u > LAND && u < LAND + .4) { PR.sparks(cx - 120, L1 - 40, seg(u, LAND, LAND + .4), 6, 70, 2); PR.sparks(cx + 120, L1 - 40, seg(u, LAND, LAND + .4), 6, 70, 5); }
  pigeon(cx + 90, by - 78, .8, { dir: u > 9.25 ? 1 : -1, wide: u < 8.6, puff: bump(u, LAND, .4), ly: u < 8.6 ? .8 : 0, lx: u > 9.25 ? 1 : 0 });
  // the riveter checks his watch; the catcher gives a thumbs-up; the heater looks up from below
  drawW('riveter', { x: 820, y: L2, k: .95, t, ph: .3,
    armR: kf(u, [[8.3, restArm('riveter', 1)], [8.5, { x: 40, y: -250, rot: -2.0, bend: -30, hand: 'grab' }, 'back'], [LAND, { x: 40, y: -250, rot: -2.0, bend: -30, hand: 'grab' }], [9.3, { x: 40, y: -262, rot: -2.0, bend: -30, hand: 'grab' }]]),
    itemR: (x, y) => { if (u > 8.4) PR.watch(x - 10, y - 30, 1.5, { h: -1.0, m: -Math.PI / 2 + (u < LAND ? (u - 8.4) * 1.5 : 0) }); },
    eyes: { lx: u < 8.6 ? -.3 : -.6, ly: u < 8.6 ? .9 : .6, type: u > LAND && u < 9.4 ? 'happy' : undefined }, brows: u < LAND ? 'up' : null,
    mouth: u > LAND ? { type: 'grin', open: .5 } : { type: 'flat' }, lean: .1 * bump(u, LAND, .4) });
  drawW('catcher', { x: 300, y: L2, k: .95, t, ph: .7,
    armR: kf(u, [[LAND, restArm('catcher', 1)], [LAND + .2, { x: 80, y: -320, rot: -1.6, bend: -24, hand: 'thumb' }, 'back'], [9.71, { x: 80, y: -320, rot: -1.6, bend: -24, hand: 'thumb' }]]),
    eyes: { lx: .5, ly: .9 }, mouth: u > LAND ? { type: 'grin', open: .45 } : { type: 'smile' } });
}

// ———————————————— SHOT 3 (20.349 – 31.397): the gang — toss, catch, drive it home ————————————————
const G3 = { heater: [330, LO], catcher: [300, L2], bucker: [470, L2], riveter: [800, L2], atom: [760, L1] };
const HOLE = [C1, L2 - 150];
const TOSS = 3.55, APEX = 4.2, HANG = 4.55, CATCH = 5.52, INSERT = 7.1, DRIVE0 = 8.7, DRIVE1 = 9.6, POP3 = 10.55;
function shot3(u, uq, t) {
  const c = cam3(kf(u, [[0, [540, 620, 1.12]], [.9, [540, 820, .92]], [3.2, [540, 820, .92]], [3.6, [470, 820, .98]], [4.2, [470, 520, 1.12]], [5.5, [450, 520, 1.12]], [6.4, [480, 500, 1.15]], [7.3, [560, 470, 1.2]], [8.4, [620, 350, 1.38]], [9.9, [620, 350, 1.38]], [10.4, [560, 520, 1.05]], [11.05, [560, 380, 1.05]]]));
  CAM = c;
  SET.drawLayer(sg, BGT, c, .12); T.frame(t);
  topSky(c, t);
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
  PR.forge(150, LO, 1, { t, crank: t * 5 });
  shadow(150, LO + 3, 110, 10, .3);
  PR.smoke(150, LO - 170, 1, t * 1.6, 3);
  keg(690, LO);
  const POINT = [1.12, 1.45, 1.78, 2.08];
  shot3Atom(u, uq, t, POINT);
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
  const hW = drawW('heater', hk);
  if (u > 2.9 && u < TOSS) PR.sparks(150, LO - 160, seg(u, 2.95, 3.4), 6, 80, 9, -30);
  // —— the flying rivet ——
  const start = [hW.toWorld(throwA.x + Math.cos(-1.45) * 112, throwA.y + Math.sin(-1.45) * 112)[0], LO - 400];
  const canAt = [378, L2 - 318];
  if (u >= TOSS && u < CATCH) {
    let rx, ry;
    if (u < APEX) { const e = eo(seg(u, TOSS, APEX)); rx = lerp(start[0], 470, e); ry = lerp(start[1], 70, e); }
    else if (u < HANG) { const e = seg(u, APEX, HANG); rx = 470 + e * 8; ry = 70 - Math.sin(e * Math.PI) * 12; }
    else { const e = ei(seg(u, HANG, CATCH)); rx = lerp(478, canAt[0], e); ry = lerp(70, canAt[1] + 10, e); }
    for (let i = 1; i < 8; i++) T.shape(T.ell(rx + Math.sin(u * 20 + i) * 4, ry + i * 26 * (u < HANG ? 1 : -1), 13 - i * 1.4, 13 - i * 1.4, 10), { fill: P.white, lw: T.S.lw * .3, alpha: .7 - i * .08 });
    PR.glow(rx, ry, 150, .8);
    PR.rivet(rx, ry, u * 14, 2.0, 1);
    if (u > 4.0 && u < 4.65) { PR.glint(rx + 54, ry - 50, 40 * bump(u, 4.05, .55)); PR.glint(rx - 50, ry + 20, 24 * bump(u, 4.2, .45)); }
  }
  // —— the catcher: shuffles under it, catches it in the can, then sets it in the hole with the tongs (a long rubber arm) ——
  const shuffle = u > HANG && u < CATCH ? Math.sin((u - HANG) * 14) * 26 * (1 - seg(u, CATCH - .2, CATCH)) : 0;
  const cq = dsp(u, CATCH, 18, 6);
  const canHold = { x: 70, y: -300, rot: -1.3, bend: -20, hand: 'grab' };
  const toHole = toLocal => { const [lx, ly] = toLocal(HOLE[0] - 120, HOLE[1]); return { x: lx, y: ly, rot: 0, bend: -30, hand: 'grab' }; };
  drawW('catcher', { x: G3.catcher[0] + shuffle, y: L2, k: .95, t, ph: .7, sy: 1 - .14 * cq, sx: 1 + .08 * cq, lift: -20 * bump(u, CATCH, .3),
    hat: { lift: 30 * bump(u, POINT[1], .45), rot: -.3 * bump(u, POINT[1], .45) },
    armsW: toLocal => {
      const L = u < 1.4 ? restArm('catcher', -1) : u < POINT[1] + .5 ? kf(u, [[1.4, restArm('catcher', -1)], [POINT[1] + .05, { x: -10, y: -420, rot: -1.7, bend: 20, hand: 'grab' }, 'back'], [POINT[1] + .5, restArm('catcher', -1)]]) : restArm('catcher', -1);
      let Rr;
      if (u < 3.4) Rr = restArm('catcher', 1);
      else if (u < 6.3) Rr = kf(u, [[3.4, restArm('catcher', 1)], [3.8, canHold, 'back'], [CATCH, canHold], [CATCH + .15, { ...canHold, y: canHold.y + 30 }], [6.0, { ...canHold, y: -340 }, 'back'], [6.3, { ...canHold, y: -280 }]]);
      else if (u < 7.7) { const h = toHole(toLocal); Rr = kf(u, [[6.3, { ...canHold, y: -280 }], [6.6, { x: 90, y: -270, rot: -.4, bend: -10, hand: 'grab' }], [INSERT - .05, h, 'back'], [7.3, h], [7.7, restArm('catcher', 1)]]); }
      else Rr = restArm('catcher', 1);
      return { armL: L, armR: Rr };
    },
    itemR: (x, y, rot) => {
      if (u > 3.6 && u < 6.4) PR.can(x + 4, y - 4, .8, { tilt: dsp(u, CATCH, 22, 6) * .2 + (u > 6.0 ? .3 * seg(u, 6.0, 6.3) : 0), sy: 1 - cq * .1 });
      if (u >= CATCH && u < 6.4) { PR.rivet(x + 4, y + 10, -1.6, .8, 1); if (u < CATCH + .4) PR.sparks(x + 4, y - 10, seg(u, CATCH, CATCH + .4), 7, 80, 4, -20); }
      if (u >= 6.4 && u < 7.7) { PR.tongs(x, y, rot, 100, u > INSERT && u < 7.4 ? .5 : 0); if (u < INSERT) PR.rivet(x + Math.cos(rot) * 104, y + Math.sin(rot) * 104, rot, .85, 1); }
    },
    eyes: u < 3.6 ? { lx: .3 } : u < CATCH ? { lx: clamp((470 - 300) / 300), ly: -1, type: u > HANG ? 'wide' : undefined } : u < 6.5 ? { lx: .2, ly: .2 } : u < 7.6 ? { lx: 1, ly: .2 } : { lx: .6, ly: 0 },
    brows: u > HANG && u < CATCH ? 'up' : null,
    mouth: u > HANG && u < CATCH ? { type: 'o', w: 24 } : u >= CATCH && u < 6.9 ? { type: 'grin', open: .5 } : { type: 'smile' } });
  // —— the bucker-up (dolly) and the riveter (gun): «the other two drove it home» ——
  const dollyOn = u > 8.25;
  drawW('bucker', { x: G3.bucker[0] + (dollyOn ? 30 * ss(seg(u, 8.2, 8.45)) : 0) + rat * jit(u, 4, 27), y: L2, k: .95, t, ph: .45,
    sx: 1 + rat * jit(u + 1, .05), sy: 1 + rat * jit(u + 2, .06),
    hat: { lift: 30 * bump(u, POINT[2], .45) + rat * Math.abs(jit(u + 3, 14)), rot: -.3 * bump(u, POINT[2], .45) },
    armsW: toLocal => {
      if (!dollyOn) return { armL: restArm('bucker', -1), armR: restArm('bucker', 1) };
      const [lx, ly] = toLocal(HOLE[0] - 160, HOLE[1] + 6), [lx2, ly2] = toLocal(HOLE[0] - 110, HOLE[1] + 4);
      const e = back(seg(u, 8.2, 8.45), 1.6);
      return { armL: mixv(restArm('bucker', -1), { x: lx, y: ly, rot: 0, bend: -40, hand: 'grab', flip: false }, e), armR: mixv(restArm('bucker', 1), { x: lx2, y: ly2, rot: 0, bend: 30, hand: 'grab' }, e) };
    },
    itemR: (x, y) => { if (dollyOn) PR.dolly(x - 40, y, 0, .9); },
    eyes: rat ? { type: 'squeeze' } : { lx: dollyOn ? .8 : .2, ly: dollyOn ? .3 : 0 }, brows: rat ? 'angry' : null,
    mouth: rat ? { type: 'wavy', open: .5 } : u > 9.9 ? { type: 'grin', open: .4 } : { type: 'smile' } });
  const gunUp = u > 8.3;
  const blow = bump(u, 9.95, .6);
  drawW('riveter', { x: G3.riveter[0] + rat * jit(u + 5, 5, 29), y: L2, k: .95, t, ph: .3, lean: -.06 * (gunUp ? 1 : 0) - .1 * blow,
    sx: 1 + rat * jit(u + 6, .06), sy: 1 + rat * jit(u + 7, .07),
    hat: { lift: 0 },
    armsW: toLocal => {
      if (!gunUp || u > DRIVE1 + .2 && blow < .05 && u > 10.6) return { armL: restArm('riveter', -1), armR: restArm('riveter', 1) };
      const [gx, gy] = toLocal(HOLE[0] + 150 + rat * jit(u + 8, 8, 33), HOLE[1] + 30);
      const e = back(seg(u, 8.3, 8.55), 1.6);
      const R0 = mixv(restArm('riveter', 1), { x: gx + 40, y: gy, rot: Math.PI, bend: 20, hand: 'grab' }, e);
      const L0 = mixv(restArm('riveter', -1), { x: gx - 30, y: gy - 30, rot: Math.PI, bend: -24, hand: 'grab' }, e);
      if (u > DRIVE1 + .2) { const b = seg(u, DRIVE1 + .2, 9.95); return { armR: mixv(R0, { x: -20, y: -300, rot: -2.2, bend: 30, hand: 'grab' }, ss(b)), armL: mixv(L0, restArm('riveter', -1), ss(b)) }; }
      return { armR: R0, armL: L0 };
    },
    itemR: (x, y, rot) => {
      if (!gunUp || u > 10.7) return;
      if (u > DRIVE1 + .2) { PR.rivetGun(x, y, -1.9 * ss(seg(u, DRIVE1 + .2, 9.95)) + Math.PI * (1 - ss(seg(u, DRIVE1 + .2, 9.95))), .9); if (u > 9.95 && u < 10.6) PR.smoke(x - 30, y - 120, .5, (u - 9.95) * 2, 4); }
      else PR.rivetGun(x - 40, y, Math.PI, .9, { hose: [x + 120, y + 330] });
    },
    eyes: rat ? { type: 'squeeze', side: 1 } : { lx: gunUp ? -.8 : -.2, ly: gunUp ? .2 : 0 }, brows: rat ? 'angry' : null,
    mouth: rat ? { type: 'grin', open: .6 } : blow > .2 ? { type: 'o', w: 22 } : { type: 'grin', open: .4 } });
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
function shot3Atom(u, uq, t, POINT) {
  const o = { x: G3.atom[0], y: G3.atom[1], k: .8, t };
  const pt = (wx, wy) => toLocal => { const [lx, ly] = toLocal(wx, wy); const a = Math.atan2(ly - (NY - R * .2), lx + R); const d = R * 1.85; return { x: -R * .2 + Math.cos(a) * d, y: NY - R * .2 + Math.sin(a) * d, rot: a, bend: 18, hand: 'point' }; };
  const targets = [[330, LO - 260], [300, L2 - 360], [470, L2 - 260], [800, L2 - 300]];
  o.armsW = toLocal => {
    let armL = RL, armR = RR;
    if (u > 1.0 && u < 2.3) { let i = 0; while (i < 3 && u >= POINT[i + 1] - .05) i++; armL = pt(...targets[i])(toLocal); }
    else if (u >= 2.3 && u < 2.9) { armL = UPL; armR = UPR; }
    else if (u > 3.4 && u < 4.6) armL = pt(470, 120)(toLocal);
    else if (u > 9.9 && u < 10.5) { armL = SHL; armR = SHR; }
    else if (u > POP3) { armL = UPL; armR = UPR; }
    return { armL, armR };
  };
  const look = u < 1.0 ? [-.4, -.3] : u < 2.3 ? [-1, -.7] : u < 3.4 ? [0, 0] : u < CATCH ? [-.7, -1] : u < 7.4 ? [-.6, -.8] : u < 9.9 ? [-.5, -1] : u < POP3 ? [0, 0] : [-.6, -1];
  o.eyes = { lx: look[0], ly: look[1], type: u > CATCH && u < CATCH + .4 ? 'wide' : u > POP3 ? 'wide' : undefined };
  o.brows = (u > 4.0 && u < 6.0) || u > POP3 ? 'up' : null;
  o.mouth = u > POP3 ? { type: 'o', w: R * .4 } : null;
  o.lift = 30 * bump(u, 2.3, .4) + 20 * bump(u, CATCH, .35);
  o.lean = .06 * Math.sin(u * 3) * (u > 1 && u < 2.3 ? 1 : 0);
  drawAtom(o);
}

// ———————————————— SHOT 4 (31.397 – 43.559): four and a half floors a week; May 1931, the lights; the question ————————————————
// steel by «weeks»: each pop adds 4.5 floors (the pigeon lands, a week's worth grows under it), then the rush to 86 + the mast
const POPS4 = [.3, .75, 1.15, 1.6, 2.0, 2.5, 3.0, 3.22, 3.42, 3.6, 3.76, 3.9];
function steelAt(u) { let s = 34; POPS4.forEach((p, i) => { s += (i < 10 ? 4.5 : 3.6) * clamp(spring(u, p, 22, .38), 0, 1.15); }); return Math.min(s, 86.6); }
function shot4(u, uq, t) {
  const st = steelAt(uq), stS = steelAt(u - .12), top = PR.floorY(Math.min(86, st));
  const mast = ss(seg(uq, 4.0, 4.45));
  const clad = Math.min(86, Math.max(24, st - 10 + 10 * seg(u, 3.9, 4.5)));
  const trackY = PR.floorY(Math.min(86, stS)) + 330;
  const c = cam3(kf(u, [[0, [520, trackY, 2.0]], [3.95, [520, trackY, 2.0]], [5.0, [580, 990, 1.0]], [7.4, [590, 990, 1.0]], [8.3, [700, 1010, 1.38]], [12.2, [705, 1012, 1.4]]]));
  if (u < 3.95) { c.y = trackY; }
  else if (u < 5.0) { const e = ss(seg(u, 3.95, 5.0)); c.y = lerp(trackY, 990, e); }
  CAM = c;
  const night = ss(seg(u, 4.4, 6.6)) * .66;
  const lit = seg(u, 6.8, 7.35), cityLit = ss(seg(u, 5.2, 6.6));
  SET.drawLayer(sg, BGW.sky, c, .1); T.frame(t);
  // timelapse sky: clouds streak while the steel rises, slow down at dusk
  const cloudT = u < 4.2 ? u * 6 : 25.2 + (u - 4.2) * .8;
  useCam(c, .22);
  for (const [x0, y, k, v] of [[0, 300, 1.0, 40], [600, 620, .8, 30], [-300, 880, .7, 46], [300, 100, 1.1, 34]]) PR.cloud(((x0 + cloudT * v + 500) % 1800) - 400, y, k, {});
  if (u > 4.3 && u < 7.2) PR.plane(-300 + (u - 4.4) * 780, 420 + Math.sin(u * 2) * 10, .9, { t, num: '1931' });
  SET.drawLayer(sg, BGW.far, c, .45);
  useCam(c, 1);
  PR.towerWide({ steel: st, clad, mast, lit: 0, t });
  const tw = PR.TW;
  if (mast < 1) { PR.miniDerrick(tw.cx - 70, top, -2.4 + Math.sin(t * 3) * .6, 1); PR.miniDerrick(tw.cx + 60, top, -.7 + Math.sin(t * 2.6 + 1) * .6, 1); }
  // the floor counter: a tag on a pole at the top of the steel (digits only)
  if (u < 4.6) {
    const n = String(Math.floor(Math.min(86, st))), p = POPS4.reduce((a, q) => a + dsp(uq, q, 20, 7), 0);
    PR.at(tw.cx - 70, top + 4, 1, () => { T.stroke([[0, 0], [0, 26]], T.S.lw * .5); T.shape(T.rr(-50, 24, 100, 58, 8), { fill: P.white, lw: T.S.lw * .7 }); PR.numeral(n, 0, 53, 36, { w: .15 }); }, { rot: Math.sin(t * 2) * .05 + p * .08, sy: 1 + p * .05 });
  }
  // the pigeon on the very top: lands → a week grows under it → hops → lands …
  const pigX = tw.cx + 40;
  let pg = null;
  if (u < 9.4) {
    const hopT = POPS4.reduce((a, q) => a + bump(uq, q, .3), 0);
    const yTop = mast > 0 ? PR.floorY(86) - 250 * mast - 2 : top - 2;
    pg = [pigX + (mast > 0 ? -40 : 0), yTop - 30 * Math.min(1, hopT), { dir: -1, k: .5, fly: Math.min(1, hopT * 2), flap: Math.sin(t * 26), wide: u < 4.2 || (u > 6.8 && u < 7.5), puff: bump(u, 6.8, .6) }];
  }
  SET.drawLayer(sg, BGW.near, c, 1.15);
  useCam(c, 1.15);
  for (const b of SET.NEAR) if (b.chim) PR.smoke(b.x + 22 + b.cx * (b.w - 40), b.top - 40, 1, u < 4.2 ? u * 4 : t, b.x);
  useCam(c, 1);
  // Atom's roof (right foreground) with a water tank and the knife switch on a post
  const fgIn = u < 3.9 ? 0 : ss(seg(u, 3.9, 4.9));
  if (fgIn > 0) { fgOff(c, 0, 900 * (1 - fgIn)); roofFG(u, t); useCam(c, 1); }
  if (pg) pigeon(pg[0], pg[1], u < 4 ? .5 : .38, pg[2]);
  // night falls
  darken(night);
  if (night > 0) { useCam(c, .05); for (let i = 0; i < 40; i++) { const x = hash(i * 1.7) * 1200 - 60, y = hash(i * 2.9) * 900; T.shape(T.ell(x, y, 2.2, 2.2, 6), { fill: P.white, stroke: false, boil: 0, alpha: (night / .66) * (.5 + .5 * Math.sin(t * 3 + i)) }); } useCam(c, 1); }
  if (cityLit > 0) { SET.drawLayer(sg, BGW.farLit, c, .45, cityLit * .8); SET.drawLayer(sg, BGW.nearLit, c, 1.15, cityLit * .9); }
  useCam(c, 1);
  if (lit > 0) {
    lightsPass(lit, t);
    PR.beams(tw.cx, PR.floorY(86) - 120, t, seg(u, 7.2, 7.8));
    flash(.35 * bump(u, 6.78, .25));
  }
  if (pg && night > .1) pigeon(pg[0], pg[1], u < 4 ? .5 : .38, pg[2]);
  // Atom (lit by the bulb on the switch post) — throws the switch, asks the question
  if (fgIn > 0) { fgOff(c, 0, 900 * (1 - fgIn)); shot4Atom(u, uq, t, night); useCam(c, 1); }
}
function fgOff(c, dx, dy) { useCam(c, 1); T.BASE[4] += dx * c.z; T.BASE[5] += dy * c.z; T.reset(); }
// lit windows of the tower, rising in a wave from the street to the mast (drawn after the darkness)
function lightsPass(lit, t) {
  const g = sg, b = T.BASE, { cx, fh } = PR.TW;
  g.save(); g.setTransform(b[0], b[1], b[2], b[3], b[4], b[5]);
  const hwOf = f => f < 6 ? 228 : f < 21 ? 172 : f < 25 ? 164 : f < 30 ? 158 : f < 72 ? 150 : f < 81 ? 120 : f < 85 ? 94 : 80;
  for (let f = 0; f < 86; f++) {
    if (f / 86 > lit * 1.08) break;
    const hw = hwOf(f), y = PR.floorY(f + 1);
    for (let x = cx - hw + 7; x < cx + hw - 6; x += 12) { const id = f * 131 + Math.round(x); if (hash(id * .37) < .8) { g.fillStyle = 'rgba(255,250,230,.92)'; g.fillRect(x, y + 4, 5, fh - 7); } }
  }
  g.restore();
  if (lit > .95) { const y86 = PR.floorY(86); PR.glow(cx, y86 - 120, 160, .55); T.shape(T.ell(cx, y86 - 290, 7, 7, 10), { fill: P.white, lw: T.S.lw * .4 }); PR.glow(cx, y86 - 290, 50, .6 + .4 * Math.sin(t * 7)); }
}
const ROOF = { y: 1330, x0: 600, x1: 1300, sw: [1000, 1150] };
function roofFG(u, t) {
  // parapet + roof slab + a water tank on stilts behind Atom (left edge) + the switch post
  T.shape(T.rect(ROOF.x0, ROOF.y, ROOF.x1 - ROOF.x0, 700), { fill: P.dmid, lw: T.S.lw * .8, shade: () => { for (let y = ROOF.y + 40; y < ROOF.y + 700; y += 46) T.stroke([[ROOF.x0, y], [ROOF.x1, y]], T.S.lw * .3, { line: P.dark, boil: .2 }); } });
  T.shape(T.rect(ROOF.x0 - 10, ROOF.y - 6, ROOF.x1 - ROOF.x0 + 20, 22), { fill: P.mid, lw: T.S.lw * .7 });
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
  const o = { x: 860, y: ROOF.y, k: .85, t };
  o.lift = 110 * stretch;
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
  const ptCam = { x: R * 1.0, y: NY + R * 1.15, rot: -1.9, bend: -34, hand: 'fist', gk: 2.3 };
  const thumbBack = { x: -R * 1.5, y: NY - R * 1.1, rot: -2.4, bend: 24, hand: 'point' };
  if (!pull) {
    o.armR = kf(u, [[4.6, RR], [5.0, HIPR], [5.8, HIPR], [7.3, RR], [7.9, SHR, 'back'], [8.3, SHR], [8.55, ptCam, 'back'], [9.4, ptCam], [9.7, RR], [10.3, RR], [10.5, UPR, 'back'], [10.9, UPR], [11.3, SHR, 'back'], [12.2, SHR]]);
    o.armL = kf(u, [[4.6, RL], [5.0, HIPL], [5.8, HIPL], [7.3, RL], [7.9, SHL, 'back'], [8.3, SHL], [8.6, HIPL], [9.4, HIPL], [9.6, thumbBack, 'back'], [10.2, thumbBack], [10.5, UPL, 'back'], [10.9, UPL], [11.3, SHL, 'back'], [12.2, SHL]]);
    if (u > 8.55 && u < 9.4) o.armR = { ...o.armR, gk: lerp(1.22, 2.3, ss(seg(u, 8.4, 8.6))) };
  }
  const pointing = u > 8.6 && u < 9.4;
  const lookUp = u > 4.0 && u < 6.0 ? [-.8, -1] : u > 6.0 && u < 7.4 ? [.6, -.3] : u > 9.6 && u < 10.2 ? [-.8, -.6] : u > LAND - .3 && u < 11.0 ? [0, -1] : [0, 0];
  o.eyes = { lx: lookUp[0], ly: lookUp[1], type: (u > SW && u < 7.3) || (u > LAND && u < 10.9) ? 'wide' : undefined };
  o.eyeR = u > 11.6 ? { type: 'happy' } : null;
  o.brows = (u > 7.7 && u < 9.5) || u > LAND ? 'up' : null;
  o.mouth = u > SW && u < 7.3 ? { type: 'o', w: R * .4 } : u > 11.8 ? { type: 'grin', w: R * .46, open: .55 } : null;
  o.lean = -.05 * bump(u, 6.4, .5);
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
