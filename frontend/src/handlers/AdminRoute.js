import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'


const AdminRoute = ({children, ...rest}) => {
  const userLogin = useSelector(state => state.userLogin)
  const {user} = userLogin


  return (
    <Route
      {...rest}
      render={({ location }) =>
      user && user.isAdmin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default AdminRoute