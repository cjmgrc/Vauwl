const MS_PER_DAY = 24 * 60 * 60 * 1000

export const formatDate = (value, options = { dateStyle: 'medium' }) =>
  new Intl.DateTimeFormat('en-PH', options).format(new Date(value))

export const daysUntil = (value) => {
  const start = new Date().setHours(0, 0, 0, 0)
  const end = new Date(value).setHours(0, 0, 0, 0)
  return Math.round((end - start) / MS_PER_DAY)
}

export const describeDaysUntil = (value) => {
  const days = daysUntil(value)
  if (days === 0) return 'Today'
  if (days === 1) return 'Tomorrow'
  if (days === -1) return 'Yesterday'
  return days > 0 ? `In ${days} days` : `${Math.abs(days)} days ago`
}
