import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'
import Rating from './Rating'
import PropTypes from 'prop-types'


const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body as='article'>
        <Link to={`/product/${product._id}`} className='text-dark'>
          <Card.Title as='header'>
            <h6>
              {product.name}
            </h6>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </Card.Text>
        <Card.Text as='h3'>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  numReviews: PropTypes.number.isRequired
}

export default Product
