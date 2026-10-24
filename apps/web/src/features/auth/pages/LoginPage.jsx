import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import AuthShell from '@/features/auth/components/AuthShell'
import ForgotPasswordModal from '@/features/auth/components/ForgotPasswordModal'
import PasswordToggle from '@/features/auth/components/PasswordToggle'
import TextField from '@/components/ui/TextField'
import Button from '@/components/ui/Button'
import { nameFromEmail, useAuthStore } from '@/stores/authStore'
import { toast } from '@/stores/toastStore'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const signIn = useAuthStore((state) => state.signIn)
  const switchingAccount = location.state?.switchAccount === true
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [forgotOpen, setForgotOpen] = useState(false)

  if (user && !switchingAccount) return <Navigate to="/" replace />

  const onSubmit = (event) => {
    event.preventDefault()
    const next = {}
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email address.'
    if (!password) next.password = 'Enter your password.'
    setErrors(next)
    if (Object.keys(next).length) return
    signIn({ name: nameFromEmail(email), email })
    navigate(switchingAccount ? '/' : location.state?.from?.pathname ?? '/', { replace: true })
  }

  return (
    <AuthShell>
      <h1>Sign in to Vauwl</h1>
      <p className="muted auth__lead">Your belongings, documents, and reminders are waiting.</p>

      <form className="form-grid" onSubmit={onSubmit} noValidate>
        <TextField
          label="Email address" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" autoCorrect="off"
          placeholder="you@example.com" value={email} error={errors.email} onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password"
          value={password} error={errors.password} onChange={(e) => setPassword(e.target.value)}
          trailing={<PasswordToggle visible={showPassword} onToggle={() => setShowPassword((v) => !v)} />}
        />
        <div className="auth__row">
          <label className="check"><input type="checkbox" /> Remember me</label>
          <button type="button" className="link-button" onClick={() => setForgotOpen(true)}>Forgot password?</button>
        </div>
        <Button variant="primary" size="lg" block type="submit">
          Sign in <ArrowRight size={18} aria-hidden="true" />
        </Button>
        <Button variant="secondary" size="lg" block onClick={() => toast('Google sign-in isn’t connected yet.')}>
          Continue with Google
        </Button>
      </form>

      <p className="auth__switch muted">
        New to Vauwl? <Link to="/register">Create an account</Link>
      </p>

      <ForgotPasswordModal open={forgotOpen} onClose={() => setForgotOpen(false)} initialEmail={email} />
    </AuthShell>
  )
}

export default LoginPage
