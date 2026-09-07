import React from 'react'
import { AnimatedText } from './AnimatedText'

export interface PointsConnectionSlideProps {
  step?: number
  onSelectStep?: (step: number) => void
}

export const PointsConnectionSlide: React.FC<PointsConnectionSlideProps> = ({
  step = 0,
  onSelectStep,
}) => {
  const steps = [
    {
      step: '01',
      label: 'Personal Goal',
      desc: 'Customer wants a phone, motorbike, or school fees buffer.',
      badge: 'Mini App Purpose',
      isMiniApp: true,
    },
    {
      step: '02',
      label: 'Weekly Saving Plan',
      desc: 'Tool calculates exact amount needed to hold in WavePay.',
      badge: 'Actionable Plan',
      isMiniApp: true,
    },
    {
      step: '03',
      label: 'Balance Discipline',
      desc: 'Customer maintains required balance across Monday–Sunday.',
      badge: 'Customer Action',
      isMiniApp: false,
    },
    {
      step: '04',
      label: 'Wave Points Earned',
      desc: 'Weekly qualifying balance rewards unlock Wave Points.',
      badge: 'Wave Points Incentive',
      isPoints: true,
    },
    {
      step: '05',
      label: 'Goal Progress',
      desc: 'Points & saved money compound toward the customer milestone.',
      badge: 'Meaningful Outcome',
      isMiniApp: true,
    },
  ]

  const isCard1Revealed = step >= 1
  const isCard2Revealed = step >= 2
  const isSpineRevealed = step >= 3
  const isCalloutRevealed = step >= 4

  return (
    <div className="slide-canvas">
      <div className="slide-header-block">
        <div className="eyebrow">Rewards Architecture · Natural Connection</div>
        <h2 className="slide-main-title">
          <AnimatedText effect="per-word-crossfade" text="The reward mechanic provides the incentive." />
          <br />
          <AnimatedText
            effect="per-word-crossfade"
            delayMs={220}
            text="The Mini App gives that behaviour a personal purpose."
          />
        </h2>
        <AnimatedText
          as="p"
          effect="micro-scale-fade"
          className="slide-sub-title"
          delayMs={400}
          text="Wave Points rewards qualifying balance retention. Mini Apps provide the human reason to maintain that balance in the first place."
        />
      </div>

      {/* Conceptual Contrast Comparison */}
      <div className="comparison-cards-grid">
        {isCard1Revealed ? (
          <div className="comparison-card comparison-card--left comparison-card--revealed">
            <div className="comparison-card__tag">Current Loyalty Programme</div>
            <h3 className="comparison-card__heading">Answers: &ldquo;What incentive do I receive?&rdquo;</h3>
            <p className="comparison-card__body">
              Wave Points creates financial incentives for maintaining qualifying balance and performing transactions, rewarding consistency with points (1 Point = 1 Cash Unit).
            </p>
            <div className="comparison-card__footer">
              Extrinsic motivation: abstract rules & tier mechanics.
            </div>
          </div>
        ) : (
          <div
            className="comparison-card comparison-card--left comparison-card--placeholder"
            onClick={() => onSelectStep?.(1)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectStep?.(1)
              }
            }}
            aria-label="Point 1: Click to reveal Current Loyalty Programme"
          >
            <div className="skeleton-badge-row">
              <span className="skeleton-block skeleton-pill" style={{ width: '8.5rem', height: '1.1rem' }} />
              <span className="skeleton-hint-text">Click to reveal</span>
            </div>
            <div className="skeleton-block" style={{ width: '70%', height: '1.3rem', margin: '.2rem 0' }} />
            <div className="skeleton-desc-group">
              <span className="skeleton-block" style={{ width: '100%', height: '.85rem' }} />
              <span className="skeleton-block" style={{ width: '92%', height: '.85rem' }} />
              <span className="skeleton-block" style={{ width: '80%', height: '.85rem' }} />
            </div>
          </div>
        )}

        <div className="comparison-bridge-badge">
          <span>+ Connected with Mini Apps</span>
        </div>

        {isCard2Revealed ? (
          <div className="comparison-card comparison-card--right comparison-card--revealed">
            <div className="comparison-card__tag">Mini App Utility Layer</div>
            <h3 className="comparison-card__heading">Answers: &ldquo;What personal milestone am I achieving?&rdquo;</h3>
            <p className="comparison-card__body">
              Mini Apps like <strong>Save for Something</strong> translate generic balance retention into an emotional, real-world goal (new phone, emergency safety, family education).
            </p>
            <div className="comparison-card__footer">
              Intrinsic motivation: personal pride, relief, and real progress.
            </div>
          </div>
        ) : (
          <div
            className="comparison-card comparison-card--right comparison-card--placeholder"
            onClick={() => onSelectStep?.(2)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectStep?.(2)
              }
            }}
            aria-label="Point 2: Click to reveal Mini App Utility Layer"
          >
            <div className="skeleton-badge-row">
              <span className="skeleton-block skeleton-pill" style={{ width: '8rem', height: '1.1rem' }} />
              <span className="skeleton-hint-text">Click to reveal</span>
            </div>
            <div className="skeleton-block" style={{ width: '75%', height: '1.3rem', margin: '.2rem 0' }} />
            <div className="skeleton-desc-group">
              <span className="skeleton-block" style={{ width: '100%', height: '.85rem' }} />
              <span className="skeleton-block" style={{ width: '88%', height: '.85rem' }} />
              <span className="skeleton-block" style={{ width: '78%', height: '.85rem' }} />
            </div>
          </div>
        )}
      </div>

      {/* 5-Step Connected Flow Spine */}
      {isSpineRevealed ? (
        <div className="flow-spine-container flow-spine-container--revealed">
          <div className="flow-spine-heading">The Connected Customer Journey</div>
          <div className="flow-spine-grid">
            {steps.map((item, idx) => (
              <div key={item.step} className="flow-step-card">
                <div className="flow-step-top">
                  <span className="flow-step-num">{item.step}</span>
                  <span className={`badge-subtle ${item.isPoints ? 'badge-subtle--gold' : ''}`}>
                    {item.badge}
                  </span>
                </div>
                <div className="flow-step-label">{item.label}</div>
                <p className="flow-step-desc">{item.desc}</p>
                {idx < steps.length - 1 && <span className="flow-step-arrow">→</span>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="flow-spine-container flow-spine-container--placeholder"
          onClick={() => onSelectStep?.(3)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onSelectStep?.(3)
            }
          }}
          aria-label="Point 3: Click to reveal The Connected Customer Journey"
        >
          <div className="skeleton-badge-row">
            <span className="skeleton-block skeleton-pill" style={{ width: '12rem', height: '1rem' }} />
            <span className="skeleton-hint-text">Click to reveal 5-step journey</span>
          </div>
          <div className="flow-spine-grid" style={{ pointerEvents: 'none' }}>
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="flow-step-card" style={{ background: 'transparent', borderStyle: 'dashed' }}>
                <div className="skeleton-badge-row">
                  <span className="skeleton-block skeleton-pill" style={{ width: '1.5rem', height: '.9rem' }} />
                  <span className="skeleton-block skeleton-pill" style={{ width: '3.5rem', height: '.9rem' }} />
                </div>
                <span className="skeleton-block" style={{ width: '80%', height: '1rem', margin: '.3rem 0' }} />
                <span className="skeleton-block" style={{ width: '100%', height: '.75rem' }} />
                <span className="skeleton-block" style={{ width: '65%', height: '.75rem' }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {isCalloutRevealed ? (
        <div className="guardrail-callout guardrail-callout--revealed">
          <strong>Strategic takeaway:</strong> We do not need to redesign the Wave Points engine. We simply connect its incentive power to tools that give everyday financial behavior real customer relevance.
        </div>
      ) : (
        <div
          className="guardrail-callout guardrail-callout--placeholder"
          onClick={() => onSelectStep?.(4)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onSelectStep?.(4)
            }
          }}
          aria-label="Point 4: Click to reveal strategic takeaway"
        >
          <div className="skeleton-quote-content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.35rem', width: '85%' }}>
              <span className="skeleton-block skeleton-pill" style={{ width: '9rem', height: '.75rem' }} />
              <span className="skeleton-block" style={{ width: '100%', height: '.9rem' }} />
            </div>
            <span className="skeleton-hint-text">Click to reveal</span>
          </div>
        </div>
      )}
    </div>
  )
}
