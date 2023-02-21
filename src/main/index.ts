import 'module-alias/register'
import { Deck } from '@/usecases'

const deck = new Deck()
deck.shuffle()
