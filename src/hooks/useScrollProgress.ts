import { useEffect, useRef, useState } from 'react'

/**
 * Returns a 0→1 progress value as the element scrolls into view.
 * 0 = element's top edge is at the bottom of the viewport
 * 1 = element's top edge has reached `completedAt` fraction up the viewport (default: 40%)
 */
export function useScrollProgress<T extends Element>(
  completedAt = 0.4
): [React.RefObject<T>, number] {
  const ref = useRef<T>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect prefers-reduced-motion — jump straight to 1
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1)
      return
    }

    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // distance from bottom of viewport to top of element
      // positive = element below fold, negative = element above fold
      const fromBottom = vh - rect.top
      const range = vh * (1 - completedAt)
      const p = Math.min(1, Math.max(0, fromBottom / range))
      setProgress(p)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [completedAt])

  return [ref, progress]
}
