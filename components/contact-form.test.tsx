import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { ContactForm } from './contact-form'

describe('ContactForm', () => {
  it('requires the accessible contact fields before submission', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText('Name')).toBeRequired()
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText('Message')).toBeRequired()
  })

  it('shows confirmation and clears values after a valid submission', () => {
    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ella' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ella@example.com' } })
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello there' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Send message' }).closest('form')!)

    expect(screen.getByRole('status')).toHaveTextContent('Thanks')
    expect(screen.getByLabelText('Name')).toHaveValue('')
    expect(screen.getByLabelText('Email')).toHaveValue('')
  })
})

afterEach(cleanup)
