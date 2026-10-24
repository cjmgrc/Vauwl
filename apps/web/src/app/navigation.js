import {
  CalendarDays, FileText, LayoutDashboard, Package, Settings, Share2, Sparkles, TrendingUp, Zap,
} from 'lucide-react'

export const navigation = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/inventory', label: 'My Inventory', icon: Package },
  { to: '/life-graph', label: 'LifeGraph', icon: Share2 },
  { to: '/life-query', label: 'LifeQuery', icon: Sparkles },
  { to: '/automations', label: 'Automations', icon: Zap },
  { to: '/truecost', label: 'TrueCost', icon: TrendingUp },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/timeline', label: 'Timeline', icon: CalendarDays },
]

// Reached from the "More" sheet on phones
export const moreLinks = [
  ...navigation.filter((item) => ['/automations', '/truecost', '/documents', '/timeline'].includes(item.to)),
  { to: '/settings', label: 'Settings', icon: Settings },
]

export const titleFor = (pathname) =>
  [...navigation, { to: '/settings', label: 'Settings' }].find((item) =>
    item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)
  )?.label ?? 'Vauwl'
