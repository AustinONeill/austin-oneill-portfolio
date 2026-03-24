import { useInView } from '@/hooks/useInView'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import SectionLabel from '@/components/SectionLabel'

interface Role {
  title: string
  company: string
  location: string
  period: string
  bullets: string[]
  tags: string[]
  image: string
  imageAlt: string
  imageFromRight: boolean
}

const ROLES: Role[] = [
  {
    title: 'Controls & Automation Technician',
    company: 'MTL Cannabis (Abba Medix Corp)',
    location: 'Montréal, QC',
    period: 'Oct 2025 – Present',
    image: '/assets/mtl-jar.png',
    imageAlt: 'MTL Cannabis',
    imageFromRight: true,
    bullets: [
      'Designed and deployed Damatex-based environmental control systems across multi-room facilities, integrating HVAC, irrigation, CO₂, and lighting into unified, scalable control logic.',
      'Built stage-driven automation frameworks (lighting, irrigation) using time/day counters to manage full lifecycle transitions from pre-veg through flower.',
      'Engineered fault detection and validation systems — including dead-zone monitoring, valve vs. flow verification, and state-based logic — to identify leaks, failures, and off-schedule events.',
      'Diagnosed and debugged live control systems in production, refining logic and alarm conditions to improve reliability and reduce false positives.',
      'Standardized environmental schedules and modular control structures across rooms, minimizing configuration drift and enabling consistent operation at scale.',
      'Tuned VPD, temperature, and humidity strategies based on plant response, directly influencing morphology, consistency, and yield outcomes.',
      'Designed and developed internal software tools that bridge gardeners and management, providing real-time visibility into room conditions, surfacing actionable data, and reducing reliance on manual reporting and external systems.',
      'Provided technical leadership across cultivation and controls, including guidance to gardeners and environmental strategy alignment.',
    ],
    tags: ['Damatex', 'HVAC Controls', 'Irrigation Logic', 'Fault Detection', 'VPD Tuning', 'State Validation', 'Internal Tools'],
  },
  {
    title: 'IT Tech / Cultivation Support',
    company: 'MTL Cannabis (Abba Medix Corp)',
    location: 'Pickering, ON',
    period: 'Nov 2024 – Oct 2025',
    image: '/assets/abba-medix.png',
    imageAlt: 'Abba Medix Corp',
    imageFromRight: false,
    bullets: [
      'Supported facility-wide IT infrastructure: desktops, printers, surveillance systems, and access control.',
      'Built internal tools and small software prototypes to streamline workflows and improve operational efficiency.',
      'Maintained infrastructure documentation and building plans using Bluebeam Revu.',
      'Executed full cultivation lifecycle tasks in compliance with Health Canada standards.',
      'Applied IPM protocols — solution preparation, spray application, and systematic pest detection.',
      'Supported medical fulfillment operations: inventory organization, space optimization, and high-volume logistics.',
      'Designed internal materials and assisted with facility coordination, contractor management, and security inspections.',
    ],
    tags: ['IT Support', 'Bluebeam Revu', 'Cultivation Ops', 'IPM', 'Health Canada', 'Medical Fulfillment', 'Security Systems'],
  },
  {
    title: 'Cannabis Production Assistant',
    company: 'Indiva',
    location: 'London, ON',
    period: 'Oct 2022 – Nov 2023',
    image: '/assets/indiva.png',
    imageAlt: 'Indiva — Our Roots Run Deep',
    imageFromRight: true,
    bullets: [
      'Supported high-volume production of vape cartridges and edibles.',
      'Achieved record shift output (3,000+ cartridges) while maintaining quality and compliance standards.',
      'Maintained strict regulatory compliance using CannTrack for tax stamps and batch tracking.',
      'Recognised as a top performer as a temporary worker — contract was bought out directly from the agency based on performance.',
    ],
    tags: ['Production', 'CannTrack', 'Compliance', 'Batch Tracking', 'GMP', 'Top Performer'],
  },
]

const IMG_COL = 220 // fixed image column width in px

function TimelineLine() {
  const [ref, progress] = useScrollProgress<HTMLDivElement>(0.05)
  return (
    <div ref={ref} className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-px pointer-events-none" style={{ height: '100%' }}>
      <div className="w-full bg-teal/15 absolute inset-0" />
      <div
        className="w-full bg-teal/50 absolute top-0 transition-none"
        style={{ height: `${progress * 100}%` }}
      />
    </div>
  )
}

function RoleCard({ role }: { role: Role }) {
  const [textRef, textInView] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [imgRef, imgProgress] = useScrollProgress<HTMLDivElement>(0.55)

  // Image slides from outside its column
  const tx = Math.round((1 - imgProgress) * (role.imageFromRight ? IMG_COL + 40 : -(IMG_COL + 40)))
  const opacity = Math.max(0, imgProgress * 1.4 - 0.1) // slight lag before fade starts

  const imageNode = (
    <div
      ref={imgRef}
      className="hidden md:flex items-center justify-center"
      style={{
        width: IMG_COL,
        flexShrink: 0,
        transform: `translateX(${tx}px)`,
        opacity,
      }}
    >
      <img
        src={role.image}
        alt={role.imageAlt}
        className="w-full h-auto object-contain"
      />
    </div>
  )

  return (
    <div className="flex items-center gap-6 lg:gap-10 mb-20 last:mb-0">

      {/* Left image slot — always reserves space; only populated when imageFromRight=false */}
      {role.imageFromRight
        ? <div className="hidden md:block flex-shrink-0" style={{ width: IMG_COL }} />
        : imageNode
      }

      {/* Center text — always the same position */}
      <div
        ref={textRef}
        className={`flex-1 min-w-0 transition-all duration-700 ${
          textInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2 mb-3">
          <div>
            <h3 className="font-bold text-ink text-base sm:text-lg leading-tight">{role.title}</h3>
            <p className="text-teal font-medium text-sm mt-0.5">{role.company}</p>
          </div>
          <div className="sm:text-right flex-shrink-0">
            <p className="text-xs sm:text-sm font-mono text-ink-muted">{role.period}</p>
            <p className="text-xs text-ink-subtle mt-0.5">{role.location}</p>
          </div>
        </div>

        <div className="bg-surface border border-slate-100 rounded-2xl p-4 sm:p-5 hover:border-teal/20 hover:shadow-sm transition-all">
          <ul className="space-y-2 mb-4">
            {role.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2 text-sm text-ink-muted leading-relaxed">
                <span className="text-teal mt-1.5 flex-shrink-0" aria-hidden="true">▸</span>
                {bullet}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-50">
            {role.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-xs font-mono text-ink-subtle">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Right image slot */}
      {role.imageFromRight
        ? imageNode
        : <div className="hidden md:block flex-shrink-0" style={{ width: IMG_COL }} />
      }
    </div>
  )
}

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="section-padding overflow-hidden">
      <div className="container-max">
        <div className="mb-12">
          <SectionLabel>Career</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-2">Experience</h2>
        </div>

        <div className="relative">
          <TimelineLine />
          {ROLES.map((role) => (
            <RoleCard key={`${role.company}-${role.period}`} role={role} />
          ))}
        </div>
      </div>
    </section>
  )
}
