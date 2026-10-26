import SettingsSection from '@/features/settings/components/SettingsSection'
import SettingRow from '@/features/settings/components/SettingRow'
import Select from '@/components/ui/Select'
import Switch from '@/components/ui/Switch'
import { useSettingsStore } from '@/stores/settingsStore'

const leadOptions = [
  { value: '7', label: '7 days before' },
  { value: '14', label: '14 days before' },
  { value: '30', label: '30 days before' },
  { value: '60', label: '60 days before' },
]

const NotificationSettings = () => {
  const notify = useSettingsStore((state) => state.notify)
  const setNotify = useSettingsStore((state) => state.setNotify)

  return (
    <SettingsSection id="notifications" title="Notifications" description="Choose what Vauwl reminds you about, and how.">
      <SettingRow label="Warranty and coverage" description="Alert me before a warranty or coverage ends.">
        <Switch checked={notify.warranty} onChange={(v) => setNotify('warranty', v)} label="Warranty and coverage alerts" />
      </SettingRow>
      {notify.warranty && (
        <SettingRow label="Warn me" description="How early the warranty alert arrives.">
          <Select label="Warranty lead time" align="end" value={String(notify.leadDays)} onChange={(v) => setNotify('leadDays', Number(v))} options={leadOptions} />
        </SettingRow>
      )}
      <SettingRow label="Maintenance due" description="Services, descaling, filters, and recurring care.">
        <Switch checked={notify.maintenance} onChange={(v) => setNotify('maintenance', v)} label="Maintenance reminders" />
      </SettingRow>
      <SettingRow label="Overdue items" description="A nudge when something on your timeline slips past its date.">
        <Switch checked={notify.overdue} onChange={(v) => setNotify('overdue', v)} label="Overdue alerts" />
      </SettingRow>
      <SettingRow label="Weekly digest" description="One summary every Monday of what’s coming up.">
        <Switch checked={notify.digest} onChange={(v) => setNotify('digest', v)} label="Weekly digest" />
      </SettingRow>
      <SettingRow label="Send by email" description="Also deliver alerts to your email address.">
        <Switch checked={notify.email} onChange={(v) => setNotify('email', v)} label="Email delivery" />
      </SettingRow>
    </SettingsSection>
  )
}

export default NotificationSettings
