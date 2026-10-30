import { useCallback } from 'react'

/**
 * Returns an `onPointerMove` handler that writes the cursor position into the
 * element's own custom properties. `.spotlight` in index.css paints the glow,
 * so no React re-render happens per pointer move.
 */
export function useSpotlight() {
  return useCallback((event) => {
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    el.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }, [])
}
