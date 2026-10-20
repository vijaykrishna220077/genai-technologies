import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Sparkles, X } from 'lucide-react'
import type { ProjectItem } from '../data/projectsData'
import { KisanAlertMockup, TalentMatchMockup, CognitiveFlowMockup } from './ProjectMockups'

interface ProjectDetailModalProps {
  project: ProjectItem | null
  onClose: () => void
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (project) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  const renderMockup = () => {
    switch (project.id) {
      case 'kisan-alert':
        return <KisanAlertMockup />
      case 'talent-match':
        return <TalentMatchMockup />
      case 'cognitive-flow':
        return <CognitiveFlowMockup />
      default:
        return null
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="eyebrow" style={{ color: project.accentColor }}>
              <span className="eyebrow-dot" style={{ background: project.accentColor, boxShadow: `0 0 10px ${project.accentColor}` }} />
              {project.category}
            </span>
            <h2>{project.title}</h2>
            <p className="modal-tagline">{project.tagline}</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body">
          {/* Interactive Live Mockup Showcase */}
          <div className="modal-showcase-wrap">
            <div className="showcase-label">
              <Sparkles size={14} />
              <span>Interactive System Interface & Architecture Visualizer</span>
            </div>
            {renderMockup()}
          </div>

          {/* Key Metrics Grid */}
          <div className="modal-metrics-grid">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="modal-metric-card">
                <span className="metric-val" style={{ color: project.accentColor }}>{m.value}</span>
                <span className="metric-lbl">{m.label}</span>
                {m.subtext && <span className="metric-sub">{m.subtext}</span>}
              </div>
            ))}
          </div>

          {/* Problem & Solution Breakdown */}
          <div className="modal-two-col">
            <div className="modal-text-block">
              <h3>The Challenge</h3>
              <p>{project.problemStatement}</p>
            </div>
            <div className="modal-text-block">
              <h3>Our Architecture</h3>
              <p>{project.architectureDetails}</p>
            </div>
          </div>

          {/* Key Technical Features */}
          <div className="modal-features-section">
            <h3>Technical Innovations & Capabilities</h3>
            <ul className="modal-feature-list">
              {project.keyFeatures.map((f, i) => (
                <li key={i}>
                  <Check size={16} style={{ color: project.accentColor }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Categorized Badges */}
          <div className="modal-tech-section">
            <h3>Full Technology Stack</h3>
            <div className="modal-tech-tags">
              {project.technologies.map((t, i) => (
                <div key={i} className="tech-badge">
                  <span className="tech-cat">{t.category}</span>
                  <span className="tech-name">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer / Action CTA */}
        <div className="modal-footer">
          <div className="modal-footer-note">
            <span>Status: <b>{project.status}</b></span>
          </div>
          <div className="modal-footer-actions">
            <button className="button button-quiet" onClick={onClose}>
              Close
            </button>
            <Link
              to={`/contact?topic=${encodeURIComponent(project.title)}`}
              onClick={onClose}
              className="button"
            >
              Discuss This Architecture <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProjectDetailModal
