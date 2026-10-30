import { useLayoutEffect } from 'react'
import { gsap, SplitText, EASE, DUR, MQ } from '../lib/motion.js'

/**
 * Arrival sequence: the globe swings into orbit, the name unmasks character by
 * character, the supporting lines and the beacon follow.
 *
 * @param {import('react').RefObject<HTMLElement>} scope root element to scope selectors to
 */
export function useIntro(scope) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ defaults: { ease: EASE.out } })
          .from('.globe-in', { scale: 0.62, y: 110, opacity: 0, duration: DUR.slow })
          .from('.hero-eyebrow', { y: 14, opacity: 0, duration: DUR.fast }, 0.6)
          .from('.hero-sub', { y: 22, opacity: 0, stagger: 0.12, duration: 0.7 }, 1.05)
          .from('.beacon', { y: 90, opacity: 0, duration: DUR.base, ease: EASE.back }, 1.9)

        // Masked per-character reveal. autoSplit re-splits when the web font
        // lands or the line count changes, so no stale measurements.
        const split = SplitText.create('.hero-title', {
          type: 'words,chars',
          mask: 'chars',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 115,
              stagger: 0.035,
              duration: DUR.base,
              ease: EASE.out,
              delay: 0.45,
            }),
        })

        return () => { tl.kill(); split.revert() }
      })

      return () => mm.kill()
    }, scope)

    return () => ctx.revert()
  }, [scope])
}
