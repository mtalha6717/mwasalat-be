import { College, FormType } from '@entities'
import * as Joi from 'joi'

const addFormSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    college: Joi.string().required(),
    type: Joi.string()
      .valid(...Object.values(FormType))
      .default('University'),
    userLatitude: Joi.number().optional(),
    userLongitude: Joi.number().optional(),
    collegeLatitude: Joi.number().optional(),
    collegeLongitude: Joi.number().optional(),
    address: Joi.string().optional()
  })
}

export default {
  addFormSchema
}
