import React from 'react'
import { HOMEWORK_SUMMARY } from '../presentationData'

export const RecommendationSlide: React.FC = () => {
  return (
    <div className="slide-canvas">
      <div className="slide-header-block">
        <div className="eyebrow">Action Plan & Homework Synthesis</div>
        <h2 className="slide-main-title">Start small. Connect what already exists.</h2>
        <p className="slide-sub-title">
          A clear two-phase testing sequence, followed by direct answers to the product evaluation criteria.
        </p>
      </div>

      {/* Phased Roadmap Sequence */}
      <div className="roadmap-grid">
        {/* Phase 1 Priority Box */}
        <div className="roadmap-card roadmap-card--priority">
          <div className="roadmap-card__tag">Phase 1 · Immediate Prototyping</div>
          <h3 className="roadmap-card__title">Top 2 Low-Dependency Pilots</h3>
          <div className="pilots-list">
            <div className="pilot-item">
              <span className="pilot-name">1. Save for Something</span>
              <span className="badge-dep badge-dep--very-low">Very Low Dep</span>
              <p className="pilot-why">
                Tests goal-based balance retention and creates an immediate personal use case for Wave Points qualification.
              </p>
            </div>
            <div className="pilot-item">
              <span className="pilot-name">2. Can I Afford This?</span>
              <span className="badge-dep badge-dep--very-low">Very Low Dep</span>
              <p className="pilot-why">
                Solves high-frequency purchase uncertainty and drives repeat opens at critical moments of spend intent.
              </p>
            </div>
          </div>
          <div className="roadmap-card__footer">
            <strong>Why first:</strong> Zero core wallet backend dependency. Can be prototyped and user-tested with AI within 2 weeks.
          </div>
        </div>

        {/* Phase 2 Box */}
        <div className="roadmap-card">
          <div className="roadmap-card__tag">Phase 2 · Secondary Sequence</div>
          <h3 className="roadmap-card__title">3 Follow-up Utilities</h3>
          <div className="pilots-list">
            <div className="pilot-item">
              <span className="pilot-name">3. Money Calendar</span>
              <span className="badge-dep badge-dep--low">Low Dep</span>
              <p className="pilot-why">Pre-payday bill planning and future gateway to automated bill settlement.</p>
            </div>
            <div className="pilot-item">
              <span className="pilot-name">4. Split It</span>
              <span className="badge-dep badge-dep--very-low">Very Low Dep</span>
              <p className="pilot-why">Social bill division with viral P2P money request distribution.</p>
            </div>
            <div className="pilot-item">
              <span className="pilot-name">5. My Money Health Check</span>
              <span className="badge-dep badge-dep--very-low">Very Low Dep</span>
              <p className="pilot-why">Personalized financial assessment routing users into relevant Wave tools.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Homework Summary Cards */}
      <div className="homework-container">
        <h4 className="homework-heading">Summary Answers to Product Evaluation Questions</h4>
        <div className="homework-grid">
          {HOMEWORK_SUMMARY.map((hw) => (
            <div key={hw.question} className="homework-item">
              <div className="homework-q">{hw.question}</div>
              <div className="homework-a">{hw.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
