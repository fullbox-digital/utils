import { DomainEvent } from './DomainEvent'
import { EventStore } from './EventStore'
import { Entity } from './Entity'
import { UniqueEntityId } from './UniqueEntityId'

export type Logs<T> = Array<{ date: number } & T>

export abstract class AggregateRoot<T, E = unknown> extends Entity<T> {
  private readonly domainEvents: DomainEvent[] = []
  private readonly logs: Logs<E> = []

  constructor (props: T, id?: UniqueEntityId, logs?: Logs<E>) {
    super(props, id)
    this.logs = logs ?? []
  }

  getDomainEvents (): DomainEvent[] {
    return this.domainEvents
  }

  protected addDomainEvent (domainEvent: DomainEvent, log?: E): void {
    this.domainEvents.push(domainEvent)
    if (log) {
      this.logs.push({
        date: domainEvent.dateTimeOccurred.getTime(),
        ...log
      })
    }
    EventStore.markAggregateForDispatch(this)
  }

  clearEvents (): void {
    this.domainEvents.splice(0, this.domainEvents.length)
  }

  getLogs (): Logs<E> { return this.logs }
}
