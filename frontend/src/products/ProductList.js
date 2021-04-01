import {Fragment, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from './Product'
import {Paginate} from './../base'
import {Loader, Message} from './../handlers'
import {productListAction} from './../actions/productActions'

const ProductList = () => {
  const {pageNumber} = useParams() || 1
  const product = useSelector(state => state.product)
  const {loading, error, productsList, pages, page} = product
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productListAction(pageNumber))

  }, [pageNumber, dispatch])

  return (
    <Fragment>
      <h1>LATEST PRODUCTS</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {!loading && !error && productsList.length !== 0 &&
        <Fragment>
          <Row>
            {productsList.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} />
        </Fragment>
      }
    </Fragment>
  )
}

export default ProductList