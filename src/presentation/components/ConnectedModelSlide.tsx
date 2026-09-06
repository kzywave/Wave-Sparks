import React from 'react'

export const ConnectedModelSlide: React.FC = () => {
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

  return (
    <div className="slide-canvas">
      <div className="slide-header-block">
        <div className="eyebrow">System Architecture · The Connected Model</div>
        <h2 className="slide-main-title">Connect around the customer need.</h2>
        <p className="slide-sub-title">
          Shifting from promotion-led push mechanics to customer-need-led engagement loops.
        </p>
      </div>

      {/* Comparison: Promotion-Led vs Customer-Need-Led */}
      <div className="model-comparison-row">
        {/* Promotion-Led Pattern */}
        <div className="pattern-box pattern-box--old">
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

        {/* Customer-Need-Led Connected Model */}
        <div className="pattern-box pattern-box--new">
          <div className="pattern-box__header">
            <span className="pattern-tag pattern-tag--bright">Customer-Need-Led Connected Model (Pull)</span>
          </div>
          <div className="spine-flow-row">
            {spineSteps.map((step, idx) => (
              <div key={step.num} className="spine-node">
                <span className="spine-num">{step.num}</span>
                <span className="spine-title">{step.title}</span>
                <span className="spine-desc">{step.desc}</span>
                {idx < spineSteps.length - 1 && <span className="spine-arrow">→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real Scenario Examples */}
      <div className="scenarios-container">
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

      <div className="banner-rule mt-3">
        <div className="banner-rule__text">
          Mini Apps do not replace WavePay&apos;s core transaction features. They serve as the lightweight connective tissue that gives customers a real reason to return.
        </div>
      </div>
    </div>
  )
}
