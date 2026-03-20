import { useState } from 'react'
import { useActiveSection } from '@/hooks/useActiveSection'

const NAV_LINKS = [
  { label: 'Profile', href: '#profile' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const SECTION_IDS = ['hero', 'profile', 'experience', 'skills', 'projects', 'cannabis', 'education', 'contact']

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)

  const isActive = (href: string) => {
    const id = href.replace('#', '')
    return activeSection === id
  }

  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-sm border-b border-slate-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: name + role */}
        <a href="#hero" className="group flex flex-col leading-tight">
          <span className="font-bold text-ink text-base tracking-tight group-hover:text-teal transition-colors">
            Austin O'Neill
          </span>
          <span className="text-xs text-ink-subtle font-mono hidden sm:block">
            Controls · Software · Cannabis
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-teal ${
                isActive(link.href)
                  ? 'text-teal'
                  : 'text-ink-muted'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/assets/austin-oneill-resume.pdf"
            download
            className="ml-2 px-4 py-2 rounded-lg bg-teal text-white text-sm font-semibold hover:bg-teal-dark transition-colors"
          >
            Download Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-ink-muted hover:text-teal hover:bg-surface-muted transition-colors"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-surface px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium py-1 transition-colors hover:text-teal ${
                isActive(link.href) ? 'text-teal' : 'text-ink-muted'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/assets/austin-oneill-resume.pdf"
            download
            className="mt-1 px-4 py-2 rounded-lg bg-teal text-white text-sm font-semibold text-center hover:bg-teal-dark transition-colors"
          >
            Download Resume
          </a>
        </div>
      )}
    </header>
  )
}
