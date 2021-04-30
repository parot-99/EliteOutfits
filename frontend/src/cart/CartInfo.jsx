import { useHistory } from 'react-router-dom'
import { ListGroup, Button, Card } from 'react-bootstrap'

const CartInfo = ({cartItems}) => {
  const history = useHistory()

  const checkout = () => {
    history.push('/shipping')
  }

  return (
    <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item variant='light'>
          <h3 className='text-dark'>
            SUBTOTAL 
            ({cartItems.reduce((acc, item) => acc + item.quanity, 0)})
            ITEMS
          </h3>
          <h6>
            {cartItems.reduce((acc, item) => 
              acc + (item.quanity * item.price), 0).toFixed(2)
            } SP
          </h6>
        </ListGroup.Item>
        <ListGroup.Item variant='light'>
          <Button 
            type='button'
            className='btn-block'
            variant='dark'
            disabled={cartItems.length === 0}
            onClick={checkout}
          >
            CHECKOUT
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

export default CartInfo