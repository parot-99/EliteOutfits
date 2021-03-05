import {Fragment, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button} from 'react-bootstrap'
import Rating from './Rating'
import {Loader, Message} from './../Handlers'
import {productDetailAction} from './../actions/productActions'

const ProductDetail = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const productDetail = useSelector(state => state.productDetail)
  const {loading, error, product} = productDetail
  

  useEffect(() => {
    dispatch(productDetailAction(id))
  }, [dispatch, id])

  return (
    <Fragment>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {!loading && !error && 
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={6}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3 className='text-dark'>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating 
                  rating={product.rating} 
                  numReviews={product.numReviews} 
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4 className='text-dark'>Price: ${product.price}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4 className='text-dark'>
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
      }
    </Fragment>
  )
}

export default ProductDetail
