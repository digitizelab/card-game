import { Card } from '@/usecases'

export class Deck {
  private readonly _cards: Card[]

  constructor () {
    this._cards = []
    for (let i = 1; i <= 52; i++) {
      this._cards.push(new Card(i))
    }
  }

  get cards (): Card[] {
    return this._cards
  }

  /**
   * Shuffled using Fisher-Yates shuffle
   * https://medium.com/@oldwestaction/randomness-is-hard-e085decbcbb2
   */
  shuffle (): void {
    for (let i = this._cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._cards[i], this._cards[j]] = [this._cards[j], this._cards[i]]
    }
  }

  deal (): [Card[], Card[]] {
    const deck1: Card[] = this._cards.slice(0, this._cards.length / 2)
    const deck2: Card[] = this._cards.slice(this._cards.length / 2)
    return [deck1, deck2]
  }
}
