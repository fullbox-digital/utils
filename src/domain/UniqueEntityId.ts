import { v4 as uuid } from 'uuid'

import { IdRequiredError } from '..'
import { IdInvalidError } from '../errors/IdInvalidError'

export class UniqueEntityId {
  private readonly id: string

  constructor (id: string) {
    if (!id) { throw new IdRequiredError() }

    const regExp = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/
    if (!regExp.test(id)) { throw new IdInvalidError() }

    this.id = id
  }

  toString (): string { return this.id }

  equals (id?: UniqueEntityId): boolean {
    if (id === null || id === undefined) { return false }
    if (!(id instanceof this.constructor)) { return false }
    return id.toString() === this.id.toString()
  }

  static create (): UniqueEntityId { return new UniqueEntityId(uuid()) }
}
