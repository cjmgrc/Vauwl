import { useState } from 'react'
import { Download } from 'lucide-react'
import SettingsSection from '@/features/settings/components/SettingsSection'
import SettingRow from '@/features/settings/components/SettingRow'
import DeleteAccountModal from '@/features/settings/components/DeleteAccountModal'
import Button from '@/components/ui/Button'
import ConfirmModal from '@/components/ui/ConfirmModal'
import { useAuthStore } from '@/stores/authStore'
import { useDataStore } from '@/stores/dataStore'
import { toast } from '@/stores/toastStore'

const exportData = () => {
  const { items, documents, rules, reminders } = useDataStore.getState()
  const { user } = useAuthStore.getState()
  const payload = { exportedAt: new Date().toISOString(), account: { name: user.name, email: user.email }, items, documents, rules, reminders }
  const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `vauwl-export-${new Date().toISOString().slice(0, 10)}.json`
  link.click()
  URL.revokeObjectURL(url)
  toast('Export downloaded')
}

const DataSettings = () => {
  const resetSampleData = useDataStore((state) => state.resetSampleData)
  const [resetOpen, setResetOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <>
      <SettingsSection id="data" title="Your data" description="You own your records. Take them with you any time.">
        <SettingRow label="Export everything" description="Download your items, documents, rules, and reminders as a JSON file.">
          <Button variant="secondary" onClick={exportData}><Download size={16} aria-hidden="true" /> Export</Button>
        </SettingRow>
        <SettingRow label="Reset sample data" description="Restore the demo items and reminders. Your changes will be lost.">
          <Button variant="secondary" onClick={() => setResetOpen(true)}>Reset</Button>
        </SettingRow>
      </SettingsSection>

      <SettingsSection id="danger" title="Delete account" description="Permanently remove your account and everything in it." danger>
        <SettingRow label="Delete my account" description="Export your data first if you want a copy.">
          <Button variant="danger" onClick={() => setDeleteOpen(true)}>Delete account</Button>
        </SettingRow>
      </SettingsSection>

      <ConfirmModal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Reset sample data?"
        description="Items, documents, rules, and reminders go back to the starting demo set."
        confirmLabel="Reset"
        onConfirm={() => { resetSampleData(); toast('Sample data restored') }}
      />
      <DeleteAccountModal open={deleteOpen} onClose={() => setDeleteOpen(false)} />
    </>
  )
}

export default DataSettings
