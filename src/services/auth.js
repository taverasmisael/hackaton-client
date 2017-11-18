import { post } from 'axios'
import LocalStorage from './LocalStorage'

const Storage = new LocalStorage('Auth')
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

export const IsAuthorized = () => !!Storage.get('usesr')

export const SaveUser = userinfo => {
  Storage.set('user', userinfo)
}
