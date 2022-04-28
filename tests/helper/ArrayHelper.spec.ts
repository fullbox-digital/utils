import { ArrayHelper } from '../../src/helper/ArrayHelper'

describe(ArrayHelper, () => {
  describe('randomSelect', () => {
    test('Should select random value from array', async () => {
      const array = [1, 2, 3, 4, 5]

      const valueSelected = ArrayHelper.randomSelect(...array)

      expect(array).toContain(valueSelected)
    })
  })

  describe('findDuplicate', () => {
    test('Should return empty if array do not have repeated item', () => {
      const array = ['teste1', 'teste2', 'teste3', 'teste4', 'teste5']

      const foundItem = ArrayHelper.findDuplicate(array)

      expect(foundItem).toEqual([])
    })

    test('Should return repeated item if array have one repeated item', () => {
      const array = ['teste1', 'teste2', 'teste1', 'teste4', 'teste5']

      const foundItem = ArrayHelper.findDuplicate(array)

      expect(foundItem).toEqual(['teste1'])
    })

    test('Should return repeated item if array have one repeated item three times', () => {
      const array = ['teste1', 'teste2', 'teste1', 'teste4', 'teste5', 'teste1']

      const foundItem = ArrayHelper.findDuplicate(array)

      expect(foundItem).toEqual(['teste1'])
    })

    test('Should return all repeated items if array have two repeated items', () => {
      const array = ['teste1', 'teste2', 'teste2', 'pao', 'teste5', 'pao', 'teste6']

      const foundItem = ArrayHelper.findDuplicate(array)

      expect(foundItem).toEqual(['teste2', 'pao'])
    })
  })
})
