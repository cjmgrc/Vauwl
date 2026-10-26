import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import SettingsSection from '@/features/settings/components/SettingsSection'
import SettingRow from '@/features/settings/components/SettingRow'
import Button from '@/components/ui/Button'
import { useAuthStore } from '@/stores/authStore'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)

const AboutSettings = () => {
  const navigate = useNavigate()
  const signOut = useAuthStore((state) => state.signOut)

  return (
    <SettingsSection id="about" title="About" description="Vauwl: your life, remembered.">
      <SettingRow label="Quick search" description="Open search from anywhere in the app.">
        <kbd className="kbd">{isMac ? '⌘ K' : 'Ctrl K'}</kbd>
      </SettingRow>
      <SettingRow label="Version"><span className="muted tabular">0.1.0</span></SettingRow>
      <SettingRow label="Sign out" description="You’ll need to sign in again on this device.">
        <Button variant="secondary" onClick={() => { signOut(); navigate('/login') }}><LogOut size={16} aria-hidden="true" /> Sign out</Button>
      </SettingRow>
    </SettingsSection>
  )
}

export default AboutSettings
