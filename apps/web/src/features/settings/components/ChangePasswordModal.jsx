import { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import TextField from '@/components/ui/TextField'
import { toast } from '@/stores/toastStore'

const ChangePasswordModal = ({ open, onClose }) => {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (open) { setForm({ current: '', next: '', confirm: '' }); setErrors({}) }
  }, [open])

  const set = (key) => (event) => setForm((f) => ({ ...f, [key]: event.target.value }))

  const onSubmit = (event) => {
    event.preventDefault()
    const next = {}
    if (!form.current) next.current = 'Enter your current password.'
    if (form.next.length < 8) next.next = 'Use at least 8 characters.'
    else if (form.next === form.current) next.next = 'Choose a password you haven’t used here.'
    if (form.confirm !== form.next) next.confirm = 'Passwords don’t match.'
    setErrors(next)
    if (Object.keys(next).length) return
    toast('Password updated')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Change password"
      description="You’ll stay signed in on this device."
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit" form="password-form">Update password</Button>
        </>
      }
    >
      <form id="password-form" className="form-grid" onSubmit={onSubmit} noValidate>
        <TextField data-autofocus label="Current password" type="password" autoComplete="current-password" value={form.current} error={errors.current} onChange={set('current')} />
        <TextField label="New password" type="password" autoComplete="new-password" value={form.next} error={errors.next} hint="At least 8 characters" onChange={set('next')} />
        <TextField label="Confirm new password" type="password" autoComplete="new-password" value={form.confirm} error={errors.confirm} onChange={set('confirm')} />
      </form>
    </Modal>
  )
}

export default ChangePasswordModal
