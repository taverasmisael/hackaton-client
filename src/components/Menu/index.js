import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { FiltersCode } from '@services/api'

import UserInfo from '@components/UserInfo'

const StyledFilter = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  bottom: ${({ show }) => (show ? '0' : '100%')};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  transition: bottom 450ms ease;
  width: 100%;
  z-index: 100;
`

const Options = styled.ul`
  align-items: center;
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0 auto;
  width: 50%;
`
const Option = styled.li`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex: 1 0 25%;
  flex-flow: column nowrap;
  justify-content: center;
  margin: 0 0.75rem;
  padding: 1.5rem;
  text-align: center;

  .icon {
    --icon-size: 8em;
    width: var(--icon-size);
    height: var(--icon-size);
    border-radius: 50%;
    margin-bottom: 1.5rem;
  }
  .text {
    font-weigth: 700;
    color: #121212;
  }
`

const Menu = ({ onSelectFilter, currentFilter, show, onMenuClick, userinfo }) => (
  <StyledFilter show={show}>
    <Options show={show}>
      <Option onClick={onSelectFilter(FiltersCode.ALL)}>
        <img
          src="https://lh3.ggpht.com/2zNe_jxhlnO25cmRq8k_udYa9jB5_En37v76oB27dYJrr9veXhGf6A1ih-l4Glqjo0SQ=w300"
          alt=""
          className="icon"
        />
        <span className="text">Todos</span>
      </Option>
      <Option onClick={onSelectFilter(FiltersCode.OUTDATED)}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Circle-icons-camera.svg/1024px-Circle-icons-camera.svg.png"
          alt=""
          className="icon"
        />
        <span className="text">Vencidos</span>
      </Option>
      <Option onClick={onSelectFilter(FiltersCode.UPDATED)}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Circle-icons-weather.svg/1024px-Circle-icons-weather.svg.png"
          alt=""
          className="icon"
        />
        <span className="text">Al Día</span>
      </Option>
    </Options>
    <UserInfo info={userinfo} />
  </StyledFilter>
)

Menu.propTypes = {
  onSelectFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.oneOf(Object.values(FiltersCode)),
  userinfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cedula: PropTypes.string.isRequired
  })
}

export default Menu
