import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const CartButton = ({countInStock, id, quanity, size}) => {
  const history = useHistory()
 
  const addToCart = () => {
    history.push(`/cart/${id}?qty=${quanity}&size=${size}`)
  }

  return (
    <Button 
      className='btn-block btn-dark' 
      type='button' 
      disabled={countInStock === 0}
      onClick={addToCart}
    >
      ADD TO CART
    </Button>
  )
}

export default CartButton
