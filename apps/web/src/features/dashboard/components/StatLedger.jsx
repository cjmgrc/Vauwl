import React from 'react'
import Ring from '@/components/data-display/Ring'
import { formatCurrency, formatNumber } from '@/lib/format'
import { useDataStore } from '@/stores/dataStore'

// One strip with dividers instead of three identical cards.
const StatLedger = () => {
  const items = useDataStore((state) => state.items)
  const total = items.reduce((sum, i) => sum + i.price, 0)
  const covered = items.length ? Math.round((items.filter((i) => i.status === 'protected').length / items.length) * 100) : 0
  const attention = items.filter((i) => ['expiring', 'action', 'maintenance'].includes(i.status)).length

  return (
    <dl className="ledger panel">
      <div className="ledger__cell">
        <dt>Belongings tracked</dt>
        <dd className="ledger__value tabular">{formatNumber(items.length)}</dd>
      </div>
      <div className="ledger__cell">
        <dt>Total asset value</dt>
        <dd className="ledger__value tabular">{formatCurrency(total)}</dd>
      </div>
      <div className="ledger__cell ledger__cell--ring">
        <div>
          <dt>Under warranty or coverage</dt>
          <dd className="ledger__sub muted">{attention} need attention soon</dd>
        </div>
        <Ring percent={covered} label={`${covered}% of items covered`} />
      </div>
    </dl>
  )
}

export default StatLedger
