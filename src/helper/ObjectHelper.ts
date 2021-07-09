export abstract class ObjectHelper {
  static isNullOrUndefined (value: any): boolean {
    return value === null || value === undefined
  }

  static isString (value: any): boolean {
    return typeof value === 'string'
  }
}
