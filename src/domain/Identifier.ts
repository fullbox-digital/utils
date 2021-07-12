import { UniqueEntityId } from '..'

export type Identifier<T> = T & { id?: UniqueEntityId }
