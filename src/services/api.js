import { get, post } from 'axios'
export const LoadMarkers = async () => {
  try {
    const response = await get(`map`)
    return response
  } catch (err) {
    throw err
  }
}

export const ProcessLogin = async ({ cedula, password }) => {
  try {
    const body = new FormData()
    body.append('cedula', cedula)
    body.append('password', password)

    const response = await post(`/police/login`, body)
    return response
  } catch (err) {
    throw err
  }
}
