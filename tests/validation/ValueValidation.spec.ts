import { check, combineValidations, ValidationError, ValueValidation } from '../../src'

describe(ValueValidation, () => {
  describe(check, () => {
    describe('required()', () => {
      test('Should return ValidationError if field is empty', () => {
        const result = check(null, 'field').required()

        expect(result.hasError()).toBeTruthy()
        expect(result.getErrors()).toEqual([
          new ValidationError('field é obrigatório!')
        ])
      })

      test('Should return false for errors if field is not empty', () => {
        const result = check('any_value', 'field').required()

        expect(result.hasError()).toBeFalsy()
      })
    })

    describe('requiredIf()', () => {
      test('Should return ValidationError if field is empty and condition is true', () => {
        const result = check(null, 'field').requiredIf(true)

        expect(result.hasError()).toBeTruthy()
        expect(result.getErrors()).toEqual([
          new ValidationError('field é obrigatório!')
        ])
      })

      test('Should return false for errors if field is empty but condition is false', () => {
        const result = check(null, 'field').requiredIf(false)

        expect(result.hasError()).toBeFalsy()
      })

      test('Should return false for errors if field is not empty but condition is false', () => {
        const result = check(null, 'field').requiredIf(false)

        expect(result.hasError()).toBeFalsy()
      })

      test('Should return false for errors if field is not empty and condition is true', () => {
        const result = check('any_value', 'field').requiredIf(true)

        expect(result.hasError()).toBeFalsy()
      })
    })

    describe('isLength()', () => {
      test('Should return ValidationError if length is greater than 10', () => {
        const result = check('0123456789a', 'alpha_numeric').isLength({ min: 1, max: 10 })

        expect(result.hasError()).toBeTruthy()
        expect(result.getErrors()).toEqual([
          new ValidationError('alpha_numeric precisa ser maior ou igual a 1 e menor ou igual a 10!')
        ])
      })

      test('Should return ValidationError if length is less than 5', () => {
        const result = check('012a', 'alpha_numeric').isLength({ min: 5, max: 10 })

        expect(result.hasError()).toBeTruthy()
        expect(result.getErrors()).toEqual([
          new ValidationError('alpha_numeric precisa ser maior ou igual a 5 e menor ou igual a 10!')
        ])
      })

      test('Should return false for errors if length is greater than 1 and is less than 10', () => {
        const result = check('123456a', 'alpha_numeric').isLength({ min: 1, max: 10 })

        expect(result.hasError()).toBeFalsy()
      })
    })

    describe('isEmail()', () => {
      test('Should return ValidationError if email is not valid', () => {
        const result = check('any_alpha_numeric', 'e-mail').isEmail()

        expect(result.hasError()).toBeTruthy()
        expect(result.getErrors()).toEqual([
          new ValidationError('e-mail any_alpha_numeric não é válido!')
        ])
      })

      test('Should return false for errors if email is valid', () => {
        const result = check('jerry@mail.com', 'e-mail').isEmail()

        expect(result.hasError()).toBeFalsy()
      })
    })

    describe('enumType()', () => {
      test('Should return ValidationError if value is not belongs to enum', () => {
        enum sutEnum {
          VALUE_1 = 'VALUE_1',
          VALUE_2 = 'VALUE_2',
          VALUE_3 = 'VALUE_3'
        }

        const result = check('ANY_VALUE', 'enumerator').enumType(sutEnum)

        expect(result.hasError()).toBeTruthy()
        expect(result.getErrors()).toEqual([
          new ValidationError('enumerator deve ser [VALUE_1, VALUE_2, VALUE_3]')
        ])
      })

      test('Should return false for errors if value is belongs to enum', () => {
        enum sutEnum {
          VALUE_1 = 'VALUE_1',
          VALUE_2 = 'VALUE_2',
          VALUE_3 = 'VALUE_3'
        }

        const result = check(sutEnum.VALUE_1, 'enumerator').enumType(sutEnum)

        expect(result.hasError()).toBeFalsy()
      })
    })

    describe('number()', () => {
      test('Should return ValidationError if value is NaN', () => {
        const result = check('not_number', 'number').number()

        expect(result.hasError()).toBeTruthy()
        expect(result.getErrors()).toEqual([
          new ValidationError('number não é um número!')
        ])
      })

      test('Should return false for errors if is not NaN', () => {
        const result = check('123', 'number').number()

        expect(result.hasError()).toBeFalsy()
      })

      test('Should return false for errors if is not NaN', () => {
        const result = check(123, 'number').number()

        expect(result.hasError()).toBeFalsy()
      })
    })

    describe('type()', () => {
      test('Should return ValidationError if type is not array', () => {
        const result = check('any_value', 'array').type('array')

        expect(result.hasError()).toBeTruthy()
        expect(result.getErrors()).toEqual([
          new ValidationError('array deve ser do tipo lista!')
        ])
      })

      test('Should return ValidationError if type is not boolean', () => {
        const result = check('any_value', 'boolean').type('boolean')

        expect(result.hasError()).toBeTruthy()
        expect(result.getErrors()).toEqual([
          new ValidationError('boolean deve ser do tipo booleano!')
        ])
      })

      test('Should return ValidationError if type is not string', () => {
        const result = check({}, 'string').type('string')

        expect(result.hasError()).toBeTruthy()
        expect(result.getErrors()).toEqual([
          new ValidationError('string deve ser do tipo texto!')
        ])
      })

      test('Should return ValidationError if type is not number', () => {
        const result = check('321', 'number').type('number')

        expect(result.hasError()).toBeTruthy()
        expect(result.getErrors()).toEqual([
          new ValidationError('number deve ser do tipo numérico!')
        ])
      })

      test('Should return false for errors if type is array', () => {
        const result = check([], 'array').type('array')

        expect(result.hasError()).toBeFalsy()
      })

      test('Should return false for errors if type is boolean', () => {
        const result = check(false, 'boolean').type('boolean')

        expect(result.hasError()).toBeFalsy()
      })

      test('Should return false for errors if type is string', () => {
        const result = check('any_text', 'string').type('string')

        expect(result.hasError()).toBeFalsy()
      })

      test('Should return false for errors if type is number', () => {
        const result = check(123, 'number').type('number')

        expect(result.hasError()).toBeFalsy()
      })
    })

    describe('filled()', () => {
      test('Should return ValidationError if ', () => {
        const result = check([], 'array').filled()

        expect(result.hasError()).toBeTruthy()
        expect(result.getErrors()).toEqual([
          new ValidationError('array não está preenchido!')
        ])
      })

      test('Should return false for errors', () => {
        const result = check([0, 1, 2, 3], 'array').filled()

        expect(result.hasError()).toBeFalsy()
      })
    })

    describe('greaterThan()', () => {
      test('Should return ValidationError if value is less then 10', () => {
        const result = check(1, 'number').greaterThan(10)

        expect(result.hasError()).toBeTruthy()
        expect(result.getErrors()).toEqual([
          new ValidationError('number precisa ser maior que 10!')
        ])
      })

      test('Should return ValidationError if value is equal then 10', () => {
        const result = check(10, 'number').greaterThan(10)

        expect(result.hasError()).toBeTruthy()
        expect(result.getErrors()).toEqual([
          new ValidationError('number precisa ser maior que 10!')
        ])
      })

      test('Should return false for errors', () => {
        const result = check(11, 'number').greaterThan(10)

        expect(result.hasError()).toBeFalsy()
      })
    })

    describe('greaterEqualThan()', () => {
      test('Should return ValidationError if ', () => {
        const result = check(1, 'number').greaterEqualThan(10)

        expect(result.hasError()).toBeTruthy()
        expect(result.getErrors()).toEqual([
          new ValidationError('number precisa ser maior ou igual a 10!')
        ])
      })

      test('Should return false for errors if value is equal then 10', () => {
        const result = check(10, 'number').greaterEqualThan(10)

        expect(result.hasError()).toBeFalsy()
      })

      test('Should return false for errors if value is greater than 10', () => {
        const result = check(11, 'number').greaterEqualThan(10)

        expect(result.hasError()).toBeFalsy()
      })
    })

    describe('lessThan()', () => {
      test('Should return ValidationError if greater then 10', () => {
        const result = check(11, 'number').lessThan(10)

        expect(result.hasError()).toBeTruthy()
        expect(result.getErrors()).toEqual([
          new ValidationError('number precisa ser menor que 10!')
        ])
      })

      test('Should return ValidationError if equal then 10', () => {
        const result = check(10, 'number').lessThan(10)

        expect(result.hasError()).toBeTruthy()
        expect(result.getErrors()).toEqual([
          new ValidationError('number precisa ser menor que 10!')
        ])
      })

      test('Should return false for errors if less than 10', () => {
        const result = check(9, 'number').lessThan(10)

        expect(result.hasError()).toBeFalsy()
      })
    })

    describe('lessEqualThan()', () => {
      test('Should return ValidationError if more than 10', () => {
        const result = check(11, 'number').lessEqualThan(10)

        expect(result.hasError()).toBeTruthy()
        expect(result.getErrors()).toEqual([
          new ValidationError('number precisa ser menor igual a 10!')
        ])
      })

      test('Should return false for errors if equal than 10', () => {
        const result = check(10, 'number').lessEqualThan(10)

        expect(result.hasError()).toBeFalsy()
      })

      test('Should return false for errors if less than 10', () => {
        const result = check(9, 'number').lessEqualThan(10)

        expect(result.hasError()).toBeFalsy()
      })
    })
  })

  describe(combineValidations, () => {
    test('Should combine all errors if not check', () => {
      enum sutEnum {
        VALUE_1 = 'VALUE_1',
        VALUE_2 = 'VALUE_2',
        VALUE_3 = 'VALUE_3'
      }

      const validations = combineValidations(
        check(null, 'field').required(),
        check(null, 'field').requiredIf(true),
        check('0123456789a', 'alpha_numeric').isLength({ min: 1, max: 10 }),
        check('012a', 'alpha_numeric').isLength({ min: 5, max: 10 }),
        check('123456a', 'alpha_numeric').isLength({ min: 1, max: 10 }),
        check('any_alpha_numeric', 'e-mail').isEmail(),
        check('ANY_VALUE', 'enumerator').enumType(sutEnum),
        check('not_number', 'number').number(),
        check('any_value', 'array').type('array'),
        check('any_value', 'boolean').type('boolean'),
        check({}, 'string').type('string'),
        check('321', 'number').type('number'),
        check([], 'array').filled(),
        check(1, 'number').greaterThan(10),
        check(10, 'number').greaterThan(10),
        check(1, 'number').greaterEqualThan(10),
        check(11, 'number').lessThan(10),
        check(10, 'number').lessThan(10),
        check(11, 'number').lessEqualThan(10)
      )

      expect(validations.hasError()).toBeTruthy()
      expect(validations.getErrors()).toEqual([
        new ValidationError('field é obrigatório!'),
        new ValidationError('field é obrigatório!'),
        new ValidationError('alpha_numeric precisa ser maior ou igual a 1 e menor ou igual a 10!'),
        new ValidationError('alpha_numeric precisa ser maior ou igual a 5 e menor ou igual a 10!'),
        new ValidationError('e-mail any_alpha_numeric não é válido!'),
        new ValidationError('enumerator deve ser [VALUE_1, VALUE_2, VALUE_3]'),
        new ValidationError('number não é um número!'),
        new ValidationError('array deve ser do tipo lista!'),
        new ValidationError('boolean deve ser do tipo booleano!'),
        new ValidationError('string deve ser do tipo texto!'),
        new ValidationError('number deve ser do tipo numérico!'),
        new ValidationError('array não está preenchido!'),
        new ValidationError('number precisa ser maior que 10!'),
        new ValidationError('number precisa ser maior que 10!'),
        new ValidationError('number precisa ser maior ou igual a 10!'),
        new ValidationError('number precisa ser menor que 10!'),
        new ValidationError('number precisa ser menor que 10!'),
        new ValidationError('number precisa ser menor igual a 10!')
      ])
    })

    test('Should return false for errors if checks pass', () => {
      enum sutEnum {
        VALUE_1 = 'VALUE_1',
        VALUE_2 = 'VALUE_2',
        VALUE_3 = 'VALUE_3'
      }

      const validations = combineValidations(
        check('any_value', 'field').required(),
        check(null, 'field').requiredIf(false),
        check(null, 'field').requiredIf(false),
        check('any_value', 'field').requiredIf(true),
        check('123456a', 'alpha_numeric').isLength({ min: 1, max: 10 }),
        check('jerry@mail.com', 'e-mail').isEmail(),
        check(sutEnum.VALUE_1, 'enumerator').enumType(sutEnum),
        check('123', 'number').number(),
        check(123, 'number').number(),
        check([], 'array').type('array'),
        check(false, 'boolean').type('boolean'),
        check('any_text', 'string').type('string'),
        check(123, 'number').type('number'),
        check([0, 1, 2, 3], 'array').filled(),
        check(11, 'number').greaterThan(10),
        check(10, 'number').greaterEqualThan(10),
        check(11, 'number').greaterEqualThan(10),
        check(9, 'number').lessThan(10),
        check(10, 'number').lessEqualThan(10),
        check(9, 'number').lessEqualThan(10)
      )

      expect(validations.hasError()).toBeFalsy()
    })
  })
})
