import React, { useState } from 'react'
import { formatCurrency } from '@/lib/format'

const W = 640
const H = 240
const PAD = { top: 12, right: 12, bottom: 28, left: 48 }

const LineChart = ({ labels, series }) => {
  const [active, setActive] = useState(labels.length - 1)
  const max = Math.ceil(Math.max(...series.flatMap((s) => s.values)) / 5000) * 5000
  const innerW = W - PAD.left - PAD.right
  const innerH = H - PAD.top - PAD.bottom
  const x = (i) => PAD.left + (labels.length === 1 ? innerW / 2 : (i / (labels.length - 1)) * innerW)
  const y = (v) => PAD.top + innerH - (v / max) * innerH
  const path = (values) => values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  const ticks = [0, 0.5, 1].map((t) => t * max)

  const onPointer = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = ((event.clientX - rect.left) / rect.width) * W
    const index = Math.round(((px - PAD.left) / innerW) * (labels.length - 1))
    setActive(Math.min(labels.length - 1, Math.max(0, index)))
  }

  return (
    <figure className="linechart">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Ownership cost over time"
        onPointerMove={onPointer}
        onPointerDown={onPointer}
        style={{ touchAction: 'pan-y' }}
      >
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(tick)} y2={y(tick)} stroke="var(--color-border)" />
            <text x={PAD.left - 8} y={y(tick)} textAnchor="end" dominantBaseline="central" fontSize="11" fill="var(--color-text-muted)">
              {tick >= 1000 ? `₱${tick / 1000}k` : `₱${tick}`}
            </text>
          </g>
        ))}
        {labels.map((label, i) => (
          <text key={`${label}-${i}`} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">
            {labels.length > 6 && i % 2 === 1 ? '' : label}
          </text>
        ))}
        {series.map((s) => (
          <path key={s.name} d={path(s.values)} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" strokeDasharray={s.dashed ? '5 5' : undefined} />
        ))}
        <line x1={x(active)} x2={x(active)} y1={PAD.top} y2={H - PAD.bottom} stroke="var(--color-border-strong)" />
        {series.map((s) => (
          <circle key={s.name} cx={x(active)} cy={y(s.values[active])} r="4.5" fill={s.color} stroke="var(--color-surface)" strokeWidth="2" />
        ))}
      </svg>
      <figcaption className="linechart__readout" aria-live="polite">
        <strong>{labels[active]}</strong>
        {series.map((s) => (
          <span key={s.name} className="linechart__value">
            <i style={{ background: s.color }} aria-hidden="true" />
            {s.name} <b className="tabular">{formatCurrency(s.values[active])}</b>
          </span>
        ))}
      </figcaption>
    </figure>
  )
}

export default LineChart
