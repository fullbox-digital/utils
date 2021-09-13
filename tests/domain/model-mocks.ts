import { AggregateRoot, DomainEvent, EventSubscription, Logs, UniqueEntityId } from '../../src'

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

export class CoffeeMachineStartedPreparation implements DomainEvent {
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
  coffeeGrams: number
  working: boolean
}

export class CoffeeMachine extends AggregateRoot<CoffeeMachineProps> {
  static create (
    props: CoffeeMachineProps,
    id?: UniqueEntityId,
    logs?: Logs<any>
  ): CoffeeMachine {
    // Validations
    return new CoffeeMachine(props, id, logs)
  }

  start (): CoffeeMachine {
    if (this.props.working) {
      throw new Error('The coffee machine already working')
    }

    if (this.props.coffeeGrams < 10) {
      throw new Error('The coffee is over')
    }

    if (this.props.defect) {
      throw new Error('The coffee machine is broken')
    }

    const updatedCoffeeMachine = this.update(
      CoffeeMachine.create, {
        working: true
      }
    )

    updatedCoffeeMachine.addDomainEvent(
      new CoffeeMachineStartedPreparation(updatedCoffeeMachine)
    )

    return updatedCoffeeMachine
  }

  finish (): CoffeeMachine {
    const updatedCoffeeMachine = this.update(
      CoffeeMachine.create, {
        coffeeGrams: this.props.coffeeGrams - 10,
        working: false
      }
    )

    updatedCoffeeMachine.addDomainEvent(
      new CoffeeFinished(updatedCoffeeMachine)
    )

    return updatedCoffeeMachine
  }

  defectFound (): CoffeeMachine {
    const updatedCoffeeMachine = this.update(
      CoffeeMachine.create, {
        defect: true
      }
    )

    updatedCoffeeMachine.addDomainEvent(
      new CoffeeMachineDefectFound(updatedCoffeeMachine)
    )

    return updatedCoffeeMachine
  }
}

export class PlayEpicSaxGuyMusicAfterCoffeeMachineStartedWork
implements EventSubscription<CoffeeMachineStartedPreparation> {
  async occurred (domainEvent: CoffeeMachineStartedPreparation): Promise<void> {
    // Play Epc Sax Guy Music
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
