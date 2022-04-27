export abstract class ArrayHelper {
  static randomSelect<T>(...array: T[]): T {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
  }

  static findDuplicate (arr: string[]): string[] {
    const found: { [key: string]: boolean } = {}
    arr.forEach((item) => {
      found[item] = typeof found[item] === 'boolean'
    })
    return Object.keys(found).filter((key) => found[key])
  }
}
