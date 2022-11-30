import { renderCard } from '../Card/index.js'

export const cardList = document.getElementById('card-list')

export const renderCards = tips => {
  cardList.replaceChildren()

  if (tips.length === 0) {
    return renderEmptyState()
  }

  tips.forEach(tip => renderCard(tip))
}

export const renderEmptyState = () => {
  const emptyState = document.createElement('p')
  emptyState.innerText = 'Nenhuma dica cadastrada...'
  emptyState.id = 'empty-state'
  cardList.appendChild(emptyState)
}

export const removeEmptyState = () => {
  const emptyState = document.getElementById('empty-state')
  emptyState?.remove()
}
