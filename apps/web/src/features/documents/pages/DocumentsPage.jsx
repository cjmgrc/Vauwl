import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Download, FileSearch, FileText, MoreHorizontal, Search, Trash2, Upload } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Select from '@/components/ui/Select'
import Dropdown from '@/components/ui/Dropdown'
import EmptyState from '@/components/ui/EmptyState'
import ConfirmModal from '@/components/ui/ConfirmModal'
import UploadModal from '@/features/documents/components/UploadModal'
import { documentCategories } from '@/mocks/data'
import { formatDate } from '@/lib/date'
import { useDataStore } from '@/stores/dataStore'
import { toast } from '@/stores/toastStore'

const categoryOptions = [{ value: 'All', label: 'All categories' }, ...documentCategories.map((c) => ({ value: c, label: c }))]
const sortOptions = [
  { value: 'recent', label: 'Recently added' },
  { value: 'name', label: 'Name, A to Z' },
  { value: 'expires', label: 'Expiring soonest' },
]

const DocumentsPage = () => {
  const [params, setParams] = useSearchParams()
  const documents = useDataStore((state) => state.documents)
  const items = useDataStore((state) => state.items)
  const removeDocument = useDataStore((state) => state.removeDocument)
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('recent')
  const [uploadOpen, setUploadOpen] = useState(false)
  const [toDelete, setToDelete] = useState(null)
  const query = params.get('q') ?? ''

  const itemName = (id) => items.find((i) => i.id === id)?.name ?? 'Not linked'

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = documents
      .filter((d) => category === 'All' || d.category === category)
      .filter((d) => !q || `${d.name} ${itemName(d.itemId)}`.toLowerCase().includes(q))
    if (sort === 'name') return [...list].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'expires') return [...list].sort((a, b) => (a.expires ?? '9999').localeCompare(b.expires ?? '9999'))
    return list
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documents, items, category, sort, query])

  return (
    <>
      <PageHeader
        title="Every important file, findable."
        description="Receipts, warranties, manuals, and records, securely organized."
        actions={<Button variant="primary" onClick={() => setUploadOpen(true)}><Upload size={16} aria-hidden="true" /> Upload files</Button>}
      />

      <div className="toolbar">
        <div className="input-wrap toolbar__search">
          <Search size={18} className="input-icon" aria-hidden="true" />
          <input
            type="search" className="input input-search" placeholder="Search documents" aria-label="Search documents"
            enterKeyHint="search" autoCapitalize="none" autoCorrect="off" value={query}
            onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
          />
        </div>
        <Select label="Filter by category" compact value={category} onChange={setCategory} options={categoryOptions} />
        <Select label="Sort documents" compact align="end" value={sort} onChange={setSort} options={sortOptions} />
      </div>

      {visible.length ? (
        <div className="panel table-wrap">
          <table className="table table--docs">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col" className="hide-mobile">Linked item</th>
                <th scope="col" className="hide-mobile">Category</th>
                <th scope="col" className="hide-mobile">Expires</th>
                <th scope="col"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((doc) => (
                <tr key={doc.id}>
                  <th scope="row">
                    <span className="doc-name">
                      <span className="doc-icon" aria-hidden="true"><FileText size={18} /></span>
                      <span>
                        <span className="doc-name__text">{doc.name}</span>
                        <small className="muted show-mobile">{doc.category} for {itemName(doc.itemId)}</small>
                      </span>
                    </span>
                  </th>
                  <td className="hide-mobile muted">{itemName(doc.itemId)}</td>
                  <td className="hide-mobile"><Badge>{doc.category}</Badge></td>
                  <td className="hide-mobile muted tabular">{doc.expires ? formatDate(doc.expires) : 'None'}</td>
                  <td className="num">
                    <Dropdown
                      ariaLabel={`Actions for ${doc.name}`}
                      trigger={<MoreHorizontal size={18} aria-hidden="true" />}
                      items={[
                        { key: 'dl', label: 'Download', icon: Download, onSelect: () => toast('Downloads need the API, which isn’t built yet.') },
                        { key: 'sep', separator: true },
                        { key: 'del', label: 'Delete', icon: Trash2, danger: true, onSelect: () => setToDelete(doc) },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon={FileSearch}
          title={documents.length ? 'No documents match' : 'Your vault is empty'}
          description={documents.length ? 'Try a different search or category.' : 'Upload a receipt or warranty to keep it safe and findable.'}
          action={<Button variant="primary" onClick={() => setUploadOpen(true)}>Upload files</Button>}
        />
      )}

      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
      <ConfirmModal
        open={Boolean(toDelete)} onClose={() => setToDelete(null)}
        title={`Delete ${toDelete?.name ?? 'document'}?`} description="This removes the file from your vault."
        onConfirm={() => { removeDocument(toDelete.id); toast('Document deleted') }}
      />
    </>
  )
}

export default DocumentsPage
