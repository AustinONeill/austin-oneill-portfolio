import { useInView } from '@/hooks/useInView'

interface SkillGroup {
  label: string
  sublabel: string
  skills: string[]
  accent?: boolean
}

const GROUPS: SkillGroup[] = [
  {
    label: 'Languages & Frameworks',
    sublabel: 'What I write',
    skills: ['JavaScript', 'TypeScript', 'Python', 'HTML5', 'CSS3', 'C#', 'SQL', 'React', 'Node.js', '.NET'],
  },
  {
    label: 'Tools & Platforms',
    sublabel: 'What I ship with',
    skills: ['Git', 'GitHub', 'VS Code', 'Visual Studio', 'NPM', 'Bootstrap', 'Axios', 'MongoDB', 'Cloudflare'],
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
    label: 'Domain Knowledge',
    sublabel: 'What I know cold',
    skills: ['Cannabis plant lifecycle', 'Health Canada compliance', 'CannTrack / seed-to-sale', 'Production workflows', 'IT support & facility ops'],
    accent: true,
  },
]

function SkillCard({ group, delay }: { group: SkillGroup; delay: number }) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`rounded-2xl border p-5 transition-all duration-500 ${
        group.accent
          ? 'bg-surface-dark border-teal/20 text-white'
          : 'bg-surface-muted border-slate-100 hover:border-teal/20'
      } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-4">
        <div className="w-1 h-5 rounded-full bg-teal mb-2" aria-hidden="true" />
        <h3 className={`font-bold text-base ${group.accent ? 'text-white' : 'text-ink'}`}>
          {group.label}
        </h3>
        <p className={`text-xs mt-0.5 font-mono ${group.accent ? 'text-teal-light' : 'text-ink-subtle'}`}>
          {group.sublabel}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
              group.accent
                ? 'bg-teal/10 text-teal-light border border-teal/15'
                : 'bg-surface border border-slate-150 text-ink-muted'
            }`}
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
        <div className="mb-12">
          <span className="text-teal font-mono text-sm font-medium tracking-wide uppercase">Capabilities</span>
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
