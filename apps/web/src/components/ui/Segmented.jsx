import React from 'react'

const Segmented = ({ label, value, onChange, options }) => {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map(({ value: optionValue, label: optionLabel, icon: Icon }) => (
        <button
          key={optionValue}
          type="button"
          aria-pressed={value === optionValue}
          aria-label={optionLabel}
          title={optionLabel}
          onClick={() => onChange(optionValue)}
        >
          <Icon size={18} aria-hidden="true" />
        </button>
      ))}
    </div>
  )
}

export default Segmented
