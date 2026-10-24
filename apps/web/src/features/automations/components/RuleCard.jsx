import React from 'react'
import { MoreHorizontal, Trash2 } from 'lucide-react'
import Dropdown from '@/components/ui/Dropdown'
import Switch from '@/components/ui/Switch'

const RuleCard = ({ rule, onToggle, onDelete }) => {
  return (
    <article className={`panel rule${rule.active ? '' : ' is-paused'}`}>
      <header className="rule__head">
        <h2 className="panel__title">{rule.name}</h2>
        <Dropdown
          ariaLabel={`Actions for ${rule.name}`}
          trigger={<MoreHorizontal size={18} aria-hidden="true" />}
          items={[{ key: 'delete', label: 'Delete rule', icon: Trash2, danger: true, onSelect: () => onDelete(rule) }]}
        />
      </header>
      <dl className="rule__flow">
        <div><dt>When</dt><dd>{rule.when}</dd></div>
        <div><dt>Then</dt><dd>{rule.then}</dd></div>
      </dl>
      <footer className="rule__foot">
        <span className="muted">{rule.active ? 'Running' : 'Paused'}</span>
        <Switch checked={rule.active} onChange={() => onToggle(rule)} label={`${rule.name} is ${rule.active ? 'on' : 'off'}`} />
      </footer>
    </article>
  )
}

export default RuleCard
