import { Form } from '@entities'
import { formRepository } from '@repositories'
import { v4 as uuidv4 } from 'uuid'
import { calculateDistance } from '../../helpers/distance'
import { sendConfirmationEmail } from '../../helpers/mail'

class FormService {
  async getAllForms(): Promise<Form[]> {
    return await formRepository.find({ order: { createdAt: 'DESC' } })
  }
  async addForm(formData: Partial<Form>): Promise<boolean> {
    let isEmailSent = false
    const form = formRepository.create(formData)
    form.confirmationToken = uuidv4()
    const savedForm = await formRepository.save(form)
    const distance = calculateDistance(
      formData.latitude,
      formData.longitude,
      Number(process.env.ORIGIN_LATITUDE), // Reference latitude
      Number(process.env.ORIGIN_LONGITUDE) // Reference longitude
    )

    if (distance <= Number(process.env.TRASHLOAD_DISTANCE_IN_KM)) {
      await sendConfirmationEmail(formData.email, form.confirmationToken)
      isEmailSent = true
    }

    return isEmailSent
  }

  async verifyEmail(token: string, email): Promise<void> {
    const form = await formRepository.findOne({ where: { confirmationToken: token, email } })
    if (!form) {
      throw new Error('Invalid or expired token')
    }
    form.isVerified = true
    form.confirmationToken = null
    await formRepository.save(form)
  }
}

export default new FormService()
