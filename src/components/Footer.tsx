export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-slate-100 bg-surface">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ink-subtle">
        <p>
          © {new Date().getFullYear()}{' '}
          <span className="text-teal font-medium">Austin O'Neill</span>
        </p>
        <p className="font-mono text-xs">
          Built with React · Deployed on Cloudflare Pages
        </p>
      </div>
    </footer>
  )
}
