import { Fragment, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { Loader, Message } from './../handlers'
import { FormContainer } from './../base'
import { 
  priceFactorGetAction,
  priceFactorUpdateAction 
} from './../actions/adminActions'


const AdminPriceFactor = () => {
  const [priceFactor, setPriceFactor] = useState(0)
  const admin = useSelector(state => state.admin)
  const {loading, error, priceFactor: pFactor} = admin
  const dispatch = useDispatch()

  useEffect(() => {
    if (!pFactor) {
      dispatch(priceFactorGetAction())

    } else {
      setPriceFactor(pFactor)
    }

  }, [pFactor, dispatch])

  const handleUpdate = (event) => {
    event.preventDefault()
    dispatch(priceFactorUpdateAction(priceFactor))
  }

  return (
    <Fragment>
      <FormContainer>
        <h1>EDIT PRICE FACTOR</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId='pricefactor'>
            <Form.Label>Price Factor</Form.Label>
            <Form.Control 
              type='number'
              placeholder='Enter price factor'
              autoComplete='off'
              required={true}
              value={priceFactor}
              onChange={(e) => setPriceFactor(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='dark'>
            Update
          </Button>
        </Form>
      </FormContainer>
    </Fragment>
  )
}


export default AdminPriceFactor
