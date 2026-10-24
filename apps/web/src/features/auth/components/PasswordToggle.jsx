import React from 'react'
import { Eye, EyeOff } from 'lucide-react'

const PasswordToggle = ({ visible, onToggle }) => {
  return (
    <button type="button" className="btn btn--ghost btn--icon" onClick={onToggle} aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible}>
      {visible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
    </button>
  )
}

export default PasswordToggle
