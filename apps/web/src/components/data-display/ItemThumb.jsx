import React from 'react'
import { itemIcons } from '@/lib/categories'

// No photos yet: a tinted tile with the item's icon. Replace with an <img> once uploads exist.
const ItemThumb = ({ icon = 'user', size = 44, className = '' }) => {
  const Icon = itemIcons[icon] ?? itemIcons.user
  return (
    <span className={`thumb ${className}`} style={{ '--thumb': `${size}px` }} aria-hidden="true">
      <Icon size={Math.round(size * 0.45)} />
    </span>
  )
}

export default ItemThumb
