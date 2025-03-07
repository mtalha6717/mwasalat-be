import * as nodemailer from 'nodemailer'

export async function sendConfirmationEmail(email: string, token: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Confirmation Email',
    text: `Please confirm your email by clicking the link below:\n\n${process.env.FRONTEND_URL}/verify-email?token=${token}&email=${email}`
  }

  await transporter.sendMail(mailOptions)
}
