import { useInView } from '@/hooks/useInView'

interface Role {
  title: string
  company: string
  location: string
  period: string
  bullets: string[]
  tags: string[]
}

const ROLES: Role[] = [
  {
    title: 'Controls & Automation Technician',
    company: 'MTL Cannabis (Abba Medix Corp)',
    location: 'Montréal, QC',
    period: 'Oct 2025 – Present',
    bullets: [
      'Design and implement Damatex environmental control systems across multiple grow rooms — irrigation, HVAC, CO₂, and lighting.',
      'Build stage-based lighting control logic using time and day counters for pre-veg, veg, and flower cycles.',
      'Develop flood detection combining time-based dead-zone monitoring, valve vs. flow validation, and cumulative alarm logic.',
      'Implement state-based validation (expected vs. actual) to detect leaks, stuck valves, and off-schedule irrigation events.',
      'Tune VPD, temperature, and humidity parameters using hands-on cultivation knowledge.',
      'Build reusable control structures that standardize logic across rooms; develop internal software tools that complement control systems and reduce manual monitoring.',
    ],
    tags: ['Damatex', 'HVAC Controls', 'Irrigation Logic', 'VPD Tuning', 'Internal Tools', 'Cannabis'],
  },
  {
    title: 'IT Technician & Cultivation Support',
    company: 'MTL Cannabis (Abba Medix Corp)',
    location: 'Pickering, ON',
    period: 'Nov 2024 – Oct 2025',
    bullets: [
      'Supported desktops, printers, cameras, and access control systems across the facility.',
      'Built small software prototypes to streamline internal workflows.',
      'Updated building plans and infrastructure documentation using Bluebeam Revu; organized and inventoried equipment.',
      'Participated in cultivation operations (planting, transplanting, defoliation, pruning, harvest) to Health Canada standards.',
      'Coordinated contractors and supported building security inspections.',
    ],
    tags: ['IT Support', 'Bluebeam Revu', 'Cultivation Ops', 'Health Canada', 'Security Systems'],
  },
  {
    title: 'Cannabis Production Assistant',
    company: 'Indiva',
    location: 'London, ON',
    period: 'Oct 2022 – Nov 2023',
    bullets: [
      'Supported high-volume production of vape cartridges and edibles.',
      'Achieved record shift output (3,000+ cartridges) while maintaining quality and compliance standards.',
      'Maintained strict regulatory compliance using CannTrack for tax stamps and batch tracking.',
    ],
    tags: ['Production', 'CannTrack', 'Compliance', 'Batch Tracking', 'GMP'],
  },
]

function RoleCard({ role, index }: { role: Role; index: number }) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <div className="relative pl-8 pb-12 last:pb-0">
      {/* Timeline dot */}
      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-teal border-2 border-surface ring-4 ring-teal/10" aria-hidden="true" />

      <div
        ref={ref}
        className={`transition-all duration-600 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: `${index * 80}ms` }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-bold text-ink text-lg leading-tight">{role.title}</h3>
            <p className="text-teal font-medium text-sm mt-0.5">{role.company}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-mono text-ink-muted">{role.period}</p>
            <p className="text-xs text-ink-subtle mt-0.5">{role.location}</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-surface border border-slate-100 rounded-2xl p-5 hover:border-teal/20 hover:shadow-sm transition-all">
          <ul className="space-y-2 mb-4">
            {role.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2 text-sm text-ink-muted leading-relaxed">
                <span className="text-teal mt-1.5 flex-shrink-0" aria-hidden="true">▸</span>
                {bullet}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-50">
            {role.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-xs font-mono text-ink-subtle"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="section-padding">
      <div className="container-max">
        <div className="mb-12">
          <span className="text-teal font-mono text-sm font-medium tracking-wide uppercase">Career</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-2">Experience</h2>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-teal/15 ml-1.5">
          {ROLES.map((role, i) => (
            <RoleCard key={`${role.company}-${role.period}`} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
