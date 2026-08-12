'use client'

import { useState, type FormEvent } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import type { ProjectDetails } from '@/lib/ai/tools/get-project-details'
import { ProjectDetailsToolCard } from './project-details-tool-card'

type ProjectToolPart = {
  type: 'tool-getProjectDetails'
  state: 'input-streaming' | 'input-available' | 'output-available' | 'output-error'
  input?: { projectName?: string }
  output?: ProjectDetails
  errorText?: string
}

export function ProjectAssistant() {
  const [input, setInput] = useState('')
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const prompt = input.trim()
    if (!prompt) return
    sendMessage({ text: prompt })
    setInput('')
  }

  function askAbout(project: string) {
    sendMessage({ text: `Tell me about ${project}.` })
  }

  return (
    <section className="border-y border-slate-200 bg-white px-5 py-16 sm:px-8" aria-labelledby="assistant-title">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">AI project guide</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950" id="assistant-title">Ask about the work behind the screen.</h2>
        <p className="mt-3 leading-7 text-slate-600">Try QueueWise or Meal Planner to see verified project details.</p>
        <div className="mt-5 flex flex-wrap gap-3"><button className="assistant-prompt" onClick={() => askAbout('QueueWise')} type="button">Ask about QueueWise</button><button className="assistant-prompt" onClick={() => askAbout('Meal Planner')} type="button">Ask about Meal Planner</button></div>
        <div className="mt-7 space-y-4" aria-live="polite">
          {messages.map((message) => <div key={message.id} className={message.role === 'user' ? 'ml-auto max-w-xl rounded-2xl bg-slate-950 px-4 py-3 text-white' : 'max-w-2xl'}>
            {message.parts.map((part, index) => {
              if (part.type === 'text') return <p className="leading-7" key={`${message.id}-${index}`}>{part.text}</p>
              if (part.type === 'tool-getProjectDetails') {
                const toolPart = part as unknown as ProjectToolPart
                return <ProjectDetailsToolCard errorText={toolPart.errorText} key={toolPart.type + index} output={toolPart.output} projectName={toolPart.input?.projectName} state={toolPart.state} />
              }
              return null
            })}
          </div>)}
          {status === 'submitted' && <p className="text-sm text-slate-500">Sending your question…</p>}
          {error && <p className="tool-state-card border-rose-200 bg-rose-50 text-rose-900" role="alert">The assistant could not respond. Check the server configuration and try again.</p>}
        </div>
        <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={submit}>
          <label className="sr-only" htmlFor="project-question">Ask about a project</label>
          <input className="field flex-1" id="project-question" onChange={(event) => setInput(event.target.value)} placeholder="What was the problem QueueWise solved?" value={input} />
          <button className="rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60" disabled={!input.trim() || status === 'streaming' || status === 'submitted'} type="submit">Ask assistant</button>
        </form>
      </div>
    </section>
  )
}
