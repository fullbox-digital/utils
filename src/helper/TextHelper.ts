export abstract class TextHelper {
  static onlyAlphanumeric (value: string): string {
    return value?.replace(/[^a-z0-9]/gi, '')
  }
}
