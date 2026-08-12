import 'server-only'
import { tool } from 'ai'
import { z } from 'zod'

export const projectNameSchema = z.enum(['queuewise', 'meal-planner']).describe('The project identifier to look up.')

export const getProjectDetailsInputSchema = z.object({
  projectName: projectNameSchema,
})

export type ProjectDetails = {
  name: string
  description: string
  technologies: string[]
  role: string
  problem: string
  outcome: string
}

const detailsByProject: Record<z.infer<typeof projectNameSchema>, ProjectDetails> = {
  queuewise: {
    name: 'QueueWise',
    description: 'A queue-management experience that keeps customers informed and service teams coordinated.',
    technologies: ['React', 'TypeScript', 'Realtime updates', 'Accessible UI'],
    role: 'Frontend developer — information architecture, responsive interface design, and accessible interaction patterns.',
    problem: 'Customers were uncertain about their place in line while teams lacked one clear view of demand.',
    outcome: 'A shared, calm queue view with status updates and estimated wait times that reduces uncertainty.',
  },
  'meal-planner': {
    name: 'Meal Planner',
    description: 'A weekly meal-planning tool that connects recipes, routines, and grocery preparation.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Responsive design'],
    role: 'Frontend developer — planning flows, responsive layouts, and reusable interface components.',
    problem: 'Weekly meal decisions and shopping lists were fragmented across notes, recipes, and busy schedules.',
    outcome: 'One practical flow for planning meals, adapting a week, and creating a useful grocery list.',
  },
}

export function lookupProjectDetails(projectName: z.infer<typeof projectNameSchema>): ProjectDetails {
  return detailsByProject[projectName]
}

export const getProjectDetails = tool({
  description: 'Get verified portfolio details for QueueWise or Meal Planner. Use this whenever a user asks about either project.',
  inputSchema: getProjectDetailsInputSchema,
  execute: async ({ projectName }): Promise<ProjectDetails> => lookupProjectDetails(projectName),
})
