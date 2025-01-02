import { generateEmailHTML } from '@/email/generateEmailHTML'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request) {
  const payload = await getPayload({ config })
  console.log('[DEBUG] Received request at POST /api/form-submissions')

  try {
    const body = await req.json() // Parse JSON body
    console.log('[DEBUG] Parsed request body:', body)

    const { form, submissionData } = body

    if (!form || !submissionData) {
      console.error('[ERROR] Missing required fields in request body.')
      return new Response(JSON.stringify({ error: 'Missing required fields.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    console.log(`[DEBUG] Preparing to send email for form: ${form}`)
    const emailHTML = await generateEmailHTML({
      content: submissionData,
      headline: 'New Form Submission!',
    })

    if (typeof emailHTML !== 'string') {
      console.error('[ERROR] generateEmailHTML did not return a string:', emailHTML)
      return new Response(JSON.stringify({ error: 'Error generating email content.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    await payload.sendEmail({
      from: 'no-reply@bfptec.ir',
      to: 'dee.bayer76@ethereal.email ',
      subject: `New Submission for Form: ${form}`,
      html: emailHTML,
    })

    console.log('[DEBUG] Email sent successfully.')

    return new Response(JSON.stringify({ message: 'Submission received and email sent.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('[ERROR] Error occurred during form submission or email sending:', error)

    return new Response(JSON.stringify({ error: 'Failed to process submission or send email.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
