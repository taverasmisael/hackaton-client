import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

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
  bottom: 0;
  color: #fff;
  left: 0;
  padding: 1.5rem;
  position: absolute;
  text-align: center;
  width: 100%;

  .UserName {
    margin-bottom: 0.5em;
  }
`

class UserInfo extends PureComponent {
  static propTypes = {
    info: PropTypes.shape({
      name: PropTypes.string.isRequired,
      cedula: PropTypes.string.isRequired
    })
  }
  render() {
    const { info = {} } = this.props
    return (
      <StyledUserInfo className="UserInfo">
        <h4 className="UserName">
          {info.name}
          <small>{info.cedula}</small>
        </h4>
        <small>
          <Button type="button">Cambiar contraseña</Button>
        </small>
      </StyledUserInfo>
    )
  }
}

export default UserInfo
