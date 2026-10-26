import { Check, Clock, MoreHorizontal, Repeat, Trash2 } from 'lucide-react'
import Dropdown from '@/components/ui/Dropdown'
import { dateParts, formatDate } from '@/lib/date'
import { dueLabel, kindMeta, repeatLabel, toneFor } from '@/lib/timeline'

const TimelineEvent = ({ reminder, itemName, done, leaving, onToggle, onSnooze, onDelete }) => {
  const Kind = kindMeta[reminder.kind]?.icon ?? kindMeta.custom.icon
  const { day, month } = dateParts(done ? reminder.completedOn : reminder.dueOn)
  const tone = done ? 'done' : toneFor(reminder.dueOn)

  return (
    <li className={`tl-event${leaving ? ' is-leaving' : ''}${done ? ' is-done' : ''}`} data-tone={tone}>
      <div className="tl-event__date">
        <b className="tabular">{day}</b>
        <span>{month}</span>
      </div>
      <div className="tl-event__rail" aria-hidden="true" />
      <div className="tl-card">
        <button
          type="button"
          className="tl-check"
          aria-pressed={done}
          aria-label={done ? `Reopen ${reminder.title}` : `Mark ${reminder.title} done`}
          onClick={() => onToggle(reminder)}
        >
          <Check size={14} strokeWidth={3} aria-hidden="true" />
        </button>
        <div className="tl-card__text">
          <p className="tl-card__title">{reminder.title}</p>
          <p className="tl-card__meta">
            <Kind size={14} aria-hidden="true" />
            <span>{itemName ?? 'General'}</span>
            <span className="tl-card__due">{done ? `Done ${formatDate(reminder.completedOn)}` : dueLabel(reminder.dueOn)}</span>
            {reminder.recurrenceMonths > 0 && (
              <span className="tl-card__repeat">
                <Repeat size={13} aria-hidden="true" /> {repeatLabel(reminder.recurrenceMonths)}
              </span>
            )}
          </p>
        </div>
        <Dropdown
          ariaLabel={`Actions for ${reminder.title}`}
          trigger={<MoreHorizontal size={18} aria-hidden="true" />}
          items={[
            ...(done
              ? []
              : [
                  { key: 's1', label: 'Snooze 1 day', icon: Clock, onSelect: () => onSnooze(reminder, 1) },
                  { key: 's7', label: 'Snooze 1 week', icon: Clock, onSelect: () => onSnooze(reminder, 7) },
                  { key: 's30', label: 'Snooze 1 month', icon: Clock, onSelect: () => onSnooze(reminder, 30) },
                  { key: 'sep', separator: true },
                ]),
            { key: 'del', label: 'Delete', icon: Trash2, danger: true, onSelect: () => onDelete(reminder) },
          ]}
        />
      </div>
    </li>
  )
}

export default TimelineEvent
