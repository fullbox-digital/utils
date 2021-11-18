import { v4 as uuid } from 'uuid'

import { IdRequiredError } from '..'
import { IdInvalidError } from '../errors/IdInvalidError'

const regExp = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/

export class UniqueEntityId {
  private readonly id: string

  constructor (id: string) {
    if (!id) { throw new IdRequiredError() }

    if (!regExp.test(id)) { throw new IdInvalidError() }

    this.id = id
  }

  toString (): string { return this.id }

  equals (id?: UniqueEntityId | null | undefined): boolean {
    if (id === null || id === undefined) { return false }
    if (!(id instanceof this.constructor)) { return false }
    return id.toString() === this.id.toString()
  }

  static create (): UniqueEntityId { return new UniqueEntityId(uuid()) }

  static uniqueEntityIdOrNull (id?: string | null): UniqueEntityId | null {
    return id ? new UniqueEntityId(id) : null
  }

  static uniqueEntityIdOrThrow (id: string): UniqueEntityId {
    return new UniqueEntityId(id)
  }
}
