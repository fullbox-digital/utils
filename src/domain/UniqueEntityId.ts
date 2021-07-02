import { v4 as uuid } from 'uuid'
import { IdRequiredError } from './IdRequiredError'

export class UniqueEntityId {
  private readonly id: string

  constructor (id: string) {
    if (!id) { throw new IdRequiredError() }

    this.id = id
  }

  createId (): string { return uuid() }

  toString (): string { return this.id }

  equals (id?: UniqueEntityId): boolean {
    if (id === null || id === undefined) { return false }
    if (!(id instanceof this.constructor)) { return false }
    return id.toString() === this.id.toString()
  }
}
