const MS_PER_DAY = 24 * 60 * 60 * 1000

const pad = (n) => String(n).padStart(2, '0')
const toISO = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
const parseISO = (iso) => new Date(`${iso}T00:00:00`) // local midnight, so dates never shift a day

// ISO dates are plain 'YYYY-MM-DD' strings in local time.
export const todayISO = () => toISO(new Date())
export const addDays = (days) => addDaysTo(todayISO(), days)
export const addDaysTo = (iso, days) => {
  const date = parseISO(iso)
  date.setDate(date.getDate() + days)
  return toISO(date)
}
export const addMonthsTo = (iso, months) => {
  const date = parseISO(iso)
  const day = date.getDate()
  date.setDate(1)
  date.setMonth(date.getMonth() + months)
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  date.setDate(Math.min(day, lastDay))
  return toISO(date)
}
export const daysUntil = (iso) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((parseISO(iso) - today) / MS_PER_DAY)
}

export const formatDate = (value, options = { dateStyle: 'medium' }) => {
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? parseISO(value) : new Date(value)
  return new Intl.DateTimeFormat('en-PH', options).format(date)
}

export const dateParts = (iso) => {
  const date = parseISO(iso)
  return { day: date.getDate(), month: new Intl.DateTimeFormat('en-PH', { month: 'short' }).format(date) }
}

export const dayParts = (days) => dateParts(addDays(days))

export const lastMonths = (count) =>
  Array.from({ length: count }, (_, index) => {
    const date = new Date()
    date.setDate(1)
    date.setMonth(date.getMonth() - (count - 1 - index))
    return new Intl.DateTimeFormat('en-PH', { month: 'short' }).format(date)
  })

export const greeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}
