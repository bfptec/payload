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
    const fullName = fullNameField?.value || 'کاربر'
    const userEmail = userEmailField?.value

    if (!userEmail) {
      console.error('[ERROR] User email is missing in submission data.')
      return new Response(JSON.stringify({ error: 'User email is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const emailContent = submissionData.map((item: TItem) => `<br/><p>${item.value}</p>`).join('')
    console.log(emailContent, 'content array')

    const userEmailHTML = await generateEmailHTML({
      content: `<p>${`${fullName} سلام!`} به زودی با شما تماس خواهیم گرفت...</p>`,
      headline: 'درخواست شما را دریافت کردیم.',
    })
    await payload.sendEmail({
      from: 'no-reply@bfptec.ir',
      to: userEmail,
      subject: `عزیز درخواست شما به دستمان رسید. ${fullName}`,
      html: userEmailHTML,
    })
    console.log('[DEBUG] Email sent to user successfully.')

    const adminEmailHTML = await generateEmailHTML({
      content: emailContent,
      headline: 'ادمین عزیز درخواست جدید دریافت کردید.',
    })

    // Send email to admin accounts
    const adminEmails = ['info@bfptec.ir', 'amir.aryan.dv@gmail.com', 'mb.golabi@yahoo.com']
    await payload.sendEmail({
      from: 'no-reply@bfptec.ir',
      to: adminEmails.join(', '),
      subject: `درخواست جدید دریافت شد.`,
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
