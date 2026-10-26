import PageHeader from '@/components/ui/PageHeader'
import SettingsNav from '@/features/settings/components/SettingsNav'
import ProfileSettings from '@/features/settings/components/ProfileSettings'
import AppearanceSettings from '@/features/settings/components/AppearanceSettings'
import NotificationSettings from '@/features/settings/components/NotificationSettings'
import SecuritySettings from '@/features/settings/components/SecuritySettings'
import DataSettings from '@/features/settings/components/DataSettings'
import AboutSettings from '@/features/settings/components/AboutSettings'
import '@/features/settings/settings.css'

const sections = [
  { id: 'profile', label: 'Profile' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'security', label: 'Privacy and security' },
  { id: 'data', label: 'Your data' },
  { id: 'danger', label: 'Delete account' },
  { id: 'about', label: 'About' },
]

const SettingsPage = () => {
  return (
    <>
      <PageHeader title="Settings" description="Manage your account and how Vauwl works for you." />
      <div className="settings">
        <SettingsNav sections={sections} />
        <div className="settings-content">
          <ProfileSettings />
          <AppearanceSettings />
          <NotificationSettings />
          <SecuritySettings />
          <DataSettings />
          <AboutSettings />
        </div>
      </div>
    </>
  )
}

export default SettingsPage
