import { useEffect, useState } from 'react'

const SettingsNav = ({ sections }) => {
  const [active, setActive] = useState(sections[0].id)

  // Highlight the section that is currently near the top of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-96px 0px -60% 0px' }
    )
    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [sections])

  const go = (event, id) => {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
  }

  return (
    <nav className="settings-nav" aria-label="Settings sections">
      {sections.map(({ id, label }) => (
        <a key={id} href={`#${id}`} className={active === id ? 'is-active' : undefined} aria-current={active === id ? 'true' : undefined} onClick={(event) => go(event, id)}>
          {label}
        </a>
      ))}
    </nav>
  )
}

export default SettingsNav
