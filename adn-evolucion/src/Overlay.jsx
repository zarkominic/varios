import { useEffect, useRef } from 'react'
import { clock, span, smooth, ramp, easeOut, CUTS, CHAPTERS, DURATION, BASE_COLORS } from './clock'
import { SPECIES } from './scenes/Evolution'

// Todo el texto en pantalla. No hay estado de React que cambie con el tiempo:
// cada elemento se anima escribiendo estilos en su nodo desde `tick(t)`, que
// el bucle de render llama en el mismo fotograma que la escena 3D.
export const ticks = new Set()
export function useTick(fn) {
  const ref = useRef(fn)
  ref.current = fn
  useEffect(() => {
    const f = (t) => ref.current(t)
    ticks.add(f)
    return () => ticks.delete(f)
  }, [])
}

const CAPTIONS = [
  [7.2, 11.9, 'El ADN es una doble hélice: dos hebras enrolladas, unidas por pares de bases.'],
  [12.2, 17.9, 'Solo hay cuatro bases. La A se une siempre a la T, y la C a la G. Su orden es el código.', 'bases'],
  [18.9, 23.7, 'Estirado, el ADN de una sola célula mediría unos 2 metros. Cabe en un núcleo de unas 6 micras, plegado en 46 cromosomas.'],
  [24.0, 28.9, 'Dos personas cualesquiera comparten alrededor del 99,9 % de la secuencia. Las diferencias son letras sueltas.'],
  [29.9, 35.4, 'Con el chimpancé compartimos cerca del 98,8 %. Cada diferencia es una mutación acumulada desde nuestro antepasado común, hace 6 – 7 millones de años.'],
  [36.2, 39.6, 'Hace unos 7 millones de años aparecen en África los primeros homínidos.'],
  [39.9, 43.0, 'Los australopitecos ya caminaban erguidos, con un cerebro poco mayor que el de un chimpancé.'],
  [43.3, 46.0, 'Homo habilis se asocia a las primeras herramientas de piedra.'],
  [46.3, 49.0, 'Homo erectus sale de África y llega hasta Asia. Su especie dura casi 2 millones de años.'],
  [49.2, 51.5, 'Neandertales y sapiens convivieron durante milenios.'],
  [51.7, 55.0, 'No fue una escalera sino un arbusto con muchas ramas. Hoy solo queda una.'],
  [55.3, 60.4, 'Pero las otras no se borraron del todo: hasta un 2 % del ADN de las personas no africanas procede de los neandertales.'],
]

// Separador de miles siempre (es-ES no agrupa números de cuatro cifras).
const miles = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')

const STATS = [
  { at: 19.3, value: 3100, fmt: (v) => `${miles(v)} M`, label: 'pares de bases en cada copia del genoma' },
  { at: 20.1, value: 20000, fmt: (v) => `≈ ${miles(Math.round(v / 100) * 100)}`, label: 'genes que codifican proteínas' },
  { at: 20.9, value: 46, fmt: (v) => `${Math.round(v)}`, label: 'cromosomas, en 23 pares' },
  { at: 21.7, value: 2, fmt: (v) => `${v.toFixed(1).replace('.', ',')} m`, label: 'de ADN en cada célula' },
]

