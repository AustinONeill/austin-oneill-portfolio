import { useInView } from '@/hooks/useInView'

// Stylized dashboard mock for CannTycoon card
function DashboardMock() {
  return (
    <div className="rounded-xl bg-surface-dark-card border border-teal/10 p-4 font-mono text-xs">
      <div className="flex items-center justify-between mb-3">
        <span className="text-teal font-medium">GROW ROOM 04 · FLOWER</span>
        <span className="w-2 h-2 rounded-full bg-teal animate-pulse" aria-hidden="true" />
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { label: 'TEMP', value: '24.1°C', ok: true },
          { label: 'RH', value: '62%', ok: true },
          { label: 'CO₂', value: '1,240ppm', ok: false },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface-dark rounded-lg p-2">
            <div className="text-ink-subtle text-[10px]">{stat.label}</div>
            <div className={`text-sm font-semibold ${stat.ok ? 'text-teal-light' : 'text-amber-400'}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-ink-subtle">Irrigation</span>
          <span className="text-emerald-400">NOMINAL</span>
        </div>
        <div className="w-full bg-surface-dark rounded-full h-1">
          <div className="bg-teal h-1 rounded-full" style={{ width: '78%' }} />
        </div>
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-ink-subtle">VPD</span>
          <span className="text-amber-400">ALERT: 1.8 kPa</span>
        </div>
        <div className="w-full bg-surface-dark rounded-full h-1">
          <div className="bg-amber-400 h-1 rounded-full" style={{ width: '91%' }} />
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        <div className="mb-12">
          <span className="text-teal font-mono text-sm font-medium tracking-wide uppercase">Work</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-2">Projects</h2>
        </div>

        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-6 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* CannTycoon — dark card */}
          <div className="group relative bg-surface-dark rounded-3xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal/10 transition-all duration-300 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-mono text-teal uppercase tracking-widest">Featured</span>
                <h3 className="text-xl font-bold text-white mt-1">CannTycoon</h3>
                <p className="text-ink-subtle text-sm mt-0.5">Controls Simulation & Dashboard</p>
              </div>
              <span className="px-2 py-1 rounded-lg bg-teal/10 text-teal text-xs font-mono border border-teal/20">
                WIP
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              A simulation system modeling cannabis plant growth, environmental variables, and
              resource management — built on the same logic structures used in real Damatex
              control systems. A testbed for feedback loops, fault detection, and state-based
              validation in software.
            </p>

            <DashboardMock />

            <ul className="mt-4 space-y-1.5">
              {[
                'Temperature, humidity, light, CO₂, and stress interaction logic with validation',
                'Fault detection and corrective response simulation',
                'Sandbox for testing control strategies before real-facility deployment',
              ].map((point) => (
                <li key={point} className="flex gap-2 text-xs text-slate-400">
                  <span className="text-teal mt-0.5 flex-shrink-0">▸</span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
              {['TypeScript', 'React', 'Simulation', 'Controls Logic'].map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 text-teal-light text-xs font-mono border border-teal/10">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-3 mt-5">
              <a
                href="https://github.com/AustinONeill"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-teal text-white text-sm font-semibold hover:bg-teal-dark transition-colors"
              >
                View on GitHub
              </a>
              <button
                disabled
                className="px-4 py-2 rounded-xl border border-white/10 text-slate-500 text-sm font-semibold cursor-not-allowed"
              >
                Live Demo (soon)
              </button>
            </div>
          </div>

          {/* Portfolio & Internal Tools — light card */}
          <div className="group bg-surface-muted rounded-3xl p-6 border border-slate-100 hover:border-teal/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col">
            <div className="mb-4">
              <span className="text-xs font-mono text-teal uppercase tracking-widest">Portfolio</span>
              <h3 className="text-xl font-bold text-ink mt-1">This Site &amp; Internal Tools</h3>
              <p className="text-ink-subtle text-sm mt-0.5">Full-stack skills in practice</p>
            </div>

            <p className="text-ink-muted text-sm leading-relaxed mb-4">
              Building a portfolio and internal tooling to demonstrate full-stack capability
              alongside controls work. These projects apply software engineering principles —
              monitoring, thresholds, alerts — to operational problems.
            </p>

            <ul className="space-y-2 mb-4 flex-1">
              {[
                'Weather app — JavaScript, live API integration, deployed',
                'Automation scripts applying control-system principles (monitoring, thresholds, alerts) to software problems',
                'This site — React, TypeScript, Tailwind CSS, deployed on Cloudflare Pages',
              ].map((point) => (
                <li key={point} className="flex gap-2 text-sm text-ink-muted">
                  <span className="text-teal mt-1 flex-shrink-0">▸</span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-5 pt-4 border-t border-slate-100">
              {['React', 'TypeScript', 'Tailwind', 'Cloudflare', 'Python'].map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-surface border border-slate-150 text-ink-muted text-xs font-mono">
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="https://github.com/AustinONeill"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-ink text-sm font-semibold hover:border-teal hover:text-teal transition-colors w-fit"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
