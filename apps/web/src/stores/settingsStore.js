import { create } from 'zustand'

const KEY = 'vauwl-settings'

const defaults = {
  density: 'comfortable', // 'comfortable' | 'compact'
  defaultView: 'grid', // inventory layout: 'grid' | 'list'
  reduceMotion: false,
  notify: { warranty: true, maintenance: true, overdue: true, digest: false, email: true, leadDays: 30 },
}

const read = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    return { ...defaults, ...saved, notify: { ...defaults.notify, ...saved?.notify } }
  } catch {
    return defaults
  }
}

const save = ({ density, defaultView, reduceMotion, notify }) => {
  try { localStorage.setItem(KEY, JSON.stringify({ density, defaultView, reduceMotion, notify })) } catch { /* storage blocked */ }
}

// Density and motion are applied as attributes on <html>; settings.css reacts to them.
const apply = ({ density, reduceMotion }) => {
  const root = document.documentElement
  root.dataset.density = density
  root.dataset.motion = reduceMotion ? 'reduced' : 'full'
}

export const useSettingsStore = create((set, get) => ({
  ...read(),
  setSetting: (key, value) => {
    set({ [key]: value })
    apply(get())
    save(get())
  },
  setNotify: (key, value) => {
    set((state) => ({ notify: { ...state.notify, [key]: value } }))
    save(get())
  },
}))

apply(useSettingsStore.getState())
