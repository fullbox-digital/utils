export interface EventSubscription<T> {
  occurred(domainEvent: T): Promise<void>
}
