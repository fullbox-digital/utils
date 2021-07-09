import { ValidationComposite } from './ValidationComposite'
import { ValueValidation } from './ValueValidation'

export const combineValidations = (...validations: ValueValidation[]): ValidationComposite => {
  const errors: Error[] = []

  for (const validation of validations) {
    if (validation.hasError()) {
      errors.push(...validation.getErrors())
    }
  }

  return new ValidationComposite(errors)
}
