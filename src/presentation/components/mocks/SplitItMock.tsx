import React, { useState } from 'react'

export const SplitItMock: React.FC = () => {
  const [billTotal, setBillTotal] = useState(180000)
  const [peopleCount, setPeopleCount] = useState(4)
  const [includeService, setIncludeService] = useState(true)
  const [linkCopied, setLinkCopied] = useState(false)

  const effectiveTotal = includeService ? Math.round(billTotal * 1.05) : billTotal
  const perPerson = Math.ceil(effectiveTotal / (peopleCount || 1))

  const handleCopyLink = () => {
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2500)
  }

  return (
    <div className="mini-app-mock">
      <div className="mini-app-mock__header">
        <div className="mini-app-mock__pill">Wave Mini App</div>
        <div className="mini-app-mock__title">Split It</div>
        <p className="mini-app-mock__sub">Fair group bill division & P2P links</p>
      </div>

      {/* Hero Result */}
      <div className="mock-card mock-card--featured text-center">
        <div className="mock-label">Each Person Pays</div>
        <div className="mock-val mock-val--xl">{perPerson.toLocaleString()} Ks</div>
        <p className="mock-card-caption">
          Total: {effectiveTotal.toLocaleString()} Ks across {peopleCount} people
          {includeService && ' (incl. 5% service)'}
        </p>
      </div>

      {/* Interactive Controls */}
      <div className="mock-card">
        <div className="mock-form-group">
          <label className="mock-label">Total Bill Amount (Ks)</label>
          <div className="mock-range-wrap">
            <input
              type="range"
              min="20000"
              max="500000"
              step="10000"
              value={billTotal}
              onChange={(e) => setBillTotal(Number(e.target.value))}
            />
            <span className="mock-range-val">{billTotal.toLocaleString()} Ks</span>
          </div>
        </div>

        <div className="mock-form-group">
          <label className="mock-label">Number of People</label>
          <div className="mock-stepper">
            <button
              type="button"
              aria-label="Decrease number of people"
              onClick={() => setPeopleCount((p) => Math.max(2, p - 1))}
            >
              -
            </button>
            <span className="font-bold">{peopleCount} people</span>
            <button
              type="button"
              aria-label="Increase number of people"
              onClick={() => setPeopleCount((p) => Math.min(12, p + 1))}
            >
              +
            </button>
          </div>
        </div>

        <label className="mock-toggle-row">
          <span>Include 5% service charge</span>
          <input
            type="checkbox"
            checked={includeService}
            onChange={(e) => setIncludeService(e.target.checked)}
          />
        </label>
      </div>

      {/* Share Actions */}
      <button
        type="button"
        className={`mock-primary-btn ${linkCopied ? 'is-success' : ''}`}
        onClick={handleCopyLink}
      >
        {linkCopied ? '✓ WavePay Link Copied!' : 'Generate WavePay Money Request Link'}
      </button>
    </div>
  )
}
