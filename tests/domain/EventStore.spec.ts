import { EventStore } from '../../src'
import {
  CallProgrammersForCoffee,
  CoffeeBreak,
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
  callProgrammersForCoffee: CallProgrammersForCoffee
}

const makeSut = (): SutTypes => {
  const playEpicSaxGuyMusicAfterCoffeeMachineStartedWork =
  new PlayEpicSaxGuyMusicAfterCoffeeMachineStartedWork()
  const sendSmsAfterDeliciousCoffeeFinished = new SendSmsAfterCoffeeFinished()
  const warnAfterCoffeeMachineDefectFound = new WarnAfterCoffeeMachineDefectFound()
  const callProgrammersForCoffee = new CallProgrammersForCoffee()
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
  EventStore.registerSubscription({
    domainEventName: CoffeeBreak.name,
    subscription: callProgrammersForCoffee
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
    playEpicSaxGuyMusicAfterCoffeeMachineStartedWork,
    callProgrammersForCoffee
  }
}

describe(EventStore, () => {
  test('should store domain event in aggregate root', () => {
    const { coffeeMachine } = makeSut()

    const coffeeMachineWorking = coffeeMachine.start()
    expect(coffeeMachineWorking.getDomainEvents().length).toBe(1)
    expect(coffeeMachineWorking.getDomainEvents()[0].dateTimeOccurred).toBeTruthy()

    const coffeeMachineWithDeliciousCoffee = coffeeMachineWorking.finish()
    expect(coffeeMachineWithDeliciousCoffee.getDomainEvents().length).toBe(2)
    expect(coffeeMachineWithDeliciousCoffee.getDomainEvents()[0].dateTimeOccurred).toBeTruthy()
  })

  test('should call occurred in subscriptions if dispatchEventsForAggregate is called',
    async () => {
      const {
        coffeeMachine,
        warnAfterCoffeeMachineDefectFound,
        sendSmsAfterDeliciousCoffeeFinished,
        playEpicSaxGuyMusicAfterCoffeeMachineStartedWork,
        callProgrammersForCoffee
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
      const callProgrammersForCoffeeSpy = jest.spyOn(
        callProgrammersForCoffee,
        'occurred'
      )

      await EventStore.dispatchEventsForAggregate(coffeeMachine.getIdentifier())

      expect(playMusicOccurredSpy).toHaveBeenCalledTimes(1)
      expect(playMusicOccurredSpy).toHaveBeenCalledWith(coffeeMachineWorking.getDomainEvents()[0])

      expect(sendSmsOccurredSpy).toHaveBeenCalledTimes(1)
      expect(sendSmsOccurredSpy).toHaveBeenCalledWith(
        coffeeMachineWithDeliciousCoffee.getDomainEvents()[0]
      )

      expect(warnOccurredSpy).toHaveBeenCalledTimes(1)
      expect(warnOccurredSpy).toHaveBeenCalledWith(coffeeMachineBroken.getDomainEvents()[0])

      expect(callProgrammersForCoffeeSpy).toHaveBeenCalledTimes(1)
      expect(callProgrammersForCoffeeSpy).toHaveBeenCalledWith(
        coffeeMachineWithDeliciousCoffee.getDomainEvents()[0]
      )
    })
})
