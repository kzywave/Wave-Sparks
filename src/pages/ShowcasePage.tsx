import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brand } from '../components/Brand'
import { DeviceFrame } from '../components/DeviceFrame'
import { PlaceholderScreen } from '../components/PlaceholderScreen'
import { PreviewSizeControl } from '../components/PreviewSizeControl'
import { SCREENS } from '../config'

export const ShowcasePage = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [previewMode, setPreviewMode] = useState<'fit' | 'actual'>('fit')
  const screen = SCREENS[activeIndex]

  return (
    <div className="presentation-shell">
      <header className="shell-header">
        <Brand />
        <div className="shell-header__actions">
          <PreviewSizeControl value={previewMode} onChange={setPreviewMode} />
          <Link className="button" to="/prototype">Prototype</Link>
          <Link className="button" to="/config">Config</Link>
        </div>
      </header>
      <main className="showcase-layout">
        <section className={`preview-stage ${previewMode === 'actual' ? 'is-actual-size' : ''}`}>
          <h1 className="visually-hidden">Showcase preview</h1>
          <DeviceFrame previewMode={previewMode}><PlaceholderScreen label={screen.label} /></DeviceFrame>
          <p className="stage-status">{previewMode === 'actual' ? '100%' : 'Fit'} · presentation preview</p>
        </section>
        <aside className="walkthrough-panel">
          <p className="eyebrow">Slide {activeIndex + 1} of {SCREENS.length}</p>
          <h2>{screen.label} placeholder</h2>
          <p>{screen.description}</p>
          <nav aria-label="Showcase slides" className="showcase-slides">
            {SCREENS.map((item, index) => (
              <button
                type="button"
                aria-current={index === activeIndex ? 'step' : undefined}
                key={item.id}
                onClick={() => setActiveIndex(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.label}</strong>
              </button>
            ))}
          </nav>
          <div className="callout"><strong>Presentation note</strong><br />Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          <div className="pager">
            <button className="button" type="button" disabled={activeIndex === 0} onClick={() => setActiveIndex((index) => index - 1)}>Previous</button>
            <button className="button button--primary" type="button" disabled={activeIndex === SCREENS.length - 1} onClick={() => setActiveIndex((index) => index + 1)}>Next slide</button>
          </div>
        </aside>
      </main>
      <footer className="shell-footer">Generic prototype showcase · replace placeholder content</footer>
    </div>
  )
}
