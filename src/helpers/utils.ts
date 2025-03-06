/* eslint-disable no-nested-ternary */
import { NextFunction } from 'express'

import apiResponse from './apiResponse'

const cleanObject = (obj) => {
  if (obj && typeof obj === 'object') {
    // eslint-disable-next-line no-restricted-syntax
    for (const k of Object.keys(obj)) {
      if (obj[k] === null) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete obj[k]
      } else if (typeof obj[k] === 'object') {
        cleanObject(obj[k])
      }
    }
  }
  return obj
}

const joiValidation = (schema: any) => {
  return (req: any, res: any, next: NextFunction) => {
    let isValid = true
    Object.keys(schema).forEach((key) => {
      // multiple error
      // schema[key].validate(req[key],{ abortEarly: false });
      const { error } = schema[key].validate(req[key], { abortEarly: false })
      if (error) {
        isValid = false
        // if (Array.isArray(details) && details.length && details[0].message) {
        const errorObj: any = {}
        const messages: string = 'validation fail'
        error.details.map(({ message, context }: any) => {
          const msg = message.replace(/['"]/g, '')
          // messages += msg;
          const obj: any = {}
          if (context && context.key) errorObj[context.key] = msg
          return obj
        })
        return apiResponse.validationFailResponse(res, messages, null, errorObj)
      }
      return null
    })
    if (isValid) {
      return next()
    }
    return null
  }
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) || /^[^\s@]+(\+[^\s@]+)?@[^\s@]+\.[^\s@]+$/.test(email)
}

function isJSON(str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

const getJsonParsedValue = (value) => {
  return isJSON(value) ? JSON.parse(value) : value
}

export default {
  joiValidation,
  cleanObject,
  isValidEmail,
  isJSON,
  getJsonParsedValue
}
