import {Fragment} from 'react'
import {useEffect} from 'react'
import {useHistory, Link} from 'react-router-dom'
import {Button, Row, Col, ListGroup, Image} from 'react-bootstrap' 
import {useDispatch, useSelector} from 'react-redux'
import {CheckoutNav} from '.'
import {Message} from './../handlers'
import {Meta} from './../base'
import {createOrder} from './../actions/orderActions'


const PlaceOrder = () => {
  const order = useSelector(state => state.order)
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!order.shippingAddress) {
      history.push('/shipping')
    }

    if (order.success) {
      history.push(`/order/${order.newOrder._id}`)
    }

  }, [history, order])
  
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.price = addDecimals(cartItems.reduce(
    (acc, item) => acc + item.price * item.quanity,
    0
  ))

  cart.itemsCount = cartItems.reduce(
    (acc, item) => acc + item.quanity,
    0
  )

  const placeOrder = () => {
    dispatch(createOrder({
      orderItems: cartItems,
      shippingAddress: order.shippingAddress,
      price: cart.price
    }))
  }
  
  return (
    <Fragment>
      <Meta title='Place Order' />
      <CheckoutNav step1 step2 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item variant='light'>
              <h2>Shipping</h2>
              <h6 className='d-inline'>Address: </h6>
              <p className='d-inline'>
                {order.shippingAddress.address}, {' '}
                {order.shippingAddress.city}, {' '}
                {order.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item variant='light'>
              <h2>Order Items</h2>
              {cartItems.length === 0 && <Message>Your Cart Is Empty</Message>}
              {cartItems.length > 0 && 
                <ListGroup variant='flush'>
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index} variant='light'>
                      <Row>
                        {/* <Col md={1}>
                          <Image 
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col> */}
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            <h6>{item.name}</h6>
                          </Link>
                        </Col>
                        <Col md={4}>
                          <h6>
                            {item.quanity} x {item.price} SP = {' '}
                            {item.quanity * item.price} SP
                          </h6>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              }
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
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
                disabled={cartItems.length === 0}
                onClick={placeOrder}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>  
    </Fragment>
  )
}

export default PlaceOrder
