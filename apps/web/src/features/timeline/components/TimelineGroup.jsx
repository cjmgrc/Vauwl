import { useId } from 'react'
import TimelineEvent from '@/features/timeline/components/TimelineEvent'

const TimelineGroup = ({ group, itemsById, done = false, leaving, onToggle, onSnooze, onDelete }) => {
  const headingId = useId()

  return (
    <section className="tl-group" aria-labelledby={headingId} data-group={group.key}>
      <h2 id={headingId} className="tl-group__title">
        {group.label} <span className="tabular">{group.items.length}</span>
      </h2>
      <ol className="tl-list">
        {group.items.map((reminder) => (
          <TimelineEvent
            key={reminder.id}
            reminder={reminder}
            itemName={itemsById[reminder.itemId]?.name}
            done={done}
            leaving={leaving.has(reminder.id)}
            onToggle={onToggle}
            onSnooze={onSnooze}
            onDelete={onDelete}
          />
        ))}
      </ol>
    </section>
  )
}

export default TimelineGroup
