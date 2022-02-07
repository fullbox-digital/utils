import { AlertBody, HttpResponse, HttpStatus, InfoBody, ResponseType, SuccessBody, WarningBody } from '..'

export abstract class HttpResponseMessage {
  static success = (message: string): HttpResponse<SuccessBody> => {
    return HttpStatus.ok<SuccessBody>({
      type: ResponseType.SUCCESS,
      message
    })
  }

  static warning = (message: string): HttpResponse<WarningBody> => {
    return HttpStatus.ok<WarningBody>({
      type: ResponseType.WARNING,
      message
    })
  }

  static alert = (message: string): HttpResponse<AlertBody> => {
    return HttpStatus.ok<AlertBody>({
      type: ResponseType.ALERT,
      message
    })
  }

  static info = (message: string): HttpResponse<InfoBody> => {
    return HttpStatus.ok<InfoBody>({
      type: ResponseType.INFO,
      message
    })
  }
}
