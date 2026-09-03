import type { CSSProperties, PropsWithChildren } from 'react'
import { useShellConfig } from '../ShellConfigContext'

interface DeviceFrameProps extends PropsWithChildren {
  previewMode: 'fit' | 'actual'
}

export const DeviceFrame = ({ children, previewMode }: DeviceFrameProps) => {
  const { config } = useShellConfig()
  const { width, height } = config.device

  return (
    <div
      className="device-frame"
      data-preview-mode={previewMode}
      role="group"
      aria-label="Mobile device frame"
      style={
        {
          '--device-ratio': `${width} / ${height}`,
          '--device-width': `${width}px`,
          '--device-height': `${height}px`,
        } as CSSProperties
      }
    >
      <div
        className="device-frame__screen"
        role="region"
        aria-label="Mobile prototype preview"
        data-logical-width={width}
        data-logical-height={height}
      >
        {children}
      </div>
    </div>
  )
}
