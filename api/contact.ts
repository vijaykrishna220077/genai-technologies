// Serverless API route for contact form submission & automated confirmation email
// Compatible with Vercel Serverless Functions and Node.js runtimes

import {
  renderConfirmationEmailText,
  renderConfirmationEmailHtml,
  type EmailConfirmationData,
} from './templates/confirmationEmail'

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed. Use POST.' })
  }

  try {
    const { name, email, topic, message, honeypot } = req.body || {}

    // Honeypot spam check: if filled, quietly succeed to confound bots
    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Enquiry received.' })
    }

    // Input validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Please provide a valid name.' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' })
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({ success: false, message: 'Please provide a descriptive message (min 5 characters).' })
    }

    const submissionId = `GEN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    const supportEmail = process.env.SUPPORT_EMAIL || 'support@genaitechnologies.com'

    // Build template variables
    const emailData: EmailConfirmationData = {
      user_name: name.trim(),
      user_email: email.trim(),
      service_area: topic || 'General AI & Software Innovation',
      reference_id: submissionId,
      support_email: supportEmail,
    }

    const textBody = renderConfirmationEmailText(emailData)
    const htmlBody = renderConfirmationEmailHtml(emailData)

    // 1. Transactional Email Dispatch via Resend (if RESEND_API_KEY configured)
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      try {
        const fromAddress = process.env.RESEND_FROM_EMAIL || 'GenAI Technologies <notifications@genaitechnologies.com>'
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [email.trim()],
            reply_to: supportEmail,
            subject: `We've received your enquiry [Ref: ${submissionId}]`,
            text: textBody,
            html: htmlBody,
          }),
        })
      } catch (emailErr) {
        console.error('Failed to dispatch transactional email via Resend:', emailErr)
      }
    }

    // 2. Transactional Email Dispatch via SendGrid (if SENDGRID_API_KEY configured)
    const sendgridApiKey = process.env.SENDGRID_API_KEY
    if (sendgridApiKey && !resendApiKey) {
      try {
        const fromAddress = process.env.SENDGRID_FROM_EMAIL || 'hello@genaitechnologies.com'
        await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sendgridApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personalizations: [{ to: [{ email: email.trim() }] }],
            from: { email: fromAddress, name: 'GenAI Technologies' },
            reply_to: { email: supportEmail, name: 'GenAI Support' },
            subject: `We've received your enquiry [Ref: ${submissionId}]`,
            content: [
              { type: 'text/plain', value: textBody },
              { type: 'text/html', value: htmlBody },
            ],
          }),
        })
      } catch (sgErr) {
        console.error('Failed to dispatch transactional email via SendGrid:', sgErr)
      }
    }

    // 3. Optional Team Notification Webhook (Slack / Discord / Webhook)
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            submissionId,
            timestamp: new Date().toISOString(),
            name: name.trim(),
            email: email.trim(),
            topic: topic || 'General Enquiry',
            message: message.trim(),
          }),
        })
      } catch (webhookErr) {
        console.error('Webhook notification dispatch warning:', webhookErr)
      }
    }

    return res.status(200).json({
      success: true,
      submissionId,
      message: 'Your enquiry has been successfully logged. Our engineering team will review it shortly.',
      confirmationEmail: {
        to: email.trim(),
        referenceId: submissionId,
        textPreview: textBody,
        htmlPreview: htmlBody,
      },
    })
  } catch (error: any) {
    console.error('Contact API Error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error while processing your request. Please try again or reach out directly.',
    })
  }
}
