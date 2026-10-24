import React, { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import TextField from '@/components/ui/TextField'
import { toast } from '@/stores/toastStore'

const ForgotPasswordModal = ({ open, onClose, initialEmail = '' }) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      setEmail(initialEmail)
      setError('')
    }
  }, [open, initialEmail])

  const onSubmit = (event) => {
    event.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address.')
      return
    }
    toast('If that email has an account, a reset link is on its way.')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Reset your password"
      description="We’ll email you a link to choose a new one."
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit" form="forgot-form">Send reset link</Button>
        </>
      }
    >
      <form id="forgot-form" className="form-grid" onSubmit={onSubmit} noValidate>
        <TextField
          data-autofocus label="Email address" type="email" inputMode="email" autoComplete="email"
          autoCapitalize="none" placeholder="you@example.com" value={email} error={error}
          onChange={(event) => setEmail(event.target.value)}
        />
      </form>
    </Modal>
  )
}

export default ForgotPasswordModal
