import { Router } from 'express'
import { utils } from '@helpers'
import { formController } from '@controllers'
import { formValidation } from '@validations'
import { formRateLimiter } from '../../middleware/rateLimiter'

const validate = utils.joiValidation
const router = Router()

router.get('/forms', formController.getAllForms.bind(formController))
router.post('/forms', formRateLimiter ,validate(formValidation.addFormSchema), formController.addForm.bind(formController))
router.get('/verify-email', formController.verifyEmail.bind(formController))

export default router
