import { EventStore } from '../../src'
import {
  CoffeeFinished,
  CoffeeMachine,
  CoffeeMachineDefectFound,
  CoffeeMachineStartedPreparation,
  PlayEpicSaxGuyMusicAfterCoffeeMachineStartedWork,
  SendSmsAfterCoffeeFinished,
  WarnAfterCoffeeMachineDefectFound
} from './model-mocks'

interface SutTypes {
  coffeeMachine: CoffeeMachine
  sendSmsAfterDeliciousCoffeeFinished: SendSmsAfterCoffeeFinished
  warnAfterCoffeeMachineDefectFound: WarnAfterCoffeeMachineDefectFound
  playEpicSaxGuyMusicAfterCoffeeMachineStartedWork: PlayEpicSaxGuyMusicAfterCoffeeMachineStartedWork
}

const makeSut = (): SutTypes => {
  const playEpicSaxGuyMusicAfterCoffeeMachineStartedWork =
  new PlayEpicSaxGuyMusicAfterCoffeeMachineStartedWork()
  const sendSmsAfterDeliciousCoffeeFinished = new SendSmsAfterCoffeeFinished()
  const warnAfterCoffeeMachineDefectFound = new WarnAfterCoffeeMachineDefectFound()
  EventStore.registerSubscription({
    domainEventName: CoffeeMachineStartedPreparation.name,
    subscription: playEpicSaxGuyMusicAfterCoffeeMachineStartedWork
  })
  EventStore.registerSubscription({
    domainEventName: CoffeeFinished.name,
    subscription: sendSmsAfterDeliciousCoffeeFinished
  })
  EventStore.registerSubscription({
    domainEventName: CoffeeMachineDefectFound.name,
    subscription: warnAfterCoffeeMachineDefectFound
  })
  const coffeeMachine = CoffeeMachine.create({
    name: 'Super Coffee Machine',
    coffeeGrams: 500,
    working: false
  })
  return {
    coffeeMachine,
    sendSmsAfterDeliciousCoffeeFinished,
    warnAfterCoffeeMachineDefectFound,
    playEpicSaxGuyMusicAfterCoffeeMachineStartedWork
  }
}

describe(EventStore, () => {
  test('should store domain event in aggregate root', () => {
    const { coffeeMachine } = makeSut()

    const coffeeMachineWorking = coffeeMachine.start()
    expect(coffeeMachineWorking.getDomainEvents().length).toBe(1)
    expect(coffeeMachineWorking.getDomainEvents()[0].dateTimeOccurred).toBeTruthy()

    const coffeeMachineWithDeliciousCoffee = coffeeMachineWorking.finish()
    expect(coffeeMachineWithDeliciousCoffee.getDomainEvents().length).toBe(1)
    expect(coffeeMachineWithDeliciousCoffee.getDomainEvents()[0].dateTimeOccurred).toBeTruthy()
  })

  test('should call occurred in subscriptions if dispatchEventsForAggregate is called',
    async () => {
      const {
        coffeeMachine,
        warnAfterCoffeeMachineDefectFound,
        sendSmsAfterDeliciousCoffeeFinished,
        playEpicSaxGuyMusicAfterCoffeeMachineStartedWork
      } = makeSut()

      const coffeeMachineWorking = coffeeMachine.start()
      const coffeeMachineWithDeliciousCoffee = coffeeMachineWorking.finish()
      const coffeeMachineBroken = coffeeMachineWithDeliciousCoffee.defectFound()

      const playMusicOccurredSpy = jest.spyOn(
        playEpicSaxGuyMusicAfterCoffeeMachineStartedWork,
        'occurred'
      )
      const sendSmsOccurredSpy = jest.spyOn(sendSmsAfterDeliciousCoffeeFinished, 'occurred')
      const warnOccurredSpy = jest.spyOn(warnAfterCoffeeMachineDefectFound, 'occurred')

      await EventStore.dispatchEventsForAggregate(coffeeMachine.getId())

      expect(playMusicOccurredSpy).toHaveBeenCalledWith(coffeeMachineWorking.getDomainEvents()[0])

      expect(sendSmsOccurredSpy).toHaveBeenCalledWith(
        coffeeMachineWithDeliciousCoffee.getDomainEvents()[0]
      )
      expect(warnOccurredSpy).toHaveBeenCalledWith(coffeeMachineBroken.getDomainEvents()[0])
    })
})
