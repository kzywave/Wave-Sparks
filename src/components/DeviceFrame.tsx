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
        <div className="device-status-bar" aria-hidden="true">
          <span className="device-status-time">9:41</span>
          <span className="device-island" />
          <span className="device-status-icons">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
              <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A16.88 16.88 0 0 0 12 4z" />
            </svg>
            <span className="device-battery"><span className="device-battery-fill" /></span>
          </span>
        </div>
        <div className="device-frame__body">
          {children}
        </div>
        <div className="device-home-bar" aria-hidden="true">
          <span className="device-home-indicator" />
        </div>
      </div>
    </div>
  )
}
