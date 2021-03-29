import {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Loader, Message} from './../handlers'
import {} from './../actions/adminActions'
import {productListAction} from './../actions/productActions'


const AdminProductList = () => {
  const admin = useSelector(state => state.admin)
  const {loading, error} = admin
  const product = useSelector(state => state.product)
  const {loading: productLoading, error: productError, productsList} = product
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productListAction())

  }, [dispatch])

  const removeProduct = (id) => {
    if (window.confirm('Are you sure?')) {
      // dispatch()
    }
  }

  const createProduct = () => {

  }

  return (
    <Fragment>
      <Row className='align-items-center'>
        <Col>
          <h1>PRODUCTS</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3 btn-dark' onClick={createProduct}>
            <i className='fas fa-plus' /> Create Product
          </Button>
        </Col>
      </Row>
      {(productLoading || loading) && <Loader />}
      {(productError || error) && <Message variant='danger'>{error}</Message>}
      {!loading && 
        !error && 
        !productLoading && 
        !productError && 
        productsList.length !== 0 &&
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>DETAILS</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map(item => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <Link to={`/product/${item._id}`}>
                    <Button variant='info'>Details</Button>
                  </Link>  
                </td>
                <td>
                  <Button 
                    variant='danger' 
                    onClick={() => removeProduct(item._id)}
                  > 
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      }
    </Fragment>
  )
}


export default AdminProductList