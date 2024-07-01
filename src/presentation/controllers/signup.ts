import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { MissingParamsError } from '../errors/missing-params-error'
import { badRequest, serverError } from '../helpers/http-helpers'
import { type Controller } from '../protocols/controller'
import { type EmailValidator } from '../protocols/email-validator'
import { InvalidParamsError } from '../errors/invalid-params-error'

export class SingUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredField = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email as string)
      if (!isValid) {
        return badRequest(new InvalidParamsError('email'))
      }
      return {
        statusCode: 200,
        body: 'Success'
      }
    } catch (error) {
      return serverError()
    }
  }
}
