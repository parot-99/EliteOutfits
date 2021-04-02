import {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Table, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Loader, Message} from './../handlers'
import {Meta} from './../base'
import {orderListAction} from './../actions/adminActions'


const AdminOrderList = () => {
  const admin = useSelector(state => state.admin)
  const {loading, error, orderList} = admin
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(orderListAction())

  }, [dispatch])

  return (
    <Fragment>
      <Meta title='Admin | Orders' />
      <h1>ORDERS</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {!loading && !error && orderList.length !== 0 &&
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.price}</td>
                <td>{order.isPaid 
                  ? <i className='fas fa-check' style={{color: 'green'}} />
                  : <i className='fas fa-times' style={{color: 'red'}} />
                  }
                </td>
                <td>{order.isDelivered 
                  ? <i className='fas fa-check' style={{color: 'green'}} />
                  : <i className='fas fa-times' style={{color: 'red'}} />
                  }
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <Button variant='info'>Details</Button>
                  </Link>  
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      }
    </Fragment>
  )
}


export default AdminOrderList