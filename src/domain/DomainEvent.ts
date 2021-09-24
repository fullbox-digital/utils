import { Timestamp } from './Timestamp'

export class DomainEvent {
  readonly dateTimeOccurred: Timestamp = Timestamp.now()
}
