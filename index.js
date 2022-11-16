import {
  generateID,
  loadFromLocalStorage,
  saveToLocalStorage,
} from './utils.js'

let tips = []

const tipsForm = document.getElementById('tips-form')
const searchForm = document.getElementById('search-form')
const cardList = document.getElementById('card-list')

document.body.onload = () => {
  const localStorageTips = loadFromLocalStorage()
  tips.push(...localStorageTips)

  renderCards(tips)
  renderStats(tips)
}

searchForm.addEventListener('submit', event => {
  event.preventDefault()

  const searchTerm = event.target.search.value

  const filteredTips = tips.filter(tip =>
    tip.title.toLowerCase().includes(searchTerm)
  )

  renderCards(filteredTips)
})

searchForm.addEventListener('reset', () => {
  renderCards(tips)
})

tipsForm.addEventListener('submit', event => {
  event.preventDefault()
  let message

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
    message = 'Dica editada com sucesso'
  } else {
    newTip.id = generateID(title)
    addTip(newTip)

    message = 'Dica cadastrada com sucesso'
  }

  renderCard(newTip)

  tipIDInput.value = ''
  tipsForm.reset()

  alert(message)
})

const addTip = tip => {
  tips.push(tip)

  saveToLocalStorage(tips)
}

const editTip = editedTip => {
  const updatedTips = tips.map(tip =>
    tip.id === editedTip.id ? editedTip : tip
  )

  tips = updatedTips
  saveToLocalStorage(tips)
}

const deleteTip = id => {
  const confirmed = window.confirm('Tem certeza que deseja deletar esta dica?')

  if (confirmed) {
    tips = tips.filter(tip => tip.id !== id)
    saveToLocalStorage(tips)

    const card = document.getElementById(id)
    card.remove()

    renderStats(tips)
    alert('Dica deletada com sucesso')
  }
}

const openTipOnForm = id => {
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

const renderCards = tips => {
  cardList.replaceChildren()

  tips.forEach(tip => renderCard(tip))
}

const renderCard = tip => {
  let card
  const isEditing = document.getElementById('tipID').value

  if (isEditing) {
    card = document.getElementById(tip.id)
    card.innerHTML = ''
  } else {
    card = document.createElement('li')
  }

  card.classList.add('card')
  card.id = tip.id

  const cardTitle = document.createElement('h3')
  cardTitle.innerText = tip.title
  cardTitle.classList.add('card-title')

  const languageElement = document.createElement('p')
  languageElement.innerHTML = `<b>Linguagem/Skill: </b>${tip.language}`

  const categoryElement = document.createElement('p')
  categoryElement.innerHTML = `<b>Categoria: </b>${tip.category}`

  const descriptionElement = document.createElement('p')
  descriptionElement.innerText = tip.description

  const buttonsDiv = document.createElement('div')
  buttonsDiv.classList.add('card-controls')

  const deleteButton = document.createElement('button')
  deleteButton.classList.add('card-button', 'button-delete')
  deleteButton.type = 'button'
  deleteButton.onclick = () => deleteTip(tip.id)
  deleteButton.innerHTML = `<img src="images/trash.svg" alt="deletar" />`

  const editButton = document.createElement('button')
  editButton.classList.add('card-button', 'button-edit')
  editButton.type = 'button'
  editButton.onclick = () => openTipOnForm(tip.id)
  editButton.innerHTML = `<img src="images/edit.svg" alt="editar" />`

  buttonsDiv.appendChild(deleteButton)
  buttonsDiv.appendChild(editButton)

  if (tip.videoURL) {
    const videoButton = document.createElement('button')
    videoButton.classList.add('card-button', 'button-video')
    videoButton.type = 'button'
    videoButton.innerHTML = `<img src="images/video.svg" alt="video" />`
    videoButton.onclick = () => window.open(tip.videoURL)

    buttonsDiv.appendChild(videoButton)
  }

  card.append(
    cardTitle,
    languageElement,
    categoryElement,
    descriptionElement,
    buttonsDiv
  )

  if (!isEditing) {
    cardList.appendChild(card)
  }

  renderStats(tips)
}

const calculateStats = tips => {
  const stats = {
    total: 0,
    frontEnd: 0,
    backEnd: 0,
    fullStack: 0,
    softSkill: 0,
  }

  tips.forEach(tip => {
    switch (tip.category) {
      case 'FrontEnd':
        stats.frontEnd++
        break
      case 'BackEnd':
        stats.backEnd++
        break
      case 'FullStack':
        stats.fullStack++
        break
      case 'SoftSkills':
        stats.softSkill++
        break
    }

    stats.total++
  })

  return stats
}

const renderStats = tips => {
  const stats = calculateStats(tips)

  const statsList = document.getElementById('stats')
  statsList.replaceChildren()

  for (const [key, value] of Object.entries(stats)) {
    const capitalizedkey = key[0].toUpperCase() + key.substring(1)

    const li = document.createElement('li')
    li.classList.add('stat-item')
    li.innerHTML = `<span>${capitalizedkey}</span>
    <span>${value}</span>`

    statsList.appendChild(li)
  }
}
