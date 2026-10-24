import React from 'react'
import { RouterProvider } from 'react-router-dom'
import Providers from '@/app/providers'
import { router } from '@/app/router'

const App = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}

export default App
