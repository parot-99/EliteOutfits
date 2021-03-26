import {Fragment} from 'react'
import {useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {Row, Col, ListGroup, Image} from 'react-bootstrap' 
import {useDispatch, useSelector} from 'react-redux'
import {Message, Loader} from './../handlers'
import {getOrder} from './../actions/orderActions'


const OrderDetail = () => {
  const orderDetail = useSelector(state => state.order)
  const {id} = useParams()
  const {loading, error, order} = orderDetail
  const dispatch = useDispatch()

  
  useEffect(() => {
    dispatch(getOrder(id))
  }, [dispatch, id])

  if (order) {
    order.itemsCount = order.orderItems.reduce(
      (acc, item) => acc + item.quanity,
      0
    )
  }
  
  return (
    <Fragment>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {!loading && !error && 
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <h6 className='inline'>Name: </h6>
                <p className='inline'>
                  {order.user.name}
                </p>
                <br/>
                <h6 className='inline'>Email: </h6>
                <p className='inline'>
                  {order.user.email}
                </p>
                <br/>
                <h6 className='inline'>Address: </h6>
                <p className='inline'>
                  {order.shippingAddress.address}, {' '}
                  {order.shippingAddress.city}, {' '}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered && 
                  <Message variant='success' className='mt-3'>
                    Delivered
                  </Message>
                }
                {!order.isDelivered && 
                  <Message variant='danger' className='mt-3'>
                    Not Delivered
                  </Message>
                }
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>    
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image 
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            <h6>{item.name}</h6>
                          </Link>
                        </Col>
                        <Col md={4}>
                          <h6>
                            {item.quanity} x {item.price} SP = {' '}
                            {(item.quanity * item.price).toFixed(2)} SP
                          </h6>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>        
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col><h6>Items</h6></Col>
                  <Col><h6>{order.itemsCount}</h6></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col><h6>Price</h6></Col>
                  <Col><h6>{order.price} SP</h6></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {order.isPaid &&
                  <Message variant='success' className='mb-0'>Paid</Message>
                }          
                {!order.isPaid &&
                  <Message variant='danger' className='mb-0'>Not Paid</Message>
                }          
              </ListGroup.Item>           
            </ListGroup>
          </Col>
        </Row>
      }
    </Fragment>
  )
}

export default OrderDetail
