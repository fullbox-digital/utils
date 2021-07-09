import { Validation } from './Validation'

export class ValidationComposite extends Validation {
  constructor (errors: Error[]) {
    super()
    this.errors.push(...errors)
  }
}
