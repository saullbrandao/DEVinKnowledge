export const createPopup = popupMessage => {
  const popup = document.createElement('div')
  popup.id = 'popup'

  const closePopupButton = document.createElement('button')
  closePopupButton.type = 'button'
  closePopupButton.classList.add('closePopupButton')
  closePopupButton.innerHTML = `<img src="../images/close.svg" alt="close" />`
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
}

const closePopup = () => {
  const popup = document.getElementById('popup')

  popup.classList.replace('popup-show', 'popup-close')

  popup.addEventListener('animationend', () => popup.remove())
}

export const createVideoPopup = url => {
  const popup = document.createElement('div')
  popup.id = 'popup'

  const closePopupButton = document.createElement('button')
  closePopupButton.type = 'button'
  closePopupButton.classList.add('closePopupButton')
  closePopupButton.innerHTML = `<img src="../images/close.svg" alt="close" />`
  closePopupButton.onclick = closePopup

  popup.innerHTML = `<iframe class="videoIframe" src="${url}"></iframe>`

  popup.appendChild(closePopupButton)
  popup.classList.add('videoPopup', 'popup-show')

  document.body.appendChild(popup)
}
