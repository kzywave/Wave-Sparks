import React, { useState } from 'react'
import { LANDSCAPE_IDEAS } from '../presentationData'
import type { IdeaCategory } from '../types'

export const IdeaLandscapeSlide: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<IdeaCategory | 'All'>('All')

  const filteredIdeas = activeFilter === 'All'
    ? LANDSCAPE_IDEAS
    : LANDSCAPE_IDEAS.filter((i) => i.category === activeFilter)

  return (
    <div className="slide-canvas">
      <div className="slide-header-block">
        <div className="slide-header-flex">
          <div>
            <div className="eyebrow">Brainstorm Exploration</div>
            <h2 className="slide-main-title">Opportunity Landscape (15 Ideas)</h2>
            <p className="slide-sub-title">
              Everyday money opportunities mapped across three customer spaces. 5 shortlisted for first testing.
            </p>
          </div>
          {/* Category Filter Pills */}
          <div className="filter-pill-group">
            {(['All', 'Save & Plan', 'Spend & Share', 'Safety & Trust'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-pill ${activeFilter === cat ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
                <span className="filter-pill__count">
                  {cat === 'All' ? LANDSCAPE_IDEAS.length : LANDSCAPE_IDEAS.filter((i) => i.category === cat).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ideas Table */}
      <div className="landscape-table-container">
        <table className="landscape-table">
          <thead>
            <tr>
              <th className="landscape-col-title">Title</th>
              <th className="landscape-col-concept">Mini-app concept</th>
              <th className="landscape-col-dependency">Dependency</th>
            </tr>
          </thead>
          <tbody>
            {filteredIdeas.map((idea) => {
              const depClass = idea.dependency.toLowerCase().replace(' ', '-')
              return (
                <tr
                  key={idea.id}
                  className={`landscape-row ${idea.isRecommended ? 'landscape-row--recommended' : ''}`}
                >
                  <td className="landscape-cell-title">
                    <strong>{idea.name}</strong>
                  </td>
                  <td className="landscape-cell-concept">{idea.concept}</td>
                  <td className="landscape-cell-dependency">
                    <span className={`badge-dep badge-dep--${depClass}`}>
                      {idea.dependency}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="landscape-footer-bar">
        <div className="legend-group">
          <span className="legend-label">Build Dependency:</span>
          <span className="badge-dep badge-dep--very-low">Very Low (Client-only / mock)</span>
          <span className="badge-dep badge-dep--low">Low (Light storage/API)</span>
          <span className="badge-dep badge-dep--medium">Medium (Core integration)</span>
        </div>
        <div className="legend-note">
          Highlighted rows indicate the <strong>5 priority concepts</strong> for initial review.
        </div>
      </div>
    </div>
  )
}
