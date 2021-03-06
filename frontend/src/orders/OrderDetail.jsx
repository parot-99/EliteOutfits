import { Fragment, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Row, Col, ListGroup } from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux'
import { AdminButtons } from '.'
import { Message, Loader } from './../handlers'
import { Meta } from './../base'
import { getOrder } from './../actions/orderActions'


const OrderDetail = () => {
  const order = useSelector(state => state.order)
  const {loading, error, orderDetails} = order
  const {id} = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrder(id))

  }, [dispatch, id])
  
  if (Object.keys(orderDetails).length !== 0) {
    orderDetails.itemsCount = orderDetails.orderItems.reduce(
      (acc, item) => acc + item.quanity,
      0
    )
  }

  return (
    <Fragment>
      <Meta title='Order' />
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {!loading && !error && Object.keys(orderDetails).length !== 0 &&
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item variant='light'>
                <h2>Shipping</h2>
                <h6 className='inline'>Name: </h6>
                <p className='inline'>
                  {orderDetails.user.name}
                </p>
                <br/>
                <h6 className='inline'>Email: </h6>
                <p className='inline'>
                  {orderDetails.user.email}
                </p>
                <br/>
                <h6 className='inline'>Address: </h6>
                <p className='inline'>
                  {orderDetails.shippingAddress.address}, {' '}
                  {orderDetails.shippingAddress.city}, {' '}
                  {orderDetails.shippingAddress.country}
                </p>
                {orderDetails.isDelivered && 
                  <Message variant='success' className='mt-3'>
                    Delivered
                  </Message>
                }
                {!orderDetails.isDelivered && 
                  <Message variant='danger' className='mt-3'>
                    Not Delivered
                  </Message>
                }
              </ListGroup.Item>
              <ListGroup.Item variant='light'>
                <h2>Order Items</h2>    
                <ListGroup variant='flush'>
                  {orderDetails.orderItems.map((item, index) => (
                    <ListGroup.Item key={index} variant='light'>
                      <Row>
                        <Col sm={12} md={4}>
                          <Link to={`/product/${item.product}`}>
                            <h6>{item.name}</h6>
                          </Link>
                        </Col>
                        <Col sm={12} md={4} >
                          <h6>Size: {item.size}</h6>
                        </Col>
                        <Col sm={12} md={4}>
                          <h6>
                            {item.quanity} x {item.price} SP = {' '}
                            {(item.quanity * item.price)} SP
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
              <ListGroup.Item variant='light'>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item variant='light'>
                <Row>
                  <Col><h6>Items</h6></Col>
                  <Col><h6>{orderDetails.itemsCount}</h6></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item variant='light'>
                <Row>
                  <Col><h6>Price</h6></Col>
                  <Col><h6>{orderDetails.price} SP</h6></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item variant='light'>
                {orderDetails.isPaid &&
                  <Message variant='success' className='mb-0'>Paid</Message>
                }          
                {!orderDetails.isPaid &&
                  <Message variant='danger' className='mb-0'>Not Paid</Message>
                }          
              </ListGroup.Item>
              <AdminButtons orderDetails={orderDetails} id={id} /> 
            </ListGroup>
          </Col>
        </Row>
      }
    </Fragment>
  )
}

export default OrderDetail
