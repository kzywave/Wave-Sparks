import React, { useState } from 'react'
import { AnimatedText } from './AnimatedText'
import { INITIATIVE_MAPPINGS } from '../presentationData'

export interface FragmentationSlideProps {
  step?: number
  onSelectStep?: (step: number) => void
}

export const FragmentationSlide: React.FC<FragmentationSlideProps> = ({
  step = 0,
  onSelectStep,
}) => {
  const [viewMode, setViewMode] = useState<'internal' | 'customer'>('internal')
  const [activeInitiativeId, setActiveInitiativeId] = useState<string>('points')

  const activeInitiative =
    INITIATIVE_MAPPINGS.find((i) => i.id === activeInitiativeId) ??
    INITIATIVE_MAPPINGS[0]

  const isBatch1Revealed = step >= 1
  const isBatch2Revealed = step >= 2
  const isInspectorRevealed = step >= 3
  const isObservationRevealed = step >= 4

  return (
    <div className="slide-canvas">
      {/* Slide Header */}
      <div className="slide-header-block">
        <div className="slide-header-flex">
          <div>
            <div className="eyebrow">Strategic Turning Point</div>
            <h2 className="slide-main-title">
              <AnimatedText effect="per-word-crossfade" text="We do not have an initiative problem." />
              <br />
              <AnimatedText
                effect="per-word-crossfade"
                delayMs={220}
                highlightText="We have a connection problem."
                text="We have a connection problem."
              />
            </h2>
            <AnimatedText
              as="p"
              effect="micro-scale-fade"
              className="slide-sub-title"
              delayMs={400}
              text="What feels disconnected internally becomes visibly disconnected externally."
            />
          </div>

          {/* View Toggle */}
          <div className="mode-toggle-group">
            <button
              type="button"
              className={`mode-toggle-btn ${viewMode === 'internal' ? 'is-active' : ''}`}
              onClick={() => setViewMode('internal')}
            >
              🏢 Internal Org View (8 Initiatives)
            </button>
            <button
              type="button"
              className={`mode-toggle-btn ${viewMode === 'customer' ? 'is-active' : ''}`}
              onClick={() => setViewMode('customer')}
            >
              📱 Customer Experience (Noise Stream)
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'internal' ? (
        /* INTERNAL INITIATIVES VIEW */
        <div className="fragmentation-stage">
          <div className="initiatives-grid">
            {INITIATIVE_MAPPINGS.map((item, idx) => {
              const isSelected = item.id === activeInitiativeId
              const isCardRevealed = idx < 4 ? isBatch1Revealed : isBatch2Revealed
              const targetStep = idx < 4 ? 1 : 2

              if (!isCardRevealed) {
                return (
                  <div
                    key={item.id}
                    className="initiative-card initiative-card--placeholder"
                    onClick={() => onSelectStep?.(targetStep)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onSelectStep?.(targetStep)
                      }
                    }}
                    aria-label={`Point ${targetStep}: Click to reveal ${item.initiative}`}
                  >
                    <div className="skeleton-badge-row">
                      <span className="skeleton-block skeleton-pill" style={{ width: '4.5rem', height: '.9rem' }} />
                      <span className="skeleton-hint-text">Click to reveal</span>
                    </div>
                    <span className="skeleton-block" style={{ width: '70%', height: '1.05rem', margin: '.2rem 0' }} />
                    <div className="skeleton-desc-group">
                      <span className="skeleton-block" style={{ width: '100%', height: '.75rem' }} />
                      <span className="skeleton-block" style={{ width: '85%', height: '.75rem' }} />
                    </div>
                  </div>
                )
              }

              return (
                <div
                  key={item.id}
                  className={`initiative-card initiative-card--revealed ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setActiveInitiativeId(item.id)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="initiative-card__top">
                    <span className="initiative-card__team">{item.team}</span>
                    {isSelected && <span className="active-marker">Inspecting</span>}
                  </div>
                  <h4 className="initiative-card__title">{item.initiative}</h4>
                  <p className="initiative-card__desc">{item.description}</p>
                  <div className="initiative-card__arrow">
                    <span>Produces external touchpoint →</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Connected External Preview Inspector */}
          {isInspectorRevealed ? (
            <div className="connected-inspector connected-inspector--revealed">
              <div className="inspector-header">
                <span className="inspector-badge">External Symptom Generated</span>
                <strong>{activeInitiative.customerSymptom}</strong>
              </div>
              <div className="inspector-bubble">
                {activeInitiative.symptomDetail}
              </div>
              <p className="inspector-caption">
                From <strong>{activeInitiative.team}</strong>: Individually valid and well-intentioned, but delivered to the customer as an isolated, unlinked prompt.
              </p>
            </div>
          ) : (
            <div
              className="connected-inspector connected-inspector--placeholder"
              onClick={() => onSelectStep?.(3)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelectStep?.(3)
                }
              }}
              aria-label="Point 3: Click to reveal External Preview Inspector"
            >
              <div className="skeleton-badge-row">
                <span className="skeleton-block skeleton-pill" style={{ width: '11rem', height: '1rem' }} />
                <span className="skeleton-hint-text">Click to reveal external touchpoint symptom</span>
              </div>
              <span className="skeleton-block" style={{ width: '100%', height: '2rem', borderRadius: '.75rem', marginTop: '.4rem' }} />
            </div>
          )}
        </div>
      ) : (
        /* CUSTOMER APP EXPERIENCE VIEW */
        <div className="customer-experience-stage">
          <div className="customer-feed-container">
            <div className="feed-header-bar">
              <span className="feed-brand-title">WavePay Home Screen</span>
              <span className="feed-sub">Customer perspective: 8 uncoordinated touchpoints</span>
            </div>

            <div className="customer-stream">
              {INITIATIVE_MAPPINGS.map((item, idx) => (
                <div
                  key={item.id}
                  className={`customer-touchpoint-item ${item.id === activeInitiativeId ? 'is-highlighted' : ''}`}
                  onClick={() => setActiveInitiativeId(item.id)}
                >
                  <div className="touchpoint-left">
                    <span className="touchpoint-icon">0{idx + 1}</span>
                    <div>
                      <div className="touchpoint-type">{item.customerSymptom}</div>
                      <div className="touchpoint-text">{item.symptomDetail}</div>
                    </div>
                  </div>
                  <div className="touchpoint-source">
                    <span className="touchpoint-badge">{item.team}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="customer-takeaway-box">
            <h4 className="takeaway-box__title">The Customer Reality</h4>
            <div className="takeaway-box__quote">
              &ldquo;Customers do not experience our org structure or departmental KPIs. They experience one single WavePay screen.&rdquo;
            </div>
            <p className="takeaway-box__text">
              When initiatives lack a persistent customer story (like a savings goal or personal bill schedule), promotions feel like random marketing interruptions rather than supportive financial tools.
            </p>
          </div>
        </div>
      )}

      {isObservationRevealed ? (
        <div className="analogous-rule analogous-rule--revealed">
          <strong>Design observation:</strong> We do not blame teams or imply lack of internal effort. This is an architecture opportunity: Mini Apps can be the connecting tissue that ties these existing initiatives together.
        </div>
      ) : (
        <div
          className="analogous-rule analogous-rule--placeholder"
          onClick={() => onSelectStep?.(4)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onSelectStep?.(4)
            }
          }}
          aria-label="Point 4: Click to reveal design observation"
        >
          <div className="skeleton-quote-content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.35rem', width: '85%' }}>
              <span className="skeleton-block skeleton-pill" style={{ width: '9.5rem', height: '.75rem' }} />
              <span className="skeleton-block" style={{ width: '100%', height: '.85rem' }} />
            </div>
            <span className="skeleton-hint-text">Click to reveal</span>
          </div>
        </div>
      )}
    </div>
  )
}
