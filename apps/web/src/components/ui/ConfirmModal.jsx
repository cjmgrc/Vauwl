import React from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'

const ConfirmModal = ({ open, onClose, onConfirm, title, description, confirmLabel = 'Delete' }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="muted">{description}</p>
    </Modal>
  )
}

export default ConfirmModal
