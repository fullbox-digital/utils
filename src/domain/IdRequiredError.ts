export class IdRequiredError extends Error {
  constructor () {
    super('[Unique Entity Id] ID is required!')
    this.name = 'UniqueEntityIdError'
  }
}
