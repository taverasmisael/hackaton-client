import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import Input from '@components/Input'

import { ProcessLogin, SaveUser, IsAuthorized } from '@services/auth'

const Section = styled.section`
  background: white;
  display: grid;
  grid-template-columns: minmax(60%, 1fr) minmax(40%, 1fr);
  grid-gap: 1em;
`
const Logo = styled.img`width: 1.5em;`

const Header = styled.header`padding: 0.135rem;`

const Form = styled.form`
  background: rgba(139, 150, 255, 0.61);
  padding: 1.5rem;
  input {
    border-color: #fff;
    background: #fff;
  }

  label {
    color: rgba(0, 0, 0, 0.5);
  }
`

const Button = styled.button`
  background: white;
  display: block;
  border: 5px solid #b360ff;
  border-radius: 1.3em;
  text-transform: uppercase;
  color: #8b96ff;
  margin: 0 auto;
  padding: 1em 3em;
  line-height: 1;
`

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
      <div>
        <Header>
          <Logo src="//unsplash.it/200/200" alt="" />
        </Header>
        <Section>
          <div className="illustration" />
          <Form onSubmit={onSubmit}>
            <Input
              oposite
              label="Cedula"
              id="Cedula"
              type="text"
              value={credentials.cedula}
              onChange={onChangeInput('cedula')}
            />
            <Input
              oposite
              label="Contraseña"
              id="password"
              type="Password"
              value={credentials.password}
              onChange={onChangeInput('password')}
            />
            <Button type="submit">Ingresar</Button>
          </Form>
        </Section>
      </div>
    )
  }
}
