import React, { useState } from 'react'
import { Check, Copy, Mail, Monitor, Smartphone, X } from 'lucide-react'
import {
  renderConfirmationEmailHtml,
  renderConfirmationEmailText,
  type EmailConfirmationData,
} from '../utils/confirmationEmail'

interface EmailPreviewModalProps {
  data: EmailConfirmationData
  onClose: () => void
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({ data, onClose }) => {
  const [tab, setTab] = useState<'html' | 'text'>('html')
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [copied, setCopied] = useState(false)

  const htmlContent = renderConfirmationEmailHtml(data)
  const textContent = renderConfirmationEmailText(data)

  const handleCopy = () => {
    navigator.clipboard.writeText(tab === 'html' ? htmlContent : textContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-container email-preview-modal"
        onClick={e => e.stopPropagation()}
        style={{ width: 'min(760px, 95vw)', height: '88vh' }}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <span className="eyebrow">
              <Mail size={12} /> Transactional Confirmation Email
            </span>
            <h2 style={{ fontSize: '20px', margin: '4px 0' }}>Enquiry Confirmation Preview</h2>
            <p className="modal-tagline">
              Sent to <b>{data.user_email}</b> • Ref: <span className="font-mono">{data.reference_id}</span>
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close preview">
            <X size={18} />
          </button>
        </div>

        {/* Action Controls Bar */}
        <div className="email-preview-controls-bar">
          <div className="email-tab-group">
            <button
              type="button"
              className={`email-tab-btn ${tab === 'html' ? 'active' : ''}`}
              onClick={() => setTab('html')}
            >
              Rich HTML Email
            </button>
            <button
              type="button"
              className={`email-tab-btn ${tab === 'text' ? 'active' : ''}`}
              onClick={() => setTab('text')}
            >
              Plain-Text (text/plain)
            </button>
          </div>

          <div className="email-view-controls">
            {tab === 'html' && (
              <div className="view-toggle-wrap">
                <button
                  type="button"
                  className={`view-toggle-btn ${viewMode === 'desktop' ? 'active' : ''}`}
                  onClick={() => setViewMode('desktop')}
                  title="Desktop View (600px)"
                >
                  <Monitor size={14} />
                </button>
                <button
                  type="button"
                  className={`view-toggle-btn ${viewMode === 'mobile' ? 'active' : ''}`}
                  onClick={() => setViewMode('mobile')}
                  title="Mobile View (360px)"
                >
                  <Smartphone size={14} />
                </button>
              </div>
            )}

            <button type="button" className="button button-small" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check size={13} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={13} /> Copy {tab === 'html' ? 'HTML' : 'Text'}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body email-preview-body" style={{ padding: '0', background: '#050711' }}>
          {tab === 'html' ? (
            <div
              className="email-iframe-wrapper"
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '20px',
                height: '100%',
                background: '#04060f',
              }}
            >
              <iframe
                title="HTML Email Preview"
                srcDoc={htmlContent}
                style={{
                  width: viewMode === 'mobile' ? '375px' : '620px',
                  height: '100%',
                  minHeight: '520px',
                  border: '1px solid rgba(160, 175, 230, 0.2)',
                  borderRadius: '10px',
                  background: '#070914',
                  transition: 'width 0.25s ease',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                }}
              />
            </div>
          ) : (
            <pre
              style={{
                padding: '24px',
                margin: 0,
                fontFamily: 'SFMono-Regular, Consolas, Monaco, monospace',
                fontSize: '12px',
                lineHeight: '1.7',
                color: '#cbd5e1',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {textContent}
            </pre>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ padding: '12px 24px' }}>
          <span style={{ fontSize: '11px', color: '#64748b' }}>
            Template verified compatible with Resend, SendGrid, Postmark & AWS SES.
          </span>
          <button className="button button-quiet" onClick={onClose}>
            Close Preview
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmailPreviewModal
