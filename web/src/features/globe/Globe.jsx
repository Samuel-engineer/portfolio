import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'
import gsap from 'gsap'
import Earth from './Earth.jsx'
import { places } from '../../data.js'

const hasWebGL = () => {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

// cobe's phi that brings a given longitude to the front of the globe.
const lonToPhi = (lon) => Math.PI - ((lon * Math.PI) / 180 - Math.PI / 2)
const startPhi = places.length ? lonToPhi(places[0].location[1]) : 0

/**
 * WebGL globe (cobe, ~5 KB). Spins slowly, turns with scroll, shows the places
 * of the journey joined by arcs. Falls back to the SVG Earth without WebGL.
 */
export default function Globe() {
  const canvasRef = useRef(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    if (!hasWebGL()) return setFallback(true)

    const canvas = canvasRef.current
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(devicePixelRatio || 1, 2)
    let size = canvas.offsetWidth
    let globe

    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: size * dpr,
        height: size * dpr,
        phi: startPhi,
        theta: 0.3,
        dark: 1,
        diffuse: 1.2,
        mapSamples: size < 400 ? 12000 : 20000,
        mapBrightness: 6,
        baseColor: [0.22, 0.55, 0.38],
        markerColor: [1, 0.71, 0.33],
        glowColor: [0.25, 0.45, 0.8],
        arcColor: [0.42, 0.82, 0.54],
        arcWidth: 0.6,
        arcHeight: 0.25,
        markers: places.map((p) => ({ location: p.location, size: 0.06 })),
        arcs: places.slice(1).map((p, i) => ({ from: places[i].location, to: p.location })),
      })
    } catch {
      return setFallback(true)
    }

    gsap.to(canvas, { opacity: 1, duration: 1.2, ease: 'power2.out' })

    const ro = new ResizeObserver(() => {
      size = canvas.offsetWidth
      globe.update({ width: size * dpr, height: size * dpr })
    })
    ro.observe(canvas)

    if (still) {
      globe.update({ phi: startPhi })
      return () => { ro.disconnect(); globe.destroy() }
    }

    // The globe lives in the hero, so it is off-screen for most of the page:
    // stop redrawing it there instead of spending a WebGL frame on nothing.
    let visible = true
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    io.observe(canvas)

    // Idle spin plus rotation driven by the (Lenis-smoothed) scroll position,
    // starting on the first place of the journey.
    let spin = startPhi
    const tick = () => {
      if (!visible) return
      spin += 0.0025
      globe.update({ phi: spin + scrollY * 0.0018 })
    }
    gsap.ticker.add(tick)

    return () => { gsap.ticker.remove(tick); io.disconnect(); ro.disconnect(); globe.destroy() }
  }, [])

  if (fallback) return <Earth />

  return (
    <canvas
      ref={canvasRef}
      className="aspect-square w-full opacity-0"
      role="img"
      aria-label="A dotted green globe slowly turning, with the places of my journey linked by arcs"
    />
  )
}
