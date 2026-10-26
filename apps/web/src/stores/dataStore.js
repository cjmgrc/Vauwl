import { create } from 'zustand'
import { initialDocuments, initialItems, initialRules } from '@/mocks/data'
import { initialReminders } from '@/mocks/timeline'
import { addDaysTo, addMonthsTo, todayISO } from '@/lib/date'

const uid = () => Math.random().toString(36).slice(2, 10)

// In-memory data until the API exists. Swap these actions for API calls later.
export const useDataStore = create((set, get) => ({
  items: initialItems,
  documents: initialDocuments,
  rules: initialRules,
  reminders: initialReminders,

  addItem: (item) => set((s) => ({ items: [{ id: uid(), ...item }, ...s.items] })),
  removeItem: (id) =>
    set((s) => ({
      items: s.items.filter((i) => i.id !== id),
      documents: s.documents.map((d) => (d.itemId === id ? { ...d, itemId: null } : d)),
      reminders: s.reminders.filter((r) => r.itemId !== id),
    })),

  addDocument: (doc) => set((s) => ({ documents: [{ id: uid(), ...doc }, ...s.documents] })),
  removeDocument: (id) => set((s) => ({ documents: s.documents.filter((d) => d.id !== id) })),

  addRule: (rule) => set((s) => ({ rules: [{ id: uid(), active: true, ...rule }, ...s.rules] })),
  toggleRule: (id) =>
    set((s) => ({ rules: s.rules.map((r) => (r.id === id ? { ...r, active: !r.active } : r)) })),
  removeRule: (id) => set((s) => ({ rules: s.rules.filter((r) => r.id !== id) })),

  addReminder: (reminder) =>
    set((s) => ({ reminders: [{ id: uid(), status: 'pending', completedOn: null, recurrenceMonths: null, ...reminder }, ...s.reminders] })),
  // Completing a recurring reminder schedules the next one. Returns its due date, or null.
  completeReminder: (id) => {
    const reminder = get().reminders.find((r) => r.id === id)
    if (!reminder) return null
    const next = reminder.recurrenceMonths ? addMonthsTo(reminder.dueOn, reminder.recurrenceMonths) : null
    set((s) => ({
      reminders: [
        ...(next ? [{ ...reminder, id: uid(), dueOn: next, status: 'pending', completedOn: null }] : []),
        ...s.reminders.map((r) => (r.id === id ? { ...r, status: 'done', completedOn: todayISO() } : r)),
      ],
    }))
    return next
  },
  reopenReminder: (id) =>
    set((s) => ({ reminders: s.reminders.map((r) => (r.id === id ? { ...r, status: 'pending', completedOn: null } : r)) })),
  snoozeReminder: (id, days) =>
    set((s) => ({ reminders: s.reminders.map((r) => (r.id === id ? { ...r, dueOn: addDaysTo(r.dueOn, days) } : r)) })),
  removeReminder: (id) => set((s) => ({ reminders: s.reminders.filter((r) => r.id !== id) })),

  resetSampleData: () => set({ items: initialItems, documents: initialDocuments, rules: initialRules, reminders: initialReminders }),
}))
