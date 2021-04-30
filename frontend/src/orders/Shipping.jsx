import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux'
import { CheckoutNav } from '.'
import { FormContainer, Meta } from './../base'
import { saveShippingAddress } from './../actions/orderActions'
import { ORDER_CREATE_RESET } from './../constants/orderConstants'


const Shipping = () => {
  const order = useSelector(state => state.order)
  const {shippingAddress} = order
  const [address, setAddress] = useState(shippingAddress.address || '')
  const [country, setCountry] = useState(shippingAddress.country || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const history = useHistory()
  const dispatch = useDispatch()


  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(saveShippingAddress({address, city, country}))
    dispatch({type: ORDER_CREATE_RESET})
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <Meta title='Shipping' />
      <CheckoutNav step1 />
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
