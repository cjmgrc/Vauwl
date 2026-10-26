import { useMemo, useState } from 'react'
import { CalendarCheck, CalendarX, Plus } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import EmptyState from '@/components/ui/EmptyState'
import ConfirmModal from '@/components/ui/ConfirmModal'
import TimelineGroup from '@/features/timeline/components/TimelineGroup'
import AddReminderModal from '@/features/timeline/components/AddReminderModal'
import { daysUntil, formatDate } from '@/lib/date'
import { groupCompleted, groupUpcoming, kindOptions } from '@/lib/timeline'
import { useDataStore } from '@/stores/dataStore'
import { toast } from '@/stores/toastStore'
import '@/features/timeline/timeline.css'

const typeOptions = [{ value: 'all', label: 'All types' }, ...kindOptions]

const TimelinePage = () => {
  const reminders = useDataStore((state) => state.reminders)
  const items = useDataStore((state) => state.items)
  const completeReminder = useDataStore((state) => state.completeReminder)
  const reopenReminder = useDataStore((state) => state.reopenReminder)
  const snoozeReminder = useDataStore((state) => state.snoozeReminder)
  const removeReminder = useDataStore((state) => state.removeReminder)
  const [tab, setTab] = useState('upcoming')
  const [kind, setKind] = useState('all')
  const [addOpen, setAddOpen] = useState(false)
  const [toDelete, setToDelete] = useState(null)
  const [leaving, setLeaving] = useState(() => new Set())

  const itemsById = useMemo(() => Object.fromEntries(items.map((i) => [i.id, i])), [items])
  const matchesKind = (r) => kind === 'all' || r.kind === kind

  const pending = reminders.filter((r) => r.status === 'pending')
  const done = reminders.filter((r) => r.status === 'done')
  const upcomingGroups = useMemo(() => groupUpcoming(pending.filter(matchesKind)), [reminders, kind])
  const completedGroups = useMemo(() => groupCompleted(done.filter(matchesKind)), [reminders, kind])

  const overdue = pending.filter((r) => daysUntil(r.dueOn) < 0).length
  const thisWeek = pending.filter((r) => { const d = daysUntil(r.dueOn); return d >= 0 && d <= 7 }).length
  const recentlyDone = done.filter((r) => daysUntil(r.completedOn) >= -30).length

  const onToggle = (reminder) => {
    if (reminder.status === 'done') {
      reopenReminder(reminder.id)
      toast('Moved back to upcoming')
      return
    }
    // Let the row slide away first, then complete it
    setLeaving((current) => new Set(current).add(reminder.id))
    setTimeout(() => {
      const next = completeReminder(reminder.id)
      setLeaving((current) => { const copy = new Set(current); copy.delete(reminder.id); return copy })
      toast(next ? `Done. Next one is set for ${formatDate(next)}` : 'Marked done')
    }, 220)
  }

  const onSnooze = (reminder, days) => {
    snoozeReminder(reminder.id, days)
    toast(`Snoozed ${days === 1 ? 'a day' : days === 7 ? 'a week' : 'a month'}`)
  }

  const groups = tab === 'upcoming' ? upcomingGroups : completedGroups
  const shared = { itemsById, leaving, onToggle, onSnooze, onDelete: setToDelete }

  return (
    <>
      <PageHeader
        title="Timeline"
        description="Deadlines, maintenance, and everything you’ve already handled."
        actions={<Button variant="primary" onClick={() => setAddOpen(true)}><Plus size={18} aria-hidden="true" /> Add reminder</Button>}
      />

      <dl className="ledger panel">
        <div className="ledger__cell"><dt>Overdue</dt><dd className={`ledger__value tabular${overdue ? ' is-danger' : ''}`}>{overdue}</dd></div>
        <div className="ledger__cell"><dt>Due in the next 7 days</dt><dd className="ledger__value tabular">{thisWeek}</dd></div>
        <div className="ledger__cell"><dt>Completed in the last 30 days</dt><dd className="ledger__value tabular">{recentlyDone}</dd></div>
      </dl>

      <div className="tl-toolbar">
        <div className="tabs" role="tablist" aria-label="Timeline view">
          {[['upcoming', 'Upcoming', pending.length], ['completed', 'Completed', done.length]].map(([value, label, count]) => (
            <button key={value} type="button" role="tab" className="tab" aria-selected={tab === value} onClick={() => setTab(value)}>
              {label} <span className="tabular">{count}</span>
            </button>
          ))}
        </div>
        <Select label="Filter by type" compact align="end" value={kind} onChange={setKind} options={typeOptions} />
      </div>

      {groups.length ? (
        <div role="tabpanel">
          {groups.map((group) => (
            <TimelineGroup key={group.key} group={group} done={tab === 'completed'} {...shared} />
          ))}
        </div>
      ) : tab === 'upcoming' ? (
        <EmptyState
          icon={CalendarCheck}
          title={kind === 'all' ? 'You’re all caught up' : 'Nothing of this type'}
          description="Add a reminder for a deadline or a service you don’t want to forget."
          action={<Button variant="primary" onClick={() => setAddOpen(true)}>Add reminder</Button>}
        />
      ) : (
        <EmptyState icon={CalendarX} title="Nothing completed yet" description="Finished reminders will show up here, newest first." />
      )}

      <AddReminderModal open={addOpen} onClose={() => setAddOpen(false)} />
      <ConfirmModal
        open={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        title={`Delete “${toDelete?.title ?? 'reminder'}”?`}
        description="It will be removed from your timeline. Recurring reminders stop repeating."
        onConfirm={() => { removeReminder(toDelete.id); toast('Reminder deleted') }}
      />
    </>
  )
}

export default TimelinePage
