import React, { PureComponent } from 'react'
import Input from '@components/Input'

import { ProcessLogin } from '@services/auth'
export default class Login extends PureComponent {
  state = {
    credentials: {
      cedula: '',
      password: ''
    }
  }

  onChangeInput = key => ({ target: { value } }) =>
    this.setState(state => ({
      ...state,
      credentials: {
        ...state.credentials,
        [key]: value
      }
    }))

  onSubmit = event => {
    event.preventDefault()
    const { credentials } = this.state
    ProcessLogin(credentials)
      .then(() => {
        console.log('Success!')
      })
      .catch(err => console.error('ERROR', err))
  }
  render() {
    const { credentials } = this.state
    const { onChangeInput, onSubmit } = this
    return (
      <section>
        <form onSubmit={onSubmit}>
          <Input
            label="Cedula"
            id="Cedula"
            type="text"
            value={credentials.cedula}
            onChange={onChangeInput('cedula')}
          />
          <Input
            label="Contraseña"
            id="password"
            type="Password"
            value={credentials.password}
            onChange={onChangeInput('password')}
          />
          <button type="submit">Ingresar</button>
        </form>
      </section>
    )
  }
}
