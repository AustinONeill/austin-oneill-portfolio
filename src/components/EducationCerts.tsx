import { useInView } from '@/hooks/useInView'

const CERTS = [
  { name: 'CCNA', issuer: 'Cisco', year: '2024', color: 'text-blue-400', bg: 'bg-blue-50 border-blue-100' },
  { name: 'AWS Cloud Foundations', issuer: 'Amazon Web Services', year: '2024', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
  { name: 'CannSell', issuer: 'Cannabis Industry', year: '2024', color: 'text-teal', bg: 'bg-teal/5 border-teal/20' },
  { name: 'INICIA 3', issuer: 'UNAM Mexico City', year: 'In Progress', color: 'text-orange-500', bg: 'bg-orange-50 border-orange-100', inProgress: true },
  { name: 'Claude Certified Architect', issuer: 'Anthropic', year: 'In Progress', color: 'text-purple-500', bg: 'bg-purple-50 border-purple-100', inProgress: true },
]

export default function EducationCerts() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section id="education" className="section-padding">
      <div
        ref={ref}
        className={`container-max transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="mb-12">
          <span className="text-teal font-mono text-sm font-medium tracking-wide uppercase">Background</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-2">Education &amp; Certifications</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Education card */}
          <div className="bg-surface-muted border border-slate-100 rounded-2xl p-6 hover:border-teal/20 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-ink text-lg">Advanced Diploma</h3>
                <p className="text-teal font-medium text-sm">Computer Programming</p>
                <p className="text-ink-muted text-sm mt-1">Durham College · Oshawa, ON</p>
                <p className="text-ink-subtle text-sm">Completed April 2025</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-teal/10 text-teal text-xs font-semibold border border-teal/20">
                    Dean's Honor Roll
                  </span>
                </div>
                <p className="text-ink-subtle text-xs mt-3">
                  Coursework: JavaScript · Python · SQL · Web Development · System Design
                </p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <p className="text-xs font-mono text-ink-subtle uppercase tracking-widest mb-4">Certifications</p>
            <div className="space-y-3">
              {CERTS.map((cert) => (
                <div
                  key={cert.name}
                  className={`flex items-center gap-4 p-4 rounded-xl border ${cert.bg} transition-colors hover:scale-[1.01]`}
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <svg className={`w-4 h-4 ${cert.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-ink text-sm">{cert.name}</p>
                    <p className="text-xs text-ink-muted">{cert.issuer}</p>
                  </div>
                  {cert.inProgress ? (
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 flex-shrink-0">In Progress</span>
                  ) : (
                    <span className="text-xs font-mono text-ink-subtle flex-shrink-0">{cert.year}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
