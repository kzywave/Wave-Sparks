import React from 'react'

export const PointsConnectionSlide: React.FC = () => {
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

  return (
    <div className="slide-canvas">
      <div className="slide-header-block">
        <div className="eyebrow">Rewards Architecture · Natural Connection</div>
        <h2 className="slide-main-title">
          The reward mechanic provides the incentive.<br />
          The Mini App gives that behaviour a personal purpose.
        </h2>
        <p className="slide-sub-title">
          Wave Points rewards qualifying balance retention. Mini Apps provide the human reason to maintain that balance in the first place.
        </p>
      </div>

      {/* Conceptual Contrast Comparison */}
      <div className="comparison-cards-grid">
        <div className="comparison-card comparison-card--left">
          <div className="comparison-card__tag">Current Loyalty Programme</div>
          <h3 className="comparison-card__heading">Answers: &ldquo;What incentive do I receive?&rdquo;</h3>
          <p className="comparison-card__body">
            Wave Points creates financial incentives for maintaining qualifying balance and performing transactions, rewarding consistency with points (1 Point = 1 Cash Unit).
          </p>
          <div className="comparison-card__footer">
            Extrinsic motivation: abstract rules & tier mechanics.
          </div>
        </div>

        <div className="comparison-bridge-badge">
          <span>+ Connected with Mini Apps</span>
        </div>

        <div className="comparison-card comparison-card--right">
          <div className="comparison-card__tag">Mini App Utility Layer</div>
          <h3 className="comparison-card__heading">Answers: &ldquo;What personal milestone am I achieving?&rdquo;</h3>
          <p className="comparison-card__body">
            Mini Apps like <strong>Save for Something</strong> translate generic balance retention into an emotional, real-world goal (new phone, emergency safety, family education).
          </p>
          <div className="comparison-card__footer">
            Intrinsic motivation: personal pride, relief, and real progress.
          </div>
        </div>
      </div>

      {/* 5-Step Connected Flow Spine */}
      <div className="flow-spine-container">
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

      <div className="guardrail-callout">
        <strong>Strategic takeaway:</strong> We do not need to redesign the Wave Points engine. We simply connect its incentive power to tools that give everyday financial behavior real customer relevance.
      </div>
    </div>
  )
}
