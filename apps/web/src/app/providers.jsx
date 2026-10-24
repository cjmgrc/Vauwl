import React, { useEffect } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/app/query-client'
import { applyTheme, useThemeStore } from '@/stores/themeStore'

const Providers = ({ children }) => {
  const preference = useThemeStore((state) => state.preference)

  // Keep <html data-theme> in sync, and follow the OS when set to "system".
  useEffect(() => {
    applyTheme(preference)
    if (preference !== 'system') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyTheme('system')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [preference])

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default Providers
