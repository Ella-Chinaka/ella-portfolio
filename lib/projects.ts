export type Project = {
  name: string
  summary: string
  challenge: string
  outcome: string
  technologies: string[]
}

export const projects: Project[] = [
  {
    name: 'QueueWise',
    summary: 'A clearer way for service teams to manage walk-in demand and keep people informed.',
    challenge: 'Waiting rooms often leave customers uncertain and staff without a shared view of the line.',
    outcome: 'QueueWise brings status, estimated wait times, and service updates into one calm, accessible experience.',
    technologies: ['React', 'TypeScript', 'Realtime updates', 'Accessible UI'],
  },
  {
    name: 'Meal Planner',
    summary: 'A practical weekly planning tool for turning recipes into less stressful grocery trips.',
    challenge: 'Planning meals, tracking ingredients, and adapting a menu to a busy week can be fragmented.',
    outcome: 'Meal Planner makes the weekly view, meal ideas, and a useful shopping list feel like one simple flow.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Responsive design'],
  },
]
