import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/app/App'
import '@/styles/tokens.css'
import '@/styles/themes.css'
import '@/styles/globals.css'
import '@/components/ui/ui.css'
import '@/components/layout/layout.css'
import '@/components/data-display/charts.css'
import '@/styles/pages.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
