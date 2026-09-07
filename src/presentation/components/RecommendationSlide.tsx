import React from 'react'
import { AnimatedText } from './AnimatedText'
import { HOMEWORK_SUMMARY } from '../presentationData'

export interface RecommendationSlideProps {
  step?: number
  onSelectStep?: (step: number) => void
}

export const RecommendationSlide: React.FC<RecommendationSlideProps> = ({
  step = 0,
  onSelectStep,
}) => {
  const isPhase1Revealed = step >= 1
  const isPhase2Revealed = step >= 2
  const isHomeworkRevealed = step >= 3

  return (
    <div className="slide-canvas">
      <div className="slide-header-block">
        <div className="eyebrow">Action Plan & Homework Synthesis</div>
        <AnimatedText
          as="h2"
          effect="per-word-crossfade"
          className="slide-main-title"
          text="Start small. Connect what already exists."
        />
        <AnimatedText
          as="p"
          effect="micro-scale-fade"
          className="slide-sub-title"
          delayMs={250}
          text="A clear two-phase testing sequence, followed by direct answers to the product evaluation criteria."
        />
      </div>

      {/* Phased Roadmap Sequence */}
      <div className="roadmap-grid">
        {/* Phase 1 Priority Box */}
        {isPhase1Revealed ? (
          <div className="roadmap-card roadmap-card--priority roadmap-card--revealed">
            <div className="roadmap-card__tag">Phase 1 · Immediate Prototyping</div>
            <h3 className="roadmap-card__title">Top 2 Low-Dependency Pilots</h3>
            <div className="pilots-list">
              <div className="pilot-item">
                <span className="pilot-name">1. Save for Something</span>
                <span className="badge-dep badge-dep--very-low">Very Low Dep</span>
                <p className="pilot-why">
                  Tests goal-based balance retention and creates an immediate personal use case for Wave Points qualification.
                </p>
              </div>
              <div className="pilot-item">
                <span className="pilot-name">2. Can I Afford This?</span>
                <span className="badge-dep badge-dep--very-low">Very Low Dep</span>
                <p className="pilot-why">
                  Solves high-frequency purchase uncertainty and drives repeat opens at critical moments of spend intent.
                </p>
              </div>
            </div>
            <div className="roadmap-card__footer">
              <strong>Why first:</strong> Zero core wallet backend dependency. Can be prototyped and user-tested with AI within 2 weeks.
            </div>
          </div>
        ) : (
          <div
            className="roadmap-card roadmap-card--priority roadmap-card--placeholder"
            onClick={() => onSelectStep?.(1)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectStep?.(1)
              }
            }}
            aria-label="Point 1: Click to reveal Phase 1 Immediate Prototyping"
          >
            <div className="skeleton-badge-row">
              <span className="skeleton-block skeleton-pill" style={{ width: '12rem', height: '1.1rem' }} />
              <span className="skeleton-hint-text">Click to reveal</span>
            </div>
            <span className="skeleton-block" style={{ width: '60%', height: '1.3rem', margin: '.2rem 0' }} />
            <div className="skeleton-desc-group">
              <span className="skeleton-block" style={{ width: '100%', height: '2.5rem', borderRadius: '.7rem' }} />
              <span className="skeleton-block" style={{ width: '100%', height: '2.5rem', borderRadius: '.7rem' }} />
            </div>
          </div>
        )}

        {/* Phase 2 Box */}
        {isPhase2Revealed ? (
          <div className="roadmap-card roadmap-card--revealed">
            <div className="roadmap-card__tag">Phase 2 · Secondary Sequence</div>
            <h3 className="roadmap-card__title">2 Follow-up Utilities</h3>
            <div className="pilots-list">
              <div className="pilot-item">
                <span className="pilot-name">3. Money Calendar</span>
                <span className="badge-dep badge-dep--low">Low Dep</span>
                <p className="pilot-why">Pre-payday bill planning and future gateway to automated bill settlement.</p>
              </div>
              <div className="pilot-item">
                <span className="pilot-name">4. Split It</span>
                <span className="badge-dep badge-dep--very-low">Very Low Dep</span>
                <p className="pilot-why">Social bill division with viral P2P money request distribution.</p>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="roadmap-card roadmap-card--placeholder"
            onClick={() => onSelectStep?.(2)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectStep?.(2)
              }
            }}
            aria-label="Point 2: Click to reveal Phase 2 Secondary Sequence"
          >
            <div className="skeleton-badge-row">
              <span className="skeleton-block skeleton-pill" style={{ width: '11rem', height: '1.1rem' }} />
              <span className="skeleton-hint-text">Click to reveal</span>
            </div>
            <span className="skeleton-block" style={{ width: '55%', height: '1.3rem', margin: '.2rem 0' }} />
            <div className="skeleton-desc-group">
              <span className="skeleton-block" style={{ width: '100%', height: '2.5rem', borderRadius: '.7rem' }} />
              <span className="skeleton-block" style={{ width: '100%', height: '2.5rem', borderRadius: '.7rem' }} />
            </div>
          </div>
        )}
      </div>

      {/* Homework Summary Cards */}
      {isHomeworkRevealed ? (
        <div className="homework-container homework-container--revealed">
          <h4 className="homework-heading">Summary Answers to Product Evaluation Questions</h4>
          <div className="homework-grid">
            {HOMEWORK_SUMMARY.map((hw) => (
              <div key={hw.question} className="homework-item">
                <div className="homework-q">{hw.question}</div>
                <div className="homework-a">{hw.answer}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="homework-container homework-container--placeholder"
          onClick={() => onSelectStep?.(3)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onSelectStep?.(3)
            }
          }}
          aria-label="Point 3: Click to reveal Summary Answers to Evaluation Questions"
        >
          <div className="skeleton-badge-row">
            <span className="skeleton-block skeleton-pill" style={{ width: '18rem', height: '1.1rem' }} />
            <span className="skeleton-hint-text">Click to reveal 5 answers</span>
          </div>
          <div className="homework-grid" style={{ pointerEvents: 'none' }}>
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="homework-item" style={{ background: 'transparent', borderStyle: 'dashed' }}>
                <span className="skeleton-block" style={{ width: '70%', height: '1rem', marginBottom: '.3rem' }} />
                <span className="skeleton-block" style={{ width: '100%', height: '.8rem' }} />
                <span className="skeleton-block" style={{ width: '85%', height: '.8rem' }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
