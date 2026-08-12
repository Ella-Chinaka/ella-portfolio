import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: { environment: 'jsdom', setupFiles: ['./test-setup.ts'], exclude: ['e2e/**', 'node_modules/**', '.next/**'] },
  resolve: { alias: { '@': path.resolve(__dirname), 'server-only': path.resolve(__dirname, 'test/server-only.ts') } },
})
