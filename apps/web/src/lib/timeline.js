import { Bell, ClipboardCheck, FileText, ShieldCheck, Wrench } from 'lucide-react'
import { daysUntil, formatDate } from '@/lib/date'

export const kindMeta = {
  warranty: { label: 'Warranty', icon: ShieldCheck },
  maintenance: { label: 'Maintenance', icon: Wrench },
  registration: { label: 'Registration', icon: ClipboardCheck },
  document: { label: 'Document', icon: FileText },
  custom: { label: 'Reminder', icon: Bell },
}

export const kindOptions = Object.entries(kindMeta).map(([value, meta]) => ({ value, label: meta.label }))

export const repeatOptions = [
  { value: '0', label: 'Does not repeat' },
  { value: '1', label: 'Every month' },
  { value: '3', label: 'Every 3 months' },
  { value: '6', label: 'Every 6 months' },
  { value: '12', label: 'Every year' },
]

export const repeatLabel = (months) =>
  months === 12 ? 'Every year' : months === 1 ? 'Every month' : `Every ${months} months`

export const dueLabel = (iso) => {
  const days = daysUntil(iso)
  if (days < 0) return days === -1 ? '1 day overdue' : `${-days} days overdue`
  if (days === 0) return 'Due today'
  if (days === 1) return 'Due tomorrow'
  if (days <= 60) return `Due in ${days} days`
  return `Due ${formatDate(iso)}`
}

export const toneFor = (iso) => {
  const days = daysUntil(iso)
  return days < 0 ? 'overdue' : days === 0 ? 'today' : 'upcoming'
}

const upcomingBuckets = [
  { key: 'overdue', label: 'Overdue', test: (d) => d < 0 },
  { key: 'today', label: 'Today', test: (d) => d === 0 },
  { key: 'week', label: 'Next 7 days', test: (d) => d >= 1 && d <= 7 },
  { key: 'month', label: 'Next 30 days', test: (d) => d >= 8 && d <= 30 },
  { key: 'later', label: 'Later', test: (d) => d > 30 },
]

export const groupUpcoming = (reminders) => {
  const sorted = [...reminders].sort((a, b) => a.dueOn.localeCompare(b.dueOn))
  return upcomingBuckets
    .map((bucket) => ({ key: bucket.key, label: bucket.label, items: sorted.filter((r) => bucket.test(daysUntil(r.dueOn))) }))
    .filter((group) => group.items.length)
}

export const groupCompleted = (reminders) => {
  const sorted = [...reminders].sort((a, b) => b.completedOn.localeCompare(a.completedOn))
  const groups = new Map()
  sorted.forEach((reminder) => {
    const key = reminder.completedOn.slice(0, 7)
    if (!groups.has(key)) groups.set(key, { key, label: formatDate(reminder.completedOn, { month: 'long', year: 'numeric' }), items: [] })
    groups.get(key).items.push(reminder)
  })
  return [...groups.values()]
}
