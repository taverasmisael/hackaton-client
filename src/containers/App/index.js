import React, { PureComponent } from 'react'
import MapGL, { Marker } from 'react-map-gl'

import CityPin from '@components/CityPin'
import LabelInfo from '@components/LabelInfo'
import Menu from '@components/Menu'
import MenuButton from '@components/MenuButton'

import { LoadMarkers, FiltersCode } from '@services/api'
import { GetUser } from '@services/auth'
import { IsNightTime } from '@services/utilities'

const MarkersColors = {
  UPDATED: '#6cffc0',
  OUTDATED: '#ff6060'
}

const TOKEN =
  'pk.eyJ1IjoidGF2ZXJhc21pc2FlbCIsImEiOiJjamEzenBlcjM5dTFiMzNsZ2JhcWhrYmU0In0.2cYJYBYpTYmYI75TXuc_yA' // Set your mapbox token here

class App extends PureComponent {
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
    locations: [],
    currentFilter: FiltersCode.ALL,
    currentTheme: IsNightTime() ? 'dark' : 'streets',
    isMenuOpen: false
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
        currentUser: GetUser()
      }))
    })
    this.updateMap(this.state.currentFilter)
  }

  updateMap = filter => {
    LoadMarkers(filter)
      .then(markers => {
        const locations = markers.map(m => ({
          id: m.id,
          latitude: +m.latitude,
          longitude: +m.longitude,
          color: m.active ? MarkersColors.UPDATED : MarkersColors.OUTDATED
        }))
        this.setState({
          locations: [
            ...locations,
            { id: 3124231, latitude: 18.482279, longitude: -69.95643040000002, color: '#b360ff' }
          ],
          markers
        })
        requestAnimationFrame(this.updateMap.bind(this, this.state.currentFilter))
      })
      .catch(err => {
        console.error('ERROR LOADING MARKERS: ', err)
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
      <Marker key={`marker-${city.id}`} longitude={city.longitude} latitude={city.latitude}>
        <CityPin color={city.color} size={20} onClick={this.onPinClick(city.id)} />
      </Marker>
    )
  }
  onPinClick = id => () =>
    this.setState(state => ({ ...state, popupInfo: state.markers.find(m => m.id === id) }))
  updateViewport = viewport => {
    this.setState({ viewport })
  }

  onSelectFilter = currentFilter => () => this.setState({ currentFilter, isMenuOpen: false })

  openMenu = () => this.setState(state => ({ ...state, isMenuOpen: !state.isMenuOpen }))
  render() {
    const {
      viewport,
      currentUser,
      locations,
      popupInfo,
      currentTheme,
      currentFilter,
      isMenuOpen
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
          {locations.map(this.renderCityMarker)}
          <LabelInfo info={popupInfo || {}} visible={!!popupInfo} />
        </MapGL>
        <MenuButton onClick={this.openMenu} isOpen={isMenuOpen} />
        <Menu
          userinfo={currentUser}
          currentFilter={currentFilter}
          show={isMenuOpen}
          onSelectFilter={this.onSelectFilter}
        />
      </div>
    )
  }
}

export default App
