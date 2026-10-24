export const formatCurrency = (amount, currency = 'PHP') =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency }).format(amount)

export const formatNumber = (value) => new Intl.NumberFormat('en-PH').format(value)
