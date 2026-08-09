import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-950">Portfolio<span className="text-teal-600">.</span></Link>
        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-slate-600">
            {links.map((link) => <li key={link.href}><Link className="transition hover:text-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-4" href={link.href}>{link.label}</Link></li>)}
          </ul>
        </nav>
      </div>
    </header>
  )
}
