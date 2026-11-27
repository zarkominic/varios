// vfilm.js — the rubber-hose film post (styles/rubber-hose/demo/film.js) re-cut for a full 9:16 frame:
// gate weave, flicker, drifting scratches, dust, hairs, vignette, soft gate corners. Grain is added in ffmpeg.
import { hash, vnoise } from '/core/lib.js';
export const FW = 1080, FH = 1920;
export function makeFilm(main) {
  const g = main.getContext('2d');
  const scene = document.createElement('canvas'); scene.width = FW; scene.height = FH;
  return { g, scene, sg: scene.getContext('2d') };
}
export function post(F, t, o = {}) {
  const g = F.g, f = Math.floor(t * 24 + 1e-6);
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
  g.fillStyle = '#000'; g.fillRect(0, 0, FW, FH);
  const wx = (vnoise(t * 1.3) - .5) * 2.4 + (hash(f * 7.1) > .985 ? (hash(f) - .5) * 5 : 0);
  const wy = (vnoise(t * 1.1 + 40) - .5) * 2.6 + (hash(f * 3.3) > .985 ? (hash(f + 9) - .5) * 6 : 0) + (o.jump || 0);
  g.save();
  g.beginPath(); g.roundRect(-2, -2, FW + 4, FH + 4, 34); g.clip();
  g.filter = 'blur(0.55px) contrast(1.14)';
  // 1 % overscan so the weave never shows an edge
  g.drawImage(F.scene, -FW * .005 + wx, -FH * .005 + wy, FW * 1.01, FH * 1.01);
  g.filter = 'none';
  if (!o.clean) {
    const fl = (hash(f * 1.618) - .5) * .08 + (vnoise(t * 3) - .5) * .04;
    g.fillStyle = fl > 0 ? `rgba(255,252,240,${fl})` : `rgba(0,0,0,${-fl})`; g.fillRect(0, 0, FW, FH);
    const sgm = Math.floor(t * 2.3);
    for (let i = 0; i < 3; i++) {
      if (hash(sgm * 13.7 + i * 3.1) < .45) continue;
      const sx = hash(sgm * 5.3 + i) * FW + Math.sin(t * 7 + i) * 6, light = hash(sgm + i * 9) > .4;
      g.strokeStyle = light ? 'rgba(245,242,230,.5)' : 'rgba(10,10,8,.45)'; g.lineWidth = .8 + hash(sgm * 2 + i) * 1.4;
      g.beginPath(); const y0 = hash(sgm * 3 + i) * FH * .5; g.moveTo(sx, y0); g.lineTo(sx + (hash(f + i) - .5) * 3, y0 + FH * (.4 + hash(sgm + i * 5) * .6)); g.stroke();
    }
    const nd = 3 + Math.floor(hash(f * 2.7) * 6);
    for (let i = 0; i < nd; i++) {
      const dx = hash(f * 11.1 + i * 1.7) * FW, dy = hash(f * 17.3 + i * 2.9) * FH, rr = .8 + hash(f + i * 4.4) * 2.8, dark = hash(f * 1.3 + i) > .35;
      g.fillStyle = dark ? 'rgba(12,11,10,.75)' : 'rgba(250,248,240,.7)';
      g.beginPath(); g.ellipse(dx, dy, rr * (1 + hash(i + f) * 1.5), rr, hash(i * 3 + f) * 3, 0, 7); g.fill();
    }
    if (hash(Math.floor(t * 1.5) * 9.9) > .82) {
      const s0 = Math.floor(t * 1.5), hx = hash(s0 * 2.2) * FW, hy = hash(s0 * 4.4) * FH;
      g.strokeStyle = 'rgba(15,14,12,.6)'; g.lineWidth = 1.3; g.beginPath(); g.moveTo(hx, hy);
      for (let i = 1; i <= 8; i++) g.lineTo(hx + i * 7 + Math.sin(i * 1.3 + s0) * 8, hy + Math.sin(i * .9 + s0 * 2) * 10 + i * 3);
      g.stroke();
    }
  }
  // vignette (elliptical, taller than wide)
  g.save(); g.translate(540, 960); g.scale(1, 1.62);
  const vg = g.createRadialGradient(0, 0, 300, 0, 0, 700);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(.7, 'rgba(0,0,0,.2)'); vg.addColorStop(1, 'rgba(0,0,0,.62)');
  g.fillStyle = vg; g.fillRect(-600, -640, 1200, 1280); g.restore();
  g.strokeStyle = 'rgba(0,0,0,.55)'; g.lineWidth = 16; g.filter = 'blur(7px)'; g.beginPath(); g.roundRect(0, 0, FW, FH, 34); g.stroke(); g.filter = 'none';
  g.restore();
}
