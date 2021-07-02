import { UniqueEntityId } from './UniqueEntityId'
import { v4 as uuid } from 'uuid'

export class Entity<T> {
  protected props: T
  protected id: UniqueEntityId

  constructor (props: T, id?: UniqueEntityId) {
    this.props = props
    this.id = id ?? new UniqueEntityId(uuid())
  }

  getId (): UniqueEntityId { return this.id }

  getProps (): T { return this.props }
}
