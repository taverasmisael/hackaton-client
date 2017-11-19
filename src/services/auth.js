import { post } from 'axios'
import LocalStorage from './LocalStorage'

const Storage = new LocalStorage('Auth')
export const ProcessLogin = async ({ cedula, password, userType }) => {
  try {
    const body = new FormData()
    body.append('cedula', cedula)
    body.append('password', password)
    body.append('user_type_id', userType)

    const response = await post(`/login`, body)
    return response.data
  } catch (err) {
    throw err
  }
}

export const IsAuthorized = () => !!Storage.get('user')

export const SaveUser = userinfo => {
  Storage.set('user', userinfo)
}

export const GetUser = () => Storage.get('user')

export const LogOut = () => {
  Storage.remove('user')
  window.location = '/'
}
