// https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13#comment-1ol48
export const generateID = () =>
  `${Date.now().toString(32)}${Math.random().toString(32)}`.replace('.', '')
