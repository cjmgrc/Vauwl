import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Moon, Search, Sun } from 'lucide-react'
import OwlMark from '@/components/ui/OwlMark'
import NotificationsMenu from '@/components/layout/NotificationsMenu'
import ProfileMenu from '@/components/layout/ProfileMenu'
import { titleFor } from '@/app/navigation'
import { resolveTheme, useThemeStore } from '@/stores/themeStore'

const Topbar = ({ onSearch }) => {
  const { pathname } = useLocation()
  const preference = useThemeStore((state) => state.preference)
  const setPreference = useThemeStore((state) => state.setPreference)
  const isDark = resolveTheme(preference) === 'dark'

  return (
    <header className="topbar">
      <Link to="/" className="brand topbar__brand">
        <OwlMark size={26} />
        <img className="brand__wordmark" src="/vauwl-name-logo.png" alt="Vauwl" />
      </Link>
      <nav className="crumbs" aria-label="Breadcrumb">
        <span>Vauwl</span>
        <ChevronRight size={14} aria-hidden="true" />
        <strong>{titleFor(pathname)}</strong>
      </nav>
      <div className="topbar__actions">
        <button type="button" className="btn btn--ghost btn--icon" onClick={onSearch} aria-label="Search everything">
          <Search size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="btn btn--ghost btn--icon"
          onClick={() => setPreference(isDark ? 'light' : 'dark')}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
        </button>
        <NotificationsMenu />
        <ProfileMenu />
      </div>
    </header>
  )
}

export default Topbar
