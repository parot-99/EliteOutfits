import {Fragment} from 'react'
import {Link, useParams} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from './Rating'
import productsList from './../productsList'

const ProductDetail = () => {
  const {id} = useParams()
  const product = productsList.find(p => p._id === id)

  return (
    <Fragment>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3 className='text-muted'>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating 
                rating={product.rating} 
                numReviews={product.numReviews} 
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 className='text-muted'>Price: ${product.price}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 className='text-muted'>
                Status: {product.countInStock? 'In Stock': 'Not In Stock'}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button 
                className='btn-block btn-dark' 
                type='button' 
                disabled={product.countInStock === 0}
              >
                ADD TO CART
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Fragment>
  )
}

export default ProductDetail
