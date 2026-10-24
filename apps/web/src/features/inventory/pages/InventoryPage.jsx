import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, LayoutGrid, List, PackageSearch, Plus, Search } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Segmented from '@/components/ui/Segmented'
import EmptyState from '@/components/ui/EmptyState'
import ConfirmModal from '@/components/ui/ConfirmModal'
import ItemCard from '@/features/inventory/components/ItemCard'
import AddItemModal from '@/features/inventory/components/AddItemModal'
import InventoryFiltersModal from '@/features/inventory/components/InventoryFiltersModal'
import ItemDetailModal from '@/features/inventory/components/ItemDetailModal'
import { categories } from '@/mocks/data'
import { formatCurrency } from '@/lib/format'
import { useDataStore } from '@/stores/dataStore'
import { toast } from '@/stores/toastStore'

const sortOptions = [
  { value: 'recent', label: 'Recently added' },
  { value: 'name', label: 'Name, A to Z' },
  { value: 'high', label: 'Value, high to low' },
  { value: 'low', label: 'Value, low to high' },
]

const sorters = {
  recent: () => 0,
  name: (a, b) => a.name.localeCompare(b.name),
  high: (a, b) => b.price - a.price,
  low: (a, b) => a.price - b.price,
}

const InventoryPage = () => {
  const [params, setParams] = useSearchParams()
  const items = useDataStore((state) => state.items)
  const removeItem = useDataStore((state) => state.removeItem)
  const [category, setCategory] = useState('All')
  const [statuses, setStatuses] = useState([])
  const [sort, setSort] = useState('recent')
  const [view, setView] = useState('grid')
  const [addOpen, setAddOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [detail, setDetail] = useState(null)
  const [toDelete, setToDelete] = useState(null)
  const query = params.get('q') ?? ''

  const setQuery = (value) => setParams(value ? { q: value } : {}, { replace: true })

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items
      .filter((i) => category === 'All' || i.category === category)
      .filter((i) => !statuses.length || statuses.includes(i.status))
      .filter((i) => !q || `${i.name} ${i.type}`.toLowerCase().includes(q))
      .sort(sorters[sort])
  }, [items, category, statuses, query, sort])

  const total = items.reduce((sum, i) => sum + i.price, 0)

  return (
    <>
      <PageHeader
        title="My Inventory"
        description={`${items.length} items worth ${formatCurrency(total)}. Everything you own, with its context.`}
        actions={<Button variant="primary" onClick={() => setAddOpen(true)}><Plus size={18} aria-hidden="true" /> Add item</Button>}
      />

      <div className="toolbar">
        <div className="input-wrap toolbar__search">
          <Search size={18} className="input-icon" aria-hidden="true" />
          <input
            type="search" className="input input-search" placeholder={`Search ${items.length} items`} aria-label="Search items"
            enterKeyHint="search" autoCapitalize="none" autoCorrect="off" value={query} onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button variant="secondary" onClick={() => setFiltersOpen(true)}>
          <Filter size={16} aria-hidden="true" /> Filters{statuses.length > 0 && <span className="count">{statuses.length}</span>}
        </Button>
        <Select label="Sort items" compact align="end" value={sort} onChange={setSort} options={sortOptions} />
        <Segmented
          label="Layout" value={view} onChange={setView}
          options={[{ value: 'grid', label: 'Grid view', icon: LayoutGrid }, { value: 'list', label: 'List view', icon: List }]}
        />
      </div>

      <div className="chips" role="group" aria-label="Category">
        {['All', ...categories].map((name) => {
          const count = name === 'All' ? items.length : items.filter((i) => i.category === name).length
          return (
            <button key={name} type="button" className="chip" aria-pressed={category === name} onClick={() => setCategory(name)}>
              {name} <small className="tabular">{count}</small>
            </button>
          )
        })}
      </div>

      {visible.length ? (
        <div className={`items items--${view}`}>
          {visible.map((item) => (
            <ItemCard key={item.id} item={item} layout={view} onOpen={setDetail} onDelete={setToDelete} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={PackageSearch}
          title={items.length ? 'No items match' : 'Nothing tracked yet'}
          description={items.length ? 'Try a different search or clear your filters.' : 'Add your first item to start building its history.'}
          action={
            items.length
              ? <Button variant="secondary" onClick={() => { setQuery(''); setStatuses([]); setCategory('All') }}>Clear filters</Button>
              : <Button variant="primary" onClick={() => setAddOpen(true)}>Add item</Button>
          }
        />
      )}

      <AddItemModal open={addOpen} onClose={() => setAddOpen(false)} />
      <InventoryFiltersModal open={filtersOpen} onClose={() => setFiltersOpen(false)} selected={statuses} onApply={setStatuses} />
      <ItemDetailModal item={detail} onClose={() => setDetail(null)} onDelete={(item) => { setDetail(null); setToDelete(item) }} />
      <ConfirmModal
        open={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        title={`Delete ${toDelete?.name ?? 'item'}?`}
        description="Its record and history will be removed. Attached documents stay in your vault."
        onConfirm={() => { removeItem(toDelete.id); toast(`Deleted ${toDelete.name}`) }}
      />
    </>
  )
}

export default InventoryPage
