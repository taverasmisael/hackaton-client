import React, { PureComponent } from 'react'
import styled from 'styled-components'

import UpdatedIcon from '../../assets/marc verde@300x.png'
import OutdatedIcon from '../../assets/marc rojo@300x.png'

const MarkersColors = {
  UPDATED: '#6cffc0',
  OUTDATED: '#ff6060'
}

const Icons = [OutdatedIcon, UpdatedIcon]

const StyledLabel = styled.div`
  background: ${({ updated }) => (updated ? MarkersColors.UPDATED : MarkersColors.OUTDATED)};
  border-radius: 0.27em 0.27em 0 0;
  bottom: ${({ active }) => (active ? 0 : '-100%')};
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.12), 0 3px 4px rgba(0, 0, 0, 0.24);
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 2fr 1fr;
  left: 0;
  padding: 1em;
  position: fixed;
  transition: bottom 350ms ease;
  width: 100%;
  will-change: bottom;
  @media (min-width: 720px) {
    left: 25%;
    width: 50%;
  }

  .label__name {
    text-align: left;
    align-self: center;
  }

  .label__info {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 0.75rem;
  }
  .iconHolder {
    text-align: center;
  }
  .iconHolder img {
    width: 4rem;
  }
`
export default class LabelInfo extends PureComponent {
  render() {
    const {
      info: { active, user_name, marbete, matricula, vehicle_model, color },
      visible
    } = this.props

    return (
      <StyledLabel updated={active} active={visible}>
        <h3 className="label__name">
          {user_name}
          <br />
          <small>{active ? 'Al día' : 'Pendiente'}</small>
        </h3>
        <p className="label__info">
          <span>
            <strong>{vehicle_model}</strong> <small>({color})</small>
          </span>
          <small>
            <strong>Marbete:</strong> {marbete}
          </small>
          <small>
            <strong>Matricula:</strong> {matricula}
          </small>
        </p>
        <div className="iconHolder">
          <img src={Icons[active]} alt="" />
        </div>
      </StyledLabel>
    )
  }
}
