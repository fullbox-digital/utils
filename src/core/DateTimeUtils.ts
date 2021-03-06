interface ShiftDateOptions {
  year?: number
  month?: number
  day?: number
  hour?: number
  minute?: number
  second?: number
  millisecond?: number
}

export abstract class DateTimeUtils {
  static getNow (): Date {
    return new Date()
  }

  static shiftYears (date: Date, quantity: number): Date {
    return this.shift(date, { year: quantity })
  }

  static shiftMonths (date: Date, quantity: number): Date {
    return this.shift(date, { month: quantity })
  }

  static shiftDates (date: Date, quantity: number): Date {
    return this.shift(date, { day: quantity })
  }

  static shiftHour (date: Date, quantity: number): Date {
    return this.shift(date, { hour: quantity })
  }

  static shiftMinutes (date: Date, quantity: number): Date {
    return this.shift(date, { minute: quantity })
  }

  static shiftSeconds (date: Date, quantity: number): Date {
    return this.shift(date, { second: quantity })
  }

  static shiftMilliseconds (date: Date, quantity: number): Date {
    return this.shift(date, { millisecond: quantity })
  }

  private static shift (date: Date, options: ShiftDateOptions): Date {
    return new Date(
      date.getFullYear() + (options.year ?? 0),
      date.getMonth() + (options.month ?? 0),
      date.getDate() + (options.day ?? 0),
      date.getHours() + (options.hour ?? 0),
      date.getMinutes() + (options.minute ?? 0),
      date.getSeconds() + (options.second ?? 0),
      date.getMilliseconds() + (options.millisecond ?? 0)
    )
  }
}