const fmtTime = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`

export default function Overlay() {
  const r = useRef({})
  const set = (k) => (el) => (r.current[k] = el)

  useTick((t) => {
    const e = r.current
    const op = (el, v) => el && (el.style.opacity = v.toFixed(3))
    const rise = (el, v, px = 14) => {
      if (!el) return
      el.style.opacity = v.toFixed(3)
      el.style.transform = `translateY(${((1 - v) * px).toFixed(2)}px)`
    }

    // Fundidos a negro en cada corte, y al principio y al final.
    let black = 1 - smooth(t, 0, 1.0)
    for (const c of CUTS) black = Math.max(black, 1 - smooth(Math.abs(t - c), 0, 0.42))
    black = Math.max(black, smooth(t, 59.2, 60))
    op(e.black, black)

    // Cabecera
    op(e.top, smooth(t, 1.0, 2.0))
    let ch = 0
    CHAPTERS.forEach((c, i) => t >= c.at && (ch = i))
    if (e.chapter && e.chapter.dataset.i !== String(ch)) {
      e.chapter.dataset.i = String(ch)
      e.chapterN.textContent = CHAPTERS[ch].n
      e.chapterL.textContent = CHAPTERS[ch].label
    }
    CHAPTERS.forEach((c, i) => {
      const el = e[`dot${i}`]
      if (el) el.dataset.on = i <= ch ? '1' : '0'
    })

    // Título
    const title = span(t, 0.9, 6.7, 1.0, 0.8)
    rise(e.title, title, 24)
    if (e.titleWord) e.titleWord.style.letterSpacing = `${(0.06 - 0.06 * easeOut(ramp(t, 0.9, 4.5))).toFixed(4)}em`

    // Subtítulos
    CAPTIONS.forEach(([a, b], i) => rise(e[`cap${i}`], span(t, a, b, 0.45, 0.4), 10))
    rise(e.bases, span(t, 13.2, 17.9, 0.5, 0.4), 10)

    // Cifras del genoma
    const statsOn = span(t, 18.9, 29.0, 0.5, 0.5)
    op(e.stats, statsOn)
    STATS.forEach((s, i) => {
      const k = easeOut(ramp(t, s.at, s.at + 1.6))
      rise(e[`stat${i}`], smooth(t, s.at - 0.2, s.at + 0.4), 12)
      if (e[`statv${i}`]) e[`statv${i}`].textContent = s.fmt(s.value * k)
    })
    const same = smooth(t, 24.0, 24.8)
    rise(e.same, same, 12)
    if (e.samev) e.samev.textContent = `${(99 + 0.9 * easeOut(ramp(t, 24.0, 25.6))).toFixed(1).replace('.', ',')} %`

    // Comparación con el chimpancé
    const cmp = span(t, 29.8, 35.5, 0.5, 0.4)
    op(e.cmp, cmp)
    const kc = easeOut(ramp(t, 30.4, 35.0))
    const compared = Math.pow(kc, 3) * 3.0e9
    if (e.cmpA) e.cmpA.textContent = miles(compared)
    if (e.cmpB) e.cmpB.textContent = miles(compared * 0.0118)
    if (e.cmpP) e.cmpP.textContent = `${(100 - 1.2 * smooth(t, 30.6, 32.0)).toFixed(1).replace('.', ',')} %`

    // Homínidos: cabecera del eje y volumen cerebral
    op(e.evoHead, span(t, 36.2, 54.6, 0.6, 0.6))
    op(e.brain, span(t, 36.6, 59.0, 0.6, 0.6))
    SPECIES.forEach((s, i) => {
      const k = easeOut(ramp(t, s.at, s.at + 1.1))
      const row = e[`brain${i}`]
      if (!row) return
      row.style.opacity = (0.18 + 0.82 * smooth(t, s.at - 0.3, s.at + 0.3)).toFixed(3)
      e[`brainbar${i}`].style.transform = `scaleX(${k.toFixed(4)})`
      e[`brainv${i}`].textContent = miles(s.cc * k)
    })

    // Cierre
    rise(e.end, smooth(t, 56.6, 57.6), 18)

    // Progreso
    if (e.bar) e.bar.style.transform = `scaleX(${(t / DURATION).toFixed(4)})`
    if (e.time) e.time.textContent = `${fmtTime(t)} / ${fmtTime(DURATION)}`
  })

  return (
    <div className="overlay" aria-live="off">
      <header className="top" ref={set('top')}>
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            {['A', 'T', 'C', 'G'].map((b) => (
              <i key={b} style={{ background: BASE_COLORS[b] }} />
            ))}
          </span>
          ADN y evolución humana
        </div>
        <div className="chapter">
          <span className="chapter-dots">
            {CHAPTERS.map((c, i) => (
              <i key={c.n} ref={set(`dot${i}`)} />
            ))}
          </span>
          <span className="chapter-n" ref={set('chapterN')}>01</span>
          <span className="chapter-l" ref={set('chapterL')} />
          <span ref={set('chapter')} hidden />
        </div>
      </header>

      <section className="title" ref={set('title')} style={{ opacity: 0 }}>
        <p className="eyebrow">El genoma humano en un minuto</p>
        <h1>
          <span ref={set('titleWord')}>3.100 millones</span>
          <br />
          de letras
        </h1>
        <p className="title-sub">y los 7 millones de años de evolución que las escribieron</p>
      </section>

      <div className="captions">
        {CAPTIONS.map(([, , text, extra], i) => (
          <p key={i} className="caption" ref={set(`cap${i}`)} style={{ opacity: 0 }}>
            {text}
          </p>
        ))}
        <p className="caption-sub" ref={set('bases')} style={{ opacity: 0 }}>
          <b style={{ color: BASE_COLORS.A }}>A</b>–<b style={{ color: BASE_COLORS.T }}>T</b> · 2 puentes de hidrógeno
          <span className="sep" />
          <b style={{ color: BASE_COLORS.C }}>C</b>–<b style={{ color: BASE_COLORS.G }}>G</b> · 3 puentes de hidrógeno
        </p>
      </div>

      <aside className="stats" ref={set('stats')} style={{ opacity: 0 }}>
        {STATS.map((s, i) => (
          <div className="stat" key={i} ref={set(`stat${i}`)}>
            <span className="stat-v" ref={set(`statv${i}`)}>0</span>
            <span className="stat-l">{s.label}</span>
          </div>
        ))}
        <div className="stat stat--hero" ref={set('same')} style={{ opacity: 0 }}>
          <span className="stat-v" ref={set('samev')}>99,0 %</span>
          <span className="stat-l">idéntico entre dos personas</span>
        </div>
      </aside>

      <aside className="cmp" ref={set('cmp')} style={{ opacity: 0 }}>
        <div className="cmp-pct">
          <span ref={set('cmpP')}>100,0 %</span>
          <small>humano ↔ chimpancé</small>
        </div>
        <dl>
          <dt>Letras comparadas</dt>
          <dd ref={set('cmpA')}>0</dd>
          <dt>Diferentes</dt>
          <dd ref={set('cmpB')}>0</dd>
        </dl>
        <p className="cmp-note">Solo sustituciones de una letra; contando inserciones y deleciones, la similitud baja a ~96 %.</p>
      </aside>

      <div className="evo-head" ref={set('evoHead')} style={{ opacity: 0 }}>
        <span>Tiempo antes del presente</span>
        <small>escala logarítmica · Ma = millones de años · ka = miles</small>
      </div>

      <aside className="brain" ref={set('brain')} style={{ opacity: 0 }}>
        <h2>Volumen cerebral medio <small>cm³</small></h2>
        <ul>
          {SPECIES.map((s, i) => (
            <li key={s.id} ref={set(`brain${i}`)}>
              <span className="brain-n">{s.name.replace('tchadensis', '').replace('neanderthalensis', 'neanderthalensis').trim()}</span>
              <span className="brain-track">
                <span className="brain-bar" ref={set(`brainbar${i}`)} style={{ width: `${(s.cc / 1500) * 100}%`, background: s.color }} />
              </span>
              <span className="brain-v" ref={set(`brainv${i}`)}>0</span>
            </li>
          ))}
        </ul>
      </aside>

      <section className="end" ref={set('end')} style={{ opacity: 0 }}>
        <p>La evolución sigue escrita en tu ADN.</p>
        <small>
          Fuentes: Consorcio T2T (2022), Chimpanzee Sequencing and Analysis Consortium (2005), Green et al. (2010),
          Smithsonian Human Origins Program. Cifras redondeadas.
        </small>
      </section>

      <div className="progress" aria-hidden="true">
        <i ref={set('bar')} />
      </div>
      <span className="timecode" ref={set('time')} />
      <div className="black" ref={set('black')} />
    </div>
  )
}
