import { EventStore } from '../../src'
import {
  CoffeeFinished,
  CoffeeMachine,
  CoffeeMachineDefectFound,
  SendSmsAfterCoffeeFinished,
  WarnAfterCoffeeMachineDefectFound
} from './model-mocks'

interface SutTypes {
  coffeeMachine: CoffeeMachine
  sendSmsAfterDeliciousCoffeeFinished: SendSmsAfterCoffeeFinished
  warnAfterCoffeeMachineDefectFound: WarnAfterCoffeeMachineDefectFound
}

const makeSut = (): SutTypes => {
  const sendSmsAfterDeliciousCoffeeFinished = new SendSmsAfterCoffeeFinished()
  const warnAfterCoffeeMachineDefectFound = new WarnAfterCoffeeMachineDefectFound()
  EventStore.registerSubscription({
    domainEventName: CoffeeFinished.name,
    subscription: sendSmsAfterDeliciousCoffeeFinished
  })
  EventStore.registerSubscription({
    domainEventName: CoffeeMachineDefectFound.name,
    subscription: warnAfterCoffeeMachineDefectFound
  })
  return {
    coffeeMachine: new CoffeeMachine({ name: 'Super Coffee Machine' }),
    sendSmsAfterDeliciousCoffeeFinished,
    warnAfterCoffeeMachineDefectFound
  }
}

describe(EventStore, () => {
  test('should store domain event in aggregate root', () => {
    const { coffeeMachine } = makeSut()

    coffeeMachine.finish()

    const events = coffeeMachine.getDomainEvents()
    expect(events.length).toBe(1)
    expect(events[0].dateTimeOccurred).toBeTruthy()
  })

  test('should call occurred in subscriptions if dispatchEventsForAggregate is called',
    async () => {
      const {
        coffeeMachine,
        warnAfterCoffeeMachineDefectFound,
        sendSmsAfterDeliciousCoffeeFinished
      } = makeSut()

      coffeeMachine.finish()
      coffeeMachine.defectFound()

      const events = [...coffeeMachine.getDomainEvents()]

      const sendSmsOccurredSpy = jest.spyOn(sendSmsAfterDeliciousCoffeeFinished, 'occurred')
      const warnOccurredSpy = jest.spyOn(warnAfterCoffeeMachineDefectFound, 'occurred')

      await EventStore.dispatchEventsForAggregate(coffeeMachine.getId())

      expect(sendSmsOccurredSpy).toHaveBeenCalledWith(events[0])
      expect(warnOccurredSpy).toHaveBeenCalledWith(events[1])
    })
})
