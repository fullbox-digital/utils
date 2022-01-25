import { AlertBody, HttpStatus, InfoBody, ResponseType, SuccessBody, WarningBody } from '..'

export abstract class HttpResponseMessage {
  static success = (message: string): HttpStatus => {
    return HttpStatus.ok<SuccessBody>({
      type: ResponseType.SUCCESS,
      message
    })
  }

  static warning = (message: string): HttpStatus => {
    return HttpStatus.ok<WarningBody>({
      type: ResponseType.WARNING,
      message
    })
  }

  static alert = (message: string): HttpStatus => {
    return HttpStatus.ok<AlertBody>({
      type: ResponseType.ALERT,
      message
    })
  }

  static info = (message: string): HttpStatus => {
    return HttpStatus.ok<InfoBody>({
      type: ResponseType.INFO,
      message
    })
  }
}
