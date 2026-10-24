import React, { useId } from 'react'

const TextField = ({ label, error, hint, trailing, className = '', id, ...inputProps }) => {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <div className={`field ${className}`}>
      <label className="field__label" htmlFor={inputId}>
        {label}
      </label>
      <div className="input-wrap">
        <input
          id={inputId}
          className="input"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...inputProps}
        />
        {trailing && <div className="input-wrap__trailing">{trailing}</div>}
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="field__error">
          {error}
        </p>
      ) : (
        hint && <p className="field__hint">{hint}</p>
      )}
    </div>
  )
}

export default TextField
