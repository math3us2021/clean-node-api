import { badRequest, serverError } from '../helpers/http-helpers'
import { InvalidParamsError, MissingParamsError } from '../errors'
import { type EmailValidator, type Controller, type HttpRequest, type HttpResponse } from '../protocols'

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
