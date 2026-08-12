'use client'

import { AnimatePresence, motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type SendButtonProps = Omit<HTMLMotionProps<'button'>, 'children' | 'onClick'> & {
  /** Called once per submission. Resolve for success or reject to show the retry state. */
  onSend: () => Promise<unknown>
  idleLabel?: string
  loadingLabel?: string
  successLabel?: string
  errorLabel?: string
}

type SendState = 'idle' | 'loading' | 'success' | 'error'

const RESET_DELAY = 1400

function SendIcon({ state }: { state: SendState }) {
  if (state === 'loading') {
    return <motion.span aria-hidden="true" className="send-button-spinner" animate={{ rotate: 360 }} transition={{ duration: 0.8, ease: 'linear', repeat: Infinity }} />
  }

  if (state === 'success') {
    return <motion.svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 20 20" initial={{ opacity: 0, pathLength: 0 }} animate={{ opacity: 1, pathLength: 1 }} transition={{ duration: 0.22, ease: 'easeOut' }}><motion.path d="m4 10 3.5 3.5L16 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></motion.svg>
  }

  if (state === 'error') {
    return <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 20 20"><path d="M10 4v6m0 3h.01" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /><circle cx="10" cy="10" fill="none" r="7" stroke="currentColor" strokeWidth="2" /></svg>
  }

  return <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 20 20"><path d="m3 10 13-6-4.5 12-2.5-5.5L3 10Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" /><path d="m9 10.5 3.5-3" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /></svg>
}

export function SendButton({
  onSend,
  idleLabel = 'Send',
  loadingLabel = 'Sending',
  successLabel = 'Sent',
  errorLabel = 'Retry',
  disabled = false,
  className = '',
  type = 'button',
  ...buttonProps
}: SendButtonProps) {
  const [state, setState] = useState<SendState>('idle')
  const isSubmitting = useRef(false)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current)
  }, [])

  const label = state === 'loading' ? loadingLabel : state === 'success' ? successLabel : state === 'error' ? errorLabel : idleLabel
  const isUnavailable = disabled || state === 'loading' || state === 'success'

  async function handleClick() {
    if (isSubmitting.current || isUnavailable) return
    if (resetTimer.current) clearTimeout(resetTimer.current)

    isSubmitting.current = true
    setState('loading')

    try {
      await onSend()
      setState('success')
      resetTimer.current = setTimeout(() => setState('idle'), RESET_DELAY)
    } catch {
      setState('error')
    } finally {
      isSubmitting.current = false
    }
  }

  const stateMotion = state === 'error' && !prefersReducedMotion
    ? { x: [0, -7, 6, -4, 2, 0] }
    : { x: 0, scale: state === 'success' ? 1.02 : 1 }

  return (
    <motion.button
      {...buttonProps}
      type={type}
      className={`send-button ${state === 'error' ? 'send-button-error' : ''} ${className}`}
      aria-label={buttonProps['aria-label'] ?? label}
      data-state={state}
      disabled={isUnavailable}
      onClick={handleClick}
      animate={stateMotion}
      transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: 'easeOut' }}
    >
      <span className="send-button-icon"><SendIcon state={state} /></span>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span key={label} initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -6 }} transition={{ duration: prefersReducedMotion ? 0 : 0.18, ease: 'easeOut' }}>{label}</motion.span>
      </AnimatePresence>
      <span aria-live="polite" className="sr-only">{state === 'loading' ? 'Sending request' : state === 'success' ? 'Request sent successfully' : state === 'error' ? 'Request failed. Retry is available.' : ''}</span>
    </motion.button>
  )
}
