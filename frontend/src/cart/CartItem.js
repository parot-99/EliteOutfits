import {Link} from 'react-router-dom'
import {Row, Col,Image, Form, Button} from 'react-bootstrap'
import {addToCart, removeFromCart} from './../actions/cartActions'

const CartItem = ({item, dispatch}) => {
  return (
    <Row>
      <Col md={3}>
        <Link className='text-dark' to={`/product/${item.product}`}>
          <h6>{item.name}</h6>
        </Link>
      </Col>
      <Col md={2}><h6>{item.price} SP</h6></Col>
      <Col md={2}>
      <Form.Control 
        as='select' 
        value={item.quanity} 
        onChange={
          (e) => dispatch(addToCart(
            item.product,
            Number(e.target.value))
          )
        }
      >
        {[...Array(item.countInStock).keys()].map(x => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </Form.Control>
      </Col>
      <Col md={2}>
        <Button 
          type='button' 
          variant='light' 
          onClick={() => dispatch(removeFromCart(item.product))}
        >
          <i className='fas fa-trash' />
        </Button>
      </Col>
    </Row>    
  )
}

export default CartItem