import { Link } from 'react-router-dom'
import OwlMark from '@/components/ui/OwlMark'
import OwlEyes from '@/features/auth/components/OwlEyes'

const AuthShell = ({ children }) => {
  return (
    <div className="auth">
      <aside className="auth__brand">
        <Link to="/login" className="brand">
          <OwlMark size={30} />
          <img className="brand__wordmark" src="/vauwl-name-logo.png" alt="Vauwl" />
        </Link>
        <div className="auth__hero">
          <OwlEyes />
          <p className="auth__headline">Know what you own. Know what it needs.</p>
          <p className="muted">
            Receipts, warranties, repairs, and reminders for everything you own, kept in one place and linked together.
          </p>
        </div>
        <ul className="auth__points">
          <li>Warranty deadlines surface before they pass.</li>
          <li>Every repair and expense stays on the item’s record.</li>
          <li>Ask a question and get an answer from your own records.</li>
        </ul>
      </aside>
      <main className="auth__panel">
        <div className="auth__form">
          <Link to="/login" className="brand auth__mobile-brand">
            <OwlMark size={28} />
            <img className="brand__wordmark" src="/vauwl-name-logo.png" alt="Vauwl" />
          </Link>
          {children}
        </div>
      </main>
    </div>
  )
}

export default AuthShell
