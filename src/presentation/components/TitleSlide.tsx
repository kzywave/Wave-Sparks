import React from 'react'
import { AnimatedText } from './AnimatedText'

export interface TitleSlideProps {
  step?: number
  onSelectStep?: (step: number) => void
}

export const TitleSlide: React.FC<TitleSlideProps> = ({
  step = 0,
  onSelectStep,
}) => {
  const pillars = [
    {
      num: '01',
      title: 'Real Customer Utility',
      desc: 'Focus on practical money decisions customers face daily before requiring complex wallet changes.',
    },
    {
      num: '02',
      title: 'Low-Dependency Speed',
      desc: 'Leverage the existing Mini App container to build, test, and learn with rapid AI prototypes.',
    },
    {
      num: '03',
      title: 'Connected Ecosystem',
      desc: 'Anchor Wave Points, balance retention, and promotions to meaningful personal customer goals.',
    },
  ]

  const isQuoteRevealed = step >= 4

  return (
    <div className="slide-canvas slide-canvas--title">
      <div className="slide-title-hero">
        <div className="badge-pill">Wave Money · Product Strategy</div>
        <h1 className="title-display">
          <AnimatedText effect="soft-blur-in" text="Small tools." />
          <br />
          <AnimatedText
            effect="soft-blur-in"
            text="Connected value."
            delayMs={240}
            highlightText="Connected value."
          />
        </h1>
        <AnimatedText
          as="p"
          effect="micro-scale-fade"
          className="title-lead"
          delayMs={420}
          text="Using Mini Apps to solve everyday money problems — while connecting what Wave already builds."
        />
      </div>

      <div className="title-pillars-grid">
        {pillars.map((p, idx) => {
          const pillarStep = idx + 1
          const isRevealed = step >= pillarStep

          if (!isRevealed) {
            return (
              <div
                key={p.num}
                className="pillar-card pillar-card--placeholder"
                onClick={() => onSelectStep?.(pillarStep)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelectStep?.(pillarStep)
                  }
                }}
                aria-label={`Point ${pillarStep}: Click to reveal ${p.title}`}
              >
                <div className="skeleton-badge-row">
                  <span
                    className="skeleton-block skeleton-pill"
                    style={{ width: '2.5rem', height: '1.2rem' }}
                  />
                  <span className="skeleton-hint-text">Click to reveal</span>
                </div>
                <div
                  className="skeleton-block"
                  style={{ width: '65%', height: '1.25rem', marginTop: '.25rem' }}
                />
                <div className="skeleton-desc-group">
                  <span
                    className="skeleton-block"
                    style={{ width: '100%', height: '.85rem' }}
                  />
                  <span
                    className="skeleton-block"
                    style={{ width: '85%', height: '.85rem' }}
                  />
                  <span
                    className="skeleton-block"
                    style={{ width: '60%', height: '.85rem' }}
                  />
                </div>
              </div>
            )
          }

          return (
            <div key={p.num} className="pillar-card pillar-card--revealed">
              <div className="pillar-num">{p.num}</div>
              <div className="pillar-title">{p.title}</div>
              <p className="pillar-desc">{p.desc}</p>
            </div>
          )
        })}
      </div>

      {isQuoteRevealed ? (
        <div className="title-footer-quote title-footer-quote--revealed">
          &ldquo;If we removed the WavePay logo, would customers still find this useful?&rdquo;
        </div>
      ) : (
        <div
          className="title-footer-quote title-footer-quote--placeholder"
          onClick={() => onSelectStep?.(4)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onSelectStep?.(4)
            }
          }}
          aria-label="Click to reveal final quote"
        >
          <div className="skeleton-quote-content">
            <span
              className="skeleton-block"
              style={{ width: '60%', height: '1.1rem' }}
            />
            <span className="skeleton-hint-text">Click to reveal quote</span>
          </div>
        </div>
      )}
    </div>
  )
}

