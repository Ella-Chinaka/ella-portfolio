'use client'

import { SendButton } from '@/components/send-button'

function fakeRequest(shouldFail: boolean) {
  return new Promise<void>((resolve, reject) => {
    const delay = 450 + Math.round(Math.random() * 850)
    setTimeout(() => shouldFail ? reject(new Error('Demo request failed')) : resolve(), delay)
  })
}

export default function ButtonDemoPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Interaction study</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">Button motion</h1>
      <p className="mt-4 max-w-2xl leading-7 text-slate-600">Try both outcomes. Each button uses a fake request with a random delay, so no network request is made.</p>

      <section aria-label="Send button demonstrations" className="mt-10 grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2">
        <div className="rounded-xl bg-teal-50 p-5"><h2 className="font-semibold text-slate-950">Success path</h2><p className="mt-2 text-sm leading-6 text-slate-600">The checkmark confirms completion before the control settles back to Send.</p><SendButton className="mt-5" onSend={() => fakeRequest(false)} /></div>
        <div className="rounded-xl bg-rose-50 p-5"><h2 className="font-semibold text-slate-950">Error path</h2><p className="mt-2 text-sm leading-6 text-slate-600">This request fails intentionally. The error state remains available as Retry.</p><SendButton className="mt-5" onSend={() => fakeRequest(true)} /></div>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6" aria-labelledby="motion-notes">
        <h2 className="text-xl font-bold text-slate-950" id="motion-notes">Motion choices</h2>
        <p className="mt-3 leading-7 text-slate-600">Labels crossfade and move 6px over 180ms with an ease-out curve, while state changes use a 320ms ease-out transition. Loading rotates steadily at 800ms per turn; errors shake once to draw attention without looping. Success holds for 1.4 seconds before returning to idle. With reduced motion enabled, state feedback, labels, focus, and icons remain, while movement is removed.</p>
      </section>
    </main>
  )
}
