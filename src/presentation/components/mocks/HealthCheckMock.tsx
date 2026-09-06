import React, { useState } from 'react'

export const HealthCheckMock: React.FC = () => {
  const [bufferStatus, setBufferStatus] = useState<'none' | 'building' | 'secure'>('none')
  const [paydayStress, setPaydayStress] = useState<'high' | 'moderate' | 'low'>('high')

  const getRecommendation = () => {
    if (bufferStatus === 'none') {
      return {
        focus: 'Emergency Cash Cushion',
        headline: 'Unexpected expenses are your biggest risk right now.',
        action: 'Put 20,000 Ks aside this week before spending on non-essential items.',
        targetTool: 'Save for Something (Buffer Mode)',
      }
    }
    if (paydayStress === 'high') {
      return {
        focus: 'Cashflow Timing',
        headline: 'Payday runway is your main pressure point.',
        action: 'Map upcoming bills 10 days ahead so essential commitments are locked in early.',
        targetTool: 'Money Calendar',
      }
    }
    return {
      focus: 'Reward Optimisation',
      headline: 'You have healthy balance discipline.',
      action: 'Maintain your qualifying weekly balance to unlock Wave Points rewards.',
      targetTool: 'Wave Points Accelerator',
    }
  }

  const rec = getRecommendation()

  return (
    <div className="mini-app-mock">
      <div className="mini-app-mock__header">
        <div className="mini-app-mock__pill">Wave Mini App</div>
        <div className="mini-app-mock__title">Money Health Check</div>
        <p className="mini-app-mock__sub">2-minute checkup · One clear next action</p>
      </div>

      {/* Interactive Micro-Questions */}
      <div className="mock-card">
        <div className="mock-form-group">
          <label className="mock-label">1. Do you have an emergency cash buffer?</label>
          <div className="mock-choice-grid">
            <button
              type="button"
              className={`mock-choice-btn ${bufferStatus === 'none' ? 'is-active' : ''}`}
              onClick={() => setBufferStatus('none')}
              aria-pressed={bufferStatus === 'none'}
            >
              No buffer yet
            </button>
            <button
              type="button"
              className={`mock-choice-btn ${bufferStatus === 'building' ? 'is-active' : ''}`}
              onClick={() => setBufferStatus('building')}
              aria-pressed={bufferStatus === 'building'}
            >
              Building it
            </button>
            <button
              type="button"
              className={`mock-choice-btn ${bufferStatus === 'secure' ? 'is-active' : ''}`}
              onClick={() => setBufferStatus('secure')}
              aria-pressed={bufferStatus === 'secure'}
            >
              1+ Month Saved
            </button>
          </div>
        </div>

        <div className="mock-form-group">
          <label className="mock-label">2. How often do you run low before payday?</label>
          <div className="mock-choice-grid">
            <button
              type="button"
              className={`mock-choice-btn ${paydayStress === 'high' ? 'is-active' : ''}`}
              onClick={() => setPaydayStress('high')}
              aria-pressed={paydayStress === 'high'}
            >
              Almost monthly
            </button>
            <button
              type="button"
              className={`mock-choice-btn ${paydayStress === 'moderate' ? 'is-active' : ''}`}
              onClick={() => setPaydayStress('moderate')}
              aria-pressed={paydayStress === 'moderate'}
            >
              Occasionally
            </button>
            <button
              type="button"
              className={`mock-choice-btn ${paydayStress === 'low' ? 'is-active' : ''}`}
              onClick={() => setPaydayStress('low')}
              aria-pressed={paydayStress === 'low'}
            >
              Rarely / Never
            </button>
          </div>
        </div>
      </div>

      {/* Human Diagnosis Output */}
      <div className="mock-result-card">
        <div className="mock-result-card__tag">Personalized Priority: {rec.focus}</div>
        <div className="mock-result-card__title">{rec.headline}</div>
        <div className="mock-result-card__box">
          <span className="mock-result-card__sub">One thing to try this week:</span>
          <p className="mock-result-card__action">{rec.action}</p>
        </div>
        <div className="mock-result-card__footer">
          Recommended tool: <strong>{rec.targetTool}</strong>
        </div>
      </div>
    </div>
  )
}
