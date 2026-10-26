import { useState } from 'react'
import Button from '@/components/ui/Button'
import TextField from '@/components/ui/TextField'
import SettingsSection from '@/features/settings/components/SettingsSection'
import { useAuthStore } from '@/stores/authStore'
import { toast } from '@/stores/toastStore'

const ProfileSettings = () => {
  const user = useAuthStore((state) => state.user)
  const updateProfile = useAuthStore((state) => state.updateProfile)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [errors, setErrors] = useState({})
  const changed = name.trim() !== user.name || email.trim() !== user.email

  const onSubmit = (event) => {
    event.preventDefault()
    const next = {}
    if (!name.trim()) next.name = 'Enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = 'Enter a valid email address.'
    setErrors(next)
    if (Object.keys(next).length) return
    updateProfile({ name: name.trim(), email: email.trim().toLowerCase() })
    toast('Profile saved')
  }

  return (
    <SettingsSection id="profile" title="Profile" description="How you appear in Vauwl, and where we reach you.">
      <form className="set-profile" onSubmit={onSubmit} noValidate>
        <span className="set-profile__avatar" aria-hidden="true">{user.name.slice(0, 2).toUpperCase()}</span>
        <div className="set-profile__fields">
          <TextField label="Name" autoComplete="name" value={name} error={errors.name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Email address" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" value={email} error={errors.email} onChange={(e) => setEmail(e.target.value)} />
          <div className="set-profile__actions">
            <Button variant="primary" type="submit" disabled={!changed}>Save changes</Button>
            {changed && <Button variant="ghost" onClick={() => { setName(user.name); setEmail(user.email); setErrors({}) }}>Discard</Button>}
          </div>
        </div>
      </form>
    </SettingsSection>
  )
}

export default ProfileSettings
