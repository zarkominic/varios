// main.js — «ASK Atom» short: what enters the US public domain on 1 January 2027 (1930s rubber-hose, 9:16, 24 fps, 52.984 s)
// Five shots cut on the voice timeline (linea.json). Characters and props on twos (12 fps), camera on ones.
// Tempo 120 BPM (a beat = 12 frames): every idle thing breathes on the beat, in phase with the band.
import * as T from '/styles/rubber-hose/demo/toon.js';
import { P } from '/styles/rubber-hose/demo/chars.js';
import { clamp, lerp, seg, ss, eo, ei, back, TAU, hash } from '/core/lib.js';
import { makeFilm, post } from './vfilm.js';
import { paintStage, drawStage, RISER, GROUND } from './stage.js';
import { atom, A, NY } from './atom.js';
import { ENV } from './env.js';
import * as PR from './props.js';

const DUR = 52.984, BEAT = .5, R = A.R;
const CUT = [0, 5.474, 17.659, 32.34, 43.541, DUR];
const TOP = 1196;                                  // where props stand on the riser
const X = { castle: 250, stand: 540, table: 830 }, PK = .95;
const THUMB = new URLSearchParams(location.search).has('thumb');

const cv = document.getElementById('c');
const F = makeFilm(cv); T.init(F.scene);
const BG = paintStage(); T.init(F.scene);
const sg = F.sg;

// —— timing helpers ——
const q2 = t => Math.floor(t * 12 + 1e-6) / 12;                                     // on twos
const bump = (u, c, d = .35) => Math.sin(Math.PI * seg(u, c, c + d));                 // 0→1→0
const dsp = (u, c, f = 14, d = 5) => u < c ? 0 : Math.exp(-(u - c) * d) * Math.sin((u - c) * f);   // damped wiggle
const spring = (u, c, k = 16, z = .32) => u < c ? 0 : 1 - Math.exp(-z * k * (u - c)) * Math.cos(k * (u - c));
const EASE = { ss, lin: x => clamp(x), back: x => back(x, 2.0), eo, ei };
// keys: [[u, value(number | array | object), ease?], ...]; the ease of key i shapes the move from key i-1 to key i
function kf(u, keys) {
  if (u <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (u <= keys[i][0]) {
      const [u0, a] = keys[i - 1], [u1, b, e] = keys[i], k = (EASE[e || 'ss'])((u - u0) / (u1 - u0 || 1));
      return mixv(a, b, k);
    }
  }
  return keys[keys.length - 1][1];
}
function mixv(a, b, k) {
  if (typeof a === 'number') return lerp(a, b, k);
  if (Array.isArray(a)) return a.map((v, i) => lerp(v, b[i], k));
  const o = {}; for (const key in a) o[key] = typeof a[key] === 'number' ? lerp(a[key], b[key] ?? a[key], k) : (k < .5 ? a[key] : (b[key] ?? a[key]));
  for (const key in b) if (!(key in o)) o[key] = b[key];
  return o;
}
const cam3 = v => ({ x: v[0], y: v[1], z: v[2] });
const breath = (tq, amp = 1) => { const b = Math.cos(TAU * tq / BEAT); return { sx: 1 - .024 * b * amp, sy: 1 + .04 * b * amp, b }; };

// —— Atom: arm poses in his local coordinates (origin between the feet, y down) ——
const RR = { x: R * 1.2, y: NY + R * 1.02, rot: Math.PI / 2 - .35, bend: -18, hand: 'open' };
const RL = { x: -R * 1.2, y: NY + R * 1.02, rot: Math.PI / 2 + .35, bend: 18, hand: 'open' };
const UPR = { x: R * 1.75, y: NY - R * .7, rot: -.75, bend: 22, hand: 'open' };          // ta-da
const UPL = { x: -R * 1.75, y: NY - R * .7, rot: -Math.PI + .75, bend: -22, hand: 'open' };
const SHR = { x: R * 1.62, y: NY + R * .2, rot: -.35, bend: -26, hand: 'open' };           // shrug / present, palms up
const SHL = { x: -R * 1.62, y: NY + R * .2, rot: -Math.PI + .35, bend: 26, hand: 'open' };
const HIPR = { x: R * 1.08, y: NY + R * .78, rot: Math.PI - .15, bend: 60, hand: 'fist' };
const HIPL = { x: -R * 1.08, y: NY + R * .78, rot: .15, bend: -60, hand: 'fist' };

function blinkLid(tq, off = 0) { const b = (tq + off) % 3.3; return b < 1 / 12 - 1e-6 ? .95 : b < 2 / 12 - 1e-6 ? .45 : 0; }
function talkMouth(tq) {
  const i = Math.round(tq * 24), e = Math.max(ENV[i] || 0, ENV[i + 1] || 0);
  return e > .12 ? { type: 'open', w: R * (.36 + .1 * e), open: .25 + .6 * e } : null;
}
function shadow(x, y, rx, ry, a = .38) {
  const b = T.BASE; sg.save(); sg.setTransform(b[0], b[1], b[2], b[3], b[4], b[5]);
  sg.fillStyle = `rgba(20,18,16,${a})`; sg.filter = 'blur(3px)'; sg.beginPath(); sg.ellipse(x, y, Math.max(1, rx), Math.max(1, ry), 0, 0, TAU); sg.fill(); sg.restore();
}
// o: x, y, k, t (global, for breathing/talk), lean, lift, sx, sy, armL/armR (local) or armsW(toLocal) → {armL, armR}, eyes, eyeR, brows, mouth (when silent), forceMouth, legL/legR, over, amp
function drawAtom(o) {
  const tq = q2(o.t), b = Math.cos(TAU * tq / BEAT), amp = o.amp ?? .05;
  const sy = (1 + b * amp) * (o.sy || 1), sx = (1 - b * amp * .6) * (o.sx || 1), lift = b * 7 * (amp / .05) + (o.lift || 0), k = o.k || 1;
  const toLocal = (wx, wy) => [(wx - o.x) / (k * sx), (wy - o.y) / (k * sy) + lift];
  let armL = o.armL || RL, armR = o.armR || RR;
  if (o.armsW) { const r = o.armsW(toLocal); if (r.armL) armL = r.armL; if (r.armR) armR = r.armR; }
  const m = o.forceMouth || talkMouth(tq) || o.mouth || { type: 'smile', w: R * .4 };
  const eyes = { lid: blinkLid(tq, o.blinkOff || 0), ...(o.eyes || {}) };
  if (!o.noShadow) shadow(o.x, o.y + 4, 150 * k * (1 - Math.max(0, lift) * .005), 20 * k);
  atom({ x: o.x, y: o.y, k, sx, sy, lean: o.lean || 0, lift, armL, armR, legL: o.legL, legR: o.legR, eyes, eyeR: o.eyeR, brows: o.brows, mouth: m, eph: tq * .85, over: o.over });
  return { toLocal, sx, sy, lift };
}
// world position of a point given in Atom's local coordinates (no lean)
const atomWorld = (o, st, lx, ly) => [o.x + lx * o.k * st.sx, o.y + (ly - st.lift) * o.k * st.sy];

