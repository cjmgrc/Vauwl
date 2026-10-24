import React from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ItemThumb from '@/components/data-display/ItemThumb'
import { formatCurrency } from '@/lib/format'
import { statusMeta } from '@/lib/status'
import { useDataStore } from '@/stores/dataStore'

const ItemDetailModal = ({ item, onClose, onDelete }) => {
  const documents = useDataStore((state) => state.documents)
  const linked = item ? documents.filter((d) => d.itemId === item.id) : []

  return (
    <Modal
      open={Boolean(item)}
      onClose={onClose}
      title={item?.name ?? ''}
      footer={
        <>
          <Button variant="danger" onClick={() => onDelete(item)}>Delete item</Button>
          <Button variant="secondary" onClick={onClose}>Done</Button>
        </>
      }
    >
      {item && (
        <div className="detail">
          <div className="detail__top">
            <ItemThumb icon={item.icon} size={64} />
            <div>
              <p className="muted">{item.type}</p>
              <p className="detail__price tabular">{formatCurrency(item.price)}</p>
            </div>
            <Badge tone={statusMeta[item.status].tone}>{statusMeta[item.status].label}</Badge>
          </div>
          <dl className="detail__list">
            <div><dt>Category</dt><dd>{item.category}</dd></div>
            <div><dt>Next up</dt><dd>{item.note}</dd></div>
            <div><dt>Documents</dt><dd>{linked.length ? linked.map((d) => d.name).join(', ') : 'None attached'}</dd></div>
          </dl>
        </div>
      )}
    </Modal>
  )
}

export default ItemDetailModal
