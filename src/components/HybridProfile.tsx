import { useInView } from '@/hooks/useInView'
import { useScrollProgress } from '@/hooks/useScrollProgress'

const PILLS = [
  'Environmental automation (Damatex)',
  'Irrigation & fault detection',
  'Internal dashboards & scripts (JS/TS/Python)',
  'Production workflows & compliance (Health Canada)',
  'IT infrastructure & facility support',
  'Full-stack development (React, Node.js)',
]

const CARD_W = 280 // px — fully expanded card width

export default function HybridProfile() {
  const [pillRef, pillsInView] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [scrollRef, progress] = useScrollProgress<HTMLDivElement>(0.45)

  // Interpolated values driven by scroll progress
  const cardWidth = Math.round(progress * CARD_W)
  const cardLeftX  = Math.round((1 - progress) * -CARD_W)
  const cardRightX = Math.round((1 - progress) *  CARD_W)

  return (
    <section id="profile" className="bg-surface-muted overflow-hidden py-20 sm:py-28">

      {/* Heading — constrained */}
      <div className="container-max mb-10">
        <span className="text-teal font-mono text-sm font-medium tracking-wide uppercase">What I do</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-2">
          Controls &amp; Code — both sides of the floor
        </h2>
      </div>

      {/* Three-column scroll-driven layout */}
      <div ref={scrollRef} className="flex items-stretch w-full">

        {/* ── Left card — Damatex unit ── */}
        <div
          className="flex-shrink-0 overflow-hidden hidden md:block"
          style={{ width: cardWidth }}
        >
          <div style={{ width: CARD_W, transform: `translateX(${cardLeftX}px)` }}>
            <img
              src="/assets/damatex-left.jpg"
              alt="Damatex environmental control unit in cannabis grow room"
              className="w-full object-cover"
              style={{ height: 480 }}
            />
          </div>
        </div>

        {/* ── Centre: text ── */}
        <div className="flex-1 min-w-0 px-6 sm:px-10 lg:px-14 flex flex-col justify-center">
          <div ref={pillRef} className="grid md:grid-cols-2 gap-10 items-start max-w-4xl mx-auto w-full">

            {/* Narrative */}
            <div className="space-y-4 text-ink-muted leading-relaxed">
              <p>
                I'm a controls technician specializing in Damatex environmental automation for
                licensed cannabis production — designing and tuning the systems that govern
                temperature, humidity, CO₂, irrigation, and lighting across grow rooms.
              </p>
              <p>
                What sets me apart is that I'm also a trained software developer. I build the
                internal tools, dashboards, and automation scripts that extend those control
                systems, giving teams real-time visibility and reducing reliance on external
                vendors for every custom report or workflow.
              </p>
              <p>
                I understand both what the plant needs and how to build the system that delivers it —
                from PLC logic on the plant floor to a TypeScript script running in the cloud.
              </p>
              <p className="font-medium text-ink">
                It's an uncommon combination in cannabis. That's the point.
              </p>
            </div>

            {/* Pills */}
            <div className="space-y-3">
              <p className="text-xs font-mono text-ink-subtle uppercase tracking-widest mb-4">
                Where I bring leverage
              </p>
              {PILLS.map((pill, i) => (
                <div
                  key={pill}
                  className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-slate-100 hover:border-teal/30 transition-colors"
                  style={{
                    opacity: pillsInView ? 1 : 0,
                    transform: pillsInView ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                    transitionDelay: pillsInView ? `${i * 60}ms` : '0ms',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-teal flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm text-ink-muted font-medium">{pill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right card — MTL Cannabis jar ── */}
        <div
          className="flex-shrink-0 overflow-hidden hidden md:block"
          style={{ width: cardWidth }}
        >
          <div
            style={{
              width: CARD_W,
              transform: `translateX(${cardRightX}px)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 480,
              background: 'transparent',
            }}
          >
            <img
              src="/assets/mtl-jar.png"
              alt="MTL Cannabis Gas N' Up"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Mobile fallback — stacked below content */}
      <div className="md:hidden flex gap-4 mt-10 px-4">
        <div className="flex-1 rounded-2xl overflow-hidden shadow-md">
          <img src="/assets/damatex-left.jpg" alt="Damatex control unit" className="w-full h-44 object-cover" />
        </div>
        <div className="flex-1 flex items-center justify-center bg-transparent p-2">
          <img src="/assets/mtl-jar.png" alt="MTL Cannabis product" className="w-full h-44 object-contain" />
        </div>
      </div>
    </section>
  )
}
