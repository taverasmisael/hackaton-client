import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './index.css'
import 'mapbox-gl/dist/mapbox-gl.css'

import App from '@containers/App'
import Login from '@containers/Login'
import SplashScreen from '@containers/SplashScreen'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/login" component={Login} />
      <Route exact path="/map" component={App} />
      <Route exact path="/" component={SplashScreen} />
    </div>
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
