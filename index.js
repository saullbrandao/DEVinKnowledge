import { renderCard } from './components/Card/index.js'
import { renderCards } from './components/CardList/index.js'
import { renderStats } from './components/StatsList/index.js'
import { generateID, loadFromLocalStorage } from './scripts/utils.js'
import { addTip, addTips, editTip, searchTips, tips } from './scripts/tips.js'

document.body.onload = () => {
  const localStorageTips = loadFromLocalStorage()
  addTips(localStorageTips)

  renderCards(tips)
  renderStats(tips)
}

const searchForm = document.getElementById('search-form')
searchForm.addEventListener('submit', event => {
  event.preventDefault()

  const searchTerm = event.target.search.value
  const filteredTips = searchTips(searchTerm)

  renderCards(filteredTips)
})

searchForm.addEventListener('reset', () => {
  renderCards(tips)
})

const tipsForm = document.getElementById('tips-form')
tipsForm.addEventListener('submit', event => {
  event.preventDefault()

  const newTip = {
    title: event.target.title.value,
    language: event.target.language.value,
    category: event.target.category.value,
    description: event.target.description.value,
    videoURL: event.target.videoURL.value,
  }

  const tipIDInput = event.target.tipID

  const isEditing = tipIDInput.value

  if (isEditing) {
    newTip.id = tipIDInput.value
    editTip(newTip)
  } else {
    newTip.id = generateID(title)
    addTip(newTip)
  }

  renderCard(newTip)

  tipIDInput.value = ''
  tipsForm.reset()
})
