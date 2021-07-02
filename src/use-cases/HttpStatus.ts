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
}
