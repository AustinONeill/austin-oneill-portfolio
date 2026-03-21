import { useState, FormEvent } from 'react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) return

    setFormState('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      setFormState(res.ok ? 'success' : 'error')
    } catch {
      setFormState('error')
    }
  }

  return (
    <section id="contact" className="section-padding bg-surface-muted">
      <div className="container-max">
        <div className="mb-12">
          <span className="text-teal font-mono text-sm font-medium tracking-wide uppercase">Get in touch</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-2">Let's Talk</h2>
          <p className="text-ink-muted mt-3 max-w-lg leading-relaxed">
            Interested in building more resilient cannabis facilities or internal tools?
            I'm open to full-time roles and contract work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact details */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-mono text-ink-subtle uppercase tracking-widest mb-4">Direct contact</p>
              <div className="space-y-3">
                <a
                  href="mailto:austinoneill55@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface hover:text-teal transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal/10 border border-teal/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-ink-subtle">Email</p>
                    <p className="text-sm font-medium text-ink group-hover:text-teal transition-colors">austinoneill55@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+12267006808"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface hover:text-teal transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal/10 border border-teal/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-ink-subtle">Phone</p>
                    <p className="text-sm font-medium text-ink group-hover:text-teal transition-colors">226-700-6808</p>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs font-mono text-ink-subtle uppercase tracking-widest mb-4">Find me online</p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/AustinONeill"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-ink text-sm font-medium hover:border-teal hover:text-teal transition-colors"
                >
                  <GitHubIcon />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/austinoneill"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-ink text-sm font-medium hover:border-teal hover:text-teal transition-colors"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            {formState === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-teal/5 rounded-2xl border border-teal/20">
                <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-bold text-ink text-lg mb-1">Message sent</h3>
                <p className="text-ink-muted text-sm">I'll get back to you within a day or two.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink-muted mb-1.5">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors placeholder:text-ink-subtle"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink-muted mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors placeholder:text-ink-subtle"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ink-muted mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors placeholder:text-ink-subtle resize-none"
                    placeholder="What's on your mind?"
                  />
                </div>

                {formState === 'error' && (
                  <p className="text-red-500 text-sm">Something went wrong. Try emailing me directly.</p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full py-3 rounded-xl bg-teal/96 text-white font-semibold text-sm hover:bg-teal-dark/96 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {formState === 'submitting' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
