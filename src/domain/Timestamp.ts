import { combineValidations } from '../validation/combine-validations'
import { check } from '../validation/check'
import { DateTimeUtils } from '../core/DateTimeUtils'
import { ValueObject } from './ValueObject'
import { TextHelper } from '..'

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

  getYear (): string {
    return TextHelper.fillLeftSide(
      this.props.datetime.getFullYear().toString(), 4, '0'
    ).substring(2, 4)
  }

  getFullYear (): string {
    return TextHelper.fillLeftSide(this.props.datetime.getFullYear().toString(), 4, '0')
  }

  getMonth (): string {
    return TextHelper.fillLeftSide((this.props.datetime.getMonth() + 1).toString(), 2, '0')
  }

  getDay (): string {
    return TextHelper.fillLeftSide(this.props.datetime.getDate().toString(), 2, '0')
  }

  getHour (): string {
    return TextHelper.fillLeftSide(this.props.datetime.getHours().toString(), 2, '0')
  }

  getMinute (): string {
    return TextHelper.fillLeftSide(this.props.datetime.getMinutes().toString(), 2, '0')
  }

  getSecond (): string {
    return TextHelper.fillLeftSide(this.props.datetime.getSeconds().toString(), 2, '0')
  }

  getMillisecond (): string {
    return TextHelper.fillLeftSide(this.props.datetime.getMilliseconds().toString(), 3, '0')
  }

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

  toLocaleString (locale: string, timeZone: string): string {
    return this.props.datetime.toLocaleString(locale, { timeZone })
  }
}
