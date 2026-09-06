import React from 'react'
import { RECOMMENDED_CONCEPTS, SLIDES } from '../presentationData'

interface PresentationNavProps {
  activeIndex: number
  activeConceptIndex?: number
  onSelectSlide: (slideIndex: number, conceptIndex?: number) => void
  onPrev?: () => void
  onNext?: () => void
  isPrevDisabled?: boolean
  isNextDisabled?: boolean
  isMobileOpen?: boolean
  onCloseMobile?: () => void
}

export const PresentationNav: React.FC<PresentationNavProps> = ({
  activeIndex,
  activeConceptIndex = 0,
  onSelectSlide,
  onPrev,
  onNext,
  isPrevDisabled = false,
  isNextDisabled = false,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const currentSlide = SLIDES[activeIndex]

  // Calculate total steps across whole presentation (12 steps total)
  const totalSteps = SLIDES.length + RECOMMENDED_CONCEPTS.length - 1
  let currentStep = activeIndex + 1
  if (activeIndex === 3) {
    currentStep = 4 + activeConceptIndex
  } else if (activeIndex > 3) {
    currentStep = activeIndex + RECOMMENDED_CONCEPTS.length
  }
  const progressPercent = Math.min(100, Math.round((currentStep / totalSteps) * 100))

  const stepIndicator =
    activeIndex === 3
      ? `Slide 4 of ${SLIDES.length} · Proto ${activeConceptIndex + 1}/${RECOMMENDED_CONCEPTS.length}`
      : `Slide ${activeIndex + 1} of ${SLIDES.length}`

  const currentConcept = RECOMMENDED_CONCEPTS[activeConceptIndex] ?? RECOMMENDED_CONCEPTS[0]

  return (
    <aside className={`presentation-nav ${isMobileOpen ? 'is-open' : ''}`}>
      {/* Mobile Drawer Close Button */}
      <div className="nav-mobile-bar">
        <span className="eyebrow">Table of Contents</span>
        <button
          type="button"
          className="nav-mobile-close"
          onClick={onCloseMobile}
          aria-label="Close navigation"
        >
          ✕
        </button>
      </div>

      <div className="nav-header">
        <p className="eyebrow">Product Brainstorm Deck</p>
        <h2 className="nav-title">Outline & Takeaways</h2>
        <div className="nav-progress-bar">
          <div
            className="nav-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="nav-step-indicator">{stepIndicator}</span>
      </div>

      {/* Slide Navigation List */}
      <nav aria-label="Deck outline" className="nav-slides-list">
        {SLIDES.map((slide, idx) => {
          const isSlideActive = idx === activeIndex
          const isRecommendedSlide = slide.id === 'recommended'

          return (
            <div key={slide.id} className="nav-slide-group">
              <button
                type="button"
                className={`nav-slide-item ${isSlideActive ? 'is-active' : ''}`}
                aria-current={isSlideActive ? 'step' : undefined}
                onClick={() => {
                  onSelectSlide(idx, 0)
                  if (onCloseMobile) onCloseMobile()
                }}
              >
                <span className="nav-slide-num">0{slide.index}</span>
                <div className="nav-slide-meta">
                  <strong className="nav-slide-title">{slide.title}</strong>
                </div>
              </button>

              {/* If this is the Recommended Ideas slide, show the 5 prototypes as sub-items */}
              {isRecommendedSlide && (
                <div className="nav-sub-slides-list">
                  {RECOMMENDED_CONCEPTS.map((concept, cIdx) => {
                    const isConceptActive = isSlideActive && activeConceptIndex === cIdx
                    const depClass = concept.dependency.toLowerCase().replace(' ', '-')
                    return (
                      <button
                        key={concept.id}
                        type="button"
                        className={`nav-sub-slide-item ${isConceptActive ? 'is-active' : ''}`}
                        aria-label={`Jump to concept 4.${cIdx + 1}`}
                        aria-current={isConceptActive ? 'step' : undefined}
                        onClick={() => {
                          onSelectSlide(idx, cIdx)
                          if (onCloseMobile) onCloseMobile()
                        }}
                      >
                        <span className="nav-sub-num" aria-hidden="true">4.{cIdx + 1}</span>
                        <div className="nav-sub-meta" aria-hidden="true">
                          <span className="nav-sub-title">{concept.name}</span>
                          <span className="nav-sub-tag">{concept.shortTag}</span>
                        </div>
                        <span className={`badge-dep badge-dep--${depClass}`} aria-hidden="true">
                          {concept.dependency}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Active Slide Key Takeaways Panel */}
      <div className="nav-takeaways-card">
        {activeIndex === 3 ? (
          <>
            <span className="takeaways-eyebrow">Prototype 0{activeConceptIndex + 1} Pitch Takeaway</span>
            <h4 className="takeaways-slide-title">{currentConcept.name}</h4>
            <div className="takeaways-concept-meta">
              <span className="badge-subtle">{currentConcept.shortTag}</span>
              <span className="takeaways-time">⏱ {currentConcept.targetDiscussionTime}</span>
            </div>
            <ul className="takeaways-list">
              <li>
                <strong>Problem:</strong> {currentConcept.problem}
              </li>
              <li>
                <strong>Solution:</strong> {currentConcept.solution}
              </li>
              <li>
                <strong>Value:</strong> {currentConcept.value.business[0]}
              </li>
            </ul>
          </>
        ) : (
          <>
            <span className="takeaways-eyebrow">Key Takeaways</span>
            <h4 className="takeaways-slide-title">{currentSlide.title}</h4>
            <ul className="takeaways-list">
              {currentSlide.keyTakeaways.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Slide Stepper & Keyboard hint */}
      <div className="nav-controls">
        <div className="nav-pager">
          <button
            className="button"
            type="button"
            disabled={isPrevDisabled}
            onClick={onPrev}
          >
            ← Previous
          </button>
          <button
            className="button button--primary"
            type="button"
            disabled={isNextDisabled}
            onClick={onNext}
          >
            Next →
          </button>
        </div>
        <div className="nav-kbd-hint">Tip: Use ↓ / ↑ or ← / → arrow keys to navigate</div>
      </div>
    </aside>
  )
}
