import { generateID } from './utils.js'

let tips = [
  {
    id: generateID(),
    title: 'Grid vs Flex-Box',
    language: 'CSS',
    category: 'FrontEnd',
    description:
      'A diferença crucial entre flexbox e grid, além do primeiro ser unidimensional e o outro ser bi-dimensional, é que o controle do layout no grid vem do container e no flexbox vem dos elementos. A diferença crucial entre flexbox e grid, além do primeiro ser unidimensional e o outro ser bi-dimensional, é que o controle do layout no grid vem do container e no flexbox vem dos elementos. A diferença crucial entre flexbox e grid, além do primeiro ser unidimensional e o outro ser bi-dimensional, é que o controle do.',
  },
  {
    id: generateID(),
    title: 'A arte de comunicar',
    language: 'Comunicação',
    category: 'SoftSkill',
    description: `Um bom comunicador é sempre um bom ouvinte. Quem sabe ouvir não perde informações, faz perguntas apropriadas e entende seu interlocutor. 
    Você pode criar empatia com frases como “Fale mais sobre esse tópico” ou “Estou interessado no que você diz. Fale mais detalhes para entender por que você pensa assim”.`,
  },
]

const tipsForm = document.getElementById('tips-form')
const cardList = document.getElementById('card-list')

document.body.onload = () => {
  renderCards(tips)
}

tipsForm.addEventListener('submit', event => {
  event.preventDefault()

  const newTip = {
    id: generateID(title),
    title: event.target.title.value,
    language: event.target.language.value,
    category: event.target.category.value,
    description: event.target.description.value,
    // TODO: check if URL is valid
    videoURL: event.target.videoURL.value,
  }

  tips.push(newTip)

  renderCard(newTip)

  tipsForm.reset()

  alert('Dica cadastrada com sucesso')
})

const deleteTip = id => {
  const confirmed = window.confirm('Tem certeza que deseja deletar esta dica?')

  if (confirmed) {
    tips = tips.filter(tip => tip.id !== id)

    const card = document.getElementById(id)
    card.remove()

    alert('Dica deletada com sucesso')
  }
}

const renderCards = tips => {
  cardList.replaceChildren()

  tips.forEach(tip => renderCard(tip))
}

const renderCard = tip => {
  const card = document.createElement('li')
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
  editButton.onclick = () => console.log('edit')
  editButton.innerHTML = `<img src="images/edit.svg" alt="editar" />`

  buttonsDiv.appendChild(deleteButton)
  buttonsDiv.appendChild(editButton)

  if (tip.videoURL) {
    const videoButton = document.createElement('button')
    videoButton.classList.add('card-button', 'button-video')
    videoButton.type = 'button'
    videoButton.innerHTML = `<img src="images/video.svg" alt="video" />`

    buttonsDiv.appendChild(videoButton)
  }

  card.append(
    cardTitle,
    languageElement,
    categoryElement,
    descriptionElement,
    buttonsDiv
  )

  cardList.appendChild(card)
}
