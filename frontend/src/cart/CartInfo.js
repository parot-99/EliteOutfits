import {useHistory} from 'react-router-dom'
import {ListGroup, Button, Card} from 'react-bootstrap'

const CartInfo = ({cartItems}) => {
  const history = useHistory()

  const checkout = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h3 className='text-dark'>
            SUBTOTAL 
            ({cartItems.reduce((acc, item) => acc + item.quanity, 0)})
            ITEMS
          </h3>
          <h6>
            $
            {cartItems.reduce((acc, item) => 
              acc + (item.quanity * item.price), 0).toFixed(2)
            }
          </h6>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button 
            type='button'
            className='btn-block btn-dark'
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