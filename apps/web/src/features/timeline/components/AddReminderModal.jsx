import { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import TextField from '@/components/ui/TextField'
import Select from '@/components/ui/Select'
import { addDays } from '@/lib/date'
import { kindOptions, repeatOptions } from '@/lib/timeline'
import { useDataStore } from '@/stores/dataStore'
import { toast } from '@/stores/toastStore'

const AddReminderModal = ({ open, onClose }) => {
  const items = useDataStore((state) => state.items)
  const addReminder = useDataStore((state) => state.addReminder)
  const [title, setTitle] = useState('')
  const [kind, setKind] = useState('custom')
  const [itemId, setItemId] = useState('none')
  const [dueOn, setDueOn] = useState('')
  const [repeat, setRepeat] = useState('0')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (open) {
      setTitle(''); setKind('custom'); setItemId('none'); setDueOn(addDays(1)); setRepeat('0'); setErrors({})
    }
  }, [open])

  const itemOptions = [{ value: 'none', label: 'Not linked' }, ...items.map((i) => ({ value: i.id, label: i.name }))]

  const onSubmit = (event) => {
    event.preventDefault()
    const next = {}
    if (!title.trim()) next.title = 'Give the reminder a title.'
    if (!dueOn) next.dueOn = 'Choose a date.'
    setErrors(next)
    if (Object.keys(next).length) return
    addReminder({
      title: title.trim(),
      kind,
      itemId: itemId === 'none' ? null : itemId,
      dueOn,
      recurrenceMonths: Number(repeat) || null,
    })
    toast('Reminder added')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add a reminder"
      description="Deadlines, services, renewals, or anything you want to remember."
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit" form="reminder-form">Add reminder</Button>
        </>
      }
    >
      <form id="reminder-form" className="form-grid" onSubmit={onSubmit} noValidate>
        <TextField data-autofocus label="Title" placeholder="e.g. Service the car" value={title} error={errors.title} onChange={(e) => setTitle(e.target.value)} />
        <div className="form-row">
          <Select fieldLabel="Type" value={kind} onChange={setKind} options={kindOptions} />
          <TextField label="Due date" type="date" value={dueOn} error={errors.dueOn} onChange={(e) => setDueOn(e.target.value)} />
        </div>
        <Select fieldLabel="Item" value={itemId} onChange={setItemId} options={itemOptions} />
        <Select fieldLabel="Repeat" value={repeat} onChange={setRepeat} options={repeatOptions} />
      </form>
    </Modal>
  )
}

export default AddReminderModal
