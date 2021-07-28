export class IdInvalidError extends Error {
  constructor () {
    super('[Unique Entity Id] ID is invalid!')
    this.name = 'IdInvalidError'
  }
}