// —— props with breathing ——
function riserProps(tq, u, o = {}) {
  const br = breath(tq), hop = o.hop || {};
  const hs = n => (hop[n] || 0);
  const sq = n => ({ sx: br.sx * (1 + hs(n) * .08), sy: br.sy * (1 - hs(n) * .1) });
  if (o.castle !== false) { shadow(X.castle, TOP + 4, 150, 14, .3); PR.castleHill(X.castle, TOP - (o.lift?.castle || 0), PK, { ...sq('castle'), t: u, bolt: o.bolt || 0 }); }
  if (o.stand !== false) { shadow(X.stand, TOP + 4, 80, 10, .3); PR.coatStand(X.stand, TOP - (o.lift?.stand || 0), PK, { ...sq('stand'), sway: (o.sway || 0) + Math.sin(u * 1.7) * .03, t: u }); }
  if (o.table !== false) { shadow(X.table, TOP + 4, 110, 12, .3); PR.flowerTable(X.table, TOP - (o.lift?.table || 0), PK, { ...sq('table'), sway: Math.sin(u * 2.1) * .12, bloom: o.bloom ?? 1, hat: o.hat }); }
}
const PEG = [X.stand + 62 * PK, TOP - 452 * PK];                 // the coat stand's right peg, where the bat hangs
const CAL_XY = [300, 250];

// ———————————————————————— SHOT 1: the calendar (0 – 5.474) ————————————————————————
function shot1(u, uq, t) {
  const c = kf(u, [[0, [540, 960, 1.0]], [5.474, [556, 948, 1.05]]]);
  setCam(c, t);
  // calendar: the «31» page stretches with the yank and rips at 1.42; under it the «1» of 2027 pops
  const peel = ss(seg(uq, 1.0, 1.42)), torn = uq >= 1.42;
  PR.calendar(CAL_XY[0], CAL_XY[1], { top: { num: '31', band: '2026' }, under: { num: '1', band: '2027' }, peel, torn, underPop: dsp(uq, 1.45, 16, 4) * 1.2 });
  // the sheets wobble, each one hops on its word
  const cues = { castle: 1.62, stand: 2.68, table: 3.44 };
  for (const [n, ph] of [['castle', 0], ['stand', 1.7], ['table', 3.1]]) {
    const cu = cues[n], lift = 34 * bump(uq, cu, .36), br = breath(uq);
    const land = uq > cu + .36 ? .14 * Math.exp(-(uq - cu - .36) * 9) * Math.cos((uq - cu - .36) * 22) : -.06 * bump(uq, cu, .36);
    shadow(X[n], TOP + 4, 140 - lift, 13, .3);
    PR.sheet(X[n], TOP, n, { wob: Math.sin(uq * TAU * .8 + ph) * 6 + 34 * dsp(uq, cu + .1, 12, 3.5), lift, sq: land + (br.sy - 1) });
  }
  // the torn page flutters down and lands on the floor
  if (torn) {
    const f = uq - 1.42, d = 1.9, p = clamp(f / d), land = f > d;
    const x = 352 + Math.sin(f * 5) * 70 * (1 - p) - p * 60, y = lerp(560, 1392, Math.pow(p, 1.25));
    const rot = land ? .12 : Math.sin(f * 5 + .5) * .5 * (1 - p * .6), sy = land ? lerp(.6, .26, clamp((f - d) * 8)) : 1 - .35 * Math.abs(Math.sin(f * 5 + .5)) - p * .3;
    if (land) shadow(x, y + 6, 120, 16, .25);
    PR.fallingPage(x, y, rot, sy, '31', '2026');
  }
  // Atom
  const o = { x: 650, y: GROUND, k: 1.22, t };
  const an = ss(seg(uq, .55, .8)) * (1 - seg(uq, .8, .86));
  const yank = bump(uq, 1.2, .4), rip = dsp(uq, 1.42, 18, 5);
  o.sy = 1 - .12 * an + .06 * rip; o.sx = 1 + .08 * an - .04 * rip;
  o.lift = -12 * an + 18 * dsp(uq, 1.5, 10, 4);
  o.lean = .1 * yank - .05 * an + .03 * Math.sin(uq * 3) * seg(uq, 1.8, 2);
  o.armsW = toLocal => {
    // the page's bottom-right corner (follows the peel)
    const cx = CAL_XY[0] - 135 + 270 + peel * 105, cy = CAL_XY[1] + 44 + 380 + peel * 122;
    const [lx, ly] = toLocal(cx - 6, cy - 4);
    const grab = { x: lx, y: ly, rot: -Math.PI / 2 - .5, bend: 26, hand: 'grab' };
    let armL;
    if (uq < .8) armL = kf(uq, [[.3, RL], [.55, RL], [.8, { x: -R * 1.05, y: NY + R * 1.25, rot: 2.3, bend: 34, hand: 'open' }]]);
    else if (uq < 1.0) armL = kf(uq, [[.8, { x: -R * 1.05, y: NY + R * 1.25, rot: 2.3, bend: 34, hand: 'open' }], [1.0, { ...grab, hand: 'open' }, 'back']]);
    else if (uq < 1.42) armL = grab;
    else armL = kf(uq, [[1.42, { ...grab, hand: 'open' }], [1.75, RL, 'back'], [1.9, { x: -R * 1.8, y: NY + R * .45, rot: -Math.PI + .25, bend: 24, hand: 'open' }], [3.6, { x: -R * 1.75, y: NY + R * .35, rot: -Math.PI + .3, bend: 24, hand: 'open' }], [3.95, SHL, 'back']]);
    const armR = kf(uq, [[.55, RR], [.8, { ...RR, y: RR.y + 14 }], [1.25, RR], [1.45, { x: R * 1.7, y: NY - R * .45, rot: -.6, bend: 24, hand: 'open' }, 'back'], [1.9, HIPR], [3.6, HIPR], [3.95, SHR, 'back']]);
    return { armL, armR };
  };
  const look = uq < .55 ? [0, 0] : uq < 1.6 ? [-.75, -.85] : uq < 3.8 ? (uq < 2.6 ? [-.85, .1] : uq < 3.3 ? [-.25, -.2] : [.6, -.05]) : [0, 0];
  o.eyes = { lx: look[0], ly: look[1] };
  o.brows = (uq >= .8 && uq < 1.7) || uq >= 3.9 ? 'up' : null;
  o.mouth = uq >= 1.42 && uq < 1.7 ? { type: 'grin', w: R * .44, open: .55 } : null;
  drawAtom(o);
}

