# Portfolio

## Project-details AI tool

The server-only `getProjectDetails` tool lives in `lib/ai/tools/get-project-details.ts` and is registered by `app/api/chat/route.ts`.

- **Name:** `getProjectDetails`
- **Input:** `z.object({ projectName: z.enum(['queuewise', 'meal-planner']) })`
- **Return shape:** `{ name, description, technologies, role, problem, outcome }`, where `technologies` is a string array and every other field is a string.

The tool is available only to the server-side AI route. Add `OPENAI_API_KEY` (and optionally `OPENAI_MODEL`) to a local `.env` file; neither variable uses the `NEXT_PUBLIC_` prefix.
