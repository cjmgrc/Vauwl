import { create } from 'zustand'

const STORAGE_KEY = 'vauwl-theme' // keep in sync with the script in index.html

const readPreference = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'system'
  } catch {
    return 'system'
  }
}

export const resolveTheme = (preference) => {
  if (preference !== 'system') return preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export const applyTheme = (preference) => {
  document.documentElement.dataset.theme = resolveTheme(preference)
}

// preference: 'light' | 'dark' | 'system'
export const useThemeStore = create((set) => ({
  preference: readPreference(),
  setPreference: (preference) => {
    try {
      localStorage.setItem(STORAGE_KEY, preference)
    } catch {
      // Storage can be blocked; the theme still applies for this session.
    }
    set({ preference })
  },
}))
