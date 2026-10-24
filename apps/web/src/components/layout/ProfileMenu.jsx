import { useNavigate } from 'react-router-dom'
import { ChevronDown, LogOut, Settings, UserRoundPlus } from 'lucide-react'
import Dropdown from '@/components/ui/Dropdown'
import { useAuthStore } from '@/stores/authStore'

const ProfileMenu = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const accounts = useAuthStore((state) => state.accounts)
  const switchAccount = useAuthStore((state) => state.switchAccount)
  const signOut = useAuthStore((state) => state.signOut)
  const initials = user.name.slice(0, 2).toUpperCase()

  return (
    <Dropdown
      ariaLabel="Account menu"
      triggerClassName="profile-trigger"
      trigger={
        <>
          <span className="avatar">{initials}</span>
          <span className="profile-trigger__name">{user.name}</span>
          <ChevronDown size={16} className="profile-trigger__chev" aria-hidden="true" />
        </>
      }
      items={[
        { key: 'settings', label: 'Account Settings', icon: Settings, onSelect: () => navigate('/settings') },
        { key: 'sep1', separator: true },
        {
          key: 'switch',
          label: 'Switch Account',
          icon: UserRoundPlus,
          onSelect: () => navigate('/login', { state: { switchAccount: true } }),
        },
        ...accounts.map((account) => ({
          key: `account-${account.email}`,
          label: account.name,
          description: account.email,
          role: 'menuitemradio',
          checked: account.email === user.email,
          onSelect: () => switchAccount(account.email),
        })),
        { key: 'sep2', separator: true },
        { key: 'out', label: 'Sign out', icon: LogOut, danger: true, onSelect: () => { signOut(); navigate('/login') } },
      ]}
    />
  )
}

export default ProfileMenu
