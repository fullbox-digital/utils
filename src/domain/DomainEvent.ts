import { UniqueEntityId } from './UniqueEntityId'

export interface DomainEvent {
  dateTimeOccurred: Date
  getAggregateId: () => UniqueEntityId
}
