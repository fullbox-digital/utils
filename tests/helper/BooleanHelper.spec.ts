import { BooleanHelper } from '../../src/helper/BooleanHelper'

describe(BooleanHelper, () => {
  describe('toBoolean', () => {
    test('Should return null if passing a string that is not boolean', () => {
      const result = BooleanHelper.toBoolean('invalid')

      expect(result).toBeNull()
    })

    test('Should return true if passing string true', () => {
      const result = BooleanHelper.toBoolean('true')

      expect(result).toBeTruthy()
    })

    test('Should return false if passing string false', () => {
      const result = BooleanHelper.toBoolean('false')

      expect(result).not.toBeTruthy()
    })
  })

  describe('toPortuguese', () => {
    test('Should return Sim if passing true', () => {
      const result = BooleanHelper.toPortuguese(true)

      expect(result).toEqual('Sim')
    })

    test('Should return Não if passing false', () => {
      const result = BooleanHelper.toPortuguese(false)

      expect(result).toEqual('Não')
    })
  })
})
