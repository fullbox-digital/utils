import { ValueValidation } from './ValueValidation'

export const check = (value: any, field: string): ValueValidation => {
  return new ValueValidation(value, field)
}
