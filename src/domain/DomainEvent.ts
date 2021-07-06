
export interface DomainEvent {
  dateTimeOccurred: Date
  getAggregateId(): string
}
