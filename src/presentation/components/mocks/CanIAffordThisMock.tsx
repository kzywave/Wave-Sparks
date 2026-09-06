import React, { useState } from 'react'

export const CanIAffordThisMock: React.FC = () => {
  const [balance, setBalance] = useState(450000)
  const [upcomingBills, setUpcomingBills] = useState(180000)
  const [purchaseCost, setPurchaseCost] = useState(120000)
  const [daysUntilPayday, setDaysUntilPayday] = useState(10)

  const remainingAfterBills = balance - upcomingBills
  const moneyLeftAfterPurchase = remainingAfterBills - purchaseCost
  const dailyRunway = Math.round(moneyLeftAfterPurchase / (daysUntilPayday || 1))

  let status: 'safe' | 'tight' | 'danger' = 'safe'
  let statusText = 'Comfortable Buffer'
  let advice = `You will have ${moneyLeftAfterPurchase.toLocaleString()} Ks left (${dailyRunway.toLocaleString()} Ks/day) for food and basics.`

  if (moneyLeftAfterPurchase < 0) {
    status = 'danger'
    statusText = 'Deficit Warning'
    advice = `This purchase will leave you ${Math.abs(moneyLeftAfterPurchase).toLocaleString()} Ks short of your upcoming commitments.`
  } else if (dailyRunway < 8000) {
    status = 'tight'
    statusText = 'Tight Runway'
    advice = `This purchase uses most flexible cash, leaving only ${dailyRunway.toLocaleString()} Ks/day before payday.`
  }

  return (
    <div className="mini-app-mock">
      {/* Mini App Header */}
      <div className="mini-app-mock__header">
        <div className="mini-app-mock__pill">Wave Mini App</div>
        <div className="mini-app-mock__title">Can I Afford This?</div>
        <p className="mini-app-mock__sub">Instant purchase runway check</p>
      </div>

      {/* Primary Result Card */}
      <div className={`mock-verdict-card mock-verdict-card--${status}`}>
        <div className="mock-verdict-card__status-row">
          <span className="mock-verdict-tag">{statusText}</span>
          <span className="mock-verdict-days">{daysUntilPayday} days to payday</span>
        </div>
        <div className="mock-verdict-card__amount">
          {moneyLeftAfterPurchase >= 0 ? `${moneyLeftAfterPurchase.toLocaleString()} Ks` : `-${Math.abs(moneyLeftAfterPurchase).toLocaleString()} Ks`}
        </div>
        <div className="mock-verdict-card__sublabel">Money left after purchase & bills</div>
        <p className="mock-verdict-card__advice">{advice}</p>

        <div className="mock-breakdown-row">
          <span>Net: {balance.toLocaleString()} - {upcomingBills.toLocaleString()} - {purchaseCost.toLocaleString()}</span>
          <strong>{moneyLeftAfterPurchase.toLocaleString()} Ks</strong>
        </div>
      </div>

      {/* Interactive Sliders */}
      <div className="mock-card">
        <div className="mock-form-group">
          <label className="mock-label">Current Available Balance (Ks)</label>
          <div className="mock-range-wrap">
            <input
              type="range"
              min="100000"
              max="1000000"
              step="25000"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
            />
            <span className="mock-range-val">{balance.toLocaleString()} Ks</span>
          </div>
        </div>

        <div className="mock-form-group">
          <label className="mock-label">Upcoming Bills Before Payday</label>
          <div className="mock-range-wrap">
            <input
              type="range"
              min="0"
              max="400000"
              step="10000"
              value={upcomingBills}
              onChange={(e) => setUpcomingBills(Number(e.target.value))}
            />
            <span className="mock-range-val">{upcomingBills.toLocaleString()} Ks</span>
          </div>
        </div>

        <div className="mock-form-group">
          <label className="mock-label">Cost of Item You Want to Buy</label>
          <div className="mock-range-wrap">
            <input
              type="range"
              min="10000"
              max="400000"
              step="5000"
              value={purchaseCost}
              onChange={(e) => setPurchaseCost(Number(e.target.value))}
            />
            <span className="mock-range-val">{purchaseCost.toLocaleString()} Ks</span>
          </div>
        </div>

        <div className="mock-form-group">
          <label className="mock-label">Days Until Next Income</label>
          <div className="mock-stepper">
            <button
              type="button"
              aria-label="Decrease days until payday"
              onClick={() => setDaysUntilPayday((d) => Math.max(1, d - 1))}
            >
              -
            </button>
            <span>{daysUntilPayday} days</span>
            <button
              type="button"
              aria-label="Increase days until payday"
              onClick={() => setDaysUntilPayday((d) => Math.min(30, d + 1))}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="mock-tip-card">
        <strong>Decision Tip:</strong> Never judge spend by today&apos;s balance alone. Always reserve money for upcoming fixed commitments first.
      </div>
    </div>
  )
}
