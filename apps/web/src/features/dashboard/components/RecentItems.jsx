import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import ItemThumb from '@/components/data-display/ItemThumb'
import { formatCurrency } from '@/lib/format'
import { statusMeta } from '@/lib/status'
import { useDataStore } from '@/stores/dataStore'

const RecentItems = () => {
  const items = useDataStore((state) => state.items).slice(0, 3)

  return (
    <section className="panel" aria-labelledby="recent-title">
      <header className="panel__head">
        <div>
          <h2 id="recent-title" className="panel__title">Recently updated</h2>
          <p className="muted">Your latest items</p>
        </div>
        <Link to="/inventory" className="text-link">View inventory <ArrowRight size={16} aria-hidden="true" /></Link>
      </header>
      <ul className="rows">
        {items.map((item) => (
          <li key={item.id} className="row">
            <ItemThumb icon={item.icon} />
            <div className="row__text">
              <p className="row__title">{item.name}</p>
              <p className="muted row__sub">{item.type}</p>
            </div>
            <Badge tone={statusMeta[item.status].tone}>{statusMeta[item.status].label}</Badge>
            <span className="tabular row__price">{formatCurrency(item.price)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RecentItems
