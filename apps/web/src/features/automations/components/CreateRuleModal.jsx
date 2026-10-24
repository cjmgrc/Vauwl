import React, { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import TextField from '@/components/ui/TextField'
import Select from '@/components/ui/Select'
import { actionOptions, triggerOptions } from '@/mocks/data'
import { useDataStore } from '@/stores/dataStore'
import { toast } from '@/stores/toastStore'

const CreateRuleModal = ({ open, onClose }) => {
  const addRule = useDataStore((state) => state.addRule)
  const [name, setName] = useState('')
  const [trigger, setTrigger] = useState(triggerOptions[0].value)
  const [action, setAction] = useState(actionOptions[0].value)
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      setName('')
      setTrigger(triggerOptions[0].value)
      setAction(actionOptions[0].value)
      setError('')
    }
  }, [open])

  const onSubmit = (event) => {
    event.preventDefault()
    if (!name.trim()) {
      setError('Name the rule so you can find it later.')
      return
    }
    addRule({
      name: name.trim(),
      when: triggerOptions.find((o) => o.value === trigger).label,
      then: actionOptions.find((o) => o.value === action).label,
    })
    toast(`Rule “${name.trim()}” is on`)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create a rule"
      description="When something happens, Vauwl does the follow-up."
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit" form="rule-form">Create rule</Button>
        </>
      }
    >
      <form id="rule-form" className="form-grid" onSubmit={onSubmit} noValidate>
        <TextField data-autofocus label="Rule name" placeholder="e.g. Service reminder" value={name} error={error} onChange={(e) => setName(e.target.value)} />
        <Select fieldLabel="When" value={trigger} onChange={setTrigger} options={triggerOptions} />
        <Select fieldLabel="Then" value={action} onChange={setAction} options={actionOptions} />
      </form>
    </Modal>
  )
}

export default CreateRuleModal
