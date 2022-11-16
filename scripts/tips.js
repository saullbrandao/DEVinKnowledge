import { createModal } from '../components/Modal/index.js'
import { renderStats } from '../components/StatsList/index.js'
import { saveToLocalStorage } from './utils.js'

export let tips = []

export const addTips = tipsList => {
  tips.push(...tipsList)
}

export const addTip = tip => {
  tips.push(tip)

  saveToLocalStorage(tips)
  createModal('Dica cadastrada com sucesso')
}

export const editTip = editedTip => {
  const updatedTips = tips.map(tip =>
    tip.id === editedTip.id ? editedTip : tip
  )

  tips = updatedTips
  saveToLocalStorage(tips)
  createModal('Dica editada com sucesso')
}

export const deleteTip = id => {
  const confirmed = window.confirm('Tem certeza que deseja deletar esta dica?')

  if (confirmed) {
    tips = tips.filter(tip => tip.id !== id)
    saveToLocalStorage(tips)

    const card = document.getElementById(id)
    card.remove()

    renderStats(tips)
    createModal('Dica deletada com sucesso')
  }
}

export const openTipOnForm = id => {
  const tip = tips.find(tip => tip.id === id)

  const tipID = document.getElementById('tipID')
  tipID.value = tip.id

  const title = document.getElementById('title')
  title.value = tip.title

  const language = document.getElementById('language')
  language.value = tip.language

  const category = document.getElementById('category')
  category.value = tip.category

  const description = document.getElementById('description')
  description.value = tip.description

  const videoURL = document.getElementById('videoURL')
  videoURL.value = tip.videoURL || ''
}

export const searchTips = searchTerm => {
  const filteredTips = tips.filter(tip =>
    tip.title.toLowerCase().includes(searchTerm)
  )

  return filteredTips
}
