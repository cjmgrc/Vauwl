const SettingRow = ({ label, description, stack = false, children }) => {
  return (
    <div className={`set-row${stack ? ' set-row--stack' : ''}`}>
      <div className="set-row__text">
        <p className="set-row__label">{label}</p>
        {description && <p className="set-row__desc">{description}</p>}
      </div>
      {children && <div className="set-row__control">{children}</div>}
    </div>
  )
}

export default SettingRow
