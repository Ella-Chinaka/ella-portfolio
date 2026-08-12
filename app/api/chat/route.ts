import 'server-only'
import { createOpenAI } from '@ai-sdk/openai'
import { convertToModelMessages, stepCountIs, streamText, type UIMessage } from 'ai'
import { getProjectDetails } from '@/lib/ai/tools/get-project-details'

export const maxDuration = 30

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    console.error('Chat API is not configured: OPENAI_API_KEY is missing.')
    return Response.json(
      { error: 'The chat service is not configured. Add OPENAI_API_KEY to .env.local and restart the server.' },
      { status: 500 },
    )
  }

  const { messages }: { messages: UIMessage[] } = await request.json()
  const openai = createOpenAI({ apiKey })

  const result = streamText({
    model: openai(process.env.OPENAI_MODEL ?? 'gpt-4o-mini'),
    system: 'You are a concise portfolio assistant. When the user asks about QueueWise or Meal Planner, call getProjectDetails. Use its returned information and do not invent project facts.',
    messages: await convertToModelMessages(messages),
    tools: { getProjectDetails },
    stopWhen: stepCountIs(2),
  })

  return result.toUIMessageStreamResponse()
}
