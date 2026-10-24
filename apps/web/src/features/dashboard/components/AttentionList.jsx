import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { dayParts } from '@/lib/date'
import { statusMeta } from '@/lib/status'
import { useDataStore } from '@/stores/dataStore'
import { toast } from '@/stores/toastStore'

const AttentionList = () => {
  const items = useDataStore((state) => state.items)
  const due = items
    .filter((i) => ['expiring', 'action', 'maintenance'].includes(i.status) && i.dueInDays != null)
    .sort((a, b) => a.dueInDays - b.dueInDays)

  return (
    <section className="panel" aria-labelledby="attention-title">
      <header className="panel__head">
        <div>
          <h2 id="attention-title" className="panel__title">Needs attention</h2>
          <p className="muted">Time-sensitive tasks and deadlines</p>
        </div>
        <Link to="/inventory" className="text-link">View all <ArrowRight size={16} aria-hidden="true" /></Link>
      </header>
      {due.length ? (
        <ul className="rows">
          {due.map((item) => {
            const { day, month } = dayParts(item.dueInDays)
            return (
              <li key={item.id} className="row">
                <span className="datetile" aria-hidden="true"><b>{day}</b>{month}</span>
                <div className="row__text">
                  <p className="row__title">{item.name}</p>
                  <p className="muted row__sub">{item.note}</p>
                </div>
                <Badge tone={statusMeta[item.status].tone}>{statusMeta[item.status].label}</Badge>
                <Button variant="secondary" onClick={() => toast(`Reminder set for ${item.name}`)}>{item.actionLabel}</Button>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="panel__body muted">Nothing is due right now.</p>
      )}
    </section>
  )
}

export default AttentionList
