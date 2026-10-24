import { Link, NavLink } from 'react-router-dom'
import OwlMark from '@/components/ui/OwlMark'
import { navigation } from '@/app/navigation'

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Link to="/" className="brand sidebar__brand">
        <OwlMark size={28} />
        <img className="brand__wordmark" src="/vauwl-name-logo.png" alt="Vauwl" />
      </Link>
      <nav aria-label="Main">
        <ul className="sidebar__list">
          {navigation.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>
                <Icon size={18} aria-hidden="true" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
