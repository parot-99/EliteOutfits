import {useState, useEffect,Fragment} from 'react'
import {useHistory} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Loader, Message} from './../handlers'
import {userDetailAction} from './../actions/userActions'

const UserUpdate = () => {
  const history = useHistory()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const userUpdate = useSelector(state => state.userRegister)
  const {loading, error} = userUpdate
  const userDetail = useSelector(state => state.userDetail)
  const {userInfo} = userDetail
  const userLogin = useSelector(state => state.userLogin)
  const {user} = userLogin
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      history.push('/login')
    } else {
      if (!userInfo) {
        dispatch(userDetailAction())
      } else {
        setName(userInfo.name)
        setEmail(userInfo.email)
      }
  
    }
 
  }, [history, user, userInfo, dispatch])

  const handleUpdate = (event) => {
    event.preventDefault()
  }

  return (
    <Fragment>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
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
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password2'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type='password'
            placeholder='Enter password again'
            required={true}
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
