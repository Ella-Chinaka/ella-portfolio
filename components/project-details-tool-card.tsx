import type { ProjectDetails } from '@/lib/ai/tools/get-project-details'

type ToolState = 'input-streaming' | 'input-available' | 'output-available' | 'output-error'

type ProjectDetailsToolCardProps = {
  state: ToolState
  projectName?: string
  output?: ProjectDetails
  errorText?: string
}

function projectLabel(projectName?: string) {
  return projectName === 'meal-planner' ? 'Meal Planner' : projectName === 'queuewise' ? 'QueueWise' : 'a project'
}

export function ProjectDetailsToolCard({ state, projectName, output, errorText }: ProjectDetailsToolCardProps) {
  if (state === 'input-streaming') {
    return <div className="tool-state-card" aria-live="polite"><span className="tool-pulse" aria-hidden="true" />Preparing a project lookup…</div>
  }

  if (state === 'input-available') {
    return <div className="tool-state-card" aria-live="polite">Looking up <strong>{projectLabel(projectName)}</strong>…</div>
  }

  if (state === 'output-error') {
    return <div className="tool-state-card border-rose-200 bg-rose-50 text-rose-900" role="alert"><strong>Project details are unavailable.</strong><span>{errorText ?? 'Please try asking again.'}</span></div>
  }

  if (!output) return null

  return (
    <article className="tool-output-card" aria-label={`${output.name} project details`}>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Project details</p>
      <h3 className="mt-2 text-2xl font-bold text-slate-950">{output.name}</h3>
      <p className="mt-3 leading-7 text-slate-600">{output.description}</p>
      <dl className="mt-6 grid gap-5 sm:grid-cols-2">
        <div><dt>Role</dt><dd>{output.role}</dd></div>
        <div><dt>Outcome</dt><dd>{output.outcome}</dd></div>
        <div className="sm:col-span-2"><dt>Problem</dt><dd>{output.problem}</dd></div>
      </dl>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
        {output.technologies.map((technology) => <li className="rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-800" key={technology}>{technology}</li>)}
      </ul>
    </article>
  )
}
