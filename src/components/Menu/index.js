import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { FiltersCode } from '@services/api'

import UserInfo from '@components/UserInfo'

import AllIcon from '../../assets/Todos@300x.png'
import OutdatedIcon from '../../assets/Moroso@300x.png'
import UpdatedIcon from '../../assets/Al dia @300x.png'

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
  background: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 5px;
  border-radius: .5rem;

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
      <Option onClick={onSelectFilter(FiltersCode.UPDATED)}>
        <img src={UpdatedIcon} alt="" className="icon" />
        <span className="text">Al Día</span>
      </Option>
      <Option onClick={onSelectFilter(FiltersCode.OUTDATED)}>
        <img src={OutdatedIcon} alt="" className="icon" />
        <span className="text">Vencidos</span>
      </Option>
      <Option onClick={onSelectFilter(FiltersCode.ALL)}>
        <img src={AllIcon} alt="" className="icon" />
        <span className="text">Todos</span>
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
