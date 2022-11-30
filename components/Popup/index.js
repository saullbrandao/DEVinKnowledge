export const createPopup = popupMessage => {
  const popup = document.createElement('div')
  popup.id = 'popup'

  const closePopupButton = document.createElement('button')
  closePopupButton.type = 'button'
  closePopupButton.classList.add('closePopupButton')
  closePopupButton.innerHTML = `<img src="../../images/close.svg" alt="close" />`
  closePopupButton.onclick = closePopup

  let popupContent = ''

  if (Array.isArray(popupMessage)) {
    popupMessage.forEach(message => (popupContent += `<p>${message}</p>`))
  } else {
    popupContent = `<p>${popupMessage}</p>`
  }

  popup.innerHTML = `
  <div class="popup-content">
    ${popupContent}
  </div>  
  `
  popup.appendChild(closePopupButton)
  popup.classList.add('popup', 'popup-show')

  document.body.appendChild(popup)

  setTimeout(closePopup, 3000)
}

const closePopup = () => {
  const popup = document.getElementById('popup')

  popup.classList.replace('popup-show', 'popup-close')

  popup.addEventListener('animationend', () => popup.remove())
}
