import React from 'react'
import ThemeToggle from '@/components/layout/ThemeToggle'

const Header = () => {
  return (
    <header className="header">
      <p className="header__tagline">Your life, remembered.</p>
      <ThemeToggle />
    </header>
  )
}

export default Header
