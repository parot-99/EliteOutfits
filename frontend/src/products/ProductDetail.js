import {Fragment, useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Form} from 'react-bootstrap'
import {Rating, CartButton} from '.'
import {Loader, Message} from './../handlers'
import {productDetailAction} from './../actions/productActions'

const ProductDetail = () => {
  const [quanity, setQuanity] = useState(1)
  const {id} = useParams()
  const productDetail = useSelector(state => state.productDetail)
  const {loading, error, product} = productDetail
  const dispatch = useDispatch()

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
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating 
                  rating={product.rating} 
                  numReviews={product.numReviews} 
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Price: {product.price} SP</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>
                  Status: {product.countInStock? 'In Stock': 'Not In Stock'}
                </h4>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col><h4>Quanity</h4></Col>
                    <Col>
                      <Form.Control 
                        as='select' 
                        value={quanity} 
                        onChange={(e) => setQuanity(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <CartButton 
                  countInStock={product.countInStock} 
                  id={id} 
                  quanity={quanity} 
                />
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      }
    </Fragment>
  )
}

export default ProductDetail
