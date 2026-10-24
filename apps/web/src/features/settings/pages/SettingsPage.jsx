import { Monitor, Moon, Sun, UserRound } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import { useAuthStore } from '@/stores/authStore'
import { useThemeStore } from '@/stores/themeStore'

const themeOptions = [
  { value: 'light', label: 'Light', description: 'A brighter look for daytime.', icon: Sun },
  { value: 'dark', label: 'Dark', description: 'Easy on the eyes in low light.', icon: Moon },
  { value: 'system', label: 'System', description: 'Follow your device preference.', icon: Monitor },
]

const SettingsPage = () => {
  const user = useAuthStore((state) => state.user)
  const preference = useThemeStore((state) => state.preference)
  const setPreference = useThemeStore((state) => state.setPreference)
  const initials = user.name.slice(0, 2).toUpperCase()

  return (
    <div className="settings-page">
      <PageHeader title="Settings" description="Manage your account and how Vauwl looks." />

      <section className="panel settings-section" aria-labelledby="settings-account-title">
        <header className="panel__head">
          <div className="settings-section__heading">
            <span className="settings-section__icon"><UserRound size={20} aria-hidden="true" /></span>
            <div>
              <h2 id="settings-account-title" className="panel__title">Account</h2>
              <p className="muted">Your profile information</p>
            </div>
          </div>
        </header>
        <div className="settings-account">
          <span className="avatar settings-account__avatar" aria-hidden="true">{initials}</span>
          <div className="settings-account__details">
            <strong>{user.name}</strong>
            <span className="muted">{user.email}</span>
          </div>
        </div>
      </section>

      <section className="panel settings-section" aria-labelledby="settings-appearance-title">
        <header className="panel__head">
          <div className="settings-section__heading">
            <span className="settings-section__icon"><Sun size={20} aria-hidden="true" /></span>
            <div>
              <h2 id="settings-appearance-title" className="panel__title">Appearance</h2>
              <p className="muted">Choose how Vauwl looks on this device.</p>
            </div>
          </div>
        </header>
        <div className="settings-themes" role="group" aria-label="Appearance preference">
          {themeOptions.map(({ value, label, description, icon: Icon }) => (
            <button
              key={value}
              type="button"
              className="settings-theme"
              aria-pressed={preference === value}
              onClick={() => setPreference(value)}
            >
              <span className="settings-theme__icon"><Icon size={20} aria-hidden="true" /></span>
              <span className="settings-theme__copy">
                <strong>{label}</strong>
                <small className="muted">{description}</small>
              </span>
              <span className="settings-theme__radio" aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default SettingsPage
