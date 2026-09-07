import React from 'react'
import { RECOMMENDED_CONCEPTS, SLIDES } from '../presentationData'

interface PresentationNavProps {
  activeIndex: number
  activeConceptIndex?: number
  slideStep?: number
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
  slideStep = 0,
  onSelectSlide,
  onPrev,
  onNext,
  isPrevDisabled = false,
  isNextDisabled = false,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const currentSlide = SLIDES[activeIndex]

  // Calculate total steps across whole presentation (29 steps total)
  const totalSteps = 29
  let currentStep = 1
  if (activeIndex === 0) {
    currentStep = Math.max(1, slideStep)
  } else if (activeIndex === 1) {
    currentStep = 4 + Math.max(1, slideStep)
  } else if (activeIndex === 2) {
    currentStep = 10
  } else if (activeIndex === 3) {
    currentStep = 11 + activeConceptIndex
  } else if (activeIndex === 4) {
    currentStep = 14 + Math.max(1, slideStep)
  } else if (activeIndex === 5) {
    currentStep = 18 + Math.max(1, slideStep)
  } else if (activeIndex === 6) {
    currentStep = 22 + Math.max(1, slideStep)
  } else if (activeIndex === 7) {
    currentStep = 26 + Math.max(1, slideStep)
  }
  const progressPercent = Math.min(100, Math.round((currentStep / totalSteps) * 100))

  let stepIndicator = `Slide ${activeIndex + 1} of ${SLIDES.length}`
  if (activeIndex === 0) {
    stepIndicator = `Slide 1 of ${SLIDES.length} · ${slideStep === 0 ? 'Overview' : `Point ${slideStep}/4`}`
  } else if (activeIndex === 1) {
    stepIndicator = `Slide 2 of ${SLIDES.length} · ${slideStep === 0 ? 'Overview' : `Point ${slideStep}/5`}`
  } else if (activeIndex === 3) {
    stepIndicator = `Slide 4 of ${SLIDES.length} · Proto ${activeConceptIndex + 1}/${RECOMMENDED_CONCEPTS.length}`
  } else if (activeIndex === 4) {
    stepIndicator = `Slide 5 of ${SLIDES.length} · ${slideStep === 0 ? 'Overview' : `Point ${slideStep}/4`}`
  } else if (activeIndex === 5) {
    stepIndicator = `Slide 6 of ${SLIDES.length} · ${slideStep === 0 ? 'Overview' : `Point ${slideStep}/4`}`
  } else if (activeIndex === 6) {
    stepIndicator = `Slide 7 of ${SLIDES.length} · ${slideStep === 0 ? 'Overview' : `Point ${slideStep}/4`}`
  } else if (activeIndex === 7) {
    stepIndicator = `Slide 8 of ${SLIDES.length} · ${slideStep === 0 ? 'Overview' : `Point ${slideStep}/3`}`
  }

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
            <button
              key={slide.id}
              type="button"
              className={`nav-slide-item ${isSlideActive ? 'is-active' : ''}`}
              aria-current={isSlideActive ? 'step' : undefined}
              onClick={() => {
                onSelectSlide(idx)
                if (onCloseMobile) onCloseMobile()
              }}
            >
              <span className="nav-slide-num">0{slide.index}</span>
              <div className="nav-slide-meta">
                <strong className="nav-slide-title">{slide.title}</strong>
                {isSlideActive && activeIndex === 0 && (
                  <span className="nav-slide-proto-pill">
                    {slideStep === 0 ? 'Overview' : `Point ${slideStep}/4`}
                  </span>
                )}
                {isSlideActive && activeIndex === 1 && (
                  <span className="nav-slide-proto-pill">
                    {slideStep === 0 ? 'Overview' : `Point ${slideStep}/5`}
                  </span>
                )}
                {isRecommendedSlide && isSlideActive && (
                  <span className="nav-slide-proto-pill">
                    Proto {activeConceptIndex + 1}/{RECOMMENDED_CONCEPTS.length} · {currentConcept.name}
                  </span>
                )}
                {isSlideActive && activeIndex === 4 && (
                  <span className="nav-slide-proto-pill">
                    {slideStep === 0 ? 'Overview' : `Point ${slideStep}/4`}
                  </span>
                )}
                {isSlideActive && activeIndex === 5 && (
                  <span className="nav-slide-proto-pill">
                    {slideStep === 0 ? 'Overview' : `Point ${slideStep}/4`}
                  </span>
                )}
                {isSlideActive && activeIndex === 6 && (
                  <span className="nav-slide-proto-pill">
                    {slideStep === 0 ? 'Overview' : `Point ${slideStep}/4`}
                  </span>
                )}
                {isSlideActive && activeIndex === 7 && (
                  <span className="nav-slide-proto-pill">
                    {slideStep === 0 ? 'Overview' : `Point ${slideStep}/3`}
                  </span>
                )}
              </div>
            </button>
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
              {currentSlide.keyTakeaways.map((point, i) => {
                let isActiveTakeaway = false
                if (activeIndex === 0 && slideStep > 0) {
                  const mapSlide1: Record<number, number> = { 1: 0, 2: 2, 3: 1, 4: 0 }
                  isActiveTakeaway = mapSlide1[slideStep] === i
                } else if (activeIndex === 1 && slideStep > 0) {
                  const mapSlide2: Record<number, number> = { 1: 0, 2: 3, 3: 1, 4: 2, 5: 3 }
                  isActiveTakeaway = mapSlide2[slideStep] === i
                } else if (activeIndex === 4 && slideStep > 0) {
                  const mapSlide5: Record<number, number> = { 1: 0, 2: 1, 3: 2, 4: 2 }
                  isActiveTakeaway = mapSlide5[slideStep] === i
                } else if (activeIndex === 5 && slideStep > 0) {
                  const mapSlide6: Record<number, number> = { 1: 0, 2: 0, 3: 1, 4: 2 }
                  isActiveTakeaway = mapSlide6[slideStep] === i
                } else if (activeIndex === 6 && slideStep > 0) {
                  const mapSlide7: Record<number, number> = { 1: 1, 2: 0, 3: 2, 4: 1 }
                  isActiveTakeaway = mapSlide7[slideStep] === i
                } else if (activeIndex === 7 && slideStep > 0) {
                  const mapSlide8: Record<number, number> = { 1: 0, 2: 1, 3: 2 }
                  isActiveTakeaway = mapSlide8[slideStep] === i
                }

                return (
                  <li
                    key={i}
                    className={isActiveTakeaway ? 'takeaways-item--active' : undefined}
                  >
                    {point}
                  </li>
                )
              })}
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
