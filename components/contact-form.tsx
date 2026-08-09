'use client'

import { FormEvent, useState } from 'react'

export function ContactForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
    event.currentTarget.reset()
  }

  return (
    <form className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" onSubmit={handleSubmit}>
      <div><label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor="name">Name</label><input className="field" id="name" name="name" required /></div>
      <div><label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor="email">Email</label><input className="field" id="email" name="email" required type="email" /></div>
      <div><label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor="message">Message</label><textarea className="field min-h-32 resize-y" id="message" name="message" required /></div>
      <button className="rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2" type="submit">Send message</button>
      {sent && <p className="text-sm font-medium text-teal-800" role="status">Thanks — your message is ready to send.</p>}
    </form>
  )
}
