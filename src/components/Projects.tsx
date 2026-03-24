import { useInView } from '@/hooks/useInView'
import { useState } from 'react'
import ParticleBackground from './ParticleBackground'
import SectionLabel from '@/components/SectionLabel'

const SCREENSHOTS = [
  { src: '/canntycoon-dashboard.png', label: 'Dashboard' },
  { src: '/canntycoon-facility.png', label: 'Facility' },
]

const TEAL_GLOW = '0 0 0 1px rgba(20,184,166,0.35), 0 0 14px rgba(20,184,166,0.2)'

function ScreenshotCarousel() {
  const [active, setActive] = useState(0)
  return (
    <div className="flex flex-col gap-2">
      <div
        className="rounded-xl overflow-hidden"
        style={{ boxShadow: TEAL_GLOW }}
      >
        <img
          src={SCREENSHOTS[active].src}
          alt={`CannTycoon ${SCREENSHOTS[active].label} view`}
          className="w-full object-cover max-h-48 sm:max-h-none"
        />
      </div>
      <div
        className="flex gap-1 p-2 bg-black/40 rounded-xl"
        style={{ boxShadow: TEAL_GLOW }}
      >
        {SCREENSHOTS.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setActive(i)}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
              i === active
                ? 'bg-teal text-white'
                : 'text-slate-400 hover:text-teal'
            }`}
          >
            {s.label}
          </button>
        ))}
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
          <SectionLabel>Work</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-2">Projects</h2>
        </div>

        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-6 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* CannTycoon — dark card */}
          <div className="group relative bg-surface-dark rounded-3xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal/10 transition-all duration-300 flex flex-col overflow-hidden">
            <ParticleBackground density={3} color="#14b8a6" speed={0.5} linkDistance={75} />
            <div className="relative z-10 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <span className="text-xs font-mono text-teal uppercase tracking-widest">Featured</span>
                  <img
                    src="/canntycoon-logo.png"
                    alt="CannTycoon — Grow Your Empire"
                    className="h-20 w-auto mt-1 -ml-1 drop-shadow-lg"
                  />
                  <p className="text-ink-subtle text-sm mt-1">Controls Simulation & Dashboard</p>
                </div>
                <span className="px-2 py-1 rounded-lg bg-teal/10 text-teal text-xs font-mono border border-teal/20 self-start">
                  WIP
                </span>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                A cannabis cultivation simulation that puts you in the driver's seat of your own
                facility — design your rooms, dial in environmental conditions, and manage resources
                as your plants move from seed to harvest. Balance temperature, humidity, lighting,
                and irrigation while responding to real-time feedback, unexpected issues, and system
                failures. Built around dynamic systems and feedback loops, the game challenges you
                to think like both a grower and a control systems operator.
              </p>

              <ScreenshotCarousel />

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

              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <a
                  href="https://github.com/AustinONeill"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center px-4 py-2 rounded-xl bg-teal text-white text-sm font-semibold hover:bg-teal-dark transition-colors"
                >
                  View on GitHub
                </a>
                <a
                  href="https://canntycoon.pages.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center px-4 py-2 rounded-xl border border-teal/30 text-teal text-sm font-semibold hover:bg-teal/10 transition-colors"
                >
                  Live Demo
                </a>
              </div>
            </div>
          </div>

          {/* GitHub Projects — light card */}
          <div className="group relative bg-surface-muted rounded-3xl p-6 border border-slate-100 hover:border-teal/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
            {/* decorative plant — centered behind project pills */}
            <img
              src="/cyber-plant.png"
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 opacity-15 pointer-events-none select-none"
            />
            <div className="mb-5">
              <span className="text-xs font-mono text-teal uppercase tracking-widest">GitHub</span>
              <h3 className="text-xl font-bold text-ink mt-1">Open Source &amp; Portfolio</h3>
              <p className="text-ink-subtle text-sm mt-0.5">Projects live on GitHub</p>
            </div>

            <div className="flex flex-col gap-4 flex-1">
              {[
                {
                  name: 'austin-oneill-portfolio',
                  url: 'https://github.com/AustinONeill/austin-oneill-portfolio',
                  desc: 'This site — an interactive resume built with React, TypeScript, and Tailwind CSS, deployed on Cloudflare Pages.',
                  tags: ['TypeScript', 'React', 'Cloudflare'],
                },
                {
                  name: 'simple-weather-app',
                  url: 'https://github.com/AustinONeill/simple-weather-app',
                  desc: 'Live weather lookup with real-time API data — location search, current conditions, and a clean vanilla JS interface.',
                  tags: ['JavaScript', 'REST API'],
                },
                {
                  name: 'ygo-mmo',
                  url: 'https://github.com/AustinONeill/ygo-mmo',
                  desc: 'A Yu-Gi-Oh MMO built in TypeScript — turn-based dueling, world exploration, and persistent player progression across a tiled game world.',
                  tags: ['TypeScript', 'React', 'Game Dev'],
                },
                {
                  name: 'mtl-missioncontrol',
                  url: 'https://github.com/AustinONeill/mtl-missioncontrol',
                  desc: 'Real-time cannabis facility dashboard — isometric facility map, drag-and-drop overlay management, compliance logging, room transfers, and live multi-user sync via WebSocket.',
                  tags: ['React', 'Hono', 'Cloudflare Workers', 'Durable Objects', 'Neon', 'WebSocket'],
                },
              ].map((project) => (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/proj rounded-2xl border border-slate-100 bg-surface p-4 hover:border-teal/30 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <svg className="w-3.5 h-3.5 text-ink-subtle flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span className="text-sm font-mono font-semibold text-ink group-hover/proj:text-teal transition-colors">
                      {project.name}
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed mb-2">{project.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-surface-muted border border-slate-100 text-ink-subtle text-xs font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
