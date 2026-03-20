import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  once?: boolean
}

export function useInView<T extends Element>(
  options: UseInViewOptions = {}
): [React.RefObject<T>, boolean] {
  const { threshold = 0.15, once = true } = options
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    // Respect prefers-reduced-motion — skip animation entirely
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setIsInView(true)
      return
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, once])

  return [ref, isInView]
}
