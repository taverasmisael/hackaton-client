import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import Input from '@components/Input'

const INTIALSTATE = {
  editingPassword: false,
  oldPassword: '1234',
  newPassword: '',
  newPasswordConfirm: ''
}

const Button = styled.button`
  border-radius: 0.35em;
  color: inherit;
  cursor: pointer;
  display: inline-block;
  padding: 0.75em 1em;
  transition: background 450ms ease;

  &:hover {
    background: #312e42;
  }
`

const StyledUserInfo = styled.div`
  background: var(--dark-app-color, red);
  bottom: ${({showPasswordForm}) => showPasswordForm ? '0' : '-15%'};
  color: #fff;
  left: 25%;
  position: absolute;
  text-align: center;
  transition: bottom 350ms ease;
  width: 50%;

  .UserName {
    margin-bottom: 0.5em;
  }
`

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr) 15%;
  grid-gap: 1em;
  padding: 1.5rem;
  width: 100%;
  .btns {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    .btn {
      cursor: pointer;
      padding: 0.75em;
      margin: 0.135em;
      color: white;
      text-transform: uppercase;
      transition: background 350ms ease;
    }
    .btn:hover {
      background: rgba(0, 0, 0, 0.2);
      background-blend-mode: multiply;
    }
  }
`

class UserInfo extends PureComponent {
  static propTypes = {
    info: PropTypes.shape({
      name: PropTypes.string.isRequired,
      cedula: PropTypes.string.isRequired
    })
  }

  state = INTIALSTATE

  onUpdatePassword = event => {
    event.preventDefault()
    this.setState(INTIALSTATE)
  }
  onInputChange = key => ({ target: { value } }) => this.setState({ [key]: value })
  render() {
    const { info = {} } = this.props
    return (
      <StyledUserInfo showPasswordForm={this.state.editingPassword} className="UserInfo">
        <h4 className="UserName">
          {info.name}
          <small>{info.cedula}</small>
        </h4>
        <small>
          <Button type="button" onClick={() => this.setState({ editingPassword: true   })}>Cambiar contraseña</Button>
        </small>
        <Form onSubmit={this.onUpdatePassword}>
          <Input
            block
            id="oldPassword"
            label="Antigua Contraseña"
            type="password"
            value={this.state.oldPassword}
            onChange={this.onInputChange('oldPassword')}
          />
          <Input
            block
            id="newPassword"
            label="Nueva Contraseña"
            type="password"
            value={this.state.newPassword}
            onChange={this.onInputChange('newPassword')}
          />
          <Input
            block
            id="newPasswordConfirm"
            label="Repetir Contraseña"
            type="password"
            value={this.state.newPasswordConfirm}
            onChange={this.onInputChange('newPasswordConfirm')}
          />
          <div className="btns">
            <button
              className="btn"
              type="reset"
              title="Cancelar"
              aria-label="Cancelar"
              onClick={this.onUpdatePassword}
            >
              Cancelar
            </button>
            <button className="btn" type="submit" title="Guardar" aria-label="Guardar">
              Guardar
            </button>
          </div>
        </Form>
      </StyledUserInfo>
    )
  }
}

export default UserInfo
