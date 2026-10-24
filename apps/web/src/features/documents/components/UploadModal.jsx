import React, { useEffect, useState } from 'react'
import { Upload } from 'lucide-react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import TextField from '@/components/ui/TextField'
import Select from '@/components/ui/Select'
import { documentCategories } from '@/mocks/data'
import { useDataStore } from '@/stores/dataStore'
import { toast } from '@/stores/toastStore'

const categoryOptions = documentCategories.map((c) => ({ value: c, label: c }))

const UploadModal = ({ open, onClose }) => {
  const items = useDataStore((state) => state.items)
  const addDocument = useDataStore((state) => state.addDocument)
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Receipt')
  const [itemId, setItemId] = useState('none')
  const [expires, setExpires] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      setFile(null); setName(''); setCategory('Receipt'); setItemId('none'); setExpires(''); setError('')
    }
  }, [open])

  const itemOptions = [{ value: 'none', label: 'Not linked' }, ...items.map((i) => ({ value: i.id, label: i.name }))]

  const onFile = (event) => {
    const picked = event.target.files?.[0]
    if (!picked) return
    setFile(picked)
    setName((current) => current || picked.name)
    setError('')
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (!file) {
      setError('Choose a file to upload.')
      return
    }
    addDocument({
      name: name.trim() || file.name,
      itemId: itemId === 'none' ? null : itemId,
      category,
      expires: expires || null,
      size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
    })
    toast(`Saved ${name.trim() || file.name}`)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Upload a document"
      description="Receipts, warranties, manuals, and records."
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit" form="upload-form">Save document</Button>
        </>
      }
    >
      <form id="upload-form" className="form-grid" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label className="dropzone">
            <Upload size={22} aria-hidden="true" />
            <b>{file ? file.name : 'Choose a file'}</b>
            <span className="muted">{file ? 'Tap to pick a different one' : 'PDF or image'}</span>
            <input type="file" accept="application/pdf,image/*" onChange={onFile} />
          </label>
          {error && <p className="field__error">{error}</p>}
        </div>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Select fieldLabel="Category" value={category} onChange={setCategory} options={categoryOptions} />
        <Select fieldLabel="Linked item" value={itemId} onChange={setItemId} options={itemOptions} />
        <TextField label="Expires" type="date" value={expires} onChange={(e) => setExpires(e.target.value)} hint="Optional. Set one for warranties and registrations." />
      </form>
    </Modal>
  )
}

export default UploadModal
