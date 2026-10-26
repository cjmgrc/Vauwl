import { useState } from 'react'
import { Laptop, Smartphone } from 'lucide-react'
import SettingsSection from '@/features/settings/components/SettingsSection'
import SettingRow from '@/features/settings/components/SettingRow'
import ChangePasswordModal from '@/features/settings/components/ChangePasswordModal'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { toast } from '@/stores/toastStore'

const describeThisDevice = () => {
  const ua = navigator.userAgent
  const os = /iPhone|iPad/.test(ua) ? 'iOS' : /Android/.test(ua) ? 'Android' : /Mac/.test(ua) ? 'macOS' : /Windows/.test(ua) ? 'Windows' : 'this device'
  const browser = /Edg\//.test(ua) ? 'Edge' : /Firefox\//.test(ua) ? 'Firefox' : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'Browser'
  return { name: `${browser} on ${os}`, mobile: /iPhone|Android/.test(ua) }
}

const SecuritySettings = () => {
  const [passwordOpen, setPasswordOpen] = useState(false)
  const device = describeThisDevice()
  const [sessions, setSessions] = useState([
    { id: 'this', name: device.name, detail: 'Active now', current: true, mobile: device.mobile },
    { id: 's2', name: 'Safari on iOS', detail: 'Last active 2 hours ago', mobile: true },
    { id: 's3', name: 'Chrome on macOS', detail: 'Last active 5 days ago', mobile: false },
  ])
  const others = sessions.filter((s) => !s.current)

  return (
    <SettingsSection id="security" title="Privacy and security" description="Control access to your records.">
      <SettingRow label="Password" description="Use a long, unique password.">
        <Button variant="secondary" onClick={() => setPasswordOpen(true)}>Change password</Button>
      </SettingRow>
      <SettingRow label="Two-step verification" description="Require a code from an authenticator app when you sign in.">
        <Badge>Coming soon</Badge>
      </SettingRow>
      <SettingRow label="Where you’re signed in" description="Sign out of devices you no longer use." stack>
        <ul className="set-sessions">
          {sessions.map((session) => {
            const Icon = session.mobile ? Smartphone : Laptop
            return (
              <li key={session.id} className="set-sessions__row">
                <Icon size={20} aria-hidden="true" />
                <div>
                  <p className="set-row__label">{session.name}</p>
                  <p className="set-row__desc">{session.detail}</p>
                </div>
                {session.current ? <Badge tone="ok">This device</Badge> : (
                  <Button variant="ghost" onClick={() => { setSessions((list) => list.filter((s) => s.id !== session.id)); toast(`Signed out of ${session.name}`) }}>Sign out</Button>
                )}
              </li>
            )
          })}
        </ul>
        {others.length > 1 && (
          <Button variant="secondary" onClick={() => { setSessions((list) => list.filter((s) => s.current)); toast('Signed out of other devices') }}>
            Sign out of all other devices
          </Button>
        )}
      </SettingRow>
      <ChangePasswordModal open={passwordOpen} onClose={() => setPasswordOpen(false)} />
    </SettingsSection>
  )
}

export default SecuritySettings
