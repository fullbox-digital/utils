export abstract class Validation {
  protected readonly errors: Error[] = []

  hasError (): boolean {
    return this.errors.length > 0
  }

  getErrors (): Error[] {
    return this.errors
  }
}
