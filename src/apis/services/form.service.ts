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
}

export default new FormService()
