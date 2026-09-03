import { type ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Brand } from '../components/Brand'
import { THEME_DEFAULT_ACCENTS, THEME_PRESETS, type ShellConfig } from '../config'
import { useShellConfig } from '../ShellConfigContext'

const copyPayload = (config: ShellConfig) => JSON.stringify(config, null, 2)

export const ConfigPage = () => {
  const { config, updateConfig, resetConfig } = useShellConfig()
  const [status, setStatus] = useState('')

  const updateIdentity = (field: keyof ShellConfig['identity']) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      updateConfig({ ...config, identity: { ...config.identity, [field]: event.target.value } })

  const updateDevice = (field: keyof ShellConfig['device']) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value)
      updateConfig({ ...config, device: { ...config.device, [field]: value } })
    }

  const normalizeDevice = (field: keyof ShellConfig['device']) => () => {
    const minimum = field === 'width' ? 240 : 320
    if (config.device[field] >= minimum) return
    updateConfig({ ...config, device: { ...config.device, [field]: minimum } })
  }

  const copyConfig = async () => {
    await navigator.clipboard.writeText(copyPayload(config))
    setStatus('Configuration copied.')
  }

  const reset = () => {
    resetConfig()
    setStatus('Defaults restored.')
  }

  return (
    <div className="config-shell">
      <header className="shell-header">
        <Brand />
        <div className="shell-header__actions">
          <Link className="button" to="/prototype">Prototype</Link>
          <Link className="button" to="/showcase">Showcase</Link>
        </div>
      </header>
      <main className="config-layout">
        <section className="config-form" aria-labelledby="config-title">
          <p className="eyebrow">Shell settings</p>
          <h1 id="config-title">Configure this prototype</h1>
          <p>Changes are saved in this browser. Copy the payload to make them repository defaults.</p>

          <fieldset>
            <legend>Identity</legend>
            <label>Project name<input value={config.identity.name} onChange={updateIdentity('name')} /></label>
            <label>Subtitle<textarea value={config.identity.subtitle} onChange={updateIdentity('subtitle')} /></label>
          </fieldset>

          <fieldset>
            <legend>Theme</legend>
            <label>Preset
              <select
                value={config.theme.preset}
                onChange={(event) => {
                  const preset = event.target.value as ShellConfig['theme']['preset']
                  updateConfig({ ...config, theme: { preset, accent: THEME_DEFAULT_ACCENTS[preset] } })
                }}
              >
                {THEME_PRESETS.map((theme) => <option value={theme} key={theme}>{theme}</option>)}
              </select>
            </label>
            <label>Accent colour<input aria-label="Accent colour" type="color" value={config.theme.accent} onChange={(event) => updateConfig({ ...config, theme: { ...config.theme, accent: event.target.value } })} /></label>
          </fieldset>

          <fieldset>
            <legend>Device</legend>
            <div className="field-row">
              <label>Width<input type="number" min="240" value={config.device.width} onChange={updateDevice('width')} onBlur={normalizeDevice('width')} /></label>
              <label>Height<input type="number" min="320" value={config.device.height} onChange={updateDevice('height')} onBlur={normalizeDevice('height')} /></label>
            </div>
          </fieldset>

          <div className="config-actions">
            <button className="button button--primary" type="button" onClick={copyConfig}>Copy config</button>
            <button className="button" type="button" onClick={reset}>Reset defaults</button>
          </div>
          <p role="status">{status}</p>
        </section>

        <aside className="config-preview">
          <p className="eyebrow">Live preview</p>
          <div className="theme-preview">
            <Brand />
            <div className="theme-preview__screen"><span>{config.device.width}×{config.device.height}</span></div>
            <button className="button button--primary" type="button">Primary action</button>
          </div>
          <label>Configuration payload
            <textarea className="config-payload" readOnly value={copyPayload(config)} />
          </label>
        </aside>
      </main>
    </div>
  )
}
