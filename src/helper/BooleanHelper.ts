
export abstract class BooleanHelper {
  static toBoolean (value: string): boolean | null {
    if (value === 'true') {
      return true
    }

    if (value === 'false') {
      return false
    }

    return null
  }

  static toPortuguese (value: boolean): string {
    return value ? 'Sim' : 'Não'
  }
}
