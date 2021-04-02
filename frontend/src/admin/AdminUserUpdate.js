import {Fragment, useEffect, useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {Link, useParams, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Loader, Message} from './../handlers'
import {FormContainer} from './../base'
import {userDetailAction, userUpdateAction} from './../actions/adminActions'


const AdminUserUpdate = () => {
  const {id} = useParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const admin = useSelector(state => state.admin)
  const {loading, error, userDetail} = admin
  const userLogin = useSelector(state => state.userLogin)
  const {user} = userLogin
  const history = useHistory()
  const dispatch = useDispatch()


  useEffect(() => {
    if (user._id === id) {
      history.push('/profile')
    }

    if (!userDetail) {
      dispatch(userDetailAction(id))

    } else {
      setName(userDetail.name)
      setEmail(userDetail.email)
      setIsAdmin(userDetail.isAdmin)
    }
    
  }, [userDetail, user, id, history, dispatch])

  const handleUpdate = (event) => {
    event.preventDefault()

    dispatch(userUpdateAction({
      _id: userDetail._id,
      name,
      email,
      isAdmin
    }))
  }

  return (
    <Fragment>
      <Link to='/admin/users' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>EDIT USER</h1>
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
          <Form.Group controlId='isadmin'>
            <Form.Check 
              type='checkbox'
              label='Is Admin'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>
          <Button type='submit' variant='dark'>
            Update
          </Button>
        </Form>
      </FormContainer>  
    </Fragment>
  )
}


export default AdminUserUpdate