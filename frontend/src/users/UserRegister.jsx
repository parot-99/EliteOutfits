import { useState, useEffect } from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, Message } from './../handlers'
import { Meta } from './../base'
import { FormContainer } from './../base'
import { userRegisterAction } from './../actions/userActions'

const UserRegister = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const location = useLocation()
  const history = useHistory()
  const user = useSelector(state => state.user)
  const {loading, error} = user
  const authentication = useSelector(state => state.authentication)
  const {user: userAuth} = authentication
  const dispatch = useDispatch()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userAuth) {
      history.push(redirect)
    } 

  }, [history, userAuth, redirect])

  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(userRegisterAction(name, email, password, password2))
  }

  return (
    <FormContainer>
      <Meta title='Register' />
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
          Register
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
