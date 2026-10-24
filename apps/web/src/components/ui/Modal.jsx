import React, { useEffect, useId, useRef, useState } from 'react'
import { X } from 'lucide-react'

// Native <dialog>: focus trap, Esc, and top-layer stacking come for free.
// On phones it renders as a bottom sheet that can be dragged down to dismiss.
const Modal = ({ open, onClose, title, description, children, footer }) => {
  const dialogRef = useRef(null)
  const dragRef = useRef(null)
  const [closing, setClosing] = useState(false)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      setClosing(false)
      if (!dialog.open) {
        dialog.showModal()
        dialog.querySelector('[data-autofocus]')?.focus()
      }
      return
    }

    if (dialog.open) {
      setClosing(true)
      const timer = setTimeout(() => {
        dialog.close()
        dialog.style.transform = ''
        dialog.style.transition = ''
        setClosing(false)
      }, 210)
      return () => clearTimeout(timer)
    }
  }, [open])

  const onPointerDown = (event) => {
    dragRef.current = { startY: event.clientY, startTime: performance.now(), dy: 0 }
    event.currentTarget.setPointerCapture(event.pointerId)
    dialogRef.current.style.transition = 'none'
  }

  const onPointerMove = (event) => {
    const drag = dragRef.current
    if (!drag) return
    drag.dy = Math.max(0, event.clientY - drag.startY)
    dialogRef.current.style.transform = `translateY(${drag.dy}px)`
  }

  const onPointerUp = () => {
    const drag = dragRef.current
    if (!drag) return
    dragRef.current = null
    const dialog = dialogRef.current
    const velocity = drag.dy / Math.max(1, performance.now() - drag.startTime)

    if (drag.dy > 120 || velocity > 0.6) {
      onClose()
      return
    }
    dialog.style.transition = 'transform 260ms var(--ease-drawer)'
    dialog.style.transform = ''
    setTimeout(() => {
      dialog.style.transition = ''
    }, 280)
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      data-closing={closing || undefined}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {(open || closing) && (
        <>
          <div
            className="modal__grabber"
            aria-hidden="true"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <span />
          </div>
          <header className="modal__header">
            <div>
              <h2 id={titleId} className="modal__title">
                {title}
              </h2>
              {description && <p className="muted">{description}</p>}
            </div>
            <button
              type="button"
              className="btn btn--ghost btn--icon"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </header>
          <div className="modal__body">{children}</div>
          {footer && <footer className="modal__footer">{footer}</footer>}
        </>
      )}
    </dialog>
  )
}

export default Modal
