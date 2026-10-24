const MS_PER_DAY = 24 * 60 * 60 * 1000

export const addDays = (days) => new Date(Date.now() + days * MS_PER_DAY).toISOString().slice(0, 10)

export const formatDate = (value, options = { dateStyle: 'medium' }) =>
  new Intl.DateTimeFormat('en-PH', options).format(new Date(value))

export const dayParts = (days) => {
  const date = new Date(Date.now() + days * MS_PER_DAY)
  return {
    day: date.getDate(),
    month: new Intl.DateTimeFormat('en-PH', { month: 'short' }).format(date),
  }
}

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
