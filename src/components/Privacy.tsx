import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Shield } from 'lucide-react'

export const Privacy: React.FC = () => {
  return (
    <div className="privacy-page container">
      <header className="page-intro">
        <span className="eyebrow">
          <span className="eyebrow-dot" />
          Transparency & Trust
        </span>
        <h1>
          Privacy Policy & <br />
          <span className="gradient-text">Responsible AI Standards</span>
        </h1>
        <p>
          Effective Date: October 2026. At GenAI Technologies, data privacy and algorithmic responsibility are
          foundational architecture principles—not afterthoughts.
        </p>
      </header>

      <div className="privacy-layout">
        <aside className="privacy-sidebar">
          <div className="privacy-summary-card">
            <Shield size={24} className="text-purple-400" />
            <h3>Our Core AI Pledge</h3>
            <p>
              We <b>never</b> use your proprietary data, custom embeddings, or project conversations to train public or
              third-party AI foundation models without explicit contractual authorization.
            </p>
            <div className="privacy-quick-checks">
              <div><CheckCircle2 size={14} className="text-emerald-400" /> Zero public model training</div>
              <div><CheckCircle2 size={14} className="text-emerald-400" /> TLS 1.3 / AES-256 encryption</div>
              <div><CheckCircle2 size={14} className="text-emerald-400" /> Transparent telemetry</div>
              <div><CheckCircle2 size={14} className="text-emerald-400" /> Complete deletion upon request</div>
            </div>
          </div>
        </aside>

        <article className="privacy-content">
          <section className="privacy-section">
            <h2>1. Commitment to Responsible AI & Model Isolation</h2>
            <p>
              When collaborating with GenAI Technologies on AI prototypes, model fine-tuning, or production pipelines:
            </p>
            <ul>
              <li>
                <b>No Unauthorized Training:</b> Customer prompt inputs, retrieved documents, vector embeddings, and
                fine-tuning datasets remain isolated inside dedicated tenancy boundaries.
              </li>
              <li>
                <b>Zero-Data-Retention Agreements:</b> Where third-party foundation models (such as Anthropic Claude or
                OpenAI) are integrated, enterprise endpoints with zero-data-retention (ZDR) SLAs are enforced by default.
              </li>
              <li>
                <b>Explainability & Anti-Bias:</b> We audit automated ranking models and decision engines against
                algorithmic bias and demographic disparity.
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>2. Information We Collect Through Our Website</h2>
            <p>
              We maintain a minimal data footprint. The only personal information we collect directly is what you
              voluntarily provide via our contact and project inquiry forms:
            </p>
            <ul>
              <li>
                <b>Contact Information:</b> Your name, email address, and company affiliation (if provided).
              </li>
              <li>
                <b>Project Inquiries:</b> The technical requirements, topic of interest, and project message you share.
              </li>
              <li>
                <b>Standard Technical Logs:</b> IP address, browser user-agent, and request timestamps strictly for
                security diagnostics, DDoS mitigation, and rate limiting.
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>3. How Your Information Is Used</h2>
            <p>We use your information exclusively for:</p>
            <ul>
              <li>Directly responding to your technical inquiries and scoping project collaborations.</li>
              <li>Generating architectural estimates and technical proposals requested by you.</li>
              <li>Preventing malicious misuse, automated spam, and bot attacks against our infrastructure.</li>
            </ul>
            <p>
              We do not sell, rent, monetize, or broker personal information to any third parties or ad networks.
            </p>
          </section>

          <section className="privacy-section">
            <h2>4. Security Controls & Data Retention</h2>
            <p>
              All data in transit is encrypted using modern TLS 1.3 cipher suites. Data at rest is encrypted with
              industry-standard AES-256 algorithms. Contact inquiries are retained only for the duration of our business
              relationship or until you request their removal.
            </p>
          </section>

          <section className="privacy-section">
            <h2>5. Your Rights & Contact Information</h2>
            <p>
              Regardless of your jurisdiction, you have the right to request a copy of the personal data we hold about
              you, or to request its immediate and permanent deletion.
            </p>
            <p>
              To exercise these rights, please email us directly at{' '}
              <a href="mailto:privacy@genaitechnologies.com" className="text-link">
                privacy@genaitechnologies.com
              </a>{' '}
              or use our inquiry form.
            </p>
          </section>

          <div className="privacy-cta-box">
            <div>
              <h3>Have questions about our data safety standards?</h3>
              <p>We are happy to provide detailed security questionnaires, architecture reviews, and NDAs.</p>
            </div>
            <Link to="/contact" className="button">
              Reach out to our team <ArrowRight size={15} />
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}

export default Privacy
