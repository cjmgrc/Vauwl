import {
  LayoutDashboard,
  Package,
  FileText,
  Share2,
  Search,
  Zap,
  TrendingUp,
  Bell,
  Settings,
} from 'lucide-react'

// Single source of truth for the sidebar and the router.
export const navigation = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/inventory', label: 'Inventory', icon: Package },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/reminders', label: 'Reminders', icon: Bell },
  { to: '/life-graph', label: 'LifeGraph', icon: Share2 },
  { to: '/life-query', label: 'LifeQuery', icon: Search },
  { to: '/automations', label: 'Automations', icon: Zap },
  { to: '/analytics', label: 'TrueCost', icon: TrendingUp },
  { to: '/settings', label: 'Settings', icon: Settings },
]
