import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger, EASE, DUR, MQ } from '../lib/motion.js'

/**
 * Entrance animations for anything scrolled into view: `.reveal` blocks rise
 * and fade in (batched, so a row of cards staggers as one group), and `.rule`
 * hairlines draw themselves under section titles.
 *
 * The initial hidden state is set *inside* the motion query, so a
 * reduced-motion visitor never ends up with permanently invisible content.
 */
export function useReveal(scope) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add(MQ.motion, () => {
        gsap.set('.reveal', { opacity: 0, y: 48 })
        gsap.set('.rule', { scaleX: 0 })

        const show = (els) =>
          gsap.to(els, { opacity: 1, y: 0, stagger: 0.1, duration: DUR.base, ease: EASE.out })

        ScrollTrigger.batch('.reveal', { start: 'top 88%', once: true, onEnter: show })

        // ScrollTrigger suppresses callbacks for triggers already past their
        // start on the first refresh, so anything above the fold on arrival —
        // browser scroll restoration, a deep link, a very tall viewport —
        // would stay at opacity 0 forever. Reveal those explicitly.
        const sweep = requestAnimationFrame(() => {
          const passed = gsap.utils
            .toArray('.reveal')
            .filter((el) => el.getBoundingClientRect().top < innerHeight * 0.88)
          if (passed.length) show(passed)
        })

        ScrollTrigger.batch('.rule', {
          start: 'top 92%',
          once: true,
          onEnter: (els) =>
            gsap.to(els, { scaleX: 1, duration: 1.1, stagger: 0.08, ease: EASE.expo }),
        })

        return () => {
          cancelAnimationFrame(sweep)
          gsap.set('.reveal', { clearProps: 'opacity,transform' })
          gsap.set('.rule', { clearProps: 'transform' })
        }
      })

      // Web fonts change text height, which changes every trigger position.
      document.fonts?.ready.then(() => ScrollTrigger.refresh())

      return () => mm.kill()
    }, scope)

    return () => ctx.revert()
  }, [scope])
}
