import { create } from 'zustand'

const KEY = 'vauwl-session'
const ACCOUNTS_KEY = 'vauwl-accounts'

const readSession = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY))
  } catch {
    return null
  }
}

const readAccounts = () => {
  try {
    const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY))
    return Array.isArray(accounts)
      ? accounts.filter((account) => account && typeof account.name === 'string' && typeof account.email === 'string')
      : []
  } catch {
    return []
  }
}

const writeAccounts = (accounts) => {
  try { localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts)) } catch { /* storage blocked */ }
}

const currentUser = readSession()
const savedAccounts = readAccounts()
const initialAccounts = currentUser && !savedAccounts.some((account) => account.email.toLowerCase() === currentUser.email?.toLowerCase())
  ? [currentUser, ...savedAccounts]
  : savedAccounts

export const nameFromEmail = (email) => {
  const first = email.split('@')[0].split(/[._-]/)[0].replace(/\d+/g, '')
  return first ? first[0].toUpperCase() + first.slice(1) : 'there'
}

// Placeholder auth: swap for the API session once the backend exists.
export const useAuthStore = create((set, get) => ({
  user: currentUser,
  accounts: initialAccounts,
  signIn: (user) => {
    try { localStorage.setItem(KEY, JSON.stringify(user)) } catch { /* storage blocked */ }
    const accounts = [
      user,
      ...get().accounts.filter((account) => account.email.toLowerCase() !== user.email.toLowerCase()),
    ]
    writeAccounts(accounts)
    set({ user, accounts })
  },
  switchAccount: (email) => {
    const user = get().accounts.find((account) => account.email === email)
    if (!user) return
    try { localStorage.setItem(KEY, JSON.stringify(user)) } catch { /* storage blocked */ }
    set({ user })
  },
  updateProfile: ({ name, email }) => {
    const previous = get().user
    const user = { ...previous, name, email }
    try { localStorage.setItem(KEY, JSON.stringify(user)) } catch { /* storage blocked */ }
    const accounts = get().accounts.map((account) =>
      account.email.toLowerCase() === previous.email.toLowerCase() ? user : account
    )
    writeAccounts(accounts)
    set({ user, accounts })
  },
  deleteAccount: () => {
    const { user } = get()
    const accounts = get().accounts.filter((account) => account.email.toLowerCase() !== user.email.toLowerCase())
    writeAccounts(accounts)
    try { localStorage.removeItem(KEY) } catch { /* storage blocked */ }
    set({ user: null, accounts })
  },
  signOut: () => {
    try { localStorage.removeItem(KEY) } catch { /* storage blocked */ }
    set({ user: null })
  },
}))
