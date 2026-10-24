import React from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Modal from '@/components/ui/Modal'
import { moreLinks } from '@/app/navigation'

const MoreSheet = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} title="More">
      <ul className="more-list">
        {moreLinks.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink to={to} className="more-list__link" onClick={onClose}>
              <Icon size={20} aria-hidden="true" />
              <span>{label}</span>
              <ChevronRight size={18} aria-hidden="true" />
            </NavLink>
          </li>
        ))}
      </ul>
    </Modal>
  )
}

export default MoreSheet
