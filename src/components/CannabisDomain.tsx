import { useInView } from '@/hooks/useInView'

const COLUMNS = [
  {
    heading: 'Cultivation & Environment',
    bullets: [
      'Cannabis plant lifecycle — seed to harvest',
      'Environmental ranges for each growth stage',
      'VPD management and crop consistency',
      'Lighting schedules (pre-veg, veg, flower)',
      'Irrigation timing and volume parameters',
      'Hands-on defoliation, pruning, and transplanting',
    ],
  },
  {
    heading: 'Compliance & Production',
    bullets: [
      'Health Canada licensing requirements',
      'CannTrack — tax stamps and batch tracking',
      'CannSell certified (2024)',
      'SOP authoring and adherence',
      'Facility security inspections',
      'GMP production standards',
    ],
  },
]

export default function CannabisDomain() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section id="cannabis" className="section-padding bg-surface-dark">
      <div
        ref={ref}
        className={`container-max transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="mb-10">
          <span className="text-teal font-mono text-sm font-medium tracking-wide uppercase">
            Domain expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Cannabis Industry Knowledge
          </h2>
          <p className="text-slate-400 mt-3 max-w-2xl leading-relaxed">
            I've worked exclusively in licensed cannabis facilities under Health Canada regulations —
            which means I understand the regulatory reality that shapes every technical decision,
            from alarm thresholds to batch documentation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {COLUMNS.map((col) => (
            <div key={col.heading} className="bg-surface-dark-card rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 rounded-full bg-teal" aria-hidden="true" />
                <h3 className="font-bold text-white">{col.heading}</h3>
              </div>
              <ul className="space-y-2.5">
                {col.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 text-sm text-slate-400">
                    <span className="text-teal mt-0.5 flex-shrink-0" aria-hidden="true">▸</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-slate-500 text-sm max-w-lg">
          This isn't adjacent domain knowledge — it's operational experience in the regulated environment
          where these systems actually run. That reduces onboarding time and risk for any team I join.
        </p>
      </div>
    </section>
  )
}
