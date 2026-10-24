import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check } from 'lucide-react'

/*
  items: [{ key, label, description?, icon?, onSelect?, danger?, checked?, role?, keepOpen?, separator? }]
  The menu is position: fixed, so table rows and scroll containers never clip it.
  It opens below the trigger, flips above when there is no room, and scales from the trigger.
*/
const Dropdown = ({
  trigger,
  items,
  label,
  ariaLabel,
  align = 'end',
  matchWidth = false,
  triggerClassName = 'btn btn--ghost btn--icon',
}) => {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(null)
  const buttonRef = useRef(null)
  const menuRef = useRef(null)
  const menuId = useId()

  const close = useCallback((returnFocus = true) => {
    setOpen(false)
    setPosition(null)
    if (returnFocus) buttonRef.current?.focus()
  }, [])

  useLayoutEffect(() => {
    if (!open || !menuRef.current) return
    const trig = buttonRef.current.getBoundingClientRect()
    const menu = menuRef.current.getBoundingClientRect()
    const margin = 8
    const below = trig.bottom + 6
    const flip =
      below + menu.height > window.innerHeight - margin && trig.top - 6 - menu.height > margin
    const top = flip ? trig.top - 6 - menu.height : below
    const rawLeft = align === 'end'
      ? trig.right - menu.width
      : align === 'center'
        ? trig.left + (trig.width - menu.width) / 2
        : trig.left
    const left = Math.min(Math.max(margin, rawLeft), window.innerWidth - menu.width - margin)
    setPosition({
      top,
      left,
      minWidth: matchWidth ? trig.width : undefined,
      '--origin': `${flip ? 'bottom' : 'top'} ${align === 'end' ? 'right' : align === 'center' ? 'center' : 'left'}`,
    })
  }, [open, align, matchWidth])

  useEffect(() => {
    if (!position) return
    const target =
      menuRef.current.querySelector('[aria-checked="true"]') ??
      menuRef.current.querySelector('[role^="menuitem"]')
    target?.focus()
  }, [position])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event) => {
      if (menuRef.current?.contains(event.target) || buttonRef.current?.contains(event.target)) return
      close(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        close()
      }
    }
    const onScroll = (event) => {
      if (!menuRef.current?.contains(event.target)) close(false)
    }
    const onResize = () => close(false)
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown, true)
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown, true)
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onResize)
    }
  }, [open, close])

  const onMenuKeyDown = (event) => {
    const nodes = [...menuRef.current.querySelectorAll('[role^="menuitem"]')]
    const index = nodes.indexOf(document.activeElement)
    const move = (next) => {
      event.preventDefault()
      nodes[(next + nodes.length) % nodes.length]?.focus()
    }
    if (event.key === 'ArrowDown') move(index + 1)
    else if (event.key === 'ArrowUp') move(index - 1)
    else if (event.key === 'Home') move(0)
    else if (event.key === 'End') move(nodes.length - 1)
    else if (event.key === 'Tab') close(false)
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={triggerClassName}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={ariaLabel ?? label}
        onClick={() => (open ? close(false) : setOpen(true))}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' && !open) {
            event.preventDefault()
            setOpen(true)
          }
        }}
      >
        {trigger}
      </button>

      {open && createPortal(
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          className="menu"
          data-ready={position ? '' : undefined}
          style={position ?? undefined}
          onKeyDown={onMenuKeyDown}
        >
          {items.map((item) => {
            if (item.separator) return <div key={item.key} role="separator" className="menu__sep" />
            const Icon = item.icon
            return (
              <button
                key={item.key}
                type="button"
                role={item.role ?? 'menuitem'}
                aria-checked={item.checked}
                className={`menu__item${item.danger ? ' is-danger' : ''}`}
                onClick={() => {
                  item.onSelect?.()
                  if (!item.keepOpen) close()
                }}
              >
                {Icon && <Icon size={16} aria-hidden="true" />}
                <span className="menu__text">
                  <span>{item.label}</span>
                  {item.description && <small>{item.description}</small>}
                </span>
                {item.checked && <Check size={16} className="menu__check" aria-hidden="true" />}
              </button>
            )
          })}
        </div>,
        document.body,
      )}
    </>
  )
}

export default Dropdown
