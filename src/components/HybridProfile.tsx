import { useInView } from '@/hooks/useInView'

const PILLS = [
  'Environmental automation (Damatex)',
  'Irrigation & fault detection',
  'Internal dashboards & scripts (JS/TS/Python)',
  'Production workflows & compliance (Health Canada)',
  'IT infrastructure & facility support',
  'Full-stack development (React, Node.js)',
]

export default function HybridProfile() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [imgRef, imgsInView] = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section id="profile" className="section-padding bg-surface-muted overflow-hidden">
      <div
        ref={ref}
        className={`container-max transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="mb-10">
          <span className="text-teal font-mono text-sm font-medium tracking-wide uppercase">What I do</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-2">
            Controls &amp; Code — both sides of the floor
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: narrative */}
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

          {/* Right: pill list */}
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

        {/* Photo cards — slide in from sides on scroll */}
        <div
          ref={imgRef}
          className="mt-16 flex items-end justify-center gap-6 sm:gap-10"
          aria-hidden="true"
        >
          {/* Left card — slides from left, slight CCW tilt */}
          <div
            className="relative w-48 sm:w-56 md:w-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/80 ring-1 ring-slate-200"
            style={{
              transform: imgsInView
                ? 'translateX(0) rotate(-2.5deg) translateY(8px)'
                : 'translateX(-120px) rotate(-6deg) translateY(30px)',
              opacity: imgsInView ? 1 : 0,
              transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.7s ease',
              transitionDelay: '0ms',
            }}
          >
            <img
              src="/assets/damatex-left.jpg"
              alt="Damatex environmental control unit in cannabis grow room"
              className="w-full h-72 sm:h-80 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white text-xs font-mono font-medium tracking-wide opacity-90">
                Damatex · Grow Room Control
              </p>
            </div>
          </div>

          {/* Centre label */}
          <div
            className="flex-shrink-0 text-center"
            style={{
              opacity: imgsInView ? 1 : 0,
              transform: imgsInView ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              transitionDelay: '300ms',
            }}
          >
            <span className="inline-block text-teal font-mono text-xs uppercase tracking-widest rotate-0 select-none">
              on the floor
            </span>
          </div>

          {/* Right card — slides from right, slight CW tilt */}
          <div
            className="relative w-48 sm:w-56 md:w-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/80 ring-1 ring-slate-200"
            style={{
              transform: imgsInView
                ? 'translateX(0) rotate(2.5deg) translateY(8px)'
                : 'translateX(120px) rotate(6deg) translateY(30px)',
              opacity: imgsInView ? 1 : 0,
              transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.7s ease',
              transitionDelay: '120ms',
            }}
          >
            <img
              src="/assets/damatex-right.jpg"
              alt="Damatex control system above cannabis canopy"
              className="w-full h-72 sm:h-80 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white text-xs font-mono font-medium tracking-wide opacity-90">
                MTL Cannabis · Flower Stage
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
