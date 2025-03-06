import { College, FormType } from '@entities'
import * as Joi from 'joi'

const addFormSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    college: Joi.string()
      .valid(...Object.values(College))
      .required(),
    type: Joi.string()
      .valid(...Object.values(FormType))
      .default('University'),
    description: Joi.string().required(),
    latitude: Joi.number().optional(),
    longitude: Joi.number().optional(),
    address: Joi.string().optional()
  })
}

export default {
  addFormSchema
}
