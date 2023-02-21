import { Player } from '@/usecases'

describe('Player', () => {
  let player: Player

  beforeEach(() => {
    player = new Player('Player1')
  })

  describe('name', () => {
    it('should return the name of the player', () => {
      expect(player.name).toBe('Player1')
    })
  })

  describe('points', () => {
    it('should initialize to 0', () => {
      expect(player.points).toBe(0)
    })
  })

  describe('addPoint', () => {
    it('should increment the points by 1', () => {
      player.addPoint()
      expect(player.points).toBe(1)
      player.addPoint()
      expect(player.points).toBe(2)
    })
  })
})
