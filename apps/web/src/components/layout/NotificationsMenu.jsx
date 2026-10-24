import { useState } from 'react'
import { Bell, CheckCheck } from 'lucide-react'
import Dropdown from '@/components/ui/Dropdown'
import { notifications } from '@/mocks/data'

const NotificationsMenu = () => {
  const [read, setRead] = useState(false)

  return (
    <Dropdown
      ariaLabel={read ? 'Notifications' : 'Notifications, 3 unread'}
      align="center"
      triggerClassName="btn btn--ghost btn--icon bell"
      trigger={
        <>
          <Bell size={20} aria-hidden="true" />
          {!read && <span className="bell__dot" aria-hidden="true" />}
        </>
      }
      items={[
        ...notifications.map((n) => ({ key: n.id, label: n.title, description: n.detail })),
        { key: 'sep', separator: true },
        { key: 'read', label: 'Mark all as read', icon: CheckCheck, onSelect: () => setRead(true) },
      ]}
    />
  )
}

export default NotificationsMenu
