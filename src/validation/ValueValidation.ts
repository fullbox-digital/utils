import { ObjectHelper } from '..'
import { Validation } from './Validation'
import { ValidationError } from './ValidationError'

  type TypeOf = 'string' | 'number' | 'boolean' | 'array'

const typeOfName = new Map<TypeOf, string>([
  ['string', 'texto'],
  ['number', 'numérico'],
  ['boolean', 'booleano'],
  ['array', 'lista']
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
    if (!ObjectHelper.isNullOrUndefined(this.value)) {
      if (isNaN(this.value)) {
        this.errors
          .push(new ValidationError(`${this.field} ${ValueValidation.isNaNErrorMessage()}`))
      }
    }

    return this
  }

  type (typeOf: TypeOf): ValueValidation {
    if (!ObjectHelper.isNullOrUndefined(this.value)) {
      if (typeOf === 'array') {
        if (!Array.isArray(this.value)) {
          this.errors.push(
            new ValidationError(`${this.field} ${ValueValidation.typeErrorMessage(typeOf)}`)
          )
        }
      } else if (typeof this.value !== typeOf) {
        this.errors
          .push(new ValidationError(`${this.field} ${ValueValidation.typeErrorMessage(typeOf)}`))
      }
    }

    return this
  }

  filled (): ValueValidation {
    if (!ObjectHelper.isNullOrUndefined(this.value)) {
      if (Array.isArray(this.value) && this.value.length <= 0) {
        this.errors.push(new ValidationError(
          `${this.field} ${ValueValidation.filledErrorMessage()}`)
        )
      }
    }
    return this
  }

  greaterThan (number: number): ValueValidation {
    if (!ObjectHelper.isNullOrUndefined(this.value)) {
      if (!(Number(this.value) > number)) {
        this.errors.push(new ValidationError(
          `${this.field} ${ValueValidation.greaterThan(number)}`
        ))
      }
    }
    return this
  }

  greaterEqualThan (number: number): ValueValidation {
    if (!ObjectHelper.isNullOrUndefined(this.value)) {
      if (!(Number(this.value) >= number)) {
        this.errors.push(new ValidationError(
          `${this.field} ${ValueValidation.greaterEqualThan(number)}`
        ))
      }
    }
    return this
  }

  lessThan (number: number): ValueValidation {
    if (!ObjectHelper.isNullOrUndefined(this.value)) {
      if (!(Number(this.value) < number)) {
        this.errors.push(new ValidationError(
          `${this.field} ${ValueValidation.lessThan(number)}`
        ))
      }
    }
    return this
  }

  lessEqualThan (number: number): ValueValidation {
    if (!ObjectHelper.isNullOrUndefined(this.value)) {
      if (!(Number(this.value) <= number)) {
        this.errors.push(new ValidationError(
          `${this.field} ${ValueValidation.lessEqualThan(number)}`
        ))
      }
    }
    return this
  }

  stringFilled (): ValueValidation {
    if (!ObjectHelper.isNullOrUndefined(this.value)) {
      if (this.value?.length <= 0) {
        this.errors.push(new ValidationError(
          `${this.field} ${ValueValidation.filledErrorMessage()}`)
        )
      }
    }
    return this
  }

  validate (params: {
    isValid: (value: any) => boolean
    errorMessage: string
  }): ValueValidation {
    const { isValid, errorMessage } = params

    if (!ObjectHelper.isNullOrUndefined(this.value)) {
      if (!!isValid && !isValid(this.value)) {
        this.errors.push(new ValidationError(
          `${this.field} ${errorMessage}!`)
        )
      }
    }

    return this
  }

  static lengthErrorMessage = (min: number, max: number): string =>
    `precisa ser maior ou igual a ${min} e menor ou igual a ${max}!`

  static requiredErrorMessage = (): string => 'é obrigatório!'

  static emailErrorMessage = (email: string): string => `${email} não é válido!`

  static isNaNErrorMessage = (): string => 'não é um número!'

  static typeErrorMessage = (typeOf: TypeOf): string =>
    `deve ser do tipo ${typeOfName.get(typeOf) ?? ''}!`

  static filledErrorMessage = (): string => 'não está preenchido!'

  static greaterThan = (number: number): string => `precisa ser maior que ${number}!`

  static greaterEqualThan = (number: number): string => `precisa ser maior ou igual a ${number}!`

  static lessThan = (number: number): string => `precisa ser menor que ${number}!`

  static lessEqualThan = (number: number): string => `precisa ser menor igual a ${number}!`
}
