import React, { useState } from 'react'
import { Plus, Zap } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import ConfirmModal from '@/components/ui/ConfirmModal'
import RuleCard from '@/features/automations/components/RuleCard'
import CreateRuleModal from '@/features/automations/components/CreateRuleModal'
import { useDataStore } from '@/stores/dataStore'
import { toast } from '@/stores/toastStore'

const AutomationsPage = () => {
  const rules = useDataStore((state) => state.rules)
  const toggleRule = useDataStore((state) => state.toggleRule)
  const removeRule = useDataStore((state) => state.removeRule)
  const [createOpen, setCreateOpen] = useState(false)
  const [toDelete, setToDelete] = useState(null)

  return (
    <>
      <PageHeader
        title="Your life, on autopilot."
        description="Rules that connect events to follow-ups, so details don’t slip through."
        actions={<Button variant="primary" onClick={() => setCreateOpen(true)}><Plus size={18} aria-hidden="true" /> Create rule</Button>}
      />
      {rules.length ? (
        <div className="rules">
          {rules.map((rule) => (
            <RuleCard
              key={rule.id} rule={rule} onDelete={setToDelete}
              onToggle={(r) => { toggleRule(r.id); toast(`${r.name} is now ${r.active ? 'paused' : 'running'}`) }}
            />
          ))}
        </div>
      ) : (
        <EmptyState icon={Zap} title="No rules yet" description="Create one to get reminders and follow-ups without lifting a finger." action={<Button variant="primary" onClick={() => setCreateOpen(true)}>Create rule</Button>} />
      )}
      <CreateRuleModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <ConfirmModal
        open={Boolean(toDelete)} onClose={() => setToDelete(null)}
        title={`Delete “${toDelete?.name ?? 'rule'}”?`} description="It will stop running. Past activity stays in your history."
        onConfirm={() => { removeRule(toDelete.id); toast('Rule deleted') }}
      />
    </>
  )
}

export default AutomationsPage
