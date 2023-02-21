import 'module-alias/register'
import Card from '@/usecases/card'

const card = new Card(1)
console.log(card.value)
