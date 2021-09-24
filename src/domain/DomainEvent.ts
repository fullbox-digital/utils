import { Timestamp } from './Timestamp'

export class DomainEvent {
  dateTimeOccurred: Timestamp = Timestamp.now()
}
