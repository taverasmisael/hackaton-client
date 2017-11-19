import React, { PureComponent } from 'react'
import styled from 'styled-components'

import PropTypes from 'prop-types'
import { MorphReplace } from 'react-svg-morph'

import { IsNightTime } from '@services/utilities'

const StyledButton = styled.button`
  --icon-size: 3em;
  background: transparent;
  border: 0;
  box-shadow: none;
  line-height: 1;
  outline: 0;
  padding: 1em;
  position: fixed;
  right: calc(50% - calc(var(--icon-size) + 1em));
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
      <svg widht="16" height="16" viewBox="0 0 32 32">
        <path d="M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z" />
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

const MenuButton = ({ onClick, isOpen }) => (
  <StyledButton onClick={onClick} isOpen={isOpen}>
    <MorphReplace  duration={600}>{isOpen ? <CrossIcon key="0" /> : <MenuIcon key="1" />}</MorphReplace>
  </StyledButton>
)

MenuButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default MenuButton
