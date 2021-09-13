import { AggregateRoot } from './AggregateRoot'
import { DomainEvent } from './DomainEvent'
import { EventSubscription } from './EventSubscription'

export interface RegisterSubscriptionProps {
  domainEventName: string
  subscription: EventSubscription<any>
}

export abstract class EventStore {
  private static readonly subscriptionsMap = new Map<string, Array<EventSubscription<unknown>>>()

  private static readonly markedDomainEvents = new Map<string, DomainEvent[]>()

  static markAggregateForDispatch (aggregate: AggregateRoot<unknown>): void {
    const domainEventsFound = EventStore.markedDomainEvents.get(aggregate.getId())
    if (!domainEventsFound) {
      EventStore.markedDomainEvents.set(aggregate.getId(), aggregate.getDomainEvents())
    } else {
      EventStore.markedDomainEvents.set(aggregate.getId(), [
        ...domainEventsFound,
        ...aggregate.getDomainEvents()
      ])
    }
  }

  static async dispatchEventsForAggregate (id: string): Promise<void> {
    const domainEvents = EventStore.markedDomainEvents.get(id)
    if (domainEvents) {
      for (const domainEvent of domainEvents) {
        await EventStore.dispatchEvent(domainEvent)
      }
      EventStore.markedDomainEvents.delete(id)
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
