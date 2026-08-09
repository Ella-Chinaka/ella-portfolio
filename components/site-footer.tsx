import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-5 py-7 text-sm text-slate-600 sm:flex-row sm:px-8">
        <p>Built with care using Next.js and TypeScript.</p>
        <Link href="/health" className="w-fit font-medium text-teal-700 hover:text-teal-900">System health</Link>
      </div>
    </footer>
  )
}
