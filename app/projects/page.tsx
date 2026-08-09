import type { Metadata } from 'next'
import { ProjectCard } from '@/components/project-card'
import { projects } from '@/lib/projects'

export const metadata: Metadata = { title: 'Projects', description: 'QueueWise and Meal Planner case studies.' }

export default function ProjectsPage() {
  return <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Selected work</p><h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Products shaped around real-world routines.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">A closer look at how I approach clarity, momentum, and useful outcomes in frontend work.</p><div className="mt-12 grid gap-8">{projects.map((project) => <ProjectCard key={project.name} project={project} />)}</div></main>
}
