import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import Input from '@components/Input'

import { ProcessLogin, SaveUser, IsAuthorized } from '@services/auth'
export default class Login extends PureComponent {
  state = {
    credentials: {
      cedula: '',
      password: ''
    },
    isAuthenticated: false
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
      .then(userdata => {
        SaveUser(userdata)
        this.setState({
          isAuthenticated: true
        })
      })
      .catch(err => console.error('ERROR', err))
  }

  componentDidMount() {
    this.setState({
      isAuthenticated: IsAuthorized()
    })
  }

  render() {
    const { credentials, isAuthenticated } = this.state
    const { onChangeInput, onSubmit } = this
    return isAuthenticated ? (
      <Redirect to="/map" />
    ) : (
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
