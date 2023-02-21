export class Player {
  private readonly _name: string
  private _points: number

  constructor (name: string) {
    this._name = name
    this._points = 0
  }

  get name (): string {
    return this._name
  }

  get points (): number {
    return this._points
  }

  addPoint (): void {
    this._points++
  }
}