// ———————————————————————— SHOT 2: the rule — hourglass, then the padlock (5.474 – 17.659) ————————————————————————
function shot2(u, uq, t) {
  const c = kf(u, [[0, [540, 960, 1.0]], [2.6, [540, 960, 1.0]], [4.8, [540, 905, 1.16]], [9.6, [540, 905, 1.16]], [10.3, [548, 1170, 1.1]]]);
  setCam(c, t);
  const br = breath(uq);
  // hourglass drops in from the flies on two ropes and lands with a squash
  const dp = seg(uq, .1, .62), yoff = -900 * (1 - dp * dp), land = dsp(uq, .62, 22, 7);
  const hx = 540, hy = TOP + yoff, hk = .82;
  if (uq < 1.2) { const rt = uq < .7 ? 0 : ei(seg(uq, .7, 1.2)) * 900; for (const s of [-1, 1]) PR.at(0, 0, 1, () => T.stroke([[hx + s * 120, hy - 720 * hk - rt], [hx + s * 120, -200]], T.S.lw * .6, { line: P.dark })); }
  shadow(hx, TOP + 4, 150 * (dp > .9 ? 1 : .5), 13, .3 * dp);
  const level = 1 - seg(uq, 3.0, 9.55);
  PR.hourglass(hx, hy, hk, { sx: br.sx * (1 + land * .1), sy: br.sy * (1 - land * .14), level, stream: uq >= 3.0 && uq < 9.75, pTop: bump(uq, 3.0, .4) + .5 * dsp(uq, 3.1, 16, 5), p95: bump(uq, 5.5, .4), pBot: bump(uq, 7.55, .4), tagSwing: Math.sin(uq * 2.4) * .07 + dsp(uq, 5.5, 9, 2.5) * .5 });
  // last grain «plink» glint
  if (uq > 9.55 && uq < 10.0) PR.glint(hx, TOP - 70 * hk - 270 * hk, 20 * bump(uq, 9.55, .45), 1);
  // the chest: padlock springs on «belongs», lid flies open, light pours out
  const cx = 790, cyy = GROUND, ck = .95, lid = back(seg(uq, 10.75, 11.1), 2.2), op = clamp(spring(uq, 10.45, 18, .25), 0, 1.3);
  shadow(cx, cyy + 4, 170, 18, .35);
  PR.chest(cx, cyy, ck, { sx: br.sx * (1 + dsp(uq, 10.45, 20, 6) * .06), sy: br.sy * (1 - dsp(uq, 10.45, 20, 6) * .08), lid, lock: { open: op, fall: seg(uq, 10.62, 11.0) }, inside: () => { PR.rays(0, -150, 700, uq, seg(uq, 10.8, 11.2)); for (let i = 0; i < 4; i++) { const a = seg(uq, 11.0 + i * .12, 11.4 + i * .12); if (a > 0 && a < 1) PR.glint(-90 + i * 60, -200 - a * 120 - i * 10, 16 * Math.sin(a * Math.PI)); } } });
  // Atom
  const o = { x: 315, y: GROUND, k: 1.0, t };
  const an = ss(seg(uq, 10.28, 10.45)) * (1 - seg(uq, 10.45, 10.5)), jp = bump(uq, 10.5, .55), ld = dsp(uq, 11.05, 18, 6);
  o.sy = 1 - .14 * an + .08 * jp + .1 * ld; o.sx = 1 + .1 * an - .05 * jp;
  o.lift = -14 * an + 70 * jp + 10 * dsp(uq, .62, 12, 5) - 8 * bump(uq, 5.5, .3);
  const pointUp = { x: R * 1.3, y: NY - R * 1.25, rot: -Math.PI / 2 - .1, bend: 20, hand: 'point' };
  const toHG = { x: R * 1.85, y: NY - R * .55, rot: -.55, bend: -14, hand: 'open' };
  const toBot = { x: R * 1.8, y: NY + R * .05, rot: -.12, bend: -10, hand: 'point' };
  o.armR = kf(uq, [[.15, RR], [.45, pointUp, 'back'], [.95, { ...pointUp, rot: -Math.PI / 2 + .15 }], [1.35, RR], [1.45, RR], [1.8, toHG, 'back'], [4.0, { ...toHG, y: toHG.y + 10 }], [4.35, RR], [7.3, RR], [7.6, toBot, 'back'], [8.6, toBot], [8.9, RR], [10.28, { ...RR, y: RR.y + 16 }], [10.55, UPR, 'back'], [11.35, UPR], [11.7, SHR]]);
  o.armL = kf(uq, [[1.4, RL], [1.7, HIPL], [8.7, HIPL], [9.0, RL], [10.28, { ...RL, y: RL.y + 16 }], [10.55, UPL, 'back'], [11.35, UPL], [11.7, SHL]]);
  const look = uq < 1.45 ? [0, 0] : uq < 9.8 ? (uq < 7.3 ? [.65, -.75] : [.7, -.1]) : uq < 11.2 ? [.8, .2] : [0, 0];
  o.eyes = { lx: look[0], ly: look[1] };
  o.brows = uq < 1 || (uq > 9.3 && uq < 10.4) || uq > 10.45 ? 'up' : null;
  o.mouth = uq > 10.45 ? { type: 'grin', w: R * .46, open: .62 } : uq > 9.3 && uq < 10.4 ? { type: 'o', w: R * .4 } : null;
  drawAtom(o);
}

