// https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13#comment-1ol48
export const generateID = () =>
  `${Date.now().toString(32)}${Math.random().toString(32)}`.replace('.', '')

export const saveToLocalStorage = tips =>
  localStorage.setItem('tips', JSON.stringify(tips))

export const loadFromLocalStorage = () => {
  if (localStorage.getItem('tips')) {
    const localStorageClients = JSON.parse(localStorage.getItem('tips'))

    return localStorageClients
  }

  return []
}
