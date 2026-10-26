import SettingsSection from '@/features/settings/components/SettingsSection'
import SettingRow from '@/features/settings/components/SettingRow'
import Select from '@/components/ui/Select'
import Switch from '@/components/ui/Switch'
import { useSettingsStore } from '@/stores/settingsStore'
import { useThemeStore } from '@/stores/themeStore'

const themeOptions = [
  { value: 'system', label: 'Match system' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]
const densityOptions = [
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'compact', label: 'Compact' },
]
const viewOptions = [
  { value: 'grid', label: 'Grid' },
  { value: 'list', label: 'List' },
]

const AppearanceSettings = () => {
  const preference = useThemeStore((state) => state.preference)
  const setPreference = useThemeStore((state) => state.setPreference)
  const density = useSettingsStore((state) => state.density)
  const defaultView = useSettingsStore((state) => state.defaultView)
  const reduceMotion = useSettingsStore((state) => state.reduceMotion)
  const setSetting = useSettingsStore((state) => state.setSetting)

  return (
    <SettingsSection id="appearance" title="Appearance" description="Changes apply instantly across Vauwl.">
      <SettingRow label="Theme" description="Match your device, or pick one.">
        <Select label="Theme" align="end" value={preference} onChange={setPreference} options={themeOptions} />
      </SettingRow>
      <SettingRow label="Density" description="Compact fits more on screen by tightening rows and buttons.">
        <Select label="Density" align="end" value={density} onChange={(v) => setSetting('density', v)} options={densityOptions} />
      </SettingRow>
      <SettingRow label="Inventory layout" description="How My Inventory opens each time.">
        <Select label="Inventory layout" align="end" value={defaultView} onChange={(v) => setSetting('defaultView', v)} options={viewOptions} />
      </SettingRow>
      <SettingRow label="Reduce motion" description="Turns off most animations. Vauwl also follows your device setting.">
        <Switch checked={reduceMotion} onChange={(v) => setSetting('reduceMotion', v)} label="Reduce motion" />
      </SettingRow>
    </SettingsSection>
  )
}

export default AppearanceSettings
