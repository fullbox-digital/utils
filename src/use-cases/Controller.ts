import { BodyError } from './BodyError'
import { CreatedBody } from './CreatedBody'
import { HttpResponse } from './HttpResponse'

export abstract class Controller<Request, Response> {
  ok = <T = never>(body: T): HttpResponse<T> => ({ status: 200, body })
  noContent = (): HttpResponse<BodyError> => ({ status: 204 })
  created = (body: CreatedBody): HttpResponse<CreatedBody> => ({ status: 201, body })

  badRequest = (body: BodyError): HttpResponse<BodyError> => ({ status: 400, body })
  unauthorized = (body: BodyError): HttpResponse<BodyError> => ({ status: 401, body })
  paymentRequired = (body: BodyError): HttpResponse<BodyError> => ({ status: 402, body })
  forbidden = (body: BodyError): HttpResponse<BodyError> => ({ status: 403, body })
  notFound = (body: BodyError): HttpResponse<BodyError> => ({ status: 404, body })
  iamATeapot = (body: BodyError): HttpResponse<BodyError> => ({ status: 418, body })
  unprocessableEntity = (body: BodyError): HttpResponse<BodyError> => ({ status: 422, body })

  serverError = (body: BodyError): HttpResponse<BodyError> => ({ status: 500, body })
  serviceUnavailable = (body: BodyError): HttpResponse<BodyError> => ({ status: 503, body })

  abstract handle: (request: Request) => Promise<HttpResponse<Response>>
}
