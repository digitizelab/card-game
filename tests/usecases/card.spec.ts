import { Card } from '@/usecases'

describe('Card', () => {
  describe('value', () => {
    it('should return the value of the card', () => {
      const card = new Card(1)
      expect(card.value).toBe(1)
    })
  })
})
