import { useLayoutEffect } from 'react'
import { gsap, MQ } from '../lib/motion.js'

/**
 * Everything tied to scroll position: the globe receding, the hero text
 * parallaxing out, and the two progress indicators filling.
 *
 * Desktop and mobile get different globe treatments because the globe has a
 * different job in each layout — a reserved column on the right at `lg`, a
 * dimmed backdrop below it, where it must get out of the text's way.
 */
export function useScrollScene(scope) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add(MQ.motion, () => {
        const pageScrub = {
          trigger: 'main',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }

        // Hero copy drifts up and dissolves as the first section arrives.
        gsap.to('.hero-text', {
          yPercent: -22,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        })

        // Vertical rail (xl) and the hairline under the header (everything else)
        // read from the same scroll range.
        gsap.from('.rail-fill', { scaleY: 0, transformOrigin: 'top', ease: 'none', scrollTrigger: pageScrub })
        gsap.from('.bar-fill', { scaleX: 0, transformOrigin: 'left', ease: 'none', scrollTrigger: pageScrub })

        // Idle wobble on the beacon until the visitor notices it.
        gsap.to('.beacon', { rotation: 2, repeat: -1, yoyo: true, duration: 0.12, repeatDelay: 6, delay: 5 })
      })

      // Desktop: the globe sits in its own column, so it only has to settle.
      mm.add(MQ.motionUp, () => {
        gsap.to('.globe-scroll', {
          scale: 0.76,
          yPercent: 6,
          opacity: 0.62,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
        })
      })

      // Mobile: the globe is behind the content, so it fades well back to keep
      // the text legible once the visitor starts reading.
      mm.add(MQ.motionDown, () => {
        gsap.to('.globe-scroll', {
          scale: 0.86,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
        })
      })

      return () => mm.kill()
    }, scope)

    return () => ctx.revert()
  }, [scope])
}
