export abstract class TextHelper {
  static onlyAlphanumeric (value: string): string {
    return value?.replace(/[^a-z0-9]/gi, '')
  }

  static stripUnicodeCharacters (problematicString: string): string {
    // eslint-disable-next-line no-control-regex
    return problematicString.replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '')
  }

  static justNumber (value: string): string {
    return value?.toString()?.match(/\d+/g)?.join('') ?? ''
  }

  static fillLeftSide (value: string, width: number, valueToFill: string): string {
    if (!valueToFill) { return value }
    width -= value?.toString()?.length ?? 0
    if (width > 0) {
      return new Array(width + (value.includes('.') ? 2 : 1)).join(valueToFill) + value
    }
    return value
  }

  static fillRightSide (value: string, width: number, valueToFill: string): string {
    if (!valueToFill) { return value }
    width -= value?.toString()?.length ?? 0
    if (width > 0) {
      return value + new Array(width + (value.includes('.') ? 2 : 1)).join(valueToFill)
    }
    return value
  }
}
