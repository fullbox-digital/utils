import { BusinessError } from '..'
import { ErrorBody } from './ErrorBody'
import { CreatedBody } from './CreatedBody'
import { HttpResponse } from './HttpResponse'

const bodyError = (status: number, errors: Error[]): HttpResponse<ErrorBody> => ({
  status,
  body: errors.map(err => ({ message: err.message }))
})

export abstract class HttpStatus {
  static ok = <T = never>(body?: T): HttpResponse<T> => ({ status: 200, body })
  static noContent = (): HttpResponse<never> => ({ status: 204 })
  static created = (body: CreatedBody): HttpResponse<CreatedBody> => ({ status: 201, body })

  static badRequest = (...errors: Error[]): HttpResponse<ErrorBody> => bodyError(400, errors)
  static unauthorized = (...errors: Error[]): HttpResponse<ErrorBody> => bodyError(401, errors)
  static paymentRequired = (...errors: Error[]): HttpResponse<ErrorBody> =>
    bodyError(402, errors)

  static forbidden = (...errors: Error[]): HttpResponse<ErrorBody> => bodyError(403, errors)
  static notFound = (...errors: Error[]): HttpResponse<ErrorBody> => bodyError(404, errors)
  static iamATeapot = (...errors: Error[]): HttpResponse<ErrorBody> => bodyError(418, errors)
  static unprocessableEntity = (...errors: Error[]): HttpResponse<ErrorBody> =>
    bodyError(422, errors)

  static serverError = (...errors: Error[]): HttpResponse<ErrorBody> => bodyError(500, errors)
  static serviceUnavailable = (...errors: Error[]): HttpResponse<ErrorBody> =>
    bodyError(503, errors)

  static makeErrorResponse = (...errors: Error[]): HttpResponse<ErrorBody> => {
    const isUnprocessableEntity = errors.some(error => error instanceof BusinessError)
    if (isUnprocessableEntity) {
      return HttpStatus.unprocessableEntity(...errors)
    }
    return HttpStatus.serverError(...errors)
  }
}
