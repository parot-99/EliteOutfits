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
  const product = useSelector(state => state.product)
  const {loading, error, productDetail} = product
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
      {!loading && !error && Object.keys(productDetail).length !== 0 &&
        <Row>
          <Col md={6}>
            <Image src={productDetail.image} alt={productDetail.name} fluid />
          </Col>
          <Col md={6}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{productDetail.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating 
                  rating={productDetail.rating} 
                  numReviews={productDetail.numReviews} 
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Price: {productDetail.price} SP</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>
                  Status: {
                    productDetail.countInStock
                    ? 'In Stock'
                    : 'Not In Stock'
                  }
                </h4>
              </ListGroup.Item>
              {productDetail.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col><h4>Quanity</h4></Col>
                    <Col>
                      <Form.Control 
                        as='select' 
                        value={quanity} 
                        onChange={(e) => setQuanity(e.target.value)}
                      >
                        {[...Array(productDetail.countInStock).keys()].map(x => (
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
                  countInStock={productDetail.countInStock} 
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
