import { expect, test } from '@playwright/test'

test('visitor can navigate the portfolio and use a mocked AI assistant response', async ({ page }) => {
  await page.route('**/api/chat', async (route) => {
    const events = [
      { type: 'start', messageId: 'mocked-assistant' },
      { type: 'text-start', id: 'text-1' },
      { type: 'text-delta', id: 'text-1', delta: 'QueueWise keeps customers informed with wait-time updates.' },
      { type: 'text-end', id: 'text-1' },
      { type: 'finish' },
    ].map((event) => `data: ${JSON.stringify(event)}\n\n`).join('') + 'data: [DONE]\n\n'
    await route.fulfill({ body: events, contentType: 'text/event-stream', headers: { 'x-vercel-ai-ui-message-stream': 'v1' } })
  })

  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Interfaces with purpose, built for people.' })).toBeVisible()
  await page.getByRole('link', { name: 'Explore projects' }).click()
  await expect(page).toHaveURL(/\/projects$/)
  await page.goto('/')
  await page.getByRole('button', { name: 'Ask about QueueWise' }).click()
  await expect(page.getByText('QueueWise keeps customers informed with wait-time updates.')).toBeVisible()
})
