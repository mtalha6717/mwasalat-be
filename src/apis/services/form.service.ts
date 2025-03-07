import { Form } from '@entities'
import { formRepository } from '@repositories'
import { v4 as uuidv4 } from 'uuid'
import { calculateDistance } from '../../helpers/distance'
import { sendConfirmationEmail } from '../../helpers/mail'
import axios from 'axios'

class FormService {
  async getAllForms(): Promise<Form[]> {
    return await formRepository.find({ order: { createdAt: 'DESC' } })
  }
  async addForm(formData: Partial<Form>): Promise<boolean> {
    const form = formRepository.create(formData)
    form.confirmationToken = uuidv4()
    const distance = calculateDistance(
      formData.userLatitude,
      formData.userLongitude,
      formData.collegeLatitude,
      formData.collegeLongitude
    )
    form.userDistanceFromCollege = distance
    const savedForm = await formRepository.save(form)

    await sendConfirmationEmail(formData.email, form.confirmationToken)
    if (formData?.phone) {
      await this.sendOtp(savedForm)
    }

    return true
  }

  async verifyEmail(token: string, email): Promise<void> {
    const form = await formRepository.findOne({ where: { confirmationToken: token, email } })
    if (!form) {
      throw new Error('Invalid or expired token')
    }
    form.isEmailVerified = true
    form.confirmationToken = null
    await formRepository.save(form)
  }

  async sendOtp(form: Form): Promise<number> {
    const phoneOtp = Math.floor(1000 + Math.random() * 9000)
    form.phoneOtp = phoneOtp
    await formRepository.save(form)

    if (!form.phone) {
      throw new Error('Phone number not provided')
    }

    const message = `Your OTP is ${phoneOtp}. Please do not share this OTP with anyone.`

    const data = {
      UserID: process.env.SMS_USER_ID_KEY,
      Password: process.env.SMS_USER_PASSWORD_KEY,
      Message: message,
      Language: '0',
      MobileNo: [form.phone.replace('+', '')],
      RecipientType: '1'
    }

    try {
      const response = await axios.post('https://ismartsms.net/RestApi/api/SMS/PostSMS', data, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      })
      console.log(response?.data?.Code === 1)
    } catch (error) {
      throw new Error('Failed to send OTP')
    }

    console.log(phoneOtp, 'phoneOtp')

    return phoneOtp
  }

  async verifyOtp(phone: string, otp: number): Promise<void> {
    const form = await formRepository.findOne({ where: { phone, phoneOtp: otp } })
    if (!form) {
      throw new Error('Invalid OTP')
    }
    form.isPhoneVerified = true
    form.phoneOtp = null
    await formRepository.save(form)
  }
}

export default new FormService()
