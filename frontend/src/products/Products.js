import {Fragment, useEffect, useState} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from './Product'
import axios from 'axios'

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/api/products')

      if (response.status === 200) {
        setProducts(response.data)
      }
      
    }
    fetchProducts()

  }, [])


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
