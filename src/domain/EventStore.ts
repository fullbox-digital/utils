import { UniqueEntityId } from '..'
import { AggregateRoot } from './AggregateRoot'
import { DomainEvent } from './DomainEvent'
import { EventSubscription } from './EventSubscription'

export interface RegisterSubscriptionProps {
  domainEventName: string
  subscription: EventSubscription<any>
}

export abstract class EventStore {
  private static readonly subscriptionsMap = new Map<string, Array<EventSubscription<unknown>>>()

  private static readonly markedDomainEvents = new Map<UniqueEntityId, DomainEvent[]>()

  static markAggregateForDispatch (aggregate: AggregateRoot<unknown>): void {
    const domainEventsFound = EventStore.markedDomainEvents.get(
      aggregate.getIdentifier()
    )
    if (!domainEventsFound) {
      EventStore.markedDomainEvents.set(
        aggregate.getIdentifier(),
        [...aggregate.getDomainEvents()]
      )
    } else {
      const domainEventsDiff = aggregate.getDomainEvents().filter(
        (event) => !domainEventsFound.some((eventFound) => eventFound === event)
      )
      EventStore.markedDomainEvents.set(aggregate.getIdentifier(), [
        ...domainEventsFound,
        ...domainEventsDiff
      ])
    }
  }

  static async dispatchEventsForAggregate (id: UniqueEntityId): Promise<void> {
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
