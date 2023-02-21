import 'module-alias/register'
import { Game } from '@/usecases'

const game = new Game('Alfred', 'Robert')
game.play()
