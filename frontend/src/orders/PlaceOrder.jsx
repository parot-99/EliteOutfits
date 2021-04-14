import {Fragment} from 'react'
import {useEffect} from 'react'
import {useHistory, Link} from 'react-router-dom'
import {Row, Col, ListGroup} from 'react-bootstrap' 
import {useSelector} from 'react-redux'
import {CheckoutNav, OrderSummary} from '.'
import {Message} from './../handlers'
import {Meta} from './../base'


const PlaceOrder = () => {
  const order = useSelector(state => state.order)
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  const history = useHistory()

  useEffect(() => {
    if (!order.shippingAddress) {
      history.push('/shipping')
    }

    if (order.success) {
      history.push(`/order/${order.newOrder._id}`)
    }

  }, [history, order])
  

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
          <OrderSummary cart={cart} />
        </Col>
      </Row>  
    </Fragment>
  )
}


export default PlaceOrder
