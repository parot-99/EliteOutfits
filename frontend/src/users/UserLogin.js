import {useState, useEffect} from 'react'
import {useLocation, useHistory, Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Loader, Message} from './../handlers'
import {FormContainer} from './../base'
import {userLoginAction} from './../actions/userActions'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const userLogin = useSelector(state => state.userLogin)
  const {loading, error, user} = userLogin
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

    dispatch(userLoginAction(email, password))
  }

  return ( 
    <FormContainer>
      <h1>SIGN IN</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type='email'
            placeholder='Enter email'
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
        <Button type='submit' variant='dark'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row> 
    </FormContainer>
  )
}

export default UserLogin
