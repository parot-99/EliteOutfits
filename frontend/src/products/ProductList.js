import {Fragment, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from './Product'
import {Loader, Message} from './../handlers'
import {productListAction} from './../actions/productActions'

const ProductList = () => {
  const product = useSelector(state => state.product)
  const {loading, error, productsList} = product
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productListAction())
  }, [dispatch])

  return (
    <Fragment>
      <h1>LATEST PRODUCTS</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {!loading && !error && productsList.length !== 0 &&
        <Row>
          {productsList.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      }
    </Fragment>
  )
}

export default ProductList