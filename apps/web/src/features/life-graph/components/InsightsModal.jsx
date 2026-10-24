import React from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { insights } from '@/mocks/data'

const InsightsModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="What your graph shows"
      description="Patterns found in your connected records."
      footer={<Button variant="primary" onClick={onClose}>Got it</Button>}
    >
      <ul className="insights">
        {insights.map((text) => <li key={text}>{text}</li>)}
      </ul>
    </Modal>
  )
}

export default InsightsModal
