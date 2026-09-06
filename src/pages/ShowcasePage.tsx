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

export const ShowcasePage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeConceptIndex, setActiveConceptIndex] = useState(0)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const stageRef = React.useRef<HTMLElement>(null)

  // Scroll to top of stage canvas whenever the slide or prototype changes
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
    if (slideIndex === 3) {
      if (conceptIndex !== undefined) {
        setActiveConceptIndex(conceptIndex)
      }
    } else {
      setActiveConceptIndex(0)
    }
  }

  const goNext = React.useCallback(() => {
    // If on Slide 4 (recommended ideas), step through the 5 prototypes first
    if (activeIndex === 3) {
      if (activeConceptIndex < RECOMMENDED_CONCEPTS.length - 1) {
        setActiveConceptIndex((curr) => curr + 1)
        return
      }
    }

    // Advance to next slide
    if (activeIndex < SLIDES.length - 1) {
      const nextIndex = activeIndex + 1
      setActiveIndex(nextIndex)
      if (nextIndex === 3) {
        setActiveConceptIndex(0)
      }
    }
  }, [activeIndex, activeConceptIndex])

  const goPrev = React.useCallback(() => {
    // If on Slide 4 and not at the first prototype, step backward through prototypes
    if (activeIndex === 3) {
      if (activeConceptIndex > 0) {
        setActiveConceptIndex((curr) => curr - 1)
        return
      }
    }

    // Go back to previous slide
    if (activeIndex > 0) {
      const prevIndex = activeIndex - 1
      setActiveIndex(prevIndex)
      if (prevIndex === 3) {
        // When stepping back into Slide 4, land on the last prototype
        setActiveConceptIndex(RECOMMENDED_CONCEPTS.length - 1)
      }
    }
  }, [activeIndex, activeConceptIndex])

  const isPrevDisabled = activeIndex === 0 && activeConceptIndex === 0
  const isNextDisabled =
    activeIndex === SLIDES.length - 1 &&
    (activeIndex !== 3 || activeConceptIndex === RECOMMENDED_CONCEPTS.length - 1)

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
        return <TitleSlide />
      case 'why-mini-apps':
        return <WhyMiniAppsSlide />
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
        return <PointsConnectionSlide />
      case 'fragmentation':
        return <FragmentationSlide />
      case 'connected-model':
        return <ConnectedModelSlide />
      case 'recommendation':
        return <RecommendationSlide />
      default:
        return <TitleSlide />
    }
  }

  const headerProgressText =
    activeIndex === 3
      ? `Slide 4 of ${SLIDES.length} · Prototype ${activeConceptIndex + 1}/${RECOMMENDED_CONCEPTS.length}`
      : `Slide ${activeIndex + 1} of ${SLIDES.length}`

  const mobileProgressText =
    activeIndex === 3
      ? `Slide 4.${activeConceptIndex + 1}/${SLIDES.length}`
      : `Slide ${activeIndex + 1}/${SLIDES.length}`

  return (
    <div className="presentation-shell">
      {/* Shell Header */}
      <header className="shell-header">
        <div className="shell-header__left">
          <Brand />
        </div>

        <div className="shell-header__actions">
          {/* Mobile TOC Drawer trigger */}
          <button
            type="button"
            className="button mobile-toc-btn"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
          >
            ☰ {mobileProgressText}
          </button>

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
          <div className="deck-stage__inner">
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
              {activeIndex === 3
                ? `Slide 4 · Proto ${activeConceptIndex + 1}/${RECOMMENDED_CONCEPTS.length}`
                : `${activeIndex + 1} / ${SLIDES.length}`}
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
