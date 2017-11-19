import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import Input from '@components/Input'

import { ProcessLogin, SaveUser, IsAuthorized } from '@services/auth'

import LogIcon from '../../assets/icon log in @300x.png'
import LogoImage from '../../assets/Logo@300x.png'
import AmetImage from '../../assets/icon login amet@300x.png'
import DriverImage from '../../assets/icon login user@300x.png'
import Adorno from '../../assets/Adorno landing@300x.png'
import DriverPhraseIcon from '../../assets/pagon online @300x.png'
import AmetPhraseIcon from '../../assets/Control en tu zona @300x.png'

const Illustrations = [0, DriverImage, AmetImage]
const PhraseIcon = [0, DriverPhraseIcon, AmetPhraseIcon]
const Pharses = [
  0,
  'Ten control de tu marbete desde cualquier punto',
  'Mayor control sobre los marbetes en tu zona'
]

const Section = styled.section`
  align-items: flex-start;
  background: white;
  display: grid;
  grid-template: 'ilu ilu ilu log' 'ilu ilu ilu log' 'ilu ilu ilu log' 'fra fra fra ico';
  grid-gap: 1em;
  padding: 1.5rem;
  overflow: hidden;
  .phrase {
    grid-area: fra;
    align-self: center;
    text-align: center;
    width: 50%;
    margin: 0 auto;
    text-transform: uppercase;
    h2 {
      font-weight: 200;
    }
  }
  .ico {
    grid-area: ico;
    text-align: center;
    img {
      width: 8em;
    }
  }
`
const Logo = styled.img`
  width: 20em;
  margin-bottom: 1.5rem;
`

const Header = styled.header`
  padding: 0.135rem;
  img {
    max-width: 2.5rem;
    margin-left: 1.4rem;
  }
`

const Form = styled.form`
  background: rgba(139, 150, 255, 0.61);
  border-radius: 1.2em;
  padding: 4rem 1.5rem;
  width: 70%;
  grid-area: log;
  margin: 0 auto;
  .container {
    width: 70%;
    margin: 0 auto;
  }
  input {
    border-color: #fff;
    background: #fff;
    color: #323232;
  }

  label {
    color: rgba(0, 0, 0, 0.5);
  }
  .LogIcon {
    display: block;
    margin: 1.5rem auto;
    width: 40%;
  }
  .userType {
    display: flex;
    align-items: center;
    justify-contentf: space-between;
  }
  .userType *:first-child {
    margin-right: 1.4rem;
  }
`

const Button = styled.button`
  background: white;
  border-radius: 1.3em;
  border: 5px solid #b360ff;
  color: #8b96ff;
  display: block;
  line-height: 1;
  margin: 0 auto;
  padding: 1em 3em;
  text-transform: uppercase;
`

const Illustration = styled.div`
  grid-area: ilu;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  .illustration {
    max-width: 50%;
  }
`

export default class Login extends PureComponent {
  state = {
    credentials: {
      cedula: '',
      password: '',
      userType: 2
    },
    isAuthenticated: false
  }

  onChangeInput = key => ({ target: { value } }) =>
    this.setState(state => ({
      ...state,
      credentials: {
        ...state.credentials,
        [key]: value
      }
    }))

  onSubmit = event => {
    event.preventDefault()
    const { credentials } = this.state
    ProcessLogin(credentials)
      .then(userdata => {
        SaveUser(userdata)
        this.setState({
          isAuthenticated: true,
          redirectURL: credentials.userType === 2 ? '/map' : '/user'
        })
      })
      .catch(err => console.error('ERROR', err))
  }

  toggleUserType = () =>
    this.setState(state => ({
      ...state,
      credentials: { ...state.credentials, userType: state.credentials.userType === 1 ? 2 : 1 }
    }))

  componentDidMount() {
    this.setState({
      isAuthenticated: IsAuthorized()
    })
  }

  render() {
    const { credentials, isAuthenticated, redirectURL } = this.state
    const { onChangeInput, onSubmit } = this
    return isAuthenticated ? (
      <Redirect to={redirectURL} />
    ) : (
      <div>
        <Header>
          <img src={Adorno} alt="" />
        </Header>
        <Section>
          <Illustration>
            <Logo src={LogoImage} alt="" />
            <img src={Illustrations[credentials.userType]} alt="" class="illustration" />
          </Illustration>
          <Form onSubmit={onSubmit}>
            <div className="container">
              <Input
                oposite
                label="Cedula"
                id="Cedula"
                type="text"
                value={credentials.cedula}
                onChange={onChangeInput('cedula')}
              />
              <Input
                oposite
                label="Contraseña"
                id="password"
                type="Password"
                value={credentials.password}
                onChange={onChangeInput('password')}
              />
              <div className="userType">
                <span>Acceder como {credentials.userType === 1 ? 'Conductor' : 'Oficial'}</span>
                <label className="switch" htmlFor="checkbox">
                  <input type="checkbox" id="checkbox" onChange={this.toggleUserType} />
                  <div className="slider round" />
                </label>
              </div>
              <img src={LogIcon} alt="" class="LogIcon" />
              <Button type="submit">Ingresar</Button>
            </div>
          </Form>
          <div className="phrase">
            <h2>{Pharses[credentials.userType]}</h2>
          </div>
          <div className="ico">
            <img src={PhraseIcon[credentials.userType]} alt="" />
          </div>
        </Section>
      </div>
    )
  }
}
