import { useInView } from '@/hooks/useInView'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import AnimatedBorder from '@/components/AnimatedBorder'

const PILLS = [
  'Environmental automation (Damatex)',
  'Irrigation & fault detection',
  'Internal dashboards & scripts (JS/TS/Python)',
  'Production workflows & compliance (Health Canada)',
  'IT infrastructure & facility support',
  'Full-stack development (React, Node.js)',
]

const CARD_W = 280

export default function HybridProfile() {
  const [pillRef, pillsInView] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [scrollRef, progress] = useScrollProgress<HTMLDivElement>(0.45)

  const cardWidth = Math.round(progress * CARD_W)
  const leftTx    = Math.round((1 - progress) * -CARD_W)
  const rightTx   = Math.round((1 - progress) *  CARD_W)

  return (
    <section id="profile" className="bg-surface-muted overflow-hidden py-20 sm:py-28">

      <div className="container-max mb-10">
        <span className="text-teal font-mono text-sm font-medium tracking-wide uppercase">What I do</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-2">
          Controls &amp; Code — both sides of the floor
        </h2>
      </div>

      <div ref={scrollRef} className="flex items-stretch w-full">

        {/* Left card — Damatex, slides from left */}
        <div
          className="flex-shrink-0 overflow-hidden hidden md:block"
          style={{ width: cardWidth }}
        >
          <div style={{ width: CARD_W, transform: `translateX(${leftTx}px)` }}>
            <AnimatedBorder variant="controls">
              <img
                src="/assets/damatex-left.jpg"
                alt="Damatex environmental control unit in cannabis grow room"
                className="w-full object-cover"
                style={{ height: CARD_W }}
              />
            </AnimatedBorder>
          </div>
        </div>

        {/* Centre text */}
        <div className="flex-1 min-w-0 px-6 sm:px-10 lg:px-14 flex flex-col justify-center">
          <div ref={pillRef} className="grid md:grid-cols-2 gap-10 items-start max-w-4xl mx-auto w-full">
            <div className="space-y-4 text-ink-muted leading-relaxed">
              <p>
                I'm a controls technician specializing in Damatex-based environmental automation
                for licensed cannabis production — designing, implementing, and tuning the systems
                that govern temperature, humidity, CO₂, irrigation, and lighting across multi-room
                grow facilities.
              </p>
              <p>
                What differentiates my work is a dual foundation in controls and software
                development. Beyond configuring environmental systems, I build internal tools,
                dashboards, and automation scripts that extend control system capabilities —
                enabling real-time visibility, improving fault detection, and reducing reliance on
                external vendors for custom reporting or workflows.
              </p>
              <p>
                I approach cultivation environments as integrated systems. I understand both the
                biological requirements of the plant and the control logic required to consistently
                deliver those conditions — from PLC-level decision making on the plant floor to
                TypeScript-based tooling in the cloud.
              </p>
              <p className="font-medium text-ink">
                This combination of controls engineering, software development, and applied
                cultivation knowledge is uncommon in cannabis — and that's exactly where I operate.
              </p>
            </div>

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

        {/* Right card — code snippet, slides from right */}
        <div
          className="flex-shrink-0 overflow-hidden hidden md:block"
          style={{ width: cardWidth }}
        >
          <div style={{ width: CARD_W, transform: `translateX(${rightTx}px)` }}>
            <AnimatedBorder variant="code">
              <img
                src="/assets/code-snippet.png"
                alt="Python automation code for Damatex grow room control"
                className="w-full object-cover"
                style={{ height: CARD_W }}
              />
            </AnimatedBorder>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex gap-3 mt-10 px-4">
        <div className="flex-1 rounded-2xl overflow-hidden shadow-md">
          <img src="/assets/damatex-left.jpg" alt="Damatex control unit" className="w-full h-40 object-cover" />
        </div>
        <div className="flex-1 rounded-2xl overflow-hidden shadow-md">
          <img src="/assets/code-snippet.png" alt="Code snippet" className="w-full h-40 object-cover" />
        </div>
      </div>
    </section>
  )
}
