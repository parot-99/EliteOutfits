import {useState, useEffect,Fragment} from 'react'
import {useHistory} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Loader, Message} from './../handlers'
import {userDetailAction, userUpdateAction} from './../actions/userActions'
import {USER_UPDATE_RESET} from './../constants/userConstants'

const UserUpdate = () => {
  const history = useHistory()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const userLogin = useSelector(state => state.userLogin)
  const {user} = userLogin
  const userDetail = useSelector(state => state.userDetail)
  const {userInfo, error: userError, loading: userLoading} = userDetail
  const userUpdate = useSelector(state => state.userUpdate)
  const {success, error: updateError, loading: updateLoading} = userUpdate
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      history.push('/login')
    } else {
      if (!userInfo || success) {
        dispatch({type: USER_UPDATE_RESET})
        dispatch(userDetailAction())
      } else {
        setName(userInfo.name)
        setEmail(userInfo.email)
      }
  
    }
 
  }, [history, user, userInfo, success, dispatch])

  const handleUpdate = (event) => {
    event.preventDefault()
    dispatch(userUpdateAction({
      id: userInfo.id,
      name,
      email,
      password,
      password2
    }))
  }

  return (
    <Fragment>
      {userError && <Message variant='danger'>{userError}</Message>}
      {updateError && <Message variant='danger'>{updateError}</Message>}
      {success && <Message variant='success'>Profile Updated</Message>}
      {userLoading && <Loader />}
      {updateLoading && <Loader />}
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type='text'
            placeholder='Enter name'
            autoComplete='off'
            required={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type='email'
            placeholder='Enter email'
            autoComplete='off'
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password2'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type='password'
            placeholder='Enter password again'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='dark'>
          Update
        </Button>
      </Form>
    </Fragment>
  )
}

export default UserUpdate
