import { UniqueEntityId } from './UniqueEntityId'

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity
}

export class Entity<T> {
  protected readonly props: T
  protected readonly id: UniqueEntityId

  constructor (props: T, id?: UniqueEntityId) {
    this.props = props
    this.id = id ?? UniqueEntityId.create()
  }

  getId (): string { return this.id.toString() }

  getProps (): T { return this.props }

  equals (entity?: Entity<T>): boolean {
    if (entity === null || entity === undefined) { return false }
    if (this === entity) { return true }
    if (!isEntity(entity)) { return false }
    return this.id.equals(entity.id)
  }
}
