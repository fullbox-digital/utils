import { DomainEvent } from './DomainEvent'
import { EventStore } from './EventStore'
import { Entity } from './Entity'
import { UniqueEntityId } from './UniqueEntityId'
import { Timestamp } from './Timestamp'

export type Log<T> = { date: Timestamp } & T

export abstract class AggregateRoot<T, E = unknown> extends Entity<T> {
  private readonly domainEvents: DomainEvent[] = []
  private readonly logs: Array<Log<E>> = []

  constructor (props: T, id?: UniqueEntityId, logs?: Array<Log<E>>) {
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
        date: domainEvent.dateTimeOccurred,
        ...log
      })
    }
    EventStore.markAggregateForDispatch(this)
  }

  clearEvents (): void {
    this.domainEvents.splice(0, this.domainEvents.length)
  }

  getLogs (): Array<Log<E>> { return this.logs }

  protected update<R> (
    create: (props: T, id: UniqueEntityId, logs: Array<Log<E>>) => R,
    params: Partial<T>
  ): R {
    return create(
      {
        ...this.props,
        ...params
      },
      this.id,
      this.getLogs()
    )
  }
}
