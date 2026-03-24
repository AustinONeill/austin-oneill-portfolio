import { useInView } from '@/hooks/useInView'
import SectionLabel from '@/components/SectionLabel'

interface SkillGroup {
  label: string
  sublabel: string
  skills: string[]
  accent?: boolean
  cannabis?: boolean
  books?: boolean
}

const GROUPS: SkillGroup[] = [
  {
    label: 'Languages & Frameworks',
    sublabel: 'What I write',
    skills: ['JavaScript', 'TypeScript', 'Python', 'HTML5', 'CSS3', 'C#', 'C++', 'Java', 'PHP', 'SQL', 'React', 'Node.js', '.NET'],
  },
  {
    label: 'Tools & Platforms',
    sublabel: 'What I ship with',
    skills: ['Git', 'GitHub', 'VS Code', 'Visual Studio', 'NPM', 'Bootstrap', 'Axios', 'MongoDB', 'Cloudflare', 'AWS'],
  },
  {
    label: 'Development Practices',
    sublabel: 'How I work',
    skills: ['Agile / Scrum', 'Kanban', 'RESTful APIs', 'OOP', 'MVC', 'SDLC', 'No-code tooling'],
  },
  {
    label: 'Controls & Automation',
    sublabel: 'Where I bring uncommon leverage',
    skills: ['Damatex SCADA', 'Formula design & alarm logic', 'Irrigation scheduling & fault detection', 'Environmental control (temp / humidity / CO₂ / VPD)', 'Phase-based lighting (day counters)', 'State-based validation'],
    accent: true,
  },
  {
    label: 'Cultivation & Grow Knowledge',
    sublabel: 'Hands-on plant science',
    skills: [
      'VPD & vapour pressure management',
      'Nutrient feeding schedules & EC/pH balancing',
      'Plant training (LST, topping, SCROG)',
      'IPM & pest / pathogen identification',
      'Propagation — cloning & seedling care',
      'Trichome maturity & harvest indicators',
      'Strain phenotype observation',
      'Grow media — coco, rockwool, soil',
    ],
    cannabis: true,
  },
  {
    label: 'Domain Knowledge',
    sublabel: 'What I know cold',
    skills: ['Cannabis plant lifecycle', 'Health Canada compliance', 'CannTrack / seed-to-sale', 'Production workflows', 'IT support & facility ops'],
    accent: true,
    books: true,
  },
]

function SkillCard({ group, delay }: { group: SkillGroup; delay: number }) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`rounded-2xl border p-4 sm:p-5 transition-all duration-500 relative overflow-hidden ${
        group.cannabis
          ? 'bg-green-950 border-green-700/40 text-white'
          : group.accent
          ? 'bg-surface-dark/[0.99] border-teal/20 text-white'
          : 'bg-surface-muted border-slate-100 hover:border-teal/20'
      } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {group.cannabis && (
        <div className="absolute -right-8 -bottom-4 w-48 pointer-events-none select-none">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(74,222,128,0.65) 0%, rgba(34,197,94,0.25) 45%, transparent 72%)',
              animation: 'gear-glow-pulse 3s ease-in-out infinite',
            }}
          />
          <img
            src="/cannabis-leaf-cyber.png"
            aria-hidden="true"
            className="relative w-full opacity-60"
          />
        </div>
      )}
      {group.books && (
        <div className="absolute -right-6 -bottom-4 w-44 pointer-events-none select-none">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(ellipse at 60% 80%, rgba(20,184,166,0.7) 0%, rgba(20,184,166,0.25) 45%, transparent 72%)',
              animation: 'gear-glow-pulse 2.8s ease-in-out infinite',
            }}
          />
          <img
            src="/domain-books.png"
            aria-hidden="true"
            className="relative w-full opacity-70"
          />
        </div>
      )}
      {group.accent && !group.cannabis && !group.books && (
        <div className="absolute -left-8 -bottom-8 w-32 h-32 pointer-events-none select-none">
          {/* pulsing teal glow behind the gear */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(20,184,166,0.8) 0%, rgba(20,184,166,0.3) 45%, transparent 75%)',
              animation: 'gear-glow-pulse 2.5s ease-in-out infinite',
            }}
          />
          <div
            className="absolute inset-0"
            style={{ animation: 'spin 18s linear infinite', transformOrigin: 'center', transformStyle: 'flat' }}
          >
            <img
              src="/controls-gear.png"
              aria-hidden="true"
              className="w-full h-full object-contain opacity-60"
            />
          </div>
        </div>
      )}
      <div className="relative z-10 mb-4">
        <div className={`w-1 h-5 rounded-full mb-2 ${group.cannabis ? 'bg-green-400' : 'bg-teal'}`} aria-hidden="true" />
        <h3 className={`font-bold text-base ${group.accent || group.cannabis ? 'text-white' : 'text-ink'}`}>
          {group.cannabis && <span className="mr-1.5" aria-hidden="true">🌿</span>}
          {group.label}
        </h3>
        <p className={`text-xs mt-0.5 font-mono ${
          group.cannabis ? 'text-green-400' : group.accent ? 'text-teal-light' : 'text-ink-subtle'
        }`}>
          {group.sublabel}
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2">
        {group.skills.map((skill, i) => (
          <span
            key={skill}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
              group.cannabis
                ? 'bg-green-900/60 text-green-300 border border-green-700/40'
                : group.accent
                ? 'bg-teal/10 text-teal-light border border-teal/15'
                : 'bg-surface border border-slate-150 text-ink-muted'
            }`}
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(6px)',
              transitionDelay: isInView ? `${200 + i * 40}ms` : '0ms',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function SkillsStack() {
  return (
    <section id="skills" className="section-padding bg-surface-muted">
      <div className="container-max">
        <div className="mb-8 sm:mb-12">
          <SectionLabel>Capabilities</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-2">Skills &amp; Stack</h2>
          <p className="text-ink-muted mt-3 max-w-xl">
            What I work with day-to-day — across both software and the plant floor.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GROUPS.map((group, i) => (
            <SkillCard key={group.label} group={group} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}
