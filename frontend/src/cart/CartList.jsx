import { Fragment, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup } from 'react-bootstrap'
import { CartItem, CartInfo } from '.'
import { Loader, Message } from './../handlers'
import { Meta } from './../base'
import { addToCart } from './../actions/cartActions'


const CartList = () => {
  const {id} = useParams()
  const location = useLocation()
  const cart = useSelector(state => state.cart)
  const {loading, error, cartItems} = cart
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, Number(location.search.split('=')[1])))
    }
  }, [dispatch, id, location])

  return (
    <Fragment>
      <Meta title='Cart' />
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {!loading && !error && 
        <Row>
          <Col md={8}>
            <h1>SHOPPING CART</h1> 
            {cartItems.length === 0 &&
              <Message>
                Your cart is empty <Link to='/'>Go Back</Link>
              </Message> 
            }
            {cartItems.length !== 0 &&
              <ListGroup variant='flush'>
                {cartItems.map(item => (
                  <ListGroup.Item key={item.product} variant='light'>
                    <CartItem item={item} dispatch={dispatch} />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            }
          </Col>
          <Col md={4}>
            <CartInfo cartItems={cartItems} />
          </Col>
        </Row>
      }
    </Fragment>
    
  )
}


export default CartList