// ———————————————————————— SHOT 3: the sheets drop — what goes in (17.659 – 32.34) ————————————————————————
const BAT_HEAD = NY - R - 40;           // bat perch on Atom's head (local)
function batOnHead(uq, flapAt = []) {
  let fl = 0; for (const f of flapAt) fl += bump(uq, f, .5) * Math.sin((uq - f) * 40);
  return () => PR.bat(0, BAT_HEAD, 1.05, { flap: fl, fold: 1 - Math.abs(fl) * .8, lid: blinkLid(uq, 1.3), ly: -.2 });
}
function shot3(u, uq, t) {
  const c = kf(u, [[0, [540, 975, 1.0]], [.5, [540, 975, 1.0]], [.9, [300, 990, 1.3]], [2.3, [300, 990, 1.3]], [2.8, [540, 965, 1.3]], [4.1, [540, 965, 1.3]], [4.6, [540, 1070, 1.12]], [6.3, [540, 1070, 1.12]], [6.75, [790, 1000, 1.3]], [10.8, [790, 1000, 1.3]], [11.4, [540, 960, 1.0]]]);
  setCam(c, t);
  const br = breath(uq);
  // calendar: «1/2027» until the pages fly back to «4 / 1931»
  const fl0 = 11.3, fl1 = 12.1, nF = 6, DIGS = ['26', '19', '12', '5', '28', '11', '4'];
  let calO = { under: { num: '1', band: '2027' }, torn: true };
  if (uq >= fl0) {
    const i = Math.min(nF - 1, Math.floor((uq - fl0) / ((fl1 - fl0) / nF))), f = ((uq - fl0) / ((fl1 - fl0) / nF)) % 1;
    if (uq < fl1) calO = { under: { num: DIGS[i + 1], band: '1931' }, flip: f, flipNum: DIGS[i], flipBand: '1931', torn: false };
    else calO = { under: { num: '4', band: '1931' }, torn: false, underPop: dsp(uq, fl1, 16, 4) * 1.2 + bump(uq, 13.0, .4) * .6 };
  }
  PR.calendar(CAL_XY[0], CAL_XY[1], calO);
  // objects, revealed as the sheets drop
  const drops = { castle: [.9, 1.3], stand: [2.9, 3.3], table: [6.55, 6.95] };
  const dropOf = n => ss(seg(uq, drops[n][0], drops[n][1]));
  const bolt = (uq >= 1.55 && uq < 1.72) || (uq >= 1.8 && uq < 1.9) || (uq > 4 && ((uq - 4) % 2.6) < .12) ? 1 : 0;
  const revealHop = n => bump(uq, drops[n][1], .3) * 16;
  // fedora drops from the flies onto the table
  const hatLand = 9.45, hatOn = uq >= hatLand;
  riserProps(uq, uq, {
    castle: dropOf('castle') > 0, stand: dropOf('stand') > 0, table: dropOf('table') > 0, bolt,
    bloom: .3 + .7 * clamp(spring(uq, 7.15, 16, .3), 0, 1.2), hat: hatOn,
    hop: { castle: dsp(uq, 1.3, 20, 6), stand: dsp(uq, 3.3, 20, 6), table: dsp(uq, 6.95, 20, 6) + (hatOn ? dsp(uq, hatLand, 22, 6) : 0) },
    lift: { castle: revealHop('castle'), stand: revealHop('stand'), table: revealHop('table') }, sway: dsp(uq, 3.3, 8, 2) * .15,
  });
  for (const n of ['castle', 'stand', 'table']) {
    const d = dropOf(n), sh = uq < .5 ? Math.sin(uq * 60 + X[n]) * 5 * bump(uq, 0, .5) : 0;
    if (d < 1) PR.sheet(X[n], TOP, n, { drop: d, wob: sh + Math.sin(uq * TAU * .8 + X[n]) * 5 * (1 - d), sq: br.sy - 1 });
    else PR.sheet(X[n], TOP + 6, n, { drop: 1 });
  }
  if (uq > 1.5 && uq < 1.62) { sg.save(); sg.setTransform(1, 0, 0, 1, 0, 0); sg.fillStyle = 'rgba(255,252,240,.2)'; sg.fillRect(0, 0, 1080, 1920); sg.restore(); }
  // flower glints
  for (let i = 0; i < 3; i++) { const a = seg(uq, 7.2 + i * .25, 7.8 + i * .25); if (a > 0 && a < 1) PR.glint(X.table - 30 + [-60, 50, -10][i], TOP - 470 * PK + [-40, -70, -110][i], 18 * Math.sin(a * Math.PI)); }
  // the falling fedora
  if (uq >= 8.95 && !hatOn) {
    const p = seg(uq, 8.95, hatLand), hx = X.table + 56 * PK, hy = TOP - 196 * PK - (1 - p * p) * 900;
    PR.fedora(hx, hy, .62 * PK, (1 - p) * 2.6);
  }
  // the bat: asleep on the peg → eyes pop on «Dracula» → flies to Atom's head → stays there
  const o = { x: 540, y: GROUND + 10, k: 1.0, t };
  const batFly0 = 4.4, batLand = 5.3;
  if (dropOf('stand') > .6 && uq < batFly0) PR.bat(PEG[0], PEG[1] + 36, .8, { hang: true, lid: uq < 3.8 ? .95 : 0, fold: 1, ly: -.3 });
  let batOver = null;
  if (uq >= batFly0 && uq < batLand) {
    const e = ss(seg(uq, batFly0, batLand)), hx = o.x, hy = o.y + BAT_HEAD * o.k;
    const bx = lerp(PEG[0], hx, e) + Math.sin(e * TAU) * 110, by = lerp(PEG[1] + 36, hy, e) - Math.sin(e * Math.PI) * 140;
    PR.bat(bx, by, .8, { flap: Math.sin(uq * TAU * 6), lx: (hx - bx) / 200, ly: .5 });
  } else if (uq >= batLand) batOver = batOnHead(uq, [8.0, 11.0, 13.5]);
  // Atom
  const ld = dsp(uq, batLand, 18, 6);
  o.sy = 1 - .1 * ld; o.sx = 1 + .06 * ld;
  const ptCastle = { x: -R * 1.75, y: NY - R * .9, rot: -2.55, bend: 20, hand: 'point' };
  const thumbBack = { x: R * 1.45, y: NY - R * 1.15, rot: -1.95, bend: -20, hand: 'point' };
  const ptTable = { x: R * 1.8, y: NY - R * .8, rot: -.62, bend: -18, hand: 'point' };
  const ptCal = { x: -R * 1.6, y: NY - R * 1.5, rot: -2.2, bend: 24, hand: 'point' };
  o.armL = kf(uq, [[.1, RL], [.35, SHL, 'back'], [.8, SHL], [1.1, ptCastle, 'back'], [2.3, ptCastle], [2.6, RL], [6.0, RL], [6.2, SHL, 'back'], [6.4, RL], [11.0, RL], [11.3, SHL], [12.0, SHL], [12.25, ptCal, 'back'], [13.6, ptCal], [14.0, RL]]);
  o.armR = kf(uq, [[.1, RR], [.35, SHR, 'back'], [.8, SHR], [1.1, RR], [2.8, RR], [3.1, thumbBack, 'back'], [4.2, thumbBack], [4.5, RR], [6.0, RR], [6.2, SHR, 'back'], [6.5, RR], [6.8, ptTable, 'back'], [8.6, ptTable], [8.9, RR], [11.0, RR], [11.3, SHR], [12.0, SHR], [12.3, RR]]);
  let look = [0, 0];
  if (uq > .9 && uq < 2.4) look = [-.85, -.55];
  else if (uq >= 2.8 && uq < 4.4) look = [.25, -.95];
  else if (uq >= 4.4 && uq < batLand) { const e = seg(uq, 4.4, batLand); look = [lerp(.3, 0, e), -1]; }
  else if (uq >= batLand && uq < 6.0) look = [0, -1];
  else if (uq >= 6.5 && uq < 8.9) look = [.85, -.5];
  else if (uq >= 8.9 && uq < 9.6) look = [.8, -.95];
  else if (uq >= 12.0 && uq < 13.7) look = [-.75, -.9];
  o.eyes = { lx: look[0], ly: look[1], type: uq >= batLand && uq < 5.9 ? 'wide' : undefined };
  o.brows = (uq >= 3.8 && uq < 6.0) || (uq >= 9.0 && uq < 9.8) ? 'up' : null;
  o.mouth = uq >= batLand && uq < 6.0 ? { type: 'o', w: R * .4 } : null;
  o.over = batOver;
  drawAtom(o);
}

