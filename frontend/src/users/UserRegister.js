import {useState, useEffect} from 'react'
import {useLocation, useHistory, Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Loader, Message} from './../handlers'
import {FormContainer} from './../base'
import {userRegisterAction} from './../actions/userActions'

const UserRegister = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const userRegister = useSelector(state => state.userRegister)
  const {loading, error, user} = userRegister
  // const userLogin = useSelector(state => state.userLogin)
  // const {user} = userLogin
  const location = useLocation()
  const history = useHistory()
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      history.push(redirect)
    } 

  }, [history, user, redirect])

  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(userRegisterAction(name, email, password, password2))
  }

  return (
    <FormContainer>
      <h1>Register</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={handleLogin}>
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
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Already a user?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row> 
    </FormContainer>
  )
}

export default UserRegister
