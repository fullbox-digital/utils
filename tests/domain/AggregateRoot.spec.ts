import { AggregateRoot, Either, Log, right, UniqueEntityId, ValidationError } from '../../src'

interface PersonProps {
  name: string
  age: number
}

class Person extends AggregateRoot<PersonProps> {
  static create (
    props: PersonProps, id?: UniqueEntityId, logs?: Log<any>
  ): Either<ValidationError[], Person> {
    return right(new Person(props, id, logs))
  }

  changeName (name: string): Either<ValidationError[], Person> {
    return this.update<Either<ValidationError[], Person>>(
      Person.create, { name }
    )
  }

  changeAge (age: number): Either<ValidationError[], Person> {
    return this.update<Either<ValidationError[], Person>>(
      Person.create, { age }
    )
  }

  getName (): string { return this.props.name }
  getAge (): number { return this.props.age }
}

describe(AggregateRoot, () => {
  it('update name', () => {
    const person = Person.create({ name: 'Gervásio', age: 281 }).getValue() as Person

    const newPerson = person.changeName('Adolfo').getValue() as Person

    expect(newPerson.getName()).toBe('Adolfo')
    expect(newPerson.getAge()).toBe(281)
    expect(newPerson.getIdentifier()).toEqual(person.getIdentifier())
  })

  it('update age', () => {
    const person = Person.create({ name: 'Gervásio', age: 281 }).getValue() as Person

    const newPerson = person.changeAge(812).getValue() as Person

    expect(newPerson.getAge()).toBe(812)
    expect(newPerson.getName()).toBe('Gervásio')
    expect(newPerson.getIdentifier()).toEqual(person.getIdentifier())
  })

  it('keep logs', () => {
    const id = UniqueEntityId.create()
    const date = new Date()
    const person = Person.create(
      {
        name: 'Gervásio', age: 281
      },
      id,
      [{ date }]
    ).getValue() as Person

    const newPerson = person.changeAge(812).getValue() as Person

    expect(newPerson.getAge()).toBe(812)
    expect(newPerson.getName()).toBe('Gervásio')
    expect(newPerson.getIdentifier()).toEqual(id)
    expect(newPerson.getLogs()).toEqual([{ date }])
  })
})
