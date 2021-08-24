import { DomainEvent } from './DomainEvent'
import { EventStore } from './EventStore'
import { Entity } from './Entity'
import { UniqueEntityId } from './UniqueEntityId'

export type Events<T> = Array<{ date: number } & T>

export abstract class AggregateRoot<T, E = unknown> extends Entity<T> {
  private readonly domainEvents: DomainEvent[] = []
  private readonly events: Events<E> = []

  constructor (props: T, id?: UniqueEntityId, events?: Events<E>) {
    super(props, id)
    this.events = events ?? []
  }

  getDomainEvents (): DomainEvent[] {
    return this.domainEvents
  }

  protected addDomainEvent (domainEvent: DomainEvent, event?: E): void {
    this.domainEvents.push(domainEvent)
    if (event) {
      this.events.push({
        date: domainEvent.dateTimeOccurred.getTime(),
        ...event
      })
    }
    EventStore.markAggregateForDispatch(this)
  }

  clearEvents (): void {
    this.domainEvents.splice(0, this.domainEvents.length)
  }

  getEvents (): Events<E> { return this.events }
}
