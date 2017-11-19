import React, { PureComponent } from 'react'

import styled from 'styled-components'

import GoBackButton from '@components/GoBackButton'

const Section = styled.section`
  background: white;
  bottom: 0;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 5px;
  height: 100%;
  left: 0;
  position: fixed;
  right: 0;
  text-align: center;
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(200%)')};
  transition: transform 350ms ease;
  width: 100%;
  z-index: 500;
  iframe {
    width: 100%;
    height: 120%;
  }
`

class AddCard extends PureComponent {
  state = {}
  render() {
    return (
      <Section show={this.props.show}>
        <GoBackButton onClick={this.props.onClose} />
        <iframe
          title="asdfsad"
          src="https://amarofashion.github.io/react-credit-cards/"
          frameborder="0"
        />
      </Section>
    )
  }
}

export default AddCard
