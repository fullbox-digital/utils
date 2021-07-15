import { ArrayHelper } from '../../src/helper/ArrayHelper'

describe(ArrayHelper, () => {
  test('should select random value from array', async () => {
    const array = [1, 2, 3, 4, 5]

    const valueSelected = ArrayHelper.randomSelect(...array)

    expect(array).toContain(valueSelected)
  })
})
