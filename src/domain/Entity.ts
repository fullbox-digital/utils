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

  /**
   * @deprecated The method should not be used
   */
  getId (): string { return this.id.toString() }

  getIdentifier (): UniqueEntityId {
    return this.id
  }

  getProps (): T { return this.props }

  equals (entity?: Entity<T>): boolean {
    if (entity === null || entity === undefined) { return false }
    if (this === entity) { return true }
    if (!isEntity(entity)) { return false }
    return this.id.equals(entity.id)
  }

  protected update<R> (
    create: (props: T, id: UniqueEntityId) => R,
    params: Partial<T>
  ): R {
    return create(
      {
        ...this.props,
        ...params
      },
      this.id
    )
  }
}
