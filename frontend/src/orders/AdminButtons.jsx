import {Fragment} from 'react'
import {Button, ListGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {payOrderAction, deliverOrderAction} from './../actions/adminActions'


const AdminButtons = ({orderDetails, id}) => {
  const authentication = useSelector(state => state.authentication)
  const {user} = authentication
  const dispatch = useDispatch()

  return (
    <Fragment>
      {user.isAdmin && !orderDetails.isDelivered &&
        <ListGroup.Item variant='light'>
          <Button 
            className='btn-dark btn-block'
            onClick={() => dispatch(deliverOrderAction(id))}
          >
            MARK AS DELIVERED  
          </Button>    
        </ListGroup.Item>           
      }
      {user.isAdmin && !orderDetails.isPaid &&
        <ListGroup.Item variant='light'>
          <Button 
            className='btn-dark btn-block'
            onClick={() => dispatch(payOrderAction(id))}
          >
            MARK AS PAID  
          </Button> 
        </ListGroup.Item>           
      }        
    </Fragment>
  )
}

export default AdminButtons
