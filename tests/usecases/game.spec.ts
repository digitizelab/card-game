import { Card, Game } from '@/usecases'

describe('Game', () => {
  let game: Game

  beforeEach(() => {
    game = new Game('Alfred', 'Robert')
  })

  describe('init', () => {
    it('should shuffle the deck and deal the cards', () => {
      const deckSpy = jest.spyOn(game['_deck'], 'shuffle')
      const dealSpy = jest.spyOn(game['_deck'], 'deal').mockReturnValue([[new Card(1)], [new Card(2)]])

      game.init()

      expect(deckSpy).toHaveBeenCalledTimes(1)
      expect(dealSpy).toHaveBeenCalledTimes(1)
      expect(game['_firstPlayerDeck']).toEqual([new Card(1)])
      expect(game['_secondPlayerDeck']).toEqual([new Card(2)])
    })
  })

  describe('playRound', () => {
    beforeEach(() => {
      game['_firstPlayerDeck'] = [new Card(2)]
      game['_secondPlayerDeck'] = [new Card(1)]
    })

    it('should play a round and update the score', () => {
      const addPointSpy = jest.spyOn(game['_firstPlayer'], 'addPoint')

      game.playRound()

      expect(addPointSpy).toHaveBeenCalledTimes(1)
      expect(game['_firstPlayer'].points).toBe(1)
      expect(game['_secondPlayer'].points).toBe(0)
    })

    it('should log the result of the round', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

      game.playRound()

      expect(logSpy).toHaveBeenCalledTimes(1)
      expect(logSpy).toHaveBeenCalledWith('Player 1: 2 vs Player 2: 1 -> Alfred wins')

      logSpy.mockRestore()
    })
  })

  describe('play', () => {
    it('should play a full game and determine the winner', () => {
      const deckSpy = jest.spyOn(game['_deck'], 'deal').mockReturnValue(
        [[new Card(1), new Card(2)], [new Card(3), new Card(4)]]
      )
      const playRoundSpy = jest.spyOn(game, 'playRound')

      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

      game.play()

      expect(deckSpy).toHaveBeenCalledTimes(1)
      expect(playRoundSpy).toHaveBeenCalledTimes(2)

      expect(logSpy).toHaveBeenCalledTimes(5)
      expect(logSpy).toHaveBeenNthCalledWith(1, 'Player 1: 1 vs Player 2: 3 -> Robert wins')
      expect(logSpy).toHaveBeenNthCalledWith(2, 'Player 1: 2 vs Player 2: 4 -> Robert wins')
      expect(logSpy).toHaveBeenNthCalledWith(5, expect.stringContaining('wins!'))

      logSpy.mockRestore()
    })

    it('first player wins as well', () => {
      const deckSpy = jest.spyOn(game['_deck'], 'deal').mockReturnValue(
        [[new Card(3), new Card(4)], [new Card(1), new Card(2)]]
      )
      const playRoundSpy = jest.spyOn(game, 'playRound')

      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

      game.play()

      expect(logSpy).toHaveBeenCalledTimes(5)
      expect(logSpy).toHaveBeenNthCalledWith(1, 'Player 1: 3 vs Player 2: 1 -> Alfred wins')
      expect(logSpy).toHaveBeenNthCalledWith(2, 'Player 1: 4 vs Player 2: 2 -> Alfred wins')
      expect(logSpy).toHaveBeenNthCalledWith(5, expect.stringContaining('wins!'))

      logSpy.mockRestore()
    })

    it('should be draw if scores are same', () => {
      const deckSpy = jest.spyOn(game['_deck'], 'deal').mockReturnValue(
        [[new Card(1), new Card(3)], [new Card(4), new Card(2)]]
      )
      const playRoundSpy = jest.spyOn(game, 'playRound')

      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

      game.play()

      expect(logSpy).toHaveBeenCalledTimes(5)
      expect(logSpy).toHaveBeenNthCalledWith(1, 'Player 1: 1 vs Player 2: 4 -> Robert wins')
      expect(logSpy).toHaveBeenNthCalledWith(2, 'Player 1: 3 vs Player 2: 2 -> Alfred wins')
      expect(logSpy).toHaveBeenNthCalledWith(5, expect.stringContaining('Draw!'))

      logSpy.mockRestore()
    })
  })
})
