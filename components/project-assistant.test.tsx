import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ProjectAssistant } from './project-assistant'

const mockUseChat = vi.hoisted(() => vi.fn())

vi.mock('@ai-sdk/react', () => ({ useChat: mockUseChat }))

const queueWiseDetails = {
  name: 'QueueWise',
  description: 'A calm queue-management experience.',
  technologies: ['React', 'TypeScript'],
  role: 'Frontend developer',
  problem: 'Uncertain wait times.',
  outcome: 'Clearer customer updates.',
}

function renderAssistant(overrides: Record<string, unknown> = {}) {
  const sendMessage = vi.fn()
  mockUseChat.mockReturnValue({ messages: [], sendMessage, status: 'ready', error: undefined, ...overrides })
  render(<ProjectAssistant />)
  return sendMessage
}

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('ProjectAssistant', () => {
  it('renders pending feedback while a mocked request is submitted', () => {
    renderAssistant({ status: 'submitted' })
    expect(screen.getByText(/Sending your question/)).toBeInTheDocument()
  })

  it('renders streaming assistant text from the mocked AI route', () => {
    renderAssistant({ status: 'streaming', messages: [{ id: 'assistant-1', role: 'assistant', parts: [{ type: 'text', text: 'QueueWise is loading details.' }] }] })
    expect(screen.getByText('QueueWise is loading details.')).toBeInTheDocument()
  })

  it('renders a successful tool result from the mocked AI route', () => {
    renderAssistant({ messages: [{ id: 'assistant-1', role: 'assistant', parts: [{ type: 'tool-getProjectDetails', state: 'output-available', input: { projectName: 'queuewise' }, output: queueWiseDetails }] }] })
    expect(screen.getByRole('article', { name: 'QueueWise project details' })).toHaveTextContent('Clearer customer updates.')
  })

  it('renders an error alert when the mocked AI route fails', () => {
    renderAssistant({ error: new Error('Mock route failed') })
    expect(screen.getByRole('alert')).toHaveTextContent('The assistant could not respond')
  })

  it('sends the QueueWise prompt through the mocked chat client', () => {
    const sendMessage = renderAssistant()
    fireEvent.click(screen.getByRole('button', { name: 'Ask about QueueWise' }))
    expect(sendMessage).toHaveBeenCalledWith({ text: 'Tell me about QueueWise.' })
  })
})
