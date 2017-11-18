import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Section = styled.section`
  background-color: var(--main-app-color, #7f6);
  display: flex;
  height: 100vh;
  padding: 1.5rem;
  width: 100vw;
`

export default class SplashScreen extends PureComponent {
  state = {}
  render() {
    return <Section>Lol</Section>
  }
}
