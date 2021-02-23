import {Fragment, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from './Product'
import {productsListAction} from './../actions/productActions'

const ProductList = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading, error, products} = productList

  useEffect(() => {
    dispatch(productsListAction())
  }, [dispatch])

  return (
    <Fragment>
      <h1 className='text-dark'>LATEST PRODUCTS</h1>
      {loading && <h2>Loading</h2>}
      {error && <h2>{error}</h2>}
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Fragment>
  )
}

export default ProductList
