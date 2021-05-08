import { useState, useEffect,Fragment } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, Message } from './../handlers'
import { Meta } from './../base'
import { userDetailAction, userUpdateAction } from './../actions/userActions'
import { USER_UPDATE_RESET } from './../constants/userConstants'


const UserUpdate = () => {
  const user = useSelector(state => state.user)
  const {userInfo, error, loading, updateError, updateLoading} = user
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {     
    if (user.success) {
      dispatch({type: USER_UPDATE_RESET})
    }

    if (!userInfo) {
      dispatch(userDetailAction())
      setPassword('')
      setPassword2('')
      
    } else {
      setName(userInfo.name)
      setEmail(userInfo.email)
    }
   
  }, [userInfo, user.success, dispatch])

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
      {error && <Message variant='danger'>{error}</Message>}
      {updateError && <Message variant='danger'>{updateError}</Message>}
      {user.success && 
        <Message variant='success'>Profile Updated</Message>
      }
      {loading && <Loader />}
      {updateLoading && <Loader />}
      <Meta title='Profile' />
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
