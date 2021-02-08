import {Fragment} from 'react'
import {Row, Col} from 'react-bootstrap'
import products from './../productsList'
import Product from './Product'

const Home = () => {
  return (
    <Fragment>
      <h1>LATEST PRODUCTS</h1>
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

export default Home
