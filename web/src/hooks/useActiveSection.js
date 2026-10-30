import { useLayoutEffect, useState } from 'react'
import { ScrollTrigger } from '../lib/motion.js'

/**
 * Tracks which section owns the middle of the viewport, for nav highlighting.
 * Runs regardless of motion preference: it is state, not animation.
 *
 * @param {string[]} ids section element ids, in document order
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState('')
  const key = ids.join('|')

  useLayoutEffect(() => {
    const triggers = ids.map((id) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && setActive(id),
      }),
    )
    return () => triggers.forEach((t) => t.kill())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return active
}
