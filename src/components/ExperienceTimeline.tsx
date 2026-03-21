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
  imageSize?: number
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
    imageSize: 300,
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
    image: '/assets/abba-medix.png',
    imageAlt: 'Abba Medix Corp',
    imageFromRight: false,
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
    image: '/assets/indiva.png',
    imageAlt: 'Indiva — Our Roots Run Deep',
    imageFromRight: true,
    bullets: [
      'Supported high-volume production of vape cartridges and edibles.',
      'Achieved record shift output (3,000+ cartridges) while maintaining quality and compliance standards.',
      'Maintained strict regulatory compliance using CannTrack for tax stamps and batch tracking.',
    ],
    tags: ['Production', 'CannTrack', 'Compliance', 'Batch Tracking', 'GMP'],
  },
]

const IMG_COL = 220 // fixed image column width in px

function RoleCard({ role }: { role: Role }) {
  const [textRef, textInView] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [imgRef, imgProgress] = useScrollProgress<HTMLDivElement>(0.55)

  const imgSize = role.imageSize ?? IMG_COL

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
        className="object-contain"
        style={{ height: imgSize, maxHeight: imgSize, width: imgSize }}
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
