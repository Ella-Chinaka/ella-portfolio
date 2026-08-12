import { spawn } from 'node:child_process'

const next = spawn(process.execPath, ['./node_modules/next/dist/bin/next', 'dev'], { stdio: 'inherit' })
const baseUrl = 'http://localhost:3000'

async function waitForServer() {
  const deadline = Date.now() + 30000
  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl)
      if (response.ok) return
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250))
  }
  throw new Error('Next.js did not start within 30 seconds.')
}

function stopServer() {
  if (next.exitCode !== null) return
  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', String(next.pid), '/T', '/F'], { stdio: 'ignore' })
  } else {
    next.kill('SIGTERM')
  }
}

try {
  await waitForServer()
  const playwright = spawn(process.execPath, ['./node_modules/@playwright/test/cli.js', 'test'], { stdio: 'inherit' })
  const exitCode = await new Promise((resolve) => playwright.on('exit', (code) => resolve(code ?? 1)))
  process.exitCode = exitCode
} catch (error) {
  console.error(error)
  process.exitCode = 1
} finally {
  stopServer()
  next.unref()
}
