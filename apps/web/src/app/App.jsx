import React from 'react'
import { RouterProvider } from 'react-router-dom'
import Providers from '@/app/providers'
import { router } from '@/app/router'
import Toaster from '@/components/ui/Toaster'

const App = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
      <Toaster />
    </Providers>
  )
}

export default App
