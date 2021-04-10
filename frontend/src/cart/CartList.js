import {Link} from 'react-router-dom'
import {Row, Col, ListGroup} from 'react-bootstrap'
import {Message} from './../handlers'
import {CartItem, CartInfo} from '.'


const CartList = ({cartItems, dispatch}) => {
  return (
    <Row>
      <Col md={8}>
        <h1>SHOPPING CART</h1> 
        {cartItems.length === 0 &&
          <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> 
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
  )
}


export default CartList
