import { useInView } from '@/hooks/useInView'

const PILLS = [
  'Environmental automation (Damatex)',
  'Irrigation & fault detection',
  'Internal dashboards & scripts (JS/TS/Python)',
  'Production workflows & compliance (Health Canada)',
  'IT infrastructure & facility support',
  'Full-stack development (React, Node.js)',
]

const CARD_W = 260 // px — card width at full expansion

export default function HybridProfile() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.15 })

  const ease = '0.9s cubic-bezier(0.22, 1, 0.36, 1)'

  return (
    <section id="profile" className="bg-surface-muted overflow-hidden py-20 sm:py-28">

      {/* Section heading — constrained */}
      <div className="container-max mb-10">
        <span className="text-teal font-mono text-sm font-medium tracking-wide uppercase">What I do</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-2">
          Controls &amp; Code — both sides of the floor
        </h2>
      </div>

      {/* Three-column layout: image | text | image — full viewport width */}
      <div ref={ref} className="flex items-stretch w-full">

        {/* ── Left card: expands from left screen edge ── */}
        <div
          className="flex-shrink-0 overflow-hidden hidden md:block"
          style={{
            width: isInView ? CARD_W : 0,
            transition: `width ${ease}`,
          }}
        >
          <div
            style={{
              width: CARD_W,
              height: '100%',
              transform: isInView ? 'translateX(0)' : `translateX(-${CARD_W}px)`,
              transition: `transform ${ease}`,
            }}
          >
            <img
              src="/assets/damatex-left.jpg"
              alt="Damatex environmental control unit in cannabis grow room"
              className="w-full h-full object-cover"
              style={{ minHeight: 420 }}
            />
          </div>
        </div>

        {/* ── Centre: text content ── */}
        <div className="flex-1 min-w-0 px-6 sm:px-10 lg:px-16 flex flex-col justify-center">
          <div className="grid md:grid-cols-2 gap-10 items-start max-w-4xl mx-auto w-full">
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
                  style={{ transitionDelay: isInView ? `${i * 60}ms` : '0ms' }}
                >
                  <span className="w-2 h-2 rounded-full bg-teal flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm text-ink-muted font-medium">{pill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right card: expands from right screen edge ── */}
        <div
          className="flex-shrink-0 overflow-hidden hidden md:block"
          style={{
            width: isInView ? CARD_W : 0,
            transition: `width ${ease}`,
          }}
        >
          <div
            style={{
              width: CARD_W,
              height: '100%',
              transform: isInView ? 'translateX(0)' : `translateX(${CARD_W}px)`,
              transition: `transform ${ease}`,
            }}
          >
            <img
              src="/assets/mtl-jar.jpg"
              alt="MTL Cannabis Gas N' Up product"
              className="w-full h-full object-cover object-left"
              style={{ minHeight: 420 }}
            />
          </div>
        </div>
      </div>

      {/* Mobile: images below content, stacked */}
      <div className="md:hidden flex gap-4 mt-10 px-4 overflow-hidden">
        <div
          className="flex-1 rounded-2xl overflow-hidden shadow-md"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateX(0)' : 'translateX(-40px)',
            transition: `opacity 0.7s ease, transform 0.7s ease`,
          }}
        >
          <img src="/assets/damatex-left.jpg" alt="Damatex control unit" className="w-full h-48 object-cover" />
        </div>
        <div
          className="flex-1 rounded-2xl overflow-hidden shadow-md"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateX(0)' : 'translateX(40px)',
            transition: `opacity 0.7s ease, transform 0.7s ease`,
            transitionDelay: '100ms',
          }}
        >
          <img src="/assets/mtl-jar.jpg" alt="MTL Cannabis product" className="w-full h-48 object-cover object-left" />
        </div>
      </div>
    </section>
  )
}
