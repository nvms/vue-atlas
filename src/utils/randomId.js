export const randomID = () => {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < 5; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }

  return text.toLowerCase()
}
