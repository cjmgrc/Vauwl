import React from 'react'
import { itemIcons } from '@/lib/categories'

// No photos yet: an app-icon style tile. data-icon lets ios.css color each kind of item.
const ItemThumb = ({ icon = 'user', size = 44, className = '' }) => {
  const Icon = itemIcons[icon] ?? itemIcons.user
  return (
    <span className={`thumb ${className}`} data-icon={icon} style={{ '--thumb': `${size}px` }} aria-hidden="true">
      <Icon size={Math.round(size * 0.48)} />
    </span>
  )
}

export default ItemThumb
