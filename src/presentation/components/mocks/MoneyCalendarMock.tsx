import React, { useState } from 'react'

interface BillItem {
  id: string
  title: string
  category: string
  dueInDays: number
  amount: number
  paid: boolean
}

const INITIAL_BILLS: BillItem[] = [
  { id: '1', title: 'High-speed Fiber Internet', category: 'Utilities', dueInDays: 2, amount: 35000, paid: false },
  { id: '2', title: 'Apartment Rent Share', category: 'Housing', dueInDays: 6, amount: 350000, paid: false },
  { id: '3', title: 'Children School Fee', category: 'Education', dueInDays: 9, amount: 100000, paid: false },
  { id: '4', title: 'Family Telco Plan', category: 'Mobile', dueInDays: 12, amount: 30000, paid: false },
]

export const MoneyCalendarMock: React.FC = () => {
  const [bills, setBills] = useState<BillItem[]>(INITIAL_BILLS)
  const currentWalletBalance = 640000

  const togglePaid = (id: string) => {
    setBills((prev) =>
      prev.map((b) => (b.id === id ? { ...b, paid: !b.paid } : b))
    )
  }

  const addSampleBill = () => {
    const extraBills: BillItem[] = [
      { id: '5', title: 'Home Electricity Bill', category: 'Utilities', dueInDays: 4, amount: 45000, paid: false },
      { id: '6', title: 'Water Supply Utility', category: 'Utilities', dueInDays: 7, amount: 15000, paid: false },
    ]
    const nextBill = extraBills.find((eb) => !bills.some((b) => b.id === eb.id))
    if (nextBill) {
      setBills((prev) => [...prev, nextBill])
    }
  }

  const unpaidTotal = bills
    .filter((b) => !b.paid)
    .reduce((sum, b) => sum + b.amount, 0)

  const safeToSpend = Math.max(0, currentWalletBalance - unpaidTotal)
  const allExtrasAdded = bills.length >= 6

  return (
    <div className="mini-app-mock">
      <div className="mini-app-mock__header">
        <div className="mini-app-mock__pill">Wave Mini App</div>
        <div className="mini-app-mock__title">Money Calendar</div>
        <p className="mini-app-mock__sub">Upcoming commitments & safe balance</p>
      </div>

      {/* Summary Widget */}
      <div className="mock-card mock-card--featured">
        <div className="mock-stat-row">
          <div>
            <div className="mock-label">Needed Before Payday</div>
            <div className="mock-val text-warning">{unpaidTotal.toLocaleString()} Ks</div>
          </div>
          <div className="text-right">
            <div className="mock-label">Safe to Spend Now</div>
            <div className="mock-val text-success">{safeToSpend.toLocaleString()} Ks</div>
          </div>
        </div>
        <div className="mock-progress-track mt-2">
          <div
            className="mock-progress-fill"
            style={{ width: `${Math.min(100, Math.round((unpaidTotal / currentWalletBalance) * 100))}%` }}
          />
        </div>
        <p className="mock-card-caption">
          {bills.filter((b) => !b.paid).length} obligations due before next income cycle.
        </p>
      </div>

      {/* Bills List */}
      <div className="mock-bills-list">
        {bills.map((bill) => (
          <div
            key={bill.id}
            className={`mock-bill-row ${bill.paid ? 'is-paid' : ''}`}
            onClick={() => togglePaid(bill.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                togglePaid(bill.id)
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`${bill.title}, ${bill.amount.toLocaleString()} Ks, ${bill.paid ? 'paid' : 'unpaid'}`}
          >
            <div className="mock-bill-check" aria-hidden="true">
              {bill.paid ? '✓' : ''}
            </div>
            <div className="mock-bill-info">
              <div className="mock-bill-title">{bill.title}</div>
              <div className="mock-bill-meta">
                Due in {bill.dueInDays} days · {bill.category}
              </div>
            </div>
            <div className="mock-bill-amount">
              {bill.amount.toLocaleString()} Ks
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mock-primary-btn mt-2"
        onClick={addSampleBill}
        disabled={allExtrasAdded}
      >
        {allExtrasAdded ? '✓ All Tracked Commitments Loaded' : '+ Add Upcoming Commitment'}
      </button>
    </div>
  )
}
