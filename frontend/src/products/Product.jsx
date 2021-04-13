import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'
import Rating from './Rating'

const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded bg-light'>
      <Link to={`/product/${product._id}`}>
        <Card.Img 
          src={product.image}
          alt={product.name}
          variant='top' 
          height='250px' 
        />
      </Link>
      <Card.Body as='article'>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='header'>
            <h6>
              {product.name}
            </h6>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating rating={product.rating} />
          <p className='rating-text d-inline'> 
            {' '}{product.numReviews} reviews
          </p> 
        </Card.Text>
        <Card.Text as='h5'>
          {product.price} SP
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product