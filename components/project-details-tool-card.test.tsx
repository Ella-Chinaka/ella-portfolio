import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProjectDetailsToolCard } from './project-details-tool-card'

const details = {
  name: 'QueueWise',
  description: 'A clear queue management experience.',
  technologies: ['React', 'TypeScript'],
  role: 'Frontend developer',
  problem: 'Uncertain wait times.',
  outcome: 'A clearer customer journey.',
}

describe('ProjectDetailsToolCard', () => {
  it('shows the streaming state', () => {
    render(<ProjectDetailsToolCard state="input-streaming" />)
    expect(screen.getByText('Preparing a project lookup…')).toBeInTheDocument()
  })

  it('shows the requested project once input is available', () => {
    render(<ProjectDetailsToolCard projectName="meal-planner" state="input-available" />)
    expect(screen.getByText('Meal Planner')).toBeInTheDocument()
  })

  it('renders structured project details when output is available', () => {
    render(<ProjectDetailsToolCard output={details} state="output-available" />)
    expect(screen.getByRole('article', { name: 'QueueWise project details' })).toBeInTheDocument()
    expect(screen.getByText('A clearer customer journey.')).toBeInTheDocument()
  })

  it('renders a designed error state', () => {
    render(<ProjectDetailsToolCard errorText="Lookup failed." state="output-error" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Lookup failed.')
  })
})
