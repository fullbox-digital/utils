import { Timestamp } from './Timestamp'

export class DomainEvent {
  protected readonly dateTimeOccurred: Timestamp = Timestamp.now()
}
