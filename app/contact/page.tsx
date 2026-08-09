import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return <main className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24"><div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]"><section><p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Contact</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Let&apos;s make something useful.</h1><p className="mt-6 text-lg leading-8 text-slate-600">Tell me about the problem you are solving, the people you are building for, or the next idea you want to explore.</p><dl className="mt-10 space-y-5 text-slate-600"><div><dt className="font-semibold text-slate-900">Email</dt><dd className="mt-1"><a className="text-teal-700 hover:text-teal-900" href="mailto:ellachinaka16@gmail.com">ellachinaka16@gmail.com</a></dd></div><div><dt className="font-semibold text-slate-900">Availability</dt><dd className="mt-1">Open to thoughtful collaborations and frontend opportunities.</dd></div></dl></section><ContactForm /></div></main>
}
