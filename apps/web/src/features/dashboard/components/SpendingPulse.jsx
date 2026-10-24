import React from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Donut from '@/components/data-display/Donut'
import { formatCurrency } from '@/lib/format'
import { spendingThisMonth as spending } from '@/mocks/data'

const SpendingPulse = () => {
  return (
    <section className="panel" aria-labelledby="spending-title">
      <header className="panel__head">
        <div>
          <h2 id="spending-title" className="panel__title">Spending this month</h2>
          <p className="muted">Recorded ownership costs</p>
        </div>
      </header>
      <div className="panel__body spending">
        <p className="spending__total tabular">
          {formatCurrency(spending.total)} <Badge tone="ok">{Math.abs(spending.change)}% lower than last month</Badge>
        </p>
        <div className="spending__chart">
          <Donut segments={spending.segments} centerLabel={`₱${(spending.total / 1000).toFixed(1)}k`} centerSub="this month" />
          <ul className="legend">
            {spending.segments.map((s) => (
              <li key={s.label}>
                <i style={{ background: s.color }} aria-hidden="true" />
                <span>{s.label}</span>
                <b className="tabular">{formatCurrency(s.amount)}</b>
              </li>
            ))}
          </ul>
        </div>
        <Button variant="secondary" block to="/truecost">Open TrueCost <ArrowRight size={16} aria-hidden="true" /></Button>
      </div>
    </section>
  )
}

export default SpendingPulse
