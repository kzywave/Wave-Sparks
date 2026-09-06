import React from 'react'

export const WhyMiniAppsSlide: React.FC = () => {
  const pillars = [
    {
      title: 'Existing Framework',
      tag: 'Zero New Infra',
      detail: 'The Mini App host is already live in WavePay. We can launch experiments immediately without building a new client runtime.',
    },
    {
      title: 'Smaller, Focused Scope',
      tag: 'Micro-Utilities',
      detail: 'Single-job tools solve specific customer friction (splitting a bill, checking safe runway) without bloating core wallet screens.',
    },
    {
      title: 'Less Core Dependency',
      tag: 'Independent Releases',
      detail: 'Experiments do not compete for core transaction backend roadmap or require full app store release approval cycles.',
    },
    {
      title: 'Faster Build/Test Loop',
      tag: 'Days, Not Quarters',
      detail: 'Prototypes can be accelerated with modern AI web tooling. We test voluntary adoption first before committing deep engineering.',
    },
  ]

  return (
    <div className="slide-canvas">
      <div className="slide-header-block">
        <div className="eyebrow">The Experimentation Layer</div>
        <h2 className="slide-main-title">We already have a low-dependency way to experiment.</h2>
        <p className="slide-sub-title">
          Mini Apps are not the customer problem; they are our fastest vehicle to validate customer utility and connect Wave services.
        </p>
      </div>

      <div className="four-grid">
        {pillars.map((p, idx) => (
          <div key={p.title} className="card-box card-box--pillar">
            <div className="card-box__badge-row">
              <span className="card-box__counter">0{idx + 1}</span>
              <span className="badge-subtle">{p.tag}</span>
            </div>
            <h3 className="card-box__title">{p.title}</h3>
            <p className="card-box__text">{p.detail}</p>
          </div>
        ))}
      </div>

      <div className="banner-rule">
        <div className="banner-rule__label">Guiding Product Principle</div>
        <div className="banner-rule__text">
          <strong>Solve the customer problem first.</strong> Integrate deeper into core payment rails only after the standalone utility proves repeat adoption.
        </div>
      </div>
    </div>
  )
}
