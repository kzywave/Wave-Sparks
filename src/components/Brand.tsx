import { useShellConfig } from '../ShellConfigContext'
import logoUrl from '../assets/logo.png'

interface BrandProps {
  title?: string
  description?: string
}

export const Brand = ({ title, description }: BrandProps) => {
  const { config } = useShellConfig()
  const displayTitle =
    title ??
    (config?.identity?.name &&
    config.identity.name !== 'Prototype Starter' &&
    config.identity.name !== 'Mini App Opportunities'
      ? config.identity.name
      : 'Product Initiatives')

  const displaySubtitle =
    description ??
    (config?.identity?.subtitle &&
    !config.identity.subtitle.includes('Lorem ipsum') &&
    config.identity.subtitle !== 'Small tools. Connected value.'
      ? config.identity.subtitle
      : 'Start small. Connect what already exists.')

  return (
    <div className="brand">
      <img src={logoUrl} alt="" aria-hidden="true" className="brand__mark brand__mark--image" />
      <div>
        <strong>{displayTitle}</strong>
        <span>{displaySubtitle}</span>
      </div>
    </div>
  )
}
