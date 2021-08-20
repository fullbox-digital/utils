import { DomainEvent } from './DomainEvent'
import { EventStore } from './EventStore'
import { Entity } from './Entity'

type Events<T> = Array<{ date: number } & T>

export abstract class AggregateRoot<T, E = unknown> extends Entity<T> {
  private readonly domainEvents: DomainEvent[] = []
  private readonly events: Events<E> = []

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

  getEvents (): E[] { return this.events }
}
