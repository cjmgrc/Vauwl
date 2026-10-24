import React, { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { statusMeta } from '@/lib/status'

const InventoryFiltersModal = ({ open, onClose, selected, onApply }) => {
  const [draft, setDraft] = useState(selected)

  useEffect(() => {
    if (open) setDraft(selected)
  }, [open, selected])

  const toggle = (status) =>
    setDraft((current) => (current.includes(status) ? current.filter((s) => s !== status) : [...current, status]))

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Filter items"
      description="Show only items with these statuses."
      footer={
        <>
          <Button variant="ghost" onClick={() => setDraft([])}>Clear</Button>
          <Button variant="primary" onClick={() => { onApply(draft); onClose() }}>Show results</Button>
        </>
      }
    >
      <fieldset className="filter-list">
        <legend className="sr-only">Status</legend>
        {Object.entries(statusMeta).map(([status, meta]) => (
          <label key={status} className="check filter-list__row">
            <input type="checkbox" checked={draft.includes(status)} onChange={() => toggle(status)} />
            <span>{meta.label}</span>
          </label>
        ))}
      </fieldset>
    </Modal>
  )
}

export default InventoryFiltersModal
