import { describe, expect, it } from 'vitest'
import { getProjectDetailsInputSchema, lookupProjectDetails } from './get-project-details'

describe('getProjectDetails', () => {
  it('accepts only the supported project identifiers', () => {
    expect(getProjectDetailsInputSchema.safeParse({ projectName: 'queuewise' }).success).toBe(true)
    expect(getProjectDetailsInputSchema.safeParse({ projectName: 'meal-planner' }).success).toBe(true)
    expect(getProjectDetailsInputSchema.safeParse({ projectName: 'other-project' }).success).toBe(false)
  })

  it('returns structured QueueWise project details', () => {
    expect(lookupProjectDetails('queuewise')).toMatchObject({
      name: 'QueueWise',
      technologies: expect.any(Array),
      role: expect.any(String),
      problem: expect.any(String),
      outcome: expect.any(String),
    })
  })
})
