import {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Table, Button} from 'react-bootstrap' 
import { useSelector, useDispatch } from 'react-redux'
import { Message, Loader } from './../handlers'
import { getOrders } from './../actions/orderActions'


const UserOrders = () => {
  const order = useSelector(state => state.order)
  const {loading, error, myOrders} = order
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrders())
   
  }, [dispatch])

  return (
    <Fragment>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {!loading && !error && myOrders.length !== 0 &&
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.createdAt.substring(0, 10)}</td>
                <td>{item.price}</td>
                <td>{item.isPaid 
                  ? <i className='fas fa-check' style={{color: 'green'}} />
                  : <i className='fas fa-times' style={{color: 'red'}} />
                  }
                </td>
                <td>{item.isDelivered 
                  ? <i className='fas fa-check' style={{color: 'green'}} />
                  : <i className='fas fa-times' style={{color: 'red'}} />
                  }
                </td>
                <td>
                  <Link to={`/order/${item._id}`}>
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


export default UserOrders