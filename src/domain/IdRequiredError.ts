import { Exception } from './Exception'

export class IdRequiredError extends Exception {
  constructor () {
    super('[Unique Entity Id] ID is required!')
    this.name = 'UniqueEntityIdError'
  }
}
