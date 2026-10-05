// Renderiza la animación fotograma a fotograma con Chromium sin interfaz y la
// codifica en MP4 con ffmpeg. El reloj de la página se fija desde aquí
// (?capture), así que el resultado no depende de la velocidad de la máquina.
//
//   node scripts/render.mjs                       → adn-evolucion.mp4 (1920×1080, 30 fps)
//   node scripts/render.mjs --stills 3,14,25      → capturas sueltas en stills/
//   node scripts/render.mjs --from 0 --to 10 --scale 0.5 --out prueba.mp4
import { chromium } from 'playwright-core'
import { spawn } from 'node:child_process'
import { mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith('--')) acc.push([a.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true])
    return acc
  }, [])
)
const fps = Number(args.fps ?? 30)
const scale = Number(args.scale ?? 1)
const W = Math.round(1920 * scale)
const H = Math.round(1080 * scale)
const from = Number(args.from ?? 0)
const to = Number(args.to ?? 60)
const out = resolve(root, args.out ?? 'adn-evolucion.mp4')
const audio = resolve(root, 'scripts/music.wav')
const page_ = pathToFileURL(resolve(root, 'dist/index.html')).href + '?capture'

const executablePath = existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined
const browser = await chromium.launch({
  executablePath,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl'],
})
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })
page.on('console', (m) => m.type() === 'error' && console.error('[page]', m.text()))
page.on('pageerror', (e) => console.error('[pageerror]', e.message))
await page.goto(page_)
await page.waitForFunction(() => window.__adn?.ready, null, { timeout: 60000 })
await page.evaluate(() => document.fonts.ready)
// Un par de fotogramas de calentamiento (compilación de shaders, entorno).
for (const t of [0.5, 20, 31, 40, 0]) await page.evaluate((t) => window.__adn.frame(t), t)

const shot = async (t) => {
  await page.evaluate((t) => window.__adn.frame(t), t)
  // Dos rAF para que el DOM (rótulos de drei/Html) esté pintado.
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
  return page.screenshot({ type: 'jpeg', quality: 92 })
}

if (args.stills) {
  const dir = resolve(root, 'stills')
  mkdirSync(dir, { recursive: true })
  for (const t of String(args.stills).split(',').map(Number)) {
    const buf = await shot(t)
    const { writeFileSync } = await import('node:fs')
    writeFileSync(resolve(dir, `t${String(t).padStart(5, '0')}.jpg`), buf)
    console.log('still', t)
  }
  await browser.close()
  process.exit(0)
}

const withAudio = existsSync(audio) && !args.mute
const ff = spawn(
  'ffmpeg',
  [
    '-loglevel', 'error', '-y',
    '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    ...(withAudio ? ['-ss', String(from), '-t', String(to - from), '-i', audio] : []),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    ...(withAudio ? ['-c:a', 'aac', '-b:a', '160k', '-shortest'] : []),
    out,
  ],
  { stdio: ['pipe', 'inherit', 'inherit'] }
)
const total = Math.round((to - from) * fps)
const started = Date.now()
for (let f = 0; f < total; f++) {
  const t = from + f / fps
  const buf = await shot(t)
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
  if (f % 30 === 0) {
    const el = (Date.now() - started) / 1000
    console.log(`frame ${f}/${total}  t=${t.toFixed(2)}s  ${(el / (f + 1)).toFixed(2)} s/fotograma`)
  }
}
ff.stdin.end()
await new Promise((r) => ff.on('close', r))
await browser.close()
console.log('listo:', out)
