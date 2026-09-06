import React, { useState } from 'react'
import { INITIATIVE_MAPPINGS } from '../presentationData'

export const FragmentationSlide: React.FC = () => {
  const [viewMode, setViewMode] = useState<'internal' | 'customer'>('internal')
  const [activeInitiativeId, setActiveInitiativeId] = useState<string>('points')

  const activeInitiative =
    INITIATIVE_MAPPINGS.find((i) => i.id === activeInitiativeId) ??
    INITIATIVE_MAPPINGS[0]

  return (
    <div className="slide-canvas">
      {/* Slide Header */}
      <div className="slide-header-block">
        <div className="slide-header-flex">
          <div>
            <div className="eyebrow">Strategic Turning Point</div>
            <h2 className="slide-main-title">
              We do not have an initiative problem.<br />
              <span className="text-highlight">We have a connection problem.</span>
            </h2>
            <p className="slide-sub-title">
              What feels disconnected internally becomes visibly disconnected externally.
            </p>
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
            {INITIATIVE_MAPPINGS.map((item) => {
              const isSelected = item.id === activeInitiativeId
              return (
                <div
                  key={item.id}
                  className={`initiative-card ${isSelected ? 'is-selected' : ''}`}
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
          <div className="connected-inspector">
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

      <div className="analogous-rule">
        <strong>Design observation:</strong> We do not blame teams or imply lack of internal effort. This is an architecture opportunity: Mini Apps can be the connecting tissue that ties these existing initiatives together.
      </div>
    </div>
  )
}
