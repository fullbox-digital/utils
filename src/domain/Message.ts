import { ResponseType } from '..'

export class Message {
  private readonly message: string
  private readonly type: ResponseType

  constructor (message: string, type: ResponseType) {
    this.message = message
    this.type = type
  }

  getMessage (): string {
    return this.message
  }

  getType (): ResponseType {
    return this.type
  }
}
