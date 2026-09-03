import { useShellConfig } from '../ShellConfigContext'

export const PlaceholderScreen = ({ label }: { label: string }) => {
  const { config } = useShellConfig()
  return (
    <div className="placeholder-screen" data-testid="placeholder-screen">
      <span>{config.device.width}×{config.device.height}</span>
      <small>{label}</small>
    </div>
  )
}
