import { deleteTip, openTipOnForm, tips } from '../../tips.js'
import { cardList } from '../CardList/index.js'
import { renderStats } from '../StatsList/index.js'

export const renderCard = tip => {
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
