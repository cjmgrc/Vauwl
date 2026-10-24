import React from 'react'
import { NavLink } from 'react-router-dom'
import { Ellipsis, LayoutDashboard, Package, Share2 } from 'lucide-react'
import OwlMark from '@/components/ui/OwlMark'

const tabClass = ({ isActive }) => `bottom-nav__tab${isActive ? ' is-active' : ''}`

// LifeQuery sits in the middle as the raised owl button.
const BottomNav = ({ onMore }) => {
  return (
    <nav className="bottom-nav" aria-label="Main">
      <NavLink to="/" end className={tabClass}>
        <LayoutDashboard size={22} aria-hidden="true" />
        <span>Overview</span>
      </NavLink>
      <NavLink to="/inventory" className={tabClass}>
        <Package size={22} aria-hidden="true" />
        <span>Inventory</span>
      </NavLink>
      <NavLink to="/life-query" className={({ isActive }) => `bottom-nav__center${isActive ? ' is-active' : ''}`}>
        <span className="bottom-nav__orb">
          <OwlMark glyph size={30} />
        </span>
        <span>LifeQuery</span>
      </NavLink>
      <NavLink to="/life-graph" className={tabClass}>
        <Share2 size={22} aria-hidden="true" />
        <span>LifeGraph</span>
      </NavLink>
      <button type="button" className="bottom-nav__tab" onClick={onMore}>
        <Ellipsis size={22} aria-hidden="true" />
        <span>More</span>
      </button>
    </nav>
  )
}

export default BottomNav
