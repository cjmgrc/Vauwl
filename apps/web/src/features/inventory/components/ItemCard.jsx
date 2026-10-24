import React from 'react'
import { Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Dropdown from '@/components/ui/Dropdown'
import ItemThumb from '@/components/data-display/ItemThumb'
import { formatCurrency } from '@/lib/format'
import { statusMeta } from '@/lib/status'

const ItemCard = ({ item, layout, onOpen, onDelete }) => {
  const status = statusMeta[item.status]

  return (
    <article className={`item-card item-card--${layout}`}>
      <button type="button" className="item-card__main" onClick={() => onOpen(item)}>
        <ItemThumb icon={item.icon} size={layout === 'grid' ? 56 : 44} />
        <span className="item-card__text">
          <span className="item-card__type muted">{item.type}</span>
          <span className="item-card__name">{item.name}</span>
          <span className="item-card__note muted">{item.note}</span>
        </span>
        <span className="item-card__meta">
          <span className="item-card__price tabular">{formatCurrency(item.price)}</span>
          <Badge tone={status.tone}>{status.label}</Badge>
        </span>
      </button>
      <div className="item-card__menu">
        <Dropdown
          ariaLabel={`Actions for ${item.name}`}
          trigger={<MoreHorizontal size={18} aria-hidden="true" />}
          items={[
            { key: 'view', label: 'View details', icon: Eye, onSelect: () => onOpen(item) },
            { key: 'sep', separator: true },
            { key: 'delete', label: 'Delete item', icon: Trash2, danger: true, onSelect: () => onDelete(item) },
          ]}
        />
      </div>
    </article>
  )
}

export default ItemCard
