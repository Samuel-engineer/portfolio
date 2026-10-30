import { useCallback, useLayoutEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger, prefersStill } from '../lib/motion.js'

/**
 * Lenis smooth scrolling, driven from GSAP's single RAF loop so ScrollTrigger
 * and Lenis never fight over the frame. Disabled under reduced motion, where
 * the browser's native scrolling is the correct behaviour.
 *
 * Returns stable `stop`/`start` callbacks for freezing the page behind a modal.
 */
export function useSmoothScroll() {
  const lenis = useRef(null)

  useLayoutEffect(() => {
    if (prefersStill()) return

    const l = new Lenis({ anchors: { offset: -88 }, autoRaf: false })
    lenis.current = l
    l.on('scroll', ScrollTrigger.update)

    const raf = (t) => l.raf(t * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      l.destroy()
      lenis.current = null
    }
  }, [])

  const stop = useCallback(() => lenis.current?.stop(), [])
  const start = useCallback(() => lenis.current?.start(), [])

  return { stop, start }
}
