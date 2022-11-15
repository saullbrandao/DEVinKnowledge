import { generateID } from './utils.js'

const tips = []

const tipsForm = document.getElementById('tips-form')

tipsForm.addEventListener('submit', event => {
  event.preventDefault()

  const newTip = {
    id: generateID(title),
    title: event.target.title.value,
    language: event.target.language.value,
    category: event.target.category.value,
    description: event.target.description.value,
    videoURL: event.target.videoURL.value,
  }

  tips.push(newTip)

  tipsForm.reset()
})
