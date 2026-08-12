import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { SendButton } from './send-button'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('SendButton', () => {
  it('prevents duplicate clicks while loading and returns to idle after success', async () => {
    vi.useFakeTimers()
    let complete: (() => void) | undefined
    const onSend = vi.fn(() => new Promise<void>((resolve) => { complete = resolve }))
    render(<SendButton onSend={onSend} />)

    const button = screen.getByRole('button', { name: 'Send' })
    fireEvent.click(button)
    fireEvent.click(button)
    expect(onSend).toHaveBeenCalledTimes(1)
    expect(button).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Sending' })).toHaveAttribute('data-state', 'loading')

    await act(async () => complete?.())
    expect(screen.getByRole('button', { name: 'Sent' })).toHaveAttribute('data-state', 'success')
    act(() => vi.advanceTimersByTime(1400))
    expect(screen.getByRole('button', { name: 'Send' })).toHaveAttribute('data-state', 'idle')
  })

  it('shows an error state and allows retrying', async () => {
    const onSend = vi.fn().mockRejectedValueOnce(new Error('Request failed')).mockResolvedValueOnce(undefined)
    render(<SendButton onSend={onSend} />)

    fireEvent.click(screen.getByRole('button', { name: 'Send' }))
    await act(async () => {})
    const retry = screen.getByRole('button', { name: 'Retry' })
    expect(retry).toHaveAttribute('data-state', 'error')
    expect(retry).not.toBeDisabled()

    fireEvent.click(retry)
    expect(onSend).toHaveBeenCalledTimes(2)
    await act(async () => {})
    expect(screen.getByRole('button', { name: 'Sent' })).toBeInTheDocument()
  })

  it('keeps the disabled state unavailable', () => {
    const onSend = vi.fn().mockResolvedValue(undefined)
    render(<SendButton disabled onSend={onSend} />)
    const button = screen.getByRole('button', { name: 'Send' })
    expect(button).toBeDisabled()
    fireEvent.click(button)
    expect(onSend).not.toHaveBeenCalled()
  })
})
