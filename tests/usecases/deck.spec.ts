import { Card, Deck } from '@/usecases'

describe('Deck', () => {
  describe('shuffle', () => {
    it('should shuffle the deck', () => {
      const deck = new Deck()
      const originalCards = [...deck.cards]
      deck.shuffle()
      expect(deck.cards).not.toEqual(originalCards)
      expect(deck.cards.sort((a, b) => a.value - b.value)).toEqual(originalCards)
    })
  })

  describe('deal', () => {
    it('should deal half the deck to each player', () => {
      const deck = new Deck()
      const [deck1Cards, deck2Cards] = deck.deal()
      expect(deck1Cards.length).toBe(26)
      expect(deck2Cards.length).toBe(26)
      expect(deck1Cards.concat(deck2Cards).sort((a, b) => a.value - b.value)).toEqual(deck.cards)
    })

    it('deals mutually exclusive cards to each player', () => {
      const deck = new Deck()
      const [deck1Cards, deck2Cards] = deck.deal()
      const allCards: Card[] = [...deck1Cards, ...deck2Cards]
      const uniqueCards: Set<Card> = new Set(allCards)
      expect(uniqueCards.size).toBe(52)
    })
  })
})
