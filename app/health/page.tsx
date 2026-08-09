import type { Metadata } from 'next'
import { getHealthData } from '@/lib/health'

export const metadata: Metadata = { title: 'Health check' }
export const dynamic = 'force-dynamic'

export default async function HealthPage() {
  const health = await getHealthData()
  return <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">System status</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">Health check</h1><section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="health-status"><h2 className="sr-only" id="health-status">Current health status</h2><p className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${health.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{health.ok ? 'Healthy' : 'Unhealthy'}</p><dl className="mt-6 space-y-4"><div><dt className="font-semibold text-slate-900">Response</dt><dd className="mt-1 break-words text-slate-600">{health.message}</dd></div><div><dt className="font-semibold text-slate-900">Checked at</dt><dd className="mt-1 text-slate-600"><time dateTime={health.checkedAt}>{health.checkedAt}</time></dd></div></dl></section></main>
}
