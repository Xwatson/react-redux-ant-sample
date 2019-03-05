import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import propTypes from 'prop-types'
import RenderAuthorized from 'ant-design-pro/lib/Authorized'

const Authorized = RenderAuthorized('admin')

const AuthorizedRoute = (props) => {
  const {
    component: Component,
    authority,
    redirectPath,
    path,
    key,
  } = props
  return (
    <Authorized
      authority={authority}
      noMatch={(
        <Route
          path={path}
          key={key}
          render={() => <Redirect to={{ pathname: redirectPath }} />}
        />
      )}
    >
      {
        Component
          ? <Route key={key} path={path} component={Component} />
          : <Redirect to={{ pathname: redirectPath }} />
      }
    </Authorized>
  )
}

AuthorizedRoute.propTypes = {
  component: propTypes.any.isRequired, // eslint-disable-line
  authority: propTypes.string.isRequired,
  redirectPath: propTypes.string.isRequired,
  path: propTypes.string.isRequired,
  key: propTypes.string.isRequired,
}

export default AuthorizedRoute
