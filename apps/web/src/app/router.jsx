import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import ComingSoonPage from '@/components/feedback/ComingSoonPage'
import NotFoundPage from '@/components/feedback/NotFoundPage'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import { navigation } from '@/app/navigation'

// Every module except the dashboard is a placeholder until it is built.
// Replace the element with the real page as each feature lands.
const placeholderRoutes = navigation
  .filter((item) => item.to !== '/')
  .map((item) => ({
    path: item.to.slice(1),
    element: <ComingSoonPage title={item.label} />,
  }))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      ...placeholderRoutes,
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
