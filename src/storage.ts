import { DEFAULT_SHELL_CONFIG, THEME_PRESETS, type ShellConfig } from './config'

export const ACCESS_STORAGE_KEY = 'pwa-prototype-access:v1'
export const CONFIG_STORAGE_KEY = 'pwa-prototype-config:v2'
const CONFIG_VERSION = 2
const HEX_COLOUR = /^#[0-9a-f]{6}$/i

const isShellConfig = (value: unknown): value is ShellConfig => {
  if (!value || typeof value !== 'object') return false
  const config = value as Partial<ShellConfig>
  return (
    typeof config.identity?.name === 'string' &&
    typeof config.identity?.subtitle === 'string' &&
    THEME_PRESETS.includes(config.theme?.preset as (typeof THEME_PRESETS)[number]) &&
    typeof config.theme?.accent === 'string' &&
    HEX_COLOUR.test(config.theme.accent) &&
    Number.isInteger(config.device?.width) &&
    Number.isInteger(config.device?.height) &&
    Number(config.device?.width) >= 240 &&
    Number(config.device?.height) >= 320
  )
}

export const loadConfig = (storage: Storage): ShellConfig => {
  try {
    storage.removeItem('pwa-prototype-config:v1')
    const raw = storage.getItem(CONFIG_STORAGE_KEY)
    if (!raw) return DEFAULT_SHELL_CONFIG
    const stored = JSON.parse(raw) as { version?: number; config?: unknown }
    if (stored.version === CONFIG_VERSION && isShellConfig(stored.config)) {
      if (
        stored.config.identity.name === 'Prototype Starter' ||
        stored.config.identity.name === 'Mini App Opportunities'
      ) {
        return DEFAULT_SHELL_CONFIG
      }
      return stored.config
    }
    return DEFAULT_SHELL_CONFIG
  } catch {
    return DEFAULT_SHELL_CONFIG
  }
}

export const saveConfig = (storage: Storage, config: ShellConfig) =>
  storage.setItem(CONFIG_STORAGE_KEY, JSON.stringify({ version: CONFIG_VERSION, config }))

export const clearConfig = (storage: Storage) => storage.removeItem(CONFIG_STORAGE_KEY)
export const hasAccess = (storage: Storage) => storage.getItem(ACCESS_STORAGE_KEY) === 'granted'
export const grantAccess = (storage: Storage) => storage.setItem(ACCESS_STORAGE_KEY, 'granted')
