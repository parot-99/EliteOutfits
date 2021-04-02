import {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Carousel, Image} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {Loader, Message} from './../handlers'
import {productListTopAction} from './../actions/productActions'


const ProductCarousel = () => {
  const product = useSelector(state => state.product)
  const {carouselLoading, carouselError, topProducts} = product
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productListTopAction())

  }, [dispatch])


  return (
    <Fragment>
      {carouselLoading && <Loader />}
      {carouselError && <Message variant='danger'>{carouselError}</Message>}
      {!carouselLoading && !carouselError && topProducts.length !== 0 &&
        <Carousel pause='hover' className='bg-dark'>
          {topProducts.map(product => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className='carousel-caption'>
                  <h2>{product.name} ({product.price})</h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      }
    </Fragment>
  )
}


export default ProductCarousel
