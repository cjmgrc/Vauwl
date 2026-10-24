import React from 'react'

const Donut = ({ segments, centerLabel, centerSub, size = 132 }) => {
  const stroke = 16
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const total = segments.reduce((sum, s) => sum + s.amount, 0)
  let offset = 0

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${centerLabel} total`}>
      {segments.map((segment) => {
        const length = (segment.amount / total) * circumference
        const circle = (
          <circle
            key={segment.label}
            cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={segment.color} strokeWidth={stroke}
            strokeDasharray={`${Math.max(length - 2, 0)} ${circumference}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        )
        offset += length
        return circle
      })}
      <text x="50%" y="47%" textAnchor="middle" dominantBaseline="central" fontSize="16" fontWeight="700" fill="var(--color-text)">{centerLabel}</text>
      <text x="50%" y="63%" textAnchor="middle" dominantBaseline="central" fontSize="11" fill="var(--color-text-muted)">{centerSub}</text>
    </svg>
  )
}

export default Donut
