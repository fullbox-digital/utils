import { BusinessError } from '..'

export class ValidationError extends BusinessError {
  constructor (message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}
