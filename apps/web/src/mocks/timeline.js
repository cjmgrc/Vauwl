import { addDays } from '@/lib/date'

// status: 'pending' | 'done'. recurrenceMonths: null or a number of months.
export const initialReminders = [
  { id: 't1', title: 'Replace Dyson purifier filter', kind: 'maintenance', itemId: 'dyson', dueOn: addDays(-3), recurrenceMonths: 6, status: 'pending', completedOn: null },
  { id: 't2', title: 'Photograph serial numbers for insurance', kind: 'custom', itemId: null, dueOn: addDays(0), recurrenceMonths: null, status: 'pending', completedOn: null },
  { id: 't3', title: 'Renew Honda City RS registration', kind: 'registration', itemId: 'honda', dueOn: addDays(10), recurrenceMonths: 12, status: 'pending', completedOn: null },
  { id: 't4', title: 'Review Sony A7C II warranty', kind: 'warranty', itemId: 'sony', dueOn: addDays(12), recurrenceMonths: null, status: 'pending', completedOn: null },
  { id: 't5', title: 'Descale Breville Barista Pro', kind: 'maintenance', itemId: 'breville', dueOn: addDays(18), recurrenceMonths: 3, status: 'pending', completedOn: null },
  { id: 't6', title: 'Aeron chair care', kind: 'maintenance', itemId: 'aeron', dueOn: addDays(32), recurrenceMonths: 6, status: 'pending', completedOn: null },
  { id: 't7', title: 'Review home insurance coverage', kind: 'custom', itemId: null, dueOn: addDays(45), recurrenceMonths: 12, status: 'pending', completedOn: null },
  { id: 't8', title: 'AppleCare+ coverage ends', kind: 'warranty', itemId: 'macbook', dueOn: addDays(211), recurrenceMonths: null, status: 'pending', completedOn: null },
  { id: 't9', title: 'Dyson warranty ends', kind: 'warranty', itemId: 'dyson', dueOn: addDays(214), recurrenceMonths: null, status: 'pending', completedOn: null },
  { id: 't10', title: 'MacBook battery service', kind: 'maintenance', itemId: 'macbook', dueOn: addDays(-45), recurrenceMonths: null, status: 'done', completedOn: addDays(-44) },
  { id: 't11', title: 'Descale Breville Barista Pro', kind: 'maintenance', itemId: 'breville', dueOn: addDays(-80), recurrenceMonths: 3, status: 'done', completedOn: addDays(-78) },
  { id: 't12', title: 'Renew Honda insurance', kind: 'custom', itemId: 'honda', dueOn: addDays(-120), recurrenceMonths: 12, status: 'done', completedOn: addDays(-121) },
]
