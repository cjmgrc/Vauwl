import { create } from 'zustand'

export const useToastStore = create((set) => ({
  toasts: [],
  push: (message) => {
    const id = Math.random().toString(36).slice(2)
    set((state) => ({ toasts: [...state.toasts, { id, message }] }))
    setTimeout(() => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })), 3200)
  },
}))

// Call from anywhere: toast('Saved')
export const toast = (message) => useToastStore.getState().push(message)
