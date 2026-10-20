import { z } from 'zod'
import { Resend } from 'resend'

// Validation Schema with Zod
export const contactSubmissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(120, 'Name cannot exceed 120 characters'),
  email: z
    .string()
    .trim()
    .email('Please provide a valid email address'),
  topic: z
    .string()
    .trim()
    .min(1, 'Service area is required')
    .default('AI & machine learning'),
  message: z
    .string()
    .trim()
    .min(5, 'Message must be at least 5 characters')
    .max(5000, 'Message cannot exceed 5000 characters'),
  honeypot: z.string().optional().default(''),
})

export interface EmailConfirmationData {
  user_name: string
  user_email: string
  service_area: string
  reference_id: string
  support_email: string
  submitted_at?: string
}

export function renderConfirmationEmailText(data: EmailConfirmationData): string {
  const timeStr = data.submitted_at || new Date().toUTCString()
  return `Hello ${data.user_name},

Thank you for reaching out to GenAI Technologies. We have received your enquiry regarding ${data.service_area}.

============================================================
ENQUIRY DETAILS
============================================================
Reference ID:    ${data.reference_id}
Submitted Email: ${data.user_email}
Service Area:    ${data.service_area}
Submission Time: ${timeStr}
Status:          Under Engineering Review
Expected Review: Within 24–48 business hours

------------------------------------------------------------
WHAT HAPPENS NEXT?
------------------------------------------------------------
Our team is reviewing your project details, architecture questions, or technical requirements. A member of our engineering team will follow up directly at ${data.user_email} within 24–48 hours.

------------------------------------------------------------
DATA PRIVACY & RESPONSIBLE AI PLEDGE
------------------------------------------------------------
Your submission is protected under our strict data confidentiality policies. GenAI Technologies never shares, leases, or uses client inputs, proprietary concepts, or enquiry notes to train public or third-party AI models.

If you have urgent updates or additional documents to share, reply directly to this email or contact us at ${data.support_email} quoting Reference ID: ${data.reference_id}.

============================================================
GenAI Technologies — Intelligence into Impact
Website: https://genaitechnologies.com
Support: ${data.support_email}

© 2026 GenAI Technologies. All rights reserved.
Built for what comes next.`
}

