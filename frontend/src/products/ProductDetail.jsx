import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Form } from 'react-bootstrap'
import { Rating, CartButton } from '.'
import { Meta } from './../base'
import { Loader, Message } from './../handlers'
import { productDetailAction } from './../actions/productActions'
import { ProductReviews } from '.'


const ProductDetail = () => {
  const {id} = useParams()
  const [quanity, setQuanity] = useState(1)
  const [size, setSize] = useState('S')
  const product = useSelector(state => state.product)
  const {loading, error, reviewError, success, productDetail} = product
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productDetailAction(id))

    if (productDetail.length > 0) {
      setSize(productDetail.size[0])
    }

  }, [dispatch, id, success])

  return (
    <Fragment>
      <Meta />
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {!loading && !error && Object.keys(productDetail).length !== 0 &&
        <Fragment>
          <Meta title={productDetail.name} />
          <Row>
            <Col md={6}>
              <Image 
                src={productDetail.image}
                alt={productDetail.name}
                fluid 
              />
            </Col>
            <Col md={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item variant='light'>
                  <h3>{productDetail.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item variant='light'>
                  <Rating 
                    rating={productDetail.rating} 
                  ></Rating>
                  <p className='rating-text d-inline'> 
                    {' '}{productDetail.numReviews} reviews
                  </p> 
                </ListGroup.Item>
                <ListGroup.Item variant='light'>
                  <h4>Price: {productDetail.price} SP</h4>
                </ListGroup.Item>
                <ListGroup.Item variant='light'>
                  <h4>
                    Status: {
                      productDetail.countInStock
                      ? 'In Stock'
                      : 'Not In Stock'
                    }
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item variant='light'>
                  <Row>
                    <Col><h4>Size: </h4></Col>
                    <Col>
                      <Form.Control 
                        as='select' 
                        value={size} 
                        onChange={(e) => setSize(e.target.value)}
                      >
                        {productDetail.sizes.split(' ').map((x, idx) => (
                          <option key={idx + 1} value={x}>
                            {x}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {productDetail.countInStock > 0 && (
                  <ListGroup.Item variant='light'>
                    <Row>
                      <Col><h4>Quanity</h4></Col>
                      <Col>
                        <Form.Control 
                          as='select' 
                          value={quanity} 
                          onChange={(e) => setQuanity(e.target.value)}
                        >
                          {[...Array(productDetail.countInStock).keys()].map
                          (x => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item variant='light'>
                  <CartButton 
                    countInStock={productDetail.countInStock} 
                    id={id} 
                    quanity={quanity}
                    size={size}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ProductReviews productDetail={productDetail} success={success} reviewError={reviewError} id={id} />
            </Col>
          </Row>
        </Fragment>
      }
    </Fragment>
  )
}


export default ProductDetail
