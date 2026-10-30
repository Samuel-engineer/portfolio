import { useEffect, useState } from 'react'

/**
 * Reactive media query for the rare case where a layout decision has to be
 * made in JS rather than CSS (SVG geometry that cannot be expressed in CSS).
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof matchMedia === 'function' ? matchMedia(query).matches : false,
  )

  useEffect(() => {
    const mql = matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}
