import { generateID } from './utils.js'

const tips = [
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

  alert('Dica cadastrada')
})

const renderCards = tips => {
  cardList.replaceChildren()

  tips.forEach(tip => renderCard(tip))
}

const renderCard = tip => {
  const card = document.createElement('li')
  card.classList.add('card')

  card.innerHTML = `<h3 class="card-title">${tip.title}</h3>
    <p><b>Linguagem/Skill: </b>${tip.language}</p>
    <p><b>Categoria: </b>${tip.category}</p>
    <p>${tip.description}</p>
    <div class="card-controls">
      <button class="card-button button-delete" type="button">
      <img src="images/trash.svg" alt="deletar" />
      </button>
      <button class="card-button button-edit" type="button">
      <img src="images/edit.svg" alt="editar" />
      </button>
    </div>
    `

  if (tip.videoURL) {
    const videoButton = document.createElement('button')
    videoButton.classList.add('card-button', 'button-video')
    videoButton.type = 'button'
    videoButton.innerHTML = `<img src="images/video.svg" alt="video" />`

    card.lastElementChild.appendChild(videoButton)
  }

  cardList.appendChild(card)
}
