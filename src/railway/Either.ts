export type Either<L, A> = Left<L, A> | Right<L, A>

export class Left<L, A> {
  private readonly value: L

  constructor (value: L) {
    this.value = value
  }

  getValue (): L {
    return this.value
  }

  isLeft (): this is Left<L, A> {
    return true
  }

  isRight (): this is Right<L, A> {
    return false
  }
}

export class Right<L, A> {
  private readonly value: A

  constructor (value: A) {
    this.value = value
  }

  getValue (): A {
    return this.value
  }

  isLeft (): this is Left<L, A> {
    return false
  }

  isRight (): this is Right<L, A> {
    return true
  }
}

export const left = <L, A>(l?: L): Either<L | null, A> => {
  return new Left(l || null)
}

export const right = <L, A>(a?: A): Either<L, A | null> => {
  return new Right(a || null)
}
