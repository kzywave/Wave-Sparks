import { describe, expect, it } from 'vitest'
import { DEFAULT_SHELL_CONFIG } from './config'
import { CONFIG_STORAGE_KEY, loadConfig, saveConfig } from './storage'

describe('configuration storage', () => {
  it('round-trips a valid versioned configuration', () => {
    const config = { ...DEFAULT_SHELL_CONFIG, identity: { ...DEFAULT_SHELL_CONFIG.identity, name: 'Saved' } }
    saveConfig(window.localStorage, config)
    expect(loadConfig(window.localStorage).identity.name).toBe('Saved')
  })

  it('falls back for invalid or outdated data', () => {
    window.localStorage.setItem(CONFIG_STORAGE_KEY, '{bad json')
    expect(loadConfig(window.localStorage)).toEqual(DEFAULT_SHELL_CONFIG)
    window.localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify({ version: 0, config: DEFAULT_SHELL_CONFIG }))
    expect(loadConfig(window.localStorage)).toEqual(DEFAULT_SHELL_CONFIG)
  })
})
