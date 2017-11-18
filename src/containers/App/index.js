import React, { PureComponent } from 'react'
import MapGL, { Marker } from 'react-map-gl'

import CityPin from '@components/CityPin'
import LabelInfo from '@components/LabelInfo'

import { LoadMarkers, FiltersCode } from '@services/api'

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
    currentFilter: FiltersCode.OUTDATED,
    currentTheme: new Date().getHours() ? 'streets' : 'dark'
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
        }
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
          longitude: +m.longitude
        }))
        this.setState({
          locations: [
            ...locations,
            { id: 3124231, latitude: 18.482279, longitude: -69.95643040000002, color: '#4267b2' }
          ],
          markers: [
            ...markers,
            {
              id: 3124231,
              vehicle_model: 'Lamborgini Aventador 2015',
              marbete: '551FASD886ASDF1330',
              user_name: 'PornoTentacion',
              user_img:
                'https://www.designboom.com/wp-content/uploads/2016/07/patricia-piccinini-graham-transport-accident-commission-designboom-1800.jpg',
              email: 'jmrv002@gmail.com',
              password: '81dc9bdb52d04dc20036dbd8313ed055',
              color: 'Rojo',
              matricula: 'EFASDFZXCVZ149498498496',
              active: 0,
              latitude: '0',
              longitude: '0'
            }
          ]
        })
        // requestAnimationFrame(this.updateMap.bind(this, this.state.currentFilter))
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
  render() {
    const { viewport, locations, popupInfo, currentTheme } = this.state
    return (
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
    )
  }
}

export default App
