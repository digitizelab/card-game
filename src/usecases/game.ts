import { Card, Deck, Player } from '@/usecases'

export class Game {
  private readonly _deck: Deck
  private readonly _firstPlayer: Player
  private readonly _secondPlayer: Player
  private _firstPlayerDeck: Card[]
  private _secondPlayerDeck: Card[]

  constructor (firstPlayerName: string, secondPlayerName: string) {
    this._firstPlayer = new Player(firstPlayerName)
    this._secondPlayer = new Player(secondPlayerName)
    this._deck = new Deck()
  }

  /**
   * Game should start with a shuffled deck and cards should be dealt
   */
  init (): void {
    this._deck.shuffle();
    [this._firstPlayerDeck, this._secondPlayerDeck] = this._deck.deal()
  }

  /**
   * Reveal single card from each player and decide the round winner
   */
  playRound (): void {
    const [firstPlayerCard, secondPlayerCard] = [this._firstPlayerDeck.shift(), this._secondPlayerDeck.shift()]
    const roundWinner: Player = firstPlayerCard.value > secondPlayerCard.value ? this._firstPlayer : this._secondPlayer
    console.log(`Player 1: ${firstPlayerCard.value} vs Player 2: ${secondPlayerCard.value} -> ${roundWinner.name} wins`)
    roundWinner.addPoint()
  }

  /**
   * Play the game until the deck is empty
   */
  play (): void {
    this.init()

    while (this._firstPlayerDeck.length > 0) {
      this.playRound()
    }

    // Print final scores and who won the game
    console.log('<=========== Game Over ===========>')
    console.log(`Score: ${this._firstPlayer.name}: ${this._firstPlayer.points}, ${this._secondPlayer.name}: ${this._secondPlayer.points}`)
    if (this._firstPlayer.points > this._secondPlayer.points) {
      console.log(`${this._firstPlayer.name} wins!`)
    } else if (this._secondPlayer.points > this._firstPlayer.points) {
      console.log(`${this._secondPlayer.name} wins!`)
    } else {
      console.log('Draw!')
    }
  }
}
