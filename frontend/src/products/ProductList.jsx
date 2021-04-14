import {Fragment, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Container, Navbar, Nav, Row, Col} from 'react-bootstrap'
import {Product, ProductCarousel} from '.'
import {Meta, Paginate} from './../base'
import {Loader, Message} from './../handlers'
import {productListAction} from './../actions/productActions'

const ProductList = () => {
  const [category, setCategory] = useState('All')
  const {pageNumber} = useParams() || 1
  const product = useSelector(state => state.product)
  const {loading, error, productsList, pages, page} = product
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productListAction(pageNumber, category))

  }, [category, pageNumber, dispatch])

  return (
    <Fragment>
      <Meta title='Home' />
      <ProductCarousel />
      <Row>
        <Col sm={12} md={6} lg={6} xl={6}>
          <h1>LATEST PRODUCTS</h1>
        </Col>
        <Col sm={12} md={6} lg={6} xl={6}>
        <Navbar variant='light' collapseOnSelect>
          <Container>       
            <Nav className='m-auto' as='ul' activeKey='all'>         
              <Nav.Link 
                active={category === 'All'}
                className='px-1'
                onClick={() => setCategory('All')}
              >
                <i className='fas fa-home'></i> All
              </Nav.Link>                    
              <Nav.Link 
                active={category === 'Men'}
                className='px-1'
                onClick={() => setCategory('Men')}
              >
                <i className="fas fa-male"></i> Men
              </Nav.Link>         
              <Nav.Link 
                active={category === 'Women'}
                className='px-1'
                onClick={() => setCategory('Women')}
              >
                <i className="fas fa-female"></i> Women
              </Nav.Link>                    
              <Nav.Link 
                active={category === 'Kids'}
                className='px-1'
                onClick={() => setCategory('Kids')}
              >
                <i className="fas fa-child"></i> Kids
              </Nav.Link>         
            </Nav>      
          </Container>
        </Navbar>
        </Col>
      </Row>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {!loading && !error && productsList.length !== 0 &&
        <Fragment>
          <Row>
            {productsList.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} />
        </Fragment>
      }
    </Fragment>
  )
}

export default ProductList