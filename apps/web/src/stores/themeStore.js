import { create } from 'zustand'

const STORAGE_KEY = 'vauwl-theme' // keep in sync with the script in index.html
const THEME_COLORS = { light: '#E4E7EA', dark: '#0E1013' }

const readPreference = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'system'
  } catch {
    return 'system'
  }
}

export const resolveTheme = (preference) => {
  if (preference !== 'system') return preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const applyTheme = (preference) => {
  const theme = resolveTheme(preference)
  document.documentElement.dataset.theme = theme
  // Keep the browser/status bar color in step with the in-app choice
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.removeAttribute('media')
    meta.setAttribute('content', THEME_COLORS[theme])
  })
}

// preference: 'light' | 'dark' | 'system'
export const useThemeStore = create((set) => ({
  preference: readPreference(),
  setPreference: (preference) => {
    try { localStorage.setItem(STORAGE_KEY, preference) } catch { /* storage blocked */ }
    set({ preference })
  },
}))
