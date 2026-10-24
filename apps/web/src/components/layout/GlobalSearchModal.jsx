import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Package, Search } from 'lucide-react'
import Modal from '@/components/ui/Modal'
import { useDataStore } from '@/stores/dataStore'

const GlobalSearchModal = ({ open, onClose }) => {
  const navigate = useNavigate()
  const items = useDataStore((state) => state.items)
  const documents = useDataStore((state) => state.documents)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (open) setQuery('')
  }, [open])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return [
      ...items.filter((i) => i.name.toLowerCase().includes(q)).map((i) => ({ key: i.id, label: i.name, detail: i.type, icon: Package, to: `/inventory?q=${encodeURIComponent(i.name)}` })),
      ...documents.filter((d) => d.name.toLowerCase().includes(q)).map((d) => ({ key: d.id, label: d.name, detail: d.category, icon: FileText, to: `/documents?q=${encodeURIComponent(d.name)}` })),
    ].slice(0, 8)
  }, [query, items, documents])

  const go = (to) => {
    onClose()
    navigate(to)
  }

  return (
    <Modal open={open} onClose={onClose} title="Search">
      <div className="input-wrap">
        <Search size={18} className="input-icon" aria-hidden="true" />
        <input
          data-autofocus
          type="search"
          className="input input-search"
          placeholder="Items and documents"
          aria-label="Search items and documents"
          enterKeyHint="search"
          autoCapitalize="none"
          autoCorrect="off"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <ul className="search-results" aria-live="polite">
        {results.map(({ key, label, detail, icon: Icon, to }) => (
          <li key={key}>
            <button type="button" className="search-results__row" onClick={() => go(to)}>
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
              <small className="muted">{detail}</small>
            </button>
          </li>
        ))}
        {query.trim() && results.length === 0 && <li className="muted search-results__empty">No matches for “{query.trim()}”.</li>}
      </ul>
    </Modal>
  )
}

export default GlobalSearchModal
