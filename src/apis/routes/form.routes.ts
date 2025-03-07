import { Router } from 'express'
import { utils } from '@helpers'
import { formController } from '@controllers'
import { formValidation } from '@validations'
import { formRateLimiter } from '../../middleware/rateLimiter'

const validate = utils.joiValidation
const router = Router()

router.get('/forms', formController.getAllForms.bind(formController))
router.post(
  '/forms',
  formRateLimiter,
  validate(formValidation.addFormSchema),
  formController.addForm.bind(formController)
)
router.get(
  '/verify-email',
  validate(formValidation.verifyEmail),
  formController.verifyEmail.bind(formController)
)
router.post(
  '/resend-otp',
  validate(formValidation.resendPhoneOtp),
  formController.resendOtp.bind(formController)
)
router.post(
  '/verify-otp',
  validate(formValidation.verifyPhoneOtp),
  formController.verifyOtp.bind(formController)
)

export default router
