export interface EventSubscription<T> {
  occurred(domainEvent: T): void
}
