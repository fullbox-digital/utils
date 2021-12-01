import { ResponseType } from '..'

export class Message {
  private readonly _message: string
  private readonly _type: ResponseType

  constructor (message: string, type: ResponseType) {
    this._message = message
    this._type = type
  }

  getMessage (): string {
    return this._message
  }

  getType (): ResponseType {
    return this._type
  }
}
