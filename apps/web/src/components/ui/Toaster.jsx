import React from 'react'
import { useToastStore } from '@/stores/toastStore'

const Toaster = () => {
  const toasts = useToastStore((state) => state.toasts)
  const bare = window.location.pathname.startsWith('/login') || window.location.pathname.startsWith('/register')

  return (
    <div className="toaster" role="status" aria-live="polite" data-bare={bare || undefined}>
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          {toast.message}
        </div>
      ))}
    </div>
  )
}

export default Toaster
