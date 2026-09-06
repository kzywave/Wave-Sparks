import React, { useState } from 'react'

export const SaveForSomethingMock: React.FC = () => {
  const [goalName, setGoalName] = useState('New Smartphone')
  const [targetAmount, setTargetAmount] = useState(1200000)
  const [savedAmount, setSavedAmount] = useState(480000)
  const [weeksRemaining, setWeeksRemaining] = useState(8)
  const [reminderSet, setReminderSet] = useState(false)

  const handleTargetChange = (newTarget: number) => {
    setTargetAmount(newTarget)
    if (savedAmount > newTarget) {
      setSavedAmount(newTarget)
    }
  }

  const remainingToSave = Math.max(0, targetAmount - savedAmount)
  const weeklyTarget = Math.ceil(remainingToSave / (weeksRemaining || 1))
  const progressPercent = Math.min(100, Math.round((savedAmount / (targetAmount || 1)) * 100))
  const monthCount = Math.max(1, Math.round(weeksRemaining / 4))
  const monthText = monthCount === 1 ? '1 month' : `${monthCount} months`

  return (
    <div className="mini-app-mock">
      {/* Mini App Header */}
      <div className="mini-app-mock__header">
        <div className="mini-app-mock__pill">Wave Mini App</div>
        <div className="mini-app-mock__title">Save for Something</div>
        <p className="mini-app-mock__sub">Goal-based savings accelerator</p>
      </div>

      {/* Main Goal Card */}
      <div className="mock-card mock-card--featured">
        <div className="mock-card__header">
          <div className="mock-card__header-main">
            <span className="mock-badge">Target Goal</span>
            <input
              className="mock-input-inline"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="Goal name"
              aria-label="Goal name"
            />
          </div>
          <span className="mock-percent">{progressPercent}%</span>
        </div>

        {/* Progress Bar */}
        <div className="mock-progress-track">
          <div
            className="mock-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="mock-stat-row">
          <div>
            <div className="mock-label">Saved so far</div>
            <div className="mock-val">{savedAmount.toLocaleString()} Ks</div>
          </div>
          <div className="text-right">
            <div className="mock-label">Goal Target</div>
            <div className="mock-val">{targetAmount.toLocaleString()} Ks</div>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="mock-card">
        <div className="mock-form-group">
          <label className="mock-label">Target Amount (Ks)</label>
          <div className="mock-range-wrap">
            <input
              type="range"
              min="200000"
              max="3000000"
              step="50000"
              value={targetAmount}
              onChange={(e) => handleTargetChange(Number(e.target.value))}
            />
            <span className="mock-range-val">{targetAmount.toLocaleString()} Ks</span>
          </div>
        </div>

        <div className="mock-form-group">
          <label className="mock-label">Current Savings in Wave (Ks)</label>
          <div className="mock-range-wrap">
            <input
              type="range"
              min="0"
              max={targetAmount}
              step="20000"
              value={savedAmount}
              onChange={(e) => setSavedAmount(Number(e.target.value))}
            />
            <span className="mock-range-val">{savedAmount.toLocaleString()} Ks</span>
          </div>
        </div>

        <div className="mock-form-group">
          <label className="mock-label">Target Timeline</label>
          <div className="mock-stepper">
            <button
              type="button"
              aria-label="Decrease weeks"
              onClick={() => setWeeksRemaining((w) => Math.max(2, w - 1))}
            >
              -
            </button>
            <span>{weeksRemaining} weeks ({monthText})</span>
            <button
              type="button"
              aria-label="Increase weeks"
              onClick={() => setWeeksRemaining((w) => Math.min(24, w + 1))}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Resulting Weekly Pace Card */}
      <div className="mock-highlight-card">
        <div className="mock-highlight-card__label">Required Weekly Pace</div>
        <div className="mock-highlight-card__val">
          {weeklyTarget.toLocaleString()} Ks / week
        </div>
        <p className="mock-highlight-card__caption">
          Keep this balance in your wallet to maintain your pace and earn Wave Points weekly rewards.
        </p>
      </div>

      {/* Action Button */}
      <button
        type="button"
        className={`mock-primary-btn ${reminderSet ? 'is-success' : ''}`}
        onClick={() => setReminderSet((prev) => !prev)}
      >
        {reminderSet ? '✓ Reminder Active (Mondays)' : 'Set Weekly Balance Reminder'}
      </button>
    </div>
  )
}
