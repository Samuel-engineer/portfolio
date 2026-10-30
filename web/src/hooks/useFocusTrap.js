import { useEffect } from 'react'

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Modal keyboard contract: focus the first control, cycle Tab inside the
 * dialog, close on Escape, and hand focus back to whatever opened it.
 *
 * @param {import('react').RefObject<HTMLElement>} ref dialog container
 * @param {() => void} onClose
 */
export function useFocusTrap(ref, onClose) {
  useEffect(() => {
    const opener = document.activeElement
    const node = ref.current
    if (!node) return

    node.querySelector(FOCUSABLE)?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab') return

      const items = [...node.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    addEventListener('keydown', onKeyDown)
    return () => {
      removeEventListener('keydown', onKeyDown)
      opener?.focus?.()
    }
  }, [ref, onClose])
}
