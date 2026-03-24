import { useInView } from '@/hooks/useInView'

export default function SectionLabel({ children }: { children: string }) {
  const [ref, isInView] = useInView<HTMLSpanElement>({ threshold: 0.5 })

  return (
    <span
      ref={ref}
      className="text-teal font-mono text-sm font-medium tracking-wide uppercase"
      style={{
        display: 'inline-block',
        animation: isInView ? 'label-wipe 0.5s ease forwards' : 'none',
        opacity: isInView ? undefined : 0,
      }}
    >
      {children}
    </span>
  )
}
