import React from 'react'
import { dashboardStats } from '@/mocks/dashboard'
import { formatNumber } from '@/lib/format'

const DashboardPage = () => {
  return (
    <section>
      <h1>Dashboard</h1>
      <p className="muted">Deadlines, recent activity, and your inventory at a glance.</p>

      <dl className="stat-grid">
        {dashboardStats.map((stat) => (
          <div key={stat.id} className="stat">
            <dd className="stat__value">{formatNumber(stat.value)}</dd>
            <dt className="stat__label">{stat.label}</dt>
          </div>
        ))}
      </dl>

      <div className="empty">
        <h2>Nothing tracked yet</h2>
        <p className="muted">Add your first item to start building its history.</p>
      </div>
    </section>
  )
}

export default DashboardPage
