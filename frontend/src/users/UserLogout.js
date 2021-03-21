import {NavDropdown} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {userLogoutAction} from './../actions/userActions'

const UserLogout = () => {
  const dispatch = useDispatch()


  const handleLogout = () => {
    dispatch(userLogoutAction())
  }

  return (
    <NavDropdown.Item onClick={handleLogout}>
      Logout
    </NavDropdown.Item>
  )
}

export default UserLogout
