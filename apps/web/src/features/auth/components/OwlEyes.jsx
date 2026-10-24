import React, { useEffect, useRef } from 'react'

// The pupils follow the pointer on devices that have one. Static on touch and with reduced motion.
const OwlEyes = () => {
  const svgRef = useRef(null)

  useEffect(() => {
    const canTrack =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canTrack) return

    const pupils = svgRef.current.querySelectorAll('[data-pupil]')
    const onMove = (event) => {
      const rect = svgRef.current.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      const distance = Math.hypot(dx, dy) || 1
      const reach = Math.min(1, distance / 320) * 9
      pupils.forEach((pupil) => {
        pupil.style.transform = `translate(${(dx / distance) * reach}px, ${(dy / distance) * reach}px)`
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <svg ref={svgRef} className="owl-eyes" viewBox="0 0 260 130" role="img" aria-label="Two watchful owl eyes">
      {[72, 188].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="65" r="52" fill="var(--color-surface-2)" stroke="var(--color-border-strong)" strokeWidth="2" />
          <circle cx={cx} cy="65" r="30" fill="var(--color-primary)" />
          <circle data-pupil cx={cx} cy="65" r="14" fill="var(--color-bg)" className="owl-eyes__pupil" />
          <circle cx={cx - 6} cy="58" r="3.5" fill="var(--color-primary)" opacity="0.9" />
        </g>
      ))}
    </svg>
  )
}

export default OwlEyes
