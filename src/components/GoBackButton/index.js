import React, { PureComponent } from 'react'
import styled from 'styled-components'

import PropTypes from 'prop-types'
import { MorphReplace } from 'react-svg-morph'

const StyledButton = styled.button`
  --icon-size: 3em;
  background: transparent;
  border: 0;
  box-shadow: none;
  line-height: 1;
  outline: 0;
  padding: 1em;
  position: absolute;
  left: 1.5rem;
  top: 1.5rem;
  z-index: 200;
  svg {
    fill: #323232;
    height: var(--icon-size);
    line-height: 1;
    width: var(--icon-size);
    transition: fill 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`

StyledButton.displayName = 'StyledButton'

class CrossIcon extends PureComponent {
  render() {
    return (
      <svg widht="16" height="16" viewBox="0 0 1792 1792">
        <path d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z" />
      </svg>
    )
  }
}

class MenuIcon extends PureComponent {
  render() {
    return (
      <svg widht="16" height="16" viewBox="0 0 32 32">
        <path d="M7.226 12.077c0.698-0.714 1.669-0.77 2.522 0l6.253 5.995 6.253-5.995c0.853-0.77 1.826-0.714 2.518 0 0.698 0.712 0.653 1.915 0 2.584-0.65 0.669-7.512 7.203-7.512 7.203-0.347 0.357-0.803 0.536-1.259 0.536s-0.912-0.179-1.262-0.536c0 0-6.859-6.534-7.512-7.203-0.654-0.669-0.698-1.872 0-2.584z" />
      </svg>
    )
  }
}

const GoBackButton = ({ onClick, isOpen }) => (
  <StyledButton onClick={onClick} isOpen={isOpen}>
    <MorphReplace duration={600}>
      {isOpen ? <MenuIcon key="1" /> : <CrossIcon key="0" />}
    </MorphReplace>
  </StyledButton>
)

GoBackButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default GoBackButton
