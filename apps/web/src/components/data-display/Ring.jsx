import React from 'react'

const Ring = ({ percent, size = 56, label }) => {
  const stroke = 6
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label ?? `${percent}%`}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-border-strong)" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--chart-1)" strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={`${(percent / 100) * circumference} ${circumference}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="700" fill="var(--color-text)">
        {percent}%
      </text>
    </svg>
  )
}

export default Ring
