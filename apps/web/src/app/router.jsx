import { createBrowserRouter } from 'react-router-dom'
import RequireAuth from '@/components/layout/RequireAuth'
import AppLayout from '@/components/layout/AppLayout'
import ComingSoonPage from '@/components/feedback/ComingSoonPage'
import NotFoundPage from '@/components/feedback/NotFoundPage'
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import InventoryPage from '@/features/inventory/pages/InventoryPage'
import LifeGraphPage from '@/features/life-graph/pages/LifeGraphPage'
import LifeQueryPage from '@/features/life-query/pages/LifeQueryPage'
import AutomationsPage from '@/features/automations/pages/AutomationsPage'
import TrueCostPage from '@/features/analytics/pages/TrueCostPage'
import DocumentsPage from '@/features/documents/pages/DocumentsPage'
import SettingsPage from '@/features/settings/pages/SettingsPage'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'inventory', element: <InventoryPage /> },
          { path: 'life-graph', element: <LifeGraphPage /> },
          { path: 'life-query', element: <LifeQueryPage /> },
          { path: 'automations', element: <AutomationsPage /> },
          { path: 'truecost', element: <TrueCostPage /> },
          { path: 'documents', element: <DocumentsPage /> },
          { path: 'timeline', element: <ComingSoonPage title="Timeline" /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
])
