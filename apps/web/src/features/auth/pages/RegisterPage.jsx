import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import AuthShell from '@/features/auth/components/AuthShell'
import PasswordToggle from '@/features/auth/components/PasswordToggle'
import TextField from '@/components/ui/TextField'
import Button from '@/components/ui/Button'
import { useAuthStore } from '@/stores/authStore'
import { toast } from '@/stores/toastStore'

const RegisterPage = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const signIn = useAuthStore((state) => state.signIn)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', agreed: false })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  if (user) return <Navigate to="/" replace />

  const set = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }))

  const onSubmit = (event) => {
    event.preventDefault()
    const next = {}
    if (!form.firstName.trim()) next.firstName = 'Enter your first name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.password.length < 8) next.password = 'Use at least 8 characters.'
    if (!form.agreed) next.agreed = 'Agree to continue.'
    setErrors(next)
    if (Object.keys(next).length) return
    signIn({ name: form.firstName.trim(), email: form.email })
    navigate('/', { replace: true })
  }

  return (
    <AuthShell>
      <h1>Start organizing your life</h1>
      <p className="muted auth__lead">Set up your personal workspace in under a minute.</p>

      <form className="form-grid" onSubmit={onSubmit} noValidate>
        <div className="form-row">
          <TextField label="First name" autoComplete="given-name" value={form.firstName} error={errors.firstName} onChange={set('firstName')} />
          <TextField label="Last name" autoComplete="family-name" value={form.lastName} onChange={set('lastName')} />
        </div>
        <TextField
          label="Email address" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" autoCorrect="off"
          placeholder="you@example.com" value={form.email} error={errors.email} onChange={set('email')}
        />
        <TextField
          label="Password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="At least 8 characters"
          value={form.password} error={errors.password} onChange={set('password')}
          trailing={<PasswordToggle visible={showPassword} onToggle={() => setShowPassword((v) => !v)} />}
        />
        <div>
          <label className="check">
            <input type="checkbox" checked={form.agreed} onChange={set('agreed')} />
            <span>I agree to the Terms of Service and Privacy Policy.</span>
          </label>
          {errors.agreed && <p className="field__error">{errors.agreed}</p>}
        </div>
        <Button variant="primary" size="lg" block type="submit">
          Create my account <ArrowRight size={18} aria-hidden="true" />
        </Button>
        <Button variant="secondary" size="lg" block onClick={() => toast('Google sign-in isn’t connected yet.')}>
          Continue with Google
        </Button>
      </form>

      <p className="auth__switch muted">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </AuthShell>
  )
}

export default RegisterPage
