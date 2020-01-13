export const URL_REFRESH_TOKEN = 'http://localhost:3001/refresh_token'

let accesToken = ''

export const setAccessToken = (token: string) => accesToken = token

export const getAccessToken = () => accesToken

export const refreshAccessToken = async (refetch?: any) => {
  try {
    const res = await fetch(URL_REFRESH_TOKEN, {
      method: 'POST',
      credentials: 'include'
    })
    
    const { accessToken } = await res.json()

    setAccessToken(accessToken)

    if (refetch) await refetch()
  } catch (err) {
    console.log(err.message)
  }
}