// ———————————————————————— SHOT 4: only the 1931 version — stamp, and the chest that stays shut (32.34 – 43.541) ————————————————————————
function shot4(u, uq, t) {
  const c = kf(u, [[0, [540, 990, 1.0]], [.9, [540, 990, 1.0]], [1.3, [540, 1010, 1.06]], [3.9, [540, 1010, 1.06]], [4.5, [600, 1195, 1.08]]]);
  setCam(c, t);
  const br = breath(uq);
  // stamp targets: castle hill, the cape, the vase, the fedora
  const TG = [[X.castle - 10, TOP - 52 * PK, .7, -.12], [X.stand, TOP - 250 * PK, .7, .08], [X.table - 34 * PK, TOP - 232 * PK, .45, -.05], [X.table + 56 * PK, TOP - 196 * PK - 48 * .62 * PK, .4, .1]];
  const HIT = [1.45, 2.0, 2.55, 3.1];
  const free = bump(uq, 3.45, .45);
  const hopOf = i => dsp(uq, HIT[i], 22, 6) + free * .6;
  riserProps(uq, uq, { bolt: (uq > .4 && ((uq - .4) % 2.6) < .12) ? 1 : 0, hat: true, hop: { castle: hopOf(0), stand: hopOf(1), table: hopOf(2) + hopOf(3) * .6 }, lift: { castle: 20 * free, stand: 20 * bump(uq, 3.55, .45), table: 20 * bump(uq, 3.65, .45) } });
  for (const n of ['castle', 'stand', 'table']) PR.sheet(X[n], TOP + 6, n, { drop: 1 });
  TG.forEach(([mx, my, mk, mr], i) => { if (uq >= HIT[i]) { const pp = clamp(spring(uq, HIT[i], 24, .4), 0, 1.3); PR.stampMark(mx, my - (i === 0 ? 20 * free : 0), mk * pp, mr); } });
  // the rubber stamp hops from target to target
  if (uq >= .9 && uq < 3.7) {
    let sx, sy, sq = 0;
    if (uq < HIT[0]) { const p = seg(uq, .9, HIT[0]); sx = lerp(420, TG[0][0], ss(p)); sy = lerp(300, TG[0][1], ei(p)) - Math.sin(p * Math.PI) * 60; }
    else if (uq >= HIT[3]) { const p = seg(uq, HIT[3] + .1, 3.7); sx = lerp(TG[3][0], 980, p); sy = lerp(TG[3][1], 200, eo(p)); sq = dsp(uq, HIT[3], 26, 9) * .8; }
    else {
      let i = 0; while (uq >= HIT[i + 1]) i++;
      const p = seg(uq, HIT[i] + .08, HIT[i + 1]), a = TG[i], b = TG[i + 1];
      sx = lerp(a[0], b[0], ss(p)); sy = lerp(a[1], b[1], p) - Math.sin(Math.pow(p, .8) * Math.PI) * 190; sq = dsp(uq, HIT[i], 26, 9) * .8 - .15 * bump(uq, HIT[i + 1] - .2, .2);
    }
    PR.stamp(sx, sy, .55, { sq, rot: Math.sin(uq * 7) * .06 });
  }
  // the locked chest: chains, three later-year tags; the padlock never gives
  const cx = 830, cyy = GROUND, ck = .9;
  const tugs = [5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0], tugK = tugs.reduce((a, c2) => a + dsp(uq, c2, 20, 7), 0);
  const nope = uq > 8.7 && uq < 9.9 ? Math.sin((uq - 8.7) * 16) * .25 * (1 - seg(uq, 9.4, 9.9)) : 0;
  const lockWorld = [cx, cyy + (-150 + 52 + 20) * ck];
  shadow(cx, cyy + 4, 165, 18, .35);
  PR.chest(cx, cyy, ck, { sx: br.sx, sy: br.sy, chains: true, shake: tugK * -5, lock: { swing: nope + tugK * -.08 }, tags: [{ num: '1935', sw: Math.sin(uq * 2) * .1 + tugK * .3 }, { num: '1936', sw: Math.sin(uq * 2 + 1) * .1 + tugK * .25 }, { num: '1939', sw: Math.sin(uq * 2 + 2) * .1 + tugK * .3 }] });
  // Atom: finger-wag → watches the stamp → grabs the padlock and tugs, sliding back → slips, flies back, sits
  const slip = 8.3, sat = 8.62;
  const ax = uq < 4.6 ? 520 : uq < slip ? lerp(520, 380, ss(seg(uq, 4.9, slip))) : lerp(380, 330, eo(seg(uq, slip, sat)));
  const o = { x: ax, y: GROUND, k: 1.0, t };
  const fly = bump(uq, slip, sat - slip), sitd = uq >= sat ? 1 : 0, ld = dsp(uq, sat, 20, 6);
  o.lean = uq >= 4.8 && uq < slip ? -.22 - tugK * .06 : -.25 * fly;
  o.lift = 40 * fly - 56 * sitd + 10 * ld;
  o.sy = 1 - .14 * ld + (uq >= 4.8 && uq < slip ? -.04 + tugK * .05 : 0) - .08 * bump(uq, 1.45, .2) - .08 * bump(uq, 2.0, .2) - .08 * bump(uq, 2.55, .2);
  o.sx = 1 + .08 * ld + (uq >= 4.8 && uq < slip ? .05 : 0);
  if (sitd) { o.legL = { x: -100, y: -6, bend: -24 }; o.legR = { x: 100, y: -6, bend: 24 }; }
  const wag = { x: R * 1.3, y: NY - R * 1.2, rot: -Math.PI / 2 + .25 * Math.sin(TAU * uq / BEAT * 1), bend: 20, hand: 'point' };
  o.armsW = toLocal => {
    if (uq >= 4.6 && uq < slip) {
      const [gx, gy] = toLocal(lockWorld[0] - 30, lockWorld[1] + 4), [hx, hy] = toLocal(lockWorld[0] + 4, lockWorld[1] + 24);
      const reach = ss(seg(uq, 4.6, 4.85));
      const aR = mixv({ ...RR }, { x: gx, y: gy, rot: -.1, bend: -20 - tugK * 20, hand: 'grab' }, back(reach, 1.8));
      const aL = mixv({ ...RL }, { x: hx, y: hy, rot: .1, bend: 30 + tugK * 20, hand: 'grab', flip: false }, back(seg(uq, 4.7, 4.95), 1.8));
      return { armR: aR, armL: aL };
    }
    if (uq >= slip) {
      const [gx, gy] = toLocal(lockWorld[0] - 30, lockWorld[1] + 4);
      const e = seg(uq, slip, slip + .3);
      return {
        armR: kf(uq, [[slip, { x: gx, y: gy, rot: -.1, bend: -30, hand: 'open' }], [slip + .3, { ...RR, y: RR.y - 30 }, 'back'], [9.4, RR], [9.7, SHR], [11.2, SHR]]),
        armL: kf(uq, [[slip, { x: gx + 30, y: gy + 18, rot: .1, bend: 40, hand: 'open' }], [slip + .32, { ...RL, y: RL.y - 30 }, 'back'], [9.4, RL], [9.7, SHL], [11.2, SHL]]),
      };
    }
    return {
      armR: kf(uq, [[.1, RR], [.3, wag, 'back'], [.95, { ...wag }], [1.2, RR], [3.4, RR], [3.6, UPR, 'back'], [3.95, UPR], [4.3, RR]]),
      armL: kf(uq, [[.15, RL], [.35, HIPL], [3.3, HIPL], [3.6, UPL, 'back'], [3.95, UPL], [4.3, RL]]),
    };
  };
  // eyes follow the stamp, then the lock, then back to camera
  let look = [0, 0];
  if (uq >= 1.0 && uq < 3.5) { const i = Math.min(3, HIT.findIndex(h => uq < h + .2) < 0 ? 3 : HIT.findIndex(h => uq < h + .2)); look = [clamp((TG[i][0] - ax) / 300, -1, 1), clamp((TG[i][1] - (GROUND - 230)) / 300, -1, 1)]; }
  else if (uq >= 4.3 && uq < slip) look = [.9, .25];
  else if (uq >= slip && uq < 9.4) look = [.2 * Math.sin(uq * 20), -.6];
  o.eyes = { lx: look[0], ly: look[1], type: uq >= sat && uq < 9.3 ? 'squeeze' : undefined };
  o.brows = uq < 1 ? 'angry' : uq >= 4.9 && uq < slip ? 'angry' : uq >= 9.4 ? 'sad' : null;
  o.mouth = uq >= 4.9 && uq < slip ? { type: 'flat', w: R * .4 } : uq >= slip && uq < 9.3 ? { type: 'wavy', w: R * .4, open: .5 } : uq >= 9.4 ? { type: 'smile', w: R * .34 } : null;
  // the bat jumps off his head when he flies back, hovers, comes back
  const bF = uq >= slip && uq < 9.5;
  o.over = bF ? null : batOnHead(uq, [6.2, 10.4]);
  const st = drawAtom(o);
  if (bF) { const e = seg(uq, slip, 9.5), [hx, hy] = atomWorld(o, st, 0, BAT_HEAD); PR.bat(hx + Math.sin(e * TAU) * 60, hy - Math.sin(e * Math.PI) * 170, .8, { flap: Math.sin(uq * TAU * 6), ly: .6 }); }
  // dizzy little stars circling (cute)
  if (uq >= sat && uq < 9.6) for (let i = 0; i < 3; i++) { const a = uq * 7 + i * TAU / 3, [hx, hy] = atomWorld(o, st, 0, NY - R * 1.15); PR.glint(hx + Math.cos(a) * 120, hy + Math.sin(a) * 26, 14); }
}

