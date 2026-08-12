import Link from 'next/link'
import { ProjectCard } from '@/components/project-card'
import { ProjectAssistant } from '@/components/project-assistant'
import { projects } from '@/lib/projects'

export default function HomePage() {
  return (
    <main>
      <section className="bg-slate-950 px-5 py-20 text-white sm:px-8 sm:py-28"><div className="mx-auto max-w-6xl"><p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">Frontend developer</p><h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">Interfaces with purpose, built for people.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">I turn complex workflows into thoughtful, accessible web experiences with React, Next.js, and TypeScript.</p><div className="mt-9 flex flex-wrap gap-4"><Link className="rounded-lg bg-teal-400 px-5 py-3 font-semibold text-slate-950 hover:bg-teal-300" href="/projects">Explore projects</Link><Link className="rounded-lg border border-slate-600 px-5 py-3 font-semibold hover:border-teal-300" href="/contact">Start a conversation</Link></div></div></section>
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Selected work</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Projects that make everyday tasks easier.</h2></div><Link className="font-semibold text-teal-700 hover:text-teal-900" href="/projects">View all work →</Link></div><div className="mt-8 grid gap-6 lg:grid-cols-2">{projects.map((project) => <ProjectCard key={project.name} project={project} />)}</div></section>
      <section className="border-y border-teal-100 bg-teal-50 px-5 py-16 sm:px-8"><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">How I work</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Clear thinking, reliable delivery, and inclusive details.</h2><p className="mt-5 leading-7 text-slate-600">From early wireframes to polished interfaces, I focus on the decisions that make a product easy to understand and satisfying to use.</p></div></section>
      <ProjectAssistant />
    </main>
  )
}
