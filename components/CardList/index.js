import { renderCard } from '../Card/index.js'

export const cardList = document.getElementById('card-list')

export const renderCards = tips => {
  cardList.replaceChildren()

  tips.forEach(tip => renderCard(tip))
}
