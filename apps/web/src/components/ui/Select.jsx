import React from 'react'
import { ChevronDown } from 'lucide-react'
import Dropdown from '@/components/ui/Dropdown'

// A custom dropdown with the same look on every platform.
// Pass `fieldLabel` for a visible label above it, or `label` for toolbar use.
const Select = ({ fieldLabel, label, value, onChange, options, compact = false, align = 'start' }) => {
  const current = options.find((option) => option.value === value)
  const dropdown = (
    <Dropdown
      align={align}
      matchWidth
      ariaLabel={`${fieldLabel ?? label}: ${current?.label ?? ''}`}
      triggerClassName={`select${compact ? ' select--compact' : ''}`}
      trigger={
        <>
          <span>{current?.label}</span>
          <ChevronDown size={16} aria-hidden="true" />
        </>
      }
      items={options.map((option) => ({
        key: option.value,
        label: option.label,
        role: 'menuitemradio',
        checked: option.value === value,
        onSelect: () => onChange(option.value),
      }))}
    />
  )

  if (!fieldLabel) return dropdown
  return (
    <div className="field">
      <span className="field__label">{fieldLabel}</span>
      {dropdown}
    </div>
  )
}

export default Select
