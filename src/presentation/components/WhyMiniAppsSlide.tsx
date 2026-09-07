import React from 'react'
import { AnimatedText } from './AnimatedText'

export interface WhyMiniAppsSlideProps {
  step?: number
  onSelectStep?: (step: number) => void
}

export const WhyMiniAppsSlide: React.FC<WhyMiniAppsSlideProps> = ({
  step = 0,
  onSelectStep,
}) => {
  const pillars = [
    {
      title: 'Existing Framework',
      tag: 'Zero New Infra',
      detail: 'The Mini App host is already live in WavePay. We can launch experiments immediately without building a new client runtime.',
    },
    {
      title: 'Smaller, Focused Scope',
      tag: 'Micro-Utilities',
      detail: 'Single-job tools solve specific customer friction (splitting a bill, checking safe runway) without bloating core wallet screens.',
    },
    {
      title: 'Less Core Dependency',
      tag: 'Independent Releases',
      detail: 'Experiments do not compete for core transaction backend roadmap or require full app store release approval cycles.',
    },
    {
      title: 'Faster Build/Test Loop',
      tag: 'Days, Not Quarters',
      detail: 'Prototypes can be accelerated with modern AI web tooling. We test voluntary adoption first before committing deep engineering.',
    },
  ]

  const isBannerRevealed = step >= 5

  return (
    <div className="slide-canvas">
      <div className="slide-header-block">
        <div className="eyebrow">The Experimentation Layer</div>
        <AnimatedText
          as="h2"
          effect="per-word-crossfade"
          className="slide-main-title"
          text="We already have a low-dependency way to experiment."
        />
        <AnimatedText
          as="p"
          effect="micro-scale-fade"
          className="slide-sub-title"
          delayMs={300}
          text="Why Mini Apps? They are our fastest vehicle to validate customer utility and connect Wave services."
        />
      </div>

      <div className="four-grid">
        {pillars.map((p, idx) => {
          const pillarStep = idx + 1
          const isRevealed = step >= pillarStep

          if (!isRevealed) {
            return (
              <div
                key={p.title}
                className="card-box card-box--pillar card-box--placeholder"
                onClick={() => onSelectStep?.(pillarStep)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelectStep?.(pillarStep)
                  }
                }}
                aria-label={`Point ${pillarStep}: Click to reveal ${p.title}`}
              >
                <div className="card-box__badge-row">
                  <span
                    className="skeleton-block skeleton-pill"
                    style={{ width: '1.8rem', height: '1.1rem' }}
                  />
                  <span className="skeleton-hint-text">Click to reveal</span>
                </div>
                <div
                  className="skeleton-block"
                  style={{ width: '60%', height: '1.25rem', margin: '.2rem 0' }}
                />
                <div className="skeleton-desc-group">
                  <span
                    className="skeleton-block"
                    style={{ width: '100%', height: '.84rem' }}
                  />
                  <span
                    className="skeleton-block"
                    style={{ width: '90%', height: '.84rem' }}
                  />
                  <span
                    className="skeleton-block"
                    style={{ width: '70%', height: '.84rem' }}
                  />
                </div>
              </div>
            )
          }

          return (
            <div key={p.title} className="card-box card-box--pillar card-box--revealed">
              <div className="card-box__badge-row">
                <span className="card-box__counter">0{idx + 1}</span>
                <span className="badge-subtle">{p.tag}</span>
              </div>
              <h3 className="card-box__title">{p.title}</h3>
              <p className="card-box__text">{p.detail}</p>
            </div>
          )
        })}
      </div>

      {isBannerRevealed ? (
        <div className="banner-rule banner-rule--revealed">
          <div className="banner-rule__label">Guiding Product Principle</div>
          <div className="banner-rule__text">
            <strong>Solve the customer problem first.</strong> Integrate deeper into core payment rails only after the standalone utility proves repeat adoption.
          </div>
        </div>
      ) : (
        <div
          className="banner-rule banner-rule--placeholder"
          onClick={() => onSelectStep?.(5)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onSelectStep?.(5)
            }
          }}
          aria-label="Click to reveal guiding product principle"
        >
          <div className="skeleton-quote-content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem', width: '80%' }}>
              <span
                className="skeleton-block skeleton-pill"
                style={{ width: '8.5rem', height: '.75rem' }}
              />
              <span
                className="skeleton-block"
                style={{ width: '100%', height: '.95rem' }}
              />
            </div>
            <span className="skeleton-hint-text">Click to reveal</span>
          </div>
        </div>
      )}
    </div>
  )
}

