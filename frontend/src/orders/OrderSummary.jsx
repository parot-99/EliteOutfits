import React from 'react'
import {Button, ListGroup, Row, Col} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {Message} from './../handlers'
import {createOrder} from './../actions/orderActions'


const OrderSummary = ({cart}) => {
  const order = useSelector(state => state.order)
  const dispatch = useDispatch()

  const placeOrder = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: order.shippingAddress,
      price: cart.price
    }))
  }

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.price = addDecimals(cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.quanity,
    0
  ))

  cart.itemsCount = cart.cartItems.reduce(
    (acc, item) => acc + item.quanity,
    0
  )

  return (
    <ListGroup variant='flush'>
      <ListGroup.Item variant='light'>
        <h2>Order Summary</h2>
      </ListGroup.Item>
      <ListGroup.Item variant='light'>
        <Row>
          <Col><h6>Items</h6></Col>
          <Col><h6>{cart.itemsCount}</h6></Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item variant='light'>
        <Row>
          <Col><h6>Price</h6></Col>
          <Col><h6>{cart.price} SP</h6></Col>
        </Row>
      </ListGroup.Item>
        {order.error && 
          <ListGroup.Item>
            <Message variant='danger'>{order.error}</Message>
          </ListGroup.Item>
        }
      <ListGroup.Item variant='light'>
        <Button 
          type='button'
          className='btn-block btn-dark'
          disabled={cart.cartItems.length === 0}
          onClick={placeOrder}
        >
          Place Order
        </Button>
      </ListGroup.Item>
    </ListGroup>
  )
}


export default OrderSummary
