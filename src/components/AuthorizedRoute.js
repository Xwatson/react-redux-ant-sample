import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import propTypes from 'prop-types'
import RenderAuthorized from 'ant-design-pro/lib/Authorized'

const Authorized = RenderAuthorized('admin')

const AuthorizedRoute = React.memo((props) => {
  const {
    component: Component,
    authority,
    redirectPath,
    path,
  } = props
  return (
    <Authorized
      authority={authority}
      noMatch={(
        <Route
          path={path}
          key={path}
          render={() => <Redirect to={{ pathname: redirectPath }} />}
        />
      )}
    >
      {
        <Route key={path} path={path} component={Component} />
      }
    </Authorized>
  )
})

AuthorizedRoute.propTypes = {
  component: propTypes.any.isRequired, // eslint-disable-line
  authority: propTypes.string.isRequired,
  redirectPath: propTypes.string.isRequired,
  path: propTypes.string.isRequired,
}

export default AuthorizedRoute
