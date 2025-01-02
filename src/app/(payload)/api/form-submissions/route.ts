import { generateEmailHTML } from '@/email/generateEmailHTML'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request) {
  const payload = await getPayload({ config })
  console.log('[DEBUG] Received request at POST /api/form-submissions')

  try {
    const body = await req.json()
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

    type TItem = { field: string; value: String }
    const fullNameField = submissionData.find((item: TItem) => item.field === 'full-name')
    const userEmailField = submissionData.find((item: TItem) => item.field === 'email')
    const fullName = fullNameField?.value || 'User'
    const userEmail = userEmailField?.value

    if (!userEmail) {
      console.error('[ERROR] User email is missing in submission data.')
      return new Response(JSON.stringify({ error: 'User email is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Send email to the user
    const userEmailHTML = await generateEmailHTML({
      content: submissionData,
      headline: `Thank you for your submission, ${fullName}!`,
    })
    await payload.sendEmail({
      from: 'no-reply@bfptec.ir',
      to: userEmail,
      subject: `Dear ${fullName}, Thank you for your submission`,
      html: userEmailHTML,
    })
    console.log('[DEBUG] Email sent to user successfully.')

    const adminEmailHTML = await generateEmailHTML({
      content: submissionData,
      headline: 'New Form Submission Received',
    })

    // Send email to admin accounts
    const adminEmails = ['info@bfptec.ir', 'amir.aryan.dv@gmail.com', 'mb.golabi@gmail.com']
    await payload.sendEmail({
      from: 'no-reply@bfptec.ir',
      to: adminEmails.join(', '),
      subject: `Received New Form Submission`,
      html: adminEmailHTML,
    })
    console.log('[DEBUG] Email sent to admin accounts successfully.')

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
