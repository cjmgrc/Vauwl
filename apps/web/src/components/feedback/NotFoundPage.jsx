import React from 'react'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import { SearchX } from 'lucide-react'

const NotFoundPage = () => {
  return (
    <EmptyState
      icon={SearchX}
      title="Page not found"
      description="The page you’re looking for doesn’t exist or has moved."
      action={<Button variant="primary" to="/">Go to overview</Button>}
    />
  )
}

export default NotFoundPage
