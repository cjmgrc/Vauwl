import React from 'react'
import { NavLink } from 'react-router-dom'
import { navigation } from '@/app/navigation'

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo" aria-hidden="true">V</span>
        <span className="sidebar__name">Vauwl</span>
      </div>

      <nav aria-label="Main">
        <ul className="sidebar__list">
          {navigation.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `sidebar__link${isActive ? ' is-active' : ''}`
                }
                title={label}
              >
                <Icon size={18} aria-hidden="true" />
                <span className="sidebar__label">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
