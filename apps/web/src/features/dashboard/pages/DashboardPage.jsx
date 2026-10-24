import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Button from '@/components/ui/Button'
import OwlMark from '@/components/ui/OwlMark'
import StatLedger from '@/features/dashboard/components/StatLedger'
import AttentionList from '@/features/dashboard/components/AttentionList'
import SpendingPulse from '@/features/dashboard/components/SpendingPulse'
import RecentItems from '@/features/dashboard/components/RecentItems'
import AddItemModal from '@/features/inventory/components/AddItemModal'
import { greeting } from '@/lib/date'
import { useAuthStore } from '@/stores/authStore'
import { useDataStore } from '@/stores/dataStore'

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user)
  const items = useDataStore((state) => state.items)
  const [addOpen, setAddOpen] = useState(false)
  const attention = items.filter((i) => ['expiring', 'action', 'maintenance'].includes(i.status)).length

  return (
    <>
      <PageHeader
        title={`${greeting()}, ${user.name}.`}
        description={attention ? `${attention} ${attention === 1 ? 'thing needs' : 'things need'} your attention soon.` : 'Nothing needs your attention right now.'}
        actions={<Button variant="primary" onClick={() => setAddOpen(true)}><Plus size={18} aria-hidden="true" /> Add item</Button>}
      />

      <Link to="/life-query" className="askbar">
        <OwlMark glyph size={22} />
        <span>Ask Vauwl: which warranties expire soon?</span>
      </Link>

      <StatLedger />

      <div className="grid-2">
        <AttentionList />
        <SpendingPulse />
      </div>

      <RecentItems />
      <AddItemModal open={addOpen} onClose={() => setAddOpen(false)} />
    </>
  )
}

export default DashboardPage
