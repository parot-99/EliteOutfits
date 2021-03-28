import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'


const PrivateRoute = ({children, ...rest}) => {
  const userLogin = useSelector(state => state.userLogin)
  const {user} = userLogin


  return (
    <Route
      {...rest}
      render={({ location }) =>
      user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute