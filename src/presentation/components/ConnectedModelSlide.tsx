import React from 'react'
import { AnimatedText } from './AnimatedText'

export interface ConnectedModelSlideProps {
  step?: number
  onSelectStep?: (step: number) => void
}

export const ConnectedModelSlide: React.FC<ConnectedModelSlideProps> = ({
  step = 0,
  onSelectStep,
}) => {
  const spineSteps = [
    { num: '01', title: 'Customer Need', desc: 'Real-world problem or goal' },
    { num: '02', title: 'Useful Mini App', desc: 'Lightweight micro-utility' },
    { num: '03', title: 'Wave Action', desc: 'P2P transfer, bill pay, QR' },
    { num: '04', title: 'Balance / Habit', desc: 'Preserving funds in wallet' },
    { num: '05', title: 'Wave Points / Reward', desc: 'Existing incentive kick-in' },
    { num: '06', title: 'Meaningful Progress', desc: 'Closer to personal milestone' },
    { num: '07', title: 'Natural Return', desc: 'Continuous weekly cycle' },
  ]

  const practicalExamples = [
    {
      app: 'Save for Something',
      need: 'Wants to buy a smartphone in 3 months',
      waveAction: 'Maintains qualifying weekly wallet balance',
      rewardLink: 'Earns Wave Points weekly bonus to reach goal sooner',
    },
    {
      app: 'Money Calendar',
      need: 'Wants to avoid falling short on rent & wifi',
      waveAction: 'Executes scheduled utility & bill payments in Wave',
      rewardLink: 'Auto-logs payments and secures peace of mind',
    },
    {
      app: 'Split It',
      need: 'Coordinating group hotpot dinner expenses',
      waveAction: 'Generates instant WavePay payment requests',
      rewardLink: 'Transactions settle immediately into wallets',
    },
  ]

  const isOldPatternRevealed = step >= 1
  const isNewPatternRevealed = step >= 2
  const isScenariosRevealed = step >= 3
  const isBannerRevealed = step >= 4

  return (
    <div className="slide-canvas">
      <div className="slide-header-block">
        <div className="eyebrow">System Architecture · The Connected Model</div>
        <AnimatedText
          as="h2"
          effect="per-word-crossfade"
          className="slide-main-title"
          text="Connect around the customer need."
        />
        <AnimatedText
          as="p"
          effect="micro-scale-fade"
          className="slide-sub-title"
          delayMs={250}
          text="Shifting from promotion-led push mechanics to customer-need-led engagement loops."
        />
      </div>

      {/* Comparison: Promotion-Led vs Customer-Need-Led */}
      <div className="model-comparison-row">
        {/* Promotion-Led Pattern */}
        {isOldPatternRevealed ? (
          <div className="pattern-box pattern-box--old pattern-box--revealed">
            <div className="pattern-box__header">
              <span className="pattern-tag pattern-tag--dim">Traditional Promotion-Led (Push)</span>
            </div>
            <div className="pattern-flow">
              <span className="p-node">Promotion</span>
              <span className="p-sep">→</span>
              <span className="p-node">Banner</span>
              <span className="p-sep">→</span>
              <span className="p-node">Transaction</span>
              <span className="p-sep">→</span>
              <span className="p-node">One-off Reward</span>
              <span className="p-sep">→</span>
              <span className="p-node p-node--terminal">Dropoff (End)</span>
            </div>
          </div>
        ) : (
          <div
            className="pattern-box pattern-box--old pattern-box--placeholder"
            onClick={() => onSelectStep?.(1)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectStep?.(1)
              }
            }}
            aria-label="Point 1: Click to reveal Traditional Promotion-Led pattern"
          >
            <div className="skeleton-badge-row">
              <span className="skeleton-block skeleton-pill" style={{ width: '13rem', height: '1.1rem' }} />
              <span className="skeleton-hint-text">Click to reveal</span>
            </div>
            <span className="skeleton-block" style={{ width: '85%', height: '1.2rem', marginTop: '.3rem' }} />
          </div>
        )}

        {/* Customer-Need-Led Connected Model */}
        {isNewPatternRevealed ? (
          <div className="pattern-box pattern-box--new pattern-box--revealed">
            <div className="pattern-box__header">
              <span className="pattern-tag pattern-tag--bright">Customer-Need-Led Connected Model (Pull)</span>
            </div>
            <div className="spine-flow-row">
              {spineSteps.map((stepNode, idx) => (
                <div key={stepNode.num} className="spine-node">
                  <span className="spine-num">{stepNode.num}</span>
                  <span className="spine-title">{stepNode.title}</span>
                  <span className="spine-desc">{stepNode.desc}</span>
                  {idx < spineSteps.length - 1 && <span className="spine-arrow">→</span>}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="pattern-box pattern-box--new pattern-box--placeholder"
            onClick={() => onSelectStep?.(2)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectStep?.(2)
              }
            }}
            aria-label="Point 2: Click to reveal Customer-Need-Led Connected Model"
          >
            <div className="skeleton-badge-row">
              <span className="skeleton-block skeleton-pill" style={{ width: '15rem', height: '1.1rem' }} />
              <span className="skeleton-hint-text">Click to reveal 7-step pull loop</span>
            </div>
            <span className="skeleton-block" style={{ width: '100%', height: '3.5rem', borderRadius: '.75rem', marginTop: '.4rem' }} />
          </div>
        )}
      </div>

      {/* Real Scenario Examples */}
      {isScenariosRevealed ? (
        <div className="scenarios-container scenarios-container--revealed">
          <div className="scenarios-title">How the Loop Works Across Everyday Moments:</div>
          <div className="scenarios-grid">
            {practicalExamples.map((ex) => (
              <div key={ex.app} className="scenario-card">
                <div className="scenario-card__name">{ex.app}</div>
                <div className="scenario-card__item">
                  <span className="s-label">1. Need:</span>
                  <span className="s-val">{ex.need}</span>
                </div>
                <div className="scenario-card__item">
                  <span className="s-label">2. Action:</span>
                  <span className="s-val">{ex.waveAction}</span>
                </div>
                <div className="scenario-card__item">
                  <span className="s-label">3. Outcome:</span>
                  <span className="s-val">{ex.rewardLink}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="scenarios-container scenarios-container--placeholder"
          onClick={() => onSelectStep?.(3)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onSelectStep?.(3)
            }
          }}
          aria-label="Point 3: Click to reveal Everyday Scenarios"
        >
          <div className="skeleton-badge-row">
            <span className="skeleton-block skeleton-pill" style={{ width: '16rem', height: '1rem' }} />
            <span className="skeleton-hint-text">Click to reveal 3 moment loops</span>
          </div>
          <div className="scenarios-grid" style={{ pointerEvents: 'none' }}>
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="scenario-card" style={{ background: 'transparent', borderStyle: 'dashed' }}>
                <span className="skeleton-block" style={{ width: '55%', height: '1.1rem', marginBottom: '.4rem' }} />
                <span className="skeleton-block" style={{ width: '100%', height: '.8rem' }} />
                <span className="skeleton-block" style={{ width: '85%', height: '.8rem' }} />
                <span className="skeleton-block" style={{ width: '70%', height: '.8rem' }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {isBannerRevealed ? (
        <div className="banner-rule banner-rule--revealed mt-3">
          <div className="banner-rule__text">
            Mini Apps do not replace WavePay&apos;s core transaction features. They serve as the lightweight connective tissue that gives customers a real reason to return.
          </div>
        </div>
      ) : (
        <div
          className="banner-rule banner-rule--placeholder mt-3"
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
            <span className="skeleton-block" style={{ width: '75%', height: '1rem' }} />
            <span className="skeleton-hint-text">Click to reveal</span>
          </div>
        </div>
      )}
    </div>
  )
}
