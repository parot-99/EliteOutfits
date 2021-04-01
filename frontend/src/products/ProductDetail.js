import {Fragment, useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Form, Button} from 'react-bootstrap'
import {Rating, CartButton} from '.'
import {Loader, Message} from './../handlers'
import {
  productDetailAction,
  reviewCreateAction
} from './../actions/productActions'
import {REVIEW_CREATE_RESET} from './../constants/productConstants'

const ProductDetail = () => {
  const {id} = useParams()
  const [quanity, setQuanity] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const product = useSelector(state => state.product)
  const {loading, error, reviewError, success, productDetail} = product
  const userLogin = useSelector(state => state.userLogin)
  const {user} = userLogin
  const dispatch = useDispatch()

  useEffect(() => {
    if (success) {
      alert('Review Submited!')
      setRating(0)
      setComment('')
      dispatch({type: REVIEW_CREATE_RESET})
    }

    dispatch(productDetailAction(id))

  }, [dispatch, id, success])


  const handleCreateReview = (event) => {
    event.preventDefault()
    dispatch(reviewCreateAction(
      id,
      {rating, comment}
    ))
  }

  return (
    <Fragment>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {!loading && !error && Object.keys(productDetail).length !== 0 &&
        <Fragment>
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
                <ListGroup.Item>
                  <h3>{productDetail.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating 
                    rating={productDetail.rating} 
                  ></Rating>
                  <p className='rating-text d-inline'> 
                    {' '}{productDetail.numReviews} reviews
                  </p> 
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
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {productDetail.reviews.length === 0 && 
                <Message>No Reviews</Message>
              }
              {reviewError && 
                <Message variant='danger'>{reviewError}</Message>
              }
              <ListGroup variant='flush'>
                {productDetail.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <h5>{review.name}</h5>
                    <Rating rating={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {user &&
                    <Form onSubmit={handleCreateReview}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control 
                          as='textarea'
                          row='10'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          required={true}
                          style={{resize: 'none'}}
                        >
                        </Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='dark'>Submit</Button>
                    </Form>
                  }
                  {!user &&
                    <Message>
                      Please <Link to='/login'>Login</Link>
                      {' '}to Write a Review
                    </Message>
                  }
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Fragment>
      }
    </Fragment>
  )
}

export default ProductDetail
