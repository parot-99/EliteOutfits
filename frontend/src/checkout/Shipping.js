import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap' 
import {useDispatch, useSelector} from 'react-redux'
import {FormContainer} from './../base'
import {saveShippingAddress} from './../actions/checkoutActions'


const Shipping = () => {
  const checkout = useSelector(state => state.checkout)
  const {shippingAddress} = checkout
  const userLogin = useSelector(state => state.userLogin)
  const {user} = userLogin
  const [address, setAddress] = useState(shippingAddress.address || '')
  const [country, setCountry] = useState(shippingAddress.country || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      history.push('/login')
    }
  }, [user])

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(saveShippingAddress({address, city, country}))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <h1>ADDRESS</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control 
            type='text'
            placeholder='Enter address'
            autoComplete='off'
            required={true}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control 
            type='text'
            placeholder='Enter country'
            autoComplete='off'
            required={true}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control 
            type='text'
            placeholder='Enter city'
            required={true}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='dark'>
          Next
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Shipping
