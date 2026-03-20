import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>()

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' }
      )

      observer.observe(el)
      observers.set(id, observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [sectionIds.join(',')])

  return activeSection
}
