import { create } from 'zustand'
import { initialDocuments, initialItems, initialRules } from '@/mocks/data'

const uid = () => Math.random().toString(36).slice(2, 10)

// In-memory data until the API exists. Swap these actions for API calls later.
export const useDataStore = create((set) => ({
  items: initialItems,
  documents: initialDocuments,
  rules: initialRules,

  addItem: (item) => set((s) => ({ items: [{ id: uid(), ...item }, ...s.items] })),
  removeItem: (id) =>
    set((s) => ({
      items: s.items.filter((i) => i.id !== id),
      documents: s.documents.map((d) => (d.itemId === id ? { ...d, itemId: null } : d)),
    })),

  addDocument: (doc) => set((s) => ({ documents: [{ id: uid(), ...doc }, ...s.documents] })),
  removeDocument: (id) => set((s) => ({ documents: s.documents.filter((d) => d.id !== id) })),

  addRule: (rule) => set((s) => ({ rules: [{ id: uid(), active: true, ...rule }, ...s.rules] })),
  toggleRule: (id) =>
    set((s) => ({ rules: s.rules.map((r) => (r.id === id ? { ...r, active: !r.active } : r)) })),
  removeRule: (id) => set((s) => ({ rules: s.rules.filter((r) => r.id !== id) })),
}))
