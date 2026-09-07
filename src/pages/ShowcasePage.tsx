import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Brand } from '../components/Brand'
import { ConnectedModelSlide } from '../presentation/components/ConnectedModelSlide'
import { FragmentationSlide } from '../presentation/components/FragmentationSlide'
import { IdeaLandscapeSlide } from '../presentation/components/IdeaLandscapeSlide'
import { PointsConnectionSlide } from '../presentation/components/PointsConnectionSlide'
import { PresentationNav } from '../presentation/components/PresentationNav'
import { RecommendationSlide } from '../presentation/components/RecommendationSlide'
import { RecommendedIdeasSlide } from '../presentation/components/RecommendedIdeasSlide'
import { TitleSlide } from '../presentation/components/TitleSlide'
import { WhyMiniAppsSlide } from '../presentation/components/WhyMiniAppsSlide'
import { RECOMMENDED_CONCEPTS, SLIDES } from '../presentation/presentationData'
import '../presentation/presentation.css'

export const ShowcasePage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeConceptIndex, setActiveConceptIndex] = useState(0)
  const [slideStep, setSlideStep] = useState(0)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const stageRef = React.useRef<HTMLElement>(null)

  // Scroll to top of stage canvas only when the slide or prototype changes, NOT when scrubbing talking points
  useEffect(() => {
    if (stageRef.current) {
      if (typeof stageRef.current.scrollTo === 'function') {
        stageRef.current.scrollTo({ top: 0, behavior: 'instant' })
      } else {
        stageRef.current.scrollTop = 0
      }
    }
  }, [activeIndex, activeConceptIndex])

  const handleSelectSlide = (slideIndex: number, conceptIndex?: number) => {
    setActiveIndex(slideIndex)
    setSlideStep(0)
    if (slideIndex === 3) {
      if (conceptIndex !== undefined) {
        setActiveConceptIndex(conceptIndex)
      }
    } else {
      setActiveConceptIndex(0)
    }
    if (stageRef.current) {
      if (typeof stageRef.current.scrollTo === 'function') {
        stageRef.current.scrollTo({ top: 0, behavior: 'instant' })
      } else {
        stageRef.current.scrollTop = 0
      }
    }
  }

  const goNext = React.useCallback(() => {
    // If on Slide 1 (Title), step through 4 talking points
    if (activeIndex === 0 && slideStep < 4) {
      setSlideStep((curr) => curr + 1)
      return
    }

    // If on Slide 2 (Why Mini Apps), step through 5 talking points
    if (activeIndex === 1 && slideStep < 5) {
      setSlideStep((curr) => curr + 1)
      return
    }

    // If on Slide 4 (recommended ideas), step through the prototypes first
    if (activeIndex === 3 && activeConceptIndex < RECOMMENDED_CONCEPTS.length - 1) {
      setActiveConceptIndex((curr) => curr + 1)
      return
    }

    // If on Slide 5 (Points Connection), step through 4 talking points
    if (activeIndex === 4 && slideStep < 4) {
      setSlideStep((curr) => curr + 1)
      return
    }

    // If on Slide 6 (Fragmentation), step through 4 talking points
    if (activeIndex === 5 && slideStep < 4) {
      setSlideStep((curr) => curr + 1)
      return
    }

    // If on Slide 7 (Connected Model), step through 4 talking points
    if (activeIndex === 6 && slideStep < 4) {
      setSlideStep((curr) => curr + 1)
      return
    }

    // If on Slide 8 (Recommendation), step through 3 talking points
    if (activeIndex === 7 && slideStep < 3) {
      setSlideStep((curr) => curr + 1)
      return
    }

    // Advance to next slide
    if (activeIndex < SLIDES.length - 1) {
      const nextIndex = activeIndex + 1
      setActiveIndex(nextIndex)
      setSlideStep(0)
      if (nextIndex === 3) {
        setActiveConceptIndex(0)
      }
    }
  }, [activeIndex, slideStep, activeConceptIndex])

  const goPrev = React.useCallback(() => {
    // If on slides with sub-steps and not at step 0, step backward through talking points
    if (
      (activeIndex === 0 ||
        activeIndex === 1 ||
        activeIndex === 4 ||
        activeIndex === 5 ||
        activeIndex === 6 ||
        activeIndex === 7) &&
      slideStep > 0
    ) {
      setSlideStep((curr) => curr - 1)
      return
    }

    // If on Slide 4 and not at the first prototype, step backward through prototypes
    if (activeIndex === 3 && activeConceptIndex > 0) {
      setActiveConceptIndex((curr) => curr - 1)
      return
    }

    // Go back to previous slide
    if (activeIndex > 0) {
      const prevIndex = activeIndex - 1
      setActiveIndex(prevIndex)
      if (prevIndex === 0) {
        setSlideStep(4)
      } else if (prevIndex === 1) {
        setSlideStep(5)
      } else if (prevIndex === 3) {
        setActiveConceptIndex(RECOMMENDED_CONCEPTS.length - 1)
        setSlideStep(0)
      } else if (prevIndex === 4) {
        setSlideStep(4)
      } else if (prevIndex === 5) {
        setSlideStep(4)
      } else if (prevIndex === 6) {
        setSlideStep(4)
      } else {
        setSlideStep(0)
      }
    }
  }, [activeIndex, slideStep, activeConceptIndex])

  const isPrevDisabled = activeIndex === 0 && slideStep === 0
  const isNextDisabled =
    activeIndex === SLIDES.length - 1 && slideStep === 3

  // Keyboard navigation support: ArrowDown, ArrowUp, ArrowRight, ArrowLeft, PageDown, PageUp, Space
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is focused on an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return
      }

      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowRight' ||
        e.key === 'PageDown' ||
        e.key === ' '
      ) {
        e.preventDefault()
        goNext()
      } else if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'PageUp'
      ) {
        e.preventDefault()
        goPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  const renderActiveSlide = () => {
    switch (SLIDES[activeIndex].id) {
      case 'title':
        return (
          <TitleSlide
            step={slideStep}
            onSelectStep={(step) => setSlideStep(step)}
          />
        )
      case 'why-mini-apps':
        return (
          <WhyMiniAppsSlide
            step={slideStep}
            onSelectStep={(step) => setSlideStep(step)}
          />
        )
      case 'idea-landscape':
        return <IdeaLandscapeSlide />
      case 'recommended':
        return (
          <RecommendedIdeasSlide
            activeConceptIndex={activeConceptIndex}
            onSelectConceptIndex={setActiveConceptIndex}
          />
        )
      case 'points-connection':
        return (
          <PointsConnectionSlide
            step={slideStep}
            onSelectStep={(step) => setSlideStep(step)}
          />
        )
      case 'fragmentation':
        return (
          <FragmentationSlide
            step={slideStep}
            onSelectStep={(step) => setSlideStep(step)}
          />
        )
      case 'connected-model':
        return (
          <ConnectedModelSlide
            step={slideStep}
            onSelectStep={(step) => setSlideStep(step)}
          />
        )
      case 'recommendation':
        return (
          <RecommendationSlide
            step={slideStep}
            onSelectStep={(step) => setSlideStep(step)}
          />
        )
      default:
        return <TitleSlide />
    }
  }

  let headerProgressText = `Slide ${activeIndex + 1} of ${SLIDES.length}`
  if (activeIndex === 0) {
    headerProgressText = `Slide 1 of ${SLIDES.length} · ${slideStep === 0 ? 'Overview' : `Point ${slideStep}/4`}`
  } else if (activeIndex === 1) {
    headerProgressText = `Slide 2 of ${SLIDES.length} · ${slideStep === 0 ? 'Overview' : `Point ${slideStep}/5`}`
  } else if (activeIndex === 3) {
    headerProgressText = `Slide 4 of ${SLIDES.length} · Prototype ${activeConceptIndex + 1}/${RECOMMENDED_CONCEPTS.length}`
  } else if (activeIndex === 4) {
    headerProgressText = `Slide 5 of ${SLIDES.length} · ${slideStep === 0 ? 'Overview' : `Point ${slideStep}/4`}`
  } else if (activeIndex === 5) {
    headerProgressText = `Slide 6 of ${SLIDES.length} · ${slideStep === 0 ? 'Overview' : `Point ${slideStep}/4`}`
  } else if (activeIndex === 6) {
    headerProgressText = `Slide 7 of ${SLIDES.length} · ${slideStep === 0 ? 'Overview' : `Point ${slideStep}/4`}`
  } else if (activeIndex === 7) {
    headerProgressText = `Slide 8 of ${SLIDES.length} · ${slideStep === 0 ? 'Overview' : `Point ${slideStep}/3`}`
  }

  const mobileCountText =
    activeIndex === 0
      ? `Slide 1 · ${slideStep === 0 ? 'Overview' : `${slideStep}/4`}`
      : activeIndex === 1
      ? `Slide 2 · ${slideStep === 0 ? 'Overview' : `${slideStep}/5`}`
      : activeIndex === 3
      ? `Slide 4 · Proto ${activeConceptIndex + 1}/${RECOMMENDED_CONCEPTS.length}`
      : activeIndex === 4
      ? `Slide 5 · ${slideStep === 0 ? 'Overview' : `${slideStep}/4`}`
      : activeIndex === 5
      ? `Slide 6 · ${slideStep === 0 ? 'Overview' : `${slideStep}/4`}`
      : activeIndex === 6
      ? `Slide 7 · ${slideStep === 0 ? 'Overview' : `${slideStep}/4`}`
      : activeIndex === 7
      ? `Slide 8 · ${slideStep === 0 ? 'Overview' : `${slideStep}/3`}`
      : `${activeIndex + 1} / ${SLIDES.length}`

  return (
    <div className="presentation-shell">
      {/* Shell Header */}
      <header className="shell-header">
        <div className="shell-header__left">
          <Brand />
        </div>

        <div className="shell-header__actions">
          <span className="deck-progress-pill">
            {headerProgressText}
          </span>

          <Link className="button" to="/config">
            Config
          </Link>
        </div>
      </header>

      {/* Main 2-Column Presentation Layout (Left TOC Nav + Right Stage) */}
      <main className="deck-layout">
        <PresentationNav
          activeIndex={activeIndex}
          activeConceptIndex={activeConceptIndex}
          slideStep={slideStep}
          onSelectSlide={handleSelectSlide}
          onPrev={goPrev}
          onNext={goNext}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          isMobileOpen={isMobileNavOpen}
          onCloseMobile={() => setIsMobileNavOpen(false)}
        />

        {/* Presentation Stage Canvas */}
        <section className="deck-stage" ref={stageRef} aria-live="polite">
          <div className="deck-stage__inner" key={SLIDES[activeIndex].id}>
            {renderActiveSlide()}
          </div>

          {/* Quick Floating Stepper for Mobile / Stage Bottom */}
          <div className="stage-mobile-controls">
            <button
              className="button"
              type="button"
              disabled={isPrevDisabled}
              onClick={goPrev}
            >
              ← Prev
            </button>
            <span className="stage-mobile-count">
              {mobileCountText}
            </span>
            <button
              className="button button--primary"
              type="button"
              disabled={isNextDisabled}
              onClick={goNext}
            >
              Next →
            </button>
          </div>
        </section>
      </main>

      {/* Presentation Footer */}
      <footer className="shell-footer">
        Mini App Opportunities · Wave Money Product Strategy
      </footer>
    </div>
  )
}
