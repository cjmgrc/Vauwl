import React, { useState } from 'react'
import PageHeader from '@/components/ui/PageHeader'
import Select from '@/components/ui/Select'
import Badge from '@/components/ui/Badge'
import LineChart from '@/components/data-display/LineChart'
import { costSeries, costShares, topCosts } from '@/mocks/data'
import { lastMonths } from '@/lib/date'
import { formatCurrency } from '@/lib/format'

const ranges = [
  { value: '3', label: 'Last 3 months' },
  { value: '6', label: 'Last 6 months' },
  { value: '12', label: 'Last 12 months' },
]

const sum = (values) => values.reduce((total, v) => total + v, 0)

const TrueCostPage = () => {
  const [range, setRange] = useState('12')
  const count = Number(range)
  const current = costSeries.current.slice(-count)
  const previous = costSeries.previous.slice(-count)
  const total = sum(current)
  const change = ((total - sum(previous)) / sum(previous)) * 100

  return (
    <>
      <PageHeader
        title="Your things cost more than their price tags."
        description="The full cost of ownership, from recorded purchases, repairs, and upkeep."
        actions={<Select label="Time range" compact align="end" value={range} onChange={setRange} options={ranges} />}
      />

      <dl className="ledger panel">
        <div className="ledger__cell">
          <dt>Total ownership cost</dt>
          <dd className="ledger__value tabular">{formatCurrency(total)}</dd>
          <dd><Badge tone={change <= 0 ? 'ok' : 'warn'}>{Math.abs(change).toFixed(1)}% {change <= 0 ? 'lower' : 'higher'} than the period before</Badge></dd>
        </div>
        <div className="ledger__cell">
          <dt>Maintenance spend</dt>
          <dd className="ledger__value tabular">{formatCurrency(Math.round(total * 0.232))}</dd>
          <dd className="ledger__sub muted">23% of the total</dd>
        </div>
        <div className="ledger__cell">
          <dt>Average per month</dt>
          <dd className="ledger__value tabular">{formatCurrency(Math.round(total / count))}</dd>
        </div>
      </dl>

      <div className="grid-2 grid-2--wide-left">
        <section className="panel" aria-labelledby="trend-title">
          <header className="panel__head">
            <div>
              <h2 id="trend-title" className="panel__title">Cost trend</h2>
              <p className="muted">Purchases, maintenance, and subscriptions. Drag across the chart to read a month.</p>
            </div>
          </header>
          <div className="panel__body">
            <LineChart
              key={range}
              labels={lastMonths(count)}
              series={[
                { name: 'This period', values: current, color: 'var(--chart-1)' },
                { name: 'Year before', values: previous, color: 'var(--chart-2)', dashed: true },
              ]}
            />
          </div>
        </section>

        <section className="panel" aria-labelledby="cat-title">
          <header className="panel__head">
            <div>
              <h2 id="cat-title" className="panel__title">Cost by category</h2>
              <p className="muted">Where your money goes</p>
            </div>
          </header>
          <ul className="panel__body bars">
            {costShares.map(({ label, share }) => (
              <li key={label}>
                <div className="bars__row"><span>{label}</span><b className="tabular">{formatCurrency(Math.round(total * share))}</b></div>
                <div className="bars__track" role="presentation"><div className="bars__fill" style={{ width: `${(share / costShares[0].share) * 100}%` }} /></div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="panel" aria-labelledby="top-title">
        <header className="panel__head">
          <div>
            <h2 id="top-title" className="panel__title">Highest lifetime costs</h2>
            <p className="muted">Items with the greatest total cost of ownership</p>
          </div>
        </header>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th scope="col">Item</th><th scope="col" className="num">Purchase</th><th scope="col" className="num">Added costs</th><th scope="col" className="num">Lifetime</th><th scope="col" className="num">Change</th></tr>
            </thead>
            <tbody>
              {topCosts.map((row) => (
                <tr key={row.name}>
                  <th scope="row">{row.name}</th>
                  <td className="num tabular">{formatCurrency(row.purchase)}</td>
                  <td className="num tabular">{formatCurrency(row.added)}</td>
                  <td className="num tabular"><b>{formatCurrency(row.purchase + row.added)}</b></td>
                  <td className="num tabular">+{row.change}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default TrueCostPage
