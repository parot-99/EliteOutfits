import {Fragment, useEffect} from 'react'
import {useParams, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Loader, Message} from './../handlers'
import {addToCart} from './../actions/cartActions'
import {CartList} from '.'

const Cart = () => {
  const {id} = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const {loading, error, cartItems} = cart

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, Number(location.search.split('=')[1])))
    }
  }, [dispatch, id, location])

  return (
    <Fragment>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {!loading && !error && 
        <CartList cartItems={cartItems} dispatch={dispatch} />
      }
    </Fragment>
  )
}

export default Cart
