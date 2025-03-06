import { Response } from 'express'

interface responseTypes {
  code: number
  success: boolean
  message: any
  data: any
  err: any
}

const responses: responseTypes = {
  code: 200,
  success: true,
  message: '',
  data: {},
  err: ''
}
// success response
const successResponse = (response: Response, message = 'DEFAULT', data = {}) => {
  const res = responses
  res.code = 200
  res.success = true
  res.message = message
  res.data = data
  res.err = ''
  return response.status(res.code).send(res)
}

const bufferResponse = (response: Response, buffer: any, type: string) => {
  response.writeHead(200, {
    'Content-Type': type,
    'Content-Length': buffer.length
  })
  response.end(buffer)
}

// insert operation success response
const insertResponse = (response: Response, message = 'DEFAULT', data = {}) => {
  const res = responses
  res.code = 201
  res.success = true
  res.message = message
  res.data = data
  res.err = ''
  return response.status(res.code).send(res)
}

// In valid request
// unauthorized user request
const invalidRequest = (response: Response, message = 'INVALID_REQ') => {
  const res = responses
  res.code = 401
  res.success = false
  res.message = message
  res.data = null
  res.err = message
  return response.status(res.code).send(res)
}

// In valid data
// values not match in database
const invalidData = (response: Response, message = 'INVALID_REQ') => {
  const res = responses
  res.code = 400
  res.success = false
  res.message = message
  res.err = message
  res.data = null
  return response.status(res.code).send(res)
}

const notFound = (response: Response, message = 'NOT_FOUND') => {
  const res = responses
  res.code = 404
  res.success = false
  res.message = message
  res.err = message
  res.data = null
  return response.status(res.code).send(res)
}

const notAvailable = (response: Response, message = 'NOT_AVAILABLE') => {
  const res = responses
  res.code = 403
  res.success = false
  res.message = message
  res.err = message
  res.data = null
  return response.status(res.code).send(res)
}

// internal server error
// code error
const failResponse = (response: Response, apiRef = '', err: any = {}) => {
  console.log(apiRef, err)
  const res = responses
  res.code = 500
  res.success = false
  res.message = 'Request fail'
  res.data = null
  res.err = err

  return response.status(res.code).send(res)
}

// validation error
const validationFailResponse = (response: Response, message: string, data: any, err: any) => {
  const res = responses
  res.code = 422
  res.success = false
  res.message = 'Validation failure'
  res.data = data
  res.err = err
  return response.status(res.code).send(res)
}

export default {
  successResponse,
  invalidRequest,
  notAvailable,
  invalidData,
  insertResponse,
  failResponse,
  notFound,
  validationFailResponse,
  bufferResponse
}
