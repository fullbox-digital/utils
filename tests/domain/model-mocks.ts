import { AggregateRoot, DomainEvent, EventSubscription } from '../../src'

export class CoffeeFinished implements DomainEvent {
  dateTimeOccurred: Date

  constructor (
    private readonly coffeeMachine: CoffeeMachine
  ) {
    this.dateTimeOccurred = new Date()
  }

  getAggregateId (): string {
    return this.coffeeMachine.getId()
  }
}

export class CoffeeMachineDefectFound implements DomainEvent {
  dateTimeOccurred: Date

  constructor (
    private readonly coffeeMachine: CoffeeMachine
  ) {
    this.dateTimeOccurred = new Date()
  }

  getAggregateId (): string {
    return this.coffeeMachine.getId()
  }
}

export interface CoffeeMachineProps {
  name: string
  defect?: boolean
}

export class CoffeeMachine extends AggregateRoot<CoffeeMachineProps> {
  finish (): void {
    // Action
    this.addDomainEvent(new CoffeeFinished(this))
  }

  defectFound (): void {
    // Action
    this.addDomainEvent(new CoffeeMachineDefectFound(this))
  }
}

export class SendSmsAfterCoffeeFinished implements EventSubscription<CoffeeFinished> {
  async occurred (domainEvent: CoffeeFinished): Promise<void> {
    // Send SMS
  }
}

export class WarnAfterCoffeeMachineDefectFound
implements EventSubscription<CoffeeMachineDefectFound> {
  async occurred (domainEvent: CoffeeMachineDefectFound): Promise<void> {
    // Warn
  }
}
