export const createModal = modalMessage => {
  const modal = document.createElement('div')

  const closeModalButton = document.createElement('button')
  closeModalButton.type = 'button'
  closeModalButton.classList.add('closeModalButton')
  closeModalButton.innerHTML = `<img src="../images/close.svg" alt="close" />`
  closeModalButton.onclick = closeModal

  let modalContent = ''

  if (Array.isArray(modalMessage)) {
    modalMessage.forEach(message => (modalContent += `<p>${message}</p>`))
  } else {
    modalContent = `<p>${modalMessage}</p>`
  }

  modal.innerHTML = `
  <div class="modal-content">
    ${modalContent}
  </div>  
  `
  modal.appendChild(closeModalButton)
  modal.classList.add('modal', 'modal-show')

  document.body.appendChild(modal)
}

const closeModal = () => {
  const modal = document.querySelector('.modal')
  modal.classList.replace('modal-show', 'modal-close')

  modal.addEventListener('animationend', () => modal.remove())
}
