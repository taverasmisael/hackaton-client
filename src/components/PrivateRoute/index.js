import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { IsAuthorized } from '@services/auth'

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(IsAuthorized() )
  return (
  <Route
    {...rest}
    render={props => (IsAuthorized() ? <Component {...props} /> : <Redirect to="/login" />)}
  />
)
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired
}

export default PrivateRoute
