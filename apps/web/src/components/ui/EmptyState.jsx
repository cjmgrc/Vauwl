import React from 'react'

const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="empty">
      {Icon && <Icon size={28} aria-hidden="true" />}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  )
}

export default EmptyState
