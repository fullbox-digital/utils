import { IdInvalidError, IdRequiredError, UniqueEntityId } from '../../src'
import faker from 'faker'

describe(UniqueEntityId, () => {
  describe('constructor()', () => {
    test('should trow error if id is an invalid type', () => {
      expect(() => new UniqueEntityId('invalid')).toThrow(IdInvalidError)
    })

    test('should trow error if don\'t pass an id ', () => {
      expect(() => new UniqueEntityId('')).toThrow(IdRequiredError)
    })

    test('should create an UUID entity', () => {
      const UuidEntity = new UniqueEntityId(faker.datatype.uuid())

      expect(UuidEntity).toBeDefined()
    })
  })

  describe('uniqueEntityIdOrNull()', () => {
    test('Should return null if id is undefined', () => {
      const response = UniqueEntityId.uniqueEntityIdOrNull()
      expect(response).toBeNull()
    })

    test('Should return null if id is null', () => {
      const response = UniqueEntityId.uniqueEntityIdOrNull(null)
      expect(response).toBeNull()
    })

    test('Should return entity if id is valid', () => {
      const response = UniqueEntityId.uniqueEntityIdOrNull(faker.datatype.uuid())
      expect(response).toBeInstanceOf(UniqueEntityId)
    })

    test('Should throw error if id is invalid', () => {
      expect(() => UniqueEntityId.uniqueEntityIdOrNull('invalid')).toThrow(IdInvalidError)
    })
  })

  describe('uniqueEntityIdOrThrow()', () => {
    test('Should throw error if id is undefined', () => {
      expect(() => UniqueEntityId.uniqueEntityIdOrThrow(undefined as any)).toThrow(IdRequiredError)
    })

    test('Should throw error if id is null', () => {
      expect(() => UniqueEntityId.uniqueEntityIdOrThrow(null as any)).toThrow(IdRequiredError)
    })

    test('Should return entity if id is valid', () => {
      const response = UniqueEntityId.uniqueEntityIdOrThrow(faker.datatype.uuid())
      expect(response).toBeInstanceOf(UniqueEntityId)
    })

    test('Should throw error if id is invalid', () => {
      expect(() => UniqueEntityId.uniqueEntityIdOrThrow('invalid')).toThrow(IdInvalidError)
    })
  })
})
