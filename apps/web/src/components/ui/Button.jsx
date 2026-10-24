import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({
  variant = 'secondary',
  size,
  block,
  icon,
  to,
  className = '',
  children,
  ...rest
}) => {
  const classes = [
    'btn',
    `btn--${variant}`,
    size === 'lg' && 'btn--lg',
    block && 'btn--block',
    icon && 'btn--icon',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Button
