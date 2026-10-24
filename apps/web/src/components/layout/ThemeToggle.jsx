import React from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/stores/themeStore'

const options = [
  { value: 'light', label: 'Light theme', icon: Sun },
  { value: 'system', label: 'System theme', icon: Monitor },
  { value: 'dark', label: 'Dark theme', icon: Moon },
]

const ThemeToggle = () => {
  const preference = useThemeStore((state) => state.preference)
  const setPreference = useThemeStore((state) => state.setPreference)

  return (
    <div className="theme-toggle" role="radiogroup" aria-label="Theme">
      {options.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={preference === value}
          aria-label={label}
          title={label}
          className="theme-toggle__option"
          onClick={() => setPreference(value)}
        >
          <Icon size={16} aria-hidden="true" />
        </button>
      ))}
    </div>
  )
}

export default ThemeToggle
