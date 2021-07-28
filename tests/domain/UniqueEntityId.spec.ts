import { IdInvalidError, IdRequiredError, UniqueEntityId } from '../../src'
import faker from 'faker'

describe(UniqueEntityId, () => {
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
