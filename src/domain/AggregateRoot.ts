import { DomainEvent } from './DomainEvent'
import { EventStore } from './EventStore'
import { Entity } from './Entity'

export abstract class AggregateRoot<T> extends Entity<T> {
  private readonly domainEvents: DomainEvent[] = []

  getDomainEvents (): DomainEvent[] {
    return this.domainEvents
  }

  protected addDomainEvent (domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent)
    EventStore.markAggregateForDispatch(this)
  }

  clearEvents (): void {
    this.domainEvents.splice(0, this.domainEvents.length)
  }
}
