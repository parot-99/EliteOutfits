import React from 'react'
import {Nav} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'

const CheckoutNav = ({step1, step2}) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>     
        <Nav.Link 
          as={NavLink}
          to='/shipping'
          disabled={!step1}
          className='checkout-nav'
        >
          Shipping
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>     
        <Nav.Link 
          as={NavLink}
          to='/placeorder'
          disabled={!step2}
          className='checkout-nav'
        >
          Place Order
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutNav
