import React from 'react'

export const TitleSlide: React.FC = () => {
  return (
    <div className="slide-canvas slide-canvas--title">
      <div className="slide-title-hero">
        <div className="badge-pill">Wave Money · Product Strategy</div>
        <h1 className="title-display">
          Small tools.<br />
          <span className="text-highlight">Connected value.</span>
        </h1>
        <p className="title-lead">
          Using Mini Apps to solve everyday money problems — while connecting what Wave already builds.
        </p>
      </div>

      <div className="title-pillars-grid">
        <div className="pillar-card">
          <div className="pillar-num">01</div>
          <div className="pillar-title">Real Customer Utility</div>
          <p className="pillar-desc">
            Focus on practical money decisions customers face daily before requiring complex wallet changes.
          </p>
        </div>

        <div className="pillar-card">
          <div className="pillar-num">02</div>
          <div className="pillar-title">Low-Dependency Speed</div>
          <p className="pillar-desc">
            Leverage the existing Mini App container to build, test, and learn with rapid AI prototypes.
          </p>
        </div>

        <div className="pillar-card">
          <div className="pillar-num">03</div>
          <div className="pillar-title">Connected Ecosystem</div>
          <p className="pillar-desc">
            Anchor Wave Points, balance retention, and promotions to meaningful personal customer goals.
          </p>
        </div>
      </div>

      <div className="title-footer-quote">
        &ldquo;If we removed the WavePay logo, would customers still find this useful?&rdquo;
      </div>
    </div>
  )
}
