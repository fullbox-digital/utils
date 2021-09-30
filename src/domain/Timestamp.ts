import { combineValidations } from '../validation/combine-validations'
import { check } from '../validation/check'
import { DateTimeUtils } from '../core/DateTimeUtils'
import { ValueObject } from './ValueObject'

interface Props {
  timestamp: number
  datetime: Date
}

export class Timestamp extends ValueObject<Props> {
  constructor (value: number) {
    const validation = combineValidations(
      check(value, 'Timestamp').required().type('number').number()
        .validate({
          isValid: (value: number) => {
            return value.toString().length === 13
          },
          errorMessage: 'needs to have 13 digits'
        })
    )
    if (validation.hasError()) {
      throw new Error(validation.getErrors().map(err => err.message).join('; '))
    }

    super({
      timestamp: value,
      datetime: new Date(value)
    })
  }

  static now (): Timestamp {
    return new Timestamp(DateTimeUtils.getNow().getTime())
  }

  getValue (): number { return this.props.timestamp }
  getDate (): Date { return this.props.datetime }

  getYear (): number { return this.props.datetime.getFullYear() }
  getMonth (): number { return this.props.datetime.getMonth() + 1 }
  getDay (): number { return this.props.datetime.getDate() }
  getHour (): number { return this.props.datetime.getHours() }
  getMinute (): number { return this.props.datetime.getMinutes() }
  getSecond (): number { return this.props.datetime.getSeconds() }
  getMillisecond (): number { return this.props.datetime.getMilliseconds() }

  shiftYears (quantity: number): Timestamp {
    return new Timestamp(DateTimeUtils.shiftYears(this.props.datetime, quantity).getTime())
  }

  shiftMonths (quantity: number): Timestamp {
    return new Timestamp(DateTimeUtils.shiftMonths(this.props.datetime, quantity).getTime())
  }

  shiftDays (quantity: number): Timestamp {
    return new Timestamp(DateTimeUtils.shiftDates(this.props.datetime, quantity).getTime())
  }

  shiftHours (quantity: number): Timestamp {
    return new Timestamp(DateTimeUtils.shiftHour(this.props.datetime, quantity).getTime())
  }

  shiftMinutes (quantity: number): Timestamp {
    return new Timestamp(DateTimeUtils.shiftMinutes(this.props.datetime, quantity).getTime())
  }

  shiftSeconds (quantity: number): Timestamp {
    return new Timestamp(DateTimeUtils.shiftSeconds(this.props.datetime, quantity).getTime())
  }

  shiftMilliseconds (quantity: number): Timestamp {
    return new Timestamp(this.props.timestamp + quantity)
  }
}
