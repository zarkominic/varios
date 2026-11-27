// gang.js — the riveting gang (four invented 1930s rubber-hose ironworkers) and the pigeon, in the short's drawing language:
// pie eyes, noodle limbs, white four-finger gloves, round work boots, flat greys + ink, hard form-shadow band.
// Four distinct silhouettes so they read at a glance (all human, no animal ears, no famous look-alikes):
//   heater  "Coal"   — short and round, flat cap worn sideways, bulb nose, soot on the cheeks, neckerchief; works the forge
//   catcher "Stretch"— a string bean with a long neck, knit watch cap with a pompom, long nose, freckles, striped jersey
//   bucker  "Brick"  — a box of a man, no neck, striped railroad cap, a thin curled handlebar moustache, stubble,
//                        an undershirt and a heavy leather bucker's apron tied at the waist
//   riveter "Buzz"   — pear-shaped, wiry hair sticking out, goggles pushed up on the forehead, a gap-toothed grin
// Character-local coordinates: origin = the ground between the feet, y down.
import * as T from '/styles/rubber-hose/demo/toon.js';
import { P, pieEye, mouth, glove, hose, brow, shoe } from '/styles/rubber-hose/demo/chars.js';
import { clamp, lerp, TAU } from '/core/lib.js';
const { shape, stroke, ell, arc, rr, rect, spline, quad, push, pop, translate, rotate, scale, S } = T;

export const KIND = {
  heater: { hip: 28, hipY: -76, foot: 40, sh: [62, -176], head: [0, -240], eye: [17, -252, 11, 15], mouthY: -214, mw: 34, top: -300 },
  catcher: { hip: 16, hipY: -126, foot: 30, sh: [26, -266], head: [0, -346], eye: [14, -356, 10, 14], mouthY: -318, mw: 28, top: -410 },
  bucker: { hip: 36, hipY: -76, foot: 50, sh: [72, -190], head: [0, -241], eye: [15, -258, 9, 12], mouthY: -219, mw: 30, top: -302 },
  riveter: { hip: 22, hipY: -96, foot: 36, sh: [36, -226], head: [0, -282], eye: [16, -288, 10, 13], mouthY: -258, mw: 34, top: -330 },
};
// default arms hanging at the sides (local)
export function restArm(kind, s) { const K = KIND[kind]; return { x: s * (K.sh[0] + 34), y: K.sh[1] + 82, rot: Math.PI / 2 - s * .45, bend: -s * 18, hand: 'open' }; }

