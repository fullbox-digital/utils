import { BusinessError } from '../domain/BusinessError'
import { Left } from '../railway/Either'
import { BodyError } from './BodyError'
import { CreatedBody } from './CreatedBody'
import { HttpResponse } from './HttpResponse'

export abstract class HttpStatus {
  static ok = <T = never>(body?: T): HttpResponse<T> => ({ status: 200, body })
  static noContent = (): HttpResponse<BodyError> => ({ status: 204 })
  static created = (body: CreatedBody): HttpResponse<CreatedBody> => ({ status: 201, body })

  static badRequest = (body: BodyError): HttpResponse<BodyError> => ({ status: 400, body })
  static unauthorized = (body: BodyError): HttpResponse<BodyError> => ({ status: 401, body })
  static paymentRequired = (body: BodyError): HttpResponse<BodyError> => ({ status: 402, body })
  static forbidden = (body: BodyError): HttpResponse<BodyError> => ({ status: 403, body })
  static notFound = (body: BodyError): HttpResponse<BodyError> => ({ status: 404, body })
  static iamATeapot = (body: BodyError): HttpResponse<BodyError> => ({ status: 418, body })
  static unprocessableEntity = (body: BodyError): HttpResponse<BodyError> => ({ status: 422, body })

  static serverError = (body: BodyError): HttpResponse<BodyError> => ({ status: 500, body })
  static serviceUnavailable = (body: BodyError): HttpResponse<BodyError> => ({ status: 503, body })

  static errorsFromLeft = (left: Left<Error | Error[], unknown>): HttpResponse<BodyError> => {
    const errors: Error[] = []

    const leftValue = left.getValue()
    if (Array.isArray(leftValue)) {
      errors.push(...leftValue)
    } else {
      errors.push(leftValue)
    }

    const errorsMessages: BodyError = {
      errors: errors.map(error => ({ message: error.message }))
    }

    const isUnprocessableEntity = errors.some(error => error instanceof BusinessError)
    if (isUnprocessableEntity) {
      return HttpStatus.unprocessableEntity(errorsMessages)
    }
    return HttpStatus.serverError(errorsMessages)
  }
}
