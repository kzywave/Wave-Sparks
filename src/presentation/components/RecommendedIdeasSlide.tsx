import React, { useState } from 'react'
import { AnimatedText } from './AnimatedText'
import { DeviceFrame } from '../../components/DeviceFrame'
import { RECOMMENDED_CONCEPTS } from '../presentationData'
import { CanIAffordThisMock } from './mocks/CanIAffordThisMock'
import { MoneyCalendarMock } from './mocks/MoneyCalendarMock'
import { SaveForSomethingMock } from './mocks/SaveForSomethingMock'

interface RecommendedIdeasSlideProps {
  activeConceptIndex?: number
  onSelectConceptIndex?: (index: number) => void
}

export const RecommendedIdeasSlide: React.FC<RecommendedIdeasSlideProps> = ({
  activeConceptIndex,
  onSelectConceptIndex,
}) => {
  const [internalConceptId, setInternalConceptId] = useState('save-for-something')

  const currentConcept =
    activeConceptIndex !== undefined
      ? RECOMMENDED_CONCEPTS[activeConceptIndex] ?? RECOMMENDED_CONCEPTS[0]
      : RECOMMENDED_CONCEPTS.find((c) => c.id === internalConceptId) ?? RECOMMENDED_CONCEPTS[0]

  const handleSelect = (idx: number, id: string) => {
    if (onSelectConceptIndex) {
      onSelectConceptIndex(idx)
    } else {
      setInternalConceptId(id)
    }
  }

  const renderMock = () => {
    switch (currentConcept.id) {
      case 'save-for-something':
        return <SaveForSomethingMock />
      case 'can-i-afford-this':
        return <CanIAffordThisMock />
      case 'money-calendar':
        return <MoneyCalendarMock />
      default:
        return <SaveForSomethingMock />
    }
  }

  const depClass = currentConcept.dependency.toLowerCase().replace(' ', '-')

  return (
    <div className="slide-canvas slide-canvas--interactive">
      {/* Slide Header & Concept Selector */}
      <div className="slide-header-block">
        <div className="eyebrow">Priority Shortlist · {RECOMMENDED_CONCEPTS.length} Concepts</div>
        <div className="concept-selector-bar">
          {RECOMMENDED_CONCEPTS.map((concept, idx) => (
            <button
              key={concept.id}
              type="button"
              className={`concept-tab-btn ${concept.id === currentConcept.id ? 'is-selected' : ''}`}
              onClick={() => handleSelect(idx, concept.id)}
            >
              <span className="concept-tab-idx">0{idx + 1}</span>
              <span className="concept-tab-name">{concept.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Concept Stage */}
      <div className="concept-stage-grid">
        {/* Device Frame with Micro-App */}
        <div className="concept-phone-col">
          <div className="phone-wrapper">
            <DeviceFrame previewMode="fit">
              {renderMock()}
            </DeviceFrame>
          </div>
          <div className="phone-caption">
            <span className="live-dot" /> Interactive Prototype Canvas ({currentConcept.targetDiscussionTime} pitch)
          </div>
        </div>

        {/* Structured Homework Analysis Card */}
        <div className="concept-details-col">
          <div className="concept-card-main">
            <div className="concept-card-top">
              <div>
                <span className="badge-subtle">{currentConcept.shortTag}</span>
                <AnimatedText
                  key={currentConcept.id}
                  as="h3"
                  effect="per-word-crossfade"
                  className="concept-card-title"
                  text={currentConcept.name}
                />
              </div>
              <span className={`badge-dep badge-dep--${depClass}`}>
                {currentConcept.dependency} Dependency
              </span>
            </div>

            <div className="concept-sections">
              <div className="concept-section-item">
                <span className="concept-section-label">1. Customer Problem / Pain Point</span>
                <p className="concept-section-text">{currentConcept.problem}</p>
              </div>

              <div className="concept-section-item">
                <span className="concept-section-label">2. Opportunity Identified</span>
                <p className="concept-section-text">{currentConcept.opportunity}</p>
              </div>

              <div className="concept-section-item">
                <span className="concept-section-label">3. Proposed Solution (MVP)</span>
                <p className="concept-section-text">{currentConcept.solution}</p>
              </div>

              <div className="concept-section-item">
                <span className="concept-section-label">4. Why Needed</span>
                <p className="concept-section-text">{currentConcept.whyNeeded}</p>
              </div>

              <div className="concept-section-item concept-section-item--value">
                <span className="concept-section-label">5. Expected Value (Hypotheses to Validate)</span>
                <div className="value-hypo-grid">
                  <div className="value-hypo-box">
                    <span className="value-hypo-title">Customer Value</span>
                    <ul>
                      {currentConcept.value.customer.map((v, i) => (
                        <li key={i}>{v}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="value-hypo-box">
                    <span className="value-hypo-title">Business & Wave Value</span>
                    <ul>
                      {currentConcept.value.business.map((v, i) => (
                        <li key={i}>{v}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
