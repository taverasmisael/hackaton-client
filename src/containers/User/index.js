import React, { PureComponent } from 'react'
import MapGL, { Marker, experimental } from 'react-map-gl'

import CityPin from '@components/CityPin'
import LabelInfo from '@components/LabelInfo'
import UserMenu from '@components/UserMenu'
import MenuButton from '@components/MenuButton'
import Payment from '@components/Payment'

import { GetMyCar } from '@services/api'
import { GetUser } from '@services/auth'

const TOKEN =
  'pk.eyJ1IjoidGF2ZXJhc21pc2FlbCIsImEiOiJjamEzenBlcjM5dTFiMzNsZ2JhcWhrYmU0In0.2cYJYBYpTYmYI75TXuc_yA' // Set your mapbox token here

class User extends PureComponent {
  state = {
    viewport: {
      latitude: 18.4708059,
      longitude: -69.886825,
      zoom: 16,
      bearing: 0,
      pitch: 0,
      width: 500,
      height: 500
    },
    popupInfo: null,
    isPaymentOpen: false,
    currentTheme: 'streets', //IsNightTime() ? 'dark' : 'streets',
    isMenuOpen: true,
    isNewCardOpen: false
  }
  componentDidMount() {
    window.addEventListener('resize', this.resize)
    this.resize()
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { longitude, latitude } = coords
      this.setState(state => ({
        ...state,
        viewport: {
          ...state.viewport,
          longitude,
          latitude
        },
        myLocation: {
          latitude,
          longitude,
          color: '#b360ff',
          id: 16518
        },
        currentUser: GetUser()
      }))
    })
  }
  resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      }
    })
  }
  renderCityMarker = city => {
    return (
      <Marker key={`marker-${city.id}`} longitude={+city.longitude} latitude={+city.latitude}>
        <CityPin color={city.color} size={20} />
      </Marker>
    )
  }
  updateViewport = viewport => {
    this.setState({ viewport })
  }

  openMenu = () => this.setState(state => ({ ...state, isMenuOpen: !state.isMenuOpen }))
  togglePaymanets = () =>
    this.setState(state => ({ ...state, isPaymentOpen: !state.isPaymentOpen }))
  toggleVisibleAddCard = () =>
    this.setState(state => ({ ...state, isNewCardOpen: !state.isNewCardOpen }))
  findMyCar = () => {
    console.log(this.state.currentUser.id)
    GetMyCar(this.state.currentUser.id)
      .then(({ latitude, longitude }) => {
        this.setState({ isMenuOpen: false }, () =>
          setTimeout(() => {
            this.setState(state => ({
              myCar: {
                latitude: +latitude,
                longitude: +longitude,
                id: 56864849
              },
              viewport: {
                ...state.viewport,
                latitude: +latitude,
                longitude: +longitude,
                zoom: 18,
                transitionInterpolator: experimental.viewportFlyToInterpolator,
                transitionDuration: 3000,
                transitionDelay: 1000
              }
            }))
          }, 350)
        )
      })
      .catch(console.error.bind(console))
  }

  onAddCard = cardinfo =>
    this.setState(state => ({ ...state, payments: [...state.payments, cardinfo] }))
  render() {
    const {
      viewport,
      currentUser,
      myCar,
      myLocation,
      popupInfo,
      currentTheme,
      isMenuOpen,
      isPaymentOpen,
      isNewCardOpen
    } = this.state
    return (
      <div>
        <MapGL
          {...viewport}
          onClick={() => this.setState({ popupInfo: null })}
          onViewportChange={this.updateViewport}
          mapStyle={`mapbox://styles/mapbox/${currentTheme}-v9`}
          mapboxApiAccessToken={TOKEN}
        >
          {myCar ? this.renderCityMarker(myCar) : null}
          {myLocation ? this.renderCityMarker(myLocation) : null}
          <LabelInfo info={popupInfo || {}} visible={!!popupInfo} />
        </MapGL>
        <MenuButton onClick={this.openMenu} isOpen={isMenuOpen} />
        <UserMenu
          userinfo={currentUser}
          show={isMenuOpen}
          onClose={this.togglePaymanets}
          primaryAction={this.togglePaymanets}
          secondaryAction={this.findMyCar}
        />
        <Payment
          show={isPaymentOpen}
          onClose={this.togglePaymanets}
          toggleVisibleAddCard={this.toggleVisibleAddCard}
          visibleAddCard={isNewCardOpen}
          onAddCard={this.onAddCard}
          payments={[{ name: 'Pedro Gonzales', card: 'xxxxxxxxxxxx3659' }]}
        />
      </div>
    )
  }
}

export default User
