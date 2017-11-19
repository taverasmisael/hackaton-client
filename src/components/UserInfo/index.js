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
  position: relative;
  :hover {
    text-decoration: underline;
  }
`

const StyledUserInfo = styled.div`
  background: white;
  bottom: ${({ showPasswordForm }) => (showPasswordForm ? '0' : '-15%')};
  box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 5px;
  left: 25%;
  position: absolute;
  text-align: center;
  transition: bottom 350ms ease;
  width: 50%;

  .UserName {
    margin-top: 1.5rem;
    line-height: 1;
    margin-bottom: 0;
  }
`

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;
  padding: 1.5rem;
  width: 100%;
  input {
    border-radius: 0;
    background: rgba(75, 70, 104, 0.2);
    color: #4b4668;
    padding: 0.5rem;
    width: 100%;
    border: 0;
  }
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
          <Button
            type="button"
            onClick={() =>
              this.setState(state => ({ ...state, editingPassword: !state.editingPassword }))}
          >
            Cambiar contraseña
          </Button>
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
        </Form>
      </StyledUserInfo>
    )
  }
}

export default UserInfo
