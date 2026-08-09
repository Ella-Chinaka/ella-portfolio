import type { Project } from '@/lib/projects'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-8">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Case study</p>
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">{project.name}</h2>
      <p className="mt-4 leading-7 text-slate-600">{project.summary}</p>
      <dl className="mt-6 space-y-4 border-t border-slate-100 pt-6 text-sm leading-6">
        <div><dt className="font-semibold text-slate-900">The challenge</dt><dd className="mt-1 text-slate-600">{project.challenge}</dd></div>
        <div><dt className="font-semibold text-slate-900">The approach</dt><dd className="mt-1 text-slate-600">{project.outcome}</dd></div>
      </dl>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
        {project.technologies.map((technology) => <li className="rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-800" key={technology}>{technology}</li>)}
      </ul>
    </article>
  )
}