// ———————————————————————— SHOT 5: the director's chair, the fedora, the question, iris out (43.541 – 52.984) ————————————————————————
function shot5(u, uq, t) {
  const c = kf(u, [[0, [540, 1150, 1.1]], [6.7, [540, 1150, 1.12]], [7.2, [540, 1170, 1.3]]]);
  setCam(c, t);
  const ev = bump(uq, 5.3, .4);
  riserProps(uq, uq, { bolt: (uq > 1.0 && ((uq - 1.0) % 2.6) < .12) ? 1 : 0, hat: false, lift: { castle: 18 * ev, stand: 18 * bump(uq, 5.42, .4), table: 18 * bump(uq, 5.54, .4) } });
  for (const n of ['castle', 'stand', 'table']) PR.sheet(X[n], TOP + 6, n, { drop: 1 });
  shot5Bat(uq);
  const o = { x: 540, y: GROUND, k: 1.0, t };
  // the bat goes back to its peg
  const bt0 = .05, bt1 = .8;
  PR.directorChair(o.x, o.y, 1.0, 'back');
  // seated: feet dangle and kick on the beat
  const kick = Math.sin(TAU * uq / BEAT);
  o.legL = { x: -62 - 6 * kick, y: -26 + 8 * kick, bend: -16 }; o.legR = { x: 62 - 6 * kick, y: -26 - 8 * kick, bend: 16 };
  o.noShadow = true; shadow(o.x, o.y + 4, 220, 22, .35);
  // fedora: held in the right hand → put on at 1.25 → worn
  const hatOn = 1.25, tilt = -.14 + .05 * dsp(uq, hatOn, 14, 4);
  const lean = bump(uq, 6.6, .3) * -.05 + (uq >= 6.9 ? .06 * ss(seg(uq, 6.9, 7.15)) : 0);
  o.lean = lean;
  const hold = { x: R * 1.55, y: NY + R * .85, rot: -.3, bend: -20, hand: 'grab' };
  const onHead = { x: R * .35, y: NY - R * 1.05, rot: -1.3, bend: -40, hand: 'grab' };
  const brim = { x: R * .7, y: NY - R * .9, rot: -2.4, bend: -30, hand: 'point' };
  const self = { x: R * .55, y: NY + R * .62, rot: Math.PI - .5, bend: -30, hand: 'point' };
  const atCam = { x: R * 1.0, y: NY + R * 1.15, rot: -1.9, bend: -34, hand: 'fist', gk: 2.3 };
  o.armR = kf(uq, [[.55, hold], [1.05, { ...onHead, y: onHead.y - 40 }], [1.25, onHead], [1.5, RR, 'back'], [1.65, RR], [1.85, brim, 'back'], [2.3, brim], [2.6, RR], [2.95, RR], [3.2, self, 'back'], [4.6, self], [4.9, RR], [5.1, RR], [5.35, UPR, 'back'], [6.25, UPR], [6.6, { ...RR, y: RR.y + 20 }], [7.0, atCam, 'back'], [9.5, atCam]]);
  o.armL = kf(uq, [[2.95, RL], [3.2, HIPL, 'back'], [4.6, HIPL], [4.9, RL], [5.1, RL], [5.35, UPL, 'back'], [6.25, UPL], [6.6, RL], [6.9, HIPL]]);
  if (uq >= 6.9) o.armR = { ...o.armR, gk: lerp(1.22, 2.3, ss(seg(uq, 6.9, 7.1))) };
  const pointing = uq >= 6.95;
  o.over = () => {
    if (uq >= hatOn) { const sq = dsp(uq, hatOn, 22, 7); PR.fedora(0, NY - R * .74, 1.0, tilt, { sx: 1 + sq * .12, sy: 1 - sq * .16 }); }
    if (uq < bt0) PR.bat(0, BAT_HEAD, 1.05, { fold: 1 });
    if (pointing) {   // the index finger pointing straight at the viewer: a foreshortened fingertip over the fist, with «poke» lines
      const a = o.armR, gk = a.gk, cx = a.x + Math.cos(a.rot) * 24 * gk, cy = a.y + Math.sin(a.rot) * 24 * gk, fr = 12 * gk * (1 + .1 * dsp(uq, 7.0, 20, 6));
      T.shape(T.ell(cx + 4, cy - 4, fr, fr, 24), { fill: P.white, lw: T.S.lw });
      T.stroke(T.arc(cx + 4, cy - 4, fr * .55, fr * .45, -2.4, -.7, 8), T.S.lw * .5);
      const pk = bump(uq, 7.0, .5) + .6 * bump(uq, 8.0, .4);
      if (pk > .02) for (let i = 0; i < 4; i++) { const an = -1.9 + (i - 1.5) * .5; T.stroke([[cx + Math.cos(an) * (fr + 20), cy + Math.sin(an) * (fr + 20)], [cx + Math.cos(an) * (fr + 20 + 34 * pk), cy + Math.sin(an) * (fr + 20 + 34 * pk)]], T.S.lw * .7); }
    }
  };
  o.eyes = { lx: uq >= .1 && uq < .8 ? .4 : 0, ly: uq >= .1 && uq < .8 ? -1 : uq >= 1.0 && uq < 1.3 ? -1 : 0, type: uq >= 3.55 && uq < 4.45 ? 'happy' : undefined };
  o.eyeR = uq >= 8.35 && uq < 8.7 ? { type: 'happy' } : null;
  o.brows = (uq >= 1.65 && uq < 2.4) || (uq >= 6.9) ? 'up' : null;
  o.mouth = uq >= 1.3 && uq < 1.6 ? { type: 'grin', w: R * .44, open: .5 } : uq > 8.6 ? { type: 'grin', w: R * .46, open: .55 } : null;
  const st = drawAtom(o);
  if (uq < hatOn) { const [hx, hy] = atomWorld(o, st, o.armR.x + 30, o.armR.y - 14); PR.fedora(hx, hy, 1.0, uq < .55 ? .5 : lerp(.5, tilt, seg(uq, .55, hatOn))); }
  PR.directorChair(o.x, o.y, 1.0, 'front');
  if (uq >= bt0) {
    const e = ss(seg(uq, bt0, bt1)), [hx, hy] = atomWorld(o, st, 0, BAT_HEAD);
    if (uq < bt1) PR.bat(lerp(hx, PEG[0], e) - Math.sin(e * TAU) * 90, lerp(hy, PEG[1] + 36, e) - Math.sin(e * Math.PI) * 120, .8, { flap: Math.sin(uq * TAU * 6), ly: -.5 });
  }
  // iris out on Atom's face
  const fx = o.x, fy = o.y + (NY - 10) * o.k;
  const ir = uq < 8.62 ? 2000 : uq < 8.95 ? lerp(1300, 250, eo(seg(uq, 8.62, 8.95))) : uq < 9.12 ? 250 : lerp(250, 0, ei(seg(uq, 9.12, 9.4)));
  if (ir < 1500) iris(fx, fy, ir);
}
// bat on its peg for shot 5 (drawn with the riser props, before Atom)
function shot5Bat(uq) { if (uq >= .8) PR.bat(PEG[0], PEG[1] + 36, .8, { hang: true, fold: 1, lid: uq > 2 ? .95 : blinkLid(uq), ly: .3 }); }

