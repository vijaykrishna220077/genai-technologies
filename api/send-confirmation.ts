import { z } from 'zod'
import { Resend } from 'resend'
import {
  renderConfirmationEmailText,
  renderConfirmationEmailHtml,
  type EmailConfirmationData,
} from './templates/confirmationEmail.ts'

// Input validation schema with Zod
export const contactSubmissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(120, 'Name cannot exceed 120 characters'),
  email: z
    .string()
    .trim()
    .email('Please provide a valid email address (e.g., user@domain.com)'),
  topic: z
    .string()
    .trim()
    .min(1, 'Service area or topic is required')
    .default('AI & machine learning'),
  message: z
    .string()
    .trim()
    .min(5, 'Message must be at least 5 characters')
    .max(5000, 'Message cannot exceed 5000 characters'),
  honeypot: z.string().optional().default(''),
})

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>

export default async function handler(req: any, res: any) {
  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Please submit via POST.',
    })
  }

  try {
    // 1. Parse and Validate input with Zod
    const rawBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    const parseResult = contactSubmissionSchema.safeParse(rawBody)

    if (!parseResult.success) {
      const issueMessages = parseResult.error.issues
        .map(issue => issue.message)
        .join('. ')
      return res.status(400).json({
        success: false,
        error: issueMessages || 'Invalid submission data.',
      })
    }

    const { name, email, topic, message, honeypot } = parseResult.data

    // Silent handling for spam bots hitting honeypot trap
    if (honeypot && honeypot.trim().length > 0) {
      return res.status(200).json({
        success: true,
        id: `GEN-SPAM-${Date.now().toString(36).toUpperCase()}`,
        message: 'Enquiry received.',
      })
    }

    // 2. Generate Reference ID & Submission Timestamp
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase()
    const referenceId = `GEN-${Date.now().toString(36).toUpperCase()}-${randomSuffix}`
    const submissionTime = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'UTC',
    }).format(new Date()) + ' UTC'

    const supportEmail = process.env.SUPPORT_EMAIL || 'support@genaitechnologies.com'

    // 3. Render HTML & Plain-Text Email Templates
    const emailData: EmailConfirmationData = {
      user_name: name,
      user_email: email,
      service_area: topic,
      reference_id: referenceId,
      support_email: supportEmail,
      submitted_at: submissionTime,
    }

    const textBody = renderConfirmationEmailText(emailData)
    const htmlBody = renderConfirmationEmailHtml(emailData)

    // 4. Resolve Environment Variables & Dispatch Transactional Email
    const resendApiKey = process.env.RESEND_API_KEY
    const sendgridApiKey = process.env.SENDGRID_API_KEY

    // Enforce that at least one transactional email service is configured
    if (!resendApiKey && !sendgridApiKey) {
      console.error('[API Error] Neither RESEND_API_KEY nor SENDGRID_API_KEY is configured in process.env')
      return res.status(500).json({
        success: false,
        id: referenceId,
        error: 'Email service unconfigured: RESEND_API_KEY is missing from server environment variables. Please configure RESEND_API_KEY in your hosting dashboard.',
      })
    }

    let emailSent = false
    let providerId: string | null = null

    // Method A: Resend Transactional Dispatch
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey)
        // Default to Resend testing domain (onboarding@resend.dev) unless custom verified domain is provided
        const fromAddress = process.env.RESEND_FROM_EMAIL || 'GenAI Technologies <onboarding@resend.dev>'

        const { data: resendResult, error: resendError } = await resend.emails.send({
          from: fromAddress,
          to: [email],
          replyTo: supportEmail,
          subject: `We've received your enquiry [Ref: ${referenceId}]`,
          text: textBody,
          html: htmlBody,
        })

        if (resendError) {
          console.error('[Resend Error]', resendError)
          return res.status(502).json({
            success: false,
            id: referenceId,
            error: `Failed to dispatch confirmation email via Resend: ${resendError.message}`,
          })
        }

        emailSent = true
        providerId = resendResult?.id || null
      } catch (err: any) {
        console.error('[Resend Exception]', err)
        return res.status(502).json({
          success: false,
          id: referenceId,
          error: `Resend dispatch failed: ${err.message || 'Unknown network error'}`,
        })
      }
    }
    // Method B: SendGrid Fallback Dispatch
    else if (sendgridApiKey) {
      try {
        const sgFrom = process.env.SENDGRID_FROM_EMAIL || 'hello@genaitechnologies.com'
        const sgResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sendgridApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personalizations: [{ to: [{ email }] }],
            from: { email: sgFrom, name: 'GenAI Technologies' },
            reply_to: { email: supportEmail, name: 'GenAI Support' },
            subject: `We've received your enquiry [Ref: ${referenceId}]`,
            content: [
              { type: 'text/plain', value: textBody },
              { type: 'text/html', value: htmlBody },
            ],
          }),
        })

        if (!sgResponse.ok) {
          const errText = await sgResponse.text()
          console.error('[SendGrid Error]', sgResponse.status, errText)
          return res.status(502).json({
            success: false,
            id: referenceId,
            error: `SendGrid dispatch error (${sgResponse.status}): ${errText}`,
          })
        }

        emailSent = true
      } catch (sgErr: any) {
        console.error('[SendGrid Exception]', sgErr)
        return res.status(502).json({
          success: false,
          id: referenceId,
          error: `SendGrid dispatch failed: ${sgErr.message || 'Unknown error'}`,
        })
      }
    }

    // 5. Optional Internal Team Notification (Slack / Discord webhook)
    const teamWebhookUrl = process.env.CONTACT_WEBHOOK_URL
    if (teamWebhookUrl) {
      try {
        await fetch(teamWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            referenceId,
            timestamp: new Date().toISOString(),
            name,
            email,
            topic,
            message,
          }),
        })
      } catch (webhookErr) {
        console.warn('[Webhook Warning] Non-blocking alert failure:', webhookErr)
      }
    }

    // 6. Return Clean Success JSON Response
    return res.status(200).json({
      success: true,
      id: referenceId,
      emailSent,
      messageId: providerId,
      recipient: email,
      submittedAt: submissionTime,
      message: `Transactional confirmation email successfully dispatched to ${email}.`,
      confirmationEmail: {
        to: email,
        referenceId,
        textPreview: textBody,
        htmlPreview: htmlBody,
      },
    })
  } catch (error: any) {
    console.error('[Server Error in Contact Handler]', error)
    return res.status(500).json({
      success: false,
      error: `Server encountered an internal error while processing your enquiry: ${error.message || 'Unknown error'}`,
    })
  }
}
