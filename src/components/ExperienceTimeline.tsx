import { useInView } from '@/hooks/useInView'
import { useScrollProgress } from '@/hooks/useScrollProgress'

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
      'Designed and implemented Damatex environmental control systems across multiple grow rooms, integrating HVAC, irrigation, CO₂, and lighting into unified control logic.',
      'Built stage-based lighting and irrigation frameworks using time/day counters to automate transitions between pre-veg, veg, and flower cycles.',
      'Engineered fault detection and alarm systems — time-based dead-zone monitoring, valve command vs. flow validation, and cumulative alarm logic to detect abnormal conditions.',
      'Implemented state-based validation (expected vs. actual) to identify leaks, stuck valves, and off-schedule irrigation events.',
      'Diagnosed and debugged live control logic in production environments, validating sensor outputs and ensuring correct system behavior without disrupting active grow cycles.',
      'Refined control logic syntax and alarm conditions, improving reliability and reducing false positives and missed events.',
      'Standardized and replicated environmental schedules across rooms, ensuring lifecycle alignment and consistent day/night cycle behavior.',
      'Managed control configuration updates across multiple zones, adapting ranges, durations, and thresholds to operational and plant requirements.',
      'Performed sensor validation and sanity checks to ensure control decisions were based on reliable environmental inputs.',
      'Tuned VPD, temperature, and humidity strategies based on plant response, linking environmental control directly to plant health, morphology, and yield.',
      'Built reusable, modular control structures to reduce configuration drift and improve scalability across rooms.',
      'Developed internal software tools to improve monitoring, reduce manual checks, and increase system visibility.',
      'Provided technical guidance to growers, aligning environmental strategies with cultivation best practices at scale.',
      'Managed biological risk events — hermaphrodite detection, quarantine zoning, and containment strategies.',
      'Applied and refined plant training techniques, evaluating their impact across different growth stages and room conditions.',
    ],
    tags: ['Damatex', 'HVAC Controls', 'Irrigation Logic', 'Fault Detection', 'VPD Tuning', 'State Validation', 'Internal Tools'],
  },
  {
    title: 'IT Technician & Cultivation Support',
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

        <div className="bg-surface border border-slate-100 rounded-2xl p-5 hover:border-teal/20 hover:shadow-sm transition-all">
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

        {/* Mobile: image below card */}
        <div className="md:hidden mt-4 flex justify-center">
          <img src={role.image} alt={role.imageAlt} className="h-32 w-auto object-contain" />
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
          <span className="text-teal font-mono text-sm font-medium tracking-wide uppercase">Career</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-2">Experience</h2>
        </div>

        <div>
          {ROLES.map((role) => (
            <RoleCard key={`${role.company}-${role.period}`} role={role} />
          ))}
        </div>
      </div>
    </section>
  )
}
