export class Card {
  private readonly _value: number

  constructor (value: number) {
    this._value = value
  }

  get value (): number {
    return this._value
  }
}
