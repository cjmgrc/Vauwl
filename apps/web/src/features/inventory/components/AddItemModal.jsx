import React, { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import TextField from '@/components/ui/TextField'
import Select from '@/components/ui/Select'
import { categories } from '@/mocks/data'
import { defaultIconForCategory } from '@/lib/categories'
import { useDataStore } from '@/stores/dataStore'
import { toast } from '@/stores/toastStore'

const categoryOptions = categories.map((c) => ({ value: c, label: c }))

const AddItemModal = ({ open, onClose }) => {
  const addItem = useDataStore((state) => state.addItem)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Home')
  const [price, setPrice] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      setName('')
      setCategory('Home')
      setPrice('')
      setError('')
    }
  }, [open])

  const onSubmit = (event) => {
    event.preventDefault()
    if (!name.trim()) {
      setError('Give the item a name.')
      return
    }
    addItem({
      name: name.trim(),
      category,
      type: category,
      icon: defaultIconForCategory[category],
      price: Number(price) || 0,
      status: 'active',
      note: 'Added just now',
    })
    toast(`Added ${name.trim()}`)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add an item"
      description="Start with the basics. You can attach receipts and warranties afterward."
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit" form="add-item-form">Add item</Button>
        </>
      }
    >
      <form id="add-item-form" className="form-grid" onSubmit={onSubmit} noValidate>
        <TextField data-autofocus label="Name" placeholder="e.g. Dyson V15" value={name} error={error} onChange={(e) => setName(e.target.value)} />
        <Select fieldLabel="Category" value={category} onChange={setCategory} options={categoryOptions} />
        <TextField label="Purchase price (₱)" inputMode="decimal" placeholder="0" value={price} onChange={(e) => setPrice(e.target.value.replace(/[^\d.]/g, ''))} hint="Optional" />
      </form>
    </Modal>
  )
}

export default AddItemModal
