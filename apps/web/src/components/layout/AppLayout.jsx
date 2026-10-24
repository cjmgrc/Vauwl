import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import '@/components/layout/layout.css'

const AppLayout = () => {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <Sidebar />
      <div className="app-shell__body">
        <Header />
        <main id="main" className="app-shell__main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
