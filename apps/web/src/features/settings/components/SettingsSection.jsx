import { useId } from 'react'

const SettingsSection = ({ id, title, description, danger = false, children }) => {
  const headingId = useId()
  return (
    <section id={id} className={`panel set-section${danger ? ' set-section--danger' : ''}`} aria-labelledby={headingId}>
      <header className="panel__head">
        <div>
          <h2 id={headingId} className="panel__title">{title}</h2>
          {description && <p className="muted">{description}</p>}
        </div>
      </header>
      <div className="set-section__body">{children}</div>
    </section>
  )
}

export default SettingsSection
