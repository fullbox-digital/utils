import { ObjectHelper } from '..'
import { Validation } from './Validation'
import { ValidationError } from './ValidationError'

type TypeOf = 'string' | 'number' | 'boolean'

const typeOfName = new Map<TypeOf, string>([
  ['string', 'texto'],
  ['number', 'numérico'],
  ['boolean', 'booleano']
])
export class ValueValidation extends Validation {
  constructor (
    private readonly value: any,
    private readonly field: string
  ) { super() }

  required (): ValueValidation {
    if (ObjectHelper.isNullOrUndefined(this.value)) {
      this.errors.push(new ValidationError(
        `${this.field} ${ValueValidation.requiredErrorMessage()}`
      ))
    }
    return this
  }

  requiredIf (condition: boolean): ValueValidation {
    if (ObjectHelper.isNullOrUndefined(this.value) && condition) {
      this.errors.push(new ValidationError(
        `${this.field} ${ValueValidation.requiredErrorMessage()}`
      ))
    }
    return this
  }

  isLength (props: { min: number, max: number }): ValueValidation {
    const canValidate = !ObjectHelper.isNullOrUndefined(this.value) &&
      ObjectHelper.isString(this.value)

    if (canValidate) {
      const { max, min } = props
      const length = this.value.length

      if (length < min || length > max) {
        this.errors.push(new ValidationError(
          `${this.field} ${ValueValidation.lengthErrorMessage(min, max)}`
        ))
      }
    }
    return this
  }

  isEmail (): ValueValidation {
    // eslint-disable-next-line no-useless-escape
    // eslint-disable-next-line max-len
    const emailRegex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const canValidate = !ObjectHelper.isNullOrUndefined(this.value) &&
      ObjectHelper.isString(this.value)

    if (canValidate) {
      if (!emailRegex.test(this.value.toLowerCase())) {
        this.errors.push(new ValidationError(
          `${this.field} ${ValueValidation.emailErrorMessage(this.value)}`
        ))
      }
    }
    return this
  }

  enumType (enumObj: any): ValueValidation {
    if (!ObjectHelper.isNullOrUndefined(this.value)) {
      const values = Object.keys(enumObj).map(key => enumObj[key])
      if (!values.includes(this.value)) {
        this.errors.push(new ValidationError(`${this.field} deve ser [${values.join(', ')}]`))
      }
    }

    return this
  }

  number (): ValueValidation {
    if (isNaN(this.value)) {
      this.errors.push(new ValidationError(`${this.field} ${ValueValidation.isNaNErrorMessage()}`))
    }
    return this
  }

  type (typeOf: TypeOf): ValueValidation {
    if (typeof this.value !== typeOf) {
      this.errors
        .push(new ValidationError(`${this.field} ${ValueValidation.typeErrorMessage(typeOf)}`))
    }
    return this
  }

  static lengthErrorMessage = (min: number, max: number): string =>
    `precisa ser maior ou igual a ${min} e menor ou igual a ${max}!`

  static requiredErrorMessage = (): string => 'é obrigatório!'

  static emailErrorMessage = (email: string): string => `${email} não é válido!`

  static isNaNErrorMessage = (): string => 'não é um número!'

  static typeErrorMessage = (typeOf: TypeOf): string =>
    `deve ser do tipo ${typeOfName.get(typeOf) ?? ''}`
}