export function renderConfirmationEmailHtml(data: EmailConfirmationData): string {
  const timeStr = data.submitted_at || new Date().toUTCString()
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark light" />
  <meta name="supported-color-schemes" content="dark light" />
  <title>We've received your enquiry [Ref: ${data.reference_id}]</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #070914; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; border-radius: 0 !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #070914; color: #f3f4ff; -webkit-font-smoothing: antialiased;">

  <div style="display: none; font-size: 1px; color: #070914; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
    Thank you ${data.user_name}. We've received your enquiry regarding ${data.service_area} (Reference: ${data.reference_id}).
    &#847; &zwnj; &nbsp; &#8199; &shy; &#847; &zwnj; &nbsp; &#8199; &shy;
  </div>

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #070914;">
    <tr>
      <td align="center" style="padding: 40px 16px 50px 16px;">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top" width="600">
        <![endif]-->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width: 600px; background-color: #0d1224; border: 1px solid rgba(160, 140, 255, 0.25); border-radius: 14px; overflow: hidden; box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);">
          
          <tr>
            <td height="4" style="background: linear-gradient(90deg, #9b7cff 0%, #69a7ff 50%, #5be5ff 100%); font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <tr>
            <td class="mobile-padding" style="padding: 32px 36px 20px 36px; border-bottom: 1px solid rgba(180, 190, 230, 0.08);">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="left" valign="middle">
                    <span style="font-size: 19px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                      <span style="color: #b9a3ff;">&#9670;</span> GenAI <span style="color: #a7acc4; font-weight: 400;">Technologies</span>
                    </span>
                  </td>
                  <td align="right" valign="middle">
                    <span style="font-size: 10px; font-weight: 700; color: #4ade80; background-color: rgba(34, 197, 94, 0.12); border: 1px solid rgba(34, 197, 94, 0.28); padding: 4px 8px; border-radius: 4px; letter-spacing: 0.5px; text-transform: uppercase;">
                      &#10003; Logged
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="mobile-padding" style="padding: 32px 36px 24px 36px;">
              <h1 style="margin: 0 0 16px 0; font-size: 24px; line-height: 32px; font-weight: 600; color: #ffffff; letter-spacing: -0.5px;">
                We've received your enquiry
              </h1>

              <p style="margin: 0 0 22px 0; font-size: 15px; line-height: 24px; color: #cbd5e1;">
                Hello <strong style="color: #ffffff;">${data.user_name}</strong>,
              </p>

              <p style="margin: 0 0 28px 0; font-size: 15px; line-height: 24px; color: #cbd5e1;">
                Thank you for contacting GenAI Technologies. Your project enquiry regarding <strong style="color: #c084fc;">${data.service_area}</strong> has been logged into our engineering triage queue.
              </p>

              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #070a16; border: 1px solid rgba(155, 124, 255, 0.25); border-radius: 10px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 20px;">
                    <div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">
                      Your Tracking Reference
                    </div>
                    <div style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-size: 20px; font-weight: 700; color: #60a5fa; letter-spacing: 1px; margin-bottom: 16px;">
                      ${data.reference_id}
                    </div>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid rgba(180, 190, 230, 0.08); padding-top: 12px;">
                      <tr>
                        <td align="left" style="font-size: 13px; color: #94a3b8; padding: 4px 0;">Submitted Email:</td>
                        <td align="right" style="font-size: 13px; color: #f1f5f9; padding: 4px 0; font-weight: 500;">${data.user_email}</td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size: 13px; color: #94a3b8; padding: 4px 0;">Category:</td>
                        <td align="right" style="font-size: 13px; color: #f1f5f9; padding: 4px 0; font-weight: 500;">${data.service_area}</td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size: 13px; color: #94a3b8; padding: 4px 0;">Submission Time:</td>
                        <td align="right" style="font-size: 13px; color: #f1f5f9; padding: 4px 0; font-weight: 500;">${timeStr}</td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size: 13px; color: #94a3b8; padding: 4px 0;">Expected Review:</td>
                        <td align="right" style="font-size: 13px; color: #4ade80; padding: 4px 0; font-weight: 600;">24–48 Business Hours</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <h2 style="margin: 0 0 14px 0; font-size: 16px; font-weight: 600; color: #f1f5f9; letter-spacing: -0.3px;">
                What happens next?
              </h2>

              <p style="margin: 0 0 28px 0; font-size: 14px; line-height: 22px; color: #94a3b8;">
                Our technical team is reviewing your project requirements and technical feasibility. You will receive a direct follow-up email at <strong style="color: #f1f5f9;">${data.user_email}</strong> within <strong style="color: #f1f5f9;">24 to 48 hours</strong> with recommended next steps or architectural scoping questions.
              </p>

              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: rgba(140, 105, 255, 0.06); border-left: 3px solid #9b7cff; border-radius: 4px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 14px 16px;">
                    <div style="font-size: 12px; font-weight: 700; color: #c084fc; margin-bottom: 4px;">
                      &#128274; Responsible AI &amp; Privacy Commitment
                    </div>
                    <div style="font-size: 12px; line-height: 18px; color: #a4abc4;">
                      We enforce zero public model training. Your proprietary concepts, inputs, and conversation notes are encrypted in transit and isolated from third-party AI datasets.
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 13px; line-height: 20px; color: #94a3b8;">
                Have questions or need to add files? Simply reply to this email or reach us directly at 
                <a href="mailto:${data.support_email}" style="color: #9b7cff; text-decoration: underline;">${data.support_email}</a> 
                quoting your Reference ID.
              </p>
            </td>
          </tr>

          <tr>
            <td class="mobile-padding" style="padding: 26px 36px 32px 36px; background-color: #060813; border-top: 1px solid rgba(180, 190, 230, 0.08); text-align: center;">
              <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 600; color: #cbd5e1;">
                GenAI Technologies
              </p>
              <p style="margin: 0 0 14px 0; font-size: 12px; color: #64748b; line-height: 18px;">
                Turning ambitious ideas into practical, intelligent technology.<br />
                Built for what comes next.
              </p>
              <p style="margin: 0 0 14px 0; font-size: 11px; color: #64748b;">
                <a href="https://genaitechnologies.com" style="color: #94a3b8; text-decoration: none; margin: 0 8px;">Website</a> &bull;
                <a href="https://genaitechnologies.com/privacy" style="color: #94a3b8; text-decoration: none; margin: 0 8px;">Privacy &amp; AI Ethics</a> &bull;
                <a href="mailto:${data.support_email}" style="color: #94a3b8; text-decoration: none; margin: 0 8px;">Support</a>
              </p>
              <p style="margin: 0; font-size: 11px; color: #475569;">
                &copy; 2026 GenAI Technologies. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td></tr></table>
        <![endif]-->
      </td>
    </tr>
  </table>

</body>
</html>`
}

async function parseRequestBody(req: any): Promise<any> {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body)
      } catch {
        return {}
      }
    }
    return req.body
  }
  return {}
}

export default async function handler(req: any, res: any) {
  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok', service: 'GenAI Contact Email API' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Please submit via POST.',
    })
  }

  try {
    // 1. Parse and Validate input with Zod
    const rawBody = await parseRequestBody(req)
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

    // 4. Resolve Resend API Key strictly from Environment Variables
    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      console.error('[API Configuration] RESEND_API_KEY is not defined in process.env.')
      return res.status(503).json({
        success: false,
        id: referenceId,
        error:
          'Server email service unconfigured: RESEND_API_KEY is missing from environment variables. Please add RESEND_API_KEY in your Vercel Dashboard (Settings → Environment Variables) and redeploy.',
      })
    }

    const resend = new Resend(resendApiKey)
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
    const adminEmail = 'genaiinformationprivatelimited@gmail.com'

    let emailSent = false
    let providerId: string | null = null
    let sandboxNotice: string | null = null

    // Attempt delivery directly to user's provided email address
    try {
      const sendResult = await resend.emails.send({
        from: fromAddress,
        to: [email],
        replyTo: supportEmail,
        subject: `We've received your enquiry [Ref: ${referenceId}]`,
        text: textBody,
        html: htmlBody,
      })

      if (sendResult.data?.id) {
        emailSent = true
        providerId = sendResult.data.id
      } else if (sendResult.error) {
        console.warn('[Resend Primary Dispatch Notice]', sendResult.error.message)

        // If Resend restricted to test domain (sandbox rule):
        // Automatically route lead notification to account owner so no enquiry is ever lost!
        if (
          sendResult.error.statusCode === 403 ||
          sendResult.error.message?.includes('only send testing emails to your own email address')
        ) {
          sandboxNotice =
            'Resend sandbox is active. Enquiry notification dispatched to team inbox (genaiinformationprivatelimited@gmail.com).'

          const leadNotificationHtml = `
            <div style="font-family: sans-serif; padding: 20px; background: #070914; color: #fff; border-radius: 8px;">
              <h2 style="color: #9b7cff;">New Website Enquiry Received</h2>
              <p><b>Reference ID:</b> ${referenceId}</p>
              <p><b>Client Name:</b> ${name}</p>
              <p><b>Client Email:</b> <a href="mailto:${email}" style="color: #60a5fa;">${email}</a></p>
              <p><b>Service Area:</b> ${topic}</p>
              <p><b>Timestamp:</b> ${submissionTime}</p>
              <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 16px 0;" />
              <p><b>Client Message:</b></p>
              <p style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; white-space: pre-wrap;">${message}</p>
              <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 16px 0;" />
              <p style="font-size: 11px; color: #888;">Notice: In Resend Sandbox mode (onboarding@resend.dev), emails are delivered to the account owner. Verify a custom domain at resend.com/domains to send confirmation emails directly to external visitors.</p>
            </div>
          `

          const fallbackResult = await resend.emails.send({
            from: fromAddress,
            to: [adminEmail],
            replyTo: email,
            subject: `[New Website Lead] ${name} (${topic}) [Ref: ${referenceId}]`,
            text: `New enquiry from ${name} (${email})\nTopic: ${topic}\nRef: ${referenceId}\n\nMessage:\n${message}`,
            html: leadNotificationHtml,
          })

          if (fallbackResult.data?.id) {
            emailSent = true
            providerId = fallbackResult.data.id
          }
        } else {
          console.error('[Resend Error]', sendResult.error)
        }
      }
    } catch (dispatchErr: any) {
      console.error('[Resend Dispatch Exception]', dispatchErr?.message || dispatchErr)
    }

    // 5. Optional Webhook dispatch
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
        console.warn('[Webhook Warning]', webhookErr)
      }
    }

    // 6. Return Clean Success JSON Response
    return res.status(200).json({
      success: true,
      id: referenceId,
      emailSent,
      messageId: providerId,
      recipient: email,
      actualRecipient: sandboxNotice ? adminEmail : email,
      isSandbox: Boolean(sandboxNotice),
      submittedAt: submissionTime,
      sandboxNotice,
      message: emailSent
        ? `Enquiry logged successfully. Confirmation email dispatched.`
        : `Enquiry logged successfully under Reference ID: ${referenceId}.`,
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
      error: `Server encountered an internal error while processing your enquiry: ${error?.message || 'Unknown error'}`,
    })
  }
}
