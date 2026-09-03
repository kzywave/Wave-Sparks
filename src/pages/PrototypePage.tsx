import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Brand } from '../components/Brand'
import { DeviceFrame } from '../components/DeviceFrame'
import { PlaceholderScreen } from '../components/PlaceholderScreen'
import { PreviewSizeControl } from '../components/PreviewSizeControl'
import { getScreen, SCREENS } from '../config'

export const PrototypePage = () => {
  const { screenId } = useParams()
  const navigate = useNavigate()
  const [previewMode, setPreviewMode] = useState<'fit' | 'actual'>('fit')
  const screen = getScreen(screenId)
  const activeIndex = SCREENS.findIndex((item) => item.id === screen.id)

  const selectScreen = (index: number) => navigate(`/prototype/${SCREENS[index].id}`)

  return (
    <div className="presentation-shell">
      <header className="shell-header">
        <Brand />
        <div className="shell-header__actions">
          <PreviewSizeControl value={previewMode} onChange={setPreviewMode} />
          <Link className="button" to="/showcase">Showcase</Link>
          <Link className="button" to="/config">Config</Link>
        </div>
      </header>

      <main className="prototype-layout">
        <aside className="panel">
          <p className="eyebrow">Walkthrough</p>
          <h1>Prototype screens</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <nav aria-label="Prototype screens">
            {SCREENS.map((item, index) => (
              <button
                type="button"
                className="stage-button"
                aria-label={`${item.label} screen`}
                aria-current={index === activeIndex ? 'page' : undefined}
                key={item.id}
                onClick={() => selectScreen(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.label}</strong>
              </button>
            ))}
          </nav>
        </aside>

        <section className={`preview-stage ${previewMode === 'actual' ? 'is-actual-size' : ''}`}>
          <div className="stage-heading">
            <div><p className="eyebrow">Live prototype</p><h2>{screen.label}</h2></div>
            <span className="chip">Placeholder screen</span>
          </div>
          <DeviceFrame previewMode={previewMode}><PlaceholderScreen label={screen.label} /></DeviceFrame>
          <p className="stage-status">Live build · grey placeholder</p>
        </section>

        <aside className="panel panel--annotation">
          <p className="eyebrow">Screen {String(activeIndex + 1).padStart(2, '0')}</p>
          <h2>{screen.label}</h2>
          <p>{screen.description}</p>
          <dl>
            <div><dt>Current state</dt><dd>Lorem ipsum dolor sit amet.</dd></div>
            <div><dt>Expected action</dt><dd>Consectetur adipiscing elit.</dd></div>
          </dl>
          <div className="callout">Replace this copy with presentation notes.</div>
          <div className="pager">
            <button type="button" className="button" disabled={activeIndex === 0} onClick={() => selectScreen(activeIndex - 1)}>Previous</button>
            <button type="button" className="button button--primary" disabled={activeIndex === SCREENS.length - 1} onClick={() => selectScreen(activeIndex + 1)}>Next</button>
          </div>
        </aside>
      </main>
    </div>
  )
}
