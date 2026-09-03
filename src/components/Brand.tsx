import { useShellConfig } from '../ShellConfigContext'

export const Brand = () => {
  const { config } = useShellConfig()
  return (
    <div className="brand">
      <div className="brand__mark" aria-hidden="true">P</div>
      <div>
        <strong>{config.identity.name}</strong>
        <span>{config.identity.subtitle}</span>
      </div>
    </div>
  )
}
