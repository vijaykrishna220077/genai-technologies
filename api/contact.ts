// Serverless API route for contact form submission
// Compatible with Vercel Serverless Functions and Node.js runtimes

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

    // If an external webhook (e.g. Slack/Discord/Formspree/Resend) is provided via env, dispatch it:
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
            message: message.trim()
          })
        })
      } catch (webhookErr) {
        console.error('Webhook notification dispatch warning:', webhookErr)
      }
    }

    return res.status(200).json({
      success: true,
      submissionId,
      message: 'Your enquiry has been successfully logged. Our engineering team will review it shortly.'
    })
  } catch (error: any) {
    console.error('Contact API Error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error while processing your request. Please try again or reach out directly.'
    })
  }
}
