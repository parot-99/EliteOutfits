import { Fragment, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, Message } from './../handlers'
import { Meta, Paginate } from './../base'
import { productDeleteAction } from './../actions/adminActions'
import { productListAction } from './../actions/productActions'
import { AdminProductCreate } from '.'


const AdminProductList = () => {
  const {pageNumber} = useParams()
  const admin = useSelector(state => state.admin)
  const {loading, error ,success} = admin
  const product = useSelector(state => state.product)
  const {
    loading: productLoading,
    error: productError,
    productsList,
    pages,
    page
  } = product
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productListAction(pageNumber, 'All'))

  }, [pageNumber, success, dispatch])

  const removeProduct = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(productDeleteAction(id))
    }
  }

  return (
    <Fragment>
      <Meta title='Admin | Products' />
      <Row className='align-items-center'>
        <Col>
          <h1>PRODUCTS</h1>
        </Col>
        <Col className='text-right'>
          <AdminProductCreate />
        </Col>
      </Row>
      {(productLoading || loading) && <Loader />}
      {(productError || error) && <Message variant='danger'>{error}</Message>}
      {!loading && 
        !error && 
        !productLoading && 
        !productError && 
        productsList.length !== 0 &&
        <Fragment>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>EDIT</th>
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
                    <Link to={`/admin/product/${item._id}`}>
                      <Button className='btn-block' variant='info'>Edit</Button>
                    </Link>  
                  </td>
                  <td>
                    <Button 
                      variant='danger'
                      className='btn-block'
                      onClick={() => removeProduct(item._id)}
                    > 
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin />
        </Fragment>
      }
    </Fragment>
  )
}


export default AdminProductList