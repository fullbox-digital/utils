import { AggregateRoot } from './AggregateRoot'
import { DomainEvent } from './DomainEvent'
import { EventSubscription } from './EventSubscription'

export interface RegisterSubscriptionProps {
  domainEventName: string
  subscription: EventSubscription<any>
}

export abstract class EventStore {
  private static readonly subscriptionsMap = new Map<string, Array<EventSubscription<unknown>>>()

  private static readonly markedAggregates = new Map<string, AggregateRoot<unknown>>()

  static markAggregateForDispatch (aggregate: AggregateRoot<unknown>): void {
    const aggregateFound = EventStore.markedAggregates.get(aggregate.getId())
    if (!aggregateFound) {
      EventStore.markedAggregates.set(aggregate.getId(), aggregate)
    }
  }

  static async dispatchEventsForAggregate (id: string): Promise<void> {
    const aggregate = EventStore.markedAggregates.get(id)
    if (aggregate) {
      const domainEvents = aggregate.getDomainEvents()
      for (const domainEvent of domainEvents) {
        await EventStore.dispatchEvent(domainEvent)
      }
      aggregate.clearEvents()
      EventStore.markedAggregates.delete(id)
    }
  }

  static registerSubscription (props: RegisterSubscriptionProps): void {
    const { domainEventName, subscription } = props
    const subscriptions = EventStore
      .subscriptionsMap.get(domainEventName) ?? []
    subscriptions.push(subscription)
    EventStore.subscriptionsMap.set(domainEventName, subscriptions)
  }

  private static async dispatchEvent (event: DomainEvent): Promise<void> {
    const domainEventName = event.constructor.name
    const subscriptions = EventStore.subscriptionsMap.get(domainEventName)
    if (subscriptions) {
      for (const subscription of subscriptions) {
        await subscription.occurred(event)
      }
    }
  }
}
