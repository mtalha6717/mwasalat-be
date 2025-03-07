import { Request, Response } from 'express'
import { apiResponse } from '@helpers'
import { formService } from '@services'
import { formRepository } from '@repositories'

class FormController {
  async getAllForms(req: Request, res: Response): Promise<Response> {
    try {
      const forms = await formService.getAllForms()
      return apiResponse.successResponse(res, 'Forms fetched successfully', forms)
    } catch (error) {
      return apiResponse.failResponse(res, '/forms', error.message)
    }
  }
  async addForm(req: Request, res: Response): Promise<Response> {
    try {
      const checkFormForEmail = await formRepository.findOne({ where: { email: req?.body?.email } })
      if (checkFormForEmail) {
        await formRepository.delete(checkFormForEmail)
      }
      const isEmailSent = await formService.addForm(req.body)
      return apiResponse.successResponse(res, 'Form added successfully', { isEmailSent })
    } catch (error) {
      return apiResponse.failResponse(res, '/forms', error.message)
    }
  }

  async verifyEmail(req: Request, res: Response): Promise<Response> {
    try {
      const { token, email } = req.query
      await formService.verifyEmail(token as string, email as string)
      return apiResponse.successResponse(res, 'Email verified successfully')
    } catch (error) {
      return apiResponse.failResponse(res, '/verify-email', error.message)
    }
  }

  async resendOtp(req: Request, res: Response): Promise<Response> {
    try {
      const { phone } = req.body
      const form = await formRepository.findOne({ where: { phone } })
      if (!form) {
        return apiResponse.invalidData(res, 'Phone number not found')
      }

      if (form.isPhoneVerified) {
        return apiResponse.invalidData(res, 'Phone number is already verified')
      }
      await formService.sendOtp(form)
      return apiResponse.successResponse(res, 'OTP resent successfully')
    } catch (error) {
      return apiResponse.failResponse(res, '/resend-otp', error.message)
    }
  }

  async verifyOtp(req: Request, res: Response): Promise<Response> {
    try {
      const { phone, otp } = req.body
      await formService.verifyOtp(phone, parseInt(otp, 10))
      return apiResponse.successResponse(res, 'OTP verified successfully')
    } catch (error) {
      return apiResponse.failResponse(res, '/verify-otp', error.message)
    }
  }
}

export default new FormController()
