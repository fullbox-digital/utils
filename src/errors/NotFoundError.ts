export class NotFoundError extends Error {
  constructor () {
    super('Your client has issued a wrong request!')
  }
}
