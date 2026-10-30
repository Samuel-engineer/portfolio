import { useEffect, useRef, useState } from 'react'
import { gsap, EASE, prefersStill } from '../lib/motion.js'
import { useFocusTrap } from '../hooks/useFocusTrap.js'
import { stars, secret } from '../data.js'

/**
 * The hidden game: link the stars in the order of the journey to decode the
 * signal. Wrong pick resets the chain with a shake.
 */
export default function Constellation({ onClose }) {
  const [path, setPath] = useState([])
  const [hint, setHint] = useState(false)
  const root = useRef(null)
  const done = path.length === stars.length

  useFocusTrap(root, onClose)

  useEffect(() => {
    const t = setTimeout(() => setHint(true), 15000)

    // Lenis is already stopped by the caller; with reduced motion there is no
    // Lenis instance, so lock the document scroll directly instead.
    const html = document.documentElement
    const previous = html.style.overflow
    if (prefersStill()) html.style.overflow = 'hidden'

    const ctx = gsap.context(() => {
      gsap.from('.overlay', { opacity: 0, duration: 0.25 })
      gsap.from('.sheet', { y: 40, scale: 0.94, opacity: 0, duration: 0.5, ease: EASE.expo })
    }, root)

    return () => {
      clearTimeout(t)
      html.style.overflow = previous
      ctx.revert()
    }
  }, [])

  // Each correct pick draws its link and bounces the star.
  useEffect(() => {
    if (!path.length) return
    const ctx = gsap.context(() => {
      const last = path[path.length - 1]
      gsap.fromTo(`[data-l="${last}"]`, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' })
      gsap.fromTo(`[data-s="${last}"] .core`, { scale: 2.6 }, { scale: 1.4, duration: 0.6, ease: EASE.elastic })
    }, root)
    return () => ctx.revert()
  }, [path])

  // Finale: every star lights up, a shooting star crosses, the secret appears.
  useEffect(() => {
    if (!done) return
    const ctx = gsap.context(() => {
      gsap.timeline()
        .fromTo('.star .core', { scale: 3 }, { scale: 1.4, stagger: 0.08, duration: 0.5, ease: 'back.out(3)' })
        .fromTo('.shoot', { x: -30, y: -10, opacity: 1 }, { x: 130, y: 45, opacity: 0, duration: 1.1, ease: 'power2.in' }, 0.2)
        .from('.secret', { y: 24, opacity: 0, duration: 0.7, ease: EASE.out }, 0.6)
    }, root)
    return () => ctx.revert()
  }, [done])

  const tap = (i) => {
    if (done) return
    if (i === path.length) return setPath([...path, i])
    gsap.fromTo('.map', { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.2)' })
    setPath([])
  }

  return (
    <div ref={root}>
      {/* flex + my-auto rather than grid + place-items-center: a dialog taller
          than the viewport stays fully scrollable instead of clipping its top. */}
      <div
        data-lenis-prevent
        className="overlay fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-void/90 p-3 backdrop-blur-sm sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="c-title"
      >
        <div className="sheet panel my-auto w-full max-w-3xl p-4 sm:p-6">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 id="c-title" className="text-2xl sm:text-3xl">Star map</h2>
              <p className="mt-1 max-w-[46ch] text-sm text-mute sm:text-base">
                Link the stars in the order of my journey, from the oldest to the most recent.
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex-none rounded-full border border-sky/25 px-3 py-1.5 text-sm transition-colors hover:border-leaf hover:text-leaf"
              aria-label="Close the star map"
            >
              Close
            </button>
          </div>

          <svg className="map" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {path.slice(1).map((s, k) => (
              <line
                key={s}
                data-l={s}
                pathLength="1"
                className="link"
                x1={stars[path[k]].x}
                y1={stars[path[k]].y}
                x2={stars[s].x}
                y2={stars[s].y}
              />
            ))}

            <line className="shoot" x1="0" y1="10" x2="-14" y2="5" />

            {stars.map((s, i) => (
              <g
                key={s.label}
                data-s={i}
                className={`star ${path.includes(i) ? 'on' : ''} ${hint && i === path.length ? 'next' : ''}`}
                tabIndex={0}
                role="button"
                aria-label={`${s.label}, ${s.year}`}
                onClick={() => tap(i)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), tap(i))}
              >
                <circle cx={s.x} cy={s.y} r="7" className="hit" />
                <circle cx={s.x} cy={s.y} r="2" className="core" />
                <text x={s.x} y={s.y + 7} textAnchor="middle">{s.label}</text>
              </g>
            ))}
          </svg>

          <div className="mt-3 flex items-center gap-3">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-leaf to-amber transition-[width] duration-500"
                style={{ width: `${(path.length / stars.length) * 100}%` }}
              />
            </div>
            <p className="min-w-24 text-right text-sm text-mute" aria-live="polite">
              {done ? 'decoded' : `${path.length} / ${stars.length} linked`}
            </p>
          </div>

          {hint && !done && (
            <p className="mt-2 text-sm text-amber/80">Look for the pulsing star.</p>
          )}

          {done && (
            <div className="secret mt-4 rounded-xl border border-leaf/60 bg-leaf/5 p-4">
              <h3 className="mb-1 text-lg text-leaf">{secret.title}</h3>
              <p>{secret.text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
