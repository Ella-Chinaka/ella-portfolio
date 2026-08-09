export type HealthData = {
  ok: boolean
  message: string
  checkedAt: string
}

export async function getHealthData(): Promise<HealthData> {
  const url = process.env.HEALTHCHECK_URL ?? 'https://api.github.com/zen'

  try {
    const response = await fetch(url, { cache: 'no-store' })
    const message = (await response.text()).trim()

    return {
      ok: response.ok,
      message: response.ok ? message || 'External health check responded successfully.' : `Health check returned HTTP ${response.status}.`,
      checkedAt: new Date().toISOString(),
    }
  } catch {
    return { ok: false, message: 'Unable to reach the configured health-check service.', checkedAt: new Date().toISOString() }
  }
}
