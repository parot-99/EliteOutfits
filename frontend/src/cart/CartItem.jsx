import { Link } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { addToCart, removeFromCart } from './../actions/cartActions'

const CartItem = ({item, dispatch}) => {
  return (
    <Row>
      <Col md={3}>
        <Link className='text-dark' to={`/product/${item.product}`}>
          <h6>{item.name}</h6>
        </Link>
      </Col>
      <Col md={2}><h6>{item.price} SP</h6></Col>
      <Col md={2}><h6>Size: {item.size}</h6></Col>
      <Col md={2}><h6>Quanity: {item.quanity}</h6></Col>
      <Col md={2}>
        <Button 
          type='button' 
          variant='light' 
          onClick={() => dispatch(removeFromCart(item.product, item.size))}
        >
          <i className='fas fa-trash' />
        </Button>
      </Col>
    </Row>    
  )
}

export default CartItem