function body(kind) {
  if (kind === 'heater') {
    shape(ell(0, -140, 74, 72, 40), { fill: P.pale, lw: S.lw, shade: () => {
      shape(rect(-80, -128, 160, 80), { fill: P.dark, stroke: false, boil: 0 });                 // overalls
      shape(rr(-34, -168, 68, 50, 6), { fill: P.dark, stroke: false, boil: 0 });                 // bib
      for (const s of [-1, 1]) { stroke([[s * 28, -166], [s * 44, -206]], S.lw * .9, { line: P.dark }); shape(ell(s * 24, -160, 5, 5, 8), { fill: P.light, stroke: false, boil: 0 }); }
      shape(rect(-12, -150, 24, 20), { fill: P.dmid, lw: S.lw * .4 });                           // bib pocket
      shape(ell(40, -120, 70, 90, 20), { fill: P.ink, stroke: false, boil: 0, alpha: .25 });       // form shadow
    } });
    // neckerchief knot
    shape([[-24, -200], [24, -200], [0, -180]], { fill: P.white, lw: S.lw * .6 });
    for (const [dx, dy] of [[-8, -196], [8, -195], [0, -188]]) shape(ell(dx, dy, 2.4, 2.4, 6), { fill: P.dark, stroke: false, boil: 0 });
  } else if (kind === 'catcher') {
    const pts = spline([[-30, -128], [-38, -200], [-30, -268], [0, -286], [30, -268], [38, -200], [30, -128], [0, -118]], true, 6);
    shape(pts, { fill: P.pale, lw: S.lw, shade: () => {
      for (let y = -276; y < -150; y += 22) shape(rect(-50, y, 100, 10), { fill: P.mid, stroke: false, boil: 0 });   // striped jersey
      shape(rect(-50, -150, 100, 40), { fill: P.dark, stroke: false, boil: 0 });                                     // belt line + trousers
      shape(rect(-6, -148, 12, 12), { fill: P.light, lw: S.lw * .3 });
      shape(ell(26, -190, 30, 110, 16), { fill: P.ink, stroke: false, boil: 0, alpha: .22 });
    } });
    shape(rect(-9, -306, 18, 26), { fill: P.white, lw: S.lw * .7 });       // the long neck
  } else if (kind === 'bucker') {
    shape(rr(-78, -206, 156, 134, 34), { fill: P.white, lw: S.lw, shade: () => {
      shape(rect(-90, -112, 180, 50), { fill: P.dark, stroke: false, boil: 0 });                  // trousers under the apron
      stroke(arc(0, -206, 30, 16, Math.PI * .1, Math.PI * .9, 10), S.lw * .5, { line: P.mid });  // the undershirt's neckline
      shape(rect(40, -210, 60, 150), { fill: P.ink, stroke: false, boil: 0, alpha: .22 });
    } });
    // the leather apron: from the waist tie down past the knees, scuffed, a stitched hem, the tie ends at the side
    shape(spline([[-62, -142], [62, -142], [70, -40], [40, -30], [0, -34], [-40, -30], [-70, -40]], true, 6), { fill: P.dmid, lw: S.lw * .9, shade: () => {
      shape(rect(26, -150, 60, 130), { fill: P.dark, stroke: false, boil: 0, alpha: .5 });
      for (const [x, y] of [[-30, -110], [12, -88], [-12, -64]]) stroke([[x, y], [x + 14, y + 4]], S.lw * .3, { line: P.mid, boil: .4 });
    } });
    for (let x = -56; x <= 56; x += 14) stroke([[x, -46 + Math.abs(x) * .1], [x + 7, -46 + Math.abs(x + 7) * .1]], S.lw * .3, { line: P.light, boil: .2 });
    shape(rr(-66, -150, 132, 12, 5), { fill: P.dark, lw: S.lw * .6 });
    stroke(spline([[-64, -144], [-82, -130], [-78, -108]], false, 5), S.lw * .55, { line: P.dark });
    stroke(spline([[-64, -144], [-90, -138], [-94, -118]], false, 5), S.lw * .55, { line: P.dark });
  } else {
    const pts = spline([[-28, -236], [28, -236], [52, -172], [62, -122], [40, -94], [0, -90], [-40, -94], [-62, -122], [-52, -172]], true, 6);
    shape(pts, { fill: P.mid, lw: S.lw, shade: () => {
      shape(rect(-70, -140, 140, 60), { fill: P.dmid, stroke: false, boil: 0 });                 // work jacket hem
      for (const s of [-1, 1]) shape(rr(s * 32 - 14, -170, 28, 22, 4), { fill: P.light, lw: S.lw * .4 });   // pockets
      stroke([[0, -232], [0, -100]], S.lw * .45, { line: P.dark });
      for (const y of [-210, -180, -150]) shape(ell(-6, y, 3.5, 3.5, 6), { fill: P.white, stroke: false, boil: 0 });
      shape(ell(40, -150, 36, 100, 16), { fill: P.ink, stroke: false, boil: 0, alpha: .25 });
      shape([[-22, -236], [22, -236], [0, -212]], { fill: P.white, lw: S.lw * .4 });            // collar
    } });
  }
}
function headOf(kind, p) {
  const K = KIND[kind], [hx, hy] = K.head;
  // hat (behind parts first)
  const hat = p.hat || {}, hl = hat.lift || 0, hr = hat.rot || 0;
  const face = () => {
    if (kind === 'heater') shape(ell(hx, hy, 50, 46, 36), { fill: P.white, lw: S.lw, shade: () => shape(ell(hx + 26, hy + 10, 40, 48, 20), { fill: P.pale, stroke: false, boil: 0 }) });
    else if (kind === 'catcher') shape(ell(hx, hy, 38, 48, 34), { fill: P.white, lw: S.lw, shade: () => shape(ell(hx + 22, hy + 10, 30, 50, 20), { fill: P.pale, stroke: false, boil: 0 }) });
    else if (kind === 'bucker') shape(rr(hx - 38, hy - 35, 76, 70, 24), { fill: P.white, lw: S.lw, shade: () => shape(rect(hx + 16, hy - 40, 40, 80), { fill: P.pale, stroke: false, boil: 0 }) });
    else shape(ell(hx, hy, 44, 44, 34), { fill: P.white, lw: S.lw, shade: () => shape(ell(hx + 24, hy + 8, 34, 46, 20), { fill: P.pale, stroke: false, boil: 0 }) });
  };
  if (kind === 'riveter') {   // a wiry mop sticking out behind the head
    const mop = []; for (let i = 0; i <= 14; i++) { const a = Math.PI * (1.02 + i / 14 * .96), r = i % 2 ? 50 : 62 + (i % 4 === 0 ? 8 : 0); mop.push([hx + Math.cos(a) * r, hy - 8 + Math.sin(a) * r * .95]); }
    mop.push([hx + 40, hy + 4], [hx - 40, hy + 4]);
    shape(mop, { fill: P.ink, lw: S.lw * .7 });
  }
  face();
  const E = { lid: 0, ...(p.eyes || {}) }, [ex, ey, erx, ery] = K.eye;
  pieEye(hx - ex, ey, erx, ery, { ...E, lidCol: P.white, side: 1 });
  pieEye(hx + ex, ey, erx, ery, { ...E, ...(p.eyeR || {}), lidCol: P.white, side: -1 });
  if (p.brows) { brow(hx - ex, ey - ery - 8, erx * 1.5, p.brows, -1); brow(hx + ex, ey - ery - 8, erx * 1.5, p.brows, 1); }
  // nose + per-character face details
  if (kind === 'heater') {
    for (const s of [-1, 1]) shape(ell(hx + s * 32, hy + 12, 9, 5, 10), { fill: P.light, stroke: false, boil: .3 });
    shape(ell(hx - 30, hy + 2, 7, 4, 8), { fill: P.mid, stroke: false, boil: .5 });             // soot
    shape(ell(hx, hy + 8, 16, 13, 18), { fill: P.pale, lw: S.lw * .8, shade: () => shape(ell(hx - 5, hy + 3, 5, 4, 8), { fill: P.white, stroke: false, boil: 0 }) });
  } else if (kind === 'catcher') {
    for (const [dx, dy] of [[-20, 6], [-26, 12], [-16, 14], [20, 6], [26, 12], [16, 14]]) shape(ell(hx + dx, hy + dy, 2, 2, 6), { fill: P.mid, stroke: false, boil: 0 });
    shape(spline([[hx - 6, hy - 6], [hx + 6, hy - 6], [hx + 10, hy + 18], [hx, hy + 24], [hx - 10, hy + 18]], true, 5), { fill: P.pale, lw: S.lw * .7 });
  } else if (kind === 'bucker') {
    shape(ell(hx, hy - 4, 13, 10, 14), { fill: P.pale, lw: S.lw * .7 });
  } else {
    shape(ell(hx, hy + 4, 8, 7, 10), { fill: P.pale, lw: S.lw * .6 });
  }
  const M = p.mouth || { type: 'smile' };
  mouth(hx, K.mouthY, M.w || K.mw, M.type, M);
  if (kind === 'riveter' && (M.type === 'grin' || M.type === 'smile' || !M.type)) shape(rect(hx - 3, K.mouthY - 2, 6, 8), { fill: P.ink, stroke: false, boil: 0, alpha: M.type === 'grin' ? 1 : 0 });
  if (kind === 'bucker') {   // a thin handlebar moustache, the tips curled up, and stubble on the jaw
    for (const sx of [-1, 1]) stroke(spline([[hx, hy + 9], [hx + sx * 14, hy + 8], [hx + sx * 26, hy + 6], [hx + sx * 31, hy - 2], [hx + sx * 26, hy - 6]], false, 6), S.lw * 1.25, { line: P.ink });
    for (let i = 0; i < 14; i++) { const a = Math.PI * (.12 + .76 * i / 13), r = 30 + (i % 2) * 4; shape(ell(hx + Math.cos(a) * r, hy + 6 + Math.sin(a) * r * .75, 1.6, 1.6, 5), { fill: P.mid, stroke: false, boil: .2 }); }
  }
  // hats
  push(); translate(hx, hy - 30 - hl); rotate(hr); translate(-hx, -(hy - 30));
  if (kind === 'heater') {
    shape(spline([[hx - 54, hy - 22], [hx - 46, hy - 52], [hx - 8, hy - 66], [hx + 38, hy - 58], [hx + 56, hy - 30], [hx + 40, hy - 20]], true, 6), { fill: P.dmid, lw: S.lw * .9, shade: () => shape(rect(hx + 10, hy - 70, 60, 50), { fill: P.dark, stroke: false, boil: 0, alpha: .5 }) });
    shape(ell(hx - 4, hy - 62, 7, 4, 8), { fill: P.dark, lw: S.lw * .4 });
    shape(spline([[hx + 20, hy - 26], [hx + 74, hy - 30], [hx + 84, hy - 20], [hx + 30, hy - 14]], true, 5), { fill: P.dark, lw: S.lw * .8 });   // brim, worn sideways
  } else if (kind === 'catcher') {
    shape(spline([[hx - 38, hy - 22], [hx - 34, hy - 52], [hx, hy - 66], [hx + 34, hy - 52], [hx + 38, hy - 22]], true, 6), { fill: P.dmid, lw: S.lw * .9 });
    for (let x = -28; x <= 28; x += 9) stroke([[hx + x, hy - 30], [hx + x * .85, hy - 56]], S.lw * .3, { line: P.dark });
    shape(rr(hx - 41, hy - 36, 82, 18, 8), { fill: P.mid, lw: S.lw * .8 });
    shape(ell(hx, hy - 72, 13, 12, 14), { fill: P.light, lw: S.lw * .7 });
  } else if (kind === 'bucker') {
    shape(rr(hx - 42, hy - 66, 84, 34, 12), { fill: P.light, lw: S.lw * .9, shade: () => { for (let x = -36; x < 40; x += 12) shape(rect(hx + x, hy - 70, 5, 40), { fill: P.dmid, stroke: false, boil: 0 }); } });
    shape(spline([[hx - 44, hy - 34], [hx + 44, hy - 34], [hx + 50, hy - 26], [hx, hy - 22], [hx - 50, hy - 26]], true, 5), { fill: P.dark, lw: S.lw * .8 });
  } else {
    stroke(arc(hx, hy - 6, 44, 34, Math.PI * 1.02, Math.PI * 1.98, 14), S.lw * 1.2, { line: P.dark });   // goggle strap
    for (const s of [-1, 1]) { shape(ell(hx + s * 17, hy - 32, 14, 12, 16), { fill: P.light, lw: S.lw * .9, shade: () => shape(ell(hx + s * 17 - 4, hy - 36, 5, 4, 8), { fill: P.white, stroke: false, boil: 0 }) }); }
    stroke([[hx - 4, hy - 32], [hx + 4, hy - 32]], S.lw * .8);
  }
  pop();
}
// p: { x, y, k, sx, sy, lean, lift, armL/armR {x,y,rot,bend,hand,gk,flip}, legL/legR {x,y,bend}, eyes, eyeR, brows, mouth, hat {lift, rot},
//      itemL/itemR (x, y, rot) drawn in the hand before the glove, behind (fn, local, drawn first) }
export function worker(kind, p) {
  const K = KIND[kind], lift = p.lift || 0;
  push(); translate(p.x, p.y); scale(p.k || 1); scale(p.sx || 1, p.sy || 1); if (p.lean) rotate(p.lean);
  if (p.behind) p.behind();
  push(); translate(0, -lift);
  for (const s of [-1, 1]) { const L = p[s < 0 ? 'legL' : 'legR'] || { x: s * K.foot, y: 0 }; hose([s * K.hip, K.hipY], [L.x, L.y - 8 + lift], L.bend ?? s * 6, 16); }
  for (const s of [-1, 1]) { const L = p[s < 0 ? 'legL' : 'legR'] || { x: s * K.foot, y: 0 }; shoe(L.x - s * 6, L.y + lift, s, 1.25); }
  body(kind);
  const arm = (key, s) => {
    const Aa = p[key] || restArm(kind, s), sh = [s * K.sh[0], K.sh[1]];
    hose(sh, [Aa.x, Aa.y], Aa.bend ?? s * -16, 14);
    const rot = Aa.rot ?? Math.atan2(Aa.y - sh[1], Aa.x - sh[0]);
    const it = p[s < 0 ? 'itemL' : 'itemR']; if (it) it(Aa.x, Aa.y, rot);
    glove(Aa.x, Aa.y, rot, Aa.hand || 'open', Aa.gk ?? .98, { flip: Aa.flip ?? s < 0 });
  };
  // the far arm under the head, the near one over it (both in front of the body)
  arm('armL', -1);
  headOf(kind, p);
  arm('armR', 1);
  if (p.over) p.over();
  pop();
  pop();
}

