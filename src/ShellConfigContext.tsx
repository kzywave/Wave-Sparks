import { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react'
import { DEFAULT_SHELL_CONFIG, type ShellConfig } from './config'
import { clearConfig, loadConfig, saveConfig } from './storage'

interface ShellConfigContextValue {
  config: ShellConfig
  updateConfig: (config: ShellConfig) => void
  resetConfig: () => void
}

const ShellConfigContext = createContext<ShellConfigContextValue | null>(null)

export const ShellConfigProvider = ({ children }: PropsWithChildren) => {
  const [config, setConfig] = useState(() => loadConfig(window.localStorage))

  useEffect(() => {
    document.documentElement.dataset.theme = config.theme.preset
    document.documentElement.style.setProperty('--accent', config.theme.accent)
  }, [config.theme.accent, config.theme.preset])

  const updateConfig = (nextConfig: ShellConfig) => {
    setConfig(nextConfig)
    saveConfig(window.localStorage, nextConfig)
  }

  const resetConfig = () => {
    clearConfig(window.localStorage)
    setConfig(DEFAULT_SHELL_CONFIG)
  }

  return (
    <ShellConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </ShellConfigContext.Provider>
  )
}

// The provider and hook intentionally share one module.
// eslint-disable-next-line react-refresh/only-export-components
export const useShellConfig = () => {
  const context = useContext(ShellConfigContext)
  if (!context) throw new Error('useShellConfig must be used within ShellConfigProvider')
  return context
}
