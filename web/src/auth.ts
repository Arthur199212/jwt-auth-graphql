export const URL_REFRESH_TOKEN = 'http://localhost:3001/refresh_token'

let accesToken = ''

export const setAccessToken = (token: string) => accesToken = token

export const getAccessToken = () => accesToken