// —— the pigeon: round, grey, a shiny collar, pie eyes; origin = feet; o.dir ±1 (facing), o.fly 0..1 (wings out, legs tucked),
// o.flap −1..1, o.peck 0..1, o.puff (surprise: feathers puffed), o.lx/ly, o.lid, o.wide
export function pigeon(x, y, k, o = {}) {
  const fly = clamp(o.fly || 0), fl = o.flap || 0, pk = o.peck || 0, pf = o.puff || 0;
  push(); translate(x, y); scale(k * (o.dir || 1) * (1 + pf * .12), k * (1 + pf * .18)); if (o.rot) rotate(o.rot);
  // legs (tucked when flying)
  if (fly < .6) for (const s of [-1, 1]) {
    const lx = s * 8, l = 26 * (1 - fly);
    stroke([[lx, -20], [lx + 2, -20 + l]], S.lw * .6, { line: P.dmid });
    stroke([[lx - 6, -20 + l], [lx + 10, -20 + l]], S.lw * .55, { line: P.dmid });
  }
  // wings in flight: shoulder → tip (up at flap 1, down at flap −1) → scalloped trailing edge
  const wing = (front) => {
    const u = (fl + 1) / 2, sh = [14, -46], tr = [-26, -34], tip = [lerp(-30, -16, u), lerp(16, -116, u)];
    const lead = [lerp(sh[0], tip[0], .5) + 14, lerp(sh[1], tip[1], .5) - 6 * (u - .5)];
    const pts = [sh, lead, tip];
    for (let i = 1; i <= 4; i++) { const v = i / 5, bx = lerp(tip[0], tr[0], v), by = lerp(tip[1], tr[1], v); pts.push([bx - 9, by + (u > .5 ? 4 : -4)], [bx, by]); }
    pts.push(tr, [0, -36]);
    shape(spline(pts, true, 3), { fill: front ? P.mid : P.dmid, lw: S.lw * .7, shade: () => stroke([[sh[0] - 4, sh[1] + 2], [tip[0] + 4, tip[1] + (u > .5 ? 10 : -10)]], S.lw * 1.6, { line: P.light, boil: 0 }) });
  };
  if (fly > .05) { push(); translate(-8, -4); scale(.9, .92); wing(false); pop(); }
  // tail
  shape([[-24, -36], [-62, -44 + pk * 10], [-64, -28 + pk * 10], [-26, -24]], { fill: P.dmid, lw: S.lw * .7, shade: () => shape(rect(-70, -48 + pk * 10, 12, 30), { fill: P.ink, stroke: false, boil: 0, alpha: .7 }) });
  // body
  shape(ell(-2, -36, 32, 22, 26, -.15), { fill: P.light, lw: S.lw * .8, shade: () => { shape(ell(6, -24, 26, 12, 20), { fill: P.pale, stroke: false, boil: 0 }); shape(ell(-18, -46, 18, 9, 14), { fill: P.mid, stroke: false, boil: 0, alpha: .4 }); } });
  if (fly <= .05) { shape(spline([[-24, -42], [4, -48], [16, -38], [-6, -28], [-30, -30]], true, 5), { fill: P.mid, lw: S.lw * .6 }); stroke([[-20, -36], [0, -38]], S.lw * .3, { line: P.dark }); stroke([[-22, -32], [-4, -33]], S.lw * .3, { line: P.dark }); }
  else wing(true);
  // neck + head (pecks forward/down)
  push(); translate(16, -46); rotate(pk * .9 + (o.tilt || 0)); translate(-16, 46);
  shape(spline([[6, -40], [16, -64], [34, -66], [38, -52], [26, -38]], true, 5), { fill: P.mid, lw: S.lw * .7, shade: () => stroke(quad([12, -48], [22, -44], [30, -50]), S.lw * 1.4, { line: P.pale, boil: .2 }) });
  shape(ell(26, -68, 15, 14, 18), { fill: P.mid, lw: S.lw * .7 });
  shape([[38, -70], [52, -64], [38, -61]], { fill: P.dark, lw: S.lw * .5 });
  shape(ell(39, -70, 3.5, 2.5, 8), { fill: P.white, stroke: false, boil: 0 });
  pieEye(28, -72, (o.wide ? 7.5 : 6) , (o.wide ? 9.5 : 8), { lx: (o.lx || 0) * (o.dir || 1), ly: o.ly || 0, lid: o.lid || 0, lidCol: P.mid, lwk: .5, type: o.eye });
  pop();
  if (pf > .1) for (let i = 0; i < 4; i++) { const a = -2.6 + i * .5; stroke([[Math.cos(a) * 40, -36 + Math.sin(a) * 30], [Math.cos(a) * (40 + 18 * pf), -36 + Math.sin(a) * (30 + 14 * pf)]], S.lw * .45); }
  pop();
}