function iris(wx, wy, r) {
  const b = T.BASE, sx = b[0] * wx + b[4], sy = b[3] * wy + b[5], rr = r * b[0];
  sg.save(); sg.setTransform(1, 0, 0, 1, 0, 0); sg.fillStyle = '#000'; sg.beginPath(); sg.rect(0, 0, 1080, 1920);
  if (rr > .5) sg.arc(sx, sy, rr, 0, TAU, true); sg.fill('evenodd'); sg.restore();
}

// —— camera + background for a frame ——
let curCam = { x: 540, y: 960, z: 1 };
function setCam(c, t) {
  curCam = cam3(c);
  const z = curCam.z; T.BASE.splice(0, 6, z, 0, 0, z, 540 - curCam.x * z, 960 - curCam.y * z);
  const tq = q2(t), b = Math.cos(TAU * tq / BEAT);
  drawStage(sg, BG, curCam, b * .004);
  T.frame(t);
}

// —— thumbnail: Atom big in the fedora beside the open chest, the objects popping out, a big «2027» ——
function thumb() {
  setCam([540, 960, 1.0], 0.25);
  const t = 0.25;
  PR.at(0, 0, 1, () => PR.numeral('2027', 540, 380, 250, { col: P.white, halo: P.ink, w: .17 }));
  const cx = 790, cyy = 1640, ck = 1.4;
  shadow(cx, cyy + 4, 250, 26, .4);
  PR.chest(cx, cyy, ck, { lid: 1, lock: { fall: 1 }, inside: () => {
    PR.rays(0, -150, 820, 1.3, 1);
    PR.coatStand(-80, -150, .62, { t: 1 });
    PR.castleHill(70, -150, .55, { t: 1, bolt: 1 });
    PR.flowerTable(-10, -150, .55, { bloom: 1 });
    for (const [gx, gy, gr] of [[-150, -360, 22], [140, -400, 18], [10, -500, 26]]) PR.glint(gx, gy, gr);
  } });
  PR.bat(cx + 40, 800, 1.2, { flap: .6, ly: .4, lx: -.6 });
  const o = { x: 330, y: 1640, k: 1.4, t };
  o.armR = { x: R * 1.9, y: NY - R * .25, rot: -.35, bend: -20, hand: 'open' };
  o.armL = UPL;
  o.eyes = { lx: .25, ly: -.1, type: 'wide' }; o.brows = 'up';
  o.forceMouth = { type: 'grin', w: R * .5, open: .7 };
  o.over = () => PR.fedora(0, NY - R * .74, 1.0, -.16);
  drawAtom(o);
}

window.DUR = DUR;
window.render = t => {
  t = clamp(t, 0, DUR - 1e-4);
  sg.setTransform(1, 0, 0, 1, 0, 0); sg.fillStyle = '#000'; sg.fillRect(0, 0, 1080, 1920);
  if (THUMB) { thumb(); post(F, 1.0, {}); return; }
  let i = 0; while (t >= CUT[i + 1]) i++;
  const s = CUT[i], u = t - s, uq = Math.max(0, q2(t) - s);
  [shot1, shot2, shot3, shot4, shot5][i](u, uq, t);
  post(F, t, { jump: u < 1 / 24 + 1e-6 && i > 0 ? 5 : 0 });
};
window.READY = true;
