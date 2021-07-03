import { BusinessError } from '../domain/BusinessError'
import { ErrorMessage } from './ErrorMessage'
import { CreatedBody } from './CreatedBody'
import { HttpResponse } from './HttpResponse'

const bodyError = (status: number, errors: Error[]): HttpResponse<ErrorMessage[]> => ({
  status,
  body: errors.map(err => ({ message: err.message }))
})

export abstract class HttpStatus {
  static ok = <T = never>(body?: T): HttpResponse<T> => ({ status: 200, body })
  static noContent = (): HttpResponse<never> => ({ status: 204 })
  static created = (body: CreatedBody): HttpResponse<CreatedBody> => ({ status: 201, body })

  static badRequest = (...errors: Error[]): HttpResponse<ErrorMessage[]> => bodyError(400, errors)
  static unauthorized = (...errors: Error[]): HttpResponse<ErrorMessage[]> => bodyError(401, errors)
  static paymentRequired = (...errors: Error[]): HttpResponse<ErrorMessage[]> =>
    bodyError(402, errors)

  static forbidden = (...errors: Error[]): HttpResponse<ErrorMessage[]> => bodyError(403, errors)
  static notFound = (...errors: Error[]): HttpResponse<ErrorMessage[]> => bodyError(404, errors)
  static iamATeapot = (...errors: Error[]): HttpResponse<ErrorMessage[]> => bodyError(418, errors)
  static unprocessableEntity = (...errors: Error[]): HttpResponse<ErrorMessage[]> =>
    bodyError(422, errors)

  static serverError = (...errors: Error[]): HttpResponse<ErrorMessage[]> => bodyError(500, errors)
  static serviceUnavailable = (...errors: Error[]): HttpResponse<ErrorMessage[]> =>
    bodyError(503, errors)

  static getResponseFromErrors = (errors: Error[]): HttpResponse<ErrorMessage[]> => {
    const isUnprocessableEntity = errors.some(error => error instanceof BusinessError)
    if (isUnprocessableEntity) {
      return HttpStatus.unprocessableEntity(...errors)
    }
    return HttpStatus.serverError(...errors)
  }
}
