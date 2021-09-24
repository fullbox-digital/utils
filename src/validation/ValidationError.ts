import { BusinessError } from '../errors/BusinessError'

export class ValidationError extends BusinessError {
  constructor (message: string | ValidationError[]) {
    super(typeof message === 'string' ? message : message.map(e => e.message).join(', '))
    this.name = 'ValidationError'
  }
}
