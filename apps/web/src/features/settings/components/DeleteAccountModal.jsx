import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import TextField from '@/components/ui/TextField'
import { useAuthStore } from '@/stores/authStore'
import { toast } from '@/stores/toastStore'

const DeleteAccountModal = ({ open, onClose }) => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const deleteAccount = useAuthStore((state) => state.deleteAccount)
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (open) setTyped('')
  }, [open])

  const matches = typed.trim().toLowerCase() === user.email.toLowerCase()

  const onSubmit = (event) => {
    event.preventDefault()
    if (!matches) return
    deleteAccount()
    toast('Your account was deleted')
    navigate('/login', { replace: true })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete your account?"
      description="This permanently removes your items, documents, reminders, and rules. It can’t be undone."
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Keep my account</Button>
          <Button variant="danger" type="submit" form="delete-account-form" disabled={!matches}>Delete account</Button>
        </>
      }
    >
      <form id="delete-account-form" className="form-grid" onSubmit={onSubmit} noValidate>
        <TextField data-autofocus label={`Type ${user.email} to confirm`} autoComplete="off" autoCapitalize="none" autoCorrect="off" value={typed} onChange={(e) => setTyped(e.target.value)} />
      </form>
    </Modal>
  )
}

export default DeleteAccountModal
