import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup, Form, Button } from 'react-bootstrap'
import { Rating } from '.'
import { Message } from './../handlers'
import { reviewCreateAction } from './../actions/productActions'
import { REVIEW_CREATE_RESET } from './../constants/productConstants'


const ProductReviews = ({productDetail, success, reviewError, id}) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const authentication = useSelector(state => state.authentication)
  const {user} = authentication
  const dispatch = useDispatch()

  useEffect(() => {
    if (success) {
      alert('Review Submited!')
      setRating(0)
      setComment('')
      dispatch({type: REVIEW_CREATE_RESET})
    }
  }, [success, dispatch])

  const handleCreateReview = (event) => {
    event.preventDefault()
    dispatch(reviewCreateAction(
      id,
      {rating, comment}
    ))
  }

  return (
    <Fragment>
      <h2>Reviews</h2>
      {productDetail.reviews.length === 0 && 
        <Message>No Reviews</Message>
      }
      {reviewError && 
        <Message variant='danger'>{reviewError}</Message>
      }
      <ListGroup variant='flush'>
        {productDetail.reviews.map(review => (
          <ListGroup.Item key={review._id} variant='light'>
            <h5>{review.name}</h5>
            <Rating rating={review.rating} />
            <p>{review.createdAt.substring(0, 10)}</p>
            <p>{review.comment}</p>
          </ListGroup.Item>
        ))}
        <ListGroup.Item variant='light'>
          <h3>Write a Customer Review</h3>
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
    </Fragment>
  )
}


export default ProductReviews